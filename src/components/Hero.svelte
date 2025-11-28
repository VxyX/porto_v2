<script>
    import { personalInfo } from '../data/portfolioData';
    import { onMount } from 'svelte';
    import { gsap } from '../utils/gsapSetup';
    import { scrollToSection } from '../utils/gsapAnimations';

    let heroTitle;
    let heroSubtitle;
    let heroButton;
    let heroImage;

    onMount(() => {
        // Animasi untuk bagian teks
        gsap.from([heroTitle, heroSubtitle], {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });

        // Animasi untuk tombol
        gsap.from(heroButton, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.5,
            ease: "power3.out"
        });

        // Animasi untuk gambar
        gsap.from(heroImage, {
            x: 100,
            opacity: 0,
            duration: 1.2,
            delay: 0.3,
            ease: "power3.out"
        });

        // Animasi float untuk gambar
        gsap.to(heroImage, {
            y: -10,
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });
    });

    function handleButtonClick() {
        scrollToSection('proyek');
    }
</script>

<section id="beranda" class="relative min-h-screen flex items-center pt-16 overflow-hidden">
    <!-- Animated background elements -->
    <div class="animated-bg-element bg-purple"></div>
    <div class="animated-bg-element bg-blue"></div>

    <!-- Grid pattern overlay -->
    <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>

    <div class="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
            <p class="text-lg text-purple-400 mb-2 animate-on-load">Halo, saya</p>
            <h1 bind:this={heroTitle} class="text-hero font-bold text-white mb-4">
                <span class="text-gradient-purple">{personalInfo.name}</span>
            </h1>
            <p bind:this={heroSubtitle} class="text-subhero text-gray-300 mb-8">
                {personalInfo.title}
            </p>
            <p class="text-gray-400 mb-10 max-w-lg">
                {personalInfo.bio}
            </p>
            <div class="flex flex-wrap gap-4">
                <button
                    bind:this={heroButton}
                    class="bg-gradient-purple-blue text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
                    on:click={handleButtonClick}
                >
                    Lihat Proyek Saya
                </button>
                <button
                    class="border-2 border-purple-500 text-purple-400 hover:text-white hover:bg-purple-600 font-bold py-4 px-8 rounded-full transition-all duration-300"
                    on:click={() => scrollToSection('kontak')}
                >
                    Hubungi Saya
                </button>
            </div>

            <!-- Social icons -->
            <div class="flex space-x-6 mt-10">
                {#each [
                    { name: 'github', url: 'https://github.com', icon: 'G' },
                    { name: 'linkedin', url: 'https://linkedin.com', icon: 'L' },
                    { name: 'twitter', url: 'https://twitter.com', icon: 'X' },
                    { name: 'email', url: 'mailto:programmer@contoh.com', icon: 'E' }
                ] as social, i}
                    <a
                        href={social.url}
                        class="w-12 h-12 rounded-full bg-dark-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-purple-600 transition-all duration-300 transform hover:scale-110"
                        aria-label={social.name}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {social.icon}
                    </a>
                {/each}
            </div>
        </div>
        <div bind:this={heroImage} class="flex justify-center relative">
            <div class="relative">
                <!-- Main profile image container -->
                <div class="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 p-1">
                    <div class="w-full h-full rounded-2xl bg-dark-900 flex items-center justify-center overflow-hidden">
                        <div class="bg-gray-200 border-2 border-dashed rounded-xl w-56 h-56 md:w-72 md:h-72 flex items-center justify-center">
                            <span class="text-dark-900 text-lg font-bold">FOTO</span>
                        </div>
                    </div>
                </div>

                <!-- Decorative elements -->
                <div class="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-purple-500/20 backdrop-blur-sm"></div>
                <div class="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-blue-500/20 backdrop-blur-sm"></div>
            </div>
        </div>
    </div>
</section>