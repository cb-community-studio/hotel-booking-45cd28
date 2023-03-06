const { Hoteldetails } = require('./hoteldetails.class');
const createModel = require('../../models/hoteldetails.model');
const hooks = require('./hoteldetails.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/hoteldetails', new Hoteldetails(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('hoteldetails');

  service.hooks(hooks);
};