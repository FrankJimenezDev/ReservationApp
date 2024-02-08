
export interface Auth<T> {
    register(body : T) : Promise<T>;
    login() : void;
    googleLogin() : void;
    facebookLogin() : void;
    xLogin() : void;
}