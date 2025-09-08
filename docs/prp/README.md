# PRP (Punk Rock Prompts) Lifecycle Management

## Overview
PRPs are **temporary specifications** that guide implementation. They flow through a defined lifecycle from queue to active development to archival, ensuring requirements are met while avoiding documentation drift.

## Directory Structure
```
/docs/prp/
├── active/           # PRPs currently being implemented (1-2 max)
│   ├── 00-punk-stack-master.md  # Overarching vision (permanent)
│   └── 01-theme-system.md        # Current focus
├── queue/            # PRPs waiting for implementation
│   ├── 02-pwa-offline-first.md
│   └── 03-components.md
├── archive/          # Completed PRPs (historical reference)
│   └── 2025-Q1/
└── README.md         # This file
```

## PRP Lifecycle

### 0. Queue Phase
- PRPs in `/docs/prp/queue/` await their turn
- Prioritized by master plan (PRP-00)
- Move to active when slot opens (max 1-2 active)

### 1. Active Phase
- PRPs in `/docs/prp/active/` are living specifications
- **Maximum 1-2 PRPs active** to maintain focus
- PRP-00 is permanent overarching document
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
Queue → Active (1-2 max) → Implementation → Tests Validate → Archive → Documentation Lives in Code
```

## Active Slot Management

### Rules for Active PRPs
1. **Focus**: Maximum 1-2 PRPs active simultaneously
2. **Timeboxed**: Each PRP has 2-week implementation window
3. **Completion**: Must pass all tests before rotation
4. **Documentation**: Extract decisions before archival

### When to Rotate
- ✅ All success criteria met
- ✅ Tests written and passing
- ✅ Code commented with PRP references
- ✅ Key decisions extracted to ADRs
- ✅ Ready for archive with notes

## Why This Approach?

1. **Focused Development**: Limited active PRPs prevent context switching
2. **No Documentation Drift**: Code and tests become the source of truth
3. **Clear History**: Archives show what was planned vs. built
4. **Audit Trail**: Proves we built what was specified
5. **Living Documentation**: Storybook, tests, and comments stay current

## Example Workflow

1. Create PRP in `/docs/prp/queue/04-new-feature.md`
2. Wait for active slot (when current PRP completes)
3. Move to `/docs/prp/active/` when ready
4. Implement based on PRP specifications
5. Write tests that validate PRP requirements
6. Add source comments referencing PRP
7. Move PRP to `/docs/prp/archive/2025-Q1/`
8. Extract decisions to `/docs/decisions/`
9. Pull next PRP from queue

## Key Principle
PRPs are **scaffolding** - necessary during construction but removed once the building stands, leaving only a historical record of the blueprint.