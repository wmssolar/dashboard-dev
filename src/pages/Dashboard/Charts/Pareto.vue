<template>     
<section class="charts">
 <b-container fluid class="bv-example-row">
  <b-row align-v="end">
  
    <b-col md="4" offset-md="8">
      <div class="col-md-16">
        <fg-input>
        <el-date-picker
          v-model="start_date"
          type="date"
          placeholder="Pick a Date"
          format="yyyy/MM/dd"
          >
          </el-date-picker>             
      </fg-input>
       
     </div>
   </b-col>
  </b-row>
 </b-container>
 <b-container fluid class="bv-example-row">
  <b-row align-v="end">
    <b-col md="4" offset-md="8">
     <b-button-toolbar>
      <b-button-group class="mr-1">
        <b-button title="Download file">
          <b-icon icon="cloud-download" aria-hidden="true"></b-icon>
        </b-button>
        <b-button title="Reload"
        v-on:click="forceRerender()">
          <b-icon icon="bootstrap-reboot" aria-hidden="true"></b-icon>
        </b-button>
      </b-button-group>
     </b-button-toolbar>
    </b-col>
  </b-row>
 </b-container>
          <el-select placeholder="Select Fleet" v-model="selectFleet" @on-change-query="onChangeQuery">
            <el-option dark 
            v-for="(item, index) in byFleet()" :key="index"
            :label="`${item.toString()}`"
            :value="item">   
       </el-option>
      </el-select>
            <el-divider direction="vertical" height="400px"></el-divider>
       <el-select  placeholder="Select Ship" v-model="selectShips" @on-change-query="onChangeQuery">
                <el-option dark v-for="(item, index) in byShip()" :key="index"
                :label="`${item.toString()}`"
                :value="item"> 
                </el-option>
            </el-select>
          <el-divider direction="vertical" height="400px"></el-divider>
     
       <b-button title="Search"
        v-on:click="searchMethod()">
          <b-icon icon="search" aria-hidden="true"></b-icon>
        </b-button>
       
 

    <div v-if="loading">Loading...</div>
  <div v-if="paretoData"
  id="container" style="height: 400px; width: 350px;">
    <vue-highcharts
      :options="options"
      :highcharts="Highcharts"
      ref="reloadChart"
    ></vue-highcharts>
  </div>
  </section>
</template>

<script>
  import VueHighcharts from "vue2-highcharts"
  import axios from 'axios'
   import moment from 'moment';
  import { Table, TableColumn, DatePicker, Select, Option, Icon  } from 'element-ui';
  import Pareto from "highcharts/modules/pareto"
  import Highcharts, { dateFormat } from "highcharts"
  import darkUnica from "highcharts/themes/dark-unica"
  
  darkUnica(Highcharts)
  Pareto(Highcharts)
 
  const paretoData = null
  
export default {
  
  components: {
    VueHighcharts,
     [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [DatePicker.name]: DatePicker,
    [Select.name]: Select,
    [Option.name]: Option,
  },

  data() {
    return {
      loading: false,
      paretoData: null,
      Highcharts: Highcharts,
      datastore: [],
      selectFleet: null,
      selectShips: null,
      containerChart: {},
       shipData:[],
       hostname: '',
       FleetData: [],
       start_date: '',
        queryParams: {
                    page: 1,
                    limit: 1,
                     totalDocs: 0,
                     currentPage: 1,
              totalPages: 0,
              perPage: 1,
              hasPrevPage: false,
              hasNextPage: true,
              prevPage: null,
              nextPage: 2 
                },
     
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
          text: "Quality of Service above Threshods -CF" + this.selectShips
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
                'Mos',
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
    this.gethostname();  
     this.getParetoData();   
                                                     
  },
  mounted() {
          this.fetchFleet();
        this.fetchShip();
        this.getParetoData(); 
    
  },
  watch: {
    // '$route': 'getParetoData'
      data() {
        this.options.series[1].data.setData(this.paretoData, true);
      },
     
      config() {
        this.searchMethod();
        this.getParetoData();
      }
  
  },
  methods: {
     
      gethostname(){
        var ip = location.hostname;
       this.hostname = ip;
  
       console.log(this.hostname)

    },
   forceRerender(){
      // this.componentKey =+ 1;
      window.location.reload()
     
   },
      searchMethod() {
        const api_urls = `http://${this.hostname}:3001/api/qos/${this.selectFleet}/${this.selectShips}/${moment(this.start_date).format()}` 
          this.api_url = api_urls
           this.getParetoData();
       
      
              this.containerChart = this.Highcharts.chart('container', this.options);

              this.containerChart.series[1].setData(this.paretoData, true);
           
    
            
    },
    onChangeQuery(queryParams) {
                this.queryParams = queryParams;
               
                this.fetchShip();
                this.fetchFleet();
                
                  
            },
    fetchFleet(){
        let self = this;
                const config = {
      headers: {'Access-Control-Allow-Origin': '*'}
          };
           axios.get(`http://${this.hostname}:3001/api/fleetdata`, config, )
            .then(function(res) {
              self.FleetData = res.data.docs
               
              
       }) .catch(function(error) {
                        // eslint-disable-next-line no-console
                        console.log('Error! Could not react the API. ' + error);
                    });
      },  
      fetchShip(){
        let self = this;
                const config = {
      headers: {'Access-Control-Allow-Origin': '*'}
          };
           axios.get(`http://${this.hostname}:3001/api/shipdata`, config, )
            .then(function(res) {
              self.shipData = res.data.docs
               // eslint-disable-next-line no-console
            
              
       }) .catch(function(error) {
                       // eslint-disable-next-line no-console
                       console.log(error);
                    });; 
        },
        byShip(){
      let sl = this.shipData
      const t = []
      const u = []
       const sh = sl.forEach((name,index)=>{
         t.push(name.Vessel);
         
           return name.Vessel;
          });   
            if(this.selectFleet === ''){
              
              return [...new Set(t)];

      }else{
              
              const sul = this.shipData.filter((element)=>{
                  return element.Fleet.match(this.selectFleet)
              });
               const sht = sul.forEach((name,index)=>{
               u.push(name.Vessel);
         
                 return name.Vessel;
                });
              return [...new Set(u)];
          }
           
    },byFleet(){
      let fl = this.FleetData 
      const t = []
  
      const Fleet = fl.forEach((name,index)=>{
         t.push(name.Fleet);
           return name.Fleet;
          });   
      return [...new Set(t)];
      
    },

 getParetoData() {

        //Lets use a if statement based of  values of Fleet and Ship selection

      const config = { headers: {'Access-Control-Allow-Origin': '*'} }
        
           const self = this;

        
       

             axios.get(`http://${this.hostname}:3001/api/qos`, config)
           .then(response => { 
            // eslint-disable-next-line 
           console.log(response.data.docs)
           self.paretoData = [ response.data.docs[0].Latency,
                                              response.data.docs[0].PacketLoss, 
                                              response.data.docs[0].Mos,
                                              response.data.docs[0].Jitter 
                                            ]
                                                                                
                         
                          self.options.series[1].data = self.paretoData
                        
                        })
              
      .catch( (error) =>  {
        // eslint-disable-next-line no-console
        console.log(error)
      }) 

    },
  }
 
}
</script>
