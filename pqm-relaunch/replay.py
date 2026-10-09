import csv,json,pathlib,time,urllib.request,datetime
root=pathlib.Path(__file__).resolve().parent
cases=[]
for name in ['replay-lot1.csv','alzheimer.csv','cancer.csv','insuffisance-cardiaque.csv']:
    for r in csv.DictReader((root/name).open()):
        cases.append(dict(intent=r['intent_id'],group=r.get('pathologie') or name[:-4],question=r.get('question_intent_exacte') or r.get('question_patient_normalisee'),baseline=r.get('couverture_contenu_apres') or r.get('couverture'),source=r.get('source_urls') or r.get('source_url')))
results=[]
for i,c in enumerate(cases):
    t=time.monotonic()
    req=urllib.request.Request('https://purple-voice-a8e3.dr-beddok.workers.dev/',data=json.dumps({'question':c['question']}).encode(),headers={'Content-Type':'application/json'},method='POST')
    try:
        with urllib.request.urlopen(req,timeout=45) as res:d=json.load(res)
        c.update(status=d.get('status'),cards=d.get('cards_used',[]),answer=d.get('answer',''),meta=d.get('meta',{}),technical_error=None)
    except Exception as e:
        c.update(status='technical_error',cards=[],answer='',technical_error=type(e).__name__+': '+str(e))
    c['elapsed']=round(time.monotonic()-t,2);results.append(c)
    (root/'replay-2026-10-09.json').write_text(json.dumps({'generated_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'method':'Exact historical questions; live Assistant; no medical changes; coverage requires separate content review','cases':results},ensure_ascii=False,indent=2))
    print(f"{i+1}/{len(cases)} {c['intent']} {c['status']} {[x.get('id') for x in c['cards'] if isinstance(x,dict)]}",flush=True)
    if i==2 and all(x['status']=='technical_error' for x in results):raise SystemExit('Endpoint unavailable; stopping')
    time.sleep(max(0,3.2-(time.monotonic()-t)))

print('PQM_RESULTS_JSON='+json.dumps({'cases':results},ensure_ascii=False))
