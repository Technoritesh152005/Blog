import conf from '../conf/conf.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // Create a new account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);

      if (userAccount) {
        // Login only if no session exists
        const currentUser = await this.getCurrentUser();
        if (!currentUser) {
          return this.login({ email, password });
        }
        return userAccount; // Already logged in
      }
      return userAccount;
    } catch (error) {
      console.error("Appwrite Error: createAccount:", error.message);
      throw error;
    }
  }

  // Login to an existing account
  async login({ email, password }) {
    try {
      const currentUser = await this.getCurrentUser();
      if (currentUser) {
        console.log("User already logged in:", currentUser.email);
        return currentUser; // Avoid creating duplicate session
      }
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Appwrite Service: login: Error:", error.message);
      throw error;
    }
  }

  // Get the currently signed-in user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite auth.js: getCurrentUser:", error.message);
      return null;
    }
  }

  // Logout of the current session
  async logout() {
    try {
      await this.account.deleteSessions();
      console.log("User logged out successfully");
      return true;
    } catch (error) {
      console.error("Appwrite auth.js: logout: error:", error.message);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
