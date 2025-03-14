# Changelog

All notable changes to the AI Refactoring Agent will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project structure
- Basic GitHub Action configuration
- Support for Python and TypeScript refactoring
- GitHub Pull Request integration
- Refactoring types: variable renaming, code formatting, method extraction, duplicate code removal, dead code elimination

### Changed
- Simplified action.yml to only include github-token input
- Removed SecurityManager for a more streamlined approach
- Improved error handling with proper GitHub Actions logging

### Fixed
- TypeScript type safety issues in PullRequestManager
