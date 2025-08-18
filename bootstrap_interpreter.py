#!/usr/bin/env python3
"""
Hyphos Bootstrap Interpreter - Minimal Runtime for Testing

This is a temporary bootstrap interpreter that can parse and execute
basic .hyph protocol files for testing purposes. Once the self-hosting
engine is mature, this bootstrap will be replaced.

IMPORTANT: This is NOT part of the final Hyphos implementation.
This is purely a development tool to enable testing.
"""

import sys
import os
import re
import logging
from pathlib import Path
from typing import Dict, List, Any, Optional

# Add Seigr ecosystem path for imports
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

# Import Seigr mathematics for senary operations
try:
    from src.seigr_math.senary_numbers import SenaryNumber
    from src.seigr_math.senary_arrays import SenaryArray
    from src.seigr_math.seigr_time.sidereal_core import current_seigr_time
    from src.logger.base_logger import get_base_logger
    SEIGR_AVAILABLE = True
except ImportError as e:
    print(f"Warning: Could not import Seigr modules: {e}")
    print("Run from Seigr-EcoSystem root directory")
    SEIGR_AVAILABLE = False

class HyphosBootstrapInterpreter:
    """Minimal interpreter for .hyph protocol files"""
    
    def __init__(self):
        self.logger = get_base_logger() if SEIGR_AVAILABLE else None
        self.protocol_registry = {}
        self.metaword_registry = {}
        self.consciousness_level = 0  # Start dormant
        
        # Load core protocols
        self._load_core_protocols()
        
    def _log(self, level, message):
        """Safe logging that works with or without Seigr logger"""
        if self.logger:
            self.logger.log_message(level, message, "HyphosBootstrap")
        else:
            print(f"[{level}] {message}")
    
    def _load_core_protocols(self):
        """Load base protocol definitions"""
        try:
            # Determine the base path for hyphos files
            current_dir = Path.cwd()
            if current_dir.name == "hyphos":
                hyphos_base = current_dir
            else:
                hyphos_base = current_dir / "hyphos"
                
            # Load base modules first
            base_module_path = hyphos_base / "core/protocols/base_modules"
            if base_module_path.exists():
                for hyph_file in base_module_path.glob("*.hyph"):
                    self._parse_protocol_file(hyph_file)
                    
            # Load metawords
            metaword_path = hyphos_base / "core/protocols/metawords"  
            if metaword_path.exists():
                for hyph_file in metaword_path.glob("*.hyph"):
                    self._parse_metaword_file(hyph_file)
                    
            self._log(logging.INFO, f"Loaded {len(self.protocol_registry)} protocols and {len(self.metaword_registry)} metawords")
            
        except Exception as e:
            self._log(logging.ERROR, f"Failed to load core protocols: {e}")
    
    def _parse_protocol_file(self, file_path: Path):
        """Parse a .hyph protocol file"""
        try:
            content = file_path.read_text(encoding='utf-8')
            
            # Extract package name
            package_match = re.search(r'package\s+([^;]+);', content)
            if package_match:
                package_name = package_match.group(1)
                self.protocol_registry[package_name] = {
                    'file': str(file_path),
                    'content': content,
                    'enums': self._extract_enums(content),
                    'messages': self._extract_messages(content)
                }
                
        except Exception as e:
            self._log(logging.ERROR, f"Failed to parse {file_path}: {e}")
    
    def _parse_metaword_file(self, file_path: Path):
        """Parse a metaword .hyph file"""
        try:
            content = file_path.read_text(encoding='utf-8')
            metaword_name = file_path.stem
            
            # Extract operations from enum definitions
            operations = []
            enum_matches = re.finditer(r'enum\s+\w+\s*{([^}]+)}', content, re.DOTALL)
            for match in enum_matches:
                enum_content = match.group(1)
                ops = re.findall(r'(\w+)\s*=\s*(\d+);', enum_content)
                operations.extend(ops)
            
            self.metaword_registry[metaword_name] = {
                'file': str(file_path),
                'operations': operations,
                'content': content
            }
            
        except Exception as e:
            self._log(logging.ERROR, f"Failed to parse metaword {file_path}: {e}")
    
    def _extract_enums(self, content: str) -> Dict[str, List[str]]:
        """Extract enum definitions from protocol content"""
        enums = {}
        enum_pattern = r'enum\s+(\w+)\s*{([^}]+)}'
        
        for match in re.finditer(enum_pattern, content, re.DOTALL):
            enum_name = match.group(1)
            enum_content = match.group(2)
            
            # Extract enum values
            values = []
            value_pattern = r'(\w+)\s*=\s*(\d+);'
            for value_match in re.finditer(value_pattern, enum_content):
                values.append((value_match.group(1), int(value_match.group(2))))
            
            enums[enum_name] = values
            
        return enums
    
    def _extract_messages(self, content: str) -> Dict[str, List[str]]:
        """Extract message definitions from protocol content"""
        messages = {}
        message_pattern = r'message\s+(\w+)\s*{([^}]+)}'
        
        for match in re.finditer(message_pattern, content, re.DOTALL):
            message_name = match.group(1)
            message_content = match.group(2)
            
            # Extract field definitions
            fields = []
            field_pattern = r'(\w+)\s+(\w+)\s*=\s*(\d+);'
            for field_match in re.finditer(field_pattern, message_content):
                fields.append({
                    'type': field_match.group(1),
                    'name': field_match.group(2), 
                    'number': int(field_match.group(3))
                })
            
            messages[message_name] = fields
            
        return messages
    
    def execute_hyphos_test(self, test_content: str) -> Dict[str, Any]:
        """Execute a simple Hyphos test"""
        try:
            # Parse consciousness level
            consciousness_match = re.search(r'consciousness\.level\((\d+)\)', test_content)
            if consciousness_match:
                self.consciousness_level = int(consciousness_match.group(1))
                self._log(logging.INFO, f"Consciousness level set to {self.consciousness_level}")
            
            # Parse senary operations
            senary_matches = re.findall(r'senary\.(\w+)\(([^)]+)\)', test_content)
            results = {}
            
            for operation, params in senary_matches:
                try:
                    if SEIGR_AVAILABLE and 'SenaryNumber' in globals():
                        # Use actual Seigr senary math
                        if operation == 'add':
                            args = [p.strip().strip('"') for p in params.split(',')]
                            if len(args) >= 2:
                                num1 = SenaryNumber(args[0])
                                num2 = SenaryNumber(args[1])
                                result = num1 + num2
                                results[f"senary_{operation}"] = str(result)
                        
                        elif operation == 'current_time':
                            if 'current_seigr_time' in globals():
                                time_result = current_seigr_time()
                                results[f"senary_{operation}"] = str(time_result)
                    else:
                        # Mock implementation for testing
                        results[f"senary_{operation}"] = f"mock_result_{operation}"
                        
                except Exception as e:
                    self._log(logging.ERROR, f"Senary operation {operation} failed: {e}")
                    results[f"senary_{operation}"] = f"error: {e}"
            
            # Parse metaword operations
            metaword_matches = re.findall(r'(\w+)\.(\w+)\(\)', test_content)
            for metaword, operation in metaword_matches:
                if metaword in self.metaword_registry:
                    metaword_ops = dict(self.metaword_registry[metaword]['operations'])
                    if operation.upper() in metaword_ops:
                        results[f"{metaword}_{operation}"] = f"executed with code {metaword_ops[operation.upper()]}"
                    else:
                        results[f"{metaword}_{operation}"] = f"operation not found"
                else:
                    results[f"{metaword}_{operation}"] = f"metaword not loaded"
            
            return {
                'status': 'success',
                'consciousness_level': self.consciousness_level,
                'results': results,
                'protocols_loaded': len(self.protocol_registry),
                'metawords_loaded': len(self.metaword_registry)
            }
            
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e),
                'consciousness_level': self.consciousness_level
            }
    
    def list_available_metawords(self) -> List[str]:
        """List all loaded metawords"""
        return list(self.metaword_registry.keys())
    
    def get_metaword_operations(self, metaword: str) -> List[str]:
        """Get operations for a specific metaword"""
        if metaword in self.metaword_registry:
            return [op[0] for op in self.metaword_registry[metaword]['operations']]
        return []

def main():
    """CLI interface for bootstrap interpreter"""
    print("🌟 Hyphos Bootstrap Interpreter")
    print("=" * 50)
    
    interpreter = HyphosBootstrapInterpreter()
    
    if len(sys.argv) > 1:
        # Execute test file
        test_file = Path(sys.argv[1])
        if test_file.exists():
            test_content = test_file.read_text()
            result = interpreter.execute_hyphos_test(test_content)
            
            print(f"Test Results: {result['status']}")
            print(f"Consciousness Level: {result.get('consciousness_level', 0)}")
            print(f"Protocols Loaded: {result.get('protocols_loaded', 0)}")
            print(f"Metawords Loaded: {result.get('metawords_loaded', 0)}")
            
            if 'results' in result:
                print("\nOperation Results:")
                for key, value in result['results'].items():
                    print(f"  {key}: {value}")
            
            if 'error' in result:
                print(f"Error: {result['error']}")
        else:
            print(f"Test file not found: {test_file}")
    else:
        # Interactive mode
        print(f"Loaded {len(interpreter.metaword_registry)} metawords:")
        for metaword in sorted(interpreter.list_available_metawords())[:10]:
            ops = interpreter.get_metaword_operations(metaword)
            print(f"  {metaword}: {len(ops)} operations")
        
        if len(interpreter.list_available_metawords()) > 10:
            print(f"  ... and {len(interpreter.list_available_metawords()) - 10} more")
        
        print("\nReady for Hyphos testing!")
        print("Usage: python bootstrap_interpreter.py <test_file.hyph>")

if __name__ == "__main__":
    main()
