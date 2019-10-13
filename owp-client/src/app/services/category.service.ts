import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { Category } from '../interfaces'
import { Observable } from "rxjs";
 
@Injectable({
    providedIn: 'root'
})

export class CategoryService {

    constructor(private http: HttpClient){}

    getAll(): Observable<Category[]> {
       return this.http.get<Category[]>('/api/category')
    }

}