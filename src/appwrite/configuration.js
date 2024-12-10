import config from "../config/config";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    
    
    async createPost({ title, slug, content, featuredImage, status, userId }){
        try {
            return await this.databases.createDocument( config.appwriteDatabaseId, config.appwriteCollectionId, slug, { title, content, featuredImage, status, userId})
        } catch (error) {
            console.log("error in create post");
            throw error
        }
    }

    async updatePost(slug, { title, content, featturedImage, status }){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featturedImage,
                    status,
                }
            );
        } catch (error) {
            console.log("error in update post");
            throw error;
        }
    }


    async deletePost(slug){
        try {
                await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.log("error in delete post");
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("error in get post");
            return false;
        }
    }

    // [ Query.equal("status", "active") ]
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            const response = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            );
            // console.log(response);
            return response;
        } catch (error) {
            console.log("error in get all post");
            return false;
        }
    }

    // file upload services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("error inupload file");
            return false;
        }
    }

    async deleteFile(fileId){
        try {
                await this.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("error");
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId,
        );
    }

};

const service = new Service();
export default service;