import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath'
const Login = ({setshowwelcomeHandler}) => {
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")

  const loginHandler=async(e)=>{
    e.preventDefault();
    try {
      const response=await fetch(`${API_URL}/vendor/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password})
      })
      const data=await response.json()
      if(!data.ok){
        alert("login success")
        localStorage.setItem("login token",data.token)
        setEmail("")
        setPassword("")
        setshowwelcomeHandler()
        const vendorId=data.vendorId
        console.log("vendor id is:",vendorId)
        const vendorResponse=await fetch(`${API_URL}/vendor/getVendorById/${vendorId}`)
        const vendorData=await vendorResponse.json();
        if(vendorResponse.ok){
          const vendorFirmId=vendorData.vendorFirmId;
          const vendorFirmName=vendorData.vendor.firm[0].firmName
        //  alert(vendorFirmName)
          // console.log("Firm name",vendorFirmName)
          console.log('checking',vendorFirmId)
          localStorage.setItem("firmId",vendorFirmId)
          localStorage.setItem("firmName",vendorFirmName)
          window.location.reload()
        }
      }
    } catch (error) {
        console.log(error)

    }
  }
  return (
    <div className='LoginForm'>
        <h3>Login</h3><br />
        <form className='authForm' onSubmit={loginHandler}>
            <label htmlFor="email">email</label>
            <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="enter your email" required/><br />
            <label htmlFor="password">password</label>
            <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="enter your password" required />
            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Login