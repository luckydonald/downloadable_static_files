// ==UserScript==
// @name         Lodestone's Userscript
// @namespace    https://github.com/luckydonald/derpibooru_userscript
// @version      2026.09.29.0000.19.45.23.0000.6dc1a9a714a03d89eef557d554c7da78442469d5
// @downloadURL  https://luckydonald.github.io/downloadable_static_files/derpibooru-userscript.user.js
// @updateURL    https://luckydonald.github.io/downloadable_static_files/derpibooru-userscript.user.js
// @match        *://*.derpibooru.org/*
// @match        *://*.trixiebooru.org/*
// @match        *://*.lunabooru.org/*
// @match        *://*.tentabus.ai/*
// @match        *://*.twibooru.org/*
// @match        *://*.furbooru.org/*
// @match        *://*.ponybooru.org/*
// @match        *://*.manebooru.art/*
// @connect      api.telegram.org
// @grant        GM_addStyle
// @grant        GM_addValueChangeListener
// @grant        GM_getValue
// @grant        GM_removeValueChangeListener
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
  'use strict';

  /**
  * @vue/shared v3.5.43
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  // @__NO_SIDE_EFFECTS__
  function makeMap(str) {
    const map = /* @__PURE__ */ Object.create(null);
    for (const key of str.split(",")) map[key] = 1;
    return (val) => val in map;
  }
  const EMPTY_OBJ = {};
  const EMPTY_ARR = [];
  const NOOP = () => {
  };
  const NO = () => false;
  const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
  (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
  const isModelListener = (key) => key.startsWith("onUpdate:");
  const extend = Object.assign;
  const remove = (arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
      arr.splice(i, 1);
    }
  };
  const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
  const isArray = Array.isArray;
  const isMap = (val) => toTypeString(val) === "[object Map]";
  const isSet = (val) => toTypeString(val) === "[object Set]";
  const isDate = (val) => toTypeString(val) === "[object Date]";
  const isFunction = (val) => typeof val === "function";
  const isString = (val) => typeof val === "string";
  const isSymbol = (val) => typeof val === "symbol";
  const isObject = (val) => val !== null && typeof val === "object";
  const isPromise = (val) => {
    return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
  };
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
  const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  const isReservedProp = /* @__PURE__ */ makeMap(
    // the leading comma is intentional so empty string "" is also included
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  );
  const cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return ((str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    });
  };
  const camelizeRE = /-\w/g;
  const camelize = cacheStringFunction(
    (str) => {
      return str.replace(camelizeRE, (c) => c.slice(1).toUpperCase());
    }
  );
  const hyphenateRE = /\B([A-Z])/g;
  const hyphenate = cacheStringFunction(
    (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
  );
  const capitalize = cacheStringFunction((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  const toHandlerKey = cacheStringFunction(
    (str) => {
      const s = str ? `on${capitalize(str)}` : ``;
      return s;
    }
  );
  const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
  const invokeArrayFns = (fns, ...arg) => {
    for (let i = 0; i < fns.length; i++) {
      fns[i](...arg);
    }
  };
  const def = (obj, key, value, writable = false) => {
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: false,
      writable,
      value
    });
  };
  const looseToNumber = (val) => {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
  };
  let _globalThis;
  const getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  };
  function normalizeStyle(value) {
    if (isArray(value)) {
      const res = {};
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
        if (normalized) {
          for (const key in normalized) {
            res[key] = normalized[key];
          }
        }
      }
      return res;
    } else if (isString(value) || isObject(value)) {
      return value;
    }
  }
  const listDelimiterRE = /;(?![^(]*\))/g;
  const propertyDelimiterRE = /:([^]+)/;
  const styleCommentRE = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
  function parseStringStyle(cssText) {
    const ret = {};
    cssText.replace(styleCommentRE, (match) => match.startsWith("/*") ? "" : match).split(listDelimiterRE).forEach((item) => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return ret;
  }
  function normalizeClass(value) {
    let res = "";
    if (isString(value)) {
      res = value;
    } else if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const normalized = normalizeClass(value[i]);
        if (normalized) {
          res += normalized + " ";
        }
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name]) {
          res += name + " ";
        }
      }
    }
    return res.trim();
  }
  const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
  function includeBooleanAttr(value) {
    return !!value || value === "";
  }
  function looseCompareArrays(a, b, seen) {
    if (a.length !== b.length) return false;
    let equal = true;
    for (let i = 0; equal && i < a.length; i++) {
      equal = looseEqual(a[i], b[i], seen);
    }
    return equal;
  }
  function looseCompareCollections(a, b, seen) {
    if (a.size !== b.size) return false;
    const candidates = Array.from(b);
    const matched = new Uint8Array(candidates.length);
    for (const item of a) {
      let index = -1;
      for (let i = 0; i < candidates.length; i++) {
        if (!matched[i] && looseEqual(item, candidates[i], seen)) {
          index = i;
          break;
        }
      }
      if (index < 0) return false;
      matched[index] = 1;
    }
    return true;
  }
  function looseCompareObjects(a, b, seen) {
    let aValidType = isMap(a);
    let bValidType = isMap(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? looseCompareCollections(a, b, seen) : false;
    }
    aValidType = isSet(a);
    bValidType = isSet(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? looseCompareCollections(a, b, seen) : false;
    }
    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key], seen)) {
        return false;
      }
    }
    return String(a) === String(b);
  }
  function looseCompareNested(a, b, seen, compare) {
    if (!seen) {
      seen = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()];
    }
    const [seenA, seenB] = seen;
    if (seenA.has(a) || seenB.has(b)) {
      return seenA.get(a) === b && seenB.get(b) === a;
    }
    seenA.set(a, b);
    seenB.set(b, a);
    const equal = compare(a, b, seen);
    seenA.delete(a);
    seenB.delete(b);
    return equal;
  }
  function looseEqual(a, b, seen) {
    if (a === b) return true;
    let aValidType = isDate(a);
    let bValidType = isDate(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? a.getTime() === b.getTime() : false;
    }
    aValidType = isSymbol(a);
    bValidType = isSymbol(b);
    if (aValidType || bValidType) {
      return a === b;
    }
    aValidType = isArray(a);
    bValidType = isArray(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? looseCompareNested(a, b, seen, looseCompareArrays) : false;
    }
    aValidType = isObject(a);
    bValidType = isObject(b);
    if (aValidType || bValidType) {
      if (!aValidType || !bValidType) {
        return false;
      }
      return looseCompareNested(a, b, seen, looseCompareObjects);
    }
    return String(a) === String(b);
  }
  function looseIndexOf(arr, val) {
    return arr.findIndex((item) => looseEqual(item, val));
  }
  const isRef$1 = (val) => {
    return !!(val && val["__v_isRef"] === true);
  };
  const toDisplayString = (val) => {
    return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef$1(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
  };
  const replacer = (_key, val) => {
    if (isRef$1(val)) {
      return replacer(_key, val.value);
    } else if (isMap(val)) {
      return {
        [`Map(${val.size})`]: [...val.entries()].reduce(
          (entries, [key, val2], i) => {
            entries[stringifySymbol(key, i) + " =>"] = val2;
            return entries;
          },
          {}
        )
      };
    } else if (isSet(val)) {
      return {
        [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
      };
    } else if (isSymbol(val)) {
      return stringifySymbol(val);
    } else if (isObject(val) && !isArray(val) && !isPlainObject$1(val)) {
      return String(val);
    }
    return val;
  };
  const stringifySymbol = (v, i = "") => {
    var _a;
    return (
      // Symbol.description in es2019+ so we need to cast here to pass
      // the lib: es2016 check
      isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v
    );
  };
  /**
  * @vue/reactivity v3.5.43
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  let activeEffectScope;
  class EffectScope {
    // TODO isolatedDeclarations "__v_skip"
    constructor(detached = false) {
      this.detached = detached;
      this._active = true;
      this._on = 0;
      this.effects = [];
      this.cleanups = [];
      this._isPaused = false;
      this._warnOnRun = true;
      this.__v_skip = true;
      if (!detached && activeEffectScope) {
        if (activeEffectScope.active) {
          this.parent = activeEffectScope;
          this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
            this
          ) - 1;
        } else {
          this._active = false;
          this._warnOnRun = false;
        }
      }
    }
    get active() {
      return this._active;
    }
    pause() {
      if (this._active) {
        this._isPaused = true;
        let i, l;
        if (this.scopes) {
          const scopes = this.scopes.slice();
          for (i = 0, l = scopes.length; i < l; i++) {
            scopes[i].pause();
          }
        }
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].pause();
        }
      }
    }
    /**
     * Resumes the effect scope, including all child scopes and effects.
     */
    resume() {
      if (this._active) {
        if (this._isPaused) {
          this._isPaused = false;
          let i, l;
          if (this.scopes) {
            const scopes = this.scopes.slice();
            for (i = 0, l = scopes.length; i < l; i++) {
              scopes[i].resume();
            }
          }
          const effects = this.effects.slice();
          for (i = 0, l = effects.length; i < l; i++) {
            effects[i].resume();
          }
        }
      }
    }
    run(fn) {
      if (this._active) {
        const currentEffectScope = activeEffectScope;
        try {
          activeEffectScope = this;
          return fn();
        } finally {
          activeEffectScope = currentEffectScope;
        }
      }
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    on() {
      if (++this._on === 1) {
        this.prevScope = activeEffectScope;
        activeEffectScope = this;
      }
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    off() {
      if (this._on > 0 && --this._on === 0) {
        if (activeEffectScope === this) {
          activeEffectScope = this.prevScope;
        } else {
          let current = activeEffectScope;
          while (current) {
            if (current.prevScope === this) {
              current.prevScope = this.prevScope;
              break;
            }
            current = current.prevScope;
          }
        }
        this.prevScope = void 0;
      }
    }
    stop(fromParent) {
      if (this._active) {
        this._active = false;
        let i, l;
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].stop();
        }
        this.effects.length = 0;
        for (i = 0, l = this.cleanups.length; i < l; i++) {
          this.cleanups[i]();
        }
        this.cleanups.length = 0;
        if (this.scopes) {
          const scopes = this.scopes.slice();
          for (i = 0, l = scopes.length; i < l; i++) {
            scopes[i].stop(true);
          }
          this.scopes.length = 0;
        }
        if (!this.detached && this.parent && !fromParent) {
          const last = this.parent.scopes.pop();
          if (last && last !== this) {
            this.parent.scopes[this.index] = last;
            last.index = this.index;
          }
        }
        this.parent = void 0;
      }
    }
  }
  function effectScope(detached) {
    return new EffectScope(detached);
  }
  function getCurrentScope() {
    return activeEffectScope;
  }
  function onScopeDispose(fn, failSilently = false) {
    if (activeEffectScope) {
      activeEffectScope.cleanups.push(fn);
    }
  }
  let activeSub;
  const pausedQueueEffects = /* @__PURE__ */ new WeakSet();
  class ReactiveEffect {
    constructor(fn) {
      this.fn = fn;
      this.deps = void 0;
      this.depsTail = void 0;
      this.flags = 1 | 4;
      this.next = void 0;
      this.cleanup = void 0;
      this.scheduler = void 0;
      if (activeEffectScope) {
        if (activeEffectScope.active) {
          activeEffectScope.effects.push(this);
        } else {
          this.flags &= -2;
        }
      }
    }
    pause() {
      this.flags |= 64;
    }
    resume() {
      if (this.flags & 64) {
        this.flags &= -65;
        if (pausedQueueEffects.has(this)) {
          pausedQueueEffects.delete(this);
          this.trigger();
        }
      }
    }
    /**
     * @internal
     */
    notify() {
      if (this.flags & 2 && !(this.flags & 32)) {
        return;
      }
      if (!(this.flags & 8)) {
        batch(this);
      }
    }
    run() {
      if (!(this.flags & 1)) {
        return this.fn();
      }
      this.flags |= 2;
      cleanupEffect(this);
      prepareDeps(this);
      const prevEffect = activeSub;
      const prevShouldTrack = shouldTrack;
      activeSub = this;
      shouldTrack = true;
      try {
        return this.fn();
      } finally {
        cleanupDeps(this);
        activeSub = prevEffect;
        shouldTrack = prevShouldTrack;
        this.flags &= -3;
      }
    }
    stop() {
      if (this.flags & 1) {
        for (let link = this.deps; link; link = link.nextDep) {
          removeSub(link);
        }
        this.deps = this.depsTail = void 0;
        cleanupEffect(this);
        this.onStop && this.onStop();
        this.flags &= -2;
      }
    }
    trigger() {
      if (this.flags & 64) {
        pausedQueueEffects.add(this);
      } else if (this.scheduler) {
        this.scheduler();
      } else {
        this.runIfDirty();
      }
    }
    /**
     * @internal
     */
    runIfDirty() {
      if (isDirty(this)) {
        this.run();
      }
    }
    get dirty() {
      return isDirty(this);
    }
  }
  let batchDepth = 0;
  let batchedSub;
  let batchedComputed;
  function batch(sub, isComputed2 = false) {
    sub.flags |= 8;
    if (isComputed2) {
      sub.next = batchedComputed;
      batchedComputed = sub;
      return;
    }
    sub.next = batchedSub;
    batchedSub = sub;
  }
  function startBatch() {
    batchDepth++;
  }
  function endBatch() {
    if (--batchDepth > 0) {
      return;
    }
    if (batchedComputed) {
      let e = batchedComputed;
      batchedComputed = void 0;
      while (e) {
        const next = e.next;
        e.next = void 0;
        e.flags &= -9;
        e = next;
      }
    }
    let error;
    while (batchedSub) {
      let e = batchedSub;
      batchedSub = void 0;
      while (e) {
        const next = e.next;
        e.next = void 0;
        e.flags &= -9;
        if (e.flags & 1) {
          try {
            ;
            e.trigger();
          } catch (err) {
            if (!error) error = err;
          }
        }
        e = next;
      }
    }
    if (error) throw error;
  }
  function prepareDeps(sub) {
    for (let link = sub.deps; link; link = link.nextDep) {
      link.version = -1;
      link.prevActiveLink = link.dep.activeLink;
      link.dep.activeLink = link;
    }
  }
  function cleanupDeps(sub) {
    let head;
    let tail = sub.depsTail;
    let link = tail;
    while (link) {
      const prev = link.prevDep;
      if (link.version === -1) {
        if (link === tail) tail = prev;
        removeSub(link);
        removeDep(link);
      } else {
        head = link;
      }
      link.dep.activeLink = link.prevActiveLink;
      link.prevActiveLink = void 0;
      link = prev;
    }
    sub.deps = head;
    sub.depsTail = tail;
  }
  function isDirty(sub) {
    for (let link = sub.deps; link; link = link.nextDep) {
      if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
        return true;
      }
    }
    if (sub._dirty) {
      return true;
    }
    return false;
  }
  function refreshComputed(computed2) {
    if (computed2.flags & 4 && !(computed2.flags & 16)) {
      return;
    }
    computed2.flags &= -17;
    if (computed2.globalVersion === globalVersion) {
      return;
    }
    computed2.globalVersion = globalVersion;
    if (!computed2.isSSR && computed2.flags & 128 && (!computed2.deps && !computed2._dirty || !isDirty(computed2))) {
      return;
    }
    computed2.flags |= 2;
    const dep = computed2.dep;
    const prevSub = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = computed2;
    shouldTrack = true;
    try {
      prepareDeps(computed2);
      const value = computed2.fn(computed2._value);
      if (dep.version === 0 || hasChanged(value, computed2._value)) {
        computed2.flags |= 128;
        computed2._value = value;
        dep.version++;
      }
    } catch (err) {
      dep.version++;
      throw err;
    } finally {
      activeSub = prevSub;
      shouldTrack = prevShouldTrack;
      cleanupDeps(computed2);
      computed2.flags &= -3;
    }
  }
  function removeSub(link, soft = false) {
    const { dep, prevSub, nextSub } = link;
    if (prevSub) {
      prevSub.nextSub = nextSub;
      link.prevSub = void 0;
    }
    if (nextSub) {
      nextSub.prevSub = prevSub;
      link.nextSub = void 0;
    }
    if (dep.subs === link) {
      dep.subs = prevSub;
      if (!prevSub && dep.computed) {
        dep.computed.flags &= -5;
        for (let l = dep.computed.deps; l; l = l.nextDep) {
          removeSub(l, true);
        }
      }
    }
    if (!soft && !--dep.sc && dep.map) {
      dep.map.delete(dep.key);
    }
  }
  function removeDep(link) {
    const { prevDep, nextDep } = link;
    if (prevDep) {
      prevDep.nextDep = nextDep;
      link.prevDep = void 0;
    }
    if (nextDep) {
      nextDep.prevDep = prevDep;
      link.nextDep = void 0;
    }
  }
  let shouldTrack = true;
  const trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  function cleanupEffect(e) {
    const { cleanup } = e;
    e.cleanup = void 0;
    if (cleanup) {
      const prevSub = activeSub;
      activeSub = void 0;
      try {
        cleanup();
      } finally {
        activeSub = prevSub;
      }
    }
  }
  let globalVersion = 0;
  class Link {
    constructor(sub, dep) {
      this.sub = sub;
      this.dep = dep;
      this.version = dep.version;
      this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
    }
  }
  class Dep {
    // TODO isolatedDeclarations "__v_skip"
    constructor(computed2) {
      this.computed = computed2;
      this.version = 0;
      this.activeLink = void 0;
      this.subs = void 0;
      this.map = void 0;
      this.key = void 0;
      this.sc = 0;
      this.__v_skip = true;
    }
    track(debugInfo) {
      if (!activeSub || !shouldTrack || activeSub === this.computed) {
        return;
      }
      let link = this.activeLink;
      if (link === void 0 || link.sub !== activeSub) {
        link = this.activeLink = new Link(activeSub, this);
        if (!activeSub.deps) {
          activeSub.deps = activeSub.depsTail = link;
        } else {
          link.prevDep = activeSub.depsTail;
          activeSub.depsTail.nextDep = link;
          activeSub.depsTail = link;
        }
        addSub(link);
      } else if (link.version === -1) {
        link.version = this.version;
        if (link.nextDep) {
          const next = link.nextDep;
          next.prevDep = link.prevDep;
          if (link.prevDep) {
            link.prevDep.nextDep = next;
          }
          link.prevDep = activeSub.depsTail;
          link.nextDep = void 0;
          activeSub.depsTail.nextDep = link;
          activeSub.depsTail = link;
          if (activeSub.deps === link) {
            activeSub.deps = next;
          }
        }
      }
      return link;
    }
    trigger(debugInfo) {
      this.version++;
      globalVersion++;
      this.notify(debugInfo);
    }
    notify(debugInfo) {
      startBatch();
      try {
        if (false) ;
        for (let link = this.subs; link; link = link.prevSub) {
          if (link.sub.notify()) {
            ;
            link.sub.dep.notify();
          }
        }
      } finally {
        endBatch();
      }
    }
  }
  function addSub(link) {
    link.dep.sc++;
    if (link.sub.flags & 4) {
      const computed2 = link.dep.computed;
      if (computed2 && !link.dep.subs) {
        computed2.flags |= 4 | 16;
        for (let l = computed2.deps; l; l = l.nextDep) {
          addSub(l);
        }
      }
      const currentTail = link.dep.subs;
      if (currentTail !== link) {
        link.prevSub = currentTail;
        if (currentTail) currentTail.nextSub = link;
      }
      link.dep.subs = link;
    }
  }
  const targetMap = /* @__PURE__ */ new WeakMap();
  const ITERATE_KEY = /* @__PURE__ */ Symbol(
    ""
  );
  const MAP_KEY_ITERATE_KEY = /* @__PURE__ */ Symbol(
    ""
  );
  const ARRAY_ITERATE_KEY = /* @__PURE__ */ Symbol(
    ""
  );
  function track(target, type, key) {
    if (shouldTrack && activeSub) {
      let depsMap = targetMap.get(target);
      if (!depsMap) {
        targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
      }
      let dep = depsMap.get(key);
      if (!dep) {
        depsMap.set(key, dep = new Dep());
        dep.map = depsMap;
        dep.key = key;
      }
      {
        dep.track();
      }
    }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      globalVersion++;
      return;
    }
    const run = (dep) => {
      if (dep) {
        {
          dep.trigger();
        }
      }
    };
    startBatch();
    if (type === "clear") {
      depsMap.forEach(run);
    } else {
      const targetIsArray = isArray(target);
      const isArrayIndex = targetIsArray && isIntegerKey(key);
      if (targetIsArray && key === "length") {
        const newLength = Number(newValue);
        depsMap.forEach((dep, key2) => {
          if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
            run(dep);
          }
        });
      } else {
        if (key !== void 0 || depsMap.has(void 0)) {
          run(depsMap.get(key));
        }
        if (isArrayIndex) {
          run(depsMap.get(ARRAY_ITERATE_KEY));
        }
        switch (type) {
          case "add":
            if (!targetIsArray) {
              run(depsMap.get(ITERATE_KEY));
              if (isMap(target)) {
                run(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            } else if (isArrayIndex) {
              run(depsMap.get("length"));
            }
            break;
          case "delete":
            if (!targetIsArray) {
              run(depsMap.get(ITERATE_KEY));
              if (isMap(target)) {
                run(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            }
            break;
          case "set":
            if (isMap(target)) {
              run(depsMap.get(ITERATE_KEY));
            }
            break;
        }
      }
    }
    endBatch();
  }
  function getDepFromReactive(object, key) {
    const depMap = targetMap.get(object);
    return depMap && depMap.get(key);
  }
  function reactiveReadArray(array) {
    const raw = /* @__PURE__ */ toRaw(array);
    if (raw === array) return raw;
    track(raw, "iterate", ARRAY_ITERATE_KEY);
    if (/* @__PURE__ */ isShallow(array)) return raw;
    if (!/* @__PURE__ */ isReadonly(array)) return raw.map(toReactive);
    return /* @__PURE__ */ isReactive(array) ? raw.map((item) => toReadonly(toReactive(item))) : raw.map(toReadonly);
  }
  function shallowReadArray(arr) {
    track(arr = /* @__PURE__ */ toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
    return arr;
  }
  function toWrapped(target, item) {
    if (/* @__PURE__ */ isReadonly(target)) {
      return /* @__PURE__ */ isReactive(target) ? toReadonly(toReactive(item)) : toReadonly(item);
    }
    return toReactive(item);
  }
  const arrayInstrumentations = {
    __proto__: null,
    [Symbol.iterator]() {
      return iterator(this, Symbol.iterator, (item) => toWrapped(this, item));
    },
    concat(...args) {
      return reactiveReadArray(this).concat(
        ...args.map((x) => isArray(x) ? reactiveReadArray(x) : x)
      );
    },
    entries() {
      return iterator(this, "entries", (value) => {
        value[1] = toWrapped(this, value[1]);
        return value;
      });
    },
    every(fn, thisArg) {
      return apply(this, "every", fn, thisArg, void 0, arguments);
    },
    filter(fn, thisArg) {
      return apply(
        this,
        "filter",
        fn,
        thisArg,
        (v) => v.map((item) => toWrapped(this, item)),
        arguments
      );
    },
    find(fn, thisArg) {
      return apply(
        this,
        "find",
        fn,
        thisArg,
        (item) => toWrapped(this, item),
        arguments
      );
    },
    findIndex(fn, thisArg) {
      return apply(this, "findIndex", fn, thisArg, void 0, arguments);
    },
    findLast(fn, thisArg) {
      return apply(
        this,
        "findLast",
        fn,
        thisArg,
        (item) => toWrapped(this, item),
        arguments
      );
    },
    findLastIndex(fn, thisArg) {
      return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
    },
    // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
    forEach(fn, thisArg) {
      return apply(this, "forEach", fn, thisArg, void 0, arguments);
    },
    includes(...args) {
      return searchProxy(this, "includes", args);
    },
    indexOf(...args) {
      return searchProxy(this, "indexOf", args);
    },
    join(separator) {
      return reactiveReadArray(this).join(separator);
    },
    // keys() iterator only reads `length`, no optimization required
    lastIndexOf(...args) {
      return searchProxy(this, "lastIndexOf", args);
    },
    map(fn, thisArg) {
      return apply(this, "map", fn, thisArg, void 0, arguments);
    },
    pop() {
      return noTracking(this, "pop");
    },
    push(...args) {
      return noTracking(this, "push", args);
    },
    reduce(fn, ...args) {
      return reduce(this, "reduce", fn, args);
    },
    reduceRight(fn, ...args) {
      return reduce(this, "reduceRight", fn, args);
    },
    shift() {
      return noTracking(this, "shift");
    },
    // slice could use ARRAY_ITERATE but also seems to beg for range tracking
    some(fn, thisArg) {
      return apply(this, "some", fn, thisArg, void 0, arguments);
    },
    splice(...args) {
      return noTracking(this, "splice", args);
    },
    toReversed() {
      return reactiveReadArray(this).toReversed();
    },
    toSorted(comparer) {
      return reactiveReadArray(this).toSorted(comparer);
    },
    toSpliced(...args) {
      return reactiveReadArray(this).toSpliced(...args);
    },
    unshift(...args) {
      return noTracking(this, "unshift", args);
    },
    values() {
      return iterator(this, "values", (item) => toWrapped(this, item));
    }
  };
  function iterator(self2, method, wrapValue) {
    const arr = shallowReadArray(self2);
    const iter = arr[method]();
    if (arr !== self2 && !/* @__PURE__ */ isShallow(self2)) {
      iter._next = iter.next;
      iter.next = () => {
        const result = iter._next();
        if (!result.done) {
          result.value = wrapValue(result.value);
        }
        return result;
      };
    }
    return iter;
  }
  const arrayProto = Array.prototype;
  function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
    const arr = shallowReadArray(self2);
    const needsWrap = arr !== self2 && !/* @__PURE__ */ isShallow(self2);
    const methodFn = arr[method];
    if (methodFn !== arrayProto[method]) {
      const result2 = methodFn.apply(self2, args);
      return needsWrap ? toReactive(result2) : result2;
    }
    let wrappedFn = fn;
    if (arr !== self2) {
      if (needsWrap) {
        wrappedFn = function(item, index) {
          return fn.call(this, toWrapped(self2, item), index, self2);
        };
      } else if (fn.length > 2) {
        wrappedFn = function(item, index) {
          return fn.call(this, item, index, self2);
        };
      }
    }
    const result = methodFn.call(arr, wrappedFn, thisArg);
    return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
  }
  function reduce(self2, method, fn, args) {
    const arr = shallowReadArray(self2);
    const needsWrap = arr !== self2 && !/* @__PURE__ */ isShallow(self2);
    let wrappedFn = fn;
    let wrapInitialAccumulator = false;
    if (arr !== self2) {
      if (needsWrap) {
        wrapInitialAccumulator = args.length === 0;
        wrappedFn = function(acc, item, index) {
          if (wrapInitialAccumulator) {
            wrapInitialAccumulator = false;
            acc = toWrapped(self2, acc);
          }
          return fn.call(this, acc, toWrapped(self2, item), index, self2);
        };
      } else if (fn.length > 3) {
        wrappedFn = function(acc, item, index) {
          return fn.call(this, acc, item, index, self2);
        };
      }
    }
    const result = arr[method](wrappedFn, ...args);
    return wrapInitialAccumulator ? toWrapped(self2, result) : result;
  }
  function searchProxy(self2, method, args) {
    const arr = /* @__PURE__ */ toRaw(self2);
    track(arr, "iterate", ARRAY_ITERATE_KEY);
    const res = arr[method](...args);
    if ((res === -1 || res === false) && /* @__PURE__ */ isProxy(args[0])) {
      args[0] = /* @__PURE__ */ toRaw(args[0]);
      return arr[method](...args);
    }
    return res;
  }
  function noTracking(self2, method, args = []) {
    pauseTracking();
    startBatch();
    const res = (/* @__PURE__ */ toRaw(self2))[method].apply(self2, args);
    endBatch();
    resetTracking();
    return res;
  }
  const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
  const builtInSymbols = new Set(
    /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
  );
  function hasOwnProperty(key) {
    if (!isSymbol(key)) key = String(key);
    const obj = /* @__PURE__ */ toRaw(this);
    track(obj, "has", key);
    return obj.hasOwnProperty(key);
  }
  class BaseReactiveHandler {
    constructor(_isReadonly = false, _isShallow = false) {
      this._isReadonly = _isReadonly;
      this._isShallow = _isShallow;
    }
    get(target, key, receiver) {
      if (key === "__v_skip") return target["__v_skip"];
      const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_isShallow") {
        return isShallow2;
      } else if (key === "__v_raw") {
        if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
        // this means the receiver is a user proxy of the reactive proxy
        Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
          return target;
        }
        return;
      }
      const targetIsArray = isArray(target);
      if (!isReadonly2) {
        let fn;
        if (targetIsArray && (fn = arrayInstrumentations[key])) {
          return fn;
        }
        if (key === "hasOwnProperty") {
          return hasOwnProperty;
        }
      }
      const res = Reflect.get(
        target,
        key,
        // if this is a proxy wrapping a ref, return methods using the raw ref
        // as receiver so that we don't have to call `toRaw` on the ref in all
        // its class methods
        /* @__PURE__ */ isRef(target) ? target : receiver
      );
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly2) {
        track(target, "get", key);
      }
      if (isShallow2) {
        return res;
      }
      if (/* @__PURE__ */ isRef(res)) {
        const value = targetIsArray && isIntegerKey(key) ? res : res.value;
        return isReadonly2 && isObject(value) ? /* @__PURE__ */ readonly(value) : value;
      }
      if (isObject(res)) {
        return isReadonly2 ? /* @__PURE__ */ readonly(res) : /* @__PURE__ */ reactive(res);
      }
      return res;
    }
  }
  class MutableReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = false) {
      super(false, isShallow2);
    }
    set(target, key, value, receiver) {
      let oldValue = target[key];
      const isArrayWithIntegerKey = isArray(target) && isIntegerKey(key);
      if (!this._isShallow) {
        const isOldValueReadonly = /* @__PURE__ */ isReadonly(oldValue);
        if (!/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
          oldValue = /* @__PURE__ */ toRaw(oldValue);
          value = /* @__PURE__ */ toRaw(value);
        }
        if (!isArrayWithIntegerKey && /* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
          if (isOldValueReadonly) {
            return true;
          } else {
            oldValue.value = value;
            return true;
          }
        }
      }
      const hadKey = isArrayWithIntegerKey ? Number(key) < target.length : hasOwn(target, key);
      const result = Reflect.set(
        target,
        key,
        value,
        /* @__PURE__ */ isRef(target) ? target : receiver
      );
      if (target === /* @__PURE__ */ toRaw(receiver) && result) {
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value);
        }
      }
      return result;
    }
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key);
      target[key];
      const result = Reflect.deleteProperty(target, key);
      if (result && hadKey) {
        trigger(target, "delete", key, void 0);
      }
      return result;
    }
    has(target, key) {
      const result = Reflect.has(target, key);
      if (!isSymbol(key) || !builtInSymbols.has(key)) {
        track(target, "has", key);
      }
      return result;
    }
    ownKeys(target) {
      track(
        target,
        "iterate",
        isArray(target) ? "length" : ITERATE_KEY
      );
      return Reflect.ownKeys(target);
    }
  }
  class ReadonlyReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = false) {
      super(true, isShallow2);
    }
    set(target, key) {
      return true;
    }
    deleteProperty(target, key) {
      return true;
    }
  }
  const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
  const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
  const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
  const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
  const toShallow = (value) => value;
  const getProto = (v) => Reflect.getPrototypeOf(v);
  function createIterableMethod(method, isReadonly2, isShallow2) {
    return function(...args) {
      const target = this["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const targetIsMap = isMap(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(
        rawTarget,
        "iterate",
        isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
      );
      return extend(
        // inheriting all iterator properties
        Object.create(innerIterator),
        {
          // iterator protocol
          next() {
            const { value, done } = innerIterator.next();
            return done ? { value, done } : {
              value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
              done
            };
          }
        }
      );
    };
  }
  function createReadonlyMethod(type) {
    return function(...args) {
      return type === "delete" ? false : type === "clear" ? void 0 : this;
    };
  }
  function createInstrumentations(readonly2, shallow) {
    const instrumentations = {
      get(key) {
        const target = this["__v_raw"];
        const rawTarget = /* @__PURE__ */ toRaw(target);
        const rawKey = /* @__PURE__ */ toRaw(key);
        if (!readonly2) {
          if (hasChanged(key, rawKey)) {
            track(rawTarget, "get", key);
          }
          track(rawTarget, "get", rawKey);
        }
        const { has } = getProto(rawTarget);
        const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
        if (has.call(rawTarget, key)) {
          return wrap(target.get(key));
        } else if (has.call(rawTarget, rawKey)) {
          return wrap(target.get(rawKey));
        } else if (target !== rawTarget) {
          target.get(key);
        }
      },
      get size() {
        const target = this["__v_raw"];
        !readonly2 && track(/* @__PURE__ */ toRaw(target), "iterate", ITERATE_KEY);
        return target.size;
      },
      has(key) {
        const target = this["__v_raw"];
        const rawTarget = /* @__PURE__ */ toRaw(target);
        const rawKey = /* @__PURE__ */ toRaw(key);
        if (!readonly2) {
          if (hasChanged(key, rawKey)) {
            track(rawTarget, "has", key);
          }
          track(rawTarget, "has", rawKey);
        }
        return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
      },
      forEach(callback, thisArg) {
        const observed = this;
        const target = observed["__v_raw"];
        const rawTarget = /* @__PURE__ */ toRaw(target);
        const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
        !readonly2 && track(rawTarget, "iterate", ITERATE_KEY);
        return target.forEach((value, key) => {
          return callback.call(thisArg, wrap(value), wrap(key), observed);
        });
      }
    };
    extend(
      instrumentations,
      readonly2 ? {
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear")
      } : {
        add(value) {
          const target = /* @__PURE__ */ toRaw(this);
          const proto = getProto(target);
          const rawValue = /* @__PURE__ */ toRaw(value);
          const valueToAdd = !shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value) ? rawValue : value;
          const hadKey = proto.has.call(target, valueToAdd) || hasChanged(value, valueToAdd) && proto.has.call(target, value) || hasChanged(rawValue, valueToAdd) && proto.has.call(target, rawValue);
          if (!hadKey) {
            target.add(valueToAdd);
            trigger(target, "add", valueToAdd, valueToAdd);
          }
          return this;
        },
        set(key, value) {
          if (!shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
            value = /* @__PURE__ */ toRaw(value);
          }
          const target = /* @__PURE__ */ toRaw(this);
          const { has, get } = getProto(target);
          let hadKey = has.call(target, key);
          if (!hadKey) {
            key = /* @__PURE__ */ toRaw(key);
            hadKey = has.call(target, key);
          }
          const oldValue = get.call(target, key);
          target.set(key, value);
          if (!hadKey) {
            trigger(target, "add", key, value);
          } else if (hasChanged(value, oldValue)) {
            trigger(target, "set", key, value);
          }
          return this;
        },
        delete(key) {
          const target = /* @__PURE__ */ toRaw(this);
          const { has, get } = getProto(target);
          let hadKey = has.call(target, key);
          if (!hadKey) {
            key = /* @__PURE__ */ toRaw(key);
            hadKey = has.call(target, key);
          }
          get ? get.call(target, key) : void 0;
          const result = target.delete(key);
          if (hadKey) {
            trigger(target, "delete", key, void 0);
          }
          return result;
        },
        clear() {
          const target = /* @__PURE__ */ toRaw(this);
          const hadItems = target.size !== 0;
          const result = target.clear();
          if (hadItems) {
            trigger(
              target,
              "clear",
              void 0,
              void 0
            );
          }
          return result;
        }
      }
    );
    const iteratorMethods = [
      "keys",
      "values",
      "entries",
      Symbol.iterator
    ];
    iteratorMethods.forEach((method) => {
      instrumentations[method] = createIterableMethod(method, readonly2, shallow);
    });
    return instrumentations;
  }
  function createInstrumentationGetter(isReadonly2, shallow) {
    const instrumentations = createInstrumentations(isReadonly2, shallow);
    return (target, key, receiver) => {
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_raw") {
        return target;
      }
      return Reflect.get(
        hasOwn(instrumentations, key) && key in target ? instrumentations : target,
        key,
        receiver
      );
    };
  }
  const mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
  };
  const shallowCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, true)
  };
  const readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, false)
  };
  const shallowReadonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, true)
  };
  const reactiveMap = /* @__PURE__ */ new WeakMap();
  const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
  const readonlyMap = /* @__PURE__ */ new WeakMap();
  const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  // @__NO_SIDE_EFFECTS__
  function reactive(target) {
    if (/* @__PURE__ */ isReadonly(target)) {
      return target;
    }
    return createReactiveObject(
      target,
      false,
      mutableHandlers,
      mutableCollectionHandlers,
      reactiveMap
    );
  }
  // @__NO_SIDE_EFFECTS__
  function shallowReactive(target) {
    return createReactiveObject(
      target,
      false,
      shallowReactiveHandlers,
      shallowCollectionHandlers,
      shallowReactiveMap
    );
  }
  // @__NO_SIDE_EFFECTS__
  function readonly(target) {
    return createReactiveObject(
      target,
      true,
      readonlyHandlers,
      readonlyCollectionHandlers,
      readonlyMap
    );
  }
  // @__NO_SIDE_EFFECTS__
  function shallowReadonly(target) {
    return createReactiveObject(
      target,
      true,
      shallowReadonlyHandlers,
      shallowReadonlyCollectionHandlers,
      shallowReadonlyMap
    );
  }
  function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
      return target;
    }
    if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
      return target;
    }
    if (target["__v_skip"] || !Object.isExtensible(target)) {
      return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    const targetType = targetTypeMap(toRawType(target));
    if (targetType === 0) {
      return target;
    }
    const proxy = new Proxy(
      target,
      targetType === 2 ? collectionHandlers : baseHandlers
    );
    proxyMap.set(target, proxy);
    return proxy;
  }
  // @__NO_SIDE_EFFECTS__
  function isReactive(value) {
    if (/* @__PURE__ */ isReadonly(value)) {
      return /* @__PURE__ */ isReactive(value["__v_raw"]);
    }
    return !!(value && value["__v_isReactive"]);
  }
  // @__NO_SIDE_EFFECTS__
  function isReadonly(value) {
    return !!(value && value["__v_isReadonly"]);
  }
  // @__NO_SIDE_EFFECTS__
  function isShallow(value) {
    return !!(value && value["__v_isShallow"]);
  }
  // @__NO_SIDE_EFFECTS__
  function isProxy(value) {
    return value ? !!value["__v_raw"] : false;
  }
  // @__NO_SIDE_EFFECTS__
  function toRaw(observed) {
    const raw = observed && observed["__v_raw"];
    return raw ? /* @__PURE__ */ toRaw(raw) : observed;
  }
  function markRaw(value) {
    if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
      def(value, "__v_skip", true);
    }
    return value;
  }
  const toReactive = (value) => isObject(value) ? /* @__PURE__ */ reactive(value) : value;
  const toReadonly = (value) => isObject(value) ? /* @__PURE__ */ readonly(value) : value;
  // @__NO_SIDE_EFFECTS__
  function isRef(r) {
    return r ? r["__v_isRef"] === true : false;
  }
  // @__NO_SIDE_EFFECTS__
  function ref(value) {
    return createRef(value, false);
  }
  function createRef(rawValue, shallow) {
    if (/* @__PURE__ */ isRef(rawValue)) {
      return rawValue;
    }
    return new RefImpl(rawValue, shallow);
  }
  class RefImpl {
    constructor(value, isShallow2) {
      this.dep = new Dep();
      this["__v_isRef"] = true;
      this["__v_isShallow"] = false;
      this._rawValue = isShallow2 ? value : /* @__PURE__ */ toRaw(value);
      this._value = isShallow2 ? value : toReactive(value);
      this["__v_isShallow"] = isShallow2;
    }
    get value() {
      {
        this.dep.track();
      }
      return this._value;
    }
    set value(newValue) {
      const oldValue = this._rawValue;
      const useDirectValue = this["__v_isShallow"] || /* @__PURE__ */ isShallow(newValue) || /* @__PURE__ */ isReadonly(newValue);
      newValue = useDirectValue ? newValue : /* @__PURE__ */ toRaw(newValue);
      if (hasChanged(newValue, oldValue)) {
        this._rawValue = newValue;
        this._value = useDirectValue ? newValue : toReactive(newValue);
        {
          this.dep.trigger();
        }
      }
    }
  }
  function unref(ref2) {
    return /* @__PURE__ */ isRef(ref2) ? ref2.value : ref2;
  }
  const shallowUnwrapHandlers = {
    get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
    set: (target, key, value, receiver) => {
      const oldValue = target[key];
      if (/* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
        oldValue.value = value;
        return true;
      } else {
        return Reflect.set(target, key, value, receiver);
      }
    }
  };
  function proxyRefs(objectWithRefs) {
    return /* @__PURE__ */ isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  // @__NO_SIDE_EFFECTS__
  function toRefs(object) {
    const ret = isArray(object) ? new Array(object.length) : {};
    for (const key in object) {
      ret[key] = propertyToRef(object, key);
    }
    return ret;
  }
  class ObjectRefImpl {
    constructor(_object, key, _defaultValue) {
      this._object = _object;
      this._defaultValue = _defaultValue;
      this["__v_isRef"] = true;
      this._value = void 0;
      this._key = isSymbol(key) ? key : String(key);
      this._raw = /* @__PURE__ */ toRaw(_object);
      let shallow = true;
      let obj = _object;
      if (!isArray(_object) || isSymbol(this._key) || !isIntegerKey(this._key)) {
        do {
          shallow = !/* @__PURE__ */ isProxy(obj) || /* @__PURE__ */ isShallow(obj);
        } while (shallow && (obj = obj["__v_raw"]));
      }
      this._shallow = shallow;
    }
    get value() {
      let val = this._object[this._key];
      if (this._shallow) {
        val = unref(val);
      }
      return this._value = val === void 0 ? this._defaultValue : val;
    }
    set value(newVal) {
      if (this._shallow && /* @__PURE__ */ isRef(this._raw[this._key])) {
        const nestedRef = this._object[this._key];
        if (/* @__PURE__ */ isRef(nestedRef)) {
          nestedRef.value = newVal;
          return;
        }
      }
      this._object[this._key] = newVal;
    }
    get dep() {
      return getDepFromReactive(this._raw, this._key);
    }
  }
  function propertyToRef(source, key, defaultValue) {
    return new ObjectRefImpl(source, key, defaultValue);
  }
  class ComputedRefImpl {
    constructor(fn, setter, isSSR) {
      this.fn = fn;
      this.setter = setter;
      this._value = void 0;
      this.dep = new Dep(this);
      this.__v_isRef = true;
      this.deps = void 0;
      this.depsTail = void 0;
      this.flags = 16;
      this.globalVersion = globalVersion - 1;
      this.next = void 0;
      this.effect = this;
      this["__v_isReadonly"] = !setter;
      this.isSSR = isSSR;
    }
    /**
     * @internal
     */
    notify() {
      this.flags |= 16;
      if (!(this.flags & 8) && // avoid infinite self recursion
      activeSub !== this) {
        batch(this, true);
        return true;
      }
    }
    get value() {
      const link = this.dep.track();
      refreshComputed(this);
      if (link) {
        link.version = this.dep.version;
      }
      return this._value;
    }
    set value(newValue) {
      if (this.setter) {
        this.setter(newValue);
      }
    }
  }
  // @__NO_SIDE_EFFECTS__
  function computed$1(getterOrOptions, debugOptions, isSSR = false) {
    let getter;
    let setter;
    if (isFunction(getterOrOptions)) {
      getter = getterOrOptions;
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    const cRef = new ComputedRefImpl(getter, setter, isSSR);
    return cRef;
  }
  const INITIAL_WATCHER_VALUE = {};
  const cleanupMap = /* @__PURE__ */ new WeakMap();
  let activeWatcher = void 0;
  function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
    if (owner) {
      let cleanups = cleanupMap.get(owner);
      if (!cleanups) cleanupMap.set(owner, cleanups = []);
      cleanups.push(cleanupFn);
    }
  }
  function watch$1(source, cb, options = EMPTY_OBJ) {
    const { immediate, deep, once, scheduler, augmentJob, call } = options;
    const reactiveGetter = (source2) => {
      if (deep) return source2;
      if (/* @__PURE__ */ isShallow(source2) || deep === false || deep === 0)
        return traverse(source2, 1);
      return traverse(source2);
    };
    let effect2;
    let getter;
    let cleanup;
    let boundCleanup;
    let forceTrigger = false;
    let isMultiSource = false;
    if (/* @__PURE__ */ isRef(source)) {
      getter = () => source.value;
      forceTrigger = /* @__PURE__ */ isShallow(source);
    } else if (/* @__PURE__ */ isReactive(source)) {
      getter = () => reactiveGetter(source);
      forceTrigger = true;
    } else if (isArray(source)) {
      isMultiSource = true;
      forceTrigger = source.some((s) => /* @__PURE__ */ isReactive(s) || /* @__PURE__ */ isShallow(s));
      getter = () => source.map((s) => {
        if (/* @__PURE__ */ isRef(s)) {
          return s.value;
        } else if (/* @__PURE__ */ isReactive(s)) {
          return reactiveGetter(s);
        } else if (isFunction(s)) {
          return call ? call(s, 2) : s();
        } else ;
      });
    } else if (isFunction(source)) {
      if (cb) {
        getter = call ? () => call(source, 2) : source;
      } else {
        getter = () => {
          if (cleanup) {
            pauseTracking();
            try {
              cleanup();
            } finally {
              resetTracking();
            }
          }
          const currentEffect = activeWatcher;
          activeWatcher = effect2;
          try {
            return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
          } finally {
            activeWatcher = currentEffect;
          }
        };
      }
    } else {
      getter = NOOP;
    }
    if (cb && deep) {
      const baseGetter = getter;
      const depth = deep === true ? Infinity : deep;
      getter = () => traverse(baseGetter(), depth);
    }
    const scope = getCurrentScope();
    const watchHandle = () => {
      effect2.stop();
      if (scope && scope.active) {
        remove(scope.effects, effect2);
      }
    };
    if (once && cb) {
      const _cb = cb;
      cb = (...args) => {
        const res = _cb(...args);
        watchHandle();
        return res;
      };
    }
    let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
    const job = (immediateFirstRun) => {
      if (!(effect2.flags & 1) || !effect2.dirty && !immediateFirstRun) {
        return;
      }
      if (cb) {
        const newValue = effect2.run();
        if (immediateFirstRun || deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
          if (cleanup) {
            cleanup();
          }
          const currentWatcher = activeWatcher;
          activeWatcher = effect2;
          try {
            const args = [
              newValue,
              // pass undefined as the old value when it's changed for the first time
              oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
              boundCleanup
            ];
            oldValue = newValue;
            call ? call(cb, 3, args) : (
              // @ts-expect-error
              cb(...args)
            );
          } finally {
            activeWatcher = currentWatcher;
          }
        }
      } else {
        effect2.run();
      }
    };
    if (augmentJob) {
      augmentJob(job);
    }
    effect2 = new ReactiveEffect(getter);
    effect2.scheduler = scheduler ? () => scheduler(job, false) : job;
    boundCleanup = (fn) => onWatcherCleanup(fn, false, effect2);
    cleanup = effect2.onStop = () => {
      const cleanups = cleanupMap.get(effect2);
      if (cleanups) {
        if (call) {
          call(cleanups, 4);
        } else {
          for (const cleanup2 of cleanups) cleanup2();
        }
        cleanupMap.delete(effect2);
      }
    };
    if (cb) {
      if (immediate) {
        job(true);
      } else {
        oldValue = effect2.run();
      }
    } else if (scheduler) {
      scheduler(job.bind(null, true), true);
    } else {
      effect2.run();
    }
    watchHandle.pause = effect2.pause.bind(effect2);
    watchHandle.resume = effect2.resume.bind(effect2);
    watchHandle.stop = watchHandle;
    return watchHandle;
  }
  function traverse(value, depth = Infinity, seen) {
    if (depth <= 0 || !isObject(value) || value["__v_skip"]) {
      return value;
    }
    seen = seen || /* @__PURE__ */ new Map();
    if ((seen.get(value) || 0) >= depth) {
      return value;
    }
    seen.set(value, depth);
    depth--;
    if (/* @__PURE__ */ isRef(value)) {
      traverse(value.value, depth, seen);
    } else if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        traverse(value[i], depth, seen);
      }
    } else if (isSet(value) || isMap(value)) {
      value.forEach((v) => {
        traverse(v, depth, seen);
      });
    } else if (isPlainObject$1(value)) {
      for (const key in value) {
        traverse(value[key], depth, seen);
      }
      for (const key of Object.getOwnPropertySymbols(value)) {
        if (Object.prototype.propertyIsEnumerable.call(value, key)) {
          traverse(value[key], depth, seen);
        }
      }
    }
    return value;
  }
  /**
  * @vue/runtime-core v3.5.43
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  const stack = [];
  let isWarning = false;
  function warn$1(msg, ...args) {
    if (isWarning) return;
    isWarning = true;
    pauseTracking();
    const instance = stack.length ? stack[stack.length - 1].component : null;
    const appWarnHandler = instance && instance.appContext.config.warnHandler;
    const trace = getComponentTrace();
    if (appWarnHandler) {
      callWithErrorHandling(
        appWarnHandler,
        instance,
        11,
        [
          // eslint-disable-next-line no-restricted-syntax
          msg + args.map((a) => {
            var _a, _b;
            return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
          }).join(""),
          instance && instance.proxy,
          trace.map(
            ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
          ).join("\n"),
          trace
        ]
      );
    } else {
      const warnArgs = [`[Vue warn]: ${msg}`, ...args];
      if (trace.length && // avoid spamming console during tests
      true) {
        warnArgs.push(`
`, ...formatTrace(trace));
      }
      console.warn(...warnArgs);
    }
    resetTracking();
    isWarning = false;
  }
  function getComponentTrace() {
    let currentVNode = stack[stack.length - 1];
    if (!currentVNode) {
      return [];
    }
    const normalizedStack = [];
    while (currentVNode) {
      const last = normalizedStack[0];
      if (last && last.vnode === currentVNode) {
        last.recurseCount++;
      } else {
        normalizedStack.push({
          vnode: currentVNode,
          recurseCount: 0
        });
      }
      const parentInstance = currentVNode.component && currentVNode.component.parent;
      currentVNode = parentInstance && parentInstance.vnode;
    }
    return normalizedStack;
  }
  function formatTrace(trace) {
    const logs = [];
    trace.forEach((entry, i) => {
      logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
    });
    return logs;
  }
  function formatTraceEntry({ vnode, recurseCount }) {
    const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
    const isRoot = vnode.component ? vnode.component.parent == null : false;
    const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
    const close = `>` + postfix;
    return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
  }
  function formatProps(props) {
    const res = [];
    const keys = Object.keys(props);
    keys.slice(0, 3).forEach((key) => {
      res.push(...formatProp(key, props[key]));
    });
    if (keys.length > 3) {
      res.push(` ...`);
    }
    return res;
  }
  function formatProp(key, value, raw) {
    if (isString(value)) {
      value = JSON.stringify(value);
      return raw ? value : [`${key}=${value}`];
    } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
      return raw ? value : [`${key}=${value}`];
    } else if (/* @__PURE__ */ isRef(value)) {
      value = formatProp(key, /* @__PURE__ */ toRaw(value.value), true);
      return raw ? value : [`${key}=Ref<`, value, `>`];
    } else if (isFunction(value)) {
      return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
    } else {
      value = /* @__PURE__ */ toRaw(value);
      return raw ? value : [`${key}=`, value];
    }
  }
  function callWithErrorHandling(fn, instance, type, args) {
    try {
      return args ? fn(...args) : fn();
    } catch (err) {
      handleError(err, instance, type);
    }
  }
  function callWithAsyncErrorHandling(fn, instance, type, args) {
    if (isFunction(fn)) {
      const res = callWithErrorHandling(fn, instance, type, args);
      if (res && isPromise(res)) {
        res.catch((err) => {
          handleError(err, instance, type);
        });
      }
      return res;
    }
    if (isArray(fn)) {
      const values = [];
      for (let i = 0; i < fn.length; i++) {
        values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
      }
      return values;
    }
  }
  function handleError(err, instance, type, throwInDev = true) {
    const contextVNode = instance ? instance.vnode : null;
    const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
    if (instance) {
      let cur = instance.parent;
      const exposedInstance = instance.proxy;
      const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
      while (cur) {
        const errorCapturedHooks = cur.ec;
        if (errorCapturedHooks) {
          for (let i = 0; i < errorCapturedHooks.length; i++) {
            if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
              return;
            }
          }
        }
        cur = cur.parent;
      }
      if (errorHandler) {
        pauseTracking();
        callWithErrorHandling(errorHandler, null, 10, [
          err,
          exposedInstance,
          errorInfo
        ]);
        resetTracking();
        return;
      }
    }
    logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
  }
  function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
    if (throwInProd) {
      throw err;
    } else {
      console.error(err);
    }
  }
  const queue = [];
  let flushIndex = -1;
  const pendingPostFlushCbs = [];
  let activePostFlushCbs = null;
  let postFlushIndex = 0;
  const resolvedPromise = /* @__PURE__ */ Promise.resolve();
  let currentFlushPromise = null;
  function nextTick(fn) {
    const p2 = currentFlushPromise || resolvedPromise;
    return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
  }
  function findInsertionIndex(id) {
    let start = flushIndex + 1;
    let end = queue.length;
    while (start < end) {
      const middle = start + end >>> 1;
      const middleJob = queue[middle];
      const middleJobId = getId(middleJob);
      if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
        start = middle + 1;
      } else {
        end = middle;
      }
    }
    return start;
  }
  function queueJob(job) {
    if (!(job.flags & 1)) {
      const jobId = getId(job);
      const lastJob = queue[queue.length - 1];
      if (!lastJob || // fast path when the job id is larger than the tail
      !(job.flags & 2) && jobId >= getId(lastJob)) {
        queue.push(job);
      } else {
        queue.splice(findInsertionIndex(jobId), 0, job);
      }
      job.flags |= 1;
      queueFlush();
    }
  }
  function queueFlush() {
    if (!currentFlushPromise) {
      currentFlushPromise = resolvedPromise.then(flushJobs);
    }
  }
  function queuePostFlushCb(cb) {
    if (!isArray(cb)) {
      if (activePostFlushCbs && cb.id === -1) {
        activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
      } else if (!(cb.flags & 1)) {
        pendingPostFlushCbs.push(cb);
        cb.flags |= 1;
      }
    } else {
      for (let i = 0; i < cb.length; i++) {
        pendingPostFlushCbs.push(cb[i]);
      }
    }
    queueFlush();
  }
  function flushPreFlushCbs(instance, seen, i = flushIndex + 1) {
    for (; i < queue.length; i++) {
      const cb = queue[i];
      if (cb && cb.flags & 2) {
        if (instance && cb.id !== instance.uid) {
          continue;
        }
        queue.splice(i, 1);
        i--;
        if (cb.flags & 4) {
          cb.flags &= -2;
        }
        cb();
        if (!(cb.flags & 4)) {
          cb.flags &= -2;
        }
      }
    }
  }
  function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
      const deduped = [...new Set(pendingPostFlushCbs)].sort(
        (a, b) => getId(a) - getId(b)
      );
      pendingPostFlushCbs.length = 0;
      if (activePostFlushCbs) {
        for (let i = 0; i < deduped.length; i++) {
          activePostFlushCbs.push(deduped[i]);
        }
        return;
      }
      activePostFlushCbs = deduped;
      for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
        const cb = activePostFlushCbs[postFlushIndex];
        if (cb.flags & 4) {
          cb.flags &= -2;
        }
        if (!(cb.flags & 8)) cb();
        cb.flags &= -2;
      }
      activePostFlushCbs = null;
      postFlushIndex = 0;
    }
  }
  const getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
  function flushJobs(seen) {
    try {
      for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        if (job && !(job.flags & 8)) {
          if (false) ;
          if (job.flags & 4) {
            job.flags &= ~1;
          }
          callWithErrorHandling(
            job,
            job.i,
            job.i ? 15 : 14
          );
          if (!(job.flags & 4)) {
            job.flags &= ~1;
          }
        }
      }
    } finally {
      for (; flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        if (job) {
          job.flags &= -2;
        }
      }
      flushIndex = -1;
      queue.length = 0;
      flushPostFlushCbs();
      currentFlushPromise = null;
      if (queue.length || pendingPostFlushCbs.length) {
        flushJobs();
      }
    }
  }
  let currentRenderingInstance = null;
  let currentScopeId = null;
  function setCurrentRenderingInstance(instance) {
    const prev = currentRenderingInstance;
    currentRenderingInstance = instance;
    currentScopeId = instance && instance.type.__scopeId || null;
    return prev;
  }
  function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
    if (!ctx) return fn;
    if (fn._n) {
      return fn;
    }
    const renderFnWithContext = (...args) => {
      if (renderFnWithContext._d) {
        setBlockTracking(-1);
      }
      const prevInstance = setCurrentRenderingInstance(ctx);
      const prevStackSize = blockStack.length;
      let res;
      try {
        res = fn(...args);
      } finally {
        for (let i = blockStack.length; i > prevStackSize; i--) closeBlock();
        setCurrentRenderingInstance(prevInstance);
        if (renderFnWithContext._d) {
          setBlockTracking(1);
        }
      }
      return res;
    };
    renderFnWithContext._n = true;
    renderFnWithContext._c = true;
    renderFnWithContext._d = true;
    return renderFnWithContext;
  }
  function withDirectives(vnode, directives) {
    if (currentRenderingInstance === null) {
      return vnode;
    }
    const instance = getComponentPublicInstance(currentRenderingInstance);
    const bindings = vnode.dirs || (vnode.dirs = []);
    for (let i = 0; i < directives.length; i++) {
      let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
      if (dir) {
        if (isFunction(dir)) {
          dir = {
            mounted: dir,
            updated: dir
          };
        }
        if (dir.deep) {
          traverse(value);
        }
        bindings.push({
          dir,
          instance,
          value,
          oldValue: void 0,
          arg,
          modifiers
        });
      }
    }
    return vnode;
  }
  function invokeDirectiveHook(vnode, prevVNode, instance, name) {
    const bindings = vnode.dirs;
    const oldBindings = prevVNode && prevVNode.dirs;
    for (let i = 0; i < bindings.length; i++) {
      const binding = bindings[i];
      if (oldBindings) {
        binding.oldValue = oldBindings[i].value;
      }
      let hook = binding.dir[name];
      if (hook) {
        pauseTracking();
        callWithAsyncErrorHandling(hook, instance, 8, [
          vnode.el,
          binding,
          vnode,
          prevVNode
        ]);
        resetTracking();
      }
    }
  }
  function provide(key, value) {
    if (currentInstance) {
      let provides = currentInstance.provides;
      const parentProvides = currentInstance.parent && currentInstance.parent.provides;
      if (parentProvides === provides) {
        provides = currentInstance.provides = Object.create(parentProvides);
      }
      provides[key] = value;
    }
  }
  function inject(key, defaultValue, treatDefaultAsFactory = false) {
    const instance = getCurrentInstance();
    if (instance || currentApp) {
      let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
      if (provides && key in provides) {
        return provides[key];
      } else if (arguments.length > 1) {
        return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
      } else ;
    }
  }
  function hasInjectionContext() {
    return !!(getCurrentInstance() || currentApp);
  }
  const ssrContextKey = /* @__PURE__ */ Symbol.for("v-scx");
  const useSSRContext = () => {
    {
      const ctx = inject(ssrContextKey);
      return ctx;
    }
  };
  function watch(source, cb, options) {
    return doWatch(source, cb, options);
  }
  function doWatch(source, cb, options = EMPTY_OBJ) {
    const { immediate, deep, flush, once } = options;
    const baseWatchOptions = extend({}, options);
    const runsImmediately = cb && immediate || !cb && flush !== "post";
    let ssrCleanup;
    if (isInSSRComponentSetup) {
      if (flush === "sync") {
        const ctx = useSSRContext();
        ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
      } else if (!runsImmediately) {
        const watchStopHandle = () => {
        };
        watchStopHandle.stop = NOOP;
        watchStopHandle.resume = NOOP;
        watchStopHandle.pause = NOOP;
        return watchStopHandle;
      }
    }
    const instance = currentInstance;
    baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
    let isPre = false;
    if (flush === "post") {
      baseWatchOptions.scheduler = (job) => {
        queuePostRenderEffect(job, instance && instance.suspense);
      };
    } else if (flush !== "sync") {
      isPre = true;
      baseWatchOptions.scheduler = (job, isFirstRun) => {
        if (isFirstRun) {
          job();
        } else {
          queueJob(job);
        }
      };
    }
    baseWatchOptions.augmentJob = (job) => {
      if (cb) {
        job.flags |= 4;
      }
      if (isPre) {
        job.flags |= 2;
        if (instance) {
          job.id = instance.uid;
          job.i = instance;
        }
      }
    };
    const watchHandle = watch$1(source, cb, baseWatchOptions);
    if (isInSSRComponentSetup) {
      if (ssrCleanup) {
        ssrCleanup.push(watchHandle);
      } else if (runsImmediately) {
        watchHandle();
      }
    }
    return watchHandle;
  }
  function instanceWatch(source, value, options) {
    const publicThis = this.proxy;
    const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
    let cb;
    if (isFunction(value)) {
      cb = value;
    } else {
      cb = value.handler;
      options = value;
    }
    const reset = setCurrentInstance(this);
    const res = doWatch(getter, cb.bind(publicThis), options);
    reset();
    return res;
  }
  function createPathGetter(ctx, path) {
    const segments = path.split(".");
    return () => {
      let cur = ctx;
      for (let i = 0; i < segments.length && cur; i++) {
        cur = cur[segments[i]];
      }
      return cur;
    };
  }
  const TeleportEndKey = /* @__PURE__ */ Symbol("_vte");
  const isTeleport = (type) => type.__isTeleport;
  const leaveCbKey = /* @__PURE__ */ Symbol("_leaveCb");
  function findNonCommentChild(children) {
    let child = children[0];
    if (children.length > 1) {
      for (const c of children) {
        if (c.type !== Comment) {
          child = c;
          break;
        }
      }
    }
    return child;
  }
  function getInnerChild$1(vnode) {
    if (!isKeepAlive(vnode)) {
      if (isTeleport(vnode.type) && vnode.children) {
        return findNonCommentChild(vnode.children);
      }
      return vnode;
    }
    if (vnode.component) {
      return vnode.component.subTree;
    }
    const { shapeFlag, children } = vnode;
    if (children) {
      if (shapeFlag & 16) {
        return children[0];
      }
      if (shapeFlag & 32 && isFunction(children.default)) {
        return children.default();
      }
    }
  }
  function setTransitionHooks(vnode, hooks) {
    if (vnode.shapeFlag & 6 && vnode.component) {
      vnode.transition = hooks;
      const subTree = vnode.component.subTree;
      setTransitionHooks(
        isTeleport(subTree.type) ? getInnerChild$1(subTree) || subTree : subTree,
        hooks
      );
    } else if (vnode.shapeFlag & 128) {
      vnode.ssContent.transition = hooks.clone(vnode.ssContent);
      vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
    } else {
      vnode.transition = hooks;
    }
  }
  // @__NO_SIDE_EFFECTS__
  function defineComponent(options, extraOptions) {
    return isFunction(options) ? (
      // #8236: extend call and options.name access are considered side-effects
      // by Rollup, so we have to wrap it in a pure-annotated IIFE.
      /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
    ) : options;
  }
  function markAsyncBoundary(instance) {
    instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
  }
  function isTemplateRefKey(refs, key) {
    let desc;
    return !!((desc = Object.getOwnPropertyDescriptor(refs, key)) && !desc.configurable);
  }
  const pendingSetRefMap = /* @__PURE__ */ new WeakMap();
  function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
    if (isArray(rawRef)) {
      rawRef.forEach(
        (r, i) => setRef(
          r,
          oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef),
          parentSuspense,
          vnode,
          isUnmount
        )
      );
      return;
    }
    if (isAsyncWrapper(vnode) && !isUnmount) {
      if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
        setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
      }
      return;
    }
    const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
    const value = isUnmount ? null : refValue;
    const { i: owner, r: ref3 } = rawRef;
    const oldRef = oldRawRef && oldRawRef.r;
    const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
    const setupState = owner.setupState;
    const rawSetupState = /* @__PURE__ */ toRaw(setupState);
    const canSetSetupRef = setupState === EMPTY_OBJ ? NO : (key) => {
      if (isTemplateRefKey(refs, key)) {
        return false;
      }
      return hasOwn(rawSetupState, key);
    };
    const canSetRef = (ref22, key) => {
      if (key && isTemplateRefKey(refs, key)) {
        return false;
      }
      return true;
    };
    if (oldRef != null && oldRef !== ref3) {
      invalidatePendingSetRef(oldRawRef);
      if (isString(oldRef)) {
        refs[oldRef] = null;
        if (canSetSetupRef(oldRef)) {
          setupState[oldRef] = null;
        }
      } else if (/* @__PURE__ */ isRef(oldRef)) {
        const oldRawRefAtom = oldRawRef;
        if (canSetRef(oldRef, oldRawRefAtom.k)) {
          oldRef.value = null;
        }
        if (oldRawRefAtom.k) refs[oldRawRefAtom.k] = null;
      }
    }
    if (isFunction(ref3)) {
      callWithErrorHandling(ref3, owner, 12, [value, refs]);
    } else {
      const _isString = isString(ref3);
      const _isRef = /* @__PURE__ */ isRef(ref3);
      if (_isString || _isRef) {
        const doSet = () => {
          if (rawRef.f) {
            const existing = _isString ? canSetSetupRef(ref3) ? setupState[ref3] : refs[ref3] : canSetRef() || !rawRef.k ? ref3.value : refs[rawRef.k];
            if (isUnmount) {
              isArray(existing) && remove(existing, refValue);
            } else {
              if (!isArray(existing)) {
                if (_isString) {
                  refs[ref3] = [refValue];
                  if (canSetSetupRef(ref3)) {
                    setupState[ref3] = refs[ref3];
                  }
                } else {
                  const newVal = [refValue];
                  if (canSetRef(ref3, rawRef.k)) {
                    ref3.value = newVal;
                  }
                  if (rawRef.k) refs[rawRef.k] = newVal;
                }
              } else if (!existing.includes(refValue)) {
                existing.push(refValue);
              }
            }
          } else if (_isString) {
            refs[ref3] = value;
            if (canSetSetupRef(ref3)) {
              setupState[ref3] = value;
            }
          } else if (_isRef) {
            if (canSetRef(ref3, rawRef.k)) {
              ref3.value = value;
            }
            if (rawRef.k) refs[rawRef.k] = value;
          } else ;
        };
        if (value) {
          const job = () => {
            doSet();
            pendingSetRefMap.delete(rawRef);
          };
          job.id = -1;
          pendingSetRefMap.set(rawRef, job);
          queuePostRenderEffect(job, parentSuspense);
        } else {
          invalidatePendingSetRef(rawRef);
          doSet();
        }
      }
    }
  }
  function invalidatePendingSetRef(rawRef) {
    const pendingSetRef = pendingSetRefMap.get(rawRef);
    if (pendingSetRef) {
      pendingSetRef.flags |= 8;
      pendingSetRefMap.delete(rawRef);
    }
  }
  getGlobalThis().requestIdleCallback || ((cb) => setTimeout(cb, 1));
  getGlobalThis().cancelIdleCallback || ((id) => clearTimeout(id));
  const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
  const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
  function onActivated(hook, target) {
    registerKeepAliveHook(hook, "a", target);
  }
  function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da", target);
  }
  function registerKeepAliveHook(hook, type, target = currentInstance) {
    const wrappedHook = hook.__wdc || (hook.__wdc = () => {
      let current = target;
      while (current) {
        if (current.isDeactivated) {
          return;
        }
        current = current.parent;
      }
      return hook();
    });
    injectHook(type, wrappedHook, target);
    if (target) {
      let current = target.parent;
      while (current && current.parent) {
        if (isKeepAlive(current.parent.vnode)) {
          injectToKeepAliveRoot(wrappedHook, type, target, current);
        }
        current = current.parent;
      }
    }
  }
  function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
    const injected2 = injectHook(
      type,
      hook,
      keepAliveRoot,
      true
      /* prepend */
    );
    onUnmounted(() => {
      remove(keepAliveRoot[type], injected2);
    }, target);
  }
  function injectHook(type, hook, target = currentInstance, prepend = false) {
    if (target) {
      const hooks = target[type] || (target[type] = []);
      const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
        pauseTracking();
        const reset = setCurrentInstance(target);
        const res = callWithAsyncErrorHandling(hook, target, type, args);
        reset();
        resetTracking();
        return res;
      });
      if (prepend) {
        hooks.unshift(wrappedHook);
      } else {
        hooks.push(wrappedHook);
      }
      return wrappedHook;
    }
  }
  const createHook = (lifecycle) => (hook, target = currentInstance) => {
    if (!isInSSRComponentSetup || lifecycle === "sp") {
      injectHook(lifecycle, (...args) => hook(...args), target);
    }
  };
  const onBeforeMount = createHook("bm");
  const onMounted = createHook("m");
  const onBeforeUpdate = createHook(
    "bu"
  );
  const onUpdated = createHook("u");
  const onBeforeUnmount = createHook(
    "bum"
  );
  const onUnmounted = createHook("um");
  const onServerPrefetch = createHook(
    "sp"
  );
  const onRenderTriggered = createHook("rtg");
  const onRenderTracked = createHook("rtc");
  function onErrorCaptured(hook, target = currentInstance) {
    injectHook("ec", hook, target);
  }
  const COMPONENTS = "components";
  function resolveComponent(name, maybeSelfReference) {
    return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
  }
  const NULL_DYNAMIC_COMPONENT = /* @__PURE__ */ Symbol.for("v-ndc");
  function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
    const instance = currentRenderingInstance || currentInstance;
    if (instance) {
      const Component = instance.type;
      {
        const selfName = getComponentName(
          Component,
          false
        );
        if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
          return Component;
        }
      }
      const res = (
        // local registration
        // check instance[type] first which is resolved for options API
        resolve(instance[type] || Component[type], name) || // global registration
        resolve(instance.appContext[type], name)
      );
      if (!res && maybeSelfReference) {
        return Component;
      }
      return res;
    }
  }
  function resolve(registry2, name) {
    return registry2 && (registry2[name] || registry2[camelize(name)] || registry2[capitalize(camelize(name))]);
  }
  function renderList(source, renderItem, cache, index) {
    let ret;
    const cached = cache;
    const sourceIsArray = isArray(source);
    if (sourceIsArray || isString(source)) {
      const sourceIsReactiveArray = sourceIsArray && /* @__PURE__ */ isReactive(source);
      let needsWrap = false;
      let isReadonlySource = false;
      if (sourceIsReactiveArray) {
        needsWrap = !/* @__PURE__ */ isShallow(source);
        isReadonlySource = /* @__PURE__ */ isReadonly(source);
        source = shallowReadArray(source);
      }
      ret = new Array(source.length);
      for (let i = 0, l = source.length; i < l; i++) {
        ret[i] = renderItem(
          needsWrap ? isReadonlySource ? toReadonly(toReactive(source[i])) : toReactive(source[i]) : source[i],
          i,
          void 0,
          cached
        );
      }
    } else if (typeof source === "number") {
      {
        ret = new Array(source);
        for (let i = 0; i < source; i++) {
          ret[i] = renderItem(i + 1, i, void 0, cached);
        }
      }
    } else if (isObject(source)) {
      if (source[Symbol.iterator]) {
        ret = Array.from(
          source,
          (item, i) => renderItem(item, i, void 0, cached)
        );
      } else {
        const keys = Object.keys(source);
        ret = new Array(keys.length);
        for (let i = 0, l = keys.length; i < l; i++) {
          const key = keys[i];
          ret[i] = renderItem(source[key], key, i, cached);
        }
      }
    } else {
      ret = [];
    }
    return ret;
  }
  const getPublicInstance = (i) => {
    if (!i) return null;
    if (isStatefulComponent(i)) return getComponentPublicInstance(i);
    return getPublicInstance(i.parent);
  };
  const publicPropertiesMap = (
    // Move PURE marker to new line to workaround compiler discarding it
    // due to type annotation
    /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
      $: (i) => i,
      $el: (i) => i.vnode.el,
      $data: (i) => i.data,
      $props: (i) => i.props,
      $attrs: (i) => i.attrs,
      $slots: (i) => i.slots,
      $refs: (i) => i.refs,
      $parent: (i) => getPublicInstance(i.parent),
      $root: (i) => getPublicInstance(i.root),
      $host: (i) => i.ce,
      $emit: (i) => i.emit,
      $options: (i) => resolveMergedOptions(i),
      $forceUpdate: (i) => i.f || (i.f = () => {
        queueJob(i.update);
      }),
      $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
      $watch: (i) => instanceWatch.bind(i)
    })
  );
  const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
  const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
      if (key === "__v_skip") {
        return true;
      }
      const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
      if (key[0] !== "$") {
        const n = accessCache[key];
        if (n !== void 0) {
          switch (n) {
            case 1:
              return setupState[key];
            case 2:
              return data[key];
            case 4:
              return ctx[key];
            case 3:
              return props[key];
          }
        } else if (hasSetupBinding(setupState, key)) {
          accessCache[key] = 1;
          return setupState[key];
        } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
          accessCache[key] = 2;
          return data[key];
        } else if (hasOwn(props, key)) {
          accessCache[key] = 3;
          return props[key];
        } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
          accessCache[key] = 4;
          return ctx[key];
        } else if (shouldCacheAccess) {
          accessCache[key] = 0;
        }
      }
      const publicGetter = publicPropertiesMap[key];
      let cssModule, globalProperties;
      if (publicGetter) {
        if (key === "$attrs") {
          track(instance.attrs, "get", "");
        }
        return publicGetter(instance);
      } else if (
        // css module (injected by vue-loader)
        (cssModule = type.__cssModules) && (cssModule = cssModule[key])
      ) {
        return cssModule;
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (
        // global properties
        globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
      ) {
        {
          return globalProperties[key];
        }
      } else ;
    },
    set({ _: instance }, key, value) {
      const { data, setupState, ctx } = instance;
      if (hasSetupBinding(setupState, key)) {
        setupState[key] = value;
        return true;
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        data[key] = value;
        return true;
      } else if (hasOwn(instance.props, key)) {
        return false;
      }
      if (key[0] === "$" && key.slice(1) in instance) {
        return false;
      } else {
        {
          ctx[key] = value;
        }
      }
      return true;
    },
    has({
      _: { data, setupState, accessCache, ctx, appContext, props, type }
    }, key) {
      let cssModules;
      return !!(accessCache[key] || data !== EMPTY_OBJ && key[0] !== "$" && hasOwn(data, key) || hasSetupBinding(setupState, key) || hasOwn(props, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key) || (cssModules = type.__cssModules) && cssModules[key]);
    },
    defineProperty(target, key, descriptor) {
      if (descriptor.get != null) {
        target._.accessCache[key] = 0;
      } else if (hasOwn(descriptor, "value")) {
        this.set(target, key, descriptor.value, null);
      }
      return Reflect.defineProperty(target, key, descriptor);
    }
  };
  function normalizePropsOrEmits(props) {
    return isArray(props) ? props.reduce(
      (normalized, p2) => (normalized[p2] = null, normalized),
      {}
    ) : props;
  }
  let shouldCacheAccess = true;
  function applyOptions(instance) {
    const options = resolveMergedOptions(instance);
    const publicThis = instance.proxy;
    const ctx = instance.ctx;
    shouldCacheAccess = false;
    if (options.beforeCreate) {
      callHook(options.beforeCreate, instance, "bc");
    }
    const {
      // state
      data: dataOptions,
      computed: computedOptions,
      methods,
      watch: watchOptions,
      provide: provideOptions,
      inject: injectOptions,
      // lifecycle
      created,
      beforeMount,
      mounted,
      beforeUpdate,
      updated,
      activated,
      deactivated,
      beforeDestroy,
      beforeUnmount,
      destroyed,
      unmounted,
      render,
      renderTracked,
      renderTriggered,
      errorCaptured,
      serverPrefetch,
      // public API
      expose,
      inheritAttrs,
      // assets
      components,
      directives,
      filters
    } = options;
    const checkDuplicateProperties = null;
    if (injectOptions) {
      resolveInjections(injectOptions, ctx, checkDuplicateProperties);
    }
    if (methods) {
      for (const key in methods) {
        const methodHandler = methods[key];
        if (isFunction(methodHandler)) {
          {
            ctx[key] = methodHandler.bind(publicThis);
          }
        }
      }
    }
    if (dataOptions) {
      const data = dataOptions.call(publicThis, publicThis);
      if (!isObject(data)) ;
      else {
        instance.data = /* @__PURE__ */ reactive(data);
      }
    }
    shouldCacheAccess = true;
    if (computedOptions) {
      for (const key in computedOptions) {
        const opt = computedOptions[key];
        const get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
        const set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
        const c = computed({
          get,
          set
        });
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => c.value,
          set: (v) => c.value = v
        });
      }
    }
    if (watchOptions) {
      for (const key in watchOptions) {
        createWatcher(watchOptions[key], ctx, publicThis, key);
      }
    }
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
    if (created) {
      callHook(created, instance, "c");
    }
    function registerLifecycleHook(register, hook) {
      if (isArray(hook)) {
        hook.forEach((_hook) => register(_hook.bind(publicThis)));
      } else if (hook) {
        register(hook.bind(publicThis));
      }
    }
    registerLifecycleHook(onBeforeMount, beforeMount);
    registerLifecycleHook(onMounted, mounted);
    registerLifecycleHook(onBeforeUpdate, beforeUpdate);
    registerLifecycleHook(onUpdated, updated);
    registerLifecycleHook(onActivated, activated);
    registerLifecycleHook(onDeactivated, deactivated);
    registerLifecycleHook(onErrorCaptured, errorCaptured);
    registerLifecycleHook(onRenderTracked, renderTracked);
    registerLifecycleHook(onRenderTriggered, renderTriggered);
    registerLifecycleHook(onBeforeUnmount, beforeUnmount);
    registerLifecycleHook(onUnmounted, unmounted);
    registerLifecycleHook(onServerPrefetch, serverPrefetch);
    if (isArray(expose)) {
      if (expose.length) {
        const exposed = instance.exposed || (instance.exposed = {});
        expose.forEach((key) => {
          Object.defineProperty(exposed, key, {
            get: () => publicThis[key],
            set: (val) => publicThis[key] = val,
            enumerable: true
          });
        });
      } else if (!instance.exposed) {
        instance.exposed = {};
      }
    }
    if (render && instance.render === NOOP) {
      instance.render = render;
    }
    if (inheritAttrs != null) {
      instance.inheritAttrs = inheritAttrs;
    }
    if (components) instance.components = components;
    if (directives) instance.directives = directives;
    if (serverPrefetch) {
      markAsyncBoundary(instance);
    }
  }
  function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
    if (isArray(injectOptions)) {
      injectOptions = normalizeInject(injectOptions);
    }
    for (const key in injectOptions) {
      const opt = injectOptions[key];
      let injected2;
      if (isObject(opt)) {
        if ("default" in opt) {
          injected2 = inject(
            opt.from || key,
            opt.default,
            true
          );
        } else {
          injected2 = inject(opt.from || key);
        }
      } else {
        injected2 = inject(opt);
      }
      if (/* @__PURE__ */ isRef(injected2)) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected2.value,
          set: (v) => injected2.value = v
        });
      } else {
        ctx[key] = injected2;
      }
    }
  }
  function callHook(hook, instance, type) {
    callWithAsyncErrorHandling(
      isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
      instance,
      type
    );
  }
  function createWatcher(raw, ctx, publicThis, key) {
    let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
    if (isString(raw)) {
      const handler = ctx[raw];
      if (isFunction(handler)) {
        {
          watch(getter, handler);
        }
      }
    } else if (isFunction(raw)) {
      {
        watch(getter, raw.bind(publicThis));
      }
    } else if (isObject(raw)) {
      if (isArray(raw)) {
        raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
      } else {
        const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
        if (isFunction(handler)) {
          watch(getter, handler, raw);
        }
      }
    } else ;
  }
  function resolveMergedOptions(instance) {
    const base2 = instance.type;
    const { mixins, extends: extendsOptions } = base2;
    const {
      mixins: globalMixins,
      optionsCache: cache,
      config: { optionMergeStrategies }
    } = instance.appContext;
    const cached = cache.get(base2);
    let resolved;
    if (cached) {
      resolved = cached;
    } else if (!globalMixins.length && !mixins && !extendsOptions) {
      {
        resolved = base2;
      }
    } else {
      resolved = {};
      if (globalMixins.length) {
        globalMixins.forEach(
          (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
        );
      }
      mergeOptions(resolved, base2, optionMergeStrategies);
    }
    if (isObject(base2)) {
      cache.set(base2, resolved);
    }
    return resolved;
  }
  function mergeOptions(to, from, strats, asMixin = false) {
    const { mixins, extends: extendsOptions } = from;
    if (extendsOptions) {
      mergeOptions(to, extendsOptions, strats, true);
    }
    if (mixins) {
      mixins.forEach(
        (m) => mergeOptions(to, m, strats, true)
      );
    }
    for (const key in from) {
      if (asMixin && key === "expose") ;
      else {
        const strat = internalOptionMergeStrats[key] || strats && strats[key];
        to[key] = strat ? strat(to[key], from[key]) : from[key];
      }
    }
    return to;
  }
  const internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeEmitsOrPropsOptions,
    emits: mergeEmitsOrPropsOptions,
    // objects
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    // lifecycle
    beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    beforeUnmount: mergeAsArray,
    destroyed: mergeAsArray,
    unmounted: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
    // assets
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    // watch
    watch: mergeWatchOptions,
    // provide / inject
    provide: mergeDataFn,
    inject: mergeInject
  };
  function mergeDataFn(to, from) {
    if (!from) {
      return to;
    }
    if (!to) {
      return from;
    }
    return function mergedDataFn() {
      return extend(
        isFunction(to) ? to.call(this, this) : to,
        isFunction(from) ? from.call(this, this) : from
      );
    };
  }
  function mergeInject(to, from) {
    return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
  }
  function normalizeInject(raw) {
    if (isArray(raw)) {
      const res = {};
      for (let i = 0; i < raw.length; i++) {
        res[raw[i]] = raw[i];
      }
      return res;
    }
    return raw;
  }
  function mergeAsArray(to, from) {
    return to ? [...new Set([].concat(to, from))] : from;
  }
  function mergeObjectOptions(to, from) {
    return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
  }
  function mergeEmitsOrPropsOptions(to, from) {
    if (to) {
      if (isArray(to) && isArray(from)) {
        return [.../* @__PURE__ */ new Set([...to, ...from])];
      }
      return extend(
        /* @__PURE__ */ Object.create(null),
        normalizePropsOrEmits(to),
        normalizePropsOrEmits(from != null ? from : {})
      );
    } else {
      return from;
    }
  }
  function mergeWatchOptions(to, from) {
    if (!to) return from;
    if (!from) return to;
    const merged = extend(/* @__PURE__ */ Object.create(null), to);
    for (const key in from) {
      merged[key] = mergeAsArray(to[key], from[key]);
    }
    return merged;
  }
  function createAppContext() {
    return {
      app: null,
      config: {
        isNativeTag: NO,
        performance: false,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {}
      },
      mixins: [],
      components: {},
      directives: {},
      provides: /* @__PURE__ */ Object.create(null),
      optionsCache: /* @__PURE__ */ new WeakMap(),
      propsCache: /* @__PURE__ */ new WeakMap(),
      emitsCache: /* @__PURE__ */ new WeakMap()
    };
  }
  let uid$1 = 0;
  function createAppAPI(render, hydrate) {
    return function createApp2(rootComponent, rootProps = null) {
      if (!isFunction(rootComponent)) {
        rootComponent = extend({}, rootComponent);
      }
      if (rootProps != null && !isObject(rootProps)) {
        rootProps = null;
      }
      const context = createAppContext();
      const installedPlugins = /* @__PURE__ */ new WeakSet();
      const pluginCleanupFns = [];
      let isMounted = false;
      const app = context.app = {
        _uid: uid$1++,
        _component: rootComponent,
        _props: rootProps,
        _container: null,
        _context: context,
        _instance: null,
        version,
        get config() {
          return context.config;
        },
        set config(v) {
        },
        use(plugin, ...options) {
          if (installedPlugins.has(plugin)) ;
          else if (plugin && isFunction(plugin.install)) {
            installedPlugins.add(plugin);
            plugin.install(app, ...options);
          } else if (isFunction(plugin)) {
            installedPlugins.add(plugin);
            plugin(app, ...options);
          } else ;
          return app;
        },
        mixin(mixin) {
          {
            if (!context.mixins.includes(mixin)) {
              context.mixins.push(mixin);
            }
          }
          return app;
        },
        component(name, component) {
          if (!component) {
            return context.components[name];
          }
          context.components[name] = component;
          return app;
        },
        directive(name, directive) {
          if (!directive) {
            return context.directives[name];
          }
          context.directives[name] = directive;
          return app;
        },
        mount(rootContainer, isHydrate, namespace) {
          if (!isMounted) {
            const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
            vnode.appContext = context;
            if (namespace === true) {
              namespace = "svg";
            } else if (namespace === false) {
              namespace = void 0;
            }
            {
              render(vnode, rootContainer, namespace);
            }
            isMounted = true;
            app._container = rootContainer;
            rootContainer.__vue_app__ = app;
            return getComponentPublicInstance(vnode.component);
          }
        },
        onUnmount(cleanupFn) {
          pluginCleanupFns.push(cleanupFn);
        },
        unmount() {
          if (isMounted) {
            callWithAsyncErrorHandling(
              pluginCleanupFns,
              app._instance,
              16
            );
            render(null, app._container);
            delete app._container.__vue_app__;
          }
        },
        provide(key, value) {
          context.provides[key] = value;
          return app;
        },
        runWithContext(fn) {
          const lastApp = currentApp;
          currentApp = app;
          try {
            return fn();
          } finally {
            currentApp = lastApp;
          }
        }
      };
      return app;
    };
  }
  let currentApp = null;
  const getModelModifiers = (props, modelName) => {
    return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
  };
  function emit(instance, event, ...rawArgs) {
    if (instance.isUnmounted) return;
    const props = instance.vnode.props || EMPTY_OBJ;
    let args = rawArgs;
    const isModelListener2 = event.startsWith("update:");
    const modifiers = isModelListener2 && getModelModifiers(props, event.slice(7));
    if (modifiers) {
      if (modifiers.trim) {
        args = rawArgs.map((a) => isString(a) ? a.trim() : a);
      }
      if (modifiers.number) {
        args = args.map(looseToNumber);
      }
    }
    let handlerName;
    let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
    props[handlerName = toHandlerKey(camelize(event))];
    if (!handler && isModelListener2) {
      handler = props[handlerName = toHandlerKey(hyphenate(event))];
    }
    if (handler) {
      callWithAsyncErrorHandling(
        handler,
        instance,
        6,
        args
      );
    }
    const onceHandler = props[handlerName + `Once`];
    if (onceHandler) {
      if (!instance.emitted) {
        instance.emitted = {};
      } else if (instance.emitted[handlerName]) {
        return;
      }
      instance.emitted[handlerName] = true;
      callWithAsyncErrorHandling(
        onceHandler,
        instance,
        6,
        args
      );
    }
  }
  const mixinEmitsCache = /* @__PURE__ */ new WeakMap();
  function normalizeEmitsOptions(comp, appContext, asMixin = false) {
    const cache = asMixin ? mixinEmitsCache : appContext.emitsCache;
    const cached = cache.get(comp);
    if (cached !== void 0) {
      return cached;
    }
    const raw = comp.emits;
    let normalized = {};
    let hasExtends = false;
    if (!isFunction(comp)) {
      const extendEmits = (raw2) => {
        const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
        if (normalizedFromExtend) {
          hasExtends = true;
          extend(normalized, normalizedFromExtend);
        }
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendEmits);
      }
      if (comp.extends) {
        extendEmits(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendEmits);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject(comp)) {
        cache.set(comp, null);
      }
      return null;
    }
    if (isArray(raw)) {
      raw.forEach((key) => normalized[key] = null);
    } else {
      extend(normalized, raw);
    }
    if (isObject(comp)) {
      cache.set(comp, normalized);
    }
    return normalized;
  }
  function isEmitListener(options, key) {
    if (!options || !isOn(key)) {
      return false;
    }
    key = key.slice(2);
    key = key === "Once" ? key : key.replace(/Once$/, "");
    return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
  }
  function markAttrsAccessed() {
  }
  function renderComponentRoot(instance) {
    const {
      type: Component,
      vnode,
      proxy,
      withProxy,
      propsOptions: [propsOptions],
      slots,
      attrs,
      emit: emit2,
      render,
      renderCache,
      props,
      data,
      setupState,
      ctx,
      inheritAttrs
    } = instance;
    const prev = setCurrentRenderingInstance(instance);
    let result;
    let fallthroughAttrs;
    try {
      if (vnode.shapeFlag & 4) {
        const proxyToUse = withProxy || proxy;
        const thisProxy = false ? new Proxy(proxyToUse, {
          get(target, key, receiver) {
            warn$1(
              `Property '${String(
              key
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
            );
            return Reflect.get(target, key, receiver);
          }
        }) : proxyToUse;
        result = normalizeVNode(
          render.call(
            thisProxy,
            proxyToUse,
            renderCache,
            false ? /* @__PURE__ */ shallowReadonly(props) : props,
            setupState,
            data,
            ctx
          )
        );
        fallthroughAttrs = attrs;
      } else {
        const render2 = Component;
        if (false) ;
        result = normalizeVNode(
          render2.length > 1 ? render2(
            false ? /* @__PURE__ */ shallowReadonly(props) : props,
            false ? {
              get attrs() {
                markAttrsAccessed();
                return /* @__PURE__ */ shallowReadonly(attrs);
              },
              slots,
              emit: emit2
            } : { attrs, slots, emit: emit2 }
          ) : render2(
            false ? /* @__PURE__ */ shallowReadonly(props) : props,
            null
          )
        );
        fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
      }
    } catch (err) {
      blockStack.length = 0;
      handleError(err, instance, 1);
      result = createVNode(Comment);
    }
    let root = result;
    if (fallthroughAttrs && inheritAttrs !== false) {
      const keys = Object.keys(fallthroughAttrs);
      const { shapeFlag } = root;
      if (keys.length) {
        if (shapeFlag & (1 | 6)) {
          if (propsOptions && keys.some(isModelListener)) {
            fallthroughAttrs = filterModelListeners(
              fallthroughAttrs,
              propsOptions
            );
          }
          root = cloneVNode(root, fallthroughAttrs, false, true);
        }
      }
    }
    if (vnode.dirs) {
      root = cloneVNode(root, null, false, true);
      root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
    }
    if (vnode.transition) {
      const child = isTeleport(root.type) ? getInnerChild$1(root) || root : root;
      setTransitionHooks(child, vnode.transition);
    }
    {
      result = root;
    }
    setCurrentRenderingInstance(prev);
    return result;
  }
  const getFunctionalFallthrough = (attrs) => {
    let res;
    for (const key in attrs) {
      if (key === "class" || key === "style" || isOn(key)) {
        (res || (res = {}))[key] = attrs[key];
      }
    }
    return res;
  };
  const filterModelListeners = (attrs, props) => {
    const res = {};
    for (const key in attrs) {
      if (!isModelListener(key) || !(key.slice(9) in props)) {
        res[key] = attrs[key];
      }
    }
    return res;
  };
  function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
    const { props: prevProps, children: prevChildren, component } = prevVNode;
    const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
    const emits = component.emitsOptions;
    if (nextVNode.dirs || nextVNode.transition) {
      return true;
    }
    if (optimized && patchFlag >= 0) {
      if (patchFlag & 1024) {
        return true;
      }
      if (patchFlag & 16) {
        if (!prevProps) {
          return !!nextProps;
        }
        return hasPropsChanged(prevProps, nextProps, emits);
      } else if (patchFlag & 8) {
        const dynamicProps = nextVNode.dynamicProps;
        for (let i = 0; i < dynamicProps.length; i++) {
          const key = dynamicProps[i];
          if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emits, key)) {
            return true;
          }
        }
      }
    } else {
      if (prevChildren || nextChildren) {
        if (!nextChildren || !nextChildren.$stable) {
          return true;
        }
      }
      if (prevProps === nextProps) {
        return false;
      }
      if (!prevProps) {
        return !!nextProps;
      }
      if (!nextProps) {
        return true;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    }
    return false;
  }
  function hasPropsChanged(prevProps, nextProps, emitsOptions) {
    const nextKeys = Object.keys(nextProps);
    if (nextKeys.length !== Object.keys(prevProps).length) {
      return true;
    }
    for (let i = 0; i < nextKeys.length; i++) {
      const key = nextKeys[i];
      if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emitsOptions, key)) {
        return true;
      }
    }
    return false;
  }
  function hasPropValueChanged(nextProps, prevProps, key) {
    const nextProp = nextProps[key];
    const prevProp = prevProps[key];
    if (key === "style" && isObject(nextProp) && isObject(prevProp)) {
      return !looseEqual(nextProp, prevProp);
    }
    return nextProp !== prevProp;
  }
  function updateHOCHostEl({ vnode, parent, suspense }, el) {
    while (parent) {
      const root = parent.subTree;
      if (root.suspense && root.suspense.activeBranch === vnode) {
        root.suspense.vnode.el = root.el = el;
        vnode = root;
      }
      if (root === vnode) {
        (vnode = parent.vnode).el = el;
        parent = parent.parent;
      } else {
        break;
      }
    }
    if (suspense && suspense.activeBranch === vnode) {
      suspense.vnode.el = el;
    }
  }
  const internalObjectProto = {};
  const createInternalObject = () => Object.create(internalObjectProto);
  const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
  function initProps(instance, rawProps, isStateful, isSSR = false) {
    const props = {};
    const attrs = createInternalObject();
    instance.propsDefaults = /* @__PURE__ */ Object.create(null);
    setFullProps(instance, rawProps, props, attrs);
    for (const key in instance.propsOptions[0]) {
      if (!(key in props)) {
        props[key] = void 0;
      }
    }
    if (isStateful) {
      instance.props = isSSR ? props : /* @__PURE__ */ shallowReactive(props);
    } else {
      if (!instance.type.props) {
        instance.props = attrs;
      } else {
        instance.props = props;
      }
    }
    instance.attrs = attrs;
  }
  function updateProps(instance, rawProps, rawPrevProps, optimized) {
    const {
      props,
      attrs,
      vnode: { patchFlag }
    } = instance;
    const rawCurrentProps = /* @__PURE__ */ toRaw(props);
    const [options] = instance.propsOptions;
    let hasAttrsChanged = false;
    if (
      // always force full diff in dev
      // - #1942 if hmr is enabled with sfc component
      // - vite#872 non-sfc component used by sfc component
      (optimized || patchFlag > 0) && !(patchFlag & 16)
    ) {
      if (patchFlag & 8) {
        const propsToUpdate = instance.vnode.dynamicProps;
        for (let i = 0; i < propsToUpdate.length; i++) {
          let key = propsToUpdate[i];
          if (isEmitListener(instance.emitsOptions, key)) {
            continue;
          }
          const value = rawProps[key];
          if (options) {
            if (hasOwn(attrs, key)) {
              if (value !== attrs[key]) {
                attrs[key] = value;
                hasAttrsChanged = true;
              }
            } else {
              const camelizedKey = camelize(key);
              props[camelizedKey] = resolvePropValue(
                options,
                rawCurrentProps,
                camelizedKey,
                value,
                instance,
                false
              );
            }
          } else {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          }
        }
      }
    } else {
      if (setFullProps(instance, rawProps, props, attrs)) {
        hasAttrsChanged = true;
      }
      let kebabKey;
      for (const key in rawCurrentProps) {
        if (!rawProps || // for camelCase
        !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
        // and converted to camelCase (#955)
        ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
          if (options) {
            if (rawPrevProps && // for camelCase
            (rawPrevProps[key] !== void 0 || // for kebab-case
            rawPrevProps[kebabKey] !== void 0)) {
              props[key] = resolvePropValue(
                options,
                rawCurrentProps,
                key,
                void 0,
                instance,
                true
              );
            }
          } else {
            delete props[key];
          }
        }
      }
      if (attrs !== rawCurrentProps) {
        for (const key in attrs) {
          if (!rawProps || !hasOwn(rawProps, key) && true) {
            delete attrs[key];
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (hasAttrsChanged) {
      trigger(instance.attrs, "set", "");
    }
  }
  function setFullProps(instance, rawProps, props, attrs) {
    const [options, needCastKeys] = instance.propsOptions;
    let hasAttrsChanged = false;
    let rawCastValues;
    if (rawProps) {
      for (let key in rawProps) {
        if (isReservedProp(key)) {
          continue;
        }
        const value = rawProps[key];
        let camelKey;
        if (options && hasOwn(options, camelKey = camelize(key))) {
          if (!needCastKeys || !needCastKeys.includes(camelKey)) {
            props[camelKey] = value;
          } else {
            (rawCastValues || (rawCastValues = {}))[camelKey] = value;
          }
        } else if (!isEmitListener(instance.emitsOptions, key)) {
          if (!(key in attrs) || value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (needCastKeys) {
      const rawCurrentProps = /* @__PURE__ */ toRaw(props);
      const castValues = rawCastValues || EMPTY_OBJ;
      for (let i = 0; i < needCastKeys.length; i++) {
        const key = needCastKeys[i];
        props[key] = resolvePropValue(
          options,
          rawCurrentProps,
          key,
          castValues[key],
          instance,
          !hasOwn(castValues, key)
        );
      }
    }
    return hasAttrsChanged;
  }
  function resolvePropValue(options, props, key, value, instance, isAbsent) {
    const opt = options[key];
    if (opt != null) {
      const hasDefault = hasOwn(opt, "default");
      if (hasDefault && value === void 0) {
        const defaultValue = opt.default;
        if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
          const { propsDefaults } = instance;
          if (key in propsDefaults) {
            value = propsDefaults[key];
          } else {
            const reset = setCurrentInstance(instance);
            value = propsDefaults[key] = defaultValue.call(
              null,
              props
            );
            reset();
          }
        } else {
          value = defaultValue;
        }
        if (instance.ce) {
          instance.ce._setProp(key, value);
        }
      }
      if (opt[
        0
        /* shouldCast */
      ]) {
        if (isAbsent && !hasDefault) {
          value = false;
        } else if (opt[
          1
          /* shouldCastTrue */
        ] && (value === "" || value === hyphenate(key))) {
          value = true;
        }
      }
    }
    return value;
  }
  const mixinPropsCache = /* @__PURE__ */ new WeakMap();
  function normalizePropsOptions(comp, appContext, asMixin = false) {
    const cache = asMixin ? mixinPropsCache : appContext.propsCache;
    const cached = cache.get(comp);
    if (cached) {
      return cached;
    }
    const raw = comp.props;
    const normalized = {};
    const needCastKeys = [];
    let hasExtends = false;
    if (!isFunction(comp)) {
      const extendProps = (raw2) => {
        hasExtends = true;
        const [props, keys] = normalizePropsOptions(raw2, appContext, true);
        extend(normalized, props);
        if (keys) needCastKeys.push(...keys);
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendProps);
      }
      if (comp.extends) {
        extendProps(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendProps);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject(comp)) {
        cache.set(comp, EMPTY_ARR);
      }
      return EMPTY_ARR;
    }
    if (isArray(raw)) {
      for (let i = 0; i < raw.length; i++) {
        const normalizedKey = camelize(raw[i]);
        if (validatePropName(normalizedKey)) {
          normalized[normalizedKey] = EMPTY_OBJ;
        }
      }
    } else if (raw) {
      for (const key in raw) {
        const normalizedKey = camelize(key);
        if (validatePropName(normalizedKey)) {
          const opt = raw[key];
          const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
          const propType = prop.type;
          let shouldCast = false;
          let shouldCastTrue = true;
          if (isArray(propType)) {
            for (let index = 0; index < propType.length; ++index) {
              const type = propType[index];
              const typeName = isFunction(type) && type.name;
              if (typeName === "Boolean") {
                shouldCast = true;
                break;
              } else if (typeName === "String") {
                shouldCastTrue = false;
              }
            }
          } else {
            shouldCast = isFunction(propType) && propType.name === "Boolean";
          }
          prop[
            0
            /* shouldCast */
          ] = shouldCast;
          prop[
            1
            /* shouldCastTrue */
          ] = shouldCastTrue;
          if (shouldCast || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
    const res = [normalized, needCastKeys];
    if (isObject(comp)) {
      cache.set(comp, res);
    }
    return res;
  }
  function validatePropName(key) {
    if (key[0] !== "$" && !isReservedProp(key)) {
      return true;
    }
    return false;
  }
  const isInternalKey = (key) => key === "_" || key === "_ctx" || key === "$stable";
  const normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
  const normalizeSlot = (key, rawSlot, ctx) => {
    if (rawSlot._n) {
      return rawSlot;
    }
    const normalized = withCtx((...args) => {
      if (false) ;
      return normalizeSlotValue(rawSlot(...args));
    }, ctx);
    normalized._c = false;
    return normalized;
  };
  const normalizeObjectSlots = (rawSlots, slots, instance) => {
    const ctx = rawSlots._ctx;
    for (const key in rawSlots) {
      if (isInternalKey(key)) continue;
      const value = rawSlots[key];
      if (isFunction(value)) {
        slots[key] = normalizeSlot(key, value, ctx);
      } else if (value != null) {
        const normalized = normalizeSlotValue(value);
        slots[key] = () => normalized;
      }
    }
  };
  const normalizeVNodeSlots = (instance, children) => {
    const normalized = normalizeSlotValue(children);
    instance.slots.default = () => normalized;
  };
  const assignSlots = (slots, children, optimized) => {
    for (const key in children) {
      if (optimized || !isInternalKey(key)) {
        slots[key] = children[key];
      }
    }
  };
  const initSlots = (instance, children, optimized) => {
    const slots = instance.slots = createInternalObject();
    if (instance.vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        assignSlots(slots, children, optimized);
        if (optimized) {
          def(slots, "_", type, true);
        }
      } else {
        normalizeObjectSlots(children, slots);
      }
    } else if (children) {
      normalizeVNodeSlots(instance, children);
    }
  };
  const updateSlots = (instance, children, optimized) => {
    const { vnode, slots } = instance;
    let needDeletionCheck = true;
    let deletionComparisonTarget = EMPTY_OBJ;
    if (vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        if (optimized && type === 1) {
          needDeletionCheck = false;
        } else {
          assignSlots(slots, children, optimized);
        }
      } else {
        needDeletionCheck = !children.$stable;
        normalizeObjectSlots(children, slots);
      }
      deletionComparisonTarget = children;
    } else if (children) {
      normalizeVNodeSlots(instance, children);
      deletionComparisonTarget = { default: 1 };
    }
    if (needDeletionCheck) {
      for (const key in slots) {
        if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
          delete slots[key];
        }
      }
    }
  };
  const queuePostRenderEffect = queueEffectWithSuspense;
  function createRenderer(options) {
    return baseCreateRenderer(options);
  }
  function baseCreateRenderer(options, createHydrationFns) {
    const target = getGlobalThis();
    target.__VUE__ = true;
    const {
      insert: hostInsert,
      remove: hostRemove,
      patchProp: hostPatchProp,
      createElement: hostCreateElement,
      createText: hostCreateText,
      createComment: hostCreateComment,
      setText: hostSetText,
      setElementText: hostSetElementText,
      parentNode: hostParentNode,
      nextSibling: hostNextSibling,
      setScopeId: hostSetScopeId = NOOP,
      insertStaticContent: hostInsertStaticContent
    } = options;
    const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
      if (n1 === n2) {
        return;
      }
      if (n1 && !isSameVNodeType(n1, n2)) {
        anchor = getNextHostNode(n1);
        unmount(n1, parentComponent, parentSuspense, true);
        n1 = null;
      }
      if (n2.patchFlag === -2) {
        optimized = false;
        n2.dynamicChildren = null;
      }
      if (n2.dynamicChildren && n1 && n1.dynamicChildren && n1.dynamicChildren.hasOnce) {
        if (n2.dynamicChildren === EMPTY_ARR) {
          n2.dynamicChildren = [];
        }
        n2.dynamicChildren.hasOnce = true;
      }
      const { type, ref: ref3, shapeFlag } = n2;
      switch (type) {
        case Text:
          processText(n1, n2, container, anchor);
          break;
        case Comment:
          processCommentNode(n1, n2, container, anchor);
          break;
        case Static:
          if (n1 == null) {
            mountStaticNode(n2, container, anchor, namespace);
          }
          break;
        case Fragment:
          processFragment(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          break;
        default:
          if (shapeFlag & 1) {
            processElement(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (shapeFlag & 6) {
            processComponent(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (shapeFlag & 64) {
            type.process(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized,
              internals
            );
          } else if (shapeFlag & 128) {
            type.process(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized,
              internals
            );
          } else ;
      }
      if (ref3 != null && parentComponent) {
        setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
      } else if (ref3 == null && n1 && n1.ref != null) {
        setRef(n1.ref, null, parentSuspense, n1, true);
      }
    };
    const processText = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(
          n2.el = hostCreateText(n2.children),
          container,
          anchor
        );
      } else {
        const el = n2.el = n1.el;
        if (n2.children !== n1.children) {
          hostSetText(el, n2.children);
        }
      }
    };
    const processCommentNode = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(
          n2.el = hostCreateComment(n2.children || ""),
          container,
          anchor
        );
      } else {
        n2.el = n1.el;
      }
    };
    const mountStaticNode = (n2, container, anchor, namespace) => {
      [n2.el, n2.anchor] = hostInsertStaticContent(
        n2.children,
        container,
        anchor,
        namespace,
        n2.el,
        n2.anchor
      );
    };
    const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostInsert(el, container, nextSibling);
        el = next;
      }
      hostInsert(anchor, container, nextSibling);
    };
    const removeStaticNode = ({ el, anchor }) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostRemove(el);
        el = next;
      }
      hostRemove(anchor);
    };
    const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      if (n2.type === "svg") {
        namespace = "svg";
      } else if (n2.type === "math") {
        namespace = "mathml";
      }
      if (n1 == null) {
        mountElement(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        const customElement = n1.el && n1.el._isVueCE ? n1.el : null;
        try {
          if (customElement) {
            customElement._beginPatch();
          }
          patchElement(
            n1,
            n2,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } finally {
          if (customElement) {
            customElement._endPatch();
          }
        }
      }
    };
    const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      let el;
      let vnodeHook;
      const { props, shapeFlag, transition, dirs } = vnode;
      el = vnode.el = hostCreateElement(
        vnode.type,
        namespace,
        props && props.is,
        props
      );
      if (shapeFlag & 8) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16) {
        mountChildren(
          vnode.children,
          el,
          null,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(vnode, namespace),
          slotScopeIds,
          optimized
        );
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
      if (props) {
        for (const key in props) {
          if (key !== "value" && !isReservedProp(key)) {
            hostPatchProp(el, key, null, props[key], namespace, parentComponent);
          }
        }
        if ("value" in props) {
          hostPatchProp(el, "value", null, props.value, namespace);
        }
        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      const needCallTransitionHooks = needTransition(parentSuspense, transition);
      if (needCallTransitionHooks) {
        transition.beforeEnter(el);
      }
      hostInsert(el, container, anchor);
      if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
        queuePostRenderEffect(() => {
          try {
            vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
            needCallTransitionHooks && transition.enter(el);
            dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
          } finally {
          }
        }, parentSuspense);
      }
    };
    const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
      if (scopeId) {
        hostSetScopeId(el, scopeId);
      }
      if (slotScopeIds) {
        for (let i = 0; i < slotScopeIds.length; i++) {
          hostSetScopeId(el, slotScopeIds[i]);
        }
      }
      if (parentComponent) {
        let subTree = parentComponent.subTree;
        if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
          const parentVNode = parentComponent.vnode;
          setScopeId(
            el,
            parentVNode,
            parentVNode.scopeId,
            parentVNode.slotScopeIds,
            parentComponent.parent
          );
        }
      }
    };
    const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
      for (let i = start; i < children.length; i++) {
        const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
        patch(
          null,
          child,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    };
    const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      const el = n2.el = n1.el;
      let { patchFlag, dynamicChildren, dirs } = n2;
      patchFlag |= n1.patchFlag & 16;
      const oldProps = n1.props || EMPTY_OBJ;
      const newProps = n2.props || EMPTY_OBJ;
      let vnodeHook;
      parentComponent && toggleRecurse(parentComponent, false);
      if (vnodeHook = newProps.onVnodeBeforeUpdate) {
        invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
      }
      if (dirs) {
        invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
      }
      parentComponent && toggleRecurse(parentComponent, true);
      if (
        // #6385 the old vnode may be a user-wrapped non-isomorphic block
        // Force full diff when block metadata is unstable.
        dynamicChildren && (!n1.dynamicChildren || n1.dynamicChildren.length !== dynamicChildren.length)
      ) {
        patchFlag = 0;
        optimized = false;
        dynamicChildren = null;
      }
      if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
        hostSetElementText(el, "");
      }
      if (dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          el,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(n2, namespace),
          slotScopeIds
        );
      } else if (!optimized) {
        patchChildren(
          n1,
          n2,
          el,
          null,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(n2, namespace),
          slotScopeIds,
          false
        );
      }
      if (patchFlag > 0) {
        if (patchFlag & 16) {
          patchProps(el, oldProps, newProps, parentComponent, namespace);
        } else {
          if (patchFlag & 2) {
            if (oldProps.class !== newProps.class) {
              hostPatchProp(el, "class", null, newProps.class, namespace);
            }
          }
          if (patchFlag & 4) {
            hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
          }
          if (patchFlag & 8) {
            const propsToUpdate = n2.dynamicProps;
            for (let i = 0; i < propsToUpdate.length; i++) {
              const key = propsToUpdate[i];
              const prev = oldProps[key];
              const next = newProps[key];
              if (next !== prev || key === "value") {
                hostPatchProp(el, key, prev, next, namespace, parentComponent);
              }
            }
          }
        }
        if (patchFlag & 1) {
          if (n1.children !== n2.children) {
            hostSetElementText(el, n2.children);
          }
        }
      } else if (!optimized && dynamicChildren == null) {
        patchProps(el, oldProps, newProps, parentComponent, namespace);
      }
      if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
          dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
        }, parentSuspense);
      }
    };
    const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
      for (let i = 0; i < newChildren.length; i++) {
        const oldVNode = oldChildren[i];
        const newVNode = newChildren[i];
        const container = (
          // oldVNode may be an errored async setup() component inside Suspense
          // which will not have a mounted element
          oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
          // of the Fragment itself so it can move its children.
          (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
          // which also requires the correct parent container
          !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
          oldVNode.shapeFlag & (6 | 64 | 128)) ? hostParentNode(oldVNode.el) : (
            // In other cases, the parent container is not actually used so we
            // just pass the block element here to avoid a DOM parentNode call.
            fallbackContainer
          )
        );
        patch(
          oldVNode,
          newVNode,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          true
        );
      }
    };
    const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
      if (oldProps !== newProps) {
        if (oldProps !== EMPTY_OBJ) {
          for (const key in oldProps) {
            if (!isReservedProp(key) && !(key in newProps)) {
              hostPatchProp(
                el,
                key,
                oldProps[key],
                null,
                namespace,
                parentComponent
              );
            }
          }
        }
        for (const key in newProps) {
          if (isReservedProp(key)) continue;
          const next = newProps[key];
          const prev = oldProps[key];
          if (next !== prev && key !== "value") {
            hostPatchProp(el, key, prev, next, namespace, parentComponent);
          }
        }
        if ("value" in newProps) {
          hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
        }
      }
    };
    const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
      const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
      let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
      if (fragmentSlotScopeIds) {
        slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
      }
      if (n1 == null) {
        hostInsert(fragmentStartAnchor, container, anchor);
        hostInsert(fragmentEndAnchor, container, anchor);
        mountChildren(
          // #10007
          // such fragment like `<></>` will be compiled into
          // a fragment which doesn't have a children.
          // In this case fallback to an empty array
          n2.children || [],
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
        // of renderSlot() with no valid children
        n1.dynamicChildren && n1.dynamicChildren.length === dynamicChildren.length) {
          patchBlockChildren(
            n1.dynamicChildren,
            dynamicChildren,
            container,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds
          );
          if (
            // #2080 if the stable fragment has a key, it's a <template v-for> that may
            //  get moved around. Make sure all root level vnodes inherit el.
            // #2134 or if it's a component root, it may also get moved around
            // as the component is being moved.
            n2.key != null || parentComponent && n2 === parentComponent.subTree
          ) {
            traverseStaticChildren(
              n1,
              n2,
              true
              /* shallow */
            );
          }
        } else {
          patchChildren(
            n1,
            n2,
            container,
            fragmentEndAnchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    };
    const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      n2.slotScopeIds = slotScopeIds;
      if (n1 == null) {
        if (n2.shapeFlag & 512) {
          parentComponent.ctx.activate(
            n2,
            container,
            anchor,
            namespace,
            optimized
          );
        } else {
          mountComponent(
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            optimized
          );
        }
      } else {
        updateComponent(n1, n2, optimized);
      }
    };
    const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
      const instance = initialVNode.component = createComponentInstance(
        initialVNode,
        parentComponent,
        parentSuspense
      );
      if (isKeepAlive(initialVNode)) {
        instance.ctx.renderer = internals;
      }
      {
        setupComponent(instance, false, optimized);
      }
      if (instance.asyncDep) {
        parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
        if (!initialVNode.el) {
          const placeholder = instance.subTree = createVNode(Comment);
          processCommentNode(null, placeholder, container, anchor);
          initialVNode.placeholder = placeholder.el;
        }
      } else {
        setupRenderEffect(
          instance,
          initialVNode,
          container,
          anchor,
          parentSuspense,
          namespace,
          optimized
        );
      }
    };
    const updateComponent = (n1, n2, optimized) => {
      const instance = n2.component = n1.component;
      if (shouldUpdateComponent(n1, n2, optimized)) {
        if (instance.asyncDep && !instance.asyncResolved) {
          n2.el = n1.el;
          updateComponentPreRender(instance, n2, optimized);
          return;
        } else {
          instance.next = n2;
          instance.update();
        }
      } else {
        n2.el = n1.el;
        instance.vnode = n2;
      }
    };
    const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
      const componentUpdateFn = () => {
        if (!instance.isMounted) {
          let vnodeHook;
          const { el, props } = initialVNode;
          const { bm, m, parent, root, type } = instance;
          const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
          toggleRecurse(instance, false);
          if (bm) {
            invokeArrayFns(bm);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
            invokeVNodeHook(vnodeHook, parent, initialVNode);
          }
          toggleRecurse(instance, true);
          {
            if (root.ce && root.ce._hasShadowRoot()) {
              root.ce._injectChildStyle(
                type,
                instance.parent ? instance.parent.type : void 0
              );
            }
            const subTree = instance.subTree = renderComponentRoot(instance);
            patch(
              null,
              subTree,
              container,
              anchor,
              instance,
              parentSuspense,
              namespace
            );
            initialVNode.el = subTree.el;
          }
          if (m) {
            queuePostRenderEffect(m, parentSuspense);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
            const scopedInitialVNode = initialVNode;
            queuePostRenderEffect(
              () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
              parentSuspense
            );
          }
          if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
            instance.a && queuePostRenderEffect(instance.a, parentSuspense);
          }
          instance.isMounted = true;
          initialVNode = container = anchor = null;
        } else {
          let { next, bu, u, parent, vnode } = instance;
          {
            const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
            if (nonHydratedAsyncRoot) {
              if (next) {
                next.el = vnode.el;
                updateComponentPreRender(instance, next, optimized);
              }
              nonHydratedAsyncRoot.asyncDep.then(() => {
                queuePostRenderEffect(() => {
                  if (!instance.isUnmounted) update();
                }, parentSuspense);
              });
              return;
            }
          }
          let originNext = next;
          let vnodeHook;
          toggleRecurse(instance, false);
          if (next) {
            next.el = vnode.el;
            updateComponentPreRender(instance, next, optimized);
          } else {
            next = vnode;
          }
          if (bu) {
            invokeArrayFns(bu);
          }
          if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
            invokeVNodeHook(vnodeHook, parent, next, vnode);
          }
          toggleRecurse(instance, true);
          const nextTree = renderComponentRoot(instance);
          const prevTree = instance.subTree;
          instance.subTree = nextTree;
          patch(
            prevTree,
            nextTree,
            // parent may have changed if it's in a teleport
            hostParentNode(prevTree.el),
            // anchor may have changed if it's in a fragment
            getNextHostNode(prevTree),
            instance,
            parentSuspense,
            namespace
          );
          next.el = nextTree.el;
          if (originNext === null) {
            updateHOCHostEl(instance, nextTree.el);
          }
          if (u) {
            queuePostRenderEffect(u, parentSuspense);
          }
          if (vnodeHook = next.props && next.props.onVnodeUpdated) {
            queuePostRenderEffect(
              () => invokeVNodeHook(vnodeHook, parent, next, vnode),
              parentSuspense
            );
          }
        }
      };
      instance.scope.on();
      const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn);
      instance.scope.off();
      const update = instance.update = effect2.run.bind(effect2);
      const job = instance.job = effect2.runIfDirty.bind(effect2);
      job.i = instance;
      job.id = instance.uid;
      effect2.scheduler = () => queueJob(job);
      toggleRecurse(instance, true);
      update();
    };
    const updateComponentPreRender = (instance, nextVNode, optimized) => {
      nextVNode.component = instance;
      const prevProps = instance.vnode.props;
      instance.vnode = nextVNode;
      instance.next = null;
      updateProps(instance, nextVNode.props, prevProps, optimized);
      updateSlots(instance, nextVNode.children, optimized);
      pauseTracking();
      flushPreFlushCbs(instance);
      resetTracking();
    };
    const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
      const c1 = n1 && n1.children;
      const prevShapeFlag = n1 ? n1.shapeFlag : 0;
      const c2 = n2.children;
      const { patchFlag, shapeFlag } = n2;
      if (patchFlag > 0) {
        if (patchFlag & 128) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          return;
        } else if (patchFlag & 256) {
          patchUnkeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          return;
        }
      }
      if (shapeFlag & 8) {
        if (prevShapeFlag & 16) {
          unmountChildren(c1, parentComponent, parentSuspense);
        }
        if (c2 !== c1) {
          hostSetElementText(container, c2);
        }
      } else {
        if (prevShapeFlag & 16) {
          if (shapeFlag & 16) {
            patchKeyedChildren(
              c1,
              c2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else {
            unmountChildren(c1, parentComponent, parentSuspense, true);
          }
        } else {
          if (prevShapeFlag & 8) {
            hostSetElementText(container, "");
          }
          if (shapeFlag & 16) {
            mountChildren(
              c2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          }
        }
      }
    };
    const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      c1 = c1 || EMPTY_ARR;
      c2 = c2 || EMPTY_ARR;
      const oldLength = c1.length;
      const newLength = c2.length;
      const commonLength = Math.min(oldLength, newLength);
      let i;
      for (i = 0; i < commonLength; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        patch(
          c1[i],
          nextChild,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
      if (oldLength > newLength) {
        unmountChildren(
          c1,
          parentComponent,
          parentSuspense,
          true,
          false,
          commonLength
        );
      } else {
        mountChildren(
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized,
          commonLength
        );
      }
    };
    const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      let i = 0;
      const l2 = c2.length;
      let e1 = c1.length - 1;
      let e2 = l2 - 1;
      while (i <= e1 && i <= e2) {
        const n1 = c1[i];
        const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (isSameVNodeType(n1, n2)) {
          patch(
            n1,
            n2,
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          break;
        }
        i++;
      }
      while (i <= e1 && i <= e2) {
        const n1 = c1[e1];
        const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
        if (isSameVNodeType(n1, n2)) {
          patch(
            n1,
            n2,
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          break;
        }
        e1--;
        e2--;
      }
      if (i > e1) {
        if (i <= e2) {
          const nextPos = e2 + 1;
          const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
          while (i <= e2) {
            patch(
              null,
              c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
            i++;
          }
        }
      } else if (i > e2) {
        while (i <= e1) {
          unmount(c1[i], parentComponent, parentSuspense, true);
          i++;
        }
      } else {
        const s1 = i;
        const s2 = i;
        const keyToNewIndexMap = /* @__PURE__ */ new Map();
        for (i = s2; i <= e2; i++) {
          const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          if (nextChild.key != null) {
            keyToNewIndexMap.set(nextChild.key, i);
          }
        }
        let j;
        let patched = 0;
        const toBePatched = e2 - s2 + 1;
        let moved = false;
        let maxNewIndexSoFar = 0;
        const newIndexToOldIndexMap = new Array(toBePatched);
        for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
        for (i = s1; i <= e1; i++) {
          const prevChild = c1[i];
          if (patched >= toBePatched) {
            unmount(prevChild, parentComponent, parentSuspense, true);
            continue;
          }
          let newIndex;
          if (prevChild.key != null) {
            newIndex = keyToNewIndexMap.get(prevChild.key);
          } else {
            for (j = s2; j <= e2; j++) {
              if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                newIndex = j;
                break;
              }
            }
          }
          if (newIndex === void 0) {
            unmount(prevChild, parentComponent, parentSuspense, true);
          } else {
            newIndexToOldIndexMap[newIndex - s2] = i + 1;
            if (newIndex >= maxNewIndexSoFar) {
              maxNewIndexSoFar = newIndex;
            } else {
              moved = true;
            }
            patch(
              prevChild,
              c2[newIndex],
              container,
              null,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
            patched++;
          }
        }
        const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
        j = increasingNewIndexSequence.length - 1;
        for (i = toBePatched - 1; i >= 0; i--) {
          const nextIndex = s2 + i;
          const nextChild = c2[nextIndex];
          const anchorVNode = c2[nextIndex + 1];
          const anchor = nextIndex + 1 < l2 ? (
            // #13559, #14173 fallback to el placeholder for unresolved async component
            anchorVNode.el || resolveAsyncComponentPlaceholder(anchorVNode)
          ) : parentAnchor;
          if (newIndexToOldIndexMap[i] === 0) {
            patch(
              null,
              nextChild,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (moved) {
            if (j < 0 || i !== increasingNewIndexSequence[j]) {
              move(nextChild, container, anchor, 2);
            } else {
              j--;
            }
          }
        }
      }
    };
    const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
      const { el, type, transition, children, shapeFlag } = vnode;
      if (shapeFlag & 6) {
        move(vnode.component.subTree, container, anchor, moveType);
        return;
      }
      if (shapeFlag & 128) {
        vnode.suspense.move(container, anchor, moveType);
        return;
      }
      if (shapeFlag & 64) {
        type.move(vnode, container, anchor, internals);
        return;
      }
      if (type === Fragment) {
        hostInsert(el, container, anchor);
        for (let i = 0; i < children.length; i++) {
          move(children[i], container, anchor, moveType);
        }
        hostInsert(vnode.anchor, container, anchor);
        return;
      }
      if (type === Static) {
        moveStaticNode(vnode, container, anchor);
        return;
      }
      const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
      if (needTransition2) {
        if (moveType === 0) {
          if (transition.persisted && !el[leaveCbKey]) {
            hostInsert(el, container, anchor);
          } else {
            transition.beforeEnter(el);
            hostInsert(el, container, anchor);
            queuePostRenderEffect(() => transition.enter(el), parentSuspense);
          }
        } else {
          const { leave, delayLeave, afterLeave } = transition;
          const remove22 = () => {
            if (vnode.ctx.isUnmounted) {
              hostRemove(el);
            } else {
              hostInsert(el, container, anchor);
            }
          };
          const performLeave = () => {
            const wasLeaving = el._isLeaving || !!el[leaveCbKey];
            if (el._isLeaving) {
              el[leaveCbKey](
                true
                /* cancelled */
              );
            }
            if (transition.persisted && !wasLeaving) {
              remove22();
            } else {
              leave(el, () => {
                remove22();
                afterLeave && afterLeave();
              });
            }
          };
          if (delayLeave) {
            delayLeave(el, remove22, performLeave);
          } else {
            performLeave();
          }
        }
      } else {
        hostInsert(el, container, anchor);
      }
    };
    const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
      const {
        type,
        props,
        ref: ref3,
        children,
        dynamicChildren,
        shapeFlag,
        patchFlag,
        dirs,
        cacheIndex,
        memo
      } = vnode;
      if (patchFlag === -2 || dynamicChildren && dynamicChildren.hasOnce) {
        optimized = false;
      }
      if (ref3 != null) {
        pauseTracking();
        setRef(ref3, null, parentSuspense, vnode, true);
        resetTracking();
      }
      if (cacheIndex != null && (!vnode.ctx || vnode.ctx === parentComponent)) {
        parentComponent.renderCache[cacheIndex] = void 0;
      }
      if (shapeFlag & 256) {
        parentComponent.ctx.deactivate(vnode);
        return;
      }
      const shouldInvokeDirs = shapeFlag & 1 && dirs;
      const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
      let vnodeHook;
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
      if (shapeFlag & 6) {
        unmountComponent(vnode.component, parentSuspense, doRemove);
      } else {
        if (shapeFlag & 128) {
          vnode.suspense.unmount(parentSuspense, doRemove);
          return;
        }
        if (shouldInvokeDirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
        }
        if (shapeFlag & 64) {
          vnode.type.remove(
            vnode,
            parentComponent,
            parentSuspense,
            internals,
            doRemove
          );
        } else if (dynamicChildren && // #5154
        // when v-once is used inside a block, setBlockTracking(-1) marks the
        // parent block with hasOnce: true
        // so that it doesn't take the fast path during unmount - otherwise
        // components nested in v-once are never unmounted.
        !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
        (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
          unmountChildren(
            dynamicChildren,
            parentComponent,
            parentSuspense,
            false,
            true
          );
        } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
          unmountChildren(children, parentComponent, parentSuspense);
        }
        if (doRemove) {
          remove2(vnode);
        }
      }
      const shouldInvalidateMemo = memo != null && cacheIndex == null;
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs || shouldInvalidateMemo) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
          if (shouldInvalidateMemo) {
            vnode.el = null;
          }
        }, parentSuspense);
      }
    };
    const remove2 = (vnode) => {
      const { type, el, anchor, transition } = vnode;
      if (type === Fragment) {
        {
          removeFragment(el, anchor);
        }
        return;
      }
      if (type === Static) {
        removeStaticNode(vnode);
        if (transition && !transition.persisted && transition.afterLeave) {
          transition.afterLeave();
        }
        return;
      }
      const performRemove = () => {
        hostRemove(el);
        if (transition && !transition.persisted && transition.afterLeave) {
          transition.afterLeave();
        }
      };
      if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
        const { leave, delayLeave } = transition;
        const performLeave = () => leave(el, performRemove);
        if (delayLeave) {
          delayLeave(vnode.el, performRemove, performLeave);
        } else {
          performLeave();
        }
      } else {
        performRemove();
      }
    };
    const removeFragment = (cur, end) => {
      let next;
      while (cur !== end) {
        next = hostNextSibling(cur);
        hostRemove(cur);
        cur = next;
      }
      hostRemove(end);
    };
    const unmountComponent = (instance, parentSuspense, doRemove) => {
      const { bum, scope, job, subTree, um, m, a } = instance;
      invalidateMount(m);
      invalidateMount(a);
      if (bum) {
        invokeArrayFns(bum);
      }
      scope.stop();
      if (job) {
        job.flags |= 8;
        unmount(subTree, instance, parentSuspense, doRemove);
      } else if (instance.vnode.el && subTree) {
        subTree.transition = instance.vnode.transition;
        unmount(subTree, instance, parentSuspense, doRemove);
      }
      if (um) {
        queuePostRenderEffect(um, parentSuspense);
      }
      queuePostRenderEffect(() => {
        instance.isUnmounted = true;
      }, parentSuspense);
    };
    const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
      for (let i = start; i < children.length; i++) {
        unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
      }
    };
    const getNextHostNode = (vnode) => {
      if (vnode.shapeFlag & 6) {
        return getNextHostNode(vnode.component.subTree);
      }
      if (vnode.shapeFlag & 128) {
        return vnode.suspense.next();
      }
      const el = hostNextSibling(vnode.anchor || vnode.el);
      const teleportEnd = el && el[TeleportEndKey];
      return teleportEnd ? hostNextSibling(teleportEnd) : el;
    };
    let isFlushing = false;
    const render = (vnode, container, namespace) => {
      let instance;
      if (vnode == null) {
        if (container._vnode) {
          unmount(container._vnode, null, null, true);
          instance = container._vnode.component;
        }
      } else {
        patch(
          container._vnode || null,
          vnode,
          container,
          null,
          null,
          null,
          namespace
        );
      }
      container._vnode = vnode;
      if (!isFlushing) {
        isFlushing = true;
        flushPreFlushCbs(instance);
        flushPostFlushCbs();
        isFlushing = false;
      }
    };
    const internals = {
      p: patch,
      um: unmount,
      m: move,
      r: remove2,
      mt: mountComponent,
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      n: getNextHostNode,
      o: options
    };
    let hydrate;
    return {
      render,
      hydrate,
      createApp: createAppAPI(render)
    };
  }
  function resolveChildrenNamespace({ type, props }, currentNamespace) {
    return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
  }
  function toggleRecurse({ effect: effect2, job }, allowed) {
    if (allowed) {
      effect2.flags |= 32;
      job.flags |= 4;
    } else {
      effect2.flags &= -33;
      job.flags &= -5;
    }
  }
  function needTransition(parentSuspense, transition) {
    return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
  }
  function traverseStaticChildren(n1, n2, shallow = false) {
    const ch1 = n1.children;
    const ch2 = n2.children;
    if (isArray(ch1) && isArray(ch2)) {
      for (let i = 0; i < ch1.length; i++) {
        const c1 = ch1[i];
        let c2 = ch2[i];
        if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
          if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
            c2 = ch2[i] = cloneIfMounted(ch2[i]);
            c2.el = c1.el;
          }
          if (!shallow && c2.patchFlag !== -2)
            traverseStaticChildren(c1, c2);
        }
        if (c2.type === Text) {
          if (c2.patchFlag === -1) {
            c2 = ch2[i] = cloneIfMounted(c2);
          }
          c2.el = c1.el;
        }
        if (c2.type === Comment && !c2.el) {
          c2.el = c1.el;
        }
      }
    }
  }
  function getSequence(arr) {
    const p2 = arr.slice();
    const result = [0];
    let i, j, u, v, c;
    const len = arr.length;
    for (i = 0; i < len; i++) {
      const arrI = arr[i];
      if (arrI !== 0) {
        j = result[result.length - 1];
        if (arr[j] < arrI) {
          p2[i] = j;
          result.push(i);
          continue;
        }
        u = 0;
        v = result.length - 1;
        while (u < v) {
          c = u + v >> 1;
          if (arr[result[c]] < arrI) {
            u = c + 1;
          } else {
            v = c;
          }
        }
        if (arrI < arr[result[u]]) {
          if (u > 0) {
            p2[i] = result[u - 1];
          }
          result[u] = i;
        }
      }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
      result[u] = v;
      v = p2[v];
    }
    return result;
  }
  function locateNonHydratedAsyncRoot(instance) {
    const subComponent = instance.subTree.component;
    if (subComponent) {
      if (subComponent.asyncDep && !subComponent.asyncResolved) {
        return subComponent;
      } else {
        return locateNonHydratedAsyncRoot(subComponent);
      }
    }
  }
  function invalidateMount(hooks) {
    if (hooks) {
      for (let i = 0; i < hooks.length; i++)
        hooks[i].flags |= 8;
    }
  }
  function resolveAsyncComponentPlaceholder(anchorVnode) {
    if (anchorVnode.placeholder) {
      return anchorVnode.placeholder;
    }
    const instance = anchorVnode.component;
    if (instance) {
      return resolveAsyncComponentPlaceholder(instance.subTree);
    }
    return null;
  }
  const isSuspense = (type) => type.__isSuspense;
  function queueEffectWithSuspense(fn, suspense) {
    if (suspense && suspense.pendingBranch) {
      if (isArray(fn)) {
        suspense.effects.push(...fn);
      } else {
        suspense.effects.push(fn);
      }
    } else {
      queuePostFlushCb(fn);
    }
  }
  const Fragment = /* @__PURE__ */ Symbol.for("v-fgt");
  const Text = /* @__PURE__ */ Symbol.for("v-txt");
  const Comment = /* @__PURE__ */ Symbol.for("v-cmt");
  const Static = /* @__PURE__ */ Symbol.for("v-stc");
  const blockStack = [];
  let currentBlock = null;
  function openBlock(disableTracking = false) {
    blockStack.push(currentBlock = disableTracking ? null : []);
  }
  function closeBlock() {
    blockStack.pop();
    currentBlock = blockStack[blockStack.length - 1] || null;
  }
  let isBlockTreeEnabled = 1;
  function setBlockTracking(value, inVOnce = false) {
    isBlockTreeEnabled += value;
    if (value < 0 && currentBlock && inVOnce) {
      currentBlock.hasOnce = true;
    }
  }
  function setupBlock(vnode) {
    vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
    closeBlock();
    if (isBlockTreeEnabled > 0 && currentBlock) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
    return setupBlock(
      createBaseVNode(
        type,
        props,
        children,
        patchFlag,
        dynamicProps,
        shapeFlag,
        true
      )
    );
  }
  function createBlock(type, props, children, patchFlag, dynamicProps) {
    return setupBlock(
      createVNode(
        type,
        props,
        children,
        patchFlag,
        dynamicProps,
        true
      )
    );
  }
  function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
  }
  function isSameVNodeType(n1, n2) {
    return n1.type === n2.type && n1.key === n2.key;
  }
  const normalizeKey = ({ key }) => key != null ? key : null;
  const normalizeRef = ({
    ref: ref3,
    ref_key,
    ref_for
  }) => {
    if (typeof ref3 === "number") {
      ref3 = "" + ref3;
    }
    return ref3 != null ? isString(ref3) || /* @__PURE__ */ isRef(ref3) || isFunction(ref3) ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for } : ref3 : null;
  };
  function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
    const vnode = {
      __v_isVNode: true,
      __v_skip: true,
      type,
      props,
      key: props && normalizeKey(props),
      ref: props && normalizeRef(props),
      scopeId: currentScopeId,
      slotScopeIds: null,
      children,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetStart: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag,
      patchFlag,
      dynamicProps,
      dynamicChildren: null,
      appContext: null,
      ctx: currentRenderingInstance
    };
    if (needFullChildrenNormalization) {
      normalizeChildren(vnode, children);
      if (shapeFlag & 128) {
        type.normalize(vnode);
      }
    } else if (children) {
      vnode.shapeFlag |= isString(children) ? 8 : 16;
    }
    if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
    !isBlockNode && // has current parent block
    currentBlock && // presence of a patch flag indicates this node needs patching on updates.
    // component nodes also should always be patched, because even if the
    // component doesn't need to update, it needs to persist the instance on to
    // the next vnode so that it can be properly unmounted later.
    (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    vnode.patchFlag !== 32) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  const createVNode = _createVNode;
  function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
    if (!type || type === NULL_DYNAMIC_COMPONENT) {
      type = Comment;
    }
    if (isVNode(type)) {
      const cloned = cloneVNode(
        type,
        props,
        true
        /* mergeRef: true */
      );
      if (children) {
        normalizeChildren(cloned, children);
      }
      if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
        if (cloned.shapeFlag & 6) {
          currentBlock[currentBlock.indexOf(type)] = cloned;
        } else {
          currentBlock.push(cloned);
        }
      }
      cloned.patchFlag = -2;
      return cloned;
    }
    if (isClassComponent(type)) {
      type = type.__vccOpts;
    }
    if (props) {
      props = guardReactiveProps(props);
      let { class: klass, style } = props;
      if (klass && !isString(klass)) {
        props.class = normalizeClass(klass);
      }
      if (isObject(style)) {
        if (/* @__PURE__ */ isProxy(style) && !isArray(style)) {
          style = extend({}, style);
        }
        props.style = normalizeStyle(style);
      }
    }
    const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
    return createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      isBlockNode,
      true
    );
  }
  function guardReactiveProps(props) {
    if (!props) return null;
    return /* @__PURE__ */ isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
  }
  function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
    const { props, ref: ref3, patchFlag, children, transition } = vnode;
    const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
    const cloned = {
      __v_isVNode: true,
      __v_skip: true,
      type: vnode.type,
      props: mergedProps,
      key: mergedProps && normalizeKey(mergedProps),
      ref: extraProps && extraProps.ref ? (
        // #2078 in the case of <component :is="vnode" ref="extra"/>
        // if the vnode itself already has a ref, cloneVNode will need to merge
        // the refs so the single vnode can be set on multiple refs
        mergeRef && ref3 ? isArray(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps)
      ) : ref3,
      scopeId: vnode.scopeId,
      slotScopeIds: vnode.slotScopeIds,
      children,
      target: vnode.target,
      targetStart: vnode.targetStart,
      targetAnchor: vnode.targetAnchor,
      staticCount: vnode.staticCount,
      shapeFlag: vnode.shapeFlag,
      // if the vnode is cloned with extra props, we can no longer assume its
      // existing patch flag to be reliable and need to add the FULL_PROPS flag.
      // note: preserve flag for fragments since they use the flag for children
      // fast paths only.
      patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
      dynamicProps: vnode.dynamicProps,
      dynamicChildren: vnode.dynamicChildren,
      appContext: vnode.appContext,
      dirs: vnode.dirs,
      transition,
      // These should technically only be non-null on mounted VNodes. However,
      // they *should* be copied for kept-alive vnodes. So we just always copy
      // them since them being non-null during a mount doesn't affect the logic as
      // they will simply be overwritten.
      component: vnode.component,
      suspense: vnode.suspense,
      ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
      ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
      placeholder: vnode.placeholder,
      el: vnode.el,
      anchor: vnode.anchor,
      ctx: vnode.ctx,
      ce: vnode.ce,
      cacheIndex: vnode.cacheIndex
    };
    if (transition && cloneTransition) {
      setTransitionHooks(
        cloned,
        transition.clone(cloned)
      );
    }
    return cloned;
  }
  function createTextVNode(text = " ", flag = 0) {
    return createVNode(Text, null, text, flag);
  }
  function createStaticVNode(content, numberOfNodes) {
    const vnode = createVNode(Static, null, content);
    vnode.staticCount = numberOfNodes;
    return vnode;
  }
  function createCommentVNode(text = "", asBlock = false) {
    return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
  }
  function normalizeVNode(child) {
    if (child == null || typeof child === "boolean") {
      return createVNode(Comment);
    } else if (isArray(child)) {
      return createVNode(
        Fragment,
        null,
        // #3666, avoid reference pollution when reusing vnode
        child.slice()
      );
    } else if (isVNode(child)) {
      return cloneIfMounted(child);
    } else {
      return createVNode(Text, null, String(child));
    }
  }
  function cloneIfMounted(child) {
    return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
  }
  function normalizeChildren(vnode, children) {
    let type = 0;
    const { shapeFlag } = vnode;
    if (children == null) {
      children = null;
    } else if (isArray(children)) {
      type = 16;
    } else if (typeof children === "object") {
      if (shapeFlag & (1 | 64)) {
        const slot = children.default;
        if (slot) {
          slot._c && (slot._d = false);
          normalizeChildren(vnode, slot());
          slot._c && (slot._d = true);
        }
        return;
      } else {
        type = 32;
        const slotFlag = children._;
        if (!slotFlag && !isInternalObject(children)) {
          children._ctx = currentRenderingInstance;
        } else if (slotFlag === 3 && currentRenderingInstance) {
          if (currentRenderingInstance.slots._ === 1) {
            children._ = 1;
          } else {
            children._ = 2;
            vnode.patchFlag |= 1024;
          }
        }
      }
    } else if (isFunction(children)) {
      if (shapeFlag & (1 | 64)) {
        normalizeChildren(vnode, { default: children });
        return;
      }
      children = { default: children, _ctx: currentRenderingInstance };
      type = 32;
    } else {
      children = String(children);
      if (shapeFlag & 64) {
        type = 16;
        children = [createTextVNode(children)];
      } else {
        type = 8;
      }
    }
    vnode.children = children;
    vnode.shapeFlag |= type;
  }
  function mergeProps(...args) {
    const ret = {};
    for (let i = 0; i < args.length; i++) {
      const toMerge = args[i];
      for (const key in toMerge) {
        if (key === "class") {
          if (ret.class !== toMerge.class) {
            ret.class = normalizeClass([ret.class, toMerge.class]);
          }
        } else if (key === "style") {
          ret.style = normalizeStyle([ret.style, toMerge.style]);
        } else if (isOn(key)) {
          const existing = ret[key];
          const incoming = toMerge[key];
          if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
            ret[key] = existing ? [].concat(existing, incoming) : incoming;
          } else if (incoming == null && existing == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
          // the model listener.
          !isModelListener(key)) {
            ret[key] = incoming;
          }
        } else if (key !== "") {
          ret[key] = toMerge[key];
        }
      }
    }
    return ret;
  }
  function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
    callWithAsyncErrorHandling(hook, instance, 7, [
      vnode,
      prevVNode
    ]);
  }
  const emptyAppContext = createAppContext();
  let uid = 0;
  function createComponentInstance(vnode, parent, suspense) {
    const type = vnode.type;
    const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
    const instance = {
      uid: uid++,
      vnode,
      type,
      parent,
      appContext,
      root: null,
      // to be immediately set
      next: null,
      subTree: null,
      // will be set synchronously right after creation
      effect: null,
      update: null,
      // will be set synchronously right after creation
      job: null,
      scope: new EffectScope(
        true
        /* detached */
      ),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: parent ? parent.provides : Object.create(appContext.provides),
      ids: parent ? parent.ids : ["", 0, 0],
      accessCache: null,
      renderCache: [],
      // local resolved assets
      components: null,
      directives: null,
      // resolved props and emits options
      propsOptions: normalizePropsOptions(type, appContext),
      emitsOptions: normalizeEmitsOptions(type, appContext),
      // emit
      emit: null,
      // to be set immediately
      emitted: null,
      // props default value
      propsDefaults: EMPTY_OBJ,
      // inheritAttrs
      inheritAttrs: type.inheritAttrs,
      // state
      ctx: EMPTY_OBJ,
      data: EMPTY_OBJ,
      props: EMPTY_OBJ,
      attrs: EMPTY_OBJ,
      slots: EMPTY_OBJ,
      refs: EMPTY_OBJ,
      setupState: EMPTY_OBJ,
      setupContext: null,
      // suspense related
      suspense,
      suspenseId: suspense ? suspense.pendingId : 0,
      asyncDep: null,
      asyncResolved: false,
      // lifecycle hooks
      // not using enums here because it results in computed properties
      isMounted: false,
      isUnmounted: false,
      isDeactivated: false,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
    {
      instance.ctx = { _: instance };
    }
    instance.root = parent ? parent.root : instance;
    instance.emit = emit.bind(null, instance);
    if (vnode.ce) {
      vnode.ce(instance);
    }
    return instance;
  }
  let currentInstance = null;
  const getCurrentInstance = () => currentInstance || currentRenderingInstance;
  let internalSetCurrentInstance;
  let setInSSRSetupState;
  {
    const g = getGlobalThis();
    const registerGlobalSetter = (key, setter) => {
      let setters;
      if (!(setters = g[key])) setters = g[key] = [];
      setters.push(setter);
      return (v) => {
        if (setters.length > 1) setters.forEach((set) => set(v));
        else setters[0](v);
      };
    };
    internalSetCurrentInstance = registerGlobalSetter(
      `__VUE_INSTANCE_SETTERS__`,
      (v) => currentInstance = v
    );
    setInSSRSetupState = registerGlobalSetter(
      `__VUE_SSR_SETTERS__`,
      (v) => isInSSRComponentSetup = v
    );
  }
  const setCurrentInstance = (instance) => {
    const prev = currentInstance;
    internalSetCurrentInstance(instance);
    instance.scope.on();
    return () => {
      instance.scope.off();
      internalSetCurrentInstance(prev);
    };
  };
  const unsetCurrentInstance = () => {
    currentInstance && currentInstance.scope.off();
    internalSetCurrentInstance(null);
  };
  function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4;
  }
  let isInSSRComponentSetup = false;
  function setupComponent(instance, isSSR = false, optimized = false) {
    isSSR && setInSSRSetupState(isSSR);
    const { props, children } = instance.vnode;
    const isStateful = isStatefulComponent(instance);
    initProps(instance, props, isStateful, isSSR);
    initSlots(instance, children, optimized || isSSR);
    const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
    isSSR && setInSSRSetupState(false);
    return setupResult;
  }
  function setupStatefulComponent(instance, isSSR) {
    const Component = instance.type;
    instance.accessCache = /* @__PURE__ */ Object.create(null);
    instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
    const { setup } = Component;
    if (setup) {
      pauseTracking();
      const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
      const reset = setCurrentInstance(instance);
      const setupResult = callWithErrorHandling(
        setup,
        instance,
        0,
        [
          instance.props,
          setupContext
        ]
      );
      const isAsyncSetup = isPromise(setupResult);
      resetTracking();
      reset();
      if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
        markAsyncBoundary(instance);
      }
      if (isAsyncSetup) {
        setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
        if (isSSR) {
          return setupResult.then((resolvedResult) => {
            setInSSRSetupState(true);
            try {
              handleSetupResult(instance, resolvedResult, isSSR);
            } finally {
              setInSSRSetupState(false);
            }
          }).catch((e) => {
            handleError(e, instance, 0);
          });
        } else {
          instance.asyncDep = setupResult;
        }
      } else {
        handleSetupResult(instance, setupResult);
      }
    } else {
      finishComponentSetup(instance);
    }
  }
  function handleSetupResult(instance, setupResult, isSSR) {
    if (isFunction(setupResult)) {
      if (instance.type.__ssrInlineRender) {
        instance.ssrRender = setupResult;
      } else {
        instance.render = setupResult;
      }
    } else if (isObject(setupResult)) {
      instance.setupState = proxyRefs(setupResult);
    } else ;
    finishComponentSetup(instance);
  }
  function finishComponentSetup(instance, isSSR, skipOptions) {
    const Component = instance.type;
    if (!instance.render) {
      instance.render = Component.render || NOOP;
    }
    {
      const reset = setCurrentInstance(instance);
      pauseTracking();
      try {
        applyOptions(instance);
      } finally {
        resetTracking();
        reset();
      }
    }
  }
  const attrsProxyHandlers = {
    get(target, key) {
      track(target, "get", "");
      return target[key];
    }
  };
  function createSetupContext(instance) {
    const expose = (exposed) => {
      instance.exposed = exposed || {};
    };
    {
      return {
        attrs: new Proxy(instance.attrs, attrsProxyHandlers),
        slots: instance.slots,
        emit: instance.emit,
        expose
      };
    }
  }
  function getComponentPublicInstance(instance) {
    if (instance.exposed) {
      return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
        get(target, key) {
          if (key in target) {
            return target[key];
          } else if (key in publicPropertiesMap) {
            return publicPropertiesMap[key](instance);
          }
        },
        has(target, key) {
          return key in target || key in publicPropertiesMap;
        }
      }));
    } else {
      return instance.proxy;
    }
  }
  const classifyRE = /(?:^|[-_])\w/g;
  const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
  function getComponentName(Component, includeInferred = true) {
    return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
  }
  function formatComponentName(instance, Component, isRoot = false) {
    let name = getComponentName(Component);
    if (!name && Component.__file) {
      const match = Component.__file.match(/([^/\\]+)\.\w+$/);
      if (match) {
        name = match[1];
      }
    }
    if (!name && instance) {
      const inferFromRegistry = (registry2) => {
        for (const key in registry2) {
          if (registry2[key] === Component) {
            return key;
          }
        }
      };
      name = inferFromRegistry(instance.components) || instance.parent && inferFromRegistry(
        instance.parent.type.components
      ) || inferFromRegistry(instance.appContext.components);
    }
    return name ? classify(name) : isRoot ? `App` : `Anonymous`;
  }
  function isClassComponent(value) {
    return isFunction(value) && "__vccOpts" in value;
  }
  const computed = (getterOrOptions, debugOptions) => {
    const c = /* @__PURE__ */ computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
    return c;
  };
  const version = "3.5.43";
  /**
  * @vue/runtime-dom v3.5.43
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  let policy = void 0;
  const tt = typeof window !== "undefined" && window.trustedTypes;
  if (tt) {
    try {
      policy = /* @__PURE__ */ tt.createPolicy("vue", {
        createHTML: (val) => val
      });
    } catch (e) {
    }
  }
  const unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
  const svgNS = "http://www.w3.org/2000/svg";
  const mathmlNS = "http://www.w3.org/1998/Math/MathML";
  const doc = typeof document !== "undefined" ? document : null;
  const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
  const nodeOps = {
    insert: (child, parent, anchor) => {
      parent.insertBefore(child, anchor || null);
    },
    remove: (child) => {
      const parent = child.parentNode;
      if (parent) {
        parent.removeChild(child);
      }
    },
    createElement: (tag, namespace, is, props) => {
      const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
      if (tag === "select" && props && props.multiple != null) {
        el.setAttribute("multiple", props.multiple);
      }
      return el;
    },
    createText: (text) => doc.createTextNode(text),
    createComment: (text) => doc.createComment(text),
    setText: (node, text) => {
      node.nodeValue = text;
    },
    setElementText: (el, text) => {
      el.textContent = text;
    },
    parentNode: (node) => node.parentNode,
    nextSibling: (node) => node.nextSibling,
    querySelector: (selector) => doc.querySelector(selector),
    setScopeId(el, id) {
      el.setAttribute(id, "");
    },
    // __UNSAFE__
    // Reason: innerHTML.
    // Static content here can only come from compiled templates.
    // As long as the user only uses trusted templates, this is safe.
    insertStaticContent(content, parent, anchor, namespace, start, end) {
      const before = anchor ? anchor.previousSibling : parent.lastChild;
      if (start && (start === end || start.nextSibling)) {
        while (true) {
          parent.insertBefore(start.cloneNode(true), anchor);
          if (start === end || !(start = start.nextSibling)) break;
        }
      } else {
        templateContainer.innerHTML = unsafeToTrustedHTML(
          namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content
        );
        const template = templateContainer.content;
        if (namespace === "svg" || namespace === "mathml") {
          const wrapper = template.firstChild;
          while (wrapper.firstChild) {
            template.appendChild(wrapper.firstChild);
          }
          template.removeChild(wrapper);
        }
        parent.insertBefore(template, anchor);
      }
      return [
        // first
        before ? before.nextSibling : parent.firstChild,
        // last
        anchor ? anchor.previousSibling : parent.lastChild
      ];
    }
  };
  const vtcKey = /* @__PURE__ */ Symbol("_vtc");
  function patchClass(el, value, isSVG) {
    const transitionClasses = el[vtcKey];
    if (transitionClasses) {
      value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
    }
    if (value == null) {
      el.removeAttribute("class");
    } else if (isSVG) {
      el.setAttribute("class", value);
    } else {
      el.className = value;
    }
  }
  const vShowOriginalDisplay = /* @__PURE__ */ Symbol("_vod");
  const vShowHidden = /* @__PURE__ */ Symbol("_vsh");
  const CSS_VAR_TEXT = /* @__PURE__ */ Symbol("");
  const displayRE = /(?:^|;)\s*display\s*:/;
  function patchStyle(el, prev, next) {
    const style = el.style;
    const isCssString = isString(next);
    let hasControlledDisplay = false;
    if (next && !isCssString) {
      if (prev) {
        if (!isString(prev)) {
          for (const key in prev) {
            if (next[key] == null) {
              setStyle(style, key, "");
            }
          }
        } else {
          for (const prevStyle of prev.split(";")) {
            const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
            if (next[key] == null) {
              setStyle(style, key, "");
            }
          }
        }
      }
      for (const key in next) {
        if (key === "display") {
          hasControlledDisplay = true;
        }
        const value = next[key];
        if (value != null) {
          if (!shouldPreserveTextareaResizeStyle(
            el,
            key,
            !isString(prev) && prev ? prev[key] : void 0,
            value
          )) {
            setStyle(style, key, value);
          }
        } else {
          setStyle(style, key, "");
        }
      }
    } else {
      if (isCssString) {
        if (prev !== next) {
          const cssVarText = style[CSS_VAR_TEXT];
          if (cssVarText) {
            next += ";" + cssVarText;
          }
          style.cssText = next;
          hasControlledDisplay = displayRE.test(next);
        }
      } else if (prev) {
        el.removeAttribute("style");
      }
    }
    if (vShowOriginalDisplay in el) {
      el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
      if (el[vShowHidden]) {
        style.display = "none";
      }
    }
  }
  const importantRE = /\s*!important$/;
  function setStyle(style, name, val) {
    if (isArray(val)) {
      val.forEach((v) => setStyle(style, name, v));
    } else {
      if (val == null) val = "";
      if (name.startsWith("--")) {
        if (importantRE.test(val)) {
          style.setProperty(name, val.replace(importantRE, ""), "important");
        } else {
          style.setProperty(name, val);
        }
      } else {
        const prefixed = autoPrefix(style, name);
        if (importantRE.test(val)) {
          style.setProperty(
            hyphenate(prefixed),
            val.replace(importantRE, ""),
            "important"
          );
        } else {
          style[prefixed] = val;
        }
      }
    }
  }
  const prefixes = ["Webkit", "Moz", "ms"];
  const prefixCache = {};
  function autoPrefix(style, rawName) {
    const cached = prefixCache[rawName];
    if (cached) {
      return cached;
    }
    let name = camelize(rawName);
    if (name !== "filter" && name in style) {
      return prefixCache[rawName] = name;
    }
    name = capitalize(name);
    for (let i = 0; i < prefixes.length; i++) {
      const prefixed = prefixes[i] + name;
      if (prefixed in style) {
        return prefixCache[rawName] = prefixed;
      }
    }
    return rawName;
  }
  function shouldPreserveTextareaResizeStyle(el, key, prev, next) {
    return el.tagName === "TEXTAREA" && (key === "width" || key === "height") && isString(next) && prev === next;
  }
  const xlinkNS = "http://www.w3.org/1999/xlink";
  function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
    if (isSVG && key.startsWith("xlink:")) {
      if (value == null) {
        el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      if (value == null || isBoolean && !includeBooleanAttr(value)) {
        el.removeAttribute(key);
      } else {
        el.setAttribute(
          key,
          isBoolean ? "" : isSymbol(value) ? String(value) : value
        );
      }
    }
  }
  function patchDOMProp(el, key, value, parentComponent, attrName) {
    if (key === "innerHTML" || key === "textContent") {
      if (value != null) {
        el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
      }
      return;
    }
    const tag = el.tagName;
    if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
    !tag.includes("-")) {
      const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
      const newValue = value == null ? (
        // #11647: value should be set as empty string for null and undefined,
        // but <input type="checkbox"> should be set as 'on'.
        el.type === "checkbox" ? "on" : ""
      ) : String(value);
      if (oldValue !== newValue || !("_value" in el)) {
        el.value = newValue;
      }
      if (value == null) {
        el.removeAttribute(key);
      }
      el._value = value;
      return;
    }
    let needRemove = false;
    if (value === "" || value == null) {
      const type = typeof el[key];
      if (type === "boolean") {
        value = includeBooleanAttr(value);
      } else if (value == null && type === "string") {
        value = "";
        needRemove = true;
      } else if (type === "number") {
        value = 0;
        needRemove = true;
      }
    }
    try {
      el[key] = value;
    } catch (e) {
    }
    needRemove && el.removeAttribute(attrName || key);
  }
  function addEventListener(el, event, handler, options) {
    el.addEventListener(event, handler, options);
  }
  function removeEventListener(el, event, handler, options) {
    el.removeEventListener(event, handler, options);
  }
  const veiKey = /* @__PURE__ */ Symbol("_vei");
  function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
    const invokers = el[veiKey] || (el[veiKey] = {});
    const existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) {
      existingInvoker.value = nextValue;
    } else {
      const [name, options] = parseName(rawName);
      if (nextValue) {
        const invoker = invokers[rawName] = createInvoker(
          nextValue,
          instance
        );
        addEventListener(el, name, invoker, options);
      } else if (existingInvoker) {
        removeEventListener(el, name, existingInvoker, options);
        invokers[rawName] = void 0;
      }
    }
  }
  const optionsModifierRE = /(Once|Passive|Capture)$/;
  const optionsModifierEventRE = /^on:?(?:Once|Passive|Capture)$/;
  function parseName(name) {
    let options;
    let m;
    while ((m = name.match(optionsModifierRE)) && !optionsModifierEventRE.test(name)) {
      if (!options) options = {};
      name = name.slice(0, name.length - m[1].length);
      options[m[1].toLowerCase()] = true;
    }
    const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
    return [event, options];
  }
  let cachedNow = 0;
  const p = /* @__PURE__ */ Promise.resolve();
  const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
  function createInvoker(initialValue, instance) {
    const invoker = (e) => {
      if (!e._vts) {
        e._vts = Date.now();
      } else if (e._vts <= invoker.attached) {
        return;
      }
      const value = invoker.value;
      if (isArray(value)) {
        const originalStop = e.stopImmediatePropagation;
        e.stopImmediatePropagation = () => {
          originalStop.call(e);
          e._stopped = true;
        };
        const handlers = value.slice();
        const args = [e];
        for (let i = 0; i < handlers.length; i++) {
          if (e._stopped) {
            break;
          }
          const handler = handlers[i];
          if (handler) {
            callWithAsyncErrorHandling(
              handler,
              instance,
              5,
              args
            );
          }
        }
      } else {
        callWithAsyncErrorHandling(
          value,
          instance,
          5,
          [e]
        );
      }
    };
    invoker.value = initialValue;
    invoker.attached = getNow();
    return invoker;
  }
  const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
  key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
  const patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
    const isSVG = namespace === "svg";
    if (key === "class") {
      patchClass(el, nextValue, isSVG);
    } else if (key === "style") {
      patchStyle(el, prevValue, nextValue);
    } else if (isOn(key)) {
      if (!isModelListener(key)) {
        patchEvent(el, key, prevValue, nextValue, parentComponent);
      }
    } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
      patchDOMProp(el, key, nextValue);
      if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
        patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
      }
    } else if (
      // #11081 force set props for possible async custom element
      el._isVueCE && // #12408 check if it's declared prop or it's async custom element
      (shouldSetAsPropForVueCE(el, key) || // @ts-expect-error _def is private
      el._def.__asyncLoader && (/[A-Z]/.test(key) || !isString(nextValue)))
    ) {
      patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
    } else {
      if (key === "true-value") {
        el._trueValue = nextValue;
      } else if (key === "false-value") {
        el._falseValue = nextValue;
      }
      patchAttr(el, key, nextValue, isSVG);
    }
  };
  function shouldSetAsProp(el, key, value, isSVG) {
    if (isSVG) {
      if (key === "innerHTML" || key === "textContent") {
        return true;
      }
      if (key in el && isNativeOn(key) && isFunction(value)) {
        return true;
      }
      return false;
    }
    if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") {
      return false;
    }
    if (key === "sandbox" && el.tagName === "IFRAME") {
      return false;
    }
    if (key === "form") {
      return false;
    }
    if (key === "list" && el.tagName === "INPUT") {
      return false;
    }
    if (key === "type" && el.tagName === "TEXTAREA") {
      return false;
    }
    if (key === "width" || key === "height") {
      const tag = el.tagName;
      if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
        return false;
      }
    }
    if (isNativeOn(key) && isString(value)) {
      return false;
    }
    return key in el;
  }
  function shouldSetAsPropForVueCE(el, key) {
    const props = (
      // @ts-expect-error _def is private
      el._def.props
    );
    if (!props) {
      return false;
    }
    const camelKey = camelize(key);
    return Array.isArray(props) ? props.some((prop) => camelize(prop) === camelKey) : Object.keys(props).some((prop) => camelize(prop) === camelKey);
  }
  const getModelAssigner = (vnode) => {
    const fn = vnode.props["onUpdate:modelValue"] || false;
    return isArray(fn) ? (value) => invokeArrayFns(fn, value) : fn;
  };
  function onCompositionStart(e) {
    e.target.composing = true;
  }
  function onCompositionEnd(e) {
    const target = e.target;
    if (target.composing) {
      target.composing = false;
      target.dispatchEvent(new Event("input"));
    }
  }
  const assignKey = /* @__PURE__ */ Symbol("_assign");
  const initialValueKey = /* @__PURE__ */ Symbol("_initialValue");
  function castValue(value, trim, number) {
    if (trim) value = value.trim();
    if (number) value = looseToNumber(value);
    return value;
  }
  const vModelText = {
    created(el, { modifiers: { lazy, trim, number } }, vnode) {
      if (el.parentNode) {
        if (el.type === "text") {
          el[initialValueKey] = el.defaultValue.replace(/[\r\n]/g, "");
        } else if (el.type === "textarea") {
          el[initialValueKey] = el.defaultValue.replace(/\r\n?/g, "\n");
        }
      }
      el[assignKey] = getModelAssigner(vnode);
      const castToNumber = number || vnode.props && vnode.props.type === "number";
      addEventListener(el, lazy ? "change" : "input", (e) => {
        if (e.target.composing) return;
        el[assignKey](castValue(el.value, trim, castToNumber));
      });
      if (trim || castToNumber) {
        addEventListener(el, "change", () => {
          el.value = castValue(el.value, trim, castToNumber);
        });
      }
      if (!lazy) {
        addEventListener(el, "compositionstart", onCompositionStart);
        addEventListener(el, "compositionend", onCompositionEnd);
        addEventListener(el, "change", onCompositionEnd);
      }
    },
    // set value on mounted so it's after min/max for type="range"
    mounted(el, { value, modifiers: { trim, number } }) {
      const newValue = value == null ? "" : value;
      const initialValue = el[initialValueKey];
      delete el[initialValueKey];
      if (initialValue !== void 0 && (el.type === "text" || el.type === "textarea") && el.value !== initialValue) {
        el[assignKey](castValue(el.value, trim, number));
      } else {
        el.value = newValue;
      }
    },
    beforeUpdate(el, { value, oldValue, modifiers: { lazy, trim, number } }, vnode) {
      el[assignKey] = getModelAssigner(vnode);
      if (el.composing) return;
      const elValue = (number || el.type === "number") && !/^0\d/.test(el.value) ? looseToNumber(el.value) : el.value;
      const newValue = value == null ? "" : value;
      if (elValue === newValue) {
        return;
      }
      const rootNode = el.getRootNode();
      if ((rootNode instanceof Document || rootNode instanceof ShadowRoot) && rootNode.activeElement === el && el.type !== "range") {
        if (lazy && value === oldValue) {
          return;
        }
        if (trim && el.value.trim() === newValue) {
          return;
        }
      }
      el.value = newValue;
    }
  };
  const vModelCheckbox = {
    // #4096 array checkboxes need to be deep traversed
    deep: true,
    created(el, _, vnode) {
      el[assignKey] = getModelAssigner(vnode);
      addEventListener(el, "change", () => {
        const modelValue = el._modelValue;
        const elementValue = getValue$1(el);
        const checked = el.checked;
        const assign2 = el[assignKey];
        if (isArray(modelValue)) {
          const index = looseIndexOf(modelValue, elementValue);
          const found = index !== -1;
          if (checked && !found) {
            assign2(modelValue.concat(elementValue));
          } else if (!checked && found) {
            const filtered = [...modelValue];
            filtered.splice(index, 1);
            assign2(filtered);
          }
        } else if (isSet(modelValue)) {
          const cloned = new Set(modelValue);
          if (checked) {
            cloned.add(elementValue);
          } else {
            cloned.delete(elementValue);
          }
          assign2(cloned);
        } else {
          assign2(getCheckboxValue(el, checked));
        }
      });
    },
    // set initial checked on mount to wait for true-value/false-value
    mounted: setChecked,
    beforeUpdate(el, binding, vnode) {
      el[assignKey] = getModelAssigner(vnode);
      setChecked(el, binding, vnode);
    }
  };
  function setChecked(el, { value, oldValue }, vnode) {
    el._modelValue = value;
    let checked;
    if (isArray(value)) {
      checked = looseIndexOf(value, vnode.props.value) > -1;
    } else if (isSet(value)) {
      checked = value.has(vnode.props.value);
    } else {
      if (value === oldValue) return;
      checked = looseEqual(value, getCheckboxValue(el, true));
    }
    if (el.checked !== checked) {
      el.checked = checked;
    }
  }
  const vModelRadio = {
    created(el, { value }, vnode) {
      el.checked = looseEqual(value, vnode.props.value);
      el[assignKey] = getModelAssigner(vnode);
      addEventListener(el, "change", () => {
        el[assignKey](getValue$1(el));
      });
    },
    beforeUpdate(el, { value, oldValue }, vnode) {
      el[assignKey] = getModelAssigner(vnode);
      if (value !== oldValue) {
        el.checked = looseEqual(value, vnode.props.value);
      }
    }
  };
  const vModelSelect = {
    // <select multiple> value need to be deep traversed
    deep: true,
    created(el, { value, modifiers: { number } }, vnode) {
      el._modelValue = value;
      addEventListener(el, "change", () => {
        const selectedVal = Array.prototype.filter.call(el.options, (o) => o.selected).map(
          (o) => number ? looseToNumber(getValue$1(o)) : getValue$1(o)
        );
        const multiple = el.multiple;
        const assignedValue = multiple ? isSet(el._modelValue) ? new Set(selectedVal) : selectedVal : selectedVal[0];
        const pending = el._pendingValue = [
          multiple,
          multiple ? isArray(assignedValue) ? selectedVal.slice() : selectedVal : assignedValue
        ];
        try {
          el[assignKey](assignedValue);
        } finally {
          nextTick(() => {
            if (el._pendingValue === pending) {
              el._pendingValue = void 0;
            }
          });
        }
      });
      el[assignKey] = getModelAssigner(vnode);
    },
    // set value in mounted & updated because <select> relies on its children
    // <option>s.
    mounted(el, { value }) {
      setSelected(el, value);
    },
    beforeUpdate(el, { value }, vnode) {
      el._modelValue = value;
      el[assignKey] = getModelAssigner(vnode);
    },
    updated(el, { value }) {
      const pending = el._pendingValue;
      el._pendingValue = void 0;
      if (!pending || pending[0] !== el.multiple || !isSameSelectValue(value, pending[1], pending[0])) {
        setSelected(el, value);
      }
    }
  };
  function isSameSelectValue(value, assignedValue, multiple) {
    if (!multiple) return looseEqual(value, assignedValue);
    if (isArray(value)) return looseEqual(value, assignedValue);
    if (isSet(value)) {
      if (value.size !== assignedValue.length) return false;
      for (const item of assignedValue) {
        if (!value.has(item)) return false;
      }
      return true;
    }
    return false;
  }
  function setSelected(el, value) {
    const isMultiple = el.multiple;
    const isArrayValue = isArray(value);
    if (isMultiple && !isArrayValue && !isSet(value)) {
      return;
    }
    for (let i = 0, l = el.options.length; i < l; i++) {
      const option = el.options[i];
      const optionValue = getValue$1(option);
      if (isMultiple) {
        if (isArrayValue) {
          const optionType = typeof optionValue;
          if (optionType === "string" || optionType === "number") {
            option.selected = value.some((v) => String(v) === String(optionValue));
          } else {
            option.selected = looseIndexOf(value, optionValue) > -1;
          }
        } else {
          option.selected = value.has(optionValue);
        }
      } else if (looseEqual(getValue$1(option), value)) {
        if (el.selectedIndex !== i) el.selectedIndex = i;
        return;
      }
    }
    if (!isMultiple && el.selectedIndex !== -1) {
      el.selectedIndex = -1;
    }
  }
  function getValue$1(el) {
    return "_value" in el ? el._value : el.value;
  }
  function getCheckboxValue(el, checked) {
    const key = checked ? "_trueValue" : "_falseValue";
    return key in el ? el[key] : checked;
  }
  const vModelDynamic = {
    created(el, binding, vnode) {
      callModelHook(el, binding, vnode, null, "created");
    },
    mounted(el, binding, vnode) {
      callModelHook(el, binding, vnode, null, "mounted");
    },
    beforeUpdate(el, binding, vnode, prevVNode) {
      callModelHook(el, binding, vnode, prevVNode, "beforeUpdate");
    },
    updated(el, binding, vnode, prevVNode) {
      callModelHook(el, binding, vnode, prevVNode, "updated");
    }
  };
  function resolveDynamicModel(tagName, type) {
    switch (tagName) {
      case "SELECT":
        return vModelSelect;
      case "TEXTAREA":
        return vModelText;
      default:
        switch (type) {
          case "checkbox":
            return vModelCheckbox;
          case "radio":
            return vModelRadio;
          default:
            return vModelText;
        }
    }
  }
  function callModelHook(el, binding, vnode, prevVNode, hook) {
    const modelToUse = resolveDynamicModel(
      el.tagName,
      vnode.props && vnode.props.type
    );
    const fn = modelToUse[hook];
    fn && fn(el, binding, vnode, prevVNode);
  }
  const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
  let renderer;
  function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions));
  }
  const createApp = ((...args) => {
    const app = ensureRenderer().createApp(...args);
    const { mount } = app;
    app.mount = (containerOrSelector) => {
      const container = normalizeContainer(containerOrSelector);
      if (!container) return;
      const component = app._component;
      if (!isFunction(component) && !component.render && !component.template) {
        component.template = container.innerHTML;
      }
      if (container.nodeType === 1) {
        container.textContent = "";
      }
      const proxy = mount(container, false, resolveRootNamespace(container));
      if (container instanceof Element) {
        container.removeAttribute("v-cloak");
        container.setAttribute("data-v-app", "");
      }
      return proxy;
    };
    return app;
  });
  function resolveRootNamespace(container) {
    if (container instanceof SVGElement) {
      return "svg";
    }
    if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
      return "mathml";
    }
  }
  function normalizeContainer(container) {
    if (isString(container)) {
      const res = document.querySelector(container);
      return res;
    }
    return container;
  }
  /*!
   * pinia v2.3.1
   * (c) 2025 Eduardo San Martin Morote
   * @license MIT
   */
  let activePinia;
  const setActivePinia = (pinia2) => activePinia = pinia2;
  const piniaSymbol = (
    /* istanbul ignore next */
    Symbol()
  );
  function isPlainObject(o) {
    return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  function createPinia() {
    const scope = effectScope(true);
    const state = scope.run(() => /* @__PURE__ */ ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia2 = markRaw({
      install(app) {
        setActivePinia(pinia2);
        {
          pinia2._a = app;
          app.provide(piniaSymbol, pinia2);
          app.config.globalProperties.$pinia = pinia2;
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && true) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    return pinia2;
  }
  const noop = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && getCurrentScope()) {
      onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  const fallbackRunWithContext = (fn) => fn();
  const ACTION_MARKER = Symbol();
  const ACTION_NAME = Symbol();
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target.set(key, value));
    } else if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !/* @__PURE__ */ isRef(subPatch) && !/* @__PURE__ */ isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = (
    /* istanbul ignore next */
    Symbol()
  );
  function shouldHydrate(obj) {
    return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign } = Object;
  function isComputed(o) {
    return !!(/* @__PURE__ */ isRef(o) && o.effect);
  }
  function createOptionsStore(id, options, pinia2, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia2.state.value[id];
    let store;
    function setup() {
      if (!initialState && true) {
        {
          pinia2.state.value[id] = state ? state() : {};
        }
      }
      const localState = /* @__PURE__ */ toRefs(pinia2.state.value[id]);
      return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        computedGetters[name] = markRaw(computed(() => {
          setActivePinia(pinia2);
          const store2 = pinia2._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia2, hot, true);
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia2, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({ actions: {} }, options);
    const $subscribeOptions = { deep: true };
    let isListening;
    let isSyncListening;
    let subscriptions = [];
    let actionSubscriptions = [];
    let debuggerEvents;
    const initialState = pinia2.state.value[$id];
    if (!isOptionsStore && !initialState && true) {
      {
        pinia2.state.value[$id] = {};
      }
    }
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia2.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia2.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia2.state.value[$id]);
    }
    const $reset = isOptionsStore ? function $reset2() {
      const { state } = options;
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign($state, newState);
      });
    } : (
      /* istanbul ignore next */
      noop
    );
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia2._s.delete($id);
    }
    const action = (fn, name = "") => {
      if (ACTION_MARKER in fn) {
        fn[ACTION_NAME] = name;
        return fn;
      }
      const wrappedAction = function() {
        setActivePinia(pinia2);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name: wrappedAction[ACTION_NAME],
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = fn.apply(this && this.$id === $id ? this : store, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
      wrappedAction[ACTION_MARKER] = true;
      wrappedAction[ACTION_NAME] = name;
      return wrappedAction;
    };
    const partialStore = {
      _p: pinia2,
      // _s: scope,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => watch(() => pinia2.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = /* @__PURE__ */ reactive(partialStore);
    pinia2._s.set($id, store);
    const runWithContext = pinia2._a && pinia2._a.runWithContext || fallbackRunWithContext;
    const setupStore = runWithContext(() => pinia2._e.run(() => (scope = effectScope()).run(() => setup({ action }))));
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (/* @__PURE__ */ isRef(prop) && !isComputed(prop) || /* @__PURE__ */ isReactive(prop)) {
        if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (/* @__PURE__ */ isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia2.state.value[$id][key] = prop;
          }
        }
      } else if (typeof prop === "function") {
        const actionValue = action(prop, key);
        {
          setupStore[key] = actionValue;
        }
        optionsForPlugin.actions[key] = prop;
      } else ;
    }
    {
      assign(store, setupStore);
      assign(/* @__PURE__ */ toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: () => pinia2.state.value[$id],
      set: (state) => {
        $patch(($state) => {
          assign($state, state);
        });
      }
    });
    pinia2._p.forEach((extender) => {
      {
        assign(store, scope.run(() => extender({
          store,
          app: pinia2._a,
          pinia: pinia2,
          options: optionsForPlugin
        })));
      }
    });
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  /*! #__NO_SIDE_EFFECTS__ */
  // @__NO_SIDE_EFFECTS__
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
    }
    function useStore(pinia2, hot) {
      const hasContext = hasInjectionContext();
      pinia2 = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      pinia2 || (hasContext ? inject(piniaSymbol, null) : null);
      if (pinia2)
        setActivePinia(pinia2);
      pinia2 = activePinia;
      if (!pinia2._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia2);
        } else {
          createOptionsStore(id, options, pinia2);
        }
      }
      const store = pinia2._s.get(id);
      return store;
    }
    useStore.$id = id;
    return useStore;
  }
  function detectPage(pathname) {
    if (/^\/settings\/edit\/?$/.test(pathname)) {
      return "settings";
    }
    if (/^\/galleries(\/|$)/.test(pathname)) {
      return "gallery";
    }
    if (/^\/images\/\d+(\/|$)/.test(pathname) || /^\/\d+(\/|$)/.test(pathname)) {
      return "image";
    }
    if (/^\/(images|search|tags|profiles)(\/|$)/.test(pathname) || pathname === "/") {
      return "list";
    }
    return "other";
  }
  function getValue(key, defaultValue) {
    const raw = GM_getValue(key);
    if (raw === void 0) {
      return defaultValue;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return defaultValue;
    }
  }
  function setValue(key, value) {
    GM_setValue(key, JSON.stringify(value));
  }
  function onValueChanged(key, callback) {
    const listenerId = GM_addValueChangeListener(key, (_name, _oldValue, newValue, remote) => {
      if (!remote || newValue === void 0) {
        return;
      }
      try {
        callback(JSON.parse(newValue));
      } catch {
      }
    });
    return () => GM_removeValueChangeListener(listenerId);
  }
  const ALIAS_MAP = {
    "trixiebooru.org": "derpibooru.org",
    "tentabus.ai": "lunabooru.org"
  };
  function resolveInstanceId(hostname) {
    const match = Object.entries(ALIAS_MAP).find(([alias]) => hostname.endsWith(alias));
    return match ? match[1] : hostname;
  }
  function migrateInstanceKeyedData(data, merge) {
    const result = {};
    for (const [storedKey, value] of Object.entries(data)) {
      const canonicalId = resolveInstanceId(storedKey);
      result[canonicalId] = canonicalId in result ? merge(result[canonicalId], value) : value;
    }
    return result;
  }
  const SETTINGS_STORAGE_KEY = "lodestone-userscript-settings";
  const settingsDefaults = {
    errorReportingEnabled: true,
    sentryDsn: "",
    biggerButtonsEnabled: false,
    listButtonSize: 24,
    imageButtonSize: 24,
    voteProgressEnabled: true,
    voteHoverStyleEnabled: true,
    hiddenButtonIds: [],
    galleryProgressEnabled: true,
    galleryFullPageEnabled: false,
    gallerySortAlphabetical: false,
    galleryLeftAlign: false,
    galleryShowIcons: false,
    pinnedGalleryIdsByInstance: {}
  };
  function isRecord$3(value) {
    return typeof value === "object" && value !== null;
  }
  function normalizeSettingsState(raw) {
    const record = isRecord$3(raw) ? { ...raw } : {};
    const legacyPinnedGalleryIds = record.pinnedGalleryIds;
    delete record.pinnedGalleryIds;
    const pinnedGalleryIdsByInstance = Array.isArray(legacyPinnedGalleryIds) && legacyPinnedGalleryIds.length > 0 ? { [resolveInstanceId(location.hostname)]: legacyPinnedGalleryIds } : isRecord$3(record.pinnedGalleryIdsByInstance) ? record.pinnedGalleryIdsByInstance : {};
    return {
      ...settingsDefaults,
      ...record,
      pinnedGalleryIdsByInstance: migrateInstanceKeyedData(pinnedGalleryIdsByInstance, (existing, incoming) => [
        .../* @__PURE__ */ new Set([...existing, ...incoming])
      ])
    };
  }
  const useSettingsStore = /* @__PURE__ */ defineStore("settings", {
    state: () => normalizeSettingsState(getValue(SETTINGS_STORAGE_KEY, { ...settingsDefaults })),
    getters: {
      pinnedGalleryIds: (state) => state.pinnedGalleryIdsByInstance[resolveInstanceId(location.hostname)] ?? []
    },
    actions: {
      togglePinnedGalleryId(id) {
        const instanceId = resolveInstanceId(location.hostname);
        const current = this.pinnedGalleryIdsByInstance[instanceId] ?? [];
        this.pinnedGalleryIdsByInstance = {
          ...this.pinnedGalleryIdsByInstance,
          [instanceId]: current.includes(id) ? current.filter((existing) => existing !== id) : [...current, id]
        };
      }
    }
  });
  function installSettingsPersistence(store) {
    store.$subscribe(() => setValue(SETTINGS_STORAGE_KEY, store.$state), { flush: "sync" });
    onValueChanged(SETTINGS_STORAGE_KEY, (next) => store.$patch(normalizeSettingsState(next)));
  }
  const STORAGE_KEY$2 = "lodestone-userscript-telegram-buttons";
  const DEFAULT_TELEGRAM_API_URL = "https://api.telegram.org/bot{token}/";
  function createTelegramButtonConfig(overrides2 = {}) {
    return {
      id: crypto.randomUUID(),
      label: "Telegram",
      icon: "fa-paper-plane",
      color: "#26a5e4",
      syncColors: true,
      apiUrl: DEFAULT_TELEGRAM_API_URL,
      token: "",
      chatId: "",
      format: "photo",
      captionSource: "pageUrl",
      ...overrides2
    };
  }
  function createTelegramButtonsDefaults() {
    return { buttons: [] };
  }
  const useTelegramButtonsStore = /* @__PURE__ */ defineStore("telegramButtons", {
    state: () => getValue(STORAGE_KEY$2, createTelegramButtonsDefaults()),
    actions: {
      add(overrides2 = {}) {
        const button = createTelegramButtonConfig(overrides2);
        this.buttons.push(button);
        return button;
      },
      duplicate(id) {
        const existing = this.buttons.find((button) => button.id === id);
        if (!existing) {
          return void 0;
        }
        const copy = createTelegramButtonConfig({ ...existing, id: crypto.randomUUID(), label: `${existing.label} (copy)` });
        this.buttons.push(copy);
        return copy;
      },
      update(id, changes) {
        const index = this.buttons.findIndex((button) => button.id === id);
        if (index === -1) {
          return;
        }
        this.buttons[index] = { ...this.buttons[index], ...changes, id };
      },
      remove(id) {
        this.buttons = this.buttons.filter((button) => button.id !== id);
      }
    }
  });
  function installTelegramButtonsPersistence(store) {
    store.$subscribe(() => setValue(STORAGE_KEY$2, store.$state), { flush: "sync" });
    onValueChanged(STORAGE_KEY$2, (next) => store.$patch(next));
  }
  const STORAGE_KEY$1 = "lodestone-userscript-gallery-quick-buttons";
  function createGalleryQuickButtonConfig(overrides2 = {}) {
    return {
      id: crypto.randomUUID(),
      galleryId: "",
      label: "Gallery",
      icon: "fa-image",
      color: "#618fc3",
      syncColors: true,
      ...overrides2
    };
  }
  function createGalleryQuickButtonsDefaults() {
    return { perInstance: {} };
  }
  function isRecord$2(value) {
    return typeof value === "object" && value !== null;
  }
  function normalizeGalleryQuickButtonsState(raw) {
    const record = isRecord$2(raw) ? raw : {};
    const perInstance = Array.isArray(record.buttons) && record.buttons.length > 0 ? { [resolveInstanceId(location.hostname)]: record.buttons } : isRecord$2(record.perInstance) ? record.perInstance : {};
    return { perInstance: migrateInstanceKeyedData(perInstance, (existing, incoming) => [...existing, ...incoming]) };
  }
  const useGalleryQuickButtonsStore = /* @__PURE__ */ defineStore("galleryQuickButtons", {
    state: () => normalizeGalleryQuickButtonsState(getValue(STORAGE_KEY$1, createGalleryQuickButtonsDefaults())),
    getters: {
      buttons: (state) => state.perInstance[resolveInstanceId(location.hostname)] ?? []
    },
    actions: {
      add(overrides2 = {}) {
        const button = createGalleryQuickButtonConfig(overrides2);
        const instanceId = resolveInstanceId(location.hostname);
        this.perInstance[instanceId] = [...this.perInstance[instanceId] ?? [], button];
        return button;
      },
      duplicate(id) {
        const existing = this.buttons.find((button) => button.id === id);
        if (!existing) {
          return void 0;
        }
        const copy = createGalleryQuickButtonConfig({
          ...existing,
          id: crypto.randomUUID(),
          label: `${existing.label} (copy)`
        });
        const instanceId = resolveInstanceId(location.hostname);
        this.perInstance[instanceId] = [...this.perInstance[instanceId] ?? [], copy];
        return copy;
      },
      update(id, changes) {
        const instanceId = resolveInstanceId(location.hostname);
        const buttons = this.perInstance[instanceId] ?? [];
        const index = buttons.findIndex((button) => button.id === id);
        if (index === -1) {
          return;
        }
        this.perInstance[instanceId] = buttons.map(
          (button, i) => i === index ? { ...button, ...changes, id } : button
        );
      },
      remove(id) {
        const instanceId = resolveInstanceId(location.hostname);
        this.perInstance[instanceId] = (this.perInstance[instanceId] ?? []).filter((button) => button.id !== id);
      }
    }
  });
  function installGalleryQuickButtonsPersistence(store) {
    store.$subscribe(() => setValue(STORAGE_KEY$1, store.$state), { flush: "sync" });
    onValueChanged(STORAGE_KEY$1, (next) => store.$patch(normalizeGalleryQuickButtonsState(next)));
  }
  const STORAGE_KEY = "lodestone-userscript-button-effects";
  function createButtonEffectRule(overrides2 = {}) {
    return {
      id: crypto.randomUUID(),
      label: "New rule",
      enabled: true,
      timing: "after-settle",
      condition: { type: "leaf", targetKind: "id", targetId: "", state: "on" },
      actionTargetId: "",
      actionVerb: "toggle",
      ...overrides2
    };
  }
  function createButtonEffectsDefaults() {
    return { perInstance: {} };
  }
  function isRecord$1(value) {
    return typeof value === "object" && value !== null;
  }
  function normalizeButtonEffectsState(raw) {
    const record = isRecord$1(raw) ? raw : {};
    const perInstance = isRecord$1(record.perInstance) ? record.perInstance : {};
    return { perInstance: migrateInstanceKeyedData(perInstance, (existing, incoming) => [...existing, ...incoming]) };
  }
  const useButtonEffectsStore = /* @__PURE__ */ defineStore("buttonEffects", {
    state: () => normalizeButtonEffectsState(getValue(STORAGE_KEY, createButtonEffectsDefaults())),
    getters: {
      rules: (state) => state.perInstance[resolveInstanceId(location.hostname)] ?? []
    },
    actions: {
      add(overrides2 = {}) {
        const rule = createButtonEffectRule(overrides2);
        const instanceId = resolveInstanceId(location.hostname);
        this.perInstance[instanceId] = [...this.perInstance[instanceId] ?? [], rule];
        return rule;
      },
      duplicate(id) {
        const existing = this.rules.find((rule) => rule.id === id);
        if (!existing) {
          return void 0;
        }
        const copy = createButtonEffectRule({ ...existing, id: crypto.randomUUID(), label: `${existing.label} (copy)` });
        const instanceId = resolveInstanceId(location.hostname);
        this.perInstance[instanceId] = [...this.perInstance[instanceId] ?? [], copy];
        return copy;
      },
      update(id, changes) {
        const instanceId = resolveInstanceId(location.hostname);
        const rules = this.perInstance[instanceId] ?? [];
        const index = rules.findIndex((rule) => rule.id === id);
        if (index === -1) {
          return;
        }
        this.perInstance[instanceId] = rules.map((rule, i) => i === index ? { ...rule, ...changes, id } : rule);
      },
      remove(id) {
        const instanceId = resolveInstanceId(location.hostname);
        this.perInstance[instanceId] = (this.perInstance[instanceId] ?? []).filter((rule) => rule.id !== id);
      }
    }
  });
  function installButtonEffectsPersistence(store) {
    store.$subscribe(() => setValue(STORAGE_KEY, store.$state), { flush: "sync" });
    onValueChanged(STORAGE_KEY, (next) => store.$patch(normalizeButtonEffectsState(next)));
  }
  function useToggle(store, key) {
    return computed({
      get: () => store[key],
      set: (value) => {
        store[key] = value;
      }
    });
  }
  const _hoisted_1$k = { class: "lodestone-settings-section" };
  const _sfc_main$m = /* @__PURE__ */ defineComponent({
    __name: "ErrorReportingSection",
    setup(__props) {
      const store = useSettingsStore();
      const errorReportingEnabled = useToggle(store, "errorReportingEnabled");
      const sentryDsn = useToggle(store, "sentryDsn");
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$k, [
          _cache[4] || (_cache[4] = createBaseVNode("h3", null, "Error Reporting", -1)),
          createBaseVNode("label", null, [
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => /* @__PURE__ */ isRef(errorReportingEnabled) ? errorReportingEnabled.value = $event : null),
              type: "checkbox"
            }, null, 512), [
              [vModelCheckbox, unref(errorReportingEnabled)]
            ]),
            _cache[2] || (_cache[2] = createTextVNode(" Send anonymous error reports to help fix bugs ", -1))
          ]),
          createBaseVNode("label", null, [
            _cache[3] || (_cache[3] = createTextVNode(" Custom Sentry/Bugsink DSN (leave blank to use the built-in default) ", -1)),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => /* @__PURE__ */ isRef(sentryDsn) ? sentryDsn.value = $event : null),
              placeholder: "https://<key>@<host>/<project>",
              type: "text"
            }, null, 512), [
              [vModelText, unref(sentryDsn)]
            ])
          ])
        ]);
      };
    }
  });
  const _hoisted_1$j = { class: "lodestone-settings-section" };
  const _hoisted_2$c = {
    key: 0,
    class: "lodestone-settings-subfields"
  };
  const _sfc_main$l = /* @__PURE__ */ defineComponent({
    __name: "ButtonSizeSection",
    setup(__props) {
      const store = useSettingsStore();
      const biggerButtonsEnabled = useToggle(store, "biggerButtonsEnabled");
      const listButtonSize = useToggle(store, "listButtonSize");
      const imageButtonSize = useToggle(store, "imageButtonSize");
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$j, [
          _cache[6] || (_cache[6] = createBaseVNode("h3", null, "Button Size", -1)),
          createBaseVNode("label", null, [
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => /* @__PURE__ */ isRef(biggerButtonsEnabled) ? biggerButtonsEnabled.value = $event : null),
              type: "checkbox"
            }, null, 512), [
              [vModelCheckbox, unref(biggerButtonsEnabled)]
            ]),
            _cache[3] || (_cache[3] = createTextVNode(" Bigger buttons ", -1))
          ]),
          unref(biggerButtonsEnabled) ? (openBlock(), createElementBlock("div", _hoisted_2$c, [
            createBaseVNode("label", null, [
              _cache[4] || (_cache[4] = createTextVNode(" List button size (px) ", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => /* @__PURE__ */ isRef(listButtonSize) ? listButtonSize.value = $event : null),
                min: "12",
                max: "64",
                type: "number"
              }, null, 512), [
                [
                  vModelText,
                  unref(listButtonSize),
                  void 0,
                  { number: true }
                ]
              ])
            ]),
            createBaseVNode("label", null, [
              _cache[5] || (_cache[5] = createTextVNode(" Image button size (px) ", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => /* @__PURE__ */ isRef(imageButtonSize) ? imageButtonSize.value = $event : null),
                min: "12",
                max: "64",
                type: "number"
              }, null, 512), [
                [
                  vModelText,
                  unref(imageButtonSize),
                  void 0,
                  { number: true }
                ]
              ])
            ])
          ])) : createCommentVNode("", true)
        ]);
      };
    }
  });
  const _hoisted_1$i = { class: "lodestone-settings-section" };
  const _sfc_main$k = /* @__PURE__ */ defineComponent({
    __name: "VoteSection",
    setup(__props) {
      const store = useSettingsStore();
      const voteProgressEnabled = useToggle(store, "voteProgressEnabled");
      const voteHoverStyleEnabled = useToggle(store, "voteHoverStyleEnabled");
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$i, [
          _cache[4] || (_cache[4] = createBaseVNode("h3", null, "Vote Buttons", -1)),
          createBaseVNode("label", null, [
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => /* @__PURE__ */ isRef(voteProgressEnabled) ? voteProgressEnabled.value = $event : null),
              type: "checkbox"
            }, null, 512), [
              [vModelCheckbox, unref(voteProgressEnabled)]
            ]),
            _cache[2] || (_cache[2] = createTextVNode(" Vote/nav/subscribe buttons show progress ", -1))
          ]),
          createBaseVNode("label", null, [
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => /* @__PURE__ */ isRef(voteHoverStyleEnabled) ? voteHoverStyleEnabled.value = $event : null),
              type: "checkbox"
            }, null, 512), [
              [vModelCheckbox, unref(voteHoverStyleEnabled)]
            ]),
            _cache[3] || (_cache[3] = createTextVNode(" Distinguishable hover/active style on vote buttons ", -1))
          ])
        ]);
      };
    }
  });
  const imageButtonDefs = [
    { id: "image-nav-prev", scope: "image", selector: ".block__header .js-prev", label: "Previous image", icon: "fa-chevron-left", color: "#8a8a8a", category: "nav" },
    { id: "image-nav-up", scope: "image", selector: ".block__header .js-up", label: "Find in list", icon: "fa-chevron-up", color: "#8a8a8a", category: "nav" },
    { id: "image-nav-next", scope: "image", selector: ".block__header .js-next", label: "Next image", icon: "fa-chevron-right", color: "#8a8a8a", category: "nav" },
    { id: "image-nav-random", scope: "image", selector: ".block__header .js-rand", label: "Random image", icon: "fa-random", color: "#8a8a8a", category: "nav" },
    { id: "image-fave", scope: "image", selector: ".block__header .interaction--fave", label: "Favorite", icon: "fa-star", color: "#f2b70c", category: "vote" },
    { id: "image-upvote", scope: "image", selector: ".block__header .interaction--upvote", label: "Upvote", icon: "fa-arrow-up", color: "#5cb85c", category: "vote" },
    { id: "image-downvote", scope: "image", selector: ".block__header .interaction--downvote", label: "Downvote", icon: "fa-arrow-down", color: "#d9534f", category: "vote" },
    { id: "image-comments", scope: "image", selector: ".block__header .interaction--comments", label: "Comments", icon: "fa-comments", color: "#5bc0de", category: "comments" },
    { id: "image-hide", scope: "image", selector: ".block__header .interaction--hide", label: "Hide image", icon: "fa-eye-slash", color: "#8a8a8a", category: "hide" },
    /**
     * Not confirmed live logged-in (M1's survey only saw the logged-out `/sessions/new`
     * placeholder) -- best guess from Philomena's known REST convention: a single toggle link
     * whose href stays `/images/:id/subscription` both ways, `data-method` distinguishing
     * subscribe (post) from unsubscribe (delete).
     */
    { id: "image-subscribe", scope: "image", selector: '.block__header a[href$="/subscription"]', label: "Subscribe", icon: "fa-bell", color: "#8a8a8a", category: "subscribe" },
    { id: "image-galleries", scope: "image", selector: ".block__header .block__header__dropdown-tab", label: "Galleries", icon: "fa-images", color: "#8a8a8a", category: "galleries" },
    { id: "image-related", scope: "image", selector: '.block__header a[href$="/related"]', label: "Related", icon: "fa-sitemap", color: "#8a8a8a", category: "related" },
    { id: "image-view-detailed", scope: "image", selector: '.block__header a[title="View (tags in filename)"]', label: "View", icon: "fa-eye", color: "#8a8a8a", category: "view" },
    { id: "image-view-numeric", scope: "image", selector: '.block__header a[title="View (no tags in filename)"]', label: "View (short)", icon: "fa-eye", color: "#8a8a8a", category: "view" },
    { id: "image-download-detailed", scope: "image", selector: '.block__header a[title="Download (tags in filename)"]', label: "Download", icon: "fa-download", color: "#8a8a8a", category: "download" },
    { id: "image-download-numeric", scope: "image", selector: '.block__header a[title="Download (no tags in filename)"]', label: "Download (short)", icon: "fa-download", color: "#8a8a8a", category: "download" }
  ];
  const listButtonDefs = [
    { id: "list-fave", scope: "list", selector: ".media-box .interaction--fave", label: "Favorite", icon: "fa-star", color: "#f2b70c", category: "vote" },
    { id: "list-upvote", scope: "list", selector: ".media-box .interaction--upvote", label: "Upvote", icon: "fa-arrow-up", color: "#5cb85c", category: "vote" },
    { id: "list-downvote", scope: "list", selector: ".media-box .interaction--downvote", label: "Downvote", icon: "fa-arrow-down", color: "#d9534f", category: "vote" },
    { id: "list-comments", scope: "list", selector: ".media-box .interaction--comments", label: "Comments", icon: "fa-comments", color: "#5bc0de", category: "comments" },
    { id: "list-hide", scope: "list", selector: ".media-box .interaction--hide", label: "Hide image", icon: "fa-eye-slash", color: "#8a8a8a", category: "hide" }
  ];
  const allButtonDefs = [...imageButtonDefs, ...listButtonDefs];
  const _hoisted_1$h = { class: "lodestone-settings-section" };
  const _hoisted_2$b = { class: "lodestone-hide-group" };
  const _hoisted_3$a = ["checked", "onChange"];
  const _hoisted_4$9 = { class: "lodestone-hide-group" };
  const _hoisted_5$8 = ["checked", "onChange"];
  const _sfc_main$j = /* @__PURE__ */ defineComponent({
    __name: "HideButtonsSection",
    setup(__props) {
      const store = useSettingsStore();
      function isHidden(id) {
        return store.hiddenButtonIds.includes(id);
      }
      function toggle(id, checked) {
        if (checked) {
          if (!store.hiddenButtonIds.includes(id)) {
            store.hiddenButtonIds.push(id);
          }
        } else {
          store.hiddenButtonIds = store.hiddenButtonIds.filter((existing) => existing !== id);
        }
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$h, [
          _cache[0] || (_cache[0] = createBaseVNode("h3", null, "Hidden Buttons", -1)),
          _cache[1] || (_cache[1] = createBaseVNode("h4", null, "Hide buttons — List", -1)),
          createBaseVNode("div", _hoisted_2$b, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(listButtonDefs), (button) => {
              return openBlock(), createElementBlock("label", {
                key: button.id,
                class: "lodestone-hide-row",
                style: normalizeStyle({ "--lodestone-accent": button.color })
              }, [
                createBaseVNode("input", {
                  type: "checkbox",
                  checked: isHidden(button.id),
                  onChange: ($event) => toggle(button.id, $event.target.checked)
                }, null, 40, _hoisted_3$a),
                createBaseVNode("i", {
                  class: normalizeClass(["fa", button.icon]),
                  style: normalizeStyle({ color: button.color })
                }, null, 6),
                createTextVNode(" " + toDisplayString(button.label), 1)
              ], 4);
            }), 128))
          ]),
          _cache[2] || (_cache[2] = createBaseVNode("h4", null, "Hide buttons — Image", -1)),
          createBaseVNode("div", _hoisted_4$9, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(imageButtonDefs), (button) => {
              return openBlock(), createElementBlock("label", {
                key: button.id,
                class: "lodestone-hide-row",
                style: normalizeStyle({ "--lodestone-accent": button.color })
              }, [
                createBaseVNode("input", {
                  type: "checkbox",
                  checked: isHidden(button.id),
                  onChange: ($event) => toggle(button.id, $event.target.checked)
                }, null, 40, _hoisted_5$8),
                createBaseVNode("i", {
                  class: normalizeClass(["fa", button.icon]),
                  style: normalizeStyle({ color: button.color })
                }, null, 6),
                createTextVNode(" " + toDisplayString(button.label), 1)
              ], 4);
            }), 128))
          ])
        ]);
      };
    }
  });
  const _hoisted_1$g = { class: "lodestone-settings-section" };
  const _sfc_main$i = /* @__PURE__ */ defineComponent({
    __name: "GallerySection",
    setup(__props) {
      const store = useSettingsStore();
      const galleryProgressEnabled = useToggle(store, "galleryProgressEnabled");
      const galleryFullPageEnabled = useToggle(store, "galleryFullPageEnabled");
      const gallerySortAlphabetical = useToggle(store, "gallerySortAlphabetical");
      const galleryLeftAlign = useToggle(store, "galleryLeftAlign");
      const galleryShowIcons = useToggle(store, "galleryShowIcons");
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$g, [
          _cache[10] || (_cache[10] = createBaseVNode("h3", null, "Galleries", -1)),
          createBaseVNode("label", null, [
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => /* @__PURE__ */ isRef(galleryProgressEnabled) ? galleryProgressEnabled.value = $event : null),
              type: "checkbox"
            }, null, 512), [
              [vModelCheckbox, unref(galleryProgressEnabled)]
            ]),
            _cache[5] || (_cache[5] = createTextVNode(" Gallery buttons show progress ", -1))
          ]),
          createBaseVNode("label", null, [
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => /* @__PURE__ */ isRef(galleryFullPageEnabled) ? galleryFullPageEnabled.value = $event : null),
              type: "checkbox"
            }, null, 512), [
              [vModelCheckbox, unref(galleryFullPageEnabled)]
            ]),
            _cache[6] || (_cache[6] = createTextVNode(" Full-page gallery picker (instead of the small dropdown) ", -1))
          ]),
          createBaseVNode("label", null, [
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => /* @__PURE__ */ isRef(gallerySortAlphabetical) ? gallerySortAlphabetical.value = $event : null),
              type: "checkbox"
            }, null, 512), [
              [vModelCheckbox, unref(gallerySortAlphabetical)]
            ]),
            _cache[7] || (_cache[7] = createTextVNode(" Sort galleries alphabetically (default; can be flipped per-open) ", -1))
          ]),
          createBaseVNode("label", null, [
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => /* @__PURE__ */ isRef(galleryLeftAlign) ? galleryLeftAlign.value = $event : null),
              type: "checkbox"
            }, null, 512), [
              [vModelCheckbox, unref(galleryLeftAlign)]
            ]),
            _cache[8] || (_cache[8] = createTextVNode(" Left-align gallery names ", -1))
          ]),
          createBaseVNode("label", null, [
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => /* @__PURE__ */ isRef(galleryShowIcons) ? galleryShowIcons.value = $event : null),
              type: "checkbox"
            }, null, 512), [
              [vModelCheckbox, unref(galleryShowIcons)]
            ]),
            _cache[9] || (_cache[9] = createTextVNode(" Show gallery icons/thumbnails ", -1))
          ])
        ]);
      };
    }
  });
  const _hoisted_1$f = { class: "lodestone-icon-picker" };
  const _hoisted_2$a = ["value"];
  const _hoisted_3$9 = ["value"];
  const CUSTOM_VALUE = "__custom__";
  const _sfc_main$h = /* @__PURE__ */ defineComponent({
    __name: "IconPicker",
    props: {
      modelValue: {}
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit2 = __emit;
      const CURATED_ICONS = [
        "fa-image",
        "fa-paper-plane",
        "fa-star",
        "fa-arrow-up",
        "fa-arrow-down",
        "fa-comments",
        "fa-eye-slash",
        "fa-eye",
        "fa-bell",
        "fa-images",
        "fa-sitemap",
        "fa-download",
        "fa-random",
        "fa-chevron-left"
      ];
      const isCustom = /* @__PURE__ */ ref(!CURATED_ICONS.includes(props.modelValue));
      const customValue = /* @__PURE__ */ ref(isCustom.value ? props.modelValue : "");
      const selectValue = computed(() => isCustom.value ? CUSTOM_VALUE : props.modelValue);
      function onSelect(event) {
        const value = event.target.value;
        if (value === CUSTOM_VALUE) {
          isCustom.value = true;
          emit2("update:modelValue", customValue.value);
        } else {
          isCustom.value = false;
          emit2("update:modelValue", value);
        }
      }
      watch(customValue, (value) => {
        if (isCustom.value) {
          emit2("update:modelValue", value);
        }
      });
      watch(
        () => props.modelValue,
        (value) => {
          if (!isCustom.value && !CURATED_ICONS.includes(value)) {
            isCustom.value = true;
            customValue.value = value;
          }
        }
      );
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("span", _hoisted_1$f, [
          createBaseVNode("i", {
            class: normalizeClass(["fa", __props.modelValue || "fa-question"])
          }, null, 2),
          createBaseVNode("select", {
            value: selectValue.value,
            onChange: onSelect
          }, [
            (openBlock(), createElementBlock(Fragment, null, renderList(CURATED_ICONS, (icon) => {
              return createBaseVNode("option", {
                key: icon,
                value: icon
              }, toDisplayString(icon), 9, _hoisted_3$9);
            }), 64)),
            createBaseVNode("option", { value: CUSTOM_VALUE }, "Other (custom)...")
          ], 40, _hoisted_2$a),
          isCustom.value ? withDirectives((openBlock(), createElementBlock("input", {
            key: 0,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => customValue.value = $event),
            type: "text",
            placeholder: "fa-custom-icon"
          }, null, 512)), [
            [vModelText, customValue.value]
          ]) : createCommentVNode("", true)
        ]);
      };
    }
  });
  const _sfc_main$g = /* @__PURE__ */ defineComponent({
    __name: "TelegramButtonPreview",
    props: {
      config: {}
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("span", {
          class: "lodestone-telegram-preview",
          style: normalizeStyle({ color: __props.config.color })
        }, [
          createBaseVNode("i", {
            class: normalizeClass(["fa", __props.config.icon])
          }, null, 2),
          createTextVNode(" " + toDisplayString(__props.config.label), 1)
        ], 4);
      };
    }
  });
  const PLACEHOLDER = /\{([^}]+)\}/g;
  const PATH_TOKEN = /\.[^.[\]]+|\[-?\d+\]/g;
  function resolveJsonPath(value, path) {
    const tokens = path.match(PATH_TOKEN) ?? [];
    let current = value;
    for (const token of tokens) {
      if (current === null || current === void 0) {
        return void 0;
      }
      if (token.startsWith(".")) {
        current = current[token.slice(1)];
      } else {
        const index = Number(token.slice(1, -1));
        const array = current;
        if (!Array.isArray(array)) {
          return void 0;
        }
        current = array[index < 0 ? array.length + index : index];
      }
    }
    return current;
  }
  function renderCaptionTemplate(template, data) {
    return template.replace(PLACEHOLDER, (match, expression) => {
      if (expression === "url") {
        return data.url;
      }
      if (expression === "currentUrl") {
        return data.currentUrl;
      }
      if (expression === "imageUrlFull") {
        return data.imageUrlFull;
      }
      if (expression === "imageUrlShort") {
        return data.imageUrlShort;
      }
      if (expression === "json" || expression.startsWith("json.") || expression.startsWith("json[")) {
        const path = expression.slice(4);
        const resolved = resolveJsonPath(data.json, path);
        return resolved === void 0 ? match : String(resolved);
      }
      return match;
    });
  }
  function resolveCaption(source, context) {
    switch (source) {
      case "pageUrl":
        return context.pageUrlWithoutSearch;
      case "currentUrl":
        return context.currentUrl;
      case "imageUrlFull":
        return context.imageUrlFull;
      case "imageUrlShort":
        return context.imageUrlShort;
      case "custom":
        return renderCaptionTemplate(context.customCaptionHtml ?? "", {
          url: context.pageUrlWithoutSearch,
          currentUrl: context.currentUrl,
          imageUrlFull: context.imageUrlFull,
          imageUrlShort: context.imageUrlShort,
          json: context.metadata
        });
      default:
        return "";
    }
  }
  const _hoisted_1$e = { class: "lodestone-telegram-format-caption" };
  const _hoisted_2$9 = ["value"];
  const _hoisted_3$8 = ["value"];
  const _hoisted_4$8 = {
    key: 0,
    class: "lodestone-preview-blockquote"
  };
  const _sfc_main$f = /* @__PURE__ */ defineComponent({
    __name: "TelegramFormatCaptionFields",
    props: {
      modelValue: {},
      exampleContext: {}
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit2 = __emit;
      function update(key, value) {
        emit2("update:modelValue", { ...props.modelValue, [key]: value });
      }
      const preview = computed(
        () => props.modelValue.captionSource === "custom" ? null : resolveCaption(props.modelValue.captionSource, props.exampleContext)
      );
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$e, [
          createBaseVNode("label", null, [
            _cache[3] || (_cache[3] = createTextVNode(" Format ", -1)),
            createBaseVNode("select", {
              value: __props.modelValue.format,
              onChange: _cache[0] || (_cache[0] = ($event) => update("format", $event.target.value))
            }, [..._cache[2] || (_cache[2] = [
              createBaseVNode("option", { value: "photo" }, "Photo", -1),
              createBaseVNode("option", { value: "document" }, "Document", -1),
              createBaseVNode("option", { value: "both" }, "Both (photo as reply to the document)", -1)
            ])], 40, _hoisted_2$9)
          ]),
          createBaseVNode("label", null, [
            _cache[5] || (_cache[5] = createTextVNode(" Caption ", -1)),
            createBaseVNode("select", {
              value: __props.modelValue.captionSource,
              onChange: _cache[1] || (_cache[1] = ($event) => update("captionSource", $event.target.value))
            }, [..._cache[4] || (_cache[4] = [
              createStaticVNode('<option value="pageUrl">Page URL</option><option value="currentUrl">Current URL</option><option value="imageUrlFull">Image file URL (full)</option><option value="imageUrlShort">Image file URL (short)</option><option value="custom">Custom</option>', 5)
            ])], 40, _hoisted_3$8)
          ]),
          preview.value !== null ? (openBlock(), createElementBlock("blockquote", _hoisted_4$8, toDisplayString(preview.value), 1)) : createCommentVNode("", true)
        ]);
      };
    }
  });
  const _hoisted_1$d = { class: "lodestone-json-viewer" };
  const _hoisted_2$8 = {
    key: 0,
    open: ""
  };
  const _hoisted_3$7 = ["onClick"];
  const _hoisted_4$7 = { class: "lodestone-json-viewer__key" };
  const _hoisted_5$7 = ["onClick"];
  const _hoisted_6$5 = { class: "lodestone-json-viewer__key" };
  const _hoisted_7$4 = { class: "lodestone-json-viewer__value" };
  const _sfc_main$e = /* @__PURE__ */ defineComponent({
    ...{ name: "CaptionJsonViewer" },
    __name: "CaptionJsonViewer",
    props: {
      data: {},
      path: {}
    },
    emits: ["insert"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit2 = __emit;
      function isExpandable(value) {
        return typeof value === "object" && value !== null;
      }
      function childPath(key) {
        const base2 = props.path ?? "";
        return typeof key === "number" ? `${base2}[${key}]` : `${base2}.${key}`;
      }
      function entries() {
        if (Array.isArray(props.data)) {
          return props.data.map((value, index) => [index, value]);
        }
        if (isExpandable(props.data)) {
          return Object.entries(props.data);
        }
        return [];
      }
      function onSummaryClick(event) {
        if (!event.altKey) {
          return;
        }
        event.preventDefault();
        const details = event.currentTarget.closest("details");
        if (!details) {
          return;
        }
        const next = !details.open;
        details.open = next;
        details.querySelectorAll("details").forEach((nested) => {
          nested.open = next;
        });
      }
      function onInsertClick(event, key) {
        event.preventDefault();
        event.stopPropagation();
        emit2("insert", childPath(key));
      }
      return (_ctx, _cache) => {
        const _component_CaptionJsonViewer = resolveComponent("CaptionJsonViewer", true);
        return openBlock(), createElementBlock("ul", _hoisted_1$d, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(entries(), ([key, value]) => {
            return openBlock(), createElementBlock("li", { key }, [
              isExpandable(value) ? (openBlock(), createElementBlock("details", _hoisted_2$8, [
                createBaseVNode("summary", { onClick: onSummaryClick }, [
                  createBaseVNode("button", {
                    type: "button",
                    onClick: ($event) => onInsertClick($event, key)
                  }, "+", 8, _hoisted_3$7),
                  createBaseVNode("span", _hoisted_4$7, toDisplayString(key), 1)
                ]),
                createVNode(_component_CaptionJsonViewer, {
                  data: value,
                  path: childPath(key),
                  onInsert: _cache[0] || (_cache[0] = (path) => emit2("insert", path))
                }, null, 8, ["data", "path"])
              ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createBaseVNode("button", {
                  type: "button",
                  onClick: ($event) => emit2("insert", childPath(key))
                }, "+", 8, _hoisted_5$7),
                createBaseVNode("span", _hoisted_6$5, toDisplayString(key), 1),
                createBaseVNode("span", _hoisted_7$4, toDisplayString(value), 1)
              ], 64))
            ]);
          }), 128))
        ]);
      };
    }
  });
  const _hoisted_1$c = { class: "lodestone-caption-editor" };
  const _hoisted_2$7 = ["value"];
  const _hoisted_3$6 = { class: "lodestone-caption-editor__preview lodestone-preview-blockquote" };
  const _hoisted_4$6 = { class: "lodestone-caption-editor__variables" };
  const _hoisted_5$6 = { class: "lodestone-caption-editor__json-root" };
  const _sfc_main$d = /* @__PURE__ */ defineComponent({
    __name: "CaptionTemplateEditor",
    props: {
      modelValue: {},
      exampleData: {}
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit2 = __emit;
      const textareaRef = /* @__PURE__ */ ref(null);
      const preview = computed(() => renderCaptionTemplate(props.modelValue, props.exampleData));
      function insertAtCursor(text) {
        const el = textareaRef.value;
        const start = (el == null ? void 0 : el.selectionStart) ?? props.modelValue.length;
        const end = (el == null ? void 0 : el.selectionEnd) ?? props.modelValue.length;
        const next = props.modelValue.slice(0, start) + text + props.modelValue.slice(end);
        emit2("update:modelValue", next);
        if (el) {
          requestAnimationFrame(() => {
            el.focus();
            el.setSelectionRange(start + text.length, start + text.length);
          });
        }
      }
      function insertJsonPath(path) {
        insertAtCursor(path === "" ? "{json}" : `{json${path}}`);
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$c, [
          createBaseVNode("textarea", {
            ref_key: "textareaRef",
            ref: textareaRef,
            value: __props.modelValue,
            class: "lodestone-caption-editor__textarea",
            rows: "4",
            onInput: _cache[0] || (_cache[0] = ($event) => emit2("update:modelValue", $event.target.value))
          }, null, 40, _hoisted_2$7),
          createBaseVNode("blockquote", _hoisted_3$6, toDisplayString(preview.value), 1),
          createBaseVNode("table", _hoisted_4$6, [
            createBaseVNode("tbody", null, [
              createBaseVNode("tr", null, [
                _cache[5] || (_cache[5] = createBaseVNode("td", null, "Page URL", -1)),
                createBaseVNode("td", null, toDisplayString(__props.exampleData.url), 1),
                createBaseVNode("td", null, [
                  createBaseVNode("button", {
                    type: "button",
                    onClick: _cache[1] || (_cache[1] = ($event) => insertAtCursor("{url}"))
                  }, "+")
                ])
              ]),
              createBaseVNode("tr", null, [
                _cache[6] || (_cache[6] = createBaseVNode("td", null, "Current URL", -1)),
                createBaseVNode("td", null, toDisplayString(__props.exampleData.currentUrl), 1),
                createBaseVNode("td", null, [
                  createBaseVNode("button", {
                    type: "button",
                    onClick: _cache[2] || (_cache[2] = ($event) => insertAtCursor("{currentUrl}"))
                  }, "+")
                ])
              ]),
              createBaseVNode("tr", null, [
                _cache[7] || (_cache[7] = createBaseVNode("td", null, "Image file URL (full)", -1)),
                createBaseVNode("td", null, toDisplayString(__props.exampleData.imageUrlFull), 1),
                createBaseVNode("td", null, [
                  createBaseVNode("button", {
                    type: "button",
                    onClick: _cache[3] || (_cache[3] = ($event) => insertAtCursor("{imageUrlFull}"))
                  }, "+")
                ])
              ]),
              createBaseVNode("tr", null, [
                _cache[8] || (_cache[8] = createBaseVNode("td", null, "Image file URL (short)", -1)),
                createBaseVNode("td", null, toDisplayString(__props.exampleData.imageUrlShort), 1),
                createBaseVNode("td", null, [
                  createBaseVNode("button", {
                    type: "button",
                    onClick: _cache[4] || (_cache[4] = ($event) => insertAtCursor("{imageUrlShort}"))
                  }, "+")
                ])
              ])
            ])
          ]),
          createBaseVNode("details", _hoisted_5$6, [
            _cache[9] || (_cache[9] = createBaseVNode("summary", null, "json", -1)),
            createVNode(_sfc_main$e, {
              data: __props.exampleData.json,
              path: "",
              onInsert: insertJsonPath
            }, null, 8, ["data"])
          ])
        ]);
      };
    }
  });
  const EXAMPLE_IMAGE_IDS = {
    "derpibooru.org": 2627393,
    "trixiebooru.org": 2627393,
    "lunabooru.org": 77156,
    "tentabus.ai": 77156,
    "twibooru.org": 2261406,
    "manebooru.art": 1397622,
    "furbooru.org": 26931
  };
  function getExampleImageId(hostname) {
    const match = Object.entries(EXAMPLE_IMAGE_IDS).find(([host]) => hostname.endsWith(host));
    return match == null ? void 0 : match[1];
  }
  async function fetchImageMetadata(imageId) {
    const response = await fetch(`/api/v1/json/images/${imageId}`, { credentials: "same-origin" });
    if (!response.ok) {
      throw new Error(`Failed to fetch image metadata for ${imageId}: HTTP ${response.status}`);
    }
    const body = await response.json();
    return body.image;
  }
  const _hoisted_1$b = { class: "lodestone-telegram-manager" };
  const _hoisted_2$6 = {
    key: 0,
    class: "lodestone-settings-subfield"
  };
  const _hoisted_3$5 = { class: "lodestone-inline-group" };
  const _hoisted_4$5 = { class: "lodestone-inline-group" };
  const _hoisted_5$5 = ["type"];
  const _hoisted_6$4 = { class: "lodestone-telegram-manager__preview" };
  const _hoisted_7$3 = { class: "lodestone-manager-list" };
  const _hoisted_8$3 = { class: "lodestone-manager-list__actions" };
  const _hoisted_9$3 = ["onClick"];
  const _hoisted_10$3 = ["onClick"];
  const _hoisted_11$2 = ["onClick"];
  const _sfc_main$c = /* @__PURE__ */ defineComponent({
    __name: "TelegramButtonManager",
    setup(__props) {
      const store = useTelegramButtonsStore();
      const draft = /* @__PURE__ */ reactive(createTelegramButtonConfig());
      const editingId = /* @__PURE__ */ ref(null);
      const tokenVisible = /* @__PURE__ */ ref(false);
      const exampleMetadata = /* @__PURE__ */ ref(null);
      onMounted(async () => {
        const exampleId = getExampleImageId(location.hostname);
        if (!exampleId) {
          return;
        }
        try {
          exampleMetadata.value = await fetchImageMetadata(exampleId);
        } catch {
          exampleMetadata.value = null;
        }
      });
      const examplePageUrl = computed(
        () => exampleMetadata.value ? `${location.origin}/images/${exampleMetadata.value.id}` : ""
      );
      const exampleContext = computed(() => {
        var _a, _b;
        return {
          pageUrlWithoutSearch: examplePageUrl.value,
          currentUrl: examplePageUrl.value ? `${examplePageUrl.value}?q=example+search` : "",
          imageUrlFull: ((_a = exampleMetadata.value) == null ? void 0 : _a.view_url) ?? "",
          imageUrlShort: ((_b = exampleMetadata.value) == null ? void 0 : _b.representations.full) ?? "",
          metadata: exampleMetadata.value ?? {},
          customCaptionHtml: draft.customCaptionHtml
        };
      });
      function resetApiUrl() {
        draft.apiUrl = DEFAULT_TELEGRAM_API_URL;
      }
      function updateDraft(next) {
        Object.assign(draft, next);
      }
      function save() {
        if (editingId.value) {
          store.update(editingId.value, { ...draft });
          editingId.value = null;
        } else {
          store.add({ ...draft });
        }
        Object.assign(draft, createTelegramButtonConfig());
      }
      function edit(button) {
        Object.assign(draft, button);
        editingId.value = button.id;
      }
      function cancelEdit() {
        Object.assign(draft, createTelegramButtonConfig());
        editingId.value = null;
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$b, [
          createBaseVNode("h4", null, toDisplayString(editingId.value ? "Edit Telegram button" : "Add a Telegram button"), 1),
          createBaseVNode("label", null, [
            _cache[11] || (_cache[11] = createTextVNode("Label ", -1)),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => draft.label = $event),
              type: "text"
            }, null, 512), [
              [vModelText, draft.label]
            ])
          ]),
          createBaseVNode("label", null, [
            _cache[12] || (_cache[12] = createTextVNode("Icon ", -1)),
            createVNode(_sfc_main$h, {
              modelValue: draft.icon,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => draft.icon = $event)
            }, null, 8, ["modelValue"])
          ]),
          createBaseVNode("label", null, [
            _cache[13] || (_cache[13] = createTextVNode("Color ", -1)),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => draft.color = $event),
              type: "color"
            }, null, 512), [
              [vModelText, draft.color]
            ])
          ]),
          createBaseVNode("label", null, [
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => draft.syncColors = $event),
              type: "checkbox"
            }, null, 512), [
              [vModelCheckbox, draft.syncColors]
            ]),
            _cache[14] || (_cache[14] = createTextVNode(" Sync colors (use the same color in dark mode) ", -1))
          ]),
          !draft.syncColors ? (openBlock(), createElementBlock("label", _hoisted_2$6, [
            _cache[15] || (_cache[15] = createTextVNode(" Dark mode color ", -1)),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => draft.darkColor = $event),
              type: "color"
            }, null, 512), [
              [vModelText, draft.darkColor]
            ])
          ])) : createCommentVNode("", true),
          createBaseVNode("label", null, [
            _cache[16] || (_cache[16] = createTextVNode(" API URL ", -1)),
            createBaseVNode("span", _hoisted_3$5, [
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => draft.apiUrl = $event),
                type: "text"
              }, null, 512), [
                [vModelText, draft.apiUrl]
              ]),
              createBaseVNode("button", {
                title: "Reset to default",
                type: "button",
                onClick: resetApiUrl
              }, "(x)")
            ])
          ]),
          createBaseVNode("label", null, [
            _cache[17] || (_cache[17] = createTextVNode(" Bot token ", -1)),
            createBaseVNode("span", _hoisted_4$5, [
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => draft.token = $event),
                type: tokenVisible.value ? "text" : "password"
              }, null, 8, _hoisted_5$5), [
                [vModelDynamic, draft.token]
              ]),
              createBaseVNode("button", {
                type: "button",
                onClick: _cache[7] || (_cache[7] = ($event) => tokenVisible.value = !tokenVisible.value)
              }, toDisplayString(tokenVisible.value ? "(hide)" : "(👁)"), 1)
            ])
          ]),
          createBaseVNode("label", null, [
            _cache[18] || (_cache[18] = createTextVNode("Destination chat ", -1)),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => draft.chatId = $event),
              placeholder: "@username or numeric id",
              type: "text"
            }, null, 512), [
              [vModelText, draft.chatId]
            ])
          ]),
          createBaseVNode("label", null, [
            _cache[19] || (_cache[19] = createTextVNode("Destination topic (optional) ", -1)),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => draft.topicId = $event),
              type: "text"
            }, null, 512), [
              [vModelText, draft.topicId]
            ])
          ]),
          createVNode(_sfc_main$f, {
            "model-value": draft,
            "example-context": exampleContext.value,
            "onUpdate:modelValue": updateDraft
          }, null, 8, ["model-value", "example-context"]),
          draft.captionSource === "custom" && exampleMetadata.value ? (openBlock(), createBlock(_sfc_main$d, {
            key: 1,
            "example-data": {
              url: exampleContext.value.pageUrlWithoutSearch,
              currentUrl: exampleContext.value.currentUrl,
              imageUrlFull: exampleContext.value.imageUrlFull,
              imageUrlShort: exampleContext.value.imageUrlShort,
              json: exampleMetadata.value
            },
            "model-value": draft.customCaptionHtml ?? "",
            "onUpdate:modelValue": _cache[10] || (_cache[10] = (value) => draft.customCaptionHtml = value)
          }, null, 8, ["example-data", "model-value"])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_6$4, [
            createVNode(_sfc_main$g, { config: draft }, null, 8, ["config"])
          ]),
          createBaseVNode("button", {
            type: "button",
            onClick: save
          }, toDisplayString(editingId.value ? "Save changes" : "Save"), 1),
          editingId.value ? (openBlock(), createElementBlock("button", {
            key: 2,
            type: "button",
            onClick: cancelEdit
          }, "Cancel edit")) : createCommentVNode("", true),
          _cache[20] || (_cache[20] = createBaseVNode("h4", null, "Configured Telegram buttons", -1)),
          createBaseVNode("ul", _hoisted_7$3, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(store).buttons, (button) => {
              return openBlock(), createElementBlock("li", {
                key: button.id,
                class: "lodestone-manager-list__item"
              }, [
                createVNode(_sfc_main$g, { config: button }, null, 8, ["config"]),
                createBaseVNode("span", _hoisted_8$3, [
                  createBaseVNode("button", {
                    type: "button",
                    onClick: ($event) => edit(button)
                  }, "Edit", 8, _hoisted_9$3),
                  createBaseVNode("button", {
                    type: "button",
                    onClick: ($event) => unref(store).duplicate(button.id)
                  }, "Duplicate", 8, _hoisted_10$3),
                  createBaseVNode("button", {
                    type: "button",
                    onClick: ($event) => unref(store).remove(button.id)
                  }, "Delete", 8, _hoisted_11$2)
                ])
              ]);
            }), 128))
          ])
        ]);
      };
    }
  });
  const _hoisted_1$a = { class: "lodestone-settings-section" };
  const _sfc_main$b = /* @__PURE__ */ defineComponent({
    __name: "TelegramSection",
    setup(__props) {
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$a, [
          _cache[0] || (_cache[0] = createBaseVNode("h3", null, "Send to Telegram", -1)),
          createVNode(_sfc_main$c)
        ]);
      };
    }
  });
  const base = {
    csrfTokenMeta: 'meta[name="csrf-token"]',
    csrfParamMeta: 'meta[name="csrf-param"]',
    csrfFieldNameFallback: "_csrf_token",
    imageNavPrev: ".js-prev",
    imageNavUp: ".js-up",
    imageNavNext: ".js-next",
    interactionFave: ".interaction--fave",
    interactionUpvote: ".interaction--upvote",
    interactionDownvote: ".interaction--downvote",
    interactionComments: ".interaction--comments",
    interactionHide: ".interaction--hide",
    scoreDisplay: ".score.block__header__title",
    galleryDropdownRoot: ".block__header__dropdown-tab",
    galleryDropdownContent: ".dropdown__content",
    galleryListContainer: ".js-gallery-list",
    galleriesNavLink: 'header nav a.header__link[href*="gallery[creator]="]',
    relatedLink: 'a[href$="/related"]',
    settingsTabHeader: "#js-setting-table .block__header--js-tabbed",
    settingsTabLink: "[data-click-tab]",
    settingsTabPanel: "[data-tab]",
    listThumbnailBox: ".media-box"
  };
  const overrides = {
    "twibooru.org": {
      csrfFieldNameFallback: "authenticity_token"
    }
  };
  function resolveSelectors(hostname) {
    var _a;
    const override = (_a = Object.entries(overrides).find(([host]) => hostname.endsWith(host))) == null ? void 0 : _a[1];
    return override ? { ...base, ...override } : base;
  }
  function getCurrentUsername(hostname = location.hostname) {
    const selectors = resolveSelectors(hostname);
    const link = document.querySelector(selectors.galleriesNavLink);
    if (!link) {
      return null;
    }
    const href = link.getAttribute("href");
    if (!href) {
      return null;
    }
    const query = href.split("?")[1] ?? "";
    return new URLSearchParams(query).get("gallery[creator]");
  }
  async function searchUserGalleries(username) {
    const query = `q=${encodeURIComponent(`user:${username}`)}&per_page=50`;
    const response = await fetch(`/api/v1/json/search/galleries?${query}`, { credentials: "same-origin" });
    if (!response.ok) {
      throw new Error(`Failed to search galleries for ${username}: HTTP ${response.status}`);
    }
    const body = await response.json();
    return body.galleries.map(({ id, title, thumbnail }) => ({
      id,
      title,
      thumbnailUrl: (thumbnail == null ? void 0 : thumbnail.thumb_url) ?? (thumbnail == null ? void 0 : thumbnail.small_url) ?? void 0
    }));
  }
  const _sfc_main$a = /* @__PURE__ */ defineComponent({
    __name: "QuickButtonPreview",
    props: {
      config: {}
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("span", {
          class: "lodestone-quick-button-preview",
          style: normalizeStyle({ color: __props.config.color })
        }, [
          createBaseVNode("i", {
            class: normalizeClass(["fa", __props.config.icon])
          }, null, 2),
          createTextVNode(" " + toDisplayString(__props.config.label), 1)
        ], 4);
      };
    }
  });
  const _hoisted_1$9 = { class: "lodestone-quick-button-manager" };
  const _hoisted_2$5 = { key: 0 };
  const _hoisted_3$4 = {
    value: "",
    disabled: ""
  };
  const _hoisted_4$4 = ["value"];
  const _hoisted_5$4 = { key: 1 };
  const _hoisted_6$3 = {
    key: 2,
    class: "lodestone-quick-button-manager__note"
  };
  const _hoisted_7$2 = {
    key: 3,
    class: "lodestone-settings-subfield"
  };
  const _hoisted_8$2 = { class: "lodestone-quick-button-manager__preview" };
  const _hoisted_9$2 = { class: "lodestone-manager-list" };
  const _hoisted_10$2 = ["href"];
  const _hoisted_11$1 = { class: "lodestone-manager-list__actions" };
  const _hoisted_12 = ["onClick"];
  const _hoisted_13 = ["onClick"];
  const _hoisted_14 = ["onClick"];
  const _sfc_main$9 = /* @__PURE__ */ defineComponent({
    __name: "QuickButtonManager",
    setup(__props) {
      const store = useGalleryQuickButtonsStore();
      const draft = /* @__PURE__ */ reactive(createGalleryQuickButtonConfig());
      const editingId = /* @__PURE__ */ ref(null);
      const galleryOptions = /* @__PURE__ */ ref([]);
      const galleryLookupState = /* @__PURE__ */ ref("loading");
      const manualEntry = /* @__PURE__ */ ref(false);
      onMounted(async () => {
        const username = getCurrentUsername();
        if (!username) {
          galleryLookupState.value = "error";
          manualEntry.value = true;
          return;
        }
        try {
          galleryOptions.value = await searchUserGalleries(username);
          galleryLookupState.value = "ready";
          if (galleryOptions.value.length === 0) {
            manualEntry.value = true;
          }
        } catch {
          galleryLookupState.value = "error";
          manualEntry.value = true;
        }
      });
      function save() {
        if (editingId.value) {
          store.update(editingId.value, { ...draft });
          editingId.value = null;
        } else {
          store.add({ ...draft });
        }
        Object.assign(draft, createGalleryQuickButtonConfig());
      }
      function edit(button) {
        Object.assign(draft, button);
        editingId.value = button.id;
      }
      function cancelEdit() {
        Object.assign(draft, createGalleryQuickButtonConfig());
        editingId.value = null;
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$9, [
          createBaseVNode("h4", null, toDisplayString(editingId.value ? "Edit gallery quick button" : "Add a gallery quick button"), 1),
          !manualEntry.value ? (openBlock(), createElementBlock("label", _hoisted_2$5, [
            _cache[8] || (_cache[8] = createTextVNode(" Gallery ", -1)),
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => draft.galleryId = $event)
            }, [
              createBaseVNode("option", _hoisted_3$4, toDisplayString(galleryLookupState.value === "loading" ? "Loading your galleries…" : "Select a gallery"), 1),
              (openBlock(true), createElementBlock(Fragment, null, renderList(galleryOptions.value, (gallery) => {
                return openBlock(), createElementBlock("option", {
                  key: gallery.id,
                  value: String(gallery.id)
                }, toDisplayString(gallery.title) + " (#" + toDisplayString(gallery.id) + ") ", 9, _hoisted_4$4);
              }), 128))
            ], 512), [
              [vModelSelect, draft.galleryId]
            ])
          ])) : (openBlock(), createElementBlock("label", _hoisted_5$4, [
            _cache[9] || (_cache[9] = createTextVNode(" Gallery id or slug ", -1)),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => draft.galleryId = $event),
              type: "text"
            }, null, 512), [
              [vModelText, draft.galleryId]
            ])
          ])),
          galleryLookupState.value === "error" ? (openBlock(), createElementBlock("p", _hoisted_6$3, " Couldn't look up your galleries automatically -- enter the id manually. ")) : createCommentVNode("", true),
          createBaseVNode("button", {
            type: "button",
            class: "lodestone-quick-button-manager__toggle-entry",
            onClick: _cache[2] || (_cache[2] = ($event) => manualEntry.value = !manualEntry.value)
          }, toDisplayString(manualEntry.value ? "Pick from a dropdown instead" : "Enter manually instead"), 1),
          createBaseVNode("label", null, [
            _cache[10] || (_cache[10] = createTextVNode("Label ", -1)),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => draft.label = $event),
              type: "text"
            }, null, 512), [
              [vModelText, draft.label]
            ])
          ]),
          createBaseVNode("label", null, [
            _cache[11] || (_cache[11] = createTextVNode("Icon ", -1)),
            createVNode(_sfc_main$h, {
              modelValue: draft.icon,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => draft.icon = $event)
            }, null, 8, ["modelValue"])
          ]),
          createBaseVNode("label", null, [
            _cache[12] || (_cache[12] = createTextVNode("Color ", -1)),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => draft.color = $event),
              type: "color"
            }, null, 512), [
              [vModelText, draft.color]
            ])
          ]),
          createBaseVNode("label", null, [
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => draft.syncColors = $event),
              type: "checkbox"
            }, null, 512), [
              [vModelCheckbox, draft.syncColors]
            ]),
            _cache[13] || (_cache[13] = createTextVNode(" Sync colors (use the same color in dark mode) ", -1))
          ]),
          !draft.syncColors ? (openBlock(), createElementBlock("label", _hoisted_7$2, [
            _cache[14] || (_cache[14] = createTextVNode(" Dark mode color ", -1)),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => draft.darkColor = $event),
              type: "color"
            }, null, 512), [
              [vModelText, draft.darkColor]
            ])
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_8$2, [
            createVNode(_sfc_main$a, { config: draft }, null, 8, ["config"])
          ]),
          createBaseVNode("button", {
            type: "button",
            onClick: save
          }, toDisplayString(editingId.value ? "Save changes" : "Save"), 1),
          editingId.value ? (openBlock(), createElementBlock("button", {
            key: 4,
            type: "button",
            onClick: cancelEdit
          }, "Cancel edit")) : createCommentVNode("", true),
          _cache[15] || (_cache[15] = createBaseVNode("h4", null, "Configured gallery buttons", -1)),
          createBaseVNode("ul", _hoisted_9$2, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(store).buttons, (button) => {
              return openBlock(), createElementBlock("li", {
                key: button.id,
                class: "lodestone-manager-list__item"
              }, [
                createVNode(_sfc_main$a, { config: button }, null, 8, ["config"]),
                createBaseVNode("a", {
                  href: `/galleries?gallery[include_image]=${button.galleryId}`,
                  target: "_blank",
                  rel: "noopener"
                }, " gallery #" + toDisplayString(button.galleryId), 9, _hoisted_10$2),
                createBaseVNode("span", _hoisted_11$1, [
                  createBaseVNode("button", {
                    type: "button",
                    onClick: ($event) => edit(button)
                  }, "Edit", 8, _hoisted_12),
                  createBaseVNode("button", {
                    type: "button",
                    onClick: ($event) => unref(store).duplicate(button.id)
                  }, "Duplicate", 8, _hoisted_13),
                  createBaseVNode("button", {
                    type: "button",
                    onClick: ($event) => unref(store).remove(button.id)
                  }, "Delete", 8, _hoisted_14)
                ])
              ]);
            }), 128))
          ])
        ]);
      };
    }
  });
  const _hoisted_1$8 = { class: "lodestone-settings-section" };
  const _sfc_main$8 = /* @__PURE__ */ defineComponent({
    __name: "QuickButtonsSection",
    setup(__props) {
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$8, [
          _cache[0] || (_cache[0] = createBaseVNode("h3", null, "Gallery quick buttons", -1)),
          createVNode(_sfc_main$9)
        ]);
      };
    }
  });
  function buildButtonCatalog() {
    const native = allButtonDefs.filter((def2) => def2.category !== "nav").map((def2) => ({ id: def2.id, label: def2.label, category: def2.category, selector: def2.selector, stateKind: "toggle" }));
    const galleryQuick = useGalleryQuickButtonsStore().buttons.map((config) => ({
      id: `gallery-quick-${config.id}`,
      label: config.label,
      category: "gallery-quick",
      selector: `[data-gallery-quick-button-id="${config.id}"]`,
      stateKind: "toggle"
    }));
    const telegram = useTelegramButtonsStore().buttons.map((config) => ({
      id: `telegram-${config.id}`,
      label: config.label,
      category: "telegram",
      selector: `[data-telegram-button-id="${config.id}"]`,
      stateKind: "stateless"
    }));
    return [...native, ...galleryQuick, ...telegram];
  }
  function resolveCatalogElement(entry) {
    return document.querySelector(entry.selector);
  }
  function readCatalogState(entry) {
    if (entry.stateKind === "stateless") {
      return void 0;
    }
    const el = resolveCatalogElement(entry);
    if (!el) {
      return void 0;
    }
    return entry.category === "gallery-quick" ? el.dataset.active === "true" : el.classList.contains("active");
  }
  function findCatalogEntryForElement(catalog, el) {
    return catalog.find((entry) => Array.from(document.querySelectorAll(entry.selector)).includes(el));
  }
  const _hoisted_1$7 = { class: "lodestone-condition-node" };
  const _hoisted_2$4 = ["value"];
  const _hoisted_3$3 = ["checked"];
  const _hoisted_4$3 = ["checked"];
  const _hoisted_5$3 = ["value"];
  const _hoisted_6$2 = ["value"];
  const _hoisted_7$1 = ["value"];
  const _hoisted_8$1 = ["value"];
  const _hoisted_9$1 = ["value"];
  const _hoisted_10$1 = { class: "lodestone-condition-node__children" };
  const _hoisted_11 = ["onClick"];
  const _sfc_main$7 = /* @__PURE__ */ defineComponent({
    __name: "ConditionGroupEditor",
    props: {
      modelValue: {},
      catalog: {},
      categories: {}
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit2 = __emit;
      function emptyLeaf() {
        return { type: "leaf", targetKind: "id", targetId: "", state: "on" };
      }
      function setKind(kind) {
        const current = props.modelValue;
        if (kind === current.type) {
          return;
        }
        if (kind === "leaf") {
          emit2("update:modelValue", emptyLeaf());
        } else if (kind === "not") {
          emit2("update:modelValue", { type: "not", child: current });
        } else {
          emit2("update:modelValue", { type: kind, children: [current] });
        }
      }
      function updateLeaf(changes) {
        if (props.modelValue.type !== "leaf") {
          return;
        }
        emit2("update:modelValue", { ...props.modelValue, ...changes });
      }
      function updateChild(child) {
        if (props.modelValue.type !== "not") {
          return;
        }
        emit2("update:modelValue", { type: "not", child });
      }
      function updateChildAt(index, child) {
        if (props.modelValue.type !== "and" && props.modelValue.type !== "or") {
          return;
        }
        emit2("update:modelValue", {
          ...props.modelValue,
          children: props.modelValue.children.map((existing, i) => i === index ? child : existing)
        });
      }
      function addChild() {
        if (props.modelValue.type !== "and" && props.modelValue.type !== "or") {
          return;
        }
        emit2("update:modelValue", { ...props.modelValue, children: [...props.modelValue.children, emptyLeaf()] });
      }
      function removeChildAt(index) {
        if (props.modelValue.type !== "and" && props.modelValue.type !== "or") {
          return;
        }
        emit2("update:modelValue", {
          ...props.modelValue,
          children: props.modelValue.children.filter((_, i) => i !== index)
        });
      }
      return (_ctx, _cache) => {
        const _component_ConditionGroupEditor = resolveComponent("ConditionGroupEditor", true);
        return openBlock(), createElementBlock("div", _hoisted_1$7, [
          createBaseVNode("select", {
            value: __props.modelValue.type,
            onChange: _cache[0] || (_cache[0] = ($event) => setKind($event.target.value))
          }, [..._cache[6] || (_cache[6] = [
            createBaseVNode("option", { value: "leaf" }, "A single button", -1),
            createBaseVNode("option", { value: "and" }, "All of (AND)", -1),
            createBaseVNode("option", { value: "or" }, "Any of (OR)", -1),
            createBaseVNode("option", { value: "not" }, "Not (NOT)", -1)
          ])], 40, _hoisted_2$4),
          __props.modelValue.type === "leaf" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createBaseVNode("label", null, [
              createBaseVNode("input", {
                type: "radio",
                value: "id",
                checked: __props.modelValue.targetKind === "id",
                onChange: _cache[1] || (_cache[1] = ($event) => updateLeaf({ targetKind: "id", targetId: "" }))
              }, null, 40, _hoisted_3$3),
              _cache[7] || (_cache[7] = createTextVNode(" Specific button ", -1))
            ]),
            createBaseVNode("label", null, [
              createBaseVNode("input", {
                type: "radio",
                value: "category",
                checked: __props.modelValue.targetKind === "category",
                onChange: _cache[2] || (_cache[2] = ($event) => updateLeaf({ targetKind: "category", targetId: "" }))
              }, null, 40, _hoisted_4$3),
              _cache[8] || (_cache[8] = createTextVNode(" Category ", -1))
            ]),
            __props.modelValue.targetKind === "id" ? (openBlock(), createElementBlock("select", {
              key: 0,
              value: __props.modelValue.targetId,
              onChange: _cache[3] || (_cache[3] = ($event) => updateLeaf({ targetId: $event.target.value }))
            }, [
              _cache[9] || (_cache[9] = createBaseVNode("option", {
                value: "",
                disabled: ""
              }, "Select a button", -1)),
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.catalog, (entry) => {
                return openBlock(), createElementBlock("option", {
                  key: entry.id,
                  value: entry.id
                }, toDisplayString(entry.label), 9, _hoisted_6$2);
              }), 128))
            ], 40, _hoisted_5$3)) : (openBlock(), createElementBlock("select", {
              key: 1,
              value: __props.modelValue.targetId,
              onChange: _cache[4] || (_cache[4] = ($event) => updateLeaf({ targetId: $event.target.value }))
            }, [
              _cache[10] || (_cache[10] = createBaseVNode("option", {
                value: "",
                disabled: ""
              }, "Select a category", -1)),
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.categories, (category) => {
                return openBlock(), createElementBlock("option", {
                  key: category,
                  value: category
                }, toDisplayString(category), 9, _hoisted_8$1);
              }), 128))
            ], 40, _hoisted_7$1)),
            createBaseVNode("select", {
              value: __props.modelValue.state,
              onChange: _cache[5] || (_cache[5] = ($event) => updateLeaf({ state: $event.target.value }))
            }, [..._cache[11] || (_cache[11] = [
              createBaseVNode("option", { value: "on" }, "is on", -1),
              createBaseVNode("option", { value: "off" }, "is off", -1),
              createBaseVNode("option", { value: "either" }, "exists (either state)", -1)
            ])], 40, _hoisted_9$1)
          ], 64)) : __props.modelValue.type === "not" ? (openBlock(), createBlock(_component_ConditionGroupEditor, {
            key: 1,
            "model-value": __props.modelValue.child,
            catalog: __props.catalog,
            categories: __props.categories,
            "onUpdate:modelValue": updateChild
          }, null, 8, ["model-value", "catalog", "categories"])) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
            createBaseVNode("ul", _hoisted_10$1, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.modelValue.children, (child, index) => {
                return openBlock(), createElementBlock("li", { key: index }, [
                  createVNode(_component_ConditionGroupEditor, {
                    "model-value": child,
                    catalog: __props.catalog,
                    categories: __props.categories,
                    "onUpdate:modelValue": (c) => updateChildAt(index, c)
                  }, null, 8, ["model-value", "catalog", "categories", "onUpdate:modelValue"]),
                  createBaseVNode("button", {
                    type: "button",
                    onClick: ($event) => removeChildAt(index)
                  }, "Remove", 8, _hoisted_11)
                ]);
              }), 128))
            ]),
            createBaseVNode("button", {
              type: "button",
              onClick: addChild
            }, "Add condition")
          ], 64))
        ]);
      };
    }
  });
  const _hoisted_1$6 = { class: "lodestone-button-effects-manager" };
  const _hoisted_2$3 = ["value"];
  const _hoisted_3$2 = ["value"];
  const _hoisted_4$2 = ["value"];
  const _hoisted_5$2 = { class: "lodestone-manager-list" };
  const _hoisted_6$1 = ["checked", "onChange"];
  const _hoisted_7 = { class: "lodestone-manager-list__actions" };
  const _hoisted_8 = ["onClick"];
  const _hoisted_9 = ["onClick"];
  const _hoisted_10 = ["onClick"];
  const _sfc_main$6 = /* @__PURE__ */ defineComponent({
    __name: "ButtonEffectsManager",
    setup(__props) {
      const store = useButtonEffectsStore();
      const draft = /* @__PURE__ */ reactive(createButtonEffectRule());
      const editingId = /* @__PURE__ */ ref(null);
      const catalog = computed(() => buildButtonCatalog());
      const categories = computed(() => [...new Set(catalog.value.map((entry) => entry.category))]);
      const actionTarget = computed(() => catalog.value.find((entry) => entry.id === draft.actionTargetId));
      const actionVerbOptions = computed(
        () => {
          var _a;
          return ((_a = actionTarget.value) == null ? void 0 : _a.stateKind) === "stateless" ? [{ value: "trigger", label: "Trigger" }] : [
            { value: "toggle", label: "Toggle" },
            { value: "turn-on", label: "Turn on" },
            { value: "turn-off", label: "Turn off" }
          ];
        }
      );
      function onActionTargetChange(id) {
        draft.actionTargetId = id;
        const target = catalog.value.find((entry) => entry.id === id);
        draft.actionVerb = (target == null ? void 0 : target.stateKind) === "stateless" ? "trigger" : "toggle";
      }
      function save() {
        if (editingId.value) {
          store.update(editingId.value, { ...draft });
          editingId.value = null;
        } else {
          store.add({ ...draft });
        }
        Object.assign(draft, createButtonEffectRule());
      }
      function edit(rule) {
        Object.assign(draft, rule);
        editingId.value = rule.id;
      }
      function cancelEdit() {
        Object.assign(draft, createButtonEffectRule());
        editingId.value = null;
      }
      function labelFor(id) {
        var _a;
        return ((_a = catalog.value.find((entry) => entry.id === id)) == null ? void 0 : _a.label) ?? id;
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$6, [
          createBaseVNode("h4", null, toDisplayString(editingId.value ? "Edit button effect" : "Add a button effect"), 1),
          createBaseVNode("label", null, [
            _cache[5] || (_cache[5] = createTextVNode("Label ", -1)),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => draft.label = $event),
              type: "text"
            }, null, 512), [
              [vModelText, draft.label]
            ])
          ]),
          createBaseVNode("fieldset", null, [
            _cache[6] || (_cache[6] = createBaseVNode("legend", null, "When", -1)),
            createVNode(_sfc_main$7, {
              modelValue: draft.condition,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => draft.condition = $event),
              catalog: catalog.value,
              categories: categories.value
            }, null, 8, ["modelValue", "catalog", "categories"])
          ]),
          createBaseVNode("label", null, [
            _cache[8] || (_cache[8] = createTextVNode(" Evaluate ", -1)),
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => draft.timing = $event)
            }, [..._cache[7] || (_cache[7] = [
              createBaseVNode("option", { value: "on-click" }, "Right when clicked", -1),
              createBaseVNode("option", { value: "after-settle" }, "After it finishes loading", -1)
            ])], 512), [
              [vModelSelect, draft.timing]
            ])
          ]),
          createBaseVNode("fieldset", null, [
            _cache[12] || (_cache[12] = createBaseVNode("legend", null, "Then", -1)),
            createBaseVNode("label", null, [
              _cache[10] || (_cache[10] = createTextVNode(" Button ", -1)),
              createBaseVNode("select", {
                value: draft.actionTargetId,
                onChange: _cache[3] || (_cache[3] = ($event) => onActionTargetChange($event.target.value))
              }, [
                _cache[9] || (_cache[9] = createBaseVNode("option", {
                  value: "",
                  disabled: ""
                }, "Select a button", -1)),
                (openBlock(true), createElementBlock(Fragment, null, renderList(catalog.value, (entry) => {
                  return openBlock(), createElementBlock("option", {
                    key: entry.id,
                    value: entry.id
                  }, toDisplayString(entry.label), 9, _hoisted_3$2);
                }), 128))
              ], 40, _hoisted_2$3)
            ]),
            createBaseVNode("label", null, [
              _cache[11] || (_cache[11] = createTextVNode(" Action ", -1)),
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => draft.actionVerb = $event)
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(actionVerbOptions.value, (option) => {
                  return openBlock(), createElementBlock("option", {
                    key: option.value,
                    value: option.value
                  }, toDisplayString(option.label), 9, _hoisted_4$2);
                }), 128))
              ], 512), [
                [vModelSelect, draft.actionVerb]
              ])
            ])
          ]),
          createBaseVNode("button", {
            type: "button",
            onClick: save
          }, toDisplayString(editingId.value ? "Save changes" : "Save"), 1),
          editingId.value ? (openBlock(), createElementBlock("button", {
            key: 0,
            type: "button",
            onClick: cancelEdit
          }, "Cancel edit")) : createCommentVNode("", true),
          _cache[13] || (_cache[13] = createBaseVNode("h4", null, "Configured button effects", -1)),
          createBaseVNode("ul", _hoisted_5$2, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(store).rules, (rule) => {
              return openBlock(), createElementBlock("li", {
                key: rule.id,
                class: "lodestone-manager-list__item"
              }, [
                createBaseVNode("label", null, [
                  createBaseVNode("input", {
                    type: "checkbox",
                    checked: rule.enabled,
                    onChange: ($event) => unref(store).update(rule.id, { enabled: $event.target.checked })
                  }, null, 40, _hoisted_6$1),
                  createTextVNode(" " + toDisplayString(rule.label), 1)
                ]),
                createBaseVNode("span", null, "→ " + toDisplayString(labelFor(rule.actionTargetId)), 1),
                createBaseVNode("span", _hoisted_7, [
                  createBaseVNode("button", {
                    type: "button",
                    onClick: ($event) => edit(rule)
                  }, "Edit", 8, _hoisted_8),
                  createBaseVNode("button", {
                    type: "button",
                    onClick: ($event) => unref(store).duplicate(rule.id)
                  }, "Duplicate", 8, _hoisted_9),
                  createBaseVNode("button", {
                    type: "button",
                    onClick: ($event) => unref(store).remove(rule.id)
                  }, "Delete", 8, _hoisted_10)
                ])
              ]);
            }), 128))
          ])
        ]);
      };
    }
  });
  const _hoisted_1$5 = { class: "lodestone-settings-section" };
  const _sfc_main$5 = /* @__PURE__ */ defineComponent({
    __name: "ButtonEffectsSection",
    setup(__props) {
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$5, [
          _cache[0] || (_cache[0] = createBaseVNode("h3", null, "Button effects", -1)),
          createVNode(_sfc_main$6)
        ]);
      };
    }
  });
  const SETTINGS_BACKUP_VERSION = 1;
  function exportAllSettings() {
    return {
      version: SETTINGS_BACKUP_VERSION,
      settings: { ...useSettingsStore().$state },
      telegramButtons: { ...useTelegramButtonsStore().$state },
      galleryQuickButtons: { ...useGalleryQuickButtonsStore().$state },
      buttonEffects: { ...useButtonEffectsStore().$state }
    };
  }
  function isRecord(value) {
    return typeof value === "object" && value !== null;
  }
  function importAllSettings(data) {
    if (!isRecord(data) || typeof data.version !== "number") {
      throw new Error('Not a valid settings export: missing a "version" field.');
    }
    useSettingsStore().$patch(
      normalizeSettingsState({ ...settingsDefaults, ...isRecord(data.settings) ? data.settings : {} })
    );
    useTelegramButtonsStore().$patch({
      ...createTelegramButtonsDefaults(),
      ...isRecord(data.telegramButtons) ? data.telegramButtons : {}
    });
    useGalleryQuickButtonsStore().$patch(
      normalizeGalleryQuickButtonsState({
        ...createGalleryQuickButtonsDefaults(),
        ...isRecord(data.galleryQuickButtons) ? data.galleryQuickButtons : {}
      })
    );
    useButtonEffectsStore().$patch(
      normalizeButtonEffectsState({
        ...createButtonEffectsDefaults(),
        ...isRecord(data.buttonEffects) ? data.buttonEffects : {}
      })
    );
  }
  const _hoisted_1$4 = { class: "lodestone-settings-section" };
  const _hoisted_2$2 = ["value"];
  const _hoisted_3$1 = { class: "lodestone-inline-group" };
  const _hoisted_4$1 = {
    key: 0,
    class: "lodestone-import-export__error"
  };
  const _hoisted_5$1 = {
    key: 1,
    class: "lodestone-import-export__success"
  };
  const _sfc_main$4 = /* @__PURE__ */ defineComponent({
    __name: "ImportExportSection",
    setup(__props) {
      const exportJson = computed(() => JSON.stringify(exportAllSettings(), null, 2));
      const importText = /* @__PURE__ */ ref("");
      const importError = /* @__PURE__ */ ref("");
      const importSuccess = /* @__PURE__ */ ref(false);
      const fileInputRef = /* @__PURE__ */ ref(null);
      async function copyExport() {
        await navigator.clipboard.writeText(exportJson.value);
      }
      function downloadExport() {
        const blob = new Blob([exportJson.value], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "derpibooru-userscript-settings.json";
        link.click();
        URL.revokeObjectURL(url);
      }
      function onFileChosen(event) {
        var _a;
        const file = (_a = event.target.files) == null ? void 0 : _a[0];
        if (!file) {
          return;
        }
        file.text().then((text) => {
          importText.value = text;
        });
      }
      function runImport() {
        importError.value = "";
        importSuccess.value = false;
        let parsed;
        try {
          parsed = JSON.parse(importText.value);
        } catch {
          importError.value = "That is not valid JSON.";
          return;
        }
        if (!confirm("Replace your current settings with the imported ones?")) {
          return;
        }
        try {
          importAllSettings(parsed);
          importSuccess.value = true;
        } catch (error) {
          importError.value = error instanceof Error ? error.message : "Import failed.";
        }
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$4, [
          _cache[3] || (_cache[3] = createBaseVNode("h3", null, "Import / Export", -1)),
          _cache[4] || (_cache[4] = createBaseVNode("h4", null, "Export", -1)),
          createBaseVNode("label", null, [
            _cache[1] || (_cache[1] = createTextVNode(" Settings JSON ", -1)),
            createBaseVNode("textarea", {
              readonly: "",
              rows: "6",
              value: exportJson.value
            }, null, 8, _hoisted_2$2)
          ]),
          createBaseVNode("span", { class: "lodestone-inline-group" }, [
            createBaseVNode("button", {
              type: "button",
              onClick: copyExport
            }, "Copy to clipboard"),
            createBaseVNode("button", {
              type: "button",
              onClick: downloadExport
            }, "Download as file")
          ]),
          _cache[5] || (_cache[5] = createBaseVNode("h4", null, "Import", -1)),
          createBaseVNode("label", null, [
            _cache[2] || (_cache[2] = createTextVNode(" Paste JSON ", -1)),
            withDirectives(createBaseVNode("textarea", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => importText.value = $event),
              rows: "6",
              placeholder: "Paste a previously exported settings JSON here"
            }, null, 512), [
              [vModelText, importText.value]
            ])
          ]),
          createBaseVNode("span", _hoisted_3$1, [
            createBaseVNode("input", {
              ref_key: "fileInputRef",
              ref: fileInputRef,
              type: "file",
              accept: "application/json",
              onChange: onFileChosen
            }, null, 544),
            createBaseVNode("button", {
              type: "button",
              onClick: runImport
            }, "Import")
          ]),
          importError.value ? (openBlock(), createElementBlock("p", _hoisted_4$1, toDisplayString(importError.value), 1)) : createCommentVNode("", true),
          importSuccess.value ? (openBlock(), createElementBlock("p", _hoisted_5$1, "Settings imported.")) : createCommentVNode("", true)
        ]);
      };
    }
  });
  const _hoisted_1$3 = { class: "lodestone-settings-tab" };
  const _sfc_main$3 = /* @__PURE__ */ defineComponent({
    __name: "SettingsTab",
    setup(__props) {
      installSettingsPersistence(useSettingsStore());
      installTelegramButtonsPersistence(useTelegramButtonsStore());
      installGalleryQuickButtonsPersistence(useGalleryQuickButtonsStore());
      installButtonEffectsPersistence(useButtonEffectsStore());
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$3, [
          createVNode(_sfc_main$l),
          createVNode(_sfc_main$k),
          createVNode(_sfc_main$j),
          createVNode(_sfc_main$i),
          createVNode(_sfc_main$8),
          createVNode(_sfc_main$b),
          createVNode(_sfc_main$5),
          createVNode(_sfc_main$m),
          createVNode(_sfc_main$4)
        ]);
      };
    }
  });
  function gmRequest(options) {
    return new Promise((resolve2, reject) => {
      GM_xmlhttpRequest({
        method: options.method,
        url: options.url,
        headers: options.headers,
        data: options.data,
        onload: (response) => resolve2({ status: response.status, responseText: response.responseText }),
        onerror: (error) => reject(error)
      });
    });
  }
  function parseDsn(dsn) {
    const url = new URL(dsn);
    const projectId = url.pathname.replace(/^\//, "");
    return {
      publicKey: url.username,
      host: url.host,
      projectId,
      protocol: url.protocol
    };
  }
  function generateEventId() {
    return Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
  }
  function parseStackFrames(stack2) {
    return stack2.split("\n").slice(1).map((line) => ({ function: line.trim() }));
  }
  function buildEnvelope(dsn, error, tags) {
    const parsed = parseDsn(dsn);
    const eventId = generateEventId();
    const sentAt = (/* @__PURE__ */ new Date()).toISOString();
    const url = `${parsed.protocol}//${parsed.host}/api/${parsed.projectId}/envelope/?sentry_key=${parsed.publicKey}&sentry_version=7`;
    const envelopeHeader = JSON.stringify({ event_id: eventId, sent_at: sentAt, dsn });
    const itemHeader = JSON.stringify({ type: "event" });
    const event = JSON.stringify({
      event_id: eventId,
      timestamp: Date.now() / 1e3,
      platform: "javascript",
      tags,
      exception: {
        values: [
          {
            type: "Error",
            value: error.message,
            stacktrace: error.stack ? { frames: parseStackFrames(error.stack) } : void 0
          }
        ]
      }
    });
    return { url, body: `${envelopeHeader}
${itemHeader}
${event}
` };
  }
  async function sendErrorReport(dsn, error, tags = {}) {
    const { url, body } = buildEnvelope(dsn, error, tags);
    await gmRequest({
      method: "POST",
      url,
      headers: { "Content-Type": "application/x-sentry-envelope" },
      data: body
    });
  }
  const DSN = "https://aa84d1365c0b4319b6f59aac8e7eb8d1@bugsink-ufjcjjsvpd6bu8wre8l8tdsl.las-pegasus.crusader.maneframe.network/21";
  function resolveDsn(settings) {
    return settings.sentryDsn.trim() || DSN;
  }
  function toReportable(value) {
    if (value instanceof Error) {
      return { message: value.message, stack: value.stack };
    }
    return { message: String(value) };
  }
  function report(error, tags) {
    const settings = getValue(SETTINGS_STORAGE_KEY, settingsDefaults);
    const dsn = resolveDsn(settings);
    if (!settings.errorReportingEnabled) {
      return;
    }
    void sendErrorReport(dsn, error, tags).catch(() => {
    });
  }
  function installErrorReporting() {
    window.addEventListener("error", (event) => {
      var _a;
      report({ message: event.message, stack: (_a = event.error) == null ? void 0 : _a.stack }, { source: "window.onerror" });
    });
    window.addEventListener("unhandledrejection", (event) => {
      report(toReportable(event.reason), { source: "unhandledrejection" });
    });
  }
  function vueErrorHandler(error) {
    report(toReportable(error), { source: "vue" });
  }
  function addStyle(css) {
    return GM_addStyle(css);
  }
  let injected$3 = false;
  function ensureSettingsTabStyles() {
    if (injected$3) {
      return;
    }
    injected$3 = true;
    addStyle(`
    .lodestone-settings-section { margin-top: 16px; padding-top: 8px; border-top: 1px solid rgba(128, 128, 128, 0.3); }
    .lodestone-settings-section:first-child { margin-top: 0; padding-top: 0; border-top: none; }
    .lodestone-settings-section h3 { margin: 0 0 8px; }
    .lodestone-settings-section h4 { margin: 12px 0 4px; }

    /* Default row: a value field. Label sits in a fixed-width column so every input in the
       section lines up on the same edge, however long its label text runs -- long labels
       wrap inside their column instead of shoving the input sideways. */
    .lodestone-settings-section label {
      display: grid;
      grid-template-columns: 160px 1fr;
      align-items: center;
      column-gap: 12px;
      row-gap: 2px;
      margin: 4px 0;
      padding: 3px 4px;
      border-radius: 4px;
    }
    .lodestone-settings-section label > input[type='text'],
    .lodestone-settings-section label > input[type='password'],
    .lodestone-settings-section label > input[type='number'],
    .lodestone-settings-section label > select {
      width: 100%;
      min-width: 0;
    }
    .lodestone-settings-section label > input[type='color'] { justify-self: start; }
    .lodestone-settings-section label > textarea {
      width: 100%;
      min-width: 0;
      font-family: monospace;
      resize: vertical;
    }

    .lodestone-import-export__error { color: #c0392b; }
    .lodestone-import-export__success { color: #27ae60; }

    /* Shared "here's what this will actually send" preview treatment for the Telegram
       caption editor and caption-source picker -- a real blockquote reads as a quoted
       message rather than an arbitrary text block. */
    .lodestone-preview-blockquote {
      margin: 8px 0;
      padding: 6px 12px;
      border-left: 3px solid rgba(128, 128, 128, 0.4);
      background: rgba(128, 128, 128, 0.08);
      border-radius: 0 4px 4px 0;
      white-space: pre-wrap;
      word-break: break-word;
    }

    /* {json.<path>} picker tree: <details>/<summary> nesting needs its own indent since
       nested <ul> no longer carries one implicitly once wrapped in <details>. */
    .lodestone-json-viewer { list-style: none; margin: 0; padding-left: 16px; }
    .lodestone-caption-editor__json-root summary,
    .lodestone-json-viewer summary { cursor: pointer; }
    .lodestone-caption-editor__json-root summary::marker,
    .lodestone-json-viewer summary::marker { color: rgba(128, 128, 128, 0.6); }

    /* Toggle row: a checkbox/radio carries its own meaning, so it reads better as one
       inline sentence than as a two-column value field. */
    .lodestone-settings-section label:has(> input[type='checkbox']),
    .lodestone-settings-section label:has(> input[type='radio']) {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    /* A value row with an inline action button (reset/reveal) keeps the label column
       aligned with every other value row -- the input+button pair shares the value column
       as one flex group instead of the button knocking the row out of the grid. */
    .lodestone-settings-section label .lodestone-inline-group {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      width: 100%;
    }
    .lodestone-settings-section label .lodestone-inline-group > input { flex: 1 1 160px; }

    .lodestone-settings-section label:hover { background: rgba(128, 128, 128, 0.08); }

    /* Fields that only matter once a preceding toggle is on -- indented with a rule so the
       dependency reads visually, not just from proximity. */
    .lodestone-settings-subfields,
    .lodestone-settings-section label.lodestone-settings-subfield {
      margin-left: 20px;
      padding-left: 10px;
      border-left: 2px solid rgba(128, 128, 128, 0.25);
    }

    /* The hide-buttons checklist is long (every default Philomena button) -- let it flow
       into as many columns as fit instead of one long scroll, and borrow each button's own
       icon color as a quiet hover accent rather than inventing a new one. */
    .lodestone-hide-group { column-width: 220px; column-gap: 4px; }
    .lodestone-hide-group label {
      break-inside: avoid;
      grid-template-columns: none;
      display: flex;
      align-items: center;
      gap: 8px;
      border-left: 3px solid transparent;
    }
    .lodestone-hide-group label:hover,
    .lodestone-hide-group label:focus-within {
      border-left-color: var(--lodestone-accent, currentColor);
    }

    .lodestone-quick-button-manager__preview,
    .lodestone-telegram-manager__preview {
      margin: 10px 0;
    }
    .lodestone-quick-button-manager > button,
    .lodestone-telegram-manager > button {
      margin: 0 0 8px;
    }

    /* Configured-item lists (quick buttons, Telegram buttons): one row per entry, preview
       on the left, actions pinned to the right instead of crowding the label text. */
    .lodestone-manager-list { list-style: none; margin: 8px 0 0; padding: 0; }
    .lodestone-manager-list__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 6px 4px;
      border-top: 1px solid rgba(128, 128, 128, 0.15);
    }
    .lodestone-manager-list__item:first-child { border-top: none; }
    .lodestone-manager-list__actions { display: flex; gap: 6px; flex-shrink: 0; }

    @media (prefers-reduced-motion: no-preference) {
      .lodestone-settings-section label { transition: background-color 120ms ease, border-color 120ms ease; }
    }
  `);
  }
  const TAB_ID = "lodestones-userscript";
  const TAB_LABEL = "Lodestone's Userscript";
  function mountSettingsTab(pinia2) {
    const selectors = resolveSelectors(location.hostname);
    const header = document.querySelector(selectors.settingsTabHeader);
    if (!header) {
      return;
    }
    ensureSettingsTabStyles();
    const tabContainer = header.parentElement;
    if (!tabContainer) {
      return;
    }
    const localLink = header.querySelector('[data-click-tab="local"]');
    const link = document.createElement("a");
    link.dataset.clickTab = TAB_ID;
    link.href = "#";
    link.textContent = TAB_LABEL;
    localLink ? localLink.after(link) : header.append(link);
    const panel = document.createElement("div");
    panel.className = "block__tab hidden";
    panel.dataset.tab = TAB_ID;
    tabContainer.append(panel);
    link.addEventListener("click", (event) => {
      event.preventDefault();
      tabContainer.querySelectorAll("[data-click-tab]").forEach((el) => el.classList.remove("selected"));
      tabContainer.querySelectorAll("[data-tab]").forEach((el) => el.classList.add("hidden"));
      link.classList.add("selected");
      panel.classList.remove("hidden");
    });
    const app = createApp(_sfc_main$3);
    app.config.errorHandler = vueErrorHandler;
    app.use(pinia2).mount(panel);
  }
  const IMAGE_SCORE_SELECTOR = ".block__header .score.block__header__title";
  const LIST_SCORE_SELECTOR = ".media-box .score";
  function buildBiggerButtonsCss(listSize, imageSize) {
    const listSelector = [...listButtonDefs.map((button) => button.selector), LIST_SCORE_SELECTOR].join(", ");
    const imageSelector = [...imageButtonDefs.map((button) => button.selector), IMAGE_SCORE_SELECTOR].join(", ");
    return [
      `${listSelector} { font-size: ${listSize}px !important; }`,
      `${imageSelector} { font-size: ${imageSize}px !important; }`
    ].join("\n");
  }
  function initBiggerButtons() {
    const store = useSettingsStore();
    let styleEl = null;
    watch(
      () => [store.biggerButtonsEnabled, store.listButtonSize, store.imageButtonSize],
      ([enabled, listSize, imageSize]) => {
        styleEl == null ? void 0 : styleEl.remove();
        styleEl = enabled ? addStyle(buildBiggerButtonsCss(listSize, imageSize)) : null;
      },
      { immediate: true, flush: "sync" }
    );
  }
  const SPINNER_ICON_CLASS = "lodestone-spinner-icon";
  const SPINNER_ACTIVE_CLASS = "lodestone-spinner-active";
  const SPINNER_HIDDEN_ICON_CLASS = "lodestone-spinner-hidden-icon";
  const ICON_SELECTOR = 'i.fa, i[class*="fa-"]';
  addStyle(`
  .${SPINNER_ACTIVE_CLASS} { opacity: 0.6; pointer-events: none; }
  .${SPINNER_HIDDEN_ICON_CLASS} { display: none; }
`);
  function useSpinnerAction() {
    async function run(element, action) {
      const icon = element.querySelector(ICON_SELECTOR);
      const spinner = document.createElement("i");
      spinner.className = `fa fa-spinner fa-spin ${SPINNER_ICON_CLASS}`;
      if (icon) {
        icon.classList.add(SPINNER_HIDDEN_ICON_CLASS);
        icon.insertAdjacentElement("beforebegin", spinner);
      } else {
        element.appendChild(spinner);
      }
      element.classList.add(SPINNER_ACTIVE_CLASS);
      try {
        await action();
      } finally {
        spinner.remove();
        icon == null ? void 0 : icon.classList.remove(SPINNER_HIDDEN_ICON_CLASS);
        element.classList.remove(SPINNER_ACTIVE_CLASS);
      }
    }
    return { run };
  }
  const DEFAULT_TIMEOUT_MS = 8e3;
  function waitForMutation(container, timeoutMs = DEFAULT_TIMEOUT_MS) {
    return new Promise((resolve2) => {
      const timeout = setTimeout(() => {
        observer.disconnect();
        resolve2();
      }, timeoutMs);
      const observer = new MutationObserver(() => {
        observer.disconnect();
        clearTimeout(timeout);
        resolve2();
      });
      observer.observe(container, { childList: true, subtree: true, characterData: true, attributes: true });
    });
  }
  const eventListeners = /* @__PURE__ */ new Set();
  function notifyButtonEvent(event) {
    for (const listener of eventListeners) {
      listener(event);
    }
  }
  function subscribeButtonEvents(listener) {
    eventListeners.add(listener);
    return () => eventListeners.delete(listener);
  }
  function notifyNativeButtonEvent(el, phase) {
    const entry = findCatalogEntryForElement(buildButtonCatalog(), el);
    if (entry) {
      notifyButtonEvent({ buttonId: entry.id, phase });
    }
  }
  const actionRegistry = /* @__PURE__ */ new Map();
  function registerButtonAction(id, trigger2) {
    actionRegistry.set(id, trigger2);
  }
  function getButtonAction(id) {
    return actionRegistry.get(id);
  }
  const ACTION_SELECTOR = '.interaction--fave, .interaction--upvote, .interaction--downvote, .interaction--hide, .js-prev, .js-up, .js-next, .js-rand, a[href$="/subscription"]';
  function initVoteProgress() {
    const store = useSettingsStore();
    const { run } = useSpinnerAction();
    document.addEventListener(
      "click",
      (event) => {
        var _a;
        if (!store.voteProgressEnabled) {
          return;
        }
        const target = (_a = event.target) == null ? void 0 : _a.closest(ACTION_SELECTOR);
        if (!target) {
          return;
        }
        const container = target.closest(".stretched-mobile-links, .media-box__overlay") ?? target.parentElement ?? target;
        notifyNativeButtonEvent(target, "on-click");
        void run(target, () => waitForMutation(container).then(() => notifyNativeButtonEvent(target, "after-settle")));
      },
      { capture: true }
    );
  }
  const RULES = [
    { selector: ".interaction--fave", color: "#f2b70c" },
    { selector: ".interaction--upvote", color: "#5cb85c" },
    { selector: ".interaction--downvote", color: "#d9534f" },
    { selector: ".interaction--hide", color: "#8a8a8a" }
  ];
  function buildVoteHoverCss() {
    const base2 = RULES.map((rule) => `${rule.selector} { border: 2px solid transparent; border-radius: 4px; box-sizing: border-box; }`).join(
      "\n"
    );
    const striped = RULES.map(
      (rule) => `${rule.selector}:hover, ${rule.selector}:active { border-image: repeating-linear-gradient(45deg, ${rule.color} 0 4px, transparent 4px 8px) 4; }`
    ).join("\n");
    return `${base2}
${striped}`;
  }
  function initVoteHoverStyle() {
    const store = useSettingsStore();
    let styleEl = null;
    watch(
      () => store.voteHoverStyleEnabled,
      (enabled) => {
        styleEl == null ? void 0 : styleEl.remove();
        styleEl = enabled ? addStyle(buildVoteHoverCss()) : null;
      },
      { immediate: true, flush: "sync" }
    );
  }
  function buildHideButtonsCss(hiddenIds) {
    const selectors = allButtonDefs.filter((button) => hiddenIds.includes(button.id)).map((button) => button.selector);
    return selectors.length ? `${selectors.join(", ")} { display: none !important; }` : "";
  }
  function initHideButtons() {
    const store = useSettingsStore();
    let styleEl = null;
    watch(
      () => store.hiddenButtonIds,
      (hiddenIds) => {
        styleEl == null ? void 0 : styleEl.remove();
        const css = buildHideButtonsCss(hiddenIds);
        styleEl = css ? addStyle(css) : null;
      },
      { immediate: true, flush: "sync", deep: true }
    );
  }
  const GALLERY_LINK_SELECTOR$1 = ".add-to-gallery-list a";
  function initGalleryDropdownAutoClose() {
    document.addEventListener("click", (event) => {
      var _a, _b;
      const link = (_a = event.target) == null ? void 0 : _a.closest(GALLERY_LINK_SELECTOR$1);
      if (!link) {
        return;
      }
      const dropdown = link.closest(".dropdown");
      dropdown == null ? void 0 : dropdown.classList.remove("open", "show");
      (_b = document.activeElement) == null ? void 0 : _b.blur();
    });
  }
  function parseGalleryList(container) {
    return Array.from(container.querySelectorAll('li[id^="gallery_"]')).flatMap((li) => {
      var _a;
      const addLink = li.querySelector("a.js-gallery-add");
      const removeLink = li.querySelector("a.js-gallery-remove");
      const link = addLink ?? removeLink;
      if (!link) {
        return [];
      }
      const id = li.id.replace(/^gallery_/, "");
      return [
        {
          id,
          name: ((_a = link.textContent) == null ? void 0 : _a.trim()) || id,
          href: (addLink == null ? void 0 : addLink.getAttribute("href")) ?? link.getAttribute("href") ?? "#",
          active: !!removeLink && !removeLink.classList.contains("hidden")
        }
      ];
    });
  }
  function filterGalleries(items, query) {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return [...items];
    }
    return items.filter((item) => item.name.toLowerCase().includes(needle));
  }
  function sortGalleries(items, alphabetical, pinnedIds) {
    const byName = (a, b) => a.name.localeCompare(b.name);
    const pinned = items.filter((item) => pinnedIds.includes(item.id));
    const rest = items.filter((item) => !pinnedIds.includes(item.id));
    return [...alphabetical ? [...pinned].sort(byName) : pinned, ...alphabetical ? [...rest].sort(byName) : rest];
  }
  let injected$2 = false;
  function ensureGalleryDropdownDecoratorStyles() {
    if (injected$2) {
      return;
    }
    injected$2 = true;
    addStyle(`
    .lodestone-native-gallery-dropdown--left .js-gallery-list,
    .lodestone-native-gallery-dropdown--left .js-gallery-list li {
      text-align: left;
    }
    .lodestone-gallery-dropdown-thumb {
      width: 16px;
      height: 16px;
      object-fit: cover;
      margin-right: 4px;
      vertical-align: middle;
      border-radius: 2px;
    }
  `);
  }
  function initGalleryDropdownDecorator() {
    const settings = useSettingsStore();
    const selectors = resolveSelectors(location.hostname);
    const toggleSelector = `${selectors.galleryDropdownRoot} > a`;
    document.addEventListener("click", (event) => {
      var _a;
      const toggle = (_a = event.target) == null ? void 0 : _a.closest(toggleSelector);
      if (!toggle) {
        return;
      }
      const dropdownTab = toggle.closest(selectors.galleryDropdownRoot);
      const content = dropdownTab == null ? void 0 : dropdownTab.querySelector(selectors.galleryDropdownContent);
      if (!content) {
        return;
      }
      decorate(content, settings);
    });
  }
  function decorate(content, settings) {
    var _a;
    ensureGalleryDropdownDecoratorStyles();
    content.classList.toggle("lodestone-native-gallery-dropdown--left", settings.galleryLeftAlign);
    const items = parseGalleryList(content);
    if (items.length === 0) {
      return;
    }
    const sorted = sortGalleries(items, settings.gallerySortAlphabetical, settings.pinnedGalleryIds);
    const liById = new Map(
      Array.from(content.querySelectorAll('li[id^="gallery_"]')).map((li) => [
        li.id.replace(/^gallery_/, ""),
        li
      ])
    );
    const listContainer = (_a = liById.values().next().value) == null ? void 0 : _a.parentElement;
    if (listContainer) {
      for (const item of sorted) {
        const li = liById.get(item.id);
        if (li) {
          listContainer.append(li);
        }
      }
    }
    if (settings.galleryShowIcons) {
      void applyThumbnails(content, items);
    }
  }
  async function applyThumbnails(content, items) {
    const username = getCurrentUsername();
    if (!username) {
      return;
    }
    let options;
    try {
      options = await searchUserGalleries(username);
    } catch {
      return;
    }
    const thumbnailById = new Map(options.map((option) => [String(option.id), option.thumbnailUrl]));
    for (const item of items) {
      const url = thumbnailById.get(item.id);
      if (!url) {
        continue;
      }
      const li = Array.from(content.querySelectorAll('li[id^="gallery_"]')).find(
        (candidate) => candidate.id === `gallery_${item.id}`
      );
      const link = (li == null ? void 0 : li.querySelector("a.js-gallery-add")) ?? (li == null ? void 0 : li.querySelector("a.js-gallery-remove"));
      if (!link || link.querySelector("img")) {
        continue;
      }
      const img = document.createElement("img");
      img.src = url;
      img.className = "lodestone-gallery-dropdown-thumb";
      link.prepend(img);
    }
  }
  const GALLERY_LINK_SELECTOR = ".add-to-gallery-list a";
  const TOGGLE_SELECTOR = ".block__header__dropdown-tab > a";
  function initGalleryProgress() {
    const store = useSettingsStore();
    const { run } = useSpinnerAction();
    document.addEventListener("click", (event) => {
      var _a;
      if (!store.galleryProgressEnabled) {
        return;
      }
      const link = (_a = event.target) == null ? void 0 : _a.closest(GALLERY_LINK_SELECTOR);
      if (!link) {
        return;
      }
      const dropdownTab = link.closest(".block__header__dropdown-tab");
      const toggle = dropdownTab == null ? void 0 : dropdownTab.querySelector(TOGGLE_SELECTOR);
      if (!dropdownTab || !toggle) {
        return;
      }
      notifyNativeButtonEvent(dropdownTab, "on-click");
      void run(toggle, () => waitForMutation(dropdownTab).then(() => notifyNativeButtonEvent(dropdownTab, "after-settle")));
    });
  }
  function useBodyScrollLock() {
    let previousOverflow = "";
    onMounted(() => {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    });
    onBeforeUnmount(() => {
      document.body.style.overflow = previousOverflow;
    });
  }
  function getCsrfToken(hostname = location.hostname) {
    const selectors = resolveSelectors(hostname);
    const meta = document.querySelector(selectors.csrfTokenMeta);
    return (meta == null ? void 0 : meta.content) ?? null;
  }
  function getCsrfFieldName(hostname = location.hostname) {
    const selectors = resolveSelectors(hostname);
    const paramMeta = selectors.csrfParamMeta ? document.querySelector(selectors.csrfParamMeta) : null;
    return (paramMeta == null ? void 0 : paramMeta.content) ?? selectors.csrfFieldNameFallback;
  }
  async function toggleViaApi(galleryId, imageId, action) {
    const token = getCsrfToken();
    if (!token) {
      return false;
    }
    const field = getCsrfFieldName();
    const body = new URLSearchParams({ image_id: String(imageId), [field]: token });
    if (action === "remove") {
      body.set("_method", "delete");
    }
    const response = await fetch(`/galleries/${galleryId}/images`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest"
      },
      body
    });
    return response.ok;
  }
  function toggleViaDom(galleryId, action) {
    const linkClass = action === "add" ? "js-gallery-add" : "js-gallery-remove";
    const link = document.querySelector(`#gallery_${galleryId} a.${linkClass}`);
    if (!link) {
      return false;
    }
    link.click();
    return true;
  }
  async function toggleGalleryMembership(galleryId, imageId, action) {
    try {
      const ok = await toggleViaApi(galleryId, imageId, action);
      if (ok) {
        return { ok: true, strategy: "api" };
      }
    } catch {
    }
    return { ok: toggleViaDom(galleryId, action), strategy: "dom-fallback" };
  }
  let injected$1 = false;
  function ensureGalleryFullPageStyles() {
    if (injected$1) {
      return;
    }
    injected$1 = true;
    addStyle(`
    .lodestone-gallery-overlay {
      position: fixed;
      inset: 0;
      z-index: 999999;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px;
      background: rgba(0, 0, 0, 0.85);
      color: #fff;
    }
    .lodestone-gallery-overlay__progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      width: 100%;
      background: linear-gradient(90deg, transparent, #5bc0de, transparent);
      background-size: 50% 100%;
      animation: lodestone-gallery-progress-slide 1s linear infinite;
    }
    @keyframes lodestone-gallery-progress-slide {
      from { background-position: -50% 0; }
      to { background-position: 150% 0; }
    }
    .lodestone-gallery-overlay__close {
      align-self: flex-end;
    }
    .lodestone-gallery-overlay__scroll {
      flex: 1;
      overflow-y: auto;
    }
    .lodestone-gallery-overlay__scroll.lodestone-gallery-overlay__scroll--loading {
      pointer-events: none;
    }
    .lodestone-gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
      gap: 6px;
      list-style: none;
      margin: 0;
      padding: 0;
      text-align: center;
    }
    .lodestone-gallery-grid--left {
      text-align: left;
      justify-items: start;
    }
    .lodestone-gallery-grid__item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .lodestone-gallery-grid__title-bar {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
    }
    .lodestone-gallery-grid__pin {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      padding: 0;
    }
    .lodestone-gallery-grid__pin--active {
      color: #f2b70c;
    }
    .lodestone-gallery-grid__title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .lodestone-gallery-grid__thumb-button {
      width: 100%;
      aspect-ratio: 1;
      padding: 0;
      border: none;
      background: #222;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .lodestone-gallery-grid__thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .lodestone-gallery-grid__thumb-fallback {
      font-size: 24px;
    }
    .lodestone-gallery-grid__item--active {
      font-weight: bold;
      outline: 2px solid #5bc0de;
    }
  `);
  }
  const _hoisted_1$2 = ["value"];
  const _sfc_main$2 = /* @__PURE__ */ defineComponent({
    __name: "GallerySearchBar",
    props: {
      modelValue: {}
    },
    emits: ["update:modelValue"],
    setup(__props) {
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("input", {
          value: __props.modelValue,
          class: "lodestone-gallery-search",
          placeholder: "Filter galleries by name",
          type: "search",
          onInput: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:modelValue", $event.target.value))
        }, null, 40, _hoisted_1$2);
      };
    }
  });
  const _hoisted_1$1 = { class: "lodestone-gallery-grid__title-bar" };
  const _hoisted_2$1 = ["title", "onClick"];
  const _hoisted_3 = { class: "lodestone-gallery-grid__title" };
  const _hoisted_4 = ["onClick"];
  const _hoisted_5 = ["src"];
  const _hoisted_6 = {
    key: 1,
    class: "fa fa-image lodestone-gallery-grid__thumb-fallback"
  };
  const _sfc_main$1 = /* @__PURE__ */ defineComponent({
    __name: "GalleryGrid",
    props: {
      items: {},
      showIcons: { type: Boolean },
      leftAlign: { type: Boolean },
      pinnedIds: {}
    },
    emits: ["toggleMembership", "togglePin"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit2 = __emit;
      function isPinned(item) {
        return props.pinnedIds.includes(item.id);
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("ul", {
          class: normalizeClass(["lodestone-gallery-grid", { "lodestone-gallery-grid--left": __props.leftAlign }])
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (item) => {
            return openBlock(), createElementBlock("li", {
              key: item.id,
              class: "lodestone-gallery-grid__item"
            }, [
              createBaseVNode("div", _hoisted_1$1, [
                createBaseVNode("button", {
                  type: "button",
                  class: normalizeClass(["lodestone-gallery-grid__pin", { "lodestone-gallery-grid__pin--active": isPinned(item) }]),
                  title: isPinned(item) ? "Unpin" : "Pin",
                  onClick: ($event) => emit2("togglePin", item)
                }, [..._cache[0] || (_cache[0] = [
                  createBaseVNode("i", { class: "fa fa-thumb-tack" }, null, -1)
                ])], 10, _hoisted_2$1),
                createBaseVNode("span", _hoisted_3, toDisplayString(item.name), 1)
              ]),
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass(["lodestone-gallery-grid__thumb-button", { "lodestone-gallery-grid__item--active": item.active }]),
                onClick: ($event) => emit2("toggleMembership", item)
              }, [
                __props.showIcons && item.thumbnailUrl ? (openBlock(), createElementBlock("img", {
                  key: 0,
                  src: item.thumbnailUrl,
                  class: "lodestone-gallery-grid__thumb"
                }, null, 8, _hoisted_5)) : __props.showIcons ? (openBlock(), createElementBlock("i", _hoisted_6)) : createCommentVNode("", true)
              ], 10, _hoisted_4)
            ]);
          }), 128))
        ], 2);
      };
    }
  });
  const _hoisted_1 = { class: "lodestone-gallery-overlay" };
  const _hoisted_2 = {
    key: 0,
    class: "lodestone-gallery-overlay__progress"
  };
  const _sfc_main = /* @__PURE__ */ defineComponent({
    __name: "GalleryOverlay",
    props: {
      items: {},
      imageId: {}
    },
    emits: ["close"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit2 = __emit;
      ensureGalleryFullPageStyles();
      useBodyScrollLock();
      const store = useSettingsStore();
      const items = /* @__PURE__ */ ref([...props.items]);
      const query = /* @__PURE__ */ ref("");
      const loading = /* @__PURE__ */ ref(false);
      const alphabeticalOverride = /* @__PURE__ */ ref(store.gallerySortAlphabetical);
      const visibleItems = computed(
        () => sortGalleries(filterGalleries(items.value, query.value), alphabeticalOverride.value, store.pinnedGalleryIds)
      );
      onMounted(async () => {
        const username = getCurrentUsername();
        if (!username) {
          return;
        }
        try {
          const options = await searchUserGalleries(username);
          const thumbnailById = new Map(options.map((option) => [String(option.id), option.thumbnailUrl]));
          for (const item of items.value) {
            item.thumbnailUrl = thumbnailById.get(item.id);
          }
        } catch {
        }
      });
      async function toggleMembership(item) {
        loading.value = true;
        try {
          const result = await toggleGalleryMembership(Number(item.id), props.imageId, item.active ? "remove" : "add");
          if (result.ok) {
            const target = items.value.find((existing) => existing.id === item.id);
            if (target) {
              target.active = !target.active;
            }
          }
        } finally {
          loading.value = false;
        }
      }
      function togglePin(item) {
        store.togglePinnedGalleryId(item.id);
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1, [
          loading.value ? (openBlock(), createElementBlock("div", _hoisted_2)) : createCommentVNode("", true),
          createBaseVNode("button", {
            class: "lodestone-gallery-overlay__close",
            type: "button",
            onClick: _cache[0] || (_cache[0] = ($event) => emit2("close"))
          }, "Close"),
          createBaseVNode("label", null, [
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => alphabeticalOverride.value = $event),
              type: "checkbox"
            }, null, 512), [
              [vModelCheckbox, alphabeticalOverride.value]
            ]),
            _cache[4] || (_cache[4] = createTextVNode(" Sort alphabetically (this view only) ", -1))
          ]),
          createVNode(_sfc_main$2, {
            modelValue: query.value,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => query.value = $event)
          }, null, 8, ["modelValue"]),
          createBaseVNode("div", {
            class: normalizeClass(["lodestone-gallery-overlay__scroll", { "lodestone-gallery-overlay__scroll--loading": loading.value }])
          }, [
            createVNode(_sfc_main$1, {
              items: visibleItems.value,
              "left-align": unref(store).galleryLeftAlign,
              "pinned-ids": unref(store).pinnedGalleryIds,
              "show-icons": unref(store).galleryShowIcons,
              onToggleMembership: toggleMembership,
              onTogglePin: togglePin
            }, null, 8, ["items", "left-align", "pinned-ids", "show-icons"])
          ], 2),
          createBaseVNode("button", {
            class: "lodestone-gallery-overlay__close",
            type: "button",
            onClick: _cache[3] || (_cache[3] = ($event) => emit2("close"))
          }, "Close")
        ]);
      };
    }
  });
  function mountOverlay(pinia2, items, imageId) {
    const host = document.createElement("div");
    document.body.append(host);
    const app = createApp(_sfc_main, {
      items,
      imageId,
      onClose: () => {
        app.unmount();
        host.remove();
      }
    });
    app.config.errorHandler = vueErrorHandler;
    app.use(pinia2).mount(host);
  }
  function initGalleryFullPage(pinia2) {
    const store = useSettingsStore();
    const selectors = resolveSelectors(location.hostname);
    const toggleSelector = `${selectors.galleryDropdownRoot} > a`;
    document.addEventListener("click", (event) => {
      var _a, _b;
      if (!store.galleryFullPageEnabled) {
        return;
      }
      const toggle = (_a = event.target) == null ? void 0 : _a.closest(toggleSelector);
      if (!toggle) {
        return;
      }
      const dropdownTab = toggle.closest(selectors.galleryDropdownRoot);
      const content = dropdownTab == null ? void 0 : dropdownTab.querySelector(selectors.galleryDropdownContent);
      if (!dropdownTab || !content) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      const imageIdAttr = (_b = document.querySelector("[data-image-id]")) == null ? void 0 : _b.dataset.imageId;
      const imageId = imageIdAttr ? Number(imageIdAttr) : NaN;
      if (Number.isNaN(imageId)) {
        return;
      }
      mountOverlay(pinia2, parseGalleryList(content), imageId);
    });
  }
  const registry = /* @__PURE__ */ reactive(/* @__PURE__ */ new Map());
  function useButtonRegistry() {
    function register(button) {
      registry.set(button.id, button);
    }
    function unregister(id) {
      registry.delete(id);
    }
    function list(scope) {
      const all = Array.from(registry.values());
      return scope ? all.filter((button) => button.scope === scope) : all;
    }
    return { registry, register, unregister, list };
  }
  function buildUrl(config, method) {
    return `${config.apiUrl.replace("{token}", config.token)}${method}`;
  }
  async function callTelegram(config, method, payload) {
    const response = await gmRequest({
      method: "POST",
      url: buildUrl(config, method),
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(payload)
    });
    const body = JSON.parse(response.responseText);
    if (!body.ok) {
      throw new Error(body.description ?? `Telegram API ${method} failed`);
    }
    return body;
  }
  async function sendPhoto(config, photoUrl, caption, replyToMessageId) {
    return callTelegram(config, "sendPhoto", {
      chat_id: config.chatId,
      photo: photoUrl,
      caption,
      parse_mode: "HTML",
      message_thread_id: config.topicId,
      reply_to_message_id: replyToMessageId
    });
  }
  async function sendDocument(config, documentUrl, caption) {
    return callTelegram(config, "sendDocument", {
      chat_id: config.chatId,
      document: documentUrl,
      caption,
      parse_mode: "HTML",
      message_thread_id: config.topicId
    });
  }
  async function sendBoth(config, imageUrl, caption) {
    var _a;
    const documentResult = await sendDocument(config, imageUrl, caption);
    await sendPhoto(config, imageUrl, caption, (_a = documentResult.result) == null ? void 0 : _a.message_id);
  }
  async function sendByFormat(config, format, imageUrl, caption) {
    if (format === "photo") {
      await sendPhoto(config, imageUrl, caption);
      return;
    }
    if (format === "document") {
      await sendDocument(config, imageUrl, caption);
      return;
    }
    await sendBoth(config, imageUrl, caption);
  }
  const TOOLBAR_SELECTOR$1 = ".block__header .stretched-mobile-links";
  function createButtonElement$1(config) {
    const el = document.createElement("a");
    el.href = "#";
    el.className = "lodestone-telegram-button";
    el.title = config.label;
    el.style.color = config.color;
    el.dataset.telegramButtonId = config.id;
    el.innerHTML = `<i class="fa ${config.icon}"></i>`;
    return el;
  }
  async function send(config, imageId) {
    const metadata = await fetchImageMetadata(imageId);
    const caption = resolveCaption(config.captionSource, {
      pageUrlWithoutSearch: `${location.origin}${location.pathname}`,
      currentUrl: location.href,
      imageUrlFull: metadata.view_url,
      imageUrlShort: metadata.representations.full,
      metadata,
      customCaptionHtml: config.customCaptionHtml
    });
    await sendByFormat(config, config.format, metadata.representations.full, caption);
  }
  function mountTelegramButtons() {
    var _a;
    const toolbar = document.querySelector(TOOLBAR_SELECTOR$1);
    const imageIdAttr = (_a = document.querySelector("[data-image-id]")) == null ? void 0 : _a.dataset.imageId;
    const imageId = imageIdAttr ? Number(imageIdAttr) : NaN;
    if (!toolbar || Number.isNaN(imageId)) {
      return;
    }
    const telegramStore = useTelegramButtonsStore();
    const { register } = useButtonRegistry();
    const { run } = useSpinnerAction();
    for (const config of telegramStore.buttons) {
      const el = createButtonElement$1(config);
      toolbar.append(el);
      register({
        id: `telegram-${config.id}`,
        scope: "image",
        selector: `[data-telegram-button-id="${config.id}"]`,
        label: config.label,
        icon: config.icon,
        color: config.color
      });
      const catalogId = `telegram-${config.id}`;
      const trigger2 = async () => {
        notifyButtonEvent({ buttonId: catalogId, phase: "on-click" });
        await run(el, () => send(config, imageId));
        notifyButtonEvent({ buttonId: catalogId, phase: "after-settle" });
      };
      registerButtonAction(catalogId, trigger2);
      el.addEventListener("click", (event) => {
        event.preventDefault();
        void trigger2();
      });
    }
  }
  let injected = false;
  function ensureGalleryQuickButtonStyles() {
    if (injected) {
      return;
    }
    injected = true;
    addStyle(`
    .lodestone-gallery-quick-button[data-active="true"] {
      outline: 2px solid #5bc0de;
      border-radius: 4px;
      background: rgba(91, 192, 222, 0.2);
    }
  `);
  }
  const TOOLBAR_SELECTOR = ".block__header .stretched-mobile-links";
  function createButtonElement(config, isActive) {
    const el = document.createElement("a");
    el.href = "#";
    el.className = "lodestone-gallery-quick-button";
    el.title = config.label;
    el.style.color = config.color;
    el.dataset.galleryQuickButtonId = config.id;
    el.dataset.active = isActive ? "true" : "false";
    el.innerHTML = `<i class="fa ${config.icon}"></i>`;
    return el;
  }
  function readActiveGalleryIds() {
    const selectors = resolveSelectors(location.hostname);
    const dropdownRoot = document.querySelector(selectors.galleryDropdownRoot);
    const content = dropdownRoot == null ? void 0 : dropdownRoot.querySelector(selectors.galleryDropdownContent);
    if (!content) {
      return /* @__PURE__ */ new Set();
    }
    return new Set(parseGalleryList(content).filter((item) => item.active).map((item) => item.id));
  }
  function mountQuickButtons() {
    var _a;
    const toolbar = document.querySelector(TOOLBAR_SELECTOR);
    const imageIdAttr = (_a = document.querySelector("[data-image-id]")) == null ? void 0 : _a.dataset.imageId;
    const imageId = imageIdAttr ? Number(imageIdAttr) : NaN;
    if (!toolbar || Number.isNaN(imageId)) {
      return;
    }
    ensureGalleryQuickButtonStyles();
    const quickButtonsStore = useGalleryQuickButtonsStore();
    const settingsStore = useSettingsStore();
    const { register } = useButtonRegistry();
    const { run } = useSpinnerAction();
    const activeGalleryIds = readActiveGalleryIds();
    for (const config of quickButtonsStore.buttons) {
      const el = createButtonElement(config, activeGalleryIds.has(config.galleryId));
      toolbar.append(el);
      register({
        id: `gallery-quick-${config.id}`,
        scope: "image",
        selector: `[data-gallery-quick-button-id="${config.id}"]`,
        label: config.label,
        icon: config.icon,
        color: config.color
      });
      const catalogId = `gallery-quick-${config.id}`;
      const trigger2 = async () => {
        const action = el.dataset.active === "true" ? "remove" : "add";
        const perform = async () => {
          const result = await toggleGalleryMembership(Number(config.galleryId), imageId, action);
          if (result.ok) {
            el.dataset.active = action === "add" ? "true" : "false";
          }
        };
        notifyButtonEvent({ buttonId: catalogId, phase: "on-click" });
        if (settingsStore.galleryProgressEnabled) {
          await run(el, perform);
        } else {
          await perform();
        }
        notifyButtonEvent({ buttonId: catalogId, phase: "after-settle" });
      };
      registerButtonAction(catalogId, trigger2);
      el.addEventListener("click", (event) => {
        event.preventDefault();
        void trigger2();
      });
    }
  }
  function matchesState(actual, expected) {
    if (expected === "either") {
      return actual !== void 0;
    }
    if (actual === void 0) {
      return false;
    }
    return expected === "on" ? actual : !actual;
  }
  function evaluateCondition(node, catalog, readState) {
    switch (node.type) {
      case "and":
        return node.children.every((child) => evaluateCondition(child, catalog, readState));
      case "or":
        return node.children.some((child) => evaluateCondition(child, catalog, readState));
      case "not":
        return !evaluateCondition(node.child, catalog, readState);
      case "leaf": {
        const entries = node.targetKind === "category" ? catalog.filter((entry) => entry.category === node.targetId) : catalog.filter((entry) => entry.id === node.targetId);
        if (entries.length === 0) {
          return false;
        }
        return entries.some((entry) => matchesState(readState(entry), node.state));
      }
    }
  }
  function conditionReferencesEntry(node, entry) {
    switch (node.type) {
      case "and":
      case "or":
        return node.children.some((child) => conditionReferencesEntry(child, entry));
      case "not":
        return conditionReferencesEntry(node.child, entry);
      case "leaf":
        return node.targetKind === "category" ? node.targetId === entry.category : node.targetId === entry.id;
    }
  }
  function desiredOnFor(verb) {
    return verb === "turn-on" ? true : verb === "turn-off" ? false : void 0;
  }
  async function performRegisteredAction(entry, verb) {
    const trigger2 = getButtonAction(entry.id);
    if (!trigger2) {
      return;
    }
    if (entry.stateKind === "stateless" || verb === "toggle") {
      await trigger2();
      return;
    }
    const desiredOn = desiredOnFor(verb);
    if (desiredOn !== void 0 && readCatalogState(entry) === desiredOn) {
      return;
    }
    await trigger2();
  }
  function performNativeAction(entry, verb) {
    const el = resolveCatalogElement(entry);
    if (!el) {
      return;
    }
    const desiredOn = desiredOnFor(verb);
    if (desiredOn !== void 0 && readCatalogState(entry) === desiredOn) {
      return;
    }
    el.click();
  }
  async function runAction(rule, catalog) {
    const target = catalog.find((entry) => entry.id === rule.actionTargetId);
    if (!target) {
      return;
    }
    if (getButtonAction(target.id)) {
      await performRegisteredAction(target, rule.actionVerb);
    } else {
      performNativeAction(target, rule.actionVerb);
    }
  }
  function handleButtonEvent(store, event) {
    const catalog = buildButtonCatalog();
    const changedEntry = catalog.find((entry) => entry.id === event.buttonId);
    if (!changedEntry) {
      return;
    }
    const matchingRules = store.rules.filter(
      (rule) => rule.enabled && rule.timing === event.phase && conditionReferencesEntry(rule.condition, changedEntry)
    );
    for (const rule of matchingRules) {
      if (evaluateCondition(rule.condition, catalog, readCatalogState)) {
        void runAction(rule, catalog);
      }
    }
  }
  function initButtonEffects() {
    const store = useButtonEffectsStore();
    subscribeButtonEvents((event) => handleButtonEvent(store, event));
  }
  const pinia = createPinia();
  setActivePinia(pinia);
  installErrorReporting();
  const page = detectPage(location.pathname);
  if (page === "settings") {
    mountSettingsTab(pinia);
  }
  if (page === "list" || page === "image") {
    initBiggerButtons();
    initVoteProgress();
    initVoteHoverStyle();
    initHideButtons();
    initButtonEffects();
  }
  if (page === "image") {
    initGalleryDropdownAutoClose();
    initGalleryDropdownDecorator();
    initGalleryProgress();
    initGalleryFullPage(pinia);
    mountTelegramButtons();
    mountQuickButtons();
  }

})();