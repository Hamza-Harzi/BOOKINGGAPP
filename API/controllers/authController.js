import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { createError } from "../utils/errors.js";
import bcrypt from "bcryptjs"; // nou utilisons bcrypt pour encodant notre mot de pass this from npm istall bcryptjs
// this to creat new user or regester new user from ligne 3 to 20
export const regester = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10); // nou utilisons bcrypt pour encodant notre mot de pass
    const hash = bcrypt.hashSync(req.body.password, salt); // nou utilisons bcrypt pour encodant notre mot de pass

    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};
// here i create login
export const Login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName }); // pour trouver le non de l'utilisateur dons notre base de donnée
    if (!user) return next(createError(404, "User not found!")); //on va creer une erreur s'il n'ya pas de non d'utilisateur dons notre base de donnée

    // pour trouver le mot de passe de l'utilisateur dons notre base de donnée
    const isPAsswordCorrect = await bcrypt.compare(
      // pour nous permetre de comparer le mot de passe de l'utilisateur le le mot de passe qui ce trouve dans notre base de donne parce que le mot pas qui est dons le base de donnée est encodant
      req.body.password,
      user.password
    );

    if (!isPAsswordCorrect)
      return next(createError(400, "wrong password or username!")); //on va creer une erreur s'il n'ya pas de mot de pass de l'utilisateur dons notre base de donnée

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    ); // nous allons hacher ca information et pour chaque demande nous sommes va envoyer ce jwt pour vérifier notre identite
    // la secret JWT se trouve dons .env nous prenons the secret jwt avec openssl rand base64 32  in cmd dand le pc
    const { password, isAdmin, ...otherDetails } = user._doc; // pour empecher d'envoyer le password et isAdmine dans notre application
    res
      .cookie("access_token", token, { httpOnly: true }) // mettre ce token dans nos cookies with npm i cookie-parser et impoert ce cookies dans index.js et use dans le middleware

      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};
