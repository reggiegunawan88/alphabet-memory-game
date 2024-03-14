'use client'

import React from 'react'
import GameCard from '@/components/GameCard'
import useGameBoard from './hooks/useGameBoard'

const GameBoard = () => {
  const { cards, score, attempt, firstCard, secondCard, handleChoice, shuffleCards } = useGameBoard()

  return (
    <div className="flex flex-col justify-center p-10 gap-y-5">
      <div className="flex flex-col gap-y-3 font-bold text-lg">
        <span>Attempt: {attempt}</span>
        <span>Score: {score}</span>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <GameCard
            key={card.id}
            item={card}
            flipped={card === firstCard || card === secondCard || card.matched}
            matched={card.matched}
            handleSelectedCard={handleChoice}
          />
        ))}
      </div>
      <div className="flex flex-col gap-y-5">
        <div className="flex justify-center">
          <button className="bg-red-400 hover:bg-red-500 text-white p-2 text-center rounded-md w-fit" onClick={shuffleCards}>
            New Game
          </button>
        </div>
        {score === cards.length / 2 && <span className="text-center text-lg font-bold">You Win!</span>}
      </div>
    </div>
  )
}

export default GameBoard
