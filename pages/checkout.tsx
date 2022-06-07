import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/solid'
import Dropdown from 'components/dropdown'
import Layout from 'components/layout'
import { classNames } from 'lib'
import { useState } from 'react'
import { useFormik, FormikConfig } from 'formik'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { AppStateType, CartItem, Order } from 'types'
import { addOrder, removeCartItem, setCartItemQty } from 'redux/reducers/app'
import { RootState } from 'redux/store'

const deliveryMethods = [
  {
    id: 1,
    title: 'Standard',
    turnaround: '4–10 business days',
    price: '$5.00',
  },
  { id: 2, title: 'Express', turnaround: '2–5 business days', price: '$16.00' },
]
const paymentMethods = [
  { id: 'credit-card', title: 'Credit card' },
  { id: 'paypal', title: 'PayPal' },
  { id: 'etransfer', title: 'eTransfer' },
]

export default function Example() {
  const [open, setOpen] = useState(false)
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  )
  const cart = useSelector((state: RootState) => state.app.cart)
  const order = useSelector((state: RootState) => state.app.orders)
  const dispatch = useDispatch()

  const cartPrices = cart.map(
    (ct: CartItem) =>
      +ct.variants[0].price.replace('$', '') * ct.orderedQuantity
  )
  const subTotal = cartPrices.reduce((a: number, b: number) => a + b, 0)

  const taxes = 5.52
  const shipping = 5.52
  const total = subTotal + taxes + shipping

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      appartment: '',
      city: '',
      country: '',
      region: '',
      phone: '',
      postalCode: '',
      deliveryMethod: '',
      paymentMethod: '',
      cardNumber: '',
      nameOnCard: '',
      expiryDate: '',
      cvc: '',
    },
    onSubmit: async (values) => {
      console.log('fghjkhd')
      const sentOrder = {
        ...values,
        items: cart,
        subTotal,
        shipping,
        taxes,
        total,
      }
      console.log(sentOrder)
      const JSONdata = JSON.stringify(sentOrder)
      const endpoint = 'api/orders'
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      }
      //axios
      const response = await fetch(endpoint, options)
      const result = await response.json()
      console.log(result)

      const sendMail = await fetch('api/email')
      const mailResponse = await sendMail.json()
      console.log(mailResponse)
    },
  })

  return (
    <Layout>
      <div className="bg-gray-50">
        <main className="px-4 pt-16 pb-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:max-w-none">
            <h1 className="sr-only">Checkout</h1>

            <form
              className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    Contact information
                  </h2>

                  <div className="mt-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        autoComplete="email"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-10 mt-10 border-t border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    Shipping information
                  </h2>

                  <div className="grid grid-cols-1 mt-4 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          onInput={formik.handleChange}
                          value={formik.values.firstName}
                          autoComplete="given-name"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          onInput={formik.handleChange}
                          value={formik.values.lastName}
                          autoComplete="family-name"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="address"
                          id="address"
                          onInput={formik.handleChange}
                          value={formik.values.address}
                          autoComplete="street-address"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="appartment"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Apartment, suite, etc.
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="appartment"
                          id="appartment"
                          onInput={formik.handleChange}
                          value={formik.values.appartment}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="city"
                          id="city"
                          onInput={formik.handleChange}
                          value={formik.values.city}
                          autoComplete="address-level2"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <div className="mt-1">
                        <select
                          id="country"
                          name="country"
                          onInput={formik.handleChange}
                          value={formik.values.country}
                          autoComplete="country-name"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State / Province
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="region"
                          id="region"
                          onInput={formik.handleChange}
                          value={formik.values.region}
                          autoComplete="address-level1"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="postalCode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Postal code
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="postalCode"
                          id="postalCode"
                          onInput={formik.handleChange}
                          value={formik.values.postalCode}
                          autoComplete="postalCode"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          onInput={formik.handleChange}
                          value={formik.values.phone}
                          autoComplete="tel"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-10 mt-10 border-t border-gray-200">
                  <RadioGroup
                    value={selectedDeliveryMethod}
                    onChange={setSelectedDeliveryMethod}
                  >
                    <RadioGroup.Label className="text-lg font-medium text-gray-900">
                      Delivery method
                    </RadioGroup.Label>

                    <div className="grid grid-cols-1 mt-4 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                      {deliveryMethods.map((deliveryMethod) => (
                        <RadioGroup.Option
                          key={deliveryMethod.id}
                          value={deliveryMethod}
                          className={({ checked, active }) =>
                            classNames(
                              checked
                                ? 'border-transparent'
                                : 'border-gray-300',
                              active ? 'ring-2 ring-indigo-500' : '',
                              'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <div className="flex flex-1">
                                <div className="flex flex-col">
                                  <RadioGroup.Label
                                    as="span"
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    {deliveryMethod.title}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as="span"
                                    className="flex items-center mt-1 text-sm text-gray-500"
                                  >
                                    {deliveryMethod.turnaround}
                                  </RadioGroup.Description>
                                  <RadioGroup.Description
                                    as="span"
                                    className="mt-6 text-sm font-medium text-gray-900"
                                  >
                                    {deliveryMethod.price}
                                  </RadioGroup.Description>
                                </div>
                              </div>
                              {checked ? (
                                <CheckCircleIcon
                                  className="w-5 h-5 text-indigo-600"
                                  aria-hidden="true"
                                />
                              ) : null}
                              <div
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked
                                    ? 'border-indigo-500'
                                    : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-lg'
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Payment */}
                <div className="pt-10 mt-10 border-t border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                  <fieldset className="mt-4">
                    <legend className="sr-only">Payment type</legend>
                    <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                      {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                        <div
                          key={paymentMethod.id}
                          className="flex items-center"
                        >
                          {paymentMethodIdx === 0 ? (
                            <input
                              id={paymentMethod.id}
                              name="payment-type"
                              type="radio"
                              defaultChecked
                              className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                          ) : (
                            <input
                              id={paymentMethod.id}
                              name="payment-type"
                              type="radio"
                              className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                          )}

                          <label
                            htmlFor={paymentMethod.id}
                            className="block ml-3 text-sm font-medium text-gray-700"
                          >
                            {paymentMethod.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>

                  <div className="grid grid-cols-4 mt-6 gap-y-6 gap-x-4">
                    <div className="col-span-4">
                      <label
                        htmlFor="card-number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Card number
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="card-number"
                          name="card-number"
                          autoComplete="cc-number"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="col-span-4">
                      <label
                        htmlFor="nameOnCard"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name on card
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="nameOnCard"
                          name="nameOnCard"
                          onInput={formik.handleChange}
                          value={formik.values.nameOnCard}
                          autoComplete="cc-name"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="expiryDate"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Expiration date (MM/YY)
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="expiryDate"
                          id="expiryDate"
                          onInput={formik.handleChange}
                          value={formik.values.expiryDate}
                          autoComplete="cc-exp"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="cvc"
                        className="block text-sm font-medium text-gray-700"
                      >
                        CVC
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          onInput={formik.handleChange}
                          value={formik.values.cvc}
                          id="cvc"
                          autoComplete="csc"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <div className="mt-10 lg:mt-0">
                <h2 className="text-lg font-medium text-gray-900">
                  Order summary
                </h2>

                <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <h3 className="sr-only">Items in your cart</h3>
                  <ul role="list" className="divide-y divide-gray-200">
                    {cart.map((product: CartItem) => (
                      <li key={product.id} className="flex px-4 py-6 sm:px-6">
                        <div className="flex-shrink-0">
                          <img
                            src={product.images[0].imageSrc}
                            alt={product.images[0].imageAlt}
                            className="w-20 rounded-md"
                          />
                        </div>

                        <div className="flex flex-col flex-1 ml-6">
                          <div className="flex">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm">
                                <a
                                  href={`/product/${product.slug}`}
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {product.name}
                                </a>
                              </h4>
                              <p className="mt-1 text-sm text-gray-500">
                                {product.variants[0].colors}
                              </p>
                            </div>

                            <div className="flex-shrink-0 flow-root ml-4">
                              <button
                                type="button"
                                onClick={() =>
                                  dispatch(removeCartItem(product))
                                }
                                className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                              >
                                <span className="sr-only">Remove</span>
                                <TrashIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-end justify-between flex-1 pt-2">
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              {product.variants[0].price}
                            </p>

                            <div className="ml-4">
                              <label htmlFor="quantity" className="sr-only">
                                Quantity
                              </label>
                              <Dropdown
                                value={product.orderedQuantity}
                                onChange={(value) => {
                                  dispatch(setCartItemQty({ product, value }))
                                }}
                                values={Array.from(
                                  Array(+product.variants[0].quantity),
                                  (_, i) => i + 1
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <dl className="px-4 py-6 space-y-6 border-t border-gray-200 sm:px-6">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Subtotal</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ${subTotal.toFixed(2)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Shipping</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ${shipping.toFixed(2)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Taxes</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ${taxes.toFixed(2)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <dt className="text-base font-medium">Total</dt>
                      <dd className="text-base font-medium text-gray-900">
                        ${total.toFixed(2)}
                      </dd>
                    </div>
                  </dl>

                  <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                    <button
                      type="submit"
                      className="w-full px-4 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                      Confirm order
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </Layout>
  )
}
function values(arg0: string, values: any) {
  throw new Error('Function not implemented.')
}
