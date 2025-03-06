import axios from 'axios';
import '../pagescss/all.css';
import React, { useState ,useEffect } from 'react'; 


function Product() {

  const [row,setrow] = useState();

  useEffect(() => {
    axios.get('https://port-0-kickdeal2-m1qhzohka7273c65.sel4.cloudtype.app/product')
    .then((response)=>{
      setrow(response.data[response.data.length - 1].id)
    })
    
  })

  return (
      <div className="main">
          <div>
            
            <button>보기</button>
          
          </div>
        <p>{row}</p>
            
      </div>

  );
}

export default Product;
