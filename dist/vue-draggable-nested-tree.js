/*!
 * vue-draggable-nested-tree v2.2.20
 * (c) 2018-present phphe <phphe@outlook.com>
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.vueDraggableNestedTree = {})));
}(this, (function (exports) { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.12' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _library = false;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: _library ? 'pure' : 'global',
	  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wks('unscopables');
	var ArrayProto = Array.prototype;
	if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
	var _addToUnscopables = function (key) {
	  ArrayProto[UNSCOPABLES][key] = true;
	};

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	var _iterators = {};

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var _functionToString = _shared('native-function-to-string', Function.toString);

	var _redefine = createCommonjsModule(function (module) {
	var SRC = _uid('src');

	var TO_STRING = 'toString';
	var TPL = ('' + _functionToString).split(TO_STRING);

	_core.inspectSource = function (it) {
	  return _functionToString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === _global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
	});
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // extend global
	    if (target) _redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) _hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	_global.core = _core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var def = _objectDp.f;

	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if (BUGGY || VALUES_BUG || !proto[ITERATOR]) {
	    _hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	_addToUnscopables('keys');
	_addToUnscopables('values');
	_addToUnscopables('entries');

	var ITERATOR$1 = _wks('iterator');
	var TO_STRING_TAG = _wks('toStringTag');
	var ArrayValues = _iterators.Array;

	var DOMIterables = {
	  CSSRuleList: true, // TODO: Not spec compliant, should be false.
	  CSSStyleDeclaration: false,
	  CSSValueList: false,
	  ClientRectList: false,
	  DOMRectList: false,
	  DOMStringList: false,
	  DOMTokenList: true,
	  DataTransferItemList: false,
	  FileList: false,
	  HTMLAllCollection: false,
	  HTMLCollection: false,
	  HTMLFormElement: false,
	  HTMLSelectElement: false,
	  MediaList: true, // TODO: Not spec compliant, should be false.
	  MimeTypeArray: false,
	  NamedNodeMap: false,
	  NodeList: true,
	  PaintRequestList: false,
	  Plugin: false,
	  PluginArray: false,
	  SVGLengthList: false,
	  SVGNumberList: false,
	  SVGPathSegList: false,
	  SVGPointList: false,
	  SVGStringList: false,
	  SVGTransformList: false,
	  SourceBufferList: false,
	  StyleSheetList: true, // TODO: Not spec compliant, should be false.
	  TextTrackCueList: false,
	  TextTrackList: false,
	  TouchList: false
	};

	for (var collections = _objectKeys(DOMIterables), i = 0; i < collections.length; i++) {
	  var NAME = collections[i];
	  var explicit = DOMIterables[NAME];
	  var Collection = _global[NAME];
	  var proto = Collection && Collection.prototype;
	  var key;
	  if (proto) {
	    if (!proto[ITERATOR$1]) _hide(proto, ITERATOR$1, ArrayValues);
	    if (!proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
	    _iterators[NAME] = ArrayValues;
	    if (explicit) for (key in es6_array_iterator) if (!proto[key]) _redefine(proto, key, es6_array_iterator[key], true);
	  }
	}

	var f$1 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$1
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$2 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$2
	};

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */


	var check = function (O, proto) {
	  _anObject(O);
	  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

	var setPrototypeOf = _setProto.set;
	var _inheritIfRequired = function (that, target, C) {
	  var S = target.constructor;
	  var P;
	  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf) {
	    setPrototypeOf(that, P);
	  } return that;
	};

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$3
	};

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var space = '[' + _stringWs + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = _fails(function () {
	    return !!_stringWs[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  _export(_export.P + _export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(_defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	var _stringTrim = exporter;

	var gOPN = _objectGopn.f;
	var gOPD$1 = _objectGopd.f;
	var dP$1 = _objectDp.f;
	var $trim = _stringTrim.trim;
	var NUMBER = 'Number';
	var $Number = _global[NUMBER];
	var Base = $Number;
	var proto$1 = $Number.prototype;
	// Opera ~12 has broken Object#toString
	var BROKEN_COF = _cof(_objectCreate(proto$1)) == NUMBER;
	var TRIM = 'trim' in String.prototype;

	// 7.1.3 ToNumber(argument)
	var toNumber = function (argument) {
	  var it = _toPrimitive(argument, false);
	  if (typeof it == 'string' && it.length > 2) {
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0);
	    var third, radix, maxCode;
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default: return +it;
	      }
	      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
	  $Number = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? _fails(function () { proto$1.valueOf.call(that); }) : _cof(that) != NUMBER)
	        ? _inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for (var keys = _descriptors ? gOPN(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j = 0, key$1; keys.length > j; j++) {
	    if (_has(Base, key$1 = keys[j]) && !_has($Number, key$1)) {
	      dP$1($Number, key$1, gOPD$1(Base, key$1));
	    }
	  }
	  $Number.prototype = proto$1;
	  proto$1.constructor = $Number;
	  _redefine(_global, NUMBER, $Number);
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	var assertThisInitialized = _assertThisInitialized;

	var getPrototypeOf = createCommonjsModule(function (module) {
	function _getPrototypeOf(o) {
	  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	module.exports = _getPrototypeOf;
	});

	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = getPrototypeOf(object);
	    if (object === null) break;
	  }

	  return object;
	}

	var superPropBase = _superPropBase;

	var get = createCommonjsModule(function (module) {
	function _get(target, property, receiver) {
	  if (typeof Reflect !== "undefined" && Reflect.get) {
	    module.exports = _get = Reflect.get;
	  } else {
	    module.exports = _get = function _get(target, property, receiver) {
	      var base = superPropBase(target, property);
	      if (!base) return;
	      var desc = Object.getOwnPropertyDescriptor(base, property);

	      if (desc.get) {
	        return desc.get.call(receiver);
	      }

	      return desc.value;
	    };
	  }

	  return _get(target, property, receiver || target);
	}

	module.exports = _get;
	});

	var setPrototypeOf$1 = createCommonjsModule(function (module) {
	function _setPrototypeOf(o, p) {
	  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	module.exports = _setPrototypeOf;
	});

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) setPrototypeOf$1(subClass, superClass);
	}

	var inherits = _inherits;

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return typeof obj;
	    };
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	module.exports = _typeof;
	});

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return assertThisInitialized(self);
	}

	var possibleConstructorReturn = _possibleConstructorReturn;

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }

	  return arr2;
	}

	var arrayLikeToArray = _arrayLikeToArray;

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
	}

	var unsupportedIterableToArray = _unsupportedIterableToArray;

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	var defineProperty = _defineProperty;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	var createClass = _createClass;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

	var runtime_1 = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var runtime = (function (exports) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  function define(obj, key, value) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	    return obj[key];
	  }
	  try {
	    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
	    define({}, "");
	  } catch (err) {
	    define = function(obj, key, value) {
	      return obj[key] = value;
	    };
	  }

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  exports.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = define(
	    GeneratorFunctionPrototype,
	    toStringTagSymbol,
	    "GeneratorFunction"
	  );

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      define(prototype, method, function(arg) {
	        return this._invoke(method, arg);
	      });
	    });
	  }

	  exports.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  exports.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      define(genFun, toStringTagSymbol, "GeneratorFunction");
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  exports.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator, PromiseImpl) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return PromiseImpl.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return PromiseImpl.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration.
	          result.value = unwrapped;
	          resolve(result);
	        }, function(error) {
	          // If a rejected Promise was yielded, throw the rejection back
	          // into the async generator function so it can be handled there.
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new PromiseImpl(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  exports.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
	    if (PromiseImpl === void 0) PromiseImpl = Promise;

	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList),
	      PromiseImpl
	    );

	    return exports.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        // Note: ["return"] must be used for ES3 parsing compatibility.
	        if (delegate.iterator["return"]) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  define(Gp, toStringTagSymbol, "Generator");

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  exports.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  exports.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined;
	      }

	      return ContinueSentinel;
	    }
	  };

	  // Regardless of whether this script is executing as a CommonJS module
	  // or not, return the runtime object so that we can declare the variable
	  // regeneratorRuntime in the outer scope, which allows this module to be
	  // injected easily by `bin/regenerator --include-runtime script.js`.
	  return exports;

	}(
	  // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	  module.exports
	));

	try {
	  regeneratorRuntime = runtime;
	} catch (accidentalStrictMode) {
	  // This module should not be running in strict mode, so the above
	  // assignment should always work unless something is misconfigured. Just
	  // in case runtime.js accidentally runs in strict mode, we can escape
	  // strict mode using a global Function call. This could conceivably fail
	  // if a Content Security Policy forbids using Function, but in that case
	  // the proper solution is to fix the accidental strict mode problem. If
	  // you've misconfigured your bundler to force strict mode and applied a
	  // CSP to forbid Function, and you're not willing to fix either of those
	  // problems, please detail your unique predicament in a GitHub issue.
	  Function("r", "regeneratorRuntime = r")(runtime);
	}
	});

	var regenerator = runtime_1;

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) return arrayLikeToArray(arr);
	}

	var arrayWithoutHoles = _arrayWithoutHoles;

	function _iterableToArray(iter) {
	  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
	}

	var iterableToArray = _iterableToArray;

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	var nonIterableSpread = _nonIterableSpread;

	function _toConsumableArray(arr) {
	  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
	}

	var toConsumableArray = _toConsumableArray;

	/*!
	 * helper-js v1.4.38
	 * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
	 * Homepage: undefined
	 * Released under the MIT License.
	 */

	function _createSuper(Derived) { return function () { var Super = getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var _marked = /*#__PURE__*/regenerator.mark(iterateAll);

	function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray$1(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

	function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

	function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

	// local store
	var store = {}; // get global
	// `this` !== global or window because of build tool

	function glb() {
	  if (store.glb) {
	    return store.glb;
	  } else {
	    // resolve global
	    var t;

	    try {
	      t = global;
	    } catch (e) {
	      t = window;
	    }

	    store.glb = t;
	    return t;
	  }
	}
	function isArray(v) {
	  return Object.prototype.toString.call(v) === '[object Array]';
	}
	function isObject(v) {
	  return Object.prototype.toString.call(v) === '[object Object]';
	}

	function numRand(min, max) {
	  if (arguments.length === 1) {
	    max = min;
	    min = 0;
	  }

	  return Math.floor(Math.random() * (max - min + 1) + min);
	}
	function strRand() {
	  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
	  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	  var r = '';
	  var seeds = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	  for (var i = 0; i < len; i++) {
	    r += seeds[numRand(seeds.length - 1)];
	  }

	  return prefix + r;
	}

	function arrayRemove(arr, v) {
	  var index;
	  var count = 0;

	  while ((index = arr.indexOf(v)) > -1) {
	    arr.splice(index, 1);
	    count++;
	  }

	  return count;
	}
	function arrayLast(arr) {
	  return arr[arr.length - 1];
	}

	function iterateAll(val) {
	  var opt,
	      i,
	      info,
	      _i7,
	      _Object$keys2,
	      key,
	      _info,
	      _i8,
	      _info2,
	      keys,
	      _i9,
	      _keys2,
	      _key2,
	      _info3,
	      _args = arguments;

	  return regenerator.wrap(function iterateAll$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          opt = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};

	          if (opt.reverse) {
	            _context.next = 30;
	            break;
	          }

	          if (!(val.length != null)) {
	            _context.next = 14;
	            break;
	          }

	          i = 0;

	        case 4:
	          if (!(i < val.length)) {
	            _context.next = 12;
	            break;
	          }

	          info = {
	            value: val[i],
	            index: i
	          };

	          if (!(!opt.exclude || !opt.exclude(info))) {
	            _context.next = 9;
	            break;
	          }

	          _context.next = 9;
	          return info;

	        case 9:
	          i++;
	          _context.next = 4;
	          break;

	        case 12:
	          _context.next = 28;
	          break;

	        case 14:
	          if (!isObject(val)) {
	            _context.next = 27;
	            break;
	          }

	          _i7 = 0, _Object$keys2 = Object.keys(val);

	        case 16:
	          if (!(_i7 < _Object$keys2.length)) {
	            _context.next = 25;
	            break;
	          }

	          key = _Object$keys2[_i7];
	          _info = {
	            value: val[key],
	            key: key
	          };

	          if (!(!opt.exclude || !opt.exclude(_info))) {
	            _context.next = 22;
	            break;
	          }

	          _context.next = 22;
	          return _info;

	        case 22:
	          _i7++;
	          _context.next = 16;
	          break;

	        case 25:
	          _context.next = 28;
	          break;

	        case 27:
	          throw 'Unsupported type';

	        case 28:
	          _context.next = 58;
	          break;

	        case 30:
	          if (!(val.length != null)) {
	            _context.next = 42;
	            break;
	          }

	          _i8 = val.length - 1;

	        case 32:
	          if (!(_i8 >= 0)) {
	            _context.next = 40;
	            break;
	          }

	          _info2 = {
	            value: val[_i8],
	            index: _i8
	          };

	          if (!(!opt.exclude || !opt.exclude(_info2))) {
	            _context.next = 37;
	            break;
	          }

	          _context.next = 37;
	          return _info2;

	        case 37:
	          _i8--;
	          _context.next = 32;
	          break;

	        case 40:
	          _context.next = 58;
	          break;

	        case 42:
	          if (!isObject(val)) {
	            _context.next = 57;
	            break;
	          }

	          keys = Object.keys(val);
	          keys.reverse();
	          _i9 = 0, _keys2 = keys;

	        case 46:
	          if (!(_i9 < _keys2.length)) {
	            _context.next = 55;
	            break;
	          }

	          _key2 = _keys2[_i9];
	          _info3 = {
	            value: val[_key2],
	            key: _key2
	          };

	          if (!(!opt.exclude || !opt.exclude(_info3))) {
	            _context.next = 52;
	            break;
	          }

	          _context.next = 52;
	          return _info3;

	        case 52:
	          _i9++;
	          _context.next = 46;
	          break;

	        case 55:
	          _context.next = 58;
	          break;

	        case 57:
	          throw 'Unsupported type';

	        case 58:
	        case "end":
	          return _context.stop();
	      }
	    }
	  }, _marked);
	} // Deprecated in next version
	// Depth-First-Search
	// TODO change args in next version

	function depthFirstSearch(obj, handler) {
	  var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
	  var reverse = arguments.length > 3 ? arguments[3] : undefined;
	  var rootChildren = isArray(obj) ? obj : [obj]; //

	  var StopException = function StopException() {
	    classCallCheck(this, StopException);
	  };

	  var func = function func(children, parent, parentPath) {
	    if (reverse) {
	      children = children.slice();
	      children.reverse();
	    }

	    var len = children.length;

	    for (var i = 0; i < len; i++) {
	      var item = children[i];
	      var index = reverse ? len - i - 1 : i;
	      var path = parentPath ? [].concat(toConsumableArray(parentPath), [index]) : []; // TODO change args in next version

	      var r = handler(item, index, parent, path);

	      if (r === false) {
	        // stop
	        throw new StopException();
	      } else if (r === 'skip children') {
	        continue;
	      } else if (r === 'skip siblings') {
	        break;
	      }

	      if (item[childrenKey] != null) {
	        func(item[childrenKey], item, path);
	      }
	    }
	  };

	  try {
	    func(rootChildren, null, isArray(obj) ? [] : null);
	  } catch (e) {
	    if (e instanceof StopException) ; else {
	      throw e;
	    }
	  }
	}
	var walkTreeData = depthFirstSearch;
	var TreeData = /*#__PURE__*/function () {
	  // data = null;
	  function TreeData(data) {
	    classCallCheck(this, TreeData);

	    this.childrenKey = 'children';
	    this.data = data;
	  }

	  createClass(TreeData, [{
	    key: "iteratePath",
	    value: /*#__PURE__*/regenerator.mark(function iteratePath(path) {
	      var opt,
	          childrenKey,
	          rootChildren,
	          prevPath,
	          prevChildren,
	          _iterator5,
	          _step5,
	          index,
	          currentPath,
	          currentNode,
	          list,
	          _iterator6,
	          _step6,
	          _step6$value,
	          _path,
	          node,
	          _args2 = arguments;

	      return regenerator.wrap(function iteratePath$(_context2) {
	        while (1) {
	          switch (_context2.prev = _context2.next) {
	            case 0:
	              opt = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
	              childrenKey = this.childrenKey, rootChildren = this.rootChildren;

	              if (opt.reverse) {
	                _context2.next = 29;
	                break;
	              }

	              prevPath = [];
	              prevChildren = rootChildren;
	              _iterator5 = _createForOfIteratorHelper(path);
	              _context2.prev = 6;

	              _iterator5.s();

	            case 8:
	              if ((_step5 = _iterator5.n()).done) {
	                _context2.next = 19;
	                break;
	              }

	              index = _step5.value;
	              currentPath = [].concat(toConsumableArray(prevPath), [index]);
	              currentNode = prevChildren[index];
	              _context2.next = 14;
	              return {
	                path: currentPath,
	                node: currentNode
	              };

	            case 14:
	              prevPath = currentPath;
	              prevChildren = currentNode[childrenKey];

	            case 17:
	              _context2.next = 8;
	              break;

	            case 19:
	              _context2.next = 24;
	              break;

	            case 21:
	              _context2.prev = 21;
	              _context2.t0 = _context2["catch"](6);

	              _iterator5.e(_context2.t0);

	            case 24:
	              _context2.prev = 24;

	              _iterator5.f();

	              return _context2.finish(24);

	            case 27:
	              _context2.next = 48;
	              break;

	            case 29:
	              list = toConsumableArray(this.iteratePath(path, _objectSpread({}, opt, {
	                reverse: false
	              })));
	              list.reverse();
	              _iterator6 = _createForOfIteratorHelper(list);
	              _context2.prev = 32;

	              _iterator6.s();

	            case 34:
	              if ((_step6 = _iterator6.n()).done) {
	                _context2.next = 40;
	                break;
	              }

	              _step6$value = _step6.value, _path = _step6$value.path, node = _step6$value.node;
	              _context2.next = 38;
	              return {
	                path: _path,
	                node: node
	              };

	            case 38:
	              _context2.next = 34;
	              break;

	            case 40:
	              _context2.next = 45;
	              break;

	            case 42:
	              _context2.prev = 42;
	              _context2.t1 = _context2["catch"](32);

	              _iterator6.e(_context2.t1);

	            case 45:
	              _context2.prev = 45;

	              _iterator6.f();

	              return _context2.finish(45);

	            case 48:
	            case "end":
	              return _context2.stop();
	          }
	        }
	      }, iteratePath, this, [[6, 21, 24, 27], [32, 42, 45, 48]]);
	    })
	  }, {
	    key: "getAllNodes",
	    value: function getAllNodes(path) {
	      var all = [];

	      var _iterator7 = _createForOfIteratorHelper(this.iteratePath(path)),
	          _step7;

	      try {
	        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
	          var node = _step7.value.node;
	          all.push(node);
	        }
	      } catch (err) {
	        _iterator7.e(err);
	      } finally {
	        _iterator7.f();
	      }

	      return all;
	    }
	  }, {
	    key: "getNode",
	    value: function getNode(path) {
	      return arrayLast(this.getAllNodes(path));
	    }
	  }, {
	    key: "getNodeIndexAndParent",
	    value: function getNodeIndexAndParent(path) {
	      var parentPath = path.slice();
	      var index = parentPath.pop();
	      return {
	        parent: this.getNode(parentPath),
	        index: index,
	        parentPath: parentPath
	      };
	    }
	  }, {
	    key: "getNodeParent",
	    value: function getNodeParent(path) {
	      return this.getNodeIndexAndParent(path).parent;
	    }
	  }, {
	    key: "setPathNode",
	    value: function setPathNode(path, node) {
	      if (path == null || path.length === 0) {
	        this.data = node;
	      } else {
	        var childrenKey = this.childrenKey,
	            rootChildren = this.rootChildren;

	        var _this$getNodeIndexAnd = this.getNodeIndexAndParent(path),
	            parent = _this$getNodeIndexAnd.parent,
	            index = _this$getNodeIndexAnd.index;

	        var parentChildren = path.length === 1 ? rootChildren : parent[childrenKey];
	        parentChildren[index] = node;
	      }
	    }
	  }, {
	    key: "removeNode",
	    value: function removeNode(path) {
	      var childrenKey = this.childrenKey,
	          rootChildren = this.rootChildren;

	      var _this$getNodeIndexAnd2 = this.getNodeIndexAndParent(path),
	          parent = _this$getNodeIndexAnd2.parent,
	          index = _this$getNodeIndexAnd2.index;

	      var parentChildren = path.length === 1 ? rootChildren : parent[childrenKey];
	      var node = parentChildren[index];
	      parentChildren.splice(index, 1);
	      return node;
	    }
	  }, {
	    key: "walk",
	    value: function walk(handler) {
	      var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var childrenKey = this.childrenKey,
	          data = this.data; // TODO change args in next version

	      return walkTreeData(data, handler, childrenKey, opt.reverse);
	    }
	  }, {
	    key: "clone",
	    value: function clone() {
	      var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      // opt.afterNodeCreated(newNode, {oldNode: node, index, parent, path})
	      // TODO change args in next version
	      var childrenKey = this.childrenKey;
	      var td = new TreeData();
	      this.walk(function (node, index, parent, path) {
	        var newNode = Object.assign({}, node);

	        if (newNode[childrenKey]) {
	          newNode[childrenKey] = [];
	        }

	        if (opt.afterNodeCreated) {
	          opt.afterNodeCreated(newNode, {
	            oldNode: node,
	            index: index,
	            parent: parent,
	            path: path
	          });
	        }

	        td.setPathNode(path, newNode);
	      });
	      return td.data;
	    }
	  }, {
	    key: "rootChildren",
	    get: function get$$1() {
	      var childrenKey = this.childrenKey;

	      if (!this.data) {
	        this.data = [];
	      }

	      var data = this.data;
	      return isArray(data) ? data : data[childrenKey];
	    }
	  }]);

	  return TreeData;
	}(); // function helper | method helper ============================

	function getScroll() {
	  if (typeof pageYOffset != 'undefined') {
	    //most browsers except IE before #9
	    return {
	      top: pageYOffset,
	      left: pageXOffset
	    };
	  } else {
	    var B = document.body; //IE 'quirks'

	    var D = document.documentElement; //IE with doctype

	    D = D.clientHeight ? D : B;
	    return {
	      top: D.scrollTop,
	      left: D.scrollLeft
	    };
	  }
	} // refer: https://gist.github.com/aderaaij/89547e34617b95ac29d1

	function getOffset(el) {
	  var rect = getBoundingClientRect(el);
	  var scroll = getScroll();
	  return {
	    x: rect.left + scroll.left,
	    y: rect.top + scroll.top
	  };
	} // there is some trap in el.offsetParent, so use this func to fix

	function getOffsetParent(el) {
	  var offsetParent = el.offsetParent;

	  if (!offsetParent || offsetParent === document.body && getComputedStyle(document.body).position === 'static') {
	    offsetParent = document.body.parentElement;
	  }

	  return offsetParent;
	} // get el current position. like jQuery.position
	// the position is relative to offsetParent viewport left top. it is for set absolute position, absolute position is relative to offsetParent viewport left top.
	// 相对于offsetParent可视区域左上角(el.offsetLeft或top包含父元素的滚动距离, 所以要减去). position一般用于设置绝对定位的情况, 而绝对定位就是以可视区域左上角为原点.

	function getPosition(el) {
	  var offsetParent = getOffsetParent(el);
	  var ps = {
	    x: el.offsetLeft,
	    y: el.offsetTop
	  };
	  var parent = el;

	  while (true) {
	    parent = parent.parentElement;

	    if (parent === offsetParent || !parent) {
	      break;
	    }

	    ps.x -= parent.scrollLeft;
	    ps.y -= parent.scrollTop;
	  }

	  return ps;
	} // get position of a el if its offset is given. like jQuery.offset.
	function getBoundingClientRect(el) {
	  // refer: http://www.51xuediannao.com/javascript/getBoundingClientRect.html
	  var xy = el.getBoundingClientRect();
	  var top = xy.top - document.documentElement.clientTop,
	      //document.documentElement.clientTop 在IE67中始终为2，其他高级点的浏览器为0
	  bottom = xy.bottom,
	      left = xy.left - document.documentElement.clientLeft,
	      //document.documentElement.clientLeft 在IE67中始终为2，其他高级点的浏览器为0
	  right = xy.right,
	      width = xy.width || right - left,
	      //IE67不存在width 使用right - left获得
	  height = xy.height || bottom - top;
	  var x = left;
	  var y = top;
	  return {
	    top: top,
	    right: right,
	    bottom: bottom,
	    left: left,
	    width: width,
	    height: height,
	    x: x,
	    y: y
	  };
	}
	function backupAttr(el, name) {
	  var key = "original_".concat(name);
	  el[key] = el.getAttribute(name);
	}
	function restoreAttr(el, name) {
	  var key = "original_".concat(name);
	  el.setAttribute(name, el[key]);
	} // source: http://youmightnotneedjquery.com/

	function hasClass(el, className) {
	  if (el.classList) {
	    return el.classList.contains(className);
	  } else {
	    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
	  }
	} // source: http://youmightnotneedjquery.com/

	function addClass(el, className) {
	  if (!hasClass(el, className)) {
	    if (el.classList) {
	      el.classList.add(className);
	    } else {
	      el.className += ' ' + className;
	    }
	  }
	} // source: http://youmightnotneedjquery.com/

	function getElSize(el) {
	  backupAttr(el, 'style');
	  el.style.display = 'block';
	  var t = getBoundingClientRect(el);
	  var size = {
	    width: t.width,
	    height: t.height
	  };
	  restoreAttr(el, 'style');
	  return size;
	}

	function onDOM(el, name, handler) {
	  for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key8 = 3; _key8 < _len6; _key8++) {
	    args[_key8 - 3] = arguments[_key8];
	  }

	  if (el.addEventListener) {
	    // 所有主流浏览器，除了 IE 8 及更早 IE版本
	    el.addEventListener.apply(el, [name, handler].concat(args));
	  } else if (el.attachEvent) {
	    // IE 8 及更早 IE 版本
	    el.attachEvent.apply(el, ["on".concat(name), handler].concat(args));
	  }
	}
	function offDOM(el, name, handler) {
	  for (var _len7 = arguments.length, args = new Array(_len7 > 3 ? _len7 - 3 : 0), _key9 = 3; _key9 < _len7; _key9++) {
	    args[_key9 - 3] = arguments[_key9];
	  }

	  if (el.removeEventListener) {
	    // 所有主流浏览器，除了 IE 8 及更早 IE版本
	    el.removeEventListener.apply(el, [name, handler].concat(args));
	  } else if (el.detachEvent) {
	    // IE 8 及更早 IE 版本
	    el.detachEvent.apply(el, ["on".concat(name), handler].concat(args));
	  }
	}
	// binarySearch 二分查找
	// callback(mid, i) should return mid - your_value

	function binarySearch(arr, callback, start, end, returnNearestIfNoHit) {
	  var max = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1000;
	  var midNum;
	  var mid;

	  if (start == null) {
	    start = 0;
	    end = arr.length - 1;
	  }

	  var i = 0;
	  var r;

	  while (start >= 0 && start <= end) {
	    if (i >= max) {
	      throw Error("binarySearch: loop times is over ".concat(max, ", you can increase the limit."));
	    }

	    midNum = Math.floor((end - start) / 2 + start);
	    mid = arr[midNum];
	    r = callback(mid, i);

	    if (r > 0) {
	      end = midNum - 1;
	    } else if (r < 0) {
	      start = midNum + 1;
	    } else {
	      return {
	        index: midNum,
	        value: mid,
	        count: i + 1,
	        hit: true
	      };
	    }

	    i++;
	  }

	  return returnNearestIfNoHit ? {
	    index: midNum,
	    value: mid,
	    count: i + 1,
	    hit: false,
	    bigger: r > 0
	  } : null;
	} //
	function waitTime(milliseconds, callback) {
	  return new Promise(function (resolve, reject) {
	    setTimeout(function () {
	      callback && callback();
	      resolve();
	    }, milliseconds);
	  });
	} // overload waitFor(condition, time = 100, maxCount = 1000))
	var URLHelper = /*#__PURE__*/function () {
	  // protocol, hostname, port, pastname
	  function URLHelper(baseUrl) {
	    var _this3 = this;

	    classCallCheck(this, URLHelper);

	    this.baseUrl = '';
	    this.search = {};
	    var t = decodeURI(baseUrl).split('?');
	    this.baseUrl = t[0];

	    if (t[1]) {
	      t[1].split('&').forEach(function (v) {
	        var t2 = v.split('=');
	        _this3.search[t2[0]] = t2[1] == null ? '' : decodeURIComponent(t2[1]);
	      });
	    }
	  }

	  createClass(URLHelper, [{
	    key: "getHref",
	    value: function getHref() {
	      var _this4 = this;

	      var t = [this.baseUrl];
	      var searchStr = Object.keys(this.search).map(function (k) {
	        return "".concat(k, "=").concat(encodeURIComponent(_this4.search[k]));
	      }).join('&');

	      if (searchStr) {
	        t.push(searchStr);
	      }

	      return t.join('?');
	    }
	  }]);

	  return URLHelper;
	}(); // 解析函数参数, 帮助重载

	var EventProcessor = /*#__PURE__*/function () {
	  function EventProcessor() {
	    classCallCheck(this, EventProcessor);

	    this.eventStore = [];
	  }

	  createClass(EventProcessor, [{
	    key: "on",
	    value: function on(name, handler) {
	      this.eventStore.push({
	        name: name,
	        handler: handler
	      });
	    }
	  }, {
	    key: "once",
	    value: function once(name, handler) {
	      var _this5 = this;

	      var off = function off() {
	        _this5.off(name, wrappedHandler);
	      };

	      var wrappedHandler = function wrappedHandler() {
	        handler.apply(void 0, arguments);
	        off();
	      };

	      this.on(name, wrappedHandler);
	      return off;
	    }
	  }, {
	    key: "onceTimeout",
	    value: function onceTimeout(name, handler, timeout) {
	      var _this6 = this;

	      var off;
	      var promise = new Promise(function (resolve, reject) {
	        var wrappedHandler = function wrappedHandler() {
	          handler.apply(void 0, arguments);
	          resolve();
	        };

	        off = _this6.once(name, wrappedHandler);
	        waitTime(timeout).then(function () {
	          off();
	          reject();
	        });
	      });

	      var off2 = function off2() {
	        off && off();
	      };

	      return {
	        off: off2,
	        promise: promise
	      };
	    }
	  }, {
	    key: "off",
	    value: function off(name, handler) {
	      var indexes = []; // to remove indexes; reverse; 倒序的

	      var len = this.eventStore.length;

	      for (var i = 0; i < len; i++) {
	        var item = this.eventStore[i];

	        if (item.name === name && item.handler === handler) {
	          indexes.unshift(i);
	        }
	      }

	      for (var _i13 = 0, _indexes = indexes; _i13 < _indexes.length; _i13++) {
	        var index = _indexes[_i13];
	        this.eventStore.splice(index, 1);
	      }
	    }
	  }, {
	    key: "emit",
	    value: function emit(name) {
	      // 重要: 先找到要执行的项放在新数组里, 因为执行项会改变事件项存储数组
	      var items = [];

	      var _iterator15 = _createForOfIteratorHelper(this.eventStore),
	          _step15;

	      try {
	        for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
	          var _item = _step15.value;

	          if (_item.name === name) {
	            items.push(_item);
	          }
	        }
	      } catch (err) {
	        _iterator15.e(err);
	      } finally {
	        _iterator15.f();
	      }

	      for (var _len10 = arguments.length, args = new Array(_len10 > 1 ? _len10 - 1 : 0), _key12 = 1; _key12 < _len10; _key12++) {
	        args[_key12 - 1] = arguments[_key12];
	      }

	      for (var _i14 = 0, _items = items; _i14 < _items.length; _i14++) {
	        var item = _items[_i14];
	        item.handler.apply(item, args);
	      }
	    }
	  }]);

	  return EventProcessor;
	}();
	var CrossWindowEventProcessor = /*#__PURE__*/function (_EventProcessor) {
	  inherits(CrossWindowEventProcessor, _EventProcessor);

	  var _super = _createSuper(CrossWindowEventProcessor);

	  // id
	  function CrossWindowEventProcessor(opt) {
	    var _this7;

	    classCallCheck(this, CrossWindowEventProcessor);

	    _this7 = _super.call(this);
	    _this7.storageName = '_crossWindow';
	    _this7.windows = [];
	    _this7.timeout = 200;
	    _this7.BROADCAST = '__BROADCAST__';

	    if (opt) {
	      Object.assign(assertThisInitialized(_this7), opt);
	    }

	    onDOM(window, 'storage', function (ev) {
	      if (ev.key === _this7.storageName) {
	        var event = JSON.parse(ev.newValue);

	        if (!event.targets || event.targets.includes(_this7.id)) {
	          var _this8;

	          (_this8 = _this7).emitLocal.apply(_this8, [event.name].concat(toConsumableArray(event.args)));
	        }
	      }
	    }); // social parts 集体部分
	    // join

	    _this7.id = strRand();
	    _this7.windows = [_this7.id];
	    _this7.ready = new Promise(function (resolve, reject) {
	      _this7.onceTimeout('_windows_updated', function (_ref) {
	        var windows = _ref.windows;
	        _this7.windows = windows;
	      }, _this7.timeout).promise.then(function () {
	        resolve(); // responsed 被响应
	      }, function () {
	        // no response 无响应
	        resolve();
	      });

	      _this7.broadcast('_join', _this7.id);
	    });

	    _this7.ready.then(function () {
	      // on join
	      _this7.on('_join', function (id) {
	        _this7.windows.push(id);

	        if (_this7.isMain()) {
	          _this7.broadcast('_windows_updated', {
	            windows: _this7.windows,
	            type: 'join',
	            id: id
	          });
	        }
	      }); // on _windows_updated


	      _this7.on('_windows_updated', function (_ref2) {
	        var windows = _ref2.windows;
	        _this7.windows = windows;
	      }); // on exit


	      _this7.on('_exit', function (id) {
	        var oldMain = _this7.windows[0];
	        arrayRemove(_this7.windows, id);

	        if (_this7.isMain()) {
	          _this7.emit('_windows_updated', {
	            windows: _this7.windows,
	            type: 'exit',
	            id: id
	          });

	          if (oldMain != _this7.id) {
	            _this7.emit('_main_updated', {
	              windows: _this7.windows,
	              old: oldMain,
	              'new': _this7.id
	            });
	          }
	        }
	      });

	      onDOM(window, 'beforeunload', function () {
	        _this7.exitGroup();
	      });
	    });

	    return _this7;
	  }

	  createClass(CrossWindowEventProcessor, [{
	    key: "isMain",
	    value: function isMain() {
	      return this.id === this.windows[0];
	    }
	  }, {
	    key: "emitTo",
	    value: function emitTo(name, targets) {
	      for (var _len11 = arguments.length, args = new Array(_len11 > 2 ? _len11 - 2 : 0), _key13 = 2; _key13 < _len11; _key13++) {
	        args[_key13 - 2] = arguments[_key13];
	      }

	      if (targets === this.BROADCAST) {
	        targets = null;
	      } else {
	        if (targets && !isArray(targets)) {
	          targets = [targets];
	        }

	        if (targets.includes(this.id)) {
	          var _get2;

	          (_get2 = get(getPrototypeOf(CrossWindowEventProcessor.prototype), "emit", this)).call.apply(_get2, [this, name].concat(args)); // emit to current window

	        }
	      }

	      glb().localStorage.setItem(this.storageName, JSON.stringify({
	        name: name,
	        targets: targets,
	        args: args,
	        // use random make storage event triggered every time
	        // 加入随机保证触发storage事件
	        random: Math.random()
	      }));
	    }
	  }, {
	    key: "emitLocal",
	    value: function emitLocal(name) {
	      for (var _len12 = arguments.length, args = new Array(_len12 > 1 ? _len12 - 1 : 0), _key14 = 1; _key14 < _len12; _key14++) {
	        args[_key14 - 1] = arguments[_key14];
	      }

	      this.emitTo.apply(this, [name, this.id].concat(args));
	    }
	  }, {
	    key: "broadcast",
	    value: function broadcast(name) {
	      for (var _len13 = arguments.length, args = new Array(_len13 > 1 ? _len13 - 1 : 0), _key15 = 1; _key15 < _len13; _key15++) {
	        args[_key15 - 1] = arguments[_key15];
	      }

	      this.emitTo.apply(this, [name, this.BROADCAST].concat(args));
	    }
	  }, {
	    key: "emit",
	    value: function emit(name) {
	      for (var _len14 = arguments.length, args = new Array(_len14 > 1 ? _len14 - 1 : 0), _key16 = 1; _key16 < _len14; _key16++) {
	        args[_key16 - 1] = arguments[_key16];
	      }

	      this.emitTo.apply(this, [name, this.windows].concat(args));
	    }
	  }, {
	    key: "exitGroup",
	    value: function exitGroup() {
	      this.broadcast('_exit', this.id);
	    }
	  }]);

	  return CrossWindowEventProcessor;
	}(EventProcessor); // Deprecated in next version
	var Cache = /*#__PURE__*/function () {
	  function Cache() {
	    classCallCheck(this, Cache);

	    this.store = {};
	  }

	  createClass(Cache, [{
	    key: "has",
	    value: function has(name) {
	      return this.store.hasOwnProperty(name);
	    }
	  }, {
	    key: "remember",
	    value: function remember(name, getter) {
	      if (!this.has(name)) {
	        this.store[name] = {
	          value: getter()
	        };
	      }

	      return this.store[name].value;
	    }
	  }, {
	    key: "forget",
	    value: function forget(name) {
	      if (name) {
	        if (this.has(name)) {
	          delete this.store[name];
	        }
	      } else {
	        this.store = {};
	      }
	    }
	  }]);

	  return Cache;
	}(); // attach cached getters to an object; can attach to self

	/*!
	* tree-helper v1.4.14
	* (c) phphe <phphe@outlook.com> (https://github.com/phphe)
	* Released under the MIT License.
	*/

	function _typeof(obj) {
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _toConsumableArray$1(arr) {
	  return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _nonIterableSpread$1();
	}

	function _arrayWithoutHoles$1(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  }
	}

	function _iterableToArray$1(iter) {
	  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
	}

	function _nonIterableSpread$1() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}
	// Breadth-First-Search

	function breadthFirstSearch(obj, handler) {
	  var reverse = arguments.length > 3 ? arguments[3] : undefined;
	  var rootChildren = isArray(obj) ? obj : [obj]; //

	  var stack = rootChildren.map(function (v, i) {
	    return {
	      item: v,
	      index: i
	    };
	  });

	  if (reverse) {
	    stack.reverse();
	  }

	  var _loop = function _loop() {
	    var _stack$shift = stack.shift(),
	        item = _stack$shift.item,
	        index = _stack$shift.index,
	        parent = _stack$shift.parent;

	    var r = handler(item, index, parent);

	    if (r === false) {
	      // stop
	      return {
	        v: void 0
	      };
	    } else if (r === 'skip children') {
	      return "continue";
	    } else if (r === 'skip siblings') {
	      stack = stack.filter(function (v) {
	        return v.parent !== parent;
	      });
	    }

	    if (item.children) {
	      var _stack;

	      var children = item.children;

	      if (reverse) {
	        children = children.slice();
	        children.reverse();
	      }

	      var pushStack = children.map(function (v, i) {
	        return {
	          item: v,
	          index: i,
	          parent: item
	        };
	      });

	      (_stack = stack).push.apply(_stack, _toConsumableArray$1(pushStack));
	    }
	  };

	  while (stack.length) {
	    var _ret = _loop();

	    switch (_ret) {
	      case "continue":
	        continue;

	      default:
	        if (_typeof(_ret) === "object") return _ret.v;
	    }
	  }
	}

	function _changeParent(item, parent) {
	  var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
	  var parentKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'parent';

	  // remove item from original list
	  if (item[parentKey]) {
	    arrayRemove(item[parentKey][childrenKey], item);
	  }

	  item[parentKey] = parent;
	}
	function insertBefore$1(item, target) {
	  var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
	  var parentKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'parent';

	  if (item === target) {
	    return;
	  }

	  var siblings = target[parentKey][childrenKey];
	  var index = siblings.indexOf(target);

	  if (siblings[index - 1] !== item) {
	    if (item[parentKey] === target[parentKey]) {
	      arrayRemove(siblings, item);
	      index = siblings.indexOf(target);
	    } else {
	      _changeParent(item, target[parentKey]);
	    }

	    siblings.splice(index, 0, item);
	  }
	}
	function insertAfter$1(item, target) {
	  var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
	  var parentKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'parent';

	  if (item === target) {
	    return;
	  }

	  var targetParent = target[parentKey];
	  var siblings = targetParent[childrenKey];
	  var index = siblings.indexOf(target);

	  if (siblings[index + 1] !== item) {
	    if (item[parentKey] === target[parentKey]) {
	      arrayRemove(siblings, item);
	      index = siblings.indexOf(target);
	    } else {
	      _changeParent(item, target[parentKey]);
	    }

	    siblings.splice(index + 1, 0, item);
	  }
	}
	function prependTo$1(item, target) {
	  var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';

	  if (item === target) {
	    throw "can't prepend to self";
	  }

	  var targetChildren = target[childrenKey];

	  if (targetChildren[0] !== item) {
	    _changeParent(item, target);

	    targetChildren.splice(0, 0, item);
	  }
	}
	function appendTo$1(item, target) {
	  var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';

	  if (item === target) {
	    throw "can't append to self";
	  }

	  var targetChildren = target[childrenKey];
	  var targetChildrenLast = targetChildren[targetChildren.length - 1];

	  if (targetChildrenLast !== item) {
	    _changeParent(item, target);

	    targetChildren.push(item);
	  }
	}

	//
	var script = {
	  name: 'TreeNode',
	  props: {
	    data: {},
	    store: {},
	    level: {
	      default: 0
	    } // readonly

	  },
	  data: function data() {
	    return {
	      vm: this
	    };
	  },
	  computed: {
	    childrenLevel: function childrenLevel() {
	      return this.level + 1;
	    },
	    isRoot: function isRoot() {
	      return this.data && this.data.isRoot;
	    },
	    childrenVisible: function childrenVisible() {
	      var data = this.data;
	      return this.isRoot || data && data.children && data.children.length && data.open;
	    },
	    innerBackStyle: function innerBackStyle() {
	      var r = {
	        marginBottom: this.store.space + 'px'
	      };

	      if (!this.isRoot && this.level > 1) {
	        r.paddingLeft = (this.level - 1) * this.store.indent + 'px';
	      }

	      return r;
	    }
	  },
	  watch: {
	    data: {
	      immediate: true,
	      handler: function handler(data) {
	        if (data) {
	          data._vm = this;

	          if (!data._treeNodePropertiesCompleted && !data.isRoot) {
	            this.store.compeleteNode(data, this.$parent.data);
	          }
	        }
	      }
	    }
	  } // methods: {},
	  // created() {},
	  // mounted() {},

	};

	function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
	/* server only */
	, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
	  if (typeof shadowMode !== 'boolean') {
	    createInjectorSSR = createInjector;
	    createInjector = shadowMode;
	    shadowMode = false;
	  } // Vue.extend constructor export interop.


	  var options = typeof script === 'function' ? script.options : script; // render functions

	  if (template && template.render) {
	    options.render = template.render;
	    options.staticRenderFns = template.staticRenderFns;
	    options._compiled = true; // functional template

	    if (isFunctionalTemplate) {
	      options.functional = true;
	    }
	  } // scopedId


	  if (scopeId) {
	    options._scopeId = scopeId;
	  }

	  var hook;

	  if (moduleIdentifier) {
	    // server build
	    hook = function hook(context) {
	      // 2.3 injection
	      context = context || // cached call
	      this.$vnode && this.$vnode.ssrContext || // stateful
	      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
	      // 2.2 with runInNewContext: true

	      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	        context = __VUE_SSR_CONTEXT__;
	      } // inject component styles


	      if (style) {
	        style.call(this, createInjectorSSR(context));
	      } // register component module identifier for async chunk inference


	      if (context && context._registeredComponents) {
	        context._registeredComponents.add(moduleIdentifier);
	      }
	    }; // used by ssr in case component is cached and beforeCreate
	    // never gets called


	    options._ssrRegister = hook;
	  } else if (style) {
	    hook = shadowMode ? function () {
	      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
	    } : function (context) {
	      style.call(this, createInjector(context));
	    };
	  }

	  if (hook) {
	    if (options.functional) {
	      // register for functional component in vue file
	      var originalRender = options.render;

	      options.render = function renderWithStyleInjection(h, context) {
	        hook.call(context);
	        return originalRender(h, context);
	      };
	    } else {
	      // inject component registration as beforeCreate hook
	      var existing = options.beforeCreate;
	      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
	    }
	  }

	  return script;
	}

	var normalizeComponent_1 = normalizeComponent;

	/* script */
	const __vue_script__ = script;

	/* template */
	var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tree-node",class:[_vm.data.active ? _vm.store.activatedClass : '', _vm.data.open ? _vm.store.openedClass : '', _vm.data.class],style:(_vm.data.style),attrs:{"id":_vm.data._id}},[(!_vm.isRoot)?_vm._t("node-inner-back",[_c('div',{staticClass:"tree-node-inner-back",class:[_vm.data.innerBackClass],style:([_vm.innerBackStyle, _vm.data.innerBackStyle])},[_c('div',{staticClass:"tree-node-inner",class:[_vm.data.innerClass],style:([_vm.data.innerStyle])},[_vm._t("default",null,{"data":_vm.data,"store":_vm.store,"vm":_vm.vm})],2)])],{"styleObj":_vm.innerBackStyle,"data":_vm.data,"store":_vm.store,"vm":_vm.vm}):_vm._e(),_c('transition',{attrs:{"name":_vm.store.childrenTransitionName}},[(_vm.childrenVisible)?_c('div',{staticClass:"tree-node-children"},_vm._l((_vm.data.children),function(child){return _c('TreeNode',{key:child._id,attrs:{"data":child,"store":_vm.store,"level":_vm.childrenLevel},scopedSlots:_vm._u([{key:"default",fn:function(props){return [_vm._t("default",null,{"data":props.data,"store":props.store,"vm":props.vm})]}},{key:"node-inner-back",fn:function(props){return (_vm.store.customInnerBack)?[_vm._t("node-inner-back",null,{"styleObj":props.styleObj,"data":props.data,"store":props.store,"vm":props.vm})]:undefined}}],null,true)})}),1):_vm._e()])],2)};
	var __vue_staticRenderFns__ = [];

	  /* style */
	  const __vue_inject_styles__ = undefined;
	  /* scoped */
	  const __vue_scope_id__ = undefined;
	  /* module identifier */
	  const __vue_module_identifier__ = undefined;
	  /* functional template */
	  const __vue_is_functional_template__ = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var TreeNode = normalizeComponent_1(
	    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    undefined,
	    undefined
	  );

	var script$1 = {
	  props: {
	    data: {},
	    idLength: {
	      type: Number,
	      default: 5
	    },
	    indent: {
	      type: Number,
	      default: 16
	    },
	    activatedClass: {
	      default: 'active'
	    },
	    openedClass: {
	      default: 'open'
	    },
	    space: {
	      type: Number,
	      default: 10
	    },
	    // space between node, unit px
	    childrenTransitionName: {},
	    // there are issues under draggable tree
	    customInnerBack: {}
	  },
	  components: {
	    TreeNode: TreeNode
	  },
	  data: function data() {
	    return {
	      store: this,
	      rootData: null
	    };
	  },
	  // computed: {},
	  watch: {
	    data: {
	      immediate: true,
	      handler: function handler(data, old) {
	        var _this = this;

	        if (data === old) {
	          return;
	        } // make rootData always use a same object


	        this.rootData = this.rootData || {
	          isRoot: true,
	          _id: "tree_".concat(this._uid, "_node_root"),
	          children: []
	        };
	        breadthFirstSearch(data, function (node, k, parent) {
	          _this.compeleteNode(node, parent);
	        });
	        this.rootData.children = data;
	      }
	    }
	  },
	  methods: {
	    compeleteNode: function compeleteNode(node, parent) {
	      var compeletedData = {
	        open: true,
	        children: [],
	        active: false,
	        style: {},
	        class: '',
	        innerStyle: {},
	        innerClass: '',
	        innerBackStyle: {},
	        innerBackClass: {}
	      };

	      for (var key in compeletedData) {
	        if (!node.hasOwnProperty(key)) {
	          this.$set(node, key, compeletedData[key]);
	        }
	      }

	      this.$set(node, 'parent', parent || this.rootData);

	      if (!node.hasOwnProperty('_id')) {
	        node._id = "tree_".concat(this._uid, "_node_").concat(strRand(this.idLength));
	      }

	      node._treeNodePropertiesCompleted = true;
	    },
	    // pure node self
	    pure: function pure(node, withChildren, after) {
	      var _this2 = this;

	      var t = Object.assign({}, node); // delete t._id

	      delete t.parent;
	      delete t.children;
	      delete t.active;
	      delete t.style;
	      delete t.class;
	      delete t.innerStyle;
	      delete t.innerClass;
	      delete t.innerBackStyle;
	      delete t.innerBackClass; // for (const key of Object.keys(t)) {
	      //   if (key[0] === '_') {
	      //     delete t[key]
	      //   }
	      // }

	      if (withChildren && node.children) {
	        t.children = node.children.slice();
	        t.children.forEach(function (v, k) {
	          t.children[k] = _this2.pure(v, withChildren);
	        });
	      }

	      if (after) {
	        return after(t, node) || t;
	      }

	      return t;
	    },
	    getNodeById: function getNodeById(id) {
	      var r;
	      breadthFirstSearch(this.rootData.children, function (node) {
	        if (node._id === id) {
	          r = node;
	          return false;
	        }
	      });
	      return r;
	    },
	    getActivated: function getActivated() {
	      var r = [];
	      breadthFirstSearch(this.rootData.children, function (node) {
	        if (node.active) {
	          r.push(node);
	        }
	      });
	      return r;
	    },
	    getOpened: function getOpened() {
	      var r = [];
	      breadthFirstSearch(this.rootData.children, function (node) {
	        if (node.open) {
	          r.push(node);
	        }
	      });
	      return r;
	    },
	    activeNode: function activeNode(node, inactiveOld) {
	      var activated = this.activated;

	      if (inactiveOld) {
	        this.getActivated().forEach(function (node2) {
	          node2.active = false;
	        });
	      }

	      node.active = true;
	    },
	    toggleActive: function toggleActive(node, inactiveOld) {
	      if (node.active) {
	        node.active = false;
	      } else {
	        this.activeNode(node, inactiveOld);
	      }
	    },
	    openNode: function openNode(node, closeOld) {
	      var _this3 = this;

	      var opened = this.opened;

	      if (closeOld) {
	        this.getOpened().forEach(function (node2) {
	          node2.open = false;

	          _this3.$emit('nodeOpenChanged', node2);
	        });
	      }

	      node.open = true;
	      this.$emit('nodeOpenChanged', node);
	    },
	    toggleOpen: function toggleOpen(node, closeOld) {
	      if (node.open) {
	        node.open = false;
	        this.$emit('nodeOpenChanged', node);
	      } else {
	        this.openNode(node, closeOld);
	      }
	    },
	    getPureData: function getPureData(after) {
	      return this.pure(this.rootData, true, after).children;
	    },
	    deleteNode: function deleteNode(node) {
	      return arrayRemove(node.parent.children, node);
	    }
	  } // created() {},
	  // mounted() {},

	};

	/* script */
	const __vue_script__$1 = script$1;

	/* template */
	var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"he-tree tree"},[_c('TreeNode',{attrs:{"data":_vm.rootData,"store":_vm.store},scopedSlots:_vm._u([{key:"default",fn:function(props){return [_vm._t("default",null,{"data":props.data,"store":_vm.store,"vm":props.vm})]}},{key:"node-inner-back",fn:function(props){return (_vm.customInnerBack)?[_vm._t("node-inner-back",null,{"styleObj":props.styleObj,"data":props.data,"store":props.store,"vm":props.vm})]:undefined}}],null,true)})],1)};
	var __vue_staticRenderFns__$1 = [];

	  /* style */
	  const __vue_inject_styles__$1 = undefined;
	  /* scoped */
	  const __vue_scope_id__$1 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$1 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$1 = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var Tree = normalizeComponent_1(
	    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
	    __vue_inject_styles__$1,
	    __vue_script__$1,
	    __vue_scope_id__$1,
	    __vue_is_functional_template__$1,
	    __vue_module_identifier__$1,
	    undefined,
	    undefined
	  );

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var at = _stringAt(true);

	 // `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var _advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? at(S, index).length : 1);
	};

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = _wks('toStringTag');
	// ES3 wrong here
	var ARG = _cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var builtinExec = RegExp.prototype.exec;

	 // `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var _regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw new TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }
	  if (_classof(R) !== 'RegExp') {
	    throw new TypeError('RegExp#exec called on incompatible receiver');
	  }
	  return builtinExec.call(R, S);
	};

	// 21.2.5.3 get RegExp.prototype.flags

	var _flags = function () {
	  var that = _anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var LAST_INDEX = 'lastIndex';

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/,
	      re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
	})();

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

	    match = nativeExec.call(re, str);

	    if (UPDATES_LAST_INDEX_WRONG && match) {
	      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      // eslint-disable-next-line no-loop-func
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var _regexpExec = patchedExec;

	_export({
	  target: 'RegExp',
	  proto: true,
	  forced: _regexpExec !== /./.exec
	}, {
	  exec: _regexpExec
	});

	var SPECIES = _wks('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
	  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
	})();

	var _fixReWks = function (KEY, length, exec) {
	  var SYMBOL = _wks(KEY);

	  var DELEGATES_TO_SYMBOL = !_fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;
	    re.exec = function () { execCalled = true; return null; };
	    if (KEY === 'split') {
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES] = function () { return re; };
	    }
	    re[SYMBOL]('');
	    return !execCalled;
	  }) : undefined;

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var fns = exec(
	      _defined,
	      SYMBOL,
	      ''[KEY],
	      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
	        if (regexp.exec === _regexpExec) {
	          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	            // The native String method already delegates to @@method (this
	            // polyfilled function), leasing to infinite recursion.
	            // We avoid it by directly calling the native @@method method.
	            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	          }
	          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	        }
	        return { done: false };
	      }
	    );
	    var strfn = fns[0];
	    var rxfn = fns[1];

	    _redefine(String.prototype, KEY, strfn);
	    _hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return rxfn.call(string, this); }
	    );
	  }
	};

	var max$2 = Math.max;
	var min$3 = Math.min;
	var floor$1 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// @@replace logic
	_fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
	  return [
	    // `String.prototype.replace` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = defined(this);
	      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return fn !== undefined
	        ? fn.call(searchValue, O, replaceValue)
	        : $replace.call(String(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	    function (regexp, replaceValue) {
	      var res = maybeCallNative($replace, regexp, this, replaceValue);
	      if (res.done) return res.value;

	      var rx = _anObject(regexp);
	      var S = String(this);
	      var functionalReplace = typeof replaceValue === 'function';
	      if (!functionalReplace) replaceValue = String(replaceValue);
	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = _regexpExecAbstract(rx, S);
	        if (result === null) break;
	        results.push(result);
	        if (!global) break;
	        var matchStr = String(result[0]);
	        if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
	      }
	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];
	        var matched = String(result[0]);
	        var position = max$2(min$3(_toInteger(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = [matched].concat(captures, position, S);
	          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	          var replacement = String(replaceValue.apply(undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + S.slice(nextSourcePosition);
	    }
	  ];

	    // https://tc39.github.io/ecma262/#sec-getsubstitution
	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	    if (namedCaptures !== undefined) {
	      namedCaptures = _toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }
	    return $replace.call(replacement, symbols, function (match, ch) {
	      var capture;
	      switch (ch.charAt(0)) {
	        case '$': return '$';
	        case '&': return matched;
	        case '`': return str.slice(0, position);
	        case "'": return str.slice(tailPos);
	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;
	        default: // \d\d?
	          var n = +ch;
	          if (n === 0) return match;
	          if (n > m) {
	            var f = floor$1(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }
	          capture = captures[n - 1];
	      }
	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	/*!
	 * drag-event-service v0.0.6
	 * (c) 2018-present phphe <phphe@outlook.com> (https://github.com/phphe)
	 * Released under the MIT License.
	 */

	// support desktop and mobile
	var events = {
	  start: ['mousedown', 'touchstart'],
	  move: ['mousemove', 'touchmove'],
	  end: ['mouseup', 'touchend']
	};
	var index = {
	  isTouch: function isTouch(e) {
	    return e.type && e.type.startsWith('touch');
	  },
	  _getStore: function _getStore(el) {
	    if (!el._wrapperStore) {
	      el._wrapperStore = [];
	    }

	    return el._wrapperStore;
	  },
	  on: function on(el, name, handler) {
	    var _hp$onDOM, _hp$onDOM2;

	    var store$$1 = this._getStore(el);

	    var ts = this;

	    var wrapper = function wrapper(e) {
	      var mouse;
	      var isTouch = ts.isTouch(e);

	      if (isTouch) {
	        // touch
	        mouse = {
	          x: e.changedTouches[0].pageX,
	          y: e.changedTouches[0].pageY
	        };
	      } else {
	        // mouse
	        mouse = {
	          x: e.pageX,
	          y: e.pageY
	        };

	        if (name === 'start' && e.which !== 1) {
	          // not left button mousedown
	          return;
	        }
	      }

	      return handler.call(this, e, mouse);
	    };

	    store$$1.push({
	      handler: handler,
	      wrapper: wrapper
	    }); // follow format will cause big bundle size
	    // 以下写法将会使打包工具认为hp是上下文, 导致打包整个hp
	    // hp.onDOM(el, events[name][0], wrapper, ...args)

	    for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
	      args[_key - 3] = arguments[_key];
	    }

	    (_hp$onDOM = onDOM).call.apply(_hp$onDOM, [null, el, events[name][0], wrapper].concat(args));

	    (_hp$onDOM2 = onDOM).call.apply(_hp$onDOM2, [null, el, events[name][1], wrapper].concat(args));
	  },
	  off: function off(el, name, handler) {
	    var store$$1 = this._getStore(el);

	    for (var _len2 = arguments.length, args = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
	      args[_key2 - 3] = arguments[_key2];
	    }

	    for (var i = store$$1.length - 1; i >= 0; i--) {
	      var _store$i = store$$1[i],
	          handler2 = _store$i.handler,
	          wrapper = _store$i.wrapper;

	      if (handler === handler2) {
	        var _hp$offDOM, _hp$offDOM2;

	        (_hp$offDOM = offDOM).call.apply(_hp$offDOM, [null, el, events[name][0], wrapper].concat(args));

	        (_hp$offDOM2 = offDOM).call.apply(_hp$offDOM2, [null, el, events[name][1], wrapper].concat(args));

	        store$$1.splice(i, 1);
	      }
	    }
	  }
	};

	/*!
	 * draggable-helper v1.0.20
	 * (c) 2018-present phphe <phphe@outlook.com> (https://github.com/phphe)
	 * Released under the MIT License.
	 */

	/***
	const destroy = draggableHelper(HTMLElement dragHandlerEl, Object opt = {})
	opt.drag(e, opt, store)
	[Object] opt.style || opt.getStyle(opt) set style of moving el style
	[Boolean] opt.clone
	opt.draggingClass, default dragging
	opt.moving(e, opt, store) return false can prevent moving
	opt.drop(e, opt, store)
	opt.getEl(dragHandlerEl, opt) get the el that will be moved. default is dragHandlerEl
	opt.minTranslate default 10, unit px
	add other prop into opt, you get opt in callback
	store{
	  el
	  initialMouse
	  initialPosition
	  mouse
	  move
	  movedCount // start from 0
	}
	e.g.
	draggable(this.$el, {
	  vm: this,
	  data: this.data,
	  drag: (e, opt, store) => {
	    dplh.style.height = store.el.querySelector('.TreeNodeSelf').offsetHeight + 'px'
	    th.insertAfter(dplh, opt.data)
	  },
	  moving: (e, opt, store) => {
	    hp.arrayRemove(dplh.parent.children, dplh)
	  },
	  drop: (e, opt, store) => {
	    hp.arrayRemove(dplh.parent.children, dplh)
	  },
	})
	***/

	function index$1 (dragHandlerEl) {
	  var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  if (opt.minTranslate == null) {
	    opt.minTranslate = 10;
	  }

	  var store$$1 = getPureStore();

	  var destroy = function destroy() {
	    index.off(dragHandlerEl, 'end', dragHandlerEl._draggbleEventHandler);
	    offDOM(dragHandlerEl, 'selectstart', preventSelect);
	    delete dragHandlerEl._draggbleEventHandler;
	  };

	  if (dragHandlerEl._draggbleEventHandler) {
	    destroy();
	  }

	  dragHandlerEl._draggbleEventHandler = start;
	  index.on(dragHandlerEl, 'start', dragHandlerEl._draggbleEventHandler);
	  onDOM(dragHandlerEl, 'selectstart', preventSelect);
	  return destroy;

	  function start(e, mouse) {
	    // e.stopPropagation()
	    store$$1.mouse = {
	      x: mouse.x,
	      y: mouse.y
	    };
	    store$$1.initialMouse = Object.assign({}, store$$1.mouse);
	    index.on(document, 'move', moving, {
	      passive: false
	    }); // passive: false is for touchmove event

	    index.on(window, 'end', drop);
	  }

	  function drag(e) {
	    var _resolveDragedElAndIn = resolveDragedElAndInitialPosition(),
	        el = _resolveDragedElAndIn.el,
	        position = _resolveDragedElAndIn.position;

	    store$$1.el = el;
	    store$$1.initialPosition = Object.assign({}, position);
	    var r = opt.drag && opt.drag(e, opt, store$$1);

	    if (r === false) {
	      return false;
	    } // dom actions


	    var size = getElSize(el);
	    var style = Object.assign({
	      width: "".concat(size.width, "px"),
	      height: "".concat(size.height, "px"),
	      zIndex: 9999,
	      opacity: 0.6,
	      position: 'absolute',
	      left: position.x + 'px',
	      top: position.y + 'px'
	    }, opt.style || opt.getStyle && opt.getStyle(opt) || {});
	    backupAttr(el, 'style');

	    for (var key in style) {
	      el.style[key] = style[key];
	    } // add class


	    backupAttr(el, 'class');
	    addClass(el, opt.draggingClass);
	  }

	  function moving(e, mouse) {
	    store$$1.mouse = {
	      x: mouse.x,
	      y: mouse.y
	    };
	    var move = store$$1.move = {
	      x: store$$1.mouse.x - store$$1.initialMouse.x,
	      y: store$$1.mouse.y - store$$1.initialMouse.y
	    };

	    if (store$$1.movedCount === 0 && opt.minTranslate) {
	      var x2 = Math.pow(store$$1.move.x, 2);
	      var y2 = Math.pow(store$$1.move.y, 2);
	      var dtc = Math.pow(x2 + y2, 0.5);

	      if (dtc < opt.minTranslate) {
	        return;
	      }
	    }

	    var canMove = true;

	    if (store$$1.movedCount === 0) {
	      if (drag(e) === false) {
	        canMove = false;
	      }
	    } // move started
	    // e.preventDefault() to prevent text selection and page scrolling when touch


	    e.preventDefault();

	    if (canMove && opt.moving) {
	      if (opt.moving(e, opt, store$$1) === false) {
	        canMove = false;
	      }
	    }

	    if (canMove) {
	      if (!store$$1 || !store$$1.el) {
	        return;
	      }

	      Object.assign(store$$1.el.style, {
	        left: store$$1.initialPosition.x + move.x + 'px',
	        top: store$$1.initialPosition.y + move.y + 'px'
	      });
	      store$$1.movedCount++;
	    }
	  }

	  function drop(e) {
	    index.off(document, 'move', moving, {
	      passive: false
	    });
	    index.off(window, 'end', drop); // drag executed if movedCount > 0

	    if (store$$1.movedCount > 0) {
	      store$$1.movedCount = 0;
	      var _store = store$$1,
	          el = _store.el;

	      if (opt.clone) {
	        el.parentElement.removeChild(el);
	      } else {
	        restoreAttr(el, 'style');
	        restoreAttr(el, 'class');
	      }

	      opt.drop && opt.drop(e, opt, store$$1);
	    }

	    store$$1 = getPureStore();
	  }

	  function resolveDragedElAndInitialPosition() {
	    var el0 = opt.getEl ? opt.getEl(dragHandlerEl, opt) : dragHandlerEl;
	    var el = el0;

	    if (opt.clone) {
	      store$$1.triggerEl = el0;
	      el = el0.cloneNode(true);
	      el0.parentElement.appendChild(el);
	    }

	    return {
	      position: getPosition(el),
	      el: el
	    };
	  }

	  function getPureStore() {
	    return {
	      movedCount: 0
	    };
	  }

	  function preventSelect(e) {
	    e.preventDefault();
	  }
	}

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	var dP$2 = _objectDp.f;
	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME$1 = 'name';

	// 19.2.4.2 name
	NAME$1 in FProto || _descriptors && dP$2(FProto, NAME$1, {
	  configurable: true,
	  get: function () {
	    try {
	      return ('' + this).match(nameRE)[1];
	    } catch (e) {
	      return '';
	    }
	  }
	});

	function _classCallCheck$1(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var _global$1 = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core$1 = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.12' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1$1 = _core$1.version;

	var _aFunction$1 = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx$1 = function (fn, that, length) {
	  _aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject$1 = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject$1 = function (it) {
	  if (!_isObject$1(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails$1 = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors$1 = !_fails$1(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$3 = _global$1.document;
	// typeof document.createElement is 'object' in old IE
	var is$1 = _isObject$1(document$3) && _isObject$1(document$3.createElement);
	var _domCreate$1 = function (it) {
	  return is$1 ? document$3.createElement(it) : {};
	};

	var _ie8DomDefine$1 = !_descriptors$1 && !_fails$1(function () {
	  return Object.defineProperty(_domCreate$1('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive$1 = function (it, S) {
	  if (!_isObject$1(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP$3 = Object.defineProperty;

	var f$4 = _descriptors$1 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject$1(O);
	  P = _toPrimitive$1(P, true);
	  _anObject$1(Attributes);
	  if (_ie8DomDefine$1) try {
	    return dP$3(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp$1 = {
		f: f$4
	};

	var _propertyDesc$1 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide$1 = _descriptors$1 ? function (object, key, value) {
	  return _objectDp$1.f(object, key, _propertyDesc$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty$1 = {}.hasOwnProperty;
	var _has$1 = function (it, key) {
	  return hasOwnProperty$1.call(it, key);
	};

	var PROTOTYPE$2 = 'prototype';

	var $export$1 = function (type, name, source) {
	  var IS_FORCED = type & $export$1.F;
	  var IS_GLOBAL = type & $export$1.G;
	  var IS_STATIC = type & $export$1.S;
	  var IS_PROTO = type & $export$1.P;
	  var IS_BIND = type & $export$1.B;
	  var IS_WRAP = type & $export$1.W;
	  var exports = IS_GLOBAL ? _core$1 : _core$1[name] || (_core$1[name] = {});
	  var expProto = exports[PROTOTYPE$2];
	  var target = IS_GLOBAL ? _global$1 : IS_STATIC ? _global$1[name] : (_global$1[name] || {})[PROTOTYPE$2];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && _has$1(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx$1(out, _global$1)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE$2] = C[PROTOTYPE$2];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? _ctx$1(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export$1.R && expProto && !expProto[key]) _hide$1(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export$1.F = 1;   // forced
	$export$1.G = 2;   // global
	$export$1.S = 4;   // static
	$export$1.P = 8;   // proto
	$export$1.B = 16;  // bind
	$export$1.W = 32;  // wrap
	$export$1.U = 64;  // safe
	$export$1.R = 128; // real proto method for `library`
	var _export$1 = $export$1;

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	_export$1(_export$1.S + _export$1.F * !_descriptors$1, 'Object', { defineProperty: _objectDp$1.f });

	var $Object = _core$1.Object;
	var defineProperty$1 = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};

	var defineProperty$2 = defineProperty$1;

	function _defineProperties$1(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;

	    defineProperty$2(target, descriptor.key, descriptor);
	  }
	}

	function _createClass$1(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties$1(Constructor, staticProps);
	  return Constructor;
	}

	function _defineProperty$1(obj, key, value) {
	  if (key in obj) {
	    defineProperty$2(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	var Cache$1 = /*#__PURE__*/function () {
	  function Cache() {
	    _classCallCheck$1(this, Cache);

	    _defineProperty$1(this, "store", {});
	  }

	  _createClass$1(Cache, [{
	    key: "has",
	    value: function has(name) {
	      return this.store.hasOwnProperty(name);
	    }
	  }, {
	    key: "remember",
	    value: function remember(name, getter) {
	      if (!this.has(name)) {
	        this.store[name] = {
	          value: getter()
	        };
	      }

	      return this.store[name].value;
	    }
	  }, {
	    key: "forget",
	    value: function forget(name) {
	      if (name) {
	        if (this.has(name)) {
	          delete this.store[name];
	        }
	      } else {
	        this.store = {};
	      }
	    }
	  }]);

	  return Cache;
	}();
	function attachCache$1(obj, cache, toCache) {
	  var _loop = function _loop(key) {
	    Object.defineProperty(obj, key, {
	      get: function get() {
	        var _this = this;

	        return cache.remember(key, function () {
	          return toCache[key].call(_this);
	        });
	      }
	    });
	  };

	  for (var key in toCache) {
	    _loop(key);
	  }
	}

	/*!
	* vue-functions v1.0.6
	* (c) phphe <phphe@outlook.com> (https://github.com/phphe)
	* Released under the MIT License.
	*/

	var _marked$1 =
	/*#__PURE__*/
	regeneratorRuntime.mark(iterateObjectWithoutDollarDash);
	function isPropTrue(value) {
	  return value === '' || value;
	} // the dependences in getter can't be auto resolved. must use exec to include dependences
	function iterateObjectWithoutDollarDash(obj) {
	  var key, start;
	  return regeneratorRuntime.wrap(function iterateObjectWithoutDollarDash$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          _context.t0 = regeneratorRuntime.keys(obj);

	        case 1:
	          if ((_context.t1 = _context.t0()).done) {
	            _context.next = 9;
	            break;
	          }

	          key = _context.t1.value;
	          start = key.substr(0, 1);

	          if (!(start !== '$' && start !== '_')) {
	            _context.next = 7;
	            break;
	          }

	          _context.next = 7;
	          return {
	            key: key,
	            value: obj[key]
	          };

	        case 7:
	          _context.next = 1;
	          break;

	        case 9:
	        case "end":
	          return _context.stop();
	      }
	    }
	  }, _marked$1);
	} // add reactive `windowSize`

	var f$5 = _wks;

	var _wksExt = {
		f: f$5
	};

	var defineProperty$3 = _objectDp.f;
	var _wksDefine = function (name) {
	  var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$3($Symbol, name, { value: _wksExt.f(name) });
	};

	_wksDefine('asyncIterator');

	var _meta = createCommonjsModule(function (module) {
	var META = _uid('meta');


	var setDesc = _objectDp.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !_fails(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	var f$6 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$6
	};

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = _objectKeys(it);
	  var getSymbols = _objectGops.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = _objectPie.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN$1 = _objectGopn.f;
	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN$1(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$7 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$1(_toIobject(it));
	};

	var _objectGopnExt = {
		f: f$7
	};

	// ECMAScript 6 symbols shim





	var META = _meta.KEY;





















	var gOPD$2 = _objectGopd.f;
	var dP$4 = _objectDp.f;
	var gOPN$2 = _objectGopnExt.f;
	var $Symbol = _global.Symbol;
	var $JSON = _global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$3 = 'prototype';
	var HIDDEN = _wks('_hidden');
	var TO_PRIMITIVE = _wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = _shared('symbol-registry');
	var AllSymbols = _shared('symbols');
	var OPSymbols = _shared('op-symbols');
	var ObjectProto$1 = Object[PROTOTYPE$3];
	var USE_NATIVE = typeof $Symbol == 'function' && !!_objectGops.f;
	var QObject = _global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$3] || !QObject[PROTOTYPE$3].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = _descriptors && _fails(function () {
	  return _objectCreate(dP$4({}, 'a', {
	    get: function () { return dP$4(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$2(ObjectProto$1, key);
	  if (protoDesc) delete ObjectProto$1[key];
	  dP$4(it, key, D);
	  if (protoDesc && it !== ObjectProto$1) dP$4(ObjectProto$1, key, protoDesc);
	} : dP$4;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$3]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
	  _anObject(it);
	  key = _toPrimitive(key, true);
	  _anObject(D);
	  if (_has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!_has(it, HIDDEN)) dP$4(it, HIDDEN, _propertyDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$4(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  _anObject(it);
	  var keys = _enumKeys(P = _toIobject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = _toPrimitive(key, true));
	  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
	  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject(it);
	  key = _toPrimitive(key, true);
	  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
	  var D = gOPD$2(it, key);
	  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$2(_toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto$1;
	  var names = gOPN$2(IS_OP ? OPSymbols : _toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto$1) $set.call(OPSymbols, value);
	      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, _propertyDesc(1, value));
	    };
	    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  _redefine($Symbol[PROTOTYPE$3], 'toString', function toString() {
	    return this._k;
	  });

	  _objectGopd.f = $getOwnPropertyDescriptor;
	  _objectDp.f = $defineProperty;
	  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
	  _objectPie.f = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if (_descriptors && !_library) {
	    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  _wksExt.f = function (name) {
	    return wrap(_wks(name));
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j$1 = 0; es6Symbols.length > j$1;)_wks(es6Symbols[j$1++]);

	for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

	_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return _has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	var FAILS_ON_PRIMITIVES = _fails(function () { _objectGops.f(1); });

	_export(_export.S + _export.F * FAILS_ON_PRIMITIVES, 'Object', {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return _objectGops.f(_toObject(it));
	  }
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!_isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$3][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$3], TO_PRIMITIVE, $Symbol[PROTOTYPE$3].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	_setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	_setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	_setToStringTag(_global.JSON, 'JSON', true);

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) _anObject(ret.call(iterator));
	    throw e;
	  }
	};

	// check on default Array iterator

	var ITERATOR$2 = _wks('iterator');
	var ArrayProto$1 = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto$1[ITERATOR$2] === it);
	};

	var _createProperty = function (object, index, value) {
	  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
	  else object[index] = value;
	};

	var ITERATOR$3 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$3]
	    || it['@@iterator']
	    || _iterators[_classof(it)];
	};

	var ITERATOR$4 = _wks('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$4]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$4]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$4] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	_export(_export.S + _export.F * !_iterDetect(function (iter) { }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = _toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = core_getIteratorMethod(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = _toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

	// 21.2.5.3 get RegExp.prototype.flags()
	if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: _flags
	});

	var TO_STRING = 'toString';
	var $toString = /./[TO_STRING];

	var define = function (fn) {
	  _redefine(RegExp.prototype, TO_STRING, fn, true);
	};

	// 21.2.5.14 RegExp.prototype.toString()
	if (_fails(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
	  define(function toString() {
	    var R = _anObject(this);
	    return '/'.concat(R.source, '/',
	      'flags' in R ? R.flags : !_descriptors && R instanceof RegExp ? _flags.call(R) : undefined);
	  });
	// FF44- RegExp#toString has a wrong name
	} else if ($toString.name != TO_STRING) {
	  define(function toString() {
	    return $toString.call(this);
	  });
	}

	var SPECIES$1 = _wks('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (_isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
	    if (_isObject(C)) {
	      C = C[SPECIES$1];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


	var _arraySpeciesCreate = function (original, length) {
	  return new (_arraySpeciesConstructor(original))(length);
	};

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex





	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || _arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = _toObject($this);
	    var self = _iobject(O);
	    var f = _ctx(callbackfn, that, 3);
	    var length = _toLength(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res;   // map
	        else if (res) switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

	var $find = _arrayMethods(5);
	var KEY = 'find';
	var forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () { forced = false; });
	_export(_export.P + _export.F * forced, 'Array', {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY);

	function _createForOfIteratorHelper$1(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

	function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

	function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
	// from https://gist.github.com/iddan/54d5d9e58311b0495a91bf06de661380

	if (!document.elementsFromPoint) {
	  document.elementsFromPoint = elementsFromPoint$1;
	}

	function elementsFromPoint$1(x, y) {
	  var parents = [];
	  var parent = void 0;

	  do {
	    if (parent !== document.elementFromPoint(x, y)) {
	      parent = document.elementFromPoint(x, y);
	      parents.push(parent);
	      parent.style.pointerEvents = 'none';
	    } else {
	      parent = false;
	    }
	  } while (parent);

	  parents.forEach(function (parent) {
	    return parent.style.pointerEvents = 'all';
	  });
	  return parents;
	}

	function getTreeByPoint(x, y, trees) {
	  var els = document.elementsFromPoint(x, y);
	  var treeEl;
	  var nodeEl;
	  var betweenEls = [];

	  var _iterator = _createForOfIteratorHelper$1(els),
	      _step;

	  try {
	    for (_iterator.s(); !(_step = _iterator.n()).done;) {
	      var _el = _step.value;

	      if (!nodeEl) {
	        if (hasClass(_el, 'tree-node')) {
	          nodeEl = _el;
	        }
	      } else {
	        // console.log(el);
	        if (hasClass(_el, 'tree')) {
	          treeEl = _el;
	          break;
	        }

	        betweenEls.push(_el);
	      }
	    }
	  } catch (err) {
	    _iterator.e(err);
	  } finally {
	    _iterator.f();
	  }

	  if (treeEl) {
	    // is target tree is another tree, and be covered by other element, like modal, popup
	    var covered = false;

	    if (!isParent(nodeEl, treeEl)) {
	      // cross tree
	      var _iterator2 = _createForOfIteratorHelper$1(betweenEls),
	          _step2;

	      try {
	        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
	          var el = _step2.value;

	          if (!isParent(el, treeEl)) {
	            covered = true;
	            break;
	          }
	        }
	      } catch (err) {
	        _iterator2.e(err);
	      } finally {
	        _iterator2.f();
	      }
	    } //


	    if (!covered) {
	      return trees.find(function (v) {
	        return v.$el === treeEl;
	      });
	    }
	  }
	}

	function isParent(child, parent) {
	  var cur = child;

	  while (cur) {
	    cur = cur.parentNode;

	    if (cur === parent) {
	      return true;
	    }
	  }
	}

	// 对 drag placeholder进行的操作

	var targets = {
	  'nothing': function nothing(info) {},
	  'after': function after(info) {
	    insertDplhAfterTo(info.dplh, info.targetNode, info);
	  },
	  'before': function before(info) {
	    if (isNodeDroppable(info.targetNode.parent)) {
	      insertBefore$1(info.dplh, info.targetNode);
	    } else {
	      insertDplhAfterTo(info.dplh, info.targetNode.parent, info);
	    }
	  },
	  'append': function append(info) {
	    if (isNodeDroppable(info.targetNode)) {
	      appendTo$1(info.dplh, info.targetNode);
	      if (!info.targetNode.open) info.store.toggleOpen(info.targetNode);
	    } else {
	      insertDplhAfterTo(info.dplh, info.targetNode, info);
	    }
	  },
	  'prepend': function prepend(info) {
	    if (isNodeDroppable(info.targetNode)) {
	      prependTo$1(info.dplh, info.targetNode);
	      if (!info.targetNode.open) info.store.toggleOpen(info.targetNode);
	    } else {
	      insertDplhAfterTo(info.dplh, info.targetNode, info);
	    }
	  },
	  'after target parent': function afterTargetParent(info) {
	    insertDplhAfterTo(info.dplh, info.targetNode.parent, info);
	  },
	  // append to prev sibling
	  'append prev': function appendPrev(info) {
	    if (isNodeDroppable(info.targetPrev)) {
	      appendTo$1(info.dplh, info.targetPrev);
	      if (!info.targetPrev.open) info.store.toggleOpen(info.targetPrev);
	    } else {
	      insertDplhAfterTo(info.dplh, info.targetPrev, info);
	    }
	  },
	  // append to current tree
	  'append current tree': function appendCurrentTree(info) {
	    if (isNodeDroppable(info.currentTree.rootData)) {
	      appendTo$1(info.dplh, info.currentTree.rootData);
	    }
	  }
	};

	function insertDplhAfterTo(dplh, targetNode, info) {
	  if (!targetNode) {
	    return false;
	  } else {
	    var closest = findParent$1(targetNode, function (node) {
	      return node.parent && isNodeDroppable(node.parent);
	    });

	    if (closest) {
	      insertAfter$1(dplh, closest);
	    } else {
	      return false;
	    }
	  }

	  return true;
	}

	function isNodeDraggable(node) {
	  if (!draggableIds.hasOwnProperty(node._id)) {
	    var r;

	    if (node.hasOwnProperty('draggable')) {
	      r = node.draggable;
	    } else if (node.parent) {
	      r = isNodeDraggable(node.parent);
	    } else {
	      r = true;
	    }

	    draggableIds[node._id] = r;
	  }

	  return draggableIds[node._id];
	}
	function isNodeDroppable(node) {
	  if (!droppableIds.hasOwnProperty(node._id)) {
	    var r;

	    if (node.hasOwnProperty('droppable')) {
	      r = node.droppable;
	    } else if (node.parent) {
	      r = isNodeDroppable(node.parent);
	    } else {
	      r = true;
	    }

	    droppableIds[node._id] = r;
	  }

	  return droppableIds[node._id];
	} // find child, excluding dragging node default

	function findChild(info, children, handler, reverse) {
	  var len = children.length;

	  if (reverse) {
	    for (var i = len - 1; i >= 0; i--) {
	      var item = children[i]; // excluding dragging node

	      if (item !== info.node) {
	        if (handler(item, i)) {
	          return item;
	        }
	      }
	    }
	  } else {
	    for (var _i = 0; _i < len; _i++) {
	      var _item = children[_i]; // excluding dragging node

	      if (_item !== info.node) {
	        if (handler(_item, _i)) {
	          return _item;
	        }
	      }
	    }
	  }
	} // start from node self


	function findParent$1(node, handle) {
	  var current = node;

	  while (current) {
	    if (handle(current)) {
	      return current;
	    }

	    current = current.parent;
	  }
	}

	var rules = {
	  // 另一节点存在
	  'targetNode existed': function targetNodeExisted(info) {
	    return info.targetNode;
	  },
	  // 另一节点是拖动占位节点
	  'targetNode is placeholder': function targetNodeIsPlaceholder(info) {
	    return info.targetNode.isDragPlaceHolder;
	  },
	  // 另一节点在最上面
	  'targetNode at top': function targetNodeAtTop(info) {
	    return info.targetAtTop;
	  },
	  // 另一节点在最下面
	  'targetNode at bottom': function targetNodeAtBottom(info) {
	    return info.targetAtBottom;
	  },
	  // 另一节点是根节点第二个子
	  'targetNode is the second child of root': function targetNodeIsTheSecondChildOfRoot(info) {
	    return info.currentTreeRootSecondChildExcludingDragging === info.targetNode;
	  },
	  // 拖动点坐标在任一树中, 同时, 起始树要可拖出, 当前树要可拖入
	  'currentTree existed': function currentTreeExisted(info) {
	    return info.currentTree;
	  },
	  // 当前树为空(不包括占位节点)
	  'currentTree empty': function currentTreeEmpty(info) {
	    return !findChild(info, info.currentTree.rootData.children, function (v) {
	      return v;
	    });
	  },
	  // 占位节点存在
	  'placeholder existed': function placeholderExisted(info) {
	    return info.dplhEl;
	  },
	  // 占位节点在当前树中
	  'placeholder in currentTree': function placeholderInCurrentTree(info) {
	    return info.dplhElInCurrentTree;
	  },
	  // 占位节点在最上面
	  'placeholder at top': function placeholderAtTop(info) {
	    return info.dplhAtTop;
	  },
	  // 另一节点是打开的
	  'targetNode is open': function targetNodeIsOpen(info) {
	    return info.targetNode.open;
	  },
	  // 另一节点有子(不包括占位节点)
	  'targetNode has children excluding placeholder': function targetNodeHasChildrenExcludingPlaceholder(info) {
	    return findChild(info, info.targetNode.children, function (v) {
	      return v !== info.dplh;
	    });
	  },
	  // 另一节点是第一个节点
	  'targetNode is 1st child': function targetNodeIs1stChild(info) {
	    return findChild(info, info.targetNode.parent.children, function (v) {
	      return v;
	    }) === info.targetNode;
	  },
	  // 另一节点是最后节点
	  'targetNode is last child': function targetNodeIsLastChild(info) {
	    return findChild(info, info.targetNode.parent.children, function (v) {
	      return v;
	    }, true) === info.targetNode;
	  },
	  // 当前位置在另一节点inner垂直中线上
	  'on targetNode middle': function onTargetNodeMiddle(info) {
	    return info.offset.y <= info.tiMiddleY;
	  },
	  // 当前位置在另一节点inner左边
	  'at left': function atLeft(info) {
	    return info.offset.x < info.tiOffset.x;
	  },
	  // 当前位置在另一节点innner indent位置右边
	  'at indent right': function atIndentRight(info) {
	    return info.offset.x > info.tiOffset.x + info.currentTree.indent;
	  }
	}; // convert rule output to Boolean

	var _loop$1 = function _loop() {
	  var key = _Object$keys[_i2];
	  var old = rules[key];

	  rules[key] = function () {
	    return Boolean(old.apply(void 0, arguments));
	  };
	};

	for (var _i2 = 0, _Object$keys = Object.keys(rules); _i2 < _Object$keys.length; _i2++) {
	  _loop$1();
	}

	var prevTree;
	var droppableIds = {};
	var draggableIds = {}; // context is vm

	function autoMoveDragPlaceHolder(draggableHelperInfo) {
	  var trees = this.store.trees;
	  var dhStore = draggableHelperInfo.store; // make info

	  var info = {
	    event: draggableHelperInfo.event,
	    el: dhStore.el,
	    vm: this,
	    node: this.data,
	    store: this.store,
	    dplh: this.store.dplh,
	    draggableHelperData: {
	      opt: draggableHelperInfo.options,
	      store: dhStore
	    }
	  }; //

	  attachCache$1(info, new Cache$1(), {
	    // dragging node coordinate
	    // 拖动中的节点相关坐标
	    nodeInnerEl: function nodeInnerEl() {
	      return this.el.querySelector('.tree-node-inner');
	    },
	    offset: function offset() {
	      return getOffset(this.nodeInnerEl);
	    },
	    // left top point
	    offset2: function offset2() {
	      return {
	        x: this.offset.x + this.nodeInnerEl.offsetWidth,
	        y: this.offset.y + this.nodeInnerEl.offsetHeight
	      };
	    },
	    // right bottom point
	    offsetToViewPort: function offsetToViewPort() {
	      var r = this.nodeInnerEl.getBoundingClientRect();
	      r.x = r.left;
	      r.y = r.top;
	      return r;
	    },
	    // tree
	    currentTree: function currentTree() {
	      // const currentTree = trees.find(tree => hp.isOffsetInEl(this.offset.x, this.offset.y, tree.$el))
	      var currentTree = getTreeByPoint(this.offsetToViewPort.x, this.offsetToViewPort.y, trees);

	      if (currentTree) {
	        var dragStartTree = this.store;

	        if (prevTree == null) {
	          prevTree = dragStartTree;
	        }

	        if (prevTree !== currentTree) {
	          if (!isPropTrue(dragStartTree.crossTree) || !isPropTrue(currentTree.crossTree)) {
	            return;
	          }

	          prevTree = currentTree;
	        }

	        if (!isPropTrue(currentTree.droppable)) {
	          return;
	        }

	        return currentTree;
	      }
	    },
	    currentTreeRootEl: function currentTreeRootEl() {
	      return document.getElementById(this.currentTree.rootData._id);
	    },
	    currentTreeRootOf4: function currentTreeRootOf4() {
	      return getOf4(this.currentTreeRootEl, this.currentTree.space);
	    },
	    // the second child of currentTree root, excluding dragging node
	    currentTreeRootSecondChildExcludingDragging: function currentTreeRootSecondChildExcludingDragging() {
	      var _this = this;

	      return this.currentTree.rootData.children.slice(0, 3).filter(function (v) {
	        return v !== _this.node;
	      })[1];
	    },
	    // placeholder
	    dplhEl: function dplhEl() {
	      return document.getElementById(this.dplh._id);
	    },
	    dplhElInCurrentTree: function dplhElInCurrentTree() {
	      return Boolean(this.currentTree.$el.querySelector("#".concat(this.dplh._id)));
	    },
	    dplhOf4: function dplhOf4() {
	      return getOf4(this.dplhEl, this.currentTree.space);
	    },
	    dplhAtTop: function dplhAtTop() {
	      return Math.abs(this.dplhOf4.y - this.currentTreeRootOf4.y) < 5;
	    },
	    targetAtTop: function targetAtTop() {
	      return Math.abs(this.tiOf4.y - this.currentTreeRootOf4.y) < 5;
	    },
	    targetAtBottom: function targetAtBottom() {
	      return Math.abs(this.tiOf4.y2 - this.currentTreeRootOf4.y2) < 5;
	    },
	    // most related node
	    // 最相关的另一个节点
	    targetNode: function targetNode() {
	      var currentTree = this.currentTree;

	      if (!currentTree) {
	        throw 'no currentTree';
	      } //


	      var _this$offset = this.offset,
	          x = _this$offset.x,
	          y = _this$offset.y;
	      var currentNode = currentTree.rootData;

	      while (true) {
	        var children = currentNode.children;

	        if (!children) {
	          break;
	        }

	        if (this.node.parent === currentNode) {
	          // dragging node is in currentNode children, remove it first
	          children = children.slice();
	          children.splice(children.indexOf(this.node), 1);
	        }

	        if (children.length === 0) {
	          break;
	        }

	        var t = binarySearch(children, function (node) {
	          var el = document.getElementById(node._id);
	          var ty = getOffset(el).y;
	          var ty2 = ty + el.offsetHeight + currentTree.space;

	          if (ty2 < y) {
	            return -1;
	          } else if (ty <= y) {
	            return 0;
	          } else {
	            return 1;
	          }
	        }, null, null, true);

	        if (t.hit) {
	          currentNode = t.value;
	        } else {
	          if (t.bigger) {
	            currentNode = children[t.index - 1];
	          } else {
	            currentNode = t.value;
	          }
	        }

	        if (!currentNode) {
	          currentNode = children[0];
	          break;
	        }

	        if (!currentNode) {
	          break;
	        }

	        var innerEl = document.getElementById(currentNode._id).querySelector('.tree-node-inner');
	        var of = getOf4(innerEl, currentTree.space);

	        if (of.y <= y && y <= of.y2) {
	          break;
	        }
	      }

	      return currentNode;
	    },
	    targetNodeEl: function targetNodeEl() {
	      return document.getElementById(this.targetNode._id);
	    },
	    // targetNodeInnerElOffset
	    tiInnerEl: function tiInnerEl() {
	      return this.targetNodeEl.querySelector('.tree-node-inner');
	    },
	    tiOffset: function tiOffset() {
	      return getOffset(this.tiInnerEl);
	    },
	    tiOf4: function tiOf4() {
	      return getOf4(this.tiInnerEl, this.currentTree.space);
	    },
	    tiMiddleY: function tiMiddleY() {
	      return this.tiOffset.y + this.tiInnerEl.offsetHeight / 2;
	    },
	    //
	    targetPrevEl: function targetPrevEl() {
	      // tree node 之间不要有其他元素, 否则这里会获取到错误的元素
	      var r = this.targetNodeEl.previousSibling;

	      if (hasClass(r, 'dragging')) {
	        r = r.previousSibling;
	      }

	      return r;
	    },
	    targetPrev: function targetPrev() {
	      var id = this.targetPrevEl.getAttribute('id');
	      return this.currentTree.getNodeById(id);
	    }
	  }); // attachCache end
	  // decision start =================================

	  var executedRuleCache = {}; // exec rule

	  var exec = function exec(ruleId) {
	    if (!executedRuleCache.hasOwnProperty(ruleId)) {
	      var r;

	      try {
	        r = rules[ruleId](info);
	      } catch (e) {
	        r = e;

	        try {
	          if (process.env.DEVELOPE_SELF) {
	            // only visible when develop its self
	            console.warn("failed to execute rule '".concat(ruleId, "'"), e);
	          }
	        } catch (e2) {}
	      }

	      executedRuleCache[ruleId] = r;
	    }

	    return executedRuleCache[ruleId];
	  };

	  if (exec('currentTree existed') === true) {
	    if (exec('targetNode is placeholder') === false) {
	      if (exec('targetNode is the second child of root') === true) {
	        if (exec('targetNode has children excluding placeholder') === false) {
	          if (exec('on targetNode middle') === true) {
	            targets['before'](info);
	          } else if (exec('on targetNode middle') === false) {
	            if (exec('at indent right') === true) {
	              targets['append'](info);
	            } else if (exec('at indent right') === false) {
	              targets['after'](info);
	            }
	          }
	        } else if (exec('targetNode has children excluding placeholder') === true) {
	          targets['prepend'](info);
	        }
	      } else if (exec('targetNode is the second child of root') === false) {
	        if (exec('currentTree empty') === false) {
	          if (exec('targetNode at top') === true) {
	            if (exec('placeholder in currentTree') === true) {
	              if (exec('targetNode has children excluding placeholder') === false) {
	                if (exec('on targetNode middle') === false) {
	                  if (exec('at indent right') === false) {
	                    targets['after'](info);
	                  } else if (exec('at indent right') === true) {
	                    targets['append'](info);
	                  }
	                } else if (exec('on targetNode middle') === true) {
	                  targets['before'](info);
	                }
	              } else if (exec('targetNode has children excluding placeholder') === true) {
	                if (exec('on targetNode middle') === false) {
	                  targets['prepend'](info);
	                } else if (exec('on targetNode middle') === true) {
	                  targets['before'](info);
	                }
	              }
	            } else if (exec('placeholder in currentTree') === false) {
	              targets['before'](info);
	            }
	          } else if (exec('targetNode at top') === false) {
	            if (exec('targetNode at bottom') === false) {
	              if (exec('placeholder at top') === true) {
	                targets['prepend'](info);
	              } else if (exec('placeholder at top') === false) {
	                if (exec('targetNode has children excluding placeholder') === true) {
	                  targets['prepend'](info);
	                } else if (exec('targetNode has children excluding placeholder') === false) {
	                  if (exec('targetNode is 1st child') === false) {
	                    if (exec('targetNode is last child') === false) {
	                      if (exec('on targetNode middle') === true) {
	                        if (exec('at indent right') === true) {
	                          targets['append'](info);
	                        } else if (exec('at indent right') === false) {
	                          targets['after'](info);
	                        }
	                      } else if (exec('on targetNode middle') === false) {
	                        if (exec('at indent right') === true) {
	                          targets['append'](info);
	                        } else if (exec('at indent right') === false) {
	                          targets['after'](info);
	                        }
	                      }
	                    } else if (exec('targetNode is last child') === true) {
	                      if (exec('at indent right') === true) {
	                        targets['append'](info);
	                      } else if (exec('at indent right') === false) {
	                        targets['after'](info);
	                      }
	                    }
	                  } else if (exec('targetNode is 1st child') === true) {
	                    if (exec('targetNode is last child') === true) {
	                      targets['append'](info);
	                    } else if (exec('targetNode is last child') === false) {
	                      if (exec('on targetNode middle') === false) {
	                        if (exec('at indent right') === false) {
	                          targets['after'](info);
	                        } else if (exec('at indent right') === true) {
	                          targets['append'](info);
	                        }
	                      } else if (exec('on targetNode middle') === true) {
	                        if (exec('at indent right') === false) {
	                          targets['after'](info);
	                        } else if (exec('at indent right') === true) {
	                          targets['append'](info);
	                        }
	                      }
	                    }
	                  }
	                }
	              }
	            } else if (exec('targetNode at bottom') === true) {
	              if (exec('placeholder in currentTree') === true) {
	                if (exec('on targetNode middle') === false) {
	                  if (exec('at indent right') === true) {
	                    targets['append'](info);
	                  } else if (exec('at indent right') === false) {
	                    targets['after'](info);
	                  }
	                } else if (exec('on targetNode middle') === true) {
	                  targets['append'](info);
	                }
	              } else if (exec('placeholder in currentTree') === false) {
	                targets['append'](info);
	              }
	            }
	          }
	        } else if (exec('currentTree empty') === true) {
	          targets['append current tree'](info);
	        }
	      }
	    } else if (exec('targetNode is placeholder') === true) {
	      if (exec('targetNode at bottom') === false) {
	        if (exec('targetNode is the second child of root') === false) {
	          if (exec('targetNode is 1st child') === true) {
	            if (exec('targetNode is last child') === false) ; else if (exec('targetNode is last child') === true) {
	              if (exec('on targetNode middle') === false) {
	                if (exec('at left') === true) {
	                  targets['after target parent'](info);
	                } else if (exec('at left') === false) ;
	              } else if (exec('on targetNode middle') === true) {
	                if (exec('at left') === true) {
	                  targets['after target parent'](info);
	                } else if (exec('at left') === false) ;
	              }
	            }
	          } else if (exec('targetNode is 1st child') === false) {
	            if (exec('targetNode is last child') === true) {
	              if (exec('on targetNode middle') === true) {
	                if (exec('at left') === true) {
	                  targets['after target parent'](info);
	                } else if (exec('at left') === false) {
	                  if (exec('at indent right') === true) {
	                    targets['append prev'](info);
	                  } else if (exec('at indent right') === false) ;
	                }
	              } else if (exec('on targetNode middle') === false) {
	                if (exec('at left') === true) {
	                  targets['after target parent'](info);
	                } else if (exec('at left') === false) {
	                  if (exec('at indent right') === true) {
	                    targets['append prev'](info);
	                  } else if (exec('at indent right') === false) ;
	                }
	              }
	            } else if (exec('targetNode is last child') === false) {
	              if (exec('on targetNode middle') === true) {
	                if (exec('at left') === true) ; else if (exec('at left') === false) {
	                  if (exec('at indent right') === true) {
	                    targets['append prev'](info);
	                  } else if (exec('at indent right') === false) ;
	                }
	              } else if (exec('on targetNode middle') === false) {
	                if (exec('at left') === true) ; else if (exec('at left') === false) {
	                  if (exec('at indent right') === true) {
	                    targets['append prev'](info);
	                  } else if (exec('at indent right') === false) ;
	                }
	              }
	            }
	          }
	        } else if (exec('targetNode is the second child of root') === true) {
	          if (exec('on targetNode middle') === true) {
	            if (exec('at indent right') === true) {
	              targets['append prev'](info);
	            } else if (exec('at indent right') === false) ;
	          } else if (exec('on targetNode middle') === false) {
	            if (exec('at indent right') === true) {
	              targets['append prev'](info);
	            } else if (exec('at indent right') === false) ;
	          }
	        }
	      } else if (exec('targetNode at bottom') === true) {
	        if (exec('targetNode is 1st child') === true) {
	          if (exec('on targetNode middle') === false) {
	            if (exec('at left') === true) {
	              targets['after target parent'](info);
	            } else if (exec('at left') === false) ;
	          } else if (exec('on targetNode middle') === true) {
	            if (exec('at left') === false) ; else if (exec('at left') === true) {
	              targets['after target parent'](info);
	            }
	          }
	        } else if (exec('targetNode is 1st child') === false) {
	          if (exec('on targetNode middle') === false) {
	            if (exec('at left') === true) {
	              targets['after target parent'](info);
	            } else if (exec('at left') === false) {
	              if (exec('at indent right') === true) {
	                targets['append prev'](info);
	              } else if (exec('at indent right') === false) ;
	            }
	          } else if (exec('on targetNode middle') === true) {
	            if (exec('at left') === true) {
	              targets['after target parent'](info);
	            } else if (exec('at left') === false) {
	              if (exec('at indent right') === true) {
	                targets['append prev'](info);
	              } else if (exec('at indent right') === false) ;
	            }
	          }
	        }
	      }
	    }
	  } else if (exec('currentTree existed') === false) ; // decision end =================================
	  //

	}

	function getOf4(el, space) {
	  var r = getOffset(el);
	  r.x2 = r.x + el.offsetWidth;
	  r.y2 = r.y + el.offsetHeight + space;
	  return r;
	}

	autoMoveDragPlaceHolder.dragStart = function dragStart() {};

	autoMoveDragPlaceHolder.dragEnd = function dragEnd() {
	  prevTree = null;
	  droppableIds = {};
	  draggableIds = {};
	};

	var script$2 = {
	  extends: TreeNode,
	  name: 'TreeNode',
	  mounted: function mounted() {
	    var _this = this;

	    this.store.isNodeDraggable = isNodeDraggable;
	    this.store.isNodeDroppable = isNodeDroppable;

	    if (this.isRoot || this.data.isDragPlaceHolder) {
	      return;
	    }

	    var dplh = this.store.dplh;
	    this.$watch('store.draggable', function (draggable) {
	      if (isPropTrue(draggable)) {
	        var triggerEl = _this.store.getTriggerEl ? _this.store.getTriggerEl(_this) : _this.$el.querySelector('.tree-node-inner');
	        _this._draggableDestroy = index$1(triggerEl, {
	          preventSelect: isPropTrue(_this.store.preventSelect),
	          // trigger el
	          getEl: function getEl() {
	            return _this.$el;
	          },
	          minTranslate: 10,
	          drag: function drag(e, opt, store$$1) {
	            autoMoveDragPlaceHolder.dragStart(); // this store is not tree

	            var draggableHelperInfo = {
	              event: e,
	              options: opt,
	              store: store$$1
	            };

	            if (_this.store.ondragstart && _this.store.ondragstart(_this.data, draggableHelperInfo) === false) {
	              return false;
	            }

	            if (!isNodeDraggable(_this.data)) {
	              return false;
	            }

	            _this.store.$emit('drag', _this.data); // record start positon


	            var siblings = _this.data.parent.children;
	            _this.startPosition = {
	              siblings: siblings,
	              index: siblings.indexOf(_this.data)
	            }; //

	            dplh.innerStyle.height = store$$1.el.offsetHeight + 'px';
	            insertAfter$1(dplh, _this.data);
	            _this.data.class += ' dragging'; // console.log('drag start');
	          },
	          moving: function moving(e, opt, store$$1) {
	            if (store$$1.movedCount === 0) {
	              return;
	            }

	            var draggableHelperInfo = {
	              event: e,
	              options: opt,
	              store: store$$1
	            };
	            return autoMoveDragPlaceHolder.call(_this, draggableHelperInfo);
	          },
	          drop: function drop(e, opt, store$$1) {
	            autoMoveDragPlaceHolder.dragEnd();
	            var draggableHelperInfo = {
	              event: e,
	              options: opt,
	              store: store$$1
	            };

	            if (_this.store.ondragend && _this.store.ondragend(_this.data, draggableHelperInfo) === false) {
	              arrayRemove(dplh.parent.children, dplh); // can't drop, no change
	            } else {
	              var targetTree = dplh._vm.store;
	              var crossTree = targetTree !== _this.store;
	              var oldTree = crossTree ? _this.store : null;
	              insertAfter$1(_this.data, dplh);
	              arrayRemove(dplh.parent.children, dplh);
	              _this.data.class = _this.data.class.replace(/(^| )dragging( |$)/g, ' ');
	              targetTree.$emit('drop', _this.data, targetTree, oldTree);
	              oldTree && oldTree.$emit('drop', _this.data, targetTree, oldTree); // emit change event if changed

	              var siblings = _this.data.parent.children;

	              if (siblings === _this.startPosition.siblings && siblings.indexOf(_this.data) === _this.startPosition.index) ; else {
	                _this.store.$emit('change', _this.data, targetTree, oldTree);

	                oldTree && oldTree.$emit('change', _this.data, targetTree, oldTree);
	              }

	              _this.startPosition = null;
	            } // console.log('drag end');

	          }
	        });
	      } else {
	        if (_this._draggableDestroy) {
	          _this._draggableDestroy();

	          _this._draggableDestroy = null;
	        }
	      }
	    }, {
	      immediate: true
	    });
	  }
	};

	/* script */
	const __vue_script__$2 = script$2;

	/* template */

	  /* style */
	  const __vue_inject_styles__$2 = undefined;
	  /* scoped */
	  const __vue_scope_id__$2 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$2 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$2 = undefined;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var DraggableTreeNode = normalizeComponent_1(
	    {},
	    __vue_inject_styles__$2,
	    __vue_script__$2,
	    __vue_scope_id__$2,
	    __vue_is_functional_template__$2,
	    __vue_module_identifier__$2,
	    undefined,
	    undefined
	  );

	var trees = []; // for multiple trees
	// DragPlaceHolder, unique

	var dplh = {
	  _id: 'draggable_tree_drag_placeHolder',
	  level: null,
	  droppable: false,
	  isDragPlaceHolder: true,
	  class: 'draggable-placeholder',
	  style: {},
	  innerStyle: {},
	  innerClass: 'draggable-placeholder-inner',
	  innerBackStyle: {},
	  innerBackClass: 'draggable-placeholder-inner-back' // children: [],

	};
	var script$3 = {
	  extends: Tree,
	  props: {
	    getTriggerEl: {
	      type: Function
	    },
	    draggable: {},
	    droppable: {
	      default: true
	    },
	    crossTree: {},
	    ondragstart: {
	      type: Function
	    },
	    ondragend: {
	      type: Function
	    },
	    preventSelect: {
	      default: true
	    }
	  },
	  components: {
	    TreeNode: DraggableTreeNode
	  },
	  data: function data() {
	    return {
	      // DragPlaceHolder
	      dplh: dplh,
	      trees: trees
	    };
	  },
	  // computed: {},
	  // watch: {},
	  // methods: {},
	  created: function created() {
	    trees.push(this);
	  },
	  mounted: function mounted() {},
	  beforeDestroy: function beforeDestroy() {
	    arrayRemove(trees, this);
	  }
	};

	/* script */
	const __vue_script__$3 = script$3;

	/* template */

	  /* style */
	  const __vue_inject_styles__$3 = undefined;
	  /* scoped */
	  const __vue_scope_id__$3 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$3 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$3 = undefined;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var DraggableTree = normalizeComponent_1(
	    {},
	    __vue_inject_styles__$3,
	    __vue_script__$3,
	    __vue_scope_id__$3,
	    __vue_is_functional_template__$3,
	    __vue_module_identifier__$3,
	    undefined,
	    undefined
	  );

	exports.Tree = Tree;
	exports.TreeNode = TreeNode;
	exports.DraggableTree = DraggableTree;
	exports.DraggableTreeNode = DraggableTreeNode;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
