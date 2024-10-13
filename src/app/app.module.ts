// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { IconsSectionComponent } from './components/icons-section/icons-section.component';
import { BestSellersComponent } from './components/best-sellers/best-sellers.component';
import { ProductsComponent } from './components/products/products.component';
import { SingleCardComponent } from './components/single-card/single-card.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    CartComponent,
    AboutComponent,
    LoginComponent,
    SignUpComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    IconsSectionComponent,
    BestSellersComponent,
    ProductsComponent,
    SingleCardComponent,
    DashboardComponent,
    ManageProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}