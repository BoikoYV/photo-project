const { src, dest, watch, series, parallel } = require('gulp'); 
// Общие плагины
const sourcemaps   = require('gulp-sourcemaps');        //source maps для дебага миниф.кода
const concat       = require('gulp-concat');            //объединение файлов(именование)    
const browserSync  = require('browser-sync').create();  //browserSync
const del          = require('del');                    //удаление папок/файлов
const rename       = require('gulp-rename');            //переименование
// Стили
const sass         = require('gulp-sass');              //SCSS компилятор 
const autoprefixer = require('gulp-autoprefixer');      //вендорные префиксы
const cleancss     = require('gulp-clean-css');         //минификация стилей
const purgecss     = require('gulp-purgecss')           //удаление неиспользуемого кода
const fonts        = require('gulp-ttf2woff2');         //конвертирование шрифтов
// Изображения
const imageMin     = require('gulp-imagemin');          //сжатие картинок
const newer        = require('gulp-newer');             //проверка на то, были ли манипуляции с картинкой
// Скрипты
const uglify       = require('gulp-uglify-es').default; //сжатие js


// Конвертирование шрифтов
function convertFonts() {
   return src('src/fonts/*.ttf')
      .pipe(fonts())
      .pipe(newer('dist/fonts/'))
      .pipe(dest('dist/fonts/'))
      .pipe(browserSync.stream()) 
}

// Манипуляция с SCSS
function compilStyles() {
   return src('./src/scss/main.scss')
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sass().on('error', sass.logError))
      .pipe(rename({suffix: '.min'}))
      // .pipe(purgecss({ content: ['index.html', 'src/js/**/*.js'] }))
      .pipe(autoprefixer({ overrideBrowserslist: ['last 3 versions'] }))
      .pipe(cleancss({ level: { 1: { specialComments: 0 } } }))
      .pipe(sourcemaps.write())
      .pipe(dest('./dist/css/'))
      .pipe(browserSync.stream()) 
}

// Сжатие картинок(c пропуском уже сжатых)
function compressImgs(){
   return src('src/img/**/*')
   .pipe(newer('dist/img/'))
   .pipe(imageMin())
   .pipe(dest('dist/img/'));
}

// Манипуляции с JS
function scripts(){
   return src('src/js/**/*.js')
   .pipe(sourcemaps.init())
   .pipe(concat('script.min.js'))
   .pipe(uglify())
   .pipe(sourcemaps.write())
   .pipe(dest('dist/js/'))
   .pipe(browserSync.stream())
}

// Настройки Browsersync
function browserChanges() {
   return browserSync.init({
      server: {
         baseDir: './'
      },
      browser: 'Firefox Developer Edition'
   })
}

// Очищение папки dist
function cleanDir() {
	return del('dist/**/*');
}

// Отслеживание изменений
function startWatch() {
   watch(['src/scss/**/*.scss'], compilStyles);          //стили
   watch('index.html').on('change', browserSync.reload); //html
   watch('src/js/**/*.js', scripts);                     //скрипты
   watch('src/img/**/*', compressImgs);                  //картинки
   watch('src/fonts/**/*', convertFonts);                //шрифты
}



exports.convertFonts   = convertFonts; 
exports.compilStyles   = compilStyles; 
exports.scripts        = scripts;      
exports.startWatch     = startWatch;   
exports.browserChanges = browserChanges;
exports.cleanDir       = cleanDir;     
exports.compressImgs   = compressImgs;


exports.dev            = parallel(compilStyles, scripts, browserChanges, compressImgs, convertFonts, startWatch);
exports.build          = series(cleanDir, compilStyles, scripts, compressImgs, convertFonts);
