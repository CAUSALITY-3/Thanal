"use strict";(()=>{var e={};e.id=976,e.ids=[976],e.modules={45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},79649:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>g,originalPathname:()=>v,patchFetch:()=>m,requestAsyncStorage:()=>p,routeModule:()=>l,serverHooks:()=>f,staticGenerationAsyncStorage:()=>d,staticGenerationBailout:()=>O});var o={};r.r(o),r.d(o,{POST:()=>u});var a=r(25259),n=r(84868),i=r(55006),s=r(75874),c=r(55138);async function u(e){let{payload:t,email:r}=await e.json();console.log("UPDATE_USER_BY_QUERY",t,r);let o=await (0,s.k)("PUT","UPDATE_USER_BY_QUERY",{},`?email=${r}`,JSON.stringify(t),{"Content-Type":"application/json"});return console.log(o),c.NextResponse.json(o,{status:200})}let l=new a.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/addDetails/route",pathname:"/api/addDetails",filename:"route",bundlePath:"app/api/addDetails/route"},resolvedPagePath:"C:\\Users\\abinb\\Desktop\\my shopping site\\Thanal\\src\\app\\api\\addDetails\\route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:p,staticGenerationAsyncStorage:d,serverHooks:f,headerHooks:g,staticGenerationBailout:O}=l,v="/api/addDetails/route";function m(){return(0,i.patchFetch)({serverHooks:f,staticGenerationAsyncStorage:d})}},75874:(e,t,r)=>{r.d(t,{k:()=>u});let o={PRODUCT_MAINLIST:"products/productMainList",GET_PRODUCT_BY_ID:"products/product",UPSERT_USER:"users/upsertUser",UPDATE_USER_BY_QUERY:"users/update",GET_USER_BY_EMAIL:"users/getUserByEmail",GET_IMAGES:"images/getImageNames",PRODUCT_FAMILY:"products/getAllUnderFamily",GET_ORDER_ID:"payments/createOrder",ADD_TO_BAG:"users/addToBag"},a={ERROR:31,INFO:32,WARN:33};function n(e,t,r){"true"!==process.env.DISABLED_LOGS&&console.log(`\x1b[${a[e]||33}m%s\x1b[0m`,`[${e||"INFO"}] ${new Date().toLocaleString()} : ${r||""}=>`,JSON.stringify(t))}var i=r(20396);function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,o)}return r}let c=process.env.API_BASE_URL;async function u(e,t,r,a="",u,l,p){try{let p=c+o[t]+a,d={method:e,headers:l,body:u,next:{revalidate:r?.revalidate,tags:r?.tags}};n("INFO",function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach(function(t){var o,a;o=t,a=r[t],(o=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!=typeof o)return o;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(o))in e?Object.defineProperty(e,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[o]=a}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({url:p},d),"calling DB service, http options ");let f=await fetch(p,d);if(!f.ok)throw Error("Network response was not ok");let g=await f.json();return function(e=[],t=[]){for(let t of e)(0,i.revalidatePath)(t);for(let e of t)(0,i.revalidateTag)(e)}(r?.revalidatePaths,r?.revalidateTags),n("INFO",g,"Successful response from DB service, responseData "),g}catch(e){if(n("ERROR",e,"Error on DB service call, error "),p)return p;throw e}}process.env.API_TIME_OUT}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[156,52,0],()=>r(79649));module.exports=o})();