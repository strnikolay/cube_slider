import { useEffect } from 'react';
import './App.css';
import Swiper from './swiper';
import Image from "./images/1.jpg"
import{S as e,E as o}from"./core/core.js";

function App() {
  const el=document.querySelector(".swiper-ratio-slicer")
  useEffect((el)=>{
    const s=el.querySelectorAll(".swiper"),
    t=[];

    console.log(el)
    //console.log(c)
    /** r -  */

    s.forEach(
        ((el,c)=>{
            const n=new e(
                el,
                {
                    modules:[o],
                    effect:"cube",
                    grabCursor:!0,
                    allowTouchMove:0===c,
                    touchEventsTarget:"container",
                    cubeEffect:{shadow:c===s.length-1}
                }
            );
            t.push(n)
        })
    );

    const c=t[0],
    n=t.filter((e=>e!==c)),
    a=1/3;
    /*c.on("progress",
    ((e,o)=>{
        n.forEach(((e,el)=>{
            const s=Math.floor(o/a)*a,
            t=s+((o-s)/a)**(1.5*(1+el))*a;
            e.setProgress(t)}))
        }
    )),
    c.on("setTransition",
    ((e,o)=>{
        n.forEach((e=>{
            e.setTransition(o)
        }))
    }))*/
  })
  

  return (
    <div id="app">

    <div className="container">
      <h2>Ratio Slicer</h2>
      <div className="swiper-slicer swiper-ratio-slicer">
        <div className="swiper">
          {/*invisible image to determine size*/}
          <img className="swiper-slicer-size" src={Image} />
          <Swiper/>
        </div>
        <div className="swiper">
          <Swiper/>
        </div>
        <div className="swiper">
          <Swiper/>
        </div>
        <div className="swiper">
          <Swiper/>
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
