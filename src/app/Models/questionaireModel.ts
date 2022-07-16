export interface QuestionnaireModel {
    resourceType: string;
    id:           string;
    url:          string;
    status:       string;
    subjectType:  string[];
    date:         Date;
    item:         Item[];
}

export interface Item {
    linkId:  string;
    text:    string;
    type:    string;
    option?: Option[];
}

export interface Option {
    valueCoding: ValueCoding;
}

export interface ValueCoding {
    system:  string;
    code:    string;
    display: string;
}
