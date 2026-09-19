/* Moodsie service worker — daily messages 💌 */
const DAILY_MESSAGES = [
    "Every day may not be good, but there's something good in every day 🌷",
    "You are blooming, even on days you can't see it 🌱",
    "Rest is productive too 🌙",
    "Small steps still count as steps 🐾",
    "Be as soft with yourself as you are with others 🤍",
    "One deep breath can change your whole day 🌬️",
    "Your feelings are valid — all of them 💗",
    "Drink some water, little flower 💧",
    "Flowers don't compete, they just bloom 🌻",
    "You don't have to be perfect to be wonderful ♡",
    "It's okay to start over — gardens do it every spring 🌸",
    "You've survived 100% of your hardest days so far 💪",
    "Somebody smiles just because you exist 🌸",
    "Progress, not perfection 🌷",
    "You're allowed to take up space 🌟",
    "Today is a fresh little page ✍️",
    "Healing isn't linear, and that's okay 🤍",
    "The bunny believes in you 🐰",
    "Even the moon takes a month to become full 🌙",
    "You make ordinary days feel warm ☀️",
    "Your heart is doing its best today too 💕",
    "Slow mornings are self-care ☕",
    "Crying is just your heart watering itself 🌧️",
    "You are more than one bad day 🌈",
    "Look how far you've come already 🌻",
    "Joy can be tiny: warm socks, good songs 🎧",
    "The garden is proud of you 🌷",
    "Nothing lasts forever — not even bad moods 🌬️",
    "You deserve the love you give so freely 💗",
    "Today's forecast: growth with a chance of sparkles ✨",
    "You're not late. You're on your own path 🌸",
    "Sending you a big virtual hug 🤗",
    "It's brave to feel things deeply 💧",
    "Water, sunshine, and a little patience — that's all 🌱",
    "You light up rooms more than you know ✨",
    "Be proud of your small wins today 🏆",
    "A bad day is just one page, not the whole book 📖",
    "You are someone's favorite person 🤍",
    "Grow through what you go through 🌻",
    "The best is quietly on its way 💌"
];

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

async function showDailyNotification() {
    const dayIndex = Math.floor(Date.now() / 86400000);
    const msg = DAILY_MESSAGES[dayIndex % DAILY_MESSAGES.length];
    try {
        await self.registration.showNotification('Moodsie 🎀', {
            body: msg,
            icon: 'icon-girl.svg',
            tag: 'moodsie-daily',
            renotify: true
        });
    } catch (e) {}
}

self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'daily-msg') event.waitUntil(showDailyNotification());
});

self.addEventListener('message', (event) => {
    if (event.data === 'show-daily') event.waitUntil(showDailyNotification());
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        self.clients.matchAll({ type: 'window' }).then((list) => {
            for (const client of list) { if ('focus' in client) return client.focus(); }
            return self.clients.openWindow('./');
        })
    );
});
