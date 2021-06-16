require('dotenv').config()
const jwt = require('jsonwebtoken')

// To change the expiration time for the JWT you can change those variables
const expirationTime = '15m'
const refreshExpirationTime= '1y'
/* 
This function generate a new access token for user authentication
usage:
generating new access token for user on login
app.post('/login', (req, res)=>{
    const username = req.body.username
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    
    const user = {
        username,
        firstname,
        lastname
    }

    const accessToken = generateAccessToken(user)
})
*/
const generateAccessToken = (user)=>{
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{ expiresIn: expirationTime })
}
// Same usage as generateAccessToken
const generateRefreshAccessToken = (user)=>{
    return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{ expiresIn: refreshExpirationTime }) 
}

const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401) // should be modified
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err) return res.sendStatus(403) // should be modified
        req.user = user
        next()
    })
}