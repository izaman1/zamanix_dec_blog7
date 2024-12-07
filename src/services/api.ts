import { fetchApi } from '../config';

export interface Blog {
  _id: string;
  title: string;
  content: string;
  image: {
    url: string;
  };
  author: string;
  category: string;
  tags: string[];
  slug: string;
  createdAt: string;
}

export interface BlogsResponse {
  status: string;
  data: {
    blogs: Blog[];
    pagination: {
      currentPage: number;
      totalPages: number;
      total: number;
      hasMore: boolean;
    };
  };
}

export interface SingleBlogResponse {
  status: string;
  data: Blog;
}

export async function fetchBlogs() {
  return fetchApi<BlogsResponse>('/api/blogs');
}

export async function fetchBlogBySlug(slug: string) {
  return fetchApi<SingleBlogResponse>(`/api/blogs/${slug}`);
}

export async function createBlog(formData: FormData) {
  return fetchApi<SingleBlogResponse>('/api/blogs', {
    method: 'POST',
    body: formData,
    headers: {} // Let browser set content-type for FormData
  });
}

export async function updateBlog(id: string, formData: FormData) {
  return fetchApi<SingleBlogResponse>(`/api/blogs/${id}`, {
    method: 'PUT',
    body: formData,
    headers: {} // Let browser set content-type for FormData
  });
}

export async function deleteBlog(id: string) {
  return fetchApi<{ status: string; message: string }>(`/api/blogs/${id}`, {
    method: 'DELETE'
  });
}