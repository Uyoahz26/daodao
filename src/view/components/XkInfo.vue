<template>
  <div class="xk-info">
    <div class="count">
      <i class="iconfont icon-pinlun"></i>
      {{ title }} 「<span style="font-size: 26px">{{ count }}</span
      >」
    </div>
  </div>
</template>

<script>
export default {
  props: ["count", "title"],
};
</script>

<style scoped>
.xk-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.xk-info .count {
  font-weight: 700;
  font-size: 16px;
  /* color: #49b1f5; */
}
.xk-info .count i {
  /* color: black; */
  font-size: 20px;
}

@font-face {
  font-family: "iconfont";
  src: url("//at.alicdn.com/t/font_2434936_h1orv7ic88t.eot?t=1616336275189"); /* IE9 */
  src: url("//at.alicdn.com/t/font_2434936_h1orv7ic88t.eot?t=1616336275189#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */
      url("data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMUAAsAAAAABswAAALIAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqBWIFdATYCJAMICwYABCAFhG0HMBsDBsiemjwpUokNLPAZtJlEAoQIov3Yz947VJNLIopHtaRJSyVBhhYowRL5awlvck0zIE7JjQhkMf8FTPMDhUDn5xDUpuZ2E47y4rM+PUz6Di6nP8VbB5TLHJPHBAwsDXCsRZEVSGDeIruI7YlHxHECtXr4M1jLzC8H5jIYF4hbGS0E5g2vLBuJaqGSsjSLFxWq01O6BsBz9v34D0LDnKSiACXbNxkSkPyrB1OMGsoG5wmCt5wZxioKTAEysU+1bjIqolOM1HpRYwPAsQqDX/7LhHvYPx5BVIL8etAlc5+JF/EfNT+BXHSvAy4mXU2aIe6KHBubHndZtXp7q3r9rnz+LG942RidnFhxDUOv0Xh0TCvpfvkKeWkoP6BPE3RtTXlVja+vjjqXj4y6FSxNPCFP/9cWMbjH+Vr8HJw1ut80qkdWEp41nEkP1fYpibiTYR+wW5ODOSm89IJsVvIfIxgL2yCsVPRXsw6wUuzttbP2T3cpoRceFtw8Qi9NSOn5G8O6c2SUFT+SAZQfxUoR8HN/47U4O+XbzW1el8HP1cOZu/zIYJgdqL4FW/AreQObsi8AXcouj2pP1ieFE2oxQAmcrT6mKjvuOxmqddy9vUp3BYVqQ2gmp6BCnVmoVG0Rak3KWl2nDWYkcg0mtEoQmu1D0ugdCs1u0Ey+Q4VO31CpOYyg1mG0bVlnJGSWqxgJCZJAUR2UiTVqihiIZV5YimhGKcR1QUapRFgvC8CQwOB2IgupEV5ihr6aDiWEghTWqGCmdBpSKjVQizVyJCaBUkK0sUFBFO1NgWKNClhahSFCBCIBidSBZMQ01KikM2HZ+XwphMZQEsKcsh5zJQTTk/UOhQgUPADNkqoHlT3KK3rVaKEIggJRMA0VKFMahCgpaUBa+iA5RIwIJJ0Q1ooVhO2oodLA7eWqH8gxqgBVCuxXqHyUqZWMGgA=")
      format("woff2"),
    url("//at.alicdn.com/t/font_2434936_h1orv7ic88t.woff?t=1616336275189")
      format("woff"),
    url("//at.alicdn.com/t/font_2434936_h1orv7ic88t.ttf?t=1616336275189")
      format("truetype"),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
      url("//at.alicdn.com/t/font_2434936_h1orv7ic88t.svg?t=1616336275189#iconfont")
      format("svg"); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@keyframes change {
  0% {
    color: rgb(255, 0, 0);
    text-shadow: 0 0 5px rgb(255, 0, 0), 0 0 10px rgb(255, 0, 0),
      0 0 15px rgb(255, 0, 0);
  }
  10% {
    color: rgb(255, 187, 0);
    text-shadow: 0 0 5px rgb(255, 187, 0), 0 0 10px rgb(255, 187, 0),
      0 0 15px rgb(255, 187, 0);
  }
  20% {
    color: rgb(72, 255, 0);
    text-shadow: 0 0 5px rgb(72, 255, 0), 0 0 10px rgb(72, 255, 0),
      0 0 15px rgb(72, 255, 0);
  }
  30% {
    color: rgb(0, 162, 255);
    text-shadow: 0 0 5px rgb(0, 162, 255), 0 0 10px rgb(0, 162, 255),
      0 0 25px rgb(0, 162, 255);
  }
  40% {
    color: rgb(0, 60, 255);
    text-shadow: 0 0 5px rgb(0, 60, 255), 0 0 10px rgb(0, 60, 255),
      0 0 15px rgb(0, 60, 255);
  }
  50% {
    color: rgb(0, 60, 255);
    text-shadow: 0 0 5px rgb(0, 60, 255), 0 0 10px rgb(0, 60, 255),
      0 0 15px rgb(0, 60, 255);
  }
  60% {
    color: rgb(183, 0, 255);
    text-shadow: 0 0 5px rgb(183, 0, 255), 0 0 15px rgb(183, 0, 255),
      0 0 15px rgb(183, 0, 255);
  }
  70% {
    color: rgb(0, 255, 213);
    text-shadow: 0 0 5px rgb(0, 255, 213), 0 0 15px rgb(0, 255, 213),
      0 0 25px rgb(0, 255, 213);
  }
  80% {
    color: rgb(0, 26, 255);
    text-shadow: 0 0 5px rgb(0, 26, 255), 0 0 10px rgb(0, 26, 255),
      0 0 15px rgb(0, 26, 255);
  }
  90% {
    color: rgb(212, 0, 255);
    text-shadow: 0 0 5px rgb(212, 0, 255), 0 0 10px rgb(212, 0, 255),
      0 0 15px rgb(212, 0, 255);
  }
  100% {
    color: rgb(255, 0, 0);
    text-shadow: 0 0 5px rgb(255, 0, 0), 0 0 10px rgb(255, 0, 0),
      0 0 15px rgb(255, 0, 0);
  }
}
.icon-pinlun:before {
  content: "\e61e";
  animation: change 5s linear 0s infinite;
  font-size: larger;
}
</style>
