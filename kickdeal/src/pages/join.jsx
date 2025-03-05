import '../pagescss/signup.css';
import React, {useState} from 'react'; 
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Join() {

  const [Email,setEmail] = useState("");
  const [Password,setPw] = useState("");
  const [Id,setId] = useState("");
  
  const  navigate  = useNavigate();

  const register = async() =>{
    await axios.post('https://port-0-kickdeal2-m1qhzohka7273c65.sel4.cloudtype.app/join',{
    id : Id,
    password : Password,
  })

  .then((response)=>{
      console.log('well done!');
      localStorage.setItem('token', response.data.jwt);
      navigate('/email', { state :{ email: Email }});
  })
  }

  return (
      <div className="Ma">
        <div className='forms'>
          <div className='ft'>본인정보를 입력해주세요</div>

          <div className='realforms'>
            <div className='divW'>이름</div>
              <div className='fi'>
                <input  className='fin' placeholder='홍길동'/>
              </div>

            <div className='divW'>이메일</div>
              <div className='fi'>
                <input  className='fin' placeholder='tes1234@gmail.com' value={Email} onChange={(event)=> 
                  {setEmail(event.target.value);
                  }}/>
              </div> 

            <div className='divW'>아이디</div>
              <div className='fi'>
                <input  className='fin' placeholder='아이디를 입력해주세요' value={Id} onChange={(event)=>{setId(event.target.value)}}/>
              </div> 

             <div className='divW'>비밀번호</div>
              <div className='fi'>
                <input  className='fin' placeholder='비밀번호를 입력해주세요' value={Password} onChange={(event)=>{setPw(event.target.value)}}/>
              </div> 
            
            <div className='bt'>
              <button className='btt' onClick={()=>{
                register();
              }}>회원가입</button>

            </div>
            
            
            </div>
          </div>
        </div>



  );
}
