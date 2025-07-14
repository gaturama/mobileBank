declare module "*.json" {
  const value: any;
  export default value;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        nome_completo: string;
        email: string;
      };
    }
  }
}