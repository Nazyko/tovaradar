import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMe } from '../services/service';
import { useState, useEffect } from 'react';

export function useAuth() {
    const [isAuth, setAuth] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const { data, isSuccess, refetch } = useQuery({
        queryKey: ['auth'],
        queryFn: getMe,
        enabled: false,
    });

    useEffect(() => {
        if (isSuccess && data) {
            setAuth(true);
        } else {
            setAuth(false);
        }
    }, [isSuccess, data]);

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setAuth(false);
        queryClient.invalidateQueries({ queryKey: ['auth'] });
    };

    return {
        isAuth,
        image: data?.image,
        username: data?.username,
        logout,
        refetch,
    };
}
