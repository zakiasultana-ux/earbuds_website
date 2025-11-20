(() => {
  console.log("welcome to earbud js");

  // pluging

  gsap.registerPlugin(ScrollTrigger);

  // variable

  const hotspots = document.querySelectorAll(".Hotspot");
  const hamburger = document.querySelector(".hanburger");
  const navMenu = document.querySelector(".main-nav nav ul");
  const navLinks = document.querySelectorAll(".main-nav nav ul li a");
  const isMobile = window.innerWidth;
  const canvas = document.querySelector("#explode-view");
  const context = canvas.getContext("2d");
  const framecount = 599;
  const divisor = document.querySelector("#divisor");
  const slider = document.querySelector("#slider");
  const soundContainer = document.querySelector('soundContainer');
  const barWidth = 10;
  const animationDelayPattern = [0, 0.1, 0.2, 0.3, 0.4, 0.5];
  const colorSequence = ['#008DD5', '#FFF38E', '#e2e2e0', '#767575', '#1f2937', '#64a9d5'];
  const scaleSequence = [0.3, 1, 0.3, 1, 0.3, 1, 0.3];

  const infoboxes = [
    {
      title: "Charging Points",
      text: "Power up your earbuds anytime — quick, seamless charging points just for you.",
      image: "images/charging.png",
      alt: "air icon",
    },
    {
      title: "Earphone Rubber",
      text: "Designed for comfort and stability — our earphone rubbers adapt perfectly to your ears.",
      image: "images/wireless.png",
      alt: "air icon",
    },
    {
      title: "Play/Pause",
      text: "Just tap once to play or pause your music — quick, easy, and effortless.",
      image: "images/P_P.png",
      alt: "air icon",
    },
    {
      title: "Speaker",
      text: "Big sound, small size — these speakers make every beat hit just right.",
      image: "images/speaker.png",
      alt: "air icon",
    },
  ];
  const images = [];

  const buds = {
    frame: 0,
  };

  // set up canvas

  canvas.width = 1920;
  canvas.height = 1080;

  // controls

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");

      navMenu.classList.toggle("active");

      const isExpanded = hamburger.classList.contains("active");
      hamburger.setAttribute("aria-expanded", isExpanded);
      hamburger.setAttribute(
        "aria-label",
        isExpanded ? "Close menu" : "Open menu"
      );
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (isMobile < 768) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.setAttribute("aria-label", "Open menu");
      }
    });
  });

  for (let i = 0; i < framecount; i++) {
    const img = new Image();
    img.src = `images/images_webp/earbuds${i.toString().padStart(3, "0")}.webp`;
    images.push(img);
  }

  console.log(images);

  gsap.to(buds, {
    frame: framecount - 1,
    snap: "frame",
    scrollTrigger: {
      trigger: "#explode-view",
      pin: true,
      scrub: 1,
      start: "top 120px",
      // markers: true
    },
    onUpdate: render,
  });

  images[0].addEventListener("load", render);

  // functions

  function toggleMenu(event) {
    console.log("toggle menu is called");
    const isClickInsideNav = event.target.closest(".main-nav");
    const isMenuOpen = navMenu?.classList.contains("active");

    if (!isClickInsideNav && isMenuOpen) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", "Open menu");
    }
  }

  function resizeScreen() {
    console.log("resize screen function is called");

    gsap.killTweensOf('.bar');
            renderBars();

    if (isMobile > 768) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", "Open menu");

      document.querySelectorAll(".info-container").forEach((el) => el.remove());
    } else {
      textinfodisplay();
    }
  }

  function loadinfo() {
    console.log("loadinfo is called");
    infoboxes.forEach((infobox, index) => {
      console.log(index + 1);

      let selected = document.querySelector(`#hotspot-${index + 1}`);
      console.log(selected);

      const containerDiv = document.createElement("div");
      const titleelement = document.createElement("h2");
      const textelement = document.createElement("p");
      const imageelement = document.createElement("img");

      titleelement.textContent = infobox.title;
      textelement.textContent = infobox.text;
      imageelement.src = infobox.image;
      imageelement.alt = infobox.alt;

      containerDiv.appendChild(imageelement);
      containerDiv.appendChild(titleelement);
      selected.appendChild(containerDiv);
      selected.appendChild(textelement);
    });
  }

  function textinfodisplay() {
    console.log("mobile view text is called");

    const textInfo = document.querySelector("#text-info");

    if (isMobile > 768) {
      console.log("Desktop view detected, skipping mobile text display");
      return;
    } else {
      console.log("mobile view text is called");

      textInfo.innerHTML = "";

      infoboxes.forEach((infobox, index) => {
        const containerDiv = document.createElement("div");
        const childDiv = document.createElement("div");
        const childDiv2 = document.createElement("div");
        const titleElement = document.createElement("h2");
        const textElement = document.createElement("p");
        const imageElement = document.createElement("img");

        containerDiv.classList.add("info-wrapper");
        childDiv2.classList.add("info-container");
        imageElement.classList.add("info-image");
        containerDiv.id = `hotspot-${index + 1}`;

        containerDiv.classList.remove("hidden");
        childDiv.classList.remove("hidden");

        titleElement.textContent = infobox.title;
        textElement.textContent = infobox.text;
        imageElement.src = infobox.image;
        imageElement.alt = infobox.alt;

        childDiv2.appendChild(imageElement);
        childDiv2.appendChild(titleElement);
        childDiv.appendChild(childDiv2);
        childDiv.appendChild(textElement);

        containerDiv.appendChild(childDiv);

        textInfo.appendChild(containerDiv);

        gsap.from(containerDiv, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out",
        });

        gsap.from(containerDiv.children, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          delay: index * 0.2 + 0.3,
          ease: "power2.out",
        });
      });
    }
  }

  function showInfo() {
    console.log("showinfo is called");
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, { duration: 1, autoAlpha: 1 });
  }

  function hideInfo() {
    console.log("hideinfo is called");
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, { duration: 1, autoAlpha: 0 });
  }

  function render() {
    console.log("render function is called");
    console.log(buds.frame);
    console.log(images[buds.frame]);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[buds.frame], 0, 0);
  }

  function movedivisor() {
    console.log(slider.value);
    divisor.style.width = `${slider.value}%`;
  }

  function resetslider() {
    slider.value = 50;
  }

  function getGapSize() {
            const screenWidth = window.innerWidth;
            
            if (screenWidth >= 1024) {
                return 4;
            } else if (screenWidth >= 768) {
                return 3;
            } else {
                return 2;
            }
        }

        function calculateBarCount() {
            const screenWidth = window.innerWidth;
            const gapSize = getGapSize();
            const totalBarWidth = barWidth + gapSize;
            const numberOfBars = Math.floor(screenWidth / totalBarWidth);
            
            return numberOfBars;
        }

        function createBar(index) {
            const bar = document.createElement('div');
            bar.className = 'bar';
            
            return bar;
        }

        function animateBar(bar, delay) {
            const timeline = gsap.timeline({
                repeat: -1,
                delay: delay
            });

            timeline.to(bar, {
                scaleY: scaleSequence[0],
                backgroundColor: colorSequence[0],
                duration: 0.5,
                ease: 'power1.inOut'
            });

            timeline.to(bar, {
                scaleY: scaleSequence[1],
                backgroundColor: colorSequence[1],
                duration: 0.5,
                ease: 'power1.inOut'
            });

            timeline.to(bar, {
                scaleY: scaleSequence[2],
                backgroundColor: colorSequence[2],
                duration: 0.5,
                ease: 'power1.inOut'
            });

            timeline.to(bar, {
                scaleY: scaleSequence[3],
                backgroundColor: colorSequence[3],
                duration: 0.5,
                ease: 'power1.inOut'
            });

            timeline.to(bar, {
                scaleY: scaleSequence[4],
                backgroundColor: colorSequence[4],
                duration: 0.5,
                ease: 'power1.inOut'
            });

            timeline.to(bar, {
                scaleY: scaleSequence[5],
                backgroundColor: colorSequence[5],
                duration: 0.5,
                ease: 'power1.inOut'
            });
        }

        function renderBars() {
            soundContainer.innerHTML = '';
            const barCount = calculateBarCount();
            
            for (let i = 0; i < barCount; i++) {
                const bar = createBar(i);
                soundContainer.appendChild(bar);
                
                const delayIndex = i % animationDelayPattern.length;
                const animationDelay = animationDelayPattern[delayIndex];
                
                animateBar(bar, animationDelay);
            }
        }

  // call functions

  loadinfo();
  resizeScreen();
  textinfodisplay();

  // event listerner

  document.addEventListener("click", toggleMenu);
  window.addEventListener("resize", resizeScreen);
  slider.addEventListener("input", movedivisor);
  window.addEventListener("load", resetslider);
  window.addEventListener('load', renderBars);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

  
})();
