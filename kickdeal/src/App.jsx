import './App.css';
import React, {useState,useEffect} from 'react'; 
import logo from './images/logo.svg';
import search from './images/search.svg';
import { jwtDecode } from "jwt-decode";
import { Routes, Route, NavLink , useLocation  } from 'react-router-dom';

import Index  from './pages/index';
import Mypage  from './pages/mypages';
import Product  from './pages/product';
import Ball  from './pages/ball';
import Goalkeeper  from './pages/goalkeeper';
import Shoes  from './pages/shoes';
import Shoes1  from './pages/shoes1';
import Uniform  from './pages/uniform';
import  Save  from './pages/save';
import Another  from './pages/another';
import Join from './pages/join';
import  Email from './pages/email';
import Login from './pages/login';
import Searchlist from './pages/searchlist';
import Productpart from './pages/productpart';
import Update from './pages/update';


function App() {

  const [searchMonter, setSearchMonter] =useState(localStorage.getItem("Search") || "");
  const onChange = (e) => {
    setSearchMonter(e.target.value);
  };

  function search_(){
    localStorage.setItem("Search",searchMonter);
    if(searchMonter == null ){
      return <Product />
    }
    else{
    window.location.href = ("/searchlist");
    }
  };

  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/searchlist") {
      localStorage.removeItem("Search");  
      setSearchMonter("");  
    }
  },[location.pathname])
  


  const activeStyle = {
    color: "#31A040",
  };

  const [userId, setUserId] = useState("");
  const [show, setShow] = useState(false);
  let isl = localStorage.getItem("islogin");

  function logout() {
    localStorage.setItem("islogin", "0");
    setShow(false);
    setUserId(""); 
    localStorage.removeItem("token");
    window.location.href = "/"
  }

  useEffect(() => {
    if (isl === "1") {
      setShow(true);
    } else {
      setShow(false);
    }

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.username);

      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        setUserId("");
      }
    }
  }, [isl]); 

  return (
    

    <div className="App">
      <div class="container">
        <div class="parent">
        <div class="log">
        {!show ? (
    <>
      <NavLink to="/login"><button className="login"> 로그인 </button></NavLink>
      <NavLink to="/join"><button className="signup"> 회원가입 </button></NavLink>
    </>
  ) : (
    <>
      <button className="login"> {userId} </button>

      <button className="signup" onClick={logout}> 로그아웃 </button>
    </>
  )}
        </div>
        <div>
        <NavLink to="/"><img src={logo} alt="" className="logo"></img></NavLink>
       
        
        <div className="searchBox">

          <input type="text" placeholder="상품명을 입력해주세요" className='searchInput' value={searchMonter} onChange ={onChange}>
            
          </input>

          <button id='search-Btn' onClick = {search_}>
                    <img src={search} alt='search icon' className='search-Img'/>
                </button>

        </div>
        
        <select className ="select">
      <optgroup>
    <option value="s">서울</option>
    <option value="B">대전</option>
    <option value="O">대구</option>
    <option value="M">부산</option>
      </optgroup>
      </select>
      </div>


      </div>

      <div className="chose">
        <p>
        <NavLink to="/product" style={({ isActive }) => ({...isActive&& window.location.pathname === "/product" ? activeStyle : {color : "black"},textDecoration: "none"})}>전체상품</NavLink>
        </p>
        <div className="v-line"></div>
        <div className="shop">
        <p>
        <NavLink to="/ball" style={({ isActive }) => ({...isActive ? activeStyle : {color : "black"},textDecoration: "none"})}>축구공</NavLink>
        </p>

        <p>
        <NavLink to="/shoes" style={({ isActive }) => ({...isActive ? activeStyle : {color : "black"},textDecoration: "none"})}>축구화</NavLink>
        </p>

        <p>
        <NavLink to="/shoes1" style={({ isActive }) => ({...isActive ? activeStyle : {color : "black"},textDecoration: "none"})}>풋살화</NavLink>
        </p>

        <p>
        <NavLink to="/uniform" style={({ isActive }) => ({...isActive ? activeStyle : {color : "black"},textDecoration: "none"})}>유니폼</NavLink>
        </p>

        <p>
        <NavLink to="/goalkeeper" style={({ isActive }) => ({...isActive ? activeStyle : {color : "black"},textDecoration: "none"})}>골키퍼용품</NavLink>
        </p>

        <p>
        <NavLink to="/another" style={({ isActive }) => ({...isActive ? activeStyle : {color : "black"},textDecoration: "none"})}>기타용품</NavLink>
        </p>
        </div>
        <div className="v-line"></div>
        <p>
        <NavLink to="/product/save" style={({ isActive }) => ({...isActive ? activeStyle : {color : "black"},textDecoration: "none"})}>글올리기</NavLink>
        </p>

        <p>
        <NavLink to="/mypages" style={({ isActive }) => ({...isActive ? activeStyle : {color : "black"},textDecoration: "none"})}>마이페이지</NavLink>
        </p>



     </div>
    </div>


    <Routes>
        <Route path="/" element={<Index />}></Route>

        <Route path="/mypages" element={<Mypage />}></Route>
 
        <Route path="/email" element={<Email />}></Route>
   
        <Route path="/product" element={<Product />}></Route>

        <Route path="/ball" element={<Ball />}></Route>
   
        <Route path="/shoes" element={<Shoes />}></Route>
   
        <Route path="/shoes1" element={<Shoes1 />}></Route>

        <Route path="/goalkeeper" element={<Goalkeeper />}></Route>
  
        <Route path="/another" element={<Another />}></Route>

        <Route path="/uniform" element={<Uniform />}></Route>
 
        <Route path="/product/save" element={<Save />}></Route>
  
        <Route path="/join" element={<Join />}></Route>

        <Route path="/login" element={<Login />}></Route>

        <Route path="/searchlist" element={<Searchlist />}></Route>

        <Route path="/product/:id" element={<Productpart />}></Route>

        <Route path="/update/" element={<Update />}></Route>


    </Routes>

    </div>
    
  );
}

export default App;
