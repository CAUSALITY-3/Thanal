// 'use client'

// import { FC, useState, useEffect } from 'react'
// import menu from '@public/menu.svg'
// import close from '@public/close.svg'
// import logo from '@public/logo.svg'

// export const Navbar: FC = () => {
//   const [toggleMenu, setToggleMenu] = useState(false)
//   const [screenWidth, setScreenWidth] = useState(0)

  

//   const changeWidth = () => {
//     setScreenWidth(window.innerWidth);
//     const isMobile = window.innerWidth < 500;
//     console.log(window.innerWidth)
//     if(isMobile) {
//       document.cookie="isMobile=true";
//     } else {
//       document.cookie="isMobile=false";
//     }
//   }

//   useEffect(() => {
//     window.addEventListener('resize', changeWidth)
//     return () => {
//       window.removeEventListener('resize', changeWidth)
//     }

//   }, [])

//   const toggleNav = () => {
//     setToggleMenu(!toggleMenu)
//   }
//   return (
//     <nav>
//       <div className="logo" >
//         <img id='Layer_1' src={logo} />
//         </div>
      
//         <ul className="nav-list">
//           <div className="nav-list-items" >Login</div>
//           <div className="nav-list-items" >Products</div>
//           <div className="nav-list-items" >Contact</div>
//         </ul>
      
//       {toggleMenu ? (screenWidth <= 500) && <img onClick={toggleNav} className="menu" src={close} /> : (screenWidth <= 500) && <img onClick={toggleNav} className="menu" src={menu} />}
//     </nav>
//   )
// }

// export default Navbar