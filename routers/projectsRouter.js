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

router.post("/", validateProject, (req, res) => {
  const projData = req.body;

  Proj.insert(projData)
    .then(newProject => {
      res.status(201).json(newProject);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

router.post("/:id/actions", validateProjectId, validateAction, (req, res) => {
  const project_id = req.params.id;
  const actData = { ...req.body, project_id };

  Act.insert(actData)
    .then(newAction => {
      res.status(201).json(newAction);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;

  Proj.get(id)
    .then(toBeDeleted => {
      Proj.remove(toBeDeleted.id)
        .then(success => {
          res.status(200).json(toBeDeleted);
        })
        .catch(err => {
          res.status(500).json({ errorMessage: err.message });
        });
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

router.put("/:id", validateProjectId, validateProject, (req, res) => {
  const { id } = req.params;
  const updatedProj = req.body;

  Proj.update(id, updatedProj)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

module.exports = router;
