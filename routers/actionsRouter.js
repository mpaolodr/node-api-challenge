const router = require("express").Router();

const Act = require("../data/helpers/actionModel.js");

// CUSTOM MIDDLEWARE
const validateActionId = require("../api/middlewares/actionsMiddleware.js");
const { validateAction } = require("../api/middlewares/projectsMiddleware.js");

router.get("/", (req, res) => {
  Act.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

router.get("/:id", validateActionId, (req, res) => {
  const { id } = req.params;

  Act.get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

router.delete("/:id", validateActionId, (req, res) => {
  const { id } = req.params;

  Act.get(id)
    .then(toBeDeleted => {
      Act.remove(id)
        .then(deleted => {
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

router.put("/:id", validateActionId, validateAction, (req, res) => {
  const { id } = req.params;
  const updatedAction = req.body;

  Act.update(id, updatedAction)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

module.exports = router;
