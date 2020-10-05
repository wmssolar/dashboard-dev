 <template>
<div>
<fusioncharts
  :type="type"
  :width="width"
  :height="height"
  :dataFormat="dataFormat"
  :dataSource="dataSource"
>
</fusioncharts>
</div>
</template>
<script>
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import { FCComponent } from "vue-fusioncharts";

// Resolves charts dependency
Charts(FusionCharts);

const dataSource = {
  chart: {
    caption: "Common Car Damages",
    subcaption: "PitStop Service Station",
    xaxisname: "Reported Cause",
    yaxisname: "No. of Occurences",
    theme: "candy",
    plottooltext:
      "$label accounted for <b>$datavalue</b> cars which came for repairs"
  },
  data: [
    {
      label: "Burned out bulb",
      value: "41"
    },
    {
      label: "Discharged Battery",
      value: "20"
    },
    {
      label: "Blown fuse",
      value: "14"
    },
    {
      label: "Worn brake pads",
      value: "11"
    },
    {
      label: "Flat",
      value: "9"
    },
    {
      label: "Others",
      value: "5"
    }
  ]
};

export default {
  components: {
    fusioncharts: FCComponent
  },
  data: () => ({
    type: "pareto3d",
    width: "100%",
    height: "100%",
    dataFormat: "json",
    dataSource
  }),
  methods: {

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
  mounted() {
   
       
        this.fetchShip();

        }
    }
};

</script>