const express = require("express");
const router = express.Router();
const upload = require("../index");

// MIDDLEWARES
const is_auth = require("../middlewares/is_auth");
const is_admin_editor = require("../middlewares/is_admin_editor");

const headerController = require("../controllers/headerImageController");
// get
router.get(
  "/headerimages",
  is_auth,
  is_admin_editor,
  headerController.getAllImages
);
router.get("/projectheaderimages", headerController.getProjectImages);
router.get("/eventheaderimages", headerController.getEventImages);
router.get("/teamheaderimages", headerController.getTeamImages);
router.get("/noticeheaderimages", headerController.getNoticeImages);
router.get("/aboutheaderimages", headerController.getAboutImages);

// create
router.put(
  "/projectimage",
  is_auth,
  is_admin_editor,
  upload.single("project"),
  headerController.putProjectImage
);
router.put(
  "/eventimage",
  is_auth,
  is_admin_editor,
  upload.single("event"),
  headerController.putEventImage
);
router.put("/teamimage", upload.single("team"), headerController.putTeamImage);
router.put(
  "/noticeimage",
  is_auth,
  is_admin_editor,
  upload.single("notice"),
  headerController.putNoticeImage
);
router.put(
  "/aboutimage",
  is_auth,
  is_admin_editor,
  upload.single("about"),
  headerController.putAboutImage
);

module.exports = router;
