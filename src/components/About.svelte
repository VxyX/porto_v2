<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap, ScrollTrigger } from '../utils/gsapSetup';
  import { personalInfo } from '../data/portfolioData';

  let aboutSection: HTMLElement;

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

      gsap.from('.about-detail-card', {
        scrollTrigger: { trigger: '.about-detail-card', start: 'top 88%' },
        x: -40, y: 20, opacity: 0, duration: 0.8, ease: 'power3.out',
      });

      gsap.from('.detail-item', {
        scrollTrigger: { trigger: '.about-detail-card', start: 'top 80%' },
        x: -30, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.2,
      });

      gsap.from('.about-skills-card', {
        scrollTrigger: { trigger: '.about-skills-card', start: 'top 88%' },
        x: 40, y: 20, opacity: 0, duration: 0.8, ease: 'power3.out',
      });

      gsap.utils.toArray<HTMLElement>('.about-skill-bar').forEach((bar) => {
        const targetW = bar.style.width;
        gsap.fromTo(bar,
          { width: '0%' },
          { width: targetW, duration: 1.4, ease: 'power2.out', scrollTrigger: { trigger: bar, start: 'top 90%' } }
        );
      });

      gsap.from('.about-stat', {
        scrollTrigger: { trigger: '.about-stats', start: 'top 88%' },
        scale: 0.4, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'back.out(2)',
      });
    }, aboutSection); // ← scoped to this section

    return () => ctx.revert();
  });
</script>

<section
  id="tentang"
  bind:this={aboutSection}
  class="relative py-20"
  style="background-color: var(--bg-base);"
>
  <!-- Orbs -->
  <div class="absolute top-1/4 left-10 w-64 h-64 rounded-full blur-3xl"
    style="background: var(--theme-purple); opacity: 0.15;"></div>
  <div class="absolute bottom-1/4 right-10 w-64 h-64 rounded-full blur-3xl"
    style="background: var(--theme-pink); opacity: 0.10;"></div>

  <div class="max-w-7xl mx-auto px-6 relative z-10">
    <h2 class="about-title text-4xl font-bold text-center mb-16"
      style="color: var(--text-primary);">
      Tentang Saya
    </h2>

    <div class="grid lg:grid-cols-2 gap-16 items-start">

      <!-- Left column -->
      <div class="space-y-6">
        <p class="about-bio text-lg leading-relaxed" style="color: var(--text-secondary);">
          {personalInfo.bio}
        </p>

        <div
          class="about-detail-card mt-10 p-6 rounded-2xl border"
          style="background: var(--bg-card); border-color: var(--border-subtle);"
        >
          <h3 class="text-xl font-semibold mb-6 flex items-center" style="color: var(--text-primary);">
            <span class="w-3 h-3 rounded-full mr-3" style="background: var(--theme-purple);"></span>
            Detail Profil
          </h3>
          <div class="space-y-4">
            {#each [
              { icon: '🗺️', label: 'Lokasi', value: personalInfo.location },
              { icon: '✉️', label: 'Email',  value: personalInfo.email },
              { icon: '📞', label: 'Telepon', value: personalInfo.phone },
              { icon: '💼', label: 'Status',  value: personalInfo.availability },
            ] as detail}
              <div class="detail-item flex items-start py-2">
                <span class="text-2xl mr-4">{detail.icon}</span>
                <div>
                  <div class="text-sm font-medium" style="color: var(--theme-pink);">{detail.label}</div>
                  <div style="color: var(--text-secondary);">{detail.value}</div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Right column -->
      <div class="space-y-8">
        <div
          class="about-skills-card p-8 rounded-2xl border"
          style="background: var(--bg-card); border-color: var(--border-subtle);"
        >
          <h3 class="text-2xl font-bold mb-8 flex items-center" style="color: var(--text-primary);">
            <span class="w-3 h-3 rounded-full mr-3" style="background: var(--theme-pink);"></span>
            Teknologi &amp; Keterampilan
          </h3>
          <div class="space-y-6">
            {#each ['JavaScript','TypeScript','Svelte','React','Node.js','Python','TailwindCSS','GraphQL'] as skill, i}
              <div>
                <div class="flex justify-between mb-2">
                  <span class="font-medium" style="color: var(--text-secondary);">{skill}</span>
                  <span style="color: var(--theme-pink);">{80 + (i % 3) * 5}%</span>
                </div>
                <div class="skill-bar">
                  <div class="about-skill-bar skill-progress" style="width: {80 + (i % 3) * 5}%;"></div>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <div class="about-stats grid grid-cols-2 gap-4">
          {#each [
            { stat: '5+',  label: 'Tahun Pengalaman' },
            { stat: '50+', label: 'Proyek Selesai'   },
          ] as item}
            <div
              class="about-stat p-6 rounded-2xl border text-center hover-lift"
              style="background: var(--bg-card); border-color: var(--border-subtle);"
            >
              <div class="text-3xl font-bold text-gradient-purple">{item.stat}</div>
              <div style="color: var(--text-muted);">{item.label}</div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>