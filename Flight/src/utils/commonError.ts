export function errorResponse(
  message = "Something went wrong",
  error: any = null,
) {
  return {
    success: false,
    data: null,
    message,
    error,
  };
}
