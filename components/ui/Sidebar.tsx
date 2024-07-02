import Link from 'next/link'
import {dataPages} from "@/utils/dataPages"

function Sidebar() {
  return (
    <div className='w-1/6 h-screen bg-slate-600 p-10 flex justify-center items-center text-white'>
      <ul>
      <Link href="/">
        <li
          className='bg-white hover:bg-slate-400 flex justify-center items-center rounded-md my-8 p-5 text-black'
        >
          Logo
        </li>
        </Link>
        { 
        dataPages.map((data, index) => (
          <Link href={data.url} key={`li_${index}`}>
          <li 
            className='bg-slate-800 hover:bg-slate-400 flex justify-center items-center rounded-md my-8 p-5'
          >
            {data.title}
          </li>
          </Link>
        ))
        }
      </ul>
    </div>
  )
}

export default Sidebar