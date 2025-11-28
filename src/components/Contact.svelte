<script>
    import { onMount } from 'svelte';
    import { gsap } from '../utils/gsapSetup';
    import { personalInfo, socialMedia } from '../data/portfolioData';

    let contactSection;
    let contactTitle;
    let contactForm;
    let contactInfo;

    onMount(() => {
        // Animasi section saat masuk ke viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animasi judul
                    gsap.from(contactTitle, {
                        opacity: 0,
                        y: 50,
                        duration: 1,
                        ease: "power3.out"
                    });

                    // Animasi form dan info kontak
                    gsap.from(contactForm, {
                        opacity: 0,
                        x: -50,
                        duration: 0.8,
                        delay: 0.2,
                        ease: "power3.out"
                    });

                    gsap.from(contactInfo, {
                        opacity: 0,
                        x: 50,
                        duration: 0.8,
                        delay: 0.3,
                        ease: "power3.out"
                    });
                }
            });
        });

        if (contactSection) {
            observer.observe(contactSection);
        }

        return () => {
            if (contactSection) {
                observer.unobserve(contactSection);
            }
        };
    });

    // Fungsi untuk menangani submit form
    function handleSubmit(e) {
        e.preventDefault();
        alert('Terima kasih! Pesan Anda telah dikirim.');
    }
</script>

<section id="kontak" bind:this={contactSection} class="relative py-20 bg-gradient-dark">
    <!-- Animated background elements -->
    <div class="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"></div>
    <div class="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl"></div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
        <h2 bind:this={contactTitle} class="text-4xl font-bold text-center text-white mb-8 animate-on-load">Mari Berdiskusi</h2>
        <p class="text-center text-gray-400 max-w-2xl mx-auto mb-16">
            Punya pertanyaan, proyek, atau hanya ingin berkenalan? Silakan kirimkan pesan kepada saya.
        </p>

        <div class="grid lg:grid-cols-2 gap-16">
            <form
                bind:this={contactForm}
                class="contact-form bg-gradient-card rounded-2xl p-8 border border-purple-500/20 shadow-lg"
                on:submit={handleSubmit}
            >
                <div class="mb-6">
                    <label class="block text-gray-300 mb-3 font-medium" for="name">Nama Lengkap</label>
                    <input
                        type="text"
                        id="name"
                        class="form-input"
                        placeholder="Nama Anda"
                    />
                </div>
                <div class="mb-6">
                    <label class="block text-gray-300 mb-3 font-medium" for="email">Alamat Email</label>
                    <input
                        type="email"
                        id="email"
                        class="form-input"
                        placeholder="email@contoh.com"
                    />
                </div>
                <div class="mb-6">
                    <label class="block text-gray-300 mb-3 font-medium" for="subject">Subjek Pesan</label>
                    <input
                        type="text"
                        id="subject"
                        class="form-input"
                        placeholder="Topik pesan Anda"
                    />
                </div>
                <div class="mb-8">
                    <label class="block text-gray-300 mb-3 font-medium" for="message">Pesan</label>
                    <textarea
                        id="message"
                        rows="5"
                        class="form-input min-h-[150px]"
                        placeholder="Tulis pesan Anda di sini..."
                    ></textarea>
                </div>
                <button
                    type="submit"
                    class="w-full bg-gradient-purple-blue text-white font-bold py-4 px-6 rounded-lg hover:opacity-90 transition-opacity duration-300 text-lg"
                >
                    Kirim Pesan
                </button>
            </form>

            <div bind:this={contactInfo} class="space-y-8">
                <div class="bg-gradient-card rounded-2xl p-8 border border-purple-500/20">
                    <h3 class="text-2xl font-bold text-white mb-6 flex items-center">
                        <span class="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                        Informasi Kontak
                    </h3>
                    <ul class="space-y-6">
                        <li class="flex items-start group">
                            <div class="bg-purple-600/20 p-3 rounded-xl mr-4 group-hover:bg-purple-600/30 transition-colors duration-300">
                                <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 class="text-white font-semibold text-lg">Email</h4>
                                <a href="mailto:{personalInfo.email}" class="text-purple-400 hover:text-purple-300 transition-colors duration-300">{personalInfo.email}</a>
                            </div>
                        </li>
                        <li class="flex items-start group">
                            <div class="bg-blue-500/20 p-3 rounded-xl mr-4 group-hover:bg-blue-500/30 transition-colors duration-300">
                                <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 class="text-white font-semibold text-lg">Telepon</h4>
                                <a href="tel:{personalInfo.phone}" class="text-blue-400 hover:text-blue-300 transition-colors duration-300">{personalInfo.phone}</a>
                            </div>
                        </li>
                        <li class="flex items-start group">
                            <div class="bg-purple-600/20 p-3 rounded-xl mr-4 group-hover:bg-purple-600/30 transition-colors duration-300">
                                <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 class="text-white font-semibold text-lg">Lokasi</h4>
                                <p class="text-gray-400">{personalInfo.location}</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="bg-gradient-card rounded-2xl p-8 border border-purple-500/20">
                    <h3 class="text-2xl font-bold text-white mb-6 flex items-center">
                        <span class="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                        Sosial Media
                    </h3>
                    <div class="grid grid-cols-2 gap-4">
                        {#each [
                            { platform: 'GitHub', url: '#', icon: 'github', color: 'hover:text-purple-400' },
                            { platform: 'LinkedIn', url: '#', icon: 'linkedin', color: 'hover:text-blue-400' },
                            { platform: 'Twitter', url: '#', icon: 'twitter', color: 'hover:text-sky-400' },
                            { platform: 'Instagram', url: '#', icon: 'instagram', color: 'hover:text-pink-400' }
                        ] as social, i}
                            <a
                                href={social.url}
                                class="flex items-center p-4 bg-dark-800 rounded-xl hover:bg-dark-700 transition-colors duration-300 group"
                            >
                                <div class="mr-3">
                                    <span class="text-xl">{social.platform.charAt(0)}</span>
                                </div>
                                <span class="text-gray-300 group-hover:text-white transition-colors duration-300">{social.platform}</span>
                            </a>
                        {/each}
                    </div>
                </div>

                <div class="bg-gradient-to-r from-purple-600 to-blue-500 p-8 rounded-2xl">
                    <h3 class="text-2xl font-bold text-white mb-4">Mari Bekerja Sama!</h3>
                    <p class="text-white/90 mb-6">
                        Punya proyek menarik yang ingin Anda wujudkan? Saya siap membantu Anda mewujudkan ide menjadi kenyataan.
                    </p>
                    <button class="bg-white text-dark-900 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                        Diskusikan Proyek
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>