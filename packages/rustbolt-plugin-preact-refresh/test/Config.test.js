const { describeByWalk, createConfigCase } = require('@rustbolt/test-tools');

describeByWalk(__filename, (name, src, dist) => {
  createConfigCase(name, src, dist);
});
