
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
