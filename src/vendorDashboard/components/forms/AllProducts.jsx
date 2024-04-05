import React,{useState,useEffect} from 'react'
import { API_URL } from '../../data/apiPath'

const AllProducts = () => {
    const[products,setProducts]=useState([])
    const getProductsHandler=async()=>{
        const firmId=localStorage.getItem("firmId")
        try {
            const response=await fetch(`${API_URL}/product/${firmId}/products`);
            const newProductsData=await response.json()
            setProducts(newProductsData.products)
            console.log("new products data ",newProductsData.products)
        } catch (error) {
            console.log(error)
            alert("falied to fetch products")
        }
    }
    const deleteProduct=async(productId)=>{
        try {
            const response=await fetch(`${API_URL}/product/${productId}`,{
                method:"DELETE"
            });
            if(response.ok){
                setProducts(products.filter((pro)=>pro._id !== productId));
                confirm("are you sure you want to delete?");
              
            }

        } catch (error) {
            console.log('product not deleted')
        }
    }
    useEffect(()=>{
        getProductsHandler();
      
    },[])
  return (
    <div>
        {
            !products ?(
                <p>No products found</p>
            ):(
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>Productsname</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item)=>{
                            return(
                                <>
                                    <tr key={item._id}>
                                        <td>{item.productName}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            {item.image && (
                                                <img src={`${API_URL}/uploads/${item.image}`} 
                                                style={{width:"100px",height:"100px"}}
                                                alt={item.productName} />
                                            )}
                                        </td>
                                        <td>
                                            <button onClick={()=>{deleteProduct(item._id)}}>Delete</button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
            )
        }
    </div>
  )
}

export default AllProducts