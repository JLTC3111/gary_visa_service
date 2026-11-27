import{a as Gi,b as Ps}from"./chunk-SQE76S5B.js";var Nv=Gi(Gt=>{"use strict";var tp=Symbol.for("react.transitional.element"),H1=Symbol.for("react.portal"),V1=Symbol.for("react.fragment"),G1=Symbol.for("react.strict_mode"),k1=Symbol.for("react.profiler"),X1=Symbol.for("react.consumer"),W1=Symbol.for("react.context"),q1=Symbol.for("react.forward_ref"),Y1=Symbol.for("react.suspense"),Z1=Symbol.for("react.memo"),Ev=Symbol.for("react.lazy"),J1=Symbol.for("react.activity"),K1=Symbol.for("react.view_transition"),xv=Symbol.iterator;function Q1(e){return e===null||typeof e!="object"?null:(e=xv&&e[xv]||e["@@iterator"],typeof e=="function"?e:null)}var Tv={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Av=Object.assign,wv={};function Dr(e,t,n){this.props=e,this.context=t,this.refs=wv,this.updater=n||Tv}Dr.prototype.isReactComponent={};Dr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Dr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Cv(){}Cv.prototype=Dr.prototype;function ep(e,t,n){this.props=e,this.context=t,this.refs=wv,this.updater=n||Tv}var np=ep.prototype=new Cv;np.constructor=ep;Av(np,Dr.prototype);np.isPureReactComponent=!0;var Sv=Array.isArray;function $d(){}var we={H:null,A:null,T:null,S:null},Rv=Object.prototype.hasOwnProperty;function ip(e,t,n){var i=n.ref;return{$$typeof:tp,type:e,key:t,ref:i!==void 0?i:null,props:n}}function j1(e,t){return ip(e.type,t,e.props)}function ap(e){return typeof e=="object"&&e!==null&&e.$$typeof===tp}function $1(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Mv=/\/+/g;function jd(e,t){return typeof e=="object"&&e!==null&&e.key!=null?$1(""+e.key):t.toString(36)}function tE(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then($d,$d):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function Rr(e,t,n,i,a){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var r=!1;if(e===null)r=!0;else switch(s){case"bigint":case"string":case"number":r=!0;break;case"object":switch(e.$$typeof){case tp:case H1:r=!0;break;case Ev:return r=e._init,Rr(r(e._payload),t,n,i,a)}}if(r)return a=a(e),r=i===""?"."+jd(e,0):i,Sv(a)?(n="",r!=null&&(n=r.replace(Mv,"$&/")+"/"),Rr(a,t,n,"",function(c){return c})):a!=null&&(ap(a)&&(a=j1(a,n+(a.key==null||e&&e.key===a.key?"":(""+a.key).replace(Mv,"$&/")+"/")+r)),t.push(a)),1;r=0;var o=i===""?".":i+":";if(Sv(e))for(var l=0;l<e.length;l++)i=e[l],s=o+jd(i,l),r+=Rr(i,t,n,s,a);else if(l=Q1(e),typeof l=="function")for(e=l.call(e),l=0;!(i=e.next()).done;)i=i.value,s=o+jd(i,l++),r+=Rr(i,t,n,s,a);else if(s==="object"){if(typeof e.then=="function")return Rr(tE(e),t,n,i,a);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return r}function su(e,t,n){if(e==null)return e;var i=[],a=0;return Rr(e,i,"","",function(s){return t.call(n,s,a++)}),i}function eE(e){if(e._status===-1){var t=e._result,n=t();n.then(function(i){(e._status===0||e._status===-1)&&(e._status=1,e._result=i,n.status===void 0&&(n.status="fulfilled",n.value=i))},function(i){(e._status===0||e._status===-1)&&(e._status=2,e._result=i,n.status===void 0&&(n.status="rejected",n.reason=i))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var bv=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function Dv(e){var t=we.T,n={};n.types=t!==null?t.types:null,we.T=n;try{var i=e(),a=we.S;a!==null&&a(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then($d,bv)}catch(s){bv(s)}finally{t!==null&&n.types!==null&&(t.types=n.types),we.T=t}}function Uv(e){var t=we.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else Dv(Uv.bind(null,e))}var nE={map:su,forEach:function(e,t,n){su(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return su(e,function(){t++}),t},toArray:function(e){return su(e,function(t){return t})||[]},only:function(e){if(!ap(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Gt.Activity=J1;Gt.Children=nE;Gt.Component=Dr;Gt.Fragment=V1;Gt.Profiler=k1;Gt.PureComponent=ep;Gt.StrictMode=G1;Gt.Suspense=Y1;Gt.ViewTransition=K1;Gt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=we;Gt.__COMPILER_RUNTIME={__proto__:null,c:function(e){return we.H.useMemoCache(e)}};Gt.addTransitionType=Uv;Gt.cache=function(e){return function(){return e.apply(null,arguments)}};Gt.cacheSignal=function(){return null};Gt.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var i=Av({},e.props),a=e.key;if(t!=null)for(s in t.key!==void 0&&(a=""+t.key),t)!Rv.call(t,s)||s==="key"||s==="__self"||s==="__source"||s==="ref"&&t.ref===void 0||(i[s]=t[s]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var r=Array(s),o=0;o<s;o++)r[o]=arguments[o+2];i.children=r}return ip(e.type,a,i)};Gt.createContext=function(e){return e={$$typeof:W1,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:X1,_context:e},e};Gt.createElement=function(e,t,n){var i,a={},s=null;if(t!=null)for(i in t.key!==void 0&&(s=""+t.key),t)Rv.call(t,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(a[i]=t[i]);var r=arguments.length-2;if(r===1)a.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];a.children=o}if(e&&e.defaultProps)for(i in r=e.defaultProps,r)a[i]===void 0&&(a[i]=r[i]);return ip(e,s,a)};Gt.createRef=function(){return{current:null}};Gt.forwardRef=function(e){return{$$typeof:q1,render:e}};Gt.isValidElement=ap;Gt.lazy=function(e){return{$$typeof:Ev,_payload:{_status:-1,_result:e},_init:eE}};Gt.memo=function(e,t){return{$$typeof:Z1,type:e,compare:t===void 0?null:t}};Gt.startTransition=Dv;Gt.unstable_useCacheRefresh=function(){return we.H.useCacheRefresh()};Gt.use=function(e){return we.H.use(e)};Gt.useActionState=function(e,t,n){return we.H.useActionState(e,t,n)};Gt.useCallback=function(e,t){return we.H.useCallback(e,t)};Gt.useContext=function(e){return we.H.useContext(e)};Gt.useDebugValue=function(){};Gt.useDeferredValue=function(e,t){return we.H.useDeferredValue(e,t)};Gt.useEffect=function(e,t){return we.H.useEffect(e,t)};Gt.useEffectEvent=function(e){return we.H.useEffectEvent(e)};Gt.useId=function(){return we.H.useId()};Gt.useImperativeHandle=function(e,t,n){return we.H.useImperativeHandle(e,t,n)};Gt.useInsertionEffect=function(e,t){return we.H.useInsertionEffect(e,t)};Gt.useLayoutEffect=function(e,t){return we.H.useLayoutEffect(e,t)};Gt.useMemo=function(e,t){return we.H.useMemo(e,t)};Gt.useOptimistic=function(e,t){return we.H.useOptimistic(e,t)};Gt.useReducer=function(e,t,n){return we.H.useReducer(e,t,n)};Gt.useRef=function(e){return we.H.useRef(e)};Gt.useState=function(e){return we.H.useState(e)};Gt.useSyncExternalStore=function(e,t,n){return we.H.useSyncExternalStore(e,t,n)};Gt.useTransition=function(){return we.H.useTransition()};Gt.version="19.3.1"});var ul=Gi((WD,Lv)=>{"use strict";Lv.exports=Nv()});var kv=Gi(Le=>{"use strict";function lp(e,t){var n=e.length;e.push(t);t:for(;0<n;){var i=n-1>>>1,a=e[i];if(0<ru(a,t))e[i]=t,e[n]=a,n=i;else break t}}function ki(e){return e.length===0?null:e[0]}function lu(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;t:for(var i=0,a=e.length,s=a>>>1;i<s;){var r=2*(i+1)-1,o=e[r],l=r+1,c=e[l];if(0>ru(o,n))l<a&&0>ru(c,o)?(e[i]=c,e[l]=n,i=l):(e[i]=o,e[r]=n,i=r);else if(l<a&&0>ru(c,n))e[i]=c,e[l]=n,i=l;else break t}}return t}function ru(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}Le.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(Ov=performance,Le.unstable_now=function(){return Ov.now()}):(sp=Date,Iv=sp.now(),Le.unstable_now=function(){return sp.now()-Iv});var Ov,sp,Iv,fa=[],Ha=[],iE=1,oi=null,vn=3,cp=!1,hl=!1,fl=!1,up=!1,zv=typeof setTimeout=="function"?setTimeout:null,Fv=typeof clearTimeout=="function"?clearTimeout:null,Pv=typeof setImmediate<"u"?setImmediate:null;function ou(e){for(var t=ki(Ha);t!==null;){if(t.callback===null)lu(Ha);else if(t.startTime<=e)lu(Ha),t.sortIndex=t.expirationTime,lp(fa,t);else break;t=ki(Ha)}}function hp(e){if(fl=!1,ou(e),!hl)if(ki(fa)!==null)hl=!0,Nr||(Nr=!0,Ur());else{var t=ki(Ha);t!==null&&fp(hp,t.startTime-e)}}var Nr=!1,dl=-1,Hv=5,Vv=-1;function Gv(){return up?!0:!(Le.unstable_now()-Vv<Hv)}function rp(){if(up=!1,Nr){var e=Le.unstable_now();Vv=e;var t=!0;try{t:{hl=!1,fl&&(fl=!1,Fv(dl),dl=-1),cp=!0;var n=vn;try{e:{for(ou(e),oi=ki(fa);oi!==null&&!(oi.expirationTime>e&&Gv());){var i=oi.callback;if(typeof i=="function"){oi.callback=null,vn=oi.priorityLevel;var a=i(oi.expirationTime<=e);if(e=Le.unstable_now(),typeof a=="function"){oi.callback=a,ou(e),t=!0;break e}oi===ki(fa)&&lu(fa),ou(e)}else lu(fa);oi=ki(fa)}if(oi!==null)t=!0;else{var s=ki(Ha);s!==null&&fp(hp,s.startTime-e),t=!1}}break t}finally{oi=null,vn=n,cp=!1}t=void 0}}finally{t?Ur():Nr=!1}}}var Ur;typeof Pv=="function"?Ur=function(){Pv(rp)}:typeof MessageChannel<"u"?(op=new MessageChannel,Bv=op.port2,op.port1.onmessage=rp,Ur=function(){Bv.postMessage(null)}):Ur=function(){zv(rp,0)};var op,Bv;function fp(e,t){dl=zv(function(){e(Le.unstable_now())},t)}Le.unstable_IdlePriority=5;Le.unstable_ImmediatePriority=1;Le.unstable_LowPriority=4;Le.unstable_NormalPriority=3;Le.unstable_Profiling=null;Le.unstable_UserBlockingPriority=2;Le.unstable_cancelCallback=function(e){e.callback=null};Le.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Hv=0<e?Math.floor(1e3/e):5};Le.unstable_getCurrentPriorityLevel=function(){return vn};Le.unstable_next=function(e){switch(vn){case 1:case 2:case 3:var t=3;break;default:t=vn}var n=vn;vn=t;try{return e()}finally{vn=n}};Le.unstable_requestPaint=function(){up=!0};Le.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=vn;vn=e;try{return t()}finally{vn=n}};Le.unstable_scheduleCallback=function(e,t,n){var i=Le.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?i+n:i):n=i,e){case 1:var a=-1;break;case 2:a=250;break;case 5:a=1073741823;break;case 4:a=1e4;break;default:a=5e3}return a=n+a,e={id:iE++,callback:t,priorityLevel:e,startTime:n,expirationTime:a,sortIndex:-1},n>i?(e.sortIndex=n,lp(Ha,e),ki(fa)===null&&e===ki(Ha)&&(fl?(Fv(dl),dl=-1):fl=!0,fp(hp,n-i))):(e.sortIndex=a,lp(fa,e),hl||cp||(hl=!0,Nr||(Nr=!0,Ur()))),e};Le.unstable_shouldYield=Gv;Le.unstable_wrapCallback=function(e){var t=vn;return function(){var n=vn;vn=t;try{return e.apply(this,arguments)}finally{vn=n}}}});var Wv=Gi((YD,Xv)=>{"use strict";Xv.exports=kv()});var Zv=Gi(_n=>{"use strict";var aE=ul();function Yv(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Va(){}var En={d:{f:Va,r:function(){throw Error(Yv(522))},D:Va,C:Va,L:Va,m:Va,X:Va,S:Va,M:Va},p:0,findDOMNode:null},sE=Symbol.for("react.portal"),rE=Symbol.for("react.recoverable"),qv=Symbol.for("react.optimistic_key");function oE(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:sE,key:i==null?null:i===qv?qv:""+i,children:e,containerInfo:t,implementation:n}}var pl=aE.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function cu(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}_n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=En;_n.browser=function(e){return{$$typeof:rE,_reason:e}};_n.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(Yv(299));return oE(e,t,null,n)};_n.flushSync=function(e){var t=pl.T,n=En.p;try{if(pl.T=null,En.p=2,e)return e()}finally{pl.T=t,En.p=n,En.d.f()}};_n.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,En.d.C(e,t))};_n.prefetchDNS=function(e){typeof e=="string"&&En.d.D(e)};_n.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,i=cu(n,t.crossOrigin),a=typeof t.integrity=="string"?t.integrity:void 0,s=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?En.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:i,integrity:a,fetchPriority:s}):n==="script"&&En.d.X(e,{crossOrigin:i,integrity:a,fetchPriority:s,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};_n.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=cu(t.as,t.crossOrigin);En.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0})}}else t==null&&En.d.M(e)};_n.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,i=cu(n,t.crossOrigin);En.d.L(e,n,{crossOrigin:i,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};_n.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=cu(t.as,t.crossOrigin);En.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0})}else En.d.m(e)};_n.requestFormReset=function(e){En.d.r(e)};_n.unstable_batchedUpdates=function(e,t){return e(t)};_n.useFormState=function(e,t,n){return pl.H.useFormState(e,t,n)};_n.useFormStatus=function(){return pl.H.useHostTransitionStatus()};_n.version="19.3.1"});var Qv=Gi((JD,Kv)=>{"use strict";function Jv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Jv)}catch(e){console.error(e)}}Jv(),Kv.exports=Zv()});var BM=Gi(Xh=>{"use strict";var Je=Wv(),Py=ul(),lE=Qv();function Z(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function By(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ec(e){for(var t=e,n=t;n&&!n.alternate;)t=n,(t.flags&4098)!==0&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function zy(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Fy(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function jv(e){if(ec(e)!==e)throw Error(Z(188))}function cE(e){var t=e.alternate;if(!t){if(t=ec(e),t===null)throw Error(Z(188));return t!==e?null:e}for(var n=e,i=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(i=a.return,i!==null){n=i;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return jv(a),e;if(s===i)return jv(a),t;s=s.sibling}throw Error(Z(188))}if(n.return!==i.return)n=a,i=s;else{for(var r=!1,o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r){for(o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r)throw Error(Z(189))}}if(n.alternate!==i)throw Error(Z(190))}if(n.tag!==3)throw Error(Z(188));return n.stateNode.current===n?e:t}function Hy(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=Hy(e),t!==null)return t;e=e.sibling}return null}function Pn(e,t,n,i,a,s){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,i,a,s)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&Pn(e.child,t,n,i,a,s))return!0;e=e.sibling}return!1}function ir(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function $v(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),!(e.tag===3||e.tag===5||e.tag===27));)e=e.return;return t}function Vy(e){var t=[null,null],n=ir(e);return n===null||Gy(t,e,n.child,{foundSelf:!1}),t}function Gy(e,t,n,i){for(;n!==null;){if(n===t)i.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(i.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&Gy(e,t,n.child,i))return!0;n=n.sibling}return!1}function Ze(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(Z(559))}}var Fr=null,Xp=null;function uE(e,t,n){return e===n?!0:e===t?(Fr=e,!0):!1}function hE(e,t,n){return e===n?(Xp=e,!1):e===t?(Xp!==null&&(Fr=e),!0):!1}function t_(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function Wp(e,t,n){for(var i=0,a=e;a;a=n(a))i++;a=0;for(var s=t;s;s=n(s))a++;for(;0<i-a;)e=n(e),i--;for(;0<a-i;)t=n(t),a--;for(;i--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var Te=Object.assign,fE=Symbol.for("react.element"),uu=Symbol.for("react.transitional.element"),Sl=Symbol.for("react.portal"),Hr=Symbol.for("react.fragment"),ky=Symbol.for("react.strict_mode"),qp=Symbol.for("react.profiler"),Xy=Symbol.for("react.consumer"),Ji=Symbol.for("react.context"),eg=Symbol.for("react.forward_ref"),Yp=Symbol.for("react.suspense"),Zp=Symbol.for("react.suspense_list"),ng=Symbol.for("react.memo"),Wa=Symbol.for("react.lazy"),Jp=Symbol.for("react.activity"),dE=Symbol.for("react.legacy_hidden"),pE=Symbol.for("react.memo_cache_sentinel"),Kp=Symbol.for("react.view_transition"),mE=Symbol.for("react.recoverable"),e_=Symbol.iterator;function ml(e){return e===null||typeof e!="object"?null:(e=e_&&e[e_]||e["@@iterator"],typeof e=="function"?e:null)}var gE=Symbol.for("react.client.reference");function Qp(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===gE?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Hr:return"Fragment";case qp:return"Profiler";case ky:return"StrictMode";case Yp:return"Suspense";case Zp:return"SuspenseList";case Jp:return"Activity";case Kp:return"ViewTransition"}if(typeof e=="object")switch(e.$$typeof){case Sl:return"Portal";case Ji:return e.displayName||"Context";case Xy:return(e._context.displayName||"Context")+".Consumer";case eg:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ng:return t=e.displayName||null,t!==null?t:Qp(e.type)||"Memo";case Wa:t=e._payload,e=e._init;try{return Qp(e(t))}catch{}}return null}var Ml=Array.isArray,Ft=Py.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,de=lE.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Xs={pending:!1,data:null,method:null,action:null},jp=[],Vr=-1;function na(e){return{current:e}}function fn(e){0>Vr||(e.current=jp[Vr],jp[Vr]=null,Vr--)}function De(e,t){Vr++,jp[Vr]=e.current,e.current=t}var $i=na(null),Fl=na(null),ts=na(null),Ku=na(null);function Qu(e,t){switch(De(ts,t),De(Fl,e),De($i,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?my(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=my(t),e=fM(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}fn($i),De($i,e)}function oo(){fn($i),fn(Fl),fn(ts)}function $p(e){var t=e.memoizedState;t!==null&&(_o._currentValue=t.memoizedState,De(Ku,e)),t=$i.current;var n=fM(t,e.type);t!==n&&(De(Fl,e),De($i,n))}function ju(e){Fl.current===e&&(fn($i),fn(Fl)),Ku.current===e&&(fn(Ku),_o._currentValue=Xs)}var dp,n_;function ka(e){if(dp===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);dp=t&&t[1]||"",n_=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+dp+e+n_}var pp=!1;function mp(e,t){if(!e||pp)return"";pp=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var d=function(){throw Error()};if(Object.defineProperty(d.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(d,[])}catch(g){var u=g}Reflect.construct(e,[],d)}else{try{d.call()}catch(g){u=g}d=!1;try{var p=Object.getOwnPropertyDescriptor(e.prototype,"props");Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),d=!0,new e}finally{d&&(p!==void 0?Object.defineProperty(e.prototype,"props",p):delete e.prototype.props)}}}else{try{throw Error()}catch(g){u=g}(d=e())&&typeof d.catch=="function"&&d.catch(function(){})}}catch(g){if(g&&u&&typeof g.stack=="string")return[g.stack,u.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=i.DetermineComponentFrameRoot(),r=s[0],o=s[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(a=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;if(i===l.length||a===c.length)for(i=l.length-1,a=c.length-1;1<=i&&0<=a&&l[i]!==c[a];)a--;for(;1<=i&&0<=a;i--,a--)if(l[i]!==c[a]){if(i!==1||a!==1)do if(i--,a--,0>a||l[i]!==c[a]){var h=`
`+l[i].replace(" at new "," at ");return e.displayName&&h.includes("<anonymous>")&&(h=h.replace("<anonymous>",e.displayName)),h}while(1<=i&&0<=a);break}}}finally{pp=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?ka(n):""}function vE(e,t){switch(e.tag){case 26:case 27:case 5:return ka(e.type);case 16:return ka("Lazy");case 13:return e.child!==t&&t!==null?ka("Suspense Fallback"):ka("Suspense");case 19:return ka("SuspenseList");case 0:case 15:return mp(e.type,!1);case 11:return mp(e.type.render,!1);case 1:return mp(e.type,!0);case 31:return ka("Activity");case 30:return ka("ViewTransition");default:return""}}function i_(e){try{var t="",n=null;do t+=vE(e,n),n=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var tm=Object.prototype.hasOwnProperty,ig=Je.unstable_scheduleCallback,gp=Je.unstable_cancelCallback,_E=Je.unstable_shouldYield,yE=Je.unstable_requestPaint,Yn=Je.unstable_now,xE=Je.unstable_getCurrentPriorityLevel,Wy=Je.unstable_ImmediatePriority,qy=Je.unstable_UserBlockingPriority,$u=Je.unstable_NormalPriority,SE=Je.unstable_LowPriority,Yy=Je.unstable_IdlePriority,ME=Je.log,bE=Je.unstable_setDisableYieldValue,nc=null,Zn=null;function Za(e){if(typeof ME=="function"&&bE(e),Zn&&typeof Zn.setStrictMode=="function")try{Zn.setStrictMode(nc,e)}catch{}}var Jn=Math.clz32?Math.clz32:AE,EE=Math.log,TE=Math.LN2;function AE(e){return e>>>=0,e===0?32:31-(EE(e)/TE|0)|0}var hu=256,fu=262144,du=4194304;function Fs(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Th(e,t,n){var i=e.pendingLanes;if(i===0)return 0;var a=0,s=e.suspendedLanes,r=e.pingedLanes;e=e.warmLanes;var o=i&134217727;return o!==0?(i=o&~s,i!==0?a=Fs(i):(r&=o,r!==0?a=Fs(r):n||(n=o&~e,n!==0&&(a=Fs(n))))):(o=i&~s,o!==0?a=Fs(o):r!==0?a=Fs(r):n||(n=i&~e,n!==0&&(a=Fs(n)))),a===0?0:t!==0&&t!==a&&(t&s)===0&&(s=a&-a,n=t&-t,s>=n||s===32&&(n&4194048)!==0)?t:a}function ic(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Zy(e,t){(t&8)!==0&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var i=31-Jn(n),a=1<<i;t|=e[i],n&=~a}return t}function wE(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Jy(){var e=du;return du<<=1,(du&62914560)===0&&(du=4194304),e}function vp(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ac(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function CE(e,t,n,i,a,s){var r=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,l=e.expirationTimes,c=e.hiddenUpdates;for(n=r&~n;0<n;){var h=31-Jn(n),d=1<<h;o[h]=0,l[h]=-1;var u=c[h];if(u!==null)for(c[h]=null,h=0;h<u.length;h++){var p=u[h];p!==null&&(p.lane&=-536870913)}n&=~d}i!==0&&Ky(e,i,0),s!==0&&a===0&&e.tag!==0&&(e.suspendedLanes|=s&~(r&~t))}function Ky(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-Jn(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|n&261930}function Qy(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-Jn(n),a=1<<i;a&t|e[i]&t&&(e[i]|=t),n&=~a}}function jy(e,t){var n=t&-t;return n=(n&42)!==0?1:ag(n),(n&(e.suspendedLanes|t))!==0?0:n}function ag(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function sg(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function $y(){var e=de.p;return e!==0?e:(e=window.event,e===void 0?32:OM(e.type))}function a_(e,t){var n=de.p;try{return de.p=e,t()}finally{de.p=n}}var Ta=Math.random().toString(36).slice(2),un="__reactFiber$"+Ta,Bn="__reactProps$"+Ta,So="__reactContainer$"+Ta,s_="__reactEvents$"+Ta,RE="__reactListeners$"+Ta,DE="__reactHandles$"+Ta,r_="__reactResources$"+Ta,sc="__reactMarker$"+Ta,th="__reactLoad$"+Ta;function Ah(e){delete e[un],delete e[Bn],delete e[RE],delete e[DE]}function Gs(e){var t;if(t=e[un])return t;for(var n=e.parentNode;n;){if(t=n[So]||n[un]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=by(e);e!==null;){if(n=e[un])return n;e=by(e)}return t}e=n,n=e.parentNode}return null}function Mo(e){if(e=e[un]||e[So]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function bl(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(Z(33))}function Qr(e){var t=e[r_];return t||(t=e[r_]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function nn(e){e[sc]=!0}function tx(e){e[th]=void 0}var ex=new Set,nx={};function ar(e,t){lo(e,t),lo(e+"Capture",t)}function lo(e,t){for(nx[e]=t,e=0;e<t.length;e++)ex.add(t[e])}var UE=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),o_={},l_={};function NE(e){return tm.call(l_,e)?!0:tm.call(o_,e)?!1:UE.test(e)?l_[e]=!0:(o_[e]=!0,!1)}var ue=!1;function c_(){var e=ue;return ue=!1,e}function Uu(e,t,n){if(NE(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,n)}}function pu(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,n)}}function da(e,t,n,i){if(i===null)e.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,i)}}function kn(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ix(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function LE(e,t,n){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var a=i.get,s=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(r){n=""+r,s.call(this,r)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function em(e){if(!e._valueTracker){var t=ix(e)?"checked":"value";e._valueTracker=LE(e,t,""+e[t])}}function ax(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=ix(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}var OE=/[\n"\\]/g;function fi(e){return e.replace(OE,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function nm(e,t,n,i,a,s,r,o){e.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.type=r:e.removeAttribute("type"),t!=null?r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+kn(t)):e.value!==""+kn(t)&&(e.value=""+kn(t)):r!=="submit"&&r!=="reset"||e.removeAttribute("value"),t!=null?r==="number"&&e.value==t?_p(e,kn(e.value)):_p(e,kn(t)):n!=null?_p(e,kn(n)):i!=null&&e.removeAttribute("value"),a==null&&s!=null&&(e.defaultChecked=!!s),a!=null&&(e.checked=a&&typeof a!="function"&&typeof a!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+kn(o):e.removeAttribute("name")}function sx(e,t,n,i,a,s,r,o){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(e.type=s),t!=null||n!=null){if(!(s!=="submit"&&s!=="reset"||t!=null)){em(e);return}n=n!=null?""+kn(n):"",t=t!=null?""+kn(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}i=i??a,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=o?e.checked:!!i,e.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.name=r),em(e)}function _p(e,t){e.defaultValue!==""+t&&(e.defaultValue=""+t)}function jr(e,t,n,i){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&i&&(e[n].defaultSelected=!0)}else{for(n=""+kn(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,i&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function rx(e,t,n){if(t!=null&&(t=""+kn(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+kn(n):""}function ox(e,t,n,i){if(t==null){if(i!=null){if(n!=null)throw Error(Z(92));if(Ml(i)){if(1<i.length)throw Error(Z(93));i=i[0]}n=i}n==null&&(n=""),t=n}n=kn(t),e.defaultValue=n,i=e.textContent,i===n&&i!==""&&i!==null&&(e.value=i),em(e)}function co(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var IE=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function u_(e,t,n){var i=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,n):typeof n!="number"||n===0||IE.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function lx(e,t,n){if(t!=null&&typeof t!="object")throw Error(Z(62));if(e=e.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="",ue=!0);for(var a in t)i=t[a],t.hasOwnProperty(a)&&n[a]!==i&&(u_(e,a,i),ue=!0)}else for(var s in t)t.hasOwnProperty(s)&&u_(e,s,t[s])}function rg(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var PE=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),BE=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Nu(e){return BE.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Ki(){}var im=null;function og(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Gr=null,$r=null;function h_(e){var t=Mo(e);if(t&&(e=t.stateNode)){var n=e[Bn]||null;t:switch(e=t.stateNode,t.type){case"input":if(nm(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+fi(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var a=i[Bn]||null;if(!a)throw Error(Z(90));nm(i,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)i=n[t],i.form===e.form&&ax(i)}break t;case"textarea":rx(e,n.value,n.defaultValue);break t;case"select":t=n.value,t!=null&&jr(e,!!n.multiple,t,!1)}}}var yp=!1;function cx(e,t,n){if(yp)return e(t,n);yp=!0;try{var i=e(t);return i}finally{if(yp=!1,(Gr!==null||$r!==null)&&(Hh(),Gr&&(t=Gr,e=$r,$r=Gr=null,h_(t),e)))for(t=0;t<e.length;t++)h_(e[t])}}function Hl(e,t){var n=e.stateNode;if(n===null)return null;var i=n[Bn]||null;if(i===null)return null;n=i[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break t;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(Z(231,t,typeof n));return n}var ya=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),am=!1;if(ya)try{Lr={},Object.defineProperty(Lr,"passive",{get:function(){am=!0}}),window.addEventListener("test",Lr,Lr),window.removeEventListener("test",Lr,Lr)}catch{am=!1}var Lr,Ja=null,lg=null,Lu=null;function ux(){if(Lu)return Lu;var e,t=lg,n=t.length,i,a="value"in Ja?Ja.value:Ja.textContent,s=a.length;for(e=0;e<n&&t[e]===a[e];e++);var r=n-e;for(i=1;i<=r&&t[n-i]===a[s-i];i++);return Lu=a.slice(e,1<i?1-i:void 0)}function Ou(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function mu(){return!0}function f_(){return!1}function Cn(e){function t(n,i,a,s,r){this._reactName=n,this._targetInst=a,this.type=i,this.nativeEvent=s,this.target=r,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?mu:f_,this.isPropagationStopped=f_,this}return Te(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=mu)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=mu)},persist:function(){},isPersistent:mu}),t}var ms={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},wh=Cn(ms),rc=Te({},ms,{view:0,detail:0}),zE=Cn(rc),xp,Sp,gl,Ch=Te({},rc,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:cg,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==gl&&(gl&&e.type==="mousemove"?(xp=e.screenX-gl.screenX,Sp=e.screenY-gl.screenY):Sp=xp=0,gl=e),xp)},movementY:function(e){return"movementY"in e?e.movementY:Sp}}),d_=Cn(Ch),FE=Te({},Ch,{dataTransfer:0}),HE=Cn(FE),VE=Te({},rc,{relatedTarget:0}),Mp=Cn(VE),GE=Te({},ms,{animationName:0,elapsedTime:0,pseudoElement:0}),kE=Cn(GE),XE=Te({},ms,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),WE=Cn(XE),qE=Te({},ms,{data:0}),p_=Cn(qE),YE={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ZE={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},JE={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function KE(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=JE[e])?!!t[e]:!1}function cg(){return KE}var QE=Te({},rc,{key:function(e){if(e.key){var t=YE[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ou(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?ZE[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:cg,charCode:function(e){return e.type==="keypress"?Ou(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ou(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),jE=Cn(QE),$E=Te({},Ch,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),m_=Cn($E),tT=Te({},ms,{submitter:0}),eT=Cn(tT),nT=Te({},rc,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:cg}),iT=Cn(nT),aT=Te({},ms,{propertyName:0,elapsedTime:0,pseudoElement:0}),sT=Cn(aT),rT=Te({},Ch,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),oT=Cn(rT),lT=Te({},ms,{newState:0,oldState:0,source:0}),cT=Cn(lT),uT=[9,13,27,32],ug=ya&&"CompositionEvent"in window,Al=null;ya&&"documentMode"in document&&(Al=document.documentMode);var hT=ya&&"TextEvent"in window&&!Al,hx=ya&&(!ug||Al&&8<Al&&11>=Al),g_=" ",v_=!1;function fx(e,t){switch(e){case"keyup":return uT.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function dx(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var kr=!1;function fT(e,t){switch(e){case"compositionend":return dx(t);case"keypress":return t.which!==32?null:(v_=!0,g_);case"textInput":return e=t.data,e===g_&&v_?null:e;default:return null}}function dT(e,t){if(kr)return e==="compositionend"||!ug&&fx(e,t)?(e=ux(),Lu=lg=Ja=null,kr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return hx&&t.locale!=="ko"?null:t.data;default:return null}}var pT={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function __(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!pT[e.type]:t==="textarea"}function px(e,t,n,i){Gr?$r?$r.push(i):$r=[i]:Gr=i,t=Mh(t,"onChange"),0<t.length&&(n=new wh("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var wl=null,Vl=null;function mT(e){cM(e,0)}function Rh(e){var t=bl(e);if(ax(t))return e}function y_(e,t){if(e==="change")return t}var mx=!1;ya&&(ya?(vu="oninput"in document,vu||(bp=document.createElement("div"),bp.setAttribute("oninput","return;"),vu=typeof bp.oninput=="function"),gu=vu):gu=!1,mx=gu&&(!document.documentMode||9<document.documentMode));var gu,vu,bp;function x_(){wl&&(wl.detachEvent("onpropertychange",gx),Vl=wl=null)}function gx(e){if(e.propertyName==="value"&&Rh(Vl)){var t=[];px(t,Vl,e,og(e)),cx(mT,t)}}function gT(e,t,n){e==="focusin"?(x_(),wl=t,Vl=n,wl.attachEvent("onpropertychange",gx)):e==="focusout"&&x_()}function vT(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Rh(Vl)}function _T(e,t){if(e==="click")return Rh(t)}function yT(e,t){if(e==="input"||e==="change")return Rh(t)}function xT(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Qn=typeof Object.is=="function"?Object.is:xT;function Gl(e,t){if(Qn(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var a=n[i];if(!tm.call(t,a)||!Qn(e[a],t[a]))return!1}return!0}function sm(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function S_(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function M_(e,t){var n=S_(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=S_(n)}}function vx(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?vx(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function _x(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=sm(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=sm(e.document)}return t}function hg(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var ST=ya&&"documentMode"in document&&11>=document.documentMode,Xr=null,rm=null,Cl=null,om=!1;function b_(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;om||Xr==null||Xr!==sm(i)||(i=Xr,"selectionStart"in i&&hg(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Cl&&Gl(Cl,i)||(Cl=i,i=Mh(rm,"onSelect"),0<i.length&&(t=new wh("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=Xr)))}function Bs(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Wr={animationend:Bs("Animation","AnimationEnd"),animationiteration:Bs("Animation","AnimationIteration"),animationstart:Bs("Animation","AnimationStart"),transitionrun:Bs("Transition","TransitionRun"),transitionstart:Bs("Transition","TransitionStart"),transitioncancel:Bs("Transition","TransitionCancel"),transitionend:Bs("Transition","TransitionEnd")},Ep={},yx={};ya&&(yx=document.createElement("div").style,"AnimationEvent"in window||(delete Wr.animationend.animation,delete Wr.animationiteration.animation,delete Wr.animationstart.animation),"TransitionEvent"in window||delete Wr.transitionend.transition);function sr(e){if(Ep[e])return Ep[e];if(!Wr[e])return e;var t=Wr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in yx)return Ep[e]=t[n];return e}var xx=sr("animationend"),Sx=sr("animationiteration"),Mx=sr("animationstart"),MT=sr("transitionrun"),bT=sr("transitionstart"),ET=sr("transitioncancel"),bx=sr("transitionend"),Ex=new Map,lm="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");lm.push("scrollEnd");function Ui(e,t){Ex.set(e,t),ar(t,[e])}var TT=0;function xa(e,t){if(e.name!=null&&e.name!=="auto")return e.name;if(t.autoName!==null)return t.autoName;e=Di.identifierPrefix;var n=TT++;return e="_"+e+"t_"+n.toString(32)+"_",t.autoName=e}function E_(e){if(e==null||typeof e=="string")return e;var t=null,n=ro;if(n!==null)for(var i=0;i<n.length;i++){var a=e[n[i]];if(a!=null){if(a==="none")return"none";t=t==null?a:t+(" "+a)}}return t??e.default}function Aa(e,t){return e=E_(e),t=E_(t),t==null?e==="auto"?null:e:t==="auto"?null:t}var eh=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},ci=[],qr=0,fg=0;function Dh(){for(var e=qr,t=fg=qr=0;t<e;){var n=ci[t];ci[t++]=null;var i=ci[t];ci[t++]=null;var a=ci[t];ci[t++]=null;var s=ci[t];if(ci[t++]=null,i!==null&&a!==null){var r=i.pending;r===null?a.next=a:(a.next=r.next,r.next=a),i.pending=a}s!==0&&Tx(n,a,s)}}function Uh(e,t,n,i){ci[qr++]=e,ci[qr++]=t,ci[qr++]=n,ci[qr++]=i,fg|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function dg(e,t,n,i){return Uh(e,t,n,i),nh(e)}function rr(e,t){return Uh(e,null,null,t),nh(e)}function Tx(e,t,n){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n);for(var a=!1,s=e.return;s!==null;)s.childLanes|=n,i=s.alternate,i!==null&&(i.childLanes|=n),s.tag===22&&(e=s.stateNode,e===null||e._visibility&1||(a=!0)),e=s,s=s.return;return e.tag===3?(s=e.stateNode,a&&t!==null&&(a=31-Jn(n),e=s.hiddenUpdates,i=e[a],i===null?e[a]=[t]:i.push(t),t.lane=n|536870912),s):null}function nh(e){if(50<zl)throw zl=0,Xu=null,Error(Z(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Yr={};function AT(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function On(e,t,n,i){return new AT(e,t,n,i)}function pg(e){return e=e.prototype,!(!e||!e.isReactComponent)}function va(e,t){var n=e.alternate;return n===null?(n=On(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Ax(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Iu(e,t,n,i,a,s){var r=0;if(i=e,typeof i=="function")pg(i)&&(r=1);else if(typeof i=="string")r=jA(e,n,$i.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(i){case Jp:return e=On(31,n,t,a),e.elementType=Jp,e.lanes=s,e;case Hr:return Ws(n.children,a,s,t);case ky:r=8,a|=24;break;case qp:return e=On(12,n,t,a|2),e.elementType=qp,e.lanes=s,e;case Yp:return e=On(13,n,t,a),e.elementType=Yp,e.lanes=s,e;case Zp:return e=On(19,n,t,a),e.elementType=Zp,e.lanes=s,e;case dE:case Kp:return e=a|32,e=On(30,n,t,e),e.elementType=Kp,e.lanes=s,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof i=="object"&&i!==null)switch(i.$$typeof){case Ji:r=10;break t;case Xy:r=9;break t;case eg:r=11;break t;case ng:r=14;break t;case Wa:r=16,i=null;break t}r=29,n=Error(Z(130,e===null?"null":typeof e,"")),i=null}return t=On(r,n,t,a),t.elementType=e,t.type=i,t.lanes=s,t}function Ws(e,t,n,i){return e=On(7,e,i,t),e.lanes=n,e}function Tp(e,t,n){return e=On(6,e,null,t),e.lanes=n,e}function wx(e){var t=On(18,null,null,0);return t.stateNode=e,t}function Ap(e,t,n){return t=On(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var T_=new WeakMap;function di(e,t){if(typeof e=="object"&&e!==null){var n=T_.get(e);return n!==void 0?n:(t={value:e,source:t,stack:i_(t)},T_.set(e,t),t)}return{value:e,source:t,stack:i_(t)}}var Zr=[],Jr=0,ih=null,kl=0,ui=[],hi=0,us=null,Qi=1,ji="";function ma(e,t){Zr[Jr++]=kl,Zr[Jr++]=ih,ih=e,kl=t}function Cx(e,t,n){ui[hi++]=Qi,ui[hi++]=ji,ui[hi++]=us,us=e;var i=Qi;e=ji;var a=32-Jn(i)-1;i&=~(1<<a),n+=1;var s=32-Jn(t)+a;if(30<s){var r=a-a%5;s=(i&(1<<r)-1).toString(32),i>>=r,a-=r,Qi=1<<32-Jn(t)+a|n<<a|i,ji=s+e}else Qi=1<<s|n<<a|i,ji=e}function Nh(e){e.return!==null&&(ma(e,1),Cx(e,1,0))}function mg(e){for(;e===ih;)ih=Zr[--Jr],Zr[Jr]=null,kl=Zr[--Jr],Zr[Jr]=null;for(;e===us;)us=ui[--hi],ui[hi]=null,ji=ui[--hi],ui[hi]=null,Qi=ui[--hi],ui[hi]=null}function Rx(e,t){ui[hi++]=Qi,ui[hi++]=ji,ui[hi++]=us,Qi=t.id,ji=t.overflow,us=e}var an=null,Re=null,Jt=!1,es=null,pi=!1,cm=Error(Z(519));function hs(e){var t=Error(Z(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Xl(di(t,e)),cm}function A_(e){var t=e.stateNode,n=e.type,i=e.memoizedProps;switch(t[un]=e,t[Bn]=i,n){case"dialog":jt("cancel",t),jt("close",t);break;case"iframe":case"object":case"embed":jt("load",t);break;case"video":case"audio":for(n=0;n<Zl.length;n++)jt(Zl[n],t);break;case"source":jt("error",t);break;case"img":case"image":case"link":jt("error",t),jt("load",t);break;case"details":jt("toggle",t);break;case"input":jt("invalid",t),sx(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":jt("invalid",t);break;case"textarea":jt("invalid",t),ox(t,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||i.suppressHydrationWarning===!0||hM(t.textContent,n)?(i.popover!=null&&(jt("beforetoggle",t),jt("toggle",t)),i.onScroll!=null&&jt("scroll",t),i.onScrollEnd!=null&&jt("scrollend",t),i.onClick!=null&&(t.onclick=Ki),t=!0):t=!1,t||hs(e,!0)}function ah(e){for(an=e.return;an;)switch(an.tag){case 5:case 31:case 13:pi=!1;return;case 27:case 3:pi=!0;return;default:an=an.return}}function Or(e){if(e!==an)return!1;if(!Jt)return ah(e),Jt=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||Ym(e.type,e.memoizedProps)),n=!n),n&&Re&&hs(e),ah(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(Z(317));Re=My(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(Z(317));Re=My(e)}else t===27?(t=Re,gs(e.type)?(e=Qm,Qm=null,Re=e):Re=t):Re=an?mi(e.stateNode.nextSibling):null;return!0}function Js(){Re=an=null,Jt=!1}function wp(){var e=es;return e!==null&&(Nn===null?Nn=e:Nn.push.apply(Nn,e),es=null),e}function Xl(e){es===null?es=[e]:es.push(e)}var um=na(null),or=null,ga=null;function Ka(e,t,n){De(um,t._currentValue),t._currentValue=n}function _a(e){e._currentValue=um.current,fn(um)}function Pu(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function hm(e,t,n,i){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var s=a.dependencies;if(s!==null){var r=a.child;s=s.firstContext;t:for(;s!==null;){var o=s;s=a;for(var l=0;l<t.length;l++)if(o.context===t[l]){s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Pu(s.return,n,e),i||(r=null);break t}s=o.next}}else if(a.tag===18){if(r=a.return,r===null)throw Error(Z(341));r.lanes|=n,s=r.alternate,s!==null&&(s.lanes|=n),Pu(r,n,e),r=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,r=a.alternate,r!==null&&(r.lanes|=n),Pu(a.return,n,e),r=a.child,r=r!==null?r.sibling:null):r=a.child;if(r!==null)r.return=a;else for(r=a;r!==null;){if(r===e){r=null;break}if(a=r.sibling,a!==null){a.return=r.return,r=a;break}r=r.return}a=r}}function Ks(e,t,n,i){e=null;for(var a=t,s=!1;a!==null;){if(!s){if((a.flags&524288)!==0)s=!0;else if((a.flags&262144)!==0)break}if(a.tag===10){var r=a.alternate;if(r===null)throw Error(Z(387));if(r=r.memoizedProps,r!==null){var o=a.type;Qn(a.pendingProps.value,r.value)||(e!==null?e.push(o):e=[o])}}else if(a===Ku.current){if(r=a.alternate,r===null)throw Error(Z(387));r.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e!==null?e.push(_o):e=[_o])}a=a.return}return e!==null&&hm(t,e,n,i),t.flags|=262144,e!==null}function sh(e){for(e=e.firstContext;e!==null;){if(!Qn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Qs(e){or=e,ga=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function hn(e){return Dx(or,e)}function _u(e,t){return or===null&&Qs(e),Dx(e,t)}function Dx(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},ga===null){if(e===null)throw Error(Z(308));ga=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ga=ga.next=t;return n}var wT=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},CT=Je.unstable_scheduleCallback,RT=Je.unstable_NormalPriority,ke={$$typeof:Ji,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function gg(){return{controller:new wT,data:new Map,refCount:0}}function oc(e){e.refCount--,e.refCount===0&&CT(RT,function(){e.controller.abort()})}function w_(e,t){if((e.pendingLanes&4194048)!==0){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var i=t[e];n.indexOf(i)===-1&&n.push(i)}}}var El=null;function DT(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Rl=null,fm=0,js=0,to=null;function UT(e,t){if(Rl===null){var n=Rl=[];fm=0,js=Xg(),to={status:"pending",value:void 0,then:function(i){n.push(i)}}}return fm++,t.then(C_,C_),t}function C_(){if(--fm===0&&(El=null,Rl!==null)){to!==null&&(to.status="fulfilled");var e=Rl;Rl=null,js=0,to=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function NT(e,t){var n=[],i={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var a=0;a<n.length;a++)(0,n[a])(t)},function(a){for(i.status="rejected",i.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),i}var R_=Ft.S;Ft.S=function(e,t){if(ZS=Yn(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&UT(e,t),El!==null)for(var n=mo;n!==null;)w_(n,El),n=n.next;if(n=e.types,n!==null){for(var i=mo;i!==null;)w_(i,n),i=i.next;if(js!==0){i=El,i===null&&(i=El=[]);for(var a=0;a<n.length;a++){var s=n[a];i.indexOf(s)===-1&&i.push(s)}}}R_!==null&&R_(e,t)};var qs=na(null);function vg(){var e=qs.current;return e!==null?e:Ee.pooledCache}function Bu(e,t){t===null?De(qs,qs.current):De(qs,t.pool)}function Ux(){var e=vg();return e===null?null:{parent:ke._currentValue,pool:e}}var bo=Error(Z(460)),_g=Error(Z(474)),Lh=Error(Z(542)),rh={then:function(){}};function D_(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Nx(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Ki,Ki),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,N_(e),e===void 0&&!("reason"in t)?Error(Z(600)):e;default:if(typeof t.status=="string")t.then(Ki,Ki);else{if(e=Ee,e!==null&&100<e.shellSuspendCounter)throw Error(Z(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var a=t;a.status="fulfilled",a.value=i}},function(i){if(t.status==="pending"){var a=t;a.status="rejected",a.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,N_(e),e}throw Ys=t,bo}}function Hs(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Ys=n,bo):n}}var Ys=null;function U_(){if(Ys===null)throw Error(Z(459));var e=Ys;return Ys=null,e}function N_(e){if(e===bo||e===Lh)throw Error(Z(483))}var eo=null,Wl=0;function yu(e){var t=Wl;return Wl+=1,eo===null&&(eo=[]),Nx(eo,e,t)}function Ga(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function xu(e,t){throw t.$$typeof===fE?Error(Z(525)):(e=Object.prototype.toString.call(t),Error(Z(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Lx(e){function t(f,v){if(e){var _=f.deletions;_===null?(f.deletions=[v],f.flags|=16):_.push(v)}}function n(f,v){if(!e)return null;for(;v!==null;)t(f,v),v=v.sibling;return null}function i(f){for(var v=new Map;f!==null;)f.key===null?v.set(f.index,f):v.set(f.key,f),f=f.sibling;return v}function a(f,v){return f=va(f,v),f.index=0,f.sibling=null,f}function s(f,v,_){return f.index=_,e?(_=f.alternate,_!==null?(_=_.index,_<v?(f.flags|=2,v):_):(f.flags|=134217730,v)):(f.flags|=1048576,v)}function r(f){return e&&f.alternate===null&&(f.flags|=134217730),f}function o(f,v,_,y){return v===null||v.tag!==6?(v=Tp(_,f.mode,y),v.return=f,v):(v=a(v,_),v.return=f,v)}function l(f,v,_,y){var T=_.type;return T===Hr?(f=h(f,v,_.props.children,y,_.key),Ga(f,_),f):v!==null&&(v.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Wa&&Hs(T)===v.type)?(v=a(v,_.props),Ga(v,_),v.return=f,v):(v=Iu(_.type,_.key,_.props,null,f.mode,y),Ga(v,_),v.return=f,v)}function c(f,v,_,y){return v===null||v.tag!==4||v.stateNode.containerInfo!==_.containerInfo||v.stateNode.implementation!==_.implementation?(v=Ap(_,f.mode,y),v.return=f,v):(v=a(v,_.children||[]),v.return=f,v)}function h(f,v,_,y,T){return v===null||v.tag!==7?(v=Ws(_,f.mode,y,T),v.return=f,v):(v=a(v,_),v.return=f,v)}function d(f,v,_){if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return v=Tp(""+v,f.mode,_),v.return=f,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case uu:return _=Iu(v.type,v.key,v.props,null,f.mode,_),Ga(_,v),_.return=f,_;case Sl:return v=Ap(v,f.mode,_),v.return=f,v;case Wa:return v=Hs(v),d(f,v,_)}if(Ml(v)||ml(v))return v=Ws(v,f.mode,_,null),v.return=f,v;if(typeof v.then=="function")return d(f,yu(v),_);if(v.$$typeof===Ji)return d(f,_u(f,v),_);xu(f,v)}return null}function u(f,v,_,y){var T=v!==null?v.key:null;if(typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint")return T!==null?null:o(f,v,""+_,y);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case uu:return _.key===T?l(f,v,_,y):null;case Sl:return _.key===T?c(f,v,_,y):null;case Wa:return _=Hs(_),u(f,v,_,y)}if(Ml(_)||ml(_))return T!==null?null:h(f,v,_,y,null);if(typeof _.then=="function")return u(f,v,yu(_),y);if(_.$$typeof===Ji)return u(f,v,_u(f,_),y);xu(f,_)}return null}function p(f,v,_,y,T){if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return f=f.get(_)||null,o(v,f,""+y,T);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case uu:return f=f.get(y.key===null?_:y.key)||null,l(v,f,y,T);case Sl:return f=f.get(y.key===null?_:y.key)||null,c(v,f,y,T);case Wa:return y=Hs(y),p(f,v,_,y,T)}if(Ml(y)||ml(y))return f=f.get(_)||null,h(v,f,y,T,null);if(typeof y.then=="function")return p(f,v,_,yu(y),T);if(y.$$typeof===Ji)return p(f,v,_,_u(v,y),T);xu(v,y)}return null}function g(f,v,_,y){for(var T=null,C=null,w=v,D=v=0,E=null;w!==null&&D<_.length;D++){w.index>D?(E=w,w=null):E=w.sibling;var S=u(f,w,_[D],y);if(S===null){w===null&&(w=E);break}e&&w&&S.alternate===null&&t(f,w),v=s(S,v,D),C===null?T=S:C.sibling=S,C=S,w=E}if(D===_.length)return n(f,w),Jt&&ma(f,D),T;if(w===null){for(;D<_.length;D++)w=d(f,_[D],y),w!==null&&(v=s(w,v,D),C===null?T=w:C.sibling=w,C=w);return Jt&&ma(f,D),T}for(w=i(w);D<_.length;D++)E=p(w,f,D,_[D],y),E!==null&&(e&&(S=E.alternate,S!==null&&w.delete(S.key===null?D:S.key)),v=s(E,v,D),C===null?T=E:C.sibling=E,C=E);return e&&w.forEach(function(U){return t(f,U)}),Jt&&ma(f,D),T}function x(f,v,_,y){if(_==null)throw Error(Z(151));for(var T=null,C=null,w=v,D=v=0,E=null,S=_.next();w!==null&&!S.done;D++,S=_.next()){w.index>D?(E=w,w=null):E=w.sibling;var U=u(f,w,S.value,y);if(U===null){w===null&&(w=E);break}e&&w&&U.alternate===null&&t(f,w),v=s(U,v,D),C===null?T=U:C.sibling=U,C=U,w=E}if(S.done)return n(f,w),Jt&&ma(f,D),T;if(w===null){for(;!S.done;D++,S=_.next())S=d(f,S.value,y),S!==null&&(v=s(S,v,D),C===null?T=S:C.sibling=S,C=S);return Jt&&ma(f,D),T}for(w=i(w);!S.done;D++,S=_.next())S=p(w,f,D,S.value,y),S!==null&&(e&&(E=S.alternate,E!==null&&w.delete(E.key===null?D:E.key)),v=s(S,v,D),C===null?T=S:C.sibling=S,C=S);return e&&w.forEach(function(B){return t(f,B)}),Jt&&ma(f,D),T}function m(f,v,_,y){if(typeof _=="object"&&_!==null&&_.type===Hr&&_.key===null&&_.props.ref===void 0&&(_=_.props.children),typeof _=="object"&&_!==null){switch(_.$$typeof){case uu:t:{for(var T=_.key;v!==null;){if(v.key===T){if(T=_.type,T===Hr){if(v.tag===7){n(f,v.sibling),y=a(v,_.props.children),Ga(y,_),y.return=f,f=y;break t}}else if(v.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Wa&&Hs(T)===v.type){n(f,v.sibling),y=a(v,_.props),Ga(y,_),y.return=f,f=y;break t}n(f,v);break}else t(f,v);v=v.sibling}_.type===Hr?(y=Ws(_.props.children,f.mode,y,_.key),Ga(y,_),y.return=f,f=y):(y=Iu(_.type,_.key,_.props,null,f.mode,y),Ga(y,_),y.return=f,f=y)}return r(f);case Sl:t:{for(T=_.key;v!==null;){if(v.key===T)if(v.tag===4&&v.stateNode.containerInfo===_.containerInfo&&v.stateNode.implementation===_.implementation){n(f,v.sibling),y=a(v,_.children||[]),y.return=f,f=y;break t}else{n(f,v);break}else t(f,v);v=v.sibling}y=Ap(_,f.mode,y),y.return=f,f=y}return r(f);case Wa:return _=Hs(_),m(f,v,_,y)}if(Ml(_))return g(f,v,_,y);if(ml(_)){if(T=ml(_),typeof T!="function")throw Error(Z(150));return _=T.call(_),x(f,v,_,y)}if(typeof _.then=="function")return m(f,v,yu(_),y);if(_.$$typeof===Ji)return m(f,v,_u(f,_),y);xu(f,_)}return typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint"?(_=""+_,v!==null&&v.tag===6?(n(f,v.sibling),y=a(v,_),y.return=f,f=y):(n(f,v),y=Tp(_,f.mode,y),y.return=f,f=y),r(f)):n(f,v)}return function(f,v,_,y){try{Wl=0;var T=m(f,v,_,y);return eo=null,T}catch(w){if(w===bo||w===Lh)throw w;var C=On(29,w,null,f.mode);return C.lanes=y,C.return=f,C}}}var $s=Lx(!0),Ox=Lx(!1),qa=!1;function yg(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function dm(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ns(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function is(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(fe&2)!==0){var a=i.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),i.pending=t,t=nh(e),Tx(e,null,n),t}return Uh(e,i,t,n),nh(e)}function Dl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,Qy(e,n)}}function Cp(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var a=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};s===null?a=s=r:s=s.next=r,n=n.next}while(n!==null);s===null?a=s=t:s=s.next=t}else a=s=t;n={baseState:i.baseState,firstBaseUpdate:a,lastBaseUpdate:s,shared:i.shared,callbacks:i.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var pm=!1;function Ul(){if(pm){var e=to;if(e!==null)throw e}}function Nl(e,t,n,i){pm=!1;var a=e.updateQueue;qa=!1;var s=a.firstBaseUpdate,r=a.lastBaseUpdate,o=a.shared.pending;if(o!==null){a.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?s=c:r.next=c,r=l;var h=e.alternate;h!==null&&(h=h.updateQueue,o=h.lastBaseUpdate,o!==r&&(o===null?h.firstBaseUpdate=c:o.next=c,h.lastBaseUpdate=l))}if(s!==null){var d=a.baseState;r=0,h=c=l=null,o=s;do{var u=o.lane&-536870913,p=u!==o.lane;if(p?(ee&u)===u:(i&u)===u){u!==0&&u===js&&(pm=!0),h!==null&&(h=h.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});t:{var g=e,x=o;u=t;var m=n;switch(x.tag){case 1:if(g=x.payload,typeof g=="function"){d=g.call(m,d,u);break t}d=g;break t;case 3:g.flags=g.flags&-65537|128;case 0:if(g=x.payload,u=typeof g=="function"?g.call(m,d,u):g,u==null)break t;d=Te({},d,u);break t;case 2:qa=!0}}u=o.callback,u!==null&&(e.flags|=64,p&&(e.flags|=8192),p=a.callbacks,p===null?a.callbacks=[u]:p.push(u))}else p={lane:u,tag:o.tag,payload:o.payload,callback:o.callback,next:null},h===null?(c=h=p,l=d):h=h.next=p,r|=u;if(o=o.next,o===null){if(o=a.shared.pending,o===null)break;p=o,o=p.next,p.next=null,a.lastBaseUpdate=p,a.shared.pending=null}}while(!0);h===null&&(l=d),a.baseState=l,a.firstBaseUpdate=c,a.lastBaseUpdate=h,s===null&&(a.shared.lanes=0),ps|=r,e.lanes=r,e.memoizedState=d}}function Ix(e,t){if(typeof e!="function")throw Error(Z(191,e));e.call(t)}function Px(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Ix(n[e],t)}var fs=na(null),oh=na(0);function L_(e,t){e=Ea,De(oh,e),De(fs,t),Ea=e|t.baseLanes}function mm(){De(oh,Ea),De(fs,fs.current)}function xg(){Ea=oh.current,fn(fs),fn(oh)}var mn=na(null),yn=null;function as(e){var t=e.alternate;De(dn,dn.current&1),De(mn,e),yn===null&&(t===null||fs.current!==null||t.memoizedState!==null)&&(yn=e)}function gm(e){De(dn,dn.current),De(mn,e),yn===null&&(yn=e)}function Bx(e){e.tag===22?(De(dn,dn.current),De(mn,e),yn===null&&(yn=e)):ss()}function ss(){De(dn,dn.current),De(mn,mn.current)}function Xn(e){fn(mn),yn===e&&(yn=null),fn(dn)}var dn=na(0);function ql(e,t){De(mn,mn.current),De(dn,t)}function Sg(e){fn(dn),fn(mn),yn===e&&(yn=null)}function lh(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Km(n)||Zg(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!=="independent"){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Sa=0,Xt=null,be=null,Ge=null,ch=!1,no=!1,tr=!1,uh=0,Yl=0,io=null,LT=0;function Be(){throw Error(Z(321))}function Mg(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Qn(e[n],t[n]))return!1;return!0}function bg(e,t,n,i,a,s){return Sa=s,Xt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Ft.H=e===null||e.memoizedState===null?pS:mS,tr=!1,s=n(i,a),tr=!1,no&&(s=Fx(t,n,i,a)),zx(e),s}function zx(e){Ft.H=hh;var t=be!==null&&be.next!==null;if(Sa=0,Ge=be=Xt=null,ch=!1,Yl=0,io=null,t)throw Error(Z(300));e===null||Xe||(e=e.dependencies,e!==null&&sh(e)&&(Xe=!0))}function Fx(e,t,n,i){Xt=e;var a=0;do{if(no&&(io=null),Yl=0,no=!1,25<=a)throw Error(Z(301));if(a+=1,Ge=be=null,e.updateQueue!=null){var s=e.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}Ft.H=VT,s=t(n,i)}while(no);return s}function OT(){var e=Ft.H,t=e.useState()[0];return t=typeof t.then=="function"?lc(t):t,e=e.useState()[0],(be!==null?be.memoizedState:null)!==e&&(Xt.flags|=1024),t}function Eg(){var e=uh!==0;return uh=0,e}function Tg(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Ag(e){if(ch){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}ch=!1}Sa=0,Ge=be=Xt=null,no=!1,Yl=uh=0,io=null}function wn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ge===null?Xt.memoizedState=Ge=e:Ge=Ge.next=e,Ge}function Fe(){if(be===null){var e=Xt.alternate;e=e!==null?e.memoizedState:null}else e=be.next;var t=Ge===null?Xt.memoizedState:Ge.next;if(t!==null)Ge=t,be=e;else{if(e===null)throw Xt.alternate===null?Error(Z(467)):Error(Z(310));be=e,e={memoizedState:be.memoizedState,baseState:be.baseState,baseQueue:be.baseQueue,queue:be.queue,next:null},Ge===null?Xt.memoizedState=Ge=e:Ge=Ge.next=e}return Ge}function Oh(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function lc(e){var t=Yl;return Yl+=1,io===null&&(io=[]),e=Nx(io,e,t),t=Xt,(Ge===null?t.memoizedState:Ge.next)===null&&(t=t.alternate,Ft.H=t===null||t.memoizedState===null?pS:mS),e}function Ih(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return lc(e);if(e.$$typeof===mE)return;if(e.$$typeof===Ji)return hn(e)}throw Error(Z(438,String(e)))}function wg(e){var t=null,n=Xt.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var i=Xt.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(a){return a.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=Oh(),Xt.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),i=0;i<e;i++)n[i]=pE;return t.index++,n}function Ma(e,t){return typeof t=="function"?t(e):t}function zu(e){var t=Fe();return Cg(t,be,e)}function Cg(e,t,n){var i=e.queue;if(i===null)throw Error(Z(311));i.lastRenderedReducer=n;var a=e.baseQueue,s=i.pending;if(s!==null){if(a!==null){var r=a.next;a.next=s.next,s.next=r}t.baseQueue=a=s,i.pending=null}if(s=e.baseState,a===null)e.memoizedState=s;else{t=a.next;var o=r=null,l=null,c=t,h=!1;do{var d=c.lane&-536870913;if(d!==c.lane?(ee&d)===d:(Sa&d)===d){var u=c.revertLane;if(u===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),d===js&&(h=!0);else if((Sa&u)===u){c=c.next,u===js&&(h=!0);continue}else d={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=d,r=s):l=l.next=d,Xt.lanes|=u,ps|=u;d=c.action,tr&&n(s,d),s=c.hasEagerState?c.eagerState:n(s,d)}else u={lane:d,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=u,r=s):l=l.next=u,Xt.lanes|=d,ps|=d;c=c.next}while(c!==null&&c!==t);if(l===null?r=s:l.next=o,!Qn(s,e.memoizedState)&&(Xe=!0,h&&(n=to,n!==null)))throw n;e.memoizedState=s,e.baseState=r,e.baseQueue=l,i.lastRenderedState=s}return a===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function Rp(e){var t=Fe(),n=t.queue;if(n===null)throw Error(Z(311));n.lastRenderedReducer=e;var i=n.dispatch,a=n.pending,s=t.memoizedState;if(a!==null){n.pending=null;var r=a=a.next;do s=e(s,r.action),r=r.next;while(r!==a);Qn(s,t.memoizedState)||(Xe=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),n.lastRenderedState=s}return[s,i]}function Hx(e,t,n){var i=Xt,a=Fe(),s=Jt;if(s){if(n===void 0)throw Error(Z(407));n=n()}else n=t();var r=!Qn((be||a).memoizedState,n);if(r&&(a.memoizedState=n,Xe=!0),a=a.queue,Rg(kx.bind(null,i,a,e),[e]),e=a.getSnapshot!==t||r||Ge!==null&&(Ge.memoizedState.tag&1)!==0,uo(e?9:8,{destroy:void 0},Gx.bind(null,i,a,n,t),null),e){if(i.flags|=2048,Ee===null)throw Error(Z(349));s||(Sa&127)!==0||Vx(i,t,n)}return n}function Vx(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Xt.updateQueue,t===null?(t=Oh(),Xt.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Gx(e,t,n,i){t.value=n,t.getSnapshot=i,Xx(t)&&Wx(e)}function kx(e,t,n){return n(function(){Xx(t)&&Wx(e)})}function Xx(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Qn(e,n)}catch{return!0}}function Wx(e){var t=rr(e,2);t!==null&&In(t,e,2)}function vm(e){var t=wn();if(typeof e=="function"){var n=e;if(e=n(),tr){Za(!0);try{n()}finally{Za(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ma,lastRenderedState:e},t}function qx(e,t,n,i){return e.baseState=n,Cg(e,be,typeof i=="function"?i:Ma)}function IT(e,t,n,i,a){if(Bh(e))throw Error(Z(485));if(e=t.action,e!==null){var s={payload:a,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){s.listeners.push(r)}};Ft.T!==null?n(!0):s.isTransition=!1,i(s),n=t.pending,n===null?(s.next=t.pending=s,Yx(t,s)):(s.next=n.next,t.pending=n.next=s)}}function Yx(e,t){var n=t.action,i=t.payload,a=e.state;if(t.isTransition){var s=Ft.T,r={};r.types=s!==null?s.types:null,Ft.T=r;try{var o=n(a,i),l=Ft.S;l!==null&&l(r,o),O_(e,t,o)}catch(c){_m(e,t,c)}finally{s!==null&&r.types!==null&&(s.types=r.types),Ft.T=s}}else try{s=n(a,i),O_(e,t,s)}catch(c){_m(e,t,c)}}function O_(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){I_(e,t,i)},function(i){return _m(e,t,i)}):I_(e,t,n)}function I_(e,t,n){t.status="fulfilled",t.value=n,Zx(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Yx(e,n)))}function _m(e,t,n){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=n,Zx(t),t=t.next;while(t!==i)}e.action=null}function Zx(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Jx(e,t){return t}function P_(e,t){if(Jt){var n=Ee.formState;if(n!==null){t:{var i=Xt;if(Jt){if(Re){e:{for(var a=Re,s=pi;a.nodeType!==8;){if(!s){a=null;break e}if(a=mi(a.nextSibling),a===null){a=null;break e}}s=a.data,a=s==="F!"||s==="F"?a:null}if(a){Re=mi(a.nextSibling),i=a.data==="F!";break t}}hs(i)}i=!1}i&&(t=n[0])}}return n=wn(),n.memoizedState=n.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Jx,lastRenderedState:t},n.queue=i,n=hS.bind(null,Xt,i),i.dispatch=n,i=vm(!1),s=Lg.bind(null,Xt,!1,i.queue),i=wn(),a={state:t,dispatch:null,action:e,pending:null},i.queue=a,n=IT.bind(null,Xt,a,s,n),a.dispatch=n,i.memoizedState=e,[t,n,!1]}function B_(e){var t=Fe();return Kx(t,be,e)}function Kx(e,t,n){if(t=Cg(e,t,Jx)[0],e=zu(Ma)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=lc(t)}catch(r){throw r===bo?Lh:r}else i=t;t=Fe();var a=t.queue,s=a.dispatch;return n!==t.memoizedState&&(Xt.flags|=2048,uo(9,{destroy:void 0},PT.bind(null,a,n),null)),[i,s,e]}function PT(e,t){e.action=t}function z_(e){var t=Fe(),n=be;if(n!==null)return Kx(t,n,e);Fe(),t=t.memoizedState,n=Fe();var i=n.queue.dispatch;return n.memoizedState=e,[t,i,!1]}function uo(e,t,n,i){return e={tag:e,create:n,deps:i,inst:t,next:null},t=Xt.updateQueue,t===null&&(t=Oh(),Xt.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e),e}function Qx(){return Fe().memoizedState}function Fu(e,t,n,i){var a=wn();Xt.flags|=e,a.memoizedState=uo(1|t,{destroy:void 0},n,i===void 0?null:i)}function Ph(e,t,n,i){var a=Fe();i=i===void 0?null:i;var s=a.memoizedState.inst;be!==null&&i!==null&&Mg(i,be.memoizedState.deps)?a.memoizedState=uo(t,s,n,i):(Xt.flags|=e,a.memoizedState=uo(1|t,s,n,i))}function F_(e,t){Fu(8390656,8,e,t)}function Rg(e,t){Ph(2048,8,e,t)}function BT(e){Xt.flags|=4;var t=Xt.updateQueue;if(t===null)t=Oh(),Xt.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function jx(e){var t=Fe().memoizedState;return BT({ref:t,nextImpl:e}),function(){if((fe&2)!==0)throw Error(Z(440));return t.impl.apply(void 0,arguments)}}function $x(e,t){return Ph(4,2,e,t)}function tS(e,t){return Ph(4,4,e,t)}function eS(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function nS(e,t,n){n=n!=null?n.concat([e]):null,Ph(4,4,eS.bind(null,t,e),n)}function Dg(){}function iS(e,t){var n=Fe();t=t===void 0?null:t;var i=n.memoizedState;return t!==null&&Mg(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function aS(e,t){var n=Fe();t=t===void 0?null:t;var i=n.memoizedState;if(t!==null&&Mg(t,i[1]))return i[0];if(i=e(),tr){Za(!0);try{e()}finally{Za(!1)}}return n.memoizedState=[i,t],i}function Ug(e,t,n){return n===void 0||(Sa&1073741824)!==0&&(ee&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=KS(),Xt.lanes|=e,ps|=e,n)}function sS(e,t,n,i){return Qn(n,t)?n:fs.current!==null?(e=Ug(e,n,i),Qn(e,t)||(Xe=!0),e):(Sa&106)===0||(Sa&1073741824)!==0&&(ee&261930)===0?(Xe=!0,e.memoizedState=n):(e=KS(),Xt.lanes|=e,ps|=e,t)}function rS(e,t,n,i,a){var s=de.p;de.p=s!==0&&8>s?s:8;var r=Ft.T,o={};o.types=r!==null?r.types:null,Ft.T=o,Lg(e,!1,t,n);try{var l=a(),c=Ft.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var h=NT(l,i);Ll(e,t,h,Kn(e))}else Ll(e,t,i,Kn(e))}catch(d){Ll(e,t,{then:function(){},status:"rejected",reason:d},Kn())}finally{de.p=s,r!==null&&o.types!==null&&(r.types=o.types),Ft.T=r}}function zT(){}function ym(e,t,n,i){if(e.tag!==5)throw Error(Z(476));var a=oS(e).queue;rS(e,a,t,Xs,n===null?zT:function(){return lS(e),n(i)})}function oS(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:Xs,baseState:Xs,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ma,lastRenderedState:Xs},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ma,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function lS(e){var t=oS(e);t.next===null&&(t=e.alternate.memoizedState),Ll(e,t.next.queue,{},Kn())}function Ng(){return hn(_o)}function cS(){return Fe().memoizedState}function uS(){return Fe().memoizedState}function FT(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Kn();e=ns(n);var i=is(t,e,n);i!==null&&(In(i,t,n),Dl(i,t,n)),t={cache:gg()},e.payload=t;return}t=t.return}}function HT(e,t,n){var i=Kn();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Bh(e)?fS(t,n):(n=dg(e,t,n,i),n!==null&&(In(n,e,i),dS(n,t,i)))}function hS(e,t,n){var i=Kn();Ll(e,t,n,i)}function Ll(e,t,n,i){var a={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Bh(e))fS(t,a);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var r=t.lastRenderedState,o=s(r,n);if(a.hasEagerState=!0,a.eagerState=o,Qn(o,r))return Uh(e,t,a,0),Ee===null&&Dh(),!1}catch{}if(n=dg(e,t,a,i),n!==null)return In(n,e,i),dS(n,t,i),!0}return!1}function Lg(e,t,n,i){if(i={lane:2,revertLane:Xg(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},Bh(e)){if(t)throw Error(Z(479))}else t=dg(e,n,i,2),t!==null&&In(t,e,2)}function Bh(e){var t=e.alternate;return e===Xt||t!==null&&t===Xt}function fS(e,t){no=ch=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function dS(e,t,n){if((n&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,Qy(e,n)}}var hh={readContext:hn,use:Ih,useCallback:Be,useContext:Be,useEffect:Be,useImperativeHandle:Be,useLayoutEffect:Be,useInsertionEffect:Be,useMemo:Be,useReducer:Be,useRef:Be,useState:Be,useDebugValue:Be,useDeferredValue:Be,useTransition:Be,useSyncExternalStore:Be,useId:Be,useHostTransitionStatus:Be,useFormState:Be,useActionState:Be,useOptimistic:Be,useMemoCache:Be,useCacheRefresh:Be,useEffectEvent:Be},pS={readContext:hn,use:Ih,useCallback:function(e,t){return wn().memoizedState=[e,t===void 0?null:t],e},useContext:hn,useEffect:F_,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,Fu(4194308,4,eS.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Fu(4194308,4,e,t)},useInsertionEffect:function(e,t){Fu(4,2,e,t)},useMemo:function(e,t){var n=wn();t=t===void 0?null:t;var i=e();if(tr){Za(!0);try{e()}finally{Za(!1)}}return n.memoizedState=[i,t],i},useReducer:function(e,t,n){var i=wn();if(n!==void 0){var a=n(t);if(tr){Za(!0);try{n(t)}finally{Za(!1)}}}else a=t;return i.memoizedState=i.baseState=a,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:a},i.queue=e,e=e.dispatch=HT.bind(null,Xt,e),[i.memoizedState,e]},useRef:function(e){var t=wn();return e={current:e},t.memoizedState=e},useState:function(e){e=vm(e);var t=e.queue,n=hS.bind(null,Xt,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Dg,useDeferredValue:function(e,t){var n=wn();return Ug(n,e,t)},useTransition:function(){var e=vm(!1);return e=rS.bind(null,Xt,e.queue,!0,!1),wn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var i=Xt,a=wn();if(Jt){if(n===void 0)throw Error(Z(407));n=n()}else{if(n=t(),Ee===null)throw Error(Z(349));(ee&127)!==0||Vx(i,t,n)}a.memoizedState=n;var s={value:n,getSnapshot:t};return a.queue=s,F_(kx.bind(null,i,s,e),[e]),i.flags|=2048,uo(9,{destroy:void 0},Gx.bind(null,i,s,n,t),null),n},useId:function(){var e=wn(),t=Ee.identifierPrefix;if(Jt){var n=ji,i=Qi;n=(i&~(1<<32-Jn(i)-1)).toString(32)+n,t="_"+t+"R_"+n,n=uh++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=LT++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Ng,useFormState:P_,useActionState:P_,useOptimistic:function(e){var t=wn();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Lg.bind(null,Xt,!0,n),n.dispatch=t,[e,t]},useMemoCache:wg,useCacheRefresh:function(){return wn().memoizedState=FT.bind(null,Xt)},useEffectEvent:function(e){var t=wn(),n={impl:e};return t.memoizedState=n,function(){if((fe&2)!==0)throw Error(Z(440));return n.impl.apply(void 0,arguments)}}},mS={readContext:hn,use:Ih,useCallback:iS,useContext:hn,useEffect:Rg,useImperativeHandle:nS,useInsertionEffect:$x,useLayoutEffect:tS,useMemo:aS,useReducer:zu,useRef:Qx,useState:function(){return zu(Ma)},useDebugValue:Dg,useDeferredValue:function(e,t){var n=Fe();return sS(n,be.memoizedState,e,t)},useTransition:function(){var e=zu(Ma)[0],t=Fe().memoizedState;return[typeof e=="boolean"?e:lc(e),t]},useSyncExternalStore:Hx,useId:cS,useHostTransitionStatus:Ng,useFormState:B_,useActionState:B_,useOptimistic:function(e,t){var n=Fe();return qx(n,be,e,t)},useMemoCache:wg,useCacheRefresh:uS,useEffectEvent:jx},VT={readContext:hn,use:Ih,useCallback:iS,useContext:hn,useEffect:Rg,useImperativeHandle:nS,useInsertionEffect:$x,useLayoutEffect:tS,useMemo:aS,useReducer:Rp,useRef:Qx,useState:function(){return Rp(Ma)},useDebugValue:Dg,useDeferredValue:function(e,t){var n=Fe();return be===null?Ug(n,e,t):sS(n,be.memoizedState,e,t)},useTransition:function(){var e=Rp(Ma)[0],t=Fe().memoizedState;return[typeof e=="boolean"?e:lc(e),t]},useSyncExternalStore:Hx,useId:cS,useHostTransitionStatus:Ng,useFormState:z_,useActionState:z_,useOptimistic:function(e,t){var n=Fe();return be!==null?qx(n,be,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:wg,useCacheRefresh:uS,useEffectEvent:jx};function Dp(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:Te({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var xm={enqueueSetState:function(e,t,n){e=e._reactInternals;var i=Kn(),a=ns(i);a.payload=t,n!=null&&(a.callback=n),t=is(e,a,i),t!==null&&(In(t,e,i),Dl(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=Kn(),a=ns(i);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=is(e,a,i),t!==null&&(In(t,e,i),Dl(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Kn(),i=ns(n);i.tag=2,t!=null&&(i.callback=t),t=is(e,i,n),t!==null&&(In(t,e,n),Dl(t,e,n))}};function H_(e,t,n,i,a,s,r){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,s,r):t.prototype&&t.prototype.isPureReactComponent?!Gl(n,i)||!Gl(a,s):!0}function V_(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&xm.enqueueReplaceState(t,t.state,null)}function er(e,t){var n=t;if("ref"in t){n={};for(var i in t)i!=="ref"&&(n[i]=t[i])}if(e=e.defaultProps){n===t&&(n=Te({},n));for(var a in e)n[a]===void 0&&(n[a]=e[a])}return n}function gS(e){eh(e)}function vS(e){console.error(e)}function _S(e){eh(e)}function fh(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function G_(e,t,n){try{var i=e.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function Sm(e,t,n){return n=ns(n),n.tag=3,n.payload={element:null},n.callback=function(){fh(e,t)},n}function yS(e){return e=ns(e),e.tag=3,e}function xS(e,t,n,i){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var s=i.value;e.payload=function(){return a(s)},e.callback=function(){G_(t,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(e.callback=function(){G_(t,n,i),typeof a!="function"&&(rs===null?rs=new Set([this]):rs.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function GT(e,t,n,i,a){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=n.alternate,t!==null&&Ks(t,n,a,!0),n=mn.current,n!==null){switch(n.tag){case 31:case 13:case 19:return yn===null?xh():n.alternate===null&&ze===0&&(ze=3),n.flags&=-257,n.flags|=65536,n.lanes=a,i===rh?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([i]):t.add(i),Bp(e,i,a)),!1;case 22:return n.flags|=65536,i===rh?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([i]):n.add(i)),Bp(e,i,a)),!1}throw Error(Z(435,n.tag))}return Bp(e,i,a),xh(),!1}if(Jt)return t=mn.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=a,i!==cm&&(e=Error(Z(422),{cause:i}),Xl(di(e,n)))):(i!==cm&&(t=Error(Z(423),{cause:i}),Xl(di(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,i=di(i,n),a=Sm(e.stateNode,i,a),Cp(e,a),ze!==4&&(ze=2)),!1;var s=Error(Z(520),{cause:i});if(s=di(s,n),Bl===null?Bl=[s]:Bl.push(s),ze!==4&&(ze=2),t===null)return!0;i=di(i,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Sm(n.stateNode,i,e),Cp(n,e),!1;case 1:if(t=n.type,s=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(rs===null||!rs.has(s))))return n.flags|=65536,a&=-a,n.lanes|=a,a=yS(a),xS(a,e,n,i),Cp(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var Og=Error(Z(461)),Xe=!1;function Ye(e,t,n,i){t.child=e===null?Ox(t,null,n,i):$s(t,e.child,n,i)}function k_(e,t,n,i,a){n=n.render;var s=t.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return Qs(t),i=bg(e,t,n,r,s,a),o=Eg(),e!==null&&!Xe?(Tg(e,t,a),ba(e,t,a)):(Jt&&o&&Nh(t),t.flags|=1,Ye(e,t,i,a),t.child)}function X_(e,t,n,i,a){if(e===null){var s=n.type;return typeof s=="function"&&!pg(s)&&s.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=s,SS(e,t,s,i,a)):(e=Iu(n.type,null,i,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!Pg(e,a)){var r=s.memoizedProps;if(n=n.compare,n=n!==null?n:Gl,n(r,i)&&e.ref===t.ref)return ba(e,t,a)}return t.flags|=1,e=va(s,i),e.ref=t.ref,e.return=t,t.child=e}function SS(e,t,n,i,a){if(e!==null){var s=e.memoizedProps;if(Gl(s,i)&&e.ref===t.ref)if(Xe=!1,t.pendingProps=i=s,Pg(e,a))(e.flags&131072)!==0&&(Xe=!0);else return t.lanes=e.lanes,ba(e,t,a)}return Mm(e,t,n,i,a)}function MS(e,t,n,i){var a=i.children,s=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(s=s!==null?s.baseLanes|n:n,e!==null){for(i=t.child=e.child,a=0;i!==null;)a=a|i.lanes|i.childLanes,i=i.sibling;i=a&~s}else i=0,t.child=null;return W_(e,t,s,n,i)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Bu(t,s!==null?s.cachePool:null),s!==null?L_(t,s):mm(),Bx(t);else return i=t.lanes=536870912,W_(e,t,s!==null?s.baseLanes|n:n,n,i)}else s!==null?(Bu(t,s.cachePool),L_(t,s),ss(),t.memoizedState=null):(e!==null&&Bu(t,null),mm(),ss());return Ye(e,t,a,n),t.child}function Ol(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function W_(e,t,n,i,a){var s=vg();return s=s===null?null:{parent:ke._currentValue,pool:s},t.memoizedState={baseLanes:n,cachePool:s},e!==null&&Bu(t,null),mm(),Bx(t),e!==null&&Ks(e,t,i,!0),t.childLanes=a,null}function Hu(e,t){return t=zh({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function q_(e,t,n){return $s(t,e.child,null,n),e=Hu(t,t.pendingProps),e.flags|=2,Xn(t),t.memoizedState=null,e}function kT(e,t,n){var i=t.pendingProps,a=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Jt){if(i.mode==="hidden")return e=Hu(t,i),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Ol(null,e);if(gm(t),(e=Re)?(e=MM(e,pi),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:us!==null?{id:Qi,overflow:ji}:null,retryLane:536870912,hydrationErrors:null},n=wx(e),n.return=t,t.child=n,an=t,Re=null)):e=null,e===null)throw hs(t);return t.lanes=536870912,null}return Hu(t,i)}var s=e.memoizedState;if(s!==null){var r=s.dehydrated;if(gm(t),a)if(t.flags&256)t.flags&=-257,t=q_(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(Z(558));else if(Xe||Ks(e,t,n,!1),a=(n&e.childLanes)!==0,Xe||a){if(fs.current===null){if(i=Ee,i!==null&&(r=jy(i,n),r!==0&&r!==s.retryLane))throw s.retryLane=r,rr(e,r),In(i,e,r),Og;xh()}t=q_(e,t,n)}else e=s.treeContext,Re=mi(r.nextSibling),an=t,Jt=!0,es=null,pi=!1,e!==null&&Rx(t,e),t=Hu(t,i),t.flags|=134221824;return t}return e=va(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Pr(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(Z(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Mm(e,t,n,i,a){return Qs(t),n=bg(e,t,n,i,void 0,a),i=Eg(),e!==null&&!Xe?(Tg(e,t,a),ba(e,t,a)):(Jt&&i&&Nh(t),t.flags|=1,Ye(e,t,n,a),t.child)}function Y_(e,t,n,i,a,s){return Qs(t),t.updateQueue=null,n=Fx(t,i,n,a),zx(e),i=Eg(),e!==null&&!Xe?(Tg(e,t,s),ba(e,t,s)):(Jt&&i&&Nh(t),t.flags|=1,Ye(e,t,n,s),t.child)}function Z_(e,t,n,i,a){if(Qs(t),t.stateNode===null){var s=Yr,r=n.contextType;typeof r=="object"&&r!==null&&(s=hn(r)),s=new n(i,s),t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=xm,t.stateNode=s,s._reactInternals=t,s=t.stateNode,s.props=i,s.state=t.memoizedState,s.refs={},yg(t),r=n.contextType,s.context=typeof r=="object"&&r!==null?hn(r):Yr,s.state=t.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(Dp(t,n,r,i),s.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(r=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),r!==s.state&&xm.enqueueReplaceState(s,s.state,null),Nl(t,i,s,a),Ul(),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){s=t.stateNode;var o=t.memoizedProps,l=er(n,o);s.props=l;var c=s.context,h=n.contextType;r=Yr,typeof h=="object"&&h!==null&&(r=hn(h));var d=n.getDerivedStateFromProps;h=typeof d=="function"||typeof s.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,h||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o||c!==r)&&V_(t,s,i,r),qa=!1;var u=t.memoizedState;s.state=u,Nl(t,i,s,a),Ul(),c=t.memoizedState,o||u!==c||qa?(typeof d=="function"&&(Dp(t,n,d,i),c=t.memoizedState),(l=qa||H_(t,n,l,i,u,c,r))?(h||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=c),s.props=i,s.state=c,s.context=r,i=l):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{s=t.stateNode,dm(e,t),r=t.memoizedProps,h=er(n,r),s.props=h,d=t.pendingProps,u=s.context,c=n.contextType,l=Yr,typeof c=="object"&&c!==null&&(l=hn(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(r!==d||u!==l)&&V_(t,s,i,l),qa=!1,u=t.memoizedState,s.state=u,Nl(t,i,s,a),Ul();var p=t.memoizedState;r!==d||u!==p||qa||e!==null&&e.dependencies!==null&&sh(e.dependencies)?(typeof o=="function"&&(Dp(t,n,o,i),p=t.memoizedState),(h=qa||H_(t,n,h,i,u,p,l)||e!==null&&e.dependencies!==null&&sh(e.dependencies))?(c||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(i,p,l),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(i,p,l)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=p),s.props=i,s.state=p,s.context=l,i=h):(typeof s.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),i=!1)}return s=i,Pr(e,t),i=(t.flags&128)!==0,s||i?(s=t.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:s.render(),t.flags|=1,e!==null&&i?(t.child=$s(t,e.child,null,a),t.child=$s(t,null,n,a)):Ye(e,t,n,a),t.memoizedState=s.state,e=t.child):e=ba(e,t,a),e}function J_(e,t,n,i){return Js(),t.flags|=256,Ye(e,t,n,i),t.child}var bm={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Em(e){return{baseLanes:e,cachePool:Ux()}}function Tm(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=qn),e}function bS(e,t,n){var i=t.pendingProps,a=!1,s=(t.flags&128)!==0,r;if((r=s)||(r=e!==null&&e.memoizedState===null?!1:(dn.current&2)!==0),r&&(a=!0,t.flags&=-129),r=(t.flags&32)!==0,t.flags&=-33,e===null){if(Jt){if(a?as(t):ss(),(e=Re)?(e=MM(e,pi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:us!==null?{id:Qi,overflow:ji}:null,retryLane:536870912,hydrationErrors:null},n=wx(e),n.return=t,t.child=n,an=t,Re=null)):e=null,e===null)throw hs(t);return Zg(e)?t.lanes=32:t.lanes=536870912,null}return s=i.children,i=i.fallback,a?(ss(),a=t.mode,s=zh({mode:"hidden",children:s},a),i=Ws(i,a,n,null),s.return=t,i.return=t,s.sibling=i,t.child=s,i=t.child,i.memoizedState=Em(n),i.childLanes=Tm(e,r,n),t.memoizedState=bm,Ol(null,i)):(as(t),Ig(t,s))}var o=e.memoizedState;if(o!==null){var l=o.dehydrated;if(l!==null)return XT(e,t,s,r,i,l,o,n)}return a?(ss(),a=i.fallback,s=t.mode,o=e.child,l=o.sibling,i=va(o,{mode:"hidden",children:i.children}),i.subtreeFlags=o.subtreeFlags&1206910976,l!==null?a=va(l,a):(a=Ws(a,s,n,null),a.flags|=2),a.return=t,i.return=t,i.sibling=a,t.child=i,Ol(null,i),i=t.child,a=e.child.memoizedState,a===null?a=Em(n):(s=a.cachePool,s!==null?(o=ke._currentValue,s=s.parent!==o?{parent:o,pool:o}:s):s=Ux(),a={baseLanes:a.baseLanes|n,cachePool:s}),i.memoizedState=a,i.childLanes=Tm(e,r,n),t.memoizedState=bm,Ol(e.child,i)):(as(t),n=e.child,e=n.sibling,n=va(n,{mode:"visible",children:i.children}),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n)}function Ig(e,t){return t=zh({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function zh(e,t){return e=On(22,e,null,t),e.lanes=0,e}function Su(e,t,n){return $s(t,e.child,null,n),e=Ig(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function XT(e,t,n,i,a,s,r,o){if(n)return t.flags&256?(as(t),t.flags&=-257,Su(e,t,o)):t.memoizedState!==null?(ss(),t.child=e.child,t.flags|=128,null):(ss(),s=a.fallback,r=t.mode,a=zh({mode:"visible",children:a.children},r),s=Ws(s,r,o,null),s.flags|=2,a.return=t,s.return=t,a.sibling=s,t.child=a,$s(t,e.child,null,o),a=t.child,a.memoizedState=Em(o),a.childLanes=Tm(e,i,o),t.memoizedState=bm,Ol(null,a));if(as(t),Zg(s)){if(i=s.nextSibling&&s.nextSibling.dataset,i)var l=i.dgst;return i=l,i!==""&&(a=Error(Z(419)),a.stack="",a.digest=i,Xl({value:a,source:null,stack:null})),Su(e,t,o)}if(Xe||Ks(e,t,o,!1),i=(o&e.childLanes)!==0,Xe||i){if(fs.current!==null)return Su(e,t,o);if(i=Ee,i!==null&&(a=jy(i,o),a!==0&&a!==r.retryLane))throw r.retryLane=a,rr(e,a),In(i,e,a),Og;return Km(s)||xh(),Su(e,t,o)}return Km(s)?(t.flags|=192,t.child=e.child,null):(e=r.treeContext,Re=mi(s.nextSibling),an=t,Jt=!0,es=null,pi=!1,e!==null&&Rx(t,e),t=Ig(t,a.children),t.flags|=134221824,t)}function K_(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),Pu(e.return,t,n)}function Q_(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&lh(n)===null&&(t=e),e=e.sibling}return t}function Mu(e,t,n,i,a,s){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:a,treeForkCount:s}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=a,r.treeForkCount=s)}function Up(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function Am(e,t,n){var i=t.pendingProps,a=i.revealOrder,s=i.tail;i=i.children;var r=dn.current;if(t.flags&128)return ql(t,r),null;var o=(r&2)!==0;if(o?(r=r&1|2,t.flags|=128):r&=1,ql(t,r),a==="backwards"&&e!==null?(Up(e),Ye(e,t,i,n),Up(e)):Ye(e,t,i,n),i=Jt?kl:0,!o&&e!==null&&(e.flags&128)!==0)t:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&K_(e,n,t);else if(e.tag===19)K_(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(a){case"backwards":n=Q_(t.child),n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null,Up(t)),Mu(t,!0,a,null,s,i);break;case"unstable_legacy-backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&lh(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}Mu(t,!0,n,null,s,i);break;case"together":Mu(t,!1,null,null,void 0,i);break;case"independent":t.memoizedState=null;break;default:n=Q_(t.child),n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),Mu(t,!1,a,n,s,i)}return t.child}function j_(e,t,n){var i=t.pendingProps;return Ka(t,t.type,i.value),Ye(e,t,i.children,n),t.child}function ba(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),ps|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Ks(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(Z(153));if(t.child!==null){for(e=t.child,n=va(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=va(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Pg(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&sh(e)))}function WT(e,t,n){switch(t.tag){case 3:Qu(t,t.stateNode.containerInfo),Ka(t,ke,e.memoizedState.cache),Js();break;case 27:case 5:$p(t);break;case 4:Qu(t,t.stateNode.containerInfo);break;case 10:Ka(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,gm(t),null;break;case 13:var i=t.memoizedState;if(i!==null){if(i.dehydrated!==null)return as(t),t.flags|=128,null;i=Ks(e,t,n,!1);var a=t.child.childLanes;return i||(n&a)!==0?bS(e,t,n):(as(t),e=ba(e,t,n),e!==null?e.sibling:null)}as(t);break;case 19:if(t.flags&128)return Am(e,t,n);if(a=(e.flags&128)!==0,i=(n&t.childLanes)!==0,i||(Ks(e,t,n,!1),i=(n&t.childLanes)!==0),a){if(i)return Am(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),ql(t,dn.current),i)break;return null;case 22:return t.lanes=0,MS(e,t,n,t.pendingProps);case 24:Ka(t,ke,e.memoizedState.cache)}return ba(e,t,n)}function ES(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Xe=!0;else{if(!Pg(e,n)&&(t.flags&128)===0)return Xe=!1,WT(e,t,n);Xe=(e.flags&131072)!==0}else Xe=!1,Jt&&(t.flags&1048576)!==0&&Cx(t,kl,t.index);switch(t.lanes=0,t.tag){case 16:t:{var i=t.pendingProps;if(e=Hs(t.elementType),t.type=e,typeof e=="function")pg(e)?(i=er(e,i),t.tag=1,t=Z_(null,t,e,i,n)):(t.tag=0,t=Mm(null,t,e,i,n));else{if(e!=null){var a=e.$$typeof;if(a===eg){t.tag=11,t=k_(null,t,e,i,n);break t}else if(a===ng){t.tag=14,t=X_(null,t,e,i,n);break t}else if(a===Ji){t.tag=10,t.type=e,t=j_(null,t,n);break t}}throw t=Qp(e)||e,Error(Z(306,t,""))}}return t;case 0:return Mm(e,t,t.type,t.pendingProps,n);case 1:return i=t.type,a=er(i,t.pendingProps),Z_(e,t,i,a,n);case 3:t:{if(Qu(t,t.stateNode.containerInfo),e===null)throw Error(Z(387));i=t.pendingProps;var s=t.memoizedState;a=s.element,dm(e,t),Nl(t,i,null,n);var r=t.memoizedState;if(i=r.cache,Ka(t,ke,i),i!==s.cache&&hm(t,[ke],n,!0),Ul(),i=r.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:r.cache},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){t=J_(e,t,i,n);break t}else if(i!==a){a=di(Error(Z(424)),t),Xl(a),t=J_(e,t,i,n);break t}else for(e=t.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,Re=mi(e.firstChild),an=t,Jt=!0,es=null,pi=!0,n=Ox(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling;else{if(Js(),i===a){t=ba(e,t,n);break t}Ye(e,t,i,n)}t=t.child}return t;case 26:return Pr(e,t),e===null?(n=Ty(t.type,null,t.pendingProps,null))?t.memoizedState=n:Jt||(t.stateNode=dM(t.type,t.pendingProps,ts.current,t)):t.memoizedState=Ty(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return $p(t),e===null&&Jt&&(i=t.stateNode=bM(t.type,t.pendingProps,ts.current),an=t,pi=!0,a=Re,gs(t.type)?(Qm=a,Re=mi(i.firstChild)):Re=a),Ye(e,t,t.pendingProps.children,n),Pr(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Jt&&((a=i=Re)&&(i=BA(i,t.type,t.pendingProps,pi),i!==null?(t.stateNode=i,an=t,Re=mi(i.firstChild),pi=!1,a=!0):a=!1),a||hs(t)),$p(t),a=t.type,s=t.pendingProps,r=e!==null?e.memoizedProps:null,i=s.children,Ym(a,s)?i=null:r!==null&&Ym(a,r)&&(t.flags|=32),t.memoizedState!==null&&(a=bg(e,t,OT,null,null,n),_o._currentValue=a),Pr(e,t),Ye(e,t,i,n),t.child;case 6:return e===null&&Jt&&((e=n=Re)&&(n=zA(n,t.pendingProps,pi),n!==null?(t.stateNode=n,an=t,Re=null,e=!0):e=!1),e||hs(t)),null;case 13:return bS(e,t,n);case 4:return Qu(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=$s(t,null,i,n):Ye(e,t,i,n),t.child;case 11:return k_(e,t,t.type,t.pendingProps,n);case 7:return i=t.pendingProps,Pr(e,t),Ye(e,t,i,n),t.child;case 8:return Ye(e,t,t.pendingProps.children,n),t.child;case 12:return Ye(e,t,t.pendingProps.children,n),t.child;case 10:return j_(e,t,n);case 9:return a=t.type._context,i=t.pendingProps.children,Qs(t),a=hn(a),i=i(a),t.flags|=1,Ye(e,t,i,n),t.child;case 14:return X_(e,t,t.type,t.pendingProps,n);case 15:return SS(e,t,t.type,t.pendingProps,n);case 19:return Am(e,t,n);case 31:return kT(e,t,n);case 22:return MS(e,t,n,t.pendingProps);case 24:return Qs(t),i=hn(ke),e===null?(a=vg(),a===null&&(a=Ee,s=gg(),a.pooledCache=s,s.refCount++,s!==null&&(a.pooledCacheLanes|=n),a=s),t.memoizedState={parent:i,cache:a},yg(t),Ka(t,ke,a)):((e.lanes&n)!==0&&(dm(e,t),Nl(t,null,null,n),Ul()),a=e.memoizedState,s=t.memoizedState,a.parent!==i?(a={parent:i,cache:i},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Ka(t,ke,i)):(i=s.cache,Ka(t,ke,i),i!==a.cache&&hm(t,[ke],n,!0))),Ye(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),i=t.pendingProps,i.name!=null&&i.name!=="auto"?t.flags|=e===null?18882560:18874368:Jt&&Nh(t),e!==null&&e.memoizedProps.name!==i.name?t.flags|=4194816:Pr(e,t),Ye(e,t,i.children,n),t.child;case 29:throw t.pendingProps}throw Error(Z(156,t.tag))}function pa(e){e.flags|=4}function Np(e,t,n,i,a){var s;if((s=(e.mode&32)!==0)&&(s=n===null?Cy(t,i):Cy(t,i)&&(i.src!==n.src||i.srcSet!==n.srcSet)),s){if(e.flags|=16777216,(a&335544128)===a)if(e.stateNode.complete)e.flags|=8192;else if($S())e.flags|=8192;else throw Ys=rh,_g}else e.flags&=-16777217}function $_(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!wM(t))if($S())e.flags|=8192;else throw Ys=rh,_g}function bu(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Jy():536870912,e.lanes|=t,ho|=t)}function vl(e,t){if(!Jt)switch(e.tailMode){case"visible":break;case"collapsed":for(var n=e.tail,i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function Ce(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags&1206910976,i|=a.flags&1206910976,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags,i|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function qT(e,t,n){var i=t.pendingProps;switch(mg(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ce(t),null;case 1:return Ce(t),null;case 3:return n=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),_a(ke),oo(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Or(t)?pa(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,wp())),Ce(t),null;case 26:var a=t.type,s=t.memoizedState;return e===null?(pa(t),s!==null?(Ce(t),$_(t,s)):(Ce(t),Np(t,a,null,i,n))):s?s!==e.memoizedState?(pa(t),Ce(t),$_(t,s)):(Ce(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&pa(t),Ce(t),Np(t,a,e,i,n)),null;case 27:if(ju(t),n=ts.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&pa(t);else{if(!i){if(t.stateNode===null)throw Error(Z(166));return Ce(t),t.subtreeFlags&=-33554433,null}e=$i.current,Or(t)?A_(t,e):(e=bM(a,i,n),t.stateNode=e,pa(t))}return Ce(t),t.subtreeFlags&=-33554433,null;case 5:if(ju(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&pa(t);else{if(!i){if(t.stateNode===null)throw Error(Z(166));return Ce(t),t.subtreeFlags&=-33554433,null}if(s=$i.current,Or(t))A_(t,s);else{var r=Kl(ts.current);switch(s){case 1:s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":s=r.createElement("div"),s.innerHTML="<script><\/script>",s=s.removeChild(s.firstChild);break;case"select":s=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?s.multiple=!0:i.size&&(s.size=i.size);break;default:s=typeof i.is=="string"?r.createElement(a,{is:i.is}):r.createElement(a)}}s[un]=t,s[Bn]=i;t:for(r=t.child;r!==null;){if(r.tag===5||r.tag===6)s.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break t;for(;r.sibling===null;){if(r.return===null||r.return===t)break t;r=r.return}r.sibling.return=r.return,r=r.sibling}t.stateNode=s;t:switch(pn(s,a,i),a){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break t;case"img":i=!0;break t;default:i=!1}i&&pa(t)}}return Ce(t),t.subtreeFlags&=-33554433,Np(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&pa(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(Z(166));if(e=ts.current,Or(t)){if(e=t.stateNode,n=t.memoizedProps,i=null,a=an,a!==null)switch(a.tag){case 27:case 5:i=a.memoizedProps}e[un]=t,e=!!(e.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||hM(e.nodeValue,n)),e||hs(t,!0)}else e=Kl(e).createTextNode(i),e[un]=t,t.stateNode=e}return Ce(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(i=Or(t),n!==null){if(e===null){if(!i)throw Error(Z(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(Z(557));e[un]=t}else Js(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ce(t),e=!1}else n=wp(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Xn(t),t):(Xn(t),null);if((t.flags&128)!==0)throw Error(Z(558))}return Ce(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Or(t),i!==null&&i.dehydrated!==null){if(e===null){if(!a)throw Error(Z(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(Z(317));a[un]=t}else Js(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ce(t),a=!1}else a=wp(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(Xn(t),t):(Xn(t),null)}return Xn(t),(t.flags&128)!==0?(t.lanes=n,t):(n=i!==null,e=e!==null&&e.memoizedState!==null,n&&(i=t.child,a=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(a=i.alternate.memoizedState.cachePool.pool),s=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(s=i.memoizedState.cachePool.pool),s!==a&&(i.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),bu(t,t.updateQueue),Ce(t),null);case 4:return oo(),e===null&&Wg(t.stateNode.containerInfo),t.flags|=67108864,Ce(t),null;case 10:return _a(t.type),Ce(t),null;case 19:if(Sg(t),i=t.memoizedState,i===null)return Ce(t),null;if(a=(t.flags&128)!==0,s=i.rendering,s===null)if(a)vl(i,!1);else{if(ze!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(s=lh(e),s!==null){for(t.flags|=128,vl(i,!1),e=s.updateQueue,t.updateQueue=e,bu(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Ax(n,e),n=n.sibling;return ql(t,dn.current&1|2),Jt&&ma(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&Yn()>_h&&(t.flags|=128,a=!0,vl(i,!1),t.lanes=4194304)}else{if(!a)if(e=lh(s),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,bu(t,e),vl(i,!0),i.tail===null&&i.tailMode!=="collapsed"&&i.tailMode!=="visible"&&!s.alternate&&!Jt)return Ce(t),null}else 2*Yn()-i.renderingStartTime>_h&&n!==536870912&&(t.flags|=128,a=!0,vl(i,!1),t.lanes=4194304);i.isBackwards?(s.sibling=t.child,t.child=s):(e=i.last,e!==null?e.sibling=s:t.child=s,i.last=s)}if(i.tail!==null){e=i.tail;t:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break t}n=n.sibling}n=!0}return i.rendering=e,i.tail=e.sibling,i.renderingStartTime=Yn(),e.sibling=null,s=dn.current,s=a?s&1|2:s&1,i.tailMode==="visible"||i.tailMode==="collapsed"||!n||Jt?ql(t,s):(n=s,De(mn,t),De(dn,n),yn===null&&(yn=t)),Jt&&ma(t,i.treeForkCount),e}return Ce(t),null;case 22:case 23:return Xn(t),xg(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(n&536870912)!==0&&(t.flags&128)===0&&(Ce(t),t.subtreeFlags&6&&(t.flags|=8192)):Ce(t),n=t.updateQueue,n!==null&&bu(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==n&&(t.flags|=2048),e!==null&&fn(qs),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),_a(ke),Ce(t),null;case 25:return null;case 30:return t.flags|=33554432,Ce(t),null}throw Error(Z(156,t.tag))}function YT(e,t){switch(mg(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return _a(ke),oo(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return ju(t),null;case 31:if(t.memoizedState!==null){if(Xn(t),t.alternate===null)throw Error(Z(340));Js()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Xn(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(Z(340));Js()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Sg(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return oo(),null;case 10:return _a(t.type),null;case 22:case 23:return Xn(t),xg(),e!==null&&fn(qs),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return _a(ke),null;case 25:return null;default:return null}}function TS(e,t){switch(mg(t),t.tag){case 3:_a(ke),oo();break;case 26:case 27:case 5:ju(t);break;case 4:oo();break;case 31:t.memoizedState!==null&&Xn(t);break;case 13:Xn(t);break;case 19:Sg(t);break;case 10:_a(t.type);break;case 22:case 23:Xn(t),xg(),e!==null&&fn(qs);break;case 24:_a(ke)}}function cc(e,t){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var a=i.next;n=a;do{if((n.tag&e)===e){i=void 0;var s=n.create,r=n.inst;i=s(),r.destroy=i}n=n.next}while(n!==a)}}catch(o){Se(t,t.return,o)}}function ds(e,t,n){try{var i=t.updateQueue,a=i!==null?i.lastEffect:null;if(a!==null){var s=a.next;i=s;do{if((i.tag&e)===e){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,a=t;var l=n,c=o;try{c()}catch(h){Se(a,l,h)}}}i=i.next}while(i!==s)}}catch(h){Se(t,t.return,h)}}function AS(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Px(t,n)}catch(i){Se(e,e.return,i)}}}function wS(e,t,n){n.props=er(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(i){Se(e,t,i)}}function Yi(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:var a=e.stateNode,s=xa(e.memoizedProps,a);(a.ref===null||a.ref.name!==s)&&(a.ref=vM(s)),i=a.ref;break;case 7:if(e.stateNode===null){var r=new jn(e);Pn(e.child,!1,IA,r,void 0,void 0),e.stateNode=r}i=e.stateNode;break;default:i=e.stateNode}typeof n=="function"?e.refCleanup=n(i):n.current=i}}catch(o){Se(e,t,o)}}function cn(e,t){var n=e.ref,i=e.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(a){Se(e,t,a)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){Se(e,t,a)}else n.current=null}function dh(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)SM(e.stateNode,t[n])}function ty(e){for(var t=e.return;t!==null&&(zg(t)&&SM(e.stateNode,t.stateNode),!Bg(t));)t=t.return}function Il(e){for(var t=e.return;t!==null&&(zg(t)&&PA(e.stateNode,t.stateNode),!Bg(t));)t=t.return}function Bg(e){return e.tag===5||e.tag===3||e.tag===27}function zg(e){return e&&e.tag===7&&e.stateNode!==null}function wm(e){var t=e.type,n=e.memoizedProps,i=e.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break t;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(a){Se(e,e.return,a)}}function Lp(e,t,n){try{var i=e.stateNode;vA(i,e.type,n,t),i[Bn]=t}catch(a){Se(e,e.return,a)}}function CS(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&gs(e.type)||e.tag===4}function Op(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||CS(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&gs(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Cm(e,t,n,i){var a=e.tag;if(a===5||a===6)a=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(a,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(a),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Ki)),dh(e,i),ue=!0;else if(a!==4&&(a===27&&(dh(e,i),i=null,gs(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(Cm(e,t,n,i),e=e.sibling;e!==null;)Cm(e,t,n,i),e=e.sibling}function ph(e,t,n,i){var a=e.tag;if(a===5||a===6)a=e.stateNode,t?n.insertBefore(a,t):n.appendChild(a),dh(e,i),ue=!0;else if(a!==4&&(a===27&&(dh(e,i),i=null,gs(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(ph(e,t,n,i),e=e.sibling;e!==null;)ph(e,t,n,i),e=e.sibling}function RS(e){var t=e.stateNode,n=e.memoizedProps;try{for(var i=e.type,a=t.attributes;a.length;)t.removeAttributeNode(a[0]);pn(t,i,n),t[un]=e,t[Bn]=n}catch(s){Se(e,e.return,s)}}var mh=!1,Wn=null;function ey(e){(e.tag===30||(e.subtreeFlags&33554432)!==0)&&(mh=!0)}var Zi=null;function ny(){var e=Zi;return Zi=null,e}var Ln=0;function Eo(e,t,n,i,a){return Ln=0,DS(e.child,t,n,i,a)}function DS(e,t,n,i,a){for(var s=!1;e!==null;){if(e.tag===5){var r=e.stateNode;if(i!==null){var o=Zm(r);i.push(o),o.view&&(s=!0)}else s||Zm(r).view&&(s=!0);mh=!0,pM(r,Ln===0?t:t+"_"+Ln,n),Ln++}else(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&a||DS(e.child,t,n,i,a)&&(s=!0));e=e.sibling}return s}function ea(e,t){for(;e!==null;)e.tag===5?mM(e.stateNode,e.memoizedProps):(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&t||ea(e.child,t)),e=e.sibling}function Vu(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(Vu(e),e.tag===30&&(e.flags&18874368)!==0&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name==="auto")throw Error(Z(544));var n=t.name;t=Aa(t.default,t.share),t!=="none"&&(Eo(e,n,t,null,!1)||ea(e.child,!1))}e=e.sibling}}function Rm(e,t){if(e.tag===30){var n=e.stateNode,i=e.memoizedProps,a=xa(i,n),s=Aa(i.default,n.paired?i.share:i.enter);s!=="none"?Eo(e,a,s,null,!1)?(Vu(e),n.paired||t||fo(e,i.onEnter)):ea(e.child,!1):Vu(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)Rm(e,t),e=e.sibling;else Vu(e)}function Dm(e){if(Wn!==null&&Wn.size!==0){var t=Wn;if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var n=e.memoizedProps,i=n.name;if(i!=null&&i!=="auto"){var a=t.get(i);if(a!==void 0){var s=Aa(n.default,n.share);if(s!=="none"&&(Eo(e,i,s,null,!1)?(s=e.stateNode,a.paired=s,s.paired=a,fo(e,n.onShare)):ea(e.child,!1)),t.delete(i),t.size===0)break}}}Dm(e)}e=e.sibling}}}function Um(e){if(e.tag===30){var t=e.memoizedProps,n=xa(t,e.stateNode),i=Wn!==null?Wn.get(n):void 0,a=Aa(t.default,i!==void 0?t.share:t.exit);a!=="none"&&(Eo(e,n,a,null,!1)?i!==void 0?(a=e.stateNode,i.paired=a,a.paired=i,Wn.delete(n),fo(e,t.onShare)):fo(e,t.onExit):ea(e.child,!1)),Wn!==null&&Dm(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)Um(e),e=e.sibling;else Wn!==null&&Dm(e)}function US(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=xa(t,e.stateNode);t=Aa(t.default,t.update),e.flags&=-5,t!=="none"&&Eo(e,n,t,e.memoizedState=[],!1)}else(e.subtreeFlags&33554432)!==0&&US(e);e=e.sibling}}function Nm(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var t=e.stateNode;t.paired!==null&&(t.paired=null,ea(e.child,!1))}Nm(e)}e=e.sibling}}function Gu(e){if(e.tag===30)e.stateNode.paired=null,ea(e.child,!1),Nm(e);else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)Gu(e),e=e.sibling;else Nm(e)}function NS(e){for(e=e.child;e!==null;)e.tag===30?ea(e.child,!1):(e.subtreeFlags&33554432)!==0&&NS(e),e=e.sibling}function Fg(e,t,n,i,a,s,r){for(var o=!1;t!==null;){if(t.tag===5){var l=t.stateNode;if(s!==null&&Ln<s.length){var c=s[Ln],h=Zm(l);(c.view||h.view)&&(o=!0);var d;if(d=(e.flags&4)===0)if(h.clip)d=!0;else{d=c.rect;var u=h.rect;d=d.y!==u.y||d.x!==u.x||d.height!==u.height||d.width!==u.width}d&&(e.flags|=4),h.abs?h=!c.abs:(c=c.rect,h=h.rect,h=c.height!==h.height||c.width!==h.width),h&&(e.flags|=32)}else e.flags|=32;(e.flags&4)!==0&&pM(l,Ln===0?n:n+"_"+Ln,a),o&&(e.flags&4)!==0||(Zi===null&&(Zi=[]),Zi.push(l,Ln===0?i:i+"_"+Ln,t.memoizedProps)),Ln++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&r?e.flags|=t.flags&32:Fg(e,t.child,n,i,a,s,r)&&(o=!0));t=t.sibling}return o}function LS(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,i=e.stateNode,a=xa(n,i),s=Aa(n.default,n.update);if(t){i=i.clones;var r=i===null?null:i.map(bA)}else r=e.memoizedState,e.memoizedState=null;i=e;var o=e.child;Ln=0,a=Fg(i,o,a,a,s,r,!1),(e.flags&4)!==0&&a&&(t||fo(e,n.onUpdate))}else(e.subtreeFlags&33554432)!==0&&LS(e,t);e=e.sibling}}var tn=!1,ge=!1,Xi=!1,Ip=!1,iy=typeof WeakSet=="function"?WeakSet:Set,en=null,Wi=!1,Tl=!1,gh=!1,Lm=!1;function ZT(e,t,n){if(e=e.containerInfo,Wm=yo,e=_x(e),hg(e)){if("selectionStart"in e)var i={start:e.selectionStart,end:e.selectionEnd};else t:{i=(i=e.ownerDocument)&&i.defaultView||window;var a=i.getSelection&&i.getSelection();if(a&&a.rangeCount!==0){i=a.anchorNode;var s=a.anchorOffset,r=a.focusNode;a=a.focusOffset;try{i.nodeType,r.nodeType}catch{i=null;break t}var o=0,l=-1,c=-1,h=0,d=0,u=e,p=null;e:for(;;){for(var g;u!==i||s!==0&&u.nodeType!==3||(l=o+s),u!==r||a!==0&&u.nodeType!==3||(c=o+a),u.nodeType===3&&(o+=u.nodeValue.length),(g=u.firstChild)!==null;)p=u,u=g;for(;;){if(u===e)break e;if(p===i&&++h===s&&(l=o),p===r&&++d===a&&(c=o),(g=u.nextSibling)!==null)break;u=p,p=u.parentNode}u=g}i=l===-1||c===-1?null:{start:l,end:c}}else i=null}i=i||{start:0,end:0}}else i=null;for(qm={focusedElem:e,selectionRange:i},yo=!1,n=(n&335544064)===n,en=t,t=n?9270:1024;en!==null;){if(e=en,n&&(i=e.deletions,i!==null))for(s=0;s<i.length;s++)n&&Um(i[s]);if(e.alternate===null&&(e.flags&2)!==0)n&&ey(e),Eu(n);else{if(e.tag===22){if(i=e.alternate,e.memoizedState!==null){i!==null&&i.memoizedState===null&&n&&Um(i),Eu(n);continue}else if(i!==null&&i.memoizedState!==null){n&&ey(e),Eu(n);continue}}i=e.child,(e.subtreeFlags&t)!==0&&i!==null?(i.return=e,en=i):(n&&US(e),Eu(n))}}Wn=null}function Eu(e){for(;en!==null;){var t=en,n=e,i=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if((a&1024)!==0&&i!==null){n=void 0,a=i.memoizedProps,i=i.memoizedState;var s=t.stateNode;try{var r=er(t.type,a);n=s.getSnapshotBeforeUpdate(r,i),s.__reactInternalSnapshotBeforeUpdate=n}catch(o){Se(t,t.return,o)}}break;case 3:if((a&1024)!==0){if(i=t.stateNode.containerInfo,n=i.nodeType,n===9)Jm(i);else if(n===1)switch(i.nodeName){case"HEAD":case"HTML":case"BODY":Jm(i);break;default:i.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&i!==null&&(n=xa(i.memoizedProps,i.stateNode),a=t.memoizedProps,a=Aa(a.default,a.update),a!=="none"&&Eo(i,n,a,i.memoizedState=[],!0));break;default:if((a&1024)!==0)throw Error(Z(163))}if(i=t.sibling,i!==null){i.return=t.return,en=i;break}en=t.return}}function OS(e,t,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:qi(e,n),i&4&&cc(5,n);break;case 1:if(qi(e,n),i&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(r){Se(n,n.return,r)}else{var a=er(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(a,t,e.__reactInternalSnapshotBeforeUpdate)}catch(r){Se(n,n.return,r)}}i&64&&AS(n),i&512&&Yi(n,n.return);break;case 3:if(qi(e,n),i&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Px(e,t)}catch(r){Se(n,n.return,r)}}break;case 27:t===null&&i&4&&RS(n);case 26:case 5:qi(e,n),t===null&&i&4&&wm(n),i&512&&Yi(n,n.return);break;case 12:qi(e,n);break;case 31:qi(e,n),i&4&&zS(e,n);break;case 13:qi(e,n),i&4&&FS(e,n),i&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=rA.bind(null,n),FA(e,n))));break;case 22:if(i=n.memoizedState!==null||tn,!i){var s=t!==null&&t.memoizedState!==null||ge;t=tn,a=ge,tn=i,(ge=s)&&!a?(i=2,(n.subtreeFlags&8772)!==0&&(i|=1),wi(e,n,i)):qi(e,n),tn=t,ge=a}break;case 30:qi(e,n),i&512&&Yi(n,n.return);break;case 7:i&512&&Yi(n,n.return);default:qi(e,n)}}function Om(e,t){for(e=e.child;e!==null;)IS(e,t),e=e.sibling}function IS(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var i=n.style;typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"}else{var a=e.stateNode,s=e.memoizedProps.style,r=s!=null&&s.hasOwnProperty("display")?s.display:null;a.style.display=r==null||typeof r=="boolean"?"":(""+r).trim()}}catch(l){Se(e,e.return,l)}Im(e,t);break;case 6:try{e.stateNode.nodeValue=t?"":e.memoizedProps,ue=!0}catch(l){Se(e,e.return,l)}break;case 18:try{var o=e.stateNode;t?yy(o,!0):yy(e.stateNode,!1)}catch(l){Se(e,e.return,l)}break;case 22:case 23:e.memoizedState===null&&Om(e,t);break;default:Om(e,t)}}function Im(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){t:{var n=e,i=t;switch(n.tag){case 4:IS(n,i);break t;case 22:n.memoizedState===null&&Im(n,i);break t;default:Im(n,i)}}e=e.sibling}}function PS(e){var t=e.alternate;t!==null&&(e.alternate=null,PS(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Ah(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Oe=null,Un=!1;function Ai(e,t,n){for(n=n.child;n!==null;)BS(e,t,n),n=n.sibling}function BS(e,t,n){if(Zn&&typeof Zn.onCommitFiberUnmount=="function")try{Zn.onCommitFiberUnmount(nc,n)}catch{}switch(n.tag){case 26:ge||cn(n,t),Ai(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!ge&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:ge||cn(n,t),Il(n);var i=Oe,a=Un;gs(n.type)&&(Oe=n.stateNode,Un=!1),Ai(e,t,n),EM(n.stateNode,n.type,n.memoizedProps),Oe=i,Un=a;break;case 5:ge||cn(n,t),Il(n);case 6:if(n.tag===6&&Il(n),i=Oe,a=Un,Oe=null,Ai(e,t,n),Oe=i,Un=a,Oe!==null)if(Un)try{(Oe.nodeType===9?Oe.body:Oe.nodeName==="HTML"?Oe.ownerDocument.body:Oe).removeChild(n.stateNode),ue=!0}catch(s){Se(n,t,s)}else try{Oe.removeChild(n.stateNode),ue=!0}catch(s){Se(n,t,s)}break;case 18:Oe!==null&&(Un?(e=Oe,_y(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),xo(e)):_y(Oe,n.stateNode));break;case 4:i=Oe,a=Un,Oe=n.stateNode.containerInfo,Un=!0,Ai(e,t,n),Oe=i,Un=a;break;case 0:case 11:case 14:case 15:ds(2,n,t),ge||ds(4,n,t),Ai(e,t,n);break;case 1:ge||(cn(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"&&wS(n,t,i)),Ai(e,t,n);break;case 21:Ai(e,t,n);break;case 22:ge=(i=ge)||n.memoizedState!==null,Ai(e,t,n),ge=i;break;case 30:cn(n,t),Ai(e,t,n);break;case 7:ge||cn(n,t),Ai(e,t,n);break;default:Ai(e,t,n)}}function zS(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{xo(e)}catch(n){Se(t,t.return,n)}}}function FS(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{xo(e)}catch(n){Se(t,t.return,n)}}function JT(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new iy),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new iy),t;default:throw Error(Z(435,e.tag))}}function Tu(e,t){var n=JT(e);t.forEach(function(i){if(!n.has(i)){n.add(i);var a=oA.bind(null,e,i);i.then(a,a)}})}function Tn(e,t,n){var i=t.deletions;if(i!==null)for(var a=0;a<i.length;a++){var s=i[a],r=e,o=t,l=o;t:for(;l!==null;){switch(l.tag){case 27:if(gs(l.type)){Oe=l.stateNode,Un=!1;break t}break;case 5:Oe=l.stateNode,Un=!1;break t;case 3:case 4:Oe=l.stateNode.containerInfo,Un=!0;break t}l=l.return}if(Oe===null)throw Error(Z(160));BS(r,o,s),Oe=null,Un=!1,r=s.alternate,r!==null&&(r.return=null),s.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)HS(t,e,n),t=t.sibling}var Ci=null;function HS(e,t,n){var i=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(i=e.updateQueue,i=i!==null?i.events:null,i!==null))for(var s=0;s<i.length;s++){var r=i[s];r.ref.impl=r.nextImpl}Tn(t,e,n),An(e),a&4&&(ds(3,e,e.return),cc(3,e),ds(5,e,e.return));break;case 1:Tn(t,e,n),An(e),a&512&&(ge||i===null||cn(i,i.return)),a&64&&tn&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(s=Ci,Tn(t,e,n),An(e),a&512&&(ge||i===null||cn(i,i.return)),a&4)if(a=i!==null?i.memoizedState:null,n=e.memoizedState,i===null)if(n===null)if(e.stateNode===null)if(tn)e.stateNode=dM(e.type,e.memoizedProps,t.containerInfo,e);else{t:{t=e.type,n=e.memoizedProps,a=s.ownerDocument||s;e:switch(t){case"title":i=a.getElementsByTagName("title")[0],(!i||i[sc]||i[un]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=a.createElement(t),a.head.insertBefore(i,a.querySelector("head > title"))),pn(i,t,n),i[un]=e,nn(i),t=i;break t;case"link":if(s=wy("link","href",a).get(t+(n.href||""))){for(r=0;r<s.length;r++)if(i=s[r],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(r,1);break e}}i=a.createElement(t),pn(i,t,n),a.head.appendChild(i);break;case"meta":if(s=wy("meta","content",a).get(t+(n.content||""))){for(r=0;r<s.length;r++)if(i=s[r],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){s.splice(r,1);break e}}i=a.createElement(t),pn(i,t,n),a.head.appendChild(i);break;default:throw Error(Z(468,t))}i[un]=e,nn(i),t=i}e.stateNode=t}else tn||jm(s,e.type,e.stateNode);else e.stateNode=Ay(s,n,e.memoizedProps);else a!==n?(a===null?(t=i.stateNode,t===null||ge||t.parentNode.removeChild(t)):a.count--,n===null?tn||jm(s,e.type,e.stateNode):Ay(s,n,e.memoizedProps)):n===null&&e.stateNode!==null&&Lp(e,e.memoizedProps,i.memoizedProps);break;case 27:Tn(t,e,n),An(e),a&512&&(ge||i===null||cn(i,i.return)),i!==null&&a&4&&Lp(e,e.memoizedProps,i.memoizedProps);break;case 5:if(s=Xi,Xi=!1,Tn(t,e,n),Xi=s,An(e),a&512&&(ge||i===null||cn(i,i.return)),e.flags&32){t=e.stateNode;try{co(t,""),ue=!0}catch(h){Se(e,e.return,h)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,Lp(e,t,i!==null?i.memoizedProps:t)),a&1024&&(Ip=!0);break;case 6:if(Tn(t,e,n),An(e),a&4){if(e.stateNode===null)throw Error(Z(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,ue=!0}catch(h){Se(e,e.return,h)}}break;case 3:if(ue=!1,qu=null,s=Ci,Ci=Ql(t.containerInfo),Tn(t,e,n),Ci=s,An(e),a&4&&i!==null&&i.memoizedState.isDehydrated)try{xo(t.containerInfo)}catch(h){Se(e,e.return,h)}Ip&&(Ip=!1,VS(e)),ue=!1;break;case 4:a=Xi,Xi=tn,i=c_(),s=Ci,Ci=Ql(e.stateNode.containerInfo),Tn(t,e,n),An(e),Ci=s,ue&&Tl&&(gh=!0),ue=i,Xi=a;break;case 12:Tn(t,e,n),An(e);break;case 31:Tn(t,e,n),An(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Tu(e,t)));break;case 13:Tn(t,e,n),An(e),e.child.flags&8192&&e.memoizedState!==null!=(i!==null&&i.memoizedState!==null)&&(Fh=Yn()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Tu(e,t)));break;case 22:s=e.memoizedState!==null,r=i!==null&&i.memoizedState!==null;var o=tn,l=ge,c=Xi;tn=o||s,Xi=c||s,ge=l||r,Tn(t,e,n),ge=l,Xi=c,tn=o,An(e),a&8192&&(t=e.stateNode,t._visibility=s?t._visibility&-2:t._visibility|1,!s||i===null||r||tn||ge||(t=r||ge,n=tn,i=ge,tn=s||tn,ge=t,Xa(e,2),tn=n,ge=i),!s&&Xi||Om(e,s)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,Tu(e,n))));break;case 19:Tn(t,e,n),An(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Tu(e,t)));break;case 30:a&512&&(ge||i===null||cn(i,i.return)),a=c_(),s=Tl,r=(n&335544064)===n,o=e.memoizedProps,Tl=r&&Aa(o.default,o.update)!=="none",Tn(t,e,n),An(e),r&&i!==null&&ue&&(e.flags|=4),Tl=s,ue=a;break;case 21:break;case 7:a&512&&(ge||i===null||cn(i,i.return)),i&&i.stateNode!==null&&(i.stateNode._fragmentFiber=e);default:Tn(t,e,n),An(e)}}function An(e){var t=e.flags;if(t&2){try{for(var n,i=e.return;i!==null;){if(CS(i)){n=i;break}i=i.return}i=null;for(var a=e.return;a!==null;){if(zg(a)){var s=a.stateNode;i===null?i=[s]:i.push(s)}if(Bg(a))break;a=a.return}var r=i;if(n==null)throw Error(Z(160));switch(n.tag){case 27:var o=n.stateNode,l=Op(e);ph(e,l,o,r);break;case 5:var c=n.stateNode;n.flags&32&&(co(c,""),n.flags&=-33);var h=Op(e);ph(e,h,c,r);break;case 3:case 4:var d=n.stateNode.containerInfo,u=Op(e);Cm(e,u,d,r);break;default:throw Error(Z(161))}}catch(p){Se(e,e.return,p)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function VS(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;VS(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,yo=!0,t.reset(),yo=!1),e=e.sibling}}function Ir(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)GS(t,e),t=t.sibling;else LS(t,!1)}function GS(e,t){var n=e.alternate;if(n===null)Rm(e,!1);else switch(e.tag){case 3:if(Lm=Wi=!1,ny(),Ir(t,e),!Wi&&!gh){if(e=Zi,e!==null)for(var i=0;i<e.length;i+=3){n=e[i];var a=e[i+1];mM(n,e[i+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+a+")"})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===""&&(e.style.viewTransitionName="none",e.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),Lm=!0}Zi=null;break;case 5:Ir(t,e);break;case 4:i=Wi,Wi=!1,Ir(t,e),Wi&&(gh=!0),Wi=i;break;case 22:e.memoizedState===null&&(n.memoizedState!==null?Rm(e,!1):Ir(t,e));break;case 30:i=Wi,a=ny(),Wi=!1,Ir(t,e),Wi&&(e.flags|=4);var s=e.memoizedProps,r=e.stateNode;t=xa(s,r),r=xa(n.memoizedProps,r);var o=Aa(s.default,s.update);o==="none"?t=!1:(s=n.memoizedState,n.memoizedState=null,n=e.child,Ln=0,t=Fg(e,n,t,r,o,s,!0),Ln!==(s===null?0:s.length)&&(e.flags|=32)),(e.flags&4)!==0&&t?(fo(e,e.memoizedProps.onUpdate),Zi=a):a!==null&&(a.push.apply(a,Zi),Zi=a),Wi=(e.flags&32)!==0?!0:i;break;default:Ir(t,e)}}function qi(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)OS(e,t.alternate,t),t=t.sibling}function Xa(e,t){for(e=e.child;e!==null;){var n=e,i=t;switch(n.tag){case 0:case 11:case 14:case 15:ds(4,n,n.return),Xa(n,i);break;case 1:cn(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&wS(n,n.return,a),Xa(n,i);break;case 27:(i&2)!==0&&EM(n.stateNode,n.type,n.memoizedProps);case 5:cn(n,n.return),n.tag!==5&&n.tag!==27||Il(n),Xa(n,i);break;case 6:Il(n);break;case 26:cn(n,n.return),a=n.stateNode,n.memoizedState!==null||a===null||ge||a.parentNode.removeChild(a),Xa(n,i);break;case 22:n.memoizedState===null&&Xa(n,i);break;case 30:cn(n,n.return),Xa(n,i);break;case 7:cn(n,n.return);default:Xa(n,i)}e=e.sibling}}function wi(e,t,n){for(n=(t.subtreeFlags&8772)!==0?n:n&-2,t=t.child;t!==null;){var i=t.alternate,a=e,s=t,r=s.flags,o=(n&1)!==0;switch(s.tag){case 0:case 11:case 15:wi(a,s,n),cc(4,s);break;case 1:if(wi(a,s,n),i=s,a=i.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(h){Se(i,i.return,h)}if(i=s,a=i.updateQueue,a!==null){var l=i.stateNode;try{var c=a.shared.hiddenCallbacks;if(c!==null)for(a.shared.hiddenCallbacks=null,a=0;a<c.length;a++)Ix(c[a],l)}catch(h){Se(i,i.return,h)}}o&&r&64&&AS(s),Yi(s,s.return);break;case 27:(n&2)!==0&&RS(s);case 5:s.tag!==5&&s.tag!==27||ty(s),wi(a,s,n),o&&i===null&&r&4&&wm(s),Yi(s,s.return);break;case 6:ty(s);break;case 26:l=s.stateNode,s.memoizedState!==null||l===null||tn||jm(Ql(l.ownerDocument),s.type,l),wi(a,s,n),o&&i===null&&r&4&&wm(s),Yi(s,s.return);break;case 12:wi(a,s,n);break;case 31:wi(a,s,n),o&&r&4&&zS(a,s);break;case 13:wi(a,s,n),o&&r&4&&FS(a,s);break;case 22:s.memoizedState===null&&wi(a,s,n),Yi(s,s.return);break;case 30:wi(a,s,n),Yi(s,s.return);break;case 7:Yi(s,s.return);default:wi(a,s,n)}t=t.sibling}}function Hg(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&oc(n))}function Vg(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&oc(e))}function li(e,t,n,i){var a=(n&335544064)===n;if(t.subtreeFlags&(a?10262:10256))for(t=t.child;t!==null;)kS(e,t,n,i),t=t.sibling;else a&&NS(t)}function kS(e,t,n,i){var a=(n&335544064)===n;a&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&Gu(t);var s=t.flags;switch(t.tag){case 0:case 11:case 15:li(e,t,n,i),s&2048&&cc(9,t);break;case 1:li(e,t,n,i);break;case 3:li(e,t,n,i),a&&Lm&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,e.style.viewTransitionName==="root"&&(e.style.viewTransitionName=""),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName==="none"&&(e.style.viewTransitionName="")),s&2048&&(s=null,t.alternate!==null&&(s=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==s&&(t.refCount++,s!=null&&oc(s)));break;case 12:if(s&2048){li(e,t,n,i),s=t.stateNode;try{var r=t.memoizedProps,o=r.id,l=r.onPostCommit;typeof l=="function"&&l(o,t.alternate===null?"mount":"update",s.passiveEffectDuration,-0)}catch(c){Se(t,t.return,c)}}else li(e,t,n,i);break;case 31:li(e,t,n,i);break;case 13:li(e,t,n,i);break;case 23:break;case 22:r=t.stateNode,o=t.alternate,t.memoizedState!==null?(a&&o!==null&&o.memoizedState===null&&Gu(o),r._visibility&2?li(e,t,n,i):Pl(e,t)):(a&&o!==null&&o.memoizedState!==null&&Gu(t),r._visibility&2?li(e,t,n,i):(r._visibility|=2,Br(e,t,n,i,(t.subtreeFlags&10256)!==0||!1))),s&2048&&Hg(o,t);break;case 24:li(e,t,n,i),s&2048&&Vg(t.alternate,t);break;case 30:a&&(s=t.alternate,s!==null&&(ea(s.child,!0),ea(t.child,!0))),li(e,t,n,i);break;default:li(e,t,n,i)}}function Br(e,t,n,i,a){for(a=a&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var s=e,r=t,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:Br(s,r,o,l,a),cc(8,r);break;case 23:break;case 22:var h=r.stateNode;r.memoizedState!==null?h._visibility&2?Br(s,r,o,l,a):Pl(s,r):(h._visibility|=2,Br(s,r,o,l,a)),a&&c&2048&&Hg(r.alternate,r);break;case 24:Br(s,r,o,l,a),a&&c&2048&&Vg(r.alternate,r);break;default:Br(s,r,o,l,a)}t=t.sibling}}function Pl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,i=t,a=i.flags;switch(i.tag){case 22:Pl(n,i),a&2048&&Hg(i.alternate,i);break;case 24:Pl(n,i),a&2048&&Vg(i.alternate,i);break;default:Pl(n,i)}t=t.sibling}}var Vs=8192;function zs(e,t,n){if(e.subtreeFlags&Vs)for(e=e.child;e!==null;)XS(e,t,n),e=e.sibling}function XS(e,t,n){switch(e.tag){case 26:zs(e,t,n),e.flags&Vs&&(e.memoizedState!==null?$A(n,Ci,e.memoizedState,e.memoizedProps):(e=e.stateNode,(t&335544128)===t&&Ry(n,e)));break;case 5:zs(e,t,n),e.flags&Vs&&(e=e.stateNode,(t&335544128)===t&&Ry(n,e));break;case 3:case 4:var i=Ci;Ci=Ql(e.stateNode.containerInfo),zs(e,t,n),Ci=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=Vs,Vs=16777216,zs(e,t,n),Vs=i):zs(e,t,n));break;case 30:if((e.flags&Vs)!==0&&(i=e.memoizedProps.name,i!=null&&i!=="auto")){var a=e.stateNode;a.paired=null,Wn===null&&(Wn=new Map),Wn.set(i,a)}zs(e,t,n);break;default:zs(e,t,n)}}function WS(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function _l(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];en=i,YS(i,e)}WS(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)qS(e),e=e.sibling}function qS(e){switch(e.tag){case 0:case 11:case 15:_l(e),e.flags&2048&&ds(9,e,e.return);break;case 3:_l(e);break;case 12:_l(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,ku(e)):_l(e);break;default:_l(e)}}function ku(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];en=i,YS(i,e)}WS(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:ds(8,t,t.return),ku(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,ku(t));break;default:ku(t)}e=e.sibling}}function YS(e,t){for(;en!==null;){var n=en;switch(n.tag){case 0:case 11:case 15:ds(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:oc(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,en=i;else t:for(n=e;en!==null;){i=en;var a=i.sibling,s=i.return;if(PS(i),i===n){en=null;break t}if(a!==null){a.return=s,en=a;break t}en=s}}}var KT={getCacheForType:function(e){var t=hn(ke),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return hn(ke).controller.signal}},QT=typeof WeakMap=="function"?WeakMap:Map,fe=0,Ee=null,$t=null,ee=0,ye=0,Gn=null,Qa=!1,To=!1,Gg=!1,Ea=0,ze=0,ps=0,Zs=0,vh=0,qn=0,ho=0,Bl=null,Nn=null,Pm=!1,Fh=0,ZS=0,_h=1/0,yh=null,rs=null,Pe=0,Di=null,nr=null,ta=0,Bm=0,zm=null,JS=null,ao=null,so=null,ro=null,zl=0,Xu=null;function Kn(){return(fe&2)!==0&&ee!==0?ee&-ee:Ft.T!==null?Xg():$y()}function KS(){if(qn===0)if((ee&536870912)===0||Jt){var e=fu;fu<<=1,(fu&3932160)===0&&(fu=262144),qn=e}else qn=536870912;return e=mn.current,e!==null&&(e.flags|=32),qn}function fo(e,t){if(t!=null){var n=e.stateNode,i=n.ref;i===null&&(i=n.ref=vM(xa(e.memoizedProps,n))),so===null&&(so=[]),so.push(t.bind(null,i))}}function In(e,t,n){(e===Ee&&(ye===2||ye===9)||e.cancelPendingCommit!==null)&&(po(e,0),ja(e,ee,qn,!1)),ac(e,n),((fe&2)===0||e!==Ee)&&(e===Ee&&((fe&2)===0&&(Zs|=n),ze===4&&ja(e,ee,qn,!1)),ia(e))}function QS(e,t,n){if((fe&6)!==0)throw Error(Z(327));var i=!n&&(t&127)===0&&(t&e.expiredLanes)===0||ic(e,t),a=i?tA(e,t):Pp(e,t,!0),s=i;do{if(a===0){To&&!i&&ja(e,t,0,!1);break}else{if(n=e.current.alternate,s&&!jT(n)){a=Pp(e,t,!1),s=!1;continue}if(a===2){if(s=t,e.errorRecoveryDisabledLanes&s)var r=0;else r=e.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){t=r;t:{var o=e;a=Bl;var l=o.current.memoizedState.isDehydrated;if(l&&(po(o,r).flags|=256),r=Pp(o,r,!1),r!==2&&r!==6){if(Gg&&!l){o.errorRecoveryDisabledLanes|=s,Zs|=s,a=4;break t}s=Nn,Nn=a,s!==null&&(Nn===null?Nn=s:Nn.push.apply(Nn,s))}a=r}if(s=!1,a!==2)continue}}if(a===1){po(e,0),ja(e,t,0,!0);break}t:{switch(i=e,s=a,s){case 0:case 1:throw Error(Z(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:ja(i,t,qn,!Qa);break t;case 2:Nn=null;break;case 3:case 5:break;default:throw Error(Z(329))}if((t&62914560)===t&&(a=Fh+300-Yn(),10<a)){if(ja(i,t,qn,!Qa),Th(i,0,!0)!==0)break t;ta=t,i.timeoutHandle=qg(ay.bind(null,i,n,Nn,yh,Pm,t,qn,Zs,ho,Qa,s,"Throttled",-0,0),a);break t}ay(i,n,Nn,yh,Pm,t,qn,Zs,ho,Qa,s,null,-0,0)}}break}while(!0);ia(e)}function ay(e,t,n,i,a,s,r,o,l,c,h,d,u,p){e.timeoutHandle=-1;var g=t.subtreeFlags,x=(s&335544064)===s;if(d=null,(x||g&8192||(g&16785408)===16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ki},Wn=null,XS(t,s,d),x&&(g=d,x=e.containerInfo,x=(x.nodeType===9?x:x.ownerDocument).__reactViewTransition,x!=null&&(g.count++,g.waitingForViewTransition=!0,g=jl.bind(g),x.finished.then(g,g))),g=(s&62914560)===s?Fh-Yn():(s&4194048)===s?ZS-Yn():0,g=tw(d,g),g!==null)){ta=s,e.cancelPendingCommit=g(ry.bind(null,e,t,s,n,i,a,r,o,l,c,h,d,null,u,p)),ja(e,s,r,!c);return}ry(e,t,s,n,i,a,r,o,l,c,h,d)}function jT(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var a=n[i],s=a.getSnapshot;a=a.value;try{if(!Qn(s(),a))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ja(e,t,n,i){t=Zy(e,t),t&=~vh,t&=~Zs,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var a=t;0<a;){var s=31-Jn(a),r=1<<s;i[s]=-1,a&=~r}n!==0&&Ky(e,n,t)}function Hh(){return(fe&6)===0?(uc(0,!1),!1):!0}function kg(){if($t!==null){if(ye===0)var e=$t.return;else e=$t,ga=or=null,Ag(e),eo=null,Wl=0,e=$t;for(;e!==null;)TS(e.alternate,e),e=e.return;$t=null}}function po(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,xA(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),ta=0,kg(),Ee=e,$t=n=va(e.current,null),ee=t,ye=0,Gn=null,Qa=!1,To=ic(e,t),Gg=!1,ho=qn=vh=Zs=ps=ze=0,Nn=Bl=null,Pm=!1,Ea=Zy(e,t),Dh(),n}function jS(e,t){Xt=null,Ft.H=hh,t===bo||t===Lh?(t=U_(),ye=3):t===_g?(t=U_(),ye=4):ye=t===Og?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Gn=t,$t===null&&(ze=1,fh(e,di(t,e.current)))}function $S(){var e=mn.current;return e===null?!0:(ee&4194048)===ee?yn===null:(ee&62914560)===ee||(ee&536870912)!==0?e===yn:!1}function tM(){var e=Ft.H;return Ft.H=hh,e===null?hh:e}function eM(){var e=Ft.A;return Ft.A=KT,e}function xh(){ze=4,Qa||(ee&4194048)!==ee&&mn.current!==null||(To=!0),(ps&134217727)===0&&(Zs&134217727)===0||Ee===null||ja(Ee,ee,qn,!1)}function Pp(e,t,n){var i=fe;fe|=2;var a=tM(),s=eM();(Ee!==e||ee!==t)&&(yh=null,po(e,t)),t=!1;var r=ze;t:do try{if(ye!==0&&$t!==null){var o=$t,l=Gn;switch(ye){case 8:kg(),r=6;break t;case 3:case 2:case 9:case 6:mn.current===null&&(t=!0);var c=ye;if(ye=0,Gn=null,Kr(e,o,l,c),n&&To){r=0;break t}break;default:c=ye,ye=0,Gn=null,Kr(e,o,l,c)}}$T(),r=ze;break}catch(h){jS(e,h)}while(!0);return t&&e.shellSuspendCounter++,ga=or=null,fe=i,Ft.H=a,Ft.A=s,$t===null&&(Ee=null,ee=0,Dh()),r}function $T(){for(;$t!==null;)nM($t)}function tA(e,t){var n=fe;fe|=2;var i=tM(),a=eM();Ee!==e||ee!==t?(yh=null,_h=Yn()+500,po(e,t)):To=ic(e,t);t:do try{if(ye!==0&&$t!==null){t=$t;var s=Gn;e:switch(ye){case 1:ye=0,Gn=null,Kr(e,t,s,1);break;case 2:case 9:if(D_(s)){ye=0,Gn=null,sy(t);break}t=function(){ye!==2&&ye!==9||Ee!==e||(ye=7),ia(e)},s.then(t,t);break t;case 3:ye=7;break t;case 4:ye=5;break t;case 7:D_(s)?(ye=0,Gn=null,sy(t)):(ye=0,Gn=null,Kr(e,t,s,7));break;case 5:var r=null;switch($t.tag){case 26:r=$t.memoizedState;case 5:case 27:var o=$t;if(r?wM(r):o.stateNode.complete){ye=0,Gn=null;var l=o.sibling;if(l!==null)$t=l;else{var c=o.return;c!==null?($t=c,Vh(c)):$t=null}break e}}ye=0,Gn=null,Kr(e,t,s,5);break;case 6:ye=0,Gn=null,Kr(e,t,s,6);break;case 8:kg(),ze=6;break t;default:throw Error(Z(462))}}eA();break}catch(h){jS(e,h)}while(!0);return ga=or=null,Ft.H=i,Ft.A=a,fe=n,$t!==null?0:(Ee=null,ee=0,Dh(),ze)}function eA(){for(;$t!==null&&!_E();)nM($t)}function nM(e){var t=ES(e.alternate,e,Ea);e.memoizedProps=e.pendingProps,t===null?Vh(e):$t=t}function sy(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Y_(n,t,t.pendingProps,t.type,void 0,ee);break;case 11:t=Y_(n,t,t.pendingProps,t.type.render,t.ref,ee);break;case 5:Ag(t);var i=t;i===an&&(Jt?(ah(i),i.tag===5&&i.stateNode!=null&&(Re=i.stateNode)):(ah(i),Jt=!0));default:TS(n,t),t=$t=Ax(t,Ea),t=ES(n,t,Ea)}e.memoizedProps=e.pendingProps,t===null?Vh(e):$t=t}function Kr(e,t,n,i){ga=or=null,Ag(t),eo=null,Wl=0;var a=t.return;try{if(GT(e,a,t,n,ee)){ze=1,fh(e,di(n,e.current)),$t=null;return}}catch(s){if(a!==null)throw $t=a,s;ze=1,fh(e,di(n,e.current)),$t=null;return}t.flags&32768?(Jt||i===1?e=!0:To||(ee&536870912)!==0?e=!1:(Qa=e=!0,(i===2||i===9||i===3||i===6)&&(i=mn.current,i!==null&&i.tag===13&&(i.flags|=16384))),iM(t,e)):Vh(t)}function Vh(e){var t=e;do{if((t.flags&32768)!==0){iM(t,Qa);return}e=t.return;var n=qT(t.alternate,t,Ea);if(n!==null){$t=n;return}if(t=t.sibling,t!==null){$t=t;return}$t=t=e}while(t!==null);ze===0&&(ze=5)}function iM(e,t){do{var n=YT(e.alternate,e);if(n!==null){n.flags&=32767,$t=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){$t=e;return}$t=e=n}while(e!==null);ze=6,$t=null}function ry(e,t,n,i,a,s,r,o,l,c,h,d){e.cancelPendingCommit=null;do Gh();while(Pe!==0);if((fe&6)!==0)throw Error(Z(327));if(t!==null){if(t===e.current)throw Error(Z(177));e===Ee&&($t=Ee=null,ee=0),nr=t,Di=e,ta=n,zm=a,JS=i,nA(e,t,n,r,o,l,d)}}function nA(e,t,n,i,a,s,r){var o=t.lanes|t.childLanes;if(Bm=o,o|=fg,CE(e,n,o,i,a,s),so=null,(n&335544064)===n?(ro=DT(e),i=10262):(ro=null,i=10256),(t.subtreeFlags&i)!==0||(t.flags&i)!==0?(e.callbackNode=null,e.callbackPriority=0,lA($u,function(){return Gm(),null})):(e.callbackNode=null,e.callbackPriority=0),mh=!1,i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=Ft.T,Ft.T=null,a=de.p,de.p=2,s=fe,fe|=4;try{ZT(e,t,n)}finally{fe=s,de.p=a,Ft.T=i}}Pe=1,mh?ao=AA(r,e.containerInfo,ro,Fm,Hm,aA,Vm,Gm,iA,null,null):(Fm(),Hm(),Vm())}function iA(e){if(Pe!==0){var t=Di.onRecoverableError;t(e,{componentStack:null})}}function aA(){Pe===3&&(Pe=0,GS(nr,Di),Pe=4)}function Fm(){if(Pe===1){Pe=0;var e=Di,t=nr,n=ta,i=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||i){i=Ft.T,Ft.T=null;var a=de.p;de.p=2;var s=fe;fe|=4;try{Tl=gh=!1,HS(t,e,n),n=qm;var r=_x(e.containerInfo),o=n.focusedElem,l=n.selectionRange;if(r!==o&&o&&o.ownerDocument&&vx(o.ownerDocument.documentElement,o)){if(l!==null&&hg(o)){var c=l.start,h=l.end;if(h===void 0&&(h=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(h,o.value.length);else{var d=o.ownerDocument||document,u=d&&d.defaultView||window;if(u.getSelection){var p=u.getSelection(),g=o.textContent.length,x=Math.min(l.start,g),m=l.end===void 0?x:Math.min(l.end,g);!p.extend&&x>m&&(r=m,m=x,x=r);var f=M_(o,x),v=M_(o,m);if(f&&v&&(p.rangeCount!==1||p.anchorNode!==f.node||p.anchorOffset!==f.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var _=d.createRange();_.setStart(f.node,f.offset),p.removeAllRanges(),x>m?(p.addRange(_),p.extend(v.node,v.offset)):(_.setEnd(v.node,v.offset),p.addRange(_))}}}}for(d=[],p=o;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<d.length;o++){var y=d[o];y.element.scrollLeft=y.left,y.element.scrollTop=y.top}}yo=!!Wm,qm=Wm=null}finally{fe=s,de.p=a,Ft.T=i}}e.current=t,Pe=2}}function Hm(){if(Pe===2){Pe=0;var e=Di,t=nr,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=Ft.T,Ft.T=null;var i=de.p;de.p=2;var a=fe;fe|=4;try{OS(e,t.alternate,t)}finally{fe=a,de.p=i,Ft.T=n}}Pe=3}}function Vm(){if(Pe===4||Pe===3){Pe=0;var e=ao;ao=null,yE();var t=Di,n=nr,i=ta,a=JS,s=(i&335544064)===i?10262:10256;if((n.subtreeFlags&s)!==0||(n.flags&s)!==0?Pe=5:(Pe=0,nr=Di=null,aM(t,t.pendingLanes)),s=t.pendingLanes,s===0&&(rs=null),sg(i),n=n.stateNode,Zn&&typeof Zn.onCommitFiberRoot=="function")try{Zn.onCommitFiberRoot(nc,n,void 0,(n.current.flags&128)===128)}catch{}if(a!==null){n=Ft.T,s=de.p,de.p=2,Ft.T=null;try{for(var r=t.onRecoverableError,o=0;o<a.length;o++){var l=a[o];r(l.value,{componentStack:l.stack})}}finally{Ft.T=n,de.p=s}}if(a=so,r=ro,ro=null,a!==null&&(so=null,r===null&&(r=[]),e!==null))for(l=0;l<a.length;l++)n=(0,a[l])(r),n!==void 0&&e.finished.finally(n);(ta&3)!==0&&Gh(),ia(t),s=t.pendingLanes,(i&261930)!==0&&(s&42)!==0?t===Xu?zl++:(zl=0,Xu=t):(zl=0,Xu=null),uc(0,!1)}}function aM(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,oc(t)))}function Gh(){return ao!==null&&(ao.skipTransition(),ao=null),Fm(),Hm(),Vm(),Gm()}function Gm(){if(Pe!==5)return!1;var e=Di,t=Bm;Bm=0;var n=sg(ta),i=Ft.T,a=de.p;try{de.p=32>n?32:n,Ft.T=null,n=zm,zm=null;var s=Di,r=ta;if(Pe=0,nr=Di=null,ta=0,(fe&6)!==0)throw Error(Z(331));var o=fe;if(fe|=4,qS(s.current),kS(s,s.current,r,n),fe=o,uc(0,!1),Zn&&typeof Zn.onPostCommitFiberRoot=="function")try{Zn.onPostCommitFiberRoot(nc,s)}catch{}return!0}finally{de.p=a,Ft.T=i,aM(e,t)}}function oy(e,t,n){t=di(n,t),t=Sm(e.stateNode,t,2),e=is(e,t,2),e!==null&&(ac(e,2),ia(e))}function Se(e,t,n){if(e.tag===3)oy(e,e,n);else for(;t!==null;){if(t.tag===3){oy(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(rs===null||!rs.has(i))){e=di(n,e),n=yS(2),i=is(t,n,2),i!==null&&(xS(n,i,t,e),ac(i,2),ia(i));break}}t=t.return}}function Bp(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new QT;var a=new Set;i.set(t,a)}else a=i.get(t),a===void 0&&(a=new Set,i.set(t,a));a.has(n)||(Gg=!0,a.add(n),e=sA.bind(null,e,t,n),t.then(e,e))}function sA(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Ee===e&&(ee&n)===n&&((ze===4||ze===3&&(ee&62914560)===ee&&300>Yn()-Fh)&&(fe&2)===0?po(e,0):vh|=n,ho===ee&&(ho=0)),ia(e)}function sM(e,t){t===0&&(t=Jy()),e=rr(e,t),e!==null&&(ac(e,t),ia(e))}function rA(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),sM(e,n)}function oA(e,t){var n=0;switch(e.tag){case 31:case 13:var i=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(Z(314))}i!==null&&i.delete(t),sM(e,n)}function lA(e,t){return ig(e,t)}var mo=null,zr=null,km=!1,Sh=!1,zp=!1,$a=0;function ia(e){e!==zr&&e.next===null&&(zr===null?mo=zr=e:zr=zr.next=e),Sh=!0,km||(km=!0,uA())}function uc(e,t){if(!zp&&Sh){zp=!0;do for(var n=!1,i=mo;i!==null;){if(!t)if(e!==0){var a=i.pendingLanes;if(a===0)var s=0;else{var r=i.suspendedLanes,o=i.pingedLanes;s=(1<<31-Jn(42|e)+1)-1,s&=a&~(r&~o),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(n=!0,ly(i,s))}else s=ee,s=Th(i,i===Ee?s:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(s&3)===0||ic(i,s)||(n=!0,ly(i,s));i=i.next}while(n);zp=!1}}function cA(){rM()}function rM(){Sh=km=!1;var e=0;$a!==0&&yA()&&(e=$a);for(var t=Yn(),n=null,i=mo;i!==null;){var a=i.next,s=oM(i,t);s===0?(i.next=null,n===null?mo=a:n.next=a,a===null&&(zr=n)):(n=i,(e!==0||(s&3)!==0)&&(Sh=!0)),i=a}Pe!==0&&Pe!==5||uc(e,!1),$a!==0&&($a=0)}function oM(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,a=e.expirationTimes,s=e.pendingLanes&-62914561;0<s;){var r=31-Jn(s),o=1<<r,l=a[r];l===-1?((o&n)===0||(o&i)!==0)&&(a[r]=wE(o,t)):l<=t&&(e.expiredLanes|=o),s&=~o}if(t=Ee,n=ee,n=Th(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,n===0||e===t&&(ye===2||ye===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&gp(i),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||ic(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(i!==null&&gp(i),sg(n)){case 2:case 8:n=qy;break;case 32:n=$u;break;case 268435456:n=Yy;break;default:n=$u}return i=lM.bind(null,e),n=ig(n,i),e.callbackPriority=t,e.callbackNode=n,t}return i!==null&&i!==null&&gp(i),e.callbackPriority=2,e.callbackNode=null,2}function lM(e,t){if(Pe!==0&&Pe!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Gh()&&e.callbackNode!==n)return null;var i=ee;return i=Th(e,e===Ee?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(QS(e,i,t),oM(e,Yn()),e.callbackNode!=null&&e.callbackNode===n?lM.bind(null,e):null)}function ly(e,t){if(Gh())return null;QS(e,t,!0)}function uA(){SA(function(){(fe&6)!==0?ig(Wy,cA):rM()})}function Xg(){if($a===0){var e=js;e===0&&(e=hu,hu<<=1,(hu&261888)===0&&(hu=256)),$a=e}return $a}function cy(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Nu(e)}function hA(e,t,n,i,a){if(t==="submit"&&n&&n.stateNode===a){var s=cy((a[Bn]||null).action),r=i.submitter;r&&(t=(t=r[Bn]||null)?cy(t.formAction):r.getAttribute("formAction"),t!==null&&(s=t,r=null));var o=new wh("action","action",null,i,a);e.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if($a!==0){var l=new FormData(a,r);ym(n,{pending:!0,data:l,method:a.method,action:s},null,l)}}else typeof s=="function"&&(o.preventDefault(),l=new FormData(a,r),ym(n,{pending:!0,data:l,method:a.method,action:s},s,l))},currentTarget:a}]})}}for(Au=0;Au<lm.length;Au++)wu=lm[Au],uy=wu.toLowerCase(),hy=wu[0].toUpperCase()+wu.slice(1),Ui(uy,"on"+hy);var wu,uy,hy,Au;Ui(xx,"onAnimationEnd");Ui(Sx,"onAnimationIteration");Ui(Mx,"onAnimationStart");Ui("dblclick","onDoubleClick");Ui("focusin","onFocus");Ui("focusout","onBlur");Ui(MT,"onTransitionRun");Ui(bT,"onTransitionStart");Ui(ET,"onTransitionCancel");Ui(bx,"onTransitionEnd");lo("onMouseEnter",["mouseout","mouseover"]);lo("onMouseLeave",["mouseout","mouseover"]);lo("onPointerEnter",["pointerout","pointerover"]);lo("onPointerLeave",["pointerout","pointerover"]);ar("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));ar("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));ar("onBeforeInput",["compositionend","keypress","textInput","paste"]);ar("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));ar("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));ar("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Zl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),fA=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Zl));function cM(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],a=i.event;i=i.listeners;t:{var s=void 0;if(t)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&a.isPropagationStopped())break t;s=o,a.currentTarget=c;try{s(a)}catch(h){eh(h)}a.currentTarget=null,s=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&a.isPropagationStopped())break t;s=o,a.currentTarget=c;try{s(a)}catch(h){eh(h)}a.currentTarget=null,s=l}}}}function jt(e,t){var n=t[s_];n===void 0&&(n=t[s_]=new Set);var i=e+"__bubble";n.has(i)||(uM(t,e,2,!1),n.add(i))}function Fp(e,t,n){var i=0;t&&(i|=4),uM(n,e,i,t)}var Cu="_reactListening"+Math.random().toString(36).slice(2);function Wg(e){if(!e[Cu]){e[Cu]=!0,ex.forEach(function(n){n!=="selectionchange"&&(fA.has(n)||Fp(n,!1,e),Fp(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Cu]||(t[Cu]=!0,Fp("selectionchange",!1,t))}}function uM(e,t,n,i){switch(OM(t)){case 2:var a=aw;break;case 8:a=sw;break;default:a=jg}n=a.bind(null,t,n,e),a=void 0,!am||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),i?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function Hp(e,t,n,i,a){var s=i;if((t&1)===0&&(t&2)===0&&i!==null)t:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===a)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===a)return;r=r.return}for(;o!==null;){if(r=Gs(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=s=r;continue t}o=o.parentNode}}i=i.return}cx(function(){var c=s,h=og(n),d=[];t:{var u=Ex.get(e);if(u!==void 0){var p=wh,g=e;switch(e){case"keypress":if(Ou(n)===0)break t;case"keydown":case"keyup":p=jE;break;case"focusin":g="focus",p=Mp;break;case"focusout":g="blur",p=Mp;break;case"beforeblur":case"afterblur":p=Mp;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=d_;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=HE;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=iT;break;case xx:case Sx:case Mx:p=kE;break;case bx:p=sT;break;case"scroll":case"scrollend":p=zE;break;case"wheel":p=oT;break;case"copy":case"cut":case"paste":p=WE;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=m_;break;case"submit":p=eT;break;case"toggle":case"beforetoggle":p=cT}var x=(t&4)!==0,m=!x&&(e==="scroll"||e==="scrollend"),f=x?u!==null?u+"Capture":null:u;x=[];for(var v=c,_;v!==null;){var y=v;if(_=y.stateNode,y=y.tag,y!==5&&y!==26&&y!==27||_===null||f===null||(y=Hl(v,f),y!=null&&x.push(Jl(v,y,_))),m)break;v=v.return}0<x.length&&(u=new p(u,g,null,n,h),d.push({event:u,listeners:x}))}}if((t&7)===0){t:{if(p=e==="mouseover"||e==="pointerover",u=e==="mouseout"||e==="pointerout",p&&n!==im&&(g=n.relatedTarget||n.fromElement)&&(Gs(g)||g[So]))break t;(u||p)&&(g=h.window===h?h:(p=h.ownerDocument)?p.defaultView||p.parentWindow:window,u?(p=n.relatedTarget||n.toElement,u=c,p=p?Gs(p):null,p!==null&&(m=ec(p),x=p.tag,p!==m||x!==5&&x!==27&&x!==6)&&(p=null)):(u=null,p=c),u!==p&&(x=d_,y="onMouseLeave",f="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(x=m_,y="onPointerLeave",f="onPointerEnter",v="pointer"),m=u==null?g:bl(u),_=p==null?g:bl(p),g=new x(y,v+"leave",u,n,h),g.target=m,g.relatedTarget=_,y=null,Gs(h)===c&&(x=new x(f,v+"enter",p,n,h),x.target=_,x.relatedTarget=m,y=x),m=y,x=u&&p?Wp(u,p,dA):null,u!==null&&fy(d,g,u,x,!1),p!==null&&m!==null&&fy(d,m,p,x,!0)))}t:{if(u=c?bl(c):window,p=u.nodeName&&u.nodeName.toLowerCase(),p==="select"||p==="input"&&u.type==="file")var T=y_;else if(__(u))if(mx)T=yT;else{T=vT;var C=gT}else p=u.nodeName,!p||p.toLowerCase()!=="input"||u.type!=="checkbox"&&u.type!=="radio"?c&&rg(c.elementType)&&(T=y_):T=_T;if(T&&(T=T(e,c))){px(d,T,n,h);break t}C&&C(e,u,c)}switch(C=c?bl(c):window,e){case"focusin":(__(C)||C.contentEditable==="true")&&(Xr=C,rm=c,Cl=null);break;case"focusout":Cl=rm=Xr=null;break;case"mousedown":om=!0;break;case"contextmenu":case"mouseup":case"dragend":om=!1,b_(d,n,h);break;case"selectionchange":if(ST)break;case"keydown":case"keyup":b_(d,n,h)}var w;if(ug)t:{switch(e){case"compositionstart":var D="onCompositionStart";break t;case"compositionend":D="onCompositionEnd";break t;case"compositionupdate":D="onCompositionUpdate";break t}D=void 0}else kr?fx(e,n)&&(D="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(D="onCompositionStart");D&&(hx&&n.locale!=="ko"&&(kr||D!=="onCompositionStart"?D==="onCompositionEnd"&&kr&&(w=ux()):(Ja=h,lg="value"in Ja?Ja.value:Ja.textContent,kr=!0)),C=Mh(c,D),0<C.length&&(D=new p_(D,e,null,n,h),d.push({event:D,listeners:C}),w?D.data=w:(w=dx(n),w!==null&&(D.data=w)))),(w=hT?fT(e,n):dT(e,n))&&(D=Mh(c,"onBeforeInput"),0<D.length&&(C=new p_("onBeforeInput","beforeinput",null,n,h),d.push({event:C,listeners:D}),C.data=w)),hA(d,e,c,n,h)}cM(d,t)})}function Jl(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Mh(e,t){for(var n=t+"Capture",i=[];e!==null;){var a=e,s=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||s===null||(a=Hl(e,n),a!=null&&i.unshift(Jl(e,a,s)),a=Hl(e,t),a!=null&&i.push(Jl(e,a,s))),e.tag===3)return i;e=e.return}return[]}function dA(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function fy(e,t,n,i,a){for(var s=t._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,a?(c=Hl(n,s),c!=null&&r.unshift(Jl(n,c,l))):a||(c=Hl(n,s),c!=null&&r.push(Jl(n,c,l)))),n=n.return}r.length!==0&&e.push({event:t,listeners:r})}var pA=/\r\n?/g,mA=/\u0000|\uFFFD/g;function dy(e){return(typeof e=="string"?e:""+e).replace(pA,`
`).replace(mA,"")}function hM(e,t){return t=dy(t),dy(e)===t}function xe(e,t,n,i,a,s){switch(n){case"children":if(typeof i=="string")t==="body"||t==="textarea"&&i===""||co(e,i);else if(typeof i=="number"||typeof i=="bigint")t!=="body"&&co(e,""+i);else return;break;case"className":pu(e,"class",i);break;case"tabIndex":pu(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":pu(e,n,i);break;case"style":lx(e,i,s);return;case"data":if(t!=="object"){pu(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Nu(i),e.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(n==="formAction"?(t!=="input"&&xe(e,t,"name",a.name,a,null),xe(e,t,"formEncType",a.formEncType,a,null),xe(e,t,"formMethod",a.formMethod,a,null),xe(e,t,"formTarget",a.formTarget,a,null)):(xe(e,t,"encType",a.encType,a,null),xe(e,t,"method",a.method,a,null),xe(e,t,"target",a.target,a,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Nu(i),e.setAttribute(n,i);break;case"onClick":i!=null&&(e.onclick=Ki);return;case"onScroll":i!=null&&jt("scroll",e);return;case"onScrollEnd":i!=null&&jt("scrollend",e);return;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(Z(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(Z(60));s?.__html!==n&&(e.innerHTML=n)}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}n=Nu(i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":i===!0?e.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(n,i):e.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(n):e.setAttribute(n,i);break;case"popover":jt("beforetoggle",e),jt("toggle",e),Uu(e,"popover",i);break;case"xlinkActuate":da(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":da(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":da(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":da(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":da(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":da(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":da(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":da(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":da(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":Uu(e,"is",i);break;case"innerText":case"textContent":return;default:if(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")n=PE.get(n)||n,Uu(e,n,i);else return}ue=!0}function Xm(e,t,n,i,a,s){switch(n){case"style":lx(e,i,s);return;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(Z(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(Z(60));s?.__html!==n&&(e.innerHTML=n)}}break;case"children":if(typeof i=="string")co(e,i);else if(typeof i=="number"||typeof i=="bigint")co(e,""+i);else return;break;case"onScroll":i!=null&&jt("scroll",e);return;case"onScrollEnd":i!=null&&jt("scrollend",e);return;case"onClick":i!=null&&(e.onclick=Ki);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!nx.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),s=n.slice(2,a?n.length-7:void 0),t=e[Bn]||null,t=t!=null?t[n]:null,typeof t=="function"&&e.removeEventListener(s,t,a),typeof i=="function")){typeof t!="function"&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(s,i,a);break t}ue=!0,n in e?e[n]=i:i===!0?e.setAttribute(n,""):Uu(e,n,i)}return}ue=!0}function pn(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":jt("error",e),jt("load",e);var i=!1,a=!1,s;for(s in n)if(n.hasOwnProperty(s)){var r=n[s];if(r!=null)switch(s){case"src":i=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(Z(137,t));default:xe(e,t,s,r,n,null)}}a&&xe(e,t,"srcSet",n.srcSet,n,null),i&&xe(e,t,"src",n.src,n,null);return;case"input":jt("invalid",e);var o=s=r=a=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var h=n[i];if(h!=null)switch(i){case"name":a=h;break;case"type":r=h;break;case"checked":l=h;break;case"defaultChecked":c=h;break;case"value":s=h;break;case"defaultValue":o=h;break;case"children":case"dangerouslySetInnerHTML":if(h!=null)throw Error(Z(137,t));break;default:xe(e,t,i,h,n,null)}}sx(e,s,o,l,c,r,a,!1);return;case"select":jt("invalid",e),i=r=s=null;for(a in n)if(n.hasOwnProperty(a)&&(o=n[a],o!=null))switch(a){case"value":s=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:xe(e,t,a,o,n,null)}t=s,n=r,e.multiple=!!i,t!=null?jr(e,!!i,t,!1):n!=null&&jr(e,!!i,n,!0);return;case"textarea":jt("invalid",e),s=a=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":a=o;break;case"children":s=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(Z(91));break;default:xe(e,t,r,o,n,null)}ox(e,i,a,s);return;case"option":for(l in n)n.hasOwnProperty(l)&&(i=n[l],i!=null)&&(l==="selected"?e.selected=i&&typeof i!="function"&&typeof i!="symbol":xe(e,t,l,i,n,null));return;case"dialog":jt("beforetoggle",e),jt("toggle",e),jt("cancel",e),jt("close",e);break;case"iframe":case"object":jt("load",e);break;case"video":case"audio":for(i=0;i<Zl.length;i++)jt(Zl[i],e);break;case"image":jt("error",e),jt("load",e);break;case"details":jt("toggle",e);break;case"embed":case"source":case"link":jt("error",e),jt("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(Z(137,t));default:xe(e,t,c,i,n,null)}return;default:if(rg(t)){for(h in n)n.hasOwnProperty(h)&&(i=n[h],i!==void 0&&Xm(e,t,h,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&xe(e,t,o,i,n,null))}var gA={};function vA(e,t,n,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,s=null,r=null,o=null,l=null,c=null,h=null;for(p in n){var d=n[p];if(n.hasOwnProperty(p)&&d!=null)switch(p){case"checked":break;case"value":break;case"defaultValue":l=d;default:i.hasOwnProperty(p)||xe(e,t,p,null,i,d)}}for(var u in i){var p=i[u];if(d=n[u],i.hasOwnProperty(u)&&(p!=null||d!=null))switch(u){case"type":p!==d&&(ue=!0),s=p;break;case"name":p!==d&&(ue=!0),a=p;break;case"checked":p!==d&&(ue=!0),c=p;break;case"defaultChecked":p!==d&&(ue=!0),h=p;break;case"value":p!==d&&(ue=!0),r=p;break;case"defaultValue":p!==d&&(ue=!0),o=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(Z(137,t));break;default:p!==d&&xe(e,t,u,p,i,d)}}nm(e,r,o,l,c,h,s,a);return;case"select":p=r=o=u=null;for(s in n)if(l=n[s],n.hasOwnProperty(s)&&l!=null)switch(s){case"value":break;case"multiple":p=l;default:i.hasOwnProperty(s)||xe(e,t,s,null,i,l)}for(a in i)if(s=i[a],l=n[a],i.hasOwnProperty(a)&&(s!=null||l!=null))switch(a){case"value":s!==l&&(ue=!0),u=s;break;case"defaultValue":s!==l&&(ue=!0),o=s;break;case"multiple":s!==l&&(ue=!0),r=s;default:s!==l&&xe(e,t,a,s,i,l)}t=o,n=r,i=p,u!=null?jr(e,!!n,u,!1):!!i!=!!n&&(t!=null?jr(e,!!n,t,!0):jr(e,!!n,n?[]:"",!1));return;case"textarea":p=u=null;for(o in n)if(a=n[o],n.hasOwnProperty(o)&&a!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:xe(e,t,o,null,i,a)}for(r in i)if(a=i[r],s=n[r],i.hasOwnProperty(r)&&(a!=null||s!=null))switch(r){case"value":a!==s&&(ue=!0),u=a;break;case"defaultValue":a!==s&&(ue=!0),p=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(Z(91));break;default:a!==s&&xe(e,t,r,a,i,s)}rx(e,u,p);return;case"option":for(var g in n)u=n[g],n.hasOwnProperty(g)&&u!=null&&!i.hasOwnProperty(g)&&(g==="selected"?e.selected=!1:xe(e,t,g,null,i,u));for(l in i)u=i[l],p=n[l],i.hasOwnProperty(l)&&u!==p&&(u!=null||p!=null)&&(l==="selected"?(u!==p&&(ue=!0),e.selected=u&&typeof u!="function"&&typeof u!="symbol"):xe(e,t,l,u,i,p));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var x in n)u=n[x],n.hasOwnProperty(x)&&u!=null&&!i.hasOwnProperty(x)&&xe(e,t,x,null,i,u);for(c in i)if(u=i[c],p=n[c],i.hasOwnProperty(c)&&u!==p&&(u!=null||p!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(Z(137,t));break;default:xe(e,t,c,u,i,p)}return;default:if(rg(t)){for(var m in n)u=n[m],n.hasOwnProperty(m)&&u!==void 0&&!i.hasOwnProperty(m)&&Xm(e,t,m,void 0,i,u);for(h in i)u=i[h],p=n[h],!i.hasOwnProperty(h)||u===p||u===void 0&&p===void 0||Xm(e,t,h,u,i,p);return}}for(var f in n)u=n[f],n.hasOwnProperty(f)&&u!=null&&!i.hasOwnProperty(f)&&xe(e,t,f,null,i,u);for(d in i)u=i[d],p=n[d],!i.hasOwnProperty(d)||u===p||u==null&&p==null||xe(e,t,d,u,i,p)}function py(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function _A(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var a=n[i],s=a.transferSize,r=a.initiatorType,o=a.duration;if(s&&o&&py(r)){for(r=0,o=a.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var h=l.transferSize,d=l.initiatorType;h&&py(d)&&(l=l.responseEnd,r+=h*(l<o?1:(o-c)/(l-c)))}if(--i,t+=8*(s+r)/(a.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Wm=null,qm=null;function Kl(e){return e.nodeType===9?e:e.ownerDocument}function my(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function fM(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function dM(e,t,n,i){return n=Kl(n).createElement(e),n[un]=i,n[Bn]=t,pn(n,e,t),nn(n),n}function Ym(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Vp=null;function yA(){var e=window.event;return e&&e.type==="popstate"?e===Vp?!1:(Vp=e,!0):(Vp=null,!1)}var qg=typeof setTimeout=="function"?setTimeout:void 0,xA=typeof clearTimeout=="function"?clearTimeout:void 0,gy=typeof Promise=="function"?Promise:void 0,vy=typeof requestAnimationFrame=="function"?requestAnimationFrame:qg,SA=typeof queueMicrotask=="function"?queueMicrotask:typeof gy<"u"?function(e){return gy.resolve(null).then(e).catch(MA)}:qg;function MA(e){setTimeout(function(){throw e})}function gs(e){return e==="head"}function _y(e,t){var n=t,i=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"||n==="/&"){if(i===0){e.removeChild(a),xo(t);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")kp(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,kp(n);for(var s=n.firstChild;s;){var r=s.nextSibling,o=s.nodeName;s[sc]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&s.rel.toLowerCase()==="stylesheet"||n.removeChild(s),s=r}}else n==="body"&&kp(e.ownerDocument.body);n=a}while(n);xo(t)}function yy(e,t){var n=e;e=0;do{var i=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=i}while(n)}function pM(e,t,n){if(t=CSS.escape(t)!==t?"r-"+btoa(t).replace(/=/g,""):t,e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display==="inline"){if(t=e.getClientRects(),t.length===1)var i=1;else for(var a=i=0;a<t.length;a++){var s=t[a];0<s.width&&0<s.height&&i++}i===1&&(e=e.style,e.display=t.length===1?"inline-block":"block",e.marginTop="-"+n.paddingTop,e.marginBottom="-"+n.paddingBottom)}}function mM(e,t){e=e.style,t=t.style;var n=t!=null?t.hasOwnProperty("viewTransitionName")?t.viewTransitionName:t.hasOwnProperty("view-transition-name")?t["view-transition-name"]:null:null;e.viewTransitionName=n==null||typeof n=="boolean"?"":(""+n).trim(),n=t!=null?t.hasOwnProperty("viewTransitionClass")?t.viewTransitionClass:t.hasOwnProperty("view-transition-class")?t["view-transition-class"]:null:null,e.viewTransitionClass=n==null||typeof n=="boolean"?"":(""+n).trim(),e.display==="inline-block"&&(t==null?e.display=e.margin="":(n=t.display,e.display=n==null||typeof n=="boolean"?"":n,n=t.margin,n!=null?e.margin=n:(n=t.hasOwnProperty("marginTop")?t.marginTop:t["margin-top"],e.marginTop=n==null||typeof n=="boolean"?"":n,t=t.hasOwnProperty("marginBottom")?t.marginBottom:t["margin-bottom"],e.marginBottom=t==null||typeof t=="boolean"?"":t)))}function gM(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position==="absolute"||t.position==="fixed",clip:t.clipPath!=="none"||t.overflow!=="visible"||t.filter!=="none"||t.mask!=="none"||t.mask!=="none"||t.borderRadius!=="0px",view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Zm(e){var t=e.getBoundingClientRect(),n=getComputedStyle(e);return gM(t,n,e)}function bA(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return gM(t,n,e)}function EA(e){return e.documentElement.clientHeight}function TA(e){this.addEventListener("load",e),this.addEventListener("error",e)}function AA(e,t,n,i,a,s,r,o,l){var c=t.nodeType===9?t:t.ownerDocument;try{var h=c.startViewTransition({update:function(){var u=c.defaultView,p=u.navigation&&u.navigation.transition,g=c.fonts.status;i();var x=[];if(g==="loaded"&&(EA(c),c.fonts.status==="loading"&&x.push(c.fonts.ready)),g=x.length,e!==null)for(var m=e.suspenseyImages,f=0,v=0;v<m.length;v++){var _=m[v];if(!_.complete){var y=_.getBoundingClientRect();if(0<y.bottom&&0<y.right&&y.top<u.innerHeight&&y.left<u.innerWidth){if(f+=CM(_),f>Yu){x.length=g;break}_=new Promise(TA.bind(_)),x.push(_)}}}if(0<x.length)return u=Promise.race([Promise.all(x),new Promise(function(T){return setTimeout(T,500)})]).then(a,a),(p?Promise.allSettled([p.finished,u]):u).then(s,s);if(a(),p)return p.finished.then(s,s);s()},types:n});c.__reactViewTransition=h;var d=[];return h.ready.then(function(){for(var u=c.documentElement.getAnimations({subtree:!0}),p=0;p<u.length;p++){var g=u[p],x=g.effect,m=x.pseudoElement;if(m!=null&&m.startsWith("::view-transition")){d.push(g),g=x.getKeyframes();for(var f=m=void 0,v=!0,_=0;_<g.length;_++){var y=g[_],T=y.width;if(m===void 0)m=T;else if(m!==T){v=!1;break}if(T=y.height,f===void 0)f=T;else if(f!==T){v=!1;break}delete y.width,delete y.height,y.transform==="none"&&delete y.transform}v&&m!==void 0&&f!==void 0&&(x.setKeyframes(g),v=getComputedStyle(x.target,x.pseudoElement),v.width!==m||v.height!==f)&&(v=g[0],v.width=m,v.height=f,v=g[g.length-1],v.width=m,v.height=f,x.setKeyframes(g))}}r()},function(u){c.__reactViewTransition===h&&(c.__reactViewTransition=null);try{typeof u=="object"&&u!==null&&u.name==="InvalidStateError"&&(u.message==="View transition was skipped because document visibility state is hidden."||u.message==="Skipping view transition because document visibility state has become hidden."||u.message==="Skipping view transition because viewport size changed."||u.message==="Transition was aborted because of invalid state")&&(u=null),u!==null&&l(u)}finally{i(),a(),r()}}),h.finished.finally(function(){for(var u=0;u<d.length;u++)d[u].cancel();c.__reactViewTransition===h&&(c.__reactViewTransition=null),o()}),h}catch{return i(),a(),r(),null}}function ks(e,t){this._scope=document.documentElement,this._selector="::view-transition-"+e+"("+t+")"}ks.prototype.animate=function(e,t){return t=typeof t=="number"?{duration:t}:Te({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)};ks.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),i=[],a=0;a<n.length;a++){var s=n[a].effect;s!==null&&s.target===e&&s.pseudoElement===t&&i.push(n[a])}return i};ks.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function vM(e){return{name:e,group:new ks("group",e),imagePair:new ks("image-pair",e),old:new ks("old",e),new:new ks("new",e)}}function jn(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}jn.prototype.addEventListener=function(e,t,n){var i=null,a=null;if(!(n!=null&&typeof n!="boolean"&&(i=n.signal||null,i!==null&&i.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var s=this._eventListeners;if(_M(s,e,t,n)===-1){var r=this,o=t;n!=null&&typeof n!="boolean"&&n.once===!0&&(o=function(l){r.removeEventListener(e,t,n),typeof t=="function"?t.call(this,l):t.handleEvent(l)}),i!==null&&(a=r.removeEventListener.bind(r,e,t,n),i.addEventListener("abort",a,{once:!0}),a=i.removeEventListener.bind(i,"abort",a)),i=go(n),s.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:o,cleanup:a}),Pn(this._fragmentFiber.child,!1,wA,e,o,i)}this._eventListeners=s}};function wA(e,t,n,i){return Ze(e).addEventListener(t,n,i),!1}jn.prototype.removeEventListener=function(e,t,n){var i=this._eventListeners;if(i!==null&&(t=_M(i,e,t,n),t!==-1)){var a=i[t];n=a.attachedListener;var s=a.cleanup;a=go(a.optionsOrUseCapture),Pn(this._fragmentFiber.child,!1,CA,e,n,a),i.splice(t,1),s!==null&&s()}};function CA(e,t,n,i){return Ze(e).removeEventListener(t,n,i),!1}function go(e){return e!=null&&typeof e!="boolean"&&(e.once===!0||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function xy(e){return e==null?"c=0":typeof e=="boolean"?"c="+(e?"1":"0"):"c="+(e.capture?"1":"0")}function _M(e,t,n,i){if(e.length===0)return-1;i=xy(i);for(var a=0;a<e.length;a++){var s=e[a];if(s.type===t&&s.listener===n&&xy(s.optionsOrUseCapture)===i)return a}return-1}jn.prototype.dispatchEvent=function(e){var t=ir(this._fragmentFiber);if(t===null)return!0;t=Ze(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var i=t.nodeType===9?t.createComment(""):document.createTextNode("");if(n)for(var a=0;a<n.length;a++){var s=n[a];i.addEventListener(s.type,s.attachedListener,go(s.optionsOrUseCapture))}if(t.appendChild(i),e=i.dispatchEvent(e),n)for(a=0;a<n.length;a++)s=n[a],i.removeEventListener(s.type,s.attachedListener,go(s.optionsOrUseCapture));return t.removeChild(i),e}return t.dispatchEvent(e)};jn.prototype.focus=function(e){Pn(this._fragmentFiber.child,!0,yM,e,void 0,void 0)};function yM(e,t){return e.tag===6?!1:(e=Ze(e),HA(e,t))}jn.prototype.focusLast=function(e){var t=[];Pn(this._fragmentFiber.child,!0,Yg,t,void 0,void 0);for(var n=t.length-1;0<=n&&!yM(t[n],e);n--);};function Yg(e,t){return t.push(e),!1}jn.prototype.blur=function(){var e=ir(this._fragmentFiber);e!==null&&(e=Ze(e),e=Kl(e).activeElement,e!==null&&Pn(this._fragmentFiber.child,!1,RA,e,void 0,void 0))};function RA(e,t){return e.tag===6?!1:(e=Ze(e),e===t||e.contains(t)?(t.blur(),!0):!1)}jn.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),Pn(this._fragmentFiber.child,!1,DA,e,void 0,void 0)};function DA(e,t){return e.tag===6||(e=Ze(e),t.observe(e)),!1}jn.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),Pn(this._fragmentFiber.child,!1,UA,e,void 0,void 0);for(var n=t=0;n<Ri.length;n++){var i=Ri[n];i.fragmentInstance===this&&i.observer===e?e.unobserve(i.instance):Ri[t++]=i}Ri.length=t}};function UA(e,t){return e.tag===6||(e=Ze(e),t.unobserve(e)),!1}var Ri=[],Gp=!1;function NA(e,t,n){Ri.push({fragmentInstance:e,observer:t,instance:n}),Gp||(Gp=!0,VA(function(){Gp=!1;var i=Ri;Ri=[];for(var a=0;a<i.length;a++){var s=i[a];s.observer.unobserve(s.instance)}}))}jn.prototype.getClientRects=function(){var e=[];return Pn(this._fragmentFiber.child,!1,LA,e,void 0,void 0),e};function LA(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=Ze(e),t.push.apply(t,e.getClientRects());return!1}jn.prototype.getRootNode=function(e){var t=ir(this._fragmentFiber);return t===null?this:Ze(t).getRootNode(e)};jn.prototype.compareDocumentPosition=function(e){var t=ir(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];Pn(this._fragmentFiber.child,!1,Yg,n,void 0,void 0);var i=Ze(t);if(n.length===0){if(n=i,$v(this._fragmentFiber)){t:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break t}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var a=i=n.compareDocumentPosition(e);return n===e?a=Node.DOCUMENT_POSITION_CONTAINS:i&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=Vy(t)[1],n===null?a=Node.DOCUMENT_POSITION_PRECEDING:(e=Ze(n).compareDocumentPosition(e),a=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),a|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=Ze(n[0]),a=Ze(n[n.length-1]);var s=$v(this._fragmentFiber)?t.parentElement:i;if(s==null)return Node.DOCUMENT_POSITION_DISCONNECTED;i=s.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,s=s.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_CONTAINED_BY;var r=t.compareDocumentPosition(e),o=a.compareDocumentPosition(e),l=r&Node.DOCUMENT_POSITION_CONTAINED_BY||o&Node.DOCUMENT_POSITION_CONTAINED_BY;return o=i&&s&&r&Node.DOCUMENT_POSITION_FOLLOWING&&o&Node.DOCUMENT_POSITION_PRECEDING,t=i&&t===e||s&&a===e||l||o?Node.DOCUMENT_POSITION_CONTAINED_BY:!i&&t===e||!s&&a===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:r,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||OA(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function OA(e,t,n,i,a){var s=Gs(a);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!s)t:{for(;s!==null;){if(s.tag===7&&(s===t||s.alternate===t)){n=!0;break t}s=s.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(s===null)return s=a.ownerDocument,a===s||a===s.documentElement||a===s.body;t:{for(s=t,t=ir(t);s!==null;){if(!(s.tag!==5&&s.tag!==3&&s.tag!==27||s!==t&&s.alternate!==t)){s=!0;break t}s=s.return}s=!1}return s}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!s)&&!(t=s===n)&&(t=Wp(n,s,t_),t===null?t=!1:(Pn(t,!0,uE,s,n),s=Fr,Fr=null,t=s!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!s)&&!(t=s===i)&&(t=Wp(i,s,t_),t===null?t=!1:(Pn(t,!0,hE,s,i),s=Fr,Xp=Fr=null,t=s!==null)),t):!1}function Sy(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}jn.prototype.scrollIntoView=function(e){if(typeof e=="object")throw Error(Z(566));var t=[];Pn(this._fragmentFiber.child,!1,Yg,t,void 0,void 0);var n=e!==!1;if(t.length===0){var i=Vy(this._fragmentFiber);if(i=n?i[1]||i[0]||ir(this._fragmentFiber):i[0]||i[1],i===null)return;if(i.tag===6){e=Ze(i),Sy(e,n);return}if(i=Ze(i),i.nodeType!==9){if(i.nodeType===11){n="host"in i?i.host:null,n!==null&&n.scrollIntoView(e);return}i.scrollIntoView(e)}}for(i=n?t.length-1:0;i!==(n?-1:t.length);){var a=t[i];a.tag===6?(a=Ze(a),Sy(a,n)):Ze(a).scrollIntoView(e),i+=n?-1:1}};function IA(e,t){return e=Ze(e),xM(e,t),!1}function xM(e,t){e.reactFragments==null&&(e.reactFragments=new Set),e.reactFragments.add(t)}function SM(e,t){var n=t._eventListeners;if(n!==null)for(var i=0;i<n.length;i++){var a=n[i];e.addEventListener(a.type,a.attachedListener,go(a.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(s){for(var r=0,o=0;o<Ri.length;o++){var l=Ri[o];(l.fragmentInstance!==t||l.observer!==s||l.instance!==e)&&(Ri[r++]=l)}Ri.length=r,s.observe(e)}),xM(e,t))}function PA(e,t){var n=t._eventListeners;if(n!==null)for(var i=0;i<n.length;i++){var a=n[i];e.removeEventListener(a.type,a.attachedListener,go(a.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(s){typeof s.rootMargin=="string"?NA(t,s,e):s.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function Jm(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Jm(n),Ah(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function BA(e,t,n,i){for(;e.nodeType===1;){var a=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[sc])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(s=e.getAttribute("rel"),s==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(s!==a.rel||e.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||e.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||e.getAttribute("title")!==(a.title==null?null:a.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(s=e.getAttribute("src"),(s!==(a.src==null?null:a.src)||e.getAttribute("type")!==(a.type==null?null:a.type)||e.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&s&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var s=a.name==null?null:""+a.name;if(a.type==="hidden"&&e.getAttribute("name")===s)return e}else return e;if(e=mi(e.nextSibling),e===null)break}return null}function zA(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=mi(e.nextSibling),e===null))return null;return e}function MM(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=mi(e.nextSibling),e===null))return null;return e}function Km(e){return e.data==="$?"||e.data==="$~"}function Zg(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function FA(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var i=function(){t(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function mi(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Qm=null;function My(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return mi(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function by(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function HA(e,t){function n(){i=!0}if(e.ownerDocument.activeElement===e)return!0;var i=!1;try{e.ownerDocument.addEventListener("focus",n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener("focus",n,!0)}return i}function VA(e){vy(function(){vy(function(t){return e(t)})})}function bM(e,t,n){switch(t=Kl(n),e){case"html":if(e=t.documentElement,!e)throw Error(Z(452));return e;case"head":if(e=t.head,!e)throw Error(Z(453));return e;case"body":if(e=t.body,!e)throw Error(Z(454));return e;default:throw Error(Z(451))}}function EM(e,t,n){for(var i in n){var a=n[i];n.hasOwnProperty(i)&&a!=null&&xe(e,t,i,null,gA,a)}n.dangerouslySetInnerHTML!=null&&(e.textContent=""),e.onclick===Ki&&(e.onclick=null),Ah(e)}function kp(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Ah(e)}var gi=new Map,Ey=new Set;function Ql(e){if(typeof e.getRootNode=="function"){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var wa=de.d;de.d={f:GA,r:kA,D:XA,C:WA,L:qA,m:YA,X:JA,S:ZA,M:KA};function GA(){var e=wa.f(),t=Hh();return e||t}function kA(e){var t=Mo(e);t!==null&&t.tag===5&&t.type==="form"?lS(t):wa.r(e)}var Ao=typeof document>"u"?null:document;function TM(e,t,n){var i=Ao;if(i&&typeof t=="string"&&t){var a=fi(t);a='link[rel="'+e+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),Ey.has(a)||(Ey.add(a),e={rel:e,crossOrigin:n,href:t},i.querySelector(a)===null&&(t=i.createElement("link"),pn(t,"link",e),nn(t),i.head.appendChild(t)))}}function XA(e){wa.D(e),TM("dns-prefetch",e,null)}function WA(e,t){wa.C(e,t),TM("preconnect",e,t)}function qA(e,t,n){wa.L(e,t,n);var i=Ao;if(i&&e&&t){var a='link[rel="preload"][as="'+fi(t)+'"]';t==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+fi(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+fi(n.imageSizes)+'"]')):a+='[href="'+fi(e)+'"]';var s=a;switch(t){case"style":s=vo(e);break;case"script":s=wo(e)}if(!(gi.has(s)||(e=Te({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),gi.set(s,e),i.querySelector(a)!==null||t==="style"&&i.querySelector(hc(s))||t==="script"&&i.querySelector(fc(s))))){var r=i.createElement("link");pn(r,"link",e),t==="style"&&(r[th]=!0,r.onload=r.onerror=function(){tx(r)}),nn(r),i.head.appendChild(r)}}}function YA(e,t){wa.m(e,t);var n=Ao;if(n&&e){var i=t&&typeof t.as=="string"?t.as:"script",a='link[rel="modulepreload"][as="'+fi(i)+'"][href="'+fi(e)+'"]',s=a;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=wo(e)}if(!gi.has(s)&&(e=Te({rel:"modulepreload",href:e},t),gi.set(s,e),n.querySelector(a)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(fc(s)))return}i=n.createElement("link"),pn(i,"link",e),nn(i),n.head.appendChild(i)}}}function ZA(e,t,n){wa.S(e,t,n);var i=Ao;if(i&&e){var a=Qr(i).hoistableStyles,s=vo(e);t=t||"default";var r=a.get(s);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(hc(s)))o.loading=5;else{e=Te({rel:"stylesheet",href:e,"data-precedence":t},n),(n=gi.get(s))&&Jg(e,n);var l=r=i.createElement("link");nn(l),pn(l,"link",e),l._p=new Promise(function(c,h){l.onload=c,l.onerror=h}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,Wu(r,t,i)}r={type:"stylesheet",instance:r,count:1,state:o},a.set(s,r)}}}function JA(e,t){wa.X(e,t);var n=Ao;if(n&&e){var i=Qr(n).hoistableScripts,a=wo(e),s=i.get(a);s||(s=n.querySelector(fc(a)),s||(e=Te({src:e,async:!0},t),(t=gi.get(a))&&Kg(e,t),s=n.createElement("script"),nn(s),pn(s,"link",e),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function KA(e,t){wa.M(e,t);var n=Ao;if(n&&e){var i=Qr(n).hoistableScripts,a=wo(e),s=i.get(a);s||(s=n.querySelector(fc(a)),s||(e=Te({src:e,async:!0,type:"module"},t),(t=gi.get(a))&&Kg(e,t),s=n.createElement("script"),nn(s),pn(s,"link",e),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function Ty(e,t,n,i){var a=(a=ts.current)?Ql(a):null;if(!a)throw Error(Z(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(n=vo(n.href),t=Qr(a).hoistableStyles,i=t.get(n),i||(i={type:"style",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=vo(n.href);var s=Qr(a).hoistableStyles,r=s.get(e);if(r||(a=a.ownerDocument||a,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(e,r),(s=a.querySelector(hc(e)))?s._p||(r.instance=s,r.state.loading=5):(s=gi.get(e),s||(s={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},gi.set(e,s)),QA(a,e,s,r.state))),t&&i===null)throw Error(Z(528,""));return r}if(t&&i!==null)throw Error(Z(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(n=wo(n),t=Qr(a).hoistableScripts,i=t.get(n),i||(i={type:"script",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(Z(444,e))}}function vo(e){return'href="'+fi(e)+'"'}function hc(e){return'link[rel="stylesheet"]['+e+"]"}function AM(e){return Te({},e,{"data-precedence":e.precedence,precedence:null})}function QA(e,t,n,i){if(t=e.querySelector('link[rel="preload"][as="style"]['+t+"]")){if(t[th]!==!0){i.loading=1;return}}else t=e.createElement("link"),t[th]=!0,t.onload=t.onerror=tx.bind(null,t),pn(t,"link",n),nn(t),e.head.appendChild(t);i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2})}function wo(e){return'[src="'+fi(e)+'"]'}function fc(e){return"script[async]"+e}function Ay(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+fi(n.href)+'"]');if(i)return t.instance=i,nn(i),i;var a=Te({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),nn(i),pn(i,"style",a),Wu(i,n.precedence,e),t.instance=i;case"stylesheet":a=vo(n.href);var s=e.querySelector(hc(a));if(s)return t.state.loading|=4,t.instance=s,nn(s),s;i=AM(n),(a=gi.get(a))&&Jg(i,a),s=(e.ownerDocument||e).createElement("link"),nn(s);var r=s;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),pn(s,"link",i),t.state.loading|=4,Wu(s,n.precedence,e),t.instance=s;case"script":return s=wo(n.src),(a=e.querySelector(fc(s)))?(t.instance=a,nn(a),a):(i=n,(a=gi.get(s))&&(i=Te({},n),Kg(i,a)),e=e.ownerDocument||e,a=e.createElement("script"),nn(a),pn(a,"link",i),e.head.appendChild(a),t.instance=a);case"void":return null;default:throw Error(Z(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,Wu(i,n.precedence,e));return t.instance}function Wu(e,t,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=i.length?i[i.length-1]:null,s=a,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===t)s=o;else if(s!==a)break}s?s.parentNode.insertBefore(e,s.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Jg(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Kg(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var qu=null;function wy(e,t,n){if(qu===null){var i=new Map,a=qu=new Map;a.set(n,i)}else a=qu,i=a.get(n),i||(i=new Map,a.set(n,i));if(i.has(e))return i;for(i.set(e,null),n=n.getElementsByTagName(e),a=0;a<n.length;a++){var s=n[a];if(!(s[sc]||s[un]||e==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var r=s.getAttribute(t)||"";r=e+r;var o=i.get(r);o?o.push(s):i.set(r,[s])}}return i}function jm(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function jA(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;return t.rel==="stylesheet"?(e=t.disabled,typeof t.precedence=="string"&&e==null):!0;case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Cy(e,t){return e==="img"&&t.src!=null&&t.src!==""&&t.onLoad==null&&t.loading!=="lazy"}function wM(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function CM(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function Ry(e,t){typeof t.decode=="function"&&(e.imgCount++,t.complete||(e.imgBytes+=CM(t),e.suspenseyImages.push(t)),e=ew.bind(e),t.decode().then(e,e))}function $A(e,t,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var a=vo(i.href),s=t.querySelector(hc(a));if(s){t=s._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=jl.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=s,nn(s);return}s=t.ownerDocument||t,i=AM(i),(a=gi.get(a))&&Jg(i,a),s=s.createElement("link"),nn(s);var r=s;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),pn(s,"link",i),n.instance=s}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(e.count++,n=jl.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var Yu=0;function tw(e,t){return e.stylesheets&&e.count===0&&Zu(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var i=setTimeout(function(){if(e.stylesheets&&Zu(e,e.stylesheets),e.unsuspend){var s=e.unsuspend;e.unsuspend=null,s()}},6e4+t);0<e.imgBytes&&Yu===0&&(Yu=62500*_A());var a=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Zu(e,e.stylesheets),e.unsuspend)){var s=e.unsuspend;e.unsuspend=null,s()}},(e.imgBytes>Yu?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(a)}}:null}function RM(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)Zu(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function jl(){this.count--,RM(this)}function ew(){this.imgCount--,RM(this)}var bh=null;function Zu(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,bh=new Map,t.forEach(nw,e),bh=null,jl.call(e))}function nw(e,t){if(!(t.state.loading&4)){var n=bh.get(e);if(n)var i=n.get(null);else{n=new Map,bh.set(e,n);for(var a=e.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<a.length;s++){var r=a[s];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}a=t.instance,r=a.getAttribute("data-precedence"),s=n.get(r)||i,s===i&&n.set(null,a),n.set(r,a),this.count++,i=jl.bind(this),a.addEventListener("load",i),a.addEventListener("error",i),s?s.parentNode.insertBefore(a,s.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(a,e.firstChild)),t.state.loading|=4}}var _o={$$typeof:Ji,Provider:null,Consumer:null,_currentValue:Xs,_currentValue2:Xs,_threadCount:0};function iw(e,t,n,i,a,s,r,o,l){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=vp(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=vp(0),this.hiddenUpdates=vp(null),this.identifierPrefix=i,this.onUncaughtError=a,this.onCaughtError=s,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.transitionTypes=null,this.incompleteTransitions=new Map}function DM(e,t,n,i,a,s,r,o,l,c,h,d){return e=new iw(e,t,n,r,l,c,h,d,o),t=1,s===!0&&(t|=24),s=On(3,null,null,t),e.current=s,s.stateNode=e,t=gg(),t.refCount++,e.pooledCache=t,t.refCount++,s.memoizedState={element:i,isDehydrated:n,cache:t},yg(s),e}function UM(e){return e?(e=Yr,e):Yr}function NM(e,t,n,i,a,s){a=UM(a),i.context===null?i.context=a:i.pendingContext=a,i=ns(t),i.payload={element:n},s=s===void 0?null:s,s!==null&&(i.callback=s),n=is(e,i,t),n!==null&&(In(n,e,t),Dl(n,e,t))}function Dy(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Qg(e,t){Dy(e,t),(e=e.alternate)&&Dy(e,t)}function LM(e){if(e.tag===13||e.tag===31){var t=rr(e,67108864);t!==null&&In(t,e,67108864),Qg(e,67108864)}}function Uy(e){if(e.tag===13||e.tag===31){var t=Kn();t=ag(t);var n=rr(e,t);n!==null&&In(n,e,t),Qg(e,t)}}var yo=!0;function aw(e,t,n,i){var a=Ft.T;Ft.T=null;var s=de.p;try{de.p=2,jg(e,t,n,i)}finally{de.p=s,Ft.T=a}}function sw(e,t,n,i){var a=Ft.T;Ft.T=null;var s=de.p;try{de.p=8,jg(e,t,n,i)}finally{de.p=s,Ft.T=a}}function jg(e,t,n,i){if(yo){var a=$m(i);if(a===null)Hp(e,t,i,Eh,n),Ny(e,i);else if(ow(a,e,t,n,i))i.stopPropagation();else if(Ny(e,i),t&4&&-1<rw.indexOf(e)){for(;a!==null;){var s=Mo(a);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var r=Fs(s.pendingLanes);if(r!==0){var o=s;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-Jn(r);o.entanglements[1]|=l,r&=~l}ia(s),(fe&6)===0&&(_h=Yn()+500,uc(0,!1))}}break;case 31:case 13:o=rr(s,2),o!==null&&In(o,s,2),Hh(),Qg(s,2)}if(s=$m(i),s===null&&Hp(e,t,i,Eh,n),s===a)break;a=s}a!==null&&i.stopPropagation()}else Hp(e,t,i,null,n)}}function $m(e){return e=og(e),$g(e)}var Eh=null;function $g(e){if(Eh=null,e=Gs(e),e!==null){var t=ec(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=zy(t),e!==null)return e;e=null}else if(n===31){if(e=Fy(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Eh=e,null}function OM(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(xE()){case Wy:return 2;case qy:return 8;case $u:case SE:return 32;case Yy:return 268435456;default:return 32}default:return 32}}var tg=!1,os=null,ls=null,cs=null,$l=new Map,tc=new Map,Ya=[],rw="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Ny(e,t){switch(e){case"focusin":case"focusout":os=null;break;case"dragenter":case"dragleave":ls=null;break;case"mouseover":case"mouseout":cs=null;break;case"pointerover":case"pointerout":$l.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":tc.delete(t.pointerId)}}function yl(e,t,n,i,a,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[a]},t!==null&&(t=Mo(t),t!==null&&LM(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function ow(e,t,n,i,a){switch(t){case"focusin":return os=yl(os,e,t,n,i,a),!0;case"dragenter":return ls=yl(ls,e,t,n,i,a),!0;case"mouseover":return cs=yl(cs,e,t,n,i,a),!0;case"pointerover":var s=a.pointerId;return $l.set(s,yl($l.get(s)||null,e,t,n,i,a)),!0;case"gotpointercapture":return s=a.pointerId,tc.set(s,yl(tc.get(s)||null,e,t,n,i,a)),!0}return!1}function IM(e){var t=Gs(e.target);if(t!==null){var n=ec(t);if(n!==null){if(t=n.tag,t===13){if(t=zy(n),t!==null){e.blockedOn=t,a_(e.priority,function(){Uy(n)});return}}else if(t===31){if(t=Fy(n),t!==null){e.blockedOn=t,a_(e.priority,function(){Uy(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ju(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=$m(e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);im=i,n.target.dispatchEvent(i),im=null}else return t=Mo(n),t!==null&&LM(t),e.blockedOn=n,!1;t.shift()}return!0}function Ly(e,t,n){Ju(e)&&n.delete(t)}function lw(){tg=!1,os!==null&&Ju(os)&&(os=null),ls!==null&&Ju(ls)&&(ls=null),cs!==null&&Ju(cs)&&(cs=null),$l.forEach(Ly),tc.forEach(Ly)}function Ru(e,t){e.blockedOn===t&&(e.blockedOn=null,tg||(tg=!0,Je.unstable_scheduleCallback(Je.unstable_NormalPriority,lw)))}var Du=null;function Oy(e){Du!==e&&(Du=e,Je.unstable_scheduleCallback(Je.unstable_NormalPriority,function(){Du===e&&(Du=null);for(var t=0;t<e.length;t+=3){var n=e[t],i=e[t+1],a=e[t+2];if(typeof i!="function"){if($g(i||n)===null)continue;break}var s=Mo(n);s!==null&&(e.splice(t,3),t-=3,ym(s,{pending:!0,data:a,method:n.method,action:i},i,a))}}))}function xo(e){function t(l){return Ru(l,e)}os!==null&&Ru(os,e),ls!==null&&Ru(ls,e),cs!==null&&Ru(cs,e),$l.forEach(t),tc.forEach(t);for(var n=0;n<Ya.length;n++){var i=Ya[n];i.blockedOn===e&&(i.blockedOn=null)}for(;0<Ya.length&&(n=Ya[0],n.blockedOn===null);)IM(n),n.blockedOn===null&&Ya.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var a=n[i],s=n[i+1],r=a[Bn]||null;if(typeof s=="function")r||Oy(n);else if(r){var o=null;if(s&&s.hasAttribute("formAction")){if(a=s,r=s[Bn]||null)o=r.formAction;else if($g(a)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),Oy(n)}}}function PM(){function e(s){s.canIntercept&&s.info==="react-transition"&&s.intercept({handler:function(){return new Promise(function(r){return a=r})},focusReset:"manual",scroll:"manual"})}function t(){a!==null&&(a(),a=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var s=navigation.currentEntry;s&&s.url!=null&&navigation.navigate(s.url,{state:s.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,a=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),a!==null&&(a(),a=null)}}}function t0(e){this._internalRoot=e}kh.prototype.render=t0.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(Z(409));var n=t.current,i=Kn();NM(n,i,e,t,null,null)};kh.prototype.unmount=t0.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;NM(e.current,2,null,e,null,null),Hh(),t[So]=null}};function kh(e){this._internalRoot=e}kh.prototype.unstable_scheduleHydration=function(e){if(e){var t=$y();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Ya.length&&t!==0&&t<Ya[n].priority;n++);Ya.splice(n,0,e),n===0&&IM(e)}};var Iy=Py.version;if(Iy!=="19.3.1")throw Error(Z(527,Iy,"19.3.1"));de.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(Z(188)):(e=Object.keys(e).join(","),Error(Z(268,e)));return e=cE(t),e=e!==null?Hy(e):null,e=e===null?null:e.stateNode,e};var cw={bundleType:0,version:"19.3.1",rendererPackageName:"react-dom",currentDispatcherRef:Ft,reconcilerVersion:"19.3.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(xl=__REACT_DEVTOOLS_GLOBAL_HOOK__,!xl.isDisabled&&xl.supportsFiber))try{nc=xl.inject(cw),Zn=xl}catch{}var xl;Xh.createRoot=function(e,t){if(!By(e))throw Error(Z(299));var n=!1,i="",a=gS,s=vS,r=_S;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(a=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=DM(e,1,!1,null,null,n,i,null,a,s,r,PM),e[So]=t.current,Wg(e),new t0(t)};Xh.hydrateRoot=function(e,t,n){if(!By(e))throw Error(Z(299));var i=!1,a="",s=gS,r=vS,o=_S,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(s=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),t=DM(e,1,!0,t,n??null,i,a,l,s,r,o,PM),t.context=UM(null),n=t.current,i=Kn(),i=ag(i),a=ns(i),a.callback=null,is(n,a,i),n=i,t.current.lanes=n,ac(t,n),ia(t),e[So]=t.current,Wg(e),new kh(t)};Xh.version="19.3.1"});var HM=Gi((QD,FM)=>{"use strict";function zM(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(zM)}catch(e){console.error(e)}}zM(),FM.exports=BM()});var C1=Gi(Xd=>{"use strict";var AD=Symbol.for("react.transitional.element"),wD=Symbol.for("react.fragment");function w1(e,t,n){var i=null;if(n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),"key"in t){n={};for(var a in t)a!=="key"&&(n[a]=t[a])}else n=t;return t=n.ref,{$$typeof:AD,type:e,key:i,ref:t!==void 0?t:null,props:n}}Xd.Fragment=wD;Xd.jsx=w1;Xd.jsxs=w1});var $c=Gi((yO,R1)=>{"use strict";R1.exports=C1()});var ha=Ps(ul(),1),F1=Ps(HM(),1);var Ar=Ps(ul(),1);var cb=0,O0=1,ub=2;var I0=1,hb=2,oa=3,Oa=0,Rn=1,la=2,zi=0,Ia=1,kc=2,P0=3,B0=4,Xc=5,Ts=100,fb=101,db=102,pb=103,mb=104,Yf=200,Fi=201,gb=202,vb=203,pf=204,pr=205,_b=206,yb=207,xb=208,Sb=209,Mb=210,bb=211,Eb=212,Tb=213,Ab=214,Zf=0,Jf=1,Kf=2,mr=3,Qf=4,jf=5,$f=6,td=7,z0=0,wb=1,Cb=2,za=0,Rb=1,Db=2,Ub=3,Nb=4,Lb=5,Ob=6,Ib=7;var F0=300,_r=301,yr=302,ed=303,nd=304,Wc=306,mf=1e3,Es=1001,gf=1002,_i=1003,Pb=1004;var qc=1005;var Pi=1006,id=1007;var Us=1008;var Si=1009,H0=1010,V0=1011,Jo=1012,ad=1013,Ns=1014,ca=1015,Ls=1016,sd=1017,rd=1018,Ko=1020,G0=35902,k0=35899,X0=1021,W0=1022,Mi=1023,Vo=1026,Qo=1027,q0=1028,od=1029,Y0=1030,ld=1031;var cd=1033,Yc=33776,Zc=33777,Jc=33778,Kc=33779,ud=35840,hd=35841,fd=35842,dd=35843,pd=36196,md=37492,gd=37496,vd=37808,_d=37809,yd=37810,xd=37811,Sd=37812,Md=37813,bd=37814,Ed=37815,Td=37816,Ad=37817,wd=37818,Cd=37819,Rd=37820,Dd=37821,Ud=36492,Nd=36494,Ld=36495,Od=36283,Id=36284,Pd=36285,Bd=36286;var Sc=2300,vf=2301,df=2302,C0=2400,R0=2401,D0=2402;var Bb=3200,zb=3201;var Fb=0,Hb=1,Fa="",ei="srgb",sa="srgb-linear",Mc="linear",Me="srgb";var fr=7680;var U0=519,Vb=512,Gb=513,kb=514,Z0=515,Xb=516,Wb=517,qb=518,Yb=519,N0=35044;var J0="300 es",Ii=2e3,bc=2001;var Pa=class{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){let i=this._listeners;if(i===void 0)return;let a=i[t];if(a!==void 0){let s=a.indexOf(n);s!==-1&&a.splice(s,1)}}dispatchEvent(t){let n=this._listeners;if(n===void 0)return;let i=n[t.type];if(i!==void 0){t.target=this;let a=i.slice(0);for(let s=0,r=a.length;s<r;s++)a[s].call(this,t);t.target=null}}},xn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var e0=Math.PI/180,_f=180/Math.PI;function Qc(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(xn[e&255]+xn[e>>8&255]+xn[e>>16&255]+xn[e>>24&255]+"-"+xn[t&255]+xn[t>>8&255]+"-"+xn[t>>16&15|64]+xn[t>>24&255]+"-"+xn[n&63|128]+xn[n>>8&255]+"-"+xn[n>>16&255]+xn[n>>24&255]+xn[i&255]+xn[i>>8&255]+xn[i>>16&255]+xn[i>>24&255]).toLowerCase()}function te(e,t,n){return Math.max(t,Math.min(n,e))}function uw(e,t){return(e%t+t)%t}function n0(e,t,n){return(1-n)*e+n*t}function dc(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function zn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}var It=class e{constructor(t=0,n=0){e.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let n=this.x,i=this.y,a=t.elements;return this.x=a[0]*n+a[3]*i+a[6],this.y=a[1]*n+a[4]*i+a[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=te(this.x,t.x,n.x),this.y=te(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=te(this.x,t,n),this.y=te(this.y,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(te(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(te(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){let i=Math.cos(n),a=Math.sin(n),s=this.x-t.x,r=this.y-t.y;return this.x=s*i-r*a+t.x,this.y=s*a+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ba=class{constructor(t=0,n=0,i=0,a=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=a}static slerpFlat(t,n,i,a,s,r,o){let l=i[a+0],c=i[a+1],h=i[a+2],d=i[a+3],u=s[r+0],p=s[r+1],g=s[r+2],x=s[r+3];if(o===0){t[n+0]=l,t[n+1]=c,t[n+2]=h,t[n+3]=d;return}if(o===1){t[n+0]=u,t[n+1]=p,t[n+2]=g,t[n+3]=x;return}if(d!==x||l!==u||c!==p||h!==g){let m=1-o,f=l*u+c*p+h*g+d*x,v=f>=0?1:-1,_=1-f*f;if(_>Number.EPSILON){let T=Math.sqrt(_),C=Math.atan2(T,f*v);m=Math.sin(m*C)/T,o=Math.sin(o*C)/T}let y=o*v;if(l=l*m+u*y,c=c*m+p*y,h=h*m+g*y,d=d*m+x*y,m===1-o){let T=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=T,c*=T,h*=T,d*=T}}t[n]=l,t[n+1]=c,t[n+2]=h,t[n+3]=d}static multiplyQuaternionsFlat(t,n,i,a,s,r){let o=i[a],l=i[a+1],c=i[a+2],h=i[a+3],d=s[r],u=s[r+1],p=s[r+2],g=s[r+3];return t[n]=o*g+h*d+l*p-c*u,t[n+1]=l*g+h*u+c*d-o*p,t[n+2]=c*g+h*p+o*u-l*d,t[n+3]=h*g-o*d-l*u-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,a){return this._x=t,this._y=n,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){let i=t._x,a=t._y,s=t._z,r=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(a/2),d=o(s/2),u=l(i/2),p=l(a/2),g=l(s/2);switch(r){case"XYZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"YZX":this._x=u*h*d+c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d-u*p*g;break;case"XZY":this._x=u*h*d-c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d+u*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){let i=n/2,a=Math.sin(i);return this._x=t.x*a,this._y=t.y*a,this._z=t.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let n=t.elements,i=n[0],a=n[4],s=n[8],r=n[1],o=n[5],l=n[9],c=n[2],h=n[6],d=n[10],u=i+o+d;if(u>0){let p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(r-a)*p}else if(i>o&&i>d){let p=2*Math.sqrt(1+i-o-d);this._w=(h-l)/p,this._x=.25*p,this._y=(a+r)/p,this._z=(s+c)/p}else if(o>d){let p=2*Math.sqrt(1+o-i-d);this._w=(s-c)/p,this._x=(a+r)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+d-i-o);this._w=(r-a)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(te(this.dot(t),-1,1)))}rotateTowards(t,n){let i=this.angleTo(t);if(i===0)return this;let a=Math.min(1,n/i);return this.slerp(t,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){let i=t._x,a=t._y,s=t._z,r=t._w,o=n._x,l=n._y,c=n._z,h=n._w;return this._x=i*h+r*o+a*c-s*l,this._y=a*h+r*l+s*o-i*c,this._z=s*h+r*c+i*l-a*o,this._w=r*h-i*o-a*l-s*c,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);let i=this._x,a=this._y,s=this._z,r=this._w,o=r*t._w+i*t._x+a*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=r,this._x=i,this._y=a,this._z=s,this;let l=1-o*o;if(l<=Number.EPSILON){let p=1-n;return this._w=p*r+n*this._w,this._x=p*i+n*this._x,this._y=p*a+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-n)*h)/c,u=Math.sin(n*h)/c;return this._w=r*d+this._w*u,this._x=i*d+this._x*u,this._y=a*d+this._y*u,this._z=s*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){let t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(a*Math.sin(t),a*Math.cos(t),s*Math.sin(n),s*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class e{constructor(t=0,n=0,i=0){e.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(VM.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(VM.setFromAxisAngle(t,n))}applyMatrix3(t){let n=this.x,i=this.y,a=this.z,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6]*a,this.y=s[1]*n+s[4]*i+s[7]*a,this.z=s[2]*n+s[5]*i+s[8]*a,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let n=this.x,i=this.y,a=this.z,s=t.elements,r=1/(s[3]*n+s[7]*i+s[11]*a+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*a+s[12])*r,this.y=(s[1]*n+s[5]*i+s[9]*a+s[13])*r,this.z=(s[2]*n+s[6]*i+s[10]*a+s[14])*r,this}applyQuaternion(t){let n=this.x,i=this.y,a=this.z,s=t.x,r=t.y,o=t.z,l=t.w,c=2*(r*a-o*i),h=2*(o*n-s*a),d=2*(s*i-r*n);return this.x=n+l*c+r*d-o*h,this.y=i+l*h+o*c-s*d,this.z=a+l*d+s*h-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let n=this.x,i=this.y,a=this.z,s=t.elements;return this.x=s[0]*n+s[4]*i+s[8]*a,this.y=s[1]*n+s[5]*i+s[9]*a,this.z=s[2]*n+s[6]*i+s[10]*a,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=te(this.x,t.x,n.x),this.y=te(this.y,t.y,n.y),this.z=te(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=te(this.x,t,n),this.y=te(this.y,t,n),this.z=te(this.z,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(te(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){let i=t.x,a=t.y,s=t.z,r=n.x,o=n.y,l=n.z;return this.x=a*l-s*o,this.y=s*r-i*l,this.z=i*o-a*r,this}projectOnVector(t){let n=t.lengthSq();if(n===0)return this.set(0,0,0);let i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return i0.copy(this).projectOnVector(t),this.sub(i0)}reflect(t){return this.sub(i0.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(te(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y,a=this.z-t.z;return n*n+i*i+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){let a=Math.sin(n)*t;return this.x=a*Math.sin(i),this.y=Math.cos(n)*t,this.z=a*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){let n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),a=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=a,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},i0=new L,VM=new Ba,Wt=class e{constructor(t,n,i,a,s,r,o,l,c){e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,a,s,r,o,l,c)}set(t,n,i,a,s,r,o,l,c){let h=this.elements;return h[0]=t,h[1]=a,h[2]=o,h[3]=n,h[4]=s,h[5]=l,h[6]=i,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,a=n.elements,s=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],p=i[5],g=i[8],x=a[0],m=a[3],f=a[6],v=a[1],_=a[4],y=a[7],T=a[2],C=a[5],w=a[8];return s[0]=r*x+o*v+l*T,s[3]=r*m+o*_+l*C,s[6]=r*f+o*y+l*w,s[1]=c*x+h*v+d*T,s[4]=c*m+h*_+d*C,s[7]=c*f+h*y+d*w,s[2]=u*x+p*v+g*T,s[5]=u*m+p*_+g*C,s[8]=u*f+p*y+g*w,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[1],a=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return n*r*h-n*o*c-i*s*h+i*o*l+a*s*c-a*r*l}invert(){let t=this.elements,n=t[0],i=t[1],a=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*r-o*c,u=o*l-h*s,p=c*s-r*l,g=n*d+i*u+a*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=d*x,t[1]=(a*c-h*i)*x,t[2]=(o*i-a*r)*x,t[3]=u*x,t[4]=(h*n-a*l)*x,t[5]=(a*s-o*n)*x,t[6]=p*x,t[7]=(i*l-c*n)*x,t[8]=(r*n-i*s)*x,this}transpose(){let t,n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,a,s,r,o){let l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*r+c*o)+r+t,-a*c,a*l,-a*(-c*r+l*o)+o+n,0,0,1),this}scale(t,n){return this.premultiply(a0.makeScale(t,n)),this}rotate(t){return this.premultiply(a0.makeRotation(-t)),this}translate(t,n){return this.premultiply(a0.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){let n=this.elements,i=t.elements;for(let a=0;a<9;a++)if(n[a]!==i[a])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},a0=new Wt;function K0(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Ec(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function Zb(){let e=Ec("canvas");return e.style.display="block",e}var GM={};function Go(e){e in GM||(GM[e]=!0,console.warn(e))}function Jb(e,t,n){return new Promise(function(i,a){function s(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:a();break;case e.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}var kM=new Wt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),XM=new Wt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hw(){let e={enabled:!0,workingColorSpace:sa,spaces:{},convert:function(a,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===Me&&(a.r=La(a.r),a.g=La(a.g),a.b=La(a.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(a.applyMatrix3(this.spaces[s].toXYZ),a.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===Me&&(a.r=Ho(a.r),a.g=Ho(a.g),a.b=Ho(a.b))),a},workingToColorSpace:function(a,s){return this.convert(a,this.workingColorSpace,s)},colorSpaceToWorking:function(a,s){return this.convert(a,s,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===Fa?Mc:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,s=this.workingColorSpace){return a.fromArray(this.spaces[s].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,s,r){return a.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,s){return Go("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(a,s)},toWorkingColorSpace:function(a,s){return Go("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(a,s)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[sa]:{primaries:t,whitePoint:i,transfer:Mc,toXYZ:kM,fromXYZ:XM,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:ei},outputColorSpaceConfig:{drawingBufferColorSpace:ei}},[ei]:{primaries:t,whitePoint:i,transfer:Me,toXYZ:kM,fromXYZ:XM,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:ei}}}),e}var oe=hw();function La(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function Ho(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}var Co,yf=class{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Co===void 0&&(Co=Ec("canvas")),Co.width=t.width,Co.height=t.height;let a=Co.getContext("2d");t instanceof ImageData?a.putImageData(t,0,0):a.drawImage(t,0,0,t.width,t.height),i=Co}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let n=Ec("canvas");n.width=t.width,n.height=t.height;let i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let a=i.getImageData(0,0,t.width,t.height),s=a.data;for(let r=0;r<s.length;r++)s[r]=La(s[r]/255)*255;return i.putImageData(a,0,0),n}else if(t.data){let n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(La(n[i]/255)*255):n[i]=La(n[i]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},fw=0,ko=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:fw++}),this.uuid=Qc(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):n instanceof VideoFrame?t.set(n.displayHeight,n.displayWidth,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let s;if(Array.isArray(a)){s=[];for(let r=0,o=a.length;r<o;r++)a[r].isDataTexture?s.push(s0(a[r].image)):s.push(s0(a[r]))}else s=s0(a);i.url=s}return n||(t.images[this.uuid]=i),i}};function s0(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?yf.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var dw=0,r0=new L,ni=class e extends Pa{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,i=Es,a=Es,s=Pi,r=Us,o=Mi,l=Si,c=e.DEFAULT_ANISOTROPY,h=Fa){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dw++}),this.uuid=Qc(),this.name="",this.source=new ko(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new It(0,0),this.repeat=new It(1,1),this.center=new It(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Wt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(r0).x}get height(){return this.source.getSize(r0).y}get depth(){return this.source.getSize(r0).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let n in t){let i=t[n];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${n}' has value of undefined.`);continue}let a=this[n];if(a===void 0){console.warn(`THREE.Texture.setValues(): property '${n}' does not exist.`);continue}a&&i&&a.isVector2&&i.isVector2||a&&i&&a.isVector3&&i.isVector3||a&&i&&a.isMatrix3&&i.isMatrix3?a.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==F0)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case mf:t.x=t.x-Math.floor(t.x);break;case Es:t.x=t.x<0?0:1;break;case gf:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case mf:t.y=t.y-Math.floor(t.y);break;case Es:t.y=t.y<0?0:1;break;case gf:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};ni.DEFAULT_IMAGE=null;ni.DEFAULT_MAPPING=F0;ni.DEFAULT_ANISOTROPY=1;var Ie=class e{constructor(t=0,n=0,i=0,a=1){e.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=a}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,a){return this.x=t,this.y=n,this.z=i,this.w=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let n=this.x,i=this.y,a=this.z,s=this.w,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*a+r[12]*s,this.y=r[1]*n+r[5]*i+r[9]*a+r[13]*s,this.z=r[2]*n+r[6]*i+r[10]*a+r[14]*s,this.w=r[3]*n+r[7]*i+r[11]*a+r[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,a,s,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],p=l[5],g=l[9],x=l[2],m=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;let _=(c+1)/2,y=(p+1)/2,T=(f+1)/2,C=(h+u)/4,w=(d+x)/4,D=(g+m)/4;return _>y&&_>T?_<.01?(i=0,a=.707106781,s=.707106781):(i=Math.sqrt(_),a=C/i,s=w/i):y>T?y<.01?(i=.707106781,a=0,s=.707106781):(a=Math.sqrt(y),i=C/a,s=D/a):T<.01?(i=.707106781,a=.707106781,s=0):(s=Math.sqrt(T),i=w/s,a=D/s),this.set(i,a,s,n),this}let v=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(d-x)/v,this.z=(u-h)/v,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=te(this.x,t.x,n.x),this.y=te(this.y,t.y,n.y),this.z=te(this.z,t.z,n.z),this.w=te(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=te(this.x,t,n),this.y=te(this.y,t,n),this.z=te(this.z,t,n),this.w=te(this.w,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(te(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},xf=class extends Pa{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new Ie(0,0,t,n),this.scissorTest=!1,this.viewport=new Ie(0,0,t,n);let a={width:t,height:n,depth:i.depth},s=new ni(a);this.textures=[];let r=i.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){let n={minFilter:Pi,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let a=0,s=this.textures.length;a<s;a++)this.textures[a].image.width=t,this.textures[a].image.height=n,this.textures[a].image.depth=i,this.textures[a].isArrayTexture=this.textures[a].image.depth>1;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;let a=Object.assign({},t.textures[n].image);this.textures[n].source=new ko(a)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},yi=class extends xf{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}},Tc=class extends ni{constructor(t=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:a},this.magFilter=_i,this.minFilter=_i,this.wrapR=Es,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Sf=class extends ni{constructor(t=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:a},this.magFilter=_i,this.minFilter=_i,this.wrapR=Es,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var As=class{constructor(t=new L(1/0,1/0,1/0),n=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(Ni.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(Ni.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){let i=Ni.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let s=i.getAttribute("position");if(n===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,Ni):Ni.fromBufferAttribute(s,r),Ni.applyMatrix4(t.matrixWorld),this.expandByPoint(Ni);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Wh.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Wh.copy(i.boundingBox)),Wh.applyMatrix4(t.matrixWorld),this.union(Wh)}let a=t.children;for(let s=0,r=a.length;s<r;s++)this.expandByObject(a[s],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ni),Ni.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(pc),qh.subVectors(this.max,pc),Ro.subVectors(t.a,pc),Do.subVectors(t.b,pc),Uo.subVectors(t.c,pc),vs.subVectors(Do,Ro),_s.subVectors(Uo,Do),lr.subVectors(Ro,Uo);let n=[0,-vs.z,vs.y,0,-_s.z,_s.y,0,-lr.z,lr.y,vs.z,0,-vs.x,_s.z,0,-_s.x,lr.z,0,-lr.x,-vs.y,vs.x,0,-_s.y,_s.x,0,-lr.y,lr.x,0];return!o0(n,Ro,Do,Uo,qh)||(n=[1,0,0,0,1,0,0,0,1],!o0(n,Ro,Do,Uo,qh))?!1:(Yh.crossVectors(vs,_s),n=[Yh.x,Yh.y,Yh.z],o0(n,Ro,Do,Uo,qh))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ni).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ni).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ca[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ca[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ca[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ca[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ca[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ca[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ca[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ca[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ca),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Ca=[new L,new L,new L,new L,new L,new L,new L,new L],Ni=new L,Wh=new As,Ro=new L,Do=new L,Uo=new L,vs=new L,_s=new L,lr=new L,pc=new L,qh=new L,Yh=new L,cr=new L;function o0(e,t,n,i,a){for(let s=0,r=e.length-3;s<=r;s+=3){cr.fromArray(e,s);let o=a.x*Math.abs(cr.x)+a.y*Math.abs(cr.y)+a.z*Math.abs(cr.z),l=t.dot(cr),c=n.dot(cr),h=i.dot(cr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var pw=new As,mc=new L,l0=new L,gr=class{constructor(t=new L,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){let i=this.center;n!==void 0?i.copy(n):pw.setFromPoints(t).getCenter(i);let a=0;for(let s=0,r=t.length;s<r;s++)a=Math.max(a,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(a),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){let i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;mc.subVectors(t,this.center);let n=mc.lengthSq();if(n>this.radius*this.radius){let i=Math.sqrt(n),a=(i-this.radius)*.5;this.center.addScaledVector(mc,a/i),this.radius+=a}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(l0.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(mc.copy(t.center).add(l0)),this.expandByPoint(mc.copy(t.center).sub(l0))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Ra=new L,c0=new L,Zh=new L,ys=new L,u0=new L,Jh=new L,h0=new L,Ac=class{constructor(t=new L,n=new L(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ra)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);let i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let n=Ra.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Ra.copy(this.origin).addScaledVector(this.direction,n),Ra.distanceToSquared(t))}distanceSqToSegment(t,n,i,a){c0.copy(t).add(n).multiplyScalar(.5),Zh.copy(n).sub(t).normalize(),ys.copy(this.origin).sub(c0);let s=t.distanceTo(n)*.5,r=-this.direction.dot(Zh),o=ys.dot(this.direction),l=-ys.dot(Zh),c=ys.lengthSq(),h=Math.abs(1-r*r),d,u,p,g;if(h>0)if(d=r*l-o,u=r*o-l,g=s*h,d>=0)if(u>=-g)if(u<=g){let x=1/h;d*=x,u*=x,p=d*(d+r*u+2*o)+u*(r*d+u+2*l)+c}else u=s,d=Math.max(0,-(r*u+o)),p=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(r*u+o)),p=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-r*s+o)),u=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-s,-l),s),p=u*(u+2*l)+c):(d=Math.max(0,-(r*s+o)),u=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+u*(u+2*l)+c);else u=r>0?-s:s,d=Math.max(0,-(r*u+o)),p=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),a&&a.copy(c0).addScaledVector(Zh,u),p}intersectSphere(t,n){Ra.subVectors(t.center,this.origin);let i=Ra.dot(this.direction),a=Ra.dot(Ra)-i*i,s=t.radius*t.radius;if(a>s)return null;let r=Math.sqrt(s-a),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){let i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){let n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,a,s,r,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,a=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,a=(t.min.x-u.x)*c),h>=0?(s=(t.min.y-u.y)*h,r=(t.max.y-u.y)*h):(s=(t.max.y-u.y)*h,r=(t.min.y-u.y)*h),i>r||s>a||((s>i||isNaN(i))&&(i=s),(r<a||isNaN(a))&&(a=r),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),i>l||o>a)||((o>i||i!==i)&&(i=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(i>=0?i:a,n)}intersectsBox(t){return this.intersectBox(t,Ra)!==null}intersectTriangle(t,n,i,a,s){u0.subVectors(n,t),Jh.subVectors(i,t),h0.crossVectors(u0,Jh);let r=this.direction.dot(h0),o;if(r>0){if(a)return null;o=1}else if(r<0)o=-1,r=-r;else return null;ys.subVectors(this.origin,t);let l=o*this.direction.dot(Jh.crossVectors(ys,Jh));if(l<0)return null;let c=o*this.direction.dot(u0.cross(ys));if(c<0||l+c>r)return null;let h=-o*ys.dot(h0);return h<0?null:this.at(h/r,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},He=class e{constructor(t,n,i,a,s,r,o,l,c,h,d,u,p,g,x,m){e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,a,s,r,o,l,c,h,d,u,p,g,x,m)}set(t,n,i,a,s,r,o,l,c,h,d,u,p,g,x,m){let f=this.elements;return f[0]=t,f[4]=n,f[8]=i,f[12]=a,f[1]=s,f[5]=r,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){let n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){let n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){let n=this.elements,i=t.elements,a=1/No.setFromMatrixColumn(t,0).length(),s=1/No.setFromMatrixColumn(t,1).length(),r=1/No.setFromMatrixColumn(t,2).length();return n[0]=i[0]*a,n[1]=i[1]*a,n[2]=i[2]*a,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){let n=this.elements,i=t.x,a=t.y,s=t.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(a),c=Math.sin(a),h=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){let u=r*h,p=r*d,g=o*h,x=o*d;n[0]=l*h,n[4]=-l*d,n[8]=c,n[1]=p+g*c,n[5]=u-x*c,n[9]=-o*l,n[2]=x-u*c,n[6]=g+p*c,n[10]=r*l}else if(t.order==="YXZ"){let u=l*h,p=l*d,g=c*h,x=c*d;n[0]=u+x*o,n[4]=g*o-p,n[8]=r*c,n[1]=r*d,n[5]=r*h,n[9]=-o,n[2]=p*o-g,n[6]=x+u*o,n[10]=r*l}else if(t.order==="ZXY"){let u=l*h,p=l*d,g=c*h,x=c*d;n[0]=u-x*o,n[4]=-r*d,n[8]=g+p*o,n[1]=p+g*o,n[5]=r*h,n[9]=x-u*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(t.order==="ZYX"){let u=r*h,p=r*d,g=o*h,x=o*d;n[0]=l*h,n[4]=g*c-p,n[8]=u*c+x,n[1]=l*d,n[5]=x*c+u,n[9]=p*c-g,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(t.order==="YZX"){let u=r*l,p=r*c,g=o*l,x=o*c;n[0]=l*h,n[4]=x-u*d,n[8]=g*d+p,n[1]=d,n[5]=r*h,n[9]=-o*h,n[2]=-c*h,n[6]=p*d+g,n[10]=u-x*d}else if(t.order==="XZY"){let u=r*l,p=r*c,g=o*l,x=o*c;n[0]=l*h,n[4]=-d,n[8]=c*h,n[1]=u*d+x,n[5]=r*h,n[9]=p*d-g,n[2]=g*d-p,n[6]=o*h,n[10]=x*d+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(mw,t,gw)}lookAt(t,n,i){let a=this.elements;return $n.subVectors(t,n),$n.lengthSq()===0&&($n.z=1),$n.normalize(),xs.crossVectors(i,$n),xs.lengthSq()===0&&(Math.abs(i.z)===1?$n.x+=1e-4:$n.z+=1e-4,$n.normalize(),xs.crossVectors(i,$n)),xs.normalize(),Kh.crossVectors($n,xs),a[0]=xs.x,a[4]=Kh.x,a[8]=$n.x,a[1]=xs.y,a[5]=Kh.y,a[9]=$n.y,a[2]=xs.z,a[6]=Kh.z,a[10]=$n.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,a=n.elements,s=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],p=i[13],g=i[2],x=i[6],m=i[10],f=i[14],v=i[3],_=i[7],y=i[11],T=i[15],C=a[0],w=a[4],D=a[8],E=a[12],S=a[1],U=a[5],B=a[9],H=a[13],k=a[2],J=a[6],W=a[10],at=a[14],V=a[3],ut=a[7],pt=a[11],Rt=a[15];return s[0]=r*C+o*S+l*k+c*V,s[4]=r*w+o*U+l*J+c*ut,s[8]=r*D+o*B+l*W+c*pt,s[12]=r*E+o*H+l*at+c*Rt,s[1]=h*C+d*S+u*k+p*V,s[5]=h*w+d*U+u*J+p*ut,s[9]=h*D+d*B+u*W+p*pt,s[13]=h*E+d*H+u*at+p*Rt,s[2]=g*C+x*S+m*k+f*V,s[6]=g*w+x*U+m*J+f*ut,s[10]=g*D+x*B+m*W+f*pt,s[14]=g*E+x*H+m*at+f*Rt,s[3]=v*C+_*S+y*k+T*V,s[7]=v*w+_*U+y*J+T*ut,s[11]=v*D+_*B+y*W+T*pt,s[15]=v*E+_*H+y*at+T*Rt,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[4],a=t[8],s=t[12],r=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],p=t[14],g=t[3],x=t[7],m=t[11],f=t[15];return g*(+s*l*d-a*c*d-s*o*u+i*c*u+a*o*p-i*l*p)+x*(+n*l*p-n*c*u+s*r*u-a*r*p+a*c*h-s*l*h)+m*(+n*c*d-n*o*p-s*r*d+i*r*p+s*o*h-i*c*h)+f*(-a*o*h-n*l*d+n*o*u+a*r*d-i*r*u+i*l*h)}transpose(){let t=this.elements,n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){let a=this.elements;return t.isVector3?(a[12]=t.x,a[13]=t.y,a[14]=t.z):(a[12]=t,a[13]=n,a[14]=i),this}invert(){let t=this.elements,n=t[0],i=t[1],a=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],p=t[11],g=t[12],x=t[13],m=t[14],f=t[15],v=d*m*c-x*u*c+x*l*p-o*m*p-d*l*f+o*u*f,_=g*u*c-h*m*c-g*l*p+r*m*p+h*l*f-r*u*f,y=h*x*c-g*d*c+g*o*p-r*x*p-h*o*f+r*d*f,T=g*d*l-h*x*l-g*o*u+r*x*u+h*o*m-r*d*m,C=n*v+i*_+a*y+s*T;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let w=1/C;return t[0]=v*w,t[1]=(x*u*s-d*m*s-x*a*p+i*m*p+d*a*f-i*u*f)*w,t[2]=(o*m*s-x*l*s+x*a*c-i*m*c-o*a*f+i*l*f)*w,t[3]=(d*l*s-o*u*s-d*a*c+i*u*c+o*a*p-i*l*p)*w,t[4]=_*w,t[5]=(h*m*s-g*u*s+g*a*p-n*m*p-h*a*f+n*u*f)*w,t[6]=(g*l*s-r*m*s-g*a*c+n*m*c+r*a*f-n*l*f)*w,t[7]=(r*u*s-h*l*s+h*a*c-n*u*c-r*a*p+n*l*p)*w,t[8]=y*w,t[9]=(g*d*s-h*x*s-g*i*p+n*x*p+h*i*f-n*d*f)*w,t[10]=(r*x*s-g*o*s+g*i*c-n*x*c-r*i*f+n*o*f)*w,t[11]=(h*o*s-r*d*s-h*i*c+n*d*c+r*i*p-n*o*p)*w,t[12]=T*w,t[13]=(h*x*a-g*d*a+g*i*u-n*x*u-h*i*m+n*d*m)*w,t[14]=(g*o*a-r*x*a-g*i*l+n*x*l+r*i*m-n*o*m)*w,t[15]=(r*d*a-h*o*a+h*i*l-n*d*l-r*i*u+n*o*u)*w,this}scale(t){let n=this.elements,i=t.x,a=t.y,s=t.z;return n[0]*=i,n[4]*=a,n[8]*=s,n[1]*=i,n[5]*=a,n[9]*=s,n[2]*=i,n[6]*=a,n[10]*=s,n[3]*=i,n[7]*=a,n[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],a=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,a))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){let n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){let i=Math.cos(n),a=Math.sin(n),s=1-i,r=t.x,o=t.y,l=t.z,c=s*r,h=s*o;return this.set(c*r+i,c*o-a*l,c*l+a*o,0,c*o+a*l,h*o+i,h*l-a*r,0,c*l-a*o,h*l+a*r,s*l*l+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,a,s,r){return this.set(1,i,s,0,t,1,r,0,n,a,1,0,0,0,0,1),this}compose(t,n,i){let a=this.elements,s=n._x,r=n._y,o=n._z,l=n._w,c=s+s,h=r+r,d=o+o,u=s*c,p=s*h,g=s*d,x=r*h,m=r*d,f=o*d,v=l*c,_=l*h,y=l*d,T=i.x,C=i.y,w=i.z;return a[0]=(1-(x+f))*T,a[1]=(p+y)*T,a[2]=(g-_)*T,a[3]=0,a[4]=(p-y)*C,a[5]=(1-(u+f))*C,a[6]=(m+v)*C,a[7]=0,a[8]=(g+_)*w,a[9]=(m-v)*w,a[10]=(1-(u+x))*w,a[11]=0,a[12]=t.x,a[13]=t.y,a[14]=t.z,a[15]=1,this}decompose(t,n,i){let a=this.elements,s=No.set(a[0],a[1],a[2]).length(),r=No.set(a[4],a[5],a[6]).length(),o=No.set(a[8],a[9],a[10]).length();this.determinant()<0&&(s=-s),t.x=a[12],t.y=a[13],t.z=a[14],Li.copy(this);let c=1/s,h=1/r,d=1/o;return Li.elements[0]*=c,Li.elements[1]*=c,Li.elements[2]*=c,Li.elements[4]*=h,Li.elements[5]*=h,Li.elements[6]*=h,Li.elements[8]*=d,Li.elements[9]*=d,Li.elements[10]*=d,n.setFromRotationMatrix(Li),i.x=s,i.y=r,i.z=o,this}makePerspective(t,n,i,a,s,r,o=Ii,l=!1){let c=this.elements,h=2*s/(n-t),d=2*s/(i-a),u=(n+t)/(n-t),p=(i+a)/(i-a),g,x;if(l)g=s/(r-s),x=r*s/(r-s);else if(o===Ii)g=-(r+s)/(r-s),x=-2*r*s/(r-s);else if(o===bc)g=-r/(r-s),x=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,a,s,r,o=Ii,l=!1){let c=this.elements,h=2/(n-t),d=2/(i-a),u=-(n+t)/(n-t),p=-(i+a)/(i-a),g,x;if(l)g=1/(r-s),x=r/(r-s);else if(o===Ii)g=-2/(r-s),x=-(r+s)/(r-s);else if(o===bc)g=-1/(r-s),x=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let n=this.elements,i=t.elements;for(let a=0;a<16;a++)if(n[a]!==i[a])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}},No=new L,Li=new He,mw=new L(0,0,0),gw=new L(1,1,1),xs=new L,Kh=new L,$n=new L,WM=new He,qM=new Ba,ra=class e{constructor(t=0,n=0,i=0,a=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=a}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,a=this._order){return this._x=t,this._y=n,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){let a=t.elements,s=a[0],r=a[4],o=a[8],l=a[1],c=a[5],h=a[9],d=a[2],u=a[6],p=a[10];switch(n){case"XYZ":this._y=Math.asin(te(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-te(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(te(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-te(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(te(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-te(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return WM.makeRotationFromQuaternion(t),this.setFromRotationMatrix(WM,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return qM.setFromEuler(this),this.setFromQuaternion(qM,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ra.DEFAULT_ORDER="XYZ";var wc=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},vw=0,YM=new L,Lo=new Ba,Da=new He,Qh=new L,gc=new L,_w=new L,yw=new Ba,ZM=new L(1,0,0),JM=new L(0,1,0),KM=new L(0,0,1),QM={type:"added"},xw={type:"removed"},Oo={type:"childadded",child:null},f0={type:"childremoved",child:null},ii=class e extends Pa{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vw++}),this.uuid=Qc(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new L,n=new ra,i=new Ba,a=new L(1,1,1);function s(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new He},normalMatrix:{value:new Wt}}),this.matrix=new He,this.matrixWorld=new He,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new wc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Lo.setFromAxisAngle(t,n),this.quaternion.multiply(Lo),this}rotateOnWorldAxis(t,n){return Lo.setFromAxisAngle(t,n),this.quaternion.premultiply(Lo),this}rotateX(t){return this.rotateOnAxis(ZM,t)}rotateY(t){return this.rotateOnAxis(JM,t)}rotateZ(t){return this.rotateOnAxis(KM,t)}translateOnAxis(t,n){return YM.copy(t).applyQuaternion(this.quaternion),this.position.add(YM.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(ZM,t)}translateY(t){return this.translateOnAxis(JM,t)}translateZ(t){return this.translateOnAxis(KM,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Da.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?Qh.copy(t):Qh.set(t,n,i);let a=this.parent;this.updateWorldMatrix(!0,!1),gc.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Da.lookAt(gc,Qh,this.up):Da.lookAt(Qh,gc,this.up),this.quaternion.setFromRotationMatrix(Da),a&&(Da.extractRotation(a.matrixWorld),Lo.setFromRotationMatrix(Da),this.quaternion.premultiply(Lo.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(QM),Oo.child=t,this.dispatchEvent(Oo),Oo.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(xw),f0.child=t,this.dispatchEvent(f0),f0.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Da.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Da.multiply(t.parent.matrixWorld)),t.applyMatrix4(Da),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(QM),Oo.child=t,this.dispatchEvent(Oo),Oo.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,a=this.children.length;i<a;i++){let r=this.children[i].getObjectByProperty(t,n);if(r!==void 0)return r}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);let a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gc,t,_w),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gc,yw,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);let n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverseVisible(t)}traverseAncestors(t){let n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){let a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].updateWorldMatrix(!1,!0)}}toJSON(t){let n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(t),a.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=s(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];s(t.shapes,d)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));a.material=o}else a.material=s(t.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];a.animations.push(s(t.animations,l))}}if(n){let o=r(t.geometries),l=r(t.materials),c=r(t.textures),h=r(t.images),d=r(t.shapes),u=r(t.skeletons),p=r(t.animations),g=r(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=a,i;function r(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){let a=t.children[i];this.add(a.clone())}return this}};ii.DEFAULT_UP=new L(0,1,0);ii.DEFAULT_MATRIX_AUTO_UPDATE=!0;ii.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Oi=new L,Ua=new L,d0=new L,Na=new L,Io=new L,Po=new L,jM=new L,p0=new L,m0=new L,g0=new L,v0=new Ie,_0=new Ie,y0=new Ie,bs=class e{constructor(t=new L,n=new L,i=new L){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,a){a.subVectors(i,n),Oi.subVectors(t,n),a.cross(Oi);let s=a.lengthSq();return s>0?a.multiplyScalar(1/Math.sqrt(s)):a.set(0,0,0)}static getBarycoord(t,n,i,a,s){Oi.subVectors(a,n),Ua.subVectors(i,n),d0.subVectors(t,n);let r=Oi.dot(Oi),o=Oi.dot(Ua),l=Oi.dot(d0),c=Ua.dot(Ua),h=Ua.dot(d0),d=r*c-o*o;if(d===0)return s.set(0,0,0),null;let u=1/d,p=(c*l-o*h)*u,g=(r*h-o*l)*u;return s.set(1-p-g,g,p)}static containsPoint(t,n,i,a){return this.getBarycoord(t,n,i,a,Na)===null?!1:Na.x>=0&&Na.y>=0&&Na.x+Na.y<=1}static getInterpolation(t,n,i,a,s,r,o,l){return this.getBarycoord(t,n,i,a,Na)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Na.x),l.addScaledVector(r,Na.y),l.addScaledVector(o,Na.z),l)}static getInterpolatedAttribute(t,n,i,a,s,r){return v0.setScalar(0),_0.setScalar(0),y0.setScalar(0),v0.fromBufferAttribute(t,n),_0.fromBufferAttribute(t,i),y0.fromBufferAttribute(t,a),r.setScalar(0),r.addScaledVector(v0,s.x),r.addScaledVector(_0,s.y),r.addScaledVector(y0,s.z),r}static isFrontFacing(t,n,i,a){return Oi.subVectors(i,n),Ua.subVectors(t,n),Oi.cross(Ua).dot(a)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,a){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[a]),this}setFromAttributeAndIndices(t,n,i,a){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,a),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Oi.subVectors(this.c,this.b),Ua.subVectors(this.a,this.b),Oi.cross(Ua).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,a,s){return e.getInterpolation(t,this.a,this.b,this.c,n,i,a,s)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){let i=this.a,a=this.b,s=this.c,r,o;Io.subVectors(a,i),Po.subVectors(s,i),p0.subVectors(t,i);let l=Io.dot(p0),c=Po.dot(p0);if(l<=0&&c<=0)return n.copy(i);m0.subVectors(t,a);let h=Io.dot(m0),d=Po.dot(m0);if(h>=0&&d<=h)return n.copy(a);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return r=l/(l-h),n.copy(i).addScaledVector(Io,r);g0.subVectors(t,s);let p=Io.dot(g0),g=Po.dot(g0);if(g>=0&&p<=g)return n.copy(s);let x=p*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),n.copy(i).addScaledVector(Po,o);let m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return jM.subVectors(s,a),o=(d-h)/(d-h+(p-g)),n.copy(a).addScaledVector(jM,o);let f=1/(m+x+u);return r=x*f,o=u*f,n.copy(i).addScaledVector(Io,r).addScaledVector(Po,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Kb={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ss={h:0,s:0,l:0},jh={h:0,s:0,l:0};function x0(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var ae=class{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){let a=t;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=ei){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.colorSpaceToWorking(this,n),this}setRGB(t,n,i,a=oe.workingColorSpace){return this.r=t,this.g=n,this.b=i,oe.colorSpaceToWorking(this,a),this}setHSL(t,n,i,a=oe.workingColorSpace){if(t=uw(t,1),n=te(n,0,1),i=te(i,0,1),n===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+n):i+n-i*n,r=2*i-s;this.r=x0(r,s,t+1/3),this.g=x0(r,s,t),this.b=x0(r,s,t-1/3)}return oe.colorSpaceToWorking(this,a),this}setStyle(t,n=ei){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,r=a[1],o=a[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=a[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=ei){let i=Kb[t.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=La(t.r),this.g=La(t.g),this.b=La(t.b),this}copyLinearToSRGB(t){return this.r=Ho(t.r),this.g=Ho(t.g),this.b=Ho(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ei){return oe.workingToColorSpace(Sn.copy(this),t),Math.round(te(Sn.r*255,0,255))*65536+Math.round(te(Sn.g*255,0,255))*256+Math.round(te(Sn.b*255,0,255))}getHexString(t=ei){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=oe.workingColorSpace){oe.workingToColorSpace(Sn.copy(this),n);let i=Sn.r,a=Sn.g,s=Sn.b,r=Math.max(i,a,s),o=Math.min(i,a,s),l,c,h=(o+r)/2;if(o===r)l=0,c=0;else{let d=r-o;switch(c=h<=.5?d/(r+o):d/(2-r-o),r){case i:l=(a-s)/d+(a<s?6:0);break;case a:l=(s-i)/d+2;break;case s:l=(i-a)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,n=oe.workingColorSpace){return oe.workingToColorSpace(Sn.copy(this),n),t.r=Sn.r,t.g=Sn.g,t.b=Sn.b,t}getStyle(t=ei){oe.workingToColorSpace(Sn.copy(this),t);let n=Sn.r,i=Sn.g,a=Sn.b;return t!==ei?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(t,n,i){return this.getHSL(Ss),this.setHSL(Ss.h+t,Ss.s+n,Ss.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(Ss),t.getHSL(jh);let i=n0(Ss.h,jh.h,n),a=n0(Ss.s,jh.s,n),s=n0(Ss.l,jh.l,n);return this.setHSL(i,a,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let n=this.r,i=this.g,a=this.b,s=t.elements;return this.r=s[0]*n+s[3]*i+s[6]*a,this.g=s[1]*n+s[4]*i+s[7]*a,this.b=s[2]*n+s[5]*i+s[8]*a,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Sn=new ae;ae.NAMES=Kb;var Sw=0,ws=class extends Pa{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Sw++}),this.uuid=Qc(),this.name="",this.type="Material",this.blending=Ia,this.side=Oa,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=pf,this.blendDst=pr,this.blendEquation=Ts,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ae(0,0,0),this.blendAlpha=0,this.depthFunc=mr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=U0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fr,this.stencilZFail=fr,this.stencilZPass=fr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let n in t){let i=t[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}let a=this[n];if(a===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ia&&(i.blending=this.blending),this.side!==Oa&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==pf&&(i.blendSrc=this.blendSrc),this.blendDst!==pr&&(i.blendDst=this.blendDst),this.blendEquation!==Ts&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==mr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==U0&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==fr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==fr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(s){let r=[];for(let o in s){let l=s[o];delete l.metadata,r.push(l)}return r}if(n){let s=a(t.textures),r=a(t.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let n=t.clippingPlanes,i=null;if(n!==null){let a=n.length;i=new Array(a);for(let s=0;s!==a;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Cc=class extends ws{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ra,this.combine=z0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var We=new L,$h=new It,Mw=0,rn=class{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Mw++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=N0,this.updateRanges=[],this.gpuType=ca,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let a=0,s=this.itemSize;a<s;a++)this.array[t+a]=n.array[i+a];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)$h.fromBufferAttribute(this,n),$h.applyMatrix3(t),this.setXY(n,$h.x,$h.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)We.fromBufferAttribute(this,n),We.applyMatrix3(t),this.setXYZ(n,We.x,We.y,We.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)We.fromBufferAttribute(this,n),We.applyMatrix4(t),this.setXYZ(n,We.x,We.y,We.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)We.fromBufferAttribute(this,n),We.applyNormalMatrix(t),this.setXYZ(n,We.x,We.y,We.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)We.fromBufferAttribute(this,n),We.transformDirection(t),this.setXYZ(n,We.x,We.y,We.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=dc(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=zn(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=dc(n,this.array)),n}setX(t,n){return this.normalized&&(n=zn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=dc(n,this.array)),n}setY(t,n){return this.normalized&&(n=zn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=dc(n,this.array)),n}setZ(t,n){return this.normalized&&(n=zn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=dc(n,this.array)),n}setW(t,n){return this.normalized&&(n=zn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=zn(n,this.array),i=zn(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,a){return t*=this.itemSize,this.normalized&&(n=zn(n,this.array),i=zn(i,this.array),a=zn(a,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=a,this}setXYZW(t,n,i,a,s){return t*=this.itemSize,this.normalized&&(n=zn(n,this.array),i=zn(i,this.array),a=zn(a,this.array),s=zn(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=a,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==N0&&(t.usage=this.usage),t}};var Rc=class extends rn{constructor(t,n,i){super(new Uint16Array(t),n,i)}};var Dc=class extends rn{constructor(t,n,i){super(new Uint32Array(t),n,i)}};var on=class extends rn{constructor(t,n,i){super(new Float32Array(t),n,i)}},bw=0,vi=new He,S0=new ii,Bo=new L,ti=new As,vc=new As,sn=new L,Fn=class e extends Pa{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bw++}),this.uuid=Qc(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(K0(t)?Dc:Rc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){let n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new Wt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}let a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(t),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return vi.makeRotationFromQuaternion(t),this.applyMatrix4(vi),this}rotateX(t){return vi.makeRotationX(t),this.applyMatrix4(vi),this}rotateY(t){return vi.makeRotationY(t),this.applyMatrix4(vi),this}rotateZ(t){return vi.makeRotationZ(t),this.applyMatrix4(vi),this}translate(t,n,i){return vi.makeTranslation(t,n,i),this.applyMatrix4(vi),this}scale(t,n,i){return vi.makeScale(t,n,i),this.applyMatrix4(vi),this}lookAt(t){return S0.lookAt(t),S0.updateMatrix(),this.applyMatrix4(S0.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bo).negate(),this.translate(Bo.x,Bo.y,Bo.z),this}setFromPoints(t){let n=this.getAttribute("position");if(n===void 0){let i=[];for(let a=0,s=t.length;a<s;a++){let r=t[a];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new on(i,3))}else{let i=Math.min(t.length,n.count);for(let a=0;a<i;a++){let s=t[a];n.setXYZ(a,s.x,s.y,s.z||0)}t.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new As);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,a=n.length;i<a;i++){let s=n[i];ti.setFromBufferAttribute(s),this.morphTargetsRelative?(sn.addVectors(this.boundingBox.min,ti.min),this.boundingBox.expandByPoint(sn),sn.addVectors(this.boundingBox.max,ti.max),this.boundingBox.expandByPoint(sn)):(this.boundingBox.expandByPoint(ti.min),this.boundingBox.expandByPoint(ti.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gr);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){let i=this.boundingSphere.center;if(ti.setFromBufferAttribute(t),n)for(let s=0,r=n.length;s<r;s++){let o=n[s];vc.setFromBufferAttribute(o),this.morphTargetsRelative?(sn.addVectors(ti.min,vc.min),ti.expandByPoint(sn),sn.addVectors(ti.max,vc.max),ti.expandByPoint(sn)):(ti.expandByPoint(vc.min),ti.expandByPoint(vc.max))}ti.getCenter(i);let a=0;for(let s=0,r=t.count;s<r;s++)sn.fromBufferAttribute(t,s),a=Math.max(a,i.distanceToSquared(sn));if(n)for(let s=0,r=n.length;s<r;s++){let o=n[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)sn.fromBufferAttribute(o,c),l&&(Bo.fromBufferAttribute(t,c),sn.add(Bo)),a=Math.max(a,i.distanceToSquared(sn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=n.position,a=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new rn(new Float32Array(4*i.count),4));let r=this.getAttribute("tangent"),o=[],l=[];for(let D=0;D<i.count;D++)o[D]=new L,l[D]=new L;let c=new L,h=new L,d=new L,u=new It,p=new It,g=new It,x=new L,m=new L;function f(D,E,S){c.fromBufferAttribute(i,D),h.fromBufferAttribute(i,E),d.fromBufferAttribute(i,S),u.fromBufferAttribute(s,D),p.fromBufferAttribute(s,E),g.fromBufferAttribute(s,S),h.sub(c),d.sub(c),p.sub(u),g.sub(u);let U=1/(p.x*g.y-g.x*p.y);isFinite(U)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(U),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(U),o[D].add(x),o[E].add(x),o[S].add(x),l[D].add(m),l[E].add(m),l[S].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let D=0,E=v.length;D<E;++D){let S=v[D],U=S.start,B=S.count;for(let H=U,k=U+B;H<k;H+=3)f(t.getX(H+0),t.getX(H+1),t.getX(H+2))}let _=new L,y=new L,T=new L,C=new L;function w(D){T.fromBufferAttribute(a,D),C.copy(T);let E=o[D];_.copy(E),_.sub(T.multiplyScalar(T.dot(E))).normalize(),y.crossVectors(C,E);let U=y.dot(l[D])<0?-1:1;r.setXYZW(D,_.x,_.y,_.z,U)}for(let D=0,E=v.length;D<E;++D){let S=v[D],U=S.start,B=S.count;for(let H=U,k=U+B;H<k;H+=3)w(t.getX(H+0)),w(t.getX(H+1)),w(t.getX(H+2))}}computeVertexNormals(){let t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new rn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);let a=new L,s=new L,r=new L,o=new L,l=new L,c=new L,h=new L,d=new L;if(t)for(let u=0,p=t.count;u<p;u+=3){let g=t.getX(u+0),x=t.getX(u+1),m=t.getX(u+2);a.fromBufferAttribute(n,g),s.fromBufferAttribute(n,x),r.fromBufferAttribute(n,m),h.subVectors(r,s),d.subVectors(a,s),h.cross(d),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=n.count;u<p;u+=3)a.fromBufferAttribute(n,u+0),s.fromBufferAttribute(n,u+1),r.fromBufferAttribute(n,u+2),h.subVectors(r,s),d.subVectors(a,s),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)sn.fromBufferAttribute(t,n),sn.normalize(),t.setXYZ(n,sn.x,sn.y,sn.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),p=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*h;for(let f=0;f<h;f++)u[g++]=c[p++]}return new rn(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let n=new e,i=this.index.array,a=this.attributes;for(let o in a){let l=a[o],c=t(l,i);n.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],p=t(u,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let o=0,l=r.length;o<l;o++){let c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let a={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let p=c[d];h.push(p.toJSON(t.data))}h.length>0&&(a[l]=h,s=!0)}s&&(t.data.morphAttributes=a,t.data.morphTargetsRelative=this.morphTargetsRelative);let r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let n={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let a=t.attributes;for(let c in a){let h=a[c];this.setAttribute(c,h.clone(n))}let s=t.morphAttributes;for(let c in s){let h=[],d=s[c];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(n));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let r=t.groups;for(let c=0,h=r.length;c<h;c++){let d=r[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},$M=new He,ur=new Ac,tf=new gr,tb=new L,ef=new L,nf=new L,af=new L,M0=new L,sf=new L,eb=new L,rf=new L,gn=class extends ii{constructor(t=new Fn,n=new Cc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){let o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,n){let i=this.geometry,a=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(a,t);let o=this.morphTargetInfluences;if(s&&o){sf.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],d=s[l];h!==0&&(M0.fromBufferAttribute(d,t),r?sf.addScaledVector(M0,h):sf.addScaledVector(M0.sub(n),h))}n.add(sf)}return n}raycast(t,n){let i=this.geometry,a=this.material,s=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),tf.copy(i.boundingSphere),tf.applyMatrix4(s),ur.copy(t.ray).recast(t.near),!(tf.containsPoint(ur.origin)===!1&&(ur.intersectSphere(tf,tb)===null||ur.origin.distanceToSquared(tb)>(t.far-t.near)**2))&&($M.copy(s).invert(),ur.copy(t.ray).applyMatrix4($M),!(i.boundingBox!==null&&ur.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,ur)))}_computeIntersections(t,n,i){let a,s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,x=u.length;g<x;g++){let m=u[g],f=r[m.materialIndex],v=Math.max(m.start,p.start),_=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,T=_;y<T;y+=3){let C=o.getX(y),w=o.getX(y+1),D=o.getX(y+2);a=of(this,f,t,i,c,h,d,C,w,D),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=m.materialIndex,n.push(a))}}else{let g=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){let v=o.getX(m),_=o.getX(m+1),y=o.getX(m+2);a=of(this,r,t,i,c,h,d,v,_,y),a&&(a.faceIndex=Math.floor(m/3),n.push(a))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,x=u.length;g<x;g++){let m=u[g],f=r[m.materialIndex],v=Math.max(m.start,p.start),_=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,T=_;y<T;y+=3){let C=y,w=y+1,D=y+2;a=of(this,f,t,i,c,h,d,C,w,D),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=m.materialIndex,n.push(a))}}else{let g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){let v=m,_=m+1,y=m+2;a=of(this,r,t,i,c,h,d,v,_,y),a&&(a.faceIndex=Math.floor(m/3),n.push(a))}}}};function Ew(e,t,n,i,a,s,r,o){let l;if(t.side===Rn?l=i.intersectTriangle(r,s,a,!0,o):l=i.intersectTriangle(a,s,r,t.side===Oa,o),l===null)return null;rf.copy(o),rf.applyMatrix4(e.matrixWorld);let c=n.ray.origin.distanceTo(rf);return c<n.near||c>n.far?null:{distance:c,point:rf.clone(),object:e}}function of(e,t,n,i,a,s,r,o,l,c){e.getVertexPosition(o,ef),e.getVertexPosition(l,nf),e.getVertexPosition(c,af);let h=Ew(e,t,n,i,ef,nf,af,eb);if(h){let d=new L;bs.getBarycoord(eb,ef,nf,af,d),a&&(h.uv=bs.getInterpolatedAttribute(a,o,l,c,d,new It)),s&&(h.uv1=bs.getInterpolatedAttribute(s,o,l,c,d,new It)),r&&(h.normal=bs.getInterpolatedAttribute(r,o,l,c,d,new L),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new L,materialIndex:0};bs.getNormal(ef,nf,af,u.normal),h.face=u,h.barycoord=d}return h}var Xo=class e extends Fn{constructor(t=1,n=1,i=1,a=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:a,heightSegments:s,depthSegments:r};let o=this;a=Math.floor(a),s=Math.floor(s),r=Math.floor(r);let l=[],c=[],h=[],d=[],u=0,p=0;g("z","y","x",-1,-1,i,n,t,r,s,0),g("z","y","x",1,-1,i,n,-t,r,s,1),g("x","z","y",1,1,t,i,n,a,r,2),g("x","z","y",1,-1,t,i,-n,a,r,3),g("x","y","z",1,-1,t,n,i,a,s,4),g("x","y","z",-1,-1,t,n,-i,a,s,5),this.setIndex(l),this.setAttribute("position",new on(c,3)),this.setAttribute("normal",new on(h,3)),this.setAttribute("uv",new on(d,2));function g(x,m,f,v,_,y,T,C,w,D,E){let S=y/w,U=T/D,B=y/2,H=T/2,k=C/2,J=w+1,W=D+1,at=0,V=0,ut=new L;for(let pt=0;pt<W;pt++){let Rt=pt*U-H;for(let Yt=0;Yt<J;Yt++){let pe=Yt*S-B;ut[x]=pe*v,ut[m]=Rt*_,ut[f]=k,c.push(ut.x,ut.y,ut.z),ut[x]=0,ut[m]=0,ut[f]=C>0?1:-1,h.push(ut.x,ut.y,ut.z),d.push(Yt/w),d.push(1-pt/D),at+=1}}for(let pt=0;pt<D;pt++)for(let Rt=0;Rt<w;Rt++){let Yt=u+Rt+J*pt,pe=u+Rt+J*(pt+1),le=u+(Rt+1)+J*(pt+1),se=u+(Rt+1)+J*pt;l.push(Yt,pe,se),l.push(pe,le,se),V+=6}o.addGroup(p,V,E),p+=V,u+=at}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function xr(e){let t={};for(let n in e){t[n]={};for(let i in e[n]){let a=e[n][i];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=a.clone():Array.isArray(a)?t[n][i]=a.slice():t[n][i]=a}}return t}function bn(e){let t={};for(let n=0;n<e.length;n++){let i=xr(e[n]);for(let a in i)t[a]=i[a]}return t}function Tw(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Q0(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:oe.workingColorSpace}var Qb={clone:xr,merge:bn},Aw=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ww=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Hn=class extends ws{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Aw,this.fragmentShader=ww,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=xr(t.uniforms),this.uniformsGroups=Tw(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(let a in this.uniforms){let r=this.uniforms[a].value;r&&r.isTexture?n.uniforms[a]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?n.uniforms[a]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[a]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[a]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[a]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[a]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[a]={type:"m4",value:r.toArray()}:n.uniforms[a]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;let i={};for(let a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}},Uc=class extends ii{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new He,this.projectionMatrix=new He,this.projectionMatrixInverse=new He,this.coordinateSystem=Ii,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ms=new L,nb=new It,ib=new It,Mn=class extends Uc{constructor(t=50,n=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let n=.5*this.getFilmHeight()/t;this.fov=_f*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(e0*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return _f*2*Math.atan(Math.tan(e0*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){Ms.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ms.x,Ms.y).multiplyScalar(-t/Ms.z),Ms.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ms.x,Ms.y).multiplyScalar(-t/Ms.z)}getViewSize(t,n){return this.getViewBounds(t,nb,ib),n.subVectors(ib,nb)}setViewOffset(t,n,i,a,s,r){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,n=t*Math.tan(e0*.5*this.fov)/this.zoom,i=2*n,a=this.aspect*i,s=-.5*a,r=this.view;if(this.view!==null&&this.view.enabled){let l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*a/l,n-=r.offsetY*i/c,a*=r.width/l,i*=r.height/c}let o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+a,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}},zo=-90,Fo=1,Mf=class extends ii{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let a=new Mn(zo,Fo,t,n);a.layers=this.layers,this.add(a);let s=new Mn(zo,Fo,t,n);s.layers=this.layers,this.add(s);let r=new Mn(zo,Fo,t,n);r.layers=this.layers,this.add(r);let o=new Mn(zo,Fo,t,n);o.layers=this.layers,this.add(o);let l=new Mn(zo,Fo,t,n);l.layers=this.layers,this.add(l);let c=new Mn(zo,Fo,t,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,n=this.children.concat(),[i,a,s,r,o,l]=n;for(let c of n)this.remove(c);if(t===Ii)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===bc)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of n)this.add(c),c.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[s,r,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,a),t.render(n,s),t.setRenderTarget(i,1,a),t.render(n,r),t.setRenderTarget(i,2,a),t.render(n,o),t.setRenderTarget(i,3,a),t.render(n,l),t.setRenderTarget(i,4,a),t.render(n,c),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,a),t.render(n,h),t.setRenderTarget(d,u,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},Nc=class extends ni{constructor(t=[],n=_r,i,a,s,r,o,l,c,h){super(t,n,i,a,s,r,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},bf=class extends yi{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},a=[i,i,i,i,i,i];this.texture=new Nc(a),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new Xo(5,5,5),s=new Hn({name:"CubemapFromEquirect",uniforms:xr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Rn,blending:zi});s.uniforms.tEquirect.value=n;let r=new gn(a,s),o=n.minFilter;return n.minFilter===Us&&(n.minFilter=Pi),new Mf(1,10,this).update(t,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,n=!0,i=!0,a=!0){let s=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(n,i,a);t.setRenderTarget(s)}},dr=class extends ii{constructor(){super(),this.isGroup=!0,this.type="Group"}},Cw={type:"move"},Wo=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new dr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new dr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new dr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let n=this._hand;if(n)for(let i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let a=null,s=null,r=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(let x of t.hand.values()){let m=n.getJointPose(x,i),f=this._getHandJoint(c,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=n.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(a=n.getPose(t.targetRaySpace,i),a===null&&s!==null&&(a=s),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Cw)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){let i=new dr;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}};var qo=class extends ii{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ra,this.environmentIntensity=1,this.environmentRotation=new ra,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}};var Bi=class extends rn{constructor(t,n,i,a=1){super(t,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=a}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}};var b0=new L,Rw=new L,Dw=new Wt,aa=class{constructor(t=new L(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,a){return this.normal.set(t,n,i),this.constant=a,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){let a=b0.subVectors(i,n).cross(Rw.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){let i=t.delta(b0),a=this.normal.dot(i);if(a===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;let s=-(t.start.dot(this.normal)+this.constant)/a;return s<0||s>1?null:n.copy(t.start).addScaledVector(i,s)}intersectsLine(t){let n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){let i=n||Dw.getNormalMatrix(t),a=this.coplanarPoint(b0).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},hr=new gr,Uw=new It(.5,.5),lf=new L,Lc=class{constructor(t=new aa,n=new aa,i=new aa,a=new aa,s=new aa,r=new aa){this.planes=[t,n,i,a,s,r]}set(t,n,i,a,s,r){let o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(a),o[4].copy(s),o[5].copy(r),this}copy(t){let n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=Ii,i=!1){let a=this.planes,s=t.elements,r=s[0],o=s[1],l=s[2],c=s[3],h=s[4],d=s[5],u=s[6],p=s[7],g=s[8],x=s[9],m=s[10],f=s[11],v=s[12],_=s[13],y=s[14],T=s[15];if(a[0].setComponents(c-r,p-h,f-g,T-v).normalize(),a[1].setComponents(c+r,p+h,f+g,T+v).normalize(),a[2].setComponents(c+o,p+d,f+x,T+_).normalize(),a[3].setComponents(c-o,p-d,f-x,T-_).normalize(),i)a[4].setComponents(l,u,m,y).normalize(),a[5].setComponents(c-l,p-u,f-m,T-y).normalize();else if(a[4].setComponents(c-l,p-u,f-m,T-y).normalize(),n===Ii)a[5].setComponents(c+l,p+u,f+m,T+y).normalize();else if(n===bc)a[5].setComponents(l,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),hr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),hr.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(hr)}intersectsSprite(t){hr.center.set(0,0,0);let n=Uw.distanceTo(t.center);return hr.radius=.7071067811865476+n,hr.applyMatrix4(t.matrixWorld),this.intersectsSphere(hr)}intersectsSphere(t){let n=this.planes,i=t.center,a=-t.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<a)return!1;return!0}intersectsBox(t){let n=this.planes;for(let i=0;i<6;i++){let a=n[i];if(lf.x=a.normal.x>0?t.max.x:t.min.x,lf.y=a.normal.y>0?t.max.y:t.min.y,lf.z=a.normal.z>0?t.max.z:t.min.z,a.distanceToPoint(lf)<0)return!1}return!0}containsPoint(t){let n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ef=class extends ws{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ae(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Tf=new L,Af=new L,ab=new He,_c=new Ac,cf=new gr,E0=new L,sb=new L,wf=class extends ii{constructor(t=new Fn,n=new Ef){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let n=t.attributes.position,i=[0];for(let a=1,s=n.count;a<s;a++)Tf.fromBufferAttribute(n,a-1),Af.fromBufferAttribute(n,a),i[a]=i[a-1],i[a]+=Tf.distanceTo(Af);t.setAttribute("lineDistance",new on(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){let i=this.geometry,a=this.matrixWorld,s=t.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),cf.copy(i.boundingSphere),cf.applyMatrix4(a),cf.radius+=s,t.ray.intersectsSphere(cf)===!1)return;ab.copy(a).invert(),_c.copy(t.ray).applyMatrix4(ab);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){let p=Math.max(0,r.start),g=Math.min(h.count,r.start+r.count);for(let x=p,m=g-1;x<m;x+=c){let f=h.getX(x),v=h.getX(x+1),_=uf(this,t,_c,l,f,v,x);_&&n.push(_)}if(this.isLineLoop){let x=h.getX(g-1),m=h.getX(p),f=uf(this,t,_c,l,x,m,g-1);f&&n.push(f)}}else{let p=Math.max(0,r.start),g=Math.min(u.count,r.start+r.count);for(let x=p,m=g-1;x<m;x+=c){let f=uf(this,t,_c,l,x,x+1,x);f&&n.push(f)}if(this.isLineLoop){let x=uf(this,t,_c,l,g-1,p,g-1);x&&n.push(x)}}}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){let o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function uf(e,t,n,i,a,s,r){let o=e.geometry.attributes.position;if(Tf.fromBufferAttribute(o,a),Af.fromBufferAttribute(o,s),n.distanceSqToSegment(Tf,Af,E0,sb)>i)return;E0.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(E0);if(!(c<t.near||c>t.far))return{distance:c,point:sb.clone().applyMatrix4(e.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:e}}var rb=new L,ob=new L,Oc=class extends wf{constructor(t,n){super(t,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let n=t.attributes.position,i=[];for(let a=0,s=n.count;a<s;a+=2)rb.fromBufferAttribute(n,a),ob.fromBufferAttribute(n,a+1),i[a]=a===0?0:i[a-1],i[a+1]=i[a]+rb.distanceTo(ob);t.setAttribute("lineDistance",new on(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Ic=class extends ni{constructor(t,n,i=Ns,a,s,r,o=_i,l=_i,c,h=Vo,d=1){if(h!==Vo&&h!==Qo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:n,depth:d};super(u,a,s,r,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ko(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}},Pc=class extends ni{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}};var Bc=class e extends Fn{constructor(t=1,n=1,i=1,a=32,s=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:i,radialSegments:a,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:l};let c=this;a=Math.floor(a),s=Math.floor(s);let h=[],d=[],u=[],p=[],g=0,x=[],m=i/2,f=0;v(),r===!1&&(t>0&&_(!0),n>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new on(d,3)),this.setAttribute("normal",new on(u,3)),this.setAttribute("uv",new on(p,2));function v(){let y=new L,T=new L,C=0,w=(n-t)/i;for(let D=0;D<=s;D++){let E=[],S=D/s,U=S*(n-t)+t;for(let B=0;B<=a;B++){let H=B/a,k=H*l+o,J=Math.sin(k),W=Math.cos(k);T.x=U*J,T.y=-S*i+m,T.z=U*W,d.push(T.x,T.y,T.z),y.set(J,w,W).normalize(),u.push(y.x,y.y,y.z),p.push(H,1-S),E.push(g++)}x.push(E)}for(let D=0;D<a;D++)for(let E=0;E<s;E++){let S=x[E][D],U=x[E+1][D],B=x[E+1][D+1],H=x[E][D+1];(t>0||E!==0)&&(h.push(S,U,H),C+=3),(n>0||E!==s-1)&&(h.push(U,B,H),C+=3)}c.addGroup(f,C,0),f+=C}function _(y){let T=g,C=new It,w=new L,D=0,E=y===!0?t:n,S=y===!0?1:-1;for(let B=1;B<=a;B++)d.push(0,m*S,0),u.push(0,S,0),p.push(.5,.5),g++;let U=g;for(let B=0;B<=a;B++){let k=B/a*l+o,J=Math.cos(k),W=Math.sin(k);w.x=E*W,w.y=m*S,w.z=E*J,d.push(w.x,w.y,w.z),u.push(0,S,0),C.x=J*.5+.5,C.y=W*.5*S+.5,p.push(C.x,C.y),g++}for(let B=0;B<a;B++){let H=T+B,k=U+B;y===!0?h.push(k,k+1,H):h.push(k+1,k,H),D+=3}c.addGroup(f,D,y===!0?1:2),f+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var xi=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,n){let i=this.getUtoTmapping(t);return this.getPoint(i,n)}getPoints(t=5){let n=[];for(let i=0;i<=t;i++)n.push(this.getPoint(i/t));return n}getSpacedPoints(t=5){let n=[];for(let i=0;i<=t;i++)n.push(this.getPointAt(i/t));return n}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let n=[],i,a=this.getPoint(0),s=0;n.push(0);for(let r=1;r<=t;r++)i=this.getPoint(r/t),s+=i.distanceTo(a),n.push(s),a=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,n=null){let i=this.getLengths(),a=0,s=i.length,r;n?r=n:r=t*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(a=Math.floor(o+(l-o)/2),c=i[a]-r,c<0)o=a+1;else if(c>0)l=a-1;else{l=a;break}if(a=l,i[a]===r)return a/(s-1);let h=i[a],u=i[a+1]-h,p=(r-h)/u;return(a+p)/(s-1)}getTangent(t,n){let a=t-1e-4,s=t+1e-4;a<0&&(a=0),s>1&&(s=1);let r=this.getPoint(a),o=this.getPoint(s),l=n||(r.isVector2?new It:new L);return l.copy(o).sub(r).normalize(),l}getTangentAt(t,n){let i=this.getUtoTmapping(t);return this.getTangent(i,n)}computeFrenetFrames(t,n=!1){let i=new L,a=[],s=[],r=[],o=new L,l=new He;for(let p=0;p<=t;p++){let g=p/t;a[p]=this.getTangentAt(g,new L)}s[0]=new L,r[0]=new L;let c=Number.MAX_VALUE,h=Math.abs(a[0].x),d=Math.abs(a[0].y),u=Math.abs(a[0].z);h<=c&&(c=h,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),u<=c&&i.set(0,0,1),o.crossVectors(a[0],i).normalize(),s[0].crossVectors(a[0],o),r[0].crossVectors(a[0],s[0]);for(let p=1;p<=t;p++){if(s[p]=s[p-1].clone(),r[p]=r[p-1].clone(),o.crossVectors(a[p-1],a[p]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(te(a[p-1].dot(a[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(o,g))}r[p].crossVectors(a[p],s[p])}if(n===!0){let p=Math.acos(te(s[0].dot(s[t]),-1,1));p/=t,a[0].dot(o.crossVectors(s[0],s[t]))>0&&(p=-p);for(let g=1;g<=t;g++)s[g].applyMatrix4(l.makeRotationAxis(a[g],p*g)),r[g].crossVectors(a[g],s[g])}return{tangents:a,normals:s,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},zc=class extends xi{constructor(t=0,n=0,i=1,a=1,s=0,r=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=n,this.xRadius=i,this.yRadius=a,this.aStartAngle=s,this.aEndAngle=r,this.aClockwise=o,this.aRotation=l}getPoint(t,n=new It){let i=n,a=Math.PI*2,s=this.aEndAngle-this.aStartAngle,r=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=a;for(;s>a;)s-=a;s<Number.EPSILON&&(r?s=0:s=a),this.aClockwise===!0&&!r&&(s===a?s=-a:s=s-a);let o=this.aStartAngle+t*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,p=c-this.aY;l=u*h-p*d+this.aX,c=u*d+p*h+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Cf=class extends zc{constructor(t,n,i,a,s,r){super(t,n,i,i,a,s,r),this.isArcCurve=!0,this.type="ArcCurve"}};function j0(){let e=0,t=0,n=0,i=0;function a(s,r,o,l){e=s,t=o,n=-3*s+3*r-2*o-l,i=2*s-2*r+o+l}return{initCatmullRom:function(s,r,o,l,c){a(r,o,c*(o-s),c*(l-r))},initNonuniformCatmullRom:function(s,r,o,l,c,h,d){let u=(r-s)/c-(o-s)/(c+h)+(o-r)/h,p=(o-r)/h-(l-r)/(h+d)+(l-o)/d;u*=h,p*=h,a(r,o,u,p)},calc:function(s){let r=s*s,o=r*s;return e+t*s+n*r+i*o}}}var hf=new L,T0=new j0,A0=new j0,w0=new j0,Rf=class extends xi{constructor(t=[],n=!1,i="centripetal",a=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=n,this.curveType=i,this.tension=a}getPoint(t,n=new L){let i=n,a=this.points,s=a.length,r=(s-(this.closed?0:1))*t,o=Math.floor(r),l=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,h;this.closed||o>0?c=a[(o-1)%s]:(hf.subVectors(a[0],a[1]).add(a[0]),c=hf);let d=a[o%s],u=a[(o+1)%s];if(this.closed||o+2<s?h=a[(o+2)%s]:(hf.subVectors(a[s-1],a[s-2]).add(a[s-1]),h=hf),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),p),x=Math.pow(d.distanceToSquared(u),p),m=Math.pow(u.distanceToSquared(h),p);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),T0.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,x,m),A0.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,x,m),w0.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(T0.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),A0.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),w0.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return i.set(T0.calc(l),A0.calc(l),w0.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let a=t.points[n];this.points.push(a.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let n=0,i=this.points.length;n<i;n++){let a=this.points[n];t.points.push(a.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let a=t.points[n];this.points.push(new L().fromArray(a))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function lb(e,t,n,i,a){let s=(i-t)*.5,r=(a-n)*.5,o=e*e,l=e*o;return(2*n-2*i+s+r)*l+(-3*n+3*i-2*s-r)*o+s*e+n}function Nw(e,t){let n=1-e;return n*n*t}function Lw(e,t){return 2*(1-e)*e*t}function Ow(e,t){return e*e*t}function yc(e,t,n,i){return Nw(e,t)+Lw(e,n)+Ow(e,i)}function Iw(e,t){let n=1-e;return n*n*n*t}function Pw(e,t){let n=1-e;return 3*n*n*e*t}function Bw(e,t){return 3*(1-e)*e*e*t}function zw(e,t){return e*e*e*t}function xc(e,t,n,i,a){return Iw(e,t)+Pw(e,n)+Bw(e,i)+zw(e,a)}var Df=class extends xi{constructor(t=new It,n=new It,i=new It,a=new It){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=n,this.v2=i,this.v3=a}getPoint(t,n=new It){let i=n,a=this.v0,s=this.v1,r=this.v2,o=this.v3;return i.set(xc(t,a.x,s.x,r.x,o.x),xc(t,a.y,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Uf=class extends xi{constructor(t=new L,n=new L,i=new L,a=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=n,this.v2=i,this.v3=a}getPoint(t,n=new L){let i=n,a=this.v0,s=this.v1,r=this.v2,o=this.v3;return i.set(xc(t,a.x,s.x,r.x,o.x),xc(t,a.y,s.y,r.y,o.y),xc(t,a.z,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Nf=class extends xi{constructor(t=new It,n=new It){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=n}getPoint(t,n=new It){let i=n;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new It){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Yo=class extends xi{constructor(t=new L,n=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=n}getPoint(t,n=new L){let i=n;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new L){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Lf=class extends xi{constructor(t=new It,n=new It,i=new It){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=n,this.v2=i}getPoint(t,n=new It){let i=n,a=this.v0,s=this.v1,r=this.v2;return i.set(yc(t,a.x,s.x,r.x),yc(t,a.y,s.y,r.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Fc=class extends xi{constructor(t=new L,n=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=n,this.v2=i}getPoint(t,n=new L){let i=n,a=this.v0,s=this.v1,r=this.v2;return i.set(yc(t,a.x,s.x,r.x),yc(t,a.y,s.y,r.y),yc(t,a.z,s.z,r.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Of=class extends xi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,n=new It){let i=n,a=this.points,s=(a.length-1)*t,r=Math.floor(s),o=s-r,l=a[r===0?r:r-1],c=a[r],h=a[r>a.length-2?a.length-1:r+1],d=a[r>a.length-3?a.length-1:r+2];return i.set(lb(o,l.x,c.x,h.x,d.x),lb(o,l.y,c.y,h.y,d.y)),i}copy(t){super.copy(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let a=t.points[n];this.points.push(a.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let n=0,i=this.points.length;n<i;n++){let a=this.points[n];t.points.push(a.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let a=t.points[n];this.points.push(new It().fromArray(a))}return this}},Fw=Object.freeze({__proto__:null,ArcCurve:Cf,CatmullRomCurve3:Rf,CubicBezierCurve:Df,CubicBezierCurve3:Uf,EllipseCurve:zc,LineCurve:Nf,LineCurve3:Yo,QuadraticBezierCurve:Lf,QuadraticBezierCurve3:Fc,SplineCurve:Of});var Cs=class e extends Fn{constructor(t=1,n=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:a};let s=t/2,r=n/2,o=Math.floor(i),l=Math.floor(a),c=o+1,h=l+1,d=t/o,u=n/l,p=[],g=[],x=[],m=[];for(let f=0;f<h;f++){let v=f*u-r;for(let _=0;_<c;_++){let y=_*d-s;g.push(y,-v,0),x.push(0,0,1),m.push(_/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let v=0;v<o;v++){let _=v+c*f,y=v+c*(f+1),T=v+1+c*(f+1),C=v+1+c*f;p.push(_,y,C),p.push(y,T,C)}this.setIndex(p),this.setAttribute("position",new on(g,3)),this.setAttribute("normal",new on(x,3)),this.setAttribute("uv",new on(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};var Hc=class e extends Fn{constructor(t=new Fc(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),n=64,i=1,a=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:n,radius:i,radialSegments:a,closed:s};let r=t.computeFrenetFrames(n,s);this.tangents=r.tangents,this.normals=r.normals,this.binormals=r.binormals;let o=new L,l=new L,c=new It,h=new L,d=[],u=[],p=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new on(d,3)),this.setAttribute("normal",new on(u,3)),this.setAttribute("uv",new on(p,2));function x(){for(let _=0;_<n;_++)m(_);m(s===!1?n:0),v(),f()}function m(_){h=t.getPointAt(_/n,h);let y=r.normals[_],T=r.binormals[_];for(let C=0;C<=a;C++){let w=C/a*Math.PI*2,D=Math.sin(w),E=-Math.cos(w);l.x=E*y.x+D*T.x,l.y=E*y.y+D*T.y,l.z=E*y.z+D*T.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+i*l.x,o.y=h.y+i*l.y,o.z=h.z+i*l.z,d.push(o.x,o.y,o.z)}}function f(){for(let _=1;_<=n;_++)for(let y=1;y<=a;y++){let T=(a+1)*(_-1)+(y-1),C=(a+1)*_+(y-1),w=(a+1)*_+y,D=(a+1)*(_-1)+y;g.push(T,C,D),g.push(C,w,D)}}function v(){for(let _=0;_<=n;_++)for(let y=0;y<=a;y++)c.x=_/n,c.y=y/a,p.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new e(new Fw[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var If=class extends ws{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bb,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Pf=class extends ws{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function ff(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)}function Hw(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}var vr=class{constructor(t,n,i,a){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=a!==void 0?a:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let n=this.parameterPositions,i=this._cachedIndex,a=n[i],s=n[i-1];t:{e:{let r;n:{i:if(!(t<a)){for(let o=i+2;;){if(a===void 0){if(t<s)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(s=a,a=n[++i],t<a)break e}r=n.length;break n}if(!(t>=s)){let o=n[1];t<o&&(i=2,s=o);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(a=s,s=n[--i-1],t>=s)break e}r=i,i=0;break n}break t}for(;i<r;){let o=i+r>>>1;t<n[o]?r=o:i=o+1}if(a=n[i],s=n[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(a===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,a)}return this.interpolate_(i,s,t,a)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let n=this.resultBuffer,i=this.sampleValues,a=this.valueSize,s=t*a;for(let r=0;r!==a;++r)n[r]=i[s+r];return n}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Bf=class extends vr{constructor(t,n,i,a){super(t,n,i,a),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:C0,endingEnd:C0}}intervalChanged_(t,n,i){let a=this.parameterPositions,s=t-2,r=t+1,o=a[s],l=a[r];if(o===void 0)switch(this.getSettings_().endingStart){case R0:s=t,o=2*n-i;break;case D0:s=a.length-2,o=n+a[s]-a[s+1];break;default:s=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case R0:r=t,l=2*i-n;break;case D0:r=1,l=i+a[1]-a[0];break;default:r=t-1,l=n}let c=(i-n)*.5,h=this.valueSize;this._weightPrev=c/(n-o),this._weightNext=c/(l-i),this._offsetPrev=s*h,this._offsetNext=r*h}interpolate_(t,n,i,a){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,p=this._weightNext,g=(i-n)/(a-n),x=g*g,m=x*g,f=-u*m+2*u*x-u*g,v=(1+u)*m+(-1.5-2*u)*x+(-.5+u)*g+1,_=(-1-p)*m+(1.5+p)*x+.5*g,y=p*m-p*x;for(let T=0;T!==o;++T)s[T]=f*r[h+T]+v*r[c+T]+_*r[l+T]+y*r[d+T];return s}},zf=class extends vr{constructor(t,n,i,a){super(t,n,i,a)}interpolate_(t,n,i,a){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(i-n)/(a-n),d=1-h;for(let u=0;u!==o;++u)s[u]=r[c+u]*d+r[l+u]*h;return s}},Ff=class extends vr{constructor(t,n,i,a){super(t,n,i,a)}interpolate_(t){return this.copySampleValue_(t-1)}},ai=class{constructor(t,n,i,a){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ff(n,this.TimeBufferType),this.values=ff(i,this.ValueBufferType),this.setInterpolation(a||this.DefaultInterpolation)}static toJSON(t){let n=t.constructor,i;if(n.toJSON!==this.toJSON)i=n.toJSON(t);else{i={name:t.name,times:ff(t.times,Array),values:ff(t.values,Array)};let a=t.getInterpolation();a!==t.DefaultInterpolation&&(i.interpolation=a)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Ff(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new zf(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Bf(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let n;switch(t){case Sc:n=this.InterpolantFactoryMethodDiscrete;break;case vf:n=this.InterpolantFactoryMethodLinear;break;case df:n=this.InterpolantFactoryMethodSmooth;break}if(n===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Sc;case this.InterpolantFactoryMethodLinear:return vf;case this.InterpolantFactoryMethodSmooth:return df}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let n=this.times;for(let i=0,a=n.length;i!==a;++i)n[i]+=t}return this}scale(t){if(t!==1){let n=this.times;for(let i=0,a=n.length;i!==a;++i)n[i]*=t}return this}trim(t,n){let i=this.times,a=i.length,s=0,r=a-1;for(;s!==a&&i[s]<t;)++s;for(;r!==-1&&i[r]>n;)--r;if(++r,s!==0||r!==a){s>=r&&(r=Math.max(r,1),s=r-1);let o=this.getValueSize();this.times=i.slice(s,r),this.values=this.values.slice(s*o,r*o)}return this}validate(){let t=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,a=this.values,s=i.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let r=null;for(let o=0;o!==s;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(r!==null&&r>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,r),t=!1;break}r=l}if(a!==void 0&&Hw(a))for(let o=0,l=a.length;o!==l;++o){let c=a[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),a=this.getInterpolation()===df,s=t.length-1,r=1;for(let o=1;o<s;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(a)l=!0;else{let d=o*i,u=d-i,p=d+i;for(let g=0;g!==i;++g){let x=n[d+g];if(x!==n[u+g]||x!==n[p+g]){l=!0;break}}}if(l){if(o!==r){t[r]=t[o];let d=o*i,u=r*i;for(let p=0;p!==i;++p)n[u+p]=n[d+p]}++r}}if(s>0){t[r]=t[s];for(let o=s*i,l=r*i,c=0;c!==i;++c)n[l+c]=n[o+c];++r}return r!==t.length?(this.times=t.slice(0,r),this.values=n.slice(0,r*i)):(this.times=t,this.values=n),this}clone(){let t=this.times.slice(),n=this.values.slice(),i=this.constructor,a=new i(this.name,t,n);return a.createInterpolant=this.createInterpolant,a}};ai.prototype.ValueTypeName="";ai.prototype.TimeBufferType=Float32Array;ai.prototype.ValueBufferType=Float32Array;ai.prototype.DefaultInterpolation=vf;var Rs=class extends ai{constructor(t,n,i){super(t,n,i)}};Rs.prototype.ValueTypeName="bool";Rs.prototype.ValueBufferType=Array;Rs.prototype.DefaultInterpolation=Sc;Rs.prototype.InterpolantFactoryMethodLinear=void 0;Rs.prototype.InterpolantFactoryMethodSmooth=void 0;var Hf=class extends ai{constructor(t,n,i,a){super(t,n,i,a)}};Hf.prototype.ValueTypeName="color";var Vf=class extends ai{constructor(t,n,i,a){super(t,n,i,a)}};Vf.prototype.ValueTypeName="number";var Gf=class extends vr{constructor(t,n,i,a){super(t,n,i,a)}interpolate_(t,n,i,a){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=(i-n)/(a-n),c=t*o;for(let h=c+o;c!==h;c+=4)Ba.slerpFlat(s,0,r,c-o,r,c,l);return s}},Vc=class extends ai{constructor(t,n,i,a){super(t,n,i,a)}InterpolantFactoryMethodLinear(t){return new Gf(this.times,this.values,this.getValueSize(),t)}};Vc.prototype.ValueTypeName="quaternion";Vc.prototype.InterpolantFactoryMethodSmooth=void 0;var Ds=class extends ai{constructor(t,n,i){super(t,n,i)}};Ds.prototype.ValueTypeName="string";Ds.prototype.ValueBufferType=Array;Ds.prototype.DefaultInterpolation=Sc;Ds.prototype.InterpolantFactoryMethodLinear=void 0;Ds.prototype.InterpolantFactoryMethodSmooth=void 0;var kf=class extends ai{constructor(t,n,i,a){super(t,n,i,a)}};kf.prototype.ValueTypeName="vector";var Xf=class{constructor(t,n,i){let a=this,s=!1,r=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=i,this.abortController=new AbortController,this.itemStart=function(h){o++,s===!1&&a.onStart!==void 0&&a.onStart(h,r,o),s=!0},this.itemEnd=function(h){r++,a.onProgress!==void 0&&a.onProgress(h,r,o),r===o&&(s=!1,a.onLoad!==void 0&&a.onLoad())},this.itemError=function(h){a.onError!==void 0&&a.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let p=c[d],g=c[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},jb=new Xf,Wf=class{constructor(t){this.manager=t!==void 0?t:jb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,n){let i=this;return new Promise(function(a,s){i.load(t,a,n,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Wf.DEFAULT_MATERIAL_NAME="__DEFAULT";var Zo=class extends Uc{constructor(t=-1,n=1,i=1,a=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=a,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,a,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2,s=i-t,r=i+t,o=a+n,l=a-n;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}};var Gc=class extends Fn{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}};var qf=class extends Mn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var $0="\\[\\]\\.:\\/",Vw=new RegExp("["+$0+"]","g"),tv="[^"+$0+"]",Gw="[^"+$0.replace("\\.","")+"]",kw=/((?:WC+[\/:])*)/.source.replace("WC",tv),Xw=/(WCOD+)?/.source.replace("WCOD",Gw),Ww=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",tv),qw=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",tv),Yw=new RegExp("^"+kw+Xw+Ww+qw+"$"),Zw=["material","materials","bones","map"],L0=class{constructor(t,n,i){let a=i||Ue.parseTrackName(n);this._targetGroup=t,this._bindings=t.subscribe_(n,a)}getValue(t,n){this.bind();let i=this._targetGroup.nCachedObjects_,a=this._bindings[i];a!==void 0&&a.getValue(t,n)}setValue(t,n){let i=this._bindings;for(let a=this._targetGroup.nCachedObjects_,s=i.length;a!==s;++a)i[a].setValue(t,n)}bind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].bind()}unbind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].unbind()}},Ue=class e{constructor(t,n,i){this.path=n,this.parsedPath=i||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,i){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,i):new e(t,n,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Vw,"")}static parseTrackName(t){let n=Yw.exec(t);if(n===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},a=i.nodeName&&i.nodeName.lastIndexOf(".");if(a!==void 0&&a!==-1){let s=i.nodeName.substring(a+1);Zw.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,a),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,n){if(n===void 0||n===""||n==="."||n===-1||n===t.name||n===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(n);if(i!==void 0)return i}if(t.children){let i=function(s){for(let r=0;r<s.length;r++){let o=s[r];if(o.name===n||o.uuid===n)return o;let l=i(o.children);if(l)return l}return null},a=i(t.children);if(a)return a}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,n){t[n]=this.targetObject[this.propertyName]}_getValue_array(t,n){let i=this.resolvedProperty;for(let a=0,s=i.length;a!==s;++a)t[n++]=i[a]}_getValue_arrayElement(t,n){t[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,n){this.resolvedProperty.toArray(t,n)}_setValue_direct(t,n){this.targetObject[this.propertyName]=t[n]}_setValue_direct_setNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,n){let i=this.resolvedProperty;for(let a=0,s=i.length;a!==s;++a)i[a]=t[n++]}_setValue_array_setNeedsUpdate(t,n){let i=this.resolvedProperty;for(let a=0,s=i.length;a!==s;++a)i[a]=t[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,n){let i=this.resolvedProperty;for(let a=0,s=i.length;a!==s;++a)i[a]=t[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,n){this.resolvedProperty[this.propertyIndex]=t[n]}_setValue_arrayElement_setNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,n){this.resolvedProperty.fromArray(t,n)}_setValue_fromArray_setNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,n){this.bind(),this.getValue(t,n)}_setValue_unbound(t,n){this.bind(),this.setValue(t,n)}bind(){let t=this.node,n=this.parsedPath,i=n.objectName,a=n.propertyName,s=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=n.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let r=t[a];if(r===void 0){let c=n.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+a+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(a==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=a;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ue.Composite=L0;Ue.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ue.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ue.prototype.GetterByBindingType=[Ue.prototype._getValue_direct,Ue.prototype._getValue_array,Ue.prototype._getValue_arrayElement,Ue.prototype._getValue_toArray];Ue.prototype.SetterByBindingTypeAndVersioning=[[Ue.prototype._setValue_direct,Ue.prototype._setValue_direct_setNeedsUpdate,Ue.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ue.prototype._setValue_array,Ue.prototype._setValue_array_setNeedsUpdate,Ue.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ue.prototype._setValue_arrayElement,Ue.prototype._setValue_arrayElement_setNeedsUpdate,Ue.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ue.prototype._setValue_fromArray,Ue.prototype._setValue_fromArray_setNeedsUpdate,Ue.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var jD=new Float32Array(1);function ev(e,t,n,i){let a=Jw(i);switch(n){case X0:return e*t;case q0:return e*t/a.components*a.byteLength;case od:return e*t/a.components*a.byteLength;case Y0:return e*t*2/a.components*a.byteLength;case ld:return e*t*2/a.components*a.byteLength;case W0:return e*t*3/a.components*a.byteLength;case Mi:return e*t*4/a.components*a.byteLength;case cd:return e*t*4/a.components*a.byteLength;case Yc:case Zc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Jc:case Kc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case hd:case dd:return Math.max(e,16)*Math.max(t,8)/4;case ud:case fd:return Math.max(e,8)*Math.max(t,8)/2;case pd:case md:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case gd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case vd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case _d:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case yd:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case xd:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Sd:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Md:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case bd:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Ed:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Td:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Ad:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case wd:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Cd:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Rd:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Dd:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Ud:case Nd:case Ld:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Od:case Id:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Pd:case Bd:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function Jw(e){switch(e){case Si:case H0:return{byteLength:1,components:1};case Jo:case V0:case Ls:return{byteLength:2,components:1};case sd:case rd:return{byteLength:2,components:4};case Ns:case ad:case ca:return{byteLength:4,components:1};case G0:case k0:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function M1(){let e=null,t=!1,n=null,i=null;function a(s,r){n(s,r),i=e.requestAnimationFrame(a)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(a),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){n=s},setContext:function(s){e=s}}}function Qw(e){let t=new WeakMap;function n(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=e.createBuffer();e.bindBuffer(l,u),e.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=e.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=e.HALF_FLOAT:p=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=e.SHORT;else if(c instanceof Uint32Array)p=e.UNSIGNED_INT;else if(c instanceof Int32Array)p=e.INT;else if(c instanceof Int8Array)p=e.BYTE;else if(c instanceof Uint8Array)p=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let h=l.array,d=l.updateRanges;if(e.bindBuffer(c,o),d.length===0)e.bufferSubData(c,0,h);else{d.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<d.length;p++){let g=d[u],x=d[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,d[u]=x)}d.length=u+1;for(let p=0,g=d.length;p<g;p++){let x=d[p];e.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(e.deleteBuffer(l.buffer),t.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:a,remove:s,update:r}}var jw=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$w=`#ifdef USE_ALPHAHASH
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
#endif`,tC=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,eC=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,nC=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,iC=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aC=`#ifdef USE_AOMAP
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
#endif`,sC=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,rC=`#ifdef USE_BATCHING
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
#endif`,oC=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,lC=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,cC=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,uC=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,hC=`#ifdef USE_IRIDESCENCE
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
#endif`,fC=`#ifdef USE_BUMPMAP
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
#endif`,dC=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,pC=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,mC=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gC=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vC=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,_C=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,yC=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,xC=`#if defined( USE_COLOR_ALPHA )
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
#endif`,SC=`#define PI 3.141592653589793
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
} // validated`,MC=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,bC=`vec3 transformedNormal = objectNormal;
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
#endif`,EC=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,TC=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,AC=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wC=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,CC="gl_FragColor = linearToOutputTexel( gl_FragColor );",RC=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,DC=`#ifdef USE_ENVMAP
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
#endif`,UC=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,NC=`#ifdef USE_ENVMAP
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
#endif`,LC=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,OC=`#ifdef USE_ENVMAP
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
#endif`,IC=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,PC=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,BC=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,zC=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,FC=`#ifdef USE_GRADIENTMAP
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
}`,HC=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,VC=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,GC=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kC=`uniform bool receiveShadow;
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
#endif`,XC=`#ifdef USE_ENVMAP
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
#endif`,WC=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qC=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,YC=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ZC=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,JC=`PhysicalMaterial material;
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
#endif`,KC=`struct PhysicalMaterial {
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
}`,QC=`
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
#endif`,jC=`#if defined( RE_IndirectDiffuse )
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
#endif`,$C=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tR=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,eR=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nR=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,iR=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,aR=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,sR=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,rR=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,oR=`#if defined( USE_POINTS_UV )
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
#endif`,lR=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cR=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,uR=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,hR=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,fR=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dR=`#ifdef USE_MORPHTARGETS
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
#endif`,pR=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mR=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,gR=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,vR=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_R=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yR=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,xR=`#ifdef USE_NORMALMAP
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
#endif`,SR=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,MR=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bR=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ER=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,TR=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,AR=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,wR=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,CR=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,RR=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,DR=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,UR=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,NR=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,LR=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,OR=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,IR=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,PR=`float getShadowMask() {
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
}`,BR=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,zR=`#ifdef USE_SKINNING
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
#endif`,FR=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,HR=`#ifdef USE_SKINNING
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
#endif`,VR=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,GR=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kR=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,XR=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,WR=`#ifdef USE_TRANSMISSION
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
#endif`,qR=`#ifdef USE_TRANSMISSION
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
#endif`,YR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ZR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,JR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,KR=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,QR=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jR=`uniform sampler2D t2D;
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
}`,$R=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,t2=`#ifdef ENVMAP_TYPE_CUBE
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
}`,e2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,n2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,i2=`#include <common>
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
}`,a2=`#if DEPTH_PACKING == 3200
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
}`,s2=`#define DISTANCE
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
}`,r2=`#define DISTANCE
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
}`,o2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,l2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,c2=`uniform float scale;
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
}`,u2=`uniform vec3 diffuse;
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
}`,h2=`#include <common>
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
}`,f2=`uniform vec3 diffuse;
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
}`,d2=`#define LAMBERT
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
}`,p2=`#define LAMBERT
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
}`,m2=`#define MATCAP
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
}`,g2=`#define MATCAP
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
}`,v2=`#define NORMAL
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
}`,_2=`#define NORMAL
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
}`,y2=`#define PHONG
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
}`,x2=`#define PHONG
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
}`,S2=`#define STANDARD
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
}`,M2=`#define STANDARD
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
}`,b2=`#define TOON
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
}`,E2=`#define TOON
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
}`,T2=`uniform float size;
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
}`,A2=`uniform vec3 diffuse;
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
}`,w2=`#include <common>
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
}`,C2=`uniform vec3 color;
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
}`,R2=`uniform float rotation;
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
}`,D2=`uniform vec3 diffuse;
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
}`,qt={alphahash_fragment:jw,alphahash_pars_fragment:$w,alphamap_fragment:tC,alphamap_pars_fragment:eC,alphatest_fragment:nC,alphatest_pars_fragment:iC,aomap_fragment:aC,aomap_pars_fragment:sC,batching_pars_vertex:rC,batching_vertex:oC,begin_vertex:lC,beginnormal_vertex:cC,bsdfs:uC,iridescence_fragment:hC,bumpmap_pars_fragment:fC,clipping_planes_fragment:dC,clipping_planes_pars_fragment:pC,clipping_planes_pars_vertex:mC,clipping_planes_vertex:gC,color_fragment:vC,color_pars_fragment:_C,color_pars_vertex:yC,color_vertex:xC,common:SC,cube_uv_reflection_fragment:MC,defaultnormal_vertex:bC,displacementmap_pars_vertex:EC,displacementmap_vertex:TC,emissivemap_fragment:AC,emissivemap_pars_fragment:wC,colorspace_fragment:CC,colorspace_pars_fragment:RC,envmap_fragment:DC,envmap_common_pars_fragment:UC,envmap_pars_fragment:NC,envmap_pars_vertex:LC,envmap_physical_pars_fragment:XC,envmap_vertex:OC,fog_vertex:IC,fog_pars_vertex:PC,fog_fragment:BC,fog_pars_fragment:zC,gradientmap_pars_fragment:FC,lightmap_pars_fragment:HC,lights_lambert_fragment:VC,lights_lambert_pars_fragment:GC,lights_pars_begin:kC,lights_toon_fragment:WC,lights_toon_pars_fragment:qC,lights_phong_fragment:YC,lights_phong_pars_fragment:ZC,lights_physical_fragment:JC,lights_physical_pars_fragment:KC,lights_fragment_begin:QC,lights_fragment_maps:jC,lights_fragment_end:$C,logdepthbuf_fragment:tR,logdepthbuf_pars_fragment:eR,logdepthbuf_pars_vertex:nR,logdepthbuf_vertex:iR,map_fragment:aR,map_pars_fragment:sR,map_particle_fragment:rR,map_particle_pars_fragment:oR,metalnessmap_fragment:lR,metalnessmap_pars_fragment:cR,morphinstance_vertex:uR,morphcolor_vertex:hR,morphnormal_vertex:fR,morphtarget_pars_vertex:dR,morphtarget_vertex:pR,normal_fragment_begin:mR,normal_fragment_maps:gR,normal_pars_fragment:vR,normal_pars_vertex:_R,normal_vertex:yR,normalmap_pars_fragment:xR,clearcoat_normal_fragment_begin:SR,clearcoat_normal_fragment_maps:MR,clearcoat_pars_fragment:bR,iridescence_pars_fragment:ER,opaque_fragment:TR,packing:AR,premultiplied_alpha_fragment:wR,project_vertex:CR,dithering_fragment:RR,dithering_pars_fragment:DR,roughnessmap_fragment:UR,roughnessmap_pars_fragment:NR,shadowmap_pars_fragment:LR,shadowmap_pars_vertex:OR,shadowmap_vertex:IR,shadowmask_pars_fragment:PR,skinbase_vertex:BR,skinning_pars_vertex:zR,skinning_vertex:FR,skinnormal_vertex:HR,specularmap_fragment:VR,specularmap_pars_fragment:GR,tonemapping_fragment:kR,tonemapping_pars_fragment:XR,transmission_fragment:WR,transmission_pars_fragment:qR,uv_pars_fragment:YR,uv_pars_vertex:ZR,uv_vertex:JR,worldpos_vertex:KR,background_vert:QR,background_frag:jR,backgroundCube_vert:$R,backgroundCube_frag:t2,cube_vert:e2,cube_frag:n2,depth_vert:i2,depth_frag:a2,distanceRGBA_vert:s2,distanceRGBA_frag:r2,equirect_vert:o2,equirect_frag:l2,linedashed_vert:c2,linedashed_frag:u2,meshbasic_vert:h2,meshbasic_frag:f2,meshlambert_vert:d2,meshlambert_frag:p2,meshmatcap_vert:m2,meshmatcap_frag:g2,meshnormal_vert:v2,meshnormal_frag:_2,meshphong_vert:y2,meshphong_frag:x2,meshphysical_vert:S2,meshphysical_frag:M2,meshtoon_vert:b2,meshtoon_frag:E2,points_vert:T2,points_frag:A2,shadow_vert:w2,shadow_frag:C2,sprite_vert:R2,sprite_frag:D2},ft={common:{diffuse:{value:new ae(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Wt}},envmap:{envMap:{value:null},envMapRotation:{value:new Wt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Wt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Wt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Wt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Wt},normalScale:{value:new It(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Wt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Wt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Wt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Wt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ae(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ae(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0},uvTransform:{value:new Wt}},sprite:{diffuse:{value:new ae(16777215)},opacity:{value:1},center:{value:new It(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}}},ua={basic:{uniforms:bn([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:bn([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new ae(0)}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:bn([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new ae(0)},specular:{value:new ae(1118481)},shininess:{value:30}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:bn([ft.common,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.roughnessmap,ft.metalnessmap,ft.fog,ft.lights,{emissive:{value:new ae(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:bn([ft.common,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.gradientmap,ft.fog,ft.lights,{emissive:{value:new ae(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:bn([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:bn([ft.points,ft.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:bn([ft.common,ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:bn([ft.common,ft.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:bn([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:bn([ft.sprite,ft.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Wt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Wt}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distanceRGBA:{uniforms:bn([ft.common,ft.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distanceRGBA_vert,fragmentShader:qt.distanceRGBA_frag},shadow:{uniforms:bn([ft.lights,ft.fog,{color:{value:new ae(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};ua.physical={uniforms:bn([ua.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Wt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Wt},clearcoatNormalScale:{value:new It(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Wt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Wt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Wt},sheen:{value:0},sheenColor:{value:new ae(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Wt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Wt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Wt},transmissionSamplerSize:{value:new It},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Wt},attenuationDistance:{value:0},attenuationColor:{value:new ae(0)},specularColor:{value:new ae(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Wt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Wt},anisotropyVector:{value:new It},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Wt}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};var zd={r:0,b:0,g:0},Sr=new ra,U2=new He;function N2(e,t,n,i,a,s,r){let o=new ae(0),l=s===!0?0:1,c,h,d=null,u=0,p=null;function g(_){let y=_.isScene===!0?_.background:null;return y&&y.isTexture&&(y=(_.backgroundBlurriness>0?n:t).get(y)),y}function x(_){let y=!1,T=g(_);T===null?f(o,l):T&&T.isColor&&(f(T,1),y=!0);let C=e.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,r):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(e.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function m(_,y){let T=g(y);T&&(T.isCubeTexture||T.mapping===Wc)?(h===void 0&&(h=new gn(new Xo(1,1,1),new Hn({name:"BackgroundCubeMaterial",uniforms:xr(ua.backgroundCube.uniforms),vertexShader:ua.backgroundCube.vertexShader,fragmentShader:ua.backgroundCube.fragmentShader,side:Rn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,w,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(h)),Sr.copy(y.backgroundRotation),Sr.x*=-1,Sr.y*=-1,Sr.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Sr.y*=-1,Sr.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(U2.makeRotationFromEuler(Sr)),h.material.toneMapped=oe.getTransfer(T.colorSpace)!==Me,(d!==T||u!==T.version||p!==e.toneMapping)&&(h.material.needsUpdate=!0,d=T,u=T.version,p=e.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new gn(new Cs(2,2),new Hn({name:"BackgroundMaterial",uniforms:xr(ua.background.uniforms),vertexShader:ua.background.vertexShader,fragmentShader:ua.background.fragmentShader,side:Oa,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=oe.getTransfer(T.colorSpace)!==Me,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(d!==T||u!==T.version||p!==e.toneMapping)&&(c.material.needsUpdate=!0,d=T,u=T.version,p=e.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function f(_,y){_.getRGB(zd,Q0(e)),i.buffers.color.setClear(zd.r,zd.g,zd.b,y,r)}function v(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(_,y=1){o.set(_),l=y,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,f(o,l)},render:x,addToRenderList:m,dispose:v}}function L2(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},a=u(null),s=a,r=!1;function o(S,U,B,H,k){let J=!1,W=d(H,B,U);s!==W&&(s=W,c(s.object)),J=p(S,H,B,k),J&&g(S,H,B,k),k!==null&&t.update(k,e.ELEMENT_ARRAY_BUFFER),(J||r)&&(r=!1,y(S,U,B,H),k!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function l(){return e.createVertexArray()}function c(S){return e.bindVertexArray(S)}function h(S){return e.deleteVertexArray(S)}function d(S,U,B){let H=B.wireframe===!0,k=i[S.id];k===void 0&&(k={},i[S.id]=k);let J=k[U.id];J===void 0&&(J={},k[U.id]=J);let W=J[H];return W===void 0&&(W=u(l()),J[H]=W),W}function u(S){let U=[],B=[],H=[];for(let k=0;k<n;k++)U[k]=0,B[k]=0,H[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:B,attributeDivisors:H,object:S,attributes:{},index:null}}function p(S,U,B,H){let k=s.attributes,J=U.attributes,W=0,at=B.getAttributes();for(let V in at)if(at[V].location>=0){let pt=k[V],Rt=J[V];if(Rt===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(Rt=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(Rt=S.instanceColor)),pt===void 0||pt.attribute!==Rt||Rt&&pt.data!==Rt.data)return!0;W++}return s.attributesNum!==W||s.index!==H}function g(S,U,B,H){let k={},J=U.attributes,W=0,at=B.getAttributes();for(let V in at)if(at[V].location>=0){let pt=J[V];pt===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(pt=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(pt=S.instanceColor));let Rt={};Rt.attribute=pt,pt&&pt.data&&(Rt.data=pt.data),k[V]=Rt,W++}s.attributes=k,s.attributesNum=W,s.index=H}function x(){let S=s.newAttributes;for(let U=0,B=S.length;U<B;U++)S[U]=0}function m(S){f(S,0)}function f(S,U){let B=s.newAttributes,H=s.enabledAttributes,k=s.attributeDivisors;B[S]=1,H[S]===0&&(e.enableVertexAttribArray(S),H[S]=1),k[S]!==U&&(e.vertexAttribDivisor(S,U),k[S]=U)}function v(){let S=s.newAttributes,U=s.enabledAttributes;for(let B=0,H=U.length;B<H;B++)U[B]!==S[B]&&(e.disableVertexAttribArray(B),U[B]=0)}function _(S,U,B,H,k,J,W){W===!0?e.vertexAttribIPointer(S,U,B,k,J):e.vertexAttribPointer(S,U,B,H,k,J)}function y(S,U,B,H){x();let k=H.attributes,J=B.getAttributes(),W=U.defaultAttributeValues;for(let at in J){let V=J[at];if(V.location>=0){let ut=k[at];if(ut===void 0&&(at==="instanceMatrix"&&S.instanceMatrix&&(ut=S.instanceMatrix),at==="instanceColor"&&S.instanceColor&&(ut=S.instanceColor)),ut!==void 0){let pt=ut.normalized,Rt=ut.itemSize,Yt=t.get(ut);if(Yt===void 0)continue;let pe=Yt.buffer,le=Yt.type,se=Yt.bytesPerElement,X=le===e.INT||le===e.UNSIGNED_INT||ut.gpuType===ad;if(ut.isInterleavedBufferAttribute){let Q=ut.data,lt=Q.stride,Bt=ut.offset;if(Q.isInstancedInterleavedBuffer){for(let Ct=0;Ct<V.locationSize;Ct++)f(V.location+Ct,Q.meshPerAttribute);S.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let Ct=0;Ct<V.locationSize;Ct++)m(V.location+Ct);e.bindBuffer(e.ARRAY_BUFFER,pe);for(let Ct=0;Ct<V.locationSize;Ct++)_(V.location+Ct,Rt/V.locationSize,le,pt,lt*se,(Bt+Rt/V.locationSize*Ct)*se,X)}else{if(ut.isInstancedBufferAttribute){for(let Q=0;Q<V.locationSize;Q++)f(V.location+Q,ut.meshPerAttribute);S.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let Q=0;Q<V.locationSize;Q++)m(V.location+Q);e.bindBuffer(e.ARRAY_BUFFER,pe);for(let Q=0;Q<V.locationSize;Q++)_(V.location+Q,Rt/V.locationSize,le,pt,Rt*se,Rt/V.locationSize*Q*se,X)}}else if(W!==void 0){let pt=W[at];if(pt!==void 0)switch(pt.length){case 2:e.vertexAttrib2fv(V.location,pt);break;case 3:e.vertexAttrib3fv(V.location,pt);break;case 4:e.vertexAttrib4fv(V.location,pt);break;default:e.vertexAttrib1fv(V.location,pt)}}}}v()}function T(){D();for(let S in i){let U=i[S];for(let B in U){let H=U[B];for(let k in H)h(H[k].object),delete H[k];delete U[B]}delete i[S]}}function C(S){if(i[S.id]===void 0)return;let U=i[S.id];for(let B in U){let H=U[B];for(let k in H)h(H[k].object),delete H[k];delete U[B]}delete i[S.id]}function w(S){for(let U in i){let B=i[U];if(B[S.id]===void 0)continue;let H=B[S.id];for(let k in H)h(H[k].object),delete H[k];delete B[S.id]}}function D(){E(),r=!0,s!==a&&(s=a,c(s.object))}function E(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:D,resetDefaultState:E,dispose:T,releaseStatesOfGeometry:C,releaseStatesOfProgram:w,initAttributes:x,enableAttribute:m,disableUnusedAttributes:v}}function O2(e,t,n){let i;function a(c){i=c}function s(c,h){e.drawArrays(i,c,h),n.update(h,i,1)}function r(c,h,d){d!==0&&(e.drawArraysInstanced(i,c,h,d),n.update(h,i,d))}function o(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,d);let p=0;for(let g=0;g<d;g++)p+=h[g];n.update(p,i,1)}function l(c,h,d,u){if(d===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)r(c[g],h[g],u[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,h,0,u,0,d);let g=0;for(let x=0;x<d;x++)g+=h[x]*u[x];n.update(g,i,1)}}this.setMode=a,this.render=s,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function I2(e,t,n,i){let a;function s(){if(a!==void 0)return a;if(t.has("EXT_texture_filter_anisotropic")===!0){let w=t.get("EXT_texture_filter_anisotropic");a=e.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function r(w){return!(w!==Mi&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){let D=w===Ls&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==Si&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==ca&&!D)}function l(w){if(w==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=e.getParameter(e.MAX_TEXTURE_SIZE),m=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),f=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),_=e.getParameter(e.MAX_VARYING_VECTORS),y=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),T=g>0,C=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:v,maxVaryings:_,maxFragmentUniforms:y,vertexTextures:T,maxSamples:C}}function P2(e){let t=this,n=null,i=0,a=!1,s=!1,r=new aa,o=new Wt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let p=d.length!==0||u||i!==0||a;return a=u,i=d.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){n=h(d,u,0)},this.setState=function(d,u,p){let g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,f=e.get(d);if(!a||g===null||g.length===0||s&&!m)s?h(null):c();else{let v=s?0:i,_=v*4,y=f.clippingState||null;l.value=y,y=h(g,u,_,p);for(let T=0;T!==_;++T)y[T]=n[T];f.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(d,u,p,g){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let f=p+x*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<f)&&(m=new Float32Array(f));for(let _=0,y=p;_!==x;++_,y+=4)r.copy(d[_]).applyMatrix4(v,o),r.normal.toArray(m,y),m[y+3]=r.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function B2(e){let t=new WeakMap;function n(r,o){return o===ed?r.mapping=_r:o===nd&&(r.mapping=yr),r}function i(r){if(r&&r.isTexture){let o=r.mapping;if(o===ed||o===nd)if(t.has(r)){let l=t.get(r).texture;return n(l,r.mapping)}else{let l=r.image;if(l&&l.height>0){let c=new bf(l.height);return c.fromEquirectangularTexture(e,r),t.set(r,c),r.addEventListener("dispose",a),n(c.texture,r.mapping)}else return null}}return r}function a(r){let o=r.target;o.removeEventListener("dispose",a);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}var $o=4,$b=[.125,.215,.35,.446,.526,.582],Er=20,nv=new Zo,t1=new ae,iv=null,av=0,sv=0,rv=!1,br=(1+Math.sqrt(5))/2,jo=1/br,e1=[new L(-br,jo,0),new L(br,jo,0),new L(-jo,0,br),new L(jo,0,br),new L(0,br,-jo),new L(0,br,jo),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],z2=new L,Vd=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,i=.1,a=100,s={}){let{size:r=256,position:o=z2}=s;iv=this._renderer.getRenderTarget(),av=this._renderer.getActiveCubeFace(),sv=this._renderer.getActiveMipmapLevel(),rv=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,a,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=a1(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=i1(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(iv,av,sv),this._renderer.xr.enabled=rv,t.scissorTest=!1,Fd(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===_r||t.mapping===yr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),iv=this._renderer.getRenderTarget(),av=this._renderer.getActiveCubeFace(),sv=this._renderer.getActiveMipmapLevel(),rv=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Pi,minFilter:Pi,generateMipmaps:!1,type:Ls,format:Mi,colorSpace:sa,depthBuffer:!1},a=n1(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=n1(t,n,i);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=F2(s)),this._blurMaterial=H2(s,t,n)}return a}_compileMaterial(t){let n=new gn(this._lodPlanes[0],t);this._renderer.compile(n,nv)}_sceneToCubeUV(t,n,i,a,s){let l=new Mn(90,1,n,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(t1),d.toneMapping=za,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(a),d.clearDepth(),d.setRenderTarget(null));let x=new Cc({name:"PMREM.Background",side:Rn,depthWrite:!1,depthTest:!1}),m=new gn(new Xo,x),f=!1,v=t.background;v?v.isColor&&(x.color.copy(v),t.background=null,f=!0):(x.color.copy(t1),f=!0);for(let _=0;_<6;_++){let y=_%3;y===0?(l.up.set(0,c[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[_],s.y,s.z)):y===1?(l.up.set(0,0,c[_]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[_],s.z)):(l.up.set(0,c[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[_]));let T=this._cubeSize;Fd(a,y*T,_>2?T:0,T,T),d.setRenderTarget(a),f&&d.render(m,l),d.render(t,l)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=p,d.autoClear=u,t.background=v}_textureToCubeUV(t,n){let i=this._renderer,a=t.mapping===_r||t.mapping===yr;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=a1()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=i1());let s=a?this._cubemapMaterial:this._equirectMaterial,r=new gn(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;let l=this._cubeSize;Fd(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,nv)}_applyPMREM(t){let n=this._renderer,i=n.autoClear;n.autoClear=!1;let a=this._lodPlanes.length;for(let s=1;s<a;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=e1[(a-s-1)%e1.length];this._blur(t,s-1,s,r,o)}n.autoClear=i}_blur(t,n,i,a,s){let r=this._pingPongRenderTarget;this._halfBlur(t,r,n,i,a,"latitudinal",s),this._halfBlur(r,t,i,i,a,"longitudinal",s)}_halfBlur(t,n,i,a,s,r,o){let l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new gn(this._lodPlanes[a],c),u=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Er-1),x=s/g,m=isFinite(s)?1+Math.floor(h*x):Er;m>Er&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Er}`);let f=[],v=0;for(let w=0;w<Er;++w){let D=w/x,E=Math.exp(-D*D/2);f.push(E),w===0?v+=E:w<m&&(v+=2*E)}for(let w=0;w<f.length;w++)f[w]=f[w]/v;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=g,u.mipInt.value=_-i;let y=this._sizeLods[a],T=3*y*(a>_-$o?a-_+$o:0),C=4*(this._cubeSize-y);Fd(n,T,C,3*y,2*y),l.setRenderTarget(n),l.render(d,nv)}};function F2(e){let t=[],n=[],i=[],a=e,s=e-$o+1+$b.length;for(let r=0;r<s;r++){let o=Math.pow(2,a);n.push(o);let l=1/o;r>e-$o?l=$b[r-e+$o-1]:r===0&&(l=0),i.push(l);let c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,g=6,x=3,m=2,f=1,v=new Float32Array(x*g*p),_=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let C=0;C<p;C++){let w=C%3*2/3-1,D=C>2?0:-1,E=[w,D,0,w+2/3,D,0,w+2/3,D+1,0,w,D,0,w+2/3,D+1,0,w,D+1,0];v.set(E,x*g*C),_.set(u,m*g*C);let S=[C,C,C,C,C,C];y.set(S,f*g*C)}let T=new Fn;T.setAttribute("position",new rn(v,x)),T.setAttribute("uv",new rn(_,m)),T.setAttribute("faceIndex",new rn(y,f)),t.push(T),a>$o&&a--}return{lodPlanes:t,sizeLods:n,sigmas:i}}function n1(e,t,n){let i=new yi(e,t,n);return i.texture.mapping=Wc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Fd(e,t,n,i,a){e.viewport.set(t,n,i,a),e.scissor.set(t,n,i,a)}function H2(e,t,n){let i=new Float32Array(Er),a=new L(0,1,0);return new Hn({name:"SphericalGaussianBlur",defines:{n:Er,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:gv(),fragmentShader:`

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
		`,blending:zi,depthTest:!1,depthWrite:!1})}function i1(){return new Hn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:gv(),fragmentShader:`

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
		`,blending:zi,depthTest:!1,depthWrite:!1})}function a1(){return new Hn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:gv(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zi,depthTest:!1,depthWrite:!1})}function gv(){return`

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
	`}function V2(e){let t=new WeakMap,n=null;function i(o){if(o&&o.isTexture){let l=o.mapping,c=l===ed||l===nd,h=l===_r||l===yr;if(c||h){let d=t.get(o),u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return n===null&&(n=new Vd(e)),d=c?n.fromEquirectangular(o,d):n.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{let p=o.image;return c&&p&&p.height>0||h&&p&&a(p)?(n===null&&(n=new Vd(e)),d=c?n.fromEquirectangular(o):n.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function a(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){let l=o.target;l.removeEventListener("dispose",s);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function r(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:r}}function G2(e){let t={};function n(i){if(t[i]!==void 0)return t[i];let a;switch(i){case"WEBGL_depth_texture":a=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=e.getExtension(i)}return t[i]=a,a}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let a=n(i);return a===null&&Go("THREE.WebGLRenderer: "+i+" extension not supported."),a}}}function k2(e,t,n,i){let a={},s=new WeakMap;function r(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",r),delete a[u.id];let p=s.get(u);p&&(t.remove(p),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(d,u){return a[u.id]===!0||(u.addEventListener("dispose",r),a[u.id]=!0,n.memory.geometries++),u}function l(d){let u=d.attributes;for(let p in u)t.update(u[p],e.ARRAY_BUFFER)}function c(d){let u=[],p=d.index,g=d.attributes.position,x=0;if(p!==null){let v=p.array;x=p.version;for(let _=0,y=v.length;_<y;_+=3){let T=v[_+0],C=v[_+1],w=v[_+2];u.push(T,C,C,w,w,T)}}else if(g!==void 0){let v=g.array;x=g.version;for(let _=0,y=v.length/3-1;_<y;_+=3){let T=_+0,C=_+1,w=_+2;u.push(T,C,C,w,w,T)}}else return;let m=new(K0(u)?Dc:Rc)(u,1);m.version=x;let f=s.get(d);f&&t.remove(f),s.set(d,m)}function h(d){let u=s.get(d);if(u){let p=d.index;p!==null&&u.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function X2(e,t,n){let i;function a(u){i=u}let s,r;function o(u){s=u.type,r=u.bytesPerElement}function l(u,p){e.drawElements(i,p,s,u*r),n.update(p,i,1)}function c(u,p,g){g!==0&&(e.drawElementsInstanced(i,p,s,u*r,g),n.update(p,i,g))}function h(u,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,u,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];n.update(m,i,1)}function d(u,p,g,x){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<u.length;f++)c(u[f]/r,p[f],x[f]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,u,0,x,0,g);let f=0;for(let v=0;v<g;v++)f+=p[v]*x[v];n.update(f,i,1)}}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function W2(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=o*(s/3);break;case e.LINES:n.lines+=o*(s/2);break;case e.LINE_STRIP:n.lines+=o*(s-1);break;case e.LINE_LOOP:n.lines+=o*s;break;case e.POINTS:n.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:a,update:i}}function q2(e,t,n){let i=new WeakMap,a=new Ie;function s(r,o,l){let c=r.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=i.get(o);if(u===void 0||u.count!==d){let E=function(){w.dispose(),i.delete(o),o.removeEventListener("dispose",E)};u!==void 0&&u.texture.dispose();let p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],_=0;p===!0&&(_=1),g===!0&&(_=2),x===!0&&(_=3);let y=o.attributes.position.count*_,T=1;y>t.maxTextureSize&&(T=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let C=new Float32Array(y*T*4*d),w=new Tc(C,y,T,d);w.type=ca,w.needsUpdate=!0;let D=_*4;for(let S=0;S<d;S++){let U=m[S],B=f[S],H=v[S],k=y*T*4*S;for(let J=0;J<U.count;J++){let W=J*D;p===!0&&(a.fromBufferAttribute(U,J),C[k+W+0]=a.x,C[k+W+1]=a.y,C[k+W+2]=a.z,C[k+W+3]=0),g===!0&&(a.fromBufferAttribute(B,J),C[k+W+4]=a.x,C[k+W+5]=a.y,C[k+W+6]=a.z,C[k+W+7]=0),x===!0&&(a.fromBufferAttribute(H,J),C[k+W+8]=a.x,C[k+W+9]=a.y,C[k+W+10]=a.z,C[k+W+11]=H.itemSize===4?a.w:1)}}u={count:d,texture:w,size:new It(y,T)},i.set(o,u),o.addEventListener("dispose",E)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",r.morphTexture,n);else{let p=0;for(let x=0;x<c.length;x++)p+=c[x];let g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(e,"morphTargetBaseInfluence",g),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",u.size)}return{update:s}}function Y2(e,t,n,i){let a=new WeakMap;function s(l){let c=i.render.frame,h=l.geometry,d=t.get(l,h);if(a.get(d)!==c&&(t.update(d),a.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),a.get(l)!==c&&(n.update(l.instanceMatrix,e.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,e.ARRAY_BUFFER),a.set(l,c))),l.isSkinnedMesh){let u=l.skeleton;a.get(u)!==c&&(u.update(),a.set(u,c))}return d}function r(){a=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:r}}var b1=new ni,s1=new Ic(1,1),E1=new Tc,T1=new Sf,A1=new Nc,r1=[],o1=[],l1=new Float32Array(16),c1=new Float32Array(9),u1=new Float32Array(4);function el(e,t,n){let i=e[0];if(i<=0||i>0)return e;let a=t*n,s=r1[a];if(s===void 0&&(s=new Float32Array(a),r1[a]=s),t!==0){i.toArray(s,0);for(let r=1,o=0;r!==t;++r)o+=n,e[r].toArray(s,o)}return s}function Ke(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Qe(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function kd(e,t){let n=o1[t];n===void 0&&(n=new Int32Array(t),o1[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function Z2(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function J2(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ke(n,t))return;e.uniform2fv(this.addr,t),Qe(n,t)}}function K2(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Ke(n,t))return;e.uniform3fv(this.addr,t),Qe(n,t)}}function Q2(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ke(n,t))return;e.uniform4fv(this.addr,t),Qe(n,t)}}function j2(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Ke(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Qe(n,t)}else{if(Ke(n,i))return;u1.set(i),e.uniformMatrix2fv(this.addr,!1,u1),Qe(n,i)}}function $2(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Ke(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Qe(n,t)}else{if(Ke(n,i))return;c1.set(i),e.uniformMatrix3fv(this.addr,!1,c1),Qe(n,i)}}function t3(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Ke(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Qe(n,t)}else{if(Ke(n,i))return;l1.set(i),e.uniformMatrix4fv(this.addr,!1,l1),Qe(n,i)}}function e3(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function n3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ke(n,t))return;e.uniform2iv(this.addr,t),Qe(n,t)}}function i3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ke(n,t))return;e.uniform3iv(this.addr,t),Qe(n,t)}}function a3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ke(n,t))return;e.uniform4iv(this.addr,t),Qe(n,t)}}function s3(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function r3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ke(n,t))return;e.uniform2uiv(this.addr,t),Qe(n,t)}}function o3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ke(n,t))return;e.uniform3uiv(this.addr,t),Qe(n,t)}}function l3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ke(n,t))return;e.uniform4uiv(this.addr,t),Qe(n,t)}}function c3(e,t,n){let i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a);let s;this.type===e.SAMPLER_2D_SHADOW?(s1.compareFunction=Z0,s=s1):s=b1,n.setTexture2D(t||s,a)}function u3(e,t,n){let i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTexture3D(t||T1,a)}function h3(e,t,n){let i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTextureCube(t||A1,a)}function f3(e,t,n){let i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTexture2DArray(t||E1,a)}function d3(e){switch(e){case 5126:return Z2;case 35664:return J2;case 35665:return K2;case 35666:return Q2;case 35674:return j2;case 35675:return $2;case 35676:return t3;case 5124:case 35670:return e3;case 35667:case 35671:return n3;case 35668:case 35672:return i3;case 35669:case 35673:return a3;case 5125:return s3;case 36294:return r3;case 36295:return o3;case 36296:return l3;case 35678:case 36198:case 36298:case 36306:case 35682:return c3;case 35679:case 36299:case 36307:return u3;case 35680:case 36300:case 36308:case 36293:return h3;case 36289:case 36303:case 36311:case 36292:return f3}}function p3(e,t){e.uniform1fv(this.addr,t)}function m3(e,t){let n=el(t,this.size,2);e.uniform2fv(this.addr,n)}function g3(e,t){let n=el(t,this.size,3);e.uniform3fv(this.addr,n)}function v3(e,t){let n=el(t,this.size,4);e.uniform4fv(this.addr,n)}function _3(e,t){let n=el(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function y3(e,t){let n=el(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function x3(e,t){let n=el(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function S3(e,t){e.uniform1iv(this.addr,t)}function M3(e,t){e.uniform2iv(this.addr,t)}function b3(e,t){e.uniform3iv(this.addr,t)}function E3(e,t){e.uniform4iv(this.addr,t)}function T3(e,t){e.uniform1uiv(this.addr,t)}function A3(e,t){e.uniform2uiv(this.addr,t)}function w3(e,t){e.uniform3uiv(this.addr,t)}function C3(e,t){e.uniform4uiv(this.addr,t)}function R3(e,t,n){let i=this.cache,a=t.length,s=kd(n,a);Ke(i,s)||(e.uniform1iv(this.addr,s),Qe(i,s));for(let r=0;r!==a;++r)n.setTexture2D(t[r]||b1,s[r])}function D3(e,t,n){let i=this.cache,a=t.length,s=kd(n,a);Ke(i,s)||(e.uniform1iv(this.addr,s),Qe(i,s));for(let r=0;r!==a;++r)n.setTexture3D(t[r]||T1,s[r])}function U3(e,t,n){let i=this.cache,a=t.length,s=kd(n,a);Ke(i,s)||(e.uniform1iv(this.addr,s),Qe(i,s));for(let r=0;r!==a;++r)n.setTextureCube(t[r]||A1,s[r])}function N3(e,t,n){let i=this.cache,a=t.length,s=kd(n,a);Ke(i,s)||(e.uniform1iv(this.addr,s),Qe(i,s));for(let r=0;r!==a;++r)n.setTexture2DArray(t[r]||E1,s[r])}function L3(e){switch(e){case 5126:return p3;case 35664:return m3;case 35665:return g3;case 35666:return v3;case 35674:return _3;case 35675:return y3;case 35676:return x3;case 5124:case 35670:return S3;case 35667:case 35671:return M3;case 35668:case 35672:return b3;case 35669:case 35673:return E3;case 5125:return T3;case 36294:return A3;case 36295:return w3;case 36296:return C3;case 35678:case 36198:case 36298:case 36306:case 35682:return R3;case 35679:case 36299:case 36307:return D3;case 35680:case 36300:case 36308:case 36293:return U3;case 36289:case 36303:case 36311:case 36292:return N3}}var lv=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=d3(n.type)}},cv=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=L3(n.type)}},uv=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){let a=this.seq;for(let s=0,r=a.length;s!==r;++s){let o=a[s];o.setValue(t,n[o.id],i)}}},ov=/(\w+)(\])?(\[|\.)?/g;function h1(e,t){e.seq.push(t),e.map[t.id]=t}function O3(e,t,n){let i=e.name,a=i.length;for(ov.lastIndex=0;;){let s=ov.exec(i),r=ov.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===a){h1(n,c===void 0?new lv(o,e,t):new cv(o,e,t));break}else{let d=n.map[o];d===void 0&&(d=new uv(o),h1(n,d)),n=d}}}var tl=class{constructor(t,n){this.seq=[],this.map={};let i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let s=t.getActiveUniform(n,a),r=t.getUniformLocation(n,s.name);O3(s,r,this)}}setValue(t,n,i,a){let s=this.map[n];s!==void 0&&s.setValue(t,i,a)}setOptional(t,n,i){let a=n[i];a!==void 0&&this.setValue(t,i,a)}static upload(t,n,i,a){for(let s=0,r=n.length;s!==r;++s){let o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,a)}}static seqWithValue(t,n){let i=[];for(let a=0,s=t.length;a!==s;++a){let r=t[a];r.id in n&&i.push(r)}return i}};function f1(e,t,n){let i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}var I3=37297,P3=0;function B3(e,t){let n=e.split(`
`),i=[],a=Math.max(t-6,0),s=Math.min(t+6,n.length);for(let r=a;r<s;r++){let o=r+1;i.push(`${o===t?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}var d1=new Wt;function z3(e){oe._getMatrix(d1,oe.workingColorSpace,e);let t=`mat3( ${d1.elements.map(n=>n.toFixed(4))} )`;switch(oe.getTransfer(e)){case Mc:return[t,"LinearTransferOETF"];case Me:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function p1(e,t,n){let i=e.getShaderParameter(t,e.COMPILE_STATUS),s=(e.getShaderInfoLog(t)||"").trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return n.toUpperCase()+`

`+s+`

`+B3(e.getShaderSource(t),o)}else return s}function F3(e,t){let n=z3(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function H3(e,t){let n;switch(t){case Rb:n="Linear";break;case Db:n="Reinhard";break;case Ub:n="Cineon";break;case Nb:n="ACESFilmic";break;case Ob:n="AgX";break;case Ib:n="Neutral";break;case Lb:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}var Hd=new L;function V3(){oe.getLuminanceCoefficients(Hd);let e=Hd.x.toFixed(4),t=Hd.y.toFixed(4),n=Hd.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function G3(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(jc).join(`
`)}function k3(e){let t=[];for(let n in e){let i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function X3(e,t){let n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){let s=e.getActiveAttrib(t,a),r=s.name,o=1;s.type===e.FLOAT_MAT2&&(o=2),s.type===e.FLOAT_MAT3&&(o=3),s.type===e.FLOAT_MAT4&&(o=4),n[r]={type:s.type,location:e.getAttribLocation(t,r),locationSize:o}}return n}function jc(e){return e!==""}function m1(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function g1(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var W3=/^[ \t]*#include +<([\w\d./]+)>/gm;function hv(e){return e.replace(W3,Y3)}var q3=new Map;function Y3(e,t){let n=qt[t];if(n===void 0){let i=q3.get(t);if(i!==void 0)n=qt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return hv(n)}var Z3=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function v1(e){return e.replace(Z3,J3)}function J3(e,t,n,i){let a="";for(let s=parseInt(t);s<parseInt(n);s++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return a}function _1(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}function K3(e){let t="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===I0?t="SHADOWMAP_TYPE_PCF":e.shadowMapType===hb?t="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===oa&&(t="SHADOWMAP_TYPE_VSM"),t}function Q3(e){let t="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case _r:case yr:t="ENVMAP_TYPE_CUBE";break;case Wc:t="ENVMAP_TYPE_CUBE_UV";break}return t}function j3(e){let t="ENVMAP_MODE_REFLECTION";return e.envMap&&e.envMapMode===yr&&(t="ENVMAP_MODE_REFRACTION"),t}function $3(e){let t="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case z0:t="ENVMAP_BLENDING_MULTIPLY";break;case wb:t="ENVMAP_BLENDING_MIX";break;case Cb:t="ENVMAP_BLENDING_ADD";break}return t}function tD(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function eD(e,t,n,i){let a=e.getContext(),s=n.defines,r=n.vertexShader,o=n.fragmentShader,l=K3(n),c=Q3(n),h=j3(n),d=$3(n),u=tD(n),p=G3(n),g=k3(s),x=a.createProgram(),m,f,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(jc).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(jc).join(`
`),f.length>0&&(f+=`
`)):(m=[_1(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(jc).join(`
`),f=[_1(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+h:"",n.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==za?"#define TONE_MAPPING":"",n.toneMapping!==za?qt.tonemapping_pars_fragment:"",n.toneMapping!==za?H3("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,F3("linearToOutputTexel",n.outputColorSpace),V3(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(jc).join(`
`)),r=hv(r),r=m1(r,n),r=g1(r,n),o=hv(o),o=m1(o,n),o=g1(o,n),r=v1(r),o=v1(o),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",n.glslVersion===J0?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===J0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let _=v+m+r,y=v+f+o,T=f1(a,a.VERTEX_SHADER,_),C=f1(a,a.FRAGMENT_SHADER,y);a.attachShader(x,T),a.attachShader(x,C),n.index0AttributeName!==void 0?a.bindAttribLocation(x,0,n.index0AttributeName):n.morphTargets===!0&&a.bindAttribLocation(x,0,"position"),a.linkProgram(x);function w(U){if(e.debug.checkShaderErrors){let B=a.getProgramInfoLog(x)||"",H=a.getShaderInfoLog(T)||"",k=a.getShaderInfoLog(C)||"",J=B.trim(),W=H.trim(),at=k.trim(),V=!0,ut=!0;if(a.getProgramParameter(x,a.LINK_STATUS)===!1)if(V=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(a,x,T,C);else{let pt=p1(a,T,"vertex"),Rt=p1(a,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(x,a.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+J+`
`+pt+`
`+Rt)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(W===""||at==="")&&(ut=!1);ut&&(U.diagnostics={runnable:V,programLog:J,vertexShader:{log:W,prefix:m},fragmentShader:{log:at,prefix:f}})}a.deleteShader(T),a.deleteShader(C),D=new tl(a,x),E=X3(a,x)}let D;this.getUniforms=function(){return D===void 0&&w(this),D};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let S=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=a.getProgramParameter(x,I3)),S},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(x),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=P3++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=C,this}var nD=0,fv=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let n=t.vertexShader,i=t.fragmentShader,a=this._getShaderStage(n),s=this._getShaderStage(i),r=this._getShaderCacheForMaterial(t);return r.has(a)===!1&&(r.add(a),a.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(t){let n=this.materialCache.get(t);for(let i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let n=this.materialCache,i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){let n=this.shaderCache,i=n.get(t);return i===void 0&&(i=new dv(t),n.set(t,i)),i}},dv=class{constructor(t){this.id=nD++,this.code=t,this.usedTimes=0}};function iD(e,t,n,i,a,s,r){let o=new wc,l=new fv,c=new Set,h=[],d=a.logarithmicDepthBuffer,u=a.vertexTextures,p=a.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(E){return c.add(E),E===0?"uv":`uv${E}`}function m(E,S,U,B,H){let k=B.fog,J=H.geometry,W=E.isMeshStandardMaterial?B.environment:null,at=(E.isMeshStandardMaterial?n:t).get(E.envMap||W),V=at&&at.mapping===Wc?at.image.height:null,ut=g[E.type];E.precision!==null&&(p=a.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));let pt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Rt=pt!==void 0?pt.length:0,Yt=0;J.morphAttributes.position!==void 0&&(Yt=1),J.morphAttributes.normal!==void 0&&(Yt=2),J.morphAttributes.color!==void 0&&(Yt=3);let pe,le,se,X;if(ut){let ie=ua[ut];pe=ie.vertexShader,le=ie.fragmentShader}else pe=E.vertexShader,le=E.fragmentShader,l.update(E),se=l.getVertexShaderID(E),X=l.getFragmentShaderID(E);let Q=e.getRenderTarget(),lt=e.state.buffers.depth.getReversed(),Bt=H.isInstancedMesh===!0,Ct=H.isBatchedMesh===!0,Mt=!!E.map,qe=!!E.matcap,R=!!at,Qt=!!E.aoMap,Dt=!!E.lightMap,wt=!!E.bumpMap,yt=!!E.normalMap,ve=!!E.displacementMap,bt=!!E.emissiveMap,Vt=!!E.metalnessMap,_e=!!E.roughnessMap,Ae=E.anisotropy>0,A=E.clearcoat>0,M=E.dispersion>0,P=E.iridescence>0,q=E.sheen>0,$=E.transmission>0,G=Ae&&!!E.anisotropyMap,xt=A&&!!E.clearcoatMap,st=A&&!!E.clearcoatNormalMap,Tt=A&&!!E.clearcoatRoughnessMap,At=P&&!!E.iridescenceMap,et=P&&!!E.iridescenceThicknessMap,dt=q&&!!E.sheenColorMap,Lt=q&&!!E.sheenRoughnessMap,vt=!!E.specularMap,ht=!!E.specularColorMap,kt=!!E.specularIntensityMap,N=$&&!!E.transmissionMap,it=$&&!!E.thicknessMap,rt=!!E.gradientMap,_t=!!E.alphaMap,tt=E.alphaTest>0,K=!!E.alphaHash,Et=!!E.extensions,Ht=za;E.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Ht=e.toneMapping);let me={shaderID:ut,shaderType:E.type,shaderName:E.name,vertexShader:pe,fragmentShader:le,defines:E.defines,customVertexShaderID:se,customFragmentShaderID:X,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:Ct,batchingColor:Ct&&H._colorsTexture!==null,instancing:Bt,instancingColor:Bt&&H.instanceColor!==null,instancingMorph:Bt&&H.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:Q===null?e.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:sa,alphaToCoverage:!!E.alphaToCoverage,map:Mt,matcap:qe,envMap:R,envMapMode:R&&at.mapping,envMapCubeUVHeight:V,aoMap:Qt,lightMap:Dt,bumpMap:wt,normalMap:yt,displacementMap:u&&ve,emissiveMap:bt,normalMapObjectSpace:yt&&E.normalMapType===Hb,normalMapTangentSpace:yt&&E.normalMapType===Fb,metalnessMap:Vt,roughnessMap:_e,anisotropy:Ae,anisotropyMap:G,clearcoat:A,clearcoatMap:xt,clearcoatNormalMap:st,clearcoatRoughnessMap:Tt,dispersion:M,iridescence:P,iridescenceMap:At,iridescenceThicknessMap:et,sheen:q,sheenColorMap:dt,sheenRoughnessMap:Lt,specularMap:vt,specularColorMap:ht,specularIntensityMap:kt,transmission:$,transmissionMap:N,thicknessMap:it,gradientMap:rt,opaque:E.transparent===!1&&E.blending===Ia&&E.alphaToCoverage===!1,alphaMap:_t,alphaTest:tt,alphaHash:K,combine:E.combine,mapUv:Mt&&x(E.map.channel),aoMapUv:Qt&&x(E.aoMap.channel),lightMapUv:Dt&&x(E.lightMap.channel),bumpMapUv:wt&&x(E.bumpMap.channel),normalMapUv:yt&&x(E.normalMap.channel),displacementMapUv:ve&&x(E.displacementMap.channel),emissiveMapUv:bt&&x(E.emissiveMap.channel),metalnessMapUv:Vt&&x(E.metalnessMap.channel),roughnessMapUv:_e&&x(E.roughnessMap.channel),anisotropyMapUv:G&&x(E.anisotropyMap.channel),clearcoatMapUv:xt&&x(E.clearcoatMap.channel),clearcoatNormalMapUv:st&&x(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Tt&&x(E.clearcoatRoughnessMap.channel),iridescenceMapUv:At&&x(E.iridescenceMap.channel),iridescenceThicknessMapUv:et&&x(E.iridescenceThicknessMap.channel),sheenColorMapUv:dt&&x(E.sheenColorMap.channel),sheenRoughnessMapUv:Lt&&x(E.sheenRoughnessMap.channel),specularMapUv:vt&&x(E.specularMap.channel),specularColorMapUv:ht&&x(E.specularColorMap.channel),specularIntensityMapUv:kt&&x(E.specularIntensityMap.channel),transmissionMapUv:N&&x(E.transmissionMap.channel),thicknessMapUv:it&&x(E.thicknessMap.channel),alphaMapUv:_t&&x(E.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(yt||Ae),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!J.attributes.uv&&(Mt||_t),fog:!!k,useFog:E.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:lt,skinning:H.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:Rt,morphTextureStride:Yt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:E.dithering,shadowMapEnabled:e.shadowMap.enabled&&U.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ht,decodeVideoTexture:Mt&&E.map.isVideoTexture===!0&&oe.getTransfer(E.map.colorSpace)===Me,decodeVideoTextureEmissive:bt&&E.emissiveMap.isVideoTexture===!0&&oe.getTransfer(E.emissiveMap.colorSpace)===Me,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===la,flipSided:E.side===Rn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Et&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Et&&E.extensions.multiDraw===!0||Ct)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return me.vertexUv1s=c.has(1),me.vertexUv2s=c.has(2),me.vertexUv3s=c.has(3),c.clear(),me}function f(E){let S=[];if(E.shaderID?S.push(E.shaderID):(S.push(E.customVertexShaderID),S.push(E.customFragmentShaderID)),E.defines!==void 0)for(let U in E.defines)S.push(U),S.push(E.defines[U]);return E.isRawShaderMaterial===!1&&(v(S,E),_(S,E),S.push(e.outputColorSpace)),S.push(E.customProgramCacheKey),S.join()}function v(E,S){E.push(S.precision),E.push(S.outputColorSpace),E.push(S.envMapMode),E.push(S.envMapCubeUVHeight),E.push(S.mapUv),E.push(S.alphaMapUv),E.push(S.lightMapUv),E.push(S.aoMapUv),E.push(S.bumpMapUv),E.push(S.normalMapUv),E.push(S.displacementMapUv),E.push(S.emissiveMapUv),E.push(S.metalnessMapUv),E.push(S.roughnessMapUv),E.push(S.anisotropyMapUv),E.push(S.clearcoatMapUv),E.push(S.clearcoatNormalMapUv),E.push(S.clearcoatRoughnessMapUv),E.push(S.iridescenceMapUv),E.push(S.iridescenceThicknessMapUv),E.push(S.sheenColorMapUv),E.push(S.sheenRoughnessMapUv),E.push(S.specularMapUv),E.push(S.specularColorMapUv),E.push(S.specularIntensityMapUv),E.push(S.transmissionMapUv),E.push(S.thicknessMapUv),E.push(S.combine),E.push(S.fogExp2),E.push(S.sizeAttenuation),E.push(S.morphTargetsCount),E.push(S.morphAttributeCount),E.push(S.numDirLights),E.push(S.numPointLights),E.push(S.numSpotLights),E.push(S.numSpotLightMaps),E.push(S.numHemiLights),E.push(S.numRectAreaLights),E.push(S.numDirLightShadows),E.push(S.numPointLightShadows),E.push(S.numSpotLightShadows),E.push(S.numSpotLightShadowsWithMaps),E.push(S.numLightProbes),E.push(S.shadowMapType),E.push(S.toneMapping),E.push(S.numClippingPlanes),E.push(S.numClipIntersection),E.push(S.depthPacking)}function _(E,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),S.gradientMap&&o.enable(22),E.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),E.push(o.mask)}function y(E){let S=g[E.type],U;if(S){let B=ua[S];U=Qb.clone(B.uniforms)}else U=E.uniforms;return U}function T(E,S){let U;for(let B=0,H=h.length;B<H;B++){let k=h[B];if(k.cacheKey===S){U=k,++U.usedTimes;break}}return U===void 0&&(U=new eD(e,S,E,s),h.push(U)),U}function C(E){if(--E.usedTimes===0){let S=h.indexOf(E);h[S]=h[h.length-1],h.pop(),E.destroy()}}function w(E){l.remove(E)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:y,acquireProgram:T,releaseProgram:C,releaseShaderCache:w,programs:h,dispose:D}}function aD(){let e=new WeakMap;function t(r){return e.has(r)}function n(r){let o=e.get(r);return o===void 0&&(o={},e.set(r,o)),o}function i(r){e.delete(r)}function a(r,o,l){e.get(r)[o]=l}function s(){e=new WeakMap}return{has:t,get:n,remove:i,update:a,dispose:s}}function sD(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.z!==t.z?e.z-t.z:e.id-t.id}function y1(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function x1(){let e=[],t=0,n=[],i=[],a=[];function s(){t=0,n.length=0,i.length=0,a.length=0}function r(d,u,p,g,x,m){let f=e[t];return f===void 0?(f={id:d.id,object:d,geometry:u,material:p,groupOrder:g,renderOrder:d.renderOrder,z:x,group:m},e[t]=f):(f.id=d.id,f.object=d,f.geometry=u,f.material=p,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=x,f.group=m),t++,f}function o(d,u,p,g,x,m){let f=r(d,u,p,g,x,m);p.transmission>0?i.push(f):p.transparent===!0?a.push(f):n.push(f)}function l(d,u,p,g,x,m){let f=r(d,u,p,g,x,m);p.transmission>0?i.unshift(f):p.transparent===!0?a.unshift(f):n.unshift(f)}function c(d,u){n.length>1&&n.sort(d||sD),i.length>1&&i.sort(u||y1),a.length>1&&a.sort(u||y1)}function h(){for(let d=t,u=e.length;d<u;d++){let p=e[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:a,init:s,push:o,unshift:l,finish:h,sort:c}}function rD(){let e=new WeakMap;function t(i,a){let s=e.get(i),r;return s===void 0?(r=new x1,e.set(i,[r])):a>=s.length?(r=new x1,s.push(r)):r=s[a],r}function n(){e=new WeakMap}return{get:t,dispose:n}}function oD(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new L,color:new ae};break;case"SpotLight":n={position:new L,direction:new L,color:new ae,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new L,color:new ae,distance:0,decay:0};break;case"HemisphereLight":n={direction:new L,skyColor:new ae,groundColor:new ae};break;case"RectAreaLight":n={color:new ae,position:new L,halfWidth:new L,halfHeight:new L};break}return e[t.id]=n,n}}}function lD(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var cD=0;function uD(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function hD(e){let t=new oD,n=lD(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);let a=new L,s=new He,r=new He;function o(c){let h=0,d=0,u=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let p=0,g=0,x=0,m=0,f=0,v=0,_=0,y=0,T=0,C=0,w=0;c.sort(uD);for(let E=0,S=c.length;E<S;E++){let U=c[E],B=U.color,H=U.intensity,k=U.distance,J=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)h+=B.r*H,d+=B.g*H,u+=B.b*H;else if(U.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(U.sh.coefficients[W],H);w++}else if(U.isDirectionalLight){let W=t.get(U);if(W.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let at=U.shadow,V=n.get(U);V.shadowIntensity=at.intensity,V.shadowBias=at.bias,V.shadowNormalBias=at.normalBias,V.shadowRadius=at.radius,V.shadowMapSize=at.mapSize,i.directionalShadow[p]=V,i.directionalShadowMap[p]=J,i.directionalShadowMatrix[p]=U.shadow.matrix,v++}i.directional[p]=W,p++}else if(U.isSpotLight){let W=t.get(U);W.position.setFromMatrixPosition(U.matrixWorld),W.color.copy(B).multiplyScalar(H),W.distance=k,W.coneCos=Math.cos(U.angle),W.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),W.decay=U.decay,i.spot[x]=W;let at=U.shadow;if(U.map&&(i.spotLightMap[T]=U.map,T++,at.updateMatrices(U),U.castShadow&&C++),i.spotLightMatrix[x]=at.matrix,U.castShadow){let V=n.get(U);V.shadowIntensity=at.intensity,V.shadowBias=at.bias,V.shadowNormalBias=at.normalBias,V.shadowRadius=at.radius,V.shadowMapSize=at.mapSize,i.spotShadow[x]=V,i.spotShadowMap[x]=J,y++}x++}else if(U.isRectAreaLight){let W=t.get(U);W.color.copy(B).multiplyScalar(H),W.halfWidth.set(U.width*.5,0,0),W.halfHeight.set(0,U.height*.5,0),i.rectArea[m]=W,m++}else if(U.isPointLight){let W=t.get(U);if(W.color.copy(U.color).multiplyScalar(U.intensity),W.distance=U.distance,W.decay=U.decay,U.castShadow){let at=U.shadow,V=n.get(U);V.shadowIntensity=at.intensity,V.shadowBias=at.bias,V.shadowNormalBias=at.normalBias,V.shadowRadius=at.radius,V.shadowMapSize=at.mapSize,V.shadowCameraNear=at.camera.near,V.shadowCameraFar=at.camera.far,i.pointShadow[g]=V,i.pointShadowMap[g]=J,i.pointShadowMatrix[g]=U.shadow.matrix,_++}i.point[g]=W,g++}else if(U.isHemisphereLight){let W=t.get(U);W.skyColor.copy(U.color).multiplyScalar(H),W.groundColor.copy(U.groundColor).multiplyScalar(H),i.hemi[f]=W,f++}}m>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ft.LTC_FLOAT_1,i.rectAreaLTC2=ft.LTC_FLOAT_2):(i.rectAreaLTC1=ft.LTC_HALF_1,i.rectAreaLTC2=ft.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;let D=i.hash;(D.directionalLength!==p||D.pointLength!==g||D.spotLength!==x||D.rectAreaLength!==m||D.hemiLength!==f||D.numDirectionalShadows!==v||D.numPointShadows!==_||D.numSpotShadows!==y||D.numSpotMaps!==T||D.numLightProbes!==w)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=y+T-C,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=w,D.directionalLength=p,D.pointLength=g,D.spotLength=x,D.rectAreaLength=m,D.hemiLength=f,D.numDirectionalShadows=v,D.numPointShadows=_,D.numSpotShadows=y,D.numSpotMaps=T,D.numLightProbes=w,i.version=cD++)}function l(c,h){let d=0,u=0,p=0,g=0,x=0,m=h.matrixWorldInverse;for(let f=0,v=c.length;f<v;f++){let _=c[f];if(_.isDirectionalLight){let y=i.directional[d];y.direction.setFromMatrixPosition(_.matrixWorld),a.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(a),y.direction.transformDirection(m),d++}else if(_.isSpotLight){let y=i.spot[p];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(_.matrixWorld),a.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(a),y.direction.transformDirection(m),p++}else if(_.isRectAreaLight){let y=i.rectArea[g];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),r.identity(),s.copy(_.matrixWorld),s.premultiply(m),r.extractRotation(s),y.halfWidth.set(_.width*.5,0,0),y.halfHeight.set(0,_.height*.5,0),y.halfWidth.applyMatrix4(r),y.halfHeight.applyMatrix4(r),g++}else if(_.isPointLight){let y=i.point[u];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),u++}else if(_.isHemisphereLight){let y=i.hemi[x];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(m),x++}}}return{setup:o,setupView:l,state:i}}function S1(e){let t=new hD(e),n=[],i=[];function a(h){c.camera=h,n.length=0,i.length=0}function s(h){n.push(h)}function r(h){i.push(h)}function o(){t.setup(n)}function l(h){t.setupView(n,h)}let c={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:a,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:r}}function fD(e){let t=new WeakMap;function n(a,s=0){let r=t.get(a),o;return r===void 0?(o=new S1(e),t.set(a,[o])):s>=r.length?(o=new S1(e),r.push(o)):o=r[s],o}function i(){t=new WeakMap}return{get:n,dispose:i}}var dD=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pD=`uniform sampler2D shadow_pass;
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
}`;function mD(e,t,n){let i=new Lc,a=new It,s=new It,r=new Ie,o=new If({depthPacking:zb}),l=new Pf,c={},h=n.maxTextureSize,d={[Oa]:Rn,[Rn]:Oa,[la]:la},u=new Hn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new It},radius:{value:4}},vertexShader:dD,fragmentShader:pD}),p=u.clone();p.defines.HORIZONTAL_PASS=1;let g=new Fn;g.setAttribute("position",new rn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new gn(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=I0;let f=this.type;this.render=function(C,w,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;let E=e.getRenderTarget(),S=e.getActiveCubeFace(),U=e.getActiveMipmapLevel(),B=e.state;B.setBlending(zi),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let H=f!==oa&&this.type===oa,k=f===oa&&this.type!==oa;for(let J=0,W=C.length;J<W;J++){let at=C[J],V=at.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",at,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;a.copy(V.mapSize);let ut=V.getFrameExtents();if(a.multiply(ut),s.copy(V.mapSize),(a.x>h||a.y>h)&&(a.x>h&&(s.x=Math.floor(h/ut.x),a.x=s.x*ut.x,V.mapSize.x=s.x),a.y>h&&(s.y=Math.floor(h/ut.y),a.y=s.y*ut.y,V.mapSize.y=s.y)),V.map===null||H===!0||k===!0){let Rt=this.type!==oa?{minFilter:_i,magFilter:_i}:{};V.map!==null&&V.map.dispose(),V.map=new yi(a.x,a.y,Rt),V.map.texture.name=at.name+".shadowMap",V.camera.updateProjectionMatrix()}e.setRenderTarget(V.map),e.clear();let pt=V.getViewportCount();for(let Rt=0;Rt<pt;Rt++){let Yt=V.getViewport(Rt);r.set(s.x*Yt.x,s.y*Yt.y,s.x*Yt.z,s.y*Yt.w),B.viewport(r),V.updateMatrices(at,Rt),i=V.getFrustum(),y(w,D,V.camera,at,this.type)}V.isPointLightShadow!==!0&&this.type===oa&&v(V,D),V.needsUpdate=!1}f=this.type,m.needsUpdate=!1,e.setRenderTarget(E,S,U)};function v(C,w){let D=t.update(x);u.defines.VSM_SAMPLES!==C.blurSamples&&(u.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new yi(a.x,a.y)),u.uniforms.shadow_pass.value=C.map.texture,u.uniforms.resolution.value=C.mapSize,u.uniforms.radius.value=C.radius,e.setRenderTarget(C.mapPass),e.clear(),e.renderBufferDirect(w,null,D,u,x,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,e.setRenderTarget(C.map),e.clear(),e.renderBufferDirect(w,null,D,p,x,null)}function _(C,w,D,E){let S=null,U=D.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(U!==void 0)S=U;else if(S=D.isPointLight===!0?l:o,e.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){let B=S.uuid,H=w.uuid,k=c[B];k===void 0&&(k={},c[B]=k);let J=k[H];J===void 0&&(J=S.clone(),k[H]=J,w.addEventListener("dispose",T)),S=J}if(S.visible=w.visible,S.wireframe=w.wireframe,E===oa?S.side=w.shadowSide!==null?w.shadowSide:w.side:S.side=w.shadowSide!==null?w.shadowSide:d[w.side],S.alphaMap=w.alphaMap,S.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,S.map=w.map,S.clipShadows=w.clipShadows,S.clippingPlanes=w.clippingPlanes,S.clipIntersection=w.clipIntersection,S.displacementMap=w.displacementMap,S.displacementScale=w.displacementScale,S.displacementBias=w.displacementBias,S.wireframeLinewidth=w.wireframeLinewidth,S.linewidth=w.linewidth,D.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let B=e.properties.get(S);B.light=D}return S}function y(C,w,D,E,S){if(C.visible===!1)return;if(C.layers.test(w.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&S===oa)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,C.matrixWorld);let H=t.update(C),k=C.material;if(Array.isArray(k)){let J=H.groups;for(let W=0,at=J.length;W<at;W++){let V=J[W],ut=k[V.materialIndex];if(ut&&ut.visible){let pt=_(C,ut,E,S);C.onBeforeShadow(e,C,w,D,H,pt,V),e.renderBufferDirect(D,null,H,pt,C,V),C.onAfterShadow(e,C,w,D,H,pt,V)}}}else if(k.visible){let J=_(C,k,E,S);C.onBeforeShadow(e,C,w,D,H,J,null),e.renderBufferDirect(D,null,H,J,C,null),C.onAfterShadow(e,C,w,D,H,J,null)}}let B=C.children;for(let H=0,k=B.length;H<k;H++)y(B[H],w,D,E,S)}function T(C){C.target.removeEventListener("dispose",T);for(let D in c){let E=c[D],S=C.target.uuid;S in E&&(E[S].dispose(),delete E[S])}}}var gD={[Zf]:Jf,[Kf]:$f,[Qf]:td,[mr]:jf,[Jf]:Zf,[$f]:Kf,[td]:Qf,[jf]:mr};function vD(e,t){function n(){let N=!1,it=new Ie,rt=null,_t=new Ie(0,0,0,0);return{setMask:function(tt){rt!==tt&&!N&&(e.colorMask(tt,tt,tt,tt),rt=tt)},setLocked:function(tt){N=tt},setClear:function(tt,K,Et,Ht,me){me===!0&&(tt*=Ht,K*=Ht,Et*=Ht),it.set(tt,K,Et,Ht),_t.equals(it)===!1&&(e.clearColor(tt,K,Et,Ht),_t.copy(it))},reset:function(){N=!1,rt=null,_t.set(-1,0,0,0)}}}function i(){let N=!1,it=!1,rt=null,_t=null,tt=null;return{setReversed:function(K){if(it!==K){let Et=t.get("EXT_clip_control");K?Et.clipControlEXT(Et.LOWER_LEFT_EXT,Et.ZERO_TO_ONE_EXT):Et.clipControlEXT(Et.LOWER_LEFT_EXT,Et.NEGATIVE_ONE_TO_ONE_EXT),it=K;let Ht=tt;tt=null,this.setClear(Ht)}},getReversed:function(){return it},setTest:function(K){K?Q(e.DEPTH_TEST):lt(e.DEPTH_TEST)},setMask:function(K){rt!==K&&!N&&(e.depthMask(K),rt=K)},setFunc:function(K){if(it&&(K=gD[K]),_t!==K){switch(K){case Zf:e.depthFunc(e.NEVER);break;case Jf:e.depthFunc(e.ALWAYS);break;case Kf:e.depthFunc(e.LESS);break;case mr:e.depthFunc(e.LEQUAL);break;case Qf:e.depthFunc(e.EQUAL);break;case jf:e.depthFunc(e.GEQUAL);break;case $f:e.depthFunc(e.GREATER);break;case td:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}_t=K}},setLocked:function(K){N=K},setClear:function(K){tt!==K&&(it&&(K=1-K),e.clearDepth(K),tt=K)},reset:function(){N=!1,rt=null,_t=null,tt=null,it=!1}}}function a(){let N=!1,it=null,rt=null,_t=null,tt=null,K=null,Et=null,Ht=null,me=null;return{setTest:function(ie){N||(ie?Q(e.STENCIL_TEST):lt(e.STENCIL_TEST))},setMask:function(ie){it!==ie&&!N&&(e.stencilMask(ie),it=ie)},setFunc:function(ie,bi,si){(rt!==ie||_t!==bi||tt!==si)&&(e.stencilFunc(ie,bi,si),rt=ie,_t=bi,tt=si)},setOp:function(ie,bi,si){(K!==ie||Et!==bi||Ht!==si)&&(e.stencilOp(ie,bi,si),K=ie,Et=bi,Ht=si)},setLocked:function(ie){N=ie},setClear:function(ie){me!==ie&&(e.clearStencil(ie),me=ie)},reset:function(){N=!1,it=null,rt=null,_t=null,tt=null,K=null,Et=null,Ht=null,me=null}}}let s=new n,r=new i,o=new a,l=new WeakMap,c=new WeakMap,h={},d={},u=new WeakMap,p=[],g=null,x=!1,m=null,f=null,v=null,_=null,y=null,T=null,C=null,w=new ae(0,0,0),D=0,E=!1,S=null,U=null,B=null,H=null,k=null,J=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,at=0,V=e.getParameter(e.VERSION);V.indexOf("WebGL")!==-1?(at=parseFloat(/^WebGL (\d)/.exec(V)[1]),W=at>=1):V.indexOf("OpenGL ES")!==-1&&(at=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),W=at>=2);let ut=null,pt={},Rt=e.getParameter(e.SCISSOR_BOX),Yt=e.getParameter(e.VIEWPORT),pe=new Ie().fromArray(Rt),le=new Ie().fromArray(Yt);function se(N,it,rt,_t){let tt=new Uint8Array(4),K=e.createTexture();e.bindTexture(N,K),e.texParameteri(N,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(N,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let Et=0;Et<rt;Et++)N===e.TEXTURE_3D||N===e.TEXTURE_2D_ARRAY?e.texImage3D(it,0,e.RGBA,1,1,_t,0,e.RGBA,e.UNSIGNED_BYTE,tt):e.texImage2D(it+Et,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,tt);return K}let X={};X[e.TEXTURE_2D]=se(e.TEXTURE_2D,e.TEXTURE_2D,1),X[e.TEXTURE_CUBE_MAP]=se(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[e.TEXTURE_2D_ARRAY]=se(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),X[e.TEXTURE_3D]=se(e.TEXTURE_3D,e.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),Q(e.DEPTH_TEST),r.setFunc(mr),wt(!1),yt(O0),Q(e.CULL_FACE),Qt(zi);function Q(N){h[N]!==!0&&(e.enable(N),h[N]=!0)}function lt(N){h[N]!==!1&&(e.disable(N),h[N]=!1)}function Bt(N,it){return d[N]!==it?(e.bindFramebuffer(N,it),d[N]=it,N===e.DRAW_FRAMEBUFFER&&(d[e.FRAMEBUFFER]=it),N===e.FRAMEBUFFER&&(d[e.DRAW_FRAMEBUFFER]=it),!0):!1}function Ct(N,it){let rt=p,_t=!1;if(N){rt=u.get(it),rt===void 0&&(rt=[],u.set(it,rt));let tt=N.textures;if(rt.length!==tt.length||rt[0]!==e.COLOR_ATTACHMENT0){for(let K=0,Et=tt.length;K<Et;K++)rt[K]=e.COLOR_ATTACHMENT0+K;rt.length=tt.length,_t=!0}}else rt[0]!==e.BACK&&(rt[0]=e.BACK,_t=!0);_t&&e.drawBuffers(rt)}function Mt(N){return g!==N?(e.useProgram(N),g=N,!0):!1}let qe={[Ts]:e.FUNC_ADD,[fb]:e.FUNC_SUBTRACT,[db]:e.FUNC_REVERSE_SUBTRACT};qe[pb]=e.MIN,qe[mb]=e.MAX;let R={[Yf]:e.ZERO,[Fi]:e.ONE,[gb]:e.SRC_COLOR,[pf]:e.SRC_ALPHA,[Mb]:e.SRC_ALPHA_SATURATE,[xb]:e.DST_COLOR,[_b]:e.DST_ALPHA,[vb]:e.ONE_MINUS_SRC_COLOR,[pr]:e.ONE_MINUS_SRC_ALPHA,[Sb]:e.ONE_MINUS_DST_COLOR,[yb]:e.ONE_MINUS_DST_ALPHA,[bb]:e.CONSTANT_COLOR,[Eb]:e.ONE_MINUS_CONSTANT_COLOR,[Tb]:e.CONSTANT_ALPHA,[Ab]:e.ONE_MINUS_CONSTANT_ALPHA};function Qt(N,it,rt,_t,tt,K,Et,Ht,me,ie){if(N===zi){x===!0&&(lt(e.BLEND),x=!1);return}if(x===!1&&(Q(e.BLEND),x=!0),N!==Xc){if(N!==m||ie!==E){if((f!==Ts||y!==Ts)&&(e.blendEquation(e.FUNC_ADD),f=Ts,y=Ts),ie)switch(N){case Ia:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case kc:e.blendFunc(e.ONE,e.ONE);break;case P0:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case B0:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Ia:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case kc:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case P0:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case B0:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}v=null,_=null,T=null,C=null,w.set(0,0,0),D=0,m=N,E=ie}return}tt=tt||it,K=K||rt,Et=Et||_t,(it!==f||tt!==y)&&(e.blendEquationSeparate(qe[it],qe[tt]),f=it,y=tt),(rt!==v||_t!==_||K!==T||Et!==C)&&(e.blendFuncSeparate(R[rt],R[_t],R[K],R[Et]),v=rt,_=_t,T=K,C=Et),(Ht.equals(w)===!1||me!==D)&&(e.blendColor(Ht.r,Ht.g,Ht.b,me),w.copy(Ht),D=me),m=N,E=!1}function Dt(N,it){N.side===la?lt(e.CULL_FACE):Q(e.CULL_FACE);let rt=N.side===Rn;it&&(rt=!rt),wt(rt),N.blending===Ia&&N.transparent===!1?Qt(zi):Qt(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),r.setFunc(N.depthFunc),r.setTest(N.depthTest),r.setMask(N.depthWrite),s.setMask(N.colorWrite);let _t=N.stencilWrite;o.setTest(_t),_t&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),bt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?Q(e.SAMPLE_ALPHA_TO_COVERAGE):lt(e.SAMPLE_ALPHA_TO_COVERAGE)}function wt(N){S!==N&&(N?e.frontFace(e.CW):e.frontFace(e.CCW),S=N)}function yt(N){N!==cb?(Q(e.CULL_FACE),N!==U&&(N===O0?e.cullFace(e.BACK):N===ub?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):lt(e.CULL_FACE),U=N}function ve(N){N!==B&&(W&&e.lineWidth(N),B=N)}function bt(N,it,rt){N?(Q(e.POLYGON_OFFSET_FILL),(H!==it||k!==rt)&&(e.polygonOffset(it,rt),H=it,k=rt)):lt(e.POLYGON_OFFSET_FILL)}function Vt(N){N?Q(e.SCISSOR_TEST):lt(e.SCISSOR_TEST)}function _e(N){N===void 0&&(N=e.TEXTURE0+J-1),ut!==N&&(e.activeTexture(N),ut=N)}function Ae(N,it,rt){rt===void 0&&(ut===null?rt=e.TEXTURE0+J-1:rt=ut);let _t=pt[rt];_t===void 0&&(_t={type:void 0,texture:void 0},pt[rt]=_t),(_t.type!==N||_t.texture!==it)&&(ut!==rt&&(e.activeTexture(rt),ut=rt),e.bindTexture(N,it||X[N]),_t.type=N,_t.texture=it)}function A(){let N=pt[ut];N!==void 0&&N.type!==void 0&&(e.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function M(){try{e.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function P(){try{e.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function q(){try{e.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function $(){try{e.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function G(){try{e.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function xt(){try{e.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function st(){try{e.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Tt(){try{e.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function At(){try{e.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function et(){try{e.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function dt(N){pe.equals(N)===!1&&(e.scissor(N.x,N.y,N.z,N.w),pe.copy(N))}function Lt(N){le.equals(N)===!1&&(e.viewport(N.x,N.y,N.z,N.w),le.copy(N))}function vt(N,it){let rt=c.get(it);rt===void 0&&(rt=new WeakMap,c.set(it,rt));let _t=rt.get(N);_t===void 0&&(_t=e.getUniformBlockIndex(it,N.name),rt.set(N,_t))}function ht(N,it){let _t=c.get(it).get(N);l.get(it)!==_t&&(e.uniformBlockBinding(it,_t,N.__bindingPointIndex),l.set(it,_t))}function kt(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),r.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),h={},ut=null,pt={},d={},u=new WeakMap,p=[],g=null,x=!1,m=null,f=null,v=null,_=null,y=null,T=null,C=null,w=new ae(0,0,0),D=0,E=!1,S=null,U=null,B=null,H=null,k=null,pe.set(0,0,e.canvas.width,e.canvas.height),le.set(0,0,e.canvas.width,e.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:Q,disable:lt,bindFramebuffer:Bt,drawBuffers:Ct,useProgram:Mt,setBlending:Qt,setMaterial:Dt,setFlipSided:wt,setCullFace:yt,setLineWidth:ve,setPolygonOffset:bt,setScissorTest:Vt,activeTexture:_e,bindTexture:Ae,unbindTexture:A,compressedTexImage2D:M,compressedTexImage3D:P,texImage2D:At,texImage3D:et,updateUBOMapping:vt,uniformBlockBinding:ht,texStorage2D:st,texStorage3D:Tt,texSubImage2D:q,texSubImage3D:$,compressedTexSubImage2D:G,compressedTexSubImage3D:xt,scissor:dt,viewport:Lt,reset:kt}}function _D(e,t,n,i,a,s,r){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new It,h=new WeakMap,d,u=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,M){return p?new OffscreenCanvas(A,M):Ec("canvas")}function x(A,M,P){let q=1,$=Ae(A);if(($.width>P||$.height>P)&&(q=P/Math.max($.width,$.height)),q<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let G=Math.floor(q*$.width),xt=Math.floor(q*$.height);d===void 0&&(d=g(G,xt));let st=M?g(G,xt):d;return st.width=G,st.height=xt,st.getContext("2d").drawImage(A,0,0,G,xt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+G+"x"+xt+")."),st}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),A;return A}function m(A){return A.generateMipmaps}function f(A){e.generateMipmap(A)}function v(A){return A.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?e.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function _(A,M,P,q,$=!1){if(A!==null){if(e[A]!==void 0)return e[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let G=M;if(M===e.RED&&(P===e.FLOAT&&(G=e.R32F),P===e.HALF_FLOAT&&(G=e.R16F),P===e.UNSIGNED_BYTE&&(G=e.R8)),M===e.RED_INTEGER&&(P===e.UNSIGNED_BYTE&&(G=e.R8UI),P===e.UNSIGNED_SHORT&&(G=e.R16UI),P===e.UNSIGNED_INT&&(G=e.R32UI),P===e.BYTE&&(G=e.R8I),P===e.SHORT&&(G=e.R16I),P===e.INT&&(G=e.R32I)),M===e.RG&&(P===e.FLOAT&&(G=e.RG32F),P===e.HALF_FLOAT&&(G=e.RG16F),P===e.UNSIGNED_BYTE&&(G=e.RG8)),M===e.RG_INTEGER&&(P===e.UNSIGNED_BYTE&&(G=e.RG8UI),P===e.UNSIGNED_SHORT&&(G=e.RG16UI),P===e.UNSIGNED_INT&&(G=e.RG32UI),P===e.BYTE&&(G=e.RG8I),P===e.SHORT&&(G=e.RG16I),P===e.INT&&(G=e.RG32I)),M===e.RGB_INTEGER&&(P===e.UNSIGNED_BYTE&&(G=e.RGB8UI),P===e.UNSIGNED_SHORT&&(G=e.RGB16UI),P===e.UNSIGNED_INT&&(G=e.RGB32UI),P===e.BYTE&&(G=e.RGB8I),P===e.SHORT&&(G=e.RGB16I),P===e.INT&&(G=e.RGB32I)),M===e.RGBA_INTEGER&&(P===e.UNSIGNED_BYTE&&(G=e.RGBA8UI),P===e.UNSIGNED_SHORT&&(G=e.RGBA16UI),P===e.UNSIGNED_INT&&(G=e.RGBA32UI),P===e.BYTE&&(G=e.RGBA8I),P===e.SHORT&&(G=e.RGBA16I),P===e.INT&&(G=e.RGBA32I)),M===e.RGB&&(P===e.UNSIGNED_INT_5_9_9_9_REV&&(G=e.RGB9_E5),P===e.UNSIGNED_INT_10F_11F_11F_REV&&(G=e.R11F_G11F_B10F)),M===e.RGBA){let xt=$?Mc:oe.getTransfer(q);P===e.FLOAT&&(G=e.RGBA32F),P===e.HALF_FLOAT&&(G=e.RGBA16F),P===e.UNSIGNED_BYTE&&(G=xt===Me?e.SRGB8_ALPHA8:e.RGBA8),P===e.UNSIGNED_SHORT_4_4_4_4&&(G=e.RGBA4),P===e.UNSIGNED_SHORT_5_5_5_1&&(G=e.RGB5_A1)}return(G===e.R16F||G===e.R32F||G===e.RG16F||G===e.RG32F||G===e.RGBA16F||G===e.RGBA32F)&&t.get("EXT_color_buffer_float"),G}function y(A,M){let P;return A?M===null||M===Ns||M===Ko?P=e.DEPTH24_STENCIL8:M===ca?P=e.DEPTH32F_STENCIL8:M===Jo&&(P=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Ns||M===Ko?P=e.DEPTH_COMPONENT24:M===ca?P=e.DEPTH_COMPONENT32F:M===Jo&&(P=e.DEPTH_COMPONENT16),P}function T(A,M){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==_i&&A.minFilter!==Pi?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function C(A){let M=A.target;M.removeEventListener("dispose",C),D(M),M.isVideoTexture&&h.delete(M)}function w(A){let M=A.target;M.removeEventListener("dispose",w),S(M)}function D(A){let M=i.get(A);if(M.__webglInit===void 0)return;let P=A.source,q=u.get(P);if(q){let $=q[M.__cacheKey];$.usedTimes--,$.usedTimes===0&&E(A),Object.keys(q).length===0&&u.delete(P)}i.remove(A)}function E(A){let M=i.get(A);e.deleteTexture(M.__webglTexture);let P=A.source,q=u.get(P);delete q[M.__cacheKey],r.memory.textures--}function S(A){let M=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(M.__webglFramebuffer[q]))for(let $=0;$<M.__webglFramebuffer[q].length;$++)e.deleteFramebuffer(M.__webglFramebuffer[q][$]);else e.deleteFramebuffer(M.__webglFramebuffer[q]);M.__webglDepthbuffer&&e.deleteRenderbuffer(M.__webglDepthbuffer[q])}else{if(Array.isArray(M.__webglFramebuffer))for(let q=0;q<M.__webglFramebuffer.length;q++)e.deleteFramebuffer(M.__webglFramebuffer[q]);else e.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&e.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&e.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let q=0;q<M.__webglColorRenderbuffer.length;q++)M.__webglColorRenderbuffer[q]&&e.deleteRenderbuffer(M.__webglColorRenderbuffer[q]);M.__webglDepthRenderbuffer&&e.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let P=A.textures;for(let q=0,$=P.length;q<$;q++){let G=i.get(P[q]);G.__webglTexture&&(e.deleteTexture(G.__webglTexture),r.memory.textures--),i.remove(P[q])}i.remove(A)}let U=0;function B(){U=0}function H(){let A=U;return A>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+a.maxTextures),U+=1,A}function k(A){let M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function J(A,M){let P=i.get(A);if(A.isVideoTexture&&Vt(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&P.__version!==A.version){let q=A.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(P,A,M);return}}else A.isExternalTexture&&(P.__webglTexture=A.sourceTexture?A.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,P.__webglTexture,e.TEXTURE0+M)}function W(A,M){let P=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&P.__version!==A.version){X(P,A,M);return}n.bindTexture(e.TEXTURE_2D_ARRAY,P.__webglTexture,e.TEXTURE0+M)}function at(A,M){let P=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&P.__version!==A.version){X(P,A,M);return}n.bindTexture(e.TEXTURE_3D,P.__webglTexture,e.TEXTURE0+M)}function V(A,M){let P=i.get(A);if(A.version>0&&P.__version!==A.version){Q(P,A,M);return}n.bindTexture(e.TEXTURE_CUBE_MAP,P.__webglTexture,e.TEXTURE0+M)}let ut={[mf]:e.REPEAT,[Es]:e.CLAMP_TO_EDGE,[gf]:e.MIRRORED_REPEAT},pt={[_i]:e.NEAREST,[Pb]:e.NEAREST_MIPMAP_NEAREST,[qc]:e.NEAREST_MIPMAP_LINEAR,[Pi]:e.LINEAR,[id]:e.LINEAR_MIPMAP_NEAREST,[Us]:e.LINEAR_MIPMAP_LINEAR},Rt={[Vb]:e.NEVER,[Yb]:e.ALWAYS,[Gb]:e.LESS,[Z0]:e.LEQUAL,[kb]:e.EQUAL,[qb]:e.GEQUAL,[Xb]:e.GREATER,[Wb]:e.NOTEQUAL};function Yt(A,M){if(M.type===ca&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===Pi||M.magFilter===id||M.magFilter===qc||M.magFilter===Us||M.minFilter===Pi||M.minFilter===id||M.minFilter===qc||M.minFilter===Us)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(A,e.TEXTURE_WRAP_S,ut[M.wrapS]),e.texParameteri(A,e.TEXTURE_WRAP_T,ut[M.wrapT]),(A===e.TEXTURE_3D||A===e.TEXTURE_2D_ARRAY)&&e.texParameteri(A,e.TEXTURE_WRAP_R,ut[M.wrapR]),e.texParameteri(A,e.TEXTURE_MAG_FILTER,pt[M.magFilter]),e.texParameteri(A,e.TEXTURE_MIN_FILTER,pt[M.minFilter]),M.compareFunction&&(e.texParameteri(A,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(A,e.TEXTURE_COMPARE_FUNC,Rt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===_i||M.minFilter!==qc&&M.minFilter!==Us||M.type===ca&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){let P=t.get("EXT_texture_filter_anisotropic");e.texParameterf(A,P.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,a.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function pe(A,M){let P=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",C));let q=M.source,$=u.get(q);$===void 0&&($={},u.set(q,$));let G=k(M);if(G!==A.__cacheKey){$[G]===void 0&&($[G]={texture:e.createTexture(),usedTimes:0},r.memory.textures++,P=!0),$[G].usedTimes++;let xt=$[A.__cacheKey];xt!==void 0&&($[A.__cacheKey].usedTimes--,xt.usedTimes===0&&E(M)),A.__cacheKey=G,A.__webglTexture=$[G].texture}return P}function le(A,M,P){return Math.floor(Math.floor(A/P)/M)}function se(A,M,P,q){let G=A.updateRanges;if(G.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,M.width,M.height,P,q,M.data);else{G.sort((et,dt)=>et.start-dt.start);let xt=0;for(let et=1;et<G.length;et++){let dt=G[xt],Lt=G[et],vt=dt.start+dt.count,ht=le(Lt.start,M.width,4),kt=le(dt.start,M.width,4);Lt.start<=vt+1&&ht===kt&&le(Lt.start+Lt.count-1,M.width,4)===ht?dt.count=Math.max(dt.count,Lt.start+Lt.count-dt.start):(++xt,G[xt]=Lt)}G.length=xt+1;let st=e.getParameter(e.UNPACK_ROW_LENGTH),Tt=e.getParameter(e.UNPACK_SKIP_PIXELS),At=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,M.width);for(let et=0,dt=G.length;et<dt;et++){let Lt=G[et],vt=Math.floor(Lt.start/4),ht=Math.ceil(Lt.count/4),kt=vt%M.width,N=Math.floor(vt/M.width),it=ht,rt=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,kt),e.pixelStorei(e.UNPACK_SKIP_ROWS,N),n.texSubImage2D(e.TEXTURE_2D,0,kt,N,it,rt,P,q,M.data)}A.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,st),e.pixelStorei(e.UNPACK_SKIP_PIXELS,Tt),e.pixelStorei(e.UNPACK_SKIP_ROWS,At)}}function X(A,M,P){let q=e.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(q=e.TEXTURE_2D_ARRAY),M.isData3DTexture&&(q=e.TEXTURE_3D);let $=pe(A,M),G=M.source;n.bindTexture(q,A.__webglTexture,e.TEXTURE0+P);let xt=i.get(G);if(G.version!==xt.__version||$===!0){n.activeTexture(e.TEXTURE0+P);let st=oe.getPrimaries(oe.workingColorSpace),Tt=M.colorSpace===Fa?null:oe.getPrimaries(M.colorSpace),At=M.colorSpace===Fa||st===Tt?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,M.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,At);let et=x(M.image,!1,a.maxTextureSize);et=_e(M,et);let dt=s.convert(M.format,M.colorSpace),Lt=s.convert(M.type),vt=_(M.internalFormat,dt,Lt,M.colorSpace,M.isVideoTexture);Yt(q,M);let ht,kt=M.mipmaps,N=M.isVideoTexture!==!0,it=xt.__version===void 0||$===!0,rt=G.dataReady,_t=T(M,et);if(M.isDepthTexture)vt=y(M.format===Qo,M.type),it&&(N?n.texStorage2D(e.TEXTURE_2D,1,vt,et.width,et.height):n.texImage2D(e.TEXTURE_2D,0,vt,et.width,et.height,0,dt,Lt,null));else if(M.isDataTexture)if(kt.length>0){N&&it&&n.texStorage2D(e.TEXTURE_2D,_t,vt,kt[0].width,kt[0].height);for(let tt=0,K=kt.length;tt<K;tt++)ht=kt[tt],N?rt&&n.texSubImage2D(e.TEXTURE_2D,tt,0,0,ht.width,ht.height,dt,Lt,ht.data):n.texImage2D(e.TEXTURE_2D,tt,vt,ht.width,ht.height,0,dt,Lt,ht.data);M.generateMipmaps=!1}else N?(it&&n.texStorage2D(e.TEXTURE_2D,_t,vt,et.width,et.height),rt&&se(M,et,dt,Lt)):n.texImage2D(e.TEXTURE_2D,0,vt,et.width,et.height,0,dt,Lt,et.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){N&&it&&n.texStorage3D(e.TEXTURE_2D_ARRAY,_t,vt,kt[0].width,kt[0].height,et.depth);for(let tt=0,K=kt.length;tt<K;tt++)if(ht=kt[tt],M.format!==Mi)if(dt!==null)if(N){if(rt)if(M.layerUpdates.size>0){let Et=ev(ht.width,ht.height,M.format,M.type);for(let Ht of M.layerUpdates){let me=ht.data.subarray(Ht*Et/ht.data.BYTES_PER_ELEMENT,(Ht+1)*Et/ht.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,tt,0,0,Ht,ht.width,ht.height,1,dt,me)}M.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,tt,0,0,0,ht.width,ht.height,et.depth,dt,ht.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,tt,vt,ht.width,ht.height,et.depth,0,ht.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?rt&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,tt,0,0,0,ht.width,ht.height,et.depth,dt,Lt,ht.data):n.texImage3D(e.TEXTURE_2D_ARRAY,tt,vt,ht.width,ht.height,et.depth,0,dt,Lt,ht.data)}else{N&&it&&n.texStorage2D(e.TEXTURE_2D,_t,vt,kt[0].width,kt[0].height);for(let tt=0,K=kt.length;tt<K;tt++)ht=kt[tt],M.format!==Mi?dt!==null?N?rt&&n.compressedTexSubImage2D(e.TEXTURE_2D,tt,0,0,ht.width,ht.height,dt,ht.data):n.compressedTexImage2D(e.TEXTURE_2D,tt,vt,ht.width,ht.height,0,ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?rt&&n.texSubImage2D(e.TEXTURE_2D,tt,0,0,ht.width,ht.height,dt,Lt,ht.data):n.texImage2D(e.TEXTURE_2D,tt,vt,ht.width,ht.height,0,dt,Lt,ht.data)}else if(M.isDataArrayTexture)if(N){if(it&&n.texStorage3D(e.TEXTURE_2D_ARRAY,_t,vt,et.width,et.height,et.depth),rt)if(M.layerUpdates.size>0){let tt=ev(et.width,et.height,M.format,M.type);for(let K of M.layerUpdates){let Et=et.data.subarray(K*tt/et.data.BYTES_PER_ELEMENT,(K+1)*tt/et.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,K,et.width,et.height,1,dt,Lt,Et)}M.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,dt,Lt,et.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,vt,et.width,et.height,et.depth,0,dt,Lt,et.data);else if(M.isData3DTexture)N?(it&&n.texStorage3D(e.TEXTURE_3D,_t,vt,et.width,et.height,et.depth),rt&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,dt,Lt,et.data)):n.texImage3D(e.TEXTURE_3D,0,vt,et.width,et.height,et.depth,0,dt,Lt,et.data);else if(M.isFramebufferTexture){if(it)if(N)n.texStorage2D(e.TEXTURE_2D,_t,vt,et.width,et.height);else{let tt=et.width,K=et.height;for(let Et=0;Et<_t;Et++)n.texImage2D(e.TEXTURE_2D,Et,vt,tt,K,0,dt,Lt,null),tt>>=1,K>>=1}}else if(kt.length>0){if(N&&it){let tt=Ae(kt[0]);n.texStorage2D(e.TEXTURE_2D,_t,vt,tt.width,tt.height)}for(let tt=0,K=kt.length;tt<K;tt++)ht=kt[tt],N?rt&&n.texSubImage2D(e.TEXTURE_2D,tt,0,0,dt,Lt,ht):n.texImage2D(e.TEXTURE_2D,tt,vt,dt,Lt,ht);M.generateMipmaps=!1}else if(N){if(it){let tt=Ae(et);n.texStorage2D(e.TEXTURE_2D,_t,vt,tt.width,tt.height)}rt&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,dt,Lt,et)}else n.texImage2D(e.TEXTURE_2D,0,vt,dt,Lt,et);m(M)&&f(q),xt.__version=G.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function Q(A,M,P){if(M.image.length!==6)return;let q=pe(A,M),$=M.source;n.bindTexture(e.TEXTURE_CUBE_MAP,A.__webglTexture,e.TEXTURE0+P);let G=i.get($);if($.version!==G.__version||q===!0){n.activeTexture(e.TEXTURE0+P);let xt=oe.getPrimaries(oe.workingColorSpace),st=M.colorSpace===Fa?null:oe.getPrimaries(M.colorSpace),Tt=M.colorSpace===Fa||xt===st?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,M.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);let At=M.isCompressedTexture||M.image[0].isCompressedTexture,et=M.image[0]&&M.image[0].isDataTexture,dt=[];for(let K=0;K<6;K++)!At&&!et?dt[K]=x(M.image[K],!0,a.maxCubemapSize):dt[K]=et?M.image[K].image:M.image[K],dt[K]=_e(M,dt[K]);let Lt=dt[0],vt=s.convert(M.format,M.colorSpace),ht=s.convert(M.type),kt=_(M.internalFormat,vt,ht,M.colorSpace),N=M.isVideoTexture!==!0,it=G.__version===void 0||q===!0,rt=$.dataReady,_t=T(M,Lt);Yt(e.TEXTURE_CUBE_MAP,M);let tt;if(At){N&&it&&n.texStorage2D(e.TEXTURE_CUBE_MAP,_t,kt,Lt.width,Lt.height);for(let K=0;K<6;K++){tt=dt[K].mipmaps;for(let Et=0;Et<tt.length;Et++){let Ht=tt[Et];M.format!==Mi?vt!==null?N?rt&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,Et,0,0,Ht.width,Ht.height,vt,Ht.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,Et,kt,Ht.width,Ht.height,0,Ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?rt&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,Et,0,0,Ht.width,Ht.height,vt,ht,Ht.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,Et,kt,Ht.width,Ht.height,0,vt,ht,Ht.data)}}}else{if(tt=M.mipmaps,N&&it){tt.length>0&&_t++;let K=Ae(dt[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,_t,kt,K.width,K.height)}for(let K=0;K<6;K++)if(et){N?rt&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,dt[K].width,dt[K].height,vt,ht,dt[K].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,kt,dt[K].width,dt[K].height,0,vt,ht,dt[K].data);for(let Et=0;Et<tt.length;Et++){let me=tt[Et].image[K].image;N?rt&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,Et+1,0,0,me.width,me.height,vt,ht,me.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,Et+1,kt,me.width,me.height,0,vt,ht,me.data)}}else{N?rt&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,vt,ht,dt[K]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,kt,vt,ht,dt[K]);for(let Et=0;Et<tt.length;Et++){let Ht=tt[Et];N?rt&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,Et+1,0,0,vt,ht,Ht.image[K]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,Et+1,kt,vt,ht,Ht.image[K])}}}m(M)&&f(e.TEXTURE_CUBE_MAP),G.__version=$.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function lt(A,M,P,q,$,G){let xt=s.convert(P.format,P.colorSpace),st=s.convert(P.type),Tt=_(P.internalFormat,xt,st,P.colorSpace),At=i.get(M),et=i.get(P);if(et.__renderTarget=M,!At.__hasExternalTextures){let dt=Math.max(1,M.width>>G),Lt=Math.max(1,M.height>>G);$===e.TEXTURE_3D||$===e.TEXTURE_2D_ARRAY?n.texImage3D($,G,Tt,dt,Lt,M.depth,0,xt,st,null):n.texImage2D($,G,Tt,dt,Lt,0,xt,st,null)}n.bindFramebuffer(e.FRAMEBUFFER,A),bt(M)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,q,$,et.__webglTexture,0,ve(M)):($===e.TEXTURE_2D||$>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,q,$,et.__webglTexture,G),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Bt(A,M,P){if(e.bindRenderbuffer(e.RENDERBUFFER,A),M.depthBuffer){let q=M.depthTexture,$=q&&q.isDepthTexture?q.type:null,G=y(M.stencilBuffer,$),xt=M.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,st=ve(M);bt(M)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,st,G,M.width,M.height):P?e.renderbufferStorageMultisample(e.RENDERBUFFER,st,G,M.width,M.height):e.renderbufferStorage(e.RENDERBUFFER,G,M.width,M.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,xt,e.RENDERBUFFER,A)}else{let q=M.textures;for(let $=0;$<q.length;$++){let G=q[$],xt=s.convert(G.format,G.colorSpace),st=s.convert(G.type),Tt=_(G.internalFormat,xt,st,G.colorSpace),At=ve(M);P&&bt(M)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,At,Tt,M.width,M.height):bt(M)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,At,Tt,M.width,M.height):e.renderbufferStorage(e.RENDERBUFFER,Tt,M.width,M.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Ct(A,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(e.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let q=i.get(M.depthTexture);q.__renderTarget=M,(!q.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),J(M.depthTexture,0);let $=q.__webglTexture,G=ve(M);if(M.depthTexture.format===Vo)bt(M)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,$,0,G):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,$,0);else if(M.depthTexture.format===Qo)bt(M)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,$,0,G):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function Mt(A){let M=i.get(A),P=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){let q=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),q){let $=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,q.removeEventListener("dispose",$)};q.addEventListener("dispose",$),M.__depthDisposeCallback=$}M.__boundDepthTexture=q}if(A.depthTexture&&!M.__autoAllocateDepthBuffer){if(P)throw new Error("target.depthTexture not supported in Cube render targets");let q=A.texture.mipmaps;q&&q.length>0?Ct(M.__webglFramebuffer[0],A):Ct(M.__webglFramebuffer,A)}else if(P){M.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(n.bindFramebuffer(e.FRAMEBUFFER,M.__webglFramebuffer[q]),M.__webglDepthbuffer[q]===void 0)M.__webglDepthbuffer[q]=e.createRenderbuffer(),Bt(M.__webglDepthbuffer[q],A,!1);else{let $=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,G=M.__webglDepthbuffer[q];e.bindRenderbuffer(e.RENDERBUFFER,G),e.framebufferRenderbuffer(e.FRAMEBUFFER,$,e.RENDERBUFFER,G)}}else{let q=A.texture.mipmaps;if(q&&q.length>0?n.bindFramebuffer(e.FRAMEBUFFER,M.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=e.createRenderbuffer(),Bt(M.__webglDepthbuffer,A,!1);else{let $=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,G=M.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,G),e.framebufferRenderbuffer(e.FRAMEBUFFER,$,e.RENDERBUFFER,G)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function qe(A,M,P){let q=i.get(A);M!==void 0&&lt(q.__webglFramebuffer,A,A.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),P!==void 0&&Mt(A)}function R(A){let M=A.texture,P=i.get(A),q=i.get(M);A.addEventListener("dispose",w);let $=A.textures,G=A.isWebGLCubeRenderTarget===!0,xt=$.length>1;if(xt||(q.__webglTexture===void 0&&(q.__webglTexture=e.createTexture()),q.__version=M.version,r.memory.textures++),G){P.__webglFramebuffer=[];for(let st=0;st<6;st++)if(M.mipmaps&&M.mipmaps.length>0){P.__webglFramebuffer[st]=[];for(let Tt=0;Tt<M.mipmaps.length;Tt++)P.__webglFramebuffer[st][Tt]=e.createFramebuffer()}else P.__webglFramebuffer[st]=e.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){P.__webglFramebuffer=[];for(let st=0;st<M.mipmaps.length;st++)P.__webglFramebuffer[st]=e.createFramebuffer()}else P.__webglFramebuffer=e.createFramebuffer();if(xt)for(let st=0,Tt=$.length;st<Tt;st++){let At=i.get($[st]);At.__webglTexture===void 0&&(At.__webglTexture=e.createTexture(),r.memory.textures++)}if(A.samples>0&&bt(A)===!1){P.__webglMultisampledFramebuffer=e.createFramebuffer(),P.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,P.__webglMultisampledFramebuffer);for(let st=0;st<$.length;st++){let Tt=$[st];P.__webglColorRenderbuffer[st]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,P.__webglColorRenderbuffer[st]);let At=s.convert(Tt.format,Tt.colorSpace),et=s.convert(Tt.type),dt=_(Tt.internalFormat,At,et,Tt.colorSpace,A.isXRRenderTarget===!0),Lt=ve(A);e.renderbufferStorageMultisample(e.RENDERBUFFER,Lt,dt,A.width,A.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+st,e.RENDERBUFFER,P.__webglColorRenderbuffer[st])}e.bindRenderbuffer(e.RENDERBUFFER,null),A.depthBuffer&&(P.__webglDepthRenderbuffer=e.createRenderbuffer(),Bt(P.__webglDepthRenderbuffer,A,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(G){n.bindTexture(e.TEXTURE_CUBE_MAP,q.__webglTexture),Yt(e.TEXTURE_CUBE_MAP,M);for(let st=0;st<6;st++)if(M.mipmaps&&M.mipmaps.length>0)for(let Tt=0;Tt<M.mipmaps.length;Tt++)lt(P.__webglFramebuffer[st][Tt],A,M,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+st,Tt);else lt(P.__webglFramebuffer[st],A,M,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+st,0);m(M)&&f(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(xt){for(let st=0,Tt=$.length;st<Tt;st++){let At=$[st],et=i.get(At),dt=e.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(dt=A.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(dt,et.__webglTexture),Yt(dt,At),lt(P.__webglFramebuffer,A,At,e.COLOR_ATTACHMENT0+st,dt,0),m(At)&&f(dt)}n.unbindTexture()}else{let st=e.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(st=A.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(st,q.__webglTexture),Yt(st,M),M.mipmaps&&M.mipmaps.length>0)for(let Tt=0;Tt<M.mipmaps.length;Tt++)lt(P.__webglFramebuffer[Tt],A,M,e.COLOR_ATTACHMENT0,st,Tt);else lt(P.__webglFramebuffer,A,M,e.COLOR_ATTACHMENT0,st,0);m(M)&&f(st),n.unbindTexture()}A.depthBuffer&&Mt(A)}function Qt(A){let M=A.textures;for(let P=0,q=M.length;P<q;P++){let $=M[P];if(m($)){let G=v(A),xt=i.get($).__webglTexture;n.bindTexture(G,xt),f(G),n.unbindTexture()}}}let Dt=[],wt=[];function yt(A){if(A.samples>0){if(bt(A)===!1){let M=A.textures,P=A.width,q=A.height,$=e.COLOR_BUFFER_BIT,G=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,xt=i.get(A),st=M.length>1;if(st)for(let At=0;At<M.length;At++)n.bindFramebuffer(e.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+At,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,xt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+At,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer);let Tt=A.texture.mipmaps;Tt&&Tt.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,xt.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let At=0;At<M.length;At++){if(A.resolveDepthBuffer&&(A.depthBuffer&&($|=e.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&($|=e.STENCIL_BUFFER_BIT)),st){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,xt.__webglColorRenderbuffer[At]);let et=i.get(M[At]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,et,0)}e.blitFramebuffer(0,0,P,q,0,0,P,q,$,e.NEAREST),l===!0&&(Dt.length=0,wt.length=0,Dt.push(e.COLOR_ATTACHMENT0+At),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Dt.push(G),wt.push(G),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,wt)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Dt))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),st)for(let At=0;At<M.length;At++){n.bindFramebuffer(e.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+At,e.RENDERBUFFER,xt.__webglColorRenderbuffer[At]);let et=i.get(M[At]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,xt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+At,e.TEXTURE_2D,et,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){let M=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[M])}}}function ve(A){return Math.min(a.maxSamples,A.samples)}function bt(A){let M=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Vt(A){let M=r.render.frame;h.get(A)!==M&&(h.set(A,M),A.update())}function _e(A,M){let P=A.colorSpace,q=A.format,$=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||P!==sa&&P!==Fa&&(oe.getTransfer(P)===Me?(q!==Mi||$!==Si)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",P)),M}function Ae(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=B,this.setTexture2D=J,this.setTexture2DArray=W,this.setTexture3D=at,this.setTextureCube=V,this.rebindTextures=qe,this.setupRenderTarget=R,this.updateRenderTargetMipmap=Qt,this.updateMultisampleRenderTarget=yt,this.setupDepthRenderbuffer=Mt,this.setupFrameBufferTexture=lt,this.useMultisampledRTT=bt}function yD(e,t){function n(i,a=Fa){let s,r=oe.getTransfer(a);if(i===Si)return e.UNSIGNED_BYTE;if(i===sd)return e.UNSIGNED_SHORT_4_4_4_4;if(i===rd)return e.UNSIGNED_SHORT_5_5_5_1;if(i===G0)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===k0)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===H0)return e.BYTE;if(i===V0)return e.SHORT;if(i===Jo)return e.UNSIGNED_SHORT;if(i===ad)return e.INT;if(i===Ns)return e.UNSIGNED_INT;if(i===ca)return e.FLOAT;if(i===Ls)return e.HALF_FLOAT;if(i===X0)return e.ALPHA;if(i===W0)return e.RGB;if(i===Mi)return e.RGBA;if(i===Vo)return e.DEPTH_COMPONENT;if(i===Qo)return e.DEPTH_STENCIL;if(i===q0)return e.RED;if(i===od)return e.RED_INTEGER;if(i===Y0)return e.RG;if(i===ld)return e.RG_INTEGER;if(i===cd)return e.RGBA_INTEGER;if(i===Yc||i===Zc||i===Jc||i===Kc)if(r===Me)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Yc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Zc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Jc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Kc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Yc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Zc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Jc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Kc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ud||i===hd||i===fd||i===dd)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===ud)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===hd)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===fd)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===dd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===pd||i===md||i===gd)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===pd||i===md)return r===Me?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===gd)return r===Me?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===vd||i===_d||i===yd||i===xd||i===Sd||i===Md||i===bd||i===Ed||i===Td||i===Ad||i===wd||i===Cd||i===Rd||i===Dd)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===vd)return r===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===_d)return r===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===yd)return r===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===xd)return r===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Sd)return r===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Md)return r===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===bd)return r===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ed)return r===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Td)return r===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ad)return r===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===wd)return r===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Cd)return r===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Rd)return r===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Dd)return r===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ud||i===Nd||i===Ld)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===Ud)return r===Me?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Nd)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ld)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Od||i===Id||i===Pd||i===Bd)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===Od)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Id)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Pd)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Bd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ko?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}var xD=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,SD=`
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

}`,pv=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){let i=new Pc(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let n=t.cameras[0].viewport,i=new Hn({vertexShader:xD,fragmentShader:SD,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new gn(new Cs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},mv=class extends Pa{constructor(t,n){super();let i=this,a=null,s=1,r=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,p=null,g=null,x=typeof XRWebGLBinding<"u",m=new pv,f={},v=n.getContextAttributes(),_=null,y=null,T=[],C=[],w=new It,D=null,E=new Mn;E.viewport=new Ie;let S=new Mn;S.viewport=new Ie;let U=[E,S],B=new qf,H=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Q=T[X];return Q===void 0&&(Q=new Wo,T[X]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(X){let Q=T[X];return Q===void 0&&(Q=new Wo,T[X]=Q),Q.getGripSpace()},this.getHand=function(X){let Q=T[X];return Q===void 0&&(Q=new Wo,T[X]=Q),Q.getHandSpace()};function J(X){let Q=C.indexOf(X.inputSource);if(Q===-1)return;let lt=T[Q];lt!==void 0&&(lt.update(X.inputSource,X.frame,c||r),lt.dispatchEvent({type:X.type,data:X.inputSource}))}function W(){a.removeEventListener("select",J),a.removeEventListener("selectstart",J),a.removeEventListener("selectend",J),a.removeEventListener("squeeze",J),a.removeEventListener("squeezestart",J),a.removeEventListener("squeezeend",J),a.removeEventListener("end",W),a.removeEventListener("inputsourceschange",at);for(let X=0;X<T.length;X++){let Q=C[X];Q!==null&&(C[X]=null,T[X].disconnect(Q))}H=null,k=null,m.reset();for(let X in f)delete f[X];t.setRenderTarget(_),p=null,u=null,d=null,a=null,y=null,se.stop(),i.isPresenting=!1,t.setPixelRatio(D),t.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(a,n)),d},this.getFrame=function(){return g},this.getSession=function(){return a},this.setSession=async function(X){if(a=X,a!==null){if(_=t.getRenderTarget(),a.addEventListener("select",J),a.addEventListener("selectstart",J),a.addEventListener("selectend",J),a.addEventListener("squeeze",J),a.addEventListener("squeezestart",J),a.addEventListener("squeezeend",J),a.addEventListener("end",W),a.addEventListener("inputsourceschange",at),v.xrCompatible!==!0&&await n.makeXRCompatible(),D=t.getPixelRatio(),t.getSize(w),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let lt=null,Bt=null,Ct=null;v.depth&&(Ct=v.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,lt=v.stencil?Qo:Vo,Bt=v.stencil?Ko:Ns);let Mt={colorFormat:n.RGBA8,depthFormat:Ct,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(Mt),a.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new yi(u.textureWidth,u.textureHeight,{format:Mi,type:Si,depthTexture:new Ic(u.textureWidth,u.textureHeight,Bt,void 0,void 0,void 0,void 0,void 0,void 0,lt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let lt={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(a,n,lt),a.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new yi(p.framebufferWidth,p.framebufferHeight,{format:Mi,type:Si,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await a.requestReferenceSpace(o),se.setContext(a),se.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function at(X){for(let Q=0;Q<X.removed.length;Q++){let lt=X.removed[Q],Bt=C.indexOf(lt);Bt>=0&&(C[Bt]=null,T[Bt].disconnect(lt))}for(let Q=0;Q<X.added.length;Q++){let lt=X.added[Q],Bt=C.indexOf(lt);if(Bt===-1){for(let Mt=0;Mt<T.length;Mt++)if(Mt>=C.length){C.push(lt),Bt=Mt;break}else if(C[Mt]===null){C[Mt]=lt,Bt=Mt;break}if(Bt===-1)break}let Ct=T[Bt];Ct&&Ct.connect(lt)}}let V=new L,ut=new L;function pt(X,Q,lt){V.setFromMatrixPosition(Q.matrixWorld),ut.setFromMatrixPosition(lt.matrixWorld);let Bt=V.distanceTo(ut),Ct=Q.projectionMatrix.elements,Mt=lt.projectionMatrix.elements,qe=Ct[14]/(Ct[10]-1),R=Ct[14]/(Ct[10]+1),Qt=(Ct[9]+1)/Ct[5],Dt=(Ct[9]-1)/Ct[5],wt=(Ct[8]-1)/Ct[0],yt=(Mt[8]+1)/Mt[0],ve=qe*wt,bt=qe*yt,Vt=Bt/(-wt+yt),_e=Vt*-wt;if(Q.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(_e),X.translateZ(Vt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Ct[10]===-1)X.projectionMatrix.copy(Q.projectionMatrix),X.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{let Ae=qe+Vt,A=R+Vt,M=ve-_e,P=bt+(Bt-_e),q=Qt*R/A*Ae,$=Dt*R/A*Ae;X.projectionMatrix.makePerspective(M,P,q,$,Ae,A),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function Rt(X,Q){Q===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Q.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(a===null)return;let Q=X.near,lt=X.far;m.texture!==null&&(m.depthNear>0&&(Q=m.depthNear),m.depthFar>0&&(lt=m.depthFar)),B.near=S.near=E.near=Q,B.far=S.far=E.far=lt,(H!==B.near||k!==B.far)&&(a.updateRenderState({depthNear:B.near,depthFar:B.far}),H=B.near,k=B.far),B.layers.mask=X.layers.mask|6,E.layers.mask=B.layers.mask&3,S.layers.mask=B.layers.mask&5;let Bt=X.parent,Ct=B.cameras;Rt(B,Bt);for(let Mt=0;Mt<Ct.length;Mt++)Rt(Ct[Mt],Bt);Ct.length===2?pt(B,E,S):B.projectionMatrix.copy(E.projectionMatrix),Yt(X,B,Bt)};function Yt(X,Q,lt){lt===null?X.matrix.copy(Q.matrixWorld):(X.matrix.copy(lt.matrixWorld),X.matrix.invert(),X.matrix.multiply(Q.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Q.projectionMatrix),X.projectionMatrixInverse.copy(Q.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=_f*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(X){l=X,u!==null&&(u.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(X){return f[X]};let pe=null;function le(X,Q){if(h=Q.getViewerPose(c||r),g=Q,h!==null){let lt=h.views;p!==null&&(t.setRenderTargetFramebuffer(y,p.framebuffer),t.setRenderTarget(y));let Bt=!1;lt.length!==B.cameras.length&&(B.cameras.length=0,Bt=!0);for(let R=0;R<lt.length;R++){let Qt=lt[R],Dt=null;if(p!==null)Dt=p.getViewport(Qt);else{let yt=d.getViewSubImage(u,Qt);Dt=yt.viewport,R===0&&(t.setRenderTargetTextures(y,yt.colorTexture,yt.depthStencilTexture),t.setRenderTarget(y))}let wt=U[R];wt===void 0&&(wt=new Mn,wt.layers.enable(R),wt.viewport=new Ie,U[R]=wt),wt.matrix.fromArray(Qt.transform.matrix),wt.matrix.decompose(wt.position,wt.quaternion,wt.scale),wt.projectionMatrix.fromArray(Qt.projectionMatrix),wt.projectionMatrixInverse.copy(wt.projectionMatrix).invert(),wt.viewport.set(Dt.x,Dt.y,Dt.width,Dt.height),R===0&&(B.matrix.copy(wt.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Bt===!0&&B.cameras.push(wt)}let Ct=a.enabledFeatures;if(Ct&&Ct.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&x){d=i.getBinding();let R=d.getDepthInformation(lt[0]);R&&R.isValid&&R.texture&&m.init(R,a.renderState)}if(Ct&&Ct.includes("camera-access")&&x){t.state.unbindTexture(),d=i.getBinding();for(let R=0;R<lt.length;R++){let Qt=lt[R].camera;if(Qt){let Dt=f[Qt];Dt||(Dt=new Pc,f[Qt]=Dt);let wt=d.getCameraImage(Qt);Dt.sourceTexture=wt}}}}for(let lt=0;lt<T.length;lt++){let Bt=C[lt],Ct=T[lt];Bt!==null&&Ct!==void 0&&Ct.update(Bt,Q,c||r)}pe&&pe(X,Q),Q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Q}),g=null}let se=new M1;se.setAnimationLoop(le),this.setAnimationLoop=function(X){pe=X},this.dispose=function(){}}},Mr=new ra,MD=new He;function bD(e,t){function n(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,Q0(e)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function a(m,f,v,_,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),d(m,f)):f.isMeshPhongMaterial?(s(m,f),h(m,f)):f.isMeshStandardMaterial?(s(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),x(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(r(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,v,_):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,n(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,n(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Rn&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,n(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Rn&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,n(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,n(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,n(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let v=t.get(f),_=v.envMap,y=v.envMapRotation;_&&(m.envMap.value=_,Mr.copy(y),Mr.x*=-1,Mr.y*=-1,Mr.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Mr.y*=-1,Mr.z*=-1),m.envMapRotation.value.setFromMatrix4(MD.makeRotationFromEuler(Mr)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,n(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,n(f.aoMap,m.aoMapTransform))}function r(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,n(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,v,_){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*v,m.scale.value=_*.5,f.map&&(m.map.value=f.map,n(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,n(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,n(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,n(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,v){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,n(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,n(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,n(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,n(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,n(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Rn&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,n(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,n(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,n(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,n(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,n(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,n(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,n(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){let v=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function ED(e,t,n,i){let a={},s={},r=[],o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,_){let y=_.program;i.uniformBlockBinding(v,y)}function c(v,_){let y=a[v.id];y===void 0&&(g(v),y=h(v),a[v.id]=y,v.addEventListener("dispose",m));let T=_.program;i.updateUBOMapping(v,T);let C=t.render.frame;s[v.id]!==C&&(u(v),s[v.id]=C)}function h(v){let _=d();v.__bindingPointIndex=_;let y=e.createBuffer(),T=v.__size,C=v.usage;return e.bindBuffer(e.UNIFORM_BUFFER,y),e.bufferData(e.UNIFORM_BUFFER,T,C),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,_,y),y}function d(){for(let v=0;v<o;v++)if(r.indexOf(v)===-1)return r.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){let _=a[v.id],y=v.uniforms,T=v.__cache;e.bindBuffer(e.UNIFORM_BUFFER,_);for(let C=0,w=y.length;C<w;C++){let D=Array.isArray(y[C])?y[C]:[y[C]];for(let E=0,S=D.length;E<S;E++){let U=D[E];if(p(U,C,E,T)===!0){let B=U.__offset,H=Array.isArray(U.value)?U.value:[U.value],k=0;for(let J=0;J<H.length;J++){let W=H[J],at=x(W);typeof W=="number"||typeof W=="boolean"?(U.__data[0]=W,e.bufferSubData(e.UNIFORM_BUFFER,B+k,U.__data)):W.isMatrix3?(U.__data[0]=W.elements[0],U.__data[1]=W.elements[1],U.__data[2]=W.elements[2],U.__data[3]=0,U.__data[4]=W.elements[3],U.__data[5]=W.elements[4],U.__data[6]=W.elements[5],U.__data[7]=0,U.__data[8]=W.elements[6],U.__data[9]=W.elements[7],U.__data[10]=W.elements[8],U.__data[11]=0):(W.toArray(U.__data,k),k+=at.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,B,U.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(v,_,y,T){let C=v.value,w=_+"_"+y;if(T[w]===void 0)return typeof C=="number"||typeof C=="boolean"?T[w]=C:T[w]=C.clone(),!0;{let D=T[w];if(typeof C=="number"||typeof C=="boolean"){if(D!==C)return T[w]=C,!0}else if(D.equals(C)===!1)return D.copy(C),!0}return!1}function g(v){let _=v.uniforms,y=0,T=16;for(let w=0,D=_.length;w<D;w++){let E=Array.isArray(_[w])?_[w]:[_[w]];for(let S=0,U=E.length;S<U;S++){let B=E[S],H=Array.isArray(B.value)?B.value:[B.value];for(let k=0,J=H.length;k<J;k++){let W=H[k],at=x(W),V=y%T,ut=V%at.boundary,pt=V+ut;y+=ut,pt!==0&&T-pt<at.storage&&(y+=T-pt),B.__data=new Float32Array(at.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=y,y+=at.storage}}}let C=y%T;return C>0&&(y+=T-C),v.__size=y,v.__cache={},this}function x(v){let _={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(_.boundary=4,_.storage=4):v.isVector2?(_.boundary=8,_.storage=8):v.isVector3||v.isColor?(_.boundary=16,_.storage=12):v.isVector4?(_.boundary=16,_.storage=16):v.isMatrix3?(_.boundary=48,_.storage=48):v.isMatrix4?(_.boundary=64,_.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),_}function m(v){let _=v.target;_.removeEventListener("dispose",m);let y=r.indexOf(_.__bindingPointIndex);r.splice(y,1),e.deleteBuffer(a[_.id]),delete a[_.id],delete s[_.id]}function f(){for(let v in a)e.deleteBuffer(a[v]);r=[],a={},s={}}return{bind:l,update:c,dispose:f}}var Gd=class{constructor(t={}){let{canvas:n=Zb(),context:i=null,depth:a=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=r;let g=new Uint32Array(4),x=new Int32Array(4),m=null,f=null,v=[],_=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=za,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let y=this,T=!1;this._outputColorSpace=ei;let C=0,w=0,D=null,E=-1,S=null,U=new Ie,B=new Ie,H=null,k=new ae(0),J=0,W=n.width,at=n.height,V=1,ut=null,pt=null,Rt=new Ie(0,0,W,at),Yt=new Ie(0,0,W,at),pe=!1,le=new Lc,se=!1,X=!1,Q=new He,lt=new L,Bt=new Ie,Ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Mt=!1;function qe(){return D===null?V:1}let R=i;function Qt(b,O){return n.getContext(b,O)}try{let b={alpha:!0,depth:a,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${"180"}`),n.addEventListener("webglcontextlost",rt,!1),n.addEventListener("webglcontextrestored",_t,!1),n.addEventListener("webglcontextcreationerror",tt,!1),R===null){let O="webgl2";if(R=Qt(O,b),R===null)throw Qt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Dt,wt,yt,ve,bt,Vt,_e,Ae,A,M,P,q,$,G,xt,st,Tt,At,et,dt,Lt,vt,ht,kt;function N(){Dt=new G2(R),Dt.init(),vt=new yD(R,Dt),wt=new I2(R,Dt,t,vt),yt=new vD(R,Dt),wt.reversedDepthBuffer&&u&&yt.buffers.depth.setReversed(!0),ve=new W2(R),bt=new aD,Vt=new _D(R,Dt,yt,bt,wt,vt,ve),_e=new B2(y),Ae=new V2(y),A=new Qw(R),ht=new L2(R,A),M=new k2(R,A,ve,ht),P=new Y2(R,M,A,ve),et=new q2(R,wt,Vt),st=new P2(bt),q=new iD(y,_e,Ae,Dt,wt,ht,st),$=new bD(y,bt),G=new rD,xt=new fD(Dt),At=new N2(y,_e,Ae,yt,P,p,l),Tt=new mD(y,P,wt),kt=new ED(R,ve,wt,yt),dt=new O2(R,Dt,ve),Lt=new X2(R,Dt,ve),ve.programs=q.programs,y.capabilities=wt,y.extensions=Dt,y.properties=bt,y.renderLists=G,y.shadowMap=Tt,y.state=yt,y.info=ve}N();let it=new mv(y,R);this.xr=it,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let b=Dt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=Dt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(b){b!==void 0&&(V=b,this.setSize(W,at,!1))},this.getSize=function(b){return b.set(W,at)},this.setSize=function(b,O,z=!0){if(it.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=b,at=O,n.width=Math.floor(b*V),n.height=Math.floor(O*V),z===!0&&(n.style.width=b+"px",n.style.height=O+"px"),this.setViewport(0,0,b,O)},this.getDrawingBufferSize=function(b){return b.set(W*V,at*V).floor()},this.setDrawingBufferSize=function(b,O,z){W=b,at=O,V=z,n.width=Math.floor(b*z),n.height=Math.floor(O*z),this.setViewport(0,0,b,O)},this.getCurrentViewport=function(b){return b.copy(U)},this.getViewport=function(b){return b.copy(Rt)},this.setViewport=function(b,O,z,F){b.isVector4?Rt.set(b.x,b.y,b.z,b.w):Rt.set(b,O,z,F),yt.viewport(U.copy(Rt).multiplyScalar(V).round())},this.getScissor=function(b){return b.copy(Yt)},this.setScissor=function(b,O,z,F){b.isVector4?Yt.set(b.x,b.y,b.z,b.w):Yt.set(b,O,z,F),yt.scissor(B.copy(Yt).multiplyScalar(V).round())},this.getScissorTest=function(){return pe},this.setScissorTest=function(b){yt.setScissorTest(pe=b)},this.setOpaqueSort=function(b){ut=b},this.setTransparentSort=function(b){pt=b},this.getClearColor=function(b){return b.copy(At.getClearColor())},this.setClearColor=function(){At.setClearColor(...arguments)},this.getClearAlpha=function(){return At.getClearAlpha()},this.setClearAlpha=function(){At.setClearAlpha(...arguments)},this.clear=function(b=!0,O=!0,z=!0){let F=0;if(b){let I=!1;if(D!==null){let nt=D.texture.format;I=nt===cd||nt===ld||nt===od}if(I){let nt=D.texture.type,ct=nt===Si||nt===Ns||nt===Jo||nt===Ko||nt===sd||nt===rd,St=At.getClearColor(),mt=At.getClearAlpha(),Ot=St.r,Nt=St.g,Ut=St.b;ct?(g[0]=Ot,g[1]=Nt,g[2]=Ut,g[3]=mt,R.clearBufferuiv(R.COLOR,0,g)):(x[0]=Ot,x[1]=Nt,x[2]=Ut,x[3]=mt,R.clearBufferiv(R.COLOR,0,x))}else F|=R.COLOR_BUFFER_BIT}O&&(F|=R.DEPTH_BUFFER_BIT),z&&(F|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",rt,!1),n.removeEventListener("webglcontextrestored",_t,!1),n.removeEventListener("webglcontextcreationerror",tt,!1),At.dispose(),G.dispose(),xt.dispose(),bt.dispose(),_e.dispose(),Ae.dispose(),P.dispose(),ht.dispose(),kt.dispose(),q.dispose(),it.dispose(),it.removeEventListener("sessionstart",si),it.removeEventListener("sessionend",Hi),Ei.stop()};function rt(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function _t(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let b=ve.autoReset,O=Tt.enabled,z=Tt.autoUpdate,F=Tt.needsUpdate,I=Tt.type;N(),ve.autoReset=b,Tt.enabled=O,Tt.autoUpdate=z,Tt.needsUpdate=F,Tt.type=I}function tt(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function K(b){let O=b.target;O.removeEventListener("dispose",K),Et(O)}function Et(b){Ht(b),bt.remove(b)}function Ht(b){let O=bt.get(b).programs;O!==void 0&&(O.forEach(function(z){q.releaseProgram(z)}),b.isShaderMaterial&&q.releaseShaderCache(b))}this.renderBufferDirect=function(b,O,z,F,I,nt){O===null&&(O=Ct);let ct=I.isMesh&&I.matrixWorld.determinant()<0,St=Cr(b,O,z,F,I);yt.setMaterial(F,ct);let mt=z.index,Ot=1;if(F.wireframe===!0){if(mt=M.getWireframeAttribute(z),mt===void 0)return;Ot=2}let Nt=z.drawRange,Ut=z.attributes.position,Zt=Nt.start*Ot,he=(Nt.start+Nt.count)*Ot;nt!==null&&(Zt=Math.max(Zt,nt.start*Ot),he=Math.min(he,(nt.start+nt.count)*Ot)),mt!==null?(Zt=Math.max(Zt,0),he=Math.min(he,mt.count)):Ut!=null&&(Zt=Math.max(Zt,0),he=Math.min(he,Ut.count));let Y=he-Zt;if(Y<0||Y===1/0)return;ht.setup(I,F,St,z,mt);let j,gt=dt;if(mt!==null&&(j=A.get(mt),gt=Lt,gt.setIndex(j)),I.isMesh)F.wireframe===!0?(yt.setLineWidth(F.wireframeLinewidth*qe()),gt.setMode(R.LINES)):gt.setMode(R.TRIANGLES);else if(I.isLine){let ot=F.linewidth;ot===void 0&&(ot=1),yt.setLineWidth(ot*qe()),I.isLineSegments?gt.setMode(R.LINES):I.isLineLoop?gt.setMode(R.LINE_LOOP):gt.setMode(R.LINE_STRIP)}else I.isPoints?gt.setMode(R.POINTS):I.isSprite&&gt.setMode(R.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)Go("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),gt.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(Dt.get("WEBGL_multi_draw"))gt.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{let ot=I._multiDrawStarts,Kt=I._multiDrawCounts,zt=I._multiDrawCount,Ne=mt?A.get(mt).bytesPerElement:1,ri=bt.get(F).currentProgram.getUniforms();for(let je=0;je<zt;je++)ri.setValue(R,"_gl_DrawID",je),gt.render(ot[je]/Ne,Kt[je])}else if(I.isInstancedMesh)gt.renderInstances(Zt,Y,I.count);else if(z.isInstancedBufferGeometry){let ot=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Kt=Math.min(z.instanceCount,ot);gt.renderInstances(Zt,Y,Kt)}else gt.render(Zt,Y)};function me(b,O,z){b.transparent===!0&&b.side===la&&b.forceSinglePass===!1?(b.side=Rn,b.needsUpdate=!0,Dn(b,O,z),b.side=Oa,b.needsUpdate=!0,Dn(b,O,z),b.side=la):Dn(b,O,z)}this.compile=function(b,O,z=null){z===null&&(z=b),f=xt.get(z),f.init(O),_.push(f),z.traverseVisible(function(I){I.isLight&&I.layers.test(O.layers)&&(f.pushLight(I),I.castShadow&&f.pushShadow(I))}),b!==z&&b.traverseVisible(function(I){I.isLight&&I.layers.test(O.layers)&&(f.pushLight(I),I.castShadow&&f.pushShadow(I))}),f.setupLights();let F=new Set;return b.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;let nt=I.material;if(nt)if(Array.isArray(nt))for(let ct=0;ct<nt.length;ct++){let St=nt[ct];me(St,z,I),F.add(St)}else me(nt,z,I),F.add(nt)}),f=_.pop(),F},this.compileAsync=function(b,O,z=null){let F=this.compile(b,O,z);return new Promise(I=>{function nt(){if(F.forEach(function(ct){bt.get(ct).currentProgram.isReady()&&F.delete(ct)}),F.size===0){I(b);return}setTimeout(nt,10)}Dt.get("KHR_parallel_shader_compile")!==null?nt():setTimeout(nt,10)})};let ie=null;function bi(b){ie&&ie(b)}function si(){Ei.stop()}function Hi(){Ei.start()}let Ei=new M1;Ei.setAnimationLoop(bi),typeof self<"u"&&Ei.setContext(self),this.setAnimationLoop=function(b){ie=b,it.setAnimationLoop(b),b===null?Ei.stop():Ei.start()},it.addEventListener("sessionstart",si),it.addEventListener("sessionend",Hi),this.render=function(b,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(it.cameraAutoUpdate===!0&&it.updateCamera(O),O=it.getCamera()),b.isScene===!0&&b.onBeforeRender(y,b,O,D),f=xt.get(b,_.length),f.init(O),_.push(f),Q.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),le.setFromProjectionMatrix(Q,Ii,O.reversedDepth),X=this.localClippingEnabled,se=st.init(this.clippingPlanes,X),m=G.get(b,v.length),m.init(),v.push(m),it.enabled===!0&&it.isPresenting===!0){let nt=y.xr.getDepthSensingMesh();nt!==null&&wr(nt,O,-1/0,y.sortObjects)}wr(b,O,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(ut,pt),Mt=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,Mt&&At.addToRenderList(m,b),this.info.render.frame++,se===!0&&st.beginShadows();let z=f.state.shadowsArray;Tt.render(z,b,O),se===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();let F=m.opaque,I=m.transmissive;if(f.setupLights(),O.isArrayCamera){let nt=O.cameras;if(I.length>0)for(let ct=0,St=nt.length;ct<St;ct++){let mt=nt[ct];Pt(F,I,b,mt)}Mt&&At.render(b);for(let ct=0,St=nt.length;ct<St;ct++){let mt=nt[ct];sl(m,b,mt,mt.viewport)}}else I.length>0&&Pt(F,I,b,O),Mt&&At.render(b),sl(m,b,O);D!==null&&w===0&&(Vt.updateMultisampleRenderTarget(D),Vt.updateRenderTargetMipmap(D)),b.isScene===!0&&b.onAfterRender(y,b,O),ht.resetDefaultState(),E=-1,S=null,_.pop(),_.length>0?(f=_[_.length-1],se===!0&&st.setGlobalState(y.clippingPlanes,f.state.camera)):f=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function wr(b,O,z,F){if(b.visible===!1)return;if(b.layers.test(O.layers)){if(b.isGroup)z=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(O);else if(b.isLight)f.pushLight(b),b.castShadow&&f.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||le.intersectsSprite(b)){F&&Bt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Q);let ct=P.update(b),St=b.material;St.visible&&m.push(b,ct,St,z,Bt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||le.intersectsObject(b))){let ct=P.update(b),St=b.material;if(F&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Bt.copy(b.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),Bt.copy(ct.boundingSphere.center)),Bt.applyMatrix4(b.matrixWorld).applyMatrix4(Q)),Array.isArray(St)){let mt=ct.groups;for(let Ot=0,Nt=mt.length;Ot<Nt;Ot++){let Ut=mt[Ot],Zt=St[Ut.materialIndex];Zt&&Zt.visible&&m.push(b,ct,Zt,z,Bt.z,Ut)}}else St.visible&&m.push(b,ct,St,z,Bt.z,null)}}let nt=b.children;for(let ct=0,St=nt.length;ct<St;ct++)wr(nt[ct],O,z,F)}function sl(b,O,z,F){let I=b.opaque,nt=b.transmissive,ct=b.transparent;f.setupLightsView(z),se===!0&&st.setGlobalState(y.clippingPlanes,z),F&&yt.viewport(U.copy(F)),I.length>0&&ln(I,O,z),nt.length>0&&ln(nt,O,z),ct.length>0&&ln(ct,O,z),yt.buffers.depth.setTest(!0),yt.buffers.depth.setMask(!0),yt.buffers.color.setMask(!0),yt.setPolygonOffset(!1)}function Pt(b,O,z,F){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[F.id]===void 0&&(f.state.transmissionRenderTarget[F.id]=new yi(1,1,{generateMipmaps:!0,type:Dt.has("EXT_color_buffer_half_float")||Dt.has("EXT_color_buffer_float")?Ls:Si,minFilter:Us,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:oe.workingColorSpace}));let nt=f.state.transmissionRenderTarget[F.id],ct=F.viewport||U;nt.setSize(ct.z*y.transmissionResolutionScale,ct.w*y.transmissionResolutionScale);let St=y.getRenderTarget(),mt=y.getActiveCubeFace(),Ot=y.getActiveMipmapLevel();y.setRenderTarget(nt),y.getClearColor(k),J=y.getClearAlpha(),J<1&&y.setClearColor(16777215,.5),y.clear(),Mt&&At.render(z);let Nt=y.toneMapping;y.toneMapping=za;let Ut=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),f.setupLightsView(F),se===!0&&st.setGlobalState(y.clippingPlanes,F),ln(b,z,F),Vt.updateMultisampleRenderTarget(nt),Vt.updateRenderTargetMipmap(nt),Dt.has("WEBGL_multisampled_render_to_texture")===!1){let Zt=!1;for(let he=0,Y=O.length;he<Y;he++){let j=O[he],gt=j.object,ot=j.geometry,Kt=j.material,zt=j.group;if(Kt.side===la&&gt.layers.test(F.layers)){let Ne=Kt.side;Kt.side=Rn,Kt.needsUpdate=!0,Vi(gt,z,F,ot,Kt,zt),Kt.side=Ne,Kt.needsUpdate=!0,Zt=!0}}Zt===!0&&(Vt.updateMultisampleRenderTarget(nt),Vt.updateRenderTargetMipmap(nt))}y.setRenderTarget(St,mt,Ot),y.setClearColor(k,J),Ut!==void 0&&(F.viewport=Ut),y.toneMapping=Nt}function ln(b,O,z){let F=O.isScene===!0?O.overrideMaterial:null;for(let I=0,nt=b.length;I<nt;I++){let ct=b[I],St=ct.object,mt=ct.geometry,Ot=ct.group,Nt=ct.material;Nt.allowOverride===!0&&F!==null&&(Nt=F),St.layers.test(z.layers)&&Vi(St,O,z,mt,Nt,Ot)}}function Vi(b,O,z,F,I,nt){b.onBeforeRender(y,O,z,F,I,nt),b.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),I.onBeforeRender(y,O,z,F,b,nt),I.transparent===!0&&I.side===la&&I.forceSinglePass===!1?(I.side=Rn,I.needsUpdate=!0,y.renderBufferDirect(z,O,F,I,b,nt),I.side=Oa,I.needsUpdate=!0,y.renderBufferDirect(z,O,F,I,b,nt),I.side=la):y.renderBufferDirect(z,O,F,I,b,nt),b.onAfterRender(y,O,z,F,I,nt)}function Dn(b,O,z){O.isScene!==!0&&(O=Ct);let F=bt.get(b),I=f.state.lights,nt=f.state.shadowsArray,ct=I.state.version,St=q.getParameters(b,I.state,nt,O,z),mt=q.getProgramCacheKey(St),Ot=F.programs;F.environment=b.isMeshStandardMaterial?O.environment:null,F.fog=O.fog,F.envMap=(b.isMeshStandardMaterial?Ae:_e).get(b.envMap||F.environment),F.envMapRotation=F.environment!==null&&b.envMap===null?O.environmentRotation:b.envMapRotation,Ot===void 0&&(b.addEventListener("dispose",K),Ot=new Map,F.programs=Ot);let Nt=Ot.get(mt);if(Nt!==void 0){if(F.currentProgram===Nt&&F.lightsStateVersion===ct)return rl(b,St),Nt}else St.uniforms=q.getUniforms(b),b.onBeforeCompile(St,y),Nt=q.acquireProgram(St,mt),Ot.set(mt,Nt),F.uniforms=St.uniforms;let Ut=F.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ut.clippingPlanes=st.uniform),rl(b,St),F.needsLights=ll(b),F.lightsStateVersion=ct,F.needsLights&&(Ut.ambientLightColor.value=I.state.ambient,Ut.lightProbe.value=I.state.probe,Ut.directionalLights.value=I.state.directional,Ut.directionalLightShadows.value=I.state.directionalShadow,Ut.spotLights.value=I.state.spot,Ut.spotLightShadows.value=I.state.spotShadow,Ut.rectAreaLights.value=I.state.rectArea,Ut.ltc_1.value=I.state.rectAreaLTC1,Ut.ltc_2.value=I.state.rectAreaLTC2,Ut.pointLights.value=I.state.point,Ut.pointLightShadows.value=I.state.pointShadow,Ut.hemisphereLights.value=I.state.hemi,Ut.directionalShadowMap.value=I.state.directionalShadowMap,Ut.directionalShadowMatrix.value=I.state.directionalShadowMatrix,Ut.spotShadowMap.value=I.state.spotShadowMap,Ut.spotLightMatrix.value=I.state.spotLightMatrix,Ut.spotLightMap.value=I.state.spotLightMap,Ut.pointShadowMap.value=I.state.pointShadowMap,Ut.pointShadowMatrix.value=I.state.pointShadowMatrix),F.currentProgram=Nt,F.uniformsList=null,Nt}function Os(b){if(b.uniformsList===null){let O=b.currentProgram.getUniforms();b.uniformsList=tl.seqWithValue(O.seq,b.uniforms)}return b.uniformsList}function rl(b,O){let z=bt.get(b);z.outputColorSpace=O.outputColorSpace,z.batching=O.batching,z.batchingColor=O.batchingColor,z.instancing=O.instancing,z.instancingColor=O.instancingColor,z.instancingMorph=O.instancingMorph,z.skinning=O.skinning,z.morphTargets=O.morphTargets,z.morphNormals=O.morphNormals,z.morphColors=O.morphColors,z.morphTargetsCount=O.morphTargetsCount,z.numClippingPlanes=O.numClippingPlanes,z.numIntersection=O.numClipIntersection,z.vertexAlphas=O.vertexAlphas,z.vertexTangents=O.vertexTangents,z.toneMapping=O.toneMapping}function Cr(b,O,z,F,I){O.isScene!==!0&&(O=Ct),Vt.resetTextureUnits();let nt=O.fog,ct=F.isMeshStandardMaterial?O.environment:null,St=D===null?y.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:sa,mt=(F.isMeshStandardMaterial?Ae:_e).get(F.envMap||ct),Ot=F.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Nt=!!z.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),Ut=!!z.morphAttributes.position,Zt=!!z.morphAttributes.normal,he=!!z.morphAttributes.color,Y=za;F.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(Y=y.toneMapping);let j=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,gt=j!==void 0?j.length:0,ot=bt.get(F),Kt=f.state.lights;if(se===!0&&(X===!0||b!==S)){let ne=b===S&&F.id===E;st.setState(F,b,ne)}let zt=!1;F.version===ot.__version?(ot.needsLights&&ot.lightsStateVersion!==Kt.state.version||ot.outputColorSpace!==St||I.isBatchedMesh&&ot.batching===!1||!I.isBatchedMesh&&ot.batching===!0||I.isBatchedMesh&&ot.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&ot.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&ot.instancing===!1||!I.isInstancedMesh&&ot.instancing===!0||I.isSkinnedMesh&&ot.skinning===!1||!I.isSkinnedMesh&&ot.skinning===!0||I.isInstancedMesh&&ot.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&ot.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&ot.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&ot.instancingMorph===!1&&I.morphTexture!==null||ot.envMap!==mt||F.fog===!0&&ot.fog!==nt||ot.numClippingPlanes!==void 0&&(ot.numClippingPlanes!==st.numPlanes||ot.numIntersection!==st.numIntersection)||ot.vertexAlphas!==Ot||ot.vertexTangents!==Nt||ot.morphTargets!==Ut||ot.morphNormals!==Zt||ot.morphColors!==he||ot.toneMapping!==Y||ot.morphTargetsCount!==gt)&&(zt=!0):(zt=!0,ot.__version=F.version);let Ne=ot.currentProgram;zt===!0&&(Ne=Dn(F,O,I));let ri=!1,je=!1,Ti=!1,ce=Ne.getUniforms(),$e=ot.uniforms;if(yt.useProgram(Ne.program)&&(ri=!0,je=!0,Ti=!0),F.id!==E&&(E=F.id,je=!0),ri||S!==b){yt.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),ce.setValue(R,"projectionMatrix",b.projectionMatrix),ce.setValue(R,"viewMatrix",b.matrixWorldInverse);let re=ce.map.cameraPosition;re!==void 0&&re.setValue(R,lt.setFromMatrixPosition(b.matrixWorld)),wt.logarithmicDepthBuffer&&ce.setValue(R,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&ce.setValue(R,"isOrthographic",b.isOrthographicCamera===!0),S!==b&&(S=b,je=!0,Ti=!0)}if(I.isSkinnedMesh){ce.setOptional(R,I,"bindMatrix"),ce.setOptional(R,I,"bindMatrixInverse");let ne=I.skeleton;ne&&(ne.boneTexture===null&&ne.computeBoneTexture(),ce.setValue(R,"boneTexture",ne.boneTexture,Vt))}I.isBatchedMesh&&(ce.setOptional(R,I,"batchingTexture"),ce.setValue(R,"batchingTexture",I._matricesTexture,Vt),ce.setOptional(R,I,"batchingIdTexture"),ce.setValue(R,"batchingIdTexture",I._indirectTexture,Vt),ce.setOptional(R,I,"batchingColorTexture"),I._colorsTexture!==null&&ce.setValue(R,"batchingColorTexture",I._colorsTexture,Vt));let Ve=z.morphAttributes;if((Ve.position!==void 0||Ve.normal!==void 0||Ve.color!==void 0)&&et.update(I,z,Ne),(je||ot.receiveShadow!==I.receiveShadow)&&(ot.receiveShadow=I.receiveShadow,ce.setValue(R,"receiveShadow",I.receiveShadow)),F.isMeshGouraudMaterial&&F.envMap!==null&&($e.envMap.value=mt,$e.flipEnvMap.value=mt.isCubeTexture&&mt.isRenderTargetTexture===!1?-1:1),F.isMeshStandardMaterial&&F.envMap===null&&O.environment!==null&&($e.envMapIntensity.value=O.environmentIntensity),je&&(ce.setValue(R,"toneMappingExposure",y.toneMappingExposure),ot.needsLights&&ol($e,Ti),nt&&F.fog===!0&&$.refreshFogUniforms($e,nt),$.refreshMaterialUniforms($e,F,V,at,f.state.transmissionRenderTarget[b.id]),tl.upload(R,Os(ot),$e,Vt)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(tl.upload(R,Os(ot),$e,Vt),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&ce.setValue(R,"center",I.center),ce.setValue(R,"modelViewMatrix",I.modelViewMatrix),ce.setValue(R,"normalMatrix",I.normalMatrix),ce.setValue(R,"modelMatrix",I.matrixWorld),F.isShaderMaterial||F.isRawShaderMaterial){let ne=F.uniformsGroups;for(let re=0,Vn=ne.length;re<Vn;re++){let Is=ne[re];kt.update(Is,Ne),kt.bind(Is,Ne)}}return Ne}function ol(b,O){b.ambientLightColor.needsUpdate=O,b.lightProbe.needsUpdate=O,b.directionalLights.needsUpdate=O,b.directionalLightShadows.needsUpdate=O,b.pointLights.needsUpdate=O,b.pointLightShadows.needsUpdate=O,b.spotLights.needsUpdate=O,b.spotLightShadows.needsUpdate=O,b.rectAreaLights.needsUpdate=O,b.hemisphereLights.needsUpdate=O}function ll(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(b,O,z){let F=bt.get(b);F.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,F.__autoAllocateDepthBuffer===!1&&(F.__useRenderToTexture=!1),bt.get(b.texture).__webglTexture=O,bt.get(b.depthTexture).__webglTexture=F.__autoAllocateDepthBuffer?void 0:z,F.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,O){let z=bt.get(b);z.__webglFramebuffer=O,z.__useDefaultFramebuffer=O===void 0};let Qd=R.createFramebuffer();this.setRenderTarget=function(b,O=0,z=0){D=b,C=O,w=z;let F=!0,I=null,nt=!1,ct=!1;if(b){let mt=bt.get(b);if(mt.__useDefaultFramebuffer!==void 0)yt.bindFramebuffer(R.FRAMEBUFFER,null),F=!1;else if(mt.__webglFramebuffer===void 0)Vt.setupRenderTarget(b);else if(mt.__hasExternalTextures)Vt.rebindTextures(b,bt.get(b.texture).__webglTexture,bt.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Ut=b.depthTexture;if(mt.__boundDepthTexture!==Ut){if(Ut!==null&&bt.has(Ut)&&(b.width!==Ut.image.width||b.height!==Ut.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Vt.setupDepthRenderbuffer(b)}}let Ot=b.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(ct=!0);let Nt=bt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Nt[O])?I=Nt[O][z]:I=Nt[O],nt=!0):b.samples>0&&Vt.useMultisampledRTT(b)===!1?I=bt.get(b).__webglMultisampledFramebuffer:Array.isArray(Nt)?I=Nt[z]:I=Nt,U.copy(b.viewport),B.copy(b.scissor),H=b.scissorTest}else U.copy(Rt).multiplyScalar(V).floor(),B.copy(Yt).multiplyScalar(V).floor(),H=pe;if(z!==0&&(I=Qd),yt.bindFramebuffer(R.FRAMEBUFFER,I)&&F&&yt.drawBuffers(b,I),yt.viewport(U),yt.scissor(B),yt.setScissorTest(H),nt){let mt=bt.get(b.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+O,mt.__webglTexture,z)}else if(ct){let mt=O;for(let Ot=0;Ot<b.textures.length;Ot++){let Nt=bt.get(b.textures[Ot]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+Ot,Nt.__webglTexture,z,mt)}}else if(b!==null&&z!==0){let mt=bt.get(b.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,mt.__webglTexture,z)}E=-1},this.readRenderTargetPixels=function(b,O,z,F,I,nt,ct,St=0){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let mt=bt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ct!==void 0&&(mt=mt[ct]),mt){yt.bindFramebuffer(R.FRAMEBUFFER,mt);try{let Ot=b.textures[St],Nt=Ot.format,Ut=Ot.type;if(!wt.textureFormatReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!wt.textureTypeReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=b.width-F&&z>=0&&z<=b.height-I&&(b.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+St),R.readPixels(O,z,F,I,vt.convert(Nt),vt.convert(Ut),nt))}finally{let Ot=D!==null?bt.get(D).__webglFramebuffer:null;yt.bindFramebuffer(R.FRAMEBUFFER,Ot)}}},this.readRenderTargetPixelsAsync=async function(b,O,z,F,I,nt,ct,St=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let mt=bt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ct!==void 0&&(mt=mt[ct]),mt)if(O>=0&&O<=b.width-F&&z>=0&&z<=b.height-I){yt.bindFramebuffer(R.FRAMEBUFFER,mt);let Ot=b.textures[St],Nt=Ot.format,Ut=Ot.type;if(!wt.textureFormatReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!wt.textureTypeReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Zt=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Zt),R.bufferData(R.PIXEL_PACK_BUFFER,nt.byteLength,R.STREAM_READ),b.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+St),R.readPixels(O,z,F,I,vt.convert(Nt),vt.convert(Ut),0);let he=D!==null?bt.get(D).__webglFramebuffer:null;yt.bindFramebuffer(R.FRAMEBUFFER,he);let Y=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await Jb(R,Y,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Zt),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,nt),R.deleteBuffer(Zt),R.deleteSync(Y),nt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,O=null,z=0){let F=Math.pow(2,-z),I=Math.floor(b.image.width*F),nt=Math.floor(b.image.height*F),ct=O!==null?O.x:0,St=O!==null?O.y:0;Vt.setTexture2D(b,0),R.copyTexSubImage2D(R.TEXTURE_2D,z,0,0,ct,St,I,nt),yt.unbindTexture()};let au=R.createFramebuffer(),cl=R.createFramebuffer();this.copyTextureToTexture=function(b,O,z=null,F=null,I=0,nt=null){nt===null&&(I!==0?(Go("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),nt=I,I=0):nt=0);let ct,St,mt,Ot,Nt,Ut,Zt,he,Y,j=b.isCompressedTexture?b.mipmaps[nt]:b.image;if(z!==null)ct=z.max.x-z.min.x,St=z.max.y-z.min.y,mt=z.isBox3?z.max.z-z.min.z:1,Ot=z.min.x,Nt=z.min.y,Ut=z.isBox3?z.min.z:0;else{let Ve=Math.pow(2,-I);ct=Math.floor(j.width*Ve),St=Math.floor(j.height*Ve),b.isDataArrayTexture?mt=j.depth:b.isData3DTexture?mt=Math.floor(j.depth*Ve):mt=1,Ot=0,Nt=0,Ut=0}F!==null?(Zt=F.x,he=F.y,Y=F.z):(Zt=0,he=0,Y=0);let gt=vt.convert(O.format),ot=vt.convert(O.type),Kt;O.isData3DTexture?(Vt.setTexture3D(O,0),Kt=R.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(Vt.setTexture2DArray(O,0),Kt=R.TEXTURE_2D_ARRAY):(Vt.setTexture2D(O,0),Kt=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,O.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,O.unpackAlignment);let zt=R.getParameter(R.UNPACK_ROW_LENGTH),Ne=R.getParameter(R.UNPACK_IMAGE_HEIGHT),ri=R.getParameter(R.UNPACK_SKIP_PIXELS),je=R.getParameter(R.UNPACK_SKIP_ROWS),Ti=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,j.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,j.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Ot),R.pixelStorei(R.UNPACK_SKIP_ROWS,Nt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Ut);let ce=b.isDataArrayTexture||b.isData3DTexture,$e=O.isDataArrayTexture||O.isData3DTexture;if(b.isDepthTexture){let Ve=bt.get(b),ne=bt.get(O),re=bt.get(Ve.__renderTarget),Vn=bt.get(ne.__renderTarget);yt.bindFramebuffer(R.READ_FRAMEBUFFER,re.__webglFramebuffer),yt.bindFramebuffer(R.DRAW_FRAMEBUFFER,Vn.__webglFramebuffer);for(let Is=0;Is<mt;Is++)ce&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,bt.get(b).__webglTexture,I,Ut+Is),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,bt.get(O).__webglTexture,nt,Y+Is)),R.blitFramebuffer(Ot,Nt,ct,St,Zt,he,ct,St,R.DEPTH_BUFFER_BIT,R.NEAREST);yt.bindFramebuffer(R.READ_FRAMEBUFFER,null),yt.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(I!==0||b.isRenderTargetTexture||bt.has(b)){let Ve=bt.get(b),ne=bt.get(O);yt.bindFramebuffer(R.READ_FRAMEBUFFER,au),yt.bindFramebuffer(R.DRAW_FRAMEBUFFER,cl);for(let re=0;re<mt;re++)ce?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Ve.__webglTexture,I,Ut+re):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Ve.__webglTexture,I),$e?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,ne.__webglTexture,nt,Y+re):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,ne.__webglTexture,nt),I!==0?R.blitFramebuffer(Ot,Nt,ct,St,Zt,he,ct,St,R.COLOR_BUFFER_BIT,R.NEAREST):$e?R.copyTexSubImage3D(Kt,nt,Zt,he,Y+re,Ot,Nt,ct,St):R.copyTexSubImage2D(Kt,nt,Zt,he,Ot,Nt,ct,St);yt.bindFramebuffer(R.READ_FRAMEBUFFER,null),yt.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else $e?b.isDataTexture||b.isData3DTexture?R.texSubImage3D(Kt,nt,Zt,he,Y,ct,St,mt,gt,ot,j.data):O.isCompressedArrayTexture?R.compressedTexSubImage3D(Kt,nt,Zt,he,Y,ct,St,mt,gt,j.data):R.texSubImage3D(Kt,nt,Zt,he,Y,ct,St,mt,gt,ot,j):b.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,nt,Zt,he,ct,St,gt,ot,j.data):b.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,nt,Zt,he,j.width,j.height,gt,j.data):R.texSubImage2D(R.TEXTURE_2D,nt,Zt,he,ct,St,gt,ot,j);R.pixelStorei(R.UNPACK_ROW_LENGTH,zt),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Ne),R.pixelStorei(R.UNPACK_SKIP_PIXELS,ri),R.pixelStorei(R.UNPACK_SKIP_ROWS,je),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Ti),nt===0&&O.generateMipmaps&&R.generateMipmap(Kt),yt.unbindTexture()},this.initRenderTarget=function(b){bt.get(b).__webglFramebuffer===void 0&&Vt.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Vt.setTextureCube(b,0):b.isData3DTexture?Vt.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Vt.setTexture2DArray(b,0):Vt.setTexture2D(b,0),yt.unbindTexture()},this.resetState=function(){C=0,w=0,D=null,yt.reset(),ht.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let n=this.getContext();n.drawingBufferColorSpace=oe._getDrawingBufferColorSpace(t),n.unpackColorSpace=oe._getUnpackColorSpace()}};var I1=Ps($c(),1);var Tr=400,nl=160,tu=80,eu=1500,iu=8,D1=["straight","gentle","winding","hills","racing","deep"],U1={dark:{background:"transparent",road:"#08080a",lines:"#25252d",tail:["#d856bf","#6750a2","#c247ac"],head:["#03b3c3","#0e5ea5","#324555"],poles:["#03b3c3"],dust:"#ffffff"},light:{background:"transparent",road:"#efeff2",lines:"#d0d0d7",tail:["#d856bf","#6750a2","#c247ac"],head:["#03b3c3","#0e5ea5","#324555"],poles:["#03b3c3"],dust:"#18181b"}},Jd=`
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
`,CD=`
  ${Jd}
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
  uniform vec3 uColors[${iu}];
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
`,RD=`
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
`,DD=`
  ${Jd}
  attribute vec4 aSeed;
  attribute float aIndex;
  attribute float aSide;
  uniform float uTravel;
  uniform float uCount;
  uniform float uEdge;
  uniform float uHeight;
  uniform float uRadiusScale;
  uniform float uMirror;
  uniform vec3 uColors[${iu}];
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
`,UD=`
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
`,ND=`
  ${Jd}
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
`,LD=`
  uniform vec3 uColor;
  uniform float uIntensity;
  varying float vAlpha;
  void main() {
    gl_FragColor = vec4(uColor, vAlpha * uIntensity);
  }
`,OD=`
  ${Jd}
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
`,ID=`
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
`,PD=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,BD=`
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
`,L1=`
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
`,zD=`
  ${L1}
  void main() {
    gl_FragColor = tent();
  }
`,FD=`
  ${L1}
  uniform float uStrength;
  uniform float uCeiling;
  uniform float uLight;
  void main() {
    vec4 color = tent() * uStrength;
    float peak = max(uLight > 0.5 ? color.a : max(color.r, max(color.g, color.b)), 0.0001);
    color *= uCeiling * (1.0 - exp(-peak / uCeiling)) / peak;
    gl_FragColor = uLight > 0.5 ? color : vec4(color.rgb, 0.0);
  }
`,il=null,nu=e=>{if(il=il??document.createElement("canvas").getContext("2d"),!il)return[1,1,1];il.fillStyle="#000000",il.fillStyle=e;let t=String(il.fillStyle);if(t.startsWith("#")){let i=parseInt(t.slice(1,7),16);return[(i>>16&255)/255,(i>>8&255)/255,(i&255)/255]}let n=t.match(/[\d.]+/g)?.map(Number)??[0,0,0];return[n[0]/255,n[1]/255,n[2]/255]},vv=(e,t,n)=>{let i=n.length?n:["#ffffff"];for(let a=0;a<iu;a++)e.value[a].fromArray(nu(i[a%i.length]));t.value=Math.min(i.length,iu)},N1=e=>{let t=new Gc;return t.setIndex(e.index),Object.entries(e.attributes).forEach(([n,i])=>t.setAttribute(n,i)),t},al=e=>Math.sin(e)*.5+.5,Wd=(e,t)=>Math.cos(Math.PI*e*4+t)*25+Math.cos(Math.PI*e*8+t*2)**2*5,qd=(e,t)=>-al(Math.PI*e*8+t)*10-al(Math.PI*e+t/8)**5*10,Yd=(e,t)=>Math.sin(e*Math.PI*4+t)*10,Zd=(e,t)=>Math.abs(e*10)**2+Math.sin(e*Math.PI*8+t)*20,HD=(e,t)=>{let{PI:n,cos:i,sin:a}=Math;return[[i(e*n*5+t)*25-i(.02*n*5+t)*25,a(e*n*2+n*.5+t)*15-a(.02*n*2+n*.5+t)*15,0],[Wd(e,t)-Wd(.0125,t),qd(e,t)-qd(.0125,t),0],[i(e*n*3+t)*30-i(.02*n*3+t)*30,al(e*n*6+t)*30-al(.02*n*6+t)*30,al(e*n*10+t)*20-al(.02*n*10+t)*20],[a(e*n*2+t)*35-a(.0125*n*2+t)*35,a(e*n*3+t)*10-a(.0125*n*3+t)*10,0],[Yd(e,t)-Yd(.02,t),Zd(e,t)-Zd(.02,t),0]]},VD=(e,t)=>{let[i,,a,s]=HD(.025,e);return[[i[0]*t*2,i[1]*t*.4,-3],[(Wd(.025,e)-Wd(.025+.007,e))*t*-2,(qd(.025,e)-qd(.025+.007,e))*t*-5,-10],[a[0]*t*2,a[1]*t*2,a[2]*t*2-5],[s[0]*t,s[1]*t,-5],[(Yd(.025,e)-Yd(.025+.01,e))*t*-2,(Zd(.025,e)-Zd(.025+.01,e))*t*-4,-10]]},GD=({curve:e="winding",curvature:t=1,speed:n=1,boost:i=3,fov:a=90,boostFov:s=130,lanes:r=3,roadWidth:o=10,medianWidth:l=2,density:c=40,trailLength:h=1,lightSize:d=1,poles:u=20,poleHeight:p=1,dust:g=100,dustColor:x,glow:m=.6,reflections:f=.5,steer:v=.35,tailColors:_,headColors:y,poleColors:T,roadColor:C,roadOpacity:w=.1,lineColor:D,background:E,fogNear:S=Tr*.22,fogFar:U=Tr*.95,theme:B="dark",interactive:H=!0,boosting:k=!1,onBoostStart:J,onBoostEnd:W,paused:at=!1,managedPlaybackInput:V=!1,onUnavailable:ut,onReady:pt,className:Rt="",style:Yt})=>{let pe=(0,Ar.useRef)(null),le=U1[B]??U1.dark,se={light:B==="light",curve:D1.includes(e)?e:"winding",curvature:Math.max(0,t),speed:Math.max(0,n),boost:Math.max(1,i),fov:Math.min(170,Math.max(20,a)),boostFov:Math.min(170,Math.max(20,s)),lanes:Math.max(1,Math.round(r)),roadWidth:Math.max(1,o),medianWidth:Math.max(0,l),density:Math.min(nl,Math.max(0,Math.round(c))),trailLength:Math.max(.05,h),lightSize:Math.max(.1,d),poles:Math.min(tu,Math.max(0,Math.round(u))),poleHeight:Math.max(.1,p),dust:Math.min(eu,Math.max(0,Math.round(g))),glow:Math.max(0,m),reflections:Math.max(0,f),steer:Math.max(0,v),tailColors:_?.length?_:le.tail,headColors:y?.length?y:le.head,poleColors:T?.length?T:le.poles,roadColor:C??le.road,roadOpacity:Math.min(1,Math.max(0,w)),lineColor:D??le.lines,background:E??le.background,fogNear:S,fogFar:U,dustColor:x??le.dust,interactive:H,boosting:k,paused:at,managedPlaybackInput:V},X=(0,Ar.useRef)(se);X.current=se;let Q=(0,Ar.useRef)({onBoostStart:J,onBoostEnd:W,onUnavailable:ut,onReady:pt});return Q.current={onBoostStart:J,onBoostEnd:W,onUnavailable:ut,onReady:pt},(0,Ar.useEffect)(()=>{let lt=pe.current;if(!lt)return;let Bt=window.matchMedia?.("(prefers-reduced-motion: reduce)"),Ct=Bt?.matches??!1,Mt;try{Mt=new Gd({antialias:!1,alpha:!0,powerPreference:"low-power"})}catch{Q.current.onUnavailable?.();return}Mt.outputColorSpace=sa,Mt.autoClear=!1;let qe=()=>Math.min(window.devicePixelRatio||1,window.matchMedia("(max-width: 760px)").matches?1:1.5);Mt.setPixelRatio(qe()),lt.appendChild(Mt.domElement);let R=new qo,Qt=new Mn(X.current.fov,1,.1,1e4);Qt.position.set(0,8,-5);let Dt={uTime:{value:0},uCurvature:{value:1},uCurveA:{value:new Ie},uCurveB:{value:0},uFogNear:{value:Tr*.22},uFogFar:{value:Tr*.95},uTravel:{value:Tr},uStretch:{value:0},uPixel:{value:.001}},wt=[],yt=[],ve=(Y,j,gt,ot={})=>{let Kt=new Hn({vertexShader:Y,fragmentShader:j,uniforms:{...Dt,...gt},transparent:!0,depthWrite:!1,...ot});return wt.push(Kt),Kt},bt=()=>({value:Array.from({length:iu},()=>new L(1,1,1))}),Vt=new Cs(1,Tr,1,220);Vt.rotateX(-Math.PI/2),Vt.translate(0,0,-Tr/2),wt.push(Vt);let _e={uWidth:{value:1},uRoadColor:{value:new L},uLineColor:{value:new L},uBackground:{value:new L},uRoadWidth:{value:10},uMedian:{value:2},uLanes:{value:3},uTransparent:{value:0},uOpacity:{value:1}},Ae=ve(OD,ID,_e,{transparent:!0,depthWrite:!0}),A=new gn(Vt,Ae);A.frustumCulled=!1,A.renderOrder=0,A.layers.enable(1),R.add(A);let M=new Hc(new Yo(new L(0,0,0),new L(0,0,-1)),24,1,7,!1);wt.push(M);let P=(Y,j,gt)=>{let ot=N1(M),Kt=new Float32Array(nl*2*4),zt=new Float32Array(nl*2*4),Ne=new Float32Array(nl*2),ri=new Float32Array(nl*2);for(let ce=0;ce<nl;ce++){let $e=[Math.random(),Math.random(),Math.random(),Math.random()],Ve=[Math.random(),Math.random(),Math.random(),Math.random()*Math.random()],ne=Math.random();for(let re=0;re<2;re++){let Vn=ce*2+re;Kt.set($e,Vn*4),zt.set(Ve,Vn*4),Ne[Vn]=re?.5:-.5,ri[Vn]=ne}}ot.setAttribute("aSeedA",new Bi(Kt,4)),ot.setAttribute("aSeedB",new Bi(zt,4)),ot.setAttribute("aPair",new Bi(Ne,1)),ot.setAttribute("aTone",new Bi(ri,1)),ot.instanceCount=0,wt.push(ot);let je={uRoadX:{value:0},uRoadWidth:{value:10},uLanes:{value:3},uDirection:{value:Y},uSpeedRange:{value:new It(...gt)},uTrail:{value:1},uSize:{value:1},uColors:bt(),uColorCount:{value:1},uFade:{value:new It(...j)}},Ti=(ce,$e,Ve,ne)=>{let re=ve(CD,RD,{...je,uRadiusScale:{value:ce},uSharp:{value:$e},uMirror:{value:Ve},uIntensity:{value:1},uCore:{value:0}},{depthTest:!Ve});yt.push(re);let Vn=new gn(ot,re);return Vn.frustumCulled=!1,Vn.renderOrder=ne,Ve||Vn.layers.enable(1),R.add(Vn),re};return{geometry:ot,uniforms:je,reflection:Ti(2.1,1.2,1,1),core:Ti(1,.85,0,3)}},q=P(1,[0,.6],[60,80]),$=P(-1,[1,.4],[120,160]),G=new Bc(1,1,1,8,1,!0);wt.push(G);let xt=N1(G),st=new Float32Array(tu*2*4),Tt=new Float32Array(tu*2),At=new Float32Array(tu*2);for(let Y=0;Y<tu;Y++)for(let j=0;j<2;j++){let gt=Y*2+j;st.set([Math.random(),Math.random(),Math.random(),Math.random()],gt*4),Tt[gt]=Y+(j?.5:0),At[gt]=j?1:-1}xt.setAttribute("aSeed",new Bi(st,4)),xt.setAttribute("aIndex",new Bi(Tt,1)),xt.setAttribute("aSide",new Bi(At,1)),xt.instanceCount=0,wt.push(xt);let et={uCount:{value:20},uEdge:{value:11},uHeight:{value:1},uColors:bt(),uColorCount:{value:1}},dt=(Y,j,gt,ot)=>{let Kt=ve(DD,UD,{...et,uRadiusScale:{value:Y},uSharp:{value:j},uMirror:{value:gt},uIntensity:{value:1},uCore:{value:0}},{depthTest:!gt});yt.push(Kt);let zt=new gn(xt,Kt);return zt.frustumCulled=!1,zt.renderOrder=ot,gt||zt.layers.enable(1),R.add(zt),Kt},Lt={reflection:dt(2.4,1.2,1,1),core:dt(1,.8,0,3)},vt=new Fn,ht=new Float32Array(eu*2*4),kt=new Float32Array(eu*2);for(let Y=0;Y<eu;Y++){let j=[Math.random(),Math.random(),Math.random(),Math.random()];ht.set(j,Y*8),ht.set(j,Y*8+4),kt[Y*2+1]=1}vt.setAttribute("position",new rn(new Float32Array(eu*2*3),3)),vt.setAttribute("aSeed",new rn(ht,4)),vt.setAttribute("aEnd",new rn(kt,1)),vt.setDrawRange(0,0),wt.push(vt);let N={uSpread:{value:140},uColor:{value:new L(1,1,1)},uIntensity:{value:.5}},it=ve(ND,LD,N);yt.push(it);let rt=new Oc(vt,it);rt.frustumCulled=!1,rt.renderOrder=4,R.add(rt);let _t=Mt.extensions.has("EXT_color_buffer_float")||Mt.extensions.has("EXT_color_buffer_half_float"),tt=Array.from({length:5},(Y,j)=>{let gt=new yi(1,1,{type:_t?Ls:Si,depthBuffer:j===0});return wt.push(gt),gt}),K=new qo,Et=new Zo(-1,1,1,-1,0,1),Ht=new Cs(2,2);wt.push(Ht);let me=new gn(Ht);me.frustumCulled=!1,K.add(me);let ie=(Y,j)=>{let gt=new Hn({vertexShader:PD,fragmentShader:Y,uniforms:{uTexture:{value:null},uTexel:{value:new It},uStrength:{value:1},uCeiling:{value:1},uLight:{value:0}},depthTest:!1,depthWrite:!1,...j});return wt.push(gt),gt},bi=ie(BD,{blending:zi}),si=ie(zD,{blending:Xc,blendSrc:Fi,blendDst:Fi,blendSrcAlpha:Fi,blendDstAlpha:Fi}),Hi=ie(FD,{blending:Xc,blendSrc:Fi}),Ei=(Y,j,gt)=>{me.material=Y,Y.uniforms.uTexture.value=j.texture,Y.uniforms.uTexel.value.set(1/j.width,1/j.height),Mt.setRenderTarget(gt),Mt.render(K,Et)},wr=new ae,sl=0,Pt={boost:0,held:!1,boosted:!1,fov:X.current.fov,fovVelocity:0,steerX:0,steerY:0,pointerX:0,pointerY:0,weights:[0,0,0,0,0],visible:!0},ln={tail:"",head:"",poles:"",surface:"",light:null},Vi=new L,Dn=0,Os=performance.now(),rl=window.matchMedia("(max-width: 760px)").matches?1e3/30:1e3/60,Cr=!0,ol=!0,ll,Qd=Y=>{let j=Y.tailColors.join();j!==ln.tail&&(ln.tail=j,vv(q.uniforms.uColors,q.uniforms.uColorCount,Y.tailColors));let gt=Y.headColors.join();gt!==ln.head&&(ln.head=gt,vv($.uniforms.uColors,$.uniforms.uColorCount,Y.headColors));let ot=Y.poleColors.join();ot!==ln.poles&&(ln.poles=ot,vv(et.uColors,et.uColorCount,Y.poleColors));let Kt=[Y.roadColor,Y.lineColor,Y.background,Y.dustColor].join();if(Kt!==ln.surface){ln.surface=Kt,_e.uRoadColor.value.fromArray(nu(Y.roadColor)),_e.uLineColor.value.fromArray(nu(Y.lineColor)),N.uColor.value.fromArray(nu(Y.dustColor));let zt=Y.background==="transparent",Ne=zt?[0,0,0]:nu(Y.background);_e.uBackground.value.fromArray(Ne),_e.uTransparent.value=zt?1:0,wr.setRGB(...Ne,sa),sl=zt?0:1}if(Dt.uFogNear.value=Y.fogNear,Dt.uFogFar.value=Y.fogFar,ln.light!==Y.light){let zt=ln.light!==null;ln.light=Y.light,yt.forEach(Ne=>{Ne.blending=Y.light?Ia:kc,Ne.needsUpdate=!0}),Hi.blendDst=Y.light?pr:Fi,Hi.blendSrcAlpha=Y.light?Fi:Yf,Hi.blendDstAlpha=Y.light?pr:Fi,Hi.uniforms.uLight.value=Y.light?1:0,zt&&(ll?.cancel(),Bt?.matches||(ll=Mt.domElement.animate?.([{opacity:0},{opacity:1}],{duration:240,easing:"ease-out"})))}},au=Y=>{Qd(Y);let j=.45+.55*Y.roadOpacity;for(let gt of[q,$])gt.core.uniforms.uIntensity.value=Y.light?.95:1+.35*Pt.boost,gt.core.uniforms.uCore.value=Y.light?0:.75,gt.reflection.uniforms.uIntensity.value=Y.reflections*(Y.light?.22:.42)*j;if(Lt.core.uniforms.uIntensity.value=Y.light?.9:1,Lt.core.uniforms.uCore.value=Y.light?0:.6,Lt.reflection.uniforms.uIntensity.value=Y.reflections*(Y.light?.2:.38)*j,N.uIntensity.value=(Y.light?.35:.45)*(1+Pt.boost),_e.uOpacity.value=Y.roadOpacity,Ae.depthWrite=Y.roadOpacity>.5,Mt.setRenderTarget(null),Mt.setClearColor(wr,sl),Mt.clear(),Mt.render(R,Qt),Y.glow>0){let gt=Dt.uPixel.value;Dt.uPixel.value=gt*(Mt.domElement.height/tt[0].height),Qt.layers.set(1),Ae.colorWrite=!1,Mt.setRenderTarget(tt[0]),Mt.setClearColor(0,0),Mt.clear(),Mt.render(R,Qt),Ae.colorWrite=!0,Qt.layers.set(0),Dt.uPixel.value=gt;for(let ot=1;ot<tt.length;ot++)Ei(bi,tt[ot-1],tt[ot]);for(let ot=tt.length-1;ot>1;ot--)Ei(si,tt[ot],tt[ot-1]);Hi.uniforms.uStrength.value=Y.glow*(Y.light?.5:1.4),Hi.uniforms.uCeiling.value=Y.glow*(Y.light?.3:.5),Ei(Hi,tt[1],null)}},cl=!1,b=()=>{rl=window.matchMedia("(max-width: 760px)").matches?1e3/30:1e3/60,Mt.setPixelRatio(qe());let Y=Math.max(1,lt.clientWidth),j=Math.max(1,lt.clientHeight);Mt.setSize(Y,j,!1),tt.forEach((gt,ot)=>gt.setSize(Math.max(1,Math.round(Y/2**(ot+1))),Math.max(1,Math.round(j/2**(ot+1))))),Qt.aspect=Y/j,Qt.updateProjectionMatrix()},O=()=>{cl=!0,F()},z=Y=>{if(Dn=0,!Cr||!Pt.visible||document.hidden||X.current.paused)return;if(cl&&(cl=!1,b()),Y-Os<rl-1){Dn=requestAnimationFrame(z);return}let j=X.current,gt=Math.min(.05,Math.max(.001,(Y-Os)/1e3));Os=Y;let ot=Pt.held&&j.interactive||j.boosting?1:0;Pt.boost+=(ot-Pt.boost)*(1-Math.exp(-gt/(ot>Pt.boost?.28:.85)));let Kt=j.speed*(Ct?.3:1)*(1+(j.boost-1)*Pt.boost);Dt.uTime.value+=gt*Kt,Dt.uStretch.value=Pt.boost*1.1,Dt.uCurvature.value=j.curvature;let zt=D1.indexOf(j.curve)-1,Ne=1-Math.exp(-gt/.6);Pt.weights=Pt.weights.map((ne,re)=>ne+((re===zt?1:0)-ne)*Ne),Dt.uCurveA.value.set(Pt.weights[0],Pt.weights[1],Pt.weights[2],Pt.weights[3]),Dt.uCurveB.value=Pt.weights[4];let ri=j.roadWidth/2+j.medianWidth/2;[q,$].forEach((ne,re)=>{ne.geometry.instanceCount=j.density*2,ne.uniforms.uRoadX.value=re?ri:-ri,ne.uniforms.uRoadWidth.value=j.roadWidth,ne.uniforms.uLanes.value=j.lanes,ne.uniforms.uTrail.value=j.trailLength,ne.uniforms.uSize.value=j.lightSize}),xt.instanceCount=j.poles*2,et.uCount.value=Math.max(1,j.poles),et.uEdge.value=j.roadWidth+j.medianWidth/2+.8,et.uHeight.value=j.poleHeight,vt.setDrawRange(0,j.dust*2),N.uSpread.value=(j.roadWidth*2+j.medianWidth)*5,_e.uWidth.value=j.roadWidth*2+j.medianWidth+3,_e.uRoadWidth.value=j.roadWidth,_e.uMedian.value=j.medianWidth,_e.uLanes.value=j.lanes;let je=Ct?j.fov:j.fov+(j.boostFov-j.fov)*Pt.boost;Pt.fovVelocity+=((je-Pt.fov)*90-Pt.fovVelocity*13)*gt,Pt.fov+=Pt.fovVelocity*gt,Qt.fov=Pt.fov,Dt.uPixel.value=2*Math.tan(Pt.fov*Math.PI/360)/Math.max(1,Mt.domElement.height);let Ti=1-Math.exp(-gt/.35),ce=j.interactive?j.steer:0;Pt.steerX+=(Pt.pointerX*ce-Pt.steerX)*Ti,Pt.steerY+=(Pt.pointerY*ce-Pt.steerY)*Ti,Qt.position.set(Pt.steerX*j.roadWidth*.45,8-Pt.steerY*2.5,-5);let $e=VD(Dt.uTime.value,j.curvature),Ve=1-Pt.weights.reduce((ne,re)=>ne+re,0);Vi.set(0,0,-10*Ve),$e.forEach((ne,re)=>{Vi.x+=ne[0]*Pt.weights[re],Vi.y+=ne[1]*Pt.weights[re],Vi.z+=ne[2]*Pt.weights[re]}),Vi.x+=Pt.steerX*2.5,Vi.add(Qt.position),Qt.lookAt(Vi),Qt.updateProjectionMatrix(),au(j),ol&&(ol=!1,Q.current.onReady?.()),Cr&&Pt.visible&&!document.hidden&&!X.current.paused&&(Dn=requestAnimationFrame(z))},F=()=>{Dn||!Cr||!Pt.visible||document.hidden||X.current.paused||(Os=performance.now(),Dn=requestAnimationFrame(z))},I=Y=>{Pt.held!==Y&&(Pt.held=Y,X.current.interactive&&(Y?Q.current.onBoostStart?.():Q.current.onBoostEnd?.()))},nt=Y=>{X.current.managedPlaybackInput||Y.button!==0&&Y.pointerType==="mouse"||I(!0)},ct=()=>I(!1),St=Y=>{let j=lt.getBoundingClientRect();Pt.pointerX=(Y.clientX-j.left)/j.width*2-1,Pt.pointerY=(Y.clientY-j.top)/j.height*2-1},mt=()=>{Pt.pointerX=0,Pt.pointerY=0},Ot=Y=>{X.current.interactive&&!X.current.managedPlaybackInput&&Y.preventDefault()},Nt=()=>{let Y=X.current,j=Pt.visible&&!document.hidden;j&&Y.paused&&!ol&&ln.light!==Y.light&&au(Y),j&&!Y.paused?F():(I(!1),cancelAnimationFrame(Dn),Dn=0)},Ut=()=>Q.current.onUnavailable?.(),Zt=new ResizeObserver(O);Zt.observe(lt);let he=new IntersectionObserver(Y=>{Pt.visible=Y.some(j=>j.isIntersecting),Nt()});return he.observe(lt),lt.addEventListener("pointerdown",nt),lt.addEventListener("pointermove",St),lt.addEventListener("pointerleave",mt),lt.addEventListener("contextmenu",Ot),window.addEventListener("pointerup",ct),window.addEventListener("pointercancel",ct),window.addEventListener("blur",ct),lt.addEventListener("gary:animation-state",Nt),document.addEventListener("visibilitychange",Nt),Mt.domElement.addEventListener("webglcontextlost",Ut),O(),()=>{Cr=!1,ll?.cancel(),cancelAnimationFrame(Dn),Dn=0,Zt.disconnect(),he.disconnect(),lt.removeEventListener("pointerdown",nt),lt.removeEventListener("pointermove",St),lt.removeEventListener("pointerleave",mt),lt.removeEventListener("contextmenu",Ot),window.removeEventListener("pointerup",ct),window.removeEventListener("pointercancel",ct),window.removeEventListener("blur",ct),lt.removeEventListener("gary:animation-state",Nt),document.removeEventListener("visibilitychange",Nt),Mt.domElement.removeEventListener("webglcontextlost",Ut),wt.forEach(Y=>Y.dispose()),Mt.dispose(),Mt.forceContextLoss(),Mt.domElement.remove()}},[]),(0,Ar.useEffect)(()=>{pe.current?.dispatchEvent(new Event("gary:animation-state"))},[at,B]),(0,I1.jsx)("div",{ref:pe,className:`hyperspeed${Rt?` ${Rt}`:""}`,style:Yt})},O1=GD;var _v={curve:"gentle",curvature:1,speed:1,boost:3,fov:90,boostFov:130,lanes:3,roadWidth:9,medianWidth:2,density:30,trailLength:1,lightSize:1,poles:50,dust:100,glow:.6,reflections:.5,roadOpacity:.1,steer:.35,roadColor:"#08080a",lineColor:"#25252d",tailColors:["#7d0d1b","#a90519","#ff102a"],headColors:["#f1eece","#e6e2b1","#dfd98a"],poleColors:["#f1eece"],background:"transparent",theme:"dark",interactive:!0},P1={..._v,theme:"light",background:"#edf6ff",roadColor:"#a6c5e7",roadOpacity:.66,lineColor:"#537faf",fogNear:64,fogFar:310,tailColors:["#1249d7","#245cfc","#3c77d5"],headColors:["#057991","#008bae","#00a7c8"],poleColors:["#197ca9"],dustColor:"#648ec0",glow:.26,reflections:.22};var B1='a,button,input,select,textarea,summary,label,h1,h2,h3,h4,h5,h6,p,dialog,[role="button"],[role="link"],[contenteditable],[data-no-boost]';function z1({hero:e,browser:t=e.ownerDocument.defaultView,document:n=e.ownerDocument,onToggle:i,onBoost:a,isPaused:s,holdMs:r=300,moveTolerance:o=10,now:l=()=>t.performance.now(),setTimer:c=(d,u)=>t.setTimeout(d,u),clearTimer:h=d=>t.clearTimeout(d)}){let d=new Set,u,p=!1,g=!1,x=S=>{g!==S&&(g=S,a(S))},m=()=>{u?.timer!==void 0&&h(u.timer),u=void 0,x(!1)},f=()=>{d.clear(),m()},v=S=>S.pointerId??0,_=S=>u&&Math.hypot(S.clientX-u.x,S.clientY-u.y)>o,y=S=>{d.add(v(S)),(d.size>1||S.isPrimary===!1)&&m()},T=S=>{if(!(p||S.isPrimary===!1||d.size>1)&&!(S.button>0||S.target?.closest?.(B1))){if(u){m();return}u={id:v(S),x:S.clientX,y:S.clientY,started:l(),held:!1},u.timer=c(()=>{!u||p||(u.timer=void 0,u.held=!0,s()||x(!0))},r)}},C=S=>{u?.id!==v(S)||!_(S)||(!u.held||S.pointerType!=="mouse")&&m()},w=S=>{if(d.delete(v(S)),!u||u.id!==v(S))return;let U=!u.held&&l()-u.started<r&&!_(S)&&S.target?.nodeType&&e.contains(S.target)&&!S.target?.closest?.(B1);m(),U&&!p&&i()},D=S=>{d.delete(v(S)),m()},E=()=>{(n.hidden||n.visibilityState==="hidden")&&f()};return t.addEventListener("pointerdown",y,{capture:!0,passive:!0}),e.addEventListener("pointerdown",T,{passive:!0}),e.addEventListener("pointermove",C,{passive:!0}),e.addEventListener("pointerleave",m),t.addEventListener("pointerup",w,{passive:!0}),t.addEventListener("pointercancel",D,{passive:!0}),t.addEventListener("blur",f),n.addEventListener("visibilitychange",E),n.addEventListener("scroll",m,{capture:!0,passive:!0}),{cancel:m,destroy(){p||(p=!0,f(),t.removeEventListener("pointerdown",y,!0),e.removeEventListener("pointerdown",T),e.removeEventListener("pointermove",C),e.removeEventListener("pointerleave",m),t.removeEventListener("pointerup",w),t.removeEventListener("pointercancel",D),t.removeEventListener("blur",f),n.removeEventListener("visibilitychange",E),n.removeEventListener("scroll",m,!0))}}}var Kd=Ps($c(),1),yv=class extends ha.Component{state={failed:!1};static getDerivedStateFromError(){return{failed:!0}}componentDidCatch(){this.props.onUnavailable()}render(){return this.state.failed?null:this.props.children}};function kD({hero:e,theme:t,paused:n,onToggle:i,onUnavailable:a,onReady:s}){let[r,o]=(0,ha.useState)(!1),l=(0,ha.useRef)(n);l.current=n;let c=(0,ha.useRef)(null);return(0,ha.useEffect)(()=>{c.current=z1({hero:e,onToggle:i,onBoost:o,isPaused:()=>l.current});let d=u=>{let p=e.querySelector(".hyperspeed");!p||p.contains(u.target)||p.dispatchEvent(new PointerEvent("pointermove",{clientX:u.clientX,clientY:u.clientY,pointerType:u.pointerType}))};return e.addEventListener("pointermove",d),()=>{c.current?.destroy(),c.current=null,e.removeEventListener("pointermove",d)}},[e,i]),(0,ha.useEffect)(()=>{n&&c.current?.cancel()},[n]),(0,Kd.jsx)(O1,{...t==="light"?P1:_v,managedPlaybackInput:!0,paused:n,boosting:r&&!n,onUnavailable:a,onReady:s})}function RO(e,t,n){let{onUnavailable:i,onReady:a,onToggle:s=()=>{}}=n,r=n.theme??"dark",o=(0,F1.createRoot)(e),l=!1,c=!1,h=()=>o.render((0,Kd.jsx)(yv,{onUnavailable:i,children:(0,Kd.jsx)(kD,{hero:t,theme:r,paused:c,onToggle:s,onUnavailable:i,onReady:a})}));return h(),{setTheme(d){l||r===d||(r=d,h())},setPaused(d){l||c===d||(c=d,h())},unmount(){l||(l=!0,o.unmount(),e.replaceChildren())}}}export{RO as mountHyperspeed};
/*! For license information please see mount-hyperspeed-XVHRVGKC.js.LEGAL.txt */
