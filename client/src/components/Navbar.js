import React from "react";
import {Link} from "react-router-dom";


function Navbar(){


return(

<nav>


<h2>Blog Platform</h2>


<Link to="/">
Home
</Link>


<Link to="/create">
Create Post
</Link>


<Link to="/login">
Login
</Link>


<Link to="/register">
Register
</Link>


</nav>


);


}


export default Navbar;
