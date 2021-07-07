const Notice = require('../models/noticeModel');

exports.postNotice = (req, res, next) =>{
    const notice = req.body.notice;
    
    Notice.create({
        notice: notice
    }).then(() => {
        res.status(201).json({
          message: "Notice added successfully!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          message:
            "Sorry there was an error! Please try again after few moments.",
        });
      });
}

// get notices
exports.getAllNotice = (req, res, next) =>{
    const notice = req.body.notice;
    
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
  
    Notice.findAndCountAll({
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
}

 // get a single project for editing nad reading
 exports.getOneNotice = (req, res, next) => {
    const id = req.params.id;
  
    Notice.findOne({
      where: {
        id: id,
      },
    })
      .then((notice) => {
        if (!notice) {
          const error = new Error("No Project found!");
          error.status = 400;
          throw error;
        }
        res.status(200).json({
          notice: notice
        });     
      })
      .catch((error) => {
        res.status(400).json({
          message:
            "Sorry there was an error! Please try again after few moments.",
        });
      });
  };
  
  // editing 
  
  exports.editNotice= (req, res, next) => {
    const id = req.params.id;
    const desc = req.body.notice;
  
    Notice.findOne({ where: { id: id } })
      .then((data) => {
       data.notice = desc;
        data.save();
      })
      .then(() => {
        res.status(200).json({
          message: "Notice updated successfully!",
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
  
  exports.deleteNotices = (req, res, next) => {
    const id = req.params.id;
  
        Notice.findOne({ where: { id: id } })
          .then((notice) => {
            if (!notice) {
              const error = new Error("File not Found");
              error.status = 404;
              throw error;
            }
            return notice.destroy();
          })
          .then(() => {
            res.status(200).json({
              message: "Notice Deleted Successfull",
            });
          })
          .catch((error) => {
            res.status(400).json({
              message: "Sorry there was an error. Please try again!",
            });
          });
     
  };
  