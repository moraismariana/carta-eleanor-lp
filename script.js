let screenWidth = window.innerWidth;
const splideOptions = {
  autoplay: true,
  arrows: true,
  drag: false,
  pauseOnHover: false,
  pagination: false,

  interval: 10000,
  speed: 1100,
  //   updateOnMove: true,
  focus: "center",
  //   slideFocus: true,
  type: "loop",
  fixedWidth: "62.5%",
  gap: "28px",

  breakpoints: {
    1024: {
      fixedWidth: "80%",
      gap: "20px",
    },
    480: {
      fixedWidth: "95%",
      gap: "20px",
      arrows: false,
    },
  },
};

new Splide(".splide", splideOptions).mount();
