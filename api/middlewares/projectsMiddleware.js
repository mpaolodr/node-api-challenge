// IMPORTS
const Proj = require("../../data/helpers/projectModel.js");
const Act = require("../../data/helpers/actionModel.js");

function validateProject(req, res, next) {
  const projData = req.body;

  if (projData.name && projData.description) {
    next();
  } else {
    res.status(400).json({ errorMessage: "Required Field Missing" });
  }
}

function validateProjectId(req, res, next) {
  const { id } = req.params;

  Proj.get(id)
    .then(success => {
      next();
    })
    .catch(err => {
      res.status(404).json({ errorMessage: "Invalid Id" });
    });
}

function validateAction(req, res, next) {
  const actData = req.body;

  if (actData.description && actData.notes && actData.completed) {
    next();
  } else {
    res.status(400).json({ errorMessage: "Required Field Missing" });
  }
}

module.exports = {
  validateProject,
  validateProjectId,
  validateAction
};
