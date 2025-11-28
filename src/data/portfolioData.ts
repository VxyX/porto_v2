// data/portfolioData.ts

// Data informasi pribadi
export const personalInfo = {
    name: "Programmer Svelte",
    title: "Frontend Developer & UI/UX Specialist",
    bio: "Saya adalah seorang pengembang web berpengalaman dengan fokus pada teknologi modern seperti Svelte, React, dan sistem desain yang responsif. Saya memiliki keahlian dalam menciptakan pengalaman pengguna yang menarik dan fungsional.",
    location: "Indonesia",
    email: "programmer@contoh.com",
    phone: "+62 123 4567 8900",
    availability: "Open for opportunities"
};

// Data keterampilan
export const skills = [
    { name: 'JavaScript', level: 95, category: 'programming' },
    { name: 'TypeScript', level: 90, category: 'programming' },
    { name: 'Svelte', level: 95, category: 'framework' },
    { name: 'React', level: 85, category: 'framework' },
    { name: 'Node.js', level: 80, category: 'backend' },
    { name: 'Python', level: 75, category: 'programming' },
    { name: 'TailwindCSS', level: 90, category: 'styling' },
    { name: 'GSAP', level: 70, category: 'animation' },
    { name: 'UI/UX Design', level: 80, category: 'design' },
    { name: 'GraphQL', level: 75, category: 'api' }
];

// Data proyek
export const projects = [
    {
        id: 1,
        title: 'Platform E-commerce Modern',
        description: 'Mengembangkan platform belanja online lengkap dengan sistem pembayaran, manajemen inventaris, dan dashboard admin menggunakan SvelteKit, Node.js, dan MongoDB.',
        technologies: ['Svelte', 'Node.js', 'MongoDB', 'Stripe API'],
        image: 'https://placehold.co/600x400/1a1a2e/8b5cf6?text=E-commerce',
        github: '#',
        live: '#',
        category: 'web'
    },
    {
        id: 2,
        title: 'Dashboard Analitik Bisnis',
        description: 'Membangun sistem visualisasi data real-time untuk membantu perusahaan dalam membuat keputusan bisnis berdasarkan data dengan menggunakan D3.js dan React.',
        technologies: ['React', 'D3.js', 'Python', 'PostgreSQL'],
        image: 'https://placehold.co/600x400/1a1a2e/3b82f6?text=Analytics',
        github: '#',
        live: '#',
        category: 'web'
    },
    {
        id: 3,
        title: 'Aplikasi Mobile Task Management',
        description: 'Mengembangkan aplikasi manajemen tugas cross-platform yang memungkinkan pengguna mengatur tugas mereka secara efisien dengan fitur notifikasi dan sinkronisasi cloud.',
        technologies: ['React Native', 'Firebase', 'Redux'],
        image: 'https://placehold.co/600x400/1a1a2e/6d28d9?text=Mobile+App',
        github: '#',
        live: '#',
        category: 'mobile'
    },
    {
        id: 4,
        title: 'Sistem Manajemen Konten',
        description: 'Membuat CMS yang fleksibel dan mudah digunakan untuk manajemen konten website dengan fitur drag-and-drop dan preview langsung.',
        technologies: ['SvelteKit', 'GraphQL', 'Prisma', 'PostgreSQL'],
        image: 'https://placehold.co/600x400/1a1a2e/8b5cf6?text=Content+Management',
        github: '#',
        live: '#',
        category: 'web'
    }
];

// Data sosial media
export const socialMedia = [
    { platform: 'GitHub', url: 'https://github.com', icon: 'github' },
    { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
    { platform: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
    { platform: 'Dribbble', url: 'https://dribbble.com', icon: 'dribbble' }
];