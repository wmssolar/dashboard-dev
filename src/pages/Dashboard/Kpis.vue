<template>
 <div>
    <b-card-group deck style="height: 1000px; width: 1300px;">
    <b-card bg-variant="dark"  style="height: 1000px; width: 1100px;">
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
       <el-divider></el-divider>
        <b-card bg-variant="dark" align="left" style="height: 700px; width: 1000px;">
         
          <b-card bg-variant="secondary" style="height: 450px; width: 250px;">
                  <b-table bg-variant="dark"
                  stacked="true"
                  small="true"
                  hover 
                  :items="items" 
                  :fields="fields"
                  @on-change-query="onChangeQuery"> 
                  </b-table> 
                </b-card>
        </b-card>
         <b-card bg-variant="dark" style="height: 500px; width: 650px;">
            <Bubble></Bubble>
        </b-card>

       </b-card>
      
     </b-card-group>
 
     
     </div>

</template>
<script>

import { Table, TableColumn, DatePicker, Select, Option  } from 'element-ui';
 import Bubble from './Charts/Bubble'
 import VueHighcharts from "vue2-highcharts";
import More from "highcharts/highcharts-more";
import Highcharts from "highcharts";
import darkUnica from "highcharts/themes/dark-unica";
darkUnica(Highcharts)
import axios from 'axios'
 
import VueBootstrap4Table from 'vue-bootstrap4-table'
import { objectEach } from 'highcharts';
import { range } from 'd3';

export default {
 
  data() {
    return {
      
       qosData: [],
       fields: ['Metric', 'Period'],
       items: [],
      selectFleet: [],
      selectShips: [],
      stores: [],
      shipData:[],
      FleetData: [],
      queryParams: {
                    
                    limit: 10,
                    page: 1,
                },
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
    VueBootstrap4Table,
    Bubble,
     Highcharts,
     
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
                this.fetchShip();
                this.fetchFleet();
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
      fetchQostable(){
        let self = this;
        
        const config = { headers: {'Access-Control-Allow-Origin': '*'} };

          // console.log(self.fields, self.items);
          self.qosData;
       
           axios.get('http://localhost:3000/api/qostable', config, )
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
           axios.get('http://localhost:3000/api/fleetdata', config, )
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
   
  },
  created() {
    this.fetchQostable();
      //  this.byQos();
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

