// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

const express = require('express');
var path = require('path');
const router = express.Router();
const UsersController = require('../controllers').UsersController;
const UsersControllerObj = new UsersController();
let usersPath = 'public/images/uploads/users';

const multer = require('multer');
var storage = multer.diskStorage({   
  destination: function(req, file, cb) {
    cb(null, usersPath);
  }, 
  filename: function (req, file, cb) { 
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // console.log('file.originalname', uniqueSuffix +'_'+ file.originalname);
    // cb(null, file.fieldname + '-' + uniqueSuffix)
    
    let id = req.body.id;
    let originalname = file.originalname;
    let newFileName = id;
    let extention = path.extname(originalname);
    let fullFileName = newFileName + extention;
    let fullFileNameWithPath = usersPath +'/'+ fullFileName;
    
    req.params.userImageDetails = {
      fileOriginalname : originalname,
      newFileName : newFileName,
      fileExtention : extention,
      fullFileName : fullFileName,
      fullFileNameWithPath : fullFileNameWithPath
    };
    cb(null , fullFileName );
  }
});
const upload = multer({
  storage: storage,
  limits : {fileSize : 1000000} // (1000000 bytes = 1MB)
});

router.get('/:id', UsersControllerObj.getUserById);
router.delete('/:id', UsersControllerObj.deleteUser);
// router.delete('/hard/:id', UsersControllerObj.deleteHardUser);
router.post('/profilepic', upload.single('profile_pic'), UsersControllerObj.uploadProfilePic);
router.get('/email/:email/exist', UsersControllerObj.isEmailExists);
router.patch('/', UsersControllerObj.updateUser);
router.get('/', UsersControllerObj.getAllUsers);
router.post('/', UsersControllerObj.insertUser);

module.exports = router;