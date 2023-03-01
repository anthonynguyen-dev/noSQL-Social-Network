const { Thought, User } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    ).then((thought) =>
      !thought
        ? res.status(404).json({ message: "No thought with that ID" })
        : res.json(thought)
    );
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId }).then((thought) =>
      !thought
        ? res.status(404).json({ message: "No thought with that ID" })
        : res.json({ message: "Thought has been deleted!" })
    );
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((userThoughtData) => {
        if (!userThoughtData) {
          return res.status(400).json({ message: "Thought not found" });
        }
        res.json(userThoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.body.reactionId } } },
      { new: true }
    )
      .then((userThoughtData) => {
        if (!userThoughtData) {
          return res.status(400).json({ message: "Thought not found" });
        }
        res.json(userThoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },
};
