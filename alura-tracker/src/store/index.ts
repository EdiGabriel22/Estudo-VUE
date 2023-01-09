import { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import IProjeto from "@/interfaces/IProjeto";

import { OBTER_PROJETOS, CADASTRAR_PROJETOS, ALTERAR_PROJETOS, REMOVER_PROJETOS, OBTER_TAREFAS, CADASTRAR_TAREFAS } from './tipo-acoes';
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, NOTIFICAR, DEFINIR_PROJETOS, DEFINIR_TAREFAS } from "./tipo-mutacoes";

import { INotificacao } from "@/interfaces/INotificacao";
import http from "@/http"
import ITarefa from '@/interfaces/ITarefa';
interface Estado {
    projetos: IProjeto[],
    tarefas: ITarefa[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        tarefas: [],
        projetos: [],
        notificacoes: []
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos
        },
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [NOTIFICAR] (state, novaNotificacao: INotificacao) {

            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        }
    },
    actions: {
        [OBTER_PROJETOS] ({ commit }) {
            http.get('projetos')
                .then(resposta => commit( DEFINIR_PROJETOS, resposta.data))
        },
        [CADASTRAR_PROJETOS] (contexto, nomeDoProjeto: string) {
            return http.post('/projetos', {
                nome: nomeDoProjeto
            })
        },
        [ALTERAR_PROJETOS] (contexto, projeto: IProjeto) {
            return http.put(`/projetos/${projeto.id}`, projeto )
        },
        [REMOVER_PROJETOS] ({commit}, id: string) {
            return http.delete(`/projetos/${id}` )
                .then(() => commit(EXCLUIR_PROJETO, id))
        },
        [OBTER_TAREFAS] ({ commit }) {
            http.get('tarefas')
                .then(resposta => commit( DEFINIR_TAREFAS, resposta.data))
        },
        [CADASTRAR_TAREFAS] (contexto, nomeDoProjeto: string) {
            return http.post('/projetos', {
                nome: nomeDoProjeto
            })
        },
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}