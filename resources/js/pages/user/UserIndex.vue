<template>
    <v-container class="mt-5 pt-5">
        <v-card outlined>
            <v-card-title>
                {{ $t('user.users.heading_list') }}
                <v-divider vertical class="mx-3" />
                <v-btn
                    depressed small rounded
                    class="mr-1"
                    color="blue lighten-5"
                    :to="{name: 'user.users.create'}">
                    <v-icon left color="blue darken-1">add_circle_outline</v-icon>
                    <span class="blue--text text--darken-1">
                        {{ $t('words.btn_add') }}
                    </span>
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
                    :placeholder="$t('words.lb_search')"
                    prepend-inner-icon="search"
                    v-model="searchText"
                />
            </v-card-title>
            <v-data-table
                multi-sort show-select
                sort-by="username"
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
                            <v-subheader>
                                {{ $t('words.lb_actions') }}
                            </v-subheader>
                            <v-list-item
                                :to="{
                                    name: 'user.users.edit', 
                                    params: {id: item.id}
                                }">
                                <v-list-item-icon class="mr-3">
                                    <v-icon style="opacity:.8">edit</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title class="font-weight-regular">
                                        {{ $t('words.btn_edit') }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item @click="removeAction(item)">
                                <v-list-item-icon class="mr-3">
                                    <v-icon style="opacity:.8">delete_outline</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title class="font-weight-regular">
                                        {{ $t('words.btn_remove') }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </template>
                <template v-slot:item.username="{item}">
                    <router-link 
                        class="hover-underline"
                        :to="{
                            name: 'user.users.view',
                            params: {id: item.id}
                        }">
                        <span>{{ item.username }}</span>
                    </router-link>
                </template>
                <template v-slot:item.active="{ item }">
                    <v-checkbox 
                        hide-details dense readonly
                        color="primary"
                        v-model="item.active"
                        :ripple="false"
                    />
                </template>
                <template v-slot:item.last_login="{ item }">
                    <span>{{ item.last_login ? $moment(item.last_login).format('D/MM/YYYY') : '--' }}</span>
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
    name: 'UserIndexPage',
    data() {
        return {
            loading: false,
            dtHeaders: [
                {value: 'id', text: '#', width: 40, sortable: false, align: 'center'},
                {value: 'username', text: this.$t('words.lb_username')},
                {value: 'email', text: this.$t('words.lb_email')},
                {value: 'active', text: this.$t('words.lb_active')},
                {value: 'last_login', text: this.$t('words.lb_last_login')},
                {value: 'updated_at', text: this.$t('words.lb_updated_at')},
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
            dtFetchRows('/api/user/users', this.dtHeaders, this.dtOptions, this.searchText)
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
                that.$http.delete('/api/user/users/' + ids).then(response => {
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