import mongoose, { Schema, type Document } from "mongoose"

export interface ISocialLink {
  platform: string
  url: string
}

export interface IFooterInfo extends Document {
  subtitle: string
  location: string
  email: string
  phone: string
  socialLinks: ISocialLink[]
  createdAt: Date
  updatedAt: Date
}

const SocialLinkSchema = new Schema({
  platform: { type: String, required: true },
  url: { type: String, required: true },
})

const FooterInfoSchema: Schema = new Schema(
  {
    subtitle: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    socialLinks: [SocialLinkSchema],
  },
  { timestamps: true },
)

export default mongoose.models.FooterInfo || mongoose.model<IFooterInfo>("FooterInfo", FooterInfoSchema)
