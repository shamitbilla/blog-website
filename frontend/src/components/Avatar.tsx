interface AvatarProps {
    name: string;
    type? : "small" | "big";
}

export const Avatar = ({ name, type}:AvatarProps) => {
    
    const getInitials = (name: string): string => {
        const names = name.split(' ');
        return names.map(n => n[0]).join('').toUpperCase();
    };

    return (
        <div className={`flex items-center justify-center ${type === 'big'? 'w-10 h-10' : 'w-8 h-8'} bg-gray-400 rounded-full text-white text-lg font-semibold`}>
            {getInitials(name)}
        </div>
    );
};
