(function() {
	//#region src/ol/CollectionEventType.js
	/**
	* @module ol/CollectionEventType
	*/
	/**
	* @enum {string}
	*/
	var CollectionEventType_default = {
		/**
		* Triggered when an item is added to the collection.
		* @event module:ol/Collection.CollectionEvent#add
		* @api
		*/
		ADD: "add",
		/**
		* Triggered when an item is removed from the collection.
		* @event module:ol/Collection.CollectionEvent#remove
		* @api
		*/
		REMOVE: "remove"
	};
	//#endregion
	//#region src/ol/ObjectEventType.js
	/**
	* @module ol/ObjectEventType
	*/
	/**
	* @enum {string}
	*/
	var ObjectEventType_default = { 
	/**
	* Triggered when a property is changed.
	* @event module:ol/Object.ObjectEvent#propertychange
	* @api
	*/
PROPERTYCHANGE: "propertychange" };
	/**
	* @typedef {'propertychange'} Types
	*/
	//#endregion
	//#region src/ol/obj.js
	/**
	* @module ol/obj
	*/
	/**
	* Removes all properties from an object.
	* @param {Object<string, unknown>} object The object to clear.
	*/
	function clear(object) {
		for (const property in object) delete object[property];
	}
	/**
	* Determine if an object has any properties.
	* @param {Object} object The object to check.
	* @return {boolean} The object is empty.
	*/
	function isEmpty$1(object) {
		let property;
		for (property in object) return false;
		return !property;
	}
	//#endregion
	//#region src/ol/events.js
	/**
	* @module ol/events
	*/
	/**
	* Key to use with {@link module:ol/Observable.unByKey}.
	* @typedef {Object} EventsKey
	* @property {ListenerFunction} listener Listener.
	* @property {import("./events/Target.js").EventTargetLike} target Target.
	* @property {string} type Type.
	* @api
	*/
	/**
	* Listener function. This function is called with an event object as argument.
	* When the function returns `false`, event propagation will stop.
	*
	* @typedef {function((Event|import("./events/Event.js").default)): (void|boolean)} ListenerFunction
	* @api
	*/
	/**
	* @typedef {Object} ListenerObject
	* @property {ListenerFunction} handleEvent HandleEvent listener function.
	*/
	/**
	* @typedef {ListenerFunction|ListenerObject} Listener
	*/
	/**
	* Registers an event listener on an event target. Inspired by
	* https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
	*
	* This function efficiently binds a `listener` to a `this` object, and returns
	* a key for use with {@link module:ol/events.unlistenByKey}.
	*
	* @param {import("./events/Target.js").EventTargetLike} target Event target.
	* @param {string} type Event type.
	* @param {ListenerFunction} listener Listener.
	* @param {Object} [thisArg] Object referenced by the `this` keyword in the
	*     listener. Default is the `target`.
	* @param {boolean} [once] If true, add the listener as one-off listener.
	* @return {EventsKey} Unique key for the listener.
	*/
	function listen(target, type, listener, thisArg, once) {
		if (once) {
			const originalListener = listener;
			/**
			* @param {Event|import('./events/Event.js').default} event The event
			* @return {void|boolean} When the function returns `false`, event propagation will stop.
			* @this {typeof target}
			*/
			listener = function(event) {
				target.removeEventListener(type, listener);
				return originalListener.call(thisArg ?? this, event);
			};
		} else if (thisArg && thisArg !== target) listener = listener.bind(thisArg);
		const eventsKey = {
			target,
			type,
			listener
		};
		target.addEventListener(type, listener);
		return eventsKey;
	}
	/**
	* Registers a one-off event listener on an event target. Inspired by
	* https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
	*
	* This function efficiently binds a `listener` as self-unregistering listener
	* to a `this` object, and returns a key for use with
	* {@link module:ol/events.unlistenByKey} in case the listener needs to be
	* unregistered before it is called.
	*
	* When {@link module:ol/events.listen} is called with the same arguments after this
	* function, the self-unregistering listener will be turned into a permanent
	* listener.
	*
	* @param {import("./events/Target.js").EventTargetLike} target Event target.
	* @param {string} type Event type.
	* @param {ListenerFunction} listener Listener.
	* @param {Object} [thisArg] Object referenced by the `this` keyword in the
	*     listener. Default is the `target`.
	* @return {EventsKey} Key for unlistenByKey.
	*/
	function listenOnce(target, type, listener, thisArg) {
		return listen(target, type, listener, thisArg, true);
	}
	/**
	* Unregisters event listeners on an event target. Inspired by
	* https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
	*
	* The argument passed to this function is the key returned from
	* {@link module:ol/events.listen} or {@link module:ol/events.listenOnce}.
	*
	* @param {EventsKey} key The key.
	*/
	function unlistenByKey(key) {
		if (key && key.target) {
			key.target.removeEventListener(key.type, key.listener);
			clear(key);
		}
	}
	//#endregion
	//#region src/ol/events/EventType.js
	/**
	* @module ol/events/EventType
	*/
	/**
	* @enum {string}
	* @const
	*/
	var EventType_default$2 = {
		/**
		* Generic change event. Triggered when the revision counter is increased.
		* @event module:ol/events/Event~BaseEvent#change
		* @api
		*/
		CHANGE: "change",
		/**
		* Generic error event. Triggered when an error occurs.
		* @event module:ol/events/Event~BaseEvent#error
		* @api
		*/
		ERROR: "error",
		BLUR: "blur",
		CLEAR: "clear",
		CONTEXTMENU: "contextmenu",
		CLICK: "click",
		DBLCLICK: "dblclick",
		DRAGENTER: "dragenter",
		DRAGOVER: "dragover",
		DROP: "drop",
		FOCUS: "focus",
		KEYDOWN: "keydown",
		KEYPRESS: "keypress",
		LOAD: "load",
		RESIZE: "resize",
		TOUCHMOVE: "touchmove",
		WHEEL: "wheel"
	};
	//#endregion
	//#region src/ol/Disposable.js
	/**
	* @module ol/Disposable
	*/
	/**
	* @classdesc
	* Objects that need to clean up after themselves.
	*/
	var Disposable = class {
		constructor() {
			/**
			* The object has already been disposed.
			* @type {boolean}
			* @protected
			*/
			this.disposed = false;
		}
		/**
		* Clean up.
		*/
		dispose() {
			if (!this.disposed) {
				this.disposed = true;
				this.disposeInternal();
			}
		}
		/**
		* Extension point for disposable objects.
		* @protected
		*/
		disposeInternal() {}
	};
	//#endregion
	//#region src/ol/array.js
	/**
	* Compare function sorting arrays in ascending order.  Safe to use for numeric values.
	* @param {*} a The first object to be compared.
	* @param {*} b The second object to be compared.
	* @return {number} A negative number, zero, or a positive number as the first
	*     argument is less than, equal to, or greater than the second.
	*/
	function ascending(a, b) {
		return a > b ? 1 : a < b ? -1 : 0;
	}
	/**
	* {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution} can use a function
	* of this type to determine which nearest resolution to use.
	*
	* This function takes a `{number}` representing a value between two array entries,
	* a `{number}` representing the value of the nearest higher entry and
	* a `{number}` representing the value of the nearest lower entry
	* as arguments and returns a `{number}`. If a negative number or zero is returned
	* the lower value will be used, if a positive number is returned the higher value
	* will be used.
	* @typedef {function(number, number, number): number} NearestDirectionFunction
	* @api
	*/
	/**
	* @param {Array<number>} arr Array in descending order.
	* @param {number} target Target.
	* @param {number|NearestDirectionFunction} direction
	*    0 means return the nearest,
	*    > 0 means return the largest nearest,
	*    < 0 means return the smallest nearest.
	* @return {number} Index.
	*/
	function linearFindNearest(arr, target, direction) {
		if (arr[0] <= target) return 0;
		const n = arr.length;
		if (target <= arr[n - 1]) return n - 1;
		if (typeof direction === "function") {
			for (let i = 1; i < n; ++i) {
				const candidate = arr[i];
				if (candidate === target) return i;
				if (candidate < target) {
					if (direction(target, arr[i - 1], candidate) > 0) return i - 1;
					return i;
				}
			}
			return n - 1;
		}
		if (direction > 0) {
			for (let i = 1; i < n; ++i) if (arr[i] < target) return i - 1;
			return n - 1;
		}
		if (direction < 0) {
			for (let i = 1; i < n; ++i) if (arr[i] <= target) return i;
			return n - 1;
		}
		for (let i = 1; i < n; ++i) {
			if (arr[i] == target) return i;
			if (arr[i] < target) {
				if (arr[i - 1] - target < target - arr[i]) return i - 1;
				return i;
			}
		}
		return n - 1;
	}
	/**
	* @param {Array<VALUE>} arr The array to modify.
	* @param {!Array<VALUE>|VALUE} data The elements or arrays of elements to add to arr.
	* @template VALUE
	*/
	function extend$2(arr, data) {
		const extension = Array.isArray(data) ? data : [data];
		const length = extension.length;
		for (let i = 0; i < length; i++) arr[arr.length] = extension[i];
	}
	/**
	* @param {Array<any>|Uint8ClampedArray} arr1 The first array to compare.
	* @param {Array<any>|Uint8ClampedArray} arr2 The second array to compare.
	* @return {boolean} Whether the two arrays are equal.
	*/
	function equals$2(arr1, arr2) {
		const len1 = arr1.length;
		if (len1 !== arr2.length) return false;
		for (let i = 0; i < len1; i++) if (arr1[i] !== arr2[i]) return false;
		return true;
	}
	/**
	* @param {Array<*>} arr The array to test.
	* @param {Function} [func] Comparison function.
	* @param {boolean} [strict] Strictly sorted (default false).
	* @return {boolean} Return index.
	*/
	function isSorted(arr, func, strict) {
		const compare = func || ascending;
		return arr.every(function(currentVal, index) {
			if (index === 0) return true;
			const res = compare(arr[index - 1], currentVal);
			return !(res > 0 || strict && res === 0);
		});
	}
	//#endregion
	//#region src/ol/functions.js
	/**
	* @module ol/functions
	*/
	/**
	* Always returns true.
	* @return {boolean} true.
	*/
	function TRUE() {
		return true;
	}
	/**
	* Always returns false.
	* @return {boolean} false.
	*/
	function FALSE() {
		return false;
	}
	/**
	* A reusable function, used e.g. as a default for callbacks.
	*
	* @return {void} Nothing.
	*/
	function VOID() {}
	/**
	* Wrap a function in another function that remembers the last return.  If the
	* returned function is called twice in a row with the same arguments and the same
	* this object, it will return the value from the first call in the second call.
	*
	* @param {function(...any): ReturnType} fn The function to memoize.
	* @return {function(...any): ReturnType} The memoized function.
	* @template ReturnType
	*/
	function memoizeOne(fn) {
		/** @type {ReturnType} */
		let lastResult;
		/** @type {Array<any>|undefined} */
		let lastArgs;
		let lastThis;
		/**
		* @this {*} Only need to know if `this` changed, don't care what type
		* @return {ReturnType} Memoized value
		*/
		return function() {
			const nextArgs = Array.prototype.slice.call(arguments);
			if (!lastArgs || this !== lastThis || !equals$2(nextArgs, lastArgs)) {
				lastThis = this;
				lastArgs = nextArgs;
				lastResult = fn.apply(this, arguments);
			}
			return lastResult;
		};
	}
	/**
	* @template T
	* @param {function(): (T | Promise<T>)} getter A function that returns a value or a promise for a value.
	* @return {Promise<T>} A promise for the value.
	*/
	function toPromise(getter) {
		function promiseGetter() {
			let value;
			try {
				value = getter();
			} catch (err) {
				return Promise.reject(err);
			}
			if (value instanceof Promise) return value;
			return Promise.resolve(value);
		}
		return promiseGetter();
	}
	//#endregion
	//#region src/ol/events/Event.js
	/**
	* @module ol/events/Event
	*/
	/**
	* @classdesc
	* Stripped down implementation of the W3C DOM Level 2 Event interface.
	* See https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-interface.
	*
	* This implementation only provides `type` and `target` properties, and
	* `stopPropagation` and `preventDefault` methods. It is meant as base class
	* for higher level events defined in the library, and works with
	* {@link module:ol/events/Target~Target}.
	*/
	var BaseEvent = class {
		/**
		* @param {string} type Type.
		*/
		constructor(type) {
			/**
			* @type {boolean}
			*/
			this.propagationStopped;
			/**
			* @type {boolean}
			*/
			this.defaultPrevented;
			/**
			* The event type.
			* @type {string}
			* @api
			*/
			this.type = type;
			/**
			* The event target.
			* @type {Object}
			* @api
			*/
			this.target = null;
		}
		/**
		* Prevent default. This means that no emulated `click`, `singleclick` or `doubleclick` events
		* will be fired.
		* @api
		*/
		preventDefault() {
			this.defaultPrevented = true;
		}
		/**
		* Stop event propagation.
		* @api
		*/
		stopPropagation() {
			this.propagationStopped = true;
		}
	};
	//#endregion
	//#region src/ol/events/Target.js
	/**
	* @module ol/events/Target
	*/
	/**
	* @typedef {EventTarget|Target} EventTargetLike
	*/
	/**
	* @classdesc
	* A simplified implementation of the W3C DOM Level 2 EventTarget interface.
	* See https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-EventTarget.
	*
	* There are two important simplifications compared to the specification:
	*
	* 1. The handling of `useCapture` in `addEventListener` and
	*    `removeEventListener`. There is no real capture model.
	* 2. The handling of `stopPropagation` and `preventDefault` on `dispatchEvent`.
	*    There is no event target hierarchy. When a listener calls
	*    `stopPropagation` or `preventDefault` on an event object, it means that no
	*    more listeners after this one will be called. Same as when the listener
	*    returns false.
	*/
	var Target = class extends Disposable {
		/**
		* @param {*} [target] Default event target for dispatched events.
		*/
		constructor(target) {
			super();
			/**
			* @private
			* @type {*}
			*/
			this.eventTarget_ = target;
			/**
			* @private
			* @type {Object<string, number>|null}
			*/
			this.pendingRemovals_ = null;
			/**
			* @private
			* @type {Object<string, number>|null}
			*/
			this.dispatching_ = null;
			/**
			* @private
			* @type {Object<string, Array<import("../events.js").Listener>>|null}
			*/
			this.listeners_ = null;
		}
		/**
		* @param {string} type Type.
		* @param {import("../events.js").Listener} listener Listener.
		*/
		addEventListener(type, listener) {
			if (!type || !listener) return;
			const listeners = this.listeners_ || (this.listeners_ = {});
			const listenersForType = listeners[type] || (listeners[type] = []);
			if (!listenersForType.includes(listener)) listenersForType.push(listener);
		}
		/**
		* Dispatches an event and calls all listeners listening for events
		* of this type. The event parameter can either be a string or an
		* Object with a `type` property.
		*
		* @param {import("./Event.js").default|string} event Event object.
		* @return {boolean|undefined} `false` if anyone called preventDefault on the
		*     event object or if any of the listeners returned false.
		* @api
		*/
		dispatchEvent(event) {
			const isString = typeof event === "string";
			const type = isString ? event : event.type;
			const listeners = this.listeners_ && this.listeners_[type];
			if (!listeners) return;
			const evt = isString ? new BaseEvent(event) : event;
			if (!evt.target) evt.target = this.eventTarget_ || this;
			const dispatching = this.dispatching_ || (this.dispatching_ = {});
			const pendingRemovals = this.pendingRemovals_ || (this.pendingRemovals_ = {});
			if (!(type in dispatching)) {
				dispatching[type] = 0;
				pendingRemovals[type] = 0;
			}
			++dispatching[type];
			let propagate;
			for (let i = 0, ii = listeners.length; i < ii; ++i) {
				if ("handleEvent" in listeners[i]) propagate = listeners[i].handleEvent(evt);
				else propagate = listeners[i].call(this, evt);
				if (propagate === false || evt.propagationStopped) {
					propagate = false;
					break;
				}
			}
			if (--dispatching[type] === 0) {
				let pr = pendingRemovals[type];
				delete pendingRemovals[type];
				while (pr--) this.removeEventListener(type, VOID);
				delete dispatching[type];
			}
			return propagate;
		}
		/**
		* Clean up.
		* @override
		*/
		disposeInternal() {
			this.listeners_ && clear(this.listeners_);
		}
		/**
		* Get the listeners for a specified event type. Listeners are returned in the
		* order that they will be called in.
		*
		* @param {string} type Type.
		* @return {Array<import("../events.js").Listener>|undefined} Listeners.
		*/
		getListeners(type) {
			return this.listeners_ && this.listeners_[type] || void 0;
		}
		/**
		* @param {string} [type] Type. If not provided,
		*     `true` will be returned if this event target has any listeners.
		* @return {boolean} Has listeners.
		*/
		hasListener(type) {
			if (!this.listeners_) return false;
			return type ? type in this.listeners_ : Object.keys(this.listeners_).length > 0;
		}
		/**
		* @param {string} type Type.
		* @param {import("../events.js").Listener} listener Listener.
		*/
		removeEventListener(type, listener) {
			if (!this.listeners_) return;
			const listeners = this.listeners_[type];
			if (!listeners) return;
			const index = listeners.indexOf(listener);
			if (index !== -1) if (this.pendingRemovals_ && type in this.pendingRemovals_) {
				listeners[index] = VOID;
				++this.pendingRemovals_[type];
			} else {
				listeners.splice(index, 1);
				if (listeners.length === 0) delete this.listeners_[type];
			}
		}
	};
	//#endregion
	//#region src/ol/Observable.js
	/**
	* @module ol/Observable
	*/
	/***
	* @template {string} Type
	* @template {Event|import("./events/Event.js").default} EventClass
	* @template Return
	* @typedef {(type: Type, listener: (event: EventClass) => ?) => Return} OnSignature
	*/
	/***
	* @template {string} Type
	* @template Return
	* @typedef {(type: Type[], listener: (event: Event|import("./events/Event.js").default) => ?) => Return extends void ? void : Return[]} CombinedOnSignature
	*/
	/**
	* @typedef {'change'|'error'} EventTypes
	*/
	/***
	* @template Return
	* @typedef {OnSignature<EventTypes, import("./events/Event.js").default, Return> & CombinedOnSignature<EventTypes, Return>} ObservableOnSignature
	*/
	/**
	* @classdesc
	* Abstract base class; normally only used for creating subclasses and not
	* instantiated in apps.
	* An event target providing convenient methods for listener registration
	* and unregistration. A generic `change` event is always available through
	* {@link module:ol/Observable~Observable#changed}.
	*
	* @fires import("./events/Event.js").default
	* @api
	*/
	var Observable = class extends Target {
		constructor() {
			super();
			this.on = this.onInternal;
			this.once = this.onceInternal;
			this.un = this.unInternal;
			/**
			* @private
			* @type {number}
			*/
			this.revision_ = 0;
		}
		/**
		* Increases the revision counter and dispatches a 'change' event.
		* @api
		*/
		changed() {
			++this.revision_;
			this.dispatchEvent(EventType_default$2.CHANGE);
		}
		/**
		* Get the version number for this object.  Each time the object is modified,
		* its version number will be incremented.
		* @return {number} Revision.
		* @api
		*/
		getRevision() {
			return this.revision_;
		}
		/**
		* @param {string|Array<string>} type Type.
		* @param {function((Event|import("./events/Event.js").default)): ?} listener Listener.
		* @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
		* @protected
		*/
		onInternal(type, listener) {
			if (Array.isArray(type)) {
				const len = type.length;
				const keys = new Array(len);
				for (let i = 0; i < len; ++i) keys[i] = listen(this, type[i], listener);
				return keys;
			}
			return listen(this, type, listener);
		}
		/**
		* @param {string|Array<string>} type Type.
		* @param {function((Event|import("./events/Event.js").default)): ?} listener Listener.
		* @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
		* @protected
		*/
		onceInternal(type, listener) {
			let key;
			if (Array.isArray(type)) {
				const len = type.length;
				key = new Array(len);
				for (let i = 0; i < len; ++i) key[i] = listenOnce(this, type[i], listener);
			} else key = listenOnce(this, type, listener);
			/** @type {Object} */ listener.ol_key = key;
			return key;
		}
		/**
		* Unlisten for a certain type of event.
		* @param {string|Array<string>} type Type.
		* @param {function((Event|import("./events/Event.js").default)): ?} listener Listener.
		* @protected
		*/
		unInternal(type, listener) {
			const key = listener.ol_key;
			if (key) unByKey(key);
			else if (Array.isArray(type)) for (let i = 0, ii = type.length; i < ii; ++i) this.removeEventListener(type[i], listener);
			else this.removeEventListener(type, listener);
		}
	};
	/**
	* Listen for a certain type of event.
	* @function
	* @param {string|Array<string>} type The event type or array of event types.
	* @param {function((Event|import("./events/Event.js").default)): ?} listener The listener function.
	* @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
	*     called with an array of event types as the first argument, the return
	*     will be an array of keys.
	* @api
	*/
	Observable.prototype.on;
	/**
	* Listen once for a certain type of event.
	* @function
	* @param {string|Array<string>} type The event type or array of event types.
	* @param {function((Event|import("./events/Event.js").default)): ?} listener The listener function.
	* @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
	*     called with an array of event types as the first argument, the return
	*     will be an array of keys.
	* @api
	*/
	Observable.prototype.once;
	/**
	* Unlisten for a certain type of event.
	* @function
	* @param {string|Array<string>} type The event type or array of event types.
	* @param {function((Event|import("./events/Event.js").default)): ?} listener The listener function.
	* @api
	*/
	Observable.prototype.un;
	/**
	* Removes an event listener using the key returned by `on()` or `once()`.
	* @param {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} key The key returned by `on()`
	*     or `once()` (or an array of keys).
	* @api
	*/
	function unByKey(key) {
		if (Array.isArray(key)) for (let i = 0, ii = key.length; i < ii; ++i) unlistenByKey(key[i]);
		else unlistenByKey(key);
	}
	//#endregion
	//#region src/ol/util.js
	/**
	* @module ol/util
	*/
	/**
	* @return {never} Any return.
	*/
	function abstract() {
		throw new Error("Unimplemented abstract method.");
	}
	/**
	* Counter for getUid.
	* @type {number}
	* @private
	*/
	let uidCounter_ = 0;
	/**
	* Gets a unique ID for an object. This mutates the object so that further calls
	* with the same object as a parameter returns the same value. Unique IDs are generated
	* as a strictly increasing sequence. Adapted from goog.getUid.
	*
	* @param {Object} obj The object to get the unique ID for.
	* @return {string} The unique ID for the object.
	* @api
	*/
	function getUid(obj) {
		return obj.ol_uid || (obj.ol_uid = String(++uidCounter_));
	}
	//#endregion
	//#region src/ol/Object.js
	/**
	* @module ol/Object
	*/
	/**
	* @classdesc
	* Events emitted by {@link module:ol/Object~BaseObject} instances are instances of this type.
	*/
	var ObjectEvent = class extends BaseEvent {
		/**
		* @param {string} type The event type.
		* @param {string} key The property name.
		* @param {*} oldValue The old value for `key`.
		*/
		constructor(type, key, oldValue) {
			super(type);
			/**
			* The name of the property whose value is changing.
			* @type {string}
			* @api
			*/
			this.key = key;
			/**
			* The old value. To get the new value use `e.target.get(e.key)` where
			* `e` is the event object.
			* @type {*}
			* @api
			*/
			this.oldValue = oldValue;
		}
	};
	/***
	* @template Return
	* @typedef {import("./Observable.js").OnSignature<import("./Observable.js").EventTypes, import("./events/Event.js").default, Return> &
	*    import("./Observable.js").OnSignature<import("./ObjectEventType.js").Types, ObjectEvent, Return> &
	*    import("./Observable.js").CombinedOnSignature<import("./Observable.js").EventTypes|import("./ObjectEventType.js").Types, Return>} ObjectOnSignature
	*/
	/**
	* @classdesc
	* Abstract base class; normally only used for creating subclasses and not
	* instantiated in apps.
	* Most non-trivial classes inherit from this.
	*
	* This extends {@link module:ol/Observable~Observable} with observable
	* properties, where each property is observable as well as the object as a
	* whole.
	*
	* Classes that inherit from this have pre-defined properties, to which you can
	* add your owns. The pre-defined properties are listed in this documentation as
	* 'Observable Properties', and have their own accessors; for example,
	* {@link module:ol/Map~Map} has a `target` property, accessed with
	* `getTarget()` and changed with `setTarget()`. Not all properties are however
	* settable. There are also general-purpose accessors `get()` and `set()`. For
	* example, `get('target')` is equivalent to `getTarget()`.
	*
	* The `set` accessors trigger a change event, and you can monitor this by
	* registering a listener. For example, {@link module:ol/View~View} has a
	* `center` property, so `view.on('change:center', function(evt) {...});` would
	* call the function whenever the value of the center property changes. Within
	* the function, `evt.target` would be the view, so `evt.target.getCenter()`
	* would return the new center.
	*
	* You can add your own observable properties with
	* `object.set('prop', 'value')`, and retrieve that with `object.get('prop')`.
	* You can listen for changes on that property value with
	* `object.on('change:prop', listener)`. You can get a list of all
	* properties with {@link module:ol/Object~BaseObject#getProperties}.
	*
	* Note that the observable properties are separate from standard JS properties.
	* You can, for example, give your map object a title with
	* `map.title='New title'` and with `map.set('title', 'Another title')`. The
	* first will be a `hasOwnProperty`; the second will appear in
	* `getProperties()`. Only the second is observable.
	*
	* Properties can be deleted by using the unset method. E.g.
	* object.unset('foo').
	*
	* @fires ObjectEvent
	* @template {Object<string, *>} [Properties=Object<string, *>]
	* @api
	*/
	var BaseObject = class extends Observable {
		/**
		* @param {NoInfer<Properties>} [values] An object with key-value pairs.
		*/
		constructor(values) {
			super();
			/***
			* @type {ObjectOnSignature<import("./events.js").EventsKey>}
			*/
			this.on;
			/***
			* @type {ObjectOnSignature<import("./events.js").EventsKey>}
			*/
			this.once;
			/***
			* @type {ObjectOnSignature<void>}
			*/
			this.un;
			getUid(this);
			/**
			* @private
			* @type {Partial<NoInfer<Properties>>|null}
			*/
			this.values_ = null;
			if (values !== void 0) this.setProperties(values);
		}
		/**
		* Gets a value.
		* @param {string} key Key name.
		* @return {*} Value.
		* @api
		*/
		get(key) {
			let value;
			if (this.values_ && this.values_.hasOwnProperty(key)) value = this.values_[key];
			return value;
		}
		/**
		* Get a list of object property names.
		* @return {Array<string>} List of property names.
		* @api
		*/
		getKeys() {
			return this.values_ && Object.keys(this.values_) || [];
		}
		/**
		* Get an object of all property names and values.
		* @return {NoInfer<Properties>} Object.
		* @api
		*/
		getProperties() {
			return this.values_ && Object.assign({}, this.values_) || {};
		}
		/**
		* Get an object of all property names and values.
		* @return {Partial<NoInfer<Properties>>?} Object.
		*/
		getPropertiesInternal() {
			return this.values_;
		}
		/**
		* @return {boolean} The object has properties.
		*/
		hasProperties() {
			return !!this.values_;
		}
		/**
		* @param {string} key Key name.
		* @param {*} oldValue Old value.
		*/
		notify(key, oldValue) {
			let eventType;
			eventType = `change:${key}`;
			if (this.hasListener(eventType)) this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
			eventType = ObjectEventType_default.PROPERTYCHANGE;
			if (this.hasListener(eventType)) this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
		}
		/**
		* @param {string} key Key name.
		* @param {import("./events.js").Listener} listener Listener.
		*/
		addChangeListener(key, listener) {
			this.addEventListener(`change:${key}`, listener);
		}
		/**
		* @param {string} key Key name.
		* @param {import("./events.js").Listener} listener Listener.
		*/
		removeChangeListener(key, listener) {
			this.removeEventListener(`change:${key}`, listener);
		}
		/**
		* Sets a value.
		* @param {string} key Key name.
		* @param {*} value Value.
		* @param {boolean} [silent] Update without triggering an event.
		* @api
		*/
		set(key, value, silent) {
			const values = this.values_ || (this.values_ = {});
			if (silent) values[key] = value;
			else {
				const oldValue = values[key];
				values[key] = value;
				if (oldValue !== value) this.notify(key, oldValue);
			}
		}
		/**
		* Sets a collection of key-value pairs.  Note that this changes any existing
		* properties and adds new ones (it does not remove any existing properties).
		* @param {Partial<NoInfer<Properties>>} values Values.
		* @param {boolean} [silent] Update without triggering an event.
		* @api
		*/
		setProperties(values, silent) {
			for (const key in values) this.set(key, values[key], silent);
		}
		/**
		* Apply any properties from another object without triggering events.
		* @param {BaseObject} source The source object.
		* @protected
		*/
		applyProperties(source) {
			if (!source.values_) return;
			Object.assign(this.values_ || (this.values_ = {}), source.values_);
		}
		/**
		* Unsets a property.
		* @param {string} key Key name.
		* @param {boolean} [silent] Unset without triggering an event.
		* @api
		*/
		unset(key, silent) {
			if (this.values_ && key in this.values_) {
				const oldValue = this.values_[key];
				delete this.values_[key];
				if (isEmpty$1(this.values_)) this.values_ = null;
				if (!silent) this.notify(key, oldValue);
			}
		}
	};
	//#endregion
	//#region src/ol/Collection.js
	/**
	* @module ol/Collection
	*/
	/**
	* @enum {string}
	* @private
	*/
	const Property$2 = { LENGTH: "length" };
	/**
	* @classdesc
	* Events emitted by {@link module:ol/Collection~Collection} instances are instances of this
	* type.
	* @template T
	*/
	var CollectionEvent = class extends BaseEvent {
		/**
		* @param {import("./CollectionEventType.js").default} type Type.
		* @param {T} element Element.
		* @param {number} index The index of the added or removed element.
		*/
		constructor(type, element, index) {
			super(type);
			/**
			* The element that is added to or removed from the collection.
			* @type {T}
			* @api
			*/
			this.element = element;
			/**
			* The index of the added or removed element.
			* @type {number}
			* @api
			*/
			this.index = index;
		}
	};
	/***
	* @template T
	* @template Return
	* @typedef {import("./Observable.js").OnSignature<import("./Observable.js").EventTypes, import("./events/Event.js").default, Return> &
	*   import("./Observable.js").OnSignature<import("./ObjectEventType.js").Types|'change:length', import("./Object.js").ObjectEvent, Return> &
	*   import("./Observable.js").OnSignature<'add'|'remove', CollectionEvent<T>, Return> &
	*   import("./Observable.js").CombinedOnSignature<import("./Observable.js").EventTypes|import("./ObjectEventType.js").Types|
	*     'change:length'|'add'|'remove',Return>} CollectionOnSignature
	*/
	/**
	* @typedef {Object} Options
	* @property {boolean} [unique=false] Disallow the same item from being added to
	* the collection twice.
	*/
	/**
	* @classdesc
	* An expanded version of standard JS Array, adding convenience methods for
	* manipulation. Add and remove changes to the Collection trigger a Collection
	* event. Note that this does not cover changes to the objects _within_ the
	* Collection; they trigger events on the appropriate object, not on the
	* Collection as a whole.
	*
	* @fires CollectionEvent
	*
	* @template T
	* @api
	*/
	var Collection = class extends BaseObject {
		/**
		* @param {Array<T>} [array] Array.
		* @param {Options} [options] Collection options.
		*/
		constructor(array, options) {
			super();
			/***
			* @type {CollectionOnSignature<T, import("./events.js").EventsKey>}
			*/
			this.on;
			/***
			* @type {CollectionOnSignature<T, import("./events.js").EventsKey>}
			*/
			this.once;
			/***
			* @type {CollectionOnSignature<T, void>}
			*/
			this.un;
			options = options || {};
			/**
			* @private
			* @type {boolean}
			*/
			this.unique_ = !!options.unique;
			/**
			* @private
			* @type {!Array<T>}
			*/
			this.array_ = array ?? [];
			if (this.unique_) for (let i = 1, ii = this.array_.length; i < ii; ++i) this.assertUnique_(this.array_[i], i);
			this.updateLength_();
		}
		/**
		* Remove all elements from the collection.
		* @api
		*/
		clear() {
			while (this.getLength() > 0) this.pop();
		}
		/**
		* Add elements to the collection.  This pushes each item in the provided array
		* to the end of the collection.
		* @param {!Array<T>} arr Array.
		* @return {Collection<T>} This collection.
		* @api
		*/
		extend(arr) {
			for (let i = 0, ii = arr.length; i < ii; ++i) this.push(arr[i]);
			return this;
		}
		/**
		* Iterate over each element, calling the provided callback.
		* @param {function(T, number, Array<T>): *} f The function to call
		*     for every element. This function takes 3 arguments (the element, the
		*     index and the array). The return value is ignored.
		* @api
		*/
		forEach(f) {
			const array = this.array_;
			for (let i = 0, ii = array.length; i < ii; ++i) f(array[i], i, array);
		}
		/**
		* Get a reference to the underlying Array object. Warning: if the array
		* is mutated, no events will be dispatched by the collection, and the
		* collection's "length" property won't be in sync with the actual length
		* of the array.
		* @return {!Array<T>} Array.
		* @api
		*/
		getArray() {
			return this.array_;
		}
		/**
		* Get the element at the provided index.
		* @param {number} index Index.
		* @return {T} Element.
		* @api
		*/
		item(index) {
			return this.array_[index];
		}
		/**
		* Get the length of this collection.
		* @return {number} The length of the array.
		* @observable
		* @api
		*/
		getLength() {
			return this.get(Property$2.LENGTH);
		}
		/**
		* Insert an element at the provided index.
		* @param {number} index Index.
		* @param {T} elem Element.
		* @api
		*/
		insertAt(index, elem) {
			if (index < 0 || index > this.getLength()) throw new Error("Index out of bounds: " + index);
			if (this.unique_) this.assertUnique_(elem);
			this.array_.splice(index, 0, elem);
			this.updateLength_();
			this.dispatchEvent(new CollectionEvent(CollectionEventType_default.ADD, elem, index));
		}
		/**
		* Remove the last element of the collection and return it.
		* Return `undefined` if the collection is empty.
		* @return {T|undefined} Element.
		* @api
		*/
		pop() {
			return this.removeAt(this.getLength() - 1);
		}
		/**
		* Insert the provided element at the end of the collection.
		* @param {T} elem Element.
		* @return {number} New length of the collection.
		* @api
		*/
		push(elem) {
			const n = this.getLength();
			this.insertAt(n, elem);
			return this.getLength();
		}
		/**
		* Remove the first occurrence of an element from the collection.
		* @param {T} elem Element.
		* @return {T|undefined} The removed element or undefined if none found.
		* @api
		*/
		remove(elem) {
			const arr = this.array_;
			for (let i = 0, ii = arr.length; i < ii; ++i) if (arr[i] === elem) return this.removeAt(i);
		}
		/**
		* Remove the element at the provided index and return it.
		* Return `undefined` if the collection does not contain this index.
		* @param {number} index Index.
		* @return {T|undefined} Value.
		* @api
		*/
		removeAt(index) {
			if (index < 0 || index >= this.getLength()) return;
			const prev = this.array_[index];
			this.array_.splice(index, 1);
			this.updateLength_();
			this.dispatchEvent(new CollectionEvent(CollectionEventType_default.REMOVE, prev, index));
			return prev;
		}
		/**
		* Set the element at the provided index.
		* @param {number} index Index.
		* @param {T} elem Element.
		* @api
		*/
		setAt(index, elem) {
			if (index >= this.getLength()) {
				this.insertAt(index, elem);
				return;
			}
			if (index < 0) throw new Error("Index out of bounds: " + index);
			if (this.unique_) this.assertUnique_(elem, index);
			const prev = this.array_[index];
			this.array_[index] = elem;
			this.dispatchEvent(new CollectionEvent(CollectionEventType_default.REMOVE, prev, index));
			this.dispatchEvent(new CollectionEvent(CollectionEventType_default.ADD, elem, index));
		}
		/**
		* @private
		*/
		updateLength_() {
			this.set(Property$2.LENGTH, this.array_.length);
		}
		/**
		* @private
		* @param {T} elem Element.
		* @param {number} [except] Optional index to ignore.
		*/
		assertUnique_(elem, except) {
			const array = this.array_;
			for (let i = 0, ii = array.length; i < ii; ++i) if (array[i] === elem && i !== except) throw new Error("Duplicate item added to a unique collection");
		}
	};
	//#endregion
	//#region src/ol/MapEvent.js
	/**
	* @module ol/MapEvent
	*/
	/**
	* @classdesc
	* Events emitted as map events are instances of this type.
	* See {@link module:ol/Map~Map} for which events trigger a map event.
	*/
	var MapEvent = class extends BaseEvent {
		/**
		* @param {string} type Event type.
		* @param {import("./Map.js").default} map Map.
		* @param {?import("./Map.js").FrameState} [frameState] Frame state.
		*/
		constructor(type, map, frameState) {
			super(type);
			/**
			* The map where the event occurred.
			* @type {import("./Map.js").default}
			* @api
			*/
			this.map = map;
			/**
			* The frame state at the time of the event.
			* @type {?import("./Map.js").FrameState}
			* @api
			*/
			this.frameState = frameState !== void 0 ? frameState : null;
		}
	};
	//#endregion
	//#region src/ol/MapBrowserEvent.js
	/**
	* @module ol/MapBrowserEvent
	*/
	/**
	* @classdesc
	* Events emitted as map browser events are instances of this type.
	* See {@link module:ol/Map~Map} for which events trigger a map browser event.
	* @template {PointerEvent|KeyboardEvent|WheelEvent} [EVENT=PointerEvent|KeyboardEvent|WheelEvent]
	*/
	var MapBrowserEvent = class extends MapEvent {
		/**
		* @param {string} type Event type.
		* @param {import("./Map.js").default} map Map.
		* @param {EVENT} originalEvent Original event.
		* @param {boolean} [dragging] Is the map currently being dragged?
		* @param {import("./Map.js").FrameState} [frameState] Frame state.
		* @param {Array<PointerEvent>} [activePointers] Active pointers.
		*/
		constructor(type, map, originalEvent, dragging, frameState, activePointers) {
			super(type, map, frameState);
			/**
			* The original browser event.
			* @const
			* @type {EVENT}
			* @api
			*/
			this.originalEvent = originalEvent;
			/**
			* The map pixel relative to the viewport corresponding to the original browser event.
			* @type {?import("./pixel.js").Pixel}
			* @private
			*/
			this.pixel_ = null;
			/**
			* The coordinate in the user projection corresponding to the original browser event.
			* @type {?import("./coordinate.js").Coordinate}
			* @private
			*/
			this.coordinate_ = null;
			/**
			* Indicates if the map is currently being dragged. Only set for
			* `POINTERDRAG` and `POINTERMOVE` events. Default is `false`.
			*
			* @type {boolean}
			* @api
			*/
			this.dragging = dragging !== void 0 ? dragging : false;
			/**
			* @type {Array<PointerEvent>|undefined}
			*/
			this.activePointers = activePointers;
		}
		/**
		* The map pixel relative to the viewport corresponding to the original event.
		* @type {import("./pixel.js").Pixel}
		* @api
		*/
		get pixel() {
			if (!this.pixel_) this.pixel_ = this.map.getEventPixel(this.originalEvent);
			return this.pixel_;
		}
		set pixel(pixel) {
			this.pixel_ = pixel;
		}
		/**
		* The coordinate corresponding to the original browser event.  This will be in the user
		* projection if one is set.  Otherwise it will be in the view projection.
		* @type {import("./coordinate.js").Coordinate}
		* @api
		*/
		get coordinate() {
			if (!this.coordinate_) this.coordinate_ = this.map.getCoordinateFromPixel(this.pixel);
			return this.coordinate_;
		}
		set coordinate(coordinate) {
			this.coordinate_ = coordinate;
		}
		/**
		* Prevents the default browser action.
		* See https://developer.mozilla.org/en-US/docs/Web/API/event.preventDefault.
		* @api
		* @override
		*/
		preventDefault() {
			super.preventDefault();
			if ("preventDefault" in this.originalEvent)
 /** @type {UIEvent} */ this.originalEvent.preventDefault();
		}
		/**
		* Prevents further propagation of the current event.
		* See https://developer.mozilla.org/en-US/docs/Web/API/event.stopPropagation.
		* @api
		* @override
		*/
		stopPropagation() {
			super.stopPropagation();
			if ("stopPropagation" in this.originalEvent)
 /** @type {UIEvent} */ this.originalEvent.stopPropagation();
		}
	};
	//#endregion
	//#region src/ol/MapBrowserEventType.js
	/**
	* @module ol/MapBrowserEventType
	*/
	/**
	* Constants for event names.
	* @enum {string}
	*/
	var MapBrowserEventType_default = {
		/**
		* A true single click with no dragging and no double click. Note that this
		* event is delayed by 250 ms to ensure that it is not a double click.
		* @event module:ol/MapBrowserEvent~MapBrowserEvent#singleclick
		* @api
		*/
		SINGLECLICK: "singleclick",
		/**
		* A click with no dragging. A double click will fire two of this.
		* @event module:ol/MapBrowserEvent~MapBrowserEvent#click
		* @api
		*/
		CLICK: EventType_default$2.CLICK,
		/**
		* A true double click, with no dragging.
		* @event module:ol/MapBrowserEvent~MapBrowserEvent#dblclick
		* @api
		*/
		DBLCLICK: EventType_default$2.DBLCLICK,
		/**
		* Triggered when a pointer is dragged.
		* @event module:ol/MapBrowserEvent~MapBrowserEvent#pointerdrag
		* @api
		*/
		POINTERDRAG: "pointerdrag",
		/**
		* Triggered when a pointer is moved. Note that on touch devices this is
		* triggered when the map is panned, so is not the same as mousemove.
		* @event module:ol/MapBrowserEvent~MapBrowserEvent#pointermove
		* @api
		*/
		POINTERMOVE: "pointermove",
		POINTERDOWN: "pointerdown",
		POINTERUP: "pointerup",
		POINTEROVER: "pointerover",
		POINTEROUT: "pointerout",
		POINTERENTER: "pointerenter",
		POINTERLEAVE: "pointerleave",
		POINTERCANCEL: "pointercancel"
	};
	/***
	* @typedef {'singleclick'|'click'|'dblclick'|'pointerdrag'|'pointermove'} Types
	*/
	//#endregion
	//#region src/ol/has.js
	/**
	* @module ol/has
	*/
	const ua = typeof navigator !== "undefined" && typeof navigator.userAgent !== "undefined" ? navigator.userAgent.toLowerCase() : "";
	ua.includes("safari") && !ua.includes("chrom") && (ua.includes("version/15.4") || /cpu (os|iphone os) 15_4 like mac os x/.test(ua));
	/**
	* User agent string says we are dealing with a WebKit engine.
	* @type {boolean}
	*/
	const WEBKIT = ua.includes("webkit") && !ua.includes("edge");
	/**
	* User agent string says we are dealing with a Mac as platform.
	* @type {boolean}
	*/
	const MAC = ua.includes("macintosh");
	/**
	* The ratio between physical pixels and device-independent pixels
	* (dips) on the device (`window.devicePixelRatio`).
	* @const
	* @type {number}
	* @api
	*/
	const DEVICE_PIXEL_RATIO = typeof devicePixelRatio !== "undefined" ? devicePixelRatio : 1;
	/**
	* The execution context is a worker with OffscreenCanvas available.
	* @const
	* @type {boolean}
	*/
	const WORKER_OFFSCREEN_CANVAS = typeof WorkerGlobalScope !== "undefined" && typeof OffscreenCanvas !== "undefined" && self instanceof WorkerGlobalScope;
	/**
	* Image.prototype.decode() is supported.
	* @type {boolean}
	*/
	const IMAGE_DECODE = typeof Image !== "undefined" && Image.prototype.decode;
	/**
	* @type {boolean}
	*/
	const PASSIVE_EVENT_LISTENERS = (function() {
		let passive = false;
		try {
			const options = Object.defineProperty({}, "passive", { get: function() {
				passive = true;
			} });
			window.addEventListener("_", null, options);
			window.removeEventListener("_", null, options);
		} catch {}
		return passive;
	})();
	//#endregion
	//#region src/ol/pointer/EventType.js
	/**
	* @module ol/pointer/EventType
	*/
	/**
	* Constants for event names.
	* @enum {string}
	*/
	var EventType_default$1 = {
		POINTERMOVE: "pointermove",
		POINTERDOWN: "pointerdown",
		POINTERUP: "pointerup",
		POINTEROVER: "pointerover",
		POINTEROUT: "pointerout",
		POINTERENTER: "pointerenter",
		POINTERLEAVE: "pointerleave",
		POINTERCANCEL: "pointercancel"
	};
	//#endregion
	//#region src/ol/MapBrowserEventHandler.js
	/**
	* @module ol/MapBrowserEventHandler
	*/
	var MapBrowserEventHandler = class extends Target {
		/**
		* @param {import("./Map.js").default} map The map with the viewport to listen to events on.
		* @param {number} [moveTolerance] The minimal distance the pointer must travel to trigger a move.
		*/
		constructor(map, moveTolerance) {
			super(map);
			/**
			* This is the element that we will listen to the real events on.
			* @type {import("./Map.js").default}
			* @private
			*/
			this.map_ = map;
			/**
			* @type {ReturnType<typeof setTimeout>}
			* @private
			*/
			this.clickTimeoutId_;
			/**
			* Emulate dblclick and singleclick. Will be true when only one pointer is active.
			* @type {boolean}
			*/
			this.emulateClicks_ = false;
			/**
			* @type {boolean}
			* @private
			*/
			this.dragging_ = false;
			/**
			* @type {!Array<import("./events.js").EventsKey>}
			* @private
			*/
			this.dragListenerKeys_ = [];
			/**
			* @type {number}
			* @private
			*/
			this.moveTolerance_ = moveTolerance === void 0 ? 1 : moveTolerance;
			/**
			* The most recent "down" type event (or null if none have occurred).
			* Set on pointerdown.
			* @type {PointerEvent|null}
			* @private
			*/
			this.down_ = null;
			const element = this.map_.getViewport();
			/**
			* @type {Array<PointerEvent>}
			* @private
			*/
			this.activePointers_ = [];
			/**
			* @type {!Object<number, Event>}
			* @private
			*/
			this.trackedTouches_ = {};
			/**
			* @private
			*/
			this.element_ = element;
			/**
			* @type {?import("./events.js").EventsKey}
			* @private
			*/
			this.pointerdownListenerKey_ = listen(element, EventType_default$1.POINTERDOWN, this.handlePointerDown_, this);
			/**
			* @type {PointerEvent}
			* @private
			*/
			this.originalPointerMoveEvent_;
			/**
			* @type {?import("./events.js").EventsKey}
			* @private
			*/
			this.relayedListenerKey_ = listen(element, EventType_default$1.POINTERMOVE, this.relayMoveEvent_, this);
			/**
			* @private
			*/
			this.boundHandleTouchMove_ = this.handleTouchMove_.bind(this);
			this.element_.addEventListener(EventType_default$2.TOUCHMOVE, this.boundHandleTouchMove_, PASSIVE_EVENT_LISTENERS ? { passive: false } : false);
		}
		/**
		* @param {PointerEvent} pointerEvent Pointer
		* event.
		* @private
		*/
		emulateClick_(pointerEvent) {
			let newEvent = new MapBrowserEvent(MapBrowserEventType_default.CLICK, this.map_, pointerEvent);
			this.dispatchEvent(newEvent);
			if (this.clickTimeoutId_ !== void 0) {
				clearTimeout(this.clickTimeoutId_);
				this.clickTimeoutId_ = void 0;
				newEvent = new MapBrowserEvent(MapBrowserEventType_default.DBLCLICK, this.map_, pointerEvent);
				this.dispatchEvent(newEvent);
			} else this.clickTimeoutId_ = setTimeout(() => {
				this.clickTimeoutId_ = void 0;
				const newEvent = new MapBrowserEvent(MapBrowserEventType_default.SINGLECLICK, this.map_, pointerEvent);
				this.dispatchEvent(newEvent);
			}, 250);
		}
		/**
		* Keeps track on how many pointers are currently active.
		*
		* @param {PointerEvent} pointerEvent Pointer
		* event.
		* @private
		*/
		updateActivePointers_(pointerEvent) {
			const event = pointerEvent;
			const id = event.pointerId;
			if (event.type == MapBrowserEventType_default.POINTERUP || event.type == MapBrowserEventType_default.POINTERCANCEL) {
				delete this.trackedTouches_[id];
				for (const pointerId in this.trackedTouches_) if (this.trackedTouches_[pointerId].target !== event.target) {
					delete this.trackedTouches_[pointerId];
					break;
				}
			} else if (event.type == MapBrowserEventType_default.POINTERDOWN || event.type == MapBrowserEventType_default.POINTERMOVE) this.trackedTouches_[id] = event;
			this.activePointers_ = Object.values(this.trackedTouches_);
		}
		/**
		* @param {PointerEvent} pointerEvent Pointer
		* event.
		* @private
		*/
		handlePointerUp_(pointerEvent) {
			this.updateActivePointers_(pointerEvent);
			const newEvent = new MapBrowserEvent(MapBrowserEventType_default.POINTERUP, this.map_, pointerEvent, void 0, void 0, this.activePointers_);
			this.dispatchEvent(newEvent);
			if (this.emulateClicks_ && !newEvent.defaultPrevented && !this.dragging_ && this.isMouseActionButton_(pointerEvent)) this.emulateClick_(this.down_);
			if (this.activePointers_.length === 0) {
				this.dragListenerKeys_.forEach(unlistenByKey);
				this.dragListenerKeys_.length = 0;
				this.dragging_ = false;
				this.down_ = null;
			}
		}
		/**
		* @param {PointerEvent} pointerEvent Pointer
		* event.
		* @return {boolean} If the left mouse button was pressed.
		* @private
		*/
		isMouseActionButton_(pointerEvent) {
			return pointerEvent.button === 0;
		}
		/**
		* @param {PointerEvent} pointerEvent Pointer
		* event.
		* @private
		*/
		handlePointerDown_(pointerEvent) {
			this.emulateClicks_ = this.activePointers_.length === 0;
			this.updateActivePointers_(pointerEvent);
			const newEvent = new MapBrowserEvent(MapBrowserEventType_default.POINTERDOWN, this.map_, pointerEvent, void 0, void 0, this.activePointers_);
			this.dispatchEvent(newEvent);
			this.down_ = new PointerEvent(pointerEvent.type, pointerEvent);
			Object.defineProperty(this.down_, "target", {
				writable: false,
				value: pointerEvent.target
			});
			if (this.dragListenerKeys_.length === 0) {
				const doc = this.map_.getOwnerDocument();
				this.dragListenerKeys_.push(listen(doc, MapBrowserEventType_default.POINTERMOVE, this.handlePointerMove_, this), listen(doc, MapBrowserEventType_default.POINTERUP, this.handlePointerUp_, this), listen(this.element_, MapBrowserEventType_default.POINTERCANCEL, this.handlePointerUp_, this));
				if (this.element_.getRootNode && this.element_.getRootNode() !== doc) this.dragListenerKeys_.push(listen(this.element_.getRootNode(), MapBrowserEventType_default.POINTERUP, this.handlePointerUp_, this));
			}
		}
		/**
		* @param {PointerEvent} pointerEvent Pointer
		* event.
		* @private
		*/
		handlePointerMove_(pointerEvent) {
			if (this.isMoving_(pointerEvent)) {
				this.updateActivePointers_(pointerEvent);
				this.dragging_ = true;
				const newEvent = new MapBrowserEvent(MapBrowserEventType_default.POINTERDRAG, this.map_, pointerEvent, this.dragging_, void 0, this.activePointers_);
				this.dispatchEvent(newEvent);
			}
		}
		/**
		* Wrap and relay a pointermove event.
		* @param {PointerEvent} pointerEvent Pointer
		* event.
		* @private
		*/
		relayMoveEvent_(pointerEvent) {
			this.originalPointerMoveEvent_ = pointerEvent;
			const dragging = !!(this.down_ && this.isMoving_(pointerEvent));
			this.dispatchEvent(new MapBrowserEvent(MapBrowserEventType_default.POINTERMOVE, this.map_, pointerEvent, dragging));
		}
		/**
		* Flexible handling of a `touch-action: none` css equivalent: because calling
		* `preventDefault()` on a `pointermove` event does not stop native page scrolling
		* and zooming, we also listen for `touchmove` and call `preventDefault()` on it
		* when an interaction (currently `DragPan` handles the event.
		* @param {TouchEvent} event Event.
		* @private
		*/
		handleTouchMove_(event) {
			const originalEvent = this.originalPointerMoveEvent_;
			if ((!originalEvent || originalEvent.defaultPrevented) && (typeof event.cancelable !== "boolean" || event.cancelable === true)) event.preventDefault();
		}
		/**
		* @param {PointerEvent} pointerEvent Pointer
		* event.
		* @return {boolean} Is moving.
		* @private
		*/
		isMoving_(pointerEvent) {
			return this.dragging_ || Math.abs(pointerEvent.clientX - this.down_.clientX) > this.moveTolerance_ || Math.abs(pointerEvent.clientY - this.down_.clientY) > this.moveTolerance_;
		}
		/**
		* Clean up.
		* @override
		*/
		disposeInternal() {
			if (this.relayedListenerKey_) {
				unlistenByKey(this.relayedListenerKey_);
				this.relayedListenerKey_ = null;
			}
			this.element_.removeEventListener(EventType_default$2.TOUCHMOVE, this.boundHandleTouchMove_);
			if (this.pointerdownListenerKey_) {
				unlistenByKey(this.pointerdownListenerKey_);
				this.pointerdownListenerKey_ = null;
			}
			this.dragListenerKeys_.forEach(unlistenByKey);
			this.dragListenerKeys_.length = 0;
			this.element_ = null;
			super.disposeInternal();
		}
	};
	//#endregion
	//#region src/ol/MapEventType.js
	/**
	* @module ol/MapEventType
	*/
	/**
	* @enum {string}
	*/
	var MapEventType_default = {
		/**
		* Triggered after a map frame is rendered.
		* @event module:ol/MapEvent~MapEvent#postrender
		* @api
		*/
		POSTRENDER: "postrender",
		/**
		* Triggered when the map starts moving.
		* @event module:ol/MapEvent~MapEvent#movestart
		* @api
		*/
		MOVESTART: "movestart",
		/**
		* Triggered after the map is moved.
		* @event module:ol/MapEvent~MapEvent#moveend
		* @api
		*/
		MOVEEND: "moveend",
		/**
		* Triggered when loading of additional map data (tiles, images, features) starts.
		* @event module:ol/MapEvent~MapEvent#loadstart
		* @api
		*/
		LOADSTART: "loadstart",
		/**
		* Triggered when loading of additional map data has completed.
		* @event module:ol/MapEvent~MapEvent#loadend
		* @api
		*/
		LOADEND: "loadend"
	};
	/***
	* @typedef {'postrender'|'movestart'|'moveend'|'loadstart'|'loadend'} Types
	*/
	//#endregion
	//#region src/ol/MapProperty.js
	/**
	* @module ol/MapProperty
	*/
	/**
	* @enum {string}
	*/
	var MapProperty_default = {
		LAYERGROUP: "layergroup",
		SIZE: "size",
		TARGET: "target",
		VIEW: "view"
	};
	//#endregion
	//#region src/ol/TileState.js
	/**
	* @module ol/TileState
	*/
	/**
	* @enum {number}
	*/
	var TileState_default = {
		IDLE: 0,
		LOADING: 1,
		LOADED: 2,
		/**
		* Indicates that tile loading failed
		* @type {number}
		*/
		ERROR: 3,
		EMPTY: 4
	};
	//#endregion
	//#region src/ol/asserts.js
	/**
	* @module ol/asserts
	*/
	/**
	* @param {*} assertion Assertion we expected to be truthy.
	* @param {string} errorMessage Error message.
	*/
	function assert(assertion, errorMessage) {
		if (!assertion) throw new Error(errorMessage);
	}
	//#endregion
	//#region src/ol/structs/PriorityQueue.js
	/**
	* @module ol/structs/PriorityQueue
	*/
	/**
	* @type {number}
	*/
	const DROP = Infinity;
	/**
	* @classdesc
	* Priority queue.
	*
	* The implementation is inspired from the Closure Library's Heap class and
	* Python's heapq module.
	*
	* See https://github.com/google/closure-library/blob/master/closure/goog/structs/heap.js
	* and https://hg.python.org/cpython/file/2.7/Lib/heapq.py.
	*
	* @template T
	*/
	var PriorityQueue = class {
		/**
		* @param {function(T): number} priorityFunction Priority function.
		* @param {function(T): string} keyFunction Key function.
		*/
		constructor(priorityFunction, keyFunction) {
			/**
			* @type {function(T): number}
			* @private
			*/
			this.priorityFunction_ = priorityFunction;
			/**
			* @type {function(T): string}
			* @private
			*/
			this.keyFunction_ = keyFunction;
			/**
			* @type {Array<T>}
			* @private
			*/
			this.elements_ = [];
			/**
			* @type {Array<number>}
			* @private
			*/
			this.priorities_ = [];
			/**
			* @type {!Object<string, boolean>}
			* @private
			*/
			this.queuedElements_ = {};
		}
		/**
		* FIXME empty description for jsdoc
		*/
		clear() {
			this.elements_.length = 0;
			this.priorities_.length = 0;
			clear(this.queuedElements_);
		}
		/**
		* Remove and return the highest-priority element. O(log N).
		* @return {T} Element.
		*/
		dequeue() {
			const elements = this.elements_;
			const priorities = this.priorities_;
			const element = elements[0];
			if (elements.length == 1) {
				elements.length = 0;
				priorities.length = 0;
			} else {
				elements[0] = elements.pop();
				priorities[0] = priorities.pop();
				this.siftUp_(0);
			}
			const elementKey = this.keyFunction_(element);
			delete this.queuedElements_[elementKey];
			return element;
		}
		/**
		* Enqueue an element. O(log N).
		* @param {T} element Element.
		* @return {boolean} The element was added to the queue.
		*/
		enqueue(element) {
			assert(!(this.keyFunction_(element) in this.queuedElements_), "Tried to enqueue an `element` that was already added to the queue");
			const priority = this.priorityFunction_(element);
			if (priority != Infinity) {
				this.elements_.push(element);
				this.priorities_.push(priority);
				this.queuedElements_[this.keyFunction_(element)] = true;
				this.siftDown_(0, this.elements_.length - 1);
				return true;
			}
			return false;
		}
		/**
		* @return {number} Count.
		*/
		getCount() {
			return this.elements_.length;
		}
		/**
		* Gets the index of the left child of the node at the given index.
		* @param {number} index The index of the node to get the left child for.
		* @return {number} The index of the left child.
		* @private
		*/
		getLeftChildIndex_(index) {
			return index * 2 + 1;
		}
		/**
		* Gets the index of the right child of the node at the given index.
		* @param {number} index The index of the node to get the right child for.
		* @return {number} The index of the right child.
		* @private
		*/
		getRightChildIndex_(index) {
			return index * 2 + 2;
		}
		/**
		* Gets the index of the parent of the node at the given index.
		* @param {number} index The index of the node to get the parent for.
		* @return {number} The index of the parent.
		* @private
		*/
		getParentIndex_(index) {
			return index - 1 >> 1;
		}
		/**
		* Make this a heap. O(N).
		* @private
		*/
		heapify_() {
			let i;
			for (i = (this.elements_.length >> 1) - 1; i >= 0; i--) this.siftUp_(i);
		}
		/**
		* @return {boolean} Is empty.
		*/
		isEmpty() {
			return this.elements_.length === 0;
		}
		/**
		* @param {string} key Key.
		* @return {boolean} Is key queued.
		*/
		isKeyQueued(key) {
			return key in this.queuedElements_;
		}
		/**
		* @param {T} element Element.
		* @return {boolean} Is queued.
		*/
		isQueued(element) {
			return this.isKeyQueued(this.keyFunction_(element));
		}
		/**
		* @param {number} index The index of the node to move down.
		* @private
		*/
		siftUp_(index) {
			const elements = this.elements_;
			const priorities = this.priorities_;
			const count = elements.length;
			const element = elements[index];
			const priority = priorities[index];
			const startIndex = index;
			while (index < count >> 1) {
				const lIndex = this.getLeftChildIndex_(index);
				const rIndex = this.getRightChildIndex_(index);
				const smallerChildIndex = rIndex < count && priorities[rIndex] < priorities[lIndex] ? rIndex : lIndex;
				elements[index] = elements[smallerChildIndex];
				priorities[index] = priorities[smallerChildIndex];
				index = smallerChildIndex;
			}
			elements[index] = element;
			priorities[index] = priority;
			this.siftDown_(startIndex, index);
		}
		/**
		* @param {number} startIndex The index of the root.
		* @param {number} index The index of the node to move up.
		* @private
		*/
		siftDown_(startIndex, index) {
			const elements = this.elements_;
			const priorities = this.priorities_;
			const element = elements[index];
			const priority = priorities[index];
			while (index > startIndex) {
				const parentIndex = this.getParentIndex_(index);
				if (priorities[parentIndex] > priority) {
					elements[index] = elements[parentIndex];
					priorities[index] = priorities[parentIndex];
					index = parentIndex;
				} else break;
			}
			elements[index] = element;
			priorities[index] = priority;
		}
		/**
		* FIXME empty description for jsdoc
		*/
		reprioritize() {
			const priorityFunction = this.priorityFunction_;
			const elements = this.elements_;
			const priorities = this.priorities_;
			let index = 0;
			const n = elements.length;
			let element, i, priority;
			for (i = 0; i < n; ++i) {
				element = elements[i];
				priority = priorityFunction(element);
				if (priority == Infinity) delete this.queuedElements_[this.keyFunction_(element)];
				else {
					priorities[index] = priority;
					elements[index++] = element;
				}
			}
			elements.length = index;
			priorities.length = index;
			this.heapify_();
		}
	};
	//#endregion
	//#region src/ol/TileQueue.js
	/**
	* @module ol/TileQueue
	*/
	/**
	* @typedef {function(import("./Tile.js").default, string, import('./tilecoord.js').TileCoord, number): number} PriorityFunction
	*/
	/**
	* @typedef {[import('./Tile.js').default, string, import('./tilecoord.js').TileCoord, number]} TileQueueElement
	*/
	/**
	* @extends PriorityQueue<TileQueueElement>}
	*/
	var TileQueue = class extends PriorityQueue {
		/**
		* @param {PriorityFunction} tilePriorityFunction Tile priority function.
		* @param {function(): ?} tileChangeCallback Function called on each tile change event.
		*/
		constructor(tilePriorityFunction, tileChangeCallback) {
			super((element) => tilePriorityFunction.apply(null, element), (element) => element[0].getKey());
			/** @private */
			this.boundHandleTileChange_ = this.handleTileChange.bind(this);
			/**
			* @private
			* @type {function(): ?}
			*/
			this.tileChangeCallback_ = tileChangeCallback;
			/**
			* @private
			* @type {number}
			*/
			this.tilesLoading_ = 0;
			/**
			* @private
			* @type {!Object<string,boolean>}
			*/
			this.tilesLoadingKeys_ = {};
		}
		/**
		* @param {TileQueueElement} element Element.
		* @return {boolean} The element was added to the queue.
		* @override
		*/
		enqueue(element) {
			const added = super.enqueue(element);
			if (added) element[0].addEventListener(EventType_default$2.CHANGE, this.boundHandleTileChange_);
			return added;
		}
		/**
		* @return {number} Number of tiles loading.
		*/
		getTilesLoading() {
			return this.tilesLoading_;
		}
		/**
		* @param {import("./events/Event.js").default} event Event.
		* @protected
		*/
		handleTileChange(event) {
			const tile = event.target;
			const state = tile.getState();
			if (state === TileState_default.LOADED || state === TileState_default.ERROR || state === TileState_default.EMPTY) {
				if (state !== TileState_default.ERROR) tile.removeEventListener(EventType_default$2.CHANGE, this.boundHandleTileChange_);
				const tileKey = tile.getKey();
				if (tileKey in this.tilesLoadingKeys_) {
					delete this.tilesLoadingKeys_[tileKey];
					--this.tilesLoading_;
				}
				this.tileChangeCallback_();
			}
		}
		/**
		* @param {number} maxTotalLoading Maximum number tiles to load simultaneously.
		* @param {number} maxNewLoads Maximum number of new tiles to load.
		*/
		loadMoreTiles(maxTotalLoading, maxNewLoads) {
			let newLoads = 0;
			while (this.tilesLoading_ < maxTotalLoading && newLoads < maxNewLoads && this.getCount() > 0) {
				const tile = this.dequeue()[0];
				const tileKey = tile.getKey();
				if (tile.getState() === TileState_default.IDLE && !(tileKey in this.tilesLoadingKeys_)) {
					this.tilesLoadingKeys_[tileKey] = true;
					++this.tilesLoading_;
					++newLoads;
					tile.load();
				}
			}
		}
	};
	/**
	* @param {import('./Map.js').FrameState} frameState Frame state.
	* @param {import("./Tile.js").default} tile Tile.
	* @param {string} tileSourceKey Tile source key.
	* @param {import("./coordinate.js").Coordinate} tileCenter Tile center.
	* @param {number} tileResolution Tile resolution.
	* @return {number} Tile priority.
	*/
	function getTilePriority(frameState, tile, tileSourceKey, tileCenter, tileResolution) {
		if (!frameState || !(tileSourceKey in frameState.wantedTiles)) return DROP;
		if (!frameState.wantedTiles[tileSourceKey][tile.getKey()]) return DROP;
		const center = frameState.viewState.center;
		const deltaX = tileCenter[0] - center[0];
		const deltaY = tileCenter[1] - center[1];
		return 65536 * Math.log(tileResolution) + Math.sqrt(deltaX * deltaX + deltaY * deltaY) / tileResolution;
	}
	//#endregion
	//#region src/ol/ViewHint.js
	/**
	* @module ol/ViewHint
	*/
	/**
	* @enum {number}
	*/
	var ViewHint_default = {
		ANIMATING: 0,
		INTERACTING: 1
	};
	//#endregion
	//#region src/ol/ViewProperty.js
	/**
	* @module ol/ViewProperty
	*/
	/**
	* @enum {string}
	*/
	var ViewProperty_default = {
		CENTER: "center",
		RESOLUTION: "resolution",
		ROTATION: "rotation"
	};
	//#endregion
	//#region src/ol/math.js
	/**
	* @module ol/math
	*/
	/**
	* Takes a number and clamps it to within the provided bounds.
	* @param {number} value The input number.
	* @param {number} min The minimum value to return.
	* @param {number} max The maximum value to return.
	* @return {number} The input number if it is within bounds, or the nearest
	*     number within the bounds.
	*/
	function clamp(value, min, max) {
		return Math.min(Math.max(value, min), max);
	}
	/**
	* Returns the square of the closest distance between the point (x, y) and the
	* line segment (x1, y1) to (x2, y2).
	* @param {number} x X.
	* @param {number} y Y.
	* @param {number} x1 X1.
	* @param {number} y1 Y1.
	* @param {number} x2 X2.
	* @param {number} y2 Y2.
	* @return {number} Squared distance.
	*/
	function squaredSegmentDistance(x, y, x1, y1, x2, y2) {
		const dx = x2 - x1;
		const dy = y2 - y1;
		if (dx !== 0 || dy !== 0) {
			const t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
			if (t > 1) {
				x1 = x2;
				y1 = y2;
			} else if (t > 0) {
				x1 += dx * t;
				y1 += dy * t;
			}
		}
		return squaredDistance(x, y, x1, y1);
	}
	/**
	* Returns the square of the distance between the points (x1, y1) and (x2, y2).
	* @param {number} x1 X1.
	* @param {number} y1 Y1.
	* @param {number} x2 X2.
	* @param {number} y2 Y2.
	* @return {number} Squared distance.
	*/
	function squaredDistance(x1, y1, x2, y2) {
		const dx = x2 - x1;
		const dy = y2 - y1;
		return dx * dx + dy * dy;
	}
	/**
	* Solves system of linear equations using Gaussian elimination method.
	*
	* @param {Array<Array<number>>} mat Augmented matrix (n x n + 1 column)
	*                                     in row-major order.
	* @return {Array<number>|null} The resulting vector.
	*/
	function solveLinearSystem(mat) {
		const n = mat.length;
		for (let i = 0; i < n; i++) {
			let maxRow = i;
			let maxEl = Math.abs(mat[i][i]);
			for (let r = i + 1; r < n; r++) {
				const absValue = Math.abs(mat[r][i]);
				if (absValue > maxEl) {
					maxEl = absValue;
					maxRow = r;
				}
			}
			if (maxEl === 0) return null;
			const tmp = mat[maxRow];
			mat[maxRow] = mat[i];
			mat[i] = tmp;
			for (let j = i + 1; j < n; j++) {
				const coef = -mat[j][i] / mat[i][i];
				for (let k = i; k < n + 1; k++) if (i == k) mat[j][k] = 0;
				else mat[j][k] += coef * mat[i][k];
			}
		}
		const x = new Array(n);
		for (let l = n - 1; l >= 0; l--) {
			x[l] = mat[l][n] / mat[l][l];
			for (let m = l - 1; m >= 0; m--) mat[m][n] -= mat[m][l] * x[l];
		}
		return x;
	}
	/**
	* Converts radians to to degrees.
	*
	* @param {number} angleInRadians Angle in radians.
	* @return {number} Angle in degrees.
	*/
	function toDegrees(angleInRadians) {
		return angleInRadians * 180 / Math.PI;
	}
	/**
	* Converts degrees to radians.
	*
	* @param {number} angleInDegrees Angle in degrees.
	* @return {number} Angle in radians.
	*/
	function toRadians(angleInDegrees) {
		return angleInDegrees * Math.PI / 180;
	}
	/**
	* Returns the modulo of a / b, depending on the sign of b.
	*
	* @param {number} a Dividend.
	* @param {number} b Divisor.
	* @return {number} Modulo.
	*/
	function modulo(a, b) {
		const r = a % b;
		return r * b < 0 ? r + b : r;
	}
	/**
	* Calculates the linearly interpolated value of x between a and b.
	*
	* @param {number} a Number
	* @param {number} b Number
	* @param {number} x Value to be interpolated.
	* @return {number} Interpolated value.
	*/
	function lerp(a, b, x) {
		return a + x * (b - a);
	}
	/**
	* Returns a number with a limited number of decimal digits.
	* @param {number} n The input number.
	* @param {number} decimals The maximum number of decimal digits.
	* @return {number} The input number with a limited number of decimal digits.
	*/
	function toFixed(n, decimals) {
		const factor = Math.pow(10, decimals);
		return Math.round(n * factor) / factor;
	}
	/**
	* Rounds a number to the next smaller integer considering only the given number
	* of decimal digits (with rounding on the final digit).
	* @param {number} n The input number.
	* @param {number} decimals The maximum number of decimal digits.
	* @return {number} The next smaller integer.
	*/
	function floor(n, decimals) {
		return Math.floor(toFixed(n, decimals));
	}
	/**
	* Rounds a number to the next bigger integer considering only the given number
	* of decimal digits (with rounding on the final digit).
	* @param {number} n The input number.
	* @param {number} decimals The maximum number of decimal digits.
	* @return {number} The next bigger integer.
	*/
	function ceil(n, decimals) {
		return Math.ceil(toFixed(n, decimals));
	}
	/**
	* Wraps a number between some minimum and maximum values.
	* @param {number} n The number to wrap.
	* @param {number} min The minimum of the range (inclusive).
	* @param {number} max The maximum of the range (exclusive).
	* @return {number} The wrapped number.
	*/
	function wrap(n, min, max) {
		if (n >= min && n < max) return n;
		const range = max - min;
		return ((n - min) % range + range) % range + min;
	}
	//#endregion
	//#region src/ol/centerconstraint.js
	/**
	* @module ol/centerconstraint
	*/
	/**
	* @typedef {function((import("./coordinate.js").Coordinate|undefined), number, import("./size.js").Size, boolean=, Array<number>=): (import("./coordinate.js").Coordinate|undefined)} Type
	*/
	/**
	* @param {import("./extent.js").Extent} extent Extent.
	* @param {boolean} onlyCenter If true, the constraint will only apply to the view center.
	* @param {boolean} smooth If true, the view will be able to go slightly out of the given extent
	* (only during interaction and animation).
	* @return {Type} The constraint.
	*/
	function createExtent(extent, onlyCenter, smooth) {
		return (
		/**
		* @param {import("./coordinate.js").Coordinate|undefined} center Center.
		* @param {number|undefined} resolution Resolution.
		* @param {import("./size.js").Size} size Viewport size; unused if `onlyCenter` was specified.
		* @param {boolean} [isMoving] True if an interaction or animation is in progress.
		* @param {Array<number>} [centerShift] Shift between map center and viewport center.
		* @return {import("./coordinate.js").Coordinate|undefined} Center.
		*/
function(center, resolution, size, isMoving, centerShift) {
			if (!center) return;
			if (!resolution && !onlyCenter) return center;
			const viewWidth = onlyCenter ? 0 : size[0] * resolution;
			const viewHeight = onlyCenter ? 0 : size[1] * resolution;
			const shiftX = centerShift ? centerShift[0] : 0;
			const shiftY = centerShift ? centerShift[1] : 0;
			let minX = extent[0] + viewWidth / 2 + shiftX;
			let maxX = extent[2] - viewWidth / 2 + shiftX;
			let minY = extent[1] + viewHeight / 2 + shiftY;
			let maxY = extent[3] - viewHeight / 2 + shiftY;
			if (minX > maxX) {
				minX = (maxX + minX) / 2;
				maxX = minX;
			}
			if (minY > maxY) {
				minY = (maxY + minY) / 2;
				maxY = minY;
			}
			let x = clamp(center[0], minX, maxX);
			let y = clamp(center[1], minY, maxY);
			if (isMoving && smooth && resolution) {
				const ratio = 30 * resolution;
				x += -ratio * Math.log(1 + Math.max(0, minX - center[0]) / ratio) + ratio * Math.log(1 + Math.max(0, center[0] - maxX) / ratio);
				y += -ratio * Math.log(1 + Math.max(0, minY - center[1]) / ratio) + ratio * Math.log(1 + Math.max(0, center[1] - maxY) / ratio);
			}
			return [x, y];
		});
	}
	/**
	* @param {import("./coordinate.js").Coordinate} [center] Center.
	* @return {import("./coordinate.js").Coordinate|undefined} Center.
	*/
	function none$1(center) {
		return center;
	}
	//#endregion
	//#region src/ol/extent/Relationship.js
	/**
	* @module ol/extent/Relationship
	*/
	/**
	* Relationship to an extent.
	* @enum {number}
	*/
	var Relationship_default = {
		UNKNOWN: 0,
		INTERSECTING: 1,
		ABOVE: 2,
		RIGHT: 4,
		BELOW: 8,
		LEFT: 16
	};
	//#endregion
	//#region src/ol/extent.js
	/**
	* @module ol/extent
	*/
	/**
	* An array of numbers representing an extent: `[minx, miny, maxx, maxy]`.
	* @typedef {Array<number>} Extent
	* @api
	*/
	/**
	* Extent corner.
	* @typedef {'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'} Corner
	*/
	/**
	* Build an extent that includes all given coordinates.
	*
	* @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
	* @return {Extent} Bounding extent.
	* @api
	*/
	function boundingExtent(coordinates) {
		const extent = createEmpty();
		for (let i = 0, ii = coordinates.length; i < ii; ++i) extendCoordinate(extent, coordinates[i]);
		return extent;
	}
	/**
	* Creates a clone of an extent.
	*
	* @param {Extent} extent Extent to clone.
	* @param {Extent} [dest] Extent.
	* @return {Extent} The clone.
	*/
	function clone(extent, dest) {
		if (dest) {
			dest[0] = extent[0];
			dest[1] = extent[1];
			dest[2] = extent[2];
			dest[3] = extent[3];
			return dest;
		}
		return extent.slice();
	}
	/**
	* @param {Extent} extent Extent.
	* @param {number} x X.
	* @param {number} y Y.
	* @return {number} Closest squared distance.
	*/
	function closestSquaredDistanceXY(extent, x, y) {
		let dx, dy;
		if (x < extent[0]) dx = extent[0] - x;
		else if (extent[2] < x) dx = x - extent[2];
		else dx = 0;
		if (y < extent[1]) dy = extent[1] - y;
		else if (extent[3] < y) dy = y - extent[3];
		else dy = 0;
		return dx * dx + dy * dy;
	}
	/**
	* Check if the passed coordinate is contained or on the edge of the extent.
	*
	* @param {Extent} extent Extent.
	* @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
	* @return {boolean} The coordinate is contained in the extent.
	* @api
	*/
	function containsCoordinate(extent, coordinate) {
		return containsXY(extent, coordinate[0], coordinate[1]);
	}
	/**
	* Check if one extent contains another.
	*
	* An extent is deemed contained if it lies completely within the other extent,
	* including if they share one or more edges.
	*
	* @param {Extent} extent1 Extent 1.
	* @param {Extent} extent2 Extent 2.
	* @return {boolean} The second extent is contained by or on the edge of the
	*     first.
	* @api
	*/
	function containsExtent(extent1, extent2) {
		return extent1[0] <= extent2[0] && extent2[2] <= extent1[2] && extent1[1] <= extent2[1] && extent2[3] <= extent1[3];
	}
	/**
	* Check if the passed coordinate is contained or on the edge of the extent.
	*
	* @param {Extent} extent Extent.
	* @param {number} x X coordinate.
	* @param {number} y Y coordinate.
	* @return {boolean} The x, y values are contained in the extent.
	* @api
	*/
	function containsXY(extent, x, y) {
		return extent[0] <= x && x <= extent[2] && extent[1] <= y && y <= extent[3];
	}
	/**
	* Get the relationship between a coordinate and extent.
	* @param {Extent} extent The extent.
	* @param {import("./coordinate.js").Coordinate} coordinate The coordinate.
	* @return {import("./extent/Relationship.js").default} The relationship (bitwise compare with
	*     import("./extent/Relationship.js").Relationship).
	*/
	function coordinateRelationship(extent, coordinate) {
		const minX = extent[0];
		const minY = extent[1];
		const maxX = extent[2];
		const maxY = extent[3];
		const x = coordinate[0];
		const y = coordinate[1];
		let relationship = Relationship_default.UNKNOWN;
		if (x < minX) relationship = relationship | Relationship_default.LEFT;
		else if (x > maxX) relationship = relationship | Relationship_default.RIGHT;
		if (y < minY) relationship = relationship | Relationship_default.BELOW;
		else if (y > maxY) relationship = relationship | Relationship_default.ABOVE;
		if (relationship === Relationship_default.UNKNOWN) relationship = Relationship_default.INTERSECTING;
		return relationship;
	}
	/**
	* Create an empty extent.
	* @return {Extent} Empty extent.
	* @api
	*/
	function createEmpty() {
		return [
			Infinity,
			Infinity,
			-Infinity,
			-Infinity
		];
	}
	/**
	* Create a new extent or update the provided extent.
	* @param {number} minX Minimum X.
	* @param {number} minY Minimum Y.
	* @param {number} maxX Maximum X.
	* @param {number} maxY Maximum Y.
	* @param {Extent} [dest] Destination extent.
	* @return {Extent} Extent.
	*/
	function createOrUpdate$2(minX, minY, maxX, maxY, dest) {
		if (dest) {
			dest[0] = minX;
			dest[1] = minY;
			dest[2] = maxX;
			dest[3] = maxY;
			return dest;
		}
		return [
			minX,
			minY,
			maxX,
			maxY
		];
	}
	/**
	* Create a new empty extent or make the provided one empty.
	* @param {Extent} [dest] Extent.
	* @return {Extent} Extent.
	*/
	function createOrUpdateEmpty(dest) {
		return createOrUpdate$2(Infinity, Infinity, -Infinity, -Infinity, dest);
	}
	/**
	* @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
	* @param {Extent} [dest] Extent.
	* @return {Extent} Extent.
	*/
	function createOrUpdateFromCoordinate(coordinate, dest) {
		const x = coordinate[0];
		const y = coordinate[1];
		return createOrUpdate$2(x, y, x, y, dest);
	}
	/**
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {number} end End.
	* @param {number} stride Stride.
	* @param {Extent} [dest] Extent.
	* @return {Extent} Extent.
	*/
	function createOrUpdateFromFlatCoordinates(flatCoordinates, offset, end, stride, dest) {
		return extendFlatCoordinates(createOrUpdateEmpty(dest), flatCoordinates, offset, end, stride);
	}
	/**
	* Determine if two extents are equivalent.
	* @param {Extent} extent1 Extent 1.
	* @param {Extent} extent2 Extent 2.
	* @return {boolean} The two extents are equivalent.
	* @api
	*/
	function equals$1(extent1, extent2) {
		return extent1[0] == extent2[0] && extent1[2] == extent2[2] && extent1[1] == extent2[1] && extent1[3] == extent2[3];
	}
	/**
	* Modify an extent to include another extent.
	* @param {Extent} extent1 The extent to be modified.
	* @param {Extent} extent2 The extent that will be included in the first.
	* @return {Extent} A reference to the first (extended) extent.
	* @api
	*/
	function extend$1(extent1, extent2) {
		if (extent2[0] < extent1[0]) extent1[0] = extent2[0];
		if (extent2[2] > extent1[2]) extent1[2] = extent2[2];
		if (extent2[1] < extent1[1]) extent1[1] = extent2[1];
		if (extent2[3] > extent1[3]) extent1[3] = extent2[3];
		return extent1;
	}
	/**
	* @param {Extent} extent Extent.
	* @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
	*/
	function extendCoordinate(extent, coordinate) {
		if (coordinate[0] < extent[0]) extent[0] = coordinate[0];
		if (coordinate[0] > extent[2]) extent[2] = coordinate[0];
		if (coordinate[1] < extent[1]) extent[1] = coordinate[1];
		if (coordinate[1] > extent[3]) extent[3] = coordinate[1];
	}
	/**
	* @param {Extent} extent Extent.
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {number} end End.
	* @param {number} stride Stride.
	* @return {Extent} Extent.
	*/
	function extendFlatCoordinates(extent, flatCoordinates, offset, end, stride) {
		for (; offset < end; offset += stride) extendXY(extent, flatCoordinates[offset], flatCoordinates[offset + 1]);
		return extent;
	}
	/**
	* @param {Extent} extent Extent.
	* @param {number} x X.
	* @param {number} y Y.
	*/
	function extendXY(extent, x, y) {
		extent[0] = Math.min(extent[0], x);
		extent[1] = Math.min(extent[1], y);
		extent[2] = Math.max(extent[2], x);
		extent[3] = Math.max(extent[3], y);
	}
	/**
	* This function calls `callback` for each corner of the extent. If the
	* callback returns a truthy value the function returns that value
	* immediately. Otherwise the function returns `false`.
	* @param {Extent} extent Extent.
	* @param {function(import("./coordinate.js").Coordinate): S} callback Callback.
	* @return {S|boolean} Value.
	* @template S
	*/
	function forEachCorner(extent, callback) {
		let val;
		val = callback(getBottomLeft(extent));
		if (val) return val;
		val = callback(getBottomRight(extent));
		if (val) return val;
		val = callback(getTopRight(extent));
		if (val) return val;
		val = callback(getTopLeft(extent));
		if (val) return val;
		return false;
	}
	/**
	* Get the size of an extent.
	* @param {Extent} extent Extent.
	* @return {number} Area.
	* @api
	*/
	function getArea(extent) {
		let area = 0;
		if (!isEmpty(extent)) area = getWidth(extent) * getHeight(extent);
		return area;
	}
	/**
	* Get the bottom left coordinate of an extent.
	* @param {Extent} extent Extent.
	* @return {import("./coordinate.js").Coordinate} Bottom left coordinate.
	* @api
	*/
	function getBottomLeft(extent) {
		return [extent[0], extent[1]];
	}
	/**
	* Get the bottom right coordinate of an extent.
	* @param {Extent} extent Extent.
	* @return {import("./coordinate.js").Coordinate} Bottom right coordinate.
	* @api
	*/
	function getBottomRight(extent) {
		return [extent[2], extent[1]];
	}
	/**
	* Get the center coordinate of an extent.
	* @param {Extent} extent Extent.
	* @return {import("./coordinate.js").Coordinate} Center.
	* @api
	*/
	function getCenter(extent) {
		return [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
	}
	/**
	* Get a corner coordinate of an extent.
	* @param {Extent} extent Extent.
	* @param {Corner} corner Corner.
	* @return {import("./coordinate.js").Coordinate} Corner coordinate.
	*/
	function getCorner(extent, corner) {
		let coordinate;
		if (corner === "bottom-left") coordinate = getBottomLeft(extent);
		else if (corner === "bottom-right") coordinate = getBottomRight(extent);
		else if (corner === "top-left") coordinate = getTopLeft(extent);
		else if (corner === "top-right") coordinate = getTopRight(extent);
		else throw new Error("Invalid corner");
		return coordinate;
	}
	/**
	* @param {import("./coordinate.js").Coordinate} center Center.
	* @param {number} resolution Resolution.
	* @param {number} rotation Rotation.
	* @param {import("./size.js").Size} size Size.
	* @param {Extent} [dest] Destination extent.
	* @return {Extent} Extent.
	*/
	function getForViewAndSize(center, resolution, rotation, size, dest) {
		const [x0, y0, x1, y1, x2, y2, x3, y3] = getRotatedViewport(center, resolution, rotation, size);
		return createOrUpdate$2(Math.min(x0, x1, x2, x3), Math.min(y0, y1, y2, y3), Math.max(x0, x1, x2, x3), Math.max(y0, y1, y2, y3), dest);
	}
	/**
	* @param {import("./coordinate.js").Coordinate} center Center.
	* @param {number} resolution Resolution.
	* @param {number} rotation Rotation.
	* @param {import("./size.js").Size} size Size.
	* @return {Array<number>} Linear ring representing the viewport.
	*/
	function getRotatedViewport(center, resolution, rotation, size) {
		const dx = resolution * size[0] / 2;
		const dy = resolution * size[1] / 2;
		const cosRotation = Math.cos(rotation);
		const sinRotation = Math.sin(rotation);
		const xCos = dx * cosRotation;
		const xSin = dx * sinRotation;
		const yCos = dy * cosRotation;
		const ySin = dy * sinRotation;
		const x = center[0];
		const y = center[1];
		return [
			x - xCos + ySin,
			y - xSin - yCos,
			x - xCos - ySin,
			y - xSin + yCos,
			x + xCos - ySin,
			y + xSin + yCos,
			x + xCos + ySin,
			y + xSin - yCos,
			x - xCos + ySin,
			y - xSin - yCos
		];
	}
	/**
	* Get the height of an extent.
	* @param {Extent} extent Extent.
	* @return {number} Height.
	* @api
	*/
	function getHeight(extent) {
		return extent[3] - extent[1];
	}
	/**
	* Get the intersection of two extents.
	* @param {Extent} extent1 Extent 1.
	* @param {Extent} extent2 Extent 2.
	* @param {Extent} [dest] Optional extent to populate with intersection.
	* @return {Extent} Intersecting extent.
	* @api
	*/
	function getIntersection(extent1, extent2, dest) {
		const intersection = dest ? dest : createEmpty();
		if (intersects$1(extent1, extent2)) {
			if (extent1[0] > extent2[0]) intersection[0] = extent1[0];
			else intersection[0] = extent2[0];
			if (extent1[1] > extent2[1]) intersection[1] = extent1[1];
			else intersection[1] = extent2[1];
			if (extent1[2] < extent2[2]) intersection[2] = extent1[2];
			else intersection[2] = extent2[2];
			if (extent1[3] < extent2[3]) intersection[3] = extent1[3];
			else intersection[3] = extent2[3];
		} else createOrUpdateEmpty(intersection);
		return intersection;
	}
	/**
	* Get the difference between two extents, i.e. the area(s) of `extent1` that
	* are not covered by `extent2`.  Returns an array of between 0 and 4 extents.
	*
	* When the extents do not intersect the returned array contains `extent1` as
	* its only element.  When `extent2` completely contains `extent1` the returned
	* array is empty.  Otherwise up to four non-overlapping extents are returned
	* that together cover exactly the parts of `extent1` outside `extent2`.
	*
	* The decomposition used is:
	*
	* ```
	* ┌────┬─────────┬────┐  ← y2
	* │    │   top   │    │
	* │    ├─────────┤    │  ← iy2
	* │left│ (gone)  │right│
	* │    ├─────────┤    │  ← iy1
	* │    │ bottom  │    │
	* └────┴─────────┴────┘  ← y1
	* x1  ix1       ix2   x2
	* ```
	*
	* The left and right strips span the full height of `extent1` while the top
	* and bottom strips are clamped horizontally to the intersection, so the four
	* rectangles tile perfectly without overlap or gaps.
	*
	* @param {Extent} extent1 Extent to subtract from.
	* @param {Extent} extent2 Extent to subtract.
	* @return {Array<Extent>} Remaining extents (0–4 elements).
	* @api
	*/
	function getDifference(extent1, extent2) {
		if (!intersects$1(extent1, extent2)) return [extent1.slice()];
		if (containsExtent(extent2, extent1)) return [];
		const [x1, y1, x2, y2] = extent1;
		const ix1 = Math.max(x1, extent2[0]);
		const iy1 = Math.max(y1, extent2[1]);
		const ix2 = Math.min(x2, extent2[2]);
		const iy2 = Math.min(y2, extent2[3]);
		const result = [];
		if (ix1 > x1) result.push([
			x1,
			y1,
			ix1,
			y2
		]);
		if (ix2 < x2) result.push([
			ix2,
			y1,
			x2,
			y2
		]);
		if (iy1 > y1) result.push([
			ix1,
			y1,
			ix2,
			iy1
		]);
		if (iy2 < y2) result.push([
			ix1,
			iy2,
			ix2,
			y2
		]);
		return result;
	}
	/**
	* Get the top left coordinate of an extent.
	* @param {Extent} extent Extent.
	* @return {import("./coordinate.js").Coordinate} Top left coordinate.
	* @api
	*/
	function getTopLeft(extent) {
		return [extent[0], extent[3]];
	}
	/**
	* Get the top right coordinate of an extent.
	* @param {Extent} extent Extent.
	* @return {import("./coordinate.js").Coordinate} Top right coordinate.
	* @api
	*/
	function getTopRight(extent) {
		return [extent[2], extent[3]];
	}
	/**
	* Get the width of an extent.
	* @param {Extent} extent Extent.
	* @return {number} Width.
	* @api
	*/
	function getWidth(extent) {
		return extent[2] - extent[0];
	}
	/**
	* Determine if one extent intersects another.
	* @param {Extent} extent1 Extent 1.
	* @param {Extent} extent2 Extent.
	* @return {boolean} The two extents intersect.
	* @api
	*/
	function intersects$1(extent1, extent2) {
		return extent1[0] <= extent2[2] && extent1[2] >= extent2[0] && extent1[1] <= extent2[3] && extent1[3] >= extent2[1];
	}
	/**
	* Determine if an extent is empty.
	* @param {Extent} extent Extent.
	* @return {boolean} Is empty.
	* @api
	*/
	function isEmpty(extent) {
		return extent[2] < extent[0] || extent[3] < extent[1];
	}
	/**
	* @param {Extent} extent Extent.
	* @param {Extent} [dest] Extent.
	* @return {Extent} Extent.
	*/
	function returnOrUpdate(extent, dest) {
		if (dest) {
			dest[0] = extent[0];
			dest[1] = extent[1];
			dest[2] = extent[2];
			dest[3] = extent[3];
			return dest;
		}
		return extent;
	}
	/**
	* Determine if the segment between two coordinates intersects (crosses,
	* touches, or is contained by) the provided extent.
	* @param {Extent} extent The extent.
	* @param {import("./coordinate.js").Coordinate} start Segment start coordinate.
	* @param {import("./coordinate.js").Coordinate} end Segment end coordinate.
	* @return {boolean} The segment intersects the extent.
	*/
	function intersectsSegment(extent, start, end) {
		let intersects = false;
		const startRel = coordinateRelationship(extent, start);
		const endRel = coordinateRelationship(extent, end);
		if (startRel === Relationship_default.INTERSECTING || endRel === Relationship_default.INTERSECTING) intersects = true;
		else {
			const minX = extent[0];
			const minY = extent[1];
			const maxX = extent[2];
			const maxY = extent[3];
			const startX = start[0];
			const startY = start[1];
			const endX = end[0];
			const endY = end[1];
			const slope = (endY - startY) / (endX - startX);
			let x, y;
			if (!!(endRel & Relationship_default.ABOVE) && !(startRel & Relationship_default.ABOVE)) {
				x = endX - (endY - maxY) / slope;
				intersects = x >= minX && x <= maxX;
			}
			if (!intersects && !!(endRel & Relationship_default.RIGHT) && !(startRel & Relationship_default.RIGHT)) {
				y = endY - (endX - maxX) * slope;
				intersects = y >= minY && y <= maxY;
			}
			if (!intersects && !!(endRel & Relationship_default.BELOW) && !(startRel & Relationship_default.BELOW)) {
				x = endX - (endY - minY) / slope;
				intersects = x >= minX && x <= maxX;
			}
			if (!intersects && !!(endRel & Relationship_default.LEFT) && !(startRel & Relationship_default.LEFT)) {
				y = endY - (endX - minX) * slope;
				intersects = y >= minY && y <= maxY;
			}
		}
		return intersects;
	}
	/**
	* Modifies the provided extent in-place to be within the real world
	* extent.
	*
	* @param {Extent} extent Extent.
	* @param {import("./proj/Projection.js").default} projection Projection
	* @return {Extent} The extent within the real world extent.
	*/
	function wrapX$2(extent, projection) {
		const projectionExtent = projection.getExtent();
		const center = getCenter(extent);
		if (projection.canWrapX() && (center[0] < projectionExtent[0] || center[0] >= projectionExtent[2])) {
			const worldWidth = getWidth(projectionExtent);
			const offset = Math.floor((center[0] - projectionExtent[0]) / worldWidth) * worldWidth;
			extent[0] -= offset;
			extent[2] -= offset;
		}
		return extent;
	}
	/**
	* Fits the extent to the real world
	*
	* If the extent does not cross the anti meridian, this will return the extent in an array
	* If the extent crosses the anti meridian, the extent will be sliced, so each part fits within the
	* real world
	*
	*
	* @param {Extent} extent Extent.
	* @param {import("./proj/Projection.js").default} projection Projection
	* @param {boolean} [multiWorld] Return all worlds
	* @return {Array<Extent>} The extent within the real world extent.
	*/
	function wrapAndSliceX(extent, projection, multiWorld) {
		if (projection.canWrapX()) {
			const projectionExtent = projection.getExtent();
			if (!isFinite(extent[0]) || !isFinite(extent[2])) return [[
				projectionExtent[0],
				extent[1],
				projectionExtent[2],
				extent[3]
			]];
			wrapX$2(extent, projection);
			const worldWidth = getWidth(projectionExtent);
			if (getWidth(extent) > worldWidth && !multiWorld) return [[
				projectionExtent[0],
				extent[1],
				projectionExtent[2],
				extent[3]
			]];
			if (extent[0] < projectionExtent[0]) return [[
				extent[0] + worldWidth,
				extent[1],
				projectionExtent[2],
				extent[3]
			], [
				projectionExtent[0],
				extent[1],
				extent[2],
				extent[3]
			]];
			if (extent[2] > projectionExtent[2]) return [[
				extent[0],
				extent[1],
				projectionExtent[2],
				extent[3]
			], [
				projectionExtent[0],
				extent[1],
				extent[2] - worldWidth,
				extent[3]
			]];
		}
		return [extent];
	}
	/**
	* Subtract several rectangles from a base rectangle. Returns a set of disjoint
	* rectangles that together cover the base rectangle minus the union of the
	* subtracted rectangles, by repeatedly applying {@link module:ol/extent.getDifference}.
	* @param {Extent} base Base rectangle.
	* @param {Array<Extent>} subtract Rectangles to subtract.
	* @return {Array<Extent>} Remainder rectangles.
	*/
	function subtractExtents(base, subtract) {
		let remainder = [base];
		for (let i = 0, ii = subtract.length; i < ii && remainder.length > 0; ++i) {
			/** @type {Array<Extent>} */
			const next = [];
			for (let j = 0, jj = remainder.length; j < jj; ++j) next.push(...getDifference(remainder[j], subtract[i]));
			remainder = next;
		}
		return remainder;
	}
	//#endregion
	//#region src/ol/coordinate.js
	/**
	* @module ol/coordinate
	*/
	/**
	* An array of numbers representing an `xy`, `xyz` or `xyzm` coordinate.
	* Example: `[16, 48]`.
	* @typedef {Array<number>} Coordinate
	* @api
	*/
	/**
	* A function that takes a {@link module:ol/coordinate~Coordinate} and
	* transforms it into a `{string}`.
	*
	* @typedef {function((Coordinate|undefined)): string} CoordinateFormat
	* @api
	*/
	/**
	* Add `delta` to `coordinate`. `coordinate` is modified in place and returned
	* by the function.
	*
	* Example:
	*
	*     import {add} from 'ol/coordinate.js';
	*
	*     const coord = [7.85, 47.983333];
	*     add(coord, [-2, 4]);
	*     // coord is now [5.85, 51.983333]
	*
	* @param {Coordinate} coordinate Coordinate.
	* @param {Coordinate} delta Delta.
	* @return {Coordinate} The input coordinate adjusted by
	* the given delta.
	* @api
	*/
	function add$2(coordinate, delta) {
		coordinate[0] += +delta[0];
		coordinate[1] += +delta[1];
		return coordinate;
	}
	/**
	* @param {Coordinate} coordinate1 First coordinate.
	* @param {Coordinate} coordinate2 Second coordinate.
	* @return {boolean} The two coordinates are equal.
	*/
	function equals(coordinate1, coordinate2) {
		let equals = true;
		for (let i = coordinate1.length - 1; i >= 0; --i) if (coordinate1[i] != coordinate2[i]) {
			equals = false;
			break;
		}
		return equals;
	}
	/**
	* Rotate `coordinate` by `angle`. `coordinate` is modified in place and
	* returned by the function.
	*
	* Example:
	*
	*     import {rotate} from 'ol/coordinate.js';
	*
	*     const coord = [7.85, 47.983333];
	*     const rotateRadians = Math.PI / 2; // 90 degrees
	*     rotate(coord, rotateRadians);
	*     // coord is now [-47.983333, 7.85]
	*
	* @param {Coordinate} coordinate Coordinate.
	* @param {number} angle Angle in radian.
	* @return {Coordinate} Coordinate.
	* @api
	*/
	function rotate$1(coordinate, angle) {
		const cosAngle = Math.cos(angle);
		const sinAngle = Math.sin(angle);
		const x = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
		const y = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
		coordinate[0] = x;
		coordinate[1] = y;
		return coordinate;
	}
	/**
	* Scale `coordinate` by `scale`. `coordinate` is modified in place and returned
	* by the function.
	*
	* Example:
	*
	*     import {scale as scaleCoordinate} from 'ol/coordinate.js';
	*
	*     const coord = [7.85, 47.983333];
	*     const scale = 1.2;
	*     scaleCoordinate(coord, scale);
	*     // coord is now [9.42, 57.5799996]
	*
	* @param {Coordinate} coordinate Coordinate.
	* @param {number} scale Scale factor.
	* @return {Coordinate} Coordinate.
	*/
	function scale$2(coordinate, scale) {
		coordinate[0] *= scale;
		coordinate[1] *= scale;
		return coordinate;
	}
	/**
	* Modifies the provided coordinate in-place to be within the real world
	* extent. The lower projection extent boundary is inclusive, the upper one
	* exclusive.
	*
	* @param {Coordinate} coordinate Coordinate.
	* @param {import("./proj/Projection.js").default} projection Projection.
	* @return {Coordinate} The coordinate within the real world extent.
	*/
	function wrapX$1(coordinate, projection) {
		if (projection.canWrapX()) {
			const worldWidth = getWidth(projection.getExtent());
			const worldsAway = getWorldsAway(coordinate, projection, worldWidth);
			if (worldsAway) coordinate[0] -= worldsAway * worldWidth;
		}
		return coordinate;
	}
	/**
	* @param {Coordinate} coordinate Coordinate.
	* @param {import("./proj/Projection.js").default} projection Projection.
	* @param {number} [sourceExtentWidth] Width of the source extent.
	* @return {number} Offset in world widths.
	*/
	function getWorldsAway(coordinate, projection, sourceExtentWidth) {
		const projectionExtent = projection.getExtent();
		let worldsAway = 0;
		if (projection.canWrapX() && (coordinate[0] < projectionExtent[0] || coordinate[0] > projectionExtent[2])) {
			sourceExtentWidth = sourceExtentWidth || getWidth(projectionExtent);
			worldsAway = Math.floor((coordinate[0] - projectionExtent[0]) / sourceExtentWidth);
		}
		return worldsAway;
	}
	//#endregion
	//#region src/ol/easing.js
	/**
	* @module ol/easing
	*/
	/**
	* Start slow and speed up.
	* @param {number} t Input between 0 and 1.
	* @return {number} Output between 0 and 1.
	* @api
	*/
	function easeIn(t) {
		return Math.pow(t, 3);
	}
	/**
	* Start fast and slow down.
	* @param {number} t Input between 0 and 1.
	* @return {number} Output between 0 and 1.
	* @api
	*/
	function easeOut(t) {
		return 1 - easeIn(1 - t);
	}
	/**
	* Start slow, speed up, and then slow down again.
	* @param {number} t Input between 0 and 1.
	* @return {number} Output between 0 and 1.
	* @api
	*/
	function inAndOut(t) {
		return 3 * t * t - 2 * t * t * t;
	}
	/**
	* Maintain a constant speed over time.
	* @param {number} t Input between 0 and 1.
	* @return {number} Output between 0 and 1.
	* @api
	*/
	function linear(t) {
		return t;
	}
	/**
	* Get the great circle distance (in meters) between two geographic coordinates.
	* @param {Array} c1 Starting coordinate.
	* @param {Array} c2 Ending coordinate.
	* @param {number} [radius] The sphere radius to use.  Defaults to the Earth's
	*     mean radius using the WGS84 ellipsoid.
	* @return {number} The great circle distance between the points (in meters).
	* @api
	*/
	function getDistance(c1, c2, radius) {
		radius = radius || 6371008.8;
		const lat1 = toRadians(c1[1]);
		const lat2 = toRadians(c2[1]);
		const deltaLatBy2 = (lat2 - lat1) / 2;
		const deltaLonBy2 = toRadians(c2[0] - c1[0]) / 2;
		const a = Math.sin(deltaLatBy2) * Math.sin(deltaLatBy2) + Math.sin(deltaLonBy2) * Math.sin(deltaLonBy2) * Math.cos(lat1) * Math.cos(lat2);
		return 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	}
	//#endregion
	//#region src/ol/console.js
	/**
	* @module ol/console
	*/
	/**
	* @typedef {'info'|'warn'|'error'|'none'} Level
	*/
	/**
	* @type {Object<Level, number>}
	*/
	const levels = {
		info: 1,
		warn: 2,
		error: 3,
		none: 4
	};
	/**
	* @type {number}
	*/
	let level = levels.info;
	/**
	* @param  {...any} args Arguments to log
	*/
	function warn(...args) {
		if (level > levels.warn) return;
		console.warn(...args);
	}
	//#endregion
	//#region src/ol/proj/Units.js
	/**
	* @typedef {Object} MetersPerUnitLookup
	* @property {number} radians Radians
	* @property {number} degrees Degrees
	* @property {number} ft  Feet
	* @property {number} m Meters
	* @property {number} us-ft US feet
	*/
	/**
	* Meters per unit lookup table.
	* @const
	* @type {MetersPerUnitLookup}
	* @api
	*/
	const METERS_PER_UNIT$1 = {
		"radians": 6370997 / (2 * Math.PI),
		"degrees": 2 * Math.PI * 6370997 / 360,
		"ft": .3048,
		"m": 1,
		"us-ft": 1200 / 3937
	};
	//#endregion
	//#region src/ol/proj/Projection.js
	/**
	* @module ol/proj/Projection
	*/
	/**
	* The function is called with a `number` view resolution and a
	* {@link module:ol/coordinate~Coordinate} as arguments, and returns the `number` resolution
	* in projection units at the passed coordinate.
	* @typedef {function(number, import("../coordinate.js").Coordinate):number} GetPointResolution
	* @api
	*/
	/**
	* @typedef {Object} Options
	* @property {string} code The SRS identifier code, e.g. `EPSG:4326`.
	* @property {import("./Units.js").Units} [units] Units. Required unless a
	* proj4 projection is defined for `code`.
	* @property {import("../extent.js").Extent} [extent] The validity extent for the SRS.
	* @property {string} [axisOrientation='enu'] The axis orientation as specified in Proj4.
	* @property {boolean} [global=false] Whether the projection is valid for the whole globe.
	* @property {number} [metersPerUnit] The meters per unit for the SRS.
	* If not provided, the `units` are used to get the meters per unit from the {@link METERS_PER_UNIT}
	* lookup table.
	* @property {import("../extent.js").Extent} [worldExtent] The world extent for the SRS.
	* @property {GetPointResolution} [getPointResolution]
	* Function to determine resolution at a point. The function is called with a
	* `number` view resolution and a {@link module:ol/coordinate~Coordinate} as arguments, and returns
	* the `number` resolution in projection units at the passed coordinate. If this is `undefined`,
	* the default {@link module:ol/proj.getPointResolution} function will be used.
	*/
	/**
	* @classdesc
	* In most cases, you should not need to create instances of this class.
	* Instead, where projection information is required, you can use a string
	* projection code or identifier (e.g. `EPSG:4326`) instead of a projection
	* instance.
	*
	* The library includes support for transforming coordinates between the following
	* projections:
	*
	*  WGS 84 / Geographic - Using codes `EPSG:4326`, `CRS:84`, `urn:ogc:def:crs:EPSG:6.6:4326`,
	*    `urn:ogc:def:crs:OGC:1.3:CRS84`, `urn:ogc:def:crs:OGC:2:84`, `http://www.opengis.net/gml/srs/epsg.xml#4326`,
	*    or `urn:x-ogc:def:crs:EPSG:4326`
	*  WGS 84 / Spherical Mercator - Using codes `EPSG:3857`, `EPSG:102100`, `EPSG:102113`, `EPSG:900913`,
	*    `urn:ogc:def:crs:EPSG:6.18:3:3857`, or `http://www.opengis.net/gml/srs/epsg.xml#3857`
	*  WGS 84 / UTM zones - Using codes `EPSG:32601` through `EPSG:32660` for northern zones
	*    and `EPSG:32701` through `EPSG:32760` for southern zones. Note that the built-in UTM transforms
	*    are lower accuracy (with errors on the order of 0.1 m) than those that you might get in a
	*    library like [proj4js](https://github.com/proj4js/proj4js).
	*
	* For additional projection support, or to use higher accuracy transforms than the built-in ones, you can use
	* the [proj4js](https://github.com/proj4js/proj4js) library. With `proj4js`, after adding any new projection
	* definitions, call the {@link module:ol/proj/proj4.register} function.
	*
	* You can use the {@link module:ol/proj.get} function to retrieve a projection instance
	* for one of the registered projections.
	*
	* @api
	*/
	var Projection = class {
		/**
		* @param {Options} options Projection options.
		*/
		constructor(options) {
			/**
			* @private
			* @type {string}
			*/
			this.code_ = options.code;
			/**
			* Units of projected coordinates. When set to `TILE_PIXELS`, a
			* `this.extent_` and `this.worldExtent_` must be configured properly for each
			* tile.
			* @private
			* @type {import("./Units.js").Units}
			*/
			this.units_ = options.units;
			/**
			* Validity extent of the projection in projected coordinates. For projections
			* with `TILE_PIXELS` units, this is the extent of the tile in
			* tile pixel space.
			* @private
			* @type {import("../extent.js").Extent}
			*/
			this.extent_ = options.extent !== void 0 ? options.extent : null;
			/**
			* Extent of the world in EPSG:4326. For projections with
			* `TILE_PIXELS` units, this is the extent of the tile in
			* projected coordinate space.
			* @private
			* @type {import("../extent.js").Extent}
			*/
			this.worldExtent_ = options.worldExtent !== void 0 ? options.worldExtent : null;
			/**
			* @private
			* @type {string}
			*/
			this.axisOrientation_ = options.axisOrientation !== void 0 ? options.axisOrientation : "enu";
			/**
			* @private
			* @type {boolean}
			*/
			this.global_ = options.global !== void 0 ? options.global : false;
			/**
			* @private
			* @type {boolean}
			*/
			this.canWrapX_ = !!(this.global_ && this.extent_);
			/**
			* @private
			* @type {GetPointResolution|undefined}
			*/
			this.getPointResolutionFunc_ = options.getPointResolution;
			/**
			* @private
			* @type {import("../tilegrid/TileGrid.js").default}
			*/
			this.defaultTileGrid_ = null;
			/**
			* @private
			* @type {number|undefined}
			*/
			this.metersPerUnit_ = options.metersPerUnit;
		}
		/**
		* @return {boolean} The projection is suitable for wrapping the x-axis
		*/
		canWrapX() {
			return this.canWrapX_;
		}
		/**
		* Get the code for this projection, e.g. 'EPSG:4326'.
		* @return {string} Code.
		* @api
		*/
		getCode() {
			return this.code_;
		}
		/**
		* Get the validity extent for this projection.
		* @return {import("../extent.js").Extent} Extent.
		* @api
		*/
		getExtent() {
			return this.extent_;
		}
		/**
		* Get the units of this projection.
		* @return {import("./Units.js").Units} Units.
		* @api
		*/
		getUnits() {
			return this.units_;
		}
		/**
		* Get the amount of meters per unit of this projection.  If the projection is
		* not configured with `metersPerUnit` or a units identifier, the return is
		* `undefined`.
		* @return {number|undefined} Meters.
		* @api
		*/
		getMetersPerUnit() {
			return this.metersPerUnit_ || METERS_PER_UNIT$1[this.units_];
		}
		/**
		* Get the world extent for this projection.
		* @return {import("../extent.js").Extent} Extent.
		* @api
		*/
		getWorldExtent() {
			return this.worldExtent_;
		}
		/**
		* Get the axis orientation of this projection.
		* Example values are:
		* enu - the default easting, northing, elevation.
		* neu - northing, easting, up - useful for "lat/long" geographic coordinates,
		*     or south orientated transverse mercator.
		* wnu - westing, northing, up - some planetary coordinate systems have
		*     "west positive" coordinate systems
		* @return {string} Axis orientation.
		* @api
		*/
		getAxisOrientation() {
			return this.axisOrientation_;
		}
		/**
		* Is this projection a global projection which spans the whole world?
		* @return {boolean} Whether the projection is global.
		* @api
		*/
		isGlobal() {
			return this.global_;
		}
		/**
		* Set if the projection is a global projection which spans the whole world
		* @param {boolean} global Whether the projection is global.
		* @api
		*/
		setGlobal(global) {
			this.global_ = global;
			this.canWrapX_ = !!(global && this.extent_);
		}
		/**
		* @return {import("../tilegrid/TileGrid.js").default} The default tile grid.
		*/
		getDefaultTileGrid() {
			return this.defaultTileGrid_;
		}
		/**
		* @param {import("../tilegrid/TileGrid.js").default} tileGrid The default tile grid.
		*/
		setDefaultTileGrid(tileGrid) {
			this.defaultTileGrid_ = tileGrid;
		}
		/**
		* Set the validity extent for this projection.
		* @param {import("../extent.js").Extent} extent Extent.
		* @api
		*/
		setExtent(extent) {
			this.extent_ = extent;
			this.canWrapX_ = !!(this.global_ && extent);
		}
		/**
		* Set the world extent for this projection.
		* @param {import("../extent.js").Extent} worldExtent World extent
		*     [minlon, minlat, maxlon, maxlat].
		* @api
		*/
		setWorldExtent(worldExtent) {
			this.worldExtent_ = worldExtent;
		}
		/**
		* Set the getPointResolution function (see {@link module:ol/proj.getPointResolution}
		* for this projection.
		* @param {function(number, import("../coordinate.js").Coordinate):number} func Function
		* @api
		*/
		setGetPointResolution(func) {
			this.getPointResolutionFunc_ = func;
		}
		/**
		* Get the custom point resolution function for this projection (if set).
		* @return {GetPointResolution|undefined} The custom point
		* resolution function (if set).
		*/
		getPointResolutionFunc() {
			return this.getPointResolutionFunc_;
		}
	};
	//#endregion
	//#region src/ol/proj/epsg3857.js
	/**
	* @module ol/proj/epsg3857
	*/
	/**
	* Radius of WGS84 sphere
	*
	* @const
	* @type {number}
	*/
	const RADIUS$1 = 6378137;
	/**
	* @const
	* @type {number}
	*/
	const HALF_SIZE = Math.PI * RADIUS$1;
	/**
	* @const
	* @type {import("../extent.js").Extent}
	*/
	const EXTENT$1 = [
		-HALF_SIZE,
		-HALF_SIZE,
		HALF_SIZE,
		HALF_SIZE
	];
	/**
	* @const
	* @type {import("../extent.js").Extent}
	*/
	const WORLD_EXTENT = [
		-180,
		-85,
		180,
		85
	];
	/**
	* Maximum safe value in y direction
	* @const
	* @type {number}
	*/
	const MAX_SAFE_Y = RADIUS$1 * Math.log(Math.tan(Math.PI / 2));
	/**
	* @classdesc
	* Projection object for web/spherical Mercator (EPSG:3857).
	*/
	var EPSG3857Projection = class extends Projection {
		/**
		* @param {string} code Code.
		*/
		constructor(code) {
			super({
				code,
				units: "m",
				extent: EXTENT$1,
				global: true,
				worldExtent: WORLD_EXTENT,
				getPointResolution: function(resolution, point) {
					return resolution / Math.cosh(point[1] / RADIUS$1);
				}
			});
		}
	};
	/**
	* Projections equal to EPSG:3857.
	*
	* @const
	* @type {Array<import("./Projection.js").default>}
	*/
	const PROJECTIONS$1 = [
		new EPSG3857Projection("EPSG:3857"),
		new EPSG3857Projection("EPSG:102100"),
		new EPSG3857Projection("EPSG:102113"),
		new EPSG3857Projection("EPSG:900913"),
		new EPSG3857Projection("http://www.opengis.net/def/crs/EPSG/0/3857"),
		new EPSG3857Projection("http://www.opengis.net/gml/srs/epsg.xml#3857")
	];
	/**
	* Transformation from EPSG:4326 to EPSG:3857.
	*
	* @param {Array<number>} input Input array of coordinate values.
	* @param {Array<number>} [output] Output array of coordinate values.
	* @param {number} [dimension] Dimension (default is `2`).
	* @param {number} [stride] Stride (default is `dimension`).
	* @return {Array<number>} Output array of coordinate values.
	*/
	function fromEPSG4326(input, output, dimension, stride) {
		const length = input.length;
		dimension = dimension > 1 ? dimension : 2;
		stride = stride ?? dimension;
		if (output === void 0) if (dimension > 2) output = input.slice();
		else output = new Array(length);
		for (let i = 0; i < length; i += stride) {
			output[i] = HALF_SIZE * input[i] / 180;
			let y = RADIUS$1 * Math.log(Math.tan(Math.PI * (+input[i + 1] + 90) / 360));
			if (y > MAX_SAFE_Y) y = MAX_SAFE_Y;
			else if (y < -MAX_SAFE_Y) y = -MAX_SAFE_Y;
			output[i + 1] = y;
		}
		return output;
	}
	/**
	* Transformation from EPSG:3857 to EPSG:4326.
	*
	* @param {Array<number>} input Input array of coordinate values.
	* @param {Array<number>} [output] Output array of coordinate values.
	* @param {number} [dimension] Dimension (default is `2`).
	* @param {number} [stride] Stride (default is `dimension`).
	* @return {Array<number>} Output array of coordinate values.
	*/
	function toEPSG4326(input, output, dimension, stride) {
		const length = input.length;
		dimension = dimension > 1 ? dimension : 2;
		stride = stride ?? dimension;
		if (output === void 0) if (dimension > 2) output = input.slice();
		else output = new Array(length);
		for (let i = 0; i < length; i += stride) {
			output[i] = 180 * input[i] / HALF_SIZE;
			output[i + 1] = 360 * Math.atan(Math.exp(input[i + 1] / RADIUS$1)) / Math.PI - 90;
		}
		return output;
	}
	//#endregion
	//#region src/ol/proj/epsg4326.js
	/**
	* @module ol/proj/epsg4326
	*/
	/**
	* Semi-major radius of the WGS84 ellipsoid.
	*
	* @const
	* @type {number}
	*/
	const RADIUS = 6378137;
	/**
	* Extent of the EPSG:4326 projection which is the whole world.
	*
	* @const
	* @type {import("../extent.js").Extent}
	*/
	const EXTENT = [
		-180,
		-90,
		180,
		90
	];
	/**
	* @const
	* @type {number}
	*/
	const METERS_PER_UNIT = Math.PI * RADIUS / 180;
	/**
	* @classdesc
	* Projection object for WGS84 geographic coordinates (EPSG:4326).
	*
	* Note that OpenLayers does not strictly comply with the EPSG definition.
	* The EPSG registry defines 4326 as a CRS for Latitude,Longitude (y,x).
	* OpenLayers treats EPSG:4326 as a pseudo-projection, with x,y coordinates.
	*/
	var EPSG4326Projection = class extends Projection {
		/**
		* @param {string} code Code.
		* @param {string} [axisOrientation] Axis orientation.
		*/
		constructor(code, axisOrientation) {
			super({
				code,
				units: "degrees",
				extent: EXTENT,
				axisOrientation,
				global: true,
				metersPerUnit: METERS_PER_UNIT,
				worldExtent: EXTENT
			});
		}
	};
	/**
	* Projections equal to EPSG:4326.
	*
	* @const
	* @type {Array<import("./Projection.js").default>}
	*/
	const PROJECTIONS = [
		new EPSG4326Projection("CRS:84"),
		new EPSG4326Projection("EPSG:4326", "neu"),
		new EPSG4326Projection("urn:ogc:def:crs:OGC:1.3:CRS84"),
		new EPSG4326Projection("urn:ogc:def:crs:OGC:2:84"),
		new EPSG4326Projection("http://www.opengis.net/def/crs/OGC/1.3/CRS84"),
		new EPSG4326Projection("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"),
		new EPSG4326Projection("http://www.opengis.net/def/crs/EPSG/0/4326", "neu")
	];
	//#endregion
	//#region src/ol/proj/projections.js
	/**
	* @module ol/proj/projections
	*/
	/**
	* @type {Object<string, import("./Projection.js").default>}
	*/
	let cache$1 = {};
	/**
	* Get a cached projection by code.
	* @param {string} code The code for the projection.
	* @return {import("./Projection.js").default|null} The projection (if cached).
	*/
	function get$3(code) {
		return cache$1[code] || cache$1[code.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, "EPSG:$3")] || null;
	}
	/**
	* Add a projection to the cache.
	* @param {string} code The projection code.
	* @param {import("./Projection.js").default} projection The projection to cache.
	*/
	function add$1(code, projection) {
		cache$1[code] = projection;
	}
	//#endregion
	//#region src/ol/proj/transforms.js
	/**
	* @private
	* @type {!Object<string, Object<string, import("../proj.js").TransformFunction>>}
	*/
	let transforms = {};
	/**
	* Registers a conversion function to convert coordinates from the source
	* projection to the destination projection.
	*
	* @param {import("./Projection.js").default} source Source.
	* @param {import("./Projection.js").default} destination Destination.
	* @param {import("../proj.js").TransformFunction} transformFn Transform.
	*/
	function add(source, destination, transformFn) {
		const sourceCode = source.getCode();
		const destinationCode = destination.getCode();
		if (!(sourceCode in transforms)) transforms[sourceCode] = {};
		transforms[sourceCode][destinationCode] = transformFn;
	}
	/**
	* Get a transform given a source code and a destination code.
	* @param {string} sourceCode The code for the source projection.
	* @param {string} destinationCode The code for the destination projection.
	* @return {import("../proj.js").TransformFunction|null} The transform function (if found).
	*/
	function get$2(sourceCode, destinationCode) {
		if (sourceCode in transforms && destinationCode in transforms[sourceCode]) return transforms[sourceCode][destinationCode];
		return null;
	}
	//#endregion
	//#region src/ol/proj/utm.js
	/**
	* @module ol/proj/utm
	*/
	/**
	* Adapted from https://github.com/Turbo87/utm
	* Copyright (c) 2012-2017 Tobias Bieniek
	*
	* The functions here provide approximate transforms to and from UTM.
	* They are not appropriate for use beyond the validity extend of a UTM
	* zone, and the accuracy of the transform decreases toward the zone
	* edges.
	*/
	/**
	* @typedef {Object} UTMZone
	* @property {number} number The zone number (1 - 60).
	* @property {boolean} north The northern hemisphere.
	*/
	const K0 = .9996;
	const E = .00669438;
	const E2 = E * E;
	const E3 = E2 * E;
	const E_P2 = E / (1 - E);
	const SQRT_E = Math.sqrt(1 - E);
	const _E = (1 - SQRT_E) / (1 + SQRT_E);
	const _E2 = _E * _E;
	const _E3 = _E2 * _E;
	const _E4 = _E3 * _E;
	const _E5 = _E4 * _E;
	const M1 = 1 - E / 4 - 3 * E2 / 64 - 5 * E3 / 256;
	const M2 = .002514607064228144;
	const M3 = 26390466021299826e-22;
	const M4 = 35 * E3 / 3072;
	const P2 = 3 / 2 * _E - 27 / 32 * _E3 + 269 / 512 * _E5;
	const P3 = 21 / 16 * _E2 - 55 / 32 * _E4;
	const P4 = 151 / 96 * _E3 - 417 / 128 * _E5;
	const P5 = 1097 / 512 * _E4;
	const R = 6378137;
	/**
	* @param {number} easting Easting value of coordinate.
	* @param {number} northing Northing value of coordinate.
	* @param {UTMZone} zone The UTM zone.
	* @return {import("../coordinate.js").Coordinate} The transformed coordinate.
	*/
	function toLonLat(easting, northing, zone) {
		const x = easting - 5e5;
		const mu = (zone.north ? northing : northing - 1e7) / K0 / (R * M1);
		const pRad = mu + P2 * Math.sin(2 * mu) + P3 * Math.sin(4 * mu) + P4 * Math.sin(6 * mu) + P5 * Math.sin(8 * mu);
		const pSin = Math.sin(pRad);
		const pSin2 = pSin * pSin;
		const pCos = Math.cos(pRad);
		const pTan = pSin / pCos;
		const pTan2 = pTan * pTan;
		const pTan4 = pTan2 * pTan2;
		const epSin = 1 - E * pSin2;
		const epSinSqrt = Math.sqrt(1 - E * pSin2);
		const n = R / epSinSqrt;
		const r = (1 - E) / epSin;
		const c = E_P2 * pCos ** 2;
		const c2 = c * c;
		const d = x / (n * K0);
		const d2 = d * d;
		const d3 = d2 * d;
		const d4 = d3 * d;
		const d5 = d4 * d;
		const d6 = d5 * d;
		const latitude = pRad - pTan / r * (d2 / 2 - d4 / 24 * (5 + 3 * pTan2 + 10 * c - 4 * c2 - 9 * E_P2)) + d6 / 720 * (61 + 90 * pTan2 + 298 * c + 45 * pTan4 - 252 * E_P2 - 3 * c2);
		let longitude = (d - d3 / 6 * (1 + 2 * pTan2 + c) + d5 / 120 * (5 - 2 * c + 28 * pTan2 - 3 * c2 + 8 * E_P2 + 24 * pTan4)) / pCos;
		longitude = wrap(longitude + toRadians(zoneToCentralLongitude(zone.number)), -Math.PI, Math.PI);
		return [toDegrees(longitude), toDegrees(latitude)];
	}
	const MIN_LATITUDE = -80;
	const MAX_LATITUDE = 84;
	const MIN_LONGITUDE = -180;
	const MAX_LONGITUDE = 180;
	/**
	* @param {number} longitude The longitude.
	* @param {number} latitude The latitude.
	* @param {UTMZone} zone The UTM zone.
	* @return {import('../coordinate.js').Coordinate} The UTM coordinate.
	*/
	function fromLonLat(longitude, latitude, zone) {
		longitude = wrap(longitude, MIN_LONGITUDE, MAX_LONGITUDE);
		if (latitude < MIN_LATITUDE) latitude = MIN_LATITUDE;
		else if (latitude > MAX_LATITUDE) latitude = MAX_LATITUDE;
		const latRad = toRadians(latitude);
		const latSin = Math.sin(latRad);
		const latCos = Math.cos(latRad);
		const latTan = latSin / latCos;
		const latTan2 = latTan * latTan;
		const latTan4 = latTan2 * latTan2;
		const lonRad = toRadians(longitude);
		const centralLonRad = toRadians(zoneToCentralLongitude(zone.number));
		const n = R / Math.sqrt(1 - E * latSin ** 2);
		const c = E_P2 * latCos ** 2;
		const a = latCos * wrap(lonRad - centralLonRad, -Math.PI, Math.PI);
		const a2 = a * a;
		const a3 = a2 * a;
		const a4 = a3 * a;
		const a5 = a4 * a;
		const a6 = a5 * a;
		const m = R * (M1 * latRad - M2 * Math.sin(2 * latRad) + M3 * Math.sin(4 * latRad) - M4 * Math.sin(6 * latRad));
		const easting = K0 * n * (a + a3 / 6 * (1 - latTan2 + c) + a5 / 120 * (5 - 18 * latTan2 + latTan4 + 72 * c - 58 * E_P2)) + 5e5;
		let northing = K0 * (m + n * latTan * (a2 / 2 + a4 / 24 * (5 - latTan2 + 9 * c + 4 * c ** 2) + a6 / 720 * (61 - 58 * latTan2 + latTan4 + 600 * c - 330 * E_P2)));
		if (!zone.north) northing += 1e7;
		return [easting, northing];
	}
	/**
	* @param {number} zone The zone number.
	* @return {number} The central longitude in degrees.
	*/
	function zoneToCentralLongitude(zone) {
		return (zone - 1) * 6 - 180 + 3;
	}
	/**
	* @type {Array<RegExp>}
	*/
	const epsgRegExes = [
		/^EPSG:(\d+)$/,
		/^urn:ogc:def:crs:EPSG::(\d+)$/,
		/^http:\/\/www\.opengis\.net\/def\/crs\/EPSG\/0\/(\d+)$/
	];
	/**
	* @param {string} code The projection code.
	* @return {UTMZone|null} The UTM zone info (or null if not UTM).
	*/
	function zoneFromCode(code) {
		let epsgId = 0;
		for (const re of epsgRegExes) {
			const match = code.match(re);
			if (match) {
				epsgId = parseInt(match[1]);
				break;
			}
		}
		if (!epsgId) return null;
		let number = 0;
		let north = false;
		if (epsgId > 32700 && epsgId < 32761) number = epsgId - 32700;
		else if (epsgId > 32600 && epsgId < 32661) {
			north = true;
			number = epsgId - 32600;
		}
		if (!number) return null;
		return {
			number,
			north
		};
	}
	/**
	* @param {function(number, number, UTMZone): import('../coordinate.js').Coordinate} transformer The transformer.
	* @param {UTMZone} zone The UTM zone.
	* @return {import('../proj.js').TransformFunction} The transform function.
	*/
	function makeTransformFunction(transformer, zone) {
		return function(input, output, dimension, stride) {
			const length = input.length;
			dimension = dimension > 1 ? dimension : 2;
			stride = stride ?? dimension;
			if (!output) if (dimension > 2) output = input.slice();
			else output = new Array(length);
			for (let i = 0; i < length; i += stride) {
				const x = input[i];
				const y = input[i + 1];
				const coord = transformer(x, y, zone);
				output[i] = coord[0];
				output[i + 1] = coord[1];
			}
			return output;
		};
	}
	/**
	* @param {string} code The projection code.
	* @return {import('./Projection.js').default|null} A projection or null if unable to create one.
	*/
	function makeProjection(code) {
		if (!zoneFromCode(code)) return null;
		return new Projection({
			code,
			units: "m"
		});
	}
	/**
	* @param {import('./Projection.js').default} projection The projection.
	* @return {import('../proj.js').Transforms|null} The transforms lookup or null if unable to handle projection.
	*/
	function makeTransforms(projection) {
		const zone = zoneFromCode(projection.getCode());
		if (!zone) return null;
		return {
			forward: makeTransformFunction(fromLonLat, zone),
			inverse: makeTransformFunction(toLonLat, zone)
		};
	}
	//#endregion
	//#region src/ol/proj.js
	/**
	* @module ol/proj
	*/
	/**
	* The ol/proj module stores:
	* a list of {@link module:ol/proj/Projection~Projection}
	* objects, one for each projection supported by the application
	* a list of transform functions needed to convert coordinates in one projection
	* into another.
	*
	* The static functions are the methods used to maintain these.
	* Each transform function can handle not only simple coordinate pairs, but also
	* large arrays of coordinates such as vector geometries.
	*
	* When loaded, the library adds projection objects for EPSG:4326 (WGS84
	* geographic coordinates) and EPSG:3857 (Web or Spherical Mercator, as used
	* for example by Bing Maps or OpenStreetMap), together with the relevant
	* transform functions.
	*
	* Additional transforms may be added by using the http://proj4js.org/
	* library (version 2.2 or later). You can use the full build supplied by
	* Proj4js, or create a custom build to support those projections you need; see
	* the Proj4js website for how to do this. You also need the Proj4js definitions
	* for the required projections. These definitions can be obtained from
	* https://spatialreference.org/, and are a JS function, so can be loaded in a
	* script tag (as in the examples) or pasted into your application.
	*
	* After all required projection definitions are added to proj4's registry (by
	* using `proj4.defs()`), simply call `register(proj4)` from the `ol/proj/proj4`
	* package. Existing transforms are not changed by this function. See
	* examples/wms-image-custom-proj for an example of this.
	*
	* Additional projection definitions can be registered with `proj4.defs()` any
	* time. Just make sure to call `register(proj4)` again; for example, with user-supplied data where you don't
	* know in advance what projections are needed, you can initially load minimal
	* support and then load whichever are requested.
	*
	* Note that Proj4js does not support projection extents. If you want to add
	* one for creating default tile grids, you can add it after the Projection
	* object has been created with `setExtent`, for example,
	* `get('EPSG:1234').setExtent(extent)`.
	*
	* In addition to Proj4js support, any transform functions can be added with
	* {@link module:ol/proj.addCoordinateTransforms}. To use this, you must first create
	* a {@link module:ol/proj/Projection~Projection} object for the new projection and add it with
	* {@link module:ol/proj.addProjection}. You can then add the forward and inverse
	* functions with {@link module:ol/proj.addCoordinateTransforms}. See
	* examples/wms-custom-proj for an example of this.
	*
	* Note that if no transforms are needed and you only need to define the
	* projection, just add a {@link module:ol/proj/Projection~Projection} with
	* {@link module:ol/proj.addProjection}. See examples/wms-no-proj for an example of
	* this.
	*/
	/**
	* A projection as {@link module:ol/proj/Projection~Projection}, SRS identifier
	* string or undefined.
	* @typedef {Projection|string|undefined} ProjectionLike
	* @api
	*/
	/**
	* @typedef {Object} Transforms
	* @property {TransformFunction} forward The forward transform (from geographic).
	* @property {TransformFunction} inverse The inverse transform (to geographic).
	*/
	/**
	* @type {Array<function(Projection): Transforms|null>}
	*/
	const transformFactories = [makeTransforms];
	/**
	* @type {Array<function(string): Projection|null>}
	*/
	const projectionFactories = [makeProjection];
	let showCoordinateWarning = true;
	/**
	* @param {boolean} [disable] Disable console info about `useGeographic()`
	*/
	function disableCoordinateWarning(disable) {
		showCoordinateWarning = !(disable === void 0 ? true : disable);
	}
	/**
	* @param {Array<number>} input Input coordinate array.
	* @param {Array<number>} [output] Output array of coordinate values.
	* @return {Array<number>} Output coordinate array (new array, same coordinate
	*     values).
	*/
	function cloneTransform(input, output) {
		if (output !== void 0) {
			for (let i = 0, ii = input.length; i < ii; ++i) output[i] = input[i];
			output = output;
		} else output = input.slice();
		return output;
	}
	/**
	* Add a Projection object to the list of supported projections that can be
	* looked up by their code.
	*
	* @param {Projection} projection Projection instance.
	* @api
	*/
	function addProjection(projection) {
		add$1(projection.getCode(), projection);
		add(projection, projection, cloneTransform);
	}
	/**
	* @param {Array<Projection>} projections Projections.
	*/
	function addProjections(projections) {
		projections.forEach(addProjection);
	}
	/**
	* Fetches a Projection object for the code specified.
	*
	* @param {ProjectionLike} projectionLike Either a code string which is
	*     a combination of authority and identifier such as "EPSG:4326", or an
	*     existing projection object, or undefined.
	* @return {Projection|null} Projection object, or null if not in list.
	* @api
	*/
	function get$1(projectionLike) {
		if (!(typeof projectionLike === "string")) return projectionLike;
		const projection = get$3(projectionLike);
		if (projection) return projection;
		for (const makeProjection of projectionFactories) {
			const projection = makeProjection(projectionLike);
			if (projection) return projection;
		}
		return null;
	}
	/**
	* Get the resolution of the point in degrees or distance units.
	* For projections with degrees as the unit this will simply return the
	* provided resolution. For other projections the point resolution is
	* by default estimated by transforming the `point` pixel to EPSG:4326,
	* measuring its width and height on the normal sphere,
	* and taking the average of the width and height.
	* A custom function can be provided for a specific projection, either
	* by setting the `getPointResolution` option in the
	* {@link module:ol/proj/Projection~Projection} constructor or by using
	* {@link module:ol/proj/Projection~Projection#setGetPointResolution} to change an existing
	* projection object.
	* @param {ProjectionLike} projection The projection.
	* @param {number} resolution Nominal resolution in projection units.
	* @param {import("./coordinate.js").Coordinate} point Point to find adjusted resolution at.
	* @param {import("./proj/Units.js").Units} [units] Units to get the point resolution in.
	* Default is the projection's units.
	* @return {number} Point resolution.
	* @api
	*/
	function getPointResolution(projection, resolution, point, units) {
		projection = get$1(projection);
		let pointResolution;
		const getter = projection.getPointResolutionFunc();
		if (getter) {
			pointResolution = getter(resolution, point);
			if (units && units !== projection.getUnits()) {
				const metersPerUnit = projection.getMetersPerUnit();
				if (metersPerUnit) pointResolution = pointResolution * metersPerUnit / METERS_PER_UNIT$1[units];
			}
		} else {
			const projUnits = projection.getUnits();
			if (projUnits == "degrees" && !units || units == "degrees") pointResolution = resolution;
			else {
				const toEPSG4326 = getTransformFromProjections(projection, get$1("EPSG:4326"));
				if (!toEPSG4326 && projUnits !== "degrees") pointResolution = resolution * projection.getMetersPerUnit();
				else {
					let vertices = [
						point[0] - resolution / 2,
						point[1],
						point[0] + resolution / 2,
						point[1],
						point[0],
						point[1] - resolution / 2,
						point[0],
						point[1] + resolution / 2
					];
					vertices = toEPSG4326(vertices, vertices, 2);
					pointResolution = (getDistance(vertices.slice(0, 2), vertices.slice(2, 4)) + getDistance(vertices.slice(4, 6), vertices.slice(6, 8))) / 2;
				}
				const metersPerUnit = units ? METERS_PER_UNIT$1[units] : projection.getMetersPerUnit();
				if (metersPerUnit !== void 0) pointResolution /= metersPerUnit;
			}
		}
		return pointResolution;
	}
	/**
	* Registers transformation functions that don't alter coordinates. Those allow
	* to transform between projections with equal meaning.
	*
	* @param {Array<Projection>} projections Projections.
	* @api
	*/
	function addEquivalentProjections(projections) {
		addProjections(projections);
		projections.forEach(function(source) {
			projections.forEach(function(destination) {
				if (source !== destination) add(source, destination, cloneTransform);
			});
		});
	}
	/**
	* Registers transformation functions to convert coordinates in any projection
	* in projection1 to any projection in projection2.
	*
	* @param {Array<Projection>} projections1 Projections with equal
	*     meaning.
	* @param {Array<Projection>} projections2 Projections with equal
	*     meaning.
	* @param {TransformFunction} forwardTransform Transformation from any
	*   projection in projection1 to any projection in projection2.
	* @param {TransformFunction} inverseTransform Transform from any projection
	*   in projection2 to any projection in projection1..
	*/
	function addEquivalentTransforms(projections1, projections2, forwardTransform, inverseTransform) {
		projections1.forEach(function(projection1) {
			projections2.forEach(function(projection2) {
				add(projection1, projection2, forwardTransform);
				add(projection2, projection1, inverseTransform);
			});
		});
	}
	/**
	* @param {Projection|string|undefined} projection Projection.
	* @param {string} defaultCode Default code.
	* @return {Projection} Projection.
	*/
	function createProjection(projection, defaultCode) {
		if (!projection) return get$1(defaultCode);
		if (typeof projection === "string") return get$1(projection);
		return projection;
	}
	/**
	* Creates a {@link module:ol/proj~TransformFunction} from a simple 2D coordinate transform
	* function.
	* @param {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} coordTransform Coordinate
	*     transform.
	* @return {TransformFunction} Transform function.
	*/
	function createTransformFromCoordinateTransform(coordTransform) {
		return (
		/**
		* @param {Array<number>} input Input.
		* @param {Array<number>} [output] Output.
		* @param {number} [dimension] Dimensions that should be transformed.
		* @param {number} [stride] Stride.
		* @return {Array<number>} Output.
		*/
function(input, output, dimension, stride) {
			const length = input.length;
			dimension = dimension !== void 0 ? dimension : 2;
			stride = stride ?? dimension;
			output = output !== void 0 ? output : new Array(length);
			for (let i = 0; i < length; i += stride) {
				const point = coordTransform(input.slice(i, i + dimension));
				const pointLength = point.length;
				for (let j = 0, jj = stride; j < jj; ++j) output[i + j] = j >= pointLength ? input[i + j] : point[j];
			}
			return output;
		});
	}
	/**
	* Checks if two projections are the same, that is every coordinate in one
	* projection does represent the same geographic point as the same coordinate in
	* the other projection.
	*
	* @param {Projection} projection1 Projection 1.
	* @param {Projection} projection2 Projection 2.
	* @return {boolean} Equivalent.
	* @api
	*/
	function equivalent$1(projection1, projection2) {
		if (projection1 === projection2) return true;
		const equalUnits = projection1.getUnits() === projection2.getUnits();
		if (projection1.getCode() === projection2.getCode()) return equalUnits;
		return getTransformFromProjections(projection1, projection2) === cloneTransform && equalUnits;
	}
	/**
	* Searches in the list of transform functions for the function for converting
	* coordinates from the source projection to the destination projection.
	*
	* @param {Projection} source Source Projection object.
	* @param {Projection} destination Destination Projection
	*     object.
	* @return {TransformFunction|null} Transform function.
	*/
	function getTransformFromProjections(source, destination) {
		const sourceCode = source.getCode();
		const destinationCode = destination.getCode();
		let transformFunc = get$2(sourceCode, destinationCode);
		if (transformFunc) return transformFunc;
		/**
		* @type {Transforms|null}
		*/
		let sourceTransforms = null;
		/**
		* @type {Transforms|null}
		*/
		let destinationTransforms = null;
		for (const makeTransforms of transformFactories) {
			if (!sourceTransforms) sourceTransforms = makeTransforms(source);
			if (!destinationTransforms) destinationTransforms = makeTransforms(destination);
		}
		if (!sourceTransforms && !destinationTransforms) return null;
		const intermediateCode = "EPSG:4326";
		if (!destinationTransforms) {
			const toDestination = get$2(intermediateCode, destinationCode);
			if (toDestination) transformFunc = composeTransformFuncs(sourceTransforms.inverse, toDestination);
		} else if (!sourceTransforms) {
			const fromSource = get$2(sourceCode, intermediateCode);
			if (fromSource) transformFunc = composeTransformFuncs(fromSource, destinationTransforms.forward);
		} else transformFunc = composeTransformFuncs(sourceTransforms.inverse, destinationTransforms.forward);
		if (transformFunc) {
			addProjection(source);
			addProjection(destination);
			add(source, destination, transformFunc);
		}
		return transformFunc;
	}
	/**
	* @param {TransformFunction} t1 The first transform function.
	* @param {TransformFunction} t2 The second transform function.
	* @return {TransformFunction} The composed transform function.
	*/
	function composeTransformFuncs(t1, t2) {
		return function(input, output, dimensions, stride) {
			output = t1(input, output, dimensions, stride);
			return t2(output, output, dimensions, stride);
		};
	}
	/**
	* Given the projection-like objects, searches for a transformation
	* function to convert a coordinates array from the source projection to the
	* destination projection.
	*
	* @param {ProjectionLike} source Source.
	* @param {ProjectionLike} destination Destination.
	* @return {TransformFunction} Transform function.
	* @api
	*/
	function getTransform(source, destination) {
		return getTransformFromProjections(get$1(source), get$1(destination));
	}
	/**
	* Transforms a coordinate from source projection to destination projection.
	* This returns a new coordinate (and does not modify the original). If there
	* is no available transform between the two projection, the function will throw
	* an error.
	*
	* See {@link module:ol/proj.transformExtent} for extent transformation.
	* See the transform method of {@link module:ol/geom/Geometry~Geometry} and its
	* subclasses for geometry transforms.
	*
	* @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
	* @param {ProjectionLike} source Source projection-like.
	* @param {ProjectionLike} destination Destination projection-like.
	* @return {import("./coordinate.js").Coordinate} Coordinate.
	* @api
	*/
	function transform(coordinate, source, destination) {
		const transformFunc = getTransform(source, destination);
		if (!transformFunc) {
			const sourceCode = get$1(source).getCode();
			const destinationCode = get$1(destination).getCode();
			throw new Error(`No transform available between ${sourceCode} and ${destinationCode}`);
		}
		return transformFunc(coordinate, void 0, coordinate.length);
	}
	/**
	* @type {Projection|null}
	*/
	let userProjection = null;
	/**
	* Get the projection for coordinates supplied from and returned by API methods.
	* @return {Projection|null} The user projection (or null if not set).
	* @api
	*/
	function getUserProjection() {
		return userProjection;
	}
	/**
	* Return a coordinate transformed into the user projection.  If no user projection
	* is set, the original coordinate is returned.
	* @param {Array<number>} coordinate Input coordinate.
	* @param {ProjectionLike} sourceProjection The input coordinate projection.
	* @return {Array<number>} The input coordinate in the user projection.
	*/
	function toUserCoordinate(coordinate, sourceProjection) {
		return coordinate;
	}
	/**
	* Return a coordinate transformed from the user projection.  If no user projection
	* is set, the original coordinate is returned.
	* @param {Array<number>} coordinate Input coordinate.
	* @param {ProjectionLike} destProjection The destination projection.
	* @return {Array<number>} The input coordinate transformed.
	*/
	function fromUserCoordinate(coordinate, destProjection) {
		if (showCoordinateWarning && !equals(coordinate, [0, 0]) && coordinate[0] >= -180 && coordinate[0] <= 180 && coordinate[1] >= -90 && coordinate[1] <= 90) {
			showCoordinateWarning = false;
			warn("Call useGeographic() from ol/proj once to work with [longitude, latitude] coordinates.");
		}
		return coordinate;
	}
	/**
	* Return an extent transformed into the user projection.  If no user projection
	* is set, the original extent is returned.
	* @param {import("./extent.js").Extent} extent Input extent.
	* @param {ProjectionLike} sourceProjection The input extent projection.
	* @return {import("./extent.js").Extent} The input extent in the user projection.
	*/
	function toUserExtent(extent, sourceProjection) {
		return extent;
	}
	/**
	* Return an extent transformed from the user projection.  If no user projection
	* is set, the original extent is returned.
	* @param {import("./extent.js").Extent} extent Input extent.
	* @param {ProjectionLike} destProjection The destination projection.
	* @return {import("./extent.js").Extent} The input extent transformed.
	*/
	function fromUserExtent(extent, destProjection) {
		return extent;
	}
	/**
	* Add transforms to and from EPSG:4326 and EPSG:3857.  This function is called
	* by when this module is executed and should only need to be called again after
	* `clearAllProjections()` is called (e.g. in tests).
	*/
	function addCommon() {
		addEquivalentProjections(PROJECTIONS$1);
		addEquivalentProjections(PROJECTIONS);
		addEquivalentTransforms(PROJECTIONS, PROJECTIONS$1, fromEPSG4326, toEPSG4326);
	}
	addCommon();
	//#endregion
	//#region src/ol/transform.js
	/**
	* @module ol/transform
	*/
	/**
	* An array representing an affine 2d transformation for use with
	* {@link module:ol/transform} functions. The array has 6 elements.
	* @typedef {!Array<number>} Transform
	* @api
	*/
	/**
	* Collection of affine 2d transformation functions. The functions work on an
	* array of 6 elements. The element order is compatible with the [SVGMatrix
	* interface](https://developer.mozilla.org/en-US/docs/Web/API/SVGMatrix) and is
	* a subset (elements a to f) of a 3×3 matrix:
	* ```
	* [ a c e ]
	* [ b d f ]
	* [ 0 0 1 ]
	* ```
	*/
	/** @type {Transform} */
	const IDENTITY_TRANSFORM = [
		1,
		0,
		0,
		1,
		0,
		0
	];
	new Array(6);
	/**
	* Create an identity transform.
	* @return {!Transform} Identity transform.
	*/
	function create() {
		return IDENTITY_TRANSFORM.slice(0);
	}
	/**
	* Transforms the given coordinate with the given transform returning the
	* resulting, transformed coordinate. The coordinate will be modified in-place.
	*
	* @param {Transform} transform The transformation.
	* @param {import("./coordinate.js").Coordinate|import("./pixel.js").Pixel} coordinate The coordinate to transform.
	* @return {import("./coordinate.js").Coordinate|import("./pixel.js").Pixel} return coordinate so that operations can be
	*     chained together.
	*/
	function apply(transform, coordinate) {
		const x = coordinate[0];
		const y = coordinate[1];
		coordinate[0] = transform[0] * x + transform[2] * y + transform[4];
		coordinate[1] = transform[1] * x + transform[3] * y + transform[5];
		return coordinate;
	}
	/**
	* Creates a composite transform given an initial translation, scale, rotation, and
	* final translation (in that order only, not commutative).
	* @param {!Transform} transform The transform (will be modified in place).
	* @param {number} dx1 Initial translation x.
	* @param {number} dy1 Initial translation y.
	* @param {number} sx Scale factor x.
	* @param {number} sy Scale factor y.
	* @param {number} angle Rotation (in counter-clockwise radians).
	* @param {number} dx2 Final translation x.
	* @param {number} dy2 Final translation y.
	* @return {!Transform} The composite transform.
	*/
	function compose(transform, dx1, dy1, sx, sy, angle, dx2, dy2) {
		const sin = Math.sin(angle);
		const cos = Math.cos(angle);
		transform[0] = sx * cos;
		transform[1] = sy * sin;
		transform[2] = -sx * sin;
		transform[3] = sy * cos;
		transform[4] = dx2 * sx * cos - dy2 * sx * sin + dx1;
		transform[5] = dx2 * sy * sin + dy2 * sy * cos + dy1;
		return transform;
	}
	/**
	* Invert the given transform.
	* @param {!Transform} target Transform to be set as the inverse of
	*     the source transform.
	* @param {!Transform} source The source transform to invert.
	* @return {!Transform} The inverted (target) transform.
	*/
	function makeInverse(target, source) {
		const det = determinant(source);
		assert(det !== 0, "Transformation matrix cannot be inverted");
		const a = source[0];
		const b = source[1];
		const c = source[2];
		const d = source[3];
		const e = source[4];
		const f = source[5];
		target[0] = d / det;
		target[1] = -b / det;
		target[2] = -c / det;
		target[3] = a / det;
		target[4] = (c * f - d * e) / det;
		target[5] = -(a * f - b * e) / det;
		return target;
	}
	/**
	* Returns the determinant of the given matrix.
	* @param {!Transform} mat Matrix.
	* @return {number} Determinant.
	*/
	function determinant(mat) {
		return mat[0] * mat[3] - mat[1] * mat[2];
	}
	/**
	* @type {Array}
	*/
	const matrixPrecision = [
		1e5,
		1e5,
		1e5,
		1e5,
		2,
		2
	];
	/**
	* A matrix string version of the transform.  This can be used
	* for CSS transforms.
	* @param {!Transform} mat Matrix.
	* @return {string} The transform as a string.
	*/
	function toString$1(mat) {
		return "matrix(" + mat.join(", ") + ")";
	}
	/**
	* Create a transform from a CSS transform matrix string.
	* @param {string} cssTransform The CSS string to parse.
	* @return {!Transform} The transform.
	*/
	function fromString$1(cssTransform) {
		return cssTransform.substring(7, cssTransform.length - 1).split(",").map(parseFloat);
	}
	/**
	* Compare two matrices for equality.
	* @param {!string} cssTransform1 A CSS transform matrix string.
	* @param {!string} cssTransform2 A CSS transform matrix string.
	* @return {boolean} The two matrices are equal.
	*/
	function equivalent(cssTransform1, cssTransform2) {
		const mat1 = fromString$1(cssTransform1);
		const mat2 = fromString$1(cssTransform2);
		for (let i = 0; i < 6; ++i) if (Math.round((mat1[i] - mat2[i]) * matrixPrecision[i]) !== 0) return false;
		return true;
	}
	//#endregion
	//#region src/ol/geom/flat/transform.js
	/**
	* @module ol/geom/flat/transform
	*/
	/**
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {number} end End.
	* @param {number} stride Stride.
	* @param {import("../../transform.js").Transform} transform Transform.
	* @param {Array<number>} [dest] Destination.
	* @param {number} [destinationStride] Stride of destination coordinates; if unspecified, assumed to be 2.
	* @return {Array<number>} Transformed coordinates.
	*/
	function transform2D(flatCoordinates, offset, end, stride, transform, dest, destinationStride) {
		dest = dest ? dest : [];
		destinationStride = destinationStride ? destinationStride : 2;
		let i = 0;
		for (let j = offset; j < end; j += stride) {
			const x = flatCoordinates[j];
			const y = flatCoordinates[j + 1];
			dest[i++] = transform[0] * x + transform[2] * y + transform[4];
			dest[i++] = transform[1] * x + transform[3] * y + transform[5];
			for (let k = 2; k < destinationStride; k++) dest[i++] = flatCoordinates[j + k];
		}
		if (dest && dest.length != i) dest.length = i;
		return dest;
	}
	/**
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {number} end End.
	* @param {number} stride Stride.
	* @param {number} angle Angle.
	* @param {Array<number>} anchor Rotation anchor point.
	* @param {Array<number>} [dest] Destination.
	* @return {Array<number>} Transformed coordinates.
	*/
	function rotate(flatCoordinates, offset, end, stride, angle, anchor, dest) {
		dest = dest ? dest : [];
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		const anchorX = anchor[0];
		const anchorY = anchor[1];
		let i = 0;
		for (let j = offset; j < end; j += stride) {
			const deltaX = flatCoordinates[j] - anchorX;
			const deltaY = flatCoordinates[j + 1] - anchorY;
			dest[i++] = anchorX + deltaX * cos - deltaY * sin;
			dest[i++] = anchorY + deltaX * sin + deltaY * cos;
			for (let k = j + 2; k < j + stride; ++k) dest[i++] = flatCoordinates[k];
		}
		if (dest && dest.length != i) dest.length = i;
		return dest;
	}
	/**
	* Scale the coordinates.
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {number} end End.
	* @param {number} stride Stride.
	* @param {number} sx Scale factor in the x-direction.
	* @param {number} sy Scale factor in the y-direction.
	* @param {Array<number>} anchor Scale anchor point.
	* @param {Array<number>} [dest] Destination.
	* @return {Array<number>} Transformed coordinates.
	*/
	function scale$1(flatCoordinates, offset, end, stride, sx, sy, anchor, dest) {
		dest = dest ? dest : [];
		const anchorX = anchor[0];
		const anchorY = anchor[1];
		let i = 0;
		for (let j = offset; j < end; j += stride) {
			const deltaX = flatCoordinates[j] - anchorX;
			const deltaY = flatCoordinates[j + 1] - anchorY;
			dest[i++] = anchorX + sx * deltaX;
			dest[i++] = anchorY + sy * deltaY;
			for (let k = j + 2; k < j + stride; ++k) dest[i++] = flatCoordinates[k];
		}
		if (dest && dest.length != i) dest.length = i;
		return dest;
	}
	/**
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {number} end End.
	* @param {number} stride Stride.
	* @param {number} deltaX Delta X.
	* @param {number} deltaY Delta Y.
	* @param {Array<number>} [dest] Destination.
	* @return {Array<number>} Transformed coordinates.
	*/
	function translate(flatCoordinates, offset, end, stride, deltaX, deltaY, dest) {
		dest = dest ? dest : [];
		let i = 0;
		for (let j = offset; j < end; j += stride) {
			dest[i++] = flatCoordinates[j] + deltaX;
			dest[i++] = flatCoordinates[j + 1] + deltaY;
			for (let k = j + 2; k < j + stride; ++k) dest[i++] = flatCoordinates[k];
		}
		if (dest && dest.length != i) dest.length = i;
		return dest;
	}
	//#endregion
	//#region src/ol/geom/Geometry.js
	/**
	* @module ol/geom/Geometry
	*/
	/**
	* @typedef {'XY' | 'XYZ' | 'XYM' | 'XYZM'} GeometryLayout
	* The coordinate layout for geometries, indicating whether a 3rd or 4th z ('Z')
	* or measure ('M') coordinate is available.
	*/
	/**
	* @typedef {'Point' | 'LineString' | 'LinearRing' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon' | 'GeometryCollection' | 'Circle'} Type
	* The geometry type.  One of `'Point'`, `'LineString'`, `'LinearRing'`,
	* `'Polygon'`, `'MultiPoint'`, `'MultiLineString'`, `'MultiPolygon'`,
	* `'GeometryCollection'`, or `'Circle'`.
	*/
	/**
	* @type {import("../transform.js").Transform}
	*/
	const tmpTransform = create();
	/** @type {import('../coordinate.js').Coordinate} */
	const tmpPoint = [NaN, NaN];
	/**
	* @classdesc
	* Abstract base class; normally only used for creating subclasses and not
	* instantiated in apps.
	* Base class for vector geometries.
	*
	* To get notified of changes to the geometry, register a listener for the
	* generic `change` event on your geometry instance.
	*
	* @abstract
	* @api
	*/
	var Geometry = class extends BaseObject {
		constructor() {
			super();
			/**
			* @private
			* @type {import("../extent.js").Extent}
			*/
			this.extent_ = createEmpty();
			/**
			* @private
			* @type {number}
			*/
			this.extentRevision_ = -1;
			/**
			* @protected
			* @type {number}
			*/
			this.simplifiedGeometryMaxMinSquaredTolerance = 0;
			/**
			* @protected
			* @type {number}
			*/
			this.simplifiedGeometryRevision = 0;
			/**
			* Get a transformed and simplified version of the geometry.
			* @abstract
			* @param {number} revision The geometry revision.
			* @param {number} squaredTolerance Squared tolerance.
			* @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
			* @return {Geometry} Simplified geometry.
			*/
			this.simplifyTransformedInternal = memoizeOne((revision, squaredTolerance, transform) => {
				if (!transform) return this.getSimplifiedGeometry(squaredTolerance);
				const clone = this.clone();
				clone.applyTransform(transform);
				return clone.getSimplifiedGeometry(squaredTolerance);
			});
		}
		/**
		* Get a transformed and simplified version of the geometry.
		* @abstract
		* @param {number} squaredTolerance Squared tolerance.
		* @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
		* @return {Geometry} Simplified geometry.
		*/
		simplifyTransformed(squaredTolerance, transform) {
			return this.simplifyTransformedInternal(this.getRevision(), squaredTolerance, transform);
		}
		/**
		* Make a complete copy of the geometry.
		* @abstract
		* @return {!Geometry} Clone.
		*/
		clone() {
			return abstract();
		}
		/**
		* @abstract
		* @param {number} x X.
		* @param {number} y Y.
		* @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
		* @param {number} minSquaredDistance Minimum squared distance.
		* @return {number} Minimum squared distance.
		*/
		closestPointXY(x, y, closestPoint, minSquaredDistance) {
			return abstract();
		}
		/**
		* @param {number} x X.
		* @param {number} y Y.
		* @return {boolean} Contains (x, y).
		*/
		containsXY(x, y) {
			return this.closestPointXY(x, y, tmpPoint, Number.MIN_VALUE) === 0;
		}
		/**
		* Return the closest point of the geometry to the passed point as
		* {@link module:ol/coordinate~Coordinate coordinate}.
		* @param {import("../coordinate.js").Coordinate} point Point.
		* @param {import("../coordinate.js").Coordinate} [closestPoint] Closest point.
		* @return {import("../coordinate.js").Coordinate} Closest point.
		* @api
		*/
		getClosestPoint(point, closestPoint) {
			closestPoint = closestPoint ? closestPoint : [NaN, NaN];
			this.closestPointXY(point[0], point[1], closestPoint, Infinity);
			return closestPoint;
		}
		/**
		* Returns true if this geometry includes the specified coordinate. If the
		* coordinate is on the boundary of the geometry, returns false.
		* @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
		* @return {boolean} Contains coordinate.
		* @api
		*/
		intersectsCoordinate(coordinate) {
			return this.containsXY(coordinate[0], coordinate[1]);
		}
		/**
		* @abstract
		* @param {import("../extent.js").Extent} extent Extent.
		* @protected
		* @return {import("../extent.js").Extent} extent Extent.
		*/
		computeExtent(extent) {
			return abstract();
		}
		/**
		* Get the extent of the geometry.
		* @param {import("../extent.js").Extent} [extent] Extent.
		* @return {import("../extent.js").Extent} extent Extent.
		* @api
		*/
		getExtent(extent) {
			if (this.extentRevision_ != this.getRevision()) {
				const extent = this.computeExtent(this.extent_);
				if (isNaN(extent[0]) || isNaN(extent[1])) createOrUpdateEmpty(extent);
				this.extentRevision_ = this.getRevision();
			}
			return returnOrUpdate(this.extent_, extent);
		}
		/**
		* Rotate the geometry around a given coordinate. This modifies the geometry
		* coordinates in place.
		* @abstract
		* @param {number} angle Rotation angle in radians.
		* @param {import("../coordinate.js").Coordinate} anchor The rotation center.
		* @api
		*/
		rotate(angle, anchor) {
			abstract();
		}
		/**
		* Scale the geometry (with an optional origin).  This modifies the geometry
		* coordinates in place.
		* @abstract
		* @param {number} sx The scaling factor in the x-direction.
		* @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
		* @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
		*     of the geometry extent).
		* @api
		*/
		scale(sx, sy, anchor) {
			abstract();
		}
		/**
		* Create a simplified version of this geometry.  For linestrings, this uses
		* the [Douglas Peucker](https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm)
		* algorithm.  For polygons, a quantization-based
		* simplification is used to preserve topology.
		* @param {number} tolerance The tolerance distance for simplification.
		* @return {Geometry} A new, simplified version of the original geometry.
		* @api
		*/
		simplify(tolerance) {
			return this.getSimplifiedGeometry(tolerance * tolerance);
		}
		/**
		* Create a simplified version of this geometry using the Douglas Peucker
		* algorithm.
		* See https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm.
		* @abstract
		* @param {number} squaredTolerance Squared tolerance.
		* @return {Geometry} Simplified geometry.
		*/
		getSimplifiedGeometry(squaredTolerance) {
			return abstract();
		}
		/**
		* Get the type of this geometry.
		* @abstract
		* @return {Type} Geometry type.
		*/
		getType() {
			return abstract();
		}
		/**
		* Apply a transform function to the coordinates of the geometry.
		* The geometry is modified in place.
		* If you do not want the geometry modified in place, first `clone()` it and
		* then use this function on the clone.
		* @abstract
		* @param {import("../proj.js").TransformFunction} transformFn Transform function.
		* Called with a flat array of geometry coordinates.
		*/
		applyTransform(transformFn) {
			abstract();
		}
		/**
		* Test if the geometry and the passed extent intersect.
		* @abstract
		* @param {import("../extent.js").Extent} extent Extent.
		* @return {boolean} `true` if the geometry and the extent intersect.
		*/
		intersectsExtent(extent) {
			return abstract();
		}
		/**
		* Translate the geometry.  This modifies the geometry coordinates in place.  If
		* instead you want a new geometry, first `clone()` this geometry.
		* @abstract
		* @param {number} deltaX Delta X.
		* @param {number} deltaY Delta Y.
		* @api
		*/
		translate(deltaX, deltaY) {
			abstract();
		}
		/**
		* Transform each coordinate of the geometry from one coordinate reference
		* system to another. The geometry is modified in place.
		* For example, a line will be transformed to a line and a circle to a circle.
		* If you do not want the geometry modified in place, first `clone()` it and
		* then use this function on the clone.
		*
		* @param {import("../proj.js").ProjectionLike} source The current projection.  Can be a
		*     string identifier or a {@link module:ol/proj/Projection~Projection} object.
		* @param {import("../proj.js").ProjectionLike} destination The desired projection.  Can be a
		*     string identifier or a {@link module:ol/proj/Projection~Projection} object.
		* @return {this} This geometry.  Note that original geometry is
		*     modified in place.
		* @api
		*/
		transform(source, destination) {
			/** @type {import("../proj/Projection.js").default} */
			const sourceProj = get$1(source);
			const transformFn = sourceProj.getUnits() == "tile-pixels" ? function(inCoordinates, outCoordinates, stride) {
				const pixelExtent = sourceProj.getExtent();
				const projectedExtent = sourceProj.getWorldExtent();
				const scale = getHeight(projectedExtent) / getHeight(pixelExtent);
				compose(tmpTransform, projectedExtent[0], projectedExtent[3], scale, -scale, 0, 0, 0);
				const transformed = transform2D(inCoordinates, 0, inCoordinates.length, stride, tmpTransform, outCoordinates);
				const projTransform = getTransform(sourceProj, destination);
				if (projTransform) return projTransform(transformed, transformed, stride);
				return transformed;
			} : getTransform(sourceProj, destination);
			this.applyTransform(transformFn);
			return this;
		}
	};
	//#endregion
	//#region src/ol/geom/SimpleGeometry.js
	/**
	* @module ol/geom/SimpleGeometry
	*/
	/**
	* @classdesc
	* Abstract base class; only used for creating subclasses; do not instantiate
	* in apps, as cannot be rendered.
	*
	* @abstract
	* @api
	*/
	var SimpleGeometry = class extends Geometry {
		constructor() {
			super();
			/**
			* @protected
			* @type {import("./Geometry.js").GeometryLayout}
			*/
			this.layout = "XY";
			/**
			* @protected
			* @type {number}
			*/
			this.stride = 2;
			/**
			* @protected
			* @type {Array<number>}
			*/
			this.flatCoordinates;
		}
		/**
		* @param {import("../extent.js").Extent} extent Extent.
		* @protected
		* @return {import("../extent.js").Extent} extent Extent.
		* @override
		*/
		computeExtent(extent) {
			return createOrUpdateFromFlatCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, extent);
		}
		/**
		* @abstract
		* @return {Array<*> | null} Coordinates.
		*/
		getCoordinates() {
			return abstract();
		}
		/**
		* Return the first coordinate of the geometry.
		* @return {import("../coordinate.js").Coordinate} First coordinate.
		* @api
		*/
		getFirstCoordinate() {
			return this.flatCoordinates.slice(0, this.stride);
		}
		/**
		* @return {Array<number>} Flat coordinates.
		*/
		getFlatCoordinates() {
			return this.flatCoordinates;
		}
		/**
		* Return the last coordinate of the geometry.
		* @return {import("../coordinate.js").Coordinate} Last point.
		* @api
		*/
		getLastCoordinate() {
			return this.flatCoordinates.slice(this.flatCoordinates.length - this.stride);
		}
		/**
		* Return the {@link import("./Geometry.js").GeometryLayout layout} of the geometry.
		* @return {import("./Geometry.js").GeometryLayout} Layout.
		* @api
		*/
		getLayout() {
			return this.layout;
		}
		/**
		* Create a simplified version of this geometry using the Douglas Peucker algorithm.
		* @param {number} squaredTolerance Squared tolerance.
		* @return {SimpleGeometry} Simplified geometry.
		* @override
		*/
		getSimplifiedGeometry(squaredTolerance) {
			if (this.simplifiedGeometryRevision !== this.getRevision()) {
				this.simplifiedGeometryMaxMinSquaredTolerance = 0;
				this.simplifiedGeometryRevision = this.getRevision();
			}
			if (squaredTolerance < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && squaredTolerance <= this.simplifiedGeometryMaxMinSquaredTolerance) return this;
			const simplifiedGeometry = this.getSimplifiedGeometryInternal(squaredTolerance);
			if (simplifiedGeometry.getFlatCoordinates().length < this.flatCoordinates.length) return simplifiedGeometry;
			this.simplifiedGeometryMaxMinSquaredTolerance = squaredTolerance;
			return this;
		}
		/**
		* @param {number} squaredTolerance Squared tolerance.
		* @return {SimpleGeometry} Simplified geometry.
		* @protected
		*/
		getSimplifiedGeometryInternal(squaredTolerance) {
			return this;
		}
		/**
		* @return {number} Stride.
		*/
		getStride() {
			return this.stride;
		}
		/**
		* @param {import("./Geometry.js").GeometryLayout} layout Layout.
		* @param {Array<number>} flatCoordinates Flat coordinates.
		*/
		setFlatCoordinates(layout, flatCoordinates) {
			this.stride = getStrideForLayout(layout);
			this.layout = layout;
			this.flatCoordinates = flatCoordinates;
		}
		/**
		* @abstract
		* @param {!Array<*>} coordinates Coordinates.
		* @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
		*/
		setCoordinates(coordinates, layout) {
			abstract();
		}
		/**
		* @param {import("./Geometry.js").GeometryLayout|undefined} layout Layout.
		* @param {Array<*>} coordinates Coordinates.
		* @param {number} nesting Nesting.
		* @protected
		*/
		setLayout(layout, coordinates, nesting) {
			let stride;
			if (layout) stride = getStrideForLayout(layout);
			else {
				for (let i = 0; i < nesting; ++i) {
					if (coordinates.length === 0) {
						this.layout = "XY";
						this.stride = 2;
						return;
					}
					coordinates = coordinates[0];
				}
				stride = coordinates.length;
				layout = getLayoutForStride(stride);
			}
			this.layout = layout;
			this.stride = stride;
		}
		/**
		* Apply a transform function to the coordinates of the geometry.
		* The geometry is modified in place.
		* If you do not want the geometry modified in place, first `clone()` it and
		* then use this function on the clone.
		* @param {import("../proj.js").TransformFunction} transformFn Transform function.
		* Called with a flat array of geometry coordinates.
		* @api
		* @override
		*/
		applyTransform(transformFn) {
			if (this.flatCoordinates) {
				transformFn(this.flatCoordinates, this.flatCoordinates, this.layout.startsWith("XYZ") ? 3 : 2, this.stride);
				this.changed();
			}
		}
		/**
		* Rotate the geometry around a given coordinate. This modifies the geometry
		* coordinates in place.
		* @param {number} angle Rotation angle in counter-clockwise radians.
		* @param {import("../coordinate.js").Coordinate} anchor The rotation center.
		* @api
		* @override
		*/
		rotate(angle, anchor) {
			const flatCoordinates = this.getFlatCoordinates();
			if (flatCoordinates) {
				const stride = this.getStride();
				rotate(flatCoordinates, 0, flatCoordinates.length, stride, angle, anchor, flatCoordinates);
				this.changed();
			}
		}
		/**
		* Scale the geometry (with an optional origin).  This modifies the geometry
		* coordinates in place.
		* @param {number} sx The scaling factor in the x-direction.
		* @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
		* @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
		*     of the geometry extent).
		* @api
		* @override
		*/
		scale(sx, sy, anchor) {
			if (sy === void 0) sy = sx;
			if (!anchor) anchor = getCenter(this.getExtent());
			const flatCoordinates = this.getFlatCoordinates();
			if (flatCoordinates) {
				const stride = this.getStride();
				scale$1(flatCoordinates, 0, flatCoordinates.length, stride, sx, sy, anchor, flatCoordinates);
				this.changed();
			}
		}
		/**
		* Translate the geometry.  This modifies the geometry coordinates in place.  If
		* instead you want a new geometry, first `clone()` this geometry.
		* @param {number} deltaX Delta X.
		* @param {number} deltaY Delta Y.
		* @api
		* @override
		*/
		translate(deltaX, deltaY) {
			const flatCoordinates = this.getFlatCoordinates();
			if (flatCoordinates) {
				const stride = this.getStride();
				translate(flatCoordinates, 0, flatCoordinates.length, stride, deltaX, deltaY, flatCoordinates);
				this.changed();
			}
		}
	};
	/**
	* @param {number} stride Stride.
	* @return {import("./Geometry.js").GeometryLayout} layout Layout.
	*/
	function getLayoutForStride(stride) {
		let layout;
		if (stride == 2) layout = "XY";
		else if (stride == 3) layout = "XYZ";
		else if (stride == 4) layout = "XYZM";
		return layout;
	}
	/**
	* @param {import("./Geometry.js").GeometryLayout} layout Layout.
	* @return {number} Stride.
	*/
	function getStrideForLayout(layout) {
		let stride;
		if (layout == "XY") stride = 2;
		else if (layout == "XYZ" || layout == "XYM") stride = 3;
		else if (layout == "XYZM") stride = 4;
		return stride;
	}
	//#endregion
	//#region src/ol/geom/flat/area.js
	/**
	* @module ol/geom/flat/area
	*/
	/**
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {number} end End.
	* @param {number} stride Stride.
	* @return {number} Area.
	*/
	function linearRing(flatCoordinates, offset, end, stride) {
		let twiceArea = 0;
		const x0 = flatCoordinates[end - stride];
		const y0 = flatCoordinates[end - stride + 1];
		let dx1 = 0;
		let dy1 = 0;
		for (; offset < end; offset += stride) {
			const dx2 = flatCoordinates[offset] - x0;
			const dy2 = flatCoordinates[offset + 1] - y0;
			twiceArea += dy1 * dx2 - dx1 * dy2;
			dx1 = dx2;
			dy1 = dy2;
		}
		return twiceArea / 2;
	}
	/**
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {Array<number>} ends Ends.
	* @param {number} stride Stride.
	* @return {number} Area.
	*/
	function linearRings(flatCoordinates, offset, ends, stride) {
		let area = 0;
		for (let i = 0, ii = ends.length; i < ii; ++i) {
			const end = ends[i];
			area += linearRing(flatCoordinates, offset, end, stride);
			offset = end;
		}
		return area;
	}
	//#endregion
	//#region src/ol/geom/flat/closest.js
	/**
	* @module ol/geom/flat/closest
	*/
	/**
	* Returns the point on the 2D line segment flatCoordinates[offset1] to
	* flatCoordinates[offset2] that is closest to the point (x, y).  Extra
	* dimensions are linearly interpolated.
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset1 Offset 1.
	* @param {number} offset2 Offset 2.
	* @param {number} stride Stride.
	* @param {number} x X.
	* @param {number} y Y.
	* @param {Array<number>} closestPoint Closest point.
	*/
	function assignClosest(flatCoordinates, offset1, offset2, stride, x, y, closestPoint) {
		const x1 = flatCoordinates[offset1];
		const y1 = flatCoordinates[offset1 + 1];
		const dx = flatCoordinates[offset2] - x1;
		const dy = flatCoordinates[offset2 + 1] - y1;
		let offset;
		if (dx === 0 && dy === 0) offset = offset1;
		else {
			const t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
			if (t > 1) offset = offset2;
			else if (t > 0) {
				for (let i = 0; i < stride; ++i) closestPoint[i] = lerp(flatCoordinates[offset1 + i], flatCoordinates[offset2 + i], t);
				closestPoint.length = stride;
				return;
			} else offset = offset1;
		}
		for (let i = 0; i < stride; ++i) closestPoint[i] = flatCoordinates[offset + i];
		closestPoint.length = stride;
	}
	/**
	* Return the squared of the largest distance between any pair of consecutive
	* coordinates.
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {number} end End.
	* @param {number} stride Stride.
	* @param {number} max Max squared delta.
	* @return {number} Max squared delta.
	*/
	function maxSquaredDelta(flatCoordinates, offset, end, stride, max) {
		let x1 = flatCoordinates[offset];
		let y1 = flatCoordinates[offset + 1];
		for (offset += stride; offset < end; offset += stride) {
			const x2 = flatCoordinates[offset];
			const y2 = flatCoordinates[offset + 1];
			const squaredDelta = squaredDistance(x1, y1, x2, y2);
			if (squaredDelta > max) max = squaredDelta;
			x1 = x2;
			y1 = y2;
		}
		return max;
	}
	/**
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {Array<number>} ends Ends.
	* @param {number} stride Stride.
	* @param {number} max Max squared delta.
	* @return {number} Max squared delta.
	*/
	function arrayMaxSquaredDelta(flatCoordinates, offset, ends, stride, max) {
		for (let i = 0, ii = ends.length; i < ii; ++i) {
			const end = ends[i];
			max = maxSquaredDelta(flatCoordinates, offset, end, stride, max);
			offset = end;
		}
		return max;
	}
	/**
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {number} end End.
	* @param {number} stride Stride.
	* @param {number} maxDelta Max delta.
	* @param {boolean} isRing Is ring.
	* @param {number} x X.
	* @param {number} y Y.
	* @param {Array<number>} closestPoint Closest point.
	* @param {number} minSquaredDistance Minimum squared distance.
	* @param {Array<number>} [tmpPoint] Temporary point object.
	* @return {number} Minimum squared distance.
	*/
	function assignClosestPoint(flatCoordinates, offset, end, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint) {
		if (offset == end) return minSquaredDistance;
		let i, squaredDistance$2;
		if (maxDelta === 0) {
			squaredDistance$2 = squaredDistance(x, y, flatCoordinates[offset], flatCoordinates[offset + 1]);
			if (squaredDistance$2 < minSquaredDistance) {
				for (i = 0; i < stride; ++i) closestPoint[i] = flatCoordinates[offset + i];
				closestPoint.length = stride;
				return squaredDistance$2;
			}
			return minSquaredDistance;
		}
		tmpPoint = tmpPoint ? tmpPoint : [NaN, NaN];
		let index = offset + stride;
		while (index < end) {
			assignClosest(flatCoordinates, index - stride, index, stride, x, y, tmpPoint);
			squaredDistance$2 = squaredDistance(x, y, tmpPoint[0], tmpPoint[1]);
			if (squaredDistance$2 < minSquaredDistance) {
				minSquaredDistance = squaredDistance$2;
				for (i = 0; i < stride; ++i) closestPoint[i] = tmpPoint[i];
				closestPoint.length = stride;
				index += stride;
			} else index += stride * Math.max((Math.sqrt(squaredDistance$2) - Math.sqrt(minSquaredDistance)) / maxDelta | 0, 1);
		}
		if (isRing) {
			assignClosest(flatCoordinates, end - stride, offset, stride, x, y, tmpPoint);
			squaredDistance$2 = squaredDistance(x, y, tmpPoint[0], tmpPoint[1]);
			if (squaredDistance$2 < minSquaredDistance) {
				minSquaredDistance = squaredDistance$2;
				for (i = 0; i < stride; ++i) closestPoint[i] = tmpPoint[i];
				closestPoint.length = stride;
			}
		}
		return minSquaredDistance;
	}
	/**
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {Array<number>} ends Ends.
	* @param {number} stride Stride.
	* @param {number} maxDelta Max delta.
	* @param {boolean} isRing Is ring.
	* @param {number} x X.
	* @param {number} y Y.
	* @param {Array<number>} closestPoint Closest point.
	* @param {number} minSquaredDistance Minimum squared distance.
	* @param {Array<number>} [tmpPoint] Temporary point object.
	* @return {number} Minimum squared distance.
	*/
	function assignClosestArrayPoint(flatCoordinates, offset, ends, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint) {
		tmpPoint = tmpPoint ? tmpPoint : [NaN, NaN];
		for (let i = 0, ii = ends.length; i < ii; ++i) {
			const end = ends[i];
			minSquaredDistance = assignClosestPoint(flatCoordinates, offset, end, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint);
			offset = end;
		}
		return minSquaredDistance;
	}
	//#endregion
	//#region src/ol/geom/flat/deflate.js
	/**
	* @module ol/geom/flat/deflate
	*/
	/**
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
	* @param {number} stride Stride.
	* @return {number} offset Offset.
	*/
	function deflateCoordinate(flatCoordinates, offset, coordinate, stride) {
		for (let i = 0, ii = coordinate.length; i < ii; ++i) flatCoordinates[offset++] = coordinate[i];
		return offset;
	}
	/**
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {Array<import("../../coordinate.js").Coordinate>} coordinates Coordinates.
	* @param {number} stride Stride.
	* @return {number} offset Offset.
	*/
	function deflateCoordinates(flatCoordinates, offset, coordinates, stride) {
		for (let i = 0, ii = coordinates.length; i < ii; ++i) {
			const coordinate = coordinates[i];
			for (let j = 0; j < stride; ++j) flatCoordinates[offset++] = coordinate[j];
		}
		return offset;
	}
	/**
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {Array<Array<import("../../coordinate.js").Coordinate>>} coordinatess Coordinatess.
	* @param {number} stride Stride.
	* @param {Array<number>} [ends] Ends.
	* @return {Array<number>} Ends.
	*/
	function deflateCoordinatesArray(flatCoordinates, offset, coordinatess, stride, ends) {
		ends = ends ? ends : [];
		let i = 0;
		for (let j = 0, jj = coordinatess.length; j < jj; ++j) {
			const end = deflateCoordinates(flatCoordinates, offset, coordinatess[j], stride);
			ends[i++] = end;
			offset = end;
		}
		ends.length = i;
		return ends;
	}
	//#endregion
	//#region src/ol/geom/flat/inflate.js
	/**
	* @module ol/geom/flat/inflate
	*/
	/**
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {number} end End.
	* @param {number} stride Stride.
	* @param {Array<import("../../coordinate.js").Coordinate>} [coordinates] Coordinates.
	* @return {Array<import("../../coordinate.js").Coordinate>} Coordinates.
	*/
	function inflateCoordinates(flatCoordinates, offset, end, stride, coordinates) {
		coordinates = coordinates !== void 0 ? coordinates : [];
		let i = 0;
		for (let j = offset; j < end; j += stride) coordinates[i++] = flatCoordinates.slice(j, j + stride);
		coordinates.length = i;
		return coordinates;
	}
	/**
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {Array<number>} ends Ends.
	* @param {number} stride Stride.
	* @param {Array<Array<import("../../coordinate.js").Coordinate>>} [coordinatess] Coordinatess.
	* @return {Array<Array<import("../../coordinate.js").Coordinate>>} Coordinatess.
	*/
	function inflateCoordinatesArray(flatCoordinates, offset, ends, stride, coordinatess) {
		coordinatess = coordinatess !== void 0 ? coordinatess : [];
		let i = 0;
		for (let j = 0, jj = ends.length; j < jj; ++j) {
			const end = ends[j];
			coordinatess[i++] = inflateCoordinates(flatCoordinates, offset, end, stride, coordinatess[i]);
			offset = end;
		}
		coordinatess.length = i;
		return coordinatess;
	}
	//#endregion
	//#region src/ol/geom/flat/contains.js
	/**
	* @module ol/geom/flat/contains
	*/
	/**
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {number} end End.
	* @param {number} stride Stride.
	* @param {import("../../extent.js").Extent} extent Extent.
	* @return {boolean} Contains extent.
	*/
	function linearRingContainsExtent(flatCoordinates, offset, end, stride, extent) {
		return !forEachCorner(
			extent,
			/**
			* @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
			* @return {boolean} Contains (x, y).
			*/
			function(coordinate) {
				return !linearRingContainsXY(flatCoordinates, offset, end, stride, coordinate[0], coordinate[1]);
			}
		);
	}
	/**
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {number} end End.
	* @param {number} stride Stride.
	* @param {number} x X.
	* @param {number} y Y.
	* @return {boolean} Contains (x, y).
	*/
	function linearRingContainsXY(flatCoordinates, offset, end, stride, x, y) {
		let wn = 0;
		let x1 = flatCoordinates[end - stride];
		let y1 = flatCoordinates[end - stride + 1];
		for (; offset < end; offset += stride) {
			const x2 = flatCoordinates[offset];
			const y2 = flatCoordinates[offset + 1];
			if (y1 <= y) {
				if (y2 > y && (x2 - x1) * (y - y1) - (x - x1) * (y2 - y1) > 0) wn++;
			} else if (y2 <= y && (x2 - x1) * (y - y1) - (x - x1) * (y2 - y1) < 0) wn--;
			x1 = x2;
			y1 = y2;
		}
		return wn !== 0;
	}
	/**
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {Array<number>} ends Ends.
	* @param {number} stride Stride.
	* @param {number} x X.
	* @param {number} y Y.
	* @return {boolean} Contains (x, y).
	*/
	function linearRingsContainsXY(flatCoordinates, offset, ends, stride, x, y) {
		if (ends.length === 0) return false;
		if (!linearRingContainsXY(flatCoordinates, offset, ends[0], stride, x, y)) return false;
		for (let i = 1, ii = ends.length; i < ii; ++i) if (linearRingContainsXY(flatCoordinates, ends[i - 1], ends[i], stride, x, y)) return false;
		return true;
	}
	//#endregion
	//#region src/ol/geom/flat/segments.js
	/**
	* @module ol/geom/flat/segments
	*/
	/**
	* This function calls `callback` for each segment of the flat coordinates
	* array. If the callback returns a truthy value the function returns that
	* value immediately. Otherwise the function returns `false`.
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {number} end End.
	* @param {number} stride Stride.
	* @param {function(import("../../coordinate.js").Coordinate, import("../../coordinate.js").Coordinate): T} callback Function
	*     called for each segment.
	* @return {T|boolean} Value.
	* @template T
	*/
	function forEach(flatCoordinates, offset, end, stride, callback) {
		let ret;
		offset += stride;
		for (; offset < end; offset += stride) {
			ret = callback(flatCoordinates.slice(offset - stride, offset), flatCoordinates.slice(offset, offset + stride));
			if (ret) return ret;
		}
		return false;
	}
	//#endregion
	//#region src/ol/geom/flat/intersectsextent.js
	/**
	* @module ol/geom/flat/intersectsextent
	*/
	/**
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {number} end End.
	* @param {number} stride Stride.
	* @param {import("../../extent.js").Extent} extent Extent.
	* @param {import('../../extent.js').Extent} [coordinatesExtent] Coordinates extent
	* @return {boolean} True if the geometry and the extent intersect.
	*/
	function intersectsLineString(flatCoordinates, offset, end, stride, extent, coordinatesExtent) {
		coordinatesExtent = coordinatesExtent ?? extendFlatCoordinates(createEmpty(), flatCoordinates, offset, end, stride);
		if (!intersects$1(extent, coordinatesExtent)) return false;
		if (coordinatesExtent[0] >= extent[0] && coordinatesExtent[2] <= extent[2] || coordinatesExtent[1] >= extent[1] && coordinatesExtent[3] <= extent[3]) return true;
		return forEach(
			flatCoordinates,
			offset,
			end,
			stride,
			/**
			* @param {import("../../coordinate.js").Coordinate} point1 Start point.
			* @param {import("../../coordinate.js").Coordinate} point2 End point.
			* @return {boolean} `true` if the segment and the extent intersect,
			*     `false` otherwise.
			*/
			function(point1, point2) {
				return intersectsSegment(extent, point1, point2);
			}
		);
	}
	/**
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {number} end End.
	* @param {number} stride Stride.
	* @param {import("../../extent.js").Extent} extent Extent.
	* @return {boolean} True if the geometry and the extent intersect.
	*/
	function intersectsLinearRing(flatCoordinates, offset, end, stride, extent) {
		if (intersectsLineString(flatCoordinates, offset, end, stride, extent)) return true;
		if (linearRingContainsXY(flatCoordinates, offset, end, stride, extent[0], extent[1])) return true;
		if (linearRingContainsXY(flatCoordinates, offset, end, stride, extent[0], extent[3])) return true;
		if (linearRingContainsXY(flatCoordinates, offset, end, stride, extent[2], extent[1])) return true;
		if (linearRingContainsXY(flatCoordinates, offset, end, stride, extent[2], extent[3])) return true;
		return false;
	}
	/**
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {Array<number>} ends Ends.
	* @param {number} stride Stride.
	* @param {import("../../extent.js").Extent} extent Extent.
	* @return {boolean} True if the geometry and the extent intersect.
	*/
	function intersectsLinearRingArray(flatCoordinates, offset, ends, stride, extent) {
		if (!intersectsLinearRing(flatCoordinates, offset, ends[0], stride, extent)) return false;
		if (ends.length === 1) return true;
		for (let i = 1, ii = ends.length; i < ii; ++i) if (linearRingContainsExtent(flatCoordinates, ends[i - 1], ends[i], stride, extent)) {
			if (!intersectsLineString(flatCoordinates, ends[i - 1], ends[i], stride, extent)) return false;
		}
		return true;
	}
	//#endregion
	//#region src/ol/geom/flat/simplify.js
	/**
	* @module ol/geom/flat/simplify
	*/
	/**
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {number} end End.
	* @param {number} stride Stride.
	* @param {number} squaredTolerance Squared tolerance.
	* @param {Array<number>} simplifiedFlatCoordinates Simplified flat
	*     coordinates.
	* @param {number} simplifiedOffset Simplified offset.
	* @return {number} Simplified offset.
	*/
	function douglasPeucker(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset) {
		const n = (end - offset) / stride;
		if (n < 3) {
			for (; offset < end; offset += stride) {
				simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset];
				simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + 1];
			}
			return simplifiedOffset;
		}
		/** @type {Array<number>} */
		const markers = new Array(n);
		markers[0] = 1;
		markers[n - 1] = 1;
		/** @type {Array<number>} */
		const stack = [offset, end - stride];
		let index = 0;
		while (stack.length > 0) {
			const last = stack.pop();
			const first = stack.pop();
			let maxSquaredDistance = 0;
			const x1 = flatCoordinates[first];
			const y1 = flatCoordinates[first + 1];
			const x2 = flatCoordinates[last];
			const y2 = flatCoordinates[last + 1];
			for (let i = first + stride; i < last; i += stride) {
				const x = flatCoordinates[i];
				const y = flatCoordinates[i + 1];
				const squaredDistance = squaredSegmentDistance(x, y, x1, y1, x2, y2);
				if (squaredDistance > maxSquaredDistance) {
					index = i;
					maxSquaredDistance = squaredDistance;
				}
			}
			if (maxSquaredDistance > squaredTolerance) {
				markers[(index - offset) / stride] = 1;
				if (first + stride < index) stack.push(first, index);
				if (index + stride < last) stack.push(index, last);
			}
		}
		for (let i = 0; i < n; ++i) if (markers[i]) {
			simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + i * stride];
			simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + i * stride + 1];
		}
		return simplifiedOffset;
	}
	/**
	* @param {number} value Value.
	* @param {number} tolerance Tolerance.
	* @return {number} Rounded value.
	*/
	function snap(value, tolerance) {
		return tolerance * Math.round(value / tolerance);
	}
	/**
	* Simplifies a line string using an algorithm designed by Tim Schaub.
	* Coordinates are snapped to the nearest value in a virtual grid and
	* consecutive duplicate coordinates are discarded.  This effectively preserves
	* topology as the simplification of any subsection of a line string is
	* independent of the rest of the line string.  This means that, for examples,
	* the common edge between two polygons will be simplified to the same line
	* string independently in both polygons.  This implementation uses a single
	* pass over the coordinates and eliminates intermediate collinear points.
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {number} end End.
	* @param {number} stride Stride.
	* @param {number} tolerance Tolerance.
	* @param {Array<number>} simplifiedFlatCoordinates Simplified flat
	*     coordinates.
	* @param {number} simplifiedOffset Simplified offset.
	* @return {number} Simplified offset.
	*/
	function quantize(flatCoordinates, offset, end, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset) {
		if (offset == end) return simplifiedOffset;
		let x1 = snap(flatCoordinates[offset], tolerance);
		let y1 = snap(flatCoordinates[offset + 1], tolerance);
		offset += stride;
		simplifiedFlatCoordinates[simplifiedOffset++] = x1;
		simplifiedFlatCoordinates[simplifiedOffset++] = y1;
		let x2, y2;
		do {
			x2 = snap(flatCoordinates[offset], tolerance);
			y2 = snap(flatCoordinates[offset + 1], tolerance);
			offset += stride;
			if (offset == end) {
				simplifiedFlatCoordinates[simplifiedOffset++] = x2;
				simplifiedFlatCoordinates[simplifiedOffset++] = y2;
				return simplifiedOffset;
			}
		} while (x2 == x1 && y2 == y1);
		while (offset < end) {
			const x3 = snap(flatCoordinates[offset], tolerance);
			const y3 = snap(flatCoordinates[offset + 1], tolerance);
			offset += stride;
			if (x3 == x2 && y3 == y2) continue;
			const dx1 = x2 - x1;
			const dy1 = y2 - y1;
			const dx2 = x3 - x1;
			const dy2 = y3 - y1;
			if (dx1 * dy2 == dy1 * dx2 && (dx1 < 0 && dx2 < dx1 || dx1 == dx2 || dx1 > 0 && dx2 > dx1) && (dy1 < 0 && dy2 < dy1 || dy1 == dy2 || dy1 > 0 && dy2 > dy1)) {
				x2 = x3;
				y2 = y3;
				continue;
			}
			simplifiedFlatCoordinates[simplifiedOffset++] = x2;
			simplifiedFlatCoordinates[simplifiedOffset++] = y2;
			x1 = x2;
			y1 = y2;
			x2 = x3;
			y2 = y3;
		}
		simplifiedFlatCoordinates[simplifiedOffset++] = x2;
		simplifiedFlatCoordinates[simplifiedOffset++] = y2;
		return simplifiedOffset;
	}
	/**
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {Array<number>} ends Ends.
	* @param {number} stride Stride.
	* @param {number} tolerance Tolerance.
	* @param {Array<number>} simplifiedFlatCoordinates Simplified flat
	*     coordinates.
	* @param {number} simplifiedOffset Simplified offset.
	* @param {Array<number>} simplifiedEnds Simplified ends.
	* @return {number} Simplified offset.
	*/
	function quantizeArray(flatCoordinates, offset, ends, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds) {
		for (let i = 0, ii = ends.length; i < ii; ++i) {
			const end = ends[i];
			simplifiedOffset = quantize(flatCoordinates, offset, end, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset);
			simplifiedEnds.push(simplifiedOffset);
			offset = end;
		}
		return simplifiedOffset;
	}
	//#endregion
	//#region src/ol/geom/LinearRing.js
	/**
	* @module ol/geom/LinearRing
	*/
	/**
	* @classdesc
	* Linear ring geometry. Only used as part of polygon; cannot be rendered
	* on its own.
	*
	* @api
	*/
	var LinearRing = class LinearRing extends SimpleGeometry {
		/**
		* @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
		*     For internal use, flat coordinates in combination with `layout` are also accepted.
		* @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
		*/
		constructor(coordinates, layout) {
			super();
			/**
			* @private
			* @type {number}
			*/
			this.maxDelta_ = -1;
			/**
			* @private
			* @type {number}
			*/
			this.maxDeltaRevision_ = -1;
			if (layout !== void 0 && !Array.isArray(coordinates[0])) this.setFlatCoordinates(layout, coordinates);
			else this.setCoordinates(coordinates, layout);
		}
		/**
		* Make a complete copy of the geometry.
		* @return {!LinearRing} Clone.
		* @api
		* @override
		*/
		clone() {
			return new LinearRing(this.flatCoordinates.slice(), this.layout);
		}
		/**
		* @param {number} x X.
		* @param {number} y Y.
		* @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
		* @param {number} minSquaredDistance Minimum squared distance.
		* @return {number} Minimum squared distance.
		* @override
		*/
		closestPointXY(x, y, closestPoint, minSquaredDistance) {
			if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) return minSquaredDistance;
			if (this.maxDeltaRevision_ != this.getRevision()) {
				this.maxDelta_ = Math.sqrt(maxSquaredDelta(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0));
				this.maxDeltaRevision_ = this.getRevision();
			}
			return assignClosestPoint(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
		}
		/**
		* Return the area of the linear ring on projected plane.
		* @return {number} Area (on projected plane).
		* @api
		*/
		getArea() {
			return linearRing(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
		}
		/**
		* Return the coordinates of the linear ring.
		* @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
		* @api
		* @override
		*/
		getCoordinates() {
			return inflateCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
		}
		/**
		* @param {number} squaredTolerance Squared tolerance.
		* @return {LinearRing} Simplified LinearRing.
		* @protected
		* @override
		*/
		getSimplifiedGeometryInternal(squaredTolerance) {
			/** @type {Array<number>} */
			const simplifiedFlatCoordinates = [];
			simplifiedFlatCoordinates.length = douglasPeucker(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0);
			return new LinearRing(simplifiedFlatCoordinates, "XY");
		}
		/**
		* Get the type of this geometry.
		* @return {import("./Geometry.js").Type} Geometry type.
		* @api
		* @override
		*/
		getType() {
			return "LinearRing";
		}
		/**
		* Test if the geometry and the passed extent intersect. A linear ring is
		* treated as a line string for this test.
		* @param {import("../extent.js").Extent} extent Extent.
		* @return {boolean} `true` if the geometry and the extent intersect.
		* @api
		* @override
		*/
		intersectsExtent(extent) {
			return intersectsLineString(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, extent);
		}
		/**
		* Set the coordinates of the linear ring.
		* @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
		* @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
		* @api
		* @override
		*/
		setCoordinates(coordinates, layout) {
			this.setLayout(layout, coordinates, 1);
			if (!this.flatCoordinates) this.flatCoordinates = [];
			this.flatCoordinates.length = deflateCoordinates(this.flatCoordinates, 0, coordinates, this.stride);
			this.changed();
		}
	};
	//#endregion
	//#region src/ol/geom/Point.js
	/**
	* @module ol/geom/Point
	*/
	/**
	* @classdesc
	* Point geometry.
	*
	* @api
	*/
	var Point = class Point extends SimpleGeometry {
		/**
		* @param {import("../coordinate.js").Coordinate} coordinates Coordinates.
		* @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
		*/
		constructor(coordinates, layout) {
			super();
			this.setCoordinates(coordinates, layout);
		}
		/**
		* Make a complete copy of the geometry.
		* @return {!Point} Clone.
		* @api
		* @override
		*/
		clone() {
			const point = new Point(this.flatCoordinates.slice(), this.layout);
			point.applyProperties(this);
			return point;
		}
		/**
		* @param {number} x X.
		* @param {number} y Y.
		* @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
		* @param {number} minSquaredDistance Minimum squared distance.
		* @return {number} Minimum squared distance.
		* @override
		*/
		closestPointXY(x, y, closestPoint, minSquaredDistance) {
			const flatCoordinates = this.flatCoordinates;
			const squaredDistance$1 = squaredDistance(x, y, flatCoordinates[0], flatCoordinates[1]);
			if (squaredDistance$1 < minSquaredDistance) {
				const stride = this.stride;
				for (let i = 0; i < stride; ++i) closestPoint[i] = flatCoordinates[i];
				closestPoint.length = stride;
				return squaredDistance$1;
			}
			return minSquaredDistance;
		}
		/**
		* Return the coordinate of the point.
		* @return {import("../coordinate.js").Coordinate} Coordinates.
		* @api
		* @override
		*/
		getCoordinates() {
			return this.flatCoordinates.slice();
		}
		/**
		* @param {import("../extent.js").Extent} extent Extent.
		* @protected
		* @return {import("../extent.js").Extent} extent Extent.
		* @override
		*/
		computeExtent(extent) {
			return createOrUpdateFromCoordinate(this.flatCoordinates, extent);
		}
		/**
		* Get the type of this geometry.
		* @return {import("./Geometry.js").Type} Geometry type.
		* @api
		* @override
		*/
		getType() {
			return "Point";
		}
		/**
		* Test if the geometry and the passed extent intersect.
		* @param {import("../extent.js").Extent} extent Extent.
		* @return {boolean} `true` if the geometry and the extent intersect.
		* @api
		* @override
		*/
		intersectsExtent(extent) {
			return containsXY(extent, this.flatCoordinates[0], this.flatCoordinates[1]);
		}
		/**
		* @param {!Array<*>} coordinates Coordinates.
		* @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
		* @api
		* @override
		*/
		setCoordinates(coordinates, layout) {
			this.setLayout(layout, coordinates, 0);
			if (!this.flatCoordinates) this.flatCoordinates = [];
			this.flatCoordinates.length = deflateCoordinate(this.flatCoordinates, 0, coordinates, this.stride);
			this.changed();
		}
	};
	//#endregion
	//#region src/ol/geom/flat/interiorpoint.js
	/**
	* @module ol/geom/flat/interiorpoint
	*/
	/**
	* Calculates a point that is likely to lie in the interior of the linear rings.
	* Inspired by JTS's com.vividsolutions.jts.geom.Geometry#getInteriorPoint.
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {Array<number>} ends Ends.
	* @param {number} stride Stride.
	* @param {Array<number>} flatCenters Flat centers.
	* @param {number} flatCentersOffset Flat center offset.
	* @param {Array<number>} [dest] Destination.
	* @return {Array<number>} Destination point as XYM coordinate, where M is the
	* length of the horizontal intersection that the point belongs to.
	*/
	function getInteriorPointOfArray(flatCoordinates, offset, ends, stride, flatCenters, flatCentersOffset, dest) {
		let i, ii, x, x1, x2, y1, y2;
		const y = flatCenters[flatCentersOffset + 1];
		/** @type {Array<number>} */
		const intersections = [];
		for (let r = 0, rr = ends.length; r < rr; ++r) {
			const end = ends[r];
			x1 = flatCoordinates[end - stride];
			y1 = flatCoordinates[end - stride + 1];
			for (i = offset; i < end; i += stride) {
				x2 = flatCoordinates[i];
				y2 = flatCoordinates[i + 1];
				if (y <= y1 && y2 <= y || y1 <= y && y <= y2) {
					x = (y - y1) / (y2 - y1) * (x2 - x1) + x1;
					intersections.push(x);
				}
				x1 = x2;
				y1 = y2;
			}
		}
		let pointX = NaN;
		let maxSegmentLength = -Infinity;
		intersections.sort(ascending);
		x1 = intersections[0];
		for (i = 1, ii = intersections.length; i < ii; ++i) {
			x2 = intersections[i];
			const segmentLength = Math.abs(x2 - x1);
			if (segmentLength > maxSegmentLength) {
				x = (x1 + x2) / 2;
				if (linearRingsContainsXY(flatCoordinates, offset, ends, stride, x, y)) {
					pointX = x;
					maxSegmentLength = segmentLength;
				}
			}
			x1 = x2;
		}
		if (isNaN(pointX)) pointX = flatCenters[flatCentersOffset];
		if (dest) {
			dest.push(pointX, y, maxSegmentLength);
			return dest;
		}
		return [
			pointX,
			y,
			maxSegmentLength
		];
	}
	//#endregion
	//#region src/ol/geom/flat/reverse.js
	/**
	* @module ol/geom/flat/reverse
	*/
	/**
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {number} end End.
	* @param {number} stride Stride.
	*/
	function coordinates(flatCoordinates, offset, end, stride) {
		while (offset < end - stride) {
			for (let i = 0; i < stride; ++i) {
				const tmp = flatCoordinates[offset + i];
				flatCoordinates[offset + i] = flatCoordinates[end - stride + i];
				flatCoordinates[end - stride + i] = tmp;
			}
			offset += stride;
			end -= stride;
		}
	}
	//#endregion
	//#region src/ol/geom/flat/orient.js
	/**
	* @module ol/geom/flat/orient
	*/
	/**
	* Is the linear ring oriented clockwise in a coordinate system with a bottom-left
	* coordinate origin? For a coordinate system with a top-left coordinate origin,
	* the ring's orientation is clockwise when this function returns false.
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {number} end End.
	* @param {number} stride Stride.
	* @return {boolean|undefined} Is clockwise.
	*/
	function linearRingIsClockwise(flatCoordinates, offset, end, stride) {
		let edge = 0;
		let x1 = flatCoordinates[end - stride];
		let y1 = flatCoordinates[end - stride + 1];
		for (; offset < end; offset += stride) {
			const x2 = flatCoordinates[offset];
			const y2 = flatCoordinates[offset + 1];
			edge += (x2 - x1) * (y2 + y1);
			x1 = x2;
			y1 = y2;
		}
		return edge === 0 ? void 0 : edge > 0;
	}
	/**
	* Determines if linear rings are oriented.  By default, left-hand orientation
	* is tested (first ring must be clockwise, remaining rings counter-clockwise).
	* To test for right-hand orientation, use the `right` argument.
	*
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {Array<number>} ends Array of end indexes.
	* @param {number} stride Stride.
	* @param {boolean} [right] Test for right-hand orientation
	*     (counter-clockwise exterior ring and clockwise interior rings).
	* @return {boolean} Rings are correctly oriented.
	*/
	function linearRingsAreOriented(flatCoordinates, offset, ends, stride, right) {
		right = right !== void 0 ? right : false;
		for (let i = 0, ii = ends.length; i < ii; ++i) {
			const end = ends[i];
			const isClockwise = linearRingIsClockwise(flatCoordinates, offset, end, stride);
			if (i === 0) {
				if (right && isClockwise || !right && !isClockwise) return false;
			} else if (right && !isClockwise || !right && isClockwise) return false;
			offset = end;
		}
		return true;
	}
	/**
	* Orient coordinates in a flat array of linear rings.  By default, rings
	* are oriented following the left-hand rule (clockwise for exterior and
	* counter-clockwise for interior rings).  To orient according to the
	* right-hand rule, use the `right` argument.
	*
	* @param {Array<number>} flatCoordinates Flat coordinates.
	* @param {number} offset Offset.
	* @param {Array<number>} ends Ends.
	* @param {number} stride Stride.
	* @param {boolean} [right] Follow the right-hand rule for orientation.
	* @return {number} End.
	*/
	function orientLinearRings(flatCoordinates, offset, ends, stride, right) {
		right = right !== void 0 ? right : false;
		for (let i = 0, ii = ends.length; i < ii; ++i) {
			const end = ends[i];
			const isClockwise = linearRingIsClockwise(flatCoordinates, offset, end, stride);
			if (i === 0 ? right && isClockwise || !right && !isClockwise : right && !isClockwise || !right && isClockwise) coordinates(flatCoordinates, offset, end, stride);
			offset = end;
		}
		return offset;
	}
	//#endregion
	//#region src/ol/geom/Polygon.js
	/**
	* @module ol/geom/Polygon
	*/
	/**
	* @classdesc
	* Polygon geometry.
	*
	* @api
	*/
	var Polygon = class Polygon extends SimpleGeometry {
		/**
		* @param {!Array<Array<import("../coordinate.js").Coordinate>>|!Array<number>} coordinates
		*     Array of linear rings that define the polygon. The first linear ring of the
		*     array defines the outer-boundary or surface of the polygon. Each subsequent
		*     linear ring defines a hole in the surface of the polygon. A linear ring is
		*     an array of vertices' coordinates where the first coordinate and the last are
		*     equivalent. (For internal use, flat coordinates in combination with
		*     `layout` and `ends` are also accepted.)
		* @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
		* @param {Array<number>} [ends] Ends (for internal use with flat coordinates).
		*/
		constructor(coordinates, layout, ends) {
			super();
			/**
			* @type {Array<number>}
			* @private
			*/
			this.ends_ = [];
			/**
			* @private
			* @type {number}
			*/
			this.flatInteriorPointRevision_ = -1;
			/**
			* @private
			* @type {import("../coordinate.js").Coordinate|null}
			*/
			this.flatInteriorPoint_ = null;
			/**
			* @private
			* @type {number}
			*/
			this.maxDelta_ = -1;
			/**
			* @private
			* @type {number}
			*/
			this.maxDeltaRevision_ = -1;
			/**
			* @private
			* @type {number}
			*/
			this.orientedRevision_ = -1;
			/**
			* @private
			* @type {Array<number>|null}
			*/
			this.orientedFlatCoordinates_ = null;
			if (layout !== void 0 && ends) {
				this.setFlatCoordinates(layout, coordinates);
				this.ends_ = ends;
			} else this.setCoordinates(coordinates, layout);
		}
		/**
		* Append the passed linear ring to this polygon.
		* @param {LinearRing} linearRing Linear ring.
		* @api
		*/
		appendLinearRing(linearRing) {
			if (!this.flatCoordinates) this.flatCoordinates = linearRing.getFlatCoordinates().slice();
			else extend$2(this.flatCoordinates, linearRing.getFlatCoordinates());
			this.ends_.push(this.flatCoordinates.length);
			this.changed();
		}
		/**
		* Make a complete copy of the geometry.
		* @return {!Polygon} Clone.
		* @api
		* @override
		*/
		clone() {
			const polygon = new Polygon(this.flatCoordinates.slice(), this.layout, this.ends_.slice());
			polygon.applyProperties(this);
			return polygon;
		}
		/**
		* @param {number} x X.
		* @param {number} y Y.
		* @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
		* @param {number} minSquaredDistance Minimum squared distance.
		* @return {number} Minimum squared distance.
		* @override
		*/
		closestPointXY(x, y, closestPoint, minSquaredDistance) {
			if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) return minSquaredDistance;
			if (this.maxDeltaRevision_ != this.getRevision()) {
				this.maxDelta_ = Math.sqrt(arrayMaxSquaredDelta(this.flatCoordinates, 0, this.ends_, this.stride, 0));
				this.maxDeltaRevision_ = this.getRevision();
			}
			return assignClosestArrayPoint(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
		}
		/**
		* @param {number} x X.
		* @param {number} y Y.
		* @return {boolean} Contains (x, y).
		* @override
		*/
		containsXY(x, y) {
			return linearRingsContainsXY(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, x, y);
		}
		/**
		* Return the area of the polygon on projected plane.
		* @return {number} Area (on projected plane).
		* @api
		*/
		getArea() {
			return linearRings(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride);
		}
		/**
		* Get the coordinate array for this geometry.  This array has the structure
		* of a GeoJSON coordinate array for polygons.
		*
		* @param {boolean} [right] Orient coordinates according to the right-hand
		*     rule (counter-clockwise for exterior and clockwise for interior rings).
		*     If `false`, coordinates will be oriented according to the left-hand rule
		*     (clockwise for exterior and counter-clockwise for interior rings).
		*     By default, coordinate orientation will depend on how the geometry was
		*     constructed.
		* @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
		* @api
		* @override
		*/
		getCoordinates(right) {
			let flatCoordinates;
			if (right !== void 0) {
				flatCoordinates = this.getOrientedFlatCoordinates().slice();
				orientLinearRings(flatCoordinates, 0, this.ends_, this.stride, right);
			} else flatCoordinates = this.flatCoordinates;
			return inflateCoordinatesArray(flatCoordinates, 0, this.ends_, this.stride);
		}
		/**
		* @return {Array<number>} Ends.
		*/
		getEnds() {
			return this.ends_;
		}
		/**
		* @return {Array<number>} Interior point.
		*/
		getFlatInteriorPoint() {
			if (this.flatInteriorPointRevision_ != this.getRevision()) {
				const flatCenter = getCenter(this.getExtent());
				this.flatInteriorPoint_ = getInteriorPointOfArray(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, flatCenter, 0);
				this.flatInteriorPointRevision_ = this.getRevision();
			}
			return this.flatInteriorPoint_;
		}
		/**
		* Return an interior point of the polygon.
		* @return {Point} Interior point as XYM coordinate, where M is the
		* length of the horizontal intersection that the point belongs to.
		* @api
		*/
		getInteriorPoint() {
			return new Point(this.getFlatInteriorPoint(), "XYM");
		}
		/**
		* Return the number of rings of the polygon,  this includes the exterior
		* ring and any interior rings.
		*
		* @return {number} Number of rings.
		* @api
		*/
		getLinearRingCount() {
			return this.ends_.length;
		}
		/**
		* Return the Nth linear ring of the polygon geometry. Return `null` if the
		* given index is out of range.
		* The exterior linear ring is available at index `0` and the interior rings
		* at index `1` and beyond.
		*
		* @param {number} index Index.
		* @return {LinearRing|null} Linear ring.
		* @api
		*/
		getLinearRing(index) {
			if (index < 0 || this.ends_.length <= index) return null;
			return new LinearRing(this.flatCoordinates.slice(index === 0 ? 0 : this.ends_[index - 1], this.ends_[index]), this.layout);
		}
		/**
		* Return the linear rings of the polygon.
		* @return {Array<LinearRing>} Linear rings.
		* @api
		*/
		getLinearRings() {
			const layout = this.layout;
			const flatCoordinates = this.flatCoordinates;
			const ends = this.ends_;
			const linearRings = [];
			let offset = 0;
			for (let i = 0, ii = ends.length; i < ii; ++i) {
				const end = ends[i];
				const linearRing = new LinearRing(flatCoordinates.slice(offset, end), layout);
				linearRings.push(linearRing);
				offset = end;
			}
			return linearRings;
		}
		/**
		* @return {Array<number>} Oriented flat coordinates.
		*/
		getOrientedFlatCoordinates() {
			if (this.orientedRevision_ != this.getRevision()) {
				const flatCoordinates = this.flatCoordinates;
				if (linearRingsAreOriented(flatCoordinates, 0, this.ends_, this.stride)) this.orientedFlatCoordinates_ = flatCoordinates;
				else {
					this.orientedFlatCoordinates_ = flatCoordinates.slice();
					this.orientedFlatCoordinates_.length = orientLinearRings(this.orientedFlatCoordinates_, 0, this.ends_, this.stride);
				}
				this.orientedRevision_ = this.getRevision();
			}
			return this.orientedFlatCoordinates_;
		}
		/**
		* @param {number} squaredTolerance Squared tolerance.
		* @return {Polygon} Simplified Polygon.
		* @protected
		* @override
		*/
		getSimplifiedGeometryInternal(squaredTolerance) {
			/** @type {Array<number>} */
			const simplifiedFlatCoordinates = [];
			/** @type {Array<number>} */
			const simplifiedEnds = [];
			simplifiedFlatCoordinates.length = quantizeArray(this.flatCoordinates, 0, this.ends_, this.stride, Math.sqrt(squaredTolerance), simplifiedFlatCoordinates, 0, simplifiedEnds);
			return new Polygon(simplifiedFlatCoordinates, "XY", simplifiedEnds);
		}
		/**
		* Get the type of this geometry.
		* @return {import("./Geometry.js").Type} Geometry type.
		* @api
		* @override
		*/
		getType() {
			return "Polygon";
		}
		/**
		* Test if the geometry and the passed extent intersect.
		* @param {import("../extent.js").Extent} extent Extent.
		* @return {boolean} `true` if the geometry and the extent intersect.
		* @api
		* @override
		*/
		intersectsExtent(extent) {
			return intersectsLinearRingArray(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, extent);
		}
		/**
		* Set the coordinates of the polygon.
		* @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
		* @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
		* @api
		* @override
		*/
		setCoordinates(coordinates, layout) {
			this.setLayout(layout, coordinates, 2);
			if (!this.flatCoordinates) this.flatCoordinates = [];
			const ends = deflateCoordinatesArray(this.flatCoordinates, 0, coordinates, this.stride, this.ends_);
			this.flatCoordinates.length = ends.length === 0 ? 0 : ends[ends.length - 1];
			this.changed();
		}
	};
	/**
	* Create a polygon from an extent. The layout used is `XY`.
	* @param {import("../extent.js").Extent} extent The extent.
	* @return {Polygon} The polygon.
	* @api
	*/
	function fromExtent(extent) {
		if (isEmpty(extent)) throw new Error("Cannot create polygon from empty extent");
		const minX = extent[0];
		const minY = extent[1];
		const maxX = extent[2];
		const maxY = extent[3];
		const flatCoordinates = [
			minX,
			minY,
			minX,
			maxY,
			maxX,
			maxY,
			maxX,
			minY,
			minX,
			minY
		];
		return new Polygon(flatCoordinates, "XY", [flatCoordinates.length]);
	}
	//#endregion
	//#region src/ol/resolutionconstraint.js
	/**
	* @module ol/resolutionconstraint
	*/
	/**
	* @typedef {function((number|undefined), number, import("./size.js").Size, boolean=): (number|undefined)} Type
	*/
	/**
	* Returns a modified resolution taking into account the viewport size and maximum
	* allowed extent.
	* @param {number} resolution Resolution
	* @param {import("./extent.js").Extent} maxExtent Maximum allowed extent.
	* @param {import("./size.js").Size} viewportSize Viewport size.
	* @param {boolean} showFullExtent Whether to show the full extent.
	* @return {number} Capped resolution.
	*/
	function getViewportClampedResolution(resolution, maxExtent, viewportSize, showFullExtent) {
		const xResolution = getWidth(maxExtent) / viewportSize[0];
		const yResolution = getHeight(maxExtent) / viewportSize[1];
		if (showFullExtent) return Math.min(resolution, Math.max(xResolution, yResolution));
		return Math.min(resolution, Math.min(xResolution, yResolution));
	}
	/**
	* Returns a modified resolution to be between maxResolution and minResolution while
	* still allowing the value to be slightly out of bounds.
	* Note: the computation is based on the logarithm function (ln):
	*  - at 1, ln(x) is 0
	*  - above 1, ln(x) keeps increasing but at a much slower pace than x
	* The final result is clamped to prevent getting too far away from bounds.
	* @param {number} resolution Resolution.
	* @param {number} maxResolution Max resolution.
	* @param {number} minResolution Min resolution.
	* @return {number} Smoothed resolution.
	*/
	function getSmoothClampedResolution(resolution, maxResolution, minResolution) {
		let result = Math.min(resolution, maxResolution);
		const ratio = 50;
		result *= Math.log(1 + ratio * Math.max(0, resolution / maxResolution - 1)) / ratio + 1;
		if (minResolution) {
			result = Math.max(result, minResolution);
			result /= Math.log(1 + ratio * Math.max(0, minResolution / resolution - 1)) / ratio + 1;
		}
		return clamp(result, minResolution / 2, maxResolution * 2);
	}
	/**
	* @param {Array<number>} resolutions Resolutions.
	* @param {boolean} [smooth] If true, the view will be able to slightly exceed resolution limits. Default: true.
	* @param {import("./extent.js").Extent} [maxExtent] Maximum allowed extent.
	* @param {boolean} [showFullExtent] If true, allows us to show the full extent. Default: false.
	* @return {Type} Zoom function.
	*/
	function createSnapToResolutions(resolutions, smooth, maxExtent, showFullExtent) {
		smooth = smooth !== void 0 ? smooth : true;
		return (
		/**
		* @param {number|undefined} resolution Resolution.
		* @param {number} direction Direction.
		* @param {import("./size.js").Size} size Viewport size.
		* @param {boolean} [isMoving] True if an interaction or animation is in progress.
		* @return {number|undefined} Resolution.
		*/
function(resolution, direction, size, isMoving) {
			if (resolution !== void 0) {
				const maxResolution = resolutions[0];
				const minResolution = resolutions[resolutions.length - 1];
				const cappedMaxRes = maxExtent ? getViewportClampedResolution(maxResolution, maxExtent, size, showFullExtent) : maxResolution;
				if (isMoving) {
					if (!smooth) return clamp(resolution, minResolution, cappedMaxRes);
					return getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
				}
				const z = Math.floor(linearFindNearest(resolutions, Math.min(cappedMaxRes, resolution), direction));
				if (resolutions[z] > cappedMaxRes && z < resolutions.length - 1) return resolutions[z + 1];
				return resolutions[z];
			}
		});
	}
	/**
	* @param {number} power Power.
	* @param {number} maxResolution Maximum resolution.
	* @param {number} [minResolution] Minimum resolution.
	* @param {boolean} [smooth] If true, the view will be able to slightly exceed resolution limits. Default: true.
	* @param {import("./extent.js").Extent} [maxExtent] Maximum allowed extent.
	* @param {boolean} [showFullExtent] If true, allows us to show the full extent. Default: false.
	* @return {Type} Zoom function.
	*/
	function createSnapToPower(power, maxResolution, minResolution, smooth, maxExtent, showFullExtent) {
		smooth = smooth !== void 0 ? smooth : true;
		minResolution = minResolution !== void 0 ? minResolution : 0;
		return (
		/**
		* @param {number|undefined} resolution Resolution.
		* @param {number} direction Direction.
		* @param {import("./size.js").Size} size Viewport size.
		* @param {boolean} [isMoving] True if an interaction or animation is in progress.
		* @return {number|undefined} Resolution.
		*/
function(resolution, direction, size, isMoving) {
			if (resolution !== void 0) {
				const cappedMaxRes = maxExtent ? getViewportClampedResolution(maxResolution, maxExtent, size, showFullExtent) : maxResolution;
				if (isMoving) {
					if (!smooth) return clamp(resolution, minResolution, cappedMaxRes);
					return getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
				}
				const tolerance = 1e-9;
				const minZoomLevel = Math.ceil(Math.log(maxResolution / cappedMaxRes) / Math.log(power) - tolerance);
				const offset = -direction * (.5 - tolerance) + .5;
				const cappedZoomLevel = Math.floor(Math.log(maxResolution / Math.min(cappedMaxRes, resolution)) / Math.log(power) + offset);
				return clamp(maxResolution / Math.pow(power, Math.max(minZoomLevel, cappedZoomLevel)), minResolution, cappedMaxRes);
			}
		});
	}
	/**
	* @param {number} maxResolution Max resolution.
	* @param {number} minResolution Min resolution.
	* @param {boolean} [smooth] If true, the view will be able to slightly exceed resolution limits. Default: true.
	* @param {import("./extent.js").Extent} [maxExtent] Maximum allowed extent.
	* @param {boolean} [showFullExtent] If true, allows us to show the full extent. Default: false.
	* @return {Type} Zoom function.
	*/
	function createMinMaxResolution(maxResolution, minResolution, smooth, maxExtent, showFullExtent) {
		smooth = smooth !== void 0 ? smooth : true;
		return (
		/**
		* @param {number|undefined} resolution Resolution.
		* @param {number} direction Direction.
		* @param {import("./size.js").Size} size Viewport size.
		* @param {boolean} [isMoving] True if an interaction or animation is in progress.
		* @return {number|undefined} Resolution.
		*/
function(resolution, direction, size, isMoving) {
			if (resolution !== void 0) {
				const cappedMaxRes = maxExtent ? getViewportClampedResolution(maxResolution, maxExtent, size, showFullExtent) : maxResolution;
				if (!smooth || !isMoving) return clamp(resolution, minResolution, cappedMaxRes);
				return getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
			}
		});
	}
	//#endregion
	//#region src/ol/rotationconstraint.js
	/**
	* @module ol/rotationconstraint
	*/
	/**
	* @typedef {function((number|undefined), boolean=): (number|undefined)} Type
	*/
	/**
	* @param {number|undefined} rotation Rotation.
	* @return {number|undefined} Rotation.
	*/
	function disable(rotation) {
		if (rotation !== void 0) return 0;
	}
	/**
	* @param {number|undefined} rotation Rotation.
	* @return {number|undefined} Rotation.
	*/
	function none(rotation) {
		if (rotation !== void 0) return rotation;
	}
	/**
	* @param {number} n N.
	* @return {Type} Rotation constraint.
	*/
	function createSnapToN(n) {
		const theta = 2 * Math.PI / n;
		return (
		/**
		* @param {number|undefined} rotation Rotation.
		* @param {boolean} [isMoving] True if an interaction or animation is in progress.
		* @return {number|undefined} Rotation.
		*/
function(rotation, isMoving) {
			if (isMoving) return rotation;
			if (rotation !== void 0) {
				rotation = Math.floor(rotation / theta + .5) * theta;
				return rotation;
			}
		});
	}
	/**
	* @param {number} [tolerance] Tolerance.
	* @return {Type} Rotation constraint.
	*/
	function createSnapToZero(tolerance) {
		const t = tolerance === void 0 ? toRadians(5) : tolerance;
		return (
		/**
		* @param {number|undefined} rotation Rotation.
		* @param {boolean} [isMoving] True if an interaction or animation is in progress.
		* @return {number|undefined} Rotation.
		*/
function(rotation, isMoving) {
			if (isMoving || rotation === void 0) return rotation;
			if (Math.abs(rotation) <= t) return 0;
			return rotation;
		});
	}
	//#endregion
	//#region src/ol/View.js
	/**
	* @module ol/View
	*/
	/**
	* An animation configuration
	*
	* @typedef {Object} Animation
	* @property {import("./coordinate.js").Coordinate} [sourceCenter] Source center.
	* @property {import("./coordinate.js").Coordinate} [targetCenter] Target center.
	* @property {number} [sourceResolution] Source resolution.
	* @property {number} [targetResolution] Target resolution.
	* @property {number} [sourceRotation] Source rotation.
	* @property {number} [targetRotation] Target rotation.
	* @property {import("./coordinate.js").Coordinate} [anchor] Anchor.
	* @property {number} start Start.
	* @property {number} duration Duration.
	* @property {boolean} complete Complete.
	* @property {function(number):number} easing Easing.
	* @property {function(boolean):void} callback Callback.
	*/
	/**
	* @typedef {Object} Constraints
	* @property {import("./centerconstraint.js").Type} center Center.
	* @property {import("./resolutionconstraint.js").Type} resolution Resolution.
	* @property {import("./rotationconstraint.js").Type} rotation Rotation.
	*/
	/**
	* @typedef {Object} FitOptions
	* @property {import("./size.js").Size} [size] The size in pixels of the box to
	* fit the extent into. Defaults to the size of the map the view is associated with.
	* If no map or multiple maps are connected to the view, provide the desired box size
	* (e.g. `map.getSize()`).
	* @property {!Array<number>} [padding=[0, 0, 0, 0]] Padding (in pixels) to be
	* cleared inside the view. Values in the array are top, right, bottom and left
	* padding.
	* @property {boolean} [nearest=false] If the view `constrainResolution` option is `true`,
	* get the nearest extent instead of the closest that actually fits the view.
	* @property {number} [minResolution=0] Minimum resolution that we zoom to.
	* @property {number} [maxZoom] Maximum zoom level that we zoom to. If
	* `minResolution` is given, this property is ignored.
	* @property {number} [duration] The duration of the animation in milliseconds.
	* By default, there is no animation to the target extent.
	* @property {function(number):number} [easing] The easing function used during
	* the animation (defaults to {@link module:ol/easing.inAndOut}).
	* The function will be called for each frame with a number representing a
	* fraction of the animation's duration.  The function should return a number
	* between 0 and 1 representing the progress toward the destination state.
	* @property {function(boolean):void} [callback] Function called when the view is in
	* its final position. The callback will be called with `true` if the animation
	* series completed on its own or `false` if it was cancelled.
	*/
	/**
	* @typedef {Object} ViewOptions
	* @property {import("./coordinate.js").Coordinate} [center] The initial center for
	* the view. If a user projection is not set, the coordinate system for the center is
	* specified with the `projection` option. Layer sources will not be fetched if this
	* is not set, but the center can be set later with {@link #setCenter}.
	* @property {boolean|number} [constrainRotation=true] Rotation constraint.
	* `false` means no constraint. `true` means no constraint, but snap to zero
	* near zero. A number constrains the rotation to that number of values. For
	* example, `4` will constrain the rotation to 0, 90, 180, and 270 degrees.
	* @property {boolean} [enableRotation=true] Enable rotation.
	* If `false`, a rotation constraint that always sets the rotation to zero is
	* used. The `constrainRotation` option has no effect if `enableRotation` is
	* `false`.
	* @property {import("./extent.js").Extent} [extent] The extent that constrains the
	* view, in other words, nothing outside of this extent can be visible on the map.
	* @property {boolean} [constrainOnlyCenter=false] If true, the extent
	* constraint will only apply to the view center and not the whole extent.
	* @property {boolean} [smoothExtentConstraint=true] If true, the extent
	* constraint will be applied smoothly, i.e. allow the view to go slightly outside
	* of the given `extent`.
	* @property {number} [maxResolution] The maximum resolution used to determine
	* the resolution constraint. It is used together with `minResolution` (or
	* `maxZoom`) and `zoomFactor`. If unspecified it is calculated in such a way
	* that the projection's validity extent fits in a 256x256 px tile. If the
	* projection is Spherical Mercator (the default) then `maxResolution` defaults
	* to `40075016.68557849 / 256 = 156543.03392804097`.
	* @property {number} [minResolution] The minimum resolution used to determine
	* the resolution constraint.  It is used together with `maxResolution` (or
	* `minZoom`) and `zoomFactor`.  If unspecified it is calculated assuming 29
	* zoom levels (with a factor of 2). If the projection is Spherical Mercator
	* (the default) then `minResolution` defaults to
	* `40075016.68557849 / 256 / Math.pow(2, 28) = 0.0005831682455839253`.
	* @property {number} [maxZoom=28] The maximum zoom level used to determine the
	* resolution constraint. It is used together with `minZoom` (or
	* `maxResolution`) and `zoomFactor`.  Note that if `minResolution` is also
	* provided, it is given precedence over `maxZoom`.
	* @property {number} [minZoom=0] The minimum zoom level used to determine the
	* resolution constraint. It is used together with `maxZoom` (or
	* `minResolution`) and `zoomFactor`.  Note that if `maxResolution` is also
	* provided, it is given precedence over `minZoom`.
	* @property {boolean} [multiWorld=false] If `false` the view is constrained so
	* only one world is visible, and you cannot pan off the edge.  If `true` the map
	* may show multiple worlds at low zoom levels.  Only used if the `projection` is
	* global.  Note that if `extent` is also provided it is given precedence.
	* @property {boolean} [constrainResolution=false] If true, the view will always
	* animate to the closest zoom level after an interaction; false means
	* intermediary zoom levels are allowed.
	* @property {boolean} [smoothResolutionConstraint=true] If true, the resolution
	* min/max values will be applied smoothly, i. e. allow the view to exceed slightly
	* the given resolution or zoom bounds.
	* @property {boolean} [showFullExtent=false] Allow the view to be zoomed out to
	* show the full configured extent. By default, when a view is configured with an
	* extent, users will not be able to zoom out so the viewport exceeds the extent in
	* either dimension. This means the full extent may not be visible if the viewport
	* is taller or wider than the aspect ratio of the configured extent. If
	* showFullExtent is true, the user will be able to zoom out so that the viewport
	* exceeds the height or width of the configured extent, but not both, allowing the
	* full extent to be shown.
	* @property {import("./proj.js").ProjectionLike} [projection='EPSG:3857'] The
	* projection. The default is Spherical Mercator.
	* @property {number} [resolution] The initial resolution for the view. The
	* units are `projection` units per pixel (e.g. meters per pixel). An
	* alternative to setting this is to set `zoom`. Layer sources will not be
	* fetched if neither this nor `zoom` are defined, but they can be set later
	* with {@link #setZoom} or {@link #setResolution}.
	* @property {Array<number>} [resolutions] Resolutions that determine the
	* zoom levels if specified. The index in the array corresponds to the zoom level,
	* therefore the resolution values have to be in descending order. It also constrains
	* the resolution by the minimum and maximum value. If set the `maxResolution`,
	* `minResolution`, `minZoom`, `maxZoom`, and `zoomFactor` options are ignored.
	* @property {number} [rotation=0] The initial rotation for the view in radians
	* (positive rotation clockwise, 0 means North).
	* @property {number} [zoom] Only used if `resolution` is not defined. Zoom
	* level used to calculate the initial resolution for the view.
	* @property {number} [zoomFactor=2] The zoom factor used to compute the
	* corresponding resolution.
	* @property {!Array<number>} [padding=[0, 0, 0, 0]] Padding (in css pixels).
	* If the map viewport is partially covered with other content (overlays) along
	* its edges, this setting allows to shift the center of the viewport away from
	* that content. The order of the values is top, right, bottom, left.
	*/
	/**
	* @typedef {Object} AnimationOptions
	* @property {import("./coordinate.js").Coordinate} [center] The center of the view at the end of
	* the animation.
	* @property {number} [zoom] The zoom level of the view at the end of the
	* animation. This takes precedence over `resolution`.
	* @property {number} [resolution] The resolution of the view at the end
	* of the animation.  If `zoom` is also provided, this option will be ignored.
	* @property {number} [rotation] The rotation of the view at the end of
	* the animation.
	* @property {import("./coordinate.js").Coordinate} [anchor] Optional anchor to remain fixed
	* during a rotation or resolution animation.
	* @property {number} [duration=1000] The duration of the animation in milliseconds.
	* @property {function(number):number} [easing] The easing function used
	* during the animation (defaults to {@link module:ol/easing.inAndOut}).
	* The function will be called for each frame with a number representing a
	* fraction of the animation's duration.  The function should return a number
	* between 0 and 1 representing the progress toward the destination state.
	*/
	/**
	* @typedef {Object} State
	* @property {import("./coordinate.js").Coordinate} center Center (in view projection coordinates).
	* @property {import("./proj/Projection.js").default} projection Projection.
	* @property {number} resolution Resolution.
	* @property {import("./coordinate.js").Coordinate} [nextCenter] The next center during an animation series.
	* @property {number} [nextResolution] The next resolution during an animation series.
	* @property {number} [nextRotation] The next rotation during an animation series.
	* @property {number} rotation Rotation.
	* @property {number} zoom Zoom.
	*/
	/**
	* Like {@link import("./Map.js").FrameState}, but just `viewState` and `extent`.
	* @typedef {Object} ViewStateLayerStateExtent
	* @property {State} viewState View state.
	* @property {import("./extent.js").Extent} extent Extent (in user projection coordinates).
	* @property {Array<import("./layer/Layer.js").State>} [layerStatesArray] Layer states.
	*/
	/**
	* Default min zoom level for the map view.
	* @type {number}
	*/
	const DEFAULT_MIN_ZOOM = 0;
	/**
	* @typedef {import("./ObjectEventType.js").Types|'change:center'|'change:resolution'|'change:rotation'} ViewObjectEventTypes
	*/
	/***
	* @template Return
	* @typedef {import("./Observable.js").OnSignature<import("./Observable.js").EventTypes, import("./events/Event.js").default, Return> &
	*   import("./Observable.js").OnSignature<ViewObjectEventTypes, import("./Object.js").ObjectEvent, Return> &
	*   import("./Observable.js").CombinedOnSignature<import("./Observable.js").EventTypes|ViewObjectEventTypes, Return>} ViewOnSignature
	*/
	/**
	* @classdesc
	* A View object represents a simple 2D view of the map.
	*
	* This is the object to act upon to change the center, resolution,
	* and rotation of the map.
	*
	* A View has a `projection`. The projection determines the
	* coordinate system of the center, and its units determine the units of the
	* resolution (projection units per pixel). The default projection is
	* Web Mercator (EPSG:3857).
	*
	* ### The view states
	*
	* A View is determined by three states: `center`, `resolution`,
	* and `rotation`. Each state has a corresponding getter and setter, e.g.
	* `getCenter` and `setCenter` for the `center` state.
	*
	* The `zoom` state is actually not saved on the view: all computations
	* internally use the `resolution` state. Still, the `setZoom` and `getZoom`
	* methods are available, as well as `getResolutionForZoom` and
	* `getZoomForResolution` to switch from one system to the other.
	*
	* ### The constraints
	*
	* `setCenter`, `setResolution` and `setRotation` can be used to change the
	* states of the view, but any constraint defined in the constructor will
	* be applied along the way.
	*
	* A View object can have a *resolution constraint*, a *rotation constraint*
	* and a *center constraint*.
	*
	* The *resolution constraint* typically restricts min/max values and
	* snaps to specific resolutions. It is determined by the following
	* options: `resolutions`, `maxResolution`, `maxZoom` and `zoomFactor`.
	* If `resolutions` is set, the other three options are ignored. See
	* documentation for each option for more information. By default, the view
	* only has a min/max restriction and allow intermediary zoom levels when
	* pinch-zooming for example.
	*
	* The *rotation constraint* snaps to specific angles. It is determined
	* by the following options: `enableRotation` and `constrainRotation`.
	* By default rotation is allowed and its value is snapped to zero when approaching the
	* horizontal.
	*
	* The *center constraint* is determined by the `extent` option. By
	* default the view center is not constrained at all.
	*
	* ### Changing the view state
	*
	* It is important to note that `setZoom`, `setResolution`, `setCenter` and
	* `setRotation` are subject to the above mentioned constraints. As such, it
	* may sometimes not be possible to know in advance the resulting state of the
	* View. For example, calling `setResolution(10)` does not guarantee that
	* `getResolution()` will return `10`.
	*
	* A consequence of this is that, when applying a delta on the view state, one
	* should use `adjustCenter`, `adjustRotation`, `adjustZoom` and `adjustResolution`
	* rather than the corresponding setters. This will let view do its internal
	* computations. Besides, the `adjust*` methods also take an `anchor`
	* argument which allows specifying an origin for the transformation.
	*
	* ### Interacting with the view
	*
	* View constraints are usually only applied when the view is *at rest*, meaning that
	* no interaction or animation is ongoing. As such, if the user puts the view in a
	* state that is not equivalent to a constrained one (e.g. rotating the view when
	* the snap angle is 0), an animation will be triggered at the interaction end to
	* put back the view to a stable state;
	*
	* @api
	* @extends {BaseObject<ViewOptions>}
	*/
	var View = class extends BaseObject {
		/**
		* @param {ViewOptions} [options] View options.
		*/
		constructor(options) {
			super();
			/***
			* @type {ViewOnSignature<import("./events.js").EventsKey>}
			*/
			this.on;
			/***
			* @type {ViewOnSignature<import("./events.js").EventsKey>}
			*/
			this.once;
			/***
			* @type {ViewOnSignature<void>}
			*/
			this.un;
			options = Object.assign({}, options);
			/**
			* @private
			* @type {Array<number>}
			*/
			this.hints_ = [0, 0];
			/**
			* @private
			* @type {Array<Array<Animation>>}
			*/
			this.animations_ = [];
			/**
			* @private
			* @type {number|undefined}
			*/
			this.updateAnimationKey_;
			/**
			* @private
			* @const
			* @type {import("./proj/Projection.js").default}
			*/
			this.projection_ = createProjection(options.projection, "EPSG:3857");
			/**
			* @private
			* @type {import("./size.js").Size}
			*/
			this.viewportSize_ = [100, 100];
			/**
			* @private
			* @type {import("./coordinate.js").Coordinate|undefined}
			*/
			this.targetCenter_ = null;
			/**
			* @private
			* @type {number|undefined}
			*/
			this.targetResolution_;
			/**
			* @private
			* @type {number|undefined}
			*/
			this.targetRotation_;
			/**
			* @private
			* @type {import("./coordinate.js").Coordinate}
			*/
			this.nextCenter_ = null;
			/**
			* @private
			* @type {number}
			*/
			this.nextResolution_;
			/**
			* @private
			* @type {number}
			*/
			this.nextRotation_;
			/**
			* @private
			* @type {import("./coordinate.js").Coordinate|undefined}
			*/
			this.cancelAnchor_ = void 0;
			if (options.projection) disableCoordinateWarning();
			if (options.center) options.center = fromUserCoordinate(options.center, this.projection_);
			if (options.extent) options.extent = fromUserExtent(options.extent, this.projection_);
			this.applyOptions_(options);
		}
		/**
		* Set up the view with the given options.
		* @param {ViewOptions} options View options.
		*/
		applyOptions_(options) {
			const properties = Object.assign({}, options);
			for (const key in ViewProperty_default) delete properties[key];
			this.setProperties(properties, true);
			const resolutionConstraintInfo = createResolutionConstraint(options);
			/**
			* @private
			* @type {number}
			*/
			this.maxResolution_ = resolutionConstraintInfo.maxResolution;
			/**
			* @private
			* @type {number}
			*/
			this.minResolution_ = resolutionConstraintInfo.minResolution;
			/**
			* @private
			* @type {number}
			*/
			this.zoomFactor_ = resolutionConstraintInfo.zoomFactor;
			/**
			* @private
			* @type {Array<number>|undefined}
			*/
			this.resolutions_ = options.resolutions;
			/**
			* @type {Array<number>|undefined}
			* @private
			*/
			this.padding_ = options.padding;
			/**
			* @private
			* @type {number}
			*/
			this.minZoom_ = resolutionConstraintInfo.minZoom;
			const centerConstraint = createCenterConstraint(options);
			const resolutionConstraint = resolutionConstraintInfo.constraint;
			const rotationConstraint = createRotationConstraint(options);
			/**
			* @private
			* @type {Constraints}
			*/
			this.constraints_ = {
				center: centerConstraint,
				resolution: resolutionConstraint,
				rotation: rotationConstraint
			};
			this.setRotation(options.rotation !== void 0 ? options.rotation : 0);
			this.setCenterInternal(options.center !== void 0 ? options.center : null);
			if (options.resolution !== void 0) this.setResolution(options.resolution);
			else if (options.zoom !== void 0) this.setZoom(options.zoom);
		}
		/**
		* Padding (in css pixels).
		* If the map viewport is partially covered with other content (overlays) along
		* its edges, this setting allows to shift the center of the viewport away from that
		* content. The order of the values in the array is top, right, bottom, left.
		* The default is no padding, which is equivalent to `[0, 0, 0, 0]`.
		* @type {Array<number>|undefined}
		* @api
		*/
		get padding() {
			return this.padding_;
		}
		set padding(padding) {
			let oldPadding = this.padding_;
			this.padding_ = padding;
			const center = this.getCenterInternal();
			if (center) {
				const newPadding = padding || [
					0,
					0,
					0,
					0
				];
				oldPadding = oldPadding || [
					0,
					0,
					0,
					0
				];
				const resolution = this.getResolution();
				const offsetX = resolution / 2 * (newPadding[3] - oldPadding[3] + oldPadding[1] - newPadding[1]);
				const offsetY = resolution / 2 * (newPadding[0] - oldPadding[0] + oldPadding[2] - newPadding[2]);
				this.setCenterInternal([center[0] + offsetX, center[1] - offsetY]);
			}
		}
		/**
		* Get an updated version of the view options used to construct the view.  The
		* current resolution (or zoom), center, and rotation are applied to any stored
		* options.  The provided options can be used to apply new min/max zoom or
		* resolution limits.
		* @param {ViewOptions} newOptions New options to be applied.
		* @return {ViewOptions} New options updated with the current view state.
		*/
		getUpdatedOptions_(newOptions) {
			const options = this.getProperties();
			if (options.resolution !== void 0) options.resolution = this.getResolution();
			else options.zoom = this.getZoom();
			options.center = this.getCenterInternal();
			options.rotation = this.getRotation();
			return Object.assign({}, options, newOptions);
		}
		/**
		* Animate the view.  The view's center, zoom (or resolution), and rotation
		* can be animated for smooth transitions between view states.  For example,
		* to animate the view to a new zoom level:
		*
		*     view.animate({zoom: view.getZoom() + 1});
		*
		* By default, the animation lasts one second and uses in-and-out easing.  You
		* can customize this behavior by including `duration` (in milliseconds) and
		* `easing` options (see {@link module:ol/easing}).
		*
		* To chain together multiple animations, call the method with multiple
		* animation objects.  For example, to first zoom and then pan:
		*
		*     view.animate({zoom: 10}, {center: [0, 0]});
		*
		* If you provide a function as the last argument to the animate method, it
		* will get called at the end of an animation series.  The callback will be
		* called with `true` if the animation series completed on its own or `false`
		* if it was cancelled.
		*
		* Animations are cancelled by user interactions (e.g. dragging the map) or by
		* calling `view.setCenter()`, `view.setResolution()`, or `view.setRotation()`
		* (or another method that calls one of these).
		*
		* @param {...(AnimationOptions|function(boolean): void)} var_args Animation
		*     options.  Multiple animations can be run in series by passing multiple
		*     options objects.  To run multiple animations in parallel, call the method
		*     multiple times.  An optional callback can be provided as a final
		*     argument.  The callback will be called with a boolean indicating whether
		*     the animation completed without being cancelled.
		* @api
		*/
		animate(var_args) {
			if (this.isDef() && !this.getAnimating()) this.resolveConstraints(0);
			const args = new Array(arguments.length);
			for (let i = 0; i < args.length; ++i) {
				let options = arguments[i];
				if (options.center) {
					options = Object.assign({}, options);
					options.center = fromUserCoordinate(options.center, this.getProjection());
				}
				if (options.anchor) {
					options = Object.assign({}, options);
					options.anchor = fromUserCoordinate(options.anchor, this.getProjection());
				}
				args[i] = options;
			}
			this.animateInternal.apply(this, args);
		}
		/**
		* @param {...(AnimationOptions|function(boolean): void)} var_args Animation options.
		*/
		animateInternal(var_args) {
			let animationCount = arguments.length;
			let callback;
			if (animationCount > 1 && typeof arguments[animationCount - 1] === "function") {
				callback = arguments[animationCount - 1];
				--animationCount;
			}
			let i = 0;
			for (; i < animationCount && !this.isDef(); ++i) {
				const state = arguments[i];
				if (state.center) this.setCenterInternal(state.center);
				if (state.zoom !== void 0) this.setZoom(state.zoom);
				else if (state.resolution) this.setResolution(state.resolution);
				if (state.rotation !== void 0) this.setRotation(state.rotation);
			}
			if (i === animationCount) {
				if (callback) animationCallback(callback, true);
				return;
			}
			let start = Date.now();
			let center = this.targetCenter_.slice();
			let resolution = this.targetResolution_;
			let rotation = this.targetRotation_;
			const series = [];
			for (; i < animationCount; ++i) {
				const options = arguments[i];
				const animation = {
					start,
					complete: false,
					anchor: options.anchor,
					duration: options.duration !== void 0 ? options.duration : 1e3,
					easing: options.easing || inAndOut,
					callback
				};
				if (options.center) {
					animation.sourceCenter = center;
					animation.targetCenter = options.center.slice();
					center = animation.targetCenter;
				}
				if (options.zoom !== void 0) {
					animation.sourceResolution = resolution;
					animation.targetResolution = this.getResolutionForZoom(options.zoom);
					resolution = animation.targetResolution;
				} else if (options.resolution) {
					animation.sourceResolution = resolution;
					animation.targetResolution = options.resolution;
					resolution = animation.targetResolution;
				}
				if (options.rotation !== void 0) {
					animation.sourceRotation = rotation;
					const delta = modulo(options.rotation - rotation + Math.PI, 2 * Math.PI) - Math.PI;
					animation.targetRotation = rotation + delta;
					rotation = animation.targetRotation;
				}
				if (isNoopAnimation(animation)) animation.complete = true;
				else start += animation.duration;
				series.push(animation);
			}
			this.animations_.push(series);
			this.setHint(ViewHint_default.ANIMATING, 1);
			this.updateAnimations_();
		}
		/**
		* Determine if the view is being animated.
		* @return {boolean} The view is being animated.
		* @api
		*/
		getAnimating() {
			return this.hints_[ViewHint_default.ANIMATING] > 0;
		}
		/**
		* Determine if the user is interacting with the view, such as panning or zooming.
		* @return {boolean} The view is being interacted with.
		* @api
		*/
		getInteracting() {
			return this.hints_[ViewHint_default.INTERACTING] > 0;
		}
		/**
		* Cancel any ongoing animations.
		* @api
		*/
		cancelAnimations() {
			this.setHint(ViewHint_default.ANIMATING, -this.hints_[ViewHint_default.ANIMATING]);
			let anchor;
			for (let i = 0, ii = this.animations_.length; i < ii; ++i) {
				const series = this.animations_[i];
				if (series[0].callback) animationCallback(series[0].callback, false);
				if (!anchor) for (let j = 0, jj = series.length; j < jj; ++j) {
					const animation = series[j];
					if (!animation.complete) {
						anchor = animation.anchor;
						break;
					}
				}
			}
			this.animations_.length = 0;
			this.cancelAnchor_ = anchor;
			this.nextCenter_ = null;
			this.nextResolution_ = NaN;
			this.nextRotation_ = NaN;
		}
		/**
		* Update all animations.
		*/
		updateAnimations_() {
			if (this.updateAnimationKey_ !== void 0) {
				cancelAnimationFrame(this.updateAnimationKey_);
				this.updateAnimationKey_ = void 0;
			}
			if (!this.getAnimating()) return;
			const now = Date.now();
			let more = false;
			for (let i = this.animations_.length - 1; i >= 0; --i) {
				const series = this.animations_[i];
				let seriesComplete = true;
				for (let j = 0, jj = series.length; j < jj; ++j) {
					const animation = series[j];
					if (animation.complete) continue;
					const elapsed = now - animation.start;
					let fraction = animation.duration > 0 ? elapsed / animation.duration : 1;
					if (fraction >= 1) {
						animation.complete = true;
						fraction = 1;
					} else seriesComplete = false;
					const progress = animation.easing(fraction);
					if (animation.sourceCenter) {
						const x0 = animation.sourceCenter[0];
						const y0 = animation.sourceCenter[1];
						const x1 = animation.targetCenter[0];
						const y1 = animation.targetCenter[1];
						this.nextCenter_ = animation.targetCenter;
						const x = x0 + progress * (x1 - x0);
						const y = y0 + progress * (y1 - y0);
						this.targetCenter_ = [x, y];
					}
					if (animation.sourceResolution && animation.targetResolution) {
						const resolution = progress === 1 ? animation.targetResolution : animation.sourceResolution + progress * (animation.targetResolution - animation.sourceResolution);
						if (animation.anchor) {
							const size = this.getViewportSize_(this.getRotation());
							const constrainedResolution = this.constraints_.resolution(resolution, 0, size, true);
							this.targetCenter_ = this.calculateCenterZoom(constrainedResolution, animation.anchor);
						}
						this.nextResolution_ = animation.targetResolution;
						this.targetResolution_ = resolution;
						this.applyTargetState_(true);
					}
					if (animation.sourceRotation !== void 0 && animation.targetRotation !== void 0) {
						const rotation = progress === 1 ? modulo(animation.targetRotation + Math.PI, 2 * Math.PI) - Math.PI : animation.sourceRotation + progress * (animation.targetRotation - animation.sourceRotation);
						if (animation.anchor) {
							const constrainedRotation = this.constraints_.rotation(rotation, true);
							this.targetCenter_ = this.calculateCenterRotate(constrainedRotation, animation.anchor);
						}
						this.nextRotation_ = animation.targetRotation;
						this.targetRotation_ = rotation;
					}
					this.applyTargetState_(true);
					more = true;
					if (!animation.complete) break;
				}
				if (seriesComplete) {
					this.animations_[i] = null;
					this.setHint(ViewHint_default.ANIMATING, -1);
					this.nextCenter_ = null;
					this.nextResolution_ = NaN;
					this.nextRotation_ = NaN;
					const callback = series[0].callback;
					if (callback) animationCallback(callback, true);
				}
			}
			this.animations_ = this.animations_.filter(Boolean);
			if (more && this.updateAnimationKey_ === void 0) this.updateAnimationKey_ = requestAnimationFrame(this.updateAnimations_.bind(this));
		}
		/**
		* @param {number} rotation Target rotation.
		* @param {import("./coordinate.js").Coordinate} anchor Rotation anchor.
		* @return {import("./coordinate.js").Coordinate|undefined} Center for rotation and anchor.
		*/
		calculateCenterRotate(rotation, anchor) {
			let center;
			const currentCenter = this.getCenterInternal();
			if (currentCenter !== void 0) {
				center = [currentCenter[0] - anchor[0], currentCenter[1] - anchor[1]];
				rotate$1(center, rotation - this.getRotation());
				add$2(center, anchor);
			}
			return center;
		}
		/**
		* @param {number} resolution Target resolution.
		* @param {import("./coordinate.js").Coordinate} anchor Zoom anchor.
		* @return {import("./coordinate.js").Coordinate|undefined} Center for resolution and anchor.
		*/
		calculateCenterZoom(resolution, anchor) {
			let center;
			const currentCenter = this.getCenterInternal();
			const currentResolution = this.getResolution();
			if (currentCenter !== void 0 && currentResolution !== void 0) center = [anchor[0] - resolution * (anchor[0] - currentCenter[0]) / currentResolution, anchor[1] - resolution * (anchor[1] - currentCenter[1]) / currentResolution];
			return center;
		}
		/**
		* Returns the current viewport size.
		* @private
		* @param {number} [rotation] Take into account the rotation of the viewport when giving the size
		* @return {import("./size.js").Size} Viewport size or `[100, 100]` when no viewport is found.
		*/
		getViewportSize_(rotation) {
			const size = this.viewportSize_;
			if (rotation) {
				const w = size[0];
				const h = size[1];
				return [Math.abs(w * Math.cos(rotation)) + Math.abs(h * Math.sin(rotation)), Math.abs(w * Math.sin(rotation)) + Math.abs(h * Math.cos(rotation))];
			}
			return size;
		}
		/**
		* Stores the viewport size on the view. The viewport size is not read every time from the DOM
		* to avoid performance hit and layout reflow.
		* This should be done on map size change.
		* Note: the constraints are not resolved during an animation to avoid stopping it
		* @param {import("./size.js").Size} [size] Viewport size; if undefined, [100, 100] is assumed
		*/
		setViewportSize(size) {
			this.viewportSize_ = Array.isArray(size) ? size.slice() : [100, 100];
			if (!this.getAnimating()) this.resolveConstraints(0);
		}
		/**
		* Get the view center.
		* @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
		* @observable
		* @api
		*/
		getCenter() {
			const center = this.getCenterInternal();
			if (!center) return center;
			return toUserCoordinate(center, this.getProjection());
		}
		/**
		* Get the view center without transforming to user projection.
		* @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
		*/
		getCenterInternal() {
			return this.get(ViewProperty_default.CENTER);
		}
		/**
		* @return {Constraints} Constraints.
		*/
		getConstraints() {
			return this.constraints_;
		}
		/**
		* @return {boolean} Resolution constraint is set
		*/
		getConstrainResolution() {
			return this.get("constrainResolution");
		}
		/**
		* @param {Array<number>} [hints] Destination array.
		* @return {Array<number>} Hint.
		*/
		getHints(hints) {
			if (hints !== void 0) {
				hints[0] = this.hints_[0];
				hints[1] = this.hints_[1];
				return hints;
			}
			return this.hints_.slice();
		}
		/**
		* Calculate the extent for the current view state and the passed box size.
		* @param {import("./size.js").Size} [size] The pixel dimensions of the box
		* into which the calculated extent should fit. Defaults to the size of the
		* map the view is associated with.
		* If no map or multiple maps are connected to the view, provide the desired
		* box size (e.g. `map.getSize()`).
		* @return {import("./extent.js").Extent} Extent.
		* @api
		*/
		calculateExtent(size) {
			return toUserExtent(this.calculateExtentInternal(size), this.getProjection());
		}
		/**
		* @param {import("./size.js").Size} [size] Box pixel size. If not provided,
		* the map's last known viewport size will be used.
		* @return {import("./extent.js").Extent} Extent.
		*/
		calculateExtentInternal(size) {
			size = size || this.getViewportSizeMinusPadding_();
			const center = this.getCenterInternal();
			assert(center, "The view center is not defined");
			const resolution = this.getResolution();
			assert(resolution !== void 0, "The view resolution is not defined");
			const rotation = this.getRotation();
			assert(rotation !== void 0, "The view rotation is not defined");
			return getForViewAndSize(center, resolution, rotation, size);
		}
		/**
		* Get the maximum resolution of the view.
		* @return {number} The maximum resolution of the view.
		* @api
		*/
		getMaxResolution() {
			return this.maxResolution_;
		}
		/**
		* Get the minimum resolution of the view.
		* @return {number} The minimum resolution of the view.
		* @api
		*/
		getMinResolution() {
			return this.minResolution_;
		}
		/**
		* Get the maximum zoom level for the view.
		* @return {number} The maximum zoom level.
		* @api
		*/
		getMaxZoom() {
			return this.getZoomForResolution(this.minResolution_);
		}
		/**
		* Set a new maximum zoom level for the view.
		* @param {number} zoom The maximum zoom level.
		* @api
		*/
		setMaxZoom(zoom) {
			this.applyOptions_(this.getUpdatedOptions_({ maxZoom: zoom }));
		}
		/**
		* Get the minimum zoom level for the view.
		* @return {number} The minimum zoom level.
		* @api
		*/
		getMinZoom() {
			return this.getZoomForResolution(this.maxResolution_);
		}
		/**
		* Set a new minimum zoom level for the view.
		* @param {number} zoom The minimum zoom level.
		* @api
		*/
		setMinZoom(zoom) {
			this.applyOptions_(this.getUpdatedOptions_({ minZoom: zoom }));
		}
		/**
		* Set whether the view should allow intermediary zoom levels.
		* @param {boolean} enabled Whether the resolution is constrained.
		* @api
		*/
		setConstrainResolution(enabled) {
			this.applyOptions_(this.getUpdatedOptions_({ constrainResolution: enabled }));
		}
		/**
		* Get the view projection.
		* @return {import("./proj/Projection.js").default} The projection of the view.
		* @api
		*/
		getProjection() {
			return this.projection_;
		}
		/**
		* Get the view resolution.
		* @return {number|undefined} The resolution of the view.
		* @observable
		* @api
		*/
		getResolution() {
			return this.get(ViewProperty_default.RESOLUTION);
		}
		/**
		* Get the resolutions for the view. This returns the array of resolutions
		* passed to the constructor of the View, or undefined if none were given.
		* @return {Array<number>|undefined} The resolutions of the view.
		* @api
		*/
		getResolutions() {
			return this.resolutions_;
		}
		/**
		* Get the resolution for a provided extent (in map units) and size (in pixels).
		* @param {import("./extent.js").Extent} extent Extent.
		* @param {import("./size.js").Size} [size] Box pixel size.
		* @return {number} The resolution at which the provided extent will render at
		*     the given size.
		* @api
		*/
		getResolutionForExtent(extent, size) {
			return this.getResolutionForExtentInternal(fromUserExtent(extent, this.getProjection()), size);
		}
		/**
		* Get the resolution for a provided extent (in map units) and size (in pixels).
		* @param {import("./extent.js").Extent} extent Extent.
		* @param {import("./size.js").Size} [size] Box pixel size.
		* @return {number} The resolution at which the provided extent will render at
		*     the given size.
		*/
		getResolutionForExtentInternal(extent, size) {
			size = size || this.getViewportSizeMinusPadding_();
			const xResolution = getWidth(extent) / size[0];
			const yResolution = getHeight(extent) / size[1];
			return Math.max(xResolution, yResolution);
		}
		/**
		* Return a function that returns a value between 0 and 1 for a
		* resolution. Exponential scaling is assumed.
		* @param {number} [power] Power.
		* @return {function(number): number} Resolution for value function.
		*/
		getResolutionForValueFunction(power) {
			power = power || 2;
			const maxResolution = this.getConstrainedResolution(this.maxResolution_);
			const minResolution = this.minResolution_;
			const max = Math.log(maxResolution / minResolution) / Math.log(power);
			return (
			/**
			* @param {number} value Value.
			* @return {number} Resolution.
			*/
function(value) {
				return maxResolution / Math.pow(power, value * max);
			});
		}
		/**
		* Get the view rotation.
		* @return {number} The rotation of the view in radians.
		* @observable
		* @api
		*/
		getRotation() {
			return this.get(ViewProperty_default.ROTATION);
		}
		/**
		* Return a function that returns a resolution for a value between
		* 0 and 1. Exponential scaling is assumed.
		* @param {number} [power] Power.
		* @return {function(number): number} Value for resolution function.
		*/
		getValueForResolutionFunction(power) {
			const logPower = Math.log(power || 2);
			const maxResolution = this.getConstrainedResolution(this.maxResolution_);
			const minResolution = this.minResolution_;
			const max = Math.log(maxResolution / minResolution) / logPower;
			return (
			/**
			* @param {number} resolution Resolution.
			* @return {number} Value.
			*/
function(resolution) {
				return Math.log(maxResolution / resolution) / logPower / max;
			});
		}
		/**
		* Returns the size of the viewport minus padding.
		* @private
		* @param {number} [rotation] Take into account the rotation of the viewport when giving the size
		* @return {import("./size.js").Size} Viewport size reduced by the padding.
		*/
		getViewportSizeMinusPadding_(rotation) {
			let size = this.getViewportSize_(rotation);
			const padding = this.padding_;
			if (padding) size = [size[0] - padding[1] - padding[3], size[1] - padding[0] - padding[2]];
			return size;
		}
		/**
		* @return {State} View state.
		*/
		getState() {
			const projection = this.getProjection();
			const resolution = this.getResolution();
			const rotation = this.getRotation();
			let center = this.getCenterInternal();
			const padding = this.padding_;
			if (padding) {
				const reducedSize = this.getViewportSizeMinusPadding_();
				center = calculateCenterOn(center, this.getViewportSize_(), [reducedSize[0] / 2 + padding[3], reducedSize[1] / 2 + padding[0]], resolution, rotation);
			}
			return {
				center: center.slice(0),
				projection: projection !== void 0 ? projection : null,
				resolution,
				nextCenter: this.nextCenter_,
				nextResolution: this.nextResolution_,
				nextRotation: this.nextRotation_,
				rotation,
				zoom: this.getZoom()
			};
		}
		/**
		* @return {ViewStateLayerStateExtent} Like `FrameState`, but just `viewState` and `extent`.
		*/
		getViewStateAndExtent() {
			return {
				viewState: this.getState(),
				extent: this.calculateExtent()
			};
		}
		/**
		* Get the current zoom level. This method may return non-integer zoom levels
		* if the view does not constrain the resolution, or if an interaction or
		* animation is underway.
		* @return {number|undefined} Zoom.
		* @api
		*/
		getZoom() {
			let zoom;
			const resolution = this.getResolution();
			if (resolution !== void 0) zoom = this.getZoomForResolution(resolution);
			return zoom;
		}
		/**
		* Get the zoom level for a resolution.
		* @param {number} resolution The resolution.
		* @return {number|undefined} The zoom level for the provided resolution.
		* @api
		*/
		getZoomForResolution(resolution) {
			let offset = this.minZoom_ || 0;
			let max, zoomFactor;
			if (this.resolutions_) {
				const nearest = linearFindNearest(this.resolutions_, resolution, 1);
				offset = nearest;
				max = this.resolutions_[nearest];
				if (nearest == this.resolutions_.length - 1) zoomFactor = 2;
				else zoomFactor = max / this.resolutions_[nearest + 1];
			} else {
				max = this.maxResolution_;
				zoomFactor = this.zoomFactor_;
			}
			return offset + Math.log(max / resolution) / Math.log(zoomFactor);
		}
		/**
		* Get the resolution for a zoom level.
		* @param {number} zoom Zoom level.
		* @return {number} The view resolution for the provided zoom level.
		* @api
		*/
		getResolutionForZoom(zoom) {
			if (this.resolutions_?.length) {
				if (this.resolutions_.length === 1) return this.resolutions_[0];
				const baseLevel = clamp(Math.floor(zoom), 0, this.resolutions_.length - 2);
				const zoomFactor = this.resolutions_[baseLevel] / this.resolutions_[baseLevel + 1];
				return this.resolutions_[baseLevel] / Math.pow(zoomFactor, clamp(zoom - baseLevel, 0, 1));
			}
			return this.maxResolution_ / Math.pow(this.zoomFactor_, zoom - this.minZoom_);
		}
		/**
		* Fit the given geometry or extent based on the given map size and border.
		* The size is pixel dimensions of the box to fit the extent into.
		* In most cases you will want to use the map size, that is `map.getSize()`.
		* Takes care of the map angle.
		* @param {import("./geom/SimpleGeometry.js").default|import("./extent.js").Extent} geometryOrExtent The geometry or
		*     extent to fit the view to.
		* @param {FitOptions} [options] Options.
		* @api
		*/
		fit(geometryOrExtent, options) {
			/** @type {import("./geom/SimpleGeometry.js").default} */
			let geometry;
			assert(Array.isArray(geometryOrExtent) || typeof geometryOrExtent.getSimplifiedGeometry === "function", "Invalid extent or geometry provided as `geometry`");
			if (Array.isArray(geometryOrExtent)) {
				assert(!isEmpty(geometryOrExtent), "Cannot fit empty extent provided as `geometry`");
				geometry = fromExtent(fromUserExtent(geometryOrExtent, this.getProjection()));
			} else if (geometryOrExtent.getType() === "Circle") {
				const extent = fromUserExtent(geometryOrExtent.getExtent(), this.getProjection());
				geometry = fromExtent(extent);
				geometry.rotate(this.getRotation(), getCenter(extent));
			} else {
				const userProjection = getUserProjection();
				if (userProjection) geometry = geometryOrExtent.clone().transform(userProjection, this.getProjection());
				else geometry = geometryOrExtent;
			}
			this.fitInternal(geometry, options);
		}
		/**
		* Calculate rotated extent
		* @param {import("./geom/SimpleGeometry.js").default} geometry The geometry.
		* @return {import("./extent.js").Extent} The rotated extent for the geometry.
		*/
		rotatedExtentForGeometry(geometry) {
			const rotation = this.getRotation();
			const cosAngle = Math.cos(rotation);
			const sinAngle = Math.sin(-rotation);
			const coords = geometry.getFlatCoordinates();
			const stride = geometry.getStride();
			let minRotX = Infinity;
			let minRotY = Infinity;
			let maxRotX = -Infinity;
			let maxRotY = -Infinity;
			for (let i = 0, ii = coords.length; i < ii; i += stride) {
				const rotX = coords[i] * cosAngle - coords[i + 1] * sinAngle;
				const rotY = coords[i] * sinAngle + coords[i + 1] * cosAngle;
				minRotX = Math.min(minRotX, rotX);
				minRotY = Math.min(minRotY, rotY);
				maxRotX = Math.max(maxRotX, rotX);
				maxRotY = Math.max(maxRotY, rotY);
			}
			return [
				minRotX,
				minRotY,
				maxRotX,
				maxRotY
			];
		}
		/**
		* @param {import("./geom/SimpleGeometry.js").default} geometry The geometry.
		* @param {FitOptions} [options] Options.
		*/
		fitInternal(geometry, options) {
			options = options || {};
			let size = options.size;
			if (!size) size = this.getViewportSizeMinusPadding_();
			const padding = options.padding !== void 0 ? options.padding : [
				0,
				0,
				0,
				0
			];
			const nearest = options.nearest !== void 0 ? options.nearest : false;
			let minResolution;
			if (options.minResolution !== void 0) minResolution = options.minResolution;
			else if (options.maxZoom !== void 0) minResolution = this.getResolutionForZoom(options.maxZoom);
			else minResolution = 0;
			const rotatedExtent = this.rotatedExtentForGeometry(geometry);
			let resolution = this.getResolutionForExtentInternal(rotatedExtent, [size[0] - padding[1] - padding[3], size[1] - padding[0] - padding[2]]);
			resolution = isNaN(resolution) ? minResolution : Math.max(resolution, minResolution);
			resolution = this.getConstrainedResolution(resolution, nearest ? 0 : 1);
			const rotation = this.getRotation();
			const sinAngle = Math.sin(rotation);
			const cosAngle = Math.cos(rotation);
			const centerRot = getCenter(rotatedExtent);
			centerRot[0] += (padding[1] - padding[3]) / 2 * resolution;
			centerRot[1] += (padding[0] - padding[2]) / 2 * resolution;
			const centerX = centerRot[0] * cosAngle - centerRot[1] * sinAngle;
			const centerY = centerRot[1] * cosAngle + centerRot[0] * sinAngle;
			const center = this.getConstrainedCenter([centerX, centerY], resolution);
			const callback = options.callback ? options.callback : VOID;
			if (options.duration !== void 0) this.animateInternal({
				resolution,
				center,
				duration: options.duration,
				easing: options.easing
			}, callback);
			else {
				this.targetResolution_ = resolution;
				this.targetCenter_ = center;
				this.applyTargetState_(false, true);
				animationCallback(callback, true);
			}
		}
		/**
		* Center on coordinate and view position.
		* @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
		* @param {import("./size.js").Size} size Box pixel size.
		* @param {import("./pixel.js").Pixel} position Position on the view to center on.
		* @api
		*/
		centerOn(coordinate, size, position) {
			this.centerOnInternal(fromUserCoordinate(coordinate, this.getProjection()), size, position);
		}
		/**
		* @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
		* @param {import("./size.js").Size} size Box pixel size.
		* @param {import("./pixel.js").Pixel} position Position on the view to center on.
		*/
		centerOnInternal(coordinate, size, position) {
			this.setCenterInternal(calculateCenterOn(coordinate, size, position, this.getResolution(), this.getRotation()));
		}
		/**
		* Calculates the shift between map and viewport center.
		* @param {import("./coordinate.js").Coordinate} center Center.
		* @param {number} resolution Resolution.
		* @param {number} rotation Rotation.
		* @param {import("./size.js").Size} size Size.
		* @return {Array<number>|undefined} Center shift.
		*/
		calculateCenterShift(center, resolution, rotation, size) {
			let centerShift;
			const padding = this.padding_;
			if (padding && center) {
				const reducedSize = this.getViewportSizeMinusPadding_(-rotation);
				const shiftedCenter = calculateCenterOn(center, size, [reducedSize[0] / 2 + padding[3], reducedSize[1] / 2 + padding[0]], resolution, rotation);
				centerShift = [center[0] - shiftedCenter[0], center[1] - shiftedCenter[1]];
			}
			return centerShift;
		}
		/**
		* @return {boolean} Is defined.
		*/
		isDef() {
			return !!this.getCenterInternal() && this.getResolution() !== void 0;
		}
		/**
		* Adds relative coordinates to the center of the view. Any extent constraint will apply.
		* @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
		* @api
		*/
		adjustCenter(deltaCoordinates) {
			const center = toUserCoordinate(this.targetCenter_, this.getProjection());
			this.setCenter([center[0] + deltaCoordinates[0], center[1] + deltaCoordinates[1]]);
		}
		/**
		* Adds relative coordinates to the center of the view. Any extent constraint will apply.
		* @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
		*/
		adjustCenterInternal(deltaCoordinates) {
			const center = this.targetCenter_;
			this.setCenterInternal([center[0] + deltaCoordinates[0], center[1] + deltaCoordinates[1]]);
		}
		/**
		* Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
		* constraint will apply.
		* @param {number} ratio The ratio to apply on the view resolution.
		* @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
		* @api
		*/
		adjustResolution(ratio, anchor) {
			anchor = anchor && fromUserCoordinate(anchor, this.getProjection());
			this.adjustResolutionInternal(ratio, anchor);
		}
		/**
		* Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
		* constraint will apply.
		* @param {number} ratio The ratio to apply on the view resolution.
		* @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
		*/
		adjustResolutionInternal(ratio, anchor) {
			const isMoving = this.getAnimating() || this.getInteracting();
			const size = this.getViewportSize_(this.getRotation());
			const newResolution = this.constraints_.resolution(this.targetResolution_ * ratio, 0, size, isMoving);
			if (anchor) this.targetCenter_ = this.calculateCenterZoom(newResolution, anchor);
			this.targetResolution_ *= ratio;
			this.applyTargetState_();
		}
		/**
		* Adds a value to the view zoom level, optionally using an anchor. Any resolution
		* constraint will apply.
		* @param {number} delta Relative value to add to the zoom level.
		* @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
		* @api
		*/
		adjustZoom(delta, anchor) {
			this.adjustResolution(Math.pow(this.zoomFactor_, -delta), anchor);
		}
		/**
		* Adds a value to the view rotation, optionally using an anchor. Any rotation
		* constraint will apply.
		* @param {number} delta Relative value to add to the zoom rotation, in radians.
		* @param {import("./coordinate.js").Coordinate} [anchor] The rotation center.
		* @api
		*/
		adjustRotation(delta, anchor) {
			if (anchor) anchor = fromUserCoordinate(anchor, this.getProjection());
			this.adjustRotationInternal(delta, anchor);
		}
		/**
		* @param {number} delta Relative value to add to the zoom rotation, in radians.
		* @param {import("./coordinate.js").Coordinate} [anchor] The rotation center.
		*/
		adjustRotationInternal(delta, anchor) {
			const isMoving = this.getAnimating() || this.getInteracting();
			const newRotation = this.constraints_.rotation(this.targetRotation_ + delta, isMoving);
			if (anchor) this.targetCenter_ = this.calculateCenterRotate(newRotation, anchor);
			this.targetRotation_ += delta;
			this.applyTargetState_();
		}
		/**
		* Set the center of the current view. Any extent constraint will apply.
		* @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
		* @observable
		* @api
		*/
		setCenter(center) {
			this.setCenterInternal(center ? fromUserCoordinate(center, this.getProjection()) : center);
		}
		/**
		* Set the center using the view projection (not the user projection).
		* @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
		*/
		setCenterInternal(center) {
			this.targetCenter_ = center;
			this.applyTargetState_();
		}
		/**
		* @param {import("./ViewHint.js").default} hint Hint.
		* @param {number} delta Delta.
		* @return {number} New value.
		*/
		setHint(hint, delta) {
			this.hints_[hint] += delta;
			this.changed();
			return this.hints_[hint];
		}
		/**
		* Set the resolution for this view. Any resolution constraint will apply.
		* @param {number|undefined} resolution The resolution of the view.
		* @observable
		* @api
		*/
		setResolution(resolution) {
			this.targetResolution_ = resolution;
			this.applyTargetState_();
		}
		/**
		* Set the rotation for this view. Any rotation constraint will apply.
		* @param {number} rotation The rotation of the view in radians.
		* @observable
		* @api
		*/
		setRotation(rotation) {
			this.targetRotation_ = rotation;
			this.applyTargetState_();
		}
		/**
		* Zoom to a specific zoom level. Any resolution constrain will apply.
		* @param {number} zoom Zoom level.
		* @api
		*/
		setZoom(zoom) {
			this.setResolution(this.getResolutionForZoom(zoom));
		}
		/**
		* Recompute rotation/resolution/center based on target values.
		* Note: we have to compute rotation first, then resolution and center considering that
		* parameters can influence one another in case a view extent constraint is present.
		* @param {boolean} [doNotCancelAnims] Do not cancel animations.
		* @param {boolean} [forceMoving] Apply constraints as if the view is moving.
		* @private
		*/
		applyTargetState_(doNotCancelAnims, forceMoving) {
			const isMoving = this.getAnimating() || this.getInteracting() || forceMoving;
			const newRotation = this.constraints_.rotation(this.targetRotation_, isMoving);
			const size = this.getViewportSize_(newRotation);
			const newResolution = this.constraints_.resolution(this.targetResolution_, 0, size, isMoving);
			const newCenter = this.constraints_.center(this.targetCenter_, newResolution, size, isMoving, this.calculateCenterShift(this.targetCenter_, newResolution, newRotation, size));
			if (this.get(ViewProperty_default.ROTATION) !== newRotation) this.set(ViewProperty_default.ROTATION, newRotation);
			if (this.get(ViewProperty_default.RESOLUTION) !== newResolution) {
				this.set(ViewProperty_default.RESOLUTION, newResolution);
				this.set("zoom", this.getZoom(), true);
			}
			if (!newCenter || !this.get(ViewProperty_default.CENTER) || !equals(this.get(ViewProperty_default.CENTER), newCenter)) this.set(ViewProperty_default.CENTER, newCenter);
			if (this.getAnimating() && !doNotCancelAnims) this.cancelAnimations();
			this.cancelAnchor_ = void 0;
		}
		/**
		* If any constraints need to be applied, an animation will be triggered.
		* This is typically done on interaction end.
		* Note: calling this with a duration of 0 will apply the constrained values straight away,
		* without animation.
		* @param {number} [duration] The animation duration in ms.
		* @param {number} [resolutionDirection] Which direction to zoom.
		* @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
		*/
		resolveConstraints(duration, resolutionDirection, anchor) {
			duration = duration !== void 0 ? duration : 200;
			const direction = resolutionDirection || 0;
			const newRotation = this.constraints_.rotation(this.targetRotation_);
			const size = this.getViewportSize_(newRotation);
			const newResolution = this.constraints_.resolution(this.targetResolution_, direction, size);
			const newCenter = this.constraints_.center(this.targetCenter_, newResolution, size, false, this.calculateCenterShift(this.targetCenter_, newResolution, newRotation, size));
			if (duration === 0 && !this.cancelAnchor_) {
				this.targetResolution_ = newResolution;
				this.targetRotation_ = newRotation;
				this.targetCenter_ = newCenter;
				this.applyTargetState_();
				return;
			}
			anchor = anchor || (duration === 0 ? this.cancelAnchor_ : void 0);
			this.cancelAnchor_ = void 0;
			if (this.getResolution() !== newResolution || this.getRotation() !== newRotation || !this.getCenterInternal() || !equals(this.getCenterInternal(), newCenter)) {
				if (this.getAnimating()) this.cancelAnimations();
				this.animateInternal({
					rotation: newRotation,
					center: newCenter,
					resolution: newResolution,
					duration,
					easing: easeOut,
					anchor
				});
			}
		}
		/**
		* Notify the View that an interaction has started.
		* The view state will be resolved to a stable one if needed
		* (depending on its constraints).
		* @api
		*/
		beginInteraction() {
			this.resolveConstraints(0);
			this.setHint(ViewHint_default.INTERACTING, 1);
		}
		/**
		* Notify the View that an interaction has ended. The view state will be resolved
		* to a stable one if needed (depending on its constraints).
		* @param {number} [duration] Animation duration in ms.
		* @param {number} [resolutionDirection] Which direction to zoom.
		* @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
		* @api
		*/
		endInteraction(duration, resolutionDirection, anchor) {
			anchor = anchor && fromUserCoordinate(anchor, this.getProjection());
			this.endInteractionInternal(duration, resolutionDirection, anchor);
		}
		/**
		* Notify the View that an interaction has ended. The view state will be resolved
		* to a stable one if needed (depending on its constraints).
		* @param {number} [duration] Animation duration in ms.
		* @param {number} [resolutionDirection] Which direction to zoom.
		* @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
		*/
		endInteractionInternal(duration, resolutionDirection, anchor) {
			if (!this.getInteracting()) return;
			this.setHint(ViewHint_default.INTERACTING, -1);
			this.resolveConstraints(duration, resolutionDirection, anchor);
		}
		/**
		* Get a valid position for the view center according to the current constraints.
		* @param {import("./coordinate.js").Coordinate|undefined} targetCenter Target center position.
		* @param {number} [targetResolution] Target resolution. If not supplied, the current one will be used.
		* This is useful to guess a valid center position at a different zoom level.
		* @return {import("./coordinate.js").Coordinate|undefined} Valid center position.
		*/
		getConstrainedCenter(targetCenter, targetResolution) {
			const size = this.getViewportSize_(this.getRotation());
			return this.constraints_.center(targetCenter, targetResolution || this.getResolution(), size);
		}
		/**
		* Get a valid zoom level according to the current view constraints.
		* @param {number|undefined} targetZoom Target zoom.
		* @param {number} [direction] Indicate which resolution should be used
		* by a renderer if the view resolution does not match any resolution of the tile source.
		* If 0, the nearest resolution will be used. If 1, the nearest lower resolution
		* will be used. If -1, the nearest higher resolution will be used.
		* @return {number|undefined} Valid zoom level.
		*/
		getConstrainedZoom(targetZoom, direction) {
			const targetRes = this.getResolutionForZoom(targetZoom);
			return this.getZoomForResolution(this.getConstrainedResolution(targetRes, direction));
		}
		/**
		* Get a valid resolution according to the current view constraints.
		* @param {number|undefined} targetResolution Target resolution.
		* @param {number} [direction] Indicate which resolution should be used
		* by a renderer if the view resolution does not match any resolution of the tile source.
		* If 0, the nearest resolution will be used. If 1, the nearest lower resolution
		* will be used. If -1, the nearest higher resolution will be used.
		* @return {number|undefined} Valid resolution.
		*/
		getConstrainedResolution(targetResolution, direction) {
			direction = direction || 0;
			const size = this.getViewportSize_(this.getRotation());
			return this.constraints_.resolution(targetResolution, direction, size);
		}
	};
	/**
	* @param {Function} callback Callback.
	* @param {*} returnValue Return value.
	*/
	function animationCallback(callback, returnValue) {
		setTimeout(function() {
			callback(returnValue);
		}, 0);
	}
	/**
	* @param {ViewOptions} options View options.
	* @return {import("./centerconstraint.js").Type} The constraint.
	*/
	function createCenterConstraint(options) {
		if (options.extent !== void 0) {
			const smooth = options.smoothExtentConstraint !== void 0 ? options.smoothExtentConstraint : true;
			return createExtent(options.extent, options.constrainOnlyCenter, smooth);
		}
		const projection = createProjection(options.projection, "EPSG:3857");
		if (options.multiWorld !== true && projection.isGlobal()) {
			const extent = projection.getExtent().slice();
			extent[0] = -Infinity;
			extent[2] = Infinity;
			return createExtent(extent, false, false);
		}
		return none$1;
	}
	/**
	* @param {ViewOptions} options View options.
	* @return {{constraint: import("./resolutionconstraint.js").Type, maxResolution: number,
	*     minResolution: number, minZoom: number, zoomFactor: number}} The constraint.
	*/
	function createResolutionConstraint(options) {
		let resolutionConstraint;
		let maxResolution;
		let minResolution;
		const defaultMaxZoom = 28;
		const defaultZoomFactor = 2;
		let minZoom = options.minZoom !== void 0 ? options.minZoom : DEFAULT_MIN_ZOOM;
		let maxZoom = options.maxZoom !== void 0 ? options.maxZoom : defaultMaxZoom;
		const zoomFactor = options.zoomFactor !== void 0 ? options.zoomFactor : defaultZoomFactor;
		const multiWorld = options.multiWorld !== void 0 ? options.multiWorld : false;
		const smooth = options.smoothResolutionConstraint !== void 0 ? options.smoothResolutionConstraint : true;
		const showFullExtent = options.showFullExtent !== void 0 ? options.showFullExtent : false;
		const projection = createProjection(options.projection, "EPSG:3857");
		const projExtent = projection.getExtent();
		let constrainOnlyCenter = options.constrainOnlyCenter;
		let extent = options.extent;
		if (!multiWorld && !extent && projection.isGlobal()) {
			constrainOnlyCenter = false;
			extent = projExtent;
		}
		if (options.resolutions !== void 0) {
			const resolutions = options.resolutions;
			maxResolution = resolutions[minZoom];
			minResolution = resolutions[maxZoom] !== void 0 ? resolutions[maxZoom] : resolutions[resolutions.length - 1];
			if (options.constrainResolution) resolutionConstraint = createSnapToResolutions(resolutions, smooth, !constrainOnlyCenter && extent, showFullExtent);
			else resolutionConstraint = createMinMaxResolution(maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
		} else {
			const defaultMaxResolution = (!projExtent ? 360 * METERS_PER_UNIT$1.degrees / projection.getMetersPerUnit() : Math.max(getWidth(projExtent), getHeight(projExtent))) / 256 / Math.pow(defaultZoomFactor, DEFAULT_MIN_ZOOM);
			const defaultMinResolution = defaultMaxResolution / Math.pow(defaultZoomFactor, defaultMaxZoom - DEFAULT_MIN_ZOOM);
			maxResolution = options.maxResolution;
			if (maxResolution !== void 0) minZoom = 0;
			else maxResolution = defaultMaxResolution / Math.pow(zoomFactor, minZoom);
			minResolution = options.minResolution;
			if (minResolution === void 0) if (options.maxZoom !== void 0) if (options.maxResolution !== void 0) minResolution = maxResolution / Math.pow(zoomFactor, maxZoom);
			else minResolution = defaultMaxResolution / Math.pow(zoomFactor, maxZoom);
			else minResolution = defaultMinResolution;
			maxZoom = minZoom + Math.floor(Math.log(maxResolution / minResolution) / Math.log(zoomFactor));
			minResolution = maxResolution / Math.pow(zoomFactor, maxZoom - minZoom);
			if (options.constrainResolution) resolutionConstraint = createSnapToPower(zoomFactor, maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
			else resolutionConstraint = createMinMaxResolution(maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
		}
		return {
			constraint: resolutionConstraint,
			maxResolution,
			minResolution,
			minZoom,
			zoomFactor
		};
	}
	/**
	* @param {ViewOptions} options View options.
	* @return {import("./rotationconstraint.js").Type} Rotation constraint.
	*/
	function createRotationConstraint(options) {
		if (options.enableRotation !== void 0 ? options.enableRotation : true) {
			const constrainRotation = options.constrainRotation;
			if (constrainRotation === void 0 || constrainRotation === true) return createSnapToZero();
			if (constrainRotation === false) return none;
			if (typeof constrainRotation === "number") return createSnapToN(constrainRotation);
			return none;
		}
		return disable;
	}
	/**
	* Determine if an animation involves no view change.
	* @param {Animation} animation The animation.
	* @return {boolean} The animation involves no view change.
	*/
	function isNoopAnimation(animation) {
		if (animation.sourceCenter && animation.targetCenter) {
			if (!equals(animation.sourceCenter, animation.targetCenter)) return false;
		}
		if (animation.sourceResolution !== animation.targetResolution) return false;
		if (animation.sourceRotation !== animation.targetRotation) return false;
		return true;
	}
	/**
	* @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
	* @param {import("./size.js").Size} size Box pixel size.
	* @param {import("./pixel.js").Pixel} position Position on the view to center on.
	* @param {number} resolution Resolution.
	* @param {number} rotation Rotation.
	* @return {import("./coordinate.js").Coordinate} Shifted center.
	*/
	function calculateCenterOn(coordinate, size, position, resolution, rotation) {
		const cosAngle = Math.cos(-rotation);
		let sinAngle = Math.sin(-rotation);
		let rotX = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
		let rotY = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
		rotX += (size[0] / 2 - position[0]) * resolution;
		rotY += (position[1] - size[1] / 2) * resolution;
		sinAngle = -sinAngle;
		return [rotX * cosAngle - rotY * sinAngle, rotY * cosAngle + rotX * sinAngle];
	}
	//#endregion
	//#region src/ol/css.js
	/**
	* @module ol/css
	*/
	/**
	* @typedef {Object} FontParameters
	* @property {string} style Style.
	* @property {string} variant Variant.
	* @property {string} weight Weight.
	* @property {string} size Size.
	* @property {string} lineHeight LineHeight.
	* @property {string} family Family.
	* @property {Array<string>} families Families.
	*/
	/**
	* The CSS class for hidden feature.
	*
	* @const
	* @type {string}
	*/
	const CLASS_HIDDEN = "ol-hidden";
	/**
	* The CSS class that we'll give the DOM elements that are collapsed, i.e.
	* to those elements which usually can be expanded.
	*
	* @const
	* @type {string}
	*/
	const CLASS_COLLAPSED = "ol-collapsed";
	new RegExp([
		"^\\s*(?=(?:(?:[-a-z]+\\s*){0,2}(italic|oblique))?)",
		"(?=(?:(?:[-a-z]+\\s*){0,2}(small-caps))?)",
		"(?=(?:(?:[-a-z]+\\s*){0,2}(bold(?:er)?|lighter|[1-9]00 ))?)",
		"(?:(?:normal|\\1|\\2|\\3)\\s*){0,3}((?:xx?-)?",
		"(?:small|large)|medium|smaller|larger|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx]))",
		"(?:\\s*\\/\\s*(normal|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx])?))",
		"?\\s*([-,\\\"\\'\\sa-z0-9]+?)\\s*$"
	].join(""), "i");
	//#endregion
	//#region src/ol/dom.js
	/**
	* @module ol/dom
	*/
	/**
	* @typedef {Object} ImageAttributes
	* @property {string|null} [crossOrigin] Cross origin.
	* @property {ReferrerPolicy} [referrerPolicy]  Referrer policy.
	*/
	/**
	* Create an html canvas element and returns its 2d context.
	* @param {number} [width] Canvas width.
	* @param {number} [height] Canvas height.
	* @param {Array<HTMLCanvasElement|OffscreenCanvas>} [canvasPool] Canvas pool to take existing canvas from.
	* @param {CanvasRenderingContext2DSettings} [settings] CanvasRenderingContext2DSettings
	* @return {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} The context.
	*/
	function createCanvasContext2D(width, height, canvasPool, settings) {
		/** @type {HTMLCanvasElement|OffscreenCanvas} */
		let canvas;
		if (canvasPool && canvasPool.length) canvas = canvasPool.shift();
		else if (WORKER_OFFSCREEN_CANVAS) canvas = new class extends OffscreenCanvas {
			style = {};
		}(width ?? 300, height ?? 150);
		else canvas = document.createElement("canvas");
		if (width) canvas.width = width;
		if (height) canvas.height = height;
		return canvas.getContext("2d", settings);
	}
	/**
	* @type {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D}
	*/
	let sharedCanvasContext;
	/**
	* @return {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} Shared canvas context.
	*/
	function getSharedCanvasContext2D() {
		if (!sharedCanvasContext) sharedCanvasContext = createCanvasContext2D(1, 1);
		return sharedCanvasContext;
	}
	/**
	* Releases canvas memory to avoid exceeding memory limits in Safari.
	* See https://pqina.nl/blog/total-canvas-memory-use-exceeds-the-maximum-limit/
	* @param {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} context Context.
	*/
	function releaseCanvas(context) {
		const canvas = context.canvas;
		canvas.width = 1;
		canvas.height = 1;
		context.clearRect(0, 0, 1, 1);
	}
	/**
	* @param {Node} newNode Node to replace old node
	* @param {Node} oldNode The node to be replaced
	*/
	function replaceNode(newNode, oldNode) {
		const parent = oldNode.parentNode;
		if (parent) parent.replaceChild(newNode, oldNode);
	}
	/**
	* @param {Node} node The node to remove the children from.
	*/
	function removeChildren(node) {
		while (node.lastChild) node.lastChild.remove();
	}
	/**
	* Transform the children of a parent node so they match the
	* provided list of children.  This function aims to efficiently
	* remove, add, and reorder child nodes while maintaining a simple
	* implementation (it is not guaranteed to minimize DOM operations).
	* @param {Node} node The parent node whose children need reworking.
	* @param {Array<Node>} children The desired children.
	*/
	function replaceChildren(node, children) {
		const oldChildren = node.childNodes;
		for (let i = 0;; ++i) {
			const oldChild = oldChildren[i];
			const newChild = children[i];
			if (!oldChild && !newChild) break;
			if (oldChild === newChild) continue;
			if (!oldChild) {
				node.appendChild(newChild);
				continue;
			}
			if (!newChild) {
				node.removeChild(oldChild);
				--i;
				continue;
			}
			node.insertBefore(newChild, oldChild);
		}
	}
	/**
	* Creates a minimal structure that mocks a DIV to be used by the composite and
	* layer renderer in a worker environment
	* @return {HTMLDivElement} mocked DIV
	*/
	function createMockDiv() {
		return new Proxy({
			/**
			* @type {Array<HTMLElement>}
			*/
			childNodes: [],
			/**
			* @param {HTMLElement} node html node.
			* @return {HTMLElement} html node.
			*/
			appendChild: function(node) {
				this.childNodes.push(node);
				return node;
			},
			/**
			* dummy function, as this structure is not supposed to have a parent.
			*/
			remove: function() {},
			/**
			* @param {HTMLElement} node html node.
			* @return {HTMLElement} html node.
			*/
			removeChild: function(node) {
				const index = this.childNodes.indexOf(node);
				if (index === -1) throw new Error("Node to remove was not found");
				this.childNodes.splice(index, 1);
				return node;
			},
			/**
			* @param {HTMLElement} newNode new html node.
			* @param {HTMLElement} referenceNode reference html node.
			* @return {HTMLElement} new html node.
			*/
			insertBefore: function(newNode, referenceNode) {
				const index = this.childNodes.indexOf(referenceNode);
				if (index === -1) throw new Error("Reference node not found");
				this.childNodes.splice(index, 0, newNode);
				return newNode;
			},
			style: {}
		}, { get(target, prop, receiver) {
			if (prop === "firstElementChild") return target.childNodes.length > 0 ? target.childNodes[0] : null;
			return Reflect.get(target, prop, receiver);
		} });
	}
	/***
	* @param {*} obj The object to check.
	* @return {obj is (HTMLCanvasElement | OffscreenCanvas)} The object is a canvas.
	*/
	function isCanvas(obj) {
		return typeof HTMLCanvasElement !== "undefined" && obj instanceof HTMLCanvasElement || typeof OffscreenCanvas !== "undefined" && obj instanceof OffscreenCanvas;
	}
	//#endregion
	//#region src/ol/control/Control.js
	/**
	* @module ol/control/Control
	*/
	/**
	* @typedef {Object} Options
	* @property {HTMLElement} [element] The element is the control's
	* container element. This only needs to be specified if you're developing
	* a custom control.
	* @property {function(import("../MapEvent.js").default):void} [render] Function called when
	* the control should be re-rendered. This is called in a `requestAnimationFrame`
	* callback.
	* @property {HTMLElement|string} [target] Specify a target if you want
	* the control to be rendered outside of the map's viewport.
	*/
	/**
	* @classdesc
	* A control is a visible widget with a DOM element in a fixed position on the
	* screen. They can involve user input (buttons), or be informational only;
	* the position is determined using CSS. By default these are placed in the
	* container with CSS class name `ol-overlaycontainer-stopevent`, but can use
	* any outside DOM element.
	*
	* This is the base class for controls. You can use it for simple custom
	* controls by creating the element with listeners, creating an instance:
	* ```js
	* const myControl = new Control({element: myElement});
	* ```
	* and then adding this to the map.
	*
	* The main advantage of having this as a control rather than a simple separate
	* DOM element is that preventing propagation is handled for you. Controls
	* will also be objects in a {@link module:ol/Collection~Collection}, so you can use their methods.
	*
	* You can also extend this base for your own control class. See
	* examples/custom-controls for an example of how to do this.
	*
	* @api
	*/
	var Control = class extends BaseObject {
		/**
		* @param {Options} options Control options.
		*/
		constructor(options) {
			super();
			const element = options.element;
			if (element && !options.target && !element.style.pointerEvents) element.style.pointerEvents = "auto";
			/**
			* @protected
			* @type {HTMLElement}
			*/
			this.element = element ? element : null;
			/**
			* @private
			* @type {HTMLElement}
			*/
			this.target_ = null;
			/**
			* @private
			* @type {import("../Map.js").default|null}
			*/
			this.map_ = null;
			/**
			* @protected
			* @type {!Array<import("../events.js").EventsKey>}
			*/
			this.listenerKeys = [];
			if (options.render) this.render = options.render;
			if (options.target) this.setTarget(options.target);
		}
		/**
		* Clean up.
		* @override
		*/
		disposeInternal() {
			this.element?.remove();
			super.disposeInternal();
		}
		/**
		* Get the map associated with this control.
		* @return {import("../Map.js").default|null} Map.
		* @api
		*/
		getMap() {
			return this.map_;
		}
		/**
		* Remove the control from its current map and attach it to the new map.
		* Pass `null` to just remove the control from the current map.
		* Subclasses may set up event handlers to get notified about changes to
		* the map here.
		* @param {import("../Map.js").default|null} map Map.
		* @api
		*/
		setMap(map) {
			if (this.map_) this.element?.remove();
			for (let i = 0, ii = this.listenerKeys.length; i < ii; ++i) unlistenByKey(this.listenerKeys[i]);
			this.listenerKeys.length = 0;
			this.map_ = map;
			if (map) {
				const target = this.target_ ?? map.getOverlayContainerStopEvent();
				if (this.element) target.appendChild(this.element);
				if (this.render !== VOID) this.listenerKeys.push(listen(map, MapEventType_default.POSTRENDER, this.render, this));
				map.render();
			}
		}
		/**
		* Renders the control.
		* @param {import("../MapEvent.js").default} mapEvent Map event.
		* @api
		*/
		render(mapEvent) {}
		/**
		* This function is used to set a target element for the control. It has no
		* effect if it is called after the control has been added to the map (i.e.
		* after `setMap` is called on the control). If no `target` is set in the
		* options passed to the control constructor and if `setTarget` is not called
		* then the control is added to the map's overlay container.
		* @param {HTMLElement|string} target Target.
		* @api
		*/
		setTarget(target) {
			this.target_ = typeof target === "string" ? document.getElementById(target) : target;
		}
	};
	//#endregion
	//#region src/ol/control/Attribution.js
	/**
	* @module ol/control/Attribution
	*/
	/**
	* @typedef {Object} Options
	* @property {string} [className='ol-attribution'] CSS class name.
	* @property {HTMLElement|string} [target] Specify a target if you
	* want the control to be rendered outside of the map's
	* viewport.
	* @property {boolean} [collapsible] Specify if attributions can
	* be collapsed. If not specified, sources control this behavior with their
	* `attributionsCollapsible` setting.
	* @property {boolean} [collapsed=true] Specify if attributions should
	* be collapsed at startup.
	* @property {string} [tipLabel='Attributions'] Text label to use for the button tip.
	* @property {string|HTMLElement} [label='i'] Text label to use for the
	* collapsed attributions button.
	* Instead of text, also an element (e.g. a `span` element) can be used.
	* @property {string} [expandClassName=className + '-expand'] CSS class name for the
	* collapsed attributions button.
	* @property {string|HTMLElement} [collapseLabel='›'] Text label to use
	* for the expanded attributions button.
	* Instead of text, also an element (e.g. a `span` element) can be used.
	* @property {string} [collapseClassName=className + '-collapse'] CSS class name for the
	* expanded attributions button.
	* @property {function(import("../MapEvent.js").default):void} [render] Function called when
	* the control should be re-rendered. This is called in a `requestAnimationFrame`
	* callback.
	* @property {string|Array<string>|undefined} [attributions] Optional attribution(s) that will always be
	* displayed regardless of the layers rendered.
	* **Caution:** Attributions are rendered dynamically using `innerHTML`, which can lead to potential
	* [**XSS (Cross-Site Scripting)**](https://en.wikipedia.org/wiki/Cross-site_scripting) vulnerabilities.
	* Use this feature only for trusted content
	* or ensure that the content is properly sanitized before inserting it.
	*/
	/**
	* @classdesc
	* Control to show all the attributions associated with the layer sources
	* in the map. This control is one of the default controls included in maps.
	* By default it will show in the bottom right portion of the map, but this can
	* be changed by using a css selector for `.ol-attribution`.
	*
	* @api
	*/
	var Attribution = class extends Control {
		/**
		* @param {Options} [options] Attribution options.
		*/
		constructor(options) {
			options = options ? options : {};
			super({
				element: document.createElement("div"),
				render: options.render,
				target: options.target
			});
			/**
			* @private
			* @type {HTMLElement}
			*/
			this.ulElement_ = document.createElement("ul");
			/**
			* @private
			* @type {boolean}
			*/
			this.collapsed_ = options.collapsed !== void 0 ? options.collapsed : true;
			/**
			* @private
			* @type {boolean}
			*/
			this.userCollapsed_ = this.collapsed_;
			/**
			* @private
			* @type {boolean}
			*/
			this.overrideCollapsible_ = options.collapsible !== void 0;
			/**
			* @private
			* @type {boolean}
			*/
			this.collapsible_ = options.collapsible !== void 0 ? options.collapsible : true;
			if (!this.collapsible_) this.collapsed_ = false;
			/**
			* @private
			* @type {string | Array<string> | undefined}
			*/
			this.attributions_ = options.attributions;
			const className = options.className !== void 0 ? options.className : "ol-attribution";
			const tipLabel = options.tipLabel !== void 0 ? options.tipLabel : "Attributions";
			const expandClassName = options.expandClassName !== void 0 ? options.expandClassName : className + "-expand";
			const collapseLabel = options.collapseLabel !== void 0 ? options.collapseLabel : "›";
			const collapseClassName = options.collapseClassName !== void 0 ? options.collapseClassName : className + "-collapse";
			if (typeof collapseLabel === "string") {
				/**
				* @private
				* @type {HTMLElement}
				*/
				this.collapseLabel_ = document.createElement("span");
				this.collapseLabel_.textContent = collapseLabel;
				this.collapseLabel_.className = collapseClassName;
			} else this.collapseLabel_ = collapseLabel;
			const label = options.label !== void 0 ? options.label : "i";
			if (typeof label === "string") {
				/**
				* @private
				* @type {HTMLElement}
				*/
				this.label_ = document.createElement("span");
				this.label_.textContent = label;
				this.label_.className = expandClassName;
			} else this.label_ = label;
			const activeLabel = this.collapsible_ && !this.collapsed_ ? this.collapseLabel_ : this.label_;
			/**
			* @private
			* @type {HTMLElement}
			*/
			this.toggleButton_ = document.createElement("button");
			this.toggleButton_.setAttribute("type", "button");
			this.toggleButton_.setAttribute("aria-expanded", String(!this.collapsed_));
			this.toggleButton_.title = tipLabel;
			this.toggleButton_.appendChild(activeLabel);
			this.toggleButton_.addEventListener(EventType_default$2.CLICK, this.handleClick_.bind(this), false);
			const cssClasses = className + " ol-unselectable ol-control" + (this.collapsed_ && this.collapsible_ ? " ol-collapsed" : "") + (this.collapsible_ ? "" : " ol-uncollapsible");
			const element = this.element;
			element.className = cssClasses;
			element.appendChild(this.toggleButton_);
			element.appendChild(this.ulElement_);
			/**
			* A list of currently rendered resolutions.
			* @type {Array<string>}
			* @private
			*/
			this.renderedAttributions_ = [];
			/**
			* @private
			* @type {boolean}
			*/
			this.renderedVisible_ = true;
		}
		/**
		* Collect a list of visible attributions and set the collapsible state.
		* @param {import("../Map.js").FrameState} frameState Frame state.
		* @return {Array<string>} Attributions.
		* @private
		*/
		collectSourceAttributions_(frameState) {
			const layers = this.getMap().getAllLayers();
			const visibleAttributions = new Set(layers.flatMap((layer) => layer.getAttributions(frameState)));
			if (this.attributions_ !== void 0) Array.isArray(this.attributions_) ? this.attributions_.forEach((item) => visibleAttributions.add(item)) : visibleAttributions.add(this.attributions_);
			if (!this.overrideCollapsible_) {
				const collapsible = !layers.some((layer) => layer.getSource()?.getAttributionsCollapsible() === false);
				this.setCollapsible(collapsible);
			}
			return Array.from(visibleAttributions);
		}
		/**
		* @private
		* @param {?import("../Map.js").FrameState} frameState Frame state.
		*/
		async updateElement_(frameState) {
			if (!frameState) {
				if (this.renderedVisible_) {
					this.element.style.display = "none";
					this.renderedVisible_ = false;
				}
				return;
			}
			const attributions = await Promise.all(this.collectSourceAttributions_(frameState).map((attribution) => toPromise(() => attribution)));
			const visible = attributions.length > 0;
			if (this.renderedVisible_ != visible) {
				this.element.style.display = visible ? "" : "none";
				this.renderedVisible_ = visible;
			}
			if (equals$2(attributions, this.renderedAttributions_)) return;
			removeChildren(this.ulElement_);
			for (let i = 0, ii = attributions.length; i < ii; ++i) {
				const element = document.createElement("li");
				element.innerHTML = attributions[i];
				this.ulElement_.appendChild(element);
			}
			this.renderedAttributions_ = attributions;
		}
		/**
		* @param {MouseEvent} event The event to handle
		* @private
		*/
		handleClick_(event) {
			event.preventDefault();
			this.handleToggle_();
			this.userCollapsed_ = this.collapsed_;
		}
		/**
		* @private
		*/
		handleToggle_() {
			this.element.classList.toggle(CLASS_COLLAPSED);
			if (this.collapsed_) replaceNode(this.collapseLabel_, this.label_);
			else replaceNode(this.label_, this.collapseLabel_);
			this.collapsed_ = !this.collapsed_;
			this.toggleButton_.setAttribute("aria-expanded", String(!this.collapsed_));
		}
		/**
		* Return `true` if the attribution is collapsible, `false` otherwise.
		* @return {boolean} True if the widget is collapsible.
		* @api
		*/
		getCollapsible() {
			return this.collapsible_;
		}
		/**
		* Set whether the attribution should be collapsible.
		* @param {boolean} collapsible True if the widget is collapsible.
		* @api
		*/
		setCollapsible(collapsible) {
			if (this.collapsible_ === collapsible) return;
			this.collapsible_ = collapsible;
			this.element.classList.toggle("ol-uncollapsible");
			if (this.userCollapsed_) this.handleToggle_();
		}
		/**
		* Collapse or expand the attribution according to the passed parameter. Will
		* not do anything if the attribution isn't collapsible or if the current
		* collapsed state is already the one requested.
		* @param {boolean} collapsed True if the widget is collapsed.
		* @api
		*/
		setCollapsed(collapsed) {
			this.userCollapsed_ = collapsed;
			if (!this.collapsible_ || this.collapsed_ === collapsed) return;
			this.handleToggle_();
		}
		/**
		* Return `true` when the attribution is currently collapsed or `false`
		* otherwise.
		* @return {boolean} True if the widget is collapsed.
		* @api
		*/
		getCollapsed() {
			return this.collapsed_;
		}
		/**
		* Update the attribution element.
		* @param {import("../MapEvent.js").default} mapEvent Map event.
		* @override
		*/
		render(mapEvent) {
			this.updateElement_(mapEvent.frameState);
		}
	};
	//#endregion
	//#region src/ol/control/Rotate.js
	/**
	* @module ol/control/Rotate
	*/
	/**
	* @typedef {Object} Options
	* @property {string} [className='ol-rotate'] CSS class name.
	* @property {string|HTMLElement} [label='⇧'] Text label to use for the rotate button.
	* Instead of text, also an element (e.g. a `span` element) can be used.
	* @property {string} [tipLabel='Reset rotation'] Text label to use for the rotate tip.
	* @property {string} [compassClassName='ol-compass'] CSS class name for the compass.
	* @property {number} [duration=250] Animation duration in milliseconds.
	* @property {boolean} [autoHide=true] Hide the control when rotation is 0.
	* @property {function(import("../MapEvent.js").default):void} [render] Function called when the control should
	* be re-rendered. This is called in a `requestAnimationFrame` callback.
	* @property {function():void} [resetNorth] Function called when the control is clicked.
	* This will override the default `resetNorth`.
	* @property {HTMLElement|string} [target] Specify a target if you want the control to be
	* rendered outside of the map's viewport.
	*/
	/**
	* @classdesc
	* A button control to reset rotation to 0.
	* To style this control use css selector `.ol-rotate`. A `.ol-hidden` css
	* selector is added to the button when the rotation is 0.
	*
	* @api
	*/
	var Rotate = class extends Control {
		/**
		* @param {Options} [options] Rotate options.
		*/
		constructor(options) {
			options = options ? options : {};
			super({
				element: document.createElement("div"),
				render: options.render,
				target: options.target
			});
			const className = options.className !== void 0 ? options.className : "ol-rotate";
			const label = options.label !== void 0 ? options.label : "⇧";
			const compassClassName = options.compassClassName !== void 0 ? options.compassClassName : "ol-compass";
			/**
			* @type {HTMLElement}
			* @private
			*/
			this.label_ = null;
			if (typeof label === "string") {
				this.label_ = document.createElement("span");
				this.label_.className = compassClassName;
				this.label_.textContent = label;
			} else {
				this.label_ = label;
				this.label_.classList.add(compassClassName);
			}
			const tipLabel = options.tipLabel ? options.tipLabel : "Reset rotation";
			const button = document.createElement("button");
			button.className = className + "-reset";
			button.setAttribute("type", "button");
			button.title = tipLabel;
			button.appendChild(this.label_);
			button.addEventListener(EventType_default$2.CLICK, this.handleClick_.bind(this), false);
			const cssClasses = className + " ol-unselectable ol-control";
			const element = this.element;
			element.className = cssClasses;
			element.appendChild(button);
			/**
			* @private
			*/
			this.callResetNorth_ = options.resetNorth ? options.resetNorth : void 0;
			/**
			* @type {number}
			* @private
			*/
			this.duration_ = options.duration !== void 0 ? options.duration : 250;
			/**
			* @type {boolean}
			* @private
			*/
			this.autoHide_ = options.autoHide !== void 0 ? options.autoHide : true;
			/**
			* @private
			* @type {number|undefined}
			*/
			this.rotation_ = void 0;
			if (this.autoHide_) this.element.classList.add(CLASS_HIDDEN);
		}
		/**
		* @param {MouseEvent} event The event to handle
		* @private
		*/
		handleClick_(event) {
			event.preventDefault();
			if (this.callResetNorth_ !== void 0) this.callResetNorth_();
			else this.resetNorth_();
		}
		/**
		* @private
		*/
		resetNorth_() {
			const view = this.getMap().getView();
			if (!view) return;
			const rotation = view.getRotation();
			if (rotation !== void 0) if (this.duration_ > 0 && rotation % (2 * Math.PI) !== 0) view.animate({
				rotation: 0,
				duration: this.duration_,
				easing: easeOut
			});
			else view.setRotation(0);
		}
		/**
		* Update the rotate control element.
		* @param {import("../MapEvent.js").default} mapEvent Map event.
		* @override
		*/
		render(mapEvent) {
			const frameState = mapEvent.frameState;
			if (!frameState) return;
			const rotation = frameState.viewState.rotation;
			if (rotation != this.rotation_) {
				const transform = "rotate(" + rotation + "rad)";
				if (this.autoHide_) {
					const contains = this.element.classList.contains(CLASS_HIDDEN);
					if (!contains && rotation === 0) this.element.classList.add(CLASS_HIDDEN);
					else if (contains && rotation !== 0) this.element.classList.remove(CLASS_HIDDEN);
				}
				this.label_.style.transform = transform;
			}
			this.rotation_ = rotation;
		}
	};
	//#endregion
	//#region src/ol/control/Zoom.js
	/**
	* @module ol/control/Zoom
	*/
	/**
	* @typedef {Object} Options
	* @property {number} [duration=250] Animation duration in milliseconds.
	* @property {string} [className='ol-zoom'] CSS class name.
	* @property {string} [zoomInClassName=className + '-in'] CSS class name for the zoom-in button.
	* @property {string} [zoomOutClassName=className + '-out'] CSS class name for the zoom-out button.
	* @property {string|HTMLElement} [zoomInLabel='+'] Text label to use for the zoom-in
	* button. Instead of text, also an element (e.g. a `span` element) can be used.
	* @property {string|HTMLElement} [zoomOutLabel='–'] Text label to use for the zoom-out button.
	* Instead of text, also an element (e.g. a `span` element) can be used.
	* @property {string} [zoomInTipLabel='Zoom in'] Text label to use for the button tip.
	* @property {string} [zoomOutTipLabel='Zoom out'] Text label to use for the button tip.
	* @property {number} [delta=1] The zoom delta applied on each click.
	* @property {HTMLElement|string} [target] Specify a target if you want the control to be
	* rendered outside of the map's viewport.
	*/
	/**
	* @classdesc
	* A control with 2 buttons, one for zoom in and one for zoom out.
	* This control is one of the default controls of a map. To style this control
	* use css selectors `.ol-zoom-in` and `.ol-zoom-out`.
	*
	* @api
	*/
	var Zoom = class extends Control {
		/**
		* @param {Options} [options] Zoom options.
		*/
		constructor(options) {
			options = options ? options : {};
			super({
				element: document.createElement("div"),
				target: options.target
			});
			const className = options.className !== void 0 ? options.className : "ol-zoom";
			const delta = options.delta !== void 0 ? options.delta : 1;
			const zoomInClassName = options.zoomInClassName !== void 0 ? options.zoomInClassName : className + "-in";
			const zoomOutClassName = options.zoomOutClassName !== void 0 ? options.zoomOutClassName : className + "-out";
			const zoomInLabel = options.zoomInLabel !== void 0 ? options.zoomInLabel : "+";
			const zoomOutLabel = options.zoomOutLabel !== void 0 ? options.zoomOutLabel : "–";
			const zoomInTipLabel = options.zoomInTipLabel !== void 0 ? options.zoomInTipLabel : "Zoom in";
			const zoomOutTipLabel = options.zoomOutTipLabel !== void 0 ? options.zoomOutTipLabel : "Zoom out";
			const inElement = document.createElement("button");
			inElement.className = zoomInClassName;
			inElement.setAttribute("type", "button");
			inElement.title = zoomInTipLabel;
			inElement.appendChild(typeof zoomInLabel === "string" ? document.createTextNode(zoomInLabel) : zoomInLabel);
			inElement.addEventListener(EventType_default$2.CLICK, this.handleClick_.bind(this, delta), false);
			const outElement = document.createElement("button");
			outElement.className = zoomOutClassName;
			outElement.setAttribute("type", "button");
			outElement.title = zoomOutTipLabel;
			outElement.appendChild(typeof zoomOutLabel === "string" ? document.createTextNode(zoomOutLabel) : zoomOutLabel);
			outElement.addEventListener(EventType_default$2.CLICK, this.handleClick_.bind(this, -delta), false);
			const cssClasses = className + " ol-unselectable ol-control";
			const element = this.element;
			element.className = cssClasses;
			element.appendChild(inElement);
			element.appendChild(outElement);
			/**
			* @type {number}
			* @private
			*/
			this.duration_ = options.duration !== void 0 ? options.duration : 250;
		}
		/**
		* @param {number} delta Zoom delta.
		* @param {MouseEvent} event The event to handle
		* @private
		*/
		handleClick_(delta, event) {
			event.preventDefault();
			this.zoomByDelta_(delta);
		}
		/**
		* @param {number} delta Zoom delta.
		* @private
		*/
		zoomByDelta_(delta) {
			const view = this.getMap().getView();
			if (!view) return;
			const currentZoom = view.getZoom();
			if (currentZoom !== void 0) {
				const newZoom = view.getConstrainedZoom(currentZoom + delta);
				if (this.duration_ > 0) {
					if (view.getAnimating()) view.cancelAnimations();
					view.animate({
						zoom: newZoom,
						duration: this.duration_,
						easing: easeOut
					});
				} else view.setZoom(newZoom);
			}
		}
	};
	//#endregion
	//#region src/ol/control/defaults.js
	/**
	* @module ol/control/defaults
	*/
	/**
	* @typedef {Object} DefaultsOptions
	* @property {boolean} [attribution=true] Include
	* {@link module:ol/control/Attribution~Attribution}.
	* @property {import("./Attribution.js").Options} [attributionOptions]
	* Options for {@link module:ol/control/Attribution~Attribution}.
	* @property {boolean} [rotate=true] Include
	* {@link module:ol/control/Rotate~Rotate}.
	* @property {import("./Rotate.js").Options} [rotateOptions] Options
	* for {@link module:ol/control/Rotate~Rotate}.
	* @property {boolean} [zoom] Include {@link module:ol/control/Zoom~Zoom}.
	* @property {import("./Zoom.js").Options} [zoomOptions] Options for
	* {@link module:ol/control/Zoom~Zoom}.
	*/
	/**
	* Set of controls included in maps by default. Unless configured otherwise,
	* this returns a collection containing an instance of each of the following
	* controls:
	* {@link module:ol/control/Zoom~Zoom}
	* {@link module:ol/control/Rotate~Rotate}
	* {@link module:ol/control/Attribution~Attribution}
	*
	* @param {DefaultsOptions} [options] Options for the default controls.
	* @return {Collection<import("./Control.js").default>} A collection of controls
	* to be used with the {@link module:ol/Map~Map} constructor's `controls` option.
	* @api
	*/
	function defaults$1(options) {
		options = options ? options : {};
		/** @type {Collection<import("./Control.js").default>} */
		const controls = new Collection();
		if (options.zoom !== void 0 ? options.zoom : true) controls.push(new Zoom(options.zoomOptions));
		if (options.rotate !== void 0 ? options.rotate : true) controls.push(new Rotate(options.rotateOptions));
		if (options.attribution !== void 0 ? options.attribution : true) controls.push(new Attribution(options.attributionOptions));
		return controls;
	}
	//#endregion
	//#region src/ol/Kinetic.js
	/**
	* @module ol/Kinetic
	*/
	/**
	* @classdesc
	* Implementation of inertial deceleration for map movement.
	*
	* @api
	*/
	var Kinetic = class {
		/**
		* @param {number} decay Rate of decay (must be negative).
		* @param {number} minVelocity Minimum velocity (pixels/millisecond).
		* @param {number} delay Delay to consider to calculate the kinetic
		*     initial values (milliseconds).
		*/
		constructor(decay, minVelocity, delay) {
			/**
			* @private
			* @type {number}
			*/
			this.decay_ = decay;
			/**
			* @private
			* @type {number}
			*/
			this.minVelocity_ = minVelocity;
			/**
			* @private
			* @type {number}
			*/
			this.delay_ = delay;
			/**
			* @private
			* @type {Array<number>}
			*/
			this.points_ = [];
			/**
			* @private
			* @type {number}
			*/
			this.angle_ = 0;
			/**
			* @private
			* @type {number}
			*/
			this.initialVelocity_ = 0;
		}
		/**
		* FIXME empty description for jsdoc
		*/
		begin() {
			this.points_.length = 0;
			this.angle_ = 0;
			this.initialVelocity_ = 0;
		}
		/**
		* @param {number} x X.
		* @param {number} y Y.
		*/
		update(x, y) {
			this.points_.push(x, y, Date.now());
		}
		/**
		* @return {boolean} Whether we should do kinetic animation.
		*/
		end() {
			if (this.points_.length < 6) return false;
			const delay = Date.now() - this.delay_;
			const lastIndex = this.points_.length - 3;
			if (this.points_[lastIndex + 2] < delay) return false;
			let firstIndex = lastIndex - 3;
			while (firstIndex > 0 && this.points_[firstIndex + 2] > delay) firstIndex -= 3;
			const duration = this.points_[lastIndex + 2] - this.points_[firstIndex + 2];
			if (duration < 1e3 / 60) return false;
			const dx = this.points_[lastIndex] - this.points_[firstIndex];
			const dy = this.points_[lastIndex + 1] - this.points_[firstIndex + 1];
			this.angle_ = Math.atan2(dy, dx);
			this.initialVelocity_ = Math.sqrt(dx * dx + dy * dy) / duration;
			return this.initialVelocity_ > this.minVelocity_;
		}
		/**
		* @return {number} Total distance travelled (pixels).
		*/
		getDistance() {
			return (this.minVelocity_ - this.initialVelocity_) / this.decay_;
		}
		/**
		* @return {number} Angle of the kinetic panning animation (radians).
		*/
		getAngle() {
			return this.angle_;
		}
	};
	//#endregion
	//#region src/ol/interaction/Property.js
	/**
	* @module ol/interaction/Property
	*/
	/**
	* @enum {string}
	*/
	var Property_default$1 = { ACTIVE: "active" };
	//#endregion
	//#region src/ol/interaction/Interaction.js
	/**
	* @module ol/interaction/Interaction
	*/
	/***
	* @template Return
	* @typedef {import("../Observable.js").OnSignature<import("../Observable.js").EventTypes, import("../events/Event.js").default, Return> &
	*   import("../Observable.js").OnSignature<import("../ObjectEventType.js").Types|
	*     'change:active', import("../Object.js").ObjectEvent, Return> &
	*   import("../Observable.js").CombinedOnSignature<import("../Observable.js").EventTypes|import("../ObjectEventType.js").Types|
	*     'change:active', Return>} InteractionOnSignature
	*/
	/**
	* Object literal with config options for interactions.
	* @typedef {Object} InteractionOptions
	* @property {function(import("../MapBrowserEvent.js").default):boolean} [handleEvent]
	* Method called by the map to notify the interaction that a browser event was
	* dispatched to the map. If the function returns a falsy value, propagation of
	* the event to other interactions in the map's interactions chain will be
	* prevented (this includes functions with no explicit return). The interactions
	* are traversed in reverse order of the interactions collection of the map.
	*/
	/**
	* @classdesc
	* Abstract base class; normally only used for creating subclasses and not
	* instantiated in apps.
	* User actions that change the state of the map. Some are similar to controls,
	* but are not associated with a DOM element.
	* For example, {@link module:ol/interaction/KeyboardZoom~KeyboardZoom} is
	* functionally the same as {@link module:ol/control/Zoom~Zoom}, but triggered
	* by a keyboard event not a button element event.
	* Although interactions do not have a DOM element, some of them do render
	* vectors and so are visible on the screen.
	* @api
	*/
	var Interaction = class extends BaseObject {
		/**
		* @param {InteractionOptions} [options] Options.
		*/
		constructor(options) {
			super();
			/***
			* @type {InteractionOnSignature<import("../events.js").EventsKey>}
			*/
			this.on;
			/***
			* @type {InteractionOnSignature<import("../events.js").EventsKey>}
			*/
			this.once;
			/***
			* @type {InteractionOnSignature<void>}
			*/
			this.un;
			if (options && options.handleEvent) this.handleEvent = options.handleEvent;
			/**
			* @private
			* @type {import("../Map.js").default|null}
			*/
			this.map_ = null;
			this.setActive(true);
		}
		/**
		* Return whether the interaction is currently active.
		* @return {boolean} `true` if the interaction is active, `false` otherwise.
		* @observable
		* @api
		*/
		getActive() {
			return this.get(Property_default$1.ACTIVE);
		}
		/**
		* Get the map associated with this interaction.
		* @return {import("../Map.js").default|null} Map.
		* @api
		*/
		getMap() {
			return this.map_;
		}
		/**
		* Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event}.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
		* @return {boolean} `false` to stop event propagation.
		* @api
		*/
		handleEvent(mapBrowserEvent) {
			return true;
		}
		/**
		* Activate or deactivate the interaction.
		* @param {boolean} active Active.
		* @observable
		* @api
		*/
		setActive(active) {
			this.set(Property_default$1.ACTIVE, active);
		}
		/**
		* Remove the interaction from its current map and attach it to the new map.
		* Subclasses may set up event handlers to get notified about changes to
		* the map here.
		* @param {import("../Map.js").default|null} map Map.
		*/
		setMap(map) {
			this.map_ = map;
		}
	};
	/**
	* @param {import("../View.js").default} view View.
	* @param {import("../coordinate.js").Coordinate} delta Delta.
	* @param {number} [duration] Duration.
	*/
	function pan(view, delta, duration) {
		const currentCenter = view.getCenterInternal();
		if (currentCenter) {
			const center = [currentCenter[0] + delta[0], currentCenter[1] + delta[1]];
			view.animateInternal({
				duration: duration !== void 0 ? duration : 250,
				easing: linear,
				center: view.getConstrainedCenter(center)
			});
		}
	}
	/**
	* @param {import("../View.js").default} view View.
	* @param {number} delta Delta from previous zoom level.
	* @param {import("../coordinate.js").Coordinate} [anchor] Anchor coordinate in the user projection.
	* @param {number} [duration] Duration.
	*/
	function zoomByDelta(view, delta, anchor, duration) {
		const currentZoom = view.getZoom();
		if (currentZoom === void 0) return;
		const newZoom = view.getConstrainedZoom(currentZoom + delta);
		const newResolution = view.getResolutionForZoom(newZoom);
		if (view.getAnimating()) view.cancelAnimations();
		view.animate({
			resolution: newResolution,
			anchor,
			duration: duration !== void 0 ? duration : 250,
			easing: easeOut
		});
	}
	//#endregion
	//#region src/ol/interaction/DoubleClickZoom.js
	/**
	* @module ol/interaction/DoubleClickZoom
	*/
	/**
	* @typedef {Object} Options
	* @property {number} [duration=250] Animation duration in milliseconds.
	* @property {number} [delta=1] The zoom delta applied on each double click.
	*/
	/**
	* @classdesc
	* Allows the user to zoom by double-clicking on the map.
	* @api
	*/
	var DoubleClickZoom = class extends Interaction {
		/**
		* @param {Options} [options] Options.
		*/
		constructor(options) {
			super();
			options = options ? options : {};
			/**
			* @private
			* @type {number}
			*/
			this.delta_ = options.delta ? options.delta : 1;
			/**
			* @private
			* @type {number}
			*/
			this.duration_ = options.duration !== void 0 ? options.duration : 250;
		}
		/**
		* Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} (if it was a
		* doubleclick) and eventually zooms the map.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
		* @return {boolean} `false` to stop event propagation.
		* @override
		*/
		handleEvent(mapBrowserEvent) {
			let stopEvent = false;
			if (mapBrowserEvent.type == MapBrowserEventType_default.DBLCLICK) {
				const browserEvent = mapBrowserEvent.originalEvent;
				const map = mapBrowserEvent.map;
				const anchor = mapBrowserEvent.coordinate;
				const delta = browserEvent.shiftKey ? -this.delta_ : this.delta_;
				zoomByDelta(map.getView(), delta, anchor, this.duration_);
				browserEvent.preventDefault();
				stopEvent = true;
			}
			return !stopEvent;
		}
	};
	//#endregion
	//#region src/ol/events/condition.js
	/**
	* A function that takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
	* `{boolean}`. If the condition is met, true should be returned.
	*
	* @typedef {function(this: ?, import("../MapBrowserEvent.js").default): boolean} Condition
	*/
	/**
	* Creates a condition function that passes when all provided conditions pass.
	* @param {...Condition} var_args Conditions to check.
	* @return {Condition} Condition function.
	*/
	function all(var_args) {
		const conditions = arguments;
		/**
		* @param {import("../MapBrowserEvent.js").default} event Event.
		* @return {boolean} All conditions passed.
		*/
		return function(event) {
			let pass = true;
			for (let i = 0, ii = conditions.length; i < ii; ++i) {
				pass = pass && conditions[i](event);
				if (!pass) break;
			}
			return pass;
		};
	}
	/**
	* Return `true` if only the alt-key and shift-key is pressed, `false` otherwise
	* (e.g. when additionally the platform-modifier-key is pressed).
	*
	* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
	* @return {boolean} True if only the alt and shift keys are pressed.
	* @api
	*/
	const altShiftKeysOnly = function(mapBrowserEvent) {
		const originalEvent = mapBrowserEvent.originalEvent;
		return originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey) && originalEvent.shiftKey;
	};
	/**
	* Return `true` if the map has the focus. This condition requires a map target
	* element with a `tabindex` attribute, e.g. `<div id="map" tabindex="1">`.
	*
	* @param {import("../MapBrowserEvent.js").default} event Map browser event.
	* @return {boolean} The map has the focus.
	* @api
	*/
	const focus = function(event) {
		const targetElement = event.map.getTargetElement();
		const rootNode = targetElement.getRootNode();
		const activeElement = event.map.getOwnerDocument().activeElement;
		return rootNode instanceof ShadowRoot ? rootNode.host.contains(activeElement) : targetElement.contains(activeElement);
	};
	/**
	* Return `true` if the map has the focus or no 'tabindex' attribute set.
	*
	* @param {import("../MapBrowserEvent.js").default} event Map browser event.
	* @return {boolean} The map container has the focus or no 'tabindex' attribute.
	*/
	const focusWithTabindex = function(event) {
		const targetElement = event.map.getTargetElement();
		const rootNode = targetElement.getRootNode();
		return (rootNode instanceof ShadowRoot ? rootNode.host : targetElement).hasAttribute("tabindex") ? focus(event) : true;
	};
	/**
	* Return always true.
	*
	* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
	* @return {boolean} True.
	* @api
	*/
	const always$1 = TRUE;
	/**
	* Return `true` if the event has an "action"-producing mouse button.
	*
	* By definition, this includes left-click on windows/linux, and left-click
	* without the ctrl key on Macs.
	*
	* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
	* @return {boolean} The result.
	*/
	const mouseActionButton = function(mapBrowserEvent) {
		const originalEvent = mapBrowserEvent.originalEvent;
		return "pointerId" in originalEvent && originalEvent.button == 0 && !(WEBKIT && MAC && originalEvent.ctrlKey);
	};
	/**
	* Return `true` if no modifier key (alt-, shift- or platform-modifier-key) is
	* pressed.
	*
	* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
	* @return {boolean} True only if there no modifier keys are pressed.
	* @api
	*/
	const noModifierKeys = function(mapBrowserEvent) {
		const originalEvent = mapBrowserEvent.originalEvent;
		return !originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey) && !originalEvent.shiftKey;
	};
	/**
	* Return `true` if the platform-modifier-key (the meta-key on Mac,
	* ctrl-key otherwise) is pressed.
	*
	* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
	* @return {boolean} True if the platform modifier key is pressed.
	* @api
	*/
	const platformModifierKey = function(mapBrowserEvent) {
		const originalEvent = mapBrowserEvent.originalEvent;
		return MAC ? originalEvent.metaKey : originalEvent.ctrlKey;
	};
	/**
	* Return `true` if only the shift-key is pressed, `false` otherwise (e.g. when
	* additionally the alt-key is pressed).
	*
	* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
	* @return {boolean} True if only the shift key is pressed.
	* @api
	*/
	const shiftKeyOnly = function(mapBrowserEvent) {
		const originalEvent = mapBrowserEvent.originalEvent;
		return !originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey) && originalEvent.shiftKey;
	};
	/**
	* Return `true` if the target element is not editable, i.e. not an `input`,
	* `select`, or `textarea` element and no `contenteditable` attribute is
	* set or inherited, `false` otherwise.
	*
	* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
	* @return {boolean} True only if the target element is not editable.
	* @api
	*/
	const targetNotEditable = function(mapBrowserEvent) {
		const originalEvent = mapBrowserEvent.originalEvent;
		const tagName = originalEvent.target.tagName;
		return tagName !== "INPUT" && tagName !== "SELECT" && tagName !== "TEXTAREA" && !originalEvent.target.isContentEditable;
	};
	/**
	* Return `true` if the event originates from a mouse device.
	*
	* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
	* @return {boolean} True if the event originates from a mouse device.
	* @api
	*/
	const mouseOnly = function(mapBrowserEvent) {
		const pointerEvent = mapBrowserEvent.originalEvent;
		return "pointerId" in pointerEvent && pointerEvent.pointerType == "mouse";
	};
	/**
	* Return `true` if the event originates from a primary pointer in
	* contact with the surface or if the left mouse button is pressed.
	* See https://www.w3.org/TR/pointerevents/#button-states.
	*
	* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
	* @return {boolean} True if the event originates from a primary pointer.
	* @api
	*/
	const primaryAction = function(mapBrowserEvent) {
		const pointerEvent = mapBrowserEvent.originalEvent;
		return "pointerId" in pointerEvent && pointerEvent.isPrimary && pointerEvent.button === 0;
	};
	//#endregion
	//#region src/ol/interaction/Pointer.js
	/**
	* @module ol/interaction/Pointer
	*/
	/**
	* @typedef {Object} Options
	* @property {function(import("../MapBrowserEvent.js").default):boolean} [handleDownEvent]
	* Function handling "down" events. If the function returns `true` then a drag
	* sequence is started.
	* @property {function(import("../MapBrowserEvent.js").default):void} [handleDragEvent]
	* Function handling "drag" events. This function is called on "move" events
	* during a drag sequence.
	* @property {function(import("../MapBrowserEvent.js").default):boolean} [handleEvent]
	* Method called by the map to notify the interaction that a browser event was
	* dispatched to the map. The function may return `false` to prevent the
	* propagation of the event to other interactions in the map's interactions
	* chain.
	* @property {function(import("../MapBrowserEvent.js").default):void} [handleMoveEvent]
	* Function handling "move" events. This function is called on "move" events.
	* This functions is also called during a drag sequence, so during a drag
	* sequence both the `handleDragEvent` function and this function are called.
	* If `handleDownEvent` is defined and it returns true this function will not
	* be called during a drag sequence.
	* @property {function(import("../MapBrowserEvent.js").default):boolean} [handleUpEvent]
	*  Function handling "up" events. If the function returns `false` then the
	* current drag sequence is stopped.
	* @property {function(boolean):boolean} [stopDown]
	* Should the down event be propagated to other interactions, or should be
	* stopped?
	*/
	/**
	* @classdesc
	* Base class that calls user-defined functions on `down`, `move` and `up`
	* events. This class also manages "drag sequences".
	*
	* When the `handleDownEvent` user function returns `true` a drag sequence is
	* started. During a drag sequence the `handleDragEvent` user function is
	* called on `move` events. The drag sequence ends when the `handleUpEvent`
	* user function is called and returns `false`.
	* @api
	*/
	var PointerInteraction = class extends Interaction {
		/**
		* @param {Options} [options] Options.
		*/
		constructor(options) {
			options = options ? options : {};
			super(options);
			if (options.handleDownEvent) this.handleDownEvent = options.handleDownEvent;
			if (options.handleDragEvent) this.handleDragEvent = options.handleDragEvent;
			if (options.handleMoveEvent) this.handleMoveEvent = options.handleMoveEvent;
			if (options.handleUpEvent) this.handleUpEvent = options.handleUpEvent;
			if (options.stopDown) this.stopDown = options.stopDown;
			/**
			* @type {boolean}
			* @protected
			*/
			this.handlingDownUpSequence = false;
			/**
			* @type {Array<PointerEvent>}
			* @protected
			*/
			this.targetPointers = [];
		}
		/**
		* Returns the current number of pointers involved in the interaction,
		* e.g. `2` when two fingers are used.
		* @return {number} The number of pointers.
		* @api
		*/
		getPointerCount() {
			return this.targetPointers.length;
		}
		/**
		* Handle pointer down events.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
		* @return {boolean} If the event was consumed.
		* @protected
		*/
		handleDownEvent(mapBrowserEvent) {
			return false;
		}
		/**
		* Handle pointer drag events.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
		* @protected
		*/
		handleDragEvent(mapBrowserEvent) {}
		/**
		* Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} and may call into
		* other functions, if event sequences like e.g. 'drag' or 'down-up' etc. are
		* detected.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
		* @return {boolean} `false` to stop event propagation.
		* @api
		* @override
		*/
		handleEvent(mapBrowserEvent) {
			if (!mapBrowserEvent.originalEvent) return true;
			let stopEvent = false;
			this.updateTrackedPointers_(mapBrowserEvent);
			if (this.handlingDownUpSequence) {
				if (mapBrowserEvent.type == MapBrowserEventType_default.POINTERDRAG) {
					this.handleDragEvent(mapBrowserEvent);
					mapBrowserEvent.originalEvent.preventDefault();
				} else if (mapBrowserEvent.type == MapBrowserEventType_default.POINTERUP) {
					const handledUp = this.handleUpEvent(mapBrowserEvent);
					this.handlingDownUpSequence = handledUp && this.targetPointers.length > 0;
				}
			} else if (mapBrowserEvent.type == MapBrowserEventType_default.POINTERDOWN) {
				const handled = this.handleDownEvent(mapBrowserEvent);
				this.handlingDownUpSequence = handled;
				stopEvent = this.stopDown(handled);
			} else if (mapBrowserEvent.type == MapBrowserEventType_default.POINTERMOVE) this.handleMoveEvent(mapBrowserEvent);
			return !stopEvent;
		}
		/**
		* Handle pointer move events.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
		* @protected
		*/
		handleMoveEvent(mapBrowserEvent) {}
		/**
		* Handle pointer up events.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
		* @return {boolean} If the event was consumed.
		* @protected
		*/
		handleUpEvent(mapBrowserEvent) {
			return false;
		}
		/**
		* This function is used to determine if "down" events should be propagated
		* to other interactions or should be stopped.
		* @param {boolean} handled Was the event handled by the interaction?
		* @return {boolean} Should the `down` event be stopped?
		*/
		stopDown(handled) {
			return handled;
		}
		/**
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
		* @private
		*/
		updateTrackedPointers_(mapBrowserEvent) {
			if (mapBrowserEvent.activePointers) this.targetPointers = mapBrowserEvent.activePointers;
		}
	};
	/**
	* @param {Array<PointerEvent>} pointerEvents List of events.
	* @return {{clientX: number, clientY: number}} Centroid pixel.
	*/
	function centroid(pointerEvents) {
		const length = pointerEvents.length;
		let clientX = 0;
		let clientY = 0;
		for (let i = 0; i < length; i++) {
			clientX += pointerEvents[i].clientX;
			clientY += pointerEvents[i].clientY;
		}
		return {
			clientX: clientX / length,
			clientY: clientY / length
		};
	}
	//#endregion
	//#region src/ol/interaction/DragPan.js
	/**
	* @module ol/interaction/DragPan
	*/
	/**
	* @typedef {Object} Options
	* @property {import("../events/condition.js").Condition} [condition] A function that takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a boolean
	* to indicate whether that event should be handled.
	* Default is {@link module:ol/events/condition.noModifierKeys} and {@link module:ol/events/condition.primaryAction}.
	* @property {boolean} [onFocusOnly=false] When the map's target has a `tabindex` attribute set,
	* the interaction will only handle events when the map has the focus.
	* @property {import("../Kinetic.js").default} [kinetic] Kinetic inertia to apply to the pan.
	*/
	/**
	* @classdesc
	* Allows the user to pan the map by dragging the map.
	* @api
	*/
	var DragPan = class extends PointerInteraction {
		/**
		* @param {Options} [options] Options.
		*/
		constructor(options) {
			super({ stopDown: FALSE });
			options = options ? options : {};
			/**
			* @private
			* @type {import("../Kinetic.js").default|undefined}
			*/
			this.kinetic_ = options.kinetic;
			/**
			* @type {import("../pixel.js").Pixel}
			*/
			this.lastCentroid = null;
			/**
			* @type {number}
			* @private
			*/
			this.lastPointersCount_;
			/**
			* @type {boolean}
			* @private
			*/
			this.panning_ = false;
			const condition = options.condition ? options.condition : all(noModifierKeys, primaryAction);
			/**
			* @private
			* @type {import("../events/condition.js").Condition}
			*/
			this.condition_ = options.onFocusOnly ? all(focusWithTabindex, condition) : condition;
			/**
			* @private
			* @type {boolean}
			*/
			this.noKinetic_ = false;
		}
		/**
		* Handle pointer drag events.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
		* @override
		*/
		handleDragEvent(mapBrowserEvent) {
			const map = mapBrowserEvent.map;
			if (!this.panning_) {
				this.panning_ = true;
				map.getView().beginInteraction();
			}
			const targetPointers = this.targetPointers;
			const centroid$1 = map.getEventPixel(centroid(targetPointers));
			if (targetPointers.length == this.lastPointersCount_) {
				if (this.kinetic_) this.kinetic_.update(centroid$1[0], centroid$1[1]);
				if (this.lastCentroid) {
					const delta = [this.lastCentroid[0] - centroid$1[0], centroid$1[1] - this.lastCentroid[1]];
					const view = mapBrowserEvent.map.getView();
					scale$2(delta, view.getResolution());
					rotate$1(delta, view.getRotation());
					view.adjustCenterInternal(delta);
				}
			} else if (this.kinetic_) this.kinetic_.begin();
			this.lastCentroid = centroid$1;
			this.lastPointersCount_ = targetPointers.length;
			mapBrowserEvent.originalEvent.preventDefault();
		}
		/**
		* Handle pointer up events.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
		* @return {boolean} If the event was consumed.
		* @override
		*/
		handleUpEvent(mapBrowserEvent) {
			const map = mapBrowserEvent.map;
			const view = map.getView();
			if (this.targetPointers.length === 0) {
				if (!this.noKinetic_ && this.kinetic_ && this.kinetic_.end()) {
					const distance = this.kinetic_.getDistance();
					const angle = this.kinetic_.getAngle();
					const center = view.getCenterInternal();
					const centerpx = map.getPixelFromCoordinateInternal(center);
					const dest = map.getCoordinateFromPixelInternal([centerpx[0] - distance * Math.cos(angle), centerpx[1] - distance * Math.sin(angle)]);
					view.animateInternal({
						center: view.getConstrainedCenter(dest),
						duration: 500,
						easing: easeOut
					});
				}
				if (this.panning_) {
					this.panning_ = false;
					view.endInteraction();
				}
				return false;
			}
			if (this.kinetic_) this.kinetic_.begin();
			this.lastCentroid = null;
			return true;
		}
		/**
		* Handle pointer down events.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
		* @return {boolean} If the event was consumed.
		* @override
		*/
		handleDownEvent(mapBrowserEvent) {
			if (this.targetPointers.length > 0 && this.condition_(mapBrowserEvent)) {
				const view = mapBrowserEvent.map.getView();
				this.lastCentroid = null;
				if (view.getAnimating()) view.cancelAnimations();
				if (this.kinetic_) this.kinetic_.begin();
				this.noKinetic_ = this.targetPointers.length > 1;
				return true;
			}
			return false;
		}
	};
	//#endregion
	//#region src/ol/interaction/DragRotate.js
	/**
	* @module ol/interaction/DragRotate
	*/
	/**
	* @typedef {Object} Options
	* @property {import("../events/condition.js").Condition} [condition] A function that takes a
	* {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a boolean
	* to indicate whether that event should be handled.
	* Default is {@link module:ol/events/condition.altShiftKeysOnly}.
	* @property {number} [duration=250] Animation duration in milliseconds.
	*/
	/**
	* @classdesc
	* Allows the user to rotate the map by clicking and dragging on the map,
	* normally combined with a {@link module:ol/events/condition} that limits
	* it to when the alt and shift keys are held down.
	*
	* This interaction is only supported for mouse devices.
	* @api
	*/
	var DragRotate = class extends PointerInteraction {
		/**
		* @param {Options} [options] Options.
		*/
		constructor(options) {
			options = options ? options : {};
			super({ stopDown: FALSE });
			/**
			* @private
			* @type {import("../events/condition.js").Condition}
			*/
			this.condition_ = options.condition ? options.condition : altShiftKeysOnly;
			/**
			* @private
			* @type {number|undefined}
			*/
			this.lastAngle_ = void 0;
			/**
			* @private
			* @type {number}
			*/
			this.duration_ = options.duration !== void 0 ? options.duration : 250;
		}
		/**
		* Handle pointer drag events.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
		* @override
		*/
		handleDragEvent(mapBrowserEvent) {
			if (!mouseOnly(mapBrowserEvent)) return;
			const map = mapBrowserEvent.map;
			const view = map.getView();
			if (view.getConstraints().rotation === disable) return;
			const size = map.getSize();
			const offset = mapBrowserEvent.pixel;
			const theta = Math.atan2(size[1] / 2 - offset[1], offset[0] - size[0] / 2);
			if (this.lastAngle_ !== void 0) {
				const delta = theta - this.lastAngle_;
				view.adjustRotationInternal(-delta);
			}
			this.lastAngle_ = theta;
		}
		/**
		* Handle pointer up events.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
		* @return {boolean} If the event was consumed.
		* @override
		*/
		handleUpEvent(mapBrowserEvent) {
			if (!mouseOnly(mapBrowserEvent)) return true;
			mapBrowserEvent.map.getView().endInteraction(this.duration_);
			return false;
		}
		/**
		* Handle pointer down events.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
		* @return {boolean} If the event was consumed.
		* @override
		*/
		handleDownEvent(mapBrowserEvent) {
			if (!mouseOnly(mapBrowserEvent)) return false;
			if (mouseActionButton(mapBrowserEvent) && this.condition_(mapBrowserEvent)) {
				mapBrowserEvent.map.getView().beginInteraction();
				this.lastAngle_ = void 0;
				return true;
			}
			return false;
		}
	};
	//#endregion
	//#region src/ol/render/Box.js
	/**
	* @module ol/render/Box
	*/
	var RenderBox = class extends Disposable {
		/**
		* @param {string} className CSS class name.
		*/
		constructor(className) {
			super();
			/**
			* @type {import("../geom/Polygon.js").default}
			* @private
			*/
			this.geometry_ = null;
			/**
			* @type {HTMLDivElement}
			* @private
			*/
			this.element_ = document.createElement("div");
			this.element_.style.position = "absolute";
			this.element_.style.pointerEvents = "auto";
			this.element_.className = "ol-box " + className;
			/**
			* @private
			* @type {import("../Map.js").default|null}
			*/
			this.map_ = null;
			/**
			* @private
			* @type {import("../pixel.js").Pixel}
			*/
			this.startPixel_ = null;
			/**
			* @private
			* @type {import("../pixel.js").Pixel}
			*/
			this.endPixel_ = null;
		}
		/**
		* Clean up.
		* @override
		*/
		disposeInternal() {
			this.setMap(null);
		}
		/**
		* @private
		*/
		render_() {
			const startPixel = this.startPixel_;
			const endPixel = this.endPixel_;
			const px = "px";
			const style = this.element_.style;
			style.left = Math.min(startPixel[0], endPixel[0]) + px;
			style.top = Math.min(startPixel[1], endPixel[1]) + px;
			style.width = Math.abs(endPixel[0] - startPixel[0]) + px;
			style.height = Math.abs(endPixel[1] - startPixel[1]) + px;
		}
		/**
		* @param {import("../Map.js").default|null} map Map.
		*/
		setMap(map) {
			if (this.map_) {
				this.map_.getOverlayContainer().removeChild(this.element_);
				const style = this.element_.style;
				style.left = "inherit";
				style.top = "inherit";
				style.width = "inherit";
				style.height = "inherit";
			}
			this.map_ = map;
			if (this.map_) this.map_.getOverlayContainer().appendChild(this.element_);
		}
		/**
		* @param {import("../pixel.js").Pixel} startPixel Start pixel.
		* @param {import("../pixel.js").Pixel} endPixel End pixel.
		*/
		setPixels(startPixel, endPixel) {
			this.startPixel_ = startPixel;
			this.endPixel_ = endPixel;
			this.createOrUpdateGeometry();
			this.render_();
		}
		/**
		* Creates or updates the cached geometry.
		*/
		createOrUpdateGeometry() {
			if (!this.map_) return;
			const startPixel = this.startPixel_;
			const endPixel = this.endPixel_;
			const coordinates = [
				startPixel,
				[startPixel[0], endPixel[1]],
				endPixel,
				[endPixel[0], startPixel[1]]
			].map(this.map_.getCoordinateFromPixelInternal, this.map_);
			coordinates[4] = coordinates[0].slice();
			if (!this.geometry_) this.geometry_ = new Polygon([coordinates]);
			else this.geometry_.setCoordinates([coordinates]);
		}
		/**
		* @return {import("../geom/Polygon.js").default} Geometry.
		*/
		getGeometry() {
			return this.geometry_;
		}
	};
	//#endregion
	//#region src/ol/interaction/DragBox.js
	/**
	* @module ol/interaction/DragBox
	*/
	/**
	* A function that takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and two
	* {@link module:ol/pixel~Pixel}s and returns a `{boolean}`. If the condition is met,
	* true should be returned.
	* @typedef {function(this: ?, import("../MapBrowserEvent.js").default, import("../pixel.js").Pixel, import("../pixel.js").Pixel):boolean} EndCondition
	*/
	/**
	* @typedef {Object} Options
	* @property {string} [className='ol-dragbox'] CSS class name for styling the box.
	* @property {import("../events/condition.js").Condition} [condition] A function that takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a boolean
	* to indicate whether that event should be handled.
	* Default is {@link ol/events/condition~mouseActionButton}.
	* @property {number} [minArea=64] The minimum area of the box in pixel, this value is used by the default
	* `boxEndCondition` function.
	* @property {EndCondition} [boxEndCondition] A function that takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and two
	* {@link module:ol/pixel~Pixel}s to indicate whether a `boxend` event should be fired.
	* Default is `true` if the area of the box is bigger than the `minArea` option.
	* @property {function(this:DragBox, import("../MapBrowserEvent.js").default):void} [onBoxEnd] Code to execute just
	* before `boxend` is fired.
	*/
	/**
	* @enum {string}
	*/
	const DragBoxEventType = {
		/**
		* Triggered upon drag box start.
		* @event DragBoxEvent#boxstart
		* @api
		*/
		BOXSTART: "boxstart",
		/**
		* Triggered on drag when box is active.
		* @event DragBoxEvent#boxdrag
		* @api
		*/
		BOXDRAG: "boxdrag",
		/**
		* Triggered upon drag box end.
		* @event DragBoxEvent#boxend
		* @api
		*/
		BOXEND: "boxend",
		/**
		* Triggered upon drag box canceled.
		* @event DragBoxEvent#boxcancel
		* @api
		*/
		BOXCANCEL: "boxcancel"
	};
	/**
	* @classdesc
	* Events emitted by {@link module:ol/interaction/DragBox~DragBox} instances are instances of
	* this type.
	*/
	var DragBoxEvent = class extends BaseEvent {
		/**
		* @param {string} type The event type.
		* @param {import("../coordinate.js").Coordinate} coordinate The event coordinate.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Originating event.
		*/
		constructor(type, coordinate, mapBrowserEvent) {
			super(type);
			/**
			* The coordinate of the drag event.
			* @const
			* @type {import("../coordinate.js").Coordinate}
			* @api
			*/
			this.coordinate = coordinate;
			/**
			* @const
			* @type {import("../MapBrowserEvent.js").default}
			* @api
			*/
			this.mapBrowserEvent = mapBrowserEvent;
		}
	};
	/***
	* @template Return
	* @typedef {import("../Observable.js").OnSignature<import("../Observable.js").EventTypes, import("../events/Event.js").default, Return> &
	*   import("../Observable.js").OnSignature<import("../ObjectEventType.js").Types|
	*     'change:active', import("../Object.js").ObjectEvent, Return> &
	*   import("../Observable.js").OnSignature<'boxcancel'|'boxdrag'|'boxend'|'boxstart', DragBoxEvent, Return> &
	*   import("../Observable.js").CombinedOnSignature<import("../Observable.js").EventTypes|import("../ObjectEventType.js").Types|
	*     'change:active'|'boxcancel'|'boxdrag'|'boxend', Return>} DragBoxOnSignature
	*/
	/**
	* @classdesc
	* Allows the user to draw a vector box by clicking and dragging on the map,
	* normally combined with a {@link module:ol/events/condition} that limits
	* it to when the shift or other key is held down. This is used, for example,
	* for zooming to a specific area of the map
	* (see {@link module:ol/interaction/DragZoom~DragZoom} and
	* {@link module:ol/interaction/DragRotateAndZoom~DragRotateAndZoom}).
	*
	* @fires DragBoxEvent
	* @api
	*/
	var DragBox = class extends PointerInteraction {
		/**
		* @param {Options} [options] Options.
		*/
		constructor(options) {
			super();
			/***
			* @type {DragBoxOnSignature<import("../events.js").EventsKey>}
			*/
			this.on;
			/***
			* @type {DragBoxOnSignature<import("../events.js").EventsKey>}
			*/
			this.once;
			/***
			* @type {DragBoxOnSignature<void>}
			*/
			this.un;
			options = options ?? {};
			/**
			* @type {import("../render/Box.js").default}
			* @private
			*/
			this.box_ = new RenderBox(options.className || "ol-dragbox");
			/**
			* @type {number}
			* @private
			*/
			this.minArea_ = options.minArea ?? 64;
			if (options.onBoxEnd) this.onBoxEnd = options.onBoxEnd;
			/**
			* @type {import("../pixel.js").Pixel}
			* @private
			*/
			this.startPixel_ = null;
			/**
			* @private
			* @type {import("../events/condition.js").Condition}
			*/
			this.condition_ = options.condition ?? mouseActionButton;
			/**
			* @private
			* @type {EndCondition}
			*/
			this.boxEndCondition_ = options.boxEndCondition ?? this.defaultBoxEndCondition;
		}
		/**
		* The default condition for determining whether the boxend event
		* should fire.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent The originating MapBrowserEvent
		*     leading to the box end.
		* @param {import("../pixel.js").Pixel} startPixel The starting pixel of the box.
		* @param {import("../pixel.js").Pixel} endPixel The end pixel of the box.
		* @return {boolean} Whether or not the boxend condition should be fired.
		*/
		defaultBoxEndCondition(mapBrowserEvent, startPixel, endPixel) {
			const width = endPixel[0] - startPixel[0];
			const height = endPixel[1] - startPixel[1];
			return width * width + height * height >= this.minArea_;
		}
		/**
		* Returns geometry of last drawn box.
		* @return {import("../geom/Polygon.js").default} Geometry.
		* @api
		*/
		getGeometry() {
			return this.box_.getGeometry();
		}
		/**
		* Handle pointer drag events.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
		* @override
		*/
		handleDragEvent(mapBrowserEvent) {
			if (!this.startPixel_) return;
			this.box_.setPixels(this.startPixel_, mapBrowserEvent.pixel);
			this.dispatchEvent(new DragBoxEvent(DragBoxEventType.BOXDRAG, mapBrowserEvent.coordinate, mapBrowserEvent));
		}
		/**
		* Handle pointer up events.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
		* @return {boolean} If the event was consumed.
		* @override
		*/
		handleUpEvent(mapBrowserEvent) {
			if (!this.startPixel_) return false;
			const completeBox = this.boxEndCondition_(mapBrowserEvent, this.startPixel_, mapBrowserEvent.pixel);
			if (completeBox) this.onBoxEnd(mapBrowserEvent);
			this.dispatchEvent(new DragBoxEvent(completeBox ? DragBoxEventType.BOXEND : DragBoxEventType.BOXCANCEL, mapBrowserEvent.coordinate, mapBrowserEvent));
			this.box_.setMap(null);
			this.startPixel_ = null;
			return false;
		}
		/**
		* Handle pointer down events.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
		* @return {boolean} If the event was consumed.
		* @override
		*/
		handleDownEvent(mapBrowserEvent) {
			if (this.condition_(mapBrowserEvent)) {
				this.startPixel_ = mapBrowserEvent.pixel;
				this.box_.setMap(mapBrowserEvent.map);
				this.box_.setPixels(this.startPixel_, this.startPixel_);
				this.dispatchEvent(new DragBoxEvent(DragBoxEventType.BOXSTART, mapBrowserEvent.coordinate, mapBrowserEvent));
				return true;
			}
			return false;
		}
		/**
		* Function to execute just before `onboxend` is fired
		* @param {import("../MapBrowserEvent.js").default} event Event.
		*/
		onBoxEnd(event) {}
		/**
		* Activate or deactivate the interaction.
		* @param {boolean} active Active.
		* @observable
		* @api
		* @override
		*/
		setActive(active) {
			if (!active) {
				this.box_.setMap(null);
				if (this.startPixel_) {
					this.dispatchEvent(new DragBoxEvent(DragBoxEventType.BOXCANCEL, this.startPixel_, null));
					this.startPixel_ = null;
				}
			}
			super.setActive(active);
		}
		/**
		* @param {import("../Map.js").default|null} map Map.
		* @override
		*/
		setMap(map) {
			if (this.getMap()) {
				this.box_.setMap(null);
				if (this.startPixel_) {
					this.dispatchEvent(new DragBoxEvent(DragBoxEventType.BOXCANCEL, this.startPixel_, null));
					this.startPixel_ = null;
				}
			}
			super.setMap(map);
		}
	};
	//#endregion
	//#region src/ol/interaction/DragZoom.js
	/**
	* @module ol/interaction/DragZoom
	*/
	/**
	* @typedef {Object} Options
	* @property {string} [className='ol-dragzoom'] CSS class name for styling the
	* box.
	* @property {import("../events/condition.js").Condition} [condition] A function that
	* takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
	* boolean to indicate whether that event should be handled.
	* Default is {@link module:ol/events/condition.shiftKeyOnly}.
	* @property {number} [duration=200] Animation duration in milliseconds.
	* @property {boolean} [out=false] Use interaction for zooming out.
	* @property {number} [minArea=64] The minimum area of the box in pixel, this value is used by the parent default
	* `boxEndCondition` function.
	*/
	/**
	* @classdesc
	* Allows the user to zoom the map by clicking and dragging on the map,
	* normally combined with a {@link module:ol/events/condition} that limits
	* it to when a key, shift by default, is held down.
	*
	* To change the style of the box, use CSS and the `.ol-dragzoom` selector, or
	* your custom one configured with `className`.
	* @api
	*/
	var DragZoom = class extends DragBox {
		/**
		* @param {Options} [options] Options.
		*/
		constructor(options) {
			options = options ? options : {};
			const condition = options.condition ? options.condition : shiftKeyOnly;
			super({
				condition,
				className: options.className || "ol-dragzoom",
				minArea: options.minArea
			});
			/**
			* @private
			* @type {number}
			*/
			this.duration_ = options.duration !== void 0 ? options.duration : 200;
			/**
			* @private
			* @type {boolean}
			*/
			this.out_ = options.out !== void 0 ? options.out : false;
		}
		/**
		* Function to execute just before `onboxend` is fired
		* @param {import("../MapBrowserEvent.js").default} event Event.
		* @override
		*/
		onBoxEnd(event) {
			const view = this.getMap().getView();
			let geometry = this.getGeometry();
			if (this.out_) {
				const rotatedExtent = view.rotatedExtentForGeometry(geometry);
				const resolution = view.getResolutionForExtentInternal(rotatedExtent);
				const factor = view.getResolution() / resolution;
				geometry = geometry.clone();
				geometry.scale(factor * factor);
			}
			view.fitInternal(geometry, {
				duration: this.duration_,
				easing: easeOut
			});
		}
	};
	//#endregion
	//#region src/ol/events/Key.js
	/**
	* @module ol/events/Key
	*/
	/**
	* @enum {string}
	* @const
	*/
	var Key_default = {
		LEFT: "ArrowLeft",
		UP: "ArrowUp",
		RIGHT: "ArrowRight",
		DOWN: "ArrowDown"
	};
	//#endregion
	//#region src/ol/interaction/KeyboardPan.js
	/**
	* @module ol/interaction/KeyboardPan
	*/
	/**
	* @typedef {Object} Options
	* @property {import("../events/condition.js").Condition} [condition] A function that
	* takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
	* boolean to indicate whether that event should be handled. Default is
	* {@link module:ol/events/condition.noModifierKeys} and
	* {@link module:ol/events/condition.targetNotEditable}.
	* @property {number} [duration=100] Animation duration in milliseconds.
	* @property {number} [pixelDelta=128] The amount of pixels to pan on each key
	* press.
	*/
	/**
	* @classdesc
	* Allows the user to pan the map using keyboard arrows.
	* Note that, although this interaction is by default included in maps,
	* the keys can only be used when browser focus is on the element to which
	* the keyboard events are attached. By default, this is the map div,
	* though you can change this with the `keyboardEventTarget` in
	* {@link module:ol/Map~Map}. `document` never loses focus but, for any other
	* element, focus will have to be on, and returned to, this element if the keys
	* are to function.
	* See also {@link module:ol/interaction/KeyboardZoom~KeyboardZoom}.
	* @api
	*/
	var KeyboardPan = class extends Interaction {
		/**
		* @param {Options} [options] Options.
		*/
		constructor(options) {
			super();
			options = options || {};
			/**
			* @private
			* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Browser event.
			* @return {boolean} Combined condition result.
			*/
			this.defaultCondition_ = function(mapBrowserEvent) {
				return noModifierKeys(mapBrowserEvent) && targetNotEditable(mapBrowserEvent);
			};
			/**
			* @private
			* @type {import("../events/condition.js").Condition}
			*/
			this.condition_ = options.condition !== void 0 ? options.condition : this.defaultCondition_;
			/**
			* @private
			* @type {number}
			*/
			this.duration_ = options.duration !== void 0 ? options.duration : 100;
			/**
			* @private
			* @type {number}
			*/
			this.pixelDelta_ = options.pixelDelta !== void 0 ? options.pixelDelta : 128;
		}
		/**
		* Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} if it was a
		* `KeyEvent`, and decides the direction to pan to (if an arrow key was
		* pressed).
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
		* @return {boolean} `false` to stop event propagation.
		* @override
		*/
		handleEvent(mapBrowserEvent) {
			let stopEvent = false;
			if (mapBrowserEvent.type == EventType_default$2.KEYDOWN) {
				const keyEvent = mapBrowserEvent.originalEvent;
				const key = keyEvent.key;
				if (this.condition_(mapBrowserEvent) && (key == Key_default.DOWN || key == Key_default.LEFT || key == Key_default.RIGHT || key == Key_default.UP)) {
					const view = mapBrowserEvent.map.getView();
					const mapUnitsDelta = view.getResolution() * this.pixelDelta_;
					let deltaX = 0, deltaY = 0;
					if (key == Key_default.DOWN) deltaY = -mapUnitsDelta;
					else if (key == Key_default.LEFT) deltaX = -mapUnitsDelta;
					else if (key == Key_default.RIGHT) deltaX = mapUnitsDelta;
					else deltaY = mapUnitsDelta;
					const delta = [deltaX, deltaY];
					rotate$1(delta, view.getRotation());
					pan(view, delta, this.duration_);
					keyEvent.preventDefault();
					stopEvent = true;
				}
			}
			return !stopEvent;
		}
	};
	//#endregion
	//#region src/ol/interaction/KeyboardZoom.js
	/**
	* @module ol/interaction/KeyboardZoom
	*/
	/**
	* @typedef {Object} Options
	* @property {number} [duration=100] Animation duration in milliseconds.
	* @property {import("../events/condition.js").Condition} [condition] A function that
	* takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
	* boolean to indicate whether that event should be handled. The default condition is
	* that {@link module:ol/events/condition.targetNotEditable} is fulfilled and that
	* the platform modifier key isn't pressed
	* (!{@link module:ol/events/condition.platformModifierKey}).
	* @property {number} [delta=1] The zoom level delta on each key press.
	*/
	/**
	* @classdesc
	* Allows the user to zoom the map using keyboard + and -.
	* Note that, although this interaction is by default included in maps,
	* the keys can only be used when browser focus is on the element to which
	* the keyboard events are attached. By default, this is the map div,
	* though you can change this with the `keyboardEventTarget` in
	* {@link module:ol/Map~Map}. `document` never loses focus but, for any other
	* element, focus will have to be on, and returned to, this element if the keys
	* are to function.
	* See also {@link module:ol/interaction/KeyboardPan~KeyboardPan}.
	* @api
	*/
	var KeyboardZoom = class extends Interaction {
		/**
		* @param {Options} [options] Options.
		*/
		constructor(options) {
			super();
			options = options ? options : {};
			/**
			* @private
			* @type {import("../events/condition.js").Condition}
			*/
			this.condition_ = options.condition ? options.condition : function(mapBrowserEvent) {
				return !platformModifierKey(mapBrowserEvent) && targetNotEditable(mapBrowserEvent);
			};
			/**
			* @private
			* @type {number}
			*/
			this.delta_ = options.delta ? options.delta : 1;
			/**
			* @private
			* @type {number}
			*/
			this.duration_ = options.duration !== void 0 ? options.duration : 100;
		}
		/**
		* Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} if it was a
		* `KeyEvent`, and decides whether to zoom in or out (depending on whether the
		* key pressed was '+' or '-').
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
		* @return {boolean} `false` to stop event propagation.
		* @override
		*/
		handleEvent(mapBrowserEvent) {
			let stopEvent = false;
			if (mapBrowserEvent.type == EventType_default$2.KEYDOWN || mapBrowserEvent.type == EventType_default$2.KEYPRESS) {
				const keyEvent = mapBrowserEvent.originalEvent;
				const key = keyEvent.key;
				if (this.condition_(mapBrowserEvent) && (key === "+" || key === "-")) {
					const map = mapBrowserEvent.map;
					const delta = key === "+" ? this.delta_ : -this.delta_;
					zoomByDelta(map.getView(), delta, void 0, this.duration_);
					keyEvent.preventDefault();
					stopEvent = true;
				}
			}
			return !stopEvent;
		}
	};
	//#endregion
	//#region src/ol/interaction/MouseWheelZoom.js
	/**
	* @module ol/interaction/MouseWheelZoom
	*/
	/**
	* @typedef {'trackpad' | 'wheel'} Mode
	*/
	/**
	* @typedef {Object} Options
	* @property {import("../events/condition.js").Condition} [condition] A function that
	* takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
	* boolean to indicate whether that event should be handled. Default is
	* {@link module:ol/events/condition.always}.
	* @property {boolean} [onFocusOnly=false] When the map's target has a `tabindex` attribute set,
	* the interaction will only handle events when the map has the focus.
	* @property {number} [maxDelta=1] Maximum mouse wheel delta.
	* @property {number} [duration=250] Animation duration in milliseconds.
	* @property {number} [timeout=80] Mouse wheel timeout duration in milliseconds.
	* @property {boolean} [useAnchor=true] Enable zooming using the mouse's
	* location as the anchor. When set to `false`, zooming in and out will zoom to
	* the center of the screen instead of zooming on the mouse's location.
	* @property {boolean} [constrainResolution=false] If true, the mouse wheel zoom
	* event will always animate to the closest zoom level after an interaction;
	* false means intermediary zoom levels are allowed.
	*/
	/**
	* Mutliplier for the DOM_DELTA_LINE delta value.
	* @type {number}
	*/
	const DELTA_LINE_MULTIPLIER = 40;
	/**
	* Mutliplier for the DOM_DELTA_PAGE delta value.
	* @type {number}
	*/
	const DELTA_PAGE_MULTIPLIER = 300;
	/**
	* Mutliplier for the delta value when using pinch-to-zoom
	* @type {number}
	*/
	const DELTA_TRACKPAD_PINCH_TO_ZOOM_MULTIPLIER = 3;
	/**
	* @classdesc
	* Allows the user to zoom the map by scrolling the mouse wheel.
	* @api
	*/
	var MouseWheelZoom = class extends Interaction {
		/**
		* @param {Options} [options] Options.
		*/
		constructor(options) {
			options = options ? options : {};
			super(options);
			/**
			* @private
			* @type {number}
			*/
			this.totalDelta_ = 0;
			/**
			* @private
			* @type {number}
			*/
			this.lastDelta_ = 0;
			/**
			* @private
			* @type {number}
			*/
			this.maxDelta_ = options.maxDelta !== void 0 ? options.maxDelta : 1;
			/**
			* @private
			* @type {number}
			*/
			this.duration_ = options.duration !== void 0 ? options.duration : 250;
			/**
			* @private
			* @type {number}
			*/
			this.timeout_ = options.timeout !== void 0 ? options.timeout : 80;
			/**
			* @private
			* @type {boolean}
			*/
			this.useAnchor_ = options.useAnchor !== void 0 ? options.useAnchor : true;
			/**
			* @private
			* @type {boolean}
			*/
			this.constrainResolution_ = options.constrainResolution !== void 0 ? options.constrainResolution : false;
			const condition = options.condition ? options.condition : always$1;
			/**
			* @private
			* @type {import("../events/condition.js").Condition}
			*/
			this.condition_ = options.onFocusOnly ? all(focusWithTabindex, condition) : condition;
			/**
			* @private
			* @type {?import("../pixel.js").Pixel}
			*/
			this.lastAnchor_ = null;
			/**
			* @private
			* @type {number|undefined}
			*/
			this.startTime_ = void 0;
			/**
			* @private
			* @type {ReturnType<typeof setTimeout>}
			*/
			this.timeoutId_;
			/**
			* @private
			* @type {Mode|undefined}
			*/
			this.mode_ = void 0;
			/**
			* Trackpad events separated by this delay will be considered separate
			* interactions.
			* @private
			* @type {number}
			*/
			this.trackpadEventGap_ = 400;
			/**
			* @private
			* @type {ReturnType<typeof setTimeout>}
			*/
			this.trackpadTimeoutId_;
			/**
			* The number of delta values per zoom level
			* @private
			* @type {number}
			*/
			this.deltaPerZoom_ = 300;
			/**
			* Tracks whether the Ctrl key is physically held down (as opposed to the
			* browser synthesizing ctrlKey=true for pinch-to-zoom trackpad gestures).
			* @private
			* @type {boolean}
			*/
			this.ctrlKeyPressed_ = false;
			/**
			* @private
			* @type {Array<import('../events.js').EventsKey>}
			*/
			this.ctrlKeyListenerKeys_ = [];
		}
		/**
		* @param {import('../Map.js').default|null} map Map.
		* @override
		*/
		setMap(map) {
			this.ctrlKeyListenerKeys_.forEach(unlistenByKey);
			this.ctrlKeyListenerKeys_.length = 0;
			this.ctrlKeyPressed_ = false;
			super.setMap(map);
			if (map) {
				const doc = map.getOwnerDocument();
				this.ctrlKeyListenerKeys_.push(listen(doc, "keydown", (e) => {
					if (e.key === "Control") this.ctrlKeyPressed_ = true;
				}), listen(doc, "keyup", (e) => {
					if (e.key === "Control") this.ctrlKeyPressed_ = false;
				}));
			}
		}
		/**
		* @private
		*/
		endInteraction_() {
			this.trackpadTimeoutId_ = void 0;
			const map = this.getMap();
			if (!map) return;
			const view = map.getView();
			const direction = this.lastDelta_ ? this.lastDelta_ > 0 ? 1 : -1 : 0;
			view.endInteraction(this.constrainResolution_ || view.getConstrainResolution() ? 100 : void 0, direction, this.lastAnchor_ ? map.getCoordinateFromPixel(this.lastAnchor_) : null);
		}
		/**
		* Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} (if it was a mousewheel-event) and eventually
		* zooms the map.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
		* @return {boolean} `false` to stop event propagation.
		* @override
		*/
		handleEvent(mapBrowserEvent) {
			if (!this.condition_(mapBrowserEvent)) return true;
			if (mapBrowserEvent.type !== EventType_default$2.WHEEL) return true;
			const map = mapBrowserEvent.map;
			const wheelEvent = mapBrowserEvent.originalEvent;
			wheelEvent.preventDefault();
			const isPinchToZoom = wheelEvent.ctrlKey && !this.ctrlKeyPressed_;
			if (!wheelEvent.ctrlKey) this.ctrlKeyPressed_ = false;
			if (this.useAnchor_) this.lastAnchor_ = mapBrowserEvent.pixel;
			let delta = wheelEvent.deltaY;
			switch (wheelEvent.deltaMode) {
				case WheelEvent.DOM_DELTA_LINE:
					delta *= DELTA_LINE_MULTIPLIER;
					break;
				case WheelEvent.DOM_DELTA_PAGE:
					delta *= DELTA_PAGE_MULTIPLIER;
					break;
				default:
			}
			if (delta === 0) return false;
			this.lastDelta_ = delta;
			const now = Date.now();
			if (this.startTime_ === void 0) this.startTime_ = now;
			if (!this.mode_ || now - this.startTime_ > this.trackpadEventGap_) this.mode_ = Math.abs(delta) < 4 ? "trackpad" : "wheel";
			const view = map.getView();
			if (this.mode_ === "trackpad") {
				if (this.trackpadTimeoutId_) clearTimeout(this.trackpadTimeoutId_);
				else {
					if (view.getAnimating()) view.cancelAnimations();
					view.beginInteraction();
				}
				this.trackpadTimeoutId_ = setTimeout(this.endInteraction_.bind(this), this.timeout_);
				if (isPinchToZoom) delta = delta * DELTA_TRACKPAD_PINCH_TO_ZOOM_MULTIPLIER;
				view.adjustZoom(-delta / this.deltaPerZoom_, this.lastAnchor_ ? map.getCoordinateFromPixel(this.lastAnchor_) : null);
				this.startTime_ = now;
				return false;
			}
			this.totalDelta_ += delta;
			const timeLeft = Math.max(this.timeout_ - (now - this.startTime_), 0);
			clearTimeout(this.timeoutId_);
			this.timeoutId_ = setTimeout(this.handleWheelZoom_.bind(this, map), timeLeft);
			return false;
		}
		/**
		* @private
		* @param {import("../Map.js").default} map Map.
		*/
		handleWheelZoom_(map) {
			const view = map.getView();
			if (view.getAnimating()) view.cancelAnimations();
			let delta = -clamp(this.totalDelta_, -this.maxDelta_ * this.deltaPerZoom_, this.maxDelta_ * this.deltaPerZoom_) / this.deltaPerZoom_;
			if (view.getConstrainResolution() || this.constrainResolution_) delta = delta ? delta > 0 ? 1 : -1 : 0;
			zoomByDelta(view, delta, this.lastAnchor_ ? map.getCoordinateFromPixel(this.lastAnchor_) : null, this.duration_);
			this.mode_ = void 0;
			this.totalDelta_ = 0;
			this.lastAnchor_ = null;
			this.startTime_ = void 0;
			this.timeoutId_ = void 0;
		}
		/**
		* Enable or disable using the mouse's location as an anchor when zooming
		* @param {boolean} useAnchor true to zoom to the mouse's location, false
		* to zoom to the center of the map
		* @api
		*/
		setMouseAnchor(useAnchor) {
			this.useAnchor_ = useAnchor;
			if (!useAnchor) this.lastAnchor_ = null;
		}
	};
	//#endregion
	//#region src/ol/interaction/PinchRotate.js
	/**
	* @module ol/interaction/PinchRotate
	*/
	/**
	* @typedef {Object} Options
	* @property {number} [duration=250] The duration of the animation in
	* milliseconds.
	* @property {number} [threshold=0.3] Minimal angle in radians to start a rotation.
	*/
	/**
	* @classdesc
	* Allows the user to rotate the map by twisting with two fingers
	* on a touch screen.
	* @api
	*/
	var PinchRotate = class extends PointerInteraction {
		/**
		* @param {Options} [options] Options.
		*/
		constructor(options) {
			options = options ? options : {};
			const pointerOptions = options;
			if (!pointerOptions.stopDown) pointerOptions.stopDown = FALSE;
			super(pointerOptions);
			/**
			* @private
			* @type {import("../coordinate.js").Coordinate}
			*/
			this.anchor_ = null;
			/**
			* @private
			* @type {number|undefined}
			*/
			this.lastAngle_ = void 0;
			/**
			* @private
			* @type {boolean}
			*/
			this.rotating_ = false;
			/**
			* @private
			* @type {number}
			*/
			this.rotationDelta_ = 0;
			/**
			* @private
			* @type {number}
			*/
			this.threshold_ = options.threshold !== void 0 ? options.threshold : .3;
			/**
			* @private
			* @type {number}
			*/
			this.duration_ = options.duration !== void 0 ? options.duration : 250;
		}
		/**
		* Handle pointer drag events.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
		* @override
		*/
		handleDragEvent(mapBrowserEvent) {
			let rotationDelta = 0;
			const touch0 = this.targetPointers[0];
			const touch1 = this.targetPointers[1];
			const angle = Math.atan2(touch1.clientY - touch0.clientY, touch1.clientX - touch0.clientX);
			if (this.lastAngle_ !== void 0) {
				const delta = angle - this.lastAngle_;
				this.rotationDelta_ += delta;
				if (!this.rotating_ && Math.abs(this.rotationDelta_) > this.threshold_) this.rotating_ = true;
				rotationDelta = delta;
			}
			this.lastAngle_ = angle;
			const map = mapBrowserEvent.map;
			const view = map.getView();
			if (view.getConstraints().rotation === disable) return;
			this.anchor_ = map.getCoordinateFromPixelInternal(map.getEventPixel(centroid(this.targetPointers)));
			if (this.rotating_) {
				map.render();
				view.adjustRotationInternal(rotationDelta, this.anchor_);
			}
		}
		/**
		* Handle pointer up events.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
		* @return {boolean} If the event was consumed.
		* @override
		*/
		handleUpEvent(mapBrowserEvent) {
			if (this.targetPointers.length < 2) {
				mapBrowserEvent.map.getView().endInteraction(this.duration_);
				return false;
			}
			return true;
		}
		/**
		* Handle pointer down events.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
		* @return {boolean} If the event was consumed.
		* @override
		*/
		handleDownEvent(mapBrowserEvent) {
			if (this.targetPointers.length >= 2) {
				const map = mapBrowserEvent.map;
				this.anchor_ = null;
				this.lastAngle_ = void 0;
				this.rotating_ = false;
				this.rotationDelta_ = 0;
				if (!this.handlingDownUpSequence) map.getView().beginInteraction();
				return true;
			}
			return false;
		}
	};
	//#endregion
	//#region src/ol/interaction/PinchZoom.js
	/**
	* @module ol/interaction/PinchZoom
	*/
	/**
	* @typedef {Object} Options
	* @property {number} [duration=400] Animation duration in milliseconds.
	*/
	/**
	* @classdesc
	* Allows the user to zoom the map by pinching with two fingers
	* on a touch screen.
	* @api
	*/
	var PinchZoom = class extends PointerInteraction {
		/**
		* @param {Options} [options] Options.
		*/
		constructor(options) {
			options = options ? options : {};
			const pointerOptions = options;
			if (!pointerOptions.stopDown) pointerOptions.stopDown = FALSE;
			super(pointerOptions);
			/**
			* @private
			* @type {import("../coordinate.js").Coordinate}
			*/
			this.anchor_ = null;
			/**
			* @private
			* @type {number}
			*/
			this.duration_ = options.duration !== void 0 ? options.duration : 400;
			/**
			* @private
			* @type {number|undefined}
			*/
			this.lastDistance_ = void 0;
			/**
			* @private
			* @type {number}
			*/
			this.lastScaleDelta_ = 1;
		}
		/**
		* Handle pointer drag events.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
		* @override
		*/
		handleDragEvent(mapBrowserEvent) {
			let scaleDelta = 1;
			const touch0 = this.targetPointers[0];
			const touch1 = this.targetPointers[1];
			const dx = touch0.clientX - touch1.clientX;
			const dy = touch0.clientY - touch1.clientY;
			const distance = Math.sqrt(dx * dx + dy * dy);
			if (this.lastDistance_ !== void 0) scaleDelta = this.lastDistance_ / distance;
			this.lastDistance_ = distance;
			const map = mapBrowserEvent.map;
			const view = map.getView();
			if (scaleDelta != 1) this.lastScaleDelta_ = scaleDelta;
			this.anchor_ = map.getCoordinateFromPixelInternal(map.getEventPixel(centroid(this.targetPointers)));
			map.render();
			view.adjustResolutionInternal(scaleDelta, this.anchor_);
		}
		/**
		* Handle pointer up events.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
		* @return {boolean} If the event was consumed.
		* @override
		*/
		handleUpEvent(mapBrowserEvent) {
			if (this.targetPointers.length < 2) {
				const view = mapBrowserEvent.map.getView();
				const direction = this.lastScaleDelta_ > 1 ? 1 : -1;
				view.endInteraction(this.duration_, direction);
				return false;
			}
			return true;
		}
		/**
		* Handle pointer down events.
		* @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
		* @return {boolean} If the event was consumed.
		* @override
		*/
		handleDownEvent(mapBrowserEvent) {
			if (this.targetPointers.length >= 2) {
				const map = mapBrowserEvent.map;
				this.anchor_ = null;
				this.lastDistance_ = void 0;
				this.lastScaleDelta_ = 1;
				if (!this.handlingDownUpSequence) map.getView().beginInteraction();
				return true;
			}
			return false;
		}
	};
	//#endregion
	//#region src/ol/interaction/defaults.js
	/**
	* @module ol/interaction/defaults
	*/
	/**
	* @typedef {Object} DefaultsOptions
	* @property {boolean} [altShiftDragRotate=true] Whether Alt-Shift-drag rotate is
	* desired.
	* @property {boolean} [onFocusOnly=false] Interact only when the map has the
	* focus. This affects the `MouseWheelZoom` and `DragPan` interactions and is
	* useful when page scroll is desired for maps that do not have the browser's
	* focus.
	* @property {boolean} [doubleClickZoom=true] Whether double click zoom is
	* desired.
	* @property {boolean} [keyboard=true] Whether keyboard interaction is desired.
	* @property {boolean} [mouseWheelZoom=true] Whether mousewheel zoom is desired.
	* @property {boolean} [shiftDragZoom=true] Whether Shift-drag zoom is desired.
	* @property {boolean} [dragPan=true] Whether drag pan is desired.
	* @property {boolean} [pinchRotate=true] Whether pinch rotate is desired.
	* @property {boolean} [pinchZoom=true] Whether pinch zoom is desired.
	* @property {number} [zoomDelta] Zoom level delta when using keyboard or double click zoom.
	* @property {number} [zoomDuration] Duration of the zoom animation in
	* milliseconds.
	*/
	/**
	* Set of interactions included in maps by default. Specific interactions can be
	* excluded by setting the appropriate option to false in the constructor
	* options, but the order of the interactions is fixed.  If you want to specify
	* a different order for interactions, you will need to create your own
	* {@link module:ol/interaction/Interaction~Interaction} instances and insert
	* them into a {@link module:ol/Collection~Collection} in the order you want
	* before creating your {@link module:ol/Map~Map} instance. Changing the order can
	* be of interest if the event propagation needs to be stopped at a point.
	* The default set of interactions, in sequence, is:
	* {@link module:ol/interaction/DragRotate~DragRotate}
	* {@link module:ol/interaction/DoubleClickZoom~DoubleClickZoom}
	* {@link module:ol/interaction/DragPan~DragPan}
	* {@link module:ol/interaction/PinchRotate~PinchRotate}
	* {@link module:ol/interaction/PinchZoom~PinchZoom}
	* {@link module:ol/interaction/KeyboardPan~KeyboardPan}
	* {@link module:ol/interaction/KeyboardZoom~KeyboardZoom}
	* {@link module:ol/interaction/MouseWheelZoom~MouseWheelZoom}
	* {@link module:ol/interaction/DragZoom~DragZoom}
	*
	* @param {DefaultsOptions} [options] Defaults options.
	* @return {Collection<import("./Interaction.js").default>}
	* A collection of interactions to be used with the {@link module:ol/Map~Map}
	* constructor's `interactions` option.
	* @api
	*/
	function defaults(options) {
		options = options ? options : {};
		/** @type {Collection<import("./Interaction.js").default>} */
		const interactions = new Collection();
		const kinetic = new Kinetic(-.005, .05, 100);
		if (options.altShiftDragRotate !== void 0 ? options.altShiftDragRotate : true) interactions.push(new DragRotate());
		if (options.doubleClickZoom !== void 0 ? options.doubleClickZoom : true) interactions.push(new DoubleClickZoom({
			delta: options.zoomDelta,
			duration: options.zoomDuration
		}));
		if (options.dragPan !== void 0 ? options.dragPan : true) interactions.push(new DragPan({
			onFocusOnly: options.onFocusOnly,
			kinetic
		}));
		if (options.pinchRotate !== void 0 ? options.pinchRotate : true) interactions.push(new PinchRotate());
		if (options.pinchZoom !== void 0 ? options.pinchZoom : true) interactions.push(new PinchZoom({ duration: options.zoomDuration }));
		if (options.keyboard !== void 0 ? options.keyboard : true) {
			interactions.push(new KeyboardPan());
			interactions.push(new KeyboardZoom({
				delta: options.zoomDelta,
				duration: options.zoomDuration
			}));
		}
		if (options.mouseWheelZoom !== void 0 ? options.mouseWheelZoom : true) interactions.push(new MouseWheelZoom({
			onFocusOnly: options.onFocusOnly,
			duration: options.zoomDuration
		}));
		if (options.shiftDragZoom !== void 0 ? options.shiftDragZoom : true) interactions.push(new DragZoom({ duration: options.zoomDuration }));
		return interactions;
	}
	//#endregion
	//#region src/ol/layer/Property.js
	/**
	* @module ol/layer/Property
	*/
	/**
	* @enum {string}
	*/
	var Property_default = {
		OPACITY: "opacity",
		VISIBLE: "visible",
		EXTENT: "extent",
		Z_INDEX: "zIndex",
		MAX_RESOLUTION: "maxResolution",
		MIN_RESOLUTION: "minResolution",
		MAX_ZOOM: "maxZoom",
		MIN_ZOOM: "minZoom",
		SOURCE: "source",
		MAP: "map"
	};
	//#endregion
	//#region src/ol/layer/Base.js
	/**
	* @module ol/layer/Base
	*/
	/**
	* A css color, or a function called with a view resolution returning a css color.
	*
	* @typedef {string|function(number):string} BackgroundColor
	* @api
	*/
	/**
	* @typedef {import("../ObjectEventType.js").Types|'change:extent'|'change:maxResolution'|'change:maxZoom'|
	*    'change:minResolution'|'change:minZoom'|'change:opacity'|'change:visible'|'change:zIndex'} BaseLayerObjectEventTypes
	*/
	/***
	* @template Return
	* @typedef {import("../Observable.js").OnSignature<import("../Observable.js").EventTypes, import("../events/Event.js").default, Return> &
	*   import("../Observable.js").OnSignature<BaseLayerObjectEventTypes, import("../Object.js").ObjectEvent, Return> &
	*   import("../Observable.js").CombinedOnSignature<import("../Observable.js").EventTypes|BaseLayerObjectEventTypes, Return>} BaseLayerOnSignature
	*/
	/**
	* @template {Object<string, *>} [Properties=Object<string, *>]
	* @typedef {Object} Options
	* @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
	* @property {number} [opacity=1] Opacity (0, 1).
	* @property {boolean} [visible=true] Visibility.
	* @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
	* rendered outside of this extent.
	* @property {number | undefined} [zIndex] The z-index for layer rendering.  At rendering time, the layers
	* will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
	* for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
	* method was used.
	* @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
	* visible.
	* @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
	* be visible.
	* @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
	* visible.
	* @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
	* be visible.
	* @property {BackgroundColor} [background] Background color for the layer. If not specified, no background
	* will be rendered.
	* @property {Properties} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
	*/
	/**
	* @classdesc
	* Abstract base class; normally only used for creating subclasses and not
	* instantiated in apps.
	* Note that with {@link module:ol/layer/Base~BaseLayer} and all its subclasses, any property set in
	* the options is set as a {@link module:ol/Object~BaseObject} property on the layer object, so
	* is observable, and has get/set accessors.
	*
	* @api
	* @template {Object<string, *>} [Properties=Object<string, *>]
	* @extends {BaseObject<NoInfer<Properties> & Object<string, *>>}
	*/
	var BaseLayer = class extends BaseObject {
		/**
		* @param {Options<NoInfer<Properties>>} options Layer options.
		*/
		constructor(options) {
			super();
			/***
			* @type {BaseLayerOnSignature<import("../events.js").EventsKey>}
			*/
			this.on;
			/***
			* @type {BaseLayerOnSignature<import("../events.js").EventsKey>}
			*/
			this.once;
			/***
			* @type {BaseLayerOnSignature<void>}
			*/
			this.un;
			/**
			* @type {BackgroundColor|false}
			* @private
			*/
			this.background_ = options.background;
			/**
			* @type {?}
			*/
			const properties = Object.assign({}, options);
			if (typeof options.properties === "object") {
				delete properties.properties;
				Object.assign(properties, options.properties);
			}
			properties[Property_default.OPACITY] = options.opacity !== void 0 ? options.opacity : 1;
			assert(typeof properties[Property_default.OPACITY] === "number", "Layer opacity must be a number");
			properties[Property_default.VISIBLE] = options.visible !== void 0 ? options.visible : true;
			properties[Property_default.Z_INDEX] = options.zIndex;
			properties[Property_default.MAX_RESOLUTION] = options.maxResolution !== void 0 ? options.maxResolution : Infinity;
			properties[Property_default.MIN_RESOLUTION] = options.minResolution !== void 0 ? options.minResolution : 0;
			properties[Property_default.MIN_ZOOM] = options.minZoom !== void 0 ? options.minZoom : -Infinity;
			properties[Property_default.MAX_ZOOM] = options.maxZoom !== void 0 ? options.maxZoom : Infinity;
			/**
			* @type {string}
			* @private
			*/
			this.className_ = properties.className !== void 0 ? properties.className : "ol-layer";
			delete properties.className;
			this.setProperties(properties);
			/**
			* @type {import("./Layer.js").State}
			* @private
			*/
			this.state_ = null;
		}
		/**
		* Get the background for this layer.
		* @return {BackgroundColor|false} Layer background.
		*/
		getBackground() {
			return this.background_;
		}
		/**
		* @return {string} CSS class name.
		*/
		getClassName() {
			return this.className_;
		}
		/**
		* This method is not meant to be called by layers or layer renderers because the state
		* is incorrect if the layer is included in a layer group.
		*
		* @param {boolean} [managed] Layer is managed.
		* @return {import("./Layer.js").State} Layer state.
		*/
		getLayerState(managed) {
			/** @type {import("./Layer.js").State} */
			const state = this.state_ || {
				layer: this,
				managed: managed === void 0 ? true : managed
			};
			const zIndex = this.getZIndex();
			state.opacity = clamp(Math.round(this.getOpacity() * 100) / 100, 0, 1);
			state.visible = this.getVisible();
			state.extent = this.getExtent();
			state.zIndex = zIndex === void 0 && !state.managed ? Infinity : zIndex;
			state.maxResolution = this.getMaxResolution();
			state.minResolution = Math.max(this.getMinResolution(), 0);
			state.minZoom = this.getMinZoom();
			state.maxZoom = this.getMaxZoom();
			this.state_ = state;
			return state;
		}
		/**
		* @abstract
		* @param {Array<import("./Layer.js").default>} [array] Array of layers (to be
		*     modified in place).
		* @return {Array<import("./Layer.js").default>} Array of layers.
		*/
		getLayersArray(array) {
			return abstract();
		}
		/**
		* @abstract
		* @param {Array<import("./Layer.js").State>} [states] Optional list of layer
		*     states (to be modified in place).
		* @return {Array<import("./Layer.js").State>} List of layer states.
		*/
		getLayerStatesArray(states) {
			return abstract();
		}
		/**
		* Return the {@link module:ol/extent~Extent extent} of the layer or `undefined` if it
		* will be visible regardless of extent.
		* @return {import("../extent.js").Extent|undefined} The layer extent.
		* @observable
		* @api
		*/
		getExtent() {
			return this.get(Property_default.EXTENT);
		}
		/**
		* Return the maximum resolution of the layer. Returns Infinity if
		* the layer has no maximum resolution set.
		* @return {number} The maximum resolution of the layer.
		* @observable
		* @api
		*/
		getMaxResolution() {
			return this.get(Property_default.MAX_RESOLUTION);
		}
		/**
		* Return the minimum resolution of the layer. Returns 0 if
		* the layer has no minimum resolution set.
		* @return {number} The minimum resolution of the layer.
		* @observable
		* @api
		*/
		getMinResolution() {
			return this.get(Property_default.MIN_RESOLUTION);
		}
		/**
		* Return the minimum zoom level of the layer. Returns -Infinity if
		* the layer has no minimum zoom set.
		* @return {number} The minimum zoom level of the layer.
		* @observable
		* @api
		*/
		getMinZoom() {
			return this.get(Property_default.MIN_ZOOM);
		}
		/**
		* Return the maximum zoom level of the layer. Returns Infinity if
		* the layer has no maximum zoom set.
		* @return {number} The maximum zoom level of the layer.
		* @observable
		* @api
		*/
		getMaxZoom() {
			return this.get(Property_default.MAX_ZOOM);
		}
		/**
		* Return the opacity of the layer (between 0 and 1).
		* @return {number} The opacity of the layer.
		* @observable
		* @api
		*/
		getOpacity() {
			return this.get(Property_default.OPACITY);
		}
		/**
		* @abstract
		* @return {import("../source/Source.js").State} Source state.
		*/
		getSourceState() {
			return abstract();
		}
		/**
		* Return the value of this layer's `visible` property. To find out whether the layer
		* is visible on a map, use `isVisible()` instead.
		* @return {boolean} The value of the `visible` property of the layer.
		* @observable
		* @api
		*/
		getVisible() {
			return this.get(Property_default.VISIBLE);
		}
		/**
		* Return the Z-index of the layer, which is used to order layers before
		* rendering. Returns undefined if the layer is unmanaged.
		* @return {number|undefined} The Z-index of the layer.
		* @observable
		* @api
		*/
		getZIndex() {
			return this.get(Property_default.Z_INDEX);
		}
		/**
		* Sets the background color.
		* @param {BackgroundColor} [background] Background color.
		*/
		setBackground(background) {
			this.background_ = background;
			this.changed();
		}
		/**
		* Set the extent at which the layer is visible.  If `undefined`, the layer
		* will be visible at all extents.
		* @param {import("../extent.js").Extent|undefined} extent The extent of the layer.
		* @observable
		* @api
		*/
		setExtent(extent) {
			this.set(Property_default.EXTENT, extent);
		}
		/**
		* Set the maximum resolution at which the layer is visible.
		* @param {number} maxResolution The maximum resolution of the layer.
		* @observable
		* @api
		*/
		setMaxResolution(maxResolution) {
			this.set(Property_default.MAX_RESOLUTION, maxResolution);
		}
		/**
		* Set the minimum resolution at which the layer is visible.
		* @param {number} minResolution The minimum resolution of the layer.
		* @observable
		* @api
		*/
		setMinResolution(minResolution) {
			this.set(Property_default.MIN_RESOLUTION, minResolution);
		}
		/**
		* Set the maximum zoom (exclusive) at which the layer is visible.
		* Note that the zoom levels for layer visibility are based on the
		* view zoom level, which may be different from a tile source zoom level.
		* @param {number} maxZoom The maximum zoom of the layer.
		* @observable
		* @api
		*/
		setMaxZoom(maxZoom) {
			this.set(Property_default.MAX_ZOOM, maxZoom);
		}
		/**
		* Set the minimum zoom (inclusive) at which the layer is visible.
		* Note that the zoom levels for layer visibility are based on the
		* view zoom level, which may be different from a tile source zoom level.
		* @param {number} minZoom The minimum zoom of the layer.
		* @observable
		* @api
		*/
		setMinZoom(minZoom) {
			this.set(Property_default.MIN_ZOOM, minZoom);
		}
		/**
		* Set the opacity of the layer, allowed values range from 0 to 1.
		* @param {number} opacity The opacity of the layer.
		* @observable
		* @api
		*/
		setOpacity(opacity) {
			assert(typeof opacity === "number", "Layer opacity must be a number");
			this.set(Property_default.OPACITY, opacity);
		}
		/**
		* Set the visibility of the layer (`true` or `false`).
		* @param {boolean} visible The visibility of the layer.
		* @observable
		* @api
		*/
		setVisible(visible) {
			this.set(Property_default.VISIBLE, visible);
		}
		/**
		* Set Z-index of the layer, which is used to order layers before rendering.
		* The default Z-index is 0.
		* @param {number} zindex The z-index of the layer.
		* @observable
		* @api
		*/
		setZIndex(zindex) {
			this.set(Property_default.Z_INDEX, zindex);
		}
		/**
		* Clean up.
		* @override
		*/
		disposeInternal() {
			if (this.state_) {
				this.state_.layer = null;
				this.state_ = null;
			}
			super.disposeInternal();
		}
	};
	//#endregion
	//#region src/ol/layer/Group.js
	/**
	* @module ol/layer/Group
	*/
	/**
	* @enum {string}
	*/
	const GroupEventType = {
		/**
		* Triggered when a layer is added
		* @event GroupEvent#addlayer
		* @api
		*/
		ADDLAYER: "addlayer",
		/**
		* Triggered when a layer is removed
		* @event GroupEvent#removelayer
		* @api
		*/
		REMOVELAYER: "removelayer"
	};
	/**
	* @classdesc
	* A layer group triggers 'addlayer' and 'removelayer' events when layers are added to or removed from
	* the group or one of its child groups.  When a layer group is added to or removed from another layer group,
	* a single event will be triggered (instead of one per layer in the group added or removed).
	*/
	var GroupEvent = class extends BaseEvent {
		/**
		* @param {GroupEventType} type The event type.
		* @param {BaseLayer} layer The layer.
		*/
		constructor(type, layer) {
			super(type);
			/**
			* The added or removed layer.
			* @type {BaseLayer}
			* @api
			*/
			this.layer = layer;
		}
	};
	/***
	* @template Return
	* @typedef {import("../Observable.js").OnSignature<import("../Observable.js").EventTypes, import("../events/Event.js").default, Return> &
	*   import("../Observable.js").OnSignature<import("./Base.js").BaseLayerObjectEventTypes|
	*     'change:layers', import("../Object.js").ObjectEvent, Return> &
	*   import("../Observable.js").OnSignature<'addlayer'|'removelayer', GroupEvent, Return> &
	*   import("../Observable.js").CombinedOnSignature<import("../Observable.js").EventTypes|import("./Base.js").BaseLayerObjectEventTypes|'addlayer'|'removelayer'|'change:layers', Return>} GroupOnSignature
	*/
	/**
	* @typedef {Object} Options
	* @property {number} [opacity=1] Opacity (0, 1).
	* @property {boolean} [visible=true] Visibility.
	* @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
	* rendered outside of this extent.
	* @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
	* will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
	* for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
	* method was used.
	* @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
	* visible.
	* @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
	* be visible.
	* @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
	* visible.
	* @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
	* be visible.
	* @property {Array<import("./Base.js").default>|Collection<import("./Base.js").default>} [layers] Child layers.
	* @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
	*/
	/**
	* @enum {string}
	* @private
	*/
	const Property$1 = { LAYERS: "layers" };
	/**
	* @classdesc
	* A {@link module:ol/Collection~Collection} of layers that are handled together.
	*
	* A generic `change` event is triggered when the group/Collection changes.
	*
	* @fires GroupEvent
	* @api
	*/
	var LayerGroup = class LayerGroup extends BaseLayer {
		/**
		* @param {Options} [options] Layer options.
		*/
		constructor(options) {
			options = options || {};
			const baseOptions = Object.assign({}, options);
			delete baseOptions.layers;
			let layers = options.layers;
			super(baseOptions);
			/***
			* @type {GroupOnSignature<import("../events.js").EventsKey>}
			*/
			this.on;
			/***
			* @type {GroupOnSignature<import("../events.js").EventsKey>}
			*/
			this.once;
			/***
			* @type {GroupOnSignature<void>}
			*/
			this.un;
			/**
			* @private
			* @type {Array<import("../events.js").EventsKey>}
			*/
			this.layersListenerKeys_ = [];
			/**
			* @private
			* @type {Object<string, Array<import("../events.js").EventsKey>>}
			*/
			this.listenerKeys_ = {};
			this.addChangeListener(Property$1.LAYERS, this.handleLayersChanged_);
			if (layers) if (Array.isArray(layers)) layers = new Collection(layers.slice(), { unique: true });
			else assert(typeof layers.getArray === "function", "Expected `layers` to be an array or a `Collection`");
			else layers = new Collection(void 0, { unique: true });
			this.setLayers(layers);
		}
		/**
		* @private
		*/
		handleLayerChange_() {
			this.changed();
		}
		/**
		* @private
		*/
		handleLayersChanged_() {
			this.layersListenerKeys_.forEach(unlistenByKey);
			this.layersListenerKeys_.length = 0;
			const layers = this.getLayers();
			this.layersListenerKeys_.push(listen(layers, CollectionEventType_default.ADD, this.handleLayersAdd_, this), listen(layers, CollectionEventType_default.REMOVE, this.handleLayersRemove_, this));
			for (const id in this.listenerKeys_) this.listenerKeys_[id].forEach(unlistenByKey);
			clear(this.listenerKeys_);
			const layersArray = layers.getArray();
			for (let i = 0, ii = layersArray.length; i < ii; i++) {
				const layer = layersArray[i];
				this.registerLayerListeners_(layer);
				this.dispatchEvent(new GroupEvent(GroupEventType.ADDLAYER, layer));
			}
			this.changed();
		}
		/**
		* @param {BaseLayer} layer The layer.
		*/
		registerLayerListeners_(layer) {
			const listenerKeys = [listen(layer, ObjectEventType_default.PROPERTYCHANGE, this.handleLayerChange_, this), listen(layer, EventType_default$2.CHANGE, this.handleLayerChange_, this)];
			if (layer instanceof LayerGroup) listenerKeys.push(listen(layer, GroupEventType.ADDLAYER, this.handleLayerGroupAdd_, this), listen(layer, GroupEventType.REMOVELAYER, this.handleLayerGroupRemove_, this));
			this.listenerKeys_[getUid(layer)] = listenerKeys;
		}
		/**
		* @param {GroupEvent} event The layer group event.
		*/
		handleLayerGroupAdd_(event) {
			this.dispatchEvent(new GroupEvent(GroupEventType.ADDLAYER, event.layer));
		}
		/**
		* @param {GroupEvent} event The layer group event.
		*/
		handleLayerGroupRemove_(event) {
			this.dispatchEvent(new GroupEvent(GroupEventType.REMOVELAYER, event.layer));
		}
		/**
		* @param {import("../Collection.js").CollectionEvent<import("./Base.js").default>} collectionEvent CollectionEvent.
		* @private
		*/
		handleLayersAdd_(collectionEvent) {
			const layer = collectionEvent.element;
			this.registerLayerListeners_(layer);
			this.dispatchEvent(new GroupEvent(GroupEventType.ADDLAYER, layer));
			this.changed();
		}
		/**
		* @param {import("../Collection.js").CollectionEvent<import("./Base.js").default>} collectionEvent CollectionEvent.
		* @private
		*/
		handleLayersRemove_(collectionEvent) {
			const layer = collectionEvent.element;
			const key = getUid(layer);
			this.listenerKeys_[key].forEach(unlistenByKey);
			delete this.listenerKeys_[key];
			this.dispatchEvent(new GroupEvent(GroupEventType.REMOVELAYER, layer));
			this.changed();
		}
		/**
		* Returns the {@link module:ol/Collection~Collection collection} of {@link module:ol/layer/Layer~Layer layers}
		* in this group.
		* @return {!Collection<import("./Base.js").default>} Collection of
		*   {@link module:ol/layer/Base~BaseLayer layers} that are part of this group.
		* @observable
		* @api
		*/
		getLayers() {
			return this.get(Property$1.LAYERS);
		}
		/**
		* Set the {@link module:ol/Collection~Collection collection} of {@link module:ol/layer/Layer~Layer layers}
		* in this group.
		* @param {!Collection<import("./Base.js").default>} layers Collection of
		*   {@link module:ol/layer/Base~BaseLayer layers} that are part of this group.
		* @observable
		* @api
		*/
		setLayers(layers) {
			const collection = this.getLayers();
			if (collection) {
				const currentLayers = collection.getArray();
				for (let i = 0, ii = currentLayers.length; i < ii; ++i) this.dispatchEvent(new GroupEvent(GroupEventType.REMOVELAYER, currentLayers[i]));
			}
			this.set(Property$1.LAYERS, layers);
		}
		/**
		* @param {Array<import("./Layer.js").default>} [array] Array of layers (to be modified in place).
		* @return {Array<import("./Layer.js").default>} Array of layers.
		* @override
		*/
		getLayersArray(array) {
			array = array !== void 0 ? array : [];
			this.getLayers().forEach(function(layer) {
				layer.getLayersArray(array);
			});
			return array;
		}
		/**
		* Get the layer states list and use this groups z-index as the default
		* for all layers in this and nested groups, if it is unset at this point.
		* If dest is not provided and this group's z-index is undefined
		* 0 is used a the default z-index.
		* @param {Array<import("./Layer.js").State>} [dest] Optional list
		* of layer states (to be modified in place).
		* @return {Array<import("./Layer.js").State>} List of layer states.
		* @override
		*/
		getLayerStatesArray(dest) {
			const states = dest !== void 0 ? dest : [];
			const pos = states.length;
			this.getLayers().forEach(function(layer) {
				layer.getLayerStatesArray(states);
			});
			const ownLayerState = this.getLayerState();
			let defaultZIndex = ownLayerState.zIndex;
			if (!dest && ownLayerState.zIndex === void 0) defaultZIndex = 0;
			for (let i = pos, ii = states.length; i < ii; i++) {
				const layerState = states[i];
				layerState.opacity *= ownLayerState.opacity;
				layerState.visible = layerState.visible && ownLayerState.visible;
				layerState.maxResolution = Math.min(layerState.maxResolution, ownLayerState.maxResolution);
				layerState.minResolution = Math.max(layerState.minResolution, ownLayerState.minResolution);
				layerState.minZoom = Math.max(layerState.minZoom, ownLayerState.minZoom);
				layerState.maxZoom = Math.min(layerState.maxZoom, ownLayerState.maxZoom);
				if (ownLayerState.extent !== void 0) if (layerState.extent !== void 0) layerState.extent = getIntersection(layerState.extent, ownLayerState.extent);
				else layerState.extent = ownLayerState.extent;
				if (layerState.zIndex === void 0) layerState.zIndex = defaultZIndex;
			}
			return states;
		}
		/**
		* @return {import("../source/Source.js").State} Source state.
		* @override
		*/
		getSourceState() {
			return "ready";
		}
	};
	//#endregion
	//#region src/ol/render/EventType.js
	/**
	* @module ol/render/EventType
	*/
	/**
	* @enum {string}
	*/
	var EventType_default = {
		/**
		* Triggered before a layer is rendered.
		* @event module:ol/render/Event~RenderEvent#prerender
		* @api
		*/
		PRERENDER: "prerender",
		/**
		* Triggered after a layer is rendered.
		* @event module:ol/render/Event~RenderEvent#postrender
		* @api
		*/
		POSTRENDER: "postrender",
		/**
		* Triggered before layers are composed.  When dispatched by the map, the event object will not have
		* a `context` set.  When dispatched by a layer, the event object will have a `context` set.  Only
		* WebGL layers currently dispatch this event.
		* @event module:ol/render/Event~RenderEvent#precompose
		* @api
		*/
		PRECOMPOSE: "precompose",
		/**
		* Triggered after layers are composed.  When dispatched by the map, the event object will not have
		* a `context` set.  When dispatched by a layer, the event object will have a `context` set.  Only
		* WebGL layers currently dispatch this event.
		* @event module:ol/render/Event~RenderEvent#postcompose
		* @api
		*/
		POSTCOMPOSE: "postcompose",
		/**
		* Triggered when rendering is complete, i.e. all sources and tiles have
		* finished loading for the current viewport, and all tiles are faded in.
		* The event object will not have a `context` set.
		* @event module:ol/render/Event~RenderEvent#rendercomplete
		* @api
		*/
		RENDERCOMPLETE: "rendercomplete"
	};
	/**
	* @typedef {'postrender'|'precompose'|'postcompose'|'rendercomplete'} MapRenderEventTypes
	*/
	/**
	* @typedef {'postrender'|'prerender'} LayerRenderEventTypes
	*/
	//#endregion
	//#region src/ol/layer/Layer.js
	/**
	* @module ol/layer/Layer
	*/
	/**
	* @typedef {function(import("../Map.js").FrameState):HTMLElement} RenderFunction
	*/
	/**
	* @typedef {'sourceready'|'change:source'} LayerEventType
	*/
	/***
	* @template Return
	* @typedef {import("../Observable.js").OnSignature<import("../Observable.js").EventTypes, import("../events/Event.js").default, Return> &
	*   import("../Observable.js").OnSignature<import("./Base.js").BaseLayerObjectEventTypes|
	*     LayerEventType, import("../Object.js").ObjectEvent, Return> &
	*   import("../Observable.js").OnSignature<import("../render/EventType.js").LayerRenderEventTypes, import("../render/Event.js").default, Return> &
	*   import("../Observable.js").CombinedOnSignature<import("../Observable.js").EventTypes|import("./Base.js").BaseLayerObjectEventTypes|LayerEventType|
	*     import("../render/EventType.js").LayerRenderEventTypes, Return>} LayerOnSignature
	*/
	/**
	* @template {import("../source/Source.js").default} [SourceType=import("../source/Source.js").default]
	* @template {Object<string, *>} [Properties=Object<string, *>]
	* @typedef {Object} Options
	* @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
	* @property {number} [opacity=1] Opacity (0, 1).
	* @property {boolean} [visible=true] Visibility.
	* @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
	* rendered outside of this extent.
	* @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
	* will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
	* for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
	* method was used.
	* @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
	* visible.
	* @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
	* be visible.
	* @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
	* visible.
	* @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
	* be visible.
	* @property {SourceType} [source] Source for this layer.  If not provided to the constructor,
	* the source can be set by calling {@link module:ol/layer/Layer~Layer#setSource layer.setSource(source)} after
	* construction.
	* @property {import("../Map.js").default|null} [map] Map.
	* @property {RenderFunction} [render] Render function. Takes the frame state as input and is expected to return an
	* HTML element. Will overwrite the default rendering for the layer.
	* @property {import("./Base.js").BackgroundColor} [background] Background color for the layer. If not specified, no background
	* will be rendered.
	* @property {Properties} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
	*/
	/**
	* @typedef {Object} State
	* @property {import("./Layer.js").default} layer Layer.
	* @property {number} opacity Opacity, the value is rounded to two digits to appear after the decimal point.
	* @property {boolean} visible Visible.
	* @property {boolean} managed Managed.
	* @property {import("../extent.js").Extent} [extent] Extent.
	* @property {number} zIndex ZIndex.
	* @property {number} maxResolution Maximum resolution.
	* @property {number} minResolution Minimum resolution.
	* @property {number} minZoom Minimum zoom.
	* @property {number} maxZoom Maximum zoom.
	*/
	/**
	* @classdesc
	* Base class from which all layer types are derived. This should only be instantiated
	* in the case where a custom layer is added to the map with a custom `render` function.
	* Such a function can be specified in the `options` object, and is expected to return an HTML element.
	*
	* A visual representation of raster or vector map data.
	* Layers group together those properties that pertain to how the data is to be
	* displayed, irrespective of the source of that data.
	*
	* Layers are usually added to a map with [map.addLayer()]{@link import("../Map.js").default#addLayer}.
	* Components like {@link module:ol/interaction/Draw~Draw} use unmanaged layers
	* internally. These unmanaged layers are associated with the map using
	* [layer.setMap()]{@link module:ol/layer/Layer~Layer#setMap} instead.
	*
	* A generic `change` event is fired when the state of the source changes.
	* A `sourceready` event is fired when the layer's source is ready.
	*
	* @fires import("../render/Event.js").RenderEvent#prerender
	* @fires import("../render/Event.js").RenderEvent#postrender
	* @fires import("../events/Event.js").BaseEvent#sourceready
	*
	* @template {import("../source/Source.js").default} [SourceType=import("../source/Source.js").default]
	* @template {import("../renderer/Layer.js").default} [RendererType=import("../renderer/Layer.js").default]
	* @template {Object<string, *>} [Properties=Object<string, *>]
	* @extends {BaseLayer<NoInfer<Properties>>}
	* @api
	*/
	var Layer = class extends BaseLayer {
		/**
		* @param {Options<SourceType, NoInfer<Properties>>} options Layer options.
		*/
		constructor(options) {
			const baseOptions = Object.assign({}, options);
			delete baseOptions.source;
			super(baseOptions);
			/***
			* @type {LayerOnSignature<import("../events.js").EventsKey>}
			*/
			this.on;
			/***
			* @type {LayerOnSignature<import("../events.js").EventsKey>}
			*/
			this.once;
			/***
			* @type {LayerOnSignature<void>}
			*/
			this.un;
			/**
			* @private
			* @type {?import("../events.js").EventsKey}
			*/
			this.mapPrecomposeKey_ = null;
			/**
			* @private
			* @type {?import("../events.js").EventsKey}
			*/
			this.mapRenderKey_ = null;
			/**
			* @private
			* @type {?import("../events.js").EventsKey}
			*/
			this.sourceChangeKey_ = null;
			/**
			* @private
			* @type {RendererType}
			*/
			this.renderer_ = null;
			/**
			* @private
			* @type {boolean}
			*/
			this.sourceReady_ = false;
			/**
			* @protected
			* @type {boolean}
			*/
			this.rendered = false;
			if (options.render) this.render = options.render;
			if (options.map) this.setMap(options.map);
			this.addChangeListener(Property_default.SOURCE, this.handleSourcePropertyChange_);
			const source = options.source ? options.source : null;
			this.setSource(source);
		}
		/**
		* @param {Array<import("./Layer.js").default>} [array] Array of layers (to be modified in place).
		* @return {Array<import("./Layer.js").default>} Array of layers.
		* @override
		*/
		getLayersArray(array) {
			array = array ? array : [];
			array.push(this);
			return array;
		}
		/**
		* @param {Array<import("./Layer.js").State>} [states] Optional list of layer states (to be modified in place).
		* @return {Array<import("./Layer.js").State>} List of layer states.
		* @override
		*/
		getLayerStatesArray(states) {
			states = states ? states : [];
			states.push(this.getLayerState());
			return states;
		}
		/**
		* Get the layer source.
		* @return {SourceType|null} The layer source (or `null` if not yet set).
		* @observable
		* @api
		*/
		getSource() {
			return this.get(Property_default.SOURCE) || null;
		}
		/**
		* @return {SourceType|null} The source being rendered.
		*/
		getRenderSource() {
			return this.getSource();
		}
		/**
		* @return {import("../source/Source.js").State} Source state.
		* @override
		*/
		getSourceState() {
			const source = this.getSource();
			return !source ? "undefined" : source.getState();
		}
		/**
		* @private
		*/
		handleSourceChange_() {
			this.changed();
			if (this.sourceReady_ || this.getSource().getState() !== "ready") return;
			this.sourceReady_ = true;
			this.dispatchEvent("sourceready");
		}
		/**
		* @private
		*/
		handleSourcePropertyChange_() {
			if (this.sourceChangeKey_) {
				unlistenByKey(this.sourceChangeKey_);
				this.sourceChangeKey_ = null;
			}
			this.sourceReady_ = false;
			const source = this.getSource();
			if (source) {
				this.sourceChangeKey_ = listen(source, EventType_default$2.CHANGE, this.handleSourceChange_, this);
				if (source.getState() === "ready") {
					this.sourceReady_ = true;
					setTimeout(() => {
						this.dispatchEvent("sourceready");
					}, 0);
				}
			}
			this.changed();
		}
		/**
		* @param {import("../pixel.js").Pixel} pixel Pixel.
		* @return {Promise<Array<import("../Feature.js").FeatureLike>>} Promise that resolves with
		* an array of features.
		*/
		getFeatures(pixel) {
			if (!this.renderer_) return Promise.resolve([]);
			return this.renderer_.getFeatures(pixel);
		}
		/**
		* @param {import("../pixel.js").Pixel} pixel Pixel.
		* @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
		*/
		getData(pixel) {
			if (!this.renderer_ || !this.rendered) return null;
			return this.renderer_.getData(pixel);
		}
		/**
		* The layer is visible on the map view, i.e. within its min/max resolution or zoom and
		* extent, not set to `visible: false`, and not inside a layer group that is set
		* to `visible: false`.
		* @param {View|import("../View.js").ViewStateLayerStateExtent} [view] View or {@link import("../Map.js").FrameState}.
		* Only required when the layer is not added to a map.
		* @return {boolean} The layer is visible in the map view.
		* @api
		*/
		isVisible(view) {
			let frameState;
			const map = this.getMapInternal();
			if (!view && map) view = map.getView();
			if (view instanceof View) frameState = {
				viewState: view.getState(),
				extent: view.calculateExtent()
			};
			else frameState = view;
			if (!frameState.layerStatesArray && map) frameState.layerStatesArray = map.getLayerGroup().getLayerStatesArray();
			let layerState;
			if (frameState.layerStatesArray) {
				layerState = frameState.layerStatesArray.find((layerState) => layerState.layer === this);
				if (!layerState) return false;
			} else layerState = this.getLayerState();
			const layerExtent = this.getExtent();
			return inView(layerState, frameState.viewState) && (!layerExtent || intersects$1(layerExtent, frameState.extent));
		}
		/**
		* Get the attributions of the source of this layer for the given view.
		* @param {View|import("../View.js").ViewStateLayerStateExtent} [view] View or {@link import("../Map.js").FrameState}.
		* Only required when the layer is not added to a map.
		* @return {Array<string>} Attributions for this layer at the given view.
		* @api
		*/
		getAttributions(view) {
			if (!this.isVisible(view)) return [];
			const getAttributions = this.getSource()?.getAttributions();
			if (!getAttributions) return [];
			let attributions = getAttributions(view instanceof View ? view.getViewStateAndExtent() : view);
			if (!Array.isArray(attributions)) attributions = [attributions];
			return attributions;
		}
		/**
		* In charge to manage the rendering of the layer. One layer type is
		* bounded with one layer renderer.
		* @param {?import("../Map.js").FrameState} frameState Frame state.
		* @param {HTMLElement} target Target which the renderer may (but need not) use
		* for rendering its content.
		* @return {HTMLElement|null} The rendered element.
		*/
		render(frameState, target) {
			const layerRenderer = this.getRenderer();
			if (layerRenderer.prepareFrame(frameState)) {
				this.rendered = true;
				return layerRenderer.renderFrame(frameState, target);
			}
			return null;
		}
		/**
		* Called when a layer is not visible during a map render.
		*/
		unrender() {
			this.rendered = false;
		}
		/** @return {string} Declutter */
		getDeclutter() {}
		/**
		* @param {import("../Map.js").FrameState} frameState Frame state.
		* @param {import("../layer/Layer.js").State} layerState Layer state.
		*/
		renderDeclutter(frameState, layerState) {}
		/**
		* When the renderer follows a layout -> render approach, do the final rendering here.
		* @param {import('../Map.js').FrameState} frameState Frame state
		*/
		renderDeferred(frameState) {
			const layerRenderer = this.getRenderer();
			if (!layerRenderer) return;
			layerRenderer.renderDeferred(frameState);
		}
		/**
		* For use inside the library only.
		* @param {import("../Map.js").default|null} map Map.
		*/
		setMapInternal(map) {
			if (!map) this.unrender();
			this.set(Property_default.MAP, map);
		}
		/**
		* For use inside the library only.
		* @return {import("../Map.js").default|null} Map.
		*/
		getMapInternal() {
			return this.get(Property_default.MAP);
		}
		/**
		* Sets the layer to be rendered on top of other layers on a map. The map will
		* not manage this layer in its layers collection. This
		* is useful for temporary layers. To remove an unmanaged layer from the map,
		* use `#setMap(null)`.
		*
		* To add the layer to a map and have it managed by the map, use
		* {@link module:ol/Map~Map#addLayer} instead.
		* @param {import("../Map.js").default|null} map Map.
		* @api
		*/
		setMap(map) {
			if (this.mapPrecomposeKey_) {
				unlistenByKey(this.mapPrecomposeKey_);
				this.mapPrecomposeKey_ = null;
			}
			if (!map) this.changed();
			if (this.mapRenderKey_) {
				unlistenByKey(this.mapRenderKey_);
				this.mapRenderKey_ = null;
			}
			if (map) {
				this.mapPrecomposeKey_ = listen(map, EventType_default.PRECOMPOSE, this.handlePrecompose_, this);
				this.mapRenderKey_ = listen(this, EventType_default$2.CHANGE, map.render, map);
				this.changed();
			}
		}
		/**
		* @param {import("../events/Event.js").default} renderEvent Render event
		* @private
		*/
		handlePrecompose_(renderEvent) {
			const layerStatesArray = renderEvent.frameState.layerStatesArray;
			const layerState = this.getLayerState(false);
			assert(!layerStatesArray.some((arrayLayerState) => arrayLayerState.layer === layerState.layer), "A layer can only be added to the map once. Use either `layer.setMap()` or `map.addLayer()`, not both.");
			layerStatesArray.push(layerState);
		}
		/**
		* Set the layer source.
		* @param {SourceType|null} source The layer source.
		* @observable
		* @api
		*/
		setSource(source) {
			this.set(Property_default.SOURCE, source);
		}
		/**
		* Get the renderer for this layer.
		* @return {RendererType|null} The layer renderer.
		*/
		getRenderer() {
			if (!this.renderer_) this.renderer_ = this.createRenderer();
			return this.renderer_;
		}
		/**
		* @return {boolean} The layer has a renderer.
		*/
		hasRenderer() {
			return !!this.renderer_;
		}
		/**
		* Create a renderer for this layer.
		* @return {RendererType} A layer renderer.
		* @protected
		*/
		createRenderer() {
			return null;
		}
		/**
		* This will clear the renderer so that a new one can be created next time it is needed
		*/
		clearRenderer() {
			if (this.renderer_) {
				this.renderer_.dispose();
				delete this.renderer_;
			}
		}
		/**
		* Clean up.
		* @override
		*/
		disposeInternal() {
			this.clearRenderer();
			this.setSource(null);
			super.disposeInternal();
		}
	};
	/**
	* Return `true` if the layer is visible and if the provided view state
	* has resolution and zoom levels that are in range of the layer's min/max.
	* @param {State} layerState Layer state.
	* @param {import("../View.js").State} viewState View state.
	* @return {boolean} The layer is visible at the given view state.
	*/
	function inView(layerState, viewState) {
		if (!layerState.visible) return false;
		const resolution = viewState.resolution;
		if (resolution < layerState.minResolution || resolution >= layerState.maxResolution) return false;
		const zoom = viewState.zoom;
		return zoom > layerState.minZoom && zoom <= layerState.maxZoom;
	}
	//#endregion
	//#region node_modules/quickselect/index.js
	/**
	* Rearranges items so that all items in the [left, k] are the smallest.
	* The k-th element will have the (k - left + 1)-th smallest value in [left, right].
	*
	* @template T
	* @param {T[]} arr the array to partially sort (in place)
	* @param {number} k middle index for partial sorting (as defined above)
	* @param {number} [left=0] left index of the range to sort
	* @param {number} [right=arr.length-1] right index
	* @param {(a: T, b: T) => number} [compare = (a, b) => a - b] compare function
	*/
	function quickselect(arr, k, left = 0, right = arr.length - 1, compare = defaultCompare) {
		while (right > left) {
			if (right - left > 600) {
				const n = right - left + 1;
				const m = k - left + 1;
				const z = Math.log(n);
				const s = .5 * Math.exp(2 * z / 3);
				const sd = .5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
				quickselect(arr, k, Math.max(left, Math.floor(k - m * s / n + sd)), Math.min(right, Math.floor(k + (n - m) * s / n + sd)), compare);
			}
			const t = arr[k];
			let i = left;
			/** @type {number} */
			let j = right;
			swap(arr, left, k);
			if (compare(arr[right], t) > 0) swap(arr, left, right);
			while (i < j) {
				swap(arr, i, j);
				i++;
				j--;
				while (compare(arr[i], t) < 0) i++;
				while (compare(arr[j], t) > 0) j--;
			}
			if (compare(arr[left], t) === 0) swap(arr, left, j);
			else {
				j++;
				swap(arr, j, right);
			}
			if (j <= k) left = j + 1;
			if (k <= j) right = j - 1;
		}
	}
	/**
	* @template T
	* @param {T[]} arr
	* @param {number} i
	* @param {number} j
	*/
	function swap(arr, i, j) {
		const tmp = arr[i];
		arr[i] = arr[j];
		arr[j] = tmp;
	}
	/**
	* @template T
	* @param {T} a
	* @param {T} b
	* @returns {number}
	*/
	function defaultCompare(a, b) {
		return a < b ? -1 : a > b ? 1 : 0;
	}
	//#endregion
	//#region node_modules/rbush/index.js
	var RBush = class {
		constructor(maxEntries = 9) {
			this._maxEntries = Math.max(4, maxEntries);
			this._minEntries = Math.max(2, Math.ceil(this._maxEntries * .4));
			this.clear();
		}
		all() {
			return this._all(this.data, []);
		}
		search(bbox) {
			let node = this.data;
			const result = [];
			if (!intersects(bbox, node)) return result;
			const toBBox = this.toBBox;
			const nodesToSearch = [];
			while (node) {
				for (let i = 0; i < node.children.length; i++) {
					const child = node.children[i];
					const childBBox = node.leaf ? toBBox(child) : child;
					if (intersects(bbox, childBBox)) if (node.leaf) result.push(child);
					else if (contains(bbox, childBBox)) this._all(child, result);
					else nodesToSearch.push(child);
				}
				node = nodesToSearch.pop();
			}
			return result;
		}
		collides(bbox) {
			let node = this.data;
			if (!intersects(bbox, node)) return false;
			const nodesToSearch = [];
			while (node) {
				for (let i = 0; i < node.children.length; i++) {
					const child = node.children[i];
					const childBBox = node.leaf ? this.toBBox(child) : child;
					if (intersects(bbox, childBBox)) {
						if (node.leaf || contains(bbox, childBBox)) return true;
						nodesToSearch.push(child);
					}
				}
				node = nodesToSearch.pop();
			}
			return false;
		}
		load(data) {
			if (!(data && data.length)) return this;
			if (data.length < this._minEntries) {
				for (let i = 0; i < data.length; i++) this.insert(data[i]);
				return this;
			}
			let node = this._build(data.slice(), 0, data.length - 1, 0);
			if (!this.data.children.length) this.data = node;
			else if (this.data.height === node.height) this._splitRoot(this.data, node);
			else {
				if (this.data.height < node.height) {
					const tmpNode = this.data;
					this.data = node;
					node = tmpNode;
				}
				this._insert(node, this.data.height - node.height - 1, true);
			}
			return this;
		}
		insert(item) {
			if (item) this._insert(item, this.data.height - 1);
			return this;
		}
		clear() {
			this.data = createNode([]);
			return this;
		}
		remove(item, equalsFn) {
			if (!item) return this;
			let node = this.data;
			const bbox = this.toBBox(item);
			const path = [];
			const indexes = [];
			let i, parent, goingUp;
			while (node || path.length) {
				if (!node) {
					node = path.pop();
					parent = path[path.length - 1];
					i = indexes.pop();
					goingUp = true;
				}
				if (node.leaf) {
					const index = findItem(item, node.children, equalsFn);
					if (index !== -1) {
						node.children.splice(index, 1);
						path.push(node);
						this._condense(path);
						return this;
					}
				}
				if (!goingUp && !node.leaf && contains(node, bbox)) {
					path.push(node);
					indexes.push(i);
					i = 0;
					parent = node;
					node = node.children[0];
				} else if (parent) {
					i++;
					node = parent.children[i];
					goingUp = false;
				} else node = null;
			}
			return this;
		}
		toBBox(item) {
			return item;
		}
		compareMinX(a, b) {
			return a.minX - b.minX;
		}
		compareMinY(a, b) {
			return a.minY - b.minY;
		}
		toJSON() {
			return this.data;
		}
		fromJSON(data) {
			this.data = data;
			return this;
		}
		_all(node, result) {
			const nodesToSearch = [];
			while (node) {
				if (node.leaf) result.push(...node.children);
				else nodesToSearch.push(...node.children);
				node = nodesToSearch.pop();
			}
			return result;
		}
		_build(items, left, right, height) {
			const N = right - left + 1;
			let M = this._maxEntries;
			let node;
			if (N <= M) {
				node = createNode(items.slice(left, right + 1));
				calcBBox(node, this.toBBox);
				return node;
			}
			if (!height) {
				height = Math.ceil(Math.log(N) / Math.log(M));
				M = Math.ceil(N / Math.pow(M, height - 1));
			}
			node = createNode([]);
			node.leaf = false;
			node.height = height;
			const N2 = Math.ceil(N / M);
			const N1 = N2 * Math.ceil(Math.sqrt(M));
			multiSelect(items, left, right, N1, this.compareMinX);
			for (let i = left; i <= right; i += N1) {
				const right2 = Math.min(i + N1 - 1, right);
				multiSelect(items, i, right2, N2, this.compareMinY);
				for (let j = i; j <= right2; j += N2) {
					const right3 = Math.min(j + N2 - 1, right2);
					node.children.push(this._build(items, j, right3, height - 1));
				}
			}
			calcBBox(node, this.toBBox);
			return node;
		}
		_chooseSubtree(bbox, node, level, path) {
			while (true) {
				path.push(node);
				if (node.leaf || path.length - 1 === level) break;
				let minArea = Infinity;
				let minEnlargement = Infinity;
				let targetNode;
				for (let i = 0; i < node.children.length; i++) {
					const child = node.children[i];
					const area = bboxArea(child);
					const enlargement = enlargedArea(bbox, child) - area;
					if (enlargement < minEnlargement) {
						minEnlargement = enlargement;
						minArea = area < minArea ? area : minArea;
						targetNode = child;
					} else if (enlargement === minEnlargement) {
						if (area < minArea) {
							minArea = area;
							targetNode = child;
						}
					}
				}
				node = targetNode || node.children[0];
			}
			return node;
		}
		_insert(item, level, isNode) {
			const bbox = isNode ? item : this.toBBox(item);
			const insertPath = [];
			const node = this._chooseSubtree(bbox, this.data, level, insertPath);
			node.children.push(item);
			extend(node, bbox);
			while (level >= 0) if (insertPath[level].children.length > this._maxEntries) {
				this._split(insertPath, level);
				level--;
			} else break;
			this._adjustParentBBoxes(bbox, insertPath, level);
		}
		_split(insertPath, level) {
			const node = insertPath[level];
			const M = node.children.length;
			const m = this._minEntries;
			this._chooseSplitAxis(node, m, M);
			const splitIndex = this._chooseSplitIndex(node, m, M);
			const newNode = createNode(node.children.splice(splitIndex, node.children.length - splitIndex));
			newNode.height = node.height;
			newNode.leaf = node.leaf;
			calcBBox(node, this.toBBox);
			calcBBox(newNode, this.toBBox);
			if (level) insertPath[level - 1].children.push(newNode);
			else this._splitRoot(node, newNode);
		}
		_splitRoot(node, newNode) {
			this.data = createNode([node, newNode]);
			this.data.height = node.height + 1;
			this.data.leaf = false;
			calcBBox(this.data, this.toBBox);
		}
		_chooseSplitIndex(node, m, M) {
			let index;
			let minOverlap = Infinity;
			let minArea = Infinity;
			for (let i = m; i <= M - m; i++) {
				const bbox1 = distBBox(node, 0, i, this.toBBox);
				const bbox2 = distBBox(node, i, M, this.toBBox);
				const overlap = intersectionArea(bbox1, bbox2);
				const area = bboxArea(bbox1) + bboxArea(bbox2);
				if (overlap < minOverlap) {
					minOverlap = overlap;
					index = i;
					minArea = area < minArea ? area : minArea;
				} else if (overlap === minOverlap) {
					if (area < minArea) {
						minArea = area;
						index = i;
					}
				}
			}
			return index || M - m;
		}
		_chooseSplitAxis(node, m, M) {
			const compareMinX = node.leaf ? this.compareMinX : compareNodeMinX;
			const compareMinY = node.leaf ? this.compareMinY : compareNodeMinY;
			if (this._allDistMargin(node, m, M, compareMinX) < this._allDistMargin(node, m, M, compareMinY)) node.children.sort(compareMinX);
		}
		_allDistMargin(node, m, M, compare) {
			node.children.sort(compare);
			const toBBox = this.toBBox;
			const leftBBox = distBBox(node, 0, m, toBBox);
			const rightBBox = distBBox(node, M - m, M, toBBox);
			let margin = bboxMargin(leftBBox) + bboxMargin(rightBBox);
			for (let i = m; i < M - m; i++) {
				const child = node.children[i];
				extend(leftBBox, node.leaf ? toBBox(child) : child);
				margin += bboxMargin(leftBBox);
			}
			for (let i = M - m - 1; i >= m; i--) {
				const child = node.children[i];
				extend(rightBBox, node.leaf ? toBBox(child) : child);
				margin += bboxMargin(rightBBox);
			}
			return margin;
		}
		_adjustParentBBoxes(bbox, path, level) {
			for (let i = level; i >= 0; i--) extend(path[i], bbox);
		}
		_condense(path) {
			for (let i = path.length - 1, siblings; i >= 0; i--) if (path[i].children.length === 0) if (i > 0) {
				siblings = path[i - 1].children;
				siblings.splice(siblings.indexOf(path[i]), 1);
			} else this.clear();
			else calcBBox(path[i], this.toBBox);
		}
	};
	function findItem(item, items, equalsFn) {
		if (!equalsFn) return items.indexOf(item);
		for (let i = 0; i < items.length; i++) if (equalsFn(item, items[i])) return i;
		return -1;
	}
	function calcBBox(node, toBBox) {
		distBBox(node, 0, node.children.length, toBBox, node);
	}
	function distBBox(node, k, p, toBBox, destNode) {
		if (!destNode) destNode = createNode(null);
		destNode.minX = Infinity;
		destNode.minY = Infinity;
		destNode.maxX = -Infinity;
		destNode.maxY = -Infinity;
		for (let i = k; i < p; i++) {
			const child = node.children[i];
			extend(destNode, node.leaf ? toBBox(child) : child);
		}
		return destNode;
	}
	function extend(a, b) {
		a.minX = Math.min(a.minX, b.minX);
		a.minY = Math.min(a.minY, b.minY);
		a.maxX = Math.max(a.maxX, b.maxX);
		a.maxY = Math.max(a.maxY, b.maxY);
		return a;
	}
	function compareNodeMinX(a, b) {
		return a.minX - b.minX;
	}
	function compareNodeMinY(a, b) {
		return a.minY - b.minY;
	}
	function bboxArea(a) {
		return (a.maxX - a.minX) * (a.maxY - a.minY);
	}
	function bboxMargin(a) {
		return a.maxX - a.minX + (a.maxY - a.minY);
	}
	function enlargedArea(a, b) {
		return (Math.max(b.maxX, a.maxX) - Math.min(b.minX, a.minX)) * (Math.max(b.maxY, a.maxY) - Math.min(b.minY, a.minY));
	}
	function intersectionArea(a, b) {
		const minX = Math.max(a.minX, b.minX);
		const minY = Math.max(a.minY, b.minY);
		const maxX = Math.min(a.maxX, b.maxX);
		const maxY = Math.min(a.maxY, b.maxY);
		return Math.max(0, maxX - minX) * Math.max(0, maxY - minY);
	}
	function contains(a, b) {
		return a.minX <= b.minX && a.minY <= b.minY && b.maxX <= a.maxX && b.maxY <= a.maxY;
	}
	function intersects(a, b) {
		return b.minX <= a.maxX && b.minY <= a.maxY && b.maxX >= a.minX && b.maxY >= a.minY;
	}
	function createNode(children) {
		return {
			children,
			height: 1,
			leaf: true,
			minX: Infinity,
			minY: Infinity,
			maxX: -Infinity,
			maxY: -Infinity
		};
	}
	function multiSelect(arr, left, right, n, compare) {
		const stack = [left, right];
		while (stack.length) {
			right = stack.pop();
			left = stack.pop();
			if (right - left <= n) continue;
			const mid = left + Math.ceil((right - left) / n / 2) * n;
			quickselect(arr, mid, left, right, compare);
			stack.push(left, mid, mid, right);
		}
	}
	//#endregion
	//#region src/ol/color.js
	/**
	* @module ol/color
	*/
	/**
	* A color represented as a short array [red, green, blue, alpha].
	* red, green, and blue should be integers in the range 0..255 inclusive.
	* alpha should be a float in the range 0..1 inclusive. If no alpha value is
	* given then `1` will be used.
	* @typedef {Array<number>} Color
	* @api
	*/
	/**
	* Color to indicate that no color should be rendered. This is meant to be used for per-reference
	* comparisons only.
	* @type {Color}
	*/
	const NO_COLOR = [
		NaN,
		NaN,
		NaN,
		0
	];
	let colorParseContext;
	/**
	* @return {CanvasRenderingContext2D} The color parse context
	*/
	function getColorParseContext() {
		if (!colorParseContext) colorParseContext = createCanvasContext2D(1, 1, void 0, {
			willReadFrequently: true,
			desynchronized: true
		});
		return colorParseContext;
	}
	const rgbModernRegEx = /^rgba?\(\s*(\d+%?)\s+(\d+%?)\s+(\d+%?)(?:\s*\/\s*(\d+%|\d*\.\d+|[01]))?\s*\)$/i;
	const rgbLegacyAbsoluteRegEx = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*(\d+%|\d*\.\d+|[01]))?\s*\)$/i;
	const rgbLegacyPercentageRegEx = /^rgba?\(\s*(\d+%)\s*,\s*(\d+%)\s*,\s*(\d+%)(?:\s*,\s*(\d+%|\d*\.\d+|[01]))?\s*\)$/i;
	const hexRegEx = /^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i;
	/**
	* @param {string} s Color component as number or percentage.
	* @param {number} divider Divider for percentage.
	* @return {number} Color component.
	*/
	function toColorComponent(s, divider) {
		return s.endsWith("%") ? Number(s.substring(0, s.length - 1)) / divider : Number(s);
	}
	/**
	* @param {string} color Color string.
	*/
	function throwInvalidColor(color) {
		throw new Error("failed to parse \"" + color + "\" as color");
	}
	/**
	* @param {string} color Color string.
	* @return {Color} RGBa color array.
	*/
	function parseRgba(color) {
		if (color.toLowerCase().startsWith("rgb")) {
			const rgb = color.match(rgbLegacyAbsoluteRegEx) || color.match(rgbModernRegEx) || color.match(rgbLegacyPercentageRegEx);
			if (rgb) {
				const alpha = rgb[4];
				const rgbDivider = 100 / 255;
				return [
					clamp(toColorComponent(rgb[1], rgbDivider) + .5 | 0, 0, 255),
					clamp(toColorComponent(rgb[2], rgbDivider) + .5 | 0, 0, 255),
					clamp(toColorComponent(rgb[3], rgbDivider) + .5 | 0, 0, 255),
					alpha !== void 0 ? clamp(toColorComponent(alpha, 100), 0, 1) : 1
				];
			}
			throwInvalidColor(color);
		}
		if (color.startsWith("#")) {
			if (hexRegEx.test(color)) {
				const hex = color.substring(1);
				const step = hex.length <= 4 ? 1 : 2;
				const colorFromHex = [
					0,
					0,
					0,
					255
				];
				for (let i = 0, ii = hex.length; i < ii; i += step) {
					let colorComponent = parseInt(hex.substring(i, i + step), 16);
					if (step === 1) colorComponent += colorComponent << 4;
					colorFromHex[i / step] = colorComponent;
				}
				colorFromHex[3] = colorFromHex[3] / 255;
				return colorFromHex;
			}
			throwInvalidColor(color);
		}
		const context = getColorParseContext();
		context.fillStyle = "#abcdef";
		let invalidCheckFillStyle = context.fillStyle;
		context.fillStyle = color;
		if (context.fillStyle === invalidCheckFillStyle) {
			context.fillStyle = "#fedcba";
			invalidCheckFillStyle = context.fillStyle;
			context.fillStyle = color;
			if (context.fillStyle === invalidCheckFillStyle) throwInvalidColor(color);
		}
		const colorString = context.fillStyle;
		if (colorString.startsWith("#") || colorString.startsWith("rgba")) return parseRgba(colorString);
		context.clearRect(0, 0, 1, 1);
		context.fillRect(0, 0, 1, 1);
		const colorFromImage = Array.from(context.getImageData(0, 0, 1, 1).data);
		colorFromImage[3] = toFixed(colorFromImage[3] / 255, 3);
		return colorFromImage;
	}
	/**
	* Return the color as an rgba string.
	* @param {Color|string} color Color.
	* @return {string} Rgba string.
	* @api
	*/
	function asString(color) {
		if (typeof color === "string") return color;
		return toString(color);
	}
	/**
	* @type {number}
	*/
	const MAX_CACHE_SIZE = 1024;
	/**
	* We maintain a small cache of parsed strings.  Whenever the cache grows too large,
	* we delete an arbitrary set of the entries.
	*
	* @type {Object<string, Color>}
	*/
	const cache = {};
	/**
	* @type {number}
	*/
	let cacheSize = 0;
	/**
	* @param {Color} color A color that may or may not have an alpha channel.
	* @return {Color} The input color with an alpha channel.  If the input color has
	* an alpha channel, the input color will be returned unchanged.  Otherwise, a new
	* array will be returned with the input color and an alpha channel of 1.
	*/
	function withAlpha(color) {
		if (color.length === 4) return color;
		const output = color.slice();
		output[3] = 1;
		return output;
	}
	/**
	* @param {number} v Input value.
	* @return {number} Output value.
	*/
	function b1(v) {
		return v > .0031308 ? Math.pow(v, 1 / 2.4) * 269.025 - 14.025 : v * 3294.6;
	}
	/**
	* @param {number} v Input value.
	* @return {number} Output value.
	*/
	function b2(v) {
		return v > .2068965 ? Math.pow(v, 3) : (v - 4 / 29) * (108 / 841);
	}
	/**
	* @param {number} v Input value.
	* @return {number} Output value.
	*/
	function a1(v) {
		return v > 10.314724 ? Math.pow((v + 14.025) / 269.025, 2.4) : v / 3294.6;
	}
	/**
	* @param {number} v Input value.
	* @return {number} Output value.
	*/
	function a2(v) {
		return v > .0088564 ? Math.pow(v, 1 / 3) : v / (108 / 841) + 4 / 29;
	}
	/**
	* @param {Color} color RGBA color.
	* @return {Color} LCHuv color with alpha.
	*/
	function rgbaToLcha(color) {
		const r = a1(color[0]);
		const g = a1(color[1]);
		const b = a1(color[2]);
		const y = a2(r * .222488403 + g * .716873169 + b * .06060791);
		const l = 500 * (a2(r * .452247074 + g * .399439023 + b * .148375274) - y);
		const q = 200 * (y - a2(r * .016863605 + g * .117638439 + b * .865350722));
		const h = Math.atan2(q, l) * (180 / Math.PI);
		return [
			116 * y - 16,
			Math.sqrt(l * l + q * q),
			h < 0 ? h + 360 : h,
			color[3]
		];
	}
	/**
	* @param {Color} color LCHuv color with alpha.
	* @return {Color} RGBA color.
	*/
	function lchaToRgba(color) {
		const l = (color[0] + 16) / 116;
		const c = color[1];
		const h = color[2] * Math.PI / 180;
		const y = b2(l);
		const x = b2(l + c / 500 * Math.cos(h));
		const z = b2(l - c / 200 * Math.sin(h));
		const r = b1(x * 3.021973625 - y * 1.617392459 - z * .404875592);
		const g = b1(x * -.943766287 + y * 1.916279586 + z * .027607165);
		const b = b1(x * .069407491 - y * .22898585 + z * 1.159737864);
		return [
			clamp(r + .5 | 0, 0, 255),
			clamp(g + .5 | 0, 0, 255),
			clamp(b + .5 | 0, 0, 255),
			color[3]
		];
	}
	/**
	* @param {string} s String.
	* @return {Color} Color.
	*/
	function fromString(s) {
		if (s === "none") return NO_COLOR;
		if (cache.hasOwnProperty(s)) return cache[s];
		if (cacheSize >= MAX_CACHE_SIZE) {
			let i = 0;
			for (const key in cache) if ((i++ & 3) === 0) {
				delete cache[key];
				--cacheSize;
			}
		}
		const color = parseRgba(s);
		if (color.length !== 4) throwInvalidColor(s);
		for (const c of color) if (isNaN(c)) throwInvalidColor(s);
		cache[s] = color;
		++cacheSize;
		return color;
	}
	/**
	* Return the color as an array. This function maintains a cache of calculated
	* arrays which means the result should not be modified.
	* @param {Color|string} color Color.
	* @return {Color} Color.
	* @api
	*/
	function asArray(color) {
		if (Array.isArray(color)) return color;
		return fromString(color);
	}
	/**
	* @param {Color} color Color.
	* @return {string} String.
	*/
	function toString(color) {
		let r = color[0];
		if (r != (r | 0)) r = r + .5 | 0;
		let g = color[1];
		if (g != (g | 0)) g = g + .5 | 0;
		let b = color[2];
		if (b != (b | 0)) b = b + .5 | 0;
		const a = color[3] === void 0 ? 1 : Math.round(color[3] * 1e3) / 1e3;
		return "rgba(" + r + "," + g + "," + b + "," + a + ")";
	}
	//#endregion
	//#region src/ol/size.js
	/**
	* Determines if a size has a positive area.
	* @param {Size} size The size to test.
	* @return {boolean} The size has a positive area.
	*/
	function hasArea(size) {
		return size[0] > 0 && size[1] > 0;
	}
	/**
	* Returns a size scaled by a ratio. The result will be an array of integers.
	* @param {Size} size Size.
	* @param {number} ratio Ratio.
	* @param {Size} [dest] Optional reusable size array.
	* @return {Size} The scaled size.
	*/
	function scale(size, ratio, dest) {
		if (dest === void 0) dest = [0, 0];
		dest[0] = size[0] * ratio + .5 | 0;
		dest[1] = size[1] * ratio + .5 | 0;
		return dest;
	}
	/**
	* Returns an `Size` array for the passed in number (meaning: square) or
	* `Size` array.
	* (meaning: non-square),
	* @param {number|Size} size Width and height.
	* @param {Size} [dest] Optional reusable size array.
	* @return {Size} Size.
	* @api
	*/
	function toSize(size, dest) {
		if (Array.isArray(size)) return size;
		if (dest === void 0) dest = [size, size];
		else {
			dest[0] = size;
			dest[1] = size;
		}
		return dest;
	}
	//#endregion
	//#region src/ol/expr/expression.js
	/**
	* @module ol/expr/expression
	*/
	/**
	* @fileoverview This module includes types and functions for parsing array encoded expressions.
	* The result of parsing an encoded expression is one of the specific expression classes.
	* During parsing, information is added to the parsing context about the data accessed by the
	* expression.
	*/
	/**
	* Base type used for literal style parameters; can be a number literal or the output of an operator,
	* which in turns takes {@link import("./expression.js").ExpressionValue} arguments.
	*
	* See below for details on the available operators (with notes for those that are WebGL or Canvas only).
	*
	* Reading operators:
	*   * `['band', bandIndex, xOffset, yOffset]` For tile layers only. Fetches pixel values from band
	*     `bandIndex` of the source's data. The first `bandIndex` of the source data is `1`. Fetched values
	*     are in the 0..1 range. {@link import("../source/TileImage.js").default} sources have 4 bands: red,
	*     green, blue and alpha. {@link import("../source/DataTile.js").default} sources can have any number
	*     of bands, depending on the underlying data source and
	*     {@link import("../source/GeoTIFF.js").Options configuration}. `xOffset` and `yOffset` are optional
	*     and allow specifying pixel offsets for x and y. This is used for sampling data from neighboring pixels (WebGL only).
	*   * `['get', attributeName]` fetches a feature property value, similar to `feature.get('attributeName')`.
	*   * `['get', attributeName, keyOrArrayIndex, ...]` (Canvas only) Access nested properties and array items of a
	*     feature property. The result is `undefined` when there is nothing at the specified key or index.
	*   * `['geometry-type']` returns a feature's geometry type as string, either: 'LineString', 'Point' or 'Polygon'
	*     `Multi*` values are returned as their singular equivalent
	*     `Circle` geometries are returned as 'Polygon'
	*     `GeometryCollection` geometries are returned as the type of the first geometry found in the collection (WebGL only).
	*   * `['resolution']` returns the current resolution
	*   * `['time']` The time in seconds since the creation of the layer (WebGL only).
	*   * `['var', 'varName']` fetches a value from the style variables; will throw an error if that variable is undefined
	*   * `['zoom']` The current zoom level (WebGL only).
	*   * `['line-metric']` returns the M component of the current point on a line (WebGL only); in case where the geometry layout of the line
	*      does not contain an M component (e.g. XY or XYZ), 0 is returned; 0 is also returned for geometries other than lines.
	*      Please note that the M component will be linearly interpolated between the two points composing a segment.
	*
	* Math operators:
	*   * `['*', value1, value2, ...]` multiplies the values (either numbers or colors)
	*   * `['/', value1, value2]` divides `value1` by `value2`
	*   * `['+', value1, value2, ...]` adds the values
	*   * `['-', value1, value2]` subtracts `value2` from `value1`
	*   * `['clamp', value, low, high]` clamps `value` between `low` and `high`
	*   * `['%', value1, value2]` returns the result of `value1 % value2` (modulo)
	*   * `['^', value1, value2]` returns the value of `value1` raised to the `value2` power
	*   * `['abs', value1]` returns the absolute value of `value1`
	*   * `['floor', value1]` returns the nearest integer less than or equal to `value1`
	*   * `['round', value1]` returns the nearest integer to `value1`
	*   * `['ceil', value1]` returns the nearest integer greater than or equal to `value1`
	*   * `['sin', value1]` returns the sine of `value1`
	*   * `['cos', value1]` returns the cosine of `value1`
	*   * `['atan', value1, value2]` returns `atan2(value1, value2)`. If `value2` is not provided, returns `atan(value1)`
	*   * `['sqrt', value1]` returns the square root of `value1`
	*
	* * Transform operators:
	*   * `['case', condition1, output1, ...conditionN, outputN, fallback]` selects the first output whose corresponding
	*     condition evaluates to `true`. If no match is found, returns the `fallback` value.
	*     All conditions should be `boolean`, output and fallback can be any kind.
	*   * `['match', input, match1, output1, ...matchN, outputN, fallback]` compares the `input` value against all
	*     provided `matchX` values, returning the output associated with the first valid match. If no match is found,
	*     returns the `fallback` value.
	*     `input` and `matchX` values must all be of the same type, and can be `number` or `string`. `outputX` and
	*     `fallback` values must be of the same type, and can be of any kind.
	*   * `['interpolate', interpolation, input, stop1, output1, ...stopN, outputN]` returns a value by interpolating between
	*     pairs of inputs and outputs; `interpolation` can either be `['linear']` or `['exponential', base]` where `base` is
	*     the rate of increase from stop A to stop B (i.e. power to which the interpolation ratio is raised); a value
	*     of 1 is equivalent to `['linear']`.
	*     `input` and `stopX` values must all be of type `number`. `outputX` values can be `number` or `color` values.
	*     Note: `input` will be clamped between `stop1` and `stopN`, meaning that all output values will be comprised
	*     between `output1` and `outputN`.
	*   * `['string', value1, value2, ...]` returns the first value in the list that evaluates to a string.
	*     An example would be to provide a default value for get: `['string', ['get', 'propertyname'], 'default value']]`
	*     (Canvas only).
	*   * `['number', value1, value2, ...]` returns the first value in the list that evaluates to a number.
	*     An example would be to provide a default value for get: `['string', ['get', 'propertyname'], 42]]`
	*     (Canvas only).
	*   * `['coalesce', value1, value2, ...]` returns the first value in the list which is not null or undefined.
	*     An example would be to provide a default value for get: `['coalesce', ['get','propertyname'], 'default value']]`
	*     (Canvas only).
	*
	* * Logical operators:
	*   * `['<', value1, value2]` returns `true` if `value1` is strictly lower than `value2`, or `false` otherwise.
	*   * `['<=', value1, value2]` returns `true` if `value1` is lower than or equals `value2`, or `false` otherwise.
	*   * `['>', value1, value2]` returns `true` if `value1` is strictly greater than `value2`, or `false` otherwise.
	*   * `['>=', value1, value2]` returns `true` if `value1` is greater than or equals `value2`, or `false` otherwise.
	*   * `['==', value1, value2]` returns `true` if `value1` equals `value2`, or `false` otherwise.
	*   * `['!=', value1, value2]` returns `true` if `value1` does not equal `value2`, or `false` otherwise.
	*   * `['!', value1]` returns `false` if `value1` is `true` or greater than `0`, or `true` otherwise.
	*   * `['all', value1, value2, ...]` returns `true` if all the inputs are `true`, `false` otherwise.
	*   * `['any', value1, value2, ...]` returns `true` if any of the inputs are `true`, `false` otherwise.
	*   * `['has', attributeName, keyOrArrayIndex, ...]` returns `true` if feature properties include the (nested) key `attributeName`,
	*     `false` otherwise.
	*     Note that for WebGL layers, the hardcoded value `-9999999` is used to distinguish when a property is not defined.
	*   * `['between', value1, value2, value3]` returns `true` if `value1` is contained between `value2` and `value3`
	*     (inclusively), or `false` otherwise.
	*   * `['in', needle, haystack]` returns `true` if `needle` is found in `haystack`, and
	*     `false` otherwise.
	*     This operator has the following limitations:
	*     * `haystack` has to be an array of numbers or strings (searching for a substring in a string is not supported yet)
	*     * Only literal arrays are supported as `haystack` for now; this means that `haystack` cannot be the result of an
	*     expression. If `haystack` is an array of strings, use the `literal` operator to disambiguate from an expression:
	*     `['literal', ['abc', 'def', 'ghi']]`
	*     This works as well for number arrays although it is not required. Mixing types (numbers and strings) will produce undefined results.
	*
	* * Conversion operators:
	*   * `['array', value1, ...valueN]` creates a numerical array from `number` values; please note that the amount of
	*     values can currently only be 2, 3 or 4 (WebGL only).
	*   * `['color', red, green, blue, alpha]` or `['color', shade, alpha]` creates a `color` value from `number` values;
	*     the `alpha` parameter is optional; if not specified, it will be set to 1 (WebGL only).
	*     Note: `red`, `green` and `blue` or `shade` components must be values between 0 and 255; `alpha` between 0 and 1.
	*   * `['palette', index, colors]` picks a `color` value from an array of colors using the given index; the `index`
	*     expression must evaluate to a number; the items in the `colors` array must be strings with hex colors
	*     (e.g. `'#86A136'`), colors using the rgba[a] functional notation (e.g. `'rgb(134, 161, 54)'` or `'rgba(134, 161, 54, 1)'`),
	*     named colors (e.g. `'red'`), or array literals with 3 ([r, g, b]) or 4 ([r, g, b, a]) values (with r, g, and b
	*     in the 0-255 range and a in the 0-1 range) (WebGL only).
	*   * `['to-string', value]` converts the input value to a string. If the input is a boolean, the result is "true" or "false".
	*     If the input is a number, it is converted to a string as specified by the "NumberToString" algorithm of the ECMAScript
	*     Language Specification. If the input is a color, it is converted to a string of the form "rgba(r,g,b,a)". (Canvas only)
	*
	* Values can either be literals or another operator, as they will be evaluated recursively.
	* Literal values can be of the following types:
	* * `boolean`
	* * `number`
	* * `number[]` (number arrays can only have a length of 2, 3 or 4)
	* * `string`
	* * {@link module:ol/color~Color}
	*
	* @typedef {Array<*>|import("../color.js").Color|string|number|boolean} ExpressionValue
	* @api
	*/
	/**
	* @typedef {number} ValueType
	*/
	let numTypes = 0;
	const BooleanType = 1 << numTypes++;
	const NumberType = 1 << numTypes++;
	const StringType = 1 << numTypes++;
	const ColorType = 1 << numTypes++;
	const NumberArrayType = 1 << numTypes++;
	const SizeType = 1 << numTypes++;
	const AnyType = Math.pow(2, numTypes) - 1;
	const typeNames = {
		[BooleanType]: "boolean",
		[NumberType]: "number",
		[StringType]: "string",
		[ColorType]: "color",
		[NumberArrayType]: "number[]",
		[SizeType]: "size"
	};
	const namedTypes = Object.keys(typeNames).map(Number).sort(ascending);
	/**
	* @param {ValueType} type The type.
	* @return {boolean} The type is one of the specific types (not any or a union type).
	*/
	function isSpecific(type) {
		return type in typeNames;
	}
	/**
	* Get a string representation for a type.
	* @param {ValueType} type The type.
	* @return {string} The type name.
	*/
	function typeName(type) {
		const names = [];
		for (const namedType of namedTypes) if (includesType(type, namedType)) names.push(typeNames[namedType]);
		if (names.length === 0) return "untyped";
		if (names.length < 3) return names.join(" or ");
		return names.slice(0, -1).join(", ") + ", or " + names[names.length - 1];
	}
	/**
	* @param {ValueType} broad The broad type.
	* @param {ValueType} specific The specific type.
	* @return {boolean} The broad type includes the specific type.
	*/
	function includesType(broad, specific) {
		return (broad & specific) === specific;
	}
	/**
	* @param {ValueType} oneType One type.
	* @param {ValueType} otherType Another type.
	* @return {boolean} The set of types overlap (share a common specific type)
	*/
	function overlapsType(oneType, otherType) {
		return !!(oneType & otherType);
	}
	/**
	* @param {ValueType} type The type.
	* @param {ValueType} expected The expected type.
	* @return {boolean} The given type is exactly the expected type.
	*/
	function isType(type, expected) {
		return type === expected;
	}
	/**
	* @typedef {boolean|number|string|Array<number>} LiteralValue
	*/
	var LiteralExpression = class {
		/**
		* @param {ValueType} type The value type.
		* @param {LiteralValue} value The literal value.
		*/
		constructor(type, value) {
			if (!isSpecific(type)) throw new Error(`literal expressions must have a specific type, got ${typeName(type)}`);
			this.type = type;
			this.value = value;
		}
	};
	var CallExpression = class {
		/**
		* @param {ValueType} type The return type.
		* @param {string} operator The operator.
		* @param {...Expression} args The arguments.
		*/
		constructor(type, operator, ...args) {
			this.type = type;
			this.operator = operator;
			this.args = args;
		}
	};
	/**
	* @typedef {LiteralExpression|CallExpression} Expression
	*/
	/**
	* @typedef {Object} ParsingContext
	* @property {Map<string, ValueType>} variables Variables referenced with the 'var' operator; key is name, value is type.
	* @property {Map<string, ValueType>} properties Properties referenced with the 'get' operator; key is name, value is type.
	* @property {boolean} featureId The style uses the feature id.
	* @property {boolean} geometryType The style uses the feature geometry type.
	* @property {boolean} mCoordinate The style uses the M coordinate of geometries
	* @property {boolean} mapState The style uses the map state (view state or time elapsed).
	* @property {import('../style/flat.js').StyleVariables} [inputVariables] Variable values (i.e. style variables) given as input during parsing to help with type narrowing
	*/
	/**
	* @param {import('../style/flat.js').StyleVariables} [inputVariables] Variable values (i.e. style variables) given as input during parsing to help with type narrowing
	* @return {ParsingContext} A new parsing context.
	*/
	function newParsingContext(inputVariables) {
		return {
			variables: /* @__PURE__ */ new Map(),
			properties: /* @__PURE__ */ new Map(),
			featureId: false,
			geometryType: false,
			mCoordinate: false,
			mapState: false,
			inputVariables
		};
	}
	/**
	* @typedef {LiteralValue|Array} EncodedExpression
	*/
	/**
	* @param {EncodedExpression} encoded The encoded expression.
	* @param {ValueType} expectedType The expected type.
	* @param {ParsingContext} context The parsing context.
	* @return {Expression} The parsed expression result.
	*/
	function parse(encoded, expectedType, context) {
		switch (typeof encoded) {
			case "boolean":
				if (isType(expectedType, StringType)) return new LiteralExpression(StringType, encoded ? "true" : "false");
				if (!includesType(expectedType, BooleanType)) throw new Error(`got a boolean, but expected ${typeName(expectedType)}`);
				return new LiteralExpression(BooleanType, encoded);
			case "number":
				if (isType(expectedType, SizeType)) return new LiteralExpression(SizeType, toSize(encoded));
				if (isType(expectedType, BooleanType)) return new LiteralExpression(BooleanType, !!encoded);
				if (isType(expectedType, StringType)) return new LiteralExpression(StringType, encoded.toString());
				if (!includesType(expectedType, NumberType)) throw new Error(`got a number, but expected ${typeName(expectedType)}`);
				return new LiteralExpression(NumberType, encoded);
			case "string":
				if (isType(expectedType, ColorType)) return new LiteralExpression(ColorType, fromString(encoded));
				if (isType(expectedType, BooleanType)) return new LiteralExpression(BooleanType, !!encoded);
				if (!includesType(expectedType, StringType)) throw new Error(`got a string, but expected ${typeName(expectedType)}`);
				return new LiteralExpression(StringType, encoded);
			default:
		}
		if (!Array.isArray(encoded)) throw new Error("expression must be an array or a primitive value");
		if (encoded.length === 0) throw new Error("empty expression");
		if (typeof encoded[0] === "string") return parseCallExpression(encoded, expectedType, context);
		for (const item of encoded) if (typeof item !== "number") throw new Error("expected an array of numbers");
		if (isType(expectedType, SizeType)) {
			if (encoded.length !== 2) throw new Error(`expected an array of two values for a size, got ${encoded.length}`);
			return new LiteralExpression(SizeType, encoded);
		}
		if (isType(expectedType, ColorType)) {
			if (encoded.length === 3) return new LiteralExpression(ColorType, [...encoded, 1]);
			if (encoded.length === 4) return new LiteralExpression(ColorType, encoded);
			throw new Error(`expected an array of 3 or 4 values for a color, got ${encoded.length}`);
		}
		if (!includesType(expectedType, NumberArrayType)) throw new Error(`got an array of numbers, but expected ${typeName(expectedType)}`);
		return new LiteralExpression(NumberArrayType, encoded);
	}
	/**
	* @type {Object<string, string>}
	*/
	const Ops = {
		Get: "get",
		Var: "var",
		Concat: "concat",
		GeometryType: "geometry-type",
		LineMetric: "line-metric",
		Any: "any",
		All: "all",
		Not: "!",
		Resolution: "resolution",
		Zoom: "zoom",
		Time: "time",
		Equal: "==",
		NotEqual: "!=",
		GreaterThan: ">",
		GreaterThanOrEqualTo: ">=",
		LessThan: "<",
		LessThanOrEqualTo: "<=",
		Multiply: "*",
		Divide: "/",
		Add: "+",
		Subtract: "-",
		Clamp: "clamp",
		Mod: "%",
		Pow: "^",
		Abs: "abs",
		Floor: "floor",
		Ceil: "ceil",
		Round: "round",
		Sin: "sin",
		Cos: "cos",
		Atan: "atan",
		Sqrt: "sqrt",
		Match: "match",
		Between: "between",
		Interpolate: "interpolate",
		Coalesce: "coalesce",
		Case: "case",
		In: "in",
		Number: "number",
		String: "string",
		Array: "array",
		Color: "color",
		Id: "id",
		Band: "band",
		Palette: "palette",
		ToString: "to-string",
		Has: "has"
	};
	/**
	* @typedef {function(Array, number, ParsingContext):Expression} Parser
	*
	* Second argument is the expected type.
	*/
	/**
	* @type {Object<string, Parser>}
	*/
	const parsers = {
		[Ops.Get]: createCallExpressionParser(hasArgsCount(1, Infinity), withGetArgs),
		[Ops.Var]: createVarExpressionParser(),
		[Ops.Has]: createCallExpressionParser(hasArgsCount(1, Infinity), withGetArgs),
		[Ops.Id]: createCallExpressionParser(usesFeatureId, withNoArgs),
		[Ops.Concat]: createCallExpressionParser(hasArgsCount(2, Infinity), withArgsOfType(StringType)),
		[Ops.GeometryType]: createCallExpressionParser(usesGeometryType, withNoArgs),
		[Ops.LineMetric]: createCallExpressionParser(usesMCoordinate, withNoArgs),
		[Ops.Resolution]: createCallExpressionParser(usesMapState, withNoArgs),
		[Ops.Zoom]: createCallExpressionParser(usesMapState, withNoArgs),
		[Ops.Time]: createCallExpressionParser(usesMapState, withNoArgs),
		[Ops.Any]: createCallExpressionParser(hasArgsCount(2, Infinity), withArgsOfType(BooleanType)),
		[Ops.All]: createCallExpressionParser(hasArgsCount(2, Infinity), withArgsOfType(BooleanType)),
		[Ops.Not]: createCallExpressionParser(hasArgsCount(1, 1), withArgsOfType(BooleanType)),
		[Ops.Equal]: createCallExpressionParser(hasArgsCount(2, 2), withArgsOfIdenticalType()),
		[Ops.NotEqual]: createCallExpressionParser(hasArgsCount(2, 2), withArgsOfIdenticalType()),
		[Ops.GreaterThan]: createCallExpressionParser(hasArgsCount(2, 2), withArgsOfType(NumberType)),
		[Ops.GreaterThanOrEqualTo]: createCallExpressionParser(hasArgsCount(2, 2), withArgsOfType(NumberType)),
		[Ops.LessThan]: createCallExpressionParser(hasArgsCount(2, 2), withArgsOfType(NumberType)),
		[Ops.LessThanOrEqualTo]: createCallExpressionParser(hasArgsCount(2, 2), withArgsOfType(NumberType)),
		[Ops.Multiply]: createCallExpressionParser(hasArgsCount(2, Infinity), withArgsOfReturnType),
		[Ops.Coalesce]: createCallExpressionParser(hasArgsCount(2, Infinity), withArgsOfReturnType),
		[Ops.Divide]: createCallExpressionParser(hasArgsCount(2, 2), withArgsOfType(NumberType)),
		[Ops.Add]: createCallExpressionParser(hasArgsCount(2, Infinity), withArgsOfType(NumberType)),
		[Ops.Subtract]: createCallExpressionParser(hasArgsCount(2, 2), withArgsOfType(NumberType)),
		[Ops.Clamp]: createCallExpressionParser(hasArgsCount(3, 3), withArgsOfType(NumberType)),
		[Ops.Mod]: createCallExpressionParser(hasArgsCount(2, 2), withArgsOfType(NumberType)),
		[Ops.Pow]: createCallExpressionParser(hasArgsCount(2, 2), withArgsOfType(NumberType)),
		[Ops.Abs]: createCallExpressionParser(hasArgsCount(1, 1), withArgsOfType(NumberType)),
		[Ops.Floor]: createCallExpressionParser(hasArgsCount(1, 1), withArgsOfType(NumberType)),
		[Ops.Ceil]: createCallExpressionParser(hasArgsCount(1, 1), withArgsOfType(NumberType)),
		[Ops.Round]: createCallExpressionParser(hasArgsCount(1, 1), withArgsOfType(NumberType)),
		[Ops.Sin]: createCallExpressionParser(hasArgsCount(1, 1), withArgsOfType(NumberType)),
		[Ops.Cos]: createCallExpressionParser(hasArgsCount(1, 1), withArgsOfType(NumberType)),
		[Ops.Atan]: createCallExpressionParser(hasArgsCount(1, 2), withArgsOfType(NumberType)),
		[Ops.Sqrt]: createCallExpressionParser(hasArgsCount(1, 1), withArgsOfType(NumberType)),
		[Ops.Match]: createCallExpressionParser(hasArgsCount(4, Infinity), hasEvenArgs, withMatchArgs),
		[Ops.Between]: createCallExpressionParser(hasArgsCount(3, 3), withArgsOfType(NumberType)),
		[Ops.Interpolate]: createCallExpressionParser(hasArgsCount(6, Infinity), hasEvenArgs, withInterpolateArgs),
		[Ops.Case]: createCallExpressionParser(hasArgsCount(3, Infinity), hasOddArgs, withCaseArgs),
		[Ops.In]: createCallExpressionParser(hasArgsCount(2, 2), withInArgs),
		[Ops.Number]: createCallExpressionParser(hasArgsCount(1, Infinity), withArgsOfType(AnyType)),
		[Ops.String]: createCallExpressionParser(hasArgsCount(1, Infinity), withArgsOfType(AnyType)),
		[Ops.Array]: createCallExpressionParser(hasArgsCount(1, Infinity), withArgsOfType(NumberType)),
		[Ops.Color]: createCallExpressionParser(hasArgsCount(1, 4), withArgsOfType(NumberType)),
		[Ops.Band]: createCallExpressionParser(hasArgsCount(1, 3), withArgsOfType(NumberType)),
		[Ops.Palette]: createCallExpressionParser(hasArgsCount(2, 2), withPaletteArgs),
		[Ops.ToString]: createCallExpressionParser(hasArgsCount(1, 1), withArgsOfType(BooleanType | NumberType | StringType | ColorType))
	};
	/**
	* @typedef {function(Array<EncodedExpression>, ValueType, ParsingContext):Array<Expression>|void} ArgValidator
	*
	* An argument validator applies various checks to an encoded expression arguments and
	* returns the parsed arguments if any.  The second argument is the return type of the call expression.
	*/
	/**
	* @type {ArgValidator}
	*/
	function withGetArgs(encoded, returnType, context) {
		const argsCount = encoded.length - 1;
		const args = new Array(argsCount);
		for (let i = 0; i < argsCount; ++i) {
			const key = encoded[i + 1];
			switch (typeof key) {
				case "number":
					args[i] = new LiteralExpression(NumberType, key);
					break;
				case "string":
					args[i] = new LiteralExpression(StringType, key);
					break;
				default: throw new Error(`expected a string key or numeric array index for a get operation, got ${key}`);
			}
			if (i === 0) context.properties.set(String(key), returnType);
		}
		return args;
	}
	/**
	* This special expression parser reads style variables present in the context to narrow down
	* the expected return type of the 'var' operator
	* @return {Parser} The parser.
	*/
	function createVarExpressionParser() {
		return function(encoded, returnType, context) {
			const name = encoded[1];
			if (typeof name !== "string") throw new Error("expected a string argument for var operation");
			let type = returnType;
			const variableValue = context.inputVariables?.[name];
			if (variableValue !== void 0) {
				const parsedInput = parse(variableValue, AnyType, context);
				if (!(parsedInput instanceof LiteralExpression)) throw new Error(`style variables should only be literal values (no expressions!), variable name: ${name}`);
				let parsedType = parsedInput.type;
				if (typeof variableValue === "string" && overlapsType(type, ColorType) && !overlapsType(type, StringType)) parsedType = ColorType;
				else if (Array.isArray(variableValue) && variableValue.length === 2 && overlapsType(type, SizeType) && !overlapsType(type, NumberArrayType)) parsedType = SizeType;
				type &= parsedType;
				if (type === 0) throw new Error(`the type expected from the var operator (${typeName(returnType)}) did not have any overlap with the type of the corresponding style variables (${typeName(parsedType)}), variable name: ${name}`);
			}
			if (context.variables.has(name)) {
				const existingType = context.variables.get(name);
				type &= existingType;
				if (type === 0) throw new Error(`a new type expected from the var operator (${typeName(returnType)}) did not have any overlap with the previous type expected for it (${typeName(existingType)}), variable name: ${name}`);
			}
			context.variables.set(name, type);
			return new CallExpression(type, "var", new LiteralExpression(StringType, name));
		};
	}
	/**
	* @type {ArgValidator}
	*/
	function usesFeatureId(encoded, returnType, context) {
		context.featureId = true;
	}
	/**
	* @type {ArgValidator}
	*/
	function usesGeometryType(encoded, returnType, context) {
		context.geometryType = true;
	}
	/**
	* @type {ArgValidator}
	*/
	function usesMCoordinate(encoded, returnType, context) {
		context.mCoordinate = true;
	}
	/**
	* @type {ArgValidator}
	*/
	function usesMapState(encoded, returnType, context) {
		context.mapState = true;
	}
	/**
	* @type {ArgValidator}
	*/
	function withNoArgs(encoded, returnType, context) {
		const operation = encoded[0];
		if (encoded.length !== 1) throw new Error(`expected no arguments for ${operation} operation`);
		return [];
	}
	/**
	* @param {number} minArgs The minimum number of arguments.
	* @param {number} maxArgs The maximum number of arguments.
	* @return {ArgValidator} The argument validator
	*/
	function hasArgsCount(minArgs, maxArgs) {
		return function(encoded, returnType, context) {
			const operation = encoded[0];
			const argCount = encoded.length - 1;
			if (minArgs === maxArgs) {
				if (argCount !== minArgs) throw new Error(`expected ${minArgs} argument${minArgs === 1 ? "" : "s"} for ${operation}, got ${argCount}`);
			} else if (argCount < minArgs || argCount > maxArgs) {
				const range = maxArgs === Infinity ? `${minArgs} or more` : `${minArgs} to ${maxArgs}`;
				throw new Error(`expected ${range} arguments for ${operation}, got ${argCount}`);
			}
		};
	}
	/**
	* @type {ArgValidator}
	*/
	function withArgsOfReturnType(encoded, returnType, context) {
		const argCount = encoded.length - 1;
		/**
		* @type {Array<Expression>}
		*/
		const args = new Array(argCount);
		for (let i = 0; i < argCount; ++i) args[i] = parse(encoded[i + 1], returnType, context);
		return args;
	}
	/**
	* @param {ValueType} argType The argument type.
	* @return {ArgValidator} The argument validator
	*/
	function withArgsOfType(argType) {
		return function(encoded, returnType, context) {
			const argCount = encoded.length - 1;
			/**
			* @type {Array<Expression>}
			*/
			const args = new Array(argCount);
			for (let i = 0; i < argCount; ++i) args[i] = parse(encoded[i + 1], argType, context);
			return args;
		};
	}
	/**
	* @return {ArgValidator} The argument validator
	*/
	function withArgsOfIdenticalType() {
		return function(encoded, returnType, context) {
			const operation = encoded[0];
			const argCount = encoded.length - 1;
			/**
			* @type {Array<Expression>}
			*/
			const args = new Array(argCount);
			let commonType = AnyType;
			for (let i = 0; i < argCount; ++i) {
				const expression = parse(encoded[i + 1], commonType, context);
				commonType &= expression.type;
			}
			if (commonType === 0) throw new Error(`no common type was found among the arguments of ${operation}`);
			for (let i = 0; i < argCount; ++i) args[i] = parse(encoded[i + 1], commonType, context);
			return args;
		};
	}
	/**
	* @type {ArgValidator}
	*/
	function hasOddArgs(encoded, returnType, context) {
		const operation = encoded[0];
		const argCount = encoded.length - 1;
		if (argCount % 2 === 0) throw new Error(`expected an odd number of arguments for ${operation}, got ${argCount} instead`);
	}
	/**
	* @type {ArgValidator}
	*/
	function hasEvenArgs(encoded, returnType, context) {
		const operation = encoded[0];
		const argCount = encoded.length - 1;
		if (argCount % 2 === 1) throw new Error(`expected an even number of arguments for operation ${operation}, got ${argCount} instead`);
	}
	/**
	* @type {ArgValidator}
	*/
	function withMatchArgs(encoded, returnType, context) {
		const argsCount = encoded.length - 1;
		const fallback = parse(encoded[encoded.length - 1], returnType, context);
		let inputType = StringType | NumberType | BooleanType;
		const args = new Array(argsCount - 2);
		for (let i = 0; i < argsCount - 2; i += 2) {
			try {
				const match = parse(encoded[i + 2], inputType, context);
				inputType &= match.type;
			} catch (err) {
				throw new Error(`failed to parse argument ${i + 1} of match expression: ${err.message}`);
			}
			if (inputType === 0) throw new Error(`no common type was found among the arguments of match expression`);
		}
		for (let i = 0; i < argsCount - 2; i += 2) {
			try {
				args[i] = parse(encoded[i + 2], inputType, context);
			} catch (err) {
				throw new Error(`failed to parse argument ${i + 1} of match expression: ${err.message}`);
			}
			try {
				const output = parse(encoded[i + 3], fallback.type, context);
				args[i + 1] = output;
			} catch (err) {
				throw new Error(`failed to parse argument ${i + 2} of match expression: ${err.message}`);
			}
		}
		return [
			parse(encoded[1], inputType, context),
			...args,
			fallback
		];
	}
	/**
	* @type {ArgValidator}
	*/
	function withInterpolateArgs(encoded, returnType, context) {
		const interpolationType = encoded[1];
		/**
		* @type {number}
		*/
		let base;
		switch (interpolationType[0]) {
			case "linear":
				base = 1;
				break;
			case "exponential":
				const b = interpolationType[1];
				if (typeof b !== "number" || b <= 0) throw new Error(`expected a number base for exponential interpolation, got ${JSON.stringify(b)} instead`);
				base = b;
				break;
			default: throw new Error(`invalid interpolation type: ${JSON.stringify(interpolationType)}`);
		}
		const interpolation = new LiteralExpression(NumberType, base);
		let input;
		try {
			input = parse(encoded[2], NumberType, context);
		} catch (err) {
			throw new Error(`failed to parse argument 1 in interpolate expression: ${err.message}`);
		}
		const args = new Array(encoded.length - 3);
		for (let i = 0; i < args.length; i += 2) {
			try {
				args[i] = parse(encoded[i + 3], NumberType, context);
			} catch (err) {
				throw new Error(`failed to parse argument ${i + 2} for interpolate expression: ${err.message}`);
			}
			try {
				const output = parse(encoded[i + 4], returnType, context);
				args[i + 1] = output;
			} catch (err) {
				throw new Error(`failed to parse argument ${i + 3} for interpolate expression: ${err.message}`);
			}
		}
		return [
			interpolation,
			input,
			...args
		];
	}
	/**
	* @type {ArgValidator}
	*/
	function withCaseArgs(encoded, returnType, context) {
		const fallback = parse(encoded[encoded.length - 1], returnType, context);
		const args = new Array(encoded.length - 1);
		for (let i = 0; i < args.length - 1; i += 2) {
			try {
				args[i] = parse(encoded[i + 1], BooleanType, context);
			} catch (err) {
				throw new Error(`failed to parse argument ${i} of case expression: ${err.message}`);
			}
			try {
				const output = parse(encoded[i + 2], fallback.type, context);
				args[i + 1] = output;
			} catch (err) {
				throw new Error(`failed to parse argument ${i + 1} of case expression: ${err.message}`);
			}
		}
		args[args.length - 1] = fallback;
		return args;
	}
	/**
	* @type {ArgValidator}
	*/
	function withInArgs(encoded, returnType, context) {
		let haystack = encoded[2];
		if (!Array.isArray(haystack)) throw new Error(`the second argument for the "in" operator must be an array`);
		/**
		* @type {ValueType}
		*/
		let needleType;
		if (haystack[0] === "literal") {
			haystack = haystack[1];
			if (!Array.isArray(haystack)) throw new Error(`failed to parse "in" expression: the literal operator must be followed by an array`);
		} else if (typeof haystack[0] === "string") throw new Error(`for the "in" operator, a string array should be wrapped in a "literal" operator to disambiguate from expressions`);
		if (typeof haystack[0] === "string") needleType = StringType;
		else needleType = NumberType;
		const args = new Array(haystack.length);
		for (let i = 0; i < args.length; i++) try {
			args[i] = parse(haystack[i], needleType, context);
		} catch (err) {
			throw new Error(`failed to parse haystack item ${i} for "in" expression: ${err.message}`);
		}
		return [parse(encoded[1], needleType, context), ...args];
	}
	/**
	* @type {ArgValidator}
	*/
	function withPaletteArgs(encoded, returnType, context) {
		let index;
		try {
			index = parse(encoded[1], NumberType, context);
		} catch (err) {
			throw new Error(`failed to parse first argument in palette expression: ${err.message}`);
		}
		const colors = encoded[2];
		if (!Array.isArray(colors)) throw new Error("the second argument of palette must be an array");
		const parsedColors = new Array(colors.length);
		for (let i = 0; i < parsedColors.length; i++) {
			let color;
			try {
				color = parse(colors[i], ColorType, context);
			} catch (err) {
				throw new Error(`failed to parse color at index ${i} in palette expression: ${err.message}`);
			}
			if (!(color instanceof LiteralExpression)) throw new Error(`the palette color at index ${i} must be a literal value`);
			parsedColors[i] = color;
		}
		return [index, ...parsedColors];
	}
	/**
	* @param {Array<ArgValidator>} validators A chain of argument validators.  The last validator is expected
	* to return the parsed arguments.
	* @return {Parser} The parser.
	*/
	function createCallExpressionParser(...validators) {
		return function(encoded, returnType, context) {
			const operator = encoded[0];
			/**
			* @type {Array<Expression>}
			*/
			let args;
			for (let i = 0; i < validators.length; i++) {
				const parsed = validators[i](encoded, returnType, context);
				if (i == validators.length - 1) {
					if (!parsed) throw new Error("expected last argument validator to return the parsed args");
					args = parsed;
				}
			}
			return new CallExpression(returnType, operator, ...args);
		};
	}
	/**
	* @param {Array} encoded The encoded expression.
	* @param {ValueType} returnType The expected return type of the call expression.
	* @param {ParsingContext} context The parsing context.
	* @return {Expression} The parsed expression.
	*/
	function parseCallExpression(encoded, returnType, context) {
		const operator = encoded[0];
		const parser = parsers[operator];
		if (!parser) throw new Error(`unknown operator: ${operator}`);
		return parser(encoded, returnType, context);
	}
	/**
	* Returns a simplified geometry type suited for the `geometry-type` operator
	* @param {import('../geom/Geometry.js').default|import('../render/Feature.js').default} geometry Geometry object
	* @return {'Point'|'LineString'|'Polygon'|''} Simplified geometry type; empty string of no geometry found
	*/
	function computeGeometryType(geometry) {
		if (!geometry) return "";
		const type = geometry.getType();
		switch (type) {
			case "Point":
			case "LineString":
			case "Polygon": return type;
			case "MultiPoint":
			case "MultiLineString":
			case "MultiPolygon": return type.substring(5);
			case "Circle": return "Polygon";
			case "GeometryCollection": return computeGeometryType(
				/** @type {import("../geom/GeometryCollection.js").default} */
				geometry.getGeometries()[0]
			);
			default: return "";
		}
	}
	//#endregion
	//#region src/ol/expr/cpu.js
	/**
	* @module ol/expr/cpu
	*/
	/**
	* @typedef {import('./expression.js').ValueType} ValueType
	*/
	/**
	* @fileoverview This module includes functions to build expressions for evaluation on the CPU.
	* Building is composed of two steps: parsing and compiling.  The parsing step takes an encoded
	* expression and returns an instance of one of the expression classes.  The compiling step takes
	* the expression instance and returns a function that can be evaluated in to return a literal
	* value.  The evaluator function should do as little allocation and work as possible.
	*/
	/**
	* @typedef {Object} EvaluationContext
	* @property {Object} properties The values for properties used in 'get' expressions.
	* @property {Object} variables The values for variables used in 'var' expressions.
	* @property {number} resolution The map resolution.
	* @property {string|number|null} featureId The feature id.
	* @property {string} geometryType Geometry type of the current object.
	*/
	/**
	* @return {EvaluationContext} A new evaluation context.
	*/
	function newEvaluationContext() {
		return {
			variables: {},
			properties: {},
			resolution: NaN,
			featureId: null,
			geometryType: ""
		};
	}
	/**
	* @typedef {function(EvaluationContext):import("./expression.js").LiteralValue} ExpressionEvaluator
	*/
	/**
	* @typedef {function(EvaluationContext):boolean} BooleanEvaluator
	*/
	/**
	* @typedef {function(EvaluationContext):number} NumberEvaluator
	*/
	/**
	* @typedef {function(EvaluationContext):string} StringEvaluator
	*/
	/**
	* @typedef {function(EvaluationContext):(Array<number>|string)} ColorLikeEvaluator
	*/
	/**
	* @typedef {function(EvaluationContext):Array<number>} NumberArrayEvaluator
	*/
	/**
	* @typedef {function(EvaluationContext):Array<number>} CoordinateEvaluator
	*/
	/**
	* @typedef {function(EvaluationContext):(Array<number>)} SizeEvaluator
	*/
	/**
	* @typedef {function(EvaluationContext):(Array<number>|number)} SizeLikeEvaluator
	*/
	/**
	* @param {import('./expression.js').EncodedExpression} encoded The encoded expression.
	* @param {ValueType} type The expected type.
	* @param {import('./expression.js').ParsingContext} context The parsing context.
	* @return {ExpressionEvaluator} The expression evaluator.
	*/
	function buildExpression(encoded, type, context) {
		return compileExpression(parse(encoded, type, context), context);
	}
	/**
	* @param {import("./expression.js").Expression} expression The expression.
	* @param {import('./expression.js').ParsingContext} context The parsing context.
	* @return {ExpressionEvaluator} The evaluator function.
	*/
	function compileExpression(expression, context) {
		if (expression instanceof LiteralExpression) {
			if (expression.type === ColorType && typeof expression.value === "string") {
				const colorValue = fromString(expression.value);
				return function() {
					return colorValue;
				};
			}
			return function() {
				return expression.value;
			};
		}
		const operator = expression.operator;
		switch (operator) {
			case Ops.Number:
			case Ops.String:
			case Ops.Coalesce: return compileAssertionExpression(expression, context);
			case Ops.Get:
			case Ops.Var:
			case Ops.Has: return compileAccessorExpression(expression, context);
			case Ops.Id: return (context) => context.featureId;
			case Ops.GeometryType: return (context) => context.geometryType;
			case Ops.Concat: {
				const args = expression.args.map((e) => compileExpression(e, context));
				return (context) => "".concat(...args.map((arg) => arg(context).toString()));
			}
			case Ops.Resolution: return (context) => context.resolution;
			case Ops.Any:
			case Ops.All:
			case Ops.Between:
			case Ops.In:
			case Ops.Not: return compileLogicalExpression(expression, context);
			case Ops.Equal:
			case Ops.NotEqual:
			case Ops.LessThan:
			case Ops.LessThanOrEqualTo:
			case Ops.GreaterThan:
			case Ops.GreaterThanOrEqualTo: return compileComparisonExpression(expression, context);
			case Ops.Multiply:
			case Ops.Divide:
			case Ops.Add:
			case Ops.Subtract:
			case Ops.Clamp:
			case Ops.Mod:
			case Ops.Pow:
			case Ops.Abs:
			case Ops.Floor:
			case Ops.Ceil:
			case Ops.Round:
			case Ops.Sin:
			case Ops.Cos:
			case Ops.Atan:
			case Ops.Sqrt: return compileNumericExpression(expression, context);
			case Ops.Case: return compileCaseExpression(expression, context);
			case Ops.Match: return compileMatchExpression(expression, context);
			case Ops.Interpolate: return compileInterpolateExpression(expression, context);
			case Ops.ToString: return compileConvertExpression(expression, context);
			default: throw new Error(`Unsupported operator ${operator}`);
		}
	}
	/**
	* @param {import('./expression.js').CallExpression} expression The call expression.
	* @param {import('./expression.js').ParsingContext} context The parsing context.
	* @return {ExpressionEvaluator} The evaluator function.
	*/
	function compileAssertionExpression(expression, context) {
		const type = expression.operator;
		const length = expression.args.length;
		const args = new Array(length);
		for (let i = 0; i < length; ++i) args[i] = compileExpression(expression.args[i], context);
		switch (type) {
			case Ops.Coalesce: return (context) => {
				for (let i = 0; i < length; ++i) {
					const value = args[i](context);
					if (typeof value !== "undefined" && value !== null) return value;
				}
				throw new Error("Expected one of the values to be non-null");
			};
			case Ops.Number:
			case Ops.String: return (context) => {
				for (let i = 0; i < length; ++i) {
					const value = args[i](context);
					if (typeof value === type) return value;
				}
				throw new Error(`Expected one of the values to be a ${type}`);
			};
			default: throw new Error(`Unsupported assertion operator ${type}`);
		}
	}
	/**
	* @param {import('./expression.js').CallExpression} expression The call expression.
	* @param {import('./expression.js').ParsingContext} context The parsing context.
	* @return {ExpressionEvaluator} The evaluator function.
	*/
	function compileAccessorExpression(expression, context) {
		const name = expression.args[0].value;
		switch (expression.operator) {
			case Ops.Get: return (context) => {
				const args = expression.args;
				let value = context.properties[name];
				for (let i = 1, ii = args.length; i < ii; ++i) {
					const key = args[i].value;
					value = value[key];
				}
				return value;
			};
			case Ops.Var: return (context) => context.variables[name];
			case Ops.Has: return (context) => {
				const args = expression.args;
				if (!(name in context.properties)) return false;
				let value = context.properties[name];
				for (let i = 1, ii = args.length; i < ii; ++i) {
					const key = args[i].value;
					if (!value || !Object.hasOwn(value, key)) return false;
					value = value[key];
				}
				return true;
			};
			default: throw new Error(`Unsupported accessor operator ${expression.operator}`);
		}
	}
	/**
	* @param {import('./expression.js').CallExpression} expression The call expression.
	* @param {import('./expression.js').ParsingContext} context The parsing context.
	* @return {BooleanEvaluator} The evaluator function.
	*/
	function compileComparisonExpression(expression, context) {
		const op = expression.operator;
		const left = compileExpression(expression.args[0], context);
		const right = compileExpression(expression.args[1], context);
		switch (op) {
			case Ops.Equal: return (context) => left(context) === right(context);
			case Ops.NotEqual: return (context) => left(context) !== right(context);
			case Ops.LessThan: return (context) => left(context) < right(context);
			case Ops.LessThanOrEqualTo: return (context) => left(context) <= right(context);
			case Ops.GreaterThan: return (context) => left(context) > right(context);
			case Ops.GreaterThanOrEqualTo: return (context) => left(context) >= right(context);
			default: throw new Error(`Unsupported comparison operator ${op}`);
		}
	}
	/**
	* @param {import('./expression.js').CallExpression} expression The call expression.
	* @param {import('./expression.js').ParsingContext} context The parsing context.
	* @return {BooleanEvaluator} The evaluator function.
	*/
	function compileLogicalExpression(expression, context) {
		const op = expression.operator;
		const length = expression.args.length;
		const args = new Array(length);
		for (let i = 0; i < length; ++i) args[i] = compileExpression(expression.args[i], context);
		switch (op) {
			case Ops.Any: return (context) => {
				for (let i = 0; i < length; ++i) if (args[i](context)) return true;
				return false;
			};
			case Ops.All: return (context) => {
				for (let i = 0; i < length; ++i) if (!args[i](context)) return false;
				return true;
			};
			case Ops.Between: return (context) => {
				const value = args[0](context);
				const min = args[1](context);
				const max = args[2](context);
				return value >= min && value <= max;
			};
			case Ops.In: return (context) => {
				const value = args[0](context);
				for (let i = 1; i < length; ++i) if (value === args[i](context)) return true;
				return false;
			};
			case Ops.Not: return (context) => !args[0](context);
			default: throw new Error(`Unsupported logical operator ${op}`);
		}
	}
	/**
	* @param {import('./expression.js').CallExpression} expression The call expression.
	* @param {import('./expression.js').ParsingContext} context The parsing context.
	* @return {NumberEvaluator} The evaluator function.
	*/
	function compileNumericExpression(expression, context) {
		const op = expression.operator;
		const length = expression.args.length;
		const args = new Array(length);
		for (let i = 0; i < length; ++i) args[i] = compileExpression(expression.args[i], context);
		switch (op) {
			case Ops.Multiply: return (context) => {
				let value = 1;
				for (let i = 0; i < length; ++i) value *= args[i](context);
				return value;
			};
			case Ops.Divide: return (context) => args[0](context) / args[1](context);
			case Ops.Add: return (context) => {
				let value = 0;
				for (let i = 0; i < length; ++i) value += args[i](context);
				return value;
			};
			case Ops.Subtract: return (context) => args[0](context) - args[1](context);
			case Ops.Clamp: return (context) => {
				const value = args[0](context);
				const min = args[1](context);
				if (value < min) return min;
				const max = args[2](context);
				if (value > max) return max;
				return value;
			};
			case Ops.Mod: return (context) => args[0](context) % args[1](context);
			case Ops.Pow: return (context) => Math.pow(args[0](context), args[1](context));
			case Ops.Abs: return (context) => Math.abs(args[0](context));
			case Ops.Floor: return (context) => Math.floor(args[0](context));
			case Ops.Ceil: return (context) => Math.ceil(args[0](context));
			case Ops.Round: return (context) => Math.round(args[0](context));
			case Ops.Sin: return (context) => Math.sin(args[0](context));
			case Ops.Cos: return (context) => Math.cos(args[0](context));
			case Ops.Atan:
				if (length === 2) return (context) => Math.atan2(args[0](context), args[1](context));
				return (context) => Math.atan(args[0](context));
			case Ops.Sqrt: return (context) => Math.sqrt(args[0](context));
			default: throw new Error(`Unsupported numeric operator ${op}`);
		}
	}
	/**
	* @param {import('./expression.js').CallExpression} expression The call expression.
	* @param {import('./expression.js').ParsingContext} context The parsing context.
	* @return {ExpressionEvaluator} The evaluator function.
	*/
	function compileCaseExpression(expression, context) {
		const length = expression.args.length;
		const args = new Array(length);
		for (let i = 0; i < length; ++i) args[i] = compileExpression(expression.args[i], context);
		return (context) => {
			for (let i = 0; i < length - 1; i += 2) if (args[i](context)) return args[i + 1](context);
			return args[length - 1](context);
		};
	}
	/**
	* @param {import('./expression.js').CallExpression} expression The call expression.
	* @param {import('./expression.js').ParsingContext} context The parsing context.
	* @return {ExpressionEvaluator} The evaluator function.
	*/
	function compileMatchExpression(expression, context) {
		const length = expression.args.length;
		const args = new Array(length);
		for (let i = 0; i < length; ++i) args[i] = compileExpression(expression.args[i], context);
		return (context) => {
			const value = args[0](context);
			for (let i = 1; i < length - 1; i += 2) if (value === args[i](context)) return args[i + 1](context);
			return args[length - 1](context);
		};
	}
	/**
	* @param {import('./expression.js').CallExpression} expression The call expression.
	* @param {import('./expression.js').ParsingContext} context The parsing context.
	* @return {ExpressionEvaluator} The evaluator function.
	*/
	function compileInterpolateExpression(expression, context) {
		const length = expression.args.length;
		const args = new Array(length);
		for (let i = 0; i < length; ++i) args[i] = compileExpression(expression.args[i], context);
		return (context) => {
			const base = args[0](context);
			const value = args[1](context);
			let previousInput;
			let previousOutput;
			for (let i = 2; i < length; i += 2) {
				const input = args[i](context);
				let output = args[i + 1](context);
				const isColor = Array.isArray(output);
				if (isColor) output = withAlpha(output);
				if (input >= value) {
					if (i === 2) return output;
					if (isColor) return interpolateColor(base, value, previousInput, previousOutput, input, output);
					return interpolateNumber(base, value, previousInput, previousOutput, input, output);
				}
				previousInput = input;
				previousOutput = output;
			}
			return previousOutput;
		};
	}
	/**
	* @param {import('./expression.js').CallExpression} expression The call expression.
	* @param {import('./expression.js').ParsingContext} context The parsing context.
	* @return {ExpressionEvaluator} The evaluator function.
	*/
	function compileConvertExpression(expression, context) {
		const op = expression.operator;
		const length = expression.args.length;
		const args = new Array(length);
		for (let i = 0; i < length; ++i) args[i] = compileExpression(expression.args[i], context);
		switch (op) {
			case Ops.ToString: return (context) => {
				const value = args[0](context);
				if (expression.args[0].type === ColorType) return toString(value);
				return value.toString();
			};
			default: throw new Error(`Unsupported convert operator ${op}`);
		}
	}
	/**
	* @param {number} base The base.
	* @param {number} value The value.
	* @param {number} input1 The first input value.
	* @param {number} output1 The first output value.
	* @param {number} input2 The second input value.
	* @param {number} output2 The second output value.
	* @return {number} The interpolated value.
	*/
	function interpolateNumber(base, value, input1, output1, input2, output2) {
		const delta = input2 - input1;
		if (delta === 0) return output1;
		const along = value - input1;
		return output1 + (base === 1 ? along / delta : (Math.pow(base, along) - 1) / (Math.pow(base, delta) - 1)) * (output2 - output1);
	}
	/**
	* @param {number} base The base.
	* @param {number} value The value.
	* @param {number} input1 The first input value.
	* @param {import('../color.js').Color} rgba1 The first output value.
	* @param {number} input2 The second input value.
	* @param {import('../color.js').Color} rgba2 The second output value.
	* @return {import('../color.js').Color} The interpolated color.
	*/
	function interpolateColor(base, value, input1, rgba1, input2, rgba2) {
		if (input2 - input1 === 0) return rgba1;
		const lcha1 = rgbaToLcha(rgba1);
		const lcha2 = rgbaToLcha(rgba2);
		let deltaHue = lcha2[2] - lcha1[2];
		if (deltaHue > 180) deltaHue -= 360;
		else if (deltaHue < -180) deltaHue += 360;
		return lchaToRgba([
			interpolateNumber(base, value, input1, lcha1[0], input2, lcha2[0]),
			interpolateNumber(base, value, input1, lcha1[1], input2, lcha2[1]),
			lcha1[2] + interpolateNumber(base, value, input1, 0, input2, deltaHue),
			interpolateNumber(base, value, input1, rgba1[3], input2, rgba2[3])
		]);
	}
	//#endregion
	//#region src/ol/ImageState.js
	/**
	* @module ol/ImageState
	*/
	/**
	* @enum {number}
	*/
	var ImageState_default = {
		IDLE: 0,
		LOADING: 1,
		LOADED: 2,
		ERROR: 3,
		EMPTY: 4
	};
	//#endregion
	//#region src/ol/Image.js
	/**
	* @param {import('./DataTile.js').ImageLike} image Image element.
	* @param {function():any} loadHandler Load callback function.
	* @param {function():any} errorHandler Error callback function.
	* @return {function():void} Callback to stop listening.
	*/
	function listenImage(image, loadHandler, errorHandler) {
		const img = image;
		let listening = true;
		let decoding = false;
		let loaded = false;
		const listenerKeys = [listenOnce(img, EventType_default$2.LOAD, function() {
			loaded = true;
			if (!decoding) loadHandler();
		})];
		if (img.src && IMAGE_DECODE) {
			decoding = true;
			img.decode().then(function() {
				if (listening) loadHandler();
			}).catch(function(error) {
				if (listening) if (loaded) loadHandler();
				else errorHandler();
			});
		} else listenerKeys.push(listenOnce(img, EventType_default$2.ERROR, errorHandler));
		return function unlisten() {
			listening = false;
			listenerKeys.forEach(unlistenByKey);
		};
	}
	/**
	* Loads an image.
	* @param {HTMLImageElement} image Image, not yet loaded.
	* @param {string} [src] `src` attribute of the image. Optional, not required if already present.
	* @return {Promise<HTMLImageElement>} Promise resolving to an `HTMLImageElement`.
	* @api
	*/
	function load(image, src) {
		return new Promise((resolve, reject) => {
			function handleLoad() {
				unlisten();
				resolve(image);
			}
			function handleError() {
				unlisten();
				reject(/* @__PURE__ */ new Error("Image load error"));
			}
			function unlisten() {
				image.removeEventListener("load", handleLoad);
				image.removeEventListener("error", handleError);
			}
			image.addEventListener("load", handleLoad);
			image.addEventListener("error", handleError);
			if (src) image.src = src;
		});
	}
	/**
	* @param {HTMLImageElement} image Image, not yet loaded.
	* @param {string} [src] `src` attribute of the image. Optional, not required if already present.
	* @return {Promise<HTMLImageElement>} Promise resolving to an `HTMLImageElement`.
	*/
	function decodeFallback(image, src) {
		if (src) image.src = src;
		return image.src && IMAGE_DECODE ? new Promise((resolve, reject) => image.decode().then(() => resolve(image)).catch((e) => image.complete && image.width ? resolve(image) : reject(e))) : load(image);
	}
	//#endregion
	//#region src/ol/style/IconImageCache.js
	/**
	* @module ol/style/IconImageCache
	*/
	/**
	* @classdesc
	* Singleton class. Available through {@link module:ol/style/IconImageCache.shared}.
	*/
	var IconImageCache = class {
		constructor() {
			/**
			* @type {!Object<string, import("./IconImage.js").default>}
			* @private
			*/
			this.cache_ = {};
			/**
			* @type {!Object<string, CanvasPattern>}
			* @private
			*/
			this.patternCache_ = {};
			/**
			* @type {number}
			* @private
			*/
			this.cacheSize_ = 0;
			/**
			* @type {number}
			* @private
			*/
			this.maxCacheSize_ = 1024;
		}
		/**
		* FIXME empty description for jsdoc
		*/
		clear() {
			this.cache_ = {};
			this.patternCache_ = {};
			this.cacheSize_ = 0;
		}
		/**
		* @return {boolean} Can expire cache.
		*/
		canExpireCache() {
			return this.cacheSize_ > this.maxCacheSize_;
		}
		/**
		* FIXME empty description for jsdoc
		*/
		expire() {
			if (this.canExpireCache()) {
				let i = 0;
				for (const key in this.cache_) {
					const iconImage = this.cache_[key];
					if ((i++ & 3) === 0 && !iconImage.hasListener()) {
						delete this.cache_[key];
						delete this.patternCache_[key];
						--this.cacheSize_;
					}
				}
			}
		}
		/**
		* @param {string} src Src.
		* @param {import("../color.js").Color|string|null} color Color.
		* @return {import("./IconImage.js").default} Icon image.
		*/
		get(src, color) {
			const key = getCacheKey$1(src, color);
			return key in this.cache_ ? this.cache_[key] : null;
		}
		/**
		* @param {string} src Src.
		* @param {import("../color.js").Color|string|null} color Color.
		* @return {CanvasPattern} Icon image.
		*/
		getPattern(src, color) {
			const key = getCacheKey$1(src, color);
			return key in this.patternCache_ ? this.patternCache_[key] : null;
		}
		/**
		* @param {string} src Src.
		* @param {import("../color.js").Color|string|null} color Color.
		* @param {import("./IconImage.js").default|null} iconImage Icon image.
		* @param {boolean} [pattern] Also cache a `'repeat'` pattern with this `iconImage`.
		*/
		set(src, color, iconImage, pattern) {
			const key = getCacheKey$1(src, color);
			const update = key in this.cache_;
			this.cache_[key] = iconImage;
			if (pattern) {
				if (iconImage.getImageState() === ImageState_default.IDLE) iconImage.load();
				if (iconImage.getImageState() === ImageState_default.LOADING) iconImage.ready().then(() => {
					this.patternCache_[key] = getSharedCanvasContext2D().createPattern(iconImage.getImage(1), "repeat");
				});
				else this.patternCache_[key] = getSharedCanvasContext2D().createPattern(iconImage.getImage(1), "repeat");
			}
			if (!update) ++this.cacheSize_;
		}
		/**
		* Set the cache size of the icon cache. Default is `1024`. Change this value when
		* your map uses more than 1024 different icon images and you are not caching icon
		* styles on the application level.
		* @param {number} maxCacheSize Cache max size.
		* @api
		*/
		setSize(maxCacheSize) {
			this.maxCacheSize_ = maxCacheSize;
			this.expire();
		}
	};
	/**
	* @param {string} src Src.
	* @param {import("../color.js").Color|string|null} color Color.
	* @return {string} Cache key.
	*/
	function getCacheKey$1(src, color) {
		const colorString = color ? asArray(color) : "null";
		return src + ":" + colorString;
	}
	/**
	* The {@link module:ol/style/IconImageCache~IconImageCache} for
	* {@link module:ol/style/Icon~Icon} images.
	* @api
	*/
	const shared = new IconImageCache();
	//#endregion
	//#region src/ol/style/IconImage.js
	/**
	* @module ol/style/IconImage
	*/
	/**
	* @type {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D}
	*/
	let taintedTestContext = null;
	var IconImage = class extends Target {
		/**
		* @param {HTMLImageElement|HTMLCanvasElement|OffscreenCanvas|ImageBitmap|null} image Image.
		* @param {string|undefined} src Src.
		* @param {import('../dom.js').ImageAttributes} imageAttributes Image attributes options.
		* @param {import("../ImageState.js").default|undefined} imageState Image state.
		* @param {import("../color.js").Color|string|null} color Color.
		*/
		constructor(image, src, imageAttributes, imageState, color) {
			super();
			/**
			* @private
			* @type {HTMLImageElement|OffscreenCanvas|HTMLCanvasElement|ImageBitmap}
			*/
			this.hitDetectionImage_ = null;
			/**
			* @private
			* @type {HTMLImageElement|HTMLCanvasElement|OffscreenCanvas|ImageBitmap|null}
			*/
			this.image_ = image;
			/**
			* @private
			* @type {string|null}
			*/
			this.crossOrigin_ = imageAttributes?.crossOrigin;
			/**
			* @private
			* @type {ReferrerPolicy}
			*/
			this.referrerPolicy_ = imageAttributes?.referrerPolicy;
			/**
			* @private
			* @type {Object<number, HTMLCanvasElement|OffscreenCanvas>}
			*/
			this.canvas_ = {};
			/**
			* @private
			* @type {import("../color.js").Color|string|null}
			*/
			this.color_ = color;
			/**
			* @private
			* @type {import("../ImageState.js").default}
			*/
			this.imageState_ = imageState === void 0 ? ImageState_default.IDLE : imageState;
			/**
			* @private
			* @type {import("../size.js").Size|null}
			*/
			this.size_ = image && image.width && image.height ? [image.width, image.height] : null;
			/**
			* @private
			* @type {string|undefined}
			*/
			this.src_ = src;
			/**
			* @private
			*/
			this.tainted_;
			/**
			* @private
			* @type {Promise<void>|null}
			*/
			this.ready_ = null;
		}
		/**
		* @private
		*/
		initializeImage_() {
			this.image_ = new Image();
			if (this.crossOrigin_ !== null) this.image_.crossOrigin = this.crossOrigin_;
			if (this.referrerPolicy_ !== void 0) this.image_.referrerPolicy = this.referrerPolicy_;
		}
		/**
		* @private
		* @return {boolean} The image canvas is tainted.
		*/
		isTainted_() {
			if (this.tainted_ === void 0 && this.imageState_ === ImageState_default.LOADED) {
				if (!taintedTestContext) taintedTestContext = createCanvasContext2D(1, 1, void 0, { willReadFrequently: true });
				taintedTestContext.drawImage(this.image_, 0, 0);
				try {
					taintedTestContext.getImageData(0, 0, 1, 1);
					this.tainted_ = false;
				} catch {
					taintedTestContext = null;
					this.tainted_ = true;
				}
			}
			return this.tainted_ === true;
		}
		/**
		* @private
		*/
		dispatchChangeEvent_() {
			this.dispatchEvent(EventType_default$2.CHANGE);
		}
		/**
		* @private
		*/
		handleImageError_() {
			this.imageState_ = ImageState_default.ERROR;
			this.dispatchChangeEvent_();
		}
		/**
		* @private
		*/
		handleImageLoad_() {
			this.imageState_ = ImageState_default.LOADED;
			this.size_ = [this.image_.width, this.image_.height];
			this.dispatchChangeEvent_();
		}
		/**
		* @param {number} pixelRatio Pixel ratio.
		* @return {HTMLImageElement|HTMLCanvasElement|OffscreenCanvas|ImageBitmap} Image or Canvas element or image bitmap.
		*/
		getImage(pixelRatio) {
			if (!this.image_) this.initializeImage_();
			this.replaceColor_(pixelRatio);
			return this.canvas_[pixelRatio] ? this.canvas_[pixelRatio] : this.image_;
		}
		/**
		* @param {HTMLImageElement|HTMLCanvasElement|OffscreenCanvas|ImageBitmap} image Image.
		*/
		setImage(image) {
			this.image_ = image;
		}
		/**
		* @param {number} pixelRatio Pixel ratio.
		* @return {number} Image or Canvas element.
		*/
		getPixelRatio(pixelRatio) {
			this.replaceColor_(pixelRatio);
			return this.canvas_[pixelRatio] ? pixelRatio : 1;
		}
		/**
		* @return {import("../ImageState.js").default} Image state.
		*/
		getImageState() {
			return this.imageState_;
		}
		/**
		* @return {HTMLImageElement|HTMLCanvasElement|OffscreenCanvas|ImageBitmap} Image element.
		*/
		getHitDetectionImage() {
			if (!this.image_) this.initializeImage_();
			if (!this.hitDetectionImage_) if (this.isTainted_()) {
				const width = this.size_[0];
				const height = this.size_[1];
				const context = createCanvasContext2D(width, height);
				context.fillRect(0, 0, width, height);
				this.hitDetectionImage_ = context.canvas;
			} else this.hitDetectionImage_ = this.image_;
			return this.hitDetectionImage_;
		}
		/**
		* Get the size of the icon (in pixels).
		* @return {import("../size.js").Size} Image size.
		*/
		getSize() {
			return this.size_;
		}
		/**
		* @return {string|undefined} Image src.
		*/
		getSrc() {
			return this.src_;
		}
		/**
		* Load not yet loaded URI.
		*/
		load() {
			if (this.imageState_ !== ImageState_default.IDLE) return;
			if (!this.image_) this.initializeImage_();
			this.imageState_ = ImageState_default.LOADING;
			try {
				if (this.src_ !== void 0)
 /** @type {HTMLImageElement} */ this.image_.src = this.src_;
			} catch {
				this.handleImageError_();
			}
			if (this.image_ instanceof HTMLImageElement) decodeFallback(this.image_, this.src_).then((image) => {
				this.image_ = image;
				this.handleImageLoad_();
			}).catch(this.handleImageError_.bind(this));
		}
		/**
		* @param {number} pixelRatio Pixel ratio.
		* @private
		*/
		replaceColor_(pixelRatio) {
			if (!this.color_ || this.canvas_[pixelRatio] || this.imageState_ !== ImageState_default.LOADED) return;
			const image = this.image_;
			const ctx = createCanvasContext2D(Math.ceil(image.width * pixelRatio), Math.ceil(image.height * pixelRatio));
			const canvas = ctx.canvas;
			ctx.scale(pixelRatio, pixelRatio);
			ctx.drawImage(image, 0, 0);
			ctx.globalCompositeOperation = "multiply";
			ctx.fillStyle = asString(this.color_);
			ctx.fillRect(0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio);
			ctx.globalCompositeOperation = "destination-in";
			ctx.drawImage(image, 0, 0);
			this.canvas_[pixelRatio] = canvas;
		}
		/**
		* @return {Promise<void>} Promise that resolves when the image is loaded.
		*/
		ready() {
			if (!this.ready_) this.ready_ = new Promise((resolve) => {
				if (this.imageState_ === ImageState_default.LOADED || this.imageState_ === ImageState_default.ERROR) resolve();
				else {
					const onChange = () => {
						if (this.imageState_ === ImageState_default.LOADED || this.imageState_ === ImageState_default.ERROR) {
							this.removeEventListener(EventType_default$2.CHANGE, onChange);
							resolve();
						}
					};
					this.addEventListener(EventType_default$2.CHANGE, onChange);
				}
			});
			return this.ready_;
		}
	};
	/**
	* @param {HTMLImageElement|HTMLCanvasElement|OffscreenCanvas|ImageBitmap|null} image Image.
	* @param {string|undefined} src Src.
	* @param {import('../dom.js').ImageAttributes} imageAttributes Image attributes options.
	* @param {import("../ImageState.js").default|undefined} imageState Image state.
	* @param {import("../color.js").Color|string|null} color Color.
	* @param {boolean} [pattern] Also cache a `repeat` pattern with the icon image.
	* @return {IconImage} Icon image.
	*/
	function get(image, src, imageAttributes, imageState, color, pattern) {
		let iconImage = src === void 0 ? void 0 : shared.get(src, color);
		if (!iconImage) {
			iconImage = new IconImage(image, image && "src" in image ? image.src || void 0 : src, imageAttributes, imageState, color);
			shared.set(src, color, iconImage, pattern);
		}
		if (pattern && iconImage && !shared.getPattern(src, color)) shared.set(src, color, iconImage, pattern);
		return iconImage;
	}
	//#endregion
	//#region src/ol/colorlike.js
	/**
	* @module ol/colorlike
	*/
	/**
	* @typedef {Object} PatternDescriptor
	* @property {string} src Pattern image URL
	* @property {import("./color.js").Color|string} [color] Color to tint the pattern with.
	* @property {import("./size.js").Size} [size] Size of the desired slice from the pattern image.
	* Use this together with `offset` when the pattern image is a sprite sheet.
	* @property {import("./size.js").Size} [offset] Offset of the desired slice from the pattern image.
	* Use this together with `size` when the pattern image is a sprite sheet.
	*/
	/**
	* A type accepted by CanvasRenderingContext2D.fillStyle
	* or CanvasRenderingContext2D.strokeStyle.
	* Represents a color, [CanvasPattern](https://developer.mozilla.org/en-US/docs/Web/API/CanvasPattern),
	* or [CanvasGradient](https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient). The origin for
	* patterns and gradients as fill style is an increment of 512 css pixels from map coordinate
	* `[0, 0]`. For seamless repeat patterns, width and height of the pattern image
	* must be a factor of two (2, 4, 8, ..., 512).
	*
	* @typedef {string|CanvasPattern|CanvasGradient} ColorLike
	* @api
	*/
	/**
	* @param {import("./color.js").Color|ColorLike|PatternDescriptor|null} color Color.
	* @return {ColorLike|null} The color as an {@link ol/colorlike~ColorLike}.
	* @api
	*/
	function asColorLike(color) {
		if (!color) return null;
		if (Array.isArray(color)) return toString(color);
		if (typeof color === "object" && "src" in color) return asCanvasPattern(color);
		return color;
	}
	/**
	* @param {PatternDescriptor} pattern Pattern descriptor.
	* @return {CanvasPattern|null} Canvas pattern or null if the pattern referenced in the
	* PatternDescriptor was not found in the icon image cache.
	*/
	function asCanvasPattern(pattern) {
		if (!pattern.offset || !pattern.size) return shared.getPattern(pattern.src, pattern.color);
		const cacheKey = pattern.src + ":" + pattern.offset;
		const canvasPattern = shared.getPattern(cacheKey, pattern.color);
		if (canvasPattern) return canvasPattern;
		const iconImage = shared.get(pattern.src, null);
		if (iconImage.getImageState() !== ImageState_default.LOADED) return null;
		const patternCanvasContext = createCanvasContext2D(pattern.size[0], pattern.size[1]);
		patternCanvasContext.drawImage(iconImage.getImage(1), pattern.offset[0], pattern.offset[1], pattern.size[0], pattern.size[1], 0, 0, pattern.size[0], pattern.size[1]);
		get(patternCanvasContext.canvas, cacheKey, void 0, ImageState_default.LOADED, pattern.color, true);
		return shared.getPattern(cacheKey, pattern.color);
	}
	//#endregion
	//#region src/ol/render/canvas.js
	/**
	* @module ol/render/canvas
	*/
	/**
	* @const
	* @type {string}
	*/
	const defaultFillStyle = "#000";
	/**
	* @const
	* @type {CanvasLineCap}
	*/
	const defaultLineCap = "round";
	/**
	* @const
	* @type {CanvasLineJoin}
	*/
	const defaultLineJoin = "round";
	/**
	* @type {BaseObject}
	*/
	const checkedFonts = new BaseObject();
	//#endregion
	//#region src/ol/style/Image.js
	/**
	* @module ol/style/Image
	*/
	/**
	* @typedef {Object} Options
	* @property {number} opacity Opacity.
	* @property {boolean} rotateWithView If the image should get rotated with the view.
	* @property {number} rotation Rotation.
	* @property {number|import("../size.js").Size} scale Scale.
	* @property {Array<number>} displacement Displacement.
	* @property {import('../style/Style.js').DeclutterMode} declutterMode Declutter mode: `declutter`, `obstacle`, `none`.
	*/
	/**
	* @classdesc
	* A base class used for creating subclasses and not instantiated in
	* apps. Base class for {@link module:ol/style/Icon~Icon}, {@link module:ol/style/Circle~CircleStyle} and
	* {@link module:ol/style/RegularShape~RegularShape}.
	* @abstract
	* @api
	*/
	var ImageStyle = class ImageStyle {
		/**
		* @param {Options} options Options.
		*/
		constructor(options) {
			/**
			* @private
			* @type {number}
			*/
			this.opacity_ = options.opacity;
			/**
			* @private
			* @type {boolean}
			*/
			this.rotateWithView_ = options.rotateWithView;
			/**
			* @private
			* @type {number}
			*/
			this.rotation_ = options.rotation;
			/**
			* @private
			* @type {number|import("../size.js").Size}
			*/
			this.scale_ = options.scale;
			/**
			* @private
			* @type {import("../size.js").Size}
			*/
			this.scaleArray_ = toSize(options.scale);
			/**
			* @private
			* @type {Array<number>}
			*/
			this.displacement_ = options.displacement;
			/**
			* @private
			* @type {import('../style/Style.js').DeclutterMode}
			*/
			this.declutterMode_ = options.declutterMode;
		}
		/**
		* Clones the style.
		* @return {ImageStyle} The cloned style.
		* @api
		*/
		clone() {
			const scale = this.getScale();
			return new ImageStyle({
				opacity: this.getOpacity(),
				scale: Array.isArray(scale) ? scale.slice() : scale,
				rotation: this.getRotation(),
				rotateWithView: this.getRotateWithView(),
				displacement: this.getDisplacement().slice(),
				declutterMode: this.getDeclutterMode()
			});
		}
		/**
		* Get the symbolizer opacity.
		* @return {number} Opacity.
		* @api
		*/
		getOpacity() {
			return this.opacity_;
		}
		/**
		* Determine whether the symbolizer rotates with the map.
		* @return {boolean} Rotate with map.
		* @api
		*/
		getRotateWithView() {
			return this.rotateWithView_;
		}
		/**
		* Get the symoblizer rotation.
		* @return {number} Rotation.
		* @api
		*/
		getRotation() {
			return this.rotation_;
		}
		/**
		* Get the symbolizer scale.
		* @return {number|import("../size.js").Size} Scale.
		* @api
		*/
		getScale() {
			return this.scale_;
		}
		/**
		* Get the symbolizer scale array.
		* @return {import("../size.js").Size} Scale array.
		*/
		getScaleArray() {
			return this.scaleArray_;
		}
		/**
		* Get the displacement of the shape
		* @return {Array<number>} Shape's center displacement
		* @api
		*/
		getDisplacement() {
			return this.displacement_;
		}
		/**
		* Get the declutter mode of the shape
		* @return {import("./Style.js").DeclutterMode} Shape's declutter mode
		* @api
		*/
		getDeclutterMode() {
			return this.declutterMode_;
		}
		/**
		* Get the anchor point in pixels. The anchor determines the center point for the
		* symbolizer.
		* @abstract
		* @return {Array<number>} Anchor.
		*/
		getAnchor() {
			return abstract();
		}
		/**
		* Get the image element for the symbolizer.
		* @abstract
		* @param {number} pixelRatio Pixel ratio.
		* @return {import('../DataTile.js').ImageLike} Image element.
		*/
		getImage(pixelRatio) {
			return abstract();
		}
		/**
		* @abstract
		* @return {import('../DataTile.js').ImageLike} Image element.
		*/
		getHitDetectionImage() {
			return abstract();
		}
		/**
		* Get the image pixel ratio.
		* @param {number} pixelRatio Pixel ratio.
		* @return {number} Pixel ratio.
		*/
		getPixelRatio(pixelRatio) {
			return 1;
		}
		/**
		* @abstract
		* @return {import("../ImageState.js").default} Image state.
		*/
		getImageState() {
			return abstract();
		}
		/**
		* @abstract
		* @return {import("../size.js").Size} Image size.
		*/
		getImageSize() {
			return abstract();
		}
		/**
		* Get the origin of the symbolizer.
		* @abstract
		* @return {Array<number>} Origin.
		*/
		getOrigin() {
			return abstract();
		}
		/**
		* Get the size of the symbolizer (in pixels).
		* @abstract
		* @return {import("../size.js").Size} Size.
		*/
		getSize() {
			return abstract();
		}
		/**
		* Set the displacement.
		*
		* @param {Array<number>} displacement Displacement.
		* @api
		*/
		setDisplacement(displacement) {
			this.displacement_ = displacement;
		}
		/**
		* Set the opacity.
		*
		* @param {number} opacity Opacity.
		* @api
		*/
		setOpacity(opacity) {
			this.opacity_ = opacity;
		}
		/**
		* Set whether to rotate the style with the view.
		*
		* @param {boolean} rotateWithView Rotate with map.
		* @api
		*/
		setRotateWithView(rotateWithView) {
			this.rotateWithView_ = rotateWithView;
		}
		/**
		* Set the rotation.
		*
		* @param {number} rotation Rotation.
		* @api
		*/
		setRotation(rotation) {
			this.rotation_ = rotation;
		}
		/**
		* Set the scale.
		*
		* @param {number|import("../size.js").Size} scale Scale.
		* @api
		*/
		setScale(scale) {
			this.scale_ = scale;
			this.scaleArray_ = toSize(scale);
		}
		/**
		* @abstract
		* @param {function(import("../events/Event.js").default): void} listener Listener function.
		*/
		listenImageChange(listener) {
			abstract();
		}
		/**
		* Load not yet loaded URI.
		* @abstract
		*/
		load() {
			abstract();
		}
		/**
		* @abstract
		* @param {function(import("../events/Event.js").default): void} listener Listener function.
		*/
		unlistenImageChange(listener) {
			abstract();
		}
		/**
		* @return {Promise<void>} `false` or Promise that resolves when the style is ready to use.
		*/
		ready() {
			return Promise.resolve();
		}
	};
	//#endregion
	//#region src/ol/style/RegularShape.js
	/**
	* @module ol/style/RegularShape
	*/
	/**
	* Specify radius for regular polygons, or both radius and radius2 for stars.
	* @typedef {Object} Options
	* @property {import("./Fill.js").default} [fill] Fill style.
	* @property {number} points Number of points for stars and regular polygons. In case of a polygon, the number of points
	* is the number of sides.
	* @property {number} radius Radius of a regular polygon.
	* @property {number} [radius2] Second radius to make a star instead of a regular polygon.
	* @property {number} [angle=0] Shape's angle in radians. A value of 0 will have one of the shape's points facing up.
	* @property {Array<number>} [displacement=[0, 0]] Displacement of the shape in pixels.
	* Positive values will shift the shape right and up.
	* @property {import("./Stroke.js").default} [stroke] Stroke style.
	* @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
	* @property {boolean} [rotateWithView=false] Whether to rotate the shape with the view.
	* @property {number|import("../size.js").Size} [scale=1] Scale. Unless two dimensional scaling is required a better
	* result may be obtained with appropriate settings for `radius` and `radius2`.
	* @property {import('./Style.js').DeclutterMode} [declutterMode] Declutter mode.
	*/
	/**
	* @typedef {Object} RenderOptions
	* @property {import("../colorlike.js").ColorLike|undefined} strokeStyle StrokeStyle.
	* @property {number} strokeWidth StrokeWidth.
	* @property {number} size Size.
	* @property {CanvasLineCap} lineCap LineCap.
	* @property {Array<number>|null} lineDash LineDash.
	* @property {number} lineDashOffset LineDashOffset.
	* @property {CanvasLineJoin} lineJoin LineJoin.
	* @property {number} miterLimit MiterLimit.
	*/
	/**
	* @classdesc
	* Set regular shape style for vector features. The resulting shape will be
	* a regular polygon when `radius` is provided, or a star when both `radius` and
	* `radius2` are provided.
	* @api
	*/
	var RegularShape = class RegularShape extends ImageStyle {
		/**
		* @param {Options} options Options.
		*/
		constructor(options) {
			super({
				opacity: 1,
				rotateWithView: options.rotateWithView !== void 0 ? options.rotateWithView : false,
				rotation: options.rotation !== void 0 ? options.rotation : 0,
				scale: options.scale !== void 0 ? options.scale : 1,
				displacement: options.displacement !== void 0 ? options.displacement : [0, 0],
				declutterMode: options.declutterMode
			});
			/**
			* @private
			* @type {HTMLCanvasElement|OffscreenCanvas|null}
			*/
			this.hitDetectionCanvas_ = null;
			/**
			* @private
			* @type {import("./Fill.js").default|null}
			*/
			this.fill_ = options.fill !== void 0 ? options.fill : null;
			/**
			* @private
			* @type {Array<number>}
			*/
			this.origin_ = [0, 0];
			/**
			* @private
			* @type {number}
			*/
			this.points_ = options.points;
			/**
			* @protected
			* @type {number}
			*/
			this.radius = options.radius;
			/**
			* @private
			* @type {number|undefined}
			*/
			this.radius2_ = options.radius2;
			/**
			* @private
			* @type {number}
			*/
			this.angle_ = options.angle !== void 0 ? options.angle : 0;
			/**
			* @private
			* @type {import("./Stroke.js").default|null}
			*/
			this.stroke_ = options.stroke !== void 0 ? options.stroke : null;
			/**
			* @private
			* @type {import("../size.js").Size}
			*/
			this.size_;
			/**
			* @private
			* @type {RenderOptions}
			*/
			this.renderOptions_;
			/**
			* @private
			*/
			this.imageState_ = this.fill_ && this.fill_.loading() ? ImageState_default.LOADING : ImageState_default.LOADED;
			if (this.imageState_ === ImageState_default.LOADING) this.ready().then(() => this.imageState_ = ImageState_default.LOADED);
			this.render();
		}
		/**
		* Clones the style.
		* @return {RegularShape} The cloned style.
		* @api
		* @override
		*/
		clone() {
			const scale = this.getScale();
			const style = new RegularShape({
				fill: this.getFill() ? this.getFill().clone() : void 0,
				points: this.getPoints(),
				radius: this.getRadius(),
				radius2: this.getRadius2(),
				angle: this.getAngle(),
				stroke: this.getStroke() ? this.getStroke().clone() : void 0,
				rotation: this.getRotation(),
				rotateWithView: this.getRotateWithView(),
				scale: Array.isArray(scale) ? scale.slice() : scale,
				displacement: this.getDisplacement().slice(),
				declutterMode: this.getDeclutterMode()
			});
			style.setOpacity(this.getOpacity());
			return style;
		}
		/**
		* Get the anchor point in pixels. The anchor determines the center point for the
		* symbolizer.
		* @return {Array<number>} Anchor.
		* @api
		* @override
		*/
		getAnchor() {
			const size = this.size_;
			const displacement = this.getDisplacement();
			const scale = this.getScaleArray();
			return [size[0] / 2 - displacement[0] / scale[0], size[1] / 2 + displacement[1] / scale[1]];
		}
		/**
		* Get the angle used in generating the shape.
		* @return {number} Shape's rotation in radians.
		* @api
		*/
		getAngle() {
			return this.angle_;
		}
		/**
		* Get the fill style for the shape.
		* @return {import("./Fill.js").default|null} Fill style.
		* @api
		*/
		getFill() {
			return this.fill_;
		}
		/**
		* Set the fill style.
		* @param {import("./Fill.js").default|null} fill Fill style.
		* @api
		*/
		setFill(fill) {
			this.fill_ = fill;
			this.render();
		}
		/**
		* @return {HTMLCanvasElement|OffscreenCanvas} Image element.
		* @override
		*/
		getHitDetectionImage() {
			if (!this.hitDetectionCanvas_) this.hitDetectionCanvas_ = this.createHitDetectionCanvas_(this.renderOptions_);
			return this.hitDetectionCanvas_;
		}
		/**
		* Get the image icon.
		* @param {number} pixelRatio Pixel ratio.
		* @return {HTMLCanvasElement|OffscreenCanvas} Image or Canvas element.
		* @api
		* @override
		*/
		getImage(pixelRatio) {
			const fillKey = this.fill_?.getKey();
			const cacheKey = `${pixelRatio},${this.angle_},${this.radius},${this.radius2_},${this.points_},${fillKey}` + Object.values(this.renderOptions_).join(",");
			let image = shared.get(cacheKey, null)?.getImage(1);
			if (!image) {
				const renderOptions = this.renderOptions_;
				const size = Math.ceil(renderOptions.size * pixelRatio);
				const context = createCanvasContext2D(size, size);
				this.draw_(renderOptions, context, pixelRatio);
				image = context.canvas;
				const iconImage = new IconImage(image, void 0, null, ImageState_default.LOADED, null);
				shared.set(cacheKey, null, iconImage);
				createImageBitmap(image).then((imageBitmap) => {
					iconImage.setImage(imageBitmap);
				});
			}
			return image;
		}
		/**
		* Get the image pixel ratio.
		* @param {number} pixelRatio Pixel ratio.
		* @return {number} Pixel ratio.
		* @override
		*/
		getPixelRatio(pixelRatio) {
			return pixelRatio;
		}
		/**
		* @return {import("../size.js").Size} Image size.
		* @override
		*/
		getImageSize() {
			return this.size_;
		}
		/**
		* @return {import("../ImageState.js").default} Image state.
		* @override
		*/
		getImageState() {
			return this.imageState_;
		}
		/**
		* Get the origin of the symbolizer.
		* @return {Array<number>} Origin.
		* @api
		* @override
		*/
		getOrigin() {
			return this.origin_;
		}
		/**
		* Get the number of points for generating the shape.
		* @return {number} Number of points for stars and regular polygons.
		* @api
		*/
		getPoints() {
			return this.points_;
		}
		/**
		* Get the (primary) radius for the shape.
		* @return {number} Radius.
		* @api
		*/
		getRadius() {
			return this.radius;
		}
		/**
		* Set the (primary) radius for the shape.
		* @param {number} radius Radius.
		* @api
		*/
		setRadius(radius) {
			if (this.radius === radius) return;
			this.radius = radius;
			this.render();
		}
		/**
		* Get the secondary radius for the shape.
		* @return {number|undefined} Radius2.
		* @api
		*/
		getRadius2() {
			return this.radius2_;
		}
		/**
		* Set the secondary radius for the shape.
		* @param {number|undefined} radius2 Radius2.
		* @api
		*/
		setRadius2(radius2) {
			if (this.radius2_ === radius2) return;
			this.radius2_ = radius2;
			this.render();
		}
		/**
		* Get the size of the symbolizer (in pixels).
		* @return {import("../size.js").Size} Size.
		* @api
		* @override
		*/
		getSize() {
			return this.size_;
		}
		/**
		* Get the stroke style for the shape.
		* @return {import("./Stroke.js").default|null} Stroke style.
		* @api
		*/
		getStroke() {
			return this.stroke_;
		}
		/**
		* Set the stroke style.
		* @param {import("./Stroke.js").default|null} stroke Stroke style.
		* @api
		*/
		setStroke(stroke) {
			this.stroke_ = stroke;
			this.render();
		}
		/**
		* @param {function(import("../events/Event.js").default): void} listener Listener function.
		* @override
		*/
		listenImageChange(listener) {}
		/**
		* Load not yet loaded URI.
		* @override
		*/
		load() {}
		/**
		* @param {function(import("../events/Event.js").default): void} listener Listener function.
		* @override
		*/
		unlistenImageChange(listener) {}
		/**
		* Calculate additional canvas size needed for the miter.
		* @param {string} lineJoin Line join
		* @param {number} strokeWidth Stroke width
		* @param {number} miterLimit Miter limit
		* @return {number} Additional canvas size needed
		* @private
		*/
		calculateLineJoinSize_(lineJoin, strokeWidth, miterLimit) {
			if (strokeWidth === 0 || this.points_ === Infinity || lineJoin !== "bevel" && lineJoin !== "miter") return strokeWidth;
			let r1 = this.radius;
			let r2 = this.radius2_ === void 0 ? r1 : this.radius2_;
			if (r1 < r2) {
				const tmp = r1;
				r1 = r2;
				r2 = tmp;
			}
			const points = this.radius2_ === void 0 ? this.points_ : this.points_ * 2;
			const alpha = 2 * Math.PI / points;
			const a = r2 * Math.sin(alpha);
			const b = Math.sqrt(r2 * r2 - a * a);
			const d = r1 - b;
			const e = Math.sqrt(a * a + d * d);
			const miterRatio = e / a;
			if (lineJoin === "miter" && miterRatio <= miterLimit) return miterRatio * strokeWidth;
			const k = strokeWidth / 2 / miterRatio;
			const l = strokeWidth / 2 * (d / e);
			const bevelAdd = Math.sqrt((r1 + k) * (r1 + k) + l * l) - r1;
			if (this.radius2_ === void 0 || lineJoin === "bevel") return bevelAdd * 2;
			const aa = r1 * Math.sin(alpha);
			const bb = Math.sqrt(r1 * r1 - aa * aa);
			const dd = r2 - bb;
			const innerMiterRatio = Math.sqrt(aa * aa + dd * dd) / aa;
			if (innerMiterRatio <= miterLimit) {
				const innerLength = innerMiterRatio * strokeWidth / 2 - r2 - r1;
				return 2 * Math.max(bevelAdd, innerLength);
			}
			return bevelAdd * 2;
		}
		/**
		* @return {RenderOptions}  The render options
		* @protected
		*/
		createRenderOptions() {
			let lineCap = defaultLineCap;
			let lineJoin = defaultLineJoin;
			let miterLimit = 0;
			let lineDash = null;
			let lineDashOffset = 0;
			let strokeStyle;
			let strokeWidth = 0;
			if (this.stroke_) {
				strokeStyle = asColorLike(this.stroke_.getColor() ?? "#000");
				strokeWidth = this.stroke_.getWidth() ?? 1;
				lineDash = this.stroke_.getLineDash();
				lineDashOffset = this.stroke_.getLineDashOffset() ?? 0;
				lineJoin = this.stroke_.getLineJoin() ?? "round";
				lineCap = this.stroke_.getLineCap() ?? "round";
				miterLimit = this.stroke_.getMiterLimit() ?? 10;
			}
			const add = this.calculateLineJoinSize_(lineJoin, strokeWidth, miterLimit);
			const maxRadius = Math.max(this.radius, this.radius2_ || 0);
			const size = Math.ceil(2 * maxRadius + add);
			return {
				strokeStyle,
				strokeWidth,
				size,
				lineCap,
				lineDash,
				lineDashOffset,
				lineJoin,
				miterLimit
			};
		}
		/**
		* @protected
		*/
		render() {
			this.renderOptions_ = this.createRenderOptions();
			const size = this.renderOptions_.size;
			this.hitDetectionCanvas_ = null;
			this.size_ = [size, size];
		}
		/**
		* @private
		* @param {RenderOptions} renderOptions Render options.
		* @param {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} context The rendering context.
		* @param {number} pixelRatio The pixel ratio.
		*/
		draw_(renderOptions, context, pixelRatio) {
			context.scale(pixelRatio, pixelRatio);
			context.translate(renderOptions.size / 2, renderOptions.size / 2);
			this.createPath_(context);
			if (this.fill_) {
				let color = this.fill_.getColor();
				if (color === null) color = defaultFillStyle;
				context.fillStyle = asColorLike(color);
				context.fill();
			}
			if (renderOptions.strokeStyle) {
				context.strokeStyle = renderOptions.strokeStyle;
				context.lineWidth = renderOptions.strokeWidth;
				if (renderOptions.lineDash) {
					context.setLineDash(renderOptions.lineDash);
					context.lineDashOffset = renderOptions.lineDashOffset;
				}
				context.lineCap = renderOptions.lineCap;
				context.lineJoin = renderOptions.lineJoin;
				context.miterLimit = renderOptions.miterLimit;
				context.stroke();
			}
		}
		/**
		* @private
		* @param {RenderOptions} renderOptions Render options.
		* @return {HTMLCanvasElement|OffscreenCanvas} Canvas containing the icon
		*/
		createHitDetectionCanvas_(renderOptions) {
			let context;
			if (this.fill_) {
				let color = this.fill_.getColor();
				let opacity = 0;
				if (typeof color === "string") color = asArray(color);
				if (color === null) opacity = 1;
				else if (Array.isArray(color)) opacity = color.length === 4 ? color[3] : 1;
				if (opacity === 0) {
					context = createCanvasContext2D(renderOptions.size, renderOptions.size);
					this.drawHitDetectionCanvas_(renderOptions, context);
				}
			}
			return context ? context.canvas : this.getImage(1);
		}
		/**
		* @private
		* @param {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} context The context to draw in.
		*/
		createPath_(context) {
			let points = this.points_;
			const radius = this.radius;
			if (points === Infinity) context.arc(0, 0, radius, 0, 2 * Math.PI);
			else {
				const radius2 = this.radius2_ === void 0 ? radius : this.radius2_;
				if (this.radius2_ !== void 0) points *= 2;
				const startAngle = this.angle_ - Math.PI / 2;
				const step = 2 * Math.PI / points;
				for (let i = 0; i < points; i++) {
					const angle0 = startAngle + i * step;
					const radiusC = i % 2 === 0 ? radius : radius2;
					context.lineTo(radiusC * Math.cos(angle0), radiusC * Math.sin(angle0));
				}
				context.closePath();
			}
		}
		/**
		* @private
		* @param {RenderOptions} renderOptions Render options.
		* @param {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} context The context.
		*/
		drawHitDetectionCanvas_(renderOptions, context) {
			context.translate(renderOptions.size / 2, renderOptions.size / 2);
			this.createPath_(context);
			context.fillStyle = defaultFillStyle;
			context.fill();
			if (renderOptions.strokeStyle) {
				context.strokeStyle = renderOptions.strokeStyle;
				context.lineWidth = renderOptions.strokeWidth;
				if (renderOptions.lineDash) {
					context.setLineDash(renderOptions.lineDash);
					context.lineDashOffset = renderOptions.lineDashOffset;
				}
				context.lineJoin = renderOptions.lineJoin;
				context.miterLimit = renderOptions.miterLimit;
				context.stroke();
			}
		}
		/**
		* @override
		*/
		ready() {
			return this.fill_ ? this.fill_.ready() : Promise.resolve();
		}
	};
	//#endregion
	//#region src/ol/style/Circle.js
	/**
	* @module ol/style/Circle
	*/
	/**
	* @typedef {Object} Options
	* @property {import("./Fill.js").default} [fill] Fill style.
	* @property {number} radius Circle radius.
	* @property {import("./Stroke.js").default} [stroke] Stroke style.
	* @property {Array<number>} [displacement=[0,0]] displacement
	* @property {number|import("../size.js").Size} [scale=1] Scale. A two dimensional scale will produce an ellipse.
	* Unless two dimensional scaling is required a better result may be obtained with an appropriate setting for `radius`.
	* @property {number} [rotation=0] Rotation in radians
	* (positive rotation clockwise, meaningful only when used in conjunction with a two dimensional scale).
	* @property {boolean} [rotateWithView=false] Whether to rotate the shape with the view
	* (meaningful only when used in conjunction with a two dimensional scale).
	* @property {import('./Style.js').DeclutterMode} [declutterMode] Declutter mode
	*/
	/**
	* @classdesc
	* Set circle style for vector features.
	* @api
	*/
	var CircleStyle = class CircleStyle extends RegularShape {
		/**
		* @param {Options} [options] Options.
		*/
		constructor(options) {
			options = options ? options : { radius: 5 };
			super({
				points: Infinity,
				fill: options.fill,
				radius: options.radius,
				stroke: options.stroke,
				scale: options.scale !== void 0 ? options.scale : 1,
				rotation: options.rotation !== void 0 ? options.rotation : 0,
				rotateWithView: options.rotateWithView !== void 0 ? options.rotateWithView : false,
				displacement: options.displacement !== void 0 ? options.displacement : [0, 0],
				declutterMode: options.declutterMode
			});
		}
		/**
		* Clones the style.
		* @return {CircleStyle} The cloned style.
		* @api
		* @override
		*/
		clone() {
			const scale = this.getScale();
			const style = new CircleStyle({
				fill: this.getFill() ? this.getFill().clone() : void 0,
				stroke: this.getStroke() ? this.getStroke().clone() : void 0,
				radius: this.getRadius(),
				scale: Array.isArray(scale) ? scale.slice() : scale,
				rotation: this.getRotation(),
				rotateWithView: this.getRotateWithView(),
				displacement: this.getDisplacement().slice(),
				declutterMode: this.getDeclutterMode()
			});
			style.setOpacity(this.getOpacity());
			return style;
		}
	};
	//#endregion
	//#region src/ol/style/Fill.js
	/**
	* @module ol/style/Fill
	*/
	/**
	* @typedef {Object} Options
	* @property {import("../color.js").Color|import("../colorlike.js").ColorLike|import('../colorlike.js').PatternDescriptor|null} [color=null] A color,
	* gradient or pattern.
	* See {@link module:ol/color~Color} and {@link module:ol/colorlike~ColorLike} for possible formats. For polygon fills (not for {@link import("./RegularShape.js").default} fills),
	* a pattern can also be provided as {@link module:ol/colorlike~PatternDescriptor}.
	* Default null; if null, the Canvas/renderer default black will be used.
	*/
	/**
	* @classdesc
	* Set fill style for vector features.
	* @api
	*/
	var Fill = class Fill {
		/**
		* @param {Options} [options] Options.
		*/
		constructor(options) {
			options = options || {};
			/**
			* @private
			* @type {import("./IconImage.js").default|null}
			*/
			this.patternImage_ = null;
			/**
			* @private
			* @type {import("../color.js").Color|import("../colorlike.js").ColorLike|import('../colorlike.js').PatternDescriptor|null}
			*/
			this.color_ = null;
			if (options.color !== void 0) this.setColor(options.color);
		}
		/**
		* Clones the style. The color is not cloned if it is a {@link module:ol/colorlike~ColorLike}.
		* @return {Fill} The cloned style.
		* @api
		*/
		clone() {
			const color = this.getColor();
			return new Fill({ color: Array.isArray(color) ? color.slice() : color || void 0 });
		}
		/**
		* Get the fill color.
		* @return {import("../color.js").Color|import("../colorlike.js").ColorLike|import('../colorlike.js').PatternDescriptor|null} Color.
		* @api
		*/
		getColor() {
			return this.color_;
		}
		/**
		* Set the color.
		*
		* @param {import("../color.js").Color|import("../colorlike.js").ColorLike|import('../colorlike.js').PatternDescriptor|null} color Color.
		* @api
		*/
		setColor(color) {
			if (color !== null && typeof color === "object" && "src" in color) {
				const patternImage = get(null, color.src, { crossOrigin: "anonymous" }, void 0, color.offset ? null : color.color ? color.color : null, !(color.offset && color.size));
				patternImage.ready().then(() => {
					this.patternImage_ = null;
				});
				if (patternImage.getImageState() === ImageState_default.IDLE) patternImage.load();
				if (patternImage.getImageState() === ImageState_default.LOADING) this.patternImage_ = patternImage;
			}
			this.color_ = color;
		}
		/**
		* @return {string} Key of the fill for cache lookup.
		*/
		getKey() {
			const fill = this.getColor();
			if (!fill) return "";
			return fill instanceof CanvasPattern || fill instanceof CanvasGradient ? getUid(fill) : typeof fill === "object" && "src" in fill ? fill.src + ":" + fill.offset : asArray(fill).toString();
		}
		/**
		* @return {boolean} The fill style is loading an image pattern.
		*/
		loading() {
			return !!this.patternImage_;
		}
		/**
		* @return {Promise<void>} `false` or a promise that resolves when the style is ready to use.
		*/
		ready() {
			return this.patternImage_ ? this.patternImage_.ready() : Promise.resolve();
		}
	};
	//#endregion
	//#region src/ol/style/Icon.js
	/**
	* @module ol/style/Icon
	*/
	/**
	* @typedef {'fraction' | 'pixels'} IconAnchorUnits
	* Anchor unit can be either a fraction of the icon size or in pixels.
	*/
	/**
	* @typedef {'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'} IconOrigin
	* Icon origin. One of 'bottom-left', 'bottom-right', 'top-left', 'top-right'.
	*/
	/**
	* @typedef {Object} Options
	* @property {Array<number>} [anchor=[0.5, 0.5]] Anchor. Default value is the icon center.
	* @property {IconOrigin} [anchorOrigin='top-left'] Origin of the anchor: `bottom-left`, `bottom-right`,
	* `top-left` or `top-right`.
	* @property {IconAnchorUnits} [anchorXUnits='fraction'] Units in which the anchor x value is
	* specified. A value of `'fraction'` indicates the x value is a fraction of the icon. A value of `'pixels'` indicates
	* the x value in pixels.
	* @property {IconAnchorUnits} [anchorYUnits='fraction'] Units in which the anchor y value is
	* specified. A value of `'fraction'` indicates the y value is a fraction of the icon. A value of `'pixels'` indicates
	* the y value in pixels.
	* @property {import("../color.js").Color|string} [color] Color to tint the icon. If not specified,
	* the icon will be left as is.
	* @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images. Note that you must provide a
	* `crossOrigin` value if you want to access pixel data with the Canvas renderer.
	* See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
	* @property {ReferrerPolicy} [referrerPolicy] The `referrerPolicy` property for loaded images.
	* @property {HTMLImageElement|HTMLCanvasElement|OffscreenCanvas|ImageBitmap} [img] Image object for the icon.
	* @property {Array<number>} [displacement=[0, 0]] Displacement of the icon in pixels.
	* Positive values will shift the icon right and up.
	* @property {number} [opacity=1] Opacity of the icon.
	* @property {number} [width] The width of the icon in pixels. This can't be used together with `scale`.
	* @property {number} [height] The height of the icon in pixels. This can't be used together with `scale`.
	* @property {number|import("../size.js").Size} [scale=1] Scale.
	* @property {boolean} [rotateWithView=false] Whether to rotate the icon with the view.
	* @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
	* @property {Array<number>} [offset=[0, 0]] Offset which, together with `size` and `offsetOrigin`, defines the
	* sub-rectangle to use from the original (sprite) image.
	* @property {IconOrigin} [offsetOrigin='top-left'] Origin of the offset: `bottom-left`, `bottom-right`,
	* `top-left` or `top-right`.
	* @property {import("../size.js").Size} [size] Icon size in pixels. Used together with `offset` to define the
	* sub-rectangle to use from the original (sprite) image.
	* @property {string} [src] Image source URI.
	* @property {import("./Style.js").DeclutterMode} [declutterMode] Declutter mode.
	*/
	/**
	* @param {number} width The width.
	* @param {number} height The height.
	* @param {number|undefined} wantedWidth The wanted width.
	* @param {number|undefined} wantedHeight The wanted height.
	* @return {number|Array<number>} The scale.
	*/
	function calculateScale(width, height, wantedWidth, wantedHeight) {
		if (wantedWidth !== void 0 && wantedHeight !== void 0) return [wantedWidth / width, wantedHeight / height];
		if (wantedWidth !== void 0) return wantedWidth / width;
		if (wantedHeight !== void 0) return wantedHeight / height;
		return 1;
	}
	/**
	* @classdesc
	* Set icon style for vector features.
	* @api
	*/
	var Icon = class Icon extends ImageStyle {
		/**
		* @param {Options} [options] Options.
		*/
		constructor(options) {
			options = options || {};
			/**
			* @type {number}
			*/
			const opacity = options.opacity !== void 0 ? options.opacity : 1;
			/**
			* @type {number}
			*/
			const rotation = options.rotation !== void 0 ? options.rotation : 0;
			/**
			* @type {number|import("../size.js").Size}
			*/
			const scale = options.scale !== void 0 ? options.scale : 1;
			/**
			* @type {boolean}
			*/
			const rotateWithView = options.rotateWithView !== void 0 ? options.rotateWithView : false;
			super({
				opacity,
				rotation,
				scale,
				displacement: options.displacement !== void 0 ? options.displacement : [0, 0],
				rotateWithView,
				declutterMode: options.declutterMode
			});
			/**
			* @private
			* @type {Array<number>}
			*/
			this.anchor_ = options.anchor !== void 0 ? options.anchor : [.5, .5];
			/**
			* @private
			* @type {Array<number>}
			*/
			this.normalizedAnchor_ = null;
			/**
			* @private
			* @type {IconOrigin}
			*/
			this.anchorOrigin_ = options.anchorOrigin !== void 0 ? options.anchorOrigin : "top-left";
			/**
			* @private
			* @type {IconAnchorUnits}
			*/
			this.anchorXUnits_ = options.anchorXUnits !== void 0 ? options.anchorXUnits : "fraction";
			/**
			* @private
			* @type {IconAnchorUnits}
			*/
			this.anchorYUnits_ = options.anchorYUnits !== void 0 ? options.anchorYUnits : "fraction";
			/**
			* @private
			* @type {?string}
			*/
			this.crossOrigin_ = options.crossOrigin !== void 0 ? options.crossOrigin : null;
			/**
			* @private
			* @type {ReferrerPolicy}
			*/
			this.referrerPolicy_ = options.referrerPolicy;
			const image = options.img !== void 0 ? options.img : null;
			let cacheKey = options.src;
			assert(!(cacheKey !== void 0 && image), "`image` and `src` cannot be provided at the same time");
			if ((cacheKey === void 0 || cacheKey.length === 0) && image) cacheKey = image.src || getUid(image);
			assert(cacheKey !== void 0 && cacheKey.length > 0, "A defined and non-empty `src` or `image` must be provided");
			assert(!((options.width !== void 0 || options.height !== void 0) && options.scale !== void 0), "`width` or `height` cannot be provided together with `scale`");
			let imageState;
			if (options.src !== void 0) imageState = ImageState_default.IDLE;
			else if (image !== void 0) if ("complete" in image) if (image.complete) imageState = image.src ? ImageState_default.LOADED : ImageState_default.IDLE;
			else imageState = ImageState_default.LOADING;
			else imageState = ImageState_default.LOADED;
			/**
			* @private
			* @type {import("../color.js").Color}
			*/
			this.color_ = options.color !== void 0 ? asArray(options.color) : null;
			/**
			* @private
			* @type {import("./IconImage.js").default}
			*/
			this.iconImage_ = get(image, cacheKey, {
				crossOrigin: this.crossOrigin_,
				referrerPolicy: this.referrerPolicy_
			}, imageState, this.color_);
			/**
			* @private
			* @type {Array<number>}
			*/
			this.offset_ = options.offset !== void 0 ? options.offset : [0, 0];
			/**
			* @private
			* @type {IconOrigin}
			*/
			this.offsetOrigin_ = options.offsetOrigin !== void 0 ? options.offsetOrigin : "top-left";
			/**
			* @private
			* @type {Array<number>}
			*/
			this.origin_ = null;
			/**
			* @private
			* @type {import("../size.js").Size}
			*/
			this.size_ = options.size !== void 0 ? options.size : null;
			/**
			* @private
			*/
			this.initialOptions_;
			/**
			* Calculate the scale if width or height were given.
			*/
			if (options.width !== void 0 || options.height !== void 0) {
				let width, height;
				if (options.size) [width, height] = options.size;
				else {
					const image = this.getImage(1);
					if (image.width && image.height) {
						width = image.width;
						height = image.height;
					} else if (image instanceof HTMLImageElement) {
						this.initialOptions_ = options;
						const onload = () => {
							this.unlistenImageChange(onload);
							if (!this.initialOptions_) return;
							const imageSize = this.iconImage_.getSize();
							this.setScale(calculateScale(imageSize[0], imageSize[1], options.width, options.height));
						};
						this.listenImageChange(onload);
						return;
					}
				}
				if (width !== void 0) this.setScale(calculateScale(width, height, options.width, options.height));
			}
		}
		/**
		* Clones the style. The underlying Image/HTMLCanvasElement is not cloned.
		* @return {Icon} The cloned style.
		* @api
		* @override
		*/
		clone() {
			let scale, width, height;
			if (this.initialOptions_) {
				width = this.initialOptions_.width;
				height = this.initialOptions_.height;
			} else {
				scale = this.getScale();
				scale = Array.isArray(scale) ? scale.slice() : scale;
			}
			return new Icon({
				anchor: this.anchor_.slice(),
				anchorOrigin: this.anchorOrigin_,
				anchorXUnits: this.anchorXUnits_,
				anchorYUnits: this.anchorYUnits_,
				color: this.color_ && this.color_.slice ? this.color_.slice() : this.color_ || void 0,
				crossOrigin: this.crossOrigin_,
				referrerPolicy: this.referrerPolicy_,
				offset: this.offset_.slice(),
				offsetOrigin: this.offsetOrigin_,
				opacity: this.getOpacity(),
				rotateWithView: this.getRotateWithView(),
				rotation: this.getRotation(),
				scale,
				width,
				height,
				size: this.size_ !== null ? this.size_.slice() : void 0,
				src: this.getSrc(),
				displacement: this.getDisplacement().slice(),
				declutterMode: this.getDeclutterMode()
			});
		}
		/**
		* Get the anchor point in pixels. The anchor determines the center point for the
		* symbolizer.
		* @return {Array<number>} Anchor.
		* @api
		* @override
		*/
		getAnchor() {
			let anchor = this.normalizedAnchor_;
			if (!anchor) {
				anchor = this.anchor_;
				const size = this.getSize();
				if (this.anchorXUnits_ == "fraction" || this.anchorYUnits_ == "fraction") {
					if (!size) return null;
					anchor = this.anchor_.slice();
					if (this.anchorXUnits_ == "fraction") anchor[0] *= size[0];
					if (this.anchorYUnits_ == "fraction") anchor[1] *= size[1];
				}
				if (this.anchorOrigin_ != "top-left") {
					if (!size) return null;
					if (anchor === this.anchor_) anchor = this.anchor_.slice();
					if (this.anchorOrigin_ == "top-right" || this.anchorOrigin_ == "bottom-right") anchor[0] = -anchor[0] + size[0];
					if (this.anchorOrigin_ == "bottom-left" || this.anchorOrigin_ == "bottom-right") anchor[1] = -anchor[1] + size[1];
				}
				this.normalizedAnchor_ = anchor;
			}
			const displacement = this.getDisplacement();
			const scale = this.getScaleArray();
			return [anchor[0] - displacement[0] / scale[0], anchor[1] + displacement[1] / scale[1]];
		}
		/**
		* Set the anchor point. The anchor determines the center point for the
		* symbolizer.
		*
		* @param {Array<number>} anchor Anchor.
		* @api
		*/
		setAnchor(anchor) {
			this.anchor_ = anchor;
			this.normalizedAnchor_ = null;
		}
		/**
		* Get the icon color.
		* @return {import("../color.js").Color} Color.
		* @api
		*/
		getColor() {
			return this.color_;
		}
		/**
		* Set the icon color.
		*
		* Warning: Repeatedly setting the color on an icon style
		* causes the icon image to be re-created each time. This can have a
		* severe performance impact.
		*
		* @param {import("../color.js").Color|string|null|undefined} color Color.
		*/
		setColor(color) {
			const nextColor = color ? asArray(color) : null;
			if (this.color_ === nextColor || this.color_ && nextColor && this.color_.length === nextColor.length && this.color_.every((value, index) => value === nextColor[index])) return;
			this.color_ = nextColor;
			const src = this.getSrc();
			const image = src !== void 0 ? null : this.getHitDetectionImage();
			const imageState = src !== void 0 ? ImageState_default.IDLE : this.iconImage_.getImageState();
			this.iconImage_ = get(image, src, {
				crossOrigin: this.crossOrigin_,
				referrerPolicy: this.referrerPolicy_
			}, imageState, this.color_);
		}
		/**
		* Get the image icon.
		* @param {number} pixelRatio Pixel ratio.
		* @return {HTMLImageElement|HTMLCanvasElement|OffscreenCanvas|ImageBitmap} Image or Canvas element. If the Icon
		* style was configured with `src` or with a not let loaded `img`, an `ImageBitmap` will be returned.
		* @api
		* @override
		*/
		getImage(pixelRatio) {
			return this.iconImage_.getImage(pixelRatio);
		}
		/**
		* Get the pixel ratio.
		* @param {number} pixelRatio Pixel ratio.
		* @return {number} The pixel ratio of the image.
		* @api
		* @override
		*/
		getPixelRatio(pixelRatio) {
			return this.iconImage_.getPixelRatio(pixelRatio);
		}
		/**
		* @return {import("../size.js").Size} Image size.
		* @override
		*/
		getImageSize() {
			return this.iconImage_.getSize();
		}
		/**
		* @return {import("../ImageState.js").default} Image state.
		* @override
		*/
		getImageState() {
			return this.iconImage_.getImageState();
		}
		/**
		* @return {HTMLImageElement|HTMLCanvasElement|OffscreenCanvas|ImageBitmap} Image element.
		* @override
		*/
		getHitDetectionImage() {
			return this.iconImage_.getHitDetectionImage();
		}
		/**
		* Get the origin of the symbolizer.
		* @return {Array<number>} Origin.
		* @api
		* @override
		*/
		getOrigin() {
			if (this.origin_) return this.origin_;
			let offset = this.offset_;
			if (this.offsetOrigin_ != "top-left") {
				const size = this.getSize();
				const iconImageSize = this.iconImage_.getSize();
				if (!size || !iconImageSize) return null;
				offset = offset.slice();
				if (this.offsetOrigin_ == "top-right" || this.offsetOrigin_ == "bottom-right") offset[0] = iconImageSize[0] - size[0] - offset[0];
				if (this.offsetOrigin_ == "bottom-left" || this.offsetOrigin_ == "bottom-right") offset[1] = iconImageSize[1] - size[1] - offset[1];
			}
			this.origin_ = offset;
			return this.origin_;
		}
		/**
		* Get the image URL.
		* @return {string|undefined} Image src.
		* @api
		*/
		getSrc() {
			return this.iconImage_.getSrc();
		}
		/**
		* Set the image URI
		* @param {string} src Image source URI
		* @api
		*/
		setSrc(src) {
			this.iconImage_ = get(null, src, {
				crossOrigin: this.crossOrigin_,
				referrerPolicy: this.referrerPolicy_
			}, ImageState_default.IDLE, this.color_);
		}
		/**
		* Get the size of the icon (in pixels).
		* @return {import("../size.js").Size} Image size.
		* @api
		* @override
		*/
		getSize() {
			return !this.size_ ? this.iconImage_.getSize() : this.size_;
		}
		/**
		* Get the width of the icon (in pixels). Will return undefined when the icon image is not yet loaded.
		* @return {number} Icon width (in pixels).
		* @api
		*/
		getWidth() {
			const scale = this.getScaleArray();
			if (this.size_) return this.size_[0] * scale[0];
			if (this.iconImage_.getImageState() == ImageState_default.LOADED) return this.iconImage_.getSize()[0] * scale[0];
		}
		/**
		* Get the height of the icon (in pixels). Will return undefined when the icon image is not yet loaded.
		* @return {number} Icon height (in pixels).
		* @api
		*/
		getHeight() {
			const scale = this.getScaleArray();
			if (this.size_) return this.size_[1] * scale[1];
			if (this.iconImage_.getImageState() == ImageState_default.LOADED) return this.iconImage_.getSize()[1] * scale[1];
		}
		/**
		* Set the scale.
		*
		* @param {number|import("../size.js").Size} scale Scale.
		* @api
		* @override
		*/
		setScale(scale) {
			delete this.initialOptions_;
			super.setScale(scale);
		}
		/**
		* @param {function(import("../events/Event.js").default): void} listener Listener function.
		* @override
		*/
		listenImageChange(listener) {
			this.iconImage_.addEventListener(EventType_default$2.CHANGE, listener);
		}
		/**
		* Load not yet loaded URI.
		* When rendering a feature with an icon style, the vector renderer will
		* automatically call this method. However, you might want to call this
		* method yourself for preloading or other purposes.
		* @api
		* @override
		*/
		load() {
			this.iconImage_.load();
		}
		/**
		* @param {function(import("../events/Event.js").default): void} listener Listener function.
		* @override
		*/
		unlistenImageChange(listener) {
			this.iconImage_.removeEventListener(EventType_default$2.CHANGE, listener);
		}
		/**
		* @override
		*/
		ready() {
			return this.iconImage_.ready();
		}
	};
	//#endregion
	//#region src/ol/style/Stroke.js
	/**
	* @module ol/style/Stroke
	*/
	/**
	* @typedef {Object} Options
	* @property {import("../color.js").Color|import("../colorlike.js").ColorLike} [color] A color, gradient or pattern.
	* See {@link module:ol/color~Color} and {@link module:ol/colorlike~ColorLike} for possible formats.
	* Default null; if null, the Canvas/renderer default black will be used.
	* @property {CanvasLineCap} [lineCap='round'] Line cap style: `butt`, `round`, or `square`.
	* @property {CanvasLineJoin} [lineJoin='round'] Line join style: `bevel`, `round`, or `miter`.
	* @property {Array<number>} [lineDash] Line dash pattern. Default is `null` (no dash).
	* @property {number} [lineDashOffset=0] Line dash offset.
	* @property {number} [miterLimit=10] Miter limit.
	* @property {number} [offset] Line offset in pixels along the normal. A positive value offsets the line to the right,
	* relative to the direction of the line. Default is `undefined` (no offset).
	* @property {number} [width] Width.
	*/
	/**
	* @classdesc
	* Set stroke style for vector features.
	* Note that the defaults given are the Canvas defaults, which will be used if
	* option is not defined. The `get` functions return whatever was entered in
	* the options; they will not return the default.
	* @api
	*/
	var Stroke = class Stroke {
		/**
		* @param {Options} [options] Options.
		*/
		constructor(options) {
			options = options || {};
			/**
			* @private
			* @type {import("../color.js").Color|import("../colorlike.js").ColorLike}
			*/
			this.color_ = options.color !== void 0 ? options.color : null;
			/**
			* @private
			* @type {CanvasLineCap|undefined}
			*/
			this.lineCap_ = options.lineCap;
			/**
			* @private
			* @type {Array<number>|null}
			*/
			this.lineDash_ = options.lineDash !== void 0 ? options.lineDash : null;
			/**
			* @private
			* @type {number|undefined}
			*/
			this.lineDashOffset_ = options.lineDashOffset;
			/**
			* @private
			* @type {CanvasLineJoin|undefined}
			*/
			this.lineJoin_ = options.lineJoin;
			/**
			* @private
			* @type {number|undefined}
			*/
			this.miterLimit_ = options.miterLimit;
			/**
			* @private
			* @type {number|undefined}
			*/
			this.offset_ = options.offset;
			/**
			* @private
			* @type {number|undefined}
			*/
			this.width_ = options.width;
		}
		/**
		* Clones the style.
		* @return {Stroke} The cloned style.
		* @api
		*/
		clone() {
			const color = this.getColor();
			return new Stroke({
				color: Array.isArray(color) ? color.slice() : color || void 0,
				lineCap: this.getLineCap(),
				lineDash: this.getLineDash() ? this.getLineDash().slice() : void 0,
				lineDashOffset: this.getLineDashOffset(),
				lineJoin: this.getLineJoin(),
				miterLimit: this.getMiterLimit(),
				offset: this.getOffset(),
				width: this.getWidth()
			});
		}
		/**
		* Get the stroke color.
		* @return {import("../color.js").Color|import("../colorlike.js").ColorLike} Color.
		* @api
		*/
		getColor() {
			return this.color_;
		}
		/**
		* Get the line cap type for the stroke.
		* @return {CanvasLineCap|undefined} Line cap.
		* @api
		*/
		getLineCap() {
			return this.lineCap_;
		}
		/**
		* Get the line dash style for the stroke.
		* @return {Array<number>|null} Line dash.
		* @api
		*/
		getLineDash() {
			return this.lineDash_;
		}
		/**
		* Get the line dash offset for the stroke.
		* @return {number|undefined} Line dash offset.
		* @api
		*/
		getLineDashOffset() {
			return this.lineDashOffset_;
		}
		/**
		* Get the line join type for the stroke.
		* @return {CanvasLineJoin|undefined} Line join.
		* @api
		*/
		getLineJoin() {
			return this.lineJoin_;
		}
		/**
		* Get the miter limit for the stroke.
		* @return {number|undefined} Miter limit.
		* @api
		*/
		getMiterLimit() {
			return this.miterLimit_;
		}
		/**
		* Get the line offset in pixels.
		* @return {number|undefined} Offset.
		* @api
		*/
		getOffset() {
			return this.offset_;
		}
		/**
		* Get the stroke width.
		* @return {number|undefined} Width.
		* @api
		*/
		getWidth() {
			return this.width_;
		}
		/**
		* Set the color.
		*
		* @param {import("../color.js").Color|import("../colorlike.js").ColorLike} color Color.
		* @api
		*/
		setColor(color) {
			this.color_ = color;
		}
		/**
		* Set the line cap.
		*
		* @param {CanvasLineCap|undefined} lineCap Line cap.
		* @api
		*/
		setLineCap(lineCap) {
			this.lineCap_ = lineCap;
		}
		/**
		* Set the line dash.
		*
		* @param {Array<number>|null} lineDash Line dash.
		* @api
		*/
		setLineDash(lineDash) {
			this.lineDash_ = lineDash;
		}
		/**
		* Set the line dash offset.
		*
		* @param {number|undefined} lineDashOffset Line dash offset.
		* @api
		*/
		setLineDashOffset(lineDashOffset) {
			this.lineDashOffset_ = lineDashOffset;
		}
		/**
		* Set the line join.
		*
		* @param {CanvasLineJoin|undefined} lineJoin Line join.
		* @api
		*/
		setLineJoin(lineJoin) {
			this.lineJoin_ = lineJoin;
		}
		/**
		* Set the miter limit.
		*
		* @param {number|undefined} miterLimit Miter limit.
		* @api
		*/
		setMiterLimit(miterLimit) {
			this.miterLimit_ = miterLimit;
		}
		/**
		* Set the line offset in pixels.
		*
		* @param {number|undefined} offset Offset.
		* @api
		*/
		setOffset(offset) {
			this.offset_ = offset;
		}
		/**
		* Set the width.
		*
		* @param {number|undefined} width Width.
		* @api
		*/
		setWidth(width) {
			this.width_ = width;
		}
	};
	//#endregion
	//#region src/ol/style/Style.js
	/**
	* @module ol/style/Style
	*/
	/**
	* Defines how symbols and text are decluttered on layers ith `declutter` set to `true`
	* **declutter**: Overlapping symbols and text are decluttered.
	* **obstacle**: Symbols and text are rendered, but serve as obstacle for subsequent attempts
	*   to place a symbol or text at the same location.
	* **none**: No decluttering is done.
	*
	* @typedef {"declutter"|"obstacle"|"none"} DeclutterMode
	*/
	/**
	* A function that takes a {@link module:ol/Feature~Feature} and a `{number}`
	* representing the view's resolution. The function should return a
	* {@link module:ol/style/Style~Style} or an array of them. This way e.g. a
	* vector layer can be styled. If the function returns `undefined`, the
	* feature will not be rendered.
	*
	* @typedef {function(import("../Feature.js").FeatureLike, number):(Style|Array<Style>|void)} StyleFunction
	*/
	/**
	* A {@link Style}, an array of {@link Style}, or a {@link StyleFunction}.
	* @typedef {Style|Array<Style>|StyleFunction} StyleLike
	*/
	/**
	* A function that takes a {@link module:ol/Feature~Feature} as argument and returns an
	* {@link module:ol/geom/Geometry~Geometry} that will be rendered and styled for the feature.
	*
	* @typedef {function(import("../Feature.js").FeatureLike):
	*     (import("../geom/Geometry.js").default|import("../render/Feature.js").default|undefined)} GeometryFunction
	*/
	/**
	* Custom renderer function. Takes two arguments:
	*
	* 1. The pixel coordinates of the geometry in GeoJSON notation.
	* 2. The {@link module:ol/render~State} of the layer renderer.
	*
	* @typedef {function((import("../coordinate.js").Coordinate|Array<import("../coordinate.js").Coordinate>|Array<Array<import("../coordinate.js").Coordinate>>|Array<Array<Array<import("../coordinate.js").Coordinate>>>),import("../render.js").State): void} RenderFunction
	*/
	/**
	* @typedef {Object} Options
	* @property {string|import("../geom/Geometry.js").default|GeometryFunction} [geometry] Feature property or geometry
	* or function returning a geometry to render for this style.
	* @property {import("./Fill.js").default} [fill] Fill style.
	* @property {import("./Image.js").default} [image] Image style.
	* @property {RenderFunction} [renderer] Custom renderer. When configured, `fill`, `stroke` and `image` will be
	* ignored, and the provided function will be called with each render frame for each geometry.
	* @property {RenderFunction} [hitDetectionRenderer] Custom renderer for hit detection. If provided will be used
	* in hit detection rendering.
	* @property {import("./Stroke.js").default} [stroke] Stroke style.
	* @property {import("./Text.js").default} [text] Text style.
	* @property {number} [zIndex] Z index.
	*/
	/**
	* @classdesc
	* Container for vector feature rendering styles. Any changes made to the style
	* or its children through `set*()` methods will not take effect until the
	* feature or layer that uses the style is re-rendered.
	*
	* ## Feature styles
	*
	* If no style is defined, the following default style is used:
	* ```js
	*  import {Circle, Fill, Stroke, Style} from 'ol/style.js';
	*
	*  const fill = new Fill({
	*    color: 'rgba(255,255,255,0.4)',
	*  });
	*  const stroke = new Stroke({
	*    color: '#3399CC',
	*    width: 1.25,
	*  });
	*  const styles = [
	*    new Style({
	*      image: new Circle({
	*        fill: fill,
	*        stroke: stroke,
	*        radius: 5,
	*      }),
	*      fill: fill,
	*      stroke: stroke,
	*    }),
	*  ];
	* ```
	*
	* A separate editing style has the following defaults:
	* ```js
	*  import {Circle, Fill, Stroke, Style} from 'ol/style.js';
	*
	*  const styles = {};
	*  const white = [255, 255, 255, 1];
	*  const blue = [0, 153, 255, 1];
	*  const width = 3;
	*  styles['Polygon'] = [
	*    new Style({
	*      fill: new Fill({
	*        color: [255, 255, 255, 0.5],
	*      }),
	*    }),
	*  ];
	*  styles['MultiPolygon'] =
	*      styles['Polygon'];
	*  styles['LineString'] = [
	*    new Style({
	*      stroke: new Stroke({
	*        color: white,
	*        width: width + 2,
	*      }),
	*    }),
	*    new Style({
	*      stroke: new Stroke({
	*        color: blue,
	*        width: width,
	*      }),
	*    }),
	*  ];
	*  styles['MultiLineString'] = styles['LineString'];
	*
	*  styles['Circle'] = styles['Polygon'].concat(
	*    styles['LineString']
	*  );
	*
	*  styles['Point'] = [
	*    new Style({
	*      image: new Circle({
	*        radius: width * 2,
	*        fill: new Fill({
	*          color: blue,
	*        }),
	*        stroke: new Stroke({
	*          color: white,
	*          width: width / 2,
	*        }),
	*      }),
	*      zIndex: Infinity,
	*    }),
	*  ];
	*  styles['MultiPoint'] =
	*      styles['Point'];
	*  styles['GeometryCollection'] =
	*      styles['Polygon'].concat(
	*          styles['LineString'],
	*          styles['Point']
	*      );
	* ```
	*
	* @api
	*/
	var Style = class Style {
		/**
		* @param {Options} [options] Style options.
		*/
		constructor(options) {
			options = options || {};
			/**
			* @private
			* @type {string|import("../geom/Geometry.js").default|GeometryFunction|null}
			*/
			this.geometry_ = null;
			/**
			* @private
			* @type {!GeometryFunction}
			*/
			this.geometryFunction_ = defaultGeometryFunction;
			if (options.geometry !== void 0) this.setGeometry(options.geometry);
			/**
			* @private
			* @type {import("./Fill.js").default|null}
			*/
			this.fill_ = options.fill !== void 0 ? options.fill : null;
			/**
			* @private
			* @type {import("./Image.js").default|null}
			*/
			this.image_ = options.image !== void 0 ? options.image : null;
			/**
			* @private
			* @type {RenderFunction|null}
			*/
			this.renderer_ = options.renderer !== void 0 ? options.renderer : null;
			/**
			* @private
			* @type {RenderFunction|null}
			*/
			this.hitDetectionRenderer_ = options.hitDetectionRenderer !== void 0 ? options.hitDetectionRenderer : null;
			/**
			* @private
			* @type {import("./Stroke.js").default|null}
			*/
			this.stroke_ = options.stroke !== void 0 ? options.stroke : null;
			/**
			* @private
			* @type {import("./Text.js").default|null}
			*/
			this.text_ = options.text !== void 0 ? options.text : null;
			/**
			* @private
			* @type {number|undefined}
			*/
			this.zIndex_ = options.zIndex;
		}
		/**
		* Clones the style.
		* @return {Style} The cloned style.
		* @api
		*/
		clone() {
			let geometry = this.getGeometry();
			if (geometry && typeof geometry === "object") geometry = geometry.clone();
			return new Style({
				geometry: geometry ?? void 0,
				fill: this.getFill() ? this.getFill().clone() : void 0,
				image: this.getImage() ? this.getImage().clone() : void 0,
				renderer: this.getRenderer() ?? void 0,
				stroke: this.getStroke() ? this.getStroke().clone() : void 0,
				text: this.getText() ? this.getText().clone() : void 0,
				zIndex: this.getZIndex()
			});
		}
		/**
		* Get the custom renderer function that was configured with
		* {@link #setRenderer} or the `renderer` constructor option.
		* @return {RenderFunction|null} Custom renderer function.
		* @api
		*/
		getRenderer() {
			return this.renderer_;
		}
		/**
		* Sets a custom renderer function for this style. When set, `fill`, `stroke`
		* and `image` options of the style will be ignored.
		* @param {RenderFunction|null} renderer Custom renderer function.
		* @api
		*/
		setRenderer(renderer) {
			this.renderer_ = renderer;
		}
		/**
		* Sets a custom renderer function for this style used
		* in hit detection.
		* @param {RenderFunction|null} renderer Custom renderer function.
		* @api
		*/
		setHitDetectionRenderer(renderer) {
			this.hitDetectionRenderer_ = renderer;
		}
		/**
		* Get the custom renderer function that was configured with
		* {@link #setHitDetectionRenderer} or the `hitDetectionRenderer` constructor option.
		* @return {RenderFunction|null} Custom renderer function.
		* @api
		*/
		getHitDetectionRenderer() {
			return this.hitDetectionRenderer_;
		}
		/**
		* Get the geometry to be rendered.
		* @return {string|import("../geom/Geometry.js").default|GeometryFunction|null}
		* Feature property or geometry or function that returns the geometry that will
		* be rendered with this style.
		* @api
		*/
		getGeometry() {
			return this.geometry_;
		}
		/**
		* Get the function used to generate a geometry for rendering.
		* @return {!GeometryFunction} Function that is called with a feature
		* and returns the geometry to render instead of the feature's geometry.
		* @api
		*/
		getGeometryFunction() {
			return this.geometryFunction_;
		}
		/**
		* Get the fill style.
		* @return {import("./Fill.js").default|null} Fill style.
		* @api
		*/
		getFill() {
			return this.fill_;
		}
		/**
		* Set the fill style.
		* @param {import("./Fill.js").default|null} fill Fill style.
		* @api
		*/
		setFill(fill) {
			this.fill_ = fill;
		}
		/**
		* Get the image style.
		* @return {import("./Image.js").default|null} Image style.
		* @api
		*/
		getImage() {
			return this.image_;
		}
		/**
		* Set the image style.
		* @param {import("./Image.js").default} image Image style.
		* @api
		*/
		setImage(image) {
			this.image_ = image;
		}
		/**
		* Get the stroke style.
		* @return {import("./Stroke.js").default|null} Stroke style.
		* @api
		*/
		getStroke() {
			return this.stroke_;
		}
		/**
		* Set the stroke style.
		* @param {import("./Stroke.js").default|null} stroke Stroke style.
		* @api
		*/
		setStroke(stroke) {
			this.stroke_ = stroke;
		}
		/**
		* Get the text style.
		* @return {import("./Text.js").default|null} Text style.
		* @api
		*/
		getText() {
			return this.text_;
		}
		/**
		* Set the text style.
		* @param {import("./Text.js").default} text Text style.
		* @api
		*/
		setText(text) {
			this.text_ = text;
		}
		/**
		* Get the z-index for the style.
		* @return {number|undefined} ZIndex.
		* @api
		*/
		getZIndex() {
			return this.zIndex_;
		}
		/**
		* Set a geometry that is rendered instead of the feature's geometry.
		*
		* @param {string|import("../geom/Geometry.js").default|GeometryFunction|null} geometry
		*     Feature property or geometry or function returning a geometry to render
		*     for this style.
		* @api
		*/
		setGeometry(geometry) {
			if (typeof geometry === "function") this.geometryFunction_ = geometry;
			else if (typeof geometry === "string") this.geometryFunction_ = function(feature) {
				return feature.get(geometry);
			};
			else if (!geometry) this.geometryFunction_ = defaultGeometryFunction;
			else if (geometry !== void 0) this.geometryFunction_ = function() {
				return geometry;
			};
			this.geometry_ = geometry;
		}
		/**
		* Set the z-index.
		*
		* @param {number|undefined} zIndex ZIndex.
		* @api
		*/
		setZIndex(zIndex) {
			this.zIndex_ = zIndex;
		}
	};
	/**
	* Convert the provided object into a style function.  Functions passed through
	* unchanged.  Arrays of Style or single style objects wrapped in a
	* new style function.
	* @param {StyleFunction|Array<Style>|Style} obj
	*     A style function, a single style, or an array of styles.
	* @return {StyleFunction} A style function.
	*/
	function toFunction(obj) {
		let styleFunction;
		if (typeof obj === "function") styleFunction = obj;
		else {
			/**
			* @type {Array<Style>}
			*/
			let styles;
			if (Array.isArray(obj)) styles = obj;
			else {
				assert(typeof obj.getZIndex === "function", "Expected an `Style` or an array of `Style`");
				styles = [obj];
			}
			styleFunction = function() {
				return styles;
			};
		}
		return styleFunction;
	}
	/**
	* @type {Array<Style>|null}
	*/
	let defaultStyles = null;
	/**
	* @param {import("../Feature.js").FeatureLike} feature Feature.
	* @param {number} resolution Resolution.
	* @return {Array<Style>} Style.
	*/
	function createDefaultStyle(feature, resolution) {
		if (!defaultStyles) {
			const fill = new Fill({ color: "rgba(255,255,255,0.4)" });
			const stroke = new Stroke({
				color: "#3399CC",
				width: 1.25
			});
			defaultStyles = [new Style({
				image: new CircleStyle({
					fill,
					stroke,
					radius: 5
				}),
				fill,
				stroke
			})];
		}
		return defaultStyles;
	}
	/**
	* Function that is called with a feature and returns its default geometry.
	* @param {import("../Feature.js").FeatureLike} feature Feature to get the geometry for.
	* @return {import("../geom/Geometry.js").default|import("../render/Feature.js").default|undefined} Geometry to render.
	*/
	function defaultGeometryFunction(feature) {
		return feature.getGeometry();
	}
	//#endregion
	//#region src/ol/style/Text.js
	/**
	* @module ol/style/Text
	*/
	/**
	* @typedef {'point' | 'line'} TextPlacement
	* Default text placement is `'point'`. Note that
	* `'line'` requires the underlying geometry to be a {@link module:ol/geom/LineString~LineString},
	* {@link module:ol/geom/Polygon~Polygon}, {@link module:ol/geom/MultiLineString~MultiLineString} or
	* {@link module:ol/geom/MultiPolygon~MultiPolygon}.
	*/
	/**
	* @typedef {'left' | 'center' | 'right'} TextJustify
	*/
	/**
	* The default fill color to use if no fill was set at construction time; a
	* blackish `#333`.
	*
	* @const {string}
	*/
	const DEFAULT_FILL_COLOR = "#333";
	/**
	* @typedef {Object} Options
	* @property {string} [font] Font style as CSS `font` value, see:
	* https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font. Default is `'10px sans-serif'`
	* @property {number} [maxAngle=Math.PI/4] When `placement` is set to `'line'`, allow a maximum angle between adjacent characters.
	* The expected value is in radians, and the default is 45° (`Math.PI / 4`).
	* @property {number} [offsetX=0] Horizontal text offset in pixels. A positive will shift the text right.
	* @property {number} [offsetY=0] Vertical text offset in pixels. A positive will shift the text down.
	* @property {boolean} [overflow=false] For polygon labels or when `placement` is set to `'line'`, allow text to exceed
	* the width of the polygon at the label position or the length of the path that it follows.
	* @property {TextPlacement} [placement='point'] Text placement.
	* @property {number} [repeat] Repeat interval. When set, the text will be repeated at this interval, which specifies
	* the distance between two text anchors in pixels. Only available when `placement` is set to `'line'`. Overrides 'textAlign'.
	* @property {number|import("../size.js").Size} [scale] Scale.
	* @property {boolean} [rotateWithView=false] Whether to rotate the text with the view.
	* @property {boolean} [keepUpright=true] Whether the text can be rotated 180° to prevent being rendered upside down.
	* @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
	* @property {string|Array<string>} [text] Text content or rich text content. For plain text provide a string, which can
	* contain line breaks (`\n`). For rich text provide an array of text/font tuples. A tuple consists of the text to
	* render and the font to use (or `''` to use the text style's font). A line break has to be a separate tuple (i.e. `'\n', ''`).
	* **Example:** `['foo', 'bold 10px sans-serif', ' bar', 'italic 10px sans-serif', ' baz', '']` will yield "**foo** *bar* baz".
	* **Note:** Rich text is not supported for `placement: 'line'` or the immediate rendering API.
	* @property {CanvasTextAlign} [textAlign] Text alignment. Possible values: `'left'`, `'right'`, `'center'`, `'end'` or `'start'`.
	* Default is `'center'` for `placement: 'point'`. For `placement: 'line'`, the default is to let the renderer choose a
	* placement where `maxAngle` is not exceeded.
	* @property {TextJustify} [justify] Text justification within the text box.
	* If not set, text is justified towards the `textAlign` anchor.
	* Otherwise, use options `'left'`, `'center'`, or `'right'` to justify the text within the text box.
	* **Note:** `justify` is ignored for immediate rendering and also for `placement: 'line'`.
	* @property {CanvasTextBaseline} [textBaseline='middle'] Text base line. Possible values: `'bottom'`, `'top'`, `'middle'`, `'alphabetic'`,
	* `'hanging'`, `'ideographic'`.
	* @property {import("./Fill.js").default|null} [fill] Fill style. If none is provided, we'll use a dark fill-style (#333). Specify `null` for no fill.
	* @property {import("./Stroke.js").default} [stroke] Stroke style.
	* @property {import("./Fill.js").default} [backgroundFill] Fill style for the text background when `placement` is
	* `'point'`. Default is no fill.
	* @property {import("./Stroke.js").default} [backgroundStroke] Stroke style for the text background  when `placement`
	* is `'point'`. Default is no stroke.
	* @property {Array<number>} [padding=[0, 0, 0, 0]] Padding in pixels around the text for decluttering and background. The order of
	* values in the array is `[top, right, bottom, left]`.
	* @property {import('../style/Style.js').DeclutterMode} [declutterMode] Declutter mode: `declutter`, `obstacle`, `none`
	*/
	/**
	* @classdesc
	* Set text style for vector features.
	* @api
	*/
	var Text = class Text {
		/**
		* @param {Options} [options] Options.
		*/
		constructor(options) {
			options = options || {};
			/**
			* @private
			* @type {string|undefined}
			*/
			this.font_ = options.font;
			/**
			* @private
			* @type {number|undefined}
			*/
			this.rotation_ = options.rotation;
			/**
			* @private
			* @type {boolean|undefined}
			*/
			this.rotateWithView_ = options.rotateWithView;
			/**
			* @private
			* @type {boolean|undefined}
			*/
			this.keepUpright_ = options.keepUpright;
			/**
			* @private
			* @type {number|import("../size.js").Size|undefined}
			*/
			this.scale_ = options.scale;
			/**
			* @private
			* @type {import("../size.js").Size}
			*/
			this.scaleArray_ = toSize(options.scale !== void 0 ? options.scale : 1);
			/**
			* @private
			* @type {string|Array<string>|undefined}
			*/
			this.text_ = options.text;
			/**
			* @private
			* @type {CanvasTextAlign|undefined}
			*/
			this.textAlign_ = options.textAlign;
			/**
			* @private
			* @type {TextJustify|undefined}
			*/
			this.justify_ = options.justify;
			/**
			* @private
			* @type {number|undefined}
			*/
			this.repeat_ = options.repeat;
			/**
			* @private
			* @type {CanvasTextBaseline|undefined}
			*/
			this.textBaseline_ = options.textBaseline;
			/**
			* @private
			* @type {import("./Fill.js").default|null}
			*/
			this.fill_ = options.fill !== void 0 ? options.fill : new Fill({ color: DEFAULT_FILL_COLOR });
			/**
			* @private
			* @type {number}
			*/
			this.maxAngle_ = options.maxAngle !== void 0 ? options.maxAngle : Math.PI / 4;
			/**
			* @private
			* @type {TextPlacement}
			*/
			this.placement_ = options.placement !== void 0 ? options.placement : "point";
			/**
			* @private
			* @type {boolean}
			*/
			this.overflow_ = !!options.overflow;
			/**
			* @private
			* @type {import("./Stroke.js").default|null}
			*/
			this.stroke_ = options.stroke !== void 0 ? options.stroke : null;
			/**
			* @private
			* @type {number}
			*/
			this.offsetX_ = options.offsetX !== void 0 ? options.offsetX : 0;
			/**
			* @private
			* @type {number}
			*/
			this.offsetY_ = options.offsetY !== void 0 ? options.offsetY : 0;
			/**
			* @private
			* @type {import("./Fill.js").default|null}
			*/
			this.backgroundFill_ = options.backgroundFill ? options.backgroundFill : null;
			/**
			* @private
			* @type {import("./Stroke.js").default|null}
			*/
			this.backgroundStroke_ = options.backgroundStroke ? options.backgroundStroke : null;
			/**
			* @private
			* @type {Array<number>|null}
			*/
			this.padding_ = options.padding === void 0 ? null : options.padding;
			/**
			* @private
			* @type {import('../style/Style.js').DeclutterMode}
			*/
			this.declutterMode_ = options.declutterMode;
		}
		/**
		* Clones the style.
		* @return {Text} The cloned style.
		* @api
		*/
		clone() {
			const scale = this.getScale();
			return new Text({
				font: this.getFont(),
				placement: this.getPlacement(),
				repeat: this.getRepeat(),
				maxAngle: this.getMaxAngle(),
				overflow: this.getOverflow(),
				rotation: this.getRotation(),
				rotateWithView: this.getRotateWithView(),
				keepUpright: this.getKeepUpright(),
				scale: Array.isArray(scale) ? scale.slice() : scale,
				text: this.getText(),
				textAlign: this.getTextAlign(),
				justify: this.getJustify(),
				textBaseline: this.getTextBaseline(),
				fill: this.getFill() instanceof Fill ? this.getFill().clone() : this.getFill(),
				stroke: this.getStroke() ? this.getStroke().clone() : void 0,
				offsetX: this.getOffsetX(),
				offsetY: this.getOffsetY(),
				backgroundFill: this.getBackgroundFill() ? this.getBackgroundFill().clone() : void 0,
				backgroundStroke: this.getBackgroundStroke() ? this.getBackgroundStroke().clone() : void 0,
				padding: this.getPadding() || void 0,
				declutterMode: this.getDeclutterMode()
			});
		}
		/**
		* Get the `overflow` configuration.
		* @return {boolean} Let text overflow the length of the path they follow.
		* @api
		*/
		getOverflow() {
			return this.overflow_;
		}
		/**
		* Get the font name.
		* @return {string|undefined} Font.
		* @api
		*/
		getFont() {
			return this.font_;
		}
		/**
		* Get the maximum angle between adjacent characters.
		* @return {number} Angle in radians.
		* @api
		*/
		getMaxAngle() {
			return this.maxAngle_;
		}
		/**
		* Get the label placement.
		* @return {TextPlacement} Text placement.
		* @api
		*/
		getPlacement() {
			return this.placement_;
		}
		/**
		* Get the repeat interval of the text.
		* @return {number|undefined} Repeat interval in pixels.
		* @api
		*/
		getRepeat() {
			return this.repeat_;
		}
		/**
		* Get the x-offset for the text.
		* @return {number} Horizontal text offset.
		* @api
		*/
		getOffsetX() {
			return this.offsetX_;
		}
		/**
		* Get the y-offset for the text.
		* @return {number} Vertical text offset.
		* @api
		*/
		getOffsetY() {
			return this.offsetY_;
		}
		/**
		* Get the fill style for the text.
		* @return {import("./Fill.js").default|null} Fill style.
		* @api
		*/
		getFill() {
			return this.fill_;
		}
		/**
		* Determine whether the text rotates with the map.
		* @return {boolean|undefined} Rotate with map.
		* @api
		*/
		getRotateWithView() {
			return this.rotateWithView_;
		}
		/**
		* Determine whether the text can be rendered upside down.
		* @return {boolean|undefined} Keep text upright.
		* @api
		*/
		getKeepUpright() {
			return this.keepUpright_;
		}
		/**
		* Get the text rotation.
		* @return {number|undefined} Rotation.
		* @api
		*/
		getRotation() {
			return this.rotation_;
		}
		/**
		* Get the text scale.
		* @return {number|import("../size.js").Size|undefined} Scale.
		* @api
		*/
		getScale() {
			return this.scale_;
		}
		/**
		* Get the symbolizer scale array.
		* @return {import("../size.js").Size} Scale array.
		*/
		getScaleArray() {
			return this.scaleArray_;
		}
		/**
		* Get the stroke style for the text.
		* @return {import("./Stroke.js").default|null} Stroke style.
		* @api
		*/
		getStroke() {
			return this.stroke_;
		}
		/**
		* Get the text to be rendered.
		* @return {string|Array<string>|undefined} Text.
		* @api
		*/
		getText() {
			return this.text_;
		}
		/**
		* Get the text alignment.
		* @return {CanvasTextAlign|undefined} Text align.
		* @api
		*/
		getTextAlign() {
			return this.textAlign_;
		}
		/**
		* Get the justification.
		* @return {TextJustify|undefined} Justification.
		* @api
		*/
		getJustify() {
			return this.justify_;
		}
		/**
		* Get the text baseline.
		* @return {CanvasTextBaseline|undefined} Text baseline.
		* @api
		*/
		getTextBaseline() {
			return this.textBaseline_;
		}
		/**
		* Get the background fill style for the text.
		* @return {import("./Fill.js").default|null} Fill style.
		* @api
		*/
		getBackgroundFill() {
			return this.backgroundFill_;
		}
		/**
		* Get the background stroke style for the text.
		* @return {import("./Stroke.js").default|null} Stroke style.
		* @api
		*/
		getBackgroundStroke() {
			return this.backgroundStroke_;
		}
		/**
		* Get the padding for the text.
		* @return {Array<number>|null} Padding.
		* @api
		*/
		getPadding() {
			return this.padding_;
		}
		/**
		* Get the declutter mode of the shape
		* @return {import("./Style.js").DeclutterMode} Shape's declutter mode
		* @api
		*/
		getDeclutterMode() {
			return this.declutterMode_;
		}
		/**
		* Set the `overflow` property.
		*
		* @param {boolean} overflow Let text overflow the path that it follows.
		* @api
		*/
		setOverflow(overflow) {
			this.overflow_ = overflow;
		}
		/**
		* Set the font.
		*
		* @param {string|undefined} font Font.
		* @api
		*/
		setFont(font) {
			this.font_ = font;
		}
		/**
		* Set the maximum angle between adjacent characters.
		*
		* @param {number} maxAngle Angle in radians.
		* @api
		*/
		setMaxAngle(maxAngle) {
			this.maxAngle_ = maxAngle;
		}
		/**
		* Set the x offset.
		*
		* @param {number} offsetX Horizontal text offset.
		* @api
		*/
		setOffsetX(offsetX) {
			this.offsetX_ = offsetX;
		}
		/**
		* Set the y offset.
		*
		* @param {number} offsetY Vertical text offset.
		* @api
		*/
		setOffsetY(offsetY) {
			this.offsetY_ = offsetY;
		}
		/**
		* Set the text placement.
		*
		* @param {TextPlacement} placement Placement.
		* @api
		*/
		setPlacement(placement) {
			this.placement_ = placement;
		}
		/**
		* Set the repeat interval of the text.
		* @param {number|undefined} [repeat] Repeat interval in pixels.
		* @api
		*/
		setRepeat(repeat) {
			this.repeat_ = repeat;
		}
		/**
		* Set whether to rotate the text with the view.
		*
		* @param {boolean} rotateWithView Rotate with map.
		* @api
		*/
		setRotateWithView(rotateWithView) {
			this.rotateWithView_ = rotateWithView;
		}
		/**
		* Set whether the text can be rendered upside down.
		*
		* @param {boolean} keepUpright Keep text upright.
		* @api
		*/
		setKeepUpright(keepUpright) {
			this.keepUpright_ = keepUpright;
		}
		/**
		* Set the fill.
		*
		* @param {import("./Fill.js").default|null} fill Fill style.
		* @api
		*/
		setFill(fill) {
			this.fill_ = fill;
		}
		/**
		* Set the rotation.
		*
		* @param {number|undefined} rotation Rotation.
		* @api
		*/
		setRotation(rotation) {
			this.rotation_ = rotation;
		}
		/**
		* Set the scale.
		*
		* @param {number|import("../size.js").Size|undefined} scale Scale.
		* @api
		*/
		setScale(scale) {
			this.scale_ = scale;
			this.scaleArray_ = toSize(scale !== void 0 ? scale : 1);
		}
		/**
		* Set the stroke.
		*
		* @param {import("./Stroke.js").default|null} stroke Stroke style.
		* @api
		*/
		setStroke(stroke) {
			this.stroke_ = stroke;
		}
		/**
		* Set the text.
		*
		* @param {string|Array<string>|undefined} text Text.
		* @api
		*/
		setText(text) {
			this.text_ = text;
		}
		/**
		* Set the text alignment.
		*
		* @param {CanvasTextAlign|undefined} textAlign Text align.
		* @api
		*/
		setTextAlign(textAlign) {
			this.textAlign_ = textAlign;
		}
		/**
		* Set the justification.
		*
		* @param {TextJustify|undefined} justify Justification.
		* @api
		*/
		setJustify(justify) {
			this.justify_ = justify;
		}
		/**
		* Set the text baseline.
		*
		* @param {CanvasTextBaseline|undefined} textBaseline Text baseline.
		* @api
		*/
		setTextBaseline(textBaseline) {
			this.textBaseline_ = textBaseline;
		}
		/**
		* Set the background fill.
		*
		* @param {import("./Fill.js").default|null} fill Fill style.
		* @api
		*/
		setBackgroundFill(fill) {
			this.backgroundFill_ = fill;
		}
		/**
		* Set the background stroke.
		*
		* @param {import("./Stroke.js").default|null} stroke Stroke style.
		* @api
		*/
		setBackgroundStroke(stroke) {
			this.backgroundStroke_ = stroke;
		}
		/**
		* Set the padding (`[top, right, bottom, left]`).
		*
		* @param {Array<number>|null} padding Padding.
		* @api
		*/
		setPadding(padding) {
			this.padding_ = padding;
		}
	};
	//#endregion
	//#region src/ol/render/canvas/style.js
	/**
	* @module ol/render/canvas/style
	*/
	/**
	* @fileoverview This module includes functions to build styles for the canvas renderer.  Building
	* is composed of two steps: parsing and compiling.  The parsing step takes an encoded expression
	* and returns an instance of one of the expression classes.  The compiling step takes the
	* expression instance and returns a function that can be evaluated to return a literal value.  The
	* evaluator function should do as little allocation and work as possible.
	*/
	/**
	* @typedef {import("../../style/flat.js").FlatStyle} FlatStyle
	*/
	/**
	* @typedef {import("../../expr/expression.js").EncodedExpression} EncodedExpression
	*/
	/**
	* @typedef {import("../../expr/expression.js").ParsingContext} ParsingContext
	*/
	/**
	* @typedef {import("../../expr/expression.js").CallExpression} CallExpression
	*/
	/**
	* @typedef {import("../../expr/cpu.js").EvaluationContext} EvaluationContext
	*/
	/**
	* @typedef {import("../../expr/cpu.js").ExpressionEvaluator} ExpressionEvaluator
	*/
	/**
	* @param {EvaluationContext} context The evaluation context.
	* @return {boolean} Always true.
	*/
	function always(context) {
		return true;
	}
	/**
	* This function adapts a rule evaluator to the existing style function interface.
	* After we have deprecated the style function, we can use the compiled rules directly
	* and pass a more complete evaluation context (variables, zoom, time, etc.).
	*
	* @param {Array<import('../../style/flat.js').Rule>} rules The rules.
	* @param {ParsingContext} [parsingContext] Optional parsing context; will create a new one if not provided
	* @return {import('../../style/Style.js').StyleFunction} A style function.
	*/
	function rulesToStyleFunction(rules, parsingContext) {
		parsingContext = parsingContext ?? newParsingContext();
		const evaluator = buildRuleSet(rules, parsingContext);
		const evaluationContext = newEvaluationContext();
		return function(feature, resolution) {
			evaluationContext.properties = feature.getPropertiesInternal();
			evaluationContext.resolution = resolution;
			if (parsingContext.featureId) {
				const id = feature.getId();
				if (id !== void 0) evaluationContext.featureId = id;
				else evaluationContext.featureId = null;
			}
			if (parsingContext.geometryType) evaluationContext.geometryType = computeGeometryType(feature.getGeometry());
			return evaluator(evaluationContext);
		};
	}
	/**
	* This function adapts a style evaluator to the existing style function interface.
	* After we have deprecated the style function, we can use the compiled rules directly
	* and pass a more complete evaluation context (variables, zoom, time, etc.).
	*
	* @param {Array<import('../../style/flat.js').FlatStyle>} flatStyles The flat styles.
	* @param {ParsingContext} [parsingContext] Optional parsing context; will create a new one if not provided
	* @return {import('../../style/Style.js').StyleFunction} A style function.
	*/
	function flatStylesToStyleFunction(flatStyles, parsingContext) {
		parsingContext = parsingContext ?? newParsingContext();
		const length = flatStyles.length;
		/**
		* @type {Array<StyleEvaluator>}
		*/
		const evaluators = new Array(length);
		for (let i = 0; i < length; ++i) evaluators[i] = buildStyle(flatStyles[i], parsingContext);
		const evaluationContext = newEvaluationContext();
		/**
		* @type {Array<Style>}
		*/
		const styles = new Array(length);
		return function(feature, resolution) {
			evaluationContext.properties = feature.getPropertiesInternal();
			evaluationContext.resolution = resolution;
			if (parsingContext.featureId) {
				const id = feature.getId();
				if (id !== void 0) evaluationContext.featureId = id;
				else evaluationContext.featureId = null;
			}
			if (parsingContext.geometryType) evaluationContext.geometryType = computeGeometryType(feature.getGeometry());
			let nonNullCount = 0;
			for (let i = 0; i < length; ++i) {
				const style = evaluators[i](evaluationContext);
				if (style) {
					styles[nonNullCount] = style;
					nonNullCount += 1;
				}
			}
			styles.length = nonNullCount;
			return styles;
		};
	}
	/**
	* This function handles any kind of style that matches the FlatStyleLike type.
	*
	* @param {import('../../style/flat.js').FlatStyleLike} flatStyleLike The flat style.
	* @param {ParsingContext} [parsingContext] Optional parsing context; will create a new one if not provided
	* @return {import('../../style/Style.js').StyleFunction} A style function.
	*/
	function flatStyleLikeToStyleFunction(flatStyleLike, parsingContext) {
		parsingContext = parsingContext ?? newParsingContext();
		if (!Array.isArray(flatStyleLike)) return flatStylesToStyleFunction([flatStyleLike], parsingContext);
		const length = flatStyleLike.length;
		if ("style" in flatStyleLike[0]) {
			/**
			* @type {Array<import("../../style/flat.js").Rule>}
			*/
			const rules = new Array(length);
			for (let i = 0; i < length; ++i) {
				const candidate = flatStyleLike[i];
				if (!("style" in candidate)) throw new Error("Expected a list of rules with a style property");
				rules[i] = candidate;
			}
			return rulesToStyleFunction(rules, parsingContext);
		}
		return flatStylesToStyleFunction(flatStyleLike, parsingContext);
	}
	/**
	* @typedef {function(EvaluationContext):Array<Style>} RuleSetEvaluator
	*/
	/**
	* @typedef {Object} CompiledRule
	* @property {ExpressionEvaluator} filter The compiled filter evaluator.
	* @property {Array<StyleEvaluator>} styles The list of compiled style evaluators.
	*/
	/**
	* @param {Array<import('../../style/flat.js').Rule>} rules The rules.
	* @param {ParsingContext} context The parsing context.
	* @return {RuleSetEvaluator} The evaluator function.
	*/
	function buildRuleSet(rules, context) {
		const length = rules.length;
		/**
		* @type {Array<CompiledRule>}
		*/
		const compiledRules = new Array(length);
		for (let i = 0; i < length; ++i) {
			const rule = rules[i];
			const filter = "filter" in rule ? buildExpression(rule.filter, BooleanType, context) : always;
			/**
			* @type {Array<StyleEvaluator>}
			*/
			let styles;
			if (Array.isArray(rule.style)) {
				const styleLength = rule.style.length;
				styles = new Array(styleLength);
				for (let j = 0; j < styleLength; ++j) styles[j] = buildStyle(rule.style[j], context);
			} else styles = [buildStyle(rule.style, context)];
			compiledRules[i] = {
				filter,
				styles
			};
		}
		return function(context) {
			/**
			* @type {Array<Style>}
			*/
			const styles = [];
			let someMatched = false;
			for (let i = 0; i < length; ++i) {
				const filterEvaluator = compiledRules[i].filter;
				if (!filterEvaluator(context)) continue;
				if (rules[i].else && someMatched) continue;
				someMatched = true;
				for (const styleEvaluator of compiledRules[i].styles) {
					const style = styleEvaluator(context);
					if (!style) continue;
					styles.push(style);
				}
			}
			return styles;
		};
	}
	/**
	* @typedef {function(EvaluationContext):Style|null} StyleEvaluator
	*/
	/**
	* @param {FlatStyle} flatStyle A flat style literal.
	* @param {ParsingContext} context The parsing context.
	* @return {StyleEvaluator} A function that evaluates to a style.  The style returned by
	* this function will be reused between invocations.
	*/
	function buildStyle(flatStyle, context) {
		const evaluateFill = buildFill(flatStyle, "", context);
		const evaluateStroke = buildStroke(flatStyle, "", context);
		const evaluateText = buildText(flatStyle, context);
		const evaluateImage = buildImage(flatStyle, context);
		const evaluateZIndex = numberEvaluator(flatStyle, "z-index", context);
		if (!evaluateFill && !evaluateStroke && !evaluateText && !evaluateImage && !isEmpty$1(flatStyle)) throw new Error("No fill, stroke, point, or text symbolizer properties in style: " + JSON.stringify(flatStyle));
		const style = new Style();
		return function(context) {
			let empty = true;
			if (evaluateFill) {
				const fill = evaluateFill(context);
				if (fill) empty = false;
				style.setFill(fill);
			}
			if (evaluateStroke) {
				const stroke = evaluateStroke(context);
				if (stroke) empty = false;
				style.setStroke(stroke);
			}
			if (evaluateText) {
				const text = evaluateText(context);
				if (text) empty = false;
				style.setText(text);
			}
			if (evaluateImage) {
				const image = evaluateImage(context);
				if (image) empty = false;
				style.setImage(image);
			}
			if (evaluateZIndex) style.setZIndex(evaluateZIndex(context));
			if (empty) return null;
			return style;
		};
	}
	/**
	* @typedef {function(EvaluationContext):Fill|null} FillEvaluator
	*/
	/**
	* @param {FlatStyle} flatStyle The flat style.
	* @param {string} prefix The property prefix.
	* @param {ParsingContext} context The parsing context.
	* @return {FillEvaluator?} A function that evaluates to a fill.
	*/
	function buildFill(flatStyle, prefix, context) {
		let evaluateColor;
		if (prefix + "fill-pattern-src" in flatStyle) evaluateColor = patternEvaluator(flatStyle, prefix + "fill-", context);
		else {
			if (flatStyle[prefix + "fill-color"] === "none") return (context) => null;
			evaluateColor = colorLikeEvaluator(flatStyle, prefix + "fill-color", context);
		}
		if (!evaluateColor) return null;
		const fill = new Fill();
		return function(context) {
			const color = evaluateColor(context);
			if (color === NO_COLOR) return null;
			fill.setColor(color);
			return fill;
		};
	}
	/**
	* @typedef {function(EvaluationContext):Stroke|null} StrokeEvaluator
	*/
	/**
	* @param {FlatStyle} flatStyle The flat style.
	* @param {string} prefix The property prefix.
	* @param {ParsingContext} context The parsing context.
	* @return {StrokeEvaluator?} A function the evaluates to a stroke.
	*/
	function buildStroke(flatStyle, prefix, context) {
		const evaluateWidth = numberEvaluator(flatStyle, prefix + "stroke-width", context);
		const evaluateColor = colorLikeEvaluator(flatStyle, prefix + "stroke-color", context);
		if (!evaluateWidth && !evaluateColor) return null;
		const evaluateLineCap = stringEvaluator(flatStyle, prefix + "stroke-line-cap", context);
		const evaluateLineJoin = stringEvaluator(flatStyle, prefix + "stroke-line-join", context);
		const evaluateLineDash = numberArrayEvaluator(flatStyle, prefix + "stroke-line-dash", context);
		const evaluateLineDashOffset = numberEvaluator(flatStyle, prefix + "stroke-line-dash-offset", context);
		const evaluateMiterLimit = numberEvaluator(flatStyle, prefix + "stroke-miter-limit", context);
		const evaluateOffset = numberEvaluator(flatStyle, prefix + "stroke-offset", context);
		const stroke = new Stroke();
		return function(context) {
			if (evaluateColor) {
				const color = evaluateColor(context);
				if (color === NO_COLOR) return null;
				stroke.setColor(color);
			}
			if (evaluateWidth) stroke.setWidth(evaluateWidth(context));
			if (evaluateLineCap) {
				const lineCap = evaluateLineCap(context);
				if (lineCap !== "butt" && lineCap !== "round" && lineCap !== "square") throw new Error("Expected butt, round, or square line cap");
				stroke.setLineCap(lineCap);
			}
			if (evaluateLineJoin) {
				const lineJoin = evaluateLineJoin(context);
				if (lineJoin !== "bevel" && lineJoin !== "round" && lineJoin !== "miter") throw new Error("Expected bevel, round, or miter line join");
				stroke.setLineJoin(lineJoin);
			}
			if (evaluateLineDash) stroke.setLineDash(evaluateLineDash(context));
			if (evaluateLineDashOffset) stroke.setLineDashOffset(evaluateLineDashOffset(context));
			if (evaluateMiterLimit) stroke.setMiterLimit(evaluateMiterLimit(context));
			if (evaluateOffset) stroke.setOffset(evaluateOffset(context));
			return stroke;
		};
	}
	/**
	* @typedef {function(EvaluationContext):Text} TextEvaluator
	*/
	/**
	* @param {FlatStyle} flatStyle The flat style.
	* @param {ParsingContext} context The parsing context.
	* @return {TextEvaluator?} A function that evaluates to a text symbolizer.
	*/
	function buildText(flatStyle, context) {
		const prefix = "text-";
		const evaluateValue = stringEvaluator(flatStyle, "text-value", context);
		if (!evaluateValue) return null;
		const evaluateFill = buildFill(flatStyle, prefix, context);
		const evaluateBackgroundFill = buildFill(flatStyle, "text-background-", context);
		const evaluateStroke = buildStroke(flatStyle, prefix, context);
		const evaluateBackgroundStroke = buildStroke(flatStyle, "text-background-", context);
		const evaluateFont = stringEvaluator(flatStyle, "text-font", context);
		const evaluateMaxAngle = numberEvaluator(flatStyle, "text-max-angle", context);
		const evaluateOffsetX = numberEvaluator(flatStyle, "text-offset-x", context);
		const evaluateOffsetY = numberEvaluator(flatStyle, "text-offset-y", context);
		const evaluateOverflow = booleanEvaluator(flatStyle, "text-overflow", context);
		const evaluatePlacement = stringEvaluator(flatStyle, "text-placement", context);
		const evaluateRepeat = numberEvaluator(flatStyle, "text-repeat", context);
		const evaluateScale = sizeLikeEvaluator(flatStyle, "text-scale", context);
		const evaluateRotateWithView = booleanEvaluator(flatStyle, "text-rotate-with-view", context);
		const evaluateRotation = numberEvaluator(flatStyle, "text-rotation", context);
		const evaluateAlign = stringEvaluator(flatStyle, "text-align", context);
		const evaluateJustify = stringEvaluator(flatStyle, "text-justify", context);
		const evaluateBaseline = stringEvaluator(flatStyle, "text-baseline", context);
		const evaluateKeepUpright = booleanEvaluator(flatStyle, "text-keep-upright", context);
		const evaluatePadding = numberArrayEvaluator(flatStyle, "text-padding", context);
		const text = new Text({ declutterMode: optionalDeclutterMode(flatStyle, "text-declutter-mode") });
		return function(context) {
			text.setText(evaluateValue(context));
			if (evaluateFill) text.setFill(evaluateFill(context));
			if (evaluateBackgroundFill) text.setBackgroundFill(evaluateBackgroundFill(context));
			if (evaluateStroke) text.setStroke(evaluateStroke(context));
			if (evaluateBackgroundStroke) text.setBackgroundStroke(evaluateBackgroundStroke(context));
			if (evaluateFont) text.setFont(evaluateFont(context));
			if (evaluateMaxAngle) text.setMaxAngle(evaluateMaxAngle(context));
			if (evaluateOffsetX) text.setOffsetX(evaluateOffsetX(context));
			if (evaluateOffsetY) text.setOffsetY(evaluateOffsetY(context));
			if (evaluateOverflow) text.setOverflow(evaluateOverflow(context));
			if (evaluatePlacement) {
				const placement = evaluatePlacement(context);
				if (placement !== "point" && placement !== "line") throw new Error("Expected point or line for text-placement");
				text.setPlacement(placement);
			}
			if (evaluateRepeat) text.setRepeat(evaluateRepeat(context));
			if (evaluateScale) text.setScale(evaluateScale(context));
			if (evaluateRotateWithView) text.setRotateWithView(evaluateRotateWithView(context));
			if (evaluateRotation) text.setRotation(evaluateRotation(context));
			if (evaluateAlign) {
				const textAlign = evaluateAlign(context);
				if (textAlign !== "left" && textAlign !== "center" && textAlign !== "right" && textAlign !== "end" && textAlign !== "start") throw new Error("Expected left, right, center, start, or end for text-align");
				text.setTextAlign(textAlign);
			}
			if (evaluateJustify) {
				const justify = evaluateJustify(context);
				if (justify !== "left" && justify !== "right" && justify !== "center") throw new Error("Expected left, right, or center for text-justify");
				text.setJustify(justify);
			}
			if (evaluateBaseline) {
				const textBaseline = evaluateBaseline(context);
				if (textBaseline !== "bottom" && textBaseline !== "top" && textBaseline !== "middle" && textBaseline !== "alphabetic" && textBaseline !== "hanging") throw new Error("Expected bottom, top, middle, alphabetic, or hanging for text-baseline");
				text.setTextBaseline(textBaseline);
			}
			if (evaluatePadding) text.setPadding(evaluatePadding(context));
			if (evaluateKeepUpright) text.setKeepUpright(evaluateKeepUpright(context));
			return text;
		};
	}
	/**
	* @typedef {function(EvaluationContext):import("../../style/Image.js").default} ImageEvaluator
	*/
	/**
	* @param {FlatStyle} flatStyle The flat style.
	* @param {ParsingContext} context The parsing context.
	* @return {ImageEvaluator?} A function that evaluates to an image symbolizer.
	*/
	function buildImage(flatStyle, context) {
		if ("icon-src" in flatStyle) return buildIcon(flatStyle, context);
		if ("shape-points" in flatStyle) return buildShape(flatStyle, context);
		if ("circle-radius" in flatStyle) return buildCircle(flatStyle, context);
		return null;
	}
	/**
	* @param {FlatStyle} flatStyle The flat style.
	* @param {ParsingContext} context The parsing context.
	* @return {ImageEvaluator} A function that evaluates to an image symbolizer.
	*/
	function buildIcon(flatStyle, context) {
		const srcName = "icon-src";
		const src = requireString(flatStyle[srcName], srcName);
		const evaluateAnchor = coordinateEvaluator(flatStyle, "icon-anchor", context);
		const evaluateScale = sizeLikeEvaluator(flatStyle, "icon-scale", context);
		const evaluateOpacity = numberEvaluator(flatStyle, "icon-opacity", context);
		const evaluateDisplacement = coordinateEvaluator(flatStyle, "icon-displacement", context);
		const evaluateRotation = numberEvaluator(flatStyle, "icon-rotation", context);
		const evaluateRotateWithView = booleanEvaluator(flatStyle, "icon-rotate-with-view", context);
		const anchorOrigin = optionalIconOrigin(flatStyle, "icon-anchor-origin");
		const anchorXUnits = optionalIconAnchorUnits(flatStyle, "icon-anchor-x-units");
		const anchorYUnits = optionalIconAnchorUnits(flatStyle, "icon-anchor-y-units");
		const colorValue = getExpressionValue(flatStyle, "icon-color");
		let color;
		let evaluateColor = null;
		if (colorValue !== void 0) if (Array.isArray(colorValue) && colorValue.length > 0 && typeof colorValue[0] === "string") evaluateColor = colorLikeEvaluator(flatStyle, "icon-color", context);
		else color = requireColorLike(colorValue, "icon-color");
		const crossOrigin = optionalString(flatStyle, "icon-cross-origin");
		const offset = optionalNumberArray(flatStyle, "icon-offset");
		const offsetOrigin = optionalIconOrigin(flatStyle, "icon-offset-origin");
		const width = optionalNumber(flatStyle, "icon-width");
		const iconOptions = {
			src,
			anchorOrigin,
			anchorXUnits,
			anchorYUnits,
			crossOrigin,
			offset,
			offsetOrigin,
			height: optionalNumber(flatStyle, "icon-height"),
			width,
			size: optionalSize(flatStyle, "icon-size"),
			declutterMode: optionalDeclutterMode(flatStyle, "icon-declutter-mode")
		};
		let icon = null;
		return function(context) {
			if (!icon) {
				const initialColor = evaluateColor ? evaluateColor(context) : color;
				icon = new Icon(initialColor !== void 0 ? Object.assign({}, iconOptions, { color: initialColor }) : Object.assign({}, iconOptions));
			} else if (evaluateColor) icon.setColor(evaluateColor(context));
			if (evaluateOpacity) icon.setOpacity(evaluateOpacity(context));
			if (evaluateDisplacement) icon.setDisplacement(evaluateDisplacement(context));
			if (evaluateRotation) icon.setRotation(evaluateRotation(context));
			if (evaluateRotateWithView) icon.setRotateWithView(evaluateRotateWithView(context));
			if (evaluateScale) icon.setScale(evaluateScale(context));
			if (evaluateAnchor) icon.setAnchor(evaluateAnchor(context));
			return icon;
		};
	}
	/**
	* @param {FlatStyle} flatStyle The flat style.
	* @param {ParsingContext} context The parsing context.
	* @return {ImageEvaluator} A function that evaluates to an icon symbolizer.
	*/
	function buildShape(flatStyle, context) {
		const prefix = "shape-";
		const pointsName = "shape-points";
		const radiusName = "shape-radius";
		const points = requireNumber(flatStyle[pointsName], pointsName);
		if (!(radiusName in flatStyle)) throw new Error(`Expected a number for ${radiusName}`);
		const evaluateRadius = numberEvaluator(flatStyle, radiusName, context);
		const initialRadius = typeof flatStyle[radiusName] === "number" ? flatStyle[radiusName] : 5;
		const radius2Name = "shape-radius2";
		const evaluateRadius2 = numberEvaluator(flatStyle, radius2Name, context);
		const initialRadius2 = typeof flatStyle[radius2Name] === "number" ? flatStyle[radius2Name] : void 0;
		const evaluateFill = buildFill(flatStyle, prefix, context);
		const evaluateStroke = buildStroke(flatStyle, prefix, context);
		const evaluateScale = sizeLikeEvaluator(flatStyle, "shape-scale", context);
		const evaluateDisplacement = coordinateEvaluator(flatStyle, "shape-displacement", context);
		const evaluateRotation = numberEvaluator(flatStyle, "shape-rotation", context);
		const evaluateRotateWithView = booleanEvaluator(flatStyle, "shape-rotate-with-view", context);
		const shape = new RegularShape({
			points,
			radius: initialRadius,
			radius2: initialRadius2,
			angle: optionalNumber(flatStyle, "shape-angle"),
			declutterMode: optionalDeclutterMode(flatStyle, "shape-declutter-mode")
		});
		return function(context) {
			if (evaluateRadius) shape.setRadius(evaluateRadius(context));
			if (evaluateRadius2) shape.setRadius2(evaluateRadius2(context));
			if (evaluateFill) shape.setFill(evaluateFill(context));
			if (evaluateStroke) shape.setStroke(evaluateStroke(context));
			if (evaluateDisplacement) shape.setDisplacement(evaluateDisplacement(context));
			if (evaluateRotation) shape.setRotation(evaluateRotation(context));
			if (evaluateRotateWithView) shape.setRotateWithView(evaluateRotateWithView(context));
			if (evaluateScale) shape.setScale(evaluateScale(context));
			return shape;
		};
	}
	/**
	* @param {FlatStyle} flatStyle The flat style.
	* @param {ParsingContext} context The parsing context.
	* @return {ImageEvaluator} A function that evaluates to a circle symbolizer.
	*/
	function buildCircle(flatStyle, context) {
		const prefix = "circle-";
		const evaluateFill = buildFill(flatStyle, prefix, context);
		const evaluateStroke = buildStroke(flatStyle, prefix, context);
		const evaluateRadius = numberEvaluator(flatStyle, "circle-radius", context);
		const evaluateScale = sizeLikeEvaluator(flatStyle, "circle-scale", context);
		const evaluateDisplacement = coordinateEvaluator(flatStyle, "circle-displacement", context);
		const evaluateRotation = numberEvaluator(flatStyle, "circle-rotation", context);
		const evaluateRotateWithView = booleanEvaluator(flatStyle, "circle-rotate-with-view", context);
		const circle = new CircleStyle({
			radius: 5,
			declutterMode: optionalDeclutterMode(flatStyle, "circle-declutter-mode")
		});
		return function(context) {
			if (evaluateRadius) circle.setRadius(evaluateRadius(context));
			if (evaluateFill) circle.setFill(evaluateFill(context));
			if (evaluateStroke) circle.setStroke(evaluateStroke(context));
			if (evaluateDisplacement) circle.setDisplacement(evaluateDisplacement(context));
			if (evaluateRotation) circle.setRotation(evaluateRotation(context));
			if (evaluateRotateWithView) circle.setRotateWithView(evaluateRotateWithView(context));
			if (evaluateScale) circle.setScale(evaluateScale(context));
			return circle;
		};
	}
	/**
	* @param {FlatStyle} flatStyle The flat style.
	* @param {string} name The property name.
	* @return {any|undefined} The encoded value, or undefined if not provided.
	*/
	function getExpressionValue(flatStyle, name) {
		if (!(name in flatStyle)) return;
		const value = flatStyle[name];
		return value === void 0 ? void 0 : value;
	}
	/**
	* @param {FlatStyle} flatStyle The flat style.
	* @param {string} name The property name.
	* @param {ParsingContext} context The parsing context.
	* @return {import('../../expr/cpu.js').NumberEvaluator|undefined} The expression evaluator or undefined.
	*/
	function numberEvaluator(flatStyle, name, context) {
		const encoded = getExpressionValue(flatStyle, name);
		if (encoded === void 0) return;
		const evaluator = buildExpression(encoded, NumberType, context);
		return function(context) {
			return requireNumber(evaluator(context), name);
		};
	}
	/**
	* @param {FlatStyle} flatStyle The flat style.
	* @param {string} name The property name.
	* @param {ParsingContext} context The parsing context.
	* @return {import('../../expr/cpu.js').StringEvaluator?} The expression evaluator.
	*/
	function stringEvaluator(flatStyle, name, context) {
		const encoded = getExpressionValue(flatStyle, name);
		if (encoded === void 0) return null;
		const evaluator = buildExpression(encoded, StringType, context);
		return function(context) {
			return requireString(evaluator(context), name);
		};
	}
	function patternEvaluator(flatStyle, prefix, context) {
		const srcEvaluator = stringEvaluator(flatStyle, prefix + "pattern-src", context);
		const offsetEvaluator = sizeEvaluator(flatStyle, prefix + "pattern-offset", context);
		const patternSizeEvaluator = sizeEvaluator(flatStyle, prefix + "pattern-size", context);
		const colorEvaluator = colorLikeEvaluator(flatStyle, prefix + "color", context);
		return function(context) {
			return {
				src: srcEvaluator(context),
				offset: offsetEvaluator && offsetEvaluator(context),
				size: patternSizeEvaluator && patternSizeEvaluator(context),
				color: colorEvaluator && colorEvaluator(context)
			};
		};
	}
	/**
	* @param {FlatStyle} flatStyle The flat style.
	* @param {string} name The property name.
	* @param {ParsingContext} context The parsing context.
	* @return {import('../../expr/cpu.js').BooleanEvaluator?} The expression evaluator.
	*/
	function booleanEvaluator(flatStyle, name, context) {
		const encoded = getExpressionValue(flatStyle, name);
		if (encoded === void 0) return null;
		const evaluator = buildExpression(encoded, BooleanType, context);
		return function(context) {
			const value = evaluator(context);
			if (typeof value !== "boolean") throw new Error(`Expected a boolean for ${name}`);
			return value;
		};
	}
	/**
	* @param {FlatStyle} flatStyle The flat style.
	* @param {string} name The property name.
	* @param {ParsingContext} context The parsing context.
	* @return {import('../../expr/cpu.js').ColorLikeEvaluator?} The expression evaluator.
	*/
	function colorLikeEvaluator(flatStyle, name, context) {
		const encoded = getExpressionValue(flatStyle, name);
		if (encoded === void 0) return null;
		const evaluator = buildExpression(encoded, ColorType, context);
		return function(context) {
			return requireColorLike(evaluator(context), name);
		};
	}
	/**
	* @param {FlatStyle} flatStyle The flat style.
	* @param {string} name The property name.
	* @param {ParsingContext} context The parsing context.
	* @return {import('../../expr/cpu.js').NumberArrayEvaluator?} The expression evaluator.
	*/
	function numberArrayEvaluator(flatStyle, name, context) {
		const encoded = getExpressionValue(flatStyle, name);
		if (encoded === void 0) return null;
		if (Array.isArray(encoded) && (encoded.length === 0 || typeof encoded[0] !== "string")) {
			/** @type {Array<import('../../expr/cpu.js').NumberEvaluator>} */
			const evaluators = encoded.map((value, index) => {
				if (typeof value === "number") return () => value;
				const evaluator = buildExpression(value, NumberType, context);
				return function(context) {
					return requireNumber(evaluator(context), `${name}[${index}]`);
				};
			});
			return function(context) {
				const array = new Array(evaluators.length);
				for (let i = 0; i < evaluators.length; ++i) array[i] = evaluators[i](context);
				return array;
			};
		}
		const evaluator = buildExpression(encoded, NumberArrayType, context);
		return function(context) {
			return requireNumberArray(evaluator(context), name);
		};
	}
	/**
	* @param {FlatStyle} flatStyle The flat style.
	* @param {string} name The property name.
	* @param {ParsingContext} context The parsing context.
	* @return {import('../../expr/cpu.js').CoordinateEvaluator?} The expression evaluator.
	*/
	function coordinateEvaluator(flatStyle, name, context) {
		const encoded = getExpressionValue(flatStyle, name);
		if (encoded === void 0) return null;
		const evaluator = buildExpression(encoded, NumberArrayType, context);
		return function(context) {
			const array = requireNumberArray(evaluator(context), name);
			if (array.length !== 2) throw new Error(`Expected two numbers for ${name}`);
			return array;
		};
	}
	/**
	* @param {FlatStyle} flatStyle The flat style.
	* @param {string} name The property name.
	* @param {ParsingContext} context The parsing context.
	* @return {import('../../expr/cpu.js').SizeEvaluator?} The expression evaluator.
	*/
	function sizeEvaluator(flatStyle, name, context) {
		const encoded = getExpressionValue(flatStyle, name);
		if (encoded === void 0) return null;
		const evaluator = buildExpression(encoded, NumberArrayType, context);
		return function(context) {
			return requireSize(evaluator(context), name);
		};
	}
	/**
	* @param {FlatStyle} flatStyle The flat style.
	* @param {string} name The property name.
	* @param {ParsingContext} context The parsing context.
	* @return {import('../../expr/cpu.js').SizeLikeEvaluator?} The expression evaluator.
	*/
	function sizeLikeEvaluator(flatStyle, name, context) {
		const encoded = getExpressionValue(flatStyle, name);
		if (encoded === void 0) return null;
		const evaluator = buildExpression(encoded, NumberArrayType | NumberType, context);
		return function(context) {
			return requireSizeLike(evaluator(context), name);
		};
	}
	/**
	* @param {FlatStyle} flatStyle The flat style.
	* @param {string} property The symbolizer property.
	* @return {number|undefined} A number or undefined.
	*/
	function optionalNumber(flatStyle, property) {
		const value = flatStyle[property];
		if (value === void 0) return;
		if (typeof value !== "number") throw new Error(`Expected a number for ${property}`);
		return value;
	}
	/**
	* @param {FlatStyle} flatStyle The flat style.
	* @param {string} property The symbolizer property.
	* @return {import("../../size.js").Size|undefined} A size or undefined.
	*/
	function optionalSize(flatStyle, property) {
		const encoded = flatStyle[property];
		if (encoded === void 0) return;
		if (typeof encoded === "number") return toSize(encoded);
		if (!Array.isArray(encoded)) throw new Error(`Expected a number or size array for ${property}`);
		if (encoded.length !== 2 || typeof encoded[0] !== "number" || typeof encoded[1] !== "number") throw new Error(`Expected a number or size array for ${property}`);
		return encoded;
	}
	/**
	* @param {FlatStyle} flatStyle The flat style.
	* @param {string} property The symbolizer property.
	* @return {string|undefined} A string or undefined.
	*/
	function optionalString(flatStyle, property) {
		const encoded = flatStyle[property];
		if (encoded === void 0) return;
		if (typeof encoded !== "string") throw new Error(`Expected a string for ${property}`);
		return encoded;
	}
	/**
	* @param {FlatStyle} flatStyle The flat style.
	* @param {string} property The symbolizer property.
	* @return {import("../../style/Icon.js").IconOrigin|undefined} An icon origin or undefined.
	*/
	function optionalIconOrigin(flatStyle, property) {
		const encoded = flatStyle[property];
		if (encoded === void 0) return;
		if (encoded !== "bottom-left" && encoded !== "bottom-right" && encoded !== "top-left" && encoded !== "top-right") throw new Error(`Expected bottom-left, bottom-right, top-left, or top-right for ${property}`);
		return encoded;
	}
	/**
	* @param {FlatStyle} flatStyle The flat style.
	* @param {string} property The symbolizer property.
	* @return {import("../../style/Icon.js").IconAnchorUnits|undefined} Icon anchor units or undefined.
	*/
	function optionalIconAnchorUnits(flatStyle, property) {
		const encoded = flatStyle[property];
		if (encoded === void 0) return;
		if (encoded !== "pixels" && encoded !== "fraction") throw new Error(`Expected pixels or fraction for ${property}`);
		return encoded;
	}
	/**
	* @param {FlatStyle} flatStyle The flat style.
	* @param {string} property The symbolizer property.
	* @return {Array<number>|undefined} An array of numbers or undefined.
	*/
	function optionalNumberArray(flatStyle, property) {
		const encoded = flatStyle[property];
		if (encoded === void 0) return;
		return requireNumberArray(encoded, property);
	}
	/**
	* @param {FlatStyle} flatStyle The flat style.
	* @param {string} property The symbolizer property.
	* @return {import('../../style/Style.js').DeclutterMode} Icon declutter mode.
	*/
	function optionalDeclutterMode(flatStyle, property) {
		const encoded = flatStyle[property];
		if (encoded === void 0) return;
		if (typeof encoded !== "string") throw new Error(`Expected a string for ${property}`);
		if (encoded !== "declutter" && encoded !== "obstacle" && encoded !== "none") throw new Error(`Expected declutter, obstacle, or none for ${property}`);
		return encoded;
	}
	/**
	* @param {any} value The value.
	* @param {string} property The property.
	* @return {Array<number>} An array of numbers.
	*/
	function requireNumberArray(value, property) {
		if (!Array.isArray(value)) throw new Error(`Expected an array for ${property}`);
		const length = value.length;
		for (let i = 0; i < length; ++i) if (typeof value[i] !== "number") throw new Error(`Expected an array of numbers for ${property}`);
		return value;
	}
	/**
	* @param {any} value The value.
	* @param {string} property The property.
	* @return {string} A string.
	*/
	function requireString(value, property) {
		if (typeof value !== "string") throw new Error(`Expected a string for ${property}`);
		return value;
	}
	/**
	* @param {any} value The value.
	* @param {string} property The property.
	* @return {number} A number.
	*/
	function requireNumber(value, property) {
		if (typeof value !== "number") throw new Error(`Expected a number for ${property}`);
		return value;
	}
	/**
	* @param {any} value The value.
	* @param {string} property The property.
	* @return {Array<number>|string} A color.
	*/
	function requireColorLike(value, property) {
		if (typeof value === "string") return value;
		const array = requireNumberArray(value, property);
		const length = array.length;
		if (length < 3 || length > 4) throw new Error(`Expected a color with 3 or 4 values for ${property}`);
		return array;
	}
	/**
	* @param {any} value The value.
	* @param {string} property The property.
	* @return {Array<number>} A number or an array of two numbers.
	*/
	function requireSize(value, property) {
		const size = requireNumberArray(value, property);
		if (size.length !== 2) throw new Error(`Expected an array of two numbers for ${property}`);
		return size;
	}
	/**
	* @param {any} value The value.
	* @param {string} property The property.
	* @return {number|Array<number>} A number or an array of two numbers.
	*/
	function requireSizeLike(value, property) {
		if (typeof value === "number") return value;
		return requireSize(value, property);
	}
	//#endregion
	//#region src/ol/layer/BaseVector.js
	/**
	* @module ol/layer/BaseVector
	*/
	/***
	* @template T
	* @typedef {T extends import("../source/Vector.js").default<infer U extends import("../Feature.js").FeatureLike> ? U : never} ExtractedFeatureType
	*/
	/**
	* @template {import('../Feature.js').FeatureLike} FeatureType
	* @template {import("../source/Vector.js").default<FeatureType>|import("../source/VectorTile.js").default<FeatureType>} VectorSourceType<FeatureType>
	* @typedef {Object} Options
	* @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
	* @property {number} [opacity=1] Opacity (0, 1).
	* @property {boolean} [visible=true] Visibility.
	* @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
	* rendered outside of this extent.
	* @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
	* will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
	* for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
	* method was used.
	* @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
	* visible.
	* @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
	* be visible.
	* @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
	* visible.
	* @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
	* be visible.
	* @property {import("../render.js").OrderFunction} [renderOrder] Render order. Function to be used when sorting
	* features before rendering. By default features are drawn in the order that they are created. Use
	* `null` to avoid the sort, but get an undefined draw order.
	* @property {number} [renderBuffer=100] The buffer in pixels around the viewport extent used by the
	* renderer when getting features from the vector source for the rendering or hit-detection.
	* Recommended value: the size of the largest symbol, line width or label.
	* @property {VectorSourceType} [source] Source.
	* @property {import("../Map.js").default} [map] Sets the layer as overlay on a map. The map will not manage
	* this layer in its layers collection, and the layer will be rendered on top. This is useful for
	* temporary layers. The standard way to add a layer to a map and have it managed by the map is to
	* use [map.addLayer()]{@link import("../Map.js").default#addLayer}.
	* @property {boolean|string|number} [declutter=false] Declutter images and text. Any truthy value will enable
	* decluttering. Within a layer, a feature rendered before another has higher priority. All layers with the
	* same `declutter` value will be decluttered together. The priority is determined by the drawing order of the
	* layers with the same `declutter` value. Higher in the layer stack means higher priority. To declutter distinct
	* layers or groups of layers separately, use different truthy values for `declutter`.
	* @property {import("../style/Style.js").StyleLike|import("../style/flat.js").FlatStyleLike|null} [style] Layer style. When set to `null`, only
	* features that have their own style will be rendered. See {@link module:ol/style/Style~Style} for the default style
	* which will be used if this is not set.
	* @property {import("./Base.js").BackgroundColor} [background] Background color for the layer. If not specified, no background
	* will be rendered.
	* @property {boolean} [updateWhileAnimating=false] When set to `true`, feature batches will
	* be recreated during animations. This means that no vectors will be shown clipped, but the
	* setting will have a performance impact for large amounts of vector data. When set to `false`,
	* batches will be recreated when no animation is active.
	* @property {boolean} [updateWhileInteracting=false] When set to `true`, feature batches will
	* be recreated during interactions. See also `updateWhileAnimating`.
	* @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
	*/
	/**
	* @enum {string}
	* @private
	*/
	const Property = { RENDER_ORDER: "renderOrder" };
	/**
	* @classdesc
	* Vector data that is rendered client-side.
	* Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
	* property on the layer object; for example, setting `title: 'My Title'` in the
	* options means that `title` is observable, and has get/set accessors.
	*
	* @template {import('../Feature.js').FeatureLike} FeatureType
	* @template {import("../source/Vector.js").default<FeatureType>|import("../source/VectorTile.js").default<FeatureType>} VectorSourceType<FeatureType>
	* @extends {Layer<VectorSourceType, RendererType>}
	* @template {import("../renderer/canvas/VectorLayer.js").default|import("../renderer/canvas/VectorTileLayer.js").default|import("../renderer/canvas/VectorImageLayer.js").default|import("../renderer/webgl/VectorLayer.js").default|import("../renderer/webgl/PointsLayer.js").default} RendererType
	* @api
	*/
	var BaseVectorLayer = class extends Layer {
		/**
		* @param {Options<FeatureType, VectorSourceType>} [options] Options.
		*/
		constructor(options) {
			options = options ? options : {};
			const baseOptions = Object.assign({}, options);
			delete baseOptions.style;
			delete baseOptions.renderBuffer;
			delete baseOptions.updateWhileAnimating;
			delete baseOptions.updateWhileInteracting;
			super(baseOptions);
			/**
			* @private
			* @type {string}
			*/
			this.declutter_ = options.declutter ? String(options.declutter) : void 0;
			/**
			* @type {number}
			* @private
			*/
			this.renderBuffer_ = options.renderBuffer !== void 0 ? options.renderBuffer : 100;
			/**
			* User provided style.
			* @type {import("../style/Style.js").StyleLike|import("../style/flat.js").FlatStyleLike}
			* @private
			*/
			this.style_ = null;
			/**
			* Style function for use within the library.
			* @type {import("../style/Style.js").StyleFunction|undefined}
			* @private
			*/
			this.styleFunction_ = void 0;
			this.setStyle(options.style);
			/**
			* @type {boolean}
			* @private
			*/
			this.updateWhileAnimating_ = options.updateWhileAnimating !== void 0 ? options.updateWhileAnimating : false;
			/**
			* @type {boolean}
			* @private
			*/
			this.updateWhileInteracting_ = options.updateWhileInteracting !== void 0 ? options.updateWhileInteracting : false;
		}
		/**
		* @return {string} Declutter group.
		* @override
		*/
		getDeclutter() {
			return this.declutter_;
		}
		/**
		* Get the topmost feature that intersects the given pixel on the viewport. Returns a promise
		* that resolves with an array of features. The array will either contain the topmost feature
		* when a hit was detected, or it will be empty.
		*
		* The hit detection algorithm used for this method is optimized for performance, but is less
		* accurate than the one used in [map.getFeaturesAtPixel()]{@link import("../Map.js").default#getFeaturesAtPixel}.
		* Text is not considered, and icons are only represented by their bounding box instead of the exact
		* image.
		*
		* @param {import("../pixel.js").Pixel} pixel Pixel.
		* @return {Promise<Array<import("../Feature.js").FeatureLike>>} Promise that resolves with an array of features.
		* @api
		* @override
		*/
		getFeatures(pixel) {
			return super.getFeatures(pixel);
		}
		/**
		* @return {number|undefined} Render buffer.
		*/
		getRenderBuffer() {
			return this.renderBuffer_;
		}
		/**
		* @return {import("../render.js").OrderFunction|null|undefined} Render order.
		*/
		getRenderOrder() {
			return this.get(Property.RENDER_ORDER);
		}
		/**
		* Get the style for features.  This returns whatever was passed to the `style`
		* option at construction or to the `setStyle` method.
		* @return {import("../style/Style.js").StyleLike|import("../style/flat.js").FlatStyleLike|null|undefined} Layer style.
		* @api
		*/
		getStyle() {
			return this.style_;
		}
		/**
		* Get the style function.
		* @return {import("../style/Style.js").StyleFunction|undefined} Layer style function.
		* @api
		*/
		getStyleFunction() {
			return this.styleFunction_;
		}
		/**
		* @return {boolean} Whether the rendered layer should be updated while
		*     animating.
		*/
		getUpdateWhileAnimating() {
			return this.updateWhileAnimating_;
		}
		/**
		* @return {boolean} Whether the rendered layer should be updated while
		*     interacting.
		*/
		getUpdateWhileInteracting() {
			return this.updateWhileInteracting_;
		}
		/**
		* Render declutter items for this layer
		* @param {import("../Map.js").FrameState} frameState Frame state.
		* @param {import("../layer/Layer.js").State} layerState Layer state.
		* @override
		*/
		renderDeclutter(frameState, layerState) {
			const declutterGroup = this.getDeclutter();
			if (declutterGroup in frameState.declutter === false) frameState.declutter[declutterGroup] = new RBush(9);
			this.getRenderer().renderDeclutter(frameState, layerState);
		}
		/**
		* @param {import("../render.js").OrderFunction|null|undefined} renderOrder
		*     Render order.
		*/
		setRenderOrder(renderOrder) {
			this.set(Property.RENDER_ORDER, renderOrder);
		}
		/**
		* Set the style for features.  This can be a single style object, an array
		* of styles, or a function that takes a feature and resolution and returns
		* an array of styles. If set to `null`, the layer has no style (a `null` style),
		* so only features that have their own styles will be rendered in the layer. Call
		* `setStyle()` without arguments to reset to the default style. See
		* [the ol/style/Style module]{@link module:ol/style/Style~Style} for information on the default style.
		*
		* If your layer has a static style, you can use [flat style]{@link module:ol/style/flat~FlatStyle} object
		* literals instead of using the `Style` and symbolizer constructors (`Fill`, `Stroke`, etc.):
		* ```js
		* vectorLayer.setStyle({
		*   "fill-color": "yellow",
		*   "stroke-color": "black",
		*   "stroke-width": 4
		* })
		* ```
		*
		* @param {import("../style/Style.js").StyleLike|import("../style/flat.js").FlatStyleLike|null} [style] Layer style.
		* @api
		*/
		setStyle(style) {
			this.style_ = style === void 0 ? createDefaultStyle : style;
			const styleLike = toStyleLike(style);
			this.styleFunction_ = style === null ? void 0 : toFunction(styleLike);
			this.changed();
		}
		/**
		* @param {boolean|string|number} declutter Declutter images and text.
		* @api
		*/
		setDeclutter(declutter) {
			this.declutter_ = declutter ? String(declutter) : void 0;
			this.changed();
		}
	};
	/**
	* Coerce the allowed style types into a shorter list of types.  Flat styles, arrays of flat
	* styles, and arrays of rules are converted into style functions.
	*
	* @param {import("../style/Style.js").StyleLike|import("../style/flat.js").FlatStyleLike|null} [style] Layer style.
	* @return {import("../style/Style.js").StyleLike|null} The style.
	*/
	function toStyleLike(style) {
		if (style === void 0) return createDefaultStyle;
		if (!style) return null;
		if (typeof style === "function") return style;
		if (style instanceof Style) return style;
		if (Array.isArray(style) && style.length === 0) return [];
		if (Array.isArray(style) && style[0] instanceof Style) {
			const length = style.length;
			const styles = new Array(length);
			for (let i = 0; i < length; ++i) {
				const candidate = style[i];
				if (!(candidate instanceof Style)) throw new Error("Expected a list of style instances");
				styles[i] = candidate;
			}
			return styles;
		}
		return flatStyleLikeToStyleFunction(style);
	}
	//#endregion
	//#region src/ol/render/Event.js
	/**
	* @module ol/render/Event
	*/
	var RenderEvent = class extends BaseEvent {
		/**
		* @param {import("./EventType.js").default} type Type.
		* @param {import("../transform.js").Transform} [inversePixelTransform] Transform for
		*     CSS pixels to rendered pixels.
		* @param {import("../Map.js").FrameState} [frameState] Frame state.
		* @param {?(CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D|WebGLRenderingContext)} [context] Context.
		*/
		constructor(type, inversePixelTransform, frameState, context) {
			super(type);
			/**
			* Transform from CSS pixels (relative to the top-left corner of the map viewport)
			* to rendered pixels on this event's `context`. Only available when a Canvas renderer is used, null otherwise.
			* @type {import("../transform.js").Transform|undefined}
			* @api
			*/
			this.inversePixelTransform = inversePixelTransform;
			/**
			* An object representing the current render frame state.
			* @type {import("../Map.js").FrameState|undefined}
			* @api
			*/
			this.frameState = frameState;
			/**
			* Canvas context. Not available when the event is dispatched by the map. For Canvas 2D layers,
			* the context will be the 2D rendering context.  For WebGL layers, the context will be the WebGL
			* context.
			* @type {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D|WebGLRenderingContext|undefined}
			* @api
			*/
			this.context = context;
		}
	};
	//#endregion
	//#region src/ol/renderer/Map.js
	/**
	* @module ol/renderer/Map
	*/
	/**
	* @template T
	* @typedef HitMatch
	* @property {import("../Feature.js").FeatureLike} feature Feature.
	* @property {import("../layer/Layer.js").default} layer Layer.
	* @property {import("../geom/SimpleGeometry.js").default} geometry Geometry.
	* @property {number} distanceSq Squared distance.
	* @property {import("./vector.js").FeatureCallback<T>} callback Callback.
	*/
	/**
	* @abstract
	*/
	var MapRenderer = class extends Disposable {
		/**
		* @param {import("../Map.js").default} map Map.
		*/
		constructor(map) {
			super();
			/**
			* @private
			* @type {import("../Map.js").default}
			*/
			this.map_ = map;
		}
		/**
		* @abstract
		* @param {import("../render/EventType.js").default} type Event type.
		* @param {import("../Map.js").FrameState} frameState Frame state.
		*/
		dispatchRenderEvent(type, frameState) {
			abstract();
		}
		/**
		* @param {import("../Map.js").FrameState} frameState FrameState.
		* @protected
		*/
		calculateMatrices2D(frameState) {
			const viewState = frameState.viewState;
			const coordinateToPixelTransform = frameState.coordinateToPixelTransform;
			const pixelToCoordinateTransform = frameState.pixelToCoordinateTransform;
			compose(coordinateToPixelTransform, frameState.size[0] / 2, frameState.size[1] / 2, 1 / viewState.resolution, -1 / viewState.resolution, -viewState.rotation, -viewState.center[0], -viewState.center[1]);
			makeInverse(pixelToCoordinateTransform, coordinateToPixelTransform);
		}
		/**
		* @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
		* @param {import("../Map.js").FrameState} frameState FrameState.
		* @param {number} hitTolerance Hit tolerance in pixels.
		* @param {boolean} checkWrapped Check for wrapped geometries.
		* @param {import("./vector.js").FeatureCallback<T>} callback Feature callback.
		* @param {S} thisArg Value to use as `this` when executing `callback`.
		* @param {function(this: U, import("../layer/Layer.js").default): boolean} layerFilter Layer filter
		*     function, only layers which are visible and for which this function
		*     returns `true` will be tested for features.  By default, all visible
		*     layers will be tested.
		* @param {U} thisArg2 Value to use as `this` when executing `layerFilter`.
		* @return {T|undefined} Callback result.
		* @template S,T,U
		*/
		forEachFeatureAtCoordinate(coordinate, frameState, hitTolerance, checkWrapped, callback, thisArg, layerFilter, thisArg2) {
			let result;
			const viewState = frameState.viewState;
			/**
			* @param {boolean} managed Managed layer.
			* @param {import("../Feature.js").FeatureLike} feature Feature.
			* @param {import("../layer/Layer.js").default} layer Layer.
			* @param {import("../geom/Geometry.js").default} geometry Geometry.
			* @return {T|undefined} Callback result.
			*/
			function forEachFeatureAtCoordinate(managed, feature, layer, geometry) {
				return callback.call(thisArg, feature, managed ? layer : null, geometry);
			}
			const projection = viewState.projection;
			const translatedCoordinate = wrapX$1(coordinate.slice(), projection);
			const offsets = [[0, 0]];
			if (projection.canWrapX() && checkWrapped) {
				const worldWidth = getWidth(projection.getExtent());
				offsets.push([-worldWidth, 0], [worldWidth, 0]);
			}
			const layerStates = frameState.layerStatesArray;
			const numLayers = layerStates.length;
			const matches = [];
			const tmpCoord = [];
			for (let i = 0; i < offsets.length; i++) for (let j = numLayers - 1; j >= 0; --j) {
				const layerState = layerStates[j];
				const layer = layerState.layer;
				if (layer.hasRenderer() && inView(layerState, viewState) && layerFilter.call(thisArg2, layer)) {
					const layerRenderer = layer.getRenderer();
					const source = layer.getSource();
					if (layerRenderer && source) {
						const coordinates = source.getWrapX() ? translatedCoordinate : coordinate;
						const callback = forEachFeatureAtCoordinate.bind(null, layerState.managed);
						tmpCoord[0] = coordinates[0] + offsets[i][0];
						tmpCoord[1] = coordinates[1] + offsets[i][1];
						result = layerRenderer.forEachFeatureAtCoordinate(tmpCoord, frameState, hitTolerance, callback, matches);
					}
					if (result) return result;
				}
			}
			if (matches.length === 0) return;
			const order = 1 / matches.length;
			matches.forEach((m, i) => m.distanceSq += i * order);
			matches.sort((a, b) => a.distanceSq - b.distanceSq);
			matches.some((m) => {
				return result = m.callback(m.feature, m.layer, m.geometry);
			});
			return result;
		}
		/**
		* @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
		* @param {import("../Map.js").FrameState} frameState FrameState.
		* @param {number} hitTolerance Hit tolerance in pixels.
		* @param {boolean} checkWrapped Check for wrapped geometries.
		* @param {function(this: U, import("../layer/Layer.js").default): boolean} layerFilter Layer filter
		*     function, only layers which are visible and for which this function
		*     returns `true` will be tested for features.  By default, all visible
		*     layers will be tested.
		* @param {U} thisArg Value to use as `this` when executing `layerFilter`.
		* @return {boolean} Is there a feature at the given coordinate?
		* @template U
		*/
		hasFeatureAtCoordinate(coordinate, frameState, hitTolerance, checkWrapped, layerFilter, thisArg) {
			return this.forEachFeatureAtCoordinate(coordinate, frameState, hitTolerance, checkWrapped, TRUE, this, layerFilter, thisArg) !== void 0;
		}
		/**
		* @return {import("../Map.js").default} Map.
		*/
		getMap() {
			return this.map_;
		}
		/**
		* Render.
		* @abstract
		* @param {?import("../Map.js").FrameState} frameState Frame state.
		*/
		renderFrame(frameState) {
			abstract();
		}
		/**
		* @param {import("../Map.js").FrameState} frameState Frame state.
		* @protected
		*/
		scheduleExpireIconCache(frameState) {
			if (shared.canExpireCache()) frameState.postRenderFunctions.push(expireIconCache);
		}
	};
	/**
	* @param {import("../Map.js").default} map Map.
	* @param {import("../Map.js").FrameState} frameState Frame state.
	*/
	function expireIconCache(map, frameState) {
		shared.expire();
	}
	//#endregion
	//#region src/ol/renderer/Composite.js
	/**
	* @module ol/renderer/Composite
	*/
	/**
	* @classdesc
	* Canvas map renderer.
	* @api
	*/
	var CompositeMapRenderer = class extends MapRenderer {
		/**
		* @param {import("../Map.js").default} map Map.
		*/
		constructor(map) {
			super(map);
			/**
			* @private
			* @type {import("../events.js").EventsKey}
			*/
			this.fontChangeListenerKey_ = listen(checkedFonts, ObjectEventType_default.PROPERTYCHANGE, map.redrawText, map);
			/**
			* @private
			* @type {HTMLDivElement}
			*/
			this.element_ = WORKER_OFFSCREEN_CANVAS ? createMockDiv() : document.createElement("div");
			const style = this.element_.style;
			style.position = "absolute";
			style.width = "100%";
			style.height = "100%";
			style.zIndex = "0";
			this.element_.className = "ol-unselectable ol-layers";
			const container = map.getViewport();
			if (container) container.insertBefore(this.element_, container.firstChild || null);
			/**
			* @private
			* @type {Array<HTMLElement>}
			*/
			this.children_ = [];
			/**
			* @private
			* @type {boolean}
			*/
			this.renderedVisible_ = true;
		}
		/**
		* @param {import("../render/EventType.js").default} type Event type.
		* @param {import("../Map.js").FrameState} frameState Frame state.
		* @override
		*/
		dispatchRenderEvent(type, frameState) {
			const map = this.getMap();
			if (map.hasListener(type)) {
				const event = new RenderEvent(type, void 0, frameState);
				map.dispatchEvent(event);
			}
		}
		/**
		* @override
		*/
		disposeInternal() {
			unlistenByKey(this.fontChangeListenerKey_);
			this.element_.remove();
			super.disposeInternal();
		}
		/**
		* Render.
		* @param {?import("../Map.js").FrameState} frameState Frame state.
		* @override
		*/
		renderFrame(frameState) {
			if (!frameState) {
				if (this.renderedVisible_) {
					this.element_.style.display = "none";
					this.renderedVisible_ = false;
				}
				return;
			}
			this.calculateMatrices2D(frameState);
			this.dispatchRenderEvent(EventType_default.PRECOMPOSE, frameState);
			const layerStatesArray = frameState.layerStatesArray.sort((a, b) => a.zIndex - b.zIndex);
			if (layerStatesArray.some((layerState) => layerState.layer instanceof BaseVectorLayer && layerState.layer.getDeclutter())) frameState.declutter = {};
			const viewState = frameState.viewState;
			this.children_.length = 0;
			const mapCanvas = this.getMap().getTargetElement();
			/** @type {CanvasRenderingContext2D|undefined} */
			let mapContext;
			if (isCanvas(mapCanvas)) {
				mapContext = mapCanvas.getContext("2d");
				mapContext.setTransform(1, 0, 0, 1, 0, 0);
				mapContext.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
			}
			const renderedLayerStates = [];
			let previousElement = mapContext ? mapCanvas : null;
			for (let i = 0, ii = layerStatesArray.length; i < ii; ++i) {
				const layerState = layerStatesArray[i];
				frameState.layerIndex = i;
				const layer = layerState.layer;
				const sourceState = layer.getSourceState();
				if (!inView(layerState, viewState) || sourceState != "ready" && sourceState != "undefined") {
					layer.unrender();
					continue;
				}
				const element = layer.render(frameState, previousElement);
				if (!element) continue;
				if (element !== previousElement) {
					this.children_.push(element);
					previousElement = element;
				}
				renderedLayerStates.push(layerState);
			}
			this.declutter(frameState, renderedLayerStates);
			replaceChildren(this.element_, this.children_);
			for (const container of mapContext ? this.children_ : []) {
				const canvas = container.firstElementChild || container;
				const backgroundColor = container.style.backgroundColor;
				if (backgroundColor && (!isCanvas(canvas) || canvas.width > 0)) {
					mapContext.fillStyle = backgroundColor;
					mapContext.fillRect(0, 0, mapContext.canvas.width, mapContext.canvas.height);
				}
				if (!isCanvas(canvas) || canvas.width === 0) continue;
				mapContext.save();
				const opacity = container.style.opacity || canvas.style.opacity;
				mapContext.globalAlpha = opacity === "" ? 1 : Number(opacity);
				const transform = canvas.style.transform;
				if (transform) mapContext.transform(...fromString$1(transform));
				else {
					const w = parseFloat(canvas.style.width) / canvas.width;
					const h = parseFloat(canvas.style.height) / canvas.height;
					mapContext.transform(w, 0, 0, h, 0, 0);
				}
				mapContext.drawImage(canvas, 0, 0);
				mapContext.restore();
			}
			this.dispatchRenderEvent(EventType_default.POSTCOMPOSE, frameState);
			if (!this.renderedVisible_) {
				this.element_.style.display = "";
				this.renderedVisible_ = true;
			}
			this.scheduleExpireIconCache(frameState);
		}
		/**
		* @param {import("../Map.js").FrameState} frameState Frame state.
		* @param {Array<import('../layer/Layer.js').State>} layerStates Layers.
		*/
		declutter(frameState, layerStates) {
			if (!frameState.declutter) return;
			for (let i = layerStates.length - 1; i >= 0; --i) {
				const layerState = layerStates[i];
				const layer = layerState.layer;
				if (layer.getDeclutter()) layer.renderDeclutter(frameState, layerState);
			}
			layerStates.forEach((layerState) => layerState.layer.renderDeferred(frameState));
		}
	};
	//#endregion
	//#region src/ol/Map.js
	/**
	* @module ol/Map
	*/
	/**
	* State of the current frame. Only `pixelRatio`, `time` and `viewState` should
	* be used in applications.
	* @typedef {Object} FrameState
	* @property {number} pixelRatio The pixel ratio of the frame.
	* @property {number} time The time when rendering of the frame was requested.
	* @property {import("./View.js").State} viewState The state of the current view.
	* @property {boolean} animate Animate.
	* @property {import("./transform.js").Transform} coordinateToPixelTransform CoordinateToPixelTransform.
	* @property {Object<string, import("rbush").default<import('./render/canvas/Executor.js').DeclutterEntry>>|null} declutter
	* Declutter trees by declutter group.
	* When null, no decluttering is needed because no layers have decluttering enabled.
	* @property {null|import("./extent.js").Extent} extent Extent (in view projection coordinates).
	* @property {import("./extent.js").Extent} [nextExtent] Next extent during an animation series.
	* @property {number} index Index.
	* @property {Array<import("./layer/Layer.js").State>} layerStatesArray LayerStatesArray.
	* @property {number} layerIndex LayerIndex.
	* @property {import("./transform.js").Transform} pixelToCoordinateTransform PixelToCoordinateTransform.
	* @property {Array<PostRenderFunction>} postRenderFunctions PostRenderFunctions.
	* @property {import("./size.js").Size} size Size.
	* @property {TileQueue} tileQueue TileQueue.
	* @property {!Object<string, Object<string, boolean>>} usedTiles UsedTiles.
	* @property {Array<number>} viewHints ViewHints.
	* @property {!Object<string, Object<string, boolean>>} wantedTiles WantedTiles.
	* @property {string} mapId The id of the map.
	* @property {Object<string, boolean>} renderTargets Identifiers of previously rendered elements.
	*/
	/**
	* @typedef {function(Map, FrameState): any} PostRenderFunction
	*/
	/**
	* @typedef {Object} AtPixelOptions
	* @property {undefined|function(import("./layer/Layer.js").default<import("./source/Source.js").default>): boolean} [layerFilter] Layer filter
	* function. The filter function will receive one argument, the
	* {@link module:ol/layer/Layer~Layer layer-candidate} and it should return a boolean value.
	* Only layers which are visible and for which this function returns `true`
	* will be tested for features. By default, all visible layers will be tested.
	* @property {number} [hitTolerance=0] Hit-detection tolerance in css pixels. Pixels
	* inside the radius around the given position will be checked for features.
	* @property {boolean} [checkWrapped=true] Check-Wrapped Will check for wrapped geometries inside the range of
	*   +/- 1 world width. Works only if a projection is used that can be wrapped.
	*/
	/**
	* @typedef {Object} MapOptionsInternal
	* @property {Collection<import("./control/Control.js").default>} [controls] Controls.
	* @property {Collection<import("./interaction/Interaction.js").default>} [interactions] Interactions.
	* @property {HTMLElement|Document} keyboardEventTarget KeyboardEventTarget.
	* @property {Collection<import("./Overlay.js").default>} overlays Overlays.
	* @property {Object<string, *>} values Values.
	*/
	/**
	* @typedef {import("./ObjectEventType.js").Types|'change:layergroup'|'change:size'|'change:target'|'change:view'} MapObjectEventTypes
	*/
	/***
	* @template Return
	* @typedef {import("./Observable.js").OnSignature<import("./Observable.js").EventTypes, import("./events/Event.js").default, Return> &
	*    import("./Observable.js").OnSignature<MapObjectEventTypes, import("./Object.js").ObjectEvent, Return> &
	*    import("./Observable.js").OnSignature<import("./MapBrowserEventType.js").Types, import("./MapBrowserEvent.js").default, Return> &
	*    import("./Observable.js").OnSignature<import("./MapEventType.js").Types, import("./MapEvent.js").default, Return> &
	*    import("./Observable.js").OnSignature<import("./render/EventType.js").MapRenderEventTypes, import("./render/Event.js").default, Return> &
	*    import("./Observable.js").CombinedOnSignature<import("./Observable.js").EventTypes|MapObjectEventTypes|
	*      import("./MapBrowserEventType.js").Types|import("./MapEventType.js").Types|
	*      import("./render/EventType.js").MapRenderEventTypes, Return>} MapEventHandler
	*/
	/**
	* Object literal with config options for the map.
	* @typedef {Object} MapOptions
	* @property {Collection<import("./control/Control.js").default>|Array<import("./control/Control.js").default>} [controls]
	* Controls initially added to the map. If not specified,
	* {@link module:ol/control/defaults.defaults} is used. In a worker, no controls are added by default.
	* @property {number} [pixelRatio=window.devicePixelRatio] The ratio between
	* physical pixels and device-independent pixels (dips) on the device.
	* @property {Collection<import("./interaction/Interaction.js").default>|Array<import("./interaction/Interaction.js").default>} [interactions]
	* Interactions that are initially added to the map. If not specified,
	* {@link module:ol/interaction/defaults.defaults} is used. In a worker, no interactions are added by default.
	* @property {HTMLElement|Document|string} [keyboardEventTarget] The element to
	* listen to keyboard events on. This determines when the `KeyboardPan` and
	* `KeyboardZoom` interactions trigger. For example, if this option is set to
	* `document` the keyboard interactions will always trigger. If this option is
	* not specified, the element the library listens to keyboard events on is the
	* map target (i.e. the user-provided div for the map). If this is not
	* `document`, the target element needs to be focused for key events to be
	* emitted, requiring that the target element has a `tabindex` attribute.
	* @property {Array<import("./layer/Base.js").default>|Collection<import("./layer/Base.js").default>|LayerGroup} [layers]
	* Layers. If this is not defined, a map with no layers will be rendered. Note
	* that layers are rendered in the order supplied, so if you want, for example,
	* a vector layer to appear on top of a tile layer, it must come after the tile
	* layer.
	* @property {number} [maxTilesLoading=16] Maximum number tiles to load
	* simultaneously.
	* @property {number} [moveTolerance=1] The minimum distance in pixels the
	* cursor must move to be detected as a map move event instead of a click.
	* Increasing this value can make it easier to click on the map.
	* @property {Collection<import("./Overlay.js").default>|Array<import("./Overlay.js").default>} [overlays]
	* Overlays initially added to the map. By default, no overlays are added.
	* @property {HTMLElement|string|HTMLCanvasElement|OffscreenCanvas} [target] The container for the map, either the
	* element itself or the `id` of the element. If not specified at construction
	* time, {@link module:ol/Map~Map#setTarget} must be called for the map to be
	* rendered. If passed by element, the container can be in a secondary document.
	* For use in workers or when exporting a map, use an `OffscreenCanvas` or `HTMLCanvasElement` as target,
	* with a width and height in physical pixels, optionally multiplied by and a scale transform matching
	* the map's pixel ratio.
	* For accessibility (focus and keyboard events for map navigation), the `target` element must have a
	*  properly configured `tabindex` attribute. If the `target` element is inside a Shadow DOM, the
	*  `tabindex` atribute must be set on the custom element's host element.
	* **Note:** CSS `transform` support for the target element is limited to `scale`.
	* @property {View|Promise<import("./View.js").ViewOptions>} [view] The map's view.  No layer sources will be
	* fetched unless this is specified at construction time or through
	* {@link module:ol/Map~Map#setView}.
	*/
	/**
	* @param {import("./layer/Base.js").default} layer Layer.
	*/
	function removeLayerMapProperty(layer) {
		if (layer instanceof Layer) {
			layer.setMapInternal(null);
			return;
		}
		if (layer instanceof LayerGroup) layer.getLayers().forEach(removeLayerMapProperty);
	}
	/**
	* @param {import("./layer/Base.js").default} layer Layer.
	* @param {Map} map Map.
	*/
	function setLayerMapProperty(layer, map) {
		if (layer instanceof Layer) {
			layer.setMapInternal(map);
			return;
		}
		if (layer instanceof LayerGroup) {
			const layers = layer.getLayers().getArray();
			for (let i = 0, ii = layers.length; i < ii; ++i) setLayerMapProperty(layers[i], map);
		}
	}
	/**
	* @classdesc
	* The map is the core component of OpenLayers. For a map to render, a view,
	* one or more layers, and a target container are needed:
	*
	*     import Map from 'ol/Map.js';
	*     import View from 'ol/View.js';
	*     import TileLayer from 'ol/layer/Tile.js';
	*     import OSM from 'ol/source/OSM.js';
	*
	*     const map = new Map({
	*       view: new View({
	*         center: [0, 0],
	*         zoom: 1,
	*       }),
	*       layers: [
	*         new TileLayer({
	*           source: new OSM(),
	*         }),
	*       ],
	*       target: 'map',
	*     });
	*
	* The above snippet creates a map using a {@link module:ol/layer/Tile~TileLayer} to
	* display {@link module:ol/source/OSM~OSM} OSM data and render it to a DOM
	* element with the id `map`.
	*
	* The constructor places a viewport container (with CSS class name
	* `ol-viewport`) in the target element (see `getViewport()`), and then two
	* further elements within the viewport: one with CSS class name
	* `ol-overlaycontainer-stopevent` for controls and some overlays, and one with
	* CSS class name `ol-overlaycontainer` for other overlays (see the `stopEvent`
	* option of {@link module:ol/Overlay~Overlay} for the difference). The map
	* itself is placed in a further element within the viewport.
	*
	* Layers are stored as a {@link module:ol/Collection~Collection} in
	* layerGroups. A top-level group is provided by the library. This is what is
	* accessed by `getLayerGroup` and `setLayerGroup`. Layers entered in the
	* options are added to this group, and `addLayer` and `removeLayer` change the
	* layer collection in the group. `getLayers` is a convenience function for
	* `getLayerGroup().getLayers()`. Note that {@link module:ol/layer/Group~LayerGroup}
	* is a subclass of {@link module:ol/layer/Base~BaseLayer}, so layers entered in the
	* options or added with `addLayer` can be groups, which can contain further
	* groups, and so on.
	*
	* @fires import("./MapBrowserEvent.js").MapBrowserEvent
	* @fires import("./MapEvent.js").MapEvent
	* @fires import("./render/Event.js").default#precompose
	* @fires import("./render/Event.js").default#postcompose
	* @fires import("./render/Event.js").default#rendercomplete
	* @api
	*/
	var Map$1 = class extends BaseObject {
		/**
		* @param {MapOptions} [options] Map options.
		*/
		constructor(options) {
			super();
			options = options || {};
			/***
			* @type {MapEventHandler<import("./events.js").EventsKey>}
			*/
			this.on;
			/***
			* @type {MapEventHandler<import("./events.js").EventsKey>}
			*/
			this.once;
			/***
			* @type {MapEventHandler<void>}
			*/
			this.un;
			const optionsInternal = createOptionsInternal(options);
			/**
			* @private
			* @type {boolean}
			*/
			this.renderComplete_ = false;
			/**
			* @private
			* @type {boolean}
			*/
			this.loaded_ = true;
			/** @private */
			this.boundHandleBrowserEvent_ = this.handleBrowserEvent.bind(this);
			/**
			* @type {number}
			* @private
			*/
			this.maxTilesLoading_ = options.maxTilesLoading !== void 0 ? options.maxTilesLoading : 16;
			/**
			* @private
			* @type {number}
			*/
			this.pixelRatio_ = options.pixelRatio !== void 0 ? options.pixelRatio : DEVICE_PIXEL_RATIO;
			/**
			* @private
			* @type {ReturnType<typeof setTimeout>}
			*/
			this.postRenderTimeoutHandle_;
			/**
			* @private
			* @type {number|undefined}
			*/
			this.animationDelayKey_;
			/**
			* @private
			*/
			this.animationDelay_ = this.animationDelay_.bind(this);
			/**
			* @private
			* @type {import("./transform.js").Transform}
			*/
			this.coordinateToPixelTransform_ = create();
			/**
			* @private
			* @type {import("./transform.js").Transform}
			*/
			this.pixelToCoordinateTransform_ = create();
			/**
			* @private
			* @type {number}
			*/
			this.frameIndex_ = 0;
			/**
			* @private
			* @type {?FrameState}
			*/
			this.frameState_ = null;
			/**
			* The extent at the previous 'moveend' event.
			* @private
			* @type {import("./extent.js").Extent}
			*/
			this.previousExtent_ = null;
			/**
			* @private
			* @type {?import("./events.js").EventsKey}
			*/
			this.viewPropertyListenerKey_ = null;
			/**
			* @private
			* @type {?import("./events.js").EventsKey}
			*/
			this.viewChangeListenerKey_ = null;
			/**
			* @private
			* @type {?Array<import("./events.js").EventsKey>}
			*/
			this.layerGroupPropertyListenerKeys_ = null;
			/**
			* @private
			* @type {!HTMLElement}
			*/
			if (!WORKER_OFFSCREEN_CANVAS) {
				this.viewport_ = document.createElement("div");
				this.viewport_.className = "ol-viewport" + ("ontouchstart" in window ? " ol-touch" : "");
				this.viewport_.style.position = "relative";
				this.viewport_.style.overflow = "hidden";
				this.viewport_.style.width = "100%";
				this.viewport_.style.height = "100%";
				/**
				* @private
				* @type {!HTMLElement}
				*/
				this.overlayContainer_ = document.createElement("div");
				this.overlayContainer_.style.position = "absolute";
				this.overlayContainer_.style.zIndex = "0";
				this.overlayContainer_.style.width = "100%";
				this.overlayContainer_.style.height = "100%";
				this.overlayContainer_.style.pointerEvents = "none";
				this.overlayContainer_.className = "ol-overlaycontainer";
				this.viewport_.appendChild(this.overlayContainer_);
				/**
				* @private
				* @type {!HTMLElement}
				*/
				this.overlayContainerStopEvent_ = document.createElement("div");
				this.overlayContainerStopEvent_.style.position = "absolute";
				this.overlayContainerStopEvent_.style.zIndex = "0";
				this.overlayContainerStopEvent_.style.width = "100%";
				this.overlayContainerStopEvent_.style.height = "100%";
				this.overlayContainerStopEvent_.style.pointerEvents = "none";
				this.overlayContainerStopEvent_.className = "ol-overlaycontainer-stopevent";
				this.viewport_.appendChild(this.overlayContainerStopEvent_);
			}
			/**
			* @private
			* @type {MapBrowserEventHandler}
			*/
			this.mapBrowserEventHandler_ = null;
			/**
			* @private
			* @type {number}
			*/
			this.moveTolerance_ = options.moveTolerance;
			/**
			* @private
			* @type {HTMLElement|Document}
			*/
			this.keyboardEventTarget_ = optionsInternal.keyboardEventTarget;
			/**
			* @private
			* @type {?Array<import("./events.js").EventsKey>}
			*/
			this.targetChangeHandlerKeys_ = null;
			/**
			* @private
			* @type {HTMLElement|null}
			*/
			this.targetElement_ = null;
			if (!WORKER_OFFSCREEN_CANVAS)
 /**
			* @private
			* @type {ResizeObserver}
			*/
			this.resizeObserver_ = new ResizeObserver(() => this.updateSize());
			/**
			* @type {Collection<import("./control/Control.js").default>}
			* @protected
			*/
			this.controls = optionsInternal.controls || (WORKER_OFFSCREEN_CANVAS ? new Collection() : defaults$1());
			/**
			* @type {Collection<import("./interaction/Interaction.js").default>}
			* @protected
			*/
			this.interactions = optionsInternal.interactions || (WORKER_OFFSCREEN_CANVAS ? new Collection() : defaults({ onFocusOnly: true }));
			/**
			* @type {Collection<import("./Overlay.js").default>}
			* @private
			*/
			this.overlays_ = optionsInternal.overlays;
			/**
			* A lookup of overlays by id.
			* @private
			* @type {Object<string, import("./Overlay.js").default>}
			*/
			this.overlayIdIndex_ = {};
			/**
			* @type {import("./renderer/Map.js").default|null}
			* @private
			*/
			this.renderer_ = null;
			/**
			* @private
			* @type {!Array<PostRenderFunction>}
			*/
			this.postRenderFunctions_ = [];
			/**
			* @private
			* @type {TileQueue}
			*/
			this.tileQueue_ = new TileQueue(this.getTilePriority.bind(this), this.handleTileChange_.bind(this));
			this.addChangeListener(MapProperty_default.LAYERGROUP, this.handleLayerGroupChanged_);
			this.addChangeListener(MapProperty_default.VIEW, this.handleViewChanged_);
			this.addChangeListener(MapProperty_default.SIZE, this.handleSizeChanged_);
			this.addChangeListener(MapProperty_default.TARGET, this.handleTargetChanged_);
			this.setProperties(optionsInternal.values);
			const map = this;
			if (options.view && !(options.view instanceof View)) options.view.then(function(viewOptions) {
				map.setView(new View(viewOptions));
			});
			this.controls.addEventListener(
				CollectionEventType_default.ADD,
				/**
				* @param {import("./Collection.js").CollectionEvent<import("./control/Control.js").default>} event CollectionEvent
				*/
				(event) => {
					event.element.setMap(this);
				}
			);
			this.controls.addEventListener(
				CollectionEventType_default.REMOVE,
				/**
				* @param {import("./Collection.js").CollectionEvent<import("./control/Control.js").default>} event CollectionEvent.
				*/
				(event) => {
					event.element.setMap(null);
				}
			);
			this.interactions.addEventListener(
				CollectionEventType_default.ADD,
				/**
				* @param {import("./Collection.js").CollectionEvent<import("./interaction/Interaction.js").default>} event CollectionEvent.
				*/
				(event) => {
					event.element.setMap(this);
				}
			);
			this.interactions.addEventListener(
				CollectionEventType_default.REMOVE,
				/**
				* @param {import("./Collection.js").CollectionEvent<import("./interaction/Interaction.js").default>} event CollectionEvent.
				*/
				(event) => {
					event.element.setMap(null);
				}
			);
			this.overlays_.addEventListener(
				CollectionEventType_default.ADD,
				/**
				* @param {import("./Collection.js").CollectionEvent<import("./Overlay.js").default>} event CollectionEvent.
				*/
				(event) => {
					this.addOverlayInternal_(event.element);
				}
			);
			this.overlays_.addEventListener(
				CollectionEventType_default.REMOVE,
				/**
				* @param {import("./Collection.js").CollectionEvent<import("./Overlay.js").default>} event CollectionEvent.
				*/
				(event) => {
					const id = event.element.getId();
					if (id !== void 0) delete this.overlayIdIndex_[id.toString()];
					event.element.setMap(null);
				}
			);
			this.controls.forEach(
				/**
				* @param {import("./control/Control.js").default} control Control.
				*/
				(control) => {
					control.setMap(this);
				}
			);
			this.interactions.forEach(
				/**
				* @param {import("./interaction/Interaction.js").default} interaction Interaction.
				*/
				(interaction) => {
					interaction.setMap(this);
				}
			);
			this.overlays_.forEach(this.addOverlayInternal_.bind(this));
		}
		/**
		* Add the given control to the map.
		* @param {import("./control/Control.js").default} control Control.
		* @api
		*/
		addControl(control) {
			this.getControls().push(control);
		}
		/**
		* Add the given interaction to the map. If you want to add an interaction
		* at another point of the collection use `getInteractions()` and the methods
		* available on {@link module:ol/Collection~Collection}. This can be used to
		* stop the event propagation from the handleEvent function. The interactions
		* get to handle the events in the reverse order of this collection.
		* @param {import("./interaction/Interaction.js").default} interaction Interaction to add.
		* @api
		*/
		addInteraction(interaction) {
			this.getInteractions().push(interaction);
		}
		/**
		* Adds the given layer to the top of this map. If you want to add a layer
		* elsewhere in the stack, use `getLayers()` and the methods available on
		* {@link module:ol/Collection~Collection}.
		* @param {import("./layer/Base.js").default} layer Layer.
		* @api
		*/
		addLayer(layer) {
			this.getLayerGroup().getLayers().push(layer);
		}
		/**
		* @param {import("./layer/Group.js").GroupEvent} event The layer add event.
		* @private
		*/
		handleLayerAdd_(event) {
			setLayerMapProperty(event.layer, this);
		}
		/**
		* Add the given overlay to the map.
		* @param {import("./Overlay.js").default} overlay Overlay.
		* @api
		*/
		addOverlay(overlay) {
			this.getOverlays().push(overlay);
		}
		/**
		* This deals with map's overlay collection changes.
		* @param {import("./Overlay.js").default} overlay Overlay.
		* @private
		*/
		addOverlayInternal_(overlay) {
			const id = overlay.getId();
			if (id !== void 0) this.overlayIdIndex_[id.toString()] = overlay;
			overlay.setMap(this);
		}
		/**
		*
		* Clean up.
		* @override
		*/
		disposeInternal() {
			this.controls.clear();
			this.interactions.clear();
			this.overlays_.clear();
			this.resizeObserver_?.disconnect();
			this.setTarget(null);
			super.disposeInternal();
		}
		/**
		* Detect features that intersect a pixel on the viewport, and execute a
		* callback with each intersecting feature. Layers included in the detection can
		* be configured through the `layerFilter` option in `options`.
		* For polygons without a fill, only the stroke will be used for hit detection.
		* Polygons must have a fill style applied to ensure that pixels inside a polygon are detected.
		* The fill can be transparent.
		* @param {import("./pixel.js").Pixel} pixel Pixel.
		* @param {function(import("./Feature.js").FeatureLike, import("./layer/Layer.js").default<import("./source/Source.js").default>, import("./geom/SimpleGeometry.js").default): T} callback Feature callback. The callback will be
		*     called with two arguments. The first argument is one
		*     {@link module:ol/Feature~Feature feature} or
		*     {@link module:ol/render/Feature~RenderFeature render feature} at the pixel, the second is
		*     the {@link module:ol/layer/Layer~Layer layer} of the feature and will be null for
		*     unmanaged layers. To stop detection, callback functions can return a
		*     truthy value.
		* @param {AtPixelOptions} [options] Optional options.
		* @return {T|undefined} Callback result, i.e. the return value of last
		* callback execution, or the first truthy callback return value.
		* @template T
		* @api
		*/
		forEachFeatureAtPixel(pixel, callback, options) {
			if (!this.frameState_ || !this.renderer_) return;
			const coordinate = this.getCoordinateFromPixelInternal(pixel);
			options = options !== void 0 ? options : {};
			const hitTolerance = options.hitTolerance !== void 0 ? options.hitTolerance : 0;
			const layerFilter = options.layerFilter !== void 0 ? options.layerFilter : TRUE;
			const checkWrapped = options.checkWrapped !== false;
			return this.renderer_.forEachFeatureAtCoordinate(coordinate, this.frameState_, hitTolerance, checkWrapped, callback, null, layerFilter, null);
		}
		/**
		* Get all features that intersect a pixel on the viewport.
		* For polygons without a fill, only the stroke will be used for hit detection.
		* Polygons must have a fill style applied to ensure that pixels inside a polygon are detected.
		* The fill can be transparent.
		* @param {import("./pixel.js").Pixel} pixel Pixel.
		* @param {AtPixelOptions} [options] Optional options.
		* @return {Array<import("./Feature.js").FeatureLike>} The detected features or
		* an empty array if none were found.
		* @api
		*/
		getFeaturesAtPixel(pixel, options) {
			const features = [];
			this.forEachFeatureAtPixel(pixel, function(feature) {
				features.push(feature);
			}, options);
			return features;
		}
		/**
		* Get all layers from all layer groups.
		* @return {Array<import("./layer/Layer.js").default>} Layers.
		* @api
		*/
		getAllLayers() {
			const layers = [];
			function addLayersFrom(layerGroup) {
				layerGroup.forEach(function(layer) {
					if (layer instanceof LayerGroup) addLayersFrom(layer.getLayers());
					else layers.push(layer);
				});
			}
			addLayersFrom(this.getLayers());
			return layers;
		}
		/**
		* Detect if features intersect a pixel on the viewport. Layers included in the
		* detection can be configured through the `layerFilter` option.
		* For polygons without a fill, only the stroke will be used for hit detection.
		* Polygons must have a fill style applied to ensure that pixels inside a polygon are detected.
		* The fill can be transparent.
		* @param {import("./pixel.js").Pixel} pixel Pixel.
		* @param {AtPixelOptions} [options] Optional options.
		* @return {boolean} Is there a feature at the given pixel?
		* @api
		*/
		hasFeatureAtPixel(pixel, options) {
			if (!this.frameState_ || !this.renderer_) return false;
			const coordinate = this.getCoordinateFromPixelInternal(pixel);
			options = options !== void 0 ? options : {};
			const layerFilter = options.layerFilter !== void 0 ? options.layerFilter : TRUE;
			const hitTolerance = options.hitTolerance !== void 0 ? options.hitTolerance : 0;
			const checkWrapped = options.checkWrapped !== false;
			return this.renderer_.hasFeatureAtCoordinate(coordinate, this.frameState_, hitTolerance, checkWrapped, layerFilter, null);
		}
		/**
		* Returns the coordinate in user projection for a browser event.
		* @param {MouseEvent} event Event.
		* @return {import("./coordinate.js").Coordinate} Coordinate.
		* @api
		*/
		getEventCoordinate(event) {
			return this.getCoordinateFromPixel(this.getEventPixel(event));
		}
		/**
		* Returns the coordinate in view projection for a browser event.
		* @param {MouseEvent} event Event.
		* @return {import("./coordinate.js").Coordinate} Coordinate.
		*/
		getEventCoordinateInternal(event) {
			return this.getCoordinateFromPixelInternal(this.getEventPixel(event));
		}
		/**
		* Returns the map pixel position for a browser event relative to the viewport.
		* @param {UIEvent|{clientX: number, clientY: number}} event Event.
		* @return {import("./pixel.js").Pixel} Pixel.
		* @api
		*/
		getEventPixel(event) {
			const viewportPosition = this.viewport_.getBoundingClientRect();
			const viewportSize = this.getSize();
			const scaleX = viewportPosition.width / viewportSize[0];
			const scaleY = viewportPosition.height / viewportSize[1];
			const eventPosition = "changedTouches" in event ? event.changedTouches[0] : event;
			return [(eventPosition.clientX - viewportPosition.left) / scaleX, (eventPosition.clientY - viewportPosition.top) / scaleY];
		}
		/**
		* Get the target in which this map is rendered.
		* Note that this returns what is entered as an option or in setTarget:
		* if that was an element, it returns an element; if a string, it returns that.
		* @return {HTMLElement|string|undefined} The Element or id of the Element that the
		*     map is rendered in.
		* @observable
		* @api
		*/
		getTarget() {
			return this.get(MapProperty_default.TARGET);
		}
		/**
		* Get the DOM element into which this map is rendered. In contrast to
		* `getTarget` this method always return an `Element`, or `null` if the
		* map has no target.
		* @return {HTMLElement} The element that the map is rendered in.
		* @api
		*/
		getTargetElement() {
			return this.targetElement_;
		}
		/**
		* Get the coordinate for a given pixel.  This returns a coordinate in the
		* user projection.
		* @param {import("./pixel.js").Pixel} pixel Pixel position in the map viewport.
		* @return {import("./coordinate.js").Coordinate} The coordinate for the pixel position.
		* @api
		*/
		getCoordinateFromPixel(pixel) {
			return toUserCoordinate(this.getCoordinateFromPixelInternal(pixel), this.getView().getProjection());
		}
		/**
		* Get the coordinate for a given pixel.  This returns a coordinate in the
		* map view projection.
		* @param {import("./pixel.js").Pixel} pixel Pixel position in the map viewport.
		* @return {import("./coordinate.js").Coordinate} The coordinate for the pixel position.
		*/
		getCoordinateFromPixelInternal(pixel) {
			const frameState = this.frameState_;
			if (!frameState) return null;
			return apply(frameState.pixelToCoordinateTransform, pixel.slice());
		}
		/**
		* Get the map controls. Modifying this collection changes the controls
		* associated with the map.
		* @return {Collection<import("./control/Control.js").default>} Controls.
		* @api
		*/
		getControls() {
			return this.controls;
		}
		/**
		* Get the map overlays. Modifying this collection changes the overlays
		* associated with the map.
		* @return {Collection<import("./Overlay.js").default>} Overlays.
		* @api
		*/
		getOverlays() {
			return this.overlays_;
		}
		/**
		* Get an overlay by its identifier (the value returned by overlay.getId()).
		* Note that the index treats string and numeric identifiers as the same. So
		* `map.getOverlayById(2)` will return an overlay with id `'2'` or `2`.
		* @param {string|number} id Overlay identifier.
		* @return {import("./Overlay.js").default|null} Overlay.
		* @api
		*/
		getOverlayById(id) {
			const overlay = this.overlayIdIndex_[id.toString()];
			return overlay !== void 0 ? overlay : null;
		}
		/**
		* Get the map interactions. Modifying this collection changes the interactions
		* associated with the map.
		*
		* Interactions are used for e.g. pan, zoom and rotate.
		* @return {Collection<import("./interaction/Interaction.js").default>} Interactions.
		* @api
		*/
		getInteractions() {
			return this.interactions;
		}
		/**
		* Get the layergroup associated with this map.
		* @return {LayerGroup} A layer group containing the layers in this map.
		* @observable
		* @api
		*/
		getLayerGroup() {
			return this.get(MapProperty_default.LAYERGROUP);
		}
		/**
		* Clear any existing layers and add layers to the map.
		* @param {Array<import("./layer/Base.js").default>|Collection<import("./layer/Base.js").default>} layers The layers to be added to the map.
		* @api
		*/
		setLayers(layers) {
			const group = this.getLayerGroup();
			if (layers instanceof Collection) {
				group.setLayers(layers);
				return;
			}
			const collection = group.getLayers();
			collection.clear();
			collection.extend(layers);
		}
		/**
		* Get the collection of layers associated with this map.
		* @return {!Collection<import("./layer/Base.js").default>} Layers.
		* @api
		*/
		getLayers() {
			return this.getLayerGroup().getLayers();
		}
		/**
		* @return {boolean} Layers have sources that are still loading.
		*/
		getLoadingOrNotReady() {
			const layerStatesArray = this.getLayerGroup().getLayerStatesArray();
			for (let i = 0, ii = layerStatesArray.length; i < ii; ++i) {
				const state = layerStatesArray[i];
				if (!state.visible) continue;
				const renderer = state.layer.getRenderer();
				if (renderer && !renderer.ready) return true;
				const source = state.layer.getSource();
				if (source && source.loading) return true;
			}
			return false;
		}
		/**
		* Get the pixel for a coordinate.  This takes a coordinate in the user
		* projection and returns the corresponding pixel.
		* @param {import("./coordinate.js").Coordinate} coordinate A map coordinate.
		* @return {import("./pixel.js").Pixel} A pixel position in the map viewport.
		* @api
		*/
		getPixelFromCoordinate(coordinate) {
			const viewCoordinate = fromUserCoordinate(coordinate, this.getView().getProjection());
			return this.getPixelFromCoordinateInternal(viewCoordinate);
		}
		/**
		* Get the pixel for a coordinate.  This takes a coordinate in the map view
		* projection and returns the corresponding pixel.
		* @param {import("./coordinate.js").Coordinate} coordinate A map coordinate.
		* @return {import("./pixel.js").Pixel} A pixel position in the map viewport.
		*/
		getPixelFromCoordinateInternal(coordinate) {
			const frameState = this.frameState_;
			if (!frameState) return null;
			return apply(frameState.coordinateToPixelTransform, coordinate.slice(0, 2));
		}
		/**
		* Get the pixel ratio of the rendered map.
		* @return {number} Pixel ratio.
		* @api
		*/
		getPixelRatio() {
			return this.pixelRatio_;
		}
		/**
		* Set the pixel ratio of the rendered map.
		* @param {number} pixelRatio Pixel ratio.
		* @api
		*/
		setPixelRatio(pixelRatio) {
			if (this.pixelRatio_ === pixelRatio) return;
			this.pixelRatio_ = pixelRatio;
			this.render();
		}
		/**
		* Get the map renderer.
		* @return {import("./renderer/Map.js").default|null} Renderer
		*/
		getRenderer() {
			return this.renderer_;
		}
		/**
		* Get the size of this map.
		* @return {import("./size.js").Size|undefined} The size in pixels of the map in the DOM.
		* @observable
		* @api
		*/
		getSize() {
			return this.get(MapProperty_default.SIZE);
		}
		/**
		* Get the view associated with this map. A view manages properties such as
		* center and resolution.
		* @return {View} The view that controls this map.
		* @observable
		* @api
		*/
		getView() {
			return this.get(MapProperty_default.VIEW);
		}
		/**
		* Get the element that serves as the map viewport.
		* @return {HTMLElement} Viewport.
		* @api
		*/
		getViewport() {
			return this.viewport_;
		}
		/**
		* Get the element that serves as the container for overlays.  Elements added to
		* this container will let mousedown and touchstart events through to the map,
		* so clicks and gestures on an overlay will trigger {@link module:ol/MapBrowserEvent~MapBrowserEvent}
		* events.
		* @return {!HTMLElement} The map's overlay container.
		*/
		getOverlayContainer() {
			return this.overlayContainer_;
		}
		/**
		* Get the element that serves as a container for overlays that don't allow
		* event propagation. Elements added to this container won't let mousedown and
		* touchstart events through to the map, so clicks and gestures on an overlay
		* don't trigger any {@link module:ol/MapBrowserEvent~MapBrowserEvent}.
		* @return {!HTMLElement} The map's overlay container that stops events.
		*/
		getOverlayContainerStopEvent() {
			return this.overlayContainerStopEvent_;
		}
		/**
		* @return {!Document} The document where the map is displayed.
		*/
		getOwnerDocument() {
			const targetElement = this.getTargetElement();
			return targetElement ? targetElement.ownerDocument : document;
		}
		/**
		* @param {import("./Tile.js").default} tile Tile.
		* @param {string} tileSourceKey Tile source key.
		* @param {import("./coordinate.js").Coordinate} tileCenter Tile center.
		* @param {number} tileResolution Tile resolution.
		* @return {number} Tile priority.
		*/
		getTilePriority(tile, tileSourceKey, tileCenter, tileResolution) {
			return getTilePriority(this.frameState_, tile, tileSourceKey, tileCenter, tileResolution);
		}
		/**
		* @param {PointerEvent|KeyboardEvent|WheelEvent} browserEvent Browser event.
		* @param {string} [type] Type.
		*/
		handleBrowserEvent(browserEvent, type) {
			type = type || browserEvent.type;
			const mapBrowserEvent = new MapBrowserEvent(type, this, browserEvent);
			this.handleMapBrowserEvent(mapBrowserEvent);
		}
		/**
		* @param {MapBrowserEvent} mapBrowserEvent The event to handle.
		*/
		handleMapBrowserEvent(mapBrowserEvent) {
			if (!this.frameState_) return;
			const originalEvent = mapBrowserEvent.originalEvent;
			const eventType = originalEvent.type;
			if (eventType === EventType_default$1.POINTERDOWN || eventType === EventType_default$2.WHEEL || eventType === EventType_default$2.KEYDOWN) {
				const doc = this.getOwnerDocument();
				const rootNode = this.viewport_.getRootNode ? this.viewport_.getRootNode() : doc;
				const target = originalEvent.target;
				const currentDoc = rootNode instanceof ShadowRoot ? rootNode.host === target ? rootNode.host.ownerDocument : rootNode : rootNode === doc ? doc.documentElement : rootNode;
				if (this.overlayContainerStopEvent_.contains(target) || !currentDoc.contains(target)) return;
			}
			mapBrowserEvent.frameState = this.frameState_;
			if (this.dispatchEvent(mapBrowserEvent) !== false) {
				const interactionsArray = this.getInteractions().getArray().slice();
				for (let i = interactionsArray.length - 1; i >= 0; i--) {
					const interaction = interactionsArray[i];
					if (interaction.getMap() !== this || !interaction.getActive() || !this.getTargetElement()) continue;
					if (!interaction.handleEvent(mapBrowserEvent) || mapBrowserEvent.propagationStopped) break;
				}
			}
		}
		/**
		* @protected
		*/
		handlePostRender() {
			const frameState = this.frameState_;
			const tileQueue = this.tileQueue_;
			if (!tileQueue.isEmpty()) {
				let maxTotalLoading = this.maxTilesLoading_;
				let maxNewLoads = maxTotalLoading;
				const hints = frameState ? frameState.viewHints : void 0;
				const animatingOrInteracting = hints ? hints[ViewHint_default.ANIMATING] || hints[ViewHint_default.INTERACTING] : false;
				if (animatingOrInteracting) {
					const lowOnFrameBudget = Date.now() - frameState.time > 8;
					maxTotalLoading = lowOnFrameBudget ? 0 : 8;
					maxNewLoads = lowOnFrameBudget ? 0 : 2;
				}
				if (tileQueue.getTilesLoading() < maxTotalLoading) {
					if (animatingOrInteracting) tileQueue.reprioritize();
					tileQueue.loadMoreTiles(maxTotalLoading, maxNewLoads);
				}
			}
			if (frameState && this.renderer_ && !frameState.animate) {
				if (this.renderComplete_) {
					if (this.hasListener(EventType_default.RENDERCOMPLETE)) this.renderer_.dispatchRenderEvent(EventType_default.RENDERCOMPLETE, frameState);
					if (this.loaded_ === false) {
						this.loaded_ = true;
						this.dispatchEvent(new MapEvent(MapEventType_default.LOADEND, this, frameState));
					}
				} else if (this.loaded_ === true) {
					this.loaded_ = false;
					this.dispatchEvent(new MapEvent(MapEventType_default.LOADSTART, this, frameState));
				}
			}
			const postRenderFunctions = this.postRenderFunctions_;
			if (frameState) for (let i = 0, ii = postRenderFunctions.length; i < ii; ++i) postRenderFunctions[i](this, frameState);
			postRenderFunctions.length = 0;
		}
		/**
		* @private
		*/
		handleSizeChanged_() {
			if (this.getView() && !this.getView().getAnimating()) this.getView().resolveConstraints(0);
			this.render();
		}
		/**
		* @private
		*/
		handleTargetChanged_() {
			if (this.mapBrowserEventHandler_) {
				for (let i = 0, ii = this.targetChangeHandlerKeys_.length; i < ii; ++i) unlistenByKey(this.targetChangeHandlerKeys_[i]);
				this.targetChangeHandlerKeys_ = null;
				this.viewport_.removeEventListener(EventType_default$2.CONTEXTMENU, this.boundHandleBrowserEvent_);
				this.viewport_.removeEventListener(EventType_default$2.WHEEL, this.boundHandleBrowserEvent_);
				this.mapBrowserEventHandler_.dispose();
				this.mapBrowserEventHandler_ = null;
				this.viewport_.remove();
			}
			if (this.targetElement_ && !isCanvas(this.targetElement_)) {
				this.resizeObserver_?.unobserve(this.targetElement_);
				const rootNode = this.targetElement_.getRootNode();
				if (rootNode instanceof ShadowRoot) this.resizeObserver_.unobserve(rootNode.host);
				this.setSize(void 0);
			}
			const target = this.getTarget();
			const targetElement = typeof target === "string" ? document.getElementById(target) : target;
			this.targetElement_ = targetElement;
			if (!targetElement) {
				if (this.renderer_) {
					clearTimeout(this.postRenderTimeoutHandle_);
					this.postRenderTimeoutHandle_ = void 0;
					this.postRenderFunctions_.length = 0;
					this.renderer_.dispose();
					this.renderer_ = null;
				}
				if (this.animationDelayKey_) {
					cancelAnimationFrame(this.animationDelayKey_);
					this.animationDelayKey_ = void 0;
				}
			} else {
				if (!isCanvas(targetElement)) targetElement.appendChild(this.viewport_);
				if (!this.renderer_) this.renderer_ = new CompositeMapRenderer(this);
				if (!isCanvas(targetElement)) {
					this.mapBrowserEventHandler_ = new MapBrowserEventHandler(this, this.moveTolerance_);
					for (const key in MapBrowserEventType_default) this.mapBrowserEventHandler_.addEventListener(MapBrowserEventType_default[key], this.handleMapBrowserEvent.bind(this));
					this.viewport_.addEventListener(EventType_default$2.CONTEXTMENU, this.boundHandleBrowserEvent_, false);
					this.viewport_.addEventListener(EventType_default$2.WHEEL, this.boundHandleBrowserEvent_, PASSIVE_EVENT_LISTENERS ? { passive: false } : false);
					let keyboardEventTarget;
					if (!this.keyboardEventTarget_) {
						const targetRoot = targetElement.getRootNode();
						keyboardEventTarget = targetRoot instanceof ShadowRoot ? targetRoot.host : targetElement;
					} else keyboardEventTarget = this.keyboardEventTarget_;
					this.targetChangeHandlerKeys_ = [listen(keyboardEventTarget, EventType_default$2.KEYDOWN, this.handleBrowserEvent, this), listen(keyboardEventTarget, EventType_default$2.KEYPRESS, this.handleBrowserEvent, this)];
					if (!isCanvas(targetElement)) {
						const rootNode = targetElement.getRootNode();
						if (rootNode instanceof ShadowRoot) this.resizeObserver_.observe(rootNode.host);
						this.resizeObserver_?.observe(targetElement);
					}
				}
				this.updateSize();
			}
		}
		/**
		* @private
		*/
		handleTileChange_() {
			this.render();
		}
		/**
		* @private
		*/
		handleViewPropertyChanged_() {
			this.render();
		}
		/**
		* @private
		*/
		handleViewChanged_() {
			if (this.viewPropertyListenerKey_) {
				unlistenByKey(this.viewPropertyListenerKey_);
				this.viewPropertyListenerKey_ = null;
			}
			if (this.viewChangeListenerKey_) {
				unlistenByKey(this.viewChangeListenerKey_);
				this.viewChangeListenerKey_ = null;
			}
			const view = this.getView();
			if (view) {
				this.updateViewportSize_(this.getSize());
				this.viewPropertyListenerKey_ = listen(view, ObjectEventType_default.PROPERTYCHANGE, this.handleViewPropertyChanged_, this);
				this.viewChangeListenerKey_ = listen(view, EventType_default$2.CHANGE, this.handleViewPropertyChanged_, this);
				view.resolveConstraints(0);
			}
			this.render();
		}
		/**
		* @private
		*/
		handleLayerGroupChanged_() {
			if (this.layerGroupPropertyListenerKeys_) {
				this.layerGroupPropertyListenerKeys_.forEach(unlistenByKey);
				this.layerGroupPropertyListenerKeys_ = null;
			}
			const layerGroup = this.getLayerGroup();
			if (layerGroup) {
				this.handleLayerAdd_(new GroupEvent("addlayer", layerGroup));
				this.layerGroupPropertyListenerKeys_ = [
					listen(layerGroup, ObjectEventType_default.PROPERTYCHANGE, this.render, this),
					listen(layerGroup, EventType_default$2.CHANGE, this.render, this),
					listen(layerGroup, "addlayer", this.handleLayerAdd_, this),
					listen(layerGroup, "removelayer", this.handleLayerRemove_, this)
				];
			}
			this.render();
		}
		/**
		* @return {boolean} Is rendered.
		*/
		isRendered() {
			return !!this.frameState_;
		}
		/**
		* @private
		*/
		animationDelay_() {
			this.animationDelayKey_ = void 0;
			this.renderFrame_(Date.now());
		}
		/**
		* Requests an immediate render in a synchronous manner.
		* @api
		*/
		renderSync() {
			if (this.animationDelayKey_) cancelAnimationFrame(this.animationDelayKey_);
			this.animationDelay_();
		}
		/**
		* Redraws all text after new fonts have loaded
		*/
		redrawText() {
			if (!this.frameState_) return;
			const layerStates = this.frameState_.layerStatesArray;
			for (let i = 0, ii = layerStates.length; i < ii; ++i) {
				const layer = layerStates[i].layer;
				if (layer.hasRenderer()) layer.getRenderer().handleFontsChanged();
			}
		}
		/**
		* Request a map rendering (at the next animation frame).
		* @api
		*/
		render() {
			if (this.renderer_ && this.animationDelayKey_ === void 0) this.animationDelayKey_ = requestAnimationFrame(this.animationDelay_);
		}
		/**
		* Remove the given control from the map.
		* @param {import("./control/Control.js").default} control Control.
		* @return {import("./control/Control.js").default|undefined} The removed control (or undefined
		*     if the control was not found).
		* @api
		*/
		removeControl(control) {
			return this.getControls().remove(control);
		}
		/**
		* Remove the given interaction from the map.
		* @param {import("./interaction/Interaction.js").default} interaction Interaction to remove.
		* @return {import("./interaction/Interaction.js").default|undefined} The removed interaction (or
		*     undefined if the interaction was not found).
		* @api
		*/
		removeInteraction(interaction) {
			return this.getInteractions().remove(interaction);
		}
		/**
		* Removes the given layer from the map.
		* @param {import("./layer/Base.js").default} layer Layer.
		* @return {import("./layer/Base.js").default|undefined} The removed layer (or undefined if the
		*     layer was not found).
		* @api
		*/
		removeLayer(layer) {
			return this.getLayerGroup().getLayers().remove(layer);
		}
		/**
		* @param {import("./layer/Group.js").GroupEvent} event The layer remove event.
		* @private
		*/
		handleLayerRemove_(event) {
			removeLayerMapProperty(event.layer);
		}
		/**
		* Remove the given overlay from the map.
		* @param {import("./Overlay.js").default} overlay Overlay.
		* @return {import("./Overlay.js").default|undefined} The removed overlay (or undefined
		*     if the overlay was not found).
		* @api
		*/
		removeOverlay(overlay) {
			return this.getOverlays().remove(overlay);
		}
		/**
		* @param {number} time Time.
		* @private
		*/
		renderFrame_(time) {
			const size = this.getSize();
			const view = this.getView();
			const previousFrameState = this.frameState_;
			/** @type {?FrameState} */
			let frameState = null;
			if (size !== void 0 && hasArea(size) && view && view.isDef()) {
				const viewHints = view.getHints(this.frameState_ ? this.frameState_.viewHints : void 0);
				const viewState = view.getState();
				frameState = {
					animate: false,
					coordinateToPixelTransform: this.coordinateToPixelTransform_,
					declutter: null,
					extent: getForViewAndSize(viewState.center, viewState.resolution, viewState.rotation, size),
					index: this.frameIndex_++,
					layerIndex: 0,
					layerStatesArray: this.getLayerGroup().getLayerStatesArray(),
					pixelRatio: this.pixelRatio_,
					pixelToCoordinateTransform: this.pixelToCoordinateTransform_,
					postRenderFunctions: [],
					size,
					tileQueue: this.tileQueue_,
					time,
					usedTiles: {},
					viewState,
					viewHints,
					wantedTiles: {},
					mapId: getUid(this),
					renderTargets: {}
				};
				if (viewState.nextCenter && viewState.nextResolution) {
					const rotation = isNaN(viewState.nextRotation) ? viewState.rotation : viewState.nextRotation;
					frameState.nextExtent = getForViewAndSize(viewState.nextCenter, viewState.nextResolution, rotation, size);
				}
			}
			this.frameState_ = frameState;
			this.renderer_.renderFrame(frameState);
			if (frameState) {
				if (frameState.animate) this.render();
				Array.prototype.push.apply(this.postRenderFunctions_, frameState.postRenderFunctions);
				if (previousFrameState) {
					if (!this.previousExtent_ || !isEmpty(this.previousExtent_) && !equals$1(frameState.extent, this.previousExtent_)) {
						this.dispatchEvent(new MapEvent(MapEventType_default.MOVESTART, this, previousFrameState));
						this.previousExtent_ = createOrUpdateEmpty(this.previousExtent_);
					}
				}
				if (this.previousExtent_ && !frameState.viewHints[ViewHint_default.ANIMATING] && !frameState.viewHints[ViewHint_default.INTERACTING] && !equals$1(frameState.extent, this.previousExtent_)) {
					this.dispatchEvent(new MapEvent(MapEventType_default.MOVEEND, this, frameState));
					clone(frameState.extent, this.previousExtent_);
				}
			}
			this.dispatchEvent(new MapEvent(MapEventType_default.POSTRENDER, this, frameState));
			this.renderComplete_ = (this.hasListener(MapEventType_default.LOADSTART) || this.hasListener(MapEventType_default.LOADEND) || this.hasListener(EventType_default.RENDERCOMPLETE)) && !this.tileQueue_.getTilesLoading() && !this.tileQueue_.getCount() && !this.getLoadingOrNotReady();
			if (!this.postRenderTimeoutHandle_) this.postRenderTimeoutHandle_ = setTimeout(() => {
				this.postRenderTimeoutHandle_ = void 0;
				this.handlePostRender();
			}, 0);
		}
		/**
		* Sets the layergroup of this map.
		* @param {LayerGroup} layerGroup A layer group containing the layers in this map.
		* @observable
		* @api
		*/
		setLayerGroup(layerGroup) {
			const oldLayerGroup = this.getLayerGroup();
			if (oldLayerGroup) this.handleLayerRemove_(new GroupEvent("removelayer", oldLayerGroup));
			this.set(MapProperty_default.LAYERGROUP, layerGroup);
		}
		/**
		* Set the size of this map.
		* @param {import("./size.js").Size|undefined} size The size in pixels of the map in the DOM.
		* @observable
		* @api
		*/
		setSize(size) {
			this.set(MapProperty_default.SIZE, size);
		}
		/**
		* Set the target element to render this map into.
		* For accessibility (focus and keyboard events for map navigation), the `target` element must have a
		*  properly configured `tabindex` attribute. If the `target` element is inside a Shadow DOM, the
		*  `tabindex` atribute must be set on the custom element's host element.
		* @param {HTMLElement|string} [target] The Element or id of the Element
		*     that the map is rendered in.
		* @observable
		* @api
		*/
		setTarget(target) {
			this.set(MapProperty_default.TARGET, target);
		}
		/**
		* Set the view for this map.
		* @param {View|Promise<import("./View.js").ViewOptions>|null} view The view that controls this map.
		* It is also possible to pass a promise that resolves to options for constructing a view.  This
		* alternative allows view properties to be resolved by sources or other components that load
		* view-related metadata.
		* @observable
		* @api
		*/
		setView(view) {
			if (!view || view instanceof View) {
				this.set(MapProperty_default.VIEW, view);
				return;
			}
			this.set(MapProperty_default.VIEW, new View());
			const map = this;
			view.then(function(viewOptions) {
				map.setView(new View(viewOptions));
			});
		}
		/**
		* Force a recalculation of the map viewport size.  This should be called when
		* third-party code changes the size of the map viewport.
		* @api
		*/
		updateSize() {
			const targetElement = this.getTargetElement();
			let size = void 0;
			if (targetElement) {
				let width, height;
				if (isCanvas(targetElement)) {
					const transform = targetElement.getContext("2d").getTransform();
					width = targetElement.width / transform.a;
					height = targetElement.height / transform.d;
				} else {
					const computedStyle = getComputedStyle(targetElement);
					width = targetElement.offsetWidth - parseFloat(computedStyle["borderLeftWidth"]) - parseFloat(computedStyle["paddingLeft"]) - parseFloat(computedStyle["paddingRight"]) - parseFloat(computedStyle["borderRightWidth"]);
					height = targetElement.offsetHeight - parseFloat(computedStyle["borderTopWidth"]) - parseFloat(computedStyle["paddingTop"]) - parseFloat(computedStyle["paddingBottom"]) - parseFloat(computedStyle["borderBottomWidth"]);
				}
				if (!isNaN(width) && !isNaN(height)) {
					size = [Math.max(0, width), Math.max(0, height)];
					if (!hasArea(size) && !!(targetElement.offsetWidth || targetElement.offsetHeight || targetElement.getClientRects().length)) warn("No map visible because the map container's width or height are 0.");
				}
			}
			const oldSize = this.getSize();
			if (size && (!oldSize || !equals$2(size, oldSize))) {
				this.updateViewportSize_(size);
				this.setSize(size);
			}
		}
		/**
		* Recomputes the viewport size and save it on the view object (if any)
		* @param {import("./size.js").Size|undefined} size The size.
		* @private
		*/
		updateViewportSize_(size) {
			const view = this.getView();
			if (view) view.setViewportSize(size);
		}
	};
	/**
	* @param {MapOptions} options Map options.
	* @return {MapOptionsInternal} Internal map options.
	*/
	function createOptionsInternal(options) {
		/**
		* @type {HTMLElement|Document}
		*/
		let keyboardEventTarget = null;
		if (options.keyboardEventTarget !== void 0) keyboardEventTarget = typeof options.keyboardEventTarget === "string" ? document.getElementById(options.keyboardEventTarget) : options.keyboardEventTarget;
		/**
		* @type {Object<string, *>}
		*/
		const values = {};
		const layerGroup = options.layers && typeof options.layers.getLayers === "function" ? options.layers : new LayerGroup({ layers: options.layers });
		values[MapProperty_default.LAYERGROUP] = layerGroup;
		values[MapProperty_default.TARGET] = options.target;
		values[MapProperty_default.VIEW] = options.view instanceof View ? options.view : new View();
		/** @type {Collection<import("./control/Control.js").default>} */
		let controls;
		if (options.controls !== void 0) if (Array.isArray(options.controls)) controls = new Collection(options.controls.slice());
		else {
			assert(typeof options.controls.getArray === "function", "Expected `controls` to be an array or an `ol/Collection.js`");
			controls = options.controls;
		}
		/** @type {Collection<import("./interaction/Interaction.js").default>} */
		let interactions;
		if (options.interactions !== void 0) if (Array.isArray(options.interactions)) interactions = new Collection(options.interactions.slice());
		else {
			assert(typeof options.interactions.getArray === "function", "Expected `interactions` to be an array or an `ol/Collection.js`");
			interactions = options.interactions;
		}
		/** @type {Collection<import("./Overlay.js").default>} */
		let overlays;
		if (options.overlays !== void 0) if (Array.isArray(options.overlays)) overlays = new Collection(options.overlays.slice());
		else {
			assert(typeof options.overlays.getArray === "function", "Expected `overlays` to be an array or an `ol/Collection.js`");
			overlays = options.overlays;
		}
		else overlays = new Collection();
		return {
			controls,
			interactions,
			keyboardEventTarget,
			overlays,
			values
		};
	}
	//#endregion
	//#region src/ol/Tile.js
	/**
	* @module ol/Tile
	*/
	/**
	* A function that takes a {@link module:ol/Tile~Tile} for the tile and a
	* `{string}` for the url as arguments. The default is
	* ```js
	* source.setTileLoadFunction(function(tile, src) {
	*   tile.getImage().src = src;
	* });
	* ```
	* For more fine grained control, the load function can use fetch or XMLHttpRequest and involve
	* error handling:
	*
	* ```js
	* import TileState from 'ol/TileState.js';
	*
	* source.setTileLoadFunction(function(tile, src) {
	*   const xhr = new XMLHttpRequest();
	*   xhr.responseType = 'blob';
	*   xhr.addEventListener('loadend', function (evt) {
	*     const data = this.response;
	*     if (data !== undefined) {
	*       tile.getImage().src = URL.createObjectURL(data);
	*     } else {
	*       tile.setState(TileState.ERROR);
	*     }
	*   });
	*   xhr.addEventListener('error', function () {
	*     tile.setState(TileState.ERROR);
	*   });
	*   xhr.open('GET', src);
	*   xhr.send();
	* });
	* ```
	*
	* @typedef {function(Tile, string): void} LoadFunction
	* @api
	*/
	/**
	* {@link module:ol/source/Tile~TileSource} sources use a function of this type to get
	* the url that provides a tile for a given tile coordinate.
	*
	* This function takes a {@link module:ol/tilecoord~TileCoord} for the tile
	* coordinate, a `{number}` representing the pixel ratio and a
	* {@link module:ol/proj/Projection~Projection} for the projection  as arguments
	* and returns a `{string}` representing the tile URL, or undefined if no tile
	* should be requested for the passed tile coordinate.
	*
	* @typedef {function(import("./tilecoord.js").TileCoord, number,
	*           import("./proj/Projection.js").default): (string|undefined)} UrlFunction
	* @api
	*/
	/**
	* @typedef {Object} Options
	* @property {number} [transition=250] A duration for tile opacity
	* transitions in milliseconds. A duration of 0 disables the opacity transition.
	* @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
	* the nearest neighbor is used when resampling.
	* @api
	*/
	/**
	* @classdesc
	* Base class for tiles.
	*
	* @abstract
	*/
	var Tile = class extends Target {
		/**
		* @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
		* @param {import("./TileState.js").default} state State.
		* @param {Options} [options] Tile options.
		*/
		constructor(tileCoord, state, options) {
			super();
			options = options ? options : {};
			/**
			* @type {import("./tilecoord.js").TileCoord}
			*/
			this.tileCoord = tileCoord;
			/**
			* @protected
			* @type {import("./TileState.js").default}
			*/
			this.state = state;
			/**
			* A key assigned to the tile. This is used in conjunction with a source key
			* to determine if a cached version of this tile may be used by the renderer.
			* @type {string}
			*/
			this.key = "";
			/**
			* The duration for the opacity transition.
			* @private
			* @type {number}
			*/
			this.transition_ = options.transition === void 0 ? 250 : options.transition;
			/**
			* Lookup of start times for rendering transitions.  If the start time is
			* equal to -1, the transition is complete.
			* @private
			* @type {Object<string, number>}
			*/
			this.transitionStarts_ = {};
			/**
			* @type {boolean}
			*/
			this.interpolate = !!options.interpolate;
		}
		/**
		* @protected
		*/
		changed() {
			this.dispatchEvent(EventType_default$2.CHANGE);
		}
		/**
		* Called by the tile cache when the tile is removed from the cache due to expiry
		*/
		release() {
			this.setState(TileState_default.EMPTY);
		}
		/**
		* @return {string} Key.
		*/
		getKey() {
			return this.key + "/" + this.tileCoord;
		}
		/**
		* Get the tile coordinate for this tile.
		* @return {import("./tilecoord.js").TileCoord} The tile coordinate.
		* @api
		*/
		getTileCoord() {
			return this.tileCoord;
		}
		/**
		* @return {import("./TileState.js").default} State.
		*/
		getState() {
			return this.state;
		}
		/**
		* Sets the state of this tile. If you write your own {@link module:ol/Tile~LoadFunction tileLoadFunction} ,
		* it is important to set the state correctly to {@link module:ol/TileState~ERROR}
		* when the tile cannot be loaded. Otherwise the tile cannot be removed from
		* the tile queue and will block other requests.
		* @param {import("./TileState.js").default} state State.
		* @api
		*/
		setState(state) {
			if (this.state === TileState_default.EMPTY) return;
			if (this.state !== TileState_default.ERROR && this.state > state) throw new Error("Tile load sequence violation");
			this.state = state;
			this.changed();
		}
		/**
		* Load the image or retry if loading previously failed.
		* Loading is taken care of by the tile queue, and calling this method is
		* only needed for preloading or for reloading in case of an error.
		* @abstract
		* @api
		*/
		load() {
			abstract();
		}
		/**
		* Get the alpha value for rendering.
		* @param {string} id An id for the renderer.
		* @param {number} time The render frame time.
		* @return {number} A number between 0 and 1.
		*/
		getAlpha(id, time) {
			if (!this.transition_) return 1;
			let start = this.transitionStarts_[id];
			if (!start) {
				start = time;
				this.transitionStarts_[id] = start;
			} else if (start === -1) return 1;
			const delta = time - start + 1e3 / 60;
			if (delta >= this.transition_) return 1;
			return easeIn(delta / this.transition_);
		}
		/**
		* Determine if a tile is in an alpha transition.  A tile is considered in
		* transition if tile.getAlpha() has not yet been called or has been called
		* and returned 1.
		* @param {string} id An id for the renderer.
		* @return {boolean} The tile is in transition.
		*/
		inTransition(id) {
			if (!this.transition_) return false;
			return this.transitionStarts_[id] !== -1;
		}
		/**
		* Mark a transition as complete.
		* @param {string} id An id for the renderer.
		*/
		endTransition(id) {
			if (this.transition_) this.transitionStarts_[id] = -1;
		}
		/**
		* @override
		*/
		disposeInternal() {
			this.release();
			super.disposeInternal();
		}
	};
	//#endregion
	//#region src/ol/DataTile.js
	/**
	* @module ol/DataTile
	*/
	/**
	* @typedef {HTMLImageElement|HTMLCanvasElement|OffscreenCanvas|HTMLVideoElement|ImageBitmap} ImageLike
	*/
	/**
	* @typedef {Uint8Array|Uint8ClampedArray|Float32Array|DataView} ArrayLike
	*/
	/**
	* Data that can be used with a DataTile.
	* @typedef {ArrayLike|ImageLike} Data
	*/
	/**
	* @param {Data} data Tile data.
	* @return {ImageLike|null} The image-like data.
	*/
	function asImageLike(data) {
		return data instanceof Image || data instanceof HTMLCanvasElement || data instanceof HTMLVideoElement || data instanceof ImageBitmap ? data : null;
	}
	/**
	* This is set as the cancellation reason when a tile is disposed.
	*/
	const disposedError = /* @__PURE__ */ new Error("disposed");
	/**
	* @type {import('./size.js').Size}
	*/
	const defaultSize = [256, 256];
	/**
	* @typedef {Object} Options
	* @property {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
	* @property {function(): Promise<Data>} loader Data loader.  For loaders that generate images,
	* the promise should not resolve until the image is loaded.
	* @property {number} [transition=250] A duration for tile opacity
	* transitions in milliseconds. A duration of 0 disables the opacity transition.
	* @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
	* the nearest neighbor is used when resampling.
	* @property {import('./size.js').Size} [size=[256, 256]] Tile size.
	* @property {AbortController} [controller] An abort controller.
	* @api
	*/
	var DataTile = class extends Tile {
		/**
		* @param {Options} options Tile options.
		*/
		constructor(options) {
			const state = TileState_default.IDLE;
			super(options.tileCoord, state, {
				transition: options.transition,
				interpolate: options.interpolate
			});
			/**
			* @type {function(): Promise<Data>}
			* @private
			*/
			this.loader_ = options.loader;
			/**
			* @type {Data}
			* @private
			*/
			this.data_ = null;
			/**
			* @type {Error}
			* @private
			*/
			this.error_ = null;
			/**
			* @type {import('./size.js').Size|null}
			* @private
			*/
			this.size_ = options.size || null;
			/**
			* @type {AbortController|null}
			* @private
			*/
			this.controller_ = options.controller || null;
		}
		/**
		* Get the tile size.
		* @return {import('./size.js').Size} Tile size.
		*/
		getSize() {
			if (this.size_) return this.size_;
			const imageData = asImageLike(this.data_);
			if (imageData) return [imageData.width, imageData.height];
			return defaultSize;
		}
		/**
		* Get the data for the tile.
		* @return {Data} Tile data.
		* @api
		*/
		getData() {
			return this.data_;
		}
		/**
		* Get any loading error.
		* @return {Error} Loading error.
		* @api
		*/
		getError() {
			return this.error_;
		}
		/**
		* Load the tile data.
		* @api
		* @override
		*/
		load() {
			if (this.state !== TileState_default.IDLE && this.state !== TileState_default.ERROR) return;
			this.state = TileState_default.LOADING;
			this.changed();
			const self = this;
			this.loader_().then(function(data) {
				self.data_ = data;
				self.state = TileState_default.LOADED;
				self.changed();
			}).catch(function(error) {
				self.error_ = error;
				self.state = TileState_default.ERROR;
				self.changed();
			});
		}
		/**
		* Clean up.
		* @override
		*/
		disposeInternal() {
			if (this.controller_) {
				this.controller_.abort(disposedError);
				this.controller_ = null;
			}
			super.disposeInternal();
		}
	};
	//#endregion
	//#region src/ol/ImageTile.js
	/**
	* @module ol/ImageTile
	*/
	var ImageTile = class extends Tile {
		/**
		* @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
		* @param {import("./TileState.js").default} state State.
		* @param {string} src Image source URI.
		* @param {import('./dom.js').ImageAttributes} imageAttributes Image attributes options.
		* @param {import("./Tile.js").LoadFunction} tileLoadFunction Tile load function.
		* @param {import("./Tile.js").Options} [options] Tile options.
		*/
		constructor(tileCoord, state, src, imageAttributes, tileLoadFunction, options) {
			super(tileCoord, state, options);
			/**
			* @private
			* @type {?string}
			*/
			this.crossOrigin_ = imageAttributes?.crossOrigin;
			/**
			* @private
			* @type {ReferrerPolicy}
			*/
			this.referrerPolicy_ = imageAttributes?.referrerPolicy;
			/**
			* Image URI
			*
			* @private
			* @type {string}
			*/
			this.src_ = src;
			this.key = src;
			/**
			* @private
			* @type {HTMLImageElement|HTMLCanvasElement|OffscreenCanvas}
			*/
			this.image_;
			if (WORKER_OFFSCREEN_CANVAS) this.image_ = new OffscreenCanvas(1, 1);
			else {
				this.image_ = new Image();
				if (this.crossOrigin_ !== null) this.image_.crossOrigin = this.crossOrigin_;
				if (this.referrerPolicy_ !== void 0) this.image_.referrerPolicy = this.referrerPolicy_;
			}
			/**
			* @private
			* @type {?function():void}
			*/
			this.unlisten_ = null;
			/**
			* @private
			* @type {import("./Tile.js").LoadFunction}
			*/
			this.tileLoadFunction_ = tileLoadFunction;
		}
		/**
		* Get the HTML image element for this tile (may be a Canvas, OffscreenCanvas, Image, or Video).
		* @return {HTMLCanvasElement|OffscreenCanvas|HTMLImageElement|HTMLVideoElement} Image.
		* @api
		*/
		getImage() {
			return this.image_;
		}
		/**
		* Sets an HTML image element for this tile (may be a Canvas or preloaded Image).
		* @param {HTMLCanvasElement|OffscreenCanvas|HTMLImageElement} element Element.
		*/
		setImage(element) {
			this.image_ = element;
			this.state = TileState_default.LOADED;
			this.unlistenImage_();
			this.changed();
		}
		/**
		* Get the cross origin of the ImageTile.
		* @return {string} Cross origin.
		*/
		getCrossOrigin() {
			return this.crossOrigin_;
		}
		/**
		* Get the referrer policy of the ImageTile.
		* @return {ReferrerPolicy} Referrer policy.
		*/
		getReferrerPolicy() {
			return this.referrerPolicy_;
		}
		/**
		* Tracks loading or read errors.
		*
		* @private
		*/
		handleImageError_() {
			this.state = TileState_default.ERROR;
			this.unlistenImage_();
			this.image_ = getBlankImage();
			this.changed();
		}
		/**
		* Tracks successful image load.
		*
		* @private
		*/
		handleImageLoad_() {
			if (WORKER_OFFSCREEN_CANVAS) this.state = TileState_default.LOADED;
			else {
				const image = this.image_;
				if (image.naturalWidth && image.naturalHeight) this.state = TileState_default.LOADED;
				else this.state = TileState_default.EMPTY;
			}
			this.unlistenImage_();
			this.changed();
		}
		/**
		* Load the image or retry if loading previously failed.
		* Loading is taken care of by the tile queue, and calling this method is
		* only needed for preloading or for reloading in case of an error.
		*
		* To retry loading tiles on failed requests, use a custom `tileLoadFunction`
		* that checks for error status codes and reloads only when the status code is
		* 408, 429, 500, 502, 503 and 504, and only when not too many retries have been
		* made already:
		*
		* ```js
		* const retryCodes = [408, 429, 500, 502, 503, 504];
		* const retries = {};
		* source.setTileLoadFunction((tile, src) => {
		*   const image = tile.getImage();
		*   fetch(src)
		*     .then((response) => {
		*       if (retryCodes.includes(response.status)) {
		*         retries[src] = (retries[src] || 0) + 1;
		*         if (retries[src] <= 3) {
		*           setTimeout(() => tile.load(), retries[src] * 1000);
		*         }
		*         return Promise.reject();
		*       }
		*       return response.blob();
		*     })
		*     .then((blob) => {
		*       const imageUrl = URL.createObjectURL(blob);
		*       image.src = imageUrl;
		*       setTimeout(() => URL.revokeObjectURL(imageUrl), 5000);
		*     })
		*     .catch(() => tile.setState(3)); // error
		* });
		* ```
		* @api
		* @override
		*/
		load() {
			if (this.state == TileState_default.ERROR) {
				this.state = TileState_default.IDLE;
				this.image_ = new Image();
				if (this.crossOrigin_ !== null) this.image_.crossOrigin = this.crossOrigin_;
				if (this.referrerPolicy_ !== void 0) this.image_.referrerPolicy = this.referrerPolicy_;
			}
			if (this.state == TileState_default.IDLE) {
				this.state = TileState_default.LOADING;
				this.changed();
				this.tileLoadFunction_(this, this.src_);
				this.unlisten_ = listenImage(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this));
			}
		}
		/**
		* Discards event handlers which listen for load completion or errors.
		*
		* @private
		*/
		unlistenImage_() {
			if (this.unlisten_) {
				this.unlisten_();
				this.unlisten_ = null;
			}
		}
		/**
		* @override
		*/
		disposeInternal() {
			this.unlistenImage_();
			this.image_ = null;
			super.disposeInternal();
		}
	};
	/**
	* Get a 1-pixel blank image.
	* @return {HTMLCanvasElement|OffscreenCanvas} Blank image.
	*/
	function getBlankImage() {
		const ctx = createCanvasContext2D(1, 1);
		ctx.fillStyle = "rgba(0,0,0,0)";
		ctx.fillRect(0, 0, 1, 1);
		return ctx.canvas;
	}
	//#endregion
	//#region src/ol/TileRange.js
	/**
	* @module ol/TileRange
	*/
	/**
	* A representation of a contiguous block of tiles.  A tile range is specified
	* by its min/max tile coordinates and is inclusive of coordinates.
	*/
	var TileRange = class {
		/**
		* @param {number} minX Minimum X.
		* @param {number} maxX Maximum X.
		* @param {number} minY Minimum Y.
		* @param {number} maxY Maximum Y.
		*/
		constructor(minX, maxX, minY, maxY) {
			/**
			* @type {number}
			*/
			this.minX = minX;
			/**
			* @type {number}
			*/
			this.maxX = maxX;
			/**
			* @type {number}
			*/
			this.minY = minY;
			/**
			* @type {number}
			*/
			this.maxY = maxY;
		}
		/**
		* @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
		* @return {boolean} Contains tile coordinate.
		*/
		contains(tileCoord) {
			return this.containsXY(tileCoord[1], tileCoord[2]);
		}
		/**
		* @param {TileRange} tileRange Tile range.
		* @return {boolean} Contains.
		*/
		containsTileRange(tileRange) {
			return this.minX <= tileRange.minX && tileRange.maxX <= this.maxX && this.minY <= tileRange.minY && tileRange.maxY <= this.maxY;
		}
		/**
		* @param {number} x Tile coordinate x.
		* @param {number} y Tile coordinate y.
		* @return {boolean} Contains coordinate.
		*/
		containsXY(x, y) {
			return this.minX <= x && x <= this.maxX && this.minY <= y && y <= this.maxY;
		}
		/**
		* @param {TileRange} tileRange Tile range.
		* @return {boolean} Equals.
		*/
		equals(tileRange) {
			return this.minX == tileRange.minX && this.minY == tileRange.minY && this.maxX == tileRange.maxX && this.maxY == tileRange.maxY;
		}
		/**
		* @param {TileRange} tileRange Tile range.
		*/
		extend(tileRange) {
			if (tileRange.minX < this.minX) this.minX = tileRange.minX;
			if (tileRange.maxX > this.maxX) this.maxX = tileRange.maxX;
			if (tileRange.minY < this.minY) this.minY = tileRange.minY;
			if (tileRange.maxY > this.maxY) this.maxY = tileRange.maxY;
		}
		/**
		* @return {number} Height.
		*/
		getHeight() {
			return this.maxY - this.minY + 1;
		}
		/**
		* @return {import("./size.js").Size} Size.
		*/
		getSize() {
			return [this.getWidth(), this.getHeight()];
		}
		/**
		* @return {number} Width.
		*/
		getWidth() {
			return this.maxX - this.minX + 1;
		}
		/**
		* @param {TileRange} tileRange Tile range.
		* @return {boolean} Intersects.
		*/
		intersects(tileRange) {
			return this.minX <= tileRange.maxX && this.maxX >= tileRange.minX && this.minY <= tileRange.maxY && this.maxY >= tileRange.minY;
		}
	};
	/**
	* @param {number} minX Minimum X.
	* @param {number} maxX Maximum X.
	* @param {number} minY Minimum Y.
	* @param {number} maxY Maximum Y.
	* @param {TileRange} [tileRange] TileRange.
	* @return {TileRange} Tile range.
	*/
	function createOrUpdate$1(minX, maxX, minY, maxY, tileRange) {
		if (tileRange !== void 0) {
			tileRange.minX = minX;
			tileRange.maxX = maxX;
			tileRange.minY = minY;
			tileRange.maxY = maxY;
			return tileRange;
		}
		return new TileRange(minX, maxX, minY, maxY);
	}
	//#endregion
	//#region src/ol/reproj.js
	/**
	* @module ol/reproj
	*/
	let brokenDiagonalRendering_;
	/**
	* @type {Array<HTMLCanvasElement|OffscreenCanvas>}
	*/
	const canvasPool = [];
	/**
	* This draws a small triangle into a canvas by setting the triangle as the clip region
	* and then drawing a (too large) rectangle
	*
	* @param {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} ctx The context in which to draw the triangle
	* @param {number} u1 The x-coordinate of the second point. The first point is 0,0.
	* @param {number} v1 The y-coordinate of the second point.
	* @param {number} u2 The x-coordinate of the third point.
	* @param {number} v2 The y-coordinate of the third point.
	*/
	function drawTestTriangle(ctx, u1, v1, u2, v2) {
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(u1, v1);
		ctx.lineTo(u2, v2);
		ctx.closePath();
		ctx.save();
		ctx.clip();
		ctx.fillRect(0, 0, Math.max(u1, u2) + 1, Math.max(v1, v2));
		ctx.restore();
	}
	/**
	* Given the data from getImageData, see if the right values appear at the provided offset.
	* Returns true if either the color or transparency is off
	*
	* @param {Uint8ClampedArray} data The data returned from getImageData
	* @param {number} offset The pixel offset from the start of data.
	* @return {boolean} true if the diagonal rendering is broken
	*/
	function verifyBrokenDiagonalRendering(data, offset) {
		return Math.abs(data[offset * 4] - 210) > 2 || Math.abs(data[offset * 4 + 3] - .75 * 255) > 2;
	}
	/**
	* Determines if the current browser configuration can render triangular clip regions correctly.
	* This value is cached so the function is only expensive the first time called.
	* Firefox on Windows (as of now) does not if HWA is enabled. See https://bugzilla.mozilla.org/show_bug.cgi?id=1606976
	* Chrome works, and everything seems to work on OSX and Android. This function caches the
	* result. I suppose that it is conceivably possible that a browser might flip modes while the app is
	* running, but lets hope not.
	*
	* @return {boolean} true if the Diagonal Rendering is broken.
	*/
	function isBrokenDiagonalRendering() {
		if (brokenDiagonalRendering_ === void 0) {
			const ctx = createCanvasContext2D(6, 6, canvasPool);
			ctx.globalCompositeOperation = "lighter";
			ctx.fillStyle = "rgba(210, 0, 0, 0.75)";
			drawTestTriangle(ctx, 4, 5, 4, 0);
			drawTestTriangle(ctx, 4, 5, 0, 5);
			const data = ctx.getImageData(0, 0, 3, 3).data;
			brokenDiagonalRendering_ = verifyBrokenDiagonalRendering(data, 0) || verifyBrokenDiagonalRendering(data, 4) || verifyBrokenDiagonalRendering(data, 8);
			releaseCanvas(ctx);
			canvasPool.push(ctx.canvas);
		}
		return brokenDiagonalRendering_;
	}
	/**
	* Calculates ideal resolution to use from the source in order to achieve
	* pixel mapping as close as possible to 1:1 during reprojection.
	* The resolution is calculated regardless of what resolutions
	* are actually available in the dataset (TileGrid, Image, ...).
	*
	* @param {import("./proj/Projection.js").default} sourceProj Source projection.
	* @param {import("./proj/Projection.js").default} targetProj Target projection.
	* @param {import("./coordinate.js").Coordinate} targetCenter Target center.
	* @param {number} targetResolution Target resolution.
	* @return {number} The best resolution to use. Can be +-Infinity, NaN or 0.
	*/
	function calculateSourceResolution(sourceProj, targetProj, targetCenter, targetResolution) {
		const sourceCenter = transform(targetCenter, targetProj, sourceProj);
		let sourceResolution = getPointResolution(targetProj, targetResolution, targetCenter);
		const targetMetersPerUnit = targetProj.getMetersPerUnit();
		if (targetMetersPerUnit !== void 0) sourceResolution *= targetMetersPerUnit;
		const sourceMetersPerUnit = sourceProj.getMetersPerUnit();
		if (sourceMetersPerUnit !== void 0) sourceResolution /= sourceMetersPerUnit;
		const sourceExtent = sourceProj.getExtent();
		if (!sourceExtent || containsCoordinate(sourceExtent, sourceCenter)) {
			const compensationFactor = getPointResolution(sourceProj, sourceResolution, sourceCenter) / sourceResolution;
			if (isFinite(compensationFactor) && compensationFactor > 0) sourceResolution /= compensationFactor;
		}
		return sourceResolution;
	}
	/**
	* Calculates ideal resolution to use from the source in order to achieve
	* pixel mapping as close as possible to 1:1 during reprojection.
	* The resolution is calculated regardless of what resolutions
	* are actually available in the dataset (TileGrid, Image, ...).
	*
	* @param {import("./proj/Projection.js").default} sourceProj Source projection.
	* @param {import("./proj/Projection.js").default} targetProj Target projection.
	* @param {import("./extent.js").Extent} targetExtent Target extent
	* @param {number} targetResolution Target resolution.
	* @return {number} The best resolution to use. Can be +-Infinity, NaN or 0.
	*/
	function calculateSourceExtentResolution(sourceProj, targetProj, targetExtent, targetResolution) {
		let sourceResolution = calculateSourceResolution(sourceProj, targetProj, getCenter(targetExtent), targetResolution);
		if (!isFinite(sourceResolution) || sourceResolution <= 0) forEachCorner(targetExtent, function(corner) {
			sourceResolution = calculateSourceResolution(sourceProj, targetProj, corner, targetResolution);
			return isFinite(sourceResolution) && sourceResolution > 0;
		});
		return sourceResolution;
	}
	/**
	* @typedef {Object} ImageExtent
	* @property {import("./extent.js").Extent} extent Extent.
	* @property {import("./extent.js").Extent} [clipExtent] Clip extent.
	* @property {import('./DataTile.js').ImageLike} image Image.
	*/
	/**
	* Renders the source data into new canvas based on the triangulation.
	*
	* @param {number} width Width of the canvas.
	* @param {number} height Height of the canvas.
	* @param {number} pixelRatio Pixel ratio.
	* @param {number} sourceResolution Source resolution.
	* @param {import("./extent.js").Extent} sourceExtent Extent of the data source.
	* @param {number} targetResolution Target resolution.
	* @param {import("./extent.js").Extent} targetExtent Target extent.
	* @param {import("./reproj/Triangulation.js").default} triangulation Calculated triangulation.
	* @param {Array<ImageExtent>} sources Array of sources.
	* @param {number} gutter Gutter of the sources.
	* @param {boolean} [renderEdges] Render reprojection edges.
	* @param {boolean} [interpolate] Use linear interpolation when resampling.
	* @param {boolean} [drawSingle] Draw single source images directly without stitchContext.
	* @param {boolean} [clipExtent] Clip stitchContext to sourceExtent.
	* @return {HTMLCanvasElement|OffscreenCanvas} Canvas with reprojected data.
	*/
	function render(width, height, pixelRatio, sourceResolution, sourceExtent, targetResolution, targetExtent, triangulation, sources, gutter, renderEdges, interpolate, drawSingle, clipExtent) {
		const context = createCanvasContext2D(Math.round(pixelRatio * width), Math.round(pixelRatio * height), canvasPool);
		if (!interpolate) context.imageSmoothingEnabled = false;
		if (sources.length === 0) return context.canvas;
		context.scale(pixelRatio, pixelRatio);
		function pixelRound(value) {
			return Math.round(value * pixelRatio) / pixelRatio;
		}
		context.globalCompositeOperation = "lighter";
		const sourceDataExtent = createEmpty();
		sources.forEach(function(src, i, arr) {
			extend$1(sourceDataExtent, src.extent);
		});
		let stitchContext;
		const stitchScale = pixelRatio / sourceResolution;
		const inverseScale = (interpolate ? 1 : 1 + Math.pow(2, -24)) / stitchScale;
		if (!drawSingle || sources.length !== 1 || gutter !== 0) {
			stitchContext = createCanvasContext2D(Math.round(getWidth(sourceDataExtent) * stitchScale), Math.round(getHeight(sourceDataExtent) * stitchScale), canvasPool);
			if (!interpolate) stitchContext.imageSmoothingEnabled = false;
			if (sourceExtent && clipExtent) {
				const xPos = (sourceExtent[0] - sourceDataExtent[0]) * stitchScale;
				const yPos = -(sourceExtent[3] - sourceDataExtent[3]) * stitchScale;
				const width = getWidth(sourceExtent) * stitchScale;
				const height = getHeight(sourceExtent) * stitchScale;
				stitchContext.rect(xPos, yPos, width, height);
				stitchContext.clip();
			}
			sources.forEach(function(src, i, arr) {
				if (src.image.width > 0 && src.image.height > 0) {
					if (src.clipExtent) {
						stitchContext.save();
						const xPos = (src.clipExtent[0] - sourceDataExtent[0]) * stitchScale;
						const yPos = -(src.clipExtent[3] - sourceDataExtent[3]) * stitchScale;
						const width = getWidth(src.clipExtent) * stitchScale;
						const height = getHeight(src.clipExtent) * stitchScale;
						stitchContext.rect(interpolate ? xPos : Math.round(xPos), interpolate ? yPos : Math.round(yPos), interpolate ? width : Math.round(xPos + width) - Math.round(xPos), interpolate ? height : Math.round(yPos + height) - Math.round(yPos));
						stitchContext.clip();
					}
					const xPos = (src.extent[0] - sourceDataExtent[0]) * stitchScale;
					const yPos = -(src.extent[3] - sourceDataExtent[3]) * stitchScale;
					const srcWidth = getWidth(src.extent) * stitchScale;
					const srcHeight = getHeight(src.extent) * stitchScale;
					stitchContext.drawImage(src.image, gutter, gutter, src.image.width - 2 * gutter, src.image.height - 2 * gutter, interpolate ? xPos : Math.round(xPos), interpolate ? yPos : Math.round(yPos), interpolate ? srcWidth : Math.round(xPos + srcWidth) - Math.round(xPos), interpolate ? srcHeight : Math.round(yPos + srcHeight) - Math.round(yPos));
					if (src.clipExtent) stitchContext.restore();
				}
			});
		}
		const targetTopLeft = getTopLeft(targetExtent);
		triangulation.getTriangles().forEach(function(triangle, i, arr) {
			const source = triangle.source;
			const target = triangle.target;
			let x0 = source[0][0], y0 = source[0][1];
			let x1 = source[1][0], y1 = source[1][1];
			let x2 = source[2][0], y2 = source[2][1];
			const u0 = pixelRound((target[0][0] - targetTopLeft[0]) / targetResolution);
			const v0 = pixelRound(-(target[0][1] - targetTopLeft[1]) / targetResolution);
			const u1 = pixelRound((target[1][0] - targetTopLeft[0]) / targetResolution);
			const v1 = pixelRound(-(target[1][1] - targetTopLeft[1]) / targetResolution);
			const u2 = pixelRound((target[2][0] - targetTopLeft[0]) / targetResolution);
			const v2 = pixelRound(-(target[2][1] - targetTopLeft[1]) / targetResolution);
			const sourceNumericalShiftX = x0;
			const sourceNumericalShiftY = y0;
			x0 = 0;
			y0 = 0;
			x1 -= sourceNumericalShiftX;
			y1 -= sourceNumericalShiftY;
			x2 -= sourceNumericalShiftX;
			y2 -= sourceNumericalShiftY;
			const affineCoefs = solveLinearSystem([
				[
					x1,
					y1,
					0,
					0,
					u1 - u0
				],
				[
					x2,
					y2,
					0,
					0,
					u2 - u0
				],
				[
					0,
					0,
					x1,
					y1,
					v1 - v0
				],
				[
					0,
					0,
					x2,
					y2,
					v2 - v0
				]
			]);
			if (!affineCoefs) return;
			context.save();
			context.beginPath();
			if (isBrokenDiagonalRendering() || !interpolate) {
				context.moveTo(u1, v1);
				const steps = 4;
				const ud = u0 - u1;
				const vd = v0 - v1;
				for (let step = 0; step < steps; step++) {
					context.lineTo(u1 + pixelRound((step + 1) * ud / steps), v1 + pixelRound(step * vd / (steps - 1)));
					if (step != steps - 1) context.lineTo(u1 + pixelRound((step + 1) * ud / steps), v1 + pixelRound((step + 1) * vd / (steps - 1)));
				}
				context.lineTo(u2, v2);
			} else {
				context.moveTo(u1, v1);
				context.lineTo(u0, v0);
				context.lineTo(u2, v2);
			}
			context.clip();
			context.transform(affineCoefs[0], affineCoefs[2], affineCoefs[1], affineCoefs[3], u0, v0);
			context.translate(sourceDataExtent[0] - sourceNumericalShiftX, sourceDataExtent[3] - sourceNumericalShiftY);
			let image;
			if (stitchContext) {
				image = stitchContext.canvas;
				context.scale(inverseScale, -inverseScale);
			} else {
				const source = sources[0];
				const extent = source.extent;
				image = source.image;
				context.scale(getWidth(extent) / image.width, -getHeight(extent) / image.height);
			}
			context.drawImage(image, 0, 0);
			context.restore();
		});
		if (stitchContext) {
			releaseCanvas(stitchContext);
			canvasPool.push(stitchContext.canvas);
		}
		if (renderEdges) {
			context.save();
			context.globalCompositeOperation = "source-over";
			context.strokeStyle = "black";
			context.lineWidth = 1;
			triangulation.getTriangles().forEach(function(triangle, i, arr) {
				const target = triangle.target;
				const u0 = (target[0][0] - targetTopLeft[0]) / targetResolution;
				const v0 = -(target[0][1] - targetTopLeft[1]) / targetResolution;
				const u1 = (target[1][0] - targetTopLeft[0]) / targetResolution;
				const v1 = -(target[1][1] - targetTopLeft[1]) / targetResolution;
				const u2 = (target[2][0] - targetTopLeft[0]) / targetResolution;
				const v2 = -(target[2][1] - targetTopLeft[1]) / targetResolution;
				context.beginPath();
				context.moveTo(u1, v1);
				context.lineTo(u0, v0);
				context.lineTo(u2, v2);
				context.closePath();
				context.stroke();
			});
			context.restore();
		}
		return context.canvas;
	}
	//#endregion
	//#region src/ol/reproj/Triangulation.js
	/**
	* @module ol/reproj/Triangulation
	*/
	/**
	* Single triangle; consists of 3 source points and 3 target points.
	* @typedef {Object} Triangle
	* @property {Array<import("../coordinate.js").Coordinate>} source Source.
	* @property {Array<import("../coordinate.js").Coordinate>} target Target.
	*/
	/**
	* Maximum number of subdivision steps during raster reprojection triangulation.
	* Prevents high memory usage and large number of proj4 calls (for certain
	* transformations and areas). At most `2*(2^this)` triangles are created for
	* each triangulated extent (tile/image).
	* @type {number}
	*/
	const MAX_SUBDIVISION = 10;
	/**
	* Maximum allowed size of triangle relative to world width. When transforming
	* corners of world extent between certain projections, the resulting
	* triangulation seems to have zero error and no subdivision is performed. If
	* the triangle width is more than this (relative to world width; 0-1),
	* subdivison is forced (up to `MAX_SUBDIVISION`). Default is `0.25`.
	* @type {number}
	*/
	const MAX_TRIANGLE_WIDTH = .25;
	/**
	* @classdesc
	* Class containing triangulation of the given target extent.
	* Used for determining source data and the reprojection itself.
	*/
	var Triangulation = class {
		/**
		* @param {import("../proj/Projection.js").default} sourceProj Source projection.
		* @param {import("../proj/Projection.js").default} targetProj Target projection.
		* @param {import("../extent.js").Extent} targetExtent Target extent to triangulate.
		* @param {import("../extent.js").Extent} maxSourceExtent Maximal source extent that can be used.
		* @param {number} errorThreshold Acceptable error (in source units).
		* @param {?number} destinationResolution The (optional) resolution of the destination.
		* @param {import("../transform.js").Transform} [sourceMatrix] Source transform matrix.
		*/
		constructor(sourceProj, targetProj, targetExtent, maxSourceExtent, errorThreshold, destinationResolution, sourceMatrix) {
			/**
			* @type {import("../proj/Projection.js").default}
			* @private
			*/
			this.sourceProj_ = sourceProj;
			/**
			* @type {import("../proj/Projection.js").default}
			* @private
			*/
			this.targetProj_ = targetProj;
			/** @type {!Object<string, import("../coordinate.js").Coordinate>} */
			let transformInvCache = {};
			const transformInv = sourceMatrix ? createTransformFromCoordinateTransform((input) => apply(sourceMatrix, transform(input, this.targetProj_, this.sourceProj_))) : getTransform(this.targetProj_, this.sourceProj_);
			/**
			* @param {import("../coordinate.js").Coordinate} c A coordinate.
			* @return {import("../coordinate.js").Coordinate} Transformed coordinate.
			* @private
			*/
			this.transformInv_ = function(c) {
				const key = c[0] + "/" + c[1];
				if (!transformInvCache[key]) transformInvCache[key] = transformInv(c);
				return transformInvCache[key];
			};
			/**
			* @type {import("../extent.js").Extent}
			* @private
			*/
			this.maxSourceExtent_ = maxSourceExtent;
			/**
			* @type {number}
			* @private
			*/
			this.errorThresholdSquared_ = errorThreshold * errorThreshold;
			/**
			* @type {Array<Triangle>}
			* @private
			*/
			this.triangles_ = [];
			/**
			* Indicates that the triangulation crosses edge of the source projection.
			* @type {boolean}
			* @private
			*/
			this.wrapsXInSource_ = false;
			/**
			* @type {boolean}
			* @private
			*/
			this.canWrapXInSource_ = this.sourceProj_.canWrapX() && !!maxSourceExtent && !!this.sourceProj_.getExtent() && getWidth(maxSourceExtent) >= getWidth(this.sourceProj_.getExtent());
			/**
			* @type {?number}
			* @private
			*/
			this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? getWidth(this.sourceProj_.getExtent()) : null;
			/**
			* @type {?number}
			* @private
			*/
			this.targetWorldWidth_ = this.targetProj_.getExtent() ? getWidth(this.targetProj_.getExtent()) : null;
			const destinationTopLeft = getTopLeft(targetExtent);
			const destinationTopRight = getTopRight(targetExtent);
			const destinationBottomRight = getBottomRight(targetExtent);
			const destinationBottomLeft = getBottomLeft(targetExtent);
			const sourceTopLeft = this.transformInv_(destinationTopLeft);
			const sourceTopRight = this.transformInv_(destinationTopRight);
			const sourceBottomRight = this.transformInv_(destinationBottomRight);
			const sourceBottomLeft = this.transformInv_(destinationBottomLeft);
			const maxSubdivision = MAX_SUBDIVISION + (destinationResolution ? Math.max(0, Math.ceil(Math.log2(getArea(targetExtent) / (destinationResolution * destinationResolution * 256 * 256)))) : 0);
			this.addQuad_(destinationTopLeft, destinationTopRight, destinationBottomRight, destinationBottomLeft, sourceTopLeft, sourceTopRight, sourceBottomRight, sourceBottomLeft, maxSubdivision);
			if (this.wrapsXInSource_) {
				let leftBound = Infinity;
				this.triangles_.forEach(function(triangle, i, arr) {
					leftBound = Math.min(leftBound, triangle.source[0][0], triangle.source[1][0], triangle.source[2][0]);
				});
				this.triangles_.forEach((triangle) => {
					if (Math.max(triangle.source[0][0], triangle.source[1][0], triangle.source[2][0]) - leftBound > this.sourceWorldWidth_ / 2) {
						const newTriangle = [
							[triangle.source[0][0], triangle.source[0][1]],
							[triangle.source[1][0], triangle.source[1][1]],
							[triangle.source[2][0], triangle.source[2][1]]
						];
						if (newTriangle[0][0] - leftBound > this.sourceWorldWidth_ / 2) newTriangle[0][0] -= this.sourceWorldWidth_;
						if (newTriangle[1][0] - leftBound > this.sourceWorldWidth_ / 2) newTriangle[1][0] -= this.sourceWorldWidth_;
						if (newTriangle[2][0] - leftBound > this.sourceWorldWidth_ / 2) newTriangle[2][0] -= this.sourceWorldWidth_;
						const minX = Math.min(newTriangle[0][0], newTriangle[1][0], newTriangle[2][0]);
						if (Math.max(newTriangle[0][0], newTriangle[1][0], newTriangle[2][0]) - minX < this.sourceWorldWidth_ / 2) triangle.source = newTriangle;
					}
				});
			}
			transformInvCache = {};
		}
		/**
		* Adds triangle to the triangulation.
		* @param {import("../coordinate.js").Coordinate} a The target a coordinate.
		* @param {import("../coordinate.js").Coordinate} b The target b coordinate.
		* @param {import("../coordinate.js").Coordinate} c The target c coordinate.
		* @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
		* @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
		* @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
		* @private
		*/
		addTriangle_(a, b, c, aSrc, bSrc, cSrc) {
			this.triangles_.push({
				source: [
					aSrc,
					bSrc,
					cSrc
				],
				target: [
					a,
					b,
					c
				]
			});
		}
		/**
		* Adds quad (points in clock-wise order) to the triangulation
		* (and reprojects the vertices) if valid.
		* Performs quad subdivision if needed to increase precision.
		*
		* @param {import("../coordinate.js").Coordinate} a The target a coordinate.
		* @param {import("../coordinate.js").Coordinate} b The target b coordinate.
		* @param {import("../coordinate.js").Coordinate} c The target c coordinate.
		* @param {import("../coordinate.js").Coordinate} d The target d coordinate.
		* @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
		* @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
		* @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
		* @param {import("../coordinate.js").Coordinate} dSrc The source d coordinate.
		* @param {number} maxSubdivision Maximal allowed subdivision of the quad.
		* @private
		*/
		addQuad_(a, b, c, d, aSrc, bSrc, cSrc, dSrc, maxSubdivision) {
			const sourceQuadExtent = boundingExtent([
				aSrc,
				bSrc,
				cSrc,
				dSrc
			]);
			const sourceCoverageX = this.sourceWorldWidth_ ? getWidth(sourceQuadExtent) / this.sourceWorldWidth_ : null;
			const sourceWorldWidth = this.sourceWorldWidth_;
			const wrapsX = this.sourceProj_.canWrapX() && sourceCoverageX > .5 && sourceCoverageX < 1;
			let needsSubdivision = false;
			if (maxSubdivision > 0) {
				if (this.targetProj_.isGlobal() && this.targetWorldWidth_) needsSubdivision = getWidth(boundingExtent([
					a,
					b,
					c,
					d
				])) / this.targetWorldWidth_ > MAX_TRIANGLE_WIDTH || needsSubdivision;
				if (!wrapsX && this.sourceProj_.isGlobal() && sourceCoverageX) needsSubdivision = sourceCoverageX > MAX_TRIANGLE_WIDTH || needsSubdivision;
			}
			if (!needsSubdivision && this.maxSourceExtent_) {
				if (isFinite(sourceQuadExtent[0]) && isFinite(sourceQuadExtent[1]) && isFinite(sourceQuadExtent[2]) && isFinite(sourceQuadExtent[3])) {
					if (!intersects$1(sourceQuadExtent, this.maxSourceExtent_)) return;
				}
			}
			let isNotFinite = 0;
			if (!needsSubdivision) {
				if (!isFinite(aSrc[0]) || !isFinite(aSrc[1]) || !isFinite(bSrc[0]) || !isFinite(bSrc[1]) || !isFinite(cSrc[0]) || !isFinite(cSrc[1]) || !isFinite(dSrc[0]) || !isFinite(dSrc[1])) if (maxSubdivision > 0) needsSubdivision = true;
				else {
					isNotFinite = (!isFinite(aSrc[0]) || !isFinite(aSrc[1]) ? 8 : 0) + (!isFinite(bSrc[0]) || !isFinite(bSrc[1]) ? 4 : 0) + (!isFinite(cSrc[0]) || !isFinite(cSrc[1]) ? 2 : 0) + (!isFinite(dSrc[0]) || !isFinite(dSrc[1]) ? 1 : 0);
					if (isNotFinite != 1 && isNotFinite != 2 && isNotFinite != 4 && isNotFinite != 8) return;
				}
			}
			if (maxSubdivision > 0) {
				if (!needsSubdivision) {
					const center = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2];
					const centerSrc = this.transformInv_(center);
					let dx;
					if (wrapsX) dx = (modulo(aSrc[0], sourceWorldWidth) + modulo(cSrc[0], sourceWorldWidth)) / 2 - modulo(centerSrc[0], sourceWorldWidth);
					else dx = (aSrc[0] + cSrc[0]) / 2 - centerSrc[0];
					const dy = (aSrc[1] + cSrc[1]) / 2 - centerSrc[1];
					needsSubdivision = dx * dx + dy * dy > this.errorThresholdSquared_;
				}
				if (needsSubdivision) {
					if (Math.abs(a[0] - c[0]) <= Math.abs(a[1] - c[1])) {
						const bc = [(b[0] + c[0]) / 2, (b[1] + c[1]) / 2];
						const bcSrc = this.transformInv_(bc);
						const da = [(d[0] + a[0]) / 2, (d[1] + a[1]) / 2];
						const daSrc = this.transformInv_(da);
						this.addQuad_(a, b, bc, da, aSrc, bSrc, bcSrc, daSrc, maxSubdivision - 1);
						this.addQuad_(da, bc, c, d, daSrc, bcSrc, cSrc, dSrc, maxSubdivision - 1);
					} else {
						const ab = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
						const abSrc = this.transformInv_(ab);
						const cd = [(c[0] + d[0]) / 2, (c[1] + d[1]) / 2];
						const cdSrc = this.transformInv_(cd);
						this.addQuad_(a, ab, cd, d, aSrc, abSrc, cdSrc, dSrc, maxSubdivision - 1);
						this.addQuad_(ab, b, c, cd, abSrc, bSrc, cSrc, cdSrc, maxSubdivision - 1);
					}
					return;
				}
			}
			if (wrapsX) {
				if (!this.canWrapXInSource_) return;
				this.wrapsXInSource_ = true;
			}
			if ((isNotFinite & 11) == 0) this.addTriangle_(a, c, d, aSrc, cSrc, dSrc);
			if ((isNotFinite & 14) == 0) this.addTriangle_(a, c, b, aSrc, cSrc, bSrc);
			if (isNotFinite) {
				if ((isNotFinite & 13) == 0) this.addTriangle_(b, d, a, bSrc, dSrc, aSrc);
				if ((isNotFinite & 7) == 0) this.addTriangle_(b, d, c, bSrc, dSrc, cSrc);
			}
		}
		/**
		* Calculates extent of the `source` coordinates from all the triangles.
		*
		* @return {import("../extent.js").Extent} Calculated extent.
		*/
		calculateSourceExtent() {
			const extent = createEmpty();
			this.triangles_.forEach(function(triangle, i, arr) {
				const src = triangle.source;
				extendCoordinate(extent, src[0]);
				extendCoordinate(extent, src[1]);
				extendCoordinate(extent, src[2]);
			});
			return extent;
		}
		/**
		* @return {Array<Triangle>} Array of the calculated triangles.
		*/
		getTriangles() {
			return this.triangles_;
		}
	};
	//#endregion
	//#region src/ol/reproj/common.js
	/**
	* @module ol/reproj/common
	*/
	/**
	* Default maximum allowed threshold  (in pixels) for reprojection
	* triangulation.
	* @type {number}
	*/
	const ERROR_THRESHOLD = .5;
	//#endregion
	//#region src/ol/reproj/Tile.js
	/**
	* @module ol/reproj/Tile
	*/
	/**
	* @typedef {function(number, number, number, number) : (import("../ImageTile.js").default)} FunctionType
	*/
	/**
	* @typedef {Object} TileOffset
	* @property {import("../ImageTile.js").default} [tile] Tile.
	* @property {function(): import("../ImageTile.js").default} getTile Tile getter.
	* @property {number} offset Offset.
	*/
	/**
	* @classdesc
	* Class encapsulating single reprojected tile.
	* See {@link module:ol/source/TileImage~TileImage}.
	*
	*/
	var ReprojTile = class extends Tile {
		/**
		* @param {import("../proj/Projection.js").default} sourceProj Source projection.
		* @param {import("../tilegrid/TileGrid.js").default} sourceTileGrid Source tile grid.
		* @param {import("../proj/Projection.js").default} targetProj Target projection.
		* @param {import("../tilegrid/TileGrid.js").default} targetTileGrid Target tile grid.
		* @param {import("../tilecoord.js").TileCoord} tileCoord Coordinate of the tile.
		* @param {import("../tilecoord.js").TileCoord} wrappedTileCoord Coordinate of the tile wrapped in X.
		* @param {number} pixelRatio Pixel ratio.
		* @param {number} gutter Gutter of the source tiles.
		* @param {FunctionType} getTileFunction
		*     Function returning source tiles (z, x, y, pixelRatio).
		* @param {number} [errorThreshold] Acceptable reprojection error (in px).
		* @param {boolean} [renderEdges] Render reprojection edges.
		* @param {import("../Tile.js").Options} [options] Tile options.
		*/
		constructor(sourceProj, sourceTileGrid, targetProj, targetTileGrid, tileCoord, wrappedTileCoord, pixelRatio, gutter, getTileFunction, errorThreshold, renderEdges, options) {
			super(tileCoord, TileState_default.IDLE, options);
			/**
			* @private
			* @type {boolean}
			*/
			this.renderEdges_ = renderEdges !== void 0 ? renderEdges : false;
			/**
			* @private
			* @type {number}
			*/
			this.pixelRatio_ = pixelRatio;
			/**
			* @private
			* @type {number}
			*/
			this.gutter_ = gutter;
			/**
			* @private
			* @type {HTMLCanvasElement|OffscreenCanvas}
			*/
			this.canvas_ = null;
			/**
			* @private
			* @type {import("../tilegrid/TileGrid.js").default}
			*/
			this.sourceTileGrid_ = sourceTileGrid;
			/**
			* @private
			* @type {import("../tilegrid/TileGrid.js").default}
			*/
			this.targetTileGrid_ = targetTileGrid;
			/**
			* @private
			* @type {import("../tilecoord.js").TileCoord}
			*/
			this.wrappedTileCoord_ = wrappedTileCoord ? wrappedTileCoord : tileCoord;
			/**
			* @private
			* @type {!Array<TileOffset>}
			*/
			this.sourceTiles_ = [];
			/**
			* @private
			* @type {?Array<import("../events.js").EventsKey>}
			*/
			this.sourcesListenerKeys_ = null;
			/**
			* @private
			* @type {number}
			*/
			this.sourceZ_ = 0;
			/**
			* @private
			* @type {import("../extent.js").Extent}
			*/
			this.clipExtent_ = sourceProj.canWrapX() ? sourceProj.getExtent() : void 0;
			const targetExtent = targetTileGrid.getTileCoordExtent(this.wrappedTileCoord_);
			const maxTargetExtent = this.targetTileGrid_.getExtent();
			let maxSourceExtent = this.sourceTileGrid_.getExtent();
			const limitedTargetExtent = maxTargetExtent ? getIntersection(targetExtent, maxTargetExtent) : targetExtent;
			if (getArea(limitedTargetExtent) === 0) {
				this.state = TileState_default.EMPTY;
				return;
			}
			const sourceProjExtent = sourceProj.getExtent();
			if (sourceProjExtent) if (!maxSourceExtent) maxSourceExtent = sourceProjExtent;
			else maxSourceExtent = getIntersection(maxSourceExtent, sourceProjExtent);
			const targetResolution = targetTileGrid.getResolution(this.wrappedTileCoord_[0]);
			const sourceResolution = calculateSourceExtentResolution(sourceProj, targetProj, limitedTargetExtent, targetResolution);
			if (!isFinite(sourceResolution) || sourceResolution <= 0) {
				this.state = TileState_default.EMPTY;
				return;
			}
			const errorThresholdInPixels = errorThreshold !== void 0 ? errorThreshold : ERROR_THRESHOLD;
			/**
			* @private
			* @type {!import("./Triangulation.js").default}
			*/
			this.triangulation_ = new Triangulation(sourceProj, targetProj, limitedTargetExtent, maxSourceExtent, sourceResolution * errorThresholdInPixels, targetResolution);
			if (this.triangulation_.getTriangles().length === 0) {
				this.state = TileState_default.EMPTY;
				return;
			}
			this.sourceZ_ = sourceTileGrid.getZForResolution(sourceResolution);
			let sourceExtent = this.triangulation_.calculateSourceExtent();
			if (maxSourceExtent) if (sourceProj.canWrapX()) {
				sourceExtent[1] = clamp(sourceExtent[1], maxSourceExtent[1], maxSourceExtent[3]);
				sourceExtent[3] = clamp(sourceExtent[3], maxSourceExtent[1], maxSourceExtent[3]);
			} else sourceExtent = getIntersection(sourceExtent, maxSourceExtent);
			if (!getArea(sourceExtent)) this.state = TileState_default.EMPTY;
			else {
				let worldWidth = 0;
				let worldsAway = 0;
				if (sourceProj.canWrapX()) {
					worldWidth = getWidth(sourceProjExtent);
					worldsAway = Math.floor((sourceExtent[0] - sourceProjExtent[0]) / worldWidth);
				}
				wrapAndSliceX(sourceExtent.slice(), sourceProj, true).forEach((extent) => {
					const sourceRange = sourceTileGrid.getTileRangeForExtentAndZ(extent, this.sourceZ_);
					for (let srcX = sourceRange.minX; srcX <= sourceRange.maxX; srcX++) for (let srcY = sourceRange.minY; srcY <= sourceRange.maxY; srcY++) {
						const offset = worldsAway * worldWidth;
						this.sourceTiles_.push({
							getTile: () => getTileFunction(this.sourceZ_, srcX, srcY, pixelRatio),
							offset
						});
					}
					++worldsAway;
				});
				if (this.sourceTiles_.length === 0) this.state = TileState_default.EMPTY;
			}
		}
		/**
		* Get the HTML Canvas element for this tile.
		* @return {HTMLCanvasElement|OffscreenCanvas} Canvas.
		*/
		getImage() {
			return this.canvas_;
		}
		/**
		* @private
		*/
		reproject_() {
			const sources = [];
			this.sourceTiles_.forEach((source) => {
				const tile = source.tile;
				if (tile && tile.getState() == TileState_default.LOADED) {
					const extent = this.sourceTileGrid_.getTileCoordExtent(tile.tileCoord);
					extent[0] += source.offset;
					extent[2] += source.offset;
					const clipExtent = this.clipExtent_?.slice();
					if (clipExtent) {
						clipExtent[0] += source.offset;
						clipExtent[2] += source.offset;
					}
					sources.push({
						extent,
						clipExtent,
						image: tile.getImage()
					});
				}
			});
			this.sourceTiles_.length = 0;
			if (sources.length === 0) this.state = TileState_default.ERROR;
			else {
				const z = this.wrappedTileCoord_[0];
				const size = this.targetTileGrid_.getTileSize(z);
				const width = typeof size === "number" ? size : size[0];
				const height = typeof size === "number" ? size : size[1];
				const targetResolution = this.targetTileGrid_.getResolution(z);
				const sourceResolution = this.sourceTileGrid_.getResolution(this.sourceZ_);
				const targetExtent = this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);
				this.canvas_ = render(width, height, this.pixelRatio_, sourceResolution, this.sourceTileGrid_.getExtent(), targetResolution, targetExtent, this.triangulation_, sources, this.gutter_, this.renderEdges_, this.interpolate);
				this.state = TileState_default.LOADED;
			}
			this.changed();
		}
		/**
		* Load not yet loaded URI.
		* @override
		*/
		load() {
			for (const sourceTile of this.sourceTiles_) sourceTile.tile = sourceTile.getTile();
			if (this.state == TileState_default.IDLE) {
				this.state = TileState_default.LOADING;
				this.changed();
				let leftToLoad = 0;
				this.sourcesListenerKeys_ = [];
				this.sourceTiles_.forEach(({ tile }) => {
					const state = tile.getState();
					if (state == TileState_default.IDLE || state == TileState_default.LOADING) {
						leftToLoad++;
						const sourceListenKey = listen(tile, EventType_default$2.CHANGE, (e) => {
							const state = tile.getState();
							if (state == TileState_default.LOADED || state == TileState_default.ERROR || state == TileState_default.EMPTY) {
								unlistenByKey(sourceListenKey);
								leftToLoad--;
								if (leftToLoad === 0) {
									this.unlistenSources_();
									this.reproject_();
								}
							}
						});
						this.sourcesListenerKeys_.push(sourceListenKey);
					}
				});
				if (leftToLoad === 0) setTimeout(this.reproject_.bind(this), 0);
				else this.sourceTiles_.forEach(function({ tile }, i, arr) {
					if (tile.getState() == TileState_default.IDLE) tile.load();
				});
			}
		}
		/**
		* @private
		*/
		unlistenSources_() {
			this.sourcesListenerKeys_.forEach(unlistenByKey);
			this.sourcesListenerKeys_ = null;
		}
		/**
		* Remove from the cache due to expiry
		* @override
		*/
		release() {
			if (this.canvas_) {
				releaseCanvas(this.canvas_.getContext("2d"));
				canvasPool.push(this.canvas_);
				this.canvas_ = null;
			}
			this.sourceTiles_.length = 0;
			super.release();
		}
	};
	//#endregion
	//#region src/ol/structs/LRUCache.js
	/**
	* @module ol/structs/LRUCache
	*/
	/**
	* @typedef {Object} Entry
	* @property {string} key_ Key.
	* @property {Entry|null} newer Newer.
	* @property {Entry|null} older Older.
	* @property {*} value_ Value.
	*/
	/**
	* @classdesc
	* Implements a Least-Recently-Used cache where the keys do not conflict with
	* Object's properties (e.g. 'hasOwnProperty' is not allowed as a key). Expiring
	* items from the cache is the responsibility of the user.
	*
	* @fires import("../events/Event.js").default
	* @template T
	*/
	var LRUCache = class {
		/**
		* @param {number} [highWaterMark] High water mark.
		*/
		constructor(highWaterMark) {
			/**
			* Desired max cache size after expireCache(). If set to 0, no cache entries
			* will be pruned at all.
			* @type {number}
			*/
			this.highWaterMark = highWaterMark !== void 0 ? highWaterMark : 2048;
			/**
			* @private
			* @type {number}
			*/
			this.count_ = 0;
			/**
			* @private
			* @type {!Object<string, Entry>}
			*/
			this.entries_ = {};
			/**
			* @private
			* @type {?Entry}
			*/
			this.oldest_ = null;
			/**
			* @private
			* @type {?Entry}
			*/
			this.newest_ = null;
		}
		deleteOldest() {
			const entry = this.pop();
			if (entry instanceof Disposable) entry.dispose();
		}
		/**
		* @return {boolean} Can expire cache.
		*/
		canExpireCache() {
			return this.highWaterMark > 0 && this.getCount() > this.highWaterMark;
		}
		/**
		* Expire the cache. When the cache entry is a {@link module:ol/Disposable~Disposable},
		* the entry will be disposed.
		* @param {!Object<string, boolean>} [keep] Keys to keep. To be implemented by subclasses.
		*/
		expireCache(keep) {
			while (this.canExpireCache()) this.deleteOldest();
		}
		/**
		* FIXME empty description for jsdoc
		*/
		clear() {
			while (this.oldest_) this.deleteOldest();
		}
		/**
		* @param {string} key Key.
		* @return {boolean} Contains key.
		*/
		containsKey(key) {
			return this.entries_.hasOwnProperty(key);
		}
		/**
		* @param {function(T, string, LRUCache<T>): ?} f The function
		*     to call for every entry from the oldest to the newer. This function takes
		*     3 arguments (the entry value, the entry key and the LRUCache object).
		*     The return value is ignored.
		*/
		forEach(f) {
			let entry = this.oldest_;
			while (entry) {
				f(entry.value_, entry.key_, this);
				entry = entry.newer;
			}
		}
		/**
		* @param {string} key Key.
		* @param {*} [options] Options (reserved for subclasses).
		* @return {T} Value.
		*/
		get(key, options) {
			const entry = this.entries_[key];
			assert(entry !== void 0, "Tried to get a value for a key that does not exist in the cache");
			if (entry === this.newest_) return entry.value_;
			if (entry === this.oldest_) {
				this.oldest_ = this.oldest_.newer;
				this.oldest_.older = null;
			} else {
				entry.newer.older = entry.older;
				entry.older.newer = entry.newer;
			}
			entry.newer = null;
			entry.older = this.newest_;
			this.newest_.newer = entry;
			this.newest_ = entry;
			return entry.value_;
		}
		/**
		* Remove an entry from the cache.
		* @param {string} key The entry key.
		* @return {T} The removed entry.
		*/
		remove(key) {
			const entry = this.entries_[key];
			assert(entry !== void 0, "Tried to get a value for a key that does not exist in the cache");
			if (entry === this.newest_) {
				this.newest_ = entry.older;
				if (this.newest_) this.newest_.newer = null;
			} else if (entry === this.oldest_) {
				this.oldest_ = entry.newer;
				if (this.oldest_) this.oldest_.older = null;
			} else {
				entry.newer.older = entry.older;
				entry.older.newer = entry.newer;
			}
			delete this.entries_[key];
			--this.count_;
			return entry.value_;
		}
		/**
		* @return {number} Count.
		*/
		getCount() {
			return this.count_;
		}
		/**
		* @return {Array<string>} Keys.
		*/
		getKeys() {
			const keys = new Array(this.count_);
			let i = 0;
			let entry;
			for (entry = this.newest_; entry; entry = entry.older) keys[i++] = entry.key_;
			return keys;
		}
		/**
		* @return {Array<T>} Values.
		*/
		getValues() {
			const values = new Array(this.count_);
			let i = 0;
			let entry;
			for (entry = this.newest_; entry; entry = entry.older) values[i++] = entry.value_;
			return values;
		}
		/**
		* @return {T} Last value.
		*/
		peekLast() {
			return this.oldest_.value_;
		}
		/**
		* @return {string} Last key.
		*/
		peekLastKey() {
			return this.oldest_.key_;
		}
		/**
		* Get the key of the newest item in the cache.  Throws if the cache is empty.
		* @return {string} The newest key.
		*/
		peekFirstKey() {
			return this.newest_.key_;
		}
		/**
		* Return an entry without updating least recently used time.
		* @param {string} key Key.
		* @return {T|undefined} Value.
		*/
		peek(key) {
			return this.entries_[key]?.value_;
		}
		/**
		* @return {T} value Value.
		*/
		pop() {
			const entry = this.oldest_;
			delete this.entries_[entry.key_];
			if (entry.newer) entry.newer.older = null;
			this.oldest_ = entry.newer;
			if (!this.oldest_) this.newest_ = null;
			--this.count_;
			return entry.value_;
		}
		/**
		* @param {string} key Key.
		* @param {T} value Value.
		*/
		replace(key, value) {
			this.get(key);
			this.entries_[key].value_ = value;
		}
		/**
		* @param {string} key Key.
		* @param {T} value Value.
		*/
		set(key, value) {
			assert(!(key in this.entries_), "Tried to set a value for a key that is used already");
			const entry = {
				key_: key,
				newer: null,
				older: this.newest_,
				value_: value
			};
			if (!this.newest_) this.oldest_ = entry;
			else this.newest_.newer = entry;
			this.newest_ = entry;
			this.entries_[key] = entry;
			++this.count_;
		}
		/**
		* Set a maximum number of entries for the cache.
		* @param {number} size Cache size.
		* @api
		*/
		setSize(size) {
			this.highWaterMark = size;
		}
	};
	//#endregion
	//#region src/ol/tilecoord.js
	/**
	* @module ol/tilecoord
	*/
	/**
	* An array of three numbers representing the location of a tile in a tile
	* grid. The order is `z` (zoom level), `x` (column), and `y` (row).
	* @typedef {Array<number>} TileCoord
	* @api
	*/
	/**
	* @param {number} z Z.
	* @param {number} x X.
	* @param {number} y Y.
	* @param {TileCoord} [tileCoord] Tile coordinate.
	* @return {TileCoord} Tile coordinate.
	*/
	function createOrUpdate(z, x, y, tileCoord) {
		if (tileCoord !== void 0) {
			tileCoord[0] = z;
			tileCoord[1] = x;
			tileCoord[2] = y;
			return tileCoord;
		}
		return [
			z,
			x,
			y
		];
	}
	/**
	* @param {number} z Z.
	* @param {number} x X.
	* @param {number} y Y.
	* @return {string} Key.
	*/
	function getKeyZXY(z, x, y) {
		return z + "/" + x + "/" + y;
	}
	/**
	* @param {import("./source/Tile.js").default} source The tile source.
	* @param {string} sourceKey The source key.
	* @param {number} z The tile z level.
	* @param {number} x The tile x level.
	* @param {number} y The tile y level.
	* @return {string} The cache key.
	*/
	function getCacheKey(source, sourceKey, z, x, y) {
		return `${getUid(source)},${sourceKey},${getKeyZXY(z, x, y)}`;
	}
	/**
	* @param {TileCoord} tileCoord Tile coord.
	* @return {number} Hash.
	*/
	function hash(tileCoord) {
		return hashZXY(tileCoord[0], tileCoord[1], tileCoord[2]);
	}
	/**
	* @param {number} z The tile z coordinate.
	* @param {number} x The tile x coordinate.
	* @param {number} y The tile y coordinate.
	* @return {number} Hash.
	*/
	function hashZXY(z, x, y) {
		return (x << z) + y;
	}
	/**
	* @param {TileCoord} tileCoord Tile coordinate.
	* @param {!import("./tilegrid/TileGrid.js").default} tileGrid Tile grid.
	* @return {boolean} Tile coordinate is within extent and zoom level range.
	*/
	function withinExtentAndZ(tileCoord, tileGrid) {
		const z = tileCoord[0];
		const x = tileCoord[1];
		const y = tileCoord[2];
		if (tileGrid.getMinZoom() > z || z > tileGrid.getMaxZoom()) return false;
		const tileRange = tileGrid.getFullTileRange(z);
		if (!tileRange) return true;
		return tileRange.containsXY(x, y);
	}
	//#endregion
	//#region src/ol/render/canvas/ZIndexContext.js
	/**
	* @module ol/render/canvas/ZIndexContext
	*/
	/** @typedef {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D & {globalAlpha: any}} ZIndexContextProxy */
	/**
	* @extends {CanvasRenderingContext2D}
	*/
	var ZIndexContext = class {
		constructor() {
			/**
			* @private
			* @type {Array<Array<*>>}
			*/
			this.instructions_ = [];
			/**
			* @type {number}
			*/
			this.zIndex = 0;
			/**
			* @private
			* @type {number}
			*/
			this.offset_ = 0;
			/**
			* Name of the method last accessed on the proxy, pushed together with its
			* arguments when the method is actually called.
			* @private
			* @type {string|symbol}
			*/
			this.pendingMethod_;
			/**
			* @private
			* @type {ZIndexContextProxy}
			*/
			this.context_ = new Proxy(getSharedCanvasContext2D(), {
				get: (target, property) => {
					if (typeof target[property] !== "function") return;
					this.pendingMethod_ = property;
					return this.pushMethodArgs_;
				},
				set: (target, property, value) => {
					this.push_(property, value);
					return true;
				}
			});
		}
		/**
		* @param {...*} args Arguments to push to the instructions array.
		* @private
		*/
		push_(...args) {
			const instructions = this.instructions_;
			const index = this.zIndex + this.offset_;
			if (!instructions[index]) instructions[index] = [];
			instructions[index].push(...args);
		}
		/**
		* Pushes the method name captured at access time together with the arguments
		* passed at call time. Reused across all proxied method calls.
		* @param {...*} args Args.
		* @private
		*/
		pushMethodArgs_ = (...args) => {
			this.push_(this.pendingMethod_, args);
		};
		/**
		* Push a function that renders to the context directly.
		* @param {function(CanvasRenderingContext2D): void} render Function.
		*/
		pushFunction(render) {
			this.push_(render);
		}
		/**
		* Get a proxy for CanvasRenderingContext2D which does not support getting state
		* (e.g. `context.globalAlpha`, which will return `undefined`). To set state, if it relies on a
		* previous state (e.g. `context.globalAlpha = context.globalAlpha / 2`), set a function,
		* e.g. `context.globalAlpha = (context) => context.globalAlpha / 2`.
		* @return {ZIndexContextProxy} Context.
		*/
		getContext() {
			return this.context_;
		}
		/**
		* @param {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} context Context.
		*/
		draw(context) {
			this.instructions_.forEach((instructionsAtIndex) => {
				for (let i = 0, ii = instructionsAtIndex.length; i < ii; ++i) {
					const property = instructionsAtIndex[i];
					if (typeof property === "function") {
						property(context);
						continue;
					}
					const instructionAtIndex = instructionsAtIndex[++i];
					if (typeof context[property] === "function")
 /** @type {*} */ context[property](...instructionAtIndex);
					else if (typeof instructionAtIndex === "function")
 /** @type {*} */ context[property] = instructionAtIndex(context);
					else
 /** @type {*} */ context[property] = instructionAtIndex;
				}
			});
		}
		clear() {
			this.instructions_.length = 0;
			this.zIndex = 0;
			this.offset_ = 0;
		}
		/**
		* Offsets the zIndex by the highest current zIndex. Useful for rendering multiple worlds or tiles, to
		* avoid conflicting context.clip() or context.save()/restore() calls.
		*/
		offset() {
			this.offset_ = this.instructions_.length;
			this.zIndex = 0;
		}
	};
	//#endregion
	//#region src/ol/renderer/Layer.js
	/**
	* @module ol/renderer/Layer
	*/
	const maxStaleKeys = 5;
	/**
	* @template {import("../layer/Layer.js").default} LayerType
	*/
	var LayerRenderer = class extends Observable {
		/**
		* @param {LayerType} layer Layer.
		*/
		constructor(layer) {
			super();
			/**
			* The renderer is initialized and ready to render.
			* @type {boolean}
			*/
			this.ready = true;
			/** @private */
			this.boundHandleImageChange_ = this.handleImageChange_.bind(this);
			/**
			* @private
			* @type {LayerType}
			*/
			this.layer_ = layer;
			/**
			* @type {Array<string>}
			* @private
			*/
			this.staleKeys_ = new Array();
			/**
			* @type {number}
			* @protected
			*/
			this.maxStaleKeys = maxStaleKeys;
			/**
			* @type {string}
			* @protected
			*/
			this.renderedSourceKey_;
		}
		/**
		* @return {Array<string>} Get the list of stale keys.
		*/
		getStaleKeys() {
			return this.staleKeys_;
		}
		/**
		* @param {string} key The new stale key.
		*/
		prependStaleKey(key) {
			this.staleKeys_.unshift(key);
			if (this.staleKeys_.length > this.maxStaleKeys) this.staleKeys_.length = this.maxStaleKeys;
		}
		/**
		* Remember the previous source key as stale when the key changes.
		* @param {string} sourceKey The current source key.
		* @protected
		*/
		updateStaleKeys(sourceKey) {
			if (!this.renderedSourceKey_) this.renderedSourceKey_ = sourceKey;
			else if (this.renderedSourceKey_ !== sourceKey) {
				this.prependStaleKey(this.renderedSourceKey_);
				this.renderedSourceKey_ = sourceKey;
			}
		}
		/**
		* Asynchronous layer level hit detection.
		* @param {import("../pixel.js").Pixel} pixel Pixel.
		* @return {Promise<Array<import("../Feature.js").FeatureLike>>} Promise that resolves with
		* an array of features.
		*/
		getFeatures(pixel) {
			return abstract();
		}
		/**
		* @param {import("../pixel.js").Pixel} pixel Pixel.
		* @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
		*/
		getData(pixel) {
			return null;
		}
		/**
		* Determine whether render should be called.
		* @abstract
		* @param {import("../Map.js").FrameState} frameState Frame state.
		* @return {boolean} Layer is ready to be rendered.
		*/
		prepareFrame(frameState) {
			return abstract();
		}
		/**
		* Render the layer.
		* @abstract
		* @param {import("../Map.js").FrameState} frameState Frame state.
		* @param {HTMLElement|null} target Target that may be used to render content to.
		* @return {HTMLElement} The rendered element.
		*/
		renderFrame(frameState, target) {
			return abstract();
		}
		/**
		* @abstract
		* @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
		* @param {import("../Map.js").FrameState} frameState Frame state.
		* @param {number} hitTolerance Hit tolerance in pixels.
		* @param {import("./vector.js").FeatureCallback<T>} callback Feature callback.
		* @param {Array<import("./Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
		* @return {T|undefined} Callback result.
		* @template T
		*/
		forEachFeatureAtCoordinate(coordinate, frameState, hitTolerance, callback, matches) {}
		/**
		* @return {LayerType} Layer.
		*/
		getLayer() {
			return this.layer_;
		}
		/**
		* Perform action necessary to get the layer rendered after new fonts have loaded
		* @abstract
		*/
		handleFontsChanged() {}
		/**
		* Handle changes in image state.
		* @param {import("../events/Event.js").default} event Image change event.
		* @private
		*/
		handleImageChange_(event) {
			const image = event.target;
			if (image.getState() === ImageState_default.LOADED || image.getState() === ImageState_default.ERROR) this.renderIfReadyAndVisible();
		}
		/**
		* Load the image if not already loaded, and register the image change
		* listener if needed.
		* @param {import("../Image.js").default} image Image.
		* @return {boolean} `true` if the image is already loaded, `false` otherwise.
		* @protected
		*/
		loadImage(image) {
			let imageState = image.getState();
			if (imageState != ImageState_default.LOADED && imageState != ImageState_default.ERROR) image.addEventListener(EventType_default$2.CHANGE, this.boundHandleImageChange_);
			if (imageState == ImageState_default.IDLE) {
				image.load();
				imageState = image.getState();
			}
			return imageState == ImageState_default.LOADED;
		}
		/**
		* @protected
		*/
		renderIfReadyAndVisible() {
			const layer = this.getLayer();
			if (layer && layer.getVisible() && layer.getSourceState() === "ready") layer.changed();
		}
		/**
		* @param {import("../Map.js").FrameState} frameState Frame state.
		*/
		renderDeferred(frameState) {}
		/**
		* Clean up.
		* @override
		*/
		disposeInternal() {
			delete this.layer_;
			super.disposeInternal();
		}
	};
	//#endregion
	//#region src/ol/renderer/canvas/Layer.js
	/**
	* @module ol/renderer/canvas/Layer
	*/
	/**
	* @type {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D}
	*/
	let pixelContext = null;
	function createPixelContext() {
		pixelContext = createCanvasContext2D(1, 1, void 0, { willReadFrequently: true });
	}
	/**
	* @abstract
	* @template {import("../../layer/Layer.js").default} LayerType
	* @extends {LayerRenderer<LayerType>}
	*/
	var CanvasLayerRenderer = class extends LayerRenderer {
		/**
		* @param {LayerType} layer Layer.
		*/
		constructor(layer) {
			super(layer);
			/**
			* HTMLElement container for the layer to be rendered in.
			* @protected
			* @type {HTMLElement}
			*/
			this.container = null;
			/**
			* @protected
			* @type {number}
			*/
			this.renderedResolution;
			/**
			* A temporary transform.  The values in this transform should only be used in a
			* function that sets the values.
			* @protected
			* @type {import("../../transform.js").Transform}
			*/
			this.tempTransform = create();
			/**
			* The transform for rendered pixels to viewport CSS pixels.  This transform must
			* be set when rendering a frame and may be used by other functions after rendering.
			* @protected
			* @type {import("../../transform.js").Transform}
			*/
			this.pixelTransform = create();
			/**
			* The transform for viewport CSS pixels to rendered pixels.  This transform must
			* be set when rendering a frame and may be used by other functions after rendering.
			* @protected
			* @type {import("../../transform.js").Transform}
			*/
			this.inversePixelTransform = create();
			/**
			* @type {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D}
			*/
			this.context = null;
			/**
			* @private
			* @type {ZIndexContext}
			*/
			this.deferredContext_ = null;
			/**
			* true if the container has been reused from the previous renderer
			* @type {boolean}
			*/
			this.containerReused = false;
			/**
			* @protected
			* @type {import("../../Map.js").FrameState|null}
			*/
			this.frameState = null;
		}
		/**
		* @param {import('../../DataTile.js').ImageLike} image Image.
		* @param {number} col The column index.
		* @param {number} row The row index.
		* @return {Uint8ClampedArray|null} The image data.
		*/
		getImageData(image, col, row) {
			if (!pixelContext) createPixelContext();
			pixelContext.clearRect(0, 0, 1, 1);
			let data;
			try {
				pixelContext.drawImage(image, col, row, 1, 1, 0, 0, 1, 1);
				data = pixelContext.getImageData(0, 0, 1, 1).data;
			} catch {
				pixelContext = null;
				return null;
			}
			return data;
		}
		/**
		* @param {import('../../Map.js').FrameState} frameState Frame state.
		* @return {string} Background color.
		*/
		getBackground(frameState) {
			let background = this.getLayer().getBackground();
			if (typeof background === "function") background = background(frameState.viewState.resolution);
			return background || void 0;
		}
		/**
		* Get a rendering container from an existing target, if compatible.
		* @param {HTMLElement} target Potential render target.
		* @param {string} transform CSS transform matrix.
		* @param {string} [backgroundColor] Background color.
		* @param {number} [width] Physical pixel width of the rendering canvas.
		* @param {number} [height] Physical pixel height of the rendering canvas.
		*/
		useContainer(target, transform, backgroundColor, width, height) {
			if (isCanvas(target) && this.pixelTransform[1] === 0 && this.pixelTransform[2] === 0 && this.pixelTransform[4] === 0 && this.pixelTransform[5] === 0 && target.width === width && target.height === height) {
				const targetCanvas = target;
				const context = targetCanvas.getContext("2d");
				if (context) {
					this.container = target;
					this.context = context;
					this.containerReused = true;
					if (backgroundColor) {
						context.fillStyle = backgroundColor;
						context.fillRect(0, 0, targetCanvas.width, targetCanvas.height);
					}
					return;
				}
			}
			const layerClassName = this.getLayer().getClassName();
			let container, context;
			if (target && target.className === layerClassName && (!backgroundColor || target && target.style.backgroundColor && equals$2(asArray(target.style.backgroundColor), asArray(backgroundColor)))) {
				const canvas = target.firstElementChild;
				if (isCanvas(canvas)) context = canvas.getContext("2d");
			}
			if (context && equivalent(context.canvas.style.transform, transform)) {
				this.container = target;
				this.context = context;
				this.containerReused = true;
			} else if (this.containerReused) {
				this.container = null;
				this.context = null;
				this.containerReused = false;
			} else if (this.container) this.container.style.backgroundColor = null;
			if (!this.container) {
				container = WORKER_OFFSCREEN_CANVAS ? createMockDiv() : document.createElement("div");
				container.className = layerClassName;
				let style = container.style;
				style.position = "absolute";
				style.width = "100%";
				style.height = "100%";
				context = createCanvasContext2D();
				const canvas = context.canvas;
				container.appendChild(canvas);
				style = canvas.style;
				style.position = "absolute";
				style.left = "0";
				style.transformOrigin = "top left";
				this.container = container;
				this.context = context;
			}
			if (!this.containerReused && backgroundColor && !this.container.style.backgroundColor) this.container.style.backgroundColor = backgroundColor;
		}
		/**
		* @param {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} context Context.
		* @param {import("../../Map.js").FrameState} frameState Frame state.
		* @param {import("../../extent.js").Extent} extent Clip extent.
		* @protected
		*/
		clipUnrotated(context, frameState, extent) {
			const topLeft = getTopLeft(extent);
			const topRight = getTopRight(extent);
			const bottomRight = getBottomRight(extent);
			const bottomLeft = getBottomLeft(extent);
			apply(frameState.coordinateToPixelTransform, topLeft);
			apply(frameState.coordinateToPixelTransform, topRight);
			apply(frameState.coordinateToPixelTransform, bottomRight);
			apply(frameState.coordinateToPixelTransform, bottomLeft);
			const inverted = this.inversePixelTransform;
			apply(inverted, topLeft);
			apply(inverted, topRight);
			apply(inverted, bottomRight);
			apply(inverted, bottomLeft);
			context.save();
			context.beginPath();
			context.moveTo(Math.round(topLeft[0]), Math.round(topLeft[1]));
			context.lineTo(Math.round(topRight[0]), Math.round(topRight[1]));
			context.lineTo(Math.round(bottomRight[0]), Math.round(bottomRight[1]));
			context.lineTo(Math.round(bottomLeft[0]), Math.round(bottomLeft[1]));
			context.clip();
		}
		/**
		* @param {import("../../Map.js").FrameState} frameState Frame state.
		* @param {HTMLElement} target Target that may be used to render content to.
		* @protected
		*/
		prepareContainer(frameState, target) {
			const extent = frameState.extent;
			const resolution = frameState.viewState.resolution;
			const rotation = frameState.viewState.rotation;
			const pixelRatio = frameState.pixelRatio;
			const width = Math.round(getWidth(extent) / resolution * pixelRatio);
			const height = Math.round(getHeight(extent) / resolution * pixelRatio);
			compose(this.pixelTransform, frameState.size[0] / 2, frameState.size[1] / 2, 1 / pixelRatio, 1 / pixelRatio, rotation, -width / 2, -height / 2);
			makeInverse(this.inversePixelTransform, this.pixelTransform);
			const canvasTransform = toString$1(this.pixelTransform);
			const backgroundColor = this.getBackground(frameState);
			this.useContainer(target, canvasTransform, backgroundColor, width, height);
			if (!this.containerReused) {
				const canvas = this.context.canvas;
				if (canvas.width != width || canvas.height != height) {
					canvas.width = width;
					canvas.height = height;
				} else this.context.clearRect(0, 0, width, height);
				if (canvasTransform !== canvas.style.transform)
 /** @type {HTMLCanvasElement} */ canvas.style.transform = canvasTransform;
			}
		}
		/**
		* @param {import("../../render/EventType.js").default} type Event type.
		* @param {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} context Context.
		* @param {import("../../Map.js").FrameState} frameState Frame state.
		* @private
		*/
		dispatchRenderEvent_(type, context, frameState) {
			const layer = this.getLayer();
			if (layer.hasListener(type)) {
				const event = new RenderEvent(type, this.inversePixelTransform, frameState, context);
				layer.dispatchEvent(event);
			}
		}
		/**
		* @param {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} context Context.
		* @param {import("../../Map.js").FrameState} frameState Frame state.
		* @protected
		*/
		preRender(context, frameState) {
			this.frameState = frameState;
			if (frameState.declutter) return;
			this.dispatchRenderEvent_(EventType_default.PRERENDER, context, frameState);
		}
		/**
		* @param {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D} context Context.
		* @param {import("../../Map.js").FrameState} frameState Frame state.
		* @protected
		*/
		postRender(context, frameState) {
			if (frameState.declutter) return;
			this.dispatchRenderEvent_(EventType_default.POSTRENDER, context, frameState);
		}
		/**
		* @param {import("../../Map.js").FrameState} frameState Frame state.
		*/
		renderDeferredInternal(frameState) {}
		/**
		* @param {import("../../Map.js").FrameState} frameState Frame state.
		* @return {import('../../render/canvas/ZIndexContext.js').ZIndexContextProxy} Context.
		*/
		getRenderContext(frameState) {
			if (frameState.declutter && !this.deferredContext_) this.deferredContext_ = new ZIndexContext();
			return frameState.declutter ? this.deferredContext_.getContext() : this.context;
		}
		/**
		* @param {import("../../Map.js").FrameState} frameState Frame state.
		* @override
		*/
		renderDeferred(frameState) {
			if (!frameState.declutter) return;
			this.dispatchRenderEvent_(EventType_default.PRERENDER, this.context, frameState);
			if (frameState.declutter && this.deferredContext_) {
				this.deferredContext_.draw(this.context);
				this.deferredContext_.clear();
			}
			this.renderDeferredInternal(frameState);
			this.dispatchRenderEvent_(EventType_default.POSTRENDER, this.context, frameState);
		}
		/**
		* Creates a transform for rendering to an element that will be rotated after rendering.
		* @param {import("../../coordinate.js").Coordinate} center Center.
		* @param {number} resolution Resolution.
		* @param {number} rotation Rotation.
		* @param {number} pixelRatio Pixel ratio.
		* @param {number} width Width of the rendered element (in pixels).
		* @param {number} height Height of the rendered element (in pixels).
		* @param {number} offsetX Offset on the x-axis in view coordinates.
		* @protected
		* @return {!import("../../transform.js").Transform} Transform.
		*/
		getRenderTransform(center, resolution, rotation, pixelRatio, width, height, offsetX) {
			const dx1 = width / 2;
			const dy1 = height / 2;
			const sx = pixelRatio / resolution;
			const sy = -sx;
			const dx2 = -center[0] + offsetX;
			const dy2 = -center[1];
			return compose(this.tempTransform, dx1, dy1, sx, sy, -rotation, dx2, dy2);
		}
		/**
		* Clean up.
		* @override
		*/
		disposeInternal() {
			delete this.frameState;
			super.disposeInternal();
		}
	};
	//#endregion
	//#region src/ol/renderer/canvas/TileLayer.js
	/**
	* @module ol/renderer/canvas/TileLayer
	*/
	/**
	* @typedef {Object<number, Set<import("../../Tile.js").default>>} TileLookup
	*/
	/**
	* Add a tile to the lookup.
	* @param {TileLookup} tilesByZ Lookup of tiles by zoom level.
	* @param {import("../../Tile.js").default} tile A tile.
	* @param {number} z The zoom level.
	* @return {boolean} The tile was added to the lookup.
	*/
	function addTileToLookup(tilesByZ, tile, z) {
		if (!(z in tilesByZ)) {
			tilesByZ[z] = /* @__PURE__ */ new Set([tile]);
			return true;
		}
		const set = tilesByZ[z];
		const existing = set.has(tile);
		if (!existing) set.add(tile);
		return !existing;
	}
	/**
	* Remove a tile from the lookup.
	* @param {TileLookup} tilesByZ Lookup of tiles by zoom level.
	* @param {import("../../Tile.js").default} tile A tile.
	* @param {number} z The zoom level.
	* @return {boolean} The tile was removed from the lookup.
	*/
	function removeTileFromLookup(tilesByZ, tile, z) {
		const set = tilesByZ[z];
		if (set) return set.delete(tile);
		return false;
	}
	/**
	* @param {import("../../Map.js").FrameState} frameState Frame state.
	* @param {import("../../extent.js").Extent} extent The frame extent.
	* @return {import("../../extent.js").Extent} Frame extent intersected with layer extents.
	*/
	function getRenderExtent(frameState, extent) {
		const layerState = frameState.layerStatesArray[frameState.layerIndex];
		if (layerState.extent) extent = getIntersection(extent, fromUserExtent(layerState.extent, frameState.viewState.projection));
		const source = layerState.layer.getRenderSource();
		if (!source.getWrapX()) {
			const gridExtent = source.getTileGridForProjection(frameState.viewState.projection).getExtent();
			if (gridExtent) extent = getIntersection(extent, gridExtent);
		}
		return extent;
	}
	/**
	* @typedef {Object} Options
	* @property {number} [cacheSize=512] The cache size.
	*/
	/**
	* @classdesc
	* Canvas renderer for tile layers.
	* @api
	* @template {import("../../layer/Tile.js").default|import("../../layer/VectorTile.js").default} [LayerType=import("../../layer/Tile.js").default<import("../../source/Tile.js").default>|import("../../layer/VectorTile.js").default]
	* @extends {CanvasLayerRenderer<LayerType>}
	*/
	var CanvasTileLayerRenderer = class extends CanvasLayerRenderer {
		/**
		* @param {LayerType} tileLayer Tile layer.
		* @param {Options} [options] Options.
		*/
		constructor(tileLayer, options) {
			super(tileLayer);
			options = options || {};
			/**
			* Rendered extent has changed since the previous `renderFrame()` call
			* @type {boolean}
			*/
			this.extentChanged = true;
			/**
			* The last call to `renderFrame` was completed with all tiles loaded
			* @type {boolean}
			*/
			this.renderComplete = false;
			/**
			* @private
			* @type {?import("../../extent.js").Extent}
			*/
			this.renderedExtent_ = null;
			/**
			* @protected
			* @type {number}
			*/
			this.renderedPixelRatio;
			/**
			* @protected
			* @type {import("../../proj/Projection.js").default|null}
			*/
			this.renderedProjection = null;
			/**
			* @protected
			* @type {!Array<import("../../Tile.js").default>}
			*/
			this.renderedTiles = [];
			/**
			* @private
			* @type {number}
			*/
			this.renderedSourceRevision_;
			/**
			* @protected
			* @type {import("../../extent.js").Extent}
			*/
			this.tempExtent = createEmpty();
			/**
			* @private
			* @type {import("../../TileRange.js").default}
			*/
			this.tempTileRange_ = new TileRange(0, 0, 0, 0);
			/**
			* @type {import("../../tilecoord.js").TileCoord}
			* @private
			*/
			this.tempTileCoord_ = createOrUpdate(0, 0, 0);
			const cacheSize = options.cacheSize !== void 0 ? options.cacheSize : 512;
			/**
			* @type {import("../../structs/LRUCache.js").default<import("../../Tile.js").default>}
			* @private
			*/
			this.tileCache_ = new LRUCache(cacheSize);
			/**
			* @type {import("../../structs/LRUCache.js").default<import("../../Tile.js").default|null>}
			* @private
			*/
			this.sourceTileCache_ = null;
			/**
			* @protected
			* @type {import("../../extent.js").Extent|null}
			*/
			this.layerExtent = null;
			this.maxStaleKeys = cacheSize * .5;
		}
		/**
		* @return {LRUCache} Tile cache.
		*/
		getTileCache() {
			return this.tileCache_;
		}
		/**
		* @return {LRUCache} Tile cache.
		*/
		getSourceTileCache() {
			if (!this.sourceTileCache_) this.sourceTileCache_ = new LRUCache(512);
			return this.sourceTileCache_;
		}
		/**
		* Get a tile from the cache or create one if needed.
		*
		* @param {number} z Tile coordinate z.
		* @param {number} x Tile coordinate x.
		* @param {number} y Tile coordinate y.
		* @param {import("../../Map.js").FrameState} frameState Frame state.
		* @return {import("../../Tile.js").default|null} Tile (or null if outside source extent).
		* @protected
		*/
		getOrCreateTile(z, x, y, frameState) {
			const tileCache = this.tileCache_;
			const tileSource = this.getLayer().getSource();
			const cacheKey = getCacheKey(tileSource, tileSource.getKey(), z, x, y);
			/** @type {import("../../Tile.js").default} */
			let tile;
			if (tileCache.containsKey(cacheKey)) tile = tileCache.get(cacheKey);
			else {
				const projection = frameState.viewState.projection;
				const sourceProjection = tileSource.getProjection();
				tile = tileSource.getTile(z, x, y, frameState.pixelRatio, projection, !sourceProjection || equivalent$1(sourceProjection, projection) ? void 0 : this.getSourceTileCache());
				if (!tile) return null;
				tileCache.set(cacheKey, tile);
			}
			return tile;
		}
		/**
		* @param {number} z Tile coordinate z.
		* @param {number} x Tile coordinate x.
		* @param {number} y Tile coordinate y.
		* @param {import("../../Map.js").FrameState} frameState Frame state.
		* @return {import("../../Tile.js").default|null} Tile (or null if outside source extent).
		* @protected
		*/
		getTile(z, x, y, frameState) {
			const tile = this.getOrCreateTile(z, x, y, frameState);
			if (!tile) return null;
			return tile;
		}
		/**
		* @param {import("../../pixel.js").Pixel} pixel Pixel.
		* @return {Uint8ClampedArray} Data at the pixel location.
		* @override
		*/
		getData(pixel) {
			const frameState = this.frameState;
			if (!frameState) return null;
			const layer = this.getLayer();
			const coordinate = apply(frameState.pixelToCoordinateTransform, pixel.slice());
			const layerExtent = layer.getExtent();
			if (layerExtent) {
				if (!containsCoordinate(layerExtent, coordinate)) return null;
			}
			const viewState = frameState.viewState;
			const source = layer.getRenderSource();
			const tileGrid = source.getTileGridForProjection(viewState.projection);
			const tilePixelRatio = source.getTilePixelRatio(frameState.pixelRatio);
			for (let z = tileGrid.getZForResolution(viewState.resolution); z >= tileGrid.getMinZoom(); --z) {
				const tileCoord = tileGrid.getTileCoordForCoordAndZ(coordinate, z);
				const tile = this.getTile(z, tileCoord[1], tileCoord[2], frameState);
				if (!tile || tile.getState() !== TileState_default.LOADED) continue;
				const tileOrigin = tileGrid.getOrigin(z);
				const tileSize = toSize(tileGrid.getTileSize(z));
				const tileResolution = tileGrid.getResolution(z);
				/**
				* @type {import('../../DataTile.js').ImageLike}
				*/
				let image;
				if (tile instanceof ImageTile || tile instanceof ReprojTile) image = tile.getImage();
				else if (tile instanceof DataTile) {
					image = asImageLike(tile.getData());
					if (!image) continue;
				} else continue;
				const col = Math.floor(tilePixelRatio * ((coordinate[0] - tileOrigin[0]) / tileResolution - tileCoord[1] * tileSize[0]));
				const row = Math.floor(tilePixelRatio * ((tileOrigin[1] - coordinate[1]) / tileResolution - tileCoord[2] * tileSize[1]));
				const gutter = Math.round(tilePixelRatio * source.getGutterForProjection(viewState.projection));
				return this.getImageData(image, col + gutter, row + gutter);
			}
			return null;
		}
		/**
		* Determine whether render should be called.
		* @param {import("../../Map.js").FrameState} frameState Frame state.
		* @return {boolean} Layer is ready to be rendered.
		* @override
		*/
		prepareFrame(frameState) {
			if (!this.renderedProjection) this.renderedProjection = frameState.viewState.projection;
			else if (frameState.viewState.projection !== this.renderedProjection) {
				this.tileCache_.clear();
				this.renderedProjection = frameState.viewState.projection;
			}
			const source = this.getLayer().getSource();
			if (!source) return false;
			const sourceRevision = source.getRevision();
			if (!this.renderedSourceRevision_) this.renderedSourceRevision_ = sourceRevision;
			else if (this.renderedSourceRevision_ !== sourceRevision) {
				this.renderedSourceRevision_ = sourceRevision;
				if (this.renderedSourceKey_ === source.getKey()) {
					this.tileCache_.clear();
					this.sourceTileCache_?.clear();
				}
			}
			return true;
		}
		/**
		* Determine whether tiles for next extent should be enqueued for rendering.
		* @return {boolean} Rendering tiles for next extent is supported.
		* @protected
		*/
		enqueueTilesForNextExtent() {
			return true;
		}
		/**
		* @param {import("../../Map.js").FrameState} frameState Frame state.
		* @param {import("../../extent.js").Extent} extent The extent to be rendered.
		* @param {number} initialZ The zoom level.
		* @param {TileLookup} tilesByZ Lookup of tiles by zoom level.
		* @param {number} preload Number of additional levels to load.
		*/
		enqueueTiles(frameState, extent, initialZ, tilesByZ, preload) {
			const viewState = frameState.viewState;
			const tileLayer = this.getLayer();
			const tileSource = tileLayer.getRenderSource();
			const tileGrid = tileSource.getTileGridForProjection(viewState.projection);
			const tileSourceKey = getUid(tileSource);
			if (!(tileSourceKey in frameState.wantedTiles)) frameState.wantedTiles[tileSourceKey] = {};
			const wantedTiles = frameState.wantedTiles[tileSourceKey];
			const map = tileLayer.getMapInternal();
			const minZ = Math.max(initialZ - preload, tileGrid.getMinZoom(), tileGrid.getZForResolution(Math.min(tileLayer.getMaxResolution(), map ? map.getView().getResolutionForZoom(Math.max(tileLayer.getMinZoom(), 0)) : tileGrid.getResolution(0)), tileSource.zDirection));
			const rotation = viewState.rotation;
			const viewport = rotation ? getRotatedViewport(viewState.center, viewState.resolution, rotation, frameState.size) : void 0;
			for (let z = initialZ; z >= minZ; --z) {
				const tileRange = tileGrid.getTileRangeForExtentAndZ(extent, z, this.tempTileRange_);
				const tileResolution = tileGrid.getResolution(z);
				for (let x = tileRange.minX; x <= tileRange.maxX; ++x) for (let y = tileRange.minY; y <= tileRange.maxY; ++y) {
					if (rotation && !tileGrid.tileCoordIntersectsViewport([
						z,
						x,
						y
					], viewport)) continue;
					const tile = this.getTile(z, x, y, frameState);
					if (!tile) continue;
					if (!addTileToLookup(tilesByZ, tile, z)) continue;
					const tileQueueKey = tile.getKey();
					wantedTiles[tileQueueKey] = true;
					if (tile.getState() === TileState_default.IDLE) {
						if (!frameState.tileQueue.isKeyQueued(tileQueueKey)) {
							const tileCoord = createOrUpdate(z, x, y, this.tempTileCoord_);
							frameState.tileQueue.enqueue([
								tile,
								tileSourceKey,
								tileGrid.getTileCoordCenter(tileCoord),
								tileResolution
							]);
						}
					}
				}
			}
		}
		/**
		* Look for tiles covering the provided tile coordinate at an alternate
		* zoom level.  Loaded tiles will be added to the provided tile texture lookup.
		* @param {import("../../tilecoord.js").TileCoord} tileCoord The target tile coordinate.
		* @param {TileLookup} tilesByZ Lookup of tiles by zoom level.
		* @return {boolean} The tile coordinate is covered by loaded tiles at the alternate zoom level.
		* @private
		*/
		findStaleTile_(tileCoord, tilesByZ) {
			const tileCache = this.tileCache_;
			const z = tileCoord[0];
			const x = tileCoord[1];
			const y = tileCoord[2];
			const staleKeys = this.getStaleKeys();
			for (let i = 0; i < staleKeys.length; ++i) {
				const cacheKey = getCacheKey(this.getLayer().getSource(), staleKeys[i], z, x, y);
				if (tileCache.containsKey(cacheKey)) {
					const tile = tileCache.peek(cacheKey);
					if (tile.getState() === TileState_default.LOADED) {
						tile.endTransition(getUid(this));
						addTileToLookup(tilesByZ, tile, z);
						return true;
					}
				}
			}
			return false;
		}
		/**
		* Look for tiles covering the provided tile coordinate at an alternate
		* zoom level.  Loaded tiles will be added to the provided tile texture lookup.
		* @param {import("../../tilegrid/TileGrid.js").default} tileGrid The tile grid.
		* @param {import("../../tilecoord.js").TileCoord} tileCoord The target tile coordinate.
		* @param {number} altZ The alternate zoom level.
		* @param {TileLookup} tilesByZ Lookup of tiles by zoom level.
		* @return {boolean} The tile coordinate is covered by loaded tiles at the alternate zoom level.
		* @private
		*/
		findAltTiles_(tileGrid, tileCoord, altZ, tilesByZ) {
			const tileRange = tileGrid.getTileRangeForTileCoordAndZ(tileCoord, altZ, this.tempTileRange_);
			if (!tileRange) return false;
			let covered = true;
			const tileCache = this.tileCache_;
			const source = this.getLayer().getRenderSource();
			const sourceKey = source.getKey();
			for (let x = tileRange.minX; x <= tileRange.maxX; ++x) for (let y = tileRange.minY; y <= tileRange.maxY; ++y) {
				const cacheKey = getCacheKey(source, sourceKey, altZ, x, y);
				let loaded = false;
				if (tileCache.containsKey(cacheKey)) {
					const tile = tileCache.peek(cacheKey);
					if (tile.getState() === TileState_default.LOADED) {
						addTileToLookup(tilesByZ, tile, altZ);
						loaded = true;
					}
				}
				if (!loaded) covered = false;
			}
			return covered;
		}
		/**
		* Render the layer.
		*
		* The frame rendering logic has three parts:
		*
		*  1. Enqueue tiles
		*  2. Find alt tiles for those that are not yet loaded
		*  3. Render loaded tiles
		*
		* @param {import("../../Map.js").FrameState} frameState Frame state.
		* @param {HTMLElement} target Target that may be used to render content to.
		* @return {HTMLElement} The rendered element.
		* @override
		*/
		renderFrame(frameState, target) {
			this.renderComplete = true;
			/**
			* TODO:
			*  maybe skip transition when not fully opaque
			*  decide if this.renderComplete is useful
			*/
			const layerState = frameState.layerStatesArray[frameState.layerIndex];
			const viewState = frameState.viewState;
			const projection = viewState.projection;
			const viewResolution = viewState.resolution;
			const viewCenter = viewState.center;
			const pixelRatio = frameState.pixelRatio;
			const tileLayer = this.getLayer();
			const tileSource = tileLayer.getSource();
			const tileGrid = tileSource.getTileGridForProjection(projection);
			const z = tileGrid.getZForResolution(viewResolution, tileSource.zDirection);
			const tileResolution = tileGrid.getResolution(z);
			this.updateStaleKeys(tileSource.getKey());
			let frameExtent = frameState.extent;
			const tilePixelRatio = tileSource.getTilePixelRatio(pixelRatio);
			this.prepareContainer(frameState, target);
			const width = this.context.canvas.width;
			const height = this.context.canvas.height;
			this.layerExtent = layerState.extent ? fromUserExtent(layerState.extent, projection) : null;
			if (this.layerExtent) frameExtent = getIntersection(frameExtent, this.layerExtent);
			const dx = tileResolution * width / 2 / tilePixelRatio;
			const dy = tileResolution * height / 2 / tilePixelRatio;
			const canvasExtent = [
				viewCenter[0] - dx,
				viewCenter[1] - dy,
				viewCenter[0] + dx,
				viewCenter[1] + dy
			];
			/**
			* @type {TileLookup}
			*/
			const tilesByZ = {};
			this.renderedTiles.length = 0;
			/**
			* Part 1: Enqueue tiles
			*/
			const preload = tileLayer.getPreload();
			if (frameState.nextExtent && this.enqueueTilesForNextExtent()) {
				const targetZ = tileGrid.getZForResolution(viewState.nextResolution, tileSource.zDirection);
				const nextExtent = getRenderExtent(frameState, frameState.nextExtent);
				this.enqueueTiles(frameState, nextExtent, targetZ, tilesByZ, preload);
			}
			const renderExtent = getRenderExtent(frameState, frameExtent);
			this.enqueueTiles(frameState, renderExtent, z, tilesByZ, 0);
			if (preload > 0) setTimeout(() => {
				this.enqueueTiles(frameState, renderExtent, z - 1, tilesByZ, preload - 1);
			}, 0);
			if (!(z in tilesByZ)) return this.container;
			/**
			* Part 2: Find alt tiles for those that are not yet loaded
			*/
			const uid = getUid(this);
			const time = frameState.time;
			for (const tile of tilesByZ[z]) {
				const tileState = tile.getState();
				if (tileState === TileState_default.EMPTY) continue;
				const tileCoord = tile.tileCoord;
				if (tileState === TileState_default.LOADED) {
					if (tile.getAlpha(uid, time) === 1) {
						tile.endTransition(uid);
						continue;
					}
				}
				if (tileState !== TileState_default.ERROR) this.renderComplete = false;
				if (this.findStaleTile_(tileCoord, tilesByZ)) {
					removeTileFromLookup(tilesByZ, tile, z);
					frameState.animate = true;
					continue;
				}
				if (this.findAltTiles_(tileGrid, tileCoord, z + 1, tilesByZ)) continue;
				const minZoom = tileGrid.getMinZoom();
				for (let parentZ = z - 1; parentZ >= minZoom; --parentZ) if (this.findAltTiles_(tileGrid, tileCoord, parentZ, tilesByZ)) break;
			}
			/**
			* Part 3: Render loaded tiles
			*/
			const canvasScale = tileResolution / viewResolution * pixelRatio / tilePixelRatio;
			const context = this.getRenderContext(frameState);
			compose(this.tempTransform, width / 2, height / 2, canvasScale, canvasScale, 0, -width / 2, -height / 2);
			if (this.layerExtent) this.clipUnrotated(context, frameState, this.layerExtent);
			if (!tileSource.getInterpolate()) context.imageSmoothingEnabled = false;
			this.preRender(context, frameState);
			const zs = Object.keys(tilesByZ).map(Number);
			zs.sort(ascending);
			/** @type {Array<import("../../extent.js").Extent>} */
			const clips = [];
			/** @type {Array<number>} */
			const clipZs = [];
			/** @type {Array<{tile: import("../../Tile.js").default, x: number, y: number, w: number, h: number, gutter: number}>} */
			const fadingTiles = [];
			for (let i = zs.length - 1; i >= 0; --i) {
				const currentZ = zs[i];
				const currentTilePixelSize = tileSource.getTilePixelSize(currentZ, pixelRatio, projection);
				const currentScale = tileGrid.getResolution(currentZ) / tileResolution;
				const dx = currentTilePixelSize[0] * currentScale * canvasScale;
				const dy = currentTilePixelSize[1] * currentScale * canvasScale;
				const originTileCoord = tileGrid.getTileCoordForCoordAndZ(getTopLeft(canvasExtent), currentZ);
				const originTileExtent = tileGrid.getTileCoordExtent(originTileCoord);
				const origin = apply(this.tempTransform, [tilePixelRatio * (originTileExtent[0] - canvasExtent[0]) / tileResolution, tilePixelRatio * (canvasExtent[3] - originTileExtent[3]) / tileResolution]);
				const tileGutter = tilePixelRatio * tileSource.getGutterForProjection(projection);
				for (const tile of tilesByZ[currentZ]) {
					if (tile.getState() !== TileState_default.LOADED) continue;
					const tileCoord = tile.tileCoord;
					const xIndex = originTileCoord[1] - tileCoord[1];
					const nextX = Math.round(origin[0] - (xIndex - 1) * dx);
					const yIndex = originTileCoord[2] - tileCoord[2];
					const nextY = Math.round(origin[1] - (yIndex - 1) * dy);
					const x = Math.round(origin[0] - xIndex * dx);
					const y = Math.round(origin[1] - yIndex * dy);
					const w = nextX - x;
					const h = nextY - y;
					const transition = currentZ === z;
					if (transition && tile.inTransition(uid)) {
						fadingTiles.push({
							tile,
							x,
							y,
							w,
							h,
							gutter: tileGutter
						});
						this.renderedTiles.unshift(tile);
						this.updateUsedTiles(frameState.usedTiles, tileSource, tile);
						continue;
					}
					const currentRect = [
						x,
						y,
						x + w,
						y + h
					];
					/** @type {Array<import("../../extent.js").Extent>} */
					const covered = [];
					for (let j = 0, jj = clips.length; j < jj; ++j) if (currentZ < clipZs[j] && intersects$1(currentRect, clips[j])) covered.push(clips[j]);
					let clipRects;
					if (covered.length > 0) clipRects = subtractExtents(currentRect, covered);
					clips.push(currentRect);
					clipZs.push(currentZ);
					this.drawTile(tile, frameState, x, y, w, h, tileGutter, transition, clipRects);
					this.renderedTiles.unshift(tile);
					this.updateUsedTiles(frameState.usedTiles, tileSource, tile);
				}
			}
			for (let i = 0, ii = fadingTiles.length; i < ii; ++i) {
				const { tile, x, y, w, h, gutter } = fadingTiles[i];
				this.drawTile(tile, frameState, x, y, w, h, gutter, true, void 0);
			}
			this.renderedResolution = tileResolution;
			this.extentChanged = !this.renderedExtent_ || !equals$1(this.renderedExtent_, canvasExtent);
			this.renderedExtent_ = canvasExtent;
			this.renderedPixelRatio = pixelRatio;
			this.postRender(this.context, frameState);
			if (this.layerExtent) context.restore();
			context.imageSmoothingEnabled = true;
			if (this.renderComplete) {
				/**
				* @param {import("../../Map.js").default} map Map.
				* @param {import("../../Map.js").FrameState} frameState Frame state.
				*/
				const postRenderFunction = (map, frameState) => {
					const tileSourceKey = getUid(tileSource);
					const wantedTiles = frameState.wantedTiles[tileSourceKey];
					const tilesCount = wantedTiles ? Object.keys(wantedTiles).length : 0;
					this.updateCacheSize(tilesCount);
					this.tileCache_.expireCache();
					this.sourceTileCache_?.expireCache();
				};
				frameState.postRenderFunctions.push(postRenderFunction);
			}
			return this.container;
		}
		/**
		* Increases the cache size if needed
		* @param {number} tileCount Minimum number of tiles needed.
		*/
		updateCacheSize(tileCount) {
			this.tileCache_.highWaterMark = Math.max(this.tileCache_.highWaterMark, tileCount * 2);
		}
		/**
		* @param {import("../../Tile.js").default} tile Tile.
		* @param {import("../../Map.js").FrameState} frameState Frame state.
		* @param {number} x Left of the tile.
		* @param {number} y Top of the tile.
		* @param {number} w Width of the tile.
		* @param {number} h Height of the tile.
		* @param {number} gutter Tile gutter.
		* @param {boolean} transition Apply an alpha transition.
		* @param {Array<import("../../extent.js").Extent>} [clipRects] Sub-rectangles
		*     of the tile to draw. When not provided, the whole tile is drawn; when an
		*     empty array is provided, nothing is drawn (the tile is fully covered by
		*     higher-z tiles).
		* @protected
		*/
		drawTile(tile, frameState, x, y, w, h, gutter, transition, clipRects) {
			let image;
			if (tile instanceof DataTile) {
				image = asImageLike(tile.getData());
				if (!image) throw new Error("Rendering array data is not yet supported");
			} else image = this.getTileImage(tile);
			if (!image) return;
			const context = this.getRenderContext(frameState);
			const uid = getUid(this);
			const layerState = frameState.layerStatesArray[frameState.layerIndex];
			const alpha = layerState.opacity * (transition ? tile.getAlpha(uid, frameState.time) : 1);
			const alphaChanged = alpha !== context.globalAlpha;
			if (alphaChanged) {
				context.save();
				context.globalAlpha = alpha;
			}
			const imageWidth = image.width - 2 * gutter;
			const imageHeight = image.height - 2 * gutter;
			if (clipRects) {
				const scaleX = imageWidth / w;
				const scaleY = imageHeight / h;
				for (let i = 0, ii = clipRects.length; i < ii; ++i) {
					const rect = clipRects[i];
					const rx = rect[0];
					const ry = rect[1];
					const rw = rect[2] - rect[0];
					const rh = rect[3] - rect[1];
					context.drawImage(image, gutter + (rx - x) * scaleX, gutter + (ry - y) * scaleY, rw * scaleX, rh * scaleY, rx, ry, rw, rh);
				}
			} else context.drawImage(image, gutter, gutter, imageWidth, imageHeight, x, y, w, h);
			if (alphaChanged) context.restore();
			if (alpha !== layerState.opacity) frameState.animate = true;
			else if (transition) tile.endTransition(uid);
		}
		/**
		* @return {HTMLCanvasElement|OffscreenCanvas} Image
		*/
		getImage() {
			const context = this.context;
			return context ? context.canvas : null;
		}
		/**
		* Get the image from a tile.
		* @param {import("../../ImageTile.js").default} tile Tile.
		* @return {HTMLCanvasElement|OffscreenCanvas|HTMLImageElement|HTMLVideoElement} Image.
		* @protected
		*/
		getTileImage(tile) {
			return tile.getImage();
		}
		/**
		* @param {!Object<string, !Object<string, boolean>>} usedTiles Used tiles.
		* @param {import("../../source/Tile.js").default} tileSource Tile source.
		* @param {import('../../Tile.js').default} tile Tile.
		* @protected
		*/
		updateUsedTiles(usedTiles, tileSource, tile) {
			const tileSourceKey = getUid(tileSource);
			if (!(tileSourceKey in usedTiles)) usedTiles[tileSourceKey] = {};
			usedTiles[tileSourceKey][tile.getKey()] = true;
		}
	};
	//#endregion
	//#region src/ol/layer/TileProperty.js
	/**
	* @module ol/layer/TileProperty
	*/
	/**
	* @enum {string}
	*/
	var TileProperty_default = {
		PRELOAD: "preload",
		USE_INTERIM_TILES_ON_ERROR: "useInterimTilesOnError"
	};
	//#endregion
	//#region src/ol/layer/BaseTile.js
	/**
	* @module ol/layer/BaseTile
	*/
	/***
	* @template Return
	* @typedef {import("../Observable.js").OnSignature<import("../Observable.js").EventTypes, import("../events/Event.js").default, Return> &
	*   import("../Observable.js").OnSignature<import("./Base.js").BaseLayerObjectEventTypes|
	*     import("./Layer.js").LayerEventType|'change:preload'|'change:useInterimTilesOnError', import("../Object.js").ObjectEvent, Return> &
	*   import("../Observable.js").OnSignature<import("../render/EventType.js").LayerRenderEventTypes, import("../render/Event.js").default, Return> &
	*   import("../Observable.js").CombinedOnSignature<import("../Observable.js").EventTypes|import("./Base.js").BaseLayerObjectEventTypes|
	*   import("./Layer.js").LayerEventType|'change:preload'|'change:useInterimTilesOnError'|import("../render/EventType.js").LayerRenderEventTypes, Return>} BaseTileLayerOnSignature
	*/
	/**
	* @template {import("../source/Tile.js").default} TileSourceType
	* @typedef {Object} Options
	* @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
	* @property {number} [opacity=1] Opacity (0, 1).
	* @property {boolean} [visible=true] Visibility.
	* @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
	* rendered outside of this extent.
	* @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
	* will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
	* for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
	* method was used.
	* @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
	* visible.
	* @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
	* be visible.
	* @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
	* visible.
	* @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
	* be visible.
	* @property {number} [preload=0] Preload. Load low-resolution tiles up to `preload` levels. `0`
	* means no preloading.
	* @property {TileSourceType} [source] Source for this layer.
	* @property {import("../Map.js").default} [map] Sets the layer as overlay on a map. The map will not manage
	* this layer in its layers collection, and the layer will be rendered on top. This is useful for
	* temporary layers. The standard way to add a layer to a map and have it managed by the map is to
	* use {@link import("../Map.js").default#addLayer map.addLayer()}.
	* @property {import("./Base.js").BackgroundColor} [background] Background color for the layer. If not specified, no background
	* will be rendered.
	* @property {boolean} [useInterimTilesOnError=true] Deprecated.  Use interim tiles on error.
	* @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
	* @property {number} [cacheSize=512] The internal tile cache size.  This needs to be large enough to render
	* two zoom levels worth of tiles.
	*/
	/**
	* @classdesc
	* For layer sources that provide pre-rendered, tiled images in grids that are
	* organized by zoom levels for specific resolutions.
	* Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
	* property on the layer object; for example, setting `title: 'My Title'` in the
	* options means that `title` is observable, and has get/set accessors.
	*
	* @template {import("../source/Tile.js").default} TileSourceType
	* @template {import("../renderer/Layer.js").default} RendererType
	* @extends {Layer<TileSourceType, RendererType>}
	* @api
	*/
	var BaseTileLayer = class extends Layer {
		/**
		* @param {Options<TileSourceType>} [options] Tile layer options.
		*/
		constructor(options) {
			options = options ? options : {};
			const baseOptions = Object.assign({}, options);
			const cacheSize = options.cacheSize;
			delete options.cacheSize;
			delete baseOptions.preload;
			delete baseOptions.useInterimTilesOnError;
			super(baseOptions);
			/***
			* @type {BaseTileLayerOnSignature<import("../events.js").EventsKey>}
			*/
			this.on;
			/***
			* @type {BaseTileLayerOnSignature<import("../events.js").EventsKey>}
			*/
			this.once;
			/***
			* @type {BaseTileLayerOnSignature<void>}
			*/
			this.un;
			/**
			* @type {number|undefined}
			* @private
			*/
			this.cacheSize_ = cacheSize;
			this.setPreload(options.preload !== void 0 ? options.preload : 0);
			this.setUseInterimTilesOnError(options.useInterimTilesOnError !== void 0 ? options.useInterimTilesOnError : true);
		}
		/**
		* @return {number|undefined} The suggested cache size
		* @protected
		*/
		getCacheSize() {
			return this.cacheSize_;
		}
		/**
		* Return the level as number to which we will preload tiles up to.
		* @return {number} The level to preload tiles up to.
		* @observable
		* @api
		*/
		getPreload() {
			return this.get(TileProperty_default.PRELOAD);
		}
		/**
		* Set the level as number to which we will preload tiles up to.
		* @param {number} preload The level to preload tiles up to.
		* @observable
		* @api
		*/
		setPreload(preload) {
			this.set(TileProperty_default.PRELOAD, preload);
		}
		/**
		* Deprecated.  Whether we use interim tiles on error.
		* @return {boolean} Use interim tiles on error.
		* @observable
		* @api
		*/
		getUseInterimTilesOnError() {
			return this.get(TileProperty_default.USE_INTERIM_TILES_ON_ERROR);
		}
		/**
		* Deprecated.  Set whether we use interim tiles on error.
		* @param {boolean} useInterimTilesOnError Use interim tiles on error.
		* @observable
		* @api
		*/
		setUseInterimTilesOnError(useInterimTilesOnError) {
			this.set(TileProperty_default.USE_INTERIM_TILES_ON_ERROR, useInterimTilesOnError);
		}
		/**
		* Get data for a pixel location.  The return type depends on the source data.  For image tiles,
		* a four element RGBA array will be returned.  For data tiles, the array length will match the
		* number of bands in the dataset.  For requests outside the layer extent, `null` will be returned.
		* Data for a image tiles can only be retrieved if the source's `crossOrigin` property is set.
		*
		* ```js
		* // display layer data on every pointer move
		* map.on('pointermove', (event) => {
		*   console.log(layer.getData(event.pixel));
		* });
		* ```
		* @param {import("../pixel.js").Pixel} pixel Pixel.
		* @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
		* @api
		* @override
		*/
		getData(pixel) {
			return super.getData(pixel);
		}
	};
	//#endregion
	//#region src/ol/layer/Tile.js
	/**
	* @module ol/layer/Tile
	*/
	/**
	* @classdesc
	* For layer sources that provide pre-rendered, tiled images in grids that are
	* organized by zoom levels for specific resolutions.
	* Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
	* property on the layer object; for example, setting `title: 'My Title'` in the
	* options means that `title` is observable, and has get/set accessors.
	*
	* @template {import("../source/Tile.js").default} [TileSourceType=import("../source/Tile.js").default]
	* @extends BaseTileLayer<TileSourceType, CanvasTileLayerRenderer>
	* @api
	*/
	var TileLayer = class extends BaseTileLayer {
		/**
		* @param {import("./BaseTile.js").Options<TileSourceType>} [options] Tile layer options.
		*/
		constructor(options) {
			super(options);
		}
		/**
		* @override
		*/
		createRenderer() {
			return new CanvasTileLayerRenderer(this, { cacheSize: this.getCacheSize() });
		}
	};
	//#endregion
	//#region src/ol/tilegrid/TileGrid.js
	/**
	* @module ol/tilegrid/TileGrid
	*/
	/**
	* @private
	* @type {import("../tilecoord.js").TileCoord}
	*/
	const tmpTileCoord = [
		0,
		0,
		0
	];
	/**
	* Number of decimal digits to consider in integer values when rounding.
	* @type {number}
	*/
	const DECIMALS = 5;
	/**
	* @typedef {Object} Options
	* @property {import("../extent.js").Extent} [extent] Extent for the tile grid. No tiles outside this
	* extent will be requested by {@link module:ol/source/Tile~TileSource} sources. When no `origin` or
	* `origins` are configured, the `origin` will be set to the top-left corner of the extent.
	* @property {number} [minZoom=0] Minimum zoom.
	* @property {import("../coordinate.js").Coordinate} [origin] The tile grid origin, i.e. where the `x`
	* and `y` axes meet (`[z, 0, 0]`). Tile coordinates increase left to right and downwards. If not
	* specified, `extent` or `origins` must be provided.
	* @property {Array<import("../coordinate.js").Coordinate>} [origins] Tile grid origins, i.e. where
	* the `x` and `y` axes meet (`[z, 0, 0]`), for each zoom level. If given, the array length
	* should match the length of the `resolutions` array, i.e. each resolution can have a different
	* origin. Tile coordinates increase left to right and downwards. If not specified, `extent` or
	* `origin` must be provided.
	* @property {!Array<number>} resolutions Resolutions. The array index of each resolution needs
	* to match the zoom level. This means that even if a `minZoom` is configured, the resolutions
	* array will have a length of `maxZoom + 1`.
	* @property {Array<import("../size.js").Size>} [sizes] Number of tile rows and columns
	* of the grid for each zoom level. If specified the values
	* define each zoom level's extent together with the `origin` or `origins`.
	* A grid `extent` can be configured in addition, and will further limit the extent
	* for which tile requests are made by sources. If the bottom-left corner of
	* an extent is used as `origin` or `origins`, then the `y` value must be
	* negative because OpenLayers tile coordinates use the top left as the origin.
	* @property {Array<import("../TileRange.js").default>} [tileRanges] Pre-built tile ranges for each
	* zoom level. When provided, these are used directly as the full tile ranges instead of computing
	* them from `sizes`. Useful for setting per-level tile index bounds (e.g. from WMTS `TileMatrixSetLimits`).
	* @property {number|import("../size.js").Size} [tileSize] Tile size.
	* Default is `[256, 256]`.
	* @property {Array<number|import("../size.js").Size>} [tileSizes] Tile sizes. If given, the array length
	* should match the length of the `resolutions` array, i.e. each resolution can have a different
	* tile size.
	*/
	/**
	* @classdesc
	* Base class for setting the grid pattern for sources accessing tiled-image
	* servers.
	* @api
	*/
	var TileGrid = class {
		/**
		* @param {Options} options Tile grid options.
		*/
		constructor(options) {
			let minZoom = options.minZoom;
			const resolutions = options.resolutions;
			if (minZoom === void 0 && resolutions) minZoom = resolutions.findIndex((resolution) => resolution !== void 0);
			/**
			* @protected
			* @type {number}
			*/
			this.minZoom = minZoom !== void 0 ? minZoom : 0;
			/**
			* @private
			* @type {!Array<number>}
			*/
			this.resolutions_ = resolutions;
			assert(isSorted(
				this.resolutions_,
				/**
				* @param {number} a First resolution
				* @param {number} b Second resolution
				* @return {number} Comparison result
				*/
				(a, b) => b - a,
				true
			), "`resolutions` must be sorted in descending order");
			let zoomFactor;
			if (!options.origins) {
				for (let i = 0, ii = this.resolutions_.length - 1; i < ii; ++i) if (!zoomFactor) zoomFactor = this.resolutions_[i] / this.resolutions_[i + 1];
				else if (this.resolutions_[i] / this.resolutions_[i + 1] !== zoomFactor) {
					zoomFactor = void 0;
					break;
				}
			}
			/**
			* @private
			* @type {number|undefined}
			*/
			this.zoomFactor_ = zoomFactor;
			/**
			* @protected
			* @type {number}
			*/
			this.maxZoom = this.resolutions_.length - 1;
			/**
			* @private
			* @type {import("../coordinate.js").Coordinate|null}
			*/
			this.origin_ = options.origin !== void 0 ? options.origin : null;
			/**
			* @private
			* @type {Array<import("../coordinate.js").Coordinate>}
			*/
			this.origins_ = null;
			if (options.origins !== void 0) {
				this.origins_ = options.origins;
				assert(this.origins_.length == this.resolutions_.length, "Number of `origins` and `resolutions` must be equal");
			}
			const extent = options.extent;
			if (extent !== void 0 && !this.origin_ && !this.origins_) this.origin_ = getTopLeft(extent);
			assert(!this.origin_ && this.origins_ || this.origin_ && !this.origins_, "Either `origin` or `origins` must be configured, never both");
			/**
			* @private
			* @type {Array<number|import("../size.js").Size>}
			*/
			this.tileSizes_ = null;
			if (options.tileSizes !== void 0) {
				this.tileSizes_ = options.tileSizes;
				assert(this.tileSizes_.length == this.resolutions_.length, "Number of `tileSizes` and `resolutions` must be equal");
			}
			/**
			* @private
			* @type {number|import("../size.js").Size}
			*/
			this.tileSize_ = options.tileSize !== void 0 ? options.tileSize : !this.tileSizes_ ? 256 : null;
			assert(!this.tileSize_ && this.tileSizes_ || this.tileSize_ && !this.tileSizes_, "Either `tileSize` or `tileSizes` must be configured, never both");
			/**
			* @private
			* @type {import("../extent.js").Extent}
			*/
			this.extent_ = extent !== void 0 ? extent : null;
			/**
			* @private
			* @type {Array<import("../TileRange.js").default>}
			*/
			this.fullTileRanges_ = null;
			/**
			* @private
			* @type {import("../size.js").Size}
			*/
			this.tmpSize_ = [0, 0];
			/**
			* @private
			* @type {import("../extent.js").Extent}
			*/
			this.tmpExtent_ = [
				0,
				0,
				0,
				0
			];
			if (options.tileRanges !== void 0) this.fullTileRanges_ = options.tileRanges;
			else if (options.sizes !== void 0) this.fullTileRanges_ = options.sizes.map((size, z) => {
				const tileRange = new TileRange(Math.min(0, size[0]), Math.max(size[0] - 1, -1), Math.min(0, size[1]), Math.max(size[1] - 1, -1));
				if (extent) {
					const restrictedTileRange = this.getTileRangeForExtentAndZ(extent, z);
					tileRange.minX = Math.max(restrictedTileRange.minX, tileRange.minX);
					tileRange.maxX = Math.min(restrictedTileRange.maxX, tileRange.maxX);
					tileRange.minY = Math.max(restrictedTileRange.minY, tileRange.minY);
					tileRange.maxY = Math.min(restrictedTileRange.maxY, tileRange.maxY);
				}
				return tileRange;
			});
			else if (extent) this.calculateTileRanges_(extent);
		}
		/**
		* Call a function with each tile coordinate for a given extent and zoom level.
		*
		* @param {import("../extent.js").Extent} extent Extent.
		* @param {number} zoom Integer zoom level.
		* @param {function(import("../tilecoord.js").TileCoord): void} callback Function called with each tile coordinate.
		* @api
		*/
		forEachTileCoord(extent, zoom, callback) {
			const tileRange = this.getTileRangeForExtentAndZ(extent, zoom);
			for (let i = tileRange.minX, ii = tileRange.maxX; i <= ii; ++i) for (let j = tileRange.minY, jj = tileRange.maxY; j <= jj; ++j) callback([
				zoom,
				i,
				j
			]);
		}
		/**
		* @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
		* @param {function(number, import("../TileRange.js").default): boolean} callback Callback.
		* @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
		* @param {import("../extent.js").Extent} [tempExtent] Temporary import("../extent.js").Extent object.
		* @return {boolean} Callback succeeded.
		*/
		forEachTileCoordParentTileRange(tileCoord, callback, tempTileRange, tempExtent) {
			let tileRange, x, y;
			let tileCoordExtent = null;
			let z = tileCoord[0] - 1;
			if (this.zoomFactor_ === 2) {
				x = tileCoord[1];
				y = tileCoord[2];
			} else tileCoordExtent = this.getTileCoordExtent(tileCoord, tempExtent);
			while (z >= this.minZoom) {
				if (x !== void 0 && y !== void 0) {
					x = Math.floor(x / 2);
					y = Math.floor(y / 2);
					tileRange = createOrUpdate$1(x, x, y, y, tempTileRange);
				} else tileRange = this.getTileRangeForExtentAndZ(tileCoordExtent, z, tempTileRange);
				if (callback(z, tileRange)) return true;
				--z;
			}
			return false;
		}
		/**
		* Get the extent for this tile grid, if it was configured.
		* @return {import("../extent.js").Extent} Extent.
		* @api
		*/
		getExtent() {
			return this.extent_;
		}
		/**
		* Get the maximum zoom level for the grid.
		* @return {number} Max zoom.
		* @api
		*/
		getMaxZoom() {
			return this.maxZoom;
		}
		/**
		* Get the minimum zoom level for the grid.
		* @return {number} Min zoom.
		* @api
		*/
		getMinZoom() {
			return this.minZoom;
		}
		/**
		* Get the origin for the grid at the given zoom level.
		* @param {number} z Integer zoom level.
		* @return {import("../coordinate.js").Coordinate} Origin.
		* @api
		*/
		getOrigin(z) {
			if (this.origin_) return this.origin_;
			return this.origins_[z];
		}
		/**
		* Get the list of origins for the grid.
		* @return {Array<import("../coordinate.js").Coordinate>|null} Origin.
		*/
		getOrigins() {
			return this.origins_;
		}
		/**
		* Get the resolution for the given zoom level.
		* @param {number} z Integer zoom level.
		* @return {number} Resolution.
		* @api
		*/
		getResolution(z) {
			return this.resolutions_[z];
		}
		/**
		* Get the list of resolutions for the tile grid.
		* @return {Array<number>} Resolutions.
		* @api
		*/
		getResolutions() {
			return this.resolutions_;
		}
		/**
		* @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
		* @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
		* @param {import("../extent.js").Extent} [tempExtent] Temporary import("../extent.js").Extent object.
		* @return {import("../TileRange.js").default|null} Tile range.
		*/
		getTileCoordChildTileRange(tileCoord, tempTileRange, tempExtent) {
			if (tileCoord[0] < this.maxZoom) {
				if (this.zoomFactor_ === 2) {
					const minX = tileCoord[1] * 2;
					const minY = tileCoord[2] * 2;
					return createOrUpdate$1(minX, minX + 1, minY, minY + 1, tempTileRange);
				}
				const tileCoordExtent = this.getTileCoordExtent(tileCoord, tempExtent || this.tmpExtent_);
				return this.getTileRangeForExtentAndZ(tileCoordExtent, tileCoord[0] + 1, tempTileRange);
			}
			return null;
		}
		/**
		* @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
		* @param {number} z Integer zoom level.
		* @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
		* @return {import("../TileRange.js").default|null} Tile range.
		*/
		getTileRangeForTileCoordAndZ(tileCoord, z, tempTileRange) {
			if (z > this.maxZoom || z < this.minZoom) return null;
			const tileCoordZ = tileCoord[0];
			const tileCoordX = tileCoord[1];
			const tileCoordY = tileCoord[2];
			if (z === tileCoordZ) return createOrUpdate$1(tileCoordX, tileCoordY, tileCoordX, tileCoordY, tempTileRange);
			if (this.zoomFactor_) {
				const factor = Math.pow(this.zoomFactor_, z - tileCoordZ);
				const minX = Math.floor(tileCoordX * factor);
				const minY = Math.floor(tileCoordY * factor);
				if (z < tileCoordZ) return createOrUpdate$1(minX, minX, minY, minY, tempTileRange);
				return createOrUpdate$1(minX, Math.floor(factor * (tileCoordX + 1)) - 1, minY, Math.floor(factor * (tileCoordY + 1)) - 1, tempTileRange);
			}
			const tileCoordExtent = this.getTileCoordExtent(tileCoord, this.tmpExtent_);
			return this.getTileRangeForExtentAndZ(tileCoordExtent, z, tempTileRange);
		}
		/**
		* Get a tile range for the given extent and integer zoom level.
		* @param {import("../extent.js").Extent} extent Extent.
		* @param {number} z Integer zoom level.
		* @param {import("../TileRange.js").default} [tempTileRange] Temporary tile range object.
		* @return {import("../TileRange.js").default} Tile range.
		*/
		getTileRangeForExtentAndZ(extent, z, tempTileRange) {
			this.getTileCoordForXYAndZ_(extent[0], extent[3], z, false, tmpTileCoord);
			const minX = tmpTileCoord[1];
			const minY = tmpTileCoord[2];
			this.getTileCoordForXYAndZ_(extent[2], extent[1], z, true, tmpTileCoord);
			const maxX = tmpTileCoord[1];
			const maxY = tmpTileCoord[2];
			return createOrUpdate$1(minX, maxX, minY, maxY, tempTileRange);
		}
		/**
		* @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
		* @return {import("../coordinate.js").Coordinate} Tile center.
		*/
		getTileCoordCenter(tileCoord) {
			const origin = this.getOrigin(tileCoord[0]);
			const resolution = this.getResolution(tileCoord[0]);
			const tileSize = toSize(this.getTileSize(tileCoord[0]), this.tmpSize_);
			return [origin[0] + (tileCoord[1] + .5) * tileSize[0] * resolution, origin[1] - (tileCoord[2] + .5) * tileSize[1] * resolution];
		}
		/**
		* Get the extent of a tile coordinate.
		*
		* @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
		* @param {import("../extent.js").Extent} [tempExtent] Temporary extent object.
		* @return {import("../extent.js").Extent} Extent.
		* @api
		*/
		getTileCoordExtent(tileCoord, tempExtent) {
			const origin = this.getOrigin(tileCoord[0]);
			const resolution = this.getResolution(tileCoord[0]);
			const tileSize = toSize(this.getTileSize(tileCoord[0]), this.tmpSize_);
			const minX = origin[0] + tileCoord[1] * tileSize[0] * resolution;
			const minY = origin[1] - (tileCoord[2] + 1) * tileSize[1] * resolution;
			return createOrUpdate$2(minX, minY, minX + tileSize[0] * resolution, minY + tileSize[1] * resolution, tempExtent);
		}
		/**
		* Get the tile coordinate for the given map coordinate and resolution.  This
		* method considers that coordinates that intersect tile boundaries should be
		* assigned the higher tile coordinate.
		*
		* @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
		* @param {number} resolution Resolution.
		* @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
		* @return {import("../tilecoord.js").TileCoord} Tile coordinate.
		* @api
		*/
		getTileCoordForCoordAndResolution(coordinate, resolution, opt_tileCoord) {
			return this.getTileCoordForXYAndResolution_(coordinate[0], coordinate[1], resolution, false, opt_tileCoord);
		}
		/**
		* Note that this method should not be called for resolutions that correspond
		* to an integer zoom level.  Instead call the `getTileCoordForXYAndZ_` method.
		* @param {number} x X.
		* @param {number} y Y.
		* @param {number} resolution Resolution (for a non-integer zoom level).
		* @param {boolean} reverseIntersectionPolicy Instead of letting edge
		*     intersections go to the higher tile coordinate, let edge intersections
		*     go to the lower tile coordinate.
		* @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
		* @return {import("../tilecoord.js").TileCoord} Tile coordinate.
		* @private
		*/
		getTileCoordForXYAndResolution_(x, y, resolution, reverseIntersectionPolicy, opt_tileCoord) {
			const z = this.getZForResolution(resolution);
			const scale = resolution / this.getResolution(z);
			const origin = this.getOrigin(z);
			const tileSize = toSize(this.getTileSize(z), this.tmpSize_);
			let tileCoordX = scale * (x - origin[0]) / resolution / tileSize[0];
			let tileCoordY = scale * (origin[1] - y) / resolution / tileSize[1];
			if (reverseIntersectionPolicy) {
				tileCoordX = ceil(tileCoordX, DECIMALS) - 1;
				tileCoordY = ceil(tileCoordY, DECIMALS) - 1;
			} else {
				tileCoordX = floor(tileCoordX, DECIMALS);
				tileCoordY = floor(tileCoordY, DECIMALS);
			}
			return createOrUpdate(z, tileCoordX, tileCoordY, opt_tileCoord);
		}
		/**
		* Although there is repetition between this method and `getTileCoordForXYAndResolution_`,
		* they should have separate implementations.  This method is for integer zoom
		* levels.  The other method should only be called for resolutions corresponding
		* to non-integer zoom levels.
		* @param {number} x Map x coordinate.
		* @param {number} y Map y coordinate.
		* @param {number} z Integer zoom level.
		* @param {boolean} reverseIntersectionPolicy Instead of letting edge
		*     intersections go to the higher tile coordinate, let edge intersections
		*     go to the lower tile coordinate.
		* @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
		* @return {import("../tilecoord.js").TileCoord} Tile coordinate.
		* @private
		*/
		getTileCoordForXYAndZ_(x, y, z, reverseIntersectionPolicy, opt_tileCoord) {
			const origin = this.getOrigin(z);
			const resolution = this.getResolution(z);
			const tileSize = toSize(this.getTileSize(z), this.tmpSize_);
			let tileCoordX = (x - origin[0]) / resolution / tileSize[0];
			let tileCoordY = (origin[1] - y) / resolution / tileSize[1];
			if (reverseIntersectionPolicy) {
				tileCoordX = ceil(tileCoordX, DECIMALS) - 1;
				tileCoordY = ceil(tileCoordY, DECIMALS) - 1;
			} else {
				tileCoordX = floor(tileCoordX, DECIMALS);
				tileCoordY = floor(tileCoordY, DECIMALS);
			}
			return createOrUpdate(z, tileCoordX, tileCoordY, opt_tileCoord);
		}
		/**
		* Get a tile coordinate given a map coordinate and zoom level.
		* @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
		* @param {number} z Integer zoom level, e.g. the result of a `getZForResolution()` method call
		* @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
		* @return {import("../tilecoord.js").TileCoord} Tile coordinate.
		* @api
		*/
		getTileCoordForCoordAndZ(coordinate, z, opt_tileCoord) {
			return this.getTileCoordForXYAndZ_(coordinate[0], coordinate[1], z, false, opt_tileCoord);
		}
		/**
		* @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
		* @return {number} Tile resolution.
		*/
		getTileCoordResolution(tileCoord) {
			return this.resolutions_[tileCoord[0]];
		}
		/**
		* Get the tile size for a zoom level. The type of the return value matches the
		* `tileSize` or `tileSizes` that the tile grid was configured with. To always
		* get an {@link import("../size.js").Size}, run the result through {@link module:ol/size.toSize}.
		* @param {number} z Z.
		* @return {number|import("../size.js").Size} Tile size.
		* @api
		*/
		getTileSize(z) {
			if (this.tileSize_) return this.tileSize_;
			return this.tileSizes_[z];
		}
		/**
		* @param {number} z Zoom level.
		* @return {import("../TileRange.js").default|null} Extent tile range for the specified zoom level.
		*/
		getFullTileRange(z) {
			if (!this.fullTileRanges_) return this.extent_ ? this.getTileRangeForExtentAndZ(this.extent_, z) : null;
			return this.fullTileRanges_[z];
		}
		/**
		* @param {number} resolution Resolution.
		* @param {number|import("../array.js").NearestDirectionFunction} [opt_direction]
		*     If 0, the nearest resolution will be used.
		*     If 1, the nearest higher resolution (lower Z) will be used. If -1, the
		*     nearest lower resolution (higher Z) will be used. Default is 0.
		*     Use a {@link module:ol/array~NearestDirectionFunction} for more precise control.
		*
		* For example to change tile Z at the midpoint of zoom levels
		* ```js
		* function(value, high, low) {
		*   return value - low * Math.sqrt(high / low);
		* }
		* ```
		* @return {number} Z.
		* @api
		*/
		getZForResolution(resolution, opt_direction) {
			return clamp(linearFindNearest(this.resolutions_, resolution, opt_direction || 0), this.minZoom, this.maxZoom);
		}
		/**
		* The tile with the provided tile coordinate intersects the given viewport.
		* @param {import('../tilecoord.js').TileCoord} tileCoord Tile coordinate.
		* @param {Array<number>} viewport Viewport as returned from {@link module:ol/extent.getRotatedViewport}.
		* @return {boolean} The tile with the provided tile coordinate intersects the given viewport.
		*/
		tileCoordIntersectsViewport(tileCoord, viewport) {
			return intersectsLinearRing(viewport, 0, viewport.length, 2, this.getTileCoordExtent(tileCoord));
		}
		/**
		* @param {!import("../extent.js").Extent} extent Extent for this tile grid.
		* @private
		*/
		calculateTileRanges_(extent) {
			const length = this.resolutions_.length;
			const fullTileRanges = new Array(length);
			for (let z = this.minZoom; z < length; ++z) fullTileRanges[z] = this.getTileRangeForExtentAndZ(extent, z);
			this.fullTileRanges_ = fullTileRanges;
		}
	};
	//#endregion
	//#region src/ol/tilegrid.js
	/**
	* @module ol/tilegrid
	*/
	/**
	* @param {import("./proj/Projection.js").default} projection Projection.
	* @return {!TileGrid} Default tile grid for the
	* passed projection.
	*/
	function getForProjection(projection) {
		let tileGrid = projection.getDefaultTileGrid();
		if (!tileGrid) {
			tileGrid = createForProjection(projection);
			projection.setDefaultTileGrid(tileGrid);
		}
		return tileGrid;
	}
	/**
	* @param {TileGrid} tileGrid Tile grid.
	* @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
	* @param {import("./proj/Projection.js").default} projection Projection.
	* @return {import("./tilecoord.js").TileCoord} Tile coordinate.
	*/
	function wrapX(tileGrid, tileCoord, projection) {
		const z = tileCoord[0];
		const center = tileGrid.getTileCoordCenter(tileCoord);
		const projectionExtent = extentFromProjection(projection);
		if (!containsCoordinate(projectionExtent, center)) {
			const worldWidth = getWidth(projectionExtent);
			const worldsAway = Math.ceil((projectionExtent[0] - center[0]) / worldWidth);
			center[0] += worldWidth * worldsAway;
			return tileGrid.getTileCoordForCoordAndZ(center, z);
		}
		return tileCoord;
	}
	/**
	* @param {import("./extent.js").Extent} extent Extent.
	* @param {number} [maxZoom] Maximum zoom level (default is
	*     DEFAULT_MAX_ZOOM).
	* @param {number|import("./size.js").Size} [tileSize] Tile size (default uses
	*     DEFAULT_TILE_SIZE).
	* @param {import("./extent.js").Corner} [corner] Extent corner (default is `'top-left'`).
	* @return {!TileGrid} TileGrid instance.
	*/
	function createForExtent(extent, maxZoom, tileSize, corner) {
		corner = corner !== void 0 ? corner : "top-left";
		const resolutions = resolutionsFromExtent(extent, maxZoom, tileSize);
		return new TileGrid({
			extent,
			origin: getCorner(extent, corner),
			resolutions,
			tileSize
		});
	}
	/**
	* @typedef {Object} XYZOptions
	* @property {import("./extent.js").Extent} [extent] Extent for the tile grid. The origin for an XYZ tile grid is the
	* top-left corner of the extent. If `maxResolution` is not provided the zero level of the grid is defined by the resolution
	* at which one tile fits in the provided extent. If not provided, the extent of the EPSG:3857 projection is used.
	* @property {number} [maxResolution] Resolution at level zero.
	* @property {number} [maxZoom] Maximum zoom. The default is `42`. This determines the number of levels
	* in the grid set. For example, a `maxZoom` of 21 means there are 22 levels in the grid set.
	* @property {number} [minZoom=0] Minimum zoom.
	* @property {number|import("./size.js").Size} [tileSize=[256, 256]] Tile size in pixels.
	*/
	/**
	* Creates a tile grid with a standard XYZ tiling scheme.
	* @param {XYZOptions} [options] Tile grid options.
	* @return {!TileGrid} Tile grid instance.
	* @api
	*/
	function createXYZ(options) {
		const xyzOptions = options || {};
		const extent = xyzOptions.extent || get$1("EPSG:3857").getExtent();
		return new TileGrid({
			extent,
			minZoom: xyzOptions.minZoom,
			tileSize: xyzOptions.tileSize,
			resolutions: resolutionsFromExtent(extent, xyzOptions.maxZoom, xyzOptions.tileSize, xyzOptions.maxResolution)
		});
	}
	/**
	* Create a resolutions array from an extent.  A zoom factor of 2 is assumed.
	* @param {import("./extent.js").Extent} extent Extent.
	* @param {number} [maxZoom] Maximum zoom level (default is
	*     DEFAULT_MAX_ZOOM).
	* @param {number|import("./size.js").Size} [tileSize] Tile size (default uses
	*     DEFAULT_TILE_SIZE).
	* @param {number} [maxResolution] Resolution at level zero.
	* @return {!Array<number>} Resolutions array.
	*/
	function resolutionsFromExtent(extent, maxZoom, tileSize, maxResolution) {
		maxZoom = maxZoom !== void 0 ? maxZoom : 42;
		tileSize = toSize(tileSize !== void 0 ? tileSize : 256);
		const height = getHeight(extent);
		const width = getWidth(extent);
		maxResolution = maxResolution > 0 ? maxResolution : Math.max(width / tileSize[0], height / tileSize[1]);
		const length = maxZoom + 1;
		const resolutions = new Array(length);
		for (let z = 0; z < length; ++z) resolutions[z] = maxResolution / Math.pow(2, z);
		return resolutions;
	}
	/**
	* @param {import("./proj.js").ProjectionLike} projection Projection.
	* @param {number} [maxZoom] Maximum zoom level (default is
	*     DEFAULT_MAX_ZOOM).
	* @param {number|import("./size.js").Size} [tileSize] Tile size (default uses
	*     DEFAULT_TILE_SIZE).
	* @param {import("./extent.js").Corner} [corner] Extent corner (default is `'top-left'`).
	* @return {!TileGrid} TileGrid instance.
	*/
	function createForProjection(projection, maxZoom, tileSize, corner) {
		return createForExtent(extentFromProjection(projection), maxZoom, tileSize, corner);
	}
	/**
	* Generate a tile grid extent from a projection.  If the projection has an
	* extent, it is used.  If not, a global extent is assumed.
	* @param {import("./proj.js").ProjectionLike} projection Projection.
	* @return {import("./extent.js").Extent} Extent.
	*/
	function extentFromProjection(projection) {
		projection = get$1(projection);
		let extent = projection.getExtent();
		if (!extent) {
			const half = 180 * METERS_PER_UNIT$1.degrees / projection.getMetersPerUnit();
			extent = createOrUpdate$2(-half, -half, half, half);
		}
		return extent;
	}
	//#endregion
	//#region src/ol/uri.js
	const zRegEx = /\{z\}/g;
	const xRegEx = /\{x\}/g;
	const yRegEx = /\{y\}/g;
	const dashYRegEx = /\{-y\}/g;
	/**
	* @param {string} template The URL template.  Should have `{x}`, `{y}`, and `{z}` placeholders.  If
	* the template has a `{-y}` placeholder, the `maxY` parameter must be supplied.
	* @param {number} z The tile z coordinate.
	* @param {number} x The tile x coordinate.
	* @param {number} y The tile y coordinate.
	* @param {number} [maxY] The maximum y coordinate at the given z level.
	* @return {string} The URL.
	*/
	function renderXYZTemplate(template, z, x, y, maxY) {
		return template.replace(zRegEx, z.toString()).replace(xRegEx, x.toString()).replace(yRegEx, y.toString()).replace(dashYRegEx, function() {
			if (maxY === void 0) throw new Error("If the URL template has a {-y} placeholder, the grid extent must be known");
			return (maxY - y).toString();
		});
	}
	/**
	* @param {string} url URL.
	* @return {Array<string>} Array of urls.
	*/
	function expandUrl(url) {
		const urls = [];
		let match = /\{([a-z])-([a-z])\}/.exec(url);
		if (match) {
			const startCharCode = match[1].charCodeAt(0);
			const stopCharCode = match[2].charCodeAt(0);
			let charCode;
			for (charCode = startCharCode; charCode <= stopCharCode; ++charCode) urls.push(url.replace(match[0], String.fromCharCode(charCode)));
			return urls;
		}
		match = /\{(\d+)-(\d+)\}/.exec(url);
		if (match) {
			const stop = parseInt(match[2], 10);
			for (let i = parseInt(match[1], 10); i <= stop; i++) urls.push(url.replace(match[0], i.toString()));
			return urls;
		}
		urls.push(url);
		return urls;
	}
	//#endregion
	//#region src/ol/tileurlfunction.js
	/**
	* @module ol/tileurlfunction
	*/
	/**
	* @param {string} template Template.
	* @param {import("./tilegrid/TileGrid.js").default|null} tileGrid Tile grid.
	* @return {import("./Tile.js").UrlFunction} Tile URL function.
	*/
	function createFromTemplate(template, tileGrid) {
		return (
		/**
		* @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
		* @param {number} pixelRatio Pixel ratio.
		* @param {import("./proj/Projection.js").default} projection Projection.
		* @return {string|undefined} Tile URL.
		*/
function(tileCoord, pixelRatio, projection) {
			if (!tileCoord) return;
			let maxY;
			const z = tileCoord[0];
			if (tileGrid) {
				const range = tileGrid.getFullTileRange(z);
				if (range) maxY = range.getHeight() - 1;
			}
			return renderXYZTemplate(template, z, tileCoord[1], tileCoord[2], maxY);
		});
	}
	/**
	* @param {Array<string>} templates Templates.
	* @param {import("./tilegrid/TileGrid.js").default} tileGrid Tile grid.
	* @return {import("./Tile.js").UrlFunction} Tile URL function.
	*/
	function createFromTemplates(templates, tileGrid) {
		const len = templates.length;
		const tileUrlFunctions = new Array(len);
		for (let i = 0; i < len; ++i) tileUrlFunctions[i] = createFromTemplate(templates[i], tileGrid);
		return createFromTileUrlFunctions(tileUrlFunctions);
	}
	/**
	* @param {Array<import("./Tile.js").UrlFunction>} tileUrlFunctions Tile URL Functions.
	* @return {import("./Tile.js").UrlFunction} Tile URL function.
	*/
	function createFromTileUrlFunctions(tileUrlFunctions) {
		if (tileUrlFunctions.length === 1) return tileUrlFunctions[0];
		return (
		/**
		* @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
		* @param {number} pixelRatio Pixel ratio.
		* @param {import("./proj/Projection.js").default} projection Projection.
		* @return {string|undefined} Tile URL.
		*/
function(tileCoord, pixelRatio, projection) {
			if (!tileCoord) return;
			return tileUrlFunctions[modulo(hash(tileCoord), tileUrlFunctions.length)](tileCoord, pixelRatio, projection);
		});
	}
	//#endregion
	//#region src/ol/source/Source.js
	/**
	* @module ol/source/Source
	*/
	/**
	* @typedef {'undefined' | 'loading' | 'ready' | 'error'} State
	* State of the source, one of 'undefined', 'loading', 'ready' or 'error'.
	*/
	/**
	* A function that takes a {@link import("../View.js").ViewStateLayerStateExtent} and returns a string or
	* an array of strings representing source attributions.
	*
	* @typedef {function(import("../View.js").ViewStateLayerStateExtent): (string|Array<string>)} Attribution
	*/
	/**
	* A type that can be used to provide attribution information for data sources.
	*
	* It represents either
	* a simple string (e.g. `'© Acme Inc.'`)
	* an array of simple strings (e.g. `['© Acme Inc.', '© Bacme Inc.']`)
	* a function that returns a string or array of strings ({@link module:ol/source/Source~Attribution})
	*
	* @typedef {string|Array<string>|Attribution} AttributionLike
	*/
	/**
	* @typedef {Object} Options
	* @property {AttributionLike} [attributions] Attributions.
	* @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
	* @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
	* @property {import("./Source.js").State} [state='ready'] State.
	* @property {boolean} [wrapX=false] WrapX.
	* @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
	* the nearest neighbor is used when resampling.
	*/
	/**
	* @classdesc
	* Abstract base class; normally only used for creating subclasses and not
	* instantiated in apps.
	* Base class for {@link module:ol/layer/Layer~Layer} sources.
	*
	* A generic `change` event is triggered when the state of the source changes.
	* @abstract
	* @api
	*/
	var Source = class extends BaseObject {
		/**
		* @param {Options} options Source options.
		*/
		constructor(options) {
			super();
			/**
			* @protected
			* @type {import("../proj/Projection.js").default|null}
			*/
			this.projection = get$1(options.projection);
			/**
			* @private
			* @type {?Attribution}
			*/
			this.attributions_ = adaptAttributions(options.attributions);
			/**
			* @private
			* @type {boolean}
			*/
			this.attributionsCollapsible_ = options.attributionsCollapsible ?? true;
			/**
			* This source is currently loading data. Sources that defer loading to the
			* map's tile queue never set this to a `truthy` value.
			* @type {boolean|number}
			*/
			this.loading = false;
			/**
			* @private
			* @type {import("./Source.js").State}
			*/
			this.state_ = options.state !== void 0 ? options.state : "ready";
			/**
			* @private
			* @type {boolean}
			*/
			this.wrapX_ = options.wrapX !== void 0 ? options.wrapX : false;
			/**
			* @private
			* @type {boolean}
			*/
			this.interpolate_ = !!options.interpolate;
			/**
			* @protected
			* @type {function(import("../View.js").ViewOptions):void}
			*/
			this.viewResolver = null;
			/**
			* @protected
			* @type {function(Error):void}
			*/
			this.viewRejector = null;
			const self = this;
			/**
			* @private
			* @type {Promise<import("../View.js").ViewOptions>}
			*/
			this.viewPromise_ = new Promise(function(resolve, reject) {
				self.viewResolver = resolve;
				self.viewRejector = reject;
			});
		}
		/**
		* Get the attribution function for the source.
		* @return {?Attribution} Attribution function.
		* @api
		*/
		getAttributions() {
			return this.attributions_;
		}
		/**
		* @return {boolean} Attributions are collapsible.
		* @api
		*/
		getAttributionsCollapsible() {
			return this.attributionsCollapsible_;
		}
		/**
		* Get the projection of the source.
		* @return {import("../proj/Projection.js").default|null} Projection.
		* @api
		*/
		getProjection() {
			return this.projection;
		}
		/**
		* @param {import("../proj/Projection.js").default} [projection] Projection.
		* @return {Array<number>|null} Resolutions.
		*/
		getResolutions(projection) {
			return null;
		}
		/**
		* @return {Promise<import("../View.js").ViewOptions>} A promise for view-related properties.
		*/
		getView() {
			return this.viewPromise_;
		}
		/**
		* Resolve once the source is ready to be used (its state is `ready`), or
		* reject if it fails to load (its state is `error`). Sources that configure
		* asynchronously can use this to expose data (e.g. dimensions) through a
		* promise instead of the `change` event.
		* @return {Promise<void>} Resolves when the source is ready.
		* @protected
		*/
		ready() {
			const state = this.getState();
			if (state === "ready") return Promise.resolve();
			if (state === "error") return Promise.reject(/* @__PURE__ */ new Error("Source failed to load"));
			return new Promise((resolve, reject) => {
				const onChange = () => {
					const changedState = this.getState();
					if (changedState === "ready") {
						this.un("change", onChange);
						resolve();
					} else if (changedState === "error") {
						this.un("change", onChange);
						reject(/* @__PURE__ */ new Error("Source failed to load"));
					}
				};
				this.on("change", onChange);
			});
		}
		/**
		* Get the state of the source, see {@link import("./Source.js").State} for possible states.
		* @return {import("./Source.js").State} State.
		* @api
		*/
		getState() {
			return this.state_;
		}
		/**
		* @return {boolean|undefined} Wrap X.
		*/
		getWrapX() {
			return this.wrapX_;
		}
		/**
		* @return {boolean} Use linear interpolation when resampling.
		*/
		getInterpolate() {
			return this.interpolate_;
		}
		/**
		* Refreshes the source. The source will be cleared, and data from the server will be reloaded.
		* @api
		*/
		refresh() {
			this.changed();
		}
		/**
		* Set the attributions of the source.
		* @param {AttributionLike|undefined} attributions Attributions.
		*     Can be passed as `string`, `Array<string>`, {@link module:ol/source/Source~Attribution},
		*     or `undefined`.
		* @api
		*/
		setAttributions(attributions) {
			this.attributions_ = adaptAttributions(attributions);
			this.changed();
		}
		/**
		* Set the state of the source.
		* @param {import("./Source.js").State} state State.
		*/
		setState(state) {
			this.state_ = state;
			this.changed();
		}
	};
	/**
	* Turns the attributions option into an attributions function.
	* @param {AttributionLike|undefined} attributionLike The attribution option.
	* @return {Attribution|null} An attribution function (or null).
	*/
	function adaptAttributions(attributionLike) {
		if (!attributionLike) return null;
		if (typeof attributionLike === "function") return attributionLike;
		if (!Array.isArray(attributionLike)) attributionLike = [attributionLike];
		return (frameState) => attributionLike;
	}
	//#endregion
	//#region src/ol/source/Tile.js
	/**
	* @module ol/source/Tile
	*/
	/***
	* @template Return
	* @typedef {import("../Observable.js").OnSignature<import("../Observable.js").EventTypes, import("../events/Event.js").default, Return> &
	*   import("../Observable.js").OnSignature<import("../ObjectEventType.js").Types, import("../Object.js").ObjectEvent, Return> &
	*   import("../Observable.js").OnSignature<import("./TileEventType.js").TileSourceEventTypes, TileSourceEvent, Return> &
	*   import("../Observable.js").CombinedOnSignature<import("../Observable.js").EventTypes|import("../ObjectEventType.js").Types|
	*     import("./TileEventType.js").TileSourceEventTypes, Return>} TileSourceOnSignature
	*/
	/**
	* @typedef {Object} Options
	* @property {import("./Source.js").AttributionLike} [attributions] Attributions.
	* @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
	* @property {number} [cacheSize] Deprecated.  Use the cacheSize option on the layer instead.
	* @property {number} [tilePixelRatio] TilePixelRatio.
	* @property {import("../proj.js").ProjectionLike} [projection] Projection.
	* @property {import("./Source.js").State} [state] State.
	* @property {import("../tilegrid/TileGrid.js").default} [tileGrid] TileGrid.
	* @property {boolean} [wrapX=false] WrapX.
	* @property {number} [transition] Transition.
	* @property {string} [key] Key.
	* @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0] ZDirection.
	* @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
	* the nearest neighbor is used when resampling.
	*/
	/**
	* @classdesc
	* Abstract base class; normally only used for creating subclasses and not
	* instantiated in apps.
	* Base class for sources providing images divided into a tile grid.
	*
	* @template {import("../Tile.js").default} [TileType=import("../Tile.js").default]
	* @abstract
	* @api
	*/
	var TileSource = class extends Source {
		/**
		* @param {Options} options SourceTile source options.
		*/
		constructor(options) {
			super({
				attributions: options.attributions,
				attributionsCollapsible: options.attributionsCollapsible,
				projection: options.projection,
				state: options.state,
				wrapX: options.wrapX,
				interpolate: options.interpolate
			});
			/***
			* @type {TileSourceOnSignature<import("../events.js").EventsKey>}
			*/
			this.on;
			/***
			* @type {TileSourceOnSignature<import("../events.js").EventsKey>}
			*/
			this.once;
			/***
			* @type {TileSourceOnSignature<void>}
			*/
			this.un;
			/**
			* @private
			* @type {number}
			*/
			this.tilePixelRatio_ = options.tilePixelRatio !== void 0 ? options.tilePixelRatio : 1;
			/**
			* @type {import("../tilegrid/TileGrid.js").default|null}
			* @protected
			*/
			this.tileGrid = options.tileGrid !== void 0 ? options.tileGrid : null;
			const tileSize = [256, 256];
			if (this.tileGrid) toSize(this.tileGrid.getTileSize(this.tileGrid.getMinZoom()), tileSize);
			/**
			* @protected
			* @type {import("../size.js").Size}
			*/
			this.tmpSize = [0, 0];
			/**
			* @private
			* @type {string}
			*/
			this.key_ = options.key || getUid(this);
			/**
			* @protected
			* @type {import("../Tile.js").Options}
			*/
			this.tileOptions = {
				transition: options.transition,
				interpolate: options.interpolate
			};
			/**
			* zDirection hint, read by the renderer. Indicates which resolution should be used
			* by a renderer if the views resolution does not match any resolution of the tile source.
			* If 0, the nearest resolution will be used. If 1, the nearest lower resolution
			* will be used. If -1, the nearest higher resolution will be used.
			* @type {number|import("../array.js").NearestDirectionFunction}
			*/
			this.zDirection = options.zDirection ? options.zDirection : 0;
		}
		/**
		* @param {import("../proj/Projection.js").default} projection Projection.
		* @return {number} Gutter.
		*/
		getGutterForProjection(projection) {
			return 0;
		}
		/**
		* Return the key to be used for all tiles in the source.
		* @return {string} The key for all tiles.
		*/
		getKey() {
			return this.key_;
		}
		/**
		* Set the value to be used as the key for all tiles in the source.
		* @param {string} key The key for tiles.
		* @protected
		*/
		setKey(key) {
			if (this.key_ !== key) {
				this.key_ = key;
				this.changed();
			}
		}
		/**
		* @param {import("../proj/Projection.js").default} [projection] Projection.
		* @return {Array<number>|null} Resolutions.
		* @override
		*/
		getResolutions(projection) {
			const tileGrid = projection ? this.getTileGridForProjection(projection) : this.tileGrid;
			if (!tileGrid) return null;
			return tileGrid.getResolutions();
		}
		/**
		* @abstract
		* @param {number} z Tile coordinate z.
		* @param {number} x Tile coordinate x.
		* @param {number} y Tile coordinate y.
		* @param {number} pixelRatio Pixel ratio.
		* @param {import("../proj/Projection.js").default} projection Projection.
		* @param {import("../structs/LRUCache.js").default<import("../Tile.js").default>} [tileCache] Tile cache.
		* @return {TileType|null} Tile.
		*/
		getTile(z, x, y, pixelRatio, projection, tileCache) {
			return abstract();
		}
		/**
		* Return the tile grid of the tile source.
		* @return {import("../tilegrid/TileGrid.js").default|null} Tile grid.
		* @api
		*/
		getTileGrid() {
			return this.tileGrid;
		}
		/**
		* @param {import("../proj/Projection.js").default} projection Projection.
		* @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
		*/
		getTileGridForProjection(projection) {
			if (!this.tileGrid) return getForProjection(projection);
			return this.tileGrid;
		}
		/**
		* Get the tile pixel ratio for this source. Subclasses may override this
		* method, which is meant to return a supported pixel ratio that matches the
		* provided `pixelRatio` as close as possible.
		* @param {number} pixelRatio Pixel ratio.
		* @return {number} Tile pixel ratio.
		*/
		getTilePixelRatio(pixelRatio) {
			return this.tilePixelRatio_;
		}
		/**
		* @param {number} z Z.
		* @param {number} pixelRatio Pixel ratio.
		* @param {import("../proj/Projection.js").default} projection Projection.
		* @return {import("../size.js").Size} Tile size.
		*/
		getTilePixelSize(z, pixelRatio, projection) {
			const tileGrid = this.getTileGridForProjection(projection);
			const tilePixelRatio = this.getTilePixelRatio(pixelRatio);
			const tileSize = toSize(tileGrid.getTileSize(z), this.tmpSize);
			if (tilePixelRatio == 1) return tileSize;
			return scale(tileSize, tilePixelRatio, this.tmpSize);
		}
		/**
		* Returns a tile coordinate wrapped around the x-axis. When the tile coordinate
		* is outside the resolution and extent range of the tile grid, `null` will be
		* returned.
		* @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
		* @param {import("../proj/Projection.js").default} [projection] Projection.
		* @return {import("../tilecoord.js").TileCoord} Tile coordinate to be passed to the tileUrlFunction or
		*     null if no tile URL should be created for the passed `tileCoord`.
		*/
		getTileCoordForTileUrlFunction(tileCoord, projection) {
			const gridProjection = projection !== void 0 ? projection : this.getProjection();
			const tileGrid = projection !== void 0 ? this.getTileGridForProjection(gridProjection) : this.tileGrid || this.getTileGridForProjection(gridProjection);
			if (this.getWrapX() && gridProjection.isGlobal()) tileCoord = wrapX(tileGrid, tileCoord, gridProjection);
			return withinExtentAndZ(tileCoord, tileGrid) ? tileCoord : null;
		}
		/**
		* Remove all cached reprojected tiles from the source. The next render cycle will create new tiles.
		* @api
		*/
		clear() {}
		/**
		* @override
		*/
		refresh() {
			this.clear();
			super.refresh();
		}
	};
	/**
	* @classdesc
	* Events emitted by {@link module:ol/source/Tile~TileSource} instances are instances of this
	* type.
	*/
	var TileSourceEvent = class extends BaseEvent {
		/**
		* @param {string} type Type.
		* @param {import("../Tile.js").default} tile The tile.
		*/
		constructor(type, tile) {
			super(type);
			/**
			* The tile related to the event.
			* @type {import("../Tile.js").default}
			* @api
			*/
			this.tile = tile;
		}
	};
	//#endregion
	//#region src/ol/source/TileEventType.js
	/**
	* @module ol/source/TileEventType
	*/
	/**
	* @enum {string}
	*/
	var TileEventType_default = {
		/**
		* Triggered when a tile starts loading.
		* @event module:ol/source/Tile.TileSourceEvent#tileloadstart
		* @api
		*/
		TILELOADSTART: "tileloadstart",
		/**
		* Triggered when a tile finishes loading, either when its data is loaded,
		* or when loading was aborted because the tile is no longer needed.
		* @event module:ol/source/Tile.TileSourceEvent#tileloadend
		* @api
		*/
		TILELOADEND: "tileloadend",
		/**
		* Triggered if tile loading results in an error. Note that this is not the
		* right place to re-fetch tiles. See {@link module:ol/ImageTile~ImageTile#load}
		* for details.
		* @event module:ol/source/Tile.TileSourceEvent#tileloaderror
		* @api
		*/
		TILELOADERROR: "tileloaderror"
	};
	/**
	* @typedef {'tileloadstart'|'tileloadend'|'tileloaderror'} TileSourceEventTypes
	*/
	//#endregion
	//#region src/ol/source/UrlTile.js
	/**
	* @module ol/source/UrlTile
	*/
	/**
	* @typedef {Object} Options
	* @property {import("./Source.js").AttributionLike} [attributions] Attributions.
	* @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
	* @property {number} [cacheSize] Deprecated.  Use the cacheSize option on the layer instead.
	* @property {import("../proj.js").ProjectionLike} [projection] Projection.
	* @property {import("./Source.js").State} [state] State.
	* @property {import("../tilegrid/TileGrid.js").default} [tileGrid] TileGrid.
	* @property {import("../Tile.js").LoadFunction} tileLoadFunction TileLoadFunction.
	* @property {number} [tilePixelRatio] TilePixelRatio.
	* @property {import("../Tile.js").UrlFunction} [tileUrlFunction] Deprecated.  Use an ImageTile source and provide a function
	* for the url option instead.
	* @property {string} [url] Url.
	* @property {Array<string>} [urls] Urls.
	* @property {boolean} [wrapX=true] WrapX.
	* @property {number} [transition] Transition.
	* @property {string} [key] Key.
	* @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0] ZDirection.
	* @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
	* the nearest neighbor is used when resampling.
	*/
	/**
	* @deprecated Use the ol/source/ImageTile.js instead.
	*
	* @fires import("./Tile.js").TileSourceEvent
	*/
	var UrlTile = class UrlTile extends TileSource {
		/**
		* @param {Options} options Image tile options.
		*/
		constructor(options) {
			super({
				attributions: options.attributions,
				cacheSize: options.cacheSize,
				projection: options.projection,
				state: options.state,
				tileGrid: options.tileGrid,
				tilePixelRatio: options.tilePixelRatio,
				wrapX: options.wrapX,
				transition: options.transition,
				interpolate: options.interpolate,
				key: options.key,
				attributionsCollapsible: options.attributionsCollapsible,
				zDirection: options.zDirection
			});
			/**
			* @private
			* @type {boolean}
			*/
			this.generateTileUrlFunction_ = this.tileUrlFunction === UrlTile.prototype.tileUrlFunction;
			/**
			* @protected
			* @type {import("../Tile.js").LoadFunction}
			*/
			this.tileLoadFunction = options.tileLoadFunction;
			if (options.tileUrlFunction) this.tileUrlFunction = options.tileUrlFunction;
			/**
			* @protected
			* @type {!Array<string>|null}
			*/
			this.urls = null;
			if (options.urls) this.setUrls(options.urls);
			else if (options.url) this.setUrl(options.url);
			/**
			* @private
			* @type {!Object<string, boolean>}
			*/
			this.tileLoadingKeys_ = {};
		}
		/**
		* Deprecated.  Use an ImageTile source instead.
		* Return the tile load function of the source.
		* @return {import("../Tile.js").LoadFunction} TileLoadFunction
		* @api
		*/
		getTileLoadFunction() {
			return this.tileLoadFunction;
		}
		/**
		* Deprecated.  Use an ImageTile source instead.
		* Return the tile URL function of the source.
		* @return {import("../Tile.js").UrlFunction} TileUrlFunction
		* @api
		*/
		getTileUrlFunction() {
			return Object.getPrototypeOf(this).tileUrlFunction === this.tileUrlFunction ? this.tileUrlFunction.bind(this) : this.tileUrlFunction;
		}
		/**
		* Deprecated.  Use an ImageTile source instead.
		* Return the URLs used for this source.
		* When a tileUrlFunction is used instead of url or urls,
		* null will be returned.
		* @return {!Array<string>|null} URLs.
		* @api
		*/
		getUrls() {
			return this.urls;
		}
		/**
		* Handle tile change events.
		* @param {import("../events/Event.js").default} event Event.
		* @protected
		*/
		handleTileChange(event) {
			const tile = event.target;
			const uid = getUid(tile);
			const tileState = tile.getState();
			let type;
			if (tileState == TileState_default.LOADING) {
				this.tileLoadingKeys_[uid] = true;
				type = TileEventType_default.TILELOADSTART;
			} else if (uid in this.tileLoadingKeys_) {
				delete this.tileLoadingKeys_[uid];
				type = tileState == TileState_default.ERROR ? TileEventType_default.TILELOADERROR : tileState == TileState_default.LOADED ? TileEventType_default.TILELOADEND : void 0;
			}
			if (type != void 0) this.dispatchEvent(new TileSourceEvent(type, tile));
		}
		/**
		* Deprecated.  Use an ImageTile source instead.
		* Set the tile load function of the source.
		* @param {import("../Tile.js").LoadFunction} tileLoadFunction Tile load function.
		* @api
		*/
		setTileLoadFunction(tileLoadFunction) {
			this.tileLoadFunction = tileLoadFunction;
			this.changed();
		}
		/**
		* Deprecated.  Use an ImageTile source instead.
		* Set the tile URL function of the source.
		* @param {import("../Tile.js").UrlFunction} tileUrlFunction Tile URL function.
		* @param {string} [key] Optional new tile key for the source.
		* @api
		*/
		setTileUrlFunction(tileUrlFunction, key) {
			this.tileUrlFunction = tileUrlFunction;
			if (typeof key !== "undefined") this.setKey(key);
			else this.changed();
		}
		/**
		* Set the URL to use for requests.
		* @param {string} url URL.
		* @api
		*/
		setUrl(url) {
			const urls = expandUrl(url);
			this.urls = urls;
			this.setUrls(urls);
		}
		/**
		* Deprecated.  Use an ImageTile source instead.
		* Set the URLs to use for requests.
		* @param {Array<string>} urls URLs.
		* @api
		*/
		setUrls(urls) {
			this.urls = urls;
			const key = urls.join("\n");
			if (this.generateTileUrlFunction_) this.setTileUrlFunction(createFromTemplates(urls, this.tileGrid), key);
			else this.setKey(key);
		}
		/**
		* @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
		* @param {number} pixelRatio Pixel ratio.
		* @param {import("../proj/Projection.js").default} projection Projection.
		* @return {string|undefined} Tile URL.
		*/
		tileUrlFunction(tileCoord, pixelRatio, projection) {}
	};
	//#endregion
	//#region src/ol/source/TileImage.js
	/**
	* @module ol/source/TileImage
	*/
	/**
	* @typedef {Object} Options
	* @property {import("./Source.js").AttributionLike} [attributions] Attributions.
	* @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
	* @property {number} [cacheSize] Deprecated.  Use the cacheSize option on the layer instead.
	* @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
	* you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
	* See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
	* @property {ReferrerPolicy} [referrerPolicy] The `referrerPolicy` property for loaded images.
	* @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
	* linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
	* @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
	* @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
	* Higher values can increase reprojection performance, but decrease precision.
	* @property {import("./Source.js").State} [state] Source state.
	* @property {typeof import("../ImageTile.js").default} [tileClass] Class used to instantiate image tiles.
	* Default is {@link module:ol/ImageTile~ImageTile}.
	* @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
	* @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
	* ```js
	* function(imageTile, src) {
	*   imageTile.getImage().src = src;
	* };
	* ```
	* @property {number} [tilePixelRatio=1] The pixel ratio used by the tile service. For example, if the tile
	* service advertizes 256px by 256px tiles but actually sends 512px
	* by 512px images (for retina/hidpi devices) then `tilePixelRatio`
	* should be set to `2`.
	* @property {import("../Tile.js").UrlFunction} [tileUrlFunction] Deprecated.  Use an ImageTile source and provide a function
	* for the url option instead.
	* @property {string} [url] URL template. Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
	* A `{?-?}` template pattern, for example `subdomain{a-f}.domain.com`, may be
	* used instead of defining each one separately in the `urls` option.
	* @property {Array<string>} [urls] An array of URL templates.
	* @property {boolean} [wrapX] Whether to wrap the world horizontally. The default, is to
	* request out-of-bounds tiles from the server. When set to `false`, only one
	* world will be rendered. When set to `true`, tiles will be requested for one
	* world only, but they will be wrapped horizontally to render multiple worlds.
	* @property {number} [transition] Duration of the opacity transition for rendering.
	* To disable the opacity transition, pass `transition: 0`.
	* @property {string} [key] Optional tile key for proper cache fetching
	* @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
	* Choose whether to use tiles with a higher or lower zoom level when between integer
	* zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
	*/
	/**
	* @deprecated Use the ol/source/ImageTile.js instead.
	*
	* @fires import("./Tile.js").TileSourceEvent
	* @api
	*/
	var TileImage = class extends UrlTile {
		/**
		* @param {!Options} options Image tile options.
		*/
		constructor(options) {
			super({
				attributions: options.attributions,
				cacheSize: options.cacheSize,
				projection: options.projection,
				state: options.state,
				tileGrid: options.tileGrid,
				tileLoadFunction: options.tileLoadFunction ? options.tileLoadFunction : defaultTileLoadFunction,
				tilePixelRatio: options.tilePixelRatio,
				tileUrlFunction: options.tileUrlFunction,
				url: options.url,
				urls: options.urls,
				wrapX: options.wrapX,
				transition: options.transition,
				interpolate: options.interpolate !== void 0 ? options.interpolate : true,
				key: options.key,
				attributionsCollapsible: options.attributionsCollapsible,
				zDirection: options.zDirection
			});
			/**
			* @protected
			* @type {?string}
			*/
			this.crossOrigin = options.crossOrigin !== void 0 ? options.crossOrigin : null;
			/**
			* @protected
			* @type {ReferrerPolicy}
			*/
			this.referrerPolicy = options.referrerPolicy;
			/**
			* @protected
			* @type {typeof ImageTile}
			*/
			this.tileClass = options.tileClass !== void 0 ? options.tileClass : ImageTile;
			/**
			* @protected
			* @type {!Object<string, import("../tilegrid/TileGrid.js").default>}
			*/
			this.tileGridForProjection = {};
			/**
			* @private
			* @type {number|undefined}
			*/
			this.reprojectionErrorThreshold_ = options.reprojectionErrorThreshold;
			/**
			* @private
			* @type {boolean}
			*/
			this.renderReprojectionEdges_ = false;
		}
		/**
		* @param {import("../proj/Projection.js").default} projection Projection.
		* @return {number} Gutter.
		* @override
		*/
		getGutterForProjection(projection) {
			if (this.getProjection() && projection && !equivalent$1(this.getProjection(), projection)) return 0;
			return this.getGutter();
		}
		/**
		* @return {number} Gutter.
		*/
		getGutter() {
			return 0;
		}
		/**
		* Return the key to be used for all tiles in the source.
		* @return {string} The key for all tiles.
		* @override
		*/
		getKey() {
			let key = super.getKey();
			if (!this.getInterpolate()) key += ":disable-interpolation";
			return key;
		}
		/**
		* @param {import("../proj/Projection.js").default} projection Projection.
		* @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
		* @override
		*/
		getTileGridForProjection(projection) {
			const thisProj = this.getProjection();
			if (this.tileGrid && (!thisProj || equivalent$1(thisProj, projection))) return this.tileGrid;
			const projKey = getUid(projection);
			if (!(projKey in this.tileGridForProjection)) this.tileGridForProjection[projKey] = getForProjection(projection);
			return this.tileGridForProjection[projKey];
		}
		/**
		* @param {number} z Tile coordinate z.
		* @param {number} x Tile coordinate x.
		* @param {number} y Tile coordinate y.
		* @param {number} pixelRatio Pixel ratio.
		* @param {import("../proj/Projection.js").default} projection Projection.
		* @param {string} key The key set on the tile.
		* @return {!ImageTile} Tile.
		* @private
		*/
		createTile_(z, x, y, pixelRatio, projection, key) {
			const tileCoord = [
				z,
				x,
				y
			];
			const urlTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, projection);
			const tileUrl = urlTileCoord ? this.tileUrlFunction(urlTileCoord, pixelRatio, projection) : void 0;
			const tile = new this.tileClass(tileCoord, tileUrl !== void 0 ? TileState_default.IDLE : TileState_default.EMPTY, tileUrl !== void 0 ? tileUrl : "", {
				crossOrigin: this.crossOrigin,
				referrerPolicy: this.referrerPolicy
			}, this.tileLoadFunction, this.tileOptions);
			tile.key = key;
			tile.addEventListener(EventType_default$2.CHANGE, this.handleTileChange.bind(this));
			return tile;
		}
		/**
		* @param {number} z Tile coordinate z.
		* @param {number} x Tile coordinate x.
		* @param {number} y Tile coordinate y.
		* @param {number} pixelRatio Pixel ratio.
		* @param {import("../proj/Projection.js").default} projection Projection.
		* @param {import("../structs/LRUCache.js").default<import("../Tile.js").default>} [tileCache] Tile cache.
		* @return {!(ImageTile|ReprojTile)} Tile.
		* @override
		*/
		getTile(z, x, y, pixelRatio, projection, tileCache) {
			const sourceProjection = this.getProjection();
			if (!sourceProjection || !projection || equivalent$1(sourceProjection, projection)) return this.getTileInternal(z, x, y, pixelRatio, sourceProjection || projection);
			const tileCoord = [
				z,
				x,
				y
			];
			const key = this.getKey();
			const tile = new ReprojTile(sourceProjection, this.getTileGridForProjection(sourceProjection), projection, this.getTileGridForProjection(projection), tileCoord, this.getTileCoordForTileUrlFunction(tileCoord, projection), this.getTilePixelRatio(pixelRatio), this.getGutter(), (z, x, y, pixelRatio) => this.getTileInternal(z, x, y, pixelRatio, sourceProjection, tileCache), this.reprojectionErrorThreshold_, this.renderReprojectionEdges_, this.tileOptions);
			tile.key = key;
			return tile;
		}
		/**
		* @param {number} z Tile coordinate z.
		* @param {number} x Tile coordinate x.
		* @param {number} y Tile coordinate y.
		* @param {number} pixelRatio Pixel ratio.
		* @param {!import("../proj/Projection.js").default} projection Projection.
		* @param {import("../structs/LRUCache.js").default<import("../Tile.js").default>} [tileCache] Tile cache.
		* @return {!ImageTile} Tile.
		* @protected
		*/
		getTileInternal(z, x, y, pixelRatio, projection, tileCache) {
			const key = this.getKey();
			const cacheKey = getCacheKey(this, key, z, x, y);
			if (tileCache && tileCache.containsKey(cacheKey)) return tileCache.get(cacheKey);
			const tile = this.createTile_(z, x, y, pixelRatio, projection, key);
			tileCache?.set(cacheKey, tile);
			return tile;
		}
		/**
		* Sets whether to render reprojection edges or not (usually for debugging).
		* @param {boolean} render Render the edges.
		* @api
		*/
		setRenderReprojectionEdges(render) {
			if (this.renderReprojectionEdges_ == render) return;
			this.renderReprojectionEdges_ = render;
			this.changed();
		}
		/**
		* Sets the tile grid to use when reprojecting the tiles to the given
		* projection instead of the default tile grid for the projection.
		*
		* This can be useful when the default tile grid cannot be created
		* (e.g. projection has no extent defined) or
		* for optimization reasons (custom tile size, resolutions, ...).
		*
		* @param {import("../proj.js").ProjectionLike} projection Projection.
		* @param {import("../tilegrid/TileGrid.js").default} tilegrid Tile grid to use for the projection.
		* @api
		*/
		setTileGridForProjection(projection, tilegrid) {
			const proj = get$1(projection);
			if (proj) {
				const projKey = getUid(proj);
				if (!(projKey in this.tileGridForProjection)) this.tileGridForProjection[projKey] = tilegrid;
			}
		}
	};
	/**
	* @param {ImageTile} imageTile Image tile.
	* @param {string} src Source.
	*/
	function defaultTileLoadFunction(imageTile, src) {
		if (WORKER_OFFSCREEN_CANVAS) {
			const crossOrigin = imageTile.getCrossOrigin();
			/** @type {RequestMode} */
			let mode = "same-origin";
			/** @type {RequestCredentials} */
			let credentials = "same-origin";
			if (crossOrigin === "anonymous" || crossOrigin === "") {
				mode = "cors";
				credentials = "omit";
			} else if (crossOrigin === "use-credentials") {
				mode = "cors";
				credentials = "include";
			}
			const options = {
				mode,
				credentials,
				referrerPolicy: imageTile.getReferrerPolicy()
			};
			fetch(src, options).then((response) => {
				if (!response.ok) throw new Error(`HTTP ${response.status}`);
				return response.blob();
			}).then((blob) => {
				return createImageBitmap(blob);
			}).then((imageBitmap) => {
				const canvas = imageTile.getImage();
				canvas.width = imageBitmap.width;
				canvas.height = imageBitmap.height;
				canvas.getContext("2d").drawImage(imageBitmap, 0, 0);
				imageBitmap.close?.();
				canvas.dispatchEvent(new Event("load"));
			}).catch(() => {
				imageTile.getImage().dispatchEvent(new Event("error"));
			});
			return;
		}
		/** @type {HTMLImageElement|HTMLVideoElement} */ imageTile.getImage().src = src;
	}
	//#endregion
	//#region src/ol/source/XYZ.js
	/**
	* @module ol/source/XYZ
	*/
	/**
	* @typedef {Object} Options
	* @property {import("./Source.js").AttributionLike} [attributions] Attributions.
	* @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
	* @property {number} [cacheSize] Deprecated.  Use the cacheSize option on the layer instead.
	* @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
	* you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
	* See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
	* @property {ReferrerPolicy} [referrerPolicy] The `referrerPolicy` property for loaded images.
	* @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
	* linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
	* @property {import("../proj.js").ProjectionLike} [projection='EPSG:3857'] Projection.
	* @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
	* Higher values can increase reprojection performance, but decrease precision.
	* @property {number} [maxZoom=42] Optional max zoom level. Not used if `tileGrid` is provided.
	* @property {number} [minZoom=0] Optional min zoom level. Not used if `tileGrid` is provided.
	* @property {number} [maxResolution] Optional tile grid resolution at level zero. Not used if `tileGrid` is provided.
	* @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
	* @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Deprecated.  Use an ImageTile source with a loader
	* instead.  Optional function to load a tile given a URL. The default is
	* ```js
	* function(imageTile, src) {
	*   imageTile.getImage().src = src;
	* };
	* ```
	* @property {number} [tilePixelRatio=1] The pixel ratio used by the tile service.
	* For example, if the tile service advertizes 256px by 256px tiles but actually sends 512px
	* by 512px images (for retina/hidpi devices) then `tilePixelRatio`
	* should be set to `2`.
	* @property {number|import("../size.js").Size} [tileSize=[256, 256]] The tile size used by the tile service.
	* Not used if `tileGrid` is provided.
	* @property {number} [gutter=0] The size in pixels of the gutter around image tiles to ignore.
	* This allows artifacts of rendering at tile edges to be ignored.
	* Supported images should be wider and taller than the tile size by a value of `2 x gutter`.
	* @property {import("../Tile.js").UrlFunction} [tileUrlFunction] Deprecated.  Use an ImageTile source and provide a function
	* for the url option instead.
	* @property {string} [url] URL template. Must include `{x}`, `{y}` or `{-y}`,
	* and `{z}` placeholders. A `{?-?}` template pattern, for example `subdomain{a-f}.domain.com`,
	* may be used instead of defining each one separately in the `urls` option.
	* @property {Array<string>} [urls] Deprecated.  Use an ImageTile source and provide an array of URLs for the
	* url option instead.
	* @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
	* @property {number} [transition=250] Duration of the opacity transition for rendering.
	* To disable the opacity transition, pass `transition: 0`.
	* @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
	* Choose whether to use tiles with a higher or lower zoom level when between integer
	* zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
	*/
	/**
	* @classdesc
	* Layer source for tile data with URLs in a set XYZ format that are
	* defined in a URL template. By default, this follows the widely-used
	* Google grid where `x` 0 and `y` 0 are in the top left. Grids like
	* TMS where `x` 0 and `y` 0 are in the bottom left can be used by
	* using the `{-y}` placeholder in the URL template, so long as the
	* source does not have a custom tile grid. In this case
	* a `tileUrlFunction` can be used, such as:
	* ```js
	*  tileUrlFunction: function(coordinate) {
	*    return 'http://mapserver.com/' + coordinate[0] + '/' +
	*      coordinate[1] + '/' + (-coordinate[2] - 1) + '.png';
	*  }
	* ```
	* @api
	*/
	var XYZ = class extends TileImage {
		/**
		* @param {Options} [options] XYZ options.
		*/
		constructor(options) {
			options = options || {};
			const projection = options.projection !== void 0 ? options.projection : "EPSG:3857";
			const tileGrid = options.tileGrid !== void 0 ? options.tileGrid : createXYZ({
				extent: extentFromProjection(projection),
				maxResolution: options.maxResolution,
				maxZoom: options.maxZoom,
				minZoom: options.minZoom,
				tileSize: options.tileSize
			});
			super({
				attributions: options.attributions,
				cacheSize: options.cacheSize,
				crossOrigin: options.crossOrigin,
				referrerPolicy: options.referrerPolicy,
				interpolate: options.interpolate,
				projection,
				reprojectionErrorThreshold: options.reprojectionErrorThreshold,
				tileGrid,
				tileLoadFunction: options.tileLoadFunction,
				tilePixelRatio: options.tilePixelRatio,
				tileUrlFunction: options.tileUrlFunction,
				url: options.url,
				urls: options.urls,
				wrapX: options.wrapX !== void 0 ? options.wrapX : true,
				transition: options.transition,
				attributionsCollapsible: options.attributionsCollapsible,
				zDirection: options.zDirection
			});
			/**
			* @private
			* @type {number}
			*/
			this.gutter_ = options.gutter !== void 0 ? options.gutter : 0;
		}
		/**
		* @return {number} Gutter.
		* @override
		*/
		getGutter() {
			return this.gutter_;
		}
	};
	//#endregion
	//#region src/ol/source/OSM.js
	/**
	* @module ol/source/OSM
	*/
	/**
	* The attribution containing a link to the OpenStreetMap Copyright and License
	* page.
	* @const
	* @type {string}
	* @api
	*/
	const ATTRIBUTION = "&#169; <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">OpenStreetMap</a> contributors.";
	/**
	* @typedef {Object} Options
	* @property {import("./Source.js").AttributionLike} [attributions] Attributions.
	* @property {number} [cacheSize] Deprecated.  Use the cacheSize option on the layer instead.
	* @property {null|string} [crossOrigin='anonymous'] The `crossOrigin` attribute for loaded images.  Note that
	* you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
	* See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
	* @property {ReferrerPolicy} [referrerPolicy='origin-when-cross-origin'] The `referrerPolicy` property for loaded images.
	* @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
	* linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
	* @property {number} [maxZoom=19] Max zoom.
	* @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
	* Higher values can increase reprojection performance, but decrease precision.
	* @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
	* ```js
	* function(imageTile, src) {
	*   imageTile.getImage().src = src;
	* };
	* ```
	* @property {number} [transition=250] Duration of the opacity transition for rendering.
	* To disable the opacity transition, pass `transition: 0`.
	* @property {string} [url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'] URL template.
	* Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
	* @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
	* @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
	* Choose whether to use tiles with a higher or lower zoom level when between integer
	* zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
	*/
	/**
	* @classdesc
	* Layer source for the OpenStreetMap tile server.
	* @api
	*/
	var OSM = class extends XYZ {
		/**
		* @param {Options} [options] Open Street Map options.
		*/
		constructor(options) {
			options = options || {};
			let attributions;
			if (options.attributions !== void 0) attributions = options.attributions;
			else attributions = [ATTRIBUTION];
			const url = options.url !== void 0 ? options.url : "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
			super({
				attributions,
				attributionsCollapsible: false,
				cacheSize: options.cacheSize,
				crossOrigin: options.crossOrigin !== void 0 ? options.crossOrigin : "anonymous",
				referrerPolicy: options.referrerPolicy || "origin-when-cross-origin",
				interpolate: options.interpolate,
				maxZoom: options.maxZoom !== void 0 ? options.maxZoom : 19,
				reprojectionErrorThreshold: options.reprojectionErrorThreshold,
				tileLoadFunction: options.tileLoadFunction,
				transition: options.transition,
				url,
				wrapX: options.wrapX,
				zDirection: options.zDirection
			});
		}
	};
	//#endregion
	//#region examples/tiled-layer-rendering-in-offscreen-canvas.worker.js
	const worker = self;
	const tileGrid = createXYZ({ tileSize: [512, 512] });
	const canvas = new OffscreenCanvas(512, 512);
	const map = new Map$1({
		target: canvas,
		layers: [new TileLayer({ source: new OSM({ transition: 0 }) })]
	});
	worker.addEventListener("message", async ({ data: { action, tile } }) => {
		if (action !== "render") return;
		const view = new View({
			center: tileGrid.getTileCoordCenter(tile),
			resolution: tileGrid.getResolution(tile[0])
		});
		map.setView(view);
		map.once("rendercomplete", () => {
			const imageData = canvas.transferToImageBitmap();
			worker.postMessage({
				action: "rendered",
				imageData
			}, [imageData]);
		});
	});
	//#endregion
})();

//# sourceMappingURL=tiled-layer-rendering-in-offscreen-canvas.worker-CWCdeLvt.js.map