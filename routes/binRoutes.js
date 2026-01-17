const express = require("express");
const router = express.Router();

const {
  addBin,
  getAllBins,
  updateBinFill
} = require("../controllers/binController");

const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, addBin);
router.get("/", verifyToken, getAllBins);
router.put("/:id", verifyToken, updateBinFill);

module.exports = router;
