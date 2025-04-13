import '../pagescss/pr.css';
import { useLocation } from 'react-router-dom';
import {useState,useRef, useEffect} from 'react'; 
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
const Productpart = ()=> {

    const location = useLocation();
    const product = location.state?.product;
    const Co = product.category;
    
    const userId = product.user.id;
    const Id = localStorage.getItem("name");
    const id = product.id




    const update_delete = useRef();

  

    const isTokenExpired = (token) => {
      try {
        const decoded = jwtDecode(token);
        if (!decoded || !decoded.exp) return true;
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
      } catch (e) {
        console.error("토큰 디코딩 실패:", e);
        return true;
      }
    };  

    const price = (P) => {
        return P.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
    }

      
    function delate(){

      let token = localStorage.getItem("token");  
      
      if (token && !isTokenExpired(token)) {
        axios.delete(`https://port-0-kickdeal2-m1qhzohka7273c65.sel4.cloudtype.app/product/${id}`,
      {
          headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
  
          }
        })
        .then(() => {
          let conf = confirm("상품이 성공적으로 삭제되었습니다!");
          if(conf == true){
            window.location.href = "/"
          }
      })
      
    }

    else{
      const Id = localStorage.getItem("name")
      const Pw = localStorage.getItem("password")
      axios.post(
        'https://port-0-kickdeal2-m1qhzohka7273c65.sel4.cloudtype.app/login',
        {
            id: Id, 
            password: Pw,
        },{
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
          },
      })
      .then((response)=>{
        const accessToken = response.data.token;
        localStorage.setItem("token", accessToken);
        delate();
  
      })
    }
  }


  function openModal(){
    localStorage.setItem("updateId",id);
    window.location.href = "/update"
  }

  useEffect(()=>{
    if(userId != Id ){
      update_delete.current.style.display = 'none';
    }
    else if(userId == Id){
      update_delete.current.style.display = 'flex';
    }
  },[userId, Id])

    return(

        
        <div className='items_pr'>


          <div className='product_button_div' ref = {update_delete}>
            <button onClick={openModal} className='product_button_up'>수정하기</button>
            <button onClick={delate} className='product_button_de'>삭제하기</button>
          </div>

        <div className='product_img'>
          <div className='save_img_div_'>
              <img src={product.imageUrl}></img>
          </div>
        </div>

        <div className='cate_'>
          <div className='cate_span'><span className='cate_span_value'>분류</span></div>

        <button
        className={`cate_button ${Co === "soccerShoes" ? "active_save" : ""}`}
      >
        축구화
      </button>
      <button
        className={`cate_button ${Co === "futsalShoes" ? "active_save" : ""}`}
      >
        풋살화
      </button>
      <button
        className={`cate_button ${Co === "uniform" ? "active_save" : ""}`}
      >
        유니폼
      </button>
      <button
        className={`cate_button ${Co === "ball" ? "active_save" : ""}`}
      >
        축구공
      </button>
      <button
        className={`cate_button ${Co === "other" ? "active_save" : ""}`}
      >
        기타용품
      </button>
      <button
        className={`cate_button ${Co === "goalkeeper" ? "active_save" : ""}`}
      >
        GK용품
      </button>
        </div>



            <div className='forms_save_'>
          <div>
          <div className='form_div'><span className='form_div_span'>상품명</span></div>
          <sapn className='save_input_'>{product.name}</sapn>
                  
          </div>

        <div>
        <div className='form_div'><span className='form_div_span'>가격</span></div>
        <sapn className='save_input_'>{price(product.price)}원</sapn>
        </div>

        <div>
        <div className='form_div'><span className='form_div_span'>세부사항</span></div>
        <div className='Des_board'>
        <sapn className='save_input_Des'>{product.description}</sapn>
        </div>
        </div>
        </div>

        <div className='button_save_'>
        <button className='bts_' >구매하기</button>
        </div>

      </div>

    )
}


export default Productpart;