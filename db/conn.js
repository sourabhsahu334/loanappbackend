const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const db1="mongodb+srv://sourabh2:18jan2002@cluster0.88wwojw.mongodb.net/test"
const db="mongodb+srv://sourabh:18jan2002@cluster1.bw6g0pq.mongodb.net/Registration"
const local="mongodb://0.0.0.0:27017/AssignmentZedblock"
// Connect MongoDB at default port 27017.
mongoose.connect(local, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   

   
}).then(()=>{
    console.log('connection succes');
}).catch((e)=>{
    console.log('no connect'+e);
})


