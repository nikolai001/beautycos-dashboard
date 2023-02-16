<template>
	<!-- <div class="backdrop"/> -->
	<div class="dashboard">
		<div class="dashboard__grid">
			<div class="grid__cell" v-for="store in apiTemp" :key="store.uuid">
				<p class="cell__name">{{ store.name }}</p>
				<p v-if="store.lastAlarm" class="cell__alarm-status">
					Alarm aktiv!
				</p>
				<p v-else class="cell__alarm-status">Ingen alarm</p>


				<div v-if="store.lastAlarm" class="cell__sonar cell__sonar--active">
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
			apiTemp: [],
		};
	},

	async mounted() {
		await fetch("http://localhost:3000/Location/GetLocations", {
			method: "GET",
			headers: {
				cors: "cors",
				XApiKey: "b0shazG1DpzXOpFRq9TTHHkKZOMSosUV0Jeqnly3",
				Accept: "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => (this.apiTemp = data));
	},
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
      // align-content: center;
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