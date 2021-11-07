
require('dotenv').config();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port =process.env.PORT|| 5000;
const dbUri = process.env.DB_URI;
const recordRoutes = require('./routes/recordRoutes');
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');
const path = require('path');


app.use(express.json({limit: '5mb'}));

app.use('/api/records',recordRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/',apiRoutes);

app.use(cookieParser());

app.use(express.static(path.join(__dirname,"client","build")));

app.get('/cookie',(req,res)=>{
    console.log('Cookies',req.cookies);
    res.cookie('jwt','SOME RANDOM SHIT');
    res.send('COokies');
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
mongoose.connect(dbUri,{useNewUrlParser:true,useUnifiedTopology:true})
.then(res=>{app.listen(port,()=>{
    console.log("Listening to port : "+port);
})})
.catch(err=>{
    console.log(err.message);
});
 
