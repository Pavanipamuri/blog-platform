import React,{useEffect,useState} from "react";
import API from "../services/api";
import {Link} from "react-router-dom";


function Home(){


const [posts,setPosts]=useState([]);



useEffect(()=>{

getPosts();

},[]);



const getPosts=async()=>{


try{


const res=await API.get("/posts");

setPosts(res.data);


}
catch(error){

console.log(error);

}


};



return(

<div>


<h1>Blog Posts</h1>



{

posts.map((post)=>(


<div key={post._id}>


<h2>

{post.title}

</h2>


<p>

{post.content.substring(0,100)}

</p>


<p>

By {post.author?.name}

</p>



<Link to={`/post/${post._id}`}>

Read More

</Link>



<hr/>


</div>


))


}



</div>


);


}



export default Home;
