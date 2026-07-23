import React,{useState} from "react";
import API from "../services/api";
import {useNavigate} from "react-router-dom";


function Login(){


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const navigate=useNavigate();



const login=async(e)=>{


e.preventDefault();



try{


const res=await API.post("/auth/login",{

email,
password

});



localStorage.setItem(

"token",

res.data.token

);



alert("Login Successful");


navigate("/");



}
catch(error){


alert(error.response.data.message);


}


};




return(

<div>


<h2>Login</h2>



<form onSubmit={login}>


<input

type="email"

placeholder="Email"

onChange={(e)=>setEmail(e.target.value)}

/>



<input

type="password"

placeholder="Password"

onChange={(e)=>setPassword(e.target.value)}

/>



<button>

Login

</button>



</form>



</div>


);


}



export default Login;
