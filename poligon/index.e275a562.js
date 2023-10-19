import{c as r,G as s,T as a,R as l,C as c,a as m,P as h,V as p,M as g,b as x,S as u,N as v}from"./vendor.ab396e5d.js";

var e,n,t,o,i
e=Object.defineProperty,
n=Object.getOwnPropertySymbols,
t=Object.prototype.hasOwnProperty,
o=Object.prototype.propertyIsEnumerable,
i=(n,t,o)=>t in n?e(n,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):n[t]=o;

!function(){
    const e=document.createElement("link").relList;
    if(!(e&&e.supports&&e.supports("modulepreload"))){
        for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver((e=>
        {
            for(const t of e)
                if("childList"===t.type)
                    for(const e of t.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&n(e)
        })).observe(document,{childList:!0,subtree:!0})
    }
    function n(e){
        if(e.ep)return;
        e.ep=!0;const n=function(e){const n={};
        return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?n.credentials="include":"anonymous"===e.crossorigin?n.credentials="omit":n.credentials="same-origin",n}(e);fetch(e.href,n)
    }
}();




function A(e){
    return e*(.5-Math.random())
}
function M(e,n){
    return e+Math.random()*(n-e)
}
const w=r(Math.random);
function f(e){
    return Math.max(0,Math.min(1,e))
}
const y="float PI = 3.141592653589793238;"
const U="\n#extension GL_OES_standard_derivatives : enable\nprecision highp float;\n\nuniform float time;\nuniform float progress;\nuniform sampler2D texture1;\nuniform sampler2D texture2;\nuniform vec4 resolution;\nvarying vec2 vUv;\n",

const E ="\nattribute vec3 position; \nattribute vec3 normal;    \nattribute vec2 uv;  \nattribute float offset;  \nattribute vec3 bary;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float progress;\nuniform vec4 resolution;\n\nvarying vec2 vUv;\nvarying float vProgress;\nvarying float vProgress1;\nvarying vec3 vBary;\n",

const F="\n mat4 rotationMatrix(vec3 axis, float angle) 
{ \n  axis = normalize(axis); \n  float s = sin(angle);\n  float c = cos(angle);   \n  float oc = 1.0 - c;   \n\n  return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0, \noc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c, oc * axis.y * axis.z - axis.x * s, 0.0, \n oc*axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c, 0.0, \n  0.0,  0.0,  0.0, 1.0); \n;}


    \nvec3 rotate(vec3 v, vec3 axis, float angle) {
        \n  mat4 m = rotationMatrix(axis, angle);
        \n  return (m * vec4(v, 1.0)).xyz;
        \n
    }
    \n ",G={
        dots:{
            uniforms:{},
            fragment:`\n    ${U}\n    const float SQRT_2 = 1.414213562373;
            \n    const vec2 center = vec2(0, 0);
            // = vec2(0, 0);
            \n    const float dots = 20.0;
            // = 20.0;
            \n\n    vec4 getFromColor(vec2 p) {
                \n      return texture2D(texture1, p);
                \n    
            }
            \n\n    vec4 getToColor(vec2 p)
            {
                \n      return texture2D(texture2, p);
                \n    
            }
            \n\n    void main()
            \t{
                \n      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
                \n\n      bool nextImage = distance(fract(newUV * dots), vec2(0.5, 0.5)) < ( progress / distance(newUV, center));
                \n      gl_FragColor = nextImage ? getToColor(newUV) : getFromColor(newUV);
                \n    
            }
            \n\n  `
        },
        flyeye:
        {
            uniforms:{}, 
            fragment:
            `\n    ${U}
            \n    const float size = 0.04; 
            // = 0.04
            \n    const float zoom = 100.0; 
            // = 50.0
            \n    const float colorSeparation = 0.3;
            // = 0.3
            \n\n    vec4 getFromColor(vec2 p) 
            {
                \n      return texture2D(texture1, p);
                \n    
            }

            \n\n    vec4 getToColor(vec2 p) {
                \n      return texture2D(texture2, p);
                \n    
            }
            \n\n    void main()\t{
                \n      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
                \n\n      float inv = 1. - progress;
                \n      vec2 disp = size*vec2(cos(zoom*newUV.x), sin(zoom*newUV.y));
                \n      vec4 texTo = getToColor(newUV + inv*disp);
                \n      vec4 texFrom = vec4(
                    \n        getFromColor(newUV + progress*disp*(1.0 - colorSeparation)).r,
                    \n        getFromColor(newUV + progress*disp).g,
                    \n        getFromColor(newUV + progress*disp*(1.0 + colorSeparation)).b,
                    \n        1.0);
                \n      gl_FragColor = texTo*progress + texFrom*inv;
                \n    
            }
            \n\n  `
        },
        "morph-x":{
            uniforms:{
                intensity:{
                    value:1,
                    type:"f",
                    min:0,
                    max:3
            }
            },
        fragment:`
        \n  ${U}
        \n  uniform float intensity;
        \n  uniform sampler2D displacement;
        \n  mat2 getRotM(float angle) 
            {
                \n    float s = sin(angle);
                \n    float c = cos(angle);
                \n    return mat2(c, -s, s, c);
                \n  
            }
            \n  const float PI = 3.1415;
            \n  const float angle1 = PI *0.25;
            \n  const float angle2 = -PI *0.75;
            \n  void main()
            \t
                {
                \n    vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
                \n    vec4 disp = texture2D(displacement, newUV);
                \n    vec2 dispVec = vec2(disp.r, disp.g);
                \n    vec2 distortedPosition1 = newUV + getRotM(angle1) * dispVec * intensity * progress;
                \n    vec4 t1 = texture2D(texture1, distortedPosition1);
                \n    vec2 distortedPosition2 = newUV + getRotM(angle2) * dispVec * intensity * (1.0 - progress);
                \n    vec4 t2 = texture2D(texture2, distortedPosition2);
                \n    gl_FragColor = mix(t1, t2, progress);
                \n  
            }
            \n`
        },
        "morph-y":{
            uniforms:{
                intensity:{value:.3,type:"f",min:0,max:2}
            },
            fragment:`\n  ${U}
            \n  uniform float intensity;
            \n  uniform sampler2D displacement;
            \n  void main()
            \t{
                \n    vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
                \n    vec4 d1 = texture2D(texture1, newUV);
                \n    vec4 d2 = texture2D(texture2, newUV);
                \n    float displace1 = (d1.r + d1.g + d1.b)*0.33;
                \n    float displace2 = (d2.r + d2.g + d2.b)*0.33;
                \n\n    vec4 t1 = texture2D(texture1, vec2(newUV.x, newUV.y + progress * (displace2 * intensity)));
                \n    vec4 t2 = texture2D(texture2, vec2(newUV.x, newUV.y + (1.0 - progress) * (displace1 * intensity)));
                \n    gl_FragColor = mix(t1, t2, progress);
                \n  
            }
            \n`
        },
        "page-curl":{
            uniforms:{},
            fragment:`
            \n    ${U}
            \n    const float MIN_AMOUNT = -0.16;
            \n    const float MAX_AMOUNT = 1.5;
            \n\n    const float PI = 3.141592653589793;
            \n\n    const float scale = 512.0;
            \n    const float sharpness = 3.0;
            \n\n    const float cylinderRadius = 1.0 / PI / 2.0;
            \n\n    vec4 getFromColor(vec2 p) {
                \n      return texture2D(texture1, p);
                \n    
            }
            \n\n    vec4 getToColor(vec2 p) {
                \n      return texture2D(texture2, p);
                \n
            }
            \n\n    vec3 hitPoint(float hitAngle, float yc, vec3 point, mat3 rrotation) {
                \n      float hitPoint = hitAngle / (2.0 * PI);
                \n      point.y = hitPoint;
                \n      return rrotation * point;
                \n
            }
            \n\n    vec4 antiAlias(vec4 color1, vec4 color2, float distanc) {
                \n      distanc *= scale;
                \n      if(distanc < 0.0)\n        return color2;
                \n      if(distanc > 2.0)\n        return color1;
                \n      float dd = pow(1.0 - distanc / 2.0, sharpness);
                \n      return ((color2 - color1) * dd) + color1;
                \n    
            }
            \n\n    float distanceToEdge(vec3 point) {
                \n      float dx = abs(point.x > 0.5 ? 1.0 - point.x : point.x);
                \n      float dy = abs(point.y > 0.5 ? 1.0 - point.y : point.y);
                \n      if(point.x < 0.0)\n        dx = -point.x;
                \n      if(point.x > 1.0)\n        dx = point.x - 1.0;
                \n      if(point.y < 0.0)\n        dy = -point.y;
                \n      if(point.y > 1.0)\n        dy = point.y - 1.0;
                \n      if((point.x < 0.0 || point.x > 1.0) && (point.y < 0.0 || point.y > 1.0))\n        return sqrt(dx * dx + dy * dy);
                \n      return min(dx, dy);
                \n    
            }
            \n\n    vec4 seeThrough(float yc, vec2 p, mat3 rotation, mat3 rrotation, float cylinderAngle) {
                \n      float hitAngle = PI - (acos(yc / cylinderRadius) - cylinderAngle);
                \n      vec3 point = hitPoint(hitAngle, yc, rotation * vec3(p, 1.0), rrotation);
                \n      if(yc <= 0.0 && (point.x < 0.0 || point.y < 0.0 || point.x > 1.0 || point.y > 1.0)) {
                    \n        return getToColor(p);
                    \n
                }
                \n\n      if(yc > 0.0)\n        return getFromColor(p);
                \n\n      vec4 color = getFromColor(point.xy);
                \n      vec4 tcolor = vec4(0.0);
                \n\n      return antiAlias(color, tcolor, distanceToEdge(point));
                \n 
            }
            \n\n    vec4 seeThroughWithShadow(float yc, vec2 p, vec3 point, mat3 rotation, mat3 rrotation, float cylinderAngle, float amount) {
                \n      float shadow = distanceToEdge(point) * 30.0;
                \n      shadow = (1.0 - shadow) / 3.0;
                \n\n      if(shadow < 0.0)\n        shadow = 0.0;
                \n      else\n        shadow *= amount;
                \n\n      vec4 shadowColor = seeThrough(yc, p, rotation, rrotation, cylinderAngle);
                \n      shadowColor.r -= shadow;
                \n      shadowColor.g -= shadow;
                \n      shadowColor.b -= shadow;
                \n\n      return shadowColor;
                \n
            }
            \n\n    vec4 backside(float yc, vec3 point) {
                \n      vec4 color = getFromColor(point.xy);
                \n      float gray = (color.r + color.b + color.g) / 15.0;
                \n      gray += (8.0 / 10.0) * (pow(1.0 - abs(yc / cylinderRadius), 2.0 / 10.0) / 2.0 + (5.0 / 10.0));
                \n      color.rgb = vec3(gray);\n      return color;\n    
            }
            \n\n    vec4 behindSurface(vec2 p, float yc, vec3 point, mat3 rrotation, float cylinderAngle, float amount) {
                \n      float shado = (1.0 - ((-cylinderRadius - yc) / amount * 7.0)) / 6.0;
                \n      shado *= 1.0 - abs(point.x - 0.5);
                \n\n      yc = (-cylinderRadius - cylinderRadius - yc);
                \n\n      float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;
                \n      point = hitPoint(hitAngle, yc, point, rrotation);
                \n\n      if(yc < 0.0 && point.x >= 0.0 && point.y >= 0.0 && point.x <= 1.0 && point.y <= 1.0 && (hitAngle < PI || amount > 0.5)) {
                    \n        shado = 1.0 - (sqrt(pow(point.x - 0.5, 2.0) + pow(point.y - 0.5, 2.0)) / (71.0 / 100.0));
                    \n        shado *= pow(-yc / cylinderRadius, 3.0);
                    \n        shado *= 0.5;
                    \n      
                }
                 else {
                        \n        shado = 0.0;
                        \n      
                    }
                    \n      return vec4(getToColor(p).rgb - shado, 1.0);
                    \n    
                }
                \n\n    void main() {
                    \n      vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
                    \n\n      float amount = progress * (MAX_AMOUNT - MIN_AMOUNT) + MIN_AMOUNT;
                    \n      float cylinderCenter = amount;
                    \n          // 360 degrees * amount\n      float cylinderAngle = 2.0 * PI * amount;
                    \n\n      const float angle = 100.0 * PI / 180.0;
                    \n      float c = cos(-angle);
                    \n      float s = sin(-angle);
                    \n\n      mat3 rotation = mat3(c, s, 0, -s, c, 0, -0.801, 0.8900, 1);
                    \n      c = cos(angle);\n      s = sin(angle);
                    \n\n      mat3 rrotation = mat3(c, s, 0, -s, c, 0, 0.98500, 0.985, 1);
                    \n\n      vec3 point = rotation * vec3(newUV, 1.0);
                    \n\n      float yc = point.y - cylinderCenter;
                    \n\n      if(yc < -cylinderRadius) {
                        \n                        // Behind surface\n        gl_FragColor = behindSurface(newUV, yc, point, rrotation, cylinderAngle, amount);
                        \n        return;
                        \n      
                    }
                    \n\n      if(yc > cylinderRadius) {
                        \n                        // Flat surface\n        gl_FragColor = getFromColor(newUV);
                        \n        return;
                        \n      
                    }
                    \n\n      float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;
                    \n\n      float hitAngleMod = mod(hitAngle, 2.0 * PI);
                    \n      if((hitAngleMod > PI && amount < 0.5) || (hitAngleMod > PI / 2.0 && amount < 0.0)) {
                        \n        gl_FragColor = seeThrough(yc, newUV, rotation, rrotation, cylinderAngle);
                        \n        return;
                        \n      
                    }
                    \n\n      point = hitPoint(hitAngle, yc, point, rrotation);
                    \n\n      if(point.x < 0.0 || point.y < 0.0 || point.x > 1.0 || point.y > 1.0) {
                        \n        gl_FragColor = seeThroughWithShadow(yc, newUV, point, rotation, rrotation, cylinderAngle, amount);
                        \n        return;
                        \n
                    }
                    \n\n      vec4 color = backside(yc, point);
                    \n\n      vec4 otherColor;
                    \n      if(yc < 0.0) {
                        \n        float shado = 1.0 - (sqrt(pow(point.x - 0.5, 2.0) + pow(point.y - 0.5, 2.0)) / 0.71);
                        \n        shado *= pow(-yc / cylinderRadius, 3.0);
                        \n        shado *= 0.5;
                        \n        otherColor = vec4(0.0, 0.0, 0.0, shado);
                        \n      
                    }
                     else {
                        \n        otherColor = getFromColor(newUV);
                        \n      
                    }
                    \n\n      color = antiAlias(color, otherColor, cylinderRadius - abs(yc));
                    \n\n      vec4 cl = seeThroughWithShadow(yc, newUV, point, rotation, rrotation, cylinderAngle, amount);
                    \n      float dist = distanceToEdge(point);
                    \n\n      gl_FragColor = antiAlias(color, cl, dist);
                    \n    
                }
                \n  `
            },
            "peel-x":{
                uniforms:{},fragment:`\n    ${U}\n    void main()\t{\n      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
                    \n      vec2 p = newUV;
                    \n      float x = progress;
                    \n      x = smoothstep(.0,1.0,(x*2.0+p.x-1.0));
                    \n      vec4 f = mix(\n        texture2D(texture1, (p-.5)*(1.-x)+.5),\n        texture2D(texture2, (p-.5)*x+.5),\n        x);\n      gl_FragColor = f;
                    \n    }\n  `
                },
                "peel-y":{
                    uniforms:{},fragment:`\n    ${U}\n    void main()\t{\n      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
                    \n      vec2 p = newUV;
                    \n      float x = progress;
                    \n      x = smoothstep(.0,1.0,(x*2.0+p.y-1.0));
                    \n      vec4 f = mix(\n        texture2D(texture1, (p-.5)*(1.-x)+.5),\n        texture2D(texture2, (p-.5)*x+.5),\n        x);\n      gl_FragColor = f;
                    \n    
                }
                \n  `
            },
            "polygons-fall":{
                uniforms:{},detail:12,offsetTop:0,vertex:`\n    ${E}\n    attribute vec3 centroid1;
                \n\n    ${F}\n\n    void main() {
                    \n      ${y}\n      vUv = uv;
                    \n      vBary = bary;
                    \n\n      vec3 newpos = position;
                    \n\n      float o = 1. - offset;
                    \n      float pr = (progress - 0.5) * (0. + resolution.y / resolution.x) + 0.5;
                    \n      pr = progress;\n      float prog = clamp((pr - o * 0.9) / 0.1, 0., 1.);
                    \n      vProgress = prog;
                    \n      vProgress1 = clamp((pr - clamp(o - 0.1, 0., 1.) * 0.9) / 0.1, 0., 1.);
                    \n      newpos = rotate((newpos - centroid1), vec3(1., 0., 0.), -prog * PI) + centroid1 + vec3(0., -1., 0.) * prog * 0.;
                    \n      gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
                    \n    
                }
                \n  `,fragment:`\n    ${U}\n    varying float vProgress;
                \n    varying float vProgress1;
                \n    ${y}\n    varying vec3 vBary;
                \n\n    void main()\t{
                    \n      float width = 2.5 * vProgress1;
                    \n      vec3 d;
                    \n      #ifdef GL_OES_standard_derivatives\n        d = fwidth(vBary);
                    \n      #endif\n      vec3 s = smoothstep(d * (width + 0.5), d * (width - 0.5), vBary);
                    \n      float alpha = max(max(s.x, s.y), s.z);
                    \n      vec3 color = vec3(alpha);
                    \n      vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
                    \n      vec4 t = texture2D(texture1, newUV);
                    \n      float opa = smoothstep(1., 0.5, vProgress);
                    \n      opa = 1. - vProgress;
                    \n      gl_FragColor = vec4(vUv, 0.0, opa);
                    \n      gl_FragColor = vec4(t.rgb + .5 * color * vProgress1, opa);
                    \n    }\n  `
                },
                "polygons-morph":{
                    uniforms:{},detail:20,offsetTop:.4,vertex:`\n    ${E}\n    ${F}\n\n    void main() {\n      ${y}\n      vUv = uv;
                    \n      vBary = bary;
                    \n\n      vec3 newpos = position;\n\n      float o = 1. - offset;
                    \n      float prog = clamp((progress - o * 0.6) / 0.4, 0., 1.);
                    \n      vProgress = prog;
                    \n      vProgress1 = clamp((progress - clamp(o - 0.1, -0., 1.) * 0.9) / 0.1, 0., 1.);
                    \n      gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
                    \n    
                }
                \n  `,fragment:`\n    ${U}\n    varying float vProgress;
                \n    varying float vProgress1;
                \n    ${y}\n    varying vec3 vBary;
                \n    void main()\t{
                    \n      float width = 2.5 * vProgress1;
                    \n      vec3 d;
                    \n      #ifdef GL_OES_standard_derivatives\n        d = fwidth(vBary);\n      #endif\n      vec3 s = smoothstep(d * (width + 0.5), d * (width - 0.5), vBary);
                    \n      float alpha = max(max(s.x, s.y), s.z);
                    \n      vec3 color = vec3(alpha);
                    \n\n      vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
                    \n      vec4 t = texture2D(texture1, newUV);
                    \n      float opa = smoothstep(1., 0.5, vProgress);
                    \n      opa = 1. - vProgress;
                    \n      gl_FragColor = vec4(t.rgb + 1. * color * vProgress1, opa);
                    \n    
                }
                \n  `
            },
            "polygons-wind":{
                uniforms:{},detail:40,offsetTop:1,vertex:`\n    ${E}\n    attribute vec3 control0;
                \n    attribute vec3 control1;
                \n\n    ${F}\n\n    float easeOut(float t){
                    \n      return  t * t * t;
                    \n    
                }
                \n\n    vec3 bezier4(vec3 a, vec3 b, vec3 c, vec3 d, float t) {
                    \n      return mix(mix(mix(a, b, t), mix(b, c, t), t), mix(mix(b, c, t), mix(c, d, t), t), t);
                    \n    
                }
                \n\n    void main() {
                    \n      ${y}\n      vUv = uv;\n      vBary = bary;
                    \n\n      vec3 newpos = position;
                    \n\n      float o = 1. - offset;
                    \n      float prog = clamp((progress - o * 0.6) / 0.4, 0., 1.);
                    \n      vProgress = prog;
                    \n      vProgress1 = clamp((progress - clamp(o - 0.2, -0., 1.) * 0.6) / 0.4, 0., 1.);
                    \n      newpos = bezier4(newpos, control0, control1, newpos, easeOut(prog));
                    \n      gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
                    \n    
                }
                \n  `,fragment:`\n    ${U}\n    varying float vProgress;\n    varying float vProgress1;
                \n    ${y}\n    varying vec3 vBary;
                \n    void main()\t{
                    \n      float width = 2.5 * vProgress1;
                    \n      vec3 d;
                    \n      #ifdef GL_OES_standard_derivatives\n        d = fwidth(vBary);
                    \n      #endif\n      vec3 s = smoothstep(d * (width + 0.5), d * (width - 0.5), vBary);
                    \n      float alpha = max(max(s.x, s.y), s.z);
                    \n      vec3 color = vec3(alpha);
                    \n\n      vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
                    \n      vec4 t = texture2D(texture1, newUV);
                    \n      float opa = smoothstep(1., 0.5, vProgress);\n      opa = 1. - vProgress;
                    \n      gl_FragColor = vec4(vUv, 0.0, opa);
                    \n      opa = smoothstep(0.5, 1., opa);
                    \n      gl_FragColor = vec4(t.rgb + 1. * color * vProgress1, opa);
                    \n    
                }
                \n  `
            },
            pixelize:{
                uniforms:{},fragment:`\n    ${U}\n    ivec2 squaresMin = ivec2(50);
                \n    int steps = 20;\n\n    void main()\t{\n      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);\n\n      float d = min(progress, 1.0 - progress);\n      float dist = steps>0 ? ceil(d * float(steps)) / float(steps) : d;\n      vec2 squareSize = 2.0 * dist / vec2(squaresMin);\n\n      vec2 p = dist>0.0 ? (floor(newUV / squareSize) + 0.5) * squareSize : newUV;\n\n      vec2 uv1 = newUV;\n      vec2 uv2 = newUV;\n\n      vec4 t1 = texture2D(texture1,p);\n      vec4 t2 = texture2D(texture2,p);\n\n      gl_FragColor = mix(t1, t2, progress);\n    }\n  `},ripple:{uniforms:{radius:{value:.9,type:"f",min:.1,max:2},width:{value:.35,type:"f",min:0,max:1}},fragment:`\n    ${U}\n    uniform float width;\n    uniform float radius;\n    uniform sampler2D displacement;\n    float parabola( float x, float k ) {\n      return pow( 4. * x * ( 1. - x ), k );\n    }\n    void main()\t{\n      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);\n      vec2 p = newUV;\n      vec2 start = vec2(0.5,0.5);\n      vec2 aspect = resolution.wz;\n      vec2 uv = newUV;\n      float dt = parabola(progress, 1.);\n      vec4 noise = texture2D(displacement, fract(vUv+time*0.04));\n      float prog = progress*0.66 + noise.g * 0.04;\n      float circ = 1. - smoothstep(-width, 0.0, radius * distance(start*aspect, uv*aspect) - prog*(1.+width));\n      float intpl = pow(abs(circ), 1.);\n      vec4 t1 = texture2D( texture1, (uv - 0.5) * (1.0 - intpl) + 0.5 ) ;\n      vec4 t2 = texture2D( texture2, (uv - 0.5) * intpl + 0.5 );\n      gl_FragColor = mix( t1, t2, intpl );\n    }\n  `},shutters:{uniforms:{intensity:{value:50,type:"f",min:1,max:100}},fragment:`\n    ${U}\n    uniform float intensity;\n    mat2 rotate(float a) {\n      float s = sin(a);\n      float c = cos(a);\n      return mat2(c, -s, s, c);\n    }\n    const float PI = 3.1415;\n    const float angle1 = PI *0.25;\n    const float angle2 = PI *0.25;\n\n    void main()\t{\n      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);\n\n      vec2 uvDivided = fract(newUV*vec2(intensity,1.));\n\n      vec2 uvDisplaced1 = newUV + rotate(angle1)*uvDivided*progress*0.1;\n      vec2 uvDisplaced2 = newUV + rotate(angle2)*uvDivided*(1. - progress)*0.1;\n\n      vec4 t1 = texture2D(texture1,uvDisplaced1);\n      vec4 t2 = texture2D(texture2,uvDisplaced2);\n\n      gl_FragColor = mix(t1, t2, progress);\n    }\n\n  `},slices:{uniforms:{size:{value:.25,type:"f",min:.1,max:1}},fragment:`\n    ${U}\n    uniform float size; // = 0.2\n    float count = 20.; // = 10.0\n    float smoothness = .5; // = 0.5\n    void main()\t{\n      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);\n\n      float pr = smoothstep(-smoothness, 0.0, newUV.x - progress * (1.0 + smoothness));\n      float s = step(pr, fract(count * newUV.x));\n\n      vec2 uv1 = newUV;\n      vec2 uv2 = newUV;\n\n      vec4 t1 = texture2D(texture1,uv1);\n      vec4 t2 = texture2D(texture2,uv2);\n      gl_FragColor = mix(t1, t2, s);\n\n    }\n  `},squares:{uniforms:{},fragment:`\n    ${U}\n    ivec2 squares = ivec2(10,10);\n    vec2 direction = vec2(1.0, -0.5);\n    float smoothness = 1.6;\n\n    const vec2 center = vec2(0.5, 0.5);\n    void main() {\n      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);\n\n      vec2 v = normalize(direction);\n      v /= abs(v.x)+abs(v.y);\n      float d = v.x * center.x + v.y * center.y;\n      float offset = smoothness;\n      float pr = smoothstep(-offset, 0.0, v.x * newUV.x + v.y * newUV.y - (d-0.5+progress*(1.+offset)));\n      vec2 squarep = fract(newUV*vec2(squares));\n      vec2 squaremin = vec2(pr/2.0);\n      vec2 squaremax = vec2(1.0 - pr/2.0);\n      float a = (1.0 - step(progress, 0.0)) * step(squaremin.x, squarep.x) * step(squaremin.y, squarep.y) * step(squarep.x, squaremax.x) * step(squarep.y, squaremax.y);\n\n      vec2 uv1 = newUV;\n      vec2 uv2 = newUV;\n\n      vec4 t1 = texture2D(texture1,newUV);\n      vec4 t2 = texture2D(texture2,newUV);\n\n      gl_FragColor = mix(t1, t2, a);\n    }\n  `},stretch:{uniforms:{intensity:{value:50,type:"f",min:1,max:100}},fragment:`\n    ${U}\n    uniform float intensity;\n    mat2 rotate(float a) {\n      float s = sin(a);\n      float c = cos(a);\n      return mat2(c, -s, s, c);\n    }\n    const float PI = 3.1415;\n    const float angle1 = PI *0.25;\n    const float angle2 = -PI *0.75;\n    const float noiseSeed = 2.;\n    float random() {\n      return fract(sin(noiseSeed + dot(gl_FragCoord.xy / resolution.xy / 10.0, vec2(12.9898, 4.1414))) * 43758.5453);\n    }\n    float hash(float n) { return fract(sin(n) * 1e4); }\n    float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }\n    float hnoise(vec2 x) {\n      vec2 i = floor(x);\n      vec2 f = fract(x);\n      float a = hash(i);\n      float b = hash(i + vec2(1.0, 0.0));\n      float c = hash(i + vec2(0.0, 1.0));\n      float d = hash(i + vec2(1.0, 1.0));\n      vec2 u = f * f * (3.0 - 2.0 * f);\n      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;\n    }\n    void main()\t{\n      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);\n\n      float hn = hnoise(newUV.xy * resolution.xy / 100.0);\n      vec2 d = vec2(0.,normalize(vec2(0.5,0.5) - newUV.xy).y);\n      vec2 uv1 = newUV + d * progress / 5.0 * (1.0 + hn / 2.0);\n      vec2 uv2 = newUV - d * (1.0 - progress) / 5.0 * (1.0 + hn / 2.0);\n      vec4 t1 = texture2D(texture1,uv1);\n      vec4 t2 = texture2D(texture2,uv2);\n      gl_FragColor = mix(t1, t2, progress);\n    }\n  `},"wave-x":{uniforms:{},fragment:`\n  ${U}\n  uniform sampler2D displacement;\n  vec2 mirrored(vec2 v) {\n    vec2 m = mod(v,2.);\n    return mix(m,2.0 - m, step(1.0 ,m));\n  }\n  void main()\t{\n    vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);\n    vec4 noise = texture2D(displacement, mirrored(newUV+time*0.04));\n    float prog = (1.0 - progress)*0.8 -0.05 + noise.g * 0.06;\n    float intpl = pow(abs(smoothstep(0., 1., (prog*2. - vUv.x + 0.5))), 10.);\n\n    vec4 t1 = texture2D( texture2, (newUV - 0.5) * (1.0 - intpl) + 0.5 ) ;\n    vec4 t2 = texture2D( texture1, (newUV - 0.5) * intpl + 0.5 );\n    gl_FragColor = mix( t1, t2, intpl );\n  }\n  `},wind:{uniforms:{},fragment:`\n    ${U}\n    float size = 0.2;\n\n    float rand (vec2 co) {\n      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n    }\n\n    void main()\t{\n      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);\n\n      float r = rand(vec2(0, newUV.y));\n      float m = smoothstep(0.0, -size, newUV.x*(1.0-size) + size*r - ((progress) * (1.0 + size)));\n\n      vec2 uv1 = newUV;\n      vec2 uv2 = newUV;\n\n      vec4 t1 = texture2D(texture1,uv1);\n      vec4 t2 = texture2D(texture2,uv2);\n      gl_FragColor = mix(t1, t2, m);\n\n    }\n  `}},C="\nattribute vec2 uv;\nattribute vec3 position;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nvarying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",R=()=>{const e=Math.floor(Math.random()*Object.keys(G).length);return G[Object.keys(G)[e]]};class K{constructor(e){const n="random"===e.shader?R():G[e.shader];this.shader=n,this.displacement=e.displacementMap||d,this.scene=new a,this.swiper=e.swiper,this.vertex=n.vertex||C,this.fragment=n.fragment,this.uniforms=n.uniforms||{},this.renderer=new l({dpr:2,webgl:2}),this.gl=this.renderer.gl,this.width=window.innerWidth,this.height=window.innerHeight,this.renderer.setSize(this.width,this.height),this.gl.clearColor(1,1,1,1),this.container=this.swiper.el,this.images=[],this.displacementTexture=null,this.container.querySelectorAll(".swiper-gl-image").forEach((e=>{this.images.push(e.src)})),this.width=this.swiper.width,this.height=this.swiper.height,this.container.prepend(this.gl.canvas),this.camera=new c(this.gl,{fov:45}),this.camera.perspective({aspect:this.gl.canvas.width/this.gl.canvas.height}),this.camera.position.set(0,0,2),this.time=0,this.current=0,this.textures=[],this.init((()=>{this.addObjects(),this.resize(),this.render()}))}animateUniform(e,n,t){const o=e.value;let i,r=null;window.cancelAnimationFrame(this.animateUniformFrame);const s=n>e.value?"next":"prev",a=(e,n)=>"next"===s&&e>=n||"prev"===s&&e<=n,l=()=>{if(this.destroyed)return;i=(new Date).getTime(),null===r&&(r=i);const s=Math.max(Math.min((i-r)/this.swiper.params.speed,1),0),c=.5-Math.cos(s*Math.PI)/2;let m=o+c*(n-o);if(a(m,n)&&(m=n),e.value=m,a(m,n))return cancelAnimationFrame(this.animateUniformFrame),void(t&&t());this.animateUniformFrame=requestAnimationFrame(l)};l()}init(e){const n=[],t=this;this.images.forEach(((e,o)=>{const i=new Promise((n=>{const i=new Image;i.crossOrigin="anonymous";const r=new m(this.gl);i.onload=()=>{r.image=i,t.textures[o]=r,n()},i.src=e}));n.push(i)})),n.push(new Promise((e=>{const n=new Image;n.crossOrigin="anonymous";const o=new m(this.gl);n.onload=()=>{o.image=n,t.displacementTexture=o,e()},n.src=d}))),Promise.all(n).then((()=>{this.initialized=!0,this.onInit&&this.onInit(),e()}))}resize(){if(!this.initialized||this.destroyed)return;const{width:e,height:n}=this.swiper;this.width=e,this.height=n,this.renderer.setSize(e,n);const t=this.camera.position.z;if(this.camera.perspective({aspect:e/n,fov:180/Math.PI*2*Math.atan(1/(2*t))}),!this.textures[0].image)return;const o=this.textures[0].image.height/this.textures[0].image.width;let i,r;n/e>o?(i=e/n*o,r=1):(i=1,r=n/e/o),this.material.uniforms.resolution.value.x=e,this.material.uniforms.resolution.value.y=n,this.material.uniforms.resolution.value.z=i,this.material.uniforms.resolution.value.w=r,this.shader.vertex&&this.vertexMaterial&&(this.vertexMaterial.uniforms.resolution.value.x=e,this.vertexMaterial.uniforms.resolution.value.y=n,this.vertexMaterial.uniforms.resolution.value.z=i,this.vertexMaterial.uniforms.resolution.value.w=r),this.shader.vertex?(this.nextMesh.scale.set(this.camera.aspect/2,.5,.5),this.currentMesh.scale.set(this.camera.aspect/2,.5,.5)):(this.plane.scale.x=this.camera.aspect,this.plane.scale.y=1)}createMaterial(){return new h(this.gl,((e,r)=>{for(var s in r||(r={}))t.call(r,s)&&i(e,s,r[s]);if(n)for(var s of n(r))o.call(r,s)&&i(e,s,r[s]);return e})({extensions:{derivatives:"#extension GL_OES_standard_derivatives : enable"},uniforms:{time:{type:"f",value:0},progress:{type:"f",value:0},intensity:{type:"f",value:0},width:{type:"f",value:0},radius:{type:"f",value:0},size:{type:"f",value:0},texture1:{type:"f",value:this.textures[0]},texture2:{type:"f",value:this.textures[1]},displacement:{type:"f",value:this.displacementTexture},resolution:{type:"v4",value:new p}},vertex:this.shader.vertex||C,fragment:this.shader.fragment},this.shader.vertex?{transparent:!0,depthWrite:!1}:{}))}addObjects(){if(this.scene.children.forEach((e=>{this.scene.removeChild(e)})),this.scene.children.forEach((e=>{this.scene.removeChild(e)})),this.material=this.createMaterial(),this.shader.vertex){const e=function(e,n,t){t=t||0;const o=n,i=2/o,r=i*Math.sqrt(3)/2,a=2/r,l=[],c=[],m=[],h=[],p=[],g=[],x=[];let u=0;const v=[];let d=0;for(let s=0;s<a;s+=1){d=s*r,u=s%2==1?-i/2:0;for(let e=0;e<=o;e+=1){const o=Math.sign(e*i+u-1);c.push(e*i+u-1,d-1,0),x.push((e*i+u)/2,d/2),c.push(e*i+i/2+u-1,r+d-1,0),x.push((e*i+i/2+u)/2,(r+d)/2),c.push(e*i-i/2+u-1,r+d-1,0),x.push((e*i-i/2+u)/2,(r+d)/2);let y=w(e/a,s/a)+Math.random();const U=f(d/2+2*y/n);let E=Math.random();l.push(U,f(U+.1*t),f(U+.1*t)),g.push(E,E,E);const F=[e*i+u-1,d-1,0];m.push(...F,...F,...F);const G=[2*o*M(-.3,.3),-2*M(-.3,.3)*1.5,-A(.5)],C=[2*o*M(.3,.6),-2*M(.3,.6)*1.5,-A(.5)];h.push(...G,...G,...G),p.push(...C,...C,...C),v.push(0,0,1,0,1,0,1,0,0),c.push(e*i+u-1,d-1,0),x.push((e*i+u)/2,d/2),c.push(e*i+i+u-1,d-1,0),x.push((e*i+i+u)/2,d/2),c.push(e*i+i/2+u-1,r+d-1,0),x.push((e*i+i/2+u)/2,(r+d)/2),y=w((e+1)/a,s/a)+Math.random();const R=f(d/2+2*y/n);E=Math.random(),l.push(R,R,f(R+.1*t)),g.push(E,E,E);const K=[e*i+u-1,d-1,0];h.push(...G,...G,...G),p.push(...C,...C,...C),m.push(...K,...K,...K),v.push(0,0,1,0,1,0,1,0,0)}}const y=new s(e);return y.addAttribute("position",{size:3,data:new Float32Array(c)}),y.addAttribute("bary",{size:3,data:new Float32Array(v)}),y.addAttribute("uv",{size:2,data:new Float32Array(x)}),y.addAttribute("offset",{size:1,data:new Float32Array(l)}),y.addAttribute("centroid1",{size:3,data:new Float32Array(m)}),y.addAttribute("control0",{size:3,data:new Float32Array(h)}),y.addAttribute("control1",{size:3,data:new Float32Array(p)}),y.addAttribute("random",{size:1,data:new Float32Array(g)}),y}(this.gl,this.shader.detail,this.shader.offsetTop),n=this.textures[1];this.vertexMaterial=this.createMaterial(),this.vertexMaterial.uniforms.texture1.value=n,this.currentMesh=new g(this.gl,{geometry:e,program:this.material}),this.nextMesh=new g(this.gl,{geometry:e,program:this.vertexMaterial}),this.nextMesh.position.z=-1e-4,this.currentMesh.setParent(this.scene),this.nextMesh.setParent(this.scene)}else{const e=new x(this.gl,{width:1,height:1,widthSegments:2,heightSegments:2});this.plane=new g(this.gl,{geometry:e,program:this.material}),this.plane.setParent(this.scene)}}replaceShader(e){let n,t;this.shader.vertex?(n=this.material.uniforms.texture1.value,t=this.vertexMaterial.uniforms.texture1.value):(n=this.material.uniforms.texture1.value,t=this.material.uniforms.texture2.value);const o="random"===e?R():G[e],{fragment:i,uniforms:r,vertex:s}=o;this.shader=o,this.vertex=s||C,this.fragment=i||"",this.uniforms=r||{},this.addObjects(),this.shader.vertex?(this.material.uniforms.texture1.value=t,this.vertexMaterial.uniforms.texture1.value=t):(this.material.uniforms.texture1.value=n,this.material.uniforms.texture2.value=t,this.material.uniforms.progress.value=1),this.resize(),this.swiper.params.gl.shader=e}replaceRandomShader(){const e=R(),{fragment:n,uniforms:t,vertex:o}=e;this.shader=e,this.fragment=n||"",this.uniforms=t||{},this.vertex=o||C,this.addObjects(),this.resize()}setProgress(e,n,t,o){if(this.destroyed)return;if(!this.initialized)return void(this.onInit=()=>{requestAnimationFrame((()=>{this.setProgress(e,n,t,o)}))});const i=this.textures[n],r=this.textures[e];this.material.uniforms.texture1.value=r,this.shader.vertex?this.vertexMaterial.uniforms.texture1.value=i:this.material.uniforms.texture2.value=i,o?(0===t&&0===this.material.uniforms.progress.value&&(this.material.uniforms.progress.value=1),1===t&&1===this.material.uniforms.progress.value&&(this.material.uniforms.progress.value=0),this.animateUniform(this.material.uniforms.progress,t,(()=>{"random"===this.swiper.params.gl.shader&&(this.replaceRandomShader(),this.material.uniforms.texture1.value=r,this.material.uniforms.texture2.value=i,this.material.uniforms.progress.value=t),1===t&&(this.material.uniforms.texture1.value=i),this.material.uniforms.progress.value=0}))):this.material.uniforms.progress.value=Math.abs(t)}render(){this.swiper.destroyed||this.destroyed||(this.time+=.05,this.material.uniforms.time.value=this.time,Object.keys(this.uniforms).forEach((e=>{this.material.uniforms[e].value=this.uniforms[e].value})),requestAnimationFrame(this.render.bind(this)),this.renderer.render({scene:this.scene,camera:this.camera}))}destroy(){this.initialized=!1,this.destroyed=!0,this.gl&&this.gl.canvas&&this.container.removeChild(this.gl.canvas)}}const Y=new u(".swiper",{modules:[v,function({swiper:e,on:n,extendParams:t}){e.gl=null;let o=!1;t({gl:{shader:"random",displacementMap:void 0}});const i=()=>{e.gl=new K({debug:!0,swiper:e,shader:e.params.gl.shader})};let r,s;n("beforeInit",(()=>{if("gl"!==e.params.effect)return;if(!function(){try{const e=document.createElement("canvas");return!!window.WebGLRenderingContext&&(e.getContext("webgl")||e.getContext("experimental-webgl"))}catch(e){return!1}}())return void(o=!0);e.classNames.push(`${e.params.containerModifierClass}gl`);const n={watchSlidesProgress:!0};Object.assign(e.params,n),Object.assign(e.originalParams,n)})),n("init",(()=>{"gl"!==e.params.effect||o||e.gl||i()})),n("resize",(()=>{"gl"!==e.params.effect||o||e.gl.resize()})),n("setTranslate",(()=>{if("gl"!==e.params.effect||o)return;let n,t,a;e.gl||i(),e.slides.forEach(((o,i)=>{const r=o.progress;(r>0&&r<1||0===r&&e.progress<s)&&(n=i,t=i+1,a=r),(r<0&&r>-1||0===r&&e.progress>s)&&(n=i-1,t=i,a=1+r)})),s=e.progress||0,void 0===n&&void 0===t||e.gl.setProgress(n,t,a,r)})),n("setTransition",((n,t)=>{"gl"!==e.params.effect||o||(r=t>0&&!e.params.cssMode)})),n("destroy",(()=>{"gl"!==e.params.effect||o||e.gl&&(e.gl.destroy(),e.gl=null)}))}],speed:1e3,effect:"gl",loop:!0,gl:{shader:"random"},navigation:{prevEl:".swiper-button-prev",nextEl:".swiper-button-next"}}),I=document.querySelector(".demo-shader-picker"),T=document.querySelector(".demo-shader-options");document.querySelector(".demo-shader-selector").addEventListener("click",(()=>{T.style.display="none"!==T.style.display&&T.style.display?"none":"block"})),T.addEventListener("click",(e=>{var n;"SPAN"===e.target.nodeName&&(n=e.target.textContent.trim(),document.querySelector(".demo-shader-current").textContent=n,Y.gl.replaceShader(n),T.style.display="none")})),document.addEventListener("click",(e=>{I.contains(e.target)||(T.style.display="none")}));
