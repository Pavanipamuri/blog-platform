const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

const auth = require("../middleware/auth");


// CREATE POST

router.post("/",auth,async(req,res)=>{

    try{

        const post = await Post.create({

            title:req.body.title,

            content:req.body.content,

            author:req.user

        });


        res.status(201).json(post);


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});




// GET ALL POSTS

router.get("/",async(req,res)=>{

    try{

        const posts = await Post.find()
        .populate("author","name email");


        res.json(posts);


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});




// GET SINGLE POST

router.get("/:id",async(req,res)=>{

    try{

        const post = await Post.findById(req.params.id)
        .populate("author","name");


        res.json(post);


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});




// UPDATE POST

router.put("/:id",auth,async(req,res)=>{

    try{


        const post = await Post.findById(req.params.id);



        if(post.author.toString() !== req.user){

            return res.status(403).json({
                message:"Not allowed"
            });

        }



        post.title=req.body.title;

        post.content=req.body.content;


        await post.save();



        res.json(post);


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});




// DELETE POST

router.delete("/:id",auth,async(req,res)=>{


    try{


        const post = await Post.findById(req.params.id);



        if(post.author.toString() !== req.user){

            return res.status(403).json({
                message:"Not allowed"
            });

        }



        await post.deleteOne();



        res.json({
            message:"Post deleted"
        });



    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }


});



module.exports=router;
