<template>
<div id="app">
       
   <b-card-group deck>
  
        <b-card bg-variant="dark" style="height: 600px; width: 250px;">
            <Pareto></Pareto>
      </b-card>

        <b-card bg-variant="dark" style="height: 600px; width: 500px;">
          <Bubble> </Bubble>    
        </b-card>

      <b-card bg-variant="dark" style="height: 600px; width: 250px;">
     <Gauge> </Gauge>    
   </b-card>


   </b-card-group>
  </div>
  
</template>

<script>
  

 import Pareto from './Pareto'
 import Bubble from './Bubble'
 import Gauge from './Gauge'
 

export default {
   
  components: {
    // VueHighcharts,
    Pareto,
    Bubble,
    Gauge,


  },
 

  
}
</script>

<style>

</style>