"""Validated multipart MP4 -> verified assets and Mag page, in one generated commit."""
import hashlib, html, json, pathlib, re, subprocess, tempfile
ROOT = pathlib.Path(__file__).resolve().parents[1]

def local(name):
    p = (ROOT / name).resolve()
    if not p.is_relative_to(ROOT):
        raise ValueError('Path outside repository')
    return p

def probe(p):
    d = json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)]))
    assert float(d['format']['duration']) > 0
    assert any(s['codec_name']=='h264' and s['pix_fmt']=='yuv420p' for s in d['streams'])
    assert any(s['codec_name']=='aac' for s in d['streams'])
    subprocess.run(['ffmpeg','-v','error','-xerror','-i',str(p),'-f','null','-'],check=True)
    return d

jobs=[]
for f in sorted((ROOT/'media-publishing').glob('*/manifest.json')):
    m=json.loads(f.read_text())
    assert m['validated'] is True, 'Not approved'
    assert re.fullmatch(r'[a-z0-9-]+',m['id'])
    data=b''.join(local(x).read_bytes() for x in m['parts'])
    assert len(data)==m['size'], 'Size mismatch'
    assert hashlib.sha256(data).hexdigest()==m['sha256'], 'Checksum mismatch'
    with tempfile.NamedTemporaryFile(suffix='.mp4') as tmp:
        tmp.write(data);tmp.flush();probe(pathlib.Path(tmp.name))
    if m.get('verify_only'):
        print('PASS second video transfer:',m['id'],m['sha256']);continue
    assert local('fiches-seo/'+m['source']+'.html').is_file()
    assert m['transcript'] and m['sources']
    assert local(m['poster']).is_file()
    jobs.append((m,data))
# Nothing is published before all inputs pass integrity and full decoding.
ctx=subprocess.check_output(['node','-e',"const fs=require('fs'),vm=require('vm'),c={window:{}};vm.runInNewContext(fs.readFileSync('magazine-videos.js','utf8'),c);console.log(JSON.stringify(c.window.MACA_MAGAZINE_VIDEOS))"],cwd=ROOT,text=True)
entries=json.loads(ctx)
archive=local('magazine.html').read_text()
esc=lambda x:html.escape(str(x),quote=True)
for m,data in jobs:
    video='assets/videos/'+m['id']+'.mp4'
    target=local(video);target.parent.mkdir(parents=True,exist_ok=True)
    target.write_bytes(data)
    # Versioned immutable source remains in multipart files in Git history.
    poster='assets/videos/'+m['id']+'.jpg'
    local(poster).write_bytes(local(m['poster']).read_bytes())
    url='video-'+m['id']+'.html'
    entry={k:m[k] for k in ['id','title','category','date','excerpt','source','keywords','transcript']}
    entry.update(url=url,format='video',status='PUBLISHED',video=video,image=poster,imageAlt=m['title'],sha256=m['sha256'])
    entries=[x for x in entries if x['id']!=m['id']]+[entry]
    template=local('video-max-cortisol.html').read_text()
    head=template.split('<main')[0]
    head=head.replace('video-max-cortisol.html',url).replace('Stress, fatigue : faut-il faire baisser son cortisol ?',esc(m['title'])).replace('Max explique le rôle du cortisol et les limites d’un dosage isolé.',esc(m['excerpt']))
    refs=''.join('<li><a href="'+esc(s['url'])+'" rel="noopener noreferrer">'+esc(s['title'])+'</a></li>' for s in m['sources'])
    main=f'''<main class="magazine-page video-page"><p><a href="magazine.html">← Tous les contenus du mag</a></p><p class="eyebrow">VIDÉO · {esc(m['category'])} · <time datetime="{m['date']}">{m['date']}</time></p><h1>{esc(m['title'])}</h1><p class="magazine-intro">{esc(m['excerpt'])}</p><video controls playsinline preload="metadata" poster="{poster}" style="display:block;width:100%;max-width:400px;max-height:75vh;margin:28px auto;border-radius:20px" src="{video}">Votre navigateur ne peut pas lire cette vidéo. <a href="{video}">Télécharger le MP4</a></video><h2>Transcription</h2><p style="line-height:1.8">{esc(m['transcript'])}</p><h2>Pour mieux comprendre</h2><p><a href="fiches-seo/{m['source']}.html">Lire la fiche complète : produits hyperprotéinés</a></p><h2>Sources scientifiques citées dans la vidéo</h2><ul>{refs}</ul><p>Information générale sous contrôle médical.</p></main>'''
    # Exact text also serves archive invariants; HTML escaping remains safe.
    local(url).write_text(head+main+template.split('</main>')[1])
    card=f'''<article class="magazine-article" data-video-id="{m['id']}" data-format="video" data-category="{esc(m['category'])}" data-date="{m['date']}"><a href="{url}"><img src="{poster}" alt="{esc(m['title'])}" loading="lazy"></a><div class="magazine-article-copy"><p class="eyebrow">VIDÉO · {esc(m['category'])} · <time datetime="{m['date']}">{m['date']}</time></p><h2><a href="{url}">{esc(m['title'])}</a></h2><p>{esc(m['excerpt'])}</p><a class="magazine-read" href="{url}">Voir la vidéo →</a></div></article>'''
    archive=re.sub(r'<article\b[^>]*data-video-id="'+re.escape(m['id'])+r'".*?</article>','',archive,flags=re.S)
    marker='<section aria-label="Archives du mag" class="magazine-archive">'
    assert marker in archive
    archive=archive.replace(marker,marker+card)
    print('PASS original MP4 reassembled:',m['id'],len(data),m['sha256'])
entries.sort(key=lambda x:x['date'],reverse=True)
local('magazine-videos.js').write_text('// Validated and integrity-checked videos.\nwindow.MACA_MAGAZINE_VIDEOS = '+json.dumps(entries,ensure_ascii=False,indent=2)+';\n')
archive=archive.replace('les capsules vidéo de Max','les capsules vidéo MACASANTÉ')
count=len(re.findall(r'<article\b',archive))
archive=re.sub(r'(<p id="magazine-count"[^>]*>).*?(</p>)',lambda m:m[1]+str(count)+' contenus'+m[2],archive)
local('magazine.html').write_text(archive)
