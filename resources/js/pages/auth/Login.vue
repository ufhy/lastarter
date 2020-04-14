<template>
    <v-container style="height:100%">
        <v-row 
            justify="center" 
            align="center" 
            class="fill-height">
            <v-col cols="12" sm="6" md="5" lg="4">
                <form @submit.prevent="login">
                    <v-card class="mb-4"
                        :loading="form.busy"
                        :disabled="form.busy">
                        <v-card-title>
                            Login
                        </v-card-title>
                        <v-divider />
                        <v-card-text>
                            <v-text-field outlined single-line dense
                                placeholder="Email"
                                append-icon="mail_outline"
                                v-model="form.email"
                                :error-messages="form.errors.getAll('email')"
                            />
                            <v-text-field outlined single-line dense
                                placeholder="Password"
                                :type="passwordVisibility ? 'text' : 'password'"
                                :append-icon="passwordVisibility ? 'visibility' : 'visibility_off'"
                                v-model="form.password"
                                :error-messages="form.errors.getAll('password')"
                                @click:append="passwordVisibility = !passwordVisibility"
                            />
                            <v-checkbox 
                                label="Remember me"
                                false-value=""
                                true-value="on"
                                v-model="form.remember"
                            />

                            <div class="d-flex">
                                <v-btn color="primary" type="submit">
                                    Login
                                </v-btn>
                                <v-spacer />
                                <v-btn text 
                                    color="primary"
                                    :to="{name: 'auth.forgotten_password'}">
                                    <span class="text-none">Forgotten password</span>
                                </v-btn>
                            </div>
                        </v-card-text>
                    </v-card>
                </form>
                <!-- <div class="text-center">
                    <v-btn text 
                        color="primary"
                        :to="{name: 'auth.register'}">
                        Register
                    </v-btn>
                </div> -->
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { Form } from '../../utils/vform'

export default {
    name: 'AuthLoginPage',
    data() {
        return {
            form: new Form({
                email: '',
                password: '',
                remember: '',
            }),
            passwordVisibility: false
        }
    },
    // created() {
    //     console.log('Login created');
    // },
    methods: {
        login() {
            this.$http.get('/sanctum/csrf-cookie').then(response => {
                this.form.post('/api/auth/login').then((response) => {
                    const { data } = response
                    this.$coresnackbars.success(data.message)
                    this.$store.commit('auth/setUser', data.user)

                    // Redirect home
                    this.$router.push({ name: 'home' })
                })
            });
        }
    }
}
</script>