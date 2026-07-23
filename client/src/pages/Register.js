import React,{useState} from "react";
import API from "../services/api";
import {useNavigate} from "react-router-dom";


function Register(){

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const navigate=useNavigate();



const register=async(e)=>{

e.preventDefault();


try{

await API.post("/auth/register",{

name,
email,
password

});


alert("Registration Successful");

navigate("/login");


}
catch(error){

alert(error.response.data.message);

}


};



return(

<div>

<h2>Register</h2>


<form onSubmit={register}>


<input

type="text"

placeholder="Name"

onChange={(e)=>setName(e.target.value)}

/>


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

Register

</button>



</form>


</div>


);


}


export default Register;
