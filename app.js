require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
var path = require("path")
require('./config')
const app = express()
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express.json());
app.use(cors());
app.use(morgan('combined'))

const User = require('./models/UserModel')
const Product = require('./models/ProductModel');
const e = require('express');


// app.use(express.static(path.join(__dirname, 'build')));


// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


app.post('/api/users/login', (req,res)=>{
    const { username , password } = req.body
    User.findOne({ username },(err,result)=>{
        if(err){
            res.status(400).send("Something went wrong")
        }else{
            if(result){
                bcrypt.compare(password, result.password).then((isValid)=>{
                    if(isValid){
                        res.status(200).send(result)
                    }else{
                        res.status(400).send("Incorrect Password")
                    }
                }
                );
            }else{
                res.status(400).send("User Not Found")
            }
        }
        return
    });
});

app.post('/api/products/add',(req,res)=>{
    const { name, details, image } = req.body;
    const product = new Product({name,details,image});
    product.save().then((response)=>{
        res.send("ok");
    }).catch(e=>{
        res.status(400).send("Something went wrong")
    });
})

app.post('/api/products/edit',(req,res)=>{
    
})

app.post('/api/products/delete',(req,res)=>{

})

app.get('/api/products/single',(req,res)=>{
    const { product_id } = req.query;
    Product.findById(product_id,(err,result)=>{
        if(err){
            res.status(400).send("Something went wrong")
        }else{
            if(result){
                res.status(200).send(result)
            }else{
                res.status(400).send("Product not found")
            }
        }
    })
})

app.get('/api/products/all',(req,res)=>{
    let limit;
    let sort;
    if(req.query.latest){
        limit=3;
        sort={createdAt:-1}
    }
    Product.find({},(err,result)=>{
        if(err){
            res.status(400).send("Something went wrong")
        }else{
            if(result){

                res.status(200).send(result)
            }else{
                res.status(400).send("Product not found")
            }
        }
    }).sort(sort)
    .limit(limit)
})

app.post('/api/users/register', (req,res)=>{
    const { firstName, lastName, username, password } = req.body;
    const user = new User({firstName,lastName,username,password});
    user.save().then((response)=>{
        if(response){
            res.status(200).send(user);
        }
    }).catch(e=>{
        res.status(400).send("Something went wrong")
    });
    
})



app.listen(process.env.PORT,()=>{
    console.log("App is listening on port: ", process.env.PORT)
});