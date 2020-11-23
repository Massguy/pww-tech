const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.NODE_ENV === 'test'?process.env.MONGODB_TEST_URI:process.env.MONGODB_URI,{ useNewUrlParser: true,useUnifiedTopology: true })
