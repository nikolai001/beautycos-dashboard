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
    
    await fetch('https://alarm-dev.beautycos.dk/Api/Location/GetLocations',{
      method: 'GET',
      mode:'cors',
      headers: {
        'XApiKey': 'b0shazG1DpzXOpFRq9TTHHkKZOMSosUV0Jeqnly3',
        'Accept': 'application/json',
    }})
    // }
    .then(response => response.json())
    .then(data => this.apiTemp = data)
  }}
</script>
