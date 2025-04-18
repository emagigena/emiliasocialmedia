import mongoose, { Schema, type Document } from "mongoose"

export interface IProject extends Document {
  title: string
  category: string
  images: string[] // Cambiado de image a images (array)
  description: string
  client?: string
  results?: string
  date?: Date
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    images: { type: [String], required: true }, // Cambiado a array de strings
    description: { type: String, required: true },
    client: { type: String },
    results: { type: String },
    date: { type: Date },
  },
  { timestamps: true },
)

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema)
