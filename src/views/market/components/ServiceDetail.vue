<template>
  <div>
    This is ServiceDetail page.
    {{ this.postForm.service_details }}
  </div>
</template>

<script>
import { feachServiceDetail } from '@/api/service'

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
    const name = this.$route.params && this.$route.params.name
    this.fetchData(name)
    console.log('BAKA')
    console.log(name)

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
    fetchData(name) {
      feachServiceDetail(name).then(response => {
        this.postForm = response.data

        console.log(this.postForm)

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
    }
  }
}
console.log('Baka')
</script>

<style scoped>

</style>
