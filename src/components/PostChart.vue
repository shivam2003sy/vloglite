<template>
    <div>
      <canvas ref="chart"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js';
  
  export default {
    name: 'PostChart',
    props: {
      likes: {
        type: Number,
        required: true,
      },
      comments: {
        type: Number,
        required: true,
      },
    },
    watch: {
      likes() {
        this.updateChart();
      },
      comments() {
        this.updateChart();
      },
    },
    mounted() {
      // Create the chart
      this.updateChart();
    },
    methods: {
      updateChart() {
        // Update the chart data and options
        if (this.$refs.chart) {
          const chart = new Chart(this.$refs.chart.getContext('2d'), {
            type: 'bar',
            data: {
              labels: ['Likes', 'Comments'],
              datasets: [{
                label: 'Likes vs Comments',
                data: [this.likes, this.comments],
                backgroundColor: ['blue', 'green'],
              }],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                  max: Math.max(this.likes, this.comments) + 10,
                  min : 0,
                },
              },
            },
          });
          
          // Destroy previous chart instance to prevent memory leaks
          if (this.chart) {
            this.chart.destroy();
          }
          this.chart = chart;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  