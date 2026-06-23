import type { MetadataRoute } from "next";
import { getAvailableYears, getYearData } from "@/lib/holidays";
import { getAvailableSchoolYears } from "@/lib/school-holidays";
import { allMonthSlugs } from "@/lib/date-utils";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/jours-feries`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/vacances-scolaires`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/ramadan-tabaski`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/numero-semaine`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/calculateur-de-dates`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/examens`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/a-propos`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/politique-de-confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  for (const year of getAvailableYears()) {
    entries.push({
      url: `${SITE_URL}/calendrier-${year}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });
    for (const month of allMonthSlugs()) {
      entries.push({
        url: `${SITE_URL}/calendrier-${year}/${month}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    entries.push({
      url: `${SITE_URL}/jours-feries/${year}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });

    const yearData = getYearData(year);
    if (yearData) {
      for (const holiday of yearData.holidays) {
        entries.push({
          url: `${SITE_URL}/jours-feries/${holiday.slug}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.7,
        });
        entries.push({
          url: `${SITE_URL}/compte-a-rebours/${holiday.slug}`,
          lastModified: now,
          changeFrequency: "daily",
          priority: 0.5,
        });
      }
    }
  }

  for (const schoolYear of getAvailableSchoolYears()) {
    entries.push({
      url: `${SITE_URL}/vacances-scolaires/${schoolYear}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  return entries;
}
