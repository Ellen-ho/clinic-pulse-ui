interface ILayoutProps {
  children: React.ReactNode;
}
const PublicLayout: React.FC<ILayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default PublicLayout;
