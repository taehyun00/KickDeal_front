import '../pagescss/save.css';
import React,{useState} from 'react'; 
import axios from 'axios';

function Save() {

  const [Name,setNe] = useState("");
  const [Des,setDe] = useState("");
  const [Price,setPr] = useState("");
  const [Co,setCo] = useState("");


  
  
  function upload(){

    let token = localStorage.getItem("token");

    console.log(
      Name,
      Des,
      Price,
      Co
    )

    if(token){
    axios.post('https://port-0-kickdeal2-m1qhzohka7273c65.sel4.cloudtype.app/product/save',{
      name : Name,
      description : Des,
      price : Price,
      category : Co,
    },{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
    )
    .then((response)=>{
      console.log(response.data);
      let conf = confirm("상품이 정상 등록되었습니다.");
      if(conf == true){
        window.location.href = "/"
      }
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

        <div className='save_img'>
          <div className='save_img_div'>

          </div>
        </div>

        <div className='cate'>
          <div className='cate_span'><span className='cate_span_value'>분류</span></div>

<button
        onClick={() => setCo("soccerShoes")}
        className={`cate_button ${Co === "soccerShoes" ? "active_save" : ""}`}
      >
        축구화
      </button>
      <button
        onClick={() => setCo("futsalShoes")}
        className={`cate_button ${Co === "futsalShoes" ? "active_save" : ""}`}
      >
        풋살화
      </button>
      <button
        onClick={() => setCo("uniform")}
        className={`cate_button ${Co === "uniform" ? "active_save" : ""}`}
      >
        유니폼
      </button>
      <button
        onClick={() => setCo("ball")}
        className={`cate_button ${Co === "ball" ? "active_save" : ""}`}
      >
        축구공
      </button>
      <button
        onClick={() => setCo("other")}
        className={`cate_button ${Co === "other" ? "active_save" : ""}`}
      >
        기타용품
      </button>
      <button
        onClick={() => setCo("goalkeeper")}
        className={`cate_button ${Co === "goalkeeper" ? "active_save" : ""}`}
      >
        GK용품
      </button>
        </div>


        <div className='forms_save'>
          <div>
          <div><span>상품명</span></div>
          <input placeholder='상품명을 입력해주세요' value={Name}onChange={(event)=> 
                  {setNe(event.target.value);
                  }} className='save_input'/>
          </div>

        <div>
        <div><span>가격</span></div>
          <input placeholder='가격을 입력해주세요'value={Price}onChange={(event)=> 
                  {setPr(event.target.value);
                  }} type='number' className='save_input'/>
        </div>

        <div>
        <div><span>세부사항</span></div>
        <div className='textar'>
          <textarea placeholder='세부사항을 입력해주세요' className='save_textarea'value={Des}onChange={(event)=> 
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
