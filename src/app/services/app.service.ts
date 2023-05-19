import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_BASE = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }


  getAll(){
    return this.http.get(`${API_BASE}/tasks`);
  }

  create( task: any ){
    return this.http.post(`${API_BASE}/tasks`, task);
  }

  update(id: string,  task: any ){
    return this.http.put(`${API_BASE}/tasks/${id}`, task);
  }

  delete(id: string){
    return this.http.delete(`${API_BASE}/tasks/${id}`);
  }
}
