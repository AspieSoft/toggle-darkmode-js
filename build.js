const miniforge = require('@aspiesoft/miniforge-js');

miniforge.rootDir(__dirname);

miniforge.build('./script.js', {
  standAlone: true,
  avoidDependencies: true,
  compress: false,
  encrypt: false,
  outputNameMin: true,
  minify: {
    ecma: 6,
    parse: {ecma: 6},
    compress: {
      ecma: 6,
      keep_infinity: false,
      module: false,
      passes: 5,
      top_retain: ['DarkMode'],
      typeofs: false,
    },
    mangle: {
      keep_classnames: true,
      module: true,
      reserved: ['DarkMode'],
    },
    module: false,
    keep_classnames: true,
    ie8: true,
  }
});
