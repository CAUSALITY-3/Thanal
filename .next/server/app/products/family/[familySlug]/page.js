(()=>{var e={};e.id=488,e.ids=[488],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},39491:e=>{"use strict";e.exports=require("assert")},14300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},82361:e=>{"use strict";e.exports=require("events")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},71017:e=>{"use strict";e.exports=require("path")},63477:e=>{"use strict";e.exports=require("querystring")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},5522:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>n.a,__next_app__:()=>d,originalPathname:()=>u,pages:()=>c,routeModule:()=>m,tree:()=>l});var s=r(50482),i=r(69108),a=r(62563),n=r.n(a),o=r(68300),p={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(p[e]=()=>o[e]);r.d(t,p);let l=["",{children:["products",{children:["family",{children:["[familySlug]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,7378)),"C:\\Users\\abinb\\Desktop\\my shopping site\\Thanal\\src\\app\\products\\family\\[familySlug]\\page.tsx"]}]},{}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,65557)),"C:\\Users\\abinb\\Desktop\\my shopping site\\Thanal\\src\\app\\layout.tsx"],loading:[()=>Promise.resolve().then(r.bind(r,92793)),"C:\\Users\\abinb\\Desktop\\my shopping site\\Thanal\\src\\app\\loading.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,69361,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["C:\\Users\\abinb\\Desktop\\my shopping site\\Thanal\\src\\app\\products\\family\\[familySlug]\\page.tsx"],u="/products/family/[familySlug]/page",d={require:r,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/products/family/[familySlug]/page",pathname:"/products/family/[familySlug]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},41682:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,31900,23))},93969:(e,t,r)=>{"use strict";r.d(t,{I:()=>o});var s=r(25036);r(40002),r(6249);var i=r(2813),a=r(19857);let n={WebkitUserDrag:"none",borderTopRightRadius:"5px",borderTopLeftRadius:"5px","object-fit":"cover"},o=({props:e,type:t})=>{let r=`${process.env.IMAGE_URL}/images/getImage?path=products/${t}/${e.name}/1.jpg`;return(0,s.jsxs)("div",{className:"productBox",children:[s.jsx("div",{className:"imageContainer",children:s.jsx(i.default,{src:r,alt:"Picture of the author",placeholder:"blur",fill:!0,style:n})}),(0,s.jsxs)("div",{className:"productDetails",children:[s.jsx("p",{className:"productName",children:e.name}),(0,s.jsxs)("p",{className:"productPrice",children:["₹",e.price]}),s.jsx(a.J,{ratings:e.ratings,size:"s",type:"star"})]})]})}},7378:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n});var s=r(25036),i=r(52185),a=r(93969);async function n({params:e}){let t=(await (0,i.k)("get","PRODUCT_FAMILY",{},`?family=${e.familySlug}`)).map(e=>({name:e.name,description:e.description,image:e.image,price:e.price,productId:e.productId,ratings:e.ratings,category:e.category}));return s.jsx("div",{className:"prouctItemContainer",children:t.map((e,t)=>s.jsx(a.I,{props:e,type:e.category},t))})}r(57179)},6249:()=>{},57179:()=>{}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,596,385,208,337,27],()=>r(5522));module.exports=s})();