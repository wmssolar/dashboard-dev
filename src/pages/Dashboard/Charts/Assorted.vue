<template>
<div id="app">
       
   <b-card-group deck>
    <b-card bg-variant="dark" style="height: 500px; width: 200px;">
     <ThreeD> </ThreeD>    
   </b-card>

  <b-card bg-variant="dark" style="height: 500px; width: 200px;">
     <Bubble> </Bubble>    
   </b-card>

     <b-card bg-variant="dark" style="height: 500px; width: 200px;">
     <Gantt> </Gantt>      
   </b-card>
   </b-card-group>


  </div>
  
</template>

<script>
  
 
 
 import ThreeD from './ThreeD'
 import Bubble from './Bubble'
import Gantt from './Gantt'
 
export default {
   
  components: {
 
    ThreeD,
    Bubble,
    Gantt


  },
  
}
</script>

<style>

</style>