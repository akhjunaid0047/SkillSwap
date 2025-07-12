import {Request, Response} from 'express';

import bcrypt from 'bcrypt';
import adminModel from '../models/admin.model';

export const signUpAdmin = async (req: Request, res: Response) => {
  try {
    const {name, email, password} = req.body;

    const existingUser = await adminModel.findOne({email});
    if (existingUser) {
      return res.status(409).json({message: 'User already exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new adminModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.clearCookie('auth_token', {
      httpOnly: true,
      domain: 'localhost',
      signed: true,
      path: '/',
    });

    const expiresIn = 7 * 24 * 60 * 60 * 1000;
    const user = await adminModel.findOne({email});
    //@ts-ignore
    const token = generateToken(user._id.toString(), email, expiresIn);

    res.cookie('auth_token', token, {
      path: '/',
      domain: 'localhost',
      expires: new Date(Date.now() + expiresIn),
      httpOnly: true,
      signed: true,
    });

    return res.status(201).json({message: 'Admin signed up successfully'});
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({message: 'Server error during signup'});
  }
};
