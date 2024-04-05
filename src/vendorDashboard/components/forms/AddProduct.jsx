import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath'

const AddProduct = () => {
  const[productName,setProductName]=useState("")
  const[price,setPrice]=useState("")
  const[category,setCategory]=useState([])
  const[bestSeller,setBestSeller]=useState(false)
  const[description,setDescription]=useState("")
  const[image,setImage]=useState(null)

    const handleCategoryChange=(e)=>{
      const value=e.target.value;
      if(category.includes(value)){
        setCategory(category.filter((item)=>item!== value))
      }else{
        setCategory([...category,value])
      }
    }


    const bestSellerHandler=(e)=>{
      const value=e.target.value === "true";
      setBestSeller(value)
    }
    const handleImageSubmit=(e)=>{
      const images=e.target.files[0]
      setImage(images)
    }
  const handleAddProduct=async(e)=>{
    e.preventDefault()
    try {
      const getToken=localStorage.getItem('login token')
      const firmid=localStorage.getItem('firmId')
      if(!getToken){
        console.log("user and firm not valid")
      }
      const formData=new FormData()
      formData.append("productName",productName)
      formData.append("price",price)
      formData.append("description",description)
      formData.append("image",image)
      category.forEach((value)=>{
        formData.append('category',value)
      })

     


      const response=await fetch(`${API_URL}/product/add-product/${firmid}`,{
        method:'POST',
        body:formData

      });
      const data=await response.json()
      if(response.ok){
        alert("product added success")
        console.log('data is',data)
      }
    } catch (error) {
      
      alert("failed to add product")

    }
  }
  return (
    <div className='firmForm'>
    <form className='firmDataForm' onSubmit={handleAddProduct}>
        <h2>Add Product</h2>
        <label htmlFor="firmName">productName</label>
        <input type="text" placeholder="enter restaurent name" value={productName} name="productName" onChange={(e)=>setProductName(e.target.value)}/>
        <label htmlFor="price">price</label>
        
        <input type="number" placeholder="enter price" value={price} name="price" onChange={(e)=>setPrice(e.target.value)} />
        <div className="checkbox-input">
              <label>category</label>
              <div className="checkContainer">
                <div className="checkboc">
                  <label>Veg</label>
                  <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange} />
                </div>
                <div className="checkboc">
                  <label>Non-Veg</label>
                  <input type="checkbox" value="nonveg" checked={category.includes('nonveg')} onChange={handleCategoryChange} />
                </div>
              </div>
        </div>
        <div className="checkbox-input">
              <label>best seller</label>
              <div className="checkContainer">
                <div className="checkboc">
                  <label>Yes</label>
                  <input type="radio" value="true" checked={bestSeller===true} onChange={bestSellerHandler}/>
                </div>
                <div className="checkboc">
                  <label>No</label>
                  <input type="radio" value="false" checked={bestSeller===false} onChange={bestSellerHandler} />
                </div>
              </div>
        </div>
        <label htmlFor="description">description</label>   
        <input type="text" placeholder="enter description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
        <label htmlFor="image">Image</label>
        <input type="file" onChange={handleImageSubmit}/>
        <div className="btnSubmit">
            <button type='submit'>Submit</button>
        </div>
    </form>
</div>
  )
}

export default AddProduct