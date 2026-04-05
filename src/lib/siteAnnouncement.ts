export const SITE_ANNOUNCEMENT_KEY = "cubbon_jams_site_announcement";

export interface SiteAnnouncement {
  enabled: boolean;
  text: string;
  ctaLabel: string;
  ctaHref: string;
  dismissible: boolean;
}

export const defaultSiteAnnouncement: SiteAnnouncement = {
  enabled: false,
  text: "",
  ctaLabel: "",
  ctaHref: "/events",
  dismissible: true,
};
