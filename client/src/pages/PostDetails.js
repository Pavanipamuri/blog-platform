import React,{useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import API from "../services/api";


function PostDetails(){


const {id}=useParams();


const [post,setPost]=useState({});

const [comments,setComments]=useState([]);

const [text,setText]=useState("");



useEffect(()=>{

getPost();

getComments();

},[]);



const getPost=async()=>{


const res=await API.get(`/posts/${id}`);

setPost(res.data);


};



const getComments=async()=>{


const res=await API.get(`/comments/${id}`);

setComments(res.data);


};




const addComment=async(e)=>{


e.preventDefault();



try{


await API.post(

`/comments/${id}`,

{

text

},

{

headers:{

Authorization:

"Bearer "+localStorage.getItem("token")

}

}


);



setText("");

getComments();



}

catch(error){

alert("Login required");

}


};





return(

<div>


<h1>

{post.title}

</h1>



<p>

{post.content}

</p>



<h2>Comments</h2>



<form onSubmit={addComment}>


<input

placeholder="Write comment"

value={text}

onChange={(e)=>setText(e.target.value)}

/>



<button>

Add

</button>


</form>



{

comments.map((comment)=>(


<div key={comment._id}>


<p>

{comment.text}

</p>


<small>

By {comment.user?.name}

</small>


<hr/>


</div>


))


}



</div>


);


}


export default PostDetails;
