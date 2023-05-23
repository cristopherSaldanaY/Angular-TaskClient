import { Component, OnInit, ElementRef } from '@angular/core';
import { Task } from 'src/app/interfaces/task.interface';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: Task[] = [];


  task: Task = {
    id: null,
    name: '',
    completed: false,
  };

  constructor(private appService: AppService, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.fetchAllTasks();
  }

  fetchAllTasks() {
    this.appService.getAll().subscribe((data: any) => {
      this.tasks = data;
      console.log(data);
      console.log(this.tasks)
    });
  }

  saveTask() {
    if (this.task.id) {
      const taskId = this.task.id.toString();
      this.appService.update(taskId, this.task).subscribe(() => this.fetchAllTasks());
    } else {
      this.appService.create(this.task).subscribe(() => this.fetchAllTasks());
    }

    this.resetTask()

  }

  resetTask(){
    this.task = {
      id: null,
      name: '',
      completed: false,
    };
  }

  assignTask(task: Task) {
    this.task = {
      ...task,
    };

    setTimeout( () => {
      const nameInput = this.elementRef.nativeElement.querySelector('#name');
      if(nameInput){
        nameInput.focus();
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    });
  }

  deleteTask(task: Task) {
    if (task.id !== null) {

      Swal.fire({
        title: '¿Estás seguro?',
        text: 'La tarea se eliminará permanentemente',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if(result.isConfirmed){
          const taskId = task.id!.toString();
          this.appService.delete(taskId).subscribe(() => this.fetchAllTasks());
        }
      })

    }
  }
}
