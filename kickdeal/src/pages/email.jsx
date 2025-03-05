import '../pagescss/email.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import React, {useState} from 'react'; 

import { useNavigate } from "react-router-dom";


export default function Email() {
    const [code,setcode] = useState("");

    const {state} = useLocation();

    const [num, setNum] = useState("");

    const  navigate  = useNavigate();

    function Codeup(){

    axios.post('https://port-0-kickdeal2-m1qhzohka7273c65.sel4.cloudtype.app/email',{
        email : state.email
    })
    .then((response)=>{
        setNum(response.data.code);

    })
}


    function what() { 
        console.log("num:", num, "code:", code);
        if( num === code){
            alert('환영합니다')
            navigate('/')
        }
    }


  return (
      <div className="Ma">
        <div className='forms'>
          <div className='ft'>이메일로 발송한 인증번호를 입력해주세요</div>

          <div className='realforms'>
            <div className='divW'>인증코드</div>
              <div className='fi'>
                <input  className='fin' placeholder='인증코드를 입력해주세요' value={code} onChange={(event)=>{setcode(event.target.value)}}/>
              </div>
            


            <div className='bt1'>
              <button className='btt1' onClick={() => Codeup()
              }>인증번호 보내기</button>

            </div>

            <div className='bt'>
              <button className='btt' onClick={() => what()}>인증</button>

            </div>
            


            
            </div>
          </div>
        </div>



  );
}
