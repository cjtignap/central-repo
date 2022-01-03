const Article = require('../model/article');
const User = require('../model/user');


const article_insert = (req,res)=>{ 


    const article = new Article(req.body);

    const userID = req.query.key
     
    User.findOne({_id:userID,type:'national'}, function(err,user){
        if(err||user===null){
           res.status(404).json({error:"Invalid API KEY"})
        }
        else{
        
            article.save()
            .then((result)=>{
                res.json(result);
            })
            .catch(err=>{
                console.log(err.message);
                res.send("ERRO")}
            );
        }
    });
   
}
const article_get_three = (req,res)=>{
    Article.find({}).sort({'date':-1}).limit(3).exec(
        (err,posts)=>{
            if(err){
                console.log(err);
            }else{
                res.json(posts);
            }
        }

    );
}
const article_get_single = (req,res)=>{
    const id = req.params.id;
    Article.findById(id,(err,post)=>{
        if(err){
            res.json({});
        }
        else{
            res.json(post);
        }
    });
}
const article_paginate=(req,res)=>{
    var page = Number(req.params.page);
    Article.find({}).sort({'date':-1}).limit(10).skip((page-1)*10).exec(
        (err,posts)=>{
            if(err){
                console.log(err);
            }else{
                res.json(posts);
            }
        }
    );
}
const article_get_by_author =(req,res)=>{
    const author = req.params.author;

    Article.find({author}).limit(20).exec((err,articles)=>{
        if(err){
            res.status(503).json({});
        }
        else{
            res.json(articles);
        }
    });
}

const article_delete=(req,res)=>{
    const id = req.params.id;
    const userID = req.query.key
     
    User.findOne({_id:userID,type:'national'}, function(err,user){
        if(err||user===null){
           res.status(404).json({error:"Invalid API KEY"})
        }
        else{
            Article.deleteOne({_id:id},err=>{
                if(err){
                    res.status(503).json({status:'failed'});
                }
                else{
                    res.status(200).json({status:'success'})
                }
            });

        }
    });
   
}

// const userID = req.query.key
     
// User.findOne({_id:userID,type:'local'}, function(err,user){
//     if(err||user===null){
//        res.status(404).json({error:"Invalid API KEY"})
//     }
//     else{
       

//     }
// });
module.exports = {article_insert,article_get_three,article_get_single,article_paginate,article_get_by_author,article_delete}