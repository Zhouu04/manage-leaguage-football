import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LeagueDTO} from "../../dto/LeagueDTO";

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  private apiUrl = 'http://localhost:8080/api/v1/leagues';

  constructor(private http: HttpClient) { }

  createLeague(league: LeagueDTO): Observable<LeagueDTO> {
    return this.http.post<LeagueDTO>(this.apiUrl, league);
  }

  getAllLeagues(): Observable<LeagueDTO[]> {
    return this.http.get<LeagueDTO[]>(this.apiUrl);
  }

  updateLeague(league: LeagueDTO): Observable<LeagueDTO> {
    return this.http.put<LeagueDTO>(this.apiUrl, league);
  }

  deleteLeague(id: any): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/" + id);
  }
}
