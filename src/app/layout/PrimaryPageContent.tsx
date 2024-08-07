import { PrimaryPageContentWrapper } from './PrimaryPageContent.styled';

interface IPrimaryPageContentTopWrapperProps {
  children: React.ReactNode;
}
const PrimaryPageContent: React.FC<IPrimaryPageContentTopWrapperProps> = ({
  children,
}) => {
  return <PrimaryPageContentWrapper>{children}</PrimaryPageContentWrapper>;
};

export default PrimaryPageContent;
