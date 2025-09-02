<script lang="ts">
  import { MarkdownUI } from '@markdown-ui/svelte';
  import '@markdown-ui/svelte/widgets.css';
  import { Marked } from 'marked';
  import { markedUiExtension } from '@markdown-ui/marked-ext';

  const marked = new Marked();
  marked.use(markedUiExtension);

  const comprehensiveTestMarkdown = `# Svelte Widget Test Suite

## TextInput Widgets

### Basic Text Input

### Text Input with Label
\`\`\`markdown-ui-widget
text-input name "Your Name" Enter your full name
\`\`\`

## ButtonGroup Widgets

### Basic Button Group
\`\`\`markdown-ui-widget
button-group size [Small Medium Large] Medium
\`\`\`

### Color Selection
\`\`\`markdown-ui-widget
button-group color [Red Green Blue Yellow] Red
\`\`\`

## Select Widgets

### Country Selection
\`\`\`markdown-ui-widget
select country ["United States" Canada United Kingdom Germany France Japan Australia] "United States"
\`\`\`

## SelectMulti Widgets

### Programming Languages
\`\`\`markdown-ui-widget
select-multi languages [JavaScript Python Java C++ Go Rust TypeScript] [JavaScript TypeScript]
\`\`\`

### Features Selection
\`\`\`markdown-ui-widget
select-multi features [Dark Mode Notifications Sync Offline Analytics Export] [Dark Mode Notifications]
\`\`\`

## Slider Widgets

### Basic Range (0-100)
\`\`\`markdown-ui-widget
slider volume 0 100 5 50
\`\`\`

### Temperature Control
\`\`\`markdown-ui-widget
slider temperature -10 40 0.5 20
\`\`\`

## Chart Widgets

### Line Chart - Sales Data
\`\`\`markdown-ui-widget
chart-line
id: sales-data
title: Monthly Sales Performance
height: 350
Month,Revenue,Profit
Jan,100,50
Feb,150,75
Mar,200,100
Apr,175,85
May,220,110
Jun,250,125
\`\`\`

### Bar Chart - Product Comparison
\`\`\`markdown-ui-widget
chart-bar
id: product-comparison
title: Quarterly Product Performance
height: 400
Product,Q1,Q2,Q3
Product A,100,110,120
Product B,150,160,170
Product C,120,140,135
Product D,180,170,190
\`\`\`

### Pie Chart - Market Share
\`\`\`markdown-ui-widget
chart-pie
id: market-share
title: Browser Market Share
height: 350
Browser,Share
Chrome,65
Safari,20
Firefox,8
Edge,5
Opera,2
\`\`\`

### Scatter Plot - Performance Metrics
\`\`\`markdown-ui-widget
chart-scatter
id: performance-metrics
title: Performance vs Response Time
height: 300
Test,Performance,Response Time
Test A,85,120
Test B,92,95
Test C,78,150
Test D,95,85
Test E,88,110
\`\`\`

## Form Widgets

### Simple Form
\`\`\`markdown-ui-widget
form quick-form "Save"
  text-input title "Title" "Give this a name"
  slider time 15 120 15 45
  select mood [Chill Focused Energized] Focused
\`\`\``;

  const renderedHtml = marked.parse(comprehensiveTestMarkdown);
</script>

<div class="min-h-screen bg-gray-50">
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 px-6 py-4">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Svelte Widget Test Suite</h1>
          <p class="text-gray-600 mt-1">Comprehensive testing page for all @markdown-ui/svelte widgets</p>
        </div>
        <div class="text-sm text-gray-500 font-mono bg-gray-100 px-3 py-1 rounded">
          @markdown-ui/svelte v0.2.0
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <div class="bg-white rounded-lg border border-gray-200 p-8 shadow-sm prose">
        <MarkdownUI html={renderedHtml} />
      </div>
    </div>
  </div>
</div>