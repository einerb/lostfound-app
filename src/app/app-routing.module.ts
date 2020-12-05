import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./services/guards/auth.guard";
import { RoleGuard } from "./services/guards/role.guard";

const routes: Routes = [
  {
    path: `home`,
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: `profile/:id`,
    loadChildren: () =>
      import("./pages/profile/profile.module").then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: `details/:iduser/:id`,
    loadChildren: () =>
      import("./pages/details/details.module").then((m) => m.DetailsModule),
    canActivate: [AuthGuard],
  },
  {
    path: `dashboard`,
    loadChildren: () =>
      import("./pages/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: `settings`,
    loadChildren: () =>
      import("./pages/settings/settings.module").then((m) => m.SettingsModule),
    canActivate: [AuthGuard],
  },
  {
    path: ``,
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: `register`,
    loadChildren: () =>
      import("./pages/register/register.module").then((m) => m.RegisterModule),
  },
  {
    path: "**",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
