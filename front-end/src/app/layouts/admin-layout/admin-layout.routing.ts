import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { RentingComponent } from '../../renting/renting.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'resources',      component: HomeComponent },
    { path: 'clients',           component: UserComponent },
    { path: 'inventory',          component: TablesComponent },
    { path: 'renting',     component: RentingComponent }
];
