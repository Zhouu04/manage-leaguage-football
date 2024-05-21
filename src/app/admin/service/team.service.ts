import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamDTO } from '../../dto/TeamDTO';
import {TeamPageInfo} from "../../dto/TeamPageInfo";

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl = 'http://localhost:8080/api/v1/teams';
  private cloudinaryUrl = 'http://localhost:8080/api/v1/cloudinary';

  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<TeamDTO[]> {
    return this.http.get<TeamDTO[]>(this.apiUrl);
  }

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

  uploadImage(file: File, teamId: string): Observable<TeamDTO> {
    const formData: FormData = new FormData();
    formData.append('image', file);

    return this.http.post<TeamDTO>(`${this.cloudinaryUrl}/${teamId}`, formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }

  search(id: string | null, model: TeamPageInfo | number): Observable<TeamDTO[]> {
    const url = `${this.apiUrl}/search/${id}`;
    return this.http.post<TeamDTO[]>(url, model);
  }

  count(id: String, model: TeamPageInfo): Observable<number> {
    const url = `${this.apiUrl}/count/${id}`;
    return this.http.post<number>(url, model);
  }

}
