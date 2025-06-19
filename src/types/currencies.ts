export interface CommonCurrency {
  code: string;
  name: string;
  flag: string;
}

export interface Currency {
  code: string;
  name: string;
}

export interface CurrenciesResponse {
  common_currencies: CommonCurrency[];
  all_currencies: Currency[];
}
