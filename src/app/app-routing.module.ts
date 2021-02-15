import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavRoutes } from './app-routing.constants';

const routes: Routes = [
    {
        path: NavRoutes.HOME,
        redirectTo: NavRoutes.SEARCH_USERS,
        pathMatch: 'full',
    },
    {
        path: NavRoutes.SEARCH_USERS,
        loadChildren: () =>
            import(
                './pages/search-page-container/search-page-container.module'
            ).then(m => m.SearchPageContainerModule),
    },
    {
        path: NavRoutes.USERS + '/:alias',
        loadChildren: () =>
            import(
                './pages/single-user-page-container/single-user-page-container.module'
            ).then(m => m.SingleUserPageContainerModule),
    },
    { path: '**', redirectTo: NavRoutes.SEARCH_USERS, pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            useHash: true,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
