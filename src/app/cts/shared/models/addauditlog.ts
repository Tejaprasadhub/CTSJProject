export class Addauditlog {
    constructor(

        public id:number,
        public date:Date,
        public fieldname:string,
        public action:string,
        public oldvalue:string,
        public newvalue:string,
        public user:string   
        ){}
    
}
