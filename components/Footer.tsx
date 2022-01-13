import Link from 'next/link'
import React from 'react'

export default function Footer({
  about,
  news,
}: {
  about: string
  news: string
}) {
  return (
    <div className='absolute bottom-0'>
      <ul className='flex gap-8 p-8'>
        <li>
          <Link href='/' passHref>
            <h1 className='cursor-pointer font-bold'>Transfer</h1>
          </Link>
        </li>
        <li>
          <h2>{about}</h2>
        </li>
        <li>
          <h2>{news}</h2>
        </li>
      </ul>
    </div>
  )
}
