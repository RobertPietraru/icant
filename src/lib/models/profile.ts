export type Gender = 'male' | 'female';

export type ProfileType = 'teacher' | 'student' | 'mentor';

export interface Profile {
    bio?: string;
    first_name: string;
    last_name: string;
    date_of_birth: Date; 
    type: ProfileType;
    picture?: string;
    gender?: Gender;
    phone?: string;
    photo?: string;
}