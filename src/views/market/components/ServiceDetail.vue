<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Contact</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <el-form>
        <el-row>
          <el-col span="8">
            <el-form-item label="contractAddr">
              <el-input v-model="postSpringForm.contractAddr" style="width:120px" />
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="party">
              <el-input v-model="postSpringForm.partyName" style="width:120px" />
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="action">
              <el-input v-model="postSpringForm.action" style="width:120px" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="8">
            <el-form-item label="formData">
              <el-input v-model="formData" type="textarea" :autosize="{ minRows: 1, maxRows: 3}" style="width:120px" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item>
              <el-button type="primary" @click="executeContractAction">
                执行动作
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <aside>
        {{ this.contractResult }}
      </aside>
    </el-card>

    <!--    <div v-for="(item,index) in this.metaData" :key="(item,index)">{{ index }}:{{ item }}</div>-->
    <pre>
        <span v-html="this.metaData" />
      </pre>

  </div>
</template>

<script>
import { feachServiceDetail } from '@/api/service-eureka'
import { feachAction, feachExecuteAction } from '@/api/spring-SPESC'

export default {
  name: 'ServiceDetail',
  data() {
    return {
      loading: false,
      query: '',
      postForm: '',
      metaData: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      slc: '',
      contract_name: '',
      party_A: '',
      party_B: '',
      term: {},
      fileList: '',

      // post form
      postSpringForm: {
        // springboot params
        action: '',
        contractAddr: '',
        partyName: ''
      },
      formData: '',

      // post result
      contractResult: ''
    }
  },
  created() {
    const name = this.$route.params && this.$route.params.name

    this.getServiceDetail(name)

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    getServiceDetail(name) {
      feachServiceDetail(name).then(response => {
        this.postForm = response.data.application.instance[0].metadata
        this.metaData = this.postForm['my-metadata']

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = 'Service Detail'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${name}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Service Detail'
      document.title = `${title} - ${name}`
    },
    executeContractAction() {
      if (this.postSpringForm.action !== 'getAvailableActions') {
        this.formData = JSON.parse(this.formData)
        feachExecuteAction(this.postSpringForm, this.formData).then(response => {
          this.contractResult = response.data.result
        })
      } else {
        feachAction(this.postSpringForm.action, this.postSpringForm.contractAddr, this.postSpringForm.partyName).then(response => {
          console.log('BAKA')
          this.contractResult = response.data.result
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
