import { table } from 'console';

export class Paginationutil {
    static getDefaultFilter(){
        return JSON.stringify({
            "sort":"",
            "pageNo":1,
            "pageSize":10,
            "group":"",
            "filter":""
        })
    }

    static getGridFilters(Table:any,Filter:string,isReset = false){
        let currentPage = Table.first +1;
        let pageCount = (Table.first/Table.rows) +1;
        let pageNumber = 1;
        if(Table.first != 0){
            pageNumber = (Table.first/Table.rows) +1;
        }
        let currentrows = Table.row * pageNumber;
        let sorts = (Table.sortField == undefined) ? '' : ((Table.sortField) + '' + (Table.sortOrder == -1 ? 'DESC' : 'ASC'));
        let pageSize = Table.rows;

        if(isReset){
            Table.first =0;
        }

        return {
            "currentPage":currentPage,
            "pageCount":pageCount,
            "sorts":sorts,
            "pageNo":(isReset ? 1 : pageNumber),
            "pageSize":pageSize,
            "group":"",
            "filter":""
        };
    }
}
