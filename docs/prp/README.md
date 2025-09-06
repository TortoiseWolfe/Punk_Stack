# PRP (Punk Rock Prompts) Lifecycle Management

## Overview
PRPs are **temporary specifications** that guide implementation. They flow through a defined lifecycle from active development to archival, ensuring requirements are met while avoiding documentation drift.

## Directory Structure
```
/docs/prp/
├── active/           # PRPs currently being implemented
├── archive/          # Completed PRPs (historical reference)
└── README.md         # This file
```

## PRP Lifecycle

### 1. Active Phase
- PRPs in `/docs/prp/active/` are living specifications
- Numbered sequentially (01-xxx.md, 02-xxx.md)
- Guide current implementation work
- Updated as requirements evolve during development

### 2. Implementation Phase
PRPs rotate into:
- **Source Code**: Comments reference original PRP requirements
- **Test Specs**: Tests validate PRP success criteria
- **ADRs**: Architectural decisions extracted to `/docs/decisions/`
- **Storybook**: Living documentation of actual behavior

### 3. Archive Phase
- Completed PRPs move to `/docs/prp/archive/`
- Organized by completion date (YYYY-QX/)
- Include completion notes and implementation references
- Serve as historical record and audit trail

## The Rotation Pattern
```
PRP Active → Implementation → Tests Validate → Archive PRP → Documentation Lives in Code
```

## Why This Approach?

1. **No Documentation Drift**: Code and tests become the source of truth
2. **Clear History**: Archives show what was planned vs. built
3. **Audit Trail**: Proves we built what was specified
4. **Living Documentation**: Storybook, tests, and comments stay current

## Example Workflow

1. Create PRP in `/docs/prp/active/01-theme-system.md`
2. Implement based on PRP specifications
3. Write tests that validate PRP requirements
4. Add source comments referencing PRP
5. Move PRP to `/docs/prp/archive/2025-Q1/`
6. Extract decisions to `/docs/decisions/`

## Key Principle
PRPs are **scaffolding** - necessary during construction but removed once the building stands, leaving only a historical record of the blueprint.