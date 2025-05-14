import ollama from "ollama";

import schema from "./schema.json";

// eslint-disable-next-line unicorn/prefer-top-level-await
(async () => {
    const model = "deepseek-coder-v2";
    // const model = "deepseek-r1:14b";

    const systemPrompt =
        "You are an assistant that will generate a logic circuits. You MUST always return JSON, not markdown, omit anything that is not a valid json.";

    const prompt = "Generate a simple 1 bit full adder";

    const response = await ollama.generate({
        model,
        system: systemPrompt,
        prompt,
        // format: "json",
        format: schema,
        stream: true,
    });

    let fullResponse: string = "";

    for await (const part of response) {
        const partMessage = part.response;

        process.stdout.write(partMessage);
        fullResponse += partMessage;
    }

    console.dir(JSON.parse(fullResponse), { depth: null });
})();
