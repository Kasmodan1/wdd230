
const placeholderImage = document.querySelectorAll('.placeholder-image[data-src]')

const placeObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      const src = img.getAttribute('data-src');
      if (src) {
        const newImage = new Image();
        newImage.src = src;
        newImage.onload = () => {
          img.setAttribute('src', src);
          img.classList.add('loaded');
          // Hide the placeholder image
          //const placeholder = img.previousElementSibling;
          //if (placeholder && placeholder.classList.contains('placeholder-image')) {
          //  placeholder.style.display = 'none';
          //
        };
      }
      placeObserver.unobserve(img);
    }
  });
});

placeholderImage.forEach(image => {
  placeObserver.observe(image);
});






//const lazyImages = document.querySelectorAll('.lazy-image');
//
//const observer = new IntersectionObserver((entries, observer) => {
//  entries.forEach(entry => {
//    if (entry.isIntersecting) {
//      const img = entry.target;
//      const src = img.getAttribute('data-src');
//      if (src) {
//        const newImage = new Image();
//        newImage.src = src;
//        newImage.onload = () => {
//          img.setAttribute('src', src);
//          img.classList.add('loaded');
//          // Hide the placeholder image
//          const placeholder = img.previousElementSibling;
//          if (placeholder && placeholder.classList.contains('placeholder-image')) {
//            placeholder.style.display = 'none';
//          }
//        };
//      }
//      observer.unobserve(img);
//    }
//  });
//});
//
//lazyImages.forEach(image => {
//  observer.observe(image);
//});
//

