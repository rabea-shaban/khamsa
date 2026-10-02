import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  featuredLinksApi,
  AdminFeaturedLinkQuery,
} from '@/lib/api/featured-links.api';
import {
  CreateFeaturedLinkInput,
  UpdateFeaturedLinkInput,
} from '@/types/api';

export const FEATURED_LINKS_KEYS = {
  all: ['featured-links'] as const,
  public: ['public-featured-links'] as const,
  adminList: (params?: AdminFeaturedLinkQuery) => ['admin-featured-links', params] as const,
  detail: (id: string) => ['featured-link', id] as const,
};

/**
 * Public: Query active featured links
 */
export function usePublicFeaturedLinks() {
  return useQuery({
    queryKey: FEATURED_LINKS_KEYS.public,
    queryFn: () => featuredLinksApi.getPublicFeaturedLinks(),
    staleTime: 60 * 1000,
  });
}

/**
 * Admin: Query all featured links
 */
export function useAdminFeaturedLinks(params?: AdminFeaturedLinkQuery) {
  return useQuery({
    queryKey: FEATURED_LINKS_KEYS.adminList(params),
    queryFn: () => featuredLinksApi.getAdminFeaturedLinks(params),
    staleTime: 30 * 1000,
  });
}

/**
 * Admin: Create featured link mutation
 */
export function useCreateFeaturedLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFeaturedLinkInput) =>
      featuredLinksApi.createFeaturedLink(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FEATURED_LINKS_KEYS.all });
      queryClient.invalidateQueries({ queryKey: FEATURED_LINKS_KEYS.public });
      queryClient.invalidateQueries({ queryKey: ['admin-featured-links'] });
    },
  });
}

/**
 * Admin: Update featured link mutation
 */
export function useUpdateFeaturedLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateFeaturedLinkInput }) =>
      featuredLinksApi.updateFeaturedLink(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: FEATURED_LINKS_KEYS.all });
      queryClient.invalidateQueries({ queryKey: FEATURED_LINKS_KEYS.public });
      queryClient.invalidateQueries({ queryKey: ['admin-featured-links'] });
      queryClient.invalidateQueries({ queryKey: FEATURED_LINKS_KEYS.detail(variables.id) });
    },
  });
}

/**
 * Admin: Toggle active status mutation
 */
export function useToggleFeaturedLinkActive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => featuredLinksApi.toggleActive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FEATURED_LINKS_KEYS.all });
      queryClient.invalidateQueries({ queryKey: FEATURED_LINKS_KEYS.public });
      queryClient.invalidateQueries({ queryKey: ['admin-featured-links'] });
    },
  });
}

/**
 * Admin: Delete featured link mutation
 */
export function useDeleteFeaturedLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => featuredLinksApi.deleteFeaturedLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FEATURED_LINKS_KEYS.all });
      queryClient.invalidateQueries({ queryKey: FEATURED_LINKS_KEYS.public });
      queryClient.invalidateQueries({ queryKey: ['admin-featured-links'] });
    },
  });
}
