import styled from '@emotion/styled';
import { mq } from '../../styles/media-query';

export const CommonWrapper = styled.div`
  ${mq({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '1rem',
    width: ['100%', '100%', '70%'],
  })}
`;

export const ButtonAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;
`;
