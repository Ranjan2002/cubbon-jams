#!/usr/bin/env node

// CSS Debug Test
console.log('🔍 Checking CSS Configuration...\n');

const fs = require('fs');
const path = require('path');

// Check if Tailwind config exists
const tailwindConfig = path.join(__dirname, 'tailwind.config.ts');
if (fs.existsSync(tailwindConfig)) {
  console.log('✅ tailwind.config.ts exists');
} else {
  console.log('❌ tailwind.config.ts missing!');
}

// Check if PostCSS config exists
const postcssConfig = path.join(__dirname, 'postcss.config.mjs');
if (fs.existsSync(postcssConfig)) {
  console.log('✅ postcss.config.mjs exists');
} else {
  console.log('❌ postcss.config.mjs missing!');
}

// Check if globals.css exists
const globalsCss = path.join(__dirname, 'src', 'app', 'globals.css');
if (fs.existsSync(globalsCss)) {
  console.log('✅ src/app/globals.css exists');
  const content = fs.readFileSync(globalsCss, 'utf-8');
  if (content.includes('@tailwind base')) {
    console.log('  ✅ Contains @tailwind base');
  } else {
    console.log('  ❌ Missing @tailwind base!');
  }
  if (content.includes('@tailwind components')) {
    console.log('  ✅ Contains @tailwind components');
  } else {
    console.log('  ❌ Missing @tailwind components!');
  }
  if (content.includes('@tailwind utilities')) {
    console.log('  ✅ Contains @tailwind utilities');
  } else {
    console.log('  ❌ Missing @tailwind utilities!');
  }
} else {
  console.log('❌ src/app/globals.css missing!');
}

// Check if layout.tsx imports globals.css
const layoutPath = path.join(__dirname, 'src', 'app', 'layout.tsx');
if (fs.existsSync(layoutPath)) {
  console.log('✅ src/app/layout.tsx exists');
  const content = fs.readFileSync(layoutPath, 'utf-8');
  if (content.includes('./globals.css')) {
    console.log('  ✅ Imports ./globals.css');
  } else {
    console.log('  ❌ Does NOT import globals.css!');
  }
} else {
  console.log('❌ src/app/layout.tsx missing!');
}

// Check node_modules
const nodeModules = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModules)) {
  console.log('✅ node_modules exists');
  
  const tailwindcss = path.join(nodeModules, 'tailwindcss');
  if (fs.existsSync(tailwindcss)) {
    console.log('  ✅ tailwindcss installed');
  } else {
    console.log('  ❌ tailwindcss NOT installed!');
  }
  
  const postcss = path.join(nodeModules, 'postcss');
  if (fs.existsSync(postcss)) {
    console.log('  ✅ postcss installed');
  } else {
    console.log('  ❌ postcss NOT installed!');
  }
} else {
  console.log('❌ node_modules missing! Run: npm install');
}

console.log('\n📋 Summary:');
console.log('If all checks pass, CSS should be working.');
console.log('If CSS still not loading, try:');
console.log('1. Delete .next folder: rm -rf .next');
console.log('2. Restart dev server: npm run dev');
