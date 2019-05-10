const launch = require('@fep/launchs-pc');

const pkg = require(`${process.cwd()}/package.json`);

launch
  .set({
    library: pkg.name.split('/')[1],
    dllReference: {
      manifest: require('@fep-project-lib/dll/dist/dll.json'),
    },
  })
  .build();
