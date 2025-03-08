import axios from 'axios';
import '../pagescss/product.css';
import React, { useState ,useEffect } from 'react'; 
import Item from '../components/item';


function Uniform() {
  
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
    {item
      .filter((singleItem) => singleItem.category === 'uniform')  // 먼저 필터링
      .map((singleItem) => {  // 필터링된 항목에 대해 map 수행
        return <Item key={`key-${singleItem.id}`} item={singleItem} />
      })}
  </div>

  );
  }

export default Uniform;
