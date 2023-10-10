import{S as e,E as o}from"./core.js";

(r=>{
    const s=r.querySelectorAll(".swiper"),
    t=[];
    s.forEach(((r,c)=>{
        const n=new e(r,{
            modules:[o],
            effect:"cube",
            grabCursor:!0,
            allowTouchMove:0===c,
            touchEventsTarget:"container",
            cubeEffect:{shadow:c===s.length-1}
        });
        t.push(n)}
    ));
    const c=t[0],
    n=t.filter((e=>e!==c));
    c.on("progress",
    ((e,o)=>{
        n.forEach(((e,r)=>{
            setTimeout((()=>{
                e.setProgress(o)
            }),50*(r+1))
        }))
    })),
    c.on("setTransition",
        ((e,o)=>{
            n.forEach(((e,r)=>{
                setTimeout((()=>{e.setTransition(o)}),50*(r+1))
            }))
        })
    )
})(document.querySelector(".swiper-delay-slicer")
    
);