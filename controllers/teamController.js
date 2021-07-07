const Team = require("../models/teamModel");
const clearImage = require("../utils/clearImg");

// create new member

exports.postTeam = (req, res, next) => {
  const name = req.body.name;
  const post = req.body.post;
  const facebook = req.body.facebook;
  const instagram = req.body.instagram;
  const twitter = req.body.twitter;
  const linkedin = req.body.linkedin;
  const thumbnail = req.file;

  Team.create({
    name: name,
    post: post,
    facebook: facebook,
    instagram: instagram,
    twitter: twitter,
    linkedin: linkedin,
    thumbnail: thumbnail ? thumbnail.filename : null,
  })
    .then((member) => {
      res.status(201).json({
        message: "Member added successfully!",
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
exports.getAdminTeam = (req, res, next) => {
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

  Team.findAndCountAll({
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
exports.getOneMember = (req, res, next) => {
  const id = req.params.id;

  Team.findOne({
    where: {
      id: id,
    },
  })
    .then((member) => {
      if (!member) {
        const error = new Error("No Project found!");
        error.status = 400;
        throw error;
      }
      res.status(200).json({
        member: member
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

exports.editTeam = (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const post = req.body.post;
  const facebook = req.body.facebook;
  const instagram = req.body.instagram;
  const twitter = req.body.twitter;
  const linkedin = req.body.linkedin;
  const thumb = req.file;

  Team.findOne({ where: { id: id } })
    .then((member) => {
     member.name = name;

      if (thumb) {
        if (member.thumbnail) {
          clearImage(member.thumbnail);
        }
        member.thumbnail = thumb.filename;
      }
      member.post = post;
      member.facebook =facebook;
      member.instagram =instagram;
      member.twitter =twitter;
      member.linkedin =linkedin;
      member.save();
    })
    .then(() => {
      res.status(200).json({
        message: "Member updated successfully!",
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

exports.deleteTeam = (req, res, next) => {
  const id = req.params.id;

 
      Team.findOne({ where: { id: id } })
        .then((member) => {
          if (!member) {
            const error = new Error("File not Found");
            error.status = 404;
            throw error;
          }
          if (member.dataValues.thumbnail) {
            clearImage(member.dataValues.thumbnail);
          }
          return member.destroy();
        })
        .then(() => {
          res.status(200).json({
            message: "Member Deleted Successfull",
          });
        })
        .catch((error) => {
          res.status(400).json({
            message: "Sorry there was an error. Please try again!",
          });
        });
   
};

// get all members for admin
exports.getAllMembers = (req, res, next) => {
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
  
    Team.findAndCountAll({
      limit: size,
      offset: page * size,
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