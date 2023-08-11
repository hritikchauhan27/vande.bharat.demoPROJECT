//Mongoose model for a collection --> seats

import { Schema, model } from 'mongoose';

interface Seat {
    coachId: Schema.Types.ObjectId;
    trainId: Schema.Types.ObjectId;
    seatNumber: string;
    date: Date;
    isBooked: boolean;
  }
  
  const seatSchema = new Schema<Seat>({
    coachId: { type: Schema.Types.ObjectId, ref: 'coaches', required: true },
    trainId: { type: Schema.Types.ObjectId, ref: 'trains', required: true },
    seatNumber: { type: String, required: true },
    date: {type:Date,required:true},
    isBooked: { type: Boolean, required: true },
  });
  
  export const SeatModel = model<Seat>('seats', seatSchema);