require("dotenv").config();
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model")
const MissingModel = require("./db/missing.model");
const FavoriteBrand = require("./db/brands.model")
const FavoriteColor = require("./db/colors.model")

const { MONGO_URL, PORT } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cors())

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" });
  return res.json(employees);
});

app.get("/api/equipments/", async (req, res) => {
  const equipments = await EquipmentModel.find().sort({ created: "desc" });
  return res.json(equipments);
});

app.patch("/api/equipments/:id", async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(equipment);
  } catch (err) {
    return next(err);
  }
});

app.get("/api/employees/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id);
  return res.json(employee);
});

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.post("/api/missing", async (req, res, next) => {
  await MissingModel.deleteMany({})
  const missing = req.body
  
  try {
    const saved = await MissingModel.create(missing);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
})

app.get("/api/missing", async (req, res) => {
  const missing = await MissingModel.find().sort({ created: "desc" });
  return res.json(missing);
})

app.get("/api/brands", async (req, res) => {
  const brands = await FavoriteBrand.find().sort({ created: "desc" });
  return res.json(brands);
})

app.get("/api/colors", async (req, res) => {
  const colors = await FavoriteColor.find().sort({ created: "desc" });
  return res.json(colors);
})

app.patch("/api/notes/:id", async (req, res) => {
  try {
    const employee = await EmployeeModel.findByIdAndUpdate(req.params.id, {$set: {notes: req.body.comment}}, { new: true })
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
})

app.get("/api/notes/:id", async(req, res) => {
  const employee = await EmployeeModel.findById(req.params.id)
  res.json(employee.notes)
})

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 3001");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
