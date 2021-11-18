const Article = require('../model/article');

const article_insert = (req,res)=>{ 
    const article = new Article(req.body);
    article.save()
        .then((result)=>{
            res.json(result);
        })
        .catch(err=>{
            console.log(err.message);
            res.send("ERRO")}
        );
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
module.exports = {article_insert,article_get_three,article_get_single}