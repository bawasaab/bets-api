const jwt = require('jsonwebtoken');
let Validator = require('validatorjs');
const User = require('../models').User;
// const accesses = require('../config/access');
const constants = require('../config/constants');

let ResponseService = require('../services/ResponseService');
let ResponseServiceObj = new ResponseService();

module.exports = class AuthController {

    constructor(){
        console.log('inside AuthController controller constructor');
    }

    signUp(req, res, next) {

        try {

            let in_data = req.body;
            let rules = {
                first_name: 'required',
                last_name: 'required',
                email: 'required|email',
                password: 'required|min:6',
                role: 'required|in:ADMIN,USER',
                status: 'required|in:OPEN,CLOSE,DELETED',
            };

            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {
                throw ResponseServiceObj.getFirstError( validation );
            }
            
            User.create(
                req.body
            )
            .then( async (result) => {
                if (result) {
    
                    let userData = {
                        "id": result.id,
                        "first_name": result.first_name,
                        "last_name": result.last_name,
                        "email": result.email,
                        "role": result.role,
                        "status": result.status,
                        "deletedAt": result.deletedAt,
                        "createdAt": result.createdAt,
                        "updatedAt": result.updatedAt
                    };

                    let out_data = await jwt.sign({userData}, constants.JWT_SECRET, { expiresIn: 60 * 60 });
                    return await ResponseServiceObj.sendResponse( res, {
                        msg : 'Signup Successfull',
                        data : {
                            token: out_data,
                            user: userData,
                            image_base_url: constants.usersImagePath
                        },
                        cnt: 1
                    } );
                } else {
                    let out_data = {
                        msg : 'Error unable to signup'
                    };
                    return await ResponseServiceObj.sendException( res, out_data );
                }
            })
            .catch((ex) => {
        
                let out_data = {
                    msg : ex.toString()
                };
                return ResponseServiceObj.sendException( res, out_data );
            });
        } catch( ex ) {
            let out_data = {
                msg: ex.toString()
            };
            return ResponseServiceObj.sendException( res, out_data );
        }
    }

    signIn( req, res, next ) {

        try {
            var email = req.body.email;
            var password = req.body.password;

            let rules = {
                email: 'required',
                password: 'required'
            };

            let validation = new Validator(req.body, rules);
            if( validation.fails() ) {
                throw ResponseServiceObj.getFirstError( validation );
            }
        
            User.findOne({ where: { email: email } })
            .then( async(result) => {
    
                if (result === null) {
    
                    throw 'Email not found';
                } else {
                    
                    if( password == result.password ) {
                        let userData = {
                            "id": result.id,
                            "first_name": result.first_name,
                            "last_name": result.last_name,
                            "email": result.email,
                            "dob": result.dob,
                            "role": result.role,
                            "status": result.status,
                            "deletedAt": result.deletedAt,
                            "createdAt": result.createdAt,
                            "updatedAt": result.updatedAt
                        };

                        let out_data = await jwt.sign({userData}, constants.JWT_SECRET, { expiresIn: 60 * 60 });
                        return await ResponseServiceObj.sendResponse( res, {
                            msg : 'Signin successfully',
                            data : {
                                token: out_data,
                                user: userData
                            },
                            cnt: 1
                        } );
                    } else {
                        throw 'Invalid password';
                    }
                }
            })
            .catch((ex) => {
    
                let out_data = {
                    msg: ex.toString()
                };
                return ResponseServiceObj.sendException( res, out_data );
            });
        } catch( ex ) {
            let out_data = {
                msg: ex.toString()
            };
            return ResponseServiceObj.sendException( res, out_data );
        }
    }

    signOut(req, res, next) {}
    
    verifyToken(req, res, next) {
        //Request header with authorization key
        const bearerHeader = req.headers['authorization'];
        
        //Check if there is  a header
        if(typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');

            //Get Token arrray by spliting
            const bearerToken = bearer[1];
            req.token = bearerToken;
    
            jwt.verify(req.token, constants.JWT_SECRET, (err, authData)=>{
    
                if(err){
                    res.status(403).send({ err: err });
                }else{
                    
                    req.authData = authData;
                    //call next middleware
                    next();
                }
            });
        }else{
            res.status(403).send({ err: 'Header is not defined.' });            
        }
    }

    /*
    verifyAccess( req, res, next ) {

        let full_path = req.baseUrl + req.route.path;
        // let roleId = req.authData.roleId;
        let roleId = 2;

        if( accesses.hasOwnProperty( full_path ) ) {

            let authorisedRoles = accesses[full_path];
            if ( authorisedRoles.indexOf( roleId ) > -1 ) {
                //call next middleware
                next();
            } else {
                // Unauthorized Access
                res.status(403).send({ err: 'Unauthorized access.' });
            }
        } else {
            // Path is not declared in the /config/access.json
            res.status(403).send({ err: 'Path is not declared in the /config/access.json' });
        }
    }
    */
}