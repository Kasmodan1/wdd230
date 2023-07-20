// JavaScript for the parallax effect
document.addEventListener('DOMContentLoaded', function () {
  const parallaxLayer = document.querySelector('.parallax-layer');
  let scrollPosition = 0;

  function updateParallaxPosition() {
    parallaxLayer.style.transform = `translate3d(0, ${-scrollPosition}px, 0)`;
  }

  function onScroll() {
    scrollPosition = window.scrollY;
    requestAnimationFrame(updateParallaxPosition);
  }

  window.addEventListener('scroll', onScroll);
});