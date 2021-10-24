const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 5000|process.env.port;
const dbUri = 'mongodb+srv://cjtignap:dubdrSxHRJ5NR2AN@project.d4qvv.mongodb.net/central-repo?retryWrites=true&w=majority';
const bodyParser = require('body-parser');
const recordRoutes = require('./routes/recordRoutes');


app.use(bodyParser.json());
mongoose.connect(dbUri,{useNewUrlParser:true,useUnifiedTopology:true})
.then(res=>{app.listen(port,()=>{
    console.log("Listening to port : "+port);
})})
.catch(err=>{
    console.log(err.message);
});

app.use('/api/records',recordRoutes);

