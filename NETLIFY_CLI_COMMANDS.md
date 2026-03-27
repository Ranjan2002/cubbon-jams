# 🚀 Netlify CLI Commands - Clear Cache & Deploy

## Quick Commands:

### Step 1: Install Netlify CLI (if not installed)
```powershell
npm install -g netlify-cli
```

### Step 2: Login to Netlify
```powershell
netlify login
```
This will open your browser for authentication.

### Step 3: Link to your site (first time only)
```powershell
cd "c:\cubbon jams"
netlify link
```
Select your site from the list.

### Step 4: Clear cache and deploy
```powershell
netlify deploy --prod --build
```

This will:
- Clear the build cache
- Run `npm install`
- Run `npm run build`
- Deploy to production

---

## Alternative: Manual cache clear

Unfortunately, Netlify CLI doesn't have a direct "clear cache" command. But you can:

### Option A: Use the API
```powershell
# Get your site ID
netlify status

# Then manually trigger deploy in dashboard
```

### Option B: Force rebuild
```powershell
# Make a dummy commit
echo "# Rebuild $(Get-Date)" >> README.md
git add README.md
git commit -m "chore: Force rebuild"
git push origin main

# Then watch the deploy
netlify watch
```

---

## Complete Workflow:

```powershell
# 1. Navigate to project
cd "c:\cubbon jams"

# 2. Install Netlify CLI (if needed)
npm install -g netlify-cli

# 3. Login
netlify login

# 4. Deploy with build
netlify deploy --prod --build

# 5. Watch status
netlify open
```

---

## Check deployment status:

```powershell
# View site status
netlify status

# Open site in browser
netlify open:site

# Open admin dashboard
netlify open:admin

# View recent deploys
netlify deploy:list
```

---

## If you get "Site not linked" error:

```powershell
# Link to existing site
netlify link

# Or unlink and relink
netlify unlink
netlify link
```

---

## Full command sequence:

```powershell
cd "c:\cubbon jams"
netlify login
netlify deploy --prod --build
```

That's it! The deploy will automatically clear cache and rebuild.
