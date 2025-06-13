const exp = require("express");
const user = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Use json middleware
user.use(exp.json());

user.post("/create_user", expressAsyncHandler(async (request, response) => {
    let clg = request.app.get("clg");
    let newUserObj = request.body;

    // Check if username already exists
    let userDB = await clg.findOne({ username: newUserObj.username });
    if (userDB != null) {
        response.send({ message: "Username has already been taken" });
    } else {
        // Hash password
        let hashedPassword = await bcryptjs.hash(newUserObj.password, 10);
        // Replace plain password with hashed password
        newUserObj.password = hashedPassword;

        // Insert newUser without profile photo
        await clg.insertOne(newUserObj);
        // Send response
        response.send({ message: "New user created" });
    }
}));

// Create route for user login
user.post("/login", expressAsyncHandler(async (request, response) => {
    let clg = request.app.get("clg");
    // Get user credentials object from client
    let userCredObj = request.body;
    // Search for user by username
    let userDB = await clg.findOne({ username: userCredObj.username });
    // If username does not exist
    if (userDB == null) {
        response.send({ message: "Invalid user" });
    } else {
        // Compare passwords
        let status = await bcryptjs.compare(userCredObj.password, userDB.password);
        if (status == false) {
            response.send({ message: "Invalid password" });
        } else {
            // Create token
            let token = jwt.sign({ username: userDB.username }, 'abcdef', { expiresIn: 600 });
            // Send token
            response.send({ message: "Login success", payload: token, userObj: userDB });
        }
    }
}));

user.get("/get_user/:clg_name", expressAsyncHandler(async (request, response) => {
    let clg = request.app.get("clg");
    let college_name = request.params.clg_name;
    let filtered_users = await clg.find({ college: "VNR VJIET" }).toArray();
    response.send({ message: "Created user successfully",payload:filtered_users });
    console.log(filtered_users)
}));




module.exports = user;
