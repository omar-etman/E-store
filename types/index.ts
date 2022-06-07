export interface Product {
  id: number
  name: string
  slug: string
  trending: boolean
  featured: boolean
}

export interface CartItem extends SingleProduct {
  orderedQuantity: number
}

export interface Order  {
  email: string
  firstName: string
  lastName: string
  address: string
  appartment: string
  city: string
  country: string
  region: string
  phone: string
  postalCode: string
  deliveryMethod: string
  paymentMethod: string
  cardNumber: string
  nameOnCard: string
  expiryDate: string
  cvc: string
  items: CartItem[]
  subTotal: number
  shipping: number
  taxes: number
  total: number
}

export interface OrderData extends Order {
  id:string
}

export interface App {
  products: Product[]
  categories: Category[]
  cart: CartItem[]
}

export type Category = {
  name: string
  products: Product[]
}
export type AppStateType = {
  products: Product[]
  categories: Category[]
  cart: CartItem[]
  orders: Order[]
}

// export type AppStateType = {
//   app:App
// }

export type Page = {
  name: string
  href: string
}
export type Navigation = {
  categories: Category[]
  pages: Page[]
}

export interface SheetProduct {
  id: string
  name: string
  slug: string
  trending: boolean
  featured: boolean
  categoryId: string
}

export type SheetCategory = {
  id: string
  name: string
}

export type Variant = {
  id: string
  productId: string
  price: string
  colors: string
  quantity: string
}

export type Image = {
  id: string
  imageSrc: string
  imageAlt: string
  productId: string
}

export type GoogleSheetData = {
  Products: SheetProduct[]
  Categories: SheetCategory[]
  Variants: Variant[]
  Images: Image[]
}

export interface SingleProduct extends SheetProduct {
  categories: SheetCategory
  variants: Variant[]
  images: Image[]
}
;[]

export type Products = {
  Products: SingleProduct[]
}
