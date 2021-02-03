<template>
  <div class="app-container">
    <el-form>
      <sticky >
        <!--        <CommentDropdown v-model="postForm.comment_disabled" />
                <PlatformDropdown v-model="postForm.platforms" />
                <SourceUrlDropdown v-model="postForm.source_uri" />-->
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
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
    </div>
  </div>

</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import BriefIntroCard from './components/BriefIntroCard'
import ServiceDetail from '@/views/market/components/ServiceDetail'
import FeedBackCard from '@/views/market/components/FeedBackCard'
import { mapGetters } from 'vuex'

export default {
  name: 'Edit',
  components: { Sticky, BriefIntroCard, FeedBackCard, ServiceDetail },
  data() {
    return {
      user: {},
      activeTab: 'activity'
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
    }
  }
}
</script>
