"""One-time import of the already published Max clips; pin original bytes."""
import hashlib, pathlib, re, subprocess, urllib.request
items = [('max-cortisol', 'f9b2d4e0f2782fdf3d373627d52981566dd63984', 'b41fe622a9ff2996c10c63bc26c8984f8fe967d982a14c18af4f66d49973c758'), ('max-sciatique-irm', '948092c', 'bdc2c886dfdb1f1e41331e57f9aa22b393738f34be8accb6bed568e1d289ddac')]
for name, revision, expected in items:
    target = pathlib.Path('assets/videos') / (name + '.mp4')
    if target.exists() and hashlib.sha256(target.read_bytes()).hexdigest() == expected:
        continue
    markup = subprocess.check_output(['git', 'show', revision + ':index.html'], text=True)
    url = re.search(r'<video[^>]*src="([^"]+)"', markup)[1]
    data = urllib.request.urlopen(url, timeout=120).read()
    if hashlib.sha256(data).hexdigest() != expected:
        raise RuntimeError('Video checksum mismatch: ' + name)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(data)
    print('Archived original MP4:', name)
