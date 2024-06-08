import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 화면 전체 높이만큼 컨테이너 높이 설정 */
`;

const Title = styled.h1`
  font-size: 60px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 10px;
`;

const Header = styled.div`
  text-align: center;
`;
const Form = styled.form`
  margin: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border: 1px solid wheat;
  border-radius: 20px;
`;

const InputContainer = styled.div`
  display: flex; /* 입력 라벨과 입력란을 수평으로 배치 */
  align-items: center; /* 세로 정렬 */
  justify-content: center;
  margin-bottom: 5px; /* 각 입력 창 사이의 간격 조절 */
`;

const Label = styled.label`
  margin-right: 10px; /* 라벨 오른쪽 여백 설정 */
  font-size: 10px;
`;

const Input = styled.input`
  padding: 5px; /* 입력란 안쪽 여백 설정 */
  font-size: 10px;
  height: 8px;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: wheat;
  width: 50px;
  border-radius: 20px;
  font-size: 10px;
  margin-top: 10px;
`;

const Error = styled.div`
  font-size: 7px;
  margin: 0;
  padding: 0;
  color: #f98383;
`;
interface IForm {
  Email: string;
  FirstName: string;
  LastName: string;
  NickName: string;
  PassWord: string;
  PassWordCheck: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmit = (data: IForm) => {
    if (data.PassWord !== data.PassWordCheck) {
      setError(
        'PassWordCheck',
        {
          message: 'Password are not same',
        },
        {
          shouldFocus: true,
        }
      );
    }
  };
  return (
    <Container>
      <Header>
        <Title>Sign up</Title>
        <Description>Welcom Our Page</Description>
      </Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <Label>Email :</Label>
          <Input
            {...register('Email', {
              required: 'Email is Empty',
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                message: 'Only "naver" email allowed',
              },
            })}
            placeholder="Email"
          />
        </InputContainer>
        <Error>{errors.Email?.message}</Error>

        <InputContainer>
          <Label>FirstName :</Label>
          <Input
            {...register('FirstName', {
              required: 'FirstName is Empty',
              validate: (value) =>
                value.includes('seo') ? 'seo is not allowed' : true,
            })}
            placeholder="First Name"
          />
        </InputContainer>
        <Error>{errors.FirstName?.message}</Error>

        <InputContainer>
          <Label>LastName :</Label>
          <Input
            {...register('LastName', {
              required: 'LastName is Empty',
            })}
            placeholder="Last Name"
          />
        </InputContainer>
        <Error>{errors.LastName?.message}</Error>

        <InputContainer>
          <Label>NickName :</Label>
          <Input
            {...register('NickName', {
              required: 'NickName is Empty',
              minLength: {
                value: 5,
                message: 'Please enter at least 5',
              },
            })}
            placeholder="Nick Name"
          />
        </InputContainer>
        <Error>{errors.NickName?.message}</Error>

        <InputContainer>
          <Label>PassWord :</Label>
          <Input
            {...register('PassWord', {
              required: 'PassWord is Empty',
              minLength: {
                value: 8,
                message: 'Please enter at least 8',
              },
            })}
            placeholder="PassWord"
          />
        </InputContainer>
        <Error>{errors.PassWord?.message}</Error>

        <InputContainer>
          <Label>PassWord Check :</Label>
          <Input
            {...register('PassWordCheck', {
              required: 'PassWordCheck is Empty',
              minLength: {
                value: 8,
                message: 'Please enter at least 8',
              },
            })}
            placeholder="PassWord Check"
          />
        </InputContainer>
        <Error>{errors.PassWordCheck?.message}</Error>

        <InputContainer>
          <Button>Submit</Button>
        </InputContainer>
      </Form>
    </Container>
  );
};

export default LoginForm;
