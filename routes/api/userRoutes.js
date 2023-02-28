const router = require("express").Router();

const {
  createUser,
  getUsers,
  getSingleUser,
} = require("../../controllers/userController");

router.route("/").post(createUser);
router.route("/").get(getUsers);
router.route("/:userId").get(getSingleUser);

module.exports = router;
