<template>
	<div class="dashboard">
		<div class="dashboard__grid">
			<div class="grid__cell" v-for="store in locations" :key="store.uuid">
				<p class="cell__name">{{ store.name }}</p>
				<p v-if="(new Date(store.lastAlarm).valueOf()) >= (new Date(currentUtc).valueOf() - 10 * 60 * 1000)" class="cell__alarm-status">
					Alarm aktiv!
				</p>
				<p v-else class="cell__alarm-status">Ingen alarm</p>
				<div v-if="(new Date(store.lastAlarm).valueOf()) >= (new Date(currentUtc).valueOf() - 10 * 60 * 1000)" class="cell__sonar cell__sonar--active">
					<div class="sonar__sonarr sonar__sonarr--active" />
				</div>

				<div v-else class="cell__sonar cell__sonar--inactive">
					<div class="sonar__sonarr sonar__sonarr--inactive" />
				</div>

			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "DashboardComponent",

	data() {
		return {
			locations: [],
      currentUtc: '',
      longPullData: [],
		};
	},

	mounted() {
    this.fetchLocation()
    this.fetchUtc()
    this.interval = setInterval(function () {
      this.fetchLocation()
      this.fetchUtc()
    }.bind(this), 30000); 

    this.interval = setInterval(function () {
      this.longPull()
    }.bind(this), 60000*5); 
	},

  watch: {
    longPullData: {
      handler(newData) {
        this.locations.forEach(element => {
          const matchingData = (newData.locations.find(fetchedLocation => fetchedLocation.uuid === element.uuid))
          if (matchingData){
            element.lastAlarm = matchingData.lastAlarm
          }
        })
      },
      deep: true
    },

    locations: {
      handler(data) {
          data.sort((a, b) => {
            if (a.lastAlarm === null && b.lastAlarm === null) {
              return 0;
            } else if (a.lastAlarm === null) {
              return 1;
            } else if (b.lastAlarm === null) {
              return -1;
            } else {
              return new Date(b.lastAlarm) - new Date(a.lastAlarm);
            }
          });
      },
      deep:true
    }
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
        .then((data) => this.longPullData = data);
    }
  }

};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/colors";

.dashboard {
	width: 80%;
	max-width: 875px;
	color: $primary-white;
	overflow-y: scroll;
	overflow-x: hidden;
	height: 80%;
	border-radius: 12px;
	background-color: $black-shadow;
	overflow: visible;
	position: absolute;
	z-index: 2;

	&__grid {
		height: 100%;
		width: 100%;
		position: absolute;
		border-radius: 12px;
		background-color: $primary-black;
		transform: translateX(12px) translateY(12px);
		display: grid;
		grid-template-columns: 1fr;
		overflow: scroll;
		.grid__cell {
			display: grid;
			grid-template-columns: 1fr 1fr 0.3fr;
			font-family: "Roboto";
			font-size: 18px;
      align-items: center;
      padding:15px 0;

			.cell__name {
				font-weight: 500;
        padding-left: 15%;
			}

			.cell__alarm-status {
				font-weight: 700;
        justify-self: center;
			}

			.cell__sonar {
				height: 25px;
				width: 25px;
				border-radius: 100em;
			}

			.cell__sonar--active {
				background-color: $indicator-red;
			}
			.cell__sonar--inactive {
				background-color: $indicator-green;
			}

			.sonar__sonarr {
				height: 25px;
				width: 25px;
				border-radius: 100em;
				position: relative;
				top: 0;
				bottom: 0;
			}
			.sonar__sonarr--active {
				background-color: $indicator-red;
				animation: sonar-effect--active 1s ease-in-out 0.2s infinite;
			}

			.sonar__sonarr--inactive {
				background-color: $indicator-green;
				animation: sonar-effect--inactive 1s ease-in-out 0.2s infinite;
			}

			&:nth-child(even) {
				background-color: $secondary-black;
			}
		}
	}
}

@keyframes sonar-effect--inactive {
	0% {
		opacity: 0.3;
	}
	40% {
		opacity: 0.5;
		box-shadow: 0 0 0 5px $indicator-green, 0 0 10px 10px $indicator-green,
			0 0 0 10px $indicator-green;
	}
	100% {
		box-shadow: 0 0 0 5px $indicator-green, 0 0 10px 10px $indicator-green,
			0 0 0 10px $indicator-green;
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
		box-shadow: 0 0 0 5px $indicator-red, 0 0 10px 10px $indicator-red,
			0 0 0 10px $indicator-red;
	}
	100% {
		box-shadow: 0 0 0 5px $indicator-red, 0 0 10px 10px $indicator-red,
			0 0 0 10px $indicator-red;
		transform: scale(1.2);
		opacity: 0;
	}
}
</style>