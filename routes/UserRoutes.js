var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
const User = require('../models/UserModel');



module.exports = router