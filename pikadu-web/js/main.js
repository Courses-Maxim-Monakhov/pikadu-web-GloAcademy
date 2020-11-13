    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyCEMF8jGdVWwayShq9XxGU0J5LENo1W_nM",
      authDomain: "pikadu-gloacademy.firebaseapp.com",
      databaseURL: "https://pikadu-gloacademy.firebaseio.com",
      projectId: "pikadu-gloacademy",
      storageBucket: "pikadu-gloacademy.appspot.com",
      messagingSenderId: "1012267854289",
      appId: "1:1012267854289:web:e8e3b0385ac98f366798f0"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);



// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 


const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const userNameRe = /.*@/; 

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

const exitElem = document.querySelector('.exit');

const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');

const editUsername = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');
const userAvatarElem = document.querySelector('.user-avatar');

const postsWrapper = document.querySelector('.posts');

const buttonNewPost = document.querySelector('.button-new-post');

const addPostElem = document.querySelector('.add-post');




const listUsers = [
  {
    id: 'asdsaqwweq0011',
    email: 'mamode12@yandex.com',
    password: 'lolKekChebureck',
    displayName: 'web-Max',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg'
  } , 
  {
    id: 'asdsaqwweq0044',
    email: 'kate@kitten.com',
    password: 'katekatesuper',
    displayName: 'KateTheOnly'
  }
];


const setUsers = { // UsersBundle
  user: null,
  logIn(email, password, handler) {

    if ( ! regExpValidEmail.test(email) ) {
      return alert("email неправильный");
    }
    
    const user = this.getUser(email);

    if ( user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с такими данными не найден');
    }
    // console.log(password);
  },

  logOut(handler){
    this.user = null;
    if (handler) {
      handler();
    }
    console.log('выход');
  },

  signUp(email, password, handler){

    if ( ! email.trim() || ! password.trim()) {
      alert("Ввелите данные"); 
      return;
    }

    if ( ! regExpValidEmail.test(email) ) {
      return alert("email неправильный");
    }

    if ( ! this.getUser(email) ) {
      const user = {email, password, displayName: email.substring(0, email.indexOf('@'))};
      listUsers.push(user);
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с таким email уже зарегистрирован');
    }
    console.log('регистрация');
  },


  editUser(userName, userPhoto='', handler) {

    if (userName) {
      this.user.displayName = userName;
    }

    if (userPhoto) {
      this.user.photo = userPhoto;
    }

    if (handler) {
      handler();
    }

  },


  logOut(handler) {
    this.user = null;

    if (handler) {
      handler();
    }
  },

  getUser(email) {
    return listUsers.find( (item) => item.email === email );
    // console.log('123');
  },

  authorizedUser(user) {
    this.user = user;
  }

}

const setPosts = {
  allPosts: [
    {
      title: ' 1 Заголовок поста',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags: ['1', '2 тегс', 'вкусный'],
      author: {displayName : 'maks', photo : 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg'},
      date: '11.11.2020, 20:54:00',
      like: 150,
      comments: 13
    },
    {
      title: '2 Заголовок поста',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags: ['кек', 'лужа', 'зайка'],
      author: {displayName : 'kolyan', photo : 'https://i.ytimg.com/vi/1Ne1hqOXKKI/maxresdefault.jpg'},
      date: '06.11.2020, 18:41:00',
      like: 300,
      comments: 26
    }
  ],


  addPost(title, text, tags, handler) {

    this.allPosts.unshift(
      {
        title,
        text,
        tags : tags.split(',').map( item => item.trim()),
        author : {
          displayName: setUsers.user.displayName,
          photo : setUsers.user.photo
        },
        date : new Date().toLocaleString(),
        like : 0,
        comments : 0,
      }
    );

    if (handler) {
      handler();
    }

  }
}




const toggleAuthDom = () => {

  const user = setUsers.user;

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo || userAvatarElem.src;


    // console.log("userNmae textContent = " + userNameElem.textContent);
    
    buttonNewPost.classList.add('visible');
    // const userEmailNamePart = user.displayName.match(userNameRe)[0];
    // userNameElem.textContent = userEmailNamePart.substring(0, userEmailNamePart.length - 1); // Решенное дз
 
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';

    buttonNewPost.classList.remove('visible');

    addPostElem.classList.remove('visible');

    postsWrapper.classList.add('visible');

  }
};


const showAddPost = () => {
  addPostElem.classList.add('visible');
  postsWrapper.classList.remove('visible');
}


const showAllPosts = () => {
  let postsHTML = '';

  setPosts.allPosts.forEach( (post) => {

    const { title, text, date, tags, author, like, comments } = post;

    postsHTML += `
    <section class="post">
    <div class="post-body">
      <h2 class="post-title">${title}</h2>
      <p class="post-text">${text}</p>
      <div class="tags">
        ${tags.map(tag => `<a href='#' class='tag'>#${tag}</a>`)}


      </div>
      <!-- /.tags -->
    </div>
    <!-- /.post-body -->
    <div class="post-footer">
      <div class="post-buttons">
        <button class="post-button likes">
          <svg width="19" height="20" class="icon icon-like">
            <use xlink:href="img/icons.svg#like"></use>
          </svg>
          <span class="likes-counter">${like}</span>
        </button>
        <button class="post-button comments">
          <svg width="21" height="21" class="icon icon-comment">
            <use xlink:href="img/icons.svg#comment"></use>
          </svg>
          <span class="comments-counter">${comments}</span>
        </button>
        <button class="post-button save">
          <svg width="19" height="19" class="icon icon-save">
            <use xlink:href="img/icons.svg#save"></use>
          </svg>
        </button>
        <button class="post-button share">
          <svg width="17" height="19" class="icon icon-share">
            <use xlink:href="img/icons.svg#share"></use>
          </svg>
        </button>a
      </div>
      <!-- /.post-buttons -->
      <div class="post-author">
        <div class="author-about">
          <a href="#" class="author-username">${author.displayName}</a>
          <span class="post-time">${date}</span>
        </div>
        <a href="#" class="author-link"><img src=${author.photo || 'img/avatar.jpeg'} alt="avatar" class="author-avatar"></a>
      </div>
      <!-- /.post-author -->
    </div>
    <!-- /.post-footer -->
  </section>
    `
  })

  postsWrapper.innerHTML = postsHTML;

  addPostElem.classList.remove('visible');
  postsWrapper.classList.add('visible'); // todo Раскомментировать

}



const init = () => {

  loginForm.addEventListener('submit', (event) => {

    event.preventDefault();

    setUsers.logIn(
      emailInput.value, 
      passwordInput.value,
      toggleAuthDom
    );
  
    loginForm.reset();
  
  });
  
  
  loginSignup.addEventListener('click', (event) => {
    event.preventDefault();
    setUsers.signUp(
      emailInput.value, 
      passwordInput.value,
      toggleAuthDom
    );
  
    loginForm.reset();
  
  });


  exitElem.addEventListener('click', event => {
    event.preventDefault();
    setUsers.logOut(toggleAuthDom);
  
  });
  

  editElem.addEventListener('click', event => {
    event.preventDefault();
    editContainer.classList.toggle('visible');
    editUsername.value = setUsers.user.displayName;
  });
  

  editContainer.addEventListener('submit', event => {
    
    event.preventDefault();
  
    setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom);
    editContainer.classList.remove('visible');
  });
  

  menuToggle.addEventListener('click', function (event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликнули по кнопке меню 
    menu.classList.toggle('visible');
  })


  buttonNewPost.addEventListener('click', (event) => {
    event.preventDefault();
    showAddPost();
    console.log('New post handler');
  })


  addPostElem.addEventListener('submit', (event) => {
    console.log("Add post handler");
    event.preventDefault();
    
    
    const { title, text, tags } = addPostElem.elements;

    if (title.value.length < 6) {
      alert('Слишком короткий заголовок');
      return;
    }

    if (text.value.length < 50) {
      alert('Слишком короткий заголовокпост');
      return;
    }

    setPosts.addPost(title.value, text.value, tags.value, showAllPosts);

    addPostElem.classList.remove('visible');
    addPostElem.reset();

  });

  showAllPosts();
  toggleAuthDom();

}


document.addEventListener('DOMContentLoaded', init);



// ДЗ после 1 урока
// Когда мы добавляем нового пользователя в displayName добавлять только начало email, например. только 'mamode12' из 'mamode12@yandex.com'.
// Добавить функцию, проверяющую email. 

// Тестики

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
  } else {
    // User is signed out.
    console.log("User is signed out");
    // ...
  }
});