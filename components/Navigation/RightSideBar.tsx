'use client'

import { Card } from "../ui/card";
import * as React from "react"
import { Calendar } from "@/components/ui/calendar";
import { usePathname } from "next/navigation";


const RightSideBar = () => {

  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const pathname = usePathname();

  return (
    <>
      {pathname === '/' ? (
        <aside className='sticky top-20 h-fit w-72 flex flex-col gap-4 items-start'>
          <Card className='mb-3 py-3 w-full h-fit flex flex-col items-center gap-1'>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
            />
          </Card>
        </aside>
      ) : (
        <>
        </>
      )}
    </>
  )
}

export default RightSideBar;