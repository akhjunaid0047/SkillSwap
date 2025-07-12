import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/tokenManager.util';
import userModel from '../models/user.model';

const signUpUser = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      location,
      profile,
      profilePhoto,
      availability,
      skillsOffered,
      skillsWanted,
    } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      location,
      profile,
      profilePhoto,
      availability,
      skillsOffered,
      skillsWanted,
    });

    await newUser.save();
    res.clearCookie('auth_token', {
      httpOnly: true,
      domain: 'localhost',
      signed: true,
      path: '/',
    });

    const expiresIn = 7 * 24 * 60 * 60 * 1000;
    const user = await userModel.findOne({email});
    //@ts-ignore
    const token = generateToken(user._id.toString(), email, expiresIn);
   
    res.cookie('auth_token', token, {
      path: '/',
      domain: 'localhost',
      expires: new Date(Date.now() + expiresIn),
      httpOnly: true,
      signed: true,
    });
    return res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Server error during signup' });
  }
}

export const getUser= async(req:Request, res:Response)=>{
  try{
    const users = await userModel.find();
    console.log(users);
    return res.status(200).json(users);
  }catch(error){
    console.error('Error Fetching Data:', error);
    return res.status(500).json({ message: 'Error Fetching Data' });
  }
}
export default signUpUser;
