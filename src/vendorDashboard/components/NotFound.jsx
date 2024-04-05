import React from 'react'
import {Link} from 'react-router-dom'
const NotFound = () => {
  return (
   <>

       
         <div className='error'>
            <center>
            <Link to="/">
                <p>Go Back</p>
            </Link>
                <b>
                    <strong>
                        <h1>404 Not found </h1>
                        
                    </strong>
                </b>
            </center>
        </div>

   </>
  )
}

export default NotFound