// eslint-disable-next-line no-undef
module.exports = {
    content: ['build/index.html', 'build/*.html', 'build/assets/*.js'],
    css: ['build/assets/*.css'],
    safelist: [
      'body', 'html', 'active', 'show', 'fade', 'collapse', 'collapsing', 
      'navbar-collapse', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'card', 'card-body', 'card-text', 'container', 'row',
      'col', 'col-md-5', 'mx-auto', 'text-muted', 'small',
      'row-cols-1', 'row-cols-md-2', 'row-cols-lg-3', 'g-4',
      'mb-4', 'bg-light', 'h-100', 'py-4'
    ],
    output: 'build/assets',
  };