<template>
    <v-app>
        <v-app-bar 
            dark fixed app
            max-height="64"
            color="primary">
            <v-container class="d-flex align-center pa-0">
                <v-toolbar-title>Starter7</v-toolbar-title>
                <v-spacer />

                <v-btn text 
                    :to="{name: 'home'}">
                    <span class="text-capitalize font-weight-light">
                        Home
                    </span>
                </v-btn>

                <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn text v-on="on">
                            <span class="text-capitalize font-weight-light">
                                Users
                            </span>
                            <v-icon right>arrow_drop_down</v-icon>
                        </v-btn>
                    </template>
                    <v-list dense>
                        <v-list-item 
                            v-if="$can('user.users.read')"
                            active-class="primary--text"
                            :to="{name: 'user.users.index'}">
                            <v-list-item-content>
                                <v-list-item-title>
                                    User
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item 
                            v-if="$can('user.roles.read')"
                            active-class="primary--text"
                            :to="{name: 'user.roles.index'}">
                            <v-list-item-content>
                                <v-list-item-title>
                                    Roles
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item 
                            v-if="$can('user.permissions.read')"
                            active-class="primary--text"
                            :to="{name: 'user.permissions.index'}">
                            <v-list-item-content>
                                <v-list-item-title>
                                    Permissions
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-menu>
                
                <v-btn icon exact 
                    class="ml-2"
                    :to="{name: 'profile'}">
                    <v-icon>person_pin</v-icon>
                </v-btn>

                <v-btn icon @click="logout">
                    <v-icon>power_settings_new</v-icon>
                </v-btn>
            </v-container>
        </v-app-bar>
        <v-content>
            <core-child />
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: 'DefaultLayout',
    methods: {
        async logout() {
            await this.$store.dispatch('auth/logout')
            this.$router.push({ name: 'auth.login' })
        }
    }
}
</script>