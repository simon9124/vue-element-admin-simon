(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-32f2"],{"14Xm":function(e,t,r){e.exports=r("u938")},"2K1W":function(e,t,r){"use strict";var n=r("Kw5r");t.a=new n.default},D3Ub:function(e,t,r){"use strict";t.__esModule=!0;var n=function(e){return e&&e.__esModule?e:{default:e}}(r("4d7F"));t.default=function(e){return function(){var t=e.apply(this,arguments);return new n.default(function(e,r){return function a(i,o){try{var s=t[i](o),l=s.value}catch(e){return void r(e)}if(!s.done)return n.default.resolve(l).then(function(e){a("next",e)},function(e){a("throw",e)});e(l)}("next")})}}},N0wR:function(e,t,r){"use strict";r.d(t,"b",function(){return a}),r.d(t,"c",function(){return i}),r.d(t,"a",function(){return o});var n=r("7Qib");function a(e){return e.tableDataLoading=!0,Object(n.f)({url:"/user/list",method:"get"})}function i(e){return Object(n.f)({url:"/user/update",method:"put",data:e})}function o(){return Object(n.f)({url:"/user/delete",method:"delete"})}},O4nn:function(e,t,r){"use strict";var n=r("YCTC");r.n(n).a},YCTC:function(e,t,r){},ls82:function(e,t){!function(t){"use strict";var r,n=Object.prototype,a=n.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",l=i.toStringTag||"@@toStringTag",u="object"==typeof e,c=t.regeneratorRuntime;if(c)u&&(e.exports=c);else{(c=t.regeneratorRuntime=u?e.exports:{}).wrap=w;var f="suspendedStart",h="suspendedYield",p="executing",d="completed",m={},g={};g[o]=function(){return this};var v=Object.getPrototypeOf,b=v&&v(v(E([])));b&&b!==n&&a.call(b,o)&&(g=b);var y=S.prototype=_.prototype=Object.create(g);k.prototype=y.constructor=S,S.constructor=k,S[l]=k.displayName="GeneratorFunction",c.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===k||"GeneratorFunction"===(t.displayName||t.name))},c.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,S):(e.__proto__=S,l in e||(e[l]="GeneratorFunction")),e.prototype=Object.create(y),e},c.awrap=function(e){return{__await:e}},C(F.prototype),F.prototype[s]=function(){return this},c.AsyncIterator=F,c.async=function(e,t,r,n){var a=new F(w(e,t,r,n));return c.isGeneratorFunction(t)?a:a.next().then(function(e){return e.done?e.value:a.next()})},C(y),y[l]="Generator",y[o]=function(){return this},y.toString=function(){return"[object Generator]"},c.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},c.values=E,O.prototype={constructor:O,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(N),!e)for(var t in this)"t"===t.charAt(0)&&a.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=r)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(n,a){return s.type="throw",s.arg=e,t.next=n,a&&(t.method="next",t.arg=r),!!a}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],s=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var l=a.call(o,"catchLoc"),u=a.call(o,"finallyLoc");if(l&&u){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(l){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&a.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=e,o.arg=t,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(o)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),m},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),N(r),m}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var a=n.arg;N(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:E(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=r),m}}}function w(e,t,r,n){var a=t&&t.prototype instanceof _?t:_,i=Object.create(a.prototype),o=new O(n||[]);return i._invoke=function(e,t,r){var n=f;return function(a,i){if(n===p)throw new Error("Generator is already running");if(n===d){if("throw"===a)throw i;return j()}for(r.method=a,r.arg=i;;){var o=r.delegate;if(o){var s=L(o,r);if(s){if(s===m)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var l=x(e,t,r);if("normal"===l.type){if(n=r.done?d:h,l.arg===m)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(n=d,r.method="throw",r.arg=l.arg)}}}(e,r,o),i}function x(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}function _(){}function k(){}function S(){}function C(e){["next","throw","return"].forEach(function(t){e[t]=function(e){return this._invoke(t,e)}})}function F(e){var t;this._invoke=function(r,n){function i(){return new Promise(function(t,i){!function t(r,n,i,o){var s=x(e[r],e,n);if("throw"!==s.type){var l=s.arg,u=l.value;return u&&"object"==typeof u&&a.call(u,"__await")?Promise.resolve(u.__await).then(function(e){t("next",e,i,o)},function(e){t("throw",e,i,o)}):Promise.resolve(u).then(function(e){l.value=e,i(l)},o)}o(s.arg)}(r,n,t,i)})}return t=t?t.then(i,i):i()}}function L(e,t){var n=e.iterator[t.method];if(n===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=r,L(e,t),"throw"===t.method))return m;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return m}var a=x(n,e.iterator,t.arg);if("throw"===a.type)return t.method="throw",t.arg=a.arg,t.delegate=null,m;var i=a.arg;return i?i.done?(t[e.resultName]=i.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=r),t.delegate=null,m):i:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,m)}function D(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function N(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function O(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(D,this),this.reset(!0)}function E(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,i=function t(){for(;++n<e.length;)if(a.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=r,t.done=!0,t};return i.next=i}}return{next:j}}function j(){return{value:r,done:!0}}}(function(){return this}()||Function("return this")())},u938:function(e,t,r){var n=function(){return this}()||Function("return this")(),a=n.regeneratorRuntime&&Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime")>=0,i=a&&n.regeneratorRuntime;if(n.regeneratorRuntime=void 0,e.exports=r("ls82"),a)n.regeneratorRuntime=i;else try{delete n.regeneratorRuntime}catch(e){n.regeneratorRuntime=void 0}},xIwV:function(e,t,r){"use strict";r.r(t);var n=r("FyfS"),a=r.n(n),i=r("14Xm"),o=r.n(i),s=r("D3Ub"),l=r.n(s),u=r("15TV"),c=r("0YhD"),f=r("NcXf"),h=r("N0wR"),p={name:"UserManage",components:{CustomSelect:c.a,ComponentFilter:u.a,Button:f.a},data:function(){return{tableDataLoading:!1,tableData:{},userListAll:[],userList:[],treeColumns:[{prop:"userName",label:"用户名",minWidth:150,sortable:!0},{prop:"userNickName",label:"姓名",minWidth:100,sortable:!0},{prop:"userMobile",label:"手机号",minWidth:120,sortable:!0},{prop:"userMail",label:"邮箱",minWidth:180}],pageNum:1,pageSize:10,filterFormData:{userName:"",userMobile:"",userStatus:""},userStatusOptions:[{label:"有效",value:1},{label:"冻结",value:0}],batchFilterData:"",multipleSelection:[],dialogVisible:!1,userForm:{}}},created:function(){this.init()},methods:{init:function(){var e=this;return l()(o.a.mark(function t(){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(h.b)(e);case 2:e.tableData=t.sent.data.tableData,e.tableData.list.map(function(t){return e.$set(t,"edit",!1),t}),e.refreshTable(),e.tableDataLoading=!1;case 6:case"end":return t.stop()}},t,e)}))()},handleParamsChange:function(e){switch(e.type){case"userStatus":this.filterFormData.userStatus=e.value}this.refreshTable()},refreshTable:function(){var e=this;this.userListAll=this.tableData.list.filter(function(t){if(t.userName.indexOf(e.filterFormData.userName)>-1&&t.userMobile.indexOf(e.filterFormData.userMobile)>-1&&t.userStatus.indexOf(e.filterFormData.userStatus.toString())>-1)return t}),this.userList=this.userListAll.slice((this.pageNum-1)*this.pageSize,this.pageNum*this.pageSize)},clear:function(){this.filterFormData={userName:"",userMobile:"",userStatus:""},this.$refs.userStatusSelect.handleSelectChange(""),this.refreshTable()},handlePageChange:function(e){this.pageNum=e,this.refreshTable()},handleSizeChange:function(e){this.pageSize=e,this.refreshTable()},handleSwitchChange:function(e){var t=this;return l()(o.a.mark(function r(){var n;return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Object(h.c)(e);case 2:n=r.sent.data.message,t.$set(e,"userStatus",e.userStatus),t.getResultMessage(n);case 5:case"end":return r.stop()}},r,t)}))()},editInline:function(e){var t=this;return l()(o.a.mark(function r(){var n;return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,Object(h.c)(e);case 2:n=r.sent.data.message,t.$set(e,"userAddress",e.userAddress),t.getResultMessage(n),e.edit=!e.edit;case 6:case"end":return r.stop()}},r,t)}))()},update:function(e){this.dialogVisible=!0,this.userForm=e},del:function(e){var t=this;return l()(o.a.mark(function r(){var n,a;return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.$confirm("确认删除该用户吗？","提示",{type:"warning"}).catch(function(){});case 2:if("confirm"!==r.sent){r.next=11;break}return r.next=6,Object(h.a)(e);case 6:n=r.sent.data.message,a=t.tableData.list.indexOf(e),t.tableData.list.splice(a,1),t.refreshTable(),t.getResultMessage(n);case 11:case"end":return r.stop()}},r,t)}))()},handleSelectionChange:function(e){this.multipleSelection=e},batcthExecute:function(){var e=this;return l()(o.a.mark(function t(){var r,n,i,s,u,c,f;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:for(r=[],n=!0,i=!1,s=void 0,t.prev=4,u=a()(e.multipleSelection);!(n=(c=u.next()).done);n=!0)f=c.value,r.push(f.userCode);t.next=12;break;case 8:t.prev=8,t.t0=t.catch(4),i=!0,s=t.t0;case 12:t.prev=12,t.prev=13,!n&&u.return&&u.return();case 15:if(t.prev=15,!i){t.next=18;break}throw s;case 18:return t.finish(15);case 19:return t.finish(12);case 20:if(0!==e.multipleSelection.length){t.next=25;break}return e.$message({type:"warning",message:"请选择数据！"}),t.abrupt("return");case 25:if(""!==e.batchFilterData){t.next=30;break}return e.$message({type:"warning",message:"请选择批处理操作！"}),t.abrupt("return");case 30:if("delete"!==e.batchFilterData){t.next=35;break}return t.next=33,e.$confirm("确认删除？","提示",{type:"warning"}).catch(function(){});case 33:"confirm"===t.sent&&(e.multipleSelection.forEach(function(){var t=l()(o.a.mark(function t(r){var n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(h.a)();case 2:n=e.tableData.list.indexOf(r),e.tableData.list.splice(n,1),e.refreshTable();case 5:case"end":return t.stop()}},t,e)}));return function(e){return t.apply(this,arguments)}}()),e.getResultMessage("删除成功！"));case 35:case"end":return t.stop()}},t,e,[[4,8,12,20],[13,,15,19]])}))()},getResultMessage:function(e){this.$message({message:e,type:"success"})}},watch:{$route:function(e,t){this.init()}}},d=(r("O4nn"),r("KHd+")),m=Object(d.a)(p,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[r("div",{staticClass:"content"},[r("div",{staticClass:"content-spe"},[r("p",{staticClass:"content-spe-title"},[e._v(e._s(e.$t("route.userManage")))]),e._v(" "),r("div",{staticClass:"content-spe-element"},[r("ComponentFilter",[r("el-form",{ref:"filterFormData",staticClass:"demo-form-inline",attrs:{slot:"filterForm",model:e.filterFormData,inline:!0,"label-width":"90px"},nativeOn:{submit:function(e){e.preventDefault()}},slot:"filterForm"},[r("el-form-item",{attrs:{label:"用户名：",prop:"userName"}},[r("el-input",{attrs:{placeholder:"请输入用户名"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.refreshTable(t):null}},model:{value:e.filterFormData.userName,callback:function(t){e.$set(e.filterFormData,"userName",t)},expression:"filterFormData.userName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"用户手机：",prop:"userMobile"}},[r("el-input",{attrs:{placeholder:"请输入内容"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.refreshTable(t):null}},model:{value:e.filterFormData.userMobile,callback:function(t){e.$set(e.filterFormData,"userMobile",t)},expression:"filterFormData.userMobile"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"用户状态：",prop:"userStatus"}},[r("CustomSelect",{ref:"userStatusSelect",attrs:{options:e.userStatusOptions,type:"userStatus","default-selected":"","is-all":!0},on:{selectChangeCallBack:e.handleParamsChange}})],1),e._v(" "),r("el-form-item",{staticClass:"el-form-button"},[r("el-button",{attrs:{icon:"el-icon-search",size:"mini",type:"primary",plain:""},on:{click:e.refreshTable}},[e._v("查询\n              ")]),e._v(" "),r("el-button",{attrs:{icon:"el-icon-plus",size:"mini",type:"success",plain:""}},[e._v("新增\n                         ")]),e._v(" "),r("el-button",{attrs:{icon:"el-icon-refresh",size:"mini",type:"warning",plain:""},on:{click:e.clear}},[e._v("清空\n              ")])],1)],1)],1),e._v(" "),r("div",{staticClass:"table-content"},[e._m(0),e._v(" "),r("div",{staticClass:"table-content-spe"},[r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableDataLoading,expression:"tableDataLoading"}],attrs:{stripe:"",fit:"",border:"","highlight-current-row":"",data:e.userList,"tooltip-effect":"dark","element-loading-text":"数据加载中","element-loading-spinner":"el-icon-loading"},on:{"selection-change":e.handleSelectionChange}},[r("el-table-column",{attrs:{width:"40",type:"selection",align:"center"}}),e._v(" "),e._l(e.treeColumns,function(e,t){return r("el-table-column",{key:t,attrs:{prop:e.prop,label:e.label,width:e.width?e.width:"","min-width":e.minWidth?e.minWidth:"",sortable:e.sortable,align:"center"}})}),e._v(" "),r("el-table-column",{attrs:{label:"地址",align:"center","min-width":"350"},scopedSlots:e._u([{key:"default",fn:function(t){return[!1===t.row.edit?r("span",[e._v("\n                    "+e._s(t.row.userAddress)+"\n                    "),r("i",{staticClass:"el-icon-edit edit",on:{click:function(e){t.row.edit=!t.row.edit}}})]):r("span",[r("el-input",{staticClass:"address-input-inline",model:{value:t.row.userAddress,callback:function(r){e.$set(t.row,"userAddress",r)},expression:"scope.row.userAddress"}}),e._v(" "),r("i",{staticClass:"el-icon-check check",on:{click:function(r){e.editInline(t.row)}}}),e._v(" "),r("i",{staticClass:"el-icon-close close",on:{click:function(e){t.row.edit=!t.row.edit}}})],1)]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"状态",align:"center","min-width":"60"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-switch",{attrs:{"active-value":"1","inactive-value":"0"},on:{change:function(r){e.handleSwitchChange(t.row)}},model:{value:t.row.userStatus,callback:function(r){e.$set(t.row,"userStatus",r)},expression:"scope.row.userStatus"}})]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"角色",align:"center","min-width":"360"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(t.row.userRoles,function(t){return r("el-tag",{key:t.value,attrs:{"disable-transitions":!0}},[e._v(e._s(t.roleName)+"\n                  ")])})}}])}),e._v(" "),r("el-table-column",{attrs:{label:"头像",align:"center",width:"50"},scopedSlots:e._u([{key:"default",fn:function(t){return[""!==t.row.userAvatar&&void 0!==t.row.userAvatar?r("img",{attrs:{src:t.row.userAvatar,width:"30",height:"30"}}):e._e()]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"操作",align:"center",fixed:"right","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-tooltip",{attrs:{content:"编辑",placement:"left"}},[r("el-button",{attrs:{plain:"",icon:"el-icon-edit",size:"mini",type:"primary"},on:{click:function(r){e.update(t.row)}}})],1),e._v(" "),r("Button",{staticStyle:{marginLeft:"10px"},attrs:{plain:"",tooltip:"",icon:"el-icon-delete",size:"mini",type:"danger",placement:"right",content:"删除"},on:{click:function(r){e.del(t.row)}}})]}}])})],2)],1),e._v(" "),r("div",{staticClass:"table-content-page"},[r("el-row",[r("el-col",{attrs:{sm:24,md:12,lg:8}},[r("el-select",{staticClass:"table-content-page-batch",attrs:{placeholder:"批量操作"},model:{value:e.batchFilterData,callback:function(t){e.batchFilterData=t},expression:"batchFilterData"}},[r("el-option",{key:"delete",attrs:{label:"批量删除",value:"delete"}})],1),e._v(" "),r("el-button",{staticClass:"table-content-page-search",attrs:{size:"mini",type:"primary",plain:""},on:{click:function(t){e.batcthExecute()}}},[e._v("确定")])],1),e._v(" "),r("el-col",{staticClass:"table-content-page-pagination hidden-md-and-down",attrs:{lg:16}},[r("el-pagination",{attrs:{"page-sizes":[10,20,30,40,50,100],"page-size":10,"pager-count":5,layout:"total, sizes, prev, pager, next, jumper",total:e.userListAll.length},on:{"size-change":e.handleSizeChange,"current-change":e.handlePageChange}})],1),e._v(" "),r("el-col",{staticClass:"table-content-page-pagination hidden-lg-and-up hidden-sm-and-down",attrs:{md:12}},[r("el-pagination",{attrs:{"page-size":10,"pager-count":5,layout:"prev, pager, next",total:e.userListAll.length},on:{"size-change":e.handleSizeChange,"current-change":e.handlePageChange}})],1),e._v(" "),r("el-col",{staticClass:"table-content-page-pagination hidden-md-and-up",attrs:{sm:24}},[r("el-pagination",{attrs:{"page-size":10,"pager-count":5,layout:"prev, pager, next",total:e.userListAll.length},on:{"size-change":e.handleSizeChange,"current-change":e.handlePageChange}})],1)],1)],1)])],1)])]),e._v(" "),r("el-dialog",{attrs:{visible:e.dialogVisible,title:"编辑用户"},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("el-form",{model:{value:e.userForm,callback:function(t){e.userForm=t},expression:"userForm"}},[r("el-form-item",{attrs:{label:"用户名","label-width":"200px"}},[r("el-input",{model:{value:e.userForm.userName,callback:function(t){e.$set(e.userForm,"userName",t)},expression:"userForm.userName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"活动区域","label-width":"200px"}},[r("el-select",{attrs:{placeholder:"请选择活动区域"},model:{value:e.userForm.userName,callback:function(t){e.$set(e.userForm,"userName",t)},expression:"userForm.userName"}},[r("el-option",{attrs:{label:"区域一",value:"shanghai"}}),e._v(" "),r("el-option",{attrs:{label:"区域二",value:"beijing"}})],1)],1)],1)],1)],1)},[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"table-content-header"},[t("i",{staticClass:"el-icon-d-arrow-right",staticStyle:{"font-size":"16px"}}),this._v(" "),t("span",[this._v("用户列表")]),this._v(" "),t("div",{staticClass:"table-content-header-search"})])}],!1,null,"6a97d5ac",null);m.options.__file="userManage.vue";t.default=m.exports}}]);