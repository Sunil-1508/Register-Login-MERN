import express from 'express'
import mongoose from 'mongoose'
import Data from './model.js'
import cors from 'cors'


const app = express();
const port = 5001;
app.use(express.json())
app.use(cors(
  {
    origin:["https://register-login-zeta.vercel.app"],
    methods:["POST","GET"],
    credentials: true
  }
))

app.listen(port, ()=> console.log(`server running in port ${port}`))

mongoose.connect('mongodb+srv://sunilnoolu:sunil123@cluster0.shxe0yc.mongodb.net/Cluster0?retryWrites=true&w=majority')
.then(()=>{ console.log("connected to MongoDB ");  })
.catch(err => console.log(err))

app.post('/post', async (req, res) => {
    try {
      const newData = new Data(req.body);
      const { username } = newData;
      const user = await Data.findOne({ username });
  
      if (user) {
        return res.status(401).json({ error: "User already exists" });
      }
  
      await newData.save();
      res.status(200).json({ message: "Successfully registered" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.post('/validate', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await Data.findOne({ username });
  
      if (user && user.password === password) {
        return res.status(200).json({ message: "Successfully logged in" });
      }
   
      res.status(401).json({ error: "Invalid credentials" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.get('/getdata',async (req,res)=>{
    try{
        const allData =await Data.find();
        return res.send(allData);
    }
    catch(err){
        console.log(err.message);
        res.send(err.message);
    }
})

app.get('/getdata/:id',async (req,res)=>{
    try{
        const data =await Data.findById(req.params.id);
        return res.send(data);
    }
    catch(err){
        console.log(err.message);
        res.send(err.message);
    }
})

app.delete('/deletedata',async (req,res)=>{
    try{
        
        await Data.deleteMany();
        return res.send('All data Deleted Succesfully');
    }
    catch(err){
        console.error(err.message);
        res.status(500).send(err.message);
    }
})