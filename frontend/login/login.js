document.addEventListener('DOMContentLoaded', loginJs);

function loginJs() {
  const tabsWrap = document.getElementById('tabsWrap');
  const checkBtn = document.getElementsByClassName('checkBtn');
  tabsWrap.addEventListener('click', selectForm);
  for (let i = 0; i < checkBtn.length; i++) {
    checkBtn[i].addEventListener('click', checkForm);
  }
}

function selectForm(event) {
  const target = event.target;
  const className = 'show';
  const j = target.classList.contains(className);
  if (j) return;
  const childArray = target.parentNode.children;
  const formId = target.dataset.id;
  const formWrap = document.getElementById('formWrap');
  const childForm = formWrap.children;
  let targetForm;
  for (let i = 0; i < childForm.length; i++) {
    if (childForm[i].id === formId) {
      targetForm = childForm[i];
      break;
    }
  }
  toggleClass(target, childArray, className);
  toggleClass(targetForm, childForm, className);
}

function checkForm(event) {
  const target = event.target;
  const targetFormId = target.dataset.id;
  const form = document.forms[targetFormId];
  const data = {
    form: targetFormId,
    data: {
      platform: navigator.platform
    }
  };
  for (let i = 0; i < form.length - 1; i++) {
    const nameInput = form[i].name;
    data.data[nameInput] = form[i].value;
  }
  if (targetFormId === 'registrForm') {
    if (data.data.pass !== data.data.pass_two) {
      alert('Пароли не совпадают');
      return;
    }
  }
  if (data.data.email === '' || data.data.pass === '') {
    alert('Поля заполнены не полностью');
    return;
  }

  sendAjaxRequest(targetFormId, data, (res) => {
    let result;
    try {
      result = JSON.parse(res);
    } catch (error) {
      console.log(res);
      return;
    }
    if (result.status === 'registrErr' || result.status === 'authErr') {
      alert(result.answer);
    } else if (result.status === 'registrOk' || result.status === 'authOk') {
      location = result.nextStep;
    }
  });
}

function toggleClass(target, childArray, nameClass, callback) {
  callback = callback || function() {};
  for (let i = 0; i < childArray.length; i++) {
    const t = childArray[i].classList.contains(nameClass);
    if (t) {
      childArray[i].classList.toggle(nameClass, false);
      break;
    }
  }
  target.classList.toggle(nameClass, true);
  return callback();
}
function sendAjaxRequest(search, obj, callback = function() {}) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(obj);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', search, true);
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.send(data);
    console.log('Запрос ушел');
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200) {
        resolve(xhr.responseText);
        return callback(xhr.responseText);
      }
    };
  });
}
