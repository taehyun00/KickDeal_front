import '../pagescss/index.css';
import React from 'react'; 
import img from '../images/main.svg';
import back from '../images/background.svg'
import under from '../images/under.svg'
import logo from '../images/logo.svg'
import down from '../images/down.svg'

import { NavLink } from 'react-router-dom';

function Index() {


  return (
      <div >
        <div class="main">

        <div>
            <img src={back} alt = "" class="back"></img>
        </div>

        

            <div>
                <img src={img} alt="" class="img"></img>
            </div>
        
        <div class="lag">
            <div class="dis">
                <p>몇번만 즐겨볼 축구인데<br></br>가격이 부담되신다구요?</p>
            </div>
            <div class="disc">
                <p>그럴땐 KickDeal에서 빠르게<br></br>중고거래 해보세요!</p>
            </div>
            <NavLink to="/all"><div className='buy'>구매하러 가기</div></NavLink>
        </div>

        <img src={down}  className='down'/>
        <div className='underimg'>
        <img src={under} alt=""  className='under'/>
        </div>

        <div className='underlog'>
            <p className='boldlog'>즐거운 추억을 KickDeal과 쌓아가세요!</p>
            <div className='spanlog'>
                <span>3천명 이상이 사용하는 축구용품중고거래사이트</span>
                <br></br>
                <span>믿을수있으니까</span>
            </div>
        </div>

        
       </div>
       <footer>
            <img src={logo} className='underlogo' />
        </footer>

    </div>

  );
}

export default Index;
