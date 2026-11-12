#!/usr/bin/env python3
"""Pure-Python contour reconstruction of approved red annotations.
No image generation, new artwork, or external binaries. Source PNGs remain untouched."""
from PIL import Image, ImageFilter
from collections import defaultdict
from pathlib import Path
import math

ROOT = Path(__file__).resolve().parents[1] / "public/media/manual"
FILES = ("hero-circle", "hero-note", "case-left-note", "case-right-note",
         "case-technical-note", "sirius-underline", "footer-note", "footer-underline")

def clean_path(path):
    """Drop long collinear runs without moving their endpoints."""
    out=[]
    for p in path:
        if len(out)>=2:
            a,b=out[-2],out[-1]
            if (b[0]-a[0])*(p[1]-b[1]) == (b[1]-a[1])*(p[0]-b[0]):
                out[-1]=p
                continue
        out.append(p)
    return out

def trace_png(name):
    src=ROOT/"assets"/f"{name}.png"
    im=Image.open(src).convert("RGBA")
    alpha=im.getchannel("A").filter(ImageFilter.GaussianBlur(.28))
    w,h=im.size
    data=alpha.load()
    ink={(x,y) for y in range(h) for x in range(w) if data[x,y]>=88}
    edges=defaultdict(list)
    for x,y in ink:
        if (x,y-1) not in ink:edges[(x,y)].append((x+1,y))
        if (x+1,y) not in ink:edges[(x+1,y)].append((x+1,y+1))
        if (x,y+1) not in ink:edges[(x+1,y+1)].append((x,y+1))
        if (x-1,y) not in ink:edges[(x,y+1)].append((x,y))
    paths=[]
    count=sum(map(len,edges.values()))
    while edges:
        start=next(iter(edges));point=start
        points=[start]
        for _ in range(count+4):
            targets=edges.get(point)
            if not targets:break
            nxt=targets.pop()
            if not targets:del edges[point]
            if nxt==start:break
            points.append(nxt);point=nxt
        if len(points)<4:continue
        points=clean_path(points)
        if len(points)<3:continue
        # Quadratic midpoint smoothing preserves the photographed lettering's
        # exact gesture but eliminates raster staircase at high device pixel ratios.
        def mid(a,b):return ((a[0]+b[0])/2,(a[1]+b[1])/2)
        def n(p):return f"{p:.1f}".rstrip("0").rstrip(".")
        fmt=lambda p:n(p[0])+","+n(p[1])
        q=[f"M{fmt(mid(points[-1],points[0]))}"]
        for k,p in enumerate(points):
            q.append(f"Q{fmt(p)} {fmt(mid(p,points[(k+1)%len(points)]))}")
        q.append("Z")
        paths.append(" ".join(q))
    out=ROOT/"vector";out.mkdir(parents=True,exist_ok=True)
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" aria-hidden="true"><path fill="#ad2d25" fill-rule="evenodd" d="'+" ".join(paths)+'"/></svg>'
    dst=out/(name+".svg");dst.write_text(svg,encoding="utf8")
    print(name, im.size, len(paths), len(svg), "bytes")

if __name__=="__main__":
    for name in FILES:trace_png(name)
