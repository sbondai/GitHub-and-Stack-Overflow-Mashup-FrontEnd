const backendUrl = process.env.REACT_APP_BACKEND_URL;
const backendPort = process.env.REACT_APP_BACKEND_PORT;

export const searchGitHubProjects = async (query) => {
  try {
    if (!query) return [];

    const url = `${backendUrl}:${backendPort}/github/search?q=${encodeURIComponent(
      query
    )}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error("Failed to fetch data from GitHub API");
      return [];
    }

    const data = await response.json();
    if (Array.isArray(data)) {
      return data.map((item) => ({
        title: item.name,
        url: item.html_url,
        description: item.description,
      }));
    } else {
      console.error("Data is not in the expected format:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const searchStackOverflowQuestions = async (query) => {
  try {
    if (!query) return [];

    const url = `${backendUrl}:${backendPort}/stackoverflow/questions?tag=${encodeURIComponent(
      query
    )}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error("Failed to fetch data from StackOverflow API");
      return [];
    }

    const data = await response.json();
    if (Array.isArray(data)) {
      return data;
    } else {
      console.error("Data is not in the expected format:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const searchRelatedStackOverflowQuestions = async (title) => {
  const relatedQuestions = await searchStackOverflowQuestions(title);
  return relatedQuestions.map((question) => ({
    title: question.title,
    url: question.link,
    description: question.tags.join(", "),
  }));
};
