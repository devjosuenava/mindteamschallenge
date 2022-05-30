const { authJwt } = require("../middlewares");
const {verifySignUp} = require("../middlewares");
const controller = require("../controllers/account.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/getAllAccounts",
    [authJwt.verifyToken, authJwt.isAdminOrSuperAdmin],
    controller.getAllAccounts
  );

  app.post(
    "/api/accounts/create",
    [verifySignUp.checkDuplicateEmail, verifySignUp.checkRoleExists],
    controller.createAccount
  );

  app.put(
    '/api/account/:id',
    [authJwt.verifyToken, authJwt.isAdminOrSuperAdmin],
    controller.updateAccount
  );

  app.delete(
    '/api/account/:id',
    [authJwt.verifyToken, authJwt.isAdminOrSuperAdmin],
    controller.deleteAccount
  )
};