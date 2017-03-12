export class Questionnaire {
    constructor(
        public _id: string,
        public name: string,
        public surname: string,
        public organization: string,
        public business: string,
        public address: string,
        public email: string,
        public phone: string,
        public goal: string
    ) { }
}