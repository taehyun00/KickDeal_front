import axios from 'axios';
import '../pagescss/all.css';
import React from 'react'; 


function All() {

  function islogin(){
    axios
      .post('이건우이새기야',null,{
        headers:{
          Authorization : `${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res)=> console.log(res))
      .catch((err)=> console.log(err)) 
  }
  
  return (
      <div className="main">
        <p>
          <div>
            <button onClick={islogin}>등록</button>
          </div>
            
        </p>
      </div>

  );
}

export default All;
