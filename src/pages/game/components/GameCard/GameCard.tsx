import clsx from 'clsx'
import 'styled-jsx'

import cardFrontImg from 'assets/card.png'

type GameCardProps = {
  card: GameCard
  onFlip: () => void
}

export default function GameCard({ card, onFlip }: GameCardProps) {
  const { img, flipped, found} = card

  function handleClick(){
    if(!flipped && !found){
      onFlip()
    }
  }

  return (
    <>
      <div
        onClick={onFlip}
        className={clsx(
          'card relative h-full shadow-xl shadow-black/20',
          !card.found &&
            'cursor-pointer hover:scale-105 transition-transform duration-75',
        )}
      >
        <div
          className={clsx(
            'card-content w-full h-full transition-transform duration-300',
            flipped && 'flipped',
          )}
        >
          <div className="card-front">
            <img
              src={cardFrontImg}
              alt="Card front"
              className="h-full w-full"
            />
          </div>
          <div className="card-back h-full rounded-lg flex items-center justify-center">
            <img src={img} alt="Card back" />
          </div>
        </div>
      </div>
      {/* CSS qu'on ne peut pas appliquer avec les classes tailwind */}
      <style jsx>{`
        .card {
          perspective: 600px;
        }
        .card,
        .card img {
          user-drag: none;
          -webkit-user-drag: none;
          -moz-user-drag: none;
        }
        .card-content {
          transform-style: preserve-3d;
          aspect-ratio: 1.5 / 2;
        }
        .card-content.flipped {
          transform: rotateY(180deg);
        }
        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          backface-visibility: hidden;
        }
        .card-back {
          transform: rotateY(180deg);
          background: linear-gradient(
            169.18deg,
            rgba(255, 239, 158, 0.78) -0.83%,
            rgba(201, 182, 81, 0.8) 91.98%
          );
          box-shadow: inset 0px 0px 0px 5px #8f5702;
        }
      `}</style>
    </>
  )
}
