<template>
  <div class="xk-footer">
    Powered by
    <a :href="warehouse" target="_blank">{{ name }}</a>
    v{{ version }}
  </div>
</template>

<script>
import { version, name, warehouse } from "../../../package.json";

export default {
  data() {
    return {
      version,
      name,
      warehouse,
    };
  },
};
</script>

<style scoped>
.xk-footer {
  width: 100%;
  text-align: end;
  font-size: 0.75em;
  color: #999999;
  margin-top: 1em;
}
</style>