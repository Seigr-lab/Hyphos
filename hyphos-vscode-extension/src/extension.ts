import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    console.log('Hyphos Language Support extension is now active!');

    // Register Hyphos file run command
    const runCommand = vscode.commands.registerCommand('hyphos.run', async () => {
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            vscode.window.showErrorMessage('No Hyphos file is currently open');
            return;
        }

        if (!activeEditor.document.fileName.endsWith('.hyph')) {
            vscode.window.showErrorMessage('Current file is not a Hyphos file (.hyph)');
            return;
        }

        // Save the file first
        await activeEditor.document.save();

        // Create terminal and run the file
        const terminal = vscode.window.createTerminal('Hyphos Runtime');
        const filePath = activeEditor.document.fileName;
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        
        if (workspaceFolder) {
            const interpreterPath = path.join(workspaceFolder, 'bootstrap_interpreter.py');
            terminal.sendText(`python "${interpreterPath}" "${filePath}"`);
        } else {
            vscode.window.showErrorMessage('No workspace folder found');
            return;
        }
        
        terminal.show();
    });

    // Register syntax check command
    const checkCommand = vscode.commands.registerCommand('hyphos.check', async () => {
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            vscode.window.showErrorMessage('No Hyphos file is currently open');
            return;
        }

        if (!activeEditor.document.fileName.endsWith('.hyph')) {
            vscode.window.showErrorMessage('Current file is not a Hyphos file (.hyph)');
            return;
        }

        // Basic syntax validation
        const document = activeEditor.document;
        const text = document.getText();
        const diagnostics: vscode.Diagnostic[] = [];

        // Check for balanced invoke/transcend pairs
        const lines = text.split('\n');
        let invokeCount = 0;
        let transcendCount = 0;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (line.startsWith('invoke ')) {
                invokeCount++;
            }
            
            if (line === 'transcend') {
                transcendCount++;
            }

            // Check for illegal imports or non-Hyphos constructs
            if (line.includes('add ') && line.includes(' from ')) {
                const diagnostic = new vscode.Diagnostic(
                    new vscode.Range(i, 0, i, line.length),
                    'Illegal import statement. Hyphos files must be self-contained.',
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
            }

            if (line.includes('console.log') || line.includes('print(')) {
                const diagnostic = new vscode.Diagnostic(
                    new vscode.Range(i, 0, i, line.length),
                    'Use native Hyphos output functions instead of external language constructs.',
                    vscode.DiagnosticSeverity.Warning
                );
                diagnostics.push(diagnostic);
            }
        }

        // Check invoke/transcend balance
        if (invokeCount !== transcendCount) {
            const diagnostic = new vscode.Diagnostic(
                new vscode.Range(0, 0, 0, 0),
                `Unbalanced invoke/transcend pairs: ${invokeCount} invoke(s), ${transcendCount} transcend(s)`,
                vscode.DiagnosticSeverity.Error
            );
            diagnostics.push(diagnostic);
        }

        // Clear previous diagnostics and set new ones
        const collection = vscode.languages.createDiagnosticCollection('hyphos');
        collection.set(document.uri, diagnostics);

        if (diagnostics.length === 0) {
            vscode.window.showInformationMessage('Hyphos syntax check passed!');
        } else {
            vscode.window.showWarningMessage(`Found ${diagnostics.length} issue(s) in Hyphos file`);
        }
    });

    // Register completion item provider for metawords
    const completionProvider = vscode.languages.registerCompletionItemProvider(
        'hyphos',
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                const linePrefix = document.lineAt(position).text.substr(0, position.character);
                
                // Check if we're inside an invoke block
                const isInvokeContext = linePrefix.includes('invoke ') || 
                                      document.getText().substr(0, document.offsetAt(position)).includes('invoke ');

                const metawords = [
                    { name: 'senary', detail: 'Base-6 mathematical operations' },
                    { name: 'seigbit', detail: 'Quantum bit with superposition/entanglement' },
                    { name: 'sidereal_time', detail: 'Cosmic precision stellar time' },
                    { name: 'consciousness', detail: '5-level consciousness processing' },
                    { name: 'noesis', detail: '6 Genesis States AI intelligence' },
                    { name: 'graphics', detail: 'Consciousness-aware rendering' },
                    { name: 'energy', detail: '6-layer quantum energy management' },
                    { name: 'network_stack', detail: 'Consciousness-aware networking' },
                    { name: 'hardware', detail: 'System resource management' }
                ];

                const completions: vscode.CompletionItem[] = [];

                // Add metaword completions
                metawords.forEach(metaword => {
                    const completion = new vscode.CompletionItem(metaword.name, vscode.CompletionItemKind.Class);
                    completion.detail = `Hyphos Core Metaword: ${metaword.detail}`;
                    completion.documentation = new vscode.MarkdownString(`The \`${metaword.name}\` metaword provides ${metaword.detail.toLowerCase()} for Hyphos applications.`);
                    completions.push(completion);
                });

                // Add common function completions based on context
                if (isInvokeContext) {
                    const commonFunctions = [
                        { name: 'create', signature: 'create(input_value)', detail: 'Create new instance' },
                        { name: 'add', signature: 'add(a, b)', detail: 'Addition operation' },
                        { name: 'multiply', signature: 'multiply(a, b)', detail: 'Multiplication operation' },
                        { name: 'conscious_reflect', signature: 'conscious_reflect(input_data)', detail: 'Consciousness reflection' },
                        { name: 'neural_process', signature: 'neural_process(pattern)', detail: 'Neural processing' },
                        { name: 'render_visual', signature: 'render_visual(scene_data)', detail: 'Visual rendering' },
                        { name: 'coordinate_transform', signature: 'coordinate_transform(coords)', detail: 'Coordinate transformation' },
                        { name: 'energy_pulse', signature: 'energy_pulse(amplitude, frequency)', detail: 'Generate energy pulse' },
                        { name: 'network_send', signature: 'network_send(data, destination)', detail: 'Send network data' },
                        { name: 'quantum_entangle', signature: 'quantum_entangle(particle_a, particle_b)', detail: 'Quantum entanglement' },
                        { name: 'temporal_flow', signature: 'temporal_flow(time_delta)', detail: 'Control temporal flow' },
                        { name: 'harmonic_resonate', signature: 'harmonic_resonate(freq, purpose)', detail: 'Generate harmonic resonance' },
                        { name: 'balance_field', signature: 'balance_field(system_state)', detail: 'Balance system field' }
                    ];

                    commonFunctions.forEach(func => {
                        const completion = new vscode.CompletionItem(func.name, vscode.CompletionItemKind.Function);
                        completion.detail = func.detail;
                        completion.insertText = new vscode.SnippetString(func.signature.replace(/\w+/g, (match, offset) => {
                            if (offset === 0) return match; // Keep function name
                            return `\${${offset/10}:${match}}`; // Make parameters snippets
                        }));
                        completion.documentation = new vscode.MarkdownString(`\`${func.signature}\` - ${func.detail}`);
                        completions.push(completion);
                    });
                }

                // Add invoke pattern
                const invokeCompletion = new vscode.CompletionItem('invoke', vscode.CompletionItemKind.Keyword);
                invokeCompletion.insertText = new vscode.SnippetString('invoke ${1:metaword}:\n    ${2:functionality}\n    transcend');
                invokeCompletion.detail = 'Hyphos metaword invocation pattern';
                invokeCompletion.documentation = new vscode.MarkdownString('Complete invoke/transcend block with metaword invocation');
                completions.push(invokeCompletion);

                // Add transcend completion
                const transcendCompletion = new vscode.CompletionItem('transcend', vscode.CompletionItemKind.Keyword);
                transcendCompletion.detail = 'End metaword invocation';
                transcendCompletion.documentation = new vscode.MarkdownString('Closes an invoke block');
                completions.push(transcendCompletion);

                return completions;
            }
        },
        ' ', ':', '.'  // Trigger completion on space, colon, and dot
    );

    // Register hover provider for metaword documentation
    const hoverProvider = vscode.languages.registerHoverProvider('hyphos', {
        provideHover(document: vscode.TextDocument, position: vscode.Position) {
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);

            const metawordDocs: { [key: string]: { description: string, functions: { [key: string]: string } } } = {
                'senary': {
                    description: 'Pure base-6 mathematical operations for Seigr\'s fundamental computation system',
                    functions: {
                        'create(input_value) -> $SenaryNumber': 'Creates a senary number from string input (validates only digits 0-5) or converts decimal integer to base-6 representation with pure_senary_representation',
                        'add(a, b) -> $SenaryNumber': 'Performs digit-by-digit senary addition with carry logic. Carries happen at 6 (not 10). Uses max_length iteration and from_digits assembly',
                        'multiply(a, b) -> $SenaryNumber': 'Implements senary multiplication using partial products: multiply_by_digit for each position, left_shift for positioning, senary.add for accumulation',
                        'subtract(a, b) -> $SenaryNumber': 'Base-6 subtraction with borrow handling. When diff < 0, adds 6 and sets borrow=1 for next position',
                        'divide(a, b) -> $SenaryNumber': 'Division using repeated subtraction algorithm. Checks for zero divisor, uses greater_or_equal comparison, accumulates quotient',
                        'from_int(decimal_value) -> $SenaryNumber': 'Direct conversion wrapper calling decimal_to_senary for decimal integer input',
                        'to_decimal(senary_number) -> $Integer': 'Direct conversion wrapper calling senary_to_decimal for integer output',
                        'validate_digits(input) -> $Boolean': 'Validates string contains only valid senary digits (0,1,2,3,4,5) and decimal point. Uses string.contains check',
                        'is_zero(senary_number) -> $Boolean': 'Iterates through all digits array checking each digit != 0. Returns false if any non-zero digit found'
                    }
                },
                'seigbit': {
                    description: 'SEIGBIT Quantum Bit Implementation - quantum computation with superposition and entanglement',
                    functions: {
                        'create(initial_state) -> $Object': 'Creates quantum seigbit with {state, superposition_amplitude, entanglement_partners[], quantum_coherence, temporal_position, quantum_id, measurement_count}',
                        'superposition(seigbit_instance, amplitude_positive) -> $Object': 'Sets seigbit in superposition state with positive/negative amplitudes, coherence_time calculation, measurement_probability',
                        'entangle(seigbit_a, seigbit_b, entanglement_strength) -> $String': 'Creates quantum entanglement between two seigbits. Generates entanglement_id, creates bidirectional entanglement_data with quantum_correlation',
                        'measure(seigbit_instance, measurement_basis) -> $String': 'Measures quantum state. For superposition: generates quantum_random, compares with probability_threshold, collapses to classical state, updates entangled partners',
                        'validate_state(state) -> $String': 'Validates quantum state format and coherence requirements for seigbit operations',
                        'generate_quantum_id() -> $String': 'Creates unique quantum identifier for seigbit tracking and entanglement management',
                        'calculate_coherence_time(amplitude) -> $Number': 'Calculates quantum coherence duration based on superposition amplitude values',
                        'update_entangled_partners(seigbit, result) -> $Void': 'Propagates measurement collapse to all entangled partner seigbits maintaining quantum correlations'
                    }
                },
                'sidereal_time': {
                    description: 'Cosmic precision time based on stellar coordinates and sidereal calculations',
                    functions: {
                        'current_time() -> $SenaryNumber': 'Returns current sidereal time with cosmic precision. Gets UTC timestamp, converts using SOLAR_TO_SIDEREAL_RATIO',
                        'convert_to_sidereal(utc_timestamp) -> $SenaryNumber': 'Converts UTC to sidereal time: calculates seconds_since_j2000 (Jan 1, 2000), multiplies by 1.002737909 ratio',
                        'get_microsecond_variations() -> $String': 'Collects 10 rapid timestamp samples with micro_delay(1) between each for entropy generation. Returns variation string',
                        'calculate_right_ascension(star_name, sidereal_time) -> $Object': 'Astronomical calculations for star positions using stellar coordinates and current sidereal time reference',
                        'parse_ra_to_hours(ra_string) -> $Number': 'Parses right ascension HH:MM:SS format to decimal hours for celestial coordinate calculations',
                        'format_ra_from_hours(decimal_hours) -> $String': 'Converts decimal hours back to HH:MM:SS right ascension format for astronomical display'
                    }
                },
                'consciousness': {
                    description: 'Main consciousness interface with 5 processing levels delegating to Noesis intelligence system',
                    functions: {
                        'process(input_data, consciousness_level) -> $Object': 'Main consciousness processing dispatcher. Levels: BASIC/INTERMEDIATE/ADVANCED/TRANSCENDENT/UNIVERSAL. Energy-aware processing selection',
                        'basic_processing(input_data) -> $Object': 'Uses only Conscience + Logical Genesis States. Returns {consciousness_level, primary_response, meta_awareness, confidence, processing_mode}',
                        'intermediate_processing(input_data) -> $Object': 'Uses Conscience + Logical + Emotional States. Includes contextual_response with emotional_weighting and urgency_factor',
                        'advanced_processing(input_data) -> $Object': 'Uses 5 Genesis States (adds Spatial + Temporal). Creates advanced_emergent properties from decision_sophistication',
                        'transcendent_processing(input_data) -> $Object': 'Full 6 Genesis States including Adaptive. Maximum consciousness integration with emergent behavior synthesis',
                        'universal_processing(input_data) -> $Object': 'Highest consciousness level with universal awareness patterns and collective intelligence integration'
                    }
                },
                'noesis': {
                    description: 'AI consciousness core with 6 Genesis States: conscience, logical, emotional, spatial, temporal, adaptive',
                    functions: {
                        'conscience_sense(stimulus) -> $Object': 'Meta-awareness processing. Calculates priority weights, coordination signals from {urgency, context_importance, system_coherence}. Returns oversight_recommendations',
                        'logical_sense(input_data) -> $Object': 'Pattern matching engine. Evaluates options against patterns, calculates confidence scores. Returns {best_option, confidence, weighted_scores, reasoning_path}',
                        'emotional_sense(context_data) -> $Object': 'Emotional intelligence. Processes priority_weights, emotional_factors with urgency assessment. Returns adaptive_weighting with temporal_decay',
                        'spatial_sense(relational_data) -> $Object': 'Maps entities to spatial coordinates, calculates relationship_density and topological_position. Returns hierarchical_organization',
                        'temporal_sense(temporal_data) -> $Object': 'Temporal pattern recognition. Processes events/sequences, generates future_predictions and causality_mapping',
                        'adaptive_sense(adaptation_data) -> $Object': 'Learning system. Identifies adaptation_opportunities, calculates improvement_potential vs implementation_cost',
                        'process_intelligence(input_data) -> $Object': 'Unified coordination of all 6 Genesis States with energy-aware processing and emergent property synthesis',
                        'store_experience(state, input, result) -> $String': '3-layer memory system (active/historical/adaptive) with cryptographic hashing and .seigr file generation'
                    }
                },
                'graphics': {
                    description: 'Consciousness-aware graphics rendering with AI-driven visual processing',
                    functions: {
                        'set_consciousness_level(level) -> $Boolean': 'Sets graphics consciousness awareness (0-5). Validates range, records consciousness_event via noesis with sidereal timestamp',
                        'ai_graphics_control(enable) -> $Void': 'Enables/disables AI graphics controller. When enabled: neural_rendering_active=true, initializes noesis AI graphics pipeline',
                        'consciousness_rendering() -> $Object': 'Returns current consciousness state for graphics: {awareness_level, perception_mode, cognitive_state} from noesis.get_current_consciousness_state()',
                        'adaptive_intelligence() -> $Object': 'Adapts rendering based on intelligence mode from noesis: {optimization_level, processing_capacity, visual_complexity}',
                        'render_visual(scene_data) -> $Object': 'Main rendering function processing scene data through consciousness-aware pipeline with neural enhancement',
                        'coordinate_transform(coords) -> $Array': 'Transforms coordinates between spatial systems (2D/3D/4D) with consciousness-based perspective adjustment'
                    }
                },
                'energy': {
                    description: 'Sophisticated energy management with 6-layer quantum optimization and power state control',
                    functions: {
                        'initialize_profiler() -> $Object': 'Creates energy profiler with quantum_energy_layers (1-6: base/computation/network/storage/graphics/consciousness) and baseline_power tracking',
                        'set_power_state(state) -> $Boolean': 'Sets system power state: NORMAL/LOW_POWER/CRITICAL/HARVESTING/EXTERNAL/UNKNOWN. Adjusts all subsystem allocation',
                        'quantum_energy_optimization() -> $Object': '6-layer quantum optimization using senary calculations for maximum efficiency across all system components',
                        'get_current_usage() -> $Object': 'Returns real-time energy metrics: consumption rates, efficiency ratios, projected battery life with quantum layer breakdown',
                        'energy_pulse(amplitude, frequency) -> $Object': 'Generates energy pulses for system synchronization. Amplitude controls power level, frequency sets timing intervals',
                        'harvest_energy(source_type) -> $Object': 'Energy harvesting from BATTERY/AC_POWER/SOLAR/USB/WIRELESS sources with efficiency optimization and source validation'
                    }
                },
                'network_stack': {
                    description: 'Distributed network communication with consciousness-aware routing',
                    functions: {
                        'establish_connection(target) -> $Object': 'Establishes secure connection with consciousness-level handshake and capability negotiation',
                        'network_send(data, destination) -> $Boolean': 'Sends data with consciousness-aware routing, error handling, and delivery confirmation',
                        'network_receive(channel) -> $Object': 'Receives data with consciousness-based filtering, validation, and integrity checking',
                        'broadcast_message(message) -> $Number': 'Broadcasts to all connected nodes, returns successful transmission count with consciousness compatibility',
                        'secure_transmission(data, encryption) -> $Boolean': 'Encrypts data using Seigr cryptographic protocols with consciousness verification',
                        'connection_health_check() -> $Object': 'Monitors connection: latency, reliability, consciousness sync level, bandwidth utilization'
                    }
                },
                'hardware': {
                    description: 'Hardware abstraction and system resource management with consciousness integration',
                    functions: {
                        'get_system_metrics() -> $Object': 'Returns comprehensive system health: CPU, memory, storage, network, temperature with consciousness correlation',
                        'get_energy_level() -> $Number': 'Current energy level in senary format for consciousness-aware power management',
                        'get_comprehensive_profile() -> $Object': 'Complete hardware profile: CPU, memory, storage capabilities for consciousness optimization',
                        'calculate_processing_energy_cost() -> $Number': 'Calculates energy cost for consciousness processing operations using quantum optimization'
                    }
                }
            };

            if (metawordDocs[word]) {
                const metaword = metawordDocs[word];
                const hoverText = new vscode.MarkdownString();
                
                hoverText.appendCodeblock(`invoke ${word}:`, 'hyphos');
                hoverText.appendMarkdown(`\n## **${word.toUpperCase()}**\n\n`);
                hoverText.appendMarkdown(`${metaword.description}\n\n`);
                hoverText.appendMarkdown(`### Available Functions:\n\n`);
                
                Object.entries(metaword.functions).forEach(([signature, description]) => {
                    const [funcName] = signature.split('(');
                    hoverText.appendMarkdown(`**\`${signature}\`**\n\n${description}\n\n---\n\n`);
                });
                
                hoverText.appendMarkdown(`*Hover over function names for detailed implementation information*`);
                return new vscode.Hover(hoverText);
            }
        }
    });

    context.subscriptions.push(runCommand, checkCommand, completionProvider, hoverProvider);
}

export function deactivate() {}
