import '../pagescss/save.css';
import React,{useState} from 'react'; 
import axios from 'axios';

function Save() {

  const [Name,setNe] = useState("");
  const [Des,setDe] = useState("");
  const [Price,setPr] = useState("");

  
  
  function upload(){

    let token = localStorage.getItem("token");

    if(token){
    axios.post('https://port-0-kickdeal2-m1qhzohka7273c65.sel4.cloudtype.app/product/save',{
      name : Name,
      description : Des,
      price : Price,
    })
    .then((response)=>{
      console.log(response.data);
    })
  }

  else{
    alert("로그인이 필요합니다");
  }
}

  return (
      <div class="main_save">
        <div>
          <p className='paths'>글올리기</p>
        </div>


        <div className='forms_save'>
          <div>
          <div><span>상품명</span></div>
          <input placeholder='상품명을 입력해주세요' value={Name}onChange={(event)=> 
                  {setNe(event.target.value);
                  }}/>
          </div>

        <div>
        <div><span>가격</span></div>
          <input placeholder='가격을 입력해주세요'value={Price}onChange={(event)=> 
                  {setPr(event.target.value);
                  }} type='number'/>
        </div>

        <div>
        <div><span>세부사항</span></div>
        <div className='textar'>
          <textarea placeholder='세부사항을 입력해주세요' className="des"value={Des}onChange={(event)=> 
                  {setDe(event.target.value);
                  }}rows={10} cols={60}/>
                  </div>
        </div>
        </div>

        <div className='button_save'>
        <button onClick={upload}className='bts' >글 올리기</button>
        </div>

      </div>

  );
}

export default Save;
