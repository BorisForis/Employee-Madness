require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const EmployeeModel = require("../db/employee.model");
const FavoriteBrand = require("../db/brands.model");
const brandNames = require("./brands.json");
const FavoriteColors = require("../db/colors.model")
const colorsNames = require("./colors.json")

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const pick = (from) => from[Math.floor(Math.random() * from.length)];

const populateColors = async () => {
  await FavoriteColors.deleteMany({})

  const colors = colorsNames.map((name) => ({
    name,
  }))

  await FavoriteColors.create(...colors)
  console.log("Colors Created")
}

const populateBrands = async () => {
  await FavoriteBrand.deleteMany({});

  const brands = brandNames.map((name) => ({
    name,
  }));

  await FavoriteBrand.create(...brands);
  console.log("Brands created");
};

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const brands = await FavoriteBrand.find({})
  const colors = await FavoriteColors.find({})


  const employees = () => {
    return names.map((name) => {
      const salary = Math.round(Math.random() * 1000)
      console.log(salary)
      function handlePosition() {
        if(salary <= 100){
          return "Junior"
        }
        if(salary > 100 && salary < 301){
          return "Medior"
        }
        if(salary > 300 && salary < 401){
          return "Senior"
        }
        if(salary > 400 && salary < 801){
          return "Expert"
        }
        if(salary > 800) {
          return "Godlike"
        }
      }
      return (
        {
          name,
          level: handlePosition(),
          salary: salary,
          position: pick(positions),
          favoriteBrand: pick(brands),
          favoriteColor: pick(colors),
          notes: []
        }
      )
    })
  };

  await EmployeeModel.create(employees());
  console.log("Employees created");
};


const populateTools = async () => {
  await EquipmentModel.deleteMany({});

  const handEquipment = handToolsNames.map((name) => ({
    name,
    type: "Hand Tool",
    amount: Math.floor(Math.random() * (50 - 1) + 1),
  }));

  const powerEquipment = powerToolsNames.map((name) => ({
    name,
    type: "Power Tool",
    amount: Math.floor(Math.random() * (25 - 1) + 1),
  }));

  await EquipmentModel.create(...handEquipment);
  await EquipmentModel.create(...powerEquipment);

  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  // await populateColors()
  // await populateBrands()
  await populateEmployees();
  // await populateTools()

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
