var gulp = require('gulp'), // Gulp
    sass = require('gulp-sass'), // Sass пакет
    plumber = require("gulp-plumber"),
    csso = require('gulp-csso'),  // Пакет для минификации CSS
    postcss = require('gulp-postcss'), // PostCSS необходим для работы autoprefixer
    autoprefixer = require('autoprefixer'), // Библиотека для автоматической расстановки префиксов
    rename = require('gulp-rename'), // Библиотека для переименования файлов
    browserSync = require('browser-sync'), // Browser Sync
    del = require('del'); // Библиотека для удаления файлов и папок

gulp.task('sass', function(){ // Создаем таск "sass"
  return gulp.src('sass/style.scss') // Берем источник
    .pipe(plumber())
    .pipe(sass()) // Преобразуем Sass в CSS
    .pipe(postcss([ autoprefixer() ])) // Проставляем префиксы
    .pipe(csso()) // Сжимаем CSS файл
    .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
    .pipe(gulp.dest('css')) // Выгружаем результата в папку docs/css
    .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
  browserSync({ // Выполняем browser Sync
      server: { // Определяем параметры сервера
          baseDir: '.' // Директория для сервера — папка проекта
      },
      notify: false // Отключаем уведомления
  });
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
  gulp.watch('sass/**/*.scss', ['sass']); // Наблюдение за Sass файлами
  gulp.watch('*.html', browserSync.reload); // Наблюдение за HTML файлами
  gulp.watch('js/**/*.js', browserSync.reload); // Наблюдение за JS файлами
});

gulp.task('clean', function() {
  return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('build', ['clean', 'sass'], function() {
  var buildCss = gulp.src('css/style.min.css') // Переносим CSS в продакшен
  .pipe(gulp.dest('dist/css'))

  var buildFonts = gulp.src('fonts/**/*') // Переносим шрифты в продакшен
  .pipe(gulp.dest('dist/fonts'))

  var buildImg = gulp.src('img/**/*') // Переносим изображения в продакшен
  .pipe(gulp.dest('dist/img'))

  var buildJs = gulp.src('js/**/*') // Переносим скрипты в продакшен
  .pipe(gulp.dest('dist/js'))

  var buildHtml = gulp.src('*.html') // Переносим HTML в продакшен
  .pipe(gulp.dest('dist'));
});