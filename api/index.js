const express= require('express');
const cors= require('cors');
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken')
const { default: mongoose } = require('mongoose');
const User = require('./models/User.js');
const Place = require('./models/Place.js');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const app=express();
app.use('/uploads', express.static(__dirname +'/uploads'));
const fs = require('fs');
const download = require('image-downloader');
const multer = require('multer');
const Booking= require('./models/Booking.js');
const bcryptsalt=bcrypt.genSaltSync(10)
const jwtsecret="bhbbhbhbh";
app.use(express.json())
app.use(cors(
  {
    origin: ("https://booking-front-end.onrender.com/"),
    methods:["POST","GET"],
    credentials:true,
   
}));
function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtsecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

mongoose.connect(process.env.MONGO_URL)
app.use(cookieParser());

app.get('/test',(req,res)=>
{
    res.json("okayishhh")
})

app.post('/register',async(req,res)=>
{
    const {name,email,password}=req.body;
  try{ const userDoc= await User.create({
        name,email,password:bcrypt.hashSync(password, bcryptsalt),
    })
    res.json(userDoc)}catch(e){
        res.status(422).json(e)
    }
})
app.post('/login',async(req,res)=>
{
    const {email,password}=req.body;
   const userDoc= await User.findOne({email})
  if(userDoc){
    const passOk=bcrypt.compareSync(password,userDoc.password)
    if (passOk) {
        jwt.sign(
            {
                email:userDoc.email, 
                id:userDoc._id,
                name:userDoc.name
            },
            jwtsecret,{},(err,token)=>{
            if(err) return res.json('not okay');
             res.cookie('token', token).json(userDoc)
        })
       
    } else {
        res.status(402).json("not okay")
    }
  }else{
    res.json("not found")
  }
    
})
app.get('/profile', async(req,res)=>{
const {token}=req.cookies;
if(token){
jwt.verify(token,jwtsecret,{},(err,user)=>{
if(err) throw err;
res.json(user);
})
}else{
    res.json(null);
}
})
app.post('/logout', (req,res) => {
    res.cookie('token', '').json(true);
  });


  app.post('/uploadbylink',async(req,res)=>{
    const newName = 'photo' + Date.now() + '.jpg';
    const {link}=req.body;
   await download.image({
        url:link,
        dest:__dirname+'/uploads/'+newName   
     }
     )
     res.json(newName)
  })





  const photosMiddleware = multer({dest: 'uploads/' });
app.post('/upload', photosMiddleware.array('photos', 100),async(req,res)=>{
const uploadedFiles = [];
for (let i = 0; i < req.files.length; i++) {
const {path, originalname} = req.files[i];
const parts =originalname.split('.');
const ext= parts [parts.length - 1];
const newPath = path + '.' + ext;
console.log(newPath.replace('uploads',''));


fs.renameSync (path, newPath);
uploadedFiles.push(newPath.replace('uploads',''));
}
console.log(req.files)
console.log(uploadedFiles)

res.json (uploadedFiles);
}
);


app.post('/places',(req,res)=>{
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    const {
      title,address,addedPhotos,description,price,
      perks,extraInfo,checkIn,checkOut,maxGuests,
    } = req.body;
    jwt.verify(token, jwtsecret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.create({
        owner:userData.id,price,
        title,address,photos:addedPhotos,description,
        perks,extraInfo,checkIn,checkOut,maxGuests,
      });
      res.json(placeDoc);
    });
})


app.get('/user-places',(req,res)=>{
    const {token} = req.cookies;
  jwt.verify(token, jwtsecret, {}, async (err, userData) => {
    const {id} = userData;
    res.json( await Place.find({owner:id}) );
  });
})

app.get('/places/:id',async(req,res)=>{
  const {id}=req.params
  res.json(await Place.findById(id))
})
app.put('/places',async(req,res)=>{
  const {token} = req.cookies;
  const {
    id,title,address,addedPhotos,description,price,
    perks,extraInfo,checkIn,checkOut,maxGuests,
  } = req.body;
  jwt.verify(token, jwtsecret, {}, async (err, userData) => {
const placeDoc= await Place.findById(id);
if(userData.id=== placeDoc.owner.toString()){
  placeDoc.set({
    price,title,address,photos:addedPhotos,description,
    perks,extraInfo,checkIn,checkOut,maxGuests,
  })
 await placeDoc.save();
  res.json('ok')
}
  })
})

app.get('/places',async(req,res)=>
{
res.json(await Place.find());
})

app.get('/place/:id',async(req,res)=>{
  const {id}=req.params
  res.json(await Place.findById(id))
})
app.post('/bookings', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  const {
    place,checkin,checkout,numberofguest,name,phone,price,
  } = req.body;
  Booking.create({
    place,checkin,checkout,numberofguest,name,phone,price,
    user:userData.id,
  }).then((doc) => {
    res.json(doc);
  }).catch((err) => {
    throw err;
  });
});



app.get('/bookings', async (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  res.json( await Booking.find({user:userData.id}).populate('place') );
});

app.listen(4000);
