function e(e) {
  return (
    null !== e &&
    "object" == typeof e &&
    "constructor" in e &&
    e.constructor === Object
  );
}

function t(s = {}, i = {}) {
  Object.keys(i).forEach((r) => {
    void 0 === s[r]
      ? (s[r] = i[r])
      : e(i[r]) && e(s[r]) && Object.keys(i[r]).length > 0 && t(s[r], i[r]);
  });
}

const s = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: { blur() {}, nodeName: "" },
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: () => null,
  createEvent: () => ({ initEvent() {} }),
  createElement: () => ({
    children: [],
    childNodes: [],
    style: {},
    setAttribute() {},
    getElementsByTagName: () => [],
  }),
  createElementNS: () => ({}),
  importNode: () => null,
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
};

function i() {
  const e = "undefined" != typeof document ? document : {};
  return t(e, s), e;
}

const r = {
  document: s,
  navigator: { userAgent: "" },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
  history: { replaceState() {}, pushState() {}, go() {}, back() {} },
  CustomEvent: function () {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle: () => ({ getPropertyValue: () => "" }),
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia: () => ({}),
  requestAnimationFrame: (e) =>
    "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
  cancelAnimationFrame(e) {
    "undefined" != typeof setTimeout && clearTimeout(e);
  },
};

function n() {
  const e = "undefined" != typeof window ? window : {};
  return t(e, r), e;
}


class a extends Array {
  constructor(e) {
    "number" == typeof e
      ? super(e)
      : (super(...(e || [])),
        (function (e) {
          const t = e.__proto__;
          Object.defineProperty(e, "__proto__", {
            get: () => t,
            set(e) {
              t.__proto__ = e;
            },
          });
        })(this));
  }
}
function o(e = []) {
  const t = [];
  return (
    e.forEach((e) => {
      Array.isArray(e) ? t.push(...o(e)) : t.push(e);
    }),
    t
  );
}
function l(e, t) {
  return Array.prototype.filter.call(e, t);
}


function d(e, t) {
  const s = n(),
    r = i();
  let o = [];
  if (!t && e instanceof a) return e;
  if (!e) return new a(o);
  if ("string" == typeof e) {
    const s = e.trim();
    if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
      let e = "div";
      0 === s.indexOf("<li") && (e = "ul"),
        0 === s.indexOf("<tr") && (e = "tbody"),
        (0 !== s.indexOf("<td") && 0 !== s.indexOf("<th")) || (e = "tr"),
        0 === s.indexOf("<tbody") && (e = "table"),
        0 === s.indexOf("<option") && (e = "select");
      const t = r.createElement(e);
      t.innerHTML = s;
      for (let s = 0; s < t.childNodes.length; s += 1) o.push(t.childNodes[s]);
    } else
      o = (function (e, t) {
        if ("string" != typeof e) return [e];
        const s = [],
          i = t.querySelectorAll(e);
        for (let r = 0; r < i.length; r += 1) s.push(i[r]);
        return s;
      })(e.trim(), t || r);
  } else if (e.nodeType || e === s || e === r) o.push(e);
  else if (Array.isArray(e)) {
    if (e instanceof a) return e;
    o = e;
  }
  return new a(
    (function (e) {
      const t = [];
      for (let s = 0; s < e.length; s += 1)
        -1 === t.indexOf(e[s]) && t.push(e[s]);
      return t;
    })(o)
  );
}
d.fn = a.prototype;

const c = {
  addClass: function (...e) {
    const t = o(e.map((e) => e.split(" ")));
    return (
      this.forEach((e) => {
        e.classList.add(...t);
      }),
      this
    );
  },
  removeClass: function (...e) {
    const t = o(e.map((e) => e.split(" ")));
    return (
      this.forEach((e) => {
        e.classList.remove(...t);
      }),
      this
    );
  },
  hasClass: function (...e) {
    const t = o(e.map((e) => e.split(" ")));
    return (
      l(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
        .length > 0
    );
  },
  toggleClass: function (...e) {
    const t = o(e.map((e) => e.split(" ")));
    this.forEach((e) => {
      t.forEach((t) => {
        e.classList.toggle(t);
      });
    });
  },
  attr: function (e, t) {
    if (1 === arguments.length && "string" == typeof e)
      return this[0] ? this[0].getAttribute(e) : void 0;
    for (let s = 0; s < this.length; s += 1)
      if (2 === arguments.length) this[s].setAttribute(e, t);
      else
        for (const t in e) (this[s][t] = e[t]), this[s].setAttribute(t, e[t]);
    return this;
  },
  removeAttr: function (e) {
    for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
    return this;
  },
  transform: function (e) {
    for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
    return this;
  },
  transition: function (e) {
    for (let t = 0; t < this.length; t += 1)
      this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
    return this;
  },
  on: function (...e) {
    let [t, s, i, r] = e;
    function n(e) {
      const t = e.target;
      if (!t) return;
      const r = e.target.dom7EventData || [];
      if ((r.indexOf(e) < 0 && r.unshift(e), d(t).is(s))) i.apply(t, r);
      else {
        const e = d(t).parents();
        for (let t = 0; t < e.length; t += 1) d(e[t]).is(s) && i.apply(e[t], r);
      }
    }
    function a(e) {
      const t = (e && e.target && e.target.dom7EventData) || [];
      t.indexOf(e) < 0 && t.unshift(e), i.apply(this, t);
    }
    "function" == typeof e[1] && (([t, i, r] = e), (s = void 0)), r || (r = !1);
    const o = t.split(" ");
    let l;
    for (let d = 0; d < this.length; d += 1) {
      const e = this[d];
      if (s)
        for (l = 0; l < o.length; l += 1) {
          const t = o[l];
          e.dom7LiveListeners || (e.dom7LiveListeners = {}),
            e.dom7LiveListeners[t] || (e.dom7LiveListeners[t] = []),
            e.dom7LiveListeners[t].push({ listener: i, proxyListener: n }),
            e.addEventListener(t, n, r);
        }
      else
        for (l = 0; l < o.length; l += 1) {
          const t = o[l];
          e.dom7Listeners || (e.dom7Listeners = {}),
            e.dom7Listeners[t] || (e.dom7Listeners[t] = []),
            e.dom7Listeners[t].push({ listener: i, proxyListener: a }),
            e.addEventListener(t, a, r);
        }
    }
    return this;
  },
  off: function (...e) {
    let [t, s, i, r] = e;
    "function" == typeof e[1] && (([t, i, r] = e), (s = void 0)), r || (r = !1);
    const n = t.split(" ");
    for (let a = 0; a < n.length; a += 1) {
      const e = n[a];
      for (let t = 0; t < this.length; t += 1) {
        const n = this[t];
        let a;
        if (
          (!s && n.dom7Listeners
            ? (a = n.dom7Listeners[e])
            : s && n.dom7LiveListeners && (a = n.dom7LiveListeners[e]),
          a && a.length)
        )
          for (let t = a.length - 1; t >= 0; t -= 1) {
            const s = a[t];
            (i && s.listener === i) ||
            (i &&
              s.listener &&
              s.listener.dom7proxy &&
              s.listener.dom7proxy === i)
              ? (n.removeEventListener(e, s.proxyListener, r), a.splice(t, 1))
              : i ||
                (n.removeEventListener(e, s.proxyListener, r), a.splice(t, 1));
          }
      }
    }
    return this;
  },
  trigger: function (...e) {
    const t = n(),
      s = e[0].split(" "),
      i = e[1];
    for (let r = 0; r < s.length; r += 1) {
      const n = s[r];
      for (let s = 0; s < this.length; s += 1) {
        const r = this[s];
        if (t.CustomEvent) {
          const s = new t.CustomEvent(n, {
            detail: i,
            bubbles: !0,
            cancelable: !0,
          });
          (r.dom7EventData = e.filter((e, t) => t > 0)),
            r.dispatchEvent(s),
            (r.dom7EventData = []),
            delete r.dom7EventData;
        }
      }
    }
    return this;
  },
  transitionEnd: function (e) {
    const t = this;
    return (
      e &&
        t.on("transitionend", function s(i) {
          i.target === this && (e.call(this, i), t.off("transitionend", s));
        }),
      this
    );
  },
  outerWidth: function (e) {
    if (this.length > 0) {
      if (e) {
        const e = this.styles();
        return (
          this[0].offsetWidth +
          parseFloat(e.getPropertyValue("margin-right")) +
          parseFloat(e.getPropertyValue("margin-left"))
        );
      }
      return this[0].offsetWidth;
    }
    return null;
  },
  outerHeight: function (e) {
    if (this.length > 0) {
      if (e) {
        const e = this.styles();
        return (
          this[0].offsetHeight +
          parseFloat(e.getPropertyValue("margin-top")) +
          parseFloat(e.getPropertyValue("margin-bottom"))
        );
      }
      return this[0].offsetHeight;
    }
    return null;
  },
  styles: function () {
    const e = n();
    return this[0] ? e.getComputedStyle(this[0], null) : {};
  },
  offset: function () {
    if (this.length > 0) {
      const e = n(),
        t = i(),
        s = this[0],
        r = s.getBoundingClientRect(),
        a = t.body,
        o = s.clientTop || a.clientTop || 0,
        l = s.clientLeft || a.clientLeft || 0,
        d = s === e ? e.scrollY : s.scrollTop,
        c = s === e ? e.scrollX : s.scrollLeft;
      return { top: r.top + d - o, left: r.left + c - l };
    }
    return null;
  },
  css: function (e, t) {
    const s = n();
    let i;
    if (1 === arguments.length) {
      if ("string" != typeof e) {
        for (i = 0; i < this.length; i += 1)
          for (const t in e) this[i].style[t] = e[t];
        return this;
      }
      if (this[0]) return s.getComputedStyle(this[0], null).getPropertyValue(e);
    }
    if (2 === arguments.length && "string" == typeof e) {
      for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
      return this;
    }
    return this;
  },
  each: function (e) {
    return e
      ? (this.forEach((t, s) => {
          e.apply(t, [t, s]);
        }),
        this)
      : this;
  },
  html: function (e) {
    if (void 0 === e) return this[0] ? this[0].innerHTML : null;
    for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
    return this;
  },
  text: function (e) {
    if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
    for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
    return this;
  },
  is: function (e) {
    const t = n(),
      s = i(),
      r = this[0];
    let o, l;
    if (!r || void 0 === e) return !1;
    if ("string" == typeof e) {
      if (r.matches) return r.matches(e);
      if (r.webkitMatchesSelector) return r.webkitMatchesSelector(e);
      if (r.msMatchesSelector) return r.msMatchesSelector(e);
      for (o = d(e), l = 0; l < o.length; l += 1) if (o[l] === r) return !0;
      return !1;
    }
    if (e === s) return r === s;
    if (e === t) return r === t;
    if (e.nodeType || e instanceof a) {
      for (o = e.nodeType ? [e] : e, l = 0; l < o.length; l += 1)
        if (o[l] === r) return !0;
      return !1;
    }
    return !1;
  },
  index: function () {
    let e,
      t = this[0];
    if (t) {
      for (e = 0; null !== (t = t.previousSibling); )
        1 === t.nodeType && (e += 1);
      return e;
    }
  },
  eq: function (e) {
    if (void 0 === e) return this;
    const t = this.length;
    if (e > t - 1) return d([]);
    if (e < 0) {
      const s = t + e;
      return d(s < 0 ? [] : [this[s]]);
    }
    return d([this[e]]);
  },
  append: function (...e) {
    let t;
    const s = i();
    for (let i = 0; i < e.length; i += 1) {
      t = e[i];
      for (let e = 0; e < this.length; e += 1)
        if ("string" == typeof t) {
          const i = s.createElement("div");
          for (i.innerHTML = t; i.firstChild; )
            this[e].appendChild(i.firstChild);
        } else if (t instanceof a)
          for (let s = 0; s < t.length; s += 1) this[e].appendChild(t[s]);
        else this[e].appendChild(t);
    }
    return this;
  },
  prepend: function (e) {
    const t = i();
    let s, r;
    for (s = 0; s < this.length; s += 1)
      if ("string" == typeof e) {
        const i = t.createElement("div");
        for (i.innerHTML = e, r = i.childNodes.length - 1; r >= 0; r -= 1)
          this[s].insertBefore(i.childNodes[r], this[s].childNodes[0]);
      } else if (e instanceof a)
        for (r = 0; r < e.length; r += 1)
          this[s].insertBefore(e[r], this[s].childNodes[0]);
      else this[s].insertBefore(e, this[s].childNodes[0]);
    return this;
  },
  next: function (e) {
    return this.length > 0
      ? e
        ? this[0].nextElementSibling && d(this[0].nextElementSibling).is(e)
          ? d([this[0].nextElementSibling])
          : d([])
        : this[0].nextElementSibling
        ? d([this[0].nextElementSibling])
        : d([])
      : d([]);
  },
  nextAll: function (e) {
    const t = [];
    let s = this[0];
    if (!s) return d([]);
    for (; s.nextElementSibling; ) {
      const i = s.nextElementSibling;
      e ? d(i).is(e) && t.push(i) : t.push(i), (s = i);
    }
    return d(t);
  },
  prev: function (e) {
    if (this.length > 0) {
      const t = this[0];
      return e
        ? t.previousElementSibling && d(t.previousElementSibling).is(e)
          ? d([t.previousElementSibling])
          : d([])
        : t.previousElementSibling
        ? d([t.previousElementSibling])
        : d([]);
    }
    return d([]);
  },
  prevAll: function (e) {
    const t = [];
    let s = this[0];
    if (!s) return d([]);
    for (; s.previousElementSibling; ) {
      const i = s.previousElementSibling;
      e ? d(i).is(e) && t.push(i) : t.push(i), (s = i);
    }
    return d(t);
  },
  parent: function (e) {
    const t = [];
    for (let s = 0; s < this.length; s += 1)
      null !== this[s].parentNode &&
        (e
          ? d(this[s].parentNode).is(e) && t.push(this[s].parentNode)
          : t.push(this[s].parentNode));
    return d(t);
  },
  parents: function (e) {
    const t = [];
    for (let s = 0; s < this.length; s += 1) {
      let i = this[s].parentNode;
      for (; i; ) e ? d(i).is(e) && t.push(i) : t.push(i), (i = i.parentNode);
    }
    return d(t);
  },
  closest: function (e) {
    let t = this;
    return void 0 === e ? d([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
  },
  find: function (e) {
    const t = [];
    for (let s = 0; s < this.length; s += 1) {
      const i = this[s].querySelectorAll(e);
      for (let e = 0; e < i.length; e += 1) t.push(i[e]);
    }
    return d(t);
  },
  children: function (e) {
    const t = [];
    for (let s = 0; s < this.length; s += 1) {
      const i = this[s].children;
      for (let s = 0; s < i.length; s += 1)
        (e && !d(i[s]).is(e)) || t.push(i[s]);
    }
    return d(t);
  },
  filter: function (e) {
    return d(l(this, e));
  },
  remove: function () {
    for (let e = 0; e < this.length; e += 1)
      this[e].parentNode && this[e].parentNode.removeChild(this[e]);
    return this;
  },
};
function p(e, t) {
  return void 0 === t && (t = 0), setTimeout(e, t);
}
function u() {
  return Date.now();
}

function h(e, t) {
  void 0 === t && (t = "x");
  const s = n();
  let i, r, a;
  const o = (function (e) {
    const t = n();
    let s;
    return (
      t.getComputedStyle && (s = t.getComputedStyle(e, null)),
      !s && e.currentStyle && (s = e.currentStyle),
      s || (s = e.style),
      s
    );
  })(e);
  return (
    s.WebKitCSSMatrix
      ? ((r = o.transform || o.webkitTransform),
        r.split(",").length > 6 &&
          (r = r
            .split(", ")
            .map((e) => e.replace(",", "."))
            .join(", ")),
        (a = new s.WebKitCSSMatrix("none" === r ? "" : r)))
      : ((a =
          o.MozTransform ||
          o.OTransform ||
          o.MsTransform ||
          o.msTransform ||
          o.transform ||
          o
            .getPropertyValue("transform")
            .replace("translate(", "matrix(1, 0, 0, 1,")),
        (i = a.toString().split(","))),
    "x" === t &&
      (r = s.WebKitCSSMatrix
        ? a.m41
        : 16 === i.length
        ? parseFloat(i[12])
        : parseFloat(i[4])),
    "y" === t &&
      (r = s.WebKitCSSMatrix
        ? a.m42
        : 16 === i.length
        ? parseFloat(i[13])
        : parseFloat(i[5])),
    r || 0
  );
}

function f(e) {
  return (
    "object" == typeof e &&
    null !== e &&
    e.constructor &&
    "Object" === Object.prototype.toString.call(e).slice(8, -1)
  );
}

function m(e) {
  return "undefined" != typeof window && void 0 !== window.HTMLElement
    ? e instanceof HTMLElement
    : e && (1 === e.nodeType || 11 === e.nodeType);
}

function g() {
  const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
    t = ["__proto__", "constructor", "prototype"];
  for (let s = 1; s < arguments.length; s += 1) {
    const i = s < 0 || arguments.length <= s ? void 0 : arguments[s];
    if (null != i && !m(i)) {
      const s = Object.keys(Object(i)).filter((e) => t.indexOf(e) < 0);
      for (let t = 0, r = s.length; t < r; t += 1) {
        const r = s[t],
          n = Object.getOwnPropertyDescriptor(i, r);
        void 0 !== n &&
          n.enumerable &&
          (f(e[r]) && f(i[r])
            ? i[r].__swiper__
              ? (e[r] = i[r])
              : g(e[r], i[r])
            : !f(e[r]) && f(i[r])
            ? ((e[r] = {}), i[r].__swiper__ ? (e[r] = i[r]) : g(e[r], i[r]))
            : (e[r] = i[r]));
      }
    }
  }
  return e;
}
function v(e, t, s) {
  e.style.setProperty(t, s);
}
function w(e) {
  let { swiper: t, targetPosition: s, side: i } = e;
  const r = n(),
    a = -t.translate;
  let o,
    l = null;
  const d = t.params.speed;
  (t.wrapperEl.style.scrollSnapType = "none"),
    r.cancelAnimationFrame(t.cssModeFrameID);
  const c = s > a ? "next" : "prev",
    p = (e, t) => ("next" === c && e >= t) || ("prev" === c && e <= t),
    u = () => {
      (o = new Date().getTime()), null === l && (l = o);
      const e = Math.max(Math.min((o - l) / d, 1), 0),
        n = 0.5 - Math.cos(e * Math.PI) / 2;
      let c = a + n * (s - a);
      if ((p(c, s) && (c = s), t.wrapperEl.scrollTo({ [i]: c }), p(c, s)))
        return (
          (t.wrapperEl.style.overflow = "hidden"),
          (t.wrapperEl.style.scrollSnapType = ""),
          setTimeout(() => {
            (t.wrapperEl.style.overflow = ""), t.wrapperEl.scrollTo({ [i]: c });
          }),
          void r.cancelAnimationFrame(t.cssModeFrameID)
        );
      t.cssModeFrameID = r.requestAnimationFrame(u);
    };
  u();
}
let T, S, b;
function x() {
  return (
    T ||
      (T = (function () {
        const e = n(),
          t = i();
        return {
          smoothScroll:
            t.documentElement && "scrollBehavior" in t.documentElement.style,
          touch: !!(
            "ontouchstart" in e ||
            (e.DocumentTouch && t instanceof e.DocumentTouch)
          ),
          passiveListener: (function () {
            let t = !1;
            try {
              const s = Object.defineProperty({}, "passive", {
                get() {
                  t = !0;
                },
              });
              e.addEventListener("testPassiveListener", null, s);
            } catch (s) {}
            return t;
          })(),
          gestures: "ongesturestart" in e,
        };
      })()),
    T
  );
}

function C(e) {
  return (
    void 0 === e && (e = {}),
    S ||
      (S = (function (e) {
        let { userAgent: t } = void 0 === e ? {} : e;
        const s = x(),
          i = n(),
          r = i.navigator.platform,
          a = t || i.navigator.userAgent,
          o = { ios: !1, android: !1 },
          l = i.screen.width,
          d = i.screen.height,
          c = a.match(/(Android);?[\s\/]+([\d.]+)?/);
        let p = a.match(/(iPad).*OS\s([\d_]+)/);
        const u = a.match(/(iPod)(.*OS\s([\d_]+))?/),
          h = !p && a.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
          f = "Win32" === r;
        let m = "MacIntel" === r;
        return (
          !p &&
            m &&
            s.touch &&
            [
              "1024x1366",
              "1366x1024",
              "834x1194",
              "1194x834",
              "834x1112",
              "1112x834",
              "768x1024",
              "1024x768",
              "820x1180",
              "1180x820",
              "810x1080",
              "1080x810",
            ].indexOf(`${l}x${d}`) >= 0 &&
            ((p = a.match(/(Version)\/([\d.]+)/)),
            p || (p = [0, 1, "13_0_0"]),
            (m = !1)),
          c && !f && ((o.os = "android"), (o.android = !0)),
          (p || h || u) && ((o.os = "ios"), (o.ios = !0)),
          o
        );
      })(e)),
    S
  );
}
function E() {
  return (
    b ||
      (b = (function () {
        const e = n();
        return {
          isSafari: (function () {
            const t = e.navigator.userAgent.toLowerCase();
            return (
              t.indexOf("safari") >= 0 &&
              t.indexOf("chrome") < 0 &&
              t.indexOf("android") < 0
            );
          })(),
          isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
            e.navigator.userAgent
          ),
        };
      })()),
    b
  );
}
function y(e) {
  let { swiper: t, runCallbacks: s, direction: i, step: r } = e;
  const { activeIndex: n, previousIndex: a } = t;
  let o = i;
  if (
    (o || (o = n > a ? "next" : n < a ? "prev" : "reset"),
    t.emit(`transition${r}`),
    s && n !== a)
  ) {
    if ("reset" === o) return void t.emit(`slideResetTransition${r}`);
    t.emit(`slideChangeTransition${r}`),
      "next" === o
        ? t.emit(`slideNextTransition${r}`)
        : t.emit(`slidePrevTransition${r}`);
  }
}
function M(e) {
  const t = this,
    s = i(),
    r = n(),
    a = t.touchEventsData,
    { params: o, touches: l, enabled: c } = t;
  if (!c) return;
  if (t.animating && o.preventInteractionOnTransition) return;
  !t.animating && o.cssMode && o.loop && t.loopFix();
  let p = e;
  p.originalEvent && (p = p.originalEvent);
  let h = d(p.target);
  if ("wrapper" === o.touchEventsTarget && !h.closest(t.wrapperEl).length)
    return;
  if (
    ((a.isTouchEvent = "touchstart" === p.type),
    !a.isTouchEvent && "which" in p && 3 === p.which)
  )
    return;
  if (!a.isTouchEvent && "button" in p && p.button > 0) return;
  if (a.isTouched && a.isMoved) return;
  !!o.noSwipingClass &&
    "" !== o.noSwipingClass &&
    p.target &&
    p.target.shadowRoot &&
    e.path &&
    e.path[0] &&
    (h = d(e.path[0]));
  const f = o.noSwipingSelector ? o.noSwipingSelector : `.${o.noSwipingClass}`,
    m = !(!p.target || !p.target.shadowRoot);
  if (
    o.noSwiping &&
    (m
      ? (function (e, t) {
          return (
            void 0 === t && (t = this),
            (function t(s) {
              return s && s !== i() && s !== n()
                ? (s.assignedSlot && (s = s.assignedSlot),
                  s.closest(e) || t(s.getRootNode().host))
                : null;
            })(t)
          );
        })(f, p.target)
      : h.closest(f)[0])
  )
    return void (t.allowClick = !0);
  if (o.swipeHandler && !h.closest(o.swipeHandler)[0]) return;
  (l.currentX = "touchstart" === p.type ? p.targetTouches[0].pageX : p.pageX),
    (l.currentY = "touchstart" === p.type ? p.targetTouches[0].pageY : p.pageY);
  const g = l.currentX,
    v = l.currentY,
    w = o.edgeSwipeDetection || o.iOSEdgeSwipeDetection,
    T = o.edgeSwipeThreshold || o.iOSEdgeSwipeThreshold;
  if (w && (g <= T || g >= r.innerWidth - T)) {
    if ("prevent" !== w) return;
    e.preventDefault();
  }
  if (
    (Object.assign(a, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0,
    }),
    (l.startX = g),
    (l.startY = v),
    (a.touchStartTime = u()),
    (t.allowClick = !0),
    t.updateSize(),
    (t.swipeDirection = void 0),
    o.threshold > 0 && (a.allowThresholdMove = !1),
    "touchstart" !== p.type)
  ) {
    let e = !0;
    h.is(a.focusableElements) &&
      ((e = !1), "SELECT" === h[0].nodeName && (a.isTouched = !1)),
      s.activeElement &&
        d(s.activeElement).is(a.focusableElements) &&
        s.activeElement !== h[0] &&
        s.activeElement.blur();
    const i = e && t.allowTouchMove && o.touchStartPreventDefault;
    (!o.touchStartForcePreventDefault && !i) ||
      h[0].isContentEditable ||
      p.preventDefault();
  }
  t.params.freeMode &&
    t.params.freeMode.enabled &&
    t.freeMode &&
    t.animating &&
    !o.cssMode &&
    t.freeMode.onTouchStart(),
    t.emit("touchStart", p);
}
function P(e) {
  const t = i(),
    s = this,
    r = s.touchEventsData,
    { params: n, touches: a, rtlTranslate: o, enabled: l } = s;
  if (!l) return;
  let c = e;
  if ((c.originalEvent && (c = c.originalEvent), !r.isTouched))
    return void (
      r.startMoving &&
      r.isScrolling &&
      s.emit("touchMoveOpposite", c)
    );
  if (r.isTouchEvent && "touchmove" !== c.type) return;
  const p =
      "touchmove" === c.type &&
      c.targetTouches &&
      (c.targetTouches[0] || c.changedTouches[0]),
    h = "touchmove" === c.type ? p.pageX : c.pageX,
    f = "touchmove" === c.type ? p.pageY : c.pageY;
  if (c.preventedByNestedSwiper) return (a.startX = h), void (a.startY = f);
  if (!s.allowTouchMove)
    return (
      d(c.target).is(r.focusableElements) || (s.allowClick = !1),
      void (
        r.isTouched &&
        (Object.assign(a, { startX: h, startY: f, currentX: h, currentY: f }),
        (r.touchStartTime = u()))
      )
    );
  if (r.isTouchEvent && n.touchReleaseOnEdges && !n.loop)
    if (s.isVertical()) {
      if (
        (f < a.startY && s.translate <= s.maxTranslate()) ||
        (f > a.startY && s.translate >= s.minTranslate())
      )
        return (r.isTouched = !1), void (r.isMoved = !1);
    } else if (
      (h < a.startX && s.translate <= s.maxTranslate()) ||
      (h > a.startX && s.translate >= s.minTranslate())
    )
      return;
  if (
    r.isTouchEvent &&
    t.activeElement &&
    c.target === t.activeElement &&
    d(c.target).is(r.focusableElements)
  )
    return (r.isMoved = !0), void (s.allowClick = !1);
  if (
    (r.allowTouchCallbacks && s.emit("touchMove", c),
    c.targetTouches && c.targetTouches.length > 1)
  )
    return;
  (a.currentX = h), (a.currentY = f);
  const m = a.currentX - a.startX,
    g = a.currentY - a.startY;
  if (s.params.threshold && Math.sqrt(m ** 2 + g ** 2) < s.params.threshold)
    return;
  if (void 0 === r.isScrolling) {
    let e;
    (s.isHorizontal() && a.currentY === a.startY) ||
    (s.isVertical() && a.currentX === a.startX)
      ? (r.isScrolling = !1)
      : m * m + g * g >= 25 &&
        ((e = (180 * Math.atan2(Math.abs(g), Math.abs(m))) / Math.PI),
        (r.isScrolling = s.isHorizontal()
          ? e > n.touchAngle
          : 90 - e > n.touchAngle));
  }
  if (
    (r.isScrolling && s.emit("touchMoveOpposite", c),
    void 0 === r.startMoving &&
      ((a.currentX === a.startX && a.currentY === a.startY) ||
        (r.startMoving = !0)),
    r.isScrolling)
  )
    return void (r.isTouched = !1);
  if (!r.startMoving) return;
  (s.allowClick = !1),
    !n.cssMode && c.cancelable && c.preventDefault(),
    n.touchMoveStopPropagation && !n.nested && c.stopPropagation(),
    r.isMoved ||
      (n.loop && !n.cssMode && s.loopFix(),
      (r.startTranslate = s.getTranslate()),
      s.setTransition(0),
      s.animating && s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
      (r.allowMomentumBounce = !1),
      !n.grabCursor ||
        (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
        s.setGrabCursor(!0),
      s.emit("sliderFirstMove", c)),
    s.emit("sliderMove", c),
    (r.isMoved = !0);
  let v = s.isHorizontal() ? m : g;
  (a.diff = v),
    (v *= n.touchRatio),
    o && (v = -v),
    (s.swipeDirection = v > 0 ? "prev" : "next"),
    (r.currentTranslate = v + r.startTranslate);
  let w = !0,
    T = n.resistanceRatio;
  if (
    (n.touchReleaseOnEdges && (T = 0),
    v > 0 && r.currentTranslate > s.minTranslate()
      ? ((w = !1),
        n.resistance &&
          (r.currentTranslate =
            s.minTranslate() -
            1 +
            (-s.minTranslate() + r.startTranslate + v) ** T))
      : v < 0 &&
        r.currentTranslate < s.maxTranslate() &&
        ((w = !1),
        n.resistance &&
          (r.currentTranslate =
            s.maxTranslate() +
            1 -
            (s.maxTranslate() - r.startTranslate - v) ** T)),
    w && (c.preventedByNestedSwiper = !0),
    !s.allowSlideNext &&
      "next" === s.swipeDirection &&
      r.currentTranslate < r.startTranslate &&
      (r.currentTranslate = r.startTranslate),
    !s.allowSlidePrev &&
      "prev" === s.swipeDirection &&
      r.currentTranslate > r.startTranslate &&
      (r.currentTranslate = r.startTranslate),
    s.allowSlidePrev ||
      s.allowSlideNext ||
      (r.currentTranslate = r.startTranslate),
    n.threshold > 0)
  ) {
    if (!(Math.abs(v) > n.threshold || r.allowThresholdMove))
      return void (r.currentTranslate = r.startTranslate);
    if (!r.allowThresholdMove)
      return (
        (r.allowThresholdMove = !0),
        (a.startX = a.currentX),
        (a.startY = a.currentY),
        (r.currentTranslate = r.startTranslate),
        void (a.diff = s.isHorizontal()
          ? a.currentX - a.startX
          : a.currentY - a.startY)
      );
  }
  n.followFinger &&
    !n.cssMode &&
    (((n.freeMode && n.freeMode.enabled && s.freeMode) ||
      n.watchSlidesProgress) &&
      (s.updateActiveIndex(), s.updateSlidesClasses()),
    s.params.freeMode &&
      n.freeMode.enabled &&
      s.freeMode &&
      s.freeMode.onTouchMove(),
    s.updateProgress(r.currentTranslate),
    s.setTranslate(r.currentTranslate));
}
function L(e) {
  const t = this,
    s = t.touchEventsData,
    { params: i, touches: r, rtlTranslate: n, slidesGrid: a, enabled: o } = t;
  if (!o) return;
  let l = e;
  if (
    (l.originalEvent && (l = l.originalEvent),
    s.allowTouchCallbacks && t.emit("touchEnd", l),
    (s.allowTouchCallbacks = !1),
    !s.isTouched)
  )
    return (
      s.isMoved && i.grabCursor && t.setGrabCursor(!1),
      (s.isMoved = !1),
      void (s.startMoving = !1)
    );
  i.grabCursor &&
    s.isMoved &&
    s.isTouched &&
    (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
    t.setGrabCursor(!1);
  const d = u(),
    c = d - s.touchStartTime;
  if (t.allowClick) {
    const e = l.path || (l.composedPath && l.composedPath());
    t.updateClickedSlide((e && e[0]) || l.target),
      t.emit("tap click", l),
      c < 300 &&
        d - s.lastClickTime < 300 &&
        t.emit("doubleTap doubleClick", l);
  }
  if (
    ((s.lastClickTime = u()),
    p(() => {
      t.destroyed || (t.allowClick = !0);
    }),
    !s.isTouched ||
      !s.isMoved ||
      !t.swipeDirection ||
      0 === r.diff ||
      s.currentTranslate === s.startTranslate)
  )
    return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
  let h;
  if (
    ((s.isTouched = !1),
    (s.isMoved = !1),
    (s.startMoving = !1),
    (h = i.followFinger
      ? n
        ? t.translate
        : -t.translate
      : -s.currentTranslate),
    i.cssMode)
  )
    return;
  if (t.params.freeMode && i.freeMode.enabled)
    return void t.freeMode.onTouchEnd({ currentPos: h });
  let f = 0,
    m = t.slidesSizesGrid[0];
  for (
    let p = 0;
    p < a.length;
    p += p < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup
  ) {
    const e = p < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
    void 0 !== a[p + e]
      ? h >= a[p] && h < a[p + e] && ((f = p), (m = a[p + e] - a[p]))
      : h >= a[p] && ((f = p), (m = a[a.length - 1] - a[a.length - 2]));
  }
  let g = null,
    v = null;
  i.rewind &&
    (t.isBeginning
      ? (v =
          t.params.virtual && t.params.virtual.enabled && t.virtual
            ? t.virtual.slides.length - 1
            : t.slides.length - 1)
      : t.isEnd && (g = 0));
  const w = (h - a[f]) / m,
    T = f < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
  if (c > i.longSwipesMs) {
    if (!i.longSwipes) return void t.slideTo(t.activeIndex);
    "next" === t.swipeDirection &&
      (w >= i.longSwipesRatio
        ? t.slideTo(i.rewind && t.isEnd ? g : f + T)
        : t.slideTo(f)),
      "prev" === t.swipeDirection &&
        (w > 1 - i.longSwipesRatio
          ? t.slideTo(f + T)
          : null !== v && w < 0 && Math.abs(w) > i.longSwipesRatio
          ? t.slideTo(v)
          : t.slideTo(f));
  } else {
    if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
    t.navigation &&
    (l.target === t.navigation.nextEl || l.target === t.navigation.prevEl)
      ? l.target === t.navigation.nextEl
        ? t.slideTo(f + T)
        : t.slideTo(f)
      : ("next" === t.swipeDirection && t.slideTo(null !== g ? g : f + T),
        "prev" === t.swipeDirection && t.slideTo(null !== v ? v : f));
  }
}
function k() {
  const e = this,
    { params: t, el: s } = e;
  if (s && 0 === s.offsetWidth) return;
  t.breakpoints && e.setBreakpoint();
  const { allowSlideNext: i, allowSlidePrev: r, snapGrid: n } = e;
  (e.allowSlideNext = !0),
    (e.allowSlidePrev = !0),
    e.updateSize(),
    e.updateSlides(),
    e.updateSlidesClasses(),
    ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
    e.isEnd &&
    !e.isBeginning &&
    !e.params.centeredSlides
      ? e.slideTo(e.slides.length - 1, 0, !1, !0)
      : e.slideTo(e.activeIndex, 0, !1, !0),
    e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
    (e.allowSlidePrev = r),
    (e.allowSlideNext = i),
    e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow();
}
function $(e) {
  const t = this;
  t.enabled &&
    (t.allowClick ||
      (t.params.preventClicks && e.preventDefault(),
      t.params.preventClicksPropagation &&
        t.animating &&
        (e.stopPropagation(), e.stopImmediatePropagation())));
}
function O() {
  const e = this,
    { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
  if (!i) return;
  let r;
  (e.previousTranslate = e.translate),
    e.isHorizontal()
      ? (e.translate = -t.scrollLeft)
      : (e.translate = -t.scrollTop),
    -0 === e.translate && (e.translate = 0),
    e.updateActiveIndex(),
    e.updateSlidesClasses();
  const n = e.maxTranslate() - e.minTranslate();
  (r = 0 === n ? 0 : (e.translate - e.minTranslate()) / n),
    r !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
    e.emit("setTranslate", e.translate, !1);
}
Object.keys(c).forEach((e) => {
  Object.defineProperty(d.fn, e, { value: c[e], writable: !0 });
});
let A = !1;
function z() {}

const I = (e, t) => {
  const s = i(),
    {
      params: r,
      touchEvents: n,
      el: a,
      wrapperEl: o,
      device: l,
      support: d,
    } = e,
    c = !!r.nested,
    p = "on" === t ? "addEventListener" : "removeEventListener",
    u = t;
  if (d.touch) {
    const t = !(
      "touchstart" !== n.start ||
      !d.passiveListener ||
      !r.passiveListeners
    ) && { passive: !0, capture: !1 };
    a[p](n.start, e.onTouchStart, t),
      a[p](
        n.move,
        e.onTouchMove,
        d.passiveListener ? { passive: !1, capture: c } : c
      ),
      a[p](n.end, e.onTouchEnd, t),
      n.cancel && a[p](n.cancel, e.onTouchEnd, t);
  } else
    a[p](n.start, e.onTouchStart, !1),
      s[p](n.move, e.onTouchMove, c),
      s[p](n.end, e.onTouchEnd, !1);
  (r.preventClicks || r.preventClicksPropagation) &&
    a[p]("click", e.onClick, !0),
    r.cssMode && o[p]("scroll", e.onScroll),
    r.updateOnWindowResize
      ? e[u](
          l.ios || l.android
            ? "resize orientationchange observerUpdate"
            : "resize observerUpdate",
          k,
          !0
        )
      : e[u]("observerUpdate", k, !0);
};
const D = (e, t) => e.grid && t.grid && t.grid.rows > 1;
var G = {
  init: !0,
  direction: "horizontal",
  touchEventsTarget: "wrapper",
  initialSlide: 0,
  speed: 300,
  cssMode: !1,
  updateOnWindowResize: !0,
  resizeObserver: !0,
  nested: !1,
  createElements: !1,
  enabled: !0,
  focusableElements: "input, select, option, textarea, button, video, label",
  width: null,
  height: null,
  preventInteractionOnTransition: !1,
  userAgent: null,
  url: null,
  edgeSwipeDetection: !1,
  edgeSwipeThreshold: 20,
  autoHeight: !1,
  setWrapperSize: !1,
  virtualTranslate: !1,
  effect: "slide",
  breakpoints: void 0,
  breakpointsBase: "window",
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: !1,
  centeredSlides: !1,
  centeredSlidesBounds: !1,
  slidesOffsetBefore: 0,
  slidesOffsetAfter: 0,
  normalizeSlideIndex: !0,
  centerInsufficientSlides: !1,
  watchOverflow: !0,
  roundLengths: !1,
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: !0,
  shortSwipes: !0,
  longSwipes: !0,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: !0,
  allowTouchMove: !0,
  threshold: 0,
  touchMoveStopPropagation: !1,
  touchStartPreventDefault: !0,
  touchStartForcePreventDefault: !1,
  touchReleaseOnEdges: !1,
  uniqueNavElements: !0,
  resistance: !0,
  resistanceRatio: 0.85,
  watchSlidesProgress: !1,
  grabCursor: !1,
  preventClicks: !0,
  preventClicksPropagation: !0,
  slideToClickedSlide: !1,
  preloadImages: !0,
  updateOnImagesReady: !0,
  loop: !1,
  loopAdditionalSlides: 0,
  loopedSlides: null,
  loopFillGroupWithBlank: !1,
  loopPreventsSlide: !0,
  rewind: !1,
  allowSlidePrev: !0,
  allowSlideNext: !0,
  swipeHandler: null,
  noSwiping: !0,
  noSwipingClass: "swiper-no-swiping",
  noSwipingSelector: null,
  passiveListeners: !0,
  maxBackfaceHiddenSlides: 10,
  containerModifierClass: "swiper-",
  slideClass: "swiper-slide",
  slideBlankClass: "swiper-slide-invisible-blank",
  slideActiveClass: "swiper-slide-active",
  slideDuplicateActiveClass: "swiper-slide-duplicate-active",
  slideVisibleClass: "swiper-slide-visible",
  slideDuplicateClass: "swiper-slide-duplicate",
  slideNextClass: "swiper-slide-next",
  slideDuplicateNextClass: "swiper-slide-duplicate-next",
  slidePrevClass: "swiper-slide-prev",
  slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
  wrapperClass: "swiper-wrapper",
  runCallbacksOnInit: !0,
  _emitClasses: !1,
};
function N(e, t) {
  return function (s) {
    void 0 === s && (s = {});
    const i = Object.keys(s)[0],
      r = s[i];
    "object" == typeof r && null !== r
      ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 &&
          !0 === e[i] &&
          (e[i] = { auto: !0 }),
        i in e && "enabled" in r
          ? (!0 === e[i] && (e[i] = { enabled: !0 }),
            "object" != typeof e[i] || "enabled" in e[i] || (e[i].enabled = !0),
            e[i] || (e[i] = { enabled: !1 }),
            g(t, s))
          : g(t, s))
      : g(t, s);
  };
}
const _ = {
    eventsEmitter: {
      on(e, t, s) {
        const i = this;
        if ("function" != typeof t) return i;
        const r = s ? "unshift" : "push";
        return (
          e.split(" ").forEach((e) => {
            i.eventsListeners[e] || (i.eventsListeners[e] = []),
              i.eventsListeners[e][r](t);
          }),
          i
        );
      },
      once(e, t, s) {
        const i = this;
        if ("function" != typeof t) return i;
        function r() {
          i.off(e, r), r.__emitterProxy && delete r.__emitterProxy;
          for (var s = arguments.length, n = new Array(s), a = 0; a < s; a++)
            n[a] = arguments[a];
          t.apply(i, n);
        }
        return (r.__emitterProxy = t), i.on(e, r, s);
      },
      onAny(e, t) {
        const s = this;
        if ("function" != typeof e) return s;
        const i = t ? "unshift" : "push";
        return (
          s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
        );
      },
      offAny(e) {
        const t = this;
        if (!t.eventsAnyListeners) return t;
        const s = t.eventsAnyListeners.indexOf(e);
        return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
      },
      off(e, t) {
        const s = this;
        return s.eventsListeners
          ? (e.split(" ").forEach((e) => {
              void 0 === t
                ? (s.eventsListeners[e] = [])
                : s.eventsListeners[e] &&
                  s.eventsListeners[e].forEach((i, r) => {
                    (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                      s.eventsListeners[e].splice(r, 1);
                  });
            }),
            s)
          : s;
      },
      emit() {
        const e = this;
        if (!e.eventsListeners) return e;
        let t, s, i;
        for (var r = arguments.length, n = new Array(r), a = 0; a < r; a++)
          n[a] = arguments[a];
        "string" == typeof n[0] || Array.isArray(n[0])
          ? ((t = n[0]), (s = n.slice(1, n.length)), (i = e))
          : ((t = n[0].events), (s = n[0].data), (i = n[0].context || e)),
          s.unshift(i);
        return (
          (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
            e.eventsAnyListeners &&
              e.eventsAnyListeners.length &&
              e.eventsAnyListeners.forEach((e) => {
                e.apply(i, [t, ...s]);
              }),
              e.eventsListeners &&
                e.eventsListeners[t] &&
                e.eventsListeners[t].forEach((e) => {
                  e.apply(i, s);
                });
          }),
          e
        );
      },
    },
    update: {
      updateSize: function () {
        const e = this;
        let t, s;
        const i = e.$el;
        (t =
          void 0 !== e.params.width && null !== e.params.width
            ? e.params.width
            : i[0].clientWidth),
          (s =
            void 0 !== e.params.height && null !== e.params.height
              ? e.params.height
              : i[0].clientHeight),
          (0 === t && e.isHorizontal()) ||
            (0 === s && e.isVertical()) ||
            ((t =
              t -
              parseInt(i.css("padding-left") || 0, 10) -
              parseInt(i.css("padding-right") || 0, 10)),
            (s =
              s -
              parseInt(i.css("padding-top") || 0, 10) -
              parseInt(i.css("padding-bottom") || 0, 10)),
            Number.isNaN(t) && (t = 0),
            Number.isNaN(s) && (s = 0),
            Object.assign(e, {
              width: t,
              height: s,
              size: e.isHorizontal() ? t : s,
            }));
      },
      updateSlides: function () {
        const e = this;
        function t(t) {
          return e.isHorizontal()
            ? t
            : {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom",
              }[t];
        }
        function s(e, s) {
          return parseFloat(e.getPropertyValue(t(s)) || 0);
        }
        const i = e.params,
          { $wrapperEl: r, size: n, rtlTranslate: a, wrongRTL: o } = e,
          l = e.virtual && i.virtual.enabled,
          d = l ? e.virtual.slides.length : e.slides.length,
          c = r.children(`.${e.params.slideClass}`),
          p = l ? e.virtual.slides.length : c.length;
        let u = [];
        const h = [],
          f = [];
        let m = i.slidesOffsetBefore;
        "function" == typeof m && (m = i.slidesOffsetBefore.call(e));
        let g = i.slidesOffsetAfter;
        "function" == typeof g && (g = i.slidesOffsetAfter.call(e));
        const w = e.snapGrid.length,
          T = e.slidesGrid.length;
        let S = i.spaceBetween,
          b = -m,
          x = 0,
          C = 0;
        if (void 0 === n) return;
        "string" == typeof S &&
          S.indexOf("%") >= 0 &&
          (S = (parseFloat(S.replace("%", "")) / 100) * n),
          (e.virtualSize = -S),
          a
            ? c.css({ marginLeft: "", marginBottom: "", marginTop: "" })
            : c.css({ marginRight: "", marginBottom: "", marginTop: "" }),
          i.centeredSlides &&
            i.cssMode &&
            (v(e.wrapperEl, "--swiper-centered-offset-before", ""),
            v(e.wrapperEl, "--swiper-centered-offset-after", ""));
        const E = i.grid && i.grid.rows > 1 && e.grid;
        let y;
        E && e.grid.initSlides(p);
        const M =
          "auto" === i.slidesPerView &&
          i.breakpoints &&
          Object.keys(i.breakpoints).filter(
            (e) => void 0 !== i.breakpoints[e].slidesPerView
          ).length > 0;
        for (let v = 0; v < p; v += 1) {
          y = 0;
          const r = c.eq(v);
          if (
            (E && e.grid.updateSlide(v, r, p, t), "none" !== r.css("display"))
          ) {
            if ("auto" === i.slidesPerView) {
              M && (c[v].style[t("width")] = "");
              const n = getComputedStyle(r[0]),
                a = r[0].style.transform,
                o = r[0].style.webkitTransform;
              if (
                (a && (r[0].style.transform = "none"),
                o && (r[0].style.webkitTransform = "none"),
                i.roundLengths)
              )
                y = e.isHorizontal() ? r.outerWidth(!0) : r.outerHeight(!0);
              else {
                const e = s(n, "width"),
                  t = s(n, "padding-left"),
                  i = s(n, "padding-right"),
                  a = s(n, "margin-left"),
                  o = s(n, "margin-right"),
                  l = n.getPropertyValue("box-sizing");
                if (l && "border-box" === l) y = e + a + o;
                else {
                  const { clientWidth: s, offsetWidth: n } = r[0];
                  y = e + t + i + a + o + (n - s);
                }
              }
              a && (r[0].style.transform = a),
                o && (r[0].style.webkitTransform = o),
                i.roundLengths && (y = Math.floor(y));
            } else
              (y = (n - (i.slidesPerView - 1) * S) / i.slidesPerView),
                i.roundLengths && (y = Math.floor(y)),
                c[v] && (c[v].style[t("width")] = `${y}px`);
            c[v] && (c[v].swiperSlideSize = y),
              f.push(y),
              i.centeredSlides
                ? ((b = b + y / 2 + x / 2 + S),
                  0 === x && 0 !== v && (b = b - n / 2 - S),
                  0 === v && (b = b - n / 2 - S),
                  Math.abs(b) < 0.001 && (b = 0),
                  i.roundLengths && (b = Math.floor(b)),
                  C % i.slidesPerGroup == 0 && u.push(b),
                  h.push(b))
                : (i.roundLengths && (b = Math.floor(b)),
                  (C - Math.min(e.params.slidesPerGroupSkip, C)) %
                    e.params.slidesPerGroup ==
                    0 && u.push(b),
                  h.push(b),
                  (b = b + y + S)),
              (e.virtualSize += y + S),
              (x = y),
              (C += 1);
          }
        }
        if (
          ((e.virtualSize = Math.max(e.virtualSize, n) + g),
          a &&
            o &&
            ("slide" === i.effect || "coverflow" === i.effect) &&
            r.css({ width: `${e.virtualSize + i.spaceBetween}px` }),
          i.setWrapperSize &&
            r.css({ [t("width")]: `${e.virtualSize + i.spaceBetween}px` }),
          E && e.grid.updateWrapperSize(y, u, t),
          !i.centeredSlides)
        ) {
          const t = [];
          for (let s = 0; s < u.length; s += 1) {
            let r = u[s];
            i.roundLengths && (r = Math.floor(r)),
              u[s] <= e.virtualSize - n && t.push(r);
          }
          (u = t),
            Math.floor(e.virtualSize - n) - Math.floor(u[u.length - 1]) > 1 &&
              u.push(e.virtualSize - n);
        }
        if ((0 === u.length && (u = [0]), 0 !== i.spaceBetween)) {
          const s = e.isHorizontal() && a ? "marginLeft" : t("marginRight");
          c.filter((e, t) => !i.cssMode || t !== c.length - 1).css({
            [s]: `${S}px`,
          });
        }
        if (i.centeredSlides && i.centeredSlidesBounds) {
          let e = 0;
          f.forEach((t) => {
            e += t + (i.spaceBetween ? i.spaceBetween : 0);
          }),
            (e -= i.spaceBetween);
          const t = e - n;
          u = u.map((e) => (e < 0 ? -m : e > t ? t + g : e));
        }
        if (i.centerInsufficientSlides) {
          let e = 0;
          if (
            (f.forEach((t) => {
              e += t + (i.spaceBetween ? i.spaceBetween : 0);
            }),
            (e -= i.spaceBetween),
            e < n)
          ) {
            const t = (n - e) / 2;
            u.forEach((e, s) => {
              u[s] = e - t;
            }),
              h.forEach((e, s) => {
                h[s] = e + t;
              });
          }
        }
        if (
          (Object.assign(e, {
            slides: c,
            snapGrid: u,
            slidesGrid: h,
            slidesSizesGrid: f,
          }),
          i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
        ) {
          v(e.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"),
            v(
              e.wrapperEl,
              "--swiper-centered-offset-after",
              e.size / 2 - f[f.length - 1] / 2 + "px"
            );
          const t = -e.snapGrid[0],
            s = -e.slidesGrid[0];
          (e.snapGrid = e.snapGrid.map((e) => e + t)),
            (e.slidesGrid = e.slidesGrid.map((e) => e + s));
        }
        if (
          (p !== d && e.emit("slidesLengthChange"),
          u.length !== w &&
            (e.params.watchOverflow && e.checkOverflow(),
            e.emit("snapGridLengthChange")),
          h.length !== T && e.emit("slidesGridLengthChange"),
          i.watchSlidesProgress && e.updateSlidesOffset(),
          !(l || i.cssMode || ("slide" !== i.effect && "fade" !== i.effect)))
        ) {
          const t = `${i.containerModifierClass}backface-hidden`,
            s = e.$el.hasClass(t);
          p <= i.maxBackfaceHiddenSlides
            ? s || e.$el.addClass(t)
            : s && e.$el.removeClass(t);
        }
      },
      updateAutoHeight: function (e) {
        const t = this,
          s = [],
          i = t.virtual && t.params.virtual.enabled;
        let r,
          n = 0;
        "number" == typeof e
          ? t.setTransition(e)
          : !0 === e && t.setTransition(t.params.speed);
        const a = (e) =>
          i
            ? t.slides.filter(
                (t) =>
                  parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
              )[0]
            : t.slides.eq(e)[0];
        if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
          if (t.params.centeredSlides)
            t.visibleSlides.each((e) => {
              s.push(e);
            });
          else
            for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
              const e = t.activeIndex + r;
              if (e > t.slides.length && !i) break;
              s.push(a(e));
            }
        else s.push(a(t.activeIndex));
        for (r = 0; r < s.length; r += 1)
          if (void 0 !== s[r]) {
            const e = s[r].offsetHeight;
            n = e > n ? e : n;
          }
        (n || 0 === n) && t.$wrapperEl.css("height", `${n}px`);
      },
      updateSlidesOffset: function () {
        const e = this,
          t = e.slides;
        for (let s = 0; s < t.length; s += 1)
          t[s].swiperSlideOffset = e.isHorizontal()
            ? t[s].offsetLeft
            : t[s].offsetTop;
      },
      updateSlidesProgress: function (e) {
        void 0 === e && (e = (this && this.translate) || 0);
        const t = this,
          s = t.params,
          { slides: i, rtlTranslate: r, snapGrid: n } = t;
        if (0 === i.length) return;
        void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
        let a = -e;
        r && (a = e),
          i.removeClass(s.slideVisibleClass),
          (t.visibleSlidesIndexes = []),
          (t.visibleSlides = []);
        for (let o = 0; o < i.length; o += 1) {
          const e = i[o];
          let l = e.swiperSlideOffset;
          s.cssMode && s.centeredSlides && (l -= i[0].swiperSlideOffset);
          const d =
              (a + (s.centeredSlides ? t.minTranslate() : 0) - l) /
              (e.swiperSlideSize + s.spaceBetween),
            c =
              (a - n[0] + (s.centeredSlides ? t.minTranslate() : 0) - l) /
              (e.swiperSlideSize + s.spaceBetween),
            p = -(a - l),
            u = p + t.slidesSizesGrid[o];
          ((p >= 0 && p < t.size - 1) ||
            (u > 1 && u <= t.size) ||
            (p <= 0 && u >= t.size)) &&
            (t.visibleSlides.push(e),
            t.visibleSlidesIndexes.push(o),
            i.eq(o).addClass(s.slideVisibleClass)),
            (e.progress = r ? -d : d),
            (e.originalProgress = r ? -c : c);
        }
        t.visibleSlides = d(t.visibleSlides);
      },
      updateProgress: function (e) {
        const t = this;
        if (void 0 === e) {
          const s = t.rtlTranslate ? -1 : 1;
          e = (t && t.translate && t.translate * s) || 0;
        }
        const s = t.params,
          i = t.maxTranslate() - t.minTranslate();
        let { progress: r, isBeginning: n, isEnd: a } = t;
        const o = n,
          l = a;
        0 === i
          ? ((r = 0), (n = !0), (a = !0))
          : ((r = (e - t.minTranslate()) / i), (n = r <= 0), (a = r >= 1)),
          Object.assign(t, { progress: r, isBeginning: n, isEnd: a }),
          (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
            t.updateSlidesProgress(e),
          n && !o && t.emit("reachBeginning toEdge"),
          a && !l && t.emit("reachEnd toEdge"),
          ((o && !n) || (l && !a)) && t.emit("fromEdge"),
          t.emit("progress", r);
      },
      updateSlidesClasses: function () {
        const e = this,
          {
            slides: t,
            params: s,
            $wrapperEl: i,
            activeIndex: r,
            realIndex: n,
          } = e,
          a = e.virtual && s.virtual.enabled;
        let o;
        t.removeClass(
          `${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`
        ),
          (o = a
            ? e.$wrapperEl.find(
                `.${s.slideClass}[data-swiper-slide-index="${r}"]`
              )
            : t.eq(r)),
          o.addClass(s.slideActiveClass),
          s.loop &&
            (o.hasClass(s.slideDuplicateClass)
              ? i
                  .children(
                    `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${n}"]`
                  )
                  .addClass(s.slideDuplicateActiveClass)
              : i
                  .children(
                    `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${n}"]`
                  )
                  .addClass(s.slideDuplicateActiveClass));
        let l = o.nextAll(`.${s.slideClass}`).eq(0).addClass(s.slideNextClass);
        s.loop &&
          0 === l.length &&
          ((l = t.eq(0)), l.addClass(s.slideNextClass));
        let d = o.prevAll(`.${s.slideClass}`).eq(0).addClass(s.slidePrevClass);
        s.loop &&
          0 === d.length &&
          ((d = t.eq(-1)), d.addClass(s.slidePrevClass)),
          s.loop &&
            (l.hasClass(s.slideDuplicateClass)
              ? i
                  .children(
                    `.${s.slideClass}:not(.${
                      s.slideDuplicateClass
                    })[data-swiper-slide-index="${l.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(s.slideDuplicateNextClass)
              : i
                  .children(
                    `.${s.slideClass}.${
                      s.slideDuplicateClass
                    }[data-swiper-slide-index="${l.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(s.slideDuplicateNextClass),
            d.hasClass(s.slideDuplicateClass)
              ? i
                  .children(
                    `.${s.slideClass}:not(.${
                      s.slideDuplicateClass
                    })[data-swiper-slide-index="${d.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(s.slideDuplicatePrevClass)
              : i
                  .children(
                    `.${s.slideClass}.${
                      s.slideDuplicateClass
                    }[data-swiper-slide-index="${d.attr(
                      "data-swiper-slide-index"
                    )}"]`
                  )
                  .addClass(s.slideDuplicatePrevClass)),
          e.emitSlidesClasses();
      },
      updateActiveIndex: function (e) {
        const t = this,
          s = t.rtlTranslate ? t.translate : -t.translate,
          {
            slidesGrid: i,
            snapGrid: r,
            params: n,
            activeIndex: a,
            realIndex: o,
            snapIndex: l,
          } = t;
        let d,
          c = e;
        if (void 0 === c) {
          for (let e = 0; e < i.length; e += 1)
            void 0 !== i[e + 1]
              ? s >= i[e] && s < i[e + 1] - (i[e + 1] - i[e]) / 2
                ? (c = e)
                : s >= i[e] && s < i[e + 1] && (c = e + 1)
              : s >= i[e] && (c = e);
          n.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
        }
        if (r.indexOf(s) >= 0) d = r.indexOf(s);
        else {
          const e = Math.min(n.slidesPerGroupSkip, c);
          d = e + Math.floor((c - e) / n.slidesPerGroup);
        }
        if ((d >= r.length && (d = r.length - 1), c === a))
          return void (
            d !== l && ((t.snapIndex = d), t.emit("snapIndexChange"))
          );
        const p = parseInt(
          t.slides.eq(c).attr("data-swiper-slide-index") || c,
          10
        );
        Object.assign(t, {
          snapIndex: d,
          realIndex: p,
          previousIndex: a,
          activeIndex: c,
        }),
          t.emit("activeIndexChange"),
          t.emit("snapIndexChange"),
          o !== p && t.emit("realIndexChange"),
          (t.initialized || t.params.runCallbacksOnInit) &&
            t.emit("slideChange");
      },
      updateClickedSlide: function (e) {
        const t = this,
          s = t.params,
          i = d(e).closest(`.${s.slideClass}`)[0];
        let r,
          n = !1;
        if (i)
          for (let a = 0; a < t.slides.length; a += 1)
            if (t.slides[a] === i) {
              (n = !0), (r = a);
              break;
            }
        if (!i || !n)
          return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
        (t.clickedSlide = i),
          t.virtual && t.params.virtual.enabled
            ? (t.clickedIndex = parseInt(
                d(i).attr("data-swiper-slide-index"),
                10
              ))
            : (t.clickedIndex = r),
          s.slideToClickedSlide &&
            void 0 !== t.clickedIndex &&
            t.clickedIndex !== t.activeIndex &&
            t.slideToClickedSlide();
      },
    },
    translate: {
      getTranslate: function (e) {
        void 0 === e && (e = this.isHorizontal() ? "x" : "y");
        const {
          params: t,
          rtlTranslate: s,
          translate: i,
          $wrapperEl: r,
        } = this;
        if (t.virtualTranslate) return s ? -i : i;
        if (t.cssMode) return i;
        let n = h(r[0], e);
        return s && (n = -n), n || 0;
      },
      setTranslate: function (e, t) {
        const s = this,
          {
            rtlTranslate: i,
            params: r,
            $wrapperEl: n,
            wrapperEl: a,
            progress: o,
          } = s;
        let l,
          d = 0,
          c = 0;
        s.isHorizontal() ? (d = i ? -e : e) : (c = e),
          r.roundLengths && ((d = Math.floor(d)), (c = Math.floor(c))),
          r.cssMode
            ? (a[s.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                s.isHorizontal() ? -d : -c)
            : r.virtualTranslate ||
              n.transform(`translate3d(${d}px, ${c}px, 0px)`),
          (s.previousTranslate = s.translate),
          (s.translate = s.isHorizontal() ? d : c);
        const p = s.maxTranslate() - s.minTranslate();
        (l = 0 === p ? 0 : (e - s.minTranslate()) / p),
          l !== o && s.updateProgress(e),
          s.emit("setTranslate", s.translate, t);
      },
      minTranslate: function () {
        return -this.snapGrid[0];
      },
      maxTranslate: function () {
        return -this.snapGrid[this.snapGrid.length - 1];
      },
      translateTo: function (e, t, s, i, r) {
        void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === s && (s = !0),
          void 0 === i && (i = !0);
        const n = this,
          { params: a, wrapperEl: o } = n;
        if (n.animating && a.preventInteractionOnTransition) return !1;
        const l = n.minTranslate(),
          d = n.maxTranslate();
        let c;
        if (
          ((c = i && e > l ? l : i && e < d ? d : e),
          n.updateProgress(c),
          a.cssMode)
        ) {
          const e = n.isHorizontal();
          if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -c;
          else {
            if (!n.support.smoothScroll)
              return (
                w({ swiper: n, targetPosition: -c, side: e ? "left" : "top" }),
                !0
              );
            o.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
          }
          return !0;
        }
        return (
          0 === t
            ? (n.setTransition(0),
              n.setTranslate(c),
              s &&
                (n.emit("beforeTransitionStart", t, r),
                n.emit("transitionEnd")))
            : (n.setTransition(t),
              n.setTranslate(c),
              s &&
                (n.emit("beforeTransitionStart", t, r),
                n.emit("transitionStart")),
              n.animating ||
                ((n.animating = !0),
                n.onTranslateToWrapperTransitionEnd ||
                  (n.onTranslateToWrapperTransitionEnd = function (e) {
                    n &&
                      !n.destroyed &&
                      e.target === this &&
                      (n.$wrapperEl[0].removeEventListener(
                        "transitionend",
                        n.onTranslateToWrapperTransitionEnd
                      ),
                      n.$wrapperEl[0].removeEventListener(
                        "webkitTransitionEnd",
                        n.onTranslateToWrapperTransitionEnd
                      ),
                      (n.onTranslateToWrapperTransitionEnd = null),
                      delete n.onTranslateToWrapperTransitionEnd,
                      s && n.emit("transitionEnd"));
                  }),
                n.$wrapperEl[0].addEventListener(
                  "transitionend",
                  n.onTranslateToWrapperTransitionEnd
                ),
                n.$wrapperEl[0].addEventListener(
                  "webkitTransitionEnd",
                  n.onTranslateToWrapperTransitionEnd
                ))),
          !0
        );
      },
    },
    transition: {
      setTransition: function (e, t) {
        const s = this;
        s.params.cssMode || s.$wrapperEl.transition(e),
          s.emit("setTransition", e, t);
      },
      transitionStart: function (e, t) {
        void 0 === e && (e = !0);
        const s = this,
          { params: i } = s;
        i.cssMode ||
          (i.autoHeight && s.updateAutoHeight(),
          y({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
      },
      transitionEnd: function (e, t) {
        void 0 === e && (e = !0);
        const s = this,
          { params: i } = s;
        (s.animating = !1),
          i.cssMode ||
            (s.setTransition(0),
            y({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
      },
    },
    slide: {
      slideTo: function (e, t, s, i, r) {
        if (
          (void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === s && (s = !0),
          "number" != typeof e && "string" != typeof e)
        )
          throw new Error(
            `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
          );
        if ("string" == typeof e) {
          const t = parseInt(e, 10);
          if (!isFinite(t))
            throw new Error(
              `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
            );
          e = t;
        }
        const n = this;
        let a = e;
        a < 0 && (a = 0);
        const {
          params: o,
          snapGrid: l,
          slidesGrid: d,
          previousIndex: c,
          activeIndex: p,
          rtlTranslate: u,
          wrapperEl: h,
          enabled: f,
        } = n;
        if (
          (n.animating && o.preventInteractionOnTransition) ||
          (!f && !i && !r)
        )
          return !1;
        const m = Math.min(n.params.slidesPerGroupSkip, a);
        let g = m + Math.floor((a - m) / n.params.slidesPerGroup);
        g >= l.length && (g = l.length - 1),
          (p || o.initialSlide || 0) === (c || 0) &&
            s &&
            n.emit("beforeSlideChangeStart");
        const v = -l[g];
        if ((n.updateProgress(v), o.normalizeSlideIndex))
          for (let w = 0; w < d.length; w += 1) {
            const e = -Math.floor(100 * v),
              t = Math.floor(100 * d[w]),
              s = Math.floor(100 * d[w + 1]);
            void 0 !== d[w + 1]
              ? e >= t && e < s - (s - t) / 2
                ? (a = w)
                : e >= t && e < s && (a = w + 1)
              : e >= t && (a = w);
          }
        if (n.initialized && a !== p) {
          if (!n.allowSlideNext && v < n.translate && v < n.minTranslate())
            return !1;
          if (
            !n.allowSlidePrev &&
            v > n.translate &&
            v > n.maxTranslate() &&
            (p || 0) !== a
          )
            return !1;
        }
        let T;
        if (
          ((T = a > p ? "next" : a < p ? "prev" : "reset"),
          (u && -v === n.translate) || (!u && v === n.translate))
        )
          return (
            n.updateActiveIndex(a),
            o.autoHeight && n.updateAutoHeight(),
            n.updateSlidesClasses(),
            "slide" !== o.effect && n.setTranslate(v),
            "reset" !== T && (n.transitionStart(s, T), n.transitionEnd(s, T)),
            !1
          );
        if (o.cssMode) {
          const e = n.isHorizontal(),
            s = u ? v : -v;
          if (0 === t) {
            const t = n.virtual && n.params.virtual.enabled;
            t &&
              ((n.wrapperEl.style.scrollSnapType = "none"),
              (n._immediateVirtual = !0)),
              (h[e ? "scrollLeft" : "scrollTop"] = s),
              t &&
                requestAnimationFrame(() => {
                  (n.wrapperEl.style.scrollSnapType = ""),
                    (n._swiperImmediateVirtual = !1);
                });
          } else {
            if (!n.support.smoothScroll)
              return (
                w({ swiper: n, targetPosition: s, side: e ? "left" : "top" }),
                !0
              );
            h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
          }
          return !0;
        }
        return (
          n.setTransition(t),
          n.setTranslate(v),
          n.updateActiveIndex(a),
          n.updateSlidesClasses(),
          n.emit("beforeTransitionStart", t, i),
          n.transitionStart(s, T),
          0 === t
            ? n.transitionEnd(s, T)
            : n.animating ||
              ((n.animating = !0),
              n.onSlideToWrapperTransitionEnd ||
                (n.onSlideToWrapperTransitionEnd = function (e) {
                  n &&
                    !n.destroyed &&
                    e.target === this &&
                    (n.$wrapperEl[0].removeEventListener(
                      "transitionend",
                      n.onSlideToWrapperTransitionEnd
                    ),
                    n.$wrapperEl[0].removeEventListener(
                      "webkitTransitionEnd",
                      n.onSlideToWrapperTransitionEnd
                    ),
                    (n.onSlideToWrapperTransitionEnd = null),
                    delete n.onSlideToWrapperTransitionEnd,
                    n.transitionEnd(s, T));
                }),
              n.$wrapperEl[0].addEventListener(
                "transitionend",
                n.onSlideToWrapperTransitionEnd
              ),
              n.$wrapperEl[0].addEventListener(
                "webkitTransitionEnd",
                n.onSlideToWrapperTransitionEnd
              )),
          !0
        );
      },
      slideToLoop: function (e, t, s, i) {
        void 0 === e && (e = 0),
          void 0 === t && (t = this.params.speed),
          void 0 === s && (s = !0);
        const r = this;
        let n = e;
        return r.params.loop && (n += r.loopedSlides), r.slideTo(n, t, s, i);
      },
      slideNext: function (e, t, s) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const i = this,
          { animating: r, enabled: n, params: a } = i;
        if (!n) return i;
        let o = a.slidesPerGroup;
        "auto" === a.slidesPerView &&
          1 === a.slidesPerGroup &&
          a.slidesPerGroupAuto &&
          (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
        const l = i.activeIndex < a.slidesPerGroupSkip ? 1 : o;
        if (a.loop) {
          if (r && a.loopPreventsSlide) return !1;
          i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
        }
        return a.rewind && i.isEnd
          ? i.slideTo(0, e, t, s)
          : i.slideTo(i.activeIndex + l, e, t, s);
      },
      slidePrev: function (e, t, s) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        const i = this,
          {
            params: r,
            animating: n,
            snapGrid: a,
            slidesGrid: o,
            rtlTranslate: l,
            enabled: d,
          } = i;
        if (!d) return i;
        if (r.loop) {
          if (n && r.loopPreventsSlide) return !1;
          i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
        }
        function c(e) {
          return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
        }
        const p = c(l ? i.translate : -i.translate),
          u = a.map((e) => c(e));
        let h = a[u.indexOf(p) - 1];
        if (void 0 === h && r.cssMode) {
          let e;
          a.forEach((t, s) => {
            p >= t && (e = s);
          }),
            void 0 !== e && (h = a[e > 0 ? e - 1 : e]);
        }
        let f = 0;
        if (
          (void 0 !== h &&
            ((f = o.indexOf(h)),
            f < 0 && (f = i.activeIndex - 1),
            "auto" === r.slidesPerView &&
              1 === r.slidesPerGroup &&
              r.slidesPerGroupAuto &&
              ((f = f - i.slidesPerViewDynamic("previous", !0) + 1),
              (f = Math.max(f, 0)))),
          r.rewind && i.isBeginning)
        ) {
          const r =
            i.params.virtual && i.params.virtual.enabled && i.virtual
              ? i.virtual.slides.length - 1
              : i.slides.length - 1;
          return i.slideTo(r, e, t, s);
        }
        return i.slideTo(f, e, t, s);
      },
      slideReset: function (e, t, s) {
        return (
          void 0 === e && (e = this.params.speed),
          void 0 === t && (t = !0),
          this.slideTo(this.activeIndex, e, t, s)
        );
      },
      slideToClosest: function (e, t, s, i) {
        void 0 === e && (e = this.params.speed),
          void 0 === t && (t = !0),
          void 0 === i && (i = 0.5);
        const r = this;
        let n = r.activeIndex;
        const a = Math.min(r.params.slidesPerGroupSkip, n),
          o = a + Math.floor((n - a) / r.params.slidesPerGroup),
          l = r.rtlTranslate ? r.translate : -r.translate;
        if (l >= r.snapGrid[o]) {
          const e = r.snapGrid[o];
          l - e > (r.snapGrid[o + 1] - e) * i && (n += r.params.slidesPerGroup);
        } else {
          const e = r.snapGrid[o - 1];
          l - e <= (r.snapGrid[o] - e) * i && (n -= r.params.slidesPerGroup);
        }
        return (
          (n = Math.max(n, 0)),
          (n = Math.min(n, r.slidesGrid.length - 1)),
          r.slideTo(n, e, t, s)
        );
      },
      slideToClickedSlide: function () {
        const e = this,
          { params: t, $wrapperEl: s } = e,
          i =
            "auto" === t.slidesPerView
              ? e.slidesPerViewDynamic()
              : t.slidesPerView;
        let r,
          n = e.clickedIndex;
        if (t.loop) {
          if (e.animating) return;
          (r = parseInt(d(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
            t.centeredSlides
              ? n < e.loopedSlides - i / 2 ||
                n > e.slides.length - e.loopedSlides + i / 2
                ? (e.loopFix(),
                  (n = s
                    .children(
                      `.${t.slideClass}[data-swiper-slide-index="${r}"]:not(.${t.slideDuplicateClass})`
                    )
                    .eq(0)
                    .index()),
                  p(() => {
                    e.slideTo(n);
                  }))
                : e.slideTo(n)
              : n > e.slides.length - i
              ? (e.loopFix(),
                (n = s
                  .children(
                    `.${t.slideClass}[data-swiper-slide-index="${r}"]:not(.${t.slideDuplicateClass})`
                  )
                  .eq(0)
                  .index()),
                p(() => {
                  e.slideTo(n);
                }))
              : e.slideTo(n);
        } else e.slideTo(n);
      },
    },
    loop: {
      loopCreate: function () {
        const e = this,
          t = i(),
          { params: s, $wrapperEl: r } = e,
          n = r.children().length > 0 ? d(r.children()[0].parentNode) : r;
        n.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
        let a = n.children(`.${s.slideClass}`);
        if (s.loopFillGroupWithBlank) {
          const e = s.slidesPerGroup - (a.length % s.slidesPerGroup);
          if (e !== s.slidesPerGroup) {
            for (let i = 0; i < e; i += 1) {
              const e = d(t.createElement("div")).addClass(
                `${s.slideClass} ${s.slideBlankClass}`
              );
              n.append(e);
            }
            a = n.children(`.${s.slideClass}`);
          }
        }
        "auto" !== s.slidesPerView ||
          s.loopedSlides ||
          (s.loopedSlides = a.length),
          (e.loopedSlides = Math.ceil(
            parseFloat(s.loopedSlides || s.slidesPerView, 10)
          )),
          (e.loopedSlides += s.loopAdditionalSlides),
          e.loopedSlides > a.length && (e.loopedSlides = a.length);
        const o = [],
          l = [];
        a.each((t, s) => {
          const i = d(t);
          s < e.loopedSlides && l.push(t),
            s < a.length && s >= a.length - e.loopedSlides && o.push(t),
            i.attr("data-swiper-slide-index", s);
        });
        for (let i = 0; i < l.length; i += 1)
          n.append(d(l[i].cloneNode(!0)).addClass(s.slideDuplicateClass));
        for (let i = o.length - 1; i >= 0; i -= 1)
          n.prepend(d(o[i].cloneNode(!0)).addClass(s.slideDuplicateClass));
      },
      loopFix: function () {
        const e = this;
        e.emit("beforeLoopFix");
        const {
          activeIndex: t,
          slides: s,
          loopedSlides: i,
          allowSlidePrev: r,
          allowSlideNext: n,
          snapGrid: a,
          rtlTranslate: o,
        } = e;
        let l;
        (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
        const d = -a[t] - e.getTranslate();
        if (t < i) {
          (l = s.length - 3 * i + t), (l += i);
          e.slideTo(l, 0, !1, !0) &&
            0 !== d &&
            e.setTranslate((o ? -e.translate : e.translate) - d);
        } else if (t >= s.length - i) {
          (l = -s.length + t + i), (l += i);
          e.slideTo(l, 0, !1, !0) &&
            0 !== d &&
            e.setTranslate((o ? -e.translate : e.translate) - d);
        }
        (e.allowSlidePrev = r), (e.allowSlideNext = n), e.emit("loopFix");
      },
      loopDestroy: function () {
        const { $wrapperEl: e, params: t, slides: s } = this;
        e
          .children(
            `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
          )
          .remove(),
          s.removeAttr("data-swiper-slide-index");
      },
    },
    grabCursor: {
      setGrabCursor: function (e) {
        const t = this;
        if (
          t.support.touch ||
          !t.params.simulateTouch ||
          (t.params.watchOverflow && t.isLocked) ||
          t.params.cssMode
        )
          return;
        const s =
          "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
        (s.style.cursor = "move"),
          (s.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
          (s.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
          (s.style.cursor = e ? "grabbing" : "grab");
      },
      unsetGrabCursor: function () {
        const e = this;
        e.support.touch ||
          (e.params.watchOverflow && e.isLocked) ||
          e.params.cssMode ||
          (e[
            "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
          ].style.cursor = "");
      },
    },
    events: {
      attachEvents: function () {
        const e = this,
          t = i(),
          { params: s, support: r } = e;
        (e.onTouchStart = M.bind(e)),
          (e.onTouchMove = P.bind(e)),
          (e.onTouchEnd = L.bind(e)),
          s.cssMode && (e.onScroll = O.bind(e)),
          (e.onClick = $.bind(e)),
          r.touch && !A && (t.addEventListener("touchstart", z), (A = !0)),
          I(e, "on");
      },
      detachEvents: function () {
        I(this, "off");
      },
    },
    breakpoints: {
      setBreakpoint: function () {
        const e = this,
          {
            activeIndex: t,
            initialized: s,
            loopedSlides: i = 0,
            params: r,
            $el: n,
          } = e,
          a = r.breakpoints;
        if (!a || (a && 0 === Object.keys(a).length)) return;
        const o = e.getBreakpoint(a, e.params.breakpointsBase, e.el);
        if (!o || e.currentBreakpoint === o) return;
        const l = (o in a ? a[o] : void 0) || e.originalParams,
          d = D(e, r),
          c = D(e, l),
          p = r.enabled;
        d && !c
          ? (n.removeClass(
              `${r.containerModifierClass}grid ${r.containerModifierClass}grid-column`
            ),
            e.emitContainerClasses())
          : !d &&
            c &&
            (n.addClass(`${r.containerModifierClass}grid`),
            ((l.grid.fill && "column" === l.grid.fill) ||
              (!l.grid.fill && "column" === r.grid.fill)) &&
              n.addClass(`${r.containerModifierClass}grid-column`),
            e.emitContainerClasses());
        const u = l.direction && l.direction !== r.direction,
          h = r.loop && (l.slidesPerView !== r.slidesPerView || u);
        u && s && e.changeDirection(), g(e.params, l);
        const f = e.params.enabled;
        Object.assign(e, {
          allowTouchMove: e.params.allowTouchMove,
          allowSlideNext: e.params.allowSlideNext,
          allowSlidePrev: e.params.allowSlidePrev,
        }),
          p && !f ? e.disable() : !p && f && e.enable(),
          (e.currentBreakpoint = o),
          e.emit("_beforeBreakpoint", l),
          h &&
            s &&
            (e.loopDestroy(),
            e.loopCreate(),
            e.updateSlides(),
            e.slideTo(t - i + e.loopedSlides, 0, !1)),
          e.emit("breakpoint", l);
      },
      getBreakpoint: function (e, t, s) {
        if ((void 0 === t && (t = "window"), !e || ("container" === t && !s)))
          return;
        let i = !1;
        const r = n(),
          a = "window" === t ? r.innerHeight : s.clientHeight,
          o = Object.keys(e).map((e) => {
            if ("string" == typeof e && 0 === e.indexOf("@")) {
              const t = parseFloat(e.substr(1));
              return { value: a * t, point: e };
            }
            return { value: e, point: e };
          });
        o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
        for (let n = 0; n < o.length; n += 1) {
          const { point: e, value: a } = o[n];
          "window" === t
            ? r.matchMedia(`(min-width: ${a}px)`).matches && (i = e)
            : a <= s.clientWidth && (i = e);
        }
        return i || "max";
      },
    },
    checkOverflow: {
      checkOverflow: function () {
        const e = this,
          { isLocked: t, params: s } = e,
          { slidesOffsetBefore: i } = s;
        if (i) {
          const t = e.slides.length - 1,
            s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
          e.isLocked = e.size > s;
        } else e.isLocked = 1 === e.snapGrid.length;
        !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
          !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
          t && t !== e.isLocked && (e.isEnd = !1),
          t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
      },
    },
    classes: {
      addClasses: function () {
        const e = this,
          {
            classNames: t,
            params: s,
            rtl: i,
            $el: r,
            device: n,
            support: a,
          } = e,
          o = (function (e, t) {
            const s = [];
            return (
              e.forEach((e) => {
                "object" == typeof e
                  ? Object.keys(e).forEach((i) => {
                      e[i] && s.push(t + i);
                    })
                  : "string" == typeof e && s.push(t + e);
              }),
              s
            );
          })(
            [
              "initialized",
              s.direction,
              { "pointer-events": !a.touch },
              { "free-mode": e.params.freeMode && s.freeMode.enabled },
              { autoheight: s.autoHeight },
              { rtl: i },
              { grid: s.grid && s.grid.rows > 1 },
              {
                "grid-column":
                  s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
              },
              { android: n.android },
              { ios: n.ios },
              { "css-mode": s.cssMode },
              { centered: s.cssMode && s.centeredSlides },
            ],
            s.containerModifierClass
          );
        t.push(...o), r.addClass([...t].join(" ")), e.emitContainerClasses();
      },
      removeClasses: function () {
        const { $el: e, classNames: t } = this;
        e.removeClass(t.join(" ")), this.emitContainerClasses();
      },
    },
    images: {
      loadImage: function (e, t, s, i, r, a) {
        const o = n();
        let l;
        function c() {
          a && a();
        }
        d(e).parent("picture")[0] || (e.complete && r)
          ? c()
          : t
          ? ((l = new o.Image()),
            (l.onload = c),
            (l.onerror = c),
            i && (l.sizes = i),
            s && (l.srcset = s),
            t && (l.src = t))
          : c();
      },
      preloadImages: function () {
        const e = this;
        function t() {
          null != e &&
            e &&
            !e.destroyed &&
            (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
            e.imagesLoaded === e.imagesToLoad.length &&
              (e.params.updateOnImagesReady && e.update(),
              e.emit("imagesReady")));
        }
        e.imagesToLoad = e.$el.find("img");
        for (let s = 0; s < e.imagesToLoad.length; s += 1) {
          const i = e.imagesToLoad[s];
          e.loadImage(
            i,
            i.currentSrc || i.getAttribute("src"),
            i.srcset || i.getAttribute("srcset"),
            i.sizes || i.getAttribute("sizes"),
            !0,
            t
          );
        }
      },
    },
  },
  B = {};


class H {
  constructor() {
    let e, t;
    for (var s = arguments.length, i = new Array(s), r = 0; r < s; r++)
      i[r] = arguments[r];
    if (
      (1 === i.length &&
      i[0].constructor &&
      "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
        ? (t = i[0])
        : ([e, t] = i),
      t || (t = {}),
      (t = g({}, t)),
      e && !t.el && (t.el = e),
      t.el && d(t.el).length > 1)
    ) {
      const e = [];
      return (
        d(t.el).each((s) => {
          const i = g({}, t, { el: s });
          e.push(new H(i));
        }),
        e
      );
    }
    const n = this;
    (n.__swiper__ = !0),
      (n.support = x()),
      (n.device = C({ userAgent: t.userAgent })),
      (n.browser = E()),
      (n.eventsListeners = {}),
      (n.eventsAnyListeners = []),
      (n.modules = [...n.__modules__]),
      t.modules && Array.isArray(t.modules) && n.modules.push(...t.modules);
    const a = {};
    n.modules.forEach((e) => {
      e({
        swiper: n,
        extendParams: N(t, a),
        on: n.on.bind(n),
        once: n.once.bind(n),
        off: n.off.bind(n),
        emit: n.emit.bind(n),
      });
    });
    const o = g({}, G, a);
    return (
      (n.params = g({}, o, B, t)),
      (n.originalParams = g({}, n.params)),
      (n.passedParams = g({}, t)),
      n.params &&
        n.params.on &&
        Object.keys(n.params.on).forEach((e) => {
          n.on(e, n.params.on[e]);
        }),
      n.params && n.params.onAny && n.onAny(n.params.onAny),
      (n.$ = d),
      Object.assign(n, {
        enabled: n.params.enabled,
        el: e,
        classNames: [],
        slides: d(),
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal: () => "horizontal" === n.params.direction,
        isVertical: () => "vertical" === n.params.direction,
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        allowSlideNext: n.params.allowSlideNext,
        allowSlidePrev: n.params.allowSlidePrev,
        touchEvents: (function () {
          const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
            t = ["pointerdown", "pointermove", "pointerup"];
          return (
            (n.touchEventsTouch = {
              start: e[0],
              move: e[1],
              end: e[2],
              cancel: e[3],
            }),
            (n.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
            n.support.touch || !n.params.simulateTouch
              ? n.touchEventsTouch
              : n.touchEventsDesktop
          );
        })(),
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: n.params.focusableElements,
          lastClickTime: u(),
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          isTouchEvent: void 0,
          startMoving: void 0,
        },
        allowClick: !0,
        allowTouchMove: n.params.allowTouchMove,
        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
        imagesToLoad: [],
        imagesLoaded: 0,
      }),
      n.emit("_swiper"),
      n.params.init && n.init(),
      n
    );
  }


  enable() {
    const e = this;
    e.enabled ||
      ((e.enabled = !0),
      e.params.grabCursor && e.setGrabCursor(),
      e.emit("enable"));
  }
  disable() {
    const e = this;
    e.enabled &&
      ((e.enabled = !1),
      e.params.grabCursor && e.unsetGrabCursor(),
      e.emit("disable"));
  }
  setProgress(e, t) {
    const s = this;
    e = Math.min(Math.max(e, 0), 1);
    const i = s.minTranslate(),
      r = (s.maxTranslate() - i) * e + i;
    s.translateTo(r, void 0 === t ? 0 : t),
      s.updateActiveIndex(),
      s.updateSlidesClasses();
  }
  emitContainerClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = e.el.className
      .split(" ")
      .filter(
        (t) =>
          0 === t.indexOf("swiper") ||
          0 === t.indexOf(e.params.containerModifierClass)
      );
    e.emit("_containerClasses", t.join(" "));
  }
  getSlideClasses(e) {
    const t = this;
    return e.className
      .split(" ")
      .filter(
        (e) =>
          0 === e.indexOf("swiper-slide") ||
          0 === e.indexOf(t.params.slideClass)
      )
      .join(" ");
  }
  emitSlidesClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = [];
    e.slides.each((s) => {
      const i = e.getSlideClasses(s);
      t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
    }),
      e.emit("_slideClasses", t);
  }
  slidesPerViewDynamic(e, t) {
    void 0 === e && (e = "current"), void 0 === t && (t = !1);
    const {
      params: s,
      slides: i,
      slidesGrid: r,
      slidesSizesGrid: n,
      size: a,
      activeIndex: o,
    } = this;
    let l = 1;
    if (s.centeredSlides) {
      let e,
        t = i[o].swiperSlideSize;
      for (let s = o + 1; s < i.length; s += 1)
        i[s] &&
          !e &&
          ((t += i[s].swiperSlideSize), (l += 1), t > a && (e = !0));
      for (let s = o - 1; s >= 0; s -= 1)
        i[s] &&
          !e &&
          ((t += i[s].swiperSlideSize), (l += 1), t > a && (e = !0));
    } else if ("current" === e)
      for (let d = o + 1; d < i.length; d += 1) {
        (t ? r[d] + n[d] - r[o] < a : r[d] - r[o] < a) && (l += 1);
      }
    else
      for (let d = o - 1; d >= 0; d -= 1) {
        r[o] - r[d] < a && (l += 1);
      }
    return l;
  }
  update() {
    const e = this;
    if (!e || e.destroyed) return;
    const { snapGrid: t, params: s } = e;
    function i() {
      const t = e.rtlTranslate ? -1 * e.translate : e.translate,
        s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
      e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
    }
    let r;
    s.breakpoints && e.setBreakpoint(),
      e.updateSize(),
      e.updateSlides(),
      e.updateProgress(),
      e.updateSlidesClasses(),
      e.params.freeMode && e.params.freeMode.enabled
        ? (i(), e.params.autoHeight && e.updateAutoHeight())
        : ((r =
            ("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) &&
            e.isEnd &&
            !e.params.centeredSlides
              ? e.slideTo(e.slides.length - 1, 0, !1, !0)
              : e.slideTo(e.activeIndex, 0, !1, !0)),
          r || i()),
      s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
      e.emit("update");
  }
  changeDirection(e, t) {
    void 0 === t && (t = !0);
    const s = this,
      i = s.params.direction;
    return (
      e || (e = "horizontal" === i ? "vertical" : "horizontal"),
      e === i ||
        ("horizontal" !== e && "vertical" !== e) ||
        (s.$el
          .removeClass(`${s.params.containerModifierClass}${i}`)
          .addClass(`${s.params.containerModifierClass}${e}`),
        s.emitContainerClasses(),
        (s.params.direction = e),
        s.slides.each((t) => {
          "vertical" === e ? (t.style.width = "") : (t.style.height = "");
        }),
        s.emit("changeDirection"),
        t && s.update()),
      s
    );
  }
  mount(e) {
    const t = this;
    if (t.mounted) return !0;
    const s = d(e || t.params.el);
    if (!(e = s[0])) return !1;
    e.swiper = t;
    const r = () =>
      `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let n = (() => {
      if (e && e.shadowRoot && e.shadowRoot.querySelector) {
        const t = d(e.shadowRoot.querySelector(r()));
        return (t.children = (e) => s.children(e)), t;
      }
      return s.children(r());
    })();
    if (0 === n.length && t.params.createElements) {
      const e = i().createElement("div");
      (n = d(e)),
        (e.className = t.params.wrapperClass),
        s.append(e),
        s.children(`.${t.params.slideClass}`).each((e) => {
          n.append(e);
        });
    }
    return (
      Object.assign(t, {
        $el: s,
        el: e,
        $wrapperEl: n,
        wrapperEl: n[0],
        mounted: !0,
        rtl: "rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction"),
        rtlTranslate:
          "horizontal" === t.params.direction &&
          ("rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction")),
        wrongRTL: "-webkit-box" === n.css("display"),
      }),
      !0
    );
  }
  init(e) {
    const t = this;
    if (t.initialized) return t;
    return (
      !1 === t.mount(e) ||
        (t.emit("beforeInit"),
        t.params.breakpoints && t.setBreakpoint(),
        t.addClasses(),
        t.params.loop && t.loopCreate(),
        t.updateSize(),
        t.updateSlides(),
        t.params.watchOverflow && t.checkOverflow(),
        t.params.grabCursor && t.enabled && t.setGrabCursor(),
        t.params.preloadImages && t.preloadImages(),
        t.params.loop
          ? t.slideTo(
              t.params.initialSlide + t.loopedSlides,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0
            )
          : t.slideTo(
              t.params.initialSlide,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0
            ),
        t.attachEvents(),
        (t.initialized = !0),
        t.emit("init"),
        t.emit("afterInit")),
      t
    );
  }
  destroy(e, t) {
    void 0 === e && (e = !0), void 0 === t && (t = !0);
    const s = this,
      { params: i, $el: r, $wrapperEl: n, slides: a } = s;
    return (
      void 0 === s.params ||
        s.destroyed ||
        (s.emit("beforeDestroy"),
        (s.initialized = !1),
        s.detachEvents(),
        i.loop && s.loopDestroy(),
        t &&
          (s.removeClasses(),
          r.removeAttr("style"),
          n.removeAttr("style"),
          a &&
            a.length &&
            a
              .removeClass(
                [
                  i.slideVisibleClass,
                  i.slideActiveClass,
                  i.slideNextClass,
                  i.slidePrevClass,
                ].join(" ")
              )
              .removeAttr("style")
              .removeAttr("data-swiper-slide-index")),
        s.emit("destroy"),
        Object.keys(s.eventsListeners).forEach((e) => {
          s.off(e);
        }),
        !1 !== e &&
          ((s.$el[0].swiper = null),
          (function (e) {
            const t = e;
            Object.keys(t).forEach((e) => {
              try {
                t[e] = null;
              } catch (s) {}
              try {
                delete t[e];
              } catch (s) {}
            });
          })(s)),
        (s.destroyed = !0)),
      null
    );
  }
  static extendDefaults(e) {
    g(B, e);
  }
  static get extendedDefaults() {
    return B;
  }
  static get defaults() {
    return G;
  }
  static installModule(e) {
    H.prototype.__modules__ || (H.prototype.__modules__ = []);
    const t = H.prototype.__modules__;
    "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
  }
  static use(e) {
    return Array.isArray(e)
      ? (e.forEach((e) => H.installModule(e)), H)
      : (H.installModule(e), H);
  }
}
function j(e) {
  let { swiper: t, extendParams: s, on: i } = e;
  s({
    cubeEffect: {
      slideShadows: !0,
      shadow: !0,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
  });
  !(function (e) {
    const {
      effect: t,
      swiper: s,
      on: i,
      setTranslate: r,
      setTransition: n,
      overwriteParams: a,
      perspective: o,
    } = e;
    i("beforeInit", () => {
      if (s.params.effect !== t) return;
      s.classNames.push(`${s.params.containerModifierClass}${t}`),
        o && o() && s.classNames.push(`${s.params.containerModifierClass}3d`);
      const e = a ? a() : {};
      Object.assign(s.params, e), Object.assign(s.originalParams, e);
    }),
      i("setTranslate", () => {
        s.params.effect === t && r();
      }),
      i("setTransition", (e, i) => {
        s.params.effect === t && n(i);
      });
  })({
    effect: "cube",
    swiper: t,
    on: i,
    setTranslate: () => {
      const {
          $el: e,
          $wrapperEl: s,
          slides: i,
          width: r,
          height: n,
          rtlTranslate: a,
          size: o,
          browser: l,
        } = t,
        c = t.params.cubeEffect,
        p = t.isHorizontal(),
        u = t.virtual && t.params.virtual.enabled;
      let h,
        f = 0;
      c.shadow &&
        (p
          ? ((h = s.find(".swiper-cube-shadow")),
            0 === h.length &&
              ((h = d('<div class="swiper-cube-shadow"></div>')), s.append(h)),
            h.css({ height: `${r}px` }))
          : ((h = e.find(".swiper-cube-shadow")),
            0 === h.length &&
              ((h = d('<div class="swiper-cube-shadow"></div>')),
              e.append(h))));
      for (let t = 0; t < i.length; t += 1) {
        const e = i.eq(t);
        let s = t;
        u && (s = parseInt(e.attr("data-swiper-slide-index"), 10));
        let r = 90 * s,
          n = Math.floor(r / 360);
        a && ((r = -r), (n = Math.floor(-r / 360)));
        const l = Math.max(Math.min(e[0].progress, 1), -1);
        let h = 0,
          m = 0,
          g = 0;
        s % 4 == 0
          ? ((h = 4 * -n * o), (g = 0))
          : (s - 1) % 4 == 0
          ? ((h = 0), (g = 4 * -n * o))
          : (s - 2) % 4 == 0
          ? ((h = o + 4 * n * o), (g = o))
          : (s - 3) % 4 == 0 && ((h = -o), (g = 3 * o + 4 * o * n)),
          a && (h = -h),
          p || ((m = h), (h = 0));
        const v = `rotateX(${p ? 0 : -r}deg) rotateY(${
          p ? r : 0
        }deg) translate3d(${h}px, ${m}px, ${g}px)`;
        if (
          (l <= 1 &&
            l > -1 &&
            ((f = 90 * s + 90 * l), a && (f = 90 * -s - 90 * l)),
          e.transform(v),
          c.slideShadows)
        ) {
          let t = p
              ? e.find(".swiper-slide-shadow-left")
              : e.find(".swiper-slide-shadow-top"),
            s = p
              ? e.find(".swiper-slide-shadow-right")
              : e.find(".swiper-slide-shadow-bottom");
          0 === t.length &&
            ((t = d(
              `<div class="swiper-slide-shadow-${p ? "left" : "top"}"></div>`
            )),
            e.append(t)),
            0 === s.length &&
              ((s = d(
                `<div class="swiper-slide-shadow-${
                  p ? "right" : "bottom"
                }"></div>`
              )),
              e.append(s)),
            t.length && (t[0].style.opacity = Math.max(-l, 0)),
            s.length && (s[0].style.opacity = Math.max(l, 0));
        }
      }
      if (
        (s.css({
          "-webkit-transform-origin": `50% 50% -${o / 2}px`,
          "transform-origin": `50% 50% -${o / 2}px`,
        }),
        c.shadow)
      )
        if (p)
          h.transform(
            `translate3d(0px, ${r / 2 + c.shadowOffset}px, ${
              -r / 2
            }px) rotateX(90deg) rotateZ(0deg) scale(${c.shadowScale})`
          );
        else {
          const e = Math.abs(f) - 90 * Math.floor(Math.abs(f) / 90),
            t =
              1.5 -
              (Math.sin((2 * e * Math.PI) / 360) / 2 +
                Math.cos((2 * e * Math.PI) / 360) / 2),
            s = c.shadowScale,
            i = c.shadowScale / t,
            r = c.shadowOffset;
          h.transform(
            `scale3d(${s}, 1, ${i}) translate3d(0px, ${n / 2 + r}px, ${
              -n / 2 / i
            }px) rotateX(-90deg)`
          );
        }
      const m = l.isSafari || l.isWebView ? -o / 2 : 0;
      s.transform(
        `translate3d(0px,0,${m}px) rotateX(${
          t.isHorizontal() ? 0 : f
        }deg) rotateY(${t.isHorizontal() ? -f : 0}deg)`
      );
    },
    setTransition: (e) => {
      const { $el: s, slides: i } = t;
      i
        .transition(e)
        .find(
          ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
        )
        .transition(e),
        t.params.cubeEffect.shadow &&
          !t.isHorizontal() &&
          s.find(".swiper-cube-shadow").transition(e);
    },
    perspective: () => !0,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: !0,
      resistanceRatio: 0,
      spaceBetween: 0,
      centeredSlides: !1,
      virtualTranslate: !0,
    }),
  });
}


Object.keys(_).forEach((e) => {
  Object.keys(_[e]).forEach((t) => {
    H.prototype[t] = _[e][t];
  });
}),
  H.use([
    function (e) {
      let { swiper: t, on: s, emit: i } = e;
      const r = n();
      let a = null,
        o = null;
      const l = () => {
          t &&
            !t.destroyed &&
            t.initialized &&
            (i("beforeResize"), i("resize"));
        },
        d = () => {
          t && !t.destroyed && t.initialized && i("orientationchange");
        };
      s("init", () => {
        t.params.resizeObserver && void 0 !== r.ResizeObserver
          ? t &&
            !t.destroyed &&
            t.initialized &&
            ((a = new ResizeObserver((e) => {
              o = r.requestAnimationFrame(() => {
                const { width: s, height: i } = t;
                let r = s,
                  n = i;
                e.forEach((e) => {
                  let { contentBoxSize: s, contentRect: i, target: a } = e;
                  (a && a !== t.el) ||
                    ((r = i ? i.width : (s[0] || s).inlineSize),
                    (n = i ? i.height : (s[0] || s).blockSize));
                }),
                  (r === s && n === i) || l();
              });
            })),
            a.observe(t.el))
          : (r.addEventListener("resize", l),
            r.addEventListener("orientationchange", d));
      }),
        s("destroy", () => {
          o && r.cancelAnimationFrame(o),
            a && a.unobserve && t.el && (a.unobserve(t.el), (a = null)),
            r.removeEventListener("resize", l),
            r.removeEventListener("orientationchange", d);
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i, emit: r } = e;
      const a = [],
        o = n(),
        l = function (e, t) {
          void 0 === t && (t = {});
          const s = new (o.MutationObserver || o.WebkitMutationObserver)(
            (e) => {
              if (1 === e.length) return void r("observerUpdate", e[0]);
              const t = function () {
                r("observerUpdate", e[0]);
              };
              o.requestAnimationFrame
                ? o.requestAnimationFrame(t)
                : o.setTimeout(t, 0);
            }
          );
          s.observe(e, {
            attributes: void 0 === t.attributes || t.attributes,
            childList: void 0 === t.childList || t.childList,
            characterData: void 0 === t.characterData || t.characterData,
          }),
            a.push(s);
        };
      s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
        i("init", () => {
          if (t.params.observer) {
            if (t.params.observeParents) {
              const e = t.$el.parents();
              for (let t = 0; t < e.length; t += 1) l(e[t]);
            }
            l(t.$el[0], { childList: t.params.observeSlideChildren }),
              l(t.$wrapperEl[0], { attributes: !1 });
          }
        }),
        i("destroy", () => {
          a.forEach((e) => {
            e.disconnect();
          }),
            a.splice(0, a.length);
        });
    },
  ]);
  
export { j as E, H as S };
