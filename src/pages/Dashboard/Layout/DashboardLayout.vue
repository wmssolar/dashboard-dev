<template>
  <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}">
    <notifications></notifications>
    <side-bar>
      <template slot-scope="props" slot="links">
        <!-- <user-menu></user-menu> -->
        <sidebar-item :link="{name: 'Dashboard', icon: 'now-ui-icons design_app', path: '/dashboard'}">
        </sidebar-item>
     
   <sidebar-item :link="{name: 'Tables', icon: 'now-ui-icons design_bullet-list-67'}">
          <sidebar-item :link="{name: 'RegularTables', path: '/table-list/regular'}">
          </sidebar-item>
         </sidebar-item>

       
  

    <sidebar-item :link="{name: 'Charts', icon: 'now-ui-icons business_chart-pie-36'}">
      <sidebar-item :link="{name: 'Assorted', path: '/charts/assorted'}">
      </sidebar-item>
     </sidebar-item>

         <sidebar-item :link="{name: 'Kpis', icon: 'now-ui-icons business_briefcase-24', path: '/kpis'}">
           <sidebar-item :link="{name: 'Kpis', path: '/kpis'}">
          </sidebar-item>
          </sidebar-item>
      

   


        <!-- <sidebar-item :link="{name: 'Maps', icon: 'now-ui-icons location_pin'}">
         
          <sidebar-item :link="{name: 'Vector Maps', path: '/maps/vector-map'}"></sidebar-item>
        </sidebar-item> -->
        <!-- <sidebar-item
          :link="{name: 'Widgets', icon: 'now-ui-icons business_briefcase-24', path: '/widgets'}"></sidebar-item> -->
         
        <!-- <sidebar-item
          :link="{name: 'Calendar', icon: 'now-ui-icons media-1_album', path: '/calendar'}">
          </sidebar-item> -->

      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>
      <router-view name="header"></router-view>

      <div :class="{content: !$route.meta.hideContent}" @click="toggleSidebar">
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </zoom-center-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import TopNavbar from './TopNavbar.vue';
import ContentFooter from './ContentFooter.vue';
import DashboardContent from './Content.vue';
import MobileMenu from './Extra/MobileMenu.vue';
import UserMenu from './Extra/UserMenu.vue';
import { SlideYDownTransition, ZoomCenterTransition } from 'vue2-transitions';

export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
    UserMenu,
    SlideYDownTransition,
    ZoomCenterTransition
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  },
  mounted() {
    let docClasses = document.body.classList;
    let isWindows = navigator.platform.startsWith('Win');
    if (isWindows) {
      // if we are on windows OS we activate the perfectScrollbar function
      initScrollbar('sidebar');
      initScrollbar('sidebar-wrapper');

      docClasses.add('perfect-scrollbar-on');
    } else {
      docClasses.add('perfect-scrollbar-off');
    }
  }
};
</script>
<style lang="scss">
$scaleSize: 0.95;
.bg {
  background-position: center;
  background-color: #57595d;
  background-size: cover;
}
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}
.main-panel .zoomIn {
  animation-name: zoomIn95;

}
@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}
.main-panel .zoomOut {
  animation-name: zoomOut95;
}
</style>
