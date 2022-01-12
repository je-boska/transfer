import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { CategoryType } from '../types/shared'

interface CategoryProps {
  category: CategoryType
}

export default function Category({ category }: CategoryProps) {
  const { locale } = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const {
    name,
    linkedFrom: { articleCollection },
  } = category

  return (
    <div>
      <h1
        onClick={() => setIsOpen(!isOpen)}
        className='cursor-pointer text-3xl mb-4'
      >
        {name}
      </h1>
      {isOpen &&
        articleCollection.items.map(({ title }, idx) => (
          <div key={idx} className='mb-6'>
            <p>{title}</p>
          </div>
        ))}
    </div>
  )
}
