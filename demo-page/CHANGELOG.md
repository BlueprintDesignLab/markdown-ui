# Changelog

All notable changes to the markdown-ui demo will be documented in this file.

## [0.2.0] - 2025-08-31

### Added
- **Interactive Chart Widgets** - Full Chart.js integration with support for multiple chart types
  - Line charts (`chart-line`)
  - Bar charts (`chart-bar`) 
  - Pie charts (`chart-pie`)
  - Scatter plots (`chart-scatter`)
- **CSV Data Format** - LLM-friendly data input using CSV format in DSL
- **Interactive Features** - Click events on chart elements with data callbacks
- **Responsive Design** - Charts automatically adapt to container sizes
- **Color Theming** - Automatic color assignment with default color palette
- **Chart Examples** - Comprehensive demo examples showcasing all chart types

### Technical
- Integrated Chart.js with Svelte components
- Enhanced markdown-ui parser to support CSV parsing
- Added Chart widget types to TypeScript definitions
- Established proper Chart.js controller registration
- Implemented monorepo workspace structure for development

### Examples Added
- Sales performance line chart with monthly data
- Department comparison bar chart
- Market share pie chart visualization
- All examples use CSV format for easy LLM generation

## [0.1.0] - Initial Release
- Basic markdown-ui widget system
- Core DSL parser functionality
- Initial demo page setup