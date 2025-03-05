import '../pagescss/mypages.css';
import React,{useState} from 'react'; 
import axios from 'axios';

function Save() {

  const [Name,setNe] = useState("");
  const [Des,setDe] = useState("");
  const [Price,setPr] = useState("");
  
  function upload(){
    axios.post('https://port-0-kickdeal2-m1qhzohka7273c65.sel4.cloudtype.app/product/save',{
      name : Name,
      description : Des,
      price : Price,
    })
    .then((response)=>{
      console.log(response.data);
    })
  }

  return (
      <div class="main">
        <div>
          <input placeholder='상품명을 입력해주세요' value={Name}onChange={(event)=> 
                  {setNe(event.target.value);
                  }}/>

          <input placeholder='가격을 입력해주세요'value={Price}onChange={(event)=> 
                  {setPr(event.target.value);
                  }}/>

          <input placeholder='세부사항을 입력해주세요'value={Des}onChange={(event)=> 
                  {setDe(event.target.value);
                  }}/>
        </div>

        <button onClick={upload}>등록</button>
      </div>

  );
}

export default Save;
