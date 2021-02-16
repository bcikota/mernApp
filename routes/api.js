const express = require('express');
const router = express.Router();
const BlogPost = require('../models/blogPost');

//Routes
router.get('/',(req,res)=>{
    
    BlogPost.find({})
        .then((data)=> {
            console.log('Data: '+data);
            res.json(data);
        })
        .catch((err)=> {
            console.log('err');
        });

});

//Saving data to mongoDB

router.post('/save', (req,res) => {
   
    const data = req.body;

    const newBlogPost = new BlogPost(data);
    
    newBlogPost.save(err => {
        if(err){
            res.status(500).json({
                msg: 'Sorry, internal server errors'
            });
        } else {
            res.json({
                msg: 'Your data has been saved!'
            });
        }
    });
});


module.exports = router;