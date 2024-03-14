import { useEffect, useState } from 'react'
import WEBSTACKS_CARDS from '@/constants/CardData'
import { Card } from '@/types/ui-types'

const useGameBoard = () => {
  const [cards, setCards] = useState<Card[]>([])
  const [score, setScore] = useState(0)
  const [attempt, setAttempt] = useState(0)
  const [firstCard, setFirstCard] = useState<Card | null>(null)
  const [secondCard, setSecondCard] = useState<Card | null>(null)

  const shuffleCards = () => {
    // Shuffle to make card to be in random order
    const shuffledCards = [...WEBSTACKS_CARDS].sort(() => Math.random() - 0.5)

    setCards(shuffledCards)
    setFirstCard(null)
    setSecondCard(null)
    setAttempt(0)
    setScore(0)
  }

  const handleChoice = (item: Card) => {
    if (firstCard !== null && firstCard.id !== item.id) {
      return setSecondCard(item)
    }
    setFirstCard(item)
  }

  // Reset choices & increase attempt
  const resetTurns = () => {
    setFirstCard(null)
    setSecondCard(null)
    setAttempt((prevTurns) => prevTurns + 1)
  }

  // Handle compare two selected cards
  function compareSelectedCards(firstCard: Card, secondCard: Card) {
    if (firstCard.letter === secondCard.letter) {
      setCards((prevCards: any) =>
        prevCards.map((card: any) => {
          if (card.letter === firstCard.letter) {
            return { ...card, matched: true }
          } else {
            return card
          }
        })
      )
      setScore(score + 1)
      resetTurns()
    } else {
      setTimeout(() => resetTurns(), 1000)
    }
  }

  useEffect(() => {
    if (firstCard && secondCard) {
      compareSelectedCards(firstCard, secondCard)
    }
  }, [firstCard, secondCard])

  // Start the game
  useEffect(() => {
    shuffleCards()
  }, [])

  return {
    cards,
    attempt,
    score,
    firstCard,
    secondCard,
    handleChoice,
    shuffleCards,
  }
}

export default useGameBoard
