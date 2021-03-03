<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :z-index="10" :class-name="'sub-navbar '+ postForm.status">
        <CommentDropdown />
        <PlatformDropdown />
        <SourceUrlDropdown />
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          Publish
        </el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">
          Draft
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <Warning />

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="service_name">
              <MDinput v-model="postForm.service_name" :maxlength="100" name="name" required>
                ServiceName
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="120px" label="ServiceCompany:" class="postInfo-container-item">
                    <el-select v-model="postForm.service_company" remote-method="" filterable default-first-option remote placeholder="Search Company">
                      <el-option v-for="(item,index) in companyOptions" :key="item+index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-form-item label-width="120px" label="Online Time:" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.online_time" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Select date and time" />
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label-width="90px" label="Importance:" class="postInfo-container-item">
                    <el-rate
                      :max="3"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                      :low-threshold="1"
                      :high-threshold="3"
                      style="display:inline-block"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="70px" label="Summary:">
          <el-input v-model="postForm.content_short" :rows="1" type="textarea" class="article-textarea" autosize placeholder="Please enter the content" />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
        </el-form-item>

        <el-form-item prop="service_details" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.service_details" :height="400" />
        </el-form-item>

        <el-form-item style="margin-bottom: 30px;">
          <Upload v-model="postForm.image_uri" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import Upload from '@/components/Upload/SingleImage3'
import { validURL } from '@/utils/validate'
import { submitService } from '@/api/service'

/* const defaultForm = {
  service_status: 'info',
  service_name: '', // 服务名称
  service_company: '', // 服务提供商
  service_details: '', // 服务详细描述
  content_short: '', // 服务简短描述
  source_uri: '', // 服务外链
  image_uri: '', // 文章图片
  online_time: undefined, // 前台展示时间
  id: undefined
}*/

export default {
  name: 'ServiceDetail',
  components: { Tinymce, MDinput, Sticky, Upload },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      postForm: {
        service_status: 'checking',
        service_name: '',
        service_company: '',
        service_details: '',
        content_short: '',
        source_uri: '',
        image_uri: '',
        online_time: ''
      },
      loading: false,
      rules: {
        service_name: [{ validator: validateRequire }],
        service_details: [{ validator: validateRequire }],
        image_uri: [{ validator: validateRequire }]
        // source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      companyOptions: ['Dragon', 'Eric']
    }
  },
  methods: {
    submitForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = false
          submitService(this.postForm).then(response => {
            this.loading = response.data
            this.$notify({
              title: '成功',
              message: '提交服务成功',
              type: 'success',
              duration: 20000
            })
            this.loading = false
          })
          this.postForm.status = 'checking'
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.service_details.length === 0 || this.postForm.service_name.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'checking'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
