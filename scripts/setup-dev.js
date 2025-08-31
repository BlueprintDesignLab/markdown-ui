#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const packages = [
  { name: '@markdown-ui/marked-ext', path: 'packages/@markdown-ui/marked-ext' },
  { name: '@markdown-ui/svelte', path: 'packages/@markdown-ui/svelte' },
  { name: '@markdown-ui/react', path: 'packages/@markdown-ui/react' },
  { name: '@markdown-ui/vue', path: 'packages/@markdown-ui/vue' }
];

function updatePackageForDev() {
  // Update marked-ext to use local mdui-lang
  const markedExtPkg = JSON.parse(fs.readFileSync('packages/@markdown-ui/marked-ext/package.json', 'utf8'));
  markedExtPkg.dependencies['@markdown-ui/mdui-lang'] = 'file:../mdui-lang';
  fs.writeFileSync('packages/@markdown-ui/marked-ext/package.json', JSON.stringify(markedExtPkg, null, 2));

  // Update demo-page to use local packages
  const demoPkg = JSON.parse(fs.readFileSync('demo-page/package.json', 'utf8'));
  packages.forEach(pkg => {
    demoPkg.dependencies[pkg.name] = `file:../${pkg.path}`;
  });
  demoPkg.dependencies['@markdown-ui/mdui-lang'] = 'file:../packages/@markdown-ui/mdui-lang';
  fs.writeFileSync('demo-page/package.json', JSON.stringify(demoPkg, null, 2));

  console.log('✅ Updated packages for local development');
  console.log('Run: npm install && npm run build:all');
}

function updatePackageForProd() {
  // Revert marked-ext to published version
  const markedExtPkg = JSON.parse(fs.readFileSync('packages/@markdown-ui/marked-ext/package.json', 'utf8'));
  markedExtPkg.dependencies['@markdown-ui/mdui-lang'] = '^0.2.10';
  fs.writeFileSync('packages/@markdown-ui/marked-ext/package.json', JSON.stringify(markedExtPkg, null, 2));

  // Revert demo-page to published versions
  const demoPkg = JSON.parse(fs.readFileSync('demo-page/package.json', 'utf8'));
  demoPkg.dependencies['@markdown-ui/marked-ext'] = '^1.1.11';
  demoPkg.dependencies['@markdown-ui/mdui-lang'] = '^0.2.10';
  demoPkg.dependencies['@markdown-ui/react'] = '^0.1.12';
  demoPkg.dependencies['@markdown-ui/svelte'] = '^0.1.12';
  demoPkg.dependencies['@markdown-ui/vue'] = '^0.1.12';
  fs.writeFileSync('demo-page/package.json', JSON.stringify(demoPkg, null, 2));

  console.log('✅ Updated packages for production/publishing');
}

const mode = process.argv[2];
if (mode === 'dev') {
  updatePackageForDev();
} else if (mode === 'prod') {
  updatePackageForProd();
} else {
  console.log('Usage: node scripts/setup-dev.js [dev|prod]');
  console.log('  dev  - Setup for local development');
  console.log('  prod - Setup for publishing/deployment');
}