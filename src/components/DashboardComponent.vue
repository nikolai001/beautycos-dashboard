<template>
	<div class="dashboard">
		<StoreComponent v-for="store in locations" :key="store.uuid" :name="store.name" :lastAlarm="store.lastAlarm" :utc="currentUtc"/>
	</div>
</template>

<script>

import StoreComponent from '@/components/StoreComponent.vue';

export default {
	name: "DashboardComponent",

	components : {
		StoreComponent
	},

	data() {
		return {
			locations: [],
      		currentUtc: '',
    		longPullData: {
				data: [],
				loading: false
			},
		};
	},

	mounted() {
		this.fetchLocation()
		this.longPull()
		this.fetchUtc()
	
    	this.interval = setInterval(function () {
      		this.fetchUtc()
    	}.bind(this), 60000 * 15); 
	},

  methods : {
    async fetchLocation() {
      await fetch("http://localhost:3000/Location/GetLocations", {
			method: "GET",
			headers: {
				cors: "cors",
				XApiKey: "b0shazG1DpzXOpFRq9TTHHkKZOMSosUV0Jeqnly3",
				Accept: "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => (this.locations = data));
    },

    async fetchUtc() {
      await fetch("http://localhost:3000/Location/GetUtcNow", {
			method: "GET",
			headers: {
				cors: "cors",
				XApiKey: "b0shazG1DpzXOpFRq9TTHHkKZOMSosUV0Jeqnly3",
				Accept: "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => this.currentUtc = data);
    },

    async longPull() {
		while(!this.longPullData.loading){
			this.longPullData.loading = true
			await fetch("http://localhost:3000/Location/LongPull", {
			method: "POST",
			headers: {
			cors: "cors",
			XApiKey: "b0shazG1DpzXOpFRq9TTHHkKZOMSosUV0Jeqnly3",
			Accept: "application/json",
				},
			body: {
			'last_pull': this.currentUtc
			}
		})
			.then((response) => response.json())
			.then((data) => 
				this.locations.forEach(element => {
				const matchingData = (data.locations.find(fetchedLocation => fetchedLocation.uuid === element.uuid))
				if (matchingData) {
					element.lastAlarm = matchingData.lastAlarm
				}
			}))
			.then(this.longPullData.loading = false);
		}
	}
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/colors";

.dashboard {
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	color: $primary-white;
	justify-items: center;
}
</style>