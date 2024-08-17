import styled from '@emotion/styled';
import { mq } from '../../../../styles/media-query';

export const SignInWrapper = styled.div`
  ${mq({
    paddingTop: '80px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: ['100%', '40%', '40%'],
  })}
`;

export const BottomAreaWrapper = styled.div`
  text-align: center;
`;
