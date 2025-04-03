import {inject, Injectable} from '@angular/core';
import bcrypt from "bcryptjs";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

interface SaltResponse {
    salt: string;
}

@Injectable({
    providedIn: 'root'
})
export class SaltGeneratorService {
    private http = inject(HttpClient);
    private baseUrl = "https://localhost:7245/auth"

    async generateSalt(rounds: number = 10): Promise<string> {
        return await bcrypt.genSalt(rounds);
    }

    async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }

    sendSalt(user: string, salt: string): Observable<SaltResponse> {
        const payload = { user, salt };
        return this.http.post<SaltResponse>(`${this.baseUrl}/salt`, payload);
    }

    constructor() {
    }
}
