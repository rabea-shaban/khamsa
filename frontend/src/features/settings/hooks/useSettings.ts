import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApi } from '@/lib/api/settings.api';
import { Settings } from '@/types/api';

export function useSettings() {
  return useQuery({
    queryKey: ['admin-settings'],
    queryFn: () => settingsApi.getAdminSettings(),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePublicSettings() {
  return useQuery({
    queryKey: ['public-settings'],
    queryFn: () => settingsApi.getPublicSettings(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Settings>) => settingsApi.updateSettings(data),
    onSuccess: (res) => {
      queryClient.setQueryData(['admin-settings'], res);
      queryClient.setQueryData(['public-settings'], res);
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      queryClient.invalidateQueries({ queryKey: ['public-settings'] });
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });
}
