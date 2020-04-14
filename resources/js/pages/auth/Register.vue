<template>
    <v-container style="height:100%">
        <v-row 
            justify="center" 
            align="center" 
            class="fill-height">
            <v-col cols="12" sm="6" md="5" lg="4">
                <form @submit.prevent="register">
                    <v-card class="mb-4" 
                        :loading="form.busy"
                        :disabled="form.busy">
                        <v-card-title>
                            Register
                        </v-card-title>
                        <v-divider />
                        <v-card-text>
                            <v-text-field
                                autofocus
                                label="Full name"
                                v-model="form.full_name"
                                :error-messages="form.errors.getAll('full_name')"
                            />
                            <v-text-field
                                label="Email"
                                automplete="email"
                                v-model="form.email"
                                :error-messages="form.errors.getAll('email')"
                            />
                            <v-text-field
                                label="Password"
                                type="password"
                                autocomplete="new-password"
                                v-model="form.password"
                                :error-messages="form.errors.getAll('password')"
                            />
                            <v-text-field
                                label="Password confirm"
                                type="password"
                                autocomplete="new-password"
                                v-model="form.password_confirmation"
                                :error-messages="form.errors.getAll('password_confirmation')"
                            />

                            <div class="d-flex mt-5">
                                <v-btn color="primary" type="submit">
                                    Register
                                </v-btn>
                            </div>
                        </v-card-text>
                    </v-card>
                </form>
                <div class="text-center">
                    <v-btn text exact
                        color="primary"
                        :to="{name: 'auth.login'}">
                        Login
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { Form } from '../../utils/vform'
export default {
    name: 'AuthRegisterPage',
    data() {
        return {
            form: new Form({
                full_name: '',
                email: '',
                password: '',
                password_confirmation: ''
            })
        }
    },
    methods: {
        register(evt) {
            this.form.post('/api/auth/register').then((response) => {
                const { data } = response
                this.$coresnackbars.success(data.message)
                this.form.reset()
            });
        }
    }
}
</script>