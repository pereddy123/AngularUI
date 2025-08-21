


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user-service';


@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss'
})
export class UserForm implements OnInit {
  isEdit = false;
  userId: number | null = null;
  form: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {this.form = this.fb.group({
    username: ['', Validators.required],
    password: [''],
    role: ['', Validators.required],
  });}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.userId = +id;

      // Pre-fill for edit (fetch user by ID if you have that endpoint)
      // Optional: this.userService.getById(+id).subscribe(...)
    }
  }

  submit() {
    if (this.form.invalid) return;

    const { username, password, role } = this.form.value;

    if (this.isEdit && this.userId != null) {
      this.userService.updateUser(this.userId, { username: username ?? '', role: role ?? '' }).subscribe(() => {
        this.router.navigate(['/admin/users']);
      });
    } else {
      this.userService.addUser({ username: username ?? '', password: password ?? '', role: role ?? '' }).subscribe(() => {
        this.router.navigate(['/admin/users']);
      });
    }
  }
}
