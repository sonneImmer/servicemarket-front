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
<!--      <el-table-column align="center" label="ID" width="80" prop="ID" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>-->

      <el-table-column width="120px" align="center" label="序号">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="票据编号">
        <template slot-scope="scope">
          <span>{{ scope.row.ticketNum }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="动作">
        <template slot-scope="scope">
          <span>{{ scope.row.action }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="出发地">
        <template slot-scope="scope">
          <span>{{ scope.row.departure }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="目的地">
        <template slot-scope="scope">
          <span>{{ scope.row.destination }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="订票时间">
        <template slot-scope="scope">
          <span>{{ scope.row.order_time }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="departureTime">
        <template slot-scope="scope">
          <span>{{ scope.row.departureTime }}</span>
        </template>
      </el-table-column>

<!--      <el-table-column align="center" label="Details" width="120">
        <template slot-scope="scope">
          <router-link :to="'/market/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              详情
            </el-button>
          </router-link>
        </template>
      </el-table-column>-->
    </el-table>

<!--
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getServiceList" />
    -->

  </div>
</template>

<script>
import { getSavedService } from '@/api/service-mock'

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
      listLoading: ''
    }
  },
  mounted() {
    this.feachSavedService()
  },
  methods: {
    feachSavedService() {
      this.listLoading = true
      getSavedService().then(response => {
        this.list = response.data
        this.listLoading = false
        console.log('Baka')
        console.log(this.list)
      })
    }
  }
}
</script>

<style scoped>

</style>
