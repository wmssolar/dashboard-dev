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
import Highcharts3D from "highcharts/highcharts-3d";
import More from "highcharts/highcharts-more";
import Highcharts, { dateFormat } from "highcharts";
 
import darkUnica from "highcharts/themes/dark-unica";

More(Highcharts);

darkUnica(Highcharts)

Highcharts3D(Highcharts);

const chartData = null;
 
export default {
  components: {
    VueHighcharts
    
  },
  data() {
    return {
      
       rev: [],
       holdRev:[],
      Highcharts: Highcharts,
     options: Highcharts.merge(this.options, {
       chart: {
        type: 'packedbubble',
        height: '100%'
    },
    title: {
        text: 'Revenue by Carrier (2020)'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.TheirCarrierName}:</b> {point.Total_Charges}m:</b> {point.TotalMinutes}m:</b> {point.TotalAirCharges}m CO<sub>2</sub>'
    },plotOptions: {
        packedbubble: {
            minSize: '30%',
            maxSize: '120%',
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
                splitSeries: false,
                gravitationalConstant: 0.02
            },
            dataLabels: {
                enabled: true,
                format: '{point.TheirCarrierName}',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 250
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            }
        }
    },
       series: [{
        
        data: [
          {
            TheirCarrierName: '',
            Total_Charges: 0,
            TotalMinutes: 0,
            TotalAirCharges: 0
        }]
    },
      ]
    })
    // {
    //         TheirCarrierName: '',
    //         Total_Charges: 0,
    //         TotalMinutes: 0,
    //         TotalAirCharges: 0
    //     }
    //  {

  
      }
  },
 
  methods: {
        fetchRevenue(){
        // let self = this;
                const config = {
      headers: {'Access-Control-Allow-Origin': '*'}
          };
           axios.get('http://localhost:3000/api/revenue', config, )
            .then(res => {
            this.rev = res.data.docs
         
            console.log(this.rev)
           
          Object.entries(this.rev).forEach(([key, value])=> {
         
             const ls = [key, value];
             this.holdRev.push(ls);
            
             return ls
               
            });
              
             this.chartData = this.holdRev
                this.options.series[0].data = this.chartData[0][1]
            //  self.options.series[1].data = self.chartData
            console.log(this.chartData[0][1])
             console.log(this.options.series[0].data)
            // TheirCarrierName, self.holdRev.Total_Charges, 
            //  self.holdRev.TotalMinutes, self.holdRev.TotalAirCharges
       
  
       }) .catch(function(error) {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    });
      }
  
  },
  created(){
 this.fetchRevenue();
  },
  mounted(){
     this.fetchRevenue();
  }
}




</script>
<style scoped>
.highcharts-figure, .highcharts-data-table table {
    min-width: 320px; 
    max-width: 800px;
    margin: 1em auto;
}

.highcharts-data-table table {
	font-family: Verdana, sans-serif;
	border-collapse: collapse;
	border: 1px solid #EBEBEB;
	margin: 10px auto;
	text-align: center;
	width: 100%;
	max-width: 500px;
}
.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}
.highcharts-data-table th {
	font-weight: 600;
    padding: 0.5em;
}
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
    padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
    background: #0e0c0c;
}
.highcharts-data-table tr:hover {
    background: #0c1b2f;
}

</style>