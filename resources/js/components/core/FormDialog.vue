<template>
    <v-dialog 
        scrollable
        transition="slide-y-transition"
        v-model="opened"
        :persistent="persistent"
        :max-width="maxWidth">
        <v-card :loading="loading" :disabled="loading">
            <v-app-bar
            elevate-on-scroll
                color="white"
                height="58"
                :scroll-target="`#${bodyId}`">
                <div class="title">{{ title }}</div>
                <v-spacer />
                <template v-if="closeRouter">
                    <v-btn icon exact
                        :to="closeRouter">
                        <v-icon>close</v-icon>
                    </v-btn>
                </template>
                <template v-else>
                    <v-btn icon
                        @click="close">
                        <v-icon>close</v-icon>
                    </v-btn>
                </template>
            </v-app-bar>
            <v-card-text
                :id="bodyId"
                :class="classContent">
                <slot></slot>
            </v-card-text>
            <v-card-actions class="py-5">
                <v-btn
                    depressed
                    v-if="btnSaveClose"
                    color="primary"
                    @click="saveClose">
                    <v-icon left>save_alt</v-icon>
                    <span class="text-none">
                        {{ $t('words.btn_save_close') }}
                    </span>
                </v-btn>
                <v-btn
                    depressed
                    v-if="btnSave"
                    color="primary"
                    @click="save">
                    <v-icon left>save</v-icon>
                    <span class="text-none">
                        {{ $t('words.btn_save') }}
                    </span>
                </v-btn>
                <template v-if="closeRouter">
                    <v-btn 
                        depressed exact
                        :to="closeRouter">
                        <v-icon left>close</v-icon>
                        <span class="text-none">
                            {{ $t('words.btn_cancel') }}
                        </span>
                    </v-btn>
                </template>
                <template v-else>
                    <v-btn
                        depressed
                        @click="close">
                        <v-icon>close</v-icon>
                        <span class="text-none">
                            {{ $t('words.btn_cancel') }}
                        </span>
                    </v-btn>
                </template>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'FormDialog',
    props: {
        open: {
            required: true,
            type: Boolean,
        },
        persistent: {
            type: Boolean,
            default: true
        },
        title: {
            type: String
        },
        maxWidth: {
            type: Number,
            default: 700
        },
        closeRouter: {
            type: Object
        },
        loading: {
            type: Boolean,
            default: false
        },
        classContent: {
            type: String,
            default: 'pt-5'
        },
        btnSaveClose: {
            type: Boolean,
            default: true
        },
        btnSave: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            bodyId: 'dialog-body'
        }
    },
    computed: {
        opened: {
            get() {
                return this.open
            },
            set(payload) {
                this.$emit('update:open', payload)
            }
        }
    },
    methods: {
        saveClose() {
            this.$emit('save-close')
        },
        save() {
            this.$emit('save')
        },
        close() {
            this.$emit('close')
        }
    }
}
</script>