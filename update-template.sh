#!/bin/bash
# Update webpack template with new redesign structure

cp /home/bba/0-projects/cocodedk/index.html /home/bba/0-projects/cocodedk/templates/template.html

echo "✓ Template updated, rebuilding..."
npm run build

echo "✓ Build complete! Hard refresh your browser."

