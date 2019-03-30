var express = require('express');
var app = express();
const jwt = require('jsonwebtoken');
var router = express.Router();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

router.post('/api/signin', (req, res) => {
    const user = {
        id: 1,
        username: "johndoe",
        email: "john.doe@test.com"
    }
    //http://programmerblog.net/nodejs-authentication-jwt/
    jwt.sign({user},'SuperSecRetKey', { expiresIn: 60 * 60 }, (err, token) => {
        res.json({token});
    });    
});

router.post('/api/signup', bodyParser.json(), function(req, res){
	  var email = req.body.email;
    	res.json({ 'email':req.data });
});

router.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'SuperSecRetKey', (err, authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                msg: "A new post is created",
                authData
            });
        }
    });
});

router.get('/',function(req, res, next) {
     res.send('Express RESTful API');
 });

function verifyToken(req, res, next){
    
    const bearerHeader = req.headers['authorization'];
 
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        //Get Token arrray by spliting
        const bearerToken = bearer[1];
        req.token = bearerToken;
        //call next middleware
        next();
    }else{
        res.sendStatus(403);
    }
}
module.exports = router;