module.exports=function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=3)}([function(t,e){t.exports=require("@babel/runtime/helpers/typeof")},function(t,e){t.exports=require("core-js/modules/es6.function.name")},function(t,e){t.exports=require("core-js/modules/es6.object.assign")},function(t,e,n){"use strict";n.r(e),n.d(e,"default",function(){return f});var o,r,i,u,s=n(0),a=n.n(s);n(2),n(1);function c(t,e){throw new Error("".concat(t,": ").concat(e," was not provided or has wrong format"))}function f(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};f.installed||(f.installed=!0,function(t){null==t.EventEmitter&&c("[options.EventEmitter]","EventEmitter"),"object"!==a()(t.default)&&c("[options.default]","default settings for toast"),Array.isArray(t.events)||c("[options.events]","events for catch"),r=t.EventEmitter,i=t.default,u=t.events}(e),t.mixin({created:function(){f.inited||(o=this.$root,u.forEach(function(t){r.on(t.name,function(){var e;if("function"==typeof t.toast){for(var n=arguments.length,r=new Array(n),u=0;u<n;u++)r[u]=arguments[u];e=t.toast.apply(null,r)}else e=t.toast;(e=Object.assign({},i,e))&&e.message&&o.$toast.open(e)})}),f.inited=!0)}}))}}]);