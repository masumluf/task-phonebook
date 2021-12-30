const Phonebook = require("../models/phonebook");

exports.getAllPhoneBookRecord = async (_, res) => {
  try {
    const phonebookList = await Phonebook.find();
    return res.send(phonebookList);
  } catch (error) {
    console.log(error);
    return res.send(503).send(false);
  }
};

exports.createPhoneBookRecord = async (req, res) => {
  let { name, number } = req.body;

  if (!name || !number) {
    return res.status(403).send("Name and PhoneNumber Required");
  }

  if (!checkPhoneNumberPattern(number)) {
    return res
      .status(403)
      .send("Wrong Number Pattern, Only Bangladeshi Number Allowed");
  }
  try {
    if (await checkDuplicateNumber(number)) {
      return res.status(401).send("Number Already Exist");
    }
    const addRecordToDB = new Phonebook({
      name,
      phoneNumber: number,
    });
    await addRecordToDB.save();
    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.send(503).send(false);
  }
};

exports.getRecordByPhoneNumber = async (req, res) => {
  let { number } = req.params;
  try {
    const resultFromDB = await Phonebook.findOne({ phoneNumber: number });
    return res.status(202).send(resultFromDB);
  } catch (error) {
    console.log(error);
    return res.status(503).send(false);
  }
};

exports.updateDBRecord = async (req, res) => {
  let { id, number } = req.body;

  if (!number) {
    return res.status(401).send("Number Required");
  }

  if (!checkPhoneNumberPattern(number)) {
    return res
      .status(403)
      .send("Wrong Number Pattern, Only Bangladeshi Number Allowed");
  }

  try {
    let updatedRecord = {
      phoneNumber: number,
    };
    let result = await Phonebook.findOneAndUpdate({ _id: id }, updatedRecord, {
      new: true,
      upsert: true,
      useFindAndModify: false, // Make this update into an upsert
    });
    return res.status(202).send("Success");
  } catch (error) {
    return res.status(503).send(false);
  }
};

exports.removeRecordByNumber = async (req, res) => {
  let { number } = req.body;
  if (!number) {
    return res.status(401).send("Number Required");
  }
  try {
    const checkingExistingData = await checkDuplicateNumber(number);
    if (!checkingExistingData || checkingExistingData === null) {
      return res.status(401).send("Number Not Found");
    }
    await Phonebook.deleteOne({ phoneNumber: number });
    return res.status(202).send("Success");
  } catch (error) {
    console.log(error);
    return res.status(503).send(false);
  }
};

const checkPhoneNumberPattern = (number) => {
  let exp = /^(01[36789])(\d{8})$/;
  return exp.test(number);
};

const checkDuplicateNumber = async (phoneNumber) => {
  try {
    let number = await Phonebook.findOne({
      phoneNumber,
    });
    console.log(number);
    return number;
  } catch (error) {
    console.log(error);
  }
};
