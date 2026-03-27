# 🚀 Cubbon Jams - Netlify Deployment Guide

## ✅ What I Fixed

### Issue
Your deployed site showed **unstyled HTML** (no CSS loading) because:
- `netlify.toml` had `publish = ".next"` which bypassed the Next.js plugin
- When you publish just the `.next` folder, Netlify doesn't run the plugin properly

### Solution
- **Removed** the `publish` directory from `netlify.toml`
- Let `@netlify/plugin-nextjs` handle the build automatically

---

## 🔧 Netlify Configuration

### In your Netlify Dashboard:

1. **Go to Site Settings → Build & Deploy → Build settings**

2. **Set these values:**
   - **Build command:** `npm run build`
   - **Publish directory:** *(leave empty or set to `.`)*
   - **Node version:** `18`

3. **Environment Variables (if needed):**
   - `NODE_VERSION` = `18`
   - `NPM_FLAGS` = `--legacy-peer-deps`

4. **Deploy Settings:**
   - Make sure **@netlify/plugin-nextjs** is enabled
   - Check: **Plugins → Installed plugins** → Should see "Next.js Runtime"

---

## 📝 Current Configuration

### `netlify.toml`
```toml
[build]
  command = "npm run build"
  # publish is handled by @netlify/plugin-nextjs

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--legacy-peer-deps"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### `package.json` scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

---

## 🚀 How to Deploy

### Method 1: Git Push (Recommended)
```bash
git add .
git commit -m "Fix: Remove publish directory from netlify.toml"
git push origin main
```

Netlify will automatically deploy when you push.

### Method 2: Manual Deploy via Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### Method 3: Drag & Drop (Not Recommended)
Build locally and drag `.next` folder - but this won't include the plugin benefits.

---

## ✅ Verify Deployment

After deploying, check:

1. **Build Logs** - Should see:
   ```
   ✅ Next.js cache restored
   ✅ Next.js build completed
   ✅ @netlify/plugin-nextjs deployed successfully
   ```

2. **Site Preview** - Should show:
   - ✅ Styled components with Tailwind CSS
   - ✅ Red primary color (#E53935)
   - ✅ Smooth animations
   - ✅ Responsive design

3. **Browser Console** - Should have:
   - ✅ No CSS loading errors
   - ✅ No 404 for `_next/static/*` files

---

## 🐛 Troubleshooting

### Issue: Still seeing unstyled HTML?

**Solution 1: Clear Netlify Cache**
```bash
# In Netlify Dashboard
Site Settings → Build & Deploy → Clear cache and deploy site
```

**Solution 2: Check Build Output**
```bash
# Locally test the build
npm run build
npm run start
```

**Solution 3: Verify Plugin Installation**
```bash
# In Netlify Dashboard
Plugins → Search "Next.js" → Install @netlify/plugin-nextjs
```

### Issue: Build fails?

Check these:
1. Node version is 18 or higher
2. All dependencies installed: `npm install`
3. No TypeScript errors: `npm run lint`

### Issue: Images not loading?

Check `next.config.mjs`:
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
  ],
}
```

---

## 📊 Expected Build Output

```bash
✓ Creating an optimized production build
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (7/7)
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                   142 kB          167 kB
├ ○ /about                              137 kB          162 kB
├ ○ /contact                            138 kB          163 kB
├ ○ /events                             145 kB          170 kB
├ ○ /events/[id]                        142 kB          167 kB
├ ○ /gallery                            139 kB          164 kB
└ ○ /join                               138 kB          163 kB

○ (Static)  automatically rendered as static HTML
```

---

## 🎯 Next Steps

1. **Commit and push** the fixed `netlify.toml`
2. **Wait for deployment** (2-3 minutes)
3. **Verify** your site loads with proper styling
4. **Test** all pages and functionality

---

## 📱 Testing Checklist

After deployment, test:
- [ ] Homepage loads with hero section
- [ ] Navigation works
- [ ] Events page shows styled cards
- [ ] Event details page works
- [ ] Gallery grid displays correctly
- [ ] Contact form is styled
- [ ] Join community form works
- [ ] Dark mode toggle works
- [ ] Mobile responsive design
- [ ] All images load
- [ ] Animations work smoothly

---

## 🔗 Useful Links

- [Netlify Next.js Documentation](https://docs.netlify.com/frameworks/next-js/)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Tailwind CSS Production Build](https://tailwindcss.com/docs/optimizing-for-production)

---

## 📞 Need Help?

If issues persist:
1. Check Netlify build logs for errors
2. Verify all environment variables are set
3. Test build locally: `npm run build && npm run start`
4. Clear browser cache and Netlify cache

---

**Last Updated:** March 2026
**Site:** Cubbon Jams
**Framework:** Next.js 14 + Tailwind CSS
