import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Category, Message } from '../interfaces'
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class CategoryService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<Category[]> {
        return this.http.get<Category[]>('/api/category')
    }

    getById(id: string): Observable<Category> {

        return this.http.get<Category>(`/api/category/${id}`)
    }

    create(name: string, image?: File): Observable<Category> {
        let formData = new FormData
        
        if(image) {
            formData.append('image', image, image.name )
        }
        formData.append('name', name)

        // console.log(name)
        // console.log("IMG:")
        // console.log(image)
        // console.log("IMG:")
        // // console.log(image.name)
        // console.log("IMG:")
        // console.log("{{{{{{{{" , formData.get('name') , "}}}}}}}}}}}")
        // console.log(typeof this.http.post<Category>('/api/category', formData))
        
        return this.http.post<Category>('/api/category', formData)
    }

    update(id: string, name: string , image?: File): Observable<Category> {
        const formData = new FormData()
        
        if(image) {
            formData.append('image', image, image.name )
        }
        formData.append('name', name)

        return this.http.patch<Category>(`/api/category${id}`, formData)
    }

    delete(category: Category): Observable<Message> {
        return this.http.delete<Message>(`/api/category/${category._id}`)
    }
}