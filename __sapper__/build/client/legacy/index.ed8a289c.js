import{d as t,_ as n,e as r,f as s,i as e,s as o,h as c,S as a,k as f,t as i,n as u,o as l,p as h,l as p,r as v,w as g,x as m,R as d,j as R,q as y,m as E,C as b,z as j,D as x}from"./client.a51ef517.js";function D(t){var s=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,o=n(t);if(s){var c=n(this).constructor;e=Reflect.construct(o,arguments,c)}else e=o.apply(this,arguments);return r(this,e)}}function S(t,n,r){var s=t.slice();return s[1]=n[r],s}function q(t){var n,r,s,e,o=t[1].title+"";return{c:function(){n=f("li"),r=f("a"),s=i(o),this.h()},l:function(t){n=u(t,"LI",{});var e=l(n);r=u(e,"A",{rel:!0,href:!0});var c=l(r);s=h(c,o),c.forEach(p),e.forEach(p),this.h()},h:function(){v(r,"rel","prefetch"),v(r,"href",e="blog/"+t[1].slug)},m:function(t,e){g(t,n,e),m(n,r),m(r,s)},p:function(t,n){1&n&&o!==(o=t[1].title+"")&&d(s,o),1&n&&e!==(e="blog/"+t[1].slug)&&v(r,"href",e)},d:function(t){t&&p(n)}}}function z(t){for(var n,r,s,e,o,c,a=t[0],d=[],D=0;D<a.length;D+=1)d[D]=q(S(t,a,D));return{c:function(){n=R(),r=f("section"),s=f("h1"),e=i("Recent posts"),o=R(),c=f("ul");for(var t=0;t<d.length;t+=1)d[t].c();this.h()},l:function(t){y('[data-svelte="svelte-hfp9t8"]',document.head).forEach(p),n=E(t),r=u(t,"SECTION",{class:!0});var a=l(r);s=u(a,"H1",{class:!0});var f=l(s);e=h(f,"Recent posts"),f.forEach(p),o=E(a),c=u(a,"UL",{class:!0});for(var i=l(c),v=0;v<d.length;v+=1)d[v].l(i);i.forEach(p),a.forEach(p),this.h()},h:function(){document.title="Blog",v(s,"class","is-size-3 mb-4"),v(c,"class","ml-3 svelte-dfcnm7"),v(r,"class","section")},m:function(t,a){g(t,n,a),g(t,r,a),m(r,s),m(s,e),m(r,o),m(r,c);for(var f=0;f<d.length;f+=1)d[f].m(c,null)},p:function(t,n){var r=b(n,1)[0];if(1&r){var s;for(a=t[0],s=0;s<a.length;s+=1){var e=S(t,a,s);d[s]?d[s].p(e,r):(d[s]=q(e),d[s].c(),d[s].m(c,null))}for(;s<d.length;s+=1)d[s].d(1);d.length=a.length}},i:j,o:j,d:function(t){t&&p(n),t&&p(r),x(d,t)}}}function C(t){t.params,t.query;return this.fetch("blog.json").then((function(t){return t.json()})).then((function(t){return{posts:t}}))}function I(t,n,r){var s=n.posts;return t.$set=function(t){"posts"in t&&r(0,s=t.posts)},[s]}var L=function(n){t(f,a);var r=D(f);function f(t){var n;return s(this,f),n=r.call(this),e(c(n),t,I,z,o,{posts:0}),n}return f}();export default L;export{C as preload};
