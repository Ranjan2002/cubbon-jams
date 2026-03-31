import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cubbon Jams',
    short_name: 'Cubbon Jams',
    description: "Bangalore's vibrant music community. Open jam sessions, live music events, and community gatherings.",
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#E53935',
    icons: [
      {
        src: '/images/logo/CARBON JAMS.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/logo/CARBON JAMS.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
