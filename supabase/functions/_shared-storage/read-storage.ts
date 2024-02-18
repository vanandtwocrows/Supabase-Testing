// Code to come, for reading a file from a storage bucket

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

export async function readFileFromStorage(
  bucketName: string,
  fileName: string,
  userAuth: string,
) {
  try {
    // Create console log group - collapsed
    console.groupCollapsed(
      `[INFO] Function invoked - Read File From Storage`,
    );

    // Log request
    console.groupCollapsed("Request");
    console.table({
      bucketName,
      fileName,
      userAuth,
    });
    console.groupEnd();

    // Create a Supabase client with the Auth context of the logged in user.
    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get("SUPABASE_URL")!,
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get("SUPABASE_ANON_KEY")!,
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      {
        global: {
          headers: { Authorization: userAuth },
        },
      },
    );

    // Log supabase client
    console.info("Client created:", supabaseClient);

    const { data, error } = await supabaseClient.storage.from(bucketName)
      .download(fileName);
    if (error) throw error;
    // file contents are returned as a blob, we can convert it to utf-8 text by calling text() method.
    const contents = await data.text();

    // Log the contents of the file
    console.info("Contents:", contents);
    // Close console log group
    console.groupEnd();

    return {
      data: contents,
      error: null,
    };
  } catch (error) {
    // Log the error
    console.error("Failed to download the file");
    console.error("Error:", error);
    // Close console log group
    console.groupEnd();

    return {
      data: null,
      error: error.message,
    };
  }
}
