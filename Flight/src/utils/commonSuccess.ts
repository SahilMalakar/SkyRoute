export function successResponse(data: any, message = "Success") {
  return {
    success: true,
    data,
    message,
    error: null,
  };
}
