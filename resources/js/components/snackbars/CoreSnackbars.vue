<template>
	<div class="v-snackbars">
		<v-snackbar
			:color="item.type"
			:class="`core-snackbar--${item.type}`"
			v-model="item.snackbar"
			:bottom="item.y === 'bottom'"
			:left="item.x === 'left'"
			:multi-line="item.mode === 'multi-line'"
			:right="item.x === 'right'"
			:timeout="item.timeout"
			:top="item.y === 'top'"
			:vertical="item.vertical"
			@input="onClose">
			{{ item.text }}
			<v-btn small icon @click="item.snackbar = false">
				<v-icon>close</v-icon>
			</v-btn>
		</v-snackbar>
	</div>
</template>

<script>
export default {
	data () {
		return {
			item: {
				snackbar: false,
				y: 'top',
				x: null,
				timeout: 6000,
				type: 'info',
				text: '',
				vertical: false,
				mode: 'single-line'
			}
		}
	},
	methods: {
		open (message, type, options) {
			if (!this.$parent) {
				this.$mount();
				document.querySelector("#app").appendChild(this.$el);
			};
			if (message) {
				this.item.text = message;
			}

			if (type) {
				this.item.type = type;
			}

			if (typeof options !== "undefined") {
				if (options.hasOwnProperty('timeout')) {
					this.item.timeout = options.timeout;
				}
				if (options.hasOwnProperty('y')) {
					this.item.y = options.y;
				}
			}
			this.item.snackbar = true;
		},
		success (message, options) {
			this.open(message, 'success', options);
		},
		error (message, options) {
			this.open(message, 'error', options);
		},
		warning (message, options) {
			this.open(message, 'warning', options);
		},
		info (message, options) {
			this.open(message, 'info', options);
		},
		show(message, options) {
			if (options.type && options.type === 'success') {
				this.success(message, options);
			} else if (options.type && options.type === 'error') {
				this.error(message, options);
			} else if (options.type && options.type === 'warning') {
				this.warning(message, options);
			} else if (options.type && options.type === 'info') {
				this.info(message, options);
			}
		},
		hide() {
			this.snackbar = false;
		},
		onClose(payload) {
			if (!payload) {
				this.item.text = ''
			}
		}
	}
}
</script>
