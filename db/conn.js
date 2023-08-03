const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db="mongodb+srv://sourabh:18jan2002@cluster1.bw6g0pq.mongodb.net/AssignmentZedblock"
const local="mongodb://127.0.0.1:27017/AssignmentZedblock"
// Connect MongoDB at default port 27017.
mongoose.set('strictQuery', false);
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   

   
}).then(()=>{
    console.log('connection succes');
}).catch((e)=>{
    console.log('no connect'+e);
})


