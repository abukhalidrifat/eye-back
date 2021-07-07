const Slider = require("../models/sliderModel");
const clearImage = require("../utils/clearImg");

// create new slides

exports.postSlide = (req, res, next) => {
  const heading = req.body.heading;
  const description = req.body.description;
  const thumbnail = req.file;

  Slider.create({
    heading: heading,
    description: description,
    thumbnail: thumbnail ? thumbnail.filename : null,
  })
    .then((slide) => {
      res.status(201).json({
        message: "Slide added successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        message:
          "Sorry there was an error! Please try again after few moments.",
      });
    });
};

// get all members for admin
exports.getAdminSlides = (req, res, next) => {
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = 16;
    // const sizeAsNumber = Number.parseInt(req.query.size);
  
    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }
  
    let size = 16;
    if (
      !Number.isNaN(sizeAsNumber) &&
      !(sizeAsNumber > 16) &&
      !(sizeAsNumber < 1)
    ) {
      size = sizeAsNumber;
    }
  
    Slider.findAndCountAll({
      limit: size,
      offset: page * size,
      order: [["id", "DESC"]],
    })
      .then((event) => {
        res.status(200).json({
          totalPages: Math.ceil(event.count / Number.parseInt(size)),
          contents: event.rows,
        });
      })
      .catch((error) => {
        res.status(400).json({
          message:
            "Sorry there was an error! Please try again after few moments.",
        });
      });
  };

// get all slides

exports.getAllSlides = (req, res, next) => {
    Slider.findAll()
      .then((event) => {
        res.status(200).json({
          contents: event,
        });
      })
      .catch((error) => {
        res.status(400).json({
          message:
            "Sorry there was an error! Please try again after few moments.",
        });
      });
  };
  
  // get a single project for editing nad reading
  exports.getOneSlide = (req, res, next) => {
    const id = req.params.id;
  
    Slider.findOne({
      where: {
        id: id,
      },
    })
      .then((slide) => {
        if (!slide) {
          const error = new Error("No Project found!");
          error.status = 400;
          throw error;
        }
        res.status(200).json({
          slide: slide
        });     
      })
      .catch((error) => {
        res.status(400).json({
          message:
            "Sorry there was an error! Please try again after few moments.",
        });
      });
  };
  
  // editing slide
  
  exports.editSlide= (req, res, next) => {
    const id = req.params.id;
    const heading = req.body.heading;
    const description = req.body.description;
    const thumb = req.file;
  
    Slider.findOne({ where: { id: id } })
      .then((slide) => {
       slide.heading = heading;
       slide.description = description;
  
        if (thumb) {
          if (slide.thumbnail) {
            clearImage(slide.thumbnail);
          }
          slide.thumbnail = thumb.filename;
        }
        slide.save();
      })
      .then(() => {
        res.status(200).json({
          message: "Slide updated successfully!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          message:
            "Sorry there was an error! Please try again after few moments.",
        });
      });
  };
  
  // delete project
  
  exports.deleteSlides = (req, res, next) => {
    const id = req.params.id;
  
        Slider.findOne({ where: { id: id } })
          .then((slide) => {
            if (!slide) {
              const error = new Error("File not Found");
              error.status = 404;
              throw error;
            }
            if (slide.dataValues.thumbnail) {
              clearImage(slide.dataValues.thumbnail);
            }
            return slide.destroy();
          })
          .then(() => {
            res.status(200).json({
              message: "Slide Deleted Successfull",
            });
          })
          .catch((error) => {
            res.status(400).json({
              message: "Sorry there was an error. Please try again!",
            });
          });
     
  };
  