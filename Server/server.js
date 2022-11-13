const app = require("./app");
const database = require("./database");

database.connect();

let port = process.env.PORT || 80

app.listen(port, () => console.log(`Server is listening on port ${port}`));
//app.listen(4000, () => console.log(`Server is listening`));
