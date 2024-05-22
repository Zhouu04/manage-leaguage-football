import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserDTO } from 'src/app/dto/UserDTO';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/v1/users'; // Đường dẫn đến API backend

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.baseUrl}/register`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  loginUser(email: string, password: string): Observable<boolean> {
    return this.http.post<{ success: boolean }>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        map(response => response.success),
        catchError(this.handleError)
      );
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<{ exists: boolean }>(`${this.baseUrl}/check-email`, { params: { email } })
      .pipe(
        map(response => response.exists),
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error); 
    return throwError(error);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`, {}).pipe(
      map(() => {
        
        this.router.navigateByUrl('/home');
      }),
      catchError(this.handleError)
    );
  }
}
