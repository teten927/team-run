<template>
    <button class="btn" :style="{width: width}"
        >{{label}}</button
      >
</template>

<script>
export default {
    props: {
        label: String,
        width: String,
    }
}
</script>

<style scoped>
.btn {
  position: relative;
  background-color: rgba(0,0,0,0.7);
  outline: solid 3px white;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  border: 2px solid #000;
  transition: all 0.3s;
  cursor: pointer;
  padding: 0 10px;
  line-height: 40px;
  height: 40px;
  text-decoration: none;
}

.btn:hover {
  background-color: #2c7cff;
  color: #fff;
  letter-spacing: 2px;
}
</style>