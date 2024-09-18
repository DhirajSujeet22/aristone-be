const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports.Auth = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send({
      error: true,
      result: null,
      message: "UnAuthorized",
    });
  }
  const splitToken = token.split(" ")[1];
  // console.info({token})
  if (splitToken && (splitToken === "null" || splitToken === undefined)) {
    console.log({ splitToken })

    return res.status(401).send({
      error: true,
      result: null,
      message: "UnAuthorized",
    });

  }
  console.log({ splitToken1: splitToken })

  const decodedData = jwt.verify(splitToken, JWT_SECRET);
  req.user = decodedData;

  console.info("<------------Authentication--------->");
  console.info({ token, decodedData });
  console.info("<----------------End---------------->");

  next();
};
