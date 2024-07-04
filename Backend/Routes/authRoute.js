import { Router } from 'express';
const authrouter = Router();
import verifyJwtToken from "../middlewares/authMiddleware.js";

import { registerr } from '../Controllers/AuthControllers/register.js';
authrouter.post("/register",registerr);

import { login } from '../Controllers/AuthControllers/login.js';
authrouter.post("/login",login);

import { supdate } from '../Controllers/AuthControllers/settingsupdate.js';
authrouter.put("/settings/update",verifyJwtToken,supdate);

export default authrouter;

