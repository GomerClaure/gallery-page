# AGENTS

## Purpose
This file defines how AI agents must behave when modifying this repository.

## Core Rules
- Do not duplicate logic, styles, components, or data structures
- Do not over-architect the codebase
- Clean up dead code when it is clearly unused and safe to remove
- Respect existing names when they are coherent with current conventions
- Keep compilation stable after every change

## Expected Behavior
- Prefer small, direct solutions over introducing new layers
- Reuse existing feature structure before creating new folders
- Keep code close to the feature that owns it
- Move code to `shared` only when reuse is real, not speculative
- Preserve SPA-first behavior and the current standalone Angular approach
- Use Signals for local reactive UI state unless a different pattern is already justified

## Refactoring Rules
- Remove unused imports, dead files, and obsolete components as part of normal cleanup
- Do not keep parallel implementations of the same UI pattern
- Do not add facades, stores, repositories, or abstraction layers without a concrete need
- Do not rename coherent symbols just for stylistic preference
- If a name is inconsistent and actively harmful, rename it consistently across the owning feature

## Stability Rules
- Do not leave broken imports, stale routes, or orphaned references
- Keep route behavior unchanged unless the task explicitly changes navigation
- Prefer safe incremental edits over broad speculative rewrites
- When moving files, update imports, tests, and route references in the same change
- If validation tools are available, use them before finishing

## Quality Bar
- The repository should be simpler after the change than before it
- New code should match the existing architecture:
  - `core` for global concerns
  - `shared` for real reuse
  - `features` for product flows
- Prefer deleting unused code over documenting around it
