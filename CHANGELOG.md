# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.3] - 2024-11-28

### Added
- Component registry to prevent duplicate registrations
- Memory leak prevention with automatic cleanup of event listeners
- Reactive attribute observation system with `attributeChangedCallback`
- State management with `setState` and `getState` methods
- Template support via `template` property in DescribeOptions
- `beforeMount` lifecycle hook execution
- Proper Shadow DOM encapsulation with CSS-in-JS styling
- `render()` method for manual component re-rendering
- Helper functions: `isComponentRegistered()` and `getRegisteredComponents()`
- Comprehensive documentation with examples
- Landing page with live demos
- 5 interactive example files
- GitHub Actions for CI/CD, version bumping, and JSR publishing

### Fixed
- Memory leaks from uncleaned event listeners in child elements
- Component re-registration crashes
- Closure over description object causing memory bloat
- Missing `beforeMount` hook invocation
- Duplicate slot creation on component reconnection
- Incorrect style application (now uses Shadow DOM properly)
- Broken recursive child building

### Changed
- Refactored `build()` function for production readiness
- Improved `buildElement()` with cleanup function tracking
- Better lifecycle management with `isInitialized` flag
- CSS styles now applied via `<style>` tags instead of inline
- Enhanced component encapsulation and isolation

## [0.1.2] - 2024-XX-XX

### Added
- Initial GitHub Actions workflow for publishing

## [0.1.1] - 2024-XX-XX

### Added
- Basic component building functionality
- Shadow DOM support
- Theme system with CSS variables
- Event emission system

## [0.1.0] - 2024-XX-XX

### Added
- Initial release
- Basic `build()` and `describe()` functions
- Support for nested components
- Styling and theming capabilities
