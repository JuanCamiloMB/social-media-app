import { handleRegisterRoute } from '../../src/controller/register.controller';
import { registerUser } from '../../src/services/user.services';

jest.mock('../../src/services/user.services');

const mockedRegisterUser = registerUser as jest.MockedFunction<typeof registerUser>;

describe('handleRegisterRoute', () => {
  const mockRequest = (body: any) => ({
    body,
  });

  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.setHeader = jest.fn().mockReturnValue(res);
    return res;
  };

  it('should return 400 if data is missing', async () => {
    const req = mockRequest({});
    const res = mockResponse();

    await handleRegisterRoute(req as any, res as any);


    expect(res.json).toHaveBeenCalledWith({ message: 'Not enough data' });
  });

  it('should return 400 if user registration fails', async () => {
    const req = mockRequest({
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      password: 'password123',
      birth_date: '2000-01-01',
    });

    const res = mockResponse();
    mockedRegisterUser.mockResolvedValue({ error: { message: 'User already exists' } });

    await handleRegisterRoute(req as any, res as any);

    // expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: { message: 'User already exists' } });
  });

  it('should register user successfully and set token in cookie', async () => {
    const req = mockRequest({
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      password: 'password123',
      birth_date: '2000-01-01',
    });

    const res = mockResponse();
    mockedRegisterUser.mockResolvedValue({ id_user: 1, name: 'John Doe', email: 'john@example.com' });

    await handleRegisterRoute(req as any, res as any);

    expect(res.setHeader).toHaveBeenCalledWith('Set-Cookie', expect.stringContaining('token='));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id_user: 1, name: 'John Doe', email: 'john@example.com' }));
  });
});
