# API Reference - Seigr Ecosystem

**Document**: 11-api-reference.md  
**Purpose**: Complete API reference for key classes, functions, and protocols (Hyphos compilation targets)  
**Audience**: Developers, system integrators, AI assistants  

## 🔌 CORE API OVERVIEW

The Seigr ecosystem provides comprehensive APIs across all system components, with consistent interfaces that integrate consciousness awareness, senary mathematics, and democratic governance.

> **CRITICAL IMPLEMENTATION NOTE**: All code examples below show **Python reference implementations only**.  
> The actual Seigr ecosystem uses **Hyphos language** compiled from these Python prototypes via protobuf.  
> **DO NOT implement new features in Python** - use these as reference for Hyphos development.

### API Design Principles

**Consciousness-Aware**: All APIs adapt behavior based on user awareness states  
**Senary-Native**: All mathematical operations use pure base-6 arithmetic from existing tested algorithms  
**Democratic Integration**: APIs respect CU-based governance and voting results  
**Bio-Digital Ready**: API designs compatible with future mycelial network interfaces  
**Hyphos-First**: All new development in Hyphos language, not Python  

## 🧠 NOESIS AI ENGINE API

### Core Noesis Classes

> **IMPORTANT**: The following shows existing **Python reference implementation only**.  
> Actual Noesis implementation compiled: **Python prototype → protobuf → Hyphos native**.

#### NoesisCore

```python
# REFERENCE IMPLEMENTATION ONLY - ACTUAL SYSTEM USES HYPHOS
# Compilation path: src/noesis/noesis_core.py → protobuf → Hyphos
from src.noesis.noesis_core import NoesisCore
from src.noesis.consciousness_detector import ConsciousnessState

class NoesisCore:
    """Central AI intelligence engine with consciousness integration"""
    
    def __init__(self, consciousness_threshold=ConsciousnessState.AWARE):
        """Initialize Noesis with consciousness awareness"""
        self.consciousness_threshold = consciousness_threshold
        self.intelligence_engine = IntelligenceEngine()
        self.adaptation_system = AdaptationSystem()
    
    def process_with_consciousness(self, data, user_consciousness_state):
        """Process data with consciousness-aware algorithms"""
        # Adapt processing based on consciousness state
        processing_strategy = self.select_processing_strategy(user_consciousness_state)
        
        # Apply Noesis intelligence
        intelligence_result = self.intelligence_engine.analyze(data, processing_strategy)
        
        # Adapt results for consciousness level
        adapted_result = self.adaptation_system.adapt_for_consciousness(
            intelligence_result, user_consciousness_state
        )
        
        return NoesisResult(
            original_data=data,
            consciousness_state=user_consciousness_state,
            intelligence_analysis=intelligence_result,
            adapted_output=adapted_result
        )
    
    def learn_from_interaction(self, interaction_data, consciousness_feedback):
        """Learn from user interactions with consciousness feedback"""
        learning_pattern = self.extract_learning_pattern(interaction_data)
        consciousness_correlation = self.analyze_consciousness_correlation(
            learning_pattern, consciousness_feedback
        )
        
        self.intelligence_engine.update_learning_model(
            pattern=learning_pattern,
            consciousness_correlation=consciousness_correlation
        )
```

#### NoesisPrivacyIsolator

> **IMPORTANT**: The following shows existing **Python reference implementation only**.  
> Actual implementation compiled: **Python prototype → protobuf → Hyphos native**.

```python
# REFERENCE IMPLEMENTATION ONLY - ACTUAL SYSTEM USES HYPHOS
from src.immune_system.privacy_isolation import NoesisPrivacyIsolator

class NoesisPrivacyIsolator:
    """Privacy isolation with consciousness-aware protection levels"""
    
    def __init__(self):
        self.blocked_data_types = {
            'personal_identifiers', 'financial_data', 'health_records',
            'biometric_data', 'location_data', 'communication_content'
        }
        self.consciousness_privacy_levels = self._init_privacy_levels()
    
    def enforce_privacy_policy(self, data_segment, consciousness_state):
        """Enforce privacy policy adapted for consciousness state"""
        
        # Determine privacy level based on consciousness
        privacy_level = self.consciousness_privacy_levels[consciousness_state.state]
        
        # Apply privacy filtering
        filtered_data = self.apply_privacy_filter(data_segment, privacy_level)
        
        # Validate privacy compliance
        if not self.validate_privacy_compliance(filtered_data, privacy_level):
            raise PrivacyViolationError("Data segment violates privacy policy")
        
        return PrivacyFilteredData(
            original_data=data_segment,
            filtered_data=filtered_data,
            privacy_level=privacy_level,
            consciousness_state=consciousness_state
        )
    
    def _init_privacy_levels(self):
        """Initialize consciousness-based privacy protection levels"""
        return {
            'dormant': 'maximum_protection',
            'emerging': 'high_protection_with_education',
            'aware': 'standard_protection',
            'focused': 'precision_protection',
            'transcendent_flow': 'adaptive_protection',
            'transcendent_unity': 'collective_protection'
        }
```

### Noesis Learning and Adaptation APIs

#### NoesisLearningEngine
```python
from src.noesis.learning_engine import NoesisLearningEngine

class NoesisLearningEngine:
    """Advanced learning with consciousness pattern recognition"""
    
    def train_consciousness_model(self, training_data, consciousness_labels):
        """Train model to recognize consciousness patterns"""
        
        # Prepare consciousness-labeled training set
        prepared_dataset = self.prepare_consciousness_dataset(
            training_data, consciousness_labels
        )
        
        # Train using senary neural networks
        model = self.train_senary_neural_network(prepared_dataset)
        
        # Validate consciousness recognition accuracy
        validation_score = self.validate_consciousness_accuracy(model)
        
        if validation_score < CONSCIOUSNESS_ACCURACY_THRESHOLD:
            raise ConsciousnessModelError("Insufficient consciousness recognition accuracy")
        
        return ConsciousnessRecognitionModel(
            model=model,
            accuracy=validation_score,
            training_metadata=prepared_dataset.metadata
        )
    
    def adaptive_learning_cycle(self, experience_data, feedback):
        """Continuous learning from user experiences"""
        
        # Extract learning insights from experience
        learning_insights = self.analyze_experience_patterns(experience_data)
        
        # Correlate with consciousness feedback
        consciousness_correlation = self.correlate_consciousness_feedback(
            learning_insights, feedback
        )
        
        # Update learning models
        model_updates = self.generate_model_updates(consciousness_correlation)
        
        # Apply updates with validation
        updated_models = self.apply_validated_updates(model_updates)
        
        return LearningCycleResult(
            insights=learning_insights,
            model_updates=updated_models,
            performance_improvement=self.measure_performance_improvement()
        )
```

## 🔐 HYPHACRYPT SECURITY API

### Core Cryptographic Classes

#### HyphaCrypt
```python
from src.crypto.hypha_crypt import HyphaCrypt
from src.seigr_math.senary_numbers import SenaryNumber

class HyphaCrypt:
    """Bio-inspired cryptographic system with consciousness integration"""
    
    def __init__(self, consciousness_adaptation=True):
        self.consciousness_adaptation = consciousness_adaptation
        self.mycelial_key_derivation = MycelialKeyDerivation()
        self.bio_encryption_engine = BioEncryptionEngine()
    
    def consciousness_aware_encrypt(self, data, consciousness_state, encryption_key):
        """Encrypt data with consciousness-aware algorithm selection"""
        
        # Select encryption algorithm based on consciousness
        encryption_algorithm = self.select_consciousness_encryption(consciousness_state)
        
        # Derive consciousness-specific key
        consciousness_key = self.derive_consciousness_key(
            encryption_key, consciousness_state
        )
        
        # Apply bio-inspired encryption
        encrypted_data = self.bio_encryption_engine.encrypt(
            data, consciousness_key, encryption_algorithm
        )
        
        # Add consciousness metadata
        consciousness_metadata = self.create_consciousness_metadata(consciousness_state)
        
        return HyphaCryptResult(
            encrypted_data=encrypted_data,
            consciousness_metadata=consciousness_metadata,
            encryption_algorithm=encryption_algorithm
        )
    
    def mycelial_key_generation(self, seed_data, network_topology):
        """Generate cryptographic keys using mycelial growth patterns"""
        
        # Simulate mycelial network growth
        growth_simulation = self.mycelial_key_derivation.simulate_growth(
            seed=seed_data,
            topology=network_topology
        )
        
        # Extract cryptographic entropy from growth patterns
        cryptographic_entropy = self.extract_growth_entropy(growth_simulation)
        
        # Generate key using senary mathematics
        derived_key = self.generate_senary_key(cryptographic_entropy)
        
        return MycelialDerivedKey(
            key=derived_key,
            growth_pattern=growth_simulation,
            entropy_source=cryptographic_entropy
        )
```

#### SeigrHash
```python
from src.crypto.hash_utils import seigr_HASH_SEIGR_SENARY

def seigr_HASH_SEIGR_SENARY(data, consciousness_context=None):
    """Seigr-native hash function with consciousness integration"""
    
    # Convert data to senary representation
    senary_data = convert_to_senary_bytes(data)
    
    # Apply consciousness-aware salt if provided
    if consciousness_context:
        consciousness_salt = generate_consciousness_salt(consciousness_context)
        senary_data = senary_data + consciousness_salt
    
    # Perform senary hash calculation
    hash_result = perform_senary_hash_algorithm(senary_data)
    
    # Validate hash integrity
    if not validate_hash_integrity(hash_result):
        raise HashIntegrityError("Hash calculation integrity compromised")
    
    return SeigrHashResult(
        hash_value=hash_result,
        input_data_hash=quick_hash(data),
        consciousness_context=consciousness_context
    )
```

## 🗳️ MYCELITH VOTING API

### Democratic Governance Classes

#### MycelithVotingSystem
```python
from src.mycelith_vote.voting_system import MycelithVotingSystem
from src.mycelith_vote.contribution_units import ContributionRegistry

class MycelithVotingSystem:
    """Democratic voting system with CU-weighted decisions"""
    
    def __init__(self):
        self.contribution_registry = ContributionRegistry()
        self.vote_validator = VoteValidator()
        self.consensus_calculator = ConsensusCalculator()
    
    def create_democratic_vote(self, proposal, voting_parameters):
        """Create new democratic voting session"""
        
        # Validate proposal eligibility
        if not self.validate_proposal_eligibility(proposal):
            raise ProposalEligibilityError("Proposal does not meet voting requirements")
        
        # Calculate voting weight distribution
        weight_distribution = self.calculate_voting_weights(proposal.scope)
        
        # Create voting session
        voting_session = MycelithVotingSession(
            proposal=proposal,
            parameters=voting_parameters,
            weight_distribution=weight_distribution,
            start_time=current_seigr_time()
        )
        
        return voting_session
    
    def cast_consciousness_aware_vote(self, voter_identity, vote_choice, consciousness_state):
        """Cast vote with consciousness-aware validation"""
        
        # Validate voter eligibility with consciousness context
        voter_eligibility = self.validate_voter_with_consciousness(
            voter_identity, consciousness_state
        )
        
        if not voter_eligibility.is_eligible:
            raise VoterEligibilityError("Voter not eligible for this decision")
        
        # Calculate consciousness-adjusted voting weight
        base_weight = self.contribution_registry.get_voting_weight(voter_identity)
        consciousness_adjustment = self.calculate_consciousness_voting_adjustment(
            consciousness_state, vote_choice.complexity
        )
        
        adjusted_weight = base_weight * consciousness_adjustment
        
        # Create validated vote
        validated_vote = ValidatedVote(
            voter=voter_identity,
            choice=vote_choice,
            weight=adjusted_weight,
            consciousness_state=consciousness_state,
            timestamp=current_seigr_time()
        )
        
        return validated_vote
```

#### ContributionUnitCalculator
```python
from src.mycelith_vote.contribution_units import ContributionUnitCalculator

class ContributionUnitCalculator:
    """Calculate and verify Contribution Units with senary precision"""
    
    def calculate_cu_for_action(self, action, contributor, context):
        """Calculate CU value for specific action using senary mathematics"""
        
        # Base CU calculation using senary arithmetic
        base_cu = self.get_base_cu_value(action.type)
        
        # Quality assessment using senary metrics
        quality_score = self.assess_contribution_quality(action, context)
        quality_multiplier = SenaryNumber(str(quality_score)) / SenaryNumber("100")
        
        # Complexity factor
        complexity_factor = self.calculate_complexity_factor(action)
        
        # Community need factor
        need_factor = self.calculate_community_need_factor(action.type, context)
        
        # Final CU calculation
        calculated_cu = base_cu * quality_multiplier * complexity_factor * need_factor
        
        # Validate calculation integrity
        if not self.validate_cu_calculation(calculated_cu, action):
            raise CUCalculationError("CU calculation integrity compromised")
        
        return ContributionUnitAward(
            contributor=contributor,
            action=action,
            calculated_cu=calculated_cu,
            calculation_proof=self.generate_calculation_proof(
                base_cu, quality_multiplier, complexity_factor, need_factor
            )
        )
```

## 🌐 SEIGR CELL AND DATA API

### Core Data Structure Classes

#### SeigrCell
```python
from src.seigr_cell.seigr_cell import SeigrCell
from src.seigr_math.seigr_time.sidereal_core import current_seigr_time

class SeigrCell:
    """Fundamental data unit with 4D coordinates and consciousness awareness"""
    
    def __init__(self, data, coordinates, consciousness_level):
        self.data = data
        self.coordinates = coordinates  # 4D: (x, y, z, t_sidereal)
        self.consciousness_level = consciousness_level
        self.creation_time = current_seigr_time()
        self.cell_id = self.generate_cell_id()
        self.lineage_tracker = LineageTracker()
    
    def consciousness_aware_access(self, accessor_consciousness, access_requirements):
        """Provide consciousness-aware access to cell data"""
        
        # Validate consciousness compatibility
        if not self.is_consciousness_compatible(accessor_consciousness):
            raise ConsciousnessAccessError("Consciousness level incompatible with cell")
        
        # Apply consciousness-aware data filtering
        filtered_data = self.apply_consciousness_filter(
            self.data, accessor_consciousness
        )
        
        # Log access for lineage tracking
        access_event = self.lineage_tracker.log_access(
            accessor_consciousness, access_requirements, current_seigr_time()
        )
        
        return SeigrCellAccessResult(
            cell_id=self.cell_id,
            filtered_data=filtered_data,
            consciousness_context=accessor_consciousness,
            access_event=access_event
        )
    
    def replicate_with_adaptation(self, target_location, replication_parameters):
        """Create adaptive replica for target location"""
        
        # Calculate optimal adaptation for target
        adaptation_strategy = self.calculate_adaptation_strategy(
            target_location, replication_parameters
        )
        
        # Create adapted replica
        replica = SeigrCell(
            data=self.adapt_data_for_location(self.data, adaptation_strategy),
            coordinates=self.calculate_replica_coordinates(target_location),
            consciousness_level=self.consciousness_level
        )
        
        # Establish lineage relationship
        lineage_relationship = self.lineage_tracker.create_replica_lineage(
            parent_cell=self,
            replica_cell=replica,
            adaptation_strategy=adaptation_strategy
        )
        
        return SeigrCellReplica(
            replica=replica,
            adaptation_strategy=adaptation_strategy,
            lineage_relationship=lineage_relationship
        )
```

#### SeigrFile
```python
from src.seigr_cell.seigr_file import SeigrFile

class SeigrFile:
    """Container for multiple Seigr Cells with exactly 53,194 bytes"""
    
    SEIGR_FILE_SIZE = 53194  # Exact file size in bytes
    
    def __init__(self, cells=None):
        self.cells = cells or []
        self.file_header = self.generate_file_header()
        self.integrity_hash = self.calculate_integrity_hash()
    
    def add_cell_with_validation(self, cell, consciousness_context):
        """Add Seigr Cell with size and consciousness validation"""
        
        # Validate cell consciousness compatibility
        if not self.validate_cell_consciousness(cell, consciousness_context):
            raise CellConsciousnessError("Cell consciousness incompatible with file")
        
        # Check file size constraints
        projected_size = self.calculate_projected_size_with_cell(cell)
        if projected_size > self.SEIGR_FILE_SIZE:
            raise SeigrFileSizeError("Adding cell would exceed file size limit")
        
        # Add cell with metadata
        cell_metadata = self.generate_cell_metadata(cell, consciousness_context)
        self.cells.append({
            'cell': cell,
            'metadata': cell_metadata,
            'insertion_time': current_seigr_time()
        })
        
        # Update file integrity
        self.update_file_integrity()
        
        return CellAdditionResult(
            cell_id=cell.cell_id,
            file_position=len(self.cells) - 1,
            updated_integrity_hash=self.integrity_hash
        )
    
    def serialize_to_exactly_53194_bytes(self):
        """Serialize file to exactly 53,194 bytes with padding/compression"""
        
        # Serialize all cells and metadata
        serialized_data = self.serialize_cells_and_metadata()
        
        # Apply consciousness-aware compression if needed
        if len(serialized_data) > self.SEIGR_FILE_SIZE:
            compressed_data = self.apply_consciousness_compression(serialized_data)
        else:
            compressed_data = serialized_data
        
        # Pad to exact size if needed
        if len(compressed_data) < self.SEIGR_FILE_SIZE:
            padded_data = self.apply_intelligent_padding(compressed_data)
        else:
            padded_data = compressed_data
        
        # Validate exact size
        if len(padded_data) != self.SEIGR_FILE_SIZE:
            raise SeigrFileSerializationError("Failed to serialize to exact file size")
        
        return padded_data
```

## 🕒 SIDEREAL TIME API

### Time System Classes

#### SiderealCore
```python
from src.seigr_math.seigr_time.sidereal_core import SiderealCore, current_seigr_time

class SiderealCore:
    """Femtosecond precision sidereal time with consciousness integration"""
    
    def current_sidereal_time_with_consciousness(self, consciousness_context=None):
        """Get current sidereal time with consciousness-aware precision"""
        
        # Base sidereal time calculation
        base_sidereal_time = self.calculate_base_sidereal_time()
        
        # Apply consciousness-aware precision adjustment
        if consciousness_context:
            precision_adjustment = self.calculate_consciousness_precision(
                consciousness_context
            )
            adjusted_time = base_sidereal_time + precision_adjustment
        else:
            adjusted_time = base_sidereal_time
        
        return SeigrTimestamp(
            sidereal_time=adjusted_time,
            consciousness_context=consciousness_context,
            precision_level=self.determine_precision_level(consciousness_context)
        )
    
    def time_coordinate_for_4d_positioning(self, event_data):
        """Generate time coordinate for 4D spatial-temporal positioning"""
        
        # Calculate precise sidereal time for event
        event_sidereal_time = self.calculate_event_sidereal_time(event_data)
        
        # Apply 4D coordinate formatting
        time_coordinate = self.format_for_4d_coordinates(event_sidereal_time)
        
        # Validate coordinate precision
        if not self.validate_coordinate_precision(time_coordinate):
            raise TimeCoordinateError("Time coordinate precision insufficient")
        
        return TimeCoordinate4D(
            sidereal_time=event_sidereal_time,
            coordinate_format=time_coordinate,
            precision_metadata=self.generate_precision_metadata()
        )

def current_seigr_time():
    """Global function for current Seigr time - used throughout ecosystem"""
    return SiderealCore().current_sidereal_time_with_consciousness()
```

---

**This document provides the complete API reference for core Seigr ecosystem classes and functions. All APIs integrate consciousness awareness, senary mathematics, and democratic governance as fundamental design principles.**
