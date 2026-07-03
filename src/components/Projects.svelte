<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap, ScrollTrigger } from '../utils/gsapSetup';
  import { projects } from '../data/portfolioData';

  let projectsSection: HTMLElement;

  onMount(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-title', {
        scrollTrigger: { trigger: '.projects-title', start: 'top 88%' },
        y: -50, opacity: 0, duration: 0.9, ease: 'power3.out',
      });

      gsap.from('.projects-subtitle', {
        scrollTrigger: { trigger: '.projects-subtitle', start: 'top 90%' },
        y: 30, opacity: 0, duration: 0.7, ease: 'power2.out',
      });

      gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 92%' },
          y: 50, opacity: 0, scale: 0.96,
          duration: 0.7, delay: (i % 3) * 0.08,
          ease: 'power3.out',
        });
      });

      gsap.from('.projects-more-btn', {
        scrollTrigger: { trigger: '.projects-more-btn', start: 'top 95%' },
        scale: 0.5, opacity: 0, duration: 0.7, ease: 'back.out(2)',
      });
    }, projectsSection); // ← scoped to this section

    return () => ctx.revert();
  });
</script>

<section
  id="proyek"
  bind:this={projectsSection}
  class="relative py-20"
  style="background-color: var(--bg-base);"
>
  <div class="absolute top-1/3 left-1/4 w-72 h-72 rounded-full blur-3xl"
    style="background: var(--theme-purple); opacity: 0.12;"></div>
  <div class="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full blur-3xl"
    style="background: var(--theme-pink); opacity: 0.08;"></div>

  <div class="max-w-7xl mx-auto px-6 relative z-10">
    <h2 class="projects-title text-4xl font-bold text-center mb-8"
      style="color: var(--text-primary);">
      Portfolio Proyek
    </h2>
    <p class="projects-subtitle text-center max-w-2xl mx-auto mb-16"
      style="color: var(--text-muted);">
      Berikut adalah beberapa proyek yang telah saya kerjakan selama ini
    </p>

    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
      {#each projects as project}
        <div
          class="project-card rounded-2xl overflow-hidden"
          style="background: var(--bg-card); border: 1px solid var(--border-subtle);"
        >
          <div class="relative overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              class="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
          </div>

          <div class="p-6">
            <h3 class="text-xl font-bold mb-3" style="color: var(--text-primary);">{project.title}</h3>
            <p class="mb-5 leading-relaxed" style="color: var(--text-muted);">{project.description}</p>

            <div class="flex flex-wrap gap-2 mb-6">
              {#each project.technologies as tech}
                <span
                  class="px-3 py-1 text-xs rounded-full font-medium"
                  style="background: rgba(144,39,241,0.15); color: var(--theme-pink-l);"
                >
                  {tech}
                </span>
              {/each}
            </div>

            <div class="flex space-x-4">
              <a
                href={project.live}
                class="flex-1 text-center py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center transition-opacity duration-300 hover:opacity-90"
                style="background: var(--theme-grad);"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                Lihat Proyek
              </a>
              <a
                href={project.github}
                class="flex-1 text-center py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors duration-300 border"
                style="background: var(--bg-card-hover); color: var(--text-secondary); border-color: var(--border-subtle);"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
                Kode
              </a>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <div class="text-center mt-16">
      <button
        class="projects-more-btn px-8 py-4 text-white rounded-full font-medium transition-opacity duration-300 hover:opacity-90"
        style="background: var(--theme-grad);"
      >
        Lihat Lebih Banyak Proyek
      </button>
    </div>
  </div>
</section>