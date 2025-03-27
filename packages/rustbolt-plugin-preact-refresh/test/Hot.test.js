const { describeByWalk, createHotCase } = require('@rustbolt/test-tools');

describeByWalk(__filename, (name, src, dist) => {
  createHotCase(name, src, dist, 'web');
});
