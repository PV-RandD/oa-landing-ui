"""Build a static upload directory with metadata for its actual destination."""
import argparse
import html
from pathlib import Path
import re
import shutil
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
p = argparse.ArgumentParser()
p.add_argument('--site-url', required=True, help='Actual deployed site origin, including any base path')
p.add_argument('--production', action='store_true', help='Allow indexing after final launch approval')
args = p.parse_args()
url = args.site_url.rstrip('/') + '/'
parts = urlsplit(url)
if parts.scheme not in ('https', 'http') or not parts.netloc or parts.query or parts.fragment or parts.username:
    p.error('Supply an HTTP(S) site URL without credentials, query, or fragment')
if args.production and parts.scheme != 'https':
    p.error('Production requires HTTPS')
out = ROOT / 'dist'
out.mkdir(exist_ok=True)
# Only our fixed build output is replaced. Source artwork and working files stay untouched.
for item in out.iterdir():
    if item.is_dir(): shutil.rmtree(item)
    else: item.unlink()
page = (ROOT / 'index.html').read_text()
page = page.replace('content="assets/hero-open-rails.png"', f'content="{html.escape(url, quote=True)}assets/hero-open-rails.png"')
page = page.replace('</head>', f'  <link rel="canonical" href="{html.escape(url, quote=True)}">\n  <meta property="og:url" content="{html.escape(url, quote=True)}">\n</head>')
if args.production: page = page.replace('noindex, nofollow', 'index, follow')
(out / 'index.html').write_text(page)
for name in ['styles.css', 'typography.css', 'layout.css', 'app.js']:
    shutil.copy2(ROOT / name, out / name)
assets = set(re.findall(r'assets/[\w./-]+\.(?:png|svg|webp|mp4|woff2)', page + (ROOT / 'typography.css').read_text()))
assets.add('assets/fonts/OFL.txt')
for name in sorted(assets):
    target = out / name
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(ROOT / name, target)
(out / 'robots.txt').write_text('User-agent: *\n' + ('Allow: /\n' if args.production else 'Disallow: /\n'))
print(f'Built {len(list(out.rglob("*")))} entries in {out}; indexing {"enabled" if args.production else "disabled"}.')
