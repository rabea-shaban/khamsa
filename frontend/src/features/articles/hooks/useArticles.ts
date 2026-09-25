import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { articlesApi } from '@/lib/api/articles.api';
import { Article, ArticleFilterParams } from '../types/article.types';

export function useAdminArticles(params?: ArticleFilterParams) {
  return useQuery({
    queryKey: ['articles', 'admin', params],
    queryFn: async () => {
      const res = await articlesApi.getAdminArticles({
        page: params?.page,
        limit: params?.limit,
        search: params?.search,
        category: params?.category,
        tag: params?.tag,
        status: params?.status,
        sort: params?.sort,
      });
      return res.data;
    },
    staleTime: 30 * 1000,
  });
}

export function useArticle(id: string) {
  return useQuery({
    queryKey: ['articles', 'detail', id],
    queryFn: async () => {
      const res = await articlesApi.getArticleById(id);
      return res.data;
    },
    enabled: Boolean(id),
    staleTime: 60 * 1000,
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Article>) => {
      const res = await articlesApi.createArticle(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Article> }) => {
      const res = await articlesApi.updateArticle(id, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['articles', 'detail', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await articlesApi.deleteArticle(id);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function usePublishArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await articlesApi.publishArticle(id);
      return res.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['articles', 'detail', id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useUnpublishArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await articlesApi.unpublishArticle(id);
      return res.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['articles', 'detail', id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}
