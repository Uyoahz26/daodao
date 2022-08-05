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
    </div>
    <div class="xk-card-content" v-html="content"></div>
    <div class="xk-card-footer">
      <div
        :style="'background: ' + fromColor + ';color:' + 'white'"
        class="xk-card-label"
      >
        {{ from }}
      </div>
      <div class="dao-label">
        {{ label }}
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { format } from "timeago.js";
export default {
  props: ["bbData", "name", "avatar", "fromColor"],
  data() {
    return {
      content: "",
      date: "",
      from: "",
      label: "",
    };
  },
  computed: {
    time_title() {
      return new Date(this.bbData.date).toLocaleString();
    },
  },
  mounted() {
    this.content = this.formatBody(this.bbData.content);
    this.label = this.bbData.label ? `#${this.bbData.label}` : "";
    this.from = this.bbData.from;
    var date1 = this.bbData.date;
    var date2 = new Date();
    var date3 = date2.getTime() - new Date(date1).getTime();
    var date4 = new Date(this.bbData.date).getTime() + 8 * 3600 * 1000;
    var datetime = new Date(date4).toJSON();
    datetime = datetime.substr(0, 10).replace("T", " ");
    if (date3 > 2678400000) {
      this.date = datetime;
    } else {
      this.date = format(this.bbData.date, "zh_CN");
    }
  },
  methods: {
    formatBody: (body) => {
      // 判断是否使用marked渲染
      if (Vue.prototype.$marked) {
        const marked = Vue.prototype.$marked;
        const renderer = {
          image(href, title, text) {
            console.log(href);
            return `<a href="${href}" target="_blank" data-fancybox="group" class="fancybox">
           <img src="${href}" alt='${text}'>
          </a>`;
          },
        };
        marked.use({ renderer });
        return marked(body, { breaks: true, gfm: true });
      } else {
        function urlToLink(str) {
          // const qqWechatEmotionParser = require('qq-wechat-emotion-parser');
          const re =
            /\bhttps?:\/\/(?!\S+(?:jpe?g|png|bmp|gif|webp|gif|mp4))\S+/g;

          // 匹配html标签发布的图片
          const re_tagImg = /<img [^>]*src=['"]([^'"]+)[^>]*>/gm;
          str = str.replace(re_tagImg, function (raw, url, text, uuu) {
            return url;
          });
          // 处理markdown格式的图片
          const re_mdImg = /!\[(.*?)\]\((.*?)\)/gm;
          str = str.replace(re_mdImg, function (raw, text, url) {
            return url;
          });
          // 替换所有图片链接为图片
          //- QQ音乐和网易云音乐处理
          const re_forpic =
            /\bhttps?:[^:<>"]*\/([^:<>"]*)(\.(jpeg)|(png)|(jpg)|(webp))/g;
          /* Safari上音乐id匹配的正则方法不支持，导致报错无法展示，暂时去掉音乐解析功能
          const qq_music = /y\.qq\.com/g;
          const netease_music = /music\.163\.com/g;
        */
          //  const music_url = /[a-zA-z]+:\/\/[^\s]*/g;
          /*  
          const music_type = /(&songmid=)|(song\?id=)|(songDetail)/g;
          const music_id = /((?<=\?id=)(.*?)(?=&uct))|((?<=\&songmid=)(.*?)(?=&type))|((?<=\&id=)(.*?)(?=&ADTAG=))|((?<=playlist\?id=)(.*?)(?=&userid=))|(?<=playlist\/).*$|((?<=h5_playsong\&mid=)(.*?)(?=\&no_redirect))|((?<=songDetail\/)(.*?)(?=\?songtype=))/g;
            if (music_type.test(str)) {
                  var type = 'song';
                } else {
                  var type = 'playlist';
                }
            if (qq_music.test(str)) {
              var server = 'tencent';
              var music = str.match(music_id)
              str = str.replace(music_url, function (url) {
              return `<meting-js server="` + server + `" type="` + type + `" id="` + music + `"> </meting-js>`;
              });
            } else if (netease_music.test(str)) {
              var server = 'netease';
              var music = str.match(music_id)
              str = str.replace(music_url, function (url) {
              return `<meting-js server="` + server + `" type="` + type + `" id="` + music + `"> </meting-js>`;
              });
            } else {}
        */
          str = str.replace(re_forpic, function (url) {
            return `<a href="${url}" target="_blank" data-fancybox="group" class="fancybox">
            <img src="${url}" ></a>`;
          });
          str = str.replace(re, function (website) {
            return `<a href='${website}' rel='noopener' target='_blank'>↘我是链接↙</a>`;
          });
          if (window.qqWechatEmotionParser) {
            str = qqWechatEmotionParser(str);
          }
          return str;
        }
        return urlToLink(body);
      }
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 5px;
}
.xk-card .xk-card-header .xk-card-name .avatar-img {
  width: 100%;
  height: unset;
  border-radius: 50%;
}
.name {
  font-weight: bold;
  font-family: monospace;
  text-shadow: 3px 2px 0px #4600f938;
}

.xk-card .xk-card-content {
  padding: 0.8rem 0;
}
.dao-label {
  color: #0014ff;
  font-weight: bold;
  font-style: oblique;
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
  font-weight: 550;
  box-shadow: inset 0 -1px 0 rgb(27 31 35 / 12%);
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  margin-right: 10px;
}
</style>