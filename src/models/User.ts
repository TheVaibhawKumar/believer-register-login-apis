import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
name: string;
email: string;
phone?: string;
password: string;
createdAt: Date;
}

const userSchema = new Schema<IUser>({
name: { type: String, required: true, trim: true },
email: { type: String, required: true, unique: true, lowercase: true, trim: true },
phone: { type: String, required: false, trim: true },
password: { type: String, required: true },
}, { timestamps: true });
export const User = model<IUser>('User', userSchema);