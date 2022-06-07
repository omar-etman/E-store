import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import { OrderData } from 'types'
import { v4 as uuid } from 'uuid'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body as OrderData
  try {
    const credentials = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_KEY!, 'base64').toString()
    )
    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    })
    const sheets = google.sheets({
      auth,
      version: 'v4',
    })

    const id = uuid()
    const order = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_KEY,
      range: 'Orders!A1:T1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            id,
            body.email,
            body.firstName,
            body.lastName,
            body.address,
            body.appartment,
            body.city,
            body.country,
            body.region,
            body.postalCode,
            body.phone,
            body.paymentMethod,
            body.cardNumber,
            body.nameOnCard,
            body.expiryDate,
            body.cvc,
            body.subTotal,
            body.shipping,
            body.taxes,
            body.total,
          ],
        ],
      },
    })
    const orderLine = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_KEY,
      range: 'OrderLines!A1:D1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: body.items.map((item) => [
          id,
          item.orderedQuantity,
          item.variants[0].price,
          item.id,
        ]),
      },
    })

    return res.status(201).json({
      data: order.data,
      orderLine: orderLine.data,
    })

    
  } catch (e) {
    return res.status(500).json({ e })
  }
}

