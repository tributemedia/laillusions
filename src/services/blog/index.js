import axios from '@/utils/axios';
// utils
import { formatCategory, formatComment, formatPost } from "@/utils/formatBlog";
// config
import { API_CATEGORIES, API_COMMENTS, API_POSTS, API_USER } from "@/config-global";

class BlogApiService {
  static async getBlogData(query) {
    try {
      return await axios.get(API_POSTS, {
        params: query
      })
        .then(({ data, headers }) => (
            {
              posts: data.map((item) => formatPost(item)) || [],
              total: headers['x-wp-total'] || 0,
              pages: headers['x-wp-totalpages'] || 0,
            }
          )
        );
    } catch (error) {
      return [];
    }
  }

  static async createUser(data) {
    try {
      return await axios.post(API_USER, data);
    } catch (error) {
      console.error(error)
      return {
        error
      };
    }
  }
  
  static async createComment(data) {
    try {
      return await axios.post(API_COMMENTS, data);
    } catch (error) {
      return [];
    }
  }

  static async getCommentsList(query) {
    try {
      return await axios.get(API_COMMENTS, {
        params: query
      })
        .then(({ data, headers }) => (
            {
              content: data.map((item) => formatComment(item)) || [],
              total: headers['x-wp-total'] || 0,
              pages: headers['x-wp-totalpages'] || 0,
            }
          )
        );
    } catch (error) {
      return [];
    }
  }

  static async getCategories() {
    try {
      return await axios.get(API_CATEGORIES)
        .then(({ data }) => data.map((item) => formatCategory(item))
        );
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default BlogApiService;
