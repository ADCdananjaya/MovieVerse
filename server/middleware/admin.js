module.exports = (req, res, next) => {
  const isAdmin = req.user.isAdmin;
  if (!isAdmin) res.status(403).send("Access denied!");
  next();
};
