import { getCarouselItems } from "@/lib/actions"
import CarouselAdmin from "../../../../components/admin/carousel-admin"

export default async function CarouselPage() {
  const carouselItems = await getCarouselItems()

  return <CarouselAdmin initialItems={carouselItems} />
}
