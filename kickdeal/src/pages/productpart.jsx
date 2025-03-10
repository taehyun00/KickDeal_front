import '../pagescss/pr.css';
import { useLocation } from 'react-router-dom';
import {useState,useRef} from 'react'; 
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
const Productpart = ()=> {

    const location = useLocation();
    const product = location.state?.product;
    const Co = product.category;

    const id = product.id

    const [Name,setNe] = useState("");
    const [Des,setDe] = useState("");
    const [Price,setPr] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const modal = useRef();

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

    const openModal = () => {
      setModalOpen(true);
      modal.current.style.display = 'flex';
    };

    const close = () => {
      setModalOpen(false);
      modal.current.style.display = 'none';
      setPr("")
      setDe("")
      setNe("")
    };


    const price = (P) => {
        return P.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
    }



    function update(){

      let token = localStorage.getItem("token");  
      if (token && !isTokenExpired(token)) {



      axios.put(`https://port-0-kickdeal2-m1qhzohka7273c65.sel4.cloudtype.app/product/${id}`,{
        name: Name,
        price: Price,
        description: Des,
        category : Co
      },
      {
          headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
  
          }
        })
      .then(() => {
        alert("상품이 성공적으로 수정되었습니다!");
        modal.current.style.display = 'none';
        window.location.href = `/`
      })
      .catch((error) => {
        alert("수정 중 오류 발생");
        console.error(error);
      });


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
        update();
  
      })
    }
  }
    

    return(

        
        <div className='items_pr'>

          {modalOpen && (<div className='product_modal_update' ref={modal}>

            <div>
              <p className='product_modal_p'>수정내용을 입력해주세요</p>
            </div>
            <div className='product_modal_update_div'>
              <span className='product_modal_update_span'>상품명</span>
              <input value={Name}onChange={(event)=> 
                  {setNe(event.target.value);
                  }} className='product_modal_update_input'></input>
            </div>
            <div className='product_modal_update_div'>
              <span  className='product_modal_update_span'>가격</span>
              <input value={Price}onChange={(event)=> 
                  {setPr(Number(event.target.value));
                  }} className='product_modal_update_input'></input>
            </div>
            <div  className='product_modal_update_div'>
              <span  className='product_modal_update_span'>세부사항</span>
              <input value={Des}onChange={(event)=> 
                  {setDe(event.target.value);
                  }}className='product_modal_update_input'></input>
            </div>

            <div className='moadal_button'>
              <button onClick={update} className='modal_btn'>확인</button>
              <button onClick={close} className='modal_btn_down'>닫기</button>
            </div>
          </div>)}

          <div className='product_button_div'>
            <button onClick={openModal}>수정하기</button>
            <button>삭제하기</button>
          </div>

        <div className='product_img'>
          <div className='save_img_div_'>
              <img src={product.image}></img>
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