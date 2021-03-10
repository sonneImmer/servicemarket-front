<template>
  <div>
    <div class="filter-container">
      <el-input v-model="listQuery.service_name" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
        v-loading="listLoading"
        :data="this.list"
        default-sort
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column align="center" label="ID" width="60" prop="ID" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column width="160px" align="center" label="服务名称">
          <template slot-scope="scope">
            <span>{{ scope.row.service_name }}</span>
          </template>
        </el-table-column>

        <el-table-column width="160px" align="center" label="上线日期">
          <template slot-scope="scope">
            <span>{{ scope.row.online_time }}</span>
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="Status" width="110">
          <template slot-scope="{row}">
            <el-tag :type="row.service_status | statusFilter">
              {{ row.service_status }}
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

        <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <router-link :to="'/Provider/submitservice'">
              <el-button type="primary" size="mini" @click="handleUpdate(row)">
                Edit
              </el-button>
            </router-link>
            <el-button v-if="row.service_status=='offline'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
              Publish
            </el-button>
            <el-button v-if="row.service_status=='online'||row.service_status=='checking'" size="mini" type="danger" @click="handleDelete(row,$index)">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getServiceList" />

    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination/index'
import { feachServiceList } from '@/api/service-mock'

export default {
  name: 'MyServiceList',
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
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    }
  }
}
</script>

<style scoped>

</style>
