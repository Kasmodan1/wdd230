
// This is the load the placeholder image first
const placeholderImages = document.querySelectorAll('.placeholder-image[data-src]');
const placeObserver = new IntersectionObserver((entries, placeObserver) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const placeholder = entry.target;
      const img = placeholder;
      const src = img.getAttribute('data-src');
      
      // Set the placeholder image as the source initially
      placeholder.style.backgroundImage = `url("${src}")`;

      //takes focus away
      placeObserver.unobserve(placeholder);
    }
  });

});

placeholderImages.forEach(placeholder => {
  placeObserver.observe(placeholder);
});




// this loads my real image that I wanted to load.
const lazyImages = document.querySelectorAll('.lazy-image');

const observer = new IntersectionObserver((entries, observer) => {
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
          const placeholder = img.previousElementSibling;
          if (placeholder && placeholder.classList.contains('placeholder-image')) {
            placeholder.style.display = 'none';
          }
        };
      }
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach(image => {
  observer.observe(image);
});
