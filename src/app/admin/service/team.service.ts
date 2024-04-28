import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TeamDTO} from "../../dto/TeamDTO";

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl = 'http://localhost:8080/api/v1/teams';

  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<TeamDTO[]> {
    return this.http.get<TeamDTO[]>(this.apiUrl);
  }

  //bxh
  getTeamOrderByScore(id: string): Observable<TeamDTO[]> {
    return this.http.get<TeamDTO[]>(`${this.apiUrl}/rank/${id}`);
  }

  getTeamsBySeason(id: string | null): Observable<TeamDTO[]> {
    return this.http.get<TeamDTO[]>(`${this.apiUrl}/season/${id}`);
  }

  createTeam(teamData: TeamDTO): Observable<any> {
    return this.http.post<TeamDTO>(this.apiUrl, teamData);
  }

  updateTeam(teamData: TeamDTO): Observable<any> {
    return this.http.put<TeamDTO>(this.apiUrl, teamData);
  }

  deleteTeam(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
