const router = require("express").Router();

const {
  getSingleThought,
  getThoughts,
  createThought,
  deleteThought,
  addReaction,
  deleteReaction,
  updateThought,
} = require("../../controllers/thoughtsController");

router.route("/").post(createThought).get(getThoughts);
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought);
router.route("/:thoughtId/reactions").post(addReaction).delete(deleteReaction);
module.exports = router;
