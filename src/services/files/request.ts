import { QueryKey } from "react-query";
import API from "../api";
import { FileContentSchema, FilesSchema, ProccessedFileContentSchema } from "./schema";

export const getFiles= async () => {
  return API.get('files').then((response) => FilesSchema.parse(response.data))
}

export const getFileContent = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, { key, isPreview }] = queryKey as [string, { key: string; isPreview: boolean }]

  return API.get(`files/${key}/`, { params: { isPreview } }).then((response) => FileContentSchema.parse(response.data))
}

export const proccessFile = async ({ key }: { key: string }) => {
  return API.post(`files/${key}/`).then((response) => ProccessedFileContentSchema.parse(response.data))
}