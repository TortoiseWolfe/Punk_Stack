# PRP-10: Developer Experience

## Status: QUEUED
## Created: 2025-01-09
## Priority: Medium
## Target Completion: Week 7
## Dependencies: PRP-03 (Core Components)

## Objective
Create a comprehensive developer experience ecosystem with code generators, validation tools, development scripts, and documentation to accelerate development and maintain code quality.

## Consolidates
- Developer Tooling
- CLI tools
- Component generators
- Theme validators

## Success Criteria
- [ ] Component generator CLI tool
- [ ] Theme validation and preview tools
- [ ] Development scripts and automation
- [ ] Hot reload optimization (<1s refresh)
- [ ] Error overlay with actionable fixes
- [ ] TypeScript strict mode with full type coverage
- [ ] Git hooks for code quality
- [ ] Developer onboarding guide

## CLI Tools

### Component Generator
```typescript
#!/usr/bin/env node
// punk-cli: Component generator

import { program } from 'commander';
import { generateComponent } from './generators/component';
import { generateHook } from './generators/hook';
import { generatePage } from './generators/page';

program
  .version('1.0.0')
  .description('Punk Stack CLI for rapid development');

program
  .command('component <name>')
  .alias('c')
  .description('Generate a new component')
  .option('-t, --type <type>', 'Component type (atom|molecule|organism)', 'atom')
  .option('-s, --stories', 'Include Storybook stories')
  .option('-T, --tests', 'Include test file')
  .option('-d, --dir <dir>', 'Custom directory')
  .action((name, options) => {
    generateComponent(name, options);
  });

program
  .command('hook <name>')
  .alias('h')
  .description('Generate a custom hook')
  .option('-t, --tests', 'Include test file')
  .action((name, options) => {
    generateHook(name, options);
  });

program
  .command('page <name>')
  .alias('p')
  .description('Generate a new page')
  .option('-l, --layout <layout>', 'Page layout', 'default')
  .option('-r, --route <route>', 'Custom route path')
  .action((name, options) => {
    generatePage(name, options);
  });

program.parse(process.argv);
```

### Component Generator Implementation
```typescript
// generators/component.ts
import fs from 'fs-extra';
import path from 'path';
import { pascalCase, kebabCase } from 'change-case';

interface ComponentOptions {
  type: 'atom' | 'molecule' | 'organism';
  stories?: boolean;
  tests?: boolean;
  dir?: string;
}

export async function generateComponent(name: string, options: ComponentOptions) {
  const componentName = pascalCase(name);
  const fileName = kebabCase(name);
  const dir = options.dir || `components/${options.type}s`;
  
  // Component template
  const componentTemplate = `import React from 'react';
import { clsx } from 'clsx';

export interface ${componentName}Props {
  className?: string;
  children?: React.ReactNode;
}

export const ${componentName}: React.FC<${componentName}Props> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={clsx('${fileName}', className)} {...props}>
      {children}
    </div>
  );
};

${componentName}.displayName = '${componentName}';
`;

  // Story template
  const storyTemplate = `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: '${options.type}s/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '${componentName} content',
  },
};
`;

  // Test template
  const testTemplate = `import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('renders children correctly', () => {
    render(<${componentName}>Test Content</${componentName}>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <${componentName} className="custom-class">Content</${componentName}>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
`;

  // Create files
  const componentPath = path.join(dir, `${componentName}.tsx`);
  await fs.ensureDir(dir);
  await fs.writeFile(componentPath, componentTemplate);
  
  if (options.stories) {
    await fs.writeFile(
      path.join(dir, `${componentName}.stories.tsx`),
      storyTemplate
    );
  }
  
  if (options.tests) {
    await fs.writeFile(
      path.join(dir, `${componentName}.test.tsx`),
      testTemplate
    );
  }
  
  console.log(`✅ Component ${componentName} created at ${componentPath}`);
}
```

## Theme Validation Tools

### Theme Validator
```typescript
// tools/theme-validator.ts
interface ThemeValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  contrastIssues: ContrastIssue[];
}

interface ContrastIssue {
  foreground: string;
  background: string;
  ratio: number;
  required: number;
  level: 'AA' | 'AAA';
}

export class ThemeValidator {
  validateTheme(theme: ThemeConfig): ThemeValidationResult {
    const result: ThemeValidationResult = {
      valid: true,
      errors: [],
      warnings: [],
      contrastIssues: []
    };
    
    // Validate required colors
    const requiredColors = [
      'primary', 'secondary', 'accent', 'neutral',
      'base-100', 'base-200', 'base-300',
      'info', 'success', 'warning', 'error'
    ];
    
    requiredColors.forEach(color => {
      if (!theme.colors[color]) {
        result.errors.push(`Missing required color: ${color}`);
        result.valid = false;
      }
    });
    
    // Validate color contrast
    this.validateContrast(theme, result);
    
    // Validate semantic relationships
    this.validateSemantics(theme, result);
    
    return result;
  }
  
  private validateContrast(theme: ThemeConfig, result: ThemeValidationResult) {
    const pairs = [
      { bg: 'base-100', fg: 'base-content', level: 'AA' },
      { bg: 'primary', fg: 'primary-content', level: 'AA' },
      { bg: 'secondary', fg: 'secondary-content', level: 'AA' },
      // ... other pairs
    ];
    
    pairs.forEach(pair => {
      const ratio = getContrastRatio(
        theme.colors[pair.bg],
        theme.colors[pair.fg]
      );
      
      const required = pair.level === 'AAA' ? 7 : 4.5;
      
      if (ratio < required) {
        result.contrastIssues.push({
          background: pair.bg,
          foreground: pair.fg,
          ratio,
          required,
          level: pair.level
        });
        result.valid = false;
      }
    });
  }
  
  private validateSemantics(theme: ThemeConfig, result: ThemeValidationResult) {
    // Check semantic color relationships
    const primaryLuminance = getLuminance(theme.colors.primary);
    const secondaryLuminance = getLuminance(theme.colors.secondary);
    
    if (Math.abs(primaryLuminance - secondaryLuminance) < 0.1) {
      result.warnings.push(
        'Primary and secondary colors have similar luminance, may lack hierarchy'
      );
    }
  }
}
```

### Theme Preview Tool
```typescript
// tools/theme-preview.tsx
export const ThemePreview: React.FC<{ theme: ThemeConfig }> = ({ theme }) => {
  return (
    <div className="theme-preview" style={{ '--theme': theme }}>
      <div className="color-palette">
        {Object.entries(theme.colors).map(([name, value]) => (
          <div key={name} className="color-swatch">
            <div 
              className="swatch" 
              style={{ backgroundColor: value }}
            />
            <div className="label">{name}</div>
            <div className="value">{value}</div>
          </div>
        ))}
      </div>
      
      <div className="component-preview">
        <h3>Component Preview</h3>
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Input placeholder="Input field" />
        <Card>
          <h4>Card Title</h4>
          <p>Card content with theme colors</p>
        </Card>
      </div>
      
      <div className="contrast-checker">
        <h3>Contrast Validation</h3>
        <ContrastGrid theme={theme} />
      </div>
    </div>
  );
};
```

## Development Scripts

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "dev:debug": "NODE_OPTIONS='--inspect' next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --cache --cache-location .eslintcache",
    "lint:fix": "eslint . --fix",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui",
    "e2e": "playwright test",
    "e2e:ui": "playwright test --ui",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "analyze": "ANALYZE=true next build",
    "clean": "rm -rf .next out coverage storybook-static",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "prepare": "husky install",
    "generate:component": "punk-cli component",
    "generate:hook": "punk-cli hook",
    "generate:page": "punk-cli page",
    "validate:theme": "node scripts/validate-theme.js",
    "perf:lighthouse": "lighthouse http://localhost:3000 --view",
    "deps:check": "npm-check-updates",
    "deps:update": "npm-check-updates -u"
  }
}
```

### Git Hooks (Husky + lint-staged)
```javascript
// .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged

// .lintstagedrc.js
module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    'prettier --write',
    'vitest related --run'
  ],
  '*.{css,scss}': [
    'stylelint --fix',
    'prettier --write'
  ],
  '*.{json,md,yml}': [
    'prettier --write'
  ]
};

// .husky/commit-msg
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx commitlint --edit $1

// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation
        'style',    // Formatting
        'refactor', // Code change that neither fixes a bug nor adds a feature
        'perf',     // Performance improvement
        'test',     // Adding tests
        'chore',    // Maintenance
        'revert',   // Revert previous commit
        'build',    // Build system
        'ci'        // CI/CD
      ]
    ]
  }
};
```

## TypeScript Configuration

### Strict TypeScript Setup
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      { "name": "next" }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./components/*"],
      "@lib/*": ["./lib/*"],
      "@hooks/*": ["./hooks/*"],
      "@utils/*": ["./utils/*"],
      "@types/*": ["./types/*"]
    },
    
    // Strict checks
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "exactOptionalPropertyTypes": true,
    "forceConsistentCasingInFileNames": true,
    "allowUnreachableCode": false,
    "allowUnusedLabels": false
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Error Handling

### Custom Error Overlay
```typescript
// lib/dev/error-overlay.tsx
export const ErrorOverlay: React.FC<{ error: Error }> = ({ error }) => {
  const [expanded, setExpanded] = useState(false);
  const suggestions = getSuggestions(error);
  
  return (
    <div className="error-overlay">
      <div className="error-header">
        <h2>⚠️ {error.name}</h2>
        <p>{error.message}</p>
      </div>
      
      {suggestions.length > 0 && (
        <div className="error-suggestions">
          <h3>💡 Possible fixes:</h3>
          <ul>
            {suggestions.map((suggestion, i) => (
              <li key={i}>
                <code>{suggestion.code}</code>
                <p>{suggestion.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="error-stack">
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Hide' : 'Show'} stack trace
        </button>
        {expanded && (
          <pre>{formatStackTrace(error.stack)}</pre>
        )}
      </div>
    </div>
  );
};

function getSuggestions(error: Error): Suggestion[] {
  const suggestions: Suggestion[] = [];
  
  if (error.message.includes('Cannot find module')) {
    suggestions.push({
      code: 'npm install',
      description: 'Install missing dependencies'
    });
  }
  
  if (error.message.includes('Type error')) {
    suggestions.push({
      code: 'npm run type-check',
      description: 'Run TypeScript type checking'
    });
  }
  
  // ... more suggestions
  
  return suggestions;
}
```

## Developer Documentation

### README Template
```markdown
# Component Name

## Usage
\`\`\`tsx
import { ComponentName } from '@/components/atoms/ComponentName';

<ComponentName prop="value">
  Content
</ComponentName>
\`\`\`

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop1 | string | - | Description |
| prop2 | boolean | false | Description |

## Examples
### Basic Usage
\`\`\`tsx
<ComponentName>Basic example</ComponentName>
\`\`\`

### Advanced Usage
\`\`\`tsx
<ComponentName
  prop1="value"
  prop2={true}
  onEvent={handleEvent}
>
  Advanced example
</ComponentName>
\`\`\`

## Accessibility
- ARIA attributes used
- Keyboard navigation support
- Screen reader considerations

## Testing
\`\`\`bash
npm test ComponentName
\`\`\`
```

## VS Code Integration

### Recommended Extensions
```json
// .vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "csstools.postcss",
    "prisma.prisma",
    "styled-components.vscode-styled-components",
    "mikestead.dotenv",
    "christian-kohler.path-intellisense",
    "christian-kohler.npm-intellisense",
    "zignd.html-css-class-completion",
    "formulahendry.auto-rename-tag"
  ]
}
```

### VS Code Settings
```json
// .vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## Deliverables
1. CLI tool package with generators
2. Theme validation and preview tools
3. Development scripts and automation
4. Git hooks configuration
5. TypeScript strict configuration
6. Error overlay implementation
7. Developer documentation
8. VS Code workspace configuration

## References
- Commander.js: https://github.com/tj/commander.js
- Plop.js: https://plopjs.com/
- Husky: https://typicode.github.io/husky/
- TypeScript Handbook: https://www.typescriptlang.org/docs/