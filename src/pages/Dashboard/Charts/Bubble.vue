<template>
  <section class="charts">
        <vue-highcharts :options="options" :highcharts="Highcharts"></vue-highcharts>
    </section>
</template>
<script>
import VueHighcharts from "vue2-highcharts";
import More from "highcharts/highcharts-more";
import Highcharts from "highcharts";
More(Highcharts);

const data = {
  chart: {
    type: "bubble",
    plotBorderWidth: 1,
    zoomType: "xy",
    spacingBottom: 10,
     spacingTop: 5,
     spacingLeft: 5,
     spacingRight: 5,
  },

  legend: {
    enabled: true,
      align: 'right',
      layout: 'vertical',
      verticalAlign: 'top',
      itemMarginTop: 5,
      bubbleLegend: {
        enabled: true,
        borderWidth: 1,
        connectorDistance: 60,
        maxSize: 90,
        labels: {
          align: left
        },
        ranges: [{}, {}, { color: '#e4d354' }]
    }
  },
  title: {
    text: "Total Calls versus Revenue"
  },
xAxis: {
  gridLineWidth: 1,
    title: {
        text: "Number of Calls"
    },
    labels: {
      format: "{value} calls"
    },
     zIndex: 3
},
yAxis: {
     startOnTick: false,
    endOnTick: false,
    title: {
      text: "Total Revenue"
    },
    labels: {
      format: "{value} Dollars"
    },
    zIndex: 3
},
  plotOptions: {
      
      series: {
        maxSize: 80
      }
    },
  
    series: [{
      name1: 'Carriers', 
      
      data: [
        { x: 228, y: 22.8, z: 834 },
        { x: 1, y: 0.65, z: 100 },
        { x: 5, y: 0.5, z: 242 },
        { x: 451, y: 45.1, z: 721 },
        { x: 350, y: 227.5, z: 242 },
        { x: 849, y: 84.9, z: 1200 },
      ]
    },  {
      
      data: [
        { x: 3, y: 93.8, z: 834 },
        { x: 3, y: 21.98, z: 300 },
        { x: 10, y: 1, z: 200 },
        { x: 1, y: 0, z: 15 },
        { x: 38, y: 3.8, z: 102 },
        { x: 1, y: 84.9, z: 20 },
      ]
    }
   
   ]
  
  };
export default {
  components: {
    VueHighcharts
  },
  data() {
    return {
      options: data,
      Highcharts,
    };
  },
  methods: {
    getdt() {

      // console.log(this.options.series)
    }
  }

 
};
</script>
