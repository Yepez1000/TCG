'use client';

import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image'
import Link from 'next/link'

export function SignInButton() {
    const { data: session, status } = useSession();
    if (status === "loading") {
        return <p>Loading...</p>;
    }
    if (status === "authenticated") {
        return (
            <Link href={"/profile"}>
                <Image
                    src ={session.user?.image ?? ""}
                    width={30}
                    height={30}
                    alt="profile"
                />
            </Link>
        )
    }
    if (status === "unauthenticated") {
        return (
            <button onClick={() => signIn()}>Sign in</button>
        );
    }

}

export function SignOutButton() {
    return <button onClick = {() => signOut()}>Sign out</button>
}