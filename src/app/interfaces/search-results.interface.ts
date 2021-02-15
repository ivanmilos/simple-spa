import { IUserBasicDTO } from 'src/app/interfaces/user.interface';

export interface ISearchResultsDTO {
    total_count: number;
    incomplete_results: boolean;
    items: any[];
}

export interface IUserSearchResultsDTO extends ISearchResultsDTO {
    items: IUserBasicDTO[];
}
