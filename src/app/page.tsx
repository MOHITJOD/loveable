import { trpc, getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import {Client} from "./client";
const page =async ()=>{
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.createAI.queryOptions({text : "mohitG"}))
  return(
  <HydrationBoundary state={dehydrate(queryClient)}>
    <Suspense fallback={<p>Loading...</p>}>
      <Client/>
    </Suspense>
  </HydrationBoundary>
  );
}
export default page;