const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port =process.env.PORT|| 5000;
const dbUri = process.env.DB_URI||"mongodb+srv://cjtignap:dubdrSxHRJ5NR2AN@project.d4qvv.mongodb.net/central-repo?retryWrites=true&w=majority";
const recordRoutes = require('./routes/recordRoutes');
const apiRoutes = require('./routes/apiRoutes');
const path = require('path');
require('dotenv').config();


app.use(express.json({limit: '5mb'}));

app.use('/api/records',recordRoutes);

app.use('/api/',apiRoutes);

// app.use(express.static(path.join(__dirname,"client","build")));

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });
mongoose.connect(dbUri,{useNewUrlParser:true,useUnifiedTopology:true})
.then(res=>{app.listen(port,()=>{
    console.log("Listening to port : "+port);
})})
.catch(err=>{
    console.log(err.message);
});
 
