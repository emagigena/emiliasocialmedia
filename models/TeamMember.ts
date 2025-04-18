import mongoose, { Schema, type Document } from "mongoose"

export interface ITeamMember extends Document {
  name: string
  position: string
  image: string
  bio: string
  createdAt: Date
  updatedAt: Date
}

const TeamMemberSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    image: { type: String, required: true },
    bio: { type: String, required: true },
  },
  { timestamps: true },
)

export default mongoose.models.TeamMember || mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema)
