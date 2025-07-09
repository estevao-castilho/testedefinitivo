// types/next-auth/index.d.ts
declare module "@auth/core/types" {
  export interface RequestInternal {
    method?: string;
    cookies?: Partial<Record<string, string>>;
    headers?: Record<string, string>;
    query?: Record<string, string>;
    body?: Record<string, any>;
    action: string;
    providerId?: string;
    error?: string;
  }

  export interface CookieOption {
    name: string;
    options: {
      httpOnly?: boolean;
      sameSite?: 'lax'|'strict'|'none';
      path?: string;
      secure?: boolean;
      maxAge?: number;
      domain?: string;
    };
  }

  export interface LoggerInstance {
    debug(message: string): void;
    error(message: string): void;
    warn(message: string): void;
  }
}