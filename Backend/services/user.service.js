const userModel = require("../models/user.model");

module.exports.registerUser = async ({
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

  image,
}) => {
  if (!firstname || !lastname || !email || !password || !role) {
    throw new Error("All fields are required");
  }

  const user = await userModel.create({
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

    image,
  });

  return user;
};
