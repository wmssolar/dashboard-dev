<template>

 <div >

  <b-card-group deck>
     <b-card bg-variant="dark" style="height: 799px;">
      <b-table
      striped
      :items="items"
      :fields="fields"></b-table>

    </b-card>


    <b-card bg-variant="dark">
      <br>
       <el-table
      :data="tableData"
      style="width: 100%;"
     >
      <el-table-column
        prop="Ship"
        label="Ship"
        min-width="90"
        >
      </el-table-column>
      <el-table-column
        prop="Received_BW_Perc"
        label="RcBW%"
        min-width="70%"
         >
         <template slot-scope="scope">
        <i class="el-icon-top"></i>
        <span style="margin-left:
        8px color: success">{{ scope.row.Received_BW_Perc }}</span>
      </template>
      </el-table-column>
      <el-table-column
        prop="Transmit_BW_Perc"
        label="TrBW%"
        min-width="70%">
         <template slot-scope="scope">
        <i class="el-icon-top"></i>
        <span style="margin-left:
        8px color: success">{{ scope.row.Transmit_BW_Perc }}</span>
      </template>
      </el-table-column>
    </el-table>

    </b-card>

    <b-card bg-variant="dark"  >
    <fusioncharts
      :type="type"
      :width="width"
      :height="height"
      :dataformat="dataFormat"
      :dataSource="dataSource"

      >
      </fusioncharts>
    </b-card>
    <b-card bg-variant="dark">
          <b-table
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      sort-icon-left
      responsive="sm"
    ></b-table>

     
    </b-card>

  </b-card-group>

 </div>

<!-- <div style="float:left">
    <Card class="bg" style="width: 25rem; height: 50rem; margin-left: 10px; margin-right: 4px;
      margin-bottom: 75px">
        <hr>
    <el-table
      :data="tableData"
      style="width: 100%;"
     >
      <el-table-column
        prop="Ship"
        label="Ship"
        min-width="100"
        >
      </el-table-column>
      <el-table-column
        prop="Received_BW_Perc"
        label="RcBW%"
        min-width="140%"
         >
         <template slot-scope="scope">
        <i class="el-icon-top"></i>
        <span style="margin-left: 8px color: success">{{ scope.row.Received_BW_Perc }}</span>
      </template>
      </el-table-column>
      <el-table-column
        prop="Transmit_BW_Perc"
        label="TrBW%"
        min-width="70%">
         <template slot-scope="scope">
        <i class="el-icon-top"></i>
        <span style="margin-left:
        8px color: success">{{ scope.row.Transmit_BW_Perc }}</span>
      </template>
      </el-table-column>
    </el-table>

</Card> -->
 <!-- <div style="float:right">
   <Card class="bg" style="width: 25rem; height: 25rem; margin-right: 4px;">
     <br>
     <apexchart type="donut" width="390" :options="chartOptions"
     :series="series"></apexchart>

  </Card>
 </div> -->

<!--
  <div style="float:right">
   <Card class="bg" style="width: 25rem; height: 50rem; margin-right: 4px;">

   </Card>

 </div> -->


<!-- </div> -->
</template>

<script>

import {Card } from 'src/components';
import {Table, TableColumn} from 'element-ui'




// STEP 3: Configure your chart


export default {

  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    Card,


    },
data(){
  return {
        sortBy: 'age',
        sortDesc: false,
        fields: [
          { key: 'last_name', sortable: true },
          { key: 'first_name', sortable: true },
          { key: 'age', sortable: true },
          { key: 'isActive', sortable: false }
        ],
        items: [
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
        ],
    bgColor: 'grey',
     "type": "column2d",
      "renderAt": "chartContainer",
      "width": "320",
      "height": "350",
      "dataFormat": "json",
        dataSource: {
            // Chart Configuration
            "chart": {
                "caption": "Countries With Most Oil Reserves [2017-18]",
                "subCaption": "In MMbbl = One Million barrels",
                "xAxisName": "Country",
                "yAxisName": "Reserves (MMbbl)",
                "numberSuffix": "K",

               "canvasBgAlpha": "0",

        "bgColor": "#303133",
        "bgAlpha": "100",

        "theme": "candy"
            },
            // Chart Data
            "data": [{
                "label": "Venezuela",
                "value": "290"
            }, {
                "label": "Saudi",
                "value": "260"
            }, {
                "label": "Canada",
                "value": "180"
            }, {
                "label": "Iran",
                "value": "140"
            }, {
                "label": "Russia",
                "value": "115"
            }, {
                "label": "UAE",
                "value": "100"
            }, {
                "label": "US",
                "value": "30"
            }, {
                "label": "China",
                "value": "30"
            }]
        },

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
          {
            key: 'Rate',
            label: '',
            sortable: true,
            // Variant applies to the whole column, including the header and footer
            variant: 'dark'
          }
        ],
         items: [
          { isActive: true,  Metric: 'Session', Period: '23500', Rate: '9%' },
          { isActive: false, Metric: 'Connections', Period: '1235',    Rate: '10%' },
          { isActive: false, Metric: 'MOS', Period: '6254',    Rate: '5%' },
          { isActive: true,  Metric: 'Jitter', Period: '12',      Rate: '3%' },
          { isActive: true,  Metric: 'Traffic', Period: '4513',      Rate: '3%' },
          { isActive: false, Metric: 'Search', Period: '3265',      Rate: '3%' },
          { isActive: true,  Metric: 'Offline', Period: '2',      Rate: '.01%' },
          { isActive: true,  Metric: 'BandWidth', Period: '375',      Rate: '4%' },
        ],
          tableData: [{
            Ship: 'azmjourney',
            Received_BW_Perc: '6.68',
            Transmit_BW_Perc: '12.2%'
          }, {
              Ship: 'azmquest',
            Received_BW_Perc: '9.68',
            Transmit_BW_Perc: '32.2%'
          }, {
               Ship: 'cclbreeze',
            Received_BW_Perc: '4.68',
            Transmit_BW_Perc: '17.2%'
          }, {
              Ship: 'ccldream',
            Received_BW_Perc: '9.68',
            Transmit_BW_Perc: '17.2%'
          }
          , {
              Ship: 'cclelation',
            Received_BW_Perc: '8.68',
            Transmit_BW_Perc: '19.2%'
          }
          , {
              Ship: 'celinfinite',
            Received_BW_Perc: '8.68',
            Transmit_BW_Perc: '22.2%'
          }],


    }
  }
}
</script>
<style scoped>
 .bg {
  background-position: center;
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

