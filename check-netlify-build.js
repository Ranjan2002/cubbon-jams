const fs = require('fs');
const path = require('path');

console.log('\n🔍 Checking Netlify Build Output...\n');

// Check if .next exists
const nextDir = path.join(__dirname, '.next');
if (!fs.existsSync(nextDir)) {
  console.log('❌ .next directory not found! Run npm run build first.');
  process.exit(1);
}

console.log('✅ .next directory exists\n');

// Check for CSS files
const staticCssPath = path.join(nextDir, 'static', 'css');
if (fs.existsSync(staticCssPath)) {
  const cssFiles = fs.readdirSync(staticCssPath, { recursive: true });
  console.log('📁 CSS files found:');
  cssFiles.forEach(file => {
    if (file.endsWith('.css')) {
      const fullPath = path.join(staticCssPath, file);
      const size = fs.statSync(fullPath).size;
      console.log(`   ${file} (${(size / 1024).toFixed(2)} KB)`);
      
      // Read first 500 chars to check content
      const content = fs.readFileSync(fullPath, 'utf8').substring(0, 500);
      if (content.includes('@tailwind')) {
        console.log('   ⚠️  WARNING: Contains raw @tailwind directives!');
      } else if (content.includes('.bg-primary') || content.includes('--tw-')) {
        console.log('   ✅ Contains compiled Tailwind CSS');
      }
    }
  });
} else {
  console.log('❌ No static/css directory found!');
}

// Check build manifest
const manifestPath = path.join(nextDir, 'build-manifest.json');
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  console.log('\n📄 Layout CSS in manifest:');
  if (manifest.pages && manifest.pages['/_app']) {
    console.log('   App CSS:', manifest.pages['/_app'].filter(f => f.endsWith('.css')));
  }
  if (manifest.rootMainFiles) {
    console.log('   Root CSS:', manifest.rootMainFiles.filter(f => f.endsWith('.css')));
  }
}

// Check PostCSS config
const postcssJs = path.join(__dirname, 'postcss.config.js');
const postcssMjs = path.join(__dirname, 'postcss.config.mjs');

console.log('\n⚙️  PostCSS Configuration:');
if (fs.existsSync(postcssJs)) {
  console.log('   ✅ postcss.config.js found');
}
if (fs.existsSync(postcssMjs)) {
  console.log('   ⚠️  postcss.config.mjs still exists (should be deleted!)');
}

console.log('\n✨ Check complete!\n');
