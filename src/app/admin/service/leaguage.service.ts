// import { Injectable } from '@angular/core';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class LeagueService {
//   private leagues: any[] = [];
//
//   constructor() {}
//
//   // Thêm giải đấu mới
//   addLeague(league: any) {
//     this.leagues.push(league);
//     this.saveLeaguesToLocal();
//   }
//
//   // Thêm mùa giải vào giải đấu có tên leagueName
//   addSeasonToLeague(leagueName: string, season: any) {
//     const league = this.findLeagueByName(leagueName);
//     if (league) {
//       if (!league.seasons) {
//         league.seasons = [];
//       }
//       league.seasons.push(season);
//       this.saveLeaguesToLocal();
//     } else {
//       console.log(`Không tìm thấy giải đấu có tên ${leagueName}`);
//     }
//   }
//
//   // Lấy danh sách giải đấu từ localStorage
//   loadLeagues(): any[] {
//     const savedLeagues = localStorage.getItem('leagues');
//     if (savedLeagues) {
//       this.leagues = JSON.parse(savedLeagues);
//     }
//     return this.leagues;
//   }
//
//   // Lưu danh sách giải đấu vào localStorage
//   private saveLeaguesToLocal() {
//     localStorage.setItem('leagues', JSON.stringify(this.leagues));
//   }
//
//   // Tìm giải đấu theo tên
//   private findLeagueByName(name: string) {
//     return this.leagues.find(league => league.name === name);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LeagueDTO} from "../../../dto/LeagueDTO";

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
