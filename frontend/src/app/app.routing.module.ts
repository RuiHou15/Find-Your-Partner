import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { SearchResultComponent } from './search-result';
import { MainpageComponent } from './mainpage';
import { ProfileComponent } from './profile';



const routes: Routes = [
	{ path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'mainpage/:tag', component: MainpageComponent},
    { path: 'profile/:user_id', component: ProfileComponent},
    { path: 'search/:searchContent', component: SearchResultComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);