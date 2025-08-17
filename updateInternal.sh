for dir in packages/@markdown-ui/*/; do
    echo "Updating $dir"
    cd "$dir" && npx npm-check-updates -u && npm install && cd - > /dev/null
  done