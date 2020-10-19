<template>
<div id="app">
       
   <b-card-group deck>
    <b-card bg-variant="dark" style="height: 500px; width: 200px;">
     <Pareto> </Pareto>    
   </b-card>

  <b-card bg-variant="dark" style="height: 500px; width: 200px;">
     <Bubble> </Bubble>    
   </b-card>

     <b-card bg-variant="dark" style="height: 500px; width: 200px;">
     <Gantt> </Gantt>      
   </b-card>

     <!-- <b-card bg-variant="dark" style="height: 500px; width: 200px;">
    <Networkgraph></Networkgraph>     
   </b-card> -->
   </b-card-group>
  </div>
  
</template>

<script>
  
 
 
 import Pareto from './Pareto'
 import Bubble from './Bubble'
import Gantt from './Gantt'
// import Networkgraph from './Networkgraph'
 
export default {
   
  components: {
 
    Pareto,
    Bubble,
    Gantt,
    // Networkgraph


  },
  
}
</script>

<style>

</style>