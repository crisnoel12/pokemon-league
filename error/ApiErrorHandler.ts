import ApiError from "./ApiError";

function ApiErrorHandler(err, req, res, next) {
  console.error(err);
  if (err instanceof ApiError) {
    if (err.message) {
      res.status(err.status).json({ message: err.message });
      return;
    }
    if (err.errors) {
      res.status(err.status).json({ errors: err.errors });
      return;
    }
  }

  res.status(500).json('something went wrong');
}

export default ApiErrorHandler;