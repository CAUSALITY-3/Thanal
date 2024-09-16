// Not Needed

// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import "./product.scss";
// const ExpandableList = ({ data }: any) => {
//   return (
//     <div className="expandableProductList">
//       {data.map((category: any, index: any) => (
//         <Category key={index} category={category} />
//       ))}
//     </div>
//   );
// };

// const Category = ({ category }: any) => {
//   const [isExpanded, setIsExpanded] = useState(true);
//   const contentRef = useRef<any>(null);
//   const [parentState, setParentState] = useState(0);

//   const handleChildChange = () => {
//     contentRef.current.style.maxHeight = `${
//       contentRef.current.scrollHeight + 300
//     }px`;
//   };
//   useEffect(() => {
//     console.log("parentState", contentRef.current.style.maxHeight);
//     if (isExpanded) {
//       contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
//     } else {
//       contentRef.current.style.maxHeight = "0px";
//     }
//   }, [isExpanded, parentState]);

//   return (
//     <div className="category">
//       <h2 onClick={() => setIsExpanded(!isExpanded)}>
//         {category.category}
//         <span className={`chevron ${isExpanded ? "expanded" : "collapsed"}`}>
//           {isExpanded ? "▼" : "▶"}
//         </span>
//       </h2>
//       <div
//         ref={contentRef}
//         className={`expandable ${isExpanded ? "expanded" : "collapsed"}`}
//       >
//         {category.data.map((family: any, index: any) => (
//           <Family
//             key={index}
//             family={family}
//             handleChildChange={handleChildChange}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const Family = ({ family, handleChildChange }: any) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const contentRef = useRef<any>(null);

//   useEffect(() => {
//     if (isExpanded) {
//       contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
//     } else {
//       contentRef.current.style.maxHeight = "0px";
//     }
//     handleChildChange();
//   }, [isExpanded]);

//   return (
//     <div className="family">
//       <h3 onClick={() => setIsExpanded(!isExpanded)}>
//         {family.family}
//         <span className={`chevron ${isExpanded ? "expanded" : "collapsed"}`}>
//           {isExpanded ? "▼" : "▶"}
//         </span>
//       </h3>
//       <div
//         ref={contentRef}
//         className={`expandable ${isExpanded ? "expanded" : "collapsed"}`}
//       >
//         {family.products.map((product: any) => (
//           <Product key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// const Product = ({ product }: any) => {
//   return (
//     <div className="product">
//       <p>{product.name}</p>
//       <img src={product.image} alt={product.name} width="100" />
//     </div>
//   );
// };

// export default ExpandableList;
