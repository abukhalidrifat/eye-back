const express = require("express");
const router = express.Router();
const upload = require("../index");

// MIDDLEWARES
const is_auth = require("../middlewares/is_auth");
const is_admin_editor = require("../middlewares/is_admin_editor");

const projectsController = require("../controllers/projectController");

router.get(
  "/projects",
  is_auth,
  is_admin_editor,
  projectsController.getAdminProjects
);
router.post(
  "/projects",
  is_auth,
  is_admin_editor,
  upload.fields([{ name: "thumb", maxCount: 1 }, { name: "images" }]),
  projectsController.postProject
);
router.get("/project/:id", projectsController.getOneProject);
router.put(
  "/project/edit/:id",
  is_auth,
  is_admin_editor,
  upload.fields([{ name: "thumb" }, { name: "images" }]),
  projectsController.editProject
);
router.get(
  "/projects/getongoingprojects",
  projectsController.getAllOngoingProjects
);
router.get(
  "/projects/getupcommingprojects",
  projectsController.getAllUpcommingProjects
);
router.get("/projects/getdoneprojects", projectsController.getAllDoneProjects);
router.get("/projects/getrandomprojects", projectsController.getRandomProject);

// delete image
router.delete(
  "/project/delete/img/:id",
  is_auth,
  is_admin_editor,
  projectsController.deleteProjectImg
);

// delete event
router.delete(
  "/project/delete/:id",
  is_auth,
  is_admin_editor,
  projectsController.deleteProject
);

module.exports = router;
