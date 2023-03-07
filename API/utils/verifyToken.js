import jwt from "jsonwebtoken";
import { createError } from "../utils/errors.js";

//pour verfier notre authentification

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "token is not valid!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  // on va appeler ca fonction par ce que pour fefier notre utilisateur
  // nous allon envyer la repence a la demande
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      //si il est égal a cet id de lutilisateur qui est a linterieur du jwt cela signifie que nous sommes la propriétaire
      next();
    } else {
      return next(createError(403, "you are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
