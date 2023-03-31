import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    IconButton,
  } from "@material-tailwind/react";
  import {
    StarIcon,
    HeartIcon,
  } from "@heroicons/react/24/solid";
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Vendors() {
    const [hotels, setHotels] = useState([])

    useEffect(() => {
            axios.get('/api/vendors/get-vendors').then((response) => setHotels(response.data))
    }, [])

  return (
    

<div className='max-w-[1640px] m-auto px-4 py-12'>
<h1 className='text-orange-600 font-bold text-4xl text-center'>
  Top Rated Restaurants 
</h1>

{/* Display foods */}
<div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 '>
  {hotels.map((item, index) => (
   <Card className="w-full max-w-[20rem] shadow-lg">
   <CardHeader floated={false} color="blue-gray">
     <img
       src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
       alt="ui/ux review check"
     />
     <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
     <IconButton
       size="sm"
       color="red"
       variant="text"
       className="!absolute top-4 right-4 rounded-full"
     >
       <HeartIcon className="h-6 w-6" />
     </IconButton>
   </CardHeader>
   <CardBody>
     <div className="mb-3 flex items-center justify-between">
       <Typography variant="h5" color="blue-gray" className="font-medium">
         Wooden House, Florida
       </Typography>
       <Typography
         color="blue-gray"
         className="flex items-center gap-1.5 font-normal"
       >
         <StarIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
         5.0
       </Typography>
     </div>
     <Typography color="gray">
       Enter a freshly updated and thoughtfully furnished peaceful home
       surrounded by ancient trees, stone walls, and open meadows.
     </Typography>
     
   </CardBody>
   <CardFooter className="pt-3">
     <Button size="lg" fullWidth={true}>
       Reserve
     </Button>
   </CardFooter>
 </Card>
  ))}
</div>
</div>
  )
}

export default Vendors



