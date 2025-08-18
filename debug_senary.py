#!/usr/bin/env python3
"""
Debug senary arithmetic calculations
"""

def senary_to_decimal(senary_str: str) -> int:
    """Convert senary string to decimal integer"""
    decimal = 0
    for digit in senary_str:
        if digit not in '012345':
            raise ValueError(f"Invalid senary digit: {digit}")
        decimal = decimal * 6 + int(digit)
    return decimal

def decimal_to_senary(decimal: int) -> str:
    """Convert decimal integer to senary string"""
    if decimal == 0:
        return "0"
    
    senary = ""
    while decimal > 0:
        senary = str(decimal % 6) + senary
        decimal //= 6
    return senary

# Test calculations manually
print("=== Senary Arithmetic Debug ===")

# Test 1: 12 (senary) + 23 (senary) 
a = senary_to_decimal("12")  # Should be 8
b = senary_to_decimal("23")  # Should be 15
result = a + b              # Should be 23
senary_result = decimal_to_senary(result)  # Should be 35
print(f"12₆ + 23₆ = {a} + {b} = {result} = {senary_result}₆")

# Test 2: 45 (senary) * 3 (senary)
a = senary_to_decimal("45")  # Should be 29
b = senary_to_decimal("3")   # Should be 3
result = a * b              # Should be 87
senary_result = decimal_to_senary(result)  # Should be 203
print(f"45₆ * 3₆ = {a} * {b} = {result} = {senary_result}₆")

# Test 3: 4^3
a = senary_to_decimal("4")   # Should be 4
b = senary_to_decimal("3")   # Should be 3  
result = a ** b             # Should be 64
senary_result = decimal_to_senary(result)  # Should be 104
print(f"4₆ ^ 3₆ = {a} ^ {b} = {result} = {senary_result}₆")

# Test 4: 5!
a = senary_to_decimal("5")   # Should be 5
factorial = 1
for i in range(1, a + 1):
    factorial *= i          # Should be 120
senary_result = decimal_to_senary(factorial)  # Should be 200
print(f"5₆! = {a}! = {factorial} = {senary_result}₆")
