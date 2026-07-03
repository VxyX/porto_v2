<script lang="ts">
  import { personalInfo } from '../data/portfolioData';
  import { onMount } from 'svelte';
  import { gsap, ScrollTrigger } from '../utils/gsapSetup';
  import { scrollToSection } from '../utils/gsapAnimations';

  let heroTitle: HTMLElement;
  let heroSubtitle: HTMLElement;
  let heroImage: HTMLElement;
  let heroSection: HTMLElement;

  onMount(() => {
    // gsap.context() with scope — all selectors match only within heroSection
    const ctx = gsap.context(() => {
      // ── Initial load timeline ──────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-greeting',      { y: 30, opacity: 0, duration: 0.7 })
        .from(heroTitle,             { y: 60, opacity: 0, duration: 0.9 }, '-=0.3')
        .from(heroSubtitle,          { y: 40, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.hero-bio',           { y: 30, opacity: 0, duration: 0.7 }, '-=0.4')
        .from('.hero-btn-primary',   { x: -30, opacity: 0, duration: 0.6 }, '-=0.3')
        .from('.hero-btn-secondary', { x:  30, opacity: 0, duration: 0.6 }, '-=0.5')
        .from('.hero-social-icon',   { scale: 0, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'back.out(2)' }, '-=0.3')
        .from(heroImage,             { x: 120, opacity: 0, duration: 1.1, ease: 'power3.out' }, '-=1.2');

      // ── Floating image loop ────────────────────────────────────
      gsap.to(heroImage, { y: -12, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' });

      // ── Parallax orbs on scroll ────────────────────────────────
      gsap.to('.hero-orb-purple', {
        scrollTrigger: { trigger: heroSection, start: 'top top', end: 'bottom top', scrub: 1.5 },
        y: -120, x: -30,
      });
      gsap.to('.hero-orb-pink', {
        scrollTrigger: { trigger: heroSection, start: 'top top', end: 'bottom top', scrub: 2 },
        y: -80, x: 40,
      });
    }, heroSection); // ← scope to this component's DOM

    return () => ctx.revert();
  });
</script>

<section
  id="beranda"
  bind:this={heroSection}
  class="relative min-h-screen flex items-center pt-16 overflow-hidden"
  style="background-color: var(--bg-base);"
>
  <!-- Ambient orbs -->
  <div class="animated-bg-element bg-purple hero-orb-purple"></div>
  <div class="animated-bg-element bg-blue hero-orb-pink"></div>

  <div class="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 items-center relative z-10">

    <!-- Text side -->
    <div>
      <p class="hero-greeting text-lg mb-2 font-medium" style="color: var(--theme-pink);">Halo, saya</p>

      <h1 bind:this={heroTitle} class="text-hero font-bold mb-4">
        <span class="text-gradient-purple">{personalInfo.name}</span>
      </h1>

      <p bind:this={heroSubtitle} class="text-subhero mb-8" style="color: var(--text-secondary);">
        {personalInfo.title}
      </p>

      <p class="hero-bio mb-10 max-w-lg leading-relaxed" style="color: var(--text-muted);">
        {personalInfo.bio}
      </p>

      <div class="flex flex-wrap gap-4">
        <button
          class="hero-btn-primary bg-gradient-purple-pink text-white font-bold py-4 px-8 rounded-full"
          on:click={() => scrollToSection('proyek')}
        >
          Lihat Proyek Saya
        </button>
        <button
          class="hero-btn-secondary font-bold py-4 px-8 rounded-full transition-all duration-300"
          style="border: 2px solid var(--theme-purple); color: var(--theme-purple); background: transparent;"
          on:click={() => scrollToSection('kontak')}
          on:mouseover={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--theme-purple)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
          on:mouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--theme-purple)'; }}
          on:focus={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--theme-purple)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
          on:blur={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--theme-purple)'; }}
        >
          Hubungi Saya
        </button>
      </div>

      <!-- Social icons -->
      <div class="flex space-x-4 mt-10">
        {#each [
          { name: 'github',   url: 'https://github.com',   icon: 'G' },
          { name: 'linkedin', url: 'https://linkedin.com', icon: 'L' },
          { name: 'twitter',  url: 'https://twitter.com',  icon: 'X' },
          { name: 'email',    url: 'mailto:programmer@contoh.com', icon: 'E' },
        ] as social}
          <a
            href={social.url}
            class="hero-social-icon w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300"
            style="background: var(--bg-card); color: var(--text-secondary);"
            aria-label={social.name}
            target="_blank"
            rel="noopener noreferrer"
            on:mouseover={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--theme-purple)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
            on:mouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
            on:focus={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--theme-purple)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
            on:blur={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
          >
            {social.icon}
          </a>
        {/each}
      </div>
    </div>

    <!-- Image side -->
    <div bind:this={heroImage} class="flex justify-center">
      <!-- Common wrapper so .profil-glow positions relative to the frame -->
      <div class="relative" style="width: fit-content;">
        <!-- Glow behind frame -->
        <div class="profil-glow"></div>

        <!-- Animated shine frame — outer rotates, inner counter-rotates to keep content upright -->
        <div class="profil-frame relative z-10">
          <div class="profil-frame-inner" style="width: 260px; height: 260px;">
            <!-- Placeholder — replace src with your actual photo -->
            <div
              class="w-full h-full flex items-center justify-center font-bold text-xl"
              style="color: var(--text-muted); background: var(--bg-surface);"
            >
              FOTO
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>