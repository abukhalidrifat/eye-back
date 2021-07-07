const Project = require("../models/projectModel");
const ProjectImage = require("../models/projectImageModel");
const clearImage = require("../utils/clearImg");
const { Sequelize } = require("sequelize");

exports.postProject = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const status = req.body.status;
  const day = req.body.day;
  const month = req.body.month;
  const year = req.body.year;
  const thumbnail = req.files["thumb"];
  const files = req.files["images"];

  Project.create({
    title: title,
    thumbnail: thumbnail ? thumbnail[0].filename : null,
    description: description,
    status: status,
    day: day,
    month: month,
    year: year,
  })
    .then((project) => {
      if (files) {
        return files.forEach((file) => {
          project.createProjectImage({
            file: file.filename,
          });
        });
      } else {
        next();
      }
    })
    .then(() => {
      res.status(201).json({
        message: "Project created successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        message:
          "Sorry there was an error! Please try again after few moments.",
      });
    });
};

// get all projects for admin
exports.getAdminProjects = (req, res, next) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = 15;
  // const sizeAsNumber = Number.parseInt(req.query.size);

  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 15;
  if (
    !Number.isNaN(sizeAsNumber) &&
    !(sizeAsNumber > 15) &&
    !(sizeAsNumber < 1)
  ) {
    size = sizeAsNumber;
  }

  Project.findAndCountAll({
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

// get a single project for editing nad reading
exports.getOneProject = (req, res, next) => {
  const projectId = req.params.id;
  let gotEvent;

  Project.findOne({
    where: {
      id: projectId,
    },
  })
    .then((project) => {
      if (!project) {
        const error = new Error("No Project found!");
        error.status = 400;
        throw error;
      }
      gotEvent = project;
      return project.getProjectImages({ attributes: ["file", "id"] });
    })
    .then((result) => {
      res.status(200).json({
        images: result,
        gotEvent,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message:
          "Sorry there was an error! Please try again after few moments.",
      });
    });
};

// editing project

exports.editProject = (req, res, next) => {
  const projectId = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const status = req.body.status;
  const day = req.body.day;
  const month = req.body.month;
  const year = req.body.year;
  const thumb = req.files["thumb"];
  const files = req.files["images"];

  Project.findOne({ where: { id: projectId } })
    .then((project) => {
      project.title = title;

      if (thumb) {
        if (project.thumbnail) {
          clearImage(project.thumbnail);
        }
        project.thumbnail = thumb[0].filename;
      }
      project.description = description;
      project.status = status;
      project.day = day;
      project.month = month;
      project.year = year;
      project.save();
      if (files) {
        return files.forEach((file) => {
          project.createProjectImage({
            file: file.filename,
          });
        });
      } else {
        next();
      }
    })
    .then(() => {
      res.status(200).json({
        message: "Event updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        message:
          "Sorry there was an error! Please try again after few moments.",
      });
    });
};

// delete image

exports.deleteProjectImg = (req, res, next) => {
  const imgId = req.params.id;

  ProjectImage.findOne({ where: { id: imgId } })
    .then((img) => {
      if (!img) {
        const error = new Error("File not Found");
        error.status = 404;
        throw error;
      }
      clearImage(img.dataValues.file);
      return img.destroy();
    })
    .then(() => {
      res.status(200).json({
        message: "Image Delete Successfull",
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Sorry there was an error. Please try again!",
      });
    });
};

// delete project

exports.deleteProject = (req, res, next) => {
  const projectId = req.params.id;

  ProjectImage.findAll({ where: { projectId: projectId } })
    .then((images) => {
      if (images.length > 0) {
        images.forEach((img) => {
          clearImage(img.dataValues.file);
        });
      }
      // delete project
      Project.findOne({ where: { id: projectId } })
        .then((project) => {
          if (!project) {
            const error = new Error("File not Found");
            error.status = 404;
            throw error;
          }
          if (project.dataValues.thumbnail) {
            clearImage(project.dataValues.thumbnail);
          }
          return project.destroy();
        })
        .then(() => {
          res.status(200).json({
            message: "Project Deleted Successfull",
          });
        })
        .catch((error) => {
          res.status(400).json({
            message: "Sorry there was an error. Please try again!",
          });
        });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Sorry there was an error. Please try again!",
      });
    });
};

// get all ongoing events

exports.getAllOngoingProjects = (req, res, next) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = 12;

  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 12;
  if (
    !Number.isNaN(sizeAsNumber) &&
    !(sizeAsNumber > 12) &&
    !(sizeAsNumber < 1)
  ) {
    size = sizeAsNumber;
  }

  Project.findAndCountAll({
    where: { status: "ongoing" },
    attributes: ["id", "thumbnail", "title", "description"],
  })
    .then((event) => {
      res.status(200).json({
        totalPages: Math.ceil(event.count / Number.parseInt(size)),
        projects: event.rows,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message:
          "Sorry there was an error! Please try again after few moments.",
      });
    });
};

// get all upcomming events

exports.getAllUpcommingProjects = (req, res, next) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = 12;

  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 12;
  if (
    !Number.isNaN(sizeAsNumber) &&
    !(sizeAsNumber > 12) &&
    !(sizeAsNumber < 1)
  ) {
    size = sizeAsNumber;
  }

  Project.findAndCountAll({
    where: { status: "upcomming" },
    attributes: ["id", "thumbnail", "title", "description"],
  })
    .then((event) => {
      res.status(200).json({
        totalPages: Math.ceil(event.count / Number.parseInt(size)),
        projects: event.rows,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message:
          "Sorry there was an error! Please try again after few moments.",
      });
    });
};
// get all done events

exports.getAllDoneProjects = (req, res, next) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = 12;

  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 12;
  if (
    !Number.isNaN(sizeAsNumber) &&
    !(sizeAsNumber > 12) &&
    !(sizeAsNumber < 1)
  ) {
    size = sizeAsNumber;
  }

  Project.findAndCountAll({
    where: { status: "done" },
    attributes: ["id", "thumbnail", "title", "description"],
  })
    .then((event) => {
      res.status(200).json({
        totalPages: Math.ceil(event.count / Number.parseInt(size)),
        projects: event.rows,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message:
          "Sorry there was an error! Please try again after few moments.",
      });
    });
};

// get three random projects

exports.getRandomProject = (req, res, next) => {
  const projectId = req.params.id;

  Project.findAll({
    order: Sequelize.literal("rand()"),
    limit: 3,
    attributes:['id','title','description','thumbnail']
  })
    .then((project) => {
      if (!project) {
        const error = new Error("No Project found!");
        error.status = 400;
        throw error;
      }
      res.status(200).json({
       projects: project
      });
    })
    .catch((error) => {
      res.status(400).json({
        message:
          "Sorry there was an error! Please try again after few moments.",
      });
    });
};
