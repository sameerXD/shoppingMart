const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

app.use(cors({origin:['http://localhost:3000']}));
// reveal true ip even if using a proxy
app.set('trust proxy', true)

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/superAdmin", require("./routes/superAdmin"));
app.use("/anonymousUser", require("./routes/anonymousUser"));
app.use("/shopkeeper", require("./routes/shopkeeper"));
app.use("/user", require("./routes/user"));

app.listen(process.env.PORT, ()=>{
    console.log("listening to port "+ process.env.PORT);
});

