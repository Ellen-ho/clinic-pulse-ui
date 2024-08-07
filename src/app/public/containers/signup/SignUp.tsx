import PrimaryPageContent from '../../../layout/PrimaryPageContent';
import { SignUpWrapper } from './SignUp.styled';
import SignUpCard from './components/SignUpCard';

const SignUp: React.FC = () => {
  return (
    <PrimaryPageContent>
      <SignUpWrapper>
        <SignUpCard />
      </SignUpWrapper>
    </PrimaryPageContent>
  );
};

export default SignUp;
