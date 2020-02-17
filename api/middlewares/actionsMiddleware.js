const Act = require("../../data/helpers/actionModel.js");

function validateActionId(req, res, next) {
  const { id } = req.params;

  Act.get(id)
    .then(action => {
      // if action is not null
      if (action) {
        next();
      } else {
        res.status(404).json({ errorMessage: "Action does not exist" });
      }
    })
    .catch(err => {
      res.status(404).json({ errorMessage: "Invalid action Id" });
    });
}

module.exports = validateActionId;
