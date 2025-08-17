#!/bin/bash
set -e

# Function to update dependencies
update_dependencies() {
  echo "🔄 Updating dependencies for all packages..."
  for dir in packages/@markdown-ui/*/; do
    echo "Updating $dir"
    cd "$dir" && npx npm-check-updates -u && npm install && cd - > /dev/null
  done
  echo "✅ Dependencies updated"
}

# Function to build packages in dependency order
build_packages() {
  echo "🏗️  Building packages..."
  
  # Build mdui-lang first (no dependencies)
  echo "Building mdui-lang..."
  cd packages/@markdown-ui/mdui-lang && npm run build && cd - > /dev/null
  
  # Build marked-ext (depends on mdui-lang)
  echo "Building marked-ext..."
  cd packages/@markdown-ui/marked-ext && npm run build && cd - > /dev/null
  
  # Build react package
  echo "Building react..."
  cd packages/@markdown-ui/react && npm run build && cd - > /dev/null
  
  echo "✅ All packages built successfully"
}

# Function to bump package versions
bump_versions() {
  echo "⬆️  Bumping minor versions for all packages..."
  
  for dir in packages/@markdown-ui/*/; do
    package_name=$(basename "$dir")
    echo "Bumping version for $package_name..."
    cd "$dir" && npm version patch && cd - > /dev/null
  done
  
  echo "✅ All package versions bumped"
}

# Function to publish packages
publish_packages() {
  echo "📦 Publishing packages..."
  
  # Publish mdui-lang
  echo "Publishing @markdown-ui/mdui-lang..."
  cd packages/@markdown-ui/mdui-lang && npm publish && cd - > /dev/null
  echo "✅ Published @markdown-ui/mdui-lang"
  
  # Publish marked-ext
  echo "Publishing @markdown-ui/marked-ext..."
  cd packages/@markdown-ui/marked-ext && npm publish && cd - > /dev/null
  echo "✅ Published @markdown-ui/marked-ext"
  
  # Publish react
  echo "Publishing @markdown-ui/react..."
  cd packages/@markdown-ui/react && npm publish && cd - > /dev/null
  echo "✅ Published @markdown-ui/react"
  
  echo "✅ Publishing complete"
}

# Parse command line arguments
COMMAND=${1:-"deps"}

case $COMMAND in
  "deps"|"dependencies")
    update_dependencies
    ;;
  "build")
    build_packages
    ;;
  "publish")
    bump_versions
    build_packages
    publish_packages
    ;;
  "all")
    update_dependencies
    build_packages
    ;;
  *)
    echo "Usage: $0 [deps|build|publish|all]"
    echo ""
    echo "Commands:"
    echo "  deps        Update dependencies (default)"
    echo "  build       Build all packages"
    echo "  publish     Bump versions, build and publish packages (requires NPM_TOKEN)"
    echo "  all         Update dependencies and build packages"
    exit 1
    ;;
esac