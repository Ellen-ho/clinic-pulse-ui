import styled from '@emotion/styled';
import { mq } from '../../../../styles/media-query';

export const SignInWrapper = styled.div`
  ${mq({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: ['100%', '80%', '50%'],
  })}
`;

export const BottomAreaWrapper = styled.div`
  text-align: center;
`;
