<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from '../utils/gsapSetup';
  import { currentLang } from '../stores/langStore';
  import { getPortfolioData } from '../data/portfolioData';

  let aboutSection: HTMLElement;

  $: activeData = getPortfolioData($currentLang);
  $: aboutText = activeData.about;
  $: personalInfo = activeData.personalInfo;
  $: skills = activeData.skills;

  onMount(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-title', {
        scrollTrigger: { trigger: '.about-title', start: 'top 88%' },
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0, duration: 1, ease: 'power4.out',
      });

      gsap.from('.about-bio', {
        scrollTrigger: { trigger: '.about-bio', start: 'top 88%' },
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
      });

      gsap.from('.about-unified-card', {
        scrollTrigger: { trigger: '.about-unified-card', start: 'top 88%' },
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
      });
    }, aboutSection);

    return () => ctx.revert();
  });
</script>

<section
  id="tentang"
  bind:this={aboutSection}
  class="relative py-20 overflow-hidden"
  style="background-color: var(--bg-base);"
>
  <!-- Ambient Orbs -->
  <div
    class="absolute top-1/4 left-10 w-64 h-64 rounded-full blur-3xl"
    style="background: var(--theme-purple); opacity: 0.15;"
  ></div>
  <div
    class="absolute bottom-1/4 right-10 w-64 h-64 rounded-full blur-3xl"
    style="background: var(--theme-pink); opacity: 0.10;"
  ></div>

  <div class="max-w-7xl mx-auto px-6 relative z-10">
    <h2
      class="about-title text-4xl font-bold text-center mb-16"
      style="color: var(--text-primary);"
    >
      {aboutText.title}
    </h2>

    <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      <!-- Left column: Bio Story -->
      <div class="space-y-6">
        <p
          class="about-bio text-lg leading-relaxed whitespace-pre-line space-y-4"
          style="color: var(--text-secondary);"
        >
          {personalInfo.bio}
        </p>
      </div>

      <!-- Right column: Single Unified Profile & Skills Card -->
      <div
        class="about-unified-card p-6 md:p-8 rounded-2xl border transition-all duration-300 hover-lift h-auto"
        style="background: var(--bg-card); border-color: var(--border-subtle);"
      >
        <!-- Top Part: Profile Header -->
        <div class="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b" style="border-color: var(--border-subtle);">
          <!-- Photo with Gradient Ring -->
          <div
            class="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 rounded-2xl p-1 shadow-lg"
            style="background: var(--theme-grad);"
          >
            <img
              src={personalInfo.image}
              alt={personalInfo.name}
              class="w-full h-full object-cover rounded-xl"
            />
          </div>

          <!-- Profile Details -->
          <div class="flex-1 text-center sm:text-left space-y-2">
            <h3 class="text-xl font-bold" style="color: var(--text-primary);">
              {personalInfo.name}
            </h3>
            <p class="text-sm font-semibold" style="color: var(--theme-pink);">
              {personalInfo.title}
            </p>

            <div class="flex flex-wrap justify-center sm:justify-start gap-2 pt-1">
              <span
                class="px-3 py-1 text-xs rounded-full font-medium border"
                style="background: var(--bg-card-hover); color: var(--text-secondary); border-color: var(--border-subtle);"
              >
                📍 {personalInfo.location}
              </span>
              <span
                class="px-3 py-1 text-xs rounded-full font-semibold border"
                style="background: rgba(144, 39, 241, 0.12); color: var(--theme-pink-l); border-color: rgba(144, 39, 241, 0.3);"
              >
                🟢 {personalInfo.availability}
              </span>
            </div>
          </div>
        </div>

        <!-- Middle Part: Compact Skill Chips -->
        <div class="py-6 border-b" style="border-color: var(--border-subtle);">
          <h4 class="text-xs uppercase font-bold tracking-wider mb-4 flex items-center" style="color: var(--text-muted);">
            <span class="w-2 h-2 rounded-full mr-2" style="background: var(--theme-pink);"></span>
            {aboutText.techSkills}
          </h4>

          <div class="flex flex-wrap gap-2">
            {#each skills as skill}
              <span
                class="px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 hover:scale-105"
                style="background: var(--bg-card-hover); color: var(--text-primary); border-color: var(--border-subtle);"
              >
                {skill.name}
              </span>
            {/each}
          </div>
        </div>

        <!-- Bottom Part: Download CV Button -->
        <div class="pt-6">
          <a
            href={activeData.hero.cvFile}
            download
            class="w-full py-3 px-4 rounded-xl font-semibold text-center flex items-center justify-center gap-2 transition-all duration-300 border"
            style="background: var(--bg-card-hover); color: var(--theme-pink); border-color: var(--border-subtle);"
            on:mouseover={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--theme-purple)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
            on:mouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-card-hover)'; (e.currentTarget as HTMLElement).style.color = 'var(--theme-pink)'; }}
            on:focus={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--theme-purple)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
            on:blur={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-card-hover)'; (e.currentTarget as HTMLElement).style.color = 'var(--theme-pink)'; }}
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            {activeData.hero.downloadCv}
          </a>
        </div>
      </div>
    </div>
  </div>
</section>