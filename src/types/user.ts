export interface IUser {
  id: number;
  login: string;
  name: string;
  gender: 'M' | 'F' | 'N';
  birthDate: string;
  imageUrl: string;
  email: string;
  countryCode: string;
  phone: string;
  langKey: string;
  activated: Boolean;
  deleted: Boolean;
  deletedDate: string;
  authorities: Array<'ROLE_ADMIN' | 'ROLE_USER'>;
  lastConnectedDate: string;
  loginType?: 'NAVER' | 'KAKAO' | 'FACEBOOK' | 'GOOGLE' | 'APPLE';
  createdDate: string;
  updatedDate: string;
}

export interface IReport {
  id?: number;
  type: 'PROFILE_PHOTO' | 'NICKNAME' | 'CHATTING' | 'ANSWER';
  typeText: string;
  reason:
    | 'OFFENSIVE'
    | 'SEXUAL'
    | 'ADVERTISING'
    | 'DISPLEASURE'
    | 'PIRATE'
    | 'ETC';
  reasonText: string;
  sourceId?: number;
  content?: string;
  user?: { id: number; name: string };
  reportedUser?: { id: number; name: string };
  createdDate: string;
}

export interface IQuestion {
  id?: number;
  contents: string;
  description: string;
  answerCount: number;
  enabled: boolean;
}
