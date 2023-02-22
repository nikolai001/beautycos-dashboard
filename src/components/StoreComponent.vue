<template>
	<div class="store-card" :class="{'store-card--active':alarmActive}" @click="toggleAlarm()">
        <div class="store-card__sonar store-card__sonar" :class="{'store-card__sonar--active':alarmActive}"></div>
		<p class="store-card__name">{{name}}</p>
        <p v-if="!alarmIsActive || !alarmActive" class="store-card__alarm-status">Ingen aktiv alarm</p>
        <p v-else class="store-card__alarm-status">Aktiv alarm</p>
	</div>
</template>

<script>
export default {
	name: "StoreComponent",

    props : {
        name: String,
        lastAlarm: String,
        utc: String
    },

    data () {
        return{
            alarmActive: false,
        }
    },
    
    methods: {
        
        toggleAlarm() {
            this.alarmActive = false
        }
    },
    computed : {
        alarmIsActive() {
            if (new Date(this.lastAlarm).valueOf() >= (new Date(this.utc).valueOf() - 15 * 60 * 1000)) {
                this.alarmActive = true
                return true
            }else {
                this.alarmActive = false
                return false
            };
        },
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/colors";

.store-card {
    border-radius: 12px;
    background-color: $primary-black;
    margin: 12px 0;
    width: 80%;
    display: flex;
    flex-direction: column;
    font-family: "Roboto" ;
    border-left: 4px $indicator-green solid;
    max-width: 350px;

    .store-card__name {
        text-align: center;
        align-self: center;
        font-weight: 500;
        margin: 12px 0 0 0;
    }

    .store-card__alarm-status {
        text-align: center;
        align-self: center;
        font-weight: 700;
        justify-self: center;
        margin: 45px 0 41px 0;
    }

    .store-card__sonar {
        height: 17px;
        width: 17px;
        border-radius: 100em;
        align-self: flex-end;
        margin: 12px 12px 0 0;
        background-color: $indicator-green;
    }

    .store-card__sonar--active {
        background-color: $indicator-red;        
        background-color: $indicator-red;
        animation: sonar-effect 1s ease-in-out 0.2s infinite;
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
        animation: sonar-effect 1s ease-in-out 0.2s infinite;
    }
    &--active {
        border-left: 4px $indicator-red solid;
        animation: persistent-slide 1s ease-in-out 0.2s infinite;
    }
}

@keyframes sonar-effect {
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
		transform: scale(.5);
		opacity: 0;
	}
}

@keyframes persistent-slide {
    0% {
        border-left: 0px $indicator-red solid;
    }

    50% {
        border-left: 10px $indicator-red solid;
    }

    100% {
        border-left: 0px $indicator-red solid;
    }
}
</style>