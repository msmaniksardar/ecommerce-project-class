export const successResponse = (
  res,
  { statusCode = 200, message = "EVERYTHING IS OKAY MAN", payload = {} }
) => {
  res.status(statusCode).json({
    status: "success",
    message: message,
    payload,
  });
};

export const errorResponse = (
  res,
  { statusCode = 500, message = "INTERNAL SERVER ERROR" }
) => {
  res.status(statusCode).json({
    status: "fail",
    message: message,
  });
};
