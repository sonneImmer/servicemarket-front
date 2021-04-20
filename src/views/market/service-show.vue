<template>
  <div class="app-container">
    <el-form>
      <sticky>
        <!--        <CommentDropdown v-model="postForm.comment_disabled" />
                <PlatformDropdown v-model="postForm.platforms" />
                <SourceUrlDropdown v-model="postForm.source_uri" />-->
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="handleCreate">
          Purchase
        </el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">
          Add to Like
        </el-button>
      </sticky>
    </el-form>
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <BriefIntroCard />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="ServiceDetail" name="servicedetail">
                <ServiceDetail />
              </el-tab-pane>
              <el-tab-pane label="FeedBack" name="feedback">
                <FeedBackCard />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>

      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>订票服务</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <el-form>
            <el-row>
              <el-col span="6">
                <el-form-item label="passengerNum">
                  <el-input v-model="postTicketService.passengerNum" style="width:100px" />
                </el-form-item>
              </el-col>
              <el-col span="6">
                <el-form-item label="departureTime">
                  <el-input v-model="postTicketService.departureTime" style="width:100px" />
                </el-form-item>
              </el-col>
              <el-col span="6">
                <el-form-item label="departure">
                  <el-input v-model="postTicketService.departure" style="width:100px" />
                </el-form-item>
              </el-col>
              <el-col span="6">
                <el-form-item label="destination">
                  <el-input v-model="postTicketService.destination" style="width:100px" />
                </el-form-item>
              </el-col>
              <el-col span="6">
                <el-form-item label="name">
                  <el-input v-model="postTicketService.name" style="width:100px" />
                </el-form-item>
              </el-col>
              <el-col span="6">
                <el-form-item label="action">
                  <el-input v-model="postTicketService.action" style="width:100px" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item>
                  <el-button type="primary" @click="executeServiceAction">
                    执行动作
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <aside>
            {{ this.serviceResult }}
          </aside>
        </el-card>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            Cancel
          </el-button>
          <el-button type="primary" @click="feachSaveOrder">
            Confirm
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import BriefIntroCard from './components/BriefIntroCard'
import ServiceDetail from '@/views/market/components/ServiceDetail'
import FeedBackCard from '@/views/market/components/FeedBackCard'
import { mapGetters } from 'vuex'
import { purchaseService, saveOrder } from '@/api/service-mock'
import { feachExecuteService } from '@/api/service-cloud'

export default {
  name: 'ServiceShow',
  components: { Sticky, BriefIntroCard, FeedBackCard, ServiceDetail },
  data() {
    return {
      user: {},
      service_name: '',
      activeTab: 'activity',
      temp: {
        key: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      id: '',

      postTicketService: {
        passengerNum: '',
        departureTime: '',
        departure: '',
        destination: '',
        name: '',
        action: '',
        ticketNumber: '',
        seatNumber: '',
        order_time: ''
      },
      serviceResult: ''
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.service_name = this.$route.params.name
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(' | '),
        email: 'admin@test.com',
        avatar: this.avatar
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogFormVisible = true
    },
    purchase() {
      purchaseService(this.service_name).then(() => {
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Purchased Successfully',
          type: 'success',
          duration: 2000
        })
      })
    },
    resetTemp() {
      this.temp = {
        key: ''
      }
    },
    executeServiceAction() {
      feachExecuteService(this.postTicketService.action, this.postTicketService).then(response => {
        this.serviceResult = response.data
        this.postTicketService.ticketNumber = this.serviceResult.ticketNumber
        this.postTicketService.seatNumber = response.data.seatNumber

        this.postTicketService.order_time = this.getdate()
      })
    },
    feachSaveOrder() {
      saveOrder(this.postTicketService).then(response => {
        console.log(response.data)
      })
    },
    getdate() {
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()

      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + ' 年 ' + month + ' 月 ' + strDate + ' 日 '
      return currentdate
    }
  }
}
</script>
