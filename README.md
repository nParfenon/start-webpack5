# Описание start-webpack5 
- Работает с препроцессорами SASS/SCSS
- Оптимизирует и минифицирует CSS/JS
- Используется автопрефиксер 
- Сжимает JPG/JPEG/PNG/SVG
- Генерирует изображения в формате WEBP
- Позволяет использовать последние возможности JavaScript с помощью Babel

# Команды
- `npm run build:dev` - собираем development
- `npm run build:prod`- собираем production

# Дополнительно
- Плагин `image-webpack-loader (версия: 8.1.0)` - не работает с WEBP. Версии ниже - не генерируют, а только сжимают изображния в формате WEBP. 
Для работы с WEBP используется плагин - `imagemin-webp-webpack-plugin`