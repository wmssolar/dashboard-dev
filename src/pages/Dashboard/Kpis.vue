<template>
 <div>
    <b-card-group deck >
        <b-card bg-variant="dark"  style="height: 600px; width: 1000px;">
          <el-select placeholder="Select Fleet" v-model="selectFleet" @on-change-query="onChangeQuery">
            <el-option dark 
            v-for="(item, index) in byFleet()" :key="index"
            :label="`${item.toString()}`"
            :value="item"
            >   
    </el-option>
  </el-select>
    <el-divider direction="vertical" height="400px"></el-divider>
    <el-select  placeholder="Select Ship" v-model="selectShips" @on-change-query="onChangeQuery">
        <el-option dark v-for="(item, index) in byShip()" :key="index"
        :label="`${item.toString()}`"
        :value="item"> 
        </el-option>
      </el-select>
       <el-divider></el-divider>
        <b-card bg-variant="dark" align="center" style="height: 400px; width: 1100px;">
          <b-card bg-variant="secondary" style="height: 400px; width: 300px;">
          <!-- <b-table
            striped
             stacked="true"
              @on-change-query="onChangeQuery" 
              v-for="(item, index) in byQos()" :key="index"
        :items="`${item}`"
        :fields="fields" >  
            </b-table> -->
          </b-card>
    
    <b-card bg-variant="secondary" style="height: 400px; width: 300px;">
          <b-table
            striped
              stacked="true"
            :items="items"
            :fields="fields"
            >
            </b-table>
    </b-card>
 
      <b-card bg-variant="secondary"   style="height: 400px; width: 300px;">
          <b-table
            striped
            stacked="true"
            :items="items"
            :fields="fields"
          >
            </b-table>
    </b-card>

        </b-card>
      </b-card>
     </b-card-group>
 
     
     </div>

</template>
<script>

import { Table, TableColumn, DatePicker, Select, Option  } from 'element-ui';
//  import { serverBus } from '../../../main';

import axios from 'axios'
 
import VueBootstrap4Table from 'vue-bootstrap4-table'

export default {
//  emit: ['information'],
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
      qosData: [],
       fields: [
          {
            key: 'Metric',
            sortable: false,
            variant: 'dark'
          },
          {
            key: 'Period',
            sortable: false,
            variant: 'dark'
          },
          // {
          //   key: 'Rate',
          //   label: 'Rate',
          //   sortable: true,
          //   // Variant applies to the whole column, including the header and footer
          //   variant: 'dark'
          // }
        ],
         // eslint-disable-next-line vue/no-dupe-keys
         items: [
          { isActive: true, Metric: 'Jitter', Period: ''  },
          { isActive: true, Metric: 'Latency', Period: '',    },
          { isActive: true, Metric: 'MOS', Period: '',      },
          { isActive: true, Metric: 'PacketLoss', Period: '',  },
         ,
          
        ],
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
     * Returns a page from the searched data or the whole data.
     *  Search is performed in the watch section below
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
             var qos = this.qosData;
             // eslint-disable-next-line no-console
             console.log(qos);
             const dt = this.stores.filter((element)=>{
               var selection = element.ShipName
                // eslint-disable-next-line no-console
               console.log(selection)
                  // eslint-disable-next-line no-console
               console.log(this.items)
               
               return selection
             })

              // eslint-disable-next-line no-console
             console.log(dt);
            

              if(dt)
              {
                return sh
              }
          
              return false; 

          }
              
        }
          

      }
      
    }
 
   
  },

  methods: {
   
    
    onChangeQuery(queryParams) {
                this.queryParams = queryParams;
                this.fetchData();
                this.fetchFleetbyDate();
                this.fetchQostable();
              
                  
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
      fetchQostable(){
        let self = this;
                const config = {
      headers: {'Access-Control-Allow-Origin': '*'}
          };
           axios.get('http://localhost:3000/api/qostable', config, )
            .then(function(res) {
              self.qosData = res.data.docs
                   // eslint-disable-next-line no-console
                   console.log(self.qosData)
              
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
    byQos(){
      let qs = this.qosData;
      const david = [];
       const q = qs.forEach((name, index)=>{

              // eslint-disable-next-line no-console
                // console.log(this.items[0].Period);

               // eslint-disable-next-line no-console
            console.log(name);

                david.push(
                name.Jitter,
                name.Latency,
                name.MOS, 
                name.PacketLoss);

                return (
                name.Jitter,
                 name.Latency,
                 name.MOS, 
                 name.PacketLoss)
       })
        // eslint-disable-next-line no-console
        console.log(david)
            return [...new Set(david)];
            // eslint-disable-next-line no-console
        // console.log(david)

    }
   
  },
  mounted() {
   
        // this.fetchData();
        this.fetchFleet();
        this.fetchShip();
        // eslint-disable-next-line no-console
        console.log(this.byQos());
              

  },
  created() {
        this.fetchQostable();
        this.console = window.console;
      //  this.byQos();
       
        
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
    color: #333;
    text-align: center;
    line-height: 160px;
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

