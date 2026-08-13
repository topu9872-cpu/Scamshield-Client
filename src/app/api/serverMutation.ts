const BASE_URL = process.env.NEXT_PUBLIC_URL;
export const userPostData = async (
  url: string,
  data: unknown,
) => {


  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseText = await res.text();

    let responseData;

    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = {
        message: responseText,
      };
    }

    if (!res.ok) {
      throw new Error(
        responseData?.message ||
          `POST failed: ${res.status} ${res.statusText}`,
      );
    }

    return responseData;
  } catch (error) {
    console.error("userPostData error:", error);
    throw error;
  }
};

export const getData = async (url: string) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`);

    if (!res.ok) {
      throw new Error(`GET failed: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("getData error:", error);
    throw error;
  }
};
