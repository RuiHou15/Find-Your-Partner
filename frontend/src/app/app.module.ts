import { NgModule } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';


import { appRoutingModule } from './app.routing.module';

import { AppComponent, SessionExpiredDialog } from './app.component';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './alert';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';
import { ProfileComponent } from './profile/profile.component';
import { NoteComponent } from './note/note.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { PostNoteComponent } from './post-note/post-note.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SearchNoteComponent } from './search-note/search-note.component';
import { SearchResultComponent } from './search-result/search-result.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatButtonModule,
        MatRadioModule,
        MatCardModule,
        MatGridListModule,
        MatInputModule,
        MatDialogModule,
        MatStepperModule,
        MatSelectModule,
        appRoutingModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        HomeComponent,
        CardComponent,
        ProfileComponent,
        NoteComponent,
        MainpageComponent,
        PostNoteComponent,
        EditProfileComponent,
        SearchNoteComponent,
        SessionExpiredDialog,
        SearchResultComponent,
    ],
    entryComponents: [SessionExpiredDialog],
    providers: [BnNgIdleService],
    bootstrap: [AppComponent]
})
export class AppModule { };