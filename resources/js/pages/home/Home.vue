<template>
    <v-container class="pt-5">
        <v-alert 
            text
            color="primary"
            class="text-center font-weight-bold">
            Welcome to starter7
        </v-alert>

        <div class="px-5">
            <v-btn @click="deleteAction">
                Confirm Delete
            </v-btn>
            <v-btn @click="confirmAction">
                Confirm Default
            </v-btn>
        </div>
    </v-container>
</template>

<script>
export default {
    name: 'HomePage',
    methods: {
        deleteAction() {
            this.$root.confirmDelete("You won't be able to revert this!").then(response => {
                
            })
        },
        confirmAction() {
            this.$root.confirm("You won't be able to revert this!").then(response => {
                
            })
        }
    }
}
</script>