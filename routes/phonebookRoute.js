const express = require("express");
const router = express.Router();

const {
  getAllPhoneBookRecord,
  createPhoneBookRecord,
  getRecordByPhoneNumber,
  updateDBRecord,
  removeRecordByNumber,
} = require("../controller/mainController");

//const {forgetPasswordValidator,loginValidator,forgetPasswordValidationActive}=require('../middleware/validator/signupValidator')

router.get("/phonebook-list", getAllPhoneBookRecord);
router.get("/phonebook/:number", getRecordByPhoneNumber);
router.post("/phonebook", createPhoneBookRecord);
router.put("/phonebook", updateDBRecord);
router.delete("/phonebook", removeRecordByNumber);

module.exports = router;
