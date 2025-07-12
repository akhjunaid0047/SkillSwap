import {NextFunction, Request, Response} from 'express';
import {verify, JsonWebTokenError, JwtPayload} from 'jsonwebtoken';
import userModel from '../models/user.model';
import adminModel from '../models/admin.model';

export const authoriseToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const token = req.signedCookies['auth_token'];
  if (!token) {
    return res.status(401).json({message: 'Token Not Received'});
  }
  try {
    const decoded = verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    res.locals.jwtData = decoded;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({message: error.name});
    }
    return res.status(401).json({message: 'Invalid token'});
  }
};

export const verifyUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = res.locals.jwtData.id;
    const userExist = await userModel.findById(userId);

    if (!userExist) {
      return res.status(404).json({message: 'User not found'});
    }

    res.locals.user = userExist;
  } catch (error: any) {
    return res
      .status(500)
      .json({message: 'ERROR', cause: error.message});
  }
};

export const verifyAdmin = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = res.locals.jwtData.id;
    const userExist = await adminModel.findById(userId);

    if (!userExist) {
      return res.status(404).json({message: 'User not found'});
    }

    res.locals.user = userExist;
  } catch (error: any) {
    return res
      .status(500)
      .json({message: 'ERROR', cause: error.message});
  }
};