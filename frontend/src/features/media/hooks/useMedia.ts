import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mediaApi } from '@/lib/api/media.api';

export interface UseMediaParams {
  page?: number;
  limit?: number;
  folder?: string;
  mimeType?: string;
}

export function useMediaList(params?: UseMediaParams) {
  return useQuery({
    queryKey: ['admin-media', params?.page, params?.limit, params?.folder, params?.mimeType],
    queryFn: async () => {
      const res = await mediaApi.getMediaList(params);
      return res.data;
    },
    staleTime: 30 * 1000,
  });
}

export function useUploadMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file, folder }: { file: File; folder?: string }) => {
      const formData = new FormData();
      formData.append('file', file);
      if (folder) {
        formData.append('folder', folder);
      }
      const res = await mediaApi.uploadFile(formData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-media'] });
    },
  });
}

export function useDeleteMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await mediaApi.deleteMedia(id);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-media'] });
    },
  });
}
