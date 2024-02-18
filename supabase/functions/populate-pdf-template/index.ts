// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

Deno.serve(async (req) => {
  // Create console log group - collapsed
  const currentDate = new Date(); // Get the date
  const formattedDate = currentDate.toISOString(); // Format the date as a string
  console.groupCollapsed(
    `[INFO] Function invoked - Populating pdf template - ${formattedDate}`,
  );

  // Collect request
  const reqJson = await req.json();
  // Log request
  console.groupCollapsed("Request");
  console.table(reqJson);
  console.groupEnd();
  // COllect vars from request
  const { name } = reqJson;

  // Do something
  const data = {
    message: `Hello ${name}!`,
  };
  
  // print the output
  console.info("Data", data);
  // Close console log group
  console.groupEnd();

  // Return response
  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  );
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/populate-pdf-template' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
