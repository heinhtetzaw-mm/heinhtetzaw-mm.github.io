const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        const start = window.pageYOffset;
        const end = target.offsetTop - 68;
        const distance = end - start;
        const duration = 700;

        let startTime = null;

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, start, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    });
});

window.addEventListener("scroll", () => {
    let current = "";

    const scrollPosition = window.scrollY + 200;
    const pageBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    if (pageBottom) {
        current = "contact";
    }

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});

lucide.createIcons();