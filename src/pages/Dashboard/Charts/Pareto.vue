<template>
  <section class="charts">
    <div v-if="loading">Loading...</div>
  <div v-if="paretoData" id="container" style="height: 400px">
    <vue-highcharts
      :options="options"
      :highcharts="Highcharts"
    ></vue-highcharts>
  </div>
  </section>
</template>

<script>
  import VueHighcharts from "vue2-highcharts"
  import axios from 'axios'
  import Pareto from "highcharts/modules/pareto"
  import Highcharts, { dateFormat } from "highcharts"
  import darkUnica from "highcharts/themes/dark-unica"
  
  darkUnica(Highcharts)
  Pareto(Highcharts)
 
  const paretoData = null
  
export default {
  
  components: {
    VueHighcharts
  },

  data() {
    return {
      loading: false,
      paretoData: null,
      Highcharts,
      datastore: [],

      options: Highcharts.merge(this.options, {
        chart: {
          renderTo: "container",
          type: "column",

          spacingBottom: 15,
          spacingTop: 10,
          spacingLeft: 10,
          spacingRight: 10,
        
        },
        title: {
          text: "Quality of Service above Threshods -CF"
        },
        subtitle: {
          text: "Number of occurrence"
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
        }, 
        {
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
            }, 
            {
                name: 'QOS',
                type: 'column',
                zIndex: 2,
                data: paretoData
            }]
      })
    }
  },
  created() {
     this.getParetoData()                                                      
  },
  watch: {
    '$route': 'getParetoData'
  },
  methods: {
    getParetoData() {

      const api_url = 'http://localhost:3000/api/qos'    
      const config = { headers: {'Access-Control-Allow-Origin': '*'} }
      
      axios.get(api_url, config)
      .then(response => { this.paretoData = [ response.data.docs[0].Latency,
                                              response.data.docs[0].PacketLoss, 
                                              response.data.docs[0].MOS,
                                              response.data.docs[0].Jitter 
                                            ]
                                                                                
                          //console.log(this.paretoData)
                          this.options.series[1].data = this.paretoData
                        }) 
      .catch( (error) =>  {
        // eslint-disable-next-line no-console
        console.log(error)
      }) 

    }
  }
 
}
</script>

