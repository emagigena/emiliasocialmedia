import { getContactInfo } from "@/lib/actions"
import ContactAdmin from "@/components/admin/contact-admin"

export default async function ContactPage() {
  const contactInfo = await getContactInfo()

  return <ContactAdmin initialInfo={contactInfo} />
}
