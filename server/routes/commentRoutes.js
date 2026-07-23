const express = require("express");
const router = express.Router();

const Comment = require("../models/Comment");

const auth = require("../middleware/auth");


// ADD COMMENT

router.post("/:postId",auth,async(req,res)=>{

    try{

        const comment = await Comment.create({

            text:req.body.text,

            user:req.user,

            post:req.params.postId

        });


        res.status(201).json(comment);


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});




// GET COMMENTS OF POST

router.get("/:postId",async(req,res)=>{

    try{


        const comments = await Comment.find({

            post:req.params.postId

        })
        .populate("user","name");


        res.json(comments);


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});




// DELETE COMMENT

router.delete("/:id",auth,async(req,res)=>{


    try{


        const comment = await Comment.findById(req.params.id);



        if(comment.user.toString() !== req.user){

            return res.status(403).json({

                message:"Not allowed"

            });

        }



        await comment.deleteOne();



        res.json({

            message:"Comment deleted"

        });


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }


});



module.exports = router;
