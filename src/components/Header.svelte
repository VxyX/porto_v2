<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from '../utils/gsapSetup';
  import { scrollToSection } from '../utils/gsapAnimations';

  export let isDark: boolean = true;
  export let toggleTheme: () => void = () => {};

  let header: HTMLElement;
  let mobileMenuOpen = false;

  const navItems = ['Beranda', 'Tentang', 'Keterampilan', 'Proyek', 'Kontak'];

  onMount(() => {
    gsap.from(header, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    const items = document.querySelectorAll('.nav-item');
    items.forEach((item, index) => {
      gsap.from(item, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        delay: 0.2 + index * 0.1,
        ease: 'power2.out',
      });
    });
  });

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<nav
  bind:this={header}
  class="fixed top-0 w-full z-50 py-4 px-6 shadow-lg border-b"
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
      <span class="mr-2">&lt;/&gt;</span> Porto V2
    </div>

    <!-- Desktop Navigation -->
    <div class="hidden md:flex items-center space-x-1">
      {#each navItems as item}
        <a
          href="#{item.toLowerCase()}"
          class="nav-item px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer relative group text-sm font-medium"
          style="color: var(--text-secondary);"
          on:click|preventDefault={() => scrollToSection(item.toLowerCase())}
          on:mouseover={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          on:mouseleave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          on:focus={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          on:blur={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          {item}
          <!-- Underline accent -->
          <span
            class="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full"
            style="background: var(--theme-grad);"
          ></span>
        </a>
      {/each}

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

    <!-- Mobile: hamburger + theme toggle -->
    <div class="md:hidden flex items-center gap-2">
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
      {#each navItems as item}
        <a
          href="#{item.toLowerCase()}"
          class="block py-3 px-4 rounded-lg transition-all duration-300 cursor-pointer mb-2"
          style="color: var(--text-secondary);"
          on:click|preventDefault={() => { scrollToSection(item.toLowerCase()); mobileMenuOpen = false; }}
          on:mouseover={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)')}
          on:mouseleave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          on:focus={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)')}
          on:blur={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          {item}
        </a>
      {/each}
    </div>
  {/if}
</nav>