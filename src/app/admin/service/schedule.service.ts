// schedule.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ScheduleDTO} from "../../dto/ScheduleDTO";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private baseUrl = 'http://localhost:8080/api/v1/schedules';

  constructor(private http: HttpClient) { }

  addScheduleRound(id: string | null): Observable<ScheduleDTO[]> {
    return this.http.post<ScheduleDTO[]>(`${this.baseUrl}/round/${id}`, {});
  }

  addScheduleKnockOut(id: string | null): Observable<ScheduleDTO[]> {
    return this.http.post<ScheduleDTO[]>(`${this.baseUrl}/knock-out/${id}`, {});
  }

  getSchedulesBySeasonId(id: string | null): Observable<ScheduleDTO[]> {
    return this.http.get<ScheduleDTO[]>(`${this.baseUrl}/${id}`);
  }
}
