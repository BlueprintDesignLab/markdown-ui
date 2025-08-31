<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
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
    labels: string[];
    datasets: Dataset[];
    options?: Record<string, any>;
    onchange: (data: any) => void;
  }

  let { type, title, labels, datasets, options = {}, onchange }: Props = $props();

  let canvas: HTMLCanvasElement;
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

  onMount(() => {
    if (!canvas) return;

    const chartType = getChartType(type);
    const preparedDatasets = prepareDatasets(datasets, chartType);

    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: !!title,
          text: title || ''
        },
        legend: {
          display: datasets.length > 1 || chartType === 'pie'
        }
      },
      onClick: (_event: any, elements: any[]) => {
        if (elements.length > 0) {
          const element = elements[0];
          const dataIndex = element.index;
          const datasetIndex = element.datasetIndex;
          
          onchange({
            label: labels[dataIndex],
            value: datasets[datasetIndex]?.data[dataIndex],
            datasetLabel: datasets[datasetIndex]?.label,
            dataIndex,
            datasetIndex
          });
        }
      }
    };

    const mergedOptions = { ...defaultOptions, ...options };

    chart = new Chart(canvas, {
      type: chartType as any,
      data: {
        labels,
        datasets: preparedDatasets
      },
      options: mergedOptions
    });
  });

  onDestroy(() => {
    if (chart) {
      chart.destroy();
      chart = null;
    }
  });
</script>

<div class="widget-chart">
  <canvas bind:this={canvas} style="max-height: 400px;"></canvas>
</div>

<style>
  .widget-chart {
    position: relative;
    height: 400px;
    width: 100%;
  }
</style>