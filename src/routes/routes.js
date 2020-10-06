import DashboardLayout from 'src/pages/Dashboard/Layout/DashboardLayout.vue';
// Page Headers
import CalendarHeader from 'src/pages/Dashboard/Calendar/CalendarHeader';
const DashboardHeader = () => import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Dashboard/DashboardHeader.vue');
import DefaultHeader from 'src/pages/Dashboard/DefaultHeader';
import SweetAlertHeader from 'src/pages/Dashboard/Components/Headers/SweetAlertHeader';
import VectorMapsHeader from 'src/pages/Dashboard/Maps/VectorMapsHeader';

// Calendar
const Calendar = () =>
  import(/* webpackChunkName: "calendar" */ 'src/pages/Dashboard/Calendar/CalendarRoute.vue');
// Charts
// const Charts = () =>
//   import(/* webpackChunkName: "charts" */ 'src/pages/Dashboard/Charts.vue');
const Kpis = () =>
  import(/* webpackChunkName: "charts" */ 'src/pages/Dashboard/Kpis.vue');
// Components pages
const Buttons = () =>
  import(/* webpackChunkName: "components" */ 'src/pages/Dashboard/Components/Buttons.vue');
const GridSystem = () =>
  import(/* webpackChunkName: "components" */ 'src/pages/Dashboard/Components/GridSystem.vue');
const Panels = () =>
  import(/* webpackChunkName: "components" */ 'src/pages/Dashboard/Components/Panels.vue');
const SweetAlert = () =>
  import(/* webpackChunkName: "components" */ 'src/pages/Dashboard/Components/SweetAlert.vue');
const Notifications = () =>
  import(/* webpackChunkName: "components" */ 'src/pages/Dashboard/Components/Notifications.vue');
const Icons = () =>
  import(/* webpackChunkName: "components" */ 'src/pages/Dashboard/Components/Icons.vue');
const Typography = () =>
  import(/* webpackChunkName: "components" */ 'src/pages/Dashboard/Components/Typography.vue');

// Dashboard pages
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Dashboard/Dashboard.vue');
import Widgets from 'src/pages/Dashboard/Widgets.vue';
// import ParetoChart from 'src/pages/Dashboard/Charts/ParetoChart.vue';
// Forms pages

// Maps pages
const GoogleMaps = () =>
  import(/* webpackChunkName: "maps" */ 'src/pages/Dashboard/Maps/GoogleMaps.vue');
const FullScreenMap = () =>
  import(/* webpackChunkName: "maps" */ 'src/pages/Dashboard/Maps/FullScreenMap.vue');
const VectorMaps = () =>
  import(/* webpackChunkName: "maps" */ 'src/pages/Dashboard/Maps/VectorMaps.vue');




// TableList pages
const RegularTables = () =>
  import(/* webpackChunkName: "tables" */ 'src/pages/Dashboard/Tables/RegularTables.vue');

const ParetoChart = () =>
  import(/* webpackChunkName: "pareto" */ 'src/pages/Dashboard/Charts/Pareto.vue');


  let componentsMenu = {
  path: '/components',
  component: DashboardLayout,
  redirect: '/components/buttons',
  name: 'Components',
  children: [
    {
      path: 'buttons',
      name: 'Buttons',
      components: { default: Buttons, header: DefaultHeader }
    },
    {
      path: 'grid-system',
      name: 'Grid System',
      components: { default: GridSystem, header: DefaultHeader }
    },
    {
      path: 'panels',
      name: 'Panels',
      components: { default: Panels, header: DefaultHeader }
    },
    {
      path: 'sweet-alert',
      name: 'Sweet Alert',
      components: { default: SweetAlert, header: SweetAlertHeader }
    },
    {
      path: 'notifications',
      name: 'Notifications',
      components: { default: Notifications, header: DefaultHeader }
    },
    {
      path: 'icons',
      name: 'Icons',
      components: { default: Icons, header: DefaultHeader }
    },
    {
      path: 'typography',
      name: 'Typography',
      components: { default: Typography, header: DefaultHeader }
    }
  ]
};

let chartMenu = {
  path: '/charts',
  component: DashboardLayout,
  redirect: '/charts/pareto',
  name: 'Charts',
  children: [
    {
      path: 'pareto',
      name: 'Pareto Chart',
      components: { default: ParetoChart, header: DefaultHeader }
    },
 
  ]
};

let tablesMenu = {
  path: '/table-list',
  component: DashboardLayout,
  redirect: '/table-list/regular',
  name: 'Tables',
  children: [
    {
      path: 'regular',
      name: 'Regular Tables',
      components: { default: RegularTables, header: DefaultHeader }
    },
 
  ]
};

let mapsMenu = {
  path: '/maps',
  component: DashboardLayout,
  name: 'Maps',
  redirect: '/maps/google',
  children: [
    {
      path: 'google',
      name: 'Google Maps',
      components: { default: GoogleMaps, header: DefaultHeader }
    },
    {
      path: 'full-screen',
      name: 'Full Screen Map',
      meta: {
        hideContent: true,
        hideFooter: true
      },
      components: { default: FullScreenMap }
    },
    {
      path: 'vector-map',
      name: 'Vector Map',
      components: { default: VectorMaps, header: VectorMapsHeader }
    }
  ]
};



const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Home'
  },
  componentsMenu,
  tablesMenu,
  mapsMenu,
  chartMenu,
 
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        components: { default: Dashboard, header: DashboardHeader }
      },
      {
        path: 'calendar',
        name: 'Calendar',
        components: { default: Calendar, header: CalendarHeader }
      },
      // {
      //   path: 'charts',
      //   name: 'Charts',
      //   components: { default: Charts, header: DefaultHeader }
      // },
      {
        path: 'kpis',
        name: 'Kpis',
        components: { default: Kpis, header: DefaultHeader }
      },
      {
        path: 'widgets',
        name: 'Widgets',
        components: { default: Widgets, header: DefaultHeader }
      }
    ]
  },
  { path: '*'

}
];

export default routes;
