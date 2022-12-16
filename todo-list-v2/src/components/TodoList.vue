<template>
    <div class="">
        <div class="container mx-auto row">
            <h3 class="text-xl font-semibold text-center text-teal-500">Todo List</h3>
            <input
                @keyup.enter="addNewItemToList"
                class="mx-auto border-2 rounded-lg md:col-4 bg-slate-200 border-slate-500" 
                type="text"
            >
            <ul>
                <li
                    class="text-center"
                    v-for="(item, index) in list" :key="index"
                >
                    <input type="checkbox" v-model="item.checked">
                    {{ item.label}}
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

            localStorage.setItem('list', JSON.stringify(this.list));
            event.target.value = '';
        }
    }
}
</script>