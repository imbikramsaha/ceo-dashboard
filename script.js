        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const tabs = document.querySelectorAll('.slider-tab');

        function showSlide(index) {
            if (index >= slides.length) index = 0;
            if (index < 0) index = slides.length - 1;
            currentSlide = index;
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) slide.classList.add('active');
            });
            tabs.forEach((tab, i) => {
                tab.classList.remove('active');
                if (i === index) tab.classList.add('active');
            });
        }

        function nextSlide() { showSlide(currentSlide + 1); }
        function previousSlide() { showSlide(currentSlide - 1); }

        let autoSlideInterval = setInterval(nextSlide, 8000);

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 8000);
        }

        tabs.forEach((tab) => {
            tab.addEventListener('click', () => resetAutoSlide());
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') { previousSlide(); resetAutoSlide(); }
            else if (e.key === 'ArrowRight') { nextSlide(); resetAutoSlide(); }
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.benefit-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `all 0.5s ease ${index * 0.08}s`;
            observer.observe(card);
        });
