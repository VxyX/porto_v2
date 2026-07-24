<script lang="ts">
  import { onMount } from "svelte";
  import { gsap, ScrollTrigger } from "../utils/gsapSetup";
  import { scrollToSection } from "../utils/gsapAnimations";
  import { currentLang } from "../stores/langStore";
  import { getPortfolioData } from "../data/portfolioData";

  let heroTitle: HTMLElement;
  let heroSubtitle: HTMLElement;
  let heroImage: HTMLElement;
  let heroSection: HTMLElement;

  $: activeData = getPortfolioData($currentLang);
  $: personalInfo = activeData.personalInfo;
  $: heroText = activeData.hero;

  onMount(() => {
    // gsap.context() with scope — all selectors match only within heroSection
    const ctx = gsap.context(() => {
      // ── Initial load timeline ──────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        heroImage,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: "back.out(1.5)" },
      )
        .fromTo(
          ".hero-greeting",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          heroTitle,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.3",
        )
        .fromTo(
          heroSubtitle,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.4",
        )
        .fromTo(
          ".hero-bio",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.4",
        )
        .fromTo(
          ".hero-btn-primary",
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5 },
          "-=0.3",
        )
        .fromTo(
          ".hero-btn-secondary",
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5 },
          "-=0.4",
        )
        .fromTo(
          ".hero-social-icon",
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "back.out(2)",
          },
          "-=0.3",
        );

      // ── Floating image loop ────────────────────────────────────
      gsap.to(heroImage, {
        y: -10,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // ── Parallax orbs on scroll ────────────────────────────────
      gsap.to(".hero-orb-purple", {
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        y: -120,
        x: -30,
      });
      gsap.to(".hero-orb-pink", {
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
        y: -80,
        x: 40,
      });
    }, heroSection); // ← scope to this component's DOM

    return () => ctx.revert();
  });
</script>

<section
  id="beranda"
  bind:this={heroSection}
  class="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
  style="background-color: var(--bg-base);"
>
  <!-- Ambient orbs -->
  <div class="animated-bg-element bg-purple hero-orb-purple"></div>
  <div class="animated-bg-element bg-blue hero-orb-pink"></div>

  <div
    class="max-w-5xl w-full mx-auto px-6 flex flex-col items-center text-center relative z-10"
  >
    <!-- Profile Image (Centered Top) -->
    <div bind:this={heroImage} class="flex justify-center mb-6">
      <div class="relative" style="width: fit-content;">
        <!-- Glow behind frame -->
        <div class="profil-glow"></div>

        <!-- Animated shine frame — outer rotates, inner counter-rotates -->
        <div class="profil-frame relative z-10">
          <div class="profil-frame-inner" style="width: 200px; height: 200px;">
            <img
              src={personalInfo.image}
              alt={personalInfo.name}
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Text Side (Centered) -->
    <div class="flex flex-col items-center text-center w-full max-w-3xl">
      <p
        class="hero-greeting text-lg mb-2 font-medium"
        style="color: var(--theme-pink);"
      >
        {heroText.greeting}
      </p>

      <h1
        bind:this={heroTitle}
        class="text-hero font-bold mb-3 sm:whitespace-nowrap"
      >
        <span class="text-gradient-purple">{personalInfo.name}</span>
      </h1>

      <p
        bind:this={heroSubtitle}
        class="text-subhero mb-6 font-bold"
        style="color: var(--text-secondary);"
      >
        {personalInfo.title}
      </p>

      <div
        class="hero-bio mb-8 leading-relaxed space-y-1.5"
        style="color: var(--text-secondary);"
      >
        {@html personalInfo.intro}
      </div>

      <!-- Accent gradient line divider -->
      <div
        class="w-44 h-1 rounded-full mb-8"
        style="background: var(--theme-grad);"
      ></div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap justify-center gap-4 mb-8">
        <button
          class="hero-btn-primary bg-gradient-purple-pink text-white font-bold py-3.5 px-8 rounded-full"
          on:click={() => scrollToSection("proyek")}
        >
          {heroText.viewProjects}
        </button>
        <a
          href={heroText.cvFile}
          download
          class="hero-btn-secondary font-bold py-3.5 px-8 rounded-full transition-colors duration-300 flex items-center gap-2"
          style="border: 2px solid var(--theme-purple); color: var(--theme-purple); background: transparent;"
          on:mouseover={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              "var(--theme-purple)";
            (e.currentTarget as HTMLElement).style.color = "#fff";
          }}
          on:mouseleave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color =
              "var(--theme-purple)";
          }}
          on:focus={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              "var(--theme-purple)";
            (e.currentTarget as HTMLElement).style.color = "#fff";
          }}
          on:blur={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color =
              "var(--theme-purple)";
          }}
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          {heroText.downloadCv}
        </a>
        <button
          class="hero-btn-secondary font-bold py-3.5 px-8 rounded-full transition-colors duration-300"
          style="border: 2px solid var(--theme-purple); color: var(--theme-purple); background: transparent;"
          on:click={() => scrollToSection("kontak")}
          on:mouseover={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              "var(--theme-purple)";
            (e.currentTarget as HTMLElement).style.color = "#fff";
          }}
          on:mouseleave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color =
              "var(--theme-purple)";
          }}
          on:focus={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              "var(--theme-purple)";
            (e.currentTarget as HTMLElement).style.color = "#fff";
          }}
          on:blur={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color =
              "var(--theme-purple)";
          }}
        >
          {heroText.contactMe}
        </button>
      </div>

      <!-- Social icons -->
      <div class="flex justify-center space-x-4">
        {#each [{ name: "github", url: "https://github.com", icon: "G" }, { name: "linkedin", url: "https://linkedin.com", icon: "L" }, { name: "twitter", url: "https://twitter.com", icon: "X" }, { name: "email", url: "mailto:programmer@contoh.com", icon: "E" }] as social}
          <a
            href={social.url}
            class="hero-social-icon w-11 h-11 rounded-full flex items-center justify-center font-bold transition-colors duration-300"
            style="background: var(--bg-card); color: var(--text-secondary);"
            aria-label={social.name}
            target="_blank"
            rel="noopener noreferrer"
            on:mouseover={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "var(--theme-purple)";
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            on:mouseleave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "var(--bg-card)";
              (e.currentTarget as HTMLElement).style.color =
                "var(--text-secondary)";
            }}
            on:focus={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "var(--theme-purple)";
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            on:blur={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "var(--bg-card)";
              (e.currentTarget as HTMLElement).style.color =
                "var(--text-secondary)";
            }}
          >
            {social.icon}
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>
