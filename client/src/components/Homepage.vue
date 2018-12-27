<template>
  <div class="container homepage-wrapper">
    <a-row type="flex" justify="space-around" align="top">
      <a-col :span="6" :xs="24" :md="7" :sm="25" :lg="6" v-for="(account, idx) in accounts" :key="'feed_wrapper_' + idx" :order="account.order">
        <twitter-feed :account="account.name" :count="account.count"></twitter-feed>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Vue from 'vue'
import ColorPicker from 'v-color'
import { Avatar, Button, Card, Col, DatePicker, Drawer, Dropdown, Divider, Icon, Input, InputNumber, List, Menu, Row, Slider, message } from 'ant-design-vue'
import { mapActions, mapGetters } from 'vuex'

Vue.use(Avatar)
Vue.use(Button)
Vue.use(Card)
Vue.use(Col)
Vue.use(ColorPicker)
Vue.use(DatePicker)
Vue.use(Divider)
Vue.use(Drawer)
Vue.use(Dropdown)
Vue.use(Icon)
Vue.use(List)
Vue.use(Menu)
Vue.use(Row)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Slider)

Vue.prototype.$message = message

export default {
  name: 'Homepage',

  components: {

  },

  data () {
    return {
      accounts: [{
        name: 'MakeSchool',
        order: 1
      }, {
        name: 'newsycombinator',
        order: 2
      }, {
        name: 'ycombinator',
        order: 3
      }]
    }
  },

  computed: {
    ...mapGetters({
      allAccounts: 'getAccounts'
    })
  },

  watch: {
    allAccounts (newVal, oldVal) {
      this.accounts = newVal
    }
  },

  mounted () {
    this.setAccounts(this.accounts)
  },

  methods: {
    ...mapActions({
      setAccounts: 'setAccounts'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}
</style>
