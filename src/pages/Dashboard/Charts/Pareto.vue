<template>
  <section class="charts">
  <div id="container" style="height: 400px">
    <vue-highcharts
      :options="options"
      :highcharts="Highcharts"
    ></vue-highcharts>
  </div>
  </section>
</template>
<script>
import VueHighcharts from "vue2-highcharts";
import axios from 'axios'
import Pareto from "highcharts/modules/pareto"
import Highcharts, { dateFormat } from "highcharts";
import darkUnica from "highcharts/themes/dark-unica";
darkUnica(Highcharts)

Pareto(Highcharts);
 

const data = {
  chart: {
    renderTo: "container",
    type: "column",

     spacingBottom: 15,
     spacingTop: 10,
     spacingLeft: 10,
     spacingRight: 10,
   
  },
  title: {
    text: "Quality of Service above Threshods"
  },
  subtitle: {
    text: "Occurrence of metrics exceeding the threshold"
  },
  plotOptions: {
    column: {
      depth: 25
    }
  },
  tooltip: {
        shared: true
    },
   xAxis: {
        categories: [
            'Latency',
            'PacketLoss',
            'MOS',
            'Jitter'
          
        ],
        crosshair: true
    },
  yAxis: [{
        title: {
            text: ''
        }
    }, {
        title: {
            text: ''
        },
        minPadding: 10,
        maxPadding: 10,
        max: 100,
        min: 0,
        opposite: true,
        labels: {
            format: "{value}%"
        }
    }],
 series: [{
        type: 'pareto',
        name: 'Pareto',
        yAxis: 1,
        zIndex: 10,
        baseSeries: 1,
        tooltip: {
            valueDecimals: 2,
            valueSuffix: '%'
        }
    }, {
        name: 'QOS',
        type: 'column',
        zIndex: 2,
        data: []
    }]
}
export default {
  components: {
    VueHighcharts
  },
  data() {
    return {
      options: data,
      Highcharts,
      datastore: [],
      chdata: [],
      hold_data: []
    };
  },
 
  async mounted() {
     
    const api_url = 'http://localhost:3000/api/qos';    
      // let self = this
    // eslint-disable-next-line no-console
                // console.log(this.options.series[1].data)      
    
      const config = { headers: {'Access-Control-Allow-Origin': '*'} };
 await axios.get(api_url, config).then(response => {
             
               this.options.series[1].data = [response.data.docs[0].Latency,
                                            response.data.docs[0].PacketLoss, 
                                            response.data.docs[0].MOS,
                                            response.data.docs[0].Jitter]
               // eslint-disable-next-line no-console
                console.log(this.options.series[1].data)
              
              }).
              // eslint-disable-next-line no-console
              catch((error) => console.log(error));
     

  },
 
};
</script>
