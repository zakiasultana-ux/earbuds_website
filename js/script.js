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