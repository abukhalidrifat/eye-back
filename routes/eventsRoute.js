const express = require("express");
const router = express.Router();
const upload = require("../index");

// MIDDLEWARES
const is_auth = require("../middlewares/is_auth");
const is_admin_editor = require("../middlewares/is_admin_editor");

const eventsController = require("../controllers/eventsController");

router.get(
  "/events",
  is_auth,
  is_admin_editor,
  eventsController.getAdminEvents
);
router.get("/event/:id", eventsController.getOneEvent);
router.get("/events/gettime", eventsController.getTimeDate);
router.get("/events/getupcommingevent", eventsController.getAllUpcommingEvents);
router.get("/events/getdoneevent", eventsController.getAllDoneEvents);
router.post(
  "/events",
  is_auth,
  is_admin_editor,
  upload.fields([{ name: "thumb" }, { name: "images" }]),
  eventsController.postEvent
);
router.put(
  "/event/edit/:id",
  is_auth,
  is_admin_editor,
  upload.fields([{ name: "thumb" }, { name: "images" }]),
  eventsController.editEvent
);

// delete image
router.delete(
  "/event/delete/img/:eventimgid",
  is_auth,
  is_admin_editor,
  eventsController.deleteEventImg
);

// delete event
router.delete(
  "/event/delete/:id",
  is_auth,
  is_admin_editor,
  eventsController.deleteEvent
);

module.exports = router;
