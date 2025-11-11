(() => {
  console.log("welcome to earbud js");

  // variable

  const hotspots = document.querySelectorAll(".Hotspot");
  const hamburger = document.querySelector('.hanburger');
  const navMenu = document.querySelector('.main-nav nav ul');
  const navLinks = document.querySelectorAll('.main-nav nav ul li a');
  const isMobile = window.innerWidth > 768;

  const infoboxes = [
    {
      title: "Charging Points",
      text: "Power up your earbuds anytime — quick, seamless charging points just for you.",
      image: "images/charging.png",
      alt: "air icon"
    },
    {
      title: "Earphone Rubber",
      text: "Designed for comfort and stability — our earphone rubbers adapt perfectly to your ears.",
      image: "images/wireless.png",
      alt: "air icon"
    },
    {
      title: "Play/Pause",
      text: "Just tap once to play or pause your music — quick, easy, and effortless.",
      image: "images/P_P.png",
      alt: "air icon"
    },
    {
      title: "Speaker",
      text: "Big sound, small size — these speakers make every beat hit just right.",
      image: "images/speaker.png",
      alt: "air icon"
    }
  ];

  // controls 

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');

      navMenu.classList.toggle('active');

      const isExpanded = hamburger.classList.contains('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
      hamburger.setAttribute('aria-label', isExpanded ? 'Close menu' : 'Open menu');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open menu');
      }
    });
  });

  // functions

  function toggleMenu(event) {
    console.log("toggle menu is called");
    const isClickInsideNav = event.target.closest('.main-nav');
    const isMenuOpen = navMenu?.classList.contains('active');

    if (!isClickInsideNav && isMenuOpen) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
    }
  }

  function resizeScreen() {
    console.log("resize screen function is called");

    if (isMobile) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');

      document.querySelectorAll('.info-container').forEach(el => el.remove());
      
    } else {
      textinfodisplay();
    }

    const hotspots = document.querySelectorAll('.Hotspot');
    hotspots.forEach(hotspot => {
      if (isMobile) {
        hotspot.classList.remove('hidden');
        console.log("hidden is removing ");
      } else {
        hotspot.classList.add('hidden');
        console.log("hidden is added ");
      }
    });
  }

  function loadinfo() {
    console.log("loadinfo is called");
    infoboxes.forEach((infobox, index) => {
      console.log(index + 1);

      let selected = document.querySelector(`#hotspot-${index + 1}`);
      console.log(selected);

      const containerDiv = document.createElement('div');
      const titleelement = document.createElement('h2');
      const textelement = document.createElement('p');
      const imageelement = document.createElement('img');

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

    const textInfo = document.querySelector('#text-info');

    if(isMobile){
      console.log("Desktop view detected, skipping mobile text display");
      textInfo.classList.add('hidden');
      return;
    } else {

    console.log("mobile view text is called");

    textInfo.innerHTML = '';

    infoboxes.forEach((infobox, index) => {
      
      const containerDiv = document.createElement('div');
      const childDiv = document.createElement('div');
      const titleElement = document.createElement('h2');
      const textElement = document.createElement('p');
      const imageElement = document.createElement('img');

      containerDiv.classList.add('info-wrapper');
      childDiv.classList.add('info-container');
      containerDiv.id = `hotspot-${index + 1}`;

      // ensure elements are visible (remove any 'hidden' class if present)
      containerDiv.classList.remove('hidden');
      childDiv.classList.remove('hidden');

      // basic layout so each info block stacks nicely inside the scrollable area
      containerDiv.style.display = 'block';
      containerDiv.style.width = '100%';
      containerDiv.style.marginBottom = '1rem';
      childDiv.style.display = 'flex';
      childDiv.style.flexDirection = 'column';
      childDiv.style.gap = '0.5rem';
      
      titleElement.textContent = infobox.title;
      textElement.textContent = infobox.text;
      imageElement.src = infobox.image;
      imageElement.alt = infobox.alt;
      imageElement.style.maxWidth = '100%';
      imageElement.style.height = 'auto';
      imageElement.style.display = 'block';

      childDiv.appendChild(imageElement);
      childDiv.appendChild(titleElement);
      childDiv.appendChild(textElement);

      containerDiv.appendChild(childDiv);

      textInfo.appendChild(containerDiv);

      gsap.from(containerDiv, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power3.out"
      });

      gsap.from(containerDiv.children, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        delay: index * 0.2 + 0.3,
        ease: "power2.out"
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

  // call functions 

  loadinfo();
  resizeScreen();
  textinfodisplay();

  // event listerner 

  document.addEventListener('click', toggleMenu);
  window.addEventListener('resize', resizeScreen);
  
  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();