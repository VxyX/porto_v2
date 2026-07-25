<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap, ScrollTrigger } from '../utils/gsapSetup';
  import { currentLang } from '../stores/langStore';
  import { getPortfolioData } from '../data/portfolioData';
  import SocialIcon from './SocialIcon.svelte';

  let contactSection: HTMLElement;

  $: activeData = getPortfolioData($currentLang);
  $: contactText = activeData.contactSection;
  $: personalInfo = activeData.personalInfo;
  $: socialLinks = activeData.socialLinks;

  onMount(() => {
    const ctx = gsap.context(() => {
      // Main section header animations
      gsap.from('.contact-title', {
        scrollTrigger: { trigger: '.contact-title', start: 'top 88%' },
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.contact-subtitle', {
        scrollTrigger: { trigger: '.contact-subtitle', start: 'top 90%' },
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      });

      // Left column: Direct Contact Section
      gsap.from('.contact-direct-title', {
        scrollTrigger: { trigger: '.contact-direct-title', start: 'top 90%' },
        x: -30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      });

      gsap.utils.toArray<HTMLElement>('.contact-direct-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 92%' },
          x: -40,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.1,
          ease: 'power3.out',
        });
      });

      // Right column: Social Cards Grid
      gsap.from('.contact-social-title', {
        scrollTrigger: { trigger: '.contact-social-title', start: 'top 90%' },
        x: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      });

      gsap.utils.toArray<HTMLElement>('.contact-social-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 92%' },
          y: 40,
          opacity: 0,
          scale: 0.95,
          duration: 0.7,
          delay: (i % 2) * 0.1,
          ease: 'power3.out',
        });
      });
    }, contactSection);

    return () => ctx.revert();
  });
</script>

<section
  id="kontak"
  bind:this={contactSection}
  class="relative py-20 overflow-hidden"
  style="background-color: var(--bg-base);"
>
  <!-- Ambient Orbs -->
  <div
    class="absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl pointer-events-none"
    style="background: var(--theme-purple); opacity: 0.10;"
  ></div>
  <div
    class="absolute bottom-10 right-10 w-72 h-72 rounded-full blur-3xl pointer-events-none"
    style="background: var(--theme-pink); opacity: 0.08;"
  ></div>

  <div class="max-w-7xl mx-auto px-6 relative z-10">
    <h2
      class="contact-title text-4xl font-bold text-center mb-6"
      style="color: var(--text-primary);"
    >
      {contactText.title}
    </h2>
    <p
      class="contact-subtitle text-center max-w-2xl mx-auto mb-16"
      style="color: var(--text-muted);"
    >
      {contactText.subtitle}
    </p>

    <div class="grid lg:grid-cols-12 gap-8 items-start">
      <!-- Left Side: Single-layered Direct Contact Cards -->
      <div class="lg:col-span-5 space-y-4">
        <h3 class="contact-direct-title text-xl font-bold flex items-center mb-4" style="color: var(--text-primary);">
          <span class="w-3 h-3 rounded-full mr-3" style="background: var(--theme-purple);"></span>
          {contactText.directTitle}
        </h3>

        <!-- Email Card -->
        <div
          class="contact-direct-card flex items-center p-5 rounded-2xl"
          style="background: var(--bg-card); border: 1px solid var(--border-subtle);"
        >
          <div
            class="p-3.5 rounded-xl mr-4 flex-shrink-0"
            style="background: rgba(144, 39, 241, 0.15); color: var(--theme-purple);"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div class="min-w-0 flex-1">
            <div class="text-xs font-semibold uppercase tracking-wider mb-1" style="color: var(--theme-pink);">
              {contactText.labels.email}
            </div>
            <div class="font-bold text-sm sm:text-base truncate" style="color: var(--text-primary);">
              {personalInfo.email}
            </div>
          </div>
        </div>

        <!-- Phone / WhatsApp Card -->
        <div
          class="contact-direct-card flex items-center p-5 rounded-2xl"
          style="background: var(--bg-card); border: 1px solid var(--border-subtle);"
        >
          <div
            class="p-3.5 rounded-xl mr-4 flex-shrink-0"
            style="background: rgba(34, 197, 94, 0.15); color: #22c55e;"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <div class="min-w-0 flex-1">
            <div class="text-xs font-semibold uppercase tracking-wider mb-1" style="color: #22c55e;">
              {contactText.labels.phone}
            </div>
            <div class="font-bold text-sm sm:text-base truncate" style="color: var(--text-primary);">
              {personalInfo.phone}
            </div>
            <div class="text-xs mt-1" style="color: var(--text-muted);">
              WhatsApp & Telepon
            </div>
          </div>
        </div>

        <!-- Location Card -->
        <div
          class="contact-direct-card flex items-center p-5 rounded-2xl"
          style="background: var(--bg-card); border: 1px solid var(--border-subtle);"
        >
          <div
            class="p-3.5 rounded-xl mr-4 flex-shrink-0"
            style="background: rgba(144, 39, 241, 0.15); color: var(--theme-purple);"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <div class="text-xs font-semibold uppercase tracking-wider mb-1" style="color: var(--theme-pink);">
              {contactText.labels.location}
            </div>
            <div class="font-bold text-base" style="color: var(--text-primary);">
              {personalInfo.location}
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side: Single-layered Social Media Profile Cards Grid -->
      <div class="lg:col-span-7 space-y-4">
        <h3 class="contact-social-title text-xl font-bold flex items-center mb-4" style="color: var(--text-primary);">
          <span class="w-3 h-3 rounded-full mr-3" style="background: var(--theme-pink);"></span>
          {contactText.socialTitle}
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {#each socialLinks as social}
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              class="contact-social-card p-5 rounded-2xl transition-colors duration-300 hover-lift group block"
              style="background: var(--bg-card); border: 1px solid var(--border-subtle);"
            >
              <div class="flex items-center justify-between mb-3">
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base transition-transform duration-300 group-hover:scale-110"
                  style="background: {social.bgColor}; color: {social.color}; border: 1px solid {social.borderColor};"
                >
                  <SocialIcon icon={social.icon} size={20} />
                </div>
                <span
                  class="text-xs font-bold px-2.5 py-1 rounded-full transition-all duration-300 group-hover:bg-purple-600 group-hover:text-white"
                  style="color: var(--text-muted); background: var(--bg-card-hover); border: 1px solid var(--border-subtle);"
                >
                  ↗
                </span>
              </div>

              <h4 class="font-bold text-base mb-1 group-hover:underline" style="color: var(--text-primary);">
                {social.platform}
              </h4>
              <div class="text-xs font-semibold mb-2" style="color: {social.color};">
                {social.handle}
              </div>
              <p class="text-xs leading-relaxed" style="color: var(--text-muted);">
                {social.description}
              </p>
            </a>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>