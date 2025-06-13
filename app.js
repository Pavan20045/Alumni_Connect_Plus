const exp = require("express");
const app = exp();
const cors = require('cors');

// Allow requests from all origins
app.use(cors());
// Middleware to parse JSON bodies
app.use(exp.json());

const path = require('path');
// Serve static files from React build
app.use(exp.static(path.join(__dirname, './catastrophe/build')));

// Connect to MongoDB
const mclient = require("mongodb").MongoClient;
const DBurl = "mongodb+srv://varipavan045:Pavan20045@cluster0.quubumu.mongodb.net/";

mclient.connect(DBurl)
  .then((client) => {
    console.log("DB connection success");
    // Create collection objects
    let dbObj = client.db("alumni");
    let clg = dbObj.collection("VNR VJIET");
    app.set("clg", clg);
  })
  .catch(err => console.log("Error in DB connection ", err));

// Link alumni API
const alumni = require('./API/alumni');
app.use('/alumni', alumni);

// Handle page refresh
app.use('*', (request, response) => {
  response.sendFile(path.join(__dirname, './catastrophe/build/index.html'));
});

// Error handling middleware
app.use((error, request, response, next) => {
  response.status(500).send({ message: `${error.message}`, reason: `${error.message}` });
});

// Set port number
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running successfully on port number ${PORT}`));
