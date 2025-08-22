# Hyphos Language Support for VS Code

Complete development environment for the Hyphos programming language with syntax highlighting, autocomplete, and integrated runtime.

## Features

### 🎨 Syntax Highlighting
- Full Hyphos language syntax support
- Special highlighting for senary (base-6) numbers
- Metaword recognition and coloring
- Dark theme optimized for Hyphos development

### 🚀 Code Intelligence
- Autocomplete for all 38 core metawords
- Hover documentation for metawords
- Syntax validation and error detection
- Code snippets for common patterns

### ⚡ Integrated Runtime
- Run Hyphos files directly from VS Code (Ctrl+F5)
- Syntax checking with detailed diagnostics
- Terminal integration with bootstrap interpreter

### 🧩 Core Metawords Supported
- **senary** - Base-6 mathematical operations
- **temporal** - Time manipulation and flow control
- **spatial** - Coordinate systems and transformations
- **noesis** - AI consciousness processing
- **graphics** - Visual rendering operations
- **energy** - Energy field manipulation
- **network_stack** - Network communication
- **quantum_field** - Quantum operations
- **consciousness** - Awareness processing
- **holistic** - System balance integration
- **harmonic** - Resonance and frequency operations

## Installation

1. Install the extension in VS Code
2. Ensure Python is available in your system PATH
3. Open a Hyphos workspace with `bootstrap_interpreter.py`

## Usage

### Creating Hyphos Files
1. Create a new file with `.hyph` extension
2. Start typing to get autocomplete suggestions
3. Use snippets like `invoke` for quick metaword patterns

### Running Code
- Press `Ctrl+F5` to run the current Hyphos file
- Use `Hyphos: Check Syntax` command for validation
- View output in the integrated terminal

### Code Examples

```hyphos
# Basic metaword invocation
invoke senary:
    base6_add(12s, 34s)
    transcend

# Consciousness processing
invoke noesis:
    conscious_reflect(input_data)
    neural_process(pattern)
    transcend

# Graphics rendering
invoke graphics:
    render_visual(scene_data)
    coordinate_transform(coords)
    transcend
```

## Architecture

This extension provides:
- Language grammar for syntax highlighting
- Completion providers for metawords
- Hover providers for documentation
- Command integration with Hyphos runtime
- Theme optimized for Hyphos syntax

## Development

The extension integrates with the Hyphos bootstrap interpreter and provides a complete development environment for building Seigr ecosystem applications.

## License

Part of the Seigr ecosystem - refer to repository license.
