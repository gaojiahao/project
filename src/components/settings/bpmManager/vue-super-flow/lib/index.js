(function(t, e) {
	"object" === typeof exports && "object" === typeof module ? module.exports = e() : "function" === typeof define && define.amd ? define("SuperFrom", [], e) : "object" === typeof exports ? exports["SuperFrom"] = e() : t["SuperFrom"] = e()
})("undefined" !== typeof self ? self: this, (function() {
	return function(t) {
		var e = {};
		function n(i) {
			if (e[i]) return e[i].exports;
			var r = e[i] = {
				i: i,
				l: !1,
				exports: {}
			};
			return t[i].call(r.exports, r, r.exports, n),
			r.l = !0,
			r.exports
		}
		return n.m = t,
		n.c = e,
		n.d = function(t, e, i) {
			n.o(t, e) || Object.defineProperty(t, e, {
				enumerable: !0,
				get: i
			})
		},
		n.r = function(t) {
			"undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
				value: "Module"
			}),
			Object.defineProperty(t, "__esModule", {
				value: !0
			})
		},
		n.t = function(t, e) {
			if (1 & e && (t = n(t)), 8 & e) return t;
			if (4 & e && "object" === typeof t && t && t.__esModule) return t;
			var i = Object.create(null);
			if (n.r(i), Object.defineProperty(i, "default", {
				enumerable: !0,
				value: t
			}), 2 & e && "string" != typeof t) for (var r in t) n.d(i, r,
			function(e) {
				return t[e]
			}.bind(null, r));
			return i
		},
		n.n = function(t) {
			var e = t && t.__esModule ?
			function() {
				return t["default"]
			}: function() {
				return t
			};
			return n.d(e, "a", e),
			e
		},
		n.o = function(t, e) {
			return Object.prototype.hasOwnProperty.call(t, e)
		},
		n.p = "",
		n(n.s = "fb15")
	} ({
		2470 : function(t, e, n) {
			"use strict";
			var i = n("5341"),
			r = n.n(i);
			r.a
		},
		"3ad9": function(t, e, n) {
			"use strict";
			var i = n("41f0"),
			r = n.n(i);
			r.a
		},
		"41f0": function(t, e, n) {},
		5341 : function(t, e, n) {},
		"5ebe": function(t, e, n) {},
		"5fa5": function(t, e, n) {},
		"7e2d": function(t, e, n) {
			"use strict";
			var i = n("5fa5"),
			r = n.n(i);
			r.a
		},
		8875 : function(t, e, n) {
			var i, r, o; (function(n, s) {
				r = [],
				i = s,
				o = "function" === typeof i ? i.apply(e, r) : i,
				void 0 === o || (t.exports = o)
			})("undefined" !== typeof self && self, (function() {
				function t() {
					if (document.currentScript) return document.currentScript;
					try {
						throw new Error
					} catch(h) {
						var t, e, n, i = /.*at [^(]*\((.*):(.+):(.+)\)$/gi,
						r = /@([^@]*):(\d+):(\d+)\s*$/gi,
						o = i.exec(h.stack) || r.exec(h.stack),
						s = o && o[1] || !1,
						a = o && o[2] || !1,
						u = document.location.href.replace(document.location.hash, ""),
						l = document.getElementsByTagName("script");
						s === u && (t = document.documentElement.outerHTML, e = new RegExp("(?:[^\\n]+?\\n){0," + (a - 2) + "}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*", "i"), n = t.replace(e, "$1").trim());
						for (var c = 0; c < l.length; c++) {
							if ("interactive" === l[c].readyState) return l[c];
							if (l[c].src === s) return l[c];
							if (s === u && l[c].innerHTML && l[c].innerHTML.trim() === n) return l[c]
						}
						return null
					}
				}
				return t
			}))
		},
		a733: function(t, e, n) {},
		b8fb: function(t, e, n) {
			"use strict";
			var i = n("a733"),
			r = n.n(i);
			r.a
		},
		bce9: function(t, e, n) {
			"use strict";
			var i = n("5ebe"),
			r = n.n(i);
			r.a
		},
		fb15: function(t, e, n) {
			"use strict";
			if (n.r(e), "undefined" !== typeof window) {
				var i = window.document.currentScript,
				r = n("8875");
				i = r(),
				"currentScript" in document || Object.defineProperty(document, "currentScript", {
					get: r
				});
				var o = i && i.src.match(/(.+\/)[^/] + \.js(\ ? . * ) ? $ / );
				o && (n.p = o[1])
			}
			var s = function() {
				var t = this,
				e = t.$createElement,
				n = t._self._c || e;
				return n("div", {
					ref: "flow-canvas",
					staticClass: "super-flow",
					directives: [{ name: "super-flow", rawName: "v-superFlow" }],
					on: {
						contextmenu: function(e) {
							return e.preventDefault(),
							e.stopPropagation(),
							t.contextmenu(e)
						}
					}
				},
				[t.temEdgeConf.visible ? n("graph-line", {
					attrs: {
						padding: t.linkPadding,
						graph: t.graph,
						link: t.temEdgeConf.link,
						"link-base-style": t.linkBaseStyle,
						"link-desc": t.linkDesc,
						"link-style": t.linkStyle
					}
				}) : t._e(), t._l(t.graph.linkList, (function(e, i) {
					return n("graph-line", {
						key: e.key,
						attrs: {
							index: i,
							padding: t.linkPadding,
							graph: t.graph,
							link: e,
							"link-base-style": t.linkBaseStyle,
							"link-desc": t.linkDesc,
							"link-style": t.linkStyle
						}
					})
				})), t.moveNodeConf.isMove && t.hasMarkLine ? n("mark-line", {
					attrs: {
						width: t.clientWidth,
						height: t.clientHeight,
						"mark-color": t.markLineColor,
						markLine: t.moveNodeConf.markLine
					}
				}) : t._e(), t._l(t.graph.nodeList, (function(e, i) {
					return n("graph-node", {
						ref:'node',
						key: e.key,
						attrs: {
							index: i,
							node: e,
							graph: t.graph,
							"is-move": e === t.moveNodeConf.node,
							"is-tem-edge": t.temEdgeConf.visible,
							"node-intercept": t.nodeIntercept(e),
							"line-drop": t.linkAddable,
							"node-drop": t.draggable
						},
						on: {
							"node-mousedown": t.nodeMousedown,
							"node-mouseenter": t.nodeMouseenter,
							"node-mouseleave": t.nodeMouseleave,
							"node-mouseup": t.nodeMouseup,
							"side-mousedown": t.sideMousedown,
							"node-contextmenu": t.nodeContextmenu
						},
						scopedSlots: t._u([{
							key: "default",
							fn: function(e) {
								var n = e.data;
								return [t._t("node", null, {
									data: n
								})]
							}
						}], null, !0)
					})
				})), n("graph-menu", {
					attrs: {
						visible: t.menuConf.visible,
						graph: t.graph,
						position: t.menuConf.position,
						list: t.menuConf.list,
						source: t.menuConf.source
					},
					on: {
						"update:visible": function(e) {
							return t.$set(t.menuConf, "visible", e)
						}
					},
					scopedSlots: t._u([{
						key: "default",
						fn: function(e) {
							var n = e.item;
							return [t._t("menuItem", null, {
								item: n
							})]
						}
					}], null, !0)
				}), n("div", {
					directives: [{
						name: "show",
						rawName: "v-show",
						value: t.graph.graphSelected,
						expression: "graph.graphSelected"
					}],
					ref: "selectAllMask",
					staticClass: "select-all__mask",
					style: t.maskStyle,
					attrs: {
						tabindex: "-1"
					},
					on: {
						blur: function(e) {
							t.graph.graphSelected = !1
						},
						mousedown: t.selectAllMaskMouseDown,
						contextmenu: function(t) {
							t.preventDefault(),
							t.stopPropagation()
						}
					}
				}),], 2)
			},
			a = [];
			function u(t) {
				return d(t) || h(t) || c(t) || l()
			}
			function l() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}
			function c(t, e) {
				if (t) {
					if ("string" === typeof t) return f(t, e);
					var n = Object.prototype.toString.call(t).slice(8, -1);
					return "Object" === n && t.constructor && (n = t.constructor.name),
					"Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? f(t, e) : void 0
				}
			}
			function h(t) {
				if ("undefined" !== typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t)
			}
			function d(t) {
				if (Array.isArray(t)) return f(t)
			}
			function f(t, e) { (null == e || e > t.length) && (e = t.length);
				for (var n = 0,
				i = new Array(e); n < e; n++) i[n] = t[n];
				return i
			}
			function p(t, e) {
				if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
			}
			function m(t, e) {
				for (var n = 0; n < e.length; n++) {
					var i = e[n];
					i.enumerable = i.enumerable || !1,
					i.configurable = !0,
					"value" in i && (i.writable = !0),
					Object.defineProperty(t, i.key, i)
				}
			}
			function v(t, e, n) {
				return e && m(t.prototype, e),
				n && m(t, n),
				t
			}
			var y, g = function() {
				function t() {
					p(this, t),
					this.listeners = {}
				}
				return v(t, [{
					key: "add",
					value: function(t, e) {
						t in this.listeners || (this.listeners[t] = []),
						this.listeners[t].push(e)
					}
				},
				{
					key: "remove",
					value: function(t, e) {
						if (t in this.listeners) for (var n = this.listeners[t], i = 0, r = n.length; i < r; i++) if (n[i] === e) return n.splice(i, 1),
						this.remove(t, e)
					}
				},
				{
					key: "dispatch",
					value: function(t) {
						var e = this,
						n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
						if (t.type in this.listeners) {
							var i = this.listeners[t.type];
							t.target = this,
							n ? i.some((function(n, r) {
								var o = n.call(e, t);
								return o && i.unshift.apply(i, u(i.splice(r, 1))),
								o
							})) : i.forEach((function(n) {
								return n.call(e, t)
							}))
						}
					}
				}]),
				t
			} ();
			function b(t) {
				return S(t) || L(t) || w(t) || k()
			}
			function k() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}
			function w(t, e) {
				if (t) {
					if ("string" === typeof t) return A(t, e);
					var n = Object.prototype.toString.call(t).slice(8, -1);
					return "Object" === n && t.constructor && (n = t.constructor.name),
					"Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? A(t, e) : void 0
				}
			}
			function L(t) {
				if ("undefined" !== typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t)
			}
			function S(t) {
				if (Array.isArray(t)) return A(t)
			}
			function A(t, e) { (null == e || e > t.length) && (e = t.length);
				for (var n = 0,
				i = new Array(e); n < e; n++) i[n] = t[n];
				return i
			}
			function x() {
				for (var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), i = n.length, r = [], o = 16, s = 0; s < o; s++) r[s] = n[0 | Math.random() * i];
				return t + r.join("") + e
			}
			function M(t) {
				var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
				n = t.clientX,
				i = t.clientY,
				r = t.currentTarget,
				o = e || r,
				s = o.getBoundingClientRect(),
				a = s.left,
				u = s.top;
				return [n - a, i - u]
			}
			function C(t, e) {
				return [t[0] + e[0], t[1] + e[1]]
			}
			function O(t, e) {
				return [t[0] * e, t[1] * e]
			}
			function _(t, e) {
				return [e[0] - t[0], e[1] - t[1]]
			}
			function P(t, e) {
				return [t[0] - e[0], t[1] - e[1]]
			}
			function j(t, e) {
				return t[0] * e[0] + t[1] * e[1]
			}
			function $(t, e) {
				return t[0] * e[1] - t[1] * e[0]
			}
			function E(t) {
				var e = Math.sqrt(t[0] * t[0] + t[1] * t[1]);
				return [t[0] / e, t[1] / e]
			}
			function N(t, e) {
				return t[0] === e[0] && t[1] === e[1]
			}
			function I(t) {
				return Math.round(180 / Math.PI * Math.atan2(t[1], t[0])) + 180
			}
			function D(t, e) {
				return t[0] * e[1] - t[1] * e[0] === 0
			}
			function T(t) {
				var e = {
					add: C,
					multiply: O,
					differ: _,
					minus: P,
					dotProduct: j,
					cross: $,
					unitVector: E,
					equals: N,
					angle: I,
					parallel: D
				},
				n = {};
				return Object.keys(e).forEach((function(i) {
					Object.defineProperty(n, i, {
						get: function() {
							return function(r) {
								return t = e[i](t, r),
								n
							}
						}
					})
				})),
				Object.defineProperty(n, "end", {
					get: function() {
						return t
					}
				}),
				n
			}
			function B(t) {
				return Object.prototype.toString.call(t).slice(8, -1).toLocaleLowerCase()
			}
			function R(t) {
				return "function" === B(t)
			}
			function F(t) {
				return "boolean" === B(t)
			}
			function X(t) {
				return "string" === B(t)
			}
			function Y(t) {
				return "object" === B(t)
			}
			function H(t, e) {
				t.splice.apply(t, [0, t.length].concat(b(e)))
			}
			function U(t, e, n) {
				return e in t ? Object.defineProperty(t, e, {
					value: n,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : t[e] = n,
				t
			}
			var W = {
				top: 1,
				right: 2,
				bottom: 3,
				left: 4
			},
			J = (y = {},
			U(y, W.top, [0, -1]), U(y, W.right, [1, 0]), U(y, W.bottom, [0, 1]), U(y, W.left, [ - 1, 0]), y);
			function z(t) {
				return K(t) || q(t) || V(t) || G()
			}
			function G() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}
			function V(t, e) {
				if (t) {
					if ("string" === typeof t) return Q(t, e);
					var n = Object.prototype.toString.call(t).slice(8, -1);
					return "Object" === n && t.constructor && (n = t.constructor.name),
					"Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Q(t, e) : void 0
				}
			}
			function q(t) {
				if ("undefined" !== typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t)
			}
			function K(t) {
				if (Array.isArray(t)) return Q(t)
			}
			function Q(t, e) { (null == e || e > t.length) && (e = t.length);
				for (var n = 0,
				i = new Array(e); n < e; n++) i[n] = t[n];
				return i
			}
			function Z(t, e) {
				if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
			}
			function tt(t, e) {
				for (var n = 0; n < e.length; n++) {
					var i = e[n];
					i.enumerable = i.enumerable || !1,
					i.configurable = !0,
					"value" in i && (i.writable = !0),
					Object.defineProperty(t, i.key, i)
				}
			}
			function et(t, e, n) {
				return e && tt(t.prototype, e),
				n && tt(t, n),
				t
			}
			var nt = function() {
				function t(e, n) {
					Z(this, t);
					var i = e.id,
					r = void 0 === i ? x("node") : i,
					o = e.width,
					s = void 0 === o ? 180 : o,
					a = e.height,
					u = void 0 === a ? 100 : a,
					l = e.coordinate,
					c = void 0 === l ? [0, 0] : l,
					h = e.data,
					d = void 0 === h ? null: h;
					this.key = x("node"),
					this.graph = n,
					this.id = r,
					this.coordinate = z(c),
					this.left = c[0],
					this.top = c[1],
					this.data = d,
					this.type = d.prop,
					this.text = d.name,
					this.business = d.business,
					this.width = s,
					this.height = u,
					this.participants = e.participants||[],
					this.parPolicies = e.parPolicies||{},
					this.outerParticipants = e.outerParticipants||[],
					this.buttons = e.buttons||[],
					this.rules = e.rules||[],
					this.permissions = e.permissions||[]
				}
				return et(t, [{
					key: "angle",
					value: function() {
						var t = this.width / 2,
						e = this.height / 2,
						n = [0, 0],
						i = T(n).minus([t, e]).angle().end,
						r = T(n).add([t, 0]).minus([0, e]).angle().end,
						o = T(n).add([t, e]).angle().end,
						s = T(n).add([0, e]).minus([t, 0]).angle().end;
						this.angleList = [i, r, o, s]
					}
				},
				{
					key: "relative",
					value: function(t) {
						var e = T(t).minus([this.width / 2, this.height / 2]).angle().end,
						n = this.angleList,
						i = [W.top, W.right, W.bottom, W.left],
						r = W.left;
						return n.reduce((function(t, n, o) {
							return e >= t && e < n && (r = i[o - 1]),
							n
						})),
						{
							position: this.fixOffset(t, r),
							direction: J[r]
						}
					}
				},
				{
					key: "fixOffset",
					value: function(t, e) {
						switch (e) {
						case W.top:
							t[0] = this.width / 2,
							t[1] = 0;
							break;
						case W.right:
							t[0] = this.width,
							t[1] = this.height / 2;
							break;
						case W.bottom:
							t[0] = this.width / 2,
							t[1] = this.height;
							break;
						case W.left:
						default:
							t[0] = 0,
							t[1] = this.height / 2;
							break
						}
						return t
					}
				},
				{
					key: "remove",
					value: function() {
						return this.graph.removeNode(this)
					}
				},
				{
					key: "toJSON",
					value: function() {
						return {
							id: this.id,
							width: this.width,
							height: this.height,
							coordinate: z(this.coordinate),
							data: this.data,
							left: this.coordinate[0],
							top: this.coordinate[1],
							type: this.data.prop,
							text: this.data.name,
							business: this.data.business,
							nodeId: this.id,
							parPolicies: this.parPolicies,
							permissions: this.permissions,
							buttons: this.buttons,
							rules: this.rules,
							participants: this.participants,
						}
					}
				},
				{
					key: "position",
					get: function() {
						return T(this.coordinate).add(this.graph.origin).end
					},
					set: function(t) {
						this.coordinate = T(t).minus(this.graph.origin).end
					}
				},
				{
					key: "center",
					get: function() {
						return T(this.coordinate).add([this.width / 2, this.height / 2]).end
					},
					set: function(t) {
						this.coordinate = T(t).minus([this.width / 2, this.height / 2]).end
					}
				},
				{
					key: "width",
					get: function() {
						return this._width
					},
					set: function(t) {
						t = Math.floor(t),
						// this._width = t > 50 ? t: 50,
						this._width = t,
						this.angle()
					}
				},
				{
					key: "height",
					get: function() {
						return this._height
					},
					set: function(t) {
						t = Math.floor(t),
						this._height = t > 20 ? t: 20,
						this.angle()
					}
				}]),
				t
			} ();
			function it(t, e) {
				return ut(t) || at(t, e) || ot(t, e) || rt()
			}
			function rt() {
				throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}
			function ot(t, e) {
				if (t) {
					if ("string" === typeof t) return st(t, e);
					var n = Object.prototype.toString.call(t).slice(8, -1);
					return "Object" === n && t.constructor && (n = t.constructor.name),
					"Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? st(t, e) : void 0
				}
			}
			function st(t, e) { (null == e || e > t.length) && (e = t.length);
				for (var n = 0,
				i = new Array(e); n < e; n++) i[n] = t[n];
				return i
			}
			function at(t, e) {
				if ("undefined" !== typeof Symbol && Symbol.iterator in Object(t)) {
					var n = [],
					i = !0,
					r = !1,
					o = void 0;
					try {
						for (var s, a = t[Symbol.iterator](); ! (i = (s = a.next()).done); i = !0) if (n.push(s.value), e && n.length === e) break
					} catch(u) {
						r = !0,
						o = u
					} finally {
						try {
							i || null == a["return"] || a["return"]()
						} finally {
							if (r) throw o
						}
					}
					return n
				}
			}
			function ut(t) {
				if (Array.isArray(t)) return t
			}
			function lt(t, e) {
				if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
			}
			function ct(t, e) {
				for (var n = 0; n < e.length; n++) {
					var i = e[n];
					i.enumerable = i.enumerable || !1,
					i.configurable = !0,
					"value" in i && (i.writable = !0),
					Object.defineProperty(t, i.key, i)
				}
			}
			function ht(t, e, n) {
				return e && ct(t.prototype, e),
				n && ct(t, n),
				t
			}
			function dt(t, e, n) {
				return e in t ? Object.defineProperty(t, e, {
					value: n,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : t[e] = n,
				t
			}
			var ft = function() {
				function t(e, n) {
					lt(this, t);
					var i = e.id,
					r = void 0 === i ? x("link") : i,
					o = e.start,
					s = e.end,
					a = void 0 === s ? null: s,
					u = e.startAt,
					l = void 0 === u ? [0, 0] : u,
					c = e.endAt,
					h = void 0 === c ? [0, 0] : c,
					d = e.data,
					f = void 0 === d ? {name:'线',prop:'line'}: d;
					this.key = x("link"),
					this.id = r,
					this.graph = n,
					this.start = o,
					this.data = f,
					this.end = a,
					this.business = e.business,
					this.startDirection = J[W.top],
					this.endDirection = J[W.top],
					this.startAt = l,
					this.endAt = h,
					this.rules= e.rules||[]
				}
				return ht(t, [{
					key: "startCoordinate",
					value: function() {
						return T(this.start.position).add(this.startAt).end
					}
				},
				{
					key: "endCoordinate",
					value: function() {
						return this.end ? T(this.end.position).add(this.endAt).end: this.movePosition
					}
				},
				{
					key: "coordinateList",
					value: function() {
						var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : .5,
						n = this.startCoordinate(),
						i = this.endCoordinate(),
						r = this.startDirection,
						o = this.endDirection,
						s = T(r).multiply(t.distance).add(n).end,
						a = T(o).multiply(t.distance).add(i).end;
						o = T(o).multiply( - 1).end;
						var u = [a[0] - s[0], 0],
						l = [0, a[1] - s[1]],
						c = this.pathDirection(l, u, r),
						h = this.pathDirection(l, u, o),
						d = T(c).dotProduct(h).end > 0 ? 2 : 1,
						f = h === u ? l: u,
						p = [];
						if (p.push(n, s), 1 === d) {
							var m = T(s).add(c).end,
							v = T(m).add(h).end;
							p.push(m, v)
						} else {
							var y = T(c).multiply(e).add(s).end,
							g = T(y).add(f).end,
							b = T(h).multiply(1 - e).add(g).end;
							p.push(y, g, b)
						}
						return p.push(i),
						p
					}
				},
				{
					key: "pathDirection",
					value: function(t, e, n) {
						return T(e).parallel(n).end ? T(e).dotProduct(n).end > 0 ? e: t: T(t).dotProduct(n).end > 0 ? t: e
					}
				},
				{
					key: "isPointInLink",
					value: function(t, e) {
						var n = e || this.pathPointList,
						i = n.pointList,
						r = n.minX,
						o = n.minY,
						s = n.maxX,
						a = n.maxY,
						u = 5;
						if (t[0] < r - u || t[0] > s + u || t[1] < o - u || t[1] > a + u) return ! 1;
						for (var l = 0; l < i.length - 2; l++) {
							var c = i[l],
							h = i[l + 1],
							d = Math.min(c[1], h[1]) - u,
							f = Math.max(c[0], h[0]) + u,
							p = Math.max(c[1], h[1]) + u,
							m = Math.min(c[0], h[0]) - u,
							v = it(t, 2),
							y = v[0],
							g = v[1];
							if (y > m && y < f && g > d && g < p) return ! 0
						}
						return ! 1
					}
				},
				{
					key: "remove",
					value: function() {
						return this.graph.removeLink(this)
					}
				},
				{
					key: "toJSON",
					value: function() {
						return {
							edgeid: this.id,
							sourse: this.start.id,
							target: this.end.id,
							startAt: this.startAt,
							endAt: this.endAt,
							data: this.data,
							rules:this.rules,
						}
					}
				},
				{
					key: "end",
					get: function() {
						return this._end
					},
					set: function(t) {
						if (this.start === t) return ! 1;
						this._end = t
					}
				},
				{
					key: "startAt",
					get: function() {
						return this._startAt
					},
					set: function(t) {
						var e = this.start.relative(t);
						this._startAt = e.position,
						this.startDirection = e.direction
					}
				},
				{
					key: "endAt",
					get: function() {
						return this._endAt
					},
					set: function(t) {
						if (this.end) {
							var e = this.end.relative(t);
							this._endAt = e.position,
							this.endDirection = e.direction
						} else this._endAt = t
					}
				},
				{
					key: "movePosition",
					get: function() {
						return this._movePosition
					},
					set: function(t) {
						if (this._movePosition = t, !this.end) {
							var e = this.start.relative(T(t).minus(this.graph.origin).minus(this.start.coordinate).end);
							this.endDirection = T(e.direction).multiply( - 1).end
						}
					}
				},
				{
					key: "pathPointList",
					get: function() {
						var t = this.coordinateList(),
						e = [],
						n = [];
						return t.forEach((function(t) {
							e.push(t[0]),
							n.push(t[1])
						})),
						{
							pointList: t,
							xList: e,
							yList: n,
							minX: Math.min.apply(Math, e),
							maxX: Math.max.apply(Math, e),
							minY: Math.min.apply(Math, n),
							maxY: Math.max.apply(Math, n)
						}
					}
				}]),
				t
			} ();
			function pt(t) {
				return pt = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ?
				function(t) {
					return typeof t
				}: function(t) {
					return t && "function" === typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol": typeof t
				},
				pt(t)
			}
			function mt(t) {
				return bt(t) || gt(t) || yt(t) || vt()
			}
			function vt() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}
			function yt(t, e) {
				if (t) {
					if ("string" === typeof t) return kt(t, e);
					var n = Object.prototype.toString.call(t).slice(8, -1);
					return "Object" === n && t.constructor && (n = t.constructor.name),
					"Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? kt(t, e) : void 0
				}
			}
			function gt(t) {
				if ("undefined" !== typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t)
			}
			function bt(t) {
				if (Array.isArray(t)) return kt(t)
			}
			function kt(t, e) { (null == e || e > t.length) && (e = t.length);
				for (var n = 0,
				i = new Array(e); n < e; n++) i[n] = t[n];
				return i
			}
			function wt(t, e) {
				if (! (t instanceof e)) throw new TypeError("Cannot call a class as a function")
			}
			function Lt(t, e) {
				for (var n = 0; n < e.length; n++) {
					var i = e[n];
					i.enumerable = i.enumerable || !1,
					i.configurable = !0,
					"value" in i && (i.writable = !0),
					Object.defineProperty(t, i.key, i)
				}
			}
			function St(t, e, n) {
				return e && Lt(t.prototype, e),
				n && Lt(t, n),
				t
			}
			function At(t, e) {
				if ("function" !== typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
				t.prototype = Object.create(e && e.prototype, {
					constructor: {
						value: t,
						writable: !0,
						configurable: !0
					}
				}),
				e && xt(t, e)
			}
			function xt(t, e) {
				return xt = Object.setPrototypeOf ||
				function(t, e) {
					return t.__proto__ = e,
					t
				},
				xt(t, e)
			}
			function Mt(t) {
				var e = _t();
				return function() {
					var n, i = Pt(t);
					if (e) {
						var r = Pt(this).constructor;
						n = Reflect.construct(i, arguments, r)
					} else n = i.apply(this, arguments);
					return Ct(this, n)
				}
			}
			function Ct(t, e) {
				return ! e || "object" !== pt(e) && "function" !== typeof e ? Ot(t) : e
			}
			function Ot(t) {
				if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return t
			}
			function _t() {
				if ("undefined" === typeof Reflect || !Reflect.construct) return ! 1;
				if (Reflect.construct.sham) return ! 1;
				if ("function" === typeof Proxy) return ! 0;
				try {
					return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))),
					!0
				} catch(t) {
					return ! 1
				}
			}
			function Pt(t) {
				return Pt = Object.setPrototypeOf ? Object.getPrototypeOf: function(t) {
					return t.__proto__ || Object.getPrototypeOf(t)
				},
				Pt(t)
			}
			dt(ft, "distance", 15);
			var jt = function(t) {
				At(n, t);
				var e = Mt(n);
				function n(t) {
					var i;
					wt(this, n);
					var r = t.nodeList,
					o = void 0 === r ? [] : r,
					s = t.linkList,
					a = void 0 === s ? [] : s,
					u = t.origin;
					return i = e.call(this),
					i.nodeList = [],
					i.linkList = [],
					i.origin = u,
					i.mouseonLink = null,
					i.mouseonNode = null,
					i.graphSelected = !1,
					i.maskBoundingClientRect = {},
					i.initNode(o),
					i.initLink(a),
					i
				}
				return St(n, [{
					key: "pointMap",
					value: function() {
						var t = {};
						return this.nodeList.forEach((function(e) {
							t[e.id] = e
						})),
						t
					}
				},
				{
					key: "initNode",
					value: function(t) {
						var e = this;
						return H(this.nodeList, t.map((function(t) {
							return e.createNode(t)
						}))),
						this.nodeList
					}
				},
				{
					key: "initLink",
					value: function(t) {
						var e = this,
						n = [];
						return t.forEach((function(t) {
							var i = t.sourse,
							r = void 0 === i ? "": i,
							o = t.target,
							s = void 0 === o ? "": o,
							a = t.startAt,
							u = void 0 === a ? [0, 0] : a,
							l = t.endAt,
							c = void 0 === l ? [0, 0] : l,
							h = t.data,
							d = void 0 === h ? null: h,
							f = e.pointMap(),
							p = f[r],
							m = f[s];
							p && m && n.push(e.createLink({
								start: p,
								end: m,
								data: d,
								startAt: u,
								endAt: c,
								rules:t.rules||[],
							}))
						})),
						H(this.linkList, n),
						this.linkList
					}
				},
				{
					key: "createNode",
					value: function(t) {
						return new nt(t, this)
					}
				},
				{
					key: "createLink",
					value: function(t) {
						return new ft(t, this)
					}
				},
				{
					key: "addNode",
					value: function(t) {
						var e = t.constructor === nt ? t: this.createNode(t);
						return this.nodeList.push(e),
						e
					}
				},
				{
					key: "addLink",
					value: function(t) {
						var e = t.constructor === ft ? t: this.createLink(t),
						n = this.linkList.find((function(t) {
							return t.start === e.start && t.end === e.end
						}));
						return n ? (n.startAt = e.startAt, n.endAt = e.endAt) : e.start && e.end && this.linkList.push(e),
						e
					}
				},
				{
					key: "removeNode",
					value: function(t) {
						var e = this,
						n = this.nodeList.indexOf(t);
						return this.linkList.filter((function(e) {
							return e.start === t || e.end === t
						})).forEach((function(t) {
							e.removeLink(t)
						})),
						this.nodeList.splice(n, 1),
						t
					}
				},
				{
					key: "removeLink",
					value: function(t) {
						var e = this.linkList.indexOf(t);
						return this.linkList.splice(e, 1),
						this.mouseonLink === t && (this.mouseonLink = null),
						t
					}
				},
				{
					key: "toLastNode",
					value: function(t) {
						var e = this.nodeList;
						e.splice.apply(e, [e.length - 1, 0].concat(mt(e.splice(t, 1))))
					}
				},
				{
					key: "toLastLink",
					value: function(t) {
						var e = this.linkList;
						e.splice.apply(e, [e.length - 1, 0].concat(mt(e.splice(t, 1))))
					}
				},
				{
					key: "toJSON",
					value: function() {
						return {
							origin: this.origin,
							nodeList: this.nodeList.map((function(t) {
								return t.toJSON()
							})),
							linkList: this.linkList.map((function(t) {
								return t.toJSON()
							})),
						}
					}
				},
				{
					key: "selectAll",
					value: function() {
						var t = this.nodeList,
						e = 20;
						this.maskBoundingClientRect = {
							top: Math.min.apply(Math, mt(t.map((function(t) {
								return t.center[1] - t.height / 2
							})))) - e,
							right: Math.max.apply(Math, mt(t.map((function(t) {
								return t.center[0] + t.width / 2
							})))) + e,
							bottom: Math.max.apply(Math, mt(t.map((function(t) {
								return t.center[1] + t.height / 2
							})))) + e,
							left: Math.min.apply(Math, mt(t.map((function(t) {
								return t.center[0] - t.width / 2
							})))) - e
						},
						this.graphSelected = !0
					}
				}]),
				n
			} (g),
			$t = jt,
			Et = function() {
				var t = this,
				e = t.$createElement,
				n = t._self._c || e;
				return n("div", {
					staticClass: "super-flow__menu-container"
				},
				[n("div", {
					directives: [{
						name: "show",
						rawName: "v-show",
						value: t.visible,
						expression: "visible"
					}],
					staticClass: "flow__menu-mask",
					on: {
						mousemove: function(t) {
							t.stopPropagation(),
							t.preventDefault()
						},
						mousedown: t.close
					}
				}), n("ul", {
					directives: [{
						name: "show",
						rawName: "v-show",
						value: t.visible,
						expression: "visible"
					}],
					staticClass: "super-flow__menu",
					style: t.style,
					attrs: {
						tabindex: "-1"
					},
					on: {
						mousemove: function(t) {
							t.stopPropagation(),
							t.preventDefault()
						},
						contextmenu: function(t) {
							t.preventDefault(),
							t.stopPropagation()
						},
						blur: t.close
					}
				},
				//线的右键
				[t._l(t.list, (function(e) {
					return [t._l(e, (function(e) {
						return n("li", {
							staticClass: "super-flow__menu-item",
							class: {
								"is-disabled": e.disable
							},
							on: {
								click: function(n) {
									return t.select(e)
								}
							}
						},
						[t._t("default", [n("span", {
							staticClass: "super-flow__menu-item-icon"
						}), n("span", {
							staticClass: "super-flow__menu-item-content"
						},
						[t._v(" " + t._s(e.label) + " ")])], {
							item: e
						})], 2)
					})), n("li", {
						staticClass: "super-flow__menu-line"
					})]
				}))], 2)])
			},
			Nt = [],
			It = {
				props: {
					graph: Object,
					visible: {
						type: Boolean,
					default:
						!1
					},
					list: {
						type: Array,
					default:
						function() {
							return []
						}
					},
					position: {
						type: Array,
					default:
						function() {
							return [0, 0]
						}
					},
					source: {
						type: Object,
					default:
						function() {
							return {}
						}
					}
				},
				computed: {
					style: function() {
						return {
							left: this.position[0] + "px",
							top: this.position[1] + "px"
						}
					}
				},
				methods: {
					select: function(t) {
						t.disable || (this.$emit("update:visible", !1), t.selected(this.source, T(this.position).minus(this.graph.origin).end))
					},
					close: function(t) {
						this.$emit("update:visible", !1)
					}
				},
				watch: {
					visible: function() {
						var t = this;
						this.visible && this.$nextTick((function() {
							return t.$el.focus()
						}))
					}
				}
			},
			Dt = It;
			n("b8fb");
			function Tt(t, e, n, i, r, o, s, a) {
				var u, l = "function" === typeof t ? t.options: t;
				if (e && (l.render = e, l.staticRenderFns = n, l._compiled = !0), i && (l.functional = !0), o && (l._scopeId = "data-v-" + o), s ? (u = function(t) {
					t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext,
					t || "undefined" === typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__),
					r && r.call(this, t),
					t && t._registeredComponents && t._registeredComponents.add(s)
				},
				l._ssrRegister = u) : r && (u = a ?
				function() {
					r.call(this, (l.functional ? this.parent: this).$root.$options.shadowRoot)
				}: r), u) if (l.functional) {
					l._injectStyles = u;
					var c = l.render;
					l.render = function(t, e) {
						return u.call(e),
						c(t, e)
					}
				} else {
					var h = l.beforeCreate;
					l.beforeCreate = h ? [].concat(h, u) : [u]
				}
				return {
					exports: t,
					options: l
				}
			}
			var Bt = Tt(Dt, Et, Nt, !1, null, null, null),
			Rt = Bt.exports,
			Ft = function() {
				var t = this,
				e = t.$createElement,
				n = t._self._c || e;
				return n("div", {
					staticClass: "super-flow__node",
					class: {
						"can-move": t.nodeDrop
					},
					style: t.style,
					attrs: {
						tabindex: "-1"
					},
					on: {
						mousedown: function(e) {
							e = e || window.event;  
							if(e.stopPropagation) { //W3C阻止冒泡方法  
								e.stopPropagation();  
							} else {  
								e.cancelBubble = true; //IE阻止冒泡方法  
							}  
							return ! e.type.indexOf("key") && t._k(e.keyCode, "left", 37, e.key, ["Left", "ArrowLeft"]) || "button" in e && 0 !== e.button ? null: t.nodeMousedown(e)
						},
						mouseenter: t.nodeMouseenter,
						mouseleave: t.nodeMouseleave,
						mouseup: t.nodeMouseup,
						contextmenu: function(e) {
							return e.preventDefault(),
							e.stopPropagation(),
							t.nodeContextmenu(e)
						}
					}
				},
				[t._t("default", null, {
					data: t.node.data
				}), t._l(t.direction, (function(e, i) {
					return n("div", {
						directives: [{
							name: "show",
							rawName: "v-show",
							value: t.output && t.lineDrop,
							expression: "output && lineDrop"
						}],
						class: "node-side node-side-" + i,
						on: {
							contextmenu: function(t) {
								t.stopPropagation(),
								t.preventDefault()
							},
							mousedown: function(n) {
								return ! n.type.indexOf("key") && t._k(n.keyCode, "left", 37, n.key, ["Left", "ArrowLeft"]) || "button" in n && 0 !== n.button ? null: (n.preventDefault(), n.stopPropagation(),
								function(n) {
									return t.sideMousedown(n, e)
								} (n))
							}
						}
					})
				}))], 2)
			},
			Xt = [],
			Yt = {
				props: {
					graph: Object,
					node: Object,
					index: Number,
					isMove: Boolean,
					isTemEdge: Boolean,
					nodeIntercept: Function,
					lineDrop: Boolean,
					nodeDrop: Boolean
				},
				data: function() {
					return {
						direction: W,
						output: this.nodeIntercept()
					}
				},
				computed: {
					style: function() {
						var t = this.node,
						e = t.position,
						n = t.width,
						i = t.height;
						return {
							width: n + "px",
							height: i + "px",
							top: e[1] + "px",
							left: e[0] + "px"
						}
					}
				},
				methods: {
					//拖动节点后生成
					nodeMousedown: function(t) {
						this.graph.toLastNode(this.index),
						this.$emit("node-mousedown", this.node, M(t));
					},
					nodeMouseenter: function(t) {
						this.output = this.nodeIntercept(),
						this.graph.mouseonNode = this.node,
						this.isTemEdge && this.$emit("node-mouseenter", t, this.node, M(t, this.$el))
					},
					nodeMouseleave: function() {
						this.graph.mouseonNode = null,
						this.isTemEdge && this.$emit("node-mouseleave")
					},
					nodeMouseup: function() {
						this.isTemEdge && this.$emit("node-mouseup")
					},
					nodeContextmenu: function(t) {
						this.$emit("node-contextmenu", t, this.node)
					},
					sideMousedown: function(t) {
						this.$emit("side-mousedown", t, this.node, M(t, this.$el))
					}
				}
			},
			Ht = Yt,
			Ut = (n("2470"), Tt(Ht, Ft, Xt, !1, null, null, null)),
			Wt = Ut.exports,
			//线render函数
			Jt = function() {
				var t = this,
				e = t.$createElement,
				n = t._self._c || e;
				return n("canvas", {
					staticClass: "super-flow__line",
					on: {
						click: function(n) {
							t.clickLine();
						},
						mousedown:function(n,e){
							e = e || window.event;  
							if(e.stopPropagation) { //W3C阻止冒泡方法  
								e.stopPropagation();  
							} else {  
								e.cancelBubble = true; //IE阻止冒泡方法  
							}
							t.mousedownLink(e);
						},
						mouseup:function(n){
							t.mouseupLink(e);
						}
					}
				})
			},
			zt = [];
			function Gt(t, e) {
				return Kt(t) || qt(t, e) || te(t, e) || Vt()
			}
			function Vt() {
				throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}
			function qt(t, e) {
				if ("undefined" !== typeof Symbol && Symbol.iterator in Object(t)) {
					var n = [],
					i = !0,
					r = !1,
					o = void 0;
					try {
						for (var s, a = t[Symbol.iterator](); ! (i = (s = a.next()).done); i = !0) if (n.push(s.value), e && n.length === e) break
					} catch(u) {
						r = !0,
						o = u
					} finally {
						try {
							i || null == a["return"] || a["return"]()
						} finally {
							if (r) throw o
						}
					}
					return n
				}
			}
			function Kt(t) {
				if (Array.isArray(t)) return t
			}
			function Qt(t) {
				return ne(t) || ee(t) || te(t) || Zt()
			}
			function Zt() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}
			function te(t, e) {
				if (t) {
					if ("string" === typeof t) return ie(t, e);
					var n = Object.prototype.toString.call(t).slice(8, -1);
					return "Object" === n && t.constructor && (n = t.constructor.name),
					"Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ie(t, e) : void 0
				}
			}
			function ee(t) {
				if ("undefined" !== typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t)
			}
			function ne(t) {
				if (Array.isArray(t)) return ie(t)
			}
			function ie(t, e) { (null == e || e > t.length) && (e = t.length);
				for (var n = 0,
				i = new Array(e); n < e; n++) i[n] = t[n];
				return i
			}
			var re = {
				props: {
					padding: {
						type: Number,
					default:
						50
					},
					linkDesc: [Function, null],
					linkStyle: [Function, null],
					linkBaseStyle: Object,
					index: Number,
					graph: Object,
					link: Object
				},
				data: function() {
					return {
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
						currentPointList: [],
						currentPathPointList: null
					}
				},
				mounted: function() {
					var t = this;
					this.ctx = this.$el.getContext("2d"),
					this.draw(),
					this.graph.add("mousemove", this.rootMousemove),
					this.$once("hook:beforeDestroy", (function() {
						t.graph.remove("mousemove", t.rootMousemove)
					}))
				},
				computed: {
					styles: function() {
						return Object.assign({
							hover: "#FF0000",
							color: "#666666",
							textColor: "#666666",
							textHover: "#FF0000",
							font: "14px Arial",
							dotted: !1,
							lineDash: [4, 4],
							background: "rgba(255,255,255,0.6)"
						},
						this.linkBaseStyle)
					},
					inPath: {
						get: function() {
							return this.graph.mouseonLink === this.link
						},
						set: function(t) {
							t && !this.graph.mouseonNode ? (this.graph.mouseonLink = this.link, this.$el.style.zIndex = "1", this.graph.toLastLink(this.index)) : this.inPath && (this.graph.mouseonLink = null, this.$el.style.zIndex = "0")
						}
					}
				},
				methods: {
					draw: function() {
						var t = this,
						e = this.currentPathPointList = this.link.pathPointList,
						n = e.pointList,
						i = e.minX,
						r = e.minY,
						o = e.maxX,
						s = e.maxY;
						this.top = r - this.padding,
						this.right = o + this.padding,
						this.bottom = s + this.padding,
						this.left = i - this.padding,
						this.currentPointList = n.map((function(e) {
							return [Math.floor(e[0] - t.left), Math.floor(e[1] - t.top)]
						})),
						this.changeStyle(),
						this.initLine()
					},
					changeStyle: function() {
						this.$el.width = this.right - this.left,
						this.$el.height = this.bottom - this.top,
						this.$el.style.top = this.top + "px",
						this.$el.style.left = this.left + "px"
					},
					initLine: function() {
						if (this.ctx.clearRect(0, 0, this.$el.width, this.$el.height), this.linkStyle) {
							var t = this.linkStyle(this.link);
							Y(t) && Object.assign(this.styles, t)
						}
						if (this.inPath) {
							var e = this.styles.hover,
							n = this.styles.textHover;
							this.drawLine(e),
							this.drawDesc(n),
							this.drawArrow(e)
						} else {
							var i = this.styles.color,
							r = this.styles.textColor;
							this.drawLine(i),
							this.drawDesc(r),
							this.drawArrow(i)
						}
					},
					drawLine: function(t) {
						var e = 2,
						n = this.ctx;
						n.lineJoin = "round",
						n.beginPath(),
						this.styles.dotted && n.setLineDash(this.styles.lineDash),
						n.lineWidth = e,
						n.strokeStyle = t,
						this.currentPointList.forEach((function(t, e) {
							0 === e ? n.moveTo.apply(n, Qt(t)) : (n.lineTo.apply(n, Qt(t)), n.stroke())
						})),
						n.save()
					},
					drawDesc: function(t) {
						var e, n = this.ctx;
						if (R(this.linkDesc) && (e = this.linkDesc(this.link)), X(e)) {
							var i = this.styles,
							r = i.font,
							o = i.background;
							this.ctx.font = r,
							this.ctx.textAlign = "center",
							this.ctx.textBaseline = "middle";
							var s = this.descIntercept(e),
							a = s.text,
							u = s.width,
							l = parseInt(r.match(/(\d+px)/g)[0]),
							c = this.descPosition(),
							h = T(c).minus([u / 2, l / 2]).end;
							this.ctx.fillStyle = o,
							n.fillRect(h[0], h[1], u, l),
							this.ctx.fillStyle = t,
							n.fillText.apply(n, [a].concat(Qt(c)))
						}
					},
					descPosition: function() {
						var t = 0,
						e = 0,
						n = null;
						return this.currentPointList.reduce((function(e, n) {
							var i = T(e).minus(n).end;
							return t += Math.abs(i[0]) + Math.abs(i[1]),
							n
						})),
						this.currentPointList.reduce((function(i, r) {
							var o = T(i).minus(r).end,
							s = Math.abs(o[0]) + Math.abs(o[1]),
							a = e,
							u = t / 2;
							return e += s,
							e >= t / 2 && null === n && (n = i, n = i[0] === r[0] ? i[1] < r[1] ? T(i).add([0, u - a]).end: T(i).add([0, -(u - a)]).end: i[0] < r[0] ? T(i).add([u - a, 0]).end: T(i).add([ - (u - a), 0]).end),
							r
						})),
						n
					},
					descIntercept: function(t) {
						var e = this.ctx,
						n = e.measureText(t).width,
						i = 2 * this.padding - 10,
						r = "...",
						o = e.measureText(r).width;
						if (n <= i || i <= o) return {
							text: t,
							width: n
						};
						var s = t.length;
						while (n >= i - o && s-->0) t = t.slice(0, s),
						n = e.measureText(t).width;
						return {
							text: t + r,
							width: i + o
						}
					},
					drawArrow: function(t) {
						var e = 4,
						n = this.currentPointList.length;
						if (! (n < 2)) {
							var i = this.currentPointList[n - 2],
							r = this.currentPointList[n - 1],
							o = this.ctx;
							o.translate.apply(o, Qt(r));
							var s = Math.atan((r[0] - i[0]) / (r[1] - i[1]));
							o.beginPath(),
							r[1] - i[1] >= 0 ? o.rotate( - s) : o.rotate(Math.PI - s),
							o.fillStyle = t,
							o.lineTo( - e, 2 * -e),
							o.lineTo(0, -e),
							o.lineTo(e, 2 * -e),
							o.lineTo(0, 0),
							o.closePath(),
							o.fill(),
							o.restore()
						}
					},
					getCoordinates: function(t) {
						var e = t.clientX,
						n = t.clientY,
						i = this.$el.getBoundingClientRect(),
						r = i.top,
						o = i.left;
						return [e - o, n - r]
					},
					isPointInStroke: function(t) {
						var e = this.getCoordinates(t),
						n = Gt(e, 2),
						i = n[0],
						r = n[1];
						return this.link.isPointInLink([this.left + i, this.top + r], this.currentPathPointList)
					},
					rootMousemove: function(t) {
						var e = t.evt;
						return this.inPath = this.isPointInStroke(e),
						this.inPath
					},
					//点击线触发父级的回显线的方法
					clickLine: function(){
						var line = this.graph.mouseonLink
						this.$parent.$emit("line-mousedown",line);
						this.$parent.setLinkData(line);
					},
					mousedownLink: function(n){
						console.log('我拖动了线');
						var line = this.graph.mouseonLink
						this.$parent.setLinkData(line);
						this.$parent.moveTemEdge(n)
					},
					mouseupLink: function(n){
						console.log('我松开了线');	
					},
				},
				watch: {
					"link.pathPointList": function() {
						this.draw()
					},
					inPath: function() {
						this.initLine()
					},
					"link.data": {
						deep: !0,
						handler: function() {
							this.draw()
						}
					},
					linkBaseStyle: {
						deep: !0,
						handler: function() {
							this.draw()
						}
					}
				}
			},
			oe = re,
			se = (n("7e2d"), Tt(oe, Jt, zt, !1, null, null, null)),
			ae = se.exports,
			ue = function() {
				var t = this,
				e = t.$createElement,
				n = t._self._c || e;
				return n("canvas", {
					ref: "markLine",
					staticClass: "super-flow__mark-line"
				})
			},
			le = [];
			function ce(t) {
				return fe(t) || de(t) || ve(t) || he()
			}
			function he() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}
			function de(t) {
				if ("undefined" !== typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t)
			}
			function fe(t) {
				if (Array.isArray(t)) return ye(t)
			}
			function pe(t, e) {
				return be(t) || ge(t, e) || ve(t, e) || me()
			}
			function me() {
				throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}
			function ve(t, e) {
				if (t) {
					if ("string" === typeof t) return ye(t, e);
					var n = Object.prototype.toString.call(t).slice(8, -1);
					return "Object" === n && t.constructor && (n = t.constructor.name),
					"Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ye(t, e) : void 0
				}
			}
			function ye(t, e) { (null == e || e > t.length) && (e = t.length);
				for (var n = 0,
				i = new Array(e); n < e; n++) i[n] = t[n];
				return i
			}
			function ge(t, e) {
				if ("undefined" !== typeof Symbol && Symbol.iterator in Object(t)) {
					var n = [],
					i = !0,
					r = !1,
					o = void 0;
					try {
						for (var s, a = t[Symbol.iterator](); ! (i = (s = a.next()).done); i = !0) if (n.push(s.value), e && n.length === e) break
					} catch(u) {
						r = !0,
						o = u
					} finally {
						try {
							i || null == a["return"] || a["return"]()
						} finally {
							if (r) throw o
						}
					}
					return n
				}
			}
			function be(t) {
				if (Array.isArray(t)) return t
			}
			var ke = {
				props: {
					width: {
						type: Number,
					default:
						0
					},
					height: {
						type: Number,
					default:
						0
					},
					markLine: Array,
					markColor: String
				},
				mounted: function() {
					this.$refs.markLine.height = this.height,
					this.$refs.markLine.width = this.width,
					this.draw()
				},
				methods: {
					draw: function() {
						var t = this.$el.getContext("2d");
						t.clearRect(0, 0, this.width, this.height),
						t.strokeStyle = this.markColor,
						t.lineWidth = 1,
						t.setLineDash([4, 2]),
						this.markLine.forEach((function(e) {
							var n = pe(e, 2),
							i = n[0],
							r = n[1];
							t.beginPath(),
							t.moveTo.apply(t, ce(i)),
							t.lineTo.apply(t, ce(r)),
							t.stroke()
						}))
					}
				},
				watch: {
					markLine: function() {
						this.draw()
					}
				}
			},
			we = ke,
			Le = (n("bce9"), Tt(we, ue, le, !1, null, null, null)),
			Se = Le.exports;
			function Ae(t) {
				return Oe(t) || Ce(t) || Me(t) || xe()
			}
			function xe() {
				throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
			}
			function Me(t, e) {
				if (t) {
					if ("string" === typeof t) return _e(t, e);
					var n = Object.prototype.toString.call(t).slice(8, -1);
					return "Object" === n && t.constructor && (n = t.constructor.name),
					"Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? _e(t, e) : void 0
				}
			}
			function Ce(t) {
				if ("undefined" !== typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t)
			}
			function Oe(t) {
				if (Array.isArray(t)) return _e(t)
			}
			function _e(t, e) { (null == e || e > t.length) && (e = t.length);
				for (var n = 0,
				i = new Array(e); n < e; n++) i[n] = t[n];
				return i
			}
			function Pe(t, e) {
				var n = Object.keys(t);
				if (Object.getOwnPropertySymbols) {
					var i = Object.getOwnPropertySymbols(t);
					e && (i = i.filter((function(e) {
						return Object.getOwnPropertyDescriptor(t, e).enumerable
					}))),
					n.push.apply(n, i)
				}
				return n
			}
			function je(t) {
				for (var e = 1; e < arguments.length; e++) {
					var n = null != arguments[e] ? arguments[e] : {};
					e % 2 ? Pe(Object(n), !0).forEach((function(e) {
						$e(t, e, n[e])
					})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Pe(Object(n)).forEach((function(e) {
						Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
					}))
				}
				return t
			}
			function $e(t, e, n) {
				return e in t ? Object.defineProperty(t, e, {
					value: n,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : t[e] = n,
				t
			}
			var Ee = {
				name: "super-flow",
				props: {
					draggable: {
						type: Boolean,
					default:
						!0
					},
					linkAddable: {
						type: Boolean,
					default:
						!0
					},
					linkEditable: {
						type: Boolean,
					default:
						!0
					},
					hasMarkLine: {
						type: Boolean,
					default:
						!0
					},
					linkDesc: {
						type: [Function, null],
					default:
						null
					},
					linkStyle: {
						type: [Function, null],
					default:
						null
					},
					linkBaseStyle: {
						type: Object,
					default:
						function() {
							return {}
						}
					},
					markLineColor: {
						type: String,
					default:
						"#55abfc"
					},
					origin: {
						type: Array,
					default:
						function() {
							return [0, 0]
						}
					},
					nodeList: {
						type: Array,
					default:
						function() {
							return []
						}
					},
					linkList: {
						type: Array,
					default:
						function() {
							return []
						}
					},
					graphMenu: {
						type: Array,
					default:
						function() {
							return []
						}
					},
					nodeMenu: {
						type: Array,
					default:
						function() {
							return []
						}
					},
					linkMenu: {
						type: Array,
					default:
						function() {
							return []
						}
					},
					linkPadding: {
						type: Number,
					default:
						50
					},
					enterIntercept: {
						type: Function,
					default:
						function() {
							return ! 0
						}
					},
					outputIntercept: {
						type: Function,
					default:
						function() {
							return ! 0
						}
					}
				},
				data: function() {
					return {
						graph: new $t({
							width: this.width,
							height: this.height,
							origin: this.origin
						}),
						menuConf: {
							visible: !1,
							position: [0, 0],
							source: null,
							list: []
						},
						moveNodeConf: {
							isMove: !1,
							node: null,
							offset: null,
							verticalList: [],
							horizontalList: [],
							markLine: []
						},
						moveAllConf: {
							isMove: !1,
							downPosition: [0, 0]
						},
						temEdgeConf: {
							visible: !1,
							link: null,
							linkData:{}
						},
						loaded: !1,
						clientWidth: 0,
						clientHeight: 0
					}
				},
				components: {
					GraphMenu: Rt,
					GraphNode: Wt,
					GraphLine: ae,
					MarkLine: Se
				},
				computed: {
					maskStyle: function() {
						var t = this.graph.maskBoundingClientRect,
						e = t.top,
						n = t.right,
						i = t.bottom,
						r = t.left;
						return {
							width: "".concat(n - r, "px"),
							height: "".concat(i - e, "px"),
							top: "".concat(e + this.graph.origin[1], "px"),
							left: "".concat(r + this.graph.origin[0], "px")
						}
					}
				},
				mounted: function() {
					var t = this;
					document.addEventListener("mouseup", this.docMouseup),
					document.addEventListener("mousemove", this.docMousemove),
					this.$once("hook:beforeDestroy", (function() {
						document.removeEventListener("mouseup", t.docMouseup),
						document.removeEventListener("mousemove", t.docMousemove)
					})),
					this.$nextTick((function() {
						t.graph.initNode(t.nodeList),
						t.graph.initLink(t.linkList)
					}))
				},
				directives: {
					'superFlow': {
						bind(el, binding, vnode, oldNode) {
							if (!binding) {
								return
							}
							el.onmousedown = (e) => {
								if (e.button == 2) {
									// 右键不管
									return
								}
								//  鼠标按下，计算当前原始距离可视区的高度
								let disX = e.clientX
								let disY = e.clientY
								el.style.cursor = 'move'
								
								document.onmousemove = function (e) {
									// 移动时禁止默认事件
									e.preventDefault()
									const left = e.clientX - disX
									disX = e.clientX
									el.scrollLeft += -left
		
									const top = e.clientY - disY
									disY = e.clientY
									el.scrollTop += -top
								}
		
								document.onmouseup = function (e) {
									el.style.cursor = 'auto'
									document.onmousemove = null
									document.onmouseup = null
								}
							}
						}
					}
				},
				methods: {
					initMenu: function(t, e) {
						return t.map((function(t) {
							return t.map((function(t) {
								var n, i;
								return n = R(t.disable) ? t.disable(e) : F(t.disable) ? t.disable: Boolean(t.disable),
								i = R(t.hidden) ? t.hidden(e) : F(t.hidden) ? t.hidden: Boolean(t.hidden),
								je(je({},
								t), {},
								{
									disable: n,
									hidden: i
								})
							})).filter((function(t) {
								return ! t.hidden
							}))
						})).filter((function(t) {
							return t.length
						}))
					},
					showContextMenu: function(t, e, n) {
						e.length && (this.$set(this.menuConf, "position", t), this.$set(this.menuConf, "list", e), this.$set(this.menuConf, "source", n), this.menuConf.visible = !0)
					},
					docMouseup: function(t) {
						this.moveNodeConf.isMove && (t.stopPropagation(), t.preventDefault()),
						this.moveNodeConf.isMove = !1,
						this.moveNodeConf.node = null,
						this.moveNodeConf.offset = null,
						H(this.moveNodeConf.markLine, []),
						this.temEdgeConf.visible = !1,
						this.temEdgeConf.link = null,
						this.moveAllConf.isMove = !1
					},
					docMousemove: function(t) {
						this.moveNodeConf.isMove ? this.moveNode(t) : this.temEdgeConf.visible ? this.moveTemEdge(t) : this.graph.graphSelected ? this.moveWhole(t) : this.linkEditable && this.graph.dispatch({
							type: "mousemove",
							evt: t
						},
						!0)
					},
					moveNode: function(t) {
						var e = this,
						n = 10,
						i = this.moveNodeConf,
						r = this.graph.origin,
						o = T(i.offset).differ(M(t, this.$el)).minus(r).add([i.node.width / 2, i.node.height / 2]).end;
						if (this.hasMarkLine) {
							var s = [];
							i.verticalList.some((function(t) {
								var i = o[0],
								a = t - n < i && t + n > i;
								return a && (o[0] = t, t = Math.floor(t), t += r[0], t += t % 1 === 0 ? .5 : 0, s.push([[t, 0], [t, e.clientHeight]])),
								a
							})),
							i.horizontalList.some((function(t) {
								var i = o[1],
								a = t - n < i && t + n > i;
								return a && (o[1] = t, t = Math.floor(t), t += r[1], t += t % 1 === 0 ? .5 : 0, s.push([[0, t], [e.clientWidth, t]])),
								a
							})),
							H(i.markLine, s)
						}
						i.node.center = o
					},
					moveTemEdge: function(t) {
						this.temEdgeConf.link.movePosition = M(t, this.$el)
						var a = M(t, this.$el);
						console.log('startAt',this.temEdgeConf.link.startAt)
						console.log('endAt',this.temEdgeConf.link.endAt)
						console.log('movePosition',this.temEdgeConf.link.movePosition)
						console.log('link',this.temEdgeConf.link)
						//this.temEdgeConf.link.startDirection[0] =M(t, this.$el)
					},
					moveWhole: function(t) {
						if (this.moveAllConf.isMove) {
							var e = T(this.moveAllConf.downPosition).differ([t.clientX, t.clientY]).end;
							H(this.graph.origin, T(this.moveAllConf.origin).add(e).end)
						}
					},
					contextmenu: function(t) {
						var e, n, i = this.graph.mouseonLink,
						r = M(t);
						i && i.isPointInLink(r) ? (e = this.initMenu(this.linkMenu, i), n = i) : (i && (this.graph.mouseonLink = null), e = this.initMenu(this.graphMenu, this.graph), n = this.graph),
						this.showContextMenu(r, e, n)
					},
					nodeMousedown: function(t, e) {
						if (this.draggable) {
							this.clientWidth = this.$el.clientWidth,
							this.clientHeight = this.$el.clientHeight;
							var n = this.moveNodeConf.verticalList,
							i = this.moveNodeConf.horizontalList,
							r = this.graph.nodeList.filter((function(e) {
								return e !== t
							})).map((function(t) {
								return t.center
							}));
							H(n, Ae(new Set(r.map((function(t) {
								return t[0]
							})))).sort((function(t, e) {
								return t - e
							}))),
							H(i, Ae(new Set(r.map((function(t) {
								return t[1]
							})))).sort((function(t, e) {
								return t - e
							}))),
							this.moveNodeConf.isMove = !0,
							this.moveNodeConf.node = t,
							this.moveNodeConf.offset = e
							//触发拖动后回显
							this.$emit("node-mousedown",t,e);
						}
					},
					nodeMouseenter: function(t, e, n) {
						var i = this.temEdgeConf.link;
						this.enterIntercept(i.start, e, this.graph) && (i.end = e, i.endAt = n)
					},
					nodeMouseleave: function() {
						this.temEdgeConf.link.end = null
					},
					nodeMouseup: function() {
						var t = this.graph.addLink(this.temEdgeConf.link)
						this.$emit("line-mousedown",t);
					},
					nodeContextmenu: function(t, e) {
						var n = this.initMenu(this.nodeMenu, e);
						n.length && (this.$set(this.menuConf, "position", M(t, this.$el)), this.$set(this.menuConf, "list", n), this.$set(this.menuConf, "source", e), this.menuConf.visible = !0)
					},
					sideMousedown: function(t, e, n) {
						if (this.linkAddable) {
							var i = this.graph.createLink({
								start: e,
								startAt: n
							});
							i.movePosition = M(t, this.$el),
							this.$set(this.temEdgeConf, "link", i),
							this.temEdgeConf.visible = !0
						}
					},
					nodeIntercept: function(t) {
						var e = this;
						return function() {
							return e.outputIntercept(t, e.graph)
						}
					},
					menuItemSelect: function() {
						this.menuConf.visible = !1
					},
					selectAllMaskMouseDown: function(t) {
						this.moveAllConf.isMove = !0,
						this.moveAllConf.origin = Ae(this.graph.origin),
						this.moveAllConf.downPosition = [t.clientX, t.clientY]
					},
					selectedAll: function() {
						this.graph.selectAll()
					},
					toJSON: function() {
						return this.graph.toJSON()
					},
					getMouseCoordinate: function(t, e) {
						var n = M({
							clientX: t,
							clientY: e
						},
						this.$el);
						return T(n).minus(this.graph.origin).end
					},
					addNode: function(t) {
						var data = this.graph.addNode(t);
						//生产节点后回显
						if(data.id){
							this.$emit("node-mousedown",data);
						}
						return data;
					},
					setLinkData: function(t){
						this.$set(this.temEdgeConf, "link", t),
						this.temEdgeConf.visible = !0
					}
				},
				watch: {
					"graph.graphSelected": function() {
						var t = this;
						this.graph.graphSelected && this.$nextTick((function() {
							t.$refs.selectAllMask.focus()
						}))
					},
					"graph.mouseonLink": function() {
						this.graph.mouseonLink ? document.body.style.cursor = "pointer": document.body.style.cursor = ""
					},
					origin: function() {
						this.graph.origin = this.origin || []
					},
					nodeList: function() {
						this.graph.initNode(this.nodeList)
					},
					linkList: function() {
						this.graph.initLink(this.linkList)
					}
				},
				install: function(t) {
					t.component(this.name, this)
				}
			},
			Ne = Ee,
			Ie = (n("3ad9"), Tt(Ne, s, a, !1, null, null, null)),
			De = Ie.exports;
			e["default"] = De
		}
	})["default"]
}));