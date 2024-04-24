import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {SeasonDTO} from "../../dto/SeasonDTO";

@Injectable({
  providedIn: 'root'
})
export class SeasonService {
  private apiUrl = 'http://localhost:8080/api/v1/seasons';

  constructor(private http: HttpClient) {}

  getAllSeasons(): Observable<SeasonDTO[]> {
    return this.http.get<SeasonDTO[]>(this.apiUrl);
  }

  getSeasonById(seasonId: string | null): Observable<SeasonDTO> {
    return this.http.get<SeasonDTO>(this.apiUrl + "/" + seasonId);
  }

  getAllByIdLeague(leagueId: string | null): Observable<SeasonDTO[]> {
    const url = `${this.apiUrl}/league/${leagueId}`;
    return this.http.get<SeasonDTO[]>(url);
  }

  createSeason(season: SeasonDTO): Observable<SeasonDTO> {
    return this.http.post<SeasonDTO>(this.apiUrl, season);
  }

  updateSeason(season: SeasonDTO): Observable<SeasonDTO> {
    return this.http.put<SeasonDTO>(this.apiUrl, season);
  }

  deleteSeason(seasonId: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/" + seasonId);
  }
}
