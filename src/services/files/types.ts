
import { z } from 'zod';
import { FileContentSchema, FilesSchema } from './schema';

export type FilesResponse = z.infer<typeof FilesSchema>

export type FileContentResponse = z.infer<typeof FileContentSchema>