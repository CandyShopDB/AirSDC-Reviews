import React from 'react';

export const calculateOverallRates = rates => (
  Object.keys(rates).reduce((average, key, index) => (
    ((average * index) + rates[key]) / (index + 1)), 0)
);

export const calculatePages = (numberReviewsPerPage, totalNumberReviews) => {
  const totalPages = Math.ceil(totalNumberReviews / numberReviewsPerPage);
  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages[i] = [i + 1, i * numberReviewsPerPage];
  }
  return pages;
};

export const displayPages = (currentPage, pages) => {
  let selectedPages = [];
  if (!pages.length) return selectedPages;
  if (currentPage !== 1) {
    selectedPages.push(['<', pages[currentPage - 2]]);
  }
  if (currentPage - 1 > 1) {
    selectedPages.push(pages[0]);
    if (currentPage - 1 > 2) {
      if (currentPage - 1 === 3) {
        selectedPages.push(pages[1]);
      } else {
        selectedPages.push(['...', null]);
      }
    }
  }
  if ((currentPage === pages.length) && pages.length > 4) {
    selectedPages.push(pages[pages.length - 3]);
  }
  selectedPages = [
    ...selectedPages,
    ...pages.slice(Math.max(currentPage - 2, 0), Math.min(currentPage + 1, pages.length)),
  ];
  if (currentPage === 1 && pages.length > 4) {
    selectedPages.push(pages[2]);
  }
  if (currentPage + 1 < pages.length) {
    if (currentPage + 1 < pages.length - 1) {
      if (currentPage + 1 === pages.length - 2) {
        selectedPages.push(pages[pages.length - 2]);
      } else {
        selectedPages.push(['...', null]);
      }
    }
    selectedPages.push(pages[pages.length - 1]);
  }
  if (currentPage !== pages.length) {
    selectedPages.push(['>', pages[currentPage]]);
  }
  return selectedPages;
};

const months = [
  'January',
  'Feburary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getFullMonth = date => months[date.getMonth()];

export const normalizeRating = (ratingRatio, fullRating, increment) => (
  Math.ceil((ratingRatio * fullRating) / increment) * increment
);

export const searchIconSvg = (
  <svg
    viewBox="0 0 24 24"
    role="presentation"
    focusable="false"
  >
    <path
      d="m10.4 18.2
      c-4.2-.6-7.2-4.5-6.6-8.8.6-4.2 4.5-7.2 8.8-6.6 4.2.6 7.2 4.5 6.6 8.8-.6 4.2-4.6 7.2-8.8 6.6
      m12.6 3.8-5-5c1.4-1.4 2.3-3.1 2.6-5.2.7-5.1-2.8-9.7-7.8-10.5-5-.7-9.7 2.8-10.5 7.9-.7 5.1 2.8 9.7 7.8 10.5 2.5.4 4.9-.3 6.7-1.7
      v.1l5 5
      c .3.3.8.3 1.1 0
      s .4-.8.1-1.1"
      fillRule="evenodd"
    />
  </svg>
);

export const chevronDownSVG = (
  <svg
    viewBox="0 0 18 18"
    role="presentation"
    focusable="false"
  >
    <path
      d="m 16.29 4.3
      a 1 1 0 1 1 1.41 1.42
      l -8 8
      a 1 1 0 0 1 -1.41 0
      l -8 -8
      a 1 1 0 1 1 1.41 -1.42
      l 7.29 7.29
      Z"
      fillRule="evenodd"
    />
  </svg>
);

export const chevronUpSVG = (
  <svg
    viewBox="0 0 18 18"
    role="presentation"
    focusable="false"
  >
    <path
      d="m 1.71 13.71
      a 1 1 0 1 1 -1.42 -1.42
      l 8 -8
      a 1 1 0 0 1 1.41 0
      l 8 8
      a 1 1 0 1 1 -1.41 1.42
      l -7.29 -7.29
      Z"
      fillRule="evenodd"
    />
  </svg>
);

export const flagSvg = (
  <svg
    viewBox="0 0 24 24"
    role="img"
    focusable="false"
  >
    <path
      d="m22.39 5.8-.27-.64
      a207.86 207.86 0 0 0 -2.17-4.87.5.5 0 0 0 -.84-.11 7.23 7.23 0 0 1 -.41.44
      c-.34.34-.72.67-1.13.99-1.17.87-2.38 1.39-3.57 1.39-1.21 0-2-.13-3.31-.48
      l-.4-.11
      c-1.1-.29-1.82-.41-2.79-.41
      a6.35 6.35 0 0 0 -1.19.12
      c-.87.17-1.79.49-2.72.93-.48.23-.93.47-1.35.71
      l-.11.07-.17-.49
      a.5.5 0 1 0 -.94.33l7 20
      a .5.5 0 0 0 .94-.33
      l-2.99-8.53
      a21.75 21.75 0 0 1 1.77-.84
      c.73-.31 1.44-.56 2.1-.72.61-.16 1.16-.24 1.64-.24.87 0 1.52.11 2.54.38
      l.4.11
      c1.39.37 2.26.52 3.57.52 2.85 0 5.29-1.79 5.97-3.84
      a.5.5 0 0 0 0-.32
      c-.32-.97-.87-2.36-1.58-4.04
      z
      m-4.39 7.2
      c-1.21 0-2-.13-3.31-.48
      l-.4-.11
      c-1.1-.29-1.82-.41-2.79-.41-.57 0-1.2.09-1.89.27
      a16.01 16.01 0 0 0 -2.24.77
      c-.53.22-1.04.46-1.51.7
      l-.21.11-3.17-9.06
      c.08-.05.17-.1.28-.17.39-.23.82-.46 1.27-.67.86-.4 1.7-.7 2.48-.85.35-.06.68-.1.99-.1.87 0 1.52.11 2.54.38
      l.4.11
      c1.38.36 2.25.51 3.56.51 1.44 0 2.85-.6 4.18-1.6.43-.33.83-.67 1.18-1.02
      a227.9 227.9 0 0 1 1.85 4.18
      l.27.63
      c.67 1.57 1.17 2.86 1.49 3.79-.62 1.6-2.62 3.02-4.97 3.02
      z"
      fillRule="evenodd"
    />
  </svg>
);

export const fullStarSvg = (
  <svg
    viewBox="0 0 1000 1000"
    role="presentation"
    focusable="false"
  >
    <path
      d="M971.5 379.5
      c9 28 2 50-20 67
      L725.4 618.6
      l87 280.1
      c11 39-18 75-54 75-12 0-23-4-33-12
      l-226.1-172-226.1 172.1
      c-25 17-59 12-78-12-12-16-15-33-8-51
      l86-278.1
      L46.1 446.5
      c-21-17-28-39-19-67 8-24 29-40 52-40
      h280.1
      l87-278.1
      c7-23 28-39 52-39 25 0 47 17 54 41
      l87 276.1
      h280.1
      c23.2 0 44.2 16 52.2 40
      z"
    />
  </svg>
);

export const halfStarSvg = (
  <svg
    viewBox="0 0 1000 1000"
    role="presentation"
    focusable="false"
  >
    <path
      d="M510.2 23.3
      l1 767.3-226.1 172.2
      c-25 17-59 12-78-12-12-16-15-33-8-51
      l86-278.1
      L58 447.5
      c-21-17-28-39-19-67 8-24 29-40 52-40
      h280.1
      l87-278.1
      c7.1-23.1 28.1-39.1 52.1-39.1
      z"
    />
  </svg>
);

/* eslint-disable react/no-array-index-key */
export const makeStarElements = (
  ratingRatio,
  fullStar,
  {
    containerClass,
    fullStarClass,
    pointFiveClass,
    zeroStarClass,
    halfStarClass,
    hiddenHalfStarClass,
  },
) => {
  const rate = normalizeRating(ratingRatio, fullStar, 0.5);
  const numFullStar = Math.floor(rate);
  const numHalfStar = (rate - numFullStar) > 0 ? 1 : 0;
  const numZeroStar = fullStar - numFullStar - numHalfStar;
  return (
    <span className={containerClass}>
      {
        Array(numFullStar).fill().map((_, i) => (
          <span className={fullStarClass} key={`full_${i}`}>
            {fullStarSvg}
          </span>
        ))
      }
      {
        Array(numHalfStar).fill().map((_, i) => (
          <span className={pointFiveClass} key={`half_${i}`}>
            <span className={hiddenHalfStarClass}>
              {fullStarSvg}
            </span>
            <span className={halfStarClass}>
              {halfStarSvg}
            </span>
          </span>
        ))
      }
      {
        Array(numZeroStar).fill().map((_, i) => (
          <span className={zeroStarClass} key={`half_${i}`}>
            {fullStarSvg}
          </span>
        ))
      }
    </span>
  );
};
/* eslint-enable react/no-array-index-key */

export const truncateWords = (string, maxLength) => {
  let index = maxLength;
  while (string[index] !== ' ') {
    index -= 1;
  }
  return `${string.slice(0, index)}...`;
};

/* eslint-disable consistent-return */
export const scrollIt = (destination, adjustment, duration = 200, easing = 'linear') => {
  const easings = {
    linear(t) {
      return t;
    },
    easeInQuad(t) {
      return t * t;
    },
    easeOutQuad(t) {
      return t * (2 - t);
    },
    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + ((4 - (2 * t)) * t);
    },
    easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic(t) {
      const newT = t - 1;
      return ((newT) * t * t) + 1;
    },
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : ((t - 1) * ((2 * t) - 2) * ((2 * t) - 2)) + 1;
    },
    easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart(t) {
      const newT = t - 1;
      return 1 - ((newT) * t * t * t);
    },
    easeInOutQuart(t) {
      const newT = t - 1;
      return t < 0.5 ? 8 * t * t * t * t : 1 - (8 * (newT) * t * t * t);
    },
    easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint(t) {
      const newT = t - 1;
      return 1 + ((newT) * t * t * t * t);
    },
    easeInOutQuint(t) {
      const newT = t - 1;
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + (16 * (newT) * t * t * t * t);
    },
  };

  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
  );
  const windowHeight = window.innerHeight
  || document.documentElement.clientHeight
  || document.getElementsByTagName('body')[0].clientHeight;
  let destinationOffset = typeof destination === 'number'
    ? destination
    : destination.offsetTop;
  destinationOffset += adjustment;
  const destinationOffsetToScroll = Math.round(Math.min(
    documentHeight - windowHeight,
    destinationOffset,
  ));

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    return Promise.resolve;
  }

  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easings[easing](time);
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset === destinationOffsetToScroll) {
      return Promise.resolve;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
};
/* eslint-enable consistent-return */
