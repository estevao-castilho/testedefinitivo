// types/next-auth.d.ts
declare module "@auth/core/types" {
  interface RequestInternal {
    method?: string
    cookies?: Record<string, string>
    headers?: Record<string, string>
    query?: Record<string, string>
    body?: Record<string, any>
    action: string
    error?: string
  }
}