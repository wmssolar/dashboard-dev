// STEP 1: to include the dependencies
<script>
import Vue from 'vue';
import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
 
import Pareto2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';

Vue.use(VueFusionCharts, FusionCharts, FusionTheme, Pareto2D);

// STEP 2: Prepare the data



const chartData =  [
    {
      label: "Traffic",
      value: "5680"
    },
    {
      label: "Family Engagement",
      value: "1036"
    },
    {
      label: "Public Transport",
      value: "950"
    },
    {
      label: "Weather",
      value: "500"
    },
    {
      label: "Emergency",
      value: "140"
    },
    {
      label: "Others",
      value: "68"
    }
  ];

// STEP 3: Configure your chart
const dataSource = {
  chart: {
    caption: "Late arrivals by reported cause",
    subcaption: "Last month",
    pyaxisname: "No. of Occurrence",
    theme: "candy",
    showsecondarylimits: "0",
    showdivlinesecondaryvalue: "0",
    plottooltext:
      "Due to $label, late arrivals count is : <b>$dataValue</b> of the total <b>$sum</b> employees",
    drawcrossline: "1"
      },
  data: chartData
  };


export default {
  name: 'app',
  data() {
    return {
      "type": "pareto2d",
      "renderAt": "chart-container",
      "width": "550",
      "height": "350",
      "dataFormat": "json",
      dataSource
    }
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
}
</script>

//STEP 4: Render the chart
<template>
  <div id="app">
    <div id="chart-container">
      <fusioncharts
      :type="type"
      :width="width"
      :height="height"
      :dataformat="dataFormat"
      :dataSource="dataSource"
      >
      </fusioncharts>
    </div>
  </div>
</template>