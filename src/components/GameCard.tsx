import React from 'react'
import { Card } from '@/types/ui-types'
import Image from 'next/image'

export interface GameCardProps {
  item: Card
  flipped: boolean
  matched: boolean
  handleSelectedCard: (item: Card) => void
}

const GameCard = ({ item, flipped, matched, handleSelectedCard }: GameCardProps) => {
  return (
    <div
      className={`relative shadow-md cursor-pointer ${
        matched ? 'bg-yellow-300' : 'bg-green-400'
      } h-20 w-full rounded-md transition-all duration-500 [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}
      onClick={() => handleSelectedCard(item)}
    >
      {/* Front side */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 [backface-visibility:hidden]">
        <span>?</span>
      </div>

      {/* Back side */}
      <div className="flex items-center justify-center h-full [transform:rotateY(180deg)] [backface-visibility:hidden]">
        <Image alt="card-img" src={item.image} width={50} height={50} />
      </div>
    </div>
  )
}

export default GameCard
