import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
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

    return res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Server error during signup' });
  }
}

export const getUser= async(req:Request, res:Response)=>{
  try{
    const users = await User.find();
    console.log(users);
    return res.status(200).json(users);
  }catch(error){
    console.error('Error Fetching Data:', error);
    return res.status(500).json({ message: 'Error Fetching Data' });
  }
}
export default signUpUser;
