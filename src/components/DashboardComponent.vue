<template>
	<div class="dashboard">
		<StoreComponent v-for="store in locations" :key="store.uuid" :status="false" :name="store.name"/>
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
				loading: true
			},
		};
	},

	mounted() {
    this.fetchLocation()
    this.fetchUtc()
	this.longPullData.loading = false
	
    this.interval = setInterval(function () {
      this.fetchLocation()
      this.fetchUtc()
    }.bind(this), 30000); 

	this.longPull()
	
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
			.then((data) => this.longPullData = data)
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