<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap, ScrollTrigger } from '../utils/gsapSetup';
  import { personalInfo } from '../data/portfolioData';

  let contactSection: HTMLElement;
  let contactForm: HTMLElement;
  let contactInfo: HTMLElement;

  function handleSubmit(e: Event) {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda telah dikirim.');
  }

  onMount(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-title', {
        scrollTrigger: { trigger: '.contact-title', start: 'top 88%' },
        scale: 0.6, opacity: 0, duration: 0.9, ease: 'elastic.out(1, 0.6)',
      });

      gsap.from('.contact-subtitle', {
        scrollTrigger: { trigger: '.contact-subtitle', start: 'top 90%' },
        y: 25, opacity: 0, duration: 0.7, ease: 'power2.out',
      });

      gsap.from(contactForm, {
        scrollTrigger: { trigger: contactForm, start: 'top 88%' },
        x: -80, rotation: -3, opacity: 0, duration: 1, ease: 'power3.out',
        transformOrigin: 'left center',
      });

      gsap.from('.form-field', {
        scrollTrigger: { trigger: contactForm, start: 'top 82%' },
        y: 25, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.3,
      });

      gsap.from(contactInfo, {
        scrollTrigger: { trigger: contactInfo, start: 'top 88%' },
        x: 80, rotation: 3, opacity: 0, duration: 1, ease: 'power3.out',
        transformOrigin: 'right center',
      });
    }, contactSection); // ← scoped to this section

    return () => ctx.revert();
  });
</script>

<section
  id="kontak"
  bind:this={contactSection}
  class="relative py-20 overflow-hidden"
  style="background-color: var(--bg-base);"
>
  <div class="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl"
    style="background: var(--theme-purple); opacity: 0.12;"></div>
  <div class="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full blur-3xl"
    style="background: var(--theme-pink); opacity: 0.08;"></div>

  <div class="max-w-7xl mx-auto px-6 relative z-10">
    <h2 class="contact-title text-4xl font-bold text-center mb-8"
      style="color: var(--text-primary);">
      Mari Berdiskusi
    </h2>
    <p class="contact-subtitle text-center max-w-2xl mx-auto mb-16"
      style="color: var(--text-muted);">
      Punya pertanyaan, proyek, atau hanya ingin berkenalan? Silakan kirimkan pesan kepada saya.
    </p>

    <div class="grid lg:grid-cols-2 gap-16">

      <!-- Form -->
      <form
        bind:this={contactForm}
        class="rounded-2xl p-8 border shadow-lg"
        style="background: var(--bg-card); border-color: var(--border-subtle);"
        on:submit={handleSubmit}
      >
        {#each [
          { id: 'name',    label: 'Nama Lengkap',  type: 'text',  placeholder: 'Nama Anda' },
          { id: 'email',   label: 'Alamat Email',  type: 'email', placeholder: 'email@contoh.com' },
          { id: 'subject', label: 'Subjek Pesan',  type: 'text',  placeholder: 'Topik pesan Anda' },
        ] as field}
          <div class="form-field mb-6">
            <label class="block mb-3 font-medium" style="color: var(--text-secondary);" for={field.id}>
              {field.label}
            </label>
            <input type={field.type} id={field.id} class="form-input" placeholder={field.placeholder} />
          </div>
        {/each}

        <div class="form-field mb-8">
          <label class="block mb-3 font-medium" style="color: var(--text-secondary);" for="message">
            Pesan
          </label>
          <textarea id="message" rows="5" class="form-input min-h-[150px]"
            placeholder="Tulis pesan Anda di sini..."></textarea>
        </div>

        <button
          type="submit"
          class="form-field w-full text-white font-bold py-4 px-6 rounded-xl transition-opacity duration-300 hover:opacity-90 text-lg"
          style="background: var(--theme-grad);"
        >
          Kirim Pesan
        </button>
      </form>

      <!-- Info Panel -->
      <div bind:this={contactInfo} class="space-y-8">
        <div class="rounded-2xl p-8 border" style="background: var(--bg-card); border-color: var(--border-subtle);">
          <h3 class="text-2xl font-bold mb-6 flex items-center" style="color: var(--text-primary);">
            <span class="w-3 h-3 rounded-full mr-3" style="background: var(--theme-purple);"></span>
            Informasi Kontak
          </h3>
          <ul class="space-y-6">
            <li class="flex items-start">
              <div class="p-3 rounded-xl mr-4" style="background: rgba(144,39,241,0.15);">
                <svg class="w-6 h-6" style="color: var(--theme-purple);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-lg" style="color: var(--text-primary);">Email</h4>
                <a href="mailto:{personalInfo.email}" style="color: var(--theme-purple);">{personalInfo.email}</a>
              </div>
            </li>
            <li class="flex items-start">
              <div class="p-3 rounded-xl mr-4" style="background: rgba(212,72,247,0.15);">
                <svg class="w-6 h-6" style="color: var(--theme-pink);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-lg" style="color: var(--text-primary);">Telepon</h4>
                <a href="tel:{personalInfo.phone}" style="color: var(--theme-pink);">{personalInfo.phone}</a>
              </div>
            </li>
            <li class="flex items-start">
              <div class="p-3 rounded-xl mr-4" style="background: rgba(144,39,241,0.15);">
                <svg class="w-6 h-6" style="color: var(--theme-purple);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-lg" style="color: var(--text-primary);">Lokasi</h4>
                <p style="color: var(--text-muted);">{personalInfo.location}</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="p-8 rounded-2xl" style="background: var(--theme-grad);">
          <h3 class="text-2xl font-bold text-white mb-4">Mari Bekerja Sama!</h3>
          <p class="text-white/90 mb-6">
            Punya proyek menarik yang ingin Anda wujudkan? Saya siap membantu Anda mewujudkan ide menjadi kenyataan.
          </p>
          <button class="font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            style="background: white; color: var(--bg-base);">
            Diskusikan Proyek
          </button>
        </div>
      </div>
    </div>
  </div>
</section>