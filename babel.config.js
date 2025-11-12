module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      ['@babel/preset-typescript', {
        allowDeclareFields: true,
        onlyRemoveTypeImports: true
      }]
    ],
    plugins: [
      ['@babel/plugin-transform-flow-strip-types', { requireDirective: false }]
    ]
  };
};
