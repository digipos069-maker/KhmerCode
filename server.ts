import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize Gemini AI client safely
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API Route 1: AI Khmer Code Mentor / Explainer / Hint Generator
  app.post("/api/ai-tutor", async (req, res) => {
    try {
      const { userCode, challengeTitle, challengeDesc, userQuery, mode } = req.body;
      const ai = getAiClient();

      if (!ai) {
        return res.status(500).json({
          error: "សូមអភ័យទោស API Key GEMINI មិនទាន់បានកំណត់ឡើយ។ (GEMINI_API_KEY is not configured.)",
        });
      }

      let systemPrompt = `You are "អ្នកគ្រូកូដ AI" (AI Khmer Coding Tutor), an encouraging, patient, and ultra-friendly coding mentor for Cambodian students learning programming.
Always respond in natural, friendly Khmer (ភាសាខ្មែរ) mixed cleanly with standard programming terminology where helpful (e.g., Variable / អថេរ, Function / អនុគមន៍, Loop / រង្វិលជុំ, Array / អារេ, Return / រ៉ីថើន).
Use formatting like code blocks (\`\`\`), bold points, and emojis (✨, 💡, 🚀, 👏, 🎯) to make it look like an engaging game tutorial.
Keep explanations clear, easy to understand for beginners, and actionable.`;

      let userPrompt = "";

      if (mode === "hint") {
        userPrompt = `អ្នកសិក្សាកំពុងជាប់គាំងលើលំហាត់: "${challengeTitle}"
បរិយាយលំហាត់: ${challengeDesc}
កូដបច្ចុប្បន្នរបស់ពួកគេ:
\`\`\`javascript
${userCode || "// មិនទាន់មានកូដ"}
\`\`\`
សូមផ្តល់ 'តម្រុយ' (Hint) ខ្លីៗ ២-៣ ចំនុចជាភាសាខ្មែរ ដើម្បីជួយអោយពួកគេអាចគិត និងដោះស្រាយដោយខ្លួនឯង ដោយមិនបាច់ប្រាប់ចម្លើយទាំងស្រុងភ្លាមៗនោះទេ។`;
      } else if (mode === "explain-error") {
        userPrompt = `អ្នកសិក្សាបានរត់កូដ ប៉ុន្តែតេស្តមិនឆ្លង ឬមានកំហុស Error។
លំហាត់: "${challengeTitle}"
កូដរបស់ពួកគេ:
\`\`\`javascript
${userCode}
\`\`\`
កំហុស/ព័ត៌មានបន្ថែមពីអ្នកប្រើប្រាស់: ${userQuery || "តេស្តបរាជ័យ"}
សូមពន្យល់ជាភាសាខ្មែរយ៉ាងរាក់ទាក់ថា ហេតុអ្វីបានជាកូដនេះមានកំហុស និងរបៀបកែតម្រូវវាអោយត្រូវតាមលក្ខខណ្ឌ។`;
      } else {
        // general query / chat
        userPrompt = `សំណួរពីអ្នកសិក្សា: "${userQuery}"
លំហាត់បច្ចុប្បន្ន: "${challengeTitle || 'ទូទៅ'}"
កូដបច្ចុប្បន្ន:
\`\`\`javascript
${userCode || "// គ្មានកូដ"}
\`\`\`
សូមឆ្លើយតបជាភាសាខ្មែរយ៉ាងលម្អិត រាក់ទាក់ និងងាយយល់បំផុត!`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "សុំទោស ខ្ញុំមិនអាចបង្កើតចម្លើយបានទេនៅពេលនេះ។";
      res.json({ reply: replyText });
    } catch (err: any) {
      console.error("AI Tutor Error:", err);
      res.status(500).json({ error: err.message || "មានបញ្ហាបច្ចេកទេសជាមួយ AI Tutor" });
    }
  });

  // API Route 2: Generate Custom Khmer Coding Challenge using AI
  app.post("/api/generate-challenge", async (req, res) => {
    try {
      const { topic, difficulty, language } = req.body;
      const ai = getAiClient();

      if (!ai) {
        return res.status(500).json({
          error: "GEMINI_API_KEY missing",
        });
      }

      const prompt = `Create a fun gamified programming challenge for Khmer learners in JSON format.
Topic: ${topic || "JavaScript Basics"}
Difficulty: ${difficulty || "Beginner"} (Level 1-10)
Language: ${language || "javascript"}

Return JSON strictly matching this schema:
{
  "id": "custom-ai-1",
  "title": "ចំណងជើងលំហាត់ជាភាសាខ្មែរ (e.g. គណនាប្រាក់ឧបត្ថម្ភ)",
  "titleEn": "English Title",
  "topic": "${topic || 'Custom'}",
  "difficulty": "ងាយស្រួល / មធ្យម / ពិបាក",
  "xp": 100,
  "gems": 20,
  "story": "សាច់រឿងហ្គេមបេសកកម្មខ្លីៗជាភាសាខ្មែរ (Game quest storyline in Khmer, e.g. 'វីរបុរសត្រូវការគណនាកម្លាំងវាយប្រហារ...')",
  "description": "ការណែនាំលម្អិតអំពីអ្វីដែលត្រូវសរសេរជាភាសាខ្មែរ",
  "starterCode": "// សរសេរកូដនៅទីនេះ\\nfunction solution(a, b) {\\n  return 0;\\n}",
  "solutionHint": "តម្រុយជំនួយជាភាសាខ្មែរ",
  "testCases": [
    {
      "inputDescription": "solution(5, 10)",
      "testFnCall": "solution(5, 10)",
      "expectedOutput": "15",
      "isSecret": false
    },
    {
      "inputDescription": "solution(100, 200)",
      "testFnCall": "solution(100, 200)",
      "expectedOutput": "300",
      "isSecret": true
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const jsonText = response.text || "{}";
      const challengeObj = JSON.parse(jsonText);
      res.json({ challenge: challengeObj });
    } catch (err: any) {
      console.error("Generate Challenge Error:", err);
      res.status(500).json({ error: err.message || "Failed to generate challenge" });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "KhmerCode Quest" });
  });

  // Vite development vs production setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🎮 KhmerCode Quest server running on http://localhost:${PORT}`);
  });
}

startServer();
