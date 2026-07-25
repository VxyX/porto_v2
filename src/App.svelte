<script lang="ts">
  import { onMount } from 'svelte';
  import Header from './components/Header.svelte';
  import Hero from './components/Hero.svelte';
  import About from './components/About.svelte';
  import Experience from './components/Experience.svelte';
  import Skills from './components/Skills.svelte';
  import Projects from './components/Projects.svelte';
  import Contact from './components/Contact.svelte';
  import Footer from './components/Footer.svelte';

  // ── Theme state ────────────────────────────────────────────────
  // Default to dark; read from localStorage if available.
  let isDark = true;

  onMount(() => {
    const saved = localStorage.getItem('theme');
    isDark = saved ? saved === 'dark' : true;
    applyTheme(isDark);
  });

  function applyTheme(dark: boolean) {
    const html = document.documentElement;
    if (dark) {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.add('light');
      html.classList.remove('dark');
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }

  function toggleTheme() {
    isDark = !isDark;
    applyTheme(isDark);
  }
</script>

<div class="bg-main min-h-screen">
  <Hero />
  <Header {isDark} {toggleTheme} />
  <About />
  <Experience />
  <Skills />
  <Projects />
  <Contact />
  <Footer />
</div>