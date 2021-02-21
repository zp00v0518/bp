const { patterns } = require('../template_modules');
const insertMethod = require('../db/methods/insertMethod');
const rolesList = require('./rolesList');
const addNewUserToApp = require('../user/addNewUserToApp');
const email = process.argv[2];
const pass = process.argv[3];
const err = new Error();

start();

function start(){
	if (insertMethod.mongo.client){
		setUser();
	} else {
		setTimeout(()=> {
			start();
		}, 100)
	}
}

async function setUser() {
  emailValidation(email);
  passValidation(pass);
  const userData = { email, pass, role: rolesList.admin.name };
	await addNewUserToApp(userData);
	console.log("Админ добавлен");
	insertMethod.close();
}

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
  Object.values(listPatterns).forEach((item) => {
    const check = item.regExp.test(pass);
    if (!check) {
      err.message = item.text;
      throw err;
    }
  });
}
