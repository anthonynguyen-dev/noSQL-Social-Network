const { ObjectId } = require("mongoose").Types;
const { User, Thoughts } = require("../models");

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("thoughts")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    ).then((user) =>
      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : res.json(user)
    );
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId }).then((user) =>
      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : res.json({ message: "User has been deleted!" })
    );
  },
  addFriend(req, res) {
    // Check if friend Id exist first to add
    User.findOne({ _id: req.body.userId }).then((friendData) => {
      console.log(friendData);
      if (!friendData) {
        return res.status(400).json({ message: "User not found" });
      }
    });
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body.userId } },
      { new: true }
    )
      .then((userFriendData) => {
        if (!userFriendData) {
          return res.status(400).json({ message: "User not found" });
        }
        res.json(userFriendData);
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.body.userId } },
      { new: true }
    )
      .then((userFriendData) => {
        if (!userFriendData) {
          return res.status(400).json({ message: "User not found" });
        }
        res.json(userFriendData);
      })
      .catch((err) => res.status(500).json(err));
  },
};
