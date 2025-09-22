import axios from "axios";
export async function fetchFromTwitter(tags, maxPosts = 5) {
    console.log("✅ fetchFromTwitter called with tags:", tags, "maxPosts:", maxPosts);
    const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
    console.log("🔹 Bearer token exists?", !!BEARER_TOKEN);
    if (!BEARER_TOKEN) {
        console.log("⚠️ No Bearer token found. Exiting.");
        return [];
    }
    if (!tags || tags.length === 0) {
        console.log("⚠️ No tags provided. Exiting.");
        return [];
    }
    // Build query string
    const query = tags.map((t) => t.replace(/\s+/g, "+")).join("+");
    console.log("🔹 Constructed query string:", query);
    try {
        const url = "https://api.twitter.com/2/tweets/search/recent";
        console.log("🔹 Fetching URL:", url);
        const resp = await axios.get(url, {
            headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
            params: {
                query,
                max_results: maxPosts,
                "tweet.fields": "created_at,text",
            },
            timeout: 15000,
        });
        console.log("🔹 Raw response received:", resp.data);
        const tweets = resp.data?.data ?? [];
        console.log(`🔹 Total tweets fetched: ${tweets.length}`);
        const results = tweets
            .map((t, idx) => {
            const post = {
                title: t.text.slice(0, 50) || "",
                content: t.text || "",
            };
            console.log(`🔹 Parsed tweet ${idx + 1}:`, post);
            return post;
        })
            .filter((p) => p.content);
        console.log(`🔹 Filtered posts with content: ${results.length}`);
        const finalResults = results.slice(0, maxPosts);
        console.log(`🔹 Returning final posts (maxPosts applied): ${finalResults.length}`);
        return finalResults;
    }
    catch (err) {
        console.log("❌ Error fetching tweets:", err.response?.data || err.message);
        return [];
    }
}
export async function fetchFromReddit(tags, options = {}) {
    const maxPosts = 5;
    // console.log(" tags, "maxPosts:", maxPosts);
    if (!tags || tags.length === 0) {
        // console.log(" No tags provided");
        return [];
    }
    const query = tags.map((t) => t.replace(/\s+/g, "+")).join("+");
    // console.log("Reddit search query:", query);
    try {
        const url = `https://www.reddit.com/search.json?q=${query}&limit=${maxPosts}&sort=relevance`;
        // console.log(" Fetching from Reddit URL:", url);
        const resp = await axios.get(url, {
            headers: { "User-Agent": "social-blog-backend/1.0 (by /u/This-Inspector-3519)" },
            timeout: 15000,
        });
        // console.log(" response :", resp.data?.data?.children?.length, "posts");
        const posts = resp.data?.data?.children ?? [];
        const results = posts
            .map((p) => {
            const post = {
                title: p.data.title || "",
                content: p.data.selftext || p.data.title || "",
            };
            // console.log("🔹 Parsed post:", post);
            return post;
        })
            .filter((p) => p.content);
        // console.log(" results:", results.length);
        return results.slice(0, maxPosts);
    }
    catch (err) {
        // console.error(" Reddit fetch error:", (err as Error).message);
        return [];
    }
}
export async function fetchFromDev(tags, options = {}) {
    const maxPosts = options.maxPosts || 5;
    if (!tags || tags.length === 0)
        return [];
    const results = [];
    try {
        for (const tag of tags) {
            const url = `https://dev.to/api/articles?tag=${encodeURIComponent(tag)}&per_page=${maxPosts}`;
            const resp = await axios.get(url, { timeout: 15000 });
            const posts = resp.data || [];
            posts.slice(0, maxPosts).forEach((p) => {
                results.push({
                    title: p.title || "",
                    content: p.description || p.body_markdown?.slice(0, 200) || p.title,
                });
            });
        }
        //  fetched data
        // console.log("DEV fetched posts:", JSON.stringify(results, null, 2));
    }
    catch (err) {
        console.error("Dev fetch error:", err.message);
    }
    return results.slice(0, maxPosts);
}
