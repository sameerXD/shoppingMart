const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

require("dotenv").config();
// allow cors 
app.use(cors({origin:['http://localhost:3000']}));

// reveal true ip even if using a proxy
app.set('trust proxy', true)

// allow public access of images
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/superAdmin", require("./routes/superAdmin"));
app.use("/anonymousUser", require("./routes/anonymousUser"));
app.use("/shopkeeper", require("./routes/shopkeeper"));
app.use("/user", require("./routes/user"));

app.listen(process.env.PORT, ()=>{
    console.log("listening to port "+ process.env.PORT);
});

