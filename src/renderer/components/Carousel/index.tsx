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
  const inFirstSlide = currentSlide === 0;
  const inLastSlide = currentSlide === numOfSlides - 1;

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
    const dots: ReactNode[] = [];

    for (let i = 0; i < numOfSlides; i += 1) {
      dots.push(<S.Dot key={i} isActive={i === currentSlide} onClick={() => setCurrentSlide(i)} />);
    }

    return <S.DotsContainer>{dots}</S.DotsContainer>;
  }, [currentSlide, numOfSlides]);

  if (!numOfSlides) return null;
  return (
    <S.Container className={className}>
      {renderDots()}
      <S.MainContent>
        <S.ArrowLeftIcon
          onClick={!inFirstSlide ? handleChangeSlide(currentSlide - 1) : handleChangeSlide(numOfSlides - 1)}
          ref={leftArrowRef}
        />
        <S.SlideContainerWrapper>
          <S.SlideContainer selectedIndex={currentSlide}>
            {Children.map(children, (slide, i) => {
              // eslint-disable-next-line react/no-array-index-key
              return <Fragment key={i}>{slide}</Fragment>;
            })}
          </S.SlideContainer>
        </S.SlideContainerWrapper>
        <S.ArrowRightIcon
          onClick={!inLastSlide ? handleChangeSlide(currentSlide + 1) : handleChangeSlide(0)}
          ref={rightArrowRef}
        />
      </S.MainContent>
    </S.Container>
  );
};

export default Carousel;
