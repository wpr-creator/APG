"""Render the course share image with the site's pinned typefaces and colors.
Run with Python + Pillow; downloads the public Google Fonts into a temp cache.
"""
from pathlib import Path
from urllib.request import urlretrieve
from tempfile import gettempdir
from PIL import Image, ImageDraw, ImageFont
ROOT = Path(__file__).resolve().parents[1]
SCALE = 3
PAPER, INK, GREEN, RUST, LINE = '#f3f0e8', '#183630', '#226d61', '#a9442e', '#cbc9bc'
FONTS = {
 'display': 'https://fonts.gstatic.com/s/newsreader/v26/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438wSo_ADA.ttf',
 'italic': 'https://fonts.gstatic.com/s/newsreader/v26/cY9kfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMwaT-ZA.ttf',
 'mono': 'https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3twJ8lc.ttf'
}
cache = Path(gettempdir()) / 'apg-social-fonts'
cache.mkdir(exist_ok=True)
for key, url in FONTS.items():
 if not (cache / (key+'.ttf')).exists(): urlretrieve(url, cache / (key+'.ttf'))
image = Image.new('RGB', (1200*SCALE, 630*SCALE), PAPER)
draw = ImageDraw.Draw(image)
def text(x,y,value,font,size,color,anchor="ls"):
 draw.text((x*SCALE,y*SCALE),value,font=ImageFont.truetype(str(cache/(font+'.ttf')),size*SCALE),fill=color,anchor=anchor)
def line(points,color=LINE,width=1):
 draw.line([(round(x*SCALE),round(y*SCALE)) for x,y in points],fill=color,width=round(width*SCALE),joint='curve')
def capitol(x,y,size,color=INK):
 # Matches the geometry of assets/capitol-mark.svg.
 def path(points):
  pts=[(x+a*size/48,y+b*size/48) for a,b in points]
  line(pts,color,1.7*size/48)
  r=.85*size/48*SCALE
  for a,b in [pts[0],pts[-1]]:draw.ellipse((a*SCALE-r,b*SCALE-r,a*SCALE+r,b*SCALE+r),fill=color)
 path([(21,11),(21,8),(27,8),(27,11)])
 dome=[]
 for p0,p1,p2,p3 in [((13,24),(13,17),(17.5,11),(24,11)),((24,11),(30.5,11),(35,17),(35,24))]:
  for i in range(31):
   t=i/30;dome.append(tuple((1-t)**3*p0[j]+3*(1-t)**2*t*p1[j]+3*(1-t)*t*t*p2[j]+t**3*p3[j] for j in [0,1]))
 path(dome)
 for pts in [[(11,24),(37,24)],[(11,27),(37,27)],[(12,30),(5,30),(5,39),(43,39),(43,30),(36,30)],[(3,42),(45,42)],[(12,39),(36,39)],[(24,12),(24,22)]]:path(pts)
 for a in [15,21,27,33]:path([(a,27),(a,38)])
 line([(x+24*size/48,y+3*size/48),(x+24*size/48,y+7*size/48)],RUST,1.7*size/48)
capitol(59,34,62)
text(139,78,'Mr. Rogers','display',39,INK)
text(1136,70,'THE O’FARRELL HIGH SCHOOL','mono',12,INK,'rs')
line([(64,116),(1136,116)])
text(64,186,'UNITED STATES','mono',17,RUST)
text(58,316,'Government','display',119,INK)
text(58,440,'& Politics.','italic',121,GREEN)
# Quiet architectural panel balances the large editorial title.
draw.rectangle((900*SCALE,166*SCALE,1136*SCALE,496*SCALE),fill='#e2e8d9',outline='#c0cbb8',width=SCALE)
capitol(929,234,178)
line([(64,546),(1136,546)])
text(64,587,'ADVANCED PLACEMENT','mono',14,INK)
text(1136,587,'wpr-creator.github.io/APG','mono',14,INK,'rs')
image.resize((1200,630),Image.Resampling.LANCZOS).save(ROOT/'images/ap-government-social-card-2026.png',optimize=True)
