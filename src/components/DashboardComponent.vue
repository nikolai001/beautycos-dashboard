<template>
  <div class="dashboard">
    <table class="dashboard__table">
      <tr class="table__row" v-for="store in apiTemp" :key="store.uuid">
        <td class="row__cell row__name">
          {{store.name}}
        </td>
        <td class="row__cell" v-if="store.lastAlarm">
          AKTIV ALARM
        </td>
        <td class="row__cell" v-else>
          Ingen aktiv alarm
        </td>
        <td class="row__cell" v-if="store.lastAlarm">
          <div class="sonar sonar--active">
          <div class="sonarr sonarr--active">

          </div>
          </div>
        </td>
        <td class="row__cell" v-else>
          <div class="sonar sonar--inactive">
          <div class="sonarr sonarr--inactive">

          </div>
          </div>
        </td>
      </tr>
    </table>
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
    .then((response) => response.json())
    .then(data => this.apiTemp = data);
  }}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/colors';


  .dashboard {
    width: 80%;
    max-width: 875px;
    color: $primary-white;
    overflow-y: scroll;
    overflow-x: hidden;
    height:80%;
    border-radius: 12px ;
    background-color:$black-shadow;
    padding:12px 0 0 12px;
    font-family: 'Roboto';
    font-size: 18px;
    &__table {
      width: 100%;
      background-color:$primary-black;
      border-collapse: collapse;
      border-radius: 12px;
      
      .table__row:nth-child(even){
        background-color: $secondary-black;
      }

      .row__name {
        border-right: 2px solid $primary-black;
        font-weight: 700;
      }

      .row__cell {
        padding:35px 0;
        font-weight: 400;
      }

    }

    .sonar{
      height:25px;
      width:25px;
      border-radius: 100em;
    }

    .sonar--active {
      background-color: $indicator-red;
    }
    .sonar--inactive {
      background-color: $indicator-green;
    }

    .sonarr{
      height:25px;
      width:25px;
      border-radius: 100em; 
      position: relative;
      top:0;
      bottom:0;
    }
  .sonarr--active {
    background-color: $indicator-red;
    animation: sonar-effect--active 1s ease-in-out .2s infinite;
  }   
  
  .sonarr--inactive {
    background-color: $indicator-green;
    animation: sonar-effect--inactive 1s ease-in-out .2s infinite;
  }
}


    @keyframes sonar-effect--inactive {
      0% {
        opacity: 0.3;
      }
      40% {
        opacity: 0.5;
        box-shadow: 0 0 0 5px $indicator-green, 0 0 10px 10px $indicator-green, 0 0 0 10px $indicator-green;
      }
      100% {
        box-shadow: 0 0 0 5px $indicator-green, 0 0 10px 10px $indicator-green, 0 0 0 10px $indicator-green;
        transform: scale(1.2);
        opacity: 0;
      }
    }

    @keyframes sonar-effect--active {
      0% {
        opacity: 0.3;
      }
      40% {
        opacity: 0.5;
        box-shadow: 0 0 0 5px $indicator-red, 0 0 10px 10px $indicator-red, 0 0 0 10px $indicator-red;
      }
      100% {
        box-shadow: 0 0 0 5px $indicator-red, 0 0 10px 10px $indicator-red, 0 0 0 10px $indicator-red;
        transform: scale(1.2);
        opacity: 0;
      }
    }

</style>