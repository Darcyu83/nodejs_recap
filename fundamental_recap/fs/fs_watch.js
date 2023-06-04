const fs = require("fs");

fs.watch("./file1.md", (eventType, filename) => {
  console.log("eventType ==== ", eventType, "filename ==== ", filename);
});
