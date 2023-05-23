import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* const API_BASE = 'http://localhost:8080'; */
/* const API_BASE = 'http://localhost:4000'; */
const API_BASE = 'https://node-tasks-api-git-main-cristophersaldanay.vercel.app'

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
