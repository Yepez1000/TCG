
'use client'

import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'

async function getOrderSession(url: string) {

    const res = await fetch(url);
    return res.json()

   
}

export default function OrderSuccessPage() {
    const serachParams = useSearchParams();
    const serach = serachParams.get('session_id')
    const {data: order, error, isLoading} = useSWR(`api/ordersession?s=${serach}`, getOrderSession)
    console.log(order)
    if (isLoading){
        return (
            <p>isLoading...</p>
        )
    }
    return(
        <p>order</p>
    )
    
}