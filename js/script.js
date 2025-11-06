(() => {
    console.log("welcome to earbud js");

    // variable

    const hotspots = document.querySelectorAll(".Hotspot");
    const hamburger = document.querySelector('.hanburger');
    const navMenu = document.querySelector('.main-nav nav ul');
    const navLinks = document.querySelectorAll('.main-nav nav ul li a');
    const infoboxes = [
        {
            title: "Charging Points",
            text: "Noise-cancelling microphones and a rear copper shield are optimally placed to quickly detect outside noises, working together to counter noise before it disturbs your experience.",
            image: "images/ar_icon.png",
            alt: "air icon"
        },
        {
            title: "Earphone Rubber",
            text: "Three pairs of ultra comfortable silicone tips are included. The tips create an acoustic seal that blocks outside audio and secures the earbuds in place.",
            image: "images/ar_icon.png",
            alt: "air icon"
        },
        {
            title: "Play/Pause",
            text: "360 Audio places sound all around you, while Dolby Head Tracking™ technology delivers an incredible three-dimensional listening experience.",
            image: "images/ar_icon.png",
            alt: "air icon"
        },
        {
            title: "Speaker",
            text: "Charge your earbuds in 30 minutes or less with our hyper charging technology.",
            image: "images/ar_icon.png",
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

    function toggleMenu(event){
        const isClickInsideNav = event.target.closest('.main-nav');
    const isMenuOpen = navMenu?.classList.contains('active');

    if (!isClickInsideNav && isMenuOpen) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
    }
    }

    function resizeScreen(){
        if (window.innerWidth >= 768) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
    }
    }

    function loadinfo() {
        infoboxes.forEach((infobox, index) => {
            console.log(index + 1);
            let selected = document.querySelector(`#hotspot-${index + 1}`);
            console.log(selected);

            const titleelement = document.createElement('h2');
            titleelement.textContent = infobox.title;
            const textelement = document.createElement('p');
            textelement.textContent = infobox.text;
            const imageelement = document.createElement('img');
            imageelement.src = infobox.image;
            imageelement.alt = infobox.alt;
            selected.appendChild(imageelement);
            selected.appendChild(titleelement);
            selected.appendChild(textelement);
        });
    }

    loadinfo();

    function showInfo() {
        let selected = document.querySelector(`#${this.slot}`);
        gsap.to(selected, { duration: 1, autoAlpha: 1 });
    }

    function hideInfo() {
        let selected = document.querySelector(`#${this.slot}`);
        gsap.to(selected, { duration: 1, autoAlpha: 0 });
    }

    hotspots.forEach(function (hotspot) {
        hotspot.addEventListener("mouseenter", showInfo);
        hotspot.addEventListener("mouseleave", hideInfo);
    });

    // event listerner 

    document.addEventListener('click', toggleMenu);
    window.addEventListener('resize', resizeScreen);

})();