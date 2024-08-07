import styled from '@emotion/styled';

const MainContent = styled.div((props: { padding?: string }) => ({
  padding: props.padding || '16px',
  minHeight: '75vh',
}));

export default MainContent;
