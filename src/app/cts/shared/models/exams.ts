export class Exams {
    
         id: number;
         title: string;
         year: number;
         createddate: Date;
         createdby: string;
         indexId:number;
        querytype:number;
        status:string;
         subject:string;
         cutoff:string;
         total:string;
}

export class examswisesubject{
    subjectid:number;
    subject:string;
    cutoff:number;
    total:number;
}
