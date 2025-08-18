#!/bin/bash

# Hyphos Proto Validation Script
# Purpose: Validate all .hyph files for senary compliance and protocol correctness

echo "=== HYPHOS PROTO VALIDATION ==="
echo "Validating all .hyph files for senary compliance..."

BASE_DIR="e:/SEIGR DEV/Seigr-EcoSystem/hyphos"
METAWORDS_DIR="$BASE_DIR/metawords"
BASE_MODULES_DIR="$BASE_DIR/base_modules"

TOTAL_FILES=0
VALID_FILES=0
INVALID_FILES=0

# Function to validate senary compliance in a file
validate_senary_compliance() {
    local file="$1"
    local basename=$(basename "$file")
    
    # Check for enum values > 5 (violating senary constraint)
    local violations=$(grep -E "= [6-9][0-9]*;" "$file" 2>/dev/null | wc -l)
    
    if [[ $violations -eq 0 ]]; then
        echo "  ✅ $basename: SENARY COMPLIANT"
        return 0
    else
        echo "  ❌ $basename: SENARY VIOLATIONS ($violations found)"
        grep -E "= [6-9][0-9]*;" "$file" | head -3
        return 1
    fi
}

# Function to validate proto syntax
validate_proto_syntax() {
    local file="$1"
    local basename=$(basename "$file")
    
    # Check for required elements
    local has_syntax=$(grep -q "syntax = \"proto3\";" "$file" && echo "yes" || echo "no")
    local has_package=$(grep -q "package hyphos\." "$file" && echo "yes" || echo "no")
    local has_imports=$(grep -q "import.*\.hyph" "$file" && echo "yes" || echo "no")
    
    if [[ "$has_syntax" == "yes" && "$has_package" == "yes" ]]; then
        echo "  ✅ $basename: PROTO SYNTAX VALID"
        return 0
    else
        echo "  ❌ $basename: PROTO SYNTAX INVALID"
        [[ "$has_syntax" == "no" ]] && echo "    - Missing proto3 syntax declaration"
        [[ "$has_package" == "no" ]] && echo "    - Missing hyphos package declaration"
        return 1
    fi
}

# Function to check file structure
validate_file_structure() {
    local file="$1"
    local basename=$(basename "$file")
    
    # Count key elements
    local enum_count=$(grep -c "^enum " "$file")
    local message_count=$(grep -c "^message " "$file")
    local service_count=$(grep -c "^service " "$file")
    
    echo "  📊 $basename: $enum_count enums, $message_count messages, $service_count services"
    
    if [[ $enum_count -ge 1 && $message_count -ge 1 ]]; then
        return 0
    else
        echo "    ⚠️  Minimal structure missing"
        return 1
    fi
}

echo ""
echo "=== VALIDATING BASE MODULES ==="
for file in "$BASE_MODULES_DIR"/*.hyph; do
    if [[ -f "$file" ]]; then
        TOTAL_FILES=$((TOTAL_FILES + 1))
        echo "Validating base module: $(basename "$file")"
        
        valid=true
        validate_senary_compliance "$file" || valid=false
        validate_proto_syntax "$file" || valid=false
        validate_file_structure "$file" || valid=false
        
        if $valid; then
            VALID_FILES=$((VALID_FILES + 1))
        else
            INVALID_FILES=$((INVALID_FILES + 1))
        fi
        echo ""
    fi
done

echo "=== VALIDATING METAWORD PROTOS ==="
METAWORD_COUNT=0
for file in "$METAWORDS_DIR"/*.hyph; do
    if [[ -f "$file" ]]; then
        TOTAL_FILES=$((TOTAL_FILES + 1))
        METAWORD_COUNT=$((METAWORD_COUNT + 1))
        
        if [[ $((METAWORD_COUNT % 50)) -eq 0 ]]; then
            echo "Validated $METAWORD_COUNT metawords..."
        fi
        
        valid=true
        validate_senary_compliance "$file" >/dev/null || valid=false
        validate_proto_syntax "$file" >/dev/null || valid=false
        
        if $valid; then
            VALID_FILES=$((VALID_FILES + 1))
        else
            INVALID_FILES=$((INVALID_FILES + 1))
            echo "❌ INVALID: $(basename "$file")"
        fi
    fi
done

echo ""
echo "=== VALIDATION SUMMARY ==="
echo "Total files validated: $TOTAL_FILES"
echo "Valid files: $VALID_FILES"
echo "Invalid files: $INVALID_FILES"

if [[ $INVALID_FILES -eq 0 ]]; then
    echo "🎉 ALL FILES ARE SENARY COMPLIANT AND PROTOCOL VALID!"
    echo "✅ Hyphos Proto Ecosystem is ready for deployment"
else
    echo "⚠️  Some files need attention"
fi

echo ""
echo "=== STRUCTURE VERIFICATION ==="
echo "Base modules: $(ls "$BASE_MODULES_DIR"/*.hyph 2>/dev/null | wc -l)"
echo "Metaword protos: $(ls "$METAWORDS_DIR"/*.hyph 2>/dev/null | wc -l)"
echo "Total .hyph files: $(($(ls "$BASE_MODULES_DIR"/*.hyph 2>/dev/null | wc -l) + $(ls "$METAWORDS_DIR"/*.hyph 2>/dev/null | wc -l)))"

echo "=== VALIDATION COMPLETE ==="
