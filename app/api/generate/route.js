import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  const { diff } = await req.json();

  if (!diff || diff.trim().length === 0) {
    return Response.json({ error: "No diff provided" }, { status: 400 });
  }

  const chat = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "system",
        content: `You are an expert developer who writes perfect Git commit messages.
Given a git diff, generate exactly 5 commit messages following Conventional Commits format.
Each message should be on a new line, numbered 1-5.
Format: type(scope): description
Types: feat, fix, refactor, style, docs, chore
Keep each message under 72 characters.
Only return the 5 numbered messages, nothing else.`,
      },
      {
        role: "user",
        content: `Write 5 commit messages for this diff:\n\n${diff.slice(0, 3000)}`,
      },
    ],
  });

  const text = chat.choices[0].message.content;
  const messages = text
    .split("\n")
    .filter((line) => line.match(/^\d\./))
    .map((line) => line.replace(/^\d\.\s*/, "").trim());

  return Response.json({ messages });
}