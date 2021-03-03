<template>
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
      <el-table-column align="center" label="ID" width="80" prop="ID" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160px" align="center" label="服务名称">
        <template slot-scope="scope">
          <span>{{ scope.row.service_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160px" align="center" label="服务提供商">
        <template slot-scope="scope">
          <span>{{ scope.row.service_company }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="上线日期">
        <template slot-scope="scope">
          <span>{{ scope.row.online_time }}</span>
        </template>
      </el-table-column>

      <el-table-column width="220px" align="center" label="服务描述">
        <template slot-scope="scope">
          <span>{{ scope.row.service_details }}</span>
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
      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <router-link :to="'/market/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              详情
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

<!--
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getServiceList" />
    -->

  </div>
</template>

<script>
import { getPurchasedService } from '@/api/service'

export default {
  name: 'ServicePurchased',
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
      loading: ''
    }
  },
  mounted() {
    this.getMyPurchasedService()
  },
  methods: {
    getMyPurchasedService() {
      this.loading = true
      getPurchasedService(233).then(response => {
        this.list = response.data
        this.loading = false
        console.log('Baka')
        console.log(this.list)
      })
    }
  }
}
</script>

<style scoped>

</style>
