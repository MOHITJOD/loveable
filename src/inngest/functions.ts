import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";
import {Sandbox} from "@e2b/code-interpreter";
import { getSandbox } from "./utils";


const model = gemini({ model: "gemini-1.5-flash" });
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event,step}) => {
    const sandboxID = await step.run("get-sandbox-id",async()=>{
      const sandbox = await Sandbox.create("loveable-nextjs-mohit-713-2");
      return sandbox.sandboxId;
    });
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

const sandboxUrl = await step.run("get-sandbox-url",async()=>{
  const sandbox = await getSandbox(sandboxID);
  const host= sandbox.getHost(3000);
  return `https://${host}`
});


    return {  output, sandboxUrl };
  },
);





