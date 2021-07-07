const Event = require("../models/eventsModel");
const EventImage = require("../models/eventImageModel");
const clearImage = require("../utils/clearImg");

exports.postEvent = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const venue = req.body.venue;
  const status = req.body.status;
  const hour = req.body.hour;
  const minute = req.body.minute;
  const day = req.body.day;
  const month = req.body.month;
  const year = req.body.year;
  const thumbnail = req.files["thumb"];
  const files = req.files["images"];

  Event.create({
    title: title,
    thumbnail: thumbnail ? thumbnail[0].filename : null,
    description: description,
    venue: venue,
    status: status,
    hour: hour,
    minute: minute,
    day: day,
    month: month,
    year: year,
  })
    .then((event) => {
      if (files) {
        return files.forEach((file) => {
          event.createEventImage({
            file: file.filename,
          });
        });
      } else {
        next();
      }
    })
    .then(() => {
      res.status(201).json({
        message: "Event created successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        message:
          "Sorry there was an error! Please try again after few moments.",
      });
    });
};

// get all events for admin
exports.getAdminEvents = (req, res, next) => {
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

  Event.findAndCountAll({
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

// get all events
exports.getAllUpcommingEvents = (req, res, next) => {
  Event.findAll({
    where: { status: "upcomming" },
  })
    .then((event) => {
      res.status(200).json({
        event: event,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message:
          "Sorry there was an error! Please try again after few moments.",
      });
    });
};

exports.getAllDoneEvents = (req, res, next) => {
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

  Event.findAndCountAll({
    where: { status: "done" },
  })
    .then((event) => {
      res.status(200).json({
        totalPages: Math.ceil(event.count / Number.parseInt(size)),
        event: event.rows,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message:
          "Sorry there was an error! Please try again after few moments.",
      });
    });
};

// get a single event for editing nad reading
exports.getOneEvent = (req, res, next) => {
  const eventId = req.params.id;
  let gotEvent;

  Event.findOne({
    where: {
      id: eventId,
    },
  })
    .then((event) => {
      if (!event) {
        const error = new Error("No Events found!");
        error.status = 403;
        throw error;
      }
      gotEvent = event;
      return event.getEventImages({ attributes: ["file", "id"] });
      // console.log(event);
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

// editing event
exports.editEvent = (req, res, next) => {
  const eventId = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const venue = req.body.venue;
  const status = req.body.status;
  const hour = req.body.hour;
  const minute = req.body.minute;
  const day = req.body.day;
  const month = req.body.month;
  const year = req.body.year;
  const thumb = req.files["thumb"];
  const files = req.files["images"];

  Event.findOne({ where: { id: eventId } })
    .then((event) => {
      event.title = title;

      if (thumb) {
        if (event.thumbnail) {
          clearImage(event.thumbnail);
        }
        event.thumbnail = thumb[0].filename;
      }
      event.description = description;
      event.venue = venue;
      event.status = status;
      event.hour = hour;
      event.minute = minute;
      event.day = day;
      event.month = month;
      event.year = year;
      event.save();
      if (files) {
        return files.forEach((file) => {
          event.createEventImage({
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
exports.deleteEventImg = (req, res, next) => {
  const imgId = req.params.eventimgid;

  EventImage.findOne({ where: { id: imgId } })
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

// delete event
exports.deleteEvent = (req, res, next) => {
  const eventId = req.params.id;

  EventImage.findAll({ where: { eventId: eventId } })
    .then((images) => {
      if (images.length > 0) {
        images.forEach((img) => {
          clearImage(img.dataValues.file);
        });
      }
      // delete event
      Event.findOne({ where: { id: eventId } })
        .then((event) => {
          if (!event) {
            const error = new Error("File not Found");
            error.status = 404;
            throw error;
          }
          if (event.dataValues.thumbnail) {
            clearImage(event.dataValues.thumbnail);
          }
          return event.destroy();
        })
        .then(() => {
          res.status(200).json({
            message: "Event Deleted Successfull",
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

// event
exports.getTimeDate = (req, res, next) => {
  Event.findAll({
    where: { status: "upcomming" },
    attributes: ["venue", "hour", "minute", "day", "month", "year"],
    limit: 1,
  })
    .then((event) => {
      res.status(200).json({
        event: event,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Sorry there was an error. Please try again!",
      });
    });
};
