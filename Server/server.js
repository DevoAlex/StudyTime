const app = require("./app");
const database = require("./database");

database.connect();

app.listen(process.env.PORT, () => console.log(`Server is listening`));
