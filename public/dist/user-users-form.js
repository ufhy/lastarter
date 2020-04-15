(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{llWy:function(e,r,t){"use strict";t.r(r);var o=t("o0o1"),n=t.n(o),s=t("yHho");function a(e,r,t,o,n,s,a){try{var i=e[s](a),c=i.value}catch(e){return void t(e)}i.done?r(c):Promise.resolve(c).then(o,n)}function i(e){return function(){var r=this,t=arguments;return new Promise((function(o,n){var s=e.apply(r,t);function i(e){a(s,o,n,i,c,"next",e)}function c(e){a(s,o,n,i,c,"throw",e)}i(void 0)}))}}var c={name:"UserForm",data:function(){return{show:!1,itemId:"",form:new s.a({username:"",email:"",active:!0,change_password:!1,password:"",password_confirmation:"",roles:[]}),roleOptions:[]}},computed:{mode:function(){return this.itemId?"edit":"new"},title:function(){return"new"===this.mode?"Create user":"Edit user"}},created:function(){var e=this;return i(n.a.mark((function r(){return n.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(e.itemId=e.$route.params.id?e.$route.params.id:"",e.form.busy=!0,e.fetchOptions(),r.t0="edit"===e.mode,!r.t0){r.next=7;break}return r.next=7,e.fetchRow();case 7:e.form.busy=!1;case 8:case"end":return r.stop()}}),r)})))()},mounted:function(){this.show=!0},methods:{closeAction:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.show=!1,this.$router.push({name:"user.users.index",params:{refresh:e}})},fetchOptions:function(){var e=this;this.$http.get("/api/user/users/form-options").then((function(r){var t=r.data;e.roleOptions=t.roles})).catch((function(r){e.$root.httpError(error)}))},fetchRow:function(){var e=this;return this.$http.get("/api/user/users/"+this.itemId).then((function(r){var t=r.data;e.form.username=t.username,e.form.email=t.email,e.form.active=t.active,e.form.roles=t.roles})).catch((function(r){e.$root.httpError(error)}))},saveAction:function(e){var r=this;return i(n.a.mark((function t(){var o,s;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!r.form.busy){t.next=2;break}return t.abrupt("return",!1);case 2:if(r.form.clear(),t.prev=3,"new"!==r.mode){t.next=10;break}return t.next=7,r.form.post("/api/user/users");case 7:t.t0=t.sent,t.next=13;break;case 10:return t.next=12,r.form.put("/api/user/users/"+r.itemId);case 12:t.t0=t.sent;case 13:o=t.t0,s=o.data,r.$coresnackbars.success(s.message),"saveClose"===e?r.closeAction(!0):r.form.reset(),t.next=22;break;case 19:t.prev=19,t.t1=t.catch(3),r.$root.httpError(t.t1);case 22:case"end":return t.stop()}}),t,null,[[3,19]])})))()}}},u=t("KHd+"),l=Object(u.a)(c,(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("core-form-dialog",{attrs:{open:e.show,loading:e.form.busy,title:e.title,"close-router":{name:"user.users.index"},"btn-save":"edit"!==e.mode},on:{"update:open":function(r){e.show=r},"save-close":function(r){return e.saveAction("saveClose")},save:e.saveAction}},[t("v-checkbox",{attrs:{color:"primary",label:e.$t("words.lb_active")},model:{value:e.form.active,callback:function(r){e.$set(e.form,"active",r)},expression:"form.active"}}),e._v(" "),t("v-text-field",{attrs:{label:e.$t("words.lb_username"),"prepend-icon":"account_circle","error-messages":e.form.errors.getAll("username")},model:{value:e.form.username,callback:function(r){e.$set(e.form,"username",r)},expression:"form.username"}}),e._v(" "),t("v-select",{attrs:{multiple:"","small-chips":"","deletable-chips":"",clearable:"",label:e.$t("words.lb_roles"),"prepend-icon":"supervised_user_circle","item-text":"name","item-value":"id","error-messages":e.form.errors.getAll("roles"),items:e.roleOptions},model:{value:e.form.roles,callback:function(r){e.$set(e.form,"roles",r)},expression:"form.roles"}}),e._v(" "),t("v-text-field",{attrs:{label:e.$t("words.lb_email"),"prepend-icon":"mail_outline","error-messages":e.form.errors.getAll("email")},model:{value:e.form.email,callback:function(r){e.$set(e.form,"email",r)},expression:"form.email"}}),e._v(" "),"edit"===e.mode?t("div",{staticClass:"d-flex"},[t("v-spacer"),e._v(" "),t("v-checkbox",{attrs:{"hide-details":"",label:e.$t("passwords.change_password")},model:{value:e.form.change_password,callback:function(r){e.$set(e.form,"change_password",r)},expression:"form.change_password"}})],1):e._e(),e._v(" "),"edit"===e.mode&&e.form.change_password||"new"===e.mode?[t("v-text-field",{attrs:{label:e.$t("passwords.password"),type:"password","prepend-icon":"lock_open","error-messages":e.form.errors.getAll("password")},model:{value:e.form.password,callback:function(r){e.$set(e.form,"password",r)},expression:"form.password"}}),e._v(" "),t("v-text-field",{attrs:{label:e.$t("passwords.password_confirmation"),type:"password","prepend-icon":" ","error-messages":e.form.errors.getAll("password_confirmation")},model:{value:e.form.password_confirmation,callback:function(r){e.$set(e.form,"password_confirmation",r)},expression:"form.password_confirmation"}})]:e._e()],2)}),[],!1,null,null,null);r.default=l.exports},yHho:function(e,r,t){"use strict";t.d(r,"a",(function(){return b}));var o=t("iJs6");function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e){if(null===e||"object"!==n(e))return e;var r=Array.isArray(e)?[]:{};return Object.keys(e).forEach((function(t){r[t]=s(e[t])})),r}function a(e){return Array.isArray(e)?e:[e]}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function c(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var f=function(){function e(){!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,e),this.errors={}}var r,t,o;return r=e,(t=[{key:"set",value:function(e,r){"object"===u(e)?this.errors=e:this.set(function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){c(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}({},this.errors,c({},e,a(r))))}},{key:"all",value:function(){return this.errors}},{key:"has",value:function(e){return this.errors.hasOwnProperty(e)}},{key:"hasAny",value:function(){for(var e=this,r=arguments.length,t=new Array(r),o=0;o<r;o++)t[o]=arguments[o];return t.some((function(r){return e.has(r)}))}},{key:"any",value:function(){return Object.keys(this.errors).length>0}},{key:"get",value:function(e){if(this.has(e))return this.getAll(e)[0]}},{key:"getAll",value:function(e){return a(this.errors[e]||[])}},{key:"only",value:function(){for(var e=this,r=[],t=arguments.length,o=new Array(t),n=0;n<t;n++)o[n]=arguments[n];return o.forEach((function(t){var o=e.get(t);o&&r.push(o)})),r}},{key:"flatten",value:function(){return Object.values(this.errors).reduce((function(e,r){return e.concat(r)}),[])}},{key:"clear",value:function(e){var r=this,t={};e&&Object.keys(this.errors).forEach((function(o){o!==e&&(t[o]=r.errors[o])})),this.set(t)}}])&&l(r.prototype,t),o&&l(r,o),e}();function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function h(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?m(Object(t),!0).forEach((function(r){y(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):m(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function y(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function v(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var d=function(){function e(r){!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,e),this.busy=!1,this.successful=!1,this.errors=new f,this.originalData=s(r),Object.assign(this,r)}var r,t,n;return r=e,(t=[{key:"fill",value:function(e){var r=this;this.keys().forEach((function(t){r[t]=e[t]}))}},{key:"data",value:function(){var e=this;return this.keys().reduce((function(r,t){return h({},r,y({},t,e[t]))}),{})}},{key:"keys",value:function(){return Object.keys(this).filter((function(r){return!e.ignore.includes(r)}))}},{key:"startProcessing",value:function(){this.errors.clear(),this.busy=!0,this.successful=!1}},{key:"finishProcessing",value:function(){this.busy=!1,this.successful=!0}},{key:"clear",value:function(){this.errors.clear(),this.successful=!1}},{key:"reset",value:function(){var r=this;Object.keys(this).filter((function(r){return!e.ignore.includes(r)})).forEach((function(e){r[e]=s(r.originalData[e])}))}},{key:"get",value:function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.submit("get",e,r)}},{key:"post",value:function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.submit("post",e,r)}},{key:"patch",value:function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.submit("patch",e,r)}},{key:"put",value:function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.submit("put",e,r)}},{key:"delete",value:function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.submit("delete",e,r)}},{key:"submit",value:function(e,r){var t=this,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.startProcessing();var s="get"===e?{params:this.data()}:this.data();return new Promise((function(a,i){Object(o.a)().request(h({url:t.route(r),method:e,data:s},n)).then((function(e){t.finishProcessing(),a(e)})).catch((function(e){t.busy=!1,e&&t.errors.set(t.extractErrors(e)),i(e)}))}))}},{key:"extractErrors",value:function(r){return r.data&&"object"===p(r.data)?r.data.errors?h({},r.data.errors):r.data.message?{error:r.data.message}:h({},r.data):{error:e.errorMessage}}},{key:"route",value:function(r){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=r;return e.routes.hasOwnProperty(r)&&(o=decodeURI(e.routes[r])),"object"!==p(t)&&(t={id:t}),Object.keys(t).forEach((function(e){o=o.replace("{".concat(e,"}"),t[e])})),o}},{key:"onKeydown",value:function(e){e.target.name&&this.errors.clear(e.target.name)}}])&&v(r.prototype,t),n&&v(r,n),e}();d.routes={},d.errorMessage="Something went wrong. Please try again.",d.ignore=["busy","successful","errors","originalData"];var b=d}}]);