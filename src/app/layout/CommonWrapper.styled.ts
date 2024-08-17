import styled from '@emotion/styled';
import { mq } from '../../styles/media-query';

export const CommonWrapper = styled.div`
  ${mq({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '1rem',
    width: ['100%', '100%', '100%'],
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
