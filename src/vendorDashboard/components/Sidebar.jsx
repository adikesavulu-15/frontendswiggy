import React from 'react'

const Sidebar = ({firmShowHandler,addproductShowHandler,setShowAllProductsHandler,showFirmTitle}) => {
  return (
    <div className='sideBarSection'>
        <ul>
            {showFirmTitle ? <li onClick={firmShowHandler}>Add firms</li>:''}
            <li onClick={addproductShowHandler}>Add Products</li>
            <li onClick={setShowAllProductsHandler}>All Products</li>
            <li>UserDetails</li>
        </ul>
    </div>
  )
}

export default Sidebar