import { QueryKey } from "react-query";
import API from "../api";
import { FileContentSchema, FilesSchema, ProccessedFileContentSchema } from "./schema";

export const getFiles= async () => {
  return API.get('files').then((response) => FilesSchema.parse(response.data))
}

export const getFileContent = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, { path, isPreview }] = queryKey as [string, { path: string; isPreview: boolean }]

  return API.get(`files`, { params: { isPreview, path } }).then((response) => FileContentSchema.parse(response.data))
}

export const proccessFile = async ({ path }: { path: string}) => {
  return API.post(`files`, { path }).then((response) => ProccessedFileContentSchema.parse(response.data))
}