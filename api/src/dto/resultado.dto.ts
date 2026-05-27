export interface ResultadoDto<T = unknown> {
  success: boolean;
  message: string;
  error?: string | unknown;
  data?: T;
}
