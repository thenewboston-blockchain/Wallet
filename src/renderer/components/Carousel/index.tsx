import React, {Children, FC, Fragment, ReactNode, useCallback, useRef, useState} from 'react';
import * as S from './Styles';

interface CarouselProps {
  className?: string;
}

const Carousel: FC<CarouselProps> = ({children, className}) => {
  const numOfSlides = Children.count(children);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const leftArrowRef = useRef<HTMLDivElement>(null);
  const rightArrowRef = useRef<HTMLDivElement>(null);
  const leftArrowIsDisabled = currentSlide === 0;
  const rightArrowIsDisabled = currentSlide === numOfSlides - 1;

  const handleChangeSlide = (toSlide: number) => (): void => {
    if (toSlide < 0 || toSlide >= numOfSlides) return;

    if (toSlide < currentSlide) {
      leftArrowRef.current?.blur();
    }

    if (toSlide > currentSlide) {
      rightArrowRef.current?.blur();
    }

    setCurrentSlide(toSlide);
  };

  const renderDots = useCallback((): ReactNode => {
    let dots: ReactNode[] = [];

    for (let i = 0; i < numOfSlides; i++) {
      dots.push(<S.Dot isActive={i === currentSlide} onClick={() => setCurrentSlide(i)} />);
    }

    return <S.DotsContainer>{dots}</S.DotsContainer>;
  }, [currentSlide, numOfSlides]);

  if (!numOfSlides) return null;
  return (
    <S.Container className={className}>
      {renderDots()}
      <S.MainContent>
        <S.ArrowLeftIcon
          disabled={leftArrowIsDisabled}
          onClick={!leftArrowIsDisabled ? handleChangeSlide(currentSlide - 1) : undefined}
          ref={leftArrowRef}
        />
        <S.SlideContainerWrapper>
          <S.SlideContainer selectedIndex={currentSlide}>
            {Children.map(children, (slide, i) => {
              return <Fragment key={i}>{slide}</Fragment>;
            })}
          </S.SlideContainer>
        </S.SlideContainerWrapper>
        <S.ArrowRightIcon
          disabled={rightArrowIsDisabled}
          onClick={!rightArrowIsDisabled ? handleChangeSlide(currentSlide + 1) : undefined}
          ref={rightArrowRef}
        />
      </S.MainContent>
    </S.Container>
  );
};

export default Carousel;
