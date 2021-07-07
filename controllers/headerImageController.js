const HeaderImage = require("../models/headerImageModel");
const clearImage = require("../utils/clearImg");

// insert project image
exports.putProjectImage = (req, res, next) => {
  const image = req.file;

  HeaderImage.findOne({
    where: { id: 1 },
  })
    .then((img) => {
      if (!img) {
        HeaderImage.create({
          project: image.filename,
        })
          .then(() => {
            res.status(201).json({
              message: "Image added successfully!",
            });
          })
          .catch((error) => {
            res.status(400).json({
              message:
                "Sorry there was an error! Please try again after few moments.",
            });
          });
      } else {
        if (img.project) {
          clearImage(img.project);
        }
        img.project = image.filename;
        img.save();
        res.status(200).json({
          message: "New image added successfully!",
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        message:
          "Sorry there was an error! Please try again after few moments.",
      });
    });
};

// insert event image
exports.putEventImage = (req, res, next) => {
  const image = req.file;

  HeaderImage.findOne({
    where: { id: 1 },
  })
    .then((img) => {
      if (!img) {
        HeaderImage.create({
          event: image.filename,
        })
          .then(() => {
            res.status(201).json({
              message: "Image added successfully!",
            });
          })
          .catch((error) => {
            res.status(400).json({
              message:
                "Sorry there was an error! Please try again after few moments.",
            });
          });
      } else {
        if (img.event) {
          clearImage(img.event);
        }
        img.event = image.filename;
        img.save();
        res.status(200).json({
          message: "New image added successfully!",
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        message:
          "Sorry there was an error! Please try again after few moments.",
      });
    });
};

// insert team image
exports.putTeamImage = (req, res, next) => {
  const image = req.file;

  HeaderImage.findOne({
    where: { id: 1 },
  })
    .then((img) => {
      if (!img) {
        HeaderImage.create({
          team: image.filename,
        })
          .then(() => {
            res.status(201).json({
              message: "Image added successfully!",
            });
          })
          .catch((error) => {
            res.status(400).json({
              message:
                "Sorry there was an error! Please try again after few moments.",
            });
          });
      } else {
        if (img.team) {
          clearImage(img.team);
        }
        img.team = image.filename;
        img.save();
        res.status(200).json({
          message: "New image added successfully!",
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        message:
          "Sorry there was an error! Please try again after few moments.",
      });
    });
};

// insert notice image
exports.putNoticeImage = (req, res, next) => {
  const image = req.file;

  HeaderImage.findOne({
    where: { id: 1 },
  })
    .then((img) => {
      if (!img) {
        HeaderImage.create({
          notice: image.filename,
        })
          .then(() => {
            res.status(201).json({
              message: "Image added successfully!",
            });
          })
          .catch((error) => {
            res.status(400).json({
              message:
                "Sorry there was an error! Please try again after few moments.",
            });
          });
      } else {
        if (img.notice) {
          clearImage(img.notice);
        }
        img.notice = image.filename;
        img.save();
        res.status(200).json({
          message: "New image added successfully!",
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        message:
          "Sorry there was an error! Please try again after few moments.",
      });
    });
};

// insert about image
exports.putAboutImage = (req, res, next) => {
  const image = req.file;

  HeaderImage.findOne({
    where: { id: 1 },
  })
    .then((img) => {
      if (!img) {
        HeaderImage.create({
          about: image.filename,
        })
          .then(() => {
            res.status(201).json({
              message: "Image added successfully!",
            });
          })
          .catch((error) => {
            res.status(400).json({
              message:
                "Sorry there was an error! Please try again after few moments.",
            });
          });
      } else {
        if (img.about) {
          clearImage(img.about);
        }
        img.about = image.filename;
        img.save();
        res.status(200).json({
          message: "New image added successfully!",
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        message:
          "Sorry there was an error! Please try again after few moments.",
      });
    });
};

// get all images
exports.getAllImages = (req, res, next) => {
  HeaderImage.findAll()
    .then((img) => {
      res.status(200).json({
        images: img,
      });
    })
    .catch((error) => {
        res.status(400).json({
            message:
              "Sorry there was an error! Please try again after few moments.",
          });
    });
};

// get project images
exports.getProjectImages = (req, res, next) => {
  HeaderImage.findOne({where:{id: 1},attributes: ['id','project']})
    .then((img) => {
      res.status(200).json({
        image: img,
      });
    })
    .catch((error) => {
        res.status(400).json({
            message:
              "Sorry there was an error! Please try again after few moments.",
          });
    });
};

// get event images
exports.getEventImages = (req, res, next) => {
  HeaderImage.findOne({where:{id: 1},attributes: ['id','event']})
    .then((img) => {
      res.status(200).json({
        image: img,
      });
    })
    .catch((error) => {
        res.status(400).json({
            message:
              "Sorry there was an error! Please try again after few moments.",
          });
    });
};
// get team images
exports.getTeamImages = (req, res, next) => {
  HeaderImage.findOne({where:{id: 1},attributes: ['id','team']})
    .then((img) => {
      res.status(200).json({
        image: img,
      });
    })
    .catch((error) => {
        res.status(400).json({
            message:
              "Sorry there was an error! Please try again after few moments.",
          });
    });
};
// get notice images
exports.getNoticeImages = (req, res, next) => {
  HeaderImage.findOne({where:{id: 1},attributes: ['id','notice']})
    .then((img) => {
      res.status(200).json({
        image: img,
      });
    })
    .catch((error) => {
        res.status(400).json({
            message:
              "Sorry there was an error! Please try again after few moments.",
          });
    });
};
// get about images
exports.getAboutImages = (req, res, next) => {
  HeaderImage.findOne({where:{id: 1},attributes: ['id','about']})
    .then((img) => {
      res.status(200).json({
        image: img,
      });
    })
    .catch((error) => {
        res.status(400).json({
            message:
              "Sorry there was an error! Please try again after few moments.",
          });
    });
};
