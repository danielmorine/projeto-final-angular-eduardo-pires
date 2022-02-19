export class LocalStorageUtils {
    
    public getUser(){
        return JSON.parse(localStorage.getItem('user'));
    }

    public addUserLocalStorage(response: any){
        this.addUserToken(response.accessToken);
        this.addUser(response.userToken);
    }
    
    public cleanUser(){
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    public getUserToken(){
        return localStorage.getItem('token');
    }

    public addUserToken(token:string){  
        localStorage.setItem('token', token);
    }

    public addUser(user:string){
        localStorage.setItem('user', JSON.stringify(user));
    }

}