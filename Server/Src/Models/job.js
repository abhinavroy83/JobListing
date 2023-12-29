const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  CompanyName: { type: String, required: true },
  Logo: { type: String, required: true },
  Jobposition: { type: String, required: true },
  Montly_Salary: { type: Number, required: true },
  Jobtype: { type: String, enum: ["fulltime", "internship"], required: true },
  Remote_office: { type: String, enum: ["Remote", "Office"], required: true },
  Location: { type: String, required: true },
  JobDescription: { type: String, required: true },
  AboutCompany: { type: String, required: true },
  Skillrequired: { type: [String], required: true },
  Information: { type: String, required: true },
});

const jobDetail = mongoose.model("jobDetails", jobSchema);
module.exports = jobDetail;