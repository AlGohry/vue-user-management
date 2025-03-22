  <template>
    <div id="app">
      <!-- Add transition effect to the router-view -->
      <transition name="fade-slide" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </template>

<script>
export default {
  name: 'App'
};
</script>
