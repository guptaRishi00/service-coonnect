const express = require("express");
const router = express.Router();

const aiController = require("../controllers/ai.controller");

router.post("/getresult", aiController.getResults);

module.exports = router;
