#!/usr/bin/env python3
"""
Proto-to-Hyphos Compiler Implementation
Converts .proto files to 100% pure Hyphos .hyph files
"""

import os
import re
import glob
from pathlib import Path
from typing import Dict, List, Tuple

class ProtoToHyphosCompiler:
    
    def __init__(self):
        self.proto_type_mapping = {
            'string': 'seigbit_string',
            'int32': 'senary_number',
            'int64': 'senary_number', 
            'uint32': 'senary_number',
            'uint64': 'senary_number',
            'bool': 'seigbit_boolean',
            'bytes': 'seigbit_data',
            'double': 'senary_decimal',
            'float': 'senary_decimal',
            'repeated': 'seigbit_array'
        }
        
    def compile_proto_to_hyphos(self, proto_file_path: str) -> str:
        """Convert a .proto file to pure Hyphos syntax"""
        
        with open(proto_file_path, 'r') as f:
            proto_content = f.read()
            
        # Parse proto file
        messages = self.extract_messages(proto_content)
        services = self.extract_services(proto_content)
        enums = self.extract_enums(proto_content)
        
        # Generate Hyphos header
        hyphos_code = self.generate_hyphos_header(proto_file_path)
        
        # Convert enums first
        for enum_name, enum_values in enums.items():
            hyphos_code += self.convert_enum_to_hyphos(enum_name, enum_values)
            hyphos_code += "\n\n"
            
        # Convert messages to metawords
        for message_name, fields in messages.items():
            hyphos_code += self.convert_message_to_metaword(message_name, fields)
            hyphos_code += "\n\n"
            
        # Convert services
        for service_name, rpcs in services.items():
            hyphos_code += self.convert_service_to_hyphos(service_name, rpcs)
            hyphos_code += "\n\n"
            
        return hyphos_code
    
    def generate_hyphos_header(self, proto_file_path: str) -> str:
        """Generate standard Hyphos file header"""
        
        file_name = Path(proto_file_path).stem
        
        return f'''// {file_name.title()} Protocol - Pure Hyphos Implementation
// Auto-generated from {Path(proto_file_path).name}
syntax = "hyphos";

consciousness_level TRANSCENDENT;

'''
    
    def extract_messages(self, proto_content: str) -> Dict[str, List[Tuple]]:
        """Extract message definitions from proto content"""
        
        messages = {}
        
        # Find all message blocks
        message_pattern = r'message\s+(\w+)\s*\{([^}]*)\}'
        matches = re.finditer(message_pattern, proto_content, re.DOTALL)
        
        for match in matches:
            message_name = match.group(1)
            message_body = match.group(2)
            
            # Extract fields
            fields = []
            field_pattern = r'(\w+)?\s*(\w+)\s+(\w+)\s*=\s*(\d+);'
            field_matches = re.finditer(field_pattern, message_body)
            
            for field_match in field_matches:
                modifier = field_match.group(1) or ""
                field_type = field_match.group(2)
                field_name = field_match.group(3)
                field_number = field_match.group(4)
                
                fields.append((modifier, field_type, field_name, field_number))
                
            messages[message_name] = fields
            
        return messages
    
    def extract_services(self, proto_content: str) -> Dict[str, List[Tuple]]:
        """Extract service definitions from proto content"""
        
        services = {}
        
        # Find all service blocks
        service_pattern = r'service\s+(\w+)\s*\{([^}]*)\}'
        matches = re.finditer(service_pattern, proto_content, re.DOTALL)
        
        for match in matches:
            service_name = match.group(1)
            service_body = match.group(2)
            
            # Extract RPC methods
            rpcs = []
            rpc_pattern = r'rpc\s+(\w+)\s*\((\w+)\)\s*returns\s*\((\w+)\)'
            rpc_matches = re.finditer(rpc_pattern, service_body)
            
            for rpc_match in rpc_matches:
                rpc_name = rpc_match.group(1)
                input_type = rpc_match.group(2)
                output_type = rpc_match.group(3)
                
                rpcs.append((rpc_name, input_type, output_type))
                
            services[service_name] = rpcs
            
        return services
    
    def extract_enums(self, proto_content: str) -> Dict[str, List[Tuple]]:
        """Extract enum definitions from proto content"""
        
        enums = {}
        
        # Find all enum blocks
        enum_pattern = r'enum\s+(\w+)\s*\{([^}]*)\}'
        matches = re.finditer(enum_pattern, proto_content, re.DOTALL)
        
        for match in matches:
            enum_name = match.group(1)
            enum_body = match.group(2)
            
            # Extract enum values
            values = []
            value_pattern = r'(\w+)\s*=\s*(\d+);'
            value_matches = re.finditer(value_pattern, enum_body)
            
            for value_match in value_matches:
                value_name = value_match.group(1)
                value_number = value_match.group(2)
                
                values.append((value_name, value_number))
                
            enums[enum_name] = values
            
        return enums
    
    def convert_message_to_metaword(self, message_name: str, fields: List[Tuple]) -> str:
        """Convert proto message to Hyphos metaword"""
        
        consciousness_level = self.determine_consciousness_level(len(fields))
        
        hyphos_code = f'''metaword {message_name} = consciousness_aware_class {{
    consciousness_level {consciousness_level};
    
'''
        
        # Convert fields to properties
        for modifier, field_type, field_name, field_number in fields:
            hyphos_type = self.convert_proto_type_to_hyphos(field_type, modifier)
            hyphos_code += f'    private {hyphos_type} {field_name};\n'
            
        # Add SEIGBIT quantum operations
        hyphos_code += f'''
    method to_seigbit() -> SeigrQuantumBitArray {{
        return serialize_to_seigbit(this);
    }}
    
    method from_seigbit(seigbit_data: SeigrQuantumBitArray) -> {message_name} {{
        return deserialize_from_seigbit(seigbit_data, {message_name});
    }}
    
    method validate() -> seigbit_boolean {{
        return validate_consciousness_integrity(this);
    }}
}};'''
        
        return hyphos_code
    
    def convert_service_to_hyphos(self, service_name: str, rpcs: List[Tuple]) -> str:
        """Convert proto service to Hyphos service provider"""
        
        consciousness_level = self.determine_service_consciousness(len(rpcs))
        
        hyphos_code = f'''metaword {service_name} = consciousness_service_provider {{
    consciousness_level {consciousness_level};
    
'''
        
        # Convert RPC methods
        for rpc_name, input_type, output_type in rpcs:
            input_hyphos = self.convert_proto_type_to_hyphos(input_type, "")
            output_hyphos = self.convert_proto_type_to_hyphos(output_type, "")
            
            hyphos_code += f'    async method {rpc_name}(request: {input_hyphos}) -> {output_hyphos};\n'
            
        hyphos_code += '}};'
        
        return hyphos_code
    
    def convert_enum_to_hyphos(self, enum_name: str, values: List[Tuple]) -> str:
        """Convert proto enum to Hyphos senary enum"""
        
        hyphos_code = f'''metaword {enum_name} = senary_enum {{
'''
        
        for value_name, value_number in values:
            senary_value = self.convert_to_senary(int(value_number))
            hyphos_code += f'    {value_name} = senary({senary_value});\n'
            
        hyphos_code += '};'
        
        return hyphos_code
    
    def convert_proto_type_to_hyphos(self, proto_type: str, modifier: str) -> str:
        """Convert proto type to Hyphos type"""
        
        # Handle repeated fields
        if modifier == "repeated":
            base_type = self.proto_type_mapping.get(proto_type, f'seigbit_{proto_type.lower()}')
            return f'seigbit_array<{base_type}>'
        
        # Handle basic types
        return self.proto_type_mapping.get(proto_type, f'seigbit_{proto_type.lower()}')
    
    def determine_consciousness_level(self, field_count: int) -> str:
        """Determine consciousness level based on complexity"""
        
        if field_count <= 5:
            return "BASIC"
        elif field_count <= 15:
            return "AWAKENED" 
        elif field_count <= 25:
            return "INTEGRATED"
        else:
            return "TRANSCENDENT"
            
    def determine_service_consciousness(self, rpc_count: int) -> str:
        """Determine service consciousness level"""
        
        if rpc_count <= 3:
            return "BASIC"
        elif rpc_count <= 10:
            return "AWAKENED"
        elif rpc_count <= 20:
            return "INTEGRATED"
        else:
            return "TRANSCENDENT"
    
    def convert_to_senary(self, decimal_value: int) -> str:
        """Convert decimal to senary (base-6) representation"""
        
        if decimal_value == 0:
            return "0"
            
        senary = ""
        while decimal_value > 0:
            senary = str(decimal_value % 6) + senary
            decimal_value //= 6
            
        return senary

def compile_all_seigr_protocols():
    """Batch compile all .proto files to pure Hyphos"""
    
    compiler = ProtoToHyphosCompiler()
    proto_directory = "seigr_protocol/"
    output_directory = "core/protocols/hyphos_compiled/"
    
    # Ensure output directory exists
    os.makedirs(output_directory, exist_ok=True)
    
    # Find all .proto files
    proto_files = glob.glob(os.path.join(proto_directory, "*.proto"))
    
    successful_compilations = 0
    
    for proto_file in proto_files:
        try:
            print(f"Compiling {proto_file} to Hyphos...")
            
            # Compile to Hyphos
            hyphos_code = compiler.compile_proto_to_hyphos(proto_file)
            
            # Write output file
            output_file = os.path.join(
                output_directory, 
                Path(proto_file).stem + ".hyph"
            )
            
            with open(output_file, 'w') as f:
                f.write(hyphos_code)
                
            print(f"✅ Successfully compiled {proto_file} -> {output_file}")
            successful_compilations += 1
            
        except Exception as e:
            print(f"❌ Failed to compile {proto_file}: {e}")
            
    print(f"\n🎯 Compilation complete: {successful_compilations}/{len(proto_files)} files")

if __name__ == "__main__":
    compile_all_seigr_protocols()
