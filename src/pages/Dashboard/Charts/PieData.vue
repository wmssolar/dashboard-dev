<template>
    <section class="charts">
        <vue-highcharts :options="pieOptions" ref="pieChart"></vue-highcharts>
    
    </section>
</template>
<script>
import VueHighcharts from "vue2-highcharts";
import * as data from "../../../assets/data.js";



export default {
  components: {
    VueHighcharts,
     
  },
  data() {
    return {
      pieOptions: data.PieData
    };
  },
  mounted() {},
  methods: {}
}
</script>
<style scoped>
#container {
	height: 400px;
	max-width: 600px;
	margin: 0 auto;
}

/* Link the series colors to axis colors */
.highcharts-background {
	fill: #2a2a2b;
	stroke: #7cb5ec;
}
.highcharts-color-0 {
	fill: #7cb5ec;
	stroke: #7cb5ec;
}
.highcharts-axis.highcharts-color-0 .highcharts-axis-line {
	stroke: #7cb5ec;
}
.highcharts-axis.highcharts-color-0 text {
	fill: #7cb5ec;
}
.highcharts-color-1 {
	fill: #90ed7d;
	stroke: #90ed7d;
}
.highcharts-axis.highcharts-color-1 .highcharts-axis-line {
	stroke: #90ed7d;
}
.highcharts-axis.highcharts-color-1 text {
	fill: #90ed7d;
}


.highcharts-yaxis .highcharts-axis-line {
	stroke-width: 2px;
}

</style>