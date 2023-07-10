import Vendor from "./models/vendor";

const isDev = process.env.NODE_ENV !== "production";

const dbInit = () => {
  Vendor.sync({ alter: isDev })
    .then((value) => console.log("Vendor table:: Success to Create or update"))
    .catch((err) => console.log("Vendor table:: Failed to create or update"));
};

export default dbInit;
