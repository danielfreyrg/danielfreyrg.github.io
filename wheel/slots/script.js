document.addEventListener('DOMContentLoaded', function() {
  const swipers = document.querySelectorAll('.swiper-container');
  if (swipers) {
  swipers.forEach((container, index) => {
      const swiper = new Swiper(container, {
          direction: 'vertical',
          slidesPerView: 3,
          centeredSlides: true,
          loop: true,
          mousewheel: true,
          grabCursor: true,
          spaceBetween: 30,
    loopedSlides: 10
      });

      // Add an event listener for when the slide changes
      swiper.on('slideChange', function () {
          const selectedNumber = swiper.slides[swiper.activeIndex].textContent;
          console.log(`Dial ${index + 1} selected number: ${selectedNumber}`);

          // Example of performing an additional action:
          // Update some part of the webpage with the selected number
          console.log(selectedNumber);
      });
  });
}
});

