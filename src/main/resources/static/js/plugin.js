/*
 Copyright (C) Federico Zivolo 2019
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */
(function (e, t) {
    'object' == typeof exports && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.Popper = t()
})(this, function () {
    'use strict';

    function e(e) {
        return e && '[object Function]' === {}.toString.call(e)
    }

    function t(e, t) {
        if (1 !== e.nodeType) return [];
        var o = e.ownerDocument.defaultView, n = o.getComputedStyle(e, null);
        return t ? n[t] : n
    }

    function o(e) {
        return 'HTML' === e.nodeName ? e : e.parentNode || e.host
    }

    function n(e) {
        if (!e) return document.body;
        switch (e.nodeName) {
            case'HTML':
            case'BODY':
                return e.ownerDocument.body;
            case'#document':
                return e.body;
        }
        var i = t(e), r = i.overflow, p = i.overflowX, s = i.overflowY;
        return /(auto|scroll|overlay)/.test(r + s + p) ? e : n(o(e))
    }

    function r(e) {
        return 11 === e ? pe : 10 === e ? se : pe || se
    }

    function p(e) {
        if (!e) return document.documentElement;
        for (var o = r(10) ? document.body : null, n = e.offsetParent || null; n === o && e.nextElementSibling;) n = (e = e.nextElementSibling).offsetParent;
        var i = n && n.nodeName;
        return i && 'BODY' !== i && 'HTML' !== i ? -1 !== ['TH', 'TD', 'TABLE'].indexOf(n.nodeName) && 'static' === t(n, 'position') ? p(n) : n : e ? e.ownerDocument.documentElement : document.documentElement
    }

    function s(e) {
        var t = e.nodeName;
        return 'BODY' !== t && ('HTML' === t || p(e.firstElementChild) === e)
    }

    function d(e) {
        return null === e.parentNode ? e : d(e.parentNode)
    }

    function a(e, t) {
        if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement;
        var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING, n = o ? e : t, i = o ? t : e,
            r = document.createRange();
        r.setStart(n, 0), r.setEnd(i, 0);
        var l = r.commonAncestorContainer;
        if (e !== l && t !== l || n.contains(i)) return s(l) ? l : p(l);
        var f = d(e);
        return f.host ? a(f.host, t) : a(e, d(t).host)
    }

    function l(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top',
            o = 'top' === t ? 'scrollTop' : 'scrollLeft', n = e.nodeName;
        if ('BODY' === n || 'HTML' === n) {
            var i = e.ownerDocument.documentElement, r = e.ownerDocument.scrollingElement || i;
            return r[o]
        }
        return e[o]
    }

    function f(e, t) {
        var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2], n = l(t, 'top'), i = l(t, 'left'),
            r = o ? -1 : 1;
        return e.top += n * r, e.bottom += n * r, e.left += i * r, e.right += i * r, e
    }

    function m(e, t) {
        var o = 'x' === t ? 'Left' : 'Top', n = 'Left' == o ? 'Right' : 'Bottom';
        return parseFloat(e['border' + o + 'Width'], 10) + parseFloat(e['border' + n + 'Width'], 10)
    }

    function h(e, t, o, n) {
        return ee(t['offset' + e], t['scroll' + e], o['client' + e], o['offset' + e], o['scroll' + e], r(10) ? parseInt(o['offset' + e]) + parseInt(n['margin' + ('Height' === e ? 'Top' : 'Left')]) + parseInt(n['margin' + ('Height' === e ? 'Bottom' : 'Right')]) : 0)
    }

    function c(e) {
        var t = e.body, o = e.documentElement, n = r(10) && getComputedStyle(o);
        return {height: h('Height', t, o, n), width: h('Width', t, o, n)}
    }

    function g(e) {
        return fe({}, e, {right: e.left + e.width, bottom: e.top + e.height})
    }

    function u(e) {
        var o = {};
        try {
            if (r(10)) {
                o = e.getBoundingClientRect();
                var n = l(e, 'top'), i = l(e, 'left');
                o.top += n, o.left += i, o.bottom += n, o.right += i
            } else o = e.getBoundingClientRect()
        } catch (t) {
        }
        var p = {left: o.left, top: o.top, width: o.right - o.left, height: o.bottom - o.top},
            s = 'HTML' === e.nodeName ? c(e.ownerDocument) : {}, d = s.width || e.clientWidth || p.right - p.left,
            a = s.height || e.clientHeight || p.bottom - p.top, f = e.offsetWidth - d, h = e.offsetHeight - a;
        if (f || h) {
            var u = t(e);
            f -= m(u, 'x'), h -= m(u, 'y'), p.width -= f, p.height -= h
        }
        return g(p)
    }

    function b(e, o) {
        var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2], p = r(10), s = 'HTML' === o.nodeName,
            d = u(e), a = u(o), l = n(e), m = t(o), h = parseFloat(m.borderTopWidth, 10),
            c = parseFloat(m.borderLeftWidth, 10);
        i && s && (a.top = ee(a.top, 0), a.left = ee(a.left, 0));
        var b = g({top: d.top - a.top - h, left: d.left - a.left - c, width: d.width, height: d.height});
        if (b.marginTop = 0, b.marginLeft = 0, !p && s) {
            var w = parseFloat(m.marginTop, 10), y = parseFloat(m.marginLeft, 10);
            b.top -= h - w, b.bottom -= h - w, b.left -= c - y, b.right -= c - y, b.marginTop = w, b.marginLeft = y
        }
        return (p && !i ? o.contains(l) : o === l && 'BODY' !== l.nodeName) && (b = f(b, o)), b
    }

    function w(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], o = e.ownerDocument.documentElement,
            n = b(e, o), i = ee(o.clientWidth, window.innerWidth || 0), r = ee(o.clientHeight, window.innerHeight || 0),
            p = t ? 0 : l(o), s = t ? 0 : l(o, 'left'),
            d = {top: p - n.top + n.marginTop, left: s - n.left + n.marginLeft, width: i, height: r};
        return g(d)
    }

    function y(e) {
        var n = e.nodeName;
        if ('BODY' === n || 'HTML' === n) return !1;
        if ('fixed' === t(e, 'position')) return !0;
        var i = o(e);
        return !!i && y(i)
    }

    function E(e) {
        if (!e || !e.parentElement || r()) return document.documentElement;
        for (var o = e.parentElement; o && 'none' === t(o, 'transform');) o = o.parentElement;
        return o || document.documentElement
    }

    function v(e, t, i, r) {
        var p = 4 < arguments.length && void 0 !== arguments[4] && arguments[4], s = {top: 0, left: 0},
            d = p ? E(e) : a(e, t);
        if ('viewport' === r) s = w(d, p); else {
            var l;
            'scrollParent' === r ? (l = n(o(t)), 'BODY' === l.nodeName && (l = e.ownerDocument.documentElement)) : 'window' === r ? l = e.ownerDocument.documentElement : l = r;
            var f = b(l, d, p);
            if ('HTML' === l.nodeName && !y(d)) {
                var m = c(e.ownerDocument), h = m.height, g = m.width;
                s.top += f.top - f.marginTop, s.bottom = h + f.top, s.left += f.left - f.marginLeft, s.right = g + f.left
            } else s = f
        }
        i = i || 0;
        var u = 'number' == typeof i;
        return s.left += u ? i : i.left || 0, s.top += u ? i : i.top || 0, s.right -= u ? i : i.right || 0, s.bottom -= u ? i : i.bottom || 0, s
    }

    function x(e) {
        var t = e.width, o = e.height;
        return t * o
    }

    function O(e, t, o, n, i) {
        var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf('auto')) return e;
        var p = v(o, n, r, i), s = {
            top: {width: p.width, height: t.top - p.top},
            right: {width: p.right - t.right, height: p.height},
            bottom: {width: p.width, height: p.bottom - t.bottom},
            left: {width: t.left - p.left, height: p.height}
        }, d = Object.keys(s).map(function (e) {
            return fe({key: e}, s[e], {area: x(s[e])})
        }).sort(function (e, t) {
            return t.area - e.area
        }), a = d.filter(function (e) {
            var t = e.width, n = e.height;
            return t >= o.clientWidth && n >= o.clientHeight
        }), l = 0 < a.length ? a[0].key : d[0].key, f = e.split('-')[1];
        return l + (f ? '-' + f : '')
    }

    function L(e, t, o) {
        var n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null, i = n ? E(t) : a(t, o);
        return b(o, i, n)
    }

    function S(e) {
        var t = e.ownerDocument.defaultView, o = t.getComputedStyle(e),
            n = parseFloat(o.marginTop || 0) + parseFloat(o.marginBottom || 0),
            i = parseFloat(o.marginLeft || 0) + parseFloat(o.marginRight || 0),
            r = {width: e.offsetWidth + i, height: e.offsetHeight + n};
        return r
    }

    function T(e) {
        var t = {left: 'right', right: 'left', bottom: 'top', top: 'bottom'};
        return e.replace(/left|right|bottom|top/g, function (e) {
            return t[e]
        })
    }

    function D(e, t, o) {
        o = o.split('-')[0];
        var n = S(e), i = {width: n.width, height: n.height}, r = -1 !== ['right', 'left'].indexOf(o),
            p = r ? 'top' : 'left', s = r ? 'left' : 'top', d = r ? 'height' : 'width', a = r ? 'width' : 'height';
        return i[p] = t[p] + t[d] / 2 - n[d] / 2, i[s] = o === s ? t[s] - n[a] : t[T(s)], i
    }

    function C(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0]
    }

    function N(e, t, o) {
        if (Array.prototype.findIndex) return e.findIndex(function (e) {
            return e[t] === o
        });
        var n = C(e, function (e) {
            return e[t] === o
        });
        return e.indexOf(n)
    }

    function P(t, o, n) {
        var i = void 0 === n ? t : t.slice(0, N(t, 'name', n));
        return i.forEach(function (t) {
            t['function'] && console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
            var n = t['function'] || t.fn;
            t.enabled && e(n) && (o.offsets.popper = g(o.offsets.popper), o.offsets.reference = g(o.offsets.reference), o = n(o, t))
        }), o
    }

    function k() {
        if (!this.state.isDestroyed) {
            var e = {instance: this, styles: {}, arrowStyles: {}, attributes: {}, flipped: !1, offsets: {}};
            e.offsets.reference = L(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = O(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = D(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute', e = P(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
        }
    }

    function W(e, t) {
        return e.some(function (e) {
            var o = e.name, n = e.enabled;
            return n && o === t
        })
    }

    function H(e) {
        for (var t = [!1, 'ms', 'Webkit', 'Moz', 'O'], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length; n++) {
            var i = t[n], r = i ? '' + i + o : e;
            if ('undefined' != typeof document.body.style[r]) return r
        }
        return null
    }

    function B() {
        return this.state.isDestroyed = !0, W(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.position = '', this.popper.style.top = '', this.popper.style.left = '', this.popper.style.right = '', this.popper.style.bottom = '', this.popper.style.willChange = '', this.popper.style[H('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
    }

    function A(e) {
        var t = e.ownerDocument;
        return t ? t.defaultView : window
    }

    function M(e, t, o, i) {
        var r = 'BODY' === e.nodeName, p = r ? e.ownerDocument.defaultView : e;
        p.addEventListener(t, o, {passive: !0}), r || M(n(p.parentNode), t, o, i), i.push(p)
    }

    function F(e, t, o, i) {
        o.updateBound = i, A(e).addEventListener('resize', o.updateBound, {passive: !0});
        var r = n(e);
        return M(r, 'scroll', o.updateBound, o.scrollParents), o.scrollElement = r, o.eventsEnabled = !0, o
    }

    function I() {
        this.state.eventsEnabled || (this.state = F(this.reference, this.options, this.state, this.scheduleUpdate))
    }

    function R(e, t) {
        return A(e).removeEventListener('resize', t.updateBound), t.scrollParents.forEach(function (e) {
            e.removeEventListener('scroll', t.updateBound)
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
    }

    function U() {
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = R(this.reference, this.state))
    }

    function Y(e) {
        return '' !== e && !isNaN(parseFloat(e)) && isFinite(e)
    }

    function j(e, t) {
        Object.keys(t).forEach(function (o) {
            var n = '';
            -1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(o) && Y(t[o]) && (n = 'px'), e.style[o] = t[o] + n
        })
    }

    function V(e, t) {
        Object.keys(t).forEach(function (o) {
            var n = t[o];
            !1 === n ? e.removeAttribute(o) : e.setAttribute(o, t[o])
        })
    }

    function q(e, t) {
        var o = e.offsets, n = o.popper, i = o.reference, r = $, p = function (e) {
                return e
            }, s = r(i.width), d = r(n.width), a = -1 !== ['left', 'right'].indexOf(e.placement),
            l = -1 !== e.placement.indexOf('-'), f = t ? a || l || s % 2 == d % 2 ? r : Z : p, m = t ? r : p;
        return {
            left: f(1 == s % 2 && 1 == d % 2 && !l && t ? n.left - 1 : n.left),
            top: m(n.top),
            bottom: m(n.bottom),
            right: f(n.right)
        }
    }

    function K(e, t, o) {
        var n = C(e, function (e) {
            var o = e.name;
            return o === t
        }), i = !!n && e.some(function (e) {
            return e.name === o && e.enabled && e.order < n.order
        });
        if (!i) {
            var r = '`' + t + '`';
            console.warn('`' + o + '`' + ' modifier is required by ' + r + ' modifier in order to work, be sure to include it before ' + r + '!')
        }
        return i
    }

    function z(e) {
        return 'end' === e ? 'start' : 'start' === e ? 'end' : e
    }

    function G(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], o = ce.indexOf(e),
            n = ce.slice(o + 1).concat(ce.slice(0, o));
        return t ? n.reverse() : n
    }

    function _(e, t, o, n) {
        var i = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/), r = +i[1], p = i[2];
        if (!r) return e;
        if (0 === p.indexOf('%')) {
            var s;
            switch (p) {
                case'%p':
                    s = o;
                    break;
                case'%':
                case'%r':
                default:
                    s = n;
            }
            var d = g(s);
            return d[t] / 100 * r
        }
        if ('vh' === p || 'vw' === p) {
            var a;
            return a = 'vh' === p ? ee(document.documentElement.clientHeight, window.innerHeight || 0) : ee(document.documentElement.clientWidth, window.innerWidth || 0), a / 100 * r
        }
        return r
    }

    function X(e, t, o, n) {
        var i = [0, 0], r = -1 !== ['right', 'left'].indexOf(n), p = e.split(/(\+|\-)/).map(function (e) {
            return e.trim()
        }), s = p.indexOf(C(p, function (e) {
            return -1 !== e.search(/,|\s/)
        }));
        p[s] && -1 === p[s].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
        var d = /\s*,\s*|\s+/,
            a = -1 === s ? [p] : [p.slice(0, s).concat([p[s].split(d)[0]]), [p[s].split(d)[1]].concat(p.slice(s + 1))];
        return a = a.map(function (e, n) {
            var i = (1 === n ? !r : r) ? 'height' : 'width', p = !1;
            return e.reduce(function (e, t) {
                return '' === e[e.length - 1] && -1 !== ['+', '-'].indexOf(t) ? (e[e.length - 1] = t, p = !0, e) : p ? (e[e.length - 1] += t, p = !1, e) : e.concat(t)
            }, []).map(function (e) {
                return _(e, i, t, o)
            })
        }), a.forEach(function (e, t) {
            e.forEach(function (o, n) {
                Y(o) && (i[t] += o * ('-' === e[n - 1] ? -1 : 1))
            })
        }), i
    }

    function J(e, t) {
        var o, n = t.offset, i = e.placement, r = e.offsets, p = r.popper, s = r.reference, d = i.split('-')[0];
        return o = Y(+n) ? [+n, 0] : X(n, p, s, d), 'left' === d ? (p.top += o[0], p.left -= o[1]) : 'right' === d ? (p.top += o[0], p.left += o[1]) : 'top' === d ? (p.left += o[0], p.top -= o[1]) : 'bottom' === d && (p.left += o[0], p.top += o[1]), e.popper = p, e
    }

    for (var Q = Math.min, Z = Math.floor, $ = Math.round, ee = Math.max, te = 'undefined' != typeof window && 'undefined' != typeof document, oe = ['Edge', 'Trident', 'Firefox'], ne = 0, ie = 0; ie < oe.length; ie += 1) if (te && 0 <= navigator.userAgent.indexOf(oe[ie])) {
        ne = 1;
        break
    }
    var i = te && window.Promise, re = i ? function (e) {
            var t = !1;
            return function () {
                t || (t = !0, window.Promise.resolve().then(function () {
                    t = !1, e()
                }))
            }
        } : function (e) {
            var t = !1;
            return function () {
                t || (t = !0, setTimeout(function () {
                    t = !1, e()
                }, ne))
            }
        }, pe = te && !!(window.MSInputMethodContext && document.documentMode),
        se = te && /MSIE 10/.test(navigator.userAgent), de = function (e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
        }, ae = function () {
            function e(e, t) {
                for (var o, n = 0; n < t.length; n++) o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }

            return function (t, o, n) {
                return o && e(t.prototype, o), n && e(t, n), t
            }
        }(), le = function (e, t, o) {
            return t in e ? Object.defineProperty(e, t, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = o, e
        }, fe = Object.assign || function (e) {
            for (var t, o = 1; o < arguments.length; o++) for (var n in t = arguments[o], t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e
        }, me = te && /Firefox/i.test(navigator.userAgent),
        he = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'],
        ce = he.slice(3), ge = {FLIP: 'flip', CLOCKWISE: 'clockwise', COUNTERCLOCKWISE: 'counterclockwise'},
        ue = function () {
            function t(o, n) {
                var i = this, r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                de(this, t), this.scheduleUpdate = function () {
                    return requestAnimationFrame(i.update)
                }, this.update = re(this.update.bind(this)), this.options = fe({}, t.Defaults, r), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = o && o.jquery ? o[0] : o, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(fe({}, t.Defaults.modifiers, r.modifiers)).forEach(function (e) {
                    i.options.modifiers[e] = fe({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function (e) {
                    return fe({name: e}, i.options.modifiers[e])
                }).sort(function (e, t) {
                    return e.order - t.order
                }), this.modifiers.forEach(function (t) {
                    t.enabled && e(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state)
                }), this.update();
                var p = this.options.eventsEnabled;
                p && this.enableEventListeners(), this.state.eventsEnabled = p
            }

            return ae(t, [{
                key: 'update', value: function () {
                    return k.call(this)
                }
            }, {
                key: 'destroy', value: function () {
                    return B.call(this)
                }
            }, {
                key: 'enableEventListeners', value: function () {
                    return I.call(this)
                }
            }, {
                key: 'disableEventListeners', value: function () {
                    return U.call(this)
                }
            }]), t
        }();
    return ue.Utils = ('undefined' == typeof window ? global : window).PopperUtils, ue.placements = he, ue.Defaults = {
        placement: 'bottom', positionFixed: !1, eventsEnabled: !0, removeOnDestroy: !1, onCreate: function () {
        }, onUpdate: function () {
        }, modifiers: {
            shift: {
                order: 100, enabled: !0, fn: function (e) {
                    var t = e.placement, o = t.split('-')[0], n = t.split('-')[1];
                    if (n) {
                        var i = e.offsets, r = i.reference, p = i.popper, s = -1 !== ['bottom', 'top'].indexOf(o),
                            d = s ? 'left' : 'top', a = s ? 'width' : 'height',
                            l = {start: le({}, d, r[d]), end: le({}, d, r[d] + r[a] - p[a])};
                        e.offsets.popper = fe({}, p, l[n])
                    }
                    return e
                }
            },
            offset: {order: 200, enabled: !0, fn: J, offset: 0},
            preventOverflow: {
                order: 300, enabled: !0, fn: function (e, t) {
                    var o = t.boundariesElement || p(e.instance.popper);
                    e.instance.reference === o && (o = p(o));
                    var n = H('transform'), i = e.instance.popper.style, r = i.top, s = i.left, d = i[n];
                    i.top = '', i.left = '', i[n] = '';
                    var a = v(e.instance.popper, e.instance.reference, t.padding, o, e.positionFixed);
                    i.top = r, i.left = s, i[n] = d, t.boundaries = a;
                    var l = t.priority, f = e.offsets.popper, m = {
                        primary: function (e) {
                            var o = f[e];
                            return f[e] < a[e] && !t.escapeWithReference && (o = ee(f[e], a[e])), le({}, e, o)
                        }, secondary: function (e) {
                            var o = 'right' === e ? 'left' : 'top', n = f[o];
                            return f[e] > a[e] && !t.escapeWithReference && (n = Q(f[o], a[e] - ('right' === e ? f.width : f.height))), le({}, o, n)
                        }
                    };
                    return l.forEach(function (e) {
                        var t = -1 === ['left', 'top'].indexOf(e) ? 'secondary' : 'primary';
                        f = fe({}, f, m[t](e))
                    }), e.offsets.popper = f, e
                }, priority: ['left', 'right', 'top', 'bottom'], padding: 5, boundariesElement: 'scrollParent'
            },
            keepTogether: {
                order: 400, enabled: !0, fn: function (e) {
                    var t = e.offsets, o = t.popper, n = t.reference, i = e.placement.split('-')[0], r = Z,
                        p = -1 !== ['top', 'bottom'].indexOf(i), s = p ? 'right' : 'bottom', d = p ? 'left' : 'top',
                        a = p ? 'width' : 'height';
                    return o[s] < r(n[d]) && (e.offsets.popper[d] = r(n[d]) - o[a]), o[d] > r(n[s]) && (e.offsets.popper[d] = r(n[s])), e
                }
            },
            arrow: {
                order: 500, enabled: !0, fn: function (e, o) {
                    var n;
                    if (!K(e.instance.modifiers, 'arrow', 'keepTogether')) return e;
                    var i = o.element;
                    if ('string' == typeof i) {
                        if (i = e.instance.popper.querySelector(i), !i) return e;
                    } else if (!e.instance.popper.contains(i)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), e;
                    var r = e.placement.split('-')[0], p = e.offsets, s = p.popper, d = p.reference,
                        a = -1 !== ['left', 'right'].indexOf(r), l = a ? 'height' : 'width', f = a ? 'Top' : 'Left',
                        m = f.toLowerCase(), h = a ? 'left' : 'top', c = a ? 'bottom' : 'right', u = S(i)[l];
                    d[c] - u < s[m] && (e.offsets.popper[m] -= s[m] - (d[c] - u)), d[m] + u > s[c] && (e.offsets.popper[m] += d[m] + u - s[c]), e.offsets.popper = g(e.offsets.popper);
                    var b = d[m] + d[l] / 2 - u / 2, w = t(e.instance.popper), y = parseFloat(w['margin' + f], 10),
                        E = parseFloat(w['border' + f + 'Width'], 10), v = b - e.offsets.popper[m] - y - E;
                    return v = ee(Q(s[l] - u, v), 0), e.arrowElement = i, e.offsets.arrow = (n = {}, le(n, m, $(v)), le(n, h, ''), n), e
                }, element: '[x-arrow]'
            },
            flip: {
                order: 600, enabled: !0, fn: function (e, t) {
                    if (W(e.instance.modifiers, 'inner')) return e;
                    if (e.flipped && e.placement === e.originalPlacement) return e;
                    var o = v(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed),
                        n = e.placement.split('-')[0], i = T(n), r = e.placement.split('-')[1] || '', p = [];
                    switch (t.behavior) {
                        case ge.FLIP:
                            p = [n, i];
                            break;
                        case ge.CLOCKWISE:
                            p = G(n);
                            break;
                        case ge.COUNTERCLOCKWISE:
                            p = G(n, !0);
                            break;
                        default:
                            p = t.behavior;
                    }
                    return p.forEach(function (s, d) {
                        if (n !== s || p.length === d + 1) return e;
                        n = e.placement.split('-')[0], i = T(n);
                        var a = e.offsets.popper, l = e.offsets.reference, f = Z,
                            m = 'left' === n && f(a.right) > f(l.left) || 'right' === n && f(a.left) < f(l.right) || 'top' === n && f(a.bottom) > f(l.top) || 'bottom' === n && f(a.top) < f(l.bottom),
                            h = f(a.left) < f(o.left), c = f(a.right) > f(o.right), g = f(a.top) < f(o.top),
                            u = f(a.bottom) > f(o.bottom),
                            b = 'left' === n && h || 'right' === n && c || 'top' === n && g || 'bottom' === n && u,
                            w = -1 !== ['top', 'bottom'].indexOf(n),
                            y = !!t.flipVariations && (w && 'start' === r && h || w && 'end' === r && c || !w && 'start' === r && g || !w && 'end' === r && u);
                        (m || b || y) && (e.flipped = !0, (m || b) && (n = p[d + 1]), y && (r = z(r)), e.placement = n + (r ? '-' + r : ''), e.offsets.popper = fe({}, e.offsets.popper, D(e.instance.popper, e.offsets.reference, e.placement)), e = P(e.instance.modifiers, e, 'flip'))
                    }), e
                }, behavior: 'flip', padding: 5, boundariesElement: 'viewport'
            },
            inner: {
                order: 700, enabled: !1, fn: function (e) {
                    var t = e.placement, o = t.split('-')[0], n = e.offsets, i = n.popper, r = n.reference,
                        p = -1 !== ['left', 'right'].indexOf(o), s = -1 === ['top', 'left'].indexOf(o);
                    return i[p ? 'left' : 'top'] = r[o] - (s ? i[p ? 'width' : 'height'] : 0), e.placement = T(t), e.offsets.popper = g(i), e
                }
            },
            hide: {
                order: 800, enabled: !0, fn: function (e) {
                    if (!K(e.instance.modifiers, 'hide', 'preventOverflow')) return e;
                    var t = e.offsets.reference, o = C(e.instance.modifiers, function (e) {
                        return 'preventOverflow' === e.name
                    }).boundaries;
                    if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) {
                        if (!0 === e.hide) return e;
                        e.hide = !0, e.attributes['x-out-of-boundaries'] = ''
                    } else {
                        if (!1 === e.hide) return e;
                        e.hide = !1, e.attributes['x-out-of-boundaries'] = !1
                    }
                    return e
                }
            },
            computeStyle: {
                order: 850, enabled: !0, fn: function (e, t) {
                    var o = t.x, n = t.y, i = e.offsets.popper, r = C(e.instance.modifiers, function (e) {
                        return 'applyStyle' === e.name
                    }).gpuAcceleration;
                    void 0 !== r && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
                    var s, d, a = void 0 === r ? t.gpuAcceleration : r, l = p(e.instance.popper), f = u(l),
                        m = {position: i.position}, h = q(e, 2 > window.devicePixelRatio || !me),
                        c = 'bottom' === o ? 'top' : 'bottom', g = 'right' === n ? 'left' : 'right', b = H('transform');
                    if (d = 'bottom' == c ? 'HTML' === l.nodeName ? -l.clientHeight + h.bottom : -f.height + h.bottom : h.top, s = 'right' == g ? 'HTML' === l.nodeName ? -l.clientWidth + h.right : -f.width + h.right : h.left, a && b) m[b] = 'translate3d(' + s + 'px, ' + d + 'px, 0)', m[c] = 0, m[g] = 0, m.willChange = 'transform'; else {
                        var w = 'bottom' == c ? -1 : 1, y = 'right' == g ? -1 : 1;
                        m[c] = d * w, m[g] = s * y, m.willChange = c + ', ' + g
                    }
                    var E = {"x-placement": e.placement};
                    return e.attributes = fe({}, E, e.attributes), e.styles = fe({}, m, e.styles), e.arrowStyles = fe({}, e.offsets.arrow, e.arrowStyles), e
                }, gpuAcceleration: !0, x: 'bottom', y: 'right'
            },
            applyStyle: {
                order: 900, enabled: !0, fn: function (e) {
                    return j(e.instance.popper, e.styles), V(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && j(e.arrowElement, e.arrowStyles), e
                }, onLoad: function (e, t, o, n, i) {
                    var r = L(i, t, e, o.positionFixed),
                        p = O(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding);
                    return t.setAttribute('x-placement', p), j(t, {position: o.positionFixed ? 'fixed' : 'absolute'}), o
                }, gpuAcceleration: void 0
            }
        }
    }, ue
});
//# sourceMappingURL=popper.min.js.map

/*!
  * Bootstrap v4.3.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e((t = t || self).bootstrap = {}, t.jQuery, t.Popper)
}(this, function (t, g, u) {
    "use strict";

    function i(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    function s(t, e, n) {
        return e && i(t.prototype, e), n && i(t, n), t
    }

    function l(o) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {}, e = Object.keys(r);
            "function" == typeof Object.getOwnPropertySymbols && (e = e.concat(Object.getOwnPropertySymbols(r).filter(function (t) {
                return Object.getOwnPropertyDescriptor(r, t).enumerable
            }))), e.forEach(function (t) {
                var e, n, i;
                e = o, i = r[n = t], n in e ? Object.defineProperty(e, n, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[n] = i
            })
        }
        return o
    }

    g = g && g.hasOwnProperty("default") ? g.default : g, u = u && u.hasOwnProperty("default") ? u.default : u;
    var e = "transitionend";

    function n(t) {
        var e = this, n = !1;
        return g(this).one(_.TRANSITION_END, function () {
            n = !0
        }), setTimeout(function () {
            n || _.triggerTransitionEnd(e)
        }, t), this
    }

    var _ = {
        TRANSITION_END: "bsTransitionEnd", getUID: function (t) {
            for (; t += ~~(1e6 * Math.random()), document.getElementById(t);) ;
            return t
        }, getSelectorFromElement: function (t) {
            var e = t.getAttribute("data-target");
            if (!e || "#" === e) {
                var n = t.getAttribute("href");
                e = n && "#" !== n ? n.trim() : ""
            }
            try {
                return document.querySelector(e) ? e : null
            } catch (t) {
                return null
            }
        }, getTransitionDurationFromElement: function (t) {
            if (!t) return 0;
            var e = g(t).css("transition-duration"), n = g(t).css("transition-delay"), i = parseFloat(e),
                o = parseFloat(n);
            return i || o ? (e = e.split(",")[0], n = n.split(",")[0], 1e3 * (parseFloat(e) + parseFloat(n))) : 0
        }, reflow: function (t) {
            return t.offsetHeight
        }, triggerTransitionEnd: function (t) {
            g(t).trigger(e)
        }, supportsTransitionEnd: function () {
            return Boolean(e)
        }, isElement: function (t) {
            return (t[0] || t).nodeType
        }, typeCheckConfig: function (t, e, n) {
            for (var i in n) if (Object.prototype.hasOwnProperty.call(n, i)) {
                var o = n[i], r = e[i],
                    s = r && _.isElement(r) ? "element" : (a = r, {}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());
                if (!new RegExp(o).test(s)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + s + '" but expected type "' + o + '".')
            }
            var a
        }, findShadowRoot: function (t) {
            if (!document.documentElement.attachShadow) return null;
            if ("function" != typeof t.getRootNode) return t instanceof ShadowRoot ? t : t.parentNode ? _.findShadowRoot(t.parentNode) : null;
            var e = t.getRootNode();
            return e instanceof ShadowRoot ? e : null
        }
    };
    g.fn.emulateTransitionEnd = n, g.event.special[_.TRANSITION_END] = {
        bindType: e,
        delegateType: e,
        handle: function (t) {
            if (g(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
        }
    };
    var o = "alert", r = "bs.alert", a = "." + r, c = g.fn[o],
        h = {CLOSE: "close" + a, CLOSED: "closed" + a, CLICK_DATA_API: "click" + a + ".data-api"}, f = "alert",
        d = "fade", m = "show", p = function () {
            function i(t) {
                this._element = t
            }

            var t = i.prototype;
            return t.close = function (t) {
                var e = this._element;
                t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
            }, t.dispose = function () {
                g.removeData(this._element, r), this._element = null
            }, t._getRootElement = function (t) {
                var e = _.getSelectorFromElement(t), n = !1;
                return e && (n = document.querySelector(e)), n || (n = g(t).closest("." + f)[0]), n
            }, t._triggerCloseEvent = function (t) {
                var e = g.Event(h.CLOSE);
                return g(t).trigger(e), e
            }, t._removeElement = function (e) {
                var n = this;
                if (g(e).removeClass(m), g(e).hasClass(d)) {
                    var t = _.getTransitionDurationFromElement(e);
                    g(e).one(_.TRANSITION_END, function (t) {
                        return n._destroyElement(e, t)
                    }).emulateTransitionEnd(t)
                } else this._destroyElement(e)
            }, t._destroyElement = function (t) {
                g(t).detach().trigger(h.CLOSED).remove()
            }, i._jQueryInterface = function (n) {
                return this.each(function () {
                    var t = g(this), e = t.data(r);
                    e || (e = new i(this), t.data(r, e)), "close" === n && e[n](this)
                })
            }, i._handleDismiss = function (e) {
                return function (t) {
                    t && t.preventDefault(), e.close(this)
                }
            }, s(i, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }]), i
        }();
    g(document).on(h.CLICK_DATA_API, '[data-dismiss="alert"]', p._handleDismiss(new p)), g.fn[o] = p._jQueryInterface, g.fn[o].Constructor = p, g.fn[o].noConflict = function () {
        return g.fn[o] = c, p._jQueryInterface
    };
    var v = "button", y = "bs.button", E = "." + y, C = ".data-api", T = g.fn[v], S = "active", b = "btn", I = "focus",
        D = '[data-toggle^="button"]', w = '[data-toggle="buttons"]', A = 'input:not([type="hidden"])', N = ".active",
        O = ".btn", k = {CLICK_DATA_API: "click" + E + C, FOCUS_BLUR_DATA_API: "focus" + E + C + " blur" + E + C},
        P = function () {
            function n(t) {
                this._element = t
            }

            var t = n.prototype;
            return t.toggle = function () {
                var t = !0, e = !0, n = g(this._element).closest(w)[0];
                if (n) {
                    var i = this._element.querySelector(A);
                    if (i) {
                        if ("radio" === i.type) if (i.checked && this._element.classList.contains(S)) t = !1; else {
                            var o = n.querySelector(N);
                            o && g(o).removeClass(S)
                        }
                        if (t) {
                            if (i.hasAttribute("disabled") || n.hasAttribute("disabled") || i.classList.contains("disabled") || n.classList.contains("disabled")) return;
                            i.checked = !this._element.classList.contains(S), g(i).trigger("change")
                        }
                        i.focus(), e = !1
                    }
                }
                e && this._element.setAttribute("aria-pressed", !this._element.classList.contains(S)), t && g(this._element).toggleClass(S)
            }, t.dispose = function () {
                g.removeData(this._element, y), this._element = null
            }, n._jQueryInterface = function (e) {
                return this.each(function () {
                    var t = g(this).data(y);
                    t || (t = new n(this), g(this).data(y, t)), "toggle" === e && t[e]()
                })
            }, s(n, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }]), n
        }();
    g(document).on(k.CLICK_DATA_API, D, function (t) {
        t.preventDefault();
        var e = t.target;
        g(e).hasClass(b) || (e = g(e).closest(O)), P._jQueryInterface.call(g(e), "toggle")
    }).on(k.FOCUS_BLUR_DATA_API, D, function (t) {
        var e = g(t.target).closest(O)[0];
        g(e).toggleClass(I, /^focus(in)?$/.test(t.type))
    }), g.fn[v] = P._jQueryInterface, g.fn[v].Constructor = P, g.fn[v].noConflict = function () {
        return g.fn[v] = T, P._jQueryInterface
    };
    var L = "carousel", j = "bs.carousel", H = "." + j, R = ".data-api", x = g.fn[L],
        F = {interval: 5e3, keyboard: !0, slide: !1, pause: "hover", wrap: !0, touch: !0}, U = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        }, W = "next", q = "prev", M = "left", K = "right", Q = {
            SLIDE: "slide" + H,
            SLID: "slid" + H,
            KEYDOWN: "keydown" + H,
            MOUSEENTER: "mouseenter" + H,
            MOUSELEAVE: "mouseleave" + H,
            TOUCHSTART: "touchstart" + H,
            TOUCHMOVE: "touchmove" + H,
            TOUCHEND: "touchend" + H,
            POINTERDOWN: "pointerdown" + H,
            POINTERUP: "pointerup" + H,
            DRAG_START: "dragstart" + H,
            LOAD_DATA_API: "load" + H + R,
            CLICK_DATA_API: "click" + H + R
        }, B = "carousel", V = "active", Y = "slide", z = "carousel-item-right", X = "carousel-item-left",
        $ = "carousel-item-next", G = "carousel-item-prev", J = "pointer-event", Z = ".active",
        tt = ".active.carousel-item", et = ".carousel-item", nt = ".carousel-item img",
        it = ".carousel-item-next, .carousel-item-prev", ot = ".carousel-indicators",
        rt = "[data-slide], [data-slide-to]", st = '[data-ride="carousel"]', at = {TOUCH: "touch", PEN: "pen"},
        lt = function () {
            function r(t, e) {
                this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = this._element.querySelector(ot), this._touchSupported = "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners()
            }

            var t = r.prototype;
            return t.next = function () {
                this._isSliding || this._slide(W)
            }, t.nextWhenVisible = function () {
                !document.hidden && g(this._element).is(":visible") && "hidden" !== g(this._element).css("visibility") && this.next()
            }, t.prev = function () {
                this._isSliding || this._slide(q)
            }, t.pause = function (t) {
                t || (this._isPaused = !0), this._element.querySelector(it) && (_.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
            }, t.cycle = function (t) {
                t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
            }, t.to = function (t) {
                var e = this;
                this._activeElement = this._element.querySelector(tt);
                var n = this._getItemIndex(this._activeElement);
                if (!(t > this._items.length - 1 || t < 0)) if (this._isSliding) g(this._element).one(Q.SLID, function () {
                    return e.to(t)
                }); else {
                    if (n === t) return this.pause(), void this.cycle();
                    var i = n < t ? W : q;
                    this._slide(i, this._items[t])
                }
            }, t.dispose = function () {
                g(this._element).off(H), g.removeData(this._element, j), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
            }, t._getConfig = function (t) {
                return t = l({}, F, t), _.typeCheckConfig(L, t, U), t
            }, t._handleSwipe = function () {
                var t = Math.abs(this.touchDeltaX);
                if (!(t <= 40)) {
                    var e = t / this.touchDeltaX;
                    0 < e && this.prev(), e < 0 && this.next()
                }
            }, t._addEventListeners = function () {
                var e = this;
                this._config.keyboard && g(this._element).on(Q.KEYDOWN, function (t) {
                    return e._keydown(t)
                }), "hover" === this._config.pause && g(this._element).on(Q.MOUSEENTER, function (t) {
                    return e.pause(t)
                }).on(Q.MOUSELEAVE, function (t) {
                    return e.cycle(t)
                }), this._config.touch && this._addTouchEventListeners()
            }, t._addTouchEventListeners = function () {
                var n = this;
                if (this._touchSupported) {
                    var e = function (t) {
                        n._pointerEvent && at[t.originalEvent.pointerType.toUpperCase()] ? n.touchStartX = t.originalEvent.clientX : n._pointerEvent || (n.touchStartX = t.originalEvent.touches[0].clientX)
                    }, i = function (t) {
                        n._pointerEvent && at[t.originalEvent.pointerType.toUpperCase()] && (n.touchDeltaX = t.originalEvent.clientX - n.touchStartX), n._handleSwipe(), "hover" === n._config.pause && (n.pause(), n.touchTimeout && clearTimeout(n.touchTimeout), n.touchTimeout = setTimeout(function (t) {
                            return n.cycle(t)
                        }, 500 + n._config.interval))
                    };
                    g(this._element.querySelectorAll(nt)).on(Q.DRAG_START, function (t) {
                        return t.preventDefault()
                    }), this._pointerEvent ? (g(this._element).on(Q.POINTERDOWN, function (t) {
                        return e(t)
                    }), g(this._element).on(Q.POINTERUP, function (t) {
                        return i(t)
                    }), this._element.classList.add(J)) : (g(this._element).on(Q.TOUCHSTART, function (t) {
                        return e(t)
                    }), g(this._element).on(Q.TOUCHMOVE, function (t) {
                        var e;
                        (e = t).originalEvent.touches && 1 < e.originalEvent.touches.length ? n.touchDeltaX = 0 : n.touchDeltaX = e.originalEvent.touches[0].clientX - n.touchStartX
                    }), g(this._element).on(Q.TOUCHEND, function (t) {
                        return i(t)
                    }))
                }
            }, t._keydown = function (t) {
                if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                    case 37:
                        t.preventDefault(), this.prev();
                        break;
                    case 39:
                        t.preventDefault(), this.next()
                }
            }, t._getItemIndex = function (t) {
                return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(et)) : [], this._items.indexOf(t)
            }, t._getItemByDirection = function (t, e) {
                var n = t === W, i = t === q, o = this._getItemIndex(e), r = this._items.length - 1;
                if ((i && 0 === o || n && o === r) && !this._config.wrap) return e;
                var s = (o + (t === q ? -1 : 1)) % this._items.length;
                return -1 === s ? this._items[this._items.length - 1] : this._items[s]
            }, t._triggerSlideEvent = function (t, e) {
                var n = this._getItemIndex(t), i = this._getItemIndex(this._element.querySelector(tt)),
                    o = g.Event(Q.SLIDE, {relatedTarget: t, direction: e, from: i, to: n});
                return g(this._element).trigger(o), o
            }, t._setActiveIndicatorElement = function (t) {
                if (this._indicatorsElement) {
                    var e = [].slice.call(this._indicatorsElement.querySelectorAll(Z));
                    g(e).removeClass(V);
                    var n = this._indicatorsElement.children[this._getItemIndex(t)];
                    n && g(n).addClass(V)
                }
            }, t._slide = function (t, e) {
                var n, i, o, r = this, s = this._element.querySelector(tt), a = this._getItemIndex(s),
                    l = e || s && this._getItemByDirection(t, s), c = this._getItemIndex(l),
                    h = Boolean(this._interval);
                if (o = t === W ? (n = X, i = $, M) : (n = z, i = G, K), l && g(l).hasClass(V)) this._isSliding = !1; else if (!this._triggerSlideEvent(l, o).isDefaultPrevented() && s && l) {
                    this._isSliding = !0, h && this.pause(), this._setActiveIndicatorElement(l);
                    var u = g.Event(Q.SLID, {relatedTarget: l, direction: o, from: a, to: c});
                    if (g(this._element).hasClass(Y)) {
                        g(l).addClass(i), _.reflow(l), g(s).addClass(n), g(l).addClass(n);
                        var f = parseInt(l.getAttribute("data-interval"), 10);
                        this._config.interval = f ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, f) : this._config.defaultInterval || this._config.interval;
                        var d = _.getTransitionDurationFromElement(s);
                        g(s).one(_.TRANSITION_END, function () {
                            g(l).removeClass(n + " " + i).addClass(V), g(s).removeClass(V + " " + i + " " + n), r._isSliding = !1, setTimeout(function () {
                                return g(r._element).trigger(u)
                            }, 0)
                        }).emulateTransitionEnd(d)
                    } else g(s).removeClass(V), g(l).addClass(V), this._isSliding = !1, g(this._element).trigger(u);
                    h && this.cycle()
                }
            }, r._jQueryInterface = function (i) {
                return this.each(function () {
                    var t = g(this).data(j), e = l({}, F, g(this).data());
                    "object" == typeof i && (e = l({}, e, i));
                    var n = "string" == typeof i ? i : e.slide;
                    if (t || (t = new r(this, e), g(this).data(j, t)), "number" == typeof i) t.to(i); else if ("string" == typeof n) {
                        if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    } else e.interval && e.ride && (t.pause(), t.cycle())
                })
            }, r._dataApiClickHandler = function (t) {
                var e = _.getSelectorFromElement(this);
                if (e) {
                    var n = g(e)[0];
                    if (n && g(n).hasClass(B)) {
                        var i = l({}, g(n).data(), g(this).data()), o = this.getAttribute("data-slide-to");
                        o && (i.interval = !1), r._jQueryInterface.call(g(n), i), o && g(n).data(j).to(o), t.preventDefault()
                    }
                }
            }, s(r, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }, {
                key: "Default", get: function () {
                    return F
                }
            }]), r
        }();
    g(document).on(Q.CLICK_DATA_API, rt, lt._dataApiClickHandler), g(window).on(Q.LOAD_DATA_API, function () {
        for (var t = [].slice.call(document.querySelectorAll(st)), e = 0, n = t.length; e < n; e++) {
            var i = g(t[e]);
            lt._jQueryInterface.call(i, i.data())
        }
    }), g.fn[L] = lt._jQueryInterface, g.fn[L].Constructor = lt, g.fn[L].noConflict = function () {
        return g.fn[L] = x, lt._jQueryInterface
    };
    var ct = "collapse", ht = "bs.collapse", ut = "." + ht, ft = g.fn[ct], dt = {toggle: !0, parent: ""},
        gt = {toggle: "boolean", parent: "(string|element)"}, _t = {
            SHOW: "show" + ut,
            SHOWN: "shown" + ut,
            HIDE: "hide" + ut,
            HIDDEN: "hidden" + ut,
            CLICK_DATA_API: "click" + ut + ".data-api"
        }, mt = "show", pt = "collapse", vt = "collapsing", yt = "collapsed", Et = "width", Ct = "height",
        Tt = ".show, .collapsing", St = '[data-toggle="collapse"]', bt = function () {
            function a(e, t) {
                this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
                for (var n = [].slice.call(document.querySelectorAll(St)), i = 0, o = n.length; i < o; i++) {
                    var r = n[i], s = _.getSelectorFromElement(r),
                        a = [].slice.call(document.querySelectorAll(s)).filter(function (t) {
                            return t === e
                        });
                    null !== s && 0 < a.length && (this._selector = s, this._triggerArray.push(r))
                }
                this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
            }

            var t = a.prototype;
            return t.toggle = function () {
                g(this._element).hasClass(mt) ? this.hide() : this.show()
            }, t.show = function () {
                var t, e, n = this;
                if (!this._isTransitioning && !g(this._element).hasClass(mt) && (this._parent && 0 === (t = [].slice.call(this._parent.querySelectorAll(Tt)).filter(function (t) {
                    return "string" == typeof n._config.parent ? t.getAttribute("data-parent") === n._config.parent : t.classList.contains(pt)
                })).length && (t = null), !(t && (e = g(t).not(this._selector).data(ht)) && e._isTransitioning))) {
                    var i = g.Event(_t.SHOW);
                    if (g(this._element).trigger(i), !i.isDefaultPrevented()) {
                        t && (a._jQueryInterface.call(g(t).not(this._selector), "hide"), e || g(t).data(ht, null));
                        var o = this._getDimension();
                        g(this._element).removeClass(pt).addClass(vt), this._element.style[o] = 0, this._triggerArray.length && g(this._triggerArray).removeClass(yt).attr("aria-expanded", !0), this.setTransitioning(!0);
                        var r = "scroll" + (o[0].toUpperCase() + o.slice(1)),
                            s = _.getTransitionDurationFromElement(this._element);
                        g(this._element).one(_.TRANSITION_END, function () {
                            g(n._element).removeClass(vt).addClass(pt).addClass(mt), n._element.style[o] = "", n.setTransitioning(!1), g(n._element).trigger(_t.SHOWN)
                        }).emulateTransitionEnd(s), this._element.style[o] = this._element[r] + "px"
                    }
                }
            }, t.hide = function () {
                var t = this;
                if (!this._isTransitioning && g(this._element).hasClass(mt)) {
                    var e = g.Event(_t.HIDE);
                    if (g(this._element).trigger(e), !e.isDefaultPrevented()) {
                        var n = this._getDimension();
                        this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", _.reflow(this._element), g(this._element).addClass(vt).removeClass(pt).removeClass(mt);
                        var i = this._triggerArray.length;
                        if (0 < i) for (var o = 0; o < i; o++) {
                            var r = this._triggerArray[o], s = _.getSelectorFromElement(r);
                            if (null !== s) g([].slice.call(document.querySelectorAll(s))).hasClass(mt) || g(r).addClass(yt).attr("aria-expanded", !1)
                        }
                        this.setTransitioning(!0);
                        this._element.style[n] = "";
                        var a = _.getTransitionDurationFromElement(this._element);
                        g(this._element).one(_.TRANSITION_END, function () {
                            t.setTransitioning(!1), g(t._element).removeClass(vt).addClass(pt).trigger(_t.HIDDEN)
                        }).emulateTransitionEnd(a)
                    }
                }
            }, t.setTransitioning = function (t) {
                this._isTransitioning = t
            }, t.dispose = function () {
                g.removeData(this._element, ht), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
            }, t._getConfig = function (t) {
                return (t = l({}, dt, t)).toggle = Boolean(t.toggle), _.typeCheckConfig(ct, t, gt), t
            }, t._getDimension = function () {
                return g(this._element).hasClass(Et) ? Et : Ct
            }, t._getParent = function () {
                var t, n = this;
                _.isElement(this._config.parent) ? (t = this._config.parent, "undefined" != typeof this._config.parent.jquery && (t = this._config.parent[0])) : t = document.querySelector(this._config.parent);
                var e = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
                    i = [].slice.call(t.querySelectorAll(e));
                return g(i).each(function (t, e) {
                    n._addAriaAndCollapsedClass(a._getTargetFromElement(e), [e])
                }), t
            }, t._addAriaAndCollapsedClass = function (t, e) {
                var n = g(t).hasClass(mt);
                e.length && g(e).toggleClass(yt, !n).attr("aria-expanded", n)
            }, a._getTargetFromElement = function (t) {
                var e = _.getSelectorFromElement(t);
                return e ? document.querySelector(e) : null
            }, a._jQueryInterface = function (i) {
                return this.each(function () {
                    var t = g(this), e = t.data(ht), n = l({}, dt, t.data(), "object" == typeof i && i ? i : {});
                    if (!e && n.toggle && /show|hide/.test(i) && (n.toggle = !1), e || (e = new a(this, n), t.data(ht, e)), "string" == typeof i) {
                        if ("undefined" == typeof e[i]) throw new TypeError('No method named "' + i + '"');
                        e[i]()
                    }
                })
            }, s(a, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }, {
                key: "Default", get: function () {
                    return dt
                }
            }]), a
        }();
    g(document).on(_t.CLICK_DATA_API, St, function (t) {
        "A" === t.currentTarget.tagName && t.preventDefault();
        var n = g(this), e = _.getSelectorFromElement(this), i = [].slice.call(document.querySelectorAll(e));
        g(i).each(function () {
            var t = g(this), e = t.data(ht) ? "toggle" : n.data();
            bt._jQueryInterface.call(t, e)
        })
    }), g.fn[ct] = bt._jQueryInterface, g.fn[ct].Constructor = bt, g.fn[ct].noConflict = function () {
        return g.fn[ct] = ft, bt._jQueryInterface
    };
    var It = "dropdown", Dt = "bs.dropdown", wt = "." + Dt, At = ".data-api", Nt = g.fn[It],
        Ot = new RegExp("38|40|27"), kt = {
            HIDE: "hide" + wt,
            HIDDEN: "hidden" + wt,
            SHOW: "show" + wt,
            SHOWN: "shown" + wt,
            CLICK: "click" + wt,
            CLICK_DATA_API: "click" + wt + At,
            KEYDOWN_DATA_API: "keydown" + wt + At,
            KEYUP_DATA_API: "keyup" + wt + At
        }, Pt = "disabled", Lt = "show", jt = "dropup", Ht = "dropright", Rt = "dropleft", xt = "dropdown-menu-right",
        Ft = "position-static", Ut = '[data-toggle="dropdown"]', Wt = ".dropdown form", qt = ".dropdown-menu",
        Mt = ".navbar-nav", Kt = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", Qt = "top-start",
        Bt = "top-end", Vt = "bottom-start", Yt = "bottom-end", zt = "right-start", Xt = "left-start",
        $t = {offset: 0, flip: !0, boundary: "scrollParent", reference: "toggle", display: "dynamic"}, Gt = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string"
        }, Jt = function () {
            function c(t, e) {
                this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
            }

            var t = c.prototype;
            return t.toggle = function () {
                if (!this._element.disabled && !g(this._element).hasClass(Pt)) {
                    var t = c._getParentFromElement(this._element), e = g(this._menu).hasClass(Lt);
                    if (c._clearMenus(), !e) {
                        var n = {relatedTarget: this._element}, i = g.Event(kt.SHOW, n);
                        if (g(t).trigger(i), !i.isDefaultPrevented()) {
                            if (!this._inNavbar) {
                                if ("undefined" == typeof u) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                                var o = this._element;
                                "parent" === this._config.reference ? o = t : _.isElement(this._config.reference) && (o = this._config.reference, "undefined" != typeof this._config.reference.jquery && (o = this._config.reference[0])), "scrollParent" !== this._config.boundary && g(t).addClass(Ft), this._popper = new u(o, this._menu, this._getPopperConfig())
                            }
                            "ontouchstart" in document.documentElement && 0 === g(t).closest(Mt).length && g(document.body).children().on("mouseover", null, g.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), g(this._menu).toggleClass(Lt), g(t).toggleClass(Lt).trigger(g.Event(kt.SHOWN, n))
                        }
                    }
                }
            }, t.show = function () {
                if (!(this._element.disabled || g(this._element).hasClass(Pt) || g(this._menu).hasClass(Lt))) {
                    var t = {relatedTarget: this._element}, e = g.Event(kt.SHOW, t),
                        n = c._getParentFromElement(this._element);
                    g(n).trigger(e), e.isDefaultPrevented() || (g(this._menu).toggleClass(Lt), g(n).toggleClass(Lt).trigger(g.Event(kt.SHOWN, t)))
                }
            }, t.hide = function () {
                if (!this._element.disabled && !g(this._element).hasClass(Pt) && g(this._menu).hasClass(Lt)) {
                    var t = {relatedTarget: this._element}, e = g.Event(kt.HIDE, t),
                        n = c._getParentFromElement(this._element);
                    g(n).trigger(e), e.isDefaultPrevented() || (g(this._menu).toggleClass(Lt), g(n).toggleClass(Lt).trigger(g.Event(kt.HIDDEN, t)))
                }
            }, t.dispose = function () {
                g.removeData(this._element, Dt), g(this._element).off(wt), this._element = null, (this._menu = null) !== this._popper && (this._popper.destroy(), this._popper = null)
            }, t.update = function () {
                this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
            }, t._addEventListeners = function () {
                var e = this;
                g(this._element).on(kt.CLICK, function (t) {
                    t.preventDefault(), t.stopPropagation(), e.toggle()
                })
            }, t._getConfig = function (t) {
                return t = l({}, this.constructor.Default, g(this._element).data(), t), _.typeCheckConfig(It, t, this.constructor.DefaultType), t
            }, t._getMenuElement = function () {
                if (!this._menu) {
                    var t = c._getParentFromElement(this._element);
                    t && (this._menu = t.querySelector(qt))
                }
                return this._menu
            }, t._getPlacement = function () {
                var t = g(this._element.parentNode), e = Vt;
                return t.hasClass(jt) ? (e = Qt, g(this._menu).hasClass(xt) && (e = Bt)) : t.hasClass(Ht) ? e = zt : t.hasClass(Rt) ? e = Xt : g(this._menu).hasClass(xt) && (e = Yt), e
            }, t._detectNavbar = function () {
                return 0 < g(this._element).closest(".navbar").length
            }, t._getOffset = function () {
                var e = this, t = {};
                return "function" == typeof this._config.offset ? t.fn = function (t) {
                    return t.offsets = l({}, t.offsets, e._config.offset(t.offsets, e._element) || {}), t
                } : t.offset = this._config.offset, t
            }, t._getPopperConfig = function () {
                var t = {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {enabled: this._config.flip},
                        preventOverflow: {boundariesElement: this._config.boundary}
                    }
                };
                return "static" === this._config.display && (t.modifiers.applyStyle = {enabled: !1}), t
            }, c._jQueryInterface = function (e) {
                return this.each(function () {
                    var t = g(this).data(Dt);
                    if (t || (t = new c(this, "object" == typeof e ? e : null), g(this).data(Dt, t)), "string" == typeof e) {
                        if ("undefined" == typeof t[e]) throw new TypeError('No method named "' + e + '"');
                        t[e]()
                    }
                })
            }, c._clearMenus = function (t) {
                if (!t || 3 !== t.which && ("keyup" !== t.type || 9 === t.which)) for (var e = [].slice.call(document.querySelectorAll(Ut)), n = 0, i = e.length; n < i; n++) {
                    var o = c._getParentFromElement(e[n]), r = g(e[n]).data(Dt), s = {relatedTarget: e[n]};
                    if (t && "click" === t.type && (s.clickEvent = t), r) {
                        var a = r._menu;
                        if (g(o).hasClass(Lt) && !(t && ("click" === t.type && /input|textarea/i.test(t.target.tagName) || "keyup" === t.type && 9 === t.which) && g.contains(o, t.target))) {
                            var l = g.Event(kt.HIDE, s);
                            g(o).trigger(l), l.isDefaultPrevented() || ("ontouchstart" in document.documentElement && g(document.body).children().off("mouseover", null, g.noop), e[n].setAttribute("aria-expanded", "false"), g(a).removeClass(Lt), g(o).removeClass(Lt).trigger(g.Event(kt.HIDDEN, s)))
                        }
                    }
                }
            }, c._getParentFromElement = function (t) {
                var e, n = _.getSelectorFromElement(t);
                return n && (e = document.querySelector(n)), e || t.parentNode
            }, c._dataApiKeydownHandler = function (t) {
                if ((/input|textarea/i.test(t.target.tagName) ? !(32 === t.which || 27 !== t.which && (40 !== t.which && 38 !== t.which || g(t.target).closest(qt).length)) : Ot.test(t.which)) && (t.preventDefault(), t.stopPropagation(), !this.disabled && !g(this).hasClass(Pt))) {
                    var e = c._getParentFromElement(this), n = g(e).hasClass(Lt);
                    if (n && (!n || 27 !== t.which && 32 !== t.which)) {
                        var i = [].slice.call(e.querySelectorAll(Kt));
                        if (0 !== i.length) {
                            var o = i.indexOf(t.target);
                            38 === t.which && 0 < o && o--, 40 === t.which && o < i.length - 1 && o++, o < 0 && (o = 0), i[o].focus()
                        }
                    } else {
                        if (27 === t.which) {
                            var r = e.querySelector(Ut);
                            g(r).trigger("focus")
                        }
                        g(this).trigger("click")
                    }
                }
            }, s(c, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }, {
                key: "Default", get: function () {
                    return $t
                }
            }, {
                key: "DefaultType", get: function () {
                    return Gt
                }
            }]), c
        }();
    g(document).on(kt.KEYDOWN_DATA_API, Ut, Jt._dataApiKeydownHandler).on(kt.KEYDOWN_DATA_API, qt, Jt._dataApiKeydownHandler).on(kt.CLICK_DATA_API + " " + kt.KEYUP_DATA_API, Jt._clearMenus).on(kt.CLICK_DATA_API, Ut, function (t) {
        t.preventDefault(), t.stopPropagation(), Jt._jQueryInterface.call(g(this), "toggle")
    }).on(kt.CLICK_DATA_API, Wt, function (t) {
        t.stopPropagation()
    }), g.fn[It] = Jt._jQueryInterface, g.fn[It].Constructor = Jt, g.fn[It].noConflict = function () {
        return g.fn[It] = Nt, Jt._jQueryInterface
    };
    var Zt = "modal", te = "bs.modal", ee = "." + te, ne = g.fn[Zt],
        ie = {backdrop: !0, keyboard: !0, focus: !0, show: !0},
        oe = {backdrop: "(boolean|string)", keyboard: "boolean", focus: "boolean", show: "boolean"}, re = {
            HIDE: "hide" + ee,
            HIDDEN: "hidden" + ee,
            SHOW: "show" + ee,
            SHOWN: "shown" + ee,
            FOCUSIN: "focusin" + ee,
            RESIZE: "resize" + ee,
            CLICK_DISMISS: "click.dismiss" + ee,
            KEYDOWN_DISMISS: "keydown.dismiss" + ee,
            MOUSEUP_DISMISS: "mouseup.dismiss" + ee,
            MOUSEDOWN_DISMISS: "mousedown.dismiss" + ee,
            CLICK_DATA_API: "click" + ee + ".data-api"
        }, se = "modal-dialog-scrollable", ae = "modal-scrollbar-measure", le = "modal-backdrop", ce = "modal-open",
        he = "fade", ue = "show", fe = ".modal-dialog", de = ".modal-body", ge = '[data-toggle="modal"]',
        _e = '[data-dismiss="modal"]', me = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", pe = ".sticky-top",
        ve = function () {
            function o(t, e) {
                this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(fe), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
            }

            var t = o.prototype;
            return t.toggle = function (t) {
                return this._isShown ? this.hide() : this.show(t)
            }, t.show = function (t) {
                var e = this;
                if (!this._isShown && !this._isTransitioning) {
                    g(this._element).hasClass(he) && (this._isTransitioning = !0);
                    var n = g.Event(re.SHOW, {relatedTarget: t});
                    g(this._element).trigger(n), this._isShown || n.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), g(this._element).on(re.CLICK_DISMISS, _e, function (t) {
                        return e.hide(t)
                    }), g(this._dialog).on(re.MOUSEDOWN_DISMISS, function () {
                        g(e._element).one(re.MOUSEUP_DISMISS, function (t) {
                            g(t.target).is(e._element) && (e._ignoreBackdropClick = !0)
                        })
                    }), this._showBackdrop(function () {
                        return e._showElement(t)
                    }))
                }
            }, t.hide = function (t) {
                var e = this;
                if (t && t.preventDefault(), this._isShown && !this._isTransitioning) {
                    var n = g.Event(re.HIDE);
                    if (g(this._element).trigger(n), this._isShown && !n.isDefaultPrevented()) {
                        this._isShown = !1;
                        var i = g(this._element).hasClass(he);
                        if (i && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), g(document).off(re.FOCUSIN), g(this._element).removeClass(ue), g(this._element).off(re.CLICK_DISMISS), g(this._dialog).off(re.MOUSEDOWN_DISMISS), i) {
                            var o = _.getTransitionDurationFromElement(this._element);
                            g(this._element).one(_.TRANSITION_END, function (t) {
                                return e._hideModal(t)
                            }).emulateTransitionEnd(o)
                        } else this._hideModal()
                    }
                }
            }, t.dispose = function () {
                [window, this._element, this._dialog].forEach(function (t) {
                    return g(t).off(ee)
                }), g(document).off(re.FOCUSIN), g.removeData(this._element, te), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
            }, t.handleUpdate = function () {
                this._adjustDialog()
            }, t._getConfig = function (t) {
                return t = l({}, ie, t), _.typeCheckConfig(Zt, t, oe), t
            }, t._showElement = function (t) {
                var e = this, n = g(this._element).hasClass(he);
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), g(this._dialog).hasClass(se) ? this._dialog.querySelector(de).scrollTop = 0 : this._element.scrollTop = 0, n && _.reflow(this._element), g(this._element).addClass(ue), this._config.focus && this._enforceFocus();
                var i = g.Event(re.SHOWN, {relatedTarget: t}), o = function () {
                    e._config.focus && e._element.focus(), e._isTransitioning = !1, g(e._element).trigger(i)
                };
                if (n) {
                    var r = _.getTransitionDurationFromElement(this._dialog);
                    g(this._dialog).one(_.TRANSITION_END, o).emulateTransitionEnd(r)
                } else o()
            }, t._enforceFocus = function () {
                var e = this;
                g(document).off(re.FOCUSIN).on(re.FOCUSIN, function (t) {
                    document !== t.target && e._element !== t.target && 0 === g(e._element).has(t.target).length && e._element.focus()
                })
            }, t._setEscapeEvent = function () {
                var e = this;
                this._isShown && this._config.keyboard ? g(this._element).on(re.KEYDOWN_DISMISS, function (t) {
                    27 === t.which && (t.preventDefault(), e.hide())
                }) : this._isShown || g(this._element).off(re.KEYDOWN_DISMISS)
            }, t._setResizeEvent = function () {
                var e = this;
                this._isShown ? g(window).on(re.RESIZE, function (t) {
                    return e.handleUpdate(t)
                }) : g(window).off(re.RESIZE)
            }, t._hideModal = function () {
                var t = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop(function () {
                    g(document.body).removeClass(ce), t._resetAdjustments(), t._resetScrollbar(), g(t._element).trigger(re.HIDDEN)
                })
            }, t._removeBackdrop = function () {
                this._backdrop && (g(this._backdrop).remove(), this._backdrop = null)
            }, t._showBackdrop = function (t) {
                var e = this, n = g(this._element).hasClass(he) ? he : "";
                if (this._isShown && this._config.backdrop) {
                    if (this._backdrop = document.createElement("div"), this._backdrop.className = le, n && this._backdrop.classList.add(n), g(this._backdrop).appendTo(document.body), g(this._element).on(re.CLICK_DISMISS, function (t) {
                        e._ignoreBackdropClick ? e._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === e._config.backdrop ? e._element.focus() : e.hide())
                    }), n && _.reflow(this._backdrop), g(this._backdrop).addClass(ue), !t) return;
                    if (!n) return void t();
                    var i = _.getTransitionDurationFromElement(this._backdrop);
                    g(this._backdrop).one(_.TRANSITION_END, t).emulateTransitionEnd(i)
                } else if (!this._isShown && this._backdrop) {
                    g(this._backdrop).removeClass(ue);
                    var o = function () {
                        e._removeBackdrop(), t && t()
                    };
                    if (g(this._element).hasClass(he)) {
                        var r = _.getTransitionDurationFromElement(this._backdrop);
                        g(this._backdrop).one(_.TRANSITION_END, o).emulateTransitionEnd(r)
                    } else o()
                } else t && t()
            }, t._adjustDialog = function () {
                var t = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
            }, t._resetAdjustments = function () {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
            }, t._checkScrollbar = function () {
                var t = document.body.getBoundingClientRect();
                this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
            }, t._setScrollbar = function () {
                var o = this;
                if (this._isBodyOverflowing) {
                    var t = [].slice.call(document.querySelectorAll(me)),
                        e = [].slice.call(document.querySelectorAll(pe));
                    g(t).each(function (t, e) {
                        var n = e.style.paddingRight, i = g(e).css("padding-right");
                        g(e).data("padding-right", n).css("padding-right", parseFloat(i) + o._scrollbarWidth + "px")
                    }), g(e).each(function (t, e) {
                        var n = e.style.marginRight, i = g(e).css("margin-right");
                        g(e).data("margin-right", n).css("margin-right", parseFloat(i) - o._scrollbarWidth + "px")
                    });
                    var n = document.body.style.paddingRight, i = g(document.body).css("padding-right");
                    g(document.body).data("padding-right", n).css("padding-right", parseFloat(i) + this._scrollbarWidth + "px")
                }
                g(document.body).addClass(ce)
            }, t._resetScrollbar = function () {
                var t = [].slice.call(document.querySelectorAll(me));
                g(t).each(function (t, e) {
                    var n = g(e).data("padding-right");
                    g(e).removeData("padding-right"), e.style.paddingRight = n || ""
                });
                var e = [].slice.call(document.querySelectorAll("" + pe));
                g(e).each(function (t, e) {
                    var n = g(e).data("margin-right");
                    "undefined" != typeof n && g(e).css("margin-right", n).removeData("margin-right")
                });
                var n = g(document.body).data("padding-right");
                g(document.body).removeData("padding-right"), document.body.style.paddingRight = n || ""
            }, t._getScrollbarWidth = function () {
                var t = document.createElement("div");
                t.className = ae, document.body.appendChild(t);
                var e = t.getBoundingClientRect().width - t.clientWidth;
                return document.body.removeChild(t), e
            }, o._jQueryInterface = function (n, i) {
                return this.each(function () {
                    var t = g(this).data(te), e = l({}, ie, g(this).data(), "object" == typeof n && n ? n : {});
                    if (t || (t = new o(this, e), g(this).data(te, t)), "string" == typeof n) {
                        if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n](i)
                    } else e.show && t.show(i)
                })
            }, s(o, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }, {
                key: "Default", get: function () {
                    return ie
                }
            }]), o
        }();
    g(document).on(re.CLICK_DATA_API, ge, function (t) {
        var e, n = this, i = _.getSelectorFromElement(this);
        i && (e = document.querySelector(i));
        var o = g(e).data(te) ? "toggle" : l({}, g(e).data(), g(this).data());
        "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
        var r = g(e).one(re.SHOW, function (t) {
            t.isDefaultPrevented() || r.one(re.HIDDEN, function () {
                g(n).is(":visible") && n.focus()
            })
        });
        ve._jQueryInterface.call(g(e), o, this)
    }), g.fn[Zt] = ve._jQueryInterface, g.fn[Zt].Constructor = ve, g.fn[Zt].noConflict = function () {
        return g.fn[Zt] = ne, ve._jQueryInterface
    };
    var ye = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"], Ee = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        }, Ce = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
        Te = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

    function Se(t, s, e) {
        if (0 === t.length) return t;
        if (e && "function" == typeof e) return e(t);
        for (var n = (new window.DOMParser).parseFromString(t, "text/html"), a = Object.keys(s), l = [].slice.call(n.body.querySelectorAll("*")), i = function (t, e) {
            var n = l[t], i = n.nodeName.toLowerCase();
            if (-1 === a.indexOf(n.nodeName.toLowerCase())) return n.parentNode.removeChild(n), "continue";
            var o = [].slice.call(n.attributes), r = [].concat(s["*"] || [], s[i] || []);
            o.forEach(function (t) {
                (function (t, e) {
                    var n = t.nodeName.toLowerCase();
                    if (-1 !== e.indexOf(n)) return -1 === ye.indexOf(n) || Boolean(t.nodeValue.match(Ce) || t.nodeValue.match(Te));
                    for (var i = e.filter(function (t) {
                        return t instanceof RegExp
                    }), o = 0, r = i.length; o < r; o++) if (n.match(i[o])) return !0;
                    return !1
                })(t, r) || n.removeAttribute(t.nodeName)
            })
        }, o = 0, r = l.length; o < r; o++) i(o);
        return n.body.innerHTML
    }

    var be = "tooltip", Ie = "bs.tooltip", De = "." + Ie, we = g.fn[be], Ae = "bs-tooltip",
        Ne = new RegExp("(^|\\s)" + Ae + "\\S+", "g"), Oe = ["sanitize", "whiteList", "sanitizeFn"], ke = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            whiteList: "object"
        }, Pe = {AUTO: "auto", TOP: "top", RIGHT: "right", BOTTOM: "bottom", LEFT: "left"}, Le = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent",
            sanitize: !0,
            sanitizeFn: null,
            whiteList: Ee
        }, je = "show", He = "out", Re = {
            HIDE: "hide" + De,
            HIDDEN: "hidden" + De,
            SHOW: "show" + De,
            SHOWN: "shown" + De,
            INSERTED: "inserted" + De,
            CLICK: "click" + De,
            FOCUSIN: "focusin" + De,
            FOCUSOUT: "focusout" + De,
            MOUSEENTER: "mouseenter" + De,
            MOUSELEAVE: "mouseleave" + De
        }, xe = "fade", Fe = "show", Ue = ".tooltip-inner", We = ".arrow", qe = "hover", Me = "focus", Ke = "click",
        Qe = "manual", Be = function () {
            function i(t, e) {
                if ("undefined" == typeof u) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
                this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
            }

            var t = i.prototype;
            return t.enable = function () {
                this._isEnabled = !0
            }, t.disable = function () {
                this._isEnabled = !1
            }, t.toggleEnabled = function () {
                this._isEnabled = !this._isEnabled
            }, t.toggle = function (t) {
                if (this._isEnabled) if (t) {
                    var e = this.constructor.DATA_KEY, n = g(t.currentTarget).data(e);
                    n || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), g(t.currentTarget).data(e, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
                } else {
                    if (g(this.getTipElement()).hasClass(Fe)) return void this._leave(null, this);
                    this._enter(null, this)
                }
            }, t.dispose = function () {
                clearTimeout(this._timeout), g.removeData(this.element, this.constructor.DATA_KEY), g(this.element).off(this.constructor.EVENT_KEY), g(this.element).closest(".modal").off("hide.bs.modal"), this.tip && g(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, (this._activeTrigger = null) !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
            }, t.show = function () {
                var e = this;
                if ("none" === g(this.element).css("display")) throw new Error("Please use show on visible elements");
                var t = g.Event(this.constructor.Event.SHOW);
                if (this.isWithContent() && this._isEnabled) {
                    g(this.element).trigger(t);
                    var n = _.findShadowRoot(this.element),
                        i = g.contains(null !== n ? n : this.element.ownerDocument.documentElement, this.element);
                    if (t.isDefaultPrevented() || !i) return;
                    var o = this.getTipElement(), r = _.getUID(this.constructor.NAME);
                    o.setAttribute("id", r), this.element.setAttribute("aria-describedby", r), this.setContent(), this.config.animation && g(o).addClass(xe);
                    var s = "function" == typeof this.config.placement ? this.config.placement.call(this, o, this.element) : this.config.placement,
                        a = this._getAttachment(s);
                    this.addAttachmentClass(a);
                    var l = this._getContainer();
                    g(o).data(this.constructor.DATA_KEY, this), g.contains(this.element.ownerDocument.documentElement, this.tip) || g(o).appendTo(l), g(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new u(this.element, o, {
                        placement: a,
                        modifiers: {
                            offset: this._getOffset(),
                            flip: {behavior: this.config.fallbackPlacement},
                            arrow: {element: We},
                            preventOverflow: {boundariesElement: this.config.boundary}
                        },
                        onCreate: function (t) {
                            t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                        },
                        onUpdate: function (t) {
                            return e._handlePopperPlacementChange(t)
                        }
                    }), g(o).addClass(Fe), "ontouchstart" in document.documentElement && g(document.body).children().on("mouseover", null, g.noop);
                    var c = function () {
                        e.config.animation && e._fixTransition();
                        var t = e._hoverState;
                        e._hoverState = null, g(e.element).trigger(e.constructor.Event.SHOWN), t === He && e._leave(null, e)
                    };
                    if (g(this.tip).hasClass(xe)) {
                        var h = _.getTransitionDurationFromElement(this.tip);
                        g(this.tip).one(_.TRANSITION_END, c).emulateTransitionEnd(h)
                    } else c()
                }
            }, t.hide = function (t) {
                var e = this, n = this.getTipElement(), i = g.Event(this.constructor.Event.HIDE), o = function () {
                    e._hoverState !== je && n.parentNode && n.parentNode.removeChild(n), e._cleanTipClass(), e.element.removeAttribute("aria-describedby"), g(e.element).trigger(e.constructor.Event.HIDDEN), null !== e._popper && e._popper.destroy(), t && t()
                };
                if (g(this.element).trigger(i), !i.isDefaultPrevented()) {
                    if (g(n).removeClass(Fe), "ontouchstart" in document.documentElement && g(document.body).children().off("mouseover", null, g.noop), this._activeTrigger[Ke] = !1, this._activeTrigger[Me] = !1, this._activeTrigger[qe] = !1, g(this.tip).hasClass(xe)) {
                        var r = _.getTransitionDurationFromElement(n);
                        g(n).one(_.TRANSITION_END, o).emulateTransitionEnd(r)
                    } else o();
                    this._hoverState = ""
                }
            }, t.update = function () {
                null !== this._popper && this._popper.scheduleUpdate()
            }, t.isWithContent = function () {
                return Boolean(this.getTitle())
            }, t.addAttachmentClass = function (t) {
                g(this.getTipElement()).addClass(Ae + "-" + t)
            }, t.getTipElement = function () {
                return this.tip = this.tip || g(this.config.template)[0], this.tip
            }, t.setContent = function () {
                var t = this.getTipElement();
                this.setElementContent(g(t.querySelectorAll(Ue)), this.getTitle()), g(t).removeClass(xe + " " + Fe)
            }, t.setElementContent = function (t, e) {
                "object" != typeof e || !e.nodeType && !e.jquery ? this.config.html ? (this.config.sanitize && (e = Se(e, this.config.whiteList, this.config.sanitizeFn)), t.html(e)) : t.text(e) : this.config.html ? g(e).parent().is(t) || t.empty().append(e) : t.text(g(e).text())
            }, t.getTitle = function () {
                var t = this.element.getAttribute("data-original-title");
                return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
            }, t._getOffset = function () {
                var e = this, t = {};
                return "function" == typeof this.config.offset ? t.fn = function (t) {
                    return t.offsets = l({}, t.offsets, e.config.offset(t.offsets, e.element) || {}), t
                } : t.offset = this.config.offset, t
            }, t._getContainer = function () {
                return !1 === this.config.container ? document.body : _.isElement(this.config.container) ? g(this.config.container) : g(document).find(this.config.container)
            }, t._getAttachment = function (t) {
                return Pe[t.toUpperCase()]
            }, t._setListeners = function () {
                var i = this;
                this.config.trigger.split(" ").forEach(function (t) {
                    if ("click" === t) g(i.element).on(i.constructor.Event.CLICK, i.config.selector, function (t) {
                        return i.toggle(t)
                    }); else if (t !== Qe) {
                        var e = t === qe ? i.constructor.Event.MOUSEENTER : i.constructor.Event.FOCUSIN,
                            n = t === qe ? i.constructor.Event.MOUSELEAVE : i.constructor.Event.FOCUSOUT;
                        g(i.element).on(e, i.config.selector, function (t) {
                            return i._enter(t)
                        }).on(n, i.config.selector, function (t) {
                            return i._leave(t)
                        })
                    }
                }), g(this.element).closest(".modal").on("hide.bs.modal", function () {
                    i.element && i.hide()
                }), this.config.selector ? this.config = l({}, this.config, {
                    trigger: "manual",
                    selector: ""
                }) : this._fixTitle()
            }, t._fixTitle = function () {
                var t = typeof this.element.getAttribute("data-original-title");
                (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
            }, t._enter = function (t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || g(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), g(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusin" === t.type ? Me : qe] = !0), g(e.getTipElement()).hasClass(Fe) || e._hoverState === je ? e._hoverState = je : (clearTimeout(e._timeout), e._hoverState = je, e.config.delay && e.config.delay.show ? e._timeout = setTimeout(function () {
                    e._hoverState === je && e.show()
                }, e.config.delay.show) : e.show())
            }, t._leave = function (t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || g(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), g(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusout" === t.type ? Me : qe] = !1), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = He, e.config.delay && e.config.delay.hide ? e._timeout = setTimeout(function () {
                    e._hoverState === He && e.hide()
                }, e.config.delay.hide) : e.hide())
            }, t._isWithActiveTrigger = function () {
                for (var t in this._activeTrigger) if (this._activeTrigger[t]) return !0;
                return !1
            }, t._getConfig = function (t) {
                var e = g(this.element).data();
                return Object.keys(e).forEach(function (t) {
                    -1 !== Oe.indexOf(t) && delete e[t]
                }), "number" == typeof (t = l({}, this.constructor.Default, e, "object" == typeof t && t ? t : {})).delay && (t.delay = {
                    show: t.delay,
                    hide: t.delay
                }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), _.typeCheckConfig(be, t, this.constructor.DefaultType), t.sanitize && (t.template = Se(t.template, t.whiteList, t.sanitizeFn)), t
            }, t._getDelegateConfig = function () {
                var t = {};
                if (this.config) for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                return t
            }, t._cleanTipClass = function () {
                var t = g(this.getTipElement()), e = t.attr("class").match(Ne);
                null !== e && e.length && t.removeClass(e.join(""))
            }, t._handlePopperPlacementChange = function (t) {
                var e = t.instance;
                this.tip = e.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
            }, t._fixTransition = function () {
                var t = this.getTipElement(), e = this.config.animation;
                null === t.getAttribute("x-placement") && (g(t).removeClass(xe), this.config.animation = !1, this.hide(), this.show(), this.config.animation = e)
            }, i._jQueryInterface = function (n) {
                return this.each(function () {
                    var t = g(this).data(Ie), e = "object" == typeof n && n;
                    if ((t || !/dispose|hide/.test(n)) && (t || (t = new i(this, e), g(this).data(Ie, t)), "string" == typeof n)) {
                        if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }, {
                key: "Default", get: function () {
                    return Le
                }
            }, {
                key: "NAME", get: function () {
                    return be
                }
            }, {
                key: "DATA_KEY", get: function () {
                    return Ie
                }
            }, {
                key: "Event", get: function () {
                    return Re
                }
            }, {
                key: "EVENT_KEY", get: function () {
                    return De
                }
            }, {
                key: "DefaultType", get: function () {
                    return ke
                }
            }]), i
        }();
    g.fn[be] = Be._jQueryInterface, g.fn[be].Constructor = Be, g.fn[be].noConflict = function () {
        return g.fn[be] = we, Be._jQueryInterface
    };
    var Ve = "popover", Ye = "bs.popover", ze = "." + Ye, Xe = g.fn[Ve], $e = "bs-popover",
        Ge = new RegExp("(^|\\s)" + $e + "\\S+", "g"), Je = l({}, Be.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }), Ze = l({}, Be.DefaultType, {content: "(string|element|function)"}), tn = "fade", en = "show",
        nn = ".popover-header", on = ".popover-body", rn = {
            HIDE: "hide" + ze,
            HIDDEN: "hidden" + ze,
            SHOW: "show" + ze,
            SHOWN: "shown" + ze,
            INSERTED: "inserted" + ze,
            CLICK: "click" + ze,
            FOCUSIN: "focusin" + ze,
            FOCUSOUT: "focusout" + ze,
            MOUSEENTER: "mouseenter" + ze,
            MOUSELEAVE: "mouseleave" + ze
        }, sn = function (t) {
            var e, n;

            function i() {
                return t.apply(this, arguments) || this
            }

            n = t, (e = i).prototype = Object.create(n.prototype), (e.prototype.constructor = e).__proto__ = n;
            var o = i.prototype;
            return o.isWithContent = function () {
                return this.getTitle() || this._getContent()
            }, o.addAttachmentClass = function (t) {
                g(this.getTipElement()).addClass($e + "-" + t)
            }, o.getTipElement = function () {
                return this.tip = this.tip || g(this.config.template)[0], this.tip
            }, o.setContent = function () {
                var t = g(this.getTipElement());
                this.setElementContent(t.find(nn), this.getTitle());
                var e = this._getContent();
                "function" == typeof e && (e = e.call(this.element)), this.setElementContent(t.find(on), e), t.removeClass(tn + " " + en)
            }, o._getContent = function () {
                return this.element.getAttribute("data-content") || this.config.content
            }, o._cleanTipClass = function () {
                var t = g(this.getTipElement()), e = t.attr("class").match(Ge);
                null !== e && 0 < e.length && t.removeClass(e.join(""))
            }, i._jQueryInterface = function (n) {
                return this.each(function () {
                    var t = g(this).data(Ye), e = "object" == typeof n ? n : null;
                    if ((t || !/dispose|hide/.test(n)) && (t || (t = new i(this, e), g(this).data(Ye, t)), "string" == typeof n)) {
                        if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }, {
                key: "Default", get: function () {
                    return Je
                }
            }, {
                key: "NAME", get: function () {
                    return Ve
                }
            }, {
                key: "DATA_KEY", get: function () {
                    return Ye
                }
            }, {
                key: "Event", get: function () {
                    return rn
                }
            }, {
                key: "EVENT_KEY", get: function () {
                    return ze
                }
            }, {
                key: "DefaultType", get: function () {
                    return Ze
                }
            }]), i
        }(Be);
    g.fn[Ve] = sn._jQueryInterface, g.fn[Ve].Constructor = sn, g.fn[Ve].noConflict = function () {
        return g.fn[Ve] = Xe, sn._jQueryInterface
    };
    var an = "scrollspy", ln = "bs.scrollspy", cn = "." + ln, hn = g.fn[an],
        un = {offset: 10, method: "auto", target: ""},
        fn = {offset: "number", method: "string", target: "(string|element)"},
        dn = {ACTIVATE: "activate" + cn, SCROLL: "scroll" + cn, LOAD_DATA_API: "load" + cn + ".data-api"},
        gn = "dropdown-item", _n = "active", mn = '[data-spy="scroll"]', pn = ".nav, .list-group", vn = ".nav-link",
        yn = ".nav-item", En = ".list-group-item", Cn = ".dropdown", Tn = ".dropdown-item", Sn = ".dropdown-toggle",
        bn = "offset", In = "position", Dn = function () {
            function n(t, e) {
                var n = this;
                this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(e), this._selector = this._config.target + " " + vn + "," + this._config.target + " " + En + "," + this._config.target + " " + Tn, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, g(this._scrollElement).on(dn.SCROLL, function (t) {
                    return n._process(t)
                }), this.refresh(), this._process()
            }

            var t = n.prototype;
            return t.refresh = function () {
                var e = this, t = this._scrollElement === this._scrollElement.window ? bn : In,
                    o = "auto" === this._config.method ? t : this._config.method, r = o === In ? this._getScrollTop() : 0;
                this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function (t) {
                    var e, n = _.getSelectorFromElement(t);
                    if (n && (e = document.querySelector(n)), e) {
                        var i = e.getBoundingClientRect();
                        if (i.width || i.height) return [g(e)[o]().top + r, n]
                    }
                    return null
                }).filter(function (t) {
                    return t
                }).sort(function (t, e) {
                    return t[0] - e[0]
                }).forEach(function (t) {
                    e._offsets.push(t[0]), e._targets.push(t[1])
                })
            }, t.dispose = function () {
                g.removeData(this._element, ln), g(this._scrollElement).off(cn), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
            }, t._getConfig = function (t) {
                if ("string" != typeof (t = l({}, un, "object" == typeof t && t ? t : {})).target) {
                    var e = g(t.target).attr("id");
                    e || (e = _.getUID(an), g(t.target).attr("id", e)), t.target = "#" + e
                }
                return _.typeCheckConfig(an, t, fn), t
            }, t._getScrollTop = function () {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
            }, t._getScrollHeight = function () {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }, t._getOffsetHeight = function () {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
            }, t._process = function () {
                var t = this._getScrollTop() + this._config.offset, e = this._getScrollHeight(),
                    n = this._config.offset + e - this._getOffsetHeight();
                if (this._scrollHeight !== e && this.refresh(), n <= t) {
                    var i = this._targets[this._targets.length - 1];
                    this._activeTarget !== i && this._activate(i)
                } else {
                    if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
                    for (var o = this._offsets.length; o--;) {
                        this._activeTarget !== this._targets[o] && t >= this._offsets[o] && ("undefined" == typeof this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o])
                    }
                }
            }, t._activate = function (e) {
                this._activeTarget = e, this._clear();
                var t = this._selector.split(",").map(function (t) {
                    return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                }), n = g([].slice.call(document.querySelectorAll(t.join(","))));
                n.hasClass(gn) ? (n.closest(Cn).find(Sn).addClass(_n), n.addClass(_n)) : (n.addClass(_n), n.parents(pn).prev(vn + ", " + En).addClass(_n), n.parents(pn).prev(yn).children(vn).addClass(_n)), g(this._scrollElement).trigger(dn.ACTIVATE, {relatedTarget: e})
            }, t._clear = function () {
                [].slice.call(document.querySelectorAll(this._selector)).filter(function (t) {
                    return t.classList.contains(_n)
                }).forEach(function (t) {
                    return t.classList.remove(_n)
                })
            }, n._jQueryInterface = function (e) {
                return this.each(function () {
                    var t = g(this).data(ln);
                    if (t || (t = new n(this, "object" == typeof e && e), g(this).data(ln, t)), "string" == typeof e) {
                        if ("undefined" == typeof t[e]) throw new TypeError('No method named "' + e + '"');
                        t[e]()
                    }
                })
            }, s(n, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }, {
                key: "Default", get: function () {
                    return un
                }
            }]), n
        }();
    g(window).on(dn.LOAD_DATA_API, function () {
        for (var t = [].slice.call(document.querySelectorAll(mn)), e = t.length; e--;) {
            var n = g(t[e]);
            Dn._jQueryInterface.call(n, n.data())
        }
    }), g.fn[an] = Dn._jQueryInterface, g.fn[an].Constructor = Dn, g.fn[an].noConflict = function () {
        return g.fn[an] = hn, Dn._jQueryInterface
    };
    var wn = "bs.tab", An = "." + wn, Nn = g.fn.tab, On = {
            HIDE: "hide" + An,
            HIDDEN: "hidden" + An,
            SHOW: "show" + An,
            SHOWN: "shown" + An,
            CLICK_DATA_API: "click" + An + ".data-api"
        }, kn = "dropdown-menu", Pn = "active", Ln = "disabled", jn = "fade", Hn = "show", Rn = ".dropdown",
        xn = ".nav, .list-group", Fn = ".active", Un = "> li > .active",
        Wn = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', qn = ".dropdown-toggle",
        Mn = "> .dropdown-menu .active", Kn = function () {
            function i(t) {
                this._element = t
            }

            var t = i.prototype;
            return t.show = function () {
                var n = this;
                if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && g(this._element).hasClass(Pn) || g(this._element).hasClass(Ln))) {
                    var t, i, e = g(this._element).closest(xn)[0], o = _.getSelectorFromElement(this._element);
                    if (e) {
                        var r = "UL" === e.nodeName || "OL" === e.nodeName ? Un : Fn;
                        i = (i = g.makeArray(g(e).find(r)))[i.length - 1]
                    }
                    var s = g.Event(On.HIDE, {relatedTarget: this._element}), a = g.Event(On.SHOW, {relatedTarget: i});
                    if (i && g(i).trigger(s), g(this._element).trigger(a), !a.isDefaultPrevented() && !s.isDefaultPrevented()) {
                        o && (t = document.querySelector(o)), this._activate(this._element, e);
                        var l = function () {
                            var t = g.Event(On.HIDDEN, {relatedTarget: n._element}),
                                e = g.Event(On.SHOWN, {relatedTarget: i});
                            g(i).trigger(t), g(n._element).trigger(e)
                        };
                        t ? this._activate(t, t.parentNode, l) : l()
                    }
                }
            }, t.dispose = function () {
                g.removeData(this._element, wn), this._element = null
            }, t._activate = function (t, e, n) {
                var i = this, o = (!e || "UL" !== e.nodeName && "OL" !== e.nodeName ? g(e).children(Fn) : g(e).find(Un))[0],
                    r = n && o && g(o).hasClass(jn), s = function () {
                        return i._transitionComplete(t, o, n)
                    };
                if (o && r) {
                    var a = _.getTransitionDurationFromElement(o);
                    g(o).removeClass(Hn).one(_.TRANSITION_END, s).emulateTransitionEnd(a)
                } else s()
            }, t._transitionComplete = function (t, e, n) {
                if (e) {
                    g(e).removeClass(Pn);
                    var i = g(e.parentNode).find(Mn)[0];
                    i && g(i).removeClass(Pn), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)
                }
                if (g(t).addClass(Pn), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), _.reflow(t), t.classList.contains(jn) && t.classList.add(Hn), t.parentNode && g(t.parentNode).hasClass(kn)) {
                    var o = g(t).closest(Rn)[0];
                    if (o) {
                        var r = [].slice.call(o.querySelectorAll(qn));
                        g(r).addClass(Pn)
                    }
                    t.setAttribute("aria-expanded", !0)
                }
                n && n()
            }, i._jQueryInterface = function (n) {
                return this.each(function () {
                    var t = g(this), e = t.data(wn);
                    if (e || (e = new i(this), t.data(wn, e)), "string" == typeof n) {
                        if ("undefined" == typeof e[n]) throw new TypeError('No method named "' + n + '"');
                        e[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }]), i
        }();
    g(document).on(On.CLICK_DATA_API, Wn, function (t) {
        t.preventDefault(), Kn._jQueryInterface.call(g(this), "show")
    }), g.fn.tab = Kn._jQueryInterface, g.fn.tab.Constructor = Kn, g.fn.tab.noConflict = function () {
        return g.fn.tab = Nn, Kn._jQueryInterface
    };
    var Qn = "toast", Bn = "bs.toast", Vn = "." + Bn, Yn = g.fn[Qn], zn = {
            CLICK_DISMISS: "click.dismiss" + Vn,
            HIDE: "hide" + Vn,
            HIDDEN: "hidden" + Vn,
            SHOW: "show" + Vn,
            SHOWN: "shown" + Vn
        }, Xn = "fade", $n = "hide", Gn = "show", Jn = "showing",
        Zn = {animation: "boolean", autohide: "boolean", delay: "number"},
        ti = {animation: !0, autohide: !0, delay: 500}, ei = '[data-dismiss="toast"]', ni = function () {
            function i(t, e) {
                this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners()
            }

            var t = i.prototype;
            return t.show = function () {
                var t = this;
                g(this._element).trigger(zn.SHOW), this._config.animation && this._element.classList.add(Xn);
                var e = function () {
                    t._element.classList.remove(Jn), t._element.classList.add(Gn), g(t._element).trigger(zn.SHOWN), t._config.autohide && t.hide()
                };
                if (this._element.classList.remove($n), this._element.classList.add(Jn), this._config.animation) {
                    var n = _.getTransitionDurationFromElement(this._element);
                    g(this._element).one(_.TRANSITION_END, e).emulateTransitionEnd(n)
                } else e()
            }, t.hide = function (t) {
                var e = this;
                this._element.classList.contains(Gn) && (g(this._element).trigger(zn.HIDE), t ? this._close() : this._timeout = setTimeout(function () {
                    e._close()
                }, this._config.delay))
            }, t.dispose = function () {
                clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(Gn) && this._element.classList.remove(Gn), g(this._element).off(zn.CLICK_DISMISS), g.removeData(this._element, Bn), this._element = null, this._config = null
            }, t._getConfig = function (t) {
                return t = l({}, ti, g(this._element).data(), "object" == typeof t && t ? t : {}), _.typeCheckConfig(Qn, t, this.constructor.DefaultType), t
            }, t._setListeners = function () {
                var t = this;
                g(this._element).on(zn.CLICK_DISMISS, ei, function () {
                    return t.hide(!0)
                })
            }, t._close = function () {
                var t = this, e = function () {
                    t._element.classList.add($n), g(t._element).trigger(zn.HIDDEN)
                };
                if (this._element.classList.remove(Gn), this._config.animation) {
                    var n = _.getTransitionDurationFromElement(this._element);
                    g(this._element).one(_.TRANSITION_END, e).emulateTransitionEnd(n)
                } else e()
            }, i._jQueryInterface = function (n) {
                return this.each(function () {
                    var t = g(this), e = t.data(Bn);
                    if (e || (e = new i(this, "object" == typeof n && n), t.data(Bn, e)), "string" == typeof n) {
                        if ("undefined" == typeof e[n]) throw new TypeError('No method named "' + n + '"');
                        e[n](this)
                    }
                })
            }, s(i, null, [{
                key: "VERSION", get: function () {
                    return "4.3.1"
                }
            }, {
                key: "DefaultType", get: function () {
                    return Zn
                }
            }, {
                key: "Default", get: function () {
                    return ti
                }
            }]), i
        }();
    g.fn[Qn] = ni._jQueryInterface, g.fn[Qn].Constructor = ni, g.fn[Qn].noConflict = function () {
        return g.fn[Qn] = Yn, ni._jQueryInterface
    }, function () {
        if ("undefined" == typeof g) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
        var t = g.fn.jquery.split(" ")[0].split(".");
        if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || 4 <= t[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
    }(), t.Util = _, t.Alert = p, t.Button = P, t.Carousel = lt, t.Collapse = bt, t.Dropdown = Jt, t.Modal = ve, t.Popover = sn, t.Scrollspy = Dn, t.Tab = Kn, t.Toast = ni, t.Tooltip = Be, Object.defineProperty(t, "__esModule", {value: !0})
});
//# sourceMappingURL=bootstrap.min.js.map

/* jquery.nicescroll 3.6.8 InuYaksa*2015 MIT http://nicescroll.areaaperta.com */
(function (f) {
    "function" === typeof define && define.amd ? define(["jquery"], f) : "object" === typeof exports ? module.exports = f(require("jquery")) : f(jQuery)
})(function (f) {
    var B = !1, F = !1, O = 0, P = 2E3, A = 0, J = ["webkit", "ms", "moz", "o"], v = window.requestAnimationFrame || !1,
        w = window.cancelAnimationFrame || !1;
    if (!v) for (var Q in J) {
        var G = J[Q];
        if (v = window[G + "RequestAnimationFrame"]) {
            w = window[G + "CancelAnimationFrame"] || window[G + "CancelRequestAnimationFrame"];
            break
        }
    }
    var x = window.MutationObserver || window.WebKitMutationObserver ||
        !1, K = {
        zindex: "auto",
        cursoropacitymin: 0,
        cursoropacitymax: 1,
        cursorcolor: "#424242",
        cursorwidth: "6px",
        cursorborder: "1px solid #fff",
        cursorborderradius: "5px",
        scrollspeed: 60,
        mousescrollstep: 24,
        touchbehavior: !1,
        hwacceleration: !0,
        usetransition: !0,
        boxzoom: !1,
        dblclickzoom: !0,
        gesturezoom: !0,
        grabcursorenabled: !0,
        autohidemode: !0,
        background: "",
        iframeautoresize: !0,
        cursorminheight: 32,
        preservenativescrolling: !0,
        railoffset: !1,
        railhoffset: !1,
        bouncescroll: !0,
        spacebarenabled: !0,
        railpadding: {top: 0, right: 0, left: 0, bottom: 0},
        disableoutline: !0,
        horizrailenabled: !0,
        railalign: "right",
        railvalign: "bottom",
        enabletranslate3d: !0,
        enablemousewheel: !0,
        enablekeyboard: !0,
        smoothscroll: !0,
        sensitiverail: !0,
        enablemouselockapi: !0,
        cursorfixedheight: !1,
        directionlockdeadzone: 6,
        hidecursordelay: 400,
        nativeparentscrolling: !0,
        enablescrollonselection: !0,
        overflowx: !0,
        overflowy: !0,
        cursordragspeed: .3,
        rtlmode: "auto",
        cursordragontouch: !1,
        oneaxismousemode: "auto",
        scriptpath: function () {
            var f = document.getElementsByTagName("script"), f = f.length ? f[f.length -
            1].src.split("?")[0] : "";
            return 0 < f.split("/").length ? f.split("/").slice(0, -1).join("/") + "/" : ""
        }(),
        preventmultitouchscrolling: !0,
        disablemutationobserver: !1
    }, H = !1, R = function () {
        if (H) return H;
        var f = document.createElement("DIV"), c = f.style, k = navigator.userAgent, l = navigator.platform,
            d = {haspointerlock: "pointerLockElement" in document || "webkitPointerLockElement" in document || "mozPointerLockElement" in document};
        d.isopera = "opera" in window;
        d.isopera12 = d.isopera && "getUserMedia" in navigator;
        d.isoperamini = "[object OperaMini]" ===
            Object.prototype.toString.call(window.operamini);
        d.isie = "all" in document && "attachEvent" in f && !d.isopera;
        d.isieold = d.isie && !("msInterpolationMode" in c);
        d.isie7 = d.isie && !d.isieold && (!("documentMode" in document) || 7 == document.documentMode);
        d.isie8 = d.isie && "documentMode" in document && 8 == document.documentMode;
        d.isie9 = d.isie && "performance" in window && 9 == document.documentMode;
        d.isie10 = d.isie && "performance" in window && 10 == document.documentMode;
        d.isie11 = "msRequestFullscreen" in f && 11 <= document.documentMode;
        d.isieedge12 =
            navigator.userAgent.match(/Edge\/12\./);
        d.isieedge = "msOverflowStyle" in f;
        d.ismodernie = d.isie11 || d.isieedge;
        d.isie9mobile = /iemobile.9/i.test(k);
        d.isie9mobile && (d.isie9 = !1);
        d.isie7mobile = !d.isie9mobile && d.isie7 && /iemobile/i.test(k);
        d.ismozilla = "MozAppearance" in c;
        d.iswebkit = "WebkitAppearance" in c;
        d.ischrome = "chrome" in window;
        d.ischrome38 = d.ischrome && "touchAction" in c;
        d.ischrome22 = !d.ischrome38 && d.ischrome && d.haspointerlock;
        d.ischrome26 = !d.ischrome38 && d.ischrome && "transition" in c;
        d.cantouch = "ontouchstart" in
            document.documentElement || "ontouchstart" in window;
        d.hasw3ctouch = (window.PointerEvent || !1) && (0 < navigator.MaxTouchPoints || 0 < navigator.msMaxTouchPoints);
        d.hasmstouch = !d.hasw3ctouch && (window.MSPointerEvent || !1);
        d.ismac = /^mac$/i.test(l);
        d.isios = d.cantouch && /iphone|ipad|ipod/i.test(l);
        d.isios4 = d.isios && !("seal" in Object);
        d.isios7 = d.isios && "webkitHidden" in document;
        d.isios8 = d.isios && "hidden" in document;
        d.isandroid = /android/i.test(k);
        d.haseventlistener = "addEventListener" in f;
        d.trstyle = !1;
        d.hastransform = !1;
        d.hastranslate3d = !1;
        d.transitionstyle = !1;
        d.hastransition = !1;
        d.transitionend = !1;
        l = ["transform", "msTransform", "webkitTransform", "MozTransform", "OTransform"];
        for (k = 0; k < l.length; k++) if (void 0 !== c[l[k]]) {
            d.trstyle = l[k];
            break
        }
        d.hastransform = !!d.trstyle;
        d.hastransform && (c[d.trstyle] = "translate3d(1px,2px,3px)", d.hastranslate3d = /translate3d/.test(c[d.trstyle]));
        d.transitionstyle = !1;
        d.prefixstyle = "";
        d.transitionend = !1;
        for (var l = "transition webkitTransition msTransition MozTransition OTransition OTransition KhtmlTransition".split(" "),
                 q = " -webkit- -ms- -moz- -o- -o -khtml-".split(" "), t = "transitionend webkitTransitionEnd msTransitionEnd transitionend otransitionend oTransitionEnd KhtmlTransitionEnd".split(" "), k = 0; k < l.length; k++) if (l[k] in c) {
            d.transitionstyle = l[k];
            d.prefixstyle = q[k];
            d.transitionend = t[k];
            break
        }
        d.ischrome26 && (d.prefixstyle = q[1]);
        d.hastransition = d.transitionstyle;
        a:{
            k = ["grab", "-webkit-grab", "-moz-grab"];
            if (d.ischrome && !d.ischrome38 || d.isie) k = [];
            for (l = 0; l < k.length; l++) if (q = k[l], c.cursor = q, c.cursor == q) {
                c = q;
                break a
            }
            c =
                "url(//patriciaportfolio.googlecode.com/files/openhand.cur),n-resize"
        }
        d.cursorgrabvalue = c;
        d.hasmousecapture = "setCapture" in f;
        d.hasMutationObserver = !1 !== x;
        return H = d
    }, S = function (h, c) {
        function k() {
            var b = a.doc.css(e.trstyle);
            return b && "matrix" == b.substr(0, 6) ? b.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/) : !1
        }

        function l() {
            var b = a.win;
            if ("zIndex" in b) return b.zIndex();
            for (; 0 < b.length && 9 != b[0].nodeType;) {
                var g = b.css("zIndex");
                if (!isNaN(g) && 0 != g) return parseInt(g);
                b = b.parent()
            }
            return !1
        }

        function d(b,
                   g, u) {
            g = b.css(g);
            b = parseFloat(g);
            return isNaN(b) ? (b = z[g] || 0, u = 3 == b ? u ? a.win.outerHeight() - a.win.innerHeight() : a.win.outerWidth() - a.win.innerWidth() : 1, a.isie8 && b && (b += 1), u ? b : 0) : b
        }

        function q(b, g, u, c) {
            a._bind(b, g, function (a) {
                a = a ? a : window.event;
                var c = {
                    original: a,
                    target: a.target || a.srcElement,
                    type: "wheel",
                    deltaMode: "MozMousePixelScroll" == a.type ? 0 : 1,
                    deltaX: 0,
                    deltaZ: 0,
                    preventDefault: function () {
                        a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                        return !1
                    },
                    stopImmediatePropagation: function () {
                        a.stopImmediatePropagation ?
                            a.stopImmediatePropagation() : a.cancelBubble = !0
                    }
                };
                "mousewheel" == g ? (a.wheelDeltaX && (c.deltaX = -.025 * a.wheelDeltaX), a.wheelDeltaY && (c.deltaY = -.025 * a.wheelDeltaY), c.deltaY || c.deltaX || (c.deltaY = -.025 * a.wheelDelta)) : c.deltaY = a.detail;
                return u.call(b, c)
            }, c)
        }

        function t(b, g, c) {
            var d, e;
            0 == b.deltaMode ? (d = -Math.floor(a.opt.mousescrollstep / 54 * b.deltaX), e = -Math.floor(a.opt.mousescrollstep / 54 * b.deltaY)) : 1 == b.deltaMode && (d = -Math.floor(b.deltaX * a.opt.mousescrollstep), e = -Math.floor(b.deltaY * a.opt.mousescrollstep));
            g && a.opt.oneaxismousemode && 0 == d && e && (d = e, e = 0, c && (0 > d ? a.getScrollLeft() >= a.page.maxw : 0 >= a.getScrollLeft()) && (e = d, d = 0));
            a.isrtlmode && (d = -d);
            d && (a.scrollmom && a.scrollmom.stop(), a.lastdeltax += d, a.debounced("mousewheelx", function () {
                var b = a.lastdeltax;
                a.lastdeltax = 0;
                a.rail.drag || a.doScrollLeftBy(b)
            }, 15));
            if (e) {
                if (a.opt.nativeparentscrolling && c && !a.ispage && !a.zoomactive) if (0 > e) {
                    if (a.getScrollTop() >= a.page.maxh) return !0
                } else if (0 >= a.getScrollTop()) return !0;
                a.scrollmom && a.scrollmom.stop();
                a.lastdeltay += e;
                a.synched("mousewheely", function () {
                    var b = a.lastdeltay;
                    a.lastdeltay = 0;
                    a.rail.drag || a.doScrollBy(b)
                }, 15)
            }
            b.stopImmediatePropagation();
            return b.preventDefault()
        }

        var a = this;
        this.version = "3.6.8";
        this.name = "nicescroll";
        this.me = c;
        this.opt = {doc: f("body"), win: !1};
        f.extend(this.opt, K);
        this.opt.snapbackspeed = 80;
        if (h) for (var r in a.opt) void 0 !== h[r] && (a.opt[r] = h[r]);
        a.opt.disablemutationobserver && (x = !1);
        this.iddoc = (this.doc = a.opt.doc) && this.doc[0] ? this.doc[0].id || "" : "";
        this.ispage = /^BODY|HTML/.test(a.opt.win ?
            a.opt.win[0].nodeName : this.doc[0].nodeName);
        this.haswrapper = !1 !== a.opt.win;
        this.win = a.opt.win || (this.ispage ? f(window) : this.doc);
        this.docscroll = this.ispage && !this.haswrapper ? f(window) : this.win;
        this.body = f("body");
        this.iframe = this.isfixed = this.viewport = !1;
        this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName;
        this.istextarea = "TEXTAREA" == this.win[0].nodeName;
        this.forcescreen = !1;
        this.canshowonmouseevent = "scroll" != a.opt.autohidemode;
        this.page = this.view = this.onzoomout = this.onzoomin =
            this.onscrollcancel = this.onscrollend = this.onscrollstart = this.onclick = this.ongesturezoom = this.onkeypress = this.onmousewheel = this.onmousemove = this.onmouseup = this.onmousedown = !1;
        this.scroll = {x: 0, y: 0};
        this.scrollratio = {x: 0, y: 0};
        this.cursorheight = 20;
        this.scrollvaluemax = 0;
        if ("auto" == this.opt.rtlmode) {
            r = this.win[0] == window ? this.body : this.win;
            var p = r.css("writing-mode") || r.css("-webkit-writing-mode") || r.css("-ms-writing-mode") || r.css("-moz-writing-mode");
            "horizontal-tb" == p || "lr-tb" == p || "" == p ? (this.isrtlmode =
                "rtl" == r.css("direction"), this.isvertical = !1) : (this.isrtlmode = "vertical-rl" == p || "tb" == p || "tb-rl" == p || "rl-tb" == p, this.isvertical = "vertical-rl" == p || "tb" == p || "tb-rl" == p)
        } else this.isrtlmode = !0 === this.opt.rtlmode, this.isvertical = !1;
        this.observerbody = this.observerremover = this.observer = this.scrollmom = this.scrollrunning = !1;
        do this.id = "ascrail" + P++; while (document.getElementById(this.id));
        this.hasmousefocus = this.hasfocus = this.zoomactive = this.zoom = this.selectiondrag = this.cursorfreezed = this.cursor = this.rail =
            !1;
        this.visibility = !0;
        this.hidden = this.locked = this.railslocked = !1;
        this.cursoractive = !0;
        this.wheelprevented = !1;
        this.overflowx = a.opt.overflowx;
        this.overflowy = a.opt.overflowy;
        this.nativescrollingarea = !1;
        this.checkarea = 0;
        this.events = [];
        this.saved = {};
        this.delaylist = {};
        this.synclist = {};
        this.lastdeltay = this.lastdeltax = 0;
        this.detected = R();
        var e = f.extend({}, this.detected);
        this.ishwscroll = (this.canhwscroll = e.hastransform && a.opt.hwacceleration) && a.haswrapper;
        this.hasreversehr = this.isrtlmode ? this.isvertical ?
            !(e.iswebkit || e.isie || e.isie11) : !(e.iswebkit || e.isie && !e.isie10 && !e.isie11) : !1;
        this.istouchcapable = !1;
        e.cantouch || !e.hasw3ctouch && !e.hasmstouch ? !e.cantouch || e.isios || e.isandroid || !e.iswebkit && !e.ismozilla || (this.istouchcapable = !0) : this.istouchcapable = !0;
        a.opt.enablemouselockapi || (e.hasmousecapture = !1, e.haspointerlock = !1);
        this.debounced = function (b, g, c) {
            a && (a.delaylist[b] || (g.call(a), a.delaylist[b] = {
                h: v(function () {
                    a.delaylist[b].fn.call(a);
                    a.delaylist[b] = !1
                }, c)
            }), a.delaylist[b].fn = g)
        };
        var I = !1;
        this.synched =
            function (b, g) {
                a.synclist[b] = g;
                (function () {
                    I || (v(function () {
                        if (a) {
                            I = !1;
                            for (var b in a.synclist) {
                                var g = a.synclist[b];
                                g && g.call(a);
                                a.synclist[b] = !1
                            }
                        }
                    }), I = !0)
                })();
                return b
            };
        this.unsynched = function (b) {
            a.synclist[b] && (a.synclist[b] = !1)
        };
        this.css = function (b, g) {
            for (var c in g) a.saved.css.push([b, c, b.css(c)]), b.css(c, g[c])
        };
        this.scrollTop = function (b) {
            return void 0 === b ? a.getScrollTop() : a.setScrollTop(b)
        };
        this.scrollLeft = function (b) {
            return void 0 === b ? a.getScrollLeft() : a.setScrollLeft(b)
        };
        var D = function (a, g,
                          c, d, e, f, k) {
            this.st = a;
            this.ed = g;
            this.spd = c;
            this.p1 = d || 0;
            this.p2 = e || 1;
            this.p3 = f || 0;
            this.p4 = k || 1;
            this.ts = (new Date).getTime();
            this.df = this.ed - this.st
        };
        D.prototype = {
            B2: function (a) {
                return 3 * a * a * (1 - a)
            }, B3: function (a) {
                return 3 * a * (1 - a) * (1 - a)
            }, B4: function (a) {
                return (1 - a) * (1 - a) * (1 - a)
            }, getNow: function () {
                var a = 1 - ((new Date).getTime() - this.ts) / this.spd, g = this.B2(a) + this.B3(a) + this.B4(a);
                return 0 > a ? this.ed : this.st + Math.round(this.df * g)
            }, update: function (a, g) {
                this.st = this.getNow();
                this.ed = a;
                this.spd = g;
                this.ts = (new Date).getTime();
                this.df = this.ed - this.st;
                return this
            }
        };
        if (this.ishwscroll) {
            this.doc.translate = {x: 0, y: 0, tx: "0px", ty: "0px"};
            e.hastranslate3d && e.isios && this.doc.css("-webkit-backface-visibility", "hidden");
            this.getScrollTop = function (b) {
                if (!b) {
                    if (b = k()) return 16 == b.length ? -b[13] : -b[5];
                    if (a.timerscroll && a.timerscroll.bz) return a.timerscroll.bz.getNow()
                }
                return a.doc.translate.y
            };
            this.getScrollLeft = function (b) {
                if (!b) {
                    if (b = k()) return 16 == b.length ? -b[12] : -b[4];
                    if (a.timerscroll && a.timerscroll.bh) return a.timerscroll.bh.getNow()
                }
                return a.doc.translate.x
            };
            this.notifyScrollEvent = function (a) {
                var g = document.createEvent("UIEvents");
                g.initUIEvent("scroll", !1, !0, window, 1);
                g.niceevent = !0;
                a.dispatchEvent(g)
            };
            var y = this.isrtlmode ? 1 : -1;
            e.hastranslate3d && a.opt.enabletranslate3d ? (this.setScrollTop = function (b, g) {
                a.doc.translate.y = b;
                a.doc.translate.ty = -1 * b + "px";
                a.doc.css(e.trstyle, "translate3d(" + a.doc.translate.tx + "," + a.doc.translate.ty + ",0px)");
                g || a.notifyScrollEvent(a.win[0])
            }, this.setScrollLeft = function (b, g) {
                a.doc.translate.x = b;
                a.doc.translate.tx = b * y + "px";
                a.doc.css(e.trstyle,
                    "translate3d(" + a.doc.translate.tx + "," + a.doc.translate.ty + ",0px)");
                g || a.notifyScrollEvent(a.win[0])
            }) : (this.setScrollTop = function (b, g) {
                a.doc.translate.y = b;
                a.doc.translate.ty = -1 * b + "px";
                a.doc.css(e.trstyle, "translate(" + a.doc.translate.tx + "," + a.doc.translate.ty + ")");
                g || a.notifyScrollEvent(a.win[0])
            }, this.setScrollLeft = function (b, g) {
                a.doc.translate.x = b;
                a.doc.translate.tx = b * y + "px";
                a.doc.css(e.trstyle, "translate(" + a.doc.translate.tx + "," + a.doc.translate.ty + ")");
                g || a.notifyScrollEvent(a.win[0])
            })
        } else this.getScrollTop =
            function () {
                return a.docscroll.scrollTop()
            }, this.setScrollTop = function (b) {
            return setTimeout(function () {
                a && a.docscroll.scrollTop(b)
            }, 1)
        }, this.getScrollLeft = function () {
            return a.hasreversehr ? a.detected.ismozilla ? a.page.maxw - Math.abs(a.docscroll.scrollLeft()) : a.page.maxw - a.docscroll.scrollLeft() : a.docscroll.scrollLeft()
        }, this.setScrollLeft = function (b) {
            return setTimeout(function () {
                if (a) return a.hasreversehr && (b = a.detected.ismozilla ? -(a.page.maxw - b) : a.page.maxw - b), a.docscroll.scrollLeft(b)
            }, 1)
        };
        this.getTarget =
            function (a) {
                return a ? a.target ? a.target : a.srcElement ? a.srcElement : !1 : !1
            };
        this.hasParent = function (a, g) {
            if (!a) return !1;
            for (var c = a.target || a.srcElement || a || !1; c && c.id != g;) c = c.parentNode || !1;
            return !1 !== c
        };
        var z = {thin: 1, medium: 3, thick: 5};
        this.getDocumentScrollOffset = function () {
            return {
                top: window.pageYOffset || document.documentElement.scrollTop,
                left: window.pageXOffset || document.documentElement.scrollLeft
            }
        };
        this.getOffset = function () {
            if (a.isfixed) {
                var b = a.win.offset(), g = a.getDocumentScrollOffset();
                b.top -= g.top;
                b.left -= g.left;
                return b
            }
            b = a.win.offset();
            if (!a.viewport) return b;
            g = a.viewport.offset();
            return {top: b.top - g.top, left: b.left - g.left}
        };
        this.updateScrollBar = function (b) {
            var g, c, e;
            if (a.ishwscroll) a.rail.css({height: a.win.innerHeight() - (a.opt.railpadding.top + a.opt.railpadding.bottom)}), a.railh && a.railh.css({width: a.win.innerWidth() - (a.opt.railpadding.left + a.opt.railpadding.right)}); else {
                var f = a.getOffset();
                g = f.top;
                c = f.left - (a.opt.railpadding.left + a.opt.railpadding.right);
                g += d(a.win, "border-top-width", !0);
                c += a.rail.align ? a.win.outerWidth() - d(a.win, "border-right-width") - a.rail.width : d(a.win, "border-left-width");
                if (e = a.opt.railoffset) e.top && (g += e.top), e.left && (c += e.left);
                a.railslocked || a.rail.css({
                    top: g,
                    left: c,
                    height: (b ? b.h : a.win.innerHeight()) - (a.opt.railpadding.top + a.opt.railpadding.bottom)
                });
                a.zoom && a.zoom.css({top: g + 1, left: 1 == a.rail.align ? c - 20 : c + a.rail.width + 4});
                if (a.railh && !a.railslocked) {
                    g = f.top;
                    c = f.left;
                    if (e = a.opt.railhoffset) e.top && (g += e.top), e.left && (c += e.left);
                    b = a.railh.align ? g + d(a.win, "border-top-width",
                        !0) + a.win.innerHeight() - a.railh.height : g + d(a.win, "border-top-width", !0);
                    c += d(a.win, "border-left-width");
                    a.railh.css({
                        top: b - (a.opt.railpadding.top + a.opt.railpadding.bottom),
                        left: c,
                        width: a.railh.width
                    })
                }
            }
        };
        this.doRailClick = function (b, g, c) {
            var d;
            a.railslocked || (a.cancelEvent(b), g ? (g = c ? a.doScrollLeft : a.doScrollTop, d = c ? (b.pageX - a.railh.offset().left - a.cursorwidth / 2) * a.scrollratio.x : (b.pageY - a.rail.offset().top - a.cursorheight / 2) * a.scrollratio.y, g(d)) : (g = c ? a.doScrollLeftBy : a.doScrollBy, d = c ? a.scroll.x : a.scroll.y,
                b = c ? b.pageX - a.railh.offset().left : b.pageY - a.rail.offset().top, c = c ? a.view.w : a.view.h, g(d >= b ? c : -c)))
        };
        a.hasanimationframe = v;
        a.hascancelanimationframe = w;
        a.hasanimationframe ? a.hascancelanimationframe || (w = function () {
            a.cancelAnimationFrame = !0
        }) : (v = function (a) {
            return setTimeout(a, 15 - Math.floor(+new Date / 1E3) % 16)
        }, w = clearTimeout);
        this.init = function () {
            a.saved.css = [];
            if (e.isie7mobile || e.isoperamini) return !0;
            e.hasmstouch && a.css(a.ispage ? f("html") : a.win, {_touchaction: "none"});
            var b = e.ismodernie || e.isie10 ? {"-ms-overflow-style": "none"} :
                {"overflow-y": "hidden"};
            a.zindex = "auto";
            a.zindex = a.ispage || "auto" != a.opt.zindex ? a.opt.zindex : l() || "auto";
            !a.ispage && "auto" != a.zindex && a.zindex > A && (A = a.zindex);
            a.isie && 0 == a.zindex && "auto" == a.opt.zindex && (a.zindex = "auto");
            if (!a.ispage || !e.cantouch && !e.isieold && !e.isie9mobile) {
                var c = a.docscroll;
                a.ispage && (c = a.haswrapper ? a.win : a.doc);
                e.isie9mobile || a.css(c, b);
                a.ispage && e.isie7 && ("BODY" == a.doc[0].nodeName ? a.css(f("html"), {"overflow-y": "hidden"}) : "HTML" == a.doc[0].nodeName && a.css(f("body"), b));
                !e.isios ||
                a.ispage || a.haswrapper || a.css(f("body"), {"-webkit-overflow-scrolling": "touch"});
                var d = f(document.createElement("div"));
                d.css({
                    position: "relative",
                    top: 0,
                    "float": "right",
                    width: a.opt.cursorwidth,
                    height: 0,
                    "background-color": a.opt.cursorcolor,
                    border: a.opt.cursorborder,
                    "background-clip": "padding-box",
                    "-webkit-border-radius": a.opt.cursorborderradius,
                    "-moz-border-radius": a.opt.cursorborderradius,
                    "border-radius": a.opt.cursorborderradius
                });
                d.hborder = parseFloat(d.outerHeight() - d.innerHeight());
                d.addClass("nicescroll-cursors");
                a.cursor = d;
                var m = f(document.createElement("div"));
                m.attr("id", a.id);
                m.addClass("nicescroll-rails nicescroll-rails-vr");
                var k, h, p = ["left", "right", "top", "bottom"], L;
                for (L in p) h = p[L], (k = a.opt.railpadding[h]) ? m.css("padding-" + h, k + "px") : a.opt.railpadding[h] = 0;
                m.append(d);
                m.width = Math.max(parseFloat(a.opt.cursorwidth), d.outerWidth());
                m.css({width: m.width + "px", zIndex: a.zindex, background: a.opt.background, cursor: "default"});
                m.visibility = !0;
                m.scrollable = !0;
                m.align = "left" == a.opt.railalign ? 0 : 1;
                a.rail = m;
                d = a.rail.drag =
                    !1;
                !a.opt.boxzoom || a.ispage || e.isieold || (d = document.createElement("div"), a.bind(d, "click", a.doZoom), a.bind(d, "mouseenter", function () {
                    a.zoom.css("opacity", a.opt.cursoropacitymax)
                }), a.bind(d, "mouseleave", function () {
                    a.zoom.css("opacity", a.opt.cursoropacitymin)
                }), a.zoom = f(d), a.zoom.css({
                    cursor: "pointer",
                    zIndex: a.zindex,
                    backgroundImage: "url(" + a.opt.scriptpath + "zoomico.png)",
                    height: 18,
                    width: 18,
                    backgroundPosition: "0px 0px"
                }), a.opt.dblclickzoom && a.bind(a.win, "dblclick", a.doZoom), e.cantouch && a.opt.gesturezoom &&
                (a.ongesturezoom = function (b) {
                    1.5 < b.scale && a.doZoomIn(b);
                    .8 > b.scale && a.doZoomOut(b);
                    return a.cancelEvent(b)
                }, a.bind(a.win, "gestureend", a.ongesturezoom)));
                a.railh = !1;
                var n;
                a.opt.horizrailenabled && (a.css(c, {overflowX: "hidden"}), d = f(document.createElement("div")), d.css({
                    position: "absolute",
                    top: 0,
                    height: a.opt.cursorwidth,
                    width: 0,
                    backgroundColor: a.opt.cursorcolor,
                    border: a.opt.cursorborder,
                    backgroundClip: "padding-box",
                    "-webkit-border-radius": a.opt.cursorborderradius,
                    "-moz-border-radius": a.opt.cursorborderradius,
                    "border-radius": a.opt.cursorborderradius
                }), e.isieold && d.css("overflow", "hidden"), d.wborder = parseFloat(d.outerWidth() - d.innerWidth()), d.addClass("nicescroll-cursors"), a.cursorh = d, n = f(document.createElement("div")), n.attr("id", a.id + "-hr"), n.addClass("nicescroll-rails nicescroll-rails-hr"), n.height = Math.max(parseFloat(a.opt.cursorwidth), d.outerHeight()), n.css({
                    height: n.height + "px",
                    zIndex: a.zindex,
                    background: a.opt.background
                }), n.append(d), n.visibility = !0, n.scrollable = !0, n.align = "top" == a.opt.railvalign ?
                    0 : 1, a.railh = n, a.railh.drag = !1);
                a.ispage ? (m.css({
                    position: "fixed",
                    top: 0,
                    height: "100%"
                }), m.align ? m.css({right: 0}) : m.css({left: 0}), a.body.append(m), a.railh && (n.css({
                    position: "fixed",
                    left: 0,
                    width: "100%"
                }), n.align ? n.css({bottom: 0}) : n.css({top: 0}), a.body.append(n))) : (a.ishwscroll ? ("static" == a.win.css("position") && a.css(a.win, {position: "relative"}), c = "HTML" == a.win[0].nodeName ? a.body : a.win, f(c).scrollTop(0).scrollLeft(0), a.zoom && (a.zoom.css({
                    position: "absolute",
                    top: 1,
                    right: 0,
                    "margin-right": m.width + 4
                }), c.append(a.zoom)),
                    m.css({
                        position: "absolute",
                        top: 0
                    }), m.align ? m.css({right: 0}) : m.css({left: 0}), c.append(m), n && (n.css({
                    position: "absolute",
                    left: 0,
                    bottom: 0
                }), n.align ? n.css({bottom: 0}) : n.css({top: 0}), c.append(n))) : (a.isfixed = "fixed" == a.win.css("position"), c = a.isfixed ? "fixed" : "absolute", a.isfixed || (a.viewport = a.getViewport(a.win[0])), a.viewport && (a.body = a.viewport, 0 == /fixed|absolute/.test(a.viewport.css("position")) && a.css(a.viewport, {position: "relative"})), m.css({position: c}), a.zoom && a.zoom.css({position: c}), a.updateScrollBar(),
                    a.body.append(m), a.zoom && a.body.append(a.zoom), a.railh && (n.css({position: c}), a.body.append(n))), e.isios && a.css(a.win, {
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                    "-webkit-touch-callout": "none"
                }), e.isie && a.opt.disableoutline && a.win.attr("hideFocus", "true"), e.iswebkit && a.opt.disableoutline && a.win.css("outline", "none"));
                !1 === a.opt.autohidemode ? (a.autohidedom = !1, a.rail.css({opacity: a.opt.cursoropacitymax}), a.railh && a.railh.css({opacity: a.opt.cursoropacitymax})) : !0 === a.opt.autohidemode || "leave" === a.opt.autohidemode ?
                    (a.autohidedom = f().add(a.rail), e.isie8 && (a.autohidedom = a.autohidedom.add(a.cursor)), a.railh && (a.autohidedom = a.autohidedom.add(a.railh)), a.railh && e.isie8 && (a.autohidedom = a.autohidedom.add(a.cursorh))) : "scroll" == a.opt.autohidemode ? (a.autohidedom = f().add(a.rail), a.railh && (a.autohidedom = a.autohidedom.add(a.railh))) : "cursor" == a.opt.autohidemode ? (a.autohidedom = f().add(a.cursor), a.railh && (a.autohidedom = a.autohidedom.add(a.cursorh))) : "hidden" == a.opt.autohidemode && (a.autohidedom = !1, a.hide(), a.railslocked =
                        !1);
                if (e.isie9mobile) a.scrollmom = new M(a), a.onmangotouch = function () {
                    var b = a.getScrollTop(), c = a.getScrollLeft();
                    if (b == a.scrollmom.lastscrolly && c == a.scrollmom.lastscrollx) return !0;
                    var g = b - a.mangotouch.sy, d = c - a.mangotouch.sx;
                    if (0 != Math.round(Math.sqrt(Math.pow(d, 2) + Math.pow(g, 2)))) {
                        var e = 0 > g ? -1 : 1, f = 0 > d ? -1 : 1, u = +new Date;
                        a.mangotouch.lazy && clearTimeout(a.mangotouch.lazy);
                        80 < u - a.mangotouch.tm || a.mangotouch.dry != e || a.mangotouch.drx != f ? (a.scrollmom.stop(), a.scrollmom.reset(c, b), a.mangotouch.sy = b, a.mangotouch.ly =
                            b, a.mangotouch.sx = c, a.mangotouch.lx = c, a.mangotouch.dry = e, a.mangotouch.drx = f, a.mangotouch.tm = u) : (a.scrollmom.stop(), a.scrollmom.update(a.mangotouch.sx - d, a.mangotouch.sy - g), a.mangotouch.tm = u, g = Math.max(Math.abs(a.mangotouch.ly - b), Math.abs(a.mangotouch.lx - c)), a.mangotouch.ly = b, a.mangotouch.lx = c, 2 < g && (a.mangotouch.lazy = setTimeout(function () {
                            a.mangotouch.lazy = !1;
                            a.mangotouch.dry = 0;
                            a.mangotouch.drx = 0;
                            a.mangotouch.tm = 0;
                            a.scrollmom.doMomentum(30)
                        }, 100)))
                    }
                }, m = a.getScrollTop(), n = a.getScrollLeft(), a.mangotouch =
                    {
                        sy: m,
                        ly: m,
                        dry: 0,
                        sx: n,
                        lx: n,
                        drx: 0,
                        lazy: !1,
                        tm: 0
                    }, a.bind(a.docscroll, "scroll", a.onmangotouch); else {
                    if (e.cantouch || a.istouchcapable || a.opt.touchbehavior || e.hasmstouch) {
                        a.scrollmom = new M(a);
                        a.ontouchstart = function (b) {
                            if (b.pointerType && 2 != b.pointerType && "touch" != b.pointerType) return !1;
                            a.hasmoving = !1;
                            if (!a.railslocked) {
                                var c;
                                if (e.hasmstouch) for (c = b.target ? b.target : !1; c;) {
                                    var g = f(c).getNiceScroll();
                                    if (0 < g.length && g[0].me == a.me) break;
                                    if (0 < g.length) return !1;
                                    if ("DIV" == c.nodeName && c.id == a.id) break;
                                    c = c.parentNode ?
                                        c.parentNode : !1
                                }
                                a.cancelScroll();
                                if ((c = a.getTarget(b)) && /INPUT/i.test(c.nodeName) && /range/i.test(c.type)) return a.stopPropagation(b);
                                !("clientX" in b) && "changedTouches" in b && (b.clientX = b.changedTouches[0].clientX, b.clientY = b.changedTouches[0].clientY);
                                a.forcescreen && (g = b, b = {original: b.original ? b.original : b}, b.clientX = g.screenX, b.clientY = g.screenY);
                                a.rail.drag = {
                                    x: b.clientX,
                                    y: b.clientY,
                                    sx: a.scroll.x,
                                    sy: a.scroll.y,
                                    st: a.getScrollTop(),
                                    sl: a.getScrollLeft(),
                                    pt: 2,
                                    dl: !1
                                };
                                if (a.ispage || !a.opt.directionlockdeadzone) a.rail.drag.dl =
                                    "f"; else {
                                    var g = f(window).width(), d = f(window).height(),
                                        d = Math.max(0, Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - d),
                                        g = Math.max(0, Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) - g);
                                    a.rail.drag.ck = !a.rail.scrollable && a.railh.scrollable ? 0 < d ? "v" : !1 : a.rail.scrollable && !a.railh.scrollable ? 0 < g ? "h" : !1 : !1;
                                    a.rail.drag.ck || (a.rail.drag.dl = "f")
                                }
                                a.opt.touchbehavior && a.isiframe && e.isie && (g = a.win.position(), a.rail.drag.x += g.left, a.rail.drag.y += g.top);
                                a.hasmoving =
                                    !1;
                                a.lastmouseup = !1;
                                a.scrollmom.reset(b.clientX, b.clientY);
                                if (!e.cantouch && !this.istouchcapable && !b.pointerType) {
                                    if (!c || !/INPUT|SELECT|TEXTAREA/i.test(c.nodeName)) return !a.ispage && e.hasmousecapture && c.setCapture(), a.opt.touchbehavior ? (c.onclick && !c._onclick && (c._onclick = c.onclick, c.onclick = function (b) {
                                        if (a.hasmoving) return !1;
                                        c._onclick.call(this, b)
                                    }), a.cancelEvent(b)) : a.stopPropagation(b);
                                    /SUBMIT|CANCEL|BUTTON/i.test(f(c).attr("type")) && (pc = {
                                        tg: c,
                                        click: !1
                                    }, a.preventclick = pc)
                                }
                            }
                        };
                        a.ontouchend = function (b) {
                            if (!a.rail.drag) return !0;
                            if (2 == a.rail.drag.pt) {
                                if (b.pointerType && 2 != b.pointerType && "touch" != b.pointerType) return !1;
                                a.scrollmom.doMomentum();
                                a.rail.drag = !1;
                                if (a.hasmoving && (a.lastmouseup = !0, a.hideCursor(), e.hasmousecapture && document.releaseCapture(), !e.cantouch)) return a.cancelEvent(b)
                            } else if (1 == a.rail.drag.pt) return a.onmouseup(b)
                        };
                        var q = a.opt.touchbehavior && a.isiframe && !e.hasmousecapture;
                        a.ontouchmove = function (b, c) {
                            if (!a.rail.drag || b.targetTouches && a.opt.preventmultitouchscrolling && 1 < b.targetTouches.length || b.pointerType &&
                                2 != b.pointerType && "touch" != b.pointerType) return !1;
                            if (2 == a.rail.drag.pt) {
                                if (e.cantouch && e.isios && void 0 === b.original) return !0;
                                a.hasmoving = !0;
                                a.preventclick && !a.preventclick.click && (a.preventclick.click = a.preventclick.tg.onclick || !1, a.preventclick.tg.onclick = a.onpreventclick);
                                b = f.extend({original: b}, b);
                                "changedTouches" in b && (b.clientX = b.changedTouches[0].clientX, b.clientY = b.changedTouches[0].clientY);
                                if (a.forcescreen) {
                                    var g = b;
                                    b = {original: b.original ? b.original : b};
                                    b.clientX = g.screenX;
                                    b.clientY = g.screenY
                                }
                                var d,
                                    g = d = 0;
                                q && !c && (d = a.win.position(), g = -d.left, d = -d.top);
                                var u = b.clientY + d;
                                d = u - a.rail.drag.y;
                                var m = b.clientX + g, k = m - a.rail.drag.x, h = a.rail.drag.st - d;
                                a.ishwscroll && a.opt.bouncescroll ? 0 > h ? h = Math.round(h / 2) : h > a.page.maxh && (h = a.page.maxh + Math.round((h - a.page.maxh) / 2)) : (0 > h && (u = h = 0), h > a.page.maxh && (h = a.page.maxh, u = 0));
                                var l;
                                a.railh && a.railh.scrollable && (l = a.isrtlmode ? k - a.rail.drag.sl : a.rail.drag.sl - k, a.ishwscroll && a.opt.bouncescroll ? 0 > l ? l = Math.round(l / 2) : l > a.page.maxw && (l = a.page.maxw + Math.round((l - a.page.maxw) /
                                    2)) : (0 > l && (m = l = 0), l > a.page.maxw && (l = a.page.maxw, m = 0)));
                                g = !1;
                                if (a.rail.drag.dl) g = !0, "v" == a.rail.drag.dl ? l = a.rail.drag.sl : "h" == a.rail.drag.dl && (h = a.rail.drag.st); else {
                                    d = Math.abs(d);
                                    var k = Math.abs(k), C = a.opt.directionlockdeadzone;
                                    if ("v" == a.rail.drag.ck) {
                                        if (d > C && k <= .3 * d) return a.rail.drag = !1, !0;
                                        k > C && (a.rail.drag.dl = "f", f("body").scrollTop(f("body").scrollTop()))
                                    } else if ("h" == a.rail.drag.ck) {
                                        if (k > C && d <= .3 * k) return a.rail.drag = !1, !0;
                                        d > C && (a.rail.drag.dl = "f", f("body").scrollLeft(f("body").scrollLeft()))
                                    }
                                }
                                a.synched("touchmove",
                                    function () {
                                        a.rail.drag && 2 == a.rail.drag.pt && (a.prepareTransition && a.prepareTransition(0), a.rail.scrollable && a.setScrollTop(h), a.scrollmom.update(m, u), a.railh && a.railh.scrollable ? (a.setScrollLeft(l), a.showCursor(h, l)) : a.showCursor(h), e.isie10 && document.selection.clear())
                                    });
                                e.ischrome && a.istouchcapable && (g = !1);
                                if (g) return a.cancelEvent(b)
                            } else if (1 == a.rail.drag.pt) return a.onmousemove(b)
                        }
                    }
                    a.onmousedown = function (b, c) {
                        if (!a.rail.drag || 1 == a.rail.drag.pt) {
                            if (a.railslocked) return a.cancelEvent(b);
                            a.cancelScroll();
                            a.rail.drag = {x: b.clientX, y: b.clientY, sx: a.scroll.x, sy: a.scroll.y, pt: 1, hr: !!c};
                            var g = a.getTarget(b);
                            !a.ispage && e.hasmousecapture && g.setCapture();
                            a.isiframe && !e.hasmousecapture && (a.saved.csspointerevents = a.doc.css("pointer-events"), a.css(a.doc, {"pointer-events": "none"}));
                            a.hasmoving = !1;
                            return a.cancelEvent(b)
                        }
                    };
                    a.onmouseup = function (b) {
                        if (a.rail.drag) {
                            if (1 != a.rail.drag.pt) return !0;
                            e.hasmousecapture && document.releaseCapture();
                            a.isiframe && !e.hasmousecapture && a.doc.css("pointer-events", a.saved.csspointerevents);
                            a.rail.drag = !1;
                            a.hasmoving && a.triggerScrollEnd();
                            return a.cancelEvent(b)
                        }
                    };
                    a.onmousemove = function (b) {
                        if (a.rail.drag) {
                            if (1 == a.rail.drag.pt) {
                                if (e.ischrome && 0 == b.which) return a.onmouseup(b);
                                a.cursorfreezed = !0;
                                a.hasmoving = !0;
                                if (a.rail.drag.hr) {
                                    a.scroll.x = a.rail.drag.sx + (b.clientX - a.rail.drag.x);
                                    0 > a.scroll.x && (a.scroll.x = 0);
                                    var c = a.scrollvaluemaxw;
                                    a.scroll.x > c && (a.scroll.x = c)
                                } else a.scroll.y = a.rail.drag.sy + (b.clientY - a.rail.drag.y), 0 > a.scroll.y && (a.scroll.y = 0), c = a.scrollvaluemax, a.scroll.y > c && (a.scroll.y =
                                    c);
                                a.synched("mousemove", function () {
                                    a.rail.drag && 1 == a.rail.drag.pt && (a.showCursor(), a.rail.drag.hr ? a.hasreversehr ? a.doScrollLeft(a.scrollvaluemaxw - Math.round(a.scroll.x * a.scrollratio.x), a.opt.cursordragspeed) : a.doScrollLeft(Math.round(a.scroll.x * a.scrollratio.x), a.opt.cursordragspeed) : a.doScrollTop(Math.round(a.scroll.y * a.scrollratio.y), a.opt.cursordragspeed))
                                });
                                return a.cancelEvent(b)
                            }
                        } else a.checkarea = 0
                    };
                    if (e.cantouch || a.opt.touchbehavior) a.onpreventclick = function (b) {
                        if (a.preventclick) return a.preventclick.tg.onclick =
                            a.preventclick.click, a.preventclick = !1, a.cancelEvent(b)
                    }, a.bind(a.win, "mousedown", a.ontouchstart), a.onclick = e.isios ? !1 : function (b) {
                        return a.lastmouseup ? (a.lastmouseup = !1, a.cancelEvent(b)) : !0
                    }, a.opt.grabcursorenabled && e.cursorgrabvalue && (a.css(a.ispage ? a.doc : a.win, {cursor: e.cursorgrabvalue}), a.css(a.rail, {cursor: e.cursorgrabvalue})); else {
                        var r = function (b) {
                            if (a.selectiondrag) {
                                if (b) {
                                    var c = a.win.outerHeight();
                                    b = b.pageY - a.selectiondrag.top;
                                    0 < b && b < c && (b = 0);
                                    b >= c && (b -= c);
                                    a.selectiondrag.df = b
                                }
                                0 != a.selectiondrag.df &&
                                (a.doScrollBy(2 * -Math.floor(a.selectiondrag.df / 6)), a.debounced("doselectionscroll", function () {
                                    r()
                                }, 50))
                            }
                        };
                        a.hasTextSelected = "getSelection" in document ? function () {
                            return 0 < document.getSelection().rangeCount
                        } : "selection" in document ? function () {
                            return "None" != document.selection.type
                        } : function () {
                            return !1
                        };
                        a.onselectionstart = function (b) {
                            a.ispage || (a.selectiondrag = a.win.offset())
                        };
                        a.onselectionend = function (b) {
                            a.selectiondrag = !1
                        };
                        a.onselectiondrag = function (b) {
                            a.selectiondrag && a.hasTextSelected() && a.debounced("selectionscroll",
                                function () {
                                    r(b)
                                }, 250)
                        }
                    }
                    e.hasw3ctouch ? (a.css(a.rail, {"touch-action": "none"}), a.css(a.cursor, {"touch-action": "none"}), a.bind(a.win, "pointerdown", a.ontouchstart), a.bind(document, "pointerup", a.ontouchend), a.bind(document, "pointermove", a.ontouchmove)) : e.hasmstouch ? (a.css(a.rail, {"-ms-touch-action": "none"}), a.css(a.cursor, {"-ms-touch-action": "none"}), a.bind(a.win, "MSPointerDown", a.ontouchstart), a.bind(document, "MSPointerUp", a.ontouchend), a.bind(document, "MSPointerMove", a.ontouchmove), a.bind(a.cursor, "MSGestureHold",
                        function (a) {
                            a.preventDefault()
                        }), a.bind(a.cursor, "contextmenu", function (a) {
                        a.preventDefault()
                    })) : this.istouchcapable && (a.bind(a.win, "touchstart", a.ontouchstart), a.bind(document, "touchend", a.ontouchend), a.bind(document, "touchcancel", a.ontouchend), a.bind(document, "touchmove", a.ontouchmove));
                    if (a.opt.cursordragontouch || !e.cantouch && !a.opt.touchbehavior) a.rail.css({cursor: "default"}), a.railh && a.railh.css({cursor: "default"}), a.jqbind(a.rail, "mouseenter", function () {
                        if (!a.ispage && !a.win.is(":visible")) return !1;
                        a.canshowonmouseevent && a.showCursor();
                        a.rail.active = !0
                    }), a.jqbind(a.rail, "mouseleave", function () {
                        a.rail.active = !1;
                        a.rail.drag || a.hideCursor()
                    }), a.opt.sensitiverail && (a.bind(a.rail, "click", function (b) {
                        a.doRailClick(b, !1, !1)
                    }), a.bind(a.rail, "dblclick", function (b) {
                        a.doRailClick(b, !0, !1)
                    }), a.bind(a.cursor, "click", function (b) {
                        a.cancelEvent(b)
                    }), a.bind(a.cursor, "dblclick", function (b) {
                        a.cancelEvent(b)
                    })), a.railh && (a.jqbind(a.railh, "mouseenter", function () {
                        if (!a.ispage && !a.win.is(":visible")) return !1;
                        a.canshowonmouseevent &&
                        a.showCursor();
                        a.rail.active = !0
                    }), a.jqbind(a.railh, "mouseleave", function () {
                        a.rail.active = !1;
                        a.rail.drag || a.hideCursor()
                    }), a.opt.sensitiverail && (a.bind(a.railh, "click", function (b) {
                        a.doRailClick(b, !1, !0)
                    }), a.bind(a.railh, "dblclick", function (b) {
                        a.doRailClick(b, !0, !0)
                    }), a.bind(a.cursorh, "click", function (b) {
                        a.cancelEvent(b)
                    }), a.bind(a.cursorh, "dblclick", function (b) {
                        a.cancelEvent(b)
                    })));
                    e.cantouch || a.opt.touchbehavior ? (a.bind(e.hasmousecapture ? a.win : document, "mouseup", a.ontouchend), a.bind(document, "mousemove",
                        a.ontouchmove), a.onclick && a.bind(document, "click", a.onclick), a.opt.cursordragontouch ? (a.bind(a.cursor, "mousedown", a.onmousedown), a.bind(a.cursor, "mouseup", a.onmouseup), a.cursorh && a.bind(a.cursorh, "mousedown", function (b) {
                        a.onmousedown(b, !0)
                    }), a.cursorh && a.bind(a.cursorh, "mouseup", a.onmouseup)) : (a.bind(a.rail, "mousedown", function (a) {
                        a.preventDefault()
                    }), a.railh && a.bind(a.railh, "mousedown", function (a) {
                        a.preventDefault()
                    }))) : (a.bind(e.hasmousecapture ? a.win : document, "mouseup", a.onmouseup), a.bind(document,
                        "mousemove", a.onmousemove), a.onclick && a.bind(document, "click", a.onclick), a.bind(a.cursor, "mousedown", a.onmousedown), a.bind(a.cursor, "mouseup", a.onmouseup), a.railh && (a.bind(a.cursorh, "mousedown", function (b) {
                        a.onmousedown(b, !0)
                    }), a.bind(a.cursorh, "mouseup", a.onmouseup)), !a.ispage && a.opt.enablescrollonselection && (a.bind(a.win[0], "mousedown", a.onselectionstart), a.bind(document, "mouseup", a.onselectionend), a.bind(a.cursor, "mouseup", a.onselectionend), a.cursorh && a.bind(a.cursorh, "mouseup", a.onselectionend),
                        a.bind(document, "mousemove", a.onselectiondrag)), a.zoom && (a.jqbind(a.zoom, "mouseenter", function () {
                        a.canshowonmouseevent && a.showCursor();
                        a.rail.active = !0
                    }), a.jqbind(a.zoom, "mouseleave", function () {
                        a.rail.active = !1;
                        a.rail.drag || a.hideCursor()
                    })));
                    a.opt.enablemousewheel && (a.isiframe || a.mousewheel(e.isie && a.ispage ? document : a.win, a.onmousewheel), a.mousewheel(a.rail, a.onmousewheel), a.railh && a.mousewheel(a.railh, a.onmousewheelhr));
                    a.ispage || e.cantouch || /HTML|^BODY/.test(a.win[0].nodeName) || (a.win.attr("tabindex") ||
                    a.win.attr({tabindex: O++}), a.jqbind(a.win, "focus", function (b) {
                        B = a.getTarget(b).id || !0;
                        a.hasfocus = !0;
                        a.canshowonmouseevent && a.noticeCursor()
                    }), a.jqbind(a.win, "blur", function (b) {
                        B = !1;
                        a.hasfocus = !1
                    }), a.jqbind(a.win, "mouseenter", function (b) {
                        F = a.getTarget(b).id || !0;
                        a.hasmousefocus = !0;
                        a.canshowonmouseevent && a.noticeCursor()
                    }), a.jqbind(a.win, "mouseleave", function () {
                        F = !1;
                        a.hasmousefocus = !1;
                        a.rail.drag || a.hideCursor()
                    }))
                }
                a.onkeypress = function (b) {
                    if (a.railslocked && 0 == a.page.maxh) return !0;
                    b = b ? b : window.e;
                    var c =
                        a.getTarget(b);
                    if (c && /INPUT|TEXTAREA|SELECT|OPTION/.test(c.nodeName) && (!c.getAttribute("type") && !c.type || !/submit|button|cancel/i.tp) || f(c).attr("contenteditable")) return !0;
                    if (a.hasfocus || a.hasmousefocus && !B || a.ispage && !B && !F) {
                        c = b.keyCode;
                        if (a.railslocked && 27 != c) return a.cancelEvent(b);
                        var g = b.ctrlKey || !1, d = b.shiftKey || !1, e = !1;
                        switch (c) {
                            case 38:
                            case 63233:
                                a.doScrollBy(72);
                                e = !0;
                                break;
                            case 40:
                            case 63235:
                                a.doScrollBy(-72);
                                e = !0;
                                break;
                            case 37:
                            case 63232:
                                a.railh && (g ? a.doScrollLeft(0) : a.doScrollLeftBy(72),
                                    e = !0);
                                break;
                            case 39:
                            case 63234:
                                a.railh && (g ? a.doScrollLeft(a.page.maxw) : a.doScrollLeftBy(-72), e = !0);
                                break;
                            case 33:
                            case 63276:
                                a.doScrollBy(a.view.h);
                                e = !0;
                                break;
                            case 34:
                            case 63277:
                                a.doScrollBy(-a.view.h);
                                e = !0;
                                break;
                            case 36:
                            case 63273:
                                a.railh && g ? a.doScrollPos(0, 0) : a.doScrollTo(0);
                                e = !0;
                                break;
                            case 35:
                            case 63275:
                                a.railh && g ? a.doScrollPos(a.page.maxw, a.page.maxh) : a.doScrollTo(a.page.maxh);
                                e = !0;
                                break;
                            case 32:
                                a.opt.spacebarenabled && (d ? a.doScrollBy(a.view.h) : a.doScrollBy(-a.view.h), e = !0);
                                break;
                            case 27:
                                a.zoomactive &&
                                (a.doZoom(), e = !0)
                        }
                        if (e) return a.cancelEvent(b)
                    }
                };
                a.opt.enablekeyboard && a.bind(document, e.isopera && !e.isopera12 ? "keypress" : "keydown", a.onkeypress);
                a.bind(document, "keydown", function (b) {
                    b.ctrlKey && (a.wheelprevented = !0)
                });
                a.bind(document, "keyup", function (b) {
                    b.ctrlKey || (a.wheelprevented = !1)
                });
                a.bind(window, "blur", function (b) {
                    a.wheelprevented = !1
                });
                a.bind(window, "resize", a.lazyResize);
                a.bind(window, "orientationchange", a.lazyResize);
                a.bind(window, "load", a.lazyResize);
                if (e.ischrome && !a.ispage && !a.haswrapper) {
                    var t =
                        a.win.attr("style"), m = parseFloat(a.win.css("width")) + 1;
                    a.win.css("width", m);
                    a.synched("chromefix", function () {
                        a.win.attr("style", t)
                    })
                }
                a.onAttributeChange = function (b) {
                    a.lazyResize(a.isieold ? 250 : 30)
                };
                a.isie11 || !1 === x || (a.observerbody = new x(function (b) {
                    b.forEach(function (b) {
                        if ("attributes" == b.type) return f("body").hasClass("modal-open") && f("body").hasClass("modal-dialog") && !f.contains(f(".modal-dialog")[0], a.doc[0]) ? a.hide() : a.show()
                    });
                    if (document.body.scrollHeight != a.page.maxh) return a.lazyResize(30)
                }),
                    a.observerbody.observe(document.body, {
                        childList: !0,
                        subtree: !0,
                        characterData: !1,
                        attributes: !0,
                        attributeFilter: ["class"]
                    }));
                a.ispage || a.haswrapper || (!1 !== x ? (a.observer = new x(function (b) {
                    b.forEach(a.onAttributeChange)
                }), a.observer.observe(a.win[0], {
                    childList: !0,
                    characterData: !1,
                    attributes: !0,
                    subtree: !1
                }), a.observerremover = new x(function (b) {
                    b.forEach(function (b) {
                        if (0 < b.removedNodes.length) for (var c in b.removedNodes) if (a && b.removedNodes[c] == a.win[0]) return a.remove()
                    })
                }), a.observerremover.observe(a.win[0].parentNode,
                    {
                        childList: !0,
                        characterData: !1,
                        attributes: !1,
                        subtree: !1
                    })) : (a.bind(a.win, e.isie && !e.isie9 ? "propertychange" : "DOMAttrModified", a.onAttributeChange), e.isie9 && a.win[0].attachEvent("onpropertychange", a.onAttributeChange), a.bind(a.win, "DOMNodeRemoved", function (b) {
                    b.target == a.win[0] && a.remove()
                })));
                !a.ispage && a.opt.boxzoom && a.bind(window, "resize", a.resizeZoom);
                a.istextarea && (a.bind(a.win, "keydown", a.lazyResize), a.bind(a.win, "mouseup", a.lazyResize));
                a.lazyResize(30)
            }
            if ("IFRAME" == this.doc[0].nodeName) {
                var N =
                    function () {
                        a.iframexd = !1;
                        var c;
                        try {
                            c = "contentDocument" in this ? this.contentDocument : this.contentWindow.document
                        } catch (g) {
                            a.iframexd = !0, c = !1
                        }
                        if (a.iframexd) return "console" in window && console.log("NiceScroll error: policy restriced iframe"), !0;
                        a.forcescreen = !0;
                        a.isiframe && (a.iframe = {
                            doc: f(c),
                            html: a.doc.contents().find("html")[0],
                            body: a.doc.contents().find("body")[0]
                        }, a.getContentSize = function () {
                            return {
                                w: Math.max(a.iframe.html.scrollWidth, a.iframe.body.scrollWidth),
                                h: Math.max(a.iframe.html.scrollHeight,
                                    a.iframe.body.scrollHeight)
                            }
                        }, a.docscroll = f(a.iframe.body));
                        if (!e.isios && a.opt.iframeautoresize && !a.isiframe) {
                            a.win.scrollTop(0);
                            a.doc.height("");
                            var d = Math.max(c.getElementsByTagName("html")[0].scrollHeight, c.body.scrollHeight);
                            a.doc.height(d)
                        }
                        a.lazyResize(30);
                        e.isie7 && a.css(f(a.iframe.html), b);
                        a.css(f(a.iframe.body), b);
                        e.isios && a.haswrapper && a.css(f(c.body), {"-webkit-transform": "translate3d(0,0,0)"});
                        "contentWindow" in this ? a.bind(this.contentWindow, "scroll", a.onscroll) : a.bind(c, "scroll", a.onscroll);
                        a.opt.enablemousewheel && a.mousewheel(c, a.onmousewheel);
                        a.opt.enablekeyboard && a.bind(c, e.isopera ? "keypress" : "keydown", a.onkeypress);
                        if (e.cantouch || a.opt.touchbehavior) a.bind(c, "mousedown", a.ontouchstart), a.bind(c, "mousemove", function (b) {
                            return a.ontouchmove(b, !0)
                        }), a.opt.grabcursorenabled && e.cursorgrabvalue && a.css(f(c.body), {cursor: e.cursorgrabvalue});
                        a.bind(c, "mouseup", a.ontouchend);
                        a.zoom && (a.opt.dblclickzoom && a.bind(c, "dblclick", a.doZoom), a.ongesturezoom && a.bind(c, "gestureend", a.ongesturezoom))
                    };
                this.doc[0].readyState && "complete" == this.doc[0].readyState && setTimeout(function () {
                    N.call(a.doc[0], !1)
                }, 500);
                a.bind(this.doc, "load", N)
            }
        };
        this.showCursor = function (b, c) {
            a.cursortimeout && (clearTimeout(a.cursortimeout), a.cursortimeout = 0);
            if (a.rail) {
                a.autohidedom && (a.autohidedom.stop().css({opacity: a.opt.cursoropacitymax}), a.cursoractive = !0);
                a.rail.drag && 1 == a.rail.drag.pt || (void 0 !== b && !1 !== b && (a.scroll.y = Math.round(1 * b / a.scrollratio.y)), void 0 !== c && (a.scroll.x = Math.round(1 * c / a.scrollratio.x)));
                a.cursor.css({
                    height: a.cursorheight,
                    top: a.scroll.y
                });
                if (a.cursorh) {
                    var d = a.hasreversehr ? a.scrollvaluemaxw - a.scroll.x : a.scroll.x;
                    !a.rail.align && a.rail.visibility ? a.cursorh.css({
                        width: a.cursorwidth,
                        left: d + a.rail.width
                    }) : a.cursorh.css({width: a.cursorwidth, left: d});
                    a.cursoractive = !0
                }
                a.zoom && a.zoom.stop().css({opacity: a.opt.cursoropacitymax})
            }
        };
        this.hideCursor = function (b) {
            a.cursortimeout || !a.rail || !a.autohidedom || a.hasmousefocus && "leave" == a.opt.autohidemode || (a.cursortimeout = setTimeout(function () {
                a.rail.active && a.showonmouseevent || (a.autohidedom.stop().animate({opacity: a.opt.cursoropacitymin}),
                a.zoom && a.zoom.stop().animate({opacity: a.opt.cursoropacitymin}), a.cursoractive = !1);
                a.cursortimeout = 0
            }, b || a.opt.hidecursordelay))
        };
        this.noticeCursor = function (b, c, d) {
            a.showCursor(c, d);
            a.rail.active || a.hideCursor(b)
        };
        this.getContentSize = a.ispage ? function () {
            return {
                w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
                h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }
        } : a.haswrapper ? function () {
            return {
                w: a.doc.outerWidth() + parseInt(a.win.css("paddingLeft")) +
                    parseInt(a.win.css("paddingRight")),
                h: a.doc.outerHeight() + parseInt(a.win.css("paddingTop")) + parseInt(a.win.css("paddingBottom"))
            }
        } : function () {
            return {w: a.docscroll[0].scrollWidth, h: a.docscroll[0].scrollHeight}
        };
        this.onResize = function (b, c) {
            if (!a || !a.win) return !1;
            if (!a.haswrapper && !a.ispage) {
                if ("none" == a.win.css("display")) return a.visibility && a.hideRail().hideRailHr(), !1;
                a.hidden || a.visibility || a.showRail().showRailHr()
            }
            var d = a.page.maxh, e = a.page.maxw, f = a.view.h, k = a.view.w;
            a.view = {
                w: a.ispage ? a.win.width() :
                    parseInt(a.win[0].clientWidth), h: a.ispage ? a.win.height() : parseInt(a.win[0].clientHeight)
            };
            a.page = c ? c : a.getContentSize();
            a.page.maxh = Math.max(0, a.page.h - a.view.h);
            a.page.maxw = Math.max(0, a.page.w - a.view.w);
            if (a.page.maxh == d && a.page.maxw == e && a.view.w == k && a.view.h == f) {
                if (a.ispage) return a;
                d = a.win.offset();
                if (a.lastposition && (e = a.lastposition, e.top == d.top && e.left == d.left)) return a;
                a.lastposition = d
            }
            0 == a.page.maxh ? (a.hideRail(), a.scrollvaluemax = 0, a.scroll.y = 0, a.scrollratio.y = 0, a.cursorheight = 0, a.setScrollTop(0),
            a.rail && (a.rail.scrollable = !1)) : (a.page.maxh -= a.opt.railpadding.top + a.opt.railpadding.bottom, a.rail.scrollable = !0);
            0 == a.page.maxw ? (a.hideRailHr(), a.scrollvaluemaxw = 0, a.scroll.x = 0, a.scrollratio.x = 0, a.cursorwidth = 0, a.setScrollLeft(0), a.railh && (a.railh.scrollable = !1)) : (a.page.maxw -= a.opt.railpadding.left + a.opt.railpadding.right, a.railh && (a.railh.scrollable = a.opt.horizrailenabled));
            a.railslocked = a.locked || 0 == a.page.maxh && 0 == a.page.maxw;
            if (a.railslocked) return a.ispage || a.updateScrollBar(a.view), !1;
            a.hidden ||
            a.visibility ? !a.railh || a.hidden || a.railh.visibility || a.showRailHr() : a.showRail().showRailHr();
            a.istextarea && a.win.css("resize") && "none" != a.win.css("resize") && (a.view.h -= 20);
            a.cursorheight = Math.min(a.view.h, Math.round(a.view.h / a.page.h * a.view.h));
            a.cursorheight = a.opt.cursorfixedheight ? a.opt.cursorfixedheight : Math.max(a.opt.cursorminheight, a.cursorheight);
            a.cursorwidth = Math.min(a.view.w, Math.round(a.view.w / a.page.w * a.view.w));
            a.cursorwidth = a.opt.cursorfixedheight ? a.opt.cursorfixedheight : Math.max(a.opt.cursorminheight,
                a.cursorwidth);
            a.scrollvaluemax = a.view.h - a.cursorheight - a.cursor.hborder - (a.opt.railpadding.top + a.opt.railpadding.bottom);
            a.railh && (a.railh.width = 0 < a.page.maxh ? a.view.w - a.rail.width : a.view.w, a.scrollvaluemaxw = a.railh.width - a.cursorwidth - a.cursorh.wborder - (a.opt.railpadding.left + a.opt.railpadding.right));
            a.ispage || a.updateScrollBar(a.view);
            a.scrollratio = {x: a.page.maxw / a.scrollvaluemaxw, y: a.page.maxh / a.scrollvaluemax};
            a.getScrollTop() > a.page.maxh ? a.doScrollTop(a.page.maxh) : (a.scroll.y = Math.round(a.getScrollTop() *
                (1 / a.scrollratio.y)), a.scroll.x = Math.round(a.getScrollLeft() * (1 / a.scrollratio.x)), a.cursoractive && a.noticeCursor());
            a.scroll.y && 0 == a.getScrollTop() && a.doScrollTo(Math.floor(a.scroll.y * a.scrollratio.y));
            return a
        };
        this.resize = a.onResize;
        this.hlazyresize = 0;
        this.lazyResize = function (b) {
            a.haswrapper || a.hide();
            a.hlazyresize && clearTimeout(a.hlazyresize);
            a.hlazyresize = setTimeout(function () {
                a && a.show().resize()
            }, 240);
            return a
        };
        this.jqbind = function (b, c, d) {
            a.events.push({e: b, n: c, f: d, q: !0});
            f(b).bind(c, d)
        };
        this.mousewheel =
            function (b, c, d) {
                b = "jquery" in b ? b[0] : b;
                if ("onwheel" in document.createElement("div")) a._bind(b, "wheel", c, d || !1); else {
                    var e = void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll";
                    q(b, e, c, d || !1);
                    "DOMMouseScroll" == e && q(b, "MozMousePixelScroll", c, d || !1)
                }
            };
        e.haseventlistener ? (this.bind = function (b, c, d, e) {
            a._bind("jquery" in b ? b[0] : b, c, d, e || !1)
        }, this._bind = function (b, c, d, e) {
            a.events.push({e: b, n: c, f: d, b: e, q: !1});
            b.addEventListener(c, d, e || !1)
        }, this.cancelEvent = function (a) {
            if (!a) return !1;
            a = a.original ? a.original :
                a;
            a.cancelable && a.preventDefault();
            a.stopPropagation();
            a.preventManipulation && a.preventManipulation();
            return !1
        }, this.stopPropagation = function (a) {
            if (!a) return !1;
            a = a.original ? a.original : a;
            a.stopPropagation();
            return !1
        }, this._unbind = function (a, c, d, e) {
            a.removeEventListener(c, d, e)
        }) : (this.bind = function (b, c, d, e) {
            var f = "jquery" in b ? b[0] : b;
            a._bind(f, c, function (b) {
                (b = b || window.event || !1) && b.srcElement && (b.target = b.srcElement);
                "pageY" in b || (b.pageX = b.clientX + document.documentElement.scrollLeft, b.pageY = b.clientY +
                    document.documentElement.scrollTop);
                return !1 === d.call(f, b) || !1 === e ? a.cancelEvent(b) : !0
            })
        }, this._bind = function (b, c, d, e) {
            a.events.push({e: b, n: c, f: d, b: e, q: !1});
            b.attachEvent ? b.attachEvent("on" + c, d) : b["on" + c] = d
        }, this.cancelEvent = function (a) {
            a = window.event || !1;
            if (!a) return !1;
            a.cancelBubble = !0;
            a.cancel = !0;
            return a.returnValue = !1
        }, this.stopPropagation = function (a) {
            a = window.event || !1;
            if (!a) return !1;
            a.cancelBubble = !0;
            return !1
        }, this._unbind = function (a, c, d, e) {
            a.detachEvent ? a.detachEvent("on" + c, d) : a["on" + c] = !1
        });
        this.unbindAll = function () {
            for (var b = 0; b < a.events.length; b++) {
                var c = a.events[b];
                c.q ? c.e.unbind(c.n, c.f) : a._unbind(c.e, c.n, c.f, c.b)
            }
        };
        this.showRail = function () {
            0 == a.page.maxh || !a.ispage && "none" == a.win.css("display") || (a.visibility = !0, a.rail.visibility = !0, a.rail.css("display", "block"));
            return a
        };
        this.showRailHr = function () {
            if (!a.railh) return a;
            0 == a.page.maxw || !a.ispage && "none" == a.win.css("display") || (a.railh.visibility = !0, a.railh.css("display", "block"));
            return a
        };
        this.hideRail = function () {
            a.visibility =
                !1;
            a.rail.visibility = !1;
            a.rail.css("display", "none");
            return a
        };
        this.hideRailHr = function () {
            if (!a.railh) return a;
            a.railh.visibility = !1;
            a.railh.css("display", "none");
            return a
        };
        this.show = function () {
            a.hidden = !1;
            a.railslocked = !1;
            return a.showRail().showRailHr()
        };
        this.hide = function () {
            a.hidden = !0;
            a.railslocked = !0;
            return a.hideRail().hideRailHr()
        };
        this.toggle = function () {
            return a.hidden ? a.show() : a.hide()
        };
        this.remove = function () {
            a.stop();
            a.cursortimeout && clearTimeout(a.cursortimeout);
            for (var b in a.delaylist) a.delaylist[b] &&
            w(a.delaylist[b].h);
            a.doZoomOut();
            a.unbindAll();
            e.isie9 && a.win[0].detachEvent("onpropertychange", a.onAttributeChange);
            !1 !== a.observer && a.observer.disconnect();
            !1 !== a.observerremover && a.observerremover.disconnect();
            !1 !== a.observerbody && a.observerbody.disconnect();
            a.events = null;
            a.cursor && a.cursor.remove();
            a.cursorh && a.cursorh.remove();
            a.rail && a.rail.remove();
            a.railh && a.railh.remove();
            a.zoom && a.zoom.remove();
            for (b = 0; b < a.saved.css.length; b++) {
                var c = a.saved.css[b];
                c[0].css(c[1], void 0 === c[2] ? "" : c[2])
            }
            a.saved =
                !1;
            a.me.data("__nicescroll", "");
            var d = f.nicescroll;
            d.each(function (b) {
                if (this && this.id === a.id) {
                    delete d[b];
                    for (var c = ++b; c < d.length; c++, b++) d[b] = d[c];
                    d.length--;
                    d.length && delete d[d.length]
                }
            });
            for (var k in a) a[k] = null, delete a[k];
            a = null
        };
        this.scrollstart = function (b) {
            this.onscrollstart = b;
            return a
        };
        this.scrollend = function (b) {
            this.onscrollend = b;
            return a
        };
        this.scrollcancel = function (b) {
            this.onscrollcancel = b;
            return a
        };
        this.zoomin = function (b) {
            this.onzoomin = b;
            return a
        };
        this.zoomout = function (b) {
            this.onzoomout =
                b;
            return a
        };
        this.isScrollable = function (a) {
            a = a.target ? a.target : a;
            if ("OPTION" == a.nodeName) return !0;
            for (; a && 1 == a.nodeType && !/^BODY|HTML/.test(a.nodeName);) {
                var c = f(a), c = c.css("overflowY") || c.css("overflowX") || c.css("overflow") || "";
                if (/scroll|auto/.test(c)) return a.clientHeight != a.scrollHeight;
                a = a.parentNode ? a.parentNode : !1
            }
            return !1
        };
        this.getViewport = function (a) {
            for (a = a && a.parentNode ? a.parentNode : !1; a && 1 == a.nodeType && !/^BODY|HTML/.test(a.nodeName);) {
                var c = f(a);
                if (/fixed|absolute/.test(c.css("position"))) return c;
                var d = c.css("overflowY") || c.css("overflowX") || c.css("overflow") || "";
                if (/scroll|auto/.test(d) && a.clientHeight != a.scrollHeight || 0 < c.getNiceScroll().length) return c;
                a = a.parentNode ? a.parentNode : !1
            }
            return !1
        };
        this.triggerScrollEnd = function () {
            if (a.onscrollend) {
                var b = a.getScrollLeft(), c = a.getScrollTop();
                a.onscrollend.call(a, {type: "scrollend", current: {x: b, y: c}, end: {x: b, y: c}})
            }
        };
        this.onmousewheel = function (b) {
            if (!a.wheelprevented) {
                if (a.railslocked) return a.debounced("checkunlock", a.resize, 250), !0;
                if (a.rail.drag) return a.cancelEvent(b);
                "auto" == a.opt.oneaxismousemode && 0 != b.deltaX && (a.opt.oneaxismousemode = !1);
                if (a.opt.oneaxismousemode && 0 == b.deltaX && !a.rail.scrollable) return a.railh && a.railh.scrollable ? a.onmousewheelhr(b) : !0;
                var c = +new Date, d = !1;
                a.opt.preservenativescrolling && a.checkarea + 600 < c && (a.nativescrollingarea = a.isScrollable(b), d = !0);
                a.checkarea = c;
                if (a.nativescrollingarea) return !0;
                if (b = t(b, !1, d)) a.checkarea = 0;
                return b
            }
        };
        this.onmousewheelhr = function (b) {
            if (!a.wheelprevented) {
                if (a.railslocked || !a.railh.scrollable) return !0;
                if (a.rail.drag) return a.cancelEvent(b);
                var c = +new Date, d = !1;
                a.opt.preservenativescrolling && a.checkarea + 600 < c && (a.nativescrollingarea = a.isScrollable(b), d = !0);
                a.checkarea = c;
                return a.nativescrollingarea ? !0 : a.railslocked ? a.cancelEvent(b) : t(b, !0, d)
            }
        };
        this.stop = function () {
            a.cancelScroll();
            a.scrollmon && a.scrollmon.stop();
            a.cursorfreezed = !1;
            a.scroll.y = Math.round(a.getScrollTop() * (1 / a.scrollratio.y));
            a.noticeCursor();
            return a
        };
        this.getTransitionSpeed = function (b) {
            b = Math.min(Math.round(10 * a.opt.scrollspeed), Math.round(b / 20 * a.opt.scrollspeed));
            return 20 <
            b ? b : 0
        };
        a.opt.smoothscroll ? a.ishwscroll && e.hastransition && a.opt.usetransition && a.opt.smoothscroll ? (this.prepareTransition = function (b, c) {
            var d = c ? 20 < b ? b : 0 : a.getTransitionSpeed(b),
                f = d ? e.prefixstyle + "transform " + d + "ms ease-out" : "";
            a.lasttransitionstyle && a.lasttransitionstyle == f || (a.lasttransitionstyle = f, a.doc.css(e.transitionstyle, f));
            return d
        }, this.doScrollLeft = function (b, c) {
            var d = a.scrollrunning ? a.newscrolly : a.getScrollTop();
            a.doScrollPos(b, d, c)
        }, this.doScrollTop = function (b, c) {
            var d = a.scrollrunning ?
                a.newscrollx : a.getScrollLeft();
            a.doScrollPos(d, b, c)
        }, this.doScrollPos = function (b, c, d) {
            var f = a.getScrollTop(), k = a.getScrollLeft();
            (0 > (a.newscrolly - f) * (c - f) || 0 > (a.newscrollx - k) * (b - k)) && a.cancelScroll();
            0 == a.opt.bouncescroll && (0 > c ? c = 0 : c > a.page.maxh && (c = a.page.maxh), 0 > b ? b = 0 : b > a.page.maxw && (b = a.page.maxw));
            if (a.scrollrunning && b == a.newscrollx && c == a.newscrolly) return !1;
            a.newscrolly = c;
            a.newscrollx = b;
            a.newscrollspeed = d || !1;
            if (a.timer) return !1;
            a.timer = setTimeout(function () {
                var d = a.getScrollTop(), f = a.getScrollLeft(),
                    k = Math.round(Math.sqrt(Math.pow(b - f, 2) + Math.pow(c - d, 2))),
                    k = a.newscrollspeed && 1 < a.newscrollspeed ? a.newscrollspeed : a.getTransitionSpeed(k);
                a.newscrollspeed && 1 >= a.newscrollspeed && (k *= a.newscrollspeed);
                a.prepareTransition(k, !0);
                a.timerscroll && a.timerscroll.tm && clearInterval(a.timerscroll.tm);
                0 < k && (!a.scrollrunning && a.onscrollstart && a.onscrollstart.call(a, {
                    type: "scrollstart",
                    current: {x: f, y: d},
                    request: {x: b, y: c},
                    end: {x: a.newscrollx, y: a.newscrolly},
                    speed: k
                }), e.transitionend ? a.scrollendtrapped || (a.scrollendtrapped =
                    !0, a.bind(a.doc, e.transitionend, a.onScrollTransitionEnd, !1)) : (a.scrollendtrapped && clearTimeout(a.scrollendtrapped), a.scrollendtrapped = setTimeout(a.onScrollTransitionEnd, k)), a.timerscroll = {
                    bz: new D(d, a.newscrolly, k, 0, 0, .58, 1),
                    bh: new D(f, a.newscrollx, k, 0, 0, .58, 1)
                }, a.cursorfreezed || (a.timerscroll.tm = setInterval(function () {
                    a.showCursor(a.getScrollTop(), a.getScrollLeft())
                }, 60)));
                a.synched("doScroll-set", function () {
                    a.timer = 0;
                    a.scrollendtrapped && (a.scrollrunning = !0);
                    a.setScrollTop(a.newscrolly);
                    a.setScrollLeft(a.newscrollx);
                    if (!a.scrollendtrapped) a.onScrollTransitionEnd()
                })
            }, 50)
        }, this.cancelScroll = function () {
            if (!a.scrollendtrapped) return !0;
            var b = a.getScrollTop(), c = a.getScrollLeft();
            a.scrollrunning = !1;
            e.transitionend || clearTimeout(e.transitionend);
            a.scrollendtrapped = !1;
            a._unbind(a.doc[0], e.transitionend, a.onScrollTransitionEnd);
            a.prepareTransition(0);
            a.setScrollTop(b);
            a.railh && a.setScrollLeft(c);
            a.timerscroll && a.timerscroll.tm && clearInterval(a.timerscroll.tm);
            a.timerscroll = !1;
            a.cursorfreezed = !1;
            a.showCursor(b, c);
            return a
        },
            this.onScrollTransitionEnd = function () {
                a.scrollendtrapped && a._unbind(a.doc[0], e.transitionend, a.onScrollTransitionEnd);
                a.scrollendtrapped = !1;
                a.prepareTransition(0);
                a.timerscroll && a.timerscroll.tm && clearInterval(a.timerscroll.tm);
                a.timerscroll = !1;
                var b = a.getScrollTop(), c = a.getScrollLeft();
                a.setScrollTop(b);
                a.railh && a.setScrollLeft(c);
                a.noticeCursor(!1, b, c);
                a.cursorfreezed = !1;
                0 > b ? b = 0 : b > a.page.maxh && (b = a.page.maxh);
                0 > c ? c = 0 : c > a.page.maxw && (c = a.page.maxw);
                if (b != a.newscrolly || c != a.newscrollx) return a.doScrollPos(c,
                    b, a.opt.snapbackspeed);
                a.onscrollend && a.scrollrunning && a.triggerScrollEnd();
                a.scrollrunning = !1
            }) : (this.doScrollLeft = function (b, c) {
            var d = a.scrollrunning ? a.newscrolly : a.getScrollTop();
            a.doScrollPos(b, d, c)
        }, this.doScrollTop = function (b, c) {
            var d = a.scrollrunning ? a.newscrollx : a.getScrollLeft();
            a.doScrollPos(d, b, c)
        }, this.doScrollPos = function (b, c, d) {
            function e() {
                if (a.cancelAnimationFrame) return !0;
                a.scrollrunning = !0;
                if (p = 1 - p) return a.timer = v(e) || 1;
                var b = 0, c, d, f = d = a.getScrollTop();
                if (a.dst.ay) {
                    f = a.bzscroll ?
                        a.dst.py + a.bzscroll.getNow() * a.dst.ay : a.newscrolly;
                    c = f - d;
                    if (0 > c && f < a.newscrolly || 0 < c && f > a.newscrolly) f = a.newscrolly;
                    a.setScrollTop(f);
                    f == a.newscrolly && (b = 1)
                } else b = 1;
                d = c = a.getScrollLeft();
                if (a.dst.ax) {
                    d = a.bzscroll ? a.dst.px + a.bzscroll.getNow() * a.dst.ax : a.newscrollx;
                    c = d - c;
                    if (0 > c && d < a.newscrollx || 0 < c && d > a.newscrollx) d = a.newscrollx;
                    a.setScrollLeft(d);
                    d == a.newscrollx && (b += 1)
                } else b += 1;
                2 == b ? (a.timer = 0, a.cursorfreezed = !1, a.bzscroll = !1, a.scrollrunning = !1, 0 > f ? f = 0 : f > a.page.maxh && (f = Math.max(0, a.page.maxh)),
                    0 > d ? d = 0 : d > a.page.maxw && (d = a.page.maxw), d != a.newscrollx || f != a.newscrolly ? a.doScrollPos(d, f) : a.onscrollend && a.triggerScrollEnd()) : a.timer = v(e) || 1
            }

            c = void 0 === c || !1 === c ? a.getScrollTop(!0) : c;
            if (a.timer && a.newscrolly == c && a.newscrollx == b) return !0;
            a.timer && w(a.timer);
            a.timer = 0;
            var f = a.getScrollTop(), k = a.getScrollLeft();
            (0 > (a.newscrolly - f) * (c - f) || 0 > (a.newscrollx - k) * (b - k)) && a.cancelScroll();
            a.newscrolly = c;
            a.newscrollx = b;
            a.bouncescroll && a.rail.visibility || (0 > a.newscrolly ? a.newscrolly = 0 : a.newscrolly > a.page.maxh &&
                (a.newscrolly = a.page.maxh));
            a.bouncescroll && a.railh.visibility || (0 > a.newscrollx ? a.newscrollx = 0 : a.newscrollx > a.page.maxw && (a.newscrollx = a.page.maxw));
            a.dst = {};
            a.dst.x = b - k;
            a.dst.y = c - f;
            a.dst.px = k;
            a.dst.py = f;
            var h = Math.round(Math.sqrt(Math.pow(a.dst.x, 2) + Math.pow(a.dst.y, 2)));
            a.dst.ax = a.dst.x / h;
            a.dst.ay = a.dst.y / h;
            var l = 0, n = h;
            0 == a.dst.x ? (l = f, n = c, a.dst.ay = 1, a.dst.py = 0) : 0 == a.dst.y && (l = k, n = b, a.dst.ax = 1, a.dst.px = 0);
            h = a.getTransitionSpeed(h);
            d && 1 >= d && (h *= d);
            a.bzscroll = 0 < h ? a.bzscroll ? a.bzscroll.update(n, h) :
                new D(l, n, h, 0, 1, 0, 1) : !1;
            if (!a.timer) {
                (f == a.page.maxh && c >= a.page.maxh || k == a.page.maxw && b >= a.page.maxw) && a.checkContentSize();
                var p = 1;
                a.cancelAnimationFrame = !1;
                a.timer = 1;
                a.onscrollstart && !a.scrollrunning && a.onscrollstart.call(a, {
                    type: "scrollstart",
                    current: {x: k, y: f},
                    request: {x: b, y: c},
                    end: {x: a.newscrollx, y: a.newscrolly},
                    speed: h
                });
                e();
                (f == a.page.maxh && c >= f || k == a.page.maxw && b >= k) && a.checkContentSize();
                a.noticeCursor()
            }
        }, this.cancelScroll = function () {
            a.timer && w(a.timer);
            a.timer = 0;
            a.bzscroll = !1;
            a.scrollrunning =
                !1;
            return a
        }) : (this.doScrollLeft = function (b, c) {
            var d = a.getScrollTop();
            a.doScrollPos(b, d, c)
        }, this.doScrollTop = function (b, c) {
            var d = a.getScrollLeft();
            a.doScrollPos(d, b, c)
        }, this.doScrollPos = function (b, c, d) {
            var e = b > a.page.maxw ? a.page.maxw : b;
            0 > e && (e = 0);
            var f = c > a.page.maxh ? a.page.maxh : c;
            0 > f && (f = 0);
            a.synched("scroll", function () {
                a.setScrollTop(f);
                a.setScrollLeft(e)
            })
        }, this.cancelScroll = function () {
        });
        this.doScrollBy = function (b, c) {
            var d = 0, d = c ? Math.floor((a.scroll.y - b) * a.scrollratio.y) : (a.timer ? a.newscrolly :
                a.getScrollTop(!0)) - b;
            if (a.bouncescroll) {
                var e = Math.round(a.view.h / 2);
                d < -e ? d = -e : d > a.page.maxh + e && (d = a.page.maxh + e)
            }
            a.cursorfreezed = !1;
            e = a.getScrollTop(!0);
            if (0 > d && 0 >= e) return a.noticeCursor();
            if (d > a.page.maxh && e >= a.page.maxh) return a.checkContentSize(), a.noticeCursor();
            a.doScrollTop(d)
        };
        this.doScrollLeftBy = function (b, c) {
            var d = 0,
                d = c ? Math.floor((a.scroll.x - b) * a.scrollratio.x) : (a.timer ? a.newscrollx : a.getScrollLeft(!0)) - b;
            if (a.bouncescroll) {
                var e = Math.round(a.view.w / 2);
                d < -e ? d = -e : d > a.page.maxw + e && (d = a.page.maxw +
                    e)
            }
            a.cursorfreezed = !1;
            e = a.getScrollLeft(!0);
            if (0 > d && 0 >= e || d > a.page.maxw && e >= a.page.maxw) return a.noticeCursor();
            a.doScrollLeft(d)
        };
        this.doScrollTo = function (b, c) {
            a.cursorfreezed = !1;
            a.doScrollTop(b)
        };
        this.checkContentSize = function () {
            var b = a.getContentSize();
            b.h == a.page.h && b.w == a.page.w || a.resize(!1, b)
        };
        a.onscroll = function (b) {
            a.rail.drag || a.cursorfreezed || a.synched("scroll", function () {
                a.scroll.y = Math.round(a.getScrollTop() * (1 / a.scrollratio.y));
                a.railh && (a.scroll.x = Math.round(a.getScrollLeft() * (1 / a.scrollratio.x)));
                a.noticeCursor()
            })
        };
        a.bind(a.docscroll, "scroll", a.onscroll);
        this.doZoomIn = function (b) {
            if (!a.zoomactive) {
                a.zoomactive = !0;
                a.zoomrestore = {style: {}};
                var c = "position top left zIndex backgroundColor marginTop marginBottom marginLeft marginRight".split(" "),
                    d = a.win[0].style, k;
                for (k in c) {
                    var h = c[k];
                    a.zoomrestore.style[h] = void 0 !== d[h] ? d[h] : ""
                }
                a.zoomrestore.style.width = a.win.css("width");
                a.zoomrestore.style.height = a.win.css("height");
                a.zoomrestore.padding = {
                    w: a.win.outerWidth() - a.win.width(), h: a.win.outerHeight() -
                        a.win.height()
                };
                e.isios4 && (a.zoomrestore.scrollTop = f(window).scrollTop(), f(window).scrollTop(0));
                a.win.css({position: e.isios4 ? "absolute" : "fixed", top: 0, left: 0, zIndex: A + 100, margin: 0});
                c = a.win.css("backgroundColor");
                ("" == c || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(c)) && a.win.css("backgroundColor", "#fff");
                a.rail.css({zIndex: A + 101});
                a.zoom.css({zIndex: A + 102});
                a.zoom.css("backgroundPosition", "0px -18px");
                a.resizeZoom();
                a.onzoomin && a.onzoomin.call(a);
                return a.cancelEvent(b)
            }
        };
        this.doZoomOut =
            function (b) {
                if (a.zoomactive) return a.zoomactive = !1, a.win.css("margin", ""), a.win.css(a.zoomrestore.style), e.isios4 && f(window).scrollTop(a.zoomrestore.scrollTop), a.rail.css({"z-index": a.zindex}), a.zoom.css({"z-index": a.zindex}), a.zoomrestore = !1, a.zoom.css("backgroundPosition", "0px 0px"), a.onResize(), a.onzoomout && a.onzoomout.call(a), a.cancelEvent(b)
            };
        this.doZoom = function (b) {
            return a.zoomactive ? a.doZoomOut(b) : a.doZoomIn(b)
        };
        this.resizeZoom = function () {
            if (a.zoomactive) {
                var b = a.getScrollTop();
                a.win.css({
                    width: f(window).width() -
                        a.zoomrestore.padding.w + "px", height: f(window).height() - a.zoomrestore.padding.h + "px"
                });
                a.onResize();
                a.setScrollTop(Math.min(a.page.maxh, b))
            }
        };
        this.init();
        f.nicescroll.push(this)
    }, M = function (f) {
        var c = this;
        this.nc = f;
        this.steptime = this.lasttime = this.speedy = this.speedx = this.lasty = this.lastx = 0;
        this.snapy = this.snapx = !1;
        this.demuly = this.demulx = 0;
        this.lastscrolly = this.lastscrollx = -1;
        this.timer = this.chky = this.chkx = 0;
        this.time = function () {
            return +new Date
        };
        this.reset = function (f, h) {
            c.stop();
            var d = c.time();
            c.steptime =
                0;
            c.lasttime = d;
            c.speedx = 0;
            c.speedy = 0;
            c.lastx = f;
            c.lasty = h;
            c.lastscrollx = -1;
            c.lastscrolly = -1
        };
        this.update = function (f, h) {
            var d = c.time();
            c.steptime = d - c.lasttime;
            c.lasttime = d;
            var d = h - c.lasty, q = f - c.lastx, t = c.nc.getScrollTop(), a = c.nc.getScrollLeft(), t = t + d,
                a = a + q;
            c.snapx = 0 > a || a > c.nc.page.maxw;
            c.snapy = 0 > t || t > c.nc.page.maxh;
            c.speedx = q;
            c.speedy = d;
            c.lastx = f;
            c.lasty = h
        };
        this.stop = function () {
            c.nc.unsynched("domomentum2d");
            c.timer && clearTimeout(c.timer);
            c.timer = 0;
            c.lastscrollx = -1;
            c.lastscrolly = -1
        };
        this.doSnapy = function (f,
                                 h) {
            var d = !1;
            0 > h ? (h = 0, d = !0) : h > c.nc.page.maxh && (h = c.nc.page.maxh, d = !0);
            0 > f ? (f = 0, d = !0) : f > c.nc.page.maxw && (f = c.nc.page.maxw, d = !0);
            d ? c.nc.doScrollPos(f, h, c.nc.opt.snapbackspeed) : c.nc.triggerScrollEnd()
        };
        this.doMomentum = function (f) {
            var h = c.time(), d = f ? h + f : c.lasttime;
            f = c.nc.getScrollLeft();
            var q = c.nc.getScrollTop(), t = c.nc.page.maxh, a = c.nc.page.maxw;
            c.speedx = 0 < a ? Math.min(60, c.speedx) : 0;
            c.speedy = 0 < t ? Math.min(60, c.speedy) : 0;
            d = d && 60 >= h - d;
            if (0 > q || q > t || 0 > f || f > a) d = !1;
            f = c.speedx && d ? c.speedx : !1;
            if (c.speedy && d && c.speedy ||
                f) {
                var r = Math.max(16, c.steptime);
                50 < r && (f = r / 50, c.speedx *= f, c.speedy *= f, r = 50);
                c.demulxy = 0;
                c.lastscrollx = c.nc.getScrollLeft();
                c.chkx = c.lastscrollx;
                c.lastscrolly = c.nc.getScrollTop();
                c.chky = c.lastscrolly;
                var p = c.lastscrollx, e = c.lastscrolly, v = function () {
                    var d = 600 < c.time() - h ? .04 : .02;
                    c.speedx && (p = Math.floor(c.lastscrollx - c.speedx * (1 - c.demulxy)), c.lastscrollx = p, 0 > p || p > a) && (d = .1);
                    c.speedy && (e = Math.floor(c.lastscrolly - c.speedy * (1 - c.demulxy)), c.lastscrolly = e, 0 > e || e > t) && (d = .1);
                    c.demulxy = Math.min(1, c.demulxy +
                        d);
                    c.nc.synched("domomentum2d", function () {
                        c.speedx && (c.nc.getScrollLeft(), c.chkx = p, c.nc.setScrollLeft(p));
                        c.speedy && (c.nc.getScrollTop(), c.chky = e, c.nc.setScrollTop(e));
                        c.timer || (c.nc.hideCursor(), c.doSnapy(p, e))
                    });
                    1 > c.demulxy ? c.timer = setTimeout(v, r) : (c.stop(), c.nc.hideCursor(), c.doSnapy(p, e))
                };
                v()
            } else c.doSnapy(c.nc.getScrollLeft(), c.nc.getScrollTop())
        }
    }, y = f.fn.scrollTop;
    f.cssHooks.pageYOffset = {
        get: function (h, c, k) {
            return (c = f.data(h, "__nicescroll") || !1) && c.ishwscroll ? c.getScrollTop() : y.call(h)
        }, set: function (h,
                          c) {
            var k = f.data(h, "__nicescroll") || !1;
            k && k.ishwscroll ? k.setScrollTop(parseInt(c)) : y.call(h, c);
            return this
        }
    };
    f.fn.scrollTop = function (h) {
        if (void 0 === h) {
            var c = this[0] ? f.data(this[0], "__nicescroll") || !1 : !1;
            return c && c.ishwscroll ? c.getScrollTop() : y.call(this)
        }
        return this.each(function () {
            var c = f.data(this, "__nicescroll") || !1;
            c && c.ishwscroll ? c.setScrollTop(parseInt(h)) : y.call(f(this), h)
        })
    };
    var z = f.fn.scrollLeft;
    f.cssHooks.pageXOffset = {
        get: function (h, c, k) {
            return (c = f.data(h, "__nicescroll") || !1) && c.ishwscroll ?
                c.getScrollLeft() : z.call(h)
        }, set: function (h, c) {
            var k = f.data(h, "__nicescroll") || !1;
            k && k.ishwscroll ? k.setScrollLeft(parseInt(c)) : z.call(h, c);
            return this
        }
    };
    f.fn.scrollLeft = function (h) {
        if (void 0 === h) {
            var c = this[0] ? f.data(this[0], "__nicescroll") || !1 : !1;
            return c && c.ishwscroll ? c.getScrollLeft() : z.call(this)
        }
        return this.each(function () {
            var c = f.data(this, "__nicescroll") || !1;
            c && c.ishwscroll ? c.setScrollLeft(parseInt(h)) : z.call(f(this), h)
        })
    };
    var E = function (h) {
        var c = this;
        this.length = 0;
        this.name = "nicescrollarray";
        this.each = function (d) {
            f.each(c, d);
            return c
        };
        this.push = function (d) {
            c[c.length] = d;
            c.length++
        };
        this.eq = function (d) {
            return c[d]
        };
        if (h) for (var k = 0; k < h.length; k++) {
            var l = f.data(h[k], "__nicescroll") || !1;
            l && (this[this.length] = l, this.length++)
        }
        return this
    };
    (function (f, c, k) {
        for (var l = 0; l < c.length; l++) k(f, c[l])
    })(E.prototype, "show hide toggle onResize resize remove stop doScrollPos".split(" "), function (f, c) {
        f[c] = function () {
            var f = arguments;
            return this.each(function () {
                this[c].apply(this, f)
            })
        }
    });
    f.fn.getNiceScroll =
        function (h) {
            return void 0 === h ? new E(this) : this[h] && f.data(this[h], "__nicescroll") || !1
        };
    f.expr[":"].nicescroll = function (h) {
        return void 0 !== f.data(h, "__nicescroll")
    };
    f.fn.niceScroll = function (h, c) {
        void 0 !== c || "object" != typeof h || "jquery" in h || (c = h, h = !1);
        c = f.extend({}, c);
        var k = new E;
        void 0 === c && (c = {});
        h && (c.doc = f(h), c.win = f(this));
        var l = !("doc" in c);
        l || "win" in c || (c.win = f(this));
        this.each(function () {
            var d = f(this).data("__nicescroll") || !1;
            d || (c.doc = l ? f(this) : c.doc, d = new S(c, f(this)), f(this).data("__nicescroll",
                d));
            k.push(d)
        });
        return 1 == k.length ? k[0] : k
    };
    window.NiceScroll = {
        getjQuery: function () {
            return f
        }
    };
    f.nicescroll || (f.nicescroll = new E, f.nicescroll.options = K)
});


/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
!function (a, b, c, d) {
    function e(b, c) {
        this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {start: null, current: null},
            direction: null
        }, this._states = {
            current: {},
            tags: {initializing: ["busy"], animating: ["busy"], dragging: ["interacting"]}
        }, a.each(["onResize", "onThrottledResize"], a.proxy(function (b, c) {
            this._handlers[c] = a.proxy(this[c], this)
        }, this)), a.each(e.Plugins, a.proxy(function (a, b) {
            this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this)
        }, this)), a.each(e.Workers, a.proxy(function (b, c) {
            this._pipe.push({filter: c.filter, run: a.proxy(c.run, this)})
        }, this)), this.setup(), this.initialize()
    }

    e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        checkVisibility: !0,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        fallbackEasing: "swing",
        slideTransition: "",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    }, e.Width = {Default: "default", Inner: "inner", Outer: "outer"}, e.Type = {
        Event: "event",
        State: "state"
    }, e.Plugins = {}, e.Workers = [{
        filter: ["width", "settings"], run: function () {
            this._width = this.$element.width()
        }
    }, {
        filter: ["width", "items", "settings"], run: function (a) {
            a.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"], run: function () {
            this.$stage.children(".cloned").remove()
        }
    }, {
        filter: ["width", "items", "settings"], run: function (a) {
            var b = this.settings.margin || "", c = !this.settings.autoWidth, d = this.settings.rtl,
                e = {width: "auto", "margin-left": d ? b : "", "margin-right": d ? "" : b};
            !c && this.$stage.children().css(e), a.css = e
        }
    }, {
        filter: ["width", "items", "settings"], run: function (a) {
            var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin, c = null,
                d = this._items.length, e = !this.settings.autoWidth, f = [];
            for (a.items = {
                merge: !1,
                width: b
            }; d--;) c = this._mergers[d], c = this.settings.mergeFit && Math.min(c, this.settings.items) || c, a.items.merge = c > 1 || a.items.merge, f[d] = e ? b * c : this._items[d].width();
            this._widths = f
        }
    }, {
        filter: ["items", "settings"], run: function () {
            var b = [], c = this._items, d = this.settings, e = Math.max(2 * d.items, 4),
                f = 2 * Math.ceil(c.length / 2), g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0, h = "",
                i = "";
            for (g /= 2; g > 0;) b.push(this.normalize(b.length / 2, !0)), h += c[b[b.length - 1]][0].outerHTML, b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)), i = c[b[b.length - 1]][0].outerHTML + i, g -= 1;
            this._clones = b, a(h).addClass("cloned").appendTo(this.$stage), a(i).addClass("cloned").prependTo(this.$stage)
        }
    }, {
        filter: ["width", "items", "settings"], run: function () {
            for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b;) d = f[c - 1] || 0, e = this._widths[this.relative(c)] + this.settings.margin, f.push(d + e * a);
            this._coordinates = f
        }
    }, {
        filter: ["width", "items", "settings"], run: function () {
            var a = this.settings.stagePadding, b = this._coordinates, c = {
                width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
                "padding-left": a || "",
                "padding-right": a || ""
            };
            this.$stage.css(c)
        }
    }, {
        filter: ["width", "items", "settings"], run: function (a) {
            var b = this._coordinates.length, c = !this.settings.autoWidth, d = this.$stage.children();
            if (c && a.items.merge) for (; b--;) a.css.width = this._widths[this.relative(b)], d.eq(b).css(a.css); else c && (a.css.width = a.items.width, d.css(a.css))
        }
    }, {
        filter: ["items"], run: function () {
            this._coordinates.length < 1 && this.$stage.removeAttr("style")
        }
    }, {
        filter: ["width", "items", "settings"], run: function (a) {
            a.current = a.current ? this.$stage.children().index(a.current) : 0, a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)), this.reset(a.current)
        }
    }, {
        filter: ["position"], run: function () {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"], run: function () {
            var a, b, c, d, e = this.settings.rtl ? 1 : -1, f = 2 * this.settings.stagePadding,
                g = this.coordinates(this.current()) + f, h = g + this.width() * e, i = [];
            for (c = 0, d = this._coordinates.length; c < d; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
            this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"), this.$stage.children(".center").removeClass("center"), this.settings.center && this.$stage.children().eq(this.current()).addClass("center")
        }
    }], e.prototype.initializeStage = function () {
        this.$stage = this.$element.find("." + this.settings.stageClass), this.$stage.length || (this.$element.addClass(this.options.loadingClass), this.$stage = a("<" + this.settings.stageElement + ">", {class: this.settings.stageClass}).wrap(a("<div/>", {class: this.settings.stageOuterClass})), this.$element.append(this.$stage.parent()))
    }, e.prototype.initializeItems = function () {
        var b = this.$element.find(".owl-item");
        if (b.length) return this._items = b.get().map(function (b) {
            return a(b)
        }), this._mergers = this._items.map(function () {
            return 1
        }), void this.refresh();
        this.replace(this.$element.children().not(this.$stage.parent())), this.isVisible() ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)
    }, e.prototype.initialize = function () {
        if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
            var a, b, c;
            a = this.$element.find("img"), b = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, c = this.$element.children(b).width(), a.length && c <= 0 && this.preloadAutoWidthImages(a)
        }
        this.initializeStage(), this.initializeItems(), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
    }, e.prototype.isVisible = function () {
        return !this.settings.checkVisibility || this.$element.is(":visible")
    }, e.prototype.setup = function () {
        var b = this.viewport(), c = this.options.responsive, d = -1, e = null;
        c ? (a.each(c, function (a) {
            a <= b && a > d && (d = Number(a))
        }), e = a.extend({}, this.options, c[d]), "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()), delete e.responsive, e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d))) : e = a.extend({}, this.options), this.trigger("change", {
            property: {
                name: "settings",
                value: e
            }
        }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        })
    }, e.prototype.optionsLogic = function () {
        this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, e.prototype.prepare = function (b) {
        var c = this.trigger("prepare", {content: b});
        return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)), this.trigger("prepared", {content: c.data}), c.data
    }, e.prototype.update = function () {
        for (var b = 0, c = this._pipe.length, d = a.proxy(function (a) {
            return this[a]
        }, this._invalidated), e = {}; b < c;) (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
        this._invalidated = {}, !this.is("valid") && this.enter("valid")
    }, e.prototype.width = function (a) {
        switch (a = a || e.Width.Default) {
            case e.Width.Inner:
            case e.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, e.prototype.refresh = function () {
        this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
    }, e.prototype.onThrottledResize = function () {
        b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
    }, e.prototype.onResize = function () {
        return !!this._items.length && (this._width !== this.$element.width() && (!!this.isVisible() && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
    }, e.prototype.registerEventHandlers = function () {
        a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(b, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
            return !1
        })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)))
    }, e.prototype.onDragStart = function (b) {
        var d = null;
        3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), d = {
            x: d[16 === d.length ? 12 : 4],
            y: d[16 === d.length ? 13 : 5]
        }) : (d = this.$stage.position(), d = {
            x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
            y: d.top
        }), this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = a(b.target), this._drag.stage.start = d, this._drag.stage.current = d, this._drag.pointer = this.pointer(b), a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)), a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function (b) {
            var d = this.difference(this._drag.pointer, this.pointer(b));
            a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)), Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(), this.enter("dragging"), this.trigger("drag"))
        }, this)))
    }, e.prototype.onDragMove = function (a) {
        var b = null, c = null, d = null, e = this.difference(this._drag.pointer, this.pointer(a)),
            f = this.difference(this._drag.stage.start, e);
        this.is("dragging") && (a.preventDefault(), this.settings.loop ? (b = this.coordinates(this.minimum()), c = this.coordinates(this.maximum() + 1) - b, f.x = ((f.x - b) % c + c) % c + b) : (b = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), c = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), d = this.settings.pullDrag ? -1 * e.x / 5 : 0, f.x = Math.max(Math.min(f.x, b + d), c + d)), this._drag.stage.current = f, this.animate(f.x))
    }, e.prototype.onDragEnd = function (b) {
        var d = this.difference(this._drag.pointer, this.pointer(b)), e = this._drag.stage.current,
            f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
        a(c).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = f, (Math.abs(d.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function () {
            return !1
        })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
    }, e.prototype.closest = function (b, c) {
        var e = -1, f = 30, g = this.width(), h = this.coordinates();
        return this.settings.freeDrag || a.each(h, a.proxy(function (a, i) {
            return "left" === c && b > i - f && b < i + f ? e = a : "right" === c && b > i - g - f && b < i - g + f ? e = a + 1 : this.op(b, "<", i) && this.op(b, ">", h[a + 1] !== d ? h[a + 1] : i - g) && (e = "left" === c ? a + 1 : a), -1 === e
        }, this)), this.settings.loop || (this.op(b, ">", h[this.minimum()]) ? e = b = this.minimum() : this.op(b, "<", h[this.maximum()]) && (e = b = this.maximum())), e
    }, e.prototype.animate = function (b) {
        var c = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd(), c && (this.enter("animating"), this.trigger("translate")), a.support.transform3d && a.support.transition ? this.$stage.css({
            transform: "translate3d(" + b + "px,0px,0px)",
            transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "")
        }) : c ? this.$stage.animate({left: b + "px"}, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({left: b + "px"})
    }, e.prototype.is = function (a) {
        return this._states.current[a] && this._states.current[a] > 0
    }, e.prototype.current = function (a) {
        if (a === d) return this._current;
        if (0 === this._items.length) return d;
        if (a = this.normalize(a), this._current !== a) {
            var b = this.trigger("change", {property: {name: "position", value: a}});
            b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, e.prototype.invalidate = function (b) {
        return "string" === a.type(b) && (this._invalidated[b] = !0, this.is("valid") && this.leave("valid")), a.map(this._invalidated, function (a, b) {
            return b
        })
    }, e.prototype.reset = function (a) {
        (a = this.normalize(a)) !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
    }, e.prototype.normalize = function (a, b) {
        var c = this._items.length, e = b ? 0 : this._clones.length;
        return !this.isNumeric(a) || c < 1 ? a = d : (a < 0 || a >= c + e) && (a = ((a - e / 2) % c + c) % c + e / 2), a
    }, e.prototype.relative = function (a) {
        return a -= this._clones.length / 2, this.normalize(a, !0)
    }, e.prototype.maximum = function (a) {
        var b, c, d, e = this.settings, f = this._coordinates.length;
        if (e.loop) f = this._clones.length / 2 + this._items.length - 1; else if (e.autoWidth || e.merge) {
            if (b = this._items.length) for (c = this._items[--b].width(), d = this.$element.width(); b-- && !((c += this._items[b].width() + this.settings.margin) > d);) ;
            f = b + 1
        } else f = e.center ? this._items.length - 1 : this._items.length - e.items;
        return a && (f -= this._clones.length / 2), Math.max(f, 0)
    }, e.prototype.minimum = function (a) {
        return a ? 0 : this._clones.length / 2
    }, e.prototype.items = function (a) {
        return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
    }, e.prototype.mergers = function (a) {
        return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
    }, e.prototype.clones = function (b) {
        var c = this._clones.length / 2, e = c + this._items.length, f = function (a) {
            return a % 2 == 0 ? e + a / 2 : c - (a + 1) / 2
        };
        return b === d ? a.map(this._clones, function (a, b) {
            return f(b)
        }) : a.map(this._clones, function (a, c) {
            return a === b ? f(c) : null
        })
    }, e.prototype.speed = function (a) {
        return a !== d && (this._speed = a), this._speed
    }, e.prototype.coordinates = function (b) {
        var c, e = 1, f = b - 1;
        return b === d ? a.map(this._coordinates, a.proxy(function (a, b) {
            return this.coordinates(b)
        }, this)) : (this.settings.center ? (this.settings.rtl && (e = -1, f = b + 1), c = this._coordinates[b], c += (this.width() - c + (this._coordinates[f] || 0)) / 2 * e) : c = this._coordinates[f] || 0, c = Math.ceil(c))
    }, e.prototype.duration = function (a, b, c) {
        return 0 === c ? 0 : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
    }, e.prototype.to = function (a, b) {
        var c = this.current(), d = null, e = a - this.relative(c), f = (e > 0) - (e < 0), g = this._items.length,
            h = this.minimum(), i = this.maximum();
        this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += -1 * f * g), a = c + e, (d = ((a - h) % g + g) % g + h) !== a && d - e <= i && d - e > 0 && (c = d - e, a = d, this.reset(c))) : this.settings.rewind ? (i += 1, a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)), this.speed(this.duration(c, a, b)), this.current(a), this.isVisible() && this.update()
    }, e.prototype.next = function (a) {
        a = a || !1, this.to(this.relative(this.current()) + 1, a)
    }, e.prototype.prev = function (a) {
        a = a || !1, this.to(this.relative(this.current()) - 1, a)
    }, e.prototype.onTransitionEnd = function (a) {
        if (a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))) return !1;
        this.leave("animating"), this.trigger("translated")
    }, e.prototype.viewport = function () {
        var d;
        return this.options.responsiveBaseElement !== b ? d = a(this.options.responsiveBaseElement).width() : b.innerWidth ? d = b.innerWidth : c.documentElement && c.documentElement.clientWidth ? d = c.documentElement.clientWidth : console.warn("Can not detect viewport width."), d
    }, e.prototype.replace = function (b) {
        this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function () {
            return 1 === this.nodeType
        }).each(a.proxy(function (a, b) {
            b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, e.prototype.add = function (b, c) {
        var e = this.relative(this._current);
        c = c === d ? this._items.length : this.normalize(c, !0), b = b instanceof jQuery ? b : a(b), this.trigger("add", {
            content: b,
            position: c
        }), b = this.prepare(b), 0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b), 0 !== this._items.length && this._items[c - 1].after(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b), this._items.splice(c, 0, b), this._mergers.splice(c, 0, 1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[e] && this.reset(this._items[e].index()), this.invalidate("items"), this.trigger("added", {
            content: b,
            position: c
        })
    }, e.prototype.remove = function (a) {
        (a = this.normalize(a, !0)) !== d && (this.trigger("remove", {
            content: this._items[a],
            position: a
        }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: a
        }))
    }, e.prototype.preloadAutoWidthImages = function (b) {
        b.each(a.proxy(function (b, c) {
            this.enter("pre-loading"), c = a(c), a(new Image).one("load", a.proxy(function (a) {
                c.attr("src", a.target.src), c.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
            }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"))
        }, this))
    }, e.prototype.destroy = function () {
        this.$element.off(".owl.core"), this.$stage.off(".owl.core"), a(c).off(".owl.core"), !1 !== this.settings.responsive && (b.clearTimeout(this.resizeTimer), this.off(b, "resize", this._handlers.onThrottledResize));
        for (var d in this._plugins) this._plugins[d].destroy();
        this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.remove(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
    }, e.prototype.op = function (a, b, c) {
        var d = this.settings.rtl;
        switch (b) {
            case"<":
                return d ? a > c : a < c;
            case">":
                return d ? a < c : a > c;
            case">=":
                return d ? a <= c : a >= c;
            case"<=":
                return d ? a >= c : a <= c
        }
    }, e.prototype.on = function (a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
    }, e.prototype.off = function (a, b, c, d) {
        a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
    }, e.prototype.trigger = function (b, c, d, f, g) {
        var h = {item: {count: this._items.length, index: this.current()}},
            i = a.camelCase(a.grep(["on", b, d], function (a) {
                return a
            }).join("-").toLowerCase()),
            j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({relatedTarget: this}, h, c));
        return this._supress[b] || (a.each(this._plugins, function (a, b) {
            b.onTrigger && b.onTrigger(j)
        }), this.register({
            type: e.Type.Event,
            name: b
        }), this.$element.trigger(j), this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)), j
    }, e.prototype.enter = function (b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function (a, b) {
            this._states.current[b] === d && (this._states.current[b] = 0), this._states.current[b]++
        }, this))
    }, e.prototype.leave = function (b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function (a, b) {
            this._states.current[b]--
        }, this))
    }, e.prototype.register = function (b) {
        if (b.type === e.Type.Event) {
            if (a.event.special[b.name] || (a.event.special[b.name] = {}), !a.event.special[b.name].owl) {
                var c = a.event.special[b.name]._default;
                a.event.special[b.name]._default = function (a) {
                    return !c || !c.apply || a.namespace && -1 !== a.namespace.indexOf("owl") ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments)
                }, a.event.special[b.name].owl = !0
            }
        } else b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags, this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function (c, d) {
            return a.inArray(c, this._states.tags[b.name]) === d
        }, this)))
    }, e.prototype.suppress = function (b) {
        a.each(b, a.proxy(function (a, b) {
            this._supress[b] = !0
        }, this))
    }, e.prototype.release = function (b) {
        a.each(b, a.proxy(function (a, b) {
            delete this._supress[b]
        }, this))
    }, e.prototype.pointer = function (a) {
        var c = {x: null, y: null};
        return a = a.originalEvent || a || b.event, a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a, a.pageX ? (c.x = a.pageX, c.y = a.pageY) : (c.x = a.clientX, c.y = a.clientY), c
    }, e.prototype.isNumeric = function (a) {
        return !isNaN(parseFloat(a))
    }, e.prototype.difference = function (a, b) {
        return {x: a.x - b.x, y: a.y - b.y}
    }, a.fn.owlCarousel = function (b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var d = a(this), f = d.data("owl.carousel");
            f || (f = new e(this, "object" == typeof b && b), d.data("owl.carousel", f), a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (b, c) {
                f.register({
                    type: e.Type.Event,
                    name: c
                }), f.$element.on(c + ".owl.carousel.core", a.proxy(function (a) {
                    a.namespace && a.relatedTarget !== this && (this.suppress([c]), f[c].apply(this, [].slice.call(arguments, 1)), this.release([c]))
                }, f))
            })), "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c)
        })
    }, a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
    var e = function (b) {
        this._core = b, this._interval = null, this._visible = null, this._handlers = {
            "initialized.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.settings.autoRefresh && this.watch()
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {autoRefresh: !0, autoRefreshInterval: 500}, e.prototype.watch = function () {
        this._interval || (this._visible = this._core.isVisible(), this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
    }, e.prototype.refresh = function () {
        this._core.isVisible() !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
    }, e.prototype.destroy = function () {
        var a, c;
        b.clearInterval(this._interval);
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
    var e = function (b) {
        this._core = b, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function (b) {
                if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type)) {
                    var c = this._core.settings, e = c.center && Math.ceil(c.items / 2) || c.items,
                        f = c.center && -1 * e || 0,
                        g = (b.property && b.property.value !== d ? b.property.value : this._core.current()) + f,
                        h = this._core.clones().length, i = a.proxy(function (a, b) {
                            this.load(b)
                        }, this);
                    for (c.lazyLoadEager > 0 && (e += c.lazyLoadEager, c.loop && (g -= c.lazyLoadEager, e++)); f++ < e;) this.load(h / 2 + this._core.relative(g)), h && a.each(this._core.clones(this._core.relative(g)), i), g++
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {lazyLoad: !1, lazyLoadEager: 0}, e.prototype.load = function (c) {
        var d = this._core.$stage.children().eq(c), e = d && d.find(".owl-lazy");
        !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function (c, d) {
            var e, f = a(d),
                g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src") || f.attr("data-srcset");
            this._core.trigger("load", {
                element: f,
                url: g
            }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function () {
                f.css("opacity", 1), this._core.trigger("loaded", {element: f, url: g}, "lazy")
            }, this)).attr("src", g) : f.is("source") ? f.one("load.owl.lazy", a.proxy(function () {
                this._core.trigger("loaded", {element: f, url: g}, "lazy")
            }, this)).attr("srcset", g) : (e = new Image, e.onload = a.proxy(function () {
                f.css({"background-image": 'url("' + g + '")', opacity: "1"}), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this), e.src = g)
        }, this)), this._loaded.push(d.get(0)))
    }, e.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Lazy = e
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
    var e = function (c) {
        this._core = c, this._previousHeight = null, this._handlers = {
            "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.settings.autoHeight && this.update()
            }, this), "changed.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.settings.autoHeight && "position" === a.property.name && this.update()
            }, this), "loaded.owl.lazy": a.proxy(function (a) {
                a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._intervalId = null;
        var d = this;
        a(b).on("load", function () {
            d._core.settings.autoHeight && d.update()
        }), a(b).resize(function () {
            d._core.settings.autoHeight && (null != d._intervalId && clearTimeout(d._intervalId), d._intervalId = setTimeout(function () {
                d.update()
            }, 250))
        })
    };
    e.Defaults = {autoHeight: !1, autoHeightClass: "owl-height"}, e.prototype.update = function () {
        var b = this._core._current, c = b + this._core.settings.items, d = this._core.settings.lazyLoad,
            e = this._core.$stage.children().toArray().slice(b, c), f = [], g = 0;
        a.each(e, function (b, c) {
            f.push(a(c).height())
        }), g = Math.max.apply(null, f), g <= 1 && d && this._previousHeight && (g = this._previousHeight), this._previousHeight = g, this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass)
    }, e.prototype.destroy = function () {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
    var e = function (b) {
        this._core = b, this._videos = {}, this._playing = null, this._handlers = {
            "initialized.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.register({type: "state", name: "playing", tags: ["interacting"]})
            }, this), "resize.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault()
            }, this), "refreshed.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
            }, this), "changed.owl.carousel": a.proxy(function (a) {
                a.namespace && "position" === a.property.name && this._playing && this.stop()
            }, this), "prepared.owl.carousel": a.proxy(function (b) {
                if (b.namespace) {
                    var c = a(b.content).find(".owl-video");
                    c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function (a) {
            this.play(a)
        }, this))
    };
    e.Defaults = {video: !1, videoHeight: !1, videoWidth: !1}, e.prototype.fetch = function (a, b) {
        var c = function () {
                return a.attr("data-vimeo-id") ? "vimeo" : a.attr("data-vzaar-id") ? "vzaar" : "youtube"
            }(), d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id"),
            e = a.attr("data-width") || this._core.settings.videoWidth,
            f = a.attr("data-height") || this._core.settings.videoHeight, g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (d = g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube"; else if (d[3].indexOf("vimeo") > -1) c = "vimeo"; else {
            if (!(d[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
            c = "vzaar"
        }
        d = d[6], this._videos[g] = {
            type: c,
            id: d,
            width: e,
            height: f
        }, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
    }, e.prototype.thumbnail = function (b, c) {
        var d, e, f, g = c.width && c.height ? "width:" + c.width + "px;height:" + c.height + "px;" : "",
            h = b.find("img"), i = "src", j = "", k = this._core.settings, l = function (c) {
                e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? a("<div/>", {
                    class: "owl-video-tn " + j,
                    srcType: c
                }) : a("<div/>", {
                    class: "owl-video-tn",
                    style: "opacity:1;background-image:url(" + c + ")"
                }), b.after(d), b.after(e)
            };
        if (b.wrap(a("<div/>", {
            class: "owl-video-wrapper",
            style: g
        })), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length) return l(h.attr(i)), h.remove(), !1;
        "youtube" === c.type ? (f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type ? a.ajax({
            type: "GET",
            url: "//vimeo.com/api/v2/video/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function (a) {
                f = a[0].thumbnail_large, l(f)
            }
        }) : "vzaar" === c.type && a.ajax({
            type: "GET",
            url: "//vzaar.com/api/videos/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function (a) {
                f = a.framegrab_url, l(f)
            }
        })
    }, e.prototype.stop = function () {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
    }, e.prototype.play = function (b) {
        var c, d = a(b.target), e = d.closest("." + this._core.settings.itemClass),
            f = this._videos[e.attr("data-video")], g = f.width || "100%", h = f.height || this._core.$stage.height();
        this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), e = this._core.items(this._core.relative(e.index())), this._core.reset(e.index()), c = a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'), c.attr("height", h), c.attr("width", g), "youtube" === f.type ? c.attr("src", "//www.youtube.com/embed/" + f.id + "?autoplay=1&rel=0&v=" + f.id) : "vimeo" === f.type ? c.attr("src", "//player.vimeo.com/video/" + f.id + "?autoplay=1") : "vzaar" === f.type && c.attr("src", "//view.vzaar.com/" + f.id + "/player?autoplay=true"), a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")), this._playing = e.addClass("owl-video-playing"))
    }, e.prototype.isInFullScreen = function () {
        var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
        return b && a(b).parent().hasClass("owl-video-frame")
    }, e.prototype.destroy = function () {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Video = e
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
    var e = function (b) {
        this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
            "change.owl.carousel": a.proxy(function (a) {
                a.namespace && "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
            }, this), "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function (a) {
                a.namespace && (this.swapping = "translated" == a.type)
            }, this), "translate.owl.carousel": a.proxy(function (a) {
                a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    e.Defaults = {
        animateOut: !1,
        animateIn: !1
    }, e.prototype.swap = function () {
        if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
            this.core.speed(0);
            var b, c = a.proxy(this.clear, this), d = this.core.$stage.children().eq(this.previous),
                e = this.core.$stage.children().eq(this.next), f = this.core.settings.animateIn,
                g = this.core.settings.animateOut;
            this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.one(a.support.animation.end, c).css({left: b + "px"}).addClass("animated owl-animated-out").addClass(g)), f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f))
        }
    }, e.prototype.clear = function (b) {
        a(b.target).css({left: ""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
    }, e.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
    var e = function (b) {
        this._core = b, this._call = null, this._time = 0, this._timeout = 0, this._paused = !0, this._handlers = {
            "changed.owl.carousel": a.proxy(function (a) {
                a.namespace && "settings" === a.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : a.namespace && "position" === a.property.name && this._paused && (this._time = 0)
            }, this), "initialized.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.settings.autoplay && this.play()
            }, this), "play.owl.autoplay": a.proxy(function (a, b, c) {
                a.namespace && this.play(b, c)
            }, this), "stop.owl.autoplay": a.proxy(function (a) {
                a.namespace && this.stop()
            }, this), "mouseover.owl.autoplay": a.proxy(function () {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this), "mouseleave.owl.autoplay": a.proxy(function () {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
            }, this), "touchstart.owl.core": a.proxy(function () {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this), "touchend.owl.core": a.proxy(function () {
                this._core.settings.autoplayHoverPause && this.play()
            }, this)
        }, this._core.$element.on(this._handlers), this._core.options = a.extend({}, e.Defaults, this._core.options)
    };
    e.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, e.prototype._next = function (d) {
        this._call = b.setTimeout(a.proxy(this._next, this, d), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()), this._core.is("interacting") || c.hidden || this._core.next(d || this._core.settings.autoplaySpeed)
    }, e.prototype.read = function () {
        return (new Date).getTime() - this._time
    }, e.prototype.play = function (c, d) {
        var e;
        this._core.is("rotating") || this._core.enter("rotating"), c = c || this._core.settings.autoplayTimeout, e = Math.min(this._time % (this._timeout || c), c), this._paused ? (this._time = this.read(), this._paused = !1) : b.clearTimeout(this._call), this._time += this.read() % c - e, this._timeout = c, this._call = b.setTimeout(a.proxy(this._next, this, d), c - e)
    }, e.prototype.stop = function () {
        this._core.is("rotating") && (this._time = 0, this._paused = !0, b.clearTimeout(this._call), this._core.leave("rotating"))
    }, e.prototype.pause = function () {
        this._core.is("rotating") && !this._paused && (this._time = this.read(), this._paused = !0, b.clearTimeout(this._call))
    }, e.prototype.destroy = function () {
        var a, b;
        this.stop();
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.autoplay = e
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
    "use strict";
    var e = function (b) {
        this._core = b, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": a.proxy(function (b) {
                b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
            }, this), "added.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop())
            }, this), "remove.owl.carousel": a.proxy(function (a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1)
            }, this), "changed.owl.carousel": a.proxy(function (a) {
                a.namespace && "position" == a.property.name && this.draw()
            }, this), "initialized.owl.carousel": a.proxy(function (a) {
                a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
            }, this), "refreshed.owl.carousel": a.proxy(function (a) {
                a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    e.Defaults = {
        nav: !1,
        navText: ['<span aria-label="Previous">&#x2039;</span>', '<span aria-label="Next">&#x203a;</span>'],
        navSpeed: !1,
        navElement: 'button type="button" role="presentation"',
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotsData: !1,
        dotsSpeed: !1,
        dotsContainer: !1
    }, e.prototype.initialize = function () {
        var b, c = this._core.settings;
        this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function (a) {
            this.prev(c.navSpeed)
        }, this)), this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function (a) {
            this.next(c.navSpeed)
        }, this)), c.dotsData || (this._templates = [a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]), this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "button", a.proxy(function (b) {
            var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
            b.preventDefault(), this.to(d, c.dotsSpeed)
        }, this));
        for (b in this._overrides) this._core[b] = a.proxy(this[b], this)
    }, e.prototype.destroy = function () {
        var a, b, c, d, e;
        e = this._core.settings;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls) "$relative" === b && e.navContainer ? this._controls[b].html("") : this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, e.prototype.update = function () {
        var a, b, c, d = this._core.clones().length / 2, e = d + this._core.items().length, f = this._core.maximum(!0),
            g = this._core.settings, h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
        if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)), g.dots || "page" == g.slideBy) for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
            if (b >= h || 0 === b) {
                if (this._pages.push({start: Math.min(f, a - d), end: a - d + h - 1}), Math.min(f, a - d) === f) break;
                b = 0, ++c
            }
            b += this._core.mergers(this._core.relative(a))
        }
    }, e.prototype.draw = function () {
        var b, c = this._core.settings, d = this._core.items().length <= c.items,
            e = this._core.relative(this._core.current()), f = c.loop || c.rewind;
        this._controls.$relative.toggleClass("disabled", !c.nav || d), c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !c.dots || d), c.dots && (b = this._pages.length - this._controls.$absolute.children().length, c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : b < 0 && this._controls.$absolute.children().slice(b).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"))
    }, e.prototype.onTrigger = function (b) {
        var c = this._core.settings;
        b.page = {
            index: a.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
        }
    }, e.prototype.current = function () {
        var b = this._core.relative(this._core.current());
        return a.grep(this._pages, a.proxy(function (a, c) {
            return a.start <= b && a.end >= b
        }, this)).pop()
    }, e.prototype.getPosition = function (b) {
        var c, d, e = this._core.settings;
        return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
    }, e.prototype.next = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
    }, e.prototype.prev = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
    }, e.prototype.to = function (b, c, d) {
        var e;
        !d && this._pages.length ? (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c)) : a.proxy(this._overrides.to, this._core)(b, c)
    }, a.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
    "use strict";
    var e = function (c) {
        this._core = c, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": a.proxy(function (c) {
                c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
            }, this), "prepared.owl.carousel": a.proxy(function (b) {
                if (b.namespace) {
                    var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                    if (!c) return;
                    this._hashes[c] = b.content
                }
            }, this), "changed.owl.carousel": a.proxy(function (c) {
                if (c.namespace && "position" === c.property.name) {
                    var d = this._core.items(this._core.relative(this._core.current())),
                        e = a.map(this._hashes, function (a, b) {
                            return a === d ? b : null
                        }).join();
                    if (!e || b.location.hash.slice(1) === e) return;
                    b.location.hash = e
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function (a) {
            var c = b.location.hash.substring(1), e = this._core.$stage.children(),
                f = this._hashes[c] && e.index(this._hashes[c]);
            f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0)
        }, this))
    };
    e.Defaults = {URLhashListener: !1}, e.prototype.destroy = function () {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Hash = e
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
    function e(b, c) {
        var e = !1, f = b.charAt(0).toUpperCase() + b.slice(1);
        return a.each((b + " " + h.join(f + " ") + f).split(" "), function (a, b) {
            if (g[b] !== d) return e = !c || b, !1
        }), e
    }

    function f(a) {
        return e(a, !0)
    }

    var g = a("<support>").get(0).style, h = "Webkit Moz O ms".split(" "), i = {
        transition: {
            end: {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd",
                transition: "transitionend"
            }
        },
        animation: {
            end: {
                WebkitAnimation: "webkitAnimationEnd",
                MozAnimation: "animationend",
                OAnimation: "oAnimationEnd",
                animation: "animationend"
            }
        }
    }, j = {
        csstransforms: function () {
            return !!e("transform")
        }, csstransforms3d: function () {
            return !!e("perspective")
        }, csstransitions: function () {
            return !!e("transition")
        }, cssanimations: function () {
            return !!e("animation")
        }
    };
    j.csstransitions() && (a.support.transition = new String(f("transition")), a.support.transition.end = i.transition.end[a.support.transition]), j.cssanimations() && (a.support.animation = new String(f("animation")), a.support.animation.end = i.animation.end[a.support.animation]), j.csstransforms() && (a.support.transform = new String(f("transform")), a.support.transform3d = j.csstransforms3d())
}(window.Zepto || window.jQuery, window, document);