<template>
 <div>
 <b-card-group deck>
  <b-card bg-variant="dark" style="height: 900px; width: 1900px;">
    
      <el-select placeholder="Select Fleet" 
      v-model="selectFleet" @on-change-query="onChangeQuery">
          <el-option dark 
            v-for="(item, index) in byFleet()" :key="index"
            :label="`${item.toString()}`"
            :value="item">   
       </el-option>
      </el-select>
            <el-divider direction="vertical" height="400px"></el-divider>
       <el-select  placeholder="Select Ship" v-model="selectShips" 
       @on-change-query="onChangeQuery">
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
          <el-divider direction="vertical" height="400px"></el-divider>
           <b-button title="Reload"
        v-on:click="forceRerender()">
          <b-icon icon="bootstrap-reboot" aria-hidden="true"></b-icon>
        </b-button>
        <div class="col-md-3">
                <fg-input>
                  <el-date-picker
                        v-model="start_date"
                        type="date"
                        placeholder="Pick a Date"
                        format="yyyy/MM/dd">
                    </el-date-picker>
                    
      </fg-input>
     </div>
     <div class="col-md-3">
      <fg-input>
         <el-date-picker
              v-model="end_date"
              type="date"
              placeholder="Pick another Date"
              format="yyyy/MM/dd">
          </el-date-picker>
           
      </fg-input>
      
      </div>

 
     <b-card bg-variant="dark" align="left" style="height: 500px; width: 1500px;">
      
        <b-card bg-variant="dark"  style="height: 400px; width: 300px;">

              <b-table 
                table-variant="dark"
                  stacked
                  hover 
                  :items="items" 
                  :fields="fields"
                  @on-change-query="onChangeQuery"> 
                  </b-table> 
        </b-card>  
          <b-card bg-variant="dark" style="height: 400px; width: 300px;">
            <b-table
              id="my-percentile"
              table-variant="dark"
              stacked
              hover
              :items="rows_data" 
              :fields="columns" 
               @on-change-query="onChangeQuery">  
             </b-table>     
        </b-card>
              <b-card bg-variant="dark" style="height: 400px; width: 500px;">
                  <PieData></PieData>
            </b-card>
       </b-card>
  </b-card>  
 
   
    </b-card-group>
 
     </div>

</template>
<script>

import { Table, TableColumn, DatePicker, Select, Option  } from 'element-ui';
 import Bubble from './Charts/Bubble'
import PieData from './Charts/PieData'
 import VueHighcharts from "vue2-highcharts";
import More from "highcharts/highcharts-more";
import Highcharts from "highcharts";
import darkUnica from "highcharts/themes/dark-unica";
darkUnica(Highcharts)
import axios from 'axios'
import moment from 'moment';
import VueBootstrap4Table from 'vue-bootstrap4-table'
import { objectEach } from 'highcharts';
import { range } from 'd3';


export default {
 
  data() {
    return {
       hostname: '',
       qosData: [],
       rows: [],
     columns: [ 'Metrics', 'Periods'
           ],
    
       fields: ['Metric', 'Period'],
       items: [],
       rows_data: [],
      selectFleet: null,
      selectShips: null,
      stores: [],
      start_date: '',
      end_date: '',
      shipData:[],
      rows_d: [],
      percentile: [],
      FleetData: [],
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
      config: {
                    
                    card_title: "Fleet  Data",
                    server_mode: true, 
                    per_page_options: [],
              }, 
              componentKey: 0,
              
      
    };
    
  },
  components: {

    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [DatePicker.name]: DatePicker,
    [Select.name]: Select,
    [Option.name]: Option,
    VueBootstrap4Table,
    PieData,
    // Gauge,
    // Bubble,
     Highcharts: Highcharts,
  
  },
  computed: {
    /***
     * Returns a page from the searched data or the whole data.
     *  Search is performed in the watch section below
     */   

   
  },
  methods: {
        gethostname(){
        var ip = location.hostname;
       this.hostname = ip;


    },
      searchMethod() {
          this.fetchPercentile();
        
      },
                  
  
    onChangeQuery(queryParams) {
                this.queryParams = queryParams;
                // this.fetchData();
                this.fetchShip();
                this.fetchFleet();
                this.fetchQostable();
                this.fetchPercentile();
              
                  
            },
       forceRerender(){
          window.location.reload()
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
              //  console.log(self.shipData)
              
       }) .catch(function(error) {
                       // eslint-disable-next-line no-console
                       console.log(error);
                    });; 
        },
     fetchData() {
                let self = this;

      
        axios.get(`http://${this.hostname}:3001/api/solar/${this.selectFleet}`,  {
                        params: {
                            "queryParams": this.queryParams,
                            "page": this.queryParams.page,
                            
                        }
                        
                    })
                    .then(function(response) {
                        self.stores = response.data.data

                        self.pageData = response.data
                        self.page = self.pageData.page
                        self.total_rows = self.pageData.pageCount;
                        self.limit = self.pageData.limit;
                           
                        self.rows = response.data.data;
                       
                     // eslint-disable-next-line no-console
                     console.log(self.rows)
                      
                    }) 
                    .catch(function(error) {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    });
                    
                 
                    
        },
       fetchPercentile() {
        let self = this;
      // the the b-table uses key, value pair to be filled.
       
        axios.get(`http://${this.hostname}:3001/api/ninetyfivePercent/${this.selectFleet}/${this.selectShips}/${moment(this.start_date).format()}/${moment(this.end_date).format()}`,  {
                        params: {
                            "queryParams": this.queryParams,
                            "totalDocs": this.queryParams.totalDocs,
                            "page": this.queryParams.page,
                            "pagingCounter": this.queryParams.pagingCounter,
                            "limit": this.queryParams.limit,
                            "hasPrevPage": this.queryParams.hasPrevPage,
                            "hasNamePage": this.queryParams.hasNextPage,
                            "prevPage": this.queryParams.prevPage,
                            "nextPage": this.queryParams.nextPage,
      
                        }
                         
                    })
                    .then(function(response) {
                       

         self.page = response.data.page
         self.totalDocs = response.data.totalDocs;
         self.pagingCounter = response.data.pagingCounter;
         self.hasPrevPage = response.data.hasPrevPage;
         self.hasNextPage = response.data.hasNextPage;
         self.prevPage = response.data.prevPage;
         self.nextPage = response.data.nextPage;
        self.total_rows = response.data.totalDocs;
                     
         self.rows_d = response.data.docs

            self.percentile = []
          //  console.log(self.rows_d[0]);

           Object.entries(self.rows_d[0]).forEach(([key, value])=> {
         
             const ls = [key, value];
             self.percentile.push(ls);
                // console.log(ls)
             return ls
               
            });
              // console.log(self.percentile.slice(4,9))

              const hd = self.percentile.slice(4,9);
              // console.log(hd);
              for (let [key] in hd){
                const d =  hd[key]

                self.rows_data.push({
                  Metrics: d[0], Periods: d[1]
                })
                 
                       
              }
            // console.log(self.rows_data);      
         
        }) 
                    .catch(function(error) {
                       // eslint-disable-next-line no-console
                        console.log(error.config);
                        // console.log(error.response.headers);
                    
           });
                    
                    
        },
      fetchQostable(){
        let self = this;
        
        const config = { headers: {'Access-Control-Allow-Origin': '*'} };

          // console.log(self.fields, self.items);
          self.qosData;
       
           axios.get(`http://${this.hostname}:3001/api/qostable`, config, )
            .then(function(res) {
              const qD = res.data.docs
                   // eslint-disable-next-line no-console
          
            self.qosData = []
           
           Object.entries(qD[0]).forEach(([key, value])=> {
         
             const ls = [key, value];
             self.qosData.push(ls);
          
             return ls
               
            });
              const hd = self.qosData.slice(2,6);
              for (let [key] in hd){
                const d =  hd[key]
                self.items.push({
                  Metric: d[0], Period: d[1]
                })
                 
                       
              }
          

       }) .catch(function(error) {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    });

      },byFleet(){
      let fl = this.FleetData 
      const t = []
  
      const Fleet = fl.forEach((name,index)=>{
         t.push(name.Fleet);
           return name.Fleet;
          });   
      return [...new Set(t)];
      
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
                        console.log(error);
                    });
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
        
    },
   
  },
  mounted() {
        this.fetchFleet();
        this.fetchShip();
     this.fetchPercentile();
     this.fetchQostable();
  },
  created() {
    
       this.gethostname();
     
        this.console = window.console;
  
  },
  watch: {
    /**
     * Searches through the table data by a given query.
     * NOTE: If you have a lot of data, it's recommended to do the search on the Server Side and only display the results here.
     * @param value of the query
     */
  }
  
    
  

}
</script>
<style scoped>
 .bg {
  background-position: left;
  background-color: #303133;
  background-size: cover;
  text-decoration-color: cornsilk;

}
i {
  color: green
}
   .el-aside {
    background-color: #303133;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: rgb(33, 160, 71);
    text-align: center;
    
    line-height: 160px;
    text-decoration-color: chartreuse;
  }

      .hr {
    border-color: white;;
    }


  .bg-dark {
    background: #303133;
  }


  .row-bg {
    padding: 10px 0;
    background-color: #303133;
  }
</style>

