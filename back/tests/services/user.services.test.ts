import { SALT } from "../../src/config";
import { DB_URL, DB_ANON } from "../../src/config";
import { registerUser } from '../../src/services/user.services';
import bcrypt from 'bcrypt';
import { createClient } from '@supabase/supabase-js';

jest.mock('bcrypt');
jest.mock('@supabase/supabase-js', () => {
    const mClient = {
      from: jest.fn(),
    };
    return {
      createClient: jest.fn(() => mClient),
    };
  });

const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
const supabase = createClient(DB_URL!, DB_ANON!);
const mockedSupabase = supabase as jest.Mocked<typeof supabase>;

describe('registerUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a user successfully', async () => {
    // Mock bcrypt hash function
    mockedBcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');

    // Mock supabase insert function
    mockedSupabase.from.mockReturnValue({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: { id_user: 1, name: 'John Doe', email: 'john@example.com' },
            error: null,
          }),
        }),
      }),
    } as any);

    const result = await registerUser('John Doe', 'johndoe', 'john@example.com', 'password123', '2000-01-01');

    expect(result).toEqual({ id_user: 1, name: 'John Doe', email: 'john@example.com' });
    expect(mockedBcrypt.hash).toHaveBeenCalledWith('password123', +SALT);
    expect(mockedSupabase.from).toHaveBeenCalledWith('users');
  });

  it('should return an error if user registration fails', async () => {
    mockedBcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');

    mockedSupabase.from.mockReturnValue({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: null,
            error: { message: 'User already exists' },
          }),
        }),
      }),
    } as any);

    const result = await registerUser('John Doe', 'johndoe', 'john@example.com', 'password123', '2000-01-01');

    expect(result).toEqual({ error: { message: 'User already exists' } });
  });

  it('should handle exceptions during registration', async () => {
    mockedBcrypt.hash = jest.fn().mockRejectedValue(new Error('Hashing failed'));

    const result = await registerUser('John Doe', 'johndoe', 'john@example.com', 'password123', '2000-01-01');

    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe('Hashing failed');
  });
});

