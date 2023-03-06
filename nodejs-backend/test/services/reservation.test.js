const assert = require('assert');
const app = require('../../src/app');

describe('\'reservation\' service', () => {
  it('registered the service', () => {
    const service = app.service('reservation');

    assert.ok(service, 'Registered the service (reservation)');
  });
});
