import { Request, Response } from 'express';

import mongoose from 'mongoose';
import swapModel from '../models/swap.model';

export const createSwap = async (req:Request, res: Response)=>{
    const { requestor, acceptor } = req.body;

  if (!requestor || !acceptor) {
    return res.status(400).json({ message: 'Requestor and Acceptor are required.' });
  }

  try {
    const newSwap = new swapModel({
      requestor: new mongoose.Types.ObjectId(requestor),
      acceptor: new mongoose.Types.ObjectId(acceptor),
    });

    const savedSwap = await newSwap.save();
    return res.status(201).json(savedSwap);
  } catch (error) {
    console.error('Error creating swap:', error);
    return res.status(500).json({ message: 'Failed to create swap.' });
  }
}

export const getSwaps = async(req:Request, res:Response)=>{
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const pendingSwaps = await swapModel.find({
      acceptor: userId,
    })
      .populate('requestor', 'name email profile profilePhoto')
      .populate('acceptor', 'name email profile profilePhoto')
      .sort({ createdAt: -1 });

    return res.status(200).json(pendingSwaps);
  } catch (error) {
    console.error('Error fetching pending swaps:', error);
    return res.status(500).json({ message: 'Server error retrieving swaps' });
  }
}