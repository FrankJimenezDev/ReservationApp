import { RegisterDto } from "./register.dto";
import { LoginDto } from "./login.dto";

export interface Auth<T> {
    register( registerDto : RegisterDto) : Promise<T>;
    login(loginDTO : LoginDto) : Promise<any>;
    googleLogin() : any;
    facebookLogin() : any;
    xLogin() : any;
}