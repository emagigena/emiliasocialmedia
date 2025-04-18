import mongoose, { Schema, type Document } from "mongoose"

export interface ICarousel extends Document {
  title: string
  description: string
  image: string
  order: number
  createdAt: Date
  updatedAt: Date
}

const CarouselSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export default mongoose.models.Carousel || mongoose.model<ICarousel>("Carousel", CarouselSchema)
