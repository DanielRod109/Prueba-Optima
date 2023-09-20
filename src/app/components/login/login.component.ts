import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserLogin } from '../../classes/user-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public myForm!:FormGroup; //Cargar el formulario

  constructor(private fb:FormBuilder,
    private auth:AuthService,
    private router: Router){}


  ngOnInit(): void {
      this.myForm = this.createMyForm();
  }

  private createMyForm():FormGroup{
    return this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });
  }

  public submitForm(){
    const loginData: UserLogin = {
      username: this.myForm.get('username')?.value,
      password: this.myForm.get('password')?.value
    };
    if(this.myForm.invalid){
        Object.values(this.myForm.controls).forEach(control=>{
          control.markAllAsTouched();
        });
        return;
    }else{
      this.auth.login(loginData).subscribe(
        data => {
          if(data.accessToken !=''){
            console.log("Ingresado")
            this.router.navigate(['admin/dashboard'])
          }
        },
        error =>{
          const Toast = Swal.mixin({
            toast: true,
            background: '#DE5454',
            position: 'top',
            iconColor: 'white',
            customClass: {
              popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
          })
          Toast.fire({
            icon: 'error',
            title: 'Credenciales incorrectas'
          })   
          console.log(error);
        }
      )
    }
  }

  public get f():any{ //Para poder manejar las validaciones en el form
    return this.myForm.controls;
  }
}
