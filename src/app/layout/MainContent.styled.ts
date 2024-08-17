import styled from '@emotion/styled';

const MainContent = styled.div((props: { padding?: string }) => ({
  padding: props.padding || '16px',
  height: `calc(100vh - 64px)`,
}));

export default MainContent;
