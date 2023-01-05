<template>
	<BoxVue>
		<div class="columns">
			<div class="column is-7">
				{{ tarefa.descricao || 'Tarefa sem descrição' }}
			</div>
			<div class="column">
				<cronometro-vue :tempoEmSegundos="tarefa.duracaoEmSegundos" />
			</div>
		</div>
	</BoxVue>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue';

	import CronometroVue from './Cronometro.vue';
	import BoxVue from './Box.vue';
	import ITarefa from '../interfaces/ITarefa';

	export default defineComponent({
		name: 'Tarefa',
		components: {
			CronometroVue,
			BoxVue,
		},
		props: {
			tarefa: {
				type: Object as PropType<ITarefa>,
				required: true,
			},
		},
	});
</script>

<style scoped>
	.box {
		background: #faf0ca;
	}
</style>
