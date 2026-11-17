import{a as Fi,b as Ps}from"./chunk-SQE76S5B.js";var Uv=Fi(Ht=>{"use strict";var tp=Symbol.for("react.transitional.element"),F1=Symbol.for("react.portal"),H1=Symbol.for("react.fragment"),V1=Symbol.for("react.strict_mode"),G1=Symbol.for("react.profiler"),k1=Symbol.for("react.consumer"),X1=Symbol.for("react.context"),W1=Symbol.for("react.forward_ref"),q1=Symbol.for("react.suspense"),Y1=Symbol.for("react.memo"),bv=Symbol.for("react.lazy"),Z1=Symbol.for("react.activity"),J1=Symbol.for("react.view_transition"),yv=Symbol.iterator;function K1(e){return e===null||typeof e!="object"?null:(e=yv&&e[yv]||e["@@iterator"],typeof e=="function"?e:null)}var Ev={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Tv=Object.assign,Av={};function Cr(e,t,n){this.props=e,this.context=t,this.refs=Av,this.updater=n||Ev}Cr.prototype.isReactComponent={};Cr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Cr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function wv(){}wv.prototype=Cr.prototype;function ep(e,t,n){this.props=e,this.context=t,this.refs=Av,this.updater=n||Ev}var np=ep.prototype=new wv;np.constructor=ep;Tv(np,Cr.prototype);np.isPureReactComponent=!0;var xv=Array.isArray;function $d(){}var Te={H:null,A:null,T:null,S:null},Cv=Object.prototype.hasOwnProperty;function ip(e,t,n){var i=n.ref;return{$$typeof:tp,type:e,key:t,ref:i!==void 0?i:null,props:n}}function Q1(e,t){return ip(e.type,t,e.props)}function ap(e){return typeof e=="object"&&e!==null&&e.$$typeof===tp}function j1(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Sv=/\/+/g;function jd(e,t){return typeof e=="object"&&e!==null&&e.key!=null?j1(""+e.key):t.toString(36)}function $1(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then($d,$d):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function wr(e,t,n,i,a){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var r=!1;if(e===null)r=!0;else switch(s){case"bigint":case"string":case"number":r=!0;break;case"object":switch(e.$$typeof){case tp:case F1:r=!0;break;case bv:return r=e._init,wr(r(e._payload),t,n,i,a)}}if(r)return a=a(e),r=i===""?"."+jd(e,0):i,xv(a)?(n="",r!=null&&(n=r.replace(Sv,"$&/")+"/"),wr(a,t,n,"",function(c){return c})):a!=null&&(ap(a)&&(a=Q1(a,n+(a.key==null||e&&e.key===a.key?"":(""+a.key).replace(Sv,"$&/")+"/")+r)),t.push(a)),1;r=0;var o=i===""?".":i+":";if(xv(e))for(var l=0;l<e.length;l++)i=e[l],s=o+jd(i,l),r+=wr(i,t,n,s,a);else if(l=K1(e),typeof l=="function")for(e=l.call(e),l=0;!(i=e.next()).done;)i=i.value,s=o+jd(i,l++),r+=wr(i,t,n,s,a);else if(s==="object"){if(typeof e.then=="function")return wr($1(e),t,n,i,a);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return r}function au(e,t,n){if(e==null)return e;var i=[],a=0;return wr(e,i,"","",function(s){return t.call(n,s,a++)}),i}function tE(e){if(e._status===-1){var t=e._result,n=t();n.then(function(i){(e._status===0||e._status===-1)&&(e._status=1,e._result=i,n.status===void 0&&(n.status="fulfilled",n.value=i))},function(i){(e._status===0||e._status===-1)&&(e._status=2,e._result=i,n.status===void 0&&(n.status="rejected",n.reason=i))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var Mv=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function Rv(e){var t=Te.T,n={};n.types=t!==null?t.types:null,Te.T=n;try{var i=e(),a=Te.S;a!==null&&a(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then($d,Mv)}catch(s){Mv(s)}finally{t!==null&&n.types!==null&&(t.types=n.types),Te.T=t}}function Dv(e){var t=Te.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else Rv(Dv.bind(null,e))}var eE={map:au,forEach:function(e,t,n){au(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return au(e,function(){t++}),t},toArray:function(e){return au(e,function(t){return t})||[]},only:function(e){if(!ap(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Ht.Activity=Z1;Ht.Children=eE;Ht.Component=Cr;Ht.Fragment=H1;Ht.Profiler=G1;Ht.PureComponent=ep;Ht.StrictMode=V1;Ht.Suspense=q1;Ht.ViewTransition=J1;Ht.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Te;Ht.__COMPILER_RUNTIME={__proto__:null,c:function(e){return Te.H.useMemoCache(e)}};Ht.addTransitionType=Dv;Ht.cache=function(e){return function(){return e.apply(null,arguments)}};Ht.cacheSignal=function(){return null};Ht.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var i=Tv({},e.props),a=e.key;if(t!=null)for(s in t.key!==void 0&&(a=""+t.key),t)!Cv.call(t,s)||s==="key"||s==="__self"||s==="__source"||s==="ref"&&t.ref===void 0||(i[s]=t[s]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var r=Array(s),o=0;o<s;o++)r[o]=arguments[o+2];i.children=r}return ip(e.type,a,i)};Ht.createContext=function(e){return e={$$typeof:X1,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:k1,_context:e},e};Ht.createElement=function(e,t,n){var i,a={},s=null;if(t!=null)for(i in t.key!==void 0&&(s=""+t.key),t)Cv.call(t,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(a[i]=t[i]);var r=arguments.length-2;if(r===1)a.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];a.children=o}if(e&&e.defaultProps)for(i in r=e.defaultProps,r)a[i]===void 0&&(a[i]=r[i]);return ip(e,s,a)};Ht.createRef=function(){return{current:null}};Ht.forwardRef=function(e){return{$$typeof:W1,render:e}};Ht.isValidElement=ap;Ht.lazy=function(e){return{$$typeof:bv,_payload:{_status:-1,_result:e},_init:tE}};Ht.memo=function(e,t){return{$$typeof:Y1,type:e,compare:t===void 0?null:t}};Ht.startTransition=Rv;Ht.unstable_useCacheRefresh=function(){return Te.H.useCacheRefresh()};Ht.use=function(e){return Te.H.use(e)};Ht.useActionState=function(e,t,n){return Te.H.useActionState(e,t,n)};Ht.useCallback=function(e,t){return Te.H.useCallback(e,t)};Ht.useContext=function(e){return Te.H.useContext(e)};Ht.useDebugValue=function(){};Ht.useDeferredValue=function(e,t){return Te.H.useDeferredValue(e,t)};Ht.useEffect=function(e,t){return Te.H.useEffect(e,t)};Ht.useEffectEvent=function(e){return Te.H.useEffectEvent(e)};Ht.useId=function(){return Te.H.useId()};Ht.useImperativeHandle=function(e,t,n){return Te.H.useImperativeHandle(e,t,n)};Ht.useInsertionEffect=function(e,t){return Te.H.useInsertionEffect(e,t)};Ht.useLayoutEffect=function(e,t){return Te.H.useLayoutEffect(e,t)};Ht.useMemo=function(e,t){return Te.H.useMemo(e,t)};Ht.useOptimistic=function(e,t){return Te.H.useOptimistic(e,t)};Ht.useReducer=function(e,t,n){return Te.H.useReducer(e,t,n)};Ht.useRef=function(e){return Te.H.useRef(e)};Ht.useState=function(e){return Te.H.useState(e)};Ht.useSyncExternalStore=function(e,t,n){return Te.H.useSyncExternalStore(e,t,n)};Ht.useTransition=function(){return Te.H.useTransition()};Ht.version="19.3.1"});var sl=Fi((XD,Nv)=>{"use strict";Nv.exports=Uv()});var Gv=Fi(Ue=>{"use strict";function lp(e,t){var n=e.length;e.push(t);t:for(;0<n;){var i=n-1>>>1,a=e[i];if(0<su(a,t))e[i]=t,e[n]=a,n=i;else break t}}function Hi(e){return e.length===0?null:e[0]}function ou(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;t:for(var i=0,a=e.length,s=a>>>1;i<s;){var r=2*(i+1)-1,o=e[r],l=r+1,c=e[l];if(0>su(o,n))l<a&&0>su(c,o)?(e[i]=c,e[l]=n,i=l):(e[i]=o,e[r]=n,i=r);else if(l<a&&0>su(c,n))e[i]=c,e[l]=n,i=l;else break t}}return t}function su(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}Ue.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(Lv=performance,Ue.unstable_now=function(){return Lv.now()}):(sp=Date,Ov=sp.now(),Ue.unstable_now=function(){return sp.now()-Ov});var Lv,sp,Ov,ca=[],Ba=[],nE=1,li=null,pn=3,cp=!1,rl=!1,ol=!1,up=!1,Bv=typeof setTimeout=="function"?setTimeout:null,zv=typeof clearTimeout=="function"?clearTimeout:null,Iv=typeof setImmediate<"u"?setImmediate:null;function ru(e){for(var t=Hi(Ba);t!==null;){if(t.callback===null)ou(Ba);else if(t.startTime<=e)ou(Ba),t.sortIndex=t.expirationTime,lp(ca,t);else break;t=Hi(Ba)}}function hp(e){if(ol=!1,ru(e),!rl)if(Hi(ca)!==null)rl=!0,Dr||(Dr=!0,Rr());else{var t=Hi(Ba);t!==null&&fp(hp,t.startTime-e)}}var Dr=!1,ll=-1,Fv=5,Hv=-1;function Vv(){return up?!0:!(Ue.unstable_now()-Hv<Fv)}function rp(){if(up=!1,Dr){var e=Ue.unstable_now();Hv=e;var t=!0;try{t:{rl=!1,ol&&(ol=!1,zv(ll),ll=-1),cp=!0;var n=pn;try{e:{for(ru(e),li=Hi(ca);li!==null&&!(li.expirationTime>e&&Vv());){var i=li.callback;if(typeof i=="function"){li.callback=null,pn=li.priorityLevel;var a=i(li.expirationTime<=e);if(e=Ue.unstable_now(),typeof a=="function"){li.callback=a,ru(e),t=!0;break e}li===Hi(ca)&&ou(ca),ru(e)}else ou(ca);li=Hi(ca)}if(li!==null)t=!0;else{var s=Hi(Ba);s!==null&&fp(hp,s.startTime-e),t=!1}}break t}finally{li=null,pn=n,cp=!1}t=void 0}}finally{t?Rr():Dr=!1}}}var Rr;typeof Iv=="function"?Rr=function(){Iv(rp)}:typeof MessageChannel<"u"?(op=new MessageChannel,Pv=op.port2,op.port1.onmessage=rp,Rr=function(){Pv.postMessage(null)}):Rr=function(){Bv(rp,0)};var op,Pv;function fp(e,t){ll=Bv(function(){e(Ue.unstable_now())},t)}Ue.unstable_IdlePriority=5;Ue.unstable_ImmediatePriority=1;Ue.unstable_LowPriority=4;Ue.unstable_NormalPriority=3;Ue.unstable_Profiling=null;Ue.unstable_UserBlockingPriority=2;Ue.unstable_cancelCallback=function(e){e.callback=null};Ue.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Fv=0<e?Math.floor(1e3/e):5};Ue.unstable_getCurrentPriorityLevel=function(){return pn};Ue.unstable_next=function(e){switch(pn){case 1:case 2:case 3:var t=3;break;default:t=pn}var n=pn;pn=t;try{return e()}finally{pn=n}};Ue.unstable_requestPaint=function(){up=!0};Ue.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=pn;pn=e;try{return t()}finally{pn=n}};Ue.unstable_scheduleCallback=function(e,t,n){var i=Ue.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?i+n:i):n=i,e){case 1:var a=-1;break;case 2:a=250;break;case 5:a=1073741823;break;case 4:a=1e4;break;default:a=5e3}return a=n+a,e={id:nE++,callback:t,priorityLevel:e,startTime:n,expirationTime:a,sortIndex:-1},n>i?(e.sortIndex=n,lp(Ba,e),Hi(ca)===null&&e===Hi(Ba)&&(ol?(zv(ll),ll=-1):ol=!0,fp(hp,n-i))):(e.sortIndex=a,lp(ca,e),rl||cp||(rl=!0,Dr||(Dr=!0,Rr()))),e};Ue.unstable_shouldYield=Vv;Ue.unstable_wrapCallback=function(e){var t=pn;return function(){var n=pn;pn=t;try{return e.apply(this,arguments)}finally{pn=n}}}});var Xv=Fi((qD,kv)=>{"use strict";kv.exports=Gv()});var Yv=Fi(mn=>{"use strict";var iE=sl();function qv(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function za(){}var Mn={d:{f:za,r:function(){throw Error(qv(522))},D:za,C:za,L:za,m:za,X:za,S:za,M:za},p:0,findDOMNode:null},aE=Symbol.for("react.portal"),sE=Symbol.for("react.recoverable"),Wv=Symbol.for("react.optimistic_key");function rE(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:aE,key:i==null?null:i===Wv?Wv:""+i,children:e,containerInfo:t,implementation:n}}var cl=iE.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function lu(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}mn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Mn;mn.browser=function(e){return{$$typeof:sE,_reason:e}};mn.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(qv(299));return rE(e,t,null,n)};mn.flushSync=function(e){var t=cl.T,n=Mn.p;try{if(cl.T=null,Mn.p=2,e)return e()}finally{cl.T=t,Mn.p=n,Mn.d.f()}};mn.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,Mn.d.C(e,t))};mn.prefetchDNS=function(e){typeof e=="string"&&Mn.d.D(e)};mn.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,i=lu(n,t.crossOrigin),a=typeof t.integrity=="string"?t.integrity:void 0,s=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?Mn.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:i,integrity:a,fetchPriority:s}):n==="script"&&Mn.d.X(e,{crossOrigin:i,integrity:a,fetchPriority:s,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};mn.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=lu(t.as,t.crossOrigin);Mn.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0})}}else t==null&&Mn.d.M(e)};mn.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,i=lu(n,t.crossOrigin);Mn.d.L(e,n,{crossOrigin:i,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};mn.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=lu(t.as,t.crossOrigin);Mn.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0})}else Mn.d.m(e)};mn.requestFormReset=function(e){Mn.d.r(e)};mn.unstable_batchedUpdates=function(e,t){return e(t)};mn.useFormState=function(e,t,n){return cl.H.useFormState(e,t,n)};mn.useFormStatus=function(){return cl.H.useHostTransitionStatus()};mn.version="19.3.1"});var Kv=Fi((ZD,Jv)=>{"use strict";function Zv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Zv)}catch(e){console.error(e)}}Zv(),Jv.exports=Yv()});var PM=Fi(kh=>{"use strict";var Ze=Xv(),Iy=sl(),oE=Kv();function J(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Py(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Kl(e){for(var t=e,n=t;n&&!n.alternate;)t=n,(t.flags&4098)!==0&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function By(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function zy(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Qv(e){if(Kl(e)!==e)throw Error(J(188))}function lE(e){var t=e.alternate;if(!t){if(t=Kl(e),t===null)throw Error(J(188));return t!==e?null:e}for(var n=e,i=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(i=a.return,i!==null){n=i;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return Qv(a),e;if(s===i)return Qv(a),t;s=s.sibling}throw Error(J(188))}if(n.return!==i.return)n=a,i=s;else{for(var r=!1,o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r){for(o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r)throw Error(J(189))}}if(n.alternate!==i)throw Error(J(190))}if(n.tag!==3)throw Error(J(188));return n.stateNode.current===n?e:t}function Fy(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=Fy(e),t!==null)return t;e=e.sibling}return null}function On(e,t,n,i,a,s){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,i,a,s)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&On(e.child,t,n,i,a,s))return!0;e=e.sibling}return!1}function ir(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function jv(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),!(e.tag===3||e.tag===5||e.tag===27));)e=e.return;return t}function Hy(e){var t=[null,null],n=ir(e);return n===null||Vy(t,e,n.child,{foundSelf:!1}),t}function Vy(e,t,n,i){for(;n!==null;){if(n===t)i.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(i.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&Vy(e,t,n.child,i))return!0;n=n.sibling}return!1}function Ye(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(J(559))}}var Br=null,Xp=null;function cE(e,t,n){return e===n?!0:e===t?(Br=e,!0):!1}function uE(e,t,n){return e===n?(Xp=e,!1):e===t?(Xp!==null&&(Br=e),!0):!1}function $v(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function Wp(e,t,n){for(var i=0,a=e;a;a=n(a))i++;a=0;for(var s=t;s;s=n(s))a++;for(;0<i-a;)e=n(e),i--;for(;0<a-i;)t=n(t),a--;for(;i--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var Ee=Object.assign,hE=Symbol.for("react.element"),cu=Symbol.for("react.transitional.element"),gl=Symbol.for("react.portal"),zr=Symbol.for("react.fragment"),Gy=Symbol.for("react.strict_mode"),qp=Symbol.for("react.profiler"),ky=Symbol.for("react.consumer"),qi=Symbol.for("react.context"),eg=Symbol.for("react.forward_ref"),Yp=Symbol.for("react.suspense"),Zp=Symbol.for("react.suspense_list"),ng=Symbol.for("react.memo"),Ga=Symbol.for("react.lazy"),Jp=Symbol.for("react.activity"),fE=Symbol.for("react.legacy_hidden"),dE=Symbol.for("react.memo_cache_sentinel"),Kp=Symbol.for("react.view_transition"),pE=Symbol.for("react.recoverable"),t_=Symbol.iterator;function ul(e){return e===null||typeof e!="object"?null:(e=t_&&e[t_]||e["@@iterator"],typeof e=="function"?e:null)}var mE=Symbol.for("react.client.reference");function Qp(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===mE?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case zr:return"Fragment";case qp:return"Profiler";case Gy:return"StrictMode";case Yp:return"Suspense";case Zp:return"SuspenseList";case Jp:return"Activity";case Kp:return"ViewTransition"}if(typeof e=="object")switch(e.$$typeof){case gl:return"Portal";case qi:return e.displayName||"Context";case ky:return(e._context.displayName||"Context")+".Consumer";case eg:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ng:return t=e.displayName||null,t!==null?t:Qp(e.type)||"Memo";case Ga:t=e._payload,e=e._init;try{return Qp(e(t))}catch{}}return null}var vl=Array.isArray,It=Iy.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,fe=oE.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Xs={pending:!1,data:null,method:null,action:null},jp=[],Fr=-1;function $i(e){return{current:e}}function cn(e){0>Fr||(e.current=jp[Fr],jp[Fr]=null,Fr--)}function Ce(e,t){Fr++,jp[Fr]=e.current,e.current=t}var Ki=$i(null),Ol=$i(null),Qa=$i(null),Ju=$i(null);function Ku(e,t){switch(Ce(Qa,t),Ce(Ol,e),Ce(Ki,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?py(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=py(t),e=hM(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}cn(Ki),Ce(Ki,e)}function so(){cn(Ki),cn(Ol),cn(Qa)}function $p(e){var t=e.memoizedState;t!==null&&(go._currentValue=t.memoizedState,Ce(Ju,e)),t=Ki.current;var n=hM(t,e.type);t!==n&&(Ce(Ol,e),Ce(Ki,n))}function Qu(e){Ol.current===e&&(cn(Ki),cn(Ol)),Ju.current===e&&(cn(Ju),go._currentValue=Xs)}var dp,e_;function Ha(e){if(dp===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);dp=t&&t[1]||"",e_=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+dp+e+e_}var pp=!1;function mp(e,t){if(!e||pp)return"";pp=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var d=function(){throw Error()};if(Object.defineProperty(d.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(d,[])}catch(g){var f=g}Reflect.construct(e,[],d)}else{try{d.call()}catch(g){f=g}d=!1;try{var p=Object.getOwnPropertyDescriptor(e.prototype,"props");Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),d=!0,new e}finally{d&&(p!==void 0?Object.defineProperty(e.prototype,"props",p):delete e.prototype.props)}}}else{try{throw Error()}catch(g){f=g}(d=e())&&typeof d.catch=="function"&&d.catch(function(){})}}catch(g){if(g&&f&&typeof g.stack=="string")return[g.stack,f.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=i.DetermineComponentFrameRoot(),r=s[0],o=s[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(a=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;if(i===l.length||a===c.length)for(i=l.length-1,a=c.length-1;1<=i&&0<=a&&l[i]!==c[a];)a--;for(;1<=i&&0<=a;i--,a--)if(l[i]!==c[a]){if(i!==1||a!==1)do if(i--,a--,0>a||l[i]!==c[a]){var u=`
`+l[i].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=i&&0<=a);break}}}finally{pp=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?Ha(n):""}function gE(e,t){switch(e.tag){case 26:case 27:case 5:return Ha(e.type);case 16:return Ha("Lazy");case 13:return e.child!==t&&t!==null?Ha("Suspense Fallback"):Ha("Suspense");case 19:return Ha("SuspenseList");case 0:case 15:return mp(e.type,!1);case 11:return mp(e.type.render,!1);case 1:return mp(e.type,!0);case 31:return Ha("Activity");case 30:return Ha("ViewTransition");default:return""}}function n_(e){try{var t="",n=null;do t+=gE(e,n),n=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var tm=Object.prototype.hasOwnProperty,ig=Ze.unstable_scheduleCallback,gp=Ze.unstable_cancelCallback,vE=Ze.unstable_shouldYield,_E=Ze.unstable_requestPaint,Wn=Ze.unstable_now,yE=Ze.unstable_getCurrentPriorityLevel,Xy=Ze.unstable_ImmediatePriority,Wy=Ze.unstable_UserBlockingPriority,ju=Ze.unstable_NormalPriority,xE=Ze.unstable_LowPriority,qy=Ze.unstable_IdlePriority,SE=Ze.log,ME=Ze.unstable_setDisableYieldValue,Ql=null,qn=null;function Wa(e){if(typeof SE=="function"&&ME(e),qn&&typeof qn.setStrictMode=="function")try{qn.setStrictMode(Ql,e)}catch{}}var Yn=Math.clz32?Math.clz32:TE,bE=Math.log,EE=Math.LN2;function TE(e){return e>>>=0,e===0?32:31-(bE(e)/EE|0)|0}var uu=256,hu=262144,fu=4194304;function Fs(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Eh(e,t,n){var i=e.pendingLanes;if(i===0)return 0;var a=0,s=e.suspendedLanes,r=e.pingedLanes;e=e.warmLanes;var o=i&134217727;return o!==0?(i=o&~s,i!==0?a=Fs(i):(r&=o,r!==0?a=Fs(r):n||(n=o&~e,n!==0&&(a=Fs(n))))):(o=i&~s,o!==0?a=Fs(o):r!==0?a=Fs(r):n||(n=i&~e,n!==0&&(a=Fs(n)))),a===0?0:t!==0&&t!==a&&(t&s)===0&&(s=a&-a,n=t&-t,s>=n||s===32&&(n&4194048)!==0)?t:a}function jl(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Yy(e,t){(t&8)!==0&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var i=31-Yn(n),a=1<<i;t|=e[i],n&=~a}return t}function AE(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Zy(){var e=fu;return fu<<=1,(fu&62914560)===0&&(fu=4194304),e}function vp(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function $l(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function wE(e,t,n,i,a,s){var r=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,l=e.expirationTimes,c=e.hiddenUpdates;for(n=r&~n;0<n;){var u=31-Yn(n),d=1<<u;o[u]=0,l[u]=-1;var f=c[u];if(f!==null)for(c[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}i!==0&&Jy(e,i,0),s!==0&&a===0&&e.tag!==0&&(e.suspendedLanes|=s&~(r&~t))}function Jy(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-Yn(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|n&261930}function Ky(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-Yn(n),a=1<<i;a&t|e[i]&t&&(e[i]|=t),n&=~a}}function Qy(e,t){var n=t&-t;return n=(n&42)!==0?1:ag(n),(n&(e.suspendedLanes|t))!==0?0:n}function ag(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function sg(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function jy(){var e=fe.p;return e!==0?e:(e=window.event,e===void 0?32:LM(e.type))}function i_(e,t){var n=fe.p;try{return fe.p=e,t()}finally{fe.p=n}}var Ma=Math.random().toString(36).slice(2),on="__reactFiber$"+Ma,In="__reactProps$"+Ma,yo="__reactContainer$"+Ma,a_="__reactEvents$"+Ma,CE="__reactListeners$"+Ma,RE="__reactHandles$"+Ma,s_="__reactResources$"+Ma,tc="__reactMarker$"+Ma,$u="__reactLoad$"+Ma;function Th(e){delete e[on],delete e[In],delete e[CE],delete e[RE]}function Gs(e){var t;if(t=e[on])return t;for(var n=e.parentNode;n;){if(t=n[yo]||n[on]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=My(e);e!==null;){if(n=e[on])return n;e=My(e)}return t}e=n,n=e.parentNode}return null}function xo(e){if(e=e[on]||e[yo]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function _l(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(J(33))}function Jr(e){var t=e[s_];return t||(t=e[s_]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function tn(e){e[tc]=!0}function $y(e){e[$u]=void 0}var tx=new Set,ex={};function ar(e,t){ro(e,t),ro(e+"Capture",t)}function ro(e,t){for(ex[e]=t,e=0;e<t.length;e++)tx.add(t[e])}var DE=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),r_={},o_={};function UE(e){return tm.call(o_,e)?!0:tm.call(r_,e)?!1:DE.test(e)?o_[e]=!0:(r_[e]=!0,!1)}var le=!1;function l_(){var e=le;return le=!1,e}function Du(e,t,n){if(UE(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,n)}}function du(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,n)}}function ua(e,t,n,i){if(i===null)e.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,i)}}function Vn(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function nx(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function NE(e,t,n){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var a=i.get,s=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(r){n=""+r,s.call(this,r)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function em(e){if(!e._valueTracker){var t=nx(e)?"checked":"value";e._valueTracker=NE(e,t,""+e[t])}}function ix(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=nx(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}var LE=/[\n"\\]/g;function di(e){return e.replace(LE,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function nm(e,t,n,i,a,s,r,o){e.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.type=r:e.removeAttribute("type"),t!=null?r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Vn(t)):e.value!==""+Vn(t)&&(e.value=""+Vn(t)):r!=="submit"&&r!=="reset"||e.removeAttribute("value"),t!=null?r==="number"&&e.value==t?_p(e,Vn(e.value)):_p(e,Vn(t)):n!=null?_p(e,Vn(n)):i!=null&&e.removeAttribute("value"),a==null&&s!=null&&(e.defaultChecked=!!s),a!=null&&(e.checked=a&&typeof a!="function"&&typeof a!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+Vn(o):e.removeAttribute("name")}function ax(e,t,n,i,a,s,r,o){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(e.type=s),t!=null||n!=null){if(!(s!=="submit"&&s!=="reset"||t!=null)){em(e);return}n=n!=null?""+Vn(n):"",t=t!=null?""+Vn(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}i=i??a,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=o?e.checked:!!i,e.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.name=r),em(e)}function _p(e,t){e.defaultValue!==""+t&&(e.defaultValue=""+t)}function Kr(e,t,n,i){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&i&&(e[n].defaultSelected=!0)}else{for(n=""+Vn(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,i&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function sx(e,t,n){if(t!=null&&(t=""+Vn(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+Vn(n):""}function rx(e,t,n,i){if(t==null){if(i!=null){if(n!=null)throw Error(J(92));if(vl(i)){if(1<i.length)throw Error(J(93));i=i[0]}n=i}n==null&&(n=""),t=n}n=Vn(t),e.defaultValue=n,i=e.textContent,i===n&&i!==""&&i!==null&&(e.value=i),em(e)}function oo(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var OE=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function c_(e,t,n){var i=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,n):typeof n!="number"||n===0||OE.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function ox(e,t,n){if(t!=null&&typeof t!="object")throw Error(J(62));if(e=e.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="",le=!0);for(var a in t)i=t[a],t.hasOwnProperty(a)&&n[a]!==i&&(c_(e,a,i),le=!0)}else for(var s in t)t.hasOwnProperty(s)&&c_(e,s,t[s])}function rg(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var IE=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),PE=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Uu(e){return PE.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Yi(){}var im=null;function og(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Hr=null,Qr=null;function u_(e){var t=xo(e);if(t&&(e=t.stateNode)){var n=e[In]||null;t:switch(e=t.stateNode,t.type){case"input":if(nm(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+di(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var a=i[In]||null;if(!a)throw Error(J(90));nm(i,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)i=n[t],i.form===e.form&&ix(i)}break t;case"textarea":sx(e,n.value,n.defaultValue);break t;case"select":t=n.value,t!=null&&Kr(e,!!n.multiple,t,!1)}}}var yp=!1;function lx(e,t,n){if(yp)return e(t,n);yp=!0;try{var i=e(t);return i}finally{if(yp=!1,(Hr!==null||Qr!==null)&&(Fh(),Hr&&(t=Hr,e=Qr,Qr=Hr=null,u_(t),e)))for(t=0;t<e.length;t++)u_(e[t])}}function Il(e,t){var n=e.stateNode;if(n===null)return null;var i=n[In]||null;if(i===null)return null;n=i[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break t;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(J(231,t,typeof n));return n}var ga=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),am=!1;if(ga)try{Ur={},Object.defineProperty(Ur,"passive",{get:function(){am=!0}}),window.addEventListener("test",Ur,Ur),window.removeEventListener("test",Ur,Ur)}catch{am=!1}var Ur,qa=null,lg=null,Nu=null;function cx(){if(Nu)return Nu;var e,t=lg,n=t.length,i,a="value"in qa?qa.value:qa.textContent,s=a.length;for(e=0;e<n&&t[e]===a[e];e++);var r=n-e;for(i=1;i<=r&&t[n-i]===a[s-i];i++);return Nu=a.slice(e,1<i?1-i:void 0)}function Lu(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function pu(){return!0}function h_(){return!1}function An(e){function t(n,i,a,s,r){this._reactName=n,this._targetInst=a,this.type=i,this.nativeEvent=s,this.target=r,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?pu:h_,this.isPropagationStopped=h_,this}return Ee(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=pu)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=pu)},persist:function(){},isPersistent:pu}),t}var fs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ah=An(fs),ec=Ee({},fs,{view:0,detail:0}),BE=An(ec),xp,Sp,hl,wh=Ee({},ec,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:cg,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==hl&&(hl&&e.type==="mousemove"?(xp=e.screenX-hl.screenX,Sp=e.screenY-hl.screenY):Sp=xp=0,hl=e),xp)},movementY:function(e){return"movementY"in e?e.movementY:Sp}}),f_=An(wh),zE=Ee({},wh,{dataTransfer:0}),FE=An(zE),HE=Ee({},ec,{relatedTarget:0}),Mp=An(HE),VE=Ee({},fs,{animationName:0,elapsedTime:0,pseudoElement:0}),GE=An(VE),kE=Ee({},fs,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),XE=An(kE),WE=Ee({},fs,{data:0}),d_=An(WE),qE={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},YE={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ZE={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function JE(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=ZE[e])?!!t[e]:!1}function cg(){return JE}var KE=Ee({},ec,{key:function(e){if(e.key){var t=qE[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Lu(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?YE[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:cg,charCode:function(e){return e.type==="keypress"?Lu(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Lu(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),QE=An(KE),jE=Ee({},wh,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),p_=An(jE),$E=Ee({},fs,{submitter:0}),tT=An($E),eT=Ee({},ec,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:cg}),nT=An(eT),iT=Ee({},fs,{propertyName:0,elapsedTime:0,pseudoElement:0}),aT=An(iT),sT=Ee({},wh,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),rT=An(sT),oT=Ee({},fs,{newState:0,oldState:0,source:0}),lT=An(oT),cT=[9,13,27,32],ug=ga&&"CompositionEvent"in window,Sl=null;ga&&"documentMode"in document&&(Sl=document.documentMode);var uT=ga&&"TextEvent"in window&&!Sl,ux=ga&&(!ug||Sl&&8<Sl&&11>=Sl),m_=" ",g_=!1;function hx(e,t){switch(e){case"keyup":return cT.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function fx(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Vr=!1;function hT(e,t){switch(e){case"compositionend":return fx(t);case"keypress":return t.which!==32?null:(g_=!0,m_);case"textInput":return e=t.data,e===m_&&g_?null:e;default:return null}}function fT(e,t){if(Vr)return e==="compositionend"||!ug&&hx(e,t)?(e=cx(),Nu=lg=qa=null,Vr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ux&&t.locale!=="ko"?null:t.data;default:return null}}var dT={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function v_(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!dT[e.type]:t==="textarea"}function dx(e,t,n,i){Hr?Qr?Qr.push(i):Qr=[i]:Hr=i,t=Sh(t,"onChange"),0<t.length&&(n=new Ah("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var Ml=null,Pl=null;function pT(e){lM(e,0)}function Ch(e){var t=_l(e);if(ix(t))return e}function __(e,t){if(e==="change")return t}var px=!1;ga&&(ga?(gu="oninput"in document,gu||(bp=document.createElement("div"),bp.setAttribute("oninput","return;"),gu=typeof bp.oninput=="function"),mu=gu):mu=!1,px=mu&&(!document.documentMode||9<document.documentMode));var mu,gu,bp;function y_(){Ml&&(Ml.detachEvent("onpropertychange",mx),Pl=Ml=null)}function mx(e){if(e.propertyName==="value"&&Ch(Pl)){var t=[];dx(t,Pl,e,og(e)),lx(pT,t)}}function mT(e,t,n){e==="focusin"?(y_(),Ml=t,Pl=n,Ml.attachEvent("onpropertychange",mx)):e==="focusout"&&y_()}function gT(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ch(Pl)}function vT(e,t){if(e==="click")return Ch(t)}function _T(e,t){if(e==="input"||e==="change")return Ch(t)}function yT(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Jn=typeof Object.is=="function"?Object.is:yT;function Bl(e,t){if(Jn(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var a=n[i];if(!tm.call(t,a)||!Jn(e[a],t[a]))return!1}return!0}function sm(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function x_(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function S_(e,t){var n=x_(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=x_(n)}}function gx(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?gx(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function vx(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=sm(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=sm(e.document)}return t}function hg(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var xT=ga&&"documentMode"in document&&11>=document.documentMode,Gr=null,rm=null,bl=null,om=!1;function M_(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;om||Gr==null||Gr!==sm(i)||(i=Gr,"selectionStart"in i&&hg(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),bl&&Bl(bl,i)||(bl=i,i=Sh(rm,"onSelect"),0<i.length&&(t=new Ah("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=Gr)))}function Bs(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var kr={animationend:Bs("Animation","AnimationEnd"),animationiteration:Bs("Animation","AnimationIteration"),animationstart:Bs("Animation","AnimationStart"),transitionrun:Bs("Transition","TransitionRun"),transitionstart:Bs("Transition","TransitionStart"),transitioncancel:Bs("Transition","TransitionCancel"),transitionend:Bs("Transition","TransitionEnd")},Ep={},_x={};ga&&(_x=document.createElement("div").style,"AnimationEvent"in window||(delete kr.animationend.animation,delete kr.animationiteration.animation,delete kr.animationstart.animation),"TransitionEvent"in window||delete kr.transitionend.transition);function sr(e){if(Ep[e])return Ep[e];if(!kr[e])return e;var t=kr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in _x)return Ep[e]=t[n];return e}var yx=sr("animationend"),xx=sr("animationiteration"),Sx=sr("animationstart"),ST=sr("transitionrun"),MT=sr("transitionstart"),bT=sr("transitioncancel"),Mx=sr("transitionend"),bx=new Map,lm="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");lm.push("scrollEnd");function Di(e,t){bx.set(e,t),ar(t,[e])}var ET=0;function va(e,t){if(e.name!=null&&e.name!=="auto")return e.name;if(t.autoName!==null)return t.autoName;e=Ri.identifierPrefix;var n=ET++;return e="_"+e+"t_"+n.toString(32)+"_",t.autoName=e}function b_(e){if(e==null||typeof e=="string")return e;var t=null,n=ao;if(n!==null)for(var i=0;i<n.length;i++){var a=e[n[i]];if(a!=null){if(a==="none")return"none";t=t==null?a:t+(" "+a)}}return t??e.default}function ba(e,t){return e=b_(e),t=b_(t),t==null?e==="auto"?null:e:t==="auto"?null:t}var th=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},ui=[],Xr=0,fg=0;function Rh(){for(var e=Xr,t=fg=Xr=0;t<e;){var n=ui[t];ui[t++]=null;var i=ui[t];ui[t++]=null;var a=ui[t];ui[t++]=null;var s=ui[t];if(ui[t++]=null,i!==null&&a!==null){var r=i.pending;r===null?a.next=a:(a.next=r.next,r.next=a),i.pending=a}s!==0&&Ex(n,a,s)}}function Dh(e,t,n,i){ui[Xr++]=e,ui[Xr++]=t,ui[Xr++]=n,ui[Xr++]=i,fg|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function dg(e,t,n,i){return Dh(e,t,n,i),eh(e)}function rr(e,t){return Dh(e,null,null,t),eh(e)}function Ex(e,t,n){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n);for(var a=!1,s=e.return;s!==null;)s.childLanes|=n,i=s.alternate,i!==null&&(i.childLanes|=n),s.tag===22&&(e=s.stateNode,e===null||e._visibility&1||(a=!0)),e=s,s=s.return;return e.tag===3?(s=e.stateNode,a&&t!==null&&(a=31-Yn(n),e=s.hiddenUpdates,i=e[a],i===null?e[a]=[t]:i.push(t),t.lane=n|536870912),s):null}function eh(e){if(50<Ll)throw Ll=0,ku=null,Error(J(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Wr={};function TT(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Nn(e,t,n,i){return new TT(e,t,n,i)}function pg(e){return e=e.prototype,!(!e||!e.isReactComponent)}function pa(e,t){var n=e.alternate;return n===null?(n=Nn(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Tx(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Ou(e,t,n,i,a,s){var r=0;if(i=e,typeof i=="function")pg(i)&&(r=1);else if(typeof i=="string")r=QA(e,n,Ki.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(i){case Jp:return e=Nn(31,n,t,a),e.elementType=Jp,e.lanes=s,e;case zr:return Ws(n.children,a,s,t);case Gy:r=8,a|=24;break;case qp:return e=Nn(12,n,t,a|2),e.elementType=qp,e.lanes=s,e;case Yp:return e=Nn(13,n,t,a),e.elementType=Yp,e.lanes=s,e;case Zp:return e=Nn(19,n,t,a),e.elementType=Zp,e.lanes=s,e;case fE:case Kp:return e=a|32,e=Nn(30,n,t,e),e.elementType=Kp,e.lanes=s,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof i=="object"&&i!==null)switch(i.$$typeof){case qi:r=10;break t;case ky:r=9;break t;case eg:r=11;break t;case ng:r=14;break t;case Ga:r=16,i=null;break t}r=29,n=Error(J(130,e===null?"null":typeof e,"")),i=null}return t=Nn(r,n,t,a),t.elementType=e,t.type=i,t.lanes=s,t}function Ws(e,t,n,i){return e=Nn(7,e,i,t),e.lanes=n,e}function Tp(e,t,n){return e=Nn(6,e,null,t),e.lanes=n,e}function Ax(e){var t=Nn(18,null,null,0);return t.stateNode=e,t}function Ap(e,t,n){return t=Nn(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var E_=new WeakMap;function pi(e,t){if(typeof e=="object"&&e!==null){var n=E_.get(e);return n!==void 0?n:(t={value:e,source:t,stack:n_(t)},E_.set(e,t),t)}return{value:e,source:t,stack:n_(t)}}var qr=[],Yr=0,nh=null,zl=0,hi=[],fi=0,os=null,Zi=1,Ji="";function fa(e,t){qr[Yr++]=zl,qr[Yr++]=nh,nh=e,zl=t}function wx(e,t,n){hi[fi++]=Zi,hi[fi++]=Ji,hi[fi++]=os,os=e;var i=Zi;e=Ji;var a=32-Yn(i)-1;i&=~(1<<a),n+=1;var s=32-Yn(t)+a;if(30<s){var r=a-a%5;s=(i&(1<<r)-1).toString(32),i>>=r,a-=r,Zi=1<<32-Yn(t)+a|n<<a|i,Ji=s+e}else Zi=1<<s|n<<a|i,Ji=e}function Uh(e){e.return!==null&&(fa(e,1),wx(e,1,0))}function mg(e){for(;e===nh;)nh=qr[--Yr],qr[Yr]=null,zl=qr[--Yr],qr[Yr]=null;for(;e===os;)os=hi[--fi],hi[fi]=null,Ji=hi[--fi],hi[fi]=null,Zi=hi[--fi],hi[fi]=null}function Cx(e,t){hi[fi++]=Zi,hi[fi++]=Ji,hi[fi++]=os,Zi=t.id,Ji=t.overflow,os=e}var en=null,we=null,Kt=!1,ja=null,mi=!1,cm=Error(J(519));function ls(e){var t=Error(J(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Fl(pi(t,e)),cm}function T_(e){var t=e.stateNode,n=e.type,i=e.memoizedProps;switch(t[on]=e,t[In]=i,n){case"dialog":Qt("cancel",t),Qt("close",t);break;case"iframe":case"object":case"embed":Qt("load",t);break;case"video":case"audio":for(n=0;n<kl.length;n++)Qt(kl[n],t);break;case"source":Qt("error",t);break;case"img":case"image":case"link":Qt("error",t),Qt("load",t);break;case"details":Qt("toggle",t);break;case"input":Qt("invalid",t),ax(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Qt("invalid",t);break;case"textarea":Qt("invalid",t),rx(t,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||i.suppressHydrationWarning===!0||uM(t.textContent,n)?(i.popover!=null&&(Qt("beforetoggle",t),Qt("toggle",t)),i.onScroll!=null&&Qt("scroll",t),i.onScrollEnd!=null&&Qt("scrollend",t),i.onClick!=null&&(t.onclick=Yi),t=!0):t=!1,t||ls(e,!0)}function ih(e){for(en=e.return;en;)switch(en.tag){case 5:case 31:case 13:mi=!1;return;case 27:case 3:mi=!0;return;default:en=en.return}}function Nr(e){if(e!==en)return!1;if(!Kt)return ih(e),Kt=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||Ym(e.type,e.memoizedProps)),n=!n),n&&we&&ls(e),ih(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(J(317));we=Sy(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(J(317));we=Sy(e)}else t===27?(t=we,ds(e.type)?(e=Qm,Qm=null,we=e):we=t):we=en?gi(e.stateNode.nextSibling):null;return!0}function Js(){we=en=null,Kt=!1}function wp(){var e=ja;return e!==null&&(Dn===null?Dn=e:Dn.push.apply(Dn,e),ja=null),e}function Fl(e){ja===null?ja=[e]:ja.push(e)}var um=$i(null),or=null,da=null;function Ya(e,t,n){Ce(um,t._currentValue),t._currentValue=n}function ma(e){e._currentValue=um.current,cn(um)}function Iu(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function hm(e,t,n,i){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var s=a.dependencies;if(s!==null){var r=a.child;s=s.firstContext;t:for(;s!==null;){var o=s;s=a;for(var l=0;l<t.length;l++)if(o.context===t[l]){s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Iu(s.return,n,e),i||(r=null);break t}s=o.next}}else if(a.tag===18){if(r=a.return,r===null)throw Error(J(341));r.lanes|=n,s=r.alternate,s!==null&&(s.lanes|=n),Iu(r,n,e),r=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,r=a.alternate,r!==null&&(r.lanes|=n),Iu(a.return,n,e),r=a.child,r=r!==null?r.sibling:null):r=a.child;if(r!==null)r.return=a;else for(r=a;r!==null;){if(r===e){r=null;break}if(a=r.sibling,a!==null){a.return=r.return,r=a;break}r=r.return}a=r}}function Ks(e,t,n,i){e=null;for(var a=t,s=!1;a!==null;){if(!s){if((a.flags&524288)!==0)s=!0;else if((a.flags&262144)!==0)break}if(a.tag===10){var r=a.alternate;if(r===null)throw Error(J(387));if(r=r.memoizedProps,r!==null){var o=a.type;Jn(a.pendingProps.value,r.value)||(e!==null?e.push(o):e=[o])}}else if(a===Ju.current){if(r=a.alternate,r===null)throw Error(J(387));r.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e!==null?e.push(go):e=[go])}a=a.return}return e!==null&&hm(t,e,n,i),t.flags|=262144,e!==null}function ah(e){for(e=e.firstContext;e!==null;){if(!Jn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Qs(e){or=e,da=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function ln(e){return Rx(or,e)}function vu(e,t){return or===null&&Qs(e),Rx(e,t)}function Rx(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},da===null){if(e===null)throw Error(J(308));da=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else da=da.next=t;return n}var AT=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},wT=Ze.unstable_scheduleCallback,CT=Ze.unstable_NormalPriority,ke={$$typeof:qi,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function gg(){return{controller:new AT,data:new Map,refCount:0}}function nc(e){e.refCount--,e.refCount===0&&wT(CT,function(){e.controller.abort()})}function A_(e,t){if((e.pendingLanes&4194048)!==0){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var i=t[e];n.indexOf(i)===-1&&n.push(i)}}}var yl=null;function RT(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var El=null,fm=0,js=0,jr=null;function DT(e,t){if(El===null){var n=El=[];fm=0,js=Xg(),jr={status:"pending",value:void 0,then:function(i){n.push(i)}}}return fm++,t.then(w_,w_),t}function w_(){if(--fm===0&&(yl=null,El!==null)){jr!==null&&(jr.status="fulfilled");var e=El;El=null,js=0,jr=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function UT(e,t){var n=[],i={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var a=0;a<n.length;a++)(0,n[a])(t)},function(a){for(i.status="rejected",i.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),i}var C_=It.S;It.S=function(e,t){if(YS=Wn(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&DT(e,t),yl!==null)for(var n=fo;n!==null;)A_(n,yl),n=n.next;if(n=e.types,n!==null){for(var i=fo;i!==null;)A_(i,n),i=i.next;if(js!==0){i=yl,i===null&&(i=yl=[]);for(var a=0;a<n.length;a++){var s=n[a];i.indexOf(s)===-1&&i.push(s)}}}C_!==null&&C_(e,t)};var qs=$i(null);function vg(){var e=qs.current;return e!==null?e:be.pooledCache}function Pu(e,t){t===null?Ce(qs,qs.current):Ce(qs,t.pool)}function Dx(){var e=vg();return e===null?null:{parent:ke._currentValue,pool:e}}var So=Error(J(460)),_g=Error(J(474)),Nh=Error(J(542)),sh={then:function(){}};function R_(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Ux(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Yi,Yi),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,U_(e),e===void 0&&!("reason"in t)?Error(J(600)):e;default:if(typeof t.status=="string")t.then(Yi,Yi);else{if(e=be,e!==null&&100<e.shellSuspendCounter)throw Error(J(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var a=t;a.status="fulfilled",a.value=i}},function(i){if(t.status==="pending"){var a=t;a.status="rejected",a.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,U_(e),e}throw Ys=t,So}}function Hs(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Ys=n,So):n}}var Ys=null;function D_(){if(Ys===null)throw Error(J(459));var e=Ys;return Ys=null,e}function U_(e){if(e===So||e===Nh)throw Error(J(483))}var $r=null,Hl=0;function _u(e){var t=Hl;return Hl+=1,$r===null&&($r=[]),Ux($r,e,t)}function Fa(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function yu(e,t){throw t.$$typeof===hE?Error(J(525)):(e=Object.prototype.toString.call(t),Error(J(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Nx(e){function t(h,v){if(e){var _=h.deletions;_===null?(h.deletions=[v],h.flags|=16):_.push(v)}}function n(h,v){if(!e)return null;for(;v!==null;)t(h,v),v=v.sibling;return null}function i(h){for(var v=new Map;h!==null;)h.key===null?v.set(h.index,h):v.set(h.key,h),h=h.sibling;return v}function a(h,v){return h=pa(h,v),h.index=0,h.sibling=null,h}function s(h,v,_){return h.index=_,e?(_=h.alternate,_!==null?(_=_.index,_<v?(h.flags|=2,v):_):(h.flags|=134217730,v)):(h.flags|=1048576,v)}function r(h){return e&&h.alternate===null&&(h.flags|=134217730),h}function o(h,v,_,y){return v===null||v.tag!==6?(v=Tp(_,h.mode,y),v.return=h,v):(v=a(v,_),v.return=h,v)}function l(h,v,_,y){var T=_.type;return T===zr?(h=u(h,v,_.props.children,y,_.key),Fa(h,_),h):v!==null&&(v.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Ga&&Hs(T)===v.type)?(v=a(v,_.props),Fa(v,_),v.return=h,v):(v=Ou(_.type,_.key,_.props,null,h.mode,y),Fa(v,_),v.return=h,v)}function c(h,v,_,y){return v===null||v.tag!==4||v.stateNode.containerInfo!==_.containerInfo||v.stateNode.implementation!==_.implementation?(v=Ap(_,h.mode,y),v.return=h,v):(v=a(v,_.children||[]),v.return=h,v)}function u(h,v,_,y,T){return v===null||v.tag!==7?(v=Ws(_,h.mode,y,T),v.return=h,v):(v=a(v,_),v.return=h,v)}function d(h,v,_){if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return v=Tp(""+v,h.mode,_),v.return=h,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case cu:return _=Ou(v.type,v.key,v.props,null,h.mode,_),Fa(_,v),_.return=h,_;case gl:return v=Ap(v,h.mode,_),v.return=h,v;case Ga:return v=Hs(v),d(h,v,_)}if(vl(v)||ul(v))return v=Ws(v,h.mode,_,null),v.return=h,v;if(typeof v.then=="function")return d(h,_u(v),_);if(v.$$typeof===qi)return d(h,vu(h,v),_);yu(h,v)}return null}function f(h,v,_,y){var T=v!==null?v.key:null;if(typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint")return T!==null?null:o(h,v,""+_,y);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case cu:return _.key===T?l(h,v,_,y):null;case gl:return _.key===T?c(h,v,_,y):null;case Ga:return _=Hs(_),f(h,v,_,y)}if(vl(_)||ul(_))return T!==null?null:u(h,v,_,y,null);if(typeof _.then=="function")return f(h,v,_u(_),y);if(_.$$typeof===qi)return f(h,v,vu(h,_),y);yu(h,_)}return null}function p(h,v,_,y,T){if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return h=h.get(_)||null,o(v,h,""+y,T);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case cu:return h=h.get(y.key===null?_:y.key)||null,l(v,h,y,T);case gl:return h=h.get(y.key===null?_:y.key)||null,c(v,h,y,T);case Ga:return y=Hs(y),p(h,v,_,y,T)}if(vl(y)||ul(y))return h=h.get(_)||null,u(v,h,y,T,null);if(typeof y.then=="function")return p(h,v,_,_u(y),T);if(y.$$typeof===qi)return p(h,v,_,vu(v,y),T);yu(v,y)}return null}function g(h,v,_,y){for(var T=null,C=null,w=v,R=v=0,E=null;w!==null&&R<_.length;R++){w.index>R?(E=w,w=null):E=w.sibling;var S=f(h,w,_[R],y);if(S===null){w===null&&(w=E);break}e&&w&&S.alternate===null&&t(h,w),v=s(S,v,R),C===null?T=S:C.sibling=S,C=S,w=E}if(R===_.length)return n(h,w),Kt&&fa(h,R),T;if(w===null){for(;R<_.length;R++)w=d(h,_[R],y),w!==null&&(v=s(w,v,R),C===null?T=w:C.sibling=w,C=w);return Kt&&fa(h,R),T}for(w=i(w);R<_.length;R++)E=p(w,h,R,_[R],y),E!==null&&(e&&(S=E.alternate,S!==null&&w.delete(S.key===null?R:S.key)),v=s(E,v,R),C===null?T=E:C.sibling=E,C=E);return e&&w.forEach(function(U){return t(h,U)}),Kt&&fa(h,R),T}function x(h,v,_,y){if(_==null)throw Error(J(151));for(var T=null,C=null,w=v,R=v=0,E=null,S=_.next();w!==null&&!S.done;R++,S=_.next()){w.index>R?(E=w,w=null):E=w.sibling;var U=f(h,w,S.value,y);if(U===null){w===null&&(w=E);break}e&&w&&U.alternate===null&&t(h,w),v=s(U,v,R),C===null?T=U:C.sibling=U,C=U,w=E}if(S.done)return n(h,w),Kt&&fa(h,R),T;if(w===null){for(;!S.done;R++,S=_.next())S=d(h,S.value,y),S!==null&&(v=s(S,v,R),C===null?T=S:C.sibling=S,C=S);return Kt&&fa(h,R),T}for(w=i(w);!S.done;R++,S=_.next())S=p(w,h,R,S.value,y),S!==null&&(e&&(E=S.alternate,E!==null&&w.delete(E.key===null?R:E.key)),v=s(S,v,R),C===null?T=S:C.sibling=S,C=S);return e&&w.forEach(function(B){return t(h,B)}),Kt&&fa(h,R),T}function m(h,v,_,y){if(typeof _=="object"&&_!==null&&_.type===zr&&_.key===null&&_.props.ref===void 0&&(_=_.props.children),typeof _=="object"&&_!==null){switch(_.$$typeof){case cu:t:{for(var T=_.key;v!==null;){if(v.key===T){if(T=_.type,T===zr){if(v.tag===7){n(h,v.sibling),y=a(v,_.props.children),Fa(y,_),y.return=h,h=y;break t}}else if(v.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Ga&&Hs(T)===v.type){n(h,v.sibling),y=a(v,_.props),Fa(y,_),y.return=h,h=y;break t}n(h,v);break}else t(h,v);v=v.sibling}_.type===zr?(y=Ws(_.props.children,h.mode,y,_.key),Fa(y,_),y.return=h,h=y):(y=Ou(_.type,_.key,_.props,null,h.mode,y),Fa(y,_),y.return=h,h=y)}return r(h);case gl:t:{for(T=_.key;v!==null;){if(v.key===T)if(v.tag===4&&v.stateNode.containerInfo===_.containerInfo&&v.stateNode.implementation===_.implementation){n(h,v.sibling),y=a(v,_.children||[]),y.return=h,h=y;break t}else{n(h,v);break}else t(h,v);v=v.sibling}y=Ap(_,h.mode,y),y.return=h,h=y}return r(h);case Ga:return _=Hs(_),m(h,v,_,y)}if(vl(_))return g(h,v,_,y);if(ul(_)){if(T=ul(_),typeof T!="function")throw Error(J(150));return _=T.call(_),x(h,v,_,y)}if(typeof _.then=="function")return m(h,v,_u(_),y);if(_.$$typeof===qi)return m(h,v,vu(h,_),y);yu(h,_)}return typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint"?(_=""+_,v!==null&&v.tag===6?(n(h,v.sibling),y=a(v,_),y.return=h,h=y):(n(h,v),y=Tp(_,h.mode,y),y.return=h,h=y),r(h)):n(h,v)}return function(h,v,_,y){try{Hl=0;var T=m(h,v,_,y);return $r=null,T}catch(w){if(w===So||w===Nh)throw w;var C=Nn(29,w,null,h.mode);return C.lanes=y,C.return=h,C}}}var $s=Nx(!0),Lx=Nx(!1),ka=!1;function yg(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function dm(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function $a(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ts(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(he&2)!==0){var a=i.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),i.pending=t,t=eh(e),Ex(e,null,n),t}return Dh(e,i,t,n),eh(e)}function Tl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,Ky(e,n)}}function Cp(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var a=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};s===null?a=s=r:s=s.next=r,n=n.next}while(n!==null);s===null?a=s=t:s=s.next=t}else a=s=t;n={baseState:i.baseState,firstBaseUpdate:a,lastBaseUpdate:s,shared:i.shared,callbacks:i.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var pm=!1;function Al(){if(pm){var e=jr;if(e!==null)throw e}}function wl(e,t,n,i){pm=!1;var a=e.updateQueue;ka=!1;var s=a.firstBaseUpdate,r=a.lastBaseUpdate,o=a.shared.pending;if(o!==null){a.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?s=c:r.next=c,r=l;var u=e.alternate;u!==null&&(u=u.updateQueue,o=u.lastBaseUpdate,o!==r&&(o===null?u.firstBaseUpdate=c:o.next=c,u.lastBaseUpdate=l))}if(s!==null){var d=a.baseState;r=0,u=c=l=null,o=s;do{var f=o.lane&-536870913,p=f!==o.lane;if(p?(te&f)===f:(i&f)===f){f!==0&&f===js&&(pm=!0),u!==null&&(u=u.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});t:{var g=e,x=o;f=t;var m=n;switch(x.tag){case 1:if(g=x.payload,typeof g=="function"){d=g.call(m,d,f);break t}d=g;break t;case 3:g.flags=g.flags&-65537|128;case 0:if(g=x.payload,f=typeof g=="function"?g.call(m,d,f):g,f==null)break t;d=Ee({},d,f);break t;case 2:ka=!0}}f=o.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=a.callbacks,p===null?a.callbacks=[f]:p.push(f))}else p={lane:f,tag:o.tag,payload:o.payload,callback:o.callback,next:null},u===null?(c=u=p,l=d):u=u.next=p,r|=f;if(o=o.next,o===null){if(o=a.shared.pending,o===null)break;p=o,o=p.next,p.next=null,a.lastBaseUpdate=p,a.shared.pending=null}}while(!0);u===null&&(l=d),a.baseState=l,a.firstBaseUpdate=c,a.lastBaseUpdate=u,s===null&&(a.shared.lanes=0),hs|=r,e.lanes=r,e.memoizedState=d}}function Ox(e,t){if(typeof e!="function")throw Error(J(191,e));e.call(t)}function Ix(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Ox(n[e],t)}var cs=$i(null),rh=$i(0);function N_(e,t){e=Sa,Ce(rh,e),Ce(cs,t),Sa=e|t.baseLanes}function mm(){Ce(rh,Sa),Ce(cs,cs.current)}function xg(){Sa=rh.current,cn(cs),cn(rh)}var fn=$i(null),gn=null;function es(e){var t=e.alternate;Ce(un,un.current&1),Ce(fn,e),gn===null&&(t===null||cs.current!==null||t.memoizedState!==null)&&(gn=e)}function gm(e){Ce(un,un.current),Ce(fn,e),gn===null&&(gn=e)}function Px(e){e.tag===22?(Ce(un,un.current),Ce(fn,e),gn===null&&(gn=e)):ns()}function ns(){Ce(un,un.current),Ce(fn,fn.current)}function Gn(e){cn(fn),gn===e&&(gn=null),cn(un)}var un=$i(0);function Vl(e,t){Ce(fn,fn.current),Ce(un,t)}function Sg(e){cn(un),cn(fn),gn===e&&(gn=null)}function oh(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Km(n)||Zg(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!=="independent"){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var _a=0,Xt=null,Me=null,Ge=null,lh=!1,to=!1,tr=!1,ch=0,Gl=0,eo=null,NT=0;function Pe(){throw Error(J(321))}function Mg(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Jn(e[n],t[n]))return!1;return!0}function bg(e,t,n,i,a,s){return _a=s,Xt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,It.H=e===null||e.memoizedState===null?dS:pS,tr=!1,s=n(i,a),tr=!1,to&&(s=zx(t,n,i,a)),Bx(e),s}function Bx(e){It.H=uh;var t=Me!==null&&Me.next!==null;if(_a=0,Ge=Me=Xt=null,lh=!1,Gl=0,eo=null,t)throw Error(J(300));e===null||Xe||(e=e.dependencies,e!==null&&ah(e)&&(Xe=!0))}function zx(e,t,n,i){Xt=e;var a=0;do{if(to&&(eo=null),Gl=0,to=!1,25<=a)throw Error(J(301));if(a+=1,Ge=Me=null,e.updateQueue!=null){var s=e.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}It.H=HT,s=t(n,i)}while(to);return s}function LT(){var e=It.H,t=e.useState()[0];return t=typeof t.then=="function"?ic(t):t,e=e.useState()[0],(Me!==null?Me.memoizedState:null)!==e&&(Xt.flags|=1024),t}function Eg(){var e=ch!==0;return ch=0,e}function Tg(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Ag(e){if(lh){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}lh=!1}_a=0,Ge=Me=Xt=null,to=!1,Gl=ch=0,eo=null}function Tn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ge===null?Xt.memoizedState=Ge=e:Ge=Ge.next=e,Ge}function He(){if(Me===null){var e=Xt.alternate;e=e!==null?e.memoizedState:null}else e=Me.next;var t=Ge===null?Xt.memoizedState:Ge.next;if(t!==null)Ge=t,Me=e;else{if(e===null)throw Xt.alternate===null?Error(J(467)):Error(J(310));Me=e,e={memoizedState:Me.memoizedState,baseState:Me.baseState,baseQueue:Me.baseQueue,queue:Me.queue,next:null},Ge===null?Xt.memoizedState=Ge=e:Ge=Ge.next=e}return Ge}function Lh(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ic(e){var t=Gl;return Gl+=1,eo===null&&(eo=[]),e=Ux(eo,e,t),t=Xt,(Ge===null?t.memoizedState:Ge.next)===null&&(t=t.alternate,It.H=t===null||t.memoizedState===null?dS:pS),e}function Oh(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return ic(e);if(e.$$typeof===pE)return;if(e.$$typeof===qi)return ln(e)}throw Error(J(438,String(e)))}function wg(e){var t=null,n=Xt.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var i=Xt.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(a){return a.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=Lh(),Xt.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),i=0;i<e;i++)n[i]=dE;return t.index++,n}function ya(e,t){return typeof t=="function"?t(e):t}function Bu(e){var t=He();return Cg(t,Me,e)}function Cg(e,t,n){var i=e.queue;if(i===null)throw Error(J(311));i.lastRenderedReducer=n;var a=e.baseQueue,s=i.pending;if(s!==null){if(a!==null){var r=a.next;a.next=s.next,s.next=r}t.baseQueue=a=s,i.pending=null}if(s=e.baseState,a===null)e.memoizedState=s;else{t=a.next;var o=r=null,l=null,c=t,u=!1;do{var d=c.lane&-536870913;if(d!==c.lane?(te&d)===d:(_a&d)===d){var f=c.revertLane;if(f===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),d===js&&(u=!0);else if((_a&f)===f){c=c.next,f===js&&(u=!0);continue}else d={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=d,r=s):l=l.next=d,Xt.lanes|=f,hs|=f;d=c.action,tr&&n(s,d),s=c.hasEagerState?c.eagerState:n(s,d)}else f={lane:d,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=f,r=s):l=l.next=f,Xt.lanes|=d,hs|=d;c=c.next}while(c!==null&&c!==t);if(l===null?r=s:l.next=o,!Jn(s,e.memoizedState)&&(Xe=!0,u&&(n=jr,n!==null)))throw n;e.memoizedState=s,e.baseState=r,e.baseQueue=l,i.lastRenderedState=s}return a===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function Rp(e){var t=He(),n=t.queue;if(n===null)throw Error(J(311));n.lastRenderedReducer=e;var i=n.dispatch,a=n.pending,s=t.memoizedState;if(a!==null){n.pending=null;var r=a=a.next;do s=e(s,r.action),r=r.next;while(r!==a);Jn(s,t.memoizedState)||(Xe=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),n.lastRenderedState=s}return[s,i]}function Fx(e,t,n){var i=Xt,a=He(),s=Kt;if(s){if(n===void 0)throw Error(J(407));n=n()}else n=t();var r=!Jn((Me||a).memoizedState,n);if(r&&(a.memoizedState=n,Xe=!0),a=a.queue,Rg(Gx.bind(null,i,a,e),[e]),e=a.getSnapshot!==t||r||Ge!==null&&(Ge.memoizedState.tag&1)!==0,lo(e?9:8,{destroy:void 0},Vx.bind(null,i,a,n,t),null),e){if(i.flags|=2048,be===null)throw Error(J(349));s||(_a&127)!==0||Hx(i,t,n)}return n}function Hx(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Xt.updateQueue,t===null?(t=Lh(),Xt.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Vx(e,t,n,i){t.value=n,t.getSnapshot=i,kx(t)&&Xx(e)}function Gx(e,t,n){return n(function(){kx(t)&&Xx(e)})}function kx(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Jn(e,n)}catch{return!0}}function Xx(e){var t=rr(e,2);t!==null&&Ln(t,e,2)}function vm(e){var t=Tn();if(typeof e=="function"){var n=e;if(e=n(),tr){Wa(!0);try{n()}finally{Wa(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ya,lastRenderedState:e},t}function Wx(e,t,n,i){return e.baseState=n,Cg(e,Me,typeof i=="function"?i:ya)}function OT(e,t,n,i,a){if(Ph(e))throw Error(J(485));if(e=t.action,e!==null){var s={payload:a,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){s.listeners.push(r)}};It.T!==null?n(!0):s.isTransition=!1,i(s),n=t.pending,n===null?(s.next=t.pending=s,qx(t,s)):(s.next=n.next,t.pending=n.next=s)}}function qx(e,t){var n=t.action,i=t.payload,a=e.state;if(t.isTransition){var s=It.T,r={};r.types=s!==null?s.types:null,It.T=r;try{var o=n(a,i),l=It.S;l!==null&&l(r,o),L_(e,t,o)}catch(c){_m(e,t,c)}finally{s!==null&&r.types!==null&&(s.types=r.types),It.T=s}}else try{s=n(a,i),L_(e,t,s)}catch(c){_m(e,t,c)}}function L_(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){O_(e,t,i)},function(i){return _m(e,t,i)}):O_(e,t,n)}function O_(e,t,n){t.status="fulfilled",t.value=n,Yx(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,qx(e,n)))}function _m(e,t,n){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=n,Yx(t),t=t.next;while(t!==i)}e.action=null}function Yx(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Zx(e,t){return t}function I_(e,t){if(Kt){var n=be.formState;if(n!==null){t:{var i=Xt;if(Kt){if(we){e:{for(var a=we,s=mi;a.nodeType!==8;){if(!s){a=null;break e}if(a=gi(a.nextSibling),a===null){a=null;break e}}s=a.data,a=s==="F!"||s==="F"?a:null}if(a){we=gi(a.nextSibling),i=a.data==="F!";break t}}ls(i)}i=!1}i&&(t=n[0])}}return n=Tn(),n.memoizedState=n.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zx,lastRenderedState:t},n.queue=i,n=uS.bind(null,Xt,i),i.dispatch=n,i=vm(!1),s=Lg.bind(null,Xt,!1,i.queue),i=Tn(),a={state:t,dispatch:null,action:e,pending:null},i.queue=a,n=OT.bind(null,Xt,a,s,n),a.dispatch=n,i.memoizedState=e,[t,n,!1]}function P_(e){var t=He();return Jx(t,Me,e)}function Jx(e,t,n){if(t=Cg(e,t,Zx)[0],e=Bu(ya)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=ic(t)}catch(r){throw r===So?Nh:r}else i=t;t=He();var a=t.queue,s=a.dispatch;return n!==t.memoizedState&&(Xt.flags|=2048,lo(9,{destroy:void 0},IT.bind(null,a,n),null)),[i,s,e]}function IT(e,t){e.action=t}function B_(e){var t=He(),n=Me;if(n!==null)return Jx(t,n,e);He(),t=t.memoizedState,n=He();var i=n.queue.dispatch;return n.memoizedState=e,[t,i,!1]}function lo(e,t,n,i){return e={tag:e,create:n,deps:i,inst:t,next:null},t=Xt.updateQueue,t===null&&(t=Lh(),Xt.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e),e}function Kx(){return He().memoizedState}function zu(e,t,n,i){var a=Tn();Xt.flags|=e,a.memoizedState=lo(1|t,{destroy:void 0},n,i===void 0?null:i)}function Ih(e,t,n,i){var a=He();i=i===void 0?null:i;var s=a.memoizedState.inst;Me!==null&&i!==null&&Mg(i,Me.memoizedState.deps)?a.memoizedState=lo(t,s,n,i):(Xt.flags|=e,a.memoizedState=lo(1|t,s,n,i))}function z_(e,t){zu(8390656,8,e,t)}function Rg(e,t){Ih(2048,8,e,t)}function PT(e){Xt.flags|=4;var t=Xt.updateQueue;if(t===null)t=Lh(),Xt.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Qx(e){var t=He().memoizedState;return PT({ref:t,nextImpl:e}),function(){if((he&2)!==0)throw Error(J(440));return t.impl.apply(void 0,arguments)}}function jx(e,t){return Ih(4,2,e,t)}function $x(e,t){return Ih(4,4,e,t)}function tS(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function eS(e,t,n){n=n!=null?n.concat([e]):null,Ih(4,4,tS.bind(null,t,e),n)}function Dg(){}function nS(e,t){var n=He();t=t===void 0?null:t;var i=n.memoizedState;return t!==null&&Mg(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function iS(e,t){var n=He();t=t===void 0?null:t;var i=n.memoizedState;if(t!==null&&Mg(t,i[1]))return i[0];if(i=e(),tr){Wa(!0);try{e()}finally{Wa(!1)}}return n.memoizedState=[i,t],i}function Ug(e,t,n){return n===void 0||(_a&1073741824)!==0&&(te&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=JS(),Xt.lanes|=e,hs|=e,n)}function aS(e,t,n,i){return Jn(n,t)?n:cs.current!==null?(e=Ug(e,n,i),Jn(e,t)||(Xe=!0),e):(_a&106)===0||(_a&1073741824)!==0&&(te&261930)===0?(Xe=!0,e.memoizedState=n):(e=JS(),Xt.lanes|=e,hs|=e,t)}function sS(e,t,n,i,a){var s=fe.p;fe.p=s!==0&&8>s?s:8;var r=It.T,o={};o.types=r!==null?r.types:null,It.T=o,Lg(e,!1,t,n);try{var l=a(),c=It.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=UT(l,i);Cl(e,t,u,Zn(e))}else Cl(e,t,i,Zn(e))}catch(d){Cl(e,t,{then:function(){},status:"rejected",reason:d},Zn())}finally{fe.p=s,r!==null&&o.types!==null&&(r.types=o.types),It.T=r}}function BT(){}function ym(e,t,n,i){if(e.tag!==5)throw Error(J(476));var a=rS(e).queue;sS(e,a,t,Xs,n===null?BT:function(){return oS(e),n(i)})}function rS(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:Xs,baseState:Xs,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ya,lastRenderedState:Xs},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ya,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function oS(e){var t=rS(e);t.next===null&&(t=e.alternate.memoizedState),Cl(e,t.next.queue,{},Zn())}function Ng(){return ln(go)}function lS(){return He().memoizedState}function cS(){return He().memoizedState}function zT(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Zn();e=$a(n);var i=ts(t,e,n);i!==null&&(Ln(i,t,n),Tl(i,t,n)),t={cache:gg()},e.payload=t;return}t=t.return}}function FT(e,t,n){var i=Zn();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Ph(e)?hS(t,n):(n=dg(e,t,n,i),n!==null&&(Ln(n,e,i),fS(n,t,i)))}function uS(e,t,n){var i=Zn();Cl(e,t,n,i)}function Cl(e,t,n,i){var a={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ph(e))hS(t,a);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var r=t.lastRenderedState,o=s(r,n);if(a.hasEagerState=!0,a.eagerState=o,Jn(o,r))return Dh(e,t,a,0),be===null&&Rh(),!1}catch{}if(n=dg(e,t,a,i),n!==null)return Ln(n,e,i),fS(n,t,i),!0}return!1}function Lg(e,t,n,i){if(i={lane:2,revertLane:Xg(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},Ph(e)){if(t)throw Error(J(479))}else t=dg(e,n,i,2),t!==null&&Ln(t,e,2)}function Ph(e){var t=e.alternate;return e===Xt||t!==null&&t===Xt}function hS(e,t){to=lh=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function fS(e,t,n){if((n&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,Ky(e,n)}}var uh={readContext:ln,use:Oh,useCallback:Pe,useContext:Pe,useEffect:Pe,useImperativeHandle:Pe,useLayoutEffect:Pe,useInsertionEffect:Pe,useMemo:Pe,useReducer:Pe,useRef:Pe,useState:Pe,useDebugValue:Pe,useDeferredValue:Pe,useTransition:Pe,useSyncExternalStore:Pe,useId:Pe,useHostTransitionStatus:Pe,useFormState:Pe,useActionState:Pe,useOptimistic:Pe,useMemoCache:Pe,useCacheRefresh:Pe,useEffectEvent:Pe},dS={readContext:ln,use:Oh,useCallback:function(e,t){return Tn().memoizedState=[e,t===void 0?null:t],e},useContext:ln,useEffect:z_,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,zu(4194308,4,tS.bind(null,t,e),n)},useLayoutEffect:function(e,t){return zu(4194308,4,e,t)},useInsertionEffect:function(e,t){zu(4,2,e,t)},useMemo:function(e,t){var n=Tn();t=t===void 0?null:t;var i=e();if(tr){Wa(!0);try{e()}finally{Wa(!1)}}return n.memoizedState=[i,t],i},useReducer:function(e,t,n){var i=Tn();if(n!==void 0){var a=n(t);if(tr){Wa(!0);try{n(t)}finally{Wa(!1)}}}else a=t;return i.memoizedState=i.baseState=a,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:a},i.queue=e,e=e.dispatch=FT.bind(null,Xt,e),[i.memoizedState,e]},useRef:function(e){var t=Tn();return e={current:e},t.memoizedState=e},useState:function(e){e=vm(e);var t=e.queue,n=uS.bind(null,Xt,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Dg,useDeferredValue:function(e,t){var n=Tn();return Ug(n,e,t)},useTransition:function(){var e=vm(!1);return e=sS.bind(null,Xt,e.queue,!0,!1),Tn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var i=Xt,a=Tn();if(Kt){if(n===void 0)throw Error(J(407));n=n()}else{if(n=t(),be===null)throw Error(J(349));(te&127)!==0||Hx(i,t,n)}a.memoizedState=n;var s={value:n,getSnapshot:t};return a.queue=s,z_(Gx.bind(null,i,s,e),[e]),i.flags|=2048,lo(9,{destroy:void 0},Vx.bind(null,i,s,n,t),null),n},useId:function(){var e=Tn(),t=be.identifierPrefix;if(Kt){var n=Ji,i=Zi;n=(i&~(1<<32-Yn(i)-1)).toString(32)+n,t="_"+t+"R_"+n,n=ch++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=NT++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Ng,useFormState:I_,useActionState:I_,useOptimistic:function(e){var t=Tn();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Lg.bind(null,Xt,!0,n),n.dispatch=t,[e,t]},useMemoCache:wg,useCacheRefresh:function(){return Tn().memoizedState=zT.bind(null,Xt)},useEffectEvent:function(e){var t=Tn(),n={impl:e};return t.memoizedState=n,function(){if((he&2)!==0)throw Error(J(440));return n.impl.apply(void 0,arguments)}}},pS={readContext:ln,use:Oh,useCallback:nS,useContext:ln,useEffect:Rg,useImperativeHandle:eS,useInsertionEffect:jx,useLayoutEffect:$x,useMemo:iS,useReducer:Bu,useRef:Kx,useState:function(){return Bu(ya)},useDebugValue:Dg,useDeferredValue:function(e,t){var n=He();return aS(n,Me.memoizedState,e,t)},useTransition:function(){var e=Bu(ya)[0],t=He().memoizedState;return[typeof e=="boolean"?e:ic(e),t]},useSyncExternalStore:Fx,useId:lS,useHostTransitionStatus:Ng,useFormState:P_,useActionState:P_,useOptimistic:function(e,t){var n=He();return Wx(n,Me,e,t)},useMemoCache:wg,useCacheRefresh:cS,useEffectEvent:Qx},HT={readContext:ln,use:Oh,useCallback:nS,useContext:ln,useEffect:Rg,useImperativeHandle:eS,useInsertionEffect:jx,useLayoutEffect:$x,useMemo:iS,useReducer:Rp,useRef:Kx,useState:function(){return Rp(ya)},useDebugValue:Dg,useDeferredValue:function(e,t){var n=He();return Me===null?Ug(n,e,t):aS(n,Me.memoizedState,e,t)},useTransition:function(){var e=Rp(ya)[0],t=He().memoizedState;return[typeof e=="boolean"?e:ic(e),t]},useSyncExternalStore:Fx,useId:lS,useHostTransitionStatus:Ng,useFormState:B_,useActionState:B_,useOptimistic:function(e,t){var n=He();return Me!==null?Wx(n,Me,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:wg,useCacheRefresh:cS,useEffectEvent:Qx};function Dp(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:Ee({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var xm={enqueueSetState:function(e,t,n){e=e._reactInternals;var i=Zn(),a=$a(i);a.payload=t,n!=null&&(a.callback=n),t=ts(e,a,i),t!==null&&(Ln(t,e,i),Tl(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=Zn(),a=$a(i);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=ts(e,a,i),t!==null&&(Ln(t,e,i),Tl(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Zn(),i=$a(n);i.tag=2,t!=null&&(i.callback=t),t=ts(e,i,n),t!==null&&(Ln(t,e,n),Tl(t,e,n))}};function F_(e,t,n,i,a,s,r){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,s,r):t.prototype&&t.prototype.isPureReactComponent?!Bl(n,i)||!Bl(a,s):!0}function H_(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&xm.enqueueReplaceState(t,t.state,null)}function er(e,t){var n=t;if("ref"in t){n={};for(var i in t)i!=="ref"&&(n[i]=t[i])}if(e=e.defaultProps){n===t&&(n=Ee({},n));for(var a in e)n[a]===void 0&&(n[a]=e[a])}return n}function mS(e){th(e)}function gS(e){console.error(e)}function vS(e){th(e)}function hh(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function V_(e,t,n){try{var i=e.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function Sm(e,t,n){return n=$a(n),n.tag=3,n.payload={element:null},n.callback=function(){hh(e,t)},n}function _S(e){return e=$a(e),e.tag=3,e}function yS(e,t,n,i){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var s=i.value;e.payload=function(){return a(s)},e.callback=function(){V_(t,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(e.callback=function(){V_(t,n,i),typeof a!="function"&&(is===null?is=new Set([this]):is.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function VT(e,t,n,i,a){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=n.alternate,t!==null&&Ks(t,n,a,!0),n=fn.current,n!==null){switch(n.tag){case 31:case 13:case 19:return gn===null?yh():n.alternate===null&&Be===0&&(Be=3),n.flags&=-257,n.flags|=65536,n.lanes=a,i===sh?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([i]):t.add(i),Bp(e,i,a)),!1;case 22:return n.flags|=65536,i===sh?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([i]):n.add(i)),Bp(e,i,a)),!1}throw Error(J(435,n.tag))}return Bp(e,i,a),yh(),!1}if(Kt)return t=fn.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=a,i!==cm&&(e=Error(J(422),{cause:i}),Fl(pi(e,n)))):(i!==cm&&(t=Error(J(423),{cause:i}),Fl(pi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,i=pi(i,n),a=Sm(e.stateNode,i,a),Cp(e,a),Be!==4&&(Be=2)),!1;var s=Error(J(520),{cause:i});if(s=pi(s,n),Nl===null?Nl=[s]:Nl.push(s),Be!==4&&(Be=2),t===null)return!0;i=pi(i,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Sm(n.stateNode,i,e),Cp(n,e),!1;case 1:if(t=n.type,s=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(is===null||!is.has(s))))return n.flags|=65536,a&=-a,n.lanes|=a,a=_S(a),yS(a,e,n,i),Cp(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var Og=Error(J(461)),Xe=!1;function qe(e,t,n,i){t.child=e===null?Lx(t,null,n,i):$s(t,e.child,n,i)}function G_(e,t,n,i,a){n=n.render;var s=t.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return Qs(t),i=bg(e,t,n,r,s,a),o=Eg(),e!==null&&!Xe?(Tg(e,t,a),xa(e,t,a)):(Kt&&o&&Uh(t),t.flags|=1,qe(e,t,i,a),t.child)}function k_(e,t,n,i,a){if(e===null){var s=n.type;return typeof s=="function"&&!pg(s)&&s.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=s,xS(e,t,s,i,a)):(e=Ou(n.type,null,i,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!Pg(e,a)){var r=s.memoizedProps;if(n=n.compare,n=n!==null?n:Bl,n(r,i)&&e.ref===t.ref)return xa(e,t,a)}return t.flags|=1,e=pa(s,i),e.ref=t.ref,e.return=t,t.child=e}function xS(e,t,n,i,a){if(e!==null){var s=e.memoizedProps;if(Bl(s,i)&&e.ref===t.ref)if(Xe=!1,t.pendingProps=i=s,Pg(e,a))(e.flags&131072)!==0&&(Xe=!0);else return t.lanes=e.lanes,xa(e,t,a)}return Mm(e,t,n,i,a)}function SS(e,t,n,i){var a=i.children,s=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(s=s!==null?s.baseLanes|n:n,e!==null){for(i=t.child=e.child,a=0;i!==null;)a=a|i.lanes|i.childLanes,i=i.sibling;i=a&~s}else i=0,t.child=null;return X_(e,t,s,n,i)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Pu(t,s!==null?s.cachePool:null),s!==null?N_(t,s):mm(),Px(t);else return i=t.lanes=536870912,X_(e,t,s!==null?s.baseLanes|n:n,n,i)}else s!==null?(Pu(t,s.cachePool),N_(t,s),ns(),t.memoizedState=null):(e!==null&&Pu(t,null),mm(),ns());return qe(e,t,a,n),t.child}function Rl(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function X_(e,t,n,i,a){var s=vg();return s=s===null?null:{parent:ke._currentValue,pool:s},t.memoizedState={baseLanes:n,cachePool:s},e!==null&&Pu(t,null),mm(),Px(t),e!==null&&Ks(e,t,i,!0),t.childLanes=a,null}function Fu(e,t){return t=Bh({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function W_(e,t,n){return $s(t,e.child,null,n),e=Fu(t,t.pendingProps),e.flags|=2,Gn(t),t.memoizedState=null,e}function GT(e,t,n){var i=t.pendingProps,a=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Kt){if(i.mode==="hidden")return e=Fu(t,i),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Rl(null,e);if(gm(t),(e=we)?(e=SM(e,mi),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:os!==null?{id:Zi,overflow:Ji}:null,retryLane:536870912,hydrationErrors:null},n=Ax(e),n.return=t,t.child=n,en=t,we=null)):e=null,e===null)throw ls(t);return t.lanes=536870912,null}return Fu(t,i)}var s=e.memoizedState;if(s!==null){var r=s.dehydrated;if(gm(t),a)if(t.flags&256)t.flags&=-257,t=W_(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(J(558));else if(Xe||Ks(e,t,n,!1),a=(n&e.childLanes)!==0,Xe||a){if(cs.current===null){if(i=be,i!==null&&(r=Qy(i,n),r!==0&&r!==s.retryLane))throw s.retryLane=r,rr(e,r),Ln(i,e,r),Og;yh()}t=W_(e,t,n)}else e=s.treeContext,we=gi(r.nextSibling),en=t,Kt=!0,ja=null,mi=!1,e!==null&&Cx(t,e),t=Fu(t,i),t.flags|=134221824;return t}return e=pa(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Or(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(J(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Mm(e,t,n,i,a){return Qs(t),n=bg(e,t,n,i,void 0,a),i=Eg(),e!==null&&!Xe?(Tg(e,t,a),xa(e,t,a)):(Kt&&i&&Uh(t),t.flags|=1,qe(e,t,n,a),t.child)}function q_(e,t,n,i,a,s){return Qs(t),t.updateQueue=null,n=zx(t,i,n,a),Bx(e),i=Eg(),e!==null&&!Xe?(Tg(e,t,s),xa(e,t,s)):(Kt&&i&&Uh(t),t.flags|=1,qe(e,t,n,s),t.child)}function Y_(e,t,n,i,a){if(Qs(t),t.stateNode===null){var s=Wr,r=n.contextType;typeof r=="object"&&r!==null&&(s=ln(r)),s=new n(i,s),t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=xm,t.stateNode=s,s._reactInternals=t,s=t.stateNode,s.props=i,s.state=t.memoizedState,s.refs={},yg(t),r=n.contextType,s.context=typeof r=="object"&&r!==null?ln(r):Wr,s.state=t.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(Dp(t,n,r,i),s.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(r=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),r!==s.state&&xm.enqueueReplaceState(s,s.state,null),wl(t,i,s,a),Al(),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){s=t.stateNode;var o=t.memoizedProps,l=er(n,o);s.props=l;var c=s.context,u=n.contextType;r=Wr,typeof u=="object"&&u!==null&&(r=ln(u));var d=n.getDerivedStateFromProps;u=typeof d=="function"||typeof s.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,u||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o||c!==r)&&H_(t,s,i,r),ka=!1;var f=t.memoizedState;s.state=f,wl(t,i,s,a),Al(),c=t.memoizedState,o||f!==c||ka?(typeof d=="function"&&(Dp(t,n,d,i),c=t.memoizedState),(l=ka||F_(t,n,l,i,f,c,r))?(u||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=c),s.props=i,s.state=c,s.context=r,i=l):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{s=t.stateNode,dm(e,t),r=t.memoizedProps,u=er(n,r),s.props=u,d=t.pendingProps,f=s.context,c=n.contextType,l=Wr,typeof c=="object"&&c!==null&&(l=ln(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(r!==d||f!==l)&&H_(t,s,i,l),ka=!1,f=t.memoizedState,s.state=f,wl(t,i,s,a),Al();var p=t.memoizedState;r!==d||f!==p||ka||e!==null&&e.dependencies!==null&&ah(e.dependencies)?(typeof o=="function"&&(Dp(t,n,o,i),p=t.memoizedState),(u=ka||F_(t,n,u,i,f,p,l)||e!==null&&e.dependencies!==null&&ah(e.dependencies))?(c||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(i,p,l),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(i,p,l)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||r===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=p),s.props=i,s.state=p,s.context=l,i=u):(typeof s.componentDidUpdate!="function"||r===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),i=!1)}return s=i,Or(e,t),i=(t.flags&128)!==0,s||i?(s=t.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:s.render(),t.flags|=1,e!==null&&i?(t.child=$s(t,e.child,null,a),t.child=$s(t,null,n,a)):qe(e,t,n,a),t.memoizedState=s.state,e=t.child):e=xa(e,t,a),e}function Z_(e,t,n,i){return Js(),t.flags|=256,qe(e,t,n,i),t.child}var bm={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Em(e){return{baseLanes:e,cachePool:Dx()}}function Tm(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=Xn),e}function MS(e,t,n){var i=t.pendingProps,a=!1,s=(t.flags&128)!==0,r;if((r=s)||(r=e!==null&&e.memoizedState===null?!1:(un.current&2)!==0),r&&(a=!0,t.flags&=-129),r=(t.flags&32)!==0,t.flags&=-33,e===null){if(Kt){if(a?es(t):ns(),(e=we)?(e=SM(e,mi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:os!==null?{id:Zi,overflow:Ji}:null,retryLane:536870912,hydrationErrors:null},n=Ax(e),n.return=t,t.child=n,en=t,we=null)):e=null,e===null)throw ls(t);return Zg(e)?t.lanes=32:t.lanes=536870912,null}return s=i.children,i=i.fallback,a?(ns(),a=t.mode,s=Bh({mode:"hidden",children:s},a),i=Ws(i,a,n,null),s.return=t,i.return=t,s.sibling=i,t.child=s,i=t.child,i.memoizedState=Em(n),i.childLanes=Tm(e,r,n),t.memoizedState=bm,Rl(null,i)):(es(t),Ig(t,s))}var o=e.memoizedState;if(o!==null){var l=o.dehydrated;if(l!==null)return kT(e,t,s,r,i,l,o,n)}return a?(ns(),a=i.fallback,s=t.mode,o=e.child,l=o.sibling,i=pa(o,{mode:"hidden",children:i.children}),i.subtreeFlags=o.subtreeFlags&1206910976,l!==null?a=pa(l,a):(a=Ws(a,s,n,null),a.flags|=2),a.return=t,i.return=t,i.sibling=a,t.child=i,Rl(null,i),i=t.child,a=e.child.memoizedState,a===null?a=Em(n):(s=a.cachePool,s!==null?(o=ke._currentValue,s=s.parent!==o?{parent:o,pool:o}:s):s=Dx(),a={baseLanes:a.baseLanes|n,cachePool:s}),i.memoizedState=a,i.childLanes=Tm(e,r,n),t.memoizedState=bm,Rl(e.child,i)):(es(t),n=e.child,e=n.sibling,n=pa(n,{mode:"visible",children:i.children}),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n)}function Ig(e,t){return t=Bh({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Bh(e,t){return e=Nn(22,e,null,t),e.lanes=0,e}function xu(e,t,n){return $s(t,e.child,null,n),e=Ig(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function kT(e,t,n,i,a,s,r,o){if(n)return t.flags&256?(es(t),t.flags&=-257,xu(e,t,o)):t.memoizedState!==null?(ns(),t.child=e.child,t.flags|=128,null):(ns(),s=a.fallback,r=t.mode,a=Bh({mode:"visible",children:a.children},r),s=Ws(s,r,o,null),s.flags|=2,a.return=t,s.return=t,a.sibling=s,t.child=a,$s(t,e.child,null,o),a=t.child,a.memoizedState=Em(o),a.childLanes=Tm(e,i,o),t.memoizedState=bm,Rl(null,a));if(es(t),Zg(s)){if(i=s.nextSibling&&s.nextSibling.dataset,i)var l=i.dgst;return i=l,i!==""&&(a=Error(J(419)),a.stack="",a.digest=i,Fl({value:a,source:null,stack:null})),xu(e,t,o)}if(Xe||Ks(e,t,o,!1),i=(o&e.childLanes)!==0,Xe||i){if(cs.current!==null)return xu(e,t,o);if(i=be,i!==null&&(a=Qy(i,o),a!==0&&a!==r.retryLane))throw r.retryLane=a,rr(e,a),Ln(i,e,a),Og;return Km(s)||yh(),xu(e,t,o)}return Km(s)?(t.flags|=192,t.child=e.child,null):(e=r.treeContext,we=gi(s.nextSibling),en=t,Kt=!0,ja=null,mi=!1,e!==null&&Cx(t,e),t=Ig(t,a.children),t.flags|=134221824,t)}function J_(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),Iu(e.return,t,n)}function K_(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&oh(n)===null&&(t=e),e=e.sibling}return t}function Su(e,t,n,i,a,s){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:a,treeForkCount:s}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=a,r.treeForkCount=s)}function Up(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function Am(e,t,n){var i=t.pendingProps,a=i.revealOrder,s=i.tail;i=i.children;var r=un.current;if(t.flags&128)return Vl(t,r),null;var o=(r&2)!==0;if(o?(r=r&1|2,t.flags|=128):r&=1,Vl(t,r),a==="backwards"&&e!==null?(Up(e),qe(e,t,i,n),Up(e)):qe(e,t,i,n),i=Kt?zl:0,!o&&e!==null&&(e.flags&128)!==0)t:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&J_(e,n,t);else if(e.tag===19)J_(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(a){case"backwards":n=K_(t.child),n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null,Up(t)),Su(t,!0,a,null,s,i);break;case"unstable_legacy-backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&oh(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}Su(t,!0,n,null,s,i);break;case"together":Su(t,!1,null,null,void 0,i);break;case"independent":t.memoizedState=null;break;default:n=K_(t.child),n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),Su(t,!1,a,n,s,i)}return t.child}function Q_(e,t,n){var i=t.pendingProps;return Ya(t,t.type,i.value),qe(e,t,i.children,n),t.child}function xa(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),hs|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Ks(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(J(153));if(t.child!==null){for(e=t.child,n=pa(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=pa(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Pg(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&ah(e)))}function XT(e,t,n){switch(t.tag){case 3:Ku(t,t.stateNode.containerInfo),Ya(t,ke,e.memoizedState.cache),Js();break;case 27:case 5:$p(t);break;case 4:Ku(t,t.stateNode.containerInfo);break;case 10:Ya(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,gm(t),null;break;case 13:var i=t.memoizedState;if(i!==null){if(i.dehydrated!==null)return es(t),t.flags|=128,null;i=Ks(e,t,n,!1);var a=t.child.childLanes;return i||(n&a)!==0?MS(e,t,n):(es(t),e=xa(e,t,n),e!==null?e.sibling:null)}es(t);break;case 19:if(t.flags&128)return Am(e,t,n);if(a=(e.flags&128)!==0,i=(n&t.childLanes)!==0,i||(Ks(e,t,n,!1),i=(n&t.childLanes)!==0),a){if(i)return Am(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),Vl(t,un.current),i)break;return null;case 22:return t.lanes=0,SS(e,t,n,t.pendingProps);case 24:Ya(t,ke,e.memoizedState.cache)}return xa(e,t,n)}function bS(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Xe=!0;else{if(!Pg(e,n)&&(t.flags&128)===0)return Xe=!1,XT(e,t,n);Xe=(e.flags&131072)!==0}else Xe=!1,Kt&&(t.flags&1048576)!==0&&wx(t,zl,t.index);switch(t.lanes=0,t.tag){case 16:t:{var i=t.pendingProps;if(e=Hs(t.elementType),t.type=e,typeof e=="function")pg(e)?(i=er(e,i),t.tag=1,t=Y_(null,t,e,i,n)):(t.tag=0,t=Mm(null,t,e,i,n));else{if(e!=null){var a=e.$$typeof;if(a===eg){t.tag=11,t=G_(null,t,e,i,n);break t}else if(a===ng){t.tag=14,t=k_(null,t,e,i,n);break t}else if(a===qi){t.tag=10,t.type=e,t=Q_(null,t,n);break t}}throw t=Qp(e)||e,Error(J(306,t,""))}}return t;case 0:return Mm(e,t,t.type,t.pendingProps,n);case 1:return i=t.type,a=er(i,t.pendingProps),Y_(e,t,i,a,n);case 3:t:{if(Ku(t,t.stateNode.containerInfo),e===null)throw Error(J(387));i=t.pendingProps;var s=t.memoizedState;a=s.element,dm(e,t),wl(t,i,null,n);var r=t.memoizedState;if(i=r.cache,Ya(t,ke,i),i!==s.cache&&hm(t,[ke],n,!0),Al(),i=r.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:r.cache},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){t=Z_(e,t,i,n);break t}else if(i!==a){a=pi(Error(J(424)),t),Fl(a),t=Z_(e,t,i,n);break t}else for(e=t.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,we=gi(e.firstChild),en=t,Kt=!0,ja=null,mi=!0,n=Lx(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling;else{if(Js(),i===a){t=xa(e,t,n);break t}qe(e,t,i,n)}t=t.child}return t;case 26:return Or(e,t),e===null?(n=Ey(t.type,null,t.pendingProps,null))?t.memoizedState=n:Kt||(t.stateNode=fM(t.type,t.pendingProps,Qa.current,t)):t.memoizedState=Ey(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return $p(t),e===null&&Kt&&(i=t.stateNode=MM(t.type,t.pendingProps,Qa.current),en=t,mi=!0,a=we,ds(t.type)?(Qm=a,we=gi(i.firstChild)):we=a),qe(e,t,t.pendingProps.children,n),Or(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Kt&&((a=i=we)&&(i=PA(i,t.type,t.pendingProps,mi),i!==null?(t.stateNode=i,en=t,we=gi(i.firstChild),mi=!1,a=!0):a=!1),a||ls(t)),$p(t),a=t.type,s=t.pendingProps,r=e!==null?e.memoizedProps:null,i=s.children,Ym(a,s)?i=null:r!==null&&Ym(a,r)&&(t.flags|=32),t.memoizedState!==null&&(a=bg(e,t,LT,null,null,n),go._currentValue=a),Or(e,t),qe(e,t,i,n),t.child;case 6:return e===null&&Kt&&((e=n=we)&&(n=BA(n,t.pendingProps,mi),n!==null?(t.stateNode=n,en=t,we=null,e=!0):e=!1),e||ls(t)),null;case 13:return MS(e,t,n);case 4:return Ku(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=$s(t,null,i,n):qe(e,t,i,n),t.child;case 11:return G_(e,t,t.type,t.pendingProps,n);case 7:return i=t.pendingProps,Or(e,t),qe(e,t,i,n),t.child;case 8:return qe(e,t,t.pendingProps.children,n),t.child;case 12:return qe(e,t,t.pendingProps.children,n),t.child;case 10:return Q_(e,t,n);case 9:return a=t.type._context,i=t.pendingProps.children,Qs(t),a=ln(a),i=i(a),t.flags|=1,qe(e,t,i,n),t.child;case 14:return k_(e,t,t.type,t.pendingProps,n);case 15:return xS(e,t,t.type,t.pendingProps,n);case 19:return Am(e,t,n);case 31:return GT(e,t,n);case 22:return SS(e,t,n,t.pendingProps);case 24:return Qs(t),i=ln(ke),e===null?(a=vg(),a===null&&(a=be,s=gg(),a.pooledCache=s,s.refCount++,s!==null&&(a.pooledCacheLanes|=n),a=s),t.memoizedState={parent:i,cache:a},yg(t),Ya(t,ke,a)):((e.lanes&n)!==0&&(dm(e,t),wl(t,null,null,n),Al()),a=e.memoizedState,s=t.memoizedState,a.parent!==i?(a={parent:i,cache:i},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Ya(t,ke,i)):(i=s.cache,Ya(t,ke,i),i!==a.cache&&hm(t,[ke],n,!0))),qe(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),i=t.pendingProps,i.name!=null&&i.name!=="auto"?t.flags|=e===null?18882560:18874368:Kt&&Uh(t),e!==null&&e.memoizedProps.name!==i.name?t.flags|=4194816:Or(e,t),qe(e,t,i.children,n),t.child;case 29:throw t.pendingProps}throw Error(J(156,t.tag))}function ha(e){e.flags|=4}function Np(e,t,n,i,a){var s;if((s=(e.mode&32)!==0)&&(s=n===null?wy(t,i):wy(t,i)&&(i.src!==n.src||i.srcSet!==n.srcSet)),s){if(e.flags|=16777216,(a&335544128)===a)if(e.stateNode.complete)e.flags|=8192;else if(jS())e.flags|=8192;else throw Ys=sh,_g}else e.flags&=-16777217}function j_(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!AM(t))if(jS())e.flags|=8192;else throw Ys=sh,_g}function Mu(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Zy():536870912,e.lanes|=t,co|=t)}function fl(e,t){if(!Kt)switch(e.tailMode){case"visible":break;case"collapsed":for(var n=e.tail,i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function Ae(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags&1206910976,i|=a.flags&1206910976,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags,i|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function WT(e,t,n){var i=t.pendingProps;switch(mg(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ae(t),null;case 1:return Ae(t),null;case 3:return n=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),ma(ke),so(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Nr(t)?ha(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,wp())),Ae(t),null;case 26:var a=t.type,s=t.memoizedState;return e===null?(ha(t),s!==null?(Ae(t),j_(t,s)):(Ae(t),Np(t,a,null,i,n))):s?s!==e.memoizedState?(ha(t),Ae(t),j_(t,s)):(Ae(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&ha(t),Ae(t),Np(t,a,e,i,n)),null;case 27:if(Qu(t),n=Qa.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&ha(t);else{if(!i){if(t.stateNode===null)throw Error(J(166));return Ae(t),t.subtreeFlags&=-33554433,null}e=Ki.current,Nr(t)?T_(t,e):(e=MM(a,i,n),t.stateNode=e,ha(t))}return Ae(t),t.subtreeFlags&=-33554433,null;case 5:if(Qu(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&ha(t);else{if(!i){if(t.stateNode===null)throw Error(J(166));return Ae(t),t.subtreeFlags&=-33554433,null}if(s=Ki.current,Nr(t))T_(t,s);else{var r=Wl(Qa.current);switch(s){case 1:s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":s=r.createElement("div"),s.innerHTML="<script><\/script>",s=s.removeChild(s.firstChild);break;case"select":s=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?s.multiple=!0:i.size&&(s.size=i.size);break;default:s=typeof i.is=="string"?r.createElement(a,{is:i.is}):r.createElement(a)}}s[on]=t,s[In]=i;t:for(r=t.child;r!==null;){if(r.tag===5||r.tag===6)s.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break t;for(;r.sibling===null;){if(r.return===null||r.return===t)break t;r=r.return}r.sibling.return=r.return,r=r.sibling}t.stateNode=s;t:switch(hn(s,a,i),a){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break t;case"img":i=!0;break t;default:i=!1}i&&ha(t)}}return Ae(t),t.subtreeFlags&=-33554433,Np(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&ha(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(J(166));if(e=Qa.current,Nr(t)){if(e=t.stateNode,n=t.memoizedProps,i=null,a=en,a!==null)switch(a.tag){case 27:case 5:i=a.memoizedProps}e[on]=t,e=!!(e.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||uM(e.nodeValue,n)),e||ls(t,!0)}else e=Wl(e).createTextNode(i),e[on]=t,t.stateNode=e}return Ae(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(i=Nr(t),n!==null){if(e===null){if(!i)throw Error(J(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(J(557));e[on]=t}else Js(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ae(t),e=!1}else n=wp(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Gn(t),t):(Gn(t),null);if((t.flags&128)!==0)throw Error(J(558))}return Ae(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Nr(t),i!==null&&i.dehydrated!==null){if(e===null){if(!a)throw Error(J(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(J(317));a[on]=t}else Js(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ae(t),a=!1}else a=wp(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(Gn(t),t):(Gn(t),null)}return Gn(t),(t.flags&128)!==0?(t.lanes=n,t):(n=i!==null,e=e!==null&&e.memoizedState!==null,n&&(i=t.child,a=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(a=i.alternate.memoizedState.cachePool.pool),s=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(s=i.memoizedState.cachePool.pool),s!==a&&(i.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Mu(t,t.updateQueue),Ae(t),null);case 4:return so(),e===null&&Wg(t.stateNode.containerInfo),t.flags|=67108864,Ae(t),null;case 10:return ma(t.type),Ae(t),null;case 19:if(Sg(t),i=t.memoizedState,i===null)return Ae(t),null;if(a=(t.flags&128)!==0,s=i.rendering,s===null)if(a)fl(i,!1);else{if(Be!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(s=oh(e),s!==null){for(t.flags|=128,fl(i,!1),e=s.updateQueue,t.updateQueue=e,Mu(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Tx(n,e),n=n.sibling;return Vl(t,un.current&1|2),Kt&&fa(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&Wn()>vh&&(t.flags|=128,a=!0,fl(i,!1),t.lanes=4194304)}else{if(!a)if(e=oh(s),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Mu(t,e),fl(i,!0),i.tail===null&&i.tailMode!=="collapsed"&&i.tailMode!=="visible"&&!s.alternate&&!Kt)return Ae(t),null}else 2*Wn()-i.renderingStartTime>vh&&n!==536870912&&(t.flags|=128,a=!0,fl(i,!1),t.lanes=4194304);i.isBackwards?(s.sibling=t.child,t.child=s):(e=i.last,e!==null?e.sibling=s:t.child=s,i.last=s)}if(i.tail!==null){e=i.tail;t:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break t}n=n.sibling}n=!0}return i.rendering=e,i.tail=e.sibling,i.renderingStartTime=Wn(),e.sibling=null,s=un.current,s=a?s&1|2:s&1,i.tailMode==="visible"||i.tailMode==="collapsed"||!n||Kt?Vl(t,s):(n=s,Ce(fn,t),Ce(un,n),gn===null&&(gn=t)),Kt&&fa(t,i.treeForkCount),e}return Ae(t),null;case 22:case 23:return Gn(t),xg(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(n&536870912)!==0&&(t.flags&128)===0&&(Ae(t),t.subtreeFlags&6&&(t.flags|=8192)):Ae(t),n=t.updateQueue,n!==null&&Mu(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==n&&(t.flags|=2048),e!==null&&cn(qs),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),ma(ke),Ae(t),null;case 25:return null;case 30:return t.flags|=33554432,Ae(t),null}throw Error(J(156,t.tag))}function qT(e,t){switch(mg(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ma(ke),so(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Qu(t),null;case 31:if(t.memoizedState!==null){if(Gn(t),t.alternate===null)throw Error(J(340));Js()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Gn(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(J(340));Js()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Sg(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return so(),null;case 10:return ma(t.type),null;case 22:case 23:return Gn(t),xg(),e!==null&&cn(qs),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ma(ke),null;case 25:return null;default:return null}}function ES(e,t){switch(mg(t),t.tag){case 3:ma(ke),so();break;case 26:case 27:case 5:Qu(t);break;case 4:so();break;case 31:t.memoizedState!==null&&Gn(t);break;case 13:Gn(t);break;case 19:Sg(t);break;case 10:ma(t.type);break;case 22:case 23:Gn(t),xg(),e!==null&&cn(qs);break;case 24:ma(ke)}}function ac(e,t){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var a=i.next;n=a;do{if((n.tag&e)===e){i=void 0;var s=n.create,r=n.inst;i=s(),r.destroy=i}n=n.next}while(n!==a)}}catch(o){ye(t,t.return,o)}}function us(e,t,n){try{var i=t.updateQueue,a=i!==null?i.lastEffect:null;if(a!==null){var s=a.next;i=s;do{if((i.tag&e)===e){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,a=t;var l=n,c=o;try{c()}catch(u){ye(a,l,u)}}}i=i.next}while(i!==s)}}catch(u){ye(t,t.return,u)}}function TS(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Ix(t,n)}catch(i){ye(e,e.return,i)}}}function AS(e,t,n){n.props=er(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(i){ye(e,t,i)}}function Xi(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:var a=e.stateNode,s=va(e.memoizedProps,a);(a.ref===null||a.ref.name!==s)&&(a.ref=gM(s)),i=a.ref;break;case 7:if(e.stateNode===null){var r=new Kn(e);On(e.child,!1,OA,r,void 0,void 0),e.stateNode=r}i=e.stateNode;break;default:i=e.stateNode}typeof n=="function"?e.refCleanup=n(i):n.current=i}}catch(o){ye(e,t,o)}}function rn(e,t){var n=e.ref,i=e.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(a){ye(e,t,a)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){ye(e,t,a)}else n.current=null}function fh(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)xM(e.stateNode,t[n])}function $_(e){for(var t=e.return;t!==null&&(zg(t)&&xM(e.stateNode,t.stateNode),!Bg(t));)t=t.return}function Dl(e){for(var t=e.return;t!==null&&(zg(t)&&IA(e.stateNode,t.stateNode),!Bg(t));)t=t.return}function Bg(e){return e.tag===5||e.tag===3||e.tag===27}function zg(e){return e&&e.tag===7&&e.stateNode!==null}function wm(e){var t=e.type,n=e.memoizedProps,i=e.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break t;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(a){ye(e,e.return,a)}}function Lp(e,t,n){try{var i=e.stateNode;gA(i,e.type,n,t),i[In]=t}catch(a){ye(e,e.return,a)}}function wS(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ds(e.type)||e.tag===4}function Op(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||wS(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ds(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Cm(e,t,n,i){var a=e.tag;if(a===5||a===6)a=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(a,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(a),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Yi)),fh(e,i),le=!0;else if(a!==4&&(a===27&&(fh(e,i),i=null,ds(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(Cm(e,t,n,i),e=e.sibling;e!==null;)Cm(e,t,n,i),e=e.sibling}function dh(e,t,n,i){var a=e.tag;if(a===5||a===6)a=e.stateNode,t?n.insertBefore(a,t):n.appendChild(a),fh(e,i),le=!0;else if(a!==4&&(a===27&&(fh(e,i),i=null,ds(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(dh(e,t,n,i),e=e.sibling;e!==null;)dh(e,t,n,i),e=e.sibling}function CS(e){var t=e.stateNode,n=e.memoizedProps;try{for(var i=e.type,a=t.attributes;a.length;)t.removeAttributeNode(a[0]);hn(t,i,n),t[on]=e,t[In]=n}catch(s){ye(e,e.return,s)}}var ph=!1,kn=null;function ty(e){(e.tag===30||(e.subtreeFlags&33554432)!==0)&&(ph=!0)}var Wi=null;function ey(){var e=Wi;return Wi=null,e}var Un=0;function Mo(e,t,n,i,a){return Un=0,RS(e.child,t,n,i,a)}function RS(e,t,n,i,a){for(var s=!1;e!==null;){if(e.tag===5){var r=e.stateNode;if(i!==null){var o=Zm(r);i.push(o),o.view&&(s=!0)}else s||Zm(r).view&&(s=!0);ph=!0,dM(r,Un===0?t:t+"_"+Un,n),Un++}else(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&a||RS(e.child,t,n,i,a)&&(s=!0));e=e.sibling}return s}function ji(e,t){for(;e!==null;)e.tag===5?pM(e.stateNode,e.memoizedProps):(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&t||ji(e.child,t)),e=e.sibling}function Hu(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(Hu(e),e.tag===30&&(e.flags&18874368)!==0&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name==="auto")throw Error(J(544));var n=t.name;t=ba(t.default,t.share),t!=="none"&&(Mo(e,n,t,null,!1)||ji(e.child,!1))}e=e.sibling}}function Rm(e,t){if(e.tag===30){var n=e.stateNode,i=e.memoizedProps,a=va(i,n),s=ba(i.default,n.paired?i.share:i.enter);s!=="none"?Mo(e,a,s,null,!1)?(Hu(e),n.paired||t||uo(e,i.onEnter)):ji(e.child,!1):Hu(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)Rm(e,t),e=e.sibling;else Hu(e)}function Dm(e){if(kn!==null&&kn.size!==0){var t=kn;if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var n=e.memoizedProps,i=n.name;if(i!=null&&i!=="auto"){var a=t.get(i);if(a!==void 0){var s=ba(n.default,n.share);if(s!=="none"&&(Mo(e,i,s,null,!1)?(s=e.stateNode,a.paired=s,s.paired=a,uo(e,n.onShare)):ji(e.child,!1)),t.delete(i),t.size===0)break}}}Dm(e)}e=e.sibling}}}function Um(e){if(e.tag===30){var t=e.memoizedProps,n=va(t,e.stateNode),i=kn!==null?kn.get(n):void 0,a=ba(t.default,i!==void 0?t.share:t.exit);a!=="none"&&(Mo(e,n,a,null,!1)?i!==void 0?(a=e.stateNode,i.paired=a,a.paired=i,kn.delete(n),uo(e,t.onShare)):uo(e,t.onExit):ji(e.child,!1)),kn!==null&&Dm(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)Um(e),e=e.sibling;else kn!==null&&Dm(e)}function DS(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=va(t,e.stateNode);t=ba(t.default,t.update),e.flags&=-5,t!=="none"&&Mo(e,n,t,e.memoizedState=[],!1)}else(e.subtreeFlags&33554432)!==0&&DS(e);e=e.sibling}}function Nm(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var t=e.stateNode;t.paired!==null&&(t.paired=null,ji(e.child,!1))}Nm(e)}e=e.sibling}}function Vu(e){if(e.tag===30)e.stateNode.paired=null,ji(e.child,!1),Nm(e);else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)Vu(e),e=e.sibling;else Nm(e)}function US(e){for(e=e.child;e!==null;)e.tag===30?ji(e.child,!1):(e.subtreeFlags&33554432)!==0&&US(e),e=e.sibling}function Fg(e,t,n,i,a,s,r){for(var o=!1;t!==null;){if(t.tag===5){var l=t.stateNode;if(s!==null&&Un<s.length){var c=s[Un],u=Zm(l);(c.view||u.view)&&(o=!0);var d;if(d=(e.flags&4)===0)if(u.clip)d=!0;else{d=c.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}d&&(e.flags|=4),u.abs?u=!c.abs:(c=c.rect,u=u.rect,u=c.height!==u.height||c.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;(e.flags&4)!==0&&dM(l,Un===0?n:n+"_"+Un,a),o&&(e.flags&4)!==0||(Wi===null&&(Wi=[]),Wi.push(l,Un===0?i:i+"_"+Un,t.memoizedProps)),Un++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&r?e.flags|=t.flags&32:Fg(e,t.child,n,i,a,s,r)&&(o=!0));t=t.sibling}return o}function NS(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,i=e.stateNode,a=va(n,i),s=ba(n.default,n.update);if(t){i=i.clones;var r=i===null?null:i.map(MA)}else r=e.memoizedState,e.memoizedState=null;i=e;var o=e.child;Un=0,a=Fg(i,o,a,a,s,r,!1),(e.flags&4)!==0&&a&&(t||uo(e,n.onUpdate))}else(e.subtreeFlags&33554432)!==0&&NS(e,t);e=e.sibling}}var je=!1,pe=!1,Vi=!1,Ip=!1,ny=typeof WeakSet=="function"?WeakSet:Set,$e=null,Gi=!1,xl=!1,mh=!1,Lm=!1;function YT(e,t,n){if(e=e.containerInfo,Wm=vo,e=vx(e),hg(e)){if("selectionStart"in e)var i={start:e.selectionStart,end:e.selectionEnd};else t:{i=(i=e.ownerDocument)&&i.defaultView||window;var a=i.getSelection&&i.getSelection();if(a&&a.rangeCount!==0){i=a.anchorNode;var s=a.anchorOffset,r=a.focusNode;a=a.focusOffset;try{i.nodeType,r.nodeType}catch{i=null;break t}var o=0,l=-1,c=-1,u=0,d=0,f=e,p=null;e:for(;;){for(var g;f!==i||s!==0&&f.nodeType!==3||(l=o+s),f!==r||a!==0&&f.nodeType!==3||(c=o+a),f.nodeType===3&&(o+=f.nodeValue.length),(g=f.firstChild)!==null;)p=f,f=g;for(;;){if(f===e)break e;if(p===i&&++u===s&&(l=o),p===r&&++d===a&&(c=o),(g=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=g}i=l===-1||c===-1?null:{start:l,end:c}}else i=null}i=i||{start:0,end:0}}else i=null;for(qm={focusedElem:e,selectionRange:i},vo=!1,n=(n&335544064)===n,$e=t,t=n?9270:1024;$e!==null;){if(e=$e,n&&(i=e.deletions,i!==null))for(s=0;s<i.length;s++)n&&Um(i[s]);if(e.alternate===null&&(e.flags&2)!==0)n&&ty(e),bu(n);else{if(e.tag===22){if(i=e.alternate,e.memoizedState!==null){i!==null&&i.memoizedState===null&&n&&Um(i),bu(n);continue}else if(i!==null&&i.memoizedState!==null){n&&ty(e),bu(n);continue}}i=e.child,(e.subtreeFlags&t)!==0&&i!==null?(i.return=e,$e=i):(n&&DS(e),bu(n))}}kn=null}function bu(e){for(;$e!==null;){var t=$e,n=e,i=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if((a&1024)!==0&&i!==null){n=void 0,a=i.memoizedProps,i=i.memoizedState;var s=t.stateNode;try{var r=er(t.type,a);n=s.getSnapshotBeforeUpdate(r,i),s.__reactInternalSnapshotBeforeUpdate=n}catch(o){ye(t,t.return,o)}}break;case 3:if((a&1024)!==0){if(i=t.stateNode.containerInfo,n=i.nodeType,n===9)Jm(i);else if(n===1)switch(i.nodeName){case"HEAD":case"HTML":case"BODY":Jm(i);break;default:i.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&i!==null&&(n=va(i.memoizedProps,i.stateNode),a=t.memoizedProps,a=ba(a.default,a.update),a!=="none"&&Mo(i,n,a,i.memoizedState=[],!0));break;default:if((a&1024)!==0)throw Error(J(163))}if(i=t.sibling,i!==null){i.return=t.return,$e=i;break}$e=t.return}}function LS(e,t,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:ki(e,n),i&4&&ac(5,n);break;case 1:if(ki(e,n),i&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(r){ye(n,n.return,r)}else{var a=er(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(a,t,e.__reactInternalSnapshotBeforeUpdate)}catch(r){ye(n,n.return,r)}}i&64&&TS(n),i&512&&Xi(n,n.return);break;case 3:if(ki(e,n),i&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Ix(e,t)}catch(r){ye(n,n.return,r)}}break;case 27:t===null&&i&4&&CS(n);case 26:case 5:ki(e,n),t===null&&i&4&&wm(n),i&512&&Xi(n,n.return);break;case 12:ki(e,n);break;case 31:ki(e,n),i&4&&BS(e,n);break;case 13:ki(e,n),i&4&&zS(e,n),i&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=sA.bind(null,n),zA(e,n))));break;case 22:if(i=n.memoizedState!==null||je,!i){var s=t!==null&&t.memoizedState!==null||pe;t=je,a=pe,je=i,(pe=s)&&!a?(i=2,(n.subtreeFlags&8772)!==0&&(i|=1),Ai(e,n,i)):ki(e,n),je=t,pe=a}break;case 30:ki(e,n),i&512&&Xi(n,n.return);break;case 7:i&512&&Xi(n,n.return);default:ki(e,n)}}function Om(e,t){for(e=e.child;e!==null;)OS(e,t),e=e.sibling}function OS(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var i=n.style;typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"}else{var a=e.stateNode,s=e.memoizedProps.style,r=s!=null&&s.hasOwnProperty("display")?s.display:null;a.style.display=r==null||typeof r=="boolean"?"":(""+r).trim()}}catch(l){ye(e,e.return,l)}Im(e,t);break;case 6:try{e.stateNode.nodeValue=t?"":e.memoizedProps,le=!0}catch(l){ye(e,e.return,l)}break;case 18:try{var o=e.stateNode;t?_y(o,!0):_y(e.stateNode,!1)}catch(l){ye(e,e.return,l)}break;case 22:case 23:e.memoizedState===null&&Om(e,t);break;default:Om(e,t)}}function Im(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){t:{var n=e,i=t;switch(n.tag){case 4:OS(n,i);break t;case 22:n.memoizedState===null&&Im(n,i);break t;default:Im(n,i)}}e=e.sibling}}function IS(e){var t=e.alternate;t!==null&&(e.alternate=null,IS(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Th(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ne=null,Rn=!1;function Ti(e,t,n){for(n=n.child;n!==null;)PS(e,t,n),n=n.sibling}function PS(e,t,n){if(qn&&typeof qn.onCommitFiberUnmount=="function")try{qn.onCommitFiberUnmount(Ql,n)}catch{}switch(n.tag){case 26:pe||rn(n,t),Ti(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!pe&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:pe||rn(n,t),Dl(n);var i=Ne,a=Rn;ds(n.type)&&(Ne=n.stateNode,Rn=!1),Ti(e,t,n),bM(n.stateNode,n.type,n.memoizedProps),Ne=i,Rn=a;break;case 5:pe||rn(n,t),Dl(n);case 6:if(n.tag===6&&Dl(n),i=Ne,a=Rn,Ne=null,Ti(e,t,n),Ne=i,Rn=a,Ne!==null)if(Rn)try{(Ne.nodeType===9?Ne.body:Ne.nodeName==="HTML"?Ne.ownerDocument.body:Ne).removeChild(n.stateNode),le=!0}catch(s){ye(n,t,s)}else try{Ne.removeChild(n.stateNode),le=!0}catch(s){ye(n,t,s)}break;case 18:Ne!==null&&(Rn?(e=Ne,vy(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),_o(e)):vy(Ne,n.stateNode));break;case 4:i=Ne,a=Rn,Ne=n.stateNode.containerInfo,Rn=!0,Ti(e,t,n),Ne=i,Rn=a;break;case 0:case 11:case 14:case 15:us(2,n,t),pe||us(4,n,t),Ti(e,t,n);break;case 1:pe||(rn(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"&&AS(n,t,i)),Ti(e,t,n);break;case 21:Ti(e,t,n);break;case 22:pe=(i=pe)||n.memoizedState!==null,Ti(e,t,n),pe=i;break;case 30:rn(n,t),Ti(e,t,n);break;case 7:pe||rn(n,t),Ti(e,t,n);break;default:Ti(e,t,n)}}function BS(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{_o(e)}catch(n){ye(t,t.return,n)}}}function zS(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{_o(e)}catch(n){ye(t,t.return,n)}}function ZT(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new ny),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new ny),t;default:throw Error(J(435,e.tag))}}function Eu(e,t){var n=ZT(e);t.forEach(function(i){if(!n.has(i)){n.add(i);var a=rA.bind(null,e,i);i.then(a,a)}})}function bn(e,t,n){var i=t.deletions;if(i!==null)for(var a=0;a<i.length;a++){var s=i[a],r=e,o=t,l=o;t:for(;l!==null;){switch(l.tag){case 27:if(ds(l.type)){Ne=l.stateNode,Rn=!1;break t}break;case 5:Ne=l.stateNode,Rn=!1;break t;case 3:case 4:Ne=l.stateNode.containerInfo,Rn=!0;break t}l=l.return}if(Ne===null)throw Error(J(160));PS(r,o,s),Ne=null,Rn=!1,r=s.alternate,r!==null&&(r.return=null),s.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)FS(t,e,n),t=t.sibling}var wi=null;function FS(e,t,n){var i=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(i=e.updateQueue,i=i!==null?i.events:null,i!==null))for(var s=0;s<i.length;s++){var r=i[s];r.ref.impl=r.nextImpl}bn(t,e,n),En(e),a&4&&(us(3,e,e.return),ac(3,e),us(5,e,e.return));break;case 1:bn(t,e,n),En(e),a&512&&(pe||i===null||rn(i,i.return)),a&64&&je&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(s=wi,bn(t,e,n),En(e),a&512&&(pe||i===null||rn(i,i.return)),a&4)if(a=i!==null?i.memoizedState:null,n=e.memoizedState,i===null)if(n===null)if(e.stateNode===null)if(je)e.stateNode=fM(e.type,e.memoizedProps,t.containerInfo,e);else{t:{t=e.type,n=e.memoizedProps,a=s.ownerDocument||s;e:switch(t){case"title":i=a.getElementsByTagName("title")[0],(!i||i[tc]||i[on]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=a.createElement(t),a.head.insertBefore(i,a.querySelector("head > title"))),hn(i,t,n),i[on]=e,tn(i),t=i;break t;case"link":if(s=Ay("link","href",a).get(t+(n.href||""))){for(r=0;r<s.length;r++)if(i=s[r],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(r,1);break e}}i=a.createElement(t),hn(i,t,n),a.head.appendChild(i);break;case"meta":if(s=Ay("meta","content",a).get(t+(n.content||""))){for(r=0;r<s.length;r++)if(i=s[r],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){s.splice(r,1);break e}}i=a.createElement(t),hn(i,t,n),a.head.appendChild(i);break;default:throw Error(J(468,t))}i[on]=e,tn(i),t=i}e.stateNode=t}else je||jm(s,e.type,e.stateNode);else e.stateNode=Ty(s,n,e.memoizedProps);else a!==n?(a===null?(t=i.stateNode,t===null||pe||t.parentNode.removeChild(t)):a.count--,n===null?je||jm(s,e.type,e.stateNode):Ty(s,n,e.memoizedProps)):n===null&&e.stateNode!==null&&Lp(e,e.memoizedProps,i.memoizedProps);break;case 27:bn(t,e,n),En(e),a&512&&(pe||i===null||rn(i,i.return)),i!==null&&a&4&&Lp(e,e.memoizedProps,i.memoizedProps);break;case 5:if(s=Vi,Vi=!1,bn(t,e,n),Vi=s,En(e),a&512&&(pe||i===null||rn(i,i.return)),e.flags&32){t=e.stateNode;try{oo(t,""),le=!0}catch(u){ye(e,e.return,u)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,Lp(e,t,i!==null?i.memoizedProps:t)),a&1024&&(Ip=!0);break;case 6:if(bn(t,e,n),En(e),a&4){if(e.stateNode===null)throw Error(J(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,le=!0}catch(u){ye(e,e.return,u)}}break;case 3:if(le=!1,Wu=null,s=wi,wi=ql(t.containerInfo),bn(t,e,n),wi=s,En(e),a&4&&i!==null&&i.memoizedState.isDehydrated)try{_o(t.containerInfo)}catch(u){ye(e,e.return,u)}Ip&&(Ip=!1,HS(e)),le=!1;break;case 4:a=Vi,Vi=je,i=l_(),s=wi,wi=ql(e.stateNode.containerInfo),bn(t,e,n),En(e),wi=s,le&&xl&&(mh=!0),le=i,Vi=a;break;case 12:bn(t,e,n),En(e);break;case 31:bn(t,e,n),En(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Eu(e,t)));break;case 13:bn(t,e,n),En(e),e.child.flags&8192&&e.memoizedState!==null!=(i!==null&&i.memoizedState!==null)&&(zh=Wn()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Eu(e,t)));break;case 22:s=e.memoizedState!==null,r=i!==null&&i.memoizedState!==null;var o=je,l=pe,c=Vi;je=o||s,Vi=c||s,pe=l||r,bn(t,e,n),pe=l,Vi=c,je=o,En(e),a&8192&&(t=e.stateNode,t._visibility=s?t._visibility&-2:t._visibility|1,!s||i===null||r||je||pe||(t=r||pe,n=je,i=pe,je=s||je,pe=t,Va(e,2),je=n,pe=i),!s&&Vi||Om(e,s)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,Eu(e,n))));break;case 19:bn(t,e,n),En(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Eu(e,t)));break;case 30:a&512&&(pe||i===null||rn(i,i.return)),a=l_(),s=xl,r=(n&335544064)===n,o=e.memoizedProps,xl=r&&ba(o.default,o.update)!=="none",bn(t,e,n),En(e),r&&i!==null&&le&&(e.flags|=4),xl=s,le=a;break;case 21:break;case 7:a&512&&(pe||i===null||rn(i,i.return)),i&&i.stateNode!==null&&(i.stateNode._fragmentFiber=e);default:bn(t,e,n),En(e)}}function En(e){var t=e.flags;if(t&2){try{for(var n,i=e.return;i!==null;){if(wS(i)){n=i;break}i=i.return}i=null;for(var a=e.return;a!==null;){if(zg(a)){var s=a.stateNode;i===null?i=[s]:i.push(s)}if(Bg(a))break;a=a.return}var r=i;if(n==null)throw Error(J(160));switch(n.tag){case 27:var o=n.stateNode,l=Op(e);dh(e,l,o,r);break;case 5:var c=n.stateNode;n.flags&32&&(oo(c,""),n.flags&=-33);var u=Op(e);dh(e,u,c,r);break;case 3:case 4:var d=n.stateNode.containerInfo,f=Op(e);Cm(e,f,d,r);break;default:throw Error(J(161))}}catch(p){ye(e,e.return,p)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function HS(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;HS(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,vo=!0,t.reset(),vo=!1),e=e.sibling}}function Lr(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)VS(t,e),t=t.sibling;else NS(t,!1)}function VS(e,t){var n=e.alternate;if(n===null)Rm(e,!1);else switch(e.tag){case 3:if(Lm=Gi=!1,ey(),Lr(t,e),!Gi&&!mh){if(e=Wi,e!==null)for(var i=0;i<e.length;i+=3){n=e[i];var a=e[i+1];pM(n,e[i+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+a+")"})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===""&&(e.style.viewTransitionName="none",e.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),Lm=!0}Wi=null;break;case 5:Lr(t,e);break;case 4:i=Gi,Gi=!1,Lr(t,e),Gi&&(mh=!0),Gi=i;break;case 22:e.memoizedState===null&&(n.memoizedState!==null?Rm(e,!1):Lr(t,e));break;case 30:i=Gi,a=ey(),Gi=!1,Lr(t,e),Gi&&(e.flags|=4);var s=e.memoizedProps,r=e.stateNode;t=va(s,r),r=va(n.memoizedProps,r);var o=ba(s.default,s.update);o==="none"?t=!1:(s=n.memoizedState,n.memoizedState=null,n=e.child,Un=0,t=Fg(e,n,t,r,o,s,!0),Un!==(s===null?0:s.length)&&(e.flags|=32)),(e.flags&4)!==0&&t?(uo(e,e.memoizedProps.onUpdate),Wi=a):a!==null&&(a.push.apply(a,Wi),Wi=a),Gi=(e.flags&32)!==0?!0:i;break;default:Lr(t,e)}}function ki(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)LS(e,t.alternate,t),t=t.sibling}function Va(e,t){for(e=e.child;e!==null;){var n=e,i=t;switch(n.tag){case 0:case 11:case 14:case 15:us(4,n,n.return),Va(n,i);break;case 1:rn(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&AS(n,n.return,a),Va(n,i);break;case 27:(i&2)!==0&&bM(n.stateNode,n.type,n.memoizedProps);case 5:rn(n,n.return),n.tag!==5&&n.tag!==27||Dl(n),Va(n,i);break;case 6:Dl(n);break;case 26:rn(n,n.return),a=n.stateNode,n.memoizedState!==null||a===null||pe||a.parentNode.removeChild(a),Va(n,i);break;case 22:n.memoizedState===null&&Va(n,i);break;case 30:rn(n,n.return),Va(n,i);break;case 7:rn(n,n.return);default:Va(n,i)}e=e.sibling}}function Ai(e,t,n){for(n=(t.subtreeFlags&8772)!==0?n:n&-2,t=t.child;t!==null;){var i=t.alternate,a=e,s=t,r=s.flags,o=(n&1)!==0;switch(s.tag){case 0:case 11:case 15:Ai(a,s,n),ac(4,s);break;case 1:if(Ai(a,s,n),i=s,a=i.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(u){ye(i,i.return,u)}if(i=s,a=i.updateQueue,a!==null){var l=i.stateNode;try{var c=a.shared.hiddenCallbacks;if(c!==null)for(a.shared.hiddenCallbacks=null,a=0;a<c.length;a++)Ox(c[a],l)}catch(u){ye(i,i.return,u)}}o&&r&64&&TS(s),Xi(s,s.return);break;case 27:(n&2)!==0&&CS(s);case 5:s.tag!==5&&s.tag!==27||$_(s),Ai(a,s,n),o&&i===null&&r&4&&wm(s),Xi(s,s.return);break;case 6:$_(s);break;case 26:l=s.stateNode,s.memoizedState!==null||l===null||je||jm(ql(l.ownerDocument),s.type,l),Ai(a,s,n),o&&i===null&&r&4&&wm(s),Xi(s,s.return);break;case 12:Ai(a,s,n);break;case 31:Ai(a,s,n),o&&r&4&&BS(a,s);break;case 13:Ai(a,s,n),o&&r&4&&zS(a,s);break;case 22:s.memoizedState===null&&Ai(a,s,n),Xi(s,s.return);break;case 30:Ai(a,s,n),Xi(s,s.return);break;case 7:Xi(s,s.return);default:Ai(a,s,n)}t=t.sibling}}function Hg(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&nc(n))}function Vg(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&nc(e))}function ci(e,t,n,i){var a=(n&335544064)===n;if(t.subtreeFlags&(a?10262:10256))for(t=t.child;t!==null;)GS(e,t,n,i),t=t.sibling;else a&&US(t)}function GS(e,t,n,i){var a=(n&335544064)===n;a&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&Vu(t);var s=t.flags;switch(t.tag){case 0:case 11:case 15:ci(e,t,n,i),s&2048&&ac(9,t);break;case 1:ci(e,t,n,i);break;case 3:ci(e,t,n,i),a&&Lm&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,e.style.viewTransitionName==="root"&&(e.style.viewTransitionName=""),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName==="none"&&(e.style.viewTransitionName="")),s&2048&&(s=null,t.alternate!==null&&(s=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==s&&(t.refCount++,s!=null&&nc(s)));break;case 12:if(s&2048){ci(e,t,n,i),s=t.stateNode;try{var r=t.memoizedProps,o=r.id,l=r.onPostCommit;typeof l=="function"&&l(o,t.alternate===null?"mount":"update",s.passiveEffectDuration,-0)}catch(c){ye(t,t.return,c)}}else ci(e,t,n,i);break;case 31:ci(e,t,n,i);break;case 13:ci(e,t,n,i);break;case 23:break;case 22:r=t.stateNode,o=t.alternate,t.memoizedState!==null?(a&&o!==null&&o.memoizedState===null&&Vu(o),r._visibility&2?ci(e,t,n,i):Ul(e,t)):(a&&o!==null&&o.memoizedState!==null&&Vu(t),r._visibility&2?ci(e,t,n,i):(r._visibility|=2,Ir(e,t,n,i,(t.subtreeFlags&10256)!==0||!1))),s&2048&&Hg(o,t);break;case 24:ci(e,t,n,i),s&2048&&Vg(t.alternate,t);break;case 30:a&&(s=t.alternate,s!==null&&(ji(s.child,!0),ji(t.child,!0))),ci(e,t,n,i);break;default:ci(e,t,n,i)}}function Ir(e,t,n,i,a){for(a=a&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var s=e,r=t,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:Ir(s,r,o,l,a),ac(8,r);break;case 23:break;case 22:var u=r.stateNode;r.memoizedState!==null?u._visibility&2?Ir(s,r,o,l,a):Ul(s,r):(u._visibility|=2,Ir(s,r,o,l,a)),a&&c&2048&&Hg(r.alternate,r);break;case 24:Ir(s,r,o,l,a),a&&c&2048&&Vg(r.alternate,r);break;default:Ir(s,r,o,l,a)}t=t.sibling}}function Ul(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,i=t,a=i.flags;switch(i.tag){case 22:Ul(n,i),a&2048&&Hg(i.alternate,i);break;case 24:Ul(n,i),a&2048&&Vg(i.alternate,i);break;default:Ul(n,i)}t=t.sibling}}var Vs=8192;function zs(e,t,n){if(e.subtreeFlags&Vs)for(e=e.child;e!==null;)kS(e,t,n),e=e.sibling}function kS(e,t,n){switch(e.tag){case 26:zs(e,t,n),e.flags&Vs&&(e.memoizedState!==null?jA(n,wi,e.memoizedState,e.memoizedProps):(e=e.stateNode,(t&335544128)===t&&Cy(n,e)));break;case 5:zs(e,t,n),e.flags&Vs&&(e=e.stateNode,(t&335544128)===t&&Cy(n,e));break;case 3:case 4:var i=wi;wi=ql(e.stateNode.containerInfo),zs(e,t,n),wi=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=Vs,Vs=16777216,zs(e,t,n),Vs=i):zs(e,t,n));break;case 30:if((e.flags&Vs)!==0&&(i=e.memoizedProps.name,i!=null&&i!=="auto")){var a=e.stateNode;a.paired=null,kn===null&&(kn=new Map),kn.set(i,a)}zs(e,t,n);break;default:zs(e,t,n)}}function XS(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function dl(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];$e=i,qS(i,e)}XS(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)WS(e),e=e.sibling}function WS(e){switch(e.tag){case 0:case 11:case 15:dl(e),e.flags&2048&&us(9,e,e.return);break;case 3:dl(e);break;case 12:dl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Gu(e)):dl(e);break;default:dl(e)}}function Gu(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];$e=i,qS(i,e)}XS(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:us(8,t,t.return),Gu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Gu(t));break;default:Gu(t)}e=e.sibling}}function qS(e,t){for(;$e!==null;){var n=$e;switch(n.tag){case 0:case 11:case 15:us(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:nc(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,$e=i;else t:for(n=e;$e!==null;){i=$e;var a=i.sibling,s=i.return;if(IS(i),i===n){$e=null;break t}if(a!==null){a.return=s,$e=a;break t}$e=s}}}var JT={getCacheForType:function(e){var t=ln(ke),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return ln(ke).controller.signal}},KT=typeof WeakMap=="function"?WeakMap:Map,he=0,be=null,jt=null,te=0,ve=0,Hn=null,Za=!1,bo=!1,Gg=!1,Sa=0,Be=0,hs=0,Zs=0,gh=0,Xn=0,co=0,Nl=null,Dn=null,Pm=!1,zh=0,YS=0,vh=1/0,_h=null,is=null,Ie=0,Ri=null,nr=null,Qi=0,Bm=0,zm=null,ZS=null,no=null,io=null,ao=null,Ll=0,ku=null;function Zn(){return(he&2)!==0&&te!==0?te&-te:It.T!==null?Xg():jy()}function JS(){if(Xn===0)if((te&536870912)===0||Kt){var e=hu;hu<<=1,(hu&3932160)===0&&(hu=262144),Xn=e}else Xn=536870912;return e=fn.current,e!==null&&(e.flags|=32),Xn}function uo(e,t){if(t!=null){var n=e.stateNode,i=n.ref;i===null&&(i=n.ref=gM(va(e.memoizedProps,n))),io===null&&(io=[]),io.push(t.bind(null,i))}}function Ln(e,t,n){(e===be&&(ve===2||ve===9)||e.cancelPendingCommit!==null)&&(ho(e,0),Ja(e,te,Xn,!1)),$l(e,n),((he&2)===0||e!==be)&&(e===be&&((he&2)===0&&(Zs|=n),Be===4&&Ja(e,te,Xn,!1)),ta(e))}function KS(e,t,n){if((he&6)!==0)throw Error(J(327));var i=!n&&(t&127)===0&&(t&e.expiredLanes)===0||jl(e,t),a=i?$T(e,t):Pp(e,t,!0),s=i;do{if(a===0){bo&&!i&&Ja(e,t,0,!1);break}else{if(n=e.current.alternate,s&&!QT(n)){a=Pp(e,t,!1),s=!1;continue}if(a===2){if(s=t,e.errorRecoveryDisabledLanes&s)var r=0;else r=e.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){t=r;t:{var o=e;a=Nl;var l=o.current.memoizedState.isDehydrated;if(l&&(ho(o,r).flags|=256),r=Pp(o,r,!1),r!==2&&r!==6){if(Gg&&!l){o.errorRecoveryDisabledLanes|=s,Zs|=s,a=4;break t}s=Dn,Dn=a,s!==null&&(Dn===null?Dn=s:Dn.push.apply(Dn,s))}a=r}if(s=!1,a!==2)continue}}if(a===1){ho(e,0),Ja(e,t,0,!0);break}t:{switch(i=e,s=a,s){case 0:case 1:throw Error(J(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Ja(i,t,Xn,!Za);break t;case 2:Dn=null;break;case 3:case 5:break;default:throw Error(J(329))}if((t&62914560)===t&&(a=zh+300-Wn(),10<a)){if(Ja(i,t,Xn,!Za),Eh(i,0,!0)!==0)break t;Qi=t,i.timeoutHandle=qg(iy.bind(null,i,n,Dn,_h,Pm,t,Xn,Zs,co,Za,s,"Throttled",-0,0),a);break t}iy(i,n,Dn,_h,Pm,t,Xn,Zs,co,Za,s,null,-0,0)}}break}while(!0);ta(e)}function iy(e,t,n,i,a,s,r,o,l,c,u,d,f,p){e.timeoutHandle=-1;var g=t.subtreeFlags,x=(s&335544064)===s;if(d=null,(x||g&8192||(g&16785408)===16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Yi},kn=null,kS(t,s,d),x&&(g=d,x=e.containerInfo,x=(x.nodeType===9?x:x.ownerDocument).__reactViewTransition,x!=null&&(g.count++,g.waitingForViewTransition=!0,g=Yl.bind(g),x.finished.then(g,g))),g=(s&62914560)===s?zh-Wn():(s&4194048)===s?YS-Wn():0,g=$A(d,g),g!==null)){Qi=s,e.cancelPendingCommit=g(sy.bind(null,e,t,s,n,i,a,r,o,l,c,u,d,null,f,p)),Ja(e,s,r,!c);return}sy(e,t,s,n,i,a,r,o,l,c,u,d)}function QT(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var a=n[i],s=a.getSnapshot;a=a.value;try{if(!Jn(s(),a))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Ja(e,t,n,i){t=Yy(e,t),t&=~gh,t&=~Zs,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var a=t;0<a;){var s=31-Yn(a),r=1<<s;i[s]=-1,a&=~r}n!==0&&Jy(e,n,t)}function Fh(){return(he&6)===0?(sc(0,!1),!1):!0}function kg(){if(jt!==null){if(ve===0)var e=jt.return;else e=jt,da=or=null,Ag(e),$r=null,Hl=0,e=jt;for(;e!==null;)ES(e.alternate,e),e=e.return;jt=null}}function ho(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,yA(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Qi=0,kg(),be=e,jt=n=pa(e.current,null),te=t,ve=0,Hn=null,Za=!1,bo=jl(e,t),Gg=!1,co=Xn=gh=Zs=hs=Be=0,Dn=Nl=null,Pm=!1,Sa=Yy(e,t),Rh(),n}function QS(e,t){Xt=null,It.H=uh,t===So||t===Nh?(t=D_(),ve=3):t===_g?(t=D_(),ve=4):ve=t===Og?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Hn=t,jt===null&&(Be=1,hh(e,pi(t,e.current)))}function jS(){var e=fn.current;return e===null?!0:(te&4194048)===te?gn===null:(te&62914560)===te||(te&536870912)!==0?e===gn:!1}function $S(){var e=It.H;return It.H=uh,e===null?uh:e}function tM(){var e=It.A;return It.A=JT,e}function yh(){Be=4,Za||(te&4194048)!==te&&fn.current!==null||(bo=!0),(hs&134217727)===0&&(Zs&134217727)===0||be===null||Ja(be,te,Xn,!1)}function Pp(e,t,n){var i=he;he|=2;var a=$S(),s=tM();(be!==e||te!==t)&&(_h=null,ho(e,t)),t=!1;var r=Be;t:do try{if(ve!==0&&jt!==null){var o=jt,l=Hn;switch(ve){case 8:kg(),r=6;break t;case 3:case 2:case 9:case 6:fn.current===null&&(t=!0);var c=ve;if(ve=0,Hn=null,Zr(e,o,l,c),n&&bo){r=0;break t}break;default:c=ve,ve=0,Hn=null,Zr(e,o,l,c)}}jT(),r=Be;break}catch(u){QS(e,u)}while(!0);return t&&e.shellSuspendCounter++,da=or=null,he=i,It.H=a,It.A=s,jt===null&&(be=null,te=0,Rh()),r}function jT(){for(;jt!==null;)eM(jt)}function $T(e,t){var n=he;he|=2;var i=$S(),a=tM();be!==e||te!==t?(_h=null,vh=Wn()+500,ho(e,t)):bo=jl(e,t);t:do try{if(ve!==0&&jt!==null){t=jt;var s=Hn;e:switch(ve){case 1:ve=0,Hn=null,Zr(e,t,s,1);break;case 2:case 9:if(R_(s)){ve=0,Hn=null,ay(t);break}t=function(){ve!==2&&ve!==9||be!==e||(ve=7),ta(e)},s.then(t,t);break t;case 3:ve=7;break t;case 4:ve=5;break t;case 7:R_(s)?(ve=0,Hn=null,ay(t)):(ve=0,Hn=null,Zr(e,t,s,7));break;case 5:var r=null;switch(jt.tag){case 26:r=jt.memoizedState;case 5:case 27:var o=jt;if(r?AM(r):o.stateNode.complete){ve=0,Hn=null;var l=o.sibling;if(l!==null)jt=l;else{var c=o.return;c!==null?(jt=c,Hh(c)):jt=null}break e}}ve=0,Hn=null,Zr(e,t,s,5);break;case 6:ve=0,Hn=null,Zr(e,t,s,6);break;case 8:kg(),Be=6;break t;default:throw Error(J(462))}}tA();break}catch(u){QS(e,u)}while(!0);return da=or=null,It.H=i,It.A=a,he=n,jt!==null?0:(be=null,te=0,Rh(),Be)}function tA(){for(;jt!==null&&!vE();)eM(jt)}function eM(e){var t=bS(e.alternate,e,Sa);e.memoizedProps=e.pendingProps,t===null?Hh(e):jt=t}function ay(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=q_(n,t,t.pendingProps,t.type,void 0,te);break;case 11:t=q_(n,t,t.pendingProps,t.type.render,t.ref,te);break;case 5:Ag(t);var i=t;i===en&&(Kt?(ih(i),i.tag===5&&i.stateNode!=null&&(we=i.stateNode)):(ih(i),Kt=!0));default:ES(n,t),t=jt=Tx(t,Sa),t=bS(n,t,Sa)}e.memoizedProps=e.pendingProps,t===null?Hh(e):jt=t}function Zr(e,t,n,i){da=or=null,Ag(t),$r=null,Hl=0;var a=t.return;try{if(VT(e,a,t,n,te)){Be=1,hh(e,pi(n,e.current)),jt=null;return}}catch(s){if(a!==null)throw jt=a,s;Be=1,hh(e,pi(n,e.current)),jt=null;return}t.flags&32768?(Kt||i===1?e=!0:bo||(te&536870912)!==0?e=!1:(Za=e=!0,(i===2||i===9||i===3||i===6)&&(i=fn.current,i!==null&&i.tag===13&&(i.flags|=16384))),nM(t,e)):Hh(t)}function Hh(e){var t=e;do{if((t.flags&32768)!==0){nM(t,Za);return}e=t.return;var n=WT(t.alternate,t,Sa);if(n!==null){jt=n;return}if(t=t.sibling,t!==null){jt=t;return}jt=t=e}while(t!==null);Be===0&&(Be=5)}function nM(e,t){do{var n=qT(e.alternate,e);if(n!==null){n.flags&=32767,jt=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){jt=e;return}jt=e=n}while(e!==null);Be=6,jt=null}function sy(e,t,n,i,a,s,r,o,l,c,u,d){e.cancelPendingCommit=null;do Vh();while(Ie!==0);if((he&6)!==0)throw Error(J(327));if(t!==null){if(t===e.current)throw Error(J(177));e===be&&(jt=be=null,te=0),nr=t,Ri=e,Qi=n,zm=a,ZS=i,eA(e,t,n,r,o,l,d)}}function eA(e,t,n,i,a,s,r){var o=t.lanes|t.childLanes;if(Bm=o,o|=fg,wE(e,n,o,i,a,s),io=null,(n&335544064)===n?(ao=RT(e),i=10262):(ao=null,i=10256),(t.subtreeFlags&i)!==0||(t.flags&i)!==0?(e.callbackNode=null,e.callbackPriority=0,oA(ju,function(){return Gm(),null})):(e.callbackNode=null,e.callbackPriority=0),ph=!1,i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=It.T,It.T=null,a=fe.p,fe.p=2,s=he,he|=4;try{YT(e,t,n)}finally{he=s,fe.p=a,It.T=i}}Ie=1,ph?no=TA(r,e.containerInfo,ao,Fm,Hm,iA,Vm,Gm,nA,null,null):(Fm(),Hm(),Vm())}function nA(e){if(Ie!==0){var t=Ri.onRecoverableError;t(e,{componentStack:null})}}function iA(){Ie===3&&(Ie=0,VS(nr,Ri),Ie=4)}function Fm(){if(Ie===1){Ie=0;var e=Ri,t=nr,n=Qi,i=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||i){i=It.T,It.T=null;var a=fe.p;fe.p=2;var s=he;he|=4;try{xl=mh=!1,FS(t,e,n),n=qm;var r=vx(e.containerInfo),o=n.focusedElem,l=n.selectionRange;if(r!==o&&o&&o.ownerDocument&&gx(o.ownerDocument.documentElement,o)){if(l!==null&&hg(o)){var c=l.start,u=l.end;if(u===void 0&&(u=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(u,o.value.length);else{var d=o.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),g=o.textContent.length,x=Math.min(l.start,g),m=l.end===void 0?x:Math.min(l.end,g);!p.extend&&x>m&&(r=m,m=x,x=r);var h=S_(o,x),v=S_(o,m);if(h&&v&&(p.rangeCount!==1||p.anchorNode!==h.node||p.anchorOffset!==h.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var _=d.createRange();_.setStart(h.node,h.offset),p.removeAllRanges(),x>m?(p.addRange(_),p.extend(v.node,v.offset)):(_.setEnd(v.node,v.offset),p.addRange(_))}}}}for(d=[],p=o;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<d.length;o++){var y=d[o];y.element.scrollLeft=y.left,y.element.scrollTop=y.top}}vo=!!Wm,qm=Wm=null}finally{he=s,fe.p=a,It.T=i}}e.current=t,Ie=2}}function Hm(){if(Ie===2){Ie=0;var e=Ri,t=nr,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=It.T,It.T=null;var i=fe.p;fe.p=2;var a=he;he|=4;try{LS(e,t.alternate,t)}finally{he=a,fe.p=i,It.T=n}}Ie=3}}function Vm(){if(Ie===4||Ie===3){Ie=0;var e=no;no=null,_E();var t=Ri,n=nr,i=Qi,a=ZS,s=(i&335544064)===i?10262:10256;if((n.subtreeFlags&s)!==0||(n.flags&s)!==0?Ie=5:(Ie=0,nr=Ri=null,iM(t,t.pendingLanes)),s=t.pendingLanes,s===0&&(is=null),sg(i),n=n.stateNode,qn&&typeof qn.onCommitFiberRoot=="function")try{qn.onCommitFiberRoot(Ql,n,void 0,(n.current.flags&128)===128)}catch{}if(a!==null){n=It.T,s=fe.p,fe.p=2,It.T=null;try{for(var r=t.onRecoverableError,o=0;o<a.length;o++){var l=a[o];r(l.value,{componentStack:l.stack})}}finally{It.T=n,fe.p=s}}if(a=io,r=ao,ao=null,a!==null&&(io=null,r===null&&(r=[]),e!==null))for(l=0;l<a.length;l++)n=(0,a[l])(r),n!==void 0&&e.finished.finally(n);(Qi&3)!==0&&Vh(),ta(t),s=t.pendingLanes,(i&261930)!==0&&(s&42)!==0?t===ku?Ll++:(Ll=0,ku=t):(Ll=0,ku=null),sc(0,!1)}}function iM(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,nc(t)))}function Vh(){return no!==null&&(no.skipTransition(),no=null),Fm(),Hm(),Vm(),Gm()}function Gm(){if(Ie!==5)return!1;var e=Ri,t=Bm;Bm=0;var n=sg(Qi),i=It.T,a=fe.p;try{fe.p=32>n?32:n,It.T=null,n=zm,zm=null;var s=Ri,r=Qi;if(Ie=0,nr=Ri=null,Qi=0,(he&6)!==0)throw Error(J(331));var o=he;if(he|=4,WS(s.current),GS(s,s.current,r,n),he=o,sc(0,!1),qn&&typeof qn.onPostCommitFiberRoot=="function")try{qn.onPostCommitFiberRoot(Ql,s)}catch{}return!0}finally{fe.p=a,It.T=i,iM(e,t)}}function ry(e,t,n){t=pi(n,t),t=Sm(e.stateNode,t,2),e=ts(e,t,2),e!==null&&($l(e,2),ta(e))}function ye(e,t,n){if(e.tag===3)ry(e,e,n);else for(;t!==null;){if(t.tag===3){ry(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(is===null||!is.has(i))){e=pi(n,e),n=_S(2),i=ts(t,n,2),i!==null&&(yS(n,i,t,e),$l(i,2),ta(i));break}}t=t.return}}function Bp(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new KT;var a=new Set;i.set(t,a)}else a=i.get(t),a===void 0&&(a=new Set,i.set(t,a));a.has(n)||(Gg=!0,a.add(n),e=aA.bind(null,e,t,n),t.then(e,e))}function aA(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,be===e&&(te&n)===n&&((Be===4||Be===3&&(te&62914560)===te&&300>Wn()-zh)&&(he&2)===0?ho(e,0):gh|=n,co===te&&(co=0)),ta(e)}function aM(e,t){t===0&&(t=Zy()),e=rr(e,t),e!==null&&($l(e,t),ta(e))}function sA(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),aM(e,n)}function rA(e,t){var n=0;switch(e.tag){case 31:case 13:var i=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(J(314))}i!==null&&i.delete(t),aM(e,n)}function oA(e,t){return ig(e,t)}var fo=null,Pr=null,km=!1,xh=!1,zp=!1,Ka=0;function ta(e){e!==Pr&&e.next===null&&(Pr===null?fo=Pr=e:Pr=Pr.next=e),xh=!0,km||(km=!0,cA())}function sc(e,t){if(!zp&&xh){zp=!0;do for(var n=!1,i=fo;i!==null;){if(!t)if(e!==0){var a=i.pendingLanes;if(a===0)var s=0;else{var r=i.suspendedLanes,o=i.pingedLanes;s=(1<<31-Yn(42|e)+1)-1,s&=a&~(r&~o),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(n=!0,oy(i,s))}else s=te,s=Eh(i,i===be?s:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(s&3)===0||jl(i,s)||(n=!0,oy(i,s));i=i.next}while(n);zp=!1}}function lA(){sM()}function sM(){xh=km=!1;var e=0;Ka!==0&&_A()&&(e=Ka);for(var t=Wn(),n=null,i=fo;i!==null;){var a=i.next,s=rM(i,t);s===0?(i.next=null,n===null?fo=a:n.next=a,a===null&&(Pr=n)):(n=i,(e!==0||(s&3)!==0)&&(xh=!0)),i=a}Ie!==0&&Ie!==5||sc(e,!1),Ka!==0&&(Ka=0)}function rM(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,a=e.expirationTimes,s=e.pendingLanes&-62914561;0<s;){var r=31-Yn(s),o=1<<r,l=a[r];l===-1?((o&n)===0||(o&i)!==0)&&(a[r]=AE(o,t)):l<=t&&(e.expiredLanes|=o),s&=~o}if(t=be,n=te,n=Eh(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,n===0||e===t&&(ve===2||ve===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&gp(i),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||jl(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(i!==null&&gp(i),sg(n)){case 2:case 8:n=Wy;break;case 32:n=ju;break;case 268435456:n=qy;break;default:n=ju}return i=oM.bind(null,e),n=ig(n,i),e.callbackPriority=t,e.callbackNode=n,t}return i!==null&&i!==null&&gp(i),e.callbackPriority=2,e.callbackNode=null,2}function oM(e,t){if(Ie!==0&&Ie!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Vh()&&e.callbackNode!==n)return null;var i=te;return i=Eh(e,e===be?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(KS(e,i,t),rM(e,Wn()),e.callbackNode!=null&&e.callbackNode===n?oM.bind(null,e):null)}function oy(e,t){if(Vh())return null;KS(e,t,!0)}function cA(){xA(function(){(he&6)!==0?ig(Xy,lA):sM()})}function Xg(){if(Ka===0){var e=js;e===0&&(e=uu,uu<<=1,(uu&261888)===0&&(uu=256)),Ka=e}return Ka}function ly(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Uu(e)}function uA(e,t,n,i,a){if(t==="submit"&&n&&n.stateNode===a){var s=ly((a[In]||null).action),r=i.submitter;r&&(t=(t=r[In]||null)?ly(t.formAction):r.getAttribute("formAction"),t!==null&&(s=t,r=null));var o=new Ah("action","action",null,i,a);e.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(Ka!==0){var l=new FormData(a,r);ym(n,{pending:!0,data:l,method:a.method,action:s},null,l)}}else typeof s=="function"&&(o.preventDefault(),l=new FormData(a,r),ym(n,{pending:!0,data:l,method:a.method,action:s},s,l))},currentTarget:a}]})}}for(Tu=0;Tu<lm.length;Tu++)Au=lm[Tu],cy=Au.toLowerCase(),uy=Au[0].toUpperCase()+Au.slice(1),Di(cy,"on"+uy);var Au,cy,uy,Tu;Di(yx,"onAnimationEnd");Di(xx,"onAnimationIteration");Di(Sx,"onAnimationStart");Di("dblclick","onDoubleClick");Di("focusin","onFocus");Di("focusout","onBlur");Di(ST,"onTransitionRun");Di(MT,"onTransitionStart");Di(bT,"onTransitionCancel");Di(Mx,"onTransitionEnd");ro("onMouseEnter",["mouseout","mouseover"]);ro("onMouseLeave",["mouseout","mouseover"]);ro("onPointerEnter",["pointerout","pointerover"]);ro("onPointerLeave",["pointerout","pointerover"]);ar("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));ar("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));ar("onBeforeInput",["compositionend","keypress","textInput","paste"]);ar("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));ar("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));ar("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var kl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),hA=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(kl));function lM(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],a=i.event;i=i.listeners;t:{var s=void 0;if(t)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&a.isPropagationStopped())break t;s=o,a.currentTarget=c;try{s(a)}catch(u){th(u)}a.currentTarget=null,s=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&a.isPropagationStopped())break t;s=o,a.currentTarget=c;try{s(a)}catch(u){th(u)}a.currentTarget=null,s=l}}}}function Qt(e,t){var n=t[a_];n===void 0&&(n=t[a_]=new Set);var i=e+"__bubble";n.has(i)||(cM(t,e,2,!1),n.add(i))}function Fp(e,t,n){var i=0;t&&(i|=4),cM(n,e,i,t)}var wu="_reactListening"+Math.random().toString(36).slice(2);function Wg(e){if(!e[wu]){e[wu]=!0,tx.forEach(function(n){n!=="selectionchange"&&(hA.has(n)||Fp(n,!1,e),Fp(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[wu]||(t[wu]=!0,Fp("selectionchange",!1,t))}}function cM(e,t,n,i){switch(LM(t)){case 2:var a=iw;break;case 8:a=aw;break;default:a=jg}n=a.bind(null,t,n,e),a=void 0,!am||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),i?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function Hp(e,t,n,i,a){var s=i;if((t&1)===0&&(t&2)===0&&i!==null)t:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===a)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===a)return;r=r.return}for(;o!==null;){if(r=Gs(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=s=r;continue t}o=o.parentNode}}i=i.return}lx(function(){var c=s,u=og(n),d=[];t:{var f=bx.get(e);if(f!==void 0){var p=Ah,g=e;switch(e){case"keypress":if(Lu(n)===0)break t;case"keydown":case"keyup":p=QE;break;case"focusin":g="focus",p=Mp;break;case"focusout":g="blur",p=Mp;break;case"beforeblur":case"afterblur":p=Mp;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=f_;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=FE;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=nT;break;case yx:case xx:case Sx:p=GE;break;case Mx:p=aT;break;case"scroll":case"scrollend":p=BE;break;case"wheel":p=rT;break;case"copy":case"cut":case"paste":p=XE;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=p_;break;case"submit":p=tT;break;case"toggle":case"beforetoggle":p=lT}var x=(t&4)!==0,m=!x&&(e==="scroll"||e==="scrollend"),h=x?f!==null?f+"Capture":null:f;x=[];for(var v=c,_;v!==null;){var y=v;if(_=y.stateNode,y=y.tag,y!==5&&y!==26&&y!==27||_===null||h===null||(y=Il(v,h),y!=null&&x.push(Xl(v,y,_))),m)break;v=v.return}0<x.length&&(f=new p(f,g,null,n,u),d.push({event:f,listeners:x}))}}if((t&7)===0){t:{if(p=e==="mouseover"||e==="pointerover",f=e==="mouseout"||e==="pointerout",p&&n!==im&&(g=n.relatedTarget||n.fromElement)&&(Gs(g)||g[yo]))break t;(f||p)&&(g=u.window===u?u:(p=u.ownerDocument)?p.defaultView||p.parentWindow:window,f?(p=n.relatedTarget||n.toElement,f=c,p=p?Gs(p):null,p!==null&&(m=Kl(p),x=p.tag,p!==m||x!==5&&x!==27&&x!==6)&&(p=null)):(f=null,p=c),f!==p&&(x=f_,y="onMouseLeave",h="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(x=p_,y="onPointerLeave",h="onPointerEnter",v="pointer"),m=f==null?g:_l(f),_=p==null?g:_l(p),g=new x(y,v+"leave",f,n,u),g.target=m,g.relatedTarget=_,y=null,Gs(u)===c&&(x=new x(h,v+"enter",p,n,u),x.target=_,x.relatedTarget=m,y=x),m=y,x=f&&p?Wp(f,p,fA):null,f!==null&&hy(d,g,f,x,!1),p!==null&&m!==null&&hy(d,m,p,x,!0)))}t:{if(f=c?_l(c):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var T=__;else if(v_(f))if(px)T=_T;else{T=gT;var C=mT}else p=f.nodeName,!p||p.toLowerCase()!=="input"||f.type!=="checkbox"&&f.type!=="radio"?c&&rg(c.elementType)&&(T=__):T=vT;if(T&&(T=T(e,c))){dx(d,T,n,u);break t}C&&C(e,f,c)}switch(C=c?_l(c):window,e){case"focusin":(v_(C)||C.contentEditable==="true")&&(Gr=C,rm=c,bl=null);break;case"focusout":bl=rm=Gr=null;break;case"mousedown":om=!0;break;case"contextmenu":case"mouseup":case"dragend":om=!1,M_(d,n,u);break;case"selectionchange":if(xT)break;case"keydown":case"keyup":M_(d,n,u)}var w;if(ug)t:{switch(e){case"compositionstart":var R="onCompositionStart";break t;case"compositionend":R="onCompositionEnd";break t;case"compositionupdate":R="onCompositionUpdate";break t}R=void 0}else Vr?hx(e,n)&&(R="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(R="onCompositionStart");R&&(ux&&n.locale!=="ko"&&(Vr||R!=="onCompositionStart"?R==="onCompositionEnd"&&Vr&&(w=cx()):(qa=u,lg="value"in qa?qa.value:qa.textContent,Vr=!0)),C=Sh(c,R),0<C.length&&(R=new d_(R,e,null,n,u),d.push({event:R,listeners:C}),w?R.data=w:(w=fx(n),w!==null&&(R.data=w)))),(w=uT?hT(e,n):fT(e,n))&&(R=Sh(c,"onBeforeInput"),0<R.length&&(C=new d_("onBeforeInput","beforeinput",null,n,u),d.push({event:C,listeners:R}),C.data=w)),uA(d,e,c,n,u)}lM(d,t)})}function Xl(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Sh(e,t){for(var n=t+"Capture",i=[];e!==null;){var a=e,s=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||s===null||(a=Il(e,n),a!=null&&i.unshift(Xl(e,a,s)),a=Il(e,t),a!=null&&i.push(Xl(e,a,s))),e.tag===3)return i;e=e.return}return[]}function fA(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function hy(e,t,n,i,a){for(var s=t._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,a?(c=Il(n,s),c!=null&&r.unshift(Xl(n,c,l))):a||(c=Il(n,s),c!=null&&r.push(Xl(n,c,l)))),n=n.return}r.length!==0&&e.push({event:t,listeners:r})}var dA=/\r\n?/g,pA=/\u0000|\uFFFD/g;function fy(e){return(typeof e=="string"?e:""+e).replace(dA,`
`).replace(pA,"")}function uM(e,t){return t=fy(t),fy(e)===t}function _e(e,t,n,i,a,s){switch(n){case"children":if(typeof i=="string")t==="body"||t==="textarea"&&i===""||oo(e,i);else if(typeof i=="number"||typeof i=="bigint")t!=="body"&&oo(e,""+i);else return;break;case"className":du(e,"class",i);break;case"tabIndex":du(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":du(e,n,i);break;case"style":ox(e,i,s);return;case"data":if(t!=="object"){du(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Uu(i),e.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(n==="formAction"?(t!=="input"&&_e(e,t,"name",a.name,a,null),_e(e,t,"formEncType",a.formEncType,a,null),_e(e,t,"formMethod",a.formMethod,a,null),_e(e,t,"formTarget",a.formTarget,a,null)):(_e(e,t,"encType",a.encType,a,null),_e(e,t,"method",a.method,a,null),_e(e,t,"target",a.target,a,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Uu(i),e.setAttribute(n,i);break;case"onClick":i!=null&&(e.onclick=Yi);return;case"onScroll":i!=null&&Qt("scroll",e);return;case"onScrollEnd":i!=null&&Qt("scrollend",e);return;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(J(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(J(60));s?.__html!==n&&(e.innerHTML=n)}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}n=Uu(i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":i===!0?e.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(n,i):e.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(n):e.setAttribute(n,i);break;case"popover":Qt("beforetoggle",e),Qt("toggle",e),Du(e,"popover",i);break;case"xlinkActuate":ua(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":ua(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":ua(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":ua(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":ua(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":ua(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":ua(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":ua(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":ua(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":Du(e,"is",i);break;case"innerText":case"textContent":return;default:if(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")n=IE.get(n)||n,Du(e,n,i);else return}le=!0}function Xm(e,t,n,i,a,s){switch(n){case"style":ox(e,i,s);return;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(J(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(J(60));s?.__html!==n&&(e.innerHTML=n)}}break;case"children":if(typeof i=="string")oo(e,i);else if(typeof i=="number"||typeof i=="bigint")oo(e,""+i);else return;break;case"onScroll":i!=null&&Qt("scroll",e);return;case"onScrollEnd":i!=null&&Qt("scrollend",e);return;case"onClick":i!=null&&(e.onclick=Yi);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!ex.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),s=n.slice(2,a?n.length-7:void 0),t=e[In]||null,t=t!=null?t[n]:null,typeof t=="function"&&e.removeEventListener(s,t,a),typeof i=="function")){typeof t!="function"&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(s,i,a);break t}le=!0,n in e?e[n]=i:i===!0?e.setAttribute(n,""):Du(e,n,i)}return}le=!0}function hn(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Qt("error",e),Qt("load",e);var i=!1,a=!1,s;for(s in n)if(n.hasOwnProperty(s)){var r=n[s];if(r!=null)switch(s){case"src":i=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(J(137,t));default:_e(e,t,s,r,n,null)}}a&&_e(e,t,"srcSet",n.srcSet,n,null),i&&_e(e,t,"src",n.src,n,null);return;case"input":Qt("invalid",e);var o=s=r=a=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var u=n[i];if(u!=null)switch(i){case"name":a=u;break;case"type":r=u;break;case"checked":l=u;break;case"defaultChecked":c=u;break;case"value":s=u;break;case"defaultValue":o=u;break;case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(J(137,t));break;default:_e(e,t,i,u,n,null)}}ax(e,s,o,l,c,r,a,!1);return;case"select":Qt("invalid",e),i=r=s=null;for(a in n)if(n.hasOwnProperty(a)&&(o=n[a],o!=null))switch(a){case"value":s=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:_e(e,t,a,o,n,null)}t=s,n=r,e.multiple=!!i,t!=null?Kr(e,!!i,t,!1):n!=null&&Kr(e,!!i,n,!0);return;case"textarea":Qt("invalid",e),s=a=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":a=o;break;case"children":s=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(J(91));break;default:_e(e,t,r,o,n,null)}rx(e,i,a,s);return;case"option":for(l in n)n.hasOwnProperty(l)&&(i=n[l],i!=null)&&(l==="selected"?e.selected=i&&typeof i!="function"&&typeof i!="symbol":_e(e,t,l,i,n,null));return;case"dialog":Qt("beforetoggle",e),Qt("toggle",e),Qt("cancel",e),Qt("close",e);break;case"iframe":case"object":Qt("load",e);break;case"video":case"audio":for(i=0;i<kl.length;i++)Qt(kl[i],e);break;case"image":Qt("error",e),Qt("load",e);break;case"details":Qt("toggle",e);break;case"embed":case"source":case"link":Qt("error",e),Qt("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(J(137,t));default:_e(e,t,c,i,n,null)}return;default:if(rg(t)){for(u in n)n.hasOwnProperty(u)&&(i=n[u],i!==void 0&&Xm(e,t,u,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&_e(e,t,o,i,n,null))}var mA={};function gA(e,t,n,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,s=null,r=null,o=null,l=null,c=null,u=null;for(p in n){var d=n[p];if(n.hasOwnProperty(p)&&d!=null)switch(p){case"checked":break;case"value":break;case"defaultValue":l=d;default:i.hasOwnProperty(p)||_e(e,t,p,null,i,d)}}for(var f in i){var p=i[f];if(d=n[f],i.hasOwnProperty(f)&&(p!=null||d!=null))switch(f){case"type":p!==d&&(le=!0),s=p;break;case"name":p!==d&&(le=!0),a=p;break;case"checked":p!==d&&(le=!0),c=p;break;case"defaultChecked":p!==d&&(le=!0),u=p;break;case"value":p!==d&&(le=!0),r=p;break;case"defaultValue":p!==d&&(le=!0),o=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(J(137,t));break;default:p!==d&&_e(e,t,f,p,i,d)}}nm(e,r,o,l,c,u,s,a);return;case"select":p=r=o=f=null;for(s in n)if(l=n[s],n.hasOwnProperty(s)&&l!=null)switch(s){case"value":break;case"multiple":p=l;default:i.hasOwnProperty(s)||_e(e,t,s,null,i,l)}for(a in i)if(s=i[a],l=n[a],i.hasOwnProperty(a)&&(s!=null||l!=null))switch(a){case"value":s!==l&&(le=!0),f=s;break;case"defaultValue":s!==l&&(le=!0),o=s;break;case"multiple":s!==l&&(le=!0),r=s;default:s!==l&&_e(e,t,a,s,i,l)}t=o,n=r,i=p,f!=null?Kr(e,!!n,f,!1):!!i!=!!n&&(t!=null?Kr(e,!!n,t,!0):Kr(e,!!n,n?[]:"",!1));return;case"textarea":p=f=null;for(o in n)if(a=n[o],n.hasOwnProperty(o)&&a!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:_e(e,t,o,null,i,a)}for(r in i)if(a=i[r],s=n[r],i.hasOwnProperty(r)&&(a!=null||s!=null))switch(r){case"value":a!==s&&(le=!0),f=a;break;case"defaultValue":a!==s&&(le=!0),p=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(J(91));break;default:a!==s&&_e(e,t,r,a,i,s)}sx(e,f,p);return;case"option":for(var g in n)f=n[g],n.hasOwnProperty(g)&&f!=null&&!i.hasOwnProperty(g)&&(g==="selected"?e.selected=!1:_e(e,t,g,null,i,f));for(l in i)f=i[l],p=n[l],i.hasOwnProperty(l)&&f!==p&&(f!=null||p!=null)&&(l==="selected"?(f!==p&&(le=!0),e.selected=f&&typeof f!="function"&&typeof f!="symbol"):_e(e,t,l,f,i,p));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var x in n)f=n[x],n.hasOwnProperty(x)&&f!=null&&!i.hasOwnProperty(x)&&_e(e,t,x,null,i,f);for(c in i)if(f=i[c],p=n[c],i.hasOwnProperty(c)&&f!==p&&(f!=null||p!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(J(137,t));break;default:_e(e,t,c,f,i,p)}return;default:if(rg(t)){for(var m in n)f=n[m],n.hasOwnProperty(m)&&f!==void 0&&!i.hasOwnProperty(m)&&Xm(e,t,m,void 0,i,f);for(u in i)f=i[u],p=n[u],!i.hasOwnProperty(u)||f===p||f===void 0&&p===void 0||Xm(e,t,u,f,i,p);return}}for(var h in n)f=n[h],n.hasOwnProperty(h)&&f!=null&&!i.hasOwnProperty(h)&&_e(e,t,h,null,i,f);for(d in i)f=i[d],p=n[d],!i.hasOwnProperty(d)||f===p||f==null&&p==null||_e(e,t,d,f,i,p)}function dy(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function vA(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var a=n[i],s=a.transferSize,r=a.initiatorType,o=a.duration;if(s&&o&&dy(r)){for(r=0,o=a.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var u=l.transferSize,d=l.initiatorType;u&&dy(d)&&(l=l.responseEnd,r+=u*(l<o?1:(o-c)/(l-c)))}if(--i,t+=8*(s+r)/(a.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Wm=null,qm=null;function Wl(e){return e.nodeType===9?e:e.ownerDocument}function py(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function hM(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function fM(e,t,n,i){return n=Wl(n).createElement(e),n[on]=i,n[In]=t,hn(n,e,t),tn(n),n}function Ym(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Vp=null;function _A(){var e=window.event;return e&&e.type==="popstate"?e===Vp?!1:(Vp=e,!0):(Vp=null,!1)}var qg=typeof setTimeout=="function"?setTimeout:void 0,yA=typeof clearTimeout=="function"?clearTimeout:void 0,my=typeof Promise=="function"?Promise:void 0,gy=typeof requestAnimationFrame=="function"?requestAnimationFrame:qg,xA=typeof queueMicrotask=="function"?queueMicrotask:typeof my<"u"?function(e){return my.resolve(null).then(e).catch(SA)}:qg;function SA(e){setTimeout(function(){throw e})}function ds(e){return e==="head"}function vy(e,t){var n=t,i=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"||n==="/&"){if(i===0){e.removeChild(a),_o(t);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")kp(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,kp(n);for(var s=n.firstChild;s;){var r=s.nextSibling,o=s.nodeName;s[tc]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&s.rel.toLowerCase()==="stylesheet"||n.removeChild(s),s=r}}else n==="body"&&kp(e.ownerDocument.body);n=a}while(n);_o(t)}function _y(e,t){var n=e;e=0;do{var i=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=i}while(n)}function dM(e,t,n){if(t=CSS.escape(t)!==t?"r-"+btoa(t).replace(/=/g,""):t,e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display==="inline"){if(t=e.getClientRects(),t.length===1)var i=1;else for(var a=i=0;a<t.length;a++){var s=t[a];0<s.width&&0<s.height&&i++}i===1&&(e=e.style,e.display=t.length===1?"inline-block":"block",e.marginTop="-"+n.paddingTop,e.marginBottom="-"+n.paddingBottom)}}function pM(e,t){e=e.style,t=t.style;var n=t!=null?t.hasOwnProperty("viewTransitionName")?t.viewTransitionName:t.hasOwnProperty("view-transition-name")?t["view-transition-name"]:null:null;e.viewTransitionName=n==null||typeof n=="boolean"?"":(""+n).trim(),n=t!=null?t.hasOwnProperty("viewTransitionClass")?t.viewTransitionClass:t.hasOwnProperty("view-transition-class")?t["view-transition-class"]:null:null,e.viewTransitionClass=n==null||typeof n=="boolean"?"":(""+n).trim(),e.display==="inline-block"&&(t==null?e.display=e.margin="":(n=t.display,e.display=n==null||typeof n=="boolean"?"":n,n=t.margin,n!=null?e.margin=n:(n=t.hasOwnProperty("marginTop")?t.marginTop:t["margin-top"],e.marginTop=n==null||typeof n=="boolean"?"":n,t=t.hasOwnProperty("marginBottom")?t.marginBottom:t["margin-bottom"],e.marginBottom=t==null||typeof t=="boolean"?"":t)))}function mM(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position==="absolute"||t.position==="fixed",clip:t.clipPath!=="none"||t.overflow!=="visible"||t.filter!=="none"||t.mask!=="none"||t.mask!=="none"||t.borderRadius!=="0px",view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Zm(e){var t=e.getBoundingClientRect(),n=getComputedStyle(e);return mM(t,n,e)}function MA(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return mM(t,n,e)}function bA(e){return e.documentElement.clientHeight}function EA(e){this.addEventListener("load",e),this.addEventListener("error",e)}function TA(e,t,n,i,a,s,r,o,l){var c=t.nodeType===9?t:t.ownerDocument;try{var u=c.startViewTransition({update:function(){var f=c.defaultView,p=f.navigation&&f.navigation.transition,g=c.fonts.status;i();var x=[];if(g==="loaded"&&(bA(c),c.fonts.status==="loading"&&x.push(c.fonts.ready)),g=x.length,e!==null)for(var m=e.suspenseyImages,h=0,v=0;v<m.length;v++){var _=m[v];if(!_.complete){var y=_.getBoundingClientRect();if(0<y.bottom&&0<y.right&&y.top<f.innerHeight&&y.left<f.innerWidth){if(h+=wM(_),h>qu){x.length=g;break}_=new Promise(EA.bind(_)),x.push(_)}}}if(0<x.length)return f=Promise.race([Promise.all(x),new Promise(function(T){return setTimeout(T,500)})]).then(a,a),(p?Promise.allSettled([p.finished,f]):f).then(s,s);if(a(),p)return p.finished.then(s,s);s()},types:n});c.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var f=c.documentElement.getAnimations({subtree:!0}),p=0;p<f.length;p++){var g=f[p],x=g.effect,m=x.pseudoElement;if(m!=null&&m.startsWith("::view-transition")){d.push(g),g=x.getKeyframes();for(var h=m=void 0,v=!0,_=0;_<g.length;_++){var y=g[_],T=y.width;if(m===void 0)m=T;else if(m!==T){v=!1;break}if(T=y.height,h===void 0)h=T;else if(h!==T){v=!1;break}delete y.width,delete y.height,y.transform==="none"&&delete y.transform}v&&m!==void 0&&h!==void 0&&(x.setKeyframes(g),v=getComputedStyle(x.target,x.pseudoElement),v.width!==m||v.height!==h)&&(v=g[0],v.width=m,v.height=h,v=g[g.length-1],v.width=m,v.height=h,x.setKeyframes(g))}}r()},function(f){c.__reactViewTransition===u&&(c.__reactViewTransition=null);try{typeof f=="object"&&f!==null&&f.name==="InvalidStateError"&&(f.message==="View transition was skipped because document visibility state is hidden."||f.message==="Skipping view transition because document visibility state has become hidden."||f.message==="Skipping view transition because viewport size changed."||f.message==="Transition was aborted because of invalid state")&&(f=null),f!==null&&l(f)}finally{i(),a(),r()}}),u.finished.finally(function(){for(var f=0;f<d.length;f++)d[f].cancel();c.__reactViewTransition===u&&(c.__reactViewTransition=null),o()}),u}catch{return i(),a(),r(),null}}function ks(e,t){this._scope=document.documentElement,this._selector="::view-transition-"+e+"("+t+")"}ks.prototype.animate=function(e,t){return t=typeof t=="number"?{duration:t}:Ee({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)};ks.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),i=[],a=0;a<n.length;a++){var s=n[a].effect;s!==null&&s.target===e&&s.pseudoElement===t&&i.push(n[a])}return i};ks.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function gM(e){return{name:e,group:new ks("group",e),imagePair:new ks("image-pair",e),old:new ks("old",e),new:new ks("new",e)}}function Kn(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}Kn.prototype.addEventListener=function(e,t,n){var i=null,a=null;if(!(n!=null&&typeof n!="boolean"&&(i=n.signal||null,i!==null&&i.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var s=this._eventListeners;if(vM(s,e,t,n)===-1){var r=this,o=t;n!=null&&typeof n!="boolean"&&n.once===!0&&(o=function(l){r.removeEventListener(e,t,n),typeof t=="function"?t.call(this,l):t.handleEvent(l)}),i!==null&&(a=r.removeEventListener.bind(r,e,t,n),i.addEventListener("abort",a,{once:!0}),a=i.removeEventListener.bind(i,"abort",a)),i=po(n),s.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:o,cleanup:a}),On(this._fragmentFiber.child,!1,AA,e,o,i)}this._eventListeners=s}};function AA(e,t,n,i){return Ye(e).addEventListener(t,n,i),!1}Kn.prototype.removeEventListener=function(e,t,n){var i=this._eventListeners;if(i!==null&&(t=vM(i,e,t,n),t!==-1)){var a=i[t];n=a.attachedListener;var s=a.cleanup;a=po(a.optionsOrUseCapture),On(this._fragmentFiber.child,!1,wA,e,n,a),i.splice(t,1),s!==null&&s()}};function wA(e,t,n,i){return Ye(e).removeEventListener(t,n,i),!1}function po(e){return e!=null&&typeof e!="boolean"&&(e.once===!0||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function yy(e){return e==null?"c=0":typeof e=="boolean"?"c="+(e?"1":"0"):"c="+(e.capture?"1":"0")}function vM(e,t,n,i){if(e.length===0)return-1;i=yy(i);for(var a=0;a<e.length;a++){var s=e[a];if(s.type===t&&s.listener===n&&yy(s.optionsOrUseCapture)===i)return a}return-1}Kn.prototype.dispatchEvent=function(e){var t=ir(this._fragmentFiber);if(t===null)return!0;t=Ye(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var i=t.nodeType===9?t.createComment(""):document.createTextNode("");if(n)for(var a=0;a<n.length;a++){var s=n[a];i.addEventListener(s.type,s.attachedListener,po(s.optionsOrUseCapture))}if(t.appendChild(i),e=i.dispatchEvent(e),n)for(a=0;a<n.length;a++)s=n[a],i.removeEventListener(s.type,s.attachedListener,po(s.optionsOrUseCapture));return t.removeChild(i),e}return t.dispatchEvent(e)};Kn.prototype.focus=function(e){On(this._fragmentFiber.child,!0,_M,e,void 0,void 0)};function _M(e,t){return e.tag===6?!1:(e=Ye(e),FA(e,t))}Kn.prototype.focusLast=function(e){var t=[];On(this._fragmentFiber.child,!0,Yg,t,void 0,void 0);for(var n=t.length-1;0<=n&&!_M(t[n],e);n--);};function Yg(e,t){return t.push(e),!1}Kn.prototype.blur=function(){var e=ir(this._fragmentFiber);e!==null&&(e=Ye(e),e=Wl(e).activeElement,e!==null&&On(this._fragmentFiber.child,!1,CA,e,void 0,void 0))};function CA(e,t){return e.tag===6?!1:(e=Ye(e),e===t||e.contains(t)?(t.blur(),!0):!1)}Kn.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),On(this._fragmentFiber.child,!1,RA,e,void 0,void 0)};function RA(e,t){return e.tag===6||(e=Ye(e),t.observe(e)),!1}Kn.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),On(this._fragmentFiber.child,!1,DA,e,void 0,void 0);for(var n=t=0;n<Ci.length;n++){var i=Ci[n];i.fragmentInstance===this&&i.observer===e?e.unobserve(i.instance):Ci[t++]=i}Ci.length=t}};function DA(e,t){return e.tag===6||(e=Ye(e),t.unobserve(e)),!1}var Ci=[],Gp=!1;function UA(e,t,n){Ci.push({fragmentInstance:e,observer:t,instance:n}),Gp||(Gp=!0,HA(function(){Gp=!1;var i=Ci;Ci=[];for(var a=0;a<i.length;a++){var s=i[a];s.observer.unobserve(s.instance)}}))}Kn.prototype.getClientRects=function(){var e=[];return On(this._fragmentFiber.child,!1,NA,e,void 0,void 0),e};function NA(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=Ye(e),t.push.apply(t,e.getClientRects());return!1}Kn.prototype.getRootNode=function(e){var t=ir(this._fragmentFiber);return t===null?this:Ye(t).getRootNode(e)};Kn.prototype.compareDocumentPosition=function(e){var t=ir(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];On(this._fragmentFiber.child,!1,Yg,n,void 0,void 0);var i=Ye(t);if(n.length===0){if(n=i,jv(this._fragmentFiber)){t:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break t}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var a=i=n.compareDocumentPosition(e);return n===e?a=Node.DOCUMENT_POSITION_CONTAINS:i&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=Hy(t)[1],n===null?a=Node.DOCUMENT_POSITION_PRECEDING:(e=Ye(n).compareDocumentPosition(e),a=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),a|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=Ye(n[0]),a=Ye(n[n.length-1]);var s=jv(this._fragmentFiber)?t.parentElement:i;if(s==null)return Node.DOCUMENT_POSITION_DISCONNECTED;i=s.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,s=s.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_CONTAINED_BY;var r=t.compareDocumentPosition(e),o=a.compareDocumentPosition(e),l=r&Node.DOCUMENT_POSITION_CONTAINED_BY||o&Node.DOCUMENT_POSITION_CONTAINED_BY;return o=i&&s&&r&Node.DOCUMENT_POSITION_FOLLOWING&&o&Node.DOCUMENT_POSITION_PRECEDING,t=i&&t===e||s&&a===e||l||o?Node.DOCUMENT_POSITION_CONTAINED_BY:!i&&t===e||!s&&a===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:r,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||LA(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function LA(e,t,n,i,a){var s=Gs(a);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!s)t:{for(;s!==null;){if(s.tag===7&&(s===t||s.alternate===t)){n=!0;break t}s=s.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(s===null)return s=a.ownerDocument,a===s||a===s.documentElement||a===s.body;t:{for(s=t,t=ir(t);s!==null;){if(!(s.tag!==5&&s.tag!==3&&s.tag!==27||s!==t&&s.alternate!==t)){s=!0;break t}s=s.return}s=!1}return s}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!s)&&!(t=s===n)&&(t=Wp(n,s,$v),t===null?t=!1:(On(t,!0,cE,s,n),s=Br,Br=null,t=s!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!s)&&!(t=s===i)&&(t=Wp(i,s,$v),t===null?t=!1:(On(t,!0,uE,s,i),s=Br,Xp=Br=null,t=s!==null)),t):!1}function xy(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}Kn.prototype.scrollIntoView=function(e){if(typeof e=="object")throw Error(J(566));var t=[];On(this._fragmentFiber.child,!1,Yg,t,void 0,void 0);var n=e!==!1;if(t.length===0){var i=Hy(this._fragmentFiber);if(i=n?i[1]||i[0]||ir(this._fragmentFiber):i[0]||i[1],i===null)return;if(i.tag===6){e=Ye(i),xy(e,n);return}if(i=Ye(i),i.nodeType!==9){if(i.nodeType===11){n="host"in i?i.host:null,n!==null&&n.scrollIntoView(e);return}i.scrollIntoView(e)}}for(i=n?t.length-1:0;i!==(n?-1:t.length);){var a=t[i];a.tag===6?(a=Ye(a),xy(a,n)):Ye(a).scrollIntoView(e),i+=n?-1:1}};function OA(e,t){return e=Ye(e),yM(e,t),!1}function yM(e,t){e.reactFragments==null&&(e.reactFragments=new Set),e.reactFragments.add(t)}function xM(e,t){var n=t._eventListeners;if(n!==null)for(var i=0;i<n.length;i++){var a=n[i];e.addEventListener(a.type,a.attachedListener,po(a.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(s){for(var r=0,o=0;o<Ci.length;o++){var l=Ci[o];(l.fragmentInstance!==t||l.observer!==s||l.instance!==e)&&(Ci[r++]=l)}Ci.length=r,s.observe(e)}),yM(e,t))}function IA(e,t){var n=t._eventListeners;if(n!==null)for(var i=0;i<n.length;i++){var a=n[i];e.removeEventListener(a.type,a.attachedListener,po(a.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(s){typeof s.rootMargin=="string"?UA(t,s,e):s.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function Jm(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Jm(n),Th(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function PA(e,t,n,i){for(;e.nodeType===1;){var a=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[tc])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(s=e.getAttribute("rel"),s==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(s!==a.rel||e.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||e.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||e.getAttribute("title")!==(a.title==null?null:a.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(s=e.getAttribute("src"),(s!==(a.src==null?null:a.src)||e.getAttribute("type")!==(a.type==null?null:a.type)||e.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&s&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var s=a.name==null?null:""+a.name;if(a.type==="hidden"&&e.getAttribute("name")===s)return e}else return e;if(e=gi(e.nextSibling),e===null)break}return null}function BA(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=gi(e.nextSibling),e===null))return null;return e}function SM(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=gi(e.nextSibling),e===null))return null;return e}function Km(e){return e.data==="$?"||e.data==="$~"}function Zg(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function zA(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var i=function(){t(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function gi(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Qm=null;function Sy(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return gi(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function My(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function FA(e,t){function n(){i=!0}if(e.ownerDocument.activeElement===e)return!0;var i=!1;try{e.ownerDocument.addEventListener("focus",n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener("focus",n,!0)}return i}function HA(e){gy(function(){gy(function(t){return e(t)})})}function MM(e,t,n){switch(t=Wl(n),e){case"html":if(e=t.documentElement,!e)throw Error(J(452));return e;case"head":if(e=t.head,!e)throw Error(J(453));return e;case"body":if(e=t.body,!e)throw Error(J(454));return e;default:throw Error(J(451))}}function bM(e,t,n){for(var i in n){var a=n[i];n.hasOwnProperty(i)&&a!=null&&_e(e,t,i,null,mA,a)}n.dangerouslySetInnerHTML!=null&&(e.textContent=""),e.onclick===Yi&&(e.onclick=null),Th(e)}function kp(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Th(e)}var vi=new Map,by=new Set;function ql(e){if(typeof e.getRootNode=="function"){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var Ea=fe.d;fe.d={f:VA,r:GA,D:kA,C:XA,L:WA,m:qA,X:ZA,S:YA,M:JA};function VA(){var e=Ea.f(),t=Fh();return e||t}function GA(e){var t=xo(e);t!==null&&t.tag===5&&t.type==="form"?oS(t):Ea.r(e)}var Eo=typeof document>"u"?null:document;function EM(e,t,n){var i=Eo;if(i&&typeof t=="string"&&t){var a=di(t);a='link[rel="'+e+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),by.has(a)||(by.add(a),e={rel:e,crossOrigin:n,href:t},i.querySelector(a)===null&&(t=i.createElement("link"),hn(t,"link",e),tn(t),i.head.appendChild(t)))}}function kA(e){Ea.D(e),EM("dns-prefetch",e,null)}function XA(e,t){Ea.C(e,t),EM("preconnect",e,t)}function WA(e,t,n){Ea.L(e,t,n);var i=Eo;if(i&&e&&t){var a='link[rel="preload"][as="'+di(t)+'"]';t==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+di(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+di(n.imageSizes)+'"]')):a+='[href="'+di(e)+'"]';var s=a;switch(t){case"style":s=mo(e);break;case"script":s=To(e)}if(!(vi.has(s)||(e=Ee({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),vi.set(s,e),i.querySelector(a)!==null||t==="style"&&i.querySelector(rc(s))||t==="script"&&i.querySelector(oc(s))))){var r=i.createElement("link");hn(r,"link",e),t==="style"&&(r[$u]=!0,r.onload=r.onerror=function(){$y(r)}),tn(r),i.head.appendChild(r)}}}function qA(e,t){Ea.m(e,t);var n=Eo;if(n&&e){var i=t&&typeof t.as=="string"?t.as:"script",a='link[rel="modulepreload"][as="'+di(i)+'"][href="'+di(e)+'"]',s=a;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=To(e)}if(!vi.has(s)&&(e=Ee({rel:"modulepreload",href:e},t),vi.set(s,e),n.querySelector(a)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(oc(s)))return}i=n.createElement("link"),hn(i,"link",e),tn(i),n.head.appendChild(i)}}}function YA(e,t,n){Ea.S(e,t,n);var i=Eo;if(i&&e){var a=Jr(i).hoistableStyles,s=mo(e);t=t||"default";var r=a.get(s);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(rc(s)))o.loading=5;else{e=Ee({rel:"stylesheet",href:e,"data-precedence":t},n),(n=vi.get(s))&&Jg(e,n);var l=r=i.createElement("link");tn(l),hn(l,"link",e),l._p=new Promise(function(c,u){l.onload=c,l.onerror=u}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,Xu(r,t,i)}r={type:"stylesheet",instance:r,count:1,state:o},a.set(s,r)}}}function ZA(e,t){Ea.X(e,t);var n=Eo;if(n&&e){var i=Jr(n).hoistableScripts,a=To(e),s=i.get(a);s||(s=n.querySelector(oc(a)),s||(e=Ee({src:e,async:!0},t),(t=vi.get(a))&&Kg(e,t),s=n.createElement("script"),tn(s),hn(s,"link",e),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function JA(e,t){Ea.M(e,t);var n=Eo;if(n&&e){var i=Jr(n).hoistableScripts,a=To(e),s=i.get(a);s||(s=n.querySelector(oc(a)),s||(e=Ee({src:e,async:!0,type:"module"},t),(t=vi.get(a))&&Kg(e,t),s=n.createElement("script"),tn(s),hn(s,"link",e),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function Ey(e,t,n,i){var a=(a=Qa.current)?ql(a):null;if(!a)throw Error(J(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(n=mo(n.href),t=Jr(a).hoistableStyles,i=t.get(n),i||(i={type:"style",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=mo(n.href);var s=Jr(a).hoistableStyles,r=s.get(e);if(r||(a=a.ownerDocument||a,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(e,r),(s=a.querySelector(rc(e)))?s._p||(r.instance=s,r.state.loading=5):(s=vi.get(e),s||(s={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},vi.set(e,s)),KA(a,e,s,r.state))),t&&i===null)throw Error(J(528,""));return r}if(t&&i!==null)throw Error(J(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(n=To(n),t=Jr(a).hoistableScripts,i=t.get(n),i||(i={type:"script",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(J(444,e))}}function mo(e){return'href="'+di(e)+'"'}function rc(e){return'link[rel="stylesheet"]['+e+"]"}function TM(e){return Ee({},e,{"data-precedence":e.precedence,precedence:null})}function KA(e,t,n,i){if(t=e.querySelector('link[rel="preload"][as="style"]['+t+"]")){if(t[$u]!==!0){i.loading=1;return}}else t=e.createElement("link"),t[$u]=!0,t.onload=t.onerror=$y.bind(null,t),hn(t,"link",n),tn(t),e.head.appendChild(t);i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2})}function To(e){return'[src="'+di(e)+'"]'}function oc(e){return"script[async]"+e}function Ty(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+di(n.href)+'"]');if(i)return t.instance=i,tn(i),i;var a=Ee({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),tn(i),hn(i,"style",a),Xu(i,n.precedence,e),t.instance=i;case"stylesheet":a=mo(n.href);var s=e.querySelector(rc(a));if(s)return t.state.loading|=4,t.instance=s,tn(s),s;i=TM(n),(a=vi.get(a))&&Jg(i,a),s=(e.ownerDocument||e).createElement("link"),tn(s);var r=s;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),hn(s,"link",i),t.state.loading|=4,Xu(s,n.precedence,e),t.instance=s;case"script":return s=To(n.src),(a=e.querySelector(oc(s)))?(t.instance=a,tn(a),a):(i=n,(a=vi.get(s))&&(i=Ee({},n),Kg(i,a)),e=e.ownerDocument||e,a=e.createElement("script"),tn(a),hn(a,"link",i),e.head.appendChild(a),t.instance=a);case"void":return null;default:throw Error(J(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,Xu(i,n.precedence,e));return t.instance}function Xu(e,t,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=i.length?i[i.length-1]:null,s=a,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===t)s=o;else if(s!==a)break}s?s.parentNode.insertBefore(e,s.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Jg(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Kg(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Wu=null;function Ay(e,t,n){if(Wu===null){var i=new Map,a=Wu=new Map;a.set(n,i)}else a=Wu,i=a.get(n),i||(i=new Map,a.set(n,i));if(i.has(e))return i;for(i.set(e,null),n=n.getElementsByTagName(e),a=0;a<n.length;a++){var s=n[a];if(!(s[tc]||s[on]||e==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var r=s.getAttribute(t)||"";r=e+r;var o=i.get(r);o?o.push(s):i.set(r,[s])}}return i}function jm(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function QA(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;return t.rel==="stylesheet"?(e=t.disabled,typeof t.precedence=="string"&&e==null):!0;case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function wy(e,t){return e==="img"&&t.src!=null&&t.src!==""&&t.onLoad==null&&t.loading!=="lazy"}function AM(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function wM(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function Cy(e,t){typeof t.decode=="function"&&(e.imgCount++,t.complete||(e.imgBytes+=wM(t),e.suspenseyImages.push(t)),e=tw.bind(e),t.decode().then(e,e))}function jA(e,t,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var a=mo(i.href),s=t.querySelector(rc(a));if(s){t=s._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Yl.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=s,tn(s);return}s=t.ownerDocument||t,i=TM(i),(a=vi.get(a))&&Jg(i,a),s=s.createElement("link"),tn(s);var r=s;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),hn(s,"link",i),n.instance=s}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(e.count++,n=Yl.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var qu=0;function $A(e,t){return e.stylesheets&&e.count===0&&Yu(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var i=setTimeout(function(){if(e.stylesheets&&Yu(e,e.stylesheets),e.unsuspend){var s=e.unsuspend;e.unsuspend=null,s()}},6e4+t);0<e.imgBytes&&qu===0&&(qu=62500*vA());var a=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Yu(e,e.stylesheets),e.unsuspend)){var s=e.unsuspend;e.unsuspend=null,s()}},(e.imgBytes>qu?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(a)}}:null}function CM(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)Yu(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function Yl(){this.count--,CM(this)}function tw(){this.imgCount--,CM(this)}var Mh=null;function Yu(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Mh=new Map,t.forEach(ew,e),Mh=null,Yl.call(e))}function ew(e,t){if(!(t.state.loading&4)){var n=Mh.get(e);if(n)var i=n.get(null);else{n=new Map,Mh.set(e,n);for(var a=e.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<a.length;s++){var r=a[s];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}a=t.instance,r=a.getAttribute("data-precedence"),s=n.get(r)||i,s===i&&n.set(null,a),n.set(r,a),this.count++,i=Yl.bind(this),a.addEventListener("load",i),a.addEventListener("error",i),s?s.parentNode.insertBefore(a,s.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(a,e.firstChild)),t.state.loading|=4}}var go={$$typeof:qi,Provider:null,Consumer:null,_currentValue:Xs,_currentValue2:Xs,_threadCount:0};function nw(e,t,n,i,a,s,r,o,l){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=vp(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=vp(0),this.hiddenUpdates=vp(null),this.identifierPrefix=i,this.onUncaughtError=a,this.onCaughtError=s,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.transitionTypes=null,this.incompleteTransitions=new Map}function RM(e,t,n,i,a,s,r,o,l,c,u,d){return e=new nw(e,t,n,r,l,c,u,d,o),t=1,s===!0&&(t|=24),s=Nn(3,null,null,t),e.current=s,s.stateNode=e,t=gg(),t.refCount++,e.pooledCache=t,t.refCount++,s.memoizedState={element:i,isDehydrated:n,cache:t},yg(s),e}function DM(e){return e?(e=Wr,e):Wr}function UM(e,t,n,i,a,s){a=DM(a),i.context===null?i.context=a:i.pendingContext=a,i=$a(t),i.payload={element:n},s=s===void 0?null:s,s!==null&&(i.callback=s),n=ts(e,i,t),n!==null&&(Ln(n,e,t),Tl(n,e,t))}function Ry(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Qg(e,t){Ry(e,t),(e=e.alternate)&&Ry(e,t)}function NM(e){if(e.tag===13||e.tag===31){var t=rr(e,67108864);t!==null&&Ln(t,e,67108864),Qg(e,67108864)}}function Dy(e){if(e.tag===13||e.tag===31){var t=Zn();t=ag(t);var n=rr(e,t);n!==null&&Ln(n,e,t),Qg(e,t)}}var vo=!0;function iw(e,t,n,i){var a=It.T;It.T=null;var s=fe.p;try{fe.p=2,jg(e,t,n,i)}finally{fe.p=s,It.T=a}}function aw(e,t,n,i){var a=It.T;It.T=null;var s=fe.p;try{fe.p=8,jg(e,t,n,i)}finally{fe.p=s,It.T=a}}function jg(e,t,n,i){if(vo){var a=$m(i);if(a===null)Hp(e,t,i,bh,n),Uy(e,i);else if(rw(a,e,t,n,i))i.stopPropagation();else if(Uy(e,i),t&4&&-1<sw.indexOf(e)){for(;a!==null;){var s=xo(a);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var r=Fs(s.pendingLanes);if(r!==0){var o=s;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-Yn(r);o.entanglements[1]|=l,r&=~l}ta(s),(he&6)===0&&(vh=Wn()+500,sc(0,!1))}}break;case 31:case 13:o=rr(s,2),o!==null&&Ln(o,s,2),Fh(),Qg(s,2)}if(s=$m(i),s===null&&Hp(e,t,i,bh,n),s===a)break;a=s}a!==null&&i.stopPropagation()}else Hp(e,t,i,null,n)}}function $m(e){return e=og(e),$g(e)}var bh=null;function $g(e){if(bh=null,e=Gs(e),e!==null){var t=Kl(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=By(t),e!==null)return e;e=null}else if(n===31){if(e=zy(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return bh=e,null}function LM(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(yE()){case Xy:return 2;case Wy:return 8;case ju:case xE:return 32;case qy:return 268435456;default:return 32}default:return 32}}var tg=!1,as=null,ss=null,rs=null,Zl=new Map,Jl=new Map,Xa=[],sw="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Uy(e,t){switch(e){case"focusin":case"focusout":as=null;break;case"dragenter":case"dragleave":ss=null;break;case"mouseover":case"mouseout":rs=null;break;case"pointerover":case"pointerout":Zl.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Jl.delete(t.pointerId)}}function pl(e,t,n,i,a,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[a]},t!==null&&(t=xo(t),t!==null&&NM(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function rw(e,t,n,i,a){switch(t){case"focusin":return as=pl(as,e,t,n,i,a),!0;case"dragenter":return ss=pl(ss,e,t,n,i,a),!0;case"mouseover":return rs=pl(rs,e,t,n,i,a),!0;case"pointerover":var s=a.pointerId;return Zl.set(s,pl(Zl.get(s)||null,e,t,n,i,a)),!0;case"gotpointercapture":return s=a.pointerId,Jl.set(s,pl(Jl.get(s)||null,e,t,n,i,a)),!0}return!1}function OM(e){var t=Gs(e.target);if(t!==null){var n=Kl(t);if(n!==null){if(t=n.tag,t===13){if(t=By(n),t!==null){e.blockedOn=t,i_(e.priority,function(){Dy(n)});return}}else if(t===31){if(t=zy(n),t!==null){e.blockedOn=t,i_(e.priority,function(){Dy(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Zu(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=$m(e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);im=i,n.target.dispatchEvent(i),im=null}else return t=xo(n),t!==null&&NM(t),e.blockedOn=n,!1;t.shift()}return!0}function Ny(e,t,n){Zu(e)&&n.delete(t)}function ow(){tg=!1,as!==null&&Zu(as)&&(as=null),ss!==null&&Zu(ss)&&(ss=null),rs!==null&&Zu(rs)&&(rs=null),Zl.forEach(Ny),Jl.forEach(Ny)}function Cu(e,t){e.blockedOn===t&&(e.blockedOn=null,tg||(tg=!0,Ze.unstable_scheduleCallback(Ze.unstable_NormalPriority,ow)))}var Ru=null;function Ly(e){Ru!==e&&(Ru=e,Ze.unstable_scheduleCallback(Ze.unstable_NormalPriority,function(){Ru===e&&(Ru=null);for(var t=0;t<e.length;t+=3){var n=e[t],i=e[t+1],a=e[t+2];if(typeof i!="function"){if($g(i||n)===null)continue;break}var s=xo(n);s!==null&&(e.splice(t,3),t-=3,ym(s,{pending:!0,data:a,method:n.method,action:i},i,a))}}))}function _o(e){function t(l){return Cu(l,e)}as!==null&&Cu(as,e),ss!==null&&Cu(ss,e),rs!==null&&Cu(rs,e),Zl.forEach(t),Jl.forEach(t);for(var n=0;n<Xa.length;n++){var i=Xa[n];i.blockedOn===e&&(i.blockedOn=null)}for(;0<Xa.length&&(n=Xa[0],n.blockedOn===null);)OM(n),n.blockedOn===null&&Xa.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var a=n[i],s=n[i+1],r=a[In]||null;if(typeof s=="function")r||Ly(n);else if(r){var o=null;if(s&&s.hasAttribute("formAction")){if(a=s,r=s[In]||null)o=r.formAction;else if($g(a)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),Ly(n)}}}function IM(){function e(s){s.canIntercept&&s.info==="react-transition"&&s.intercept({handler:function(){return new Promise(function(r){return a=r})},focusReset:"manual",scroll:"manual"})}function t(){a!==null&&(a(),a=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var s=navigation.currentEntry;s&&s.url!=null&&navigation.navigate(s.url,{state:s.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,a=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),a!==null&&(a(),a=null)}}}function t0(e){this._internalRoot=e}Gh.prototype.render=t0.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(J(409));var n=t.current,i=Zn();UM(n,i,e,t,null,null)};Gh.prototype.unmount=t0.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;UM(e.current,2,null,e,null,null),Fh(),t[yo]=null}};function Gh(e){this._internalRoot=e}Gh.prototype.unstable_scheduleHydration=function(e){if(e){var t=jy();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Xa.length&&t!==0&&t<Xa[n].priority;n++);Xa.splice(n,0,e),n===0&&OM(e)}};var Oy=Iy.version;if(Oy!=="19.3.1")throw Error(J(527,Oy,"19.3.1"));fe.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(J(188)):(e=Object.keys(e).join(","),Error(J(268,e)));return e=lE(t),e=e!==null?Fy(e):null,e=e===null?null:e.stateNode,e};var lw={bundleType:0,version:"19.3.1",rendererPackageName:"react-dom",currentDispatcherRef:It,reconcilerVersion:"19.3.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(ml=__REACT_DEVTOOLS_GLOBAL_HOOK__,!ml.isDisabled&&ml.supportsFiber))try{Ql=ml.inject(lw),qn=ml}catch{}var ml;kh.createRoot=function(e,t){if(!Py(e))throw Error(J(299));var n=!1,i="",a=mS,s=gS,r=vS;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(a=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=RM(e,1,!1,null,null,n,i,null,a,s,r,IM),e[yo]=t.current,Wg(e),new t0(t)};kh.hydrateRoot=function(e,t,n){if(!Py(e))throw Error(J(299));var i=!1,a="",s=mS,r=gS,o=vS,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(s=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),t=RM(e,1,!0,t,n??null,i,a,l,s,r,o,IM),t.context=DM(null),n=t.current,i=Zn(),i=ag(i),a=$a(i),a.callback=null,ts(n,a,i),n=i,t.current.lanes=n,$l(t,n),ta(t),e[yo]=t.current,Wg(e),new Gh(t)};kh.version="19.3.1"});var FM=Fi((KD,zM)=>{"use strict";function BM(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(BM)}catch(e){console.error(e)}}BM(),zM.exports=PM()});var w1=Fi(kd=>{"use strict";var TD=Symbol.for("react.transitional.element"),AD=Symbol.for("react.fragment");function A1(e,t,n){var i=null;if(n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),"key"in t){n={};for(var a in t)a!=="key"&&(n[a]=t[a])}else n=t;return t=n.ref,{$$typeof:TD,type:e,key:i,ref:t!==void 0?t:null,props:n}}kd.Fragment=AD;kd.jsx=A1;kd.jsxs=A1});var Zc=Fi((_O,C1)=>{"use strict";C1.exports=w1()});var la=Ps(sl(),1),z1=Ps(FM(),1);var Tr=Ps(sl(),1);var lb=0,O0=1,cb=2;var I0=1,ub=2,aa=3,Ua=0,wn=1,sa=2,Bi=0,Na=1,zc=2,P0=3,B0=4,Fc=5,Ms=100,hb=101,fb=102,db=103,pb=104,qf=200,zi=201,mb=202,gb=203,df=204,pr=205,vb=206,_b=207,yb=208,xb=209,Sb=210,Mb=211,bb=212,Eb=213,Tb=214,Yf=0,Zf=1,Jf=2,mr=3,Kf=4,Qf=5,jf=6,$f=7,z0=0,Ab=1,wb=2,Ia=0,Cb=1,Rb=2,Db=3,Ub=4,Nb=5,Lb=6,Ob=7;var F0=300,_r=301,yr=302,td=303,ed=304,Hc=306,pf=1e3,Ss=1001,mf=1002,yi=1003,Ib=1004;var Vc=1005;var Ii=1006,nd=1007;var Cs=1008;var Mi=1009,H0=1010,V0=1011,Yo=1012,id=1013,Rs=1014,ra=1015,Ds=1016,ad=1017,sd=1018,Zo=1020,G0=35902,k0=35899,X0=1021,W0=1022,bi=1023,Fo=1026,Jo=1027,q0=1028,rd=1029,Y0=1030,od=1031;var ld=1033,Gc=33776,kc=33777,Xc=33778,Wc=33779,cd=35840,ud=35841,hd=35842,fd=35843,dd=36196,pd=37492,md=37496,gd=37808,vd=37809,_d=37810,yd=37811,xd=37812,Sd=37813,Md=37814,bd=37815,Ed=37816,Td=37817,Ad=37818,wd=37819,Cd=37820,Rd=37821,Dd=36492,Ud=36494,Nd=36495,Ld=36283,Od=36284,Id=36285,Pd=36286;var gc=2300,gf=2301,ff=2302,C0=2400,R0=2401,D0=2402;var Pb=3200,Bb=3201;var zb=0,Fb=1,Pa="",$n="srgb",na="srgb-linear",vc="linear",xe="srgb";var fr=7680;var U0=519,Hb=512,Vb=513,Gb=514,Z0=515,kb=516,Xb=517,Wb=518,qb=519,N0=35044;var J0="300 es",Oi=2e3,_c=2001;var La=class{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){let i=this._listeners;if(i===void 0)return;let a=i[t];if(a!==void 0){let s=a.indexOf(n);s!==-1&&a.splice(s,1)}}dispatchEvent(t){let n=this._listeners;if(n===void 0)return;let i=n[t.type];if(i!==void 0){t.target=this;let a=i.slice(0);for(let s=0,r=a.length;s<r;s++)a[s].call(this,t);t.target=null}}},vn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var e0=Math.PI/180,vf=180/Math.PI;function qc(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(vn[e&255]+vn[e>>8&255]+vn[e>>16&255]+vn[e>>24&255]+"-"+vn[t&255]+vn[t>>8&255]+"-"+vn[t>>16&15|64]+vn[t>>24&255]+"-"+vn[n&63|128]+vn[n>>8&255]+"-"+vn[n>>16&255]+vn[n>>24&255]+vn[i&255]+vn[i>>8&255]+vn[i>>16&255]+vn[i>>24&255]).toLowerCase()}function $t(e,t,n){return Math.max(t,Math.min(n,e))}function cw(e,t){return(e%t+t)%t}function n0(e,t,n){return(1-n)*e+n*t}function lc(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function Pn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}var Ut=class e{constructor(t=0,n=0){e.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let n=this.x,i=this.y,a=t.elements;return this.x=a[0]*n+a[3]*i+a[6],this.y=a[1]*n+a[4]*i+a[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=$t(this.x,t.x,n.x),this.y=$t(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=$t(this.x,t,n),this.y=$t(this.y,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar($t(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos($t(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){let i=Math.cos(n),a=Math.sin(n),s=this.x-t.x,r=this.y-t.y;return this.x=s*i-r*a+t.x,this.y=s*a+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Oa=class{constructor(t=0,n=0,i=0,a=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=a}static slerpFlat(t,n,i,a,s,r,o){let l=i[a+0],c=i[a+1],u=i[a+2],d=i[a+3],f=s[r+0],p=s[r+1],g=s[r+2],x=s[r+3];if(o===0){t[n+0]=l,t[n+1]=c,t[n+2]=u,t[n+3]=d;return}if(o===1){t[n+0]=f,t[n+1]=p,t[n+2]=g,t[n+3]=x;return}if(d!==x||l!==f||c!==p||u!==g){let m=1-o,h=l*f+c*p+u*g+d*x,v=h>=0?1:-1,_=1-h*h;if(_>Number.EPSILON){let T=Math.sqrt(_),C=Math.atan2(T,h*v);m=Math.sin(m*C)/T,o=Math.sin(o*C)/T}let y=o*v;if(l=l*m+f*y,c=c*m+p*y,u=u*m+g*y,d=d*m+x*y,m===1-o){let T=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=T,c*=T,u*=T,d*=T}}t[n]=l,t[n+1]=c,t[n+2]=u,t[n+3]=d}static multiplyQuaternionsFlat(t,n,i,a,s,r){let o=i[a],l=i[a+1],c=i[a+2],u=i[a+3],d=s[r],f=s[r+1],p=s[r+2],g=s[r+3];return t[n]=o*g+u*d+l*p-c*f,t[n+1]=l*g+u*f+c*d-o*p,t[n+2]=c*g+u*p+o*f-l*d,t[n+3]=u*g-o*d-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,a){return this._x=t,this._y=n,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){let i=t._x,a=t._y,s=t._z,r=t._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(a/2),d=o(s/2),f=l(i/2),p=l(a/2),g=l(s/2);switch(r){case"XYZ":this._x=f*u*d+c*p*g,this._y=c*p*d-f*u*g,this._z=c*u*g+f*p*d,this._w=c*u*d-f*p*g;break;case"YXZ":this._x=f*u*d+c*p*g,this._y=c*p*d-f*u*g,this._z=c*u*g-f*p*d,this._w=c*u*d+f*p*g;break;case"ZXY":this._x=f*u*d-c*p*g,this._y=c*p*d+f*u*g,this._z=c*u*g+f*p*d,this._w=c*u*d-f*p*g;break;case"ZYX":this._x=f*u*d-c*p*g,this._y=c*p*d+f*u*g,this._z=c*u*g-f*p*d,this._w=c*u*d+f*p*g;break;case"YZX":this._x=f*u*d+c*p*g,this._y=c*p*d+f*u*g,this._z=c*u*g-f*p*d,this._w=c*u*d-f*p*g;break;case"XZY":this._x=f*u*d-c*p*g,this._y=c*p*d-f*u*g,this._z=c*u*g+f*p*d,this._w=c*u*d+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){let i=n/2,a=Math.sin(i);return this._x=t.x*a,this._y=t.y*a,this._z=t.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let n=t.elements,i=n[0],a=n[4],s=n[8],r=n[1],o=n[5],l=n[9],c=n[2],u=n[6],d=n[10],f=i+o+d;if(f>0){let p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(r-a)*p}else if(i>o&&i>d){let p=2*Math.sqrt(1+i-o-d);this._w=(u-l)/p,this._x=.25*p,this._y=(a+r)/p,this._z=(s+c)/p}else if(o>d){let p=2*Math.sqrt(1+o-i-d);this._w=(s-c)/p,this._x=(a+r)/p,this._y=.25*p,this._z=(l+u)/p}else{let p=2*Math.sqrt(1+d-i-o);this._w=(r-a)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs($t(this.dot(t),-1,1)))}rotateTowards(t,n){let i=this.angleTo(t);if(i===0)return this;let a=Math.min(1,n/i);return this.slerp(t,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){let i=t._x,a=t._y,s=t._z,r=t._w,o=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+r*o+a*c-s*l,this._y=a*u+r*l+s*o-i*c,this._z=s*u+r*c+i*l-a*o,this._w=r*u-i*o-a*l-s*c,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);let i=this._x,a=this._y,s=this._z,r=this._w,o=r*t._w+i*t._x+a*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=r,this._x=i,this._y=a,this._z=s,this;let l=1-o*o;if(l<=Number.EPSILON){let p=1-n;return this._w=p*r+n*this._w,this._x=p*i+n*this._x,this._y=p*a+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-n)*u)/c,f=Math.sin(n*u)/c;return this._w=r*d+this._w*f,this._x=i*d+this._x*f,this._y=a*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){let t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(a*Math.sin(t),a*Math.cos(t),s*Math.sin(n),s*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class e{constructor(t=0,n=0,i=0){e.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(HM.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(HM.setFromAxisAngle(t,n))}applyMatrix3(t){let n=this.x,i=this.y,a=this.z,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6]*a,this.y=s[1]*n+s[4]*i+s[7]*a,this.z=s[2]*n+s[5]*i+s[8]*a,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let n=this.x,i=this.y,a=this.z,s=t.elements,r=1/(s[3]*n+s[7]*i+s[11]*a+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*a+s[12])*r,this.y=(s[1]*n+s[5]*i+s[9]*a+s[13])*r,this.z=(s[2]*n+s[6]*i+s[10]*a+s[14])*r,this}applyQuaternion(t){let n=this.x,i=this.y,a=this.z,s=t.x,r=t.y,o=t.z,l=t.w,c=2*(r*a-o*i),u=2*(o*n-s*a),d=2*(s*i-r*n);return this.x=n+l*c+r*d-o*u,this.y=i+l*u+o*c-s*d,this.z=a+l*d+s*u-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let n=this.x,i=this.y,a=this.z,s=t.elements;return this.x=s[0]*n+s[4]*i+s[8]*a,this.y=s[1]*n+s[5]*i+s[9]*a,this.z=s[2]*n+s[6]*i+s[10]*a,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=$t(this.x,t.x,n.x),this.y=$t(this.y,t.y,n.y),this.z=$t(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=$t(this.x,t,n),this.y=$t(this.y,t,n),this.z=$t(this.z,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar($t(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){let i=t.x,a=t.y,s=t.z,r=n.x,o=n.y,l=n.z;return this.x=a*l-s*o,this.y=s*r-i*l,this.z=i*o-a*r,this}projectOnVector(t){let n=t.lengthSq();if(n===0)return this.set(0,0,0);let i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return i0.copy(this).projectOnVector(t),this.sub(i0)}reflect(t){return this.sub(i0.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos($t(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y,a=this.z-t.z;return n*n+i*i+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){let a=Math.sin(n)*t;return this.x=a*Math.sin(i),this.y=Math.cos(n)*t,this.z=a*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){let n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),a=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=a,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},i0=new L,HM=new Oa,Wt=class e{constructor(t,n,i,a,s,r,o,l,c){e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,a,s,r,o,l,c)}set(t,n,i,a,s,r,o,l,c){let u=this.elements;return u[0]=t,u[1]=a,u[2]=o,u[3]=n,u[4]=s,u[5]=l,u[6]=i,u[7]=r,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,a=n.elements,s=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],f=i[2],p=i[5],g=i[8],x=a[0],m=a[3],h=a[6],v=a[1],_=a[4],y=a[7],T=a[2],C=a[5],w=a[8];return s[0]=r*x+o*v+l*T,s[3]=r*m+o*_+l*C,s[6]=r*h+o*y+l*w,s[1]=c*x+u*v+d*T,s[4]=c*m+u*_+d*C,s[7]=c*h+u*y+d*w,s[2]=f*x+p*v+g*T,s[5]=f*m+p*_+g*C,s[8]=f*h+p*y+g*w,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[1],a=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return n*r*u-n*o*c-i*s*u+i*o*l+a*s*c-a*r*l}invert(){let t=this.elements,n=t[0],i=t[1],a=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=u*r-o*c,f=o*l-u*s,p=c*s-r*l,g=n*d+i*f+a*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=d*x,t[1]=(a*c-u*i)*x,t[2]=(o*i-a*r)*x,t[3]=f*x,t[4]=(u*n-a*l)*x,t[5]=(a*s-o*n)*x,t[6]=p*x,t[7]=(i*l-c*n)*x,t[8]=(r*n-i*s)*x,this}transpose(){let t,n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,a,s,r,o){let l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*r+c*o)+r+t,-a*c,a*l,-a*(-c*r+l*o)+o+n,0,0,1),this}scale(t,n){return this.premultiply(a0.makeScale(t,n)),this}rotate(t){return this.premultiply(a0.makeRotation(-t)),this}translate(t,n){return this.premultiply(a0.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){let n=this.elements,i=t.elements;for(let a=0;a<9;a++)if(n[a]!==i[a])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},a0=new Wt;function K0(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function yc(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function Yb(){let e=yc("canvas");return e.style.display="block",e}var VM={};function Ho(e){e in VM||(VM[e]=!0,console.warn(e))}function Zb(e,t,n){return new Promise(function(i,a){function s(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:a();break;case e.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}var GM=new Wt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),kM=new Wt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function uw(){let e={enabled:!0,workingColorSpace:na,spaces:{},convert:function(a,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===xe&&(a.r=Da(a.r),a.g=Da(a.g),a.b=Da(a.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(a.applyMatrix3(this.spaces[s].toXYZ),a.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===xe&&(a.r=zo(a.r),a.g=zo(a.g),a.b=zo(a.b))),a},workingToColorSpace:function(a,s){return this.convert(a,this.workingColorSpace,s)},colorSpaceToWorking:function(a,s){return this.convert(a,s,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===Pa?vc:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,s=this.workingColorSpace){return a.fromArray(this.spaces[s].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,s,r){return a.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,s){return Ho("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(a,s)},toWorkingColorSpace:function(a,s){return Ho("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(a,s)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[na]:{primaries:t,whitePoint:i,transfer:vc,toXYZ:GM,fromXYZ:kM,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:$n},outputColorSpaceConfig:{drawingBufferColorSpace:$n}},[$n]:{primaries:t,whitePoint:i,transfer:xe,toXYZ:GM,fromXYZ:kM,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:$n}}}),e}var re=uw();function Da(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function zo(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}var Ao,_f=class{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Ao===void 0&&(Ao=yc("canvas")),Ao.width=t.width,Ao.height=t.height;let a=Ao.getContext("2d");t instanceof ImageData?a.putImageData(t,0,0):a.drawImage(t,0,0,t.width,t.height),i=Ao}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let n=yc("canvas");n.width=t.width,n.height=t.height;let i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let a=i.getImageData(0,0,t.width,t.height),s=a.data;for(let r=0;r<s.length;r++)s[r]=Da(s[r]/255)*255;return i.putImageData(a,0,0),n}else if(t.data){let n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Da(n[i]/255)*255):n[i]=Da(n[i]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},hw=0,Vo=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:hw++}),this.uuid=qc(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):n instanceof VideoFrame?t.set(n.displayHeight,n.displayWidth,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let s;if(Array.isArray(a)){s=[];for(let r=0,o=a.length;r<o;r++)a[r].isDataTexture?s.push(s0(a[r].image)):s.push(s0(a[r]))}else s=s0(a);i.url=s}return n||(t.images[this.uuid]=i),i}};function s0(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?_f.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var fw=0,r0=new L,ti=class e extends La{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,i=Ss,a=Ss,s=Ii,r=Cs,o=bi,l=Mi,c=e.DEFAULT_ANISOTROPY,u=Pa){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:fw++}),this.uuid=qc(),this.name="",this.source=new Vo(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ut(0,0),this.repeat=new Ut(1,1),this.center=new Ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Wt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(r0).x}get height(){return this.source.getSize(r0).y}get depth(){return this.source.getSize(r0).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let n in t){let i=t[n];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${n}' has value of undefined.`);continue}let a=this[n];if(a===void 0){console.warn(`THREE.Texture.setValues(): property '${n}' does not exist.`);continue}a&&i&&a.isVector2&&i.isVector2||a&&i&&a.isVector3&&i.isVector3||a&&i&&a.isMatrix3&&i.isMatrix3?a.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==F0)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case pf:t.x=t.x-Math.floor(t.x);break;case Ss:t.x=t.x<0?0:1;break;case mf:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case pf:t.y=t.y-Math.floor(t.y);break;case Ss:t.y=t.y<0?0:1;break;case mf:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};ti.DEFAULT_IMAGE=null;ti.DEFAULT_MAPPING=F0;ti.DEFAULT_ANISOTROPY=1;var Le=class e{constructor(t=0,n=0,i=0,a=1){e.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=a}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,a){return this.x=t,this.y=n,this.z=i,this.w=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let n=this.x,i=this.y,a=this.z,s=this.w,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*a+r[12]*s,this.y=r[1]*n+r[5]*i+r[9]*a+r[13]*s,this.z=r[2]*n+r[6]*i+r[10]*a+r[14]*s,this.w=r[3]*n+r[7]*i+r[11]*a+r[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,a,s,l=t.elements,c=l[0],u=l[4],d=l[8],f=l[1],p=l[5],g=l[9],x=l[2],m=l[6],h=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+h-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;let _=(c+1)/2,y=(p+1)/2,T=(h+1)/2,C=(u+f)/4,w=(d+x)/4,R=(g+m)/4;return _>y&&_>T?_<.01?(i=0,a=.707106781,s=.707106781):(i=Math.sqrt(_),a=C/i,s=w/i):y>T?y<.01?(i=.707106781,a=0,s=.707106781):(a=Math.sqrt(y),i=C/a,s=R/a):T<.01?(i=.707106781,a=.707106781,s=0):(s=Math.sqrt(T),i=w/s,a=R/s),this.set(i,a,s,n),this}let v=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(f-u)*(f-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(d-x)/v,this.z=(f-u)/v,this.w=Math.acos((c+p+h-1)/2),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=$t(this.x,t.x,n.x),this.y=$t(this.y,t.y,n.y),this.z=$t(this.z,t.z,n.z),this.w=$t(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=$t(this.x,t,n),this.y=$t(this.y,t,n),this.z=$t(this.z,t,n),this.w=$t(this.w,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar($t(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},yf=class extends La{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ii,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new Le(0,0,t,n),this.scissorTest=!1,this.viewport=new Le(0,0,t,n);let a={width:t,height:n,depth:i.depth},s=new ti(a);this.textures=[];let r=i.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){let n={minFilter:Ii,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let a=0,s=this.textures.length;a<s;a++)this.textures[a].image.width=t,this.textures[a].image.height=n,this.textures[a].image.depth=i,this.textures[a].isArrayTexture=this.textures[a].image.depth>1;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;let a=Object.assign({},t.textures[n].image);this.textures[n].source=new Vo(a)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},xi=class extends yf{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}},xc=class extends ti{constructor(t=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:a},this.magFilter=yi,this.minFilter=yi,this.wrapR=Ss,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var xf=class extends ti{constructor(t=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:a},this.magFilter=yi,this.minFilter=yi,this.wrapR=Ss,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var bs=class{constructor(t=new L(1/0,1/0,1/0),n=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(Ui.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(Ui.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){let i=Ui.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let s=i.getAttribute("position");if(n===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,Ui):Ui.fromBufferAttribute(s,r),Ui.applyMatrix4(t.matrixWorld),this.expandByPoint(Ui);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Xh.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Xh.copy(i.boundingBox)),Xh.applyMatrix4(t.matrixWorld),this.union(Xh)}let a=t.children;for(let s=0,r=a.length;s<r;s++)this.expandByObject(a[s],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ui),Ui.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(cc),Wh.subVectors(this.max,cc),wo.subVectors(t.a,cc),Co.subVectors(t.b,cc),Ro.subVectors(t.c,cc),ps.subVectors(Co,wo),ms.subVectors(Ro,Co),lr.subVectors(wo,Ro);let n=[0,-ps.z,ps.y,0,-ms.z,ms.y,0,-lr.z,lr.y,ps.z,0,-ps.x,ms.z,0,-ms.x,lr.z,0,-lr.x,-ps.y,ps.x,0,-ms.y,ms.x,0,-lr.y,lr.x,0];return!o0(n,wo,Co,Ro,Wh)||(n=[1,0,0,0,1,0,0,0,1],!o0(n,wo,Co,Ro,Wh))?!1:(qh.crossVectors(ps,ms),n=[qh.x,qh.y,qh.z],o0(n,wo,Co,Ro,Wh))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ui).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ui).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ta[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ta[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ta[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ta[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ta[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ta[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ta[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ta[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ta),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Ta=[new L,new L,new L,new L,new L,new L,new L,new L],Ui=new L,Xh=new bs,wo=new L,Co=new L,Ro=new L,ps=new L,ms=new L,lr=new L,cc=new L,Wh=new L,qh=new L,cr=new L;function o0(e,t,n,i,a){for(let s=0,r=e.length-3;s<=r;s+=3){cr.fromArray(e,s);let o=a.x*Math.abs(cr.x)+a.y*Math.abs(cr.y)+a.z*Math.abs(cr.z),l=t.dot(cr),c=n.dot(cr),u=i.dot(cr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var dw=new bs,uc=new L,l0=new L,gr=class{constructor(t=new L,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){let i=this.center;n!==void 0?i.copy(n):dw.setFromPoints(t).getCenter(i);let a=0;for(let s=0,r=t.length;s<r;s++)a=Math.max(a,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(a),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){let i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;uc.subVectors(t,this.center);let n=uc.lengthSq();if(n>this.radius*this.radius){let i=Math.sqrt(n),a=(i-this.radius)*.5;this.center.addScaledVector(uc,a/i),this.radius+=a}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(l0.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(uc.copy(t.center).add(l0)),this.expandByPoint(uc.copy(t.center).sub(l0))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Aa=new L,c0=new L,Yh=new L,gs=new L,u0=new L,Zh=new L,h0=new L,Sc=class{constructor(t=new L,n=new L(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Aa)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);let i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let n=Aa.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Aa.copy(this.origin).addScaledVector(this.direction,n),Aa.distanceToSquared(t))}distanceSqToSegment(t,n,i,a){c0.copy(t).add(n).multiplyScalar(.5),Yh.copy(n).sub(t).normalize(),gs.copy(this.origin).sub(c0);let s=t.distanceTo(n)*.5,r=-this.direction.dot(Yh),o=gs.dot(this.direction),l=-gs.dot(Yh),c=gs.lengthSq(),u=Math.abs(1-r*r),d,f,p,g;if(u>0)if(d=r*l-o,f=r*o-l,g=s*u,d>=0)if(f>=-g)if(f<=g){let x=1/u;d*=x,f*=x,p=d*(d+r*f+2*o)+f*(r*d+f+2*l)+c}else f=s,d=Math.max(0,-(r*f+o)),p=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(r*f+o)),p=-d*d+f*(f+2*l)+c;else f<=-g?(d=Math.max(0,-(-r*s+o)),f=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+f*(f+2*l)+c):f<=g?(d=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(d=Math.max(0,-(r*s+o)),f=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+f*(f+2*l)+c);else f=r>0?-s:s,d=Math.max(0,-(r*f+o)),p=-d*d+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),a&&a.copy(c0).addScaledVector(Yh,f),p}intersectSphere(t,n){Aa.subVectors(t.center,this.origin);let i=Aa.dot(this.direction),a=Aa.dot(Aa)-i*i,s=t.radius*t.radius;if(a>s)return null;let r=Math.sqrt(s-a),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){let i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){let n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,a,s,r,o,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,a=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,a=(t.min.x-f.x)*c),u>=0?(s=(t.min.y-f.y)*u,r=(t.max.y-f.y)*u):(s=(t.max.y-f.y)*u,r=(t.min.y-f.y)*u),i>r||s>a||((s>i||isNaN(i))&&(i=s),(r<a||isNaN(a))&&(a=r),d>=0?(o=(t.min.z-f.z)*d,l=(t.max.z-f.z)*d):(o=(t.max.z-f.z)*d,l=(t.min.z-f.z)*d),i>l||o>a)||((o>i||i!==i)&&(i=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(i>=0?i:a,n)}intersectsBox(t){return this.intersectBox(t,Aa)!==null}intersectTriangle(t,n,i,a,s){u0.subVectors(n,t),Zh.subVectors(i,t),h0.crossVectors(u0,Zh);let r=this.direction.dot(h0),o;if(r>0){if(a)return null;o=1}else if(r<0)o=-1,r=-r;else return null;gs.subVectors(this.origin,t);let l=o*this.direction.dot(Zh.crossVectors(gs,Zh));if(l<0)return null;let c=o*this.direction.dot(u0.cross(gs));if(c<0||l+c>r)return null;let u=-o*gs.dot(h0);return u<0?null:this.at(u/r,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ve=class e{constructor(t,n,i,a,s,r,o,l,c,u,d,f,p,g,x,m){e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,a,s,r,o,l,c,u,d,f,p,g,x,m)}set(t,n,i,a,s,r,o,l,c,u,d,f,p,g,x,m){let h=this.elements;return h[0]=t,h[4]=n,h[8]=i,h[12]=a,h[1]=s,h[5]=r,h[9]=o,h[13]=l,h[2]=c,h[6]=u,h[10]=d,h[14]=f,h[3]=p,h[7]=g,h[11]=x,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){let n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){let n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){let n=this.elements,i=t.elements,a=1/Do.setFromMatrixColumn(t,0).length(),s=1/Do.setFromMatrixColumn(t,1).length(),r=1/Do.setFromMatrixColumn(t,2).length();return n[0]=i[0]*a,n[1]=i[1]*a,n[2]=i[2]*a,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){let n=this.elements,i=t.x,a=t.y,s=t.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(a),c=Math.sin(a),u=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){let f=r*u,p=r*d,g=o*u,x=o*d;n[0]=l*u,n[4]=-l*d,n[8]=c,n[1]=p+g*c,n[5]=f-x*c,n[9]=-o*l,n[2]=x-f*c,n[6]=g+p*c,n[10]=r*l}else if(t.order==="YXZ"){let f=l*u,p=l*d,g=c*u,x=c*d;n[0]=f+x*o,n[4]=g*o-p,n[8]=r*c,n[1]=r*d,n[5]=r*u,n[9]=-o,n[2]=p*o-g,n[6]=x+f*o,n[10]=r*l}else if(t.order==="ZXY"){let f=l*u,p=l*d,g=c*u,x=c*d;n[0]=f-x*o,n[4]=-r*d,n[8]=g+p*o,n[1]=p+g*o,n[5]=r*u,n[9]=x-f*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(t.order==="ZYX"){let f=r*u,p=r*d,g=o*u,x=o*d;n[0]=l*u,n[4]=g*c-p,n[8]=f*c+x,n[1]=l*d,n[5]=x*c+f,n[9]=p*c-g,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(t.order==="YZX"){let f=r*l,p=r*c,g=o*l,x=o*c;n[0]=l*u,n[4]=x-f*d,n[8]=g*d+p,n[1]=d,n[5]=r*u,n[9]=-o*u,n[2]=-c*u,n[6]=p*d+g,n[10]=f-x*d}else if(t.order==="XZY"){let f=r*l,p=r*c,g=o*l,x=o*c;n[0]=l*u,n[4]=-d,n[8]=c*u,n[1]=f*d+x,n[5]=r*u,n[9]=p*d-g,n[2]=g*d-p,n[6]=o*u,n[10]=x*d+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(pw,t,mw)}lookAt(t,n,i){let a=this.elements;return Qn.subVectors(t,n),Qn.lengthSq()===0&&(Qn.z=1),Qn.normalize(),vs.crossVectors(i,Qn),vs.lengthSq()===0&&(Math.abs(i.z)===1?Qn.x+=1e-4:Qn.z+=1e-4,Qn.normalize(),vs.crossVectors(i,Qn)),vs.normalize(),Jh.crossVectors(Qn,vs),a[0]=vs.x,a[4]=Jh.x,a[8]=Qn.x,a[1]=vs.y,a[5]=Jh.y,a[9]=Qn.y,a[2]=vs.z,a[6]=Jh.z,a[10]=Qn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,a=n.elements,s=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],f=i[9],p=i[13],g=i[2],x=i[6],m=i[10],h=i[14],v=i[3],_=i[7],y=i[11],T=i[15],C=a[0],w=a[4],R=a[8],E=a[12],S=a[1],U=a[5],B=a[9],G=a[13],W=a[2],Q=a[6],Y=a[10],at=a[14],k=a[3],ct=a[7],pt=a[11],bt=a[15];return s[0]=r*C+o*S+l*W+c*k,s[4]=r*w+o*U+l*Q+c*ct,s[8]=r*R+o*B+l*Y+c*pt,s[12]=r*E+o*G+l*at+c*bt,s[1]=u*C+d*S+f*W+p*k,s[5]=u*w+d*U+f*Q+p*ct,s[9]=u*R+d*B+f*Y+p*pt,s[13]=u*E+d*G+f*at+p*bt,s[2]=g*C+x*S+m*W+h*k,s[6]=g*w+x*U+m*Q+h*ct,s[10]=g*R+x*B+m*Y+h*pt,s[14]=g*E+x*G+m*at+h*bt,s[3]=v*C+_*S+y*W+T*k,s[7]=v*w+_*U+y*Q+T*ct,s[11]=v*R+_*B+y*Y+T*pt,s[15]=v*E+_*G+y*at+T*bt,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[4],a=t[8],s=t[12],r=t[1],o=t[5],l=t[9],c=t[13],u=t[2],d=t[6],f=t[10],p=t[14],g=t[3],x=t[7],m=t[11],h=t[15];return g*(+s*l*d-a*c*d-s*o*f+i*c*f+a*o*p-i*l*p)+x*(+n*l*p-n*c*f+s*r*f-a*r*p+a*c*u-s*l*u)+m*(+n*c*d-n*o*p-s*r*d+i*r*p+s*o*u-i*c*u)+h*(-a*o*u-n*l*d+n*o*f+a*r*d-i*r*f+i*l*u)}transpose(){let t=this.elements,n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){let a=this.elements;return t.isVector3?(a[12]=t.x,a[13]=t.y,a[14]=t.z):(a[12]=t,a[13]=n,a[14]=i),this}invert(){let t=this.elements,n=t[0],i=t[1],a=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=t[9],f=t[10],p=t[11],g=t[12],x=t[13],m=t[14],h=t[15],v=d*m*c-x*f*c+x*l*p-o*m*p-d*l*h+o*f*h,_=g*f*c-u*m*c-g*l*p+r*m*p+u*l*h-r*f*h,y=u*x*c-g*d*c+g*o*p-r*x*p-u*o*h+r*d*h,T=g*d*l-u*x*l-g*o*f+r*x*f+u*o*m-r*d*m,C=n*v+i*_+a*y+s*T;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let w=1/C;return t[0]=v*w,t[1]=(x*f*s-d*m*s-x*a*p+i*m*p+d*a*h-i*f*h)*w,t[2]=(o*m*s-x*l*s+x*a*c-i*m*c-o*a*h+i*l*h)*w,t[3]=(d*l*s-o*f*s-d*a*c+i*f*c+o*a*p-i*l*p)*w,t[4]=_*w,t[5]=(u*m*s-g*f*s+g*a*p-n*m*p-u*a*h+n*f*h)*w,t[6]=(g*l*s-r*m*s-g*a*c+n*m*c+r*a*h-n*l*h)*w,t[7]=(r*f*s-u*l*s+u*a*c-n*f*c-r*a*p+n*l*p)*w,t[8]=y*w,t[9]=(g*d*s-u*x*s-g*i*p+n*x*p+u*i*h-n*d*h)*w,t[10]=(r*x*s-g*o*s+g*i*c-n*x*c-r*i*h+n*o*h)*w,t[11]=(u*o*s-r*d*s-u*i*c+n*d*c+r*i*p-n*o*p)*w,t[12]=T*w,t[13]=(u*x*a-g*d*a+g*i*f-n*x*f-u*i*m+n*d*m)*w,t[14]=(g*o*a-r*x*a-g*i*l+n*x*l+r*i*m-n*o*m)*w,t[15]=(r*d*a-u*o*a+u*i*l-n*d*l-r*i*f+n*o*f)*w,this}scale(t){let n=this.elements,i=t.x,a=t.y,s=t.z;return n[0]*=i,n[4]*=a,n[8]*=s,n[1]*=i,n[5]*=a,n[9]*=s,n[2]*=i,n[6]*=a,n[10]*=s,n[3]*=i,n[7]*=a,n[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],a=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,a))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){let n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){let i=Math.cos(n),a=Math.sin(n),s=1-i,r=t.x,o=t.y,l=t.z,c=s*r,u=s*o;return this.set(c*r+i,c*o-a*l,c*l+a*o,0,c*o+a*l,u*o+i,u*l-a*r,0,c*l-a*o,u*l+a*r,s*l*l+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,a,s,r){return this.set(1,i,s,0,t,1,r,0,n,a,1,0,0,0,0,1),this}compose(t,n,i){let a=this.elements,s=n._x,r=n._y,o=n._z,l=n._w,c=s+s,u=r+r,d=o+o,f=s*c,p=s*u,g=s*d,x=r*u,m=r*d,h=o*d,v=l*c,_=l*u,y=l*d,T=i.x,C=i.y,w=i.z;return a[0]=(1-(x+h))*T,a[1]=(p+y)*T,a[2]=(g-_)*T,a[3]=0,a[4]=(p-y)*C,a[5]=(1-(f+h))*C,a[6]=(m+v)*C,a[7]=0,a[8]=(g+_)*w,a[9]=(m-v)*w,a[10]=(1-(f+x))*w,a[11]=0,a[12]=t.x,a[13]=t.y,a[14]=t.z,a[15]=1,this}decompose(t,n,i){let a=this.elements,s=Do.set(a[0],a[1],a[2]).length(),r=Do.set(a[4],a[5],a[6]).length(),o=Do.set(a[8],a[9],a[10]).length();this.determinant()<0&&(s=-s),t.x=a[12],t.y=a[13],t.z=a[14],Ni.copy(this);let c=1/s,u=1/r,d=1/o;return Ni.elements[0]*=c,Ni.elements[1]*=c,Ni.elements[2]*=c,Ni.elements[4]*=u,Ni.elements[5]*=u,Ni.elements[6]*=u,Ni.elements[8]*=d,Ni.elements[9]*=d,Ni.elements[10]*=d,n.setFromRotationMatrix(Ni),i.x=s,i.y=r,i.z=o,this}makePerspective(t,n,i,a,s,r,o=Oi,l=!1){let c=this.elements,u=2*s/(n-t),d=2*s/(i-a),f=(n+t)/(n-t),p=(i+a)/(i-a),g,x;if(l)g=s/(r-s),x=r*s/(r-s);else if(o===Oi)g=-(r+s)/(r-s),x=-2*r*s/(r-s);else if(o===_c)g=-r/(r-s),x=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,a,s,r,o=Oi,l=!1){let c=this.elements,u=2/(n-t),d=2/(i-a),f=-(n+t)/(n-t),p=-(i+a)/(i-a),g,x;if(l)g=1/(r-s),x=r/(r-s);else if(o===Oi)g=-2/(r-s),x=-(r+s)/(r-s);else if(o===_c)g=-1/(r-s),x=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let n=this.elements,i=t.elements;for(let a=0;a<16;a++)if(n[a]!==i[a])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}},Do=new L,Ni=new Ve,pw=new L(0,0,0),mw=new L(1,1,1),vs=new L,Jh=new L,Qn=new L,XM=new Ve,WM=new Oa,ia=class e{constructor(t=0,n=0,i=0,a=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=a}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,a=this._order){return this._x=t,this._y=n,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){let a=t.elements,s=a[0],r=a[4],o=a[8],l=a[1],c=a[5],u=a[9],d=a[2],f=a[6],p=a[10];switch(n){case"XYZ":this._y=Math.asin($t(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$t(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin($t(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-$t(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin($t(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-$t(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return XM.makeRotationFromQuaternion(t),this.setFromRotationMatrix(XM,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return WM.setFromEuler(this),this.setFromQuaternion(WM,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ia.DEFAULT_ORDER="XYZ";var Mc=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},gw=0,qM=new L,Uo=new Oa,wa=new Ve,Kh=new L,hc=new L,vw=new L,_w=new Oa,YM=new L(1,0,0),ZM=new L(0,1,0),JM=new L(0,0,1),KM={type:"added"},yw={type:"removed"},No={type:"childadded",child:null},f0={type:"childremoved",child:null},ei=class e extends La{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gw++}),this.uuid=qc(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new L,n=new ia,i=new Oa,a=new L(1,1,1);function s(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new Ve},normalMatrix:{value:new Wt}}),this.matrix=new Ve,this.matrixWorld=new Ve,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Mc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Uo.setFromAxisAngle(t,n),this.quaternion.multiply(Uo),this}rotateOnWorldAxis(t,n){return Uo.setFromAxisAngle(t,n),this.quaternion.premultiply(Uo),this}rotateX(t){return this.rotateOnAxis(YM,t)}rotateY(t){return this.rotateOnAxis(ZM,t)}rotateZ(t){return this.rotateOnAxis(JM,t)}translateOnAxis(t,n){return qM.copy(t).applyQuaternion(this.quaternion),this.position.add(qM.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(YM,t)}translateY(t){return this.translateOnAxis(ZM,t)}translateZ(t){return this.translateOnAxis(JM,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(wa.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?Kh.copy(t):Kh.set(t,n,i);let a=this.parent;this.updateWorldMatrix(!0,!1),hc.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wa.lookAt(hc,Kh,this.up):wa.lookAt(Kh,hc,this.up),this.quaternion.setFromRotationMatrix(wa),a&&(wa.extractRotation(a.matrixWorld),Uo.setFromRotationMatrix(wa),this.quaternion.premultiply(Uo.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(KM),No.child=t,this.dispatchEvent(No),No.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(yw),f0.child=t,this.dispatchEvent(f0),f0.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),wa.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),wa.multiply(t.parent.matrixWorld)),t.applyMatrix4(wa),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(KM),No.child=t,this.dispatchEvent(No),No.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,a=this.children.length;i<a;i++){let r=this.children[i].getObjectByProperty(t,n);if(r!==void 0)return r}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);let a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hc,t,vw),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hc,_w,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);let n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverseVisible(t)}traverseAncestors(t){let n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){let a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].updateWorldMatrix(!1,!0)}}toJSON(t){let n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(t),a.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=s(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];s(t.shapes,d)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));a.material=o}else a.material=s(t.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];a.animations.push(s(t.animations,l))}}if(n){let o=r(t.geometries),l=r(t.materials),c=r(t.textures),u=r(t.images),d=r(t.shapes),f=r(t.skeletons),p=r(t.animations),g=r(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=a,i;function r(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){let a=t.children[i];this.add(a.clone())}return this}};ei.DEFAULT_UP=new L(0,1,0);ei.DEFAULT_MATRIX_AUTO_UPDATE=!0;ei.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Li=new L,Ca=new L,d0=new L,Ra=new L,Lo=new L,Oo=new L,QM=new L,p0=new L,m0=new L,g0=new L,v0=new Le,_0=new Le,y0=new Le,xs=class e{constructor(t=new L,n=new L,i=new L){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,a){a.subVectors(i,n),Li.subVectors(t,n),a.cross(Li);let s=a.lengthSq();return s>0?a.multiplyScalar(1/Math.sqrt(s)):a.set(0,0,0)}static getBarycoord(t,n,i,a,s){Li.subVectors(a,n),Ca.subVectors(i,n),d0.subVectors(t,n);let r=Li.dot(Li),o=Li.dot(Ca),l=Li.dot(d0),c=Ca.dot(Ca),u=Ca.dot(d0),d=r*c-o*o;if(d===0)return s.set(0,0,0),null;let f=1/d,p=(c*l-o*u)*f,g=(r*u-o*l)*f;return s.set(1-p-g,g,p)}static containsPoint(t,n,i,a){return this.getBarycoord(t,n,i,a,Ra)===null?!1:Ra.x>=0&&Ra.y>=0&&Ra.x+Ra.y<=1}static getInterpolation(t,n,i,a,s,r,o,l){return this.getBarycoord(t,n,i,a,Ra)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ra.x),l.addScaledVector(r,Ra.y),l.addScaledVector(o,Ra.z),l)}static getInterpolatedAttribute(t,n,i,a,s,r){return v0.setScalar(0),_0.setScalar(0),y0.setScalar(0),v0.fromBufferAttribute(t,n),_0.fromBufferAttribute(t,i),y0.fromBufferAttribute(t,a),r.setScalar(0),r.addScaledVector(v0,s.x),r.addScaledVector(_0,s.y),r.addScaledVector(y0,s.z),r}static isFrontFacing(t,n,i,a){return Li.subVectors(i,n),Ca.subVectors(t,n),Li.cross(Ca).dot(a)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,a){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[a]),this}setFromAttributeAndIndices(t,n,i,a){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,a),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Li.subVectors(this.c,this.b),Ca.subVectors(this.a,this.b),Li.cross(Ca).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,a,s){return e.getInterpolation(t,this.a,this.b,this.c,n,i,a,s)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){let i=this.a,a=this.b,s=this.c,r,o;Lo.subVectors(a,i),Oo.subVectors(s,i),p0.subVectors(t,i);let l=Lo.dot(p0),c=Oo.dot(p0);if(l<=0&&c<=0)return n.copy(i);m0.subVectors(t,a);let u=Lo.dot(m0),d=Oo.dot(m0);if(u>=0&&d<=u)return n.copy(a);let f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return r=l/(l-u),n.copy(i).addScaledVector(Lo,r);g0.subVectors(t,s);let p=Lo.dot(g0),g=Oo.dot(g0);if(g>=0&&p<=g)return n.copy(s);let x=p*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),n.copy(i).addScaledVector(Oo,o);let m=u*g-p*d;if(m<=0&&d-u>=0&&p-g>=0)return QM.subVectors(s,a),o=(d-u)/(d-u+(p-g)),n.copy(a).addScaledVector(QM,o);let h=1/(m+x+f);return r=x*h,o=f*h,n.copy(i).addScaledVector(Lo,r).addScaledVector(Oo,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Jb={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_s={h:0,s:0,l:0},Qh={h:0,s:0,l:0};function x0(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var ae=class{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){let a=t;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=$n){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,re.colorSpaceToWorking(this,n),this}setRGB(t,n,i,a=re.workingColorSpace){return this.r=t,this.g=n,this.b=i,re.colorSpaceToWorking(this,a),this}setHSL(t,n,i,a=re.workingColorSpace){if(t=cw(t,1),n=$t(n,0,1),i=$t(i,0,1),n===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+n):i+n-i*n,r=2*i-s;this.r=x0(r,s,t+1/3),this.g=x0(r,s,t),this.b=x0(r,s,t-1/3)}return re.colorSpaceToWorking(this,a),this}setStyle(t,n=$n){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,r=a[1],o=a[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=a[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=$n){let i=Jb[t.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Da(t.r),this.g=Da(t.g),this.b=Da(t.b),this}copyLinearToSRGB(t){return this.r=zo(t.r),this.g=zo(t.g),this.b=zo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=$n){return re.workingToColorSpace(_n.copy(this),t),Math.round($t(_n.r*255,0,255))*65536+Math.round($t(_n.g*255,0,255))*256+Math.round($t(_n.b*255,0,255))}getHexString(t=$n){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=re.workingColorSpace){re.workingToColorSpace(_n.copy(this),n);let i=_n.r,a=_n.g,s=_n.b,r=Math.max(i,a,s),o=Math.min(i,a,s),l,c,u=(o+r)/2;if(o===r)l=0,c=0;else{let d=r-o;switch(c=u<=.5?d/(r+o):d/(2-r-o),r){case i:l=(a-s)/d+(a<s?6:0);break;case a:l=(s-i)/d+2;break;case s:l=(i-a)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,n=re.workingColorSpace){return re.workingToColorSpace(_n.copy(this),n),t.r=_n.r,t.g=_n.g,t.b=_n.b,t}getStyle(t=$n){re.workingToColorSpace(_n.copy(this),t);let n=_n.r,i=_n.g,a=_n.b;return t!==$n?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(t,n,i){return this.getHSL(_s),this.setHSL(_s.h+t,_s.s+n,_s.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(_s),t.getHSL(Qh);let i=n0(_s.h,Qh.h,n),a=n0(_s.s,Qh.s,n),s=n0(_s.l,Qh.l,n);return this.setHSL(i,a,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let n=this.r,i=this.g,a=this.b,s=t.elements;return this.r=s[0]*n+s[3]*i+s[6]*a,this.g=s[1]*n+s[4]*i+s[7]*a,this.b=s[2]*n+s[5]*i+s[8]*a,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},_n=new ae;ae.NAMES=Jb;var xw=0,Es=class extends La{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:xw++}),this.uuid=qc(),this.name="",this.type="Material",this.blending=Na,this.side=Ua,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=df,this.blendDst=pr,this.blendEquation=Ms,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ae(0,0,0),this.blendAlpha=0,this.depthFunc=mr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=U0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fr,this.stencilZFail=fr,this.stencilZPass=fr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let n in t){let i=t[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}let a=this[n];if(a===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Na&&(i.blending=this.blending),this.side!==Ua&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==df&&(i.blendSrc=this.blendSrc),this.blendDst!==pr&&(i.blendDst=this.blendDst),this.blendEquation!==Ms&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==mr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==U0&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==fr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==fr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(s){let r=[];for(let o in s){let l=s[o];delete l.metadata,r.push(l)}return r}if(n){let s=a(t.textures),r=a(t.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let n=t.clippingPlanes,i=null;if(n!==null){let a=n.length;i=new Array(a);for(let s=0;s!==a;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},bc=class extends Es{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ia,this.combine=z0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var We=new L,jh=new Ut,Sw=0,an=class{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Sw++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=N0,this.updateRanges=[],this.gpuType=ra,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let a=0,s=this.itemSize;a<s;a++)this.array[t+a]=n.array[i+a];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)jh.fromBufferAttribute(this,n),jh.applyMatrix3(t),this.setXY(n,jh.x,jh.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)We.fromBufferAttribute(this,n),We.applyMatrix3(t),this.setXYZ(n,We.x,We.y,We.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)We.fromBufferAttribute(this,n),We.applyMatrix4(t),this.setXYZ(n,We.x,We.y,We.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)We.fromBufferAttribute(this,n),We.applyNormalMatrix(t),this.setXYZ(n,We.x,We.y,We.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)We.fromBufferAttribute(this,n),We.transformDirection(t),this.setXYZ(n,We.x,We.y,We.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=lc(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=Pn(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=lc(n,this.array)),n}setX(t,n){return this.normalized&&(n=Pn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=lc(n,this.array)),n}setY(t,n){return this.normalized&&(n=Pn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=lc(n,this.array)),n}setZ(t,n){return this.normalized&&(n=Pn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=lc(n,this.array)),n}setW(t,n){return this.normalized&&(n=Pn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=Pn(n,this.array),i=Pn(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,a){return t*=this.itemSize,this.normalized&&(n=Pn(n,this.array),i=Pn(i,this.array),a=Pn(a,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=a,this}setXYZW(t,n,i,a,s){return t*=this.itemSize,this.normalized&&(n=Pn(n,this.array),i=Pn(i,this.array),a=Pn(a,this.array),s=Pn(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=a,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==N0&&(t.usage=this.usage),t}};var Ec=class extends an{constructor(t,n,i){super(new Uint16Array(t),n,i)}};var Tc=class extends an{constructor(t,n,i){super(new Uint32Array(t),n,i)}};var sn=class extends an{constructor(t,n,i){super(new Float32Array(t),n,i)}},Mw=0,_i=new Ve,S0=new ei,Io=new L,jn=new bs,fc=new bs,nn=new L,Bn=class e extends La{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Mw++}),this.uuid=qc(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(K0(t)?Tc:Ec)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){let n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new Wt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}let a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(t),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return _i.makeRotationFromQuaternion(t),this.applyMatrix4(_i),this}rotateX(t){return _i.makeRotationX(t),this.applyMatrix4(_i),this}rotateY(t){return _i.makeRotationY(t),this.applyMatrix4(_i),this}rotateZ(t){return _i.makeRotationZ(t),this.applyMatrix4(_i),this}translate(t,n,i){return _i.makeTranslation(t,n,i),this.applyMatrix4(_i),this}scale(t,n,i){return _i.makeScale(t,n,i),this.applyMatrix4(_i),this}lookAt(t){return S0.lookAt(t),S0.updateMatrix(),this.applyMatrix4(S0.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Io).negate(),this.translate(Io.x,Io.y,Io.z),this}setFromPoints(t){let n=this.getAttribute("position");if(n===void 0){let i=[];for(let a=0,s=t.length;a<s;a++){let r=t[a];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new sn(i,3))}else{let i=Math.min(t.length,n.count);for(let a=0;a<i;a++){let s=t[a];n.setXYZ(a,s.x,s.y,s.z||0)}t.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bs);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,a=n.length;i<a;i++){let s=n[i];jn.setFromBufferAttribute(s),this.morphTargetsRelative?(nn.addVectors(this.boundingBox.min,jn.min),this.boundingBox.expandByPoint(nn),nn.addVectors(this.boundingBox.max,jn.max),this.boundingBox.expandByPoint(nn)):(this.boundingBox.expandByPoint(jn.min),this.boundingBox.expandByPoint(jn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gr);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){let i=this.boundingSphere.center;if(jn.setFromBufferAttribute(t),n)for(let s=0,r=n.length;s<r;s++){let o=n[s];fc.setFromBufferAttribute(o),this.morphTargetsRelative?(nn.addVectors(jn.min,fc.min),jn.expandByPoint(nn),nn.addVectors(jn.max,fc.max),jn.expandByPoint(nn)):(jn.expandByPoint(fc.min),jn.expandByPoint(fc.max))}jn.getCenter(i);let a=0;for(let s=0,r=t.count;s<r;s++)nn.fromBufferAttribute(t,s),a=Math.max(a,i.distanceToSquared(nn));if(n)for(let s=0,r=n.length;s<r;s++){let o=n[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)nn.fromBufferAttribute(o,c),l&&(Io.fromBufferAttribute(t,c),nn.add(Io)),a=Math.max(a,i.distanceToSquared(nn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=n.position,a=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new an(new Float32Array(4*i.count),4));let r=this.getAttribute("tangent"),o=[],l=[];for(let R=0;R<i.count;R++)o[R]=new L,l[R]=new L;let c=new L,u=new L,d=new L,f=new Ut,p=new Ut,g=new Ut,x=new L,m=new L;function h(R,E,S){c.fromBufferAttribute(i,R),u.fromBufferAttribute(i,E),d.fromBufferAttribute(i,S),f.fromBufferAttribute(s,R),p.fromBufferAttribute(s,E),g.fromBufferAttribute(s,S),u.sub(c),d.sub(c),p.sub(f),g.sub(f);let U=1/(p.x*g.y-g.x*p.y);isFinite(U)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(U),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(U),o[R].add(x),o[E].add(x),o[S].add(x),l[R].add(m),l[E].add(m),l[S].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let R=0,E=v.length;R<E;++R){let S=v[R],U=S.start,B=S.count;for(let G=U,W=U+B;G<W;G+=3)h(t.getX(G+0),t.getX(G+1),t.getX(G+2))}let _=new L,y=new L,T=new L,C=new L;function w(R){T.fromBufferAttribute(a,R),C.copy(T);let E=o[R];_.copy(E),_.sub(T.multiplyScalar(T.dot(E))).normalize(),y.crossVectors(C,E);let U=y.dot(l[R])<0?-1:1;r.setXYZW(R,_.x,_.y,_.z,U)}for(let R=0,E=v.length;R<E;++R){let S=v[R],U=S.start,B=S.count;for(let G=U,W=U+B;G<W;G+=3)w(t.getX(G+0)),w(t.getX(G+1)),w(t.getX(G+2))}}computeVertexNormals(){let t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new an(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);let a=new L,s=new L,r=new L,o=new L,l=new L,c=new L,u=new L,d=new L;if(t)for(let f=0,p=t.count;f<p;f+=3){let g=t.getX(f+0),x=t.getX(f+1),m=t.getX(f+2);a.fromBufferAttribute(n,g),s.fromBufferAttribute(n,x),r.fromBufferAttribute(n,m),u.subVectors(r,s),d.subVectors(a,s),u.cross(d),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=n.count;f<p;f+=3)a.fromBufferAttribute(n,f+0),s.fromBufferAttribute(n,f+1),r.fromBufferAttribute(n,f+2),u.subVectors(r,s),d.subVectors(a,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)nn.fromBufferAttribute(t,n),nn.normalize(),t.setXYZ(n,nn.x,nn.y,nn.z)}toNonIndexed(){function t(o,l){let c=o.array,u=o.itemSize,d=o.normalized,f=new c.constructor(l.length*u),p=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*u;for(let h=0;h<u;h++)f[g++]=c[p++]}return new an(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let n=new e,i=this.index.array,a=this.attributes;for(let o in a){let l=a[o],c=t(l,i);n.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let u=0,d=c.length;u<d;u++){let f=c[u],p=t(f,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let o=0,l=r.length;o<l;o++){let c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let a={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){let p=c[d];u.push(p.toJSON(t.data))}u.length>0&&(a[l]=u,s=!0)}s&&(t.data.morphAttributes=a,t.data.morphTargetsRelative=this.morphTargetsRelative);let r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let n={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let a=t.attributes;for(let c in a){let u=a[c];this.setAttribute(c,u.clone(n))}let s=t.morphAttributes;for(let c in s){let u=[],d=s[c];for(let f=0,p=d.length;f<p;f++)u.push(d[f].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;let r=t.groups;for(let c=0,u=r.length;c<u;c++){let d=r[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},jM=new Ve,ur=new Sc,$h=new gr,$M=new L,tf=new L,ef=new L,nf=new L,M0=new L,af=new L,tb=new L,sf=new L,dn=class extends ei{constructor(t=new Bn,n=new bc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){let o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,n){let i=this.geometry,a=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(a,t);let o=this.morphTargetInfluences;if(s&&o){af.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=o[l],d=s[l];u!==0&&(M0.fromBufferAttribute(d,t),r?af.addScaledVector(M0,u):af.addScaledVector(M0.sub(n),u))}n.add(af)}return n}raycast(t,n){let i=this.geometry,a=this.material,s=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),$h.copy(i.boundingSphere),$h.applyMatrix4(s),ur.copy(t.ray).recast(t.near),!($h.containsPoint(ur.origin)===!1&&(ur.intersectSphere($h,$M)===null||ur.origin.distanceToSquared($M)>(t.far-t.near)**2))&&(jM.copy(s).invert(),ur.copy(t.ray).applyMatrix4(jM),!(i.boundingBox!==null&&ur.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,ur)))}_computeIntersections(t,n,i){let a,s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,x=f.length;g<x;g++){let m=f[g],h=r[m.materialIndex],v=Math.max(m.start,p.start),_=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,T=_;y<T;y+=3){let C=o.getX(y),w=o.getX(y+1),R=o.getX(y+2);a=rf(this,h,t,i,c,u,d,C,w,R),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=m.materialIndex,n.push(a))}}else{let g=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=g,h=x;m<h;m+=3){let v=o.getX(m),_=o.getX(m+1),y=o.getX(m+2);a=rf(this,r,t,i,c,u,d,v,_,y),a&&(a.faceIndex=Math.floor(m/3),n.push(a))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,x=f.length;g<x;g++){let m=f[g],h=r[m.materialIndex],v=Math.max(m.start,p.start),_=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,T=_;y<T;y+=3){let C=y,w=y+1,R=y+2;a=rf(this,h,t,i,c,u,d,C,w,R),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=m.materialIndex,n.push(a))}}else{let g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=g,h=x;m<h;m+=3){let v=m,_=m+1,y=m+2;a=rf(this,r,t,i,c,u,d,v,_,y),a&&(a.faceIndex=Math.floor(m/3),n.push(a))}}}};function bw(e,t,n,i,a,s,r,o){let l;if(t.side===wn?l=i.intersectTriangle(r,s,a,!0,o):l=i.intersectTriangle(a,s,r,t.side===Ua,o),l===null)return null;sf.copy(o),sf.applyMatrix4(e.matrixWorld);let c=n.ray.origin.distanceTo(sf);return c<n.near||c>n.far?null:{distance:c,point:sf.clone(),object:e}}function rf(e,t,n,i,a,s,r,o,l,c){e.getVertexPosition(o,tf),e.getVertexPosition(l,ef),e.getVertexPosition(c,nf);let u=bw(e,t,n,i,tf,ef,nf,tb);if(u){let d=new L;xs.getBarycoord(tb,tf,ef,nf,d),a&&(u.uv=xs.getInterpolatedAttribute(a,o,l,c,d,new Ut)),s&&(u.uv1=xs.getInterpolatedAttribute(s,o,l,c,d,new Ut)),r&&(u.normal=xs.getInterpolatedAttribute(r,o,l,c,d,new L),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let f={a:o,b:l,c,normal:new L,materialIndex:0};xs.getNormal(tf,ef,nf,f.normal),u.face=f,u.barycoord=d}return u}var Go=class e extends Bn{constructor(t=1,n=1,i=1,a=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:a,heightSegments:s,depthSegments:r};let o=this;a=Math.floor(a),s=Math.floor(s),r=Math.floor(r);let l=[],c=[],u=[],d=[],f=0,p=0;g("z","y","x",-1,-1,i,n,t,r,s,0),g("z","y","x",1,-1,i,n,-t,r,s,1),g("x","z","y",1,1,t,i,n,a,r,2),g("x","z","y",1,-1,t,i,-n,a,r,3),g("x","y","z",1,-1,t,n,i,a,s,4),g("x","y","z",-1,-1,t,n,-i,a,s,5),this.setIndex(l),this.setAttribute("position",new sn(c,3)),this.setAttribute("normal",new sn(u,3)),this.setAttribute("uv",new sn(d,2));function g(x,m,h,v,_,y,T,C,w,R,E){let S=y/w,U=T/R,B=y/2,G=T/2,W=C/2,Q=w+1,Y=R+1,at=0,k=0,ct=new L;for(let pt=0;pt<Y;pt++){let bt=pt*U-G;for(let qt=0;qt<Q;qt++){let Zt=qt*S-B;ct[x]=Zt*v,ct[m]=bt*_,ct[h]=W,c.push(ct.x,ct.y,ct.z),ct[x]=0,ct[m]=0,ct[h]=C>0?1:-1,u.push(ct.x,ct.y,ct.z),d.push(qt/w),d.push(1-pt/R),at+=1}}for(let pt=0;pt<R;pt++)for(let bt=0;bt<w;bt++){let qt=f+bt+Q*pt,Zt=f+bt+Q*(pt+1),ce=f+(bt+1)+Q*(pt+1),Ot=f+(bt+1)+Q*pt;l.push(qt,Zt,Ot),l.push(Zt,ce,Ot),k+=6}o.addGroup(p,k,E),p+=k,f+=at}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function xr(e){let t={};for(let n in e){t[n]={};for(let i in e[n]){let a=e[n][i];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=a.clone():Array.isArray(a)?t[n][i]=a.slice():t[n][i]=a}}return t}function xn(e){let t={};for(let n=0;n<e.length;n++){let i=xr(e[n]);for(let a in i)t[a]=i[a]}return t}function Ew(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Q0(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:re.workingColorSpace}var Kb={clone:xr,merge:xn},Tw=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Aw=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,zn=class extends Es{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Tw,this.fragmentShader=Aw,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=xr(t.uniforms),this.uniformsGroups=Ew(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(let a in this.uniforms){let r=this.uniforms[a].value;r&&r.isTexture?n.uniforms[a]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?n.uniforms[a]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[a]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[a]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[a]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[a]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[a]={type:"m4",value:r.toArray()}:n.uniforms[a]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;let i={};for(let a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}},Ac=class extends ei{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ve,this.projectionMatrix=new Ve,this.projectionMatrixInverse=new Ve,this.coordinateSystem=Oi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ys=new L,eb=new Ut,nb=new Ut,yn=class extends Ac{constructor(t=50,n=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let n=.5*this.getFilmHeight()/t;this.fov=vf*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(e0*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return vf*2*Math.atan(Math.tan(e0*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){ys.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ys.x,ys.y).multiplyScalar(-t/ys.z),ys.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ys.x,ys.y).multiplyScalar(-t/ys.z)}getViewSize(t,n){return this.getViewBounds(t,eb,nb),n.subVectors(nb,eb)}setViewOffset(t,n,i,a,s,r){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,n=t*Math.tan(e0*.5*this.fov)/this.zoom,i=2*n,a=this.aspect*i,s=-.5*a,r=this.view;if(this.view!==null&&this.view.enabled){let l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*a/l,n-=r.offsetY*i/c,a*=r.width/l,i*=r.height/c}let o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+a,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}},Po=-90,Bo=1,Sf=class extends ei{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let a=new yn(Po,Bo,t,n);a.layers=this.layers,this.add(a);let s=new yn(Po,Bo,t,n);s.layers=this.layers,this.add(s);let r=new yn(Po,Bo,t,n);r.layers=this.layers,this.add(r);let o=new yn(Po,Bo,t,n);o.layers=this.layers,this.add(o);let l=new yn(Po,Bo,t,n);l.layers=this.layers,this.add(l);let c=new yn(Po,Bo,t,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,n=this.children.concat(),[i,a,s,r,o,l]=n;for(let c of n)this.remove(c);if(t===Oi)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===_c)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of n)this.add(c),c.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[s,r,o,l,c,u]=this.children,d=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,a),t.render(n,s),t.setRenderTarget(i,1,a),t.render(n,r),t.setRenderTarget(i,2,a),t.render(n,o),t.setRenderTarget(i,3,a),t.render(n,l),t.setRenderTarget(i,4,a),t.render(n,c),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,a),t.render(n,u),t.setRenderTarget(d,f,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},wc=class extends ti{constructor(t=[],n=_r,i,a,s,r,o,l,c,u){super(t,n,i,a,s,r,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Mf=class extends xi{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},a=[i,i,i,i,i,i];this.texture=new wc(a),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new Go(5,5,5),s=new zn({name:"CubemapFromEquirect",uniforms:xr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:wn,blending:Bi});s.uniforms.tEquirect.value=n;let r=new dn(a,s),o=n.minFilter;return n.minFilter===Cs&&(n.minFilter=Ii),new Sf(1,10,this).update(t,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,n=!0,i=!0,a=!0){let s=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(n,i,a);t.setRenderTarget(s)}},dr=class extends ei{constructor(){super(),this.isGroup=!0,this.type="Group"}},ww={type:"move"},ko=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new dr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new dr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new dr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let n=this._hand;if(n)for(let i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let a=null,s=null,r=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(let x of t.hand.values()){let m=n.getJointPose(x,i),h=this._getHandJoint(c,x);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=n.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(a=n.getPose(t.targetRaySpace,i),a===null&&s!==null&&(a=s),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ww)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){let i=new dr;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}};var Xo=class extends ei{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ia,this.environmentIntensity=1,this.environmentRotation=new ia,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}};var Pi=class extends an{constructor(t,n,i,a=1){super(t,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=a}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}};var b0=new L,Cw=new L,Rw=new Wt,ea=class{constructor(t=new L(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,a){return this.normal.set(t,n,i),this.constant=a,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){let a=b0.subVectors(i,n).cross(Cw.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){let i=t.delta(b0),a=this.normal.dot(i);if(a===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;let s=-(t.start.dot(this.normal)+this.constant)/a;return s<0||s>1?null:n.copy(t.start).addScaledVector(i,s)}intersectsLine(t){let n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){let i=n||Rw.getNormalMatrix(t),a=this.coplanarPoint(b0).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},hr=new gr,Dw=new Ut(.5,.5),of=new L,Cc=class{constructor(t=new ea,n=new ea,i=new ea,a=new ea,s=new ea,r=new ea){this.planes=[t,n,i,a,s,r]}set(t,n,i,a,s,r){let o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(a),o[4].copy(s),o[5].copy(r),this}copy(t){let n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=Oi,i=!1){let a=this.planes,s=t.elements,r=s[0],o=s[1],l=s[2],c=s[3],u=s[4],d=s[5],f=s[6],p=s[7],g=s[8],x=s[9],m=s[10],h=s[11],v=s[12],_=s[13],y=s[14],T=s[15];if(a[0].setComponents(c-r,p-u,h-g,T-v).normalize(),a[1].setComponents(c+r,p+u,h+g,T+v).normalize(),a[2].setComponents(c+o,p+d,h+x,T+_).normalize(),a[3].setComponents(c-o,p-d,h-x,T-_).normalize(),i)a[4].setComponents(l,f,m,y).normalize(),a[5].setComponents(c-l,p-f,h-m,T-y).normalize();else if(a[4].setComponents(c-l,p-f,h-m,T-y).normalize(),n===Oi)a[5].setComponents(c+l,p+f,h+m,T+y).normalize();else if(n===_c)a[5].setComponents(l,f,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),hr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),hr.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(hr)}intersectsSprite(t){hr.center.set(0,0,0);let n=Dw.distanceTo(t.center);return hr.radius=.7071067811865476+n,hr.applyMatrix4(t.matrixWorld),this.intersectsSphere(hr)}intersectsSphere(t){let n=this.planes,i=t.center,a=-t.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<a)return!1;return!0}intersectsBox(t){let n=this.planes;for(let i=0;i<6;i++){let a=n[i];if(of.x=a.normal.x>0?t.max.x:t.min.x,of.y=a.normal.y>0?t.max.y:t.min.y,of.z=a.normal.z>0?t.max.z:t.min.z,a.distanceToPoint(of)<0)return!1}return!0}containsPoint(t){let n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var bf=class extends Es{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ae(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Ef=new L,Tf=new L,ib=new Ve,dc=new Sc,lf=new gr,E0=new L,ab=new L,Af=class extends ei{constructor(t=new Bn,n=new bf){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let n=t.attributes.position,i=[0];for(let a=1,s=n.count;a<s;a++)Ef.fromBufferAttribute(n,a-1),Tf.fromBufferAttribute(n,a),i[a]=i[a-1],i[a]+=Ef.distanceTo(Tf);t.setAttribute("lineDistance",new sn(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){let i=this.geometry,a=this.matrixWorld,s=t.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),lf.copy(i.boundingSphere),lf.applyMatrix4(a),lf.radius+=s,t.ray.intersectsSphere(lf)===!1)return;ib.copy(a).invert(),dc.copy(t.ray).applyMatrix4(ib);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){let p=Math.max(0,r.start),g=Math.min(u.count,r.start+r.count);for(let x=p,m=g-1;x<m;x+=c){let h=u.getX(x),v=u.getX(x+1),_=cf(this,t,dc,l,h,v,x);_&&n.push(_)}if(this.isLineLoop){let x=u.getX(g-1),m=u.getX(p),h=cf(this,t,dc,l,x,m,g-1);h&&n.push(h)}}else{let p=Math.max(0,r.start),g=Math.min(f.count,r.start+r.count);for(let x=p,m=g-1;x<m;x+=c){let h=cf(this,t,dc,l,x,x+1,x);h&&n.push(h)}if(this.isLineLoop){let x=cf(this,t,dc,l,g-1,p,g-1);x&&n.push(x)}}}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){let o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function cf(e,t,n,i,a,s,r){let o=e.geometry.attributes.position;if(Ef.fromBufferAttribute(o,a),Tf.fromBufferAttribute(o,s),n.distanceSqToSegment(Ef,Tf,E0,ab)>i)return;E0.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(E0);if(!(c<t.near||c>t.far))return{distance:c,point:ab.clone().applyMatrix4(e.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:e}}var sb=new L,rb=new L,Rc=class extends Af{constructor(t,n){super(t,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let n=t.attributes.position,i=[];for(let a=0,s=n.count;a<s;a+=2)sb.fromBufferAttribute(n,a),rb.fromBufferAttribute(n,a+1),i[a]=a===0?0:i[a-1],i[a+1]=i[a]+sb.distanceTo(rb);t.setAttribute("lineDistance",new sn(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Dc=class extends ti{constructor(t,n,i=Rs,a,s,r,o=yi,l=yi,c,u=Fo,d=1){if(u!==Fo&&u!==Jo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:t,height:n,depth:d};super(f,a,s,r,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Vo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}},Uc=class extends ti{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}};var Nc=class e extends Bn{constructor(t=1,n=1,i=1,a=32,s=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:i,radialSegments:a,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:l};let c=this;a=Math.floor(a),s=Math.floor(s);let u=[],d=[],f=[],p=[],g=0,x=[],m=i/2,h=0;v(),r===!1&&(t>0&&_(!0),n>0&&_(!1)),this.setIndex(u),this.setAttribute("position",new sn(d,3)),this.setAttribute("normal",new sn(f,3)),this.setAttribute("uv",new sn(p,2));function v(){let y=new L,T=new L,C=0,w=(n-t)/i;for(let R=0;R<=s;R++){let E=[],S=R/s,U=S*(n-t)+t;for(let B=0;B<=a;B++){let G=B/a,W=G*l+o,Q=Math.sin(W),Y=Math.cos(W);T.x=U*Q,T.y=-S*i+m,T.z=U*Y,d.push(T.x,T.y,T.z),y.set(Q,w,Y).normalize(),f.push(y.x,y.y,y.z),p.push(G,1-S),E.push(g++)}x.push(E)}for(let R=0;R<a;R++)for(let E=0;E<s;E++){let S=x[E][R],U=x[E+1][R],B=x[E+1][R+1],G=x[E][R+1];(t>0||E!==0)&&(u.push(S,U,G),C+=3),(n>0||E!==s-1)&&(u.push(U,B,G),C+=3)}c.addGroup(h,C,0),h+=C}function _(y){let T=g,C=new Ut,w=new L,R=0,E=y===!0?t:n,S=y===!0?1:-1;for(let B=1;B<=a;B++)d.push(0,m*S,0),f.push(0,S,0),p.push(.5,.5),g++;let U=g;for(let B=0;B<=a;B++){let W=B/a*l+o,Q=Math.cos(W),Y=Math.sin(W);w.x=E*Y,w.y=m*S,w.z=E*Q,d.push(w.x,w.y,w.z),f.push(0,S,0),C.x=Q*.5+.5,C.y=Y*.5*S+.5,p.push(C.x,C.y),g++}for(let B=0;B<a;B++){let G=T+B,W=U+B;y===!0?u.push(W,W+1,G):u.push(W+1,W,G),R+=3}c.addGroup(h,R,y===!0?1:2),h+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Si=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,n){let i=this.getUtoTmapping(t);return this.getPoint(i,n)}getPoints(t=5){let n=[];for(let i=0;i<=t;i++)n.push(this.getPoint(i/t));return n}getSpacedPoints(t=5){let n=[];for(let i=0;i<=t;i++)n.push(this.getPointAt(i/t));return n}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let n=[],i,a=this.getPoint(0),s=0;n.push(0);for(let r=1;r<=t;r++)i=this.getPoint(r/t),s+=i.distanceTo(a),n.push(s),a=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,n=null){let i=this.getLengths(),a=0,s=i.length,r;n?r=n:r=t*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(a=Math.floor(o+(l-o)/2),c=i[a]-r,c<0)o=a+1;else if(c>0)l=a-1;else{l=a;break}if(a=l,i[a]===r)return a/(s-1);let u=i[a],f=i[a+1]-u,p=(r-u)/f;return(a+p)/(s-1)}getTangent(t,n){let a=t-1e-4,s=t+1e-4;a<0&&(a=0),s>1&&(s=1);let r=this.getPoint(a),o=this.getPoint(s),l=n||(r.isVector2?new Ut:new L);return l.copy(o).sub(r).normalize(),l}getTangentAt(t,n){let i=this.getUtoTmapping(t);return this.getTangent(i,n)}computeFrenetFrames(t,n=!1){let i=new L,a=[],s=[],r=[],o=new L,l=new Ve;for(let p=0;p<=t;p++){let g=p/t;a[p]=this.getTangentAt(g,new L)}s[0]=new L,r[0]=new L;let c=Number.MAX_VALUE,u=Math.abs(a[0].x),d=Math.abs(a[0].y),f=Math.abs(a[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),f<=c&&i.set(0,0,1),o.crossVectors(a[0],i).normalize(),s[0].crossVectors(a[0],o),r[0].crossVectors(a[0],s[0]);for(let p=1;p<=t;p++){if(s[p]=s[p-1].clone(),r[p]=r[p-1].clone(),o.crossVectors(a[p-1],a[p]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos($t(a[p-1].dot(a[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(o,g))}r[p].crossVectors(a[p],s[p])}if(n===!0){let p=Math.acos($t(s[0].dot(s[t]),-1,1));p/=t,a[0].dot(o.crossVectors(s[0],s[t]))>0&&(p=-p);for(let g=1;g<=t;g++)s[g].applyMatrix4(l.makeRotationAxis(a[g],p*g)),r[g].crossVectors(a[g],s[g])}return{tangents:a,normals:s,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Lc=class extends Si{constructor(t=0,n=0,i=1,a=1,s=0,r=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=n,this.xRadius=i,this.yRadius=a,this.aStartAngle=s,this.aEndAngle=r,this.aClockwise=o,this.aRotation=l}getPoint(t,n=new Ut){let i=n,a=Math.PI*2,s=this.aEndAngle-this.aStartAngle,r=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=a;for(;s>a;)s-=a;s<Number.EPSILON&&(r?s=0:s=a),this.aClockwise===!0&&!r&&(s===a?s=-a:s=s-a);let o=this.aStartAngle+t*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=l-this.aX,p=c-this.aY;l=f*u-p*d+this.aX,c=f*d+p*u+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},wf=class extends Lc{constructor(t,n,i,a,s,r){super(t,n,i,i,a,s,r),this.isArcCurve=!0,this.type="ArcCurve"}};function j0(){let e=0,t=0,n=0,i=0;function a(s,r,o,l){e=s,t=o,n=-3*s+3*r-2*o-l,i=2*s-2*r+o+l}return{initCatmullRom:function(s,r,o,l,c){a(r,o,c*(o-s),c*(l-r))},initNonuniformCatmullRom:function(s,r,o,l,c,u,d){let f=(r-s)/c-(o-s)/(c+u)+(o-r)/u,p=(o-r)/u-(l-r)/(u+d)+(l-o)/d;f*=u,p*=u,a(r,o,f,p)},calc:function(s){let r=s*s,o=r*s;return e+t*s+n*r+i*o}}}var uf=new L,T0=new j0,A0=new j0,w0=new j0,Cf=class extends Si{constructor(t=[],n=!1,i="centripetal",a=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=n,this.curveType=i,this.tension=a}getPoint(t,n=new L){let i=n,a=this.points,s=a.length,r=(s-(this.closed?0:1))*t,o=Math.floor(r),l=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=a[(o-1)%s]:(uf.subVectors(a[0],a[1]).add(a[0]),c=uf);let d=a[o%s],f=a[(o+1)%s];if(this.closed||o+2<s?u=a[(o+2)%s]:(uf.subVectors(a[s-1],a[s-2]).add(a[s-1]),u=uf),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),p),x=Math.pow(d.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(u),p);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),T0.initNonuniformCatmullRom(c.x,d.x,f.x,u.x,g,x,m),A0.initNonuniformCatmullRom(c.y,d.y,f.y,u.y,g,x,m),w0.initNonuniformCatmullRom(c.z,d.z,f.z,u.z,g,x,m)}else this.curveType==="catmullrom"&&(T0.initCatmullRom(c.x,d.x,f.x,u.x,this.tension),A0.initCatmullRom(c.y,d.y,f.y,u.y,this.tension),w0.initCatmullRom(c.z,d.z,f.z,u.z,this.tension));return i.set(T0.calc(l),A0.calc(l),w0.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let a=t.points[n];this.points.push(a.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let n=0,i=this.points.length;n<i;n++){let a=this.points[n];t.points.push(a.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let a=t.points[n];this.points.push(new L().fromArray(a))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function ob(e,t,n,i,a){let s=(i-t)*.5,r=(a-n)*.5,o=e*e,l=e*o;return(2*n-2*i+s+r)*l+(-3*n+3*i-2*s-r)*o+s*e+n}function Uw(e,t){let n=1-e;return n*n*t}function Nw(e,t){return 2*(1-e)*e*t}function Lw(e,t){return e*e*t}function pc(e,t,n,i){return Uw(e,t)+Nw(e,n)+Lw(e,i)}function Ow(e,t){let n=1-e;return n*n*n*t}function Iw(e,t){let n=1-e;return 3*n*n*e*t}function Pw(e,t){return 3*(1-e)*e*e*t}function Bw(e,t){return e*e*e*t}function mc(e,t,n,i,a){return Ow(e,t)+Iw(e,n)+Pw(e,i)+Bw(e,a)}var Rf=class extends Si{constructor(t=new Ut,n=new Ut,i=new Ut,a=new Ut){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=n,this.v2=i,this.v3=a}getPoint(t,n=new Ut){let i=n,a=this.v0,s=this.v1,r=this.v2,o=this.v3;return i.set(mc(t,a.x,s.x,r.x,o.x),mc(t,a.y,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Df=class extends Si{constructor(t=new L,n=new L,i=new L,a=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=n,this.v2=i,this.v3=a}getPoint(t,n=new L){let i=n,a=this.v0,s=this.v1,r=this.v2,o=this.v3;return i.set(mc(t,a.x,s.x,r.x,o.x),mc(t,a.y,s.y,r.y,o.y),mc(t,a.z,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Uf=class extends Si{constructor(t=new Ut,n=new Ut){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=n}getPoint(t,n=new Ut){let i=n;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new Ut){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Wo=class extends Si{constructor(t=new L,n=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=n}getPoint(t,n=new L){let i=n;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new L){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Nf=class extends Si{constructor(t=new Ut,n=new Ut,i=new Ut){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=n,this.v2=i}getPoint(t,n=new Ut){let i=n,a=this.v0,s=this.v1,r=this.v2;return i.set(pc(t,a.x,s.x,r.x),pc(t,a.y,s.y,r.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Oc=class extends Si{constructor(t=new L,n=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=n,this.v2=i}getPoint(t,n=new L){let i=n,a=this.v0,s=this.v1,r=this.v2;return i.set(pc(t,a.x,s.x,r.x),pc(t,a.y,s.y,r.y),pc(t,a.z,s.z,r.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Lf=class extends Si{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,n=new Ut){let i=n,a=this.points,s=(a.length-1)*t,r=Math.floor(s),o=s-r,l=a[r===0?r:r-1],c=a[r],u=a[r>a.length-2?a.length-1:r+1],d=a[r>a.length-3?a.length-1:r+2];return i.set(ob(o,l.x,c.x,u.x,d.x),ob(o,l.y,c.y,u.y,d.y)),i}copy(t){super.copy(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let a=t.points[n];this.points.push(a.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let n=0,i=this.points.length;n<i;n++){let a=this.points[n];t.points.push(a.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let a=t.points[n];this.points.push(new Ut().fromArray(a))}return this}},zw=Object.freeze({__proto__:null,ArcCurve:wf,CatmullRomCurve3:Cf,CubicBezierCurve:Rf,CubicBezierCurve3:Df,EllipseCurve:Lc,LineCurve:Uf,LineCurve3:Wo,QuadraticBezierCurve:Nf,QuadraticBezierCurve3:Oc,SplineCurve:Lf});var Ts=class e extends Bn{constructor(t=1,n=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:a};let s=t/2,r=n/2,o=Math.floor(i),l=Math.floor(a),c=o+1,u=l+1,d=t/o,f=n/l,p=[],g=[],x=[],m=[];for(let h=0;h<u;h++){let v=h*f-r;for(let _=0;_<c;_++){let y=_*d-s;g.push(y,-v,0),x.push(0,0,1),m.push(_/o),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let v=0;v<o;v++){let _=v+c*h,y=v+c*(h+1),T=v+1+c*(h+1),C=v+1+c*h;p.push(_,y,C),p.push(y,T,C)}this.setIndex(p),this.setAttribute("position",new sn(g,3)),this.setAttribute("normal",new sn(x,3)),this.setAttribute("uv",new sn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};var Ic=class e extends Bn{constructor(t=new Oc(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),n=64,i=1,a=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:n,radius:i,radialSegments:a,closed:s};let r=t.computeFrenetFrames(n,s);this.tangents=r.tangents,this.normals=r.normals,this.binormals=r.binormals;let o=new L,l=new L,c=new Ut,u=new L,d=[],f=[],p=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new sn(d,3)),this.setAttribute("normal",new sn(f,3)),this.setAttribute("uv",new sn(p,2));function x(){for(let _=0;_<n;_++)m(_);m(s===!1?n:0),v(),h()}function m(_){u=t.getPointAt(_/n,u);let y=r.normals[_],T=r.binormals[_];for(let C=0;C<=a;C++){let w=C/a*Math.PI*2,R=Math.sin(w),E=-Math.cos(w);l.x=E*y.x+R*T.x,l.y=E*y.y+R*T.y,l.z=E*y.z+R*T.z,l.normalize(),f.push(l.x,l.y,l.z),o.x=u.x+i*l.x,o.y=u.y+i*l.y,o.z=u.z+i*l.z,d.push(o.x,o.y,o.z)}}function h(){for(let _=1;_<=n;_++)for(let y=1;y<=a;y++){let T=(a+1)*(_-1)+(y-1),C=(a+1)*_+(y-1),w=(a+1)*_+y,R=(a+1)*(_-1)+y;g.push(T,C,R),g.push(C,w,R)}}function v(){for(let _=0;_<=n;_++)for(let y=0;y<=a;y++)c.x=_/n,c.y=y/a,p.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new e(new zw[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var Of=class extends Es{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Pb,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},If=class extends Es{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function hf(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)}function Fw(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}var vr=class{constructor(t,n,i,a){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=a!==void 0?a:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let n=this.parameterPositions,i=this._cachedIndex,a=n[i],s=n[i-1];t:{e:{let r;n:{i:if(!(t<a)){for(let o=i+2;;){if(a===void 0){if(t<s)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(s=a,a=n[++i],t<a)break e}r=n.length;break n}if(!(t>=s)){let o=n[1];t<o&&(i=2,s=o);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(a=s,s=n[--i-1],t>=s)break e}r=i,i=0;break n}break t}for(;i<r;){let o=i+r>>>1;t<n[o]?r=o:i=o+1}if(a=n[i],s=n[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(a===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,a)}return this.interpolate_(i,s,t,a)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let n=this.resultBuffer,i=this.sampleValues,a=this.valueSize,s=t*a;for(let r=0;r!==a;++r)n[r]=i[s+r];return n}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Pf=class extends vr{constructor(t,n,i,a){super(t,n,i,a),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:C0,endingEnd:C0}}intervalChanged_(t,n,i){let a=this.parameterPositions,s=t-2,r=t+1,o=a[s],l=a[r];if(o===void 0)switch(this.getSettings_().endingStart){case R0:s=t,o=2*n-i;break;case D0:s=a.length-2,o=n+a[s]-a[s+1];break;default:s=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case R0:r=t,l=2*i-n;break;case D0:r=1,l=i+a[1]-a[0];break;default:r=t-1,l=n}let c=(i-n)*.5,u=this.valueSize;this._weightPrev=c/(n-o),this._weightNext=c/(l-i),this._offsetPrev=s*u,this._offsetNext=r*u}interpolate_(t,n,i,a){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,p=this._weightNext,g=(i-n)/(a-n),x=g*g,m=x*g,h=-f*m+2*f*x-f*g,v=(1+f)*m+(-1.5-2*f)*x+(-.5+f)*g+1,_=(-1-p)*m+(1.5+p)*x+.5*g,y=p*m-p*x;for(let T=0;T!==o;++T)s[T]=h*r[u+T]+v*r[c+T]+_*r[l+T]+y*r[d+T];return s}},Bf=class extends vr{constructor(t,n,i,a){super(t,n,i,a)}interpolate_(t,n,i,a){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=(i-n)/(a-n),d=1-u;for(let f=0;f!==o;++f)s[f]=r[c+f]*d+r[l+f]*u;return s}},zf=class extends vr{constructor(t,n,i,a){super(t,n,i,a)}interpolate_(t){return this.copySampleValue_(t-1)}},ni=class{constructor(t,n,i,a){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=hf(n,this.TimeBufferType),this.values=hf(i,this.ValueBufferType),this.setInterpolation(a||this.DefaultInterpolation)}static toJSON(t){let n=t.constructor,i;if(n.toJSON!==this.toJSON)i=n.toJSON(t);else{i={name:t.name,times:hf(t.times,Array),values:hf(t.values,Array)};let a=t.getInterpolation();a!==t.DefaultInterpolation&&(i.interpolation=a)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new zf(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Bf(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Pf(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let n;switch(t){case gc:n=this.InterpolantFactoryMethodDiscrete;break;case gf:n=this.InterpolantFactoryMethodLinear;break;case ff:n=this.InterpolantFactoryMethodSmooth;break}if(n===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return gc;case this.InterpolantFactoryMethodLinear:return gf;case this.InterpolantFactoryMethodSmooth:return ff}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let n=this.times;for(let i=0,a=n.length;i!==a;++i)n[i]+=t}return this}scale(t){if(t!==1){let n=this.times;for(let i=0,a=n.length;i!==a;++i)n[i]*=t}return this}trim(t,n){let i=this.times,a=i.length,s=0,r=a-1;for(;s!==a&&i[s]<t;)++s;for(;r!==-1&&i[r]>n;)--r;if(++r,s!==0||r!==a){s>=r&&(r=Math.max(r,1),s=r-1);let o=this.getValueSize();this.times=i.slice(s,r),this.values=this.values.slice(s*o,r*o)}return this}validate(){let t=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,a=this.values,s=i.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let r=null;for(let o=0;o!==s;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(r!==null&&r>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,r),t=!1;break}r=l}if(a!==void 0&&Fw(a))for(let o=0,l=a.length;o!==l;++o){let c=a[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),a=this.getInterpolation()===ff,s=t.length-1,r=1;for(let o=1;o<s;++o){let l=!1,c=t[o],u=t[o+1];if(c!==u&&(o!==1||c!==t[0]))if(a)l=!0;else{let d=o*i,f=d-i,p=d+i;for(let g=0;g!==i;++g){let x=n[d+g];if(x!==n[f+g]||x!==n[p+g]){l=!0;break}}}if(l){if(o!==r){t[r]=t[o];let d=o*i,f=r*i;for(let p=0;p!==i;++p)n[f+p]=n[d+p]}++r}}if(s>0){t[r]=t[s];for(let o=s*i,l=r*i,c=0;c!==i;++c)n[l+c]=n[o+c];++r}return r!==t.length?(this.times=t.slice(0,r),this.values=n.slice(0,r*i)):(this.times=t,this.values=n),this}clone(){let t=this.times.slice(),n=this.values.slice(),i=this.constructor,a=new i(this.name,t,n);return a.createInterpolant=this.createInterpolant,a}};ni.prototype.ValueTypeName="";ni.prototype.TimeBufferType=Float32Array;ni.prototype.ValueBufferType=Float32Array;ni.prototype.DefaultInterpolation=gf;var As=class extends ni{constructor(t,n,i){super(t,n,i)}};As.prototype.ValueTypeName="bool";As.prototype.ValueBufferType=Array;As.prototype.DefaultInterpolation=gc;As.prototype.InterpolantFactoryMethodLinear=void 0;As.prototype.InterpolantFactoryMethodSmooth=void 0;var Ff=class extends ni{constructor(t,n,i,a){super(t,n,i,a)}};Ff.prototype.ValueTypeName="color";var Hf=class extends ni{constructor(t,n,i,a){super(t,n,i,a)}};Hf.prototype.ValueTypeName="number";var Vf=class extends vr{constructor(t,n,i,a){super(t,n,i,a)}interpolate_(t,n,i,a){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=(i-n)/(a-n),c=t*o;for(let u=c+o;c!==u;c+=4)Oa.slerpFlat(s,0,r,c-o,r,c,l);return s}},Pc=class extends ni{constructor(t,n,i,a){super(t,n,i,a)}InterpolantFactoryMethodLinear(t){return new Vf(this.times,this.values,this.getValueSize(),t)}};Pc.prototype.ValueTypeName="quaternion";Pc.prototype.InterpolantFactoryMethodSmooth=void 0;var ws=class extends ni{constructor(t,n,i){super(t,n,i)}};ws.prototype.ValueTypeName="string";ws.prototype.ValueBufferType=Array;ws.prototype.DefaultInterpolation=gc;ws.prototype.InterpolantFactoryMethodLinear=void 0;ws.prototype.InterpolantFactoryMethodSmooth=void 0;var Gf=class extends ni{constructor(t,n,i,a){super(t,n,i,a)}};Gf.prototype.ValueTypeName="vector";var kf=class{constructor(t,n,i){let a=this,s=!1,r=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=i,this.abortController=new AbortController,this.itemStart=function(u){o++,s===!1&&a.onStart!==void 0&&a.onStart(u,r,o),s=!0},this.itemEnd=function(u){r++,a.onProgress!==void 0&&a.onProgress(u,r,o),r===o&&(s=!1,a.onLoad!==void 0&&a.onLoad())},this.itemError=function(u){a.onError!==void 0&&a.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=c.length;d<f;d+=2){let p=c[d],g=c[d+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Qb=new kf,Xf=class{constructor(t){this.manager=t!==void 0?t:Qb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,n){let i=this;return new Promise(function(a,s){i.load(t,a,n,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Xf.DEFAULT_MATERIAL_NAME="__DEFAULT";var qo=class extends Ac{constructor(t=-1,n=1,i=1,a=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=a,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,a,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2,s=i-t,r=i+t,o=a+n,l=a-n;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}};var Bc=class extends Bn{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}};var Wf=class extends yn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var $0="\\[\\]\\.:\\/",Hw=new RegExp("["+$0+"]","g"),tv="[^"+$0+"]",Vw="[^"+$0.replace("\\.","")+"]",Gw=/((?:WC+[\/:])*)/.source.replace("WC",tv),kw=/(WCOD+)?/.source.replace("WCOD",Vw),Xw=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",tv),Ww=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",tv),qw=new RegExp("^"+Gw+kw+Xw+Ww+"$"),Yw=["material","materials","bones","map"],L0=class{constructor(t,n,i){let a=i||De.parseTrackName(n);this._targetGroup=t,this._bindings=t.subscribe_(n,a)}getValue(t,n){this.bind();let i=this._targetGroup.nCachedObjects_,a=this._bindings[i];a!==void 0&&a.getValue(t,n)}setValue(t,n){let i=this._bindings;for(let a=this._targetGroup.nCachedObjects_,s=i.length;a!==s;++a)i[a].setValue(t,n)}bind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].bind()}unbind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].unbind()}},De=class e{constructor(t,n,i){this.path=n,this.parsedPath=i||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,i){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,i):new e(t,n,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Hw,"")}static parseTrackName(t){let n=qw.exec(t);if(n===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},a=i.nodeName&&i.nodeName.lastIndexOf(".");if(a!==void 0&&a!==-1){let s=i.nodeName.substring(a+1);Yw.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,a),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,n){if(n===void 0||n===""||n==="."||n===-1||n===t.name||n===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(n);if(i!==void 0)return i}if(t.children){let i=function(s){for(let r=0;r<s.length;r++){let o=s[r];if(o.name===n||o.uuid===n)return o;let l=i(o.children);if(l)return l}return null},a=i(t.children);if(a)return a}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,n){t[n]=this.targetObject[this.propertyName]}_getValue_array(t,n){let i=this.resolvedProperty;for(let a=0,s=i.length;a!==s;++a)t[n++]=i[a]}_getValue_arrayElement(t,n){t[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,n){this.resolvedProperty.toArray(t,n)}_setValue_direct(t,n){this.targetObject[this.propertyName]=t[n]}_setValue_direct_setNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,n){let i=this.resolvedProperty;for(let a=0,s=i.length;a!==s;++a)i[a]=t[n++]}_setValue_array_setNeedsUpdate(t,n){let i=this.resolvedProperty;for(let a=0,s=i.length;a!==s;++a)i[a]=t[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,n){let i=this.resolvedProperty;for(let a=0,s=i.length;a!==s;++a)i[a]=t[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,n){this.resolvedProperty[this.propertyIndex]=t[n]}_setValue_arrayElement_setNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,n){this.resolvedProperty.fromArray(t,n)}_setValue_fromArray_setNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,n){this.bind(),this.getValue(t,n)}_setValue_unbound(t,n){this.bind(),this.setValue(t,n)}bind(){let t=this.node,n=this.parsedPath,i=n.objectName,a=n.propertyName,s=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=n.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===c){c=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let r=t[a];if(r===void 0){let c=n.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+a+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(a==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=a;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};De.Composite=L0;De.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};De.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};De.prototype.GetterByBindingType=[De.prototype._getValue_direct,De.prototype._getValue_array,De.prototype._getValue_arrayElement,De.prototype._getValue_toArray];De.prototype.SetterByBindingTypeAndVersioning=[[De.prototype._setValue_direct,De.prototype._setValue_direct_setNeedsUpdate,De.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[De.prototype._setValue_array,De.prototype._setValue_array_setNeedsUpdate,De.prototype._setValue_array_setMatrixWorldNeedsUpdate],[De.prototype._setValue_arrayElement,De.prototype._setValue_arrayElement_setNeedsUpdate,De.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[De.prototype._setValue_fromArray,De.prototype._setValue_fromArray_setNeedsUpdate,De.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var QD=new Float32Array(1);function ev(e,t,n,i){let a=Zw(i);switch(n){case X0:return e*t;case q0:return e*t/a.components*a.byteLength;case rd:return e*t/a.components*a.byteLength;case Y0:return e*t*2/a.components*a.byteLength;case od:return e*t*2/a.components*a.byteLength;case W0:return e*t*3/a.components*a.byteLength;case bi:return e*t*4/a.components*a.byteLength;case ld:return e*t*4/a.components*a.byteLength;case Gc:case kc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Xc:case Wc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ud:case fd:return Math.max(e,16)*Math.max(t,8)/4;case cd:case hd:return Math.max(e,8)*Math.max(t,8)/2;case dd:case pd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case md:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case gd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case vd:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case _d:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case yd:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case xd:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Sd:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Md:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case bd:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Ed:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Td:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Ad:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case wd:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Cd:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Rd:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Dd:case Ud:case Nd:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ld:case Od:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Id:case Pd:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function Zw(e){switch(e){case Mi:case H0:return{byteLength:1,components:1};case Yo:case V0:case Ds:return{byteLength:2,components:1};case ad:case sd:return{byteLength:2,components:4};case Rs:case id:case ra:return{byteLength:4,components:1};case G0:case k0:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function S1(){let e=null,t=!1,n=null,i=null;function a(s,r){n(s,r),i=e.requestAnimationFrame(a)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(a),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){n=s},setContext:function(s){e=s}}}function Kw(e){let t=new WeakMap;function n(o,l){let c=o.array,u=o.usage,d=c.byteLength,f=e.createBuffer();e.bindBuffer(l,f),e.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=e.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=e.HALF_FLOAT:p=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=e.SHORT;else if(c instanceof Uint32Array)p=e.UNSIGNED_INT;else if(c instanceof Int32Array)p=e.INT;else if(c instanceof Int8Array)p=e.BYTE;else if(c instanceof Uint8Array)p=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let u=l.array,d=l.updateRanges;if(e.bindBuffer(c,o),d.length===0)e.bufferSubData(c,0,u);else{d.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<d.length;p++){let g=d[f],x=d[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,d[f]=x)}d.length=f+1;for(let p=0,g=d.length;p<g;p++){let x=d[p];e.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(e.deleteBuffer(l.buffer),t.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:a,remove:s,update:r}}var Qw=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,jw=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,$w=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,tC=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,eC=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,nC=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,iC=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aC=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,sC=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,rC=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,oC=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,lC=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,cC=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,uC=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,hC=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,fC=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,dC=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,pC=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,mC=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,gC=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,vC=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,_C=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,yC=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,xC=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,SC=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,MC=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,bC=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,EC=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,TC=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,AC=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,wC="gl_FragColor = linearToOutputTexel( gl_FragColor );",CC=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,RC=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,DC=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,UC=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,NC=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,LC=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,OC=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,IC=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,PC=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,BC=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,zC=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,FC=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,HC=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,VC=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,GC=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,kC=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,XC=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,WC=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,qC=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,YC=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ZC=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,JC=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,KC=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,QC=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,jC=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$C=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,tR=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,eR=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nR=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,iR=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,aR=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sR=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,rR=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,oR=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,lR=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,cR=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,uR=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,hR=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fR=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,dR=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pR=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,mR=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,gR=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vR=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_R=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,yR=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,xR=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,SR=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,MR=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,bR=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ER=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,TR=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,AR=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,wR=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,CR=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,RR=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,DR=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,UR=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,NR=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,LR=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,OR=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,IR=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,PR=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,BR=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,zR=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,FR=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,HR=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,VR=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,GR=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,kR=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,XR=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,WR=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,qR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,YR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ZR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,JR=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,KR=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,QR=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$R=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,t2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,e2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,n2=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,i2=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,a2=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,s2=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,r2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,o2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,l2=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,c2=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,u2=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,h2=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,f2=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,d2=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,p2=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,m2=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,g2=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,v2=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,_2=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,y2=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x2=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,S2=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,M2=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,b2=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,E2=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,T2=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,A2=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,w2=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,C2=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,R2=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Yt={alphahash_fragment:Qw,alphahash_pars_fragment:jw,alphamap_fragment:$w,alphamap_pars_fragment:tC,alphatest_fragment:eC,alphatest_pars_fragment:nC,aomap_fragment:iC,aomap_pars_fragment:aC,batching_pars_vertex:sC,batching_vertex:rC,begin_vertex:oC,beginnormal_vertex:lC,bsdfs:cC,iridescence_fragment:uC,bumpmap_pars_fragment:hC,clipping_planes_fragment:fC,clipping_planes_pars_fragment:dC,clipping_planes_pars_vertex:pC,clipping_planes_vertex:mC,color_fragment:gC,color_pars_fragment:vC,color_pars_vertex:_C,color_vertex:yC,common:xC,cube_uv_reflection_fragment:SC,defaultnormal_vertex:MC,displacementmap_pars_vertex:bC,displacementmap_vertex:EC,emissivemap_fragment:TC,emissivemap_pars_fragment:AC,colorspace_fragment:wC,colorspace_pars_fragment:CC,envmap_fragment:RC,envmap_common_pars_fragment:DC,envmap_pars_fragment:UC,envmap_pars_vertex:NC,envmap_physical_pars_fragment:kC,envmap_vertex:LC,fog_vertex:OC,fog_pars_vertex:IC,fog_fragment:PC,fog_pars_fragment:BC,gradientmap_pars_fragment:zC,lightmap_pars_fragment:FC,lights_lambert_fragment:HC,lights_lambert_pars_fragment:VC,lights_pars_begin:GC,lights_toon_fragment:XC,lights_toon_pars_fragment:WC,lights_phong_fragment:qC,lights_phong_pars_fragment:YC,lights_physical_fragment:ZC,lights_physical_pars_fragment:JC,lights_fragment_begin:KC,lights_fragment_maps:QC,lights_fragment_end:jC,logdepthbuf_fragment:$C,logdepthbuf_pars_fragment:tR,logdepthbuf_pars_vertex:eR,logdepthbuf_vertex:nR,map_fragment:iR,map_pars_fragment:aR,map_particle_fragment:sR,map_particle_pars_fragment:rR,metalnessmap_fragment:oR,metalnessmap_pars_fragment:lR,morphinstance_vertex:cR,morphcolor_vertex:uR,morphnormal_vertex:hR,morphtarget_pars_vertex:fR,morphtarget_vertex:dR,normal_fragment_begin:pR,normal_fragment_maps:mR,normal_pars_fragment:gR,normal_pars_vertex:vR,normal_vertex:_R,normalmap_pars_fragment:yR,clearcoat_normal_fragment_begin:xR,clearcoat_normal_fragment_maps:SR,clearcoat_pars_fragment:MR,iridescence_pars_fragment:bR,opaque_fragment:ER,packing:TR,premultiplied_alpha_fragment:AR,project_vertex:wR,dithering_fragment:CR,dithering_pars_fragment:RR,roughnessmap_fragment:DR,roughnessmap_pars_fragment:UR,shadowmap_pars_fragment:NR,shadowmap_pars_vertex:LR,shadowmap_vertex:OR,shadowmask_pars_fragment:IR,skinbase_vertex:PR,skinning_pars_vertex:BR,skinning_vertex:zR,skinnormal_vertex:FR,specularmap_fragment:HR,specularmap_pars_fragment:VR,tonemapping_fragment:GR,tonemapping_pars_fragment:kR,transmission_fragment:XR,transmission_pars_fragment:WR,uv_pars_fragment:qR,uv_pars_vertex:YR,uv_vertex:ZR,worldpos_vertex:JR,background_vert:KR,background_frag:QR,backgroundCube_vert:jR,backgroundCube_frag:$R,cube_vert:t2,cube_frag:e2,depth_vert:n2,depth_frag:i2,distanceRGBA_vert:a2,distanceRGBA_frag:s2,equirect_vert:r2,equirect_frag:o2,linedashed_vert:l2,linedashed_frag:c2,meshbasic_vert:u2,meshbasic_frag:h2,meshlambert_vert:f2,meshlambert_frag:d2,meshmatcap_vert:p2,meshmatcap_frag:m2,meshnormal_vert:g2,meshnormal_frag:v2,meshphong_vert:_2,meshphong_frag:y2,meshphysical_vert:x2,meshphysical_frag:S2,meshtoon_vert:M2,meshtoon_frag:b2,points_vert:E2,points_frag:T2,shadow_vert:A2,shadow_frag:w2,sprite_vert:C2,sprite_frag:R2},ft={common:{diffuse:{value:new ae(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Wt}},envmap:{envMap:{value:null},envMapRotation:{value:new Wt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Wt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Wt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Wt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Wt},normalScale:{value:new Ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Wt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Wt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Wt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Wt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ae(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ae(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0},uvTransform:{value:new Wt}},sprite:{diffuse:{value:new ae(16777215)},opacity:{value:1},center:{value:new Ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}}},oa={basic:{uniforms:xn([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.fog]),vertexShader:Yt.meshbasic_vert,fragmentShader:Yt.meshbasic_frag},lambert:{uniforms:xn([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new ae(0)}}]),vertexShader:Yt.meshlambert_vert,fragmentShader:Yt.meshlambert_frag},phong:{uniforms:xn([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new ae(0)},specular:{value:new ae(1118481)},shininess:{value:30}}]),vertexShader:Yt.meshphong_vert,fragmentShader:Yt.meshphong_frag},standard:{uniforms:xn([ft.common,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.roughnessmap,ft.metalnessmap,ft.fog,ft.lights,{emissive:{value:new ae(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag},toon:{uniforms:xn([ft.common,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.gradientmap,ft.fog,ft.lights,{emissive:{value:new ae(0)}}]),vertexShader:Yt.meshtoon_vert,fragmentShader:Yt.meshtoon_frag},matcap:{uniforms:xn([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,{matcap:{value:null}}]),vertexShader:Yt.meshmatcap_vert,fragmentShader:Yt.meshmatcap_frag},points:{uniforms:xn([ft.points,ft.fog]),vertexShader:Yt.points_vert,fragmentShader:Yt.points_frag},dashed:{uniforms:xn([ft.common,ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Yt.linedashed_vert,fragmentShader:Yt.linedashed_frag},depth:{uniforms:xn([ft.common,ft.displacementmap]),vertexShader:Yt.depth_vert,fragmentShader:Yt.depth_frag},normal:{uniforms:xn([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,{opacity:{value:1}}]),vertexShader:Yt.meshnormal_vert,fragmentShader:Yt.meshnormal_frag},sprite:{uniforms:xn([ft.sprite,ft.fog]),vertexShader:Yt.sprite_vert,fragmentShader:Yt.sprite_frag},background:{uniforms:{uvTransform:{value:new Wt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Yt.background_vert,fragmentShader:Yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Wt}},vertexShader:Yt.backgroundCube_vert,fragmentShader:Yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Yt.cube_vert,fragmentShader:Yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Yt.equirect_vert,fragmentShader:Yt.equirect_frag},distanceRGBA:{uniforms:xn([ft.common,ft.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Yt.distanceRGBA_vert,fragmentShader:Yt.distanceRGBA_frag},shadow:{uniforms:xn([ft.lights,ft.fog,{color:{value:new ae(0)},opacity:{value:1}}]),vertexShader:Yt.shadow_vert,fragmentShader:Yt.shadow_frag}};oa.physical={uniforms:xn([oa.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Wt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Wt},clearcoatNormalScale:{value:new Ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Wt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Wt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Wt},sheen:{value:0},sheenColor:{value:new ae(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Wt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Wt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Wt},transmissionSamplerSize:{value:new Ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Wt},attenuationDistance:{value:0},attenuationColor:{value:new ae(0)},specularColor:{value:new ae(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Wt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Wt},anisotropyVector:{value:new Ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Wt}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag};var Bd={r:0,b:0,g:0},Sr=new ia,D2=new Ve;function U2(e,t,n,i,a,s,r){let o=new ae(0),l=s===!0?0:1,c,u,d=null,f=0,p=null;function g(_){let y=_.isScene===!0?_.background:null;return y&&y.isTexture&&(y=(_.backgroundBlurriness>0?n:t).get(y)),y}function x(_){let y=!1,T=g(_);T===null?h(o,l):T&&T.isColor&&(h(T,1),y=!0);let C=e.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,r):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(e.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function m(_,y){let T=g(y);T&&(T.isCubeTexture||T.mapping===Hc)?(u===void 0&&(u=new dn(new Go(1,1,1),new zn({name:"BackgroundCubeMaterial",uniforms:xr(oa.backgroundCube.uniforms),vertexShader:oa.backgroundCube.vertexShader,fragmentShader:oa.backgroundCube.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(u)),Sr.copy(y.backgroundRotation),Sr.x*=-1,Sr.y*=-1,Sr.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Sr.y*=-1,Sr.z*=-1),u.material.uniforms.envMap.value=T,u.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(D2.makeRotationFromEuler(Sr)),u.material.toneMapped=re.getTransfer(T.colorSpace)!==xe,(d!==T||f!==T.version||p!==e.toneMapping)&&(u.material.needsUpdate=!0,d=T,f=T.version,p=e.toneMapping),u.layers.enableAll(),_.unshift(u,u.geometry,u.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new dn(new Ts(2,2),new zn({name:"BackgroundMaterial",uniforms:xr(oa.background.uniforms),vertexShader:oa.background.vertexShader,fragmentShader:oa.background.fragmentShader,side:Ua,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=re.getTransfer(T.colorSpace)!==xe,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(d!==T||f!==T.version||p!==e.toneMapping)&&(c.material.needsUpdate=!0,d=T,f=T.version,p=e.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function h(_,y){_.getRGB(Bd,Q0(e)),i.buffers.color.setClear(Bd.r,Bd.g,Bd.b,y,r)}function v(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(_,y=1){o.set(_),l=y,h(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,h(o,l)},render:x,addToRenderList:m,dispose:v}}function N2(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},a=f(null),s=a,r=!1;function o(S,U,B,G,W){let Q=!1,Y=d(G,B,U);s!==Y&&(s=Y,c(s.object)),Q=p(S,G,B,W),Q&&g(S,G,B,W),W!==null&&t.update(W,e.ELEMENT_ARRAY_BUFFER),(Q||r)&&(r=!1,y(S,U,B,G),W!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function l(){return e.createVertexArray()}function c(S){return e.bindVertexArray(S)}function u(S){return e.deleteVertexArray(S)}function d(S,U,B){let G=B.wireframe===!0,W=i[S.id];W===void 0&&(W={},i[S.id]=W);let Q=W[U.id];Q===void 0&&(Q={},W[U.id]=Q);let Y=Q[G];return Y===void 0&&(Y=f(l()),Q[G]=Y),Y}function f(S){let U=[],B=[],G=[];for(let W=0;W<n;W++)U[W]=0,B[W]=0,G[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:B,attributeDivisors:G,object:S,attributes:{},index:null}}function p(S,U,B,G){let W=s.attributes,Q=U.attributes,Y=0,at=B.getAttributes();for(let k in at)if(at[k].location>=0){let pt=W[k],bt=Q[k];if(bt===void 0&&(k==="instanceMatrix"&&S.instanceMatrix&&(bt=S.instanceMatrix),k==="instanceColor"&&S.instanceColor&&(bt=S.instanceColor)),pt===void 0||pt.attribute!==bt||bt&&pt.data!==bt.data)return!0;Y++}return s.attributesNum!==Y||s.index!==G}function g(S,U,B,G){let W={},Q=U.attributes,Y=0,at=B.getAttributes();for(let k in at)if(at[k].location>=0){let pt=Q[k];pt===void 0&&(k==="instanceMatrix"&&S.instanceMatrix&&(pt=S.instanceMatrix),k==="instanceColor"&&S.instanceColor&&(pt=S.instanceColor));let bt={};bt.attribute=pt,pt&&pt.data&&(bt.data=pt.data),W[k]=bt,Y++}s.attributes=W,s.attributesNum=Y,s.index=G}function x(){let S=s.newAttributes;for(let U=0,B=S.length;U<B;U++)S[U]=0}function m(S){h(S,0)}function h(S,U){let B=s.newAttributes,G=s.enabledAttributes,W=s.attributeDivisors;B[S]=1,G[S]===0&&(e.enableVertexAttribArray(S),G[S]=1),W[S]!==U&&(e.vertexAttribDivisor(S,U),W[S]=U)}function v(){let S=s.newAttributes,U=s.enabledAttributes;for(let B=0,G=U.length;B<G;B++)U[B]!==S[B]&&(e.disableVertexAttribArray(B),U[B]=0)}function _(S,U,B,G,W,Q,Y){Y===!0?e.vertexAttribIPointer(S,U,B,W,Q):e.vertexAttribPointer(S,U,B,G,W,Q)}function y(S,U,B,G){x();let W=G.attributes,Q=B.getAttributes(),Y=U.defaultAttributeValues;for(let at in Q){let k=Q[at];if(k.location>=0){let ct=W[at];if(ct===void 0&&(at==="instanceMatrix"&&S.instanceMatrix&&(ct=S.instanceMatrix),at==="instanceColor"&&S.instanceColor&&(ct=S.instanceColor)),ct!==void 0){let pt=ct.normalized,bt=ct.itemSize,qt=t.get(ct);if(qt===void 0)continue;let Zt=qt.buffer,ce=qt.type,Ot=qt.bytesPerElement,K=ce===e.INT||ce===e.UNSIGNED_INT||ct.gpuType===id;if(ct.isInterleavedBufferAttribute){let q=ct.data,yt=q.stride,Rt=ct.offset;if(q.isInstancedInterleavedBuffer){for(let gt=0;gt<k.locationSize;gt++)h(k.location+gt,q.meshPerAttribute);S.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let gt=0;gt<k.locationSize;gt++)m(k.location+gt);e.bindBuffer(e.ARRAY_BUFFER,Zt);for(let gt=0;gt<k.locationSize;gt++)_(k.location+gt,bt/k.locationSize,ce,pt,yt*Ot,(Rt+bt/k.locationSize*gt)*Ot,K)}else{if(ct.isInstancedBufferAttribute){for(let q=0;q<k.locationSize;q++)h(k.location+q,ct.meshPerAttribute);S.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let q=0;q<k.locationSize;q++)m(k.location+q);e.bindBuffer(e.ARRAY_BUFFER,Zt);for(let q=0;q<k.locationSize;q++)_(k.location+q,bt/k.locationSize,ce,pt,bt*Ot,bt/k.locationSize*q*Ot,K)}}else if(Y!==void 0){let pt=Y[at];if(pt!==void 0)switch(pt.length){case 2:e.vertexAttrib2fv(k.location,pt);break;case 3:e.vertexAttrib3fv(k.location,pt);break;case 4:e.vertexAttrib4fv(k.location,pt);break;default:e.vertexAttrib1fv(k.location,pt)}}}}v()}function T(){R();for(let S in i){let U=i[S];for(let B in U){let G=U[B];for(let W in G)u(G[W].object),delete G[W];delete U[B]}delete i[S]}}function C(S){if(i[S.id]===void 0)return;let U=i[S.id];for(let B in U){let G=U[B];for(let W in G)u(G[W].object),delete G[W];delete U[B]}delete i[S.id]}function w(S){for(let U in i){let B=i[U];if(B[S.id]===void 0)continue;let G=B[S.id];for(let W in G)u(G[W].object),delete G[W];delete B[S.id]}}function R(){E(),r=!0,s!==a&&(s=a,c(s.object))}function E(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:R,resetDefaultState:E,dispose:T,releaseStatesOfGeometry:C,releaseStatesOfProgram:w,initAttributes:x,enableAttribute:m,disableUnusedAttributes:v}}function L2(e,t,n){let i;function a(c){i=c}function s(c,u){e.drawArrays(i,c,u),n.update(u,i,1)}function r(c,u,d){d!==0&&(e.drawArraysInstanced(i,c,u,d),n.update(u,i,d))}function o(c,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let p=0;for(let g=0;g<d;g++)p+=u[g];n.update(p,i,1)}function l(c,u,d,f){if(d===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)r(c[g],u[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,d);let g=0;for(let x=0;x<d;x++)g+=u[x]*f[x];n.update(g,i,1)}}this.setMode=a,this.render=s,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function O2(e,t,n,i){let a;function s(){if(a!==void 0)return a;if(t.has("EXT_texture_filter_anisotropic")===!0){let w=t.get("EXT_texture_filter_anisotropic");a=e.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function r(w){return!(w!==bi&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){let R=w===Ds&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==Mi&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==ra&&!R)}function l(w){if(w==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=e.getParameter(e.MAX_TEXTURE_SIZE),m=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),h=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),_=e.getParameter(e.MAX_VARYING_VECTORS),y=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),T=g>0,C=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:v,maxVaryings:_,maxFragmentUniforms:y,vertexTextures:T,maxSamples:C}}function I2(e){let t=this,n=null,i=0,a=!1,s=!1,r=new ea,o=new Wt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let p=d.length!==0||f||i!==0||a;return a=f,i=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){n=u(d,f,0)},this.setState=function(d,f,p){let g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,h=e.get(d);if(!a||g===null||g.length===0||s&&!m)s?u(null):c();else{let v=s?0:i,_=v*4,y=h.clippingState||null;l.value=y,y=u(g,f,_,p);for(let T=0;T!==_;++T)y[T]=n[T];h.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(d,f,p,g){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let h=p+x*4,v=f.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<h)&&(m=new Float32Array(h));for(let _=0,y=p;_!==x;++_,y+=4)r.copy(d[_]).applyMatrix4(v,o),r.normal.toArray(m,y),m[y+3]=r.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function P2(e){let t=new WeakMap;function n(r,o){return o===td?r.mapping=_r:o===ed&&(r.mapping=yr),r}function i(r){if(r&&r.isTexture){let o=r.mapping;if(o===td||o===ed)if(t.has(r)){let l=t.get(r).texture;return n(l,r.mapping)}else{let l=r.image;if(l&&l.height>0){let c=new Mf(l.height);return c.fromEquirectangularTexture(e,r),t.set(r,c),r.addEventListener("dispose",a),n(c.texture,r.mapping)}else return null}}return r}function a(r){let o=r.target;o.removeEventListener("dispose",a);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}var Qo=4,jb=[.125,.215,.35,.446,.526,.582],Er=20,nv=new qo,$b=new ae,iv=null,av=0,sv=0,rv=!1,br=(1+Math.sqrt(5))/2,Ko=1/br,t1=[new L(-br,Ko,0),new L(br,Ko,0),new L(-Ko,0,br),new L(Ko,0,br),new L(0,br,-Ko),new L(0,br,Ko),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],B2=new L,Hd=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,i=.1,a=100,s={}){let{size:r=256,position:o=B2}=s;iv=this._renderer.getRenderTarget(),av=this._renderer.getActiveCubeFace(),sv=this._renderer.getActiveMipmapLevel(),rv=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,a,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=i1(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=n1(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(iv,av,sv),this._renderer.xr.enabled=rv,t.scissorTest=!1,zd(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===_r||t.mapping===yr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),iv=this._renderer.getRenderTarget(),av=this._renderer.getActiveCubeFace(),sv=this._renderer.getActiveMipmapLevel(),rv=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Ii,minFilter:Ii,generateMipmaps:!1,type:Ds,format:bi,colorSpace:na,depthBuffer:!1},a=e1(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=e1(t,n,i);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=z2(s)),this._blurMaterial=F2(s,t,n)}return a}_compileMaterial(t){let n=new dn(this._lodPlanes[0],t);this._renderer.compile(n,nv)}_sceneToCubeUV(t,n,i,a,s){let l=new yn(90,1,n,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,p=d.toneMapping;d.getClearColor($b),d.toneMapping=Ia,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(a),d.clearDepth(),d.setRenderTarget(null));let x=new bc({name:"PMREM.Background",side:wn,depthWrite:!1,depthTest:!1}),m=new dn(new Go,x),h=!1,v=t.background;v?v.isColor&&(x.color.copy(v),t.background=null,h=!0):(x.color.copy($b),h=!0);for(let _=0;_<6;_++){let y=_%3;y===0?(l.up.set(0,c[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[_],s.y,s.z)):y===1?(l.up.set(0,0,c[_]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[_],s.z)):(l.up.set(0,c[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[_]));let T=this._cubeSize;zd(a,y*T,_>2?T:0,T,T),d.setRenderTarget(a),h&&d.render(m,l),d.render(t,l)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=p,d.autoClear=f,t.background=v}_textureToCubeUV(t,n){let i=this._renderer,a=t.mapping===_r||t.mapping===yr;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=i1()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=n1());let s=a?this._cubemapMaterial:this._equirectMaterial,r=new dn(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;let l=this._cubeSize;zd(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,nv)}_applyPMREM(t){let n=this._renderer,i=n.autoClear;n.autoClear=!1;let a=this._lodPlanes.length;for(let s=1;s<a;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=t1[(a-s-1)%t1.length];this._blur(t,s-1,s,r,o)}n.autoClear=i}_blur(t,n,i,a,s){let r=this._pingPongRenderTarget;this._halfBlur(t,r,n,i,a,"latitudinal",s),this._halfBlur(r,t,i,i,a,"longitudinal",s)}_halfBlur(t,n,i,a,s,r,o){let l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,d=new dn(this._lodPlanes[a],c),f=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Er-1),x=s/g,m=isFinite(s)?1+Math.floor(u*x):Er;m>Er&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Er}`);let h=[],v=0;for(let w=0;w<Er;++w){let R=w/x,E=Math.exp(-R*R/2);h.push(E),w===0?v+=E:w<m&&(v+=2*E)}for(let w=0;w<h.length;w++)h[w]=h[w]/v;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=h,f.latitudinal.value=r==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:_}=this;f.dTheta.value=g,f.mipInt.value=_-i;let y=this._sizeLods[a],T=3*y*(a>_-Qo?a-_+Qo:0),C=4*(this._cubeSize-y);zd(n,T,C,3*y,2*y),l.setRenderTarget(n),l.render(d,nv)}};function z2(e){let t=[],n=[],i=[],a=e,s=e-Qo+1+jb.length;for(let r=0;r<s;r++){let o=Math.pow(2,a);n.push(o);let l=1/o;r>e-Qo?l=jb[r-e+Qo-1]:r===0&&(l=0),i.push(l);let c=1/(o-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,g=6,x=3,m=2,h=1,v=new Float32Array(x*g*p),_=new Float32Array(m*g*p),y=new Float32Array(h*g*p);for(let C=0;C<p;C++){let w=C%3*2/3-1,R=C>2?0:-1,E=[w,R,0,w+2/3,R,0,w+2/3,R+1,0,w,R,0,w+2/3,R+1,0,w,R+1,0];v.set(E,x*g*C),_.set(f,m*g*C);let S=[C,C,C,C,C,C];y.set(S,h*g*C)}let T=new Bn;T.setAttribute("position",new an(v,x)),T.setAttribute("uv",new an(_,m)),T.setAttribute("faceIndex",new an(y,h)),t.push(T),a>Qo&&a--}return{lodPlanes:t,sizeLods:n,sigmas:i}}function e1(e,t,n){let i=new xi(e,t,n);return i.texture.mapping=Hc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function zd(e,t,n,i,a){e.viewport.set(t,n,i,a),e.scissor.set(t,n,i,a)}function F2(e,t,n){let i=new Float32Array(Er),a=new L(0,1,0);return new zn({name:"SphericalGaussianBlur",defines:{n:Er,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:gv(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function n1(){return new zn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:gv(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function i1(){return new zn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:gv(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function gv(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function H2(e){let t=new WeakMap,n=null;function i(o){if(o&&o.isTexture){let l=o.mapping,c=l===td||l===ed,u=l===_r||l===yr;if(c||u){let d=t.get(o),f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return n===null&&(n=new Hd(e)),d=c?n.fromEquirectangular(o,d):n.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{let p=o.image;return c&&p&&p.height>0||u&&p&&a(p)?(n===null&&(n=new Hd(e)),d=c?n.fromEquirectangular(o):n.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function a(o){let l=0,c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){let l=o.target;l.removeEventListener("dispose",s);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function r(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:r}}function V2(e){let t={};function n(i){if(t[i]!==void 0)return t[i];let a;switch(i){case"WEBGL_depth_texture":a=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=e.getExtension(i)}return t[i]=a,a}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let a=n(i);return a===null&&Ho("THREE.WebGLRenderer: "+i+" extension not supported."),a}}}function G2(e,t,n,i){let a={},s=new WeakMap;function r(d){let f=d.target;f.index!==null&&t.remove(f.index);for(let g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",r),delete a[f.id];let p=s.get(f);p&&(t.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function o(d,f){return a[f.id]===!0||(f.addEventListener("dispose",r),a[f.id]=!0,n.memory.geometries++),f}function l(d){let f=d.attributes;for(let p in f)t.update(f[p],e.ARRAY_BUFFER)}function c(d){let f=[],p=d.index,g=d.attributes.position,x=0;if(p!==null){let v=p.array;x=p.version;for(let _=0,y=v.length;_<y;_+=3){let T=v[_+0],C=v[_+1],w=v[_+2];f.push(T,C,C,w,w,T)}}else if(g!==void 0){let v=g.array;x=g.version;for(let _=0,y=v.length/3-1;_<y;_+=3){let T=_+0,C=_+1,w=_+2;f.push(T,C,C,w,w,T)}}else return;let m=new(K0(f)?Tc:Ec)(f,1);m.version=x;let h=s.get(d);h&&t.remove(h),s.set(d,m)}function u(d){let f=s.get(d);if(f){let p=d.index;p!==null&&f.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function k2(e,t,n){let i;function a(f){i=f}let s,r;function o(f){s=f.type,r=f.bytesPerElement}function l(f,p){e.drawElements(i,p,s,f*r),n.update(p,i,1)}function c(f,p,g){g!==0&&(e.drawElementsInstanced(i,p,s,f*r,g),n.update(p,i,g))}function u(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,f,0,g);let m=0;for(let h=0;h<g;h++)m+=p[h];n.update(m,i,1)}function d(f,p,g,x){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<f.length;h++)c(f[h]/r,p[h],x[h]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,f,0,x,0,g);let h=0;for(let v=0;v<g;v++)h+=p[v]*x[v];n.update(h,i,1)}}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function X2(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=o*(s/3);break;case e.LINES:n.lines+=o*(s/2);break;case e.LINE_STRIP:n.lines+=o*(s-1);break;case e.LINE_LOOP:n.lines+=o*s;break;case e.POINTS:n.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:a,update:i}}function W2(e,t,n){let i=new WeakMap,a=new Le;function s(r,o,l){let c=r.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,f=i.get(o);if(f===void 0||f.count!==d){let E=function(){w.dispose(),i.delete(o),o.removeEventListener("dispose",E)};f!==void 0&&f.texture.dispose();let p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],h=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],_=0;p===!0&&(_=1),g===!0&&(_=2),x===!0&&(_=3);let y=o.attributes.position.count*_,T=1;y>t.maxTextureSize&&(T=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let C=new Float32Array(y*T*4*d),w=new xc(C,y,T,d);w.type=ra,w.needsUpdate=!0;let R=_*4;for(let S=0;S<d;S++){let U=m[S],B=h[S],G=v[S],W=y*T*4*S;for(let Q=0;Q<U.count;Q++){let Y=Q*R;p===!0&&(a.fromBufferAttribute(U,Q),C[W+Y+0]=a.x,C[W+Y+1]=a.y,C[W+Y+2]=a.z,C[W+Y+3]=0),g===!0&&(a.fromBufferAttribute(B,Q),C[W+Y+4]=a.x,C[W+Y+5]=a.y,C[W+Y+6]=a.z,C[W+Y+7]=0),x===!0&&(a.fromBufferAttribute(G,Q),C[W+Y+8]=a.x,C[W+Y+9]=a.y,C[W+Y+10]=a.z,C[W+Y+11]=G.itemSize===4?a.w:1)}}f={count:d,texture:w,size:new Ut(y,T)},i.set(o,f),o.addEventListener("dispose",E)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",r.morphTexture,n);else{let p=0;for(let x=0;x<c.length;x++)p+=c[x];let g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(e,"morphTargetBaseInfluence",g),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",f.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",f.size)}return{update:s}}function q2(e,t,n,i){let a=new WeakMap;function s(l){let c=i.render.frame,u=l.geometry,d=t.get(l,u);if(a.get(d)!==c&&(t.update(d),a.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),a.get(l)!==c&&(n.update(l.instanceMatrix,e.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,e.ARRAY_BUFFER),a.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;a.get(f)!==c&&(f.update(),a.set(f,c))}return d}function r(){a=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:r}}var M1=new ti,a1=new Dc(1,1),b1=new xc,E1=new xf,T1=new wc,s1=[],r1=[],o1=new Float32Array(16),l1=new Float32Array(9),c1=new Float32Array(4);function $o(e,t,n){let i=e[0];if(i<=0||i>0)return e;let a=t*n,s=s1[a];if(s===void 0&&(s=new Float32Array(a),s1[a]=s),t!==0){i.toArray(s,0);for(let r=1,o=0;r!==t;++r)o+=n,e[r].toArray(s,o)}return s}function Je(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Ke(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function Gd(e,t){let n=r1[t];n===void 0&&(n=new Int32Array(t),r1[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function Y2(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Z2(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Je(n,t))return;e.uniform2fv(this.addr,t),Ke(n,t)}}function J2(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Je(n,t))return;e.uniform3fv(this.addr,t),Ke(n,t)}}function K2(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Je(n,t))return;e.uniform4fv(this.addr,t),Ke(n,t)}}function Q2(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Je(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Ke(n,t)}else{if(Je(n,i))return;c1.set(i),e.uniformMatrix2fv(this.addr,!1,c1),Ke(n,i)}}function j2(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Je(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Ke(n,t)}else{if(Je(n,i))return;l1.set(i),e.uniformMatrix3fv(this.addr,!1,l1),Ke(n,i)}}function $2(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Je(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Ke(n,t)}else{if(Je(n,i))return;o1.set(i),e.uniformMatrix4fv(this.addr,!1,o1),Ke(n,i)}}function t3(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function e3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Je(n,t))return;e.uniform2iv(this.addr,t),Ke(n,t)}}function n3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Je(n,t))return;e.uniform3iv(this.addr,t),Ke(n,t)}}function i3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Je(n,t))return;e.uniform4iv(this.addr,t),Ke(n,t)}}function a3(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function s3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Je(n,t))return;e.uniform2uiv(this.addr,t),Ke(n,t)}}function r3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Je(n,t))return;e.uniform3uiv(this.addr,t),Ke(n,t)}}function o3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Je(n,t))return;e.uniform4uiv(this.addr,t),Ke(n,t)}}function l3(e,t,n){let i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a);let s;this.type===e.SAMPLER_2D_SHADOW?(a1.compareFunction=Z0,s=a1):s=M1,n.setTexture2D(t||s,a)}function c3(e,t,n){let i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTexture3D(t||E1,a)}function u3(e,t,n){let i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTextureCube(t||T1,a)}function h3(e,t,n){let i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTexture2DArray(t||b1,a)}function f3(e){switch(e){case 5126:return Y2;case 35664:return Z2;case 35665:return J2;case 35666:return K2;case 35674:return Q2;case 35675:return j2;case 35676:return $2;case 5124:case 35670:return t3;case 35667:case 35671:return e3;case 35668:case 35672:return n3;case 35669:case 35673:return i3;case 5125:return a3;case 36294:return s3;case 36295:return r3;case 36296:return o3;case 35678:case 36198:case 36298:case 36306:case 35682:return l3;case 35679:case 36299:case 36307:return c3;case 35680:case 36300:case 36308:case 36293:return u3;case 36289:case 36303:case 36311:case 36292:return h3}}function d3(e,t){e.uniform1fv(this.addr,t)}function p3(e,t){let n=$o(t,this.size,2);e.uniform2fv(this.addr,n)}function m3(e,t){let n=$o(t,this.size,3);e.uniform3fv(this.addr,n)}function g3(e,t){let n=$o(t,this.size,4);e.uniform4fv(this.addr,n)}function v3(e,t){let n=$o(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function _3(e,t){let n=$o(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function y3(e,t){let n=$o(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function x3(e,t){e.uniform1iv(this.addr,t)}function S3(e,t){e.uniform2iv(this.addr,t)}function M3(e,t){e.uniform3iv(this.addr,t)}function b3(e,t){e.uniform4iv(this.addr,t)}function E3(e,t){e.uniform1uiv(this.addr,t)}function T3(e,t){e.uniform2uiv(this.addr,t)}function A3(e,t){e.uniform3uiv(this.addr,t)}function w3(e,t){e.uniform4uiv(this.addr,t)}function C3(e,t,n){let i=this.cache,a=t.length,s=Gd(n,a);Je(i,s)||(e.uniform1iv(this.addr,s),Ke(i,s));for(let r=0;r!==a;++r)n.setTexture2D(t[r]||M1,s[r])}function R3(e,t,n){let i=this.cache,a=t.length,s=Gd(n,a);Je(i,s)||(e.uniform1iv(this.addr,s),Ke(i,s));for(let r=0;r!==a;++r)n.setTexture3D(t[r]||E1,s[r])}function D3(e,t,n){let i=this.cache,a=t.length,s=Gd(n,a);Je(i,s)||(e.uniform1iv(this.addr,s),Ke(i,s));for(let r=0;r!==a;++r)n.setTextureCube(t[r]||T1,s[r])}function U3(e,t,n){let i=this.cache,a=t.length,s=Gd(n,a);Je(i,s)||(e.uniform1iv(this.addr,s),Ke(i,s));for(let r=0;r!==a;++r)n.setTexture2DArray(t[r]||b1,s[r])}function N3(e){switch(e){case 5126:return d3;case 35664:return p3;case 35665:return m3;case 35666:return g3;case 35674:return v3;case 35675:return _3;case 35676:return y3;case 5124:case 35670:return x3;case 35667:case 35671:return S3;case 35668:case 35672:return M3;case 35669:case 35673:return b3;case 5125:return E3;case 36294:return T3;case 36295:return A3;case 36296:return w3;case 35678:case 36198:case 36298:case 36306:case 35682:return C3;case 35679:case 36299:case 36307:return R3;case 35680:case 36300:case 36308:case 36293:return D3;case 36289:case 36303:case 36311:case 36292:return U3}}var lv=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=f3(n.type)}},cv=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=N3(n.type)}},uv=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){let a=this.seq;for(let s=0,r=a.length;s!==r;++s){let o=a[s];o.setValue(t,n[o.id],i)}}},ov=/(\w+)(\])?(\[|\.)?/g;function u1(e,t){e.seq.push(t),e.map[t.id]=t}function L3(e,t,n){let i=e.name,a=i.length;for(ov.lastIndex=0;;){let s=ov.exec(i),r=ov.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===a){u1(n,c===void 0?new lv(o,e,t):new cv(o,e,t));break}else{let d=n.map[o];d===void 0&&(d=new uv(o),u1(n,d)),n=d}}}var jo=class{constructor(t,n){this.seq=[],this.map={};let i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let s=t.getActiveUniform(n,a),r=t.getUniformLocation(n,s.name);L3(s,r,this)}}setValue(t,n,i,a){let s=this.map[n];s!==void 0&&s.setValue(t,i,a)}setOptional(t,n,i){let a=n[i];a!==void 0&&this.setValue(t,i,a)}static upload(t,n,i,a){for(let s=0,r=n.length;s!==r;++s){let o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,a)}}static seqWithValue(t,n){let i=[];for(let a=0,s=t.length;a!==s;++a){let r=t[a];r.id in n&&i.push(r)}return i}};function h1(e,t,n){let i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}var O3=37297,I3=0;function P3(e,t){let n=e.split(`
`),i=[],a=Math.max(t-6,0),s=Math.min(t+6,n.length);for(let r=a;r<s;r++){let o=r+1;i.push(`${o===t?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}var f1=new Wt;function B3(e){re._getMatrix(f1,re.workingColorSpace,e);let t=`mat3( ${f1.elements.map(n=>n.toFixed(4))} )`;switch(re.getTransfer(e)){case vc:return[t,"LinearTransferOETF"];case xe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function d1(e,t,n){let i=e.getShaderParameter(t,e.COMPILE_STATUS),s=(e.getShaderInfoLog(t)||"").trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return n.toUpperCase()+`

`+s+`

`+P3(e.getShaderSource(t),o)}else return s}function z3(e,t){let n=B3(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function F3(e,t){let n;switch(t){case Cb:n="Linear";break;case Rb:n="Reinhard";break;case Db:n="Cineon";break;case Ub:n="ACESFilmic";break;case Lb:n="AgX";break;case Ob:n="Neutral";break;case Nb:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}var Fd=new L;function H3(){re.getLuminanceCoefficients(Fd);let e=Fd.x.toFixed(4),t=Fd.y.toFixed(4),n=Fd.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function V3(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Yc).join(`
`)}function G3(e){let t=[];for(let n in e){let i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function k3(e,t){let n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){let s=e.getActiveAttrib(t,a),r=s.name,o=1;s.type===e.FLOAT_MAT2&&(o=2),s.type===e.FLOAT_MAT3&&(o=3),s.type===e.FLOAT_MAT4&&(o=4),n[r]={type:s.type,location:e.getAttribLocation(t,r),locationSize:o}}return n}function Yc(e){return e!==""}function p1(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function m1(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var X3=/^[ \t]*#include +<([\w\d./]+)>/gm;function hv(e){return e.replace(X3,q3)}var W3=new Map;function q3(e,t){let n=Yt[t];if(n===void 0){let i=W3.get(t);if(i!==void 0)n=Yt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return hv(n)}var Y3=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function g1(e){return e.replace(Y3,Z3)}function Z3(e,t,n,i){let a="";for(let s=parseInt(t);s<parseInt(n);s++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return a}function v1(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function J3(e){let t="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===I0?t="SHADOWMAP_TYPE_PCF":e.shadowMapType===ub?t="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===aa&&(t="SHADOWMAP_TYPE_VSM"),t}function K3(e){let t="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case _r:case yr:t="ENVMAP_TYPE_CUBE";break;case Hc:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Q3(e){let t="ENVMAP_MODE_REFLECTION";return e.envMap&&e.envMapMode===yr&&(t="ENVMAP_MODE_REFRACTION"),t}function j3(e){let t="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case z0:t="ENVMAP_BLENDING_MULTIPLY";break;case Ab:t="ENVMAP_BLENDING_MIX";break;case wb:t="ENVMAP_BLENDING_ADD";break}return t}function $3(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function tD(e,t,n,i){let a=e.getContext(),s=n.defines,r=n.vertexShader,o=n.fragmentShader,l=J3(n),c=K3(n),u=Q3(n),d=j3(n),f=$3(n),p=V3(n),g=G3(s),x=a.createProgram(),m,h,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(Yc).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(Yc).join(`
`),h.length>0&&(h+=`
`)):(m=[v1(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Yc).join(`
`),h=[v1(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Ia?"#define TONE_MAPPING":"",n.toneMapping!==Ia?Yt.tonemapping_pars_fragment:"",n.toneMapping!==Ia?F3("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Yt.colorspace_pars_fragment,z3("linearToOutputTexel",n.outputColorSpace),H3(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Yc).join(`
`)),r=hv(r),r=p1(r,n),r=m1(r,n),o=hv(o),o=p1(o,n),o=m1(o,n),r=g1(r),o=g1(o),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",n.glslVersion===J0?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===J0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);let _=v+m+r,y=v+h+o,T=h1(a,a.VERTEX_SHADER,_),C=h1(a,a.FRAGMENT_SHADER,y);a.attachShader(x,T),a.attachShader(x,C),n.index0AttributeName!==void 0?a.bindAttribLocation(x,0,n.index0AttributeName):n.morphTargets===!0&&a.bindAttribLocation(x,0,"position"),a.linkProgram(x);function w(U){if(e.debug.checkShaderErrors){let B=a.getProgramInfoLog(x)||"",G=a.getShaderInfoLog(T)||"",W=a.getShaderInfoLog(C)||"",Q=B.trim(),Y=G.trim(),at=W.trim(),k=!0,ct=!0;if(a.getProgramParameter(x,a.LINK_STATUS)===!1)if(k=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(a,x,T,C);else{let pt=d1(a,T,"vertex"),bt=d1(a,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(x,a.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+Q+`
`+pt+`
`+bt)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(Y===""||at==="")&&(ct=!1);ct&&(U.diagnostics={runnable:k,programLog:Q,vertexShader:{log:Y,prefix:m},fragmentShader:{log:at,prefix:h}})}a.deleteShader(T),a.deleteShader(C),R=new jo(a,x),E=k3(a,x)}let R;this.getUniforms=function(){return R===void 0&&w(this),R};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let S=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=a.getProgramParameter(x,O3)),S},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(x),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=I3++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=C,this}var eD=0,fv=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let n=t.vertexShader,i=t.fragmentShader,a=this._getShaderStage(n),s=this._getShaderStage(i),r=this._getShaderCacheForMaterial(t);return r.has(a)===!1&&(r.add(a),a.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(t){let n=this.materialCache.get(t);for(let i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let n=this.materialCache,i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){let n=this.shaderCache,i=n.get(t);return i===void 0&&(i=new dv(t),n.set(t,i)),i}},dv=class{constructor(t){this.id=eD++,this.code=t,this.usedTimes=0}};function nD(e,t,n,i,a,s,r){let o=new Mc,l=new fv,c=new Set,u=[],d=a.logarithmicDepthBuffer,f=a.vertexTextures,p=a.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(E){return c.add(E),E===0?"uv":`uv${E}`}function m(E,S,U,B,G){let W=B.fog,Q=G.geometry,Y=E.isMeshStandardMaterial?B.environment:null,at=(E.isMeshStandardMaterial?n:t).get(E.envMap||Y),k=at&&at.mapping===Hc?at.image.height:null,ct=g[E.type];E.precision!==null&&(p=a.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));let pt=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,bt=pt!==void 0?pt.length:0,qt=0;Q.morphAttributes.position!==void 0&&(qt=1),Q.morphAttributes.normal!==void 0&&(qt=2),Q.morphAttributes.color!==void 0&&(qt=3);let Zt,ce,Ot,K;if(ct){let ie=oa[ct];Zt=ie.vertexShader,ce=ie.fragmentShader}else Zt=E.vertexShader,ce=E.fragmentShader,l.update(E),Ot=l.getVertexShaderID(E),K=l.getFragmentShaderID(E);let q=e.getRenderTarget(),yt=e.state.buffers.depth.getReversed(),Rt=G.isInstancedMesh===!0,gt=G.isBatchedMesh===!0,Pt=!!E.map,Se=!!E.matcap,D=!!at,me=!!E.aoMap,Bt=!!E.lightMap,Dt=!!E.bumpMap,mt=!!E.normalMap,ge=!!E.displacementMap,xt=!!E.emissiveMap,Gt=!!E.metalnessMap,ze=!!E.roughnessMap,Re=E.anisotropy>0,A=E.clearcoat>0,M=E.dispersion>0,P=E.iridescence>0,Z=E.sheen>0,$=E.transmission>0,X=Re&&!!E.anisotropyMap,Mt=A&&!!E.clearcoatMap,st=A&&!!E.clearcoatNormalMap,Et=A&&!!E.clearcoatRoughnessMap,_t=P&&!!E.iridescenceMap,nt=P&&!!E.iridescenceThicknessMap,dt=Z&&!!E.sheenColorMap,Ct=Z&&!!E.sheenRoughnessMap,At=!!E.specularMap,lt=!!E.specularColorMap,kt=!!E.specularIntensityMap,N=$&&!!E.transmissionMap,it=$&&!!E.thicknessMap,rt=!!E.gradientMap,vt=!!E.alphaMap,tt=E.alphaTest>0,j=!!E.alphaHash,Tt=!!E.extensions,zt=Ia;E.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(zt=e.toneMapping);let ne={shaderID:ct,shaderType:E.type,shaderName:E.name,vertexShader:Zt,fragmentShader:ce,defines:E.defines,customVertexShaderID:Ot,customFragmentShaderID:K,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:gt,batchingColor:gt&&G._colorsTexture!==null,instancing:Rt,instancingColor:Rt&&G.instanceColor!==null,instancingMorph:Rt&&G.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:q===null?e.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:na,alphaToCoverage:!!E.alphaToCoverage,map:Pt,matcap:Se,envMap:D,envMapMode:D&&at.mapping,envMapCubeUVHeight:k,aoMap:me,lightMap:Bt,bumpMap:Dt,normalMap:mt,displacementMap:f&&ge,emissiveMap:xt,normalMapObjectSpace:mt&&E.normalMapType===Fb,normalMapTangentSpace:mt&&E.normalMapType===zb,metalnessMap:Gt,roughnessMap:ze,anisotropy:Re,anisotropyMap:X,clearcoat:A,clearcoatMap:Mt,clearcoatNormalMap:st,clearcoatRoughnessMap:Et,dispersion:M,iridescence:P,iridescenceMap:_t,iridescenceThicknessMap:nt,sheen:Z,sheenColorMap:dt,sheenRoughnessMap:Ct,specularMap:At,specularColorMap:lt,specularIntensityMap:kt,transmission:$,transmissionMap:N,thicknessMap:it,gradientMap:rt,opaque:E.transparent===!1&&E.blending===Na&&E.alphaToCoverage===!1,alphaMap:vt,alphaTest:tt,alphaHash:j,combine:E.combine,mapUv:Pt&&x(E.map.channel),aoMapUv:me&&x(E.aoMap.channel),lightMapUv:Bt&&x(E.lightMap.channel),bumpMapUv:Dt&&x(E.bumpMap.channel),normalMapUv:mt&&x(E.normalMap.channel),displacementMapUv:ge&&x(E.displacementMap.channel),emissiveMapUv:xt&&x(E.emissiveMap.channel),metalnessMapUv:Gt&&x(E.metalnessMap.channel),roughnessMapUv:ze&&x(E.roughnessMap.channel),anisotropyMapUv:X&&x(E.anisotropyMap.channel),clearcoatMapUv:Mt&&x(E.clearcoatMap.channel),clearcoatNormalMapUv:st&&x(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Et&&x(E.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&x(E.iridescenceMap.channel),iridescenceThicknessMapUv:nt&&x(E.iridescenceThicknessMap.channel),sheenColorMapUv:dt&&x(E.sheenColorMap.channel),sheenRoughnessMapUv:Ct&&x(E.sheenRoughnessMap.channel),specularMapUv:At&&x(E.specularMap.channel),specularColorMapUv:lt&&x(E.specularColorMap.channel),specularIntensityMapUv:kt&&x(E.specularIntensityMap.channel),transmissionMapUv:N&&x(E.transmissionMap.channel),thicknessMapUv:it&&x(E.thicknessMap.channel),alphaMapUv:vt&&x(E.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(mt||Re),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!Q.attributes.uv&&(Pt||vt),fog:!!W,useFog:E.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:yt,skinning:G.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:bt,morphTextureStride:qt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:E.dithering,shadowMapEnabled:e.shadowMap.enabled&&U.length>0,shadowMapType:e.shadowMap.type,toneMapping:zt,decodeVideoTexture:Pt&&E.map.isVideoTexture===!0&&re.getTransfer(E.map.colorSpace)===xe,decodeVideoTextureEmissive:xt&&E.emissiveMap.isVideoTexture===!0&&re.getTransfer(E.emissiveMap.colorSpace)===xe,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===sa,flipSided:E.side===wn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Tt&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Tt&&E.extensions.multiDraw===!0||gt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return ne.vertexUv1s=c.has(1),ne.vertexUv2s=c.has(2),ne.vertexUv3s=c.has(3),c.clear(),ne}function h(E){let S=[];if(E.shaderID?S.push(E.shaderID):(S.push(E.customVertexShaderID),S.push(E.customFragmentShaderID)),E.defines!==void 0)for(let U in E.defines)S.push(U),S.push(E.defines[U]);return E.isRawShaderMaterial===!1&&(v(S,E),_(S,E),S.push(e.outputColorSpace)),S.push(E.customProgramCacheKey),S.join()}function v(E,S){E.push(S.precision),E.push(S.outputColorSpace),E.push(S.envMapMode),E.push(S.envMapCubeUVHeight),E.push(S.mapUv),E.push(S.alphaMapUv),E.push(S.lightMapUv),E.push(S.aoMapUv),E.push(S.bumpMapUv),E.push(S.normalMapUv),E.push(S.displacementMapUv),E.push(S.emissiveMapUv),E.push(S.metalnessMapUv),E.push(S.roughnessMapUv),E.push(S.anisotropyMapUv),E.push(S.clearcoatMapUv),E.push(S.clearcoatNormalMapUv),E.push(S.clearcoatRoughnessMapUv),E.push(S.iridescenceMapUv),E.push(S.iridescenceThicknessMapUv),E.push(S.sheenColorMapUv),E.push(S.sheenRoughnessMapUv),E.push(S.specularMapUv),E.push(S.specularColorMapUv),E.push(S.specularIntensityMapUv),E.push(S.transmissionMapUv),E.push(S.thicknessMapUv),E.push(S.combine),E.push(S.fogExp2),E.push(S.sizeAttenuation),E.push(S.morphTargetsCount),E.push(S.morphAttributeCount),E.push(S.numDirLights),E.push(S.numPointLights),E.push(S.numSpotLights),E.push(S.numSpotLightMaps),E.push(S.numHemiLights),E.push(S.numRectAreaLights),E.push(S.numDirLightShadows),E.push(S.numPointLightShadows),E.push(S.numSpotLightShadows),E.push(S.numSpotLightShadowsWithMaps),E.push(S.numLightProbes),E.push(S.shadowMapType),E.push(S.toneMapping),E.push(S.numClippingPlanes),E.push(S.numClipIntersection),E.push(S.depthPacking)}function _(E,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),S.gradientMap&&o.enable(22),E.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),E.push(o.mask)}function y(E){let S=g[E.type],U;if(S){let B=oa[S];U=Kb.clone(B.uniforms)}else U=E.uniforms;return U}function T(E,S){let U;for(let B=0,G=u.length;B<G;B++){let W=u[B];if(W.cacheKey===S){U=W,++U.usedTimes;break}}return U===void 0&&(U=new tD(e,S,E,s),u.push(U)),U}function C(E){if(--E.usedTimes===0){let S=u.indexOf(E);u[S]=u[u.length-1],u.pop(),E.destroy()}}function w(E){l.remove(E)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:y,acquireProgram:T,releaseProgram:C,releaseShaderCache:w,programs:u,dispose:R}}function iD(){let e=new WeakMap;function t(r){return e.has(r)}function n(r){let o=e.get(r);return o===void 0&&(o={},e.set(r,o)),o}function i(r){e.delete(r)}function a(r,o,l){e.get(r)[o]=l}function s(){e=new WeakMap}return{has:t,get:n,remove:i,update:a,dispose:s}}function aD(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.z!==t.z?e.z-t.z:e.id-t.id}function _1(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function y1(){let e=[],t=0,n=[],i=[],a=[];function s(){t=0,n.length=0,i.length=0,a.length=0}function r(d,f,p,g,x,m){let h=e[t];return h===void 0?(h={id:d.id,object:d,geometry:f,material:p,groupOrder:g,renderOrder:d.renderOrder,z:x,group:m},e[t]=h):(h.id=d.id,h.object=d,h.geometry=f,h.material=p,h.groupOrder=g,h.renderOrder=d.renderOrder,h.z=x,h.group=m),t++,h}function o(d,f,p,g,x,m){let h=r(d,f,p,g,x,m);p.transmission>0?i.push(h):p.transparent===!0?a.push(h):n.push(h)}function l(d,f,p,g,x,m){let h=r(d,f,p,g,x,m);p.transmission>0?i.unshift(h):p.transparent===!0?a.unshift(h):n.unshift(h)}function c(d,f){n.length>1&&n.sort(d||aD),i.length>1&&i.sort(f||_1),a.length>1&&a.sort(f||_1)}function u(){for(let d=t,f=e.length;d<f;d++){let p=e[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:a,init:s,push:o,unshift:l,finish:u,sort:c}}function sD(){let e=new WeakMap;function t(i,a){let s=e.get(i),r;return s===void 0?(r=new y1,e.set(i,[r])):a>=s.length?(r=new y1,s.push(r)):r=s[a],r}function n(){e=new WeakMap}return{get:t,dispose:n}}function rD(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new L,color:new ae};break;case"SpotLight":n={position:new L,direction:new L,color:new ae,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new L,color:new ae,distance:0,decay:0};break;case"HemisphereLight":n={direction:new L,skyColor:new ae,groundColor:new ae};break;case"RectAreaLight":n={color:new ae,position:new L,halfWidth:new L,halfHeight:new L};break}return e[t.id]=n,n}}}function oD(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var lD=0;function cD(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function uD(e){let t=new rD,n=oD(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);let a=new L,s=new Ve,r=new Ve;function o(c){let u=0,d=0,f=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let p=0,g=0,x=0,m=0,h=0,v=0,_=0,y=0,T=0,C=0,w=0;c.sort(cD);for(let E=0,S=c.length;E<S;E++){let U=c[E],B=U.color,G=U.intensity,W=U.distance,Q=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)u+=B.r*G,d+=B.g*G,f+=B.b*G;else if(U.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(U.sh.coefficients[Y],G);w++}else if(U.isDirectionalLight){let Y=t.get(U);if(Y.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let at=U.shadow,k=n.get(U);k.shadowIntensity=at.intensity,k.shadowBias=at.bias,k.shadowNormalBias=at.normalBias,k.shadowRadius=at.radius,k.shadowMapSize=at.mapSize,i.directionalShadow[p]=k,i.directionalShadowMap[p]=Q,i.directionalShadowMatrix[p]=U.shadow.matrix,v++}i.directional[p]=Y,p++}else if(U.isSpotLight){let Y=t.get(U);Y.position.setFromMatrixPosition(U.matrixWorld),Y.color.copy(B).multiplyScalar(G),Y.distance=W,Y.coneCos=Math.cos(U.angle),Y.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),Y.decay=U.decay,i.spot[x]=Y;let at=U.shadow;if(U.map&&(i.spotLightMap[T]=U.map,T++,at.updateMatrices(U),U.castShadow&&C++),i.spotLightMatrix[x]=at.matrix,U.castShadow){let k=n.get(U);k.shadowIntensity=at.intensity,k.shadowBias=at.bias,k.shadowNormalBias=at.normalBias,k.shadowRadius=at.radius,k.shadowMapSize=at.mapSize,i.spotShadow[x]=k,i.spotShadowMap[x]=Q,y++}x++}else if(U.isRectAreaLight){let Y=t.get(U);Y.color.copy(B).multiplyScalar(G),Y.halfWidth.set(U.width*.5,0,0),Y.halfHeight.set(0,U.height*.5,0),i.rectArea[m]=Y,m++}else if(U.isPointLight){let Y=t.get(U);if(Y.color.copy(U.color).multiplyScalar(U.intensity),Y.distance=U.distance,Y.decay=U.decay,U.castShadow){let at=U.shadow,k=n.get(U);k.shadowIntensity=at.intensity,k.shadowBias=at.bias,k.shadowNormalBias=at.normalBias,k.shadowRadius=at.radius,k.shadowMapSize=at.mapSize,k.shadowCameraNear=at.camera.near,k.shadowCameraFar=at.camera.far,i.pointShadow[g]=k,i.pointShadowMap[g]=Q,i.pointShadowMatrix[g]=U.shadow.matrix,_++}i.point[g]=Y,g++}else if(U.isHemisphereLight){let Y=t.get(U);Y.skyColor.copy(U.color).multiplyScalar(G),Y.groundColor.copy(U.groundColor).multiplyScalar(G),i.hemi[h]=Y,h++}}m>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ft.LTC_FLOAT_1,i.rectAreaLTC2=ft.LTC_FLOAT_2):(i.rectAreaLTC1=ft.LTC_HALF_1,i.rectAreaLTC2=ft.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;let R=i.hash;(R.directionalLength!==p||R.pointLength!==g||R.spotLength!==x||R.rectAreaLength!==m||R.hemiLength!==h||R.numDirectionalShadows!==v||R.numPointShadows!==_||R.numSpotShadows!==y||R.numSpotMaps!==T||R.numLightProbes!==w)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=m,i.point.length=g,i.hemi.length=h,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=y+T-C,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=w,R.directionalLength=p,R.pointLength=g,R.spotLength=x,R.rectAreaLength=m,R.hemiLength=h,R.numDirectionalShadows=v,R.numPointShadows=_,R.numSpotShadows=y,R.numSpotMaps=T,R.numLightProbes=w,i.version=lD++)}function l(c,u){let d=0,f=0,p=0,g=0,x=0,m=u.matrixWorldInverse;for(let h=0,v=c.length;h<v;h++){let _=c[h];if(_.isDirectionalLight){let y=i.directional[d];y.direction.setFromMatrixPosition(_.matrixWorld),a.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(a),y.direction.transformDirection(m),d++}else if(_.isSpotLight){let y=i.spot[p];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(_.matrixWorld),a.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(a),y.direction.transformDirection(m),p++}else if(_.isRectAreaLight){let y=i.rectArea[g];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),r.identity(),s.copy(_.matrixWorld),s.premultiply(m),r.extractRotation(s),y.halfWidth.set(_.width*.5,0,0),y.halfHeight.set(0,_.height*.5,0),y.halfWidth.applyMatrix4(r),y.halfHeight.applyMatrix4(r),g++}else if(_.isPointLight){let y=i.point[f];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),f++}else if(_.isHemisphereLight){let y=i.hemi[x];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(m),x++}}}return{setup:o,setupView:l,state:i}}function x1(e){let t=new uD(e),n=[],i=[];function a(u){c.camera=u,n.length=0,i.length=0}function s(u){n.push(u)}function r(u){i.push(u)}function o(){t.setup(n)}function l(u){t.setupView(n,u)}let c={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:a,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:r}}function hD(e){let t=new WeakMap;function n(a,s=0){let r=t.get(a),o;return r===void 0?(o=new x1(e),t.set(a,[o])):s>=r.length?(o=new x1(e),r.push(o)):o=r[s],o}function i(){t=new WeakMap}return{get:n,dispose:i}}var fD=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dD=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function pD(e,t,n){let i=new Cc,a=new Ut,s=new Ut,r=new Le,o=new Of({depthPacking:Bb}),l=new If,c={},u=n.maxTextureSize,d={[Ua]:wn,[wn]:Ua,[sa]:sa},f=new zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ut},radius:{value:4}},vertexShader:fD,fragmentShader:dD}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let g=new Bn;g.setAttribute("position",new an(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new dn(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=I0;let h=this.type;this.render=function(C,w,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;let E=e.getRenderTarget(),S=e.getActiveCubeFace(),U=e.getActiveMipmapLevel(),B=e.state;B.setBlending(Bi),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let G=h!==aa&&this.type===aa,W=h===aa&&this.type!==aa;for(let Q=0,Y=C.length;Q<Y;Q++){let at=C[Q],k=at.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",at,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;a.copy(k.mapSize);let ct=k.getFrameExtents();if(a.multiply(ct),s.copy(k.mapSize),(a.x>u||a.y>u)&&(a.x>u&&(s.x=Math.floor(u/ct.x),a.x=s.x*ct.x,k.mapSize.x=s.x),a.y>u&&(s.y=Math.floor(u/ct.y),a.y=s.y*ct.y,k.mapSize.y=s.y)),k.map===null||G===!0||W===!0){let bt=this.type!==aa?{minFilter:yi,magFilter:yi}:{};k.map!==null&&k.map.dispose(),k.map=new xi(a.x,a.y,bt),k.map.texture.name=at.name+".shadowMap",k.camera.updateProjectionMatrix()}e.setRenderTarget(k.map),e.clear();let pt=k.getViewportCount();for(let bt=0;bt<pt;bt++){let qt=k.getViewport(bt);r.set(s.x*qt.x,s.y*qt.y,s.x*qt.z,s.y*qt.w),B.viewport(r),k.updateMatrices(at,bt),i=k.getFrustum(),y(w,R,k.camera,at,this.type)}k.isPointLightShadow!==!0&&this.type===aa&&v(k,R),k.needsUpdate=!1}h=this.type,m.needsUpdate=!1,e.setRenderTarget(E,S,U)};function v(C,w){let R=t.update(x);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new xi(a.x,a.y)),f.uniforms.shadow_pass.value=C.map.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,e.setRenderTarget(C.mapPass),e.clear(),e.renderBufferDirect(w,null,R,f,x,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,e.setRenderTarget(C.map),e.clear(),e.renderBufferDirect(w,null,R,p,x,null)}function _(C,w,R,E){let S=null,U=R.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(U!==void 0)S=U;else if(S=R.isPointLight===!0?l:o,e.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){let B=S.uuid,G=w.uuid,W=c[B];W===void 0&&(W={},c[B]=W);let Q=W[G];Q===void 0&&(Q=S.clone(),W[G]=Q,w.addEventListener("dispose",T)),S=Q}if(S.visible=w.visible,S.wireframe=w.wireframe,E===aa?S.side=w.shadowSide!==null?w.shadowSide:w.side:S.side=w.shadowSide!==null?w.shadowSide:d[w.side],S.alphaMap=w.alphaMap,S.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,S.map=w.map,S.clipShadows=w.clipShadows,S.clippingPlanes=w.clippingPlanes,S.clipIntersection=w.clipIntersection,S.displacementMap=w.displacementMap,S.displacementScale=w.displacementScale,S.displacementBias=w.displacementBias,S.wireframeLinewidth=w.wireframeLinewidth,S.linewidth=w.linewidth,R.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let B=e.properties.get(S);B.light=R}return S}function y(C,w,R,E,S){if(C.visible===!1)return;if(C.layers.test(w.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&S===aa)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,C.matrixWorld);let G=t.update(C),W=C.material;if(Array.isArray(W)){let Q=G.groups;for(let Y=0,at=Q.length;Y<at;Y++){let k=Q[Y],ct=W[k.materialIndex];if(ct&&ct.visible){let pt=_(C,ct,E,S);C.onBeforeShadow(e,C,w,R,G,pt,k),e.renderBufferDirect(R,null,G,pt,C,k),C.onAfterShadow(e,C,w,R,G,pt,k)}}}else if(W.visible){let Q=_(C,W,E,S);C.onBeforeShadow(e,C,w,R,G,Q,null),e.renderBufferDirect(R,null,G,Q,C,null),C.onAfterShadow(e,C,w,R,G,Q,null)}}let B=C.children;for(let G=0,W=B.length;G<W;G++)y(B[G],w,R,E,S)}function T(C){C.target.removeEventListener("dispose",T);for(let R in c){let E=c[R],S=C.target.uuid;S in E&&(E[S].dispose(),delete E[S])}}}var mD={[Yf]:Zf,[Jf]:jf,[Kf]:$f,[mr]:Qf,[Zf]:Yf,[jf]:Jf,[$f]:Kf,[Qf]:mr};function gD(e,t){function n(){let N=!1,it=new Le,rt=null,vt=new Le(0,0,0,0);return{setMask:function(tt){rt!==tt&&!N&&(e.colorMask(tt,tt,tt,tt),rt=tt)},setLocked:function(tt){N=tt},setClear:function(tt,j,Tt,zt,ne){ne===!0&&(tt*=zt,j*=zt,Tt*=zt),it.set(tt,j,Tt,zt),vt.equals(it)===!1&&(e.clearColor(tt,j,Tt,zt),vt.copy(it))},reset:function(){N=!1,rt=null,vt.set(-1,0,0,0)}}}function i(){let N=!1,it=!1,rt=null,vt=null,tt=null;return{setReversed:function(j){if(it!==j){let Tt=t.get("EXT_clip_control");j?Tt.clipControlEXT(Tt.LOWER_LEFT_EXT,Tt.ZERO_TO_ONE_EXT):Tt.clipControlEXT(Tt.LOWER_LEFT_EXT,Tt.NEGATIVE_ONE_TO_ONE_EXT),it=j;let zt=tt;tt=null,this.setClear(zt)}},getReversed:function(){return it},setTest:function(j){j?q(e.DEPTH_TEST):yt(e.DEPTH_TEST)},setMask:function(j){rt!==j&&!N&&(e.depthMask(j),rt=j)},setFunc:function(j){if(it&&(j=mD[j]),vt!==j){switch(j){case Yf:e.depthFunc(e.NEVER);break;case Zf:e.depthFunc(e.ALWAYS);break;case Jf:e.depthFunc(e.LESS);break;case mr:e.depthFunc(e.LEQUAL);break;case Kf:e.depthFunc(e.EQUAL);break;case Qf:e.depthFunc(e.GEQUAL);break;case jf:e.depthFunc(e.GREATER);break;case $f:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}vt=j}},setLocked:function(j){N=j},setClear:function(j){tt!==j&&(it&&(j=1-j),e.clearDepth(j),tt=j)},reset:function(){N=!1,rt=null,vt=null,tt=null,it=!1}}}function a(){let N=!1,it=null,rt=null,vt=null,tt=null,j=null,Tt=null,zt=null,ne=null;return{setTest:function(ie){N||(ie?q(e.STENCIL_TEST):yt(e.STENCIL_TEST))},setMask:function(ie){it!==ie&&!N&&(e.stencilMask(ie),it=ie)},setFunc:function(ie,ii,Fn){(rt!==ie||vt!==ii||tt!==Fn)&&(e.stencilFunc(ie,ii,Fn),rt=ie,vt=ii,tt=Fn)},setOp:function(ie,ii,Fn){(j!==ie||Tt!==ii||zt!==Fn)&&(e.stencilOp(ie,ii,Fn),j=ie,Tt=ii,zt=Fn)},setLocked:function(ie){N=ie},setClear:function(ie){ne!==ie&&(e.clearStencil(ie),ne=ie)},reset:function(){N=!1,it=null,rt=null,vt=null,tt=null,j=null,Tt=null,zt=null,ne=null}}}let s=new n,r=new i,o=new a,l=new WeakMap,c=new WeakMap,u={},d={},f=new WeakMap,p=[],g=null,x=!1,m=null,h=null,v=null,_=null,y=null,T=null,C=null,w=new ae(0,0,0),R=0,E=!1,S=null,U=null,B=null,G=null,W=null,Q=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,at=0,k=e.getParameter(e.VERSION);k.indexOf("WebGL")!==-1?(at=parseFloat(/^WebGL (\d)/.exec(k)[1]),Y=at>=1):k.indexOf("OpenGL ES")!==-1&&(at=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),Y=at>=2);let ct=null,pt={},bt=e.getParameter(e.SCISSOR_BOX),qt=e.getParameter(e.VIEWPORT),Zt=new Le().fromArray(bt),ce=new Le().fromArray(qt);function Ot(N,it,rt,vt){let tt=new Uint8Array(4),j=e.createTexture();e.bindTexture(N,j),e.texParameteri(N,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(N,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let Tt=0;Tt<rt;Tt++)N===e.TEXTURE_3D||N===e.TEXTURE_2D_ARRAY?e.texImage3D(it,0,e.RGBA,1,1,vt,0,e.RGBA,e.UNSIGNED_BYTE,tt):e.texImage2D(it+Tt,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,tt);return j}let K={};K[e.TEXTURE_2D]=Ot(e.TEXTURE_2D,e.TEXTURE_2D,1),K[e.TEXTURE_CUBE_MAP]=Ot(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[e.TEXTURE_2D_ARRAY]=Ot(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),K[e.TEXTURE_3D]=Ot(e.TEXTURE_3D,e.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),q(e.DEPTH_TEST),r.setFunc(mr),Dt(!1),mt(O0),q(e.CULL_FACE),me(Bi);function q(N){u[N]!==!0&&(e.enable(N),u[N]=!0)}function yt(N){u[N]!==!1&&(e.disable(N),u[N]=!1)}function Rt(N,it){return d[N]!==it?(e.bindFramebuffer(N,it),d[N]=it,N===e.DRAW_FRAMEBUFFER&&(d[e.FRAMEBUFFER]=it),N===e.FRAMEBUFFER&&(d[e.DRAW_FRAMEBUFFER]=it),!0):!1}function gt(N,it){let rt=p,vt=!1;if(N){rt=f.get(it),rt===void 0&&(rt=[],f.set(it,rt));let tt=N.textures;if(rt.length!==tt.length||rt[0]!==e.COLOR_ATTACHMENT0){for(let j=0,Tt=tt.length;j<Tt;j++)rt[j]=e.COLOR_ATTACHMENT0+j;rt.length=tt.length,vt=!0}}else rt[0]!==e.BACK&&(rt[0]=e.BACK,vt=!0);vt&&e.drawBuffers(rt)}function Pt(N){return g!==N?(e.useProgram(N),g=N,!0):!1}let Se={[Ms]:e.FUNC_ADD,[hb]:e.FUNC_SUBTRACT,[fb]:e.FUNC_REVERSE_SUBTRACT};Se[db]=e.MIN,Se[pb]=e.MAX;let D={[qf]:e.ZERO,[zi]:e.ONE,[mb]:e.SRC_COLOR,[df]:e.SRC_ALPHA,[Sb]:e.SRC_ALPHA_SATURATE,[yb]:e.DST_COLOR,[vb]:e.DST_ALPHA,[gb]:e.ONE_MINUS_SRC_COLOR,[pr]:e.ONE_MINUS_SRC_ALPHA,[xb]:e.ONE_MINUS_DST_COLOR,[_b]:e.ONE_MINUS_DST_ALPHA,[Mb]:e.CONSTANT_COLOR,[bb]:e.ONE_MINUS_CONSTANT_COLOR,[Eb]:e.CONSTANT_ALPHA,[Tb]:e.ONE_MINUS_CONSTANT_ALPHA};function me(N,it,rt,vt,tt,j,Tt,zt,ne,ie){if(N===Bi){x===!0&&(yt(e.BLEND),x=!1);return}if(x===!1&&(q(e.BLEND),x=!0),N!==Fc){if(N!==m||ie!==E){if((h!==Ms||y!==Ms)&&(e.blendEquation(e.FUNC_ADD),h=Ms,y=Ms),ie)switch(N){case Na:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case zc:e.blendFunc(e.ONE,e.ONE);break;case P0:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case B0:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Na:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case zc:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case P0:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case B0:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}v=null,_=null,T=null,C=null,w.set(0,0,0),R=0,m=N,E=ie}return}tt=tt||it,j=j||rt,Tt=Tt||vt,(it!==h||tt!==y)&&(e.blendEquationSeparate(Se[it],Se[tt]),h=it,y=tt),(rt!==v||vt!==_||j!==T||Tt!==C)&&(e.blendFuncSeparate(D[rt],D[vt],D[j],D[Tt]),v=rt,_=vt,T=j,C=Tt),(zt.equals(w)===!1||ne!==R)&&(e.blendColor(zt.r,zt.g,zt.b,ne),w.copy(zt),R=ne),m=N,E=!1}function Bt(N,it){N.side===sa?yt(e.CULL_FACE):q(e.CULL_FACE);let rt=N.side===wn;it&&(rt=!rt),Dt(rt),N.blending===Na&&N.transparent===!1?me(Bi):me(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),r.setFunc(N.depthFunc),r.setTest(N.depthTest),r.setMask(N.depthWrite),s.setMask(N.colorWrite);let vt=N.stencilWrite;o.setTest(vt),vt&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),xt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?q(e.SAMPLE_ALPHA_TO_COVERAGE):yt(e.SAMPLE_ALPHA_TO_COVERAGE)}function Dt(N){S!==N&&(N?e.frontFace(e.CW):e.frontFace(e.CCW),S=N)}function mt(N){N!==lb?(q(e.CULL_FACE),N!==U&&(N===O0?e.cullFace(e.BACK):N===cb?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):yt(e.CULL_FACE),U=N}function ge(N){N!==B&&(Y&&e.lineWidth(N),B=N)}function xt(N,it,rt){N?(q(e.POLYGON_OFFSET_FILL),(G!==it||W!==rt)&&(e.polygonOffset(it,rt),G=it,W=rt)):yt(e.POLYGON_OFFSET_FILL)}function Gt(N){N?q(e.SCISSOR_TEST):yt(e.SCISSOR_TEST)}function ze(N){N===void 0&&(N=e.TEXTURE0+Q-1),ct!==N&&(e.activeTexture(N),ct=N)}function Re(N,it,rt){rt===void 0&&(ct===null?rt=e.TEXTURE0+Q-1:rt=ct);let vt=pt[rt];vt===void 0&&(vt={type:void 0,texture:void 0},pt[rt]=vt),(vt.type!==N||vt.texture!==it)&&(ct!==rt&&(e.activeTexture(rt),ct=rt),e.bindTexture(N,it||K[N]),vt.type=N,vt.texture=it)}function A(){let N=pt[ct];N!==void 0&&N.type!==void 0&&(e.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function M(){try{e.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function P(){try{e.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Z(){try{e.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function $(){try{e.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function X(){try{e.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Mt(){try{e.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function st(){try{e.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Et(){try{e.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function _t(){try{e.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function nt(){try{e.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function dt(N){Zt.equals(N)===!1&&(e.scissor(N.x,N.y,N.z,N.w),Zt.copy(N))}function Ct(N){ce.equals(N)===!1&&(e.viewport(N.x,N.y,N.z,N.w),ce.copy(N))}function At(N,it){let rt=c.get(it);rt===void 0&&(rt=new WeakMap,c.set(it,rt));let vt=rt.get(N);vt===void 0&&(vt=e.getUniformBlockIndex(it,N.name),rt.set(N,vt))}function lt(N,it){let vt=c.get(it).get(N);l.get(it)!==vt&&(e.uniformBlockBinding(it,vt,N.__bindingPointIndex),l.set(it,vt))}function kt(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),r.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),u={},ct=null,pt={},d={},f=new WeakMap,p=[],g=null,x=!1,m=null,h=null,v=null,_=null,y=null,T=null,C=null,w=new ae(0,0,0),R=0,E=!1,S=null,U=null,B=null,G=null,W=null,Zt.set(0,0,e.canvas.width,e.canvas.height),ce.set(0,0,e.canvas.width,e.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:q,disable:yt,bindFramebuffer:Rt,drawBuffers:gt,useProgram:Pt,setBlending:me,setMaterial:Bt,setFlipSided:Dt,setCullFace:mt,setLineWidth:ge,setPolygonOffset:xt,setScissorTest:Gt,activeTexture:ze,bindTexture:Re,unbindTexture:A,compressedTexImage2D:M,compressedTexImage3D:P,texImage2D:_t,texImage3D:nt,updateUBOMapping:At,uniformBlockBinding:lt,texStorage2D:st,texStorage3D:Et,texSubImage2D:Z,texSubImage3D:$,compressedTexSubImage2D:X,compressedTexSubImage3D:Mt,scissor:dt,viewport:Ct,reset:kt}}function vD(e,t,n,i,a,s,r){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ut,u=new WeakMap,d,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,M){return p?new OffscreenCanvas(A,M):yc("canvas")}function x(A,M,P){let Z=1,$=Re(A);if(($.width>P||$.height>P)&&(Z=P/Math.max($.width,$.height)),Z<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let X=Math.floor(Z*$.width),Mt=Math.floor(Z*$.height);d===void 0&&(d=g(X,Mt));let st=M?g(X,Mt):d;return st.width=X,st.height=Mt,st.getContext("2d").drawImage(A,0,0,X,Mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+X+"x"+Mt+")."),st}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),A;return A}function m(A){return A.generateMipmaps}function h(A){e.generateMipmap(A)}function v(A){return A.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?e.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function _(A,M,P,Z,$=!1){if(A!==null){if(e[A]!==void 0)return e[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let X=M;if(M===e.RED&&(P===e.FLOAT&&(X=e.R32F),P===e.HALF_FLOAT&&(X=e.R16F),P===e.UNSIGNED_BYTE&&(X=e.R8)),M===e.RED_INTEGER&&(P===e.UNSIGNED_BYTE&&(X=e.R8UI),P===e.UNSIGNED_SHORT&&(X=e.R16UI),P===e.UNSIGNED_INT&&(X=e.R32UI),P===e.BYTE&&(X=e.R8I),P===e.SHORT&&(X=e.R16I),P===e.INT&&(X=e.R32I)),M===e.RG&&(P===e.FLOAT&&(X=e.RG32F),P===e.HALF_FLOAT&&(X=e.RG16F),P===e.UNSIGNED_BYTE&&(X=e.RG8)),M===e.RG_INTEGER&&(P===e.UNSIGNED_BYTE&&(X=e.RG8UI),P===e.UNSIGNED_SHORT&&(X=e.RG16UI),P===e.UNSIGNED_INT&&(X=e.RG32UI),P===e.BYTE&&(X=e.RG8I),P===e.SHORT&&(X=e.RG16I),P===e.INT&&(X=e.RG32I)),M===e.RGB_INTEGER&&(P===e.UNSIGNED_BYTE&&(X=e.RGB8UI),P===e.UNSIGNED_SHORT&&(X=e.RGB16UI),P===e.UNSIGNED_INT&&(X=e.RGB32UI),P===e.BYTE&&(X=e.RGB8I),P===e.SHORT&&(X=e.RGB16I),P===e.INT&&(X=e.RGB32I)),M===e.RGBA_INTEGER&&(P===e.UNSIGNED_BYTE&&(X=e.RGBA8UI),P===e.UNSIGNED_SHORT&&(X=e.RGBA16UI),P===e.UNSIGNED_INT&&(X=e.RGBA32UI),P===e.BYTE&&(X=e.RGBA8I),P===e.SHORT&&(X=e.RGBA16I),P===e.INT&&(X=e.RGBA32I)),M===e.RGB&&(P===e.UNSIGNED_INT_5_9_9_9_REV&&(X=e.RGB9_E5),P===e.UNSIGNED_INT_10F_11F_11F_REV&&(X=e.R11F_G11F_B10F)),M===e.RGBA){let Mt=$?vc:re.getTransfer(Z);P===e.FLOAT&&(X=e.RGBA32F),P===e.HALF_FLOAT&&(X=e.RGBA16F),P===e.UNSIGNED_BYTE&&(X=Mt===xe?e.SRGB8_ALPHA8:e.RGBA8),P===e.UNSIGNED_SHORT_4_4_4_4&&(X=e.RGBA4),P===e.UNSIGNED_SHORT_5_5_5_1&&(X=e.RGB5_A1)}return(X===e.R16F||X===e.R32F||X===e.RG16F||X===e.RG32F||X===e.RGBA16F||X===e.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function y(A,M){let P;return A?M===null||M===Rs||M===Zo?P=e.DEPTH24_STENCIL8:M===ra?P=e.DEPTH32F_STENCIL8:M===Yo&&(P=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Rs||M===Zo?P=e.DEPTH_COMPONENT24:M===ra?P=e.DEPTH_COMPONENT32F:M===Yo&&(P=e.DEPTH_COMPONENT16),P}function T(A,M){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==yi&&A.minFilter!==Ii?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function C(A){let M=A.target;M.removeEventListener("dispose",C),R(M),M.isVideoTexture&&u.delete(M)}function w(A){let M=A.target;M.removeEventListener("dispose",w),S(M)}function R(A){let M=i.get(A);if(M.__webglInit===void 0)return;let P=A.source,Z=f.get(P);if(Z){let $=Z[M.__cacheKey];$.usedTimes--,$.usedTimes===0&&E(A),Object.keys(Z).length===0&&f.delete(P)}i.remove(A)}function E(A){let M=i.get(A);e.deleteTexture(M.__webglTexture);let P=A.source,Z=f.get(P);delete Z[M.__cacheKey],r.memory.textures--}function S(A){let M=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(M.__webglFramebuffer[Z]))for(let $=0;$<M.__webglFramebuffer[Z].length;$++)e.deleteFramebuffer(M.__webglFramebuffer[Z][$]);else e.deleteFramebuffer(M.__webglFramebuffer[Z]);M.__webglDepthbuffer&&e.deleteRenderbuffer(M.__webglDepthbuffer[Z])}else{if(Array.isArray(M.__webglFramebuffer))for(let Z=0;Z<M.__webglFramebuffer.length;Z++)e.deleteFramebuffer(M.__webglFramebuffer[Z]);else e.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&e.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&e.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let Z=0;Z<M.__webglColorRenderbuffer.length;Z++)M.__webglColorRenderbuffer[Z]&&e.deleteRenderbuffer(M.__webglColorRenderbuffer[Z]);M.__webglDepthRenderbuffer&&e.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let P=A.textures;for(let Z=0,$=P.length;Z<$;Z++){let X=i.get(P[Z]);X.__webglTexture&&(e.deleteTexture(X.__webglTexture),r.memory.textures--),i.remove(P[Z])}i.remove(A)}let U=0;function B(){U=0}function G(){let A=U;return A>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+a.maxTextures),U+=1,A}function W(A){let M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function Q(A,M){let P=i.get(A);if(A.isVideoTexture&&Gt(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&P.__version!==A.version){let Z=A.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(P,A,M);return}}else A.isExternalTexture&&(P.__webglTexture=A.sourceTexture?A.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,P.__webglTexture,e.TEXTURE0+M)}function Y(A,M){let P=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&P.__version!==A.version){K(P,A,M);return}n.bindTexture(e.TEXTURE_2D_ARRAY,P.__webglTexture,e.TEXTURE0+M)}function at(A,M){let P=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&P.__version!==A.version){K(P,A,M);return}n.bindTexture(e.TEXTURE_3D,P.__webglTexture,e.TEXTURE0+M)}function k(A,M){let P=i.get(A);if(A.version>0&&P.__version!==A.version){q(P,A,M);return}n.bindTexture(e.TEXTURE_CUBE_MAP,P.__webglTexture,e.TEXTURE0+M)}let ct={[pf]:e.REPEAT,[Ss]:e.CLAMP_TO_EDGE,[mf]:e.MIRRORED_REPEAT},pt={[yi]:e.NEAREST,[Ib]:e.NEAREST_MIPMAP_NEAREST,[Vc]:e.NEAREST_MIPMAP_LINEAR,[Ii]:e.LINEAR,[nd]:e.LINEAR_MIPMAP_NEAREST,[Cs]:e.LINEAR_MIPMAP_LINEAR},bt={[Hb]:e.NEVER,[qb]:e.ALWAYS,[Vb]:e.LESS,[Z0]:e.LEQUAL,[Gb]:e.EQUAL,[Wb]:e.GEQUAL,[kb]:e.GREATER,[Xb]:e.NOTEQUAL};function qt(A,M){if(M.type===ra&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===Ii||M.magFilter===nd||M.magFilter===Vc||M.magFilter===Cs||M.minFilter===Ii||M.minFilter===nd||M.minFilter===Vc||M.minFilter===Cs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(A,e.TEXTURE_WRAP_S,ct[M.wrapS]),e.texParameteri(A,e.TEXTURE_WRAP_T,ct[M.wrapT]),(A===e.TEXTURE_3D||A===e.TEXTURE_2D_ARRAY)&&e.texParameteri(A,e.TEXTURE_WRAP_R,ct[M.wrapR]),e.texParameteri(A,e.TEXTURE_MAG_FILTER,pt[M.magFilter]),e.texParameteri(A,e.TEXTURE_MIN_FILTER,pt[M.minFilter]),M.compareFunction&&(e.texParameteri(A,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(A,e.TEXTURE_COMPARE_FUNC,bt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===yi||M.minFilter!==Vc&&M.minFilter!==Cs||M.type===ra&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){let P=t.get("EXT_texture_filter_anisotropic");e.texParameterf(A,P.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,a.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function Zt(A,M){let P=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",C));let Z=M.source,$=f.get(Z);$===void 0&&($={},f.set(Z,$));let X=W(M);if(X!==A.__cacheKey){$[X]===void 0&&($[X]={texture:e.createTexture(),usedTimes:0},r.memory.textures++,P=!0),$[X].usedTimes++;let Mt=$[A.__cacheKey];Mt!==void 0&&($[A.__cacheKey].usedTimes--,Mt.usedTimes===0&&E(M)),A.__cacheKey=X,A.__webglTexture=$[X].texture}return P}function ce(A,M,P){return Math.floor(Math.floor(A/P)/M)}function Ot(A,M,P,Z){let X=A.updateRanges;if(X.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,M.width,M.height,P,Z,M.data);else{X.sort((nt,dt)=>nt.start-dt.start);let Mt=0;for(let nt=1;nt<X.length;nt++){let dt=X[Mt],Ct=X[nt],At=dt.start+dt.count,lt=ce(Ct.start,M.width,4),kt=ce(dt.start,M.width,4);Ct.start<=At+1&&lt===kt&&ce(Ct.start+Ct.count-1,M.width,4)===lt?dt.count=Math.max(dt.count,Ct.start+Ct.count-dt.start):(++Mt,X[Mt]=Ct)}X.length=Mt+1;let st=e.getParameter(e.UNPACK_ROW_LENGTH),Et=e.getParameter(e.UNPACK_SKIP_PIXELS),_t=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,M.width);for(let nt=0,dt=X.length;nt<dt;nt++){let Ct=X[nt],At=Math.floor(Ct.start/4),lt=Math.ceil(Ct.count/4),kt=At%M.width,N=Math.floor(At/M.width),it=lt,rt=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,kt),e.pixelStorei(e.UNPACK_SKIP_ROWS,N),n.texSubImage2D(e.TEXTURE_2D,0,kt,N,it,rt,P,Z,M.data)}A.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,st),e.pixelStorei(e.UNPACK_SKIP_PIXELS,Et),e.pixelStorei(e.UNPACK_SKIP_ROWS,_t)}}function K(A,M,P){let Z=e.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Z=e.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Z=e.TEXTURE_3D);let $=Zt(A,M),X=M.source;n.bindTexture(Z,A.__webglTexture,e.TEXTURE0+P);let Mt=i.get(X);if(X.version!==Mt.__version||$===!0){n.activeTexture(e.TEXTURE0+P);let st=re.getPrimaries(re.workingColorSpace),Et=M.colorSpace===Pa?null:re.getPrimaries(M.colorSpace),_t=M.colorSpace===Pa||st===Et?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,M.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);let nt=x(M.image,!1,a.maxTextureSize);nt=ze(M,nt);let dt=s.convert(M.format,M.colorSpace),Ct=s.convert(M.type),At=_(M.internalFormat,dt,Ct,M.colorSpace,M.isVideoTexture);qt(Z,M);let lt,kt=M.mipmaps,N=M.isVideoTexture!==!0,it=Mt.__version===void 0||$===!0,rt=X.dataReady,vt=T(M,nt);if(M.isDepthTexture)At=y(M.format===Jo,M.type),it&&(N?n.texStorage2D(e.TEXTURE_2D,1,At,nt.width,nt.height):n.texImage2D(e.TEXTURE_2D,0,At,nt.width,nt.height,0,dt,Ct,null));else if(M.isDataTexture)if(kt.length>0){N&&it&&n.texStorage2D(e.TEXTURE_2D,vt,At,kt[0].width,kt[0].height);for(let tt=0,j=kt.length;tt<j;tt++)lt=kt[tt],N?rt&&n.texSubImage2D(e.TEXTURE_2D,tt,0,0,lt.width,lt.height,dt,Ct,lt.data):n.texImage2D(e.TEXTURE_2D,tt,At,lt.width,lt.height,0,dt,Ct,lt.data);M.generateMipmaps=!1}else N?(it&&n.texStorage2D(e.TEXTURE_2D,vt,At,nt.width,nt.height),rt&&Ot(M,nt,dt,Ct)):n.texImage2D(e.TEXTURE_2D,0,At,nt.width,nt.height,0,dt,Ct,nt.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){N&&it&&n.texStorage3D(e.TEXTURE_2D_ARRAY,vt,At,kt[0].width,kt[0].height,nt.depth);for(let tt=0,j=kt.length;tt<j;tt++)if(lt=kt[tt],M.format!==bi)if(dt!==null)if(N){if(rt)if(M.layerUpdates.size>0){let Tt=ev(lt.width,lt.height,M.format,M.type);for(let zt of M.layerUpdates){let ne=lt.data.subarray(zt*Tt/lt.data.BYTES_PER_ELEMENT,(zt+1)*Tt/lt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,tt,0,0,zt,lt.width,lt.height,1,dt,ne)}M.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,tt,0,0,0,lt.width,lt.height,nt.depth,dt,lt.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,tt,At,lt.width,lt.height,nt.depth,0,lt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?rt&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,tt,0,0,0,lt.width,lt.height,nt.depth,dt,Ct,lt.data):n.texImage3D(e.TEXTURE_2D_ARRAY,tt,At,lt.width,lt.height,nt.depth,0,dt,Ct,lt.data)}else{N&&it&&n.texStorage2D(e.TEXTURE_2D,vt,At,kt[0].width,kt[0].height);for(let tt=0,j=kt.length;tt<j;tt++)lt=kt[tt],M.format!==bi?dt!==null?N?rt&&n.compressedTexSubImage2D(e.TEXTURE_2D,tt,0,0,lt.width,lt.height,dt,lt.data):n.compressedTexImage2D(e.TEXTURE_2D,tt,At,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?rt&&n.texSubImage2D(e.TEXTURE_2D,tt,0,0,lt.width,lt.height,dt,Ct,lt.data):n.texImage2D(e.TEXTURE_2D,tt,At,lt.width,lt.height,0,dt,Ct,lt.data)}else if(M.isDataArrayTexture)if(N){if(it&&n.texStorage3D(e.TEXTURE_2D_ARRAY,vt,At,nt.width,nt.height,nt.depth),rt)if(M.layerUpdates.size>0){let tt=ev(nt.width,nt.height,M.format,M.type);for(let j of M.layerUpdates){let Tt=nt.data.subarray(j*tt/nt.data.BYTES_PER_ELEMENT,(j+1)*tt/nt.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,j,nt.width,nt.height,1,dt,Ct,Tt)}M.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,dt,Ct,nt.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,At,nt.width,nt.height,nt.depth,0,dt,Ct,nt.data);else if(M.isData3DTexture)N?(it&&n.texStorage3D(e.TEXTURE_3D,vt,At,nt.width,nt.height,nt.depth),rt&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,dt,Ct,nt.data)):n.texImage3D(e.TEXTURE_3D,0,At,nt.width,nt.height,nt.depth,0,dt,Ct,nt.data);else if(M.isFramebufferTexture){if(it)if(N)n.texStorage2D(e.TEXTURE_2D,vt,At,nt.width,nt.height);else{let tt=nt.width,j=nt.height;for(let Tt=0;Tt<vt;Tt++)n.texImage2D(e.TEXTURE_2D,Tt,At,tt,j,0,dt,Ct,null),tt>>=1,j>>=1}}else if(kt.length>0){if(N&&it){let tt=Re(kt[0]);n.texStorage2D(e.TEXTURE_2D,vt,At,tt.width,tt.height)}for(let tt=0,j=kt.length;tt<j;tt++)lt=kt[tt],N?rt&&n.texSubImage2D(e.TEXTURE_2D,tt,0,0,dt,Ct,lt):n.texImage2D(e.TEXTURE_2D,tt,At,dt,Ct,lt);M.generateMipmaps=!1}else if(N){if(it){let tt=Re(nt);n.texStorage2D(e.TEXTURE_2D,vt,At,tt.width,tt.height)}rt&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,dt,Ct,nt)}else n.texImage2D(e.TEXTURE_2D,0,At,dt,Ct,nt);m(M)&&h(Z),Mt.__version=X.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function q(A,M,P){if(M.image.length!==6)return;let Z=Zt(A,M),$=M.source;n.bindTexture(e.TEXTURE_CUBE_MAP,A.__webglTexture,e.TEXTURE0+P);let X=i.get($);if($.version!==X.__version||Z===!0){n.activeTexture(e.TEXTURE0+P);let Mt=re.getPrimaries(re.workingColorSpace),st=M.colorSpace===Pa?null:re.getPrimaries(M.colorSpace),Et=M.colorSpace===Pa||Mt===st?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,M.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);let _t=M.isCompressedTexture||M.image[0].isCompressedTexture,nt=M.image[0]&&M.image[0].isDataTexture,dt=[];for(let j=0;j<6;j++)!_t&&!nt?dt[j]=x(M.image[j],!0,a.maxCubemapSize):dt[j]=nt?M.image[j].image:M.image[j],dt[j]=ze(M,dt[j]);let Ct=dt[0],At=s.convert(M.format,M.colorSpace),lt=s.convert(M.type),kt=_(M.internalFormat,At,lt,M.colorSpace),N=M.isVideoTexture!==!0,it=X.__version===void 0||Z===!0,rt=$.dataReady,vt=T(M,Ct);qt(e.TEXTURE_CUBE_MAP,M);let tt;if(_t){N&&it&&n.texStorage2D(e.TEXTURE_CUBE_MAP,vt,kt,Ct.width,Ct.height);for(let j=0;j<6;j++){tt=dt[j].mipmaps;for(let Tt=0;Tt<tt.length;Tt++){let zt=tt[Tt];M.format!==bi?At!==null?N?rt&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,Tt,0,0,zt.width,zt.height,At,zt.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,Tt,kt,zt.width,zt.height,0,zt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?rt&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,Tt,0,0,zt.width,zt.height,At,lt,zt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,Tt,kt,zt.width,zt.height,0,At,lt,zt.data)}}}else{if(tt=M.mipmaps,N&&it){tt.length>0&&vt++;let j=Re(dt[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,vt,kt,j.width,j.height)}for(let j=0;j<6;j++)if(nt){N?rt&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,dt[j].width,dt[j].height,At,lt,dt[j].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,kt,dt[j].width,dt[j].height,0,At,lt,dt[j].data);for(let Tt=0;Tt<tt.length;Tt++){let ne=tt[Tt].image[j].image;N?rt&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,Tt+1,0,0,ne.width,ne.height,At,lt,ne.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,Tt+1,kt,ne.width,ne.height,0,At,lt,ne.data)}}else{N?rt&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,At,lt,dt[j]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,kt,At,lt,dt[j]);for(let Tt=0;Tt<tt.length;Tt++){let zt=tt[Tt];N?rt&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,Tt+1,0,0,At,lt,zt.image[j]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+j,Tt+1,kt,At,lt,zt.image[j])}}}m(M)&&h(e.TEXTURE_CUBE_MAP),X.__version=$.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function yt(A,M,P,Z,$,X){let Mt=s.convert(P.format,P.colorSpace),st=s.convert(P.type),Et=_(P.internalFormat,Mt,st,P.colorSpace),_t=i.get(M),nt=i.get(P);if(nt.__renderTarget=M,!_t.__hasExternalTextures){let dt=Math.max(1,M.width>>X),Ct=Math.max(1,M.height>>X);$===e.TEXTURE_3D||$===e.TEXTURE_2D_ARRAY?n.texImage3D($,X,Et,dt,Ct,M.depth,0,Mt,st,null):n.texImage2D($,X,Et,dt,Ct,0,Mt,st,null)}n.bindFramebuffer(e.FRAMEBUFFER,A),xt(M)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Z,$,nt.__webglTexture,0,ge(M)):($===e.TEXTURE_2D||$>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,Z,$,nt.__webglTexture,X),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Rt(A,M,P){if(e.bindRenderbuffer(e.RENDERBUFFER,A),M.depthBuffer){let Z=M.depthTexture,$=Z&&Z.isDepthTexture?Z.type:null,X=y(M.stencilBuffer,$),Mt=M.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,st=ge(M);xt(M)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,st,X,M.width,M.height):P?e.renderbufferStorageMultisample(e.RENDERBUFFER,st,X,M.width,M.height):e.renderbufferStorage(e.RENDERBUFFER,X,M.width,M.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,Mt,e.RENDERBUFFER,A)}else{let Z=M.textures;for(let $=0;$<Z.length;$++){let X=Z[$],Mt=s.convert(X.format,X.colorSpace),st=s.convert(X.type),Et=_(X.internalFormat,Mt,st,X.colorSpace),_t=ge(M);P&&xt(M)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,_t,Et,M.width,M.height):xt(M)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,_t,Et,M.width,M.height):e.renderbufferStorage(e.RENDERBUFFER,Et,M.width,M.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function gt(A,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(e.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Z=i.get(M.depthTexture);Z.__renderTarget=M,(!Z.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),Q(M.depthTexture,0);let $=Z.__webglTexture,X=ge(M);if(M.depthTexture.format===Fo)xt(M)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,$,0,X):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,$,0);else if(M.depthTexture.format===Jo)xt(M)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,$,0,X):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function Pt(A){let M=i.get(A),P=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){let Z=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),Z){let $=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,Z.removeEventListener("dispose",$)};Z.addEventListener("dispose",$),M.__depthDisposeCallback=$}M.__boundDepthTexture=Z}if(A.depthTexture&&!M.__autoAllocateDepthBuffer){if(P)throw new Error("target.depthTexture not supported in Cube render targets");let Z=A.texture.mipmaps;Z&&Z.length>0?gt(M.__webglFramebuffer[0],A):gt(M.__webglFramebuffer,A)}else if(P){M.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(n.bindFramebuffer(e.FRAMEBUFFER,M.__webglFramebuffer[Z]),M.__webglDepthbuffer[Z]===void 0)M.__webglDepthbuffer[Z]=e.createRenderbuffer(),Rt(M.__webglDepthbuffer[Z],A,!1);else{let $=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,X=M.__webglDepthbuffer[Z];e.bindRenderbuffer(e.RENDERBUFFER,X),e.framebufferRenderbuffer(e.FRAMEBUFFER,$,e.RENDERBUFFER,X)}}else{let Z=A.texture.mipmaps;if(Z&&Z.length>0?n.bindFramebuffer(e.FRAMEBUFFER,M.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=e.createRenderbuffer(),Rt(M.__webglDepthbuffer,A,!1);else{let $=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,X=M.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,X),e.framebufferRenderbuffer(e.FRAMEBUFFER,$,e.RENDERBUFFER,X)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Se(A,M,P){let Z=i.get(A);M!==void 0&&yt(Z.__webglFramebuffer,A,A.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),P!==void 0&&Pt(A)}function D(A){let M=A.texture,P=i.get(A),Z=i.get(M);A.addEventListener("dispose",w);let $=A.textures,X=A.isWebGLCubeRenderTarget===!0,Mt=$.length>1;if(Mt||(Z.__webglTexture===void 0&&(Z.__webglTexture=e.createTexture()),Z.__version=M.version,r.memory.textures++),X){P.__webglFramebuffer=[];for(let st=0;st<6;st++)if(M.mipmaps&&M.mipmaps.length>0){P.__webglFramebuffer[st]=[];for(let Et=0;Et<M.mipmaps.length;Et++)P.__webglFramebuffer[st][Et]=e.createFramebuffer()}else P.__webglFramebuffer[st]=e.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){P.__webglFramebuffer=[];for(let st=0;st<M.mipmaps.length;st++)P.__webglFramebuffer[st]=e.createFramebuffer()}else P.__webglFramebuffer=e.createFramebuffer();if(Mt)for(let st=0,Et=$.length;st<Et;st++){let _t=i.get($[st]);_t.__webglTexture===void 0&&(_t.__webglTexture=e.createTexture(),r.memory.textures++)}if(A.samples>0&&xt(A)===!1){P.__webglMultisampledFramebuffer=e.createFramebuffer(),P.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,P.__webglMultisampledFramebuffer);for(let st=0;st<$.length;st++){let Et=$[st];P.__webglColorRenderbuffer[st]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,P.__webglColorRenderbuffer[st]);let _t=s.convert(Et.format,Et.colorSpace),nt=s.convert(Et.type),dt=_(Et.internalFormat,_t,nt,Et.colorSpace,A.isXRRenderTarget===!0),Ct=ge(A);e.renderbufferStorageMultisample(e.RENDERBUFFER,Ct,dt,A.width,A.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+st,e.RENDERBUFFER,P.__webglColorRenderbuffer[st])}e.bindRenderbuffer(e.RENDERBUFFER,null),A.depthBuffer&&(P.__webglDepthRenderbuffer=e.createRenderbuffer(),Rt(P.__webglDepthRenderbuffer,A,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(X){n.bindTexture(e.TEXTURE_CUBE_MAP,Z.__webglTexture),qt(e.TEXTURE_CUBE_MAP,M);for(let st=0;st<6;st++)if(M.mipmaps&&M.mipmaps.length>0)for(let Et=0;Et<M.mipmaps.length;Et++)yt(P.__webglFramebuffer[st][Et],A,M,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+st,Et);else yt(P.__webglFramebuffer[st],A,M,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+st,0);m(M)&&h(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Mt){for(let st=0,Et=$.length;st<Et;st++){let _t=$[st],nt=i.get(_t),dt=e.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(dt=A.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(dt,nt.__webglTexture),qt(dt,_t),yt(P.__webglFramebuffer,A,_t,e.COLOR_ATTACHMENT0+st,dt,0),m(_t)&&h(dt)}n.unbindTexture()}else{let st=e.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(st=A.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(st,Z.__webglTexture),qt(st,M),M.mipmaps&&M.mipmaps.length>0)for(let Et=0;Et<M.mipmaps.length;Et++)yt(P.__webglFramebuffer[Et],A,M,e.COLOR_ATTACHMENT0,st,Et);else yt(P.__webglFramebuffer,A,M,e.COLOR_ATTACHMENT0,st,0);m(M)&&h(st),n.unbindTexture()}A.depthBuffer&&Pt(A)}function me(A){let M=A.textures;for(let P=0,Z=M.length;P<Z;P++){let $=M[P];if(m($)){let X=v(A),Mt=i.get($).__webglTexture;n.bindTexture(X,Mt),h(X),n.unbindTexture()}}}let Bt=[],Dt=[];function mt(A){if(A.samples>0){if(xt(A)===!1){let M=A.textures,P=A.width,Z=A.height,$=e.COLOR_BUFFER_BIT,X=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Mt=i.get(A),st=M.length>1;if(st)for(let _t=0;_t<M.length;_t++)n.bindFramebuffer(e.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+_t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,Mt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+_t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer);let Et=A.texture.mipmaps;Et&&Et.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let _t=0;_t<M.length;_t++){if(A.resolveDepthBuffer&&(A.depthBuffer&&($|=e.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&($|=e.STENCIL_BUFFER_BIT)),st){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,Mt.__webglColorRenderbuffer[_t]);let nt=i.get(M[_t]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,nt,0)}e.blitFramebuffer(0,0,P,Z,0,0,P,Z,$,e.NEAREST),l===!0&&(Bt.length=0,Dt.length=0,Bt.push(e.COLOR_ATTACHMENT0+_t),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Bt.push(X),Dt.push(X),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Dt)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Bt))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),st)for(let _t=0;_t<M.length;_t++){n.bindFramebuffer(e.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+_t,e.RENDERBUFFER,Mt.__webglColorRenderbuffer[_t]);let nt=i.get(M[_t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,Mt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+_t,e.TEXTURE_2D,nt,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){let M=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[M])}}}function ge(A){return Math.min(a.maxSamples,A.samples)}function xt(A){let M=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Gt(A){let M=r.render.frame;u.get(A)!==M&&(u.set(A,M),A.update())}function ze(A,M){let P=A.colorSpace,Z=A.format,$=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||P!==na&&P!==Pa&&(re.getTransfer(P)===xe?(Z!==bi||$!==Mi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",P)),M}function Re(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=B,this.setTexture2D=Q,this.setTexture2DArray=Y,this.setTexture3D=at,this.setTextureCube=k,this.rebindTextures=Se,this.setupRenderTarget=D,this.updateRenderTargetMipmap=me,this.updateMultisampleRenderTarget=mt,this.setupDepthRenderbuffer=Pt,this.setupFrameBufferTexture=yt,this.useMultisampledRTT=xt}function _D(e,t){function n(i,a=Pa){let s,r=re.getTransfer(a);if(i===Mi)return e.UNSIGNED_BYTE;if(i===ad)return e.UNSIGNED_SHORT_4_4_4_4;if(i===sd)return e.UNSIGNED_SHORT_5_5_5_1;if(i===G0)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===k0)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===H0)return e.BYTE;if(i===V0)return e.SHORT;if(i===Yo)return e.UNSIGNED_SHORT;if(i===id)return e.INT;if(i===Rs)return e.UNSIGNED_INT;if(i===ra)return e.FLOAT;if(i===Ds)return e.HALF_FLOAT;if(i===X0)return e.ALPHA;if(i===W0)return e.RGB;if(i===bi)return e.RGBA;if(i===Fo)return e.DEPTH_COMPONENT;if(i===Jo)return e.DEPTH_STENCIL;if(i===q0)return e.RED;if(i===rd)return e.RED_INTEGER;if(i===Y0)return e.RG;if(i===od)return e.RG_INTEGER;if(i===ld)return e.RGBA_INTEGER;if(i===Gc||i===kc||i===Xc||i===Wc)if(r===xe)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Gc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===kc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Xc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Wc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Gc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===kc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Xc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Wc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===cd||i===ud||i===hd||i===fd)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===cd)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ud)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===hd)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===fd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===dd||i===pd||i===md)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===dd||i===pd)return r===xe?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===md)return r===xe?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===gd||i===vd||i===_d||i===yd||i===xd||i===Sd||i===Md||i===bd||i===Ed||i===Td||i===Ad||i===wd||i===Cd||i===Rd)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===gd)return r===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===vd)return r===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===_d)return r===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===yd)return r===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===xd)return r===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Sd)return r===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Md)return r===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===bd)return r===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ed)return r===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Td)return r===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ad)return r===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===wd)return r===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Cd)return r===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Rd)return r===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Dd||i===Ud||i===Nd)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===Dd)return r===xe?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ud)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Nd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ld||i===Od||i===Id||i===Pd)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ld)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Od)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Id)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Pd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Zo?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}var yD=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,xD=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,pv=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){let i=new Uc(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let n=t.cameras[0].viewport,i=new zn({vertexShader:yD,fragmentShader:xD,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new dn(new Ts(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},mv=class extends La{constructor(t,n){super();let i=this,a=null,s=1,r=null,o="local-floor",l=1,c=null,u=null,d=null,f=null,p=null,g=null,x=typeof XRWebGLBinding<"u",m=new pv,h={},v=n.getContextAttributes(),_=null,y=null,T=[],C=[],w=new Ut,R=null,E=new yn;E.viewport=new Le;let S=new yn;S.viewport=new Le;let U=[E,S],B=new Wf,G=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let q=T[K];return q===void 0&&(q=new ko,T[K]=q),q.getTargetRaySpace()},this.getControllerGrip=function(K){let q=T[K];return q===void 0&&(q=new ko,T[K]=q),q.getGripSpace()},this.getHand=function(K){let q=T[K];return q===void 0&&(q=new ko,T[K]=q),q.getHandSpace()};function Q(K){let q=C.indexOf(K.inputSource);if(q===-1)return;let yt=T[q];yt!==void 0&&(yt.update(K.inputSource,K.frame,c||r),yt.dispatchEvent({type:K.type,data:K.inputSource}))}function Y(){a.removeEventListener("select",Q),a.removeEventListener("selectstart",Q),a.removeEventListener("selectend",Q),a.removeEventListener("squeeze",Q),a.removeEventListener("squeezestart",Q),a.removeEventListener("squeezeend",Q),a.removeEventListener("end",Y),a.removeEventListener("inputsourceschange",at);for(let K=0;K<T.length;K++){let q=C[K];q!==null&&(C[K]=null,T[K].disconnect(q))}G=null,W=null,m.reset();for(let K in h)delete h[K];t.setRenderTarget(_),p=null,f=null,d=null,a=null,y=null,Ot.stop(),i.isPresenting=!1,t.setPixelRatio(R),t.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(a,n)),d},this.getFrame=function(){return g},this.getSession=function(){return a},this.setSession=async function(K){if(a=K,a!==null){if(_=t.getRenderTarget(),a.addEventListener("select",Q),a.addEventListener("selectstart",Q),a.addEventListener("selectend",Q),a.addEventListener("squeeze",Q),a.addEventListener("squeezestart",Q),a.addEventListener("squeezeend",Q),a.addEventListener("end",Y),a.addEventListener("inputsourceschange",at),v.xrCompatible!==!0&&await n.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(w),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let yt=null,Rt=null,gt=null;v.depth&&(gt=v.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,yt=v.stencil?Jo:Fo,Rt=v.stencil?Zo:Rs);let Pt={colorFormat:n.RGBA8,depthFormat:gt,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(Pt),a.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),y=new xi(f.textureWidth,f.textureHeight,{format:bi,type:Mi,depthTexture:new Dc(f.textureWidth,f.textureHeight,Rt,void 0,void 0,void 0,void 0,void 0,void 0,yt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let yt={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(a,n,yt),a.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new xi(p.framebufferWidth,p.framebufferHeight,{format:bi,type:Mi,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await a.requestReferenceSpace(o),Ot.setContext(a),Ot.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function at(K){for(let q=0;q<K.removed.length;q++){let yt=K.removed[q],Rt=C.indexOf(yt);Rt>=0&&(C[Rt]=null,T[Rt].disconnect(yt))}for(let q=0;q<K.added.length;q++){let yt=K.added[q],Rt=C.indexOf(yt);if(Rt===-1){for(let Pt=0;Pt<T.length;Pt++)if(Pt>=C.length){C.push(yt),Rt=Pt;break}else if(C[Pt]===null){C[Pt]=yt,Rt=Pt;break}if(Rt===-1)break}let gt=T[Rt];gt&&gt.connect(yt)}}let k=new L,ct=new L;function pt(K,q,yt){k.setFromMatrixPosition(q.matrixWorld),ct.setFromMatrixPosition(yt.matrixWorld);let Rt=k.distanceTo(ct),gt=q.projectionMatrix.elements,Pt=yt.projectionMatrix.elements,Se=gt[14]/(gt[10]-1),D=gt[14]/(gt[10]+1),me=(gt[9]+1)/gt[5],Bt=(gt[9]-1)/gt[5],Dt=(gt[8]-1)/gt[0],mt=(Pt[8]+1)/Pt[0],ge=Se*Dt,xt=Se*mt,Gt=Rt/(-Dt+mt),ze=Gt*-Dt;if(q.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(ze),K.translateZ(Gt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),gt[10]===-1)K.projectionMatrix.copy(q.projectionMatrix),K.projectionMatrixInverse.copy(q.projectionMatrixInverse);else{let Re=Se+Gt,A=D+Gt,M=ge-ze,P=xt+(Rt-ze),Z=me*D/A*Re,$=Bt*D/A*Re;K.projectionMatrix.makePerspective(M,P,Z,$,Re,A),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function bt(K,q){q===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(q.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(a===null)return;let q=K.near,yt=K.far;m.texture!==null&&(m.depthNear>0&&(q=m.depthNear),m.depthFar>0&&(yt=m.depthFar)),B.near=S.near=E.near=q,B.far=S.far=E.far=yt,(G!==B.near||W!==B.far)&&(a.updateRenderState({depthNear:B.near,depthFar:B.far}),G=B.near,W=B.far),B.layers.mask=K.layers.mask|6,E.layers.mask=B.layers.mask&3,S.layers.mask=B.layers.mask&5;let Rt=K.parent,gt=B.cameras;bt(B,Rt);for(let Pt=0;Pt<gt.length;Pt++)bt(gt[Pt],Rt);gt.length===2?pt(B,E,S):B.projectionMatrix.copy(E.projectionMatrix),qt(K,B,Rt)};function qt(K,q,yt){yt===null?K.matrix.copy(q.matrixWorld):(K.matrix.copy(yt.matrixWorld),K.matrix.invert(),K.matrix.multiply(q.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(q.projectionMatrix),K.projectionMatrixInverse.copy(q.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=vf*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(K){l=K,f!==null&&(f.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(K){return h[K]};let Zt=null;function ce(K,q){if(u=q.getViewerPose(c||r),g=q,u!==null){let yt=u.views;p!==null&&(t.setRenderTargetFramebuffer(y,p.framebuffer),t.setRenderTarget(y));let Rt=!1;yt.length!==B.cameras.length&&(B.cameras.length=0,Rt=!0);for(let D=0;D<yt.length;D++){let me=yt[D],Bt=null;if(p!==null)Bt=p.getViewport(me);else{let mt=d.getViewSubImage(f,me);Bt=mt.viewport,D===0&&(t.setRenderTargetTextures(y,mt.colorTexture,mt.depthStencilTexture),t.setRenderTarget(y))}let Dt=U[D];Dt===void 0&&(Dt=new yn,Dt.layers.enable(D),Dt.viewport=new Le,U[D]=Dt),Dt.matrix.fromArray(me.transform.matrix),Dt.matrix.decompose(Dt.position,Dt.quaternion,Dt.scale),Dt.projectionMatrix.fromArray(me.projectionMatrix),Dt.projectionMatrixInverse.copy(Dt.projectionMatrix).invert(),Dt.viewport.set(Bt.x,Bt.y,Bt.width,Bt.height),D===0&&(B.matrix.copy(Dt.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Rt===!0&&B.cameras.push(Dt)}let gt=a.enabledFeatures;if(gt&&gt.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&x){d=i.getBinding();let D=d.getDepthInformation(yt[0]);D&&D.isValid&&D.texture&&m.init(D,a.renderState)}if(gt&&gt.includes("camera-access")&&x){t.state.unbindTexture(),d=i.getBinding();for(let D=0;D<yt.length;D++){let me=yt[D].camera;if(me){let Bt=h[me];Bt||(Bt=new Uc,h[me]=Bt);let Dt=d.getCameraImage(me);Bt.sourceTexture=Dt}}}}for(let yt=0;yt<T.length;yt++){let Rt=C[yt],gt=T[yt];Rt!==null&&gt!==void 0&&gt.update(Rt,q,c||r)}Zt&&Zt(K,q),q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:q}),g=null}let Ot=new S1;Ot.setAnimationLoop(ce),this.setAnimationLoop=function(K){Zt=K},this.dispose=function(){}}},Mr=new ia,SD=new Ve;function MD(e,t){function n(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,Q0(e)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function a(m,h,v,_,y){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(m,h):h.isMeshToonMaterial?(s(m,h),d(m,h)):h.isMeshPhongMaterial?(s(m,h),u(m,h)):h.isMeshStandardMaterial?(s(m,h),f(m,h),h.isMeshPhysicalMaterial&&p(m,h,y)):h.isMeshMatcapMaterial?(s(m,h),g(m,h)):h.isMeshDepthMaterial?s(m,h):h.isMeshDistanceMaterial?(s(m,h),x(m,h)):h.isMeshNormalMaterial?s(m,h):h.isLineBasicMaterial?(r(m,h),h.isLineDashedMaterial&&o(m,h)):h.isPointsMaterial?l(m,h,v,_):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,n(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,n(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===wn&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,n(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===wn&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,n(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,n(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,n(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);let v=t.get(h),_=v.envMap,y=v.envMapRotation;_&&(m.envMap.value=_,Mr.copy(y),Mr.x*=-1,Mr.y*=-1,Mr.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Mr.y*=-1,Mr.z*=-1),m.envMapRotation.value.setFromMatrix4(SD.makeRotationFromEuler(Mr)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,n(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,n(h.aoMap,m.aoMapTransform))}function r(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,n(h.map,m.mapTransform))}function o(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,v,_){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*v,m.scale.value=_*.5,h.map&&(m.map.value=h.map,n(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,n(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function d(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function f(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,n(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,n(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,v){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,n(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,n(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,n(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,n(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,n(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===wn&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,n(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,n(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,n(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,n(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,n(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,n(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,n(h.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,h){h.matcap&&(m.matcap.value=h.matcap)}function x(m,h){let v=t.get(h).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function bD(e,t,n,i){let a={},s={},r=[],o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,_){let y=_.program;i.uniformBlockBinding(v,y)}function c(v,_){let y=a[v.id];y===void 0&&(g(v),y=u(v),a[v.id]=y,v.addEventListener("dispose",m));let T=_.program;i.updateUBOMapping(v,T);let C=t.render.frame;s[v.id]!==C&&(f(v),s[v.id]=C)}function u(v){let _=d();v.__bindingPointIndex=_;let y=e.createBuffer(),T=v.__size,C=v.usage;return e.bindBuffer(e.UNIFORM_BUFFER,y),e.bufferData(e.UNIFORM_BUFFER,T,C),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,_,y),y}function d(){for(let v=0;v<o;v++)if(r.indexOf(v)===-1)return r.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){let _=a[v.id],y=v.uniforms,T=v.__cache;e.bindBuffer(e.UNIFORM_BUFFER,_);for(let C=0,w=y.length;C<w;C++){let R=Array.isArray(y[C])?y[C]:[y[C]];for(let E=0,S=R.length;E<S;E++){let U=R[E];if(p(U,C,E,T)===!0){let B=U.__offset,G=Array.isArray(U.value)?U.value:[U.value],W=0;for(let Q=0;Q<G.length;Q++){let Y=G[Q],at=x(Y);typeof Y=="number"||typeof Y=="boolean"?(U.__data[0]=Y,e.bufferSubData(e.UNIFORM_BUFFER,B+W,U.__data)):Y.isMatrix3?(U.__data[0]=Y.elements[0],U.__data[1]=Y.elements[1],U.__data[2]=Y.elements[2],U.__data[3]=0,U.__data[4]=Y.elements[3],U.__data[5]=Y.elements[4],U.__data[6]=Y.elements[5],U.__data[7]=0,U.__data[8]=Y.elements[6],U.__data[9]=Y.elements[7],U.__data[10]=Y.elements[8],U.__data[11]=0):(Y.toArray(U.__data,W),W+=at.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,B,U.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(v,_,y,T){let C=v.value,w=_+"_"+y;if(T[w]===void 0)return typeof C=="number"||typeof C=="boolean"?T[w]=C:T[w]=C.clone(),!0;{let R=T[w];if(typeof C=="number"||typeof C=="boolean"){if(R!==C)return T[w]=C,!0}else if(R.equals(C)===!1)return R.copy(C),!0}return!1}function g(v){let _=v.uniforms,y=0,T=16;for(let w=0,R=_.length;w<R;w++){let E=Array.isArray(_[w])?_[w]:[_[w]];for(let S=0,U=E.length;S<U;S++){let B=E[S],G=Array.isArray(B.value)?B.value:[B.value];for(let W=0,Q=G.length;W<Q;W++){let Y=G[W],at=x(Y),k=y%T,ct=k%at.boundary,pt=k+ct;y+=ct,pt!==0&&T-pt<at.storage&&(y+=T-pt),B.__data=new Float32Array(at.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=y,y+=at.storage}}}let C=y%T;return C>0&&(y+=T-C),v.__size=y,v.__cache={},this}function x(v){let _={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(_.boundary=4,_.storage=4):v.isVector2?(_.boundary=8,_.storage=8):v.isVector3||v.isColor?(_.boundary=16,_.storage=12):v.isVector4?(_.boundary=16,_.storage=16):v.isMatrix3?(_.boundary=48,_.storage=48):v.isMatrix4?(_.boundary=64,_.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),_}function m(v){let _=v.target;_.removeEventListener("dispose",m);let y=r.indexOf(_.__bindingPointIndex);r.splice(y,1),e.deleteBuffer(a[_.id]),delete a[_.id],delete s[_.id]}function h(){for(let v in a)e.deleteBuffer(a[v]);r=[],a={},s={}}return{bind:l,update:c,dispose:h}}var Vd=class{constructor(t={}){let{canvas:n=Yb(),context:i=null,depth:a=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=r;let g=new Uint32Array(4),x=new Int32Array(4),m=null,h=null,v=[],_=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ia,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let y=this,T=!1;this._outputColorSpace=$n;let C=0,w=0,R=null,E=-1,S=null,U=new Le,B=new Le,G=null,W=new ae(0),Q=0,Y=n.width,at=n.height,k=1,ct=null,pt=null,bt=new Le(0,0,Y,at),qt=new Le(0,0,Y,at),Zt=!1,ce=new Cc,Ot=!1,K=!1,q=new Ve,yt=new L,Rt=new Le,gt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Pt=!1;function Se(){return R===null?k:1}let D=i;function me(b,O){return n.getContext(b,O)}try{let b={alpha:!0,depth:a,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${"180"}`),n.addEventListener("webglcontextlost",rt,!1),n.addEventListener("webglcontextrestored",vt,!1),n.addEventListener("webglcontextcreationerror",tt,!1),D===null){let O="webgl2";if(D=me(O,b),D===null)throw me(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Bt,Dt,mt,ge,xt,Gt,ze,Re,A,M,P,Z,$,X,Mt,st,Et,_t,nt,dt,Ct,At,lt,kt;function N(){Bt=new V2(D),Bt.init(),At=new _D(D,Bt),Dt=new O2(D,Bt,t,At),mt=new gD(D,Bt),Dt.reversedDepthBuffer&&f&&mt.buffers.depth.setReversed(!0),ge=new X2(D),xt=new iD,Gt=new vD(D,Bt,mt,xt,Dt,At,ge),ze=new P2(y),Re=new H2(y),A=new Kw(D),lt=new N2(D,A),M=new G2(D,A,ge,lt),P=new q2(D,M,A,ge),nt=new W2(D,Dt,Gt),st=new I2(xt),Z=new nD(y,ze,Re,Bt,Dt,lt,st),$=new MD(y,xt),X=new sD,Mt=new hD(Bt),_t=new U2(y,ze,Re,mt,P,p,l),Et=new pD(y,P,Dt),kt=new bD(D,ge,Dt,mt),dt=new L2(D,Bt,ge),Ct=new k2(D,Bt,ge),ge.programs=Z.programs,y.capabilities=Dt,y.extensions=Bt,y.properties=xt,y.renderLists=X,y.shadowMap=Et,y.state=mt,y.info=ge}N();let it=new mv(y,D);this.xr=it,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let b=Bt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=Bt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(b){b!==void 0&&(k=b,this.setSize(Y,at,!1))},this.getSize=function(b){return b.set(Y,at)},this.setSize=function(b,O,z=!0){if(it.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=b,at=O,n.width=Math.floor(b*k),n.height=Math.floor(O*k),z===!0&&(n.style.width=b+"px",n.style.height=O+"px"),this.setViewport(0,0,b,O)},this.getDrawingBufferSize=function(b){return b.set(Y*k,at*k).floor()},this.setDrawingBufferSize=function(b,O,z){Y=b,at=O,k=z,n.width=Math.floor(b*z),n.height=Math.floor(O*z),this.setViewport(0,0,b,O)},this.getCurrentViewport=function(b){return b.copy(U)},this.getViewport=function(b){return b.copy(bt)},this.setViewport=function(b,O,z,F){b.isVector4?bt.set(b.x,b.y,b.z,b.w):bt.set(b,O,z,F),mt.viewport(U.copy(bt).multiplyScalar(k).round())},this.getScissor=function(b){return b.copy(qt)},this.setScissor=function(b,O,z,F){b.isVector4?qt.set(b.x,b.y,b.z,b.w):qt.set(b,O,z,F),mt.scissor(B.copy(qt).multiplyScalar(k).round())},this.getScissorTest=function(){return Zt},this.setScissorTest=function(b){mt.setScissorTest(Zt=b)},this.setOpaqueSort=function(b){ct=b},this.setTransparentSort=function(b){pt=b},this.getClearColor=function(b){return b.copy(_t.getClearColor())},this.setClearColor=function(){_t.setClearColor(...arguments)},this.getClearAlpha=function(){return _t.getClearAlpha()},this.setClearAlpha=function(){_t.setClearAlpha(...arguments)},this.clear=function(b=!0,O=!0,z=!0){let F=0;if(b){let I=!1;if(R!==null){let et=R.texture.format;I=et===ld||et===od||et===rd}if(I){let et=R.texture.type,ut=et===Mi||et===Rs||et===Yo||et===Zo||et===ad||et===sd,St=_t.getClearColor(),V=_t.getClearAlpha(),H=St.r,ot=St.g,ht=St.b;ut?(g[0]=H,g[1]=ot,g[2]=ht,g[3]=V,D.clearBufferuiv(D.COLOR,0,g)):(x[0]=H,x[1]=ot,x[2]=ht,x[3]=V,D.clearBufferiv(D.COLOR,0,x))}else F|=D.COLOR_BUFFER_BIT}O&&(F|=D.DEPTH_BUFFER_BIT),z&&(F|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",rt,!1),n.removeEventListener("webglcontextrestored",vt,!1),n.removeEventListener("webglcontextcreationerror",tt,!1),_t.dispose(),X.dispose(),Mt.dispose(),xt.dispose(),ze.dispose(),Re.dispose(),P.dispose(),lt.dispose(),kt.dispose(),Z.dispose(),it.dispose(),it.removeEventListener("sessionstart",Fn),it.removeEventListener("sessionend",Lt),Qe.stop()};function rt(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function vt(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let b=ge.autoReset,O=Et.enabled,z=Et.autoUpdate,F=Et.needsUpdate,I=Et.type;N(),ge.autoReset=b,Et.enabled=O,Et.autoUpdate=z,Et.needsUpdate=F,Et.type=I}function tt(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function j(b){let O=b.target;O.removeEventListener("dispose",j),Tt(O)}function Tt(b){zt(b),xt.remove(b)}function zt(b){let O=xt.get(b).programs;O!==void 0&&(O.forEach(function(z){Z.releaseProgram(z)}),b.isShaderMaterial&&Z.releaseShaderCache(b))}this.renderBufferDirect=function(b,O,z,F,I,et){O===null&&(O=gt);let ut=I.isMesh&&I.matrixWorld.determinant()<0,St=Kd(b,O,z,F,I);mt.setMaterial(F,ut);let V=z.index,H=1;if(F.wireframe===!0){if(V=M.getWireframeAttribute(z),V===void 0)return;H=2}let ot=z.drawRange,ht=z.attributes.position,Nt=ot.start*H,Ft=(ot.start+ot.count)*H;et!==null&&(Nt=Math.max(Nt,et.start*H),Ft=Math.min(Ft,(et.start+et.count)*H)),V!==null?(Nt=Math.max(Nt,0),Ft=Math.min(Ft,V.count)):ht!=null&&(Nt=Math.max(Nt,0),Ft=Math.min(Ft,ht.count));let de=Ft-Nt;if(de<0||de===1/0)return;lt.setup(I,F,St,z,V);let ue,se=dt;if(V!==null&&(ue=A.get(V),se=Ct,se.setIndex(ue)),I.isMesh)F.wireframe===!0?(mt.setLineWidth(F.wireframeLinewidth*Se()),se.setMode(D.LINES)):se.setMode(D.TRIANGLES);else if(I.isLine){let wt=F.linewidth;wt===void 0&&(wt=1),mt.setLineWidth(wt*Se()),I.isLineSegments?se.setMode(D.LINES):I.isLineLoop?se.setMode(D.LINE_LOOP):se.setMode(D.LINE_STRIP)}else I.isPoints?se.setMode(D.POINTS):I.isSprite&&se.setMode(D.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)Ho("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),se.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(Bt.get("WEBGL_multi_draw"))se.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{let wt=I._multiDrawStarts,oe=I._multiDrawCounts,Jt=I._multiDrawCount,Fe=V?A.get(V).bytesPerElement:1,si=xt.get(F).currentProgram.getUniforms();for(let Vt=0;Vt<Jt;Vt++)si.setValue(D,"_gl_DrawID",Vt),se.render(wt[Vt]/Fe,oe[Vt])}else if(I.isInstancedMesh)se.renderInstances(Nt,de,I.count);else if(z.isInstancedBufferGeometry){let wt=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,oe=Math.min(z.instanceCount,wt);se.renderInstances(Nt,de,oe)}else se.render(Nt,de)};function ne(b,O,z){b.transparent===!0&&b.side===sa&&b.forceSinglePass===!1?(b.side=wn,b.needsUpdate=!0,Os(b,O,z),b.side=Ua,b.needsUpdate=!0,Os(b,O,z),b.side=sa):Os(b,O,z)}this.compile=function(b,O,z=null){z===null&&(z=b),h=Mt.get(z),h.init(O),_.push(h),z.traverseVisible(function(I){I.isLight&&I.layers.test(O.layers)&&(h.pushLight(I),I.castShadow&&h.pushShadow(I))}),b!==z&&b.traverseVisible(function(I){I.isLight&&I.layers.test(O.layers)&&(h.pushLight(I),I.castShadow&&h.pushShadow(I))}),h.setupLights();let F=new Set;return b.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;let et=I.material;if(et)if(Array.isArray(et))for(let ut=0;ut<et.length;ut++){let St=et[ut];ne(St,z,I),F.add(St)}else ne(et,z,I),F.add(et)}),h=_.pop(),F},this.compileAsync=function(b,O,z=null){let F=this.compile(b,O,z);return new Promise(I=>{function et(){if(F.forEach(function(ut){xt.get(ut).currentProgram.isReady()&&F.delete(ut)}),F.size===0){I(b);return}setTimeout(et,10)}Bt.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let ie=null;function ii(b){ie&&ie(b)}function Fn(){Qe.stop()}function Lt(){Qe.start()}let Qe=new S1;Qe.setAnimationLoop(ii),typeof self<"u"&&Qe.setContext(self),this.setAnimationLoop=function(b){ie=b,it.setAnimationLoop(b),b===null?Qe.stop():Qe.start()},it.addEventListener("sessionstart",Fn),it.addEventListener("sessionend",Lt),this.render=function(b,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(it.cameraAutoUpdate===!0&&it.updateCamera(O),O=it.getCamera()),b.isScene===!0&&b.onBeforeRender(y,b,O,R),h=Mt.get(b,_.length),h.init(O),_.push(h),q.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),ce.setFromProjectionMatrix(q,Oi,O.reversedDepth),K=this.localClippingEnabled,Ot=st.init(this.clippingPlanes,K),m=X.get(b,v.length),m.init(),v.push(m),it.enabled===!0&&it.isPresenting===!0){let et=y.xr.getDepthSensingMesh();et!==null&&Ei(et,O,-1/0,y.sortObjects)}Ei(b,O,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(ct,pt),Pt=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,Pt&&_t.addToRenderList(m,b),this.info.render.frame++,Ot===!0&&st.beginShadows();let z=h.state.shadowsArray;Et.render(z,b,O),Ot===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();let F=m.opaque,I=m.transmissive;if(h.setupLights(),O.isArrayCamera){let et=O.cameras;if(I.length>0)for(let ut=0,St=et.length;ut<St;ut++){let V=et[ut];Us(F,I,b,V)}Pt&&_t.render(b);for(let ut=0,St=et.length;ut<St;ut++){let V=et[ut];ai(m,b,V,V.viewport)}}else I.length>0&&Us(F,I,b,O),Pt&&_t.render(b),ai(m,b,O);R!==null&&w===0&&(Gt.updateMultisampleRenderTarget(R),Gt.updateRenderTargetMipmap(R)),b.isScene===!0&&b.onAfterRender(y,b,O),lt.resetDefaultState(),E=-1,S=null,_.pop(),_.length>0?(h=_[_.length-1],Ot===!0&&st.setGlobalState(y.clippingPlanes,h.state.camera)):h=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function Ei(b,O,z,F){if(b.visible===!1)return;if(b.layers.test(O.layers)){if(b.isGroup)z=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(O);else if(b.isLight)h.pushLight(b),b.castShadow&&h.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||ce.intersectsSprite(b)){F&&Rt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(q);let ut=P.update(b),St=b.material;St.visible&&m.push(b,ut,St,z,Rt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||ce.intersectsObject(b))){let ut=P.update(b),St=b.material;if(F&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Rt.copy(b.boundingSphere.center)):(ut.boundingSphere===null&&ut.computeBoundingSphere(),Rt.copy(ut.boundingSphere.center)),Rt.applyMatrix4(b.matrixWorld).applyMatrix4(q)),Array.isArray(St)){let V=ut.groups;for(let H=0,ot=V.length;H<ot;H++){let ht=V[H],Nt=St[ht.materialIndex];Nt&&Nt.visible&&m.push(b,ut,Nt,z,Rt.z,ht)}}else St.visible&&m.push(b,ut,St,z,Rt.z,null)}}let et=b.children;for(let ut=0,St=et.length;ut<St;ut++)Ei(et[ut],O,z,F)}function ai(b,O,z,F){let I=b.opaque,et=b.transmissive,ut=b.transparent;h.setupLightsView(z),Ot===!0&&st.setGlobalState(y.clippingPlanes,z),F&&mt.viewport(U.copy(F)),I.length>0&&Ns(I,O,z),et.length>0&&Ns(et,O,z),ut.length>0&&Ns(ut,O,z),mt.buffers.depth.setTest(!0),mt.buffers.depth.setMask(!0),mt.buffers.color.setMask(!0),mt.setPolygonOffset(!1)}function Us(b,O,z,F){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[F.id]===void 0&&(h.state.transmissionRenderTarget[F.id]=new xi(1,1,{generateMipmaps:!0,type:Bt.has("EXT_color_buffer_half_float")||Bt.has("EXT_color_buffer_float")?Ds:Mi,minFilter:Cs,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:re.workingColorSpace}));let et=h.state.transmissionRenderTarget[F.id],ut=F.viewport||U;et.setSize(ut.z*y.transmissionResolutionScale,ut.w*y.transmissionResolutionScale);let St=y.getRenderTarget(),V=y.getActiveCubeFace(),H=y.getActiveMipmapLevel();y.setRenderTarget(et),y.getClearColor(W),Q=y.getClearAlpha(),Q<1&&y.setClearColor(16777215,.5),y.clear(),Pt&&_t.render(z);let ot=y.toneMapping;y.toneMapping=Ia;let ht=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),h.setupLightsView(F),Ot===!0&&st.setGlobalState(y.clippingPlanes,F),Ns(b,z,F),Gt.updateMultisampleRenderTarget(et),Gt.updateRenderTargetMipmap(et),Bt.has("WEBGL_multisampled_render_to_texture")===!1){let Nt=!1;for(let Ft=0,de=O.length;Ft<de;Ft++){let ue=O[Ft],se=ue.object,wt=ue.geometry,oe=ue.material,Jt=ue.group;if(oe.side===sa&&se.layers.test(F.layers)){let Fe=oe.side;oe.side=wn,oe.needsUpdate=!0,Ls(se,z,F,wt,oe,Jt),oe.side=Fe,oe.needsUpdate=!0,Nt=!0}}Nt===!0&&(Gt.updateMultisampleRenderTarget(et),Gt.updateRenderTargetMipmap(et))}y.setRenderTarget(St,V,H),y.setClearColor(W,Q),ht!==void 0&&(F.viewport=ht),y.toneMapping=ot}function Ns(b,O,z){let F=O.isScene===!0?O.overrideMaterial:null;for(let I=0,et=b.length;I<et;I++){let ut=b[I],St=ut.object,V=ut.geometry,H=ut.group,ot=ut.material;ot.allowOverride===!0&&F!==null&&(ot=F),St.layers.test(z.layers)&&Ls(St,O,z,V,ot,H)}}function Ls(b,O,z,F,I,et){b.onBeforeRender(y,O,z,F,I,et),b.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),I.onBeforeRender(y,O,z,F,b,et),I.transparent===!0&&I.side===sa&&I.forceSinglePass===!1?(I.side=wn,I.needsUpdate=!0,y.renderBufferDirect(z,O,F,I,b,et),I.side=Ua,I.needsUpdate=!0,y.renderBufferDirect(z,O,F,I,b,et),I.side=sa):y.renderBufferDirect(z,O,F,I,b,et),b.onAfterRender(y,O,z,F,I,et)}function Os(b,O,z){O.isScene!==!0&&(O=gt);let F=xt.get(b),I=h.state.lights,et=h.state.shadowsArray,ut=I.state.version,St=Z.getParameters(b,I.state,et,O,z),V=Z.getProgramCacheKey(St),H=F.programs;F.environment=b.isMeshStandardMaterial?O.environment:null,F.fog=O.fog,F.envMap=(b.isMeshStandardMaterial?Re:ze).get(b.envMap||F.environment),F.envMapRotation=F.environment!==null&&b.envMap===null?O.environmentRotation:b.envMapRotation,H===void 0&&(b.addEventListener("dispose",j),H=new Map,F.programs=H);let ot=H.get(V);if(ot!==void 0){if(F.currentProgram===ot&&F.lightsStateVersion===ut)return Ar(b,St),ot}else St.uniforms=Z.getUniforms(b),b.onBeforeCompile(St,y),ot=Z.acquireProgram(St,V),H.set(V,ot),F.uniforms=St.uniforms;let ht=F.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(ht.clippingPlanes=st.uniform),Ar(b,St),F.needsLights=il(b),F.lightsStateVersion=ut,F.needsLights&&(ht.ambientLightColor.value=I.state.ambient,ht.lightProbe.value=I.state.probe,ht.directionalLights.value=I.state.directional,ht.directionalLightShadows.value=I.state.directionalShadow,ht.spotLights.value=I.state.spot,ht.spotLightShadows.value=I.state.spotShadow,ht.rectAreaLights.value=I.state.rectArea,ht.ltc_1.value=I.state.rectAreaLTC1,ht.ltc_2.value=I.state.rectAreaLTC2,ht.pointLights.value=I.state.point,ht.pointLightShadows.value=I.state.pointShadow,ht.hemisphereLights.value=I.state.hemi,ht.directionalShadowMap.value=I.state.directionalShadowMap,ht.directionalShadowMatrix.value=I.state.directionalShadowMatrix,ht.spotShadowMap.value=I.state.spotShadowMap,ht.spotLightMatrix.value=I.state.spotLightMatrix,ht.spotLightMap.value=I.state.spotLightMap,ht.pointShadowMap.value=I.state.pointShadowMap,ht.pointShadowMatrix.value=I.state.pointShadowMatrix),F.currentProgram=ot,F.uniformsList=null,ot}function tu(b){if(b.uniformsList===null){let O=b.currentProgram.getUniforms();b.uniformsList=jo.seqWithValue(O.seq,b.uniforms)}return b.uniformsList}function Ar(b,O){let z=xt.get(b);z.outputColorSpace=O.outputColorSpace,z.batching=O.batching,z.batchingColor=O.batchingColor,z.instancing=O.instancing,z.instancingColor=O.instancingColor,z.instancingMorph=O.instancingMorph,z.skinning=O.skinning,z.morphTargets=O.morphTargets,z.morphNormals=O.morphNormals,z.morphColors=O.morphColors,z.morphTargetsCount=O.morphTargetsCount,z.numClippingPlanes=O.numClippingPlanes,z.numIntersection=O.numClipIntersection,z.vertexAlphas=O.vertexAlphas,z.vertexTangents=O.vertexTangents,z.toneMapping=O.toneMapping}function Kd(b,O,z,F,I){O.isScene!==!0&&(O=gt),Gt.resetTextureUnits();let et=O.fog,ut=F.isMeshStandardMaterial?O.environment:null,St=R===null?y.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:na,V=(F.isMeshStandardMaterial?Re:ze).get(F.envMap||ut),H=F.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,ot=!!z.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),ht=!!z.morphAttributes.position,Nt=!!z.morphAttributes.normal,Ft=!!z.morphAttributes.color,de=Ia;F.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(de=y.toneMapping);let ue=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,se=ue!==void 0?ue.length:0,wt=xt.get(F),oe=h.state.lights;if(Ot===!0&&(K===!0||b!==S)){let Sn=b===S&&F.id===E;st.setState(F,b,Sn)}let Jt=!1;F.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==oe.state.version||wt.outputColorSpace!==St||I.isBatchedMesh&&wt.batching===!1||!I.isBatchedMesh&&wt.batching===!0||I.isBatchedMesh&&wt.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&wt.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&wt.instancing===!1||!I.isInstancedMesh&&wt.instancing===!0||I.isSkinnedMesh&&wt.skinning===!1||!I.isSkinnedMesh&&wt.skinning===!0||I.isInstancedMesh&&wt.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&wt.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&wt.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&wt.instancingMorph===!1&&I.morphTexture!==null||wt.envMap!==V||F.fog===!0&&wt.fog!==et||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==st.numPlanes||wt.numIntersection!==st.numIntersection)||wt.vertexAlphas!==H||wt.vertexTangents!==ot||wt.morphTargets!==ht||wt.morphNormals!==Nt||wt.morphColors!==Ft||wt.toneMapping!==de||wt.morphTargetsCount!==se)&&(Jt=!0):(Jt=!0,wt.__version=F.version);let Fe=wt.currentProgram;Jt===!0&&(Fe=Os(F,O,I));let si=!1,Vt=!1,ee=!1,Oe=Fe.getUniforms(),ri=wt.uniforms;if(mt.useProgram(Fe.program)&&(si=!0,Vt=!0,ee=!0),F.id!==E&&(E=F.id,Vt=!0),si||S!==b){mt.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),Oe.setValue(D,"projectionMatrix",b.projectionMatrix),Oe.setValue(D,"viewMatrix",b.matrixWorldInverse);let Cn=Oe.map.cameraPosition;Cn!==void 0&&Cn.setValue(D,yt.setFromMatrixPosition(b.matrixWorld)),Dt.logarithmicDepthBuffer&&Oe.setValue(D,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&Oe.setValue(D,"isOrthographic",b.isOrthographicCamera===!0),S!==b&&(S=b,Vt=!0,ee=!0)}if(I.isSkinnedMesh){Oe.setOptional(D,I,"bindMatrix"),Oe.setOptional(D,I,"bindMatrixInverse");let Sn=I.skeleton;Sn&&(Sn.boneTexture===null&&Sn.computeBoneTexture(),Oe.setValue(D,"boneTexture",Sn.boneTexture,Gt))}I.isBatchedMesh&&(Oe.setOptional(D,I,"batchingTexture"),Oe.setValue(D,"batchingTexture",I._matricesTexture,Gt),Oe.setOptional(D,I,"batchingIdTexture"),Oe.setValue(D,"batchingIdTexture",I._indirectTexture,Gt),Oe.setOptional(D,I,"batchingColorTexture"),I._colorsTexture!==null&&Oe.setValue(D,"batchingColorTexture",I._colorsTexture,Gt));let oi=z.morphAttributes;if((oi.position!==void 0||oi.normal!==void 0||oi.color!==void 0)&&nt.update(I,z,Fe),(Vt||wt.receiveShadow!==I.receiveShadow)&&(wt.receiveShadow=I.receiveShadow,Oe.setValue(D,"receiveShadow",I.receiveShadow)),F.isMeshGouraudMaterial&&F.envMap!==null&&(ri.envMap.value=V,ri.flipEnvMap.value=V.isCubeTexture&&V.isRenderTargetTexture===!1?-1:1),F.isMeshStandardMaterial&&F.envMap===null&&O.environment!==null&&(ri.envMapIntensity.value=O.environmentIntensity),Vt&&(Oe.setValue(D,"toneMappingExposure",y.toneMappingExposure),wt.needsLights&&eu(ri,ee),et&&F.fog===!0&&$.refreshFogUniforms(ri,et),$.refreshMaterialUniforms(ri,F,k,at,h.state.transmissionRenderTarget[b.id]),jo.upload(D,tu(wt),ri,Gt)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(jo.upload(D,tu(wt),ri,Gt),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&Oe.setValue(D,"center",I.center),Oe.setValue(D,"modelViewMatrix",I.modelViewMatrix),Oe.setValue(D,"normalMatrix",I.normalMatrix),Oe.setValue(D,"modelMatrix",I.matrixWorld),F.isShaderMaterial||F.isRawShaderMaterial){let Sn=F.uniformsGroups;for(let Cn=0,Qd=Sn.length;Cn<Qd;Cn++){let Is=Sn[Cn];kt.update(Is,Fe),kt.bind(Is,Fe)}}return Fe}function eu(b,O){b.ambientLightColor.needsUpdate=O,b.lightProbe.needsUpdate=O,b.directionalLights.needsUpdate=O,b.directionalLightShadows.needsUpdate=O,b.pointLights.needsUpdate=O,b.pointLightShadows.needsUpdate=O,b.spotLights.needsUpdate=O,b.spotLightShadows.needsUpdate=O,b.rectAreaLights.needsUpdate=O,b.hemisphereLights.needsUpdate=O}function il(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(b,O,z){let F=xt.get(b);F.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,F.__autoAllocateDepthBuffer===!1&&(F.__useRenderToTexture=!1),xt.get(b.texture).__webglTexture=O,xt.get(b.depthTexture).__webglTexture=F.__autoAllocateDepthBuffer?void 0:z,F.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,O){let z=xt.get(b);z.__webglFramebuffer=O,z.__useDefaultFramebuffer=O===void 0};let nu=D.createFramebuffer();this.setRenderTarget=function(b,O=0,z=0){R=b,C=O,w=z;let F=!0,I=null,et=!1,ut=!1;if(b){let V=xt.get(b);if(V.__useDefaultFramebuffer!==void 0)mt.bindFramebuffer(D.FRAMEBUFFER,null),F=!1;else if(V.__webglFramebuffer===void 0)Gt.setupRenderTarget(b);else if(V.__hasExternalTextures)Gt.rebindTextures(b,xt.get(b.texture).__webglTexture,xt.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let ht=b.depthTexture;if(V.__boundDepthTexture!==ht){if(ht!==null&&xt.has(ht)&&(b.width!==ht.image.width||b.height!==ht.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Gt.setupDepthRenderbuffer(b)}}let H=b.texture;(H.isData3DTexture||H.isDataArrayTexture||H.isCompressedArrayTexture)&&(ut=!0);let ot=xt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(ot[O])?I=ot[O][z]:I=ot[O],et=!0):b.samples>0&&Gt.useMultisampledRTT(b)===!1?I=xt.get(b).__webglMultisampledFramebuffer:Array.isArray(ot)?I=ot[z]:I=ot,U.copy(b.viewport),B.copy(b.scissor),G=b.scissorTest}else U.copy(bt).multiplyScalar(k).floor(),B.copy(qt).multiplyScalar(k).floor(),G=Zt;if(z!==0&&(I=nu),mt.bindFramebuffer(D.FRAMEBUFFER,I)&&F&&mt.drawBuffers(b,I),mt.viewport(U),mt.scissor(B),mt.setScissorTest(G),et){let V=xt.get(b.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+O,V.__webglTexture,z)}else if(ut){let V=O;for(let H=0;H<b.textures.length;H++){let ot=xt.get(b.textures[H]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+H,ot.__webglTexture,z,V)}}else if(b!==null&&z!==0){let V=xt.get(b.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,V.__webglTexture,z)}E=-1},this.readRenderTargetPixels=function(b,O,z,F,I,et,ut,St=0){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let V=xt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ut!==void 0&&(V=V[ut]),V){mt.bindFramebuffer(D.FRAMEBUFFER,V);try{let H=b.textures[St],ot=H.format,ht=H.type;if(!Dt.textureFormatReadable(ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Dt.textureTypeReadable(ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=b.width-F&&z>=0&&z<=b.height-I&&(b.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+St),D.readPixels(O,z,F,I,At.convert(ot),At.convert(ht),et))}finally{let H=R!==null?xt.get(R).__webglFramebuffer:null;mt.bindFramebuffer(D.FRAMEBUFFER,H)}}},this.readRenderTargetPixelsAsync=async function(b,O,z,F,I,et,ut,St=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let V=xt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ut!==void 0&&(V=V[ut]),V)if(O>=0&&O<=b.width-F&&z>=0&&z<=b.height-I){mt.bindFramebuffer(D.FRAMEBUFFER,V);let H=b.textures[St],ot=H.format,ht=H.type;if(!Dt.textureFormatReadable(ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Dt.textureTypeReadable(ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Nt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Nt),D.bufferData(D.PIXEL_PACK_BUFFER,et.byteLength,D.STREAM_READ),b.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+St),D.readPixels(O,z,F,I,At.convert(ot),At.convert(ht),0);let Ft=R!==null?xt.get(R).__webglFramebuffer:null;mt.bindFramebuffer(D.FRAMEBUFFER,Ft);let de=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Zb(D,de,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Nt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,et),D.deleteBuffer(Nt),D.deleteSync(de),et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,O=null,z=0){let F=Math.pow(2,-z),I=Math.floor(b.image.width*F),et=Math.floor(b.image.height*F),ut=O!==null?O.x:0,St=O!==null?O.y:0;Gt.setTexture2D(b,0),D.copyTexSubImage2D(D.TEXTURE_2D,z,0,0,ut,St,I,et),mt.unbindTexture()};let al=D.createFramebuffer(),iu=D.createFramebuffer();this.copyTextureToTexture=function(b,O,z=null,F=null,I=0,et=null){et===null&&(I!==0?(Ho("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),et=I,I=0):et=0);let ut,St,V,H,ot,ht,Nt,Ft,de,ue=b.isCompressedTexture?b.mipmaps[et]:b.image;if(z!==null)ut=z.max.x-z.min.x,St=z.max.y-z.min.y,V=z.isBox3?z.max.z-z.min.z:1,H=z.min.x,ot=z.min.y,ht=z.isBox3?z.min.z:0;else{let oi=Math.pow(2,-I);ut=Math.floor(ue.width*oi),St=Math.floor(ue.height*oi),b.isDataArrayTexture?V=ue.depth:b.isData3DTexture?V=Math.floor(ue.depth*oi):V=1,H=0,ot=0,ht=0}F!==null?(Nt=F.x,Ft=F.y,de=F.z):(Nt=0,Ft=0,de=0);let se=At.convert(O.format),wt=At.convert(O.type),oe;O.isData3DTexture?(Gt.setTexture3D(O,0),oe=D.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(Gt.setTexture2DArray(O,0),oe=D.TEXTURE_2D_ARRAY):(Gt.setTexture2D(O,0),oe=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,O.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,O.unpackAlignment);let Jt=D.getParameter(D.UNPACK_ROW_LENGTH),Fe=D.getParameter(D.UNPACK_IMAGE_HEIGHT),si=D.getParameter(D.UNPACK_SKIP_PIXELS),Vt=D.getParameter(D.UNPACK_SKIP_ROWS),ee=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,ue.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ue.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,H),D.pixelStorei(D.UNPACK_SKIP_ROWS,ot),D.pixelStorei(D.UNPACK_SKIP_IMAGES,ht);let Oe=b.isDataArrayTexture||b.isData3DTexture,ri=O.isDataArrayTexture||O.isData3DTexture;if(b.isDepthTexture){let oi=xt.get(b),Sn=xt.get(O),Cn=xt.get(oi.__renderTarget),Qd=xt.get(Sn.__renderTarget);mt.bindFramebuffer(D.READ_FRAMEBUFFER,Cn.__webglFramebuffer),mt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Qd.__webglFramebuffer);for(let Is=0;Is<V;Is++)Oe&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,xt.get(b).__webglTexture,I,ht+Is),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,xt.get(O).__webglTexture,et,de+Is)),D.blitFramebuffer(H,ot,ut,St,Nt,Ft,ut,St,D.DEPTH_BUFFER_BIT,D.NEAREST);mt.bindFramebuffer(D.READ_FRAMEBUFFER,null),mt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(I!==0||b.isRenderTargetTexture||xt.has(b)){let oi=xt.get(b),Sn=xt.get(O);mt.bindFramebuffer(D.READ_FRAMEBUFFER,al),mt.bindFramebuffer(D.DRAW_FRAMEBUFFER,iu);for(let Cn=0;Cn<V;Cn++)Oe?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,oi.__webglTexture,I,ht+Cn):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,oi.__webglTexture,I),ri?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Sn.__webglTexture,et,de+Cn):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Sn.__webglTexture,et),I!==0?D.blitFramebuffer(H,ot,ut,St,Nt,Ft,ut,St,D.COLOR_BUFFER_BIT,D.NEAREST):ri?D.copyTexSubImage3D(oe,et,Nt,Ft,de+Cn,H,ot,ut,St):D.copyTexSubImage2D(oe,et,Nt,Ft,H,ot,ut,St);mt.bindFramebuffer(D.READ_FRAMEBUFFER,null),mt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else ri?b.isDataTexture||b.isData3DTexture?D.texSubImage3D(oe,et,Nt,Ft,de,ut,St,V,se,wt,ue.data):O.isCompressedArrayTexture?D.compressedTexSubImage3D(oe,et,Nt,Ft,de,ut,St,V,se,ue.data):D.texSubImage3D(oe,et,Nt,Ft,de,ut,St,V,se,wt,ue):b.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,et,Nt,Ft,ut,St,se,wt,ue.data):b.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,et,Nt,Ft,ue.width,ue.height,se,ue.data):D.texSubImage2D(D.TEXTURE_2D,et,Nt,Ft,ut,St,se,wt,ue);D.pixelStorei(D.UNPACK_ROW_LENGTH,Jt),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Fe),D.pixelStorei(D.UNPACK_SKIP_PIXELS,si),D.pixelStorei(D.UNPACK_SKIP_ROWS,Vt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,ee),et===0&&O.generateMipmaps&&D.generateMipmap(oe),mt.unbindTexture()},this.initRenderTarget=function(b){xt.get(b).__webglFramebuffer===void 0&&Gt.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Gt.setTextureCube(b,0):b.isData3DTexture?Gt.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Gt.setTexture2DArray(b,0):Gt.setTexture2D(b,0),mt.unbindTexture()},this.resetState=function(){C=0,w=0,R=null,mt.reset(),lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let n=this.getContext();n.drawingBufferColorSpace=re._getDrawingBufferColorSpace(t),n.unpackColorSpace=re._getUnpackColorSpace()}};var O1=Ps(Zc(),1);var Jc=400,tl=160,Kc=80,Qc=1500,$c=8,R1=["straight","gentle","winding","hills","racing","deep"],D1={dark:{background:"transparent",road:"#08080a",lines:"#25252d",tail:["#d856bf","#6750a2","#c247ac"],head:["#03b3c3","#0e5ea5","#324555"],poles:["#03b3c3"],dust:"#ffffff"},light:{background:"transparent",road:"#efeff2",lines:"#d0d0d7",tail:["#d856bf","#6750a2","#c247ac"],head:["#03b3c3","#0e5ea5","#324555"],poles:["#03b3c3"],dust:"#18181b"}},Zd=`
  uniform float uTime;
  uniform float uCurvature;
  uniform vec4 uCurveA;
  uniform float uCurveB;
  uniform float uFogNear;
  uniform float uFogFar;
  uniform float uPixel;
  #define PI 3.14159265358979
  float nsin(float v) { return sin(v) * 0.5 + 0.5; }
  vec3 gentle(float p) {
    return vec3(
      cos(p * PI * 5.0 + uTime) * 25.0 - cos(0.02 * PI * 5.0 + uTime) * 25.0,
      sin(p * PI * 2.0 + PI * 0.5 + uTime) * 15.0 - sin(0.02 * PI * 2.0 + PI * 0.5 + uTime) * 15.0,
      0.0
    );
  }
  float windX(float p) { return cos(PI * p * 4.0 + uTime) * 25.0 + pow(cos(PI * p * 8.0 + uTime * 2.0), 2.0) * 5.0; }
  float windY(float p) { return -nsin(PI * p * 8.0 + uTime) * 10.0 - pow(nsin(PI * p + uTime / 8.0), 5.0) * 10.0; }
  vec3 winding(float p) { return vec3(windX(p) - windX(0.0125), windY(p) - windY(0.0125), 0.0); }
  vec3 hills(float p) {
    return vec3(
      cos(p * PI * 3.0 + uTime) * 30.0 - cos(0.02 * PI * 3.0 + uTime) * 30.0,
      nsin(p * PI * 6.0 + uTime) * 30.0 - nsin(0.02 * PI * 6.0 + uTime) * 30.0,
      nsin(p * PI * 10.0 + uTime) * 20.0 - nsin(0.02 * PI * 10.0 + uTime) * 20.0
    );
  }
  vec3 racing(float p) {
    return vec3(
      sin(p * PI * 2.0 + uTime) * 35.0 - sin(0.0125 * PI * 2.0 + uTime) * 35.0,
      sin(p * PI * 3.0 + uTime) * 10.0 - sin(0.0125 * PI * 3.0 + uTime) * 10.0,
      0.0
    );
  }
  float deepX(float p) { return sin(p * PI * 4.0 + uTime) * 10.0; }
  float deepY(float p) { return pow(abs(p * 10.0), 2.0) + sin(p * PI * 8.0 + uTime) * 20.0; }
  vec3 deep(float p) { return vec3(deepX(p) - deepX(0.02), deepY(p) - deepY(0.02), 0.0); }
  vec3 bend(float p) {
    vec3 d = gentle(p) * uCurveA.x + winding(p) * uCurveA.y + hills(p) * uCurveA.z + racing(p) * uCurveA.w + deep(p) * uCurveB;
    return d * uCurvature;
  }
`,wD=`
  ${Zd}
  attribute vec4 aSeedA;
  attribute vec4 aSeedB;
  attribute float aPair;
  attribute float aTone;
  uniform float uTravel;
  uniform float uRoadX;
  uniform float uRoadWidth;
  uniform float uLanes;
  uniform float uDirection;
  uniform vec2 uSpeedRange;
  uniform float uTrail;
  uniform float uStretch;
  uniform float uSize;
  uniform float uRadiusScale;
  uniform float uMirror;
  uniform vec3 uColors[${$c}];
  uniform float uColorCount;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vColor;
  varying float vFog;
  varying float vAbove;
  varying float vThin;
  void main() {
    float laneWidth = uRoadWidth / uLanes;
    float lane = min(floor(aSeedA.x * uLanes), uLanes - 1.0);
    float laneX = (lane + 0.5) * laneWidth - uRoadWidth * 0.5 + (aSeedA.y - 0.5) * 0.5 * laneWidth;
    float carWidth = mix(0.3, 0.5, aSeedA.z) * laneWidth;
    float radius = mix(0.05, 0.14, aSeedA.w) * uSize;
    float len = mix(0.03, 0.2, aSeedB.x) * uTravel * uTrail * (1.0 + uStretch);
    float speed = mix(uSpeedRange.x, uSpeedRange.y, aSeedB.y) * uDirection;
    vec3 center = vec3(
      uRoadX + laneX + aPair * carWidth,
      aSeedB.w * 0.8 + radius * 1.3,
      position.z * len + len - mod(uTime * speed + aSeedB.z * uTravel, uTravel)
    );
    vAbove = center.y;
    center.y = mix(center.y, -center.y * 1.8, uMirror);
    center += bend(abs(center.z / uTravel));
    float depth = max(0.1, -(modelViewMatrix * vec4(center, 1.0)).z);
    float wanted = radius * uRadiusScale;
    float shown = max(wanted, depth * uPixel * 0.75);
    vThin = wanted / shown;
    vec3 p = center + vec3(position.x * shown, position.y * shown * mix(1.0, 2.2, uMirror), 0.0);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    vec3 n = normal;
    n.y *= 1.0 - 2.0 * uMirror;
    vNormal = normalize(normalMatrix * n);
    vView = -mv.xyz;
    vUv = uv;
    vColor = uColors[int(min(floor(aTone * uColorCount), uColorCount - 1.0))];
    vFog = smoothstep(uFogNear, uFogFar, -mv.z);
  }
`,CD=`
  uniform vec2 uFade;
  uniform float uIntensity;
  uniform float uSharp;
  uniform float uCore;
  uniform float uMirror;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vColor;
  varying float vFog;
  varying float vAbove;
  varying float vThin;
  void main() {
    float facing = abs(dot(normalize(vNormal), normalize(vView)));
    float alpha = pow(facing, uSharp) * smoothstep(uFade.x, uFade.y, vUv.x) * uIntensity * vThin * (1.0 - vFog);
    alpha *= mix(1.0, exp(-vAbove * 0.9), uMirror);
    if (alpha < 0.003) discard;
    gl_FragColor = vec4(mix(vColor, vec3(1.0), pow(facing, 12.0) * uCore), min(alpha, 1.0));
  }
`,RD=`
  ${Zd}
  attribute vec4 aSeed;
  attribute float aIndex;
  attribute float aSide;
  uniform float uTravel;
  uniform float uCount;
  uniform float uEdge;
  uniform float uHeight;
  uniform float uRadiusScale;
  uniform float uMirror;
  uniform vec3 uColors[${$c}];
  uniform float uColorCount;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vColor;
  varying float vFog;
  varying float vAbove;
  varying float vHeight;
  varying float vThin;
  void main() {
    vHeight = position.y + 0.5;
    float width = mix(0.08, 0.22, aSeed.y);
    float height = mix(1.3, 1.9, aSeed.z) * uHeight;
    float spacing = uTravel / max(uCount, 1.0);
    vec3 center = vec3(
      aSide * uEdge,
      vHeight * height,
      -uTravel + mod(uTime * 120.0 + (aIndex + aSeed.x * 0.6) * spacing, uTravel)
    );
    vAbove = center.y;
    center.y = mix(center.y, -center.y * 1.6, uMirror);
    center += bend(abs(center.z / uTravel));
    float depth = max(0.1, -(modelViewMatrix * vec4(center, 1.0)).z);
    float wanted = width * uRadiusScale;
    float shown = max(wanted, depth * uPixel * 0.75);
    vThin = wanted / shown;
    vec3 p = center + vec3(position.x * shown, 0.0, position.z * shown);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    vNormal = normalize(normalMatrix * normal);
    vView = -mv.xyz;
    vColor = uColors[int(min(floor(aSeed.w * uColorCount), uColorCount - 1.0))];
    vFog = smoothstep(uFogNear, uFogFar, -mv.z);
  }
`,DD=`
  uniform float uIntensity;
  uniform float uSharp;
  uniform float uCore;
  uniform float uMirror;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vColor;
  varying float vFog;
  varying float vAbove;
  varying float vHeight;
  varying float vThin;
  void main() {
    float facing = abs(dot(normalize(vNormal), normalize(vView)));
    float ends = smoothstep(0.0, 0.08, vHeight) * smoothstep(1.0, 0.9, vHeight);
    float alpha = pow(facing, uSharp) * ends * uIntensity * vThin * (1.0 - vFog);
    alpha *= mix(1.0, exp(-vAbove * 0.6), uMirror);
    if (alpha < 0.003) discard;
    gl_FragColor = vec4(mix(vColor, vec3(1.0), pow(facing, 12.0) * uCore), min(alpha, 1.0));
  }
`,UD=`
  ${Zd}
  attribute vec4 aSeed;
  attribute float aEnd;
  uniform float uTravel;
  uniform float uStretch;
  uniform float uSpread;
  varying float vAlpha;
  void main() {
    float x = (aSeed.x - 0.5) * uSpread;
    float y = mix(1.0, 42.0, aSeed.y * aSeed.y);
    float speed = mix(140.0, 260.0, aSeed.w);
    float z = -uTravel + mod(uTime * speed + aSeed.z * uTravel, uTravel);
    float len = (0.6 + uStretch * 7.0) * mix(0.6, 1.4, aSeed.w);
    vec3 p = vec3(x, y, z + aEnd * len);
    p += bend(abs(p.z / uTravel));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    vAlpha = aEnd * (1.0 - smoothstep(uFogNear, uFogFar, -mv.z));
  }
`,ND=`
  uniform vec3 uColor;
  uniform float uIntensity;
  varying float vAlpha;
  void main() {
    gl_FragColor = vec4(uColor, vAlpha * uIntensity);
  }
`,LD=`
  ${Zd}
  uniform float uTravel;
  uniform float uWidth;
  varying vec2 vRoad;
  varying float vFog;
  void main() {
    vec3 p = position;
    p.x *= uWidth;
    vRoad = vec2(p.x, p.z);
    p += bend(abs(p.z / uTravel));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    vFog = smoothstep(uFogNear, uFogFar, -mv.z);
  }
`,OD=`
  uniform float uTime;
  uniform vec3 uRoadColor;
  uniform vec3 uLineColor;
  uniform vec3 uBackground;
  uniform float uRoadWidth;
  uniform float uMedian;
  uniform float uLanes;
  uniform float uTransparent;
  uniform float uOpacity;
  varying vec2 vRoad;
  varying float vFog;
  float stripe(float d, float w) {
    float aa = fwidth(d) * 1.2;
    return 1.0 - smoothstep(w - aa, w + aa, d);
  }
  void main() {
    float rx = abs(vRoad.x) - uMedian * 0.5;
    vec3 color = rx < 0.0 ? mix(uRoadColor, uLineColor, 0.12) : uRoadColor;
    if (rx >= 0.0) {
      float laneWidth = uRoadWidth / uLanes;
      float shoulder = max(stripe(abs(rx - 0.3), 0.07), stripe(abs(rx - (uRoadWidth - 0.3)), 0.07));
      float nearest = floor(rx / laneWidth + 0.5);
      float inner = step(0.5, nearest) * step(nearest, uLanes - 0.5);
      float dash = step(0.5, fract((vRoad.y - uTime * 120.0) / 14.0));
      float marks = max(shoulder, stripe(abs(rx - nearest * laneWidth), 0.06) * inner * dash);
      color = mix(color, uLineColor, marks);
    }
    float alpha = mix(1.0, 1.0 - vFog, uTransparent) * uOpacity;
    gl_FragColor = vec4(mix(color, uBackground, vFog * (1.0 - uTransparent)), alpha);
  }
`,ID=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,PD=`
  uniform sampler2D uTexture;
  uniform vec2 uTexel;
  varying vec2 vUv;
  vec4 tap(vec2 offset) {
    return min(texture2D(uTexture, vUv + uTexel * offset), vec4(1.0));
  }
  void main() {
    vec4 sum = tap(vec2(0.0)) * 4.0 + tap(vec2(-1.0, -1.0)) + tap(vec2(1.0, -1.0)) + tap(vec2(-1.0, 1.0)) + tap(vec2(1.0, 1.0));
    gl_FragColor = sum * 0.125;
  }
`,N1=`
  uniform sampler2D uTexture;
  uniform vec2 uTexel;
  varying vec2 vUv;
  vec4 tent() {
    vec4 sum = texture2D(uTexture, vUv + uTexel * vec2(-1.0, 0.0));
    sum += texture2D(uTexture, vUv + uTexel * vec2(1.0, 0.0));
    sum += texture2D(uTexture, vUv + uTexel * vec2(0.0, -1.0));
    sum += texture2D(uTexture, vUv + uTexel * vec2(0.0, 1.0));
    sum += texture2D(uTexture, vUv + uTexel * vec2(-0.5, -0.5)) * 2.0;
    sum += texture2D(uTexture, vUv + uTexel * vec2(0.5, -0.5)) * 2.0;
    sum += texture2D(uTexture, vUv + uTexel * vec2(-0.5, 0.5)) * 2.0;
    sum += texture2D(uTexture, vUv + uTexel * vec2(0.5, 0.5)) * 2.0;
    return sum / 12.0;
  }
`,BD=`
  ${N1}
  void main() {
    gl_FragColor = tent();
  }
`,zD=`
  ${N1}
  uniform float uStrength;
  uniform float uCeiling;
  uniform float uLight;
  void main() {
    vec4 color = tent() * uStrength;
    float peak = max(uLight > 0.5 ? color.a : max(color.r, max(color.g, color.b)), 0.0001);
    color *= uCeiling * (1.0 - exp(-peak / uCeiling)) / peak;
    gl_FragColor = uLight > 0.5 ? color : vec4(color.rgb, 0.0);
  }
`,el=null,jc=e=>{if(el=el??document.createElement("canvas").getContext("2d"),!el)return[1,1,1];el.fillStyle="#000000",el.fillStyle=e;let t=String(el.fillStyle);if(t.startsWith("#")){let i=parseInt(t.slice(1,7),16);return[(i>>16&255)/255,(i>>8&255)/255,(i&255)/255]}let n=t.match(/[\d.]+/g)?.map(Number)??[0,0,0];return[n[0]/255,n[1]/255,n[2]/255]},vv=(e,t,n)=>{let i=n.length?n:["#ffffff"];for(let a=0;a<$c;a++)e.value[a].fromArray(jc(i[a%i.length]));t.value=Math.min(i.length,$c)},U1=e=>{let t=new Bc;return t.setIndex(e.index),Object.entries(e.attributes).forEach(([n,i])=>t.setAttribute(n,i)),t},nl=e=>Math.sin(e)*.5+.5,Xd=(e,t)=>Math.cos(Math.PI*e*4+t)*25+Math.cos(Math.PI*e*8+t*2)**2*5,Wd=(e,t)=>-nl(Math.PI*e*8+t)*10-nl(Math.PI*e+t/8)**5*10,qd=(e,t)=>Math.sin(e*Math.PI*4+t)*10,Yd=(e,t)=>Math.abs(e*10)**2+Math.sin(e*Math.PI*8+t)*20,FD=(e,t)=>{let{PI:n,cos:i,sin:a}=Math;return[[i(e*n*5+t)*25-i(.02*n*5+t)*25,a(e*n*2+n*.5+t)*15-a(.02*n*2+n*.5+t)*15,0],[Xd(e,t)-Xd(.0125,t),Wd(e,t)-Wd(.0125,t),0],[i(e*n*3+t)*30-i(.02*n*3+t)*30,nl(e*n*6+t)*30-nl(.02*n*6+t)*30,nl(e*n*10+t)*20-nl(.02*n*10+t)*20],[a(e*n*2+t)*35-a(.0125*n*2+t)*35,a(e*n*3+t)*10-a(.0125*n*3+t)*10,0],[qd(e,t)-qd(.02,t),Yd(e,t)-Yd(.02,t),0]]},HD=(e,t)=>{let[i,,a,s]=FD(.025,e);return[[i[0]*t*2,i[1]*t*.4,-3],[(Xd(.025,e)-Xd(.025+.007,e))*t*-2,(Wd(.025,e)-Wd(.025+.007,e))*t*-5,-10],[a[0]*t*2,a[1]*t*2,a[2]*t*2-5],[s[0]*t,s[1]*t,-5],[(qd(.025,e)-qd(.025+.01,e))*t*-2,(Yd(.025,e)-Yd(.025+.01,e))*t*-4,-10]]},VD=({curve:e="winding",curvature:t=1,speed:n=1,boost:i=3,fov:a=90,boostFov:s=130,lanes:r=3,roadWidth:o=10,medianWidth:l=2,density:c=40,trailLength:u=1,lightSize:d=1,poles:f=20,poleHeight:p=1,dust:g=100,glow:x=.6,reflections:m=.5,steer:h=.35,tailColors:v,headColors:_,poleColors:y,roadColor:T,roadOpacity:C=.1,lineColor:w,background:R,theme:E="dark",interactive:S=!0,boosting:U=!1,onBoostStart:B,onBoostEnd:G,paused:W=!1,managedPlaybackInput:Q=!1,onUnavailable:Y,onReady:at,className:k="",style:ct})=>{let pt=(0,Tr.useRef)(null),bt=D1[E]??D1.dark,qt={light:E==="light",curve:R1.includes(e)?e:"winding",curvature:Math.max(0,t),speed:Math.max(0,n),boost:Math.max(1,i),fov:Math.min(170,Math.max(20,a)),boostFov:Math.min(170,Math.max(20,s)),lanes:Math.max(1,Math.round(r)),roadWidth:Math.max(1,o),medianWidth:Math.max(0,l),density:Math.min(tl,Math.max(0,Math.round(c))),trailLength:Math.max(.05,u),lightSize:Math.max(.1,d),poles:Math.min(Kc,Math.max(0,Math.round(f))),poleHeight:Math.max(.1,p),dust:Math.min(Qc,Math.max(0,Math.round(g))),glow:Math.max(0,x),reflections:Math.max(0,m),steer:Math.max(0,h),tailColors:v?.length?v:bt.tail,headColors:_?.length?_:bt.head,poleColors:y?.length?y:bt.poles,roadColor:T??bt.road,roadOpacity:Math.min(1,Math.max(0,C)),lineColor:w??bt.lines,background:R??bt.background,dustColor:bt.dust,interactive:S,boosting:U,paused:W,managedPlaybackInput:Q},Zt=(0,Tr.useRef)(qt);Zt.current=qt;let ce=(0,Tr.useRef)({onBoostStart:B,onBoostEnd:G,onUnavailable:Y,onReady:at});return ce.current={onBoostStart:B,onBoostEnd:G,onUnavailable:Y,onReady:at},(0,Tr.useEffect)(()=>{let Ot=pt.current;if(!Ot)return;let K=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,q;try{q=new Vd({antialias:!1,alpha:!0,powerPreference:"low-power"})}catch{ce.current.onUnavailable?.();return}q.outputColorSpace=na,q.autoClear=!1;let yt=()=>Math.min(window.devicePixelRatio||1,window.matchMedia("(max-width: 760px)").matches?1:1.5);q.setPixelRatio(yt()),Ot.appendChild(q.domElement);let Rt=new Xo,gt=new yn(Zt.current.fov,1,.1,1e4);gt.position.set(0,8,-5);let Pt={uTime:{value:0},uCurvature:{value:1},uCurveA:{value:new Le},uCurveB:{value:0},uFogNear:{value:Jc*.22},uFogFar:{value:Jc*.95},uTravel:{value:Jc},uStretch:{value:0},uPixel:{value:.001}},Se=[],D=[],me=(V,H,ot,ht={})=>{let Nt=new zn({vertexShader:V,fragmentShader:H,uniforms:{...Pt,...ot},transparent:!0,depthWrite:!1,...ht});return Se.push(Nt),Nt},Bt=()=>({value:Array.from({length:$c},()=>new L(1,1,1))}),Dt=new Ts(1,Jc,1,220);Dt.rotateX(-Math.PI/2),Dt.translate(0,0,-Jc/2),Se.push(Dt);let mt={uWidth:{value:1},uRoadColor:{value:new L},uLineColor:{value:new L},uBackground:{value:new L},uRoadWidth:{value:10},uMedian:{value:2},uLanes:{value:3},uTransparent:{value:0},uOpacity:{value:1}},ge=me(LD,OD,mt,{transparent:!0,depthWrite:!0}),xt=new dn(Dt,ge);xt.frustumCulled=!1,xt.renderOrder=0,xt.layers.enable(1),Rt.add(xt);let Gt=new Ic(new Wo(new L(0,0,0),new L(0,0,-1)),24,1,7,!1);Se.push(Gt);let ze=(V,H,ot)=>{let ht=U1(Gt),Nt=new Float32Array(tl*2*4),Ft=new Float32Array(tl*2*4),de=new Float32Array(tl*2),ue=new Float32Array(tl*2);for(let oe=0;oe<tl;oe++){let Jt=[Math.random(),Math.random(),Math.random(),Math.random()],Fe=[Math.random(),Math.random(),Math.random(),Math.random()*Math.random()],si=Math.random();for(let Vt=0;Vt<2;Vt++){let ee=oe*2+Vt;Nt.set(Jt,ee*4),Ft.set(Fe,ee*4),de[ee]=Vt?.5:-.5,ue[ee]=si}}ht.setAttribute("aSeedA",new Pi(Nt,4)),ht.setAttribute("aSeedB",new Pi(Ft,4)),ht.setAttribute("aPair",new Pi(de,1)),ht.setAttribute("aTone",new Pi(ue,1)),ht.instanceCount=0,Se.push(ht);let se={uRoadX:{value:0},uRoadWidth:{value:10},uLanes:{value:3},uDirection:{value:V},uSpeedRange:{value:new Ut(...ot)},uTrail:{value:1},uSize:{value:1},uColors:Bt(),uColorCount:{value:1},uFade:{value:new Ut(...H)}},wt=(oe,Jt,Fe,si)=>{let Vt=me(wD,CD,{...se,uRadiusScale:{value:oe},uSharp:{value:Jt},uMirror:{value:Fe},uIntensity:{value:1},uCore:{value:0}},{depthTest:!Fe});D.push(Vt);let ee=new dn(ht,Vt);return ee.frustumCulled=!1,ee.renderOrder=si,Fe||ee.layers.enable(1),Rt.add(ee),Vt};return{geometry:ht,uniforms:se,reflection:wt(2.1,1.2,1,1),core:wt(1,.85,0,3)}},Re=ze(1,[0,.6],[60,80]),A=ze(-1,[1,.4],[120,160]),M=new Nc(1,1,1,8,1,!0);Se.push(M);let P=U1(M),Z=new Float32Array(Kc*2*4),$=new Float32Array(Kc*2),X=new Float32Array(Kc*2);for(let V=0;V<Kc;V++)for(let H=0;H<2;H++){let ot=V*2+H;Z.set([Math.random(),Math.random(),Math.random(),Math.random()],ot*4),$[ot]=V+(H?.5:0),X[ot]=H?1:-1}P.setAttribute("aSeed",new Pi(Z,4)),P.setAttribute("aIndex",new Pi($,1)),P.setAttribute("aSide",new Pi(X,1)),P.instanceCount=0,Se.push(P);let Mt={uCount:{value:20},uEdge:{value:11},uHeight:{value:1},uColors:Bt(),uColorCount:{value:1}},st=(V,H,ot,ht)=>{let Nt=me(RD,DD,{...Mt,uRadiusScale:{value:V},uSharp:{value:H},uMirror:{value:ot},uIntensity:{value:1},uCore:{value:0}},{depthTest:!ot});D.push(Nt);let Ft=new dn(P,Nt);return Ft.frustumCulled=!1,Ft.renderOrder=ht,ot||Ft.layers.enable(1),Rt.add(Ft),Nt},Et={reflection:st(2.4,1.2,1,1),core:st(1,.8,0,3)},_t=new Bn,nt=new Float32Array(Qc*2*4),dt=new Float32Array(Qc*2);for(let V=0;V<Qc;V++){let H=[Math.random(),Math.random(),Math.random(),Math.random()];nt.set(H,V*8),nt.set(H,V*8+4),dt[V*2+1]=1}_t.setAttribute("position",new an(new Float32Array(Qc*2*3),3)),_t.setAttribute("aSeed",new an(nt,4)),_t.setAttribute("aEnd",new an(dt,1)),_t.setDrawRange(0,0),Se.push(_t);let Ct={uSpread:{value:140},uColor:{value:new L(1,1,1)},uIntensity:{value:.5}},At=me(UD,ND,Ct);D.push(At);let lt=new Rc(_t,At);lt.frustumCulled=!1,lt.renderOrder=4,Rt.add(lt);let kt=q.extensions.has("EXT_color_buffer_float")||q.extensions.has("EXT_color_buffer_half_float"),N=Array.from({length:5},(V,H)=>{let ot=new xi(1,1,{type:kt?Ds:Mi,depthBuffer:H===0});return Se.push(ot),ot}),it=new Xo,rt=new qo(-1,1,1,-1,0,1),vt=new Ts(2,2);Se.push(vt);let tt=new dn(vt);tt.frustumCulled=!1,it.add(tt);let j=(V,H)=>{let ot=new zn({vertexShader:ID,fragmentShader:V,uniforms:{uTexture:{value:null},uTexel:{value:new Ut},uStrength:{value:1},uCeiling:{value:1},uLight:{value:0}},depthTest:!1,depthWrite:!1,...H});return Se.push(ot),ot},Tt=j(PD,{blending:Bi}),zt=j(BD,{blending:Fc,blendSrc:zi,blendDst:zi,blendSrcAlpha:zi,blendDstAlpha:zi}),ne=j(zD,{blending:Fc,blendSrc:zi}),ie=(V,H,ot)=>{tt.material=V,V.uniforms.uTexture.value=H.texture,V.uniforms.uTexel.value.set(1/H.width,1/H.height),q.setRenderTarget(ot),q.render(it,rt)},ii=new ae,Fn=0,Lt={boost:0,held:!1,boosted:!1,fov:Zt.current.fov,fovVelocity:0,steerX:0,steerY:0,pointerX:0,pointerY:0,weights:[0,0,0,0,0],visible:!0},Qe={tail:"",head:"",poles:"",surface:"",light:null},Ei=new L,ai=0,Us=performance.now(),Ns=window.matchMedia("(max-width: 760px)").matches?1e3/30:1e3/60,Ls=!0,Os=!0,tu=V=>{let H=V.tailColors.join();H!==Qe.tail&&(Qe.tail=H,vv(Re.uniforms.uColors,Re.uniforms.uColorCount,V.tailColors));let ot=V.headColors.join();ot!==Qe.head&&(Qe.head=ot,vv(A.uniforms.uColors,A.uniforms.uColorCount,V.headColors));let ht=V.poleColors.join();ht!==Qe.poles&&(Qe.poles=ht,vv(Mt.uColors,Mt.uColorCount,V.poleColors));let Nt=[V.roadColor,V.lineColor,V.background,V.dustColor].join();if(Nt!==Qe.surface){Qe.surface=Nt,mt.uRoadColor.value.fromArray(jc(V.roadColor)),mt.uLineColor.value.fromArray(jc(V.lineColor)),Ct.uColor.value.fromArray(jc(V.dustColor));let Ft=V.background==="transparent",de=Ft?[0,0,0]:jc(V.background);mt.uBackground.value.fromArray(de),mt.uTransparent.value=Ft?1:0,ii.setRGB(...de,na),Fn=Ft?0:1}Qe.light!==V.light&&(Qe.light=V.light,D.forEach(Ft=>{Ft.blending=V.light?Na:zc,Ft.needsUpdate=!0}),ne.blendDst=V.light?pr:zi,ne.blendSrcAlpha=V.light?zi:qf,ne.blendDstAlpha=V.light?pr:zi,ne.uniforms.uLight.value=V.light?1:0)},Ar=!1,Kd=()=>{Ns=window.matchMedia("(max-width: 760px)").matches?1e3/30:1e3/60,q.setPixelRatio(yt());let V=Math.max(1,Ot.clientWidth),H=Math.max(1,Ot.clientHeight);q.setSize(V,H,!1),N.forEach((ot,ht)=>ot.setSize(Math.max(1,Math.round(V/2**(ht+1))),Math.max(1,Math.round(H/2**(ht+1))))),gt.aspect=V/H,gt.updateProjectionMatrix()},eu=()=>{Ar=!0,nu()},il=V=>{if(ai=0,!Ls||!Lt.visible||document.hidden||Zt.current.paused)return;if(Ar&&(Ar=!1,Kd()),V-Us<Ns-1){ai=requestAnimationFrame(il);return}let H=Zt.current,ot=Math.min(.05,Math.max(.001,(V-Us)/1e3));Us=V,tu(H);let ht=Lt.held&&H.interactive||H.boosting?1:0;Lt.boost+=(ht-Lt.boost)*(1-Math.exp(-ot/(ht>Lt.boost?.28:.85)));let Nt=H.speed*(K?.3:1)*(1+(H.boost-1)*Lt.boost);Pt.uTime.value+=ot*Nt,Pt.uStretch.value=Lt.boost*1.1,Pt.uCurvature.value=H.curvature;let Ft=R1.indexOf(H.curve)-1,de=1-Math.exp(-ot/.6);Lt.weights=Lt.weights.map((Vt,ee)=>Vt+((ee===Ft?1:0)-Vt)*de),Pt.uCurveA.value.set(Lt.weights[0],Lt.weights[1],Lt.weights[2],Lt.weights[3]),Pt.uCurveB.value=Lt.weights[4];let ue=H.roadWidth/2+H.medianWidth/2,se=.45+.55*H.roadOpacity;[Re,A].forEach((Vt,ee)=>{Vt.geometry.instanceCount=H.density*2,Vt.uniforms.uRoadX.value=ee?ue:-ue,Vt.uniforms.uRoadWidth.value=H.roadWidth,Vt.uniforms.uLanes.value=H.lanes,Vt.uniforms.uTrail.value=H.trailLength,Vt.uniforms.uSize.value=H.lightSize,Vt.core.uniforms.uIntensity.value=H.light?.95:1+.35*Lt.boost,Vt.core.uniforms.uCore.value=H.light?0:.75,Vt.reflection.uniforms.uIntensity.value=H.reflections*(H.light?.22:.42)*se}),P.instanceCount=H.poles*2,Mt.uCount.value=Math.max(1,H.poles),Mt.uEdge.value=H.roadWidth+H.medianWidth/2+.8,Mt.uHeight.value=H.poleHeight,Et.core.uniforms.uIntensity.value=H.light?.9:1,Et.core.uniforms.uCore.value=H.light?0:.6,Et.reflection.uniforms.uIntensity.value=H.reflections*(H.light?.2:.38)*se,_t.setDrawRange(0,H.dust*2),Ct.uIntensity.value=(H.light?.35:.45)*(1+Lt.boost),Ct.uSpread.value=(H.roadWidth*2+H.medianWidth)*5,mt.uWidth.value=H.roadWidth*2+H.medianWidth+3,mt.uRoadWidth.value=H.roadWidth,mt.uMedian.value=H.medianWidth,mt.uLanes.value=H.lanes,mt.uOpacity.value=H.roadOpacity,ge.depthWrite=H.roadOpacity>.5;let wt=K?H.fov:H.fov+(H.boostFov-H.fov)*Lt.boost;Lt.fovVelocity+=((wt-Lt.fov)*90-Lt.fovVelocity*13)*ot,Lt.fov+=Lt.fovVelocity*ot,gt.fov=Lt.fov,Pt.uPixel.value=2*Math.tan(Lt.fov*Math.PI/360)/Math.max(1,q.domElement.height);let oe=1-Math.exp(-ot/.35),Jt=H.interactive?H.steer:0;Lt.steerX+=(Lt.pointerX*Jt-Lt.steerX)*oe,Lt.steerY+=(Lt.pointerY*Jt-Lt.steerY)*oe,gt.position.set(Lt.steerX*H.roadWidth*.45,8-Lt.steerY*2.5,-5);let Fe=HD(Pt.uTime.value,H.curvature),si=1-Lt.weights.reduce((Vt,ee)=>Vt+ee,0);if(Ei.set(0,0,-10*si),Fe.forEach((Vt,ee)=>{Ei.x+=Vt[0]*Lt.weights[ee],Ei.y+=Vt[1]*Lt.weights[ee],Ei.z+=Vt[2]*Lt.weights[ee]}),Ei.x+=Lt.steerX*2.5,Ei.add(gt.position),gt.lookAt(Ei),gt.updateProjectionMatrix(),q.setRenderTarget(null),q.setClearColor(ii,Fn),q.clear(),q.render(Rt,gt),H.glow>0){let Vt=Pt.uPixel.value;Pt.uPixel.value=Vt*(q.domElement.height/N[0].height),gt.layers.set(1),ge.colorWrite=!1,q.setRenderTarget(N[0]),q.setClearColor(0,0),q.clear(),q.render(Rt,gt),ge.colorWrite=!0,gt.layers.set(0),Pt.uPixel.value=Vt;for(let ee=1;ee<N.length;ee++)ie(Tt,N[ee-1],N[ee]);for(let ee=N.length-1;ee>1;ee--)ie(zt,N[ee],N[ee-1]);ne.uniforms.uStrength.value=H.glow*(H.light?.5:1.4),ne.uniforms.uCeiling.value=H.glow*(H.light?.3:.5),ie(ne,N[1],null)}Os&&(Os=!1,ce.current.onReady?.()),Ls&&Lt.visible&&!document.hidden&&!Zt.current.paused&&(ai=requestAnimationFrame(il))},nu=()=>{ai||!Ls||!Lt.visible||document.hidden||Zt.current.paused||(Us=performance.now(),ai=requestAnimationFrame(il))},al=V=>{Lt.held!==V&&(Lt.held=V,Zt.current.interactive&&(V?ce.current.onBoostStart?.():ce.current.onBoostEnd?.()))},iu=V=>{Zt.current.managedPlaybackInput||V.button!==0&&V.pointerType==="mouse"||al(!0)},b=()=>al(!1),O=V=>{let H=Ot.getBoundingClientRect();Lt.pointerX=(V.clientX-H.left)/H.width*2-1,Lt.pointerY=(V.clientY-H.top)/H.height*2-1},z=()=>{Lt.pointerX=0,Lt.pointerY=0},F=V=>{Zt.current.interactive&&!Zt.current.managedPlaybackInput&&V.preventDefault()},I=()=>{document.hidden||Zt.current.paused||!Lt.visible?(al(!1),cancelAnimationFrame(ai),ai=0):nu()},et=()=>ce.current.onUnavailable?.(),ut=new ResizeObserver(eu);ut.observe(Ot);let St=new IntersectionObserver(V=>{Lt.visible=V.some(H=>H.isIntersecting),I()});return St.observe(Ot),Ot.addEventListener("pointerdown",iu),Ot.addEventListener("pointermove",O),Ot.addEventListener("pointerleave",z),Ot.addEventListener("contextmenu",F),window.addEventListener("pointerup",b),window.addEventListener("pointercancel",b),window.addEventListener("blur",b),Ot.addEventListener("gary:animation-state",I),document.addEventListener("visibilitychange",I),q.domElement.addEventListener("webglcontextlost",et),eu(),()=>{Ls=!1,cancelAnimationFrame(ai),ai=0,ut.disconnect(),St.disconnect(),Ot.removeEventListener("pointerdown",iu),Ot.removeEventListener("pointermove",O),Ot.removeEventListener("pointerleave",z),Ot.removeEventListener("contextmenu",F),window.removeEventListener("pointerup",b),window.removeEventListener("pointercancel",b),window.removeEventListener("blur",b),Ot.removeEventListener("gary:animation-state",I),document.removeEventListener("visibilitychange",I),q.domElement.removeEventListener("webglcontextlost",et),Se.forEach(V=>V.dispose()),q.dispose(),q.forceContextLoss(),q.domElement.remove()}},[]),(0,Tr.useEffect)(()=>{pt.current?.dispatchEvent(new Event("gary:animation-state"))},[W]),(0,O1.jsx)("div",{ref:pt,className:`hyperspeed${k?` ${k}`:""}`,style:ct})},L1=VD;var I1={curve:"gentle",curvature:1,speed:1,boost:3,fov:90,boostFov:130,lanes:3,roadWidth:9,medianWidth:2,density:30,trailLength:1,lightSize:1,poles:50,dust:100,glow:.6,reflections:.5,roadOpacity:.1,steer:.35,roadColor:"#08080a",lineColor:"#25252d",tailColors:["#7d0d1b","#a90519","#ff102a"],headColors:["#f1eece","#e6e2b1","#dfd98a"],poleColors:["#f1eece"],background:"transparent",theme:"dark",interactive:!0};var P1='a,button,input,select,textarea,summary,label,h1,h2,h3,h4,h5,h6,p,dialog,[role="button"],[role="link"],[contenteditable],[data-no-boost]';function B1({hero:e,browser:t=e.ownerDocument.defaultView,document:n=e.ownerDocument,onToggle:i,onBoost:a,isPaused:s,holdMs:r=300,moveTolerance:o=10,now:l=()=>t.performance.now(),setTimer:c=(d,f)=>t.setTimeout(d,f),clearTimer:u=d=>t.clearTimeout(d)}){let d=new Set,f,p=!1,g=!1,x=S=>{g!==S&&(g=S,a(S))},m=()=>{f?.timer!==void 0&&u(f.timer),f=void 0,x(!1)},h=()=>{d.clear(),m()},v=S=>S.pointerId??0,_=S=>f&&Math.hypot(S.clientX-f.x,S.clientY-f.y)>o,y=S=>{d.add(v(S)),(d.size>1||S.isPrimary===!1)&&m()},T=S=>{if(!(p||S.isPrimary===!1||d.size>1)&&!(S.button>0||S.target?.closest?.(P1))){if(f){m();return}f={id:v(S),x:S.clientX,y:S.clientY,started:l(),held:!1},f.timer=c(()=>{!f||p||(f.timer=void 0,f.held=!0,s()||x(!0))},r)}},C=S=>{f?.id!==v(S)||!_(S)||(!f.held||S.pointerType!=="mouse")&&m()},w=S=>{if(d.delete(v(S)),!f||f.id!==v(S))return;let U=!f.held&&l()-f.started<r&&!_(S)&&S.target?.nodeType&&e.contains(S.target)&&!S.target?.closest?.(P1);m(),U&&!p&&i()},R=S=>{d.delete(v(S)),m()},E=()=>{(n.hidden||n.visibilityState==="hidden")&&h()};return t.addEventListener("pointerdown",y,{capture:!0,passive:!0}),e.addEventListener("pointerdown",T,{passive:!0}),e.addEventListener("pointermove",C,{passive:!0}),e.addEventListener("pointerleave",m),t.addEventListener("pointerup",w,{passive:!0}),t.addEventListener("pointercancel",R,{passive:!0}),t.addEventListener("blur",h),n.addEventListener("visibilitychange",E),n.addEventListener("scroll",m,{capture:!0,passive:!0}),{cancel:m,destroy(){p||(p=!0,h(),t.removeEventListener("pointerdown",y,!0),e.removeEventListener("pointerdown",T),e.removeEventListener("pointermove",C),e.removeEventListener("pointerleave",m),t.removeEventListener("pointerup",w),t.removeEventListener("pointercancel",R),t.removeEventListener("blur",h),n.removeEventListener("visibilitychange",E),n.removeEventListener("scroll",m,!0))}}}var Jd=Ps(Zc(),1),_v=class extends la.Component{state={failed:!1};static getDerivedStateFromError(){return{failed:!0}}componentDidCatch(){this.props.onUnavailable()}render(){return this.state.failed?null:this.props.children}};function GD({hero:e,paused:t,onToggle:n,onUnavailable:i,onReady:a}){let[s,r]=(0,la.useState)(!1),o=(0,la.useRef)(t);o.current=t;let l=(0,la.useRef)(null);return(0,la.useEffect)(()=>{l.current=B1({hero:e,onToggle:n,onBoost:r,isPaused:()=>o.current});let c=u=>{let d=e.querySelector(".hyperspeed");!d||d.contains(u.target)||d.dispatchEvent(new PointerEvent("pointermove",{clientX:u.clientX,clientY:u.clientY,pointerType:u.pointerType}))};return e.addEventListener("pointermove",c),()=>{l.current?.destroy(),l.current=null,e.removeEventListener("pointermove",c)}},[e,n]),(0,la.useEffect)(()=>{t&&l.current?.cancel()},[t]),(0,Jd.jsx)(L1,{...I1,managedPlaybackInput:!0,paused:t,boosting:s&&!t,onUnavailable:i,onReady:a})}function CO(e,t,{onUnavailable:n,onReady:i,onToggle:a=()=>{}}){let s=(0,z1.createRoot)(e),r=!1,o=!1,l=()=>s.render((0,Jd.jsx)(_v,{onUnavailable:n,children:(0,Jd.jsx)(GD,{hero:t,paused:o,onToggle:a,onUnavailable:n,onReady:i})}));return l(),{setPaused(c){r||o===c||(o=c,l())},unmount(){r||(r=!0,s.unmount(),e.replaceChildren())}}}export{CO as mountHyperspeed};
/*! For license information please see mount-hyperspeed-E5EPRHQV.js.LEGAL.txt */
