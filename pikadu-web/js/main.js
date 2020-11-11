// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
})

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

const userNameRe = /.*@/; 



const listUsers = [
  {
    id: 'asdsaqwweq0011',
    email: 'mamode12@yandex.com',
    password: 'lolKekChebureck',
    displayName: 'web-Max'
  } , 
  {
    id: 'asdsaqwweq0044',
    email: 'kate@kitten.com',
    password: 'katekatesuper',
    displayName: 'KateTheOnly'
  }
];


const toggleAuthDom = () => {
  const user = setUsers.user;

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    console.log("userNmae textContent" + userNameElem.textContent);
    const userEmailNamePart = user.displayName.match(userNameRe)[0];
    userNameElem.textContent = userEmailNamePart.substring(0, userEmailNamePart.length - 1); // Решенное дз
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
};


const setUsers = { // UsersBundle
  user: null,
  logIn(email, password, handler) {
    const user = this.getUser(email);

    if ( user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с такими данными не найден');
    }
    console.log(password);
  },

  logOut(){
    console.log('выход');
  },

  signUp(email, password, handler){
    if ( ! this.getUser(email)) {
      const user = {email, password, displayName: email};
      listUsers.push(user);
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с таким email уже зарегистрирован');
    }
    console.log('регистрация');
  },

  getUser(email) {
    return listUsers.find( (item) => {
      return item.email === email;
    });
    // console.log('123');
  },

  authorizedUser(user) {
    this.user = user;
  }

}

// setUsers.signIn();

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // console.log('Hej');
  // console.log(event);
  setUsers.logIn(
    emailInput.value, 
    passwordInput.value,
    toggleAuthDom
  );
});

loginSignup.addEventListener('click', (event) => {
  event.preventDefault();
  setUsers.signUp(
    emailInput.value, 
    passwordInput.value,
    toggleAuthDom
  );
});


toggleAuthDom();



// ДЗ после 1 урока
// Когда мы добавляем нового пользователя в displayName добавлять только начало email, например. только 'mamode12' из 'mamode12@yandex.com'.
// Добавить функцию, проверяющую email. 