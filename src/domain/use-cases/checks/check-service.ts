
interface CheckServiceUseCase{
    execute(url:string): Promise<boolean>;
}


type SuccessCallBack = () => void;
type ErrorCallBack = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly SuccessCallBack: SuccessCallBack,
    private readonly ErrorCallBack: ErrorCallBack
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on checking service ${url}`);
      }

      this.SuccessCallBack();
      return true;
    } catch (error) {
      this.ErrorCallBack(`${error}`);
      return false;
    }
  }
}
