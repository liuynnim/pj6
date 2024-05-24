const express = require("express");
const session = require("express-session");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const AdminRouter = require("./routes/AdminRouter");
const CommentRouter = require("./routes/CommentRouter")
const path = require('path');

dbConnect();

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(
  session({
    secret: "Minh",
    resave: false,
    saveUninitialized: false,
    cookie: {
    httpOnly: true,
    },
  })
);

app.use("/admin", AdminRouter);
app.use((req, res, next) => {
  console.log(req.session.user);
  if (req.path !== '/admin/login' && req.path !== '/admin/logout' && !req.session.user) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  next();
});

app.use("/users", UserRouter);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/photos", PhotoRouter);
app.use("/photos/:userId/commentsOfPhoto", CommentRouter);

app.get("/", (request, response) => {
  response.send({ message: "Hello from photo-sharing app API!" });
});
app.listen(8080, () => {
  console.log("server listening on port 8080");
});
