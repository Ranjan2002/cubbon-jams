# Cubbon Jams - Music Community Website

![Cubbon Jams](https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&h=400&fit=crop)

> "From the park, to your heart" - Join Bangalore's most vibrant music community!

## 🎵 About

Cubbon Jams is a modern, production-ready website for a Bangalore-based music community that hosts open jam sessions, live music, and community events at Cubbon Park.

## ✨ Features

- **Beautiful UI** - Modern, minimal design with smooth animations
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Dark Mode** - Toggle between light and dark themes
- **Event Management** - View, register for, and manage events
- **Gallery** - Photo gallery with category filters
- **Community** - Join forms and contact functionality
- **Admin Panel** - Manage events and gallery content
- **SEO Optimized** - Meta tags, Open Graph, and more

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/cubbon-jams.git
cd cubbon-jams
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
cubbon-jams/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Home page
│   │   ├── events/            # Events pages
│   │   ├── gallery/           # Gallery page
│   │   ├── about/             # About page
│   │   ├── join/              # Join community page
│   │   ├── contact/           # Contact page
│   │   ├── admin/             # Admin dashboard
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   ├── sections/         # Page sections
│   │   ├── Navbar.tsx        # Navigation
│   │   ├── Footer.tsx        # Footer
│   │   └── ThemeProvider.tsx # Dark mode provider
│   └── lib/                   # Utilities and data
│       ├── data/             # Mock data
│       ├── types.ts          # TypeScript types
│       └── utils.ts          # Utility functions
├── public/                    # Static assets
├── tailwind.config.ts        # Tailwind configuration
└── package.json
```

## 🎨 Design System

### Colors

- **Primary**: `#E53935` (Red)
- **Secondary**: `#111111` (Black)
- **Accent**: `#FFFFFF` (White)

### Typography

- **Font**: Inter
- **Headings**: Bold (600-900)
- **Body**: Regular (400-500)

### Components

- Rounded corners (2xl)
- Soft shadows
- Smooth animations
- Glass morphism effects

## 📱 Pages

1. **Home** - Hero, upcoming events, about preview, gallery, testimonials
2. **Events** - All events with filters (upcoming/past, categories)
3. **Event Detail** - Full event info with registration form and countdown
4. **Gallery** - Photo grid with category filters and lightbox
5. **About** - Story, mission, vision, values, and team
6. **Join** - Community registration form
7. **Contact** - Contact form with social links and map
8. **Admin** - Dashboard to manage events and gallery

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for environment variables:

```env
# Database (if using Supabase)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key

# Google Maps API (optional)
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your-google-maps-key
```

### Tailwind

Custom colors and animations are configured in `tailwind.config.ts`.

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy!

### Manual Build

```bash
npm run build
npm run start
```

## 📄 License

MIT License - feel free to use this project for your own music community!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For questions or support, reach out to:
- Email: hello@cubbonjams.com
- Instagram: @cubbonjams

---

Made with ❤️ in Bangalore
