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
                            Forgotten Password
                        </v-card-title>
                        <v-divider />
                        <v-card-text>
                            <v-text-field outlined dense
                                class="mb-6 mt-5"
                                placeholder="Email"
                                append-icon="mail_outline"
                                v-model="form.email"
                                :error-messages="form.errors.getAll('email')"
                            />

                            <div class="d-flex">
                                <v-btn color="primary" type="submit">
                                    Send password reset link
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
    name: 'AuthForgottenPasswordPage',
    data() {
        return {
            form: new Form({
                email: '',
            }),
        }
    },
    methods: {
        sendResetCode() {
            this.form.post('/api/auth/request-password').then((response) => {
                const { data } = response
                this.$coresnackbars.success(data.message)
            }).catch(error => {
                this.$coresnackbars.error(data.message)
            });
        }
    }
}
</script>