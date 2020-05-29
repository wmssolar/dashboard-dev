<template>
  <div class="row">
    <div class="col-md-12">
      <card card-body-classes="table-full-width">
        <div slot="header">

          <div class="col-md-2 offset-md-10">

          </div>
        </div>
          <!-- <el-select class="select-danger" placeholder="Select Fleet" v-model="selects.simple">
    <el-option v-for="option in selects.Fleet"
    class="select-danger" :value="option.value"
     :text="option.text" :key="option.text">
    </el-option>
  </el-select> -->
  <h4 slot="header" class="card-title">Paginated Tables</h4>

          <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
            <el-select
              class="select-primary mb-3"
              style="width: 200px"
              v-model="pagination.perPage"
              placeholder="Per page">
              <el-option
                class="select-default"
                v-for="item in pagination.perPageOptions"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <fg-input>
              <el-input type="search"
                        class="mb-3"
                        clearable
                        prefix-icon="el-icon-search"
                        style="width: 200px"
                        placeholder="Search records"
                        v-model="searchQuery"
                        aria-controls="datatables">
              </el-input>
            </fg-input>

          </div>
        <hr>

      <div class="col-md-6">
      <fg-input>
            <el-date-picker
            v-model="value1"
            type="daterange"
            start-placeholder="Start date"
            end-placeholder="End date"
            :default-time="['00:00:00', '23:59:59']">
      </el-date-picker>
      </fg-input>


      </div>

        <el-table stripe
                    style="width: 100%;"
                    :data="queriedData"
                    >

          <el-table-column  min-width="80" label="Fleet" prop="Fleet"
          :filters="
            [{text: 'CCL', value: 'CCL'},
              {text: 'RCI', value: 'rci'},
              {text: 'PCL', value: 'PCL'},
              {text: 'HAL', value: 'HAL'},
              {text: 'NCL', value: 'NCL'},
              {text: 'CEL', value: 'cel'},
              {text: 'TUI', value: 'TUI'},
              {text: 'OCA', value: 'OCA'},
              {text: 'RGT', value: 'RGT'},
              {text: 'SEA', value: 'SEA'},
              {text: 'STR', value: 'STR'},
              {text: 'HLK', value: 'HLK'},
              {text: 'LAB', value: 'LAB'},
              {text: 'PNO', value: 'PNO'},
              {text: 'DCL', value: 'DCL'},
              {text: 'SSC', value: 'SSC'},
              {text: 'FOCL',value:'FOCL'},
              {text: 'PUL', value: 'PUL'},
              {text: 'DRM', value: 'DRM'},
              {text: 'CRY', value: 'CRY'},
              {text: 'AZM', value: 'AZM'},
              {text: 'POA', value: 'POA'},
              {text: 'LCL', value: 'LCL'},
              {text: 'MSC', value: 'MSC'},
              {text: 'CLC', value: 'CLC'},
              {text: 'ALL', value: 'ALL'},
              {text: 'CSM', value: 'CSM'},
              {text: 'JGC', value: 'JGC'},
              {text: 'PST', value: 'PST'},
              {text: 'SKY', value: 'SKY'},
              {text: 'VIR', value: 'VIR'},
              {text: 'VOD', value: 'VOD'},
              ]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
            <template slot-scope="scope">
        <el-tag
          :type="scope.row.Fleet === 'rci' ? 'primary' : 'success'"
          close-transition>{{scope.row.Fleet}}</el-tag>
      </template>

          </el-table-column>
          <el-table-column  label="Ship" prop="Ship"></el-table-column>
          <el-table-column min-width="80" label="Date" prop="Date_sp"
          ></el-table-column>
          <el-table-column min-width="100"  label="InAverage" prop="InAvg15min"></el-table-column>
          <el-table-column min-width="100"  label="InMinBps" prop="InMinBps"></el-table-column>
          <el-table-column min-width="100"  label="InMaxBps" prop="InMaxBps"></el-table-column>
          <el-table-column min-width="100"  label="OutAverage" prop="OutAvg15min"></el-table-column>
          <el-table-column min-width="100"  label="OutMinBps" prop="OutMinBps"></el-table-column>
          <el-table-column min-width="100"  label="OutMaxBps" prop="OutMaxBps"></el-table-column>

        </el-table>

         <n-pagination class="pagination-no-border"
                        v-model="pagination.currentPage"
                        :per-page="pagination.perPage"
                        :total="total">
          </n-pagination>

      </card>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn, DatePicker, Select, Option} from 'element-ui';
import {Pagination} from 'src/components';
import axios from 'axios'
import Fuse from 'fuse.js';


export default {
  components: {

    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [DatePicker.name]: DatePicker,
    [Select.name]: Select,
    [Option.name]: Option,
    [Pagination.name]: Pagination
    //SelectData,

  },computed: {
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */
    queriedData() {
      let result = this.stores;
      if (this.searchedData.length > 0) {
        result = this.searchedData;
      }
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.stores.length;
    }
  },
  data() {
    return {
      stores: [],
      searchedData: [],
      fuseSearch: null,
      searchQuery: '',
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [10, 25, 250, 500],
        total: 0
      },
      value1: '',
      value: '',
      selects: {
            simple: '',
            Fleet:
            [{ value: 'CCL', text: 'CCL'},
              {value: 'RCI', text: 'RCI'},
              {value: 'PCL', text: 'PCL'},
              {value: 'HAL', text: 'HAL'},
              {value: 'NCL', text: 'NCL'},
              {value: 'CEL', text: 'CEL'},
              {value: 'TUI', text: 'TUI'},
              {value: 'OCA', text: 'OCA'},
              {value: 'RGT', text: 'RGT'},
              {value: 'SEA', text: 'SEA'},
              {value: 'STR', text: 'STR'},
              {value: 'HLK', text: 'HLK'},
              {value: 'LAB', text: 'LAB'},
              {value: 'PNO', text: 'PNO'},
              {value: 'DCL', text: 'DCL'},
              {value: 'SSC', text: 'SSC'},
              {value: 'FOCL',textl:'FOCL'},
              {value: 'PUL', text: 'PUL'},
              {value: 'DRM', text: 'DRM'},
              {value: 'CRY', text: 'CRY'},
              {value: 'AZM', text: 'AZM'},
              {value: 'POA', text: 'POA'},
              {value: 'LCL', text: 'LCL'},
              {value: 'MSC', text: 'MSC'},
              {value: 'CLC', text: 'CLC'},
              {value: 'ALL', text: 'ALL'},
              {value: 'CSM', text: 'CSM'},
              {value: 'JGC', text: 'JGC'},
              {value: 'PST', text: 'PST'},
              {value: 'SKY', text: 'SKY'},
              {value: 'VIR', text: 'VIR'},
              {value: 'VOD', text: 'VOD'},

              ]
      }

    };
  },
  created(){
       axios.get('http://localhost:3000/solars')
    .then(res => {
      const store = res.data

      const ships = []
       for (let key in store) {

         const ship = store[key]
         ship.id = key
         ships.push(ship)
       }

       this.stores = ships


    })
  },
  methods: {
    tableRowClassName({ rowIndex }) {
      if (rowIndex === 0) {
        return 'table-success';
      } else if (rowIndex === 2) {
        return 'table-info';
      } else if (rowIndex === 4) {
        return 'table-danger';
      } else if (rowIndex === 6) {
        return 'table-warning';
      }
      return '';
    },
    filterTag(value, row) {
        return row.Fleet === value;
      }
  },
  mounted() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.stores, {
      keys: ['Fleet', 'Ship'],
      threshold: 0.3
    });
  },
  watch: {
    /**
     * Searches through the table data by a given query.
     * NOTE: If you have a lot of data, it's recommended to do the search on the Server Side and only display the results here.
     * @param value of the query
     */
    searchQuery(value) {
      let result = this.stores;
      if (value !== '') {
        result = this.fuseSearch.search(this.searchQuery);
      }
      this.searchedData = result;
    }
  }

}
</script>
<style>
.table-transparent {
  background-color: transparent !important;
}
</style>
