<script>
    import { onMount } from 'svelte';
    import { gsap } from '../utils/gsapSetup';
    import { skills } from '../data/portfolioData';

    let skillsSection;
    let skillsTitle;

    onMount(() => {
        // Animasi section saat masuk ke viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animasi judul
                    gsap.from(skillsTitle, {
                        opacity: 0,
                        y: 50,
                        duration: 1,
                        ease: "power3.out"
                    });

                    // Animasi kartu keterampilan
                    const skillCards = document.querySelectorAll('.skill-card');
                    skillCards.forEach((card, index) => {
                        gsap.from(card, {
                            opacity: 0,
                            y: 30,
                            duration: 0.6,
                            delay: 0.3 + (index * 0.1),
                            ease: "power2.out"
                        });
                    });
                }
            });
        });

        if (skillsSection) {
            observer.observe(skillsSection);
        }

        return () => {
            if (skillsSection) {
                observer.unobserve(skillsSection);
            }
        };
    });
</script>

<section id="keterampilan" bind:this={skillsSection} class="relative py-20 bg-gradient-dark">
    <!-- Animated background elements -->
    <div class="absolute top-20 left-20 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"></div>
    <div class="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
        <h2 bind:this={skillsTitle} class="text-4xl font-bold text-center text-white mb-16 animate-on-load">Keterampilan & Keahlian</h2>
        <p class="text-center text-gray-400 max-w-2xl mx-auto mb-16">
            Berikut adalah teknologi dan keterampilan yang saya kuasai dalam pengembangan perangkat lunak
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each skills as skill, i}
                <div class="skill-card bg-gradient-card rounded-2xl p-6 border border-purple-500/20 hover-lift transition-all duration-300">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 rounded-lg bg-gradient-purple-blue flex items-center justify-center text-white font-bold mr-4">
                            {skill.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <h3 class="text-lg font-bold text-white">{skill.name}</h3>
                            <div class="text-sm text-purple-400">{skill.category}</div>
                        </div>
                    </div>

                    <div class="mb-2 flex justify-between">
                        <span class="text-gray-400">Tingkat Keahlian</span>
                        <span class="text-purple-400 font-medium">{skill.level}%</span>
                    </div>

                    <div class="skill-bar">
                        <div
                            class="skill-progress"
                            style="width: {skill.level}%"
                        ></div>
                    </div>
                </div>
            {/each}
        </div>

        <!-- Additional skills section -->
        <div class="mt-20 p-8 bg-gradient-card rounded-2xl border border-purple-500/20">
            <h3 class="text-2xl font-bold text-white mb-8 text-center">Keterampilan Tambahan</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                {#each [
                    'Git & GitHub', 'Docker', 'CI/CD', 'Testing',
                    'Agile/Scrum', 'REST APIs', 'GraphQL', 'Cloud'
                ] as additionalSkill}
                    <div class="flex flex-col items-center p-4 rounded-xl bg-dark-800/50 hover:bg-dark-800 transition-colors duration-300">
                        <div class="text-purple-400 text-2xl mb-2">⚙️</div>
                        <div class="text-white text-center">{additionalSkill}</div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>