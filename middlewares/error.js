function handleErrors(error, req, res, next) {
  console.log(error);

  if (error.code === 404) {
    res.status(404).render("./error/404");
    return;
  }

  res.status(500).render("./error/500");
}

module.exports = handleErrors;
