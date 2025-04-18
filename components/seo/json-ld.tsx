import Script from "next/script"

interface LocalBusinessProps {
  name: string
  description: string
  url: string
  logo: string
  address: string
  telephone: string
  email: string
  priceRange: string
  services: string[]
  images: string[]
  sameAs: string[]
}

export function LocalBusinessJsonLd({
  name,
  description,
  url,
  logo,
  address,
  telephone,
  email,
  priceRange,
  services,
  images,
  sameAs,
}: LocalBusinessProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": url,
    name,
    description,
    url,
    logo,
    image: images,
    address: {
      "@type": "PostalAddress",
      addressLocality: address,
    },
    telephone,
    email,
    priceRange,
    sameAs,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service,
        },
        position: index + 1,
      })),
    },
  }

  return (
    <Script
      id="local-business-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface FAQProps {
  questions: Array<{
    question: string
    answer: string
  }>
}

export function FAQJsonLd({ questions }: FAQProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  }

  return (
    <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  )
}

interface BreadcrumbProps {
  items: Array<{
    name: string
    item: string
  }>
}

export function BreadcrumbJsonLd({ items }: BreadcrumbProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  }

  return (
    <Script
      id="breadcrumb-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
