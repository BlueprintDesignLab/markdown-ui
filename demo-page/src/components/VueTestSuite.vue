<script setup lang="ts">
import { MarkdownUI } from '@markdown-ui/vue';
import '@markdown-ui/vue/widgets.css';
import { Marked } from 'marked';
import { markedUiExtension } from '@markdown-ui/marked-ext';

const marked = new Marked();
marked.use(markedUiExtension);

const comprehensiveTestMarkdown = `# Vue Widget Test Suite

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
select-multi features ["Dark Mode" Notifications Sync Offline Analytics Export] ["Dark Mode" Notifications]
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
id: vue-sales-data
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
id: vue-product-comparison
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
id: vue-market-share
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
id: vue-performance-metrics
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
form vue-quick-form "Save"
  text-input title "Title" "Give this a name"
  slider time 15 120 15 45
  select mood [Chill Focused Energized] Focused
\`\`\`

### User Preferences Form
\`\`\`markdown-ui-widget
form vue-preferences-form "Save Preferences"
  button-group theme ["Light" "Dark" "Auto"] "Auto"
  select-multi notifications [Email Push SMS In-App] [Email Push]
slider volume 0 100 10 50
\`\`\`

---

**Testing Instructions:**
- Interact with each widget type above
- Verify all widgets render and function correctly
- Check responsiveness on different screen sizes`;

// Append MCQ, SAQ, and Quiz demos matching the React suite
const quizAndQA = `

## Quiz Components

### Multiple Choice Question - Basic (No feedback, great for forms/surveys)
Simple selection without validation - perfect for collecting preferences or opinions.
\`\`\`markdown-ui-widget
multiple-choice-question q1 "What is the capital of France?" ["Paris" "London" "Berlin" "Madrid"]
\`\`\`

### Multiple Choice Question - With Instant Feedback (Perfect for learning/testing)
Immediate validation with correct answer revealed - ideal for educational content.
\`\`\`markdown-ui-widget
multiple-choice-question q2 "Which programming language was created by Brendan Eich?" ["JavaScript" "Python" "Java" "C++"] "JavaScript" true
\`\`\`

### Short Answer Question - Basic (No validation, great with submit buttons)
Simple text input without validation - perfect for open-ended responses in forms.
\`\`\`markdown-ui-widget
short-answer-question q3 "What does HTML stand for?"
\`\`\`

### Short Answer Question - With Instant Validation (Perfect for quizzes)
Immediate feedback with correct answer checking - great for educational assessments.
\`\`\`markdown-ui-widget
short-answer-question q4 "What is 2 + 2?" "Enter a number" "4" true
\`\`\`

### Short Answer Question - Open Response (For surveys/feedback)
Custom placeholder for collecting detailed responses - no right or wrong answers.
\`\`\`markdown-ui-widget
short-answer-question q5 "Describe your favorite programming concept" "Type your thoughts here..."
\`\`\`

## Quiz Component

### JavaScript Fundamentals Quiz - Full Featured
Complete quiz with scoring, progress tracking, and mixed question types.
\`\`\`markdown-ui-widget
quiz js-fundamentals "JavaScript Fundamentals Quiz"
showScore: true
showProgress: true  
passingScore: 70

mcq q1 "What is JavaScript?" 10 ["Programming language" "Markup language" "Database"] "Programming language"
short-answer q2 "Name a JavaScript framework" 15 "Enter framework name" ["React" "Vue" "Angular" "Svelte"]
mcq q3 "JavaScript is typed as?" 5 ["Static" "Dynamic" "Both"] "Dynamic"
short-answer q4 "What does 'DOM' stand for?" 20 "Enter your answer" ["Document Object Model"]
\`\`\`
`;

const renderedHtml = marked.parse(comprehensiveTestMarkdown + quizAndQA);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="bg-white border-b border-gray-200 px-6 py-4">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Vue Widget Test Suite</h1>
            <p class="text-gray-600 mt-1">Comprehensive testing page for all @markdown-ui/vue widgets</p>
          </div>
          <div class="text-sm text-gray-500 font-mono bg-gray-100 px-3 py-1 rounded">
            @markdown-ui/vue v0.2.0
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6">
        <div class="bg-white rounded-lg border border-gray-200 p-8 shadow-sm prose">
          <MarkdownUI :html="renderedHtml" />
        </div>
      </div>
    </div>
  </div>
</template>
