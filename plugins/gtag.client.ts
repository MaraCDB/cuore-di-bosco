export default defineNuxtPlugin(() => {
    const consent = useCookie('cookie_consent');
    if (consent.value === 'accepted') {
        // Carica GA script
        const script1 = document.createElement('script')
        script1.async = true
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
        document.head.appendChild(script1)

        const script2 = document.createElement('script')
        script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
    `
        document.head.appendChild(script2)
    }
    else {
        expireDeclinedAnalyticsCookies()
    }
})
