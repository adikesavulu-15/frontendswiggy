import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath'
const Register = ({loginHandler}) => {
  const[username,setUsername]=useState('')
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[error,setError]=useState("")
  const [loading,setLoading]=useState(true)

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response=await fetch(`${API_URL}/vendor/register`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({username,email,password})
      })
      const data=await response.json();
      if(response.ok){
        console.log(data);
        alert("data posted success")
        setUsername("")
        setEmail("")
        setPassword("")
        loginHandler()
      }
    } catch (error) {
      console.log("Registration failed",error)
      alert(error)
    }

  }
  return (
    <div className='RegisterForm'>
        <h3>Register</h3><br />
        <form className='authForm' onSubmit={handleSubmit}>
        <label htmlFor="username">username</label>
            <input type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="enter your username" /><br />
            <label htmlFor="email">email</label>
            <input type="text" name="email" value={email} placeholder="enter your email" onChange={(e)=>setEmail(e.target.value)}/><br />
            <label htmlFor="password">password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="password"placeholder="enter your password" />
            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Register