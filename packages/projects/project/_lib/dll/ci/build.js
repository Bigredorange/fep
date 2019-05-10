require('@fep/launchs-pc').set({
  entry: {
    dll: [
      'vue',
      'vuex',
      'vue-router',
    ],
  },
  library: 'dll',
  dll: true,
}).build();
