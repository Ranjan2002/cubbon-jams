export const SITE_SETTINGS_KEY = "cubbon_jams_site_settings";

export interface SiteSettings {
  heroBadge: string;
  heroTitlePrimary: string;
  heroTitleSecondary: string;
  heroTagline: string;
  heroDescription: string;
  heroPrimaryCtaLabel: string;
  heroPrimaryCtaHref: string;
  heroSecondaryCtaLabel: string;
  heroSecondaryCtaHref: string;
}

export const defaultSiteSettings: SiteSettings = {
  heroBadge: "Every Sunday at Cubbon Park",
  heroTitlePrimary: "Cubbon Jams",
  heroTitleSecondary: "Where Music Meets Community",
  heroTagline: "From the park, to your heart",
  heroDescription:
    "Join Bangalore's most vibrant music community. Open jam sessions, live performances, and unforgettable experiences await you every week.",
  heroPrimaryCtaLabel: "View Events",
  heroPrimaryCtaHref: "/events",
  heroSecondaryCtaLabel: "Join Community",
  heroSecondaryCtaHref: "/join",
};
