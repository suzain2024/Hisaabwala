import express from 'express';
import {loginControllers,registerControllers,setAvatarController} from  '../controllers/userController.js';
const router=express.Router();
router.route("/login").post(loginControllers);//for login of the available user
router.route("/register").post(registerControllers);//for registering the new user
router.route("/setAvatar/:id").post(setAvatarController);//set the profile picture as avatar
 
export default router;
