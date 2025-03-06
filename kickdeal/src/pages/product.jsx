import axios from 'axios';
import '../pagescss/all.css';
import React, { useState ,useEffect } from 'react'; 
import Item from '../components/item';


function Product() {

  const [item,setitem] = useState([]);


  useEffect(() => {
    axios.get('https://port-0-kickdeal2-m1qhzohka7273c65.sel4.cloudtype.app/product')
    .then((response)=>{
      setitem(response.data)
    })

    console.log(item)
    
  },[])

  return (
      <div className="indexbox">
        {item.map((item) =>{
            return <Item  key={`key-${item.id}`} item ={item}/>
        })}
      </div>

  );
}

export default Product;
