#!/usr/bin/env python3
"""Prepare review batches; URL heuristics never confer scientific validation."""
import json,csv,re,hashlib
from pathlib import Path
from urllib.parse import urlparse
root=Path(__file__).resolve().parents[1]
corpus=json.loads((root/'assistant-v2/corpus.json').read_text())
ids={p.stem for p in (root/'fiches-data').glob('*.json')}
rows=[]
for c in corpus['cards']:
 if c['id'] not in ids: continue
 refs=c.get('sources',[])
 urls=[s.get('url','') for s in refs if isinstance(s,dict) and s.get('url')]
 hosts=[urlparse(u).hostname or '' for u in urls]
 ameli=[bool(re.search(r'(^|\.)ameli\.fr$',h)) for h in hosts]
 only_ameli=bool(hosts) and all(ameli)
 generic=[u for u in urls if len([p for p in urlparse(u).path.split('/') if p])<2 and not re.search(r'doi\.org|pubmed\.ncbi',u)]
 text=(c['id']+' '+c['title']).lower()
 sensitive=bool(re.search(r'fi[eè]vre|nourrisson|grossesse|anticoagul|insuline|m[eé]dicament|traitement|d[eé]pist|cancer|urgence|douleur thorac|br[uû]lure|morsure|piq[uû]re|suicid',text))
 flags=[]
 if not urls: flags.append('références à résoudre')
 if only_ameli: flags.append('URL documentaires Ameli seules (autres références textuelles possibles)')
 if generic: flags.append('liens potentiellement trop généraux')
 if len(urls)<2: flags.append('moins de deux références (signal, pas verdict)')
 if sensitive: flags.append('sujet prioritaire pour sécurité ou décision')
 score=(100 if not urls else 0)+(70 if only_ameli else 0)+(40 if generic else 0)+(30 if sensitive else 0)+(10 if len(urls)<2 else 0)
 rows.append(dict(id=c['id'],titre=c['title'],categorie=c['primaryCategory'],score_tri=score,ameli_seule=only_ameli,ameli_presente=any(ameli),nb_references=len(urls),nb_liens_generaux=len(generic),signaux=' ; '.join(flags),urls=' | '.join(urls),statut='À AUDITER',resultat_documentaire='',modification_proposee='',preuves_par_affirmation='',validation_romain='',date_validation='',revision_fiche=hashlib.sha256(json.dumps(c,sort_keys=True,ensure_ascii=False).encode()).hexdigest()[:16]))
rows.sort(key=lambda r:(-r['score_tri'],r['categorie'],r['id']))
# Balanced sequential batches, highest priority first; intended dates, not completed reviews.
dates=['2026-10-12','2026-10-13','2026-10-14','2026-10-15','2026-10-16']
for i,r in enumerate(rows):r['lot']=min(i//76+1,5);r['date_prevue']=dates[r['lot']-1]
out=root/'docs/corpus-audit-2026-10';out.mkdir(exist_ok=True)
existing=out/'inventaire.csv'
if existing.exists():
 with existing.open(encoding='utf-8-sig',newline='') as f:
  if any(r.get('statut')!='À AUDITER' or any(r.get(k) for k in ['resultat_documentaire','modification_proposee','preuves_par_affirmation','validation_romain','date_validation']) for r in csv.DictReader(f)):
   raise SystemExit('Refus d’écraser un suivi déjà renseigné : conserver les décisions et fusionner les nouvelles fiches.')
with existing.open('w',newline='',encoding='utf-8-sig') as f:
 w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
summary=dict(fiches=len(rows),ameli_seule=sum(r['ameli_seule'] for r in rows),ameli_presente=sum(r['ameli_presente'] for r in rows),liens_generaux=sum(r['nb_liens_generaux']>0 for r in rows),sans_url=sum(not r['urls'] for r in rows),corpus_fingerprint=corpus['fingerprint'],lots={d:sum(r['date_prevue']==d for r in rows) for d in dates},premier_lot_approfondi=[r['id'] for r in rows[:20]],statut='Inventaire automatisé : aucune nouvelle revalidation scientifique ou médicale')
(out/'summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(summary,ensure_ascii=False,indent=2))
