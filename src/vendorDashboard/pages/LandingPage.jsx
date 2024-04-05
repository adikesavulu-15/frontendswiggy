import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import Sidebar from '../components/Sidebar'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/forms/AllProducts'
const LandingPage = () => {
  const[showLogin,setShowLogin]=useState(false)
  const[showRegister,setShowRegister]=useState(false)

  const [showFirm,setShowFirm]=useState(false)
  const [showaddProducts,setshowaddProducts]=useState(false)
  const[showWelcome,setShowWelcome]=useState(false)
  const[showAllProducts,setshowAllProducts]=useState(false)
  const[showLogout,setShowLogout]=useState(false)
  const[showFirmTitle,setShowFirmTitle]=useState(true)
  useEffect(()=>{
    const loginToken=localStorage.getItem("login token")
    if(loginToken){
      setShowLogout(true)
    }
  },[])
  useEffect(()=>{
    const firmName=localStorage.getItem("firmName")
    if(firmName){
      setShowFirmTitle(false)
    }
  },[])
  const loginHandler=()=>{
    setShowLogin(true)
    setShowRegister(false)
    setShowFirm(false)
    setshowaddProducts(false)
    setShowWelcome(false)
    setshowAllProducts(false)
  }
  const registerShowHandler=()=>{
    setShowRegister(true)
    setShowLogin(false)
    setShowFirm(false)
    setshowaddProducts(false)
    setShowWelcome(false)
    setshowAllProducts(false)
  }

  const firmShowHandler=()=>{
    if(showLogout){
      setShowFirm(true)
    setShowRegister(false)
    setShowLogin(false)
    setshowaddProducts(false)
    setShowWelcome(false)
    setshowAllProducts(false)
    }else{alert("please login")
  setShowLogin(true)
  }
    
  }
  const addproductShowHandler=()=>{
    if(showLogout){
      setShowFirm(false)
      setshowaddProducts(true)
      setShowRegister(false)
      setShowLogin(false)
      setShowWelcome(false)
      setshowAllProducts(false)
    }else{
      alert('please login')
    setShowLogin(true)}
   
  }
  const setshowwelcomeHandler=()=>{
    setShowFirm(false)
    setshowaddProducts(false)
    setShowRegister(false)
    setShowLogin(false)
    setShowWelcome(true)
    setshowAllProducts(false)
  }
  const setShowAllProductsHandler=()=>{
    if(showLogout){
      setShowFirm(false)
      setshowaddProducts(false)
      setShowRegister(false)
      setShowLogin(false)
      setShowWelcome(false)
      setshowAllProducts(true)
    }else{
      alert('please login')
    setShowLogin(true)}
   
  }

  const logoutHandler=()=>{
    confirm("are you sure to logout")
     localStorage.removeItem("login token")
     localStorage.removeItem("firmId")
     localStorage.removeItem("firmName")
     setShowLogout(false)
     setShowFirmTitle(true)
  }
  return (
    <>
        <section>
            <Navbar loginHandler={loginHandler} 
            registerShowHandler={registerShowHandler} 
            showLogout={showLogout}
             logoutHandler={logoutHandler}
             />
            <div className="collectionSection">
                <Sidebar firmShowHandler={firmShowHandler} addproductShowHandler={addproductShowHandler} setShowAllProductsHandler={setShowAllProductsHandler} showFirmTitle={showFirmTitle}/>
                {showLogin && <Login setshowwelcomeHandler={setshowwelcomeHandler}/>}
                {showRegister && <Register loginHandler={loginHandler}/>}
                {showFirm && showLogout && <AddFirm/>}
                {showaddProducts && showLogout && <AddProduct/>}
                {showWelcome && <Welcome/>}
                {showAllProducts && showLogout && <AllProducts/>}
                {/* <Login/> */}
                {/* <Register/> */}
                {/* <AddFirm/> */}
                {/* <AllProducts/> */}
            </div>
          
        </section>
    </>
  )
}

export default LandingPage