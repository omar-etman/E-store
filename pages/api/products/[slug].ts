// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { produceWithPatches } from 'immer'
import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from 'spreadsheet-to-json'
import {
  GoogleSheetData,
  Image,
  SheetCategory,
  SingleProduct,
  Variant,
} from 'types'
//useRouter

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_KEY!, 'base64').toString()
  )

  const { slug } = req.query

  extractSheets(
    {
      // your google spreadsheet key
      spreadsheetKey: process.env.SHEET_KEY,
      // your google oauth2 credentials or API_KEY
      credentials,
      // optional: names of the sheets you want to extract
      sheetsToExtract: ['Products', 'Categories', 'Variants', 'Images'],
    },
    function (err: any, data: any) {
      console.log({ data })
      const selectedProductData = data.Products.find(
        (product: any) => product.slug === slug
      )

      const product = {
        ...selectedProductData,
        category: data.Categories.find(
          (category: any) => category.id === selectedProductData.categoryId
        ),
        variants: data.Variants.filter(
          (variant: any) => variant.productId === selectedProductData.id
        ),
        images: data.Images.filter(
          (image: any) => image.productId === selectedProductData.id
        ),
      }
      console.log(product)
      res.status(200).json(product)
    }
  )
}
