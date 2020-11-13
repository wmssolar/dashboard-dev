<template>
  <div class="row">
    <div class="col-md-12">
      <card card-body-classes="table-full-width" >
        <div slot="header">
          <div class="col-md-2 offset-md-10">
        <download-excel 
          :data = "rows_data"
          name = "Download.xls">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          </download-excel>
          </div>
    </div>


  <h4 slot="header" class="card-title"></h4>
    <div class="col-12 d-flex justify-content-center justify-content-sm-between" >
    </div>


          <el-select class="select-danger" 
            placeholder="Select Fleet" 
            v-model="selectFleet"
         
        
            >
              <el-option dark 
              v-for="(item, index) in byFleet()" :key="index"
              :label="`${item.toString()}`"
              :value="item"
              >   
              </el-option>
            </el-select>

        <el-select class="select-danger" 
        placeholder="Select Ship" 
        v-model="selectShips"
     
     
        >
          <el-option dark v-for="(item, index) in byShip()" :key="index"
          :label="`${item.toString()}`"
          :value="item"
           >
              
          </el-option>
        </el-select>
       
     
      
    <br>
     <div class="col-md-3">
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
     <div class="col-md-3">
      <fg-input>
         <el-date-picker
              v-model="end_date"
          
              type="date"
              placeholder="Pick another Date"
              format="yyyy/MM/dd"
              >
     </el-date-picker>
           
      </fg-input>
      <br>

     <div class="col-12 d-flex justify-content-center justify-content-sm-between">
       
       <b-button title="Reload"
        v-on:click="searchMethod()">
          <b-icon icon="search" aria-hidden="true"></b-icon>
        </b-button>
       
 
  <el-divider direction="vertical"></el-divider>
      <el-button type="dark" icon="el-icon-refresh" 
      v-on:click="forceRerender()">Reload</el-button>
       </div>
       
     </div>
     
   
      <vue-bootstrap4-table 
         :rows="rows" 
         :columns="columns" 
         :config="config"
        @on-change-query="onChangeQuery"
        :total-rows="total_rows"
      
        >
             
        </vue-bootstrap4-table>
    
      </card>
    </div>
  </div>
</template>
<script>

import { Table, TableColumn, DatePicker, Select, Option, Icon  } from 'element-ui';
 
import axios from 'axios'
 
import VueBootstrap4Table from 'vue-bootstrap4-table'
import moment from 'moment';
import { select } from 'd3';
var path = require('path')
var rfs = require('rotating-file-stream')


export default {
     
  data() {
    return {
      selectFleet: null,
      selectShips: null,
      stores: [],
      FleetData: [],
      store_rowData: [],
      shipData:[],
           rows:[],
          columns: [{
                        label: "id",
                        name: "id",
                      visibility: false
                    },
                    {
                        label: "id",
                        name: "id",
                      visibility: false
                    },
                    {
                        label: "Fleet",
                        name: "Fleet",
                     
                    },
                    {
                        label: "Ship",
                        name: "Ship",
                        
                    },
                    {
                        label: "Date",
                        name: "Date",
                        initial_sort: true,
                        
                    },
                     {
                        label: "InAvg15min",
                        name: "InAvg15min",
                        
                    },
                     {
                        label: "InMinBps",
                        name: "InMinBps",
                        
                    },
                     {
                        label: "InMaxBps",
                        name: "InMaxBps",
                        
                    },
                     {
                        label: "OutAvg15min",
                        name: "OutAvg15min",
                        
                    },
                     {
                        label: "OutMinBps",
                        name: "OutMinBps",
                        
                    },
                     {
                        label: "OutMaxBps",
                        name: "OutMaxBps",
                        
                    }
            ],
    
        rows_data: [],
        start_date: '',
        end_date: '',
         totalCount: [],
         queryParams: {
                    page: 1,
                    limit: 25,
                     totalDocs: 0,
              totalPages: 0,
              pagingCounter: 1,
              hasPrevPage: false,
              hasNextPage: true,
              prevPage: null,
              nextPage: 2     
                },
      total_rows: 0,
      config: {
                    
                    // card_title: "Fleet  Data",
                    loaderText: 'Updating...',
                     pagination: true,
                    server_mode: true, 
                    num_of_visibile_pagination_buttons: 8,
                    per_page_options: [],
                    show_refresh_button: false,
                    show_reset_button: false,
              },
              defaultDate: [],
              
    };
  },
  components: {

    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [DatePicker.name]: DatePicker,
    [Select.name]: Select,
    [Option.name]: Option,
    VueBootstrap4Table,
     
   
     
  },
  computed: {
    /***
     * Returns a page from the searched data or the whole data.
     *  Search is performed in the watch section below
     */  
    
  // eslint-disable-next-line vue/return-in-computed-property
  queriedData() {
 
   
     },
  // eslint-disable-next-line vue/return-in-computed-property
 

  },
  methods: {
 

    
   forceRerender(){
      // this.componentKey =+ 1;
      window.location.reload()
     
   },  
      searchMethod() {
          this.fetchData();
        //   var fs = require('file-system')
        // var s =  fs.writeFile('log/access.log', function(err) {})
//  var accessLogStream = rfs.createStream('access.log', {
//   interval: '1d', // rotate daily
//   path: path.join(__dirname, 'log')
//     })

          // this.$log.info('test', {s})
          // this.$log.success('Transaction saved!');     
         
                  
    },
    onChangeQuery(queryParams) {
                this.queryParams = queryParams;
                   this.fetchData();
                  // this.queriedData();
            },
  
  
      fetchShip(){
        let self = this;
                const config = {
      headers: {'Access-Control-Allow-Origin': '*'}
          };
           axios.get('http://localhost:3000/api/shipdata', config, )
            .then(function(res) {
              self.shipData = res.data.docs
                
       }) .catch(function(error) {
                       // eslint-disable-next-line no-console
                       console.log(error);
                    });
        },
      
     fetchFleetbyDate(){
        let self = this;
    
 
         axios.get(`http://localhost:3000/api/solar`, {
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
                        
                    } )
            .then(function(response) {
               
             
                        self.stores = response.data
                      //  console.log(self.stores);

          
              
       }) .catch(function(error) {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    });; 
      },
    fetchFleet(){

      
        let self = this;
                const config = {
      headers: {'Access-Control-Allow-Origin': '*'}
          };
           axios.get('http://localhost:3000/api/fleetdata', config, )

            .then(function(res) {
              self.FleetData = res.data.docs
             
              
       }) .catch(function(error) {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    });
      },
    fetchData() {
        let self = this;
        
        axios.get(`http://localhost:3000/api/solar/${this.selectFleet}/${this.selectShips}/${moment(this.start_date).format()}/${moment(this.end_date).format()}`,  {
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
                     
         self.rows = response.data.docs
       

        const myJsonObj =  self.rows.forEach((item)=>{
                            
                            self.rows_data.push(item)
                         });
                
 
         
                 }) 
                    .catch(function(error) {
                       // eslint-disable-next-line no-console
                        console.log(error.config);
                        // console.log(error.response.headers);
                    
           });
                    
                    
        },
    byFleet(){
      let fl = this.FleetData 
     
      const t = []
      const Fleet = fl.forEach((name,index)=>{
         t.push(name.Fleet);
           return name.Fleet;
          });   
      return [...new Set(t)];
        
      
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
  created(){
     
       
  
  },
  mounted() {
   
       
        this.fetchFleet();
        this.fetchShip();
   

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
  background-position: center;
  background-color: transparent;
  background-size: cover;
}
.el-table {
  background-color: transparent;
}
</style>
