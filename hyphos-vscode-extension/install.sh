# Install VS Code Extension CLI (if not already installed)
# npm install -g vsce

# Package the extension
vsce package

# Install the extension locally
code --install-extension hyphos-language-support-0.1.0.vsix

echo "Hyphos VS Code extension installed successfully!"
echo "Create a .hyph file and start developing with Hyphos!"
