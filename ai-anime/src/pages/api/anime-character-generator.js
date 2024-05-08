import Replicate from "replicate";
export default async function handler(req, res) {
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    });
    const { prompt } = req.body;
    try {
        const output = await replicate.run(
            "cjwbw/anything-v3-better-vae:09a5805203f4c12da649ec1923bb7729517ca25fcac790e640eaa9ed66573b65",
    {
                input: {
                    prompt: `masterpiece, best quality, illustration, beautiful detailed, finely det
    ailed, dramatic light, intricate details, ${prompt}`,
                },
            }
        );
        res.status(200).json({ characters: output });
    } catch (error) {
        console.error("AI anime character generation failed:", error);
        res.status(500).json({ error: "AI anime character generation failed" });
    }
}
