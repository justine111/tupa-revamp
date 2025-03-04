/**
 * Minified by jsDelivr using Terser v5.19.2.
 * Original file: /npm/@formkit/auto-animate@0.8.2/index.mjs
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
const parents = new Set(),
  coords = new WeakMap(),
  siblings = new WeakMap(),
  animations = new WeakMap(),
  intersections = new WeakMap(),
  intervals = new WeakMap(),
  options = new WeakMap(),
  debounces = new WeakMap(),
  enabled = new WeakSet();
let root,
  scrollX = 0,
  scrollY = 0;
const TGT = '__aa_tgt',
  DEL = '__aa_del',
  NEW = '__aa_new',
  handleMutations = (e) => {
    const t = getElements(e);
    t && t.forEach((e) => animate(e));
  },
  handleResizes = (e) => {
    e.forEach((e) => {
      e.target === root && updateAllPos(),
        coords.has(e.target) && updatePos(e.target);
    });
  };
function observePosition(e) {
  const t = intersections.get(e);
  null == t || t.disconnect();
  let n = coords.get(e),
    o = 0;
  n || ((n = getCoords(e)), coords.set(e, n));
  const { offsetWidth: i, offsetHeight: r } = root,
    s = [
      n.top - 5,
      i - (n.left + 5 + n.width),
      r - (n.top + 5 + n.height),
      n.left - 5,
    ]
      .map((e) => -1 * Math.floor(e) + 'px')
      .join(' '),
    a = new IntersectionObserver(
      () => {
        ++o > 1 && updatePos(e);
      },
      { root: root, threshold: 1, rootMargin: s }
    );
  a.observe(e), intersections.set(e, a);
}
function updatePos(e) {
  clearTimeout(debounces.get(e));
  const t = getOptions(e),
    n = isPlugin(t) ? 500 : t.duration;
  debounces.set(
    e,
    setTimeout(async () => {
      const t = animations.get(e);
      try {
        await (null == t ? void 0 : t.finished),
          coords.set(e, getCoords(e)),
          observePosition(e);
      } catch {}
    }, n)
  );
}
function updateAllPos() {
  clearTimeout(debounces.get(root)),
    debounces.set(
      root,
      setTimeout(() => {
        parents.forEach((e) =>
          forEach(e, (e) => lowPriority(() => updatePos(e)))
        );
      }, 100)
    );
}
function poll(e) {
  setTimeout(() => {
    intervals.set(
      e,
      setInterval(() => lowPriority(updatePos.bind(null, e)), 2e3)
    );
  }, Math.round(2e3 * Math.random()));
}
function lowPriority(e) {
  'function' == typeof requestIdleCallback
    ? requestIdleCallback(() => e())
    : requestAnimationFrame(() => e());
}
let mutations, resize;
const supportedBrowser =
  'undefined' != typeof window && 'ResizeObserver' in window;
function getElements(e) {
  return (
    !e
      .reduce(
        (e, t) => [
          ...e,
          ...Array.from(t.addedNodes),
          ...Array.from(t.removedNodes),
        ],
        []
      )
      .every((e) => '#comment' === e.nodeName) &&
    e.reduce((e, t) => {
      if (!1 === e) return !1;
      if (t.target instanceof Element) {
        if ((target(t.target), !e.has(t.target))) {
          e.add(t.target);
          for (let n = 0; n < t.target.children.length; n++) {
            const o = t.target.children.item(n);
            if (o) {
              if (DEL in o) return !1;
              target(t.target, o), e.add(o);
            }
          }
        }
        if (t.removedNodes.length)
          for (let n = 0; n < t.removedNodes.length; n++) {
            const o = t.removedNodes[n];
            if (DEL in o) return !1;
            o instanceof Element &&
              (e.add(o),
              target(t.target, o),
              siblings.set(o, [t.previousSibling, t.nextSibling]));
          }
      }
      return e;
    }, new Set())
  );
}
function target(e, t) {
  t || TGT in e
    ? t && !(TGT in t) && Object.defineProperty(t, TGT, { value: e })
    : Object.defineProperty(e, TGT, { value: e });
}
function animate(e) {
  var t;
  const n = e.isConnected,
    o = coords.has(e);
  n && siblings.has(e) && siblings.delete(e),
    animations.has(e) &&
      (null === (t = animations.get(e)) || void 0 === t || t.cancel()),
    NEW in e ? add(e) : o && n ? remain(e) : o && !n ? remove(e) : add(e);
}
function raw(e) {
  return Number(e.replace(/[^0-9.\-]/g, ''));
}
function getScrollOffset(e) {
  let t = e.parentElement;
  for (; t; ) {
    if (t.scrollLeft || t.scrollTop) return { x: t.scrollLeft, y: t.scrollTop };
    t = t.parentElement;
  }
  return { x: 0, y: 0 };
}
function getCoords(e) {
  const t = e.getBoundingClientRect(),
    { x: n, y: o } = getScrollOffset(e);
  return { top: t.top + o, left: t.left + n, width: t.width, height: t.height };
}
function getTransitionSizes(e, t, n) {
  let o = t.width,
    i = t.height,
    r = n.width,
    s = n.height;
  const a = getComputedStyle(e);
  if ('content-box' === a.getPropertyValue('box-sizing')) {
    const e =
        raw(a.paddingTop) +
        raw(a.paddingBottom) +
        raw(a.borderTopWidth) +
        raw(a.borderBottomWidth),
      t =
        raw(a.paddingLeft) +
        raw(a.paddingRight) +
        raw(a.borderRightWidth) +
        raw(a.borderLeftWidth);
    (o -= t), (r -= t), (i -= e), (s -= e);
  }
  return [o, r, i, s].map(Math.round);
}
function getOptions(e) {
  return TGT in e && options.has(e[TGT])
    ? options.get(e[TGT])
    : { duration: 250, easing: 'ease-in-out' };
}
function getTarget(e) {
  if (TGT in e) return e[TGT];
}
function isEnabled(e) {
  const t = getTarget(e);
  return !!t && enabled.has(t);
}
function forEach(e, ...t) {
  t.forEach((t) => t(e, options.has(e)));
  for (let n = 0; n < e.children.length; n++) {
    const o = e.children.item(n);
    o && t.forEach((e) => e(o, options.has(o)));
  }
}
function getPluginTuple(e) {
  return Array.isArray(e) ? e : [e];
}
function isPlugin(e) {
  return 'function' == typeof e;
}
function remain(e) {
  const t = coords.get(e),
    n = getCoords(e);
  if (!isEnabled(e)) return coords.set(e, n);
  let o;
  if (!t) return;
  const i = getOptions(e);
  if ('function' != typeof i) {
    const r = t.left - n.left,
      s = t.top - n.top,
      [a, l, d, c] = getTransitionSizes(e, t, n),
      u = { transform: `translate(${r}px, ${s}px)` },
      f = { transform: 'translate(0, 0)' };
    a !== l && ((u.width = `${a}px`), (f.width = `${l}px`)),
      d !== c && ((u.height = `${d}px`), (f.height = `${c}px`)),
      (o = e.animate([u, f], { duration: i.duration, easing: i.easing }));
  } else {
    const [r] = getPluginTuple(i(e, 'remain', t, n));
    (o = new Animation(r)), o.play();
  }
  animations.set(e, o),
    coords.set(e, n),
    o.addEventListener('finish', updatePos.bind(null, e));
}
function add(e) {
  NEW in e && delete e[NEW];
  const t = getCoords(e);
  coords.set(e, t);
  const n = getOptions(e);
  if (!isEnabled(e)) return;
  let o;
  if ('function' != typeof n)
    o = e.animate(
      [
        { transform: 'scale(.98)', opacity: 0 },
        { transform: 'scale(0.98)', opacity: 0, offset: 0.5 },
        { transform: 'scale(1)', opacity: 1 },
      ],
      { duration: 1.5 * n.duration, easing: 'ease-in' }
    );
  else {
    const [i] = getPluginTuple(n(e, 'add', t));
    (o = new Animation(i)), o.play();
  }
  animations.set(e, o), o.addEventListener('finish', updatePos.bind(null, e));
}
function cleanUp(e, t) {
  var n;
  e.remove(),
    coords.delete(e),
    siblings.delete(e),
    animations.delete(e),
    null === (n = intersections.get(e)) || void 0 === n || n.disconnect(),
    setTimeout(() => {
      if (
        (DEL in e && delete e[DEL],
        Object.defineProperty(e, NEW, { value: !0, configurable: !0 }),
        t && e instanceof HTMLElement)
      )
        for (const n in t) e.style[n] = '';
    }, 0);
}
function remove(e) {
  var t;
  if (!siblings.has(e) || !coords.has(e)) return;
  const [n, o] = siblings.get(e);
  Object.defineProperty(e, DEL, { value: !0, configurable: !0 });
  const i = window.scrollX,
    r = window.scrollY;
  if (
    (o && o.parentNode && o.parentNode instanceof Element
      ? o.parentNode.insertBefore(e, o)
      : n && n.parentNode
      ? n.parentNode.appendChild(e)
      : null === (t = getTarget(e)) || void 0 === t || t.appendChild(e),
    !isEnabled(e))
  )
    return cleanUp(e);
  const [s, a, l, d] = deletePosition(e),
    c = getOptions(e),
    u = coords.get(e);
  let f;
  (i === scrollX && r === scrollY) || adjustScroll(e, i, r, c);
  let p = {
    position: 'absolute',
    top: `${s}px`,
    left: `${a}px`,
    width: `${l}px`,
    height: `${d}px`,
    margin: '0',
    pointerEvents: 'none',
    transformOrigin: 'center',
    zIndex: '100',
  };
  if (isPlugin(c)) {
    const [t, n] = getPluginTuple(c(e, 'remove', u));
    !1 !== (null == n ? void 0 : n.styleReset) &&
      ((p = (null == n ? void 0 : n.styleReset) || p),
      Object.assign(e.style, p)),
      (f = new Animation(t)),
      f.play();
  } else
    Object.assign(e.style, p),
      (f = e.animate(
        [
          { transform: 'scale(1)', opacity: 1 },
          { transform: 'scale(.98)', opacity: 0 },
        ],
        { duration: c.duration, easing: 'ease-out' }
      ));
  animations.set(e, f), f.addEventListener('finish', cleanUp.bind(null, e, p));
}
function adjustScroll(e, t, n, o) {
  const i = scrollX - t,
    r = scrollY - n,
    s = document.documentElement.style.scrollBehavior;
  if (
    ('smooth' === getComputedStyle(root).scrollBehavior &&
      (document.documentElement.style.scrollBehavior = 'auto'),
    window.scrollTo(window.scrollX + i, window.scrollY + r),
    !e.parentElement)
  )
    return;
  const a = e.parentElement;
  let l = a.clientHeight,
    d = a.clientWidth;
  const c = performance.now();
  !(function e() {
    requestAnimationFrame(() => {
      if (!isPlugin(o)) {
        const t = l - a.clientHeight,
          n = d - a.clientWidth;
        c + o.duration > performance.now()
          ? (window.scrollTo({
              left: window.scrollX - n,
              top: window.scrollY - t,
            }),
            (l = a.clientHeight),
            (d = a.clientWidth),
            e())
          : (document.documentElement.style.scrollBehavior = s);
      }
    });
  })();
}
function deletePosition(e) {
  const t = coords.get(e),
    [n, , o] = getTransitionSizes(e, t, getCoords(e));
  let i = e.parentElement;
  for (
    ;
    i &&
    ('static' === getComputedStyle(i).position || i instanceof HTMLBodyElement);

  )
    i = i.parentElement;
  i || (i = document.body);
  const r = getComputedStyle(i),
    s = coords.get(i) || getCoords(i);
  return [
    Math.round(t.top - s.top) - raw(r.borderTopWidth),
    Math.round(t.left - s.left) - raw(r.borderLeftWidth),
    n,
    o,
  ];
}
function autoAnimate(e, t = {}) {
  if (mutations && resize) {
    (window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !isPlugin(t) &&
      !t.disrespectUserMotionPreference) ||
      (enabled.add(e),
      'static' === getComputedStyle(e).position &&
        Object.assign(e.style, { position: 'relative' }),
      forEach(e, updatePos, poll, (e) =>
        null == resize ? void 0 : resize.observe(e)
      ),
      isPlugin(t)
        ? options.set(e, t)
        : options.set(e, { duration: 250, easing: 'ease-in-out', ...t }),
      mutations.observe(e, { childList: !0 }),
      parents.add(e));
  }
  return Object.freeze({
    parent: e,
    enable: () => {
      enabled.add(e);
    },
    disable: () => {
      enabled.delete(e);
    },
    isEnabled: () => enabled.has(e),
  });
}
supportedBrowser &&
  ((root = document.documentElement),
  (mutations = new MutationObserver(handleMutations)),
  (resize = new ResizeObserver(handleResizes)),
  window.addEventListener('scroll', () => {
    (scrollY = window.scrollY), (scrollX = window.scrollX);
  }),
  resize.observe(root));
const vAutoAnimate = {
  mounted: (e, t) => {
    autoAnimate(e, t.value || {});
  },
  getSSRProps: () => ({}),
};
export { autoAnimate as default, getTransitionSizes, vAutoAnimate };
//# sourceMappingURL=/sm/e7f5cf7e1dfe5206e8bff05f00bfccb0de99df67a28d2fe69ab48de03a1692d6.map
