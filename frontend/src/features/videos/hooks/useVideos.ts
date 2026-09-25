import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { videosApi, VideoQueryParams } from '@/lib/api/videos.api';
import { Video, ContentStatus } from '@/types/api';

export function useVideos(params?: VideoQueryParams) {
  return useQuery({
    queryKey: ['public-videos', params],
    queryFn: () => videosApi.getVideos(params),
  });
}

export function useAdminVideos(params?: VideoQueryParams & { status?: ContentStatus | string }) {
  return useQuery({
    queryKey: ['admin-videos', params],
    queryFn: () => videosApi.getAdminVideos(params),
  });
}

export function useVideo(id: string | null | undefined) {
  return useQuery({
    queryKey: ['video', id],
    queryFn: async () => {
      const res = await videosApi.getVideoById(id as string);
      return res.data;
    },
    enabled: Boolean(id),
  });
}

export function useCreateVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Video>) => videosApi.createVideo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-videos'] });
      queryClient.invalidateQueries({ queryKey: ['public-videos'] });
    },
  });
}

export function useUpdateVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Video> }) =>
      videosApi.updateVideo(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-videos'] });
      queryClient.invalidateQueries({ queryKey: ['public-videos'] });
      queryClient.invalidateQueries({ queryKey: ['video', variables.id] });
    },
  });
}

export function usePublishVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => videosApi.publishVideo(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['admin-videos'] });
      queryClient.invalidateQueries({ queryKey: ['public-videos'] });
      queryClient.invalidateQueries({ queryKey: ['video', id] });
    },
  });
}

export function useUnpublishVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => videosApi.unpublishVideo(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['admin-videos'] });
      queryClient.invalidateQueries({ queryKey: ['public-videos'] });
      queryClient.invalidateQueries({ queryKey: ['video', id] });
    },
  });
}

export function useDeleteVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => videosApi.deleteVideo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-videos'] });
      queryClient.invalidateQueries({ queryKey: ['public-videos'] });
    },
  });
}
