import styled from 'styled-components';

export const SelectContainer = styled.div`
  .boxbox {
    clip-path: inset(0 0, 0, 0);
    animation-name: slide-down; /* Tên của animation */
    animation-duration: 0.3s; /* Thời gian hoàn thành animation */
    animation-timing-function: ease-in-out;
  }

  @keyframes slide-down {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
