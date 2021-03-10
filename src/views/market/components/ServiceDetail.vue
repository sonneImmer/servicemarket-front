<template>
  <div>
    This is ServiceDetail page.
    {{ this.postForm.service_details }}
  </div>
</template>

<script>
import { feachServiceDetail } from '@/api/service-mock'

export default {
  name: 'ServiceDetail',
  data() {
    return {
      loading: false,
      query: '',
      postForm: ''
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
    console.log('BAKA')
    console.log(id)

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)

    /* this.getdetail()*/
  },
  methods: {
    /* getdetail() {
      feachServiceDetail().then(response => {
        this.detail = response.data
        console.log('Baka')
      })
    },*/
    fetchData(id) {
      feachServiceDetail(id).then(response => {
        this.postForm = response.data

        console.log(this.postForm)

        // just for test
        this.postForm.title += `   Article Id:${this.postForm.id}`
        this.postForm.content_short += `   Article Id:${this.postForm.id}`

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
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Edit Article'
      document.title = `${title} - ${this.postForm.id}`
    }
  }
}
console.log('Baka')
</script>

<style scoped>

</style>
