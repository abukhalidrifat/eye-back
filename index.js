const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const sequelize = require("./utils/db");
var slugify = require('slugify')
require('dotenv').config()

const app = express();

// headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS,GET,POST,PUT,PATCH,DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });


// multer disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + slugify(file.originalname,{
      remove: /[*+~()'"!:@]/g,
    }));
  },
});
const upload = multer({ storage: storage });
module.exports = upload;

app.use(cors());
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: false }));
app.use('/uploads',express.static(path.join(__dirname, "uploads")));

// MODELS
const eventsModel = require('./models/eventsModel');
const projectsModel = require('./models/projectModel');
const eventImagesModel = require('./models/eventImageModel');
const projectImagesModel = require('./models/projectImageModel');
const teamModel = require('./models/teamModel');
const sliderModel = require('./models/sliderModel');
const headerModel = require('./models/headerImageModel');
const noticeModel = require('./models/noticeModel');
const userModel = require('./models/userModel');

// Routers
const eventsRoutes = require("./routes/eventsRoute");
const projectRoutes = require("./routes/projectRoutes");
const teamRoutes = require("./routes/teamRoutes");
const sliderRoutes = require("./routes/slideRoutes");
const headerRoutes = require("./routes/headerImageRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(eventsRoutes);
app.use(projectRoutes);
app.use(teamRoutes);
app.use(sliderRoutes);
app.use(headerRoutes);
app.use(noticeRoutes);
app.use(authRoutes);

// error middleware
app.use((error, req, res, next) =>{
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
    res.status(status).json({
      message:message,
      data:data
    })
});

const port = process.env.PORT;

// relations
eventsModel.hasMany(eventImagesModel,{ onDelete: 'cascade', hooks:true });
projectsModel.hasMany(projectImagesModel,{ onDelete: 'cascade', hooks:true });

sequelize
  // .sync({force:true})
  .sync()
  .then((res) => {
    if (!port) {
      const error = new Error('No port found. Please deine a port.');
      error.statusCode = 400;
      throw error;
    }
    app.listen(port);
  })
  .catch((error) => {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
  });