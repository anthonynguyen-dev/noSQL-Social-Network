const router = require("express").Router();

const {
  getSingleThought,
  getThoughts,
  createThought,
} = require("../../controllers/thoughtsController");

router.route("/").post(createThought);
router.route("/").get(getThoughts);
router.route("/:thoughtId").get(getSingleThought);
module.exports = router;
