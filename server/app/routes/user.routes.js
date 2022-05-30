const { authJwt } = require("../middlewares");
const {verifySignUp} = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get("/api/test/superAdmin",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    controller.superAdminBoard
  );

  app.get("/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get("/api/getAllUsers",
    [authJwt.verifyToken, authJwt.isAdminOrSuperAdmin],
    controller.getAllUsers
  );

  app.post(
    "/api/users/create",
    [verifySignUp.checkDuplicateEmail, verifySignUp.checkRoleExists],
    controller.createUser
  );
  
  app.put(
    '/api/user/:id',
    [authJwt.verifyToken, authJwt.isAdminOrSuperAdmin],
    controller.updateUser
  );

  app.delete(
    '/api/user/:id', 
    [authJwt.verifyToken, authJwt.isAdminOrSuperAdmin],
    controller.deleteUser
  )
};