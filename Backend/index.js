const express = require("express");
const router = require("./Routes/routes");
const cors =require("cors")
const app = express();
const port = 3000;

require("./connection");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded ({extended:false}));
app.use("/solar",router)


app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`);
})