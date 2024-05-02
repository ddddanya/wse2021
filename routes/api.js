const express = require('express');
const router = express.Router();

// controllers
const authController = require("../controllers/authController");
const staffController = require("../controllers/staffController");
const pointsController = require("../controllers/pointsController");
const groupsController = require("../controllers/groupsController");

// validators
const {loginValidator} = require("../validators/loginValidator");
const {createStaffValidator} = require("../validators/createStaffValidator");
const {createPointValidator} = require("../validators/createPointValidator");
const {createGroupValidator} = require("../validators/createGroupValidator");
const {addPointsValidator} = require("../validators/addPointsValidator");
const {addStaffValidator} = require("../validators/addStaffValidator");

/* POST /api/login */
router.post('/login', loginValidator, authController.login);

/* GET /api/staff */
router.get('/staff', staffController.getStaff);

/* POST /api/staff */
router.post('/staff', createStaffValidator, staffController.createStaff);

/* POST /api/points */
router.post('/points', createPointValidator, pointsController.createControlPoint);

/* GET /api/points */
router.get('/points', pointsController.getPoints);

/* GET /api/groups */
router.get('/groups', groupsController.getGroups);

/* POST /api/groups */
router.post('/groups', createGroupValidator, groupsController.createGroup);

/* POST /api/groups/:id/points */
router.post('/groups/:id/points', addPointsValidator, groupsController.addPoints);

/* POST /api/groups/:id/staff */
router.post('/groups/:id/staff', addStaffValidator, groupsController.addStaff);

module.exports = router;
