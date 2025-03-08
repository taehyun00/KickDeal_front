import axios from 'axios';
import '../pagescss/product.css';
import React, { useState ,useEffect } from 'react'; 
import Item from '../components/item';


function Mypage() {
  
  const [item,setitem] = useState([]);
  

  useEffect(() => {
    axios.get('https://port-0-kickdeal2-m1qhzohka7273c65.sel4.cloudtype.app/product')
    .then((response)=>{
      setitem(response.data)
    })
    
    
  },[])

  const Name = localStorage.getItem("name");
  




  return (
    <div className="indexbox">
        {item
      .filter((singleItem) => String(singleItem.user.id) === String(Name) )
      .map((singleItem) => { 
        return <Item key={`key-${singleItem.id}`} item={singleItem}/>
      })}


       
  </div>

  );
}
export default Mypage;
