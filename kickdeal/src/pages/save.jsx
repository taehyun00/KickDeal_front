import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

function Save() {
  const formData = useRef(new FormData());
  const [Name, setNe] = useState("");
  const [Des, setDe] = useState("");
  const [Price, setPr] = useState("");
  const [Co, setCo] = useState("");
  const [ImageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (ImageFile) {
      console.log("Updated ImageFile:", ImageFile);
    }
  }, [ImageFile]);

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

  const image_preview = useRef();
  const image_input = useRef();
  const imgInput = useRef(null);

  function handleChange(e) {
    const { name } = e.target;

    if (name === 'image') {
      const file = e.target.files[0];

      if (file) {
        const imgURL = URL.createObjectURL(file);

        setImageFile(file);
        image_input.current.style.display = 'none';
        image_preview.current.style.display = 'flex';

        const imgElement = image_preview.current.children[0];
        imgElement.setAttribute('src', imgURL);
      }
    }
  }

  function upload() {
    const formData = new FormData();
    
    // 이미지 파일을 formData에 추가
    formData.append("image", ImageFile); // "image"는 백엔드에서 기대하는 파일 필드 이름

    // JSON 데이터를 Blob 객체로 변환하여 formData에 추가
    const value = {
        name: Name,
        description: Des,
        price: Price,
        userNickname: localStorage.getItem("name"), // 로그인한 사용자 이름
        category: Co
    };
    const blob = new Blob([JSON.stringify(value)], {type: "application/json"});
    formData.append("data", blob); // "data"는 백엔드에서 기대하는 JSON 데이터 필드 이름

    let token = localStorage.getItem("token");

    if (token && !isTokenExpired(token)) {

      console.log(token)
        axios.post(
            "https://port-0-kickdeal2-m1qhzohka7273c65.sel4.cloudtype.app/product/save",
            formData,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data", // 반드시 multipart/form-data로 전송해야 합니다.
                },
            }
        )
        .then((response) => {
            console.log(response.data);
            let conf = confirm("상품이 정상 등록되었습니다.");
            if (conf === true) {
                window.location.href = "/";
            }
        })
        .catch((error) => {
            console.error("업로드 실패:", error);
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }
        });
    } else {
        const ref = localStorage.getItem("ref");
        

        axios.post(
            'https://port-0-kickdeal2-m1qhzohka7273c65.sel4.cloudtype.app/refresh',
            {
              RefreshToken : ref
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            }
        )
        .then((response) => {
          localStorage.setItem("token",response)
          console.log(response)
        });
    }
}


  return (
    <div className="main_save">
      <div>
        <p className='paths'>글올리기</p>
      </div>

      <div className='save_img'>
        <label htmlFor="input_file">
          <div className='image_file' ref={image_input}>
            이미지 업로드<br /><p className='save_img_div_p'>박스를 클릭해주세요!</p>
          </div>

          <div ref={image_preview} className='image_file_preview'>
            <img src="" className='image_file_preview_img' />
          </div>
        </label>
        <input
          id="input_file"
          type="file"
          name="image"
          className='input_file'
          accept="image/*"
          onChange={(e) => { handleChange(e) }}
          ref={imgInput}
        />
      </div>

      <div className='cate'>
        <div className='cate_span'>
          <span className='cate_span_value'>분류</span>
        </div>

        <button onClick={() => setCo("soccerShoes")}
          className={`cate_button ${Co === "soccerShoes" ? "active_save" : ""}`}>
          축구화
        </button>
        <button onClick={() => setCo("futsalShoes")}
          className={`cate_button ${Co === "futsalShoes" ? "active_save" : ""}`}>
          풋살화
        </button>
        <button onClick={() => setCo("uniform")}
          className={`cate_button ${Co === "uniform" ? "active_save" : ""}`}>
          유니폼
        </button>
        <button onClick={() => setCo("ball")}
          className={`cate_button ${Co === "ball" ? "active_save" : ""}`}>
          축구공
        </button>
        <button onClick={() => setCo("other")}
          className={`cate_button ${Co === "other" ? "active_save" : ""}`}>
          기타용품
        </button>
        <button onClick={() => setCo("goalkeeper")}
          className={`cate_button ${Co === "goalkeeper" ? "active_save" : ""}`}>
          GK용품
        </button>
      </div>

      <div className='forms_save'>
        <div>
          <div><span>상품명</span></div>
          <input
            placeholder='상품명을 입력해주세요'
            value={Name}
            onChange={(event) => { setNe(event.target.value); }}
            className='save_input'
          />
        </div>

        <div>
          <div><span>가격</span></div>
          <input
            placeholder='가격을 입력해주세요'
            value={Price}
            onChange={(event) => { setPr(event.target.value); }}
            type='number'
            className='save_input'
          />
        </div>

        <div>
          <div><span>세부사항</span></div>
          <div className='textar'>
            <textarea
              placeholder='세부사항을 입력해주세요(최대 250자)'
              className='save_textarea'
              value={Des}
              onChange={(event) => { setDe(event.target.value); }}
              rows={10} cols={60}
              maxlength='250'
            />
          </div>
        </div>
      </div>

      <div className='button_save'>
        <button onClick={upload} className='bts'>글 올리기</button>
      </div>
    </div>
  );
}

export default Save;
