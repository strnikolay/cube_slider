import{S as e,E as o}from"./core.js";



(el=>{
    //console.log (e)
    const s = el.querySelectorAll(".swiper"),
    t=[];

    //console.log(el)
    console.log(s)
    /** r -  */

    s.forEach(
        ((r,c)=>{
            //console.log(r)
            const n=new e(
                r,
                {
                    modules:[o],
                    effect:"cube",
                    grabCursor:!0,
                    allowTouchMove:0===c,
                    touchEventsTarget:"container",
                    cubeEffect:{shadow:c===s.length-1}
                }
            );
            console.log(n)
            t.push(n)
        })
    );
    //console.log(t)

    const c=t[0],
    n=t.filter((e=>e!==c)),
    a=1/3;
    c.on("progress",
    ((e,o)=>{
        n.forEach(((e,r)=>{
            const s=Math.floor(o/a)*a,
            t=s+((o-s)/a)**(1.5*(1+r))*a;
            e.setProgress(t)}))
        }
    )),
    c.on("setTransition",
    ((e,o)=>{
        n.forEach((e=>{
            e.setTransition(o)
        }))
    }))
})(document.querySelector(".swiper-ratio-slicer"))

