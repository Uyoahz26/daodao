<!--
 * @description: 卡片
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2021-03-19 09:17:45
 * @LastEditTime: 2022-08-05 11:09:08
 * @LastEditors: George.zhao
-->
<template>
  <div class="xk-card wow animate__zoomIn">
    <div class="xk-card-header">
      <div class="xk-card-name">
        <div class="avatar">
          <img :src="avatar" class="avatar-img" />
        </div>
        <div class="name">{{ name }}</div>
        <svg
          class="is-badge"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z"
            fill="#2708ff"
          ></path>
        </svg>
        <span class="xk-card-time" :title="time_title">{{ date }}</span>
      </div>
      <div class="dao-label" v-if="label">
        #{{ label }}
      </div>
    </div>
    <div class="xk-card-content" v-html="content"></div>
    <div class="xk-card-footer">
      <div
        :style="'background: ' + fromColor + ';color:' + 'white'"
        class="xk-card-label"
      >
        {{ from || "Chrome牛逼器" }}
      </div>
      <div class="dao-like">

        <template v-if="liked">
          <svg class="like-svg" @click="handleLike" style="margin-right: 2px" xmlns="http://www.w3.org/2000/svg" height="16" width="16" fill="red">
            <path transform="scale(0.03,0.03)" d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
          </svg>
          {{ like }}
        </template>
        <template v-else>
          <svg class="like-svg" @click="handleLike" xmlns="http://www.w3.org/2000/svg" height="16" width="16">
            <path transform="scale(0.03,0.03)" d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z">
            </path>
          </svg>
          {{ like }}
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { format } from "timeago.js";
export default {
  props: ["id", "bbData", "name", "avatar", "fromColor", "time", "label", "from", "like", "liked"],
  data() {
    return {
      content: "",
      date: "",
      from: ""
    };
  },
  computed: {
    time_title() {
      return new Date(parseInt(this.time) * 1000).toLocaleString();
    },
  },
  mounted() {
    this.content = this.bbData;
    var date1 = new Date(parseInt(this.time) * 1000);
    var date2 = new Date();
    var date3 = date2.getTime() - new Date(date1).getTime();
    var date4 = new Date(this.bbData.date).getTime() + 8 * 3600 * 1000;
    var datetime = new Date(parseInt(this.time) * 1000).toJSON();
    datetime = datetime.substr(0, 10).replace("T", " ");
    if (date3 > 2678400000) {
      this.date = datetime;
    } else {
      this.date = format(new Date(parseInt(this.time) * 1000), "zh_CN");      
    }
  },
  methods: {
    handleLike(){
      this.$emit("changeLike", this.id)
    },
  },
};
</script>
<style scoped>
.xk-card {
  padding: 10px 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0px 14px 2px rgb(7 17 27 / 6%);
  overflow: hidden;
  margin-top: 20px;
  user-select: none;
}
.xk-card:hover {
  box-shadow: 0 5px 10px 8px rgba(7, 17, 27, 0.16);
  transition: all 0.15s ease-in-out;
}
.xk-card .xk-card-time {
  font-size: 12px;
  text-shadow: #d9d9d9 0 0 1px, #fffffb 0 0 1px, #fffffb 0 0 2px;
  margin-left: 10px;
  font-weight: 700;
  font-style: oblique;
}
.xk-card .xk-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.xk-card .xk-card-header .xk-card-name {
  display: flex;
  align-items: center;
}
.xk-card .xk-card-header .xk-card-name .is-badge {
  height: 20px;
  width: 20px;
  margin-left: 5px;
}
.xk-card .xk-card-header .xk-card-name .avatar {
  width: 35px;
  height: 35px;
  margin-right: 5px;
}
.xk-card .xk-card-header .xk-card-name .avatar-img {
  width: 100%;
  height: unset;
  border-radius: 0.6em;
  box-shadow: 0px 0px 3px 0px #00000066;
}
.name {
  font-weight: bold;
  font-family: serif;
  text-shadow: 2px 1px 0px #4600f938;
}

.xk-card .xk-card-content {
  padding: 0.8rem 0;
}
.dao-label {
  color: #0014ff;
  font-weight: bold;
  font-style: oblique;
  font-size: 13px;
  background-color: #2e93ff1a;
  padding: 2px 6px;
  border-radius: 0.4em;
}
.dao-like{
    display: inline-flex;
    align-items: center;
}
.like-svg{
  cursor: pointer;
}

@media screen and (min-width: 768px) {
  #article-container .xk-card-content >>> .fancybox,
  #article-container .xk-card-content >>> video {
    display: inline-block;
    max-width: 50%;
  }
}

@media screen and (max-width: 768px) {
  #article-container .xk-card-content >>> .fancybox,
  #article-container .xk-card-content >>> video {
    display: inline-block;
    max-width: 100%;
  }
}

.xk-card .xk-card-footer {
  display: flex;
  padding-bottom: 10px;
  justify-content: space-between;
}
.xk-card .xk-card-footer .xk-card-label {
  border-radius: 4px;
  padding: 0 5px;
  font-weight: 600;
  line-height: 24px;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  margin-right: 10px;
}
</style>