import { body } from "express-validator";

export const validateRegister = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6+ chars"),
];

export const validateLogin = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
];
