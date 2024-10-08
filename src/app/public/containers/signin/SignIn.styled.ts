import styled from '@emotion/styled';
import { mq } from '../../../../styles/media-query';

// export const SignInWrapper = styled.div`
//   ${mq({
//     paddingTop: '80px',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'stretch',
//     width: ['100%', '40%', '40%'],
//   })}
// `;

// export const BottomAreaWrapper = styled.div`
//   text-align: center;
// `;

export const SignInWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #f5f7ff, #e8ebf7);
`;

export const BottomAreaWrapper = styled.div`
  text-align: center;
`;
