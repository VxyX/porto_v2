<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from '../utils/gsapSetup';
  import { currentLang } from '../stores/langStore';
  import { getPortfolioData } from '../data/portfolioData';
  import SocialIcon from './SocialIcon.svelte';

  let footerEl: HTMLElement;

  $: activeData = getPortfolioData($currentLang);
  $: personalInfo = activeData.personalInfo;
  $: socialLinks = activeData.socialLinks;

  onMount(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-brand', {
        scrollTrigger: { trigger: '.footer-brand', start: 'top 95%' },
        y: 20, opacity: 0, duration: 0.8, ease: 'power3.out',
      });

      gsap.from('.footer-social-icon', {
        scrollTrigger: { trigger: '.footer-brand', start: 'top 95%' },
        scale: 0, opacity: 0, duration: 0.45, stagger: 0.07,
        ease: 'back.out(2)', delay: 0.2,
      });
    }, footerEl);

    return () => ctx.revert();
  });
</script>

<footer
  bind:this={footerEl}
  class="relative py-10 border-t overflow-hidden"
  style="background-color: var(--bg-base); border-color: var(--border-subtle);"
>
  <div class="max-w-7xl mx-auto px-6 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
    <!-- Brand & Copyright -->
    <div class="footer-brand text-center sm:text-left">
      <div class="text-xl font-bold text-gradient-purple flex items-center justify-center sm:justify-start select-none">
        <span class="mr-2">&lt;/&gt;</span> MFR
      </div>
      <p class="text-xs mt-1.5" style="color: var(--text-muted);">
        &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
      </p>
    </div>

    <!-- Social Icons -->
    <div class="flex space-x-3">
      {#each socialLinks as social}
        <a
          href={social.url}
          class="footer-social-icon w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300"
          style="background: var(--bg-card); color: var(--text-secondary);"
          aria-label={social.platform}
          target="_blank"
          rel="noopener noreferrer"
          on:mouseover={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--theme-purple)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
          on:mouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
          on:focus={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--theme-purple)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
          on:blur={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
        >
          <SocialIcon icon={social.icon} size={18} />
        </a>
      {/each}
    </div>
  </div>
</footer>