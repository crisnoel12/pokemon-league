class ApiError {
  status;
  message;
  errors;
  constructor(status: number, message?: string, errors?: any) {
    this.status = status;
    this.message = message;
    this.errors = errors;
  }

  static badRequest(msg?: string, errors?: any) {
    if (msg) {
      return new ApiError(400, msg);
    }
    if (errors) {
      return new ApiError(400, undefined, errors);
    }
  }

  static notFound(msg?: string, errors?: any) {
    if (msg) {
      return new ApiError(404, msg);
    }
    if (errors) {
      return new ApiError(404, undefined, errors);
    }
  }

  static internal(msg: string) {
    return new ApiError(500, msg);
  }
}

export default ApiError;