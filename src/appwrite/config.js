import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredimage, status, userid }) {
    try {
      if (!featuredimage) throw new Error("featuredimage is required to create a post");
      if (!userid) throw new Error("userid is required to create a post");

      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredimage, status, userid }
      );
    } catch (error) {
      console.error("Appwrite service :: createPost :: error", error.message);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredimage, status }) {
    try {
      const updateData = { title, content, status };
      if (featuredimage) updateData.featuredimage = featuredimage;
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        updateData
      );
    } catch (error) {
      console.error("Appwrite Service : updatePost : error", error.message);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
      return true;
    } catch (error) {
      console.error("Appwrite Service : deletePost : error", error.message);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
    } catch (error) {
      console.error("Appwrite Service : getPost : error", error.message);
      return false;
    }
  }

  async getPosts(queries = [Query.equal('status', 'active')]) {
    try {
      return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
    } catch (error) {
      console.error("Appwrite service :: getPosts :: error", error.message);
      throw error;
    }
  }

  async uploadFile(file) {
    try {
      if (!file) return null;
      return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
    } catch (error) {
      console.error("Appwrite service :: uploadFile :: error", error.message);
      return null;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Appwrite service :: deleteFile :: error", error.message);
      return false;
    }
  }

 getFilePreview(fileId) {
  if (!fileId) return null; // <-- return null instead of ""
  return this.bucket.getFileView(conf.appwriteBucketId, fileId);
}

}

const service = new Service();
export default service;
