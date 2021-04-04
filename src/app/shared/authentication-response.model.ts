
export class AuthenticationResponse {
  public access_token: string;
  public refresh_token: string;
  constructor(access_token: string, refresh_token: string) {
    this.access_token = access_token;
    this.refresh_token = refresh_token;
  }
}