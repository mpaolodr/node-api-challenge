const router = require("express").Router();

const Proj = require("../data/helpers/projectModel.js");
const Act = require("../data/helpers/actionModel.js");

// custom middlewares
const {
  validateProject,
  validateProjectId,
  validateAction
} = require("../api/middlewares/projectsMiddleware.js");

router.get("/", (req, res) => {
  Proj.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;

  Proj.get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  const { id } = req.params;

  Proj.getProjectActions(id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

module.exports = router;
