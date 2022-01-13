import Link from 'next/link'
import React, { useState } from 'react'
import { CategoryType } from '../types/shared'

interface CategoryProps {
  category: CategoryType
}

export default function Category({ category }: CategoryProps) {
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
        articleCollection.items.map(({ title, slug }, idx) => (
          <Link key={idx} href={`/${slug}`} passHref>
            <div className='mb-6 cursor-pointer'>
              <p>{title}</p>
            </div>
          </Link>
        ))}
    </div>
  )
}
