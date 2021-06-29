import CoreService from 'services/CoreService';

export type LoginData = {
  email: string;
  password: string;
  device: string;
};

export type SignUpData = {
  email: string;
  password: string;
  device: string;
  firstName: string;
  lastName: string;
};

export type LoginResponse = {
  accessToken: string;
};

class AuthService {
  static async login({ email, password, device }: LoginData): Promise<LoginResponse> {
    const response = await CoreService.post({
      url: '/api/v1/auth/login',
      data: { email, password, device },
      authorization: false,
    });

    return response.data;
  }

  static async signUp(data: SignUpData): Promise<LoginResponse> {
    const response = await CoreService.post({
      url: '/api/v1/auth/sign-up',
      data,
      authorization: false,
    });

    return response.data;
  }
}

export default AuthService;
