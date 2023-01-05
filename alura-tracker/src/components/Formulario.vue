<template>
	<div class="box formulario">
		<div class="columns">
			<div
				class="column is-8"
				role="form"
				aria-label="Formulário para criação de uma nova tarefa">
				<input
					type="text"
					class="input"
					placeholder="Qual tarefa você deseja iniciar?"
                    v-model="descricao"
                />
			</div>
			<div class="column">
                <TemporizadorVue @ao-temporizador-finalizado="finalizarTarefa" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import TemporizadorVue from './Temporizador.vue';

export default defineComponent({
	name: 'Formulario',
    emits: ['aoSalvarTarefa'],
    components: {
        TemporizadorVue
    },
    data() {
        return {
            descricao: ''
        }
    },
    methods: {
        finalizarTarefa(tempoDecorrido: number) : void {
            this.$emit('aoSalvarTarefa',{
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao
            })
            this.descricao = ''
        }
    }
});
</script>

<style>
.formulario{
    color: var(--text-primary);
    background-color: var(--bg-primary);
}
</style>

