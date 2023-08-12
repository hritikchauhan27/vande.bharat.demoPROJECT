//Mongoose model for a collection --> coaches

import { Schema, model } from 'mongoose';

interface Coach {
    trainId: Schema.Types.ObjectId;
    coachNumber: string;
    no_of_seat: number;
    bookedSeats: number;
    date: Date;
  }
  
  const coachSchema = new Schema<Coach>({
    trainId: { type: Schema.Types.ObjectId, ref: 'trains', required: true },
    coachNumber: { type: String, required: true },
    no_of_seat: { type: Number, required: true },
    bookedSeats: { type: Number, required: true },
    date: {type: Date, required:true},
  });
  
export const CoachModel = model<Coach>('coaches', coachSchema);