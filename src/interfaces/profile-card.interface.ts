export interface SocialMediaProfile {
    name: string;
    url: string;
}

export interface ProfileData {
    name: string;
    description: string;
    image: string;
    socialMedia: SocialMediaProfile[];
}