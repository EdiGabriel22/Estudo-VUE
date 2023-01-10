<template>
	<Formulario @aoSalvarTarefa="salvarTarefa" />
	<div class="lista">
		<Box v-if="semTarefas">
			<span class="has-text-weight-bold"
				>Você não está muito produtivo hoje:(</span
			>
		</Box>
		<Tarefa
			v-for="(tarefa, index) in tarefas"
			:tarefa="tarefa"
			:key="index"
			@aoTarefaClicada="selecionarTarefa"
		/>
		<div class="modal" :class="{'is-active': tarefaSelecionada}" v-if="tarefaSelecionada">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Editando uma tarefa</p>
					<button
						class="delete"
						aria-label="close"
						@click="fecharModal"
					></button>
				</header>
				<section class="modal-card-body">
					<div class="field">
						<label for="tarefaSelecionada" class="label">
							Descrição
						</label>
						<input
							type="text"
							class="input"
							v-model="tarefaSelecionada.descricao"
							id="nomeDoProjet"
						/>
					</div>
				</section>
				<footer class="modal-card-foot">
					<button class="button is-success">Salvar alterações</button>
					<button class="button" @click="fecharModal">
						Cancelar
					</button>
				</footer>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {defineComponent, computed} from "vue"
import Formulario from "../components/Formulario.vue"
import Tarefa from "../components/Tarefa.vue"
import Box from "../components/Box.vue"
import {useStore} from "@/store"
import {
	CADASTRAR_TAREFA,
	OBTER_TAREFAS,
	OBTER_PROJETOS,
} from "@/store/tipo-acoes"
import ITarefa from "@/interfaces/ITarefa"

export default defineComponent({
	name: "App",
	components: {
		Formulario,
		Tarefa,
		Box,
	},
	data() {
		return {
			tarefaSelecionada: null as ITarefa | null,
		}
	},
	methods: {
		salvarTarefa(tarefa: ITarefa): void {
			this.store.dispatch(CADASTRAR_TAREFA, tarefa)
		},
		selecionarTarefa(tarefa: ITarefa) {
			this.tarefaSelecionada = tarefa
		},
		fecharModal() {
			this.tarefaSelecionada = null
		},
	},
	computed: {
		semTarefas(): boolean {
			return this.tarefas.length == 0
		},
	},
	setup() {
		const store = useStore()
		store.dispatch(OBTER_TAREFAS)
		store.dispatch(OBTER_PROJETOS)
		return {
			tarefas: computed(() => store.state.tarefas),
			store,
		}
	},
})
</script>
