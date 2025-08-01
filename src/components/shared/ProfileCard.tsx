// src/components/shared/ProfileCard.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SocialMediaProfile } from '@/interfaces';
import { Linkedin, Github, Instagram } from 'lucide-react';

interface ProfileCardProps {
  name: string;
  description: string;
  image: string;
  socialMedia: SocialMediaProfile[];
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  description,
  image,
  socialMedia
}) => {
  // Function to get appropriate icon for social media
  const getSocialIcon = (socialName: string) => {
    switch (socialName.toLowerCase()) {
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Function to handle social media link click
  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Get initials from name for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="w-full max-w-sm mx-auto bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Avatar */}
          <Avatar className="w-20 h-20 ring-4 ring-white shadow-lg">
            <AvatarImage 
              src={image} 
              alt={name}
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg font-semibold">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>

          {/* Name */}
          <h2 className="text-xl font-bold text-gray-900 leading-tight">
            {name}
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed">
            {description}
          </p>

          {/* Social Media Buttons */}
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {socialMedia.map((social, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSocialClick(social.url)}
                className="flex items-center gap-2 hover:bg-gray-50 transition-colors duration-200 text-xs px-3 py-2"
              >
                {getSocialIcon(social.name)}
                <span>{social.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;