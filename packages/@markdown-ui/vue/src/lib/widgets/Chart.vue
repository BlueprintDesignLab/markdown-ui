<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineController,
  BarController,
  PieController,
  ScatterController
} from 'chart.js';

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineController,
  BarController,
  PieController,
  ScatterController
);

interface Dataset {
  label: string;
  data: number[];
}

interface Props {
  type: "chart-line" | "chart-bar" | "chart-pie" | "chart-scatter";
  title?: string;
  height?: number;
  labels: string[];
  datasets: Dataset[];
  options?: Record<string, any>;
}

const props = withDefaults(defineProps<Props>(), {
  height: 400,
  options: () => ({})
});

const emit = defineEmits<{
  change: [data: any]
}>();

// Clamp height to safe bounds: 200px min, 800px max, 400px default
const safeHeight = Math.max(200, Math.min(800, props.height || 400));

const canvasRef = ref<HTMLCanvasElement>();
let chart: Chart | null = null;

const getChartType = (widgetType: string) => {
  switch (widgetType) {
    case 'chart-line': return 'line';
    case 'chart-bar': return 'bar';
    case 'chart-pie': return 'pie';
    case 'chart-scatter': return 'scatter';
    default: return 'line';
  }
};

const getDefaultColors = () => [
  'rgb(75, 192, 192)',
  'rgb(255, 99, 132)',
  'rgb(54, 162, 235)',
  'rgb(255, 206, 86)',
  'rgb(153, 102, 255)',
  'rgb(255, 159, 64)'
];

const prepareDatasets = (datasets: Dataset[], chartType: string) => {
  const colors = getDefaultColors();
  
  return datasets.map((dataset, index) => {
    const color = colors[index % colors.length];
    
    if (chartType === 'pie') {
      return {
        ...dataset,
        backgroundColor: colors.slice(0, dataset.data.length),
        borderColor: colors.slice(0, dataset.data.length),
        borderWidth: 1
      };
    } else {
      return {
        ...dataset,
        borderColor: color,
        backgroundColor: chartType === 'line' ? color + '20' : color,
        borderWidth: 2,
        fill: chartType === 'line' ? false : true
      };
    }
  });
};

onMounted(() => {
  if (!canvasRef.value) return;

  const chartType = getChartType(props.type);
  const preparedDatasets = prepareDatasets(props.datasets, chartType);

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: !!props.title,
        text: props.title || ''
      },
      legend: {
        display: props.datasets.length > 1 || chartType === 'pie'
      }
    },
    onClick: (_event: any, elements: any[]) => {
      if (elements.length > 0) {
        const element = elements[0];
        const dataIndex = element.index;
        const datasetIndex = element.datasetIndex;
        
        emit('change', {
          label: props.labels[dataIndex],
          value: props.datasets[datasetIndex]?.data[dataIndex],
          datasetLabel: props.datasets[datasetIndex]?.label,
          dataIndex,
          datasetIndex
        });
      }
    }
  };

  const mergedOptions = { ...defaultOptions, ...props.options };

  chart = new Chart(canvasRef.value, {
    type: chartType as any,
    data: {
      labels: props.labels,
      datasets: preparedDatasets
    },
    options: mergedOptions
  });
});

onUnmounted(() => {
  if (chart) {
    chart.destroy();
    chart = null;
  }
});
</script>

<template>
  <div class="widget-chart" :style="{ height: `${safeHeight}px` }">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style scoped>
.widget-chart {
  position: relative;
  width: 100%;
}

canvas {
  max-width: 100%;
  height: 100%;
}
</style>