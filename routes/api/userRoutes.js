const router = require("express").Router();

const {
  createUser,
  getUsers,
  getSingleUser,
  addFriend,
  deleteFriend,
  deleteUser,
  updateUser,
} = require("../../controllers/userController");

router.route("/").post(createUser);
router.route("/").get(getUsers);
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);
router.route("/:userId/friends").post(addFriend).delete(deleteFriend);

module.exports = router;
