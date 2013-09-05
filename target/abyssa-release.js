// abyssa-js 1.1.2
(function(){function i(e){return Object.prototype.toString.call(e)=="[object String]"}function s(){}function o(e){return e.reduce(function(e,t){return e[t]=1,e},{})}function u(e){var t=[];for(var n in e)t.push(e[n]);return t}function a(e){var t={};for(var n in e)t[n]=e[n];return t}function f(e,t){for(var n in t)e[n]=t[n]}function l(e){var t=0;for(var n in e)t++;return t}function c(e,t,n,r){function c(e,t){return u.then(function(){s||e()},function(n){s||t(n)})}function v(){s=!0}var i,s,o,u,a=[],f,l=e==t;return e&&(i=d(e,t,l,r),a=m(e,i,l)),o=m(t,i,l).reverse(),u=h(o,a,n).then(function(){s||p(o,a,n)}),g.newTransitionStarted(),{from:e,to:t,toParams:n,then:c,cancel:v}}function h(e,t,n){return t.forEach(function(e){if(!e.exitPrereqs)return;var t=e._exitPrereqs=r(e.exitPrereqs()).then(function(r){e._exitPrereqs==t&&(e._exitPrereqs.value=r)},function(n){throw new Error("Failed to resolve EXIT prereqs of "+e.fullName)})}),e.forEach(function(e){if(!e.enterPrereqs)return;var t=e._enterPrereqs=r(e.enterPrereqs(n)).then(function(r){e._enterPrereqs==t&&(e._enterPrereqs.value=r)},function(n){throw new Error("Failed to resolve ENTER prereqs of "+e.fullName)})}),r.all(e.concat(t).map(function(e){return e._enterPrereqs||e._exitPrereqs}))}function p(e,t,n){t.forEach(function(e){e.exit(e._exitPrereqs&&e._exitPrereqs.value)}),g.allowed=!0,e.forEach(function(e){e.enter(n,e._enterPrereqs&&e._enterPrereqs.value)}),g.allowed=!1}function d(e,t,n,r){var i,s,o;if(n)e.parents.slice().reverse().forEach(function(e){for(o in r)if(e.params[o]||e.queryParams[o]){i=e;break}});else for(var u=0;u<e.parents.length;u++){s=e.parents[u];if(t.parents.indexOf(s)>-1){i=s;break}}return i}function v(e,t,n){var r=e.parents,i=Math.min(r.length,r.indexOf(t)+(n?1:0));return[e].concat(r.slice(0,i))}function m(e,t,n){var r=!t||n;return v(e,t||e.root,r)}function y(){function u(n,r){t.name=n,t.parent=r,t.parents=f(),t.children=l(),t.fullName=h(),t.root=t.parents[t.parents.length-1],t.async=e.Async,v(function(e,n){n.init(e,t)}),o=!0}function a(){var e=t.path,n=t.parent;while(n)n.path&&(e=n.path+"/"+e),n=n.parent;return e}function f(){var e=[],n=t.parent;while(n)e.push(n),n=n.parent;return e}function l(){var e=[];for(var t in i)e.push(i[t]);return e}function c(e){var t={};for(var n in e)e[n]._isState&&(t[n]=e[n]);return t}function h(){return t.parents.reduceRight(function(e,t){return e+t.name+"."},"")+t.name}function p(e){var t={enter:1,exit:1,enterPrereqs:1,exitPrereqs:1},n={};for(var r in e){if(t[r]||e[r]._isState)continue;n[r]=e[r]}return n}function d(e,n){if(n!==undefined){if(t.ownData[e]!==undefined)throw new Error("State "+t.fullName+" already has data with the key "+e);t.ownData[e]=n;return}var r=t;while(r.ownData[e]===undefined&&r.parent)r=r.parent;return r.ownData[e]}function v(e){for(var t in i)e(t,i[t])}function m(e,t){if(o)throw new Error("States can only be added before the Router is initialized");if(i[e])throw new Error("The state {0} already has a child state named {1}".replace("{0}",t.name).replace("{1}",e));i[e]=t}function g(){return t.fullName}var t={_isState:!0},n=b(arguments),r=n.options,i=c(n.options),o;return t.path=n.path,t.params=n.params,t.queryParams=n.queryParams,t.states=i,t.enter=r.enter||s,t.exit=r.exit||s,t.enterPrereqs=r.enterPrereqs,t.exitPrereqs=r.exitPrereqs,t.ownData=p(r),t.init=u,t.fullPath=a,t.data=d,t.addState=m,t.toString=g,t}function b(e){var t={path:"",options:{},params:{},queryParams:{}},n=e[0],r=e[1],s,u;return e.length==1?i(n)?t.path=n:t.options=n:e.length==2&&(t.path=n,t.options=typeof r=="object"?r:{enter:r}),s=t.path.indexOf("?"),s!=-1&&(t.queryParams=t.path.slice(s+1),t.path=t.path.slice(0,s),t.queryParams=o(t.queryParams.split("&"))),t.path=t.path.replace(/:\w*/g,function(e){return u=e.substring(1),t.params[u]=1,"{"+u+"}"}),t}function w(e){function T(e,t){if(N(e,t))return;v&&(E("Cancelling existing transition from {0} to {1}",v.from,v.to),v.cancel(),r.transition.cancelled.dispatch(v.from,v.to)),S&&E("Starting transition from {0}:{1} to {2}:{3}",p,JSON.stringify(d),e,JSON.stringify(t)),r.transition.started.dispatch(p,e),v=c(p,e,t,C(d,t)),v.then(function(){var i=p,s;p=e,d=t,v=null,!y&&!o&&(s=("/"+h).replace("//","/"),E("Pushing state: {0}",s),history.pushState(s,document.title,s)),E("Transition from {0} to {1} completed",i,e),r.transition.completed.dispatch(i,p),o=!1},function(n){v=null,logError("Transition from {0} to {1} failed: {2}",p,e,n),r.transition.failed.dispatch(p,e)})}function N(e,t){var n,r,i;return v?(n=v.to,r=v.toParams):(n=p,r=d),i=C(r,t),e==n&&l(i)==0}function C(e,t){var n={},e=e||{};for(var r in e)e[r]!=t[r]&&(n[r]=1);for(var r in t)e[r]!=t[r]&&(n[r]=1);return n}function k(e){E("State not found: {0}",e);if(!i.notFound)throw new Error('State "'+e+'" could not be found');T(i.notFound)}function L(e){E("Router init"),A();var t=!w.ignoreInitialURL&&B()||e||"";return E("Initializing to state {0}",t||'""'),_(t),window.onpopstate=function(e){var t=e.state||B();E("Popped state: {0}",t),y=!0,D(t)},b=!0,r}function A(){O(function(e,t){t.init(e)}),m={},M(function(e){m[e.fullName]=e,e.route=s.addRoute(e.fullPath()+":?query:"),e.route.matched.add(function(){g=!0,T(e,j(e,arguments))})})}function O(e){for(var t in i)e(t,i[t])}function M(e){function r(t){t.forEach(function(t){t.children.length?r(t.children):e(t)})}var t,n;r(u(i))}function _(e,t){var n=e.indexOf(".")>-1||m[e];E("Changing state to {0}",e||'""'),y=!1,n?P(e,t||{}):D(e)}function D(e){h=e,g=!1,s.parse(e),g||k(e)}function P(e,t){var n=m[e];if(!n)return k(e);var r=n.route.interpolate(t);D(r)}function H(e,t){if(b)throw new Error("States can only be added before the Router is initialized");if(i[e])throw new Error("A state already exist in the router with the name "+e);E("Adding state {0}",e),i[e]=t}function B(){var e=location.href.indexOf("#/");return e>-1?location.href.slice(e+2):(location.pathname+location.search).slice(1)}function j(e,t){var n=Array.prototype.slice.apply(t),r=n.pop(),i={},s;return e.fullPath().replace(/\{\w*\}/g,function(e){return s=e.slice(1,-1),i[s]=n.shift(),""}),r&&f(i,r),i}function F(e,t){var n={},r={},i=!1,s=m[e];if(!s)throw new Error("Cannot find state "+e);[s].concat(s.parents).forEach(function(e){f(r,e.queryParams)});for(var o in t)r[o]&&(n[o]=t[o],delete t[o],i=!0);return i&&(t.query=n),"/"+s.route.interpolate(t).replace("/?","?")}function I(e,t){r.transition.ended.dispatch(e,t)}var r={},i=a(e),s=n.create(),o=!0,h,p,d,v,m,g,y,b;return s.shouldTypecast=!0,s.ignoreState=!0,x(r),r.init=L,r.state=_,r.addState=H,r.link=F,r.transition={started:new t,ended:new t,completed:new t,failed:new t,cancelled:new t},r.initialized=new t,r.transition.completed.addOnce(function(){r.initialized.dispatch()}),r.transition.completed.add(I),r.transition.failed.add(I),r.transition.cancelled.add(I),r}function x(e){document.addEventListener("click",function(t){if(t.defaultPrevented||t.metaKey||t.ctrlKey||t.button==1)return;var n=T(t.target);if(!n)return;if(n.getAttribute("target")=="_blank")return;if(n.hostname!=location.hostname)return;t.preventDefault(),e.state(n.getAttribute("href"))})}function T(e){while(e){if(e.nodeName=="A")return e;e=e.parentNode}}var e={},t=function(e){function t(e,t,n,r,i){this._listener=t,this._isOnce=n,this.context=r,this._signal=e,this._priority=i||0}function n(e,t){if(typeof e!="function")throw new Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}",t))}function r(){this._bindings=[],this._prevParams=null}t.prototype={active:!0,params:null,execute:function(e){var t,n;return this.active&&!!this._listener&&(n=this.params?this.params.concat(e):e,t=this._listener.apply(this.context,n),this._isOnce&&this.detach()),t},detach:function(){return this.isBound()?this._signal.remove(this._listener,this.context):null},isBound:function(){return!!this._signal&&!!this._listener},getListener:function(){return this._listener},_destroy:function(){delete this._signal,delete this._listener,delete this.context},isOnce:function(){return this._isOnce},toString:function(){return"[SignalBinding isOnce:"+this._isOnce+", isBound:"+this.isBound()+", active:"+this.active+"]"}},r.prototype={VERSION:"0.8.1",memorize:!1,_shouldPropagate:!0,active:!0,_registerListener:function(e,n,r,i){var s=this._indexOfListener(e,r),o;if(s!==-1){o=this._bindings[s];if(o.isOnce()!==n)throw new Error("You cannot add"+(n?"":"Once")+"() then add"+(n?"Once":"")+"() the same listener without removing the relationship first.")}else o=new t(this,e,n,r,i),this._addBinding(o);return this.memorize&&this._prevParams&&o.execute(this._prevParams),o},_addBinding:function(e){var t=this._bindings.length;do--t;while(this._bindings[t]&&e._priority<=this._bindings[t]._priority);this._bindings.splice(t+1,0,e)},_indexOfListener:function(e,t){var n=this._bindings.length,r;while(n--){r=this._bindings[n];if(r._listener===e&&r.context===t)return n}return-1},has:function(e,t){return this._indexOfListener(e,t)!==-1},add:function(e,t,r){return n(e,"add"),this._registerListener(e,!1,t,r)},addOnce:function(e,t,r){return n(e,"addOnce"),this._registerListener(e,!0,t,r)},remove:function(e,t){n(e,"remove");var r=this._indexOfListener(e,t);return r!==-1&&(this._bindings[r]._destroy(),this._bindings.splice(r,1)),e},removeAll:function(){var e=this._bindings.length;while(e--)this._bindings[e]._destroy();this._bindings.length=0},getNumListeners:function(){return this._bindings.length},halt:function(){this._shouldPropagate=!1},dispatch:function(e){if(!this.active)return;var t=Array.prototype.slice.call(arguments),n=this._bindings.length,r;this.memorize&&(this._prevParams=t);if(!n)return;r=this._bindings.slice(),this._shouldPropagate=!0;do n--;while(r[n]&&this._shouldPropagate&&r[n].execute(t)!==!1)},forget:function(){this._prevParams=null},dispose:function(){this.removeAll(),delete this._bindings,delete this._prevParams},toString:function(){return"[Signal active:"+this.active+" numListeners:"+this.getNumListeners()+"]"}};var i=r;return i.Signal=r,e.signals=i,r}(this),n=function(){var e=function(e){function i(e,t){if(e.indexOf)return e.indexOf(t);var n=e.length;while(n--)if(e[n]===t)return n;return-1}function s(e,t){var n=i(e,t);n!==-1&&e.splice(n,1)}function o(e,t){return"[object "+t+"]"===Object.prototype.toString.call(e)}function u(e){return o(e,"RegExp")}function a(e){return o(e,"Array")}function f(e){return typeof e=="function"}function l(e){var t;return e===null||e==="null"?t=null:e==="true"?t=!0:e==="false"?t=!1:e===r||e==="undefined"?t=r:e===""||isNaN(e)?t=e:t=parseFloat(e),t}function c(e){var t=e.length,n=[];while(t--)n[t]=l(e[t]);return n}function h(e,t){var n=(e||"").replace("?","").split("&"),r=n.length,i={},s,o;while(r--)s=n[r].split("="),o=t?l(s[1]):s[1],i[s[0]]=typeof o=="string"?decodeURIComponent(o):o;return i}function p(){this.bypassed=new e.Signal,this.routed=new e.Signal,this._routes=[],this._prevRoutes=[],this._piped=[],this.resetState()}function d(t,n,r,i){var s=u(t),o=i.patternLexer;this._router=i,this._pattern=t,this._paramsIds=s?null:o.getParamIds(t),this._optionalParamsIds=s?null:o.getOptionalParamsIds(t),this._matchRegexp=s?t:o.compilePattern(t,i.ignoreCase),this.matched=new e.Signal,this.switched=new e.Signal,n&&this.matched.add(n),this._priority=r||0}var t,n,r;return n=/t(.+)?/.exec("t")[1]==="",p.prototype={greedy:!1,greedyEnabled:!0,ignoreCase:!0,ignoreState:!1,shouldTypecast:!1,normalizeFn:null,resetState:function(){this._prevRoutes.length=0,this._prevMatchedRequest=null,this._prevBypassedRequest=null},create:function(){return new p},addRoute:function(e,t,n){var r=new d(e,t,n,this);return this._sortedInsert(r),r},removeRoute:function(e){s(this._routes,e),e._destroy()},removeAllRoutes:function(){var e=this.getNumRoutes();while(e--)this._routes[e]._destroy();this._routes.length=0},parse:function(e,t){e=e||"",t=t||[];if(!this.ignoreState&&(e===this._prevMatchedRequest||e===this._prevBypassedRequest))return;var n=this._getMatchedRoutes(e),r=0,i=n.length,s;if(i){this._prevMatchedRequest=e,this._notifyPrevRoutes(n,e),this._prevRoutes=n;while(r<i)s=n[r],s.route.matched.dispatch.apply(s.route.matched,t.concat(s.params)),s.isFirst=!r,this.routed.dispatch.apply(this.routed,t.concat([e,s])),r+=1}else this._prevBypassedRequest=e,this.bypassed.dispatch.apply(this.bypassed,t.concat([e]));this._pipeParse(e,t)},_notifyPrevRoutes:function(e,t){var n=0,r;while(r=this._prevRoutes[n++])r.route.switched&&this._didSwitch(r.route,e)&&r.route.switched.dispatch(t)},_didSwitch:function(e,t){var n,r=0;while(n=t[r++])if(n.route===e)return!1;return!0},_pipeParse:function(e,t){var n=0,r;while(r=this._piped[n++])r.parse(e,t)},getNumRoutes:function(){return this._routes.length},_sortedInsert:function(e){var t=this._routes,n=t.length;do--n;while(t[n]&&e._priority<=t[n]._priority);t.splice(n+1,0,e)},_getMatchedRoutes:function(e){var t=[],n=this._routes,r=n.length,i;while(i=n[--r]){(!t.length||this.greedy||i.greedy)&&i.match(e)&&t.push({route:i,params:i._getParamsArray(e)});if(!this.greedyEnabled&&t.length)break}return t},pipe:function(e){this._piped.push(e)},unpipe:function(e){s(this._piped,e)},toString:function(){return"[crossroads numRoutes:"+this.getNumRoutes()+"]"}},t=new p,t.VERSION="0.12.0",t.NORM_AS_ARRAY=function(e,t){return[t.vals_]},t.NORM_AS_OBJECT=function(e,t){return[t]},d.prototype={greedy:!1,rules:void 0,match:function(e){return e=e||"",this._matchRegexp.test(e)&&this._validateParams(e)},_validateParams:function(e){var t=this.rules,n=this._getParamsObject(e),r;for(r in t)if(r!=="normalize_"&&t.hasOwnProperty(r)&&!this._isValidParam(e,r,n))return!1;return!0},_isValidParam:function(e,t,n){var r=this.rules[t],s=n[t],o=!1,l=t.indexOf("?")===0;return s==null&&this._optionalParamsIds&&i(this._optionalParamsIds,t)!==-1?o=!0:u(r)?(l&&(s=n[t+"_"]),o=r.test(s)):a(r)?(l&&(s=n[t+"_"]),o=this._isValidArrayRule(r,s)):f(r)&&(o=r(s,e,n)),o},_isValidArrayRule:function(e,t){if(!this._router.ignoreCase)return i(e,t)!==-1;typeof t=="string"&&(t=t.toLowerCase());var n=e.length,r,s;while(n--){r=e[n],s=typeof r=="string"?r.toLowerCase():r;if(s===t)return!0}return!1},_getParamsObject:function(e){var t=this._router.shouldTypecast,r=this._router.patternLexer.getParamValues(e,this._matchRegexp,t),s={},o=r.length,u,a;while(o--)a=r[o],this._paramsIds&&(u=this._paramsIds[o],u.indexOf("?")===0&&a&&(s[u+"_"]=a,a=h(a,t),r[o]=a),n&&a===""&&i(this._optionalParamsIds,u)!==-1&&(a=void 0,r[o]=a),s[u]=a),s[o]=a;return s.request_=t?l(e):e,s.vals_=r,s},_getParamsArray:function(e){var t=this.rules?this.rules.normalize_:null,n;return t=t||this._router.normalizeFn,t&&f(t)?n=t(e,this._getParamsObject(e)):n=this._getParamsObject(e).vals_,n},interpolate:function(e){var t=this._router.patternLexer.interpolate(this._pattern,e);if(!this._validateParams(t))throw new Error("Generated string doesn't validate against `Route.rules`.");return t},dispose:function(){this._router.removeRoute(this)},_destroy:function(){this.matched.dispose(),this.switched.dispose(),this.matched=this.switched=this._pattern=this._matchRegexp=null},toString:function(){return'[Route pattern:"'+this._pattern+'", numListeners:'+this.matched.getNumListeners()+"]"}},p.prototype.patternLexer=function(){function f(){var e,t;for(e in i)i.hasOwnProperty(e)&&(t=i[e],t.id="__CR_"+e+"__",t.save="save"in t?t.save.replace("{{id}}",t.id):t.id,t.rRestore=new RegExp(t.id,"g"))}function l(e,t){var n=[],r;e.lastIndex=0;while(r=e.exec(t))n.push(r[1]);return n}function h(e){return l(r,e)}function p(e){return l(i.OP.rgx,e)}function d(r,i){return r=r||"",r&&(a===s?r=r.replace(t,""):a===u&&(r=r.replace(n,"")),r=v(r,"rgx","save"),r=r.replace(e,"\\$&"),r=v(r,"rRestore","res"),a===s&&(r="\\/?"+r)),a!==o&&(r+="\\/?"),new RegExp("^"+r+"$",i?"i":"")}function v(e,t,n){var r,s;for(s in i)i.hasOwnProperty(s)&&(r=i[s],e=e.replace(r[t],r[n]));return e}function m(e,t,n){var r=t.exec(e);return r&&(r.shift(),n&&(r=c(r))),r}function g(e,t){if(typeof e!="string")throw new Error("Route pattern should be a string.");var n=function(e,n){var r;n=n.substr(0,1)==="?"?n.substr(1):n;if(t[n]!=null){if(typeof t[n]=="object"){var i=[];for(var s in t[n])i.push(encodeURI(s+"="+t[n][s]));r="?"+i.join("&")}else r=String(t[n]);if(e.indexOf("*")===-1&&r.indexOf("/")!==-1)throw new Error('Invalid value "'+r+'" for segment "'+e+'".')}else{if(e.indexOf("{")!==-1)throw new Error("The segment "+e+" is required.");r=""}return r};return i.OS.trail||(i.OS.trail=new RegExp("(?:"+i.OS.id+")+$")),e.replace(i.OS.rgx,i.OS.save).replace(r,n).replace(i.OS.trail,"").replace(i.OS.rRestore,"/")}var e=/[\\.+*?\^$\[\](){}\/'#]/g,t=/^\/|\/$/g,n=/\/$/g,r=/(?:\{|:)([^}:]+)(?:\}|:)/g,i={OS:{rgx:/([:}]|\w(?=\/))\/?(:|(?:\{\?))/g,save:"$1{{id}}$2",res:"\\/?"},RS:{rgx:/([:}])\/?(\{)/g,save:"$1{{id}}$2",res:"\\/"},RQ:{rgx:/\{\?([^}]+)\}/g,res:"\\?([^#]+)"},OQ:{rgx:/:\?([^:]+):/g,res:"(?:\\?([^#]*))?"},OR:{rgx:/:([^:]+)\*:/g,res:"(.*)?"},RR:{rgx:/\{([^}]+)\*\}/g,res:"(.+)"},RP:{rgx:/\{([^}]+)\}/g,res:"([^\\/?]+)"},OP:{rgx:/:([^:]+):/g,res:"([^\\/?]+)?/?"}},s=1,o=2,u=3,a=s;return f(),{strict:function(){a=o},loose:function(){a=s},legacy:function(){a=u},getParamIds:h,getOptionalParamsIds:p,getParamValues:m,compilePattern:d,interpolate:g}}(),t};return e(window.signals)}(),r=function(e){function t(e,t,n,i){return r(e).then(t,n,i)}function n(e,t){this.then=e,this.inspect=t}function r(e){return o(function(t){t(e)})}function i(e){return t(e,f)}function s(){function i(i,s,o){e.resolve=e.resolver.resolve=function(e){return n?r(e):(n=!0,i(e),t)},e.reject=e.resolver.reject=function(e){return n?r(f(e)):(n=!0,s(e),t)},e.notify=e.resolver.notify=function(e){return o(e),e}}var e,t,n;return e={promise:D,resolve:D,reject:D,notify:D,resolver:{resolve:D,reject:D,notify:D}},e.promise=t=o(i),e}function o(e){function s(e,n,i){return o(function(s,o,u){r?r.push(function(t){t.then(e,n,i).then(s,o,u)}):P(function(){t.then(e,n,i).then(s,o,u)})})}function a(){return t?t.inspect():x()}function h(e){if(!r)return;t=u(e),c(r,t),r=D}function p(e){h(f(e))}function d(e){r&&c(r,l(e))}var t,r=[];try{e(h,p,d)}catch(i){p(i)}return new n(s,a)}function u(e){return e instanceof n?e:e===Object(e)&&"then"in e?o(function(t,n,r){P(function(){try{var i=e.then;typeof i=="function"?C(i,e,t,n,r):t(a(e))}catch(s){n(s)}})}):a(e)}function a(e){var t=new n(function(n){try{return typeof n=="function"?u(n(e)):t}catch(r){return f(r)}},function(){return E(e)});return t}function f(e){var t=new n(function(n,r){try{return typeof r=="function"?u(r(e)):t}catch(i){return f(i)}},function(){return S(e)});return t}function l(e){var t=new n(function(n,r,i){try{return typeof i=="function"?l(i(e)):t}catch(s){return l(s)}});return t}function c(e,t){P(function(){var n,r=0;while(n=e[r++])n(t)})}function h(e){return e&&typeof e.then=="function"}function p(e,n,r,i,s){return t(e,function(e){function u(r,i,s){function d(e){c(e)}function v(e){l(e)}var o,u,a,f,l,c,h,p;h=e.length>>>0,o=Math.max(0,Math.min(n,h)),a=[],u=h-o+1,f=[];if(!o)r(a);else{c=function(e){f.push(e),--u||(l=c=j,i(f))},l=function(e){a.push(e),--o||(l=c=j,r(a))};for(p=0;p<h;++p)p in e&&t(e[p],v,d,s)}}return o(u).then(r,i,s)})}function d(e,t,n,r){function i(e){return t?t(e[0]):e[0]}return p(e,1,i,n,r)}function v(e,t,n,r){return b(e,j).then(t,n,r)}function m(){return b(arguments,j)}function g(e){return b(e,E,S)}function y(e,t){return b(e,t)}function b(e,n,r){return t(e,function(e){function i(i,s,o){var u,a,f,l,c;f=a=e.length>>>0,u=[];if(!f){i(u);return}l=function(e,a){t(e,n,r).then(function(e){u[a]=e,--f||i(u)},s,o)};for(c=0;c<a;c++)c in e?l(e[c],c):--f}return o(i)})}function w(e,n){var r=C(N,arguments,1);return t(e,function(e){var i;return i=e.length,r[0]=function(e,r,s){return t(e,function(e){return t(r,function(t){return n(e,t,s,i)})})},T.apply(e,r)})}function E(e){return{state:"fulfilled",value:e}}function S(e){return{state:"rejected",reason:e}}function x(){return{state:"pending"}}function P(e){L.push(e)===1&&H()}function H(){k(B)}function B(){var e,t=0;while(e=L[t++])e();L=[]}function j(e){return e}t.defer=s,t.resolve=r,t.reject=i,t.join=m,t.all=v,t.map=y,t.reduce=w,t.settle=g,t.any=d,t.some=p,t.isPromise=h,t.promise=o,n.prototype={otherwise:function(e){return this.then(D,e)},ensure:function(e){function t(){return r(e())}return this.then(t,t).yield(this)},yield:function(e){return this.then(function(){return e})},spread:function(e){return this.then(function(t){return v(t,function(t){return e.apply(D,t)})})},always:function(e,t){return this.then(e,e,t)}};var T,N,C,k,L,A,O,M,_,D;return L=[],A=e.setTimeout,k=typeof setImmediate=="function"?setImmediate.bind(e):typeof process=="object"&&process.nextTick?process.nextTick:typeof vertx=="object"?vertx.runOnLoop:function(e){A(e,0)},O=Function.prototype,M=O.call,C=O.bind?M.bind(M):function(e,t){return e.apply(t,N.call(arguments,2))},_=[],N=_.slice,T=_.reduce||function(e){var t,n,r,i,s;s=0,t=Object(this),i=t.length>>>0,n=arguments;if(n.length<=1)for(;;){if(s in t){r=t[s++];break}if(++s>=i)throw new TypeError}else r=n[1];for(;s<i;++s)s in t&&(r=e(r,t[s],s,t));return r},t}(this);(function(e){function D(){}function P(e,t,n){var r=/(?:([\w0-9]+:))?(?:\/\/(?:[^@]*@)?([^\/:\?#]+)(?::([0-9]+))?)?([^\?#]*)(?:(\?[^#]+)|\?)?(?:(#.*))?/;if(e&&!t){var i=P(),s=i._pathname,u=i._protocol;e=/^(?:[\w0-9]+\:)?\/\//.test(e)?e.indexOf("/")===0?u+e:e:u+"//"+i._host+(e.indexOf("/")===0?e:e.indexOf("?")===0?s+e:e.indexOf("#")===0?s+i._search+e:s.replace(/[^\/]+$/g,"")+e)}else{e=t?e:o.href;if(!c||n)e=e.replace(/^[^#]*/,"")||"#",e=o.protocol+"//"+o.host+S.basepath+e.replace(new RegExp("^#[/]?(?:"+S.type+")?"),"")}T.href=e;var a=r.exec(T.href),f=a[2]+(a[3]?":"+a[3]:""),l=a[4]||"/",h=a[5]||"",p=a[6]==="#"?"":a[6]||"",d=l+h+p,v=l.replace(new RegExp("^"+S.basepath,"i"),S.type)+h;return{_href:a[1]+"//"+f+d,_protocol:a[1],_host:f,_hostname:a[2],_port:a[3]||"",_pathname:l,_search:h,_hash:p,_relative:d,_nohash:v,_special:v+p}}function H(e){var n="";if(r)n+=r.getItem(x);else{var i=t.cookie.split(x+"=");i.length>1&&(n+=i.pop().split(";").shift()||"null")}try{L=e.parse(n)||{}}catch(s){L={}}b(v+"unload",function(){if(r)r.setItem(x,e.stringify(L));else{var n={};if(n[o.href]=a.state)t.cookie=x+"="+e.stringify(n)}},!1)}function B(t,n,r,s){r=r||{set:D};var o=!r.set,u=!r.get,a={configurable:!0,set:function(){o=1},get:function(){u=1}};try{p(t,n,a),t[n]=t[n],p(t,n,r)}catch(f){}if(!o||!u){t.__defineGetter__&&(t.__defineGetter__(n,a.get),t.__defineSetter__(n,a.set),t[n]=t[n],r.get&&t.__defineGetter__(n,r.get),r.set&&t.__defineSetter__(n,r.set));if((!o||!u)&&t===e){try{var l=t[n];t[n]=null}catch(f){}if("execScript"in e)e.execScript("Public "+n,"VBScript");else try{p(t,n,{value:D})}catch(f){}t[n]=l}else if(!o||!u)try{try{var c=i.create(t);p(i.getPrototypeOf(c)===t?c:t,n,r);for(var h in t)typeof t[h]=="function"&&(c[h]=t[h].bind(t));try{s.call(c,c,t)}catch(f){}t=c}catch(f){p(t.constructor.prototype,n,r)}}catch(f){return!1}}return t}function j(e,t,n){return n=n||{},e=e===_?o:e,n.set=n.set||function(n){e[t]=n},n.get=n.get||function(){return e[t]},n}function F(e,t,n){e in A?A[e].push(t):arguments.length>3?b(e,t,n,arguments[3]):b(e,t,n)}function I(e,t,n){var r=A[e];if(r){for(var i=r.length;--i;)if(r[i]===t){r.splice(i,1);break}}else w(e,t,n)}function q(t,n){var r=(""+(typeof t=="string"?t:t.type)).replace(/^on/,""),i=A[r];if(i){n=typeof t=="string"?n:t;if(n.target==null)for(var s=["target","currentTarget","srcElement","type"];t=s.pop();)n=B(n,t,{get:t==="type"?function(){return r}:function(){return e}});((r==="popstate"?e.onpopstate:e.onhashchange)||D).call(e,n);for(var o=0,u=i.length;o<u;o++)i[o].call(e,n);return!0}return E(t,n)}function R(){var e=t.createEvent?t.createEvent("Event"):t.createEventObject();e.initEvent?e.initEvent("popstate",!1,!1):e.type="popstate",e.state=a.state,q(e)}function U(){k&&(k=!1,R())}function z(e,t,n,r){if(!c){var i=P(t);i._relative!==P()._relative&&(N=r,n?o.replace("#"+i._special):o.hash=i._special)}!h&&e&&(L[o.href]=e),k=!1}function W(t){if(N){C!==o.href&&R(),t=t||e.event;var n=P(N,!0),r=P();t.oldURL||(t.oldURL=n._href,t.newURL=r._href),n._hash!==r._hash&&q(t)}N=o.href}function X(e){setTimeout(function(){b("popstate",function(e){C=o.href,h||(e=B(e,"state",{get:function(){return a.state}})),q(e)},!1)},0),!c&&e!==!0&&a.location&&($(a.location.hash),U())}function V(t){var n=t||e.event,r=n.target||n.srcElement,i="defaultPrevented"in n?n.defaultPrevented:n.returnValue===!1;if(r&&r.nodeName==="A"&&!i){var s=P(),o=P(r.getAttribute("href",2)),u=s._href.split("#").shift()===o._href.split("#").shift();u&&(s._hash!==o._hash&&(a.location.hash=o._hash),$(o._hash),n.preventDefault?n.preventDefault():n.returnValue=!1)}}function $(r){var i=t.getElementById(r=(r||"").replace(/^#/,""));if(i&&i.id===r&&i.nodeName==="A"){var s=i.getBoundingClientRect();e.scrollTo(n.scrollLeft||0,s.top+(n.scrollTop||0)-(n.clientTop||0))}}function J(){var n=t.getElementsByTagName("script"),r=(n[n.length-1]||{}).src||"",i=r.indexOf("?")!==-1?r.split("?").pop():"";i.replace(/(\w+)(?:=([^&]*))?/g,function(e,t,n){S[t]=(n||(t==="basepath"?"/":"")).replace(/^(0|false)$/,"")}),b(v+"hashchange",W,!1);var o=[_,d,O,e,M,a];h&&delete M.state;for(var u=0;u<o.length;u+=2)for(var f in o[u])if(o[u].hasOwnProperty(f))if(typeof o[u][f]=="function")o[u+1][f]=o[u][f];else{var l=j(o[u],f,o[u][f]);if(!B(o[u+1],f,l,function(t,n){n===a&&(e.history=a=o[u+1]=t)}))return w(v+"hashchange",W,!1),!1;o[u+1]===e&&(A[f]=A[f.substr(2)]=[])}return S.redirect&&a.redirect(),!h&&s&&H(s),c||t[m](v+"click",V,!1),t.readyState==="complete"?X(!0):(!c&&P()._relative!==S.basepath&&(k=!0),b(v+"load",X,!1)),!0}var t=e.document,n=t.documentElement,r=e.sessionStorage,i=e.Object,s=e.JSON,o=e.location,u=e.history,a=u,f=u.pushState,l=u.replaceState,c=!!f,h="state"in u,p=i.defineProperty,d=B({},"t")?{}:t.createElement("a"),v="",m=e.addEventListener?"addEventListener":(v="on")&&"attachEvent",g=e.removeEventListener?"removeEventListener":"detachEvent",y=e.dispatchEvent?"dispatchEvent":"fireEvent",b=e[m],w=e[g],E=e[y],S={basepath:"/",redirect:0,type:"/"},x="__historyAPI__",T=t.createElement("a"),N=o.href,C="",k=!1,L={},A={},O={onhashchange:null,onpopstate:null},M={redirect:function(t,n){S.basepath=n=n==null?S.basepath:n,S.type=t=t==null?S.type:t;if(e.top==e.self){var r=P(null,!1,!0)._relative,i=o.search,s=o.pathname;c?(r!=n&&(new RegExp("^"+n+"$","i")).test(s)&&o.replace(r),(new RegExp("^"+n+"$","i")).test(s+"/")?o.replace(n):(new RegExp("^"+n,"i")).test(s)||o.replace(s.replace(/^\//,n)+i)):s!=n&&o.replace(n+"#"+s.replace(new RegExp("^"+n,"i"),t)+i+o.hash)}},pushState:function(e,t,n){f&&f.apply(u,arguments),z(e,n)},replaceState:function(e,t,n){delete L[o.href],l&&l.apply(u,arguments),z(e,n,!0)},location:{set:function(t){e.location=t},get:function(){return c?o:d}},state:{get:function(){return L[o.href]||null}}},_={assign:function(e){(""+e).indexOf("#")===0?z(null,e):o.assign(e)},reload:function(){o.reload()},replace:function(e){(""+e).indexOf("#")===0?z(null,e,!0):o.replace(e)},toString:function(){return this.href},href:{get:function(){return P()._href}},protocol:null,host:null,hostname:null,port:null,pathname:{get:function(){return P()._pathname}},search:{get:function(){return P()._search}},hash:{set:function(e){z(null,(""+e).replace(/^(#|)/,"#"),!1,N)},get:function(){return P()._hash}}};if(!J())return;a.emulate=!c,e[m]=F,e[g]=I,e[y]=q})(window);var g=function(){function n(n){if(!e.allowed)throw new Error("Async can only be called from within state.enter()");var i=r.defer();return t.push(i),r(n).then(function(e){t.indexOf(i)>-1&&i.resolve(e)},function(e){t.indexOf(i)>-1&&i.reject(e)}),i.promise}function i(){t.length=0}var e,t=[];return e={register:n,newTransitionStarted:i,allowed:!1},e}();e.Async=g.register,e.State=y;var E=logError=s,S=!1;w.enableLogs=function(){function e(e){var t=e[0],n=Array.prototype.slice.call(e,1);for(var r=0,i=n.length;r<i;r++)t=t.replace("{"+r+"}",n[r]);return t}S=!0,E=function(){console.log(e(arguments))},logError=function(){console.error(e(arguments))}},e.Router=w,this.Abyssa=e})()