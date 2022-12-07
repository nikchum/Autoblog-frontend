import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'components/Button';
import { LinkButton } from 'components/LinkButton';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/features/auth/authOperations';
import { checkIsAuth, getStatus } from '../redux/features/auth/authSelectors';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const isAuth = useSelector(checkIsAuth);
  const navigate = useNavigate();

  const {
    register: registerInput,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (status) {
      if (status === 'Login successful') {
        toast.success('Login successful');
      } else {
        toast.error(status);
      }
    }

    if (isAuth) navigate('/');
  }, [isAuth, navigate, status]);

  const onSubmit = data => {
    dispatch(login(data));
  };

  errors.email && toast.info(errors.email?.message);
  errors.password && toast.info(errors.password?.message);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-40 flex h-60 w-1/4 flex-col gap-4"
    >
      <h1 className=" text-center text-2xl font-medium  text-white">Authorization</h1>

      <label className=" text-xs">
        <input
          {...registerInput('email', {
            required: 'Fill in the field email',
            pattern: {
              // eslint-disable-next-line no-useless-escape
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Enter a valid email',
            },
          })}
          type="text"
          placeholder="Email"
          className="mt-1 w-full rounded-lg border bg-gray-200 py-2 px-2 text-xs text-black outline-none placeholder:text-gray-400 focus:border-green-600 focus:bg-white"
        />
      </label>

      <label className=" text-xs">
        <input
          {...registerInput('password', {
            required: 'Fill in the field password',
          })}
          type="text"
          placeholder="Password"
          className="mt-1 w-full rounded-lg border bg-gray-200 py-2 px-2 text-xs text-black outline-none placeholder:text-gray-400 focus:border-green-600 focus:bg-white"
        />
      </label>

      <div className="flex justify-center gap-8 ">
        <Button type={'submit'}>Sign In</Button>
        <LinkButton path={'/register'}>Register</LinkButton>
      </div>
    </form>
  );
};
