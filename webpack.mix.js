const mix = require('laravel-mix');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');

mix.disableNotifications();
mix.setPublicPath('public');

mix.webpackConfig({
   resolve: {
      extensions: ['.js', '.json', '.vue'],
      alias: {
         '~': path.join(__dirname, './resources/js'),
         '@': path.join(__dirname, './resources')
      }
   },
   output: {
      chunkFilename: 'dist/[name].js',
   },
   module: {
      rules: [
            {
               test: /\.sass$/,
               use: [
                  MiniCssExtractPlugin.loader,
                  { loader: 'css-loader', options: { sourceMap: !mix.inProduction() } },
                  {
                        loader: 'sass-loader',
                        options: {
                           sourceMap: !mix.inProduction(), 
                           prependData: "@import '@/styles/variables.scss'"
                        },
                  },
               ],
            },
            {
               test: /\.sass$/,
               use: [
                  MiniCssExtractPlugin.loader,
                  { loader: 'css-loader', options: { sourceMap: !mix.inProduction() } },
                  {
                        loader: 'sass-loader',
                        options: {
                           sourceMap: !mix.inProduction(), 
                        },
                  },
               ],
            },
      ],
   },
   devServer: {
      disableHostCheck: true,
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: "[name].css",
         chunkFilename: "[name].css",
         ignoreOrder: false
      }),
   ],
   externals: {
      "vue": "Vue",
   }
});

if (mix.inProduction()) {
   mix.copy('node_modules/vue/dist/vue.min.js', 'public/dist/vue.js');
   mix.version();
} else {
   mix.copy('node_modules/vue/dist/vue.js', 'public/dist/vue.js');
}


mix.js('resources/js/app.js', 'public/dist')
mix.js('resources/js/vuetify.js', 'public/dist')
mix.sass('resources/styles/app.scss', 'public/dist');