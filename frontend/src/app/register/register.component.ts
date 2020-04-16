import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';

import { User } from '../models';

import { AlertService, UserService, AuthenticationService } from '../services';



@Component({ 
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.css'] })
export class RegisterComponent implements OnInit {
    idFormGroup: FormGroup;
    nameFormGroup: FormGroup;
    passwordFormGroup: FormGroup;
    genderFormGroup: FormGroup;
    departmentFormGroup: FormGroup;

    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.idFormGroup = this.formBuilder.group({
            idCtrl: ['', Validators.required],
            emailCtrl: ['', [Validators.required, Validators.email]]
        });
        this.nameFormGroup = this.formBuilder.group({
            lastNameCtrl: ['', Validators.required],
            firstNameCtrl: ['', Validators.required]
        });
        this.genderFormGroup = this.formBuilder.group({
            genderCtrl: ['', Validators.required]
        });
        this.departmentFormGroup = this.formBuilder.group({
            departmentCtrl: ['', Validators.required]
        });
        this.passwordFormGroup = this.formBuilder.group({
            passwordCtrl: ['', [Validators.required, Validators.min(6)]]
        });

    }


    onSubmit() {
        
        var registrationInfo = new User(
            this.idFormGroup.value['idCtrl'],
            this.idFormGroup.value['emailCtrl'],
            this.nameFormGroup.value['firstNameCtrl'] + " " + this.nameFormGroup.value['lastNameCtrl'],
            this.passwordFormGroup.value['passwordCtrl'],
            this.genderFormGroup.value['genderCtrl'],
            this.departmentFormGroup.value['departmentCtrl']);


        this.userService.register(registrationInfo)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error.error['user_id'][0], false);
                    this.loading = false;
                });
    }
}
