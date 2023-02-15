<template>
  <div class="dashboard">
    <p>hello there</p>
    {{apiTemp}}
  </div>
</template>

<script>
export default {
  name: 'DashboardComponent',

  data () {
    return {
      apiTemp: []
    }
  },

  async mounted () {
    
    await fetch('http://localhost:3000/Location/GetLocations',{
      method: 'GET',
      headers: {
        'cors':'cors',
        'XApiKey': 'b0shazG1DpzXOpFRq9TTHHkKZOMSosUV0Jeqnly3',
        'Accept': 'application/json',
    }})
    // }
    .then((response) => response.json())
    .then(data => this.apiTemp = data);
  }}
</script>
