import { Region } from '../interfaces/Regions.ts';

export interface UserDTO {
    id?: string;
    email: string;
    password: string;
    username: string;
    phone?: string;
    regions?: Region[];
}

export class User implements UserDTO {
    id?: string;
    email: string;
    password: string;
    username: string;
    phone?: string;
    regions?: Region[];

    constructor(data: UserDTO) {
        this.id = data.id;
        this.email = data.email;
        this.password = data.password;
        this.username = data.username;
        this.phone = data.phone;
        this.regions = data.regions;
    }

    toJSON(): UserDTO {
        return {
            id: this.id,
            email: this.email,
            password: this.password,
            username: this.username,
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
