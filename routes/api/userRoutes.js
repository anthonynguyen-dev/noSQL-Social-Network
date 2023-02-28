const router = require("express").Router();

const {
  createUser,
  getUsers,
  getSingleUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

router.route("/").post(createUser);
router.route("/").get(getUsers);
router
  .route("/:userId")
  .get(getSingleUser)
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;
