import '../pagescss/login.css';
import logo from '../images/logo.svg'
import React, {useState} from 'react'; 
import axios from 'axios';

import { useNavigate } from "react-router-dom";

export default function Login() {

  const [Pw,setPw] = useState("");
  const [Id,setId] = useState("");
  const navigate = useNavigate();

  function requestAccessToken() {
        axios.post(
            'https://port-0-kickdeal2-m1qhzohka7273c65.sel4.cloudtype.app/login',
            {
                id: Id, 
                password: Pw,
            },
            {
              headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json",
              },
          }
        )
        .then((response)=>{
          console.log(response.data.token);
          const accessToken = response.data.token;
          console.log("로그인 성공! 토큰 저장 완료:", accessToken);
          localStorage.setItem("token", accessToken);
          navigate('/',  { replace: true });
          
  
      })
      .catch((error) => {
        // 더 구체적인 오류 메시지를 출력
        if (error.response) {
            // 서버에서 응답이 온 경우
            console.error("서버에서 반환한 오류 메시지:", error.response.data);
            console.error("상태 코드:", error.response.status);  // 상태 코드 출력
        } else if (error.request) {
            // 요청은 했지만 응답이 없을 경우
            console.error("응답을 받지 못했습니다:", error.request);
        } else {
            // 요청 설정에 문제가 있을 경우
            console.error("요청 설정 오류:", error.message);
        }
    });
        

  };
  

  return (
      <div className="Ma_">
        <div className='Tit'>
            <p className='TitT'>킥딜을 시작해볼까요?</p>
            <img src={logo} className='TitTimage' />
        </div>
        <div className='forms_'>
          <div className='ft'>Login</div>

          <div className='realforms_'>

            <div className='divW'>아이디</div>
              <div className='fi'>
                <input  className='fin' placeholder='아이디를 입력해주세요' value ={Id} onChange={(event)=> 
                  {setId(event.target.value);
                  }}/>
              </div> 

             <div className='divW'>비밀번호</div>
              <div className='fi'>
                <input  className='fin' placeholder='비밀번호를 입력해주세요' value={Pw}onChange={(event)=> 
                  {setPw(event.target.value);
                  }}/>
              </div> 
            
            <hr className='line'></hr>
            <div className='bt_'>
              <button className='btt_' onClick={() => {

                console.log("입력된 아이디:", Id);
                console.log("입력된 비밀번호:", Pw);
                requestAccessToken(Id,Pw)}}>로그인</button>

            </div>
            
            
            </div>
          </div>
        </div>



  );
}
