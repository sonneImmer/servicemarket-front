<template>
  <div>
    This is ServiceDetail page.
    {{ this.detail }}
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
      detail: ''
    }
  },
  methods: {
    getdetail() {
      feachServiceDetail().then(response => {
        this.detail = response.data
        console.log('Baka')
        console.log(this.detail)
      })
    }
  },
  created() {
    this.getdetail()
  }
}
console.log('Baka')
</script>

<style scoped>

</style>
