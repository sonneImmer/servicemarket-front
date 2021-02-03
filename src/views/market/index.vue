<template>
  <div>
    <div class="filter-container">
      <el-input v-model="listQuery.serviceName" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option />
      </el-select>
      <el-select placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button>
      <el-checkbox class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox>
    </div>

    <div class="app-container">
      <el-table
        :data="this.list"
        v-loading="listLoading"
        default-sort>
        <el-table-column align="center" label="ID" width="80" prop="ID" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column width="160px" align="center" label="服务名称">
          <template slot-scope="scope">
            <span>{{ scope.row.serviceName }}</span>
          </template>
        </el-table-column>

        <el-table-column width="160px" align="center" label="服务提供商">
          <template slot-scope="scope">
            <span>{{ scope.row.serviceCompany }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="center" label="上线日期">
          <template slot-scope="scope">
            <span>{{ scope.row.onlineDate }}</span>
          </template>
        </el-table-column>

        <el-table-column width="220px" align="center" label="服务描述">
          <template slot-scope="scope">
            <span>{{ scope.row.serviceDescribe }}</span>
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="Status" width="110">
          <template slot-scope="{row}">
            <el-tag :type="row.serviceStatus | statusFilter">
              {{ row.serviceStatus }}
            </el-tag>
          </template>
        </el-table-column>

        <!--      <el-table-column min-width="300px" label="Title">
          <template slot-scope="{row}">
            <router-link :to="'/example/edit/'+row.id" class="link-type">
              <span>{{ row.title }}</span>
            </router-link>
          </template>
        </el-table-column>-->

        <el-table-column align="center" label="Actions" width="120">
          <template slot-scope="scope">
            <router-link :to="'/example/edit/'+scope.row.id">
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
import { feachServiceList } from '@/api/service'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'IndexVue',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        online: 'success',
        offline: 'info',
        inchecking: ''
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      serviceTable: [{
        id: 1,
        serviceName: 'service1',
        serviceCompany: 'company1',
        onlineDate: 'xxxx-xx-xx',
        serviceDescribe: 'I am service1',
        serviceStatus: 'online'
      }, {
        id: 2,
        serviceName: 'service2',
        serviceCompany: 'company2',
        onlineDate: 'xxxx-xx-xx',
        serviceDescribe: 'I am service2',
        serviceStatus: 'offline'
      }, {
        id: 3,
        serviceName: 'service3',
        serviceCompany: 'company3',
        onlineDate: 'xxxx-xx-xx',
        serviceDescribe: 'I am service3',
        serviceStatus: 'checking'
      }],
      list: '',
      listLoading: '',
      total: 0,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      listQuery: {
        serviceName: undefined,
        page: 1,
        limit: 20,
        sort: '+id'
      }
    }
  },
  created() {
    this.getServiceList()
  },
  methods: {
    getServiceList() {
      this.listLoading = true
      feachServiceList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        console.log('BAKA')
        console.log(this.total)

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getServiceList()
    }
  }
}
</script>

<style scoped>

</style>
