<template>
  <div class="panel-header panel-header-lg">
    <header-chart :height="255"
                  :data="chartData"
                  :labels="chartLabels">
    </header-chart>
  </div>
</template>

<script>
import HeaderChart from './HeaderChart';

export default {
  name: 'overview-header',
  components: {
    HeaderChart
  },
  data() {
    return {
      chartData: [27, 26, 19, 15, 15, 11, 8, 6, 5, 5, 5, 5],
      chartLabels: [
        'CCL',
        'RCI',
        'PCL',
        'HAL',
        'NCL',
        'CEL',
        'TUI',
        'OCA',
        'RGT',
        'SEA',
        'STR',
        'HLK'
      ]
    };
  }
};
</script>

<style scoped>
</style>
