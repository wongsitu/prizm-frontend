import { useMutation, useQuery } from "react-query"
import { getFileContent, getFiles, proccessFile } from "./request";
import { FileContentResponse, FilesResponse } from "./types";

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

export const useFileContent = ({ key, enabled, isPreview }: { key?: string; enabled?: boolean; isPreview?: boolean } = {}) => {
  const { data, status, refetch } = useQuery<FileContentResponse>(
    ['getFileContent', { key, isPreview }], 
    getFileContent, 
    { enabled: !!key && !key.endsWith('/') && enabled }
  );

  const files = data || [];

  return {
    data,
    files,
    status,
    refetch,
  };
};

export const useProcessFile = ({ key }: { key?: string } = {}) => {
  return useMutation(['processFile', { key }], proccessFile)
}