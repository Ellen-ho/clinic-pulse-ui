import styled from '@emotion/styled';

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .loading-dot-container {
    display: flex;
  }

  .loading-dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: lightblue;
    margin: 0 10px;
    animation: bounce 0.5s infinite alternate;
  }

  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-10px);
    }
  }
`;
