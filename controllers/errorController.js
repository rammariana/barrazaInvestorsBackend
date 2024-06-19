const error404 = (req, res, next) => {
  res.status(404).json({
    code: 404,
    message: "Not found",
  });
};
export default error404;
