import { PersonRegisterType } from "../../../types/person-register";

export const PERSON_DEFAULT: PersonRegisterType = {
    password: "",
    personRole: "ROLE_STUDENT",
    cpf: "",
    genderAcronym: "",
    name: "",
    birthDate: "",
    specificAddressFormDTO: {
        number: "",
        complement: "",
        cep: "",
        street: "",
        streetType: "",
        neighborhood: "",
        city: "",
        federalUnit: "",
    },
    mainEmail: "",
    phoneList: [{ number: "", dddNumber: 0, ddiNumber: 0 }],
}