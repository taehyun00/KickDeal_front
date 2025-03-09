import '../pagescss/pr.css';
import { useLocation } from 'react-router-dom';

const Productpart = ()=> {

    const location = useLocation();
    const product = location.state?.product;
    const Co = product.category;

    console.log(product.image)

    const price = (P) => {
        return P.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
    }


    return(

        
        <div className='items_pr'>

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