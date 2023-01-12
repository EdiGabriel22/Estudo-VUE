<template>
	<div
		class="modal"
		:class="{ 'is-active': tarefaSelecionada }"
		v-if="tarefaSelecionada"
	>
		<div class="modal-background"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">Editando uma tarefa</p>
				<button
					@click="fecharModal"
					class="delete"
					aria-label="close"
				></button>
			</header>
			<section class="modal-card-body">
				<div class="field">
					<label for="descricaoDaTarefa" class="label">
						Descrição
					</label>
					<input
						type="text"
						class="input"
						v-model="tarefaSelecionada.descricao"
						id="descricaoDaTarefa"
					/>
				</div>
			</section>
			<footer class="modal-card-foot">
				<button @click="alterarTarefa" class="button is-success">
					Salvar alterações
				</button>
				<button @click="fecharModal" class="button">
					Cancelar
				</button>
			</footer>
		</div>
	</div>
</template>

<script lang="ts">

import { DefineComponent } from 'vue';

export default DefineComponent

</script>
