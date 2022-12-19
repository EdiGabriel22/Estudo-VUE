<template>
    <div class=" max-h-max">
        <div class="container pt-4 mx-auto row">
            <h3 class="text-xl font-semibold text-center text-teal-500">To do List</h3>
            <input
                @keyup.enter="addNewItemToList"
                class="h-12 mx-auto my-5 border-2 rounded-lg md:col-4 bg-slate-200 border-slate-500"
                type="text"
            >
            <ul>
                <li
                    class="flex justify-between p-3 mx-auto text-center rounded-lg md:col-5 even:bg-gray-100"
                    v-for="(item, index) in list"
                    :key="index"
                >
                    <div>
                        <input
                            :id="index"
                            @click="updateLocalStorage()"
                            type="checkbox"
                            v-model="item.checked"
                        >
                            <label
                                :for="index"
                                :class="{
                                    'line-through' : item.checked
                                }"
                            >
                                {{ item.label }}
                            </label>
                    </div>
                    <span 
                        @click="deleteItem(index)"
                        class="font-bold text-red-500 cursor-pointer hover:text-red-800"
                    >
                        Excluir
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TodoList',
    data() {
        return {
            list: [

            ]
        }
    },
    created() {
        const itensInLocalStorage = JSON.parse(localStorage.getItem('list'));
        this.list = itensInLocalStorage ? itensInLocalStorage : [];
    },

    methods: {
        addNewItemToList(event) {
            const newItem = event.target.value;
            this.list.unshift({
                label: newItem, checked: false
            })
            this.updateLocalStorage();
            event.target.value = '';
        },
        deleteItem(index) {
            this.list.splice(index,1);
            this.updateLocalStorage()
        },
        updateLocalStorage() {
            localStorage.setItem('list', JSON.stringify(this.list));
        }
    },
}
</script>