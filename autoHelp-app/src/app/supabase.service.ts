import { Injectable } from '@angular/core';
import {
    createClient, SupabaseClient,
} from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root'
})
export class SupabaseService {
    private supabase: SupabaseClient
    constructor() {
        this.supabase = createClient("https://mfxckoprxtyniytbkbxk.supabase.co",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1meGNrb3ByeHR5bml5dGJrYnhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ2MzQzOTIsImV4cCI6MTk5MDIxMDM5Mn0.nW3eW0VXcRSUj6rc593P9wYyScauDaN2wz6tpGEVdfs")
    }
    getAll() {
        return this.supabase.from('requests').select();
    }

    insertRequest(userPhone: string, user_name: string, user_car?: string) {
        return this.supabase.from('requests').insert({ user_phone: userPhone, user_name: user_name, user_car: user_car })
    }
}

