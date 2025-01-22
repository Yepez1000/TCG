
'use client'

import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'


const getOrderSession = async (url: string) => {
    const res = await fetch(url);    
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}


export default function OrderSuccessPage() {
    const serachParams = useSearchParams();
    const serach = serachParams.get('session_id')
    const {data: order, error, isLoading} = useSWR(`api/order/session?s=${serach}`, getOrderSession)

    if (isLoading){
        return (
            <p>isLoading...</p>
        )
    }
        
    console.log('front end order',order[0].orderItems[0].product)
    // console.log(order?.orderItems)
    return(
        <p>order</p>
    )
    
}