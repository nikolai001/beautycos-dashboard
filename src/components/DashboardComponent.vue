<template>
	<div class="dashboard">
		<StoreComponent v-for="store in locations" :key="store.uuid" :name="store.name" :lastAlarm="store.lastAlarm" :utc="currentUtc"/>
	</div>
</template>

<script>

import StoreComponent from '@/components/StoreComponent.vue';
import { fetchLocation, fetchUtc, fetchLong } from '@/functions';


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
		// this.fetchLocation()
		this.getLocation()
		this.longPull()
		this.getUtc()

    	this.interval = setInterval(function () {
      		this.getUtc()
    	}.bind(this), 60000 * 15); 
	},

  methods : {
	async getLocation () {
		const data = await fetchLocation();
		this.locations = data
	},

	async getUtc () {
		const data =  await fetchUtc()
		this.currentUtc = data
	},

    async longPull() {
		while(!this.longPullData.loading){
			this.longPullData.loading = true
				const data = await fetchLong(this.currentUtc)
				this.locations.forEach(element => {
					const matchingData = (data.locations.find(fetchedLocation => fetchedLocation.uuid === element.uuid))
					if (matchingData) {
						element.lastAlarm = matchingData.lastAlarm
					}
				})
				this.longPullData.loading = false
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