'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import {AiFillBug} from 'react-icons/ai'
import classnames from 'classnames'
import {useSession} from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'

const NavBar = () => {

  return (
    
    <nav className='px-5 border-b mb-5 py-3'>
        <Container>
            <Flex justify="between">

                <Flex align="center" gap="3">
                    <Link href='/'><AiFillBug/></Link>
                    <NavLinks />
                </Flex>

                <AuthStatus />

            </Flex>
        </Container>
        
    </nav>
  )
}

export default NavBar


const NavLinks = ()=>{
    const currentPath = usePathname()

    const links = [
        {lable:'Dashboard', href:'/'},
        {lable:'Issues', href:'/issues/list'}
    ]
    return(
        <ul className='flex space-x-6'>
            {links.map(link=><li key={link.href}><Link href={link.href} className={classnames({
                'nav-link':true,
                '!text-zinc-900':link.href === currentPath,
            })}>
                {link.lable}
            </Link>
            </li>)}
        </ul>
    )
}

const AuthStatus = () =>{
    const {status, data:session} = useSession()

    if (status==="loading") {
        return null
    }
    if (status==="unauthenticated") {
        return <Link href="/api/auth/signin" className='nav-link'>Login</Link>    
    }

    return(
    <Box>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Avatar src={session!.user!.image!} fallback="?" size="2" radius='full' className='cursor-pointer' referrerPolicy='no-referrer'/>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
            <DropdownMenu.Label>
                <Text size="2">{session!.user!.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
                <Link href="/api/auth/signout">Log out</Link>
            </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </Box>
    )
}