<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from '../utils/gsapSetup';
  import { scrollToSection } from '../utils/gsapAnimations';
  import { currentLang, setLanguage, type Language } from '../stores/langStore';
  import { getPortfolioData } from '../data/portfolioData';

  export let isDark: boolean = true;
  export let toggleTheme: () => void = () => {};

  let header: HTMLElement;
  let mobileMenuOpen = false;
  let isSticky = false;

  $: activeData = getPortfolioData($currentLang);
  $: personalInfo = activeData.personalInfo;

  onMount(() => {
    const handleScroll = () => {
      const hero = document.getElementById('beranda');
      if (hero) {
        const heroRect = hero.getBoundingClientRect();
        // Stick to top as soon as Hero section bottom reaches near top of window
        isSticky = heroRect.bottom <= 60;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        header,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      ).fromTo(
        '.nav-item',
        { y: -10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
        },
        '-=0.4'
      );
    }, header);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  });

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<div class="relative w-full z-50 min-h-[68px]">
  <nav
    bind:this={header}
    class="{isSticky ? 'fixed top-0 left-0 right-0 shadow-2xl border-b' : 'relative border-y'} w-full z-50 py-4 px-6 transition-all duration-300"
    style="
      background: var(--bg-nav);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border-color: var(--border-subtle);
    "
  >
  <div class="max-w-7xl mx-auto flex justify-between items-center">

    <!-- Brand -->
    <div class="text-xl font-bold text-gradient-purple flex items-center select-none">
      <span class="mr-2">&lt;/&gt;</span> MFR
    </div>

    <!-- Desktop Navigation -->
    <div class="hidden md:flex items-center space-x-1">
      {#each activeData.nav as item}
        <a
          href="#{item.key}"
          class="nav-item px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer relative group text-sm font-medium"
          style="color: var(--text-secondary);"
          on:click|preventDefault={() => scrollToSection(item.key)}
          on:mouseover={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          on:mouseleave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          on:focus={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          on:blur={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          {item.label}
          <!-- Underline accent -->
          <span
            class="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full"
            style="background: var(--theme-grad);"
          ></span>
        </a>
      {/each}

      <!-- Language Selector -->
      <div class="flex items-center gap-1 p-1 rounded-full border ml-3 text-xs font-semibold" style="background: var(--bg-card); border-color: var(--border-subtle);">
        {#each ['id', 'en', 'jp'] as lang}
          <button
            class="px-2.5 py-1 rounded-full transition-all duration-200 uppercase"
            style={$currentLang === lang ? 'background: var(--theme-purple); color: #fff;' : 'color: var(--text-muted); background: transparent;'}
            on:click={() => setLanguage(lang as Language)}
          >
            {lang}
          </button>
        {/each}
      </div>

      <!-- Theme toggle -->
      <button
        class="theme-toggle ml-2"
        on:click={toggleTheme}
        aria-label="Toggle theme"
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {#if isDark}
          <!-- Sun icon — switch to light -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        {:else}
          <!-- Moon icon — switch to dark -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        {/if}
      </button>
    </div>

    <!-- Mobile: language toggle + hamburger + theme toggle -->
    <div class="md:hidden flex items-center gap-2">
      <!-- Language Selector Mobile -->
      <div class="flex items-center gap-1 p-0.5 rounded-full border text-xs font-semibold" style="background: var(--bg-card); border-color: var(--border-subtle);">
        {#each ['id', 'en', 'jp'] as lang}
          <button
            class="px-2 py-0.5 rounded-full transition-all duration-200 uppercase text-[10px]"
            style={$currentLang === lang ? 'background: var(--theme-purple); color: #fff;' : 'color: var(--text-muted); background: transparent;'}
            on:click={() => setLanguage(lang as Language)}
          >
            {lang}
          </button>
        {/each}
      </div>

      <button
        class="theme-toggle"
        on:click={toggleTheme}
        aria-label="Toggle theme"
      >
        {#if isDark}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        {/if}
      </button>

      <button
        class="p-2 rounded-lg transition-colors duration-300"
        style="color: var(--text-secondary); background: transparent;"
        on:click={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        {#if !mobileMenuOpen}
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
          </svg>
        {:else}
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        {/if}
      </button>
    </div>
  </div>

  <!-- Mobile Navigation Menu -->
  {#if mobileMenuOpen}
    <div
      class="md:hidden mt-4 py-4 px-6 rounded-xl shadow-lg border"
      style="background: var(--bg-card); border-color: var(--border-subtle);"
    >
      {#each activeData.nav as item}
        <a
          href="#{item.key}"
          class="block py-3 px-4 rounded-lg transition-all duration-300 cursor-pointer mb-2"
          style="color: var(--text-secondary);"
          on:click|preventDefault={() => { scrollToSection(item.key); mobileMenuOpen = false; }}
          on:mouseover={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)')}
          on:mouseleave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          on:focus={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)')}
          on:blur={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          {item.label}
        </a>
      {/each}
    </div>
  {/if}
</nav>
</div>