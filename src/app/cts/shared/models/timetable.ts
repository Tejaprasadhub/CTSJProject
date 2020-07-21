export class Timetable {
    constructor(
        public id: number,
        public classid: number,
        public subjectid: number,
        public teacherid: number,
        public periodfrom: Date,
        public periodto: Date,
        public createddate: Date,
        public createdby: string
    ) { }
}
