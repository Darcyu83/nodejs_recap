const fs = require("fs");
const fsPromises = require("fs").promises;

fs.readFile("./readMe.md", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("readFile data ==== ", data);
  console.log("readFile data ==== ", data.toString().replaceAll(" ", ""));
});

const readFile = async () => {
  try {
    const text = await fsPromises.readFile("./readMe.md");
    console.log("readFile text ==== ", text);
    console.log("readFile text ==== ", text.toString().replaceAll(" ", ""));
  } catch (error) {
    throw error;
  }
};

readFile();
