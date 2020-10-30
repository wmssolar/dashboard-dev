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
    spacingBottom: 15,
     spacingTop: 10,
     spacingLeft: 10,
     spacingRight: 10,
  },

  legend: {
    enabled: true,
      align: 'left',
      layout: 'vertical',
      verticalAlign: 'top',
      itemMarginTop: 10,
      bubbleLegend: {
        enabled: true,
        borderWidth: 1,
        connectorDistance: 60,
        maxSize: 70,
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
        maxSize: 40
      }
    },
  
    series: [{
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
  }
  //  mounted() {
     
  //   const api_url = 'http://localhost:3000/api/qos';    
  //     // let self = this
  //   // eslint-disable-next-line no-console
  //               // console.log(this.options.series[1].data) 
  //               // eslint-disable-next-line no-console
  //               // console.log(this.options.series[0].data)    
    
  //     const config = { headers: {'Access-Control-Allow-Origin': '*'} };
  //  axios.get(api_url, config).then(response => {
             
  //              this.options.series[1].data = [response.data.docs[0].Latency,
  //                                           response.data.docs[0].PacketLoss, 
  //                                           response.data.docs[0].MOS,
  //                                           response.data.docs[0].Jitter]
  //              // eslint-disable-next-line no-console
  //               console.log(this.options.series[1].data)
              
  //             }).
  //             // eslint-disable-next-line no-console
  //             catch((error) => console.log(error));
     

  // },
 
};
</script>
