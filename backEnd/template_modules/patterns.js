const patterns = {
  required_field: {
    regExp: /^.{1,}/i,
    text: 'This field is required'
  },
  length_250: {
    regExp: /^.{0,250}$/,
    text: 'Length should not exceed 250 characters'
  },
  email: {
    regExp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    text: 'Provided email is incorrect'
  },
  phone: {
    regExp: /^\+?[0-9]{1,4}\(?[0-9]{1,5}\)?([0-9]{1,3}-?){1,3}$/i,
    text: 'Provided phone number is incorrect'
  },
  password: {
    regExp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\@\#\$\%\^\&\*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.{8,})\S+$/g,
    // text: 'The password must be 8 characters or more, latin mixed case, with numbers and special characters',
    text: 'Provided password is incorrect'
  },
  numbers: {
    regExp: /^[0-9]{6}/gi,
    text: 'Code must contain only 6 numbers'
  },
  whitout_space: {
    regExp: /^\S+$/gi,
    text: 'This field contains spaces'
  },
  same_pass: {
    name: 'same_pass',
    regExp: /.+/gi,
    text: 'Passwords must be the same'
  }
};

const separatePaswordPatterns = {
  uppercase: {
    regExp: /([a-z]{1,}.*[A-Z]{1,})|([A-Z]{1,}.*[a-z]{1,})/g,
    text: 'Use latin upper and lower case letters (e.g. Aa)'
  },
  length_250: {
    regExp: /^.{8,}$/,
    text: 'Use 8 or more characters'
  },
  numbers: {
    regExp: /[0-9]/,
    text: 'Use a number (e.g. 1234)'
  },
  spec_symbols: {
    // regExp: /[!@#\$%\^&\*]/gi,
    regExp: /[!\@\#\$\%\^\&\*()_+\-=\[\]{};':"\\|,.<>\/?]/gi,
    text: 'User a symbol (e.g. !@#$)'
  }
};

module.exports = { patterns, separatePaswordPatterns };
