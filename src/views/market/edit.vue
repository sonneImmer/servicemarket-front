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
        <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
          <el-form-item label="info">
            <el-input v-model="temp.key" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            Cancel
          </el-button>
          <el-button type="primary" @click="purchase">
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
import { purchaseService } from '@/api/service-mock'

export default {
  name: 'Edit',
  components: { Sticky, BriefIntroCard, FeedBackCard, ServiceDetail },
  data() {
    return {
      user: {},
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
      id: ''
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
    this.id = this.$route.params.id
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
      purchaseService(this.id).then(() => {
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Created Successfully',
          type: 'success',
          duration: 2000
        })
      })
    },
    resetTemp() {
      this.temp = {
        key: ''
      }
    }
  }
}
</script>
