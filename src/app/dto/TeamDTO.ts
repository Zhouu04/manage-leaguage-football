export interface TeamDTO {
  id?: string;
  idSeason?: string;
  name?: string;
  phoneNumber?: string;
  captainName?: string;
  facebook?: string;
  email?: string;
  //point
  score?: number;
  // so tran thang
  win?: number;
  // so tran thua
  loss?: number;
  //so tran hoa
  draw?: number;
  // so ban thang
  goalWin?: number;
  // so ban thua
  goalLoss?: number;
  // hieu so
  difference?: number;
}
