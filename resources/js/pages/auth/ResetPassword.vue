<template>
    <v-container style="height:100%">
        <v-row 
            justify="center" 
            align="center" 
            class="fill-height">
            <v-col cols="12" sm="6" md="5" lg="4">
                <form @submit.prevent="sendResetCode">
                    <v-card class="mb-4"
                        :loading="form.busy"
                        :disabled="form.busy">
                        <v-card-title>
                            Reset Password
                        </v-card-title>
                        <v-divider />
                        <v-card-text>
                            <input type="hidden" v-model="form.token" />
                            <v-text-field outlined dense
                                class="mb-3 mt-5"
                                placeholder="Email"
                                append-icon="mail_outline"
                                v-model="form.email"
                                :error-messages="form.errors.getAll('email')"
                            />

                            <v-text-field outlined dense
                                class="mb-3"
                                type="password"
                                placeholder="Password"
                                append-icon="mail_outline"
                                v-model="form.password"
                                :error-messages="form.errors.getAll('password')"
                            />

                            <v-text-field outlined dense
                                class="mb-6"
                                type="password"
                                placeholder="Password Confirmation"
                                append-icon="mail_outline"
                                v-model="form.password_confirmation"
                                :error-messages="form.errors.getAll('password_confirmation')"
                            />

                            <div class="d-flex">
                                <v-btn color="primary" type="submit">
                                    Reset password
                                </v-btn>
                            </div>
                        </v-card-text>
                    </v-card>
                </form>
                <div class="text-center">
                    <v-btn text exact
                        color="primary"
                        :to="{name: 'auth.login'}">
                        Back To Login
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { Form } from '../../utils/vform'

export default {
    name: 'AuthResetPasswordPage',
    data() {
        return {
            form: new Form({
                token: '',
                email: '',
                password: '',
                password_confirmation: '',
            }),
        }
    },
    created() {
        this.form.token = this.$route.params.token
        this.form.email = this.$route.params.email
    },
    methods: {
        sendResetCode() {
            this.form.post('/api/auth/reset-password').then((response) => {
                const { data } = response
                this.$coresnackbars.success(data.message)
                this.$router.push({
                    name: 'home'
                })
            }).catch(error => {
                this.$coresnackbars.error(data.message)
            });
        }
    }
}
</script>