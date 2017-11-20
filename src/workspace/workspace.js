import './workspace.scss';






// Основные блоки
const mainMenu = document.getElementById('main-menu'),
      workspace = document.getElementById('workspace'),
      workspaceBackBtn = document.getElementById('back-btn');




// Функция возврата назад для мобильной версии
const returnBack = () => {
  mainMenu.classList.toggle('main-menu--active');
  workspace.classList.toggle('workspace--active');  
};
// Добавим обработчик кнопке "Назад"
workspaceBackBtn.addEventListener('click', returnBack);