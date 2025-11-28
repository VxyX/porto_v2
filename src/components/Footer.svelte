<script>
    import { personalInfo } from '../data/portfolioData';
</script>

<footer class="relative py-16 bg-gradient-dark border-t border-purple-500/20">
    <!-- Animated background elements -->
    <div class="absolute top-0 left-1/4 w-48 h-48 rounded-full bg-purple-500/5 blur-3xl"></div>
    <div class="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-blue-500/5 blur-3xl"></div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
                <div class="text-2xl font-bold text-gradient-purple mb-4 flex items-center">
                    <span class="mr-2"> &lt;/&gt; </span> Programmer Svelte
                </div>
                <p class="text-gray-400 mb-6 max-w-xs">
                    Mewujudkan ide menjadi solusi digital yang inovatif dan fungsional.
                </p>
                <div class="flex space-x-4">
                    {#each [
                        { name: 'github', url: 'https://github.com', icon: 'G' },
                        { name: 'linkedin', url: 'https://linkedin.com', icon: 'L' },
                        { name: 'twitter', url: 'https://twitter.com', icon: 'X' },
                        { name: 'dribbble', url: 'https://dribbble.com', icon: 'D' }
                    ] as social, i}
                        <a
                            href={social.url}
                            class="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-600 transition-all duration-300"
                            aria-label={social.name}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {social.icon}
                        </a>
                    {/each}
                </div>
            </div>

            <div>
                <h3 class="text-lg font-semibold text-white mb-6">Navigasi</h3>
                <ul class="space-y-3">
                    {#each ['Beranda', 'Tentang', 'Keterampilan', 'Proyek', 'Kontak'] as item, i}
                        <li>
                            <a
                                href="#{item.toLowerCase()}"
                                class="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                            >
                                {item}
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>

            <div>
                <h3 class="text-lg font-semibold text-white mb-6">Kontak</h3>
                <ul class="space-y-3">
                    <li class="flex items-start">
                        <svg class="w-5 h-5 text-purple-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <span class="text-gray-400">{personalInfo.email}</span>
                    </li>
                    <li class="flex items-start">
                        <svg class="w-5 h-5 text-purple-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <span class="text-gray-400">{personalInfo.phone}</span>
                    </li>
                    <li class="flex items-start">
                        <svg class="w-5 h-5 text-purple-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span class="text-gray-400">{personalInfo.location}</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="border-t border-purple-500/20 mt-12 pt-8 text-center">
            <p class="text-gray-500">
                © {new Date().getFullYear()} Portofolio Programmer. Dibuat dengan ❤️ menggunakan Svelte dan TailwindCSS.
            </p>
        </div>
    </div>
</footer>