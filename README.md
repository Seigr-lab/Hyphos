# Hyphos

Self-hosting bio-inspired programming language with protocol-based architecture.

## Overview

Hyphos is a programming language specification implemented as protocol buffer definitions. The language features bio-inspired syntax, senary mathematics, and consciousness-aware operations.

**File Extension**: `.hyph`  
**Status**: Self-hosting protocol implementation complete  
**Bootstrap**: Functional Python interpreter available

## Current Implementation

### Protocol Files

- **374 total protocol files** (.hyph format)
- **362 metaword definitions** covering complete vocabulary
- **5 base modules** consolidating common operations
- **7 engine protocols** for self-hosting architecture

### Bootstrap Interpreter

- **Python interpreter** (`bootstrap_interpreter.py`) for immediate testing
- **Loads all 362 metawords** and base protocol modules
- **Supports consciousness levels** (0-5 senary scale)
- **Parses senary mathematics** and metaword operations
- **Test framework** with `.hyph` file execution

## Language Features

### Core Types

- `noesis` - Consciousness/AI operations
- `chemical` - Biological network interface
- `mycelial` - Fungal network operations
- `quantum` - Quantum-inspired operations
- `senary` - Base-6 mathematics

### Control Flow

- `mycelial_for` - Organic iteration
- `branch_if` - Conditional branching
- `evolve_when` - Adaptive loops
- `organism_spawn` - Process creation

### Architecture

- **Protocol-first design** using .hyph format
- **Senary-compliant** enum values (0-5)
- **Self-hosting engine** defined in pure .hyph protocols
- **Consciousness emergence** built into core operations

## Testing

Run basic tests:

```bash
# From Seigr-EcoSystem root directory
python hyphos/bootstrap_interpreter.py hyphos/tests/basic_hyphos_test.hyph
```

Run comprehensive tests:

```bash
python hyphos/bootstrap_interpreter.py hyphos/tests/comprehensive_hyphos_test.hyph
```

Example test output:

- Consciousness Level: 4 (Intelligence)
- Protocols Loaded: 5
- Metawords Loaded: 362
- Operations: consciousness.create(), noesis.process(), protocol.validate()

## Directory Structure

```text
core/protocols/
├── base_modules/          # 5 consolidated base operations
│   ├── consciousness_operations.hyph
│   ├── bio_digital_operations.hyph
│   ├── senary_mathematics.hyph
│   ├── energy_operations.hyph
│   └── protocol_integration.hyph
└── metawords/            # 362 metaword definitions
    ├── consciousness.hyph
    ├── noesis.hyph
    ├── senary.hyph
    └── ...

engine/                   # 7 self-hosting engine protocols
├── bootstrap.hyph
├── hyphos_engine.hyph
├── protocol_parser.hyph
└── ...

tests/                    # Test framework
├── basic_hyphos_test.hyph
└── comprehensive_hyphos_test.hyph

bootstrap_interpreter.py  # Python interpreter for testing
```

## Documentation

- **Language specification**: `language_specification/`
- **Metaword definitions**: `language_specification/syntax/`
- **Protocol mappings**: Core protocol files with enum definitions
- **Engine architecture**: `engine/` directory protocols
