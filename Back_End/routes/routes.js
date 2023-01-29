const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('./../Model/User');
const {sendmail} = require('./../Nodemailer/Inscription.js');
const {sendkeymail} = require('./../Nodemailer/Forgetpassword.js');
var userskey=[];


const fs = require("fs");

let fs2 = require('fs-extra');


const { set } = require('mongoose');
router.get('/', function (req, res) {
  res.send('Hello World');
});
router.post('/login', async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try{
        await User.find({email:req.body.email}).then((result) => {
            if(result.length==0){
                res.sendStatus(400);

            }
            else {
                bcrypt.compare(req.body.password, result[0].password, function(err, result) {
                        if (result) {
                            console.log('valide');
                             User.find({email:req.body.email}).then((result2) => {
                                res.send(result2);

                            console.log(result2);});
                        }
                        else{
                            console.log('invalide')
                            res.sendStatus(400);

                        }
                    });
                       }
                            })
                                }
        catch(err){console.log(err)}});
router.post('/userbyid', async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try{
        await User.find({id:req.body.id}).then((result) => {
            if(result.length==0){
                res.sendStatus(400);
            }
            else {
                
                                res.send(result);

                            console.log(result);};
                        });
                      
                        
                    
                    }
                    catch(err){console.log(err)}
                            });
router.post('/userbyusername', async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try{
        await User.find({username:req.body.username}).then((result) => {
            if(result.length==0){
                res.sendStatus(400);
            }
            else {
                
                                res.send(result);

                            console.log(result);};
                        });
                      
                        
                    
                    }
                    catch(err){console.log(err)}
                            });
                                


        router.use(express.json());

router.post('/inscription', async function  (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    try{
        await User.find({email:req.body.email}).then(async(result) => {
            if(result.length!==0){
          
                            res.sendStatus(300);
                            console.log('Error user is trouve');
            }
            else {
                console.log(req.body.photo);
                console.log(req.body.id);
                User1= new User({
                    id:req.body.id,
                    nom:req.body.nom,
                    prenom:req.body.prenom,
                    email:req.body.email,
                    password:bcrypt.hashSync(req.body.password,10),
                    tel:req.body.tel,
                    sexe:req.body.sexe,
                    photo:req.body.photo,
                    username:req.body.username,
                    path:'http://localhost:4000/images/'+req.body.email+'_'+req.body.tel+'/'+req.body.photo,
                    date_creation:req.body.date_creation,
                });
                await User1.save();
                await sendmail(req.body.email,req.body.nom);
                
                    res.send("valide");
                    console.log("valide");
                        }
                       
                       })
                    }
                            
                                
        catch(err){console.log(err)}




});
var obj = {};
router.post('/checkemail', async function  (req, res) {
    var id_token= Math.floor(Math.random() * (5000000 - 1000000 + 1) + 1000000);

    res.setHeader('Access-Control-Allow-Origin', '*');
    try{
        await User.find({email:req.body.email}).then((result) => {
            if(result.length==0){
          
                res.sendStatus(300);
            }
            else {


                userskey[req.body.email]= id_token;
                setTimeout(function () {
                 delete userskey[req.body.email];
                 obj=[{}];
                }
                ,120000);
                console.log(userskey);
                 sendkeymail(req.body.email,id_token);
                 res.sendStatus(200);
                 var email=req.body.email;
                 obj=[{email,id_token}];

            }
                       
                       })
                    }
                            
                                
        catch(err){console.log(err)}
    });


router.get('/checkkey', async function  (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
 
    res.send(obj);
    console.log(userskey);
   
});
router.post('/setnewpassword', async function  (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try{
        await User.updateOne({email:req.body.email},{password:bcrypt.hashSync(req.body.password,10)});
        res.sendStatus(200);    
        console.log("changed");       
        console.log(req.body.email);       
        console.log(req.body.password);       
              
                    }
                            
                                
        catch(err){console.log(err)
            res.sendStatus(300);
        
        }
    });
router.post('/setdata', async function  (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try{
        await User.find({email:req.body.email}).then(async(result) => {
            if((result.length==0)||(result[0].email==req.body.email2)){
                await User.updateOne({id:req.body.id},{email:req.body.email,nom:req.body.nom,prenom:req.body.prenom,tel:req.body.tel});
                console.log("changed");       
                console.log(req.body.email);       
                console.log(req.body.id);  
                res.sendStatus(200);
            }
            else {
                res.sendStatus(300);
            }

                    })
                }
                            
                                
        catch(err){console.log(err)
            res.sendStatus(300);

        }
    });

router.get('/about', function (req, res) {
  res.send('About youu');
});
var multer = require('multer')
var path = require("path");

// Check for extension of image
const getExtension = file =>{
    if (file.mimetype == "image/jpeg")
        ext =  ".jpeg"
    else
        ext =".png"
    return ext;
}






let upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, callback) => {
        let type = req.params.id;
        let path = `./image/${type}`;
        fs2.mkdirsSync(path);
        callback(null, path);
      },
      filename: (req, file, callback) => {
        //originalname is the uploaded file's name with extn
        callback(null, 'picture'+ path.extname(file.originalname));
      }
    })
  });
router.post('/saveImage/:id', upload.single('file'), (req, res, next)=>{



    
if(req.file){
            var image = "/images/" +path+"/"+ req.file.filename
res.json({
            status:0,
            message:"Successfully saved",
            path : image
        })
        }
})
router.post('/updateImage/:id', upload.single('file'), async(req, res, next)=>{
    if(req.file){
        var image = "/images/" +path+"/"+ req.file.filename
res.json({
        status:0,
        message:"Successfully saved",
        path : image
    })
  
    await User.find({id:req.body.id}).then(async(result) => {



        await User.updateOne({id:req.body.id},{photo:req.body.photo,path:`http://localhost:4000/images/${req.body.path}/${req.body.photo}`});
        console.log("changed");       
    });
}
    

})

router.get("/images/:filename/:id", async (req, res) => {
    try {
      res.sendFile(path.join(__dirname, "./../image/"+ req.params.filename+"/"+req.params.id));
    } catch (error) {
        res.send("not found");
    }
  });




  router.post('/users', async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try{
        await User.find().then((result) => {
            if(result.length==0){
                res.sendStatus(400);
            }
            else {
                
                                res.send(result);

                            console.log(result);};
                        });
                      
                        
                    
                    }
                    catch(err){console.log(err)}
                            });



                            router.post('/userbyusername', async function (req, res) {
                                res.setHeader('Access-Control-Allow-Origin', '*');
                                try{
                                    await User.find({username:req.body.username}).then((result) => {
                                        if(result.length==0){
                                            res.sendStatus(400);
                                        }
                                        else {
                                            
                                                            res.send(result);
                            
                                                        console.log(result);};
                                                    });
                                                  
                                                    
                                                
                                                }
                                                catch(err){console.log(err)}
                                                        });
//Messages














module.exports = router;