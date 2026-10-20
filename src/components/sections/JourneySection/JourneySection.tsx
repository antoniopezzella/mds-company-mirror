import { useState } from 'react';
import { Typography } from '@mui/material';
import { getRoleColor } from '../../../theme/roles';
import './JourneySection.scss';

export interface JourneyCardProps {
  /** Card image */
  image: string;
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Card date (optional) */
  date?: string;
}

export interface JourneySectionProps {
  /** Section title */
  title: string;
  /** Section description */
  description: string;
  /** Array of journey cards */
  cards: JourneyCardProps[];
}

/**
 * JourneySection - Carousel section for press/journey content
 * 
 * Design from Figma node 2885:47806
 * - Horizontal scrollable cards
 * - Navigation arrows
 * - Height: 980px
 */
export const JourneySection: React.FC<JourneySectionProps> = ({
  title,
  description,
  cards,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 3; // Show 3 cards at a time on desktop
  const maxIndex = Math.max(0, cards.length - cardsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="journey-section">
      <div className="mds-legacy-container">
        <div className="journey-section__header">
          <Typography
            variant="h2"
            className="journey-section__title"
            sx={{
              color: getRoleColor('fg.primary'),
              mb: (theme) => theme.spacing(2),
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            className="journey-section__description"
            sx={{
              color: getRoleColor('fg.neutral.subtle'),
            }}
          >
            {description}
          </Typography>
        </div>

        <div className="journey-section__carousel">
          <button
            className="journey-section__nav journey-section__nav--prev"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous"
            style={{
              color: getRoleColor('interactive.primary'),
              borderColor: getRoleColor('border.default'),
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="journey-section__track-container">
            <div
              className="journey-section__track"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              }}
            >
              {cards.map((card, index) => (
                <div key={index} className="journey-section__card">
                  <div className="journey-section__card-image">
                    <img src={card.image} alt={card.title} />
                  </div>
                  <div className="journey-section__card-content">
                    {card.date && (
                      <Typography
                        variant="caption"
                        className="journey-section__card-date"
                        sx={{ color: getRoleColor('fg.neutral.subtle') }}
                      >
                        {card.date}
                      </Typography>
                    )}
                    <Typography
                      variant="h5"
                      className="journey-section__card-title"
                      sx={{ color: getRoleColor('fg.primary') }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="journey-section__card-description"
                      sx={{ color: getRoleColor('fg.neutral.subtle') }}
                    >
                      {card.description}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="journey-section__nav journey-section__nav--next"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next"
            style={{
              color: getRoleColor('interactive.primary'),
              borderColor: getRoleColor('border.default'),
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
