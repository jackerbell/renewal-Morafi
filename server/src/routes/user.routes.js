import express from "express";
import {body} from "express-validator";
import favoriteController from "../controllers/favorite.controller.js";
import userController from "../controllers/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import userModel from "../models/user.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

router.post(
  "/signup",
  body("username")
    .exists().withMessage("username is required!")
    .isLength({min:8}).withMessage("username minimun 8 characters")
    .custom(async value => {
      const user = await userModel.findOne({userName: value});
      if(user){
        return Promise.reject("username already used!");
      }
    }
  ),  

  body("password")
    .exists().withMessage("password is required!")
    .isLength({min:8}).withMessage("password minimun 8 characters"),
  
  body("confirmPassword")
    .exists().withMessage("confirmPassword is required!")
    .isLength({min:8}).withMessage("confirmPassword minimun 8 characters")
    .custom((value,{req}) => {
    if(value !== req.body.password) throw new Error("confirmPassword not match")
    return true;
  }),
  
  body("displayName")
    .exists().withMessage("displayName is required!")
    .isLength({min:8}).withMessage("displayName minimun 8 characters"),
  requestHandler.validate,
  userController.signup
  );
  
  router.post(
    "/signup",
  body("username")
    .exists().withMessage("displayName is required!")
    .isLength({min:8}).withMessage("username minimun 8 characters"),
  body("password")
    .exists().withMessage("displayName is required!")
    .isLength({min:8}).withMessage("password minimun 8 characters"),
  requestHandler.validate,
  userController.signin
);

router.put(
  "/update-password",
  tokenMiddleware.auth,
  body("password")
    .exists().withMessage("password is required")
    .isLength({min:8}).withMessage("password minimun 8 characters"),
  body("newPassword")
    .exists().withMessage("newPassword is required")
    .isLength({min:8}).withMessage("newPassword minimun 8 characters"),
  body("confirmeNewPassword")
    .exists().withMessage("confirmNewPassword is required")
    .isLength({min:8}).withMessage("confirmNewPassword minimun 8 characters")
    .custom((value,{req}) => {
      if(value !== req.body.password) throw new Error("confirmNewPassword not match")
      return true;
    }),
  requestHandler.validate,
  userController.updatePassword
);

router.get(
  "/info",
  tokenMiddleware.auth,
  userController.getInfo
);

router.get(
  "/favorites",
  tokenMiddleware.auth,
  favoriteController.getFavoritesOfUser
);

router.post(
  "/favorites",
  tokenMiddleware.auth,
  body("mediaType")
    .exists().withMessage("mediaType is required")
    .custom(type => ["movie","tv"].includes(type)).withMessage("mainType invalid"),
  body("mediaId")
    .exists().withMessage("mediaId is required!")
    .isLength({min:1}).withMessage("mediaId can not be empty"),
  body("mediaTitle")
    .exists().withMessage("mediaTitle is required"),    
  body("mediaPoster")
    .exists().withMessage("mediaPoster is required"),    
  body("mediaRate")
    .exists().withMessage("mediaRate is required"),
  requestHandler.validate,
  favoriteController.addFavortie      
);

router.delete(
  "/favorites/:favoriteId",
  tokenMiddleware.auth,
  favoriteController.removeFavorite
)

export default router;