import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";

const model = gemini({ model: "gemini-1.5-flash" });
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event}) => {
    const codeWritter = createAgent({
      name: 'codeWritter',
      system:
        "You are an expert next.js developer with more then 10 years of experience and you write readabl,maintainable code. you write simple next.js and react snippets",
      model: gemini({model:"gemini-2.0-flash"}),
    });

    const { output } = await codeWritter.run(
      `write the following snippet: ${event.data.value}`,
    ); 
    console.log(output);
    // [{ role: 'assistant', content: 'function removeUnecessaryWhitespace(...' }]

    return {  output };
  },
);





