
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
const articleRoutes = require('./routes/articleRoutes');
const path = require('path');


app.use(express.json({limit: '5mb'}));

app.use(cookieParser());  
app.use('/api/records',recordRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/articles',articleRoutes);
app.use('/api/',apiRoutes);



app.use(express.static(path.join(__dirname,"client","build")));


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
 
