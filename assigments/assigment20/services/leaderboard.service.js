const User = require("../models/user.model");

async function getLeaderboard() {
  const users = await User.find()
    .select("name score")
    .sort({
      score: -1,
      createdAt: 1,
    })
    .lean();

  return users.map((user, index) => ({
    rank: index + 1,
    userId: user._id,
    name: user.name,
    score: user.score,
  }));
}

module.exports = getLeaderboard;
