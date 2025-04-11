export interface UserDTO {
    id?: string;
    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
    phone?: string;
    regions?: string[];
}

export class User implements UserDTO {
    id?: string;
    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
    phone?: string;
    regions?: string[];

    constructor(data: UserDTO) {
        this.id = data.id;
        this.email = data.email;
        this.password = data.password;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.phone = data.phone;
        this.regions = data.regions;
    }

    toJSON(): UserDTO {
        return {
            id: this.id,
            email: this.email,
            password: this.password,
            firstname: this.firstname,
            lastname: this.lastname,
            phone: this.phone,
            regions: this.regions,
        };
    }

    static fromJSON(json: any): UserDTO {
        if (!json || typeof json !== 'object') {
            throw new Error('Invalid JSON for UserDTO');
        }
        return new User(json);
    }
}