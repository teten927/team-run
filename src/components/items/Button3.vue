<template>
  <button class="btn-circle-fishy">{{ label }}</button>
</template>

<script>
export default {
    props: {
        label: String,
    },
}
</script>

<style scoped>
.btn-circle-fishy {
  display: inline-block;
  text-decoration: none;
  color: #FFF;
  width: 120px;
  height: 120px;
  font-size: 26px;
  font-weight: bold;
  line-height: 120px;
  border-radius: 50%;
  text-align: center;
  overflow: hidden;
  background-image: linear-gradient(45deg, #709dff 0%, #91fdb7 100%);
  transition: .4s;
  cursor: pointer;
}

.btn-circle-fishy:hover {
  -webkit-transform: rotate(10deg);
  transform: rotate(10deg);
}

</style>