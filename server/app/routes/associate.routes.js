const { authJwt } = require("../middlewares");
const {verifySignUp} = require("../middlewares");
const controller = require("../controllers/associate.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/getAllAssociates",
    [authJwt.verifyToken, authJwt.isAdminOrSuperAdmin],
    controller.getAllAssociates
  );

  app.post("/api/getAccountAssociates",
    [authJwt.verifyToken, authJwt.isAdminOrSuperAdmin],
    controller.getAccountAssociates
  );

  app.get("/api/getAvailableUsers",
    [authJwt.verifyToken, authJwt.isAdminOrSuperAdmin],
    controller.getAvailableUsers
  );

  app.post(
    "/api/associates/create",
    [authJwt.verifyToken, authJwt.isAdminOrSuperAdmin],
    controller.createAssociate
  );

  app.delete(
    '/api/associate/:id',
    [authJwt.verifyToken, authJwt.isAdminOrSuperAdmin],
    controller.deleteAssociate
  )
};