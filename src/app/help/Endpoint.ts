export class Endpoint {  
    public static readonly LOGIN_KEY = 'Login';
    public static readonly USER_KEY = 'Logged In User';
    public static readonly LOGIN_VALID = 'true';
    public static readonly LOGIN_INVALID = 'false';  
    public static readonly SESSION_TOKEN = 'session-id';
  
    public static isNullOrEmpty(value: string) {
      return value == undefined || value == null || value == '';
    }
  }
  