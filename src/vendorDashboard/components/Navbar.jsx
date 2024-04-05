import React from 'react'

const Navbar = ({loginHandler,registerShowHandler,showLogout,logoutHandler}) => {
  // console.log(loginHandler)
  const firmName=localStorage.getItem("firmName")
  return (
    <div className='navSection'>
        <div className='company'>
            Vendor Dashboard
        </div>
        <div className="firmName">
          <h4>firmName:{firmName}</h4>
        </div>
        <div>
          {!showLogout ? <>
            <span onClick={registerShowHandler}>Register / </span>
            <span onClick={loginHandler}>Login</span>
          </> : <span onClick={logoutHandler}>Logout</span>}
           
            
        </div>

    </div>
  )
}

export default Navbar