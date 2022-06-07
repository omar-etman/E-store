import React from 'react'

type props = {
  values: string[] | number[]
  value?: string | number
  onChange: (value: string) => void
}
function Dropdown({ values, value = values[0], onChange }: props) {
  // const cart = useSelector((state: any) => state.app.cart)

  return (
    <select
      id="quantity"
      name="quantity"
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
    >
      {values.map((i) => {
        return (
          <option key={i} selected={value === i} value={i}>
            {i}
          </option>
        )
      })}
    </select>
  )
}

export default Dropdown
