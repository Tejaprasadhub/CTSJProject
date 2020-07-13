export class News {
    constructor(
        public id: number,
        public title: string,
        public branchid: number,
        public description: string,
        public createddate: Date,
        public createdby: string
    ) { }
}
