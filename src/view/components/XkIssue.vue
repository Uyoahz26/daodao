<template>
  <div style="padding-bottom: 40px">
    <xk-info :count="total" :title="title"></xk-info>
    <transition-group name="list" tag="div">
      <template v-for="(bb, index) in bbList">
        <xk-card
          :key="bb.id"
          :bbData="bb.content"
          :id="bb.id"
          :name="name"
          :avatar="avatar"
          :fromColor="fromColor"
          :time="bb.time"
          :label="bb.tags[0]"
          :from="bb.tags[1]"
          :like="bb.like"
          :liked="bb.liked"
          :labelColor="labelColor"
          :format="format"
          @changeLike="handleChageLike($event, index)"
        />
      </template>
    </transition-group>
    <div class="loading" v-show="loading">
      <img :src="loadingImg" v-show="useLoadingImg" alt="loading" />
      <div v-show="!useLoadingImg" class="bbddloading-inner">
        <div class="bbddloading-line-wrap">
          <div class="bbddloading-line"></div>
        </div>
        <div class="bbddloading-line-wrap">
          <div class="bbddloading-line"></div>
        </div>
        <div class="bbddloading-line-wrap">
          <div class="bbddloading-line"></div>
        </div>
        <div class="bbddloading-line-wrap">
          <div class="bbddloading-line"></div>
        </div>
        <div class="bbddloading-line-wrap">
          <div class="bbddloading-line"></div>
        </div>
      </div>
    </div>
    <div class="btn-area">
      <button
        class="push-btn color-1"
        @click="getData"
        v-if="bbList.length < total && !loading"
      >
        更早之前的
      </button>
    </div>
    <div style="text-align: center; margin-top: 20px" v-if="showMessage">
      {{ message }}
    </div>
    <xk-footer></xk-footer>
  </div>
</template>
<script>
import Vue from "vue"
import XkCard from "./XkCard.vue"
import XkInfo from "./XkInfo.vue"
import XkFooter from "./XkFooter.vue"

export default {
  components: { XkCard, XkInfo, XkFooter },

  data() {
    return {
      title: "",
      name: "",
      avatar: "",
      bbList: [],
      total: 0,
      message: "让叨叨飞一会~",
      loading: true,
      page: 1,
      limit: 5,
      showMessage: false,
      fromColor: "",
      labelColor: "",
      loadingImg:
        "https://blog-img-1258635493.cos.ap-chengdu.myqcloud.com/cdn/img/loader/dogloading.gif",
      useLoadingImg: true,
      execIng: false,
      baseURL: "",
      format: "",
    }
  },
  methods: {
    async getData() {
      this.loading = this.showMessage = true
      let res = await this.$http({
        url: this.baseURL + "pub/talks/",
        method: "get",
        params: {
          page: this.page,
          limit: this.limit,
        },
      })
      const { count = 0, data = [], status = false } = res.data
      if (status) {
        this.total = count
        this.bbList = this.bbList.concat(data)
        this.page += 1
      } else {
        this.message = "哦吼，加载失败了，刷新看看~"
        this.showMessage = true
        return
      }
      this.loading = this.showMessage = false
      if (this.bbList.length === this.total) {
        this.message = "当你看到这段话的时候，就说明已经全部加载完了..."
        this.showMessage = true
      }
    },
    async handleChageLike(id, idx) {
      if (!id || this.execIng) return
      if (this.bbList[idx].liked) {
        this.$toast.error("哈哈哈，点赞了就休想取消啦~")
        return
      } else {
        this.$toast.success("点赞成功，只不过有点慢，让点赞飞一会~")
      }
      this.execIng = true
      let res = await this.$http({
        url: this.baseURL + "pub/like_talk/",
        method: "post",
        data: `id=${id}`,
      })
      const { status } = res.data
      if (status) {
        this.bbList[idx].like = this.bbList[idx].liked
          ? this.bbList[idx].like - 1
          : this.bbList[idx].like + 1
        this.bbList[idx].liked = !this.bbList[idx].liked
      }
      this.execIng = false
    },
  },
  async mounted() {
    const {
      title = "叨叨",
      name,
      avatar,
      baseURL,
      limit = 5,
      fromColor = "black",
      labelColor = "#000a85",
      loadingImg = "https://blog-img-1258635493.cos.ap-chengdu.myqcloud.com/cdn/img/loader/dogloading.gif",
      useLoadingImg = true,
      format,
    } = Vue.prototype.$speakData
    this.title = title
    this.name = name
    this.baseURL = baseURL.endsWith("/") ? baseURL : baseURL + "/"
    this.avatar = avatar
    this.useLoadingImg = useLoadingImg
    this.limit = limit
    this.fromColor = fromColor
    this.labelColor = labelColor
    this.format = format
    this.getData()
  },
}
</script>
<style scoped>
.bbddloading-inner {
  height: 100px;
  margin: auto;
  position: relative;
  width: 100px;
}

.bbddloading-line-wrap {
  animation: spin 2000ms cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
  box-sizing: border-box;
  height: 50px;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  transform-origin: 50% 100%;
  width: 100px;
}
.bbddloading-line {
  border: 4px solid transparent;
  border-radius: 100%;
  box-sizing: border-box;
  height: 100px;
  left: 0;
  margin: 0 auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
}
.bbddloading-line-wrap:nth-child(1) {
  animation-delay: -50ms;
}
.bbddloading-line-wrap:nth-child(2) {
  animation-delay: -100ms;
}
.bbddloading-line-wrap:nth-child(3) {
  animation-delay: -150ms;
}
.bbddloading-line-wrap:nth-child(4) {
  animation-delay: -200ms;
}
.bbddloading-line-wrap:nth-child(5) {
  animation-delay: -250ms;
}

.bbddloading-line-wrap:nth-child(1) .bbddloading-line {
  border-color: hsl(0, 80%, 60%);
  height: 90px;
  width: 90px;
  top: 7px;
}
.bbddloading-line-wrap:nth-child(2) .bbddloading-line {
  border-color: hsl(60, 80%, 60%);
  height: 76px;
  width: 76px;
  top: 14px;
}
.bbddloading-line-wrap:nth-child(3) .bbddloading-line {
  border-color: hsl(120, 80%, 60%);
  height: 62px;
  width: 62px;
  top: 21px;
}
.bbddloading-line-wrap:nth-child(4) .bbddloading-line {
  border-color: hsl(180, 80%, 60%);
  height: 48px;
  width: 48px;
  top: 28px;
}
.bbddloading-line-wrap:nth-child(5) .bbddloading-line {
  border-color: hsl(240, 80%, 60%);
  height: 34px;
  width: 34px;
  top: 35px;
}

@keyframes spin {
  0%,
  15% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  transform-origin: 50% 50%;
}
.list-enter,
.list-leave-to {
  transform-origin: 50% 50%;
  transform: scaleY(0) translateZ(0);
  opacity: 0;
}
.loading {
  text-align: center;
  padding: 20px;
}
@keyframes Gradient {
  0% {
    background-position: 0 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  to {
    background-position: 0 50%;
  }
}

.push-btn.color-1 {
  background-image: linear-gradient(
    to right,
    #29323c,
    #485563,
    #2b5876,
    #4e4376
  );
  box-shadow: 0 4px 15px 0 rgba(45, 54, 65, 0.75);
}

.btn-area {
  text-align: center;
}

.push-btn {
  width: 148px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  margin: 20px;
  height: 55px;
  text-align: center;
  border: none;
  background-size: 300% 100%;

  border-radius: 50px;
  moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.push-btn:hover {
  background-position: 100% 0;
  moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.push-btn:focus {
  outline: none;
}
</style>
