const handleServerError = (err, req, res, next) => {
  console.error("Error interno del servidor:", err);
  res.status(500).json({
    code: 500,
    message: "Internal Server Error",
  });
};

const handleNotFound = (req, res, next) => {
  res.status(404).json({
    code: 404,
    message: "Not Found",
  });
};

export default {
  handleServerError,
  handleNotFound,
};
