const express = require("express");
const path = require("path");
const cors = require("cors");
const { check, validationResult } = require("express-validator");

const PORT = process.env.PORT || "3001";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, '../react-validation/build')));
  app.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, "../react-validation/build", "index.html"))
  })
}


app.post(
  "/api",
  [
    check("username", "Please provide username").custom((value, { req }) => {
      const pattern = /.+/;
      const match = pattern.test(value);
      return match;
    }),
    check("password", "Password must be minimum 8 characters").isLength({
      min: 8,
    }),
    check(
      "password",
      "Password must include uppercase,lowercase letters, digits and symbols"
    ).custom((value, { req }) => {
      const pattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-Z0-9@$!*?&]{8,}$/;
      const match = pattern.test(value);
      console.log('match',match);
      return match;
    }),
    check("confirmPass", "confirm password must match password").custom(
      (value, { req }) => {
        if (value === req.body.password) {
          return true;
        } else {
          return false;
        }
      }
    ),
    check('email', "email must be valid").custom((value, {req}) => {
        const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g
        const match = pattern.test(value);
        return match;
    })
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    return res.json({ url: "/home" });
  }
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
