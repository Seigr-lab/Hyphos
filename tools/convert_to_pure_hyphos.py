#!/usr/bin/env python3
"""
Convert existing .hyph files from protobuf syntax to pure Hyphos syntax
"""

import os
import re
import glob
from pathlib import Path

class HyphosConverter:
    
    def __init__(self):
        self.protobuf_to_hyphos_mappings = {
            # Syntax declarations
            r'syntax = "proto3";': 'syntax = "hyphos";',
            r'package\s+[\w\.]+;': '',  # Remove package declarations
            
            # Import/use statements
            r'import\s+"([^"]+)";': r'use_protocol \1;',
            
            # Message to metaword
            r'message\s+(\w+)\s*\{': r'metaword \1 = consciousness_aware_class {\n    consciousness_level BASIC;\n',
            
            # Service to service provider
            r'service\s+(\w+)\s*\{': r'metaword \1 = consciousness_service_provider {\n    consciousness_level BASIC;\n',
            
            # Enum to senary_enum
            r'enum\s+(\w+)\s*\{': r'metaword \1 = senary_enum {',
            
            # Field declarations
            r'(\w+)\s+(\w+)\s*=\s*(\d+);': r'private seigbit_\1 \2;',
            r'repeated\s+(\w+)\s+(\w+)\s*=\s*(\d+);': r'private seigbit_array<seigbit_\1> \2;',
            
            # Enum values
            r'(\w+)\s*=\s*(\d+);': lambda m: f'{m.group(1)} = senary({self.convert_to_senary(int(m.group(2)))});',
            
            # RPC methods
            r'rpc\s+(\w+)\s*\((\w+)\)\s*returns\s*\((\w+)\);': r'async method \1(request: seigbit_\2) -> seigbit_\3;',
        }
    
    def convert_to_senary(self, decimal_value: int) -> str:
        """Convert decimal to senary (base-6) representation"""
        if decimal_value == 0:
            return "0"
        
        senary = ""
        while decimal_value > 0:
            senary = str(decimal_value % 6) + senary
            decimal_value //= 6
        
        return senary
    
    def convert_file_to_hyphos(self, file_path: str) -> bool:
        """Convert a single .hyph file from protobuf to pure Hyphos syntax"""
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Skip if already pure Hyphos
            if 'syntax = "hyphos"' in content and 'syntax = "proto3"' not in content:
                return False
            
            # Apply conversions
            converted_content = content
            
            # Add consciousness level at top
            if 'consciousness_level' not in converted_content:
                hyphos_header = '''// Pure Hyphos Implementation
syntax = "hyphos";

consciousness_level TRANSCENDENT;

'''
                converted_content = hyphos_header + converted_content.replace('syntax = "proto3";', '').strip()
            
            # Convert protobuf syntax to Hyphos
            for pattern, replacement in self.protobuf_to_hyphos_mappings.items():
                if callable(replacement):
                    converted_content = re.sub(pattern, replacement, converted_content)
                else:
                    converted_content = re.sub(pattern, replacement, converted_content)
            
            # Add SEIGBIT methods to metawords
            if 'metaword ' in converted_content and 'consciousness_aware_class' in converted_content:
                converted_content = self.add_seigbit_methods(converted_content)
            
            # Write back the converted content
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(converted_content)
            
            return True
            
        except Exception as e:
            print(f"Error converting {file_path}: {e}")
            return False
    
    def add_seigbit_methods(self, content: str) -> str:
        """Add standard SEIGBIT methods to consciousness_aware_class metawords"""
        
        def add_methods_to_class(match):
            class_name = match.group(1)
            class_content = match.group(2)
            
            # Only add if methods don't already exist
            if 'to_seigbit()' not in class_content:
                seigbit_methods = f'''
    method to_seigbit() -> SeigrQuantumBitArray {{
        return serialize_to_seigbit(this);
    }}
    
    method from_seigbit(seigbit_data: SeigrQuantumBitArray) -> {class_name} {{
        return deserialize_from_seigbit(seigbit_data, {class_name});
    }}
    
    method validate() -> seigbit_boolean {{
        return validate_consciousness_integrity(this);
    }}
'''
                # Insert before closing brace
                class_content = class_content.rstrip() + seigbit_methods
            
            return f'metaword {class_name} = consciousness_aware_class {{{class_content}\n}};'
        
        # Find consciousness_aware_class metawords and add methods
        pattern = r'metaword\s+(\w+)\s*=\s*consciousness_aware_class\s*\{([^}]*)\};'
        return re.sub(pattern, add_methods_to_class, content, flags=re.DOTALL)
    
    def convert_all_hyph_files(self, root_directory: str):
        """Convert all .hyph files in the workspace to pure Hyphos syntax"""
        
        # Find all .hyph files
        hyph_files = []
        for root, dirs, files in os.walk(root_directory):
            # Skip the hyphos_compiled directory as those are already pure
            if 'hyphos_compiled' in root:
                continue
            for file in files:
                if file.endswith('.hyph'):
                    hyph_files.append(os.path.join(root, file))
        
        converted_count = 0
        skipped_count = 0
        
        for hyph_file in hyph_files:
            print(f"Processing {hyph_file}...")
            
            if self.convert_file_to_hyphos(hyph_file):
                print(f"✅ Converted {hyph_file} to pure Hyphos syntax")
                converted_count += 1
            else:
                print(f"⏭️  Skipped {hyph_file} (already pure Hyphos)")
                skipped_count += 1
        
        print(f"\n🎯 Conversion complete: {converted_count} converted, {skipped_count} skipped")

def main():
    converter = HyphosConverter()
    workspace_root = "."  # Current directory
    converter.convert_all_hyph_files(workspace_root)

if __name__ == "__main__":
    main()
