'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth.tsx';

export default function AuthButtons() {
    const { user, loading } = useAuth();

    if (loading || user) {
        return null;
    }

    return (
        <>
            <Button variant="ghost" asChild>
                <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
                <Link href="/signup">Sign Up</Link>
            </Button>
        </>
    );
}
