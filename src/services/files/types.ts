
import { z } from 'zod';
import { FileContentSchema, FilesSchema, ProccessedFileContentSchema } from './schema';

export type FilesResponse = z.infer<typeof FilesSchema>

export type FileContentResponse = z.infer<typeof FileContentSchema>

export type ProccessedFileContentResponse = z.infer<typeof ProccessedFileContentSchema>