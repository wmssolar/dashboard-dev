<template>
  <div class="content">
    <FadeTransition :duration="200" mode="out-in">
      <!-- your content here -->
      <router-view></router-view>
    </FadeTransition>
  </div>
</template>
<script>
import { FadeTransition } from 'vue2-transitions';
export default {
  components: {
    FadeTransition
  }
};
</script>
<style>
.bg {
  background-position: center;
  background-color: #57595d;
  background-size: cover;
}
</style>
