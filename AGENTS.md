# Bingo Mixer - Agent Instructions

## Project Overview
Bingo Mixer is a social bingo game built with React 19, TypeScript, Vite, and Tailwind CSS v4. It's designed for in-person mixers where players find people matching question prompts to mark their bingo boards.

See [README.md](README.md) for setup and overview.

## Key Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests with Vitest
- `npm run lint` - Lint with ESLint

## Architecture
- **Frontend**: React functional components with hooks
- **Styling**: Tailwind CSS v4
- **Build**: Vite with TypeScript
- **Testing**: Vitest with React Testing Library
- **State**: Custom hook `useBingoGame` manages game logic

Key directories:
- `src/components/` - UI components (BingoBoard, GameScreen, etc.)
- `src/hooks/` - Custom hooks
- `src/utils/` - Game logic utilities
- `src/data/` - Question data
- `src/types/` - TypeScript types

## Conventions
- Use TypeScript for all code
- Functional components with hooks
- Immutable state updates
- Comprehensive unit tests for logic
- ESLint for code quality

## Available Custom Agents
This project includes specialized agents for development workflows:

- **TDD Supervisor** ([tdd.agent.md](.github/agents/tdd.agent.md)) - Orchestrates TDD cycles
- **TDD Red** ([tdd-red.agent.md](.github/agents/tdd-red.agent.md)) - Writes failing tests
- **TDD Green** ([tdd-green.agent.md](.github/agents/tdd-green.agent.md)) - Implements minimal code
- **TDD Refactor** ([tdd-refactor.agent.md](.github/agents/tdd-refactor.agent.md)) - Refactors code
- **UI Review** ([ui-review.agent.md](.github/agents/ui-review.agent.md)) - Reviews UI changes
- **Quiz Master** ([quiz-master.agent.md](.github/agents/quiz-master.agent.md)) - Manages quiz content
- **Pixel Jam** ([pixel-jam.agent.md](.github/agents/pixel-jam.agent.md)) - Creative design tasks

See workshop guides in [workshop/](workshop/) for usage examples.

## File Instructions
- **Frontend Design** ([frontend-design.instructions.md](.github/instructions/frontend-design.instructions.md)) - UI/UX guidelines
- **Tailwind v4** ([tailwind-4.instructions.md](.github/instructions/tailwind-4.instructions.md)) - Tailwind CSS v4 features

## Skills
- **Dogfooding** ([dogfooding/SKILL.md](.github/skills/dogfooding/SKILL.md)) - Provides critical user experience feedback on web apps, focusing on fun and engagement

- **Design Guide** ([design-guide.instructions.md](.github/instructions/design-guide.instructions.md)) - Guidelines for minimalist monochrome designs
