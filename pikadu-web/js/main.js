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

    console.log(firebase);



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


const DEFAULT_PHOTO = userAvatarElem.src;




const setUsers = { // UsersBundle
  user: null,

  initUser(handler) {
    firebase.auth().onAuthStateChanged( user => {
      if ( user ) {
        this.user = user;
        console.log('User logged in');
      } else {
        this.user = null;
        console.log('User logged out');
      }

      if (handler) {
        console.log('handler ToggleAuthDOM');
        handler();
      }
      
    })

  },


  logIn(email, password, handler) {

    if ( ! regExpValidEmail.test(email) ) {
      return alert("email неправильный");
    }
    
    // const user = this.getUser(email);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch( (err) => {
        const errCode = err.code;
        const errMessage = err.message;
        console.log('Attempt to log in');
        if ( errCode === 'auth/wrong-password') {
          alert('неверный пароль');

        } else if ( errCode === 'auth/user-not-found') {
          alert('пользователь не найден');

        } else {
          alert(errMessage);
        }
        console.log(err);
      });
    // console.log(password);
  },

  logOut(handler) {

    firebaseConfig
      .auth()
      .signOut();

  },

  signUp(email, password, handler){

    if ( ! email.trim() || ! password.trim()) {
      alert("Ввелите данные"); 
      return;
    }

    if ( ! regExpValidEmail.test(email) ) {
      return alert("email неправильный");
    }

    // if ( ! this.getUser(email) ) {
    //   const user = {email, password, displayName: email.substring(0, email.indexOf('@'))};
    //   listUsers.push(user);
    //   this.authorizedUser(user);
    //   handler();
    // } else {
    //   alert('Пользователь с таким email уже зарегистрирован');
    // }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then( (data) => {
        this.editUser(email.substring(0, email.indexOf('@')), null, handler);
        console.log(data);
        console.log("User signed in");
      })
      .catch( (err) => {
        const errCode = err.code;
        const errMessage = err.message;

        if ( errCode === 'auth/week-password') {
          alert('Ваш пароль слишком слабый');

        } else if ( errCode === 'auth/email-alredy-in-use') {
          alert('Этот email уже используетсяю');

        } else {
          alert(errMessage);
        }
        console.log(err);
      });
    console.log('регистрация');
  },


  editUser(displayName, photoURL='', handler) {

    const user = firebase.auth().currentUser;

    if (displayName) {

      if (photoURL) {
        user.updateProfile( {
          displayName,
          photoURL
        }).then(handler);
      } else {
        user.updateProfile( {
          displayName
        }).then(handler);
      }
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

  // getUser(email) {
  //   return listUsers.find( (item) => item.email === email );
  //   // console.log('123');
  // },

  // authorizedUser(user) {
  //   this.user = user;
  // }

  sendForget(email) {
    firebase.auth().sendPasswordResetEmail(email)
    .then( () => {alert('Письмо для сброса пароля отправлено')})
    .catch( (err) => console.log(err) );
  }

}

const loginForget = document.querySelector('.login-forget');

loginForget.addEventListener( 'click', (event) => {

  event.preventDefault();
  setUsers.sendForget(emailInput.value);

  emailInput.value = '';

} )

const setPosts = {
  allPosts: [],


  addPost(title, text, tags, handler) {

    const user = firebase.auth().currentUser;


    this.allPosts.unshift(
      {
        id: `postID${(+new Date()).toString(16)}-${user.uid}`,
        title,
        text,
        tags : tags.split(',').map( item => item.trim()),
        author : {
          displayName: setUsers.user.displayName,
          photo : setUsers.user.photoURL
        },
        date : new Date().toLocaleString(),
        like : 0,
        comments : 0,
      }

    );

    firebase.database().ref('post').set(this.allPosts)
      .then( () => this.getPosts(handler) );

    if (handler) {
      handler();
    }

  },

  getPosts(handler) {
    firebase.database().ref('post').on('value', snapshot => {
      this.allPosts = snapshot.val() || [];
      handler();
    })

  }
}




const toggleAuthDom = () => {

  const user = setUsers.user;

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photoURL || DEFAULT_PHOTO;


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
    console.log(tags.map( (tag) => tag + '*'));

    postsHTML += `
    <section class="post">
    <div class="post-body">
      <h2 class="post-title">${title}</h2>
      <p class="post-text">${text}</p>
      <div class="tags">
        ${tags.map( (tag) => `<a href='#' class='tag'>#${tag}</a>`)}


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


  setUsers.initUser(toggleAuthDom);

  setPosts.getPosts( showAllPosts );


}


document.addEventListener('DOMContentLoaded', init);



// ДЗ после 1 урока
// Когда мы добавляем нового пользователя в displayName добавлять только начало email, например. только 'mamode12' из 'mamode12@yandex.com'.
// Добавить функцию, проверяющую email. 

// Тестики

