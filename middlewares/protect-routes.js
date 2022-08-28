function protectRoutes(req, res, next) {
  if (!res.locals.isAuth) {
    res.redirect("/401");
    return;
  }

  if (req.path.startsWith("/admin") && !res.locals.isAdmin) {
    res.redirect("403");
    return;
  }

  next();
}

module.exports = protectRoutes;
