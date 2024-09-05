import styled from '@emotion/styled';
import { mq } from '../../styles/media-query';

interface ButtonAreaWrapperProps {
  gap?: string;
}

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

export const NarrowCommonWrapper = styled.div`
  ${mq({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '1rem',
    width: ['100%', '100%', '70%'],
  })}
`;

export const ButtonAreaWrapper = styled.div<ButtonAreaWrapperProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: ${(props) => props.gap || '10px'};
`;
