const lazyImages = document.querySelectorAll('.lazy-image');
const observer = new IntersectionObserver((items, observer) => {
  items.forEach(item => {
    if (item.isIntersecting) {
      const img = item.target;
      const src = img.getAttribute('data-src');
      if (src) {
        const newImage = new Image();
        newImage.src = src;
        newImage.onload = () => {
          img.setAttribute('src', src);
          img.classList.add('loaded');
          img.parentNode.removeChild(img.nextSibling); // Remove the placeholder text
        };
      }
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach(image => {
  observer.observe(image);
});
