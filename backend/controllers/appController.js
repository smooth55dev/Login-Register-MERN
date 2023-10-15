const UserModel = require("../model/User-model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

class AppController {
  async verifyUser(req, res, next) {
    try {
      const { username } = req.method == "GET" ? req.query : req.body;

      // check the user existance
      let exist = await UserModel.findOne({ username });
      if (!exist) return res.status(404).send({ error: "Can't find User!" });
      next();
    } catch (error) {
      return res.status(404).send({ error: "Authentication Error" });
    }
  }

  /** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/

  async register(req, res) {
    try {
      const { username, password, profile, email } = req.body;

      const existUsername = await UserModel.findOne({ username });
      if (existUsername) {
        res.json("Please use unique username");
      }

      const existEmail = await UserModel.findOne({ email });
      if (existEmail) {
        res.json("Please use unique email");
      }

      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
          const user = await UserModel.create({
            username,
            password: hashedPassword,
            profile: profile || "",
            email,
          });
          return res.status(201).send({ msg: "User Register Successfully" });
        } catch (error) {
          res.status(500).send({ error });
        }
      } catch (error) {
        return res.status(500).send({
          error: "Enable to hashed password",
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  }
  //     Promise.all([existUsername, existEmail])
  //       .then(() => {
  //         if (password) {
  //           bcrypt
  //             .hash(password, 10)
  //             .then((hashedPassword) => {
  //               const user = new UserModel({
  //                 username,
  //                 password: hashedPassword,
  //                 profile: profile || "",
  //                 email,
  //               });

  //               // return save result as a response
  //               user
  //                 .save()
  //                 .then((result) =>
  //                   res.status(201).send({ msg: "User Register Successfully" })
  //                 )
  //                 .catch((error) => res.status(500).send({ error }));
  //             })
  //             .catch((error) => {
  //               return res.status(500).send({
  //                 error: "Enable to hashed password",
  //               });
  //             });
  //         }
  //       })
  //       .catch((error) => {
  //         return res.status(500).send({ error });
  //       });
  //   } catch (error) {
  //     return res.status(500).send(error);
  //   }
  // }

  //   /** POST: http://localhost:8080/api/login
  //  * @param: {
  //   "username" : "example123",
  //   "password" : "admin123"
  // }
  // */

  login(req, res) {
    const { username, password } = req.body;

    try {
      UserModel.findOne({ username })
        .then((user) => {
          bcrypt
            .compare(password, user.password)
            .then((passwordCheck) => {
              if (!passwordCheck)
                return res.status(400).send({ error: "Don't have Password" });

              // create jwt token
              const token = jwt.sign(
                {
                  userId: user._id,
                  username: user.username,
                },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
              );

              return res.status(200).send({
                msg: "Login Successful...!",
                username: user.username,
                token,
              });
            })
            .catch((error) => {
              return res.status(400).send({ error: "Password does not Match" });
            });
        })
        .catch((error) => {
          return res.status(404).send({ error: "Username not Found" });
        });
    } catch (error) {
      return res.status(500).send({ error });
    }
  }

  /** GET: http://localhost:8080/api/user/example123 */
  async getUser(req, res) {
    const { username } = req.params;

    try {
      if (!username) return res.status(501).send({ error: "Invalid Username" });

      const user = await UserModel.findOne({ username });
      if (!user)
        return res.status(501).send({ error: "Couldn't Find the User" });

      /** remove password from user */
      // mongoose return unnecessary data with object so convert it into json
      const { password, ...rest } = Object.assign({}, user.toJSON());

      return res.status(201).send(rest);
    } catch (error) {
      return res.status(404).send({ error: "Couldn't Find the User" });
    }
  }

  /** PUT: http://localhost:8080/api/updateuser
   * @param: {
    "header" : "<token>"
  }
  body: {
      firstName: '',
      address : '',
      profile : ''
  }
  */
  async updateUser(req, res) {
    try {
      //const id = req.query.id;
      const { userId } = req.user;

      if (userId) {
        const body = req.body;
        // update the data

        await UserModel.updateOne({ _id: userId }, body);

        return res.status(201).send({ msg: "Record Updated...!" });
      } else {
        return res.status(401).send({ error: "User Not Found...!" });
      }
    } catch (error) {
      return res.status(401).send({ error });
    }
  }

  /** GET: http://localhost:8080/api/generateOTP */
  async generateOTP(req, res) {
    const otp = crypto.randomInt(1000, 9999);
    req.app.locals.OTP = crypto.randomInt(1000, 9999);
    res.status(201).send({ code: req.app.locals.OTP });
  }

  /** GET: http://localhost:8080/api/verifyOTP */
  async verifyOTP(req, res) {
    const { code } = req.query;
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
      req.app.locals.OTP = null; // reset the OTP value
      req.app.locals.resetSession = true; // start session for reset password
      return res.status(201).send({ msg: "Verify Successsfully!" });
    }
    return res.status(400).send({ error: "Invalid OTP" });
  }

  // successfully redirect user when OTP is valid
  /** GET: http://localhost:8080/api/createResetSession */
  async createResetSession(req, res) {
    if (req.app.locals.resetSession) {
      return res.status(201).send({ flag: req.app.locals.resetSession });
    }
    return res.status(440).send({ error: "Session expired!" });
  }

  // update the password when we have valid session
  /** PUT: http://localhost:8080/api/resetPassword */
  async resetPassword(req, res) {
    try {
      if (!req.app.locals.resetSession) {
        return res.status(440).send({ error: "Session expired" });
      }
      const { username, password } = req.body;
      try {
        const user = await UserModel.findOne({ username });
        try {
          const hashedpassword = await bcrypt.hash(password, 10);
          await UserModel.updateOne(
            { username: user.username },
            { password: hashedpassword }
          );
          req.app.locals.resetSession = false; // reset session
          return res.status(201).send({ msg: "Record Updated...!" });
        } catch (error) {
          return res.status(500).send({
            error: "Enable to hashed password",
          });
        }
      } catch (error) {
        return res.status(500).send({ error });
      }
    } catch (error) {
      return res.status(401).send({ error });
    }
  }
}

module.exports = new AppController();
