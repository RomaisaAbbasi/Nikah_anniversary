/* =========================================================
   HOORAIN & TAIMOOR — ANNIVERSARY WEBSITE
   BOOK / CHAPTER PAGINATION VERSION
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. LOADING SCREEN
  --------------------------------------------------------- */
  const loadingScreen = document.getElementById('loading-screen');

  window.setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 3200);


  /* ---------------------------------------------------------
     2. FLOATING PETALS
  --------------------------------------------------------- */
  const petalLayer = document.getElementById('floating-decor');
  const PETAL_COUNT = 10;

  for (let i = 0; i < PETAL_COUNT; i++) {

    const petal = document.createElement('div');

    petal.className = 'petal';

    petal.style.left = Math.random() * 100 + 'vw';

    petal.style.animationDuration =
      (14 + Math.random() * 10) + 's';

    petal.style.animationDelay =
      (Math.random() * 12) + 's';

    petal.style.opacity =
      (0.25 + Math.random() * 0.3).toFixed(2);

    petal.style.transform =
      `scale(${(0.6 + Math.random() * 0.7).toFixed(2)})`;

    petalLayer.appendChild(petal);
  }


  /* =========================================================
     3. BOOK / CHAPTER PAGINATION
  ========================================================= */

  const sections = Array.from(
    document.querySelectorAll('main > .section')
  );

  let currentPage = 0;


  /*
     Add Previous / Next buttons automatically
     Existing HTML does NOT need to be changed.
  */

  sections.forEach((section, index) => {

    const navigation = document.createElement('div');

    navigation.className = 'chapter-navigation';


    /*
       Inline styles are used here so your CSS file
       remains completely unchanged.
    */

    navigation.style.display = 'flex';

    navigation.style.alignItems = 'center';

    navigation.style.justifyContent = 'center';

    navigation.style.gap = '1rem';

    navigation.style.flexWrap = 'wrap';

    navigation.style.marginTop = '3rem';

    navigation.style.width = '100%';


    /* ---------------- PREVIOUS BUTTON ---------------- */

    if (index > 0) {

      const previousButton =
        document.createElement('button');

      previousButton.className =
        'btn btn-outline chapter-prev';

      previousButton.innerHTML =
        '♡ Previous Chapter';

      previousButton.addEventListener('click', () => {

        showPage(index - 1);

      });

      navigation.appendChild(previousButton);
    }


    /* ---------------- NEXT BUTTON ---------------- */

    if (index < sections.length - 1) {

      const nextButton =
        document.createElement('button');

      nextButton.className =
        'btn btn-primary chapter-next';

      nextButton.innerHTML =
        'Continue Our Story →';

      nextButton.addEventListener('click', () => {

        showPage(index + 1);

      });

      navigation.appendChild(nextButton);
    }


    /*
       Final section gets special button
    */

    if (index === sections.length - 1) {

      const restartButton =
        document.createElement('button');

      restartButton.className =
        'btn btn-outline chapter-restart';

      restartButton.innerHTML =
        '♡ Start Our Story Again';

      restartButton.addEventListener('click', () => {

        showPage(0);

      });

      navigation.appendChild(restartButton);
    }


    section.appendChild(navigation);

  });


  /* ---------------------------------------------------------
     SHOW SELECTED PAGE
  --------------------------------------------------------- */

  function showPage(pageIndex) {

    currentPage = pageIndex;


    sections.forEach((section, index) => {

      if (index === currentPage) {

        section.style.display = 'flex';

        section.style.opacity = '0';

        section.style.transform =
          'translateY(20px)';

        window.setTimeout(() => {

          section.style.transition =
            'opacity 0.6s ease, transform 0.6s ease';

          section.style.opacity = '1';

          section.style.transform =
            'translateY(0)';

        }, 50);


      } else {

        section.style.display = 'none';

      }

    });


    /*
       Always start new chapter from top
    */

    window.scrollTo({

      top: 0,

      behavior: 'smooth'

    });


    /*
       Update navigation links
    */

    updateNavigation();

  }


  /* ---------------------------------------------------------
     INITIAL PAGE
  --------------------------------------------------------- */

  showPage(0);


  /* =========================================================
     4. FLOATING NAVIGATION
  ========================================================= */

  const navToggle =
    document.getElementById('nav-toggle');

  const navMenu =
    document.getElementById('nav-menu');


  function closeNav() {

    navMenu.classList.remove('open');

    navToggle.setAttribute(
      'aria-expanded',
      'false'
    );

  }


  navToggle.addEventListener('click', () => {

    const isOpen =
      navMenu.classList.toggle('open');

    navToggle.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

  });


  document.addEventListener('click', (e) => {

    if (
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {

      closeNav();

    }

  });


  /*
     Floating menu navigation
  */

  function updateNavigation() {

    document
      .querySelectorAll('[data-nav]')
      .forEach((link) => {

        link.onclick = function (e) {

          e.preventDefault();

          const targetId =
            link.getAttribute('href');

          const target =
            document.querySelector(targetId);


          if (!target) return;


          const targetIndex =
            sections.indexOf(target);


          if (targetIndex !== -1) {

            showPage(targetIndex);

          }


          closeNav();

        };

      });

  }


  updateNavigation();


  /* =========================================================
     5. SCROLL REVEAL ANIMATIONS
  ========================================================= */

  const revealEls =
    document.querySelectorAll('.reveal');


  const revealObserver =
    new IntersectionObserver((entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            'is-visible'
          );

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    }, {

      threshold: 0.15

    });


  revealEls.forEach((el) => {

    revealObserver.observe(el);

  });


  /*
     Make the first visible section reveal immediately
  */

  const firstReveals =
    sections[0].querySelectorAll('.reveal');


  firstReveals.forEach((element) => {

    element.classList.add('is-visible');

  });


  /* =========================================================
     6. PHOTO PLACEHOLDER HANDLING
  ========================================================= */

  document
    .querySelectorAll('.photo-frame img')
    .forEach((img) => {

      img.addEventListener('error', () => {

        img.classList.add('broken');


        const label =
          img.parentElement.querySelector(
            '.photo-placeholder-label'
          );


        if (label) {

          label.classList.add('show');

        }

      });


      if (!img.getAttribute('src')) {

        img.dispatchEvent(
          new Event('error')
        );

      }

    });


  /* =========================================================
     7. LOVE NOTES CAROUSEL
  ========================================================= */

  const loveNotes = [

    "You're my favorite person.",

    "I'd choose you again.",

    "Forever feels better with you.",

    "You're my constant.",

    "Our story found its way to us.",

    "My calm in all the chaos.",

    "Us, always.",

    "Love you to the moon and back."

  ];


  const noteText =
    document.getElementById('note-text');

  const notePrev =
    document.getElementById('note-prev');

  const noteNext =
    document.getElementById('note-next');

  const noteDotsWrap =
    document.getElementById('note-dots');


  let noteIndex = 0;


  loveNotes.forEach((_, i) => {

    const dot =
      document.createElement('span');


    if (i === 0) {

      dot.classList.add('active');

    }


    noteDotsWrap.appendChild(dot);

  });


  function renderNote() {

    noteText.style.opacity = 0;


    window.setTimeout(() => {

      noteText.textContent =
        loveNotes[noteIndex];


      noteText.style.opacity = 1;


      Array
        .from(noteDotsWrap.children)
        .forEach((dot, i) => {

          dot.classList.toggle(
            'active',
            i === noteIndex
          );

        });

    }, 180);

  }


  noteText.style.transition =
    'opacity 0.25s ease';


  renderNote();


  notePrev.addEventListener('click', () => {

    noteIndex =
      (noteIndex - 1 + loveNotes.length)
      % loveNotes.length;


    renderNote();

  });


  noteNext.addEventListener('click', () => {

    noteIndex =
      (noteIndex + 1)
      % loveNotes.length;


    renderNote();

  });


  /* =========================================================
     8. LOVE LETTER
  ========================================================= */

  const letterOpenBtn =
    document.getElementById(
      'letter-open-btn'
    );

  const letterPaper =
    document.getElementById(
      'letter-paper'
    );


  letterOpenBtn.addEventListener('click', () => {

    const isHidden =
      letterPaper.hidden;


    if (isHidden) {

      letterPaper.hidden = false;


      letterOpenBtn.textContent =
        'Close Letter';


      letterPaper.scrollIntoView({

        behavior: 'smooth',

        block: 'center'

      });


    } else {

      letterPaper.hidden = true;


      letterOpenBtn.textContent =
        'Read With Love ♡';

    }

  });


  /* =========================================================
     9. LIVE COUNTER
  ========================================================= */

  /*
     CHANGE THIS DATE IF NEEDED
  */

  const nikahDate =
    new Date(
      "September 5, 2025 00:00:00"
    );


  const countDays =
    document.getElementById(
      'count-days'
    );

  const countHours =
    document.getElementById(
      'count-hours'
    );

  const countMinutes =
    document.getElementById(
      'count-minutes'
    );

  const countSeconds =
    document.getElementById(
      'count-seconds'
    );


  function updateCounter() {

    const now = new Date();


    let diff =
      now - nikahDate;


    if (diff < 0) {

      diff = 0;

    }


    const days =
      Math.floor(
        diff /
        (1000 * 60 * 60 * 24)
      );


    const hours =
      Math.floor(
        (diff /
          (1000 * 60 * 60))
        % 24
      );


    const minutes =
      Math.floor(
        (diff /
          (1000 * 60))
        % 60
      );


    const seconds =
      Math.floor(
        (diff / 1000)
        % 60
      );


    countDays.textContent =
      days.toLocaleString();


    countHours.textContent =
      String(hours).padStart(
        2,
        '0'
      );


    countMinutes.textContent =
      String(minutes).padStart(
        2,
        '0'
      );


    countSeconds.textContent =
      String(seconds).padStart(
        2,
        '0'
      );

  }


  updateCounter();


  setInterval(
    updateCounter,
    1000
  );


  /* =========================================================
     10. LITTLE SURPRISE
  ========================================================= */

  const surpriseBtn =
    document.getElementById(
      'surprise-btn'
    );

  const surpriseOverlay =
    document.getElementById(
      'surprise-overlay'
    );

  const surpriseLine2 =
    document.getElementById(
      'surprise-line2'
    );

  const surpriseClose =
    document.getElementById(
      'surprise-close'
    );


  surpriseBtn.addEventListener('click', () => {

    surpriseOverlay.hidden = false;


    surpriseLine2.hidden = true;


    document.body.style.overflow =
      'hidden';


    window.setTimeout(() => {

      surpriseLine2.hidden = false;

    }, 1600);

  });


  function closeSurprise() {

    surpriseOverlay.hidden = true;


    document.body.style.overflow = '';

  }


  surpriseClose.addEventListener(
    'click',
    closeSurprise
  );


  surpriseOverlay.addEventListener(
    'click',
    (e) => {

      if (
        e.target === surpriseOverlay
      ) {

        closeSurprise();

      }

    }
  );


  /* =========================================================
     11. FINAL SECTION
  ========================================================= */

  const finalSection =
    document.getElementById('forever');

  const finalLine1 =
    document.getElementById('final-line1');

  const finalLine2 =
    document.getElementById('final-line2');

  const finalHappy =
    document.getElementById('final-happy');

  const finalDate =
    document.getElementById('final-date');

  const finalDua =
    document.getElementById('final-dua');

  const finalCredit =
    document.getElementById('final-credit');

  const startAgainBtn =
    document.getElementById(
      'start-again'
    );


  let finalSequencePlayed =
    false;


  const finalObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting &&
              !finalSequencePlayed
            ) {

              finalSequencePlayed = true;


              window.setTimeout(() => {

                finalLine1.style.opacity = 0;

              }, 1400);


              window.setTimeout(() => {

                finalLine2.hidden = false;

              }, 1900);


              window.setTimeout(() => {

                finalHappy.hidden = false;

              }, 2900);


              window.setTimeout(() => {

                finalDate.hidden = false;

              }, 3500);


              window.setTimeout(() => {

                finalDua.hidden = false;

              }, 4200);


              window.setTimeout(() => {

                finalCredit.hidden = false;

              }, 5000);


              window.setTimeout(() => {

                startAgainBtn.hidden = false;

              }, 5400);


              finalObserver.unobserve(
                entry.target
              );

            }

          }
        );

      },

      {

        threshold: 0.4

      }

    );


  finalObserver.observe(
    finalSection
  );


  /*
     Original Start Again button
  */

  startAgainBtn.addEventListener(
    'click',
    () => {

      showPage(0);

    }
  );


});