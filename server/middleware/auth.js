const jwt=require("jsonwebtoken");


const auth=(req,res,next)=>{


try{


const token=req.header("Authorization");


if(!token){

return res.status(401).json({
message:"No token"
});

}



const decoded=jwt.verify(

token.replace("Bearer ",""),

process.env.JWT_SECRET

);



req.user=decoded.id;


next();



}
catch(error){


res.status(401).json({
message:"Invalid token"
});


}


};


module.exports=auth;
