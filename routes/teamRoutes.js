const express = require("express");
const router = express.Router();
const upload = require("../index");

// MIDDLEWARE
const is_auth = require("../middlewares/is_auth");
const is_admin_editor = require("../middlewares/is_admin_editor");

const teamController = require("../controllers/teamController");

router.get("/team", is_auth, is_admin_editor, teamController.getAdminTeam);
router.get("/getteam", teamController.getAllMembers);
router.get("/team/:id", teamController.getOneMember);
router.post(
  "/team",
  is_auth,
  is_admin_editor,
  upload.single("thumb"),
  teamController.postTeam
);
router.put(
  "/team/edit/:id",
  is_auth,
  is_admin_editor,
  upload.single("thumb"),
  teamController.editTeam
);

// delete event
router.delete(
  "/team/delete/:id",
  is_auth,
  is_admin_editor,
  teamController.deleteTeam
);

module.exports = router;
