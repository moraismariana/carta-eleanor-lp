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
};

new Splide(".splide", splideOptions).mount();
