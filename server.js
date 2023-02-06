require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
const cors = require("cors");

const { authenticate, isLogedIn} = require("./authentication");

require("./db");
require("./authentication");
app.use(cors());
app.use(express.json());

authenticate(app);

const routerUser = require("./routes/user");
const routerPost = require("./routes/post");
const routerAuth = require("./routes/auth");

app.use("/api/user",isLogedIn ,routerUser);
app.use("/api/post", isLogedIn, routerPost);
app.use("/api/auth", routerAuth)



app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
})