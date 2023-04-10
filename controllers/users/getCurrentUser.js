const getCurrentUser = (req, res) => {
  const { _id: id, name, email } = req.user;

  res.json({
    user: {
      id,
      name,
      email,
    },
  });
};

module.exports = getCurrentUser;
