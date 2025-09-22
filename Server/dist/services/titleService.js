export function makeTitleFromTags(tags) {
    const head = tags.slice(0, 3).join(", ");
    const now = new Date().toLocaleDateString();
    const templates = [
        `Deep Dive: ${head} Through Today’s Lens`,
        `Unpacking ${head} — What You Didn’t Know`,
        `The Curious Case of ${head}`,
        `Breaking Down ${head} for the Informed Reader`,
        `Threads & Trends: ${head}`,
        `Beyond the Headlines: ${head}`,
        `What Everyone Missed About ${head}`,
        `Inside Look: ${head} in 2025`,
        `From Discussions to Decisions: ${head}`,
        `The Hidden Story Behind ${head}`,
        `Decoding ${head}: Facts, Insights & Opinions`,
        `Why ${head} Matters Right Now`,
        `A Fresh Perspective on ${head}`,
        `Navigating ${head}: Key Takeaways`,
        `The Untold Narrative of ${head}`
    ];
    // Pick a random template each time
    return templates[Math.floor(Math.random() * templates.length)];
}
export function summarizeText(text, maxSentences = 50) {
    if (!text)
        return "No content to summarize.";
    const sentences = text.split(/[.!?]\s/);
    return sentences.slice(0, maxSentences).join(". ") + ".";
}
