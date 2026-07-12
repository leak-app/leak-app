# Skill: Initialize FSD Slice Segments

## Description
Automates the creation of standard Feature-Sliced Design (FSD) slices with structured public segments (`ui`, `model`, `lib`, `api`) and enforces explicit encapsulation using a Public API (`index.ts`). This ensures compliance with FSD architectural boundaries.

## Context & Constraints
*   **Architectural Guardrails**: FSD relies heavily on top-down, unidirectional layers. Slices must never be created anywhere except inside valid FSD layers.
*   **Target Directory**: By default, commands look for or create a `/src` directory in the current workspace workspace root.
*   **Valid Layers**: Only the following structural layers allow custom business slices:
    *   `screens`
    *   `widgets`
    *   `features`
    *   `entities`
*   **Strict Encapsulation**: Cross-slice imports must only go through the root `index.ts` (Public API) of a slice. No external file can deeply import a segment file directly (e.g., `features/auth/ui/Form.tsx` is forbidden; use `features/auth` instead).

## Requirements
*   **Runtime**: Node.js v16+
*   **Workspace**: A project folder containing (or preparing for) a `src/` directory.

## Implementation Script

The agent will execute this inline node script using system terminal tools.

```javascript
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const [layer, sliceName] = process.argv.slice(2);
const VALID_LAYERS = ['pages', 'widgets', 'features', 'entities'];

if (!layer || !sliceName) {
  console.error('❌ Error: Missing layer or slice name.');
  process.exit(1);
}

if (!VALID_LAYERS.includes(layer.toLowerCase())) {
  console.error(`❌ Error: Invalid layer "${layer}". Must be one of: ${VALID_LAYERS.join(', ')}`);
  process.exit(1);
}

const targetDir = path.join(process.cwd(), 'src', layer.toLowerCase(), sliceName.toLowerCase());
const segments = ['ui', 'model', 'lib', 'api'];

try {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  segments.forEach((segment) => {
    const segmentPath = path.join(targetDir, segment);
    fs.mkdirSync(segmentPath, { recursive: true });
    fs.writeFileSync(path.join(segmentPath, 'index.ts'), `// Public API for ${segment}\n`);
  });

  const publicApiContent = `// Public API for ${sliceName} ${layer}\n` +
    segments.map(seg => `export * from './${seg}';`).join('\n') + '\n';

  fs.writeFileSync(path.join(targetDir, 'index.ts'), publicApiContent);
  console.log(`✅ FSD Slice initialized at: src/${layer}/${sliceName}`);
} catch (error) {
  console.error('❌ Automation failed:', error.message);
  process.exit(1);
}
```

## Agent Execution Protocol

When requested to "initialize an FSD feature/slice/entity", the agent must follow these step-by-step instructions:

1.  **Sanitize Inputs**: Normalize the `layer` and `slice-name` parameters to lower-case. Verify that the requested layer matches one of the `VALID_LAYERS`.
2.  **Verify or Generate Script**: Check if an automation utility script already exists. If not, temporarily write the code above to `.agents/skills/init-fsd-segments/scripts/init-fsd.js` or execute it directly using a node string execution switch (`node -e "..."`).
3.  **Execute via Terminal**: Run the generation step with the proper parameters:
    ```bash
    node .agents/skills/init-fsd-segments/scripts/init-fsd.js <layer> <slice-name>
    ```
4.  **Confirm Structure Output**: Inspect the file system to ensure the following scaffolding tree matches exactly:
    ```text
    src/
    └── <layer>/
        └── <slice-name>/
            ├── api/index.ts
            ├── lib/index.ts
            ├── model/index.ts
            ├── ui/index.ts
            └── index.ts
    ```
5.  **Output Confirmation**: Inform the developer of the exact path created and log the status of the strict Public API exposure.
