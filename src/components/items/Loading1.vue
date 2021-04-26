<template>
    <div class="wrapper">
  <div class="balls-guruguru">
    <span class="ball ball-1" :style="styles"></span>
    <span class="ball ball-2" :style="styles"></span>
    <span class="ball ball-3" :style="styles"></span>
    <span class="ball ball-4" :style="styles"></span>
    <span class="ball ball-5" :style="styles"></span>
    <span class="ball ball-6" :style="styles"></span>
    <span class="ball ball-7" :style="styles"></span>
    <span class="ball ball-8" :style="styles"></span>
  </div>
</div>
</template>

<script>
export default {
  props: {
    color: {},
  }, 
  computed: {
    styles () {
      return {
        '--color': this.color
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  height: 100%;
  position: relative;
}
.balls-guruguru {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background-color:transparent;
}
.ball {
  --color: white;
  width: 50%;
  height: 20px;
  position: absolute;
  top: calc(50% - 10px);
  transform-origin: 100% 50%;
  left: 0;
}
.ball::before {
  content: '';
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--color);
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.ball-1::before {
  animation: ball-guruguru 1s linear 0s infinite;
}
.ball-2 {
  transform: rotate(45deg);
}
.ball-2::before {
  animation: ball-guruguru 1s linear -0.125s infinite;
}
.ball-3 {
  transform: rotate(90deg);
}
.ball-3::before {
  animation: ball-guruguru 1s linear -0.25s infinite;
}
.ball-4 {
  transform: rotate(135deg);
}
.ball-4::before {
  animation: ball-guruguru 1s linear -0.375s infinite;
}
.ball-5 {
  transform: rotate(180deg);
}
.ball-5::before {
  animation: ball-guruguru 1s linear -0.5s infinite;
}
.ball-6 {
  transform: rotate(225deg);
}
.ball-6::before {
  animation: ball-guruguru 1s linear -0.625s infinite;
}
.ball-7 {
  transform: rotate(270deg);
}
.ball-7::before {
  animation: ball-guruguru 1s linear -0.75s infinite;
}
.ball-8 {
  transform: rotate(315deg);
}
.ball-8::before {
  animation: ball-guruguru 1s linear -0.875s infinite;
}
@keyframes ball-guruguru {
  0% {
    width: 20px;
    height: 20px;
    opacity: 1;
  }
  100% {
    width: 6px;
    height: 6px;
    opacity: .2;
    margin-left: 7px;
  }
}
</style>