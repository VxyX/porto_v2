import './app.css'
import App from './App.svelte'
import { animatePageLoad } from './utils/gsapAnimations'

const app = new App({
  target: document.getElementById('app')!,
})

// Jalankan animasi saat aplikasi dimuat
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Beri sedikit waktu untuk komponen sepenuhnya dimuat
    setTimeout(() => {
      animatePageLoad();
    }, 100);
  });
} else {
  // Jika document sudah siap, jalankan langsung
  setTimeout(() => {
    animatePageLoad();
  }, 100);
}

export default app
