<script>
    import { onMount } from 'svelte';
    import { gsap } from '../utils/gsapSetup';
    import { personalInfo } from '../data/portfolioData';

    let aboutSection;
    let aboutTitle;
    let aboutContent;

    onMount(() => {
        // Animasi section saat masuk ke viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animasi judul
                    gsap.from(aboutTitle, {
                        opacity: 0,
                        y: 50,
                        duration: 1,
                        ease: "power3.out"
                    });

                    // Animasi konten
                    gsap.from(aboutContent, {
                        opacity: 0,
                        y: 30,
                        duration: 0.8,
                        delay: 0.3,
                        ease: "power3.out"
                    });

                    // Animasi elemen-elemen detail
                    const detailElements = document.querySelectorAll('.detail-item');
                    detailElements.forEach((el, index) => {
                        gsap.from(el, {
                            opacity: 0,
                            x: -30,
                            duration: 0.6,
                            delay: 0.5 + (index * 0.1),
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: el,
                                start: "top 80%"
                            }
                        });
                    });
                }
            });
        });

        if (aboutSection) {
            observer.observe(aboutSection);
        }

        return () => {
            if (aboutSection) {
                observer.unobserve(aboutSection);
            }
        };
    });
</script>

<section id="tentang" bind:this={aboutSection} class="relative py-20 bg-gradient-dark">
    <!-- Animated background elements -->
    <div class="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"></div>
    <div class="absolute bottom-1/4 right-10 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
        <h2 bind:this={aboutTitle} class="text-4xl font-bold text-center text-white mb-16 animate-on-load">Tentang Saya</h2>
        <div bind:this={aboutContent} class="grid lg:grid-cols-2 gap-16 items-center">
            <div class="space-y-6">
                <div class="prose prose-lg text-gray-300 leading-relaxed">
                    <p class="text-lg">
                        {personalInfo.bio}
                    </p>
                </div>

                <div class="mt-10 p-6 bg-gradient-card rounded-2xl border border-purple-500/20">
                    <h3 class="text-xl font-semibold text-white mb-6 flex items-center">
                        <span class="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                        Detail Profil
                    </h3>
                    <div class="space-y-4">
                        {#each [
                            { icon: '🗺️', label: 'Lokasi', value: personalInfo.location },
                            { icon: '✉️', label: 'Email', value: personalInfo.email },
                            { icon: '📞', label: 'Telepon', value: personalInfo.phone },
                            { icon: '💼', label: 'Status', value: personalInfo.availability }
                        ] as detail, i}
                            <div class="detail-item flex items-start py-2">
                                <span class="text-2xl mr-4">{detail.icon}</span>
                                <div>
                                    <div class="text-purple-400 text-sm font-medium">{detail.label}</div>
                                    <div class="text-gray-300">{detail.value}</div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>

            <div class="space-y-8">
                <div class="p-8 bg-gradient-card rounded-2xl border border-purple-500/20">
                    <h3 class="text-2xl font-bold text-white mb-8 flex items-center">
                        <span class="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                        Teknologi & Keterampilan
                    </h3>
                    <div class="space-y-6">
                        {#each ['JavaScript', 'TypeScript', 'Svelte', 'React', 'Node.js', 'Python', 'TailwindCSS', 'GraphQL'] as skill, i}
                            <div>
                                <div class="flex justify-between mb-2">
                                    <span class="text-gray-300 font-medium">{skill}</span>
                                    <span class="text-purple-400">{(80 + (i % 3) * 5)}%</span>
                                </div>
                                <div class="skill-bar">
                                    <div
                                        class="skill-progress"
                                        style="width: {(80 + (i % 3) * 5)}%"
                                    ></div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="p-6 bg-gradient-card rounded-2xl border border-purple-500/20 text-center hover-lift">
                        <div class="text-3xl font-bold text-white">5+</div>
                        <div class="text-gray-400">Tahun Pengalaman</div>
                    </div>
                    <div class="p-6 bg-gradient-card rounded-2xl border border-purple-500/20 text-center hover-lift">
                        <div class="text-3xl font-bold text-white">50+</div>
                        <div class="text-gray-400">Proyek Selesai</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>