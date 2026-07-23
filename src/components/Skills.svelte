<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap, ScrollTrigger } from '../utils/gsapSetup';
  import { currentLang } from '../stores/langStore';
  import { getPortfolioData } from '../data/portfolioData';

  let skillsSection: HTMLElement;

  $: activeData = getPortfolioData($currentLang);
  $: skillsText = activeData.skillsSection;
  $: skills = activeData.skills;

  onMount(() => {
    const ctx = gsap.context(() => {
      // Title: scale + fade only — no blur (filter is not GPU-composited)
      gsap.from('.skills-title', {
        scrollTrigger: { trigger: '.skills-title', start: 'top 88%' },
        scale: 0.85, opacity: 0, duration: 0.8, ease: 'power3.out',
      });

      gsap.from('.skills-subtitle', {
        scrollTrigger: { trigger: '.skills-subtitle', start: 'top 90%' },
        y: 20, opacity: 0, duration: 0.7, ease: 'power2.out',
      });

      // Cards: only animate cards not yet in viewport at load time.
      // Cards already visible are left alone — never set to opacity:0.
      gsap.utils.toArray<HTMLElement>('.skill-card').forEach((card) => {
        const rect = card.getBoundingClientRect();
        const inViewOnLoad = rect.top < window.innerHeight;

        if (!inViewOnLoad) {
          gsap.set(card, { opacity: 0, y: 40, scale: 0.95 });
          ScrollTrigger.create({
            trigger: card,
            start: 'top 90%',
            once: true,
            onEnter: () => gsap.to(card, {
              opacity: 1, y: 0, scale: 1,
              duration: 0.55, ease: 'power3.out',
            }),
          });
        }
      });

      // Skill bars: animate width (acceptable — only triggers once per bar)
      gsap.utils.toArray<HTMLElement>('.skills-bar').forEach((bar) => {
        const targetW = bar.style.width;
        gsap.fromTo(bar, { width: '0%' }, {
          width: targetW, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: bar, start: 'top 92%' },
        });
      });

      gsap.from('.add-skill-chip', {
        scrollTrigger: { trigger: '.add-skills-grid', start: 'top 88%' },
        y: 30, opacity: 0, scale: 0.9, duration: 0.45,
        stagger: { each: 0.05, from: 'center' },
        ease: 'power2.out',
      });
    }, skillsSection);

    return () => ctx.revert();
  });
</script>

<section
  id="keterampilan"
  bind:this={skillsSection}
  class="relative py-20"
  style="background-color: var(--bg-base);"
>
  <div class="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl"
    style="background: var(--theme-purple); opacity: 0.12;"></div>
  <div class="absolute bottom-20 right-20 w-64 h-64 rounded-full blur-3xl"
    style="background: var(--theme-pink); opacity: 0.09;"></div>

  <div class="max-w-7xl mx-auto px-6 relative z-10">
    <h2 class="skills-title text-4xl font-bold text-center mb-6"
      style="color: var(--text-primary);">
      {skillsText.title}
    </h2>
    <p class="skills-subtitle text-center max-w-2xl mx-auto mb-16"
      style="color: var(--text-muted);">
      {skillsText.subtitle}
    </p>

    <div class="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each skills as skill}
        <div
          class="skill-card rounded-2xl p-6 border hover-lift transition-colors duration-300"
          style="background: var(--bg-card); border-color: var(--border-subtle);"
        >
          <div class="flex items-center mb-4">
            <div
              class="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold mr-4 text-sm"
              style="background: var(--theme-grad);"
            >
              {skill.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 class="text-lg font-bold" style="color: var(--text-primary);">{skill.name}</h3>
              <div class="text-sm" style="color: var(--theme-pink);">{skill.category}</div>
            </div>
          </div>

          <div class="mb-2 flex justify-between">
            <span style="color: var(--text-muted);">{skillsText.skillLevel}</span>
            <span class="font-medium" style="color: var(--theme-pink);">{skill.level}%</span>
          </div>
          <div class="skill-bar">
            <div class="skills-bar skill-progress" style="width: {skill.level}%;"></div>
          </div>
        </div>
      {/each}
    </div>

    <div
      class="mt-20 p-8 rounded-2xl border"
      style="background: var(--bg-card); border-color: var(--border-subtle);"
    >
      <h3 class="text-2xl font-bold text-center mb-8" style="color: var(--text-primary);">
        {skillsText.additionalTitle}
      </h3>
      <div class="add-skills-grid grid grid-cols-2 md:grid-cols-4 gap-6">
        {#each ['Git & GitHub','Docker','CI/CD','Testing','Agile/Scrum','REST APIs','GraphQL','Cloud'] as additionalSkill}
          <div
            class="add-skill-chip flex flex-col items-center p-4 rounded-xl transition-colors duration-300 cursor-default border border-transparent"
            style="background: var(--bg-card-hover);"
          >
            <div class="text-2xl mb-2">⚙️</div>
            <div class="text-center text-sm font-medium" style="color: var(--text-secondary);">
              {additionalSkill}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>