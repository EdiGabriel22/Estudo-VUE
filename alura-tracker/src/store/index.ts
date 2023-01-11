import { EstadoProjeto, projeto } from './modulos/projeto';
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from "vuex";

import {  OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from './tipo-acoes';
import {  ALTERA_PROJETO, NOTIFICAR, DEFINIR_TAREFAS, ADICIONA_TAREFA, ALTERA_TAREFA } from "./tipo-mutacoes";

import { INotificacao } from "@/interfaces/INotificacao";
import ITarefa from '@/interfaces/ITarefa';

import http from "@/http"
export interface Estado {
    tarefas: ITarefa[],
    notificacoes: INotificacao[]
    projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        tarefas: [],
        notificacoes: [],
        projeto:{
            projetos: []
        },
    },
    mutations: {
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [ALTERA_PROJETO](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(t => t.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
        [NOTIFICAR] (state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        },
    },
    actions: {
        [OBTER_TAREFAS] ({ commit }) {
            http.get('tarefas')
                .then(response => commit( DEFINIR_TAREFAS, response.data))
        },
        [CADASTRAR_TAREFA] ({commit}, tarefa: ITarefa) {
            return http.post('/tarefa', tarefa)
                .then(response => commit(ADICIONA_TAREFA, response.data))
        },
        [ALTERAR_TAREFA] ({commit}, tarefa: ITarefa) {
            return http.put(`/projetos/${tarefa.id}`, tarefa )
            .then(() => commit(ALTERA_TAREFA, tarefa))

        },
    },
    modules: {
        projeto
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}