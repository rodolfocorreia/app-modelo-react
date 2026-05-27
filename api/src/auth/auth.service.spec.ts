import { Test, TestingModule } from '@nestjs/testing';

import { TokenService } from 'src/token/token.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsuariosService,
          useValue: {
            findOneByEmailWithPassword: jest.fn(),
          },
        },
        {
          provide: TokenService,
          useValue: {
            gerarAccessToken: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
