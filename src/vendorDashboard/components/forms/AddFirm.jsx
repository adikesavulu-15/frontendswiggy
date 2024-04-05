import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath';

const AddFirm = () => {
  const[firmName,setfirmName]=useState("");
  const[area,setArea]=useState("");
  const[category,setCategory]=useState([]);
  const[region,setRegion]=useState([]);
  const[offer,setOffer]=useState("");
  const[file,setFile]=useState(null);

  const categoryHandle=(e)=>{
    const value=e.target.value
    if(category.includes(value)){
      setCategory(category.filter((item)=>item!==value))
    }else{
      setCategory([...category,value])
    }
  }

  const regionHandler=(e)=>{
    const value=e.target.value
    if(region.includes(value)){
      setRegion(region.filter((item)=>item!==value))
    }else{
      setRegion([...region,value])
    }
  }

  const handlefirmSubmit =async(e)=>{
      e.preventDefault();
      try {
        const getToken=localStorage.getItem('login token')
        if(!getToken){
          console.error('user not authenticated')
        }

        const formData=new FormData()
        formData.append('firmName',firmName)
        formData.append('area',area)
        formData.append('offer',offer)
        formData.append('image',file)
        category.forEach((value)=>{
          formData.append('category',value)
        })

        region.forEach((val)=>{
          formData.append('region',val)
        })

        const response=await fetch(`${API_URL}/firm/add-firm`,{
          method:"POST",
          headers:{
            "token":`${getToken}`,
          },
          body:formData
        });
        const data=await response.json()
        if(response.ok){
          console.log(data)
          
          setfirmName("")
          setArea("")
          setCategory([])
          setOffer("")
          setRegion([])
          setFile(null)
          alert("firm added success")
        }else if(data.message === "vendor only have one firm only"){
          alert("firm exists already,only one firm is added")
        }else{
          alert("failed to add firm")
        }
        
        const firmId=data.firmId
        const vendorRestuarant = data.vendorFirmName

          localStorage.setItem('firmId', firmId);
          localStorage.setItem('firmName', vendorRestuarant)
          window.location.reload()
      } catch (error) {
        console.log(error,'failed to fetch')
      }
  }

  const handleImageUpload=(e)=>{
    const selectedImage=e.target.files[0];
    setFile(selectedImage)
  }
  return (
    <div className='firmForm'>
        <form className='firmDataForm' onSubmit={handlefirmSubmit}>
            <h2>Add Firm</h2>
            <label htmlFor="firmName">firmName</label>
            <input type="text" name="firmName" value={firmName} onChange={(e)=>setfirmName(e.target.value)} placeholder="enter restaurent name" />

            <label htmlFor="area">area</label>
            <input type="text" value={area} onChange={(e)=>{setArea(e.target.value)}} name="area" placeholder="enter restaurent area" />   

            <label htmlFor="offer">offer</label>
            <input type="text" value={offer} onChange={(e)=>{setOffer(e.target.value)}} name="offer" placeholder="enter offer" />   


            <div className="checkbox-input">
              <label>category</label>
              <div className="checkContainer">
                <div className="checkboc">
                  <label>Veg</label>
                  <input type="checkbox" checked={category.includes('veg')} value="veg" onChange={categoryHandle}/>
                </div>
                <div className="checkboc">
                  <label>Non-Veg</label>
                  <input type="checkbox" checked={category.includes('nonveg')} value="nonveg" onChange={categoryHandle}/>
                </div>
              </div>
            </div>
       
             <div className="checkbox-input">
              <label>Region</label>
              <div className="checkContainer">
                <div className="checkboc">
                  <label>s-indian</label>
                  <input type="checkbox" checked={region.includes('south')} onChange={regionHandler} value="south"/>
                </div>
                <div className="checkboc">
                  <label>n-indian</label>
                  <input type="checkbox" checked={region.includes('north')} onChange={regionHandler}  value='north'/>
                </div>
                <div className="checkboc">
                  <label>chineese</label>
                  <input type="checkbox" checked={region.includes('chineese')} onChange={regionHandler}  value='chineese'/>
                </div>
                <div className="checkboc">
                  <label>bakery</label>
                  <input type="checkbox" checked={region.includes('bakery')} onChange={regionHandler}  value='bakery'/>
                </div>
              </div>
            </div>
            <label htmlFor="file">file</label>
            <input type="file" onChange={handleImageUpload}/>
            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddFirm