<template>
  <div class="xk-card wow animate__zoomIn">
    <div class="xk-card-header">
      <div class="xk-card-name">
        <div class="avatar">
          <img :src="avatar" class="avatar-img" />
        </div>
        <div class="name-info">
          <div class="name">{{ name }}</div>
          <span class="xk-card-time" :title="time_title">{{ date }}</span>
        </div>
      </div>
      <div class="dao-label" v-if="label">#{{ label }}</div>
    </div>
    <div class="xk-card-content" v-html="content"></div>
    <div class="xk-card-footer">
      <div
        :style="{
          background: fromColor,
          color: 'white',
        }"
        class="xk-card-label"
      >
        <span>{{ from ?? "Chrome" }}</span>
      </div>
      <div class="dao-like">
        <template v-if="liked">
          <svg
            class="like-svg"
            @click="handleLike"
            style="margin-right: 2px"
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="16"
            fill="red"
          >
            <path
              transform="scale(0.03,0.03)"
              d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"
            />
          </svg>
          {{ like }}
        </template>
        <template v-else>
          <svg
            class="like-svg"
            @click="handleLike"
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="16"
          >
            <path
              transform="scale(0.03,0.03)"
              d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"
            ></path>
          </svg>
          {{ like }}
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import "../tools/view-image.min.js";
import { format } from "timeago.js";
export default {
  props: [
    "id",
    "bbData",
    "name",
    "avatar",
    "fromColor",
    "time",
    "label",
    "from",
    "like",
    "liked",
    "labelColor",
  ],
  data() {
    return {
      content: "",
      date: "",
    };
  },
  computed: {
    time_title() {
      return new Date(parseInt(this.time) * 1000).toLocaleString();
    },
  },
  mounted() {
    this.content = this.bbData.replace(/^<p><br><\/p>*|<p><br><\/p>*$/g, "");
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
    window.ViewImage && ViewImage.init(".xk-card-content img");
  },
  methods: {
    handleLike() {
      this.$emit("changeLike", this.id);
    },
  },
};
</script>
<style scoped>
.xk-card {
  padding: 15px 20px 2px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0px 14px 2px rgb(7 17 27 / 6%);
  overflow: hidden;
  margin-top: 20px;
  user-select: none;
  position: relative;
  transition: all 0.15s ease-in-out;
}
.xk-card:hover {
  box-shadow: 0 5px 10px 8px rgba(7, 17, 27, 0.16);
  transform: scale(1.015);
}
.xk-card .xk-card-time {
  font-size: 12px;
  /* text-shadow: #d9d9d9 0 0 1px, #fffffb 0 0 1px, #fffffb 0 0 2px; */
  /* margin-left: 10px; */
  font-weight: 400;
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
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.xk-card .xk-card-header .xk-card-name .name-info {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
}

.xk-card .xk-card-header .xk-card-name .avatar-img {
  width: 100%;
  height: unset;
  border-radius: 0.6em;
  box-shadow: 0px 0px 3px 0px #00000066;
}
.name {
  font-weight: bold;
  transition: letter-spacing 0.2s ease;
}

.xk-card .xk-card-content {
  padding: 0.8rem 0;
}
.xk-card-content > div > iframe {
  width: 100% !important;
}
.dao-label {
  color: v-bind(labelColor);
  font-weight: bold;
  font-style: oblique;
  font-size: 13px;
  background-color: v-bind(labelColor + "1a");
  padding: 2px 6px;
  border-radius: 0.4em;
}
.dao-like {
  display: inline-flex;
  align-items: center;
}
.like-svg {
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
  height: fit-content;
  padding: 1px 5px;
  border-radius: 0.3rem;

  /* padding: 0 5px;
  font-weight: 600;
  line-height: 24px; */
  font-size: 12px;
  /* cursor: pointer;
  user-select: none;
  margin-right: 10px; */
}
.xk-card-header::before {
  content: " ";
  width: 4.5px;
  height: 30px;
  background-color: v-bind(labelColor);
  position: absolute;
  left: 0px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  transition: height 0.2s ease;
}
.xk-card-label > span::before {
  content: " ";
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEvElEQVR4nO2aT2zbVBzHP892kiZuGK2hYUXTVqRqVO0FDkyCE5uGEEi7TOJSisQBxoEJ0MR2GxO7ICHQJv6IjQPSChdOlD8TQmxHxMSBSyc2/mxllHTtllRakrZpbD8OadPW6dYkfrEbls+pec9+/n2+9rMT90GbNm3atGnT5m5FHDv2ZTR5M38cxAiwNeyCAiKNYDRnmUeNZKbwNojDYVcUML1IjiQzBQwkIwADz+6is6cr7MICITc9y6WzF0AyogG9wF0jD5BMVVx7DW/nb99dID8zG2xFikimunj4mV3A+h6r+5epBKCnLABELNLsOptGLB6lr/8BAK4mouQ9/UbHSv8vy23eQQaH9zazxpowhKDH1DE0saY9O++QL7mVz4mIhhXXEZ79HQkDw3spObLS1h3X6YxoVceqbgkZFfIzc3ZN8rDJAghaHjZRAH7kTc1pSB4UBrDDlBtvdBv8yCc0hy7DprBYvzwoCsCKQW9cYsXq39eP/BbdptuwARhIOvTEygHUKg8KArBi0GeWC+0z3bpC8Dvns7ZBer7c+mdOMFMUdcnDOo/BethhSnrjK5ddVIOdSZe0IZgoeMv1HFjRDc92BFLCjQbkwWcAEwVBzhb0mS5RDRZduFrQyBQ3OKjiu/3fc43Jg4IpkCmWpQGuhCAP9c35qnoa2stDpghpQ5BtMXlQ+BgMas6rlAdFV8BG6EKQ6tTRxVqtzLxDYZW8uSTvxZUwXbCx3RV5K65j+pSHAAJYPvNe+axHPhHR6F5HvnK3d9eeeT/yswtO5e+mfhXejJf97IJDbnHl2E0LoBXkoUkBtIo8NCGAVpIHxQG0mjwoDKAV5UFRAH7khQhPHhQE4EsesIwSt4rhyIPPAPxe9p2aTYdw2R530Zc6g5QHH98EVcz533OwNSaYnBe4Mnh5aDAAlTe8a3Pl3jDkoYEp0Kp3+9tR11H/b/JQRwCbQf6+Ux9hnf648nl2weH4P19xcvqbNduNXZph7PJMTWNW7gE/v/NFzYUExT2pe3nq4D40rRxS5NpEpW/5zF8tTlftdz1f/Wrq4ugP5P69UdUeyAuRRnFLLpnrWYQoB7C8fufmVBaAxKptE4Vc1f6r23S5/jSpBLD74D6f5Tafua3b8M6tfuN+PO9aeDBhVE3BR/c/sebz+Q++Bjb5FeDlr/3PV7Ud3rKnqu257Z01j1kJIJdfbLCs1kYD0lBeOHS3kF9xTRsIRpEcuXT2Qpg1hYKAM0bOMo8mMwWWlsv1hl1UQKQRjN6yzLfu/N8Mhbz36mcSwNo9dMftMufHATj04YuB1LZpVoiERTuAsAsIG+Xz7NTLpxL5aPSQlAwLwUOA35WXJSm5omnyc7NYev/A6QNzKupcRmkA775ypkcz7O9BPKJy3BXkr65tPP3mJy/U9lOvBpQFcOK1T1OOY5wDBiOJqNs1uE3rsDoRur9ZJh2XhUye7PiktOeLArio6/ae10++VP0zsAGUBFA+8+45kEORRKyYerw/pitec+wu2kz99EfRLizEpOSyHjGefOPEyJTfcZX8GNIizrdIhgBKc8XY5I/jKoZdjxiAEOx0HXsMeMzvgGqeAq70LsxuOkJS/QKgTZs2berkP82M1TLgT8x4AAAAAElFTkSuQmCC");
}
.xk-card:hover .xk-card-header::before {
  height: 45px;
}
.xk-card:hover .xk-card-header .name {
  letter-spacing: 1px;
}
</style>