const { authForm, registrForm } = require('../user');

const routing = {
  '/authForm': authForm,
  '/registrForm': registrForm
};

module.exports = routing;
