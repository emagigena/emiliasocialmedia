import mongoose, { Schema, type Document } from "mongoose"

export interface IContact extends Document {
  name: string
  email: string
  type: string // "client" o "career"
  service?: string // Para clientes
  message?: string // Para clientes
  position?: string // Para candidatos
  experience?: string // Para candidatos
  portfolio?: string // Para candidatos
  status: string // "new", "read", "replied", "archived"
  createdAt: Date
  updatedAt: Date
}

const ContactSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    type: { type: String, required: true, enum: ["client", "career"] },
    service: { type: String }, // Solo para clientes
    message: { type: String }, // Solo para clientes
    position: { type: String }, // Solo para candidatos
    experience: { type: String }, // Solo para candidatos
    portfolio: { type: String }, // Solo para candidatos
    status: { type: String, required: true, default: "new", enum: ["new", "read", "replied", "archived"] },
  },
  { timestamps: true },
)

export default mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema)
