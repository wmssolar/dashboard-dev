<template>
  <div class="row">
    <div class="col-md-12">
      <card card-body-classes="table-full-width" >
        <div slot="header">
          <div class="col-md-2 offset-md-10">
          </div>
    </div>

<el-select class="select-danger" 
  placeholder="Select Fleet" 
  v-model="selectFleet"
   @on-change-query="onChangeQuery">
    <el-option dark 
    v-for="(item, index) in byFleet()" :key="index"
    :label="`${item.toString()}`"
    :value="item"
    >   
    </el-option>
  </el-select>

  <el-select class="select-danger" placeholder="Select Ship" v-model="selectShips"
   @on-change-query="onChangeQuery">
    <el-option dark v-for="(item, index) in byShip()" :key="index"
    :label="`${item.toString()}`"
    :value="item">
        
    </el-option>
  </el-select>

  <h4 slot="header" class="card-title"></h4>
    <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
    </div>
    
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
              placeholder="Pick a Date"
              format="yyyy/MM/dd">
           </el-date-picker>
           
      </fg-input>
     </div>

     
      <vue-bootstrap4-table 
         :rows="queriedData" 
         :columns="columns" 
         :config="config"
        @on-change-query="onChangeQuery"
        :total-rows="total_rows">
        </vue-bootstrap4-table>
    
      </card>
    </div>
  </div>
</template>
<script>

import { Table, TableColumn, DatePicker, Select, Option  } from 'element-ui';
 

import axios from 'axios'
 
import VueBootstrap4Table from 'vue-bootstrap4-table'

export default {


  data() {
    return {
      selectFleet: [],
      selectShips: [],
      stores: [],
      stored: [],
      searchedData: [],
      DatabyId: [],
      FleetDate: [],
      CruiseLine: [],
      FleetData: [],
      pageData: [],
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
                        name: "Date_sp",
                        
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
      start_date: '',
      end_date: '',
      queryParams: {
                    
                    limit: 10,
                    page: 1,
                },
      total_rows: 0,
      config: {
                    
                    card_title: "Fleet  Data",
                    server_mode: true, 
                    per_page_options: [],
              }
      
    };
  },
  components: {

    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [DatePicker.name]: DatePicker,
    [Select.name]: Select,
    [Option.name]: Option,
    VueBootstrap4Table
   
     
  },
  computed: {
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */   
  queriedData() {
      let result = this.stores;
     
        if (this.selectFleet === '')
        {
          return result;
        }else{ 
          const hl = this.stores.filter((element)=>{
         return element.Fleet.match(this.selectFleet);

        });
         
         if(this.selectShips === '')
        {
          return hl
        } else {

             const sh = this.stores.filter((element)=>{
                return element.Ship.match(this.selectShips)
           });

        if(this.value === '')
        {   
             return sh
        }else {
            
                var startdate = this.start_date;
                var enddate = this.end_date; 
                 const dt =  this.stores.filter((element)=>{
                var date = element.Date_sp
                // console.log(date)
                // console.log(startdate.toISOString())
                // console.log(enddate.toISOString())
                // return element.Date_sp.match(this.value1)
                 return (date >= startdate && enddate >= date); 

              })

              if(dt)
              {
                return sh
              }
          
              return false; 

              }
              
        }
          

      }
      
    },
 
   
  },

  methods: {
   
    onChangeQuery(queryParams) {
                this.queryParams = queryParams;
                this.fetchData();
                this.fetchFleetbyDate();
              
                  
            },
      
      fetchShip(){
        let self = this;
                const config = {
      headers: {'Access-Control-Allow-Origin': '*'}
          };
           axios.get('http://localhost:3000/api/shipdata', config, )
            .then(function(res) {
              self.shipData = res.data.docs
               // eslint-disable-next-line no-console
               console.log(self.shipData)
              
       }) .catch(function(error) {
                       // eslint-disable-next-line no-console
                       console.log(error);
                    });; 
        },
     fetchFleetbyDate(){
        let self = this;
                const config = {
      headers: {'Access-Control-Allow-Origin': '*'}
          };

     const starts = '2020-02-15T17:00:00.000Z'
    const ends = '2020-02-17T17:00:00.000Z'
    // console.log(this.start_date)
    axios.get(`http://localhost:3000/api/solarbydate/${this.selectFleet}/${this.start_date.toISOString()}/${this.end_date.toISOString()}`, config, )
            .then(function(res) {
               
             // eslint-disable-next-line no-console
             console.log(res.data)
              
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

      
        axios.get(`http://localhost:3000/api/solar/${this.selectFleet}`,  {
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
    dateInterval(){
             var startdate = this.value;
              var enddate = this.value1;
              const dt =  this.stores.filter((element)=>{
                var date = element.Date_sp
              
                 return (date >= startdate && enddate >= date); 
              });

              if(dt)
              {
                return dt
              }
          
              return false; 
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
  mounted() {
   
        this.fetchData();
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
