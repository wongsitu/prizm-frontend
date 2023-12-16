import { useMutation, useQuery } from "react-query"
import { getFileContent, getFiles, proccessFile } from "./request";
import { FileContentResponse, FilesResponse, ProccessedFileContentVariables } from "./types";

export const useFiles = () => {
  const { data, status, refetch } = useQuery<FilesResponse>(['getFiles'], getFiles);

  const files = data || [];

  return {
    data,
    files,
    status,
    refetch,
  };
};

export const useFileContent = ({ path, enabled, isPreview }: { path?: string; enabled?: boolean; isPreview?: boolean } = {}) => {
  const { data, status, refetch } = useQuery<FileContentResponse>(
    ['getFileContent', { path, isPreview }], 
    getFileContent, 
    { enabled: !!path && !path.endsWith('/') && enabled }
  );

  const files = data || [];

  return {
    data,
    files,
    status,
    refetch,
  };
};

export const useProcessFile = ({ ...opts }: ProccessedFileContentVariables = {}) => {
  return useMutation((payload: { path: string }) => proccessFile(payload), { ...opts })
}