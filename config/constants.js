const mongodbUrl = "test";
let basePath = 'http://localhost:3000';
module.exports = {
    mongodbUrl: mongodbUrl,
    basePath: basePath,
    usersImagePath: basePath +'/images/uploads/users/',
    JWT_SECRET: 'SuperSecRetKey'
}