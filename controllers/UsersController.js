var User = require('../models').User;
const Op = require('sequelize').Op;
let Validator = require('validatorjs');
let constants = require('../config/constants');

let UserService = require('../services/UserService');
let UserServiceObj = new UserService();

let ResponseService = require('../services/ResponseService');
let ResponseServiceObj = new ResponseService();

let $this;

module.exports = class UsersController {

    constructor() {
        console.log('inside controller constructor');
        $this = this;
    }

    insertUser( req, res, next ) {
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

            UserServiceObj.insertUser( in_data )
            .then( async ( result ) => {
                let out_data = {
                    msg: 'Record inserted successfully.',
                    data: {
                        users: result,
                        image_base_url: constants.usersImagePath
                    }
                };
                return await ResponseServiceObj.sendResponse( res, out_data );
            } )
            .catch( async (ex) => {
                let out_data = {
                    msg : ex.toString()
                };
                return await ResponseServiceObj.sendException( res, out_data );
            } );
        } catch(ex) {
            let out_data = {
                msg: ex.toString()
            };
            return ResponseServiceObj.sendException( res, out_data );
        }
    }

    updateUser( req, res, next ) {
        try {
            let id = req.body.id;
            let in_data = req.body;

            let rules = {
                id: 'required|numeric|min:1'
            };
            in_data['first_name'] ? rules['first_name'] = 'required' : '' ;
            in_data['email'] ? rules['email'] = 'required|email' : '' ;
            in_data['password'] ? rules['password'] = 'required|min:6' : '' ;
            in_data['role'] ? rules['role'] = 'required|in:ADMIN,USER' : '' ;
            in_data['status'] ? rules['status'] = 'required|in:OPEN,CLOSE,DELETED' : '' ;

            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {
                throw ResponseServiceObj.getFirstError( validation );
            }

            UserServiceObj.updateUser( id, in_data )
            .then( async ( result ) => {
                let out_data = {
                    msg: 'Record updated successfully.',
                    data: {
                        users: result,
                        image_base_url: constants.usersImagePath
                    }
                };
                return await ResponseServiceObj.sendResponse( res, out_data );
            } )
            .catch( async (ex) => {
                let out_data = {
                    msg : ex.toString()
                };
                return await ResponseServiceObj.sendException( res, out_data );
            } );
        } catch(ex) {
            let out_data = {
                msg: ex.toString()
            };
            return ResponseServiceObj.sendException( res, out_data );
        }
    }

    deleteUser( req, res, next ) {
        try {
            let id = req.params.id;
            let in_data = {
                id: id
            };
            let rules = {
                id: 'required|numeric|min:1'
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {
                throw ResponseServiceObj.getFirstError( validation );
            }
            UserServiceObj.deleteUserSoftlyById( id )
            .then( async( result ) => {
                let out_data = {
                    msg: 'Record deleted successfully.'
                };
                return await ResponseServiceObj.sendResponse( res, out_data );
            } )
            .catch( async (ex) => {
                let out_data = {
                    msg : ex.toString()
                };
                return await ResponseServiceObj.sendException( res, out_data );
            } );
        } catch(ex) {    
            let out_data = {
                msg: ex.toString()
            };
            return ResponseServiceObj.sendException( res, out_data );
        }
    }

    deleteHardUser( req, res, next ) {
        try {
            let id = req.params.id;
            let in_data = {
                id: id
            };
            let rules = {
                id: 'required|numeric|min:1'
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {
                throw ResponseServiceObj.getFirstError( validation );
            }
            UserServiceObj.deleteUserHardlyById( id )
            .then( async( result ) => {
                let out_data = {
                    msg: 'Record deleted successfully.'
                };
                return await ResponseServiceObj.sendResponse( res, out_data );
            } )
            .catch( async (ex) => {
                let out_data = {
                    msg : ex.toString()
                };
                return await ResponseServiceObj.sendException( res, out_data );
            } );
        } catch(ex) {
            let out_data = {
                msg: ex.toString()
            };
            return ResponseServiceObj.sendException( res, out_data );
        }
    }

    getAllUsers( req, res, next ) {
        try {
            
            UserServiceObj.getAllUserCnt()
            .then( async ( cnt ) => {
                return cnt;
            } )
            .then( async ( cnt ) => {

                let result = await UserServiceObj.getAllUser();
                let out_data = {
                    msg: 'Record found',
                    data: {
                        users: result,
                        image_base_url: constants.usersImagePath
                    },
                    cnt: cnt
                };
                return await ResponseServiceObj.sendResponse( res, out_data );
            } )
            .catch( async (ex) => {
                let out_data = {
                    msg : ex.toString()
                };
                return await ResponseServiceObj.sendException( res, out_data );
            } );

        } catch(ex) {
            let out_data = {
                msg: ex.toString()
            };
            return ResponseServiceObj.sendException( res, out_data );
        }
    }

    getUserById( req, res, next ) {
        try {
            let id = req.params.id;
            let in_data = {
                id: id
            };
            let rules = {
                id: 'required|numeric|min:1'
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {
                throw ResponseServiceObj.getFirstError( validation );
            }
            UserServiceObj.getUserById( id )
            .then( async ( result ) => {
                let out_data = {
                    msg: 'Record found',
                    data: {
                        users: result,
                        image_base_url: constants.usersImagePath
                    }
                };
                return await ResponseServiceObj.sendResponse( res, out_data );
            } )
            .catch( async (ex) => {
                let out_data = {
                    msg : ex.toString()
                };
                return await ResponseServiceObj.sendException( res, out_data );
            } );
        } catch(ex) {
            let out_data = {
                msg: ex.toString()
            };
            return ResponseServiceObj.sendException( res, out_data );
        }
    }

    uploadProfilePic( req, res, next ) {
        try {
            let id = req.body.id;
            let userImageDetails = req.params.userImageDetails;
            let rules = {
                id: 'required|numeric|min:1'
            };

            let validation = new Validator(req.body, rules);
            if( validation.fails() ) {
                throw ResponseServiceObj.getFirstError( validation );
            }
            let in_data = {
                profile_pic : userImageDetails.fullFileName,
                updatedAt : new Date()
            };

            User.update(in_data, { where: { id: id } })
            .then( async (result) => {

                if (result === null) {
                    let out_data = {
                        msg: 'Unable to update record'
                    };
                    return await ResponseServiceObj.sendResponse( res, out_data );
                } else {
                    let out_data = {
                        msg: 'Record updated successfully',
                    };
                    return await ResponseServiceObj.sendResponse( res, out_data );
                }
            })
            .catch((ex) => {

                let out_data = {
                    msg: ex.toString()
                };
                return ResponseServiceObj.sendException( res, out_data );
            });

        } catch(ex) {
            let out_data = {
                msg: ex.toString()
            };
            return ResponseServiceObj.sendException( res, out_data );
        }
    }

    isEmailExists( req, res, next ) {
        try {

            let email = req.params.email;
            let rules = {
                email: 'required|email'
            };

            let validation = new Validator(req.params, rules);
            if( validation.fails() ) {
                throw ResponseServiceObj.getFirstError( validation );
            }

            UserServiceObj.isEmailExists( email )
            .then( async ( result ) => {
                let out_data = {
                    msg: result ? 'Email already exists' : 'Email not exists',
                    data: {
                        isEmailExists: result
                    }
                };
                return await ResponseServiceObj.sendResponse( res, out_data );
            } )
            .catch( async (ex) => {
                let out_data = {
                    msg : ex.toString()
                };
                return await ResponseServiceObj.sendException( res, out_data );
            } );
        } catch(ex) {
            let out_data = {
                msg: ex.toString()
            };
            return ResponseServiceObj.sendException( res, out_data );
        }
    }
}