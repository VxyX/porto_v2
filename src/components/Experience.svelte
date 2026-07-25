<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap, ScrollTrigger } from '../utils/gsapSetup';
  import { currentLang } from '../stores/langStore';
  import { getPortfolioData } from '../data/portfolioData';

  let expSection: HTMLElement;

  $: activeData = getPortfolioData($currentLang);
  $: expText = activeData.experienceSection;
  $: experiences = activeData.experiences;

  onMount(() => {
    const ctx = gsap.context(() => {
      gsap.from('.exp-title', {
        scrollTrigger: { trigger: '.exp-title', start: 'top 88%' },
        y: -40, opacity: 0, duration: 0.8, ease: 'power3.out',
      });

      gsap.from('.exp-subtitle', {
        scrollTrigger: { trigger: '.exp-subtitle', start: 'top 90%' },
        y: 20, opacity: 0, duration: 0.7, ease: 'power2.out',
      });

      gsap.utils.toArray<HTMLElement>('.exp-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 90%' },
          x: i % 2 === 0 ? -40 : 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      });
    }, expSection);

    return () => ctx.revert();
  });

  function getBadgeColor(type: string) {
    if (type === 'education') return 'rgba(144, 39, 241, 0.15)';
    if (type === 'work') return 'rgba(212, 72, 247, 0.15)';
    return 'rgba(59, 130, 246, 0.15)';
  }

  function getBadgeTextColor(type: string) {
    if (type === 'education') return 'var(--theme-pink-l)';
    if (type === 'work') return 'var(--theme-pink)';
    return '#60a5fa';
  }

  function getIcon(type: string) {
    if (type === 'education') return '🎓';
    if (type === 'work') return '💼';
    return '🚀';
  }

  function getTagStyle(type: string) {
    if (type === 'education') {
      return 'background: rgba(144, 39, 241, 0.12); color: var(--theme-pink-l); border-color: rgba(144, 39, 241, 0.35);';
    }
    if (type === 'work') {
      return 'background: rgba(212, 72, 247, 0.12); color: var(--theme-pink); border-color: rgba(212, 72, 247, 0.35);';
    }
    return 'background: rgba(59, 130, 246, 0.12); color: #60a5fa; border-color: rgba(59, 130, 246, 0.35);';
  }
</script>

<section
  id="pengalaman"
  bind:this={expSection}
  class="relative py-20 overflow-hidden"
  style="background-color: var(--bg-base);"
>
  <!-- Ambient orbs -->
  <div
    class="absolute top-1/3 right-10 w-72 h-72 rounded-full blur-3xl"
    style="background: var(--theme-purple); opacity: 0.12;"
  ></div>
  <div
    class="absolute bottom-1/4 left-10 w-64 h-64 rounded-full blur-3xl"
    style="background: var(--theme-pink); opacity: 0.08;"
  ></div>

  <div class="max-w-6xl mx-auto px-6 relative z-10">
    <h2
      class="exp-title text-4xl font-bold text-center mb-6"
      style="color: var(--text-primary);"
    >
      {expText.title}
    </h2>
    <p
      class="exp-subtitle text-center max-w-2xl mx-auto mb-16"
      style="color: var(--text-muted);"
    >
      {expText.subtitle}
    </p>

    <!-- Timeline Wrapper -->
    <div class="relative border-l-2 border-dashed ml-4 md:ml-32 space-y-12" style="border-color: var(--border-accent);">
      {#each experiences as exp}
        <div class="exp-card relative pl-8 md:pl-12 group">
          <!-- Timeline Node Icon -->
          <div
            class="absolute -left-[21px] top-1.5 w-10 h-10 rounded-full flex items-center justify-center text-lg border shadow-md transition-transform duration-300 group-hover:scale-110"
            style="background: var(--bg-surface); border-color: var(--theme-purple);"
          >
            {getIcon(exp.type)}
          </div>

          <!-- Card Content -->
          <div
            class="p-6 md:p-8 rounded-2xl border transition-all duration-300 hover-lift"
            style="background: var(--bg-card); border-color: var(--border-subtle);"
          >
            <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span
                class="px-3 py-1 text-xs rounded-full font-semibold uppercase tracking-wider"
                style="background: {getBadgeColor(exp.type)}; color: {getBadgeTextColor(exp.type)};"
              >
                {expText.typeLabels[exp.type as keyof typeof expText.typeLabels] || exp.type}
              </span>
              <span
                class="text-xs font-semibold px-3 py-1 rounded-full border"
                style="color: var(--text-muted); border-color: var(--border-subtle); background: var(--bg-card-hover);"
              >
                🗓️ {exp.period}
              </span>
            </div>

            <h3 class="text-xl font-bold mb-1" style="color: var(--text-primary);">
              {exp.role}
            </h3>
            <div class="text-sm font-semibold mb-4" style="color: var(--theme-pink);">
              {exp.company}
            </div>

            {#if exp.description}
              <p class="mb-3 leading-relaxed text-sm whitespace-pre-line" style="color: var(--text-secondary);">
                {exp.description}
              </p>
            {/if}

            {#if exp.details && exp.details.length > 0}
              <ul class="mb-5 space-y-1.5 text-sm list-disc list-inside leading-relaxed" style="color: var(--text-secondary);">
                {#each exp.details as detail}
                  <li>{detail}</li>
                {/each}
              </ul>
            {/if}

            <div class="flex flex-wrap gap-2">
              {#each exp.technologies as tech}
                <span
                  class="px-3 py-1 text-xs rounded-lg font-medium border transition-colors duration-200"
                  style={getTagStyle(exp.type)}
                >
                  {tech}
                </span>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
