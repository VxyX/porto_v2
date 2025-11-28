// utils/gsapSetup.ts
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrasi plugin GSAP
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export { gsap, ScrollTrigger, ScrollToPlugin };