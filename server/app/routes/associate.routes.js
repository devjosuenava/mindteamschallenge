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

  app.get("/api/getAvailableAssociates",
    [authJwt.verifyToken, authJwt.isAdminOrSuperAdmin],
    controller.getAvailableAssociates
  );

  app.post(
    "/api/accounts/create",
    [authJwt.verifyToken, authJwt.isAdminOrSuperAdmin],
    controller.createAssociate
  );

//   app.put(
//     '/api/account/:id',
//     [authJwt.verifyToken, authJwt.isAdminOrSuperAdmin],
//     controller.updateAccount
//   );

//   app.delete(
//     '/api/account/:id',
//     [authJwt.verifyToken, authJwt.isAdminOrSuperAdmin],
//     controller.deleteAccount
//   )
};