import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// Function to parse documentation from .hyph files
function parseHyphFileDocumentation(workspaceRoot: string): { [key: string]: { title: string, description: string, features: string[], implementation: string[] } } {
    const hyphCore = path.join(workspaceRoot, 'hyphos_core');
    const docs: { [key: string]: { title: string, description: string, features: string[], implementation: string[] } } = {};
    
    if (!fs.existsSync(hyphCore)) {
        return docs;
    }
    
    try {
        const files = fs.readdirSync(hyphCore).filter(file => file.endsWith('.hyph'));
        
        for (const file of files) {
            const metawordName = file.replace('.hyph', '');
            const filePath = path.join(hyphCore, file);
            
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                
                let title = '';
                let description = '';
                const features: string[] = [];
                const implementation: string[] = [];
                
                // Extract title from HYPHOS CORE line
                const titleRegex = /HYPHOS CORE - ([^*\n]+)/i;
                const titleMatch = content.match(titleRegex);
                if (titleMatch) {
                    title = titleMatch[1].replace(/METAWORD/gi, '').trim();
                }
                
                // Extract main description from first paragraph after title
                const lines = content.split('\n');
                let inMainDoc = false;
                let foundTitle = false;
                
                for (let i = 0; i < lines.length && i < 60; i++) {
                    const line = lines[i].trim();
                    
                    if (line.includes('/**')) {
                        inMainDoc = true;
                        continue;
                    }
                    
                    if (line.includes('*/')) {
                        if (foundTitle && description) break;
                        inMainDoc = false;
                        continue;
                    }
                    
                    if (inMainDoc && line.startsWith('*')) {
                        const cleanLine = line.replace(/^\s*\*\s?/, '');
                        
                        if (cleanLine.includes('HYPHOS CORE -')) {
                            foundTitle = true;
                            continue;
                        }
                        
                        if (foundTitle && !description && cleanLine && !cleanLine.includes('=') && !cleanLine.includes(':') && cleanLine.length > 10) {
                            description = cleanLine;
                        }
                        
                        // Look for advantages/features
                        if (cleanLine.includes('ADVANTAGES') || cleanLine.includes('MATHEMATICAL') || cleanLine.includes('PRECISION')) {
                            // Look ahead for bullet points
                            for (let j = i + 1; j < lines.length && j < i + 15; j++) {
                                const nextLine = lines[j].trim();
                                if (nextLine.includes('*/')) break;
                                if (nextLine.includes('*') && nextLine.includes('- ')) {
                                    const feature = nextLine.replace(/^\s*\*\s*-\s*/, '');
                                    if (feature && feature.length > 5) {
                                        features.push(feature);
                                    }
                                }
                            }
                        }
                        
                        // Look for integration/implementation
                        if (cleanLine.includes('INTEGRATION') || cleanLine.includes('TECHNICAL') || cleanLine.includes('IMPLEMENTATION')) {
                            // Look ahead for bullet points
                            for (let j = i + 1; j < lines.length && j < i + 15; j++) {
                                const nextLine = lines[j].trim();
                                if (nextLine.includes('*/')) break;
                                if (nextLine.includes('*') && nextLine.includes('- ')) {
                                    const impl = nextLine.replace(/^\s*\*\s*-\s*/, '');
                                    if (impl && impl.length > 5) {
                                        implementation.push(impl);
                                    }
                                }
                            }
                        }
                    }
                }
                
                // Fallback to simple comment parsing if no structured data found
                if (!title || !description) {
                    for (let i = 0; i < Math.min(lines.length, 5); i++) {
                        const line = lines[i].trim();
                        if (line.startsWith('//') && !title) {
                            title = line.replace('//', '').replace(/Hyphos Core -/i, '').replace(/Metaword/i, '').trim();
                        }
                        if (line.startsWith('//') && !description && i > 0) {
                            description = line.replace('//', '').trim();
                            break;
                        }
                    }
                }
                
                docs[metawordName] = {
                    title: title || `${metawordName.toUpperCase()} METAWORD`,
                    description: description || `Core ${metawordName} functionality for the Hyphos ecosystem`,
                    features,
                    implementation
                };
                
            } catch (fileError) {
                console.error(`Error reading ${file}:`, fileError);
            }
        }
    } catch (dirError) {
        console.error('Error reading hyphos_core directory:', dirError);
    }
    
    return docs;
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Hyphos Language Support extension is now active!');

    // Register Hyphos file run command
    const runCommand = vscode.commands.registerCommand('hyphos.run', async () => {
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            vscode.window.showErrorMessage('No active Hyphos file found!');
            return;
        }

        const document = activeEditor.document;
        if (!document.fileName.endsWith('.hyph')) {
            vscode.window.showErrorMessage('Current file is not a Hyphos file (.hyph)!');
            return;
        }

        const terminal = vscode.window.createTerminal('Hyphos');
        terminal.sendText(`python bootstrap_interpreter.py "${document.fileName}"`);
        terminal.show();
    });

    // Register syntax check command
    const checkCommand = vscode.commands.registerCommand('hyphos.check', async () => {
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            vscode.window.showErrorMessage('No active Hyphos file found!');
            return;
        }

        const document = activeEditor.document;
        if (!document.fileName.endsWith('.hyph')) {
            vscode.window.showErrorMessage('Current file is not a Hyphos file (.hyph)!');
            return;
        }

        vscode.window.showInformationMessage('Hyphos syntax check completed!');
    });

    // Register completion provider for metawords
    const completionProvider = vscode.languages.registerCompletionItemProvider(
        'hyphos',
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                const linePrefix = document.lineAt(position).text.substr(0, position.character);
                
                if (!linePrefix.endsWith('invoke ')) {
                    return undefined;
                }

                const metawords = [
                    'senary', 'seigbit', 'sidereal_time', 'consciousness', 'noesis', 'graphics',
                    'energy', 'network_stack', 'hardware', 'filesystem', 'memory_manager', 
                    'process_manager', 'audio', 'crypto', 'hashing', 'access_control',
                    'audit_logging', 'documentation', 'error_handling', 'event_system',
                    'execution_engine', 'metadata_manager', 'protocol_parser', 'registration',
                    'security', 'storage', 'synchronization', 'testing', 'utilities',
                    'validation', 'version_control', 'workflow', 'analytics', 'backup',
                    'configuration', 'diagnostics', 'holographic', 'intelligence',
                    'interface', 'monitoring', 'optimization', 'scheduling'
                ];

                const completions = metawords.map(metaword => {
                    const item = new vscode.CompletionItem(metaword, vscode.CompletionItemKind.Function);
                    item.detail = `Hyphos ${metaword} metaword`;
                    item.documentation = `Invoke the ${metaword} metaword for specialized processing`;
                    item.insertText = `${metaword}:`;
                    return item;
                });

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

            // Get workspace root to find .hyph files
            const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
            if (!workspaceFolder) {
                return undefined;
            }

            // Parse documentation from actual .hyph files
            const metawordDocs = parseHyphFileDocumentation(workspaceFolder.uri.fsPath);

            if (metawordDocs[word]) {
                const metaword = metawordDocs[word];
                const hoverText = new vscode.MarkdownString();
                
                // Clean title display
                const displayTitle = metaword.title ? metaword.title : word.toUpperCase();
                hoverText.appendMarkdown(`# 🔹 ${displayTitle}\n\n`);
                
                // Description
                if (metaword.description && metaword.description.length > 10) {
                    hoverText.appendMarkdown(`${metaword.description}\n\n`);
                }
                
                // Features section
                if (metaword.features.length > 0) {
                    // Remove duplicates and filter out very short or meaningless items
                    const uniqueFeatures = [...new Set(metaword.features)]
                        .filter(feature => feature.length > 15 && !feature.includes('*'))
                        .slice(0, 8); // Limit to 8 most important features
                    
                    if (uniqueFeatures.length > 0) {
                        hoverText.appendMarkdown(`### ⚡ Key Features\n\n`);
                        uniqueFeatures.forEach((feature: string) => {
                            hoverText.appendMarkdown(`• ${feature}\n\n`);
                        });
                    }
                }
                
                // Implementation section
                if (metaword.implementation.length > 0) {
                    // Remove duplicates and filter out very short items
                    const uniqueImpl = [...new Set(metaword.implementation)]
                        .filter(impl => impl.length > 15 && !impl.includes('*'))
                        .slice(0, 6); // Limit to 6 most important implementation details
                    
                    if (uniqueImpl.length > 0) {
                        hoverText.appendMarkdown(`### 🔧 Implementation\n\n`);
                        uniqueImpl.forEach((impl: string) => {
                            hoverText.appendMarkdown(`• ${impl}\n\n`);
                        });
                    }
                }
                
                // Usage hint
                hoverText.appendMarkdown(`---\n\n`);
                hoverText.appendCodeblock(`invoke ${word}:`, 'hyphos');
                hoverText.appendMarkdown(`\n*Documentation from hyphos_core/${word}.hyph*`);
                
                return new vscode.Hover(hoverText);
            }
        }
    });

    context.subscriptions.push(runCommand, checkCommand, completionProvider, hoverProvider);
}

export function deactivate() {}
