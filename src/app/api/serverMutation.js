const BASE_URL = process.env.NEXT_PUBLIC_URL;

export const userPostData = async (url, data) => {
  console.log(url, data);
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to post data");
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getData = async (url) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      headers: {
        "Content-Type": "application/json",
      },
    
    });
    if (!res.ok) throw new Error("Failed to post data");
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
