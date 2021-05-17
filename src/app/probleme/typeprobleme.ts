HttpClientInMemoryWebApiModule .forRoot(ProblemeData, { delay: 1000 })
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProblemeData } from './probleme-data';

export interface ITypeProbleme {
    id: number;
    descriptionTypeProbleme: string;
}
