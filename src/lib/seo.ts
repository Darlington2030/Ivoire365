import type { Holiday } from "@/types/calendar";

const SITE_URL = "https://www.ivoire365.ci";

export function holidayEventJsonLd(holiday: Holiday) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: holiday.name,
    startDate: holiday.date,
    endDate: holiday.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    description: holiday.description,
    location: {
      "@type": "Country",
      name: "Côte d'Ivoire",
    },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ivoire365",
    url: SITE_URL,
    inLanguage: "fr-CI",
    description:
      "Calendrier, jours fériés, vacances scolaires et outils de dates pour la Côte d'Ivoire.",
  };
}

/** Serializes a JSON-LD object as a <script> tag's inner HTML, safely. */
export function jsonLdScriptProps(data: object) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  };
}

export { SITE_URL };
