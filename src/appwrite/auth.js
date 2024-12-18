import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        // console.log("Appwrite URL:", config.appwriteUrl);
        // console.log("Appwrite Project ID:", config.appwriteProjectId);
        this.client
                .setEndpoint(config.appwriteUrl)
                .setProject(config.appwriteProjectId);
                this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    //  if i land directly in to page then check user login or not
    async getCurrentUser() {
        try {
            const user = await this.account.get();
            // console.log(user);
             return user;
        } catch (error) {
            throw error;
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
// export default AuthService;