const router = require("express").Router();

const {
  getSingleThought,
  getThoughts,
  createThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtsController");

router.route("/").post(createThought).get(getThoughts);
router.route("/:thoughtId").get(getSingleThought).delete(deleteThought);
router.route("/:thoughtId/reactions").post(addReaction).delete(deleteReaction);
module.exports = router;
