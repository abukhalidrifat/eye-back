const express = require("express");
const router = express.Router();
const upload = require("../index");

// MIDDLEWARES
const is_auth = require("../middlewares/is_auth");
const is_admin_editor = require("../middlewares/is_admin_editor");

const noticeController = require("../controllers/noticeController");

router.get("/notices", noticeController.getAllNotice);
router.get("/notice/:id", noticeController.getOneNotice);
router.post("/notice", is_auth, is_admin_editor, noticeController.postNotice);
router.put(
  "/notice/edit/:id",
  is_auth,
  is_admin_editor,
  noticeController.editNotice
);

// delete event
router.delete(
  "/notice/delete/:id",
  is_auth,
  is_admin_editor,
  noticeController.deleteNotices
);

module.exports = router;
