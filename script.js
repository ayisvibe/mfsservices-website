document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     Footer year
  ========================= */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* =========================
     Mobile navigation
  ========================= */

  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.getElementById("nav-list");
  const navLinks = document.querySelectorAll(".nav-list a");

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const open = navList.classList.toggle("open");

      navToggle.setAttribute(
        "aria-expanded",
        open
      );
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navList.classList.remove("open");
        navToggle.setAttribute(
          "aria-expanded",
          "false"
        );
      });
    });
  }

  /* =========================
     Scroll animations
  ========================= */

  const animatedElements =
    document.querySelectorAll("[data-animate]");

  if (
    "IntersectionObserver" in window &&
    animatedElements.length
  ) {
    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                "in-view"
              );

              observer.unobserve(
                entry.target
              );
            }
          });
        },
        {
          threshold: 0.15
        }
      );

    animatedElements.forEach((item) =>
      observer.observe(item)
    );
  }

  /* =========================
     Testimonial carousel
  ========================= */

  const track =
    document.querySelector(
      ".carousel-track"
    );

  const prev =
    document.querySelector(
      ".carousel-btn.prev"
    );

  const next =
    document.querySelector(
      ".carousel-btn.next"
    );

  const slides = track
    ? [...track.children]
    : [];

  let current = 0;
  let autoSlide;

  function updateCarousel() {
    if (!track || !slides.length) {
      return;
    }

    track.style.transform =
      `translateX(-${current * 100}%)`;
  }

  function nextSlide() {
    current =
      (current + 1) %
      slides.length;

    updateCarousel();
  }

  function previousSlide() {
    current =
      (current - 1 + slides.length) %
      slides.length;

    updateCarousel();
  }

  if (next) {
    next.addEventListener(
      "click",
      nextSlide
    );
  }

  if (prev) {
    prev.addEventListener(
      "click",
      previousSlide
    );
  }

  if (slides.length > 1) {
    autoSlide = setInterval(
      nextSlide,
      6000
    );

    track.addEventListener(
      "mouseenter",
      () => clearInterval(autoSlide)
    );

    track.addEventListener(
      "mouseleave",
      () => {
        autoSlide = setInterval(
          nextSlide,
          6000
        );
      }
    );
  }

  /* =========================
     Contact form
  ========================= */

  const form =
    document.getElementById(
      "contactForm"
    );

  const status =
    document.getElementById(
      "formStatus"
    );

  if (form && status) {
    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();

        const data =
          new FormData(form);

        const name =
          data.get("name");

        const email =
          data.get("email");

        const message =
          data.get("message");

        if (
          !name ||
          !email ||
          !message
        ) {
          status.textContent =
            "Please complete all required fields.";

          return;
        }

        const subject =
          encodeURIComponent(
            "MFS Services enquiry from website"
          );

        const body =
          encodeURIComponent(
            `Name: ${name}

Email: ${email}

Phone: ${
              data.get(
                "phone"
              ) || "N/A"
            }

Message:

${message}`
          );

        status.textContent =
          "Preparing your message...";

        setTimeout(() => {
          window.location.href =
            `mailto:clientservices@mfsservicesng.com?subject=${subject}&body=${body}`;

          status.textContent =
            "If your email application didn't open, please contact us directly.";

          form.reset();
        }, 500);
      }
    );
  }

  /* =========================
     WhatsApp modal
  ========================= */

  const waBtn =
    document.getElementById(
      "whatsappBtn"
    );

  const modal =
    document.getElementById(
      "waModal"
    );

  const closeBtn =
    document.querySelector(
      ".modal-close"
    );

  const copyBtn =
    document.getElementById(
      "copyWa"
    );

  function openModal() {
    if (!modal) return;

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    closeBtn?.focus();
  }

  function closeModal() {
    if (!modal) return;

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    waBtn?.focus();
  }

  waBtn?.addEventListener(
    "click",
    openModal
  );

  closeBtn?.addEventListener(
    "click",
    closeModal
  );

  modal?.addEventListener(
    "click",
    (event) => {
      if (
        event.target === modal
      ) {
        closeModal();
      }
    }
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Escape"
      ) {
        closeModal();
      }
    }
  );

  copyBtn?.addEventListener(
    "click",
    async () => {
      try {
        await navigator.clipboard.writeText(
          "+2348123456789"
        );

        copyBtn.textContent =
          "Copied!";

        setTimeout(() => {
          copyBtn.textContent =
            "Copy Number";
        }, 1500);
      } catch {
        copyBtn.textContent =
          "Copy failed";
      }
    }
  );

  /* =========================
     Three.js AI background
  ========================= */

  const background =
    document.getElementById(
      "background-animation"
    );

  if (
    background &&
    window.THREE
  ) {
    const scene =
      new THREE.Scene();

    const camera =
      new THREE.PerspectiveCamera(
        75,
        window.innerWidth /
          window.innerHeight,
        0.1,
        1000
      );

    const renderer =
      new THREE.WebGLRenderer({
        alpha: true
      });

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    background.appendChild(
      renderer.domElement
    );

    const geometry =
      new THREE.BufferGeometry();

    const vertices = [];

    for (
      let i = 0;
      i < 1000;
      i++
    ) {
      vertices.push(
        (Math.random() - 0.5) *
          1000
      );

      vertices.push(
        (Math.random() - 0.5) *
          1000
      );

      vertices.push(
        (Math.random() - 0.5) *
          1000
      );
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        vertices,
        3
      )
    );

    const material =
      new THREE.PointsMaterial({
        size: 2
      });

    const particles =
      new THREE.Points(
        geometry,
        material
      );

    scene.add(particles);

    camera.position.z = 300;

    function animate() {
      requestAnimationFrame(
        animate
      );

      particles.rotation.x +=
        0.0002;

      particles.rotation.y +=
        0.0005;

      renderer.render(
        scene,
        camera
      );
    }

    animate();

    window.addEventListener(
      "resize",
      () => {
        camera.aspect =
          window.innerWidth /
          window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
          window.innerWidth,
          window.innerHeight
        );
      }
    );
  }
});
