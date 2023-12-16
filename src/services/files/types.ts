
import { z } from 'zod';
import { FileContentSchema, FilesSchema, ProccessedFileContentSchema } from './schema';
import { UseMutationOptions } from 'react-query';
import { AxiosError } from 'axios';

export type FilesResponse = z.infer<typeof FilesSchema>

export type FileContentResponse = z.infer<typeof FileContentSchema>

export type ProccessedFileContentResponse = z.infer<typeof ProccessedFileContentSchema>

export type ProccessedFilePayload = {
  path: string;
}

export interface ProccessedFileContentVariables
  extends Omit<
    UseMutationOptions<
      ProccessedFileContentResponse | undefined,
      AxiosError,
      ProccessedFilePayload,
      unknown
    >,
    'mutationFn' | 'mutationKey'
  > {}