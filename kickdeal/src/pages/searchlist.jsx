import axios from 'axios';
import '../pagescss/product.css';
import React, { useState ,useEffect } from 'react'; 
import Item from '../components/item';


function Searchlist() {
  
  const [item,setitem] = useState([]);

  const search = localStorage.getItem("Search");

  useEffect(() => {
    axios.get('https://port-0-kickdeal2-m1qhzohka7273c65.sel4.cloudtype.app/product')
    .then((response)=>{
      setitem(response.data)
    })

    
  },[])

  const filteredItems = item.filter((singleItem) => 
  singleItem.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="indexbox">
    {filteredItems.length > 0 ? (
        filteredItems.map((singleItem) => {  
          return <Item key={`key-${singleItem.id}`} item={singleItem} />;
        })
      ) : (
        <p className='Nosearch'>검색결과가 없습니다</p>
      )}
  </div>

  );
}

export default Searchlist;
