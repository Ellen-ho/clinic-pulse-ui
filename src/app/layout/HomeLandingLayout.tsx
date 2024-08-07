import MainContent from './MainContent.styled';
import ResponsiveAppBar from './ResponsiveAppBar';

interface IHomeLandingLayoutProps {
  children: React.ReactNode;
}
const HomeLandingLayout: React.FC<IHomeLandingLayoutProps> = ({ children }) => {
  return (
    <>
      <ResponsiveAppBar />
      <MainContent padding={'0'}>{children}</MainContent>
    </>
  );
};

export default HomeLandingLayout;
