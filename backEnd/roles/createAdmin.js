const { patterns } = require('../template_modules');
const email = process.argv[2];
const pass = process.argv[3];
const err = new Error();

emailValidation(email);
passValidation(pass);

function emailValidation(email) {
  if (!email) {
    err.message = 'Введите email';
    throw err;
  }
  const pat = patterns.patterns.email;
  const check = pat.regExp.test(email);
  if (!check) {
    err.message = pat.text;
    throw err;
  }
}

function passValidation(pass) {
  if (!pass) {
    err.message = 'Введите пароль';
    throw err;
  }
	const listPatterns = patterns.separatePaswordPatterns;
	Object.values(listPatterns).forEach(item => {
		const check = item.regExp.test(pass);
		if (!check) {
			err.message = item.text;
			throw err;
		}
	})
}
