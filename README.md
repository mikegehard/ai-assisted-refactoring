# AI Refactoring Agent

A GitHub Action that automatically analyzes repositories and suggests code refactorings as pull requests. The agent runs on a nightly schedule, identifying potential improvements to code quality without requiring manual developer intervention.

## Key Features

- **Automated Refactoring**: Identifies and suggests code improvements automatically
- **Developer-Friendly**: Creates clear, actionable pull requests that are easy to review
- **Configurable**: Uses sensible defaults while maintaining flexibility

## Initial Language Support

- Python
- TypeScript

## Refactoring Capabilities

- Variable renaming for clarity
- Code formatting improvements
- Simple method extraction
- Removal of duplicate code
- Dead code elimination

## Getting Started

Configuration is managed through `.github/workflows/ai-refactor.yml`. Detailed setup instructions and examples coming soon.

## Project Status

This project is currently in development. The MVP (Phase 1) development timeline is estimated at 8-12 weeks.

## Contributing

See [DEVELOPMENT.md](DEVELOPMENT.md) for information on setting up the development environment and contributing to the project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
