<template>
    <v-container class="mt-5 pt-5">
        <v-card outlined>
            <v-card-title>
                Role list
                <v-divider vertical class="mx-3" />
                <v-btn
                    depressed small rounded
                    class="mr-1"
                    color="blue lighten-5"
                    :to="{name: 'user.roles.create'}">
                    <v-icon left color="blue darken-1">add_circle_outline</v-icon>
                    <span class="blue--text text--darken-1">Add</span>
                </v-btn>
                <v-btn icon small
                    color="blue darken-1"
                    @click="refreshAction">
                    <v-icon>refresh</v-icon>
                </v-btn>
                <v-btn icon small
                    v-if="dtSelected.length > 0"
                    color="error darken-1"
                    @click="removeMultiAction">
                    <v-icon>delete_outline</v-icon>
                </v-btn>
                <v-spacer />
                <v-text-field 
                    outlined dense hide-details
                    placeholder="Search"
                    v-model="searchText"
                />
            </v-card-title>
            <v-data-table
                multi-sort show-select
                sort-by="name"
                v-model="dtSelected"
                :sort-desc="false"
                :loading="loading"
                :headers="dtHeaders"
                :options.sync="dtOptions"
                :server-items-length="dtTotalItem"
                :items="dtItems">
                <template v-slot:item.id="{ item }">
                    <v-menu>
                        <template v-slot:activator="{ on }">
                            <v-btn icon small
                                color="primary"
                                v-on="on">
                                <v-icon>more_horiz</v-icon>
                            </v-btn>
                        </template>
                        <v-list dense subheader>
                            <v-subheader>Actions</v-subheader>
                            <v-list-item
                                :to="{
                                    name: 'user.roles.edit', 
                                    params: {id: item.id}
                                }">
                                <v-list-item-icon class="mr-3">
                                    <v-icon style="opacity:.8">edit</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title class="font-weight-regular">Edit</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item @click="removeAction(item)">
                                <v-list-item-icon class="mr-3">
                                    <v-icon style="opacity:.8">delete_outline</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title class="font-weight-regular">Remove</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </template>
                <template v-slot:item.name="{ item }">
                    <v-list-item dense 
                        class="px-0">
                        <v-list-item-icon class="mr-2">
                            <v-icon>supervised_user_circle</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
                <template v-slot:item.updated_at="{ item }">
                    <span>{{ item.updated_at ? $moment(item.updated_at).format('D/MM/YYYY HH:mm:ss') : '--' }}</span>
                </template>
            </v-data-table>
        </v-card>

        <router-view />
    </v-container>
</template>

<script>
import { dtFetchRows } from '../../utils/helpers'
export default {
    name: 'RoleIndexPage',
    data() {
        return {
            loading: false,
            dtHeaders: [
                {value: 'id', text: '#', width: 40, sortable: false, align: 'center'},
                {value: 'name', text: 'Name'},
                {value: 'guard_name', text: 'Guard name'},
                {value: 'updated_at', text: 'Updated At', width: 160},
            ],
            dtOptions: {},
            dtItems: [],
            dtTotalItem: 0,
            dtSelected: [],
            searchText: '',
        }
    },
    watch: {
        $route: function (route) {
            if (route.params.refresh) {
                this.refreshAction();
            }
        },
        dtOptions() {
            this.refreshAction()
        },
        searchText() {
            this.refreshAction()
        }
    },
    methods: {
        refreshAction() {
            this.loading = true
            dtFetchRows('/api/user/roles', this.dtHeaders, this.dtOptions, this.searchText)
                .then(data => {
                    this.dtItems = data.items
                    this.dtTotalItem = data.total
                }).catch(error => {
                    this.$coresnackbars.error(
                        error.data.message
                            ? error.data.message
                            : error.status + ' - ' + error.searchText
                    )
                }).then(() => {
                    this.loading = false
                })
        },
        removeAction(item) {
            if (this.loading) {
                return false
            }
            this.removePost([item.id])
        },
        removeMultiAction() {
            if (this.loading) {
                return false
            }
            if (this.dtSelected.length <= 0) {
                return false
            }
            
            let ids = []
            this.dtSelected.forEach(selected => {
                ids.push(selected.id)
            })

            this.removePost(ids)
        },
        removePost(keys = []) {
            const that = this
            const message = 'Data cannot be restored, Are you really sure?'
            const ids = keys.join(',')
            that.$root.confirmDelete(message).then(response => {
                that.loading = true
                that.$http.delete('/api/user/roles/' + ids).then(response => {
                    const {data} = response
                    that.$coresnackbars.success(data.message)
                    this.dtSelected = []
                    that.refreshAction()
                }).catch(function (error) {
                    const { data } = error
                    if (data.message) {
                        this.$coresnackbars.error(data.message)
                    }
                }).then(() => {
                    that.loading = false
                })
            })
        }
    }
}
</script>