<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap, ScrollTrigger } from '../utils/gsapSetup';
  import { scrollToSection } from '../utils/gsapAnimations';
  import { currentLang } from '../stores/langStore';
  import { getPortfolioData } from '../data/portfolioData';

  let footerEl: HTMLElement;

  $: activeData = getPortfolioData($currentLang);
  $: footerText = activeData.footer;
  $: personalInfo = activeData.personalInfo;
  $: navItems = activeData.nav;

  onMount(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-brand', {
        scrollTrigger: { trigger: '.footer-brand', start: 'top 90%' },
        y: 60, opacity: 0, duration: 0.9, ease: 'power3.out',
      });

      gsap.from('.footer-nav-item', {
        scrollTrigger: { trigger: '.footer-nav', start: 'top 90%' },
        x: -40, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.5)',
      });

      gsap.from('.footer-contact-item', {
        scrollTrigger: { trigger: '.footer-contact', start: 'top 90%' },
        x: 50, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
      });

      gsap.from('.footer-social-icon', {
        scrollTrigger: { trigger: '.footer-brand', start: 'top 90%' },
        scale: 0, opacity: 0, duration: 0.45, stagger: 0.07,
        ease: 'back.out(2)', delay: 0.35,
      });

      gsap.from('.footer-copy', {
        scrollTrigger: { trigger: '.footer-copy', start: 'top 95%' },
        opacity: 0, y: 20, duration: 0.8, ease: 'power2.out',
      });
    }, footerEl); // ← scoped to this element

    return () => ctx.revert();
  });
</script>

<footer
  bind:this={footerEl}
  class="relative py-16 border-t overflow-hidden"
  style="background-color: var(--bg-base); border-color: var(--border-subtle);"
>
  <div class="absolute top-0 left-1/4 w-48 h-48 rounded-full blur-3xl"
    style="background: var(--theme-purple); opacity: 0.06;"></div>
  <div class="absolute bottom-0 right-1/4 w-48 h-48 rounded-full blur-3xl"
    style="background: var(--theme-pink); opacity: 0.05;"></div>

  <div class="max-w-7xl mx-auto px-6 relative z-10">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12">

      <!-- Brand -->
      <div class="footer-brand">
        <div class="text-2xl font-bold text-gradient-purple mb-4 flex items-center">
          <span class="mr-2">&lt;/&gt;</span> Porto V2
        </div>
        <p class="mb-6 max-w-xs" style="color: var(--text-muted);">
          {footerText.tagline}
        </p>
        <div class="flex space-x-4">
          {#each [
            { name: 'github',   url: 'https://github.com',   icon: 'G' },
            { name: 'linkedin', url: 'https://linkedin.com', icon: 'L' },
            { name: 'twitter',  url: 'https://twitter.com',  icon: 'X' },
            { name: 'dribbble', url: 'https://dribbble.com', icon: 'D' },
          ] as social}
            <a
              href={social.url}
              class="footer-social-icon w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
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

      <!-- Nav -->
      <div>
        <h3 class="text-lg font-semibold mb-6" style="color: var(--text-primary);">{footerText.navTitle}</h3>
        <ul class="footer-nav space-y-3">
          {#each navItems as item}
            <li>
              <a
                href="#{item.key}"
                class="footer-nav-item transition-colors duration-300 cursor-pointer"
                style="color: var(--text-muted);"
                on:click|preventDefault={() => scrollToSection(item.key)}
                on:mouseover={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--theme-purple)'}
                on:mouseleave={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                on:focus={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--theme-purple)'}
                on:blur={(e) => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
              >
                {item.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h3 class="text-lg font-semibold mb-6" style="color: var(--text-primary);">{footerText.contactTitle}</h3>
        <ul class="footer-contact space-y-3">
          {#each [
            { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', text: personalInfo.email },
            { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', text: personalInfo.phone },
            { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z', text: personalInfo.location },
          ] as item}
            <li class="footer-contact-item flex items-start">
              <svg class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style="color: var(--theme-purple);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon}/>
              </svg>
              <span style="color: var(--text-muted);">{item.text}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <div class="footer-copy border-t mt-12 pt-8 text-center" style="border-color: var(--border-subtle);">
      <p style="color: var(--text-muted);">
        &copy; {new Date().getFullYear()} Porto V2. {footerText.copyright}
      </p>
    </div>
  </div>
</footer>