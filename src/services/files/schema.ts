import { z } from 'zod'

export const FilesSchema = z.array(
  z.object({
    Key: z.string(),
    LastModified: z.string(),
    ETag: z.string(),
    Size: z.number(),
    StorageClass: z.string(),
    Owner: z.object({
      DisplayName: z.string(),
      ID: z.string(),
    }),
  })
)

export const FileContent = z.object({
  StoreID: z.string(),
  Customer_ID: z.string(),
  'Postal Code': z.string(),
  Total_Visits: z.string(),
  'Dollars Spend': z.string(),
  'Product Type': z.string(),
})

export const FileContentSchema = z.array(FileContent)

export const ProccessedFileContentSchema = z.array(FileContent.extend({
  prizmId: z.number().nullable(),
}))