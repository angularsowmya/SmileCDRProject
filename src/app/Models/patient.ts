export interface Patient {
    resourceType: string;
    id:           string;
    meta:         Welcome10Meta;
    type:         string;
    link:         Link[];
    entry:        Entry[];
}

export interface Entry {
    fullUrl:  string;
    resource: Resource;
    search:   Search;
}

export interface Resource {
    resourceType: ResourceType;
    id:           string;
    meta:         ResourceMeta;
    extension:    ResourceExtension[];
    identifier:   Identifier[];
    name:         Name[];
    telecom:      Identifier[];
    gender:       Gender;
    birthDate:    Date;
    address:      Address[];
}

export interface Address {
    type:        Type;
    line?:       Line[];
    city?:       City;
    state?:      State;
    postalCode?: PostalCode;
}

export enum City {
    TestCity = "TestCity",
}

export enum Line {
    TestAddress = "TestAddress",
    TestAddress2 = "TestAddress2",
}

export enum PostalCode {
    The119067401 = "11906-7401",
}

export enum State {
    Ar = "AR",
}

export enum Type {
    Physical = "physical",
    Postal = "postal",
}

export interface ResourceExtension {
    url:          string;
    extension?:   ExtensionExtension[];
    valueString?: string;
}

export interface ExtensionExtension {
    url:            string;
    valueString?:   string;
    valueDateTime?: Date;
}

export enum Gender {
    Female = "female",
}

export interface Identifier {
    system: System;
    value:  string;
}

export enum System {
    Email = "email",
    MemberID = "memberID",
    Phone = "phone",
}

export interface ResourceMeta {
    versionId:   string;
    lastUpdated: Date;
    source:      string;
    profile:     string[];
}

export interface Name {
    family: Family;
    given:  Given[];
}

export enum Family {
    TestFamily = "TestFamily",
}

export enum Given {
    Q = "Q",
    TestGiven = "TestGiven",
}

export enum ResourceType {
    Patient = "Patient",
}

export interface Search {
    mode: Mode;
}

export enum Mode {
    Match = "match",
}

export interface Link {
    relation: string;
    url:      string;
}

export interface Welcome10Meta {
    lastUpdated: Date;
}
