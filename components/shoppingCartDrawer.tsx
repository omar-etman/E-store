/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addCartItem,
  reduceCartItem,
  removeCartItem,
  setCartItemQty,
} from 'redux/reducers/app'
import { RootState } from 'redux/store'
import { CartItem, Product } from 'types'
import Link from 'next/link'
import Dropdown from './dropdown'

// const cart: CartItem[] = [
//   {
//     id: 1,
//     name: 'Throwback Hip Bag',
//     href: '#',
//     color: 'Salmon',
//     price: '$90.00',
//     quantity: 1,
//     availableQty: 4,
//     imageSrc:
//       'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
//     imageAlt:
//       'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
//   },
//   {
//     id: 2,
//     name: 'Medium Stuff Satchel',
//     href: '#',
//     color: 'Blue',
//     price: '$32.00',
//     quantity: 1,
//     availableQty: 4,
//     imageSrc:
//       'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
//     imageAlt:
//       'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
//   },
//   {
//     id: 3,
//     name: 'Medium Stuff Satchel',
//     href: '#',
//     color: 'Blue',
//     price: '$32.00',
//     quantity: 1,
//     availableQty: 4,
//     imageSrc:
//       'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
//     imageAlt:
//       'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
//   },
//   {
//     id: 4,
//     name: 'Medium Stuff Satchel',
//     href: '#',
//     color: 'Blue',
//     price: '$32.00',
//     quantity: 1,
//     availableQty: 4,
//     imageSrc:
//       'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
//     imageAlt:
//       'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
//   },
//   {
//     id: 5,
//     name: 'Medium Stuff Satchel',
//     href: '#',
//     color: 'Blue',
//     price: '$32.00',
//     quantity: 1,
//     availableQty: 4,
//     imageSrc:
//       'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
//     imageAlt:
//       'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
//   },
//   // More cart...
// ]

type props = {
  open: boolean
  setOpen: (open: boolean) => void
}

// const orderProduct = (e: React.MouseEvent<HTMLButtonElement> | any) => {
//   e.preventDefault()
//   dispatch(addCartItem(e.target.value))
//   console.log({ cart })
// }

// const setItemQuantity = (e: React.MouseEvent<HTMLButtonElement> | any) => {
//   cart.orderedQuantity = e.target.value
// }
// const router = useRouter()
// const { slug } = router.query

export default function ShoppingCartDrawer({ open, setOpen }: props) {
  const cart = useSelector((state: RootState) => state.app.cart)
  const dispatch = useDispatch()
  const cartPrices = cart.map(
    (ct: CartItem) =>
      +ct.variants[0].price.replace('$', '') * ct.orderedQuantity
  )

  const SubTotal = cartPrices.reduce((a: number, b: number) => a + b, 0)

  const checkOutOrder = {
    orderItems: { ...cart },
    subTotal: SubTotal,
  }

  useEffect(() => {
    console.log(cart)
    console.log(SubTotal)
    console.log(cartPrices)
  }, [cart])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {' '}
                          Shopping cart{' '}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cart.map((product: CartItem | any) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.images[0].imageSrc}
                                    alt={product.images[0].imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <Link href={`/product/${product.slug}`}>
                                          <a> {product.name} </a>
                                        </Link>
                                      </h3>
                                      <p className="ml-4">
                                        {product.variants.price}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {product.variants.color}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      <Dropdown
                                        value={product.orderedQuantity}
                                        onChange={(value) => {
                                          dispatch(
                                            setCartItemQty({ product, value })
                                          )
                                          // console.log(product.orderedQuantity)
                                        }}
                                        values={Array.from(
                                          Array(+product.variants[0].quantity),
                                          (_, i) => i + 1
                                        )}
                                      />
                                    </p>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          dispatch(removeCartItem(product))
                                        }
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{SubTotal}$</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link href={`/checkout`}>
                          <a className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                            Checkout
                          </a>
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
