'use strict'

const express = require('express')
const moment = express.Router()

//parse uploaded data form
let multer  = require('multer')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,  Date.now() + '-' + file.originalname.replace(/ +/g, '_'))
    }
  })
//save file into 'uploads' directory
let upload = multer({ storage: storage })

//file system module
const fs = require('fs');

moment.post('/', upload.array('file', 12), (req, res)=>{
    if (req.files.length) {
        console.log('Uploading file...');
    } else {
        console.log('No File Uploaded');
    }
    let uploadedFiles = []
    req.files.forEach(file=>{
        uploadedFiles.push(file.filename)
    })
    res.status(201).json({
        code: 201,
        message: 'accepted',
        files: uploadedFiles
    })
})

moment.get('/:fileid', (req, res)=>{
    let fileRoot = __dirname + '/../uploads/'
    fs.access(fileRoot + req.params.fileid, fs.constants.F_OK, (err) => {
        if(err) {
            res.status(404).json({
                code: 404,
                message: 'Not Found'
            })
        }
        else {
            res.contentType('image/jpeg');
            var options = {
                root: fileRoot,
                dotfiles: 'deny',
                headers: {
                    'x-timestamp': Date.now(),
                    'x-sent': true
                }
            }
            res.sendFile(req.params.fileid, options);
        }
    });
})

module.exports={moment}