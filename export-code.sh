#!/bin/bash

# Kashoe Chess Club - Code Export Script
# This script helps you view or export all the code

echo "=========================================="
echo "  Kashoe Chess Club - Code Exporter"
echo "=========================================="
echo ""

# Function to display menu
show_menu() {
    echo "What would you like to do?"
    echo ""
    echo "1) View Backend Code (server.py)"
    echo "2) View Frontend Pages"
    echo "3) View Components"
    echo "4) Create ZIP archive of entire project"
    echo "5) Copy all files to a new directory"
    echo "6) Show project structure"
    echo "7) Exit"
    echo ""
}

# Main loop
while true; do
    show_menu
    read -p "Enter your choice (1-7): " choice
    echo ""
    
    case $choice in
        1)
            echo "📄 Backend Code (server.py):"
            echo "─────────────────────────────"
            cat /app/backend/server.py
            echo ""
            read -p "Press Enter to continue..."
            ;;
        2)
            echo "📄 Frontend Pages:"
            echo "─────────────────────────────"
            for file in /app/frontend/src/pages/*.jsx; do
                echo ""
                echo "=== $(basename $file) ==="
                cat "$file"
                echo ""
            done
            read -p "Press Enter to continue..."
            ;;
        3)
            echo "📄 Components:"
            echo "─────────────────────────────"
            for file in /app/frontend/src/components/*.jsx; do
                echo ""
                echo "=== $(basename $file) ==="
                cat "$file"
                echo ""
            done
            read -p "Press Enter to continue..."
            ;;
        4)
            echo "📦 Creating ZIP archive..."
            cd /app
            zip -r kashoe-chess-club.zip \
                backend/ \
                frontend/src/ \
                frontend/public/ \
                frontend/package.json \
                frontend/tailwind.config.js \
                frontend/postcss.config.js \
                scripts/ \
                README.md \
                CODE_GUIDE.md \
                -x "*/node_modules/*" "*/yarn.lock" "*/__pycache__/*" "*/.git/*"
            echo "✅ Created kashoe-chess-club.zip"
            echo "📍 Location: /app/kashoe-chess-club.zip"
            read -p "Press Enter to continue..."
            ;;
        5)
            read -p "Enter destination directory path: " dest_dir
            if [ ! -d "$dest_dir" ]; then
                mkdir -p "$dest_dir"
            fi
            echo "📋 Copying files to $dest_dir..."
            cp -r /app/backend "$dest_dir/"
            cp -r /app/frontend "$dest_dir/"
            cp -r /app/scripts "$dest_dir/"
            cp /app/README.md "$dest_dir/"
            cp /app/CODE_GUIDE.md "$dest_dir/"
            echo "✅ Files copied successfully!"
            read -p "Press Enter to continue..."
            ;;
        6)
            echo "📁 Project Structure:"
            echo "─────────────────────────────"
            tree -L 3 -I 'node_modules|__pycache__|.git' /app || find /app -maxdepth 3 -type f -o -type d | head -50
            echo ""
            read -p "Press Enter to continue..."
            ;;
        7)
            echo "👋 Thank you for using Kashoe Chess Club!"
            echo "Your complete website is ready to deploy!"
            exit 0
            ;;
        *)
            echo "❌ Invalid choice. Please try again."
            ;;
    esac
    
    clear
done
