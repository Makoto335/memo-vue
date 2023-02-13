const errorHandler = (err) => {
  if (err.response) {
    console.error(err.response.data);
    console.error(err.message);
  } else {
    console.error(err.message);
  }
}
export default errorHandler
