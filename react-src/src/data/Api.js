const endPoint = "http://202.166.207.19/c/rahul/playground/wp-json";

const wpAPI = {
  settings: `${endPoint}/wp/v2/settings`,
  posts: `${endPoint}/wp/v2/posts`,
  pages: `${endPoint}/wp/v2/pages`,
  categories: `${endPoint}/wp/v2/categories`,
  tags: `${endPoint}/wp/v2/tags`
};

export default wpAPI;