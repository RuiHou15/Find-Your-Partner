import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, Note, Tag } from '../models';

import { baseUrl } from './url';

@Injectable({ providedIn: 'root' })
export class TagService {
    constructor(private http: HttpClient) { }

    getAllTags() {
        return this.http.get<Tag[]>(`${baseUrl}/tags/`);
    }

}