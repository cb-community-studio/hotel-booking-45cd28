const assert = require('assert');
const app = require('../../src/app');

describe('\'hoteldetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('hoteldetails');

    assert.ok(service, 'Registered the service (hoteldetails)');
  });
});
