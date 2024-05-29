import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlayerDTO } from 'src/app/dto/PlayerDTO';

@Injectable({
    providedIn: 'root'
  })

export class PlayerService {
    private apiUrl = 'http://localhost:8080/api/v1/players';
    private cloudinaryUrl = 'http://localhost:8080/api/v1/avatar';

    constructor(private http: HttpClient) { }
    createPlayer(playerData: PlayerDTO): Observable<any> {
        return this.http.post<PlayerDTO>(this.apiUrl, playerData);
      }
    
    updatePlayer(playerData: PlayerDTO): Observable<any> {
        return this.http.put<PlayerDTO>(this.apiUrl, playerData);
      }
    
    deletePlayer(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
      }
    getAllPlayer(): Observable<PlayerDTO[]> {
        return this.http.get<PlayerDTO[]>(this.apiUrl);
      }
    getplayerByIdTeam(id: string | null): Observable<PlayerDTO[]> {
        return this.http.get<PlayerDTO[]>(`${this.apiUrl}/team/${id}`);
      }
    getPlayerByOrderGoal(id: string | null): Observable<PlayerDTO[]> {
      return this.http.get<PlayerDTO[]>(`${this.apiUrl}/ranks/${id}`);
    }

    uploadAvatar(file: File, playerId: string): Observable<PlayerDTO> {
      const formData: FormData = new FormData();
      formData.append('avatar', file);
  
      return this.http.post<PlayerDTO>(`${this.cloudinaryUrl}/${playerId}`, formData, {
        headers: new HttpHeaders({
          'enctype': 'multipart/form-data'
        })
      });
    }

}