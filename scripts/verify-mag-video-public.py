"""Fail the publication run if the deployed original video is not accessible."""
import hashlib,json,pathlib,time,urllib.request
root=pathlib.Path(__file__).resolve().parents[1]
items=[json.loads(p.read_text()) for p in (root/'media-publishing').glob('*/manifest.json')]
items=[m for m in items if not m.get('verify_only')]
for attempt in range(20):
    try:
        for m in items:
            base='https://macasante.fr/'
            def fetch(path):
                req=urllib.request.Request(base+path+'?verify='+str(time.time_ns()),headers={'Cache-Control':'no-cache'})
                with urllib.request.urlopen(req,timeout=30) as res:
                    assert res.status==200
                    return res.read()
            b=fetch('assets/videos/'+m['id']+'.mp4')
            assert len(b)==m['size'] and hashlib.sha256(b).hexdigest()==m['sha256']
            assert ('video-'+m['id']+'.html').encode() in fetch('magazine.html')
            page=fetch('video-'+m['id']+'.html').decode()
            assert 'playsinline' in page and 'controls' in page
            assert ('assets/videos/'+m['id']+'.mp4') in page
            assert ('fiches-seo/'+m['source']+'.html') in page
            assert len(fetch('assets/videos/'+m['id']+'.jpg'))>1000
            print('PASS public original MP4, page, archive, poster and fiche:',m['id'])
        break
    except Exception as e:
        print('Public verification pending:',type(e).__name__,str(e))
        if attempt==19:raise
        time.sleep(15)
