## ispeak 修改版修改版

在 [Guo Le @夜的第八章](https://guole.fun/)修改的基础上再修改，依赖[Qexo](https://github.com/Qexo/Qexo/wiki)说说功能，所以要先搭建好 qexo 才能食用。
使用方法跟之前类似，只不过配置参数不一样并且只需引入一个 js 文件即可。

> 必须的参数：

`name`:显示的昵称

`avatar`:头像地址

`baseURL`：后台地址，部署 Qexo 的访问地址

可选参数：

`title`：显示的标题

`limit`：每次加载数量

`fromColor`：来源背景色

`labelColor`：标签主题色

`useLoadingImg`：使用自定义加载中 gif 图,

`loadingImg`：加载 gif 图，useLoadingImg 为 true 时必填

`format`：自定义日期显示格式，如`yyyy年MM月dd日`

例：

```html
<script
  type="text/javascript"
  src="//cdn.jsdelivr.net/gh/Uyoahz26/daodao@main/dist/qexo-dao.min.js"
  charset="utf-8"
></script>
<script>
  qexoDaodao
    ?.init({
      el: "#qexo",
      avatar: "https://q1.qlogo.cn/g?b=qq&nk=2496091142&s=640",
      name: "UyoAhz",
      limit: 10,
      fromColor: "#000000",
      useLoadingImg: false,
      baseURL: "https://qexo访问地址/",
      format: "yyyy年MM月dd日"
    })
    .then(function () {
      console.log("daodao加载成功")
    })
</script>
```


---

## ispeak 修改版

### 在小康基础再开发，解决了“xxx 前”相对时间出错问题。使用请在 md 文件中 ispeak 前引用一个 js 插件：

```js
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/timeago.js@4.0.2/dist/timeago.min.js"
  charset="utf-8"
></script>
```

### [使用教程](https://guole.fun/posts/34234/)

### ispeak 修改版使用

使用如下链接替换原来的 js（加在上述 timeago.js 后）：

```js
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/gh/kuole-o/bber-ispeak@main/dist/ispeak-bber.min.js"
  charset="utf-8"
></script>
```

### 修改点

- 音乐解析需要正则从前往后查找 URL 里的音乐 ID，然后拼接播放，在 Safari 中这个正则方法会报错(参考 https://qa.1r1g.com/sf/ask/3609817501/)，导致页面空白（一个解决思路是，在云函数bber里，就把音乐URL里的id匹配出来，云端替换成前端可以直接播放的meting.js所需格式，以后再搞，最近懒得折腾了）。这里的包去掉音乐解析功能：https://github.com/kuole-o/bber-ispeak/tree/main/dist
- 支持 QQ 音乐/网易云音乐歌曲分享，说说页面在线播放。这里的包，仍然支持音乐解析（Windows、Android 正常）：https://github.com/kuole-o/bber-ispeak/tree/main/dist_music
- “再翻翻”增加阴影模糊效果
- “my bibi”调整为“闪念”
- 图片布局调整
- 增加 wow 动画支持（需要网站本身配置 wow.js）
- 修复原 ispeak 中“三周”到“四周”相对日期时，直接展示具体日期
- 优化时间显示，增加日期 hover 时的 title 属性，用以显示实际时间
- 优化加载动画，修复卡顿问题

## 以下为 ispeakbber 原版说明

---

## 说明

此项目仅仅作为[哔哔点啥](https://immmmm.com/bb-by-wechat-pro/)的前端数据展示。
示例页面：

- [https://www.antmoe.com/bb](https://www.antmoe.com/bb)
- [https://blog.ccknbc.cc/essay/](https://blog.ccknbc.cc/essay/)
- [https://blog.imzjw.cn/talking/](https://blog.imzjw.cn/talking/)
- ...

## 重要说明

**使用前请先确保参考[林木木](https://immmmm.com/bb-by-wechat-pro/#%e6%89%8b%e5%8a%a8%e9%83%a8%e7%bd%b2%e5%88%9b%e5%bb%ba%e5%ba%94%e7%94%a8)的教程成功配置好云函数，然后在来使用本项目作为前端数据的展示。**

## 配置说明

> 以下为 markdown 文件示例

```markdown
<div id='speak'></speak>
<!-- 使用markdown渲染 -->
<!-- <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/ispeak-bber/ispeak-bber-md.min.js" charset="utf-8" ></script> -->
<!-- 不使用markdown渲染 -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/ispeak-bber/ispeak-bber.min.js" charset="utf-8" ></script>
<!-- 解析微信表情（参考：https://github.com/buddys/qq-wechat-emotion-parser） -->
<!-- <script src="https://cdn.jsdelivr.net/gh/buddys/qq-wechat-emotion-parser@master/dist/qq-wechat-emotion-parser.min.js"></script> -->
<script>
ispeakBber
    .init({
      el: '#speak', // 容器选择器
      name: 'DreamyTZK 🦄', // 显示的昵称
      envId: '腾讯云开发环境id', // 环境id
      region: 'ap-shanghai', // 腾讯云地址，默认为上海
      limit: 10, // 每次加载的条数，默认为5
      avatar: 'https://cdn.jsdelivr.net/npm/kang-static@latest/avatar.jpg',
      fromColor:'rgb(245, 150, 170)', // 下方标签背景颜色 默认 rgb(245, 150, 170)
      loadingImg: 'https://7.dusays.com/2021/03/04/d2d5e983e2961.gif', // 自定义loading的图片，示例值为默认值
      dbName:'talks' // 数据的名称，默认talks，避免有人的命名不是这个，所以加入此配置字段。
    })
    .then(function() {
      // 哔哔加载完成后的回调函数，你可以写你自己的功能
      console.log('哔哔 加载完成')
    })
</script>
```

> 其他注意事项： 云数据库名称必须为`talks`才可以，目前不支持指定数据库名称。示例代码中未指定版本号，如果你想指定版本号可以到[jsdelivr](https://cdn.jsdelivr.net/npm/ispeak-bber/)查看最新版本并引用。

## 是否使用 markdown

关于这个问题，起初我并不打算适配非 markdown，但因为考虑到部分用户可能已经使用过很长一段时间哔哔，并且通过哔哔微信公众号发送的图片是图片链接，非 markdown 语法也不是 html 标签，因此考虑到部分用户，只能出一个非 markdown 渲染的版本。

- markdown 渲染的脚本支持 markdown 语法。

- 非 markdown 渲染脚本兼容 markdown 语法、html 标签发送的图片，同时非 markdown 渲染继承了原 bb 将图片链接转换为图片链接、将一个非图片链接转化为`<a href='${url}' rel='noopener' target='_blank'>↘链接↙</a>`的功能。

## 其他

本项目构建方式及一些其他零碎点参考[twikoo](https://github.com/imaegoo/twikoo)
