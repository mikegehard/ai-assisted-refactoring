# AI Refactoring Agent: Development Guide

This document provides instructions for setting up the development environment and contributing to the AI Refactoring Agent project.

## Development Environment Setup

### Prerequisites

- Node.js 20.x or later
- npm 9.x or later
- Git

### Initial Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/mikegehard/ai-assisted-refactoring.git
   cd ai-assisted-refactoring
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run package
   ```

## Project Structure

```
ai-assisted-refactoring/
├── .github/
│   └── workflows/       # GitHub Actions workflow files
│       └── ai-refactor.yml  # Sample workflow for users
├── src/
│   ├── config/          # Configuration management
│   ├── github/          # GitHub API integration
│   ├── refactoring/     # Refactoring engines
│   │   ├── python/      # Python-specific refactoring
│   │   └── typescript/  # TypeScript-specific refactoring
│   ├── utils/           # Utility functions
│   └── index.ts         # Main entry point
├── dist/                # Compiled JavaScript (generated)
├── action.yml           # GitHub Action definition
├── package.json         # Node.js dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Development Workflow

### Building the Action

```bash
npm run package
```

This command compiles the TypeScript code and bundles it into a single JavaScript file in the `dist` directory using `@vercel/ncc`.

### Linting

```bash
npm run lint
```

### Testing

```bash
npm test
```

### Formatting Code

```bash
npm run format
```

## GitHub Action Development

The GitHub Action is defined in `action.yml` and uses the compiled JavaScript in `dist/index.js` as its entry point.

### Inputs

The action accepts the following input:

- `github-token`: GitHub token used to create pull requests

Note: The action uses the following default values internally:
- `include-dirs`: Default is '.' (current directory)
- `exclude-dirs`: Default is 'node_modules,dist,build,.git,.github'
- `refactoring-types`: Default is 'variable-renaming,code-formatting,method-extraction,duplicate-code,dead-code'
- `max-files-per-pr`: Default is 10

### Testing the Action Locally

1. Make changes to the code
2. Build the action: `npm run package`
3. Create a test repository with sample Python and TypeScript code
4. Create a workflow file in the test repository that uses your local action
5. Run the workflow manually using the GitHub CLI or through the GitHub UI

## Implementation Details

### Refactoring Engine

The refactoring engine is responsible for analyzing code and suggesting improvements. It supports:

- Variable renaming
- Code formatting
- Method extraction
- Duplicate code removal
- Dead code elimination

### GitHub Integration

The GitHub integration handles:

- Repository access
- Branch creation
- Pull request creation and formatting
- PR labeling

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
   - Please include both **what** was changed and **why** it was changed in your commit message
   - Example: `Add TypeScript strict null checks to prevent runtime errors from null references`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## Versioning

We use semantic versioning (SemVer) for this project:

- Major version: Breaking changes
- Minor version: New features, no breaking changes
- Patch version: Bug fixes, no breaking changes

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create a new GitHub release with release notes
4. Tag the release with the version number
