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
  
  # Define build order: dependencies first, then framework packages
  local build_order=("mdui-lang" "marked-ext")
  
  # Add all remaining packages to build order
  for dir in packages/@markdown-ui/*/; do
    package_name=$(basename "$dir")
    # Skip if already in build_order
    if [[ ! " ${build_order[@]} " =~ " ${package_name} " ]]; then
      build_order+=("$package_name")
    fi
  done
  
  # Build packages in order
  for package in "${build_order[@]}"; do
    if [[ -d "packages/@markdown-ui/$package" ]]; then
      echo "Building $package..."
      if [[ -f "packages/@markdown-ui/$package/package.json" ]] && grep -q '"build"' "packages/@markdown-ui/$package/package.json"; then
        cd "packages/@markdown-ui/$package" && npm run build && cd - > /dev/null
      else
        echo "  ⚠️  No build script found for $package, skipping..."
      fi
    fi
  done
  
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
  
  # Use same build order for publishing to respect dependencies
  local publish_order=("mdui-lang" "marked-ext")
  
  # Add all remaining packages to publish order
  for dir in packages/@markdown-ui/*/; do
    package_name=$(basename "$dir")
    # Skip if already in publish_order
    if [[ ! " ${publish_order[@]} " =~ " ${package_name} " ]]; then
      publish_order+=("$package_name")
    fi
  done
  
  # Publish packages in order
  for package in "${publish_order[@]}"; do
    if [[ -d "packages/@markdown-ui/$package" ]]; then
      echo "Publishing @markdown-ui/$package..."
      if [[ -f "packages/@markdown-ui/$package/package.json" ]]; then
        cd "packages/@markdown-ui/$package" && npm publish && cd - > /dev/null
        echo "✅ Published @markdown-ui/$package"
      else
        echo "  ⚠️  No package.json found for $package, skipping..."
      fi
    fi
  done
  
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