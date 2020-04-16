import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, Note, Tag, Comment } from '../models';

import {baseUrl} from './url';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${baseUrl}/users/`);
    }

    register(user: User) {
        return this.http.post(`${baseUrl}/users/register/`, user);
    }

    getTagById(tag: number) {
        return this.http.get<Tag>(`${baseUrl}/tags/${tag}`);
    }

    getNotesByTag(tag: number) {
    	return this.http.get<Note[]>(`${baseUrl}/notes/${tag}`);
    }

    getUserById(id: string) {
        return this.http.get<User>(`${baseUrl}/users/${id}`);
    }

    getCommentsByNoteId(note_id: number) {
        return this.http.get<Comment[]>(`${baseUrl}/comments/${note_id}`);
    }

    postNote(note: Note) {
    	return this.http.post(`${baseUrl}/notes/post/`, note);
    }

    postComment(comment: Comment) {
        return this.http.post(`${baseUrl}/notes/comment/`, comment);
    }

    searchNotes(searchContent: string) {
        return this.http.get<Note[]>(`${baseUrl}/search/${searchContent}`);
    }

    liked(user_id: string, note_id: number) {
        return this.http.get<Boolean>(`${baseUrl}/liked/${user_id}/${note_id}`);
    }

    like(user_id: string, note_id: number) {
        return this.http.get<Boolean>(`${baseUrl}/like/${user_id}/${note_id}`);
    }

    delete(id: number) {
        return this.http.delete(`${baseUrl}/users/${id}`);
    }
}