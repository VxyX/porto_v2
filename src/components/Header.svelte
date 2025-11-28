<script>
    import { onMount } from 'svelte';
    import { gsap } from '../utils/gsapSetup';
    import { scrollToSection } from '../utils/gsapAnimations';

    let header;
    let mobileMenuOpen = false;

    onMount(() => {
        // Animasi header saat dimuat
        gsap.from(header, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        // Animasi untuk setiap item navigasi
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            gsap.from(item, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                delay: 0.2 + (index * 0.1),
                ease: "power2.out"
            });
        });
    });

    function toggleMobileMenu() {
        mobileMenuOpen = !mobileMenuOpen;
    }
</script>

<nav
    bind:this={header}
    class="fixed top-0 w-full bg-gradient-to-r from-dark-900/80 to-dark-800/80 backdrop-blur-xl z-50 py-4 px-6 shadow-lg border-b border-purple-500/20"
>
    <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="text-xl font-bold text-gradient-purple flex items-center">
            <span class="mr-2"> &lt;/&gt; </span> Programmer Svelte
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
            {#each ['Beranda', 'Tentang', 'Keterampilan', 'Proyek', 'Kontak'] as item, i}
                <a
                    href="#{item.toLowerCase()}"
                    class="nav-item px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-300 cursor-pointer relative group"
                    on:click|preventDefault={() => scrollToSection(item.toLowerCase())}
                >
                    {item}
                    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-purple-blue transition-all duration-300 group-hover:w-full"></span>
                </a>
            {/each}
        </div>

        <!-- Mobile menu button -->
        <button
            class="md:hidden text-gray-300 hover:text-white p-2 rounded-lg hover:bg-purple-600/20 transition-colors duration-300"
            on:click={toggleMobileMenu}
        >
            {#if !mobileMenuOpen}
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            {:else}
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            {/if}
        </button>
    </div>

    <!-- Mobile Navigation -->
    {#if mobileMenuOpen}
        <div class="md:hidden mt-4 py-4 px-6 bg-gradient-card rounded-xl shadow-lg border border-purple-500/20">
            {#each ['Beranda', 'Tentang', 'Keterampilan', 'Proyek', 'Kontak'] as item, i}
                <a
                    href="#{item.toLowerCase()}"
                    class="block py-3 px-4 rounded-lg text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-300 cursor-pointer mb-2 first:mt-0 last:mb-0"
                    on:click|preventDefault={() => { scrollToSection(item.toLowerCase()); mobileMenuOpen = false; }}
                >
                    {item}
                </a>
            {/each}
        </div>
    {/if}
</nav>