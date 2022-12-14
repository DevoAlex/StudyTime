const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];

    const decodedToken = await jwt.verify(token, process.env.PRIVATE_KEY);

    const user = await decodedToken;

    req.user = user;

    next();

  } catch (err) {
    res.status(401).send({ error: new Error("Invalid request!") });
  }
};

module.exports = auth
