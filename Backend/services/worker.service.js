const userModel = require("../models/user.model");

module.exports.createWorker = async (
  firstname,
  lastname,
  email,
  password,
  phone,
  role,
  street,
  city,
  state,
  zipcode,
  country,
  profession,
  image
) => {
  if (!firstname || !lastname || !email || !password || !profession) {
    throw new Error("All fields are required");
  }

  const worker = await userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    role,
    phone,
    address: {
      street,
      city,
      state,
      zipcode,
      country,
    },
    profession,
    image,
  });

  return worker;
};
