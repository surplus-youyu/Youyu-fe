(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-09dd2f38"],{"02f4":function(t,e,n){var r=n("4588"),s=n("be13");t.exports=function(t){return function(e,n){var a,i,c=String(s(e)),o=r(n),u=c.length;return o<0||o>=u?t?"":void 0:(a=c.charCodeAt(o),a<55296||a>56319||o+1===u||(i=c.charCodeAt(o+1))<56320||i>57343?t?c.charAt(o):a:t?c.slice(o,o+2):i-56320+(a-55296<<10)+65536)}}},"02fb":function(t,e,n){},"0390":function(t,e,n){"use strict";var r=n("02f4")(!0);t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},"0bfb":function(t,e,n){"use strict";var r=n("cb7c");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"214f":function(t,e,n){"use strict";n("b0c5");var r=n("2aba"),s=n("32e9"),a=n("79e5"),i=n("be13"),c=n("2b4c"),o=n("520a"),u=c("species"),l=!a(function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}),f=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();t.exports=function(t,e,n){var h=c(t),p=!a(function(){var e={};return e[h]=function(){return 7},7!=""[t](e)}),g=p?!a(function(){var e=!1,n=/a/;return n.exec=function(){return e=!0,null},"split"===t&&(n.constructor={},n.constructor[u]=function(){return n}),n[h](""),!e}):void 0;if(!p||!g||"replace"===t&&!l||"split"===t&&!f){var d=/./[h],v=n(i,h,""[t],function(t,e,n,r,s){return e.exec===o?p&&!s?{done:!0,value:d.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}}),b=v[0],y=v[1];r(String.prototype,t,b),s(RegExp.prototype,h,2==e?function(t,e){return y.call(t,this,e)}:function(t){return y.call(t,this)})}}},"2d8c":function(t,e,n){"use strict";n.d(e,"a",function(){return r});n("3b2b"),n("a481");function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"yyyy-MM-dd hh:mm",n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};for(var r in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length))),n)new RegExp("("+r+")").test(e)&&(e=e.replace(RegExp.$1,1===RegExp.$1.length?n[r]:("00"+n[r]).substr((""+n[r]).length)));return e}},"2f21":function(t,e,n){"use strict";var r=n("79e5");t.exports=function(t,e){return!!t&&r(function(){e?t.call(null,function(){},1):t.call(null)})}},"2fdb":function(t,e,n){"use strict";var r=n("5ca1"),s=n("d2c8"),a="includes";r(r.P+r.F*n("5147")(a),"String",{includes:function(t){return!!~s(this,t,a).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},"3b2b":function(t,e,n){var r=n("7726"),s=n("5dbc"),a=n("86cc").f,i=n("9093").f,c=n("aae3"),o=n("0bfb"),u=r.RegExp,l=u,f=u.prototype,h=/a/g,p=/a/g,g=new u(h)!==h;if(n("9e1e")&&(!g||n("79e5")(function(){return p[n("2b4c")("match")]=!1,u(h)!=h||u(p)==p||"/a/i"!=u(h,"i")}))){u=function(t,e){var n=this instanceof u,r=c(t),a=void 0===e;return!n&&r&&t.constructor===u&&a?t:s(g?new l(r&&!a?t.source:t,e):l((r=t instanceof u)?t.source:t,r&&a?o.call(t):e),n?this:f,u)};for(var d=function(t){t in u||a(u,t,{configurable:!0,get:function(){return l[t]},set:function(e){l[t]=e}})},v=i(l),b=0;v.length>b;)d(v[b++]);f.constructor=u,u.prototype=f,n("2aba")(r,"RegExp",u)}n("7a56")("RegExp")},"3f97":function(t,e,n){"use strict";n.d(e,"b",function(){return r}),n.d(e,"a",function(){return s});var r={TASK_STATUS_CREATED:"暂时无人领取",TASK_STATUS_PENDING:"等待完成",TASK_STATUS_FINISHED:"已结束"},s={ASSIGNMENT_STATUS_PENDING:"未完成",ASSIGNMENT_STATUS_JUDGING:"等待审核",ASSIGNMENT_STATUS_SUCCESS:"审核通过",ASSIGNMENT_STATUS_FAILED:"审核未通过"}},"48f7":function(t,e,n){"use strict";var r=n("02fb"),s=n.n(r);s.a},5147:function(t,e,n){var r=n("2b4c")("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(n){try{return e[r]=!1,!"/./"[t](e)}catch(s){}}return!0}},"520a":function(t,e,n){"use strict";var r=n("0bfb"),s=RegExp.prototype.exec,a=String.prototype.replace,i=s,c="lastIndex",o=function(){var t=/a/,e=/b*/g;return s.call(t,"a"),s.call(e,"a"),0!==t[c]||0!==e[c]}(),u=void 0!==/()??/.exec("")[1],l=o||u;l&&(i=function(t){var e,n,i,l,f=this;return u&&(n=new RegExp("^"+f.source+"$(?!\\s)",r.call(f))),o&&(e=f[c]),i=s.call(f,t),o&&i&&(f[c]=f.global?i.index+i[0].length:e),u&&i&&i.length>1&&a.call(i[0],n,function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(i[l]=void 0)}),i}),t.exports=i},"55dd":function(t,e,n){"use strict";var r=n("5ca1"),s=n("d8e8"),a=n("4bf8"),i=n("79e5"),c=[].sort,o=[1,2,3];r(r.P+r.F*(i(function(){o.sort(void 0)})||!i(function(){o.sort(null)})||!n("2f21")(c)),"Array",{sort:function(t){return void 0===t?c.call(a(this)):c.call(a(this),s(t))}})},"5f1b":function(t,e,n){"use strict";var r=n("23c6"),s=RegExp.prototype.exec;t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var a=n.call(t,e);if("object"!==typeof a)throw new TypeError("RegExp exec method returned something other than an Object or null");return a}if("RegExp"!==r(t))throw new TypeError("RegExp#exec called on incompatible receiver");return s.call(t,e)}},6762:function(t,e,n){"use strict";var r=n("5ca1"),s=n("c366")(!0);r(r.P,"Array",{includes:function(t){return s(this,t,arguments.length>1?arguments[1]:void 0)}}),n("9c6c")("includes")},"726f":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"sort-group"},[n("sort-button",{staticClass:"sort-btn",attrs:{title:"时间"},on:{"status-change":t.selectTime}}),n("Select",{staticClass:"select",staticStyle:{width:"102px"},attrs:{clearable:"",placeholder:"任务类型"},on:{"on-change":t.selectType}},[n("Option",{key:"CUSTOM",attrs:{value:"CUSTOM"}},[t._v("自定义任务")]),n("Option",{key:"SURVEY",attrs:{value:"SURVEY"}},[t._v("调查问卷")])],1),n("Input",{staticClass:"search",attrs:{type:"text",clearable:"",placeholder:"请输入搜索内容",suffix:"ios-search"},on:{"on-change":t.search},model:{value:t.searchText,callback:function(e){t.searchText=e},expression:"searchText"}})],1),n("Table",{staticClass:"assign-list",attrs:{stripe:"",columns:t.tableColumns,data:t.showPageAssignments},scopedSlots:t._u([{key:"action",fn:function(e){e.row;var r=e.index;return[n("Button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.getAssignDetail(r)}}},[t._v("查看详情")])]}}])}),n("div",{staticClass:"page-container"},[n("Page",{staticClass:"page",attrs:{total:t.showAssignments.length,"page-size":t.pageSize},on:{"on-change":t.pageChange}})],1)],1)},s=[],a=(n("7f7f"),n("6762"),n("2fdb"),n("55dd"),n("96cf"),n("3b8d")),i=(n("ac6a"),n("d225")),c=n("b0b4"),o=n("308d"),u=n("6bb5"),l=n("4e2b"),f=n("9ab4"),h=n("60a3"),p=n("e989"),g=n("5c57"),d=n("9bc5"),v=n("afe4"),b=n("3f97"),y=n("2d8c"),m=function(t){function e(){var t;return Object(i["a"])(this,e),t=Object(o["a"])(this,Object(u["a"])(e).apply(this,arguments)),t.tableColumns=[{title:"标题",key:"title"},{title:"类型",key:"type"},{title:"状态",key:"status"},{title:"创建日期",key:"created_at"},{title:"操作",key:"action",slot:"action",width:200,align:"center"}],t.dataType="",t.searchText="",t.sortTimeOrder=0,t.sortAssignType="",t.currentPage=1,t.pageSize=10,t.allAssignments=[],t.showAssignments=[],t}return Object(l["a"])(e,t),Object(c["a"])(e,[{key:"getallAssignments",value:function(t){var e=this.$store.getters[t];this.allAssignments=JSON.parse(JSON.stringify(e)),this.formatshowAssignments()}},{key:"formatshowAssignments",value:function(){var t=this;this.showAssignments=JSON.parse(JSON.stringify(this.allAssignments)),this.showAssignments.forEach(function(e){e.created_at=Object(y["a"])(new Date(e.created_at)),"accepted"===t.dataType?e.status=b["a"][e.status]:e.status=b["b"][e.status],e.type="TASK_TYPE_CUSTOM"===e.type?"自定义任务":"调查问卷"})}},{key:"getAssignDetail",value:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(e){var n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:n=this.showPageAssignments[e],"accepted"===this.dataType?"调查问卷"===n.type?this.$router.push({name:"answer-questionnaire",params:{aid:String(n.id)}}):this.$router.push({name:"answer-custom-task",params:{aid:String(n.id)}}):"调查问卷"===n.type?this.$router.push({name:"published-questionnaire-detail",params:{aid:String(n.id)}}):this.$router.push({name:"published-custom-task-detail",params:{aid:String(n.id)}});case 2:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"selectTime",value:function(t){this.sortTimeOrder=t,this.sortList()}},{key:"selectType",value:function(t){this.sortAssignType=t,this.sortList()}},{key:"sortList",value:function(){var t=this;this.formatshowAssignments(),this.sortAssignType&&(this.showAssignments=this.showAssignments.filter(function(e){return"CUSTOM"===t.sortAssignType?"自定义任务"===e.type:"调查问卷"===e.type})),this.sortTimeOrder&&this.showAssignments.sort(function(e,n){return e.created_at>n.created_at?1===t.sortTimeOrder?-1:1:e.created_at<n.created_at?1===t.sortTimeOrder?1:-1:0})}},{key:"search",value:function(){var t=this;this.sortList(),this.showAssignments=this.showAssignments.filter(function(e,n){return e.title.includes(t.searchText)})}},{key:"pageChange",value:function(t){this.currentPage=t}},{key:"showPageAssignments",get:function(){var t=this;return this.showAssignments.filter(function(e,n){return n/t.pageSize>=t.currentPage-1&&n/t.pageSize<t.currentPage})}}]),e}(h["d"]);m=f["a"]([Object(h["a"])({name:"assignments",components:{SortButton:p["a"]},beforeRouteEnter:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(e,n,r){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if("a-accepted"!==e.name){t.next=6;break}return t.next=3,g["a"].dispatch("assignment/".concat(v["b"]));case 3:r(function(t){t.dataType="accepted",t.getallAssignments("assignment/".concat(v["a"]))}),t.next=9;break;case 6:return t.next=8,g["a"].dispatch("task/".concat(d["e"]));case 8:r(function(t){t.dataType="published",t.getallAssignments("task/".concat(d["c"]))});case 9:case"end":return t.stop()}},t)}));function e(e,n,r){return t.apply(this,arguments)}return e}()})],m);var x=m,S=x,T=(n("48f7"),n("2877")),A=Object(T["a"])(S,r,s,!1,null,"79d8b5cd",null);e["default"]=A.exports},a481:function(t,e,n){"use strict";var r=n("cb7c"),s=n("4bf8"),a=n("9def"),i=n("4588"),c=n("0390"),o=n("5f1b"),u=Math.max,l=Math.min,f=Math.floor,h=/\$([$&`']|\d\d?|<[^>]*>)/g,p=/\$([$&`']|\d\d?)/g,g=function(t){return void 0===t?t:String(t)};n("214f")("replace",2,function(t,e,n,d){return[function(r,s){var a=t(this),i=void 0==r?void 0:r[e];return void 0!==i?i.call(r,a,s):n.call(String(a),r,s)},function(t,e){var s=d(n,t,this,e);if(s.done)return s.value;var f=r(t),h=String(this),p="function"===typeof e;p||(e=String(e));var b=f.global;if(b){var y=f.unicode;f.lastIndex=0}var m=[];while(1){var x=o(f,h);if(null===x)break;if(m.push(x),!b)break;var S=String(x[0]);""===S&&(f.lastIndex=c(h,a(f.lastIndex),y))}for(var T="",A=0,w=0;w<m.length;w++){x=m[w];for(var O=String(x[0]),k=u(l(i(x.index),h.length),0),E=[],_=1;_<x.length;_++)E.push(g(x[_]));var C=x.groups;if(p){var R=[O].concat(E,k,h);void 0!==C&&R.push(C);var j=String(e.apply(void 0,R))}else j=v(O,h,k,E,C,e);k>=A&&(T+=h.slice(A,k)+j,A=k+O.length)}return T+h.slice(A)}];function v(t,e,r,a,i,c){var o=r+t.length,u=a.length,l=p;return void 0!==i&&(i=s(i),l=h),n.call(c,l,function(n,s){var c;switch(s.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,r);case"'":return e.slice(o);case"<":c=i[s.slice(1,-1)];break;default:var l=+s;if(0===l)return n;if(l>u){var h=f(l/10);return 0===h?n:h<=u?void 0===a[h-1]?s.charAt(1):a[h-1]+s.charAt(1):n}c=a[l-1]}return void 0===c?"":c})}})},aae3:function(t,e,n){var r=n("d3f4"),s=n("2d95"),a=n("2b4c")("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[a])?!!e:"RegExp"==s(t))}},b0c5:function(t,e,n){"use strict";var r=n("520a");n("5ca1")({target:"RegExp",proto:!0,forced:r!==/./.exec},{exec:r})},d2c8:function(t,e,n){var r=n("aae3"),s=n("be13");t.exports=function(t,e,n){if(r(e))throw TypeError("String#"+n+" doesn't accept regex!");return String(s(t))}},e989:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"btn_container"},[n("i-button",{class:{active:0!==t.status},attrs:{type:"text"},on:{click:t.statusChange}},[t._v(t._s(t.title)+"\n      "),1===t.status?n("Icon",{staticClass:"icon",class:{active:1===t.status},attrs:{size:"16",type:"ios-arrow-down"}}):-1===t.status?n("Icon",{staticClass:"icon active",attrs:{size:"16",type:"ios-arrow-up"}}):n("div",{staticClass:"bar"})],1)],1)},s=[],a=n("d225"),i=n("b0b4"),c=n("308d"),o=n("6bb5"),u=n("4e2b"),l=n("9ab4"),f=n("60a3"),h=function(t){function e(){var t;return Object(a["a"])(this,e),t=Object(c["a"])(this,Object(o["a"])(e).apply(this,arguments)),t.status=0,t}return Object(u["a"])(e,t),Object(i["a"])(e,[{key:"mounted",value:function(){this.threeType?this.status=0:this.status=1}},{key:"statusChange",value:function(){return this.threeType?this.status=this.status<1?this.status+1:-1:this.status=-this.status,this.status}},{key:"resetBtn",value:function(t,e){var n=this.threeType?0:1;this.status=t?n:this.status}}]),e}(f["d"]);l["a"]([Object(f["c"])({required:!0})],h.prototype,"title",void 0),l["a"]([Object(f["c"])({required:!1})],h.prototype,"reset",void 0),l["a"]([Object(f["c"])({default:!0})],h.prototype,"threeType",void 0),l["a"]([Object(f["b"])()],h.prototype,"statusChange",null),l["a"]([Object(f["e"])("reset")],h.prototype,"resetBtn",null),h=l["a"]([Object(f["a"])({name:"sort-button"})],h);var p=h,g=p,d=(n("f685"),n("2877")),v=Object(d["a"])(g,r,s,!1,null,"135919bb",null);e["a"]=v.exports},f685:function(t,e,n){"use strict";var r=n("fad6"),s=n.n(r);s.a},fad6:function(t,e,n){}}]);
//# sourceMappingURL=chunk-09dd2f38.8946fd92.js.map