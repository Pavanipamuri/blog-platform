import React,{useState} from "react";
import API from "../services/api";
import {useNavigate} from "react-router-dom";


function CreatePost(){


const [title,setTitle]=useState("");

const [content,setContent]=useState("");

const navigate=useNavigate();



const createPost=async(e)=>{


e.preventDefault();



try{


await API.post("/posts",

{

title,
content

},

{

headers:{

Authorization:

"Bearer "+localStorage.getItem("token")

}

}


);



alert("Post Created");


navigate("/");


}
catch(error){


alert(error.response.data.message);


}


};




return(

<div>


<h2>Create Blog</h2>



<form onSubmit={createPost}>


<input

placeholder="Title"

onChange={(e)=>setTitle(e.target.value)}

/>



<textarea

placeholder="Content"

onChange={(e)=>setContent(e.target.value)}

></textarea>



<button>

Create

</button>



</form>


</div>


);


}


export default CreatePost;
