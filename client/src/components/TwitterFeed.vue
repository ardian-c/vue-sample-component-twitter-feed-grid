<template>
  <div class="twitter-feed__wrapper">
    <loading :active.sync="isLoading"
    :can-cancel="true"
    :is-full-page="false"></loading>
    <div class="twitter-feed__content">
      <a-card
        hoverable
      >
        <img
          :alt="accountOwner.name"
          :src="accountOwner.profile_banner_url"
          slot="cover"
        />
        <template class="ant-card-actions" slot="actions">
          <a-icon type="setting" @click="handleShowAccountSettings(account)" />
          <a-icon type="twitter" />
          <a-dropdown>
            <a class="ant-dropdown-link" href="#">
              <a-icon type="ellipsis" />
            </a>
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item key="1" @click="handleShowFeedProfile(account)">View Profile</a-menu-item>
              <a-menu-item key="2">Remove</a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
        <a-card-meta
          :title="account"
          :description="accountOwner.location">
          <a-avatar slot="avatar" :src="accountOwner.profile_image_url_https" />
        </a-card-meta>
      </a-card>

      <a-list
        bordered
        itemLayout="vertical"
        size="large"
        :dataSource="feedData.data"
      >
        <a-list-item class="twitter-feed__item" slot="renderItem" slot-scope="item, index" :key="'feed_' + account + '_idx'">
          <a-row>
            <div class="twitter-feed__item__top_description" v-if="typeof item.retweeted_status === 'undefined'">
              <div class="twitter-feed__item__profile">
                <a-avatar :size="32" :src="item.user.profile_image_url" />
              </div>
              <span >{{ item.user.name }}</span>&nbsp;<small>@{{ item.user.screen_name }}</small>
            </div>

            <div class="twitter-feed__item__top_description" v-else>
              <div class="twitter-feed__item__profile">
                <a-avatar :size="32" :src="item.retweeted_status.user.profile_image_url" />
              </div>
              <span><a-icon type="retweet" /> {{ item.user.name }} Retweeted </span>&nbsp;
              <ul class="twitter-feed_item__top_description__mentions" >
                <li v-for="(mention, idx) in item.entities.user_mentions" :key="'tweet_mention_' + idx"><small >
                  <a :href="`https://twitter.com/${mention.screen_name}`" target="_blank"><i>@{{ mention.screen_name }}</i></a>
                </small></li>
              </ul>
            </div>

            <div class="twitter-feed__item__other__details">
              <a-list-item-meta>
                <a slot="title" :style="{ color: settings.linkColor }" :href="`https://twitter.com/${item.user.screen_name}/status/${item.id_str}`" target="_blank" v-if="typeof item.retweeted_status === 'undefined'">{{item.text}}</a>
                <a slot="title" :style="{ color: settings.linkColor }" :href="item.retweeted_status.entities.urls[0].expanded_url" target="_blank" v-else>{{item.text}}</a>
              </a-list-item-meta>
              <span>
                <a-icon type="retweet"/>
                {{ item.retweet_count }}
              </span>

              <span>
                <a-icon type="heart" />
                {{ item.favorite_count }}
              </span>

              <span>
                <a-icon type="clock-circle" />
                <timeago :datetime="item.created_at"></timeago>
              </span>
            </div>
          </a-row>
        </a-list-item>
      </a-list>

      <a-drawer
        width=400
        placement="right"
        title="Settings"
        @close="onCloseShowAccountSettings"
        :visible="showAccountSettings"
      >
        <a-row>
          <p>Sort Twitter feeds</p>
          <draggable v-model="orderedAccounts" :options="{group:'people'}">
              <transition-group>
                <div class="twitter-feed-list__draggable__item" v-for="(element, idx) in allAccounts" :key="'account_draggable_' + idx">
                    {{element.name}}
                </div>
              </transition-group>
          </draggable>
        </a-row>
        <br />
        <a-row>
          <p>Pick range of dates to filter the posts</p>
          <a-range-picker @change="onChangeFilterPostsByDate" />
        </a-row>
        <br />
        <a-row>
          <p>Number of posts to show (max: {{ count }})</p>
          <a-col :span="16">
            <a-slider :min="1" :max="count" v-model="settings.showPostsCount" />
          </a-col>
          <a-col :span="4">
            <a-input-number
              :min="1"
              :max="count"
              style="marginLeft: 16px"
              v-model="settings.showPostsCount"
            />
          </a-col>
        </a-row>

        <a-row>
          <p>Choose a color for the feed</p>
          <color-picker color="#000000" @change="onColorPickerChange"></color-picker>
        </a-row>
      </a-drawer>

      <a-drawer
        width=400
        placement="right"
        :title="'Details for @' + selectedAccount"
        :closable="false"
        @close="onCloseShowFeedProfile"
        :visible="showFeedProfile"
      >
        <a-row>
          <a-list>
            <a-list-item><strong>Name: </strong>&nbsp;{{ accountOwner.name }} </a-list-item>
            <a-list-item><strong>Description: </strong>&nbsp; {{ accountOwner.description !== '' ? accountOwner.description : '-' }}</a-list-item>
            <a-list-item><strong>Screen name: </strong>&nbsp;{{ accountOwner.screen_name }} </a-list-item>
            <a-list-item><strong>Location: </strong>&nbsp;{{ accountOwner.location }} </a-list-item>
            <a-list-item><strong>Website: </strong><a :href="typeof accountOwner.url !== 'undefined' ? accountOwner.url : '#'" target="_blank">&nbsp;{{ (typeof accountOwner.entities !== 'undefined' ? accountOwner.entities.url.urls[0].display_url : 'open in another page') }}</a> </a-list-item>
            <br />
            <p>
              <a-icon type="fire"/>
              {{ formatNumber(accountOwner.followers_count) }} followers
            </p>

            <p>
              <a-icon type="user-add"/>
              {{ accountOwner.friends_count }} following
            </p>

            <p>
              <a-icon type="twitter"/>
              {{ (typeof accountOwner.statuses_count !== 'undefined') ? accountOwner.statuses_count.toLocaleString() : 0 }} tweets
            </p>

            <p>
              <a-icon type="like"/>
              {{ (typeof accountOwner.favourites_count !== 'undefined') ? accountOwner.favourites_count.toLocaleString() : 0 }} likes
            </p>

          </a-list>
        </a-row>
      </a-drawer>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import draggable from 'vuedraggable'
import Loading from 'vue-loading-overlay'
import { numberFormatter } from '@/utils'
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    account: { default: '', type: String },
    count: { default: 30, type: Number }
  },

  components: { Loading, draggable },

  data () {
    return {
      feedData: {},
      accountOwner: {},
      showFeedProfile: false,
      showAccountSettings: false,
      selectedAccount: '',
      settings: {
        backgroundColor: '#ffffff',
        linkColor: '#000000',
        showPostsCount: 30
      }
    }
  },

  created () {

  },

  mounted () {
    this.addAccount(this.account)
    this.handleGetFeedData()
  },

  computed: {
    ...mapGetters({
      getFeedsByAccount: 'feeds/getFeedsByAccount',
      isLoading: 'feeds/isLoading',
      allAccounts: 'getAccounts'
    }),

    orderedAccounts: {
      get () { return this.$store.state.accounts },
      set (val) {
        const orderedAccounts = []
        val.forEach(({ name }, idx) => {
          orderedAccounts.push({ name, order: idx + 1 })
        })
        this.$store.dispatch('setAccounts', orderedAccounts)
      }
    }
  },

  watch: {
    successMessage (newVal, oldVal) {
      this.$message.success(newVal)
      this.resetMessages()
    },

    failedMessage (newVal, oldVal) {
      this.$message.error(newVal)
      this.resetMessages()
    },

    feedData (newVal, oldVal) {
      this.accountOwner = newVal.data[0].user
    },

    'settings.showPostsCount': async function (newVal, oldVal) {
      this.$store.dispatch('feeds/updateFeed', { account: this.account, count: parseInt(newVal) })
      console.log(this.feedData)
    }
  },

  methods: {
    moment,

    ...mapActions({
      getFeed: 'feeds/getFeed',
      addAccount: 'addAccount'
    }),

    formatNumber (num) {
      return numberFormatter(num)
    },

    async handleGetFeedData () {
      await this.getFeed({ account: this.account, count: this.count })
      this.feedData = this.getFeedsByAccount(this.account)
    },

    handleMenuClick () {},

    handleShowFeedProfile (account) {
      this.selectedAccount = account
      this.showFeedProfile = true
    },

    handleShowAccountSettings (account) {
      this.selectedAccount = account
      this.showAccountSettings = true
    },

    onChangeFilterPostsByDate (val, dateString) {
      const { data } = this.feedData
      const tmpData = data.filter((item) => {
        let dt = moment(item.created_at).format('YYYY-MM-DD')
        return moment(dt).isSameOrAfter(dateString[0]) && moment(dt).isSameOrBefore(dateString[1])
      })
      this.feedData.data = tmpData
    },

    onCloseShowAccountSettings () {
      this.showAccountSettings = false
    },

    onCloseShowFeedProfile () {
      this.showFeedProfile = false
    },

    onColorPickerChange (color) {
      this.settings.linkColor = color.hex
      this.$store.commit('updateLinkColor', { account: this.account, color: color.hex })
    },

    resetMessages () {
      this.successfulApiRequest('')
      this.failedApiRequest('')
    }
  }
}
</script>

<style lang="less" scoped>
  .twitter-feed__item {
    .twitter-feed__item__profile {
      top: -5px;
      left: -18px;
      position: absolute;
    }

    ul.twitter-feed_item__top_description__mentions {
      list-style: none;
      padding: 1em;
      display: block;
      li {
        display: inline-block;
        margin-right: 5px;
      }
    }

    .twitter-feed__item__other__details {
      span {
        margin-right: 10px;
      }
    }
  }

  .twitter-feed-list__draggable__item {
      position: relative;
      display: block;
      padding: 10px 15px;
      margin-bottom: -1px;
      background-color: #fff;
      border: 1px solid #ddd;
      cursor: move;
      cursor: grab;
      cursor: -moz-grab;
      cursor: -webkit-grab;
    }
</style>
