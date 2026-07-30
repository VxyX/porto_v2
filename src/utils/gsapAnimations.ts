// utils/gsapAnimations.ts
import { gsap } from './gsapSetup';

// Fungsi untuk animasi scroll ke section
export const scrollToSection = (sectionId: string, onComplete?: () => void) => {
    gsap.to(window, {
        duration: 1,
        scrollTo: { y: `#${sectionId}`, offsetY: 80 },
        ease: "power2.inOut",
        onComplete: onComplete,
    });
};

// Fungsi untuk animasi elemen saat masuk ke viewport
export const animateOnScroll = (element: HTMLElement) => {
    gsap.fromTo(element,
        {
            opacity: 0,
            y: 50,
            scale: 0.95
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                end: "bottom 10%",
                toggleActions: "play none none reverse"
            },
            ease: "power2.out"
        }
    );
};

// Fungsi untuk efek hover pada tombol
export const addButtonHoverEffect = (button: HTMLElement) => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out"
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
        });
    });
};

// Fungsi untuk efek hover pada kartu
export const addCardHoverEffect = (card: HTMLElement) => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -10,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
};

// Fungsi untuk animasi page load
export const animatePageLoad = () => {
    // Animasi untuk elemen-elemen yang sudah ada di halaman
    const elements = document.querySelectorAll('.animate-on-load');
    elements.forEach((el, index) => {
        gsap.fromTo(el,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: index * 0.1,
                ease: "power2.out"
            }
        );
    });
};

// Plugins already registered in gsapSetup.ts on import