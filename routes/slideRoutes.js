const express = require("express");
const router = express.Router();
const upload = require("../index");

// MIDDLEWARE
const is_auth = require("../middlewares/is_auth");
const is_admin_editor = require("../middlewares/is_admin_editor");

const sliderController = require("../controllers/sliderController");

router.get(
  "/slider",
  is_auth,
  is_admin_editor,
  sliderController.getAdminSlides
);
router.get("/getslides", sliderController.getAllSlides);
router.get("/slider/:id", sliderController.getOneSlide);
router.post(
  "/slider",
  is_auth,
  is_admin_editor,
  upload.single("thumb"),
  sliderController.postSlide
);
router.put(
  "/slider/edit/:id",
  is_auth,
  is_admin_editor,
  upload.single("thumb"),
  sliderController.editSlide
);

// delete event
router.delete(
  "/slider/delete/:id",
  is_auth,
  is_admin_editor,
  sliderController.deleteSlides
);

module.exports = router;
