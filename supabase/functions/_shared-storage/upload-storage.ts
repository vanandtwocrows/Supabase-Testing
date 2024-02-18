// Code to come, for uploading a file to a storage bucket

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

interface fileUpload {
  content: Uint8Array;
  contentType: string;
  fileName: string;
}

export async function uploadFileToStorage(
  bucketName: string,
  file: fileUpload,
  userAuth: string,
) {
  try {
    // Create console log group - collapsed
    console.groupCollapsed(
      `[INFO] Function invoked - Upload File To Storage`,
    );

    // Log request
    console.groupCollapsed("Request");
    console.table({
      bucketName,
      file,
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

    //upload image to Storage
    const { data: upload, error: uploadError } = await supabaseClient.storage
      .from(bucketName)
      .upload(file.fileName, file.content!.buffer, {
        contentType: file.contentType,
        cacheControl: "3600",
        upsert: false,
      });
    if (uploadError) {
      throw uploadError;
    } else {
      // Log the contents of the file
      console.info("Upload:", upload);
      // Close console log group
      console.groupEnd();
      return {
        data: upload,
        error: null,
      };
    }
  } catch (error) {
    // Log the error
    console.error("Failed to upload the file");
    console.error("Error:", error);
    // Close console log group
    console.groupEnd();
    return {
      data: null,
      error: error,
    };
  }
}
