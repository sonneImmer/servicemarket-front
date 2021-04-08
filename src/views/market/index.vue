<template>
  <div>
    <div class="filter-container">
      <el-input v-model="listQuery.service_name" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
<!--      <el-select placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option />
      </el-select>
      <el-select placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option />
      </el-select>-->
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
<!--      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>-->
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button>
<!--      <el-checkbox class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox>-->
    </div>

    <div class="app-container">
      <el-table
        :data="this.list"
        v-loading="listLoading"
        default-sort
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >

        <el-table-column width="160px" align="center" label="服务名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column width="160px" align="center" label="服务提供商">
          <template slot-scope="scope">
            <span>{{ scope.row.instance[0].hostName }}</span>
          </template>
        </el-table-column>

        <el-table-column width="100px" align="center" label="上线日期">
          <template slot-scope="scope">
            <span>{{ scope.row.instance[0].leaseInfo.registrationTimestamp }}</span>
          </template>
        </el-table-column>

        <el-table-column width="220px" align="center" label="服务网址">
          <template slot-scope="scope">
            <a :href=scope.row.instance[0].homePageUrl style="color: #0a76a4">
              <span>{{ scope.row.instance[0].homePageUrl }}</span>
            </a>
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="Status" width="110">
          <template slot-scope="scope">
            {{ scope.row.instance[0].status }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="Actions" width="120">
          <template slot-scope="scope">
            <router-link :to="'/market/service-show/'+scope.row.name">
              <el-button type="primary" size="small" icon="el-icon-edit">
                详情
              </el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getServiceList" />

    </div>
  </div>
</template>
<script>
import { feachServiceList } from '@/api/service-eureka'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'IndexVue',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        online: 'success',
        offline: 'info',
        checking: ''
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      serviceTable: [{
        id: 1,
        service_name: 'service1',
        service_company: 'company1',
        online_time: 'xxxx-xx-xx',
        service_details: 'I am service1',
        service_status: 'online'
      }, {
        id: 2,
        service_name: 'service2',
        service_company: 'company2',
        online_date: 'xxxx-xx-xx',
        service_details: 'I am service2',
        service_status: 'offline'
      }, {
        id: 3,
        service_name: 'service3',
        service_company: 'company3',
        online_time: 'xxxx-xx-xx',
        service_details: 'I am service3',
        service_status: 'checking'
      }],
      list: '',
      listLoading: '',
      total: 0,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      listQuery: {
        service_name: undefined,
        page: 1,
        limit: 20,
        sort: '+id'
      }
    }
  },
  created() {
    // this.getServiceList()
    this.getServiceList()
  },
  methods: {
    handleFilter() {
      this.listQuery.page = 1
      this.getServiceList()
    },
    getServiceList() {
      this.listLoading = true
      feachServiceList().then(response => {
        this.list = response.data.applications.application

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    }
  }
}
</script>

<style scoped>

</style>
