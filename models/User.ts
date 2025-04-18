import mongoose, { Schema, Document } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  phoneNumber: string
  rollNumber: string
  collegeName: string
  ticketId: string
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  rollNumber: { type: String, required: true },
  collegeName: { type: String, required: true },
  ticketId: { type: String, required: true },
})

// ✅ Prevent model overwrite in Next.js
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
export default User
