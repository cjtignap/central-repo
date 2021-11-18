const mongoose = require('mongoose');
const {Schema}=mongoose;

const articleSchema=new Schema({
    title:{
        type:String,
        required:true,
        minlength:12,
    },
    body:{
        type:String,
        minlength:55,
        requied:true
    },
    image:{
        type:String
    },
    author:{
        type:String,
        required:true
    },
    date:{
        type:String
    },
    articleId:{
        type:Number 
    }
});

const Article=mongoose.model('article',articleSchema);
module.exports = Article;