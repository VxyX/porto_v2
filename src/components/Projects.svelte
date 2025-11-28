<script>
    import { onMount } from 'svelte';
    import { gsap } from '../utils/gsapSetup';
    import { projects } from '../data/portfolioData';

    let projectsSection;
    let projectsTitle;

    onMount(() => {
        // Animasi section saat masuk ke viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animasi judul
                    gsap.from(projectsTitle, {
                        opacity: 0,
                        y: 50,
                        duration: 1,
                        ease: "power3.out"
                    });

                    // Animasi kartu proyek
                    const projectCards = document.querySelectorAll('.project-card');
                    projectCards.forEach((card, index) => {
                        gsap.from(card, {
                            opacity: 0,
                            y: 50,
                            duration: 0.7,
                            delay: 0.3 + (index * 0.1),
                            ease: "power2.out"
                        });
                    });
                }
            });
        });

        if (projectsSection) {
            observer.observe(projectsSection);
        }

        return () => {
            if (projectsSection) {
                observer.unobserve(projectsSection);
            }
        };
    });
</script>

<section id="proyek" bind:this={projectsSection} class="relative py-20 bg-gradient-dark">
    <!-- Animated background elements -->
    <div class="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl"></div>
    <div class="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
        <h2 bind:this={projectsTitle} class="text-4xl font-bold text-center text-white mb-8 animate-on-load">Portfolio Proyek</h2>
        <p class="text-center text-gray-400 max-w-2xl mx-auto mb-16">
            Berikut adalah beberapa proyek yang telah saya kerjakan selama ini
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
            {#each projects as project, i}
                <div class="project-card bg-gradient-card rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40">
                    <div class="relative overflow-hidden">
                        <img
                            src={project.image}
                            alt={project.title}
                            class="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div class="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-90"></div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-white mb-3">{project.title}</h3>
                        <p class="text-gray-400 mb-5">{project.description}</p>

                        <div class="flex flex-wrap gap-2 mb-6">
                            {#each project.technologies as tech}
                                <span class="px-3 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full">
                                    {tech}
                                </span>
                            {/each}
                        </div>

                        <div class="flex space-x-4">
                            <a
                                href={project.live}
                                class="flex-1 text-center py-3 px-4 bg-gradient-purple-blue text-white rounded-lg hover:opacity-90 transition-opacity duration-300 flex items-center justify-center"
                            >
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                </svg>
                                Lihat Proyek
                            </a>
                            <a
                                href={project.github}
                                class="flex-1 text-center py-3 px-4 bg-dark-800 text-white rounded-lg hover:bg-dark-700 transition-colors duration-300 flex items-center justify-center border border-gray-700"
                            >
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                                </svg>
                                Kode
                            </a>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <div class="text-center mt-16">
            <button class="px-8 py-4 bg-gradient-purple-blue text-white rounded-full hover:opacity-90 transition-opacity duration-300 font-medium">
                Lihat Lebih Banyak Proyek
            </button>
        </div>
    </div>
</section>