import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilisateurService} from "../services/utilisateur.service";
import {Role} from "../model/role.model";

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent  implements OnInit{
  utilisateurFormGroup!: FormGroup;
  pdfFileURL!: string;
  selectedFiles!: any;
  roles: Role[] = [];
  errorMessage!: string;

  ngOnInit(): void {
    this.utilisateurFormGroup = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      confirmPassword: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      role: this.fb.control(''),
      fileName: this.fb.control(''),
    });
    this.findAllRole();
  }
  constructor(private fb: FormBuilder, private utilisateurService: UtilisateurService) {
  }

  onSelectedFile(event: any) {
    this.selectedFiles=event.target.files;
  }
  selectFile(event: any) {
    if(event.target.files.length>0){
      let file = event.target.files[0];
      this.utilisateurFormGroup.patchValue({
        fileSource: file,
        fileName: file.name
      });
      this.pdfFileURL = window.URL.createObjectURL(file);
    }
  }

  handleSaveUser() {
    /*let date = new Date(this.utilisateurFormGroup.value.date);
    let formatedDate = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    formData.set('date', formatedDate);*/
    let formData = new FormData();
    formData.set('username', this.utilisateurFormGroup.value.username);
    formData.set('password', this.utilisateurFormGroup.value.password);
    formData.set('confirmPassword', this.utilisateurFormGroup.value.confirmPassword);
    formData.set('role', this.utilisateurFormGroup.value.role);
    formData.set('email', this.utilisateurFormGroup.value.email);
    //formData.set('file', this.utilisateurFormGroup.value.fileSource);
    formData.set('file', this.selectedFiles.item(0));


    this.utilisateurService.create(formData)
      .subscribe({
        next: value => {
          alert("Saved successfully")
          this.selectedFiles = undefined;
          this.utilisateurFormGroup.reset();
        },
        error: err => {
          this.errorMessage = err.error.errorMessage;
          console.log(this.errorMessage);
        }
      })
  }

  findAllRole(){
    this.utilisateurService.findAllRole().subscribe({
      next: role => {
        this.roles = role;
      },
      error: err => {
        this.errorMessage = err.error.errorMessage;
      }
    });
  }


}
