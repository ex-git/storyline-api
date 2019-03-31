'use strict'

//use .env to set enviroment specific variables
require('dotenv').config()

exports.CLIENT_ORIGIN = process.env.CROS_ORIGIN || 'http://localhost:3000'
exports.PORT = process.env.PORT || 8080;
exports.DATABASE_URL = process.env.DATABASE || "mongodb://localhost/storyline-api";