const users = require("./users/users.service.js");
const hoteldetails = require("./hoteldetails/hoteldetails.service.js");
const reservation = require("./reservation/reservation.service.js");
const payment = require("./payment/payment.service.js");
const employee = require("./employee/employee.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(hoteldetails);
  app.configure(reservation);
  app.configure(payment);
  app.configure(employee);
  // ~cb-add-configure-service-name~
};
