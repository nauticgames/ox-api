const master_key = process.env.MASTER_KEY;

exports.AuthenticatedReq = function (req, res, next) {
  if (!req.headers.master_key || req.headers.master_key !== master_key) {
    return res.status(401).json({
      code: 401,
      message: "Unauthorized request, please provide a valid master key",
    });
  } else {
    next();
  }
};
