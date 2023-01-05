<template>
	<section
		class="is-flex is-align-items-center is-justify-content-space-between">
		<CronometroVue :tempoEmSegundos="tempoEmSegundos" />
		<BotaoVue
			@clicado="iniciar"
			icone="fas fa-play"
			texto="play"
			:desabilitado="cronometroRodando" />
		<BotaoVue
			@clicado="finalizar"
			icone="fas fa-stop"
			texto="stop"
			:desabilitado="!cronometroRodando" />
	</section>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import CronometroVue from './Cronometro.vue';
	import BotaoVue from './Botao.vue';

	export default defineComponent({
		name: 'Temporizador',
		emits: ['aoTemporizadorFinalizado'],
		components: {
			CronometroVue,
			BotaoVue,
		},
		data() {
			return {
				tempoEmSegundos: 0,
				cronometro: 0,
				cronometroRodando: false,
			};
		},
		methods: {
			// começar contagem
			// 1seg = 1000ms
			iniciar() {
				this.cronometroRodando = true;
				this.cronometro = setInterval(() => {
					this.tempoEmSegundos += 1;
				}, 1000);
			},
			finalizar() {
				this.cronometroRodando = false;
				clearInterval(this.cronometro);
				this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos);
				this.tempoEmSegundos = 0;
			},
		},
	});
</script>
