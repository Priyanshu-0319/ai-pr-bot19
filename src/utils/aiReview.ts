import { PatchesTypes } from "../types/index.js";

export async function aiReview(patches: PatchesTypes[]) {
  if (!patches || patches.length === 0) {
    return "## 🤖 AI Review\n\nNo code changes found in this PR.";
  }

  // Build diff text
  let diffText = "";
  for (const patch of patches) {
    diffText += `
File: ${patch.filename}
---------------------
${patch.patch ?? "No diff available"}
`;
  }

  const prompt = `
You are a senior software engineer reviewing a GitHub Pull Request.

Provide the review in GitHub Markdown with:
1. Summary
2. Bugs / Issues
3. Suggestions
4. Performance
5. Security
6. Final recommendation

Code diff:
${diffText}
`;

  try {
    console.log("Gemini key loaded:", !!process.env.GEMINI_API_KEY);
    console.log("Gemini key prefix:", process.env.GEMINI_API_KEY?.substring(0, 5));
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
  const errorBody = await response.text();

  console.error("Gemini Status:", response.status);
  console.error("Gemini Response:", errorBody);

  throw new Error(`Gemini API error: ${response.status}`);
}

    const data = await response.json();

    const aiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "AI review could not be generated.";

    return `## 🤖 AI Review\n\n${aiText}`;
  } catch (error) {
    console.error("Gemini fetch error:", error);

    return `## 🤖 AI Review

❌ Failed to generate AI review. Please check Gemini API key or quota.`;
  }
}
