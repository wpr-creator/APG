"""Render PNG/iPad/ICO versions of the course Capitol favicon (Pillow)."""
from pathlib import Path
from PIL import Image, ImageDraw
ROOT=Path(__file__).resolve().parents[1]
S=8
image=Image.new('RGBA',(64*S,64*S),(0,0,0,0));d=ImageDraw.Draw(image)
d.rounded_rectangle((0,0,64*S,64*S),radius=12*S,fill='#f3f0e8')
def line(points,color='#183630',width=2.8):
 d.line([(int(x*S),int(y*S)) for x,y in points],fill=color,width=round(width*S),joint='curve')
 r=width*S/2
 for x,y in [points[0],points[-1]]:d.ellipse((x*S-r,y*S-r,x*S+r,y*S+r),fill=color)
line([(29,20),(29,15),(35,15),(35,20)])
d.arc((19*S,20*S,45*S,46*S),180,360,fill='#183630',width=round(2.8*S))
for points in [[(17,33),(47,33)],[(17,37),(47,37)],[(17,41),(10,41),(10,52),(54,52),(54,41),(47,41)],[(8,55),(56,55)]]:line(points)
for x in [21,28,36,43]:line([(x,37),(x,51)])
line([(32,9),(32,14)],'#a9442e',3)
for size,name in [(32,'favicon-32.png'),(180,'apple-touch-icon.png')]:image.resize((size,size),Image.Resampling.LANCZOS).save(ROOT/'assets'/name,optimize=True)
image.save(ROOT/'favicon.ico',format='ICO',sizes=[(16,16),(32,32),(48,48)])
